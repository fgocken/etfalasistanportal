import React from 'react';
import { ArrowRight, Stethoscope, ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  onProceed: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onProceed }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-slate-900 text-slate-100 p-6 sm:p-10 relative overflow-hidden select-none">
      {/* Subtle background ambient glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Top institution marker */}
      <div className="w-full max-w-2xl mx-auto pt-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium tracking-wide">
          <div className="w-2 h-2 rounded-full bg-teal-400/80" />
          <span>Şişli Hamidiye Etfal EAH</span>
          <span className="text-slate-600">·</span>
          <span>İstanbul</span>
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          Klinik Portalı
        </div>
      </div>

      {/* Center Welcome Content */}
      <div className="w-full max-w-xl mx-auto my-auto py-12 flex flex-col items-center text-center z-10 space-y-8">
        {/* Minimalist medical emblem */}
        <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-400 shadow-lg shadow-black/20">
          <Stethoscope className="w-8 h-8 stroke-[1.75]" />
        </div>

        {/* Headlines */}
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-teal-400/90 font-semibold font-mono">
            Anesteziyoloji ve Reanimasyon Kliniği
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
            Şişli Etfal EAH Anestezi ve Reanimasyon Asistan Portalı’na Hoş Geldiniz
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-normal max-w-md mx-auto leading-relaxed">
            Ameliyathane salonları, yoğun bakım servisleri ve klinik nöbetler için asistan hekim çalışma alanı.
          </p>
        </div>

        {/* Primary Click to Proceed Action Button */}
        <div className="pt-4 w-full sm:w-auto">
          <button
            onClick={onProceed}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-base transition-all duration-200 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 active:scale-[0.98] group cursor-pointer"
          >
            <span>İlerlemek için tıklayın</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom Footer Information */}
      <div className="w-full max-w-2xl mx-auto pb-4 text-center z-10">
        <p className="text-[11px] text-slate-500 leading-normal">
          Şişli Hamidiye Etfal Eğitim ve Araştırma Hastanesi · Anestezi ve Reanimasyon Kliniği
        </p>
      </div>
    </div>
  );
};
