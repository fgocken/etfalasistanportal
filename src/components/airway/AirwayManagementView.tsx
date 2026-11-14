import React, { useState, useEffect } from 'react';
import {
  Activity,
  ArrowLeft,
  Baby,
  ChevronRight,
  Coffee,
  Layers,
  ShieldAlert,
  Wind
} from 'lucide-react';
import { DifficultAirwayDASInfographic } from '../infographics/DifficultAirwayDASInfographic';
import { GastricUsgPerlasInfographic } from '../infographics/GastricUsgPerlasInfographic';
import { RSIvsElectiveInfographic } from '../infographics/RSIvsElectiveInfographic';
import { AdultFastingInfographic } from '../infographics/AdultFastingInfographic';
import { PediatricFastingInfographic } from '../infographics/PediatricFastingInfographic';

interface AirwayManagementViewProps {
  isDark: boolean;
  initialCardId?: AirwayCardId | null;
}

export type AirwayCardId = 'difficult-das' | 'gastric-usg' | 'rsi' | 'adult-fasting' | 'pediatric-fasting';

interface AirwayCardItem {
  id: AirwayCardId;
  title: string;
  badge: string;
  category: string;
  shortDesc: string;
  publisher: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBgDark: string;
  iconBgLight: string;
  iconColorDark: string;
  iconColorLight: string;
  borderHoverDark: string;
  borderHoverLight: string;
  highlightsHeader: string;
  highlights: { label: string; value: string; colorClass: string; bgClass: string; borderClass: string }[];
}

const AIRWAY_CARDS: AirwayCardItem[] = [
  {
    id: 'difficult-das',
    title: 'Zor Havayolu & DAS 2025 Plan A–D Algoritması',
    badge: 'DAS 2025 · ASA 2022',
    category: 'Havayolu & Kriz Yönetimi',
    shortDesc: 'Zor havayolu alt tanımları, ATI kriterleri, interaktif LEMON / Mallampati / MACOCHA skorlayıcıları, MOANS-RODS-SHORT ve adım adım DAS 2025 Plan A–D (eFONA) algoritması.',
    publisher: 'British Journal of Anaesthesia / ASA',
    icon: Layers,
    iconBgDark: 'bg-cyan-500/15',
    iconBgLight: 'bg-cyan-50',
    iconColorDark: 'text-cyan-400',
    iconColorLight: 'text-cyan-700',
    borderHoverDark: 'hover:border-cyan-500/40',
    borderHoverLight: 'hover:border-cyan-400',
    highlightsHeader: 'DAS 2025 Kriz Basamakları:',
    highlights: [
      { label: 'Plan A (VL)', value: '3+1 Deneme', colorClass: 'text-cyan-700 dark:text-cyan-300', bgClass: 'bg-cyan-500/10', borderClass: 'border-cyan-500/30' },
      { label: 'Plan B (SAD)', value: 'Maks 3', colorClass: 'text-sky-700 dark:text-sky-300', bgClass: 'bg-sky-500/10', borderClass: 'border-sky-500/30' },
      { label: 'Plan C (Maske)', value: 'Uyandır', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Plan D (eFONA)', value: 'Neşter-Buji', colorClass: 'text-rose-700 dark:text-rose-300', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' }
    ]
  },
  {
    id: 'gastric-usg',
    title: 'Gastrik USG (POCUS) & Perlas 0–2 Karar Destek',
    badge: 'Perlas 0–2 · GUS',
    category: 'Aspirasyon Karar Desteği',
    shortDesc: 'Yatak başı gastrik ultrasonografi ile Perlas 0–2 evrelemesi, RLD antral kesit alanı (CSA), mL ve mL/kg mide hacmi hesabı ve aktif indüksiyon karar desteği.',
    publisher: 'Br J Anaesth / Anesth Analg',
    icon: Activity,
    iconBgDark: 'bg-emerald-500/15',
    iconBgLight: 'bg-emerald-50',
    iconColorDark: 'text-emerald-400',
    iconColorLight: 'text-emerald-700',
    borderHoverDark: 'hover:border-emerald-500/40',
    borderHoverLight: 'hover:border-emerald-400',
    highlightsHeader: 'Perlas Karar Eşikleri:',
    highlights: [
      { label: 'Grade 0', value: 'Boş Antrum', colorClass: 'text-emerald-700 dark:text-emerald-300', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'Grade 1', value: '< 1.5 mL/kg', colorClass: 'text-sky-700 dark:text-sky-300', bgClass: 'bg-sky-500/10', borderClass: 'border-sky-500/30' },
      { label: 'Grade 2', value: '≥ 1.5 mL/kg', colorClass: 'text-rose-700 dark:text-rose-300', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
      { label: 'Katı Gıda', value: 'RSI / Ertele', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' }
    ]
  },
  {
    id: 'rsi',
    title: 'Hızlı Seri Entübasyon (RSI) vs Elektif Entübasyon',
    badge: 'DAS / ASA',
    category: 'Havayolu & Aspirasyon',
    shortDesc: 'Dolu mide aspirasyon profilaksisi (RSI) ile elektif indüksiyonun 10 kritik parametrede karşılaştırması: BMV yasağı, 1.2 mg/kg Rokuronyum, Sellick manevrası ve NODESAT.',
    publisher: 'Anesth Analg / DAS Guidelines',
    icon: ShieldAlert,
    iconBgDark: 'bg-rose-500/15',
    iconBgLight: 'bg-rose-50',
    iconColorDark: 'text-rose-400',
    iconColorLight: 'text-rose-600',
    borderHoverDark: 'hover:border-rose-500/40',
    borderHoverLight: 'hover:border-rose-400',
    highlightsHeader: 'Kritik RSI Farkları:',
    highlights: [
      { label: 'BMV', value: 'YASAK', colorClass: 'text-rose-700 dark:text-rose-300', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
      { label: 'Rokuronyum', value: '1.2 mg/kg', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Oksijen', value: 'NODESAT', colorClass: 'text-emerald-700 dark:text-emerald-300', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'Kurtarma', value: '16 mg/kg', colorClass: 'text-purple-700 dark:text-purple-300', bgClass: 'bg-purple-500/10', borderClass: 'border-purple-500/30' }
    ]
  },
  {
    id: 'adult-fasting',
    title: 'Erişkin Preoperatif Açlık Kılavuzu (2 - 6 - 8 Kuralı)',
    badge: 'ASA 2023',
    category: 'Preop Açlık & Aspirasyon',
    shortDesc: 'Berrak sıvılar (2 sa), hafif öğün (6 sa), ağır/yağlı yemekler (8 sa), sakız çiğneme (vaka ertelenmez), GLP-1 agonistleri ve dolu mide kriterleri.',
    publisher: 'Anesthesiology / ESAIC',
    icon: Coffee,
    iconBgDark: 'bg-emerald-500/15',
    iconBgLight: 'bg-emerald-50',
    iconColorDark: 'text-emerald-400',
    iconColorLight: 'text-emerald-600',
    borderHoverDark: 'hover:border-emerald-500/40',
    borderHoverLight: 'hover:border-emerald-400',
    highlightsHeader: 'Açlık Pencereleri:',
    highlights: [
      { label: 'Berrak Sıvı', value: '2 Saat', colorClass: 'text-emerald-700 dark:text-emerald-300', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'Hafif Öğün', value: '6 Saat', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Ağır / Et', value: '8 Saat', colorClass: 'text-rose-700 dark:text-rose-300', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
      { label: 'Sakız', value: 'İptal Yok', colorClass: 'text-sky-700 dark:text-sky-300', bgClass: 'bg-sky-500/10', borderClass: 'border-sky-500/30' }
    ]
  },
  {
    id: 'pediatric-fasting',
    title: 'Pediatrik Preoperatif Açlık Kılavuzu (6 - 4 - 3 - 1 Kuralı)',
    badge: 'ESAIC 2022',
    category: 'Pediatri & Preop Açlık',
    shortDesc: 'Çocuklarda dehidratasyon ve hipoglisemiyi önleyen modern 6-4-3-1 açlık standardı: Berrak sıvılar 1 sa, anne sütü 3 sa, mama 4 sa, katı gıda ve inek sütü 6 sa.',
    publisher: 'Eur J Anaesthesiol / ESPA',
    icon: Baby,
    iconBgDark: 'bg-amber-500/15',
    iconBgLight: 'bg-amber-50',
    iconColorDark: 'text-amber-400',
    iconColorLight: 'text-amber-600',
    borderHoverDark: 'hover:border-amber-500/40',
    borderHoverLight: 'hover:border-amber-400',
    highlightsHeader: 'Pediatrik 6-4-3-1:',
    highlights: [
      { label: 'Berrak Sıvı', value: '1 Saat', colorClass: 'text-emerald-700 dark:text-emerald-300', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'Anne Sütü', value: '3 Saat', colorClass: 'text-teal-700 dark:text-teal-300', bgClass: 'bg-teal-500/10', borderClass: 'border-teal-500/30' },
      { label: 'Bebek Maması', value: '4 Saat', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Katı / Süt', value: '6 Saat', colorClass: 'text-rose-700 dark:text-rose-300', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' }
    ]
  }
];

export const AirwayManagementView: React.FC<AirwayManagementViewProps> = ({ isDark, initialCardId = null }) => {
  const [activeCardId, setActiveCardId] = useState<AirwayCardId | null>(initialCardId);

  useEffect(() => {
    if (initialCardId !== undefined) {
      setActiveCardId(initialCardId);
    }
  }, [initialCardId]);

  const selectedCard = AIRWAY_CARDS.find((c) => c.id === activeCardId);

  return (
    <div className="space-y-6">
      {/* Üst Başlık & Geri Dönüş Navigasyonu */}
      <div className={`rounded-2xl border p-5 sm:p-6 transition-all ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {activeCardId ? (
              <button
                type="button"
                onClick={() => setActiveCardId(null)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Tüm Havayolu Araçlarına Dön"
              >
                <ArrowLeft className="w-5 h-5 text-cyan-500" />
              </button>
            ) : (
              <div className={`p-2.5 rounded-xl ${
                isDark ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20' : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
              }`}>
                <Wind className="w-6 h-6" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeCardId ? selectedCard?.title : 'Havayolu Yönetimi & Aspirasyon Karar Desteği'}
                </h2>
                <span className={`text-xs font-medium ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
                  · {activeCardId ? selectedCard?.category : 'Klinik Karar Destek'}
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {activeCardId
                  ? 'Kart listesine dönmek için sol üstteki geri butonuna tıklayabilirsiniz.'
                  : 'DAS 2025 Plan A–D algoritması, zor havayolu skorları, Perlas 0–2 Gastrik USG, RSI ve preoperatif açlık kılavuzları'}
              </p>
            </div>
          </div>

          {activeCardId && (
            <button
              type="button"
              onClick={() => setActiveCardId(null)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer self-start sm:self-auto ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-500" />
              <span>Tüm Havayolu Araçlarına Dön</span>
            </button>
          )}
        </div>
      </div>

      {/* GÖRÜNÜM 1: Kart Galerisi (Doğrudan açılmaz, seçilen kart açılır) */}
      {!activeCardId && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>İncelemek istediğiniz havayolu veya aspirasyon modülünün üzerine tıklayın:</span>
            <span className="font-mono tabular-nums text-[11px]">{AIRWAY_CARDS.length} Klinik Modül</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {AIRWAY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCardId(card.id)}
                  className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isDark
                      ? `bg-slate-900 border-slate-800 ${card.borderHoverDark} hover:bg-slate-800/60 shadow-xs`
                      : `bg-white border-slate-200 ${card.borderHoverLight} hover:shadow-lg hover:shadow-slate-200/50`
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`p-2.5 rounded-xl transition-transform group-hover:scale-105 duration-200 ${
                        isDark ? `${card.iconBgDark} ${card.iconColorDark}` : `${card.iconBgLight} ${card.iconColorLight}`
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        {card.badge}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {card.category}
                      </span>
                      <h3 className={`text-base font-bold transition-colors mt-0.5 ${
                        isDark ? 'text-slate-100 group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-cyan-600'
                      }`}>
                        {card.title}
                      </h3>
                    </div>

                    <p className={`text-xs leading-relaxed mb-4 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {card.shortDesc}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                        {card.highlightsHeader}
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {card.highlights.map((h, idx) => (
                          <div
                            key={idx}
                            className={`p-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-between ${h.bgClass} ${h.borderClass}`}
                          >
                            <span className="text-slate-500 dark:text-slate-400 text-[10px] truncate">{h.label}</span>
                            <span className={`font-mono tabular-nums font-bold text-[10px] ${h.colorClass} shrink-0 ml-1`}>{h.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                    isDark ? 'border-slate-800 text-cyan-400 group-hover:text-cyan-300' : 'border-slate-100 text-cyan-600 group-hover:text-cyan-700'
                  }`}>
                    <span className="text-[11px] text-slate-400 font-medium truncate max-w-[160px]">{card.publisher}</span>
                    <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                      <span>Modülü Aç</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GÖRÜNÜM 2: Seçilen Kartın İçeriği */}
      {activeCardId === 'difficult-das' && <DifficultAirwayDASInfographic isDark={isDark} />}
      {activeCardId === 'gastric-usg' && <GastricUsgPerlasInfographic isDark={isDark} />}
      {activeCardId === 'rsi' && <RSIvsElectiveInfographic isDark={isDark} />}
      {activeCardId === 'adult-fasting' && (
        <AdultFastingInfographic
          isDark={isDark}
          onOpenPediatric={() => setActiveCardId('pediatric-fasting')}
          onOpenGastricUsg={() => setActiveCardId('gastric-usg')}
        />
      )}
      {activeCardId === 'pediatric-fasting' && (
        <PediatricFastingInfographic
          isDark={isDark}
          onOpenAdult={() => setActiveCardId('adult-fasting')}
        />
      )}
    </div>
  );
};

export default AirwayManagementView;
