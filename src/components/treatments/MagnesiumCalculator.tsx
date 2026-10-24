import React, { useState, useId } from 'react';
import { 
  Calculator, 
  FlaskConical, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Droplet,
  ShieldAlert,
  Check
} from 'lucide-react';

interface Props {
  isDark: boolean;
}

type MgUnit = 'mg/dL' | 'mmol/L' | 'mEq/L';
type EgfrTier = 'normal' | 'moderate' | 'severe';
type CarrierFluid = 'sf' | 'dex5';
type LineType = 'peripheral' | 'central';

export const MagnesiumCalculator: React.FC<Props> = ({ isDark }) => {
  const currentMgInputId = useId();
  const targetMgInputId = useId();
  const customBagInputId = useId();

  // State
  const [unit, setUnit] = useState<MgUnit>('mg/dL');
  const [currentVal, setCurrentVal] = useState<string>('1.4');
  const [targetVal, setTargetVal] = useState<string>('2.2');
  const [egfrTier, setEgfrTier] = useState<EgfrTier>('normal');
  const [carrierFluid, setCarrierFluid] = useState<CarrierFluid>('sf');
  
  // Damar Yolu Türü: Periferik Damar Yolu (PIV) vs Santral Venöz Kateter (CVP/SVK)
  const [lineType, setLineType] = useState<LineType>('peripheral');
  
  // Taşıyıcı Torba Hacmi (mL): elle girilebilir veya hazır butonlarla seçilebilir
  const [bagVolume, setBagVolume] = useState<number>(100);
  const [customBagInput, setCustomBagInput] = useState<string>('100');
  
  // Torbadan ampul hacmi kadar sıvı çekilip atılsın mı? (Drenaj / Hacim Dengeleme)
  const [drainBagVolume, setDrainBagVolume] = useState<boolean>(false);
  
  const [showLiterature, setShowLiterature] = useState<boolean>(false);
  const [showSessionRationale, setShowSessionRationale] = useState<boolean>(false);
  const [infusionPaceMultiplier, setInfusionPaceMultiplier] = useState<number>(2.0); // 1.5 saat veya 2.0 saat / ampul

  // Dönüşüm katsayıları (Temel birim: mg/dL)
  // 1 mmol/L = 2.4305 mg/dL
  // 1 mEq/L  = 1.2152 mg/dL
  const toMgDl = (val: number, u: MgUnit): number => {
    if (u === 'mmol/L') return val * 2.4305;
    if (u === 'mEq/L') return val * 1.2152;
    return val;
  };

  const fromMgDl = (valMgDl: number, u: MgUnit): number => {
    if (u === 'mmol/L') return valMgDl / 2.4305;
    if (u === 'mEq/L') return valMgDl / 1.2152;
    return valMgDl;
  };

  const parsedCurrent = parseFloat(currentVal) || 0;
  const parsedTarget = parseFloat(targetVal) || 0;

  const currentInMgDl = toMgDl(parsedCurrent, unit);
  const targetInMgDl = toMgDl(parsedTarget, unit);

  // Delta Mg (mg/dL)
  const deltaMgDl = Math.max(0, targetInMgDl - currentInMgDl);

  // Mathews et al. 2022 Artış Katsayıları
  // 1 Ampul = 10 mL %15 MgSO4 = 1.5 g (1500 mg) MgSO4 (~12.16 mEq, ~6.08 mmol)
  const tierConfig = {
    normal: {
      label: 'Normal Böbrek Fonksiyonu (eGFR ≥ 90 mL/dk)',
      short: 'Normal (≥90)',
      risePerGram: 0.10, // mg/dL per 1g
      risePerAmpule: 0.15, // mg/dL per 1.5g ampul
      badgeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
    },
    moderate: {
      label: 'Hafif / Orta Böbrek Yetmezliği (eGFR 30 – 89 mL/dk)',
      short: 'Hafif-Orta (30–89)',
      risePerGram: 0.15, // mg/dL per 1g
      risePerAmpule: 0.22, // mg/dL per 1.5g ampul
      badgeColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
    },
    severe: {
      label: 'Ağır Böbrek Yetmezliği (eGFR < 30 mL/dk)',
      short: 'Ağır (<30)',
      risePerGram: 0.19, // mg/dL per 1g
      risePerAmpule: 0.28, // mg/dL per 1.5g ampul
      badgeColor: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
    }
  };

  const activeTier = tierConfig[egfrTier];

  // Hesaplama
  const exactAmpulesNeeded = deltaMgDl > 0 ? deltaMgDl / activeTier.risePerAmpule : 0;
  const recommendedAmpules = Math.max(1, Math.round(exactAmpulesNeeded));
  const totalGramsMgSo4 = recommendedAmpules * 1.5;
  const totalMgMgSo4 = recommendedAmpules * 1500;
  const totalMeqElemental = recommendedAmpules * 12.16; // ~12 mEq
  const totalMmolElemental = recommendedAmpules * 6.08; // ~6 mmol

  // Beklenen artış (Önerilen ampul sayısına göre)
  const expectedTotalRiseMgDl = recommendedAmpules * activeTier.risePerAmpule;
  const expectedFinalLevelMgDl = currentInMgDl + expectedTotalRiseMgDl;
  const expectedFinalLevelCurrentUnit = fromMgDl(expectedFinalLevelMgDl, unit);

  // Sıvı Hazırlama ve Derişim Hesabı
  // Türkiye standardı: Her ampul 10 mL hacimde 1.5 g (1500 mg) MgSO4 (%15 derişim)
  const safeBagVolume = Math.max(10, bagVolume);
  const ampuleVolumeMl = recommendedAmpules * 10; // 10 cc per ampul

  // Torbadan sıvı boşaltma durumu:
  // Eğer drainBagVolume === true ise, torbadan ampuleVolumeMl çekilir ve atılır.
  // Ancak ampul hacmi torba hacminden büyük veya eşitse (örn. 100 mL torbadan 100 veya 120 mL çekilemez)
  const isDrainImpossible = drainBagVolume && (ampuleVolumeMl >= safeBagVolume);

  let totalSolutionVolumeMl = safeBagVolume;
  if (drainBagVolume && !isDrainImpossible) {
    // Torbadan ampuleVolumeMl çekilip atıldı, yerine ampuleVolumeMl MgSO4 eklendi
    // Nihai hacim = safeBagVolume kalır!
    totalSolutionVolumeMl = safeBagVolume;
  } else {
    // Torbadan sıvı çekilmedi, doğrudan üzerine eklendi
    // Nihai hacim = safeBagVolume + ampuleVolumeMl olur!
    totalSolutionVolumeMl = safeBagVolume + ampuleVolumeMl;
  }

  // TEK VE KESİN NİHAİ ÇÖZELTİ DERİŞİMİ (mg/mL ve %):
  const concentrationMgPerMl = totalSolutionVolumeMl > 0 ? (totalMgMgSo4 / totalSolutionVolumeMl) : 0;
  const concentrationPercent = concentrationMgPerMl / 10;

  // İnfüzyon Süresi ve Hızı
  // Kural: 1.5g ampul başına min 1.5 - 2 saat yavaş infüzyon
  const totalInfusionHours = recommendedAmpules * infusionPaceMultiplier;
  const infusionRateMlPerHour = totalInfusionHours > 0 ? Math.round(totalSolutionVolumeMl / totalInfusionHours) : 0;

  // Damar Yolu Güvenlik & Flebit Değerlendirmesi
  // Kural (Klinik Standart):
  // - Periferik Damar Yolu: Maksimum konsantrasyon <%20 (200 mg/mL)
  // - Santral Venöz Kateter (CVP/SVK): Maksimum güvenli konsantrasyon sınırı <%50 (500 mg/mL)
  const isPeripheralLimitExceeded = concentrationPercent > 20.0;
  const isCentralLimitExceeded = concentrationPercent > 50.0;
  
  // Ampul hacminin torba hacmini aşma durumu (fiziksel hacim tutarsızlığı)
  const isAmpuleVolumeExceedsBag = ampuleVolumeMl > safeBagVolume;

  let lineSafetyStatus: 'safe' | 'danger' = 'safe';
  let lineSafetyMessage = '';

  if (lineType === 'peripheral') {
    if (!isPeripheralLimitExceeded) {
      lineSafetyStatus = 'safe';
      lineSafetyMessage = `Periferik Damar Yolu İçin Güvenli (< %20 / < 200 mg/mL). Çözelti derişimi: %${concentrationPercent.toFixed(1)} (${concentrationMgPerMl.toFixed(0)} mg/mL).`;
    } else {
      lineSafetyStatus = 'danger';
      lineSafetyMessage = `DİKKAT: Periferik sınır (%20 / 200 mg/mL) aşıldı! Çözelti derişimi %${concentrationPercent.toFixed(1)} (${concentrationMgPerMl.toFixed(0)} mg/mL). Venöz irritasyon ve flebit riski nedeniyle Santral Venöz Kateter (CVP) kullanınız veya taşıyıcı torba hacmini artırınız.`;
    }
  } else {
    // Santral Hat (CVP/SVK)
    if (!isCentralLimitExceeded) {
      lineSafetyStatus = 'safe';
      lineSafetyMessage = `Santral Venöz Kateter (CVP) İçin Güvenli (< %50 / < 500 mg/mL). Çözelti derişimi: %${concentrationPercent.toFixed(1)} (${concentrationMgPerMl.toFixed(0)} mg/mL).`;
    } else {
      lineSafetyStatus = 'danger';
      lineSafetyMessage = `DİKKAT: Santral sınır (%50 / 500 mg/mL) aşıldı! Çözelti derişimi %${concentrationPercent.toFixed(1)} (${concentrationMgPerMl.toFixed(0)} mg/mL). Çözeltiyi daha fazla sıvı ile sulandırınız.`;
    }
  }

  // Klinik Akılcılık ve Sanity Sınırları
  const isTargetHypermagnesemic = targetInMgDl > 2.5;
  const isTargetToxicLevel = targetInMgDl >= 3.5;
  const isExtremeDose = recommendedAmpules > 8; // > 12 gram MgSO4
  const isVeryHighDose = recommendedAmpules >= 4 && recommendedAmpules <= 8;

  const handleReset = () => {
    setCurrentVal('1.4');
    setTargetVal('2.2');
    setUnit('mg/dL');
    setEgfrTier('normal');
    setCarrierFluid('sf');
    setLineType('peripheral');
    setBagVolume(100);
    setCustomBagInput('100');
    setDrainBagVolume(false);
    setShowSessionRationale(false);
    setInfusionPaceMultiplier(2.0);
  };

  const handleUnitChange = (newUnit: MgUnit) => {
    if (newUnit === unit) return;
    const currentMg = toMgDl(parsedCurrent, unit);
    const targetMg = toMgDl(parsedTarget, unit);
    setUnit(newUnit);
    setCurrentVal(fromMgDl(currentMg, newUnit).toFixed(2));
    setTargetVal(fromMgDl(targetMg, newUnit).toFixed(2));
  };

  const handleBagVolumePreset = (vol: number) => {
    setBagVolume(vol);
    setCustomBagInput(vol.toString());
  };

  const handleCustomBagChange = (valStr: string) => {
    setCustomBagInput(valStr);
    const parsed = parseInt(valStr, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setBagVolume(parsed);
    }
  };

  return (
    <div className="space-y-6">
      {/* Üst Bilgi Kartı */}
      <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  Magnezyum Replasmanı Hesaplayıcısı
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-mono">
                  Türkiye Standardı: 10 mL %15 MgSO₄ (1.5g)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Mathews et al. (2022) Yoğun Bakım prospektif klinik çalışma verilerine ve eGFR kademelerine göre hedef serum dozu, damar yolu güvenliği (Periferik &lt;%20, CVP &lt;%50) ve ampul hesabı
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            {/* Birim Seçimi */}
            <div className={`inline-flex p-1 rounded-lg border text-xs font-medium ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              {(['mg/dL', 'mmol/L', 'mEq/L'] as MgUnit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => handleUnitChange(u)}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-mono ${
                    unit === u
                      ? isDark 
                        ? 'bg-teal-500 text-white font-bold shadow-xs' 
                        : 'bg-white text-teal-800 font-bold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleReset}
              title="Varsayılana Sıfırla"
              className={`p-1.5 rounded-lg border text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer ${
                isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Türkiye Standart Ampul Özeti */}
        <div className={`mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-lg border text-xs ${
          isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Standart Ampul Hacmi</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">10 mL (10 cc)</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">MgSO₄ Miktarı</span>
            <span className="font-bold text-teal-600 dark:text-teal-400 font-mono">1.5 g (1500 mg)</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Elementel Magnezyum</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">~12 mEq (~6 mmol)</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Ampul Konsantrasyonu</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">%15 (150 mg/mL)</span>
          </div>
        </div>
      </div>

      {/* KLİNİK GÜVENLİK VE AKILCI KONTROL UYARILARI */}
      {isTargetToxicLevel && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-sm font-bold block text-rose-700 dark:text-rose-300">
              ⚠️ Kritik Toksisite Uyarısı: Hedef Düzey Gerçekçi Olmayan Şekilde Yüksek!
            </strong>
            <p>
              Girdiğiniz hedef serum magnezyum değeri ({targetVal} {unit} = {targetInMgDl.toFixed(2)} mg/dL) aşırı yüksektir ve ölümcül hipermagnezemi riski (şiddetli hipotansiyon, AV tam blok, derin tendon refleks kaybı, solunum paralizisi ve kardiyak asistoli) taşır. Normal serum aralığı <strong>1.7 - 2.4 mg/dL</strong>&apos;dir. Yoğun bakım hedefi ise genellikle <strong>2.0 - 2.4 mg/dL</strong> düzeyidir.
            </p>
          </div>
        </div>
      )}

      {!isTargetToxicLevel && isTargetHypermagnesemic && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Fizyolojik Üst Sınır Uyarısı:</strong> Hedeflediğiniz serum düzeyi ({targetVal} {unit}) normal referans aralığın (&gt; 2.4 mg/dL) üzerindedir. Rutin reanimasyon ve kardiyak stabilizasyon hedefleri için genellikle <strong>2.0 – 2.2 mg/dL</strong> düzeyi yeterli ve güvenlidir.
          </div>
        </div>
      )}

      {/* Ana Hesaplama Bölümü: Girdiler & Sonuçlar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SOL: Girdiler (7 Kolon) */}
        <div className={`lg:col-span-7 p-4 sm:p-5 rounded-xl border space-y-5 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-teal-500" />
            1. Hasta Değerleri &amp; Hedef Belirleme
          </h3>

          {/* Mevcut ve Hedef Mg Girişleri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mevcut Serum Mg */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor={currentMgInputId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mevcut Serum Mg ({unit})
                </label>
                <span className="text-[10px] text-slate-400">
                  Ref: {unit === 'mg/dL' ? '1.7 - 2.4' : unit === 'mmol/L' ? '0.7 - 1.0' : '1.4 - 1.9'}
                </span>
              </div>
              <input
                id={currentMgInputId}
                type="number"
                step="0.01"
                min="0"
                value={currentVal}
                onChange={(e) => setCurrentVal(e.target.value)}
                className={`w-full px-3 py-2 text-base font-bold font-mono rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                }`}
                placeholder="1.4"
              />
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[10px] text-slate-400">Hızlı Seç:</span>
                {[1.0, 1.2, 1.4, 1.6].map((v) => {
                  const displayV = unit === 'mg/dL' ? v : parseFloat(fromMgDl(v, unit).toFixed(2));
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setCurrentVal(displayV.toString())}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border cursor-pointer ${
                        isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {displayV}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hedef Serum Mg */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor={targetMgInputId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Hedef Serum Mg ({unit})
                </label>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                  Yoğun Bakım: 2.0 - 2.4
                </span>
              </div>
              <input
                id={targetMgInputId}
                type="number"
                step="0.01"
                min="0"
                value={targetVal}
                onChange={(e) => setTargetVal(e.target.value)}
                className={`w-full px-3 py-2 text-base font-bold font-mono rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                }`}
                placeholder="2.2"
              />
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[10px] text-slate-400">Hedefler:</span>
                {[2.0, 2.2, 2.4].map((v) => {
                  const displayV = unit === 'mg/dL' ? v : parseFloat(fromMgDl(v, unit).toFixed(2));
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setTargetVal(displayV.toString())}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border cursor-pointer transition-colors ${
                        parseFloat(targetVal) === displayV
                          ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold' : 'bg-teal-50 border-teal-500 text-teal-800 font-bold'
                          : isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {displayV}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* eGFR & Böbrek Fonksiyonu Kademesi */}
          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Renal Fonksiyon / eGFR Kademesi (Mathews et al. 2022)
              </label>
              <span className="text-[10px] text-slate-400">
                Böbrek atılımı serum artışını doğrudan etkiler
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(Object.keys(tierConfig) as EgfrTier[]).map((key) => {
                const conf = tierConfig[key];
                const isSelected = egfrTier === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEgfrTier(key)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? isDark 
                          ? 'bg-teal-500/15 border-teal-500 text-teal-200 ring-1 ring-teal-500/30' 
                          : 'bg-teal-50/80 border-teal-500 text-teal-900 ring-1 ring-teal-500/20 shadow-xs'
                        : isDark
                          ? 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                      {conf.short}
                    </div>
                    <div className="text-[10px] mt-1 text-slate-500 dark:text-slate-400">
                      1 Ampul ➔ <strong className="text-teal-600 dark:text-teal-400">+{conf.risePerAmpule} mg/dL</strong>
                    </div>
                    <div className="text-[9px] text-slate-400">
                      (1g ➔ +{conf.risePerGram} mg/dL)
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Damar Yolu Seçimi (Periferik vs Santral Venöz Kateter) */}
          <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-500" />
                2. Damar Yolu Tercihi &amp; Maksimum Derişim Sınırı
              </h3>
              <span className="text-[10px] text-slate-400 font-medium">
                Periferik &lt;%20 | Santral CVP &lt;%50
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLineType('peripheral')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  lineType === 'peripheral'
                    ? isDark 
                      ? 'bg-teal-500/15 border-teal-500 text-teal-200 ring-1 ring-teal-500/30' 
                      : 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-500/20 shadow-xs'
                    : isDark 
                      ? 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    Periferik Damar Yolu (PIV)
                  </span>
                  {lineType === 'peripheral' && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Maksimum güvenli konsantrasyon: <strong>&lt; %20 (200 mg/mL)</strong>. Bu sınırın üzerinde venöz irritasyon ve flebit riski oluşur.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLineType('central')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  lineType === 'central'
                    ? isDark 
                      ? 'bg-cyan-500/15 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500/30' 
                      : 'bg-cyan-50 border-cyan-500 text-cyan-950 ring-1 ring-cyan-500/20 shadow-xs'
                    : isDark 
                      ? 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    Santral Venöz Kateter (CVP / SVK)
                  </span>
                  {lineType === 'central' && <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Maksimum güvenli konsantrasyon sınırı: <strong>&lt; %50 (500 mg/mL)</strong>. Yüksek ozmolarite santral kanda hızla dilüe olur.
                </p>
              </button>
            </div>
          </div>

          {/* 3. Taşıyıcı Sıvı ve Torba Hacmi Ayarları */}
          <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-cyan-500" />
              3. Sıvı Hazırlama, Torba Hacmi &amp; İnfüzyon Hızı
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Sıvı Türü */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Taşıyıcı Sıvı
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCarrierFluid('sf')}
                    className={`py-1.5 px-2 rounded-lg border text-center font-semibold text-xs cursor-pointer ${
                      carrierFluid === 'sf'
                        ? isDark ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200' : 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold'
                        : isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    %0.9 NaCl (SF)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCarrierFluid('dex5')}
                    className={`py-1.5 px-2 rounded-lg border text-center font-semibold text-xs cursor-pointer ${
                      carrierFluid === 'dex5'
                        ? isDark ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200' : 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold'
                        : isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    %5 Dekstroz
                  </button>
                </div>
              </div>

              {/* Serum Torba Hacmi (Hazır Seçenekler + Elle Giriş) */}
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={customBagInputId} className="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    Serum Torba Hacmi (mL / cc)
                  </label>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">
                    Seçili: {bagVolume} cc
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-1.5">
                  {[100, 250, 500, 1000, 3000].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => handleBagVolumePreset(vol)}
                      className={`py-1 px-2.5 rounded-lg border text-center font-mono text-xs cursor-pointer transition-colors ${
                        bagVolume === vol
                          ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-200 font-bold' : 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                          : isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {vol} cc
                    </button>
                  ))}
                  
                  {/* Elle Giriş Kutusu */}
                  <div className="flex items-center gap-1 ml-auto">
                    <span className="text-[10px] text-slate-400">Özel:</span>
                    <input
                      id={customBagInputId}
                      type="number"
                      min="10"
                      max="5000"
                      step="50"
                      value={customBagInput}
                      onChange={(e) => handleCustomBagChange(e.target.value)}
                      placeholder="Örn: 1000"
                      className={`w-20 px-2 py-1 rounded-md text-xs font-mono font-bold border focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                        isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-[10px] text-slate-400">cc</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Torbadan Sıvı Boşaltma Tercihi (Drenaj / Hacim Dengeleme) */}
            <div className={`p-3 rounded-xl border transition-all ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    Torbadan Ampul Hacmi Kadar Sıvı Boşaltılsın mı?
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Hemşire ampulü eklemeden önce torbadan {ampuleVolumeMl} mL SF çekip atacak mı?
                  </p>
                </div>
                <div className={`inline-flex p-1 rounded-lg border text-xs font-semibold shrink-0 ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <button
                    type="button"
                    onClick={() => setDrainBagVolume(false)}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      !drainBagVolume
                        ? isDark ? 'bg-teal-500 text-white font-bold' : 'bg-teal-600 text-white font-bold'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Hayır (Doğrudan Ekle)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrainBagVolume(true)}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      drainBagVolume
                        ? isDark ? 'bg-teal-500 text-white font-bold' : 'bg-teal-600 text-white font-bold'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    Evet (Eşdeğer Hacim Çek)
                  </button>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800/60">
                {drainBagVolume ? (
                  isDrainImpossible ? (
                    <span className="text-rose-600 dark:text-rose-400 font-sans font-semibold">
                      ⚠️ Hata: {safeBagVolume} mL torbadan {ampuleVolumeMl} mL sıvı çekilemez! Torba hacmi yetersiz. Lütfen torba hacmini büyütünüz veya dozu seanslara bölünüz.
                    </span>
                  ) : (
                    <span>
                      💡 <strong>Drenaj Uygulaması:</strong> {safeBagVolume} mL torbadan <strong>{ampuleVolumeMl} mL çekilip atılacak</strong>, kalan torbaya {ampuleVolumeMl} mL MgSO₄ konulacak ➔ <strong>Nihai hacim: {safeBagVolume} mL</strong> sabit kalacak.
                    </span>
                  )
                ) : (
                  <span>
                    💡 <strong>Doğrudan Ekleme:</strong> Torbadan sıvı çekilmeyecek ➔ <strong>Nihai hacim: {safeBagVolume} mL + {ampuleVolumeMl} mL = {totalSolutionVolumeMl} mL</strong> olacak.
                  </span>
                )}
              </div>
            </div>

            {/* İnfüzyon Süresi Çarpanı */}
            <div className="pt-1">
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                Ampul Başına İnfüzyon Süresi (Hücresel tutulum için önerilen: 2.0 sa/ampul)
              </label>
              <div className="grid grid-cols-2 gap-2 max-w-sm">
                <button
                  type="button"
                  onClick={() => setInfusionPaceMultiplier(1.5)}
                  className={`py-1.5 px-2 rounded-lg border text-center text-xs cursor-pointer ${
                    infusionPaceMultiplier === 1.5
                      ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-200 font-bold' : 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                      : isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  1.5 saat / ampul (Minimum)
                </button>
                <button
                  type="button"
                  onClick={() => setInfusionPaceMultiplier(2.0)}
                  className={`py-1.5 px-2 rounded-lg border text-center text-xs cursor-pointer ${
                    infusionPaceMultiplier === 2.0
                      ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-200 font-bold' : 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                      : isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  2.0 saat / ampul (Önerilen)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ: Hesaplama Sonuç Kartı ve Reçete (5 Kolon) */}
        <div className={`lg:col-span-5 p-4 sm:p-5 rounded-xl border flex flex-col justify-between space-y-4 ${
          isDark ? 'bg-teal-950/20 border-teal-800/40' : 'bg-teal-50/50 border-teal-200'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-teal-200 dark:border-teal-800/60">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-500" />
                Doz &amp; Replasman Protokolü
              </span>
              <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
                Δ Mg: +{deltaMgDl.toFixed(2)} mg/dL
              </span>
            </div>

            {deltaMgDl <= 0 ? (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs mt-4">
                <strong>Serum düzeyi hedef değerde veya üzerinde:</strong> Mevcut serum düzeyi ({currentVal} {unit}), hedeflenen ({targetVal} {unit}) düzeyden yüksek veya eşit olduğu için ek parenteral magnezyum replasmanı gerekmemektedir.
              </div>
            ) : (
              <div className="space-y-4 mt-3">
                {/* Ana Ampul Göstergesi */}
                <div className="text-center p-4 rounded-xl bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-800 shadow-xs">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Önerilen Klinik Replasman Miktarı
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-teal-600 dark:text-teal-400 font-mono tracking-tight">
                    {recommendedAmpules} <span className="text-lg font-bold text-slate-700 dark:text-slate-300">Ampul</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    (Hesaplanan kesin: {exactAmpulesNeeded.toFixed(2)} ampul)
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">Toplam MgSO₄</span>
                      <strong className="text-slate-900 dark:text-slate-100">{totalGramsMgSo4} g ({totalMgMgSo4} mg)</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">Elementel Mg</span>
                      <strong className="text-slate-900 dark:text-slate-100">~{totalMeqElemental.toFixed(1)} mEq (~{totalMmolElemental.toFixed(1)} mmol)</strong>
                    </div>
                  </div>
                </div>

                {/* Torba Hacmi Uyuşmazlığı Uyarısı */}
                {isDrainImpossible ? (
                  <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-950 dark:text-rose-200 text-xs flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">⚠️ İmkansız Sıvı Drenajı:</strong>
                      {safeBagVolume} mL torbadan {ampuleVolumeMl} mL sıvı çekilemez. Lütfen torba hacmini büyütünüz (örn: 250, 500 veya 1000 cc) ya da sıvı boşaltma seçeneğini kapatınız.
                    </div>
                  </div>
                ) : isAmpuleVolumeExceedsBag && !drainBagVolume && (
                  <div className="p-3 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">⚠️ Hacim Uyuşmazlığı Uyarısı:</strong>
                      Eklenen ampul hacmi (<strong>{ampuleVolumeMl} mL</strong>), seçtiğiniz taşıyıcı torba hacminden (<strong>{safeBagVolume} mL</strong>) büyüktür. Bu miktar seçilen tek bir torbaya sığmayacaktır; lütfen daha büyük hacimli bir torba seçiniz veya dozu ayrı gün/seanslara bölünüz.
                    </div>
                  </div>
                )}

                {/* Yüksek Doz / Tavan Doz Uyarısı & Seans Bölme Gerekçesi */}
                {isExtremeDose ? (
                  <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-950 dark:text-rose-200 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold mb-0.5">⚠️ Günlük Güvenli Replasman Tavanı Aşıldı:</strong>
                        Hesaplanan miktar ({recommendedAmpules} ampul / {totalGramsMgSo4} g) tek seferlik veya günlük infüzyon için güvenli sınırı aşmaktadır! Yoğun bakımda günlük replasman tavanı <strong>6 – 8 ampuldür (9 – 12 g)</strong>. Bu açık tek torbada değil, <strong>2 – 3 güne bölünerek</strong> ve her seans sonrası kontrol kanı alınarak verilmelidir.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowSessionRationale(!showSessionRationale)}
                      className="text-[11px] underline font-semibold text-rose-800 dark:text-rose-300 hover:text-rose-950 dark:hover:text-rose-100 cursor-pointer flex items-center gap-1"
                    >
                      {showSessionRationale ? '▲ Seans Bölme Klinik Dayanağını Gizle' : '▼ Seans Bölme Klinik Dayanağını Gör (Neden Bölünmeli?)'}
                    </button>

                    {showSessionRationale && (
                      <div className="p-2.5 rounded bg-white/80 dark:bg-slate-900/80 border border-rose-300 dark:border-rose-900 text-[11px] space-y-1.5 text-slate-700 dark:text-slate-300">
                        <div className="font-bold text-slate-900 dark:text-white">Seans Bölme Tavsiyesinin 3 Fizyolojik Dayanağı:</div>
                        <div>1. <strong>Renal Klirens Eşiği (~2.0 – 2.5 mg/dL):</strong> Aşırı yüksek doz tek seferde verildiğinde serum pik yapar ve böbreğin tübüler geri emilim kapasitesi aşılır. Verilen magnezyumun %50&apos;sinden fazlası idrarla hızla atılır (renal kaçış).</div>
                        <div>2. <strong>Hücre İçi Redistribüsyon (12–24 saat):</strong> Vücuttaki magnezyumun %99&apos;u hücre içi ve kemiktedir. Plazmadan hücreye geçiş yavaş bir aktif transporttur. Dozu günlere yaymak hücre içi dolumu maksimize eder.</div>
                        <div>3. <strong>Toksisite Güvenliği:</strong> Hızlı ve aşırı dozlar hipotansiyon, AV blok ve DTR refleks kaybı riskini artırır.</div>
                      </div>
                    )}
                  </div>
                ) : isVeryHighDose ? (
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Seans Bölme Tavsiyesi:</strong> Gereken doz ({recommendedAmpules} ampul / {totalGramsMgSo4} g) yüksek olduğu için renal klirens kaçışını önlemek ve doku dolumunu artırmak amacıyla <strong>2 ayrı seansa/güne</strong> bölünerek verilmesi önerilir (örn: günde 2-3 ampul).
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowSessionRationale(!showSessionRationale)}
                      className="text-[11px] underline font-semibold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 cursor-pointer flex items-center gap-1"
                    >
                      {showSessionRationale ? '▲ Seans Bölme Klinik Dayanağını Gizle' : '▼ Seans Bölme Klinik Dayanağını Gör (Neden Bölünmeli?)'}
                    </button>

                    {showSessionRationale && (
                      <div className="p-2.5 rounded bg-white/80 dark:bg-slate-900/80 border border-amber-300 dark:border-amber-900 text-[11px] space-y-1.5 text-slate-700 dark:text-slate-300">
                        <div className="font-bold text-slate-900 dark:text-white">Seans Bölme Tavsiyesinin 3 Fizyolojik Dayanağı:</div>
                        <div>1. <strong>Renal Klirens Eşiği:</strong> Yüksek serum konsantrasyonunda böbrek tübüler geri emilimi doyar; verilen MgSO₄&apos;ün büyük kısmı hücreye geçemeden idrarla atılır.</div>
                        <div>2. <strong>Yavaş Hücresel Şift:</strong> Magnezyumun %99&apos;u hücre içi/kemik deposundadır. Plazmadan hücreye geçiş 12-24 saatte tamamlanır. Dozu bölmek gerçek biyoyararlanımı artırır.</div>
                        <div>3. <strong>Klinik Tavan:</strong> Yoğun bakımda tek seferde rutin tavan 4-6 ampuldür.</div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* İnfüzyon Pompası ve Sıvı Reçetesi */}
                <div className={`p-3.5 rounded-xl border text-xs space-y-2.5 ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                    <span>İnfüzyon Reçetesi (Hemşire / Asistan Notu):</span>
                    <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold">
                      Nihai {totalSolutionVolumeMl} mL Çözelti
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {drainBagVolume && !isDrainImpossible ? (
                      <div>
                        • <strong>Hazırlama (Hacim Boşaltmalı):</strong> {safeBagVolume} mL {carrierFluid === 'sf' ? '%0.9 SF' : '%5 Dekstroz'} torbasından <strong>{ampuleVolumeMl} mL sıvı çekip atınız</strong>; ardından torbaya <strong>{recommendedAmpules} ampul (%15 10 mL) MgSO₄ ({ampuleVolumeMl} mL)</strong> enjekte ediniz. Nihai torba hacmi: <strong>{safeBagVolume} mL</strong> kalır.
                      </div>
                    ) : (
                      <div>
                        • <strong>Hazırlama (Doğrudan Ekleme):</strong> {safeBagVolume} mL {carrierFluid === 'sf' ? '%0.9 SF' : '%5 Dekstroz'} torbasına sıvı çekmeden doğrudan <strong>{recommendedAmpules} ampul (%15 10 mL) MgSO₄ ({ampuleVolumeMl} mL)</strong> enjekte ediniz. Nihai torba hacmi: <strong>{totalSolutionVolumeMl} mL</strong> olur.
                      </div>
                    )}
                    <div>
                      • <strong>İnfüzyon Süresi:</strong> En az <strong>{totalInfusionHours} saat</strong>te gidecek şekilde ayarlayınız.
                    </div>
                    <div className="p-2 rounded bg-teal-50 dark:bg-slate-800 font-mono text-teal-900 dark:text-teal-300 font-bold flex items-center justify-between">
                      <span>İnfüzyon Pompası Hızı:</span>
                      <span className="text-sm">{infusionRateMlPerHour} mL / saat</span>
                    </div>
                  </div>

                  {/* Damar Yolu Güvenliği & Derişim Analiz Bandı */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {/* Tek ve Kesin Çözelti Derişim Kartı */}
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                          Nihai Çözelti Derişimi ({drainBagVolume ? 'Hacim Boşaltmalı' : 'Doğrudan Eklemeli'})
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {totalSolutionVolumeMl} mL toplam hacimde {totalGramsMgSo4} g ({totalMgMgSo4} mg) MgSO₄
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-mono font-extrabold text-teal-600 dark:text-teal-400">
                          %{concentrationPercent.toFixed(1)}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {concentrationMgPerMl.toFixed(0)} mg/mL
                        </div>
                      </div>
                    </div>

                    <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed flex items-start gap-2 ${
                      lineSafetyStatus === 'safe'
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-500/15 border border-rose-500/40 text-rose-950 dark:text-rose-200 font-semibold'
                    }`}>
                      {lineSafetyStatus === 'safe' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-bold">
                          {lineType === 'peripheral' ? 'Periferik Damar Yolu (Maks <%20 / 200 mg/mL)' : 'Santral Venöz Kateter (Maks <%50 / 500 mg/mL)'}
                        </div>
                        <div>{lineSafetyMessage}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Beklenen Sonuç */}
                <div className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100/80 border-slate-200'
                }`}>
                  <span className="text-slate-500 dark:text-slate-400">Beklenen Nihai Serum Düzeyi:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400 font-mono">
                    ~{expectedFinalLevelCurrentUnit.toFixed(2)} {unit}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Kontrol Kanı Hatırlatıcısı */}
          <div className="pt-2">
            <div className={`p-2.5 rounded-lg text-[11px] border flex items-start gap-2 ${
              isDark ? 'bg-blue-950/20 border-blue-800/40 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <strong>Kontrol Kanı Zamanı:</strong> İntraselüler doku redistribüsyonu nedeniyle gerçek serum düzeyini görmek için kontrol kanını infüzyon bittikten <strong>12 – 24 saat sonra (veya ertesi sabah vizitinde)</strong> alınız.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REANİMASYON VE YOĞUN BAKIM PRATİĞİNDE DİKKAT EDİLECEK KRİTİK NOKTALAR */}
      <div className={`p-4 sm:p-5 rounded-xl border space-y-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-500" />
          Reanimasyon &amp; Yoğun Bakım Pratiğinde Kritik İpuçları
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* a) İntraselüler Şift */}
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5 text-teal-600 dark:text-teal-400">
              <span className="w-5 h-5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-[10px] font-bold">
                A
              </span>
              İntraselüler Şift &amp; Yalancı Tepe Düzeyi
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Vücut magnezyumunun <strong>yaklaşık %99&apos;u hücre içi ve kemik dokusundadır</strong>; serumdaki miktar toplam depoların yalnızca %1&apos;idir. İnfüzyon biter bitmez alınan kan gazı veya biyokimyada &quot;yalancı yüksek (peak)&quot; değer izlenir. Gerçek bazal artışı değerlendirmek için kontrol kanı <strong>12 – 24 saat sonra</strong> alınmalıdır.
            </p>
          </div>

          {/* b) Uygulama Hızı ve Klirens */}
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5 text-amber-600 dark:text-amber-400">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px] font-bold">
                B
              </span>
              Uygulama Hızı &amp; Renal Klirens Kaçışı
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Magnezyumu hızlı bolus yapmak (eklampsi/Torsades acili hariç), hücre içine geçmesine fırsat kalmadan böbreklerden hızla idrarla atılmasına (klirens artışına) yol açar. Maksimum hücresel dolum için 1.5 gramlık (1 ampul) dozun <strong>en az 1.5 – 2 saatlik yavaş infüzyonla</strong> verilmesi şarttır.
            </p>
          </div>

          {/* c) Flebit ve Damar Yolu Güvenliği */}
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5 text-rose-600 dark:text-rose-400">
              <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-[10px] font-bold">
                C
              </span>
              Maksimum Derişim &amp; Flebit Riski
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
              Periferik venöz yoldan magnezyum verilirken venöz irritasyon ve flebiti önlemek için maksimum konsantrasyonun <strong>%20&apos;yi (200 mg/mL) geçmemesi</strong> önerilir. Santral venöz kateterden (CVP) uygulamalarda ise literatürdeki maksimum güvenli konsantrasyon sınırı <strong>%50&apos;dir (500 mg/mL)</strong>.
            </p>
          </div>
        </div>

        {/* Literatür ve Kanıt Dayanağı Açılır Kutu */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setShowLiterature(!showLiterature)}
            className={`w-full flex items-center justify-between text-xs text-left cursor-pointer transition-colors ${
              isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-teal-500" />
              <span>Literatür Dayanağı &amp; Referanslar (Mathews et al. 2022)</span>
            </span>
            {showLiterature ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showLiterature && (
            <div className={`mt-3 p-3.5 rounded-lg text-xs space-y-2 border ${
              isDark ? 'bg-slate-950/90 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="font-semibold text-slate-900 dark:text-white">
                Birincil Prospektif Klinik Çalışma:
              </div>
              <p className="italic text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Mathews V, Paul J, Paul C, George JK, Babu A. <em>A prospective observational study to identify the effectiveness of intravenous magnesium replacement in an intensive care setting</em>. J Anaesthesiol Clin Pharmacol. 2022 Jul-Sep;38(3):453-457. doi: 10.4103/joacp.JOACP_530_20. PMID: 36505214; PMCID: PMC9728415.
              </p>
              <div className="text-[11px] text-slate-600 dark:text-slate-300 pt-1">
                <strong>Özet Sonuç:</strong> Yoğun bakım hastalarında IV magnezyum replasmanının etkinliğini inceleyen bu çalışmada, bazal böbrek fonksiyonu (eGFR) replasman sonrası plazma konsantrasyonu artışının en temel belirleyicisi olarak saptanmıştır. Normal böbrek fonksiyonunda 1g MgSO₄ başına ortalama 0.10 mg/dL yükselme olurken, eGFR azaldıkça atılım düşüklüğü nedeniyle artış katsayısı kademeli olarak yükselmektedir.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
