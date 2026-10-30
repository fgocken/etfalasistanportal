import * as XLSX from 'xlsx';
import { MonthDutyRoster, DayDutySchedule, StaffDuty, RosterRegistry, MonthOption } from './DutyRosterTypes';

const STORAGE_KEY = 'etfal_anestezi_duty_roster_v3';
const REGISTRY_STORAGE_KEY = 'etfal_anestezi_rosters_registry_v2';
const ACTIVE_MONTH_STORAGE_KEY = 'etfal_anestezi_active_month_key_v2';
const ROSTER_ADMIN_STORAGE_KEY = 'etfal_roster_admin_unlocked_session_v1';

// SHA-256 hash of 'furkan1825'
export const ROSTER_ADMIN_PASSWORD_SHA256 = 'd573b859ce4ac0f94627b690c261f23a5fecc429ec4098dc80646c0ead8ccd8a';

export async function computeSha256(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', enc);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyRosterAdminPassword(password: string): Promise<boolean> {
  if (!password) return false;
  const hash = await computeSha256(password.trim());
  return hash === ROSTER_ADMIN_PASSWORD_SHA256;
}

export function isRosterAdminUnlocked(): boolean {
  try {
    return sessionStorage.getItem(ROSTER_ADMIN_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setRosterAdminUnlocked(unlocked: boolean): void {
  try {
    if (unlocked) {
      sessionStorage.setItem(ROSTER_ADMIN_STORAGE_KEY, 'true');
    } else {
      sessionStorage.removeItem(ROSTER_ADMIN_STORAGE_KEY);
    }
  } catch {}
}

export const TURKISH_MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export function formatMonthKeyDisplay(monthKey: string): string {
  const parts = monthKey.split('-');
  if (parts.length === 2) {
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    if (monthIdx >= 0 && monthIdx < 12) {
      return `${TURKISH_MONTH_NAMES[monthIdx]} ${year}`;
    }
  }
  return monthKey;
}

/**
 * Normalizes day names and weekend flags based on strict calendar math,
 * preventing any ambiguity (such as 'Pazartesi' matching 'Pazar').
 */
export function normalizeRoster(roster: MonthDutyRoster): MonthDutyRoster {
  if (!roster || !roster.days) return roster;
  
  const dateKeys = Object.keys(roster.days).sort();
  const [expectedYearStr, expectedMonthStr] = (roster.monthKey || '').split('-');
  const expectedMonth = parseInt(expectedMonthStr, 10);
  const expectedYear = parseInt(expectedYearStr, 10);

  // Detect if previous month dates leaked in due to timezone/serial parsing bug (e.g. 2026-10-30 in 2026-11)
  let needsShiftCorrection = false;
  if (expectedMonth && expectedYear && dateKeys.length > 0) {
    const prevMonth = expectedMonth === 1 ? 12 : expectedMonth - 1;
    const hasPreviousMonthKeys = dateKeys.some(k => {
      const parts = k.split('-');
      return parseInt(parts[1], 10) === prevMonth;
    });
    if (hasPreviousMonthKeys) {
      needsShiftCorrection = true;
    }
  }

  const days: Record<string, DayDutySchedule> = {};
  const turkishDays = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  if (needsShiftCorrection) {
    // Re-anchor sequential days to the correct month starting at day 1
    dateKeys.forEach((oldKey, idx) => {
      const dayNum = idx + 1;
      const dayStr = String(dayNum).padStart(2, '0');
      const monthStr = String(expectedMonth).padStart(2, '0');
      const newKey = `${expectedYear}-${monthStr}-${dayStr}`;
      const formattedDate = `${dayStr}.${monthStr}.${expectedYear}`;

      const d = new Date(expectedYear, expectedMonth - 1, dayNum, 12, 0, 0);
      const dow = d.getDay();
      const dayName = turkishDays[dow];
      const isWeekend = dow === 0 || dow === 6;

      const oldDay = roster.days[oldKey];
      days[newKey] = {
        ...oldDay,
        date: newKey,
        formattedDate,
        dayNumber: dayNum,
        dayName,
        isWeekend,
        seyrantepeStaff: (oldDay.seyrantepeStaff || []).map(s => ({
          ...s,
          id: s.id.replace(/sey-[^-]+-[^-]+-/, `sey-${newKey}-`)
        })),
        cayirbasiStaff: (oldDay.cayirbasiStaff || []).map(s => ({
          ...s,
          id: s.id.replace(/sar-[^-]+-[^-]+-/, `sar-${newKey}-`)
        }))
      };
    });
  } else {
    for (const dateKey of Object.keys(roster.days)) {
      const day = { ...roster.days[dateKey] };
      if (day && day.date) {
        const parts = day.date.split('-');
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 12, 0, 0);
          const dow = d.getDay();
          day.dayName = turkishDays[dow];
          day.isWeekend = dow === 0 || dow === 6;
        }
      }
      days[dateKey] = day;
    }
  }

  return { ...roster, days };
}

/**
 * Retrieves the multi-month roster registry from LocalStorage, ensuring default October 2026 exists
 */
export function getRosterRegistry(): RosterRegistry {
  let registry: RosterRegistry = {};
  try {
    const raw = localStorage.getItem(REGISTRY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        registry = parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse roster registry:', e);
  }

  // Ensure baseline official October 2026 is always available
  if (!registry['2026-10'] || !registry['2026-10'].days || Object.keys(registry['2026-10'].days).length === 0) {
    registry['2026-10'] = buildOfficialOctoberRoster();
    saveRosterRegistry(registry);
  }

  // Normalize all rosters to ensure accurate day names and weekend flags
  for (const key of Object.keys(registry)) {
    registry[key] = normalizeRoster(registry[key]);
  }

  return registry;
}

/**
 * Saves multi-month registry to LocalStorage
 */
export function saveRosterRegistry(registry: RosterRegistry): void {
  try {
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(registry));
  } catch (e) {
    console.error('Failed to save roster registry:', e);
  }
}

/**
 * Fetches persisted rosters from server API (/api/roster) and merges with local storage
 */
export async function fetchServerRosters(): Promise<RosterRegistry> {
  const localRegistry = getRosterRegistry();
  try {
    const res = await fetch('/api/roster');
    if (res.ok) {
      const data = await res.json();
      if (data && data.rosters && typeof data.rosters === 'object') {
        const rawMerged: RosterRegistry = { ...localRegistry, ...data.rosters };
        const merged: RosterRegistry = {};
        for (const k of Object.keys(rawMerged)) {
          merged[k] = normalizeRoster(rawMerged[k]);
        }
        // Ensure baseline October 2026 is kept if not in server
        if (!merged['2026-10']) {
          merged['2026-10'] = buildOfficialOctoberRoster();
        }
        saveRosterRegistry(merged);
        
        // Notify components of fresh data
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('etfal-rosters-updated', { detail: { registry: merged } }));
        }
        return merged;
      }
    }
  } catch (err) {
    console.warn('Server roster API unreachable, using local registry cache:', err);
  }
  return localRegistry;
}

/**
 * Saves a roster to both server API (/api/roster) and local storage
 */
export async function saveRosterToServer(roster: MonthDutyRoster): Promise<void> {
  const normalizedRoster = normalizeRoster(roster);
  // Update local registry immediately
  const registry = getRosterRegistry();
  registry[normalizedRoster.monthKey] = normalizedRoster;
  saveRosterRegistry(registry);
  setActiveMonthKey(normalizedRoster.monthKey);

  // Send to server for global persistence across all clinic users
  try {
    await fetch('/api/roster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalizedRoster)
    });
  } catch (err) {
    console.warn('Failed to send roster to server API:', err);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('etfal-rosters-updated', { detail: { monthKey: normalizedRoster.monthKey, registry } }));
  }
}

/**
 * Returns available month options for month switchers
 */
export function getAvailableMonthOptions(): MonthOption[] {
  const registry = getRosterRegistry();
  const keys = Object.keys(registry).sort();
  
  return keys.map((key) => {
    const r = registry[key];
    return {
      key,
      displayName: formatMonthKeyDisplay(key),
      fullName: r.monthName || `${formatMonthKeyDisplay(key)} Nöbet Listesi`,
      dayCount: Object.keys(r.days || {}).length,
      isOfficialDefault: key === '2026-10'
    };
  });
}

/**
 * Gets currently active selected month key
 */
export function getActiveMonthKey(): string {
  try {
    const saved = localStorage.getItem(ACTIVE_MONTH_STORAGE_KEY);
    const registry = getRosterRegistry();
    if (saved && registry[saved]) {
      return saved;
    }
  } catch {}

  const registry = getRosterRegistry();
  const keys = Object.keys(registry).sort();
  
  // Try to match Turkey time current year-month
  const { year, month } = getTurkeyTimeComponents();
  const currentCalKey = `${year}-${String(month).padStart(2, '0')}`;
  if (registry[currentCalKey]) {
    return currentCalKey;
  }

  // Otherwise pick latest month key or 2026-10
  return keys[keys.length - 1] || '2026-10';
}

/**
 * Sets active selected month key
 */
export function setActiveMonthKey(monthKey: string): void {
  try {
    localStorage.setItem(ACTIVE_MONTH_STORAGE_KEY, monthKey);
  } catch {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('etfal-active-month-changed', { detail: { monthKey } }));
  }
}

// Raw data directly transcribed from 2026 YILI EKİM AYI ASİSTAN NÖBET LİSTESİ official hospital document
const RAW_OCTOBER_2026: Array<{
  day: number;
  dayName: string;
  isWeekend: boolean;
  sey: string[]; // SEYRANTEPE 1, 2, 3, 4, 5, 6
  sar: string[]; // SARIYER-1, SARIYER-2, SARIYER-3, SARIYER-4
  notes?: string;
}> = [
  { day: 1, dayName: 'Perşembe', isWeekend: false, sey: ['SÜLEYMAN', 'FN GÜNLÜ', 'BURÇAK', 'CEYDA'], sar: ['HANİFE', 'İNCİ', 'ZEHRA P.'] },
  { day: 2, dayName: 'Cuma', isWeekend: false, sey: ['FATMA', 'Z. EREN', 'NUMAN', 'CELİL', 'HAMİT'], sar: ['ORKUT', 'FURKAN', 'BERKAN'] },
  { day: 3, dayName: 'Cumartesi', isWeekend: true, sey: ['AYŞEGÜL', 'ZEHRA E.', 'EMİR', 'MUSTAFA'], sar: ['ŞEVKİ', 'YAKUP', 'ALPER'] },
  { day: 4, dayName: 'Pazar', isWeekend: true, sey: ['SÜHEYLA O.', 'ÇAĞATAY', 'BURÇAK', 'ECEM'], sar: ['BATUHAN', 'BETÜL', 'YAĞMUR M.'] },
  { day: 5, dayName: 'Pazartesi', isWeekend: false, sey: ['FATMA', 'Z. EREN', 'NUMAN', 'CELİL', 'HAMİT'], sar: ['ZEYNEP', 'FURKAN', 'CEYDA'] },
  { day: 6, dayName: 'Salı', isWeekend: false, sey: ['EBRU', 'MERVE A.', 'ZEHRA P.', 'İBRAHİM'], sar: ['BÜŞRA', 'CAN', 'EMİR'] },
  { day: 7, dayName: 'Çarşamba', isWeekend: false, sey: ['BERKAY', 'ZEHRA E.', 'YAĞMUR M.', 'ECEM'], sar: ['PELİN', 'Y. DERTSİZ', 'BERKAN'] },
  { day: 8, dayName: 'Perşembe', isWeekend: false, sey: ['BATUHAN', 'BETÜL', 'ALPER', 'CEYDA', 'HAMİT'], sar: ['SÜHEYLA O.', 'YAKUP', 'NUMAN'] },
  { day: 9, dayName: 'Cuma', isWeekend: false, sey: ['FN GÜNLÜ', 'MERVE A.', 'CAN', 'MUSTAFA'], sar: ['RUHAT', 'ZEHRA P.', 'EMİR'] },
  { day: 10, dayName: 'Cumartesi', isWeekend: true, sey: ['AYŞEGÜL', 'ÇAĞATAY', 'YAĞMUR M.', 'İBRAHİM'], sar: ['EBRU', 'BURÇAK', 'BERKAN'] },
  { day: 11, dayName: 'Pazar', isWeekend: true, sey: ['YAĞMUR', 'Y. DERTSİZ', 'ALPER', 'CEYDA'], sar: ['ŞEVKİ', 'FURKAN', 'NUMAN'] },
  { day: 12, dayName: 'Pazartesi', isWeekend: false, sey: ['HANİFE', 'Z. EREN', 'CAN', 'MUSTAFA'], sar: ['SÜLEYMAN', 'FN GÜNLÜ', 'EMİR'] },
  { day: 13, dayName: 'Salı', isWeekend: false, sey: ['AYŞEGÜL', 'MERVE A.', 'İNCİ', 'İBRAHİM'], sar: ['RUHAT', 'ZEHRA P.', 'YAKUP'] },
  { day: 14, dayName: 'Çarşamba', isWeekend: false, sey: ['EBRU', 'ÇAĞATAY', 'YAĞMUR M.', 'ECEM'], sar: ['BERKAY', 'Y. DERTSİZ', 'ALPER'] },
  { day: 15, dayName: 'Perşembe', isWeekend: false, sey: ['ORKUT', 'CAN', 'EMİR', 'MUSTAFA'], sar: ['YAĞMUR', 'FURKAN', 'CELİL', 'HAMİT'] },
  { day: 16, dayName: 'Cuma', isWeekend: false, sey: ['AYŞEGÜL', 'İNCİ', 'NUMAN', 'İBRAHİM'], sar: ['BÜŞRA', 'YAKUP', 'CEYDA'] },
  { day: 17, dayName: 'Cumartesi', isWeekend: true, sey: ['FN GÜNLÜ', 'Y. DERTSİZ', 'ALPER', 'ECEM'], sar: ['HANİFE', 'BURÇAK', 'BERKAN'] },
  { day: 18, dayName: 'Pazar', isWeekend: true, sey: ['SÜLEYMAN', 'ÇAĞATAY', 'YAĞMUR M.', 'CELİL'], sar: ['EBRU', 'ZEHRA P.', 'EMİR', 'HAMİT'] },
  { day: 19, dayName: 'Pazartesi', isWeekend: false, sey: ['ORKUT', 'MERVE A.', 'YAKUP', 'İBRAHİM'], sar: ['SÜHEYLA O.', 'BATUHAN', 'ZEHRA E.', 'CEYDA'] },
  { day: 20, dayName: 'Salı', isWeekend: false, sey: ['AYŞEGÜL', 'Z. EREN', 'CAN', 'ECEM'], sar: ['FN GÜNLÜ', 'Y. DERTSİZ', 'BERKAN'] },
  { day: 21, dayName: 'Çarşamba', isWeekend: false, sey: ['FATMA', 'ÇAĞATAY', 'NUMAN', 'MUSTAFA'], sar: ['ŞEVKİ', 'FURKAN', 'CELİL'] },
  { day: 22, dayName: 'Perşembe', isWeekend: false, sey: ['BERKAY', 'İNCİ', 'BURÇAK', 'İBRAHİM'], sar: ['SÜHEYLA O.', 'ORKUT', 'ZEHRA E.', 'ALPER'] },
  { day: 23, dayName: 'Cuma', isWeekend: false, sey: ['SÜLEYMAN', 'MERVE A.', 'EMİR', 'ECEM'], sar: ['BATUHAN', 'Y. DERTSİZ', 'BERKAN'] },
  { day: 24, dayName: 'Cumartesi', isWeekend: true, sey: ['FATMA', 'Z. EREN', 'NUMAN', 'MUSTAFA'], sar: ['FN GÜNLÜ', 'ZEHRA P.', 'CELİL', 'HAMİT'] },
  { day: 25, dayName: 'Pazar', isWeekend: true, sey: ['HANİFE', 'CAN', 'YAKUP', 'İBRAHİM'], sar: ['SÜHEYLA O.', 'FURKAN', 'CEYDA'] },
  { day: 26, dayName: 'Pazartesi', isWeekend: false, sey: ['EBRU', 'BETÜL', 'ALPER', 'ECEM'], sar: ['ŞEVKİ', 'BURÇAK', 'YAĞMUR M.'] },
  { day: 27, dayName: 'Salı', isWeekend: false, sey: ['BERKAY', 'İNCİ', 'ZEHRA E.', 'MUSTAFA'], sar: ['YAĞMUR', 'BATUHAN', 'BERKAN'] },
  { day: 28, dayName: 'Çarşamba', isWeekend: false, sey: ['AYŞEGÜL', 'Z. EREN', 'YAKUP', 'İBRAHİM', 'HAMİT'], sar: ['HANİFE', 'ÇAĞATAY', 'FURKAN', 'CELİL'] },
  { day: 29, dayName: 'Perşembe', isWeekend: true, sey: ['RUHAT', 'MERVE A.', 'YAĞMUR M.', 'ECEM'], sar: ['BÜŞRA', 'Y. DERTSİZ', 'CEYDA'], notes: '29 Ekim Cumhuriyet Bayramı' },
  { day: 30, dayName: 'Cuma', isWeekend: false, sey: ['FATMA', 'ZEHRA E.', 'NUMAN', 'MUSTAFA'], sar: ['ORKUT', 'BURÇAK', 'ALPER'] },
  { day: 31, dayName: 'Cumartesi', isWeekend: true, sey: ['SÜLEYMAN', 'CAN', 'ZEHRA P.', 'CELİL'], sar: ['YAĞMUR', 'İNCİ', 'EMİR', 'HAMİT'] }
];

/**
 * Builds the official October 2026 roster structure strictly from the clinic's provided data
 */
export function buildOfficialOctoberRoster(): MonthDutyRoster {
  const year = 2026;
  const month = 10;
  const monthKey = '2026-10';
  const monthName = '2026 YILI EKİM AYI ASİSTAN NÖBET LİSTESİ';

  const days: Record<string, DayDutySchedule> = {};

  RAW_OCTOBER_2026.forEach((item) => {
    const dayStr = String(item.day).padStart(2, '0');
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${dayStr}`;
    const formattedDate = `${dayStr}.${String(month).padStart(2, '0')}.${year}`;

    const seyrantepeStaff: StaffDuty[] = item.sey.map((name, idx) => ({
      id: `sey-${dateKey}-${idx + 1}`,
      name,
      slot: `SEYRANTEPE ${idx + 1}`,
      role: `${idx + 1}. Nöbetçi`
    }));

    const cayirbasiStaff: StaffDuty[] = item.sar.map((name, idx) => ({
      id: `sar-${dateKey}-${idx + 1}`,
      name,
      slot: `SARIYER-${idx + 1}`,
      role: idx === 0 ? 'Çayırbaşı 1. Nöbetçi' : `Çayırbaşı ${idx + 1}. Nöbetçi`
    }));

    days[dateKey] = {
      date: dateKey,
      formattedDate,
      dayNumber: item.day,
      dayName: item.dayName,
      isWeekend: item.isWeekend,
      seyrantepeStaff,
      cayirbasiStaff,
      notes: item.notes
    };
  });

  return {
    monthKey,
    monthName,
    lastUpdated: new Date().toISOString(),
    days
  };
}

/**
 * Gets saved roster from multi-month registry or builds the official October 2026 roster
 */
export function getSavedRoster(specificMonthKey?: string): MonthDutyRoster {
  const registry = getRosterRegistry();
  const targetKey = specificMonthKey || getActiveMonthKey();
  
  if (registry[targetKey] && registry[targetKey].days && Object.keys(registry[targetKey].days).length > 0) {
    return registry[targetKey];
  }

  // Fallback to first available or baseline October 2026
  const availableKeys = Object.keys(registry);
  if (availableKeys.length > 0 && registry[availableKeys[0]]) {
    return registry[availableKeys[0]];
  }

  const defaultRoster = buildOfficialOctoberRoster();
  saveRoster(defaultRoster);
  return defaultRoster;
}

/**
 * Saves roster to multi-month registry and persists to server
 */
export function saveRoster(roster: MonthDutyRoster): void {
  saveRosterToServer(roster).catch((err) => {
    console.warn('Background save to server failed:', err);
  });
}

/**
 * Resets roster back to the clinic's official October 2026 roster
 */
export function resetToDefaultRoster(monthKey: string = '2026-10'): MonthDutyRoster {
  const fresh = buildOfficialOctoberRoster();
  saveRoster(fresh);
  setActiveMonthKey('2026-10');
  return fresh;
}

/**
 * Downloads a clean .xlsx spreadsheet matching the clinic's EXACT official table columns:
 * [TARİH, GÜN, SEYRANTEPE 1, SEYRANTEPE 2, SEYRANTEPE 3, SEYRANTEPE 4, SEYRANTEPE 5, SEYRANTEPE 6, SARIYER-1, SARIYER-2, SARIYER-3, SARIYER-4]
 */
export function downloadExcelTemplate(roster?: MonthDutyRoster, forMonthKey?: string): void {
  const currentRoster = roster || getSavedRoster();
  const rows: any[] = [];
  let exportFileName = `Sisli_Hamidiye_Etfal_Anestezi_Nobet_${currentRoster.monthKey}.xlsx`;

  // If requesting November 2026 template specifically and not yet loaded
  if (forMonthKey === '2026-11' || (!roster && forMonthKey === '2026-11')) {
    exportFileName = 'Sisli_Hamidiye_Etfal_Anestezi_Nobet_2026-11_Kasim.xlsx';
    const turkishDayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    
    for (let d = 1; d <= 30; d++) {
      const dt = new Date(2026, 10, d); // Month index 10 = November
      const dayStr = String(d).padStart(2, '0');
      const formattedDate = `${dayStr}.11.2026`;
      const dayName = turkishDayNames[dt.getDay()];

      rows.push({
        'TARİH': formattedDate,
        'GÜN': dayName,
        'SEYRANTEPE 1': '',
        'SEYRANTEPE 2': '',
        'SEYRANTEPE 3': '',
        'SEYRANTEPE 4': '',
        'SEYRANTEPE 5': '',
        'SEYRANTEPE 6': '',
        'SARIYER-1': '',
        'SARIYER-2': '',
        'SARIYER-3': '',
        'SARIYER-4': ''
      });
    }
  } else {
    const sortedDates = Object.keys(currentRoster.days).sort();

    for (const dateKey of sortedDates) {
      const day = currentRoster.days[dateKey];
      
      // Find Seyrantepe 1..6
      const s1 = day.seyrantepeStaff.find(s => s.slot === 'SEYRANTEPE 1')?.name || day.seyrantepeStaff[0]?.name || '';
      const s2 = day.seyrantepeStaff.find(s => s.slot === 'SEYRANTEPE 2')?.name || day.seyrantepeStaff[1]?.name || '';
      const s3 = day.seyrantepeStaff.find(s => s.slot === 'SEYRANTEPE 3')?.name || day.seyrantepeStaff[2]?.name || '';
      const s4 = day.seyrantepeStaff.find(s => s.slot === 'SEYRANTEPE 4')?.name || day.seyrantepeStaff[3]?.name || '';
      const s5 = day.seyrantepeStaff.find(s => s.slot === 'SEYRANTEPE 5')?.name || day.seyrantepeStaff[4]?.name || '';
      const s6 = day.seyrantepeStaff.find(s => s.slot === 'SEYRANTEPE 6')?.name || day.seyrantepeStaff[5]?.name || '';

      // Find Sarıyer 1..4 (Çayırbaşı)
      const sar1 = day.cayirbasiStaff.find(s => s.slot === 'SARIYER-1')?.name || day.cayirbasiStaff[0]?.name || '';
      const sar2 = day.cayirbasiStaff.find(s => s.slot === 'SARIYER-2')?.name || day.cayirbasiStaff[1]?.name || '';
      const sar3 = day.cayirbasiStaff.find(s => s.slot === 'SARIYER-3')?.name || day.cayirbasiStaff[2]?.name || '';
      const sar4 = day.cayirbasiStaff.find(s => s.slot === 'SARIYER-4')?.name || day.cayirbasiStaff[3]?.name || '';

      rows.push({
        'TARİH': day.formattedDate,
        'GÜN': day.dayName,
        'SEYRANTEPE 1': s1,
        'SEYRANTEPE 2': s2,
        'SEYRANTEPE 3': s3,
        'SEYRANTEPE 4': s4,
        'SEYRANTEPE 5': s5,
        'SEYRANTEPE 6': s6,
        'SARIYER-1': sar1,
        'SARIYER-2': sar2,
        'SARIYER-3': sar3,
        'SARIYER-4': sar4
      });
    }
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set standard column widths
  worksheet['!cols'] = [
    { wch: 14 }, // TARİH
    { wch: 14 }, // GÜN
    { wch: 16 }, // SEYRANTEPE 1
    { wch: 16 }, // SEYRANTEPE 2
    { wch: 16 }, // SEYRANTEPE 3
    { wch: 16 }, // SEYRANTEPE 4
    { wch: 16 }, // SEYRANTEPE 5
    { wch: 16 }, // SEYRANTEPE 6
    { wch: 16 }, // SARIYER-1
    { wch: 16 }, // SARIYER-2
    { wch: 16 }, // SARIYER-3
    { wch: 16 }  // SARIYER-4
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'ASİSTAN NÖBET LİSTESİ');

  XLSX.writeFile(workbook, exportFileName);
}

/**
 * Downloads a pre-formatted November 2026 blank template with dates 01.11.2026..30.11.2026
 */
export function downloadNovemberExcelTemplate(): void {
  downloadExcelTemplate(undefined, '2026-11');
}

/**
 * Helper to clean doctor names (removes academic/clinical titles like DR., UZM., etc., trims whitespace)
 */
export function sanitizeDoctorName(raw: string): string {
  if (!raw) return '';
  let str = String(raw).trim();
  
  // Remove common hospital title prefixes
  str = str.replace(/^(DR\.|DR\s+|UZM\.\s*DR\.|UZM\.|AS[İI]S\.\s*DR\.|AS[İI]S\.|AR[ŞS]\.\s*G[ÖO]R\.|AS[İI]STAN)\s+/i, '');
  
  // Remove trailing punct / parenthesis notes if any (e.g. "AHMET (KIDEMLİ)" -> "AHMET (KIDEMLİ)" is kept, but stray dashes or stars removed)
  str = str.replace(/^[*\-_/\s]+|[*\-_/\s]+$/g, '');
  
  return str.toLocaleUpperCase('tr-TR').trim();
}

/**
 * Intelligent Excel parser for hospital duty rosters:
 * - Detects correct sheet among multiple sheets (favors sheets named KASIM, NÖBET, etc.)
 * - Resolves Excel merged cells (merges across SEYRANTEPE and SARIYER headers)
 * - Auto-detects table header row (skips hospital title banner rows 1..4)
 * - Identifies Seyrantepe (1..6) and Sarıyer/Çayırbaşı (1..4) columns under multiple header variations
 * - Handles serial dates, DD.MM.YYYY, DD/MM/YYYY, or day-of-month integers
 * - Cleans titles and validates staff presence with descriptive diagnostics
 */
export async function parseExcelRoster(file: File): Promise<MonthDutyRoster> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const buffer = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
        
        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          throw new Error('Excel dosyasında herhangi bir çalışma sayfası (sheet) bulunamadı.');
        }

        // 1. Select the best sheet: inspect all sheets for roster keywords
        let targetSheetName = workbook.SheetNames[0];
        let bestScore = -1;

        const sheetScores = workbook.SheetNames.map((sheetName) => {
          let score = 0;
          const upper = sheetName.toUpperCase();
          if (upper.includes('KASIM') || upper.includes('NOVEMBER')) score += 100;
          if (upper.includes('EKİM') || upper.includes('EKIM')) score += 40;
          if (upper.includes('NÖBET') || upper.includes('NOBET') || upper.includes('ASİSTAN')) score += 60;
          if (upper.includes('ÇİZELGE') || upper.includes('LİSTE')) score += 30;

          // Quick sample peek of sheet contents
          const sheet = workbook.Sheets[sheetName];
          if (sheet && sheet['!ref']) {
            const rawSample = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 0, defval: '' }) as any[][];
            const sampleText = JSON.stringify(rawSample.slice(0, 10)).toUpperCase();
            if (sampleText.includes('SEYRANTEPE')) score += 50;
            if (sampleText.includes('SARIYER') || sampleText.includes('ÇAYIRBAŞI') || sampleText.includes('CAYIRBASI')) score += 50;
            if (sampleText.includes('TARİH') || sampleText.includes('TARIH')) score += 40;
            if (sampleText.includes('KASIM')) score += 50;
          }

          if (score > bestScore) {
            bestScore = score;
            targetSheetName = sheetName;
          }
          return { sheetName, score };
        });

        const sheet = workbook.Sheets[targetSheetName];
        if (!sheet) {
          throw new Error(`'${targetSheetName}' çalışma sayfası açılamadı.`);
        }

        // 2. Convert sheet to 2D array (preserving all rows and cell coordinates)
        const rawGrid: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

        if (!rawGrid || rawGrid.length === 0) {
          throw new Error(`'${targetSheetName}' sayfasında veri satırı bulunamadı.`);
        }

        // 3. Resolve Merged Cells (!merges):
        // In hospital Excels, "SEYRANTEPE" is often merged horizontally across columns C to H.
        // Unmerged cells in XLSX have empty strings. We duplicate the master cell value across the merge range.
        if (sheet['!merges'] && Array.isArray(sheet['!merges'])) {
          sheet['!merges'].forEach((range: XLSX.Range) => {
            const masterVal = rawGrid[range.s.r]?.[range.s.c];
            if (masterVal !== undefined && masterVal !== '') {
              for (let r = range.s.r; r <= range.e.r; r++) {
                if (!rawGrid[r]) rawGrid[r] = [];
                for (let c = range.s.c; c <= range.e.c; c++) {
                  rawGrid[r][c] = masterVal;
                }
              }
            }
          });
        }

        // 4. Detect Month and Year from file name, sheet name, and banner rows (first 10 rows)
        const bannerText = `${file.name} ${targetSheetName} ${JSON.stringify(rawGrid.slice(0, 10))}`.toUpperCase();
        
        let detectedYear = 2026;
        let detectedMonth = 11; // Default to November if triggered from current user request

        // Match year (e.g. 2026, 2025, 2027)
        const yearMatch = bannerText.match(/(202[4-9]|203[0-5])/);
        if (yearMatch) {
          detectedYear = parseInt(yearMatch[1], 10);
        }

        const monthMatchers: Array<{ regex: RegExp; m: number }> = [
          { regex: /KASIM|NOVEMBER/, m: 11 },
          { regex: /EK[İI]M|OCTOBER/, m: 10 },
          { regex: /ARALIK|DECEMBER/, m: 12 },
          { regex: /EYL[UÜ]L|SEPTEMBER/, m: 9 },
          { regex: /A[ĞG]USTOS|AUGUST/, m: 8 },
          { regex: /TEMMUZ|JULY/, m: 7 },
          { regex: /HAZ[İI]RAN|JUNE/, m: 6 },
          { regex: /MAYIS|MAY/, m: 5 },
          { regex: /N[İI]SAN|APRIL/, m: 4 },
          { regex: /MART|MARCH/, m: 3 },
          { regex: /ŞUBAT|SUBAT|FEBRUARY/, m: 2 },
          { regex: /OCAK|JANUARY/, m: 1 }
        ];

        for (const item of monthMatchers) {
          if (item.regex.test(bannerText)) {
            detectedMonth = item.m;
            break;
          }
        }

        // 5. Locate Header Row(s):
        // Scan rows 0 to 15 to find the row that defines the table columns
        let headerRowIdx = -1;
        let maxHeaderScore = 0;

        for (let r = 0; r < Math.min(15, rawGrid.length); r++) {
          const rowVals = (rawGrid[r] || []).map((v: any) => String(v || '').trim().toUpperCase());
          let score = 0;

          const rowStr = rowVals.join(' ');
          if (/TAR[Iİ]H|DATE/.test(rowStr)) score += 30;
          if (/G[UÜ]N|DAY/.test(rowStr)) score += 15;
          if (/SEYRANTEPE|SEY/.test(rowStr)) score += 35;
          if (/SARIYER|ÇAYIRBAŞI|CAYIRBASI|SAR/.test(rowStr)) score += 35;
          if (/NÖBET|NOBET/.test(rowStr)) score += 15;
          if (rowVals.some(v => /^(SEYRANTEPE|SARIYER|ÇAYIRBAŞI)[\s_-]?\d+$/i.test(v))) score += 50;

          if (score > maxHeaderScore) {
            maxHeaderScore = score;
            headerRowIdx = r;
          }
        }

        // If no header row explicitly found with high score, default to 0
        if (headerRowIdx === -1 || maxHeaderScore < 20) {
          headerRowIdx = 0;
        }

        // Check if the immediate next row is a sub-header row (e.g. contains 1, 2, 3, 4, 5, 6 or SEY-1, SAR-1)
        let subHeaderRowIdx = -1;
        if (headerRowIdx + 1 < rawGrid.length) {
          const nextRowVals = (rawGrid[headerRowIdx + 1] || []).map((v: any) => String(v || '').trim().toUpperCase());
          const hasNumberedSubHeaders = nextRowVals.filter(v => /^(\d+|SEY[\s_-]?\d+|SAR[\s_-]?\d+|\d+\.\s*NÖBETÇİ)$/i.test(v)).length >= 2;
          if (hasNumberedSubHeaders) {
            subHeaderRowIdx = headerRowIdx + 1;
          }
        }

        const dataStartRowIdx = (subHeaderRowIdx !== -1 ? subHeaderRowIdx : headerRowIdx) + 1;

        // 6. Map Columns to Roles
        // Build combined column labels
        const maxCols = Math.max(...rawGrid.slice(headerRowIdx, dataStartRowIdx + 5).map(r => r.length));
        
        let dateColIdx = -1;
        let dayNameColIdx = -1;
        const seyrantepeColIndices: number[] = [];
        const cayirbasiColIndices: number[] = [];

        // Track running section (Seyrantepe vs Sariyer)
        let currentSection: 'seyrantepe' | 'sariyer' | 'unknown' = 'unknown';

        for (let c = 0; c < maxCols; c++) {
          const topLabel = String(rawGrid[headerRowIdx]?.[c] || '').trim().toUpperCase();
          const subLabel = subHeaderRowIdx !== -1 ? String(rawGrid[subHeaderRowIdx]?.[c] || '').trim().toUpperCase() : '';
          const combinedLabel = `${topLabel} ${subLabel}`.trim();

          // Check section switch
          if (/SEYRANTEPE|SEY\b/.test(topLabel) || /SEYRANTEPE|SEY\b/.test(subLabel)) {
            currentSection = 'seyrantepe';
          } else if (/SARIYER|ÇAYIRBAŞI|CAYIRBASI|SAR\b/.test(topLabel) || /SARIYER|ÇAYIRBAŞI|CAYIRBASI|SAR\b/.test(subLabel)) {
            currentSection = 'sariyer';
          }

          // Date column
          if (dateColIdx === -1 && (/^TAR[Iİ]H/.test(topLabel) || /^TAR[Iİ]H/.test(subLabel) || /^DATE/.test(topLabel))) {
            dateColIdx = c;
            continue;
          }

          // Day name column
          if (dayNameColIdx === -1 && (/^G[UÜ]N$/.test(topLabel) || /^G[UÜ]N$/.test(subLabel) || /^DAY$/.test(topLabel))) {
            dayNameColIdx = c;
            continue;
          }

          // Explicit Seyrantepe column
          if (/SEYRANTEPE[\s_-]?\d+/i.test(combinedLabel) || /SEY[\s_-]?\d+/i.test(combinedLabel)) {
            seyrantepeColIndices.push(c);
            continue;
          }

          // Explicit Sariyer column
          if (/(SARIYER|ÇAYIRBAŞI|CAYIRBASI|SAR)[\s_-]?\d+/i.test(combinedLabel)) {
            cayirbasiColIndices.push(c);
            continue;
          }

          // Sub-header is a number (1..6) under current section
          if (/^\d+$/.test(subLabel) || /^\d+\.?\s*NÖBETÇİ?$/i.test(subLabel) || /^\d+$/.test(topLabel)) {
            if (currentSection === 'seyrantepe') {
              seyrantepeColIndices.push(c);
              continue;
            } else if (currentSection === 'sariyer') {
              cayirbasiColIndices.push(c);
              continue;
            }
          }

          // Fallback based on current section
          if (currentSection === 'seyrantepe' && seyrantepeColIndices.length < 6) {
            seyrantepeColIndices.push(c);
          } else if (currentSection === 'sariyer' && cayirbasiColIndices.length < 4) {
            cayirbasiColIndices.push(c);
          }
        }

        // If Date column was not found by header, find column that contains dates
        if (dateColIdx === -1) {
          for (let c = 0; c < Math.min(maxCols, 3); c++) {
            const sampleVals = rawGrid.slice(dataStartRowIdx, dataStartRowIdx + 5).map(r => String(r[c] || '').trim());
            const hasDates = sampleVals.some(v => /^\d{1,2}[./-]\d{1,2}/.test(v) || (!isNaN(Number(v)) && Number(v) >= 1 && Number(v) <= 31));
            if (hasDates) {
              dateColIdx = c;
              break;
            }
          }
        }

        // If Day column not found, check next column after date
        if (dayNameColIdx === -1 && dateColIdx !== -1) {
          const checkCol = dateColIdx + 1;
          const sampleVals = rawGrid.slice(dataStartRowIdx, dataStartRowIdx + 5).map(r => String(r[checkCol] || '').trim().toLowerCase());
          if (sampleVals.some(v => /pazar|pazartesi|salı|sali|çarşamba|carsamba|perşembe|persembe|cuma|cumartesi/.test(v))) {
            dayNameColIdx = checkCol;
          }
        }

        // If no Seyrantepe or Sariyer columns were identified by name, use standard position heuristic:
        // Starting after Date & DayName: first up to 6 columns are Seyrantepe, next up to 4 columns are Sarıyer
        if (seyrantepeColIndices.length === 0 && cayirbasiColIndices.length === 0) {
          const startCol = Math.max(dateColIdx, dayNameColIdx) + 1;
          for (let c = startCol; c < maxCols; c++) {
            if (seyrantepeColIndices.length < 6) {
              seyrantepeColIndices.push(c);
            } else if (cayirbasiColIndices.length < 4) {
              cayirbasiColIndices.push(c);
            }
          }
        }

        // 7. Parse Data Rows
        const days: Record<string, DayDutySchedule> = {};
        let totalStaffParsed = 0;

        for (let r = dataStartRowIdx; r < rawGrid.length; r++) {
          const row = rawGrid[r];
          if (!row || row.length === 0) continue;

          // Skip signature or summary rows at bottom (e.g. "HAZIRLAYAN", "BAŞHEKİM", "TOPLAM", etc.)
          const rowText = row.map((v: any) => String(v || '').trim()).join(' ').toUpperCase();
          if (/TOPLAM|İMZA|IMZA|BAŞHEK[İI]M|ANAB[İI]L[İI]M|KL[İI]N[İI]K|HAZIRLAYAN/.test(rowText) && !/\d{1,2}[./-]\d{1,2}/.test(rowText)) {
            continue;
          }

          // Extract date with timezone-safe methods
          const rawDateCell = dateColIdx !== -1 ? row[dateColIdx] : null;
          let parsedDayNum: number | null = null;
          let parsedMonth: number = detectedMonth;
          let parsedYear: number = detectedYear;

          // Check if Excel has formatted display text in sheet cell (e.g. cell.w: "01.11.2026")
          let formattedCellText = '';
          if (dateColIdx !== -1 && sheet) {
            const cellRef = XLSX.utils.encode_cell({ r, c: dateColIdx });
            const cellObj = sheet[cellRef];
            if (cellObj && cellObj.w) {
              formattedCellText = String(cellObj.w).trim();
            }
          }

          // 1. Try formatted text first if available (e.g. "01.11.2026", "1.11.2026")
          if (formattedCellText) {
            const fullMatch = formattedCellText.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})$/);
            if (fullMatch) {
              parsedDayNum = parseInt(fullMatch[1], 10);
              parsedMonth = parseInt(fullMatch[2], 10);
              let y = parseInt(fullMatch[3], 10);
              if (y < 100) y += 2000;
              parsedYear = y;
            } else {
              const partialMatch = formattedCellText.match(/^(\d{1,2})[./-](\d{1,2})$/);
              if (partialMatch) {
                parsedDayNum = parseInt(partialMatch[1], 10);
                parsedMonth = parseInt(partialMatch[2], 10);
              } else {
                const dayMatch = formattedCellText.match(/^(\d{1,2})$/);
                if (dayMatch) {
                  parsedDayNum = parseInt(dayMatch[1], 10);
                }
              }
            }
          }

          // 2. If not parsed yet, check raw cell value
          if (!parsedDayNum && rawDateCell !== null && rawDateCell !== undefined && rawDateCell !== '') {
            if (rawDateCell instanceof Date && !isNaN(rawDateCell.getTime())) {
              // SheetJS creates dates at UTC midnight: ALWAYS use UTC getters to avoid local timezone offset rollback!
              parsedDayNum = rawDateCell.getUTCDate();
              parsedMonth = rawDateCell.getUTCMonth() + 1;
              parsedYear = rawDateCell.getUTCFullYear();
            } else if (typeof rawDateCell === 'number') {
              if (rawDateCell > 1000) {
                try {
                  const parsed = XLSX.SSF.parse_date_code(rawDateCell);
                  if (parsed) {
                    parsedDayNum = parsed.d;
                    parsedMonth = parsed.m;
                    parsedYear = parsed.y;
                  }
                } catch {
                  // Fallback
                  const d = new Date((rawDateCell - 25569) * 86400 * 1000);
                  parsedDayNum = d.getUTCDate();
                  parsedMonth = d.getUTCMonth() + 1;
                  parsedYear = d.getUTCFullYear();
                }
              } else if (rawDateCell >= 1 && rawDateCell <= 31) {
                parsedDayNum = Math.floor(rawDateCell);
              }
            } else {
              const strVal = String(rawDateCell).trim();
              const fullMatch = strVal.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})$/);
              if (fullMatch) {
                parsedDayNum = parseInt(fullMatch[1], 10);
                parsedMonth = parseInt(fullMatch[2], 10);
                let y = parseInt(fullMatch[3], 10);
                if (y < 100) y += 2000;
                parsedYear = y;
              } else {
                const partialMatch = strVal.match(/^(\d{1,2})[./-](\d{1,2})$/);
                if (partialMatch) {
                  parsedDayNum = parseInt(partialMatch[1], 10);
                  parsedMonth = parseInt(partialMatch[2], 10);
                } else {
                  const dayNumMatch = strVal.match(/^(\d{1,2})$/);
                  if (dayNumMatch) {
                    parsedDayNum = parseInt(dayNumMatch[1], 10);
                  }
                }
              }
            }
          }

          // Fallback sequential day number if day couldn't be parsed
          if (!parsedDayNum || parsedDayNum < 1 || parsedDayNum > 31) {
            parsedDayNum = Object.keys(days).length + 1;
          }

          // Prevent month bleed: all days in this roster sheet must strictly anchor to the detected roster month and year
          parsedMonth = detectedMonth;
          parsedYear = detectedYear;

          // Safe midday Date object for day of week calculation
          const dateObj = new Date(parsedYear, parsedMonth - 1, parsedDayNum, 12, 0, 0);
          const yearStr = parsedYear;
          const monthStr = String(parsedMonth).padStart(2, '0');
          const dayStr = String(parsedDayNum).padStart(2, '0');
          const dateKey = `${yearStr}-${monthStr}-${dayStr}`;
          const formattedDate = `${dayStr}.${monthStr}.${yearStr}`;

          const dayOfWeek = dateObj.getDay(); // 0: Pazar, 1: Pazartesi, ..., 6: Cumartesi
          const calendarDayName = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][dayOfWeek];
          let dayName = calendarDayName;
          let isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          // If explicit day name column exists, parse Turkish day text safely (Pazartesi MUST precede Pazar)
          if (dayNameColIdx !== -1 && row[dayNameColIdx]) {
            const rawDayText = String(row[dayNameColIdx]).trim();
            const lowerDay = rawDayText.toLowerCase();

            if (lowerDay.includes('pazartesi') || lowerDay === 'pzt' || lowerDay.startsWith('pzt')) {
              dayName = 'Pazartesi';
              isWeekend = false;
            } else if (lowerDay.includes('cumartesi') || lowerDay === 'cmt' || lowerDay.startsWith('c.tesi') || lowerDay.startsWith('cmt')) {
              dayName = 'Cumartesi';
              isWeekend = true;
            } else if ((lowerDay.includes('pazar') || lowerDay === 'paz' || lowerDay.startsWith('paz')) && !lowerDay.includes('pazartesi')) {
              dayName = 'Pazar';
              isWeekend = true;
            } else if (lowerDay.includes('salı') || lowerDay.includes('sali')) {
              dayName = 'Salı';
              isWeekend = false;
            } else if (lowerDay.includes('çarşamba') || lowerDay.includes('carsamba') || lowerDay.includes('çar')) {
              dayName = 'Çarşamba';
              isWeekend = false;
            } else if (lowerDay.includes('perşembe') || lowerDay.includes('persembe') || lowerDay.includes('per')) {
              dayName = 'Perşembe';
              isWeekend = false;
            } else if (lowerDay.includes('cuma') && !lowerDay.includes('cumartesi')) {
              dayName = 'Cuma';
              isWeekend = false;
            } else if (rawDayText) {
              dayName = rawDayText;
            }
          }

          // Strict calendar date truth: dayOfWeek 1..5 is ALWAYS a weekday, 0 and 6 are weekend
          if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            isWeekend = false;
            dayName = calendarDayName;
          } else if (dayOfWeek === 0 || dayOfWeek === 6) {
            isWeekend = true;
            dayName = dayOfWeek === 6 ? 'Cumartesi' : 'Pazar';
          }

          // Extract Seyrantepe Staff
          const seyrantepeStaff: StaffDuty[] = [];
          seyrantepeColIndices.forEach((colIdx, slotIdx) => {
            const rawCell = row[colIdx];
            const cleanName = sanitizeDoctorName(rawCell);
            if (cleanName && cleanName !== '-' && cleanName !== '/' && cleanName !== 'BOŞ') {
              const slotNumber = slotIdx + 1;
              seyrantepeStaff.push({
                id: `sey-${dateKey}-${slotNumber}`,
                name: cleanName,
                slot: `SEYRANTEPE ${slotNumber}`,
                role: slotNumber === 1 ? 'Kıdemli / 1. Nöbetçi' : `${slotNumber}. Nöbetçi`
              });
              totalStaffParsed++;
            }
          });

          // Extract Sarıyer (Çayırbaşı) Staff
          const cayirbasiStaff: StaffDuty[] = [];
          cayirbasiColIndices.forEach((colIdx, slotIdx) => {
            const rawCell = row[colIdx];
            const cleanName = sanitizeDoctorName(rawCell);
            if (cleanName && cleanName !== '-' && cleanName !== '/' && cleanName !== 'BOŞ') {
              const slotNumber = slotIdx + 1;
              cayirbasiStaff.push({
                id: `sar-${dateKey}-${slotNumber}`,
                name: cleanName,
                slot: `SARIYER-${slotNumber}`,
                role: slotNumber === 1 ? 'Çayırbaşı 1. Nöbetçi' : `Çayırbaşı ${slotNumber}. Nöbetçi`
              });
              totalStaffParsed++;
            }
          });

          days[dateKey] = {
            date: dateKey,
            formattedDate,
            dayNumber: parsedDayNum,
            dayName,
            isWeekend,
            seyrantepeStaff,
            cayirbasiStaff
          };
        }

        // Validate that we found at least some days
        const totalDaysCount = Object.keys(days).length;
        if (totalDaysCount === 0) {
          throw new Error(
            `'${targetSheetName}' sayfasında nöbet tarihi satırları tespit edilemedi. Lütfen dosyanızın tarih sütununu (TARİH) ve satırlarını kontrol ediniz.`
          );
        }

        // Validate that we extracted at least some staff
        if (totalStaffParsed === 0) {
          const detectedColHeaders = [
            ...seyrantepeColIndices.map(c => `Sütun ${c + 1} (${rawGrid[headerRowIdx]?.[c] || 'Seyrantepe'})`),
            ...cayirbasiColIndices.map(c => `Sütun ${c + 1} (${rawGrid[headerRowIdx]?.[c] || 'Sarıyer'})`)
          ].join(', ');

          throw new Error(
            `'${targetSheetName}' sayfasından ${totalDaysCount} takvim günü okundu, fakat hiçbir nöbetçi doktor ismi çekilemedi. ` +
            `Taranan sütunlar: [${detectedColHeaders || 'Yok'}]. ` +
            `Lütfen sütun başlıklarınızın 'SEYRANTEPE 1..6' ve 'SARIYER-1..4' şeklinde olduğunu veya isimlerin bu sütunların altında yer aldığını kontrol ediniz. Dilerseniz 'Excel Formatında İndir' butonuna tıklayarak resmi şablonu indirip verilerinizi yapıştırabilirsiniz.`
          );
        }

        const monthKey = `${detectedYear}-${String(detectedMonth).padStart(2, '0')}`;
        const monthTurkishName = TURKISH_MONTH_NAMES[detectedMonth - 1] || 'AY';
        const monthName = `${detectedYear} YILI ${monthTurkishName.toUpperCase()} AYI ASİSTAN NÖBET LİSTESİ`;

        const newRoster: MonthDutyRoster = {
          monthKey,
          monthName,
          lastUpdated: new Date().toISOString(),
          days
        };

        // Persist to multi-month registry and sync with backend server
        await saveRosterToServer(newRoster);
        resolve(newRoster);
      } catch (err: any) {
        reject(new Error(`Excel dosyası işlenirken hata oluştu: ${err?.message || err}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Dosya okunamadı. Lütfen geçerli bir .xlsx veya .xls dosyası seçiniz.'));
    };

    reader.readAsArrayBuffer(file);
  });
}

export interface CurrentShiftStatus {
  activeDateKey: string;
  schedule?: DayDutySchedule;
  dayNumber: number;
  dayName: string;
  displayDateText: string;
  badgeLabel: string;
  isBeforeHandover: boolean;
  handoverHour: number;
  shiftNote: string;
}

export function getTurkeyTimeComponents(d: Date = new Date()): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  dayOfWeek: number;
} {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Istanbul',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
    const parts = formatter.formatToParts(d);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();

    parts.forEach((p) => {
      if (p.type === 'year') year = parseInt(p.value, 10);
      if (p.type === 'month') month = parseInt(p.value, 10);
      if (p.type === 'day') day = parseInt(p.value, 10);
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
    });

    const turkeyDate = new Date(year, month - 1, day);
    return {
      year,
      month,
      day,
      hour,
      minute,
      dayOfWeek: turkeyDate.getDay()
    };
  } catch {
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      hour: d.getHours(),
      minute: d.getMinutes(),
      dayOfWeek: d.getDay()
    };
  }
}

/**
 * Calculates currently active hospital shift based on clinical handover rules:
 * - Weekdays (Monday through Friday): Handover occurs at 08:00 AM.
 * - Weekends (Saturday and Sunday): Handover occurs at 09:00 AM.
 * - If current time is BEFORE the handover hour, yesterday's on-duty team is still active in hospital!
 * - If current time is AT or AFTER the handover hour, today's on-duty team has taken over.
 * 
 * Also dynamically resolves into roster:
 * 1. Checks direct date match (YYYY-MM-DD)
 * 2. If user device year/month is different, matches by day-of-month (1..31)
 * 3. Gracefully defaults to latest available date
 */
export function getCurrentShiftStatus(roster: MonthDutyRoster, referenceDate: Date = new Date()): CurrentShiftStatus {
  const { year, month, day, hour, dayOfWeek } = getTurkeyTimeComponents(referenceDate);

  // 0 = Sunday, 6 = Saturday
  const isWeekendToday = dayOfWeek === 0 || dayOfWeek === 6;
  const handoverHour = isWeekendToday ? 9 : 8;

  const isBeforeHandover = hour < handoverHour;

  // Determine target calendar date for the active shift
  // If before handover, active shift started yesterday
  const targetDate = new Date(year, month - 1, day);
  if (isBeforeHandover) {
    targetDate.setDate(targetDate.getDate() - 1);
  }

  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth() + 1;
  const targetDayNum = targetDate.getDate();

  const directKey = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDayNum).padStart(2, '0')}`;
  const targetMonthKey = `${targetYear}-${String(targetMonth).padStart(2, '0')}`;

  const [rosterYearStr, rosterMonthStr] = (roster.monthKey || '').split('-');
  const rosterYear = parseInt(rosterYearStr, 10);
  const rosterMonth = parseInt(rosterMonthStr, 10);

  // A roster can only have an active "Today" shift if it matches the current calendar year & month
  const isCurrentMonthRoster = (targetYear === rosterYear && targetMonth === rosterMonth);

  const sortedKeys = Object.keys(roster.days || {}).sort();
  let resolvedKey: string = '';
  let schedule: DayDutySchedule | undefined = undefined;

  if (isCurrentMonthRoster) {
    if (roster.days[directKey]) {
      resolvedKey = directKey;
      schedule = roster.days[directKey];
    } else {
      const matchedKey = sortedKeys.find((k) => roster.days[k]?.dayNumber === targetDayNum);
      if (matchedKey) {
        resolvedKey = matchedKey;
        schedule = roster.days[matchedKey];
      }
    }
  } else {
    // If viewing a future/different month (e.g. November while in October):
    // There is no "Today" in this future month!
    resolvedKey = '';
    
    // For global ticker fallback, see if registry has the active current month's roster
    try {
      const registry = getRosterRegistry();
      if (registry[targetMonthKey] && registry[targetMonthKey].days[directKey]) {
        schedule = registry[targetMonthKey].days[directKey];
      }
    } catch {}
  }

  const displayDayNum = schedule ? schedule.dayNumber : targetDayNum;
  const displayDayName = schedule ? schedule.dayName : ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][targetDate.getDay()];
  const currentMonthTurkish = TURKISH_MONTH_NAMES[targetMonth - 1] || 'Ekim';

  const displayDateText = isCurrentMonthRoster
    ? `${displayDayNum} ${currentMonthTurkish} ${displayDayName}`.trim()
    : `${formatMonthKeyDisplay(roster.monthKey)}`;

  let shiftNote = '';
  if (isCurrentMonthRoster) {
    if (isBeforeHandover) {
      shiftNote = `Sabah 0${handoverHour}:00 nöbet değişimine kadar dünkü nöbet ekibi görevdedir`;
    } else {
      shiftNote = `Nöbet değişimi 0${handoverHour}:00'da tamamlandı`;
    }
  } else {
    shiftNote = `${formatMonthKeyDisplay(roster.monthKey)} Nöbet Çizelgesi`;
  }

  const badgeLabel = isCurrentMonthRoster
    ? (isBeforeHandover ? `${displayDayNum} ${currentMonthTurkish} (0${handoverHour}:00'a kadar)` : `${displayDayNum} ${currentMonthTurkish}`)
    : formatMonthKeyDisplay(roster.monthKey);

  return {
    activeDateKey: resolvedKey,
    schedule,
    dayNumber: displayDayNum,
    dayName: displayDayName,
    displayDateText,
    badgeLabel,
    isBeforeHandover: isCurrentMonthRoster ? isBeforeHandover : false,
    handoverHour,
    shiftNote
  };
}
