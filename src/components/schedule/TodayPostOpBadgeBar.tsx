import React, { useState, useEffect } from 'react';
import { Activity, ChevronRight, Stethoscope, Building2 } from 'lucide-react';
import { TodayPostOpStatus } from '../../types/weeklySchedule';
import { getTodayPostOpStatus, fetchServerWeeklySchedule } from '../../services/weeklyScheduleService';

interface TodayPostOpBadgeBarProps {
  isDark: boolean;
  onOpenSchedule?: () => void;
  className?: string;
}

export const TodayPostOpBadgeBar: React.FC<TodayPostOpBadgeBarProps> = ({
  isDark,
  onOpenSchedule,
  className = ''
}) => {
  const [postOpStatus, setPostOpStatus] = useState<TodayPostOpStatus | null>(() => getTodayPostOpStatus());

  useEffect(() => {
    const update = () => {
      setPostOpStatus(getTodayPostOpStatus());
    };

    fetchServerWeeklySchedule().then(() => update());

    const timer = setInterval(update, 30000);
    window.addEventListener('etfal-schedule-updated', update);
    window.addEventListener('storage', update);
    window.addEventListener('focus', update);

    return () => {
      clearInterval(timer);
      window.removeEventListener('etfal-schedule-updated', update);
      window.removeEventListener('storage', update);
      window.removeEventListener('focus', update);
    };
  }, []);

  // Hafta sonlarında da gizlenmez, Pazartesi önizlemesi olarak gösterilir!
  // Sadece veri yoksa veya tatilse gizlenir.
  if (!postOpStatus || postOpStatus.isHoliday) {
    return null;
  }

  const hasSeyrantepe = postOpStatus.seyrantepePostOp.length > 0;
  const hasSariyer = postOpStatus.sariyerPostOp.length > 0;

  // İki yerleşkede de post-op hekimi belirtilmemişse gizle
  if (!hasSeyrantepe && !hasSariyer) {
    return null;
  }

  const dateHeading = postOpStatus.isWeekendPreview 
    ? `${postOpStatus.previewTargetDateFormatted || postOpStatus.dateFormatted} Pazartesi (Pazar Nöbet Devri)`
    : `${postOpStatus.dateFormatted} ${postOpStatus.dayName} Post-op`;

  const seyrantepeText = `${hasSeyrantepe ? postOpStatus.seyrantepePostOp.join(' · ') : 'Belirtilmedi'}${
    postOpStatus.seyrantepeHandoverFrom ? ` (${postOpStatus.seyrantepeHandoverFrom})` : ''
  }`;

  const sariyerText = `${hasSariyer ? postOpStatus.sariyerPostOp.join(' · ') : 'Belirtilmedi'}${
    postOpStatus.sariyerHandoverFrom ? ` (${postOpStatus.sariyerHandoverFrom})` : ''
  }`;

  return (
    <div
      onClick={onOpenSchedule}
      role={onOpenSchedule ? 'button' : undefined}
      title="Haftalık Çalışma Programı ve Salon Dağılımlarını açmak için tıklayınız"
      className={`relative w-full rounded-xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-2 sm:px-3 sm:py-2 gap-2 transition-all shadow-xs select-text ${
        onOpenSchedule ? 'cursor-pointer hover:border-teal-500/50' : ''
      } ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-900'
          : 'bg-white/95 border-slate-200 text-slate-800 hover:bg-slate-50'
      } ${className}`}
    >
      {/* Sol: Tarih & Başlık */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className={`p-1.5 rounded-lg ${
          isDark 
            ? postOpStatus.isWeekendPreview ? 'bg-amber-500/20 text-amber-300' : 'bg-teal-500/15 text-teal-400'
            : postOpStatus.isWeekendPreview ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
        }`}>
          <Stethoscope className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {dateHeading}
          </span>
          <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">
            {postOpStatus.isWeekendPreview ? 'Önümüzdeki Mesai Nöbet Devir Bilgisi' : 'Günün Post-Op Hekimleri'}
          </span>
        </div>
      </div>

      {/* Orta/Sağ: Seyrantepe ve Sarıyer Sade Rozetleri */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 justify-start sm:justify-end">
        {/* Seyrantepe Post-op Rozeti */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
          isDark
            ? 'bg-teal-500/10 border-teal-500/25 text-teal-200'
            : 'bg-teal-50 border-teal-200 text-teal-900'
        }`}>
          <div className="flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-400 shrink-0">
            <Building2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">Seyrantepe Post-op:</span>
          </div>
          <span className="font-extrabold tracking-wide text-teal-900 dark:text-teal-200 select-text">
            {seyrantepeText}
          </span>
        </div>

        {/* Sarıyer Post-op Rozeti */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
          isDark
            ? 'bg-amber-500/10 border-amber-500/25 text-amber-200'
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400 shrink-0">
            <Activity className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">Sarıyer Post-op:</span>
          </div>
          <span className="font-extrabold tracking-wide text-amber-900 dark:text-amber-200 select-text">
            {sariyerText}
          </span>
        </div>

        {onOpenSchedule && (
          <div className="hidden md:flex items-center text-slate-400 dark:text-slate-500 ml-0.5">
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};
