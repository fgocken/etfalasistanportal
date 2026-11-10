import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc,
  getDocs, 
  onSnapshot, 
  serverTimestamp, 
  Unsubscribe 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { MonthDutyRoster, RosterRegistry } from '../components/roster/DutyRosterTypes';
import { WeeklyWorkSchedule, WeeklyScheduleRegistry } from '../types/weeklySchedule';
import { 
  getRosterRegistry, 
  saveRosterRegistry, 
  setLastSyncStatus, 
  getActiveMonthKey, 
  setActiveMonthKey,
  normalizeRoster
} from '../components/roster/DutyRosterService';
import { 
  getWeeklyScheduleRegistry, 
  saveWeeklyScheduleRegistry, 
  getActiveWeekKey, 
  setActiveWeekKey 
} from './weeklyScheduleService';

let dutyRostersUnsubscribe: Unsubscribe | null = null;
let weeklySchedulesUnsubscribe: Unsubscribe | null = null;
let metaUnsubscribe: Unsubscribe | null = null;
let isInitialized = false;

/**
 * Initializes real-time two-way synchronization between Firestore and local state.
 * Any update pushed by an administrator instantly syncs to all visiting users in real-time.
 */
export function initFirestoreRealtimeSync(): void {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  console.log('[Firestore] Başlatılıyor: Gerçek zamanlı nöbet ve haftalık program senkronizasyonu');

  // 1. Listen to Monthly Duty Rosters
  try {
    const dutyRostersCol = collection(db, 'duty_rosters');
    dutyRostersUnsubscribe = onSnapshot(dutyRostersCol, (snapshot) => {
      if (snapshot.empty) {
        console.log('[Firestore] Nöbet çizelgesi koleksiyonu henüz boş.');
        return;
      }

      const localRegistry = getRosterRegistry();
      let hasNewData = false;

      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data() as MonthDutyRoster;
        if (data && data.monthKey && data.days) {
          const normalized = normalizeRoster(data);
          localRegistry[data.monthKey] = normalized;
          hasNewData = true;
          console.log(`[Firestore] Güncel nöbet alındı: ${data.monthKey} (${data.monthName || data.monthKey})`);
        }
      });

      if (hasNewData) {
        saveRosterRegistry(localRegistry);
        setLastSyncStatus({
          inSync: true,
          message: 'Buluttan canlı eşitlendi (Firestore)',
          unsyncedKeys: []
        });
        window.dispatchEvent(new CustomEvent('etfal-roster-updated', { detail: { registry: localRegistry } }));
      }
    }, (error) => {
      console.warn('[Firestore] Nöbet çizelgesi dinleme hatası:', error);
      handleFirestoreError(error, OperationType.LIST, 'duty_rosters');
    });
  } catch (error) {
    console.warn('[Firestore] Duty rosters onSnapshot başlatılamadı:', error);
  }

  // 2. Listen to Weekly Operating Room Work Schedules
  try {
    const weeklySchedulesCol = collection(db, 'weekly_schedules');
    weeklySchedulesUnsubscribe = onSnapshot(weeklySchedulesCol, (snapshot) => {
      if (snapshot.empty) {
        console.log('[Firestore] Haftalık çalışma programı koleksiyonu henüz boş.');
        return;
      }

      const localRegistry = getWeeklyScheduleRegistry();
      let hasNewData = false;

      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data() as WeeklyWorkSchedule;
        if (data && data.weekKey && data.days && data.rows) {
          localRegistry[data.weekKey] = data;
          hasNewData = true;
          console.log(`[Firestore] Güncel haftalık program alındı: ${data.weekKey} (${data.title})`);
        }
      });

      if (hasNewData) {
        saveWeeklyScheduleRegistry(localRegistry);
        window.dispatchEvent(new CustomEvent('etfal-weekly-schedule-updated', { detail: { registry: localRegistry } }));
      }
    }, (error) => {
      console.warn('[Firestore] Haftalık program dinleme hatası:', error);
      handleFirestoreError(error, OperationType.LIST, 'weekly_schedules');
    });
  } catch (error) {
    console.warn('[Firestore] Weekly schedules onSnapshot başlatılamadı:', error);
  }

  // 3. Listen to Active Global Settings (Active Month & Week for All Visitors)
  try {
    const metaDocRef = doc(db, 'schedule_meta', 'active_settings');
    metaUnsubscribe = onSnapshot(metaDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.activeMonthKey && data.activeMonthKey !== getActiveMonthKey()) {
          console.log('[Firestore] Genel aktif ay güncellendi:', data.activeMonthKey);
          setActiveMonthKey(data.activeMonthKey);
        }
        if (data.activeWeekKey && data.activeWeekKey !== getActiveWeekKey()) {
          console.log('[Firestore] Genel aktif hafta güncellendi:', data.activeWeekKey);
          setActiveWeekKey(data.activeWeekKey);
        }
      }
    }, (error) => {
      console.warn('[Firestore] Meta settings dinleme hatası:', error);
    });
  } catch (error) {
    console.warn('[Firestore] Meta onSnapshot başlatılamadı:', error);
  }
}

/**
 * Pushes a single month's duty roster to Firestore so all visitors see it immediately
 */
export async function pushDutyRosterToFirestore(roster: MonthDutyRoster): Promise<boolean> {
  if (!roster || !roster.monthKey) return false;

  const path = `duty_rosters/${roster.monthKey}`;
  try {
    const docRef = doc(db, 'duty_rosters', roster.monthKey);
    // Sanitize days and staffList before saving
    const payload = {
      id: roster.monthKey,
      monthKey: roster.monthKey,
      monthName: roster.monthName || roster.monthKey,
      lastUpdated: roster.lastUpdated || new Date().toISOString(),
      days: roster.days || {},
      pdfUrl: roster.pdfUrl || '',
      updatedAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    };

    await setDoc(docRef, payload, { merge: true });

    // Also update active settings if this is the active month
    await updateActiveSettingsInFirestore({ activeMonthKey: roster.monthKey });

    console.log(`[Firestore] Nöbet çizelgesi buluta yüklendi: ${roster.monthKey}`);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return false;
  }
}

/**
 * Pushes a single weekly schedule to Firestore so all visitors see it immediately.
 * cleanOverwrite: true (default) completely replaces the document to prevent ghost/merged corrupted rows.
 */
export async function pushWeeklyScheduleToFirestore(schedule: WeeklyWorkSchedule, cleanOverwrite = true): Promise<boolean> {
  if (!schedule || !schedule.weekKey) return false;

  const path = `weekly_schedules/${schedule.weekKey}`;
  try {
    const docRef = doc(db, 'weekly_schedules', schedule.weekKey);
    const payload = {
      id: schedule.weekKey,
      weekKey: schedule.weekKey,
      title: schedule.title || schedule.weekKey,
      dateRangeText: schedule.dateRangeText || '',
      days: schedule.days || [],
      rows: schedule.rows || [],
      pdfUrl: schedule.pdfUrl || '',
      pdfFileName: schedule.pdfFileName || '',
      updatedAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    };

    // When cleanOverwrite is true, completely replace document so old rows are wiped clean
    await setDoc(docRef, payload, { merge: !cleanOverwrite });

    // Also update active settings
    await updateActiveSettingsInFirestore({ activeWeekKey: schedule.weekKey });

    console.log(`[Firestore] Haftalık çalışma programı buluta yüklendi (Temiz Yazma: ${cleanOverwrite}): ${schedule.weekKey}`);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return false;
  }
}

/**
 * Completely removes a week's schedule from Firestore
 */
export async function deleteWeeklyScheduleFromFirestore(weekKey: string): Promise<boolean> {
  if (!weekKey) return false;
  const path = `weekly_schedules/${weekKey}`;
  try {
    const docRef = doc(db, 'weekly_schedules', weekKey);
    await deleteDoc(docRef);
    console.log(`[Firestore] Hafta programı tamamen silindi: ${weekKey}`);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return false;
  }
}

/**
 * Updates the global active month / week settings in Firestore
 */
export async function updateActiveSettingsInFirestore(settings: { activeMonthKey?: string; activeWeekKey?: string }): Promise<void> {
  try {
    const docRef = doc(db, 'schedule_meta', 'active_settings');
    await setDoc(docRef, {
      ...settings,
      updatedAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn('[Firestore] Aktif ayarlar güncellenemedi:', error);
  }
}

/**
 * Checks if the current browser user is authenticated with Firebase as an admin
 */
export function isFirebaseAdminSignedIn(): boolean {
  return auth.currentUser !== null;
}

/**
 * Unsubscribes all listeners (e.g. for teardown)
 */
export function stopFirestoreRealtimeSync(): void {
  if (dutyRostersUnsubscribe) {
    dutyRostersUnsubscribe();
    dutyRostersUnsubscribe = null;
  }
  if (weeklySchedulesUnsubscribe) {
    weeklySchedulesUnsubscribe();
    weeklySchedulesUnsubscribe = null;
  }
  if (metaUnsubscribe) {
    metaUnsubscribe();
    metaUnsubscribe = null;
  }
  isInitialized = false;
}
