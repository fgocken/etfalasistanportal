import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Phone, 
  Calculator,
  Droplet,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { IntraopFluidCalculator } from './calculators/IntraopFluidCalculator';

interface PortalWorkspaceProps {
  onBackToWelcome: () => void;
  onOpenDisclaimer: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

/**
 * Kilo, MV Volüm, İdame Sıvı Hesaplayıcısı
 * @param {Object} params - Hesaplama parametreleri
 * @param {string|number} params.height - Boy (cm veya inç)
 * @param {string|number} params.weight - Kilo (kg veya lb)
 * @param {boolean} [params.isMale=true] - Erkek ise true, Kadın ise false
 * @param {boolean} [params.isMetric=true] - Metrik (cm/kg) ise true, İmperial (inç/lb) ise false
 */
function calculateWeightAndVentilation({
  height,
  weight,
  isMale = true,
  isMetric = true,
}: {
  height: string | number;
  weight: string | number;
  isMale?: boolean;
  isMetric?: boolean;
}) {
  // 1. Birim Dönüşümleri (cm ve kg cinsine çevirme)
  const hCm = isMetric ? parseFloat(String(height)) || 0 : (parseFloat(String(height)) || 0) * 2.54;
  const wKg = isMetric ? parseFloat(String(weight)) || 0 : (parseFloat(String(weight)) || 0) * 0.45359237;

  // 2. İdeal Kilo (IBW - Devine Formülü)
  let ibw = 0;
  if (hCm > 152.4) {
    ibw = isMale ? 50.0 + 0.91 * (hCm - 152.4) : 45.5 + 0.91 * (hCm - 152.4);
  } else {
    ibw = isMale ? 50.0 : 45.5;
  }

  // 3. Vücut Kitle İndeksi (VKİ / BMI)
  const bmi = hCm > 0 ? wKg / Math.pow(hCm / 100.0, 2) : 0;

  // VKİ Sınıflandırması
  let bmiCategory = "";
  let bmiColor = "";
  if (bmi > 0) {
    if (bmi < 18.5) { bmiCategory = "Zayıf"; bmiColor = "#0288D1"; }
    else if (bmi < 25.0) { bmiCategory = "Normal"; bmiColor = "#2E7D32"; }
    else if (bmi < 30.0) { bmiCategory = "Fazla Kilolu"; bmiColor = "#EF6C00"; }
    else if (bmi < 35.0) { bmiCategory = "Obezite (Sınıf 1)"; bmiColor = "#C62828"; }
    else if (bmi < 40.0) { bmiCategory = "Obezite (Sınıf 2)"; bmiColor = "#B71C1C"; }
    else { bmiCategory = "Obezite (Sınıf 3 - Morbid)"; bmiColor = "#880E4F"; }
  }

  // 4. Öngörülen Kilo (PBW - Predicted Body Weight)
  const pbw = ibw; // ARDSnet standardı: PBW = IBW

  // 5. Düzeltilmiş Kilo (AdjBW - Adjusted Body Weight)
  // Gerçek kilo, İdeal kilonun %120'sinden fazlaysa hesaplanır
  const isAdjustedActive = wKg > 0 && ibw > 0 && wKg > ibw * 1.2;
  const adjBw = isAdjustedActive 
    ? ibw + 0.4 * (wKg - ibw) 
    : wKg;

  // 6. Tidal Volüm Hesaplamaları (PBW üzerinden)
  const normalTvMin = pbw * 6; // Akciğer Koruyucu Ventilasyon (6 mL/kg)
  const normalTvMax = pbw * 8; // Akciğer Koruyucu Ventilasyon (8 mL/kg)
  const ardsTvMin = pbw * 4;   // ARDS Ventilasyonu (4 mL/kg)
  const ardsTvMax = pbw * 6;   // ARDS Ventilasyonu (4 mL/kg)

  // 7. İdame Sıvı Hesabı (“4-2-1” Kuralı / Holliday-Segar)
  // Hasta obez ise (BMI >= 30 veya Gerçek Kilo > %120 IBW) AdjBW kullanılır.
  // Obez değilse normal gerçek kilo (wKg) kullanılır.
  const isObese = (bmi >= 30) || isAdjustedActive;
  const fluidWeightVal = isObese ? adjBw : wKg;

  let fluidHourly = 0;
  let fluidFormulaBreakdown = '';
  if (fluidWeightVal > 0) {
    if (fluidWeightVal <= 10) {
      fluidHourly = fluidWeightVal * 4;
      fluidFormulaBreakdown = `${fluidWeightVal.toFixed(1)} kg × 4 mL/kg/saat = ${fluidHourly.toFixed(1)} mL/saat`;
    } else if (fluidWeightVal <= 20) {
      const tier1 = 10 * 4; // 40 mL
      const tier2 = (fluidWeightVal - 10) * 2;
      fluidHourly = tier1 + tier2;
      fluidFormulaBreakdown = `İlk 10 kg için 40 mL + ${(fluidWeightVal - 10).toFixed(1)} kg × 2 mL (${tier2.toFixed(1)} mL) = ${fluidHourly.toFixed(1)} mL/saat`;
    } else {
      const tier1 = 40; // 10 * 4 mL
      const tier2 = 20; // 10 * 2 mL
      const tier3 = (fluidWeightVal - 20) * 1;
      fluidHourly = tier1 + tier2 + tier3;
      fluidFormulaBreakdown = `İlk 10 kg için 40 mL + 10-20 kg için 20 mL + Kalan ${(fluidWeightVal - 20).toFixed(1)} kg için ${tier3.toFixed(1)} mL = ${fluidHourly.toFixed(1)} mL/saat`;
    }
  }

  const fluidDaily = fluidHourly * 24;

  return {
    hCm,
    wKg,
    ibw: ibw.toFixed(1),
    bmi: bmi.toFixed(1),
    bmiCategory,
    bmiColor,
    pbw: pbw.toFixed(1),
    adjBw: adjBw.toFixed(1),
    isAdjustedActive,
    isObese,
    fluidWeightUsed: fluidWeightVal.toFixed(1),
    fluidHourly: (Math.round(fluidHourly * 10) / 10).toFixed(1),
    fluidDaily: Math.round(fluidDaily),
    fluidFormulaBreakdown,
    normalTv: `${Math.round(normalTvMin)} - ${Math.round(normalTvMax)} mL`,
    ardsTv: `${Math.round(ardsTvMin)} - ${Math.round(ardsTvMax)} mL`
  };
}

export const PortalWorkspace: React.FC<PortalWorkspaceProps> = ({ 
  onBackToWelcome, 
  onOpenDisclaimer,
  isDark,
  onToggleTheme
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'calculator' | 'intraop' | 'contacts'>('tools');
  const [showFluidReferences, setShowFluidReferences] = useState<boolean>(false);

  // Calculator inputs
  const [calcHeight, setCalcHeight] = useState<string>('175');
  const [calcWeight, setCalcWeight] = useState<string>('75');
  const [calcIsMale, setCalcIsMale] = useState<boolean>(true);
  const [calcIsMetric, setCalcIsMetric] = useState<boolean>(true);

  // Compute results using user's exact function
  const calcResults = calculateWeightAndVentilation({
    height: calcHeight,
    weight: calcWeight,
    isMale: calcIsMale,
    isMetric: calcIsMetric
  });

  // Clinic Extensions
  const clinicContacts = [
    { title: 'Ameliyathane Koordinasyon & Danışma', ext: '2100', loc: 'Merkez Ameliyathane' },
    { title: 'Anestezi ve Reanimasyon Yoğun Bakım (ARYB)', ext: '3250', loc: '3. Kat Yoğun Bakım' },
    { title: 'Kıdemli Asistan & Nöbetçi Hekim Odası', ext: '2105', loc: 'Ameliyathane İçi' },
    { title: 'Merkez Kan Transfüzyon Ünitesi', ext: '3150', loc: '1. Kat' },
    { title: 'Klinik Eczanesi', ext: '4200', loc: 'Eczacılık Birimi' },
    { title: 'Mavi Kod / Acil Çağrı Merkezi', ext: '1111', loc: 'Güvenlik & Kriz' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-30 transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800 backdrop-blur' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWelcome}
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-teal-500" />
              <span className="hidden sm:inline">Karşılama Sayfası</span>
            </button>
            <div className={`h-4 w-px hidden sm:block ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            <h1 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Şişli Etfal EAH Anestezi & Reanimasyon
            </h1>
          </div>

          {/* Top-Right: Date & Theme Switch */}
          <div className="flex items-center gap-3">
            <div className={`text-xs font-mono hidden md:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className={`border-b transition-colors ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
          {[
            { id: 'tools', label: 'Genel Bakış', icon: Activity },
            { id: 'calculator', label: 'Kilo, MV Volüm, İdame Sıvı', icon: Calculator },
            { id: 'intraop', label: 'İntraop Sıvı', icon: Droplet },
            { id: 'contacts', label: 'Dahili Numaralar', icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? isDark 
                      ? 'bg-slate-800 text-teal-300 font-semibold border border-teal-500/20' 
                      : 'bg-teal-50 text-teal-800 font-semibold'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${
                  isActive 
                    ? isDark ? 'text-teal-400' : 'text-teal-700' 
                    : isDark ? 'text-slate-500' : 'text-slate-400'
                }`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* 1. Overview */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className={`border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Şişli Etfal Dashboard
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Şişli Etfal EAH Anesteziyoloji ve Reanimasyon Kliniği Asistanları için klinik araçlar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Kilo & MV Volüm */}
              <button
                onClick={() => setActiveTab('calculator')}
                className={`text-left p-5 rounded-xl border transition-all space-y-2 group cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-teal-500/40 text-slate-100'
                    : 'bg-white border-slate-200 hover:border-teal-400 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
                    <Calculator className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    IBW · PBW · TV
                  </span>
                </div>
                <h3 className={`text-sm font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-800'
                }`}>
                  Kilo, MV Volüm, İdame Sıvı
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Devine İdeal Kilo (IBW), Öngörülen Kilo (PBW), VKİ, Düzeltilmiş Kilo (AdjBW) ve koruyucu tidal volüm.
                </p>
              </button>

              {/* Card 2: İntraop Sıvı Hesaplaması */}
              <button
                onClick={() => setActiveTab('intraop')}
                className={`text-left p-5 rounded-xl border transition-all space-y-2 group cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-cyan-500/40 text-slate-100 ring-1 ring-cyan-500/20'
                    : 'bg-white border-slate-200 hover:border-cyan-400 text-slate-900 shadow-xs ring-1 ring-cyan-500/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-700'}`}>
                    <Droplet className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-cyan-400' : 'text-cyan-600 font-semibold'}`}>
                    Yeni Araç
                  </span>
                </div>
                <h3 className={`text-sm font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-cyan-800'
                }`}>
                  İntraop Sıvı Hesaplaması
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Açlık süresi, obezite (AdjBW) ve 4 farklı cerrahi doku travma kaybına göre saat saat infüzyon planı.
                </p>
              </button>

              {/* Card 3: Dahili Numaralar */}
              <button
                onClick={() => setActiveTab('contacts')}
                className={`text-left p-5 rounded-xl border transition-all space-y-2 group cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-teal-500/40 text-slate-100'
                    : 'bg-white border-slate-200 hover:border-teal-400 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700'}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Dahili Hatlar
                  </span>
                </div>
                <h3 className={`text-sm font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-800'
                }`}>
                  Klinik ve Dahili Hatlar
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ameliyathane koordinasyon, ARYB yoğun bakım, kıdemli hekim odası ve kan merkezi telefonları.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* 2. Custom Calculator: Kilo, MV Volüm, İdame Sıvı Hesaplayıcısı */}
        {activeTab === 'calculator' && (
          <div className={`rounded-xl border p-6 space-y-6 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`border-b pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div>
                <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Kilo, MV Volüm, İdame Sıvı Hesaplayıcısı
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  İdeal Kilo (IBW Devine), Öngörülen Kilo (PBW), VKİ, Düzeltilmiş Kilo (AdjBW), Koruyucu Ventilasyon Tidal Volümü ve 4-2-1 İdame Sıvı Hızı.
                </p>
              </div>

              {/* Metric / Imperial Unit Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setCalcIsMetric(true)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    calcIsMetric 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Metrik (cm, kg)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcIsMetric(false)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    !calcIsMetric 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  İmperial (inç, lb)
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Cinsiyet
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcIsMale(true)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      calcIsMale 
                        ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-semibold' : 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                        : isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Erkek
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcIsMale(false)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      !calcIsMale 
                        ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-semibold' : 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                        : isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Kadın
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Boy ({calcIsMetric ? 'cm' : 'inç'})
                </label>
                <input
                  type="number"
                  step="any"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(e.target.value)}
                  placeholder={calcIsMetric ? '175' : '69'}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Kilo ({calcIsMetric ? 'kg' : 'lb'})
                </label>
                <input
                  type="number"
                  step="any"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  placeholder={calcIsMetric ? '75' : '165'}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Calculation Output Cards */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              {/* 1. IBW & PBW */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    İdeal Kilo (IBW / Devine)
                  </div>
                  <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {calcResults.ibw} <span className="text-xs font-normal text-slate-500">kg</span>
                  </div>
                </div>
                <div className={`text-[11px] mt-3 pt-2 border-t ${
                  isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}>
                  Öngörülen Kilo (PBW): <strong className="font-mono text-slate-200 dark:text-white">{calcResults.pbw} kg</strong> (ARDSnet)
                </div>
              </div>

              {/* 2. BMI / VKİ */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Vücut Kitle İndeksi (VKİ / BMI)
                  </div>
                  <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {calcResults.bmi} <span className="text-xs font-normal text-slate-500">kg/m²</span>
                  </div>
                </div>
                <div className="mt-3 pt-2">
                  {calcResults.bmiCategory && (
                    <span 
                      style={{ color: calcResults.bmiColor }}
                      className="text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: calcResults.bmiColor }} />
                      {calcResults.bmiCategory}
                    </span>
                  )}
                </div>
              </div>

              {/* 3. Düzeltilmiş Kilo (AdjBW) */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Düzeltilmiş Kilo (AdjBW)
                  </div>
                  <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {calcResults.adjBw} <span className="text-xs font-normal text-slate-500">kg</span>
                  </div>
                </div>
                <div className={`text-[11px] mt-3 pt-2 border-t ${
                  isDark ? 'border-slate-700/60' : 'border-slate-200'
                }`}>
                  {calcResults.isAdjustedActive ? (
                    <span className="text-amber-400 font-medium">
                      Obezitede Aktif (Gerçek Kilo &gt; %120 IBW)
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      Normal aralık (Gerçek Kilo ≤ %120 IBW)
                    </span>
                  )}
                </div>
              </div>

              {/* 4. Akciğer Koruyucu Ventilasyon (6-8 mL/kg) */}
              <div className={`p-4 rounded-xl border sm:col-span-1 lg:col-span-2 ${
                isDark 
                  ? 'bg-teal-950/40 border-teal-800/60' 
                  : 'bg-teal-50/70 border-teal-200/80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isDark ? 'text-teal-300' : 'text-teal-800'}`}>
                    Akciğer Koruyucu Ventilasyon (Normal TV)
                  </span>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
                    6 - 8 mL/kg PBW
                  </span>
                </div>
                <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-teal-200' : 'text-teal-900'}`}>
                  {calcResults.normalTv}
                </div>
                <div className={`text-[11px] mt-2 ${isDark ? 'text-teal-300/80' : 'text-teal-700'}`}>
                  Standart cerrahi vakalarda barotravma ve volütravmayı önleyen koruyucu tidal volüm aralığı.
                </div>
              </div>

              {/* 5. ARDS Ventilasyonu (4-6 mL/kg) */}
              <div className={`p-4 rounded-xl border ${
                isDark 
                  ? 'bg-rose-950/30 border-rose-900/50' 
                  : 'bg-rose-50/70 border-rose-200/80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                    ARDS Ventilasyonu (Düşük TV)
                  </span>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                    4 - 6 mL/kg PBW
                  </span>
                </div>
                <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>
                  {calcResults.ardsTv}
                </div>
                <div className={`text-[11px] mt-2 ${isDark ? 'text-rose-300/80' : 'text-rose-700'}`}>
                  Akut solunum sıkıntısı sendromu (ARDS) ve kompliyansı düşük akciğerlerde hedef aralık.
                </div>
              </div>
            </div>

            {/* 6. İdame Sıvı Hesabı (“4-2-1” Kuralı / Holliday-Segar) */}
            <div className={`p-5 rounded-xl border transition-colors space-y-4 ${
              isDark 
                ? 'bg-slate-800/40 border-slate-700/80' 
                : 'bg-sky-50/60 border-sky-200/80 shadow-xs'
            }`}>
              {/* Başlık ve Obezite / Kilo Durumu Rozeti */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-700'
                  }`}>
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      İdame Sıvı Hesabı (“4-2-1” Kuralı)
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Holliday-Segar formülü ile saatlik parenteral sıvı infüzyon gereksinimi
                    </p>
                  </div>
                </div>

                {/* Obezite / Kullanılan Kilo Rozeti */}
                <div className="self-start sm:self-auto">
                  {calcResults.isObese ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                      <span>Obez Hasta: Düzeltilmiş Kilo (AdjBW: <strong>{calcResults.fluidWeightUsed} kg</strong>) kullanıldı</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>Normal Ağırlık: Gerçek Kilo (<strong>{calcResults.fluidWeightUsed} kg</strong>) kullanıldı</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Obezite Klinik Açıklaması */}
              {calcResults.isObese && (
                <div className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                  isDark ? 'bg-amber-950/30 text-amber-300/90 border border-amber-900/40' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                  <span>
                    <strong>Klinik Prensip:</strong> Hastanın VKİ &ge; 30 kg/m² veya gerçek ağırlığı ideal kilosunun %120&apos;sinden fazla olduğu için, aşırı hidrasyon ve kardiyak/pulmoner yüklenmeyi önlemek amacıyla idame sıvı hızı <strong>Düzeltilmiş Vücut Ağırlığı (AdjBW = {calcResults.fluidWeightUsed} kg)</strong> üzerinden hesaplanmıştır.
                  </span>
                </div>
              )}

              {/* Sonuç Kartı: Saatlik İdame Hızı */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                    Saatlik İdame Sıvı Hızı
                  </span>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                    isDark ? 'bg-sky-950 text-sky-400' : 'bg-sky-50 text-sky-700'
                  }`}>
                    İnfüzyon Hızı
                  </span>
                </div>
                <div className={`text-3xl font-bold font-mono mt-2 tabular-nums ${
                  isDark ? 'text-sky-200' : 'text-sky-950'
                }`}>
                  {calcResults.fluidHourly} <span className="text-base font-normal text-slate-500">mL/saat</span>
                </div>
                <div className={`text-[11px] mt-2 pt-2 border-t ${
                  isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  Elektronik infüzyon pompası saatlik akış ayarı
                </div>
              </div>

              {/* 4-2-1 Kuralı Kırılım Kutusu */}
              <div className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white/80 border-slate-200 text-slate-700'
              }`}>
                <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span>Hesaplama Kırılımı (“4-2-1” Kuralı):</span>
                  <span className="font-mono text-[11px] text-teal-600 dark:text-teal-400">
                    Hesaplanan Ağırlık: {calcResults.fluidWeightUsed} kg
                  </span>
                </div>
                <div className="font-mono text-xs text-teal-700 dark:text-teal-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1.5 rounded">
                  {calcResults.fluidFormulaBreakdown || '0 mL/saat'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 text-slate-500 dark:text-slate-400">
                  <div>• <strong>0 - 10 kg:</strong> 4 mL/kg/saat</div>
                  <div>• <strong>&gt;10 - 20 kg:</strong> 40 mL + 2 mL/kg/saat</div>
                  <div>• <strong>&gt;20 kg:</strong> 60 mL + 1 mL/kg/saat</div>
                </div>
              </div>

              {/* Literatür ve Referanslar Açılır Bölüm */}
              <div className={`pt-2 border-t ${isDark ? 'border-slate-700/60' : 'border-sky-200/60'}`}>
                <button
                  type="button"
                  onClick={() => setShowFluidReferences(!showFluidReferences)}
                  className={`flex items-center justify-between w-full text-left text-xs font-medium cursor-pointer transition-colors ${
                    isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                    <span>Literatür, Doğrulama &amp; Referanslar (MdCalc)</span>
                  </span>
                  {showFluidReferences ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showFluidReferences && (
                  <div className={`mt-3 p-3.5 rounded-lg text-[11px] space-y-2.5 ${
                    isDark ? 'bg-slate-900/90 border border-slate-800 text-slate-300' : 'bg-white border border-slate-200 text-slate-700'
                  }`}>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Orijinal / Birincil Referans (Original/Primary Reference):</div>
                      <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                        Holiday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. <em>Pediatrics</em>. 1957.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Anestezi Validasyonu (Validation):</div>
                      <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                        Oh TH. Formulas for calculating fluid maintenance requirements. <em>Anesthesiology</em>. 1980; 53:351.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Diğer Referanslar (Other References):</div>
                      <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                        Arya VK. Basics of fluid and blood transfusion therapy in paediatric surgical patients. <em>Indian Journal of Anaesthesia</em>. 2012; 56(5):454-462. doi:10.4103/0019-5049.103960.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. Intraop Fluid Calculator */}
        {activeTab === 'intraop' && (
          <IntraopFluidCalculator isDark={isDark} />
        )}

        {/* 4. Contacts */}
        {activeTab === 'contacts' && (
          <div className={`rounded-xl border p-6 space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Klinik & Ameliyathane Dahili Numaraları
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Şişli Etfal EAH bünyesinde sık aranan kritik birimler.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {clinicContacts.map((c) => (
                <div key={c.title} className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                  isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                }`}>
                  <div>
                    <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.title}</div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{c.loc}</div>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono text-base font-bold tabular-nums ${
                      isDark ? 'text-teal-400' : 'text-teal-900'
                    }`}>{c.ext}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-auto border-t py-4 px-4 sm:px-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span>Şişli Hamidiye Etfal EAH · Anestezi ve Reanimasyon Kliniği Asistan Portalı</span>
          <button
            onClick={onOpenDisclaimer}
            className={`transition-colors underline underline-offset-4 cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-teal-400' : 'text-slate-600 hover:text-teal-700'
            }`}
          >
            Sorumluluk Reddi
          </button>
        </div>
      </footer>
    </div>
  );
};
