import React, { useState } from 'react';
import { 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Copy, 
  Check, 
  Info, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  Activity,
  ShieldAlert,
  Stethoscope
} from 'lucide-react';

interface MaceCalculatorProps {
  isDark: boolean;
}

type TabType = 'rcri' | 'nsqip';

export const MaceCalculator: React.FC<MaceCalculatorProps> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<TabType>('rcri');
  const [copied, setCopied] = useState<boolean>(false);
  const [showLiterature, setShowLiterature] = useState<boolean>(false);

  // --- RCRI State ---
  const [rcriCriteria, setRcriCriteria] = useState({
    highRiskSurgery: false,
    ischemicHeart: false,
    heartFailure: false,
    cerebrovascular: false,
    diabetesInsulin: false,
    renalFailure: false
  });

  // --- NSQIP Gupta State ---
  const [nsqipAge, setNsqipAge] = useState<number>(0); // 0: <65, 0.5: 65-74, 1.0: 75-84, 1.5: >=85
  const [nsqipFunc, setNsqipFunc] = useState<number>(0); // 0: Bağımsız, 0.6: Kısmen, 1.2: Tam bağımlı
  const [nsqipAsa, setNsqipAsa] = useState<number>(0); // 0: I/II, 0.8: III, 1.5: IV, 2.2: V
  const [nsqipCreatinine, setNsqipCreatinine] = useState<number>(0); // 0: <=1.5, 0.5: >1.5
  const [nsqipProcedure, setNsqipProcedure] = useState<number>(0); // 0: Düşük, 0.8: Orta, 1.5: Yüksek

  // --- RCRI Calculation (Modern External Validation: CCS & MDCalc Guidelines) ---
  const rcriScore = Object.values(rcriCriteria).filter(Boolean).length;
  
  interface RcriData {
    percent: number;
    ci: string;
    className: string;
    category: 'Düşük Risk' | 'Artmış Risk';
  }

  const getRcriData = (score: number): RcriData => {
    switch (score) {
      case 0:
        return { percent: 3.9, ci: '%2.8 – %5.4', className: 'Sınıf I', category: 'Düşük Risk' };
      case 1:
        return { percent: 6.0, ci: '%4.9 – %7.4', className: 'Sınıf II', category: 'Artmış Risk' };
      case 2:
        return { percent: 10.1, ci: '%8.1 – %12.6', className: 'Sınıf III', category: 'Artmış Risk' };
      default: // >=3 (3, 4, 5, 6 kriter)
        return { percent: 15.0, ci: '%11.1 – %20.0', className: 'Sınıf IV', category: 'Artmış Risk' };
    }
  };

  const rcriCurrent = getRcriData(rcriScore);
  const rcriRiskPercent = rcriCurrent.percent;
  const isRcriHighRisk = rcriScore >= 1; // Modern doğrulamada skoru >=1 olanlar artmış risk grubundadır

  // --- NSQIP Gupta Calculation ---
  const intercept = -5.5;
  const nsqipLogit = intercept + nsqipAge + nsqipFunc + nsqipAsa + nsqipCreatinine + nsqipProcedure;
  const nsqipProbability = 1 / (1 + Math.exp(-nsqipLogit));
  const nsqipRiskPercent = parseFloat((nsqipProbability * 100).toFixed(2));
  const isNsqipHighRisk = nsqipRiskPercent >= 1.0;

  // Active Model Results
  const currentRiskPercent = activeTab === 'rcri' ? rcriRiskPercent : nsqipRiskPercent;
  const isHighRisk = activeTab === 'rcri' ? isRcriHighRisk : isNsqipHighRisk;

  // Reset function
  const handleReset = () => {
    if (activeTab === 'rcri') {
      setRcriCriteria({
        highRiskSurgery: false,
        ischemicHeart: false,
        heartFailure: false,
        cerebrovascular: false,
        diabetesInsulin: false,
        renalFailure: false
      });
    } else {
      setNsqipAge(0);
      setNsqipFunc(0);
      setNsqipAsa(0);
      setNsqipCreatinine(0);
      setNsqipProcedure(0);
    }
  };

  // Copy Summary to Clipboard
  const handleCopy = () => {
    let report = '';
    if (activeTab === 'rcri') {
      const positiveItems: string[] = [];
      if (rcriCriteria.highRiskSurgery) positiveItems.push('Yüksek Riskli Cerrahi (İntraperitoneal, intratorasik, suprainguinal vasküler)');
      if (rcriCriteria.ischemicHeart) positiveItems.push('İskemik Kalp Hastalığı Öyküsü (Geçirilmiş MI, anjina, nitrat)');
      if (rcriCriteria.heartFailure) positiveItems.push('Konjestif Kalp Yetmezliği Öyküsü (Pulmoner ödem, S3, raller)');
      if (rcriCriteria.cerebrovascular) positiveItems.push('Serebrovasküler Hastalık Öyküsü (İnme, TIA)');
      if (rcriCriteria.diabetesInsulin) positiveItems.push('İnsülin Bağımlı Diyabet');
      if (rcriCriteria.renalFailure) positiveItems.push('Preoperatif Kreatinin > 2.0 mg/dL');

      report = `[PREOPERATİF KARDİYAK RİSK (MACE) DEĞERLENDİRMESİ]
Yöntem: RCRI (Revised Cardiac Risk Index / Modern Doğrulama Modeli - CCS & MDCalc)
Sonuç: ${rcriScore}/6 Puan (${rcriCurrent.className})
Hesaplanan MACE Riski: %${rcriRiskPercent} (95% Güven Aralığı: ${rcriCurrent.ci})
Risk Kategorisi: ${rcriCurrent.category.toUpperCase()}
Pozitif Kriterler: ${positiveItems.length > 0 ? positiveItems.join('; ') : 'Yok (0 risk faktörü)'}
Klinik Öneri: ${rcriScore >= 1 
  ? `MACE riski %${rcriRiskPercent} düzeyindedir (Artmış Risk). ACC/AHA, ESC ve CCS kılavuzlarına göre fonksiyonel kapasite (METs) sorgulanmalıdır. METs < 4 ise kardiyoloji konsültasyonu, kardiyak biyobelirteç (hs-cTn / BNP) ve ileri tetkik (Eko, stres testi) değerlendirilmelidir.` 
  : 'Hasta düşük risk grubundadır (MACE riski %3.9, 95% GA: %2.8–%5.4). Rutin ek invaziv/non-invaziv kardiyak test gerekmeden cerrahiye devam edilebilir.'}`;
    } else {
      report = `[PREOPERATİF KARDİYAK RİSK (MACE) DEĞERLENDİRMESİ]
Yöntem: NSQIP MICA (Gupta Perioperatif Kardiyak Risk Modeli)
Hesaplanan MACE Riski: %${nsqipRiskPercent}
Risk Kategorisi: ${isNsqipHighRisk ? 'YÜKSEK / ARTMİŞ RİSK (≥ %1)' : 'DÜŞÜK RİSK (< %1)'}
Klinik Öneri: ${isNsqipHighRisk 
  ? 'MACE riski %1 üzerinde. Fonksiyonel kapasite (METs) ve ileri kardiyak inceleme (Eko, EKG, kardiyoloji konsültasyonu) değerlendirilmelidir.' 
  : 'Düşük risk kategorisi (< %1). İleri non-invaziv test gerekmeksizin cerrahiye devam edilebilir.'}`;
    }

    navigator.clipboard.writeText(report).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className={`rounded-2xl border transition-all ${
      isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Üst Başlık */}
      <div className={`p-5 sm:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50/70'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${
            isDark ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' : 'bg-rose-50 text-rose-600 border border-rose-200'
          }`}>
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                MACE Risk Hesaplayıcı
              </h2>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                isDark ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                Pre-op Kardiyak Değerlendirme
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Major Adverse Cardiac Events (Miyokard İnfarktüsü, Kardiyak Arrest, Mortalite) Risk Tahmini
            </p>
          </div>
        </div>

        {/* Aksiyon Butonları: Temizle & Kopyala */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
            }`}
            title="Formu Sıfırla"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Sıfırla</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              copied
                ? isDark 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : isDark 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-2xs'
            }`}
            title="Klinik Raporu Kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Raporu Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Model Seçim Sekmeleri (RCRI vs NSQIP MICA) */}
      <div className={`flex border-b text-xs sm:text-sm font-semibold ${
        isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
      }`}>
        <button
          type="button"
          onClick={() => setActiveTab('rcri')}
          className={`flex-1 py-3 px-4 text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'rcri'
              ? isDark 
                ? 'border-blue-500 text-blue-400 bg-slate-800/50' 
                : 'border-blue-600 text-blue-700 bg-white'
              : isDark 
                ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30' 
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>RCRI (Lee Skoru)</span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            activeTab === 'rcri'
              ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'
              : isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-600'
          }`}>
            6 Kriter
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('nsqip')}
          className={`flex-1 py-3 px-4 text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'nsqip'
              ? isDark 
                ? 'border-blue-500 text-blue-400 bg-slate-800/50' 
                : 'border-blue-600 text-blue-700 bg-white'
              : isDark 
                ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30' 
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>NSQIP MICA (Gupta Modeli)</span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            activeTab === 'nsqip'
              ? isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-800'
              : isDark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-600'
          }`}>
            Lojistik Regresyon
          </span>
        </button>
      </div>

      {/* Form Alanı */}
      <div className="p-5 sm:p-6 space-y-6">
        
        {/* ================= RCRI TAB ================= */}
        {activeTab === 'rcri' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Revised Cardiac Risk Index (Lee Skoru) • <strong>Modern Doğrulama Kohortu (CCS &amp; MDCalc)</strong> oranlarına göre hesaplanır (0: %3.9, 1: %6.0, 2: %10.1, ≥3: %15.0).
              </p>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {rcriScore} / 6 Kriter Seçili
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {/* Kriter 1 */}
              <label className={`flex items-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                rcriCriteria.highRiskSurgery 
                  ? isDark 
                    ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/20' 
                    : 'bg-blue-50 border-blue-400 ring-1 ring-blue-400/20'
                  : isDark 
                    ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700' 
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
              }`}>
                <input
                  type="checkbox"
                  checked={rcriCriteria.highRiskSurgery}
                  onChange={(e) => setRcriCriteria({ ...rcriCriteria, highRiskSurgery: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <div className="ml-3">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    Yüksek Riskli Cerrahi Prosedür
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    İntraperitoneal (laparotomi), intratorasik (torakotomi) veya suprainguinal vasküler (aort, femoral bypass) cerrahi
                  </div>
                </div>
              </label>

              {/* Kriter 2 */}
              <label className={`flex items-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                rcriCriteria.ischemicHeart 
                  ? isDark 
                    ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/20' 
                    : 'bg-blue-50 border-blue-400 ring-1 ring-blue-400/20'
                  : isDark 
                    ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700' 
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
              }`}>
                <input
                  type="checkbox"
                  checked={rcriCriteria.ischemicHeart}
                  onChange={(e) => setRcriCriteria({ ...rcriCriteria, ischemicHeart: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <div className="ml-3">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    İskemik Kalp Hastalığı Öyküsü (CAD)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Geçirilmiş Miyokard İnfarktüsü (MI), pozitif efor/stres testi, anjina pektoris öyküsü, patolojik Q dalgası veya sublingual nitrat kullanımı
                  </div>
                </div>
              </label>

              {/* Kriter 3 */}
              <label className={`flex items-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                rcriCriteria.heartFailure 
                  ? isDark 
                    ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/20' 
                    : 'bg-blue-50 border-blue-400 ring-1 ring-blue-400/20'
                  : isDark 
                    ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700' 
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
              }`}>
                <input
                  type="checkbox"
                  checked={rcriCriteria.heartFailure}
                  onChange={(e) => setRcriCriteria({ ...rcriCriteria, heartFailure: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <div className="ml-3">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    Konjestif Kalp Yetmezliği (KKY / HF) Öyküsü
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Geçirilmiş veya mevcut pulmoner ödem, S3 gallop, bilateral bazal raller veya periferik ödem ile kompanse/dekompanse KKY
                  </div>
                </div>
              </label>

              {/* Kriter 4 */}
              <label className={`flex items-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                rcriCriteria.cerebrovascular 
                  ? isDark 
                    ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/20' 
                    : 'bg-blue-50 border-blue-400 ring-1 ring-blue-400/20'
                  : isDark 
                    ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700' 
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
              }`}>
                <input
                  type="checkbox"
                  checked={rcriCriteria.cerebrovascular}
                  onChange={(e) => setRcriCriteria({ ...rcriCriteria, cerebrovascular: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <div className="ml-3">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    Serebrovasküler Hastalık (İnme / GİA) Öyküsü
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Geçirilmiş iskemik/hemorajik inme (Stroke) veya Geçici İskemik Atak (GİA / TIA) anamnezi
                  </div>
                </div>
              </label>

              {/* Kriter 5 */}
              <label className={`flex items-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                rcriCriteria.diabetesInsulin 
                  ? isDark 
                    ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/20' 
                    : 'bg-blue-50 border-blue-400 ring-1 ring-blue-400/20'
                  : isDark 
                    ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700' 
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
              }`}>
                <input
                  type="checkbox"
                  checked={rcriCriteria.diabetesInsulin}
                  onChange={(e) => setRcriCriteria({ ...rcriCriteria, diabetesInsulin: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <div className="ml-3">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    İnsülin Tedavisi Gerektiren Diabetes Mellitus
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Preoperatif dönemde subkutan veya IV insülin kullanma zorunluluğu (Yalnızca oral antidiyabetik alanlar dahil edilmez)
                  </div>
                </div>
              </label>

              {/* Kriter 6 */}
              <label className={`flex items-start p-3.5 rounded-xl border transition-all cursor-pointer ${
                rcriCriteria.renalFailure 
                  ? isDark 
                    ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/20' 
                    : 'bg-blue-50 border-blue-400 ring-1 ring-blue-400/20'
                  : isDark 
                    ? 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700' 
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
              }`}>
                <input
                  type="checkbox"
                  checked={rcriCriteria.renalFailure}
                  onChange={(e) => setRcriCriteria({ ...rcriCriteria, renalFailure: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                />
                <div className="ml-3">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                    Preoperatif Serum Kreatinin &gt; 2.0 mg/dL (177 µmol/L)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Kronik böbrek hastalığı veya akut/kronik renal disfonksiyon bulgusu
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* ================= NSQIP MICA TAB ================= */}
        {activeTab === 'nsqip' && (
          <div className="space-y-4">
            <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gupta Perioperatif Kardiyak Risk Modeli (NSQIP MICA), 200.000+ hasta verisinden türetilen ve yaş, fonksiyonel durum, ASA ve prosedürü birleştiren çok değişkenli risk tahminidir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Yaş Aralığı */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  1. Yaş Aralığı
                </label>
                <select
                  value={nsqipAge}
                  onChange={(e) => setNsqipAge(parseFloat(e.target.value))}
                  className={`w-full text-xs sm:text-sm rounded-xl border p-2.5 transition-colors cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 shadow-2xs'
                  }`}
                >
                  <option value="0">&lt; 65 Yaş (Referans)</option>
                  <option value="0.5">65 – 74 Yaş (+0.5 katsayı)</option>
                  <option value="1.0">75 – 84 Yaş (+1.0 katsayı)</option>
                  <option value="1.5">≥ 85 Yaş (+1.5 katsayı)</option>
                </select>
              </div>

              {/* 2. Fonksiyonel Kapasite */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  2. Fonksiyonel Kapasite (Günlük Yaşam Aktiviteleri)
                </label>
                <select
                  value={nsqipFunc}
                  onChange={(e) => setNsqipFunc(parseFloat(e.target.value))}
                  className={`w-full text-xs sm:text-sm rounded-xl border p-2.5 transition-colors cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 shadow-2xs'
                  }`}
                >
                  <option value="0">Bağımsız (Independent - Kendi bakımını yapabiliyor)</option>
                  <option value="0.6">Kısmen Bağımlı (Partially Dependent - Yardım gerektiriyor)</option>
                  <option value="1.2">Tam Bağımlı (Totally Dependent - Yatağa/başkasına tam bağımlı)</option>
                </select>
              </div>

              {/* 3. ASA Sınıflandırması */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  3. ASA Fiziksel Durum Sınıflaması
                </label>
                <select
                  value={nsqipAsa}
                  onChange={(e) => setNsqipAsa(parseFloat(e.target.value))}
                  className={`w-full text-xs sm:text-sm rounded-xl border p-2.5 transition-colors cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 shadow-2xs'
                  }`}
                >
                  <option value="0">ASA I - Normal sağlıklı hasta</option>
                  <option value="0">ASA II - Hafif sistemik hastalığı olan</option>
                  <option value="0.8">ASA III - Şiddetli sistemik hastalığı olan (+0.8)</option>
                  <option value="1.5">ASA IV - Yaşamı sürekli tehdit eden şiddetli hastalık (+1.5)</option>
                  <option value="2.2">ASA V - Ameliyatsız yaşam beklentisi olmayan (+2.2)</option>
                </select>
              </div>

              {/* 4. Preoperatif Kreatinin */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  4. Preoperatif Kreatinin &gt; 1.5 mg/dL
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNsqipCreatinine(0)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      nsqipCreatinine === 0
                        ? isDark 
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300 ring-1 ring-blue-500/30' 
                          : 'bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-400/30'
                        : isDark 
                          ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Hayır (≤ 1.5 mg/dL)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNsqipCreatinine(0.5)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      nsqipCreatinine === 0.5
                        ? isDark 
                          ? 'bg-rose-600/20 border-rose-500 text-rose-300 ring-1 ring-rose-500/30' 
                          : 'bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-400/30'
                        : isDark 
                          ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Evet (&gt; 1.5 mg/dL)
                  </button>
                </div>
              </div>

              {/* 5. Cerrahi Prosedür Grubu */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  5. Cerrahi Prosedür Grubu
                </label>
                <select
                  value={nsqipProcedure}
                  onChange={(e) => setNsqipProcedure(parseFloat(e.target.value))}
                  className={`w-full text-xs sm:text-sm rounded-xl border p-2.5 transition-colors cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-blue-500' 
                      : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 shadow-2xs'
                  }`}
                >
                  <option value="0">Endoskopik / Yüzeyel / Oftalmolojik / Ayaktan (Düşük Risk)</option>
                  <option value="0.8">Genel Cerrahi / İntraabdominal / Torasik / Ortopedik (Orta Risk)</option>
                  <option value="1.5">Suprainguinal Vasküler / Açık Aort / Majör Rekonstrüksiyon (Yüksek Risk)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ================= SONUÇ PANELİ ================= */}
        <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isHighRisk 
            ? isDark 
              ? 'bg-rose-950/20 border-rose-900/60 ring-1 ring-rose-500/20' 
              : 'bg-rose-50/60 border-rose-200 ring-1 ring-rose-400/20'
            : isDark 
              ? 'bg-emerald-950/20 border-emerald-900/60 ring-1 ring-emerald-500/20' 
              : 'bg-emerald-50/60 border-emerald-200 ring-1 ring-emerald-400/20'
        }`}>
          {/* Üst Kısım: Model Başlığı, Skor ve Yüzde */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                HESAPLANAN PERİOPERATİF MACE RİSKİ
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {activeTab === 'rcri' ? `RCRI: ${rcriScore} / 6 (${rcriCurrent.className})` : 'NSQIP MICA Modeli'}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isHighRisk 
                    ? isDark ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-rose-100 text-rose-800 border border-rose-200'
                    : isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {activeTab === 'rcri' ? (rcriScore >= 1 ? 'ARTMIŞ RİSK' : 'DÜŞÜK RİSK') : (isHighRisk ? 'YÜKSEK RİSK' : 'DÜŞÜK RİSK')}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-mono ${
                isHighRisk 
                  ? 'text-rose-600 dark:text-rose-400' 
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}>
                %{currentRiskPercent.toFixed(1)}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                {activeTab === 'rcri' ? `95% GA: ${rcriCurrent.ci}` : '(Eşik Değer: %1.0)'}
              </span>
            </div>
          </div>

          {/* Klinik Karar Destek & Kılavuz Algoritması */}
          <div className="mt-4 space-y-3">
            <div className={`p-4 rounded-xl flex items-start gap-3 border ${
              isHighRisk 
                ? isDark 
                  ? 'bg-rose-900/30 border-rose-800 text-rose-200' 
                  : 'bg-white border-rose-200 text-rose-950 shadow-2xs'
                : isDark 
                  ? 'bg-emerald-900/30 border-emerald-800 text-emerald-200' 
                  : 'bg-white border-emerald-200 text-emerald-950 shadow-2xs'
            }`}>
              {isHighRisk ? (
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <div className="text-xs sm:text-sm space-y-1">
                <div className="font-bold text-sm">
                  {activeTab === 'rcri' 
                    ? (rcriScore >= 1 
                        ? `Artmış Risk Kategorisi • MACE %${rcriRiskPercent}` 
                        : 'Düşük Risk Kategorisi • MACE %3.9')
                    : (isHighRisk 
                        ? 'Artmış / Yüksek Risk Kategorisi (MACE ≥ %1.0)' 
                        : 'Düşük Risk Kategorisi (MACE < %1.0)')}
                </div>
                <p className="leading-relaxed opacity-90">
                  {activeTab === 'rcri' 
                    ? (rcriScore >= 1 
                        ? `Hastada ${rcriScore} adet majör kardiyak risk faktörü mevcuttur. Modern dış doğrulama serilerine (CCS & MDCalc) göre 30 günlük MACE riski %${rcriRiskPercent}'dir (95% GA: ${rcriCurrent.ci}). ACC/AHA, ESC ve CCS kılavuzlarına göre fonksiyonel kapasite (METs) sorgulanmalıdır.` 
                        : 'Hastada hiçbir risk kriteri bulunmamaktadır. Modern doğrulama kohortu (rutin postop troponin takipli) verilerine göre bazal MACE riski %3.9\'dur (95% GA: %2.8 – %5.4). Rutin ek kardiyak tetkik gerekmeksizin cerrahiye devam edilebilir.')
                    : (isHighRisk 
                        ? 'Hastanın perioperatif majör kardiyak olay riski %1 ve üzerindedir. ACC/AHA ve ESC kılavuzlarına göre fonksiyonel kapasite (METs) sorgulanmalıdır.' 
                        : 'Hastanın perioperatif majör kardiyak olay riski %1\'in altındadır. Kılavuzlara göre genellikle ileri invaziv/non-invaziv test gerekmeksizin cerrahiye devam edilebilir.')}
                </p>
              </div>
            </div>

            {/* Kılavuz Basamakları (Adım Adım Yol Haritası) */}
            <div className={`p-4 rounded-xl border text-xs space-y-2.5 ${
              isDark ? 'bg-slate-800/80 border-slate-700/80 text-slate-300' : 'bg-white/80 border-slate-200 text-slate-700'
            }`}>
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-blue-500" />
                <span>ACC/AHA &amp; ESC Perioperatif Kılavuz Algoritması</span>
              </div>

              {isHighRisk ? (
                <div className="space-y-2 pl-1">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <strong>Fonksiyonel Kapasite (METs ≥ 4):</strong> Hasta 2 kat merdiven çıkabiliyor, yokuş yukarı yürüyebiliyor veya orta/ağır ev işi yapabiliyorsa ileri teste gerek kalmadan cerrahiye devam edilebilir.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <div>
                      <strong>Düşük veya Bilinmeyen Kapasite (METs &lt; 4):</strong> Kardiyoloji konsültasyonu, 12 derivasyonlu istirahat EKG'si, transtorasik ekokardiyografi (TTE) ve cerrahi yönetimini değiştirecekse farmakolojik stres testi planlanmalıdır.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div>
                      <strong>İntraoperatif Strateji:</strong> Yakın hemodinamik stabilite, hipotansiyon ve taşikardiden kaçınma, gerektiğinde invaziv arteriyel basınç kanülasyonu ve postoperatif kardiyak enzim (Troponin) takibi planlanmalıdır.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 pl-1">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div>
                      <strong>Cerrahi Plan:</strong> Planlanan cerrahi prosedür için kardiyak açıdan ek bir gecikmeye gerek yoktur.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <div>
                      <strong>Monitörizasyon:</strong> Standart ASA intraoperatif monitörizasyonu (EKG, SpO2, NIBP, Kapnografi) yeterlidir.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= LİTERATÜR & REFERANSLAR AÇILIR BÖLÜM ================= */}
        <div className={`border-t pt-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <button
            type="button"
            onClick={() => setShowLiterature(!showLiterature)}
            className={`flex items-center justify-between w-full text-left text-xs font-semibold cursor-pointer transition-colors ${
              isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>Literatür, Validasyon &amp; Referanslar (RCRI &amp; NSQIP Gupta)</span>
            </span>
            {showLiterature ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showLiterature && (
            <div className={`mt-3 p-4 rounded-xl text-xs space-y-3 ${
              isDark ? 'bg-slate-800/60 border border-slate-700/80 text-slate-300' : 'bg-slate-50 border border-slate-200 text-slate-700'
            }`}>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">1. Modern Dış Doğrulama Kohortu (CCS &amp; MDCalc):</div>
                <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                  Devereaux PJ, et al. Canadian Cardiovascular Society Guidelines on Perioperative Cardiac Risk Assessment and Management. <em>Can J Cardiol</em>. 2017;33(1):17-32. Rutin postoperatif troponin monitörizasyonlu güncel kohort verileri (0: %3.9, 1: %6.0, 2: %10.1, ≥3: %15.0).
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-900 dark:text-white">2. Orijinal RCRI Çalışması (Lee et al.):</div>
                <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                  Lee TH, Marcantonio ER, Mangione CM, et al. Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery. <em>Circulation</em>. 1999;100(10):1043-1049. (İlk kohort oranları: %0.4, %0.9, %6.6, %11.0).
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-900 dark:text-white">3. NSQIP MICA Modeli (Gupta et al.):</div>
                <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                  Gupta PK, Gupta H, Sundaram A, et al. Development and validation of a risk calculator for prediction of cardiac risk after surgery. <em>Circulation</em>. 2011;124(4):381-387.
                </div>
              </div>

              <div>
                <div className="font-bold text-slate-900 dark:text-white">3. Uluslararası Kılavuzlar:</div>
                <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                  • 2024 AHA/ACC Clinical Practice Guideline for Perioperative Cardiovascular Evaluation and Management.<br />
                  • 2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery.
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MaceCalculator;
