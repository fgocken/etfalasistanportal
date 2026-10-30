import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock } from 'lucide-react';
import { MonthDutyRoster } from './DutyRosterTypes';
import { getSavedRoster, getCurrentShiftStatus, CurrentShiftStatus, fetchServerRosters, getActiveMonthKey } from './DutyRosterService';

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
  const [roster, setRoster] = useState<MonthDutyRoster>(() => getSavedRoster());
  
  // Real-time clinical shift status that accounts for hospital handover hours:
  // Weekdays (Mon-Fri): 08:00 AM
  // Weekends (Sat-Sun): 09:00 AM
  const [shiftStatus, setShiftStatus] = useState<CurrentShiftStatus>(() => getCurrentShiftStatus(roster));

  // Live periodic check (every 30 seconds) so when 08:00/09:00 handover or midnight passes,
  // the on-duty roster updates automatically without needing to refresh the page.
  useEffect(() => {
    const checkShift = () => {
      const currentRoster = getSavedRoster();
      setRoster(currentRoster);
      setShiftStatus(getCurrentShiftStatus(currentRoster));
    };

    // Initial server fetch
    fetchServerRosters().then(() => {
      checkShift();
    });

    checkShift();

    // Check every 30 seconds for handover transitions
    const timer = setInterval(checkShift, 30000);

    // Also listen to storage/roster updates (e.g. if Excel is uploaded in another tab or modal)
    const handleStorageChange = () => checkShift();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', checkShift);
    window.addEventListener('etfal-rosters-updated', handleStorageChange);
    window.addEventListener('etfal-active-month-changed', handleStorageChange);

    return () => {
      clearInterval(timer);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', checkShift);
      window.removeEventListener('etfal-rosters-updated', handleStorageChange);
      window.removeEventListener('etfal-active-month-changed', handleStorageChange);
    };
  }, []);

  const schedule = shiftStatus.schedule;

  // Extract staff names
  const seyrantepeText = schedule?.seyrantepeStaff && schedule.seyrantepeStaff.length > 0
    ? schedule.seyrantepeStaff.map((s) => s.name).join(' · ')
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
          animation: dutyTickerMarquee 15s linear infinite;
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
        title={`Nöbet Değişimi: Hafta içi 08:00, Hafta sonu 09:00. (${shiftStatus.shiftNote}) - Nöbetçileri duraklatmak için fareyi üzerine getirin`}
      >
        {/* Left Section: Interactive NÖBET Button */}
        {/* Clicking NÖBET opens the full monthly roster modal */}
        <button
          type="button"
          onClick={onOpenDetail}
          title={`${shiftStatus.displayDateText} Nöbet Listesi (${shiftStatus.shiftNote}). Tüm aylık çizelgeyi görmek için tıklayın.`}
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
          
          <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 hidden xs:inline">
            ({shiftStatus.displayDateText})
          </span>

          {shiftStatus.isBeforeHandover && (
            <span 
              title={`0${shiftStatus.handoverHour}:00 devir-teslimine kadar dünkü nöbet ekibi görevdedir`}
              className="hidden md:inline-flex items-center gap-0.5 text-[9px] px-1 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold"
            >
              <Clock className="w-2.5 h-2.5" />
              0{shiftStatus.handoverHour}:00'a kadar
            </span>
          )}

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
