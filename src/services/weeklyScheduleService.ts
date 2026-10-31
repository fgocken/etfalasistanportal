import { WeeklyWorkSchedule, TodayPostOpStatus, UnitAssignmentRow, WorkDayInfo } from '../types/weeklySchedule';
import { getPreviousDayPostOpDuty } from '../components/roster/DutyRosterService';

const STORAGE_KEY = 'etfal_weekly_schedule_v1';

export const OFFICIAL_OCTOBER_WEEK_SCHEDULE: WeeklyWorkSchedule = {
  weekKey: '2026-W44',
  title: '26 - 30 Ekim 2026 Haftalık Mesai Programı',
  dateRangeText: '26.10.2026 - 30.10.2026',
  updatedAt: '2026-10-30T08:00:00Z',
  days: [
    {
      dateKey: '2026-10-26',
      dateFormatted: '26.10.2026',
      dayName: 'Pazartesi'
    },
    {
      dateKey: '2026-10-27',
      dateFormatted: '27.10.2026',
      dayName: 'Salı'
    },
    {
      dateKey: '2026-10-28',
      dateFormatted: '28.10.2026',
      dayName: 'Çarşamba'
    },
    {
      dateKey: '2026-10-29',
      dateFormatted: '29.10.2026',
      dayName: 'Perşembe',
      isHoliday: true,
      holidayNote: '29 Ekim Cumhuriyet Bayramı'
    },
    {
      dateKey: '2026-10-30',
      dateFormatted: '30.10.2026',
      dayName: 'Cuma'
    }
  ],
  rows: [
    {
      unitId: 'genel-cerrahi',
      unitName: 'GENEL CERRAHİ',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['EBRU', 'HAMİT'],
        '2026-10-27': ['FN YÜCE', 'HAMİT'],
        '2026-10-28': ['EBRU', 'HAMİT'],
        '2026-10-29': [],
        '2026-10-30': ['EBRU', 'MUSTAFA']
      }
    },
    {
      unitId: 'nrs',
      unitName: 'NRŞ (BEYİN CERRAHİSİ)',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['Y.DERTSİZ'],
        '2026-10-27': ['FURKAN G.'],
        '2026-10-28': ['Y.DERTSİZ'],
        '2026-10-29': [],
        '2026-10-30': ['FURKAN G.', 'Y.DERTSİZ']
      }
    },
    {
      unitId: 'ortopedi-acil',
      unitName: 'ORTOPEDİ - ACİL',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['FN YÜCE', 'ALPER'],
        '2026-10-27': ['HANİFE', 'ZEHRA E.', 'YAKUP'],
        '2026-10-28': ['HANİFE', 'AYŞEGÜL', 'ALPER'],
        '2026-10-29': [],
        '2026-10-30': ['HANİFE', 'ZEHRA E.', 'ALPER']
      }
    },
    {
      unitId: 'kbb',
      unitName: 'KBB',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['İMRAN'],
        '2026-10-27': ['İMRAN', 'İBRAHİM'],
        '2026-10-28': ['İMRAN', 'İBRAHİM'],
        '2026-10-29': [],
        '2026-10-30': ['İMRAN', 'İBRAHİM']
      }
    },
    {
      unitId: 'plastik-cerrahi',
      unitName: 'PLASTİK CERRAHİ',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['MERVE A.'],
        '2026-10-27': ['MERVE A.'],
        '2026-10-28': ['MERVE A.'],
        '2026-10-29': [],
        '2026-10-30': ['MERVE A.']
      }
    },
    {
      unitId: 'uroloji',
      unitName: 'ÜROLOJİ',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['YAĞMUR M.'],
        '2026-10-27': ['Y.DERTSİZ'],
        '2026-10-28': ['YAĞMUR M.'],
        '2026-10-29': [],
        '2026-10-30': ['YAĞMUR M.', 'HAMİT']
      }
    },
    {
      unitId: 'arka-kbb-goz',
      unitName: 'ARKA KBB + GÖZ',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['EMİR'],
        '2026-10-27': ['EMİR'],
        '2026-10-28': ['EMİR'],
        '2026-10-29': [],
        '2026-10-30': ['EMİR']
      }
    },
    {
      unitId: 'kvc',
      unitName: 'KVC',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['AYŞEGÜL'],
        '2026-10-27': ['AYŞEGÜL', 'EREN'],
        '2026-10-28': ['EREN'],
        '2026-10-29': [],
        '2026-10-30': ['AYŞEGÜL', 'EREN']
      }
    },
    {
      unitId: 'ybu',
      unitName: 'YBÜ (YOĞUN BAKIM)',
      category: 'yogun_bakim',
      assignments: {
        '2026-10-26': ['FATMA', 'İNCİ', 'ECEM'],
        '2026-10-27': ['FATMA', 'İNCİ', 'MUSTAFA'],
        '2026-10-28': ['FATMA', 'YAKUP', 'ECEM'],
        '2026-10-29': [],
        '2026-10-30': ['FATMA', 'İNCİ', 'ECEM']
      }
    },
    {
      unitId: 'post-op-ybu',
      unitName: 'POST-OP YBÜ (SEYRANTEPE)',
      category: 'yogun_bakim',
      isPostOp: 'seyrantepe',
      assignments: {
        '2026-10-26': ['EREN'],
        '2026-10-27': ['CAN'],
        '2026-10-28': ['CAN'],
        '2026-10-29': [],
        '2026-10-30': ['CAN']
      }
    },
    {
      unitId: 'dis-anestezi',
      unitName: 'DIŞ ANESTEZİ / ENDOSKOPİ',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['ÇAĞATAY', 'BURÇAK'],
        '2026-10-27': ['ÇAĞATAY', 'BURÇAK'],
        '2026-10-28': ['ÇAĞATAY', 'FNYÜCE'],
        '2026-10-29': [],
        '2026-10-30': ['ÇAĞATAY', 'BURÇAK']
      }
    },
    {
      unitId: 'poliklinik',
      unitName: 'ANESTEZİ POLİKLİNİĞİ',
      category: 'poliklinik',
      assignments: {
        '2026-10-26': ['ORKUT', 'NUMAN'],
        '2026-10-27': ['ORKUT', 'NUMAN'],
        '2026-10-28': ['ORKUT', 'NUMAN'],
        '2026-10-29': [],
        '2026-10-30': ['ORKUT', 'NUMAN']
      }
    },
    {
      unitId: 'sariyer-ybu',
      unitName: 'SARIYER YBÜ',
      category: 'yogun_bakim',
      assignments: {
        '2026-10-26': ['ŞEVKİ', 'BERKAN', 'MUSTAFA'],
        '2026-10-27': ['YAĞMUR D', 'BERKAN', 'CEYDA'],
        '2026-10-28': ['ŞEVKİ', 'FURKAN G', 'CEYDA'],
        '2026-10-29': [],
        '2026-10-30': ['ŞEVKİ', 'BERKAN', 'CEYDA']
      }
    },
    {
      unitId: 'sariyer-1-ybu',
      unitName: 'SARIYER -1 YBÜ (SARIYER POST-OP)',
      category: 'yogun_bakim',
      isPostOp: 'sariyer',
      assignments: {
        '2026-10-26': ['BERKAN'],
        '2026-10-27': ['BERKAN'],
        '2026-10-28': ['FURKAN G.'],
        '2026-10-29': [],
        '2026-10-30': ['BERKAN']
      }
    },
    {
      unitId: 'sariyer-2-ybu',
      unitName: 'SARIYER -2 YBÜ',
      category: 'yogun_bakim',
      assignments: {
        '2026-10-26': ['SÜLEYMAN'],
        '2026-10-27': ['SÜHEYLA O.'],
        '2026-10-28': ['SÜHEYLA O.'],
        '2026-10-29': [],
        '2026-10-30': ['SÜHEYLA O.']
      }
    },
    {
      unitId: 'sariyer-pol',
      unitName: 'SARIYER ANESTEZİ POLİKLİNİK',
      category: 'poliklinik',
      assignments: {
        '2026-10-26': ['ZEHRA P.'],
        '2026-10-27': ['ZEHRA P.'],
        '2026-10-28': ['ZEHRA P.'],
        '2026-10-29': [],
        '2026-10-30': ['ZEHRA P.']
      }
    },
    {
      unitId: 'cocuk-cerrahisi',
      unitName: 'ÇOCUK CERRAHİSİ',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['FN GÜNLÜ'],
        '2026-10-27': ['FN GÜNLÜ'],
        '2026-10-28': ['FN GÜNLÜ'],
        '2026-10-29': [],
        '2026-10-30': ['FN GÜNLÜ']
      }
    },
    {
      unitId: 'dogumhane',
      unitName: 'DOĞUMHANE (C/S)',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['MERVE İ.'],
        '2026-10-27': ['MERVE İ.'],
        '2026-10-28': ['MERVE İ.'],
        '2026-10-29': [],
        '2026-10-30': ['MERVE İ.']
      }
    },
    {
      unitId: 'kadin-dogum',
      unitName: 'KADIN DOĞUM',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': ['CELİL'],
        '2026-10-27': ['CELİL'],
        '2026-10-28': ['CELİL'],
        '2026-10-29': [],
        '2026-10-30': ['CELİL']
      }
    },
    {
      unitId: 'gogus-cerrahisi',
      unitName: 'GÖĞÜS CERRAHİSİ / MR-GÖĞÜS',
      category: 'ameliyathane',
      assignments: {
        '2026-10-26': [],
        '2026-10-27': ['SÜLEYMAN'],
        '2026-10-28': ['SÜLEYMAN'],
        '2026-10-29': [],
        '2026-10-30': ['SÜLEYMAN']
      }
    },
    {
      unitId: 'nobet-ertesi',
      unitName: 'NÖBET ERTESİ',
      category: 'diger',
      assignments: {
        '2026-10-26': [],
        '2026-10-27': [],
        '2026-10-28': [],
        '2026-10-29': [],
        '2026-10-30': ['YAĞMUR D.', 'FN.YÜCE', 'YAKUP']
      }
    },
    {
      unitId: 'izin',
      unitName: 'İZİNLİ HEKİMLER',
      category: 'diger',
      assignments: {
        '2026-10-26': ['SEVCAN'],
        '2026-10-27': [],
        '2026-10-28': [],
        '2026-10-29': [],
        '2026-10-30': []
      }
    },
    {
      unitId: 'rotasyoner',
      unitName: 'ROTASYONER ASİSTANLAR',
      category: 'diger',
      assignments: {
        '2026-10-26': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL'],
        '2026-10-27': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL'],
        '2026-10-28': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL'],
        '2026-10-29': [],
        '2026-10-30': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL']
      }
    }
  ]
};

/**
 * Retrieve saved schedule from localStorage or fallback to official default
 */
export function getSavedWeeklySchedule(): WeeklyWorkSchedule {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.days) && Array.isArray(parsed.rows)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading weekly schedule from localStorage:', e);
  }
  return OFFICIAL_OCTOBER_WEEK_SCHEDULE;
}

/**
 * Save schedule to localStorage and notify listeners
 */
export function saveWeeklyScheduleLocally(schedule: WeeklyWorkSchedule): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
    window.dispatchEvent(new CustomEvent('etfal-schedule-updated', { detail: schedule }));
  } catch (e) {
    console.error('Error saving weekly schedule locally:', e);
  }
}

/**
 * Save schedule to server Express backend
 */
export async function saveWeeklyScheduleToServer(schedule: WeeklyWorkSchedule): Promise<boolean> {
  saveWeeklyScheduleLocally(schedule);
  try {
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule)
    });
    return res.ok;
  } catch (e) {
    console.warn('Network error saving weekly schedule to server, locally preserved:', e);
    return false;
  }
}

/**
 * Fetch latest weekly schedule from server Express backend
 */
export async function fetchServerWeeklySchedule(): Promise<WeeklyWorkSchedule> {
  try {
    const res = await fetch('/api/schedule');
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.days) && Array.isArray(data.rows)) {
        saveWeeklyScheduleLocally(data);
        return data;
      }
    }
  } catch (e) {
    console.warn('Server schedule fetch failed, using cached/default:', e);
  }
  return getSavedWeeklySchedule();
}

/**
 * Helper to get Istanbul local date info
 */
export function getIstanbulDateInfo(targetDate?: Date): {
  dateKey: string;      // 'YYYY-MM-DD'
  dateFormatted: string; // 'DD.MM.YYYY'
  dayOfWeek: number;    // 0: Pazar, 1: Pazartesi, ..., 6: Cumartesi
  dayName: string;
} {
  const d = targetDate || new Date();
  const istanbulFormatter = new Intl.DateTimeFormat('tr-TR', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long'
  });
  const parts = istanbulFormatter.formatToParts(d);
  const partMap: Record<string, string> = {};
  for (const p of parts) partMap[p.type] = p.value;

  const year = partMap.year || `${d.getFullYear()}`;
  const month = partMap.month || `${d.getMonth() + 1}`.padStart(2, '0');
  const day = partMap.day || `${d.getDate()}`.padStart(2, '0');
  const dayName = partMap.weekday || '';

  // Get weekday number for Europe/Istanbul
  const isoDateStr = `${year}-${month}-${day}T12:00:00Z`;
  const midDay = new Date(isoDateStr);
  const dayOfWeek = midDay.getUTCDay();

  return {
    dateKey: `${year}-${month}-${day}`,
    dateFormatted: `${day}.${month}.${year}`,
    dayOfWeek,
    dayName
  };
}

/**
 * Determines whether today is a work day (Pazartesi - Cuma) and retrieves
 * the on-duty Post-op doctors for Seyrantepe and Sarıyer.
 * Returns null if today is weekend or holiday.
 */
export function getTodayPostOpStatus(
  customSchedule?: WeeklyWorkSchedule,
  overrideDate?: Date
): TodayPostOpStatus | null {
  const schedule = customSchedule || getSavedWeeklySchedule();
  const dateInfo = getIstanbulDateInfo(overrideDate);

  // Weekday check: 1 = Pazartesi, 2 = Salı, 3 = Çarşamba, 4 = Perşembe, 5 = Cuma
  const isWeekday = dateInfo.dayOfWeek >= 1 && dateInfo.dayOfWeek <= 5;
  if (!isWeekday) {
    return null; // Hafta sonu ise karşılama sayfasında görünmez
  }

  // Find day in schedule
  // 1. Direct dateKey match
  let matchedDay = schedule.days.find(d => d.dateKey === dateInfo.dateKey);

  // 2. If dateKey not found in current week's dates (e.g. testing in a different week),
  // match by day of week index to provide accurate preview!
  if (!matchedDay) {
    const dayIndexMap: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
    const idx = dayIndexMap[dateInfo.dayOfWeek];
    if (idx !== undefined && schedule.days[idx]) {
      matchedDay = schedule.days[idx];
    }
  }

  if (!matchedDay) return null;

  if (matchedDay.isHoliday) {
    return {
      isWeekday: true,
      isHoliday: true,
      holidayNote: matchedDay.holidayNote || 'Resmi Tatil',
      dateKey: matchedDay.dateKey,
      dateFormatted: matchedDay.dateFormatted,
      dayName: matchedDay.dayName,
      seyrantepePostOp: [],
      sariyerPostOp: []
    };
  }

  // Extract Seyrantepe Post-op ('POST-OP YBÜ' row)
  const seyRow = schedule.rows.find(r => r.isPostOp === 'seyrantepe' || r.unitName.includes('POST-OP YBÜ'));
  const seyDocs = (seyRow && seyRow.assignments[matchedDay.dateKey]) || [];

  // Extract Sarıyer Post-op ('SARIYER -1 YBÜ' row)
  const sarRow = schedule.rows.find(r => r.isPostOp === 'sariyer' || r.unitName.includes('SARIYER -1 YBÜ'));
  const sarDocs = (sarRow && sarRow.assignments[matchedDay.dateKey]) || [];

  // Get previous day's duty doctors (Seyrantepe 3 & Sarıyer 3)
  const handover = getPreviousDayPostOpDuty(matchedDay.dateKey);

  return {
    isWeekday: true,
    isHoliday: false,
    dateKey: matchedDay.dateKey,
    dateFormatted: matchedDay.dateFormatted,
    dayName: matchedDay.dayName,
    seyrantepePostOp: seyDocs,
    sariyerPostOp: sarDocs,
    seyrantepeHandoverFrom: handover.seyrantepeDutyDoc || undefined,
    sariyerHandoverFrom: handover.sariyerDutyDoc || undefined
  };
}
