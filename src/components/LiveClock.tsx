import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface LiveClockProps {
  isDark: boolean;
  showDate?: boolean;
  className?: string;
}

export const LiveClock: React.FC<LiveClockProps> = ({ 
  isDark, 
  showDate = true,
  className = '' 
}) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    // Synchronize to the nearest second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  const dateString = time.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    weekday: 'short'
  });

  const fullDateTooltip = time.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  });

  return (
    <div
      title={`Canlı Sistem Saati: ${fullDateTooltip}`}
      className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-lg border text-xs transition-all select-none shadow-2xs ${
        isDark 
          ? 'bg-slate-800/90 border-slate-700/80 text-slate-200 hover:border-teal-500/50' 
          : 'bg-white border-slate-200 text-slate-800 hover:border-teal-400 shadow-slate-100'
      } ${className}`}
    >
      <div className="flex items-center gap-1">
        <Clock className={`w-3.5 h-3.5 shrink-0 transition-colors ${
          isDark ? 'text-teal-400' : 'text-teal-600'
        }`} />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
      </div>

      {/* Live Digital Monospace Clock */}
      <div className="flex items-baseline font-mono font-bold tracking-wider tabular-nums">
        <span className={isDark ? 'text-white' : 'text-slate-900'}>{hours}</span>
        <span className="animate-pulse text-teal-500 mx-0.5">:</span>
        <span className={isDark ? 'text-white' : 'text-slate-900'}>{minutes}</span>
        <span className="text-teal-500/80 mx-0.5">:</span>
        <span className={`text-[11px] font-semibold ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
          {seconds}
        </span>
      </div>

      {/* Date badge on medium/large screens */}
      {showDate && (
        <>
          <span className={`hidden md:inline-block w-px h-3 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <span className={`hidden md:inline-block text-[11px] font-medium tracking-normal ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {dateString}
          </span>
        </>
      )}
    </div>
  );
};
