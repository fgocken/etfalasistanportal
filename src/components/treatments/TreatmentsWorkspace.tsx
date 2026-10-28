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
import { SodiumCalculator, SodiumReferencesAccordion } from './SodiumCalculator';
import { HyponatremiaInfographic } from './HyponatremiaInfographic';
import { DexmedetomidineProtocol } from './DexmedetomidineProtocol';
import { RemifentanilProtocol } from './RemifentanilProtocol';
import { FentanylProtocol } from './FentanylProtocol';
import { PropofolProtocol } from './PropofolProtocol';

interface Props {
  isDark: boolean;
  initialProtocolId?: string | null;
}

type TreatmentCategory = 'medications' | 'electrolyte' | 'vasoactive' | 'sedation' | 'hemostasis';
type MagnesiumViewMode = 'all' | 'calc' | 'infographic';
type PotassiumViewMode = 'all' | 'calc' | 'infographic';
type SodiumViewMode = 'all' | 'calc' | 'infographic';

interface ProtocolCardItem {
  id: string;
  category: TreatmentCategory;
  categories?: TreatmentCategory[];
  categoryLabel: string;
  badge: string;
  title: string;
  shortDesc: string;
  status: 'active' | 'upcoming';
  accentColor: 'teal' | 'cyan' | 'purple' | 'rose';
  highlightsHeader: string;
  highlights: { 
    label: string; 
    value: string; 
    subtext?: string;
    colorClass: string; 
    bgClass: string; 
    borderClass: string;
  }[];
}

const PROTOCOL_CARDS: ProtocolCardItem[] = [
  {
    id: 'magnesium',
    category: 'electrolyte',
    categories: ['electrolyte'],
    categoryLabel: 'Elektrolit Replasmanı',
    badge: 'Mathews et al. 2022',
    title: 'Magnezyum Sülfat (MgSO₄) Replasmanı ve Hipomagnezemi',
    shortDesc: 'Yoğun bakım prospektif verilerine göre eGFR kademeli hedef serum dozu, Türkiye standart 10 mL %15 ampul hesabı, damar yolu flebit güvenliği ve EKG/semptom kartları.',
    status: 'active',
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'Ampul İçeriği', 
        value: '10 mL %15 (1.5 g)', 
        subtext: '~12.2 mEq Mg²⁺ / ampul',
        colorClass: 'text-emerald-700 dark:text-emerald-300', 
        bgClass: 'bg-emerald-500/10', 
        borderClass: 'border-emerald-500/30' 
      },
      { 
        label: 'Klinik Hedef Düzey', 
        value: '2.0 – 2.5 mg/dL', 
        subtext: 'Aritmi & YB hedef aralığı',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'Maks İnfüzyon Hızı', 
        value: '≤ 1.0 g / saat', 
        subtext: 'Rutin replasman (≥1.5 sa/amp)',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      },
      { 
        label: 'Periferik Sınır', 
        value: '≤ %2.0 Derişim', 
        subtext: '100 mL torbaya maks 1 ampul',
        colorClass: 'text-cyan-700 dark:text-cyan-300', 
        bgClass: 'bg-cyan-500/10', 
        borderClass: 'border-cyan-500/30' 
      }
    ]
  },
  {
    id: 'potassium',
    category: 'electrolyte',
    categories: ['electrolyte'],
    categoryLabel: 'Elektrolit Replasmanı',
    badge: '%7.5 KCl & Kaliphos',
    title: 'Potasyum & Kaliphos (Potasyum Fosfat) Replasmanı',
    shortDesc: '%7.5 KCl (10 mL = 10 mEq) ve Kaliphos (10 mL = 30 mEq K⁺ + 60 mEq Fosfat) ampul hesabı, periferik/SVK derişim sınırları, infüzyon hızı ve EKG bulguları.',
    status: 'active',
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'Standart Ampuller', 
        value: 'KCl: 10 mEq · K-Fos: 30 mEq', 
        subtext: '10 mL ampul K⁺ içerikleri',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'Klinik Hedef Düzey', 
        value: '4.0 – 4.5 mEq/L', 
        subtext: 'Kardiyak membran stabilitesi',
        colorClass: 'text-emerald-700 dark:text-emerald-300', 
        bgClass: 'bg-emerald-500/10', 
        borderClass: 'border-emerald-500/30' 
      },
      { 
        label: 'Periferik Damar Yolu', 
        value: '≤ 40 mEq/L · ≤ 10 mEq/sa', 
        subtext: 'Flebit & venöz ağrı tavanı',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      },
      { 
        label: 'SVK / Santral Güvenlik', 
        value: 'Maks ≤ 20 mEq/saat', 
        subtext: 'Monitörizasyon & infüzyon pompası',
        colorClass: 'text-indigo-700 dark:text-indigo-300', 
        bgClass: 'bg-indigo-500/10', 
        borderClass: 'border-indigo-500/30' 
      }
    ]
  },
  {
    id: 'sodium',
    category: 'electrolyte',
    categories: ['electrolyte'],
    categoryLabel: 'Elektrolit Replasmanı',
    badge: 'Adrogué-Madias & MDCalc',
    title: 'Sodyum Bozuklukları (Hiponatremi & Hipernatremi Protokolü)',
    shortDesc: 'Adrogué-Madias formülüyle hipertonik/hipotonik sıvı hesabı, saatlik debi, Serbest Su Açığı, Glukoz düzeltmeli Na, ODS ve Serebral Ödem koruma eşikleri.',
    status: 'active',
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'Hiponatremi 24 Sa Sınırı', 
        value: 'Maks 6–8 mEq/L / 24 sa', 
        subtext: 'ODS koruma (yüksek riskte 4-6)',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'Hipernatremi Düşüş Hızı', 
        value: 'Maks 10–12 mEq/L / 24 sa', 
        subtext: 'Serebral ödem koruma (≤0.5/sa)',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      },
      { 
        label: 'Akut Şiddetli Semptom', 
        value: '100–150 mL %3 NaCl', 
        subtext: '10–20 dk IV bolus (nöbet/koma)',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      },
      { 
        label: 'Referans Sıvı Katyonları', 
        value: '%3: 513 mEq · D5W: 0 mEq', 
        subtext: 'Hipertonik SF vs Saf serbest su',
        colorClass: 'text-cyan-700 dark:text-cyan-300', 
        bgClass: 'bg-cyan-500/10', 
        borderClass: 'border-cyan-500/30' 
      }
    ]
  },
  {
    id: 'dexmedetomidine',
    category: 'medications',
    categories: ['medications', 'sedation'],
    categoryLabel: 'İlaç Monografisi & Sedoanaljezi',
    badge: 'Precedex · Alfa-2 Agonist',
    title: 'Deksmedetomidin',
    shortDesc: 'Uyanabilir kooperatif sedasyon (RASS -1/-2), mekanik ventilasyon, deliryum kontrolü ve weaning için 13 basamaklı altın standart ilaç monografisi ve infüzyon pompası hesaplayıcısı.',
    status: 'active',
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'YBÜ İdame Doz Aralığı', 
        value: '0.2 – 1.4 mcg/kg/sa', 
        subtext: 'RASS -1 / -2 kooperatif sedasyon',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'Standart Çözelti', 
        value: '4 mcg/mL (200 mcg / 50 mL)', 
        subtext: 'Hazır flakon veya SF/D5W seyreltme',
        colorClass: 'text-cyan-700 dark:text-cyan-300', 
        bgClass: 'bg-cyan-500/10', 
        borderClass: 'border-cyan-500/30' 
      },
      { 
        label: 'Solunum Güvenliği', 
        value: 'Solunum Depresyonu Yok', 
        subtext: 'Spontan solunumu & weaningi korur',
        colorClass: 'text-emerald-700 dark:text-emerald-300', 
        bgClass: 'bg-emerald-500/10', 
        borderClass: 'border-emerald-500/30' 
      },
      { 
        label: 'Kardiyovasküler Limit', 
        value: 'Bradikardi & Hipotansiyon', 
        subtext: 'KTA < 50 veya MAP < 60 mmHg izlemi',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      }
    ]
  },
  {
    id: 'remifentanil',
    category: 'medications',
    categories: ['medications', 'sedation'],
    categoryLabel: 'İlaç Monografisi & Sedoanaljezi',
    badge: 'Ultiva · Ultra-Kısa Opioid',
    title: 'Remifentanil',
    shortDesc: 'Organ-bağımsız esteraz metabolizması, 3-4 dk sabit bağlam duyarlı yarı ömür, anestezi ve YBÜ analgosedasyonu için 13 basamaklı altın standart ilaç monografisi ve infüzyon pompası hesaplayıcısı.',
    status: 'active',
    accentColor: 'rose',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'İdame Doz Aralığı', 
        value: '0.05 – 0.5 mcg/kg/dk', 
        subtext: 'Cerrahi idame & analgosedasyon',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      },
      { 
        label: 'Standart Çözelti', 
        value: '20 – 40 mcg/mL', 
        subtext: '1–2 mg / 50 mL SF veya D5W',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'Eliminasyon Yolağı', 
        value: 'Doku & Plazma Esterazları', 
        subtext: 'Karaciğer/böbrek yetmezliğinden bağımsız',
        colorClass: 'text-indigo-700 dark:text-indigo-300', 
        bgClass: 'bg-indigo-500/10', 
        borderClass: 'border-indigo-500/30' 
      },
      { 
        label: 'Bağlam Duyarlı t½', 
        value: '3 – 4 Dakika (Sabit)', 
        subtext: 'Akümülasyon yapmaz, anında uyanma',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      }
    ]
  },
  {
    id: 'fentanyl',
    category: 'medications',
    categories: ['medications', 'sedation'],
    categoryLabel: 'İlaç Monografisi & Sedoanaljezi',
    badge: 'Sublimaze · Sentetik Opioid',
    title: 'Fentanil',
    shortDesc: 'Yüksek potensli lipofilik μ-agonist, CYP3A4 metabolizması, kümülasyon sayacı, cerrahi ve YBÜ analgosedasyonu için 13 basamaklı altın standart ilaç monografisi ve infüzyon pompası hesaplayıcısı.',
    status: 'active',
    accentColor: 'purple',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'YBÜ İdame Dozu', 
        value: '0.7 – 2.0 mcg/kg/saat', 
        subtext: '25 – 150 mcg/saat (CPOT/BPS hedefli)',
        colorClass: 'text-purple-700 dark:text-purple-300', 
        bgClass: 'bg-purple-500/10', 
        borderClass: 'border-purple-500/30' 
      },
      { 
        label: 'Standart Çözelti', 
        value: '10 – 20 mcg/mL', 
        subtext: '500–1000 mcg / 50 mL SF veya D5W',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'Eliminasyon Yolağı', 
        value: 'Hepatik CYP3A4 (İnaktif)', 
        subtext: 'Norfentanil oluşur; böbreğe güvenli',
        colorClass: 'text-indigo-700 dark:text-indigo-300', 
        bgClass: 'bg-indigo-500/10', 
        borderClass: 'border-indigo-500/30' 
      },
      { 
        label: 'Bağlam Duyarlı t½', 
        value: '30 dk ➔ 300 dk!', 
        subtext: 'Uzayan infüzyonda yağda kümülasyon',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      }
    ]
  },
  {
    id: 'propofol',
    category: 'medications',
    categories: ['medications', 'sedation'],
    categoryLabel: 'İlaç Monografisi & Sedoanaljezi',
    badge: 'Diprivan · GABA-A Hipnotik',
    title: 'Propofol',
    shortDesc: 'Genel anestezi indüksiyonu ve idamesi (TIVA), YBÜ sedasyonu, PRIS risk monitörizasyonu ve 24 saatlik lipid kalori yönetimi için 13 basamaklı altın standart ilaç monografisi.',
    status: 'active',
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'YBÜ İdame Dozu', 
        value: '0.3 – 3.0 mg/kg/sa', 
        subtext: 'RASS -1 / -2; PRIS tavanı ≤ 4.0',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'Formülasyonlar', 
        value: '%1 (10 mg/mL) & %2', 
        subtext: '1.1 kcal / mL lipid enerji yükü',
        colorClass: 'text-cyan-700 dark:text-cyan-300', 
        bgClass: 'bg-cyan-500/10', 
        borderClass: 'border-cyan-500/30' 
      },
      { 
        label: 'İndüksiyon Dozu', 
        value: '1.5 – 2.5 mg/kg IV', 
        subtext: 'Yaşlıda 0.8–1.5; Obezitede LBW!',
        colorClass: 'text-indigo-700 dark:text-indigo-300', 
        bgClass: 'bg-indigo-500/10', 
        borderClass: 'border-indigo-500/30' 
      },
      { 
        label: 'Kritik Güvenlik', 
        value: '12 Saatlik Flakon Kuralı', 
        subtext: 'Koruyucusuz lipid; asepsi şart',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      }
    ]
  }
];

export const TreatmentsWorkspace: React.FC<Props> = ({ isDark, initialProtocolId }) => {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('medications');
  // null = kartlar galerisi, 'magnesium', 'potassium', 'sodium', 'dexmedetomidine', 'remifentanil', 'fentanyl'
  const [activeProtocolId, setActiveProtocolId] = useState<string | null>(initialProtocolId || null);
  const [mgViewMode, setMgViewMode] = useState<MagnesiumViewMode>('all');
  const [kViewMode, setKViewMode] = useState<PotassiumViewMode>('all');
  const [naViewMode, setNaViewMode] = useState<SodiumViewMode>('all');

  const filteredCards = PROTOCOL_CARDS.filter(card => {
    if (card.categories && card.categories.length > 0) {
      return card.categories.includes(activeCategory);
    }
    return card.category === activeCategory;
  });
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
          <div className="flex flex-wrap items-center gap-2 pt-3">
            {/* 1. İlaçlar (Yeni Eklenen Bölüm) */}
            <button
              type="button"
              onClick={() => setActiveCategory('medications')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'medications'
                  ? isDark 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-xs' 
                    : 'bg-rose-50 text-rose-800 border border-rose-400 shadow-xs'
                  : isDark 
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Pill className="w-3.5 h-3.5 text-rose-500" />
              <span>İlaçlar (Monografiler)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-mono">
                4 İlaç
              </span>
            </button>

            {/* 2. Sedoanaljezi & Nöromüsküler */}
            <button
              type="button"
              onClick={() => setActiveCategory('sedation')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-600 dark:text-purple-400 font-mono">
                4 İlaç
              </span>
            </button>

            {/* 3. Elektrolit & Sıvı Replasmanı */}
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
                3 Protokol
              </span>
            </button>

            {/* 4. İnfüzyon & Vazoaktif Protokolleri */}
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

            {/* 5. Hemostaz & Kan Transfüzyon Yönetimi */}
            <button
              type="button"
              onClick={() => setActiveCategory('hemostasis')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer opacity-85 hover:opacity-100 ${
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
              <span>Hemostaz &amp; Kan Transfüzyon Yönetimi</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-sans">
                Modüler
              </span>
            </button>
          </div>
        )}
      </div>

      {/* GÖRÜNÜM 1: PROTOKOL KARTLARI GALERİSİ (activeProtocolId === null) */}
      {!activeProtocolId && filteredCards.length > 0 && (
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
                      <div className="text-[10px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-teal-500" />
                          <span>{card.highlightsHeader}</span>
                        </span>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono font-medium">4 Temel Eşik</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {card.highlights.map((h, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded-lg border flex flex-col justify-between text-left transition-colors ${h.bgClass} ${h.borderClass}`}
                          >
                            <div>
                              <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase">
                                {h.label}
                              </span>
                              <span className={`block text-[10.5px] font-bold font-mono mt-0.5 leading-tight ${h.colorClass}`}>
                                {h.value}
                              </span>
                            </div>
                            {h.subtext && (
                              <span className="block text-[8.5px] text-slate-400 dark:text-slate-400 mt-1 leading-tight font-sans">
                                {h.subtext}
                              </span>
                            )}
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

      {/* GÖRÜNÜM 2C: SEÇİLİ PROTOKOLÜN DETAYI (activeProtocolId === 'sodium') */}
      {activeProtocolId === 'sodium' && (
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
                onClick={() => setNaViewMode('all')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  naViewMode === 'all'
                    ? isDark ? 'bg-slate-800 text-teal-400 font-bold shadow-xs' : 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Tam Görünüm (Tümü)
              </button>
              <button
                type="button"
                onClick={() => setNaViewMode('calc')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  naViewMode === 'calc'
                    ? isDark ? 'bg-slate-800 text-teal-400 font-bold shadow-xs' : 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Hesaplayıcı &amp; Protokol
              </button>
              <button
                type="button"
                onClick={() => setNaViewMode('infographic')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  naViewMode === 'infographic'
                    ? isDark ? 'bg-slate-800 text-teal-400 font-bold shadow-xs' : 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Klinik &amp; İnfografik Rehberi (Hipo/Hiper)
              </button>
            </div>
          </div>

          {/* 1. Sodyum Hesaplayıcısı */}
          {(naViewMode === 'all' || naViewMode === 'calc') && (
            <SodiumCalculator isDark={isDark} hideReferences />
          )}

          {/* 2. Sodyum Bozuklukları Klinik Bulguları ve Algoritmaları (YUKARI ALINDI) */}
          {(naViewMode === 'all' || naViewMode === 'infographic') && (
            <HyponatremiaInfographic isDark={isDark} />
          )}

          {/* 3. Klinik Kılavuzlar ve Kanıta Dayalı Kaynakça (EN AŞAĞIYA ALINDI) */}
          {(naViewMode === 'all' || naViewMode === 'calc') && (
            <SodiumReferencesAccordion isDark={isDark} />
          )}
        </div>
      )}

      {/* GÖRÜNÜM 5: DEKSMEDETOMİDİN PROTOKOLÜ VE DOZ HESAPLAYICISI (activeProtocolId === 'dexmedetomidine') */}
      {activeProtocolId === 'dexmedetomidine' && (
        <DexmedetomidineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 6: REMİFENTANİL PROTOKOLÜ VE DOZ HESAPLAYICISI (activeProtocolId === 'remifentanil') */}
      {activeProtocolId === 'remifentanil' && (
        <RemifentanilProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 7: FENTANİL PROTOKOLÜ VE DOZ HESAPLAYICISI (activeProtocolId === 'fentanyl') */}
      {activeProtocolId === 'fentanyl' && (
        <FentanylProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 8: PROPOFOL PROTOKOLÜ VE DOZ HESAPLAYICISI (activeProtocolId === 'propofol') */}
      {activeProtocolId === 'propofol' && (
        <PropofolProtocol isDark={isDark} />
      )}

      {/* HENÜZ PROTOKOL EKLENMEMİŞ DİĞER KATEGORİLER İÇİN MODÜLER GÖRÜNÜM */}
      {!activeProtocolId && filteredCards.length === 0 && (
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
            onClick={() => setActiveCategory('medications')}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer transition-colors"
          >
            İlaçlar Bölümüne Dön
          </button>
        </div>
      )}
    </div>
  );
};
