import * as XLSX from 'xlsx';
import { WeeklyWorkSchedule, WorkDayInfo, UnitAssignmentRow, TodayPostOpStatus, WeeklyScheduleRegistry, WeekOption } from '../types/weeklySchedule';
import { getPreviousDayPostOpDuty, sanitizeDoctorName } from '../components/roster/DutyRosterService';

const REGISTRY_STORAGE_KEY = 'etfal_weekly_schedules_registry_v2';
const ACTIVE_WEEK_STORAGE_KEY = 'etfal_weekly_active_week_key_v2';

// 1. Hafta: 26 - 30 Ekim 2026
export const OFFICIAL_OCTOBER_WEEK_SCHEDULE: WeeklyWorkSchedule = {
  weekKey: '2026-W44',
  title: '26 - 30 Ekim 2026 Haftalık Mesai Programı',
  dateRangeText: '26.10.2026 - 30.10.2026',
  updatedAt: '2026-10-30T08:00:00Z',
  days: [
    { dateKey: '2026-10-26', dateFormatted: '26.10.2026', dayName: 'Pazartesi' },
    { dateKey: '2026-10-27', dateFormatted: '27.10.2026', dayName: 'Salı' },
    { dateKey: '2026-10-28', dateFormatted: '28.10.2026', dayName: 'Çarşamba' },
    { dateKey: '2026-10-29', dateFormatted: '29.10.2026', dayName: 'Perşembe', isHoliday: true, holidayNote: '29 Ekim Cumhuriyet Bayramı' },
    { dateKey: '2026-10-30', dateFormatted: '30.10.2026', dayName: 'Cuma' }
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
        '2026-10-30': ['MERVE İ']
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

// 2. Hafta: 02 - 06 Kasım 2026 (Yüklenen Yeni PDF)
export const OFFICIAL_NOVEMBER_WEEK_SCHEDULE: WeeklyWorkSchedule = {
  weekKey: '2026-W45',
  title: '02 - 06 Kasım 2026 Haftalık Mesai Programı',
  dateRangeText: '02.11.2026 - 06.11.2026',
  updatedAt: '2026-10-31T08:00:00Z',
  days: [
    { dateKey: '2026-11-02', dateFormatted: '02.11.2026', dayName: 'Pazartesi' },
    { dateKey: '2026-11-03', dateFormatted: '03.11.2026', dayName: 'Salı' },
    { dateKey: '2026-11-04', dateFormatted: '04.11.2026', dayName: 'Çarşamba' },
    { dateKey: '2026-11-05', dateFormatted: '05.11.2026', dayName: 'Perşembe' },
    { dateKey: '2026-11-06', dateFormatted: '06.11.2026', dayName: 'Cuma' }
  ],
  rows: [
    {
      unitId: 'genel-cerrahi',
      unitName: 'GENEL CERRAHİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['EBRU', 'FN YÜCE'],
        '2026-11-03': ['EBRU'],
        '2026-11-04': ['EBRU', 'MUSTAFA'],
        '2026-11-05': ['EBRU'],
        '2026-11-06': ['EBRU']
      }
    },
    {
      unitId: 'nrs',
      unitName: 'NRŞ (BEYİN CERRAHİSİ)',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['FURKAN G.'],
        '2026-11-03': ['YAKUP'],
        '2026-11-04': ['FURKAN G.'],
        '2026-11-05': ['Y.DERTSİZ'],
        '2026-11-06': ['BETÜL']
      }
    },
    {
      unitId: 'ortopedi-acil',
      unitName: 'ORTOPEDİ - ACİL',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['YAĞMUR D.', 'ZEHRA E.', 'SÜLEYMAN'],
        '2026-11-03': ['HANİFE', 'ZEHRA E.'],
        '2026-11-04': ['HANİFE', 'ZEHRA E.', 'ALPER'],
        '2026-11-05': ['HANİFE', 'ZEHRA E.'],
        '2026-11-06': ['BATUHAN', 'YAKUP']
      }
    },
    {
      unitId: 'kbb',
      unitName: 'KBB',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['İMRAN'],
        '2026-11-03': ['İMRAN', 'İBRAHİM'],
        '2026-11-04': ['İMRAN'],
        '2026-11-05': ['AYŞEGÜL'],
        '2026-11-06': ['AYŞEGÜL']
      }
    },
    {
      unitId: 'plastik-cerrahi',
      unitName: 'PLASTİK CERRAHİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['AYŞEGÜL'],
        '2026-11-03': ['AYŞEGÜL'],
        '2026-11-04': ['MERVE A.'],
        '2026-11-05': ['YAĞMUR M.'],
        '2026-11-06': ['YAĞMUR M.']
      }
    },
    {
      unitId: 'uroloji',
      unitName: 'ÜROLOJİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['YAĞMUR M.'],
        '2026-11-03': ['MERVE A', 'HAMİT'],
        '2026-11-04': ['YAĞMUR M.'],
        '2026-11-05': ['MUSTAFA'],
        '2026-11-06': ['İBRAHİM']
      }
    },
    {
      unitId: 'arka-kbb-goz',
      unitName: 'ARKA KBB + GÖZ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['EMİR'],
        '2026-11-03': ['EMİR'],
        '2026-11-04': ['EMİR'],
        '2026-11-05': [],
        '2026-11-06': ['HAMİT']
      }
    },
    {
      unitId: 'kvc',
      unitName: 'KVC',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['MERVE A', 'EREN'],
        '2026-11-03': ['EREN'],
        '2026-11-04': ['EREN'],
        '2026-11-05': ['EREN'],
        '2026-11-06': ['EREN']
      }
    },
    {
      unitId: 'ybu',
      unitName: 'YBÜ (YOĞUN BAKIM)',
      category: 'yogun_bakim',
      assignments: {
        '2026-11-02': ['FATMA', 'İNCİ', 'ECEM'],
        '2026-11-03': ['FN YÜCE', 'İNCİ', 'ECEM'],
        '2026-11-04': ['FATMA', 'Y.DERTSİZ', 'İBRAHİM'],
        '2026-11-05': ['BATUHAN', 'İNCİ', 'ECEM'],
        '2026-11-06': ['FATMA', 'İNCİ']
      }
    },
    {
      unitId: 'post-op-ybu',
      unitName: 'POST-OP YBÜ (SEYRANTEPE)',
      category: 'yogun_bakim',
      isPostOp: 'seyrantepe',
      assignments: {
        '2026-11-02': ['CAN'],
        '2026-11-03': ['CAN'],
        '2026-11-04': ['CAN'],
        '2026-11-05': ['ALPER'],
        '2026-11-06': ['CAN']
      }
    },
    {
      unitId: 'dis-anestezi',
      unitName: 'DIŞ ANESTEZİ / ENDOSKOPİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['ÇAĞATAY', 'BURÇAK'],
        '2026-11-03': ['ÇAĞATAY', 'BURÇAK'],
        '2026-11-04': ['ÇAĞATAY', 'FN YÜCE'],
        '2026-11-05': ['ÇAĞATAY', 'BURÇAK'],
        '2026-11-06': ['ÇAĞATAY', 'BURÇAK']
      }
    },
    {
      unitId: 'poliklinik',
      unitName: 'ANESTEZİ POLİKLİNİĞİ',
      category: 'poliklinik',
      assignments: {
        '2026-11-02': ['ORKUT', 'NUMAN'],
        '2026-11-03': ['ORKUT', 'MUSTAFA'],
        '2026-11-04': ['ORKUT', 'NUMAN'],
        '2026-11-05': ['EMİR', 'NUMAN'],
        '2026-11-06': ['EMİR', 'NUMAN']
      }
    },
    {
      unitId: 'sariyer-ybu',
      unitName: 'SARIYER YBÜ',
      category: 'yogun_bakim',
      assignments: {
        '2026-11-02': ['ŞEVKİ', 'BERKAN', 'HAMİT'],
        '2026-11-03': ['ŞEVKİ', 'ALPER', 'CEYDA'],
        '2026-11-04': ['ŞEVKİ', 'BERKAN', 'CEYDA'],
        '2026-11-05': ['ŞEVKİ', 'BERKAN', 'HAMİT'],
        '2026-11-06': ['ŞEVKİ', 'BERKAN']
      }
    },
    {
      unitId: 'sariyer-1-ybu',
      unitName: 'SARIYER -1 YBÜ (SARIYER POST-OP)',
      category: 'yogun_bakim',
      isPostOp: 'sariyer',
      assignments: {
        '2026-11-02': ['BERKAN'],
        '2026-11-03': ['ALPER'],
        '2026-11-04': ['BERKAN'],
        '2026-11-05': ['BERKAN'],
        '2026-11-06': ['BERKAN']
      }
    },
    {
      unitId: 'sariyer-2-ybu',
      unitName: 'SARIYER -2 YBÜ',
      category: 'yogun_bakim',
      assignments: {
        '2026-11-02': ['SÜHEYLA O.'],
        '2026-11-03': ['SÜHEYLA O.'],
        '2026-11-04': ['SÜHEYLA O.'],
        '2026-11-05': ['FURKAN G.'],
        '2026-11-06': ['SÜHEYLA O.']
      }
    },
    {
      unitId: 'sariyer-pol',
      unitName: 'SARIYER ANESTEZİ POLİKLİNİK',
      category: 'poliklinik',
      assignments: {
        '2026-11-02': ['ZEHRA P.'],
        '2026-11-03': ['ZEHRA P.'],
        '2026-11-04': ['ZEHRA P.'],
        '2026-11-05': ['MERVE A'],
        '2026-11-06': ['ZEHRA P.']
      }
    },
    {
      unitId: 'cocuk-cerrahisi',
      unitName: 'ÇOCUK CERRAHİSİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['FN GÜNLÜ'],
        '2026-11-03': ['YAĞMUR D'],
        '2026-11-04': ['FN GÜNLÜ'],
        '2026-11-05': ['FN GÜNLÜ'],
        '2026-11-06': ['FN GÜNLÜ']
      }
    },
    {
      unitId: 'dogumhane',
      unitName: 'DOĞUMHANE (C/S)',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['MERVE İ.', 'Y DERTSİZ'],
        '2026-11-03': ['MERVE İ.'],
        '2026-11-04': ['MERVE İ.'],
        '2026-11-05': ['MERVE İ.'],
        '2026-11-06': ['MERVE İ.']
      }
    },
    {
      unitId: 'kadin-dogum',
      unitName: 'KADIN DOĞUM',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': ['CELİL'],
        '2026-11-03': ['CELİL'],
        '2026-11-04': ['YAKUP'],
        '2026-11-05': ['CELİL'],
        '2026-11-06': ['CELİL']
      }
    },
    {
      unitId: 'gogus-cerrahisi',
      unitName: 'GÖĞÜS CERRAHİSİ / MR-GÖĞÜS',
      category: 'ameliyathane',
      assignments: {
        '2026-11-02': [],
        '2026-11-03': ['SÜLEYMAN'],
        '2026-11-04': ['SÜLEYMAN'],
        '2026-11-05': ['SÜLEYMAN'],
        '2026-11-06': ['ORKUT']
      }
    },
    {
      unitId: 'nobet-ertesi',
      unitName: 'NÖBET ERTESİ',
      category: 'diger',
      assignments: {
        '2026-11-02': [],
        '2026-11-03': [],
        '2026-11-04': [],
        '2026-11-05': [],
        '2026-11-06': ['YAĞMUR D.', 'FN.YÜCE', 'YAKUP']
      }
    },
    {
      unitId: 'izin',
      unitName: 'İZİNLİ HEKİMLER',
      category: 'diger',
      assignments: {
        '2026-11-02': ['SEVCAN'],
        '2026-11-03': [],
        '2026-11-04': [],
        '2026-11-05': [],
        '2026-11-06': []
      }
    },
    {
      unitId: 'rotasyoner',
      unitName: 'ROTASYONER ASİSTANLAR',
      category: 'diger',
      assignments: {
        '2026-11-02': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL'],
        '2026-11-03': [],
        '2026-11-04': [],
        '2026-11-05': [],
        '2026-11-06': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL']
      }
    }
  ]
};

/**
 * Retrieves the multi-week schedule registry from LocalStorage
 */
export function getWeeklyScheduleRegistry(): WeeklyScheduleRegistry {
  let registry: WeeklyScheduleRegistry = {};
  try {
    const raw = localStorage.getItem(REGISTRY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        registry = parsed;
      }
    }
  } catch (e) {
    console.error('Error reading weekly schedule registry:', e);
  }

  // Ensure default weeks exist
  if (!registry['2026-W44'] || !registry['2026-W44'].days) {
    registry['2026-W44'] = OFFICIAL_OCTOBER_WEEK_SCHEDULE;
  }
  if (!registry['2026-W45'] || !registry['2026-W45'].days) {
    registry['2026-W45'] = OFFICIAL_NOVEMBER_WEEK_SCHEDULE;
  }

  return registry;
}

export function saveWeeklyScheduleRegistry(registry: WeeklyScheduleRegistry): void {
  try {
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(registry));
  } catch (e) {
    console.error('Error saving weekly schedule registry:', e);
  }
}

export function getActiveWeekKey(): string {
  try {
    const saved = localStorage.getItem(ACTIVE_WEEK_STORAGE_KEY);
    if (saved) return saved;
  } catch {}
  // Default to November week (2026-W45) as it is the current/latest loaded week
  return '2026-W45';
}

export function setActiveWeekKey(weekKey: string): void {
  try {
    localStorage.setItem(ACTIVE_WEEK_STORAGE_KEY, weekKey);
    window.dispatchEvent(new CustomEvent('etfal-active-week-changed', { detail: { weekKey } }));
  } catch {}
}

export function getAvailableWeekOptions(): WeekOption[] {
  const registry = getWeeklyScheduleRegistry();
  const keys = Object.keys(registry).sort();
  const currentKey = getActiveWeekKey();

  return keys.map(key => {
    const sch = registry[key];
    return {
      key,
      title: sch?.title || key,
      dateRangeText: sch?.dateRangeText || key,
      displayName: sch?.dateRangeText || key,
      isCurrent: key === currentKey
    };
  });
}

/**
 * Retrieve saved schedule for a specific week or the currently active week
 */
export function getSavedWeeklySchedule(specificWeekKey?: string): WeeklyWorkSchedule {
  const registry = getWeeklyScheduleRegistry();
  const targetKey = specificWeekKey || getActiveWeekKey();

  if (registry[targetKey] && registry[targetKey].days) {
    return registry[targetKey];
  }

  if (registry['2026-W45']) return registry['2026-W45'];
  if (registry['2026-W44']) return registry['2026-W44'];
  return OFFICIAL_NOVEMBER_WEEK_SCHEDULE;
}

/**
 * Save schedule locally and notify
 */
export function saveWeeklyScheduleLocally(schedule: WeeklyWorkSchedule): void {
  try {
    const registry = getWeeklyScheduleRegistry();
    registry[schedule.weekKey] = schedule;
    saveWeeklyScheduleRegistry(registry);
    setActiveWeekKey(schedule.weekKey);
    window.dispatchEvent(new CustomEvent('etfal-schedule-updated', { detail: schedule }));
  } catch (e) {
    console.error('Error saving weekly schedule locally:', e);
  }
}

/**
 * Save schedule to Firestore and local storage / Express backend
 */
export async function saveWeeklyScheduleToServer(schedule: WeeklyWorkSchedule): Promise<boolean> {
  saveWeeklyScheduleLocally(schedule);

  // Push to Firebase Firestore for permanent real-time cloud sync across all visitors
  try {
    const { pushWeeklyScheduleToFirestore } = await import('./firestoreSyncService');
    await pushWeeklyScheduleToFirestore(schedule);
    console.log('[Firestore] Haftalık çalışma programı buluta kaydedildi:', schedule.weekKey);
  } catch (fsErr) {
    console.warn('[Firestore] Haftalık program kaydında Firestore uyarısı:', fsErr);
  }

  try {
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule)
    });
    return res.ok;
  } catch (e) {
    console.warn('Network error saving weekly schedule to server, locally preserved:', e);
    return true; // Preserved locally and in Firestore
  }
}

/**
 * Fetch latest weekly schedules from server Express backend
 */
export async function fetchServerWeeklySchedule(): Promise<WeeklyWorkSchedule> {
  try {
    const res = await fetch('/api/schedule');
    if (res.ok) {
      const data = await res.json();
      if (data) {
        if (data.schedules && typeof data.schedules === 'object') {
          saveWeeklyScheduleRegistry(data.schedules);
          if (data.activeWeekKey) {
            setActiveWeekKey(data.activeWeekKey);
          }
          return getSavedWeeklySchedule(data.activeWeekKey);
        } else if (Array.isArray(data.days) && Array.isArray(data.rows)) {
          saveWeeklyScheduleLocally(data);
          return data;
        }
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
 * Determines whether today is a work day (Pazartesi - Cuma) or weekend (Cumartesi - Pazar).
 * Hafta içi ise günün post-op hekimlerini ve dünkü nöbetçiden devir bilgisini döndürür.
 * Hafta sonu (Cumartesi / Pazar) ise Pazartesi gününün post-op hekimlerini ve Pazar nöbetçisinden
 * devir alacağı bilgiyi hazırlar.
 */
export function getTodayPostOpStatus(
  customSchedule?: WeeklyWorkSchedule,
  overrideDate?: Date
): TodayPostOpStatus | null {
  const registry = getWeeklyScheduleRegistry();
  const dateInfo = getIstanbulDateInfo(overrideDate);

  // 1 = Pazartesi, 2 = Salı, 3 = Çarşamba, 4 = Perşembe, 5 = Cuma, 6 = Cumartesi, 0 = Pazar
  const isWeekend = dateInfo.dayOfWeek === 0 || dateInfo.dayOfWeek === 6;
  const isWeekday = !isWeekend;

  let targetDateInfo = dateInfo;
  let isWeekendPreview = false;

  if (isWeekend) {
    isWeekendPreview = true;
    // Hafta sonu (Cumartesi ise +2 gün, Pazar ise +1 gün) -> Önümüzdeki Pazartesi
    const d = overrideDate ? new Date(overrideDate.getTime()) : new Date();
    const daysUntilMonday = dateInfo.dayOfWeek === 6 ? 2 : 1;
    const mondayDate = new Date(d.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000);
    targetDateInfo = getIstanbulDateInfo(mondayDate);
  }

  // Find which schedule contains targetDateInfo.dateKey
  let targetSchedule = customSchedule;
  if (!targetSchedule) {
    const allWeeks = Object.values(registry);
    targetSchedule = allWeeks.find(w => w.days.some(d => d.dateKey === targetDateInfo.dateKey));
    if (!targetSchedule) {
      targetSchedule = getSavedWeeklySchedule();
    }
  }

  // Find day in schedule
  let matchedDay = targetSchedule.days.find(d => d.dateKey === targetDateInfo.dateKey);

  // If exact dateKey not in week, match by day of week index (Pazartesi = 0)
  if (!matchedDay) {
    const dayIndexMap: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
    const idx = isWeekend ? 0 : dayIndexMap[dateInfo.dayOfWeek];
    if (idx !== undefined && targetSchedule.days[idx]) {
      matchedDay = targetSchedule.days[idx];
    }
  }

  if (!matchedDay) return null;

  if (matchedDay.isHoliday) {
    return {
      isWeekday,
      isHoliday: true,
      isWeekendPreview,
      holidayNote: matchedDay.holidayNote || 'Resmi Tatil',
      dateKey: matchedDay.dateKey,
      dateFormatted: matchedDay.dateFormatted,
      previewTargetDateFormatted: isWeekendPreview ? matchedDay.dateFormatted : undefined,
      dayName: matchedDay.dayName,
      seyrantepePostOp: [],
      sariyerPostOp: []
    };
  }

  // Extract Seyrantepe Post-op ('POST-OP YBÜ' row)
  const seyRow = targetSchedule.rows.find(r => r.isPostOp === 'seyrantepe' || r.unitName.includes('POST-OP YBÜ'));
  const seyDocs = (seyRow && seyRow.assignments[matchedDay.dateKey]) || [];

  // Extract Sarıyer Post-op ('SARIYER -1 YBÜ' row)
  const sarRow = targetSchedule.rows.find(r => r.isPostOp === 'sariyer' || r.unitName.includes('SARIYER -1 YBÜ'));
  const sarDocs = (sarRow && sarRow.assignments[matchedDay.dateKey]) || [];

  // Get previous day's duty doctors (Pazartesi için Pazar günkü Seyrantepe-3 ve Sarıyer-3 nöbetçileri)
  const handover = getPreviousDayPostOpDuty(matchedDay.dateKey);

  return {
    isWeekday,
    isHoliday: false,
    isWeekendPreview,
    dateKey: matchedDay.dateKey,
    dateFormatted: matchedDay.dateFormatted,
    previewTargetDateFormatted: isWeekendPreview ? matchedDay.dateFormatted : undefined,
    dayName: matchedDay.dayName,
    seyrantepePostOp: seyDocs,
    sariyerPostOp: sarDocs,
    seyrantepeHandoverFrom: handover.seyrantepeDutyDoc || undefined,
    sariyerHandoverFrom: handover.sariyerDutyDoc || undefined
  };
}

/**
 * Calculates ISO 8601 week number (1..53)
 */
export function getISOWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/**
 * Converts a browser File to base64 data URL
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Dosya verisi okunamadı.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Parse Weekly Work Schedule from Excel (.xlsx, .xls)
 */
export async function parseWeeklyScheduleExcel(file: File): Promise<WeeklyWorkSchedule> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        if (!buffer) throw new Error('Dosya verisi okunamadı');

        const workbook = XLSX.read(buffer, { type: 'array' });
        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          throw new Error('Excel dosyasında çalışma sayfası bulunamadı');
        }

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawGrid: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

        if (!rawGrid || rawGrid.length === 0) {
          throw new Error('Seçilen sayfada veri satırları bulunamadı');
        }

        // 1. Detect Header Row with Days (Pazartesi, Salı, Çarşamba, Perşembe, Cuma)
        let headerRowIdx = -1;
        let dayColIndices: Record<number, number> = {};

        const dayKeywords = [
          ['PAZARTESİ', 'PZT', 'MON'],
          ['SALI', 'SAL', 'TUE'],
          ['ÇARŞAMBA', 'CARSAMBA', 'ÇAR', 'WED'],
          ['PERŞEMBE', 'PERSEMBE', 'PER', 'THU'],
          ['CUMA', 'CUM', 'FRI']
        ];

        for (let r = 0; r < Math.min(rawGrid.length, 12); r++) {
          const row = rawGrid[r];
          const matchedDays: Record<number, number> = {};
          for (let c = 0; c < row.length; c++) {
            const cellVal = String(row[c] || '').trim().toUpperCase();
            dayKeywords.forEach((keywords, dayIdx) => {
              if (keywords.some(k => cellVal.includes(k))) {
                matchedDays[dayIdx] = c;
              }
            });
          }
          if (Object.keys(matchedDays).length >= 3) {
            headerRowIdx = r;
            dayColIndices = matchedDays;
            break;
          }
        }

        // Fallback column positions if day headers not explicitly named: cols 1..5
        if (headerRowIdx === -1 || Object.keys(dayColIndices).length < 3) {
          headerRowIdx = 0;
          for (let i = 0; i < 5; i++) {
            dayColIndices[i] = i + 1;
          }
        }

        // 2. Detect Week Date Range & Year
        let startDay = 2;
        let endDay = 6;
        let month = 11;
        let year = 2026;

        const searchContext = rawGrid.slice(0, 6).flat().map(v => String(v || '').trim()).join(' ') + ' ' + file.name;
        const upperContext = searchContext.toUpperCase();

        const TURKISH_MONTHS: Record<string, number> = {
          'OCAK': 1, 'ŞUBAT': 2, 'SUBAT': 2, 'MART': 3, 'NİSAN': 4, 'NISAN': 4,
          'MAYIS': 5, 'HAZİRAN': 6, 'HAZIRAN': 6, 'TEMMUZ': 7, 'AĞUSTOS': 8, 'AGUSTOS': 8,
          'EYLÜL': 9, 'EYLUL': 9, 'EKİM': 10, 'EKIM': 10, 'KASIM': 11, 'ARALIK': 12
        };

        const rangeMatch = upperContext.match(/(\d{1,2})\s*[-–—/]\s*(\d{1,2})\s+([A-ZÇĞİÖŞÜ]+)\s*(\d{4})?/);
        if (rangeMatch) {
          startDay = parseInt(rangeMatch[1], 10);
          endDay = parseInt(rangeMatch[2], 10);
          const monthStr = rangeMatch[3];
          if (TURKISH_MONTHS[monthStr]) {
            month = TURKISH_MONTHS[monthStr];
          }
          if (rangeMatch[4]) {
            year = parseInt(rangeMatch[4], 10);
          }
        } else {
          const dotMatch = upperContext.match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
          if (dotMatch) {
            startDay = parseInt(dotMatch[1], 10);
            month = parseInt(dotMatch[2], 10);
            let y = parseInt(dotMatch[3], 10);
            if (y < 100) y += 2000;
            year = y;
            endDay = startDay + 4;
          }
        }

        // Generate 5 days (Monday to Friday)
        const days: WorkDayInfo[] = [];
        const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
        const mondayDate = new Date(year, month - 1, startDay, 12, 0, 0);

        for (let i = 0; i < 5; i++) {
          const curDate = new Date(year, month - 1, startDay + i, 12, 0, 0);
          const cYear = curDate.getFullYear();
          const cMonth = curDate.getMonth() + 1;
          const cDay = curDate.getDate();
          const dateKey = `${cYear}-${String(cMonth).padStart(2, '0')}-${String(cDay).padStart(2, '0')}`;
          const dateFormatted = `${String(cDay).padStart(2, '0')}.${String(cMonth).padStart(2, '0')}.${cYear}`;

          const isHoliday = (cMonth === 10 && cDay === 29) || (cMonth === 1 && cDay === 1) || (cMonth === 4 && cDay === 23) || (cMonth === 5 && cDay === 1);
          const holidayNote = (cMonth === 10 && cDay === 29) ? '29 Ekim Cumhuriyet Bayramı' : undefined;

          days.push({
            dateKey,
            dateFormatted,
            dayName: dayNames[i],
            isHoliday,
            holidayNote
          });
        }

        const weekNum = getISOWeekNumber(mondayDate);
        const weekKey = `${year}-W${String(weekNum).padStart(2, '0')}`;
        const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        const turkishMonthName = monthNames[month - 1] || 'Kasım';
        const title = `${String(startDay).padStart(2, '0')} - ${String(endDay).padStart(2, '0')} ${turkishMonthName} ${year} Haftalık Mesai Programı`;
        const dateRangeText = `${days[0].dateFormatted} - ${days[4].dateFormatted}`;

        // 3. Parse Salon / Unit Rows
        const rows: UnitAssignmentRow[] = [];
        const unitColIdx = 0;

        for (let r = headerRowIdx + 1; r < rawGrid.length; r++) {
          const row = rawGrid[r];
          if (!row || row.length === 0) continue;

          let unitName = String(row[unitColIdx] || row[1] || '').trim();
          if (!unitName || unitName.length < 2) continue;

          const upperUnit = unitName.toUpperCase();
          if (/İMZA|IMZA|HAZIRLAYAN|BAŞHEKİM|TOPLAM|ONAY/.test(upperUnit)) continue;

          let category: 'ameliyathane' | 'yogun_bakim' | 'poliklinik' | 'diger' = 'ameliyathane';
          let isPostOp: 'seyrantepe' | 'sariyer' | undefined = undefined;

          if (/YBÜ|YOGUN BAKIM|YOĞUN BAKIM/.test(upperUnit)) {
            category = 'yogun_bakim';
          } else if (/POLİKLİNİK|POLIKLINIK/.test(upperUnit)) {
            category = 'poliklinik';
          } else if (/İZİN|ROTASYON|NÖBET ERTESİ|NOBET ERTESI/.test(upperUnit)) {
            category = 'diger';
          }

          if (/SARIYER.*POST-OP|SARIYER -1/.test(upperUnit)) {
            isPostOp = 'sariyer';
          } else if (/SEYRANTEPE.*POST-OP/.test(upperUnit)) {
            isPostOp = 'seyrantepe';
          }

          const assignments: Record<string, string[]> = {};
          for (let dIdx = 0; dIdx < 5; dIdx++) {
            const dateKey = days[dIdx].dateKey;
            const col = dayColIndices[dIdx] !== undefined ? dayColIndices[dIdx] : (dIdx + 1);
            const rawCell = row[col];

            const docs: string[] = [];
            if (rawCell) {
              const str = String(rawCell).trim();
              if (str && str !== '-' && str !== '/' && str !== 'BOŞ') {
                const parts = str.split(/[,/;|\n\r]+/).map(p => p.trim()).filter(Boolean);
                parts.forEach(p => {
                  const cleaned = sanitizeDoctorName(p);
                  if (cleaned && !docs.includes(cleaned)) {
                    docs.push(cleaned);
                  }
                });
              }
            }
            assignments[dateKey] = docs;
          }

          const unitId = upperUnit
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || `unit-${r}`;

          rows.push({
            unitId,
            unitName,
            category,
            isPostOp,
            assignments
          });
        }

        if (rows.length === 0) {
          throw new Error('Excel dosyasında ameliyathane veya birim satırları tespit edilemedi.');
        }

        const schedule: WeeklyWorkSchedule = {
          weekKey,
          title,
          dateRangeText,
          days,
          rows,
          updatedAt: new Date().toISOString()
        };

        resolve(schedule);
      } catch (err: any) {
        reject(new Error(`Excel dosyası işlenirken hata: ${err?.message || err}`));
      }
    };
    reader.onerror = () => reject(new Error('Dosya okunamadı.'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Parse Weekly Work Schedule from PDF (.pdf) via backend /api/parse-schedule-pdf
 */
export async function parseWeeklySchedulePDF(file: File): Promise<WeeklyWorkSchedule> {
  const base64 = await fileToBase64(file);
  const res = await fetch('/api/parse-schedule-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pdfBase64: base64,
      fileName: file.name
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error || 'PDF dosyası sunucu tarafından analiz edilemedi');
  }

  const data = await res.json();
  if (!data || !data.schedule) {
    throw new Error('PDF dosyasından geçerli bir haftalık mesai programı çıkarılamadı');
  }

  return data.schedule as WeeklyWorkSchedule;
}

/**
 * Universal Weekly Schedule parser supporting both Excel (.xlsx, .xls) and PDF (.pdf)
 */
export async function parseWeeklyScheduleFile(file: File): Promise<WeeklyWorkSchedule> {
  const ext = file.name.toLowerCase();
  if (ext.endsWith('.xlsx') || ext.endsWith('.xls')) {
    return parseWeeklyScheduleExcel(file);
  } else if (ext.endsWith('.pdf')) {
    return parseWeeklySchedulePDF(file);
  } else {
    throw new Error('Desteklenmeyen dosya formatı. Lütfen .xlsx, .xls veya .pdf dosyası seçiniz.');
  }
}
