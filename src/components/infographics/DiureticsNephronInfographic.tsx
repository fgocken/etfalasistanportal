import React, { useState, useRef } from 'react';
import {
  Droplets,
  GitBranch,
  Layers,
  BookOpen,
  Sparkles,
  Activity
} from 'lucide-react';
import {
  NephronDiureticsAnimator,
  DiureticId,
  DIURETICS
} from './NephronDiureticsAnimator';
import { NephronDiureticsClinicalMatrix } from './NephronDiureticsClinicalMatrix';

interface DiureticsNephronInfographicProps {
  isDark: boolean;
}

export const DiureticsNephronInfographic: React.FC<DiureticsNephronInfographicProps> = ({ isDark }) => {
  const [selectedDiuretic, setSelectedDiuretic] = useState<DiureticId>('loop');
  const animationSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleJumpToAnimation = (id: DiureticId) => {
    setSelectedDiuretic(id);
    animationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeDrug = DIURETICS[selectedDiuretic];

  return (
    <div className="space-y-6">
      {/* 1. Üst İnfografik Başlık & Hızlı Atlama Şeridi */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark
          ? 'bg-gradient-to-r from-sky-950/60 via-slate-900 to-teal-950/50 border-sky-500/30 shadow-lg shadow-sky-950/20'
          : 'bg-gradient-to-r from-sky-50 via-white to-teal-50/80 border-sky-200 shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`p-3 rounded-2xl border shrink-0 ${
              isDark
                ? 'bg-sky-500/15 border-sky-500/30 text-sky-400'
                : 'bg-sky-100 border-sky-200 text-sky-700'
            }`}>
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                  İNTERAKTİF ANİMASYON + KARAR MATRİSİ
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-teal-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/30">
                  ESC 2021/2023 · ADVOR · CLOROTIC · NCS · EASL
                </span>
              </div>
              <h2 className={`text-lg sm:text-2xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Böbrek Nefronu, Diüretik Etki Mekanizmaları &amp; Klinik Karar Matrisi
              </h2>
              <p className={`text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                6 diüretik sınıfının makro nefron ve hücresel iyon taşınma simülasyonu, perioperatif/YBÜ klinik senaryo karar matrisi, ardışık nefron blokajı kombinasyonları ve güncel uluslararası kılavuz önerileri.
              </p>
            </div>
          </div>

          {/* Aktif Seçili Diüretik Mini Göstergesi */}
          <div className={`px-3.5 py-2.5 rounded-xl border shrink-0 ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
          }`}>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Simülasyonda Aktif Sınıf
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: activeDrug.accentColor }}
              />
              <span className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeDrug.shortName}
              </span>
            </div>
            <div className="text-[10.5px] font-mono text-teal-600 dark:text-teal-400 mt-0.5">
              {activeDrug.segmentLabel}
            </div>
          </div>
        </div>

        {/* Hızlı Bölüm Geçiş Hapları */}
        <div className={`flex flex-wrap items-center gap-2 pt-4 mt-4 border-t text-xs ${
          isDark ? 'border-sky-500/20' : 'border-sky-200/80'
        }`}>
          <button
            type="button"
            onClick={() => scrollToSection('diuretics-sec-anim')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
              isDark
                ? 'bg-sky-500/15 border-sky-500/30 text-sky-300 hover:bg-sky-500/25'
                : 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>1. İnteraktif Nefron &amp; Hücre Simülasyonu</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('diuretics-sec-matrix')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
              isDark
                ? 'bg-teal-500/15 border-teal-500/30 text-teal-300 hover:bg-teal-500/25'
                : 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>2. Klinik Senaryo Karar Matrisi (7 Senaryo)</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('diuretics-sec-combos')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
              isDark
                ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25'
                : 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Kombinasyon &amp; Ardışık Nefron Blokajı</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('diuretics-sec-guidelines')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>4. Güncel Kılavuzlar &amp; Kanıtlar</span>
          </button>
          <span className={`ml-auto hidden sm:inline-flex items-center gap-1 text-[11px] ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Klavye ← / → ok tuşları aktiftir
          </span>
        </div>
      </div>

      {/* 2. İnteraktif Makro Nefron & Hücresel Simülasyon + Sözlük + Elektrolit Özeti */}
      <div id="diuretics-sec-anim" ref={animationSectionRef} className="scroll-mt-20">
        <NephronDiureticsAnimator
          isDark={isDark}
          selectedDiuretic={selectedDiuretic}
          onSelectDiuretic={setSelectedDiuretic}
        />
      </div>

      {/* 3. Klinik Karar Matrisi, Kombinasyon Önerileri ve Güncel Rehberler */}
      <NephronDiureticsClinicalMatrix
        isDark={isDark}
        selectedDiuretic={selectedDiuretic}
        onSelectDiuretic={setSelectedDiuretic}
        onJumpToAnimation={handleJumpToAnimation}
      />
    </div>
  );
};
