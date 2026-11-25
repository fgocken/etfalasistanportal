import React, { useState, useRef } from 'react';
import {
  Droplets,
  GitBranch,
  BookOpen,
  Activity,
  Sparkles
} from 'lucide-react';
import {
  NephronDiureticsAnimator,
  DiureticId
} from './NephronDiureticsAnimator';
import { NephronDiureticsClinicalMatrix } from './NephronDiureticsClinicalMatrix';

interface DiureticsNephronInfographicProps {
  isDark: boolean;
}

type ActiveTabId = 'simulation' | 'matrix' | 'guidelines';

export const DiureticsNephronInfographic: React.FC<DiureticsNephronInfographicProps> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<ActiveTabId>('simulation');
  const [selectedDiuretic, setSelectedDiuretic] = useState<DiureticId>('loop');
  const topContainerRef = useRef<HTMLDivElement | null>(null);

  const handleJumpToAnimation = (id: DiureticId) => {
    setSelectedDiuretic(id);
    setActiveTab('simulation');
    window.setTimeout(() => {
      topContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const tabs: {
    id: ActiveTabId;
    label: string;
    shortLabel: string;
    badge: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'simulation',
      label: 'Canlı Nefron & Elektrolit Isı Haritası',
      shortLabel: 'Nefron & Isı Haritası',
      badge: '6 Sınıf · 60 FPS',
      icon: <Activity className="w-4 h-4" />
    },
    {
      id: 'matrix',
      label: 'Klinik Karar Matrisi & Ardışık Blokaj',
      shortLabel: 'Karar Matrisi',
      badge: '7 Senaryo · HFA',
      icon: <GitBranch className="w-4 h-4" />
    },
    {
      id: 'guidelines',
      label: 'Güncel Kılavuzlar, SGLT2i & Anestezi',
      shortLabel: 'Kılavuzlar & SGLT2i',
      badge: '13 PubMed',
      icon: <BookOpen className="w-4 h-4" />
    }
  ];

  return (
    <div ref={topContainerRef} className="space-y-5 scroll-mt-20">
      {/* 1. Kompakt Üst Başlık & 3 Sekmeli Mimari */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isDark
          ? 'bg-gradient-to-r from-sky-950/60 via-slate-900 to-teal-950/50 border-sky-500/30 shadow-lg shadow-sky-950/20'
          : 'bg-gradient-to-r from-sky-50 via-white to-teal-50/80 border-sky-200 shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl border shrink-0 ${
              isDark
                ? 'bg-sky-500/15 border-sky-500/30 text-sky-400'
                : 'bg-sky-100 border-sky-200 text-sky-700'
            }`}>
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                  İNTERAKTİF ANİMASYON + KARAR MATRİSİ
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-teal-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/30">
                  ESC 2023 · ADVOR · CLOROTIC · NCS · EASL · KDIGO
                </span>
              </div>
              <h2 className={`text-lg sm:text-xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Böbrek Nefronu, Diüretik Etki Mekanizmaları &amp; Klinik Karar Matrisi
              </h2>
              <p className={`text-xs mt-0.5 max-w-3xl leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                6 diüretik sınıfının canlı makro nefron ve hücresel iyon simülasyonu, 6×9 elektrolit ısı haritası, 7 klinik senaryo karar matrisi, ardışık nefron blokajı ve güncel uluslararası kılavuzlar.
              </p>
            </div>
          </div>

          {activeTab === 'simulation' && (
            <div className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-semibold shrink-0 ${
              isDark
                ? 'bg-slate-900/70 border-slate-800 text-slate-300'
                : 'bg-white/90 border-slate-200 text-slate-600'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Klavye ← / → ile sınıf değiştir</span>
            </div>
          )}
        </div>

        {/* 3 Üst Sekme Çubuğu */}
        <div
          role="tablist"
          aria-label="Nefron ve Diüretikler Bölümleri"
          className={`grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 mt-4 border-t ${
            isDark ? 'border-sky-500/20' : 'border-sky-200/80'
          }`}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-teal-500/20 border-teal-400/60 text-white shadow-sm shadow-teal-950/40'
                      : 'bg-teal-600 border-teal-700 text-white shadow-sm'
                    : isDark
                      ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className={isActive ? 'text-white' : 'text-teal-500 dark:text-teal-400'}>
                    {tab.icon}
                  </span>
                  <span className="text-xs font-extrabold truncate">
                    <span className="hidden md:inline">{tab.label}</span>
                    <span className="md:hidden">{tab.shortLabel}</span>
                  </span>
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isDark
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEKME 1: Canlı Nefron & Hücresel Simülasyon + 6×9 Elektrolit Isı Haritası + Kapalı Sözlük */}
      {activeTab === 'simulation' && (
        <NephronDiureticsAnimator
          isDark={isDark}
          selectedDiuretic={selectedDiuretic}
          onSelectDiuretic={setSelectedDiuretic}
        />
      )}

      {/* SEKME 2: 7 Klinik Senaryo Karar Matrisi + Görsel Ardışık Nefron Blokajı + Spot İdrar Na⁺ Stepper */}
      {activeTab === 'matrix' && (
        <NephronDiureticsClinicalMatrix
          isDark={isDark}
          view="matrix"
          selectedDiuretic={selectedDiuretic}
          onSelectDiuretic={setSelectedDiuretic}
          onJumpToAnimation={handleJumpToAnimation}
        />
      )}

      {/* SEKME 3: SGLT2i & Anestezi İncileri + 13 Doğrulanmış Kılavuz / RKÇ Kaynağı */}
      {activeTab === 'guidelines' && (
        <NephronDiureticsClinicalMatrix
          isDark={isDark}
          view="guidelines"
          selectedDiuretic={selectedDiuretic}
          onSelectDiuretic={setSelectedDiuretic}
          onJumpToAnimation={handleJumpToAnimation}
        />
      )}
    </div>
  );
};
