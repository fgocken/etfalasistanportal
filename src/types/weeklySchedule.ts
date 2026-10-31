export interface UnitAssignmentRow {
  unitId: string;
  unitName: string;
  category: 'ameliyathane' | 'yogun_bakim' | 'poliklinik' | 'diger';
  isPostOp?: 'seyrantepe' | 'sariyer';
  /**
   * Doctors assigned per date key (e.g. '2026-10-26': ['EBRU', 'HAMİT'])
   */
  assignments: Record<string, string[]>;
}

export interface WorkDayInfo {
  dateKey: string;      // '2026-10-26'
  dateFormatted: string; // '26.10.2026'
  dayName: string;      // 'Pazartesi'
  isHoliday?: boolean;
  holidayNote?: string; // 'Cumhuriyet Bayramı'
}

export interface WeeklyWorkSchedule {
  weekKey: string;          // '2026-W44'
  title: string;            // '26 - 30 Ekim 2026 Haftalık Mesai Programı'
  dateRangeText: string;    // '26.10.2026 - 30.10.2026'
  days: WorkDayInfo[];      // 5 weekdays Monday to Friday
  rows: UnitAssignmentRow[];
  updatedAt?: string;
}

export interface TodayPostOpStatus {
  isWeekday: boolean;
  isHoliday: boolean;
  holidayNote?: string;
  dateKey: string;
  dateFormatted: string;
  dayName: string;
  seyrantepePostOp: string[];
  sariyerPostOp: string[];
  seyrantepeHandoverFrom?: string; // e.g. 'YAĞMUR M.' (Dünkü Seyrantepe-3 nöbetçisi)
  sariyerHandoverFrom?: string;    // e.g. 'CEYDA' (Dünkü Sarıyer-3 nöbetçisi)
}
