import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  FlaskConical, 
  Activity, 
  Syringe, 
  Brain, 
  Droplet, 
  Droplets,
  Zap, 
  Layers, 
  Sparkles, 
  BookOpen,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Wind
} from 'lucide-react';
import { parseHashRoute, updateHashRoute } from '../../utils/deepLink';
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
import { MidazolamProtocol } from './MidazolamProtocol';
import { LidocaineProtocol } from './LidocaineProtocol';
import { KetamineProtocol } from './KetamineProtocol';
import { NorepinephrineProtocol } from './NorepinephrineProtocol';
import { EpinephrineProtocol } from './EpinephrineProtocol';
import { SevofluraneProtocol } from './SevofluraneProtocol';
import { DesfluraneProtocol } from './DesfluraneProtocol';
import { AcetazolamideProtocol } from './AcetazolamideProtocol';
import { FurosemideProtocol } from './FurosemideProtocol';
import { AtropineProtocol } from './AtropineProtocol';
import { EphedrineProtocol } from './EphedrineProtocol';
import { NaloxoneProtocol } from './NaloxoneProtocol';
import { FlumazenilProtocol } from './FlumazenilProtocol';
import { DopamineProtocol } from './DopamineProtocol';
import { DobutamineProtocol } from './DobutamineProtocol';
import { SugammadexProtocol } from './SugammadexProtocol';
import { HydrocortisoneProtocol } from './HydrocortisoneProtocol';
import { DexamethasoneProtocol } from './DexamethasoneProtocol';
import { MethylprednisoloneProtocol } from './MethylprednisoloneProtocol';
import { ThiopentalProtocol } from './ThiopentalProtocol';
import { TranexamicAcidProtocol } from './TranexamicAcidProtocol';
import { EsmololProtocol } from './EsmololProtocol';
import { NicardipineProtocol } from './NicardipineProtocol';
import { GlycerylTrinitrateProtocol } from './GlycerylTrinitrateProtocol';
import { SodiumNitroprussideProtocol } from './SodiumNitroprussideProtocol';
import { PheniramineProtocol } from './PheniramineProtocol';
import { PantoprazoleProtocol } from './PantoprazoleProtocol';
import { AntimicrobialMonographView } from './AntimicrobialMonographView';
import { ALL_ANTIMICROBIALS, ANTIMICROBIAL_ALIAS_MAP, ANTIMICROBIAL_MAP } from '../../data/antimicrobials';

interface Props {
  isDark: boolean;
  initialProtocolId?: string | null;
}

type TreatmentCategory = 'medications' | 'general_anesthetics' | 'antihypertensives' | 'antibiotics' | 'sedation' | 'antidotes' | 'diuretics' | 'electrolyte' | 'vasoactive' | 'hemostasis';
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
  hasStandaloneHeader?: boolean;
  accentColor: 'teal' | 'cyan' | 'purple' | 'rose';
  highlightsHeader: string;
  highlights: { 
    label: string; 
    value: string; 
    subtext?: string;
    tooltip?: string;
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
    categoryLabel: 'Sedoanaljezi',
    badge: 'Precedex · Alfa-2 Agonist',
    title: 'Deksmedetomidin',
    shortDesc: 'Uyanabilir kooperatif sedasyon (RASS -1/-2), mekanik ventilasyon, deliryum kontrolü ve weaning için altın standart ilaç monografisi ve infüzyon pompası hesaplayıcısı.',
    status: 'active',
    hasStandaloneHeader: true,
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
    categoryLabel: 'Sedoanaljezi',
    badge: 'Ultiva · Ultra-Kısa Opioid',
    title: 'Remifentanil',
    shortDesc: 'Organ-bağımsız esteraz metabolizması, 3-4 dk sabit bağlam duyarlı yarı ömür, anestezi ve YBÜ analgosedasyonu için altın standart ilaç monografisi ve infüzyon pompası hesaplayıcısı.',
    status: 'active',
    hasStandaloneHeader: true,
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
    categoryLabel: 'Sedoanaljezi',
    badge: 'TALINAT · FENTAVER · DUROGESIC',
    title: 'Fentanil',
    shortDesc: 'Yüksek potensli lipofilik μ-agonist, CYP3A4 metabolizması, kümülasyon sayacı, cerrahi ve YBÜ analgosedasyonu için altın standart ilaç monografisi ve infüzyon pompası hesaplayıcısı.',
    status: 'active',
    hasStandaloneHeader: true,
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
    categories: ['medications', 'general_anesthetics', 'sedation'],
    categoryLabel: 'Genel Anestezik / Sedoanaljezi',
    badge: 'Diprivan · GABA-A Hipnotik',
    title: 'Propofol',
    shortDesc: 'Genel anestezi indüksiyonu ve idamesi (TIVA), YBÜ sedasyonu, PRIS risk monitörizasyonu ve 24 saatlik lipid kalori yönetimi için altın standart ilaç monografisi.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'YBÜ İdame Dozu', 
        value: '0.3 – 3.0 mg/kg/sa', 
        subtext: 'RASS -1 / -2; PRIS tavanı ≤ 4.0',
        tooltip: '0.3 – 3.0 mg/kg/saat = 5.0 – 50.0 mcg/kg/dk (PRIS tavanı: ≤ 66.7 mcg/kg/dk)',
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
  },
  {
    id: 'midazolam',
    category: 'medications',
    categories: ['medications', 'sedation'],
    categoryLabel: 'Sedoanaljezi',
    badge: 'Dormicum · Benzodiazepin',
    title: 'Midazolam',
    shortDesc: 'Suda çözünür imidazobenzodiazepin; akut nöbet (IM/IN/IV), akut ciddi ajitasyon, sempatomimetik intoksikasyonlar, alkol yoksunluğu / DT, YBÜ sedasyon infüzyonu ve flumazenil antidot takibi için altın standart ilaç monografisi.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'purple',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'YBÜ İdame Dozu', 
        value: '0.02 – 0.10 mg/kg/sa', 
        subtext: 'RASS -1/-2; 1 – 7 mg/saat',
        tooltip: '0.02 – 0.10 mg/kg/saat = 1.4 – 7.0 mg/saat (70 kg için; Maks: ≤ 14 mg/saat)',
        colorClass: 'text-purple-700 dark:text-purple-300', 
        bgClass: 'bg-purple-500/10', 
        borderClass: 'border-purple-500/30' 
      },
      { 
        label: 'Akut Nöbet (IM/IN)', 
        value: '10 mg IM / 0.2 mg/kg IN', 
        subtext: 'Hastane öncesi acil 1. basamak',
        tooltip: 'Damar yolu yoksa 10 mg IM (erişkin) veya 0.2 mg/kg İntranazal MAD',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      },
      { 
        label: 'Spesifik Antidot', 
        value: 'Flumazenil (Anexate)', 
        subtext: '0.2 mg IV yavaş (Re-sedasyon uyarısı!)',
        tooltip: 'Flumazenil t½ (50 dk) < Midazolam t½ (2 saat); re-sedasyon riski!',
        colorClass: 'text-emerald-700 dark:text-emerald-300', 
        bgClass: 'bg-emerald-500/10', 
        borderClass: 'border-emerald-500/30' 
      },
      { 
        label: 'Eliminasyon & Kümülasyon', 
        value: 'CYP3A4 & Renal 1-OH', 
        subtext: 'Böbrek yetmezliğinde aktif metabolit birikir',
        tooltip: '1-OH-midazolam glukuronid böbrekle atılır; renal yetmezlikte sedasyon uzar',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      }
    ]
  },
  {
    id: 'lidocaine',
    category: 'medications',
    categories: ['medications'],
    categoryLabel: 'Lokal / Antiaritmik',
    badge: 'Aritmal · Jetokain · Sınıf Ib',
    title: 'Lidokain',
    shortDesc: 'Amid yapılı prototip lokal anestezik ve Sınıf Ib antiaritmik; lokal infiltrasyon, sinir blokları, RSI KİB premedikasyonu, perioperatif IV analjezi, ACLS VF/VT resüsitasyonu ve ASRA LAST İntralipid kurtarma için altın standart ilaç monografisi.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'cyan',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'Maks Doz (Saf)', 
        value: '4.5 mg/kg', 
        subtext: 'Maksimum tavan: 300 mg',
        tooltip: '70 kg için maksimum 300 mg (30 mL %1 veya 15 mL %2)',
        colorClass: 'text-blue-700 dark:text-blue-300', 
        bgClass: 'bg-blue-500/10', 
        borderClass: 'border-blue-500/30' 
      },
      { 
        label: 'Maks Doz (+Adrenalin)', 
        value: '7.0 mg/kg', 
        subtext: '1:200k Adrenalin; Maks: 500 mg',
        tooltip: 'Vazokonstriksiyon ile sistemik emilim yavaşlar; 70 kg için maksimum 500 mg (50 mL %1)',
        colorClass: 'text-emerald-700 dark:text-emerald-300', 
        bgClass: 'bg-emerald-500/10', 
        borderClass: 'border-emerald-500/30' 
      },
      { 
        label: 'ACLS Arrest (VF/pVT)', 
        value: '1.0 – 1.5 mg/kg', 
        subtext: 'Ek doz: 0.5–0.75; Maks: 3 mg/kg',
        tooltip: '3. şok sonrası refrakter VF/pVT için IV/IO bolus; Amiodaron alternatifi',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      },
      { 
        label: 'Spesifik Antidot (LAST)', 
        value: '%20 İntralipid', 
        subtext: '1.5 mL/kg bolus + 0.25 mL/kg/dk',
        tooltip: 'ASRA LAST Kurtarma Kılavuzu: 1 dakikada 1.5 mL/kg IV bolus + 15 mL/kg/saat infüzyon',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      }
    ]
  },
  {
    id: 'ketamine',
    category: 'medications',
    categories: ['medications', 'general_anesthetics', 'sedation'],
    categoryLabel: 'Genel Anestezik / Sedoanaljezi',
    badge: 'Ketalar · NMDA Antagonisti',
    title: 'Ketamin',
    shortDesc: 'NMDA reseptör blokajı ile disosiyatif anestezi ve analjezi; RSI şok indüksiyonu, Ketofol protokolü, akut ağrı sub-dissosiyatif dozu, refrakter bronkospazm, deliryum yönetimi ve YBÜ infüzyonu için altın standart ilaç monografisi.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'purple',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'RSI İndüksiyon (Şok/Astım)', 
        value: '1.5 – 2.0 mg/kg IV', 
        subtext: 'Şokta 1.0–1.2 mg/kg; Solunum (+)',
        tooltip: 'Hemodinamik şok, travma ve ağır astım krizinde birinci tercih indüksiyon ajanı',
        colorClass: 'text-indigo-700 dark:text-indigo-300', 
        bgClass: 'bg-indigo-500/10', 
        borderClass: 'border-indigo-500/30' 
      },
      { 
        label: 'Sub-dissosiyatif Ağrı', 
        value: '0.15 – 0.30 mg/kg', 
        subtext: 'Opioid koruyucu; 15 dk infüzyon',
        tooltip: 'Kortikal dissosiasyon yaratmadan derin analjezi; disfori yapmaz',
        colorClass: 'text-emerald-700 dark:text-emerald-300', 
        bgClass: 'bg-emerald-500/10', 
        borderClass: 'border-emerald-500/30' 
      },
      { 
        label: 'Ketofol Kombinasyonu', 
        value: '1:1 veya 1:4 Oranı', 
        subtext: 'Propofol ile kombine; stabil',
        tooltip: 'Propofolün hipotansiyon ve apnesini, ketaminin deliryumunu dengeler',
        colorClass: 'text-purple-700 dark:text-purple-300', 
        bgClass: 'bg-purple-500/10', 
        borderClass: 'border-purple-500/30' 
      },
      { 
        label: 'Acil Sedasyon (IM)', 
        value: '4.0 – 5.0 mg/kg IM', 
        subtext: 'Damar yolu yoksa 3-5 dk etki',
        tooltip: 'Excited delirium ve şiddetli ajitasyonda hızlı ve güvenli kimyasal kısıtlama',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      }
    ]
  },
  {
    id: 'norepinephrine',
    category: 'vasoactive',
    categories: ['vasoactive', 'medications'],
    categoryLabel: 'Vazopressör / Şok',
    badge: 'Levophed · 1. Tercih Vazopressör',
    title: 'Noradrenalin (Norepinefrin)',
    shortDesc: 'Septik şok (Surviving Sepsis 1A), vazodilatatuar şok, kardiyojenik şok, perioperatif vazopleji, Push-Dose bolus protokolü, Fentolamin ekstravazasyon antidot yönetimi için altın standart ilaç monografisi ve infüzyon pompası hesaplayıcısı.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'rose',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'Standart Ampul', 
        value: '4 mg / 4 mL (1 mg/mL)', 
        subtext: 'Norepinefrin baz ampul',
        tooltip: '1 ampul = 4 mg baz norepinefrin içerir (bitartrat tuzu formu)',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      },
      { 
        label: 'İdame Doz Aralığı', 
        value: '0.05 – 0.25 mcg/kg/dk', 
        subtext: '4 – 18 mcg/dk · MAP ≥ 65',
        tooltip: 'Hedef MAP ≥ 65 mmHg olacak şekilde her 2–5 dakikada titre edilir',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'Standart Çözelti', 
        value: '80 mcg/mL (4 mg / 50 mL)', 
        subtext: '%5 Dextroz (tercih) veya SF',
        tooltip: '%5 Dextroz (D5W) katekolamin oksidasyonunu önler ve stabilite sağlar',
        colorClass: 'text-cyan-700 dark:text-cyan-300', 
        bgClass: 'bg-cyan-500/10', 
        borderClass: 'border-cyan-500/30' 
      },
      { 
        label: 'Vazopressin Eşiği', 
        value: '> 0.25 mcg/kg/dk', 
        subtext: '2. ajan: Vazopressin + Steroid',
        tooltip: 'Surviving Sepsis Kılavuzu: >0.25 mcg/kg/dk aşılınca Vazopressin 0.03 U/dk ve Hidrokortizon eklenmelidir',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      }
    ]
  },
  {
    id: 'epinephrine',
    category: 'vasoactive',
    categories: ['vasoactive', 'medications'],
    categoryLabel: 'İnopressör / Acil Resüsitasyon',
    badge: 'ACLS · Anafilaksi · İnotrop',
    title: 'Adrenalin (Epinefrin)',
    shortDesc: 'Kardiyak arrest (ACLS/PALS 1 mg), perioperatif anafilaksi (0.5 mg IM / 50–200 mcg IV), LAST modifiye düşük doz (≤1 mcg/kg), Push-Dose, nebülize stridor ve bifazik doz-reseptör infüzyon pompası hesaplayıcısı için altın standart ilaç monografisi.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'rose',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'TR Ampul Formları', 
        value: '0.25 · 0.5 · 1 mg / mL', 
        subtext: '1:1.000 (1000 mcg/mL) etiketi kontrol et',
        tooltip: 'Türkiye klinik ampulleri farklı mg içerip hepsi 1 mL hacimdedir; IV uygulamadan önce 1:10.000 veya 10 mcg/mL olarak seyreltilmelidir',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      },
      { 
        label: 'İnfüzyon Aralığı', 
        value: '0.01 – 0.50 mcg/kg/dk', 
        subtext: 'β₂/β₁ inotrop (≤0.05) · α₁ (>0.15)',
        tooltip: 'Doz bağımlı bifazik yanıt: düşük dozda β₂/β₁ baskın, yüksek dozda α₁ vazokonstriksiyon',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      },
      { 
        label: 'Anafilaksi / ACLS', 
        value: '0.5 mg IM · 1 mg IV', 
        subtext: 'Ameliyathane IV titrasyon: 50–200 mcg',
        tooltip: 'NAP6 / WAO: Anafilakside M. vastus lateralis IM veya monitörize IV titrasyon; ACLS arrestte 3-5 dk 1 mg IV',
        colorClass: 'text-cyan-700 dark:text-cyan-300', 
        bgClass: 'bg-cyan-500/10', 
        borderClass: 'border-cyan-500/30' 
      },
      { 
        label: 'LAST Modifiye Doz', 
        value: '≤ 1 mcg/kg IV', 
        subtext: 'Standart 1 mg IV VERİLMEZ!',
        tooltip: 'ASRA 2020 LAST Kılavuzu: Yüksek doz adrenalin İntralipid etkisini bozar; 70 kg için maks 50–70 mcg',
        colorClass: 'text-emerald-700 dark:text-emerald-300', 
        bgClass: 'bg-emerald-500/10', 
        borderClass: 'border-emerald-500/30' 
      }
    ]
  },
  {
    id: 'sevoflurane',
    category: 'medications',
    categories: ['medications', 'general_anesthetics'],
    categoryLabel: 'Volatil Genel Anestezik',
    badge: 'Sevorane · Sarı Kod · MAC %2.05',
    title: 'Sevofluran (sevoFLURANE)',
    shortDesc: 'Hava yolunu irrite etmeyen, düşük kan/gaz çözünürlüklü (0.65) volatil anestezik; pediatrik/erişkin maske indüksiyonu, bronkodilatasyon, yaş-düzeltmeli MAC, Compound A güvenliği ve CO₂e tüketim hesabı.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'MAC (40 Yaş · O₂)', 
        value: '%2.05 (%60 N₂O: ~%0.8)', 
        subtext: 'Pediatrik tepe (1–6 ay): %3.2',
        tooltip: 'Mapleson denklemiyle her dekatta ~%6 azalır',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      },
      { 
        label: 'Kan / Gaz Katsayısı', 
        value: '0.65 (Yağ/Gaz: 47–53)', 
        subtext: 'Hızlı maske indüksiyonu & uyanma',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'Hava Yolu Profili', 
        value: 'İrritasyon Yok · Bronkodilatör', 
        subtext: 'Astım & pediatri maske 1. tercih',
        colorClass: 'text-emerald-700 dark:text-emerald-300', 
        bgClass: 'bg-emerald-500/10', 
        borderClass: 'border-emerald-500/30' 
      },
      { 
        label: 'Güvenlik & Absorban', 
        value: 'MH Tetikleyici · Compound A', 
        subtext: 'Asla IV verilmez; KOH-free absorban',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      }
    ]
  },
  {
    id: 'desflurane',
    category: 'medications',
    categories: ['medications', 'general_anesthetics'],
    categoryLabel: 'Volatil Genel Anestezik',
    badge: 'Suprane · Mavi Kod · MAC %6.0',
    title: 'Desfluran (desFLURANE)',
    shortDesc: 'En düşük kan/gaz çözünürlüklü (0.42–0.45) volatil; morbid obezite & uzun vakalarda en hızlı uyanma, 22.8°C kaynama (TEC-6 zorunlu), >%6 sempatik pik/laringospazm, kuru absorbanda CO zehirlenmesi ve GWP₁₀₀ 2540.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'cyan',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'MAC (40 Yaş · O₂)', 
        value: '%6.0 (%60 N₂O: ~%2.8)', 
        subtext: '6–12 ay pik: %9.9 · Yaşlıda ↓',
        tooltip: 'Düşük potensli; TEC-6 / D-Vapor 39°C ısıtmalı vaporizatör gerektirir',
        colorClass: 'text-cyan-700 dark:text-cyan-300', 
        bgClass: 'bg-cyan-500/10', 
        borderClass: 'border-cyan-500/30' 
      },
      { 
        label: 'Kan / Gaz · Yağ/Gaz', 
        value: '0.42–0.45 · 18.7', 
        subtext: 'Obezitede en hızlı derlenme',
        colorClass: 'text-emerald-700 dark:text-emerald-300', 
        bgClass: 'bg-emerald-500/10', 
        borderClass: 'border-emerald-500/30' 
      },
      { 
        label: 'Hava Yolu & Sempatik', 
        value: 'İndüksiyonda KONTRENDİKE', 
        subtext: '>%6 hızlı artışta taşikardi & spazm',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      },
      { 
        label: 'Metabolizma & CO Riski', 
        value: '%0.02 · En Yüksek CO / GWP', 
        subtext: 'Kuru absorbanda COHb! ≤1 L/dk FGF',
        colorClass: 'text-amber-700 dark:text-amber-300', 
        bgClass: 'bg-amber-500/10', 
        borderClass: 'border-amber-500/30' 
      }
    ]
  },
  {
    id: 'acetazolamide',
    category: 'medications',
    categories: ['medications', 'diuretics'],
    categoryLabel: 'Karbonik Anhidraz İnh. / Diüretik',
    badge: 'Diazomid · ADVOR · DIABOLO',
    title: 'Asetazolamid (acetaZOLAMIDE)',
    shortDesc: 'Proksimal tübülde karbonik anhidraz inhibisyonuyla bikarbonatüri; YBÜ dirençli metabolik alkalozu, ADVOR akut kalp yetmezliği dekonjesyonu, KİB / İİH / BOS kaçağı azaltımı ve akut glokom için altın standart ilaç monografisi ve renal güvenlik hesaplayıcısı.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      { 
        label: 'YBÜ Metabolik Alkaloz', 
        value: '250 – 500 mg / gün', 
        subtext: 'PO/NG veya IV · 1–3 gün kısa kür',
        tooltip: 'Mazur RCT: Tek doz 500 mg IV, 4×250 mg IV kadar etkin HCO₃⁻ düşüşü sağlar',
        colorClass: 'text-teal-700 dark:text-teal-300', 
        bgClass: 'bg-teal-500/10', 
        borderClass: 'border-teal-500/30' 
      },
      { 
        label: 'ADVOR (Kalp Yetmezliği)', 
        value: '500 mg IV 1×1 (3 gün)', 
        subtext: 'Loop diüretiğe ek sequential blokaj',
        tooltip: 'NEJM 2022 ADVOR çalışması: 3 günde tam dekonjesyon oranını anlamlı artırır',
        colorClass: 'text-cyan-700 dark:text-cyan-300', 
        bgClass: 'bg-cyan-500/10', 
        borderClass: 'border-cyan-500/30' 
      },
      { 
        label: 'KİB / BOS & Glokom', 
        value: '250 – 500 mg × 2–4', 
        subtext: 'BOS & aköz hümör üretimini ↓%50',
        tooltip: 'NORDIC İİH protokolü, BOS rinoresi ve akut açı kapanması glokomu acil tedavisi',
        colorClass: 'text-indigo-700 dark:text-indigo-300', 
        bgClass: 'bg-indigo-500/10', 
        borderClass: 'border-indigo-500/30' 
      },
      { 
        label: 'Kritik Kontrendikasyon', 
        value: 'Siroz & CrCl < 10 mL/dk', 
        subtext: 'NH₃↑ (koma) · Salisilat zehir. YASAK',
        tooltip: '%100 renal atılım; sirozda hepatik ensefalopatiyi, salisilat toksisitesinde SSS geçişini artırır',
        colorClass: 'text-rose-700 dark:text-rose-300', 
        bgClass: 'bg-rose-500/10', 
        borderClass: 'border-rose-500/30' 
      }
    ]
  },
  {
    id: 'furosemide',
    category: 'medications',
    categories: ['medications', 'diuretics'],
    categoryLabel: 'Loop Diüretiği · NKCC2',
    badge: 'Lasix · DOSE · FST',
    title: 'Furosemid (furoSEMIDE)',
    shortDesc: 'Henle çıkan kalın kolda NKCC2 inhibisyonuyla hızlı natriürez ve venodilatasyon; akut pulmoner ödem (ESC/DOSE), TACO, hiperkalemi, sürekli IV infüzyon pompası, Furosemid Stres Testi (FST) ve ototoksisite (≤ 4 mg/dk) güvenlik hesaplayıcısı.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'cyan',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Standart Ampul',
        value: '20 mg / 2 mL',
        subtext: 'Lasix / Desal · 10 mg/mL · 40 mg tb',
        tooltip: 'Standart IV ampul 20 mg/2 mL (10 mg/mL); yüksek doz infüzyon için 250 mg/25 mL flakon mevcuttur',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30'
      },
      {
        label: 'IV İnfüzyon (YBÜ)',
        value: '5 – 40 mg/saat',
        subtext: '20–40 mg IV bolus sonrası pompa',
        tooltip: 'DOSE çalışması: Sürekli infüzyon öncesi 20–40 mg IV yükleme bolusu gerekir; ışık koruması önerilir',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'FST Test Dozu',
        value: '1,0 – 1,5 mg/kg IV',
        subtext: '2 sa idrar < 200 mL → Evre 3 AKI',
        tooltip: 'Chawla 2013: Loop-naif 1,0 mg/kg, son 7 günde loop alan 1,5 mg/kg IV; 2 saatlik idrar < 200 mL yüksek risk',
        colorClass: 'text-indigo-700 dark:text-indigo-300',
        bgClass: 'bg-indigo-500/10',
        borderClass: 'border-indigo-500/30'
      },
      {
        label: 'Ototoksisite Sınırı',
        value: '≤ 4 mg / dk',
        subtext: 'Yüksek doz (> 80 mg) yavaş IV',
        tooltip: '4 mg/dk üzerindeki hızlı yüksek doz IV uygulama (özellikle ABY ve aminoglikozid varlığında) ototoksisite yapar',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'atropine',
    category: 'medications',
    categories: ['medications'],
    categoryLabel: 'Antikolinerjik · M₁–M₅',
    badge: 'ACLS 1 mg · NMB · Antidot',
    title: 'Atropin Sülfat (ATROPINE)',
    shortDesc: 'Non-selektif muskarinik antagonist; AHA 2020 erişkin/pediatrik semptomatik bradikardi, intraoperatif vagal refleksler, Neostigmin NMB reversal, organofosfat doubling-dose atropinizasyon ve TR 0,25/0,5/1 mg ampul güvenlik hesaplayıcısı.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Standart Ampuller',
        value: '0,25 · 0,5 · 1 mg/mL',
        subtext: 'Hepsi 1 mL — Etiketi teyit et!',
        tooltip: 'Türkiye’de 3 farklı konsantrasyonun tamamı 1 mL ampuldür; çekmeden önce mg/mL değerini yüksek sesle teyit edin',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'ACLS Bradikardi',
        value: '1,0 mg IV bolus',
        subtext: 'q3–5 dk · Maks 3,0 mg',
        tooltip: 'AHA 2020 ACLS güncellemesiyle erişkin semptomatik bradikardi başlangıç dozu 0,5 mg’dan 1,0 mg IV’ye yükseltilmiştir',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'NMB Reversal',
        value: '0,4 mg / 1 mg Neo',
        subtext: '0,015–0,02 mg/kg · Aynı enjektör',
        tooltip: 'ASA 2023: Neostigmin muskarinik etkilerini bloke eder; kantitatif TOF ≥ 0,90 doğrulanmadan ekstübasyon yapılmaz',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30'
      },
      {
        label: 'Paradoksal Eşik',
        value: '< 0,5 mg YASAK',
        subtext: 'Denerve kalp · Mobitz II/III dikkat',
        tooltip: 'Erişkinde < 0,5 mg yavaş uygulama paradoksal bradikardi yapabilir; kalp naklinde ve infranodal AV blokta etkisizdir',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'ephedrine',
    category: 'medications',
    categories: ['medications'],
    categoryLabel: 'Vazopresör · Karma α/β Agonist',
    badge: '5 mg/mL · Taşiflaksi · Obstetrik',
    title: 'Efedrin Hidroklorür (EPHEDRINE)',
    shortDesc: 'Karma direkt + indirekt (NE salıcı) sempatomimetik; genel/nöroaksiyel anestezi hipotansiyonu (5–10 mg IV), TR 50 mg/1 mL ampul sulandırma (5 mg/mL), kümülatif 50 mg taşiflaksi takibi, MAOI/Linezolid alarmı ve sezaryen karar destek hesaplayıcısı.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'purple',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Ampul & Dilüsyon',
        value: '50 mg/mL → 5 mg/mL',
        subtext: '1 amp + 9 mL SF · SULANDIRMADAN VERME!',
        tooltip: 'Türkiye standart ampulü 50 mg/1 mL konsantredir; 9 mL %0,9 NaCl ile 10 mL’ye (5 mg/mL) sulandırılır',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      },
      {
        label: 'Erişkin IV Bolus',
        value: '5 – 10 mg IV',
        subtext: '1–2 mL (5 mg/mL) · Süre 10–20 dk',
        tooltip: 'Düşük/normal KTA eşlik eden anestezi ilişkili hipotansiyonda 3–5 dk’da bir tekrarlanır',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30'
      },
      {
        label: 'Taşiflaksi Tavanı',
        value: 'Maks 50 mg IV',
        subtext: '> 30 mg sonrası direkt ajana geç',
        tooltip: 'Presinaptik NE depoları tükendiği için > 30–50 mg sonrası yanıt düşer → Noradrenalin / Fenilefrin’e geçin',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Obstetrik & MAOI',
        value: 'Fetal pH↓ · MAOI YASAK',
        subtext: 'Kinsella 2018 · Linezolid krizi!',
        tooltip: 'Sezaryende 1. tercih Fenilefrin/Noradrenalin’dir; MAOI veya Linezolid alan hastada ölümcül hipertansif kriz yapar',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      }
    ]
  },
  {
    id: 'naloxone',
    category: 'medications',
    categories: ['medications', 'sedation', 'antidotes'],
    categoryLabel: 'Opioid Antagonisti · Antidot',
    badge: 'PACU 40 mcg · 2/3 İnfüzyon',
    title: 'Nalokson Hidroklorür (NALOXONE)',
    shortDesc: 'Saf kompetitif μ-opioid antagonisti; postoperatif PACU solunum depresyonunda (OIRD) analjezi koruyucu 40 mcg mikro-titrasyon, Boyer 2/3 sürekli IV infüzyon pompası, renarkotizasyon takibi ve nöroaksiyel kaşıntı protokolü.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'rose',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Ampul & PACU Sulandırma',
        value: '0,4 mg/mL → 40 mcg/mL',
        subtext: '1 amp + 9 mL SF · Tam ampul VERME!',
        tooltip: 'TR standart ampul 0,4 mg (400 mcg)/1 mL’dir; PACU’da 10 mL’ye sulandırıp 1 mL (40 mcg) dilimlerle titre edilir',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      },
      {
        label: 'PACU Titrasyonu (OIRD)',
        value: '40 mcg (1 mL) IV',
        subtext: 'q2–3 dk · Analjeziyi koru!',
        tooltip: 'Dahan 2010: Yalnızca yeterli spontan ventilasyonu (SS ≥ 10–12/dk) sağlamak amaçlanır; KAH/kronik opioidde 20 mcg başla',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30'
      },
      {
        label: 'Renarkotizasyon & İnfüzyon',
        value: '30–60 dk · 2/3 Uyanma/sa',
        subtext: 'Son doz sonrası ≥ 2 sa izlem şart',
        tooltip: 'Boyer NEJM 2012: Etki süresi uzun etkili opioidlerden kısadır; sürekli infüzyon ilk uyanma dozunun 2/3’ü/saat',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Nöroaksiyel Kaşıntı',
        value: '0,25–2 mcg/kg/sa',
        subtext: 'Spinal/epidural morfin kaşıntısı',
        tooltip: 'Murphy 2011 / Kjellberg 2001: ≤ 2 mcg/kg/saat hızında analjeziyi bozmadan opioid kaşıntısı ve PONV’u giderir',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      }
    ]
  },
  {
    id: 'flumazenil',
    category: 'medications',
    categories: ['medications', 'sedation', 'antidotes'],
    categoryLabel: 'Benzodiazepin Antagonisti · Antidot',
    badge: '0,2 mg IV q60 sn · Maks 1 mg',
    title: 'Flumazenil (FLUMAZENIL · Anexate)',
    shortDesc: 'Spesifik kompetitif GABA_A benzodiazepin bağlanma bölgesi antagonisti; prosedürel sedasyon/genel anestezi BZD reversali (0,2 mg q60 sn, maks 1 mg), pediatrik 0,01 mg/kg protokolü, resedasyon takibi ve TSA/kronik BZD nöbet kontrendikasyonları.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'purple',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Ampul (Anexate)',
        value: '0,5 mg / 5 mL (0,1 mg/mL)',
        subtext: '1 mL = 0,1 mg · 2 mL = 0,2 mg',
        tooltip: 'Türkiye standart ampul 0,5 mg/5 mL (ve 1 mg/10 mL) = 0,1 mg/mL (100 mcg/mL); direkt sulandırmadan veya SF/%5 Dekstroz ile uygulanır',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30'
      },
      {
        label: 'Prosedürel / PACU Reversal',
        value: '0,2 mg (2 mL) IV / 15 sn',
        subtext: 'q60 sn · Maks 1 mg (5 doz)',
        tooltip: '45 sn bekle; hedef bilinç sağlanmazsa her 60 sn’de 0,1–0,2 mg tekrarla (prosedürel maks 1 mg, saf BZD intoksikasyonunda maks 3 mg)',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30'
      },
      {
        label: 'Resedasyon & Yarı Ömür',
        value: 't½ 40–80 dk · 0,1–0,4 mg/sa',
        subtext: 'Son doz sonrası ≥ 2 sa izlem şart',
        tooltip: 'Whitwam 1995: Etki süresi (30–60 dk) midazolam/diazepam/lorazepamdan kısadır; tekrarlayan resedasyonda 0,1–0,4 mg/saat infüzyon',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Mutlak Kontrendikasyon',
        value: 'TSA & Kronik BZD Nöbeti!',
        subtext: 'Geniş QRS / epilepsi → VERME!',
        tooltip: 'Sivilotti 2016 / Penninga 2016: Trisiklik antidepresan (QRS > 100 ms), kronik BZD bağımlılığı ve bilinmeyen mikst intoksikasyonda refrakter status epileptikus ve ventriküler aritmi tetikler',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'dopamine',
    category: 'vasoactive',
    categories: ['vasoactive', 'medications'],
    categoryLabel: 'İnopressör / Kronotrop · Katekolamin',
    badge: 'Bradikardi 5–20 mcg/kg/dk · D1/β1/α1',
    title: 'Dopamin Hidroklorür (DOPamin · Dopmin)',
    shortDesc: 'Endojen noradrenalin prekürsörü ve doz-bağımlı D1/D2 → β1 → α1 agonisti; atropine yanıtsız semptomatik bradikardi (AHA 5–20 mcg/kg/dk), SOAP-II aritmi/kardiyojenik şok kanıtı, ANZICS "renal doz" çürütmesi ve Fentolamin ekstravazasyon protokolü.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'cyan',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Ampul & Standart Sulandırma',
        value: '200 mg / 5 mL (40 mg/mL)',
        subtext: '250 mL’de 800 veya 1600 mcg/mL',
        tooltip: '1 amp (200 mg) + 245 mL SF/%5 Dekstroz = 800 mcg/mL; 2 amp (400 mg) / 250 mL = 1600 mcg/mL; 50 mL enjektörde 1 amp = 4000 mcg/mL (SVK şart!)',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30'
      },
      {
        label: 'β1 İnotrop / Bradikardi',
        value: '5 – 10 mcg/kg/dk',
        subtext: 'ACLS Bradikardi: 5–20 mcg/kg/dk',
        tooltip: 'AHA/ACC/HRS: Atropine yanıtsız semptomatik bradikardi ve düşük CO’da β1 inotropik/kronotropik etki + presinaptik noradrenalin salınımı',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30'
      },
      {
        label: 'α1 Vazopressör & SOAP-II',
        value: '10 – 20 mcg/kg/dk',
        subtext: '%24,1 Aritmi · Şokta 1. tercih DEĞİL!',
        tooltip: 'De Backer NEJM 2010 (SOAP-II): Noradrenaline göre 2 kat aritmi (%24,1 vs %12,4) ve kardiyojenik şokta artmış mortalite; >20 mcg/kg/dk çıkma!',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: '"Renal Doz" & LASA Uyarısı',
        value: '1–3 mcg/kg/dk ÖNERİLMEZ',
        subtext: 'DOPamin ≠ DOBUTamin · Bolus VERME!',
        tooltip: 'Bellomo Lancet 2000 (ANZICS): Düşük doz dopamin ABH veya RRT’yi önlemez (Sınıf III). DOBUTamin ile en sık karışan LASA inotroptur',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'dobutamine',
    category: 'vasoactive',
    categories: ['vasoactive', 'medications'],
    categoryLabel: 'İnodilatör (β₁ >> β₂) · Katekolamin',
    badge: 'Kardiyojenik & Septik Şok 2–20 mcg/kg/dk',
    title: 'Dobutamin Hidroklorür (DOBUTamin · Dobutasel)',
    shortDesc: 'Doğrudan β₁-adrenerjik ağırlıklı rasemik inodilatör; kardiyojenik şok (ESC 2021 / DOREMI), septik kardiyomiyopati (SSC 2021 Noradrenalin + Dobutamin), KPB sonrası düşük debi (LCOS), stres ekokardiyografi ve β₂ vazodilatasyon/LVOTO yönetimi.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Flakon & Standart Çözelti',
        value: '250 mg / 20 mL (12,5 mg/mL)',
        subtext: '250 mL’de 1000 veya 2000 mcg/mL',
        tooltip: '1 flakon (250 mg / 20 mL) + 230 mL SF/%5 Dekstroz = 1000 mcg/mL (1 mg/mL); 50 mL enjektörde 1 flakon + 30 mL = 5000 mcg/mL (5 mg/mL)',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'İnodilatör İdame Dozu',
        value: '2 – 20 mcg/kg/dk',
        subtext: 'Optimal: 5–10 mcg/kg/dk (CO↑ PCWP↓)',
        tooltip: 'ESC 2021 / DOREMI NEJM 2021: Doğrudan β₁ inotropi + hafif β₂ vazodilatasyon ile SV ve CO artırırken LVEDP/PCWP ve SVR’yi düşürür',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30'
      },
      {
        label: 'İnodilatör Hipotansiyon Tuzağı',
        value: 'Vazopresör DEĞİLDİR (SVR↓)',
        subtext: 'MAP < 65 ise Noradrenalin ile ver!',
        tooltip: 'SSC 2021 / CATS Lancet 2007: β₂ vazodilatasyon nedeniyle derin hipotansiyonda tek başına başlanırsa MAP’ı düşürür; Noradrenaline eklenir',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Mutlak Kontrendikasyon & LASA',
        value: 'IHSS / LVOTO & DOPamin!',
        subtext: 'Dinamik LVOT obstrüksiyonunda VERME!',
        tooltip: 'Hipertrofik kardiyomiyopati (HOCM/IHSS) ve Takotsubo LVOTO’da gradyenti artırarak şoku derinleştirir; DOPamin ile LASA çift kontrol şarttır',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'sugammadex',
    category: 'medications',
    categories: ['medications', 'sedation', 'antidotes'],
    categoryLabel: 'NMB Antagonisti (SRBA) · Antidot',
    badge: '2 · 4 · 16 mg/kg IV · TOF ≥ 0,9',
    title: 'Sugammadeks Sodyum (SUGAMMADEX · Bridion)',
    shortDesc: 'Modifiye γ-siklodekstrin yapılı selektif gevşetici bağlayıcı ajan (SRBA); Roküronyum/Veküronyum bloğunda 1:1 moleküler enkapsülasyon, orta/derin/CICO (16 mg/kg) flakon hesaplayıcı, Re-NMB bekleme süreleri ve 7 günlük kontraseptif uyarısı.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'purple',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Flakon (Bridion / Brimadeks)',
        value: '200 mg/2 mL & 500 mg/5 mL',
        subtext: '100 mg/mL · 10 sn hızlı IV bolus',
        tooltip: 'İki flakon da 100 mg/mL konsantrasyondadır; sulandırmadan tek hızlı IV bolus uygulanır (CICO 16 mg/kg için 500 mg flakon hazır olmalı)',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30'
      },
      {
        label: 'TOF / PTC Doz Basamakları',
        value: '2 · 4 · 16 mg/kg (TBW)',
        subtext: 'T2: 2 · PTC 1–2: 4 · CICO: 16 mg/kg',
        tooltip: 'ASA/ESAIC 2023 (1A): Gerçek vücut ağırlığı (TBW) üzerinden dozlanır; IBW ile dozlama obezlerde rekürarizasyon riski doğurur',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30'
      },
      {
        label: 'Sadece Aminosteroid NMB!',
        value: 'Roküronyum > Veküronyum',
        subtext: 'Atraküryum / Süksinilkolinde ETKİSİZ',
        tooltip: 'Benzilizokinolin (Sisatraküryum, Atraküryum, Mivaküryum) ve Süksinilkolin bloğunu KESİNLİKLE çevirmez; Atropin eklenmesi gerekmez',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Kritik Güvenlik Uyarıları',
        value: 'Bradikardi · 7 Gün Bariyer',
        subtext: 'CrCl < 30 mL/dk · Anafilaksi takibi',
        tooltip: 'Progesteron bağladığı için 7 gün ek bariyer kontrasepsiyon şarttır; uygulama sırasında ani bradikardi/asistoli için sürekli EKG ve Atropin hazır olmalı',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'hydrocortisone',
    category: 'medications',
    categories: ['medications'],
    categoryLabel: 'Kortikosteroid (1:1) · Septik Şok & Adrenal Kriz',
    badge: 'Septik Şok 200 mg/gün · Adrenal Kriz 100 mg',
    title: 'Hidrokortizon Sodyum Süksinat (HYDROCORTISONE · Hydrocort-Liyo)',
    shortDesc: 'Endojen kortizol (1:1 glukokortikoid/mineralokortikoid); refrakter septik şok (SSC 2021 / ADRENAL / APROCCHSS 200 mg/gün IV), akut adrenal kriz (100 mg bolus), perioperatif stres dozu (Woodcock 2020) ve steroid eşdeğerlik dönüştürücüsü.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Flakon / Ampul',
        value: '100 mg + 2 mL (50 mg/mL)',
        subtext: 'Hydrocort-Liyo® · Hidrozon® · Solu-Cortef®',
        tooltip: '100 mg liyofilize toz + 2 mL enjeksiyonluk su = 50 mg/mL; 100 mg IV bolus en az 1–3 dk’da verilir (hızlı puşede perineal yanma!)',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'Refrakter Septik Şok (SSC 2021)',
        value: '200 mg / gün IV',
        subtext: '50 mg q6h veya 8,3 mg/saat infüzyon',
        tooltip: 'ADRENAL & APROCCHSS NEJM 2018: Noradrenalin ≥ 0,25 mcg/kg/dk gereksinimi sürdüğünde şoktan çıkış süresini ve vazopresör ihtiyacını azaltır',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30'
      },
      {
        label: 'Adrenal Kriz & Perioperatif Stres',
        value: '100 mg IV + 200 mg/24 sa',
        subtext: 'Woodcock 2020 · Majör cerrahi protokolü',
        tooltip: 'Primer/sekonder adrenal yetmezlik veya HPA aksı baskılı hastada indüksiyonda 100 mg IV bolus + 200 mg/24 saat sürekli infüzyon',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Eşdeğerlik & Metabolik İzlem',
        value: '20 mg = 4 mg MP = 0,75 mg Deksa',
        subtext: 'Hiperglisemi · Na⁺↑ · K⁺↓ takibi',
        tooltip: 'Eşit (1:1) mineralokortikoid aktivitesi sayesinde şokta idealdir; ancak hiperglisemi, hipernatremi ve hipokalemi yakından izlenmelidir',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'dexamethasone',
    category: 'medications',
    categories: ['medications'],
    categoryLabel: 'Saf Glukokortikoid (25–30× · 0 MK) · PONV & Anti-Ödem',
    badge: 'PONV 4–8 mg · ARDS 20 mg · 36–72 sa',
    title: 'Deksametazon Sodyum Fosfat (DEXAMETHASONE · Dekort)',
    shortDesc: 'Uzun etkili (36–72 sa) saf glukokortikoid (0 mineralokortikoid); PONV profilaksisi (Gan 2020 4–8 mg), PNB analjezik adjuvanı, post-ekstübasyon stridor/krup, beyin tümörü vazojenik ödemi (TBH’de kontrendike!), COVID-19 (RECOVERY) & ARDS (DEXA-ARDS) protokolü.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'purple',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Ampul (Kullanıma Hazır)',
        value: '8 mg / 2 mL (4 mg/mL)',
        subtext: 'Dekort® · Onadron® · Deksamet® · Gadexon®',
        tooltip: '1 ampul = 8 mg/2 mL (4 mg/mL) berrak çözelti; uyanık hastada hızlı IV puşe şiddetli perineal yanma yapar — en az 1–3 dk’da veya 50–100 mL SF içinde yavaş verin',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30'
      },
      {
        label: 'PONV & PNB Adjuvanı',
        value: '4–8 mg IV (İndüksiyonda)',
        subtext: 'Gan 2020 · IV 4–8 mg PNB uzatma',
        tooltip: 'PONV için indüksiyonda 4–8 mg IV (0,15 mg/kg pediatrik, maks 8 mg); PNB süresini 4–8 saat uzatmak için IV yol perinöral kadar etkilidir ve nörotoksisite riski taşımaz',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'COVID-19 & Orta-Ağır ARDS',
        value: '6 mg/gün · 20→10 mg/gün',
        subtext: 'RECOVERY NEJM 2021 · DEXA-ARDS 2020',
        tooltip: 'Hipoksemik COVID-19’da 6 mg/gün × 10 gün (RECOVERY); orta-ağır ARDS’de 20 mg/gün × 5 gün → 10 mg/gün × 5 gün (DEXA-ARDS)',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: '0 Mineralokortikoid & TBH Uyarısı',
        value: 'Tümör Ödemi ✓ · TBH ✗',
        subtext: 'CRASH: TBH’de mortalite ↑ · 0,75 mg = 20 mg HC',
        tooltip: 'Sıfır mineralokortikoid etkisi ile beyin tümörü vazojenik ödeminde idealdir; ancak travmatik beyin hasarında (TBH) CRASH çalışması nedeniyle KESİNLİKLE KONTRENDİKEDİR',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'methylprednisolone',
    category: 'medications',
    categories: ['medications'],
    categoryLabel: 'Orta Etkili Steroid (5× · 0,5 MK) · ARDS & Pulse',
    badge: 'Bronkospazm 40–125 mg · ARDS · Pulse',
    title: 'Metilprednizolon Sodyum Süksinat (METHYLPREDNISOLONE · Prednol-L)',
    shortDesc: 'Orta etkili (12–36 sa) yüksek akciğer penetrasyonlu glukokortikoid; akut astım/KOAH bronkospazmı (40–125 mg IV), post-ekstübasyon stridor (François Lancet 2007), erken ağır ARDS (Meduri 1 mg/kg/gün infüzyon), pulse tedavi (250–1000 mg) ve MRC CRASH TBH kontrendikasyonu.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'cyan',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Liyofilize Ampul / Flakon',
        value: '20 · 40 · 250 mg',
        subtext: 'Prednol-L® · Precort-Liyo® · Solu-Medrol®',
        tooltip: 'Prednol-L® 20/40/250 mg liyofilize ampul ve Solu-Medrol® 40–1000 mg flakon; ≥250 mg pulse dozlar ASLA hızlı puşe edilmez (≥30–60 dk infüzyon + EKG)',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30'
      },
      {
        label: 'Bronkospazm & Post-Ekstübasyon',
        value: '40–125 mg · 20 mg q4h×4',
        subtext: 'Astım/KOAH · François Lancet 2007',
        tooltip: 'Akut astım/KOAH’da 40–125 mg IV; post-ekstübasyon stridor profilaksisinde ekstübasyondan 12 sa önce başlayarak 20 mg IV q4h × 4 doz (toplam 80 mg)',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'Erken Ağır ARDS (Meduri)',
        value: '1 mg/kg → 1 mg/kg/gün',
        subtext: 'Sürekli IV infüzyon × 14 gün · SCCM 2024',
        tooltip: 'Meduri (Chest 2007) & SCCM 2024: 1 mg/kg IV yükleme ardından 1 mg/kg/gün sürekli infüzyon × 14 gün ve kademeli azaltma (ani kesme rebound ARDS yapar)',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Pulse Aritmi & CRASH TBH',
        value: '≥30–60 dk İnfüzyon · TBH ✗',
        subtext: '4 mg MP = 20 mg HC = 0,75 mg Deksa',
        tooltip: 'Hızlı pulse (>250–1000 mg) kardiyak arrest/bradikardi yapabilir; travmatik beyin hasarında (MRC CRASH Lancet 2004) mortaliteyi artırdığı için KESİNLİKLE KONTRENDİKEDİR',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'thiopental',
    category: 'general_anesthetics',
    categories: ['general_anesthetics', 'medications', 'sedation'],
    categoryLabel: 'IV Barbitürat · İndüksiyon, İKB & SRSE',
    badge: '%2,5 (25 mg/mL) · pH 10,5 · Barbitürat Koması',
    title: 'Tiyopental Sodyum (THIOPENTAL · Pental Sodyum)',
    shortDesc: 'Ultra-kısa başlangıçlı (15–30 sn) IV tiyobarbitürat; genel anestezi/RSI indüksiyonu (3–5 mg/kg), refrakter İKB barbitürat koması (BTF 2017), süper-refrakter status epileptikus (SRSE), porfiri kontrendikasyonu ve intra-arteriyel enjeksiyon acil kurtarma protokolü.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'purple',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Flakon & %2,5 Sulandırma',
        value: '0,5 g / 1 g → 25 mg/mL',
        subtext: 'Pental Sodyum® · Tyosod® · pH ~10,5',
        tooltip: '0,5 g + 20 mL veya 1 g + 40 mL SF/enj. su = %2,5 (25 mg/mL); kuvvetli alkali çözeltidir — NMB/asidik ilaçlarla Y-site çökelti yapar (araya SF flush şart!)',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30'
      },
      {
        label: 'İndüksiyon & Obstetrik RSI',
        value: '3–5 mg/kg IV (15–30 sn)',
        subtext: 'Geriatrik/Şok: 1,5–2,5 · Ped: 5–6 mg/kg',
        tooltip: '1 kol-beyin dolaşım süresinde (15–30 sn) bilinç kaybı; uyanma metabolizmayla değil redistribüsyonla (5–10 dk) gerçekleşir',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'Refrakter İKB & SRSE İnfüzyon',
        value: '3–5 mg/kg → 1–5 mg/kg/sa',
        subtext: 'BTF 2017 Level IIB · EEG Burst-Supresyon',
        tooltip: 'Maksimum tedaviye dirençli İKB ve SRSE’de EEG burst-supresyona titre edilir; uzun infüzyonda sıfır-derece kinetik ve hipokalemi → rebound hiperkalemi riski!',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Porfiri & İntra-Arteriyel Felaket',
        value: 'AIP Yasak · Kateteri Çekme!',
        subtext: 'ALA sentaz indüksiyonu · Kristalleşme nekrozu',
        tooltip: 'Akut intermitan porfiride kesin kontrendikedir; kazara intra-arteriyel enjeksiyonda kateteri çekmeden SF + Lidokain/Papaverin + Heparin + Stellat blok uygulanır',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'tranexamic-acid',
    category: 'hemostasis',
    categories: ['hemostasis', 'medications'],
    categoryLabel: 'Hemostaz · Antifibrinolitik (Lizin Analoğu)',
    badge: 'CRASH-2 / WOMAN / POISE-3 · İlk 3 Saat',
    title: 'Traneksamik Asit (TXA · Transamine® / Herajit®)',
    shortDesc: 'Plazminojen lizin bağlanma bölgesini bloke eden sentetik antifibrinolitik; travma/PPH ilk 3 saat 1 g + 1 g protokolü, non-kardiyak cerrahi (POISE-3), CPB yüksek doz nöbet uyarısı, renal doz ayarlama ve ölümcül intratekal LASA güvenlik önlemleri.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'rose',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Ampul & Sunum',
        value: '250 mg / 500 mg (100 mg/mL)',
        subtext: 'Transamine® · Herajit® · Tranex®',
        tooltip: '250 mg/2,5 mL ve 500 mg/5 mL IV ampul; kan ürünleri ve penisilinlerle aynı lümenden asla verilmez',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      },
      {
        label: 'Travma / PPH (İlk 3 Saat!)',
        value: '1 g IV (10 dk) → 1 g / 8 sa',
        subtext: 'CRASH-2 · CRASH-3 · WOMAN',
        tooltip: 'Kanama başlangıcından >3 saat sonra uygulanması faydasızdır ve kanamaya bağlı mortaliteyi artırabilir',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'Majör Cerrahi & CPB Nöbet Eşiği',
        value: 'POISE-3: 1+1 g · CPB <50 mg/kg',
        subtext: '>100 mg/kg: GABA_A/Glisin Nöbet Riski',
        tooltip: 'Kardiyak cerrahide kümülatif yüksek doz (>50–100 mg/kg) ve böbrek yetmezliğinde doz-bağımlı postop nöbet riski belirgin artar',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'WHO / ISMP LASA Never-Event',
        value: 'İNTRATEKAL = ÖLÜMCÜL!',
        subtext: 'Bupivakain ampul karışma riski',
        tooltip: 'Kazara spinal/intratekal enjeksiyon refrakter miyoklonus, status epileptikus, VF ve >%50 mortaliteye yol açar — nöraksiyel masadan kesinlikle ayrı tutulmalıdır',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'esmolol',
    category: 'vasoactive',
    categories: ['antihypertensives', 'vasoactive', 'medications'],
    categoryLabel: 'Vazoaktif · Ultra-Kısa Kardiyoselektif β₁-Bloker',
    badge: 't½ 9 dk · Eritrosit Esteraz · Brevibloc®',
    title: 'Esmolol (ESmolol · Brevibloc®)',
    shortDesc: 'Eritrosit sitozolik esterazlarıyla organ-bağımsız yıkılan ultra-kısa etkili (t½ 9 dk) kardiyoselektif β₁-bloker; entübasyon yanıtı, SVT/AF hız kontrolü, aort diseksiyonu dP/dt kontrolü, 250 mg/mL konsantre ampul tuzağı ve feokromositoma güvenliği.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'cyan',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'Ultra-Kısa PK (Organ-Bağımsız)',
        value: 'Başlangıç 1–2 dk · t½ 9 dk',
        subtext: 'Eritrosit Esteraz Hidrolizi',
        tooltip: 'Böbrek ve karaciğer yetmezliğinden bağımsız yıkılır (plazma psödokolinesteraz DEĞİL, eritrosit esterazı); kesilince 10–30 dk’da etki silinir',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30'
      },
      {
        label: 'Bolus & İnfüzyon Aralığı',
        value: '0,5–1 mg/kg → 50–300 mcg/kg/dk',
        subtext: 'Hazır flakon: 100 mg / 10 mL (10 mg/mL)',
        tooltip: 'SVT/AF için 500 mcg/kg/dk 1 dk yükleme → 50–200 mcg/kg/dk titrasyon; >300 mcg/kg/dk’da β₁ selektivitesi azalır',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'Konsantre Ampul Tuzağı',
        value: '250 mg/mL ASLA DİREKT PUŞE!',
        subtext: 'Periferik maks 10 mg/mL · SVK 20 mg/mL',
        tooltip: '2500 mg/10 mL konsantre ampul seyreltilmeden puşelenirse 25× doz aşımı ve kardiyak arrest yapar; >10 mg/mL periferik nekroz riski taşır',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      },
      {
        label: 'Aort Diseksiyonu & Feokromositoma',
        value: 'Diseksiyon: Önce β · Feo: Önce α!',
        subtext: 'Antidot: Atropin · Glukagon 3–5 mg',
        tooltip: 'Aort diseksiyonunda vazodilatatörden önce KH <60/dk hedeflenir; feokromositoma ve kokain krizinde α-blokaj öncesi tek başına β-bloker yasaktır',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      }
    ]
  },
  {
    id: 'nicardipine',
    category: 'vasoactive',
    categories: ['antihypertensives', 'vasoactive', 'medications'],
    categoryLabel: 'Vazoaktif · IV Vasküler Selektif KKB',
    badge: '5–15 mg/sa · ATACH-2 / İKH / Preeklampsi',
    title: 'Nikardipin (niCARdipine · Cardene® / Loxen®)',
    shortDesc: '2. kuşak dihidropiridin L-tipi Ca²⁺ kanal blokeri; minimal miyokard depresyonuyla öngörülebilir arteriyoler vazodilatasyon, nöroşirürji/İKH, intraoperatif HT (5–15 mg/sa & mikro-bolus), şiddetli preeklampsi, flebit ve RL/NaHCO₃ geçimsizliği.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'Standart İnfüzyon & Mikro-Bolus',
        value: '5 mg/sa → Maks 15 mg/sa',
        subtext: 'Mikro-bolus: 100–500 mcg IV',
        tooltip: '5–15 dk aralıklarla 2,5 mg/sa artırılır; hedefe ulaşınca 3 mg/sa idameye inilir. Pediatri: 0,5–3 (maks 5) mcg/kg/dk',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'Serebral & Koroner Profil',
        value: 'Yüksek Vasküler Selektivite',
        subtext: 'Başlangıç 1–5 dk · Offset 30–60 dk',
        tooltip: 'İntraserebral kanama (ATACH-2), kraniyotomi ve karotis cerrahisinde KİBAS’ı SNP/GTN gibi artırmadan güvenli kan basıncı kontrolü sağlar',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30'
      },
      {
        label: 'Flebit & Y-Site Geçimsizlik',
        value: '0,1 mg/mL (12 sa) · RL/NaHCO₃ Yasak',
        subtext: 'Yalnızca SF veya %5 Dekstroz',
        tooltip: 'Ringer Laktat ve %8,4 Sodyum Bikarbonat ile çökelti oluşturur; periferik 0,1 mg/mL hatta 12 saatte bir damar yolu değişimi şarttır',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Aort Darlığı & MgSO₄ Etkileşimi',
        value: 'İleri AD: Yasak · MgSO₄ Sinerji',
        subtext: 'Hepatik CYP3A4 · Antidot: CaCl₂ + VP',
        tooltip: 'İleri aort darlığında kontrendikedir; preeklampside MgSO₄ ile kombine kullanımda derin hipotansiyon ve NDMB potansiyalizasyonu gelişebilir',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'glyceryl-trinitrate',
    category: 'vasoactive',
    categories: ['antihypertensives', 'vasoactive', 'medications'],
    categoryLabel: 'Vazoaktif · Organik Nitrat / NO Donörü',
    badge: 'Perlinganit® 1 mg/mL · Venodilatatör & Tokoliz',
    title: 'Gliserol Trinitrat (Nitrogliserin · Perlinganit®)',
    shortDesc: 'Düşük dozda baskın venodilatatör, yüksek dozda arteriyoler/koroner vazodilatatör; intraoperatif MI, SCAPE pulmoner ödem, akut obstetrik uterin relaksasyon (50–100 mcg bolus), PDE-5/RV MI yasakları, PVC adsorpsiyonu ve methemoglobinemi.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'purple',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Ampul & Standart İnfüzyon',
        value: '5–200 mcg/dk (Perlinganit®)',
        subtext: '10 mg/10 mL (1 mg/mL) · t½ 1–4 dk',
        tooltip: 'Düşük doz (<40–50 mcg/dk) baskın venodilatasyon (↓preload/↓LVEDP), yüksek doz (>50–200 mcg/dk) arteriyoler + epikardiyal koroner vazodilatasyon',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30'
      },
      {
        label: 'Obstetrik Akut Tokoliz Bolusu',
        value: '50–100 mcg IV Puşe',
        subtext: 'Retansiyo Plasenta · İkiz Baş Takılması',
        tooltip: '60–90 sn içinde geçici hızlı uterin gevşeme sağlar (gerekirse tekrar, maks 500 mcg); kısa süreli hipotansiyon için vazopressör hazır bulundurulur',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'PVC Adsorpsiyon & Tolerans',
        value: 'PVC: %40–80 Kayıp → PE Hat!',
        subtext: '24–48 sa Nitrat Toleransı · MetHb',
        tooltip: 'Standart PVC setlere hızla adsorbe olur — Polietilen (PE) hat kullanın; >7 mcg/kg/dk veya uzamış infüzyonda MetHb (Metilen Mavisi) izleyin',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Ölümcül Mutlak Kontrendikasyon',
        value: 'PDE-5 (24–48 sa) · RV İnfarktı',
        subtext: 'İleri AD · Tamponad · KİBAS',
        tooltip: 'Sildenafil/Vardenafil sonrası 24 sa, Tadalafil sonrası 48 sa içinde ve sağ ventrikül infarktında (V4R ST↑) refrakter ölümcül kollaps yapar',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'sodium-nitroprusside',
    category: 'vasoactive',
    categories: ['antihypertensives', 'vasoactive', 'medications'],
    categoryLabel: 'Vazoaktif · Dengeli Direkt NO Donörü (High-Alert)',
    badge: 'Nipruss® · 30–60 sn · Siyanür Güvenliği',
    title: 'Sodyum Nitroprussid (Nipruss® · SNP)',
    shortDesc: '30–60 saniyede etki eden dengeli arteriyel/venöz ultra-hızlı vazodilatatör; zorunlu invaziv arter izlemi, yalnızca %5 Dekstroz & ışıktan koruma, KİBAS/koroner çalma yasakları, kümülatif siyanür/tiyosiyanat hesaplayıcı ve Hidroksokobalamin/Tiyosülfat antidotları.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'rose',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'Güvenli Aralık & Tavan Doz',
        value: '0,3–2 mcg/kg/dk (Tavan 10 / 10 dk)',
        subtext: 'Başlangıç 30–60 sn · Offset 1–3 dk',
        tooltip: '>2 mcg/kg/dk üzerinde siyanür birikim hızı hepatik rodanaz kapasitesini aşar; 10 mcg/kg/dk kesinlikle 10 dakikadan uzun verilmez',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      },
      {
        label: 'Yalnızca D5W & Işıktan Koruma',
        value: '%5 Dekstroz + Opak Enjektör/Hat',
        subtext: 'Mavi/Yeşil Renk = Fotoliz → İMHA!',
        tooltip: 'SF ile değil yalnızca %5 Dekstroz ile sulandırılır (Nipruss® 60 mg / 50 mg flakon); ışığa maruziyet hızla serbest siyanür (CN⁻) oluşturur',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Siyanür & Tiyosiyanat Antidotu',
        value: 'Hidroksokobalamin 5 g IV',
        subtext: 'Alternatif: Na-Tiyosülfat %25 12,5 g',
        tooltip: 'Erken triad: Taşiflaksi + açıklanamayan laktik asidoz + artmış SvO₂ (venöz hiperoksi). KC yetmezliğinde CN⁻, böbrek yetmezliğinde Tiyosiyanat birikir',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30'
      },
      {
        label: 'İnvaziv Arter & Kritik Yasaklar',
        value: 'A-Line Zorunlu · KİBAS / Steal Yasak',
        subtext: 'Aort Diseksiyonunda Önce Esmolol!',
        tooltip: 'KİBAS (↑ICP), koroner çalma (KAH’ta GTN tercih), gebelik (fetal CN⁻) ve beta-blokaj öncesi aort diseksiyonunda tehlikelidir',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      }
    ]
  },
  {
    id: 'pheniramine',
    category: 'medications',
    categories: ['medications'],
    categoryLabel: 'Antihistaminik · 1. Kuşak Parenteral H₁ Bloker',
    badge: 'Avil® 45,5 mg/2 mL · Anafilaksi 2. Basamak',
    title: 'Feniramin Maleat (Avil® 45,5 mg/2 mL)',
    shortDesc: 'Türkiye hastane pratiğinin temel parenteral 1. kuşak H₁ antihistaminiği (Avil®); anafilakside Adrenalin’i geciktirmeyen 2.–3. basamak adjuvan rolü, ≥1–2 dk yavaş IV uygulaması, <2 yaş bebek kontrendikasyonu ve AGS Beers geriatrik deliryum uyarısı.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'TR Ampul & Erişkin Doz',
        value: '45,5 mg / 2 mL (Yavaş IV ≥1–2 dk)',
        subtext: 'Avil® · Maks 2 ampul/gün (91 mg)',
        tooltip: 'Tercihen 1 ampul (2 mL) + 8 mL %0,9 NaCl ile 10 mL’ye tamamlanarak (4,55 mg/mL) ≥1–2 dk yavaş IV veya derin IM verilir; hızlı IV puşe hipotansiyon/nöbet yapabilir',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'Anafilaksi Altın Kuralı (WAO/EAACI)',
        value: 'ASLA 1. BASAMAK DEĞİLDİR!',
        subtext: 'Önce ADRENALİN · Avil® = Cilt Adjuvanı',
        tooltip: 'H₁ antihistaminikler şoku, laringeal ödemi veya bronkospazmı düzeltmez; yalnızca stabilizasyon sonrası ürtiker ve kaşıntı için adjuvan olarak verilir',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      },
      {
        label: 'Pediatrik Yaş Sınırı',
        value: '<2 Yaş Bebeklerde KONTRENDİKE!',
        subtext: '≥2 Yaş: 0,5–1 mg/kg (Maks 45,5 mg)',
        tooltip: 'Yenidoğan ve <1–2 yaş süt çocuklarında paradoksal SSS eksitasyonu, konvülsiyon ve solunum depresyonu riski nedeniyle kontrendikedir',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      },
      {
        label: 'Geriatri (Beers 2023) & Opioid Kaşıntısı',
        value: 'M₁ Antikolinerjik Deliryum Riski',
        subtext: 'Nöraksiyel Morfin: Ondansetron/Nalokson',
        tooltip: '>65 yaşta postop deliryum, idrar retansiyonu ve dar açılı glokom tetikler; nöraksiyel opioid kaşıntısı histamin değil µ-reseptör aracılıdır',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30'
      }
    ]
  },
  {
    id: 'pantoprazole',
    category: 'medications',
    categories: ['medications'],
    categoryLabel: 'Proton Pompa İnhibitörü (PPI · IV / PO)',
    badge: 'Pantpas® / Pulcet® 40 mg · REVISE / SUP-ICU',
    title: 'Pantoprazol Sodyum (PANTOprazole · Pantpas® / Pulcet®)',
    shortDesc: 'En düşük CYP2C19 inhibisyonuna sahip IV/PO proton pompa inhibitörü; akut üst GİS kanaması (80 mg bolus → 8 mg/sa vs 40 mg q12sa), YBÜ stres ülseri profilaksisi (SUP-ICU & REVISE NEJM 2024), aspirasyon profilaksisi ve pH 9–10,5 Y-site güvenliği.',
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: 'teal',
    highlightsHeader: 'Protokol Temel Parametreleri:',
    highlights: [
      {
        label: 'Akut Üst GİS Kanaması (ACG/ESGE)',
        value: '80 mg IV → 8 mg/sa (72 sa)',
        subtext: 'Alternatif: 40 mg IV q12sa (Sachar)',
        tooltip: '80 mg / 100 mL SF (0,8 mg/mL → 10 mL/sa) veya 40 mg IV q12sa aralıklı rejim non-varisiyel yüksek riskli ülser kanamasında etkindir',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30'
      },
      {
        label: 'YBÜ Stres Ülseri (REVISE 2024)',
        value: '40 mg IV q24sa (Yüksek Risk)',
        subtext: 'Mekanik Ventilasyon / Koagülopati',
        tooltip: 'REVISE (NEJM 2024) ve SUP-ICU (NEJM 2018): Klinik anlamlı GİS kanamasını azaltır, mortaliteye nötrdür; risk geçince kesilmelidir',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30'
      },
      {
        label: 'Klopidogrel & CYP2C19 Avantajı',
        value: 'En Düşük CYP2C19 İnhibisyonu',
        subtext: 'Omeprazol Yerine 1. Tercih PPI',
        tooltip: 'Klopidogrelin aktif metabolite dönüşümünü anlamlı bozmaz; dual antiplatelet kullanan hastalarda tercih edilen PPI’dir',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30'
      },
      {
        label: 'Alkali pH & Uzun Süreli Riskler',
        value: 'pH 9–10,5 · Mg²⁺ / C. diff / Beers',
        subtext: 'Midazolam / NA / Vankomisin Uyumsuz',
        tooltip: 'Alkali çözelti nedeniyle Y-site çökelti yapar (ayrı lümen/SF flush); kronik kullanımda hipomagnezemi, C. difficile ve AIN riski izlenir',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30'
      }
    ]
  },
  ...ALL_ANTIMICROBIALS.map<ProtocolCardItem>((abx) => ({
    id: abx.id,
    category: 'antibiotics',
    categories: ['antibiotics', 'medications'],
    categoryLabel: abx.cardCategoryLabel,
    badge: abx.cardBadge,
    title: abx.cardTitle,
    shortDesc: abx.cardShortDesc,
    status: 'active',
    hasStandaloneHeader: true,
    accentColor: abx.accentColor,
    highlightsHeader: 'YBÜ & Perioperatif Temel Parametreler:',
    highlights: abx.cardHighlights
  }))
];

export const TreatmentsWorkspace: React.FC<Props> = ({ isDark, initialProtocolId }) => {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>('medications');
  // null = kartlar galerisi, 'magnesium', 'potassium', 'sodium', 'dexmedetomidine', 'remifentanil', 'fentanyl', etc.
  const [activeProtocolId, setActiveProtocolId] = useState<string | null>(initialProtocolId || null);
  const [mgViewMode, setMgViewMode] = useState<MagnesiumViewMode>('all');
  const [kViewMode, setKViewMode] = useState<PotassiumViewMode>('all');
  const [naViewMode, setNaViewMode] = useState<SodiumViewMode>('all');

  useEffect(() => {
    if (initialProtocolId !== undefined && initialProtocolId !== null) {
      setActiveProtocolId(initialProtocolId);
    }
  }, [initialProtocolId]);

  useEffect(() => {
    const handleHash = () => {
      const route = parseHashRoute();
      if (route.type === 'tedavi' && route.id) {
        setActiveProtocolId(route.id);
      } else if (route.type === 'arac' && route.id === 'treatments' && !route.subId) {
        setActiveProtocolId(null);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectProtocol = (id: string) => {
    setActiveProtocolId(id);
    updateHashRoute('tedavi', id);
  };

  const handleCloseProtocol = () => {
    setActiveProtocolId(null);
    updateHashRoute('arac', 'treatments');
  };

  const getCategoryCount = (cat: TreatmentCategory) => {
    return PROTOCOL_CARDS.filter(card => {
      if (card.categories && card.categories.length > 0) {
        return card.categories.includes(cat);
      }
      return card.category === cat;
    }).length;
  };

  const medCount = getCategoryCount('medications');
  const generalAnestheticsCount = getCategoryCount('general_anesthetics');
  const antihypertensivesCount = getCategoryCount('antihypertensives');
  const antibioticsCount = getCategoryCount('antibiotics');
  const sedationCount = getCategoryCount('sedation');
  const antidotesCount = getCategoryCount('antidotes');
  const diureticsCount = getCategoryCount('diuretics');
  const electrolyteCount = getCategoryCount('electrolyte');
  const vasoactiveCount = getCategoryCount('vasoactive');
  const hemostasisCount = getCategoryCount('hemostasis');

  const filteredCards = PROTOCOL_CARDS.filter(card => {
    if (card.categories && card.categories.length > 0) {
      return card.categories.includes(activeCategory);
    }
    return card.category === activeCategory;
  });
  const aliasMap: Record<string, string> = {
    noradrenalin: 'norepinephrine',
    adrenalin: 'epinephrine',
    sevofloran: 'sevoflurane',
    desfloran: 'desflurane',
    asetazolamid: 'acetazolamide',
    diazomid: 'acetazolamide',
    furosemid: 'furosemide',
    lasix: 'furosemide',
    desal: 'furosemide',
    atropin: 'atropine',
    'atropin-sulfat': 'atropine',
    efedrin: 'ephedrine',
    'efedrin-hcl': 'ephedrine',
    nalokson: 'naloxone',
    narcan: 'naloxone',
    anexate: 'flumazenil',
    dopamin: 'dopamine',
    dopmin: 'dopamine',
    dopadren: 'dopamine',
    dobutamin: 'dobutamine',
    dobutasel: 'dobutamine',
    dobuthaver: 'dobutamine',
    sugammadeks: 'sugammadex',
    bridion: 'sugammadex',
    brimadeks: 'sugammadex',
    hidrokortizon: 'hydrocortisone',
    'hydrocort-liyo': 'hydrocortisone',
    hidrozon: 'hydrocortisone',
    'solu-cortef': 'hydrocortisone',
    deksametazon: 'dexamethasone',
    dekort: 'dexamethasone',
    onadron: 'dexamethasone',
    deksamet: 'dexamethasone',
    gadexon: 'dexamethasone',
    metilprednizolon: 'methylprednisolone',
    prednol: 'methylprednisolone',
    'prednol-l': 'methylprednisolone',
    precort: 'methylprednisolone',
    'precort-liyo': 'methylprednisolone',
    cortipol: 'methylprednisolone',
    'solu-medrol': 'methylprednisolone',
    tiyopental: 'thiopental',
    'tiyopental-sodyum': 'thiopental',
    pental: 'thiopental',
    'pental-sodyum': 'thiopental',
    tyosod: 'thiopental',
    txa: 'tranexamic-acid',
    'traneksamik-asit': 'tranexamic-acid',
    traneksamik: 'tranexamic-acid',
    transamine: 'tranexamic-acid',
    herajit: 'tranexamic-acid',
    tranex: 'tranexamic-acid',
    esmelol: 'esmolol',
    'esmolol-hcl': 'esmolol',
    brevibloc: 'esmolol',
    nikardipin: 'nicardipine',
    cardene: 'nicardipine',
    loxen: 'nicardipine',
    'gliserol-trinitrat': 'glyceryl-trinitrate',
    nitrogliserin: 'glyceryl-trinitrate',
    nitroglycerin: 'glyceryl-trinitrate',
    perlinganit: 'glyceryl-trinitrate',
    nitronal: 'glyceryl-trinitrate',
    gtn: 'glyceryl-trinitrate',
    ntg: 'glyceryl-trinitrate',
    'sodyum-nitroprussid': 'sodium-nitroprusside',
    'sodyum-nitroprusid': 'sodium-nitroprusside',
    nitroprussid: 'sodium-nitroprusside',
    nitroprusid: 'sodium-nitroprusside',
    nipruss: 'sodium-nitroprusside',
    snp: 'sodium-nitroprusside',
    feniramin: 'pheniramine',
    'feniramin-maleat': 'pheniramine',
    'pheniramine-maleate': 'pheniramine',
    avil: 'pheniramine',
    pantoprazol: 'pantoprazole',
    pantpas: 'pantoprazole',
    pulcet: 'pantoprazole',
    panto: 'pantoprazole',
    protonix: 'pantoprazole',
    ...ANTIMICROBIAL_ALIAS_MAP
  };
  const normalizedProtocolId = activeProtocolId ? (aliasMap[activeProtocolId.toLowerCase()] || activeProtocolId) : null;
  const selectedProtocol = PROTOCOL_CARDS.find(card => card.id === normalizedProtocolId);
  const activeAntimicrobial = normalizedProtocolId ? ANTIMICROBIAL_MAP[normalizedProtocolId] : undefined;

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
                onClick={handleCloseProtocol}
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
                {!(activeProtocolId && selectedProtocol?.hasStandaloneHeader) && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-mono">
                    {activeProtocolId ? 'Protokol Detayı' : 'Klinik Protokoller'}
                  </span>
                )}
              </div>
              {!(activeProtocolId && selectedProtocol?.hasStandaloneHeader) && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {activeProtocolId
                    ? 'Protokolü kapatıp listeye dönmek için geri butonunu kullanabilir veya alt sekmelerle görünümü özelleştirebilirsiniz.'
                    : 'Anestezi, reanimasyon ve yoğun bakımda kanıta dayalı ilaç hazırlama, doz hesaplayıcıları ve klinik replasman protokolleri'
                  }
                </p>
              )}
            </div>
          </div>

          {activeProtocolId && (
            <button
              type="button"
              onClick={handleCloseProtocol}
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
              <span>İlaçlar</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-mono font-bold">
                {medCount} İlaç
              </span>
            </button>

            {/* 2. Genel Anestezikler */}
            <button
              type="button"
              onClick={() => setActiveCategory('general_anesthetics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'general_anesthetics'
                  ? isDark 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-xs' 
                    : 'bg-amber-50 text-amber-800 border border-amber-400 shadow-xs'
                  : isDark 
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-amber-500" />
              <span>Genel Anestezikler</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono font-bold">
                {generalAnestheticsCount} İlaç
              </span>
            </button>

            {/* 3. Sedoanaljezi & Nöromüsküler */}
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
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-600 dark:text-purple-400 font-mono font-bold">
                {sedationCount} İlaç
              </span>
            </button>

            {/* 4. Antidotlar */}
            <button
              type="button"
              onClick={() => setActiveCategory('antidotes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'antidotes'
                  ? isDark 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-xs' 
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-400 shadow-xs'
                  : isDark 
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Antidotlar</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                {antidotesCount} İlaç
              </span>
            </button>

            {/* 4. Diüretikler */}
            <button
              type="button"
              onClick={() => setActiveCategory('diuretics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'diuretics'
                  ? isDark 
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-xs' 
                    : 'bg-sky-50 text-sky-800 border border-sky-400 shadow-xs'
                  : isDark 
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-sky-500" />
              <span>Diüretikler</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-700 dark:text-sky-300 font-mono font-bold">
                {diureticsCount} İlaç
              </span>
            </button>

            {/* 5. Elektrolit & Sıvı Replasmanı */}
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
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-600 dark:text-teal-400 font-mono font-bold">
                {electrolyteCount} Protokol
              </span>
            </button>

            {/* Sürekli İnfüzyon & Vazoaktif Protokolleri */}
            <button
              type="button"
              onClick={() => setActiveCategory('vasoactive')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
              <span>Sürekli İnfüzyon &amp; Vazoaktif Protokolleri</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                vasoactiveCount > 0 
                  ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-sans'
              }`}>
                {vasoactiveCount > 0 ? `${vasoactiveCount} Protokol` : 'Modüler'}
              </span>
            </button>

            {/* Anti-hipertansifler */}
            <button
              type="button"
              onClick={() => setActiveCategory('antihypertensives')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'antihypertensives'
                  ? isDark
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-xs'
                    : 'bg-indigo-50 text-indigo-800 border border-indigo-400 shadow-xs'
                  : isDark
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-indigo-500" />
              <span>Anti-hipertansifler</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono font-bold">
                {antihypertensivesCount} İlaç
              </span>
            </button>

            {/* Antibiyotikler (YBÜ & Perioperatif) */}
            <button
              type="button"
              onClick={() => setActiveCategory('antibiotics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'antibiotics'
                  ? isDark
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-400 shadow-xs'
                  : isDark
                    ? 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-500" />
              <span>Antibiyotikler</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                {antibioticsCount} Ajan
              </span>
            </button>

            {/* Hemostaz & Kan Transfüzyon Yönetimi */}
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
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                hemostasisCount > 0 
                  ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-sans'
              }`}>
                {hemostasisCount > 0 ? `${hemostasisCount} Protokol` : 'Modüler'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* GÖRÜNÜM 1: PROTOKOL KARTLARI GALERİSİ (activeProtocolId === null) */}
      {!activeProtocolId && filteredCards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Uygulamak veya incelemek istediğiniz ilaç ve tedavi protokolünü seçin:</span>
            <span className="font-mono text-[11px] font-semibold">{filteredCards.length} Protokol</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map((card) => {
              const isActive = card.status === 'active';
              return (
                <a
                  key={card.id}
                  href={isActive ? `#tedavi=${card.id}` : undefined}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      return;
                    }
                    // Standart sol tık yapıldıysa (Ctrl/Cmd/Shift tuşları basılı değilse) SPA içi hızlı geçiş
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      handleSelectProtocol(card.id);
                    }
                  }}
                  className={`group relative p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between select-none block no-underline text-inherit ${
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
                            title={h.tooltip}
                            className={`p-2 rounded-lg border flex flex-col justify-between text-left transition-colors ${h.bgClass} ${h.borderClass} ${h.tooltip ? 'cursor-help' : ''}`}
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
                </a>
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

      {/* GÖRÜNÜM 9: MİDAZOLAM PROTOKOLÜ VE DOZ HESAPLAYICISI (activeProtocolId === 'midazolam') */}
      {activeProtocolId === 'midazolam' && (
        <MidazolamProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 10: LİDOKAİN PROTOKOLÜ VE DOZ HESAPLAYICISI (activeProtocolId === 'lidocaine') */}
      {activeProtocolId === 'lidocaine' && (
        <LidocaineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 11: KETAMİN PROTOKOLÜ VE DOZ HESAPLAYICISI (activeProtocolId === 'ketamine') */}
      {activeProtocolId === 'ketamine' && (
        <KetamineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 12: NORADRENALİN (NOREPİNEFRİN) PROTOKOLÜ VE DOZ HESAPLAYICISI */}
      {(activeProtocolId === 'norepinephrine' || activeProtocolId === 'noradrenalin') && (
        <NorepinephrineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 13: ADRENALİN (EPİNEFRİN) PROTOKOLÜ VE DOZ HESAPLAYICISI */}
      {(activeProtocolId === 'epinephrine' || activeProtocolId === 'adrenalin') && (
        <EpinephrineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 14: SEVOFLURAN MONOGRAFİSİ & MAC HESAPLAYICISI */}
      {(activeProtocolId === 'sevoflurane' || activeProtocolId === 'sevofloran') && (
        <SevofluraneProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 15: DESFLURAN MONOGRAFİSİ & MAC / CO2e HESAPLAYICISI */}
      {(activeProtocolId === 'desflurane' || activeProtocolId === 'desfloran') && (
        <DesfluraneProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 16: ASETAZOLAMİD MONOGRAFİSİ & RENAL / DOZ HESAPLAYICISI */}
      {(activeProtocolId === 'acetazolamide' || activeProtocolId === 'asetazolamid' || activeProtocolId === 'diazomid') && (
        <AcetazolamideProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 17: FUROSEMİD MONOGRAFİSİ & DOSE / İNFÜZYON / FST HESAPLAYICISI */}
      {(activeProtocolId === 'furosemide' || activeProtocolId === 'furosemid' || activeProtocolId === 'lasix' || activeProtocolId === 'desal') && (
        <FurosemideProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 18: ATROPİN SÜLFAT MONOGRAFİSİ & ACLS / NMB / ORGANOFOSFAT HESAPLAYICISI */}
      {(activeProtocolId === 'atropine' || activeProtocolId === 'atropin' || activeProtocolId === 'atropin-sulfat') && (
        <AtropineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 19: EFEDRİN HİDROKLORÜR MONOGRAFİSİ & BOLUS / TAŞİFLAKSİ / OBSTETRİK HESAPLAYICISI */}
      {(activeProtocolId === 'ephedrine' || activeProtocolId === 'efedrin' || activeProtocolId === 'efedrin-hcl') && (
        <EphedrineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 20: NALOKSON HİDROKLORÜR MONOGRAFİSİ & PACU / BOYER İNFÜZYON / KAŞINTI HESAPLAYICISI */}
      {(activeProtocolId === 'naloxone' || activeProtocolId === 'nalokson' || activeProtocolId === 'narcan') && (
        <NaloxoneProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 21: FLUMAZENİL MONOGRAFİSİ & PROSEDÜREL REVERSAL / PEDİATRİK / ZEHİRLENME / İNFÜZYON HESAPLAYICISI */}
      {(activeProtocolId === 'flumazenil' || activeProtocolId === 'anexate') && (
        <FlumazenilProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 22: DOPAMİN HİDROKLORÜR MONOGRAFİSİ & D1/β1/α1 DOZ-BAĞIMLI İNFÜZYON HESAPLAYICISI */}
      {(activeProtocolId === 'dopamine' || activeProtocolId === 'dopamin' || activeProtocolId === 'dopmin' || activeProtocolId === 'dopadren') && (
        <DopamineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 23: DOBUTAMİN HİDROKLORÜR MONOGRAFİSİ & İNODİLATÖR (β1 >> β2) İNFÜZYON HESAPLAYICISI */}
      {(activeProtocolId === 'dobutamine' || activeProtocolId === 'dobutamin' || activeProtocolId === 'dobutasel' || activeProtocolId === 'dobuthaver') && (
        <DobutamineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 24: SUGAMMADEKS SODYUM MONOGRAFİSİ & TOF / PTC / CICO FLAKON HESAPLAYICISI */}
      {(activeProtocolId === 'sugammadex' || activeProtocolId === 'sugammadeks' || activeProtocolId === 'bridion' || activeProtocolId === 'brimadeks') && (
        <SugammadexProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 25: HİDROKORTİZON SODYUM SÜKSİNAT MONOGRAFİSİ & SEPTİK ŞOK / ADRENAL KRİZ / STEROİD EŞDEĞERLİK HESAPLAYICISI */}
      {(activeProtocolId === 'hydrocortisone' || activeProtocolId === 'hidrokortizon' || activeProtocolId === 'hydrocort-liyo' || activeProtocolId === 'hidrozon' || activeProtocolId === 'solu-cortef') && (
        <HydrocortisoneProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 26: DEKSAMETAZON SODYUM FOSFAT MONOGRAFİSİ & PONV / HAVAYOLU / BEYİN ÖDEMİ / ARDS HESAPLAYICISI */}
      {(activeProtocolId === 'dexamethasone' || activeProtocolId === 'deksametazon' || activeProtocolId === 'dekort' || activeProtocolId === 'onadron' || activeProtocolId === 'deksamet' || activeProtocolId === 'gadexon') && (
        <DexamethasoneProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 27: METİLPREDNİZOLON SODYUM SÜKSİNAT MONOGRAFİSİ & BRONKOSPAZM / STRİDOR / ARDS / PULSE HESAPLAYICISI */}
      {(activeProtocolId === 'methylprednisolone' || activeProtocolId === 'metilprednizolon' || activeProtocolId === 'prednol' || activeProtocolId === 'prednol-l' || activeProtocolId === 'precort' || activeProtocolId === 'precort-liyo' || activeProtocolId === 'cortipol' || activeProtocolId === 'solu-medrol') && (
        <MethylprednisoloneProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 28: TİYOPENTAL SODYUM MONOGRAFİSİ & İNDÜKSİYON / BARBİTÜRAT KOMASI / SRSE / IA ACİL HESAPLAYICISI */}
      {(activeProtocolId === 'thiopental' || activeProtocolId === 'tiyopental' || activeProtocolId === 'tiyopental-sodyum' || activeProtocolId === 'pental' || activeProtocolId === 'pental-sodyum' || activeProtocolId === 'tyosod') && (
        <ThiopentalProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 29: TRANEKSAMİK ASİT (TXA) MONOGRAFİSİ & HEMOSTAZ / CPB / RENAL HESAPLAYICISI */}
      {normalizedProtocolId === 'tranexamic-acid' && (
        <TranexamicAcidProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 30: ESMOLOL MONOGRAFİSİ & ULTRA-KISA β₁ İNFÜZYON / AORT DİSEKSİYONU HESAPLAYICISI */}
      {normalizedProtocolId === 'esmolol' && (
        <EsmololProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 31: NİKARDİPİN MONOGRAFİSİ & VASKÜLER SELEKTİF KKB / İKH / PREEKLAMPSİ HESAPLAYICISI */}
      {normalizedProtocolId === 'nicardipine' && (
        <NicardipineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 32: GLİSEROL TRİNİTRAT (NİTROGLİSERİN / PERLINGANIT) MONOGRAFİSİ & VENODİLATATÖR / TOKOLİZ HESAPLAYICISI */}
      {normalizedProtocolId === 'glyceryl-trinitrate' && (
        <GlycerylTrinitrateProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 33: SODYUM NİTROPRUSSİD (NİPRUSS / SNP) MONOGRAFİSİ & SİYANÜR TOKSİSİTESİ HESAPLAYICISI */}
      {normalizedProtocolId === 'sodium-nitroprusside' && (
        <SodiumNitroprussideProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 34: FENİRAMİN MALEAT (AVİL) MONOGRAFİSİ & H₁ ANTİHİSTAMİNİK / PEDİATRİK / ANAFİLAKSİ ADJUVAN HESAPLAYICISI */}
      {normalizedProtocolId === 'pheniramine' && (
        <PheniramineProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 35: PANTOPRAZOL SODYUM MONOGRAFİSİ & GİS KANAMA / YBÜ SUP / ASPİRASYON HESAPLAYICISI */}
      {normalizedProtocolId === 'pantoprazole' && (
        <PantoprazoleProtocol isDark={isDark} />
      )}

      {/* GÖRÜNÜM 36–52: 17 YBÜ & PERİOPERATİF ANTİMİKROBİYAL (ANTİBİYOTİKLER & ANTİFUNGAL) MONOGRAFİLERİ */}
      {activeAntimicrobial && (
        <AntimicrobialMonographView data={activeAntimicrobial} isDark={isDark} />
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
            {activeCategory === 'general_anesthetics' && 'Genel Anestezikler (İnhalasyon & IV)'}
            {activeCategory === 'antihypertensives' && 'Anti-hipertansifler'}
            {activeCategory === 'antibiotics' && 'Antibiyotikler & Antifungaller'}
            {activeCategory === 'antidotes' && 'Antidotlar'}
            {activeCategory === 'diuretics' && 'Diüretikler'}
            {activeCategory === 'vasoactive' && 'Sürekli İnfüzyon & Vazoaktif Protokolleri'}
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
