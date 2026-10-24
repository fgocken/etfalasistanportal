import React, { useState } from 'react';
import { 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Info, 
  ShieldAlert, 
  Clock, 
  Droplet,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Activity,
  Heart,
  HelpCircle,
  FlaskConical,
  Zap,
  BookOpen
} from 'lucide-react';

interface Props {
  isDark: boolean;
}

type DrugFormulation = 'kcl' | 'kaliphos';
type RenalCategory = 'normal' | 'mild_moderate' | 'severe';
type RouteCategory = 'peripheral' | 'central';
type CarrierFluid = 'sf' | 'd5w';

export const PotassiumCalculator: React.FC<Props> = ({ isDark }) => {
  // Girdiler
  const [formulation, setFormulation] = useState<DrugFormulation>('kcl');
  const [currentK, setCurrentK] = useState<string>('3.0');
  const [targetK, setTargetK] = useState<string>('4.0');
  const [weight, setWeight] = useState<string>('70');
  const [renalStatus, setRenalStatus] = useState<RenalCategory>('normal');
  const [route, setRoute] = useState<RouteCategory>('peripheral');
  const [carrierFluid, setCarrierFluid] = useState<CarrierFluid>('sf');
  const [fluidRestriction, setFluidRestriction] = useState<boolean>(false);
  const [bagVolumePreset, setBagVolumePreset] = useState<number>(500);
  const [customBagVolume, setCustomBagVolume] = useState<string>('');
  const [isCustomBag, setIsCustomBag] = useState<boolean>(false);
  const [drainBagVolume, setDrainBagVolume] = useState<boolean>(false);
  const [showSessionRationale, setShowSessionRationale] = useState<boolean>(false);
  const [showReferences, setShowReferences] = useState<boolean>(false);
  const [showCalculationSteps, setShowCalculationSteps] = useState<boolean>(false);
  const [activeHoverTooltip, setActiveHoverTooltip] = useState<string | null>(null);

  // Parse girdiler
  const curK = parseFloat(currentK) || 3.0;
  const tarK = parseFloat(targetK) || 4.0;
  const ptWeight = parseFloat(weight) || 70;
  const baseBagVolume = isCustomBag ? (parseFloat(customBagVolume) || 500) : bagVolumePreset;

  // Delta K
  const deltaK = Math.max(0, tarK - curK);

  // Potasyum açığı hesabı:
  // Fizyolojik Temel:
  // Vücut potasyumunun %98'i hücre içindedir (~140-150 mEq/L); ekstraselülerde sadece %2 (~4 mEq/L) bulunur.
  // Hücre içi ve dışı arasındaki difüzyon dengesi nedeniyle serumdaki her 0.1 mEq/L düşüş
  // total vücut deposunda ortalama 15-30 mEq (ortalama 20 mEq) gerçek kayba karşılık gelir.
  // Sterns & Rose klinik kuralı: DeltaK * 200 mEq (veya DeltaK * Kilo * 0.4)
  const estimatedDeficitTotal = Math.round(deltaK * 200);

  // Güvenli tek seans / ilk basamak dozu:
  // eGFR'ye göre düzeltme (Böbrek yetmezliğinde potasyum retansiyonu ve sahte pik riski)
  let renalFactor = 1.0;
  if (renalStatus === 'mild_moderate') renalFactor = 0.8;
  if (renalStatus === 'severe') renalFactor = 0.5;

  // İlk etap seansı için hedeflenen mEq:
  // Hafif hipokalemide (3.0-3.5): 20-40 mEq
  // Ağır hipokalemide (<3.0): 40-60 mEq (seanslara bölünerek)
  const initialSessionMeqTarget = Math.min(80, Math.max(10, Math.round(estimatedDeficitTotal * 0.4 * renalFactor)));

  // İlaç parametreleri:
  // KCl: 10 mL ampul = 10 mEq K+ (1 mEq/mL)
  // Kaliphos: 10 mL ampul = 30 mEq K+ + 60 mEq Fosfat (3 mEq K/mL, 6 mEq P/mL)
  let kPerAmp = 10;
  let pPerAmp = 0;
  let mlPerAmp = 10;
  let ampLabel = '%7.5 KCl (10 mL = 10 mEq K⁺)';

  if (formulation === 'kaliphos') {
    kPerAmp = 30;
    pPerAmp = 60; // 60 mEq Fosfat (kullanıcı spesifikasyonu)
    mlPerAmp = 10; // 10 mL ampul
    ampLabel = 'Kaliphos® (10 mL = 30 mEq K⁺ + 60 mEq Fosfat)';
  }

  // Gereken ampul hesabı (en az 1 ampul)
  const rawAmpCount = initialSessionMeqTarget / kPerAmp;
  const suggestedAmpCount = Math.max(1, Math.round(rawAmpCount));
  const totalKDeliveredMeq = suggestedAmpCount * kPerAmp;
  const totalPDeliveredMeq = suggestedAmpCount * pPerAmp;
  const totalAmpVolumeMl = suggestedAmpCount * mlPerAmp;

  // Çözelti hacmi
  const finalVolumeMl = drainBagVolume ? baseBagVolume : (baseBagVolume + totalAmpVolumeMl);

  // Derişim hesabı (mEq/L)
  const concentrationMeqL = (totalKDeliveredMeq / finalVolumeMl) * 1000;

  // Derişim güvenlik değerlendirmesi:
  // Periferik yolda: ideal <= 40 mEq/L, sınır 40–60 mEq/L, aşırı/tehlike > 60 mEq/L (venöz yanma/flebit)
  // Santral yolda (SVK):
  //   A) Sıvı Kısıtlaması AKTİF ise:
  //      100 - 400 mEq/L arası GÜVENLİ ve UYGUN KABUL EDİLİR (SVK + elektronik perfüzör + hız <= 20 mEq/saat + EKG)
  //      > 400 mEq/L aşırı derişim uyarısı
  //   B) Sıvı Kısıtlaması YOK ise (Standart Torba):
  //      ideal <= 80 mEq/L, sınır 80–100 mEq/L, > 100 mEq/L standart torba aşımı uyarısı
  const isPeripheral = route === 'peripheral';

  const isPeripheralSafe = isPeripheral && concentrationMeqL <= 40;
  const isPeripheralBorderline = isPeripheral && concentrationMeqL > 40 && concentrationMeqL <= 60;
  const isPeripheralExcessive = isPeripheral && concentrationMeqL > 60;

  const isCentralStandardSafe = !isPeripheral && !fluidRestriction && concentrationMeqL <= 80;
  const isCentralStandardBorderline = !isPeripheral && !fluidRestriction && concentrationMeqL > 80 && concentrationMeqL <= 100;
  const isCentralStandardHigh = !isPeripheral && !fluidRestriction && concentrationMeqL > 100;

  const isCentralFluidRestrictedSafe = !isPeripheral && fluidRestriction && concentrationMeqL <= 400;
  const isCentralFluidRestrictedExcessive = !isPeripheral && fluidRestriction && concentrationMeqL > 400;

  const isConcentrationSafe = isPeripheralSafe || isCentralStandardSafe || isCentralFluidRestrictedSafe;
  const isConcentrationBorderline = isPeripheralBorderline || isCentralStandardBorderline;
  const isConcentrationExcessive = isPeripheralExcessive || isCentralStandardHigh || isCentralFluidRestrictedExcessive;

  // İnfüzyon hızı limitleri:
  // Periferik yolda: Maks 10 mEq/saat (yakın monitörizasyonla maks 20 mEq/saat)
  // Santral yolda: Maks 20 mEq/saat (yoğun bakım sürekli EKG ile acilde maks 40 mEq/saat)
  const maxSafeInfusionRateMeqHr = isPeripheral ? 10 : 20;
  const minInfusionHours = (totalKDeliveredMeq / maxSafeInfusionRateMeqHr);
  const suggestedInfusionHoursRounded = Math.max(1, Math.ceil(minInfusionHours));
  const pumpRateMlHr = Math.round(finalVolumeMl / suggestedInfusionHoursRounded);

  // Sıfırla
  const handleReset = () => {
    setFormulation('kcl');
    setCurrentK('3.0');
    setTargetK('4.0');
    setWeight('70');
    setRenalStatus('normal');
    setRoute('peripheral');
    setCarrierFluid('sf');
    setFluidRestriction(false);
    setBagVolumePreset(500);
    setCustomBagVolume('');
    setIsCustomBag(false);
    setDrainBagVolume(false);
  };

  return (
    <div className={`p-5 sm:p-6 rounded-2xl shadow-xl border transition-all ${
      isDark ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'
    }`}>
      {/* Üst Başlık & Sıfırlama */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-teal-600 dark:text-teal-400">
              Potasyum &amp; Kaliphos Replasmanı Hesaplayıcı
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            %7.5 KCl ve Kaliphos (Potasyum Fosfat) ampul hesabı, damar yolu flebit güvenliği ve infüzyon hızı protokolü
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors self-start sm:self-auto ${
            isDark 
              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5 text-teal-500" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* Grid: Sol Taraf Girdiler - Sağ Taraf Sonuçlar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SOL TARAF: Parametreler (7 Kolon) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* 1. İlaç Formülasyonu Seçimi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              1. Potasyum Formülasyonu Seçimi
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setFormulation('kcl')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  formulation === 'kcl'
                    ? isDark 
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300 ring-1 ring-teal-500/30' 
                      : 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-400/30'
                    : isDark 
                      ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm flex items-center justify-between">
                  <span>%7.5 Potasyum Klorür (KCl)</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20">Standart</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  10 mL Ampul = <strong>10 mEq K⁺</strong> (1 mEq/mL)
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormulation('kaliphos')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  formulation === 'kaliphos'
                    ? isDark 
                      ? 'bg-teal-500/20 border-teal-500 text-teal-300 ring-1 ring-teal-500/30' 
                      : 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-400/30'
                    : isDark 
                      ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm flex items-center justify-between">
                  <span>Kaliphos® (Potasyum Fosfat)</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">K + Fosfat</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  10 mL Ampul = <strong>30 mEq K⁺ + 60 mEq Fosfat</strong>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Serum Düzeyleri (Mevcut, Hedef) & Kilo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mevcut K⁺ (mEq/L)
              </label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="6.0"
                value={currentK}
                onChange={(e) => setCurrentK(e.target.value)}
                className={`w-full p-2.5 rounded-xl border font-mono font-bold text-sm transition-colors ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">Normal: 3.5 – 5.0</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hedef K⁺ (mEq/L)
              </label>
              <input
                type="number"
                step="0.1"
                min="2.5"
                max="5.5"
                value={targetK}
                onChange={(e) => setTargetK(e.target.value)}
                className={`w-full p-2.5 rounded-xl border font-mono font-bold text-sm transition-colors ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">Hedef: 4.0 – 4.5</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hasta Ağırlığı (kg)
              </label>
              <input
                type="number"
                step="1"
                min="20"
                max="250"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className={`w-full p-2.5 rounded-xl border font-mono font-bold text-sm transition-colors ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">Total havuz hesabı</span>
            </div>
          </div>

          {/* 3. eGFR ve Böbrek Fonksiyonu */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              3. Renal Fonksiyon (eGFR / Böbrek Durumu)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRenalStatus('normal')}
                className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                  renalStatus === 'normal'
                    ? isDark ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Normal (eGFR ≥ 90)
              </button>
              <button
                type="button"
                onClick={() => setRenalStatus('mild_moderate')}
                className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                  renalStatus === 'mild_moderate'
                    ? isDark ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-amber-50 border-amber-500 text-amber-900'
                    : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Hafif/Orta (eGFR 30–89)
              </button>
              <button
                type="button"
                onClick={() => setRenalStatus('severe')}
                className={`p-2 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                  renalStatus === 'severe'
                    ? isDark ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-rose-50 border-rose-500 text-rose-900'
                    : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                Ağır KBY (eGFR &lt; 30)
              </button>
            </div>
            {renalStatus === 'severe' && (
              <div className="mt-2 p-2.5 rounded-lg text-xs bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <span>
                  <strong>Dikkat:</strong> Ağır böbrek yetmezliğinde potasyum atılımı bozulur. Doz %50 azaltılmış seanslarla verilip sık kan gazı/serum takibi yapılmalıdır.
                </span>
              </div>
            )}
          </div>

          {/* 4. Damar Yolu Seçimi (Periferik vs Santral) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              4. Damar Yolu Erişimi
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRoute('peripheral')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  route === 'peripheral'
                    ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300 ring-1 ring-teal-500/30' : 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-400/30'
                    : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm">Periferik Venöz Damar Yolu</div>
                <div className="text-[11px] opacity-80 mt-0.5">Derişim ≤ 40 mEq/L · Hız ≤ 10 mEq/saat</div>
              </button>

              <button
                type="button"
                onClick={() => setRoute('central')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  route === 'central'
                    ? isDark ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/30' : 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-1 ring-indigo-400/30'
                    : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm flex items-center justify-between">
                  <span>Santral Venöz Kateter (SVK)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 font-mono">YB / Sıvı Kısıtı</span>
                </div>
                <div className="text-[11px] opacity-80 mt-0.5">Standart: ≤ 80–100 mEq/L · Sıvı Kısıtlı YB: ≤ 400 mEq/L · Hız 20–40 mEq/saat</div>
              </button>
            </div>
          </div>

          {/* 5. Sıvı Kısıtlaması Gereksinimi (Opsiyonel) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                5. Sıvı Kısıtlaması Gereksinimi (Opsiyonel)
              </label>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold">
                YB · KY · ARDS · Oligüri
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setFluidRestriction(false)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  !fluidRestriction
                    ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300 ring-1 ring-teal-500/30' : 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-400/30'
                    : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold text-xs">Hayır (Standart Sıvı)</div>
                <div className="text-[10px] opacity-75 mt-0.5">Torba infüzyonu (250–1000cc)</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFluidRestriction(true);
                  if (bagVolumePreset > 100 && !isCustomBag) {
                    setBagVolumePreset(50);
                  }
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  fluidRestriction
                    ? isDark ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500/30' : 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-1 ring-indigo-400/30'
                    : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>Evet (Sıvı Kısıtlı ⚠️)</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-indigo-500/20">400 mEq/L</span>
                </div>
                <div className="text-[10px] opacity-75 mt-0.5">Enjektör perfüzörü (50–100cc)</div>
              </button>
            </div>

            {/* Sıvı Kısıtlaması Durumu Uyarısı / Bilgilendirmesi */}
            {fluidRestriction && (
              <div className={`mt-2 p-2.5 rounded-lg text-xs border flex items-start gap-2 ${
                route === 'central'
                  ? 'bg-indigo-500/10 text-indigo-900 dark:text-indigo-200 border-indigo-500/30'
                  : 'bg-rose-500/10 text-rose-900 dark:text-rose-200 border-rose-500/30'
              }`}>
                {route === 'central' ? (
                  <>
                    <Zap className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>SVK + Sıvı Kısıtlaması Aktif:</strong> Sıvı yüklenmesini önlemek için 50cc perfüzör enjektörü önerilir. Santral yoldan <strong>400 mEq/L'ye kadar</strong> güvenle replasman yapılabilir (saatte maks 20 mEq K⁺ hızı ve EKG takibi şartıyla).
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Periferik Damar Yolu Sınırlaması:</strong> Sıvı kısıtlaması aktif ancak periferik yoldan kimyasal flebit ve endotel hasarı riski nedeniyle en fazla 40–60 mEq/L derişime izin verilir. Ciddi sıvı kısıtlaması gereken hastada replasman için <strong>Santral Venöz Kateter (SVK)</strong> açılmalıdır.
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 6. Taşıyıcı Sıvı Türü ve Torba Hacmi */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Taşıyıcı Sıvı Türü
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCarrierFluid('sf')}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center ${
                      carrierFluid === 'sf'
                        ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-teal-50 border-teal-500 text-teal-900'
                        : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    %0.9 NaCl (SF) ✅
                  </button>
                  <button
                    type="button"
                    onClick={() => setCarrierFluid('d5w')}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer text-center ${
                      carrierFluid === 'd5w'
                        ? isDark ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-amber-50 border-amber-500 text-amber-900'
                        : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    %5 Dekstroz ⚠️
                  </button>
                </div>
              </div>

              {/* Torba Hacmi Seçimi */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Serum / Perfüzör Hacmi
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {[50, 100, 250, 500, 1000].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => {
                        setBagVolumePreset(vol);
                        setIsCustomBag(false);
                      }}
                      className={`flex-1 min-w-[52px] py-1.5 px-1.5 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer text-center ${
                        !isCustomBag && bagVolumePreset === vol
                          ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-teal-50 border-teal-500 text-teal-900'
                          : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                      title={vol === 50 ? '50 mL Enjektör Perfüzörü (Yoğun bakım / SVK sıvı kısıtlaması)' : `${vol} mL`}
                    >
                      {vol === 50 ? '50cc (Perfüzör)' : `${vol}cc`}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsCustomBag(true)}
                    className={`py-1.5 px-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      isCustomBag
                        ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-teal-50 border-teal-500 text-teal-900'
                        : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Özel
                  </button>
                </div>
              </div>
            </div>

            {/* Özel Hacim Girdisi */}
            {isCustomBag && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Torba hacmi (cc / mL)"
                  value={customBagVolume}
                  onChange={(e) => setCustomBagVolume(e.target.value)}
                  className={`p-2 rounded-lg border text-xs font-mono font-bold w-48 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <span className="text-xs text-slate-400">mL (cc)</span>
              </div>
            )}

            {/* Dekstroz Uyarısı */}
            {carrierFluid === 'd5w' && (
              <div className="p-2.5 rounded-lg text-xs bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                <span>
                  <strong>Farmakolojik Uyarı:</strong> Dekstroz pankreastan insülin salgısını uyararak potasyumu hücre içine sokar; infüzyon sırasında serum K⁺'unu yalancı düşürebilir. Hipokalemi replasmanında ilk tercih %0.9 NaCl (SF)'dir.
                </span>
              </div>
            )}

            {/* Torbadan Sıvı Boşaltma Toggle */}
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-teal-500" />
                  <span>Torbadan Ampul Hacmi Boşaltılsın mı?</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Hemşire {totalAmpVolumeMl} mL ampul için torbadan {totalAmpVolumeMl} mL çekip atsın mı?
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setDrainBagVolume(false)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !drainBagVolume
                      ? isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-900 shadow-2xs border border-slate-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Hayır (Üzerine Ekle)
                </button>
                <button
                  type="button"
                  onClick={() => setDrainBagVolume(true)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    drainBagVolume
                      ? isDark ? 'bg-teal-600 text-white' : 'bg-teal-600 text-white shadow-2xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Evet (Boşalt)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: Hesaplanan Protokol Sonuçları (5 Kolon) */}
        <div className="lg:col-span-5 space-y-4">

          {/* Hesaplama Ayrıntısı Butonu / Banner'ı */}
          <button 
            type="button"
            onClick={() => setShowCalculationSteps(!showCalculationSteps)}
            className={`w-full p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-left ${
              showCalculationSteps
                ? isDark ? 'bg-teal-950/40 border-teal-500/50 shadow-md ring-1 ring-teal-500/30' : 'bg-teal-50 border-teal-400 shadow-md ring-1 ring-teal-300'
                : isDark ? 'bg-slate-800/80 border-slate-700 hover:border-teal-500/50' : 'bg-slate-50 border-slate-200 hover:border-teal-400 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-400">
                <Calculator className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Hesaplama ayrıntısı için tıkla
              </span>
            </div>
            <div className="text-slate-400">
              {showCalculationSteps ? <ChevronUp className="w-4 h-4 text-teal-500" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {/* Genişletilmiş Canlı Matematiksel Formül Dökümü */}
          {showCalculationSteps && (
            <div className="p-3.5 rounded-2xl border text-xs space-y-2.5 animate-fadeIn bg-slate-800/40 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800">
              {/* 1. Toplam Potasyum Açığı (Ayrıntılı Fizyoloji, Matematik & Kaynaklar) */}
              <div className="p-3 rounded-xl bg-slate-900/10 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 space-y-2">
                <div className="font-bold text-teal-600 dark:text-teal-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-teal-500" />
                    <span>1. Toplam Potasyum Açığı (Total Vücut Havuzu)</span>
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300">
                    ΔK × 200 mEq
                  </span>
                </div>

                {/* Fizyolojik Mekanizma */}
                <div className="p-2 rounded-lg bg-teal-500/5 dark:bg-teal-950/20 border border-teal-500/20 text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 space-y-1">
                  <div>
                    <strong>Fizyolojik Mekanizma (%98 İntraselüler Havuz):</strong> Yetişkin bir insanda toplam vücut potasyumu yaklaşık <strong>3.000 – 4.000 mEq (~50 mEq/kg)</strong>'dir. Bunun <strong>%98'i hücre içindedir</strong> (intraselüler konsantrasyon: 140–150 mEq/L). Damar içinde ve ekstraselüler alanda ise tüm vücut potasyumunun <strong>yalnızca %2'si (~65 mEq)</strong> dolaşır (serum: 3.5–5.0 mEq/L).
                  </div>
                  <div>
                    Kanda potasyum düştüğünde hücre içindeki potasyum hücre dışına difüzyonla sızarak tamponlama yapar. Bu nedenle serumdaki her <strong>0.1 mEq/L'lik düşüş</strong>, tüm vücut deposunda ortalama <strong>15–30 mEq (klinik ortalama: 20 mEq)</strong> gerçek kayba karşılık gelir.
                  </div>
                </div>

                {/* Matematiksel Hesaplama Adımları */}
                <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Matematiksel Hesaplama:</div>
                  <div>• Serum Farkı (ΔK) = Hedef ({tarK}) - Mevcut ({curK}) = <strong>{deltaK.toFixed(1)} mEq/L</strong></div>
                  <div>• Standart Sterns-Rose Formülü = ΔK × 200 mEq/L = <strong>{deltaK.toFixed(1)} × 200 = ~{estimatedDeficitTotal} mEq K⁺</strong></div>
                  <div>• Alternatif Kilo Bazlı Formül = ΔK × Kilo ({ptWeight} kg) × 0.4 = <strong>~{Math.round(deltaK * ptWeight * 0.4)} mEq K⁺</strong></div>
                </div>

                {/* Bilimsel Kaynaklar & Literatür */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5">
                  <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-teal-500" />
                    <span>Bilimsel ve Akademik Kaynaklar:</span>
                  </div>
                  <div>
                    1. <strong>Rose BD, Post TW.</strong> <em>Clinical Physiology of Acid-Base and Electrolyte Disorders</em>. 5th ed. McGraw-Hill (Hypokalemia &amp; Potassium Homeostasis).
                  </div>
                  <div>
                    2. <strong>Sterns RH, Cox M, Feig PU, Singer I.</strong> <em>Internal medicine &amp; nephrology balance studies of potassium depletion kinetics</em>.
                  </div>
                  <div>
                    3. <strong>UpToDate:</strong> <em>"Clinical manifestations and treatment of hypokalemia in adults"</em> – (Estimation of the potassium deficit section).
                  </div>
                  <div>
                    4. <strong>Tintinalli's Emergency Medicine:</strong> 9th ed. Chapter 173: <em>Fluid and Electrolyte Disorders – Potassium Deficit Dynamics</em>.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/10 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 space-y-1">
                <div className="font-bold text-teal-600 dark:text-teal-400 flex items-center justify-between">
                  <span>2. 1. Seans Hedef Dozu (Açığın %40'ı + Renal Katsayı)</span>
                  <span className="font-mono text-[10px]">Açık × %40 × Renal</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  İntraselüler şift saatler sürer, fatal aritmiyi önlemek için ilk etapta açığın en çok %40'ı verilir. Renal katsayı: {renalFactor} (eGFR: {renalStatus === 'normal' ? '≥90' : renalStatus === 'mild_moderate' ? '30–89' : '<30'}):
                </div>
                <div className="font-mono font-bold text-teal-700 dark:text-teal-300 text-[11px]">
                  {estimatedDeficitTotal} mEq × 0.40 × {renalFactor} = ~{initialSessionMeqTarget} mEq K⁺
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/10 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 space-y-1">
                <div className="font-bold text-teal-600 dark:text-teal-400 flex items-center justify-between">
                  <span>3. Ampul Sayısı &amp; İlaç İçeriği</span>
                  <span className="font-mono text-[10px]">{kPerAmp} mEq K⁺ / Ampul</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  Seans Dozu ({initialSessionMeqTarget} mEq) / Ampul Başı K⁺ ({kPerAmp} mEq) = {rawAmpCount.toFixed(2)} → <strong>{suggestedAmpCount} Ampul</strong>
                </div>
                <div className="font-mono font-bold text-teal-700 dark:text-teal-300 text-[11px]">
                  Toplam Verilen Potasyum: {totalKDeliveredMeq} mEq K⁺ ({totalAmpVolumeMl} mL)
                  {formulation === 'kaliphos' && ` + ${totalPDeliveredMeq} mEq Fosfat (~${(totalPDeliveredMeq/3).toFixed(1)} mmol P)`}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/10 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 space-y-1">
                <div className="font-bold text-teal-600 dark:text-teal-400 flex items-center justify-between">
                  <span>4. Çözelti Hacmi ve Derişim Hesabı</span>
                  <span className="font-mono text-[10px]">(K⁺ / Hacim) × 1000</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  Toplam Hacim = {finalVolumeMl} mL {drainBagVolume ? '(Torbadan boşaltıldı)' : `(${baseBagVolume} mL baz + ${totalAmpVolumeMl} mL ampul)`}:
                </div>
                <div className="font-mono font-bold text-teal-700 dark:text-teal-300 text-[11px]">
                  ({totalKDeliveredMeq} mEq / {finalVolumeMl} mL) × 1000 = {concentrationMeqL.toFixed(1)} mEq/L
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {fluidRestriction 
                    ? '⚡ Sıvı Kısıtlaması Aktif: SVK ile ≤ 400 mEq/L güvenlidir (periferik yolda kısıtlama yapılamaz).'
                    : 'Standart Sınırlar: Periferik ≤ 40 mEq/L · SVK ≤ 80–100 mEq/L'}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/10 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 space-y-1">
                <div className="font-bold text-teal-600 dark:text-teal-400 flex items-center justify-between">
                  <span>5. Minimum İnfüzyon Süresi ve Pompa Hızı</span>
                  <span className="font-mono text-[10px]">Toplam K⁺ / Hız Limiti</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  Maks Güvenli Saatlik Hız: {isPeripheral ? 'Periferik ≤ 10 mEq/saat' : 'Santral ≤ 20 mEq/saat'}:
                </div>
                <div className="font-mono font-bold text-teal-700 dark:text-teal-300 text-[11px]">
                  {totalKDeliveredMeq} mEq / {maxSafeInfusionRateMeqHr} mEq/saat = {minInfusionHours.toFixed(2)} saat → <strong>{suggestedInfusionHoursRounded} saat</strong>
                </div>
                <div className="font-mono font-bold text-teal-700 dark:text-teal-300 text-[11px]">
                  Perfüzör / Pompa Hızı = {finalVolumeMl} mL / {suggestedInfusionHoursRounded} saat = <strong>{pumpRateMlHr} mL/saat</strong>
                </div>
              </div>
            </div>
          )}

          <div className={`p-5 rounded-2xl border space-y-4 ${
            isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ÖNERİLEN REPLASMAN PLANI
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300">
                1. Seans Dozu
              </span>
            </div>

            {/* Ampul Sayısı ve Toplam K+ (Üzerine Gelince Canlı Formül) */}
            <div 
              className="group relative p-3 rounded-xl border border-transparent hover:border-teal-500/30 hover:bg-teal-500/5 transition-all cursor-help"
              onMouseEnter={() => setActiveHoverTooltip('ampul')}
              onMouseLeave={() => setActiveHoverTooltip(null)}
              onClick={() => setActiveHoverTooltip(activeHoverTooltip === 'ampul' ? null : 'ampul')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Önerilen Ampul</span>
                    <HelpCircle className="w-3.5 h-3.5 text-teal-500/70" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400 font-mono">
                    {suggestedAmpCount} Ampul
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    ({totalAmpVolumeMl} mL çözelti)
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Verilen Potasyum</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                    {totalKDeliveredMeq} mEq K⁺
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    (Tahmini açık: ~{estimatedDeficitTotal} mEq)
                  </span>
                </div>
              </div>

              {/* Hover Tooltip: Ampul Hesabı */}
              <div className={`mt-2 p-2.5 rounded-lg text-[11px] bg-slate-900 text-slate-200 border border-slate-700 shadow-xl transition-all ${
                activeHoverTooltip === 'ampul' ? 'block' : 'hidden group-hover:block'
              }`}>
                <div className="font-bold text-teal-400 mb-1 flex items-center justify-between">
                  <span>📐 Ampul ve Doz Formülü:</span>
                  <span className="text-[10px] text-slate-400">Hesap Detayı</span>
                </div>
                <div>• ΔK = ({tarK} - {curK}) = {deltaK.toFixed(1)} mEq/L → Total Açık = ~{estimatedDeficitTotal} mEq</div>
                <div>• 1. Seans Hedefi = Açık × %40 × Renal Faktör ({renalFactor}) = <strong>{initialSessionMeqTarget} mEq K⁺</strong></div>
                <div>• Ampul Başı K⁺ = {kPerAmp} mEq → ({initialSessionMeqTarget} / {kPerAmp}) = {rawAmpCount.toFixed(2)} → <strong>{suggestedAmpCount} Ampul ({totalKDeliveredMeq} mEq K⁺)</strong></div>
              </div>
            </div>

            {/* Kaliphos seçildiyse: Verilen Fosfat Göstergesi (Üzerine Gelince Formül) */}
            {formulation === 'kaliphos' && (
              <div 
                className={`group relative p-3 rounded-xl border transition-all cursor-help ${
                  isDark ? 'bg-purple-950/30 border-purple-800 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
                }`}
                onMouseEnter={() => setActiveHoverTooltip('kaliphos')}
                onMouseLeave={() => setActiveHoverTooltip(null)}
                onClick={() => setActiveHoverTooltip(activeHoverTooltip === 'kaliphos' ? null : 'kaliphos')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">EŞZAMANLI FOSFAT</span>
                      <HelpCircle className="w-3 h-3 text-purple-400" />
                    </div>
                    <span className="text-xs font-semibold">Hastanın Alacağı Fosfat:</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold font-mono text-purple-600 dark:text-purple-400">
                      {totalPDeliveredMeq} mEq
                    </span>
                    <span className="text-[10px] block opacity-75">
                      (~{(totalPDeliveredMeq / 3).toFixed(1)} mmol P)
                    </span>
                  </div>
                </div>

                {/* Hover Tooltip: Kaliphos Fosfat */}
                <div className={`mt-2 p-2.5 rounded-lg text-[11px] bg-slate-900 text-slate-200 border border-slate-700 shadow-xl transition-all ${
                  activeHoverTooltip === 'kaliphos' ? 'block' : 'hidden group-hover:block'
                }`}>
                  <div className="font-bold text-purple-300 mb-0.5">📐 Kaliphos Fosfat Hesabı:</div>
                  <div>• 1 Ampul (10 mL) = 30 mEq K⁺ + <strong>60 mEq Fosfat</strong> (~20 mmol P)</div>
                  <div>• {suggestedAmpCount} Ampul × 60 mEq = <strong>{totalPDeliveredMeq} mEq Fosfat</strong> (~{(totalPDeliveredMeq / 3).toFixed(1)} mmol P)</div>
                </div>
              </div>
            )}

            {/* Derişim Kartı & Flebit / Sıvı Kısıtlaması Güvenliği (Üzerine Gelince Formül) */}
            <div 
              className={`group relative p-3.5 rounded-xl border transition-all cursor-help ${
                isCentralFluidRestrictedSafe
                  ? isDark ? 'bg-indigo-950/30 border-indigo-700/80 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
                  : isConcentrationSafe
                    ? isDark ? 'bg-emerald-950/20 border-emerald-800/80 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : isConcentrationBorderline
                      ? isDark ? 'bg-amber-950/20 border-amber-800/80 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'
                      : isDark ? 'bg-rose-950/20 border-rose-800/80 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
              onMouseEnter={() => setActiveHoverTooltip('concentration')}
              onMouseLeave={() => setActiveHoverTooltip(null)}
              onClick={() => setActiveHoverTooltip(activeHoverTooltip === 'concentration' ? null : 'concentration')}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  {isCentralFluidRestrictedSafe ? (
                    <Zap className="w-4 h-4 text-indigo-500" />
                  ) : isConcentrationSafe ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  )}
                  <span>Çözelti Derişimi:</span>
                  <HelpCircle className="w-3.5 h-3.5 opacity-70" />
                </span>
                <span className="text-sm font-mono font-extrabold">
                  {concentrationMeqL.toFixed(1)} mEq/L
                </span>
              </div>

              {/* Açıklama Metni: Periferik vs Santral Standart vs Santral Sıvı Kısıtlaması (400 mEq/L) */}
              <div className="text-[11px] leading-relaxed opacity-90 mt-1">
                {isPeripheral ? (
                  fluidRestriction ? (
                    concentrationMeqL <= 40 ? (
                      `✅ Periferik damar yolu için derişim güvenli (≤ 40 mEq/L). Ancak sıvı kısıtlaması nedeniyle torba hacmi artırılamıyor ve daha fazla K⁺ gerekiyorsa Santral Venöz Kateter (SVK) açılmalıdır.`
                    ) : (
                      `⛔ SIVI KISITLAMASI PERİFERİK YOLDAN YAPILAMAZ! Periferik damarda derişim > 40–60 mEq/L olduğunda şiddetli flebit ve kimyasal nekroz riski vardır (${concentrationMeqL.toFixed(1)} mEq/L kontrendikedir). Sıvı kısıtlı hastada konsantre replasman için Santral Venöz Kateter (SVK) açılmalıdır.`
                    )
                  ) : (
                    isConcentrationSafe 
                      ? `✅ Periferik damar yolu için GÜVENLİ (≤ 40 mEq/L sınırı altında). Toplam sıvı hacmi: ${finalVolumeMl} mL.`
                      : isConcentrationBorderline
                        ? `⚠️ Sınırda derişim (40–60 mEq/L). Periferik damarda venöz yanma ve flebit yapabilir. Sıvı hacmini artırmanız veya infüzyon hızını yavaşlatmanız önerilir.`
                        : `⛔ YÜKSEK FLEBİT RİSKİ (> 60 mEq/L). Periferik yoldan verilmesi kontrendikedir! Torba hacmini artırın (örn. 500cc veya 1000cc) ya da Santral Venöz Kateter (SVK) kullanın.`
                  )
                ) : (
                  fluidRestriction ? (
                    isCentralFluidRestrictedSafe
                      ? `⚡ SIVI KISITLAMASI PROTOKOLÜ (SVK + PERFÜZÖR) ONAYLI: Santral yoldan sıvı kısıtlaması olan kritik hastada 400 mEq/L'ye kadar konsantre çözeltiler (toplam sıvı: ${finalVolumeMl} mL) güvenle verilebilir. Kural: Yalnızca elektronik enjektör perfüzörü ile, saatte ≤ 20 mEq K⁺ hızında ve devamlı kardiyak (EKG) monitörizasyonla uygulanmalıdır.`
                      : `⛔ AŞIRI DERİŞİM (> 400 mEq/L). Sıvı kısıtlamasında dahi santral yoldan 400 mEq/L üzeri önerilmez; en az 50 mL veya 100 mL'ye seyreltiniz.`
                  ) : (
                    isCentralStandardSafe
                      ? `✅ Santral Venöz Kateter (SVK) için GÜVENLİ (≤ 80 mEq/L standart torba sınırı altında). Toplam sıvı hacmi: ${finalVolumeMl} mL.`
                      : isCentralStandardBorderline
                        ? `ℹ️ Standart santral torba sınırı (80–100 mEq/L). SVK ve infüzyon pompası ile kontrollü uygulanmalıdır.`
                        : `⚠️ Santral yolda standart torba sınırı (> 80–100 mEq/L) aşıldı (${concentrationMeqL.toFixed(1)} mEq/L). Torba hacmini artırınız veya hastada kalp yetmezliği / oligüri nedeniyle sıvı kısıtlaması gerekiyorsa sol taraftan 'Sıvı Kısıtlaması' seçeneğini aktif ediniz (400 mEq/L protokolü).`
                  )
                )}
              </div>

              {/* Hover Tooltip: Derişim Hesabı */}
              <div className={`mt-2 p-2.5 rounded-lg text-[11px] bg-slate-900 text-slate-200 border border-slate-700 shadow-xl transition-all ${
                activeHoverTooltip === 'concentration' ? 'block' : 'hidden group-hover:block'
              }`}>
                <div className="font-bold text-teal-400 mb-1">📐 Derişim Formülü:</div>
                <div>• Derişim (mEq/L) = (Toplam K⁺ / Toplam Sıvı Hacmi) × 1000</div>
                <div>• ({totalKDeliveredMeq} mEq / {finalVolumeMl} mL) × 1000 = <strong>{concentrationMeqL.toFixed(1)} mEq/L</strong></div>
                <div className="mt-1 pt-1 border-t border-slate-700 text-[10px] text-slate-300">
                  <strong>Kılavuz Sınırları:</strong> Periferik ≤ 40 mEq/L · SVK Standart ≤ 80–100 mEq/L · <strong>SVK Sıvı Kısıtlı YB ≤ 400 mEq/L</strong>
                </div>
              </div>
            </div>

            {/* İnfüzyon Hızı ve Süresi (Üzerine Gelince Formül) */}
            <div 
              className={`group relative p-3.5 rounded-xl border transition-all cursor-help ${
                isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-2xs'
              }`}
              onMouseEnter={() => setActiveHoverTooltip('speed')}
              onMouseLeave={() => setActiveHoverTooltip(null)}
              onClick={() => setActiveHoverTooltip(activeHoverTooltip === 'speed' ? null : 'speed')}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-500" />
                  <span>İnfüzyon Hızı &amp; Süresi</span>
                  <HelpCircle className="w-3.5 h-3.5 opacity-70" />
                </span>
                <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                  {pumpRateMlHr} mL/saat
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Minimum İnfüzyon Süresi:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    En az {suggestedInfusionHoursRounded} saat
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">K⁺ İnfüzyon Hızı:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    {(totalKDeliveredMeq / suggestedInfusionHoursRounded).toFixed(1)} mEq/saat
                  </span>
                </div>
              </div>

              {/* Hover Tooltip: Hız ve Süre Hesabı */}
              <div className={`mt-2 p-2.5 rounded-lg text-[11px] bg-slate-900 text-slate-200 border border-slate-700 shadow-xl transition-all ${
                activeHoverTooltip === 'speed' ? 'block' : 'hidden group-hover:block'
              }`}>
                <div className="font-bold text-teal-400 mb-1">📐 Süre ve Pompa Hızı Formülü:</div>
                <div>• Güvenli Saatlik Üst Sınır: {isPeripheral ? 'Periferik ≤ 10 mEq/saat' : 'Santral ≤ 20 mEq/saat'}</div>
                <div>• Minimum Süre = Toplam K⁺ ({totalKDeliveredMeq} mEq) / Hız Sınırı ({maxSafeInfusionRateMeqHr} mEq/saat) = <strong>{minInfusionHours.toFixed(2)} saat (En az {suggestedInfusionHoursRounded} saat)</strong></div>
                <div>• Perfüzör / Pompa Hızı = Toplam Hacim ({finalVolumeMl} mL) / Süre ({suggestedInfusionHoursRounded} sa) = <strong>{pumpRateMlHr} mL/saat</strong></div>
              </div>
            </div>

            {/* Magnezyum (ROMK Kanalı) Hatırlatması */}
            <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
              isDark ? 'bg-teal-950/20 border-teal-900 text-teal-200' : 'bg-teal-50 border-teal-200 text-teal-950'
            }`}>
              <ShieldAlert className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>Refrakter Hipokalemi &amp; Mg İlişkisi:</strong> Serum Magnezyum düzeyi kontrol edilmelidir (Hedef ≥ 2.0 mg/dL). Mg eksikliği varsa böbrek ROMK kanallarından potasyum kaçağı durdurulamaz; potasyumla birlikte veya öncesinde Magnezyum replasmanı yapılmalıdır.
              </div>
            </div>
          </div>

          {/* Seans Rasyoneli Butonu */}
          <button
            type="button"
            onClick={() => setShowSessionRationale(!showSessionRationale)}
            className={`w-full p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
              isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-teal-500" />
              <span>Neden Kademeli Seanslar ve Yavaş İnfüzyon?</span>
            </span>
            {showSessionRationale ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSessionRationale && (
            <div className={`p-4 rounded-xl border text-xs space-y-2.5 ${
              isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <div className="font-bold text-teal-600 dark:text-teal-400">3 Temel Fizyolojik Gerekçe:</div>
              <div>
                <strong>1. Kardiyak Aritmi &amp; Asistoli Riski:</strong> Potasyum miyokard istirahat membran potansiyelini belirler. Hızlı bolus veya aşırı hızlı infüzyon fatal ventriküler fibrilasyon ve kardiyak arreste yol açar.
              </div>
              <div>
                <strong>2. İntraselüler Şift Zamanlaması:</strong> Potasyumun %98'i hücre içindedir. İnfüzyonla damara giren potasyumun Na⁺/K⁺-ATPaz pompasıyla hücre içine taşınması saatler alır; bu nedenle tek seansta aşırı yükleme akut hiperkalemi toksisitesi yaratır.
              </div>
              <div>
                <strong>3. Renal Eşik ve Güvenlik:</strong> Böbrekler akut yüksek potasyumu filtre etmekte zorlanabilir veya KBY'de filtre edemez. Her 20–40 mEq replasman sonrası kontrol kan gazı/serum örneği alınmalıdır.
              </div>
            </div>
          )}

          {/* İnfüzyon Hızı & Derişim Kaynakları Butonu */}
          <button
            type="button"
            onClick={() => setShowReferences(!showReferences)}
            className={`w-full p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
              isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-teal-500" />
              <span>İnfüzyon Hızı &amp; Derişim Kaynakları (Kılavuzlar)</span>
            </span>
            {showReferences ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showReferences && (
            <div className={`p-4 rounded-xl border text-xs space-y-3 ${
              isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <div className="font-bold text-teal-600 dark:text-teal-400">Klinik Kılavuz Standartları:</div>
              <div>
                <strong>1. UpToDate (Treatment of hypokalemia in adults):</strong>
                <p className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                  "Standart intravenöz potasyum infüzyon hızı geçici hiperkalemi ve flebiti önlemek için periferik yoldan 10 mEq/saat'i aşmamalıdır. Hayatı tehdit eden şiddetli durumlarda santral yoldan sürekli EKG monitörizasyonu ile 20–40 mEq/saat hızına çıkılabilir."
                </p>
              </div>
              <div>
                <strong>2. Tintinalli's Emergency Medicine (9. Baskı):</strong>
                <p className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                  Periferik venöz derişim sınırı ≤ 40 mEq/L (flebit profilaksisi), maksimum infüzyon hızı 10 mEq/saat. Santral yolda maksimum konsantrasyon 80–100 mEq/L.
                </p>
              </div>
              <div>
                <strong>3. Miller's Anesthesia (9. Baskı):</strong>
                <p className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                  Perioperatif elektrolit replasmanında fatal asistoli riskini önlemek için potasyum asla bolus verilmez; infüzyon pompası ile kontrollü uygulanır.
                </p>
              </div>
              <div>
                <strong>4. T.C. Sağlık Bakanlığı Yüksek Riskli İlaç Güvenlik Rehberi:</strong>
                <p className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                  Potasyum ampulleri (KCl ve Kaliphos) yüksek riskli ilaç grubundadır. Periferik yolda saatlik 10 mEq dozu geçilmemeli ve sulandırılarak verilmelidir.
                </p>
              </div>
              <div>
                <strong>5. Yoğun Bakım &amp; Sıvı Kısıtlaması Derişim Protokolü (UpToDate &amp; The ICU Book - Marino):</strong>
                <p className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                  "Kalp yetmezliği, ARDS veya oligürik böbrek yetmezliği nedeniyle agresif sıvı kısıtlaması gereken yoğun bakım hastalarında Santral Venöz Kateter (SVK) aracılığıyla enjektör perfüzörü kullanılarak 200–400 mEq/L derişime kadar (örneğin 50 mL'de 20 mEq veya 100 mL'de 40 mEq K⁺) güvenle verilebilir. Bu yöntemde infüzyon hızı kesinlikle saatte 20 mEq'yi aşmamalı, uygulama enjektör pompası ile yapılmalı ve hasta sürekli kardiyak (EKG) monitörizasyonunda tutulmalıdır."
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PotassiumCalculator;
