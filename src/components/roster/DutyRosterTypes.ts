export interface StaffDuty {
  id: string;
  name: string;
  slot: string; // e.g. 'SEYRANTEPE 1', 'SEYRANTEPE 2', 'SARIYER-1', 'SARIYER-2'
  role?: string; // e.g. '1. Nöbetçi', '2. Nöbetçi', etc.
}

export interface DayDutySchedule {
  date: string; // YYYY-MM-DD
  formattedDate: string; // DD.MM.YYYY
  dayNumber: number; // 1-31
  dayName: string; // 'Perşembe', 'Cuma', etc.
  isWeekend: boolean;
  seyrantepeStaff: StaffDuty[];
  cayirbasiStaff: StaffDuty[]; // Sarıyer-1, Sarıyer-2, Sarıyer-3, Sarıyer-4
  notes?: string;
}

export interface MonthDutyRoster {
  monthKey: string; // '2026-10'
  monthName: string; // '2026 YILI EKİM AYI'
  pdfUrl?: string; // Path to original clinic PDF if available
  lastUpdated: string;
  days: Record<string, DayDutySchedule>; // keyed by 'YYYY-MM-DD'
}

export type RosterRegistry = Record<string, MonthDutyRoster>;

export interface MonthOption {
  key: string; // '2026-10'
  displayName: string; // 'Ekim 2026'
  fullName: string; // '2026 YILI EKİM AYI ASİSTAN NÖBET LİSTESİ'
  dayCount: number;
  isOfficialDefault?: boolean;
}

