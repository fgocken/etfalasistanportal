import React, { useState } from 'react';
import { 
  Droplet, 
  Clock, 
  Scissors, 
  Scale, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Layers, 
  HelpCircle,
  Activity,
  ArrowRight
} from 'lucide-react';

interface IntraopFluidCalculatorProps {
  isDark: boolean;
}

export type SurgicalInvasiveness = 'superficial' | 'low' | 'moderate' | 'high';

interface SurgicalOption {
  id: SurgicalInvasiveness;
  label: string;
  rangeText: string;
  factor: number; // mL/kg/saat
  examples: string;
}

const SURGICAL_OPTIONS: SurgicalOption[] = [
  {
    id: 'superficial',
    label: 'Yüzeyel Prosedür',
    rangeText: '0 – 1 mL/kg/saat',
    factor: 0.5,
    examples: 'Deri lezyonları, plastik cerrahi küçük eksizyonlar, yüzeyel biyopsiler'
  },
  {
    id: 'low',
    label: 'Düşük İnvaziv',
    rangeText: '2 – 4 mL/kg/saat',
    factor: 3.0,
    examples: 'İnguinal herni onarımı, diz/omuz artroskopisi, transüretral girişimler'
  },
  {
    id: 'moderate',
    label: 'Orta İnvaziv',
    rangeText: '4 – 6 mL/kg/saat',
    factor: 5.0,
    examples: 'Açık kolesistektomi, histerektomi, apandektomi, majör ekstremite ameliyatları'
  },
  {
    id: 'high',
    label: 'Yüksek İnvaziv',
    rangeText: '8 – 10 mL/kg/saat',
    factor: 9.0,
    examples: 'Majör laparotomi, barsak rezeksiyonları, radikal sistektomi, torakotomi'
  }
];

export const IntraopFluidCalculator: React.FC<IntraopFluidCalculatorProps> = ({ isDark }) => {
  // Inputs
  const [weight, setWeight] = useState<string>('70');
  const [isObese, setIsObese] = useState<boolean>(false);
  const [height, setHeight] = useState<string>('170');
  const [isMale, setIsMale] = useState<boolean>(true);
  const [fastingHours, setFastingHours] = useState<string>('8');
  const [surgicalLossType, setSurgicalLossType] = useState<SurgicalInvasiveness>('low');
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  // Parse values
  const weightNum = parseFloat(weight) || 0;
  const heightNum = parseFloat(height) || 0;
  const fastingNum = Math.max(0, parseFloat(fastingHours) || 0);

  // Devine IBW & AdjBW calculation
  let ibw = 0;
  let adjBw = 0;
  let bmi = 0;

  if (heightNum > 0 && weightNum > 0) {
    const heightInches = heightNum / 2.54;
    const baseIbw = isMale ? 50.0 : 45.5;
    ibw = baseIbw + 2.3 * (heightInches - 60);
    if (ibw < 10) ibw = 10;

    // AdjBW = IBW + 0.4 * (Actual - IBW)
    adjBw = ibw + 0.4 * (weightNum - ibw);
    const heightM = heightNum / 100;
    bmi = weightNum / (heightM * heightM);
  }

  // Determine calculation weight
  // If user explicitly marks obese, use AdjBW (if height provided, else fallback to weightNum)
  const calcWeight = isObese && adjBw > 0 ? adjBw : weightNum;

  // 1) Hourly Maintenance (4-2-1 Rule)
  let hourlyMaintenance = 0;
  if (calcWeight > 0) {
    if (calcWeight <= 10) {
      hourlyMaintenance = calcWeight * 4;
    } else if (calcWeight <= 20) {
      hourlyMaintenance = 40 + (calcWeight - 10) * 2;
    } else {
      hourlyMaintenance = 60 + (calcWeight - 20) * 1;
    }
  }

  // 2) Fasting Deficit
  const fastingDeficit = fastingNum * hourlyMaintenance;

  // 3) Surgical Loss Rate
  const selectedSurgOption = SURGICAL_OPTIONS.find(opt => opt.id === surgicalLossType) || SURGICAL_OPTIONS[1];
  const surgicalLossRate = selectedSurgOption.factor * calcWeight;

  // 4) Hourly Fluid Schedule
  // 1. saat: 1/2 Açlık defisiti + Saatlik idame
  const hour1Fluid = (0.5 * fastingDeficit) + hourlyMaintenance;

  // 2. saat: 1/4 Açlık defisiti + Saatlik idame + Cerrahi kayıp
  const hour2Fluid = (0.25 * fastingDeficit) + hourlyMaintenance + surgicalLossRate;

  // 3. saat: 1/4 Açlık defisiti + Saatlik idame + Cerrahi kayıp
  const hour3Fluid = (0.25 * fastingDeficit) + hourlyMaintenance + surgicalLossRate;

  // 4. saat ve sonrası: Saatlik idame + Cerrahi kayıp
  const hour4PlusRate = hourlyMaintenance + surgicalLossRate;

  // Cumulative Totals
  const totalHour1 = hour1Fluid;
  const totalHour2 = hour1Fluid + hour2Fluid;
  const totalHour3 = totalHour2 + hour3Fluid;
  const totalHour4 = totalHour3 + hour4PlusRate;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-2xl border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-700'}`}>
              <Droplet className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                İntraop Sıvı Hesaplaması
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                İdame (4-2-1), Açlık Defisiti ve İnvaziv Cerrahi Kayıp Esaslı Perioperatif İnfüzyon Protokolü
              </p>
              
              {/* Cerrahi Kanama Uyarı Rozeti / Bildirimi */}
              <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-md text-xs font-medium border ${
                isDark 
                  ? 'bg-amber-950/40 border-amber-600/40 text-amber-300' 
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span><strong>Önemli Uyarı:</strong> Bu hesaplamaya <u>cerrahi kanama</u> dahil edilmemiştir; kanama ve kan kaybı ayrıca kristaloid/kolloid/kan ürünü ile replase edilmelidir.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFormulaDetails(!showFormulaDetails)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                showFormulaDetails
                  ? isDark 
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' 
                    : 'bg-cyan-50 border-cyan-300 text-cyan-800'
                  : isDark 
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showFormulaDetails ? 'Formül Kuralını Gizle' : 'Formül Kuralları'}</span>
            </button>
          </div>
        </div>

        {/* Input Parameters Form */}
        <div className="pt-5 space-y-6">
          {/* Row 1: Weight & Obese Checkbox */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Weight Input */}
            <div className="md:col-span-5 space-y-2">
              <label className={`block text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Hasta Kilosu (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="350"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  className={`w-full px-4 py-2.5 rounded-xl border font-mono text-sm font-semibold transition-all outline-none focus:ring-2 ${
                    isDark 
                      ? 'bg-slate-800/80 border-slate-700 text-white focus:ring-cyan-500/40 focus:border-cyan-500' 
                      : 'bg-white border-slate-300 text-slate-900 focus:ring-cyan-500/30 focus:border-cyan-600'
                  }`}
                />
                <span className={`absolute right-3.5 top-2.5 text-xs font-mono font-medium ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  kg
                </span>
              </div>
            </div>

            {/* Obese Toggle Box */}
            <div className="md:col-span-7 space-y-2">
              <label className={`block text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Obezite Durumu
              </label>
              <div 
                onClick={() => setIsObese(!isObese)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isObese
                    ? isDark
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-700/80 text-slate-400 hover:border-slate-600'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isObese}
                    onChange={(e) => setIsObese(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold flex items-center gap-2">
                      <span>Hasta Obez (VKİ &ge; 30 veya Aşırı Kilolu)</span>
                      {isObese && (
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          AdjBW Aktif
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      {isObese 
                        ? 'Hesaplamalar Düzeltilmiş Ağırlık (AdjBW) üzerinden yapılacaktır.' 
                        : 'Standart hesaplama: Gerçek vücut ağırlığı kullanılır.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Obese Details (Height & Gender) */}
          {isObese && (
            <div className={`p-4 rounded-xl border space-y-3 animate-in fade-in duration-200 ${
              isDark ? 'bg-slate-800/40 border-amber-500/30' : 'bg-amber-50/50 border-amber-200'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-500 dark:text-amber-400">
                <Scale className="w-4 h-4" />
                <span>AdjBW (Düzeltilmiş Kilo) için Boy ve Cinsiyet Bilgisi</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Height Input */}
                <div className="sm:col-span-5 space-y-1">
                  <label className={`block text-[11px] font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Hasta Boyu (cm)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="100"
                      max="240"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="170"
                      className={`w-full px-3 py-2 rounded-lg border font-mono text-xs font-semibold outline-none focus:ring-2 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white focus:ring-amber-500/40' 
                          : 'bg-white border-slate-300 text-slate-900 focus:ring-amber-500/30'
                      }`}
                    />
                    <span className="absolute right-3 top-2 text-[11px] font-mono text-slate-400">cm</span>
                  </div>
                </div>

                {/* Gender Toggle */}
                <div className="sm:col-span-4 space-y-1">
                  <label className={`block text-[11px] font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Cinsiyet (Devine IBW)
                  </label>
                  <div className="flex rounded-lg p-0.5 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setIsMale(true)}
                      className={`flex-1 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                        isMale 
                          ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-xs' 
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      Erkek
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMale(false)}
                      className={`flex-1 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                        !isMale 
                          ? 'bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-300 shadow-xs' 
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      Kadın
                    </button>
                  </div>
                </div>

                {/* Calculated AdjBW Badge */}
                <div className="sm:col-span-3 flex flex-col justify-end">
                  <div className={`p-2.5 rounded-lg border text-center ${
                    isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200 shadow-2xs'
                  }`}>
                    <div className="text-[10px] uppercase font-mono text-slate-400">Hesaplanan AdjBW</div>
                    <div className="text-base font-extrabold text-amber-500 dark:text-amber-400 font-mono">
                      {adjBw.toFixed(1)} <span className="text-xs font-normal">kg</span>
                    </div>
                    {bmi > 0 && (
                      <div className="text-[10px] text-slate-500 font-mono">VKİ: {bmi.toFixed(1)} kg/m²</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Row 2: Fasting Hours Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className={`block text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Açlık Süresi (Saat)
              </label>
              <div className="flex items-center gap-1.5">
                {[6, 8, 10, 12].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setFastingHours(h.toString())}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                      fastingNum === h
                        ? isDark 
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' 
                          : 'bg-cyan-100 text-cyan-800 border border-cyan-300 font-bold'
                        : isDark
                          ? 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {h} sa
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Clock className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              </div>
              <input
                type="number"
                min="0"
                max="48"
                step="0.5"
                value={fastingHours}
                onChange={(e) => setFastingHours(e.target.value)}
                placeholder="8"
                className={`w-full pl-10 pr-12 py-2.5 rounded-xl border font-mono text-sm font-semibold transition-all outline-none focus:ring-2 ${
                  isDark 
                    ? 'bg-slate-800/80 border-slate-700 text-white focus:ring-cyan-500/40 focus:border-cyan-500' 
                    : 'bg-white border-slate-300 text-slate-900 focus:ring-cyan-500/30 focus:border-cyan-600'
                }`}
              />
              <span className={`absolute right-3.5 top-2.5 text-xs font-mono font-medium ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                saat
              </span>
            </div>
          </div>

          {/* Row 3: Surgical Loss Classification (4 Options) */}
          <div className="space-y-2.5">
            <label className={`block text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Cerrahi Doku Travması & Üçüncü Boşluk Kaybı Sınıflaması
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SURGICAL_OPTIONS.map((opt) => {
                const isSelected = surgicalLossType === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSurgicalLossType(opt.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? isDark
                          ? 'bg-cyan-500/15 border-cyan-400 ring-2 ring-cyan-500/20 text-white shadow-md'
                          : 'bg-cyan-50/80 border-cyan-500 ring-2 ring-cyan-500/20 text-cyan-950 shadow-xs'
                        : isDark
                          ? 'bg-slate-800/40 border-slate-700 hover:border-slate-600 text-slate-300'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold tracking-tight">
                          {opt.label}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                        )}
                      </div>

                      <div className={`text-[11px] font-mono font-bold mb-1 ${
                        isSelected 
                          ? isDark ? 'text-cyan-300' : 'text-cyan-700' 
                          : isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {opt.rangeText}
                      </div>

                      <p className={`text-[10px] leading-relaxed line-clamp-2 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {opt.examples}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200/40 dark:border-slate-700/60 flex items-center justify-between text-[10px] font-mono">
                      <span className="opacity-70">Hesaplanan Katsayı:</span>
                      <span className={`font-bold ${isSelected ? 'text-cyan-500 dark:text-cyan-300' : ''}`}>
                        {opt.factor} mL/kg/sa
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Formula Details Drawer */}
        {showFormulaDetails && (
          <div className={`mt-5 p-4 rounded-xl border text-xs leading-relaxed space-y-2 animate-in fade-in duration-150 ${
            isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              <span>İntraoperatif Sıvı Protokolü Kuralları</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li><strong>Saatlik İdame (4-2-1 Kuralı):</strong> 0-10 kg için 4 mL/kg/saat; 11-20 kg için +2 mL/kg/saat; &gt;20 kg için +1 mL/kg/saat.</li>
              <li><strong>Obez Hastalarda Ağırlık:</strong> Obezite durumunda aşırı hidrasyonu engellemek için <code className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800">AdjBW = IBW + 0.4 × (Gerçek Kilo - IBW)</code> kullanılır.</li>
              <li><strong>Açlık Sıvı Defisiti:</strong> Aç geçirilen saat × Saatlik idame sıvısı.</li>
              <li><strong>1. Saat:</strong> 1/2 Açlık Defisiti + Saatlik İdame.</li>
              <li><strong>2. Saat:</strong> 1/4 Açlık Defisiti + Saatlik İdame + Cerrahi Sıvı Kaybı.</li>
              <li><strong>3. Saat:</strong> 1/4 Açlık Defisiti + Saatlik İdame + Cerrahi Sıvı Kaybı.</li>
              <li><strong>4. Saat ve Sonrası:</strong> Saatlik İdame + Cerrahi Sıvı Kaybı.</li>
            </ul>
          </div>
        )}
      </div>

      {/* RESULTS DISPLAY */}
      {calcWeight > 0 ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Key Intermediate Metrics Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Calculation Weight Basis */}
            <div className={`p-4 rounded-xl border transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Hesap Kilosu</span>
                <Scale className="w-3.5 h-3.5 text-cyan-500" />
              </div>
              <div className="text-xl font-bold font-mono text-cyan-500 dark:text-cyan-400">
                {calcWeight.toFixed(1)} <span className="text-xs font-normal">kg</span>
              </div>
              <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                {isObese ? 'AdjBW (Düzeltilmiş)' : 'Gerçek Vücut Ağırlığı'}
              </div>
            </div>

            {/* Hourly Maintenance (4-2-1) */}
            <div className={`p-4 rounded-xl border transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Saatlik İdame</span>
                <Droplet className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-500 dark:text-blue-400">
                {Math.round(hourlyMaintenance)} <span className="text-xs font-normal">mL/sa</span>
              </div>
              <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                4-2-1 Holliday-Segar
              </div>
            </div>

            {/* Fasting Deficit Total */}
            <div className={`p-4 rounded-xl border transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Açlık Defisiti</span>
                <Clock className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-xl font-bold font-mono text-amber-500 dark:text-amber-400">
                {Math.round(fastingDeficit)} <span className="text-xs font-normal">mL</span>
              </div>
              <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                {fastingNum} saat açlık
              </div>
            </div>

            {/* Surgical Loss Rate */}
            <div className={`p-4 rounded-xl border transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Cerrahi Kayıp</span>
                <Scissors className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div className="text-xl font-bold font-mono text-rose-500 dark:text-rose-400">
                {Math.round(surgicalLossRate)} <span className="text-xs font-normal">mL/sa</span>
              </div>
              <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                {selectedSurgOption.factor} mL/kg/saat
              </div>
            </div>
          </div>

          {/* HOURLY FLUID SCHEDULE CARDS */}
          <div className={`p-6 rounded-2xl border transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Saat Saat İntraoperatif Sıvı İnfüzyon Planı
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Vakanın başlangıcından itibaren her bir saat için önerilen kristalloid sıvı hacmi
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium ${
                isDark ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
              }`}>
                Dengeli Kristalloid
              </span>
            </div>

            {/* 4 Timeline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Hour 1 */}
              <div className={`p-5 rounded-xl border relative flex flex-col justify-between transition-all ${
                isDark 
                  ? 'bg-gradient-to-b from-slate-800/80 to-slate-800/40 border-teal-500/40 shadow-lg' 
                  : 'bg-gradient-to-b from-teal-50/80 to-white border-teal-300 shadow-xs'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                      1. SAAT
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300 font-semibold">
                      En Yüksek İnfüzyon
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl font-extrabold font-mono tracking-tight text-teal-600 dark:text-teal-400">
                      {Math.round(hour1Fluid)}
                      <span className="text-sm font-bold ml-1 font-sans">mL</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">
                      ≈ {Math.round(hour1Fluid)} mL/saat
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] space-y-1">
                    <div className="font-semibold text-slate-700 dark:text-slate-300">Formül Dağılımı:</div>
                    <div className="font-mono text-[10px] text-slate-500 space-y-0.5">
                      <div>½ Açlık Defisiti: {Math.round(0.5 * fastingDeficit)} mL</div>
                      <div>+ Saatlik İdame: {Math.round(hourlyMaintenance)} mL</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">1. Saatte Toplam:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{Math.round(totalHour1)} mL</span>
                </div>
              </div>

              {/* Hour 2 */}
              <div className={`p-5 rounded-xl border relative flex flex-col justify-between transition-all ${
                isDark 
                  ? 'bg-slate-800/40 border-slate-700/80' 
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      2. SAAT
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      + Cerrahi Kayıp
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
                      {Math.round(hour2Fluid)}
                      <span className="text-sm font-bold ml-1 font-sans">mL</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">
                      ≈ {Math.round(hour2Fluid)} mL/saat
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] space-y-1">
                    <div className="font-semibold text-slate-700 dark:text-slate-300">Formül Dağılımı:</div>
                    <div className="font-mono text-[10px] text-slate-500 space-y-0.5">
                      <div>¼ Açlık Defisiti: {Math.round(0.25 * fastingDeficit)} mL</div>
                      <div>+ Saatlik İdame: {Math.round(hourlyMaintenance)} mL</div>
                      <div>+ Cerrahi Kayıp: {Math.round(surgicalLossRate)} mL</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">2. Saat Sonu Kümülatif:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{Math.round(totalHour2)} mL</span>
                </div>
              </div>

              {/* Hour 3 */}
              <div className={`p-5 rounded-xl border relative flex flex-col justify-between transition-all ${
                isDark 
                  ? 'bg-slate-800/40 border-slate-700/80' 
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      3. SAAT
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Defisit Sonu
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
                      {Math.round(hour3Fluid)}
                      <span className="text-sm font-bold ml-1 font-sans">mL</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">
                      ≈ {Math.round(hour3Fluid)} mL/saat
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] space-y-1">
                    <div className="font-semibold text-slate-700 dark:text-slate-300">Formül Dağılımı:</div>
                    <div className="font-mono text-[10px] text-slate-500 space-y-0.5">
                      <div>¼ Açlık Defisiti: {Math.round(0.25 * fastingDeficit)} mL</div>
                      <div>+ Saatlik İdame: {Math.round(hourlyMaintenance)} mL</div>
                      <div>+ Cerrahi Kayıp: {Math.round(surgicalLossRate)} mL</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">3. Saat Sonu Kümülatif:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{Math.round(totalHour3)} mL</span>
                </div>
              </div>

              {/* Hour 4 and Beyond */}
              <div className={`p-5 rounded-xl border relative flex flex-col justify-between transition-all ${
                isDark 
                  ? 'bg-slate-800/40 border-slate-700/80' 
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                      4. SAAT VE SONRASI
                    </span>
                    <span className="text-[10px] font-mono text-cyan-500 font-semibold">
                      Sabit Hız
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl font-extrabold font-mono tracking-tight text-cyan-600 dark:text-cyan-400">
                      {Math.round(hour4PlusRate)}
                      <span className="text-sm font-bold ml-1 font-sans">mL/sa</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-mono">
                      Her saat için infüzyon
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] space-y-1">
                    <div className="font-semibold text-slate-700 dark:text-slate-300">Formül Dağılımı:</div>
                    <div className="font-mono text-[10px] text-slate-500 space-y-0.5">
                      <div>Açlık Defisiti: 0 mL (Tamamlandı)</div>
                      <div>+ Saatlik İdame: {Math.round(hourlyMaintenance)} mL</div>
                      <div>+ Cerrahi Kayıp: {Math.round(surgicalLossRate)} mL</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">4. Saat Sonu Kümülatif:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{Math.round(totalHour4)} mL</span>
                </div>
              </div>
            </div>

            {/* Quick Infusion Pump Reference Bar */}
            <div className={`mt-6 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
              isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center gap-2 font-medium">
                <Activity className="w-4 h-4 text-cyan-500" />
                <span>
                  <strong>İnfüzyon Pompası Ayarı:</strong> 1. saatte <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{Math.round(hour1Fluid)} mL/saat</span>, 2. ve 3. saatte <span className="font-mono font-bold text-slate-900 dark:text-white">{Math.round(hour2Fluid)} mL/saat</span>, 4. saatten sonra <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{Math.round(hour4PlusRate)} mL/saat</span>.
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-500 shrink-0">
                1. saatte defisitin %50'si, 2-3. saatlerde %25'er tamamlanır
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`p-8 rounded-2xl border text-center space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <AlertCircle className="w-8 h-8 mx-auto text-amber-500 opacity-80" />
          <p className="text-sm">Lütfen geçerli bir hasta kilosu giriniz.</p>
        </div>
      )}
    </div>
  );
};
