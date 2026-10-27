import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Heart, 
  ShieldAlert, 
  ArrowLeft, 
  ChevronRight, 
  Sparkles,
  Info,
  Layers,
  BookOpen,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { MaceCalculator } from './MaceCalculator';
import { AsaClassification } from '../asa/AsaClassification';

interface PreoperativeEvaluationProps {
  isDark: boolean;
  initialTool?: 'mace' | 'asa' | null;
}

type PreopToolId = 'mace' | 'asa';

interface PreopCardItem {
  id: PreopToolId;
  title: string;
  badge: string;
  category: string;
  shortDesc: string;
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

const PREOP_CARDS: PreopCardItem[] = [
  {
    id: 'mace',
    title: 'MACE Risk Hesaplayıcı',
    badge: 'RCRI (Lee) · NSQIP Gupta',
    category: 'Kardiyovasküler Risk',
    shortDesc: 'Revised Cardiac Risk Index ve NSQIP MICA modelleri ile cerrahi dışı majör kardiyak olay (MI, kardiyak arrest, ölüm) risk tahmini ve ACC/AHA & ESC kılavuz önerileri.',
    icon: Heart,
    iconBgDark: 'bg-rose-500/15',
    iconBgLight: 'bg-rose-50',
    iconColorDark: 'text-rose-400',
    iconColorLight: 'text-rose-600',
    borderHoverDark: 'hover:border-rose-500/40',
    borderHoverLight: 'hover:border-rose-400',
    highlightsHeader: 'Model ve Eşik Parametreleri:',
    highlights: [
      { label: 'RCRI Modern', value: '%3.9 – %15.0', colorClass: 'text-rose-700 dark:text-rose-300', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
      { label: 'Gupta MICA', value: 'Lojistik Regresyon', colorClass: 'text-blue-700 dark:text-blue-300', bgClass: 'bg-blue-500/10', borderClass: 'border-blue-500/30' },
      { label: 'Klinik Eşik', value: '≥ %1 Yüksek Risk', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Kılavuz', value: 'ACC/AHA & ESC', colorClass: 'text-emerald-700 dark:text-emerald-300', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' }
    ]
  },
  {
    id: 'asa',
    title: 'ASA Fiziksel Durum Sınıflaması',
    badge: 'ASA I – VI · 2025/2026',
    category: 'Sistemik Sağlık Durumu',
    shortDesc: 'Amerikan Anesteziyologlar Derneği resmi tanımları, yetişkin, pediatrik ve obstetrik klinik örnekleri, acil cerrahi (ASA-E) eki ve en güncel resmi konsensüs tablosu.',
    icon: ShieldAlert,
    iconBgDark: 'bg-emerald-500/15',
    iconBgLight: 'bg-emerald-50',
    iconColorDark: 'text-emerald-400',
    iconColorLight: 'text-emerald-600',
    borderHoverDark: 'hover:border-emerald-500/40',
    borderHoverLight: 'hover:border-emerald-400',
    highlightsHeader: 'Kapsanan Alanlar:',
    highlights: [
      { label: 'Resmi Tanım', value: 'ASA I – ASA VI', colorClass: 'text-emerald-700 dark:text-emerald-300', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'Örnek Gruplar', value: 'Erişkin · Pediatri · Gebe', colorClass: 'text-teal-700 dark:text-teal-300', bgClass: 'bg-teal-500/10', borderClass: 'border-teal-500/30' },
      { label: 'Acil Eki', value: 'ASA-E Kriterleri', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Geçerlilik', value: '2025/2026 Güncel', colorClass: 'text-sky-700 dark:text-sky-300', bgClass: 'bg-sky-500/10', borderClass: 'border-sky-500/30' }
    ]
  }
];

export const PreoperativeEvaluation: React.FC<PreoperativeEvaluationProps> = ({ isDark, initialTool = null }) => {
  const [activeToolId, setActiveToolId] = useState<PreopToolId | null>(initialTool);

  const selectedTool = PREOP_CARDS.find(card => card.id === activeToolId);

  return (
    <div className="space-y-6">
      {/* Üst Navigasyon & Modül Başlığı */}
      <div className={`rounded-2xl border p-5 sm:p-6 transition-all ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {activeToolId ? (
              <button
                type="button"
                onClick={() => setActiveToolId(null)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' 
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Tüm Preoperatif Araçlara Dön"
              >
                <ArrowLeft className="w-5 h-5 text-blue-500" />
              </button>
            ) : (
              <div className={`p-2.5 rounded-xl ${
                isDark ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                <ClipboardCheck className="w-6 h-6" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeToolId ? selectedTool?.title : 'Preoperatif Değerlendirme'}
                </h2>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  isDark ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {activeToolId ? selectedTool?.category : 'Klinik Karar Destek'}
                </span>
              </div>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {activeToolId 
                  ? 'Araçlar listesine dönmek için sol üstteki geri butonuna tıklayabilirsiniz.'
                  : 'Şişli Hamidiye Etfal EAH Anestezi ve Reanimasyon Kliniği Preoperatif Hasta Değerlendirme & Risk Araçları'
                }
              </p>
            </div>
          </div>

          {activeToolId && (
            <button
              type="button"
              onClick={() => setActiveToolId(null)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer self-start sm:self-auto ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-500" />
              <span>Tüm Preoperatif Araçlara Dön</span>
            </button>
          )}
        </div>
      </div>

      {/* GÖRÜNÜM 1: Preoperatif Araçlar Galerisi (Kartlar Görünümü) */}
      {!activeToolId && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Kullanmak istediğiniz preoperatif aracın üzerine tıklayın:</span>
            <span className="font-mono text-[11px]">{PREOP_CARDS.length} Klinik Araç</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {PREOP_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveToolId(card.id)}
                  className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isDark
                      ? `bg-slate-900 border-slate-800 ${card.borderHoverDark} hover:bg-slate-850 hover:shadow-xl hover:shadow-black/30`
                      : `bg-white border-slate-200 ${card.borderHoverLight} hover:shadow-lg hover:shadow-slate-200/50`
                  }`}
                >
                  <div>
                    {/* Üst Satır: İkon & Rozet */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`p-2.5 rounded-xl transition-transform group-hover:scale-105 duration-200 ${
                        isDark ? `${card.iconBgDark} ${card.iconColorDark}` : `${card.iconBgLight} ${card.iconColorLight}`
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className={`text-[11px] font-semibold font-mono px-2.5 py-0.5 rounded-full border ${
                        isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {card.badge}
                      </span>
                    </div>

                    {/* Başlık ve Kategori */}
                    <div className="mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {card.category}
                      </span>
                      <h3 className={`text-base sm:text-lg font-bold transition-colors mt-0.5 ${
                        isDark ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                      }`}>
                        {card.title}
                      </h3>
                    </div>

                    {/* Kısa Açıklama */}
                    <p className={`text-xs leading-relaxed mb-4 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {card.shortDesc}
                    </p>

                    {/* Vurgu Hapları (Highlights) */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                        {card.highlightsHeader}
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {card.highlights.map((h, i) => (
                          <div
                            key={i}
                            className={`p-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-between ${h.bgClass} ${h.borderClass}`}
                          >
                            <span className="text-slate-500 dark:text-slate-400 text-[10px] truncate">{h.label}</span>
                            <span className={`font-mono font-bold text-[10px] ${h.colorClass} shrink-0 ml-1`}>{h.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Alt Eylem Çubuğu: Tıklayınca Açılma İpucu */}
                  <div className={`pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                    isDark ? 'border-slate-800 text-blue-400 group-hover:text-blue-300' : 'border-slate-100 text-blue-600 group-hover:text-blue-700'
                  }`}>
                    <span>Aracı Başlat &amp; Ayrıntıyı Gör</span>
                    <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Aç</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GÖRÜNÜM 2: AÇIK ARAÇ DETAYLARI (Tıklanınca Açılan Tam Görünüm) */}
      {activeToolId === 'mace' && (
        <MaceCalculator isDark={isDark} />
      )}

      {activeToolId === 'asa' && (
        <div className="space-y-4">
          <AsaClassification isDark={isDark} />
        </div>
      )}

    </div>
  );
};

export default PreoperativeEvaluation;
