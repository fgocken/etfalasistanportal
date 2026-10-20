import React, { useState, useEffect } from 'react';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface WelcomeScreenProps {
  onProceed: () => void;
  onOpenDisclaimer: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

// User iconic artwork
const CLINIC_ALBUM = [
  {
    id: 1,
    src: '/assets/aistudio/ahahahahaha2_c735fba3.jpg',
    alt: 'Şişli Etfal Anestezi Asistanı ve Kıdemli Hoca Masada'
  },
  {
    id: 2,
    src: '/assets/aistudio/ahahahahaha_1f9e8339.jpg',
    alt: 'Şişli Etfal Anestezi Asistan Portalı Portre'
  }
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onProceed, 
  onOpenDisclaimer,
  isDark,
  onToggleTheme
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Automatic smooth transition between photos
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % CLINIC_ALBUM.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isHovered]);

  const togglePhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % CLINIC_ALBUM.length);
  };
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
      <div className="w-full max-w-xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center z-10 space-y-5 sm:space-y-6">
        {/* User Iconic Photo / Automatic Filmstrip Viewport - No text, smooth auto-transition */}
        <div 
          className="relative group flex flex-col items-center cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={togglePhoto}
        >
          {/* Main Visual Frame with smooth cross-fade */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/40 ring-4 ring-teal-500/10 transition-all duration-300 group-hover:scale-[1.01] group-hover:border-teal-400 bg-slate-900/60 max-h-[240px] sm:max-h-[268px] flex items-center justify-center">
            {CLINIC_ALBUM.map((photo, idx) => (
              <img
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                referrerPolicy="no-referrer"
                className={`max-h-[240px] sm:max-h-[268px] w-auto h-auto object-contain block mx-auto transition-opacity duration-700 ease-in-out ${
                  activePhotoIdx === idx 
                    ? 'opacity-100 relative' 
                    : 'opacity-0 absolute inset-0 pointer-events-none'
                }`}
              />
            ))}
          </div>

          {/* Minimalist dot indicators - Pure dots, zero text */}
          <div className="mt-2.5 flex items-center justify-center gap-1.5 z-20">
            {CLINIC_ALBUM.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activePhotoIdx === idx
                    ? 'w-6 bg-teal-400'
                    : isDark 
                      ? 'w-1.5 bg-slate-700 hover:bg-slate-500' 
                      : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Ambient luminous glow behind image */}
          <div 
            aria-hidden="true"
            className="absolute -inset-3 bg-gradient-to-tr from-cyan-500/25 via-teal-500/20 to-blue-500/25 rounded-3xl blur-lg -z-10 opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none"
          />
        </div>

        {/* Minimalist medical emblem */}
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border flex items-center justify-center shadow-md transition-colors ${
          isDark 
            ? 'bg-slate-800/90 border-slate-700 text-teal-400 shadow-black/30' 
            : 'bg-white border-slate-200 text-teal-700 shadow-slate-200/50'
        }`}>
          <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
        </div>

        {/* Headlines */}
        <div className="space-y-2">
          <div className={`text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-snug ${
            isDark ? 'text-teal-400' : 'text-teal-700'
          }`}>
            ANESTEZİYOLOJİ VE REANİMASYON KLİNİĞİ
          </div>

          <h1 className={`text-base sm:text-lg font-medium tracking-normal ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            Asistan Portalı'na Hoşgeldiniz.
          </h1>

          {/* Important Clinical Warning Box */}
          <div className={`p-4 rounded-xl border text-xs leading-relaxed max-w-lg mx-auto text-left sm:text-center space-y-1.5 transition-colors ${
            isDark 
              ? 'bg-amber-500/10 border-amber-500/25 text-amber-200' 
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div>
              <strong>Önemli Klinik Uyarı:</strong> Bu web portalında sunulan tüm içerikler, hesaplayıcılar, formüller, ilaç dozajları ve akış şemaları;
            </div>
            <div>
              Hiçbir koşulda doğrudan bir asistan hekimin veya uzman hekimin klinik muhakemesinin, hasta başı fizik muayenesinin ve resmi hastane kılavuzlarının yerine geçemez.
            </div>
          </div>
        </div>

        {/* Primary Click to Proceed Action Button */}
        <div className="pt-2 w-full sm:w-auto">
          <button
            onClick={onProceed}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 active:scale-[0.98] group cursor-pointer ${
              isDark
                ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30'
                : 'bg-teal-700 hover:bg-teal-800 text-white shadow-lg shadow-teal-700/20 hover:shadow-teal-700/30'
            }`}
          >
            <span>KABUL EDİYORUM , ONAYLIYORUM , İLERLE</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
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
