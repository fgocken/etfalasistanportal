import React, { useState, useEffect } from 'react';
import { ArrowRight, Stethoscope, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LiveClock } from './LiveClock';
import { CampusWeatherBar } from './campus/CampusWeatherBar';
import { DutyRosterTickerBar } from './roster/DutyRosterTickerBar'; /* [MODULAR_DUTY_ROSTER: Slim Ticker] */
import { DutyRosterModal } from './roster/DutyRosterModal'; /* [MODULAR_DUTY_ROSTER] */

interface WelcomeScreenProps {
  onProceed: () => void;
  onOpenDisclaimer: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

// User iconic artwork album - 5 photos
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
  },
  {
    id: 3,
    src: '/assets/aistudio/ahahahahaha3_2d69811d.jpg',
    alt: 'Şişli Etfal Anestezi Kliniği Neşeli Anlar ve Dayanışma'
  },
  {
    id: 4,
    src: '/assets/aistudio/ahahahahaha4_e87cbffc.jpg',
    alt: 'Şişli Etfal Nöbetçi Asistan Hekim Çift Telefon Konsültasyon'
  },
  {
    id: 5,
    src: '/assets/aistudio/ahahahahaha5_cb5f8baf.jpg',
    alt: 'Şişli Etfal Ameliyathane Anestezi İntraoperatif Takip'
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
  const [isRosterModalOpen, setIsRosterModalOpen] = useState<boolean>(false);

  const prevIdx = (activePhotoIdx - 1 + CLINIC_ALBUM.length) % CLINIC_ALBUM.length;
  const nextIdx = (activePhotoIdx + 1) % CLINIC_ALBUM.length;
  const prevPhoto = CLINIC_ALBUM[prevIdx];
  const nextPhoto = CLINIC_ALBUM[nextIdx];

  // Automatic smooth transition between photos
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % CLINIC_ALBUM.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActivePhotoIdx(prevIdx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActivePhotoIdx(nextIdx);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden select-none transition-colors duration-200 bg-transparent ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Subtle ambient lighting */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-opacity ${
          isDark ? 'bg-teal-500/10' : 'bg-teal-500/5'
        }`}
      />

      {/* Top institution marker and Top-Right Theme Toggle */}
      <div className="w-full max-w-3xl mx-auto pt-2 sm:pt-4 flex flex-wrap items-center justify-between z-10 gap-2.5">
        <div className="flex items-center gap-2.5 text-xs font-medium tracking-wide">
          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-teal-400' : 'bg-teal-600'}`} />
          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Şişli Hamidiye Etfal EAH</span>
          <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>·</span>
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>İstanbul</span>
        </div>

        {/* Top-Right Controls: Live Clock & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <LiveClock isDark={isDark} />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* Campus Weather & Inter-Campus Drive Time Bar */}
      <div className="w-full max-w-3xl mx-auto z-10 mt-3 rounded-xl overflow-hidden border shadow-xs">
        <CampusWeatherBar isDark={isDark} />
      </div>

      {/* Broadcast News Ticker Strip: On-Duty Residents [MODULAR_DUTY_ROSTER] */}
      <div className="w-full max-w-3xl mx-auto z-10 mt-2">
        <DutyRosterTickerBar 
          isDark={isDark} 
          onOpenDetail={() => setIsRosterModalOpen(true)} 
        />
      </div>

      {/* Center Welcome Content */}
      <div className="w-full max-w-xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center z-10 space-y-5 sm:space-y-6">
        {/* User Iconic Photo Deck - Stack effect with left/right visible layers and arrow controls */}
        <div 
          className="relative flex flex-col items-center w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Stack Container Flanked by Navigation Arrows */}
          <div className="relative flex items-center justify-center w-full max-w-md mx-auto">
            {/* Left Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Önceki fotoğraf"
              title="Önceki fotoğraf"
              className={`relative z-30 -mr-2 sm:-mr-3 p-2 sm:p-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 ${
                isDark 
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-teal-400 border-teal-500/30 hover:border-teal-400 shadow-black/50' 
                  : 'bg-white/95 hover:bg-white text-teal-700 border-teal-600/30 hover:border-teal-600 shadow-slate-300/70'
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </button>

            {/* Photo Deck Stack Viewport */}
            <div 
              className="relative group cursor-pointer flex-shrink-0"
              onClick={handleNext}
              title="Tıklayarak sonraki fotoğrafa geçebilirsiniz"
            >
              {/* Ambient luminous glow behind image stack */}
              <div 
                aria-hidden="true"
                className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/25 via-teal-500/20 to-blue-500/25 rounded-3xl blur-xl -z-10 opacity-70 group-hover:opacity-95 transition-opacity pointer-events-none"
              />

              {/* Left Stack Card (Previous Photo - Tilted left under main) */}
              <div 
                aria-hidden="true"
                className="absolute inset-0 -translate-x-3.5 sm:-translate-x-5 -rotate-[3.5deg] scale-[0.93] rounded-2xl overflow-hidden border border-teal-500/30 bg-slate-900/90 shadow-xl pointer-events-none z-0 transition-transform duration-500 group-hover:-translate-x-5 sm:group-hover:-translate-x-7 group-hover:-rotate-[5deg]"
              >
                <img
                  src={prevPhoto.src}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-2 opacity-40 grayscale-[25%] blur-[0.2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-950/40 to-slate-950/70" />
              </div>

              {/* Right Stack Card (Next Photo - Tilted right under main) */}
              <div 
                aria-hidden="true"
                className="absolute inset-0 translate-x-3.5 sm:translate-x-5 rotate-[3.5deg] scale-[0.93] rounded-2xl overflow-hidden border border-teal-500/30 bg-slate-900/90 shadow-xl pointer-events-none z-0 transition-transform duration-500 group-hover:translate-x-5 sm:group-hover:translate-x-7 group-hover:rotate-[5deg]"
              >
                <img
                  src={nextPhoto.src}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-2 opacity-40 grayscale-[25%] blur-[0.2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-slate-950/20 via-slate-950/40 to-slate-950/70" />
              </div>

              {/* Main Active Card (Top of the Stack) */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/50 ring-4 ring-teal-500/15 transition-all duration-300 group-hover:scale-[1.01] group-hover:border-teal-400 bg-slate-950/95 backdrop-blur-md h-[230px] sm:h-[268px] w-[240px] sm:w-[310px] max-w-[68vw] sm:max-w-[78vw] flex items-center justify-center p-1.5">
                {CLINIC_ALBUM.map((photo, idx) => (
                  <img
                    key={photo.id}
                    src={photo.src}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-contain p-1.5 block mx-auto transition-all duration-700 ease-in-out ${
                      activePhotoIdx === idx 
                        ? 'opacity-100 scale-100 z-10 pointer-events-auto' 
                        : 'opacity-0 scale-95 z-0 pointer-events-none'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Sonraki fotoğraf"
              title="Sonraki fotoğraf"
              className={`relative z-30 -ml-2 sm:-ml-3 p-2 sm:p-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 ${
                isDark 
                  ? 'bg-slate-900/90 hover:bg-slate-800 text-teal-400 border-teal-500/30 hover:border-teal-400 shadow-black/50' 
                  : 'bg-white/95 hover:bg-white text-teal-700 border-teal-600/30 hover:border-teal-600 shadow-slate-300/70'
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* Minimalist dot indicators - Pure dots for all 5 photos */}
          <div className="mt-3.5 flex items-center justify-center gap-1.5 z-20">
            {CLINIC_ALBUM.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIdx(idx);
                }}
                aria-label={`Fotoğraf ${idx + 1}`}
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

        {/* Instagram Account Link */}
        <a
          href="https://www.instagram.com/etfalanestezi/"
          target="_blank"
          rel="noopener noreferrer"
          title="Şişli Etfal Anestezi Resmi Instagram Hesabı: @etfalanestezi"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-all group cursor-pointer ${
            isDark 
              ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-pink-400 hover:border-pink-500/50 hover:bg-slate-800' 
              : 'bg-white border-slate-200 text-slate-700 hover:text-pink-600 hover:border-pink-300 hover:shadow-2xs'
          }`}
        >
          <Instagram className="w-3.5 h-3.5 text-pink-500 group-hover:scale-110 transition-transform" />
          <span>@etfalanestezi</span>
        </a>

        <button
          onClick={onOpenDisclaimer}
          className={`transition-colors underline underline-offset-4 cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-teal-400' : 'text-slate-600 hover:text-teal-700'
          }`}
        >
          Sorumluluk Reddi
        </button>
      </div>

      {/* Monthly Duty Roster Modal [MODULAR_DUTY_ROSTER] */}
      <DutyRosterModal
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
};
