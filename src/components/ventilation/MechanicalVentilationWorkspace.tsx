import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronRight, Gauge, Wind } from 'lucide-react';
import { ShareLinkButton } from '../common/ShareLinkButton';
import { PortalLink } from '../common/PortalLink';
import { OxygenTherapyModule } from './OxygenTherapyModule';
import { MedicalText } from '../basics/respiratory/MedicalText';
import { buildHashHref, parseHashRoute, updateHashRoute } from '../../utils/deepLink';

export type VentilationCardId = 'oxygen-therapy';

interface MechanicalVentilationWorkspaceProps {
  isDark: boolean;
  initialCardId?: string | null;
  onActiveCardChange?: (cardId: VentilationCardId | null) => void;
}

const isValidVentilationCardId = (id: string | null | undefined): id is VentilationCardId =>
  id === 'oxygen-therapy';

interface VentilationCardItem {
  id: VentilationCardId;
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

const VENTILATION_CARDS: VentilationCardItem[] = [
  {
    id: 'oxygen-therapy',
    title: 'Klinik ve Perioperatif Oksijen Tedavisi',
    category: 'Solunumsal Destek · Modül 01',
    meta: '4 Ana Bölüm · Şematik Görsel · Sürekli Okuma',
    shortDesc:
      'BTS 2017 hedef SpO_{2} titrasyonu (%94–98 vs %88–92), C_{a}O_{2} / DO_{2} / VO_{2} / O_{2}ER ve Boyle tüp süresi formülleri, KOAH’ta oksijen kaynaklı hiperkapni mekanizmaları, değişken/sabit performanslı cihazlar (Ventüri/HAFOE renk kodları, NRBM, HFNC), preoksijenasyon, apneik O_{2} (NODESAT) ve klinik güvenlik.',
    publisher: "BTS 2017 · ERS 2022 · Miller's · Nunn's · West's · ICU-ROX / HOT-ICU",
    metrics: [
      { label: 'Kapsam', value: '4 Ana Bölüm' },
      { label: 'Normal Hedef', value: '%94 – %98' },
      { label: 'KOAH / OHS', value: '%88 – %92' },
      { label: 'Referanslar', value: '6 Kılavuz / Kaynak' },
    ],
  },
];

export const MechanicalVentilationWorkspace: React.FC<MechanicalVentilationWorkspaceProps> = ({
  isDark,
  initialCardId,
  onActiveCardChange,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<VentilationCardId | null>(() => {
    if (isValidVentilationCardId(initialCardId)) return initialCardId;
    const route = parseHashRoute();
    if (route.type === 'arac' && route.id === 'mechanical-ventilation' && isValidVentilationCardId(route.subId)) {
      return route.subId;
    }
    return null;
  });

  useEffect(() => {
    if (isValidVentilationCardId(initialCardId)) {
      setSelectedCardId(initialCardId);
    } else if (initialCardId === null) {
      const route = parseHashRoute();
      if (route.type === 'arac' && route.id === 'mechanical-ventilation' && isValidVentilationCardId(route.subId)) {
        setSelectedCardId(route.subId);
      } else {
        setSelectedCardId(null);
      }
    }
  }, [initialCardId]);

  useEffect(() => {
    const handleHash = () => {
      const route = parseHashRoute();
      if (route.type === 'arac' && route.id === 'mechanical-ventilation') {
        const nextCard: VentilationCardId | null = isValidVentilationCardId(route.subId)
          ? route.subId
          : null;
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

  const handleSelectCard = (cardId: VentilationCardId) => {
    setSelectedCardId(cardId);
    onActiveCardChange?.(cardId);
    updateHashRoute('arac', `mechanical-ventilation&sub=${cardId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseCard = () => {
    setSelectedCardId(null);
    onActiveCardChange?.(null);
    updateHashRoute('arac', 'mechanical-ventilation');
  };

  if (selectedCardId === 'oxygen-therapy') {
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
            <span>Solunumsal Destek Kart Panosuna Dön</span>
          </button>

          <ShareLinkButton
            type="arac"
            id="mechanical-ventilation&sub=oxygen-therapy"
            title="Klinik ve Perioperatif Oksijen Tedavisi Bağlantısını Kopyala"
            isDark={isDark}
          />
        </div>

        <OxygenTherapyModule isDark={isDark} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Solunumsal Destek Card Board Header */}
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
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-sky-500">
              Solunum Desteği &amp; Mekanik Ventilasyon · Klinik Kart Panosu
            </div>
            <h2 className={`text-xl sm:text-2xl font-extrabold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Solunumsal Destek
            </h2>
            <p className={`text-sm mt-1 max-w-3xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Konvansiyonel ve perioperatif oksijen tedavisinden yüksek akımlı nazal oksijene (HFNC), non-invaziv ve invaziv mekanik ventilasyon stratejilerine uzanan sistematik klinik modüller.
            </p>
          </div>
        </div>

        <ShareLinkButton
          type="arac"
          id="mechanical-ventilation"
          title="Solunumsal Destek Bölümünü Paylaş"
          isDark={isDark}
        />
      </div>

      {/* Card Board Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {VENTILATION_CARDS.map((card) => (
          <PortalLink
            key={card.id}
            href={buildHashHref('arac', 'mechanical-ventilation', card.id)}
            onNavigate={() => handleSelectCard(card.id)}
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
                      {card.category} · <span className="text-sky-500 font-semibold">{card.meta}</span>
                    </div>
                    <h3
                      className={`text-lg sm:text-xl font-bold mt-0.5 transition-colors ${
                        isDark
                          ? 'text-white group-hover:text-sky-300'
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
                      ? 'text-slate-500 group-hover:text-sky-400'
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
                        isDark ? 'text-sky-300' : 'text-sky-800'
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
              <span className="font-semibold whitespace-nowrap text-sky-500">Modülü Oku →</span>
            </div>
          </PortalLink>
        ))}
      </div>

      {/* Quiet Roadmap Note (non-interactive) */}
      <p className={`text-xs px-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Planlanan sonraki modüller: Yüksek Akımlı Nazal Oksijen (HFNC) &amp; NIV, İnvaziv Mekanik Ventilasyon Modları, ARDS PEEP Titrasyonu ve Weaning Protokolleri.
      </p>
    </div>
  );
};
