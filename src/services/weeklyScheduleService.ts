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

// 3. Hafta: 09 - 13 Kasım 2026 (Eklenen Yeni Hafta)
export const OFFICIAL_NOVEMBER_9_13_SCHEDULE: WeeklyWorkSchedule = {
  weekKey: '2026-W46',
  title: '09 - 13 Kasım 2026 Haftalık Mesai Programı',
  dateRangeText: '09.11.2026 - 13.11.2026',
  updatedAt: '2026-11-09T08:00:00Z',
  days: [
    { dateKey: '2026-11-09', dateFormatted: '09.11.2026', dayName: 'Pazartesi' },
    { dateKey: '2026-11-10', dateFormatted: '10.11.2026', dayName: 'Salı' },
    { dateKey: '2026-11-11', dateFormatted: '11.11.2026', dayName: 'Çarşamba' },
    { dateKey: '2026-11-12', dateFormatted: '12.11.2026', dayName: 'Perşembe' },
    { dateKey: '2026-11-13', dateFormatted: '13.11.2026', dayName: 'Cuma' }
  ],
  rows: [
    {
      unitId: 'genel-cerrahi',
      unitName: 'GENEL CERRAHİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['SÜLEYMAN'],
        '2026-11-10': ['EBRU'],
        '2026-11-11': ['EBRU'],
        '2026-11-12': ['EBRU'],
        '2026-11-13': ['ZEYNEP', 'EBRU', 'MUSTAFA']
      }
    },
    {
      unitId: 'nrs',
      unitName: 'NRŞ (BEYİN CERRAHİSİ)',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['FURKAN G.'],
        '2026-11-10': ['Y.DERTSİZ'],
        '2026-11-11': ['FURKAN G.'],
        '2026-11-12': ['YAKUP'],
        '2026-11-13': ['Y.DERTSİZ']
      }
    },
    {
      unitId: 'ortopedi-acil',
      unitName: 'ORTOPEDİ - ACİL',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['HANİFE', 'ZEHRA E.'],
        '2026-11-10': ['HANİFE', 'YAĞMUR M'],
        '2026-11-11': ['ZEHRA E.', 'YAKUP'],
        '2026-11-12': ['HANİFE', 'ZEHRA E.'],
        '2026-11-13': ['HANİFE', 'ZEHRA E.', 'ALPER']
      }
    },
    {
      unitId: 'kbb',
      unitName: 'KBB',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['İMRAN'],
        '2026-11-10': ['İMRAN', 'İBRAHİM'],
        '2026-11-11': ['İMRAN'],
        '2026-11-12': ['İMRAN'],
        '2026-11-13': ['İMRAN', 'İBRAHİM']
      }
    },
    {
      unitId: 'plastik-cerrahi',
      unitName: 'PLASTİK CERRAHİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['AYŞEGÜL'],
        '2026-11-10': ['AYŞEGÜL'],
        '2026-11-11': ['AYŞEGÜL'],
        '2026-11-12': ['MUSTAFA', 'PELİN'],
        '2026-11-13': ['AYŞEGÜL']
      }
    },
    {
      unitId: 'uroloji',
      unitName: 'ÜROLOJİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['YAĞMUR M.'],
        '2026-11-10': ['İBRAHİM'],
        '2026-11-11': ['İBRAHİM'],
        '2026-11-12': ['YAĞMUR M.'],
        '2026-11-13': ['MUSTAFA', 'HAMİT']
      }
    },
    {
      unitId: 'arka-kbb-goz',
      unitName: 'ARKA KBB + GÖZ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['EMİR'],
        '2026-11-10': ['HAMİT'],
        '2026-11-11': ['HAMİT'],
        '2026-11-12': ['ZEYNEP'],
        '2026-11-13': ['İBRAHİM']
      }
    },
    {
      unitId: 'kvc',
      unitName: 'KVC',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['EREN', 'MERVE A.'],
        '2026-11-10': ['EREN'],
        '2026-11-11': ['EREN'],
        '2026-11-12': ['MERVE A.'],
        '2026-11-13': ['EREN', 'MERVE A.']
      }
    },
    {
      unitId: 'ybu',
      unitName: 'YBÜ (YOĞUN BAKIM)',
      category: 'yogun_bakim',
      assignments: {
        '2026-11-09': ['FATMA', 'ALPER', 'ECEM'],
        '2026-11-10': ['MERVE A.', 'İNCİ', 'ECEM'],
        '2026-11-11': ['FATMA', 'İNCİ', 'ECEM'],
        '2026-11-12': ['FATMA', 'İNCİ', 'İBRAHİM'],
        '2026-11-13': ['FATMA', 'YAĞMUR M', 'ECEM']
      }
    },
    {
      unitId: 'post-op-ybu',
      unitName: 'POST-OP YBÜ (SEYRANTEPE)',
      category: 'yogun_bakim',
      isPostOp: 'seyrantepe',
      assignments: {
        '2026-11-09': ['YAKUP'],
        '2026-11-10': ['CAN'],
        '2026-11-11': ['CAN'],
        '2026-11-12': ['EMİR'],
        '2026-11-13': ['CAN']
      }
    },
    {
      unitId: 'dis-anestezi',
      unitName: 'DIŞ ANESTEZİ / ENDOSKOPİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['ÇAĞATAY', 'YAĞMUR D'],
        '2026-11-10': ['SÜHEYLA O.', 'BURÇAK'],
        '2026-11-11': ['ORKUT', 'BURÇAK'],
        '2026-11-12': ['ÇAĞATAY', 'FURKAN G'],
        '2026-11-13': ['ÇAĞATAY', 'BURÇAK']
      }
    },
    {
      unitId: 'poliklinik',
      unitName: 'ANESTEZİ POLİKLİNİĞİ',
      category: 'poliklinik',
      assignments: {
        '2026-11-09': ['MUSTAFA', 'Y.DERTSİZ'],
        '2026-11-10': ['MUSTAFA', 'NUMAN'],
        '2026-11-11': ['EMİR', 'NUMAN'],
        '2026-11-12': ['ORKUT', 'NUMAN'],
        '2026-11-13': ['ORKUT', 'NUMAN']
      }
    },
    {
      unitId: 'sariyer-ybu',
      unitName: 'SARIYER YBÜ',
      category: 'yogun_bakim',
      assignments: {
        '2026-11-09': ['ŞEVKİ', 'BERKAN', 'İBRAHİM'],
        '2026-11-10': ['ORKUT', 'ALPER', 'CEYDA'],
        '2026-11-11': ['ŞEVKİ', 'BERKAN', 'CEYDA'],
        '2026-11-12': ['ŞEVKİ', 'BERKAN', 'HAMİT'],
        '2026-11-13': ['ŞEVKİ', 'BERKAN', 'CEYDA']
      }
    },
    {
      unitId: 'sariyer-1-ybu',
      unitName: 'SARIYER -1 YBÜ (SARIYER POST-OP)',
      category: 'yogun_bakim',
      isPostOp: 'sariyer',
      assignments: {
        '2026-11-09': ['BERKAN'],
        '2026-11-10': ['ALPER'],
        '2026-11-11': ['BERKAN'],
        '2026-11-12': ['BERKAN'],
        '2026-11-13': ['BERKAN']
      }
    },
    {
      unitId: 'sariyer-2-ybu',
      unitName: 'SARIYER -2 YBÜ',
      category: 'yogun_bakim',
      assignments: {
        '2026-11-09': ['SÜHEYLA O.'],
        '2026-11-10': ['ÇAĞATAY'],
        '2026-11-11': ['YAĞMUR D'],
        '2026-11-12': ['SÜHEYLA O.'],
        '2026-11-13': ['SÜHEYLA O.']
      }
    },
    {
      unitId: 'sariyer-pol',
      unitName: 'SARIYER ANESTEZİ POLİKLİNİK',
      category: 'poliklinik',
      assignments: {
        '2026-11-09': ['ZEHRA P.'],
        '2026-11-10': ['ZEHRA P.'],
        '2026-11-11': ['Y.DERTSİZ'],
        '2026-11-12': ['ZEHRA P.'],
        '2026-11-13': ['ZEHRA P.']
      }
    },
    {
      unitId: 'cocuk-cerrahisi',
      unitName: 'ÇOCUK CERRAHİSİ',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['FN GÜNLÜ'],
        '2026-11-10': ['FN GÜNLÜ'],
        '2026-11-11': ['FN GÜNLÜ'],
        '2026-11-12': ['FN GÜNLÜ'],
        '2026-11-13': ['YAĞMUR D.']
      }
    },
    {
      unitId: 'dogumhane',
      unitName: 'DOĞUMHANE (C/S)',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['MERVE İ.'],
        '2026-11-10': ['MERVE İ.'],
        '2026-11-11': ['MERVE İ.'],
        '2026-11-12': ['MERVE İ.'],
        '2026-11-13': ['MERVE İ.']
      }
    },
    {
      unitId: 'kadin-dogum',
      unitName: 'KADIN DOĞUM',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': ['CELİL'],
        '2026-11-10': ['CELİL'],
        '2026-11-11': ['ALPER'],
        '2026-11-12': ['CELİL'],
        '2026-11-13': ['CELİL']
      }
    },
    {
      unitId: 'gogus-cerrahisi',
      unitName: 'GÖĞÜS CERRAHİSİ / MR-GÖĞÜS',
      category: 'ameliyathane',
      assignments: {
        '2026-11-09': [],
        '2026-11-10': ['YAĞMUR D.'],
        '2026-11-11': ['SÜLEYMAN'],
        '2026-11-12': ['SÜLEYMAN'],
        '2026-11-13': ['PELİN']
      }
    },
    {
      unitId: 'nobet-ertesi',
      unitName: 'NÖBET ERTESİ',
      category: 'diger',
      assignments: {
        '2026-11-09': [],
        '2026-11-10': [],
        '2026-11-11': [],
        '2026-11-12': [],
        '2026-11-13': ['YAĞMUR D.', 'FN.YÜCE', 'YAKUP']
      }
    },
    {
      unitId: 'izin',
      unitName: 'İZİNLİ HEKİMLER',
      category: 'diger',
      assignments: {
        '2026-11-09': ['SEVCAN'],
        '2026-11-10': [],
        '2026-11-11': [],
        '2026-11-12': [],
        '2026-11-13': []
      }
    },
    {
      unitId: 'rotasyoner',
      unitName: 'ROTASYONER ASİSTANLAR',
      category: 'diger',
      assignments: {
        '2026-11-09': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL', 'FN YÜCE'],
        '2026-11-10': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL', 'FN YÜCE'],
        '2026-11-11': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL', 'FN YÜCE'],
        '2026-11-12': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL', 'FN YÜCE'],
        '2026-11-13': ['PELİN', 'ZEYNEP', 'BATUHAN', 'BETÜL']
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
  if (!registry['2026-W46'] || !registry['2026-W46'].days) {
    registry['2026-W46'] = OFFICIAL_NOVEMBER_9_13_SCHEDULE;
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
  // Default to the newest active week (2026-W46: 09-13 Kasım)
  return '2026-W46';
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
 * Save schedule locally and notify (clean overwrite removes any stale/ghost rows for this week)
 */
export function saveWeeklyScheduleLocally(schedule: WeeklyWorkSchedule, cleanOverwrite = true): void {
  try {
    const registry = getWeeklyScheduleRegistry();
    if (cleanOverwrite && registry[schedule.weekKey]) {
      delete registry[schedule.weekKey];
    }
    registry[schedule.weekKey] = {
      ...schedule,
      updatedAt: new Date().toISOString()
    };
    saveWeeklyScheduleRegistry(registry);
    setActiveWeekKey(schedule.weekKey);
    window.dispatchEvent(new CustomEvent('etfal-schedule-updated', { detail: schedule }));
  } catch (e) {
    console.error('Error saving weekly schedule locally:', e);
  }
}

/**
 * Save schedule to Firestore and local storage / Express backend with clean overwrite guarantee
 */
export async function saveWeeklyScheduleToServer(schedule: WeeklyWorkSchedule, cleanOverwrite = true): Promise<boolean> {
  saveWeeklyScheduleLocally(schedule, cleanOverwrite);

  // Push to Firebase Firestore for permanent real-time cloud sync with clean overwrite
  try {
    const { pushWeeklyScheduleToFirestore } = await import('./firestoreSyncService');
    await pushWeeklyScheduleToFirestore(schedule, cleanOverwrite);
    console.log('[Firestore] Haftalık çalışma programı buluta kaydedildi (Temiz Üzerine Yazma):', schedule.weekKey);
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
 * Delete a specific week entirely from local storage, Express backend, and Firestore
 */
export async function deleteWeeklyScheduleLocallyAndServer(weekKey: string): Promise<boolean> {
  try {
    const registry = getWeeklyScheduleRegistry();
    if (registry[weekKey]) {
      delete registry[weekKey];
      saveWeeklyScheduleRegistry(registry);
    }

    try {
      const { deleteWeeklyScheduleFromFirestore } = await import('./firestoreSyncService');
      await deleteWeeklyScheduleFromFirestore(weekKey);
    } catch {}

    try {
      await fetch(`/api/schedule/${weekKey}`, { method: 'DELETE' });
    } catch {}

    // Reset active week to first available
    const remaining = Object.keys(registry);
    if (remaining.length > 0) {
      setActiveWeekKey(remaining[0]);
    }

    window.dispatchEvent(new CustomEvent('etfal-active-week-changed', { detail: { weekKey: getActiveWeekKey() } }));
    return true;
  } catch (err) {
    console.error('Error deleting weekly schedule:', err);
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

// Salon Normalizer for Hospital Template matching standard names
function normalizeHospitalSalon(raw: string): { 
  unitId: string; 
  unitName: string; 
  category: 'ameliyathane' | 'yogun_bakim' | 'poliklinik' | 'diger'; 
  isPostOp?: 'seyrantepe' | 'sariyer' 
} {
  const clean = raw.trim().replace(/^[:\s-]+|[:\s-]+$/g, '');
  const u = clean.toUpperCase();

  if (/^GENEL CERRAH[İI]$|^GC$/.test(u)) {
    return { unitId: 'genel-cerrahi', unitName: 'GENEL CERRAHİ', category: 'ameliyathane' };
  }
  if (/^NR[ŞS]|^BEY[İI]N CERRAH/.test(u)) {
    return { unitId: 'nrs', unitName: 'NRŞ (BEYİN CERRAHİSİ)', category: 'ameliyathane' };
  }
  if (/^ORTOPED[İI]/.test(u)) {
    return { unitId: 'ortopedi-acil', unitName: 'ORTOPEDİ - ACİL', category: 'ameliyathane' };
  }
  if (/^KBB$/.test(u)) {
    return { unitId: 'kbb', unitName: 'KBB', category: 'ameliyathane' };
  }
  if (/^PLAST[İI]K|^PRC$/.test(u)) {
    return { unitId: 'plastik-cerrahi', unitName: 'PLASTİK CERRAHİ', category: 'ameliyathane' };
  }
  if (/^[ÜU]ROLOJ[İI]|^[ÜU]RO$/.test(u)) {
    return { unitId: 'uroloji', unitName: 'ÜROLOJİ', category: 'ameliyathane' };
  }
  if (/ARKA KBB|KBB\s*\+\s*G[ÖO]Z/.test(u)) {
    return { unitId: 'arka-kbb-goz', unitName: 'ARKA KBB + GÖZ', category: 'ameliyathane' };
  }
  if (/^KVC$/.test(u)) {
    return { unitId: 'kvc', unitName: 'KVC', category: 'ameliyathane' };
  }
  if (/^YB[ÜU]$|^YO[ĞG]UN BAKIM$/.test(u)) {
    return { unitId: 'ybu', unitName: 'YBÜ (YOĞUN BAKIM)', category: 'yogun_bakim' };
  }
  if (/POST-OP YB[ÜU]|POST OP YB[ÜU]|POSTOP YB[ÜU]/.test(u)) {
    return { unitId: 'post-op-ybu', unitName: 'POST-OP YBÜ (SEYRANTEPE)', category: 'yogun_bakim', isPostOp: 'seyrantepe' };
  }
  if (/DI[ŞS] ANESTEZ[İI]|ENDOSKOP[İI]/.test(u) && !u.includes('MR')) {
    return { unitId: 'dis-anestezi', unitName: 'DIŞ ANESTEZİ / ENDOSKOPİ', category: 'ameliyathane' };
  }
  if (/^POL[İI]KL[İI]N[İI]K|^POL$|ANESTEZ[İI] POL[İI]KL[İI]N[İI][ĞG][İI]/.test(u)) {
    return { unitId: 'poliklinik', unitName: 'ANESTEZİ POLİKLİNİĞİ', category: 'poliklinik' };
  }
  if (/^SARIYER YB[ÜU]$|^SYB[ÜU]$/.test(u)) {
    return { unitId: 'sariyer-ybu', unitName: 'SARIYER YBÜ', category: 'yogun_bakim' };
  }
  if (/SARIYER\s*-?1|S-1 YB[ÜU]/.test(u)) {
    return { unitId: 'sariyer-1-ybu', unitName: 'SARIYER -1 YBÜ (SARIYER POST-OP)', category: 'yogun_bakim', isPostOp: 'sariyer' };
  }
  if (/SARIYER\s*-?2|S-2 YB[ÜU]/.test(u)) {
    return { unitId: 'sariyer-2-ybu', unitName: 'SARIYER -2 YBÜ', category: 'yogun_bakim' };
  }
  if (/SARIYER.*POL/.test(u)) {
    return { unitId: 'sariyer-pol', unitName: 'SARIYER ANESTEZİ POLİKLİNİK', category: 'poliklinik' };
  }
  if (/ÇOCUK|COCUK/.test(u)) {
    return { unitId: 'cocuk-cerrahisi', unitName: 'ÇOCUK CERRAHİSİ', category: 'ameliyathane' };
  }
  if (/DO[ĞG]UMHANE/.test(u)) {
    return { unitId: 'dogumhane', unitName: 'DOĞUMHANE (C/S)', category: 'ameliyathane' };
  }
  if (/KADIN DO[ĞG]UM/.test(u)) {
    return { unitId: 'kadin-dogum', unitName: 'KADIN DOĞUM', category: 'ameliyathane' };
  }
  if (/G[ÖO][ĞG][ÜU]S|MR.*G[ÖO][ĞG][ÜU]S|MR\\Ç/.test(u)) {
    return { unitId: 'gogus-cerrahisi', unitName: 'GÖĞÜS CERRAHİSİ / MR-GÖĞÜS', category: 'ameliyathane' };
  }
  if (/N[ÖO]BET ERTES[İI]/.test(u)) {
    return { unitId: 'nobet-ertesi', unitName: 'NÖBET ERTESİ', category: 'diger' };
  }
  if (/^İZ[İI]N|^IZIN/.test(u)) {
    return { unitId: 'izin', unitName: 'İZİNLİ HEKİMLER', category: 'diger' };
  }
  if (/ROTASYON/.test(u)) {
    return { unitId: 'rotasyoner', unitName: 'ROTASYONER ASİSTANLAR', category: 'diger' };
  }

  return {
    unitId: u.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'unit',
    unitName: clean,
    category: 'ameliyathane'
  };
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

        // 1. Detect Header Row:
        // Priority A: Row containing multiple date cells (e.g. 09.11.2026, 10.11.2026, ...)
        // Priority B: Row containing Turkish day names (PAZARTESİ, SALI, ...)
        let headerRowIdx = -1;
        interface DayColumnRange {
          dayIndex: number;
          startCol: number;
          endCol: number;
          dateStr?: string;
          dateObj?: Date;
        }

        let dayRanges: DayColumnRange[] = [];
        const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

        // Search for date headers in rows 0..15
        for (let r = 0; r < Math.min(rawGrid.length, 16); r++) {
          const row = rawGrid[r];
          if (!row || row.length === 0) continue;

          const dateMatches: { col: number; dateStr: string; dateObj: Date }[] = [];
          for (let c = 0; c < row.length; c++) {
            const cellVal = String(row[c] || '').trim();
            const m = cellVal.match(/(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/);
            if (m) {
              const day = parseInt(m[1], 10);
              const month = parseInt(m[2], 10);
              let year = parseInt(m[3], 10);
              if (year < 100) year += 2000;
              dateMatches.push({
                col: c,
                dateStr: `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`,
                dateObj: new Date(year, month - 1, day, 12, 0, 0)
              });
            }
          }

          if (dateMatches.length >= 3) {
            headerRowIdx = r;
            // Build ranges: Each day spans from its start col until the next date column
            for (let i = 0; i < Math.min(dateMatches.length, 5); i++) {
              const cur = dateMatches[i];
              const next = dateMatches[i + 1];
              const endCol = next ? (next.col - 1) : (cur.col + 2);
              dayRanges.push({
                dayIndex: i,
                startCol: cur.col,
                endCol,
                dateStr: cur.dateStr,
                dateObj: cur.dateObj
              });
            }
            break;
          }
        }

        // Priority B: Day name keywords if date cells were not found in row
        if (headerRowIdx === -1) {
          const dayKeywords = [
            ['PAZARTESİ', 'PZT', 'MON'],
            ['SALI', 'SAL', 'TUE'],
            ['ÇARŞAMBA', 'CARSAMBA', 'ÇAR', 'WED'],
            ['PERŞEMBE', 'PERSEMBE', 'PER', 'THU'],
            ['CUMA', 'CUM', 'FRI']
          ];

          for (let r = 0; r < Math.min(rawGrid.length, 16); r++) {
            const row = rawGrid[r];
            const matchedDayCols: { dayIdx: number; col: number }[] = [];
            for (let c = 0; c < row.length; c++) {
              const cellVal = String(row[c] || '').trim().toUpperCase();
              dayKeywords.forEach((keywords, dIdx) => {
                if (keywords.some(k => cellVal.includes(k))) {
                  matchedDayCols.push({ dayIdx: dIdx, col: c });
                }
              });
            }

            if (matchedDayCols.length >= 3) {
              headerRowIdx = r;
              matchedDayCols.sort((a, b) => a.col - b.col);
              for (let i = 0; i < matchedDayCols.length; i++) {
                const cur = matchedDayCols[i];
                const next = matchedDayCols[i + 1];
                const endCol = next ? (next.col - 1) : (cur.col + 2);
                dayRanges.push({
                  dayIndex: cur.dayIdx,
                  startCol: cur.col,
                  endCol
                });
              }
              break;
            }
          }
        }

        // Fallback if neither date nor day names detected: Monday=cols 1..3, Salı=cols 4..6, etc.
        if (headerRowIdx === -1 || dayRanges.length < 3) {
          headerRowIdx = 9; // Common row in hospital template
          dayRanges = [
            { dayIndex: 0, startCol: 1, endCol: 3 },
            { dayIndex: 1, startCol: 4, endCol: 6 },
            { dayIndex: 2, startCol: 7, endCol: 9 },
            { dayIndex: 3, startCol: 10, endCol: 12 },
            { dayIndex: 4, startCol: 13, endCol: 15 }
          ];
        }

        // 2. Generate Days and Week Info
        let startDay = 9;
        let endDay = 13;
        let month = 11;
        let year = 2026;

        if (dayRanges[0]?.dateObj) {
          startDay = dayRanges[0].dateObj.getDate();
          month = dayRanges[0].dateObj.getMonth() + 1;
          year = dayRanges[0].dateObj.getFullYear();
          if (dayRanges[dayRanges.length - 1]?.dateObj) {
            endDay = dayRanges[dayRanges.length - 1].dateObj!.getDate();
          } else {
            endDay = startDay + 4;
          }
        } else {
          // Detect from sheet context or filename
          const searchContext = rawGrid.slice(0, 10).flat().map(v => String(v || '').trim()).join(' ') + ' ' + file.name;
          const rangeMatch = searchContext.toUpperCase().match(/(\d{1,2})\s*[-–—/]\s*(\d{1,2})\s+([A-ZÇĞİÖŞÜ]+)\s*(\d{4})?/);
          if (rangeMatch) {
            startDay = parseInt(rangeMatch[1], 10);
            endDay = parseInt(rangeMatch[2], 10);
            const TURKISH_MONTHS: Record<string, number> = {
              'OCAK': 1, 'ŞUBAT': 2, 'SUBAT': 2, 'MART': 3, 'NİSAN': 4, 'NISAN': 4,
              'MAYIS': 5, 'HAZİRAN': 6, 'HAZIRAN': 6, 'TEMMUZ': 7, 'AĞUSTOS': 8, 'AGUSTOS': 8,
              'EYLÜL': 9, 'EYLUL': 9, 'EKİM': 10, 'EKIM': 10, 'KASIM': 11, 'ARALIK': 12
            };
            if (TURKISH_MONTHS[rangeMatch[3]]) month = TURKISH_MONTHS[rangeMatch[3]];
            if (rangeMatch[4]) year = parseInt(rangeMatch[4], 10);
          }
        }

        const days: WorkDayInfo[] = [];
        const mondayDate = new Date(year, month - 1, startDay, 12, 0, 0);

        for (let i = 0; i < 5; i++) {
          const curDate = dayRanges[i]?.dateObj || new Date(year, month - 1, startDay + i, 12, 0, 0);
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

        // 3. Parse Salon / Unit Rows: Column A (row[0]) is strictly the Unit Name!
        const rows: UnitAssignmentRow[] = [];
        const unmappedRows: { rowNumber: number; rawFirstCells: string[]; reason: string }[] = [];
        const detectedUnitsMeta: { unitName: string; category: string; doctorCount: number }[] = [];

        // Check if there's a side table in Column Q (index 16) for Nöbet Ertesi
        let nobetErtesiFromSideTable: string[] = [];

        for (let r = headerRowIdx + 1; r < rawGrid.length; r++) {
          const row = rawGrid[r];
          if (!row || row.length === 0) continue;

          // Check if Col Q (index 16) has "NÖBET ERTESİ"
          const sideHeader = String(row[16] || '').trim().toUpperCase();
          if (sideHeader.includes('NÖBET ERTESİ') || sideHeader.includes('NOBET ERTESI')) {
            const sideDocs: string[] = [];
            for (let sc = 17; sc < Math.min(row.length, 22); sc++) {
              const val = String(row[sc] || '').trim();
              if (val && !/^\d+$/.test(val)) {
                const cleaned = sanitizeDoctorName(val);
                if (cleaned && !sideDocs.includes(cleaned)) sideDocs.push(cleaned);
              }
            }
            if (sideDocs.length > 0) {
              nobetErtesiFromSideTable = sideDocs;
            }
          }

          // Column A is strictly the unit name
          let rawUnit = String(row[0] || '').trim();
          if (!rawUnit) {
            continue;
          }

          const upperUnit = rawUnit.toUpperCase();

          // Skip date headers, signature or total rows
          if (/^\d{1,2}[./-]\d{1,2}|İMZA|IMZA|HAZIRLAYAN|BAŞHEKİM|BASHEKIM|TOPLAM|ONAY|TARİH|TARIH|GÜNLÜK|HAFTALIK|PROGRAM/.test(upperUnit)) {
            unmappedRows.push({
              rowNumber: r + 1,
              rawFirstCells: [rawUnit],
              reason: 'İmza / onay / tarih satırı olarak atlandı.'
            });
            continue;
          }

          // Normalize salon name according to hospital standard template
          const normalized = normalizeHospitalSalon(rawUnit);

          // Extract doctors across each day's column range (e.g. Pazartesi = cols B, C, D)
          const assignments: Record<string, string[]> = {};
          let totalDocCount = 0;

          for (let dIdx = 0; dIdx < 5; dIdx++) {
            const dateKey = days[dIdx].dateKey;
            const range = dayRanges[dIdx] || { startCol: dIdx * 3 + 1, endCol: dIdx * 3 + 3 };
            const dayDocs: string[] = [];

            // Special case for ROTASYONER ASİSTANLAR: In hospital template, rotationers are listed in cols B..F
            if (normalized.unitId === 'rotasyoner' && dIdx > 0 && dayDocs.length === 0 && assignments[days[0].dateKey]) {
              // Rotationers attend all weekdays
              assignments[dateKey] = [...assignments[days[0].dateKey]];
              totalDocCount += assignments[dateKey].length;
              continue;
            }

            for (let c = range.startCol; c <= range.endCol; c++) {
              const cellVal = String(row[c] || '').trim();
              if (cellVal && cellVal !== '-' && cellVal !== '/' && cellVal !== 'BOŞ' && cellVal !== 'BOS') {
                const parts = cellVal.split(/[,/;|\n\r]+/).map(p => p.trim()).filter(Boolean);
                parts.forEach(p => {
                  const cleaned = sanitizeDoctorName(p);
                  if (cleaned && !dayDocs.includes(cleaned)) {
                    dayDocs.push(cleaned);
                  }
                });
              }
            }

            assignments[dateKey] = dayDocs;
            totalDocCount += dayDocs.length;
          }

          // Deduplicate / merge rows by unitId (e.g. GÖĞÜS CERRAHİSİ and MR-GÖĞÜS must strictly be one single row)
          const existingRow = rows.find(r => r.unitId === normalized.unitId);
          if (existingRow) {
            days.forEach(d => {
              const prevDocs = existingRow.assignments[d.dateKey] || [];
              const newDocs = assignments[d.dateKey] || [];
              newDocs.forEach(doc => {
                if (!prevDocs.includes(doc)) prevDocs.push(doc);
              });
              existingRow.assignments[d.dateKey] = prevDocs;
            });
          } else {
            rows.push({
              unitId: normalized.unitId,
              unitName: normalized.unitName,
              category: normalized.category,
              isPostOp: normalized.isPostOp,
              assignments
            });

            detectedUnitsMeta.push({
              unitName: normalized.unitName,
              category: normalized.category,
              doctorCount: totalDocCount
            });
          }
        }

        // If Nöbet Ertesi wasn't in Column A but was found in Column Q side table, add it
        const hasNobetErtesi = rows.some(r => r.unitId === 'nobet-ertesi');
        if (!hasNobetErtesi && nobetErtesiFromSideTable.length > 0) {
          const fridayDateKey = days[4].dateKey;
          const nobetAssignments: Record<string, string[]> = {
            [days[0].dateKey]: [],
            [days[1].dateKey]: [],
            [days[2].dateKey]: [],
            [days[3].dateKey]: [],
            [fridayDateKey]: nobetErtesiFromSideTable
          };
          rows.push({
            unitId: 'nobet-ertesi',
            unitName: 'NÖBET ERTESİ',
            category: 'diger',
            assignments: nobetAssignments
          });
          detectedUnitsMeta.push({
            unitName: 'NÖBET ERTESİ',
            category: 'diger',
            doctorCount: nobetErtesiFromSideTable.length
          });
        }

        if (rows.length === 0) {
          throw new Error('Excel dosyasında ameliyathane veya birim satırları tespit edilemedi.');
        }

        // Diagnostic information
        const dayColumnsDiag = [0, 1, 2, 3, 4].map(idx => {
          const r = dayRanges[idx] || { startCol: idx + 1, endCol: idx + 1 };
          const startLetter = String.fromCharCode(65 + r.startCol);
          const endLetter = String.fromCharCode(65 + r.endCol);
          const colLetter = startLetter === endLetter ? startLetter : `${startLetter}..${endLetter}`;
          return {
            dayName: dayNames[idx],
            colIndex: r.startCol,
            colLetter
          };
        });

        const diagnostics = {
          headerRowIndex: headerRowIdx + 1,
          dayColumns: dayColumnsDiag,
          detectedUnitCount: rows.length,
          unmappedRows,
          detectedUnits: detectedUnitsMeta
        };

        const schedule: WeeklyWorkSchedule = {
          weekKey,
          title,
          dateRangeText,
          days,
          rows,
          diagnostics,
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
