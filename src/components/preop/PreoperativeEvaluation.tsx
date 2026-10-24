import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Heart, 
  ShieldAlert, 
  Coffee, 
  Wind, 
  ArrowLeft, 
  ChevronRight, 
  Sparkles,
  Info,
  Layers,
  BookOpen,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { MaceCalculator } from './MaceCalculator';
import { AsaClassification } from '../asa/AsaClassification';

interface PreoperativeEvaluationProps {
  isDark: boolean;
  initialTool?: 'mace' | 'asa' | 'fasting' | 'airway' | null;
}

type PreopToolId = 'mace' | 'asa' | 'fasting' | 'airway';

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
  },
  {
    id: 'fasting',
    title: 'Preoperatif Açlık Süreleri (ASA NPO Kılavuzu)',
    badge: '2-4-6-8 Saat Kuralı',
    category: 'Hasta Hazırlığı & Açlık',
    shortDesc: 'Elektif cerrahi öncesi pulmoner aspirasyon riskini minimize eden kanıta dayalı açlık süreleri, preoperatif sabah ilaçlarının yönetimi ve sakız çiğneme kuralları.',
    icon: Coffee,
    iconBgDark: 'bg-amber-500/15',
    iconBgLight: 'bg-amber-50',
    iconColorDark: 'text-amber-400',
    iconColorLight: 'text-amber-600',
    borderHoverDark: 'hover:border-amber-500/40',
    borderHoverLight: 'hover:border-amber-400',
    highlightsHeader: 'Temel Açlık Zamanları:',
    highlights: [
      { label: 'Berrak Sıvı', value: '2 Saat (Su/Çay/Kahve)', colorClass: 'text-sky-700 dark:text-sky-300', bgClass: 'bg-sky-500/10', borderClass: 'border-sky-500/30' },
      { label: 'Anne Sütü', value: '4 Saat (Bebek)', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Hafif Öğün', value: '6 Saat (Mama/Tost)', colorClass: 'text-indigo-700 dark:text-indigo-300', bgClass: 'bg-indigo-500/10', borderClass: 'border-indigo-500/30' },
      { label: 'Ağır/Yağlı', value: '8 Saat (Et/Kızartma)', colorClass: 'text-rose-700 dark:text-rose-300', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' }
    ]
  },
  {
    id: 'airway',
    title: 'Pre-op Havayolu Muayenesi & Mallampati',
    badge: 'Zor Havayolu Kriterleri',
    category: 'Havayolu Değerlendirmesi',
    shortDesc: 'Zor maske havalandırması ve zor laringoskopi/entübasyon fizik muayene prediktörleri; Mallampati Sınıf 1–4, tiromental mesafe, ağız açıklığı ve boyun mobilitesi.',
    icon: Wind,
    iconBgDark: 'bg-cyan-500/15',
    iconBgLight: 'bg-cyan-50',
    iconColorDark: 'text-cyan-400',
    iconColorLight: 'text-cyan-600',
    borderHoverDark: 'hover:border-cyan-500/40',
    borderHoverLight: 'hover:border-cyan-400',
    highlightsHeader: 'Kritik Eşik Değerler:',
    highlights: [
      { label: 'Mallampati', value: 'Sınıf 1 – 4', colorClass: 'text-teal-700 dark:text-teal-300', bgClass: 'bg-teal-500/10', borderClass: 'border-teal-500/30' },
      { label: 'Ağız Açıklığı', value: '< 3 cm (Zor)', colorClass: 'text-rose-700 dark:text-rose-300', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
      { label: 'Tiromental', value: '< 6 cm (Patil)', colorClass: 'text-amber-700 dark:text-amber-300', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Sternomental', value: '< 12.5 cm', colorClass: 'text-cyan-700 dark:text-cyan-300', bgClass: 'bg-cyan-500/10', borderClass: 'border-cyan-500/30' }
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

      {activeToolId === 'fasting' && (
        <div className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-500" />
                <span>ASA Preoperatif Açlık Kılavuzu (NPO Kuralları)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Elektif cerrahi öncesi pulmoner aspirasyon riskini minimize eden kanıta dayalı açlık süreleri
              </p>
            </div>
            <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg border self-start sm:self-auto ${
              isDark ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              ASA Güncel Konsensüsü
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 2 Saat */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 font-mono">2 SAAT</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-sky-500/15 text-sky-700 dark:text-sky-300">Minimum</span>
                </div>
                <h4 className="text-xs font-bold mb-1">Berrak Sıvılar</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Su, posasız elma/üzüm suyu, berrak çay, sade filtre kahve (süt/krema İÇERMEYEN), berrak karbonhidratlı solüsyonlar.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400">
                ⚠️ Alkol ve partiküllü sıvılar yasaktır.
              </div>
            </div>

            {/* 4 Saat */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">4 SAAT</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">Pediatrik</span>
                </div>
                <h4 className="text-xs font-bold mb-1">Anne Sütü</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Yalnızca doğal anne sütü alan yenidoğan ve bebekler içindir. Mide boşalması inek sütü ve mamaya göre belirgin hızlıdır.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400">
                🍼 Ek mama katılmamış olmalıdır.
              </div>
            </div>

            {/* 6 Saat */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">6 SAAT</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">Hafif Gıda</span>
                </div>
                <h4 className="text-xs font-bold mb-1">Mama, Süt &amp; Hafif Öğün</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Bebek maması, inek sütü veya hafif kahvaltı (tost, bisküvi, reçel gibi yağsız/etsiz hafif gıdalar).
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400">
                🥛 Sütlü kahveler bu grupta sayılır.
              </div>
            </div>

            {/* 8 Saat */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">8 SAAT</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">Ağır Öğün</span>
                </div>
                <h4 className="text-xs font-bold mb-1">Katı / Yağlı / Etli Yemekler</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Kızartmalar, yağlı besinler, kırmızı et veya tam porsiyon standart akşam yemekleri. Mide boşalması belirgin uzar.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400">
                🥩 Yağ oranı arttıkça süre uzatılmalıdır.
              </div>
            </div>
          </div>

          {/* Özel Kurallar Notu */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-blue-50/70 border-blue-200 text-blue-950'
          }`}>
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold">Özel Durumlar (İlaç Alımı, Sakız ve Sigara):</div>
              <p className="leading-relaxed">
                • <strong>Sabah İlaçları:</strong> Antihipertansifler (Beta-bloker, KKB) ve tiroid hormon ilaçları cerrahiden 1–2 saat önce bir yudum su (en fazla 30 cc) ile alınabilir. ACE inhibitörleri / ARB'ler genellikle indüksiyonda dirençli hipotansiyonu önlemek için sabah kesilir.<br />
                • <strong>Sakız Çiğneme:</strong> ASA kılavuzuna göre şekersiz sakız çiğnenmesi elektif cerrahinin iptal edilmesini gerektirmez, operasyon öncesi tükürülmesi istenir.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeToolId === 'airway' && (
        <div className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Wind className="w-5 h-5 text-cyan-500" />
                <span>Preoperatif Havayolu Muayenesi &amp; Kriterler</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Zor maske havalandırması ve zor laringoskopi/entübasyon fizik muayene belirteçleri
              </p>
            </div>
            <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg border self-start sm:self-auto ${
              isDark ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' : 'bg-cyan-50 text-cyan-800 border-cyan-200'
            }`}>
              Fizik Muayene
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mallampati Kartı */}
            <div className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className="text-xs font-bold mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span>Mallampati Sınıflaması (Hasta Oturur, Dil Dışarıda, Fonasyon Yok)</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Sınıf 1:</span> Yumuşak damak, uvula, plikalar ve farenks arka duvarı tam görünür.
                </div>
                <div className="p-2.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-teal-600 dark:text-teal-400">Sınıf 2:</span> Yumuşak damak, uvula ve farenks arka duvarı kısmen görünür; tonsil plikaları uvula arkasında kalır.
                </div>
                <div className="p-2.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-amber-600 dark:text-amber-400">Sınıf 3:</span> Yalnızca yumuşak damak ve uvula tabanı görünür (Zor havayolu kuşkusu).
                </div>
                <div className="p-2.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-rose-600 dark:text-rose-400">Sınıf 4:</span> Yumuşak damak dahi görünmez; yalnızca sert damak seçilebilir (Yüksek zor entübasyon riski).
                </div>
              </div>
            </div>

            {/* Anatomik Ölçümler */}
            <div className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className="text-xs font-bold mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Kritik Anatomik Eşik Değerler</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold">İnterinsizör Mesafe (Ağız Açıklığı):</span>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">3 parmak genişliği</div>
                  </div>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">&lt; 3.0 cm (Zor)</span>
                </div>

                <div className="p-2.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold">Tiromental Mesafe (Patil Testi):</span>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Tiroid çentik ile çene ucu arası</div>
                  </div>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">&lt; 6.0 cm (Zor)</span>
                </div>

                <div className="p-2.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold">Sternomental Mesafe:</span>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Sternum manubriumu ile çene ucu</div>
                  </div>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">&lt; 12.5 cm (Zor)</span>
                </div>

                <div className="p-2.5 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold">Boyun Ekstansiyonu:</span>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Atlanto-oksipital eklem hareket kısıtlılığı</div>
                  </div>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">&lt; 35° (Zor)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PreoperativeEvaluation;
