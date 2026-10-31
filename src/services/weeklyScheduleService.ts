import { WeeklyWorkSchedule, TodayPostOpStatus, WeeklyScheduleRegistry, WeekOption } from '../types/weeklySchedule';
import { getPreviousDayPostOpDuty } from '../components/roster/DutyRosterService';

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
 * Determines whether today is a work day (Pazartesi - Cuma) and retrieves
 * the on-duty Post-op doctors for Seyrantepe and Sarıyer, along with handover info.
 */
export function getTodayPostOpStatus(
  customSchedule?: WeeklyWorkSchedule,
  overrideDate?: Date
): TodayPostOpStatus | null {
  const registry = getWeeklyScheduleRegistry();
  const dateInfo = getIstanbulDateInfo(overrideDate);

  // Weekday check: 1 = Pazartesi, 2 = Salı, 3 = Çarşamba, 4 = Perşembe, 5 = Cuma
  const isWeekday = dateInfo.dayOfWeek >= 1 && dateInfo.dayOfWeek <= 5;
  if (!isWeekday) {
    return null; // Hafta sonu ise karşılama sayfasında görünmez
  }

  // Find which schedule contains today's dateKey
  let targetSchedule = customSchedule;
  if (!targetSchedule) {
    const allWeeks = Object.values(registry);
    targetSchedule = allWeeks.find(w => w.days.some(d => d.dateKey === dateInfo.dateKey));
    if (!targetSchedule) {
      targetSchedule = getSavedWeeklySchedule();
    }
  }

  // Find day in schedule
  let matchedDay = targetSchedule.days.find(d => d.dateKey === dateInfo.dateKey);

  // If exact dateKey not in week, match by day of week index (1:0, 2:1, etc.)
  if (!matchedDay) {
    const dayIndexMap: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
    const idx = dayIndexMap[dateInfo.dayOfWeek];
    if (idx !== undefined && targetSchedule.days[idx]) {
      matchedDay = targetSchedule.days[idx];
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
  const seyRow = targetSchedule.rows.find(r => r.isPostOp === 'seyrantepe' || r.unitName.includes('POST-OP YBÜ'));
  const seyDocs = (seyRow && seyRow.assignments[matchedDay.dateKey]) || [];

  // Extract Sarıyer Post-op ('SARIYER -1 YBÜ' row)
  const sarRow = targetSchedule.rows.find(r => r.isPostOp === 'sariyer' || r.unitName.includes('SARIYER -1 YBÜ'));
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
