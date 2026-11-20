import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpenCheck, ChevronRight, Wind } from 'lucide-react';
import { ShareLinkButton } from '../common/ShareLinkButton';
import { RespiratoryPhysiologyWorkspace } from './RespiratoryPhysiologyWorkspace';
import { MedicalText } from './respiratory/MedicalText';

interface BasicsWorkspaceProps {
  isDark: boolean;
  initialCardId?: string | null;
}

export type BasicsCardId = 'respiratory-physiology';

interface BasicsCardItem {
  id: BasicsCardId;
  title: string;
  category: string;
  meta: string;
  shortDesc: string;
  publisher: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const BASICS_CARDS: BasicsCardItem[] = [
  {
    id: 'respiratory-physiology',
    title: 'Solunum Fizyolojisi',
    category: 'Fizyoloji · Sistematik Ders Özeti',
    meta: '8 Bölüm · 5 Şematik Görsel · Düz Okuma',
    shortDesc:
      'Fonksiyonel anatomi, statik ve dinamik solunum mekaniği, akciğer hacimleri ve FRC, alveoler ventilasyon–difüzyon, pulmoner dolaşım–West zonları–\\dot{V}/\\dot{Q}, O_{2}/CO_{2} taşınımı–oksijen kaskadı, solunum kontrolü ve genel anestezinin solunum fizyolojisine etkileri.',
    publisher: "West's · Nunn's · Miller's Anesthesia · Morgan & Mikhail · Levitzky",
    metrics: [
      { label: 'Kapsam', value: '8 Tam Bölüm' },
      { label: 'Görseller', value: '5 Şematik Grafik' },
      { label: 'Referanslar', value: '5 Ana Textbook' },
      { label: 'Format', value: 'Düz Okuma' },
    ],
  },
];

export const BasicsWorkspace: React.FC<BasicsWorkspaceProps> = ({ isDark, initialCardId }) => {
  const [selectedCardId, setSelectedCardId] = useState<BasicsCardId | null>(
    initialCardId === 'respiratory-physiology' ? 'respiratory-physiology' : null
  );

  useEffect(() => {
    if (initialCardId === 'respiratory-physiology') {
      setSelectedCardId('respiratory-physiology');
    } else if (initialCardId === null) {
      setSelectedCardId(null);
    }
  }, [initialCardId]);

  if (selectedCardId === 'respiratory-physiology') {
    return (
      <div className="space-y-5 animate-in fade-in duration-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setSelectedCardId(null)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Temel Bilgiler Kart Panosuna Dön</span>
          </button>

          <ShareLinkButton
            type="arac"
            id="basics"
            title="Temel Bilgiler Bağlantısı"
            isDark={isDark}
          />
        </div>

        <RespiratoryPhysiologyWorkspace isDark={isDark} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Workspace Header */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isDark ? 'bg-slate-900/75 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              isDark ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-50 text-sky-700'
            }`}
          >
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-sky-500">
              Temel Anestezi Bilimleri · Sistematik Kaynak Panosu
            </div>
            <h2 className={`text-xl sm:text-2xl font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Temel Bilgiler
            </h2>
            <p className={`text-sm mt-1 max-w-3xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Anesteziyoloji ve reanimasyon uzmanlık müfredatının temel fizyoloji, farmakoloji ve fizik prensipleri; ana ders kitaplarından derlenmiş sade, sistematik okuma özetleri halinde sunulur.
            </p>
          </div>
        </div>

        <ShareLinkButton type="arac" id="basics" title="Temel Bilgiler Bölümünü Paylaş" isDark={isDark} />
      </div>

      {/* Card Board Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {BASICS_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => {
              setSelectedCardId(card.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`group text-left rounded-2xl border p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between gap-5 cursor-pointer ${
              isDark
                ? 'bg-slate-900/80 border-slate-800 hover:border-sky-500/50 hover:bg-slate-900'
                : 'bg-white border-slate-200 hover:border-sky-400 hover:shadow-md'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isDark ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-50 text-sky-700'
                    }`}
                  >
                    <Wind className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {card.category} · <span className="text-teal-500 font-semibold">{card.meta}</span>
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-bold mt-0.5 transition-colors ${
                        isDark ? 'text-white group-hover:text-sky-300' : 'text-slate-900 group-hover:text-sky-700'
                      }`}
                    >
                      {card.title}
                    </h3>
                  </div>
                </div>

                <ChevronRight
                  className={`w-5 h-5 shrink-0 mt-1 transition-transform group-hover:translate-x-1 ${
                    isDark ? 'text-slate-500 group-hover:text-sky-400' : 'text-slate-400 group-hover:text-sky-600'
                  }`}
                />
              </div>

              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <MedicalText text={card.shortDesc} />
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {card.metrics.map((m) => (
                  <div
                    key={m.label}
                    className={`rounded-lg border px-2.5 py-2 ${
                      isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-[11px] text-slate-400">{m.label}</div>
                    <div className={`text-xs font-mono font-bold tabular-nums mt-0.5 ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`pt-3.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
              }`}
            >
              <span className="truncate">{card.publisher}</span>
              <span className="font-semibold text-sky-500 whitespace-nowrap">Özeti Oku →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BasicsWorkspace;
