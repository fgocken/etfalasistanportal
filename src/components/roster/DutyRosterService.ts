import * as XLSX from 'xlsx';
import { MonthDutyRoster, DayDutySchedule, StaffDuty } from './DutyRosterTypes';

const STORAGE_KEY = 'etfal_anestezi_duty_roster_v3';

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
      role: idx === 0 ? 'Kıdemli / 1. Nöbetçi' : `${idx + 1}. Nöbetçi`
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
 * Gets saved roster from LocalStorage or builds the official October 2026 roster
 */
export function getSavedRoster(): MonthDutyRoster {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.days && Object.keys(parsed.days).length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse stored duty roster:', e);
  }

  const defaultRoster = buildOfficialOctoberRoster();
  saveRoster(defaultRoster);
  return defaultRoster;
}

/**
 * Saves roster to LocalStorage
 */
export function saveRoster(roster: MonthDutyRoster): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
  } catch (e) {
    console.error('Failed to save duty roster:', e);
  }
}

/**
 * Resets roster back to the clinic's official October 2026 roster
 */
export function resetToDefaultRoster(): MonthDutyRoster {
  const fresh = buildOfficialOctoberRoster();
  saveRoster(fresh);
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

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { raw: false });

        if (!jsonData || jsonData.length === 0) {
          throw new Error('Excel dosyasında okunabilir veri satırı bulunamadı.');
        }

        const days: Record<string, DayDutySchedule> = {};
        let detectedYear = 2026;
        let detectedMonth = 10; // 1-indexed

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
              dateObj = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
            } else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(rawDate)) {
              // YYYY-MM-DD
              const parts = rawDate.split('-');
              dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            } else if (!isNaN(Number(rawDate)) && Number(rawDate) >= 1 && Number(rawDate) <= 31) {
              dateObj = new Date(detectedYear, detectedMonth - 1, Number(rawDate));
            }
          }

          if (!dateObj || isNaN(dateObj.getTime())) {
            const fallbackDay = Math.min(idx + 1, 31);
            dateObj = new Date(detectedYear, detectedMonth - 1, fallbackDay);
          }

          detectedYear = dateObj.getFullYear();
          detectedMonth = dateObj.getMonth() + 1;

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
        const monthName = `${detectedYear} YILI NÖBET LİSTESİ`;

        const newRoster: MonthDutyRoster = {
          monthKey,
          monthName,
          lastUpdated: new Date().toISOString(),
          days
        };

        saveRoster(newRoster);
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
