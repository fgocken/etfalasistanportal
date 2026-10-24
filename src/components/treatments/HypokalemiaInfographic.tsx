import React, { useState } from 'react';
import { 
  Heart, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Info, 
  Stethoscope,
  Flame,
  Utensils
} from 'lucide-react';

interface Props {
  isDark: boolean;
}

type ClinicalSystemKey = 'cardio' | 'neuromuscular' | 'gi' | 'metabolic';
type SeverityKey = 'mild' | 'severe';

interface SeverityDetail {
  badge: string;
  findings: string[];
  mechanism: string;
  ecgLab: string;
}

interface SystemData {
  title: string;
  icon: string;
  LucideIcon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  mild: SeverityDetail;
  severe: SeverityDetail;
}

export const HypokalemiaInfographic: React.FC<Props> = ({ isDark }) => {
  const [activeSystem, setActiveSystem] = useState<ClinicalSystemKey>('cardio');
  const [severity, setSeverity] = useState<SeverityKey>('mild');

  const clinicalData: Record<ClinicalSystemKey, SystemData> = {
    cardio: {
      title: "Kardiyovasküler Sistem & EKG",
      icon: "🫀",
      LucideIcon: Heart,
      iconColor: "text-rose-500",
      mild: {
        badge: "3.0 – 3.5 mEq/L • Hafif / Orta Hipokalemi",
        findings: [
          "Sinüs taşikardisi ve supraventriküler aritmiler",
          "Prematür Ventriküler Kontraksiyonlar (PVC)",
          "T dalgasında düzleşme veya hafif bifazik görünüm",
          "Hafif ST segment depresyonu"
        ],
        mechanism: "Hücre dışı K⁺ düşüşü, istirahat membran potansiyelini hiperpolarize eder ancak membran eksitabilitesini artırır ve faz 3 repolarizasyonunu uzatır.",
        ecgLab: "EKG: T dalgasında düzleşme, hafif ST depresyonu, erken ventriküler atımlar (PVC)"
      },
      severe: {
        badge: "< 3.0 mEq/L • Şiddetli Hipokalemi",
        findings: [
          "Belirgin U dalgası oluşumu (T dalgası ile birleşen dev U dalgası)",
          "Ventriküler Taşikardi (VT), Polimorfik VT (Torsades de Pointes)",
          "Ventriküler Fibrilasyon (VF) ve asistoli riski",
          "Digital toksisitesine belirgin duyarlılık artışı"
        ],
        mechanism: "Gecikmiş repolarizasyon ve I_Kr potasyum akımının çökmesi erken ard-depolarizasyonlara (EAD) ve fatal reentry ventriküler aritmilere yol açar.",
        ecgLab: "EKG: Belirgin U dalgaları (> 1 mm), PR uzaması, QRS genişlemesi, pseudo-uzamış QT (aslında QU aralığı) ve ventriküler fibrilasyon"
      }
    },
    neuromuscular: {
      title: "Nöromusküler Sistem",
      icon: "⚡",
      LucideIcon: Zap,
      iconColor: "text-amber-500",
      mild: {
        badge: "3.0 – 3.5 mEq/L • Hafif / Orta Hipokalemi",
        findings: [
          "Hafif genel kas güçsüzlüğü ve halsizlik",
          "Bacak krampları (özellikle alt ekstremite baldır krampları)",
          "Derin tendon reflekslerinde (DTR) hafif azalma",
          "Çabuk yorulma ve efor dispnesi"
        ],
        mechanism: "İstirahat membran potansiyelinin hiperpolarizasyonu nöromüsküler uyarılabilirliği baskılamaya başlar ve kas kontraksiyon gücünü zayıflatır.",
        ecgLab: "Klinik: Proksimal kas zayıflığı, baldırlarda kramp, tendon reflekslerinde hiporefleksi başlangıcı"
      },
      severe: {
        badge: "< 3.0 mEq/L • Şiddetli Hipokalemi",
        findings: [
          "Asendan flask paralizi (bacaklardan kollara doğru yayılan felç)",
          "Solunum kas yetmezliği ve diyafram paralizisi (mekanik ventilatör gereksinimi)",
          "Rabdomiyoliz (akut kas nekrozu ve miyoglobinüri)",
          "Areflaksi (DTR'lerin tamamen kaybı)"
        ],
        mechanism: "Şiddetli hiperpolarizasyon kas hücresi membranının depolarize olmasını engeller; iskemik kas hasarı ve masif rabdomiyoliz tetiklenir.",
        ecgLab: "Laboratuvar / Klinik: CK (kreatin kinaz) ve miyoglobin artışı, solunum asidozu, quadriparezi tablosu"
      }
    },
    gi: {
      title: "Gastrointestinal Sistem (GİS)",
      icon: "🍽️",
      LucideIcon: Utensils,
      iconColor: "text-orange-500",
      mild: {
        badge: "3.0 – 3.5 mEq/L • Hafif / Orta Hipokalemi",
        findings: [
          "Bağırsak hareketlerinde azalma",
          "İnatçı kabızlık (konstipasyon)",
          "Hafif karın şişkinliği ve gaz distansiyonu",
          "Bulantı ve iştahsızlık"
        ],
        mechanism: "GİS düz kas hücrelerinde kalsiyum duyarlılığının ve peristaltik uyarılabilirliğin hipokalemiye bağlı azalması.",
        ecgLab: "Klinik: Bağırsak seslerinde azalma, batın distansiyonu, gecikmiş gastrik boşalma"
      },
      severe: {
        badge: "< 3.0 mEq/L • Şiddetli Hipokalemi",
        findings: [
          "Paralitik İleus (bağırsak seslerinin tamamen kaybolması)",
          "Şiddetli abdominal distansiyon ve psödo-obstrüksiyon (Ogilvie sendromu)",
          "İntolerans, masif nazogastrik drenaj",
          "Bağırsak perforasyonu ve iskemi riski"
        ],
        mechanism: "Düz kas atonisi nedeniyle bağırsak duvarı tamamen felç olur, lümen hava ve sıvı ile dolarak masif ileus tablosu oluşturur.",
        ecgLab: "Radyoloji / Klinik: Düz batın grafisinde yaygın hava-sıvı seviyeleri, sessiz batın, oral beslenmenin durması"
      }
    },
    metabolic: {
      title: "Metabolik & Renal Tablo",
      icon: "🧪",
      LucideIcon: Activity,
      iconColor: "text-purple-500",
      mild: {
        badge: "3.0 – 3.5 mEq/L • Hafif / Orta Hipokalemi",
        findings: [
          "Hafif metabolik alkaloz eğilimi",
          "Hücre dışına K⁺ çıkışı karşılığında hücre içine H⁺ girişi",
          "Hafif idrar konsantrasyon defekti (noktüri / poliüri)"
        ],
        mechanism: "Hipokalemi proksimal tübülde bikarbonat geri emilimini ve amonyogenezi uyararak metabolik alkaloza zemin hazırlar.",
        ecgLab: "Laboratuvar: Kan gazında artmış HCO₃⁻ (> 26 mEq/L), pH yüksekliği (metabolik alkaloz)"
      },
      severe: {
        badge: "< 3.0 mEq/L • Şiddetli Hipokalemi",
        findings: [
          "Dirençli Hipokalemi (Magnezyum eksikliği ile birlikte)",
          "Şiddetli Metabolik Alkaloz (tedaviye dirençli)",
          "Nefrojenik Diyabetes İnsipidus (idrarı konsantre edememe, masif poliüri)",
          "İnsülin salınımında azalma ve glukoz intoleransı (hiperglisemi)"
        ],
        mechanism: "ROMK kanallarının açık kalması (Mg eksikliğiyle kombine), medüller tübüllerde aquaporin-2 ekspresyonunun baskılanması ve pankreas beta hücrelerinden insülin sekresyonunun inhibisyonu.",
        ecgLab: "Laboratuvar: Kan gazında yüksek pH ve HCO3-, düşük idrar dansitesi (< 1005), hiperglisemi, dirençli elektrolit tablosu"
      }
    }
  };

  const currentSystem = clinicalData[activeSystem];
  const currentSection = currentSystem[severity];

  return (
    <div className={`p-5 sm:p-6 rounded-2xl shadow-xl border transition-all ${
      isDark ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'
    }`}>
      {/* Başlık ve Açıklama */}
      <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2">
            <span>📊</span> Hipokalemi Klinik Bulgular &amp; EKG Matriksi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Serum K⁺ düzeyine göre organ sistemleri, patofizyolojik mekanizmalar ve EKG tanısal bulguları
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold self-start sm:self-auto ${
          isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          Normal Referans: 3.5 – 5.1 mEq/L
        </div>
      </div>

      {/* Sistem Sekmeleri */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        {(Object.entries(clinicalData) as [ClinicalSystemKey, SystemData][]).map(([key, item]) => {
          const isSelected = activeSystem === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSystem(key)}
              className={`p-3 rounded-xl text-left transition-all flex items-center gap-2.5 border cursor-pointer ${
                isSelected
                  ? isDark
                    ? 'bg-teal-600/20 border-teal-500 text-teal-300 font-semibold shadow-md ring-1 ring-teal-500/30'
                    : 'bg-teal-50 border-teal-400 text-teal-950 font-semibold shadow-xs ring-1 ring-teal-400/30'
                  : isDark
                    ? 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className="text-xs sm:text-sm font-semibold truncate">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Şiddet Filtresi (Toggle) */}
      <div className={`p-1 rounded-xl mb-6 border flex gap-1 ${
        isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          type="button"
          onClick={() => setSeverity('mild')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer text-center ${
            severity === 'mild'
              ? isDark
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'bg-white text-amber-900 border border-amber-300 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          🟡 3.0 – 3.5 mEq/L • Hafif / Orta Hipokalemi
        </button>
        <button
          type="button"
          onClick={() => setSeverity('severe')}
          className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer text-center ${
            severity === 'severe'
              ? isDark
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-xs'
                : 'bg-white text-rose-900 border border-rose-300 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          🔴 &lt; 3.0 mEq/L • Şiddetli Hipokalemi
        </button>
      </div>

      {/* İçerik Kartı */}
      <div className={`border rounded-xl p-5 sm:p-6 transition-all space-y-5 ${
        isDark ? 'bg-slate-800/80 border-slate-700 shadow-inner' : 'bg-slate-50/80 border-slate-200'
      }`}>
        {/* Sistem Başlığı & Şiddet Rozeti */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{currentSystem.icon}</span>
            <span>{currentSystem.title}</span>
          </h3>
          <span className={`text-xs px-3 py-1 rounded-full font-bold self-start sm:self-auto font-mono ${
            severity === 'mild'
              ? isDark ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-900 border border-amber-300'
              : isDark ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-rose-100 text-rose-900 border border-rose-300'
          }`}>
            {currentSection.badge}
          </span>
        </div>

        {/* 1. Blok: Klinik Bulgular & Semptomlar */}
        <div>
          <h4 className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
            <span>Klinik Bulgular &amp; Semptomlar</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentSection.findings.map((finding, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                  isDark 
                    ? 'bg-slate-900/80 border-slate-800 text-slate-200' 
                    : 'bg-white border-slate-200 text-slate-800 shadow-xs'
                }`}
              >
                <span className={`h-2 w-2 rounded-full shrink-0 ${
                  severity === 'mild' ? 'bg-amber-400' : 'bg-rose-500'
                }`} />
                <span className="leading-snug">{finding}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Blok: Patofizyolojik Mekanizma */}
        <div className={`p-4 rounded-xl border ${
          isDark 
            ? 'bg-teal-950/30 border-teal-900/50 text-teal-200' 
            : 'bg-teal-50 border-teal-200 text-teal-900'
        }`}>
          <h4 className="text-[11px] uppercase tracking-wider font-bold mb-1.5 text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            <span>Patofizyolojik Mekanizma</span>
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            {currentSection.mechanism}
          </p>
        </div>

        {/* 3. Blok: EKG & Laboratuvar Özellikleri */}
        <div className={`p-4 rounded-xl border ${
          isDark 
            ? 'bg-slate-900/90 border-slate-700/80 text-slate-200' 
            : 'bg-white border-slate-200 text-slate-800 shadow-xs'
        }`}>
          <h4 className="text-[11px] uppercase tracking-wider font-bold mb-1.5 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Stethoscope className="w-4 h-4" />
            <span>EKG &amp; Laboratuvar Bulguları</span>
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed font-medium font-mono text-slate-700 dark:text-slate-300">
            {currentSection.ecgLab}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HypokalemiaInfographic;
