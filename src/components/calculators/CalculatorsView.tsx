import React, { useState } from 'react';
import { 
  Calculator, 
  Activity, 
  Droplet, 
  Heart, 
  Brain, 
  ShieldAlert, 
  Info, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export const CalculatorsView: React.FC = () => {
  const [selectedCalc, setSelectedCalc] = useState<string>('gfr');

  // 1. GFR / Cockcroft-Gault & CKD-EPI
  const [gfrAge, setGfrAge] = useState<number>(65);
  const [gfrWeight, setGfrWeight] = useState<number>(70);
  const [gfrGender, setGfrGender] = useState<'male' | 'female'>('male');
  const [gfrScr, setGfrScr] = useState<number>(1.2);

  // Cockcroft-Gault calculation
  const cgCrCl = Math.round(
    (((140 - gfrAge) * gfrWeight) / (72 * gfrScr)) * (gfrGender === 'female' ? 0.85 : 1.0)
  );

  // CKD-EPI (2021 race-free)
  const isFemale = gfrGender === 'female';
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const minScrKappa = Math.min(gfrScr / kappa, 1);
  const maxScrKappa = Math.max(gfrScr / kappa, 1);
  const ckdEpi = Math.round(
    142 *
    Math.pow(minScrKappa, alpha) *
    Math.pow(maxScrKappa, -1.2) *
    Math.pow(0.9938, gfrAge) *
    (isFemale ? 1.012 : 1.0)
  );

  const getCkdStage = (gfr: number) => {
    if (gfr >= 90) return { stage: 'G1', label: 'Normal veya Yüksek', color: 'text-emerald-700 bg-emerald-50' };
    if (gfr >= 60) return { stage: 'G2', label: 'Hafif Düzeyde Azalmış', color: 'text-emerald-800 bg-emerald-100' };
    if (gfr >= 45) return { stage: 'G3a', label: 'Hafif-Orta Düzeyde Azalmış', color: 'text-amber-700 bg-amber-50' };
    if (gfr >= 30) return { stage: 'G3b', label: 'Orta-Ağır Düzeyde Azalmış', color: 'text-amber-800 bg-amber-100' };
    if (gfr >= 15) return { stage: 'G4', label: 'Ağır Düzeyde Azalmış (Böbrek Yetmezliği)', color: 'text-rose-700 bg-rose-50' };
    return { stage: 'G5', label: 'Son Dönem Böbrek Yetmezliği (Diyaliz İhtiyacı)', color: 'text-rose-900 bg-rose-100' };
  };

  // 2. BMI, IBW & BSA
  const [bmiHeight, setBmiHeight] = useState<number>(175);
  const [bmiWeight, setBmiWeight] = useState<number>(75);
  const [bmiGender, setBmiGender] = useState<'male' | 'female'>('male');

  const heightInMeters = bmiHeight / 100;
  const bmi = heightInMeters > 0 ? parseFloat((bmiWeight / (heightInMeters * heightInMeters)).toFixed(1)) : 0;
  
  // Devine IBW formula (height in inches: cm / 2.54)
  const heightInInches = bmiHeight / 2.54;
  const inchesOver5Feet = Math.max(0, heightInInches - 60);
  const ibw = parseFloat(
    (bmiGender === 'male' ? 50 + 2.3 * inchesOver5Feet : 45.5 + 2.3 * inchesOver5Feet).toFixed(1)
  );

  // Mosteller BSA formula: sqrt((height * weight) / 3600)
  const bsa = parseFloat(Math.sqrt((bmiHeight * bmiWeight) / 3600).toFixed(2));

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Zayıf (Düşük Kilo)', color: 'text-amber-700' };
    if (val < 25) return { label: 'Normal Ağırlık', color: 'text-emerald-700' };
    if (val < 30) return { label: 'Fazla Kilolu (Pre-obez)', color: 'text-amber-700' };
    if (val < 35) return { label: '1. Derece Obezite', color: 'text-rose-600' };
    if (val < 40) return { label: '2. Derece Obezite', color: 'text-rose-700' };
    return { label: '3. Derece Morbid Obezite', color: 'text-rose-900 font-bold' };
  };

  // 3. Holliday-Segar Fluids
  const [fluidWeight, setFluidWeight] = useState<number>(60);
  const calcFluid24h = (w: number) => {
    if (w <= 10) return w * 100;
    if (w <= 20) return 1000 + (w - 10) * 50;
    return 1500 + (w - 20) * 20;
  };
  const fluidDaily = calcFluid24h(fluidWeight);
  const fluidHourly = Math.round(fluidDaily / 24);

  // 4. Corrected Calcium
  const [measCalcium, setMeasCalcium] = useState<number>(8.0);
  const [measAlbumin, setMeasAlbumin] = useState<number>(3.0);
  const correctedCalcium = parseFloat((measCalcium + 0.8 * (4.0 - measAlbumin)).toFixed(2));

  // 5. MAP / OAB
  const [sbp, setSbp] = useState<number>(120);
  const [dbp, setDbp] = useState<number>(80);
  const mapValue = Math.round((2 * dbp + sbp) / 3);

  // 6. Anion Gap
  const [agNa, setAgNa] = useState<number>(140);
  const [agCl, setAgCl] = useState<number>(102);
  const [agHco3, setAgHco3] = useState<number>(24);
  const anionGap = agNa - (agCl + agHco3);

  // 7. CURB-65
  const [curbC, setCurbC] = useState<boolean>(false);
  const [curbU, setCurbU] = useState<boolean>(false);
  const [curbR, setCurbR] = useState<boolean>(false);
  const [curbB, setCurbB] = useState<boolean>(false);
  const [curb65, setCurb65] = useState<boolean>(false);

  const curbScore = (curbC ? 1 : 0) + (curbU ? 1 : 0) + (curbR ? 1 : 0) + (curbB ? 1 : 0) + (curb65 ? 1 : 0);

  // 8. Glasgow Coma Scale (GCS)
  const [gcsEye, setGcsEye] = useState<number>(4);
  const [gcsVerbal, setGcsVerbal] = useState<number>(5);
  const [gcsMotor, setGcsMotor] = useState<number>(6);
  const gcsTotal = gcsEye + gcsVerbal + gcsMotor;

  const getGcsSeverity = (score: number) => {
    if (score <= 8) return { label: 'Ağır Kafa Travması / Koma (Entübasyon Değerlendirin)', color: 'text-rose-700 bg-rose-50' };
    if (score <= 12) return { label: 'Orta Derecede Kafa Travması', color: 'text-amber-700 bg-amber-50' };
    return { label: 'Hafif Kafa Travması / Uyanık', color: 'text-emerald-700 bg-emerald-50' };
  };

  const navCalculators = [
    { id: 'gfr', name: 'eGFR & Kreatinin Klerensi', icon: Activity },
    { id: 'bmi', name: 'BMI, İdeal Kilo & BSA', icon: Calculator },
    { id: 'fluids', name: 'İdame Sıvı (Holliday-Segar)', icon: Droplet },
    { id: 'ca', name: 'Düzeltilmiş Kalsiyum', icon: Activity },
    { id: 'map', name: 'Ortalama Arter Basıncı (OAB)', icon: Heart },
    { id: 'anion', name: 'Anyon Açığı (Anion Gap)', icon: Activity },
    { id: 'curb65', name: 'CURB-65 Pnömoni Skoru', icon: ShieldAlert },
    { id: 'gcs', name: 'Glasgow Koma Skalası (GKS)', icon: Brain },
  ];

  return (
    <div className="space-y-6">
      {/* Header section with clean typography */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Klinik Hesaplayıcılar</h2>
          <p className="text-xs text-slate-500 mt-1">
            Servis vizitleri ve poliklinikte en sık kullanılan formüller ve karar destek araçları
          </p>
        </div>
      </div>

      {/* Segmented Tab Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {navCalculators.map(calc => {
          const Icon = calc.icon;
          const isActive = selectedCalc === calc.id;
          return (
            <button
              key={calc.id}
              onClick={() => setSelectedCalc(calc.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{calc.name}</span>
            </button>
          );
        })}
      </div>

      {/* Calculator Workspace Container */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        {/* 1. GFR Calculator */}
        {selectedCalc === 'gfr' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">Glomerüler Filtrasyon Oranı (eGFR) & Kreatinin Klerensi</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cockcroft-Gault formülü (ilaç doz ayarlamaları için altın standart) ve CKD-EPI 2021 (kronik böbrek hastalığı evrelemesi).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Yaş (Yıl)</label>
                <input
                  type="number"
                  value={gfrAge}
                  onChange={(e) => setGfrAge(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Cinsiyet</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGfrGender('male')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      gfrGender === 'male' ? 'bg-teal-50 border-teal-600 text-teal-800 font-semibold' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Erkek
                  </button>
                  <button
                    onClick={() => setGfrGender('female')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      gfrGender === 'female' ? 'bg-teal-50 border-teal-600 text-teal-800 font-semibold' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Kadın
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Vücut Ağırlığı (kg)</label>
                <input
                  type="number"
                  value={gfrWeight}
                  onChange={(e) => setGfrWeight(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Serum Kreatinin (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={gfrScr}
                  onChange={(e) => setGfrScr(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">Cockcroft-Gault Klirens (CrCl)</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {cgCrCl} <span className="text-xs font-normal text-slate-500">mL/dk</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  İlaç dozu azaltımı (antibiyotik, DOAC, antineoplastik) kararlarında tercih edilir.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">CKD-EPI (2021 Race-Free eGFR)</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {ckdEpi} <span className="text-xs font-normal text-slate-500">mL/dk/1.73m²</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  KBH tanı ve evrelemesinde en güncel kılavuz standardıdır.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-500">KBH Evresi (CKD-EPI ile)</div>
                  <div className="text-xl font-bold mt-1 text-slate-900 flex items-center gap-2">
                    <span className="font-mono text-2xl">{getCkdStage(ckdEpi).stage}</span>
                    <span className="text-xs font-medium text-slate-600">({getCkdStage(ckdEpi).label})</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  {ckdEpi < 30 ? '⚠️ Dikkat: Ciddi renal fonksiyon kaybı. Kontrast madde ve nefrotoksik ajanlardan kaçının.' : 'Rutin klinik takip önerilir.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. BMI & IBW & BSA */}
        {selectedCalc === 'bmi' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">Vücut Kitle İndeksi (BMI), İdeal Kilo (IBW) ve Vücut Yüzey Alanı (BSA)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Doz ayarlamaları, kemoterapi protokolleri ve beslenme durumunun objektif değerlendirilmesi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Boy (cm)</label>
                <input
                  type="number"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(Math.max(50, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Vücut Ağırlığı (kg)</label>
                <input
                  type="number"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Cinsiyet (IBW için)</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBmiGender('male')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      bmiGender === 'male' ? 'bg-teal-50 border-teal-600 text-teal-800 font-semibold' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Erkek
                  </button>
                  <button
                    onClick={() => setBmiGender('female')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      bmiGender === 'female' ? 'bg-teal-50 border-teal-600 text-teal-800 font-semibold' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Kadın
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">Vücut Kitle İndeksi (BMI)</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {bmi} <span className="text-xs font-normal text-slate-500">kg/m²</span>
                </div>
                <div className={`text-xs font-medium mt-2 ${getBmiCategory(bmi).color}`}>
                  {getBmiCategory(bmi).label}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">İdeal Vücut Ağırlığı (Devine IBW)</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {ibw} <span className="text-xs font-normal text-slate-500">kg</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Mekanik ventilatör tidal volüm hesabı (6-8 mL/kg IBW) ve hidrofilik ilaç dozajı için.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">Vücut Yüzey Alanı (Mosteller BSA)</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {bsa} <span className="text-xs font-normal text-slate-500">m²</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Kemoterapi protokolleri ve kardiyak indeks hesaplamalarında kullanılır.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Holliday-Segar Fluid Requirement */}
        {selectedCalc === 'fluids' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">İdame Sıvı İhtiyacı (Holliday-Segar 4-2-1 Kuralı)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Oral alımı kısıtlı hastada günlük bazal sıvı ve elektrolit replasmanı gereksinimi.
              </p>
            </div>

            <div className="max-w-xs">
              <label className="block text-xs font-medium text-slate-700 mb-1">Vücut Ağırlığı (kg)</label>
              <input
                type="number"
                value={fluidWeight}
                onChange={(e) => setFluidWeight(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">24 Saatlik Toplam Sıvı</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {fluidDaily} <span className="text-xs font-normal text-slate-500">mL/gün</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  İlk 10 kg için 100 mL/kg + 2. 10 kg için 50 mL/kg + üzeri için 20 mL/kg.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">Saatlik İnfüzyon Hızı (4-2-1)</div>
                <div className="text-3xl font-bold font-mono text-teal-800 mt-1 tabular-nums">
                  {fluidHourly} <span className="text-xs font-normal text-slate-500">mL/saat</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  İnfüzyon cihazına girilecek saatlik akış hızı ayarı.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">Bazal Elektrolit Gereksinimi</div>
                <div className="space-y-1.5 mt-2 text-xs font-medium text-slate-800 font-mono">
                  <div>Na+: {fluidWeight * 2} - {fluidWeight * 3} mEq/gün (2-3 mEq/kg)</div>
                  <div>K+: {fluidWeight * 1} - {fluidWeight * 2} mEq/gün (1-2 mEq/kg)</div>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Genellikle %5 Dekstroz + 1/3 veya 1/2 SF içerisine KCl eklenerek hazırlanır.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Corrected Calcium */}
        {selectedCalc === 'ca' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">Albümin Düzeltmeli Kalsiyum (Corrected Calcium)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Serum kalsiyumunun yaklaşık %40-45'i albümine bağlıdır; hipoalbüminemide ölçülen kalsiyum sahte düşük çıkar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Ölçülen Serum Kalsiyumu (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={measCalcium}
                  onChange={(e) => setMeasCalcium(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Serum Albümini (g/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={measAlbumin}
                  onChange={(e) => setMeasAlbumin(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">Düzeltilmiş Kalsiyum Değeri</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {correctedCalcium} <span className="text-xs font-normal text-slate-500">mg/dL</span>
                </div>
                <div className="text-xs font-medium mt-2">
                  {correctedCalcium < 8.5 && <span className="text-amber-700">Hipokalsemi (Normal referans: 8.5 - 10.5 mg/dL)</span>}
                  {correctedCalcium >= 8.5 && correctedCalcium <= 10.5 && <span className="text-emerald-700">Normal Aralık (8.5 - 10.5 mg/dL)</span>}
                  {correctedCalcium > 10.5 && <span className="text-rose-700">Hiperkalsemi (&gt;10.5 mg/dL)</span>}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <div className="font-semibold text-slate-800 mb-1">Formül Açıklaması</div>
                <div className="font-mono text-slate-700 bg-white p-2 rounded border border-slate-200 mb-2">
                  Düzeltilmiş Ca = Ölçülen Ca + [0.8 × (4.0 - Albümin)]
                </div>
                <p>
                  Kritik hastalarda ve asit-baz bozukluklarında iyonize kalsiyum (kan gazında) ölçümü altın standarttır.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. MAP / OAB */}
        {selectedCalc === 'map' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">Ortalama Arter Basıncı (OAB / MAP)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kardiyak siklus boyunca dokuların ve hayati organların (beyin, böbrek) perfüzyonunu sağlayan ortalama basınç.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Sistolik Kan Basıncı (mmHg)</label>
                <input
                  type="number"
                  value={sbp}
                  onChange={(e) => setSbp(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Diyastolik Kan Basıncı (mmHg)</label>
                <input
                  type="number"
                  value={dbp}
                  onChange={(e) => setDbp(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">Ortalama Arter Basıncı</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {mapValue} <span className="text-xs font-normal text-slate-500">mmHg</span>
                </div>
                <div className="text-xs font-medium mt-2">
                  {mapValue >= 65 ? (
                    <span className="text-emerald-700">✓ Yeterli organ perfüzyonu (Hedef OAB ≥ 65 mmHg)</span>
                  ) : (
                    <span className="text-rose-700">⚠️ Kritik Hipoperfüzyon / Şok Riski (OAB &lt; 65 mmHg)</span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <div className="font-semibold text-slate-800 mb-1">Klinik Karar Notu</div>
                <div className="font-mono text-slate-700 bg-white p-2 rounded border border-slate-200 mb-2">
                  MAP = [(2 × Diyastol) + Sistol] / 3
                </div>
                <p>
                  Sepsis resüsitasyonunda ve yoğun bakım vazopressör titrasyonunda birincil hedef MAP ≥ 65 mmHg'dir.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 6. Anion Gap */}
        {selectedCalc === 'anion' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">Serum Anyon Açığı (Anion Gap)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Metabolik asidoz ayırıcı tanısında ölçülemeyen anyonların fazlalığını belirler (Normal referans: 8-12 mEq/L).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Sodyum (Na+ mEq/L)</label>
                <input
                  type="number"
                  value={agNa}
                  onChange={(e) => setAgNa(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Klor (Cl- mEq/L)</label>
                <input
                  type="number"
                  value={agCl}
                  onChange={(e) => setAgCl(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Bikarbonat (HCO3- mEq/L)</label>
                <input
                  type="number"
                  value={agHco3}
                  onChange={(e) => setAgHco3(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">Hesaplanan Anyon Açığı</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {anionGap} <span className="text-xs font-normal text-slate-500">mEq/L</span>
                </div>
                <div className="text-xs font-medium mt-2">
                  {anionGap > 12 ? (
                    <span className="text-rose-700 font-semibold">Yüksek Anyon Açıklı Metabolik Asidoz (HAGMA)</span>
                  ) : (
                    <span className="text-emerald-700">Normal Anyon Açığı (Hiperkloremik Asidoz veya Normal)</span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <div className="font-semibold text-slate-800 mb-1">Yüksek Anyon Açığı Nedenleri (MUDPILES):</div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-700 mt-2">
                  <div>• <strong>M</strong>etanol</div>
                  <div>• <strong>U</strong>remi (Böbrek yetm.)</div>
                  <div>• <strong>D</strong>iyabetik Ketoasidoz (DKA)</div>
                  <div>• <strong>P</strong>ropilen glikol</div>
                  <div>• <strong>I</strong>soniazid / İskemi</div>
                  <div>• <strong>L</strong>aktik Asidoz (Şok)</div>
                  <div>• <strong>E</strong>tilen Glikol</div>
                  <div>• <strong>S</strong>alisilat (Aspirin)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. CURB-65 */}
        {selectedCalc === 'curb65' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">CURB-65 Toplum Kaynaklı Pnömoni Ciddiyet Skoru</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pnömoni tanılı hastada 30 günlük mortalite riskini ve hastane/yoğun bakım yatış gereksinimini belirler.
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={curbC}
                  onChange={(e) => setCurbC(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <span className="font-semibold text-xs text-slate-900">C — Confusion (Bilinç Bulanıklığı / Konfüzyon):</span>
                  <span className="text-xs text-slate-600 ml-1">Kişi, yer veya zaman oryantasyonunda yeni gelişen bozukluk (AMTS ≤ 8).</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={curbU}
                  onChange={(e) => setCurbU(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <span className="font-semibold text-xs text-slate-900">U — Urea (Üre &gt; 7 mmol/L veya BUN &gt; 19 mg/dL):</span>
                  <span className="text-xs text-slate-600 ml-1">Yüksek serum üre veya BUN seviyesi.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={curbR}
                  onChange={(e) => setCurbR(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <span className="font-semibold text-xs text-slate-900">R — Respiratory Rate (Solunum Sayısı ≥ 30/dk):</span>
                  <span className="text-xs text-slate-600 ml-1">Taşipne varlığı.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={curbB}
                  onChange={(e) => setCurbB(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <span className="font-semibold text-xs text-slate-900">B — Blood Pressure (Düşük Kan Basıncı):</span>
                  <span className="text-xs text-slate-600 ml-1">Sistolik &lt; 90 mmHg VEYA Diyastolik ≤ 60 mmHg.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={curb65}
                  onChange={(e) => setCurb65(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <span className="font-semibold text-xs text-slate-900">65 — Yaş ≥ 65:</span>
                  <span className="text-xs text-slate-600 ml-1">Hastanın yaşının 65 veya üzerinde olması.</span>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">CURB-65 Toplam Skoru</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {curbScore} <span className="text-xs font-normal text-slate-500">/ 5 Puan</span>
                </div>
                <div className="text-xs font-medium mt-2">
                  {curbScore <= 1 && <span className="text-emerald-700">Düşük Risk (Mortalite ~%1.5)</span>}
                  {curbScore === 2 && <span className="text-amber-700">Orta Risk (Mortalite ~%9.2)</span>}
                  {curbScore >= 3 && <span className="text-rose-700">Yüksek Risk (Mortalite %22 - %30)</span>}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <div className="font-semibold text-slate-900 mb-1">Klinik Yatış & Tedavi Önerisi:</div>
                {curbScore <= 1 && (
                  <p className="mt-1">
                    Evde ayaktan oral antibiyoterapi ile tedavi genellikle güvenlidir. Sosyal endikasyonlar varsa kısa gözlem düşünülebilir.
                  </p>
                )}
                {curbScore === 2 && (
                  <p className="mt-1">
                    Hastaneye kısa süreli yatış veya günübirlik yakın takip ünitesinde intravenöz tedavi değerlendirilmelidir.
                  </p>
                )}
                {curbScore >= 3 && (
                  <p className="mt-1 text-rose-900 font-semibold">
                    Acil hastane yatışı zorunludur! Skor 4 veya 5 ise veya şok/mekanik solunum ihtiyacı varsa doğrudan Yoğun Bakım Ünitesi (YBÜ) endikasyonu vardır.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 8. Glasgow Coma Scale */}
        {selectedCalc === 'gcs' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">Glasgow Koma Skalası (GKS / GCS)</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Nörolojik bilinç seviyesini objektif değerlendiren uluslararası standart (3-15 Puan).
              </p>
            </div>

            <div className="space-y-4">
              {/* Eye response */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-2">Göz Açma Yanıtı (E)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { score: 4, label: 'Spontan açık' },
                    { score: 3, label: 'Sesli uyaranla' },
                    { score: 2, label: 'Ağrılı uyaranla' },
                    { score: 1, label: 'Yanıt yok' }
                  ].map(opt => (
                    <button
                      key={opt.score}
                      onClick={() => setGcsEye(opt.score)}
                      className={`p-2.5 text-xs text-left rounded-lg border transition-colors ${
                        gcsEye === opt.score
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-mono font-bold">{opt.score} Puan</div>
                      <div className="text-[11px] text-slate-600">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verbal response */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-2">Sözel Yanıt (V)</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { score: 5, label: 'Oryante, tam' },
                    { score: 4, label: 'Konfüze konuşma' },
                    { score: 3, label: 'Uygunsuz kelimeler' },
                    { score: 2, label: 'Anlamsız sesler' },
                    { score: 1, label: 'Yanıt yok' }
                  ].map(opt => (
                    <button
                      key={opt.score}
                      onClick={() => setGcsVerbal(opt.score)}
                      className={`p-2.5 text-xs text-left rounded-lg border transition-colors ${
                        gcsVerbal === opt.score
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-mono font-bold">{opt.score} Puan</div>
                      <div className="text-[11px] text-slate-600">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Motor response */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-2">Motor Yanıt (M)</label>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {[
                    { score: 6, label: 'Emirlere uyar' },
                    { score: 5, label: 'Ağrıyı lokalize eder' },
                    { score: 4, label: 'Ağrıdan kaçar (fleksiyon)' },
                    { score: 3, label: 'Dekortike (anormal fleksiyon)' },
                    { score: 2, label: 'Deserebre (ekstansiyon)' },
                    { score: 1, label: 'Yanıt yok' }
                  ].map(opt => (
                    <button
                      key={opt.score}
                      onClick={() => setGcsMotor(opt.score)}
                      className={`p-2.5 text-xs text-left rounded-lg border transition-colors ${
                        gcsMotor === opt.score
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-mono font-bold">{opt.score} Puan</div>
                      <div className="text-[11px] text-slate-600">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">GKS Toplam Skoru</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {gcsTotal} <span className="text-xs font-normal text-slate-500">/ 15 Puan (E{gcsEye} V{gcsVerbal} M{gcsMotor})</span>
                </div>
                <div className="text-xs font-medium mt-2">
                  <span className={`px-2 py-0.5 rounded font-semibold ${getGcsSeverity(gcsTotal).color}`}>
                    {getGcsSeverity(gcsTotal).label}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <div className="font-semibold text-slate-800 mb-1">Klinik Altın Kural:</div>
                <p className="mt-1">
                  <strong>"GKS ≤ 8 ise Entübe Et":</strong> Bilinç düzeyi 8 veya daha altı olan hastalarda hava yolu koruyucu refleksleri (öksürük, öğürme) kaybolur; acil hava yolu güvencesi (entübasyon) sağlanmalıdır.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
