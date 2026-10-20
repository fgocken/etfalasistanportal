import React from 'react';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface WelcomeScreenProps {
  onProceed: () => void;
  onOpenDisclaimer: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onProceed, 
  onOpenDisclaimer,
  isDark,
  onToggleTheme
}) => {
  return (
    <div className={`min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden select-none transition-colors duration-200 ${
      isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Subtle ambient lighting */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-opacity ${
          isDark ? 'bg-teal-500/10' : 'bg-teal-500/5'
        }`}
      />

      {/* Top institution marker and Top-Right Theme Toggle */}
      <div className="w-full max-w-2xl mx-auto pt-2 sm:pt-4 flex items-center justify-between z-10 gap-3">
        <div className="flex items-center gap-2.5 text-xs font-medium tracking-wide">
          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-teal-400' : 'bg-teal-600'}`} />
          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Şişli Hamidiye Etfal EAH</span>
          <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>·</span>
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>İstanbul</span>
        </div>

        {/* Top-Right Controls: Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* Center Welcome Content */}
      <div className="w-full max-w-xl mx-auto my-auto py-10 sm:py-14 flex flex-col items-center text-center z-10 space-y-7">
        {/* Minimalist medical emblem */}
        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-lg transition-colors ${
          isDark 
            ? 'bg-slate-800/90 border-slate-700 text-teal-400 shadow-black/30' 
            : 'bg-white border-slate-200 text-teal-700 shadow-slate-200/50'
        }`}>
          <Stethoscope className="w-8 h-8 stroke-[1.75]" />
        </div>

        {/* Headlines */}
        <div className="space-y-4">
          <div className={`text-xs uppercase tracking-widest font-semibold font-mono ${
            isDark ? 'text-teal-400' : 'text-teal-700'
          }`}>
            Anesteziyoloji ve Reanimasyon Kliniği
          </div>

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Şişli Etfal EAH Anestezi ve Reanimasyon Asistan Portalı’na Hoş Geldiniz
          </h1>

          <p className={`text-sm sm:text-base font-normal max-w-md mx-auto leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Ameliyathane salonları, yoğun bakım servisleri ve klinik nöbetler için asistan hekim çalışma alanı.
          </p>
        </div>

        {/* Primary Click to Proceed Action Button */}
        <div className="pt-2 w-full sm:w-auto">
          <button
            onClick={onProceed}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 active:scale-[0.98] group cursor-pointer ${
              isDark
                ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30'
                : 'bg-teal-700 hover:bg-teal-800 text-white shadow-lg shadow-teal-700/20 hover:shadow-teal-700/30'
            }`}
          >
            <span>İlerlemek için tıklayın</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Information */}
      <div className={`w-full max-w-2xl mx-auto pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left z-10 text-[11px] ${
        isDark ? 'text-slate-500' : 'text-slate-500'
      }`}>
        <p>
          Şişli Hamidiye Etfal EAH · Anestezi ve Reanimasyon Kliniği
        </p>
        <button
          onClick={onOpenDisclaimer}
          className={`transition-colors underline underline-offset-4 cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-teal-400' : 'text-slate-600 hover:text-teal-700'
          }`}
        >
          Sorumluluk Reddi
        </button>
      </div>
    </div>
  );
};
