import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Stethoscope, 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Maximize2, 
  X 
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LiveClock } from './LiveClock';
import { CampusWeatherBar } from './campus/CampusWeatherBar';
import { DutyRosterTickerBar } from './roster/DutyRosterTickerBar'; /* [MODULAR_DUTY_ROSTER: Slim Ticker] */
import { DutyRosterModal } from './roster/DutyRosterModal'; /* [MODULAR_DUTY_ROSTER] */
import { TodayPostOpBadgeBar } from './schedule/TodayPostOpBadgeBar';
import { updateHashRoute } from '../utils/deepLink';

interface WelcomeScreenProps {
  onProceed: () => void;
  onOpenDisclaimer: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export interface ClinicPhoto {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  alt: string;
}

// User iconic artwork album - 12 photos including new operating room, laboratory, morning visit, PACU and online seminar artworks
const CLINIC_ALBUM: ClinicPhoto[] = [
  {
    id: 1,
    src: '/assets/aistudio/ahahahahaha2_c735fba3.jpg',
    title: 'Kıdemli & Asistan Masası',
    subtitle: 'Vaka öncesi preoperatif planlama ve anestezi stratejisi',
    alt: 'Şişli Etfal Anestezi Asistanı ve Kıdemli Hoca Masada'
  },
  {
    id: 2,
    src: '/assets/aistudio/ahahahahaha_1f9e8339.jpg',
    title: 'Şişli Etfal Portalı',
    subtitle: 'Klinik hafıza, kılavuzlar ve asistan eğitim platformu',
    alt: 'Şişli Etfal Anestezi Asistan Portalı Portre'
  },
  {
    id: 3,
    src: '/assets/aistudio/ahahahahaha3_2d69811d.jpg',
    title: 'Klinik Neşesi & Dayanışma',
    subtitle: 'Nöbet sonrası dinlenme ve ekip içi motivasyon anları',
    alt: 'Şişli Etfal Anestezi Kliniği Neşeli Anlar ve Dayanışma'
  },
  {
    id: 4,
    src: '/assets/aistudio/ahahahahaha4_e87cbffc.jpg',
    title: 'Nöbetçi Hekim & Konsültasyon',
    subtitle: 'Çift telefon acil servis ve yoğun bakım konsültasyon trafiği',
    alt: 'Şişli Etfal Nöbetçi Asistan Hekim Çift Telefon Konsültasyon'
  },
  {
    id: 5,
    src: '/assets/aistudio/ahahahahaha5_cb5f8baf.jpg',
    title: 'İntraoperatif Takip & Salon',
    subtitle: 'Hemodinami, mekanik ventilasyon ve anestezi derinliği takibi',
    alt: 'Şişli Etfal Ameliyathane Anestezi İntraoperatif Takip'
  },
  {
    id: 6,
    src: '/assets/aistudio/Gemini_Generated_Image_qp07isqp07isqp07_016f594f.jpg',
    title: 'Ameliyathane Ekibi (Salon 8 & 9)',
    subtitle: 'I ❤️ people (under general anesthesia) - Ortopedi Salonları',
    alt: 'Şişli Etfal Ameliyathane Ekibi - I ❤️ people (under general anesthesia) - Salon 8 ve 9 Ortopedi'
  },
  {
    id: 7,
    src: '/assets/aistudio/1793347911650_32625068.jpg',
    title: 'Salon Ekibi & Ameliyathane Dayanışması',
    subtitle: 'Masa başında vaka hazırlığı, kardeşlik ve anestezi ekip ruhu',
    alt: 'Şişli Etfal Ameliyathane Ekibi Masa Başı Dayanışması'
  },
  {
    id: 8,
    src: '/assets/aistudio/1793347584968_aecc76e6.jpg',
    title: 'Deneysel Cerrahi & Araştırma Laboratuvarı',
    subtitle: 'Mikrocerrahi teknikleri ve deneysel anestezi çalışmaları',
    alt: 'Şişli Etfal Anestezi Deneysel Cerrahi ve Araştırma Laboratuvarı'
  },
  {
    id: 9,
    src: '/assets/aistudio/1793347697407_8f776ac5.jpg',
    title: 'Klinik Kadrosu & Sabah Toplantısı',
    subtitle: 'Hocalarımız ve asistan hekimlerimizle ortak klinik birliği',
    alt: 'Şişli Etfal Anestezi Kliniği Sabah Viziti ve Ekip Birliği'
  },
  {
    id: 10,
    src: '/assets/aistudio/1793347731742_53fa5715.jpg',
    title: 'Preoperatif Hazırlık & Damaryolu Ünitesi',
    subtitle: 'Damaryolu açılışı, preop kan alma ve hasta başı moral desteği',
    alt: 'Şişli Etfal Preoperatif Hazırlık ve Damaryolu Ünitesi'
  },
  {
    id: 11,
    src: '/assets/aistudio/1793347853244_d243e192.jpg',
    title: 'Online Asistan Semineri & Olgu Konseyi',
    subtitle: 'Ekran paylaşımıyla teorik eğitimler ve interaktif olgu sunumları',
    alt: 'Şişli Etfal Anestezi Online Asistan Semineri ve Olgu Konseyi'
  },
  {
    id: 12,
    src: '/assets/aistudio/1793347847115_a2fbe784.jpg',
    title: 'Uyandırma (PACU) & Taburculuk Sevinci',
    subtitle: 'Başarılı ekstübasyon sonrası hastayı güven ve tebessümle servise uğurlama',
    alt: 'Şişli Etfal Uyandırma Odası (PACU) Ekstübasyon ve Taburculuk'
  }
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onProceed, 
  onOpenDisclaimer,
  isDark,
  onToggleTheme
}) => {
  const [isRosterModalOpen, setIsRosterModalOpen] = useState<boolean>(false);
  const [lightboxPhotoIdx, setLightboxPhotoIdx] = useState<number | null>(null);

  // Keyboard controls for lightbox (Escape to close, Arrows to navigate)
  useEffect(() => {
    if (lightboxPhotoIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxPhotoIdx(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxPhotoIdx((prev) => (prev !== null ? (prev - 1 + CLINIC_ALBUM.length) % CLINIC_ALBUM.length : null));
      } else if (e.key === 'ArrowRight') {
        setLightboxPhotoIdx((prev) => (prev !== null ? (prev + 1) % CLINIC_ALBUM.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhotoIdx]);

  const activeLightboxPhoto = lightboxPhotoIdx !== null ? CLINIC_ALBUM[lightboxPhotoIdx] : null;

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 md:p-10 relative overflow-hidden select-none transition-colors duration-200 bg-transparent ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Dynamic Keyframes for the continuous film strip scroll */}
      <style>{`
        @keyframes filmStripMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .film-strip-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: filmStripMarquee 24s linear infinite;
        }
        .film-strip-container:hover .film-strip-track {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Subtle ambient lighting */}
      <div 
        aria-hidden="true" 
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none transition-opacity ${
          isDark ? 'bg-teal-500/10' : 'bg-teal-500/5'
        }`}
      />

      {/* Top-Right Controls: Live Clock & Theme Toggle */}
      <div className="w-full max-w-4xl mx-auto pt-1 sm:pt-2 flex flex-wrap items-center justify-end z-10 gap-2.5">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <LiveClock isDark={isDark} />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* Campus Weather & Inter-Campus Drive Time Bar */}
      <div className="w-full max-w-4xl mx-auto z-10 mt-2.5 rounded-xl overflow-hidden border shadow-xs">
        <CampusWeatherBar isDark={isDark} />
      </div>

      {/* Broadcast News Ticker Strip: On-Duty Residents [MODULAR_DUTY_ROSTER] */}
      <div className="w-full max-w-4xl mx-auto z-10 mt-2">
        <DutyRosterTickerBar 
          isDark={isDark} 
          onOpenDetail={() => setIsRosterModalOpen(true)} 
        />
      </div>

      {/* Today's Post-Op Doctors Bar (Only visible on weekdays) */}
      <div className="w-full max-w-4xl mx-auto z-10 mt-1.5">
        <TodayPostOpBadgeBar 
          isDark={isDark} 
          onOpenSchedule={() => {
            updateHashRoute('arac', 'schedule');
            onProceed();
          }}
        />
      </div>

      {/* Center Welcome Content with Film Strip */}
      <div className="w-full max-w-5xl mx-auto my-auto py-6 sm:py-8 flex flex-col items-center text-center z-10 space-y-5 sm:space-y-6">
        
        {/* 🎞️ CONTINUOUS CINEMA FILM STRIP CONTAINER */}
        <div className="relative w-full max-w-4xl mx-auto film-strip-container overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl p-1.5 sm:p-2 backdrop-blur-md">
          {/* Top Sprocket Perforations Bar */}
          <div className="w-full flex items-center justify-between px-3 py-1 bg-slate-900/90 border-b border-slate-800/80 rounded-t-xl select-none overflow-hidden">
            <div className="flex items-center gap-2.5 w-full justify-around opacity-75">
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-3.5 h-2 rounded-[2px] bg-slate-950 border border-slate-700/50 shrink-0" 
                />
              ))}
            </div>
          </div>

          {/* Film Strip Viewport with Edge Fade Gradients */}
          <div className="relative w-full overflow-hidden py-3">
            {/* Left Vignette Shadow Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-20 pointer-events-none bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            
            {/* Right Vignette Shadow Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-20 pointer-events-none bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent" />

            {/* Seamless Infinite Rolling Track (Duplicated twice for flawless loop) */}
            <div className="film-strip-track">
              {[...CLINIC_ALBUM, ...CLINIC_ALBUM].map((photo, index) => {
                const originalIndex = index % CLINIC_ALBUM.length;
                return (
                  <div
                    key={`${photo.id}-${index}`}
                    onClick={() => setLightboxPhotoIdx(originalIndex)}
                    className="group relative mx-2.5 cursor-pointer shrink-0 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900/90 transition-all duration-300 hover:scale-[1.03] hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/20"
                    title="Büyütmek için tıklayın"
                  >
                    {/* Top frame tape indicator */}
                    <div className="px-2.5 py-1 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none">
                      <span className="text-teal-400/90 font-bold">ETFAL #{originalIndex + 1}</span>
                      <span className="text-slate-500 text-[9px]">35mm ISO 400</span>
                    </div>

                    {/* Image Canvas */}
                    <div className="relative w-[170px] sm:w-[205px] h-[225px] sm:h-[260px] bg-slate-950 flex items-center justify-center p-1.5 overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain rounded-md transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Hover Overlay Zoom Indicator */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="p-2.5 rounded-full bg-slate-900/90 text-teal-400 border border-teal-500/40 shadow-lg">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom frame film badge */}
                    <div className="px-2.5 py-0.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-[9px] font-mono text-slate-500 select-none">
                      <span>KODAK VISION3</span>
                      <span className="text-slate-400">EXP {(originalIndex + 1) * 6}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Sprocket Perforations Bar */}
          <div className="w-full flex items-center justify-between px-3 py-1 bg-slate-900/90 border-t border-slate-800/80 rounded-b-xl select-none overflow-hidden">
            <div className="flex items-center gap-2.5 w-full justify-around opacity-75">
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-3.5 h-2 rounded-[2px] bg-slate-950 border border-slate-700/50 shrink-0" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Minimalist medical emblem */}
        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center shadow-md transition-colors ${
          isDark 
            ? 'bg-slate-800/90 border-slate-700 text-teal-400 shadow-black/30' 
            : 'bg-white border-slate-200 text-teal-700 shadow-slate-200/50'
        }`}>
          <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
        </div>

        {/* Headlines */}
        <div className="space-y-1.5 sm:space-y-2">
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
          <div className={`p-3.5 sm:p-4 rounded-xl border text-xs leading-relaxed max-w-lg mx-auto text-left sm:text-center space-y-1.5 transition-colors ${
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
        <div className="pt-1 sm:pt-2 w-full sm:w-auto">
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
      <div className={`w-full max-w-3xl mx-auto pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left z-10 text-[11px] ${
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

      {/* 🔍 LIGHTBOX MODAL (Enlarged Artwork Inspector) */}
      {activeLightboxPhoto && lightboxPhotoIdx !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxPhotoIdx(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Lightbox Bar */}
            <div className="w-full flex items-center justify-between py-2 text-white/90 px-1">
              <div className="flex items-center gap-2.5 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
                  {lightboxPhotoIdx + 1} / {CLINIC_ALBUM.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxPhotoIdx(null)}
                aria-label="Kapat (ESC)"
                title="Kapat (ESC)"
                className="p-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Stage */}
            <div className="relative w-full flex items-center justify-center overflow-hidden my-2">
              {/* Left Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxPhotoIdx((prev) => (prev !== null ? (prev - 1 + CLINIC_ALBUM.length) % CLINIC_ALBUM.length : null));
                }}
                aria-label="Önceki görsel"
                className="absolute left-2 sm:left-4 z-30 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-teal-400 border border-teal-500/40 hover:border-teal-400 cursor-pointer backdrop-blur-md transition-all hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Photo Display */}
              <img
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.alt}
                className="max-h-[75vh] sm:max-h-[82vh] max-w-full object-contain rounded-xl border border-slate-700/80 shadow-2xl shadow-black select-none"
              />

              {/* Right Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxPhotoIdx((prev) => (prev !== null ? (prev + 1) % CLINIC_ALBUM.length : null));
                }}
                aria-label="Sonraki görsel"
                className="absolute right-2 sm:right-4 z-30 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-teal-400 border border-teal-500/40 hover:border-teal-400 cursor-pointer backdrop-blur-md transition-all hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom Keyboard Hint Only */}
            <div className="w-full text-center px-4 py-1 text-xs">
              <p className="text-[10px] text-slate-500 font-mono">
                ← / → yön tuşları ile geçiş yapabilir, ESC ile kapatabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Duty Roster Modal [MODULAR_DUTY_ROSTER] */}
      <DutyRosterModal
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
};

