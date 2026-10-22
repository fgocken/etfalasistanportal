import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { MonthDutyRoster, DayDutySchedule } from './DutyRosterTypes';
import { getSavedRoster } from './DutyRosterService';

interface DutyRosterTickerBarProps {
  isDark: boolean;
  onOpenDetail?: () => void;
  className?: string;
}

export const DutyRosterTickerBar: React.FC<DutyRosterTickerBarProps> = ({
  isDark,
  onOpenDetail,
  className = ''
}) => {
  const [roster] = useState<MonthDutyRoster>(() => getSavedRoster());
  
  // Format date helper: YYYY-MM-DD
  const formatKey = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const todayKey = formatKey(today);

  // If today's key exists in the October 2026 roster, use it; otherwise fallback to 2026-10-22
  const activeKey = roster.days[todayKey] ? todayKey : '2026-10-22';
  const schedule: DayDutySchedule | undefined = roster.days[activeKey];

  // Date label (e.g., "22 Ekim Perşembe")
  const dateLabel = schedule 
    ? `${schedule.dayNumber} Ekim ${schedule.dayName}`
    : '22 Ekim';

  // Extract staff names
  const seyrantepeText = schedule?.seyrantepeStaff && schedule.seyrantepeStaff.length > 0
    ? schedule.seyrantepeStaff.map((s, idx) => idx === 0 ? `${s.name} (Kıdemli)` : s.name).join(' · ')
    : 'Girilmedi';

  const cayirbasiText = schedule?.cayirbasiStaff && schedule.cayirbasiStaff.length > 0
    ? schedule.cayirbasiStaff.map((s) => s.name).join(' · ')
    : 'Girilmedi';

  // Single unit of ticker content to be duplicated for seamless infinite scroll
  const renderTickerContent = (keyPrefix: string) => (
    <div key={keyPrefix} className="inline-flex items-center gap-5 px-4 shrink-0 font-medium text-xs">
      
      {/* Seyrantepe Campus */}
      <div className="inline-flex items-center gap-1.5 shrink-0">
        <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded font-bold text-[10px] tracking-wide bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
          Seyrantepe
        </span>
        <span className="font-semibold text-slate-800 dark:text-slate-100">
          {seyrantepeText}
        </span>
      </div>

      <span className="text-teal-500/60 font-bold select-none text-[11px]">✦</span>

      {/* Sarıyer (Çayırbaşı) Campus */}
      <div className="inline-flex items-center gap-1.5 shrink-0">
        <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded font-bold text-[10px] tracking-wide bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
          Sarıyer (Çayırbaşı)
        </span>
        <span className="font-semibold text-slate-800 dark:text-slate-100">
          {cayirbasiText}
        </span>
      </div>

      <span className="text-teal-500/60 font-bold select-none text-[11px]">✦</span>
    </div>
  );

  return (
    <>
      {/* Ticker Keyframe Styles for smooth hardware-accelerated marquee */}
      <style>{`
        @keyframes dutyTickerMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .duty-ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: dutyTickerMarquee 26s linear infinite;
        }
        .duty-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div 
        className={`relative w-full rounded-xl border flex items-center overflow-hidden transition-all text-xs shadow-xs select-none ${
          isDark 
            ? 'bg-slate-900/95 border-slate-800 text-slate-200' 
            : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-100'
        } ${className}`}
        title="Nöbetçileri duraklatmak için fareyi üzerine getirin"
      >
        {/* Left Section: Interactive NÖBET Button */}
        {/* Clicking NÖBET opens the full monthly roster modal */}
        <button
          type="button"
          onClick={onOpenDetail}
          title="Tüm Aylık Nöbet Çizelgesini Görüntüle"
          className={`shrink-0 z-20 flex items-center gap-1.5 px-3 py-2 font-bold text-xs transition-all cursor-pointer border-r shadow-xs group ${
            isDark
              ? 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border-teal-500/30 hover:border-teal-500/50'
              : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200 hover:border-teal-300'
          }`}
        >
          {/* Live pulsing dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>

          <span className="tracking-wider uppercase font-extrabold text-[11px]">NÖBET</span>
          
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 hidden xs:inline">
            ({dateLabel})
          </span>

          <ChevronRight className="w-3.5 h-3.5 text-teal-500/70 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Center Marquee Area: Seamless Scrolling Ticker Tape */}
        <div className="relative flex-1 min-w-0 overflow-hidden py-2">
          {/* Left subtle fade gradient */}
          <div className={`absolute left-0 top-0 bottom-0 w-4 z-10 pointer-events-none ${
            isDark 
              ? 'bg-gradient-to-r from-slate-900/95 to-transparent' 
              : 'bg-gradient-to-r from-white/95 to-transparent'
          }`} />

          {/* Right subtle fade gradient */}
          <div className={`absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none ${
            isDark 
              ? 'bg-gradient-to-l from-slate-900/95 to-transparent' 
              : 'bg-gradient-to-l from-white/95 to-transparent'
          }`} />

          {/* Scrolling track: content duplicated twice for seamless loop */}
          <div className="duty-ticker-track">
            {renderTickerContent('copy-1')}
            {renderTickerContent('copy-2')}
          </div>
        </div>

      </div>
    </>
  );
};
