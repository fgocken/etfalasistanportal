import * as XLSX from 'xlsx';
import { MonthDutyRoster, DayDutySchedule, StaffDuty, RosterRegistry, MonthOption } from './DutyRosterTypes';

const STORAGE_KEY = 'etfal_anestezi_duty_roster_v3';
const REGISTRY_STORAGE_KEY = 'etfal_anestezi_rosters_registry_v2';
const ACTIVE_MONTH_STORAGE_KEY = 'etfal_anestezi_active_month_key_v2';

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
        const merged: RosterRegistry = { ...localRegistry, ...data.rosters };
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
  // Update local registry immediately
  const registry = getRosterRegistry();
  registry[roster.monthKey] = roster;
  saveRosterRegistry(registry);
  setActiveMonthKey(roster.monthKey);

  // Send to server for global persistence across all clinic users
  try {
    await fetch('/api/roster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roster)
    });
  } catch (err) {
    console.warn('Failed to send roster to server API:', err);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('etfal-rosters-updated', { detail: { monthKey: roster.monthKey, registry } }));
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
export function downloadExcelTemplate(roster?: MonthDutyRoster): void {
  const currentRoster = roster || getSavedRoster();
  const rows: any[] = [];

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

  const fileName = `Sisli_Hamidiye_Etfal_Anestezi_Nobet_${currentRoster.monthKey}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

/**
 * Parses uploaded Excel file conforming to the clinic's exact SEYRANTEPE 1..6 and SARIYER-1..4 columns
 */
export async function parseExcelRoster(file: File): Promise<MonthDutyRoster> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: false });

        if (!jsonData || jsonData.length === 0) {
          throw new Error('Excel dosyasında okunabilir veri satırı bulunamadı.');
        }

        // Try detecting month and year from sheet name, file name, and cell headers
        const searchScopeText = `${file.name} ${firstSheetName} ${JSON.stringify(jsonData.slice(0, 3))}`.toUpperCase();
        
        let detectedYear = 2026;
        let detectedMonth = 10; // default baseline

        // Check for 4-digit year in scope
        const yearMatch = searchScopeText.match(/(202[4-9]|203[0-5])/);
        if (yearMatch) {
          detectedYear = parseInt(yearMatch[1], 10);
        }

        // Check for Turkish month names
        const monthMatchers: Array<{ regex: RegExp; m: number }> = [
          { regex: /OCAK/, m: 1 },
          { regex: /ŞUBAT|SUBAT/, m: 2 },
          { regex: /MART/, m: 3 },
          { regex: /N[İI]SAN/, m: 4 },
          { regex: /MAYIS/, m: 5 },
          { regex: /HAZ[İI]RAN/, m: 6 },
          { regex: /TEMMUZ/, m: 7 },
          { regex: /A[ĞG]USTOS/, m: 8 },
          { regex: /EYL[UÜ]L/, m: 9 },
          { regex: /EK[İI]M/, m: 10 },
          { regex: /KASIM/, m: 11 },
          { regex: /ARALIK/, m: 12 }
        ];

        for (const item of monthMatchers) {
          if (item.regex.test(searchScopeText)) {
            detectedMonth = item.m;
            break;
          }
        }

        // Pre-scan first 5 rows to see if any cell contains an explicit date (e.g. DD.MM.YYYY or YYYY-MM-DD)
        for (const row of jsonData.slice(0, 5)) {
          const rawRowStr = Object.values(row).join(' ');
          const ddmmyyyy = rawRowStr.match(/(\d{1,2})[./-](\d{1,2})[./-](202\d|203\d)/);
          if (ddmmyyyy) {
            const m = parseInt(ddmmyyyy[2], 10);
            const y = parseInt(ddmmyyyy[3], 10);
            if (m >= 1 && m <= 12) detectedMonth = m;
            if (y >= 2024 && y <= 2035) detectedYear = y;
            break;
          }
        }

        const days: Record<string, DayDutySchedule> = {};

        jsonData.forEach((row, idx) => {
          // Normalize column lookups (case-insensitive & whitespace trimmed)
          const findCol = (pattern: RegExp) => {
            const key = Object.keys(row).find(k => pattern.test(k.trim().toUpperCase()));
            return key ? String(row[key] || '').trim() : '';
          };

          const rawDate = findCol(/^TAR[Iİ]H/) || findCol(/^DATE/) || findCol(/^G[UÜ]N$/);
          let dateObj: Date | null = null;

          if (rawDate) {
            if (/^\d{1,2}[./-]\d{1,2}[./-]\d{4}$/.test(rawDate)) {
              // DD.MM.YYYY
              const parts = rawDate.split(/[./-]/);
              const d = parseInt(parts[0], 10);
              const m = parseInt(parts[1], 10);
              const y = parseInt(parts[2], 10);
              dateObj = new Date(y, m - 1, d);
              detectedMonth = m;
              detectedYear = y;
            } else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(rawDate)) {
              // YYYY-MM-DD
              const parts = rawDate.split('-');
              const y = parseInt(parts[0], 10);
              const m = parseInt(parts[1], 10);
              const d = parseInt(parts[2], 10);
              dateObj = new Date(y, m - 1, d);
              detectedMonth = m;
              detectedYear = y;
            } else if (!isNaN(Number(rawDate)) && Number(rawDate) >= 1 && Number(rawDate) <= 31) {
              const d = Number(rawDate);
              dateObj = new Date(detectedYear, detectedMonth - 1, d);
            }
          }

          if (!dateObj || isNaN(dateObj.getTime())) {
            const fallbackDay = Math.min(idx + 1, 31);
            dateObj = new Date(detectedYear, detectedMonth - 1, fallbackDay);
          }

          const yearStr = dateObj.getFullYear();
          const monthStr = String(detectedMonth).padStart(2, '0');
          const dayStr = String(dateObj.getDate()).padStart(2, '0');
          const dateKey = `${yearStr}-${monthStr}-${dayStr}`;
          const formattedDate = `${dayStr}.${monthStr}.${yearStr}`;

          const dayOfWeek = dateObj.getDay();
          const dayName = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][dayOfWeek];
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          // Extract Seyrantepe columns (SEYRANTEPE 1..6)
          const seyrantepeStaff: StaffDuty[] = [];
          for (let i = 1; i <= 6; i++) {
            const val = findCol(new RegExp(`^SEYRANTEPE[\\s_-]?${i}$`));
            if (val) {
              seyrantepeStaff.push({
                id: `sey-${dateKey}-${i}`,
                name: val,
                slot: `SEYRANTEPE ${i}`,
                role: i === 1 ? 'Kıdemli / 1. Nöbetçi' : `${i}. Nöbetçi`
              });
            }
          }

          // Extract Sarıyer / Çayırbaşı columns (SARIYER-1..4 or SARIYER 1..4)
          const cayirbasiStaff: StaffDuty[] = [];
          for (let i = 1; i <= 4; i++) {
            const val = findCol(new RegExp(`^(SARIYER|ÇAYIRBAŞI|CAYIRBASI)[\\s_-]?${i}$`));
            if (val) {
              cayirbasiStaff.push({
                id: `sar-${dateKey}-${i}`,
                name: val,
                slot: `SARIYER-${i}`,
                role: i === 1 ? 'Çayırbaşı 1. Nöbetçi' : `Çayırbaşı ${i}. Nöbetçi`
              });
            }
          }

          days[dateKey] = {
            date: dateKey,
            formattedDate,
            dayNumber: dateObj.getDate(),
            dayName,
            isWeekend,
            seyrantepeStaff,
            cayirbasiStaff
          };
        });

        const monthKey = `${detectedYear}-${String(detectedMonth).padStart(2, '0')}`;
        const monthTurkishName = TURKISH_MONTH_NAMES[detectedMonth - 1] || 'AY';
        const monthName = `${detectedYear} YILI ${monthTurkishName.toUpperCase()} AYI ASİSTAN NÖBET LİSTESİ`;

        const newRoster: MonthDutyRoster = {
          monthKey,
          monthName,
          lastUpdated: new Date().toISOString(),
          days
        };

        // Save to registry and post to server
        await saveRosterToServer(newRoster);
        resolve(newRoster);
      } catch (err: any) {
        reject(new Error(`Excel dosyası işlenirken hata oluştu: ${err?.message || err}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Dosya okunamadı.'));
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

  const sortedKeys = Object.keys(roster.days).sort();
  let resolvedKey: string = directKey;
  let schedule: DayDutySchedule | undefined = roster.days[directKey];

  // If direct key not found (e.g. current year is 2025 or different month from roster),
  // match by day of month (e.g. 23rd day -> 2026-10-23)
  if (!schedule) {
    const matchedKey = sortedKeys.find((k) => roster.days[k].dayNumber === targetDayNum);
    if (matchedKey) {
      resolvedKey = matchedKey;
      schedule = roster.days[matchedKey];
    } else {
      // Clamped fallback to closest day in roster
      const clampedDay = Math.min(Math.max(targetDayNum, 1), sortedKeys.length);
      resolvedKey = sortedKeys[clampedDay - 1] || sortedKeys[0] || '2026-10-22';
      schedule = roster.days[resolvedKey];
    }
  }

  const displayDayNum = schedule ? schedule.dayNumber : targetDayNum;
  const displayDayName = schedule ? schedule.dayName : ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'][targetDate.getDay()];
  const displayMonthName = roster.monthName.includes('EKİM') ? 'Ekim' : '';

  const displayDateText = `${displayDayNum} ${displayMonthName} ${displayDayName}`.trim();

  let shiftNote = '';
  if (isBeforeHandover) {
    shiftNote = `Sabah 0${handoverHour}:00 nöbet değişimine kadar dünkü nöbet ekibi görevdedir`;
  } else {
    shiftNote = `Nöbet değişimi 0${handoverHour}:00'da tamamlandı`;
  }

  return {
    activeDateKey: resolvedKey,
    schedule,
    dayNumber: displayDayNum,
    dayName: displayDayName,
    displayDateText,
    badgeLabel: isBeforeHandover ? `${displayDayNum} Ekim (0${handoverHour}:00'a kadar)` : `${displayDayNum} Ekim`,
    isBeforeHandover,
    handoverHour,
    shiftNote
  };
}
