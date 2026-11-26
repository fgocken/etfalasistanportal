import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpenCheck, ChevronRight, HeartPulse, Wind } from 'lucide-react';
import { ShareLinkButton } from '../common/ShareLinkButton';
import { PortalLink } from '../common/PortalLink';
import { RespiratoryPhysiologyWorkspace } from './RespiratoryPhysiologyWorkspace';
import { CardiovascularPhysiologyWorkspace } from './CardiovascularPhysiologyWorkspace';
import { MedicalText } from './respiratory/MedicalText';
import { buildHashHref, parseHashRoute, updateHashRoute } from '../../utils/deepLink';

interface BasicsWorkspaceProps {
  isDark: boolean;
  initialCardId?: string | null;
  onActiveCardChange?: (cardId: BasicsCardId | null) => void;
}

export type BasicsCardId = 'respiratory-physiology' | 'cardiovascular-physiology';

const isValidBasicsCardId = (id: string | null | undefined): id is BasicsCardId =>
  id === 'respiratory-physiology' || id === 'cardiovascular-physiology';

interface BasicsCardItem {
  id: BasicsCardId;
  title: string;
  category: string;
  meta: string;
  shortDesc: string;
  publisher: string;
  accent: 'sky' | 'rose';
  icon: React.FC<{ className?: string }>;
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
    accent: 'sky',
    icon: Wind,
    metrics: [
      { label: 'Kapsam', value: '8 Tam Bölüm' },
      { label: 'Görseller', value: '5 Şematik Grafik' },
      { label: 'Referanslar', value: '5 Ana Textbook' },
      { label: 'Format', value: 'Düz Okuma' },
    ],
  },
  {
    id: 'cardiovascular-physiology',
    title: 'Kardiyovasküler Fizyoloji',
    category: 'Fizyoloji · Sistematik Ders Özeti',
    meta: '9 Bölüm · 6 Şematik Görsel · Düz Okuma',
    shortDesc:
      'Miyokardiyal ultrastrüktür ve ECC, aksiyon potansiyelleri, Wiggers ve LV P–V döngüsü, Frank–Starling ve Guyton venöz dönüş (P_{msf}), glikokaliks–Revize Starling, koroner perfüzyon–otoregülasyon, nörohumoral kontrol, şok/anestezikler, kapak hastalıkları (AS/AR/MS/MR/HOCM), vazopresör/inotrop ve IV vazodilatatör/hız kırıcı ajanlar.',
    publisher: "Klabunde · Guyton & Hall · Miller's · Morgan & Mikhail · Kaplan's · Barash · Marino's · ESC",
    accent: 'rose',
    icon: HeartPulse,
    metrics: [
      { label: 'Kapsam', value: '9 Tam Bölüm' },
      { label: 'Görseller', value: '6 Şematik Grafik' },
      { label: 'Referanslar', value: '9 Kaynak' },
      { label: 'Format', value: 'Düz Okuma' },
    ],
  },
];

export const BasicsWorkspace: React.FC<BasicsWorkspaceProps> = ({
  isDark,
  initialCardId,
  onActiveCardChange,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<BasicsCardId | null>(() => {
    if (isValidBasicsCardId(initialCardId)) return initialCardId;
    const route = parseHashRoute();
    if (route.type === 'arac' && route.id === 'basics' && isValidBasicsCardId(route.subId)) {
      return route.subId;
    }
    return null;
  });

  useEffect(() => {
    if (isValidBasicsCardId(initialCardId)) {
      setSelectedCardId(initialCardId);
    } else if (initialCardId === null) {
      const route = parseHashRoute();
      if (route.type === 'arac' && route.id === 'basics' && isValidBasicsCardId(route.subId)) {
        setSelectedCardId(route.subId);
      } else {
        setSelectedCardId(null);
      }
    }
  }, [initialCardId]);

  useEffect(() => {
    const handleHash = () => {
      const route = parseHashRoute();
      if (route.type === 'arac' && route.id === 'basics') {
        const nextCard: BasicsCardId | null = isValidBasicsCardId(route.subId) ? route.subId : null;
        setSelectedCardId(nextCard);
        onActiveCardChange?.(nextCard);
      }
    };
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, [onActiveCardChange]);

  const handleSelectCard = (cardId: BasicsCardId) => {
    setSelectedCardId(cardId);
    onActiveCardChange?.(cardId);
    updateHashRoute('arac', `basics&sub=${cardId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseCard = () => {
    setSelectedCardId(null);
    onActiveCardChange?.(null);
    updateHashRoute('arac', 'basics');
  };

  if (selectedCardId === 'respiratory-physiology' || selectedCardId === 'cardiovascular-physiology') {
    const isCardio = selectedCardId === 'cardiovascular-physiology';
    return (
      <div className="space-y-5 animate-in fade-in duration-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCloseCard}
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
            id={`basics&sub=${selectedCardId}`}
            title={
              isCardio
                ? 'Kardiyovasküler Fizyoloji Bağlantısını Kopyala'
                : 'Solunum Fizyolojisi Bağlantısını Kopyala'
            }
            isDark={isDark}
          />
        </div>

        {isCardio ? (
          <CardiovascularPhysiologyWorkspace isDark={isDark} />
        ) : (
          <RespiratoryPhysiologyWorkspace isDark={isDark} />
        )}
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
        {BASICS_CARDS.map((card) => {
          const IconComponent = card.icon;
          const isRose = card.accent === 'rose';
          return (
            <PortalLink
              key={card.id}
              href={buildHashHref('arac', 'basics', card.id)}
              onNavigate={() => handleSelectCard(card.id)}
              className={`group text-left rounded-2xl border p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between gap-5 cursor-pointer ${
                isDark
                  ? isRose
                    ? 'bg-slate-900/80 border-slate-800 hover:border-rose-500/50 hover:bg-slate-900'
                    : 'bg-slate-900/80 border-slate-800 hover:border-sky-500/50 hover:bg-slate-900'
                  : isRose
                    ? 'bg-white border-slate-200 hover:border-rose-400 hover:shadow-md'
                    : 'bg-white border-slate-200 hover:border-sky-400 hover:shadow-md'
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isRose
                          ? isDark
                            ? 'bg-rose-500/15 text-rose-400'
                            : 'bg-rose-50 text-rose-700'
                          : isDark
                            ? 'bg-sky-500/15 text-sky-400'
                            : 'bg-sky-50 text-sky-700'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {card.category} ·{' '}
                        <span className={isRose ? 'text-rose-500 font-semibold' : 'text-teal-500 font-semibold'}>
                          {card.meta}
                        </span>
                      </div>
                      <h3
                        className={`text-lg sm:text-xl font-bold mt-0.5 transition-colors ${
                          isDark
                            ? isRose
                              ? 'text-white group-hover:text-rose-300'
                              : 'text-white group-hover:text-sky-300'
                            : isRose
                              ? 'text-slate-900 group-hover:text-rose-700'
                              : 'text-slate-900 group-hover:text-sky-700'
                        }`}
                      >
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 shrink-0 mt-1 transition-transform group-hover:translate-x-1 ${
                      isDark
                        ? isRose
                          ? 'text-slate-500 group-hover:text-rose-400'
                          : 'text-slate-500 group-hover:text-sky-400'
                        : isRose
                          ? 'text-slate-400 group-hover:text-rose-600'
                          : 'text-slate-400 group-hover:text-sky-600'
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
                      <div
                        className={`text-xs font-mono font-bold tabular-nums mt-0.5 ${
                          isRose
                            ? isDark
                              ? 'text-rose-300'
                              : 'text-rose-800'
                            : isDark
                              ? 'text-sky-300'
                              : 'text-sky-800'
                        }`}
                      >
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
                <span className={`font-semibold whitespace-nowrap ${isRose ? 'text-rose-500' : 'text-sky-500'}`}>
                  Özeti Oku →
                </span>
              </div>
            </PortalLink>
          );
        })}
      </div>
    </div>
  );
};

export default BasicsWorkspace;
