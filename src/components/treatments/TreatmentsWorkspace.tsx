import React, { useState } from 'react';
import { 
  Pill, 
  FlaskConical, 
  Activity, 
  Syringe, 
  Brain, 
  Droplet, 
  Zap, 
  Layers, 
  Sparkles, 
  BookOpen,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { MagnesiumCalculator } from './MagnesiumCalculator';
import { HypomagnesemiaInfographic } from './HypomagnesemiaInfographic';
import { PotassiumCalculator } from './PotassiumCalculator';
import { HypokalemiaInfographic } from './HypokalemiaInfographic';

interface Props {
  isDark: boolean;
}

type TreatmentCategory = 'electrolyte' | 'vasoactive' | 'sedation' | 'hemostasis';
type MagnesiumViewMode = 'all' | 'calc' | 'infographic';
type PotassiumViewMode = 'all' | 'calc' | 'infographic';

interface ProtocolCardItem {
  id: string;
  category: TreatmentCategory;
  categoryLabel: string;
  badge: string;
  title: string;
  shortDesc: string;
  status: 'active' | 'upcoming';
  accentColor: 'teal' | 'cyan' | 'purple' | 'rose';
  highlightsHeader: string;
  highlights: { label: string; value: string; colorClass: string; bgClass: string; borderClass: string }[];
}

const PROTOCOL_CARDS: ProtocolCardItem[] = [
  {
    id: 'magnesium',
    category: 'electrolyte',
    categoryLabel: 'Elektrolit Replasmanı',
    badge: 'Mathews et al. 2022',
    title: 'Magnezyum Sülfat (MgSO₄) Replasmanı ve Hipomagnezemi',
    shortDesc: 'Yoğun bakım prospektif verilerine göre eGFR kademeli hedef serum dozu, Türkiye standart 10 mL %15 ampul hesabı, damar yolu flebit güvenliği ve EKG/semptom kartları.',
    status: 'active',
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { label: 'Normal eGFR', value: '+0.15 mg/dL / amp', colorClass: 'text-emerald-700 dark:text-emerald-300', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'eGFR 30–89', value: '+0.22 mg/dL / amp', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'eGFR < 30', value: '+0.28 mg/dL / amp', colorClass: 'text-rose-700 dark:text-rose-300', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
      { label: 'Periferik Sınır', value: '≤ %2.0 Derişim', colorClass: 'text-cyan-700 dark:text-cyan-300', bgClass: 'bg-cyan-500/10', borderClass: 'border-cyan-500/30' }
    ]
  },
  {
    id: 'potassium',
    category: 'electrolyte',
    categoryLabel: 'Elektrolit Replasmanı',
    badge: '%7.5 KCl & Kaliphos',
    title: 'Potasyum & Kaliphos (Potasyum Fosfat) Replasmanı',
    shortDesc: '%7.5 KCl (10 mL = 10 mEq) ve Kaliphos (10 mL = 30 mEq K⁺ + 60 mEq Fosfat) ampul hesabı, periferik/SVK derişim sınırları, infüzyon hızı ve EKG bulguları.',
    status: 'active',
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { label: '%7.5 KCl Ampul', value: '10 mL = 10 mEq K⁺', colorClass: 'text-teal-700 dark:text-teal-300', bgClass: 'bg-teal-500/10', borderClass: 'border-teal-500/30' },
      { label: 'Kaliphos Ampul', value: '30 mEq K + 60 mEq P', colorClass: 'text-purple-700 dark:text-purple-300', bgClass: 'bg-purple-500/10', borderClass: 'border-purple-500/30' },
      { label: 'Periferik Sınır', value: '≤ 40 mEq/L (≤ 10 mEq/sa)', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'SVK / YB Sınırı', value: 'Sıvı Kısıtında ≤ 400 mEq/L', colorClass: 'text-indigo-700 dark:text-indigo-300', bgClass: 'bg-indigo-500/10', borderClass: 'border-indigo-500/30' }
    ]
  },
  {
    id: 'sodium',
    category: 'electrolyte',
    categoryLabel: 'Elektrolit Replasmanı',
    badge: 'Adrogué-Madias',
    title: 'Sodyum Bozuklukları ve Hiponatremi (%3 NaCl Protokolü)',
    shortDesc: 'Adrogué-Madias formülüyle hipertonik salin hesabı ve Osmotik Demiyelinizasyon Sendromu (ODS) önleme hız kısıtlamaları (maks 8 mmol/L / 24 saat).',
    status: 'upcoming',
    accentColor: 'teal',
    highlightsHeader: 'Planlanan Parametreler:',
    highlights: [
      { label: '24 Sa Yükselme', value: 'Maks 8 mmol/L', colorClass: 'text-slate-600 dark:text-slate-400', bgClass: 'bg-slate-500/10', borderClass: 'border-slate-500/20' },
      { label: '%3 Hipertonik', value: '513 mEq/L Na⁺', colorClass: 'text-slate-600 dark:text-slate-400', bgClass: 'bg-slate-500/10', borderClass: 'border-slate-500/20' }
    ]
  }
];

export const TreatmentsWorkspace: React.FC<Props> = ({ isDark }) => {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('electrolyte');
  // null = kartlar galerisi, 'magnesium' veya 'potassium' = ayrıntılı hesaplayıcı & infografik görünümü
  const [activeProtocolId, setActiveProtocolId] = useState<string | null>(null);
  const [mgViewMode, setMgViewMode] = useState<MagnesiumViewMode>('all');
  const [kViewMode, setKViewMode] = useState<PotassiumViewMode>('all');

  const filteredCards = PROTOCOL_CARDS.filter(card => card.category === activeCategory);
  const selectedProtocol = PROTOCOL_CARDS.find(card => card.id === activeProtocolId);

  return (
    <div className="space-y-6">
      {/* Üst Modül Başlığı ve Kategori Sekmeleri */}
      <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            {activeProtocolId ? (
              <button
                type="button"
                onClick={() => setActiveProtocolId(null)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' 
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Tedavi protokollerine geri dön"
              >
                <ArrowLeft className="w-5 h-5 text-teal-500" />
              </button>
            ) : (
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Pill className="w-6 h-6" />
              </div>
            )}
            
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  {activeProtocolId ? selectedProtocol?.title : 'Tedaviler ve İlaçlar'}
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-mono">
                  {activeProtocolId ? 'Protokol Detayı' : 'Klinik Protokoller'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {activeProtocolId
                  ? 'Protokolü kapatıp listeye dönmek için geri butonunu kullanabilir veya alt sekmelerle görünümü özelleştirebilirsiniz.'
                  : 'Anestezi, reanimasyon ve yoğun bakımda kanıta dayalı ilaç hazırlama, doz hesaplayıcıları ve klinik replasman protokolleri'
                }
              </p>
            </div>
          </div>

          {activeProtocolId && (
            <button
              type="button"
              onClick={() => setActiveProtocolId(null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer self-start md:self-auto ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-teal-500" />
              <span>Tüm Tedavi Protokollerine Dön</span>
            </button>
          )}
        </div>

        {/* Kategoriler (Sadece liste görünümündeyken göster) */}
        {!activeProtocolId && (
          <div className="flex items-center gap-2 pt-3 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory('electrolyte')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'electrolyte'
                  ? isDark 
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50 shadow-xs' 
                    : 'bg-teal-50 text-teal-800 border border-teal-400 shadow-xs'
                  : isDark 
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-teal-500" />
              <span>Elektrolit &amp; Sıvı Replasmanı</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400 font-mono">
                Aktif
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('vasoactive')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer opacity-75 hover:opacity-100 ${
                activeCategory === 'vasoactive'
                  ? isDark 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-xs' 
                    : 'bg-cyan-50 text-cyan-800 border border-cyan-400 shadow-xs'
                  : isDark 
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Syringe className="w-3.5 h-3.5 text-cyan-500" />
              <span>İnfüzyon &amp; Vazoaktif Protokolleri</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-sans">
                Modüler
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('sedation')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer opacity-75 hover:opacity-100 ${
                activeCategory === 'sedation'
                  ? isDark 
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-xs' 
                    : 'bg-purple-50 text-purple-800 border border-purple-400 shadow-xs'
                  : isDark 
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-purple-500" />
              <span>Sedoanaljezi &amp; Nöromüsküler</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-sans">
                Modüler
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('hemostasis')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer opacity-75 hover:opacity-100 ${
                activeCategory === 'hemostasis'
                  ? isDark 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-xs' 
                    : 'bg-rose-50 text-rose-800 border border-rose-400 shadow-xs'
                  : isDark 
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Droplet className="w-3.5 h-3.5 text-rose-500" />
              <span>Hemostaz &amp; Transfüzyon</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-sans">
                Modüler
              </span>
            </button>
          </div>
        )}
      </div>

      {/* GÖRÜNÜM 1: PROTOKOL KARTLARI GALERİSİ (activeProtocolId === null) */}
      {!activeProtocolId && activeCategory === 'electrolyte' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Uygulamak veya incelemek istediğiniz tedavi protokolünü seçin:</span>
            <span className="font-mono text-[11px] font-semibold">{filteredCards.length} Protokol</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map((card) => {
              const isActive = card.status === 'active';
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (isActive) setActiveProtocolId(card.id);
                  }}
                  className={`group relative p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between select-none ${
                    isActive 
                      ? isDark 
                        ? 'bg-slate-900/90 border-slate-800 hover:border-teal-500/60 hover:bg-slate-800/70 shadow-xs cursor-pointer' 
                        : 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-md cursor-pointer'
                      : isDark
                        ? 'bg-slate-900/40 border-slate-800/60 opacity-60 cursor-not-allowed'
                        : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div>
                    {/* Üst Rozet & Kaynak */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                        {card.categoryLabel}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">
                        {card.badge}
                      </span>
                    </div>

                    {/* Başlık & Kısa Açıklama */}
                    <h3 className={`text-sm font-bold transition-colors ${
                      isActive ? 'group-hover:text-teal-600 dark:group-hover:text-teal-400 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {card.title}
                    </h3>
                    <p className="text-xs mt-1.5 leading-relaxed line-clamp-3 text-slate-500 dark:text-slate-400">
                      {card.shortDesc}
                    </p>

                    {/* Parametre Şeridi */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="text-[10px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-teal-500" />
                        <span>{card.highlightsHeader}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {card.highlights.map((h, idx) => (
                          <div
                            key={idx}
                            className={`p-1.5 rounded-lg border text-center ${h.bgClass} ${h.borderClass}`}
                          >
                            <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                              {h.label}
                            </span>
                            <span className={`block text-[10px] font-bold font-mono mt-0.5 ${h.colorClass}`}>
                              {h.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Alt Aksiyon Butonu / Gösterge */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400">
                      {isActive ? 'Tam interaktif hesaplayıcı' : 'Geliştirme aşamasında'}
                    </span>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
                        <span>Aç ve Hesapla</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500">
                        Yakında
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GÖRÜNÜM 2: SEÇİLİ PROTOKOLÜN DETAYI (activeProtocolId === 'magnesium') */}
      {activeProtocolId === 'magnesium' && (
        <div className="space-y-6">
          {/* Alt Görünüm Modu Filtresi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Görünüm Seçimi:
              </span>
            </div>

            <div className={`inline-flex p-1 rounded-lg border text-xs font-medium self-start sm:self-auto ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <button
                type="button"
                onClick={() => setMgViewMode('all')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  mgViewMode === 'all'
                    ? isDark ? 'bg-slate-800 text-teal-400 font-bold shadow-xs' : 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Tam Görünüm (Tümü)
              </button>
              <button
                type="button"
                onClick={() => setMgViewMode('calc')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  mgViewMode === 'calc'
                    ? isDark ? 'bg-slate-800 text-teal-400 font-bold shadow-xs' : 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Hesaplayıcı &amp; Protokol
              </button>
              <button
                type="button"
                onClick={() => setMgViewMode('infographic')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  mgViewMode === 'infographic'
                    ? isDark ? 'bg-slate-800 text-teal-400 font-bold shadow-xs' : 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Klinik &amp; EKG İnfografiği
              </button>
            </div>
          </div>

          {/* Magnezyum Hesaplayıcısı */}
          {(mgViewMode === 'all' || mgViewMode === 'calc') && (
            <MagnesiumCalculator isDark={isDark} />
          )}

          {/* Hipomagnezemi Klinik Bulguları ve EKG İnfografiği */}
          {(mgViewMode === 'all' || mgViewMode === 'infographic') && (
            <HypomagnesemiaInfographic isDark={isDark} />
          )}
        </div>
      )}

      {/* GÖRÜNÜM 2B: SEÇİLİ PROTOKOLÜN DETAYI (activeProtocolId === 'potassium') */}
      {activeProtocolId === 'potassium' && (
        <div className="space-y-6">
          {/* Alt Görünüm Modu Filtresi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Görünüm Seçimi:
              </span>
            </div>

            <div className={`inline-flex p-1 rounded-lg border text-xs font-medium self-start sm:self-auto ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <button
                type="button"
                onClick={() => setKViewMode('all')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  kViewMode === 'all'
                    ? isDark ? 'bg-slate-800 text-teal-400 font-bold shadow-xs' : 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Tam Görünüm (Tümü)
              </button>
              <button
                type="button"
                onClick={() => setKViewMode('calc')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  kViewMode === 'calc'
                    ? isDark ? 'bg-slate-800 text-teal-400 font-bold shadow-xs' : 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Hesaplayıcı &amp; Protokol
              </button>
              <button
                type="button"
                onClick={() => setKViewMode('infographic')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  kViewMode === 'infographic'
                    ? isDark ? 'bg-slate-800 text-teal-400 font-bold shadow-xs' : 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Klinik &amp; EKG İnfografiği
              </button>
            </div>
          </div>

          {/* Potasyum & Kaliphos Hesaplayıcısı */}
          {(kViewMode === 'all' || kViewMode === 'calc') && (
            <PotassiumCalculator isDark={isDark} />
          )}

          {/* Hipokalemi Klinik Bulguları ve EKG İnfografiği */}
          {(kViewMode === 'all' || kViewMode === 'infographic') && (
            <HypokalemiaInfographic isDark={isDark} />
          )}
        </div>
      )}

      {/* DİĞER KATEGORİLER İÇİN MODÜLER GÖRÜNÜM */}
      {!activeProtocolId && activeCategory !== 'electrolyte' && (
        <div className={`p-8 rounded-xl border text-center space-y-3 ${
          isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-teal-500/10 text-teal-500">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {activeCategory === 'vasoactive' && 'İnfüzyon & Vazoaktif Protokolleri'}
            {activeCategory === 'sedation' && 'Sedoanaljezi & Nöromüsküler Blokaj'}
            {activeCategory === 'hemostasis' && 'Hemostaz & Kan Transfüzyon Yönetimi'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Bu bölüm yeni tedavi protokolleri için modüler olarak hazırlanmıştır. Klinik pratiğimizde kullanılan diğer ilaç ve protokolleri eklemek için talepte bulunabilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('electrolyte')}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white cursor-pointer transition-colors"
          >
            Elektrolit Protokollerine Dön
          </button>
        </div>
      )}
    </div>
  );
};
