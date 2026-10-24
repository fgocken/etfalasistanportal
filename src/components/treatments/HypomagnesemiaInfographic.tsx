import React, { useState } from 'react';
import { 
  Heart, 
  Brain, 
  Zap, 
  Activity, 
  CheckCircle2,
  Info,
  Stethoscope
} from 'lucide-react';

interface Props {
  isDark: boolean;
}

type ClinicalSystemKey = 'cardio' | 'neuromuscular' | 'metabolic' | 'cns';
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

export const HypomagnesemiaInfographic: React.FC<Props> = ({ isDark }) => {
  const [activeSystem, setActiveSystem] = useState<ClinicalSystemKey>('cardio');
  const [severity, setSeverity] = useState<SeverityKey>('mild');

  const clinicalData: Record<ClinicalSystemKey, SystemData> = {
    cardio: {
      title: "Kardiyovasküler Sistem",
      icon: "🫀",
      LucideIcon: Heart,
      iconColor: "text-rose-500",
      mild: {
        badge: "< 1.5 mg/dL • Hafif / Orta Hipomagnezemi",
        findings: [
          "Atriyal Fibrilasyon",
          "Prematür Ventriküler Kılavuzlar (PVC)",
          "T Dalgası Düzleşmesi / İnversiyonu"
        ],
        mechanism: "Magnezyum eksikliği, Na+/K+-ATPaz pompasını inhibe ederek istirahat membran potansiyelini instabil hale getirir ve miyokardiyal eksitabiliteyi artırır.",
        ecgLab: "EKG: PR aralığı uzaması, T dalgası Düzleşmesi / İnversiyonu, ST segment depresyonu"
      },
      severe: {
        badge: "< 1.0 mg/dL • Şiddetli Hipomagnezemi",
        findings: [
          "Torsades de Pointes",
          "Uzamış QT Aralığı",
          "Belirgin U Dalgası",
          "Ventriküler Taşikardi (VT) / Fibrilasyon"
        ],
        mechanism: "Şiddetli eksiklik potasyum akımını bozar, repolarizasyonu belirgin geciktirir ve erken sonrası depolarizasyonlara (EAD) neden olarak fatal ventricular aritmileri tetikler.",
        ecgLab: "EKG: Belirgin QTc uzaması (>480 ms), Polimorfik VT (Torsades de Pointes), Belirgin U dalgaları"
      }
    },
    neuromuscular: {
      title: "Nöromusküler Sistem",
      icon: "⚡",
      LucideIcon: Zap,
      iconColor: "text-amber-500",
      mild: {
        badge: "< 1.5 mg/dL • Hafif / Orta Hipomagnezemi",
        findings: [
          "Tremor",
          "Fasikülasyonlar",
          "Hiperrefleksi"
        ],
        mechanism: "Magnezyum presinaptik asetilkolin salınımını doğal olarak inhibe eder. Düşük seviyelerde ACh salınımı artar ve nöromusküler kavşakta uyarılabilirlik yükselir.",
        ecgLab: "Klinik: Kas seğirmeleri, kas zayıflığı ve derin tendon reflekslerinde (DTR) artış"
      },
      severe: {
        badge: "< 1.0 mg/dL • Şiddetli Hipomagnezemi",
        findings: [
          "Tetani",
          "Pozitif Chvostek Belirtisi",
          "Pozitif Trousseau Belirtisi",
          "Laringospazm"
        ],
        mechanism: "Mg2+, N-tipi kalsiyum kanallarının fizyolojik blokörüdür. Yokluğunda artan presinaptik Ca2+ girişi spontan motor sinir depolarizasyonuna ve sürekli kas kasılmasına (tetani) yol açar.",
        ecgLab: "Klinik: Karpopedal spazm, laringeal stridor, belirgin mekanik ve nöral aşırı uyarılabilirlik"
      }
    },
    metabolic: {
      title: "Metabolik Tablo",
      icon: "🧪",
      LucideIcon: Activity,
      iconColor: "text-purple-500",
      mild: {
        badge: "< 1.5 mg/dL • Hafif / Orta Hipomagnezemi",
        findings: [
          "Asemptomatik Hipokalemi Eğilimi",
          "Asemptomatik Hipokalsemi Eğilimi"
        ],
        mechanism: "Böbrek distal tübüllerinde ROMK kanallarının magnezyum ile inhibisyonu zayıflar ve hafif idrar potasyum kaybı başlar.",
        ecgLab: "Laboratuvar: Sınırda serum K+ ve Ca2+ düşüklüğü, klinik olarak hafif düzeyde seyreder."
      },
      severe: {
        badge: "< 1.0 mg/dL • Şiddetli Hipomagnezemi",
        findings: [
          "Dirençli Hipokalemi",
          "Dirençli Hipokalsemi",
          "PTH Supresyonu & Son-Organ Direnci"
        ],
        mechanism: "Şiddetli Mg2+ eksikliği ROMK kanallarındaki intrasellüler bloğu tamamen kaldırır, tübüler K+ kaybını kontrolden çıkarır. Ayrıca PTH salınımını ve PTH reseptör duyarlılığını felç eder.",
        ecgLab: "Laboratuvar: Tedaviye yanıtsız dirençli elektrolit bozukluğu; Mg2+ replasmanı yapılmadan K+ ve Ca2+ düzeltilemez."
      }
    },
    cns: {
      title: "Santral Sinir Sistemi (SSS)",
      icon: "🧠",
      LucideIcon: Brain,
      iconColor: "text-sky-500",
      mild: {
        badge: "< 1.5 mg/dL • Hafif / Orta Hipomagnezemi",
        findings: [
          "Apati",
          "Ajitasyon",
          "Depresif Ruh Hali",
          "Anoreksi / İştahsızlık"
        ],
        mechanism: "NMDA reseptörlerinin presinaptik Mg2+ blokajının azalması ile merkezi sinir sisteminde ılımlı nöronal eksitotoksisite ve nörotransmitter dengesizliği gelişir.",
        ecgLab: "Klinik / EEG: Yaygın non-spesifik EEG yavaşlaması veya nöropsikiyatrik belirtiler"
      },
      severe: {
        badge: "< 1.0 mg/dL • Şiddetli Hipomagnezemi",
        findings: [
          "Konfüzyon",
          "Deliryum",
          "Jeneralize Nöbet",
          "Koma"
        ],
        mechanism: "NMDA reseptörlerindeki voltaj bağımlı magnezyum bloğunun tamamen kalkması masif nöronal kalsiyum akışına, şiddetli eksitotoksisiteye ve nöbet deşarjlarına yol açar.",
        ecgLab: "Klinik / EEG: Deliryum, fokal/jeneralize konvülziyonlar, EEG anormallikleri"
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
          <h2 className="text-lg sm:text-xl font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2">
            <span>📊</span> Hipomagnezemi Klinik Bulgular Matriksi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sistemik organ etkileri, patofizyolojik mekanizmalar ve EKG / laboratuvar bulguları
          </p>
        </div>

        <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold self-start sm:self-auto ${
          isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          Normal Referans: 1.7 – 2.4 mg/dL
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
                    ? 'bg-sky-600/20 border-sky-500 text-sky-300 font-semibold shadow-md ring-1 ring-sky-500/30'
                    : 'bg-sky-50 border-sky-400 text-sky-950 font-semibold shadow-xs ring-1 ring-sky-400/30'
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
          🟡 &lt; 1.5 mg/dL • Hafif / Orta Hipomagnezemi
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
          🔴 &lt; 1.0 mg/dL • Şiddetli Hipomagnezemi
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
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
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
            ? 'bg-sky-950/30 border-sky-900/50 text-sky-200' 
            : 'bg-sky-50 border-sky-200 text-sky-900'
        }`}>
          <h4 className="text-[11px] uppercase tracking-wider font-bold mb-1.5 text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
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
            <span>EKG &amp; Laboratuvar Özellikleri</span>
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed font-medium font-mono text-slate-700 dark:text-slate-300">
            {currentSection.ecgLab}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HypomagnesemiaInfographic;
