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
  FlaskConical,
  Zap,
  BookOpen,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface Props {
  isDark: boolean;
  hideReferences?: boolean;
}

export type DisorderMode = 'hyponatremia' | 'hypernatremia';
type TbwCategory = 'young_male' | 'young_female' | 'elderly_male' | 'elderly_female' | 'child';
type InfusateType = 'nacl_3' | 'nacl_09' | 'ringer' | 'nacl_045' | 'nacl_02_d5' | 'd5w' | 'custom';

export interface InfusateOption {
  id: InfusateType;
  label: string;
  na: number; // mEq/L
  k: number;  // mEq/L
  osm: number; // mOsm/L
  desc: string;
  indication: 'hyponatremia' | 'hypernatremia' | 'both';
}

const INFUSATE_OPTIONS: InfusateOption[] = [
  // 1. Hiponatremi İçin Sıvılar (Hipertonik ve İzotonikler)
  { 
    id: 'nacl_3', 
    label: '%3 NaCl (Hipertonik Salin)', 
    na: 513, 
    k: 0, 
    osm: 1026, 
    desc: 'Akut semptomatik, ağır hiponatremi ve beyin ödemi acil tedavisi',
    indication: 'hyponatremia'
  },
  { 
    id: 'nacl_09', 
    label: '%0.9 NaCl (İzotonik SF)', 
    na: 154, 
    k: 0, 
    osm: 308, 
    desc: 'Hipovolemik hiponatremi veya hipernatremide şok/hemodinamik resüsitasyon',
    indication: 'both'
  },
  { 
    id: 'ringer', 
    label: 'Ringer Laktat / Dengeli Sıvı', 
    na: 130, 
    k: 4, 
    osm: 273, 
    desc: 'Hafif hipovolemik hiponatremi / perioperatif dengeli kristaloid (130 Na + 4 K)',
    indication: 'hyponatremia'
  },

  // 2. Hipernatremi İçin Sıvılar (Hipotonikler ve Serbest Su)
  { 
    id: 'd5w', 
    label: '%5 Dextroz (D5W - Saf Serbest Su)', 
    na: 0, 
    k: 0, 
    osm: 252, 
    desc: 'Hipernatremi serbest su açığı replasmanı (övolemik/DI olguları)',
    indication: 'hypernatremia'
  },
  { 
    id: 'nacl_02_d5', 
    label: '%0.2 NaCl + %5 Dextroz (1/5 SF)', 
    na: 34, 
    k: 0, 
    osm: 321, 
    desc: 'Hipotonik idame ve kademeli serbest su hidrasyonu',
    indication: 'hypernatremia'
  },
  { 
    id: 'nacl_045', 
    label: '%0.45 NaCl (Yarım SF)', 
    na: 77, 
    k: 0, 
    osm: 154, 
    desc: 'Hipernatremi ve hipertonik dehidratasyon tedavisi',
    indication: 'hypernatremia'
  },

  // 3. Özel Sıvı Seçeneği
  { 
    id: 'custom', 
    label: 'Özel / Manuel İnfüzat', 
    na: 154, 
    k: 0, 
    osm: 308, 
    desc: 'Kullanıcı tanımlı elektrolit derişimi',
    indication: 'both'
  }
];

export const SodiumCalculator: React.FC<Props> = ({ isDark, hideReferences = false }) => {
  // Girdiler
  const [currentNa, setCurrentNa] = useState<string>('118');
  const [targetNa, setTargetNa] = useState<string>('126');
  const [weight, setWeight] = useState<string>('70');
  const [tbwCategory, setTbwCategory] = useState<TbwCategory>('young_male');
  const [selectedInfusate, setSelectedInfusate] = useState<InfusateType>('nacl_3');
  const [customInfusateNa, setCustomInfusateNa] = useState<string>('513');
  const [addedKcl, setAddedKcl] = useState<number>(0); // 0, 20, 40 mEq/L
  const [targetHours, setTargetHours] = useState<string>('24');

  // Akordeonlar & Ek Modüller
  const [showGlucoseCorrect, setShowGlucoseCorrect] = useState<boolean>(false);
  const [measuredGlucose, setMeasuredGlucose] = useState<string>('350');
  const [glucoseRawNa, setGlucoseRawNa] = useState<string>('128');

  const [showWaterDeficit, setShowWaterDeficit] = useState<boolean>(false);
  const [showCalculationSteps, setShowCalculationSteps] = useState<boolean>(false);

  // Parse Girdiler
  const curNa = parseFloat(currentNa) || 120;
  const tarNa = parseFloat(targetNa) || 128;
  const ptWeight = parseFloat(weight) || 70;
  const hours = Math.max(1, parseFloat(targetHours) || 24);

  // Otomatik Bozukluk Modu Kararı (Kullanıcının girdiği sodyum değerine göre otomatik karar verilir)
  // Eğer curNa >= 145 veya (curNa >= 140 ve tarNa < curNa) ise Hipernatremi; aksi halde Hiponatremi
  const isHypernatremia = curNa >= 145 || (curNa >= 140 && tarNa < curNa);
  const disorderMode: DisorderMode = isHypernatremia ? 'hypernatremia' : 'hyponatremia';

  // Sodyum Girdisi Değişimi: Kullanıcı 128 girdiğinde hiponatremi, 168 girdiğinde hipernatremi sıvısına otomatik adapte olur
  const handleCurrentNaChange = (val: string) => {
    setCurrentNa(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      if (parsed >= 145) {
        // Hipernatremi: daha önce hiponatremi sıvısı seçiliyse otomatik D5W'ye al
        if (selectedInfusate === 'nacl_3' || selectedInfusate === 'ringer') {
          setSelectedInfusate('d5w');
        }
        // Hedef sodyum mevcut değerden büyükse veya tanımsızsa mantıklı hedef ata
        const targetParsed = parseFloat(targetNa);
        if (isNaN(targetParsed) || targetParsed >= parsed) {
          setTargetNa(Math.max(140, parsed - 10).toString());
        }
      } else if (parsed <= 135) {
        // Hiponatremi: daha önce hipernatremi sıvısı seçiliyse otomatik %3 NaCl'ye al
        if (selectedInfusate === 'd5w' || selectedInfusate === 'nacl_02_d5' || selectedInfusate === 'nacl_045') {
          setSelectedInfusate('nacl_3');
        }
        // Hedef sodyum mevcut değerden küçükse mantıklı hedef ata
        const targetParsed = parseFloat(targetNa);
        if (isNaN(targetParsed) || targetParsed <= parsed) {
          setTargetNa(Math.min(135, parsed + 8).toString());
        }
      }
    }
  };

  // Toplam Vücut Suyu (TBW) Faktörü
  let tbwFactor = 0.60;
  if (tbwCategory === 'young_female' || tbwCategory === 'elderly_male') tbwFactor = 0.50;
  if (tbwCategory === 'elderly_female') tbwFactor = 0.45;
  if (tbwCategory === 'child') tbwFactor = 0.60;

  const tbwLitres = ptWeight * tbwFactor;

  // İnfüzat Na & K
  const chosenInfusate = INFUSATE_OPTIONS.find(o => o.id === selectedInfusate) || INFUSATE_OPTIONS[0];
  const infusateNa = selectedInfusate === 'custom' 
    ? (parseFloat(customInfusateNa) || 154) 
    : chosenInfusate.na;
  const infusateK = chosenInfusate.k + addedKcl;

  // Adrogué-Madias Formülü:
  // Delta Na per 1L infusate = ((Infusate Na + Infusate K) - Serum Na) / (TBW + 1)
  const deltaNaPerLiter = ((infusateNa + infusateK) - curNa) / (tbwLitres + 1);

  // İstenen Toplam Değişim (mEq/L)
  const desiredDeltaNa = tarNa - curNa;
  const isHyponatremiaCorrection = desiredDeltaNa > 0;
  const isHypernatremiaCorrection = desiredDeltaNa < 0;

  // Toplam Gereken Sıvı Hacmi (Litre ve mL)
  let requiredLiters = 0;
  let requiredMl = 0;
  let hourlyRateMl = 0;
  let dropsPerMin = 0; // Standart infüzyon seti (20 damla/mL)

  if (Math.abs(deltaNaPerLiter) > 0.001) {
    requiredLiters = desiredDeltaNa / deltaNaPerLiter;
    if (requiredLiters > 0) {
      requiredMl = requiredLiters * 1000;
      hourlyRateMl = requiredMl / hours;
      dropsPerMin = (hourlyRateMl * 20) / 60;
    }
  }

  // 24 Saatlik Değişim Hızı Değerlendirmesi ve ODS / Serebral Ödem Uyarısı
  const deltaNaPer24Hours = (desiredDeltaNa / hours) * 24;

  // Hiponatremi ODS Güvenlik Eşikleri:
  const isOdsSafe = isHyponatremiaCorrection && deltaNaPer24Hours <= 8.0;
  const isOdsBorderline = isHyponatremiaCorrection && deltaNaPer24Hours > 8.0 && deltaNaPer24Hours <= 10.0;
  const isOdsHazard = isHyponatremiaCorrection && deltaNaPer24Hours > 10.0;

  // Hipernatremide Serebral Ödem Uyarısı:
  const isCerebralEdemaRisk = isHypernatremiaCorrection && Math.abs(deltaNaPer24Hours) > 12.0;

  // Glukoz Düzeltmeli Sodyum
  const parsedGlucose = parseFloat(measuredGlucose) || 100;
  const parsedGlucoseRawNa = parseFloat(glucoseRawNa) || 130;
  const glucoseExcess = Math.max(0, parsedGlucose - 100);
  const correctedNaKatz = parsedGlucoseRawNa + (0.016 * glucoseExcess);
  const correctedNaHillier = parsedGlucoseRawNa + (0.024 * glucoseExcess);

  // Serbest Su Açığı (Free Water Deficit) - Hipernatremi için
  const freeWaterDeficitLitres = curNa > 140 ? tbwLitres * ((curNa / 140) - 1) : 0;
  const freeWaterDeficitMl = freeWaterDeficitLitres * 1000;
  const freeWaterHourlyRate48h = freeWaterDeficitMl / 48;

  // Sıfırlama Fonksiyonu
  const handleReset = () => {
    if (isHypernatremia) {
      setCurrentNa('158');
      setTargetNa('148');
      setSelectedInfusate('d5w');
      setCustomInfusateNa('77');
    } else {
      setCurrentNa('118');
      setTargetNa('126');
      setSelectedInfusate('nacl_3');
      setCustomInfusateNa('513');
    }
    setWeight('70');
    setTbwCategory('young_male');
    setAddedKcl(0);
    setTargetHours('24');
  };

  // Glukoz düzeltmeli Na'yı ana hesaplayıcıya aktar
  const applyCorrectedNa = (val: number) => {
    const formatted = val.toFixed(1);
    handleCurrentNaChange(formatted);
    setShowGlucoseCorrect(false);
  };

  // Otomatik bozukluk moduna göre filtrelenmiş sıvılar
  const availableInfusates = INFUSATE_OPTIONS.filter(
    opt => opt.indication === disorderMode || opt.indication === 'both'
  );

  return (
    <div className="space-y-6">
      {/* Üst Bilgi Başlığı ve Hızlı Sıfırlama */}
      <div className={`p-4 sm:p-5 rounded-xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                Sodyum Bozuklukları &amp; Adrogué-Madias Hesaplayıcısı
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Girilen sodyum değerine göre hiponatremi veya hipernatremiye otomatik adapte olur
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Otomatik Durum Bilgisi (Seçim butonları kaldırıldı, otomatik karar veriliyor) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isHypernatremia 
                ? isDark ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/60' : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                : isDark ? 'bg-teal-950/60 text-teal-300 border border-teal-800/60' : 'bg-teal-50 text-teal-800 border border-teal-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isHypernatremia ? 'bg-cyan-400' : 'bg-teal-400'}`} />
              {isHypernatremia 
                ? 'Hipernatremi Modu (Girilen Na⁺ > 145 mEq/L Otomatik Algılandı)' 
                : 'Hiponatremi Modu (Girilen Na⁺ < 135 mEq/L Otomatik Algılandı)'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            {isHypernatremia ? 'Sıvı Listesi: Yalnızca hipotonik / serbest su' : 'Sıvı Listesi: Yalnızca hipertonik / izotonik'}
          </span>
        </div>
      </div>

      {/* Ana Hesaplayıcı Konsolu (Girdiler & Sonuçlar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOL KOLON: Girdiler & Parametreler (7 Kolon) */}
        <div className={`lg:col-span-7 p-4 sm:p-5 rounded-xl border space-y-5 ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-tight flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-teal-500" />
              <span>
                {isHypernatremia ? 'Hipernatremi' : 'Hiponatremi'} Parametreleri &amp; Sıvı Seçimi
              </span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {isHypernatremia ? 'Hedef: Na⁺ Düşürme' : 'Hedef: Na⁺ Yükseltme'}
            </span>
          </div>

          {/* 1. Sodyum Değerleri (Mevcut & Hedef) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mevcut Serum Na⁺ (mEq/L)
                </label>
                {!isHypernatremia && (
                  <button
                    type="button"
                    onClick={() => setShowGlucoseCorrect(!showGlucoseCorrect)}
                    className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Activity className="w-3 h-3" />
                    Glukoz düzeltmeli?
                  </button>
                )}
              </div>
              <input
                type="number"
                step="0.5"
                value={currentNa}
                onChange={(e) => handleCurrentNaChange(e.target.value)}
                placeholder={isHypernatremia ? '158' : '118'}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Normal referans: 135 – 145 mEq/L
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                Hedef Serum Na⁺ (mEq/L)
              </label>
              <input
                type="number"
                step="0.5"
                value={targetNa}
                onChange={(e) => setTargetNa(e.target.value)}
                placeholder={isHypernatremia ? '148' : '126'}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Hedeflenen net değişim: <strong className="font-mono text-teal-600 dark:text-teal-400">{desiredDeltaNa > 0 ? `+${desiredDeltaNa.toFixed(1)}` : desiredDeltaNa.toFixed(1)} mEq/L</strong>
              </div>
            </div>
          </div>

          {/* Glukoz Düzeltme Açılır Kutusu (Katz & Hillier) */}
          {showGlucoseCorrect && !isHypernatremia && (
            <div className={`p-3.5 rounded-lg border text-xs space-y-3 ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-teal-500" />
                  Hiperglisemi Yalancı Hiponatremi Düzeltmesi (Pseudohyponatremia)
                </span>
                <button
                  type="button"
                  onClick={() => setShowGlucoseCorrect(false)}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-600 dark:text-slate-400 font-medium">Laboratuvardaki Ham Na⁺ (mEq/L)</label>
                  <input
                    type="number"
                    value={glucoseRawNa}
                    onChange={(e) => setGlucoseRawNa(e.target.value)}
                    placeholder="128"
                    className={`w-full px-2.5 py-1.5 border rounded-md font-mono ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600 dark:text-slate-400 font-medium">Eş Zamanlı Kan Glukozu (mg/dL)</label>
                  <input
                    type="number"
                    value={measuredGlucose}
                    onChange={(e) => setMeasuredGlucose(e.target.value)}
                    placeholder="350"
                    className={`w-full px-2.5 py-1.5 border rounded-md font-mono ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2 rounded bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-700 dark:text-slate-300">Katz Formülü (1.6)</div>
                    <div className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">{correctedNaKatz.toFixed(1)} mEq/L</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => applyCorrectedNa(correctedNaKatz)}
                    className="px-2 py-1 text-[11px] font-bold rounded bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
                  >
                    Aktar
                  </button>
                </div>
                <div className="p-2 rounded bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-700 dark:text-slate-300">Hillier Formülü (2.4)</div>
                    <div className="text-base font-bold font-mono text-teal-600 dark:text-teal-400">{correctedNaHillier.toFixed(1)} mEq/L</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => applyCorrectedNa(correctedNaHillier)}
                    className="px-2 py-1 text-[11px] font-bold rounded bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
                  >
                    Aktar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Hasta Ağırlığı ve Cinsiyet / Yaş Grubu (TBW) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                Hasta Kilosu (kg)
              </label>
              <input
                type="number"
                step="1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Hesaplanan TBW: <strong className="font-mono text-slate-700 dark:text-slate-300">{tbwLitres.toFixed(1)} Litre</strong> (%{(tbwFactor * 100).toFixed(0)})
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                Yaş &amp; Cinsiyet (TBW Katsayısı)
              </label>
              <select
                value={tbwCategory}
                onChange={(e) => setTbwCategory(e.target.value as TbwCategory)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="young_male">Genç Erkek (TBW %60 / 0.60)</option>
                <option value="young_female">Genç Kadın (TBW %50 / 0.50)</option>
                <option value="elderly_male">Yaşlı Erkek ≥65 yaş (TBW %50 / 0.50)</option>
                <option value="elderly_female">Yaşlı Kadın ≥65 yaş (TBW %45 / 0.45)</option>
                <option value="child">Çocuk (TBW %60 / 0.60)</option>
              </select>
            </div>
          </div>

          {/* 3. İnfüzyon Sıvısı Seçimi (Seçili Bozukluğa Göre Otomatik Filtrelenmiş) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {isHypernatremia 
                  ? 'Hipernatremi İçin Uygun Sıvılar (Hipotonik / Serbest Su)' 
                  : 'Hiponatremi İçin Uygun Sıvılar (Hipertonik / İzotonik)'}
              </label>
              <span className="text-[11px] text-slate-500">
                {isHypernatremia ? 'Hipertonik sıvılar gizlendi' : 'Hipotonik sıvılar gizlendi'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableInfusates.filter(o => o.id !== 'custom').map((opt) => {
                const isSelected = selectedInfusate === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedInfusate(opt.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? isDark 
                          ? 'bg-teal-500/15 border-teal-500 text-white ring-1 ring-teal-500' 
                          : 'bg-teal-50 border-teal-600 text-teal-950 ring-1 ring-teal-600'
                        : isDark
                          ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{opt.label}</span>
                      <span className="font-mono text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                        {opt.na} mEq/L
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Özel Sıvı Seçeneği */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setSelectedInfusate('custom')}
                className={`w-full p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer ${
                  selectedInfusate === 'custom'
                    ? isDark ? 'bg-teal-500/15 border-teal-500 text-white' : 'bg-teal-50 border-teal-600 text-teal-950'
                    : isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span className="font-semibold">Özel / Manuel Sıvı Konsantrasyonu</span>
                <span className="text-[11px] text-teal-600 dark:text-teal-400 font-mono">Manuel Değer</span>
              </button>
              {selectedInfusate === 'custom' && (
                <div className="mt-2 p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
                    Özel Sıvı Na⁺ (mEq/L):
                  </label>
                  <input
                    type="number"
                    value={customInfusateNa}
                    onChange={(e) => setCustomInfusateNa(e.target.value)}
                    placeholder="154"
                    className={`w-32 px-2.5 py-1 text-xs border rounded font-mono ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 4. İlave Potasyum (KCl) ve Düzeltme Süresi (saat) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                Sıvıya İlave Potasyum (KCl)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 20, 40].map((kVal) => (
                  <button
                    key={kVal}
                    type="button"
                    onClick={() => setAddedKcl(kVal)}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                      addedKcl === kVal
                        ? 'bg-teal-600 text-white border-teal-600'
                        : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {kVal === 0 ? 'Yok (0)' : `+${kVal} mEq/L`}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Adrogué formülünde (Na⁺ + K⁺) toplam katyon olarak hesaba katılır.
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                Hedef Düzeltme Süresi (Saat)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="72"
                  value={targetHours}
                  onChange={(e) => setTargetHours(e.target.value)}
                  placeholder="24"
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <span className="text-xs font-semibold text-slate-500 shrink-0">saat</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setTargetHours('12')}
                  className={`px-2 py-0.5 rounded border ${targetHours === '12' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                >
                  12 sa
                </button>
                <button
                  type="button"
                  onClick={() => setTargetHours('24')}
                  className={`px-2 py-0.5 rounded border ${targetHours === '24' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                >
                  24 sa (Standart)
                </button>
                <button
                  type="button"
                  onClick={() => setTargetHours('48')}
                  className={`px-2 py-0.5 rounded border ${targetHours === '48' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                >
                  48 sa
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ KOLON: Sonuçlar, Saatlik İnfüzyon Hızı & ODS / Serebral Ödem Güvenlik Kartı (5 Kolon) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Ana İnfüzyon Hızı Kartı */}
          <div className={`p-4 sm:p-5 rounded-xl border relative overflow-hidden ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {isHypernatremia ? 'Hipernatremi İnfüzyon Reçetesi' : 'Hiponatremi İnfüzyon Reçetesi'}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-50 text-teal-800'
              }`}>
                {chosenInfusate.label.split(' ')[0]}
              </span>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Önerilen Saatlik İnfüzyon Hızı</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold font-mono tabular-nums text-teal-600 dark:text-teal-400">
                    {hourlyRateMl > 0 ? hourlyRateMl.toFixed(1) : '0.0'}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">mL / saat</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  ≈ {dropsPerMin > 0 ? Math.round(dropsPerMin) : 0} damla/dk (standart set)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <div className="text-slate-500 dark:text-slate-400">Toplam Sıvı Hacmi</div>
                  <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                    {requiredMl > 0 ? `${Math.round(requiredMl)} mL` : '0 mL'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    ({requiredLiters > 0 ? requiredLiters.toFixed(2) : '0'} Litre)
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 dark:text-slate-400">1L İnfüzat ile Beklenen ΔNa</div>
                  <div className="text-lg font-bold font-mono text-teal-600 dark:text-teal-400 mt-0.5">
                    {deltaNaPerLiter > 0 ? `+${deltaNaPerLiter.toFixed(2)}` : deltaNaPerLiter.toFixed(2)} mEq/L
                  </div>
                  <div className="text-[11px] text-slate-400">1000 mL başına değişim</div>
                </div>
              </div>
            </div>

            {/* 24 Saatlik Hız Projeksiyonu */}
            <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
              isDark ? 'bg-slate-800/60 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                24 Saatlik Projeksiyon Değişimi:
              </span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                {deltaNaPer24Hours > 0 ? `+${deltaNaPer24Hours.toFixed(1)}` : deltaNaPer24Hours.toFixed(1)} mEq/L / 24sa
              </span>
            </div>
          </div>

          {/* ODS / Aşırı Hızlı Düzeltme & Serebral Ödem Güvenlik Değerlendirmesi */}
          <div className={`p-4 rounded-xl border space-y-2.5 transition-all ${
            isOdsHazard || isCerebralEdemaRisk
              ? isDark ? 'bg-rose-950/30 border-rose-800 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
              : isOdsBorderline
                ? isDark ? 'bg-amber-950/30 border-amber-800 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'
                : isDark ? 'bg-emerald-950/20 border-emerald-800/80 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}>
            <div className="flex items-center gap-2">
              {isOdsHazard || isCerebralEdemaRisk ? (
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
              ) : isOdsBorderline ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              )}
              <h4 className="font-bold text-xs uppercase tracking-wider">
                {isOdsHazard 
                  ? 'Aşırı Hızlı Düzeltme & ODS Riski!' 
                  : isCerebralEdemaRisk 
                    ? 'Aşırı Hızlı Düşüş & Serebral Ödem Riski!'
                    : isOdsBorderline
                      ? 'Dikkat: Üst Güvenlik Sınırına Yakın (8–10 mEq/L/gün)'
                      : !isHypernatremia
                        ? 'Güvenli Düzeltme Aralığı (≤8 mEq/L / 24 saat)'
                        : 'Güvenli Düşüş Aralığı (≤10–12 mEq/L / 24 saat)'}
              </h4>
            </div>

            <p className="text-xs leading-relaxed">
              {isOdsHazard ? (
                <>
                  Planlanan 24 saatlik yükseliş ({deltaNaPer24Hours.toFixed(1)} mEq/L), uluslararası kılavuzların önerdiği <strong>maksimum 8 mEq/L/gün</strong> sınırını aşmaktadır. 
                  Kronik hiponatremide aşırı hızlı yükseltme <strong>Osmotik Demiyelinizasyon Sendromuna (ODS / Santral Pontin Miyelinozis)</strong> yol açabilir. 
                  İnfüzyon hızını azaltınız veya hedef süreyi uzatınız.
                </>
              ) : isCerebralEdemaRisk ? (
                <>
                  Hipernatremi düşüş hızı ({Math.abs(deltaNaPer24Hours).toFixed(1)} mEq/L/gün), önerilen maksimum 10–12 mEq/L/gün (saatte ~0.5 mEq/L) sınırını aşmaktadır. 
                  Hücre içine ani serbest su hücumu sonucu <strong>akut beyin ödemi, herniasyon ve fatal konvülziyon</strong> riski bulunur.
                </>
              ) : isOdsBorderline ? (
                <>
                  24 saatlik değişim {deltaNaPer24Hours.toFixed(1)} mEq/L düzeyindedir. Standart olgularda tolere edilebilir olsa da, malnütrisyon, alkolizm, 
                  karaciğer sirozu ve başlangıç Na &lt; 105 mEq/L olan yüksek ODS riskli hastalarda <strong>maksimum 4–6 mEq/L/gün</strong> hedeflenmelidir.
                </>
              ) : !isHypernatremia ? (
                <>
                  Planlanan hız uluslararası kılavuzların güvenli penceresindedir (≤ 6–8 mEq/L/24 saat). 
                  Serum sodyumu ilk 24 saatte her 2–4 saatte bir kontrol edilmeli ve idrar çıkışı yakından izlenmelidir.
                </>
              ) : (
                <>
                  Hipernatremi düşüş hızı güvenli sınırdadır (≤ 10–12 mEq/L / 24 saat veya saatte ≤ 0.5 mEq/L). 
                  Beyin hücrelerinin hacim dengesini koruyabilmesi için serbest su açığı en az 48 saate yayılarak kapatılmalıdır.
                </>
              )}
            </p>

            <div className="pt-1 text-[11px] opacity-80 flex items-center justify-between">
              {!isHypernatremia ? (
                <>
                  <span>Standart Hedef: ≤ 6–8 mEq/L / 24 saat</span>
                  <span>Yüksek ODS Riskinde: ≤ 4–6 mEq/L / 24 saat</span>
                </>
              ) : (
                <>
                  <span>Maksimum Güvenli Düşüş: ≤ 10–12 mEq/L / 24 saat</span>
                  <span>Hedef Hız: ~0.5 mEq/L / saat</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ALT BÖLÜM: Ek Klinik Araçlar (Serbest Su Açığı YALNIZCA Hipernatremide, Formül Detayı) */}
      <div className="space-y-3">
        {/* 1. Hipernatremi Serbest Su Açığı (Free Water Deficit) Akordeonu - YALNIZCA HİPERNATREMİDE GÖSTERİLİR */}
        {isHypernatremia && (
          <div className={`rounded-xl border overflow-hidden ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <button
              type="button"
              onClick={() => setShowWaterDeficit(!showWaterDeficit)}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-2.5">
                <Droplet className="w-4 h-4 text-cyan-500" />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    Hipernatremi Serbest Su Açığı Hesaplayıcısı (Free Water Deficit)
                  </span>
                  <span className="hidden sm:inline text-xs text-slate-500 ml-2">
                    · Mevcut Na {curNa} mEq/L için Hesaplanan Su Açığı: {freeWaterDeficitLitres.toFixed(2)} Litre
                  </span>
                </div>
              </div>
              {showWaterDeficit ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {showWaterDeficit && (
              <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs space-y-3 mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-slate-500 dark:text-slate-400">Hesaplanan Serbest Su Açığı</div>
                    <div className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">
                      {freeWaterDeficitLitres > 0 ? `${freeWaterDeficitLitres.toFixed(2)} Litre` : 'Açık Yok (Na ≤ 140)'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {freeWaterDeficitMl > 0 ? `≈ ${Math.round(freeWaterDeficitMl)} mL serbest su` : 'Serum Na normal veya düşük'}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-slate-500 dark:text-slate-400">Önerilen 48 Saatlik D5W Hızı</div>
                    <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">
                      {freeWaterHourlyRate48h > 0 ? `${freeWaterHourlyRate48h.toFixed(1)} mL/saat` : '0 mL/saat'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      İdame sıvı kaybı hariç net su açığı
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-slate-500 dark:text-slate-400">Oral / Nazogastrik Su Seçeneği</div>
                    <div className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400 mt-1">
                      {freeWaterDeficitLitres > 0 ? `Günde ~${Math.round(freeWaterDeficitMl / 2)} mL` : 'Gerek yok'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Hastanın bilinci açık ve GIS toleransı varsa
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <strong>Formül:</strong> Serbest Su Açığı (Litre) = TBW × [(Serum Na / 140) - 1]. 
                  Hipernatremide beyin hücreleri idiogenik osmolitler üreterek ozmotik dengeyi korur; bu nedenle su açığı en az 48 saatte, 
                  serum Na düşüşü saatte 0.5 mEq/L (günde maksimum 10–12 mEq/L) aşmayacak şekilde yavaşça kapatılmalıdır.
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Matematiksel Formül ve Adım Adım Hesaplama Akordeonu */}
        <div className={`rounded-xl border overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <button
            type="button"
            onClick={() => setShowCalculationSteps(!showCalculationSteps)}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <div className="flex items-center gap-2.5">
              <Calculator className="w-4 h-4 text-teal-500" />
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Adrogué-Madias Formülü ve Hesaplama Adımları
              </span>
            </div>
            {showCalculationSteps ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {showCalculationSteps && (
            <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs space-y-4 mt-3">
              {/* 1. Matematiksel Genel Formül Kutusu */}
              <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-teal-500" />
                  <span>Adrogué-Madias Orijinal Matematiksel Formülü:</span>
                </div>
                <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-center text-xs sm:text-sm font-bold text-teal-700 dark:text-teal-300">
                  ΔSerum Na⁺ (1 Litre İnfüzat) = [ (İnfüzat Na⁺ + İnfüzat K⁺) - Mevcut Serum Na⁺ ] / ( TBW + 1 )
                </div>
              </div>

              {/* 2. Potasyumun (K+) Rolü ve Edelman İlkesi Açıklaması */}
              <div className={`p-3.5 rounded-lg border space-y-2 ${
                isDark ? 'bg-amber-950/20 border-amber-800/70 text-amber-200' : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}>
                <div className="font-bold text-xs flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Formüldeki (Na⁺ + K⁺) Toplam Katyonunun Klinik Önemi (Edelman İlkesi):</span>
                </div>
                <p className="leading-relaxed text-[11px] opacity-95">
                  Serum sodyum konsantrasyonu tek başına sodyumla belirlenmez; <strong>Edelman formülüne</strong> göre serum osmolalitesi toplam değişebilir sodyum ve potasyumun vücut suyuna oranıdır: <code>Serum [Na⁺] ≈ (Na_e + K_e) / TBW</code>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-[11px]">
                  <div className="p-2.5 rounded bg-white/70 dark:bg-slate-900/70 border border-amber-300/40 dark:border-amber-700/40">
                    <strong>Hücresel Katyon Takası:</strong> İnfüzyonla verilen her potasyum ($K^+$) iyonu $Na^+/K^+$ ATPaz pompasıyla hücre içine girerken, elektriksel dengeyi korumak için hücre içindeki sodyum ($Na^+$) ekstraselüler alana çıkar. <em>Yani verilen potasyum, tıpkı sodyum verilmiş gibi serum sodyumunu artırır.</em>
                  </div>
                  <div className="p-2.5 rounded bg-white/70 dark:bg-slate-900/70 border border-amber-300/40 dark:border-amber-700/40">
                    <strong>ODS Tehlikesi (Potasyum Hesaplanmazsa):</strong> Hiponatremi hastasına hipokalemi için torba içine KCl veya Kaliphos eklendiğinde bu potasyum hesaba katılmazsa, serum sodyumu hekimin tahmininden <strong>2 kat daha hızlı fırlayabilir</strong> ve fatal <strong>Osmotik Demiyelinizasyon Sendromuna (ODS)</strong> yol açar.
                  </div>
                </div>
              </div>

              {/* 3. Hastaya Özel Adım Adım Sayısal Çözüm */}
              <div className="p-3.5 rounded-lg border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 font-mono text-[11px] sm:text-[12px] space-y-3">
                <div>
                  <div className="text-teal-600 dark:text-teal-400 font-bold">
                    Adım 1: Toplam Vücut Suyu (TBW) Hesabı:
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 mt-0.5">
                    TBW = Hasta Kilosu ({ptWeight} kg) × Faktör ({tbwFactor}) = <strong className="text-slate-900 dark:text-white">{tbwLitres.toFixed(1)} Litre</strong>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-teal-600 dark:text-teal-400 font-bold">
                    Adım 2: İnfüzat Katyon İçeriği &amp; Pay [(Na⁺ + K⁺) - Serum Na⁺]:
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 space-y-0.5 mt-0.5">
                    <div>• Sıvıdaki Sodyum (İnfüzat Na⁺): <strong className="text-slate-900 dark:text-white">{infusateNa} mEq/L</strong></div>
                    <div>• Sıvıdaki / Eklenen Potasyum (İnfüzat K⁺): <strong className="text-slate-900 dark:text-white">{infusateK} mEq/L</strong> {addedKcl > 0 ? `(Seçilen +${addedKcl} mEq/L KCl dahil)` : '(İlave K⁺ yok)'}</div>
                    <div>• Toplam Efektif Katyon (Na⁺ + K⁺): <strong className="text-teal-600 dark:text-teal-400">{(infusateNa + infusateK)} mEq/L</strong></div>
                    <div>• Mevcut Serum Na⁺: <strong className="text-slate-900 dark:text-white">{curNa} mEq/L</strong></div>
                    <div>• Formül Payı: ({(infusateNa + infusateK)} mEq) - ({curNa} mEq) = <strong className="text-slate-900 dark:text-white">{((infusateNa + infusateK) - curNa).toFixed(1)} mEq/L</strong></div>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-teal-600 dark:text-teal-400 font-bold">
                    Adım 3: Formül Paydası (TBW + 1):
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 mt-0.5">
                    Payda = {tbwLitres.toFixed(1)} Litre (TBW) + 1 Litre (Verilen Sıvı) = <strong className="text-slate-900 dark:text-white">{(tbwLitres + 1).toFixed(1)} Litre</strong>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-teal-600 dark:text-teal-400 font-bold">
                    Adım 4: 1 Litre İnfüzat ile Beklenen ΔSerum Na⁺:
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 mt-0.5">
                    ΔNa (1L) = {((infusateNa + infusateK) - curNa).toFixed(1)} / {(tbwLitres + 1).toFixed(1)} = <strong className="text-teal-600 dark:text-teal-400">{deltaNaPerLiter > 0 ? `+${deltaNaPerLiter.toFixed(3)}` : deltaNaPerLiter.toFixed(3)} mEq/L / Litre</strong>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-teal-600 dark:text-teal-400 font-bold">
                    Adım 5: Hedef Değişim için Gereken Toplam Sıvı:
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 mt-0.5">
                    Gereken Hacim = Hedef ΔNa ({desiredDeltaNa.toFixed(1)} mEq) / 1L ile ΔNa ({deltaNaPerLiter.toFixed(3)}) = <strong className="text-slate-900 dark:text-white">{requiredLiters.toFixed(2)} Litre ({Math.round(requiredMl)} mL)</strong>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-teal-600 dark:text-teal-400 font-bold">
                    Adım 6: Saatlik İnfüzyon Hızı (mL/saat &amp; damla/dk):
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 mt-0.5">
                    Saatlik Hız = {Math.round(requiredMl)} mL / {hours} saat = <strong className="text-teal-600 dark:text-teal-400">{hourlyRateMl.toFixed(1)} mL/saat</strong> 
                    <span className="text-slate-500 ml-2">(≈ {dropsPerMin > 0 ? Math.round(dropsPerMin) : 0} damla/dk)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. İç Referanslar (hideReferences false ise gösterilir) */}
        {!hideReferences && (
          <SodiumReferencesAccordion isDark={isDark} />
        )}
      </div>
    </div>
  );
};

// Klinik Kılavuzlar ve Kanıta Dayalı Kaynakça Akordeonu (En alta yerleştirmek için export edildi)
export const SodiumReferencesAccordion: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [showLiterature, setShowLiterature] = useState<boolean>(false);

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      <button
        type="button"
        onClick={() => setShowLiterature(!showLiterature)}
        className="w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
      >
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-teal-500" />
          <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
            Klinik Kılavuzlar ve Kanıta Dayalı Kaynakça
          </span>
        </div>
        {showLiterature ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {showLiterature && (
        <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs space-y-2 mt-3 text-slate-600 dark:text-slate-400">
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
            <div className="font-semibold text-slate-900 dark:text-white">1. Adrogué HJ, Madias NE. Hypernatremia &amp; Hyponatremia.</div>
            <div className="italic text-slate-500 mt-0.5">New England Journal of Medicine. 2000; 342(20):1493-1499. doi:10.1056/NEJM200005183422006.</div>
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
            <div className="font-semibold text-slate-900 dark:text-white">2. Spasovski G, Vanholder R, Allolio B, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia.</div>
            <div className="italic text-slate-500 mt-0.5">European Journal of Endocrinology. 2014; 170(3):G1-G47. doi:10.1530/EJE-13-1020.</div>
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
            <div className="font-semibold text-slate-900 dark:text-white">3. Sterns RH. Disorders of Plasma Sodium — Causes, Consequences, and Correction.</div>
            <div className="italic text-slate-500 mt-0.5">New England Journal of Medicine. 2015; 372(1):55-65. doi:10.1056/NEJMra1404489.</div>
          </div>
        </div>
      )}
    </div>
  );
};
