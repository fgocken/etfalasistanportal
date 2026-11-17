import React, { useState, useMemo } from 'react';
import {
  Baby,
  BookOpen,
  Calculator,
  CheckCircle2,
  Info,
  RotateCcw,
  Ruler,
  ShieldAlert,
  User,
  Weight
} from 'lucide-react';

interface AirwayEquipmentSizerProps {
  isDark: boolean;
  scope: 'adult' | 'pediatric';
  onOpenAdult?: () => void;
  onOpenPediatric?: () => void;
}

type PediatricGroup = 'neonate' | 'infant' | 'child';

interface IgelSpec {
  size: string;
  colorName: string;
  swatchClass: string;
  weightRange: string;
}

function getLmaSizeByWeight(weightKg: number): { size: string; maxCuffMl: string; note: string } {
  if (weightKg <= 0) {
    return { size: '—', maxCuffMl: '—', note: 'Kilo giriniz' };
  }
  if (weightKg < 5) {
    return { size: '1', maxCuffMl: '4 mL', note: 'Yenidoğan (< 5 kg)' };
  }
  if (weightKg < 10) {
    return { size: '1.5', maxCuffMl: '7 mL', note: 'Süt çocuğu (5–10 kg)' };
  }
  if (weightKg < 20) {
    return { size: '2', maxCuffMl: '10 mL', note: 'Küçük çocuk (10–20 kg)' };
  }
  if (weightKg < 30) {
    return { size: '2.5', maxCuffMl: '14 mL', note: 'Çocuk (20–30 kg)' };
  }
  if (weightKg < 50) {
    return { size: '3', maxCuffMl: '20 mL', note: 'Büyük çocuk / Zayıf erişkin (30–50 kg)' };
  }
  if (weightKg < 70) {
    return { size: '4', maxCuffMl: '30 mL', note: 'Standart erişkin (50–70 kg)' };
  }
  if (weightKg < 100) {
    return { size: '5', maxCuffMl: '40 mL', note: 'İri erişkin (70–100 kg)' };
  }
  return { size: '5 – 6', maxCuffMl: '40 – 50 mL', note: '≥ 100 kg erişkin' };
}

function getIgelSpecByWeight(weightKg: number): IgelSpec | null {
  if (weightKg <= 0) return null;
  if (weightKg < 5) {
    return { size: '1', colorName: 'Pembe', swatchClass: 'bg-pink-400', weightRange: '2–5 kg' };
  }
  if (weightKg < 12) {
    return { size: '1.5', colorName: 'Mavi', swatchClass: 'bg-sky-500', weightRange: '5–12 kg' };
  }
  if (weightKg < 25) {
    return { size: '2', colorName: 'Gri', swatchClass: 'bg-slate-400', weightRange: '10–25 kg' };
  }
  if (weightKg < 35) {
    return { size: '2.5', colorName: 'Beyaz', swatchClass: 'bg-slate-100 border border-slate-400', weightRange: '25–35 kg' };
  }
  if (weightKg < 60) {
    return { size: '3', colorName: 'Sarı', swatchClass: 'bg-amber-400', weightRange: '30–60 kg' };
  }
  if (weightKg < 90) {
    return { size: '4', colorName: 'Yeşil', swatchClass: 'bg-emerald-500', weightRange: '50–90 kg' };
  }
  return { size: '5', colorName: 'Turuncu', swatchClass: 'bg-orange-500', weightRange: '> 90 kg' };
}

function roundToHalf(val: number): number {
  return Math.floor(val * 2.0) / 2.0;
}

export const AirwayEquipmentSizer: React.FC<AirwayEquipmentSizerProps> = ({
  isDark,
  scope,
  onOpenAdult,
  onOpenPediatric
}) => {
  const mode = scope;

  // Adult state
  const [isMetric, setIsMetric] = useState<boolean>(true);
  const [isMale, setIsMale] = useState<boolean>(true);
  const [heightInput, setHeightInput] = useState<string>('175');
  const [weightInput, setWeightInput] = useState<string>('70');

  // Pediatric state
  const [pedGroup, setPedGroup] = useState<PediatricGroup>('child');
  const [neonateWeightKg, setNeonateWeightKg] = useState<string>('3.2');
  const [infantMonths, setInfantMonths] = useState<string>('6');
  const [infantActualWeight, setInfantActualWeight] = useState<string>('');
  const [childAgeYears, setChildAgeYears] = useState<string>('5');
  const [childActualWeight, setChildActualWeight] = useState<string>('');

  const handleToggleUnit = (nextMetric: boolean) => {
    if (nextMetric === isMetric) return;
    const hVal = parseFloat(heightInput);
    const wVal = parseFloat(weightInput);
    if (!Number.isNaN(hVal) && hVal > 0) {
      setHeightInput(nextMetric ? (hVal * 2.54).toFixed(1) : (hVal / 2.54).toFixed(1));
    }
    if (!Number.isNaN(wVal) && wVal > 0) {
      setWeightInput(nextMetric ? (wVal * 0.45359237).toFixed(1) : (wVal / 0.45359237).toFixed(1));
    }
    setIsMetric(nextMetric);
  };

  const resetAll = () => {
    setIsMetric(true);
    setIsMale(true);
    setHeightInput('175');
    setWeightInput('70');
    setPedGroup('child');
    setNeonateWeightKg('3.2');
    setInfantMonths('6');
    setInfantActualWeight('');
    setChildAgeYears('5');
    setChildActualWeight('');
  };

  // Adult calculations
  const adultCalc = useMemo(() => {
    const rawH = parseFloat(heightInput) || 0;
    const rawW = parseFloat(weightInput) || 0;
    const hCm = isMetric ? rawH : rawH * 2.54;
    const wKg = isMetric ? rawW : rawW * 0.45359237;

    const ettSize = isMale ? '7.5 – 8.0 mm' : '7.0 – 7.5 mm';
    const ettAltNote = isMale
      ? 'Büyük / bronkoskopi vakalarında 8.5 mm düşünülebilir'
      : 'Kısa boy (<155 cm) olgularda 6.5–7.0 mm tercih edilebilir';

    const ettDepth =
      hCm > 0 ? `${((hCm / 10.0) + 5.0).toFixed(1)} cm` : isMale ? '23.0 cm' : '21.0 cm';
    const depthMethod =
      hCm > 0 ? `Formül: (Boy ${hCm.toFixed(0)} / 10) + 5 cm` : 'Standart cinsiyet varsayımı (21 / 23 cm)';

    const bladeSize = isMale ? 'MAC 4 (veya MAC 3)' : 'MAC 3';
    const lma = getLmaSizeByWeight(wKg);
    const igel = getIgelSpecByWeight(wKg);

    const hasShortHeightWarning = hCm > 0 && hCm < 145;
    const hasOverlapNote = wKg >= 25 && wKg <= 35 ? '25–35 kg sınırında i-gel 2.5 veya 3 hastaya göre test edilir.'
      : wKg >= 50 && wKg <= 60 ? '50–60 kg sınırında i-gel 3 (Sarı) veya 4 (Yeşil) anatomiye göre seçilir.'
      : null;

    return {
      hCm,
      wKg,
      ettSize,
      ettAltNote,
      ettDepth,
      depthMethod,
      bladeSize,
      lma,
      igel,
      hasShortHeightWarning,
      hasOverlapNote
    };
  }, [heightInput, weightInput, isMetric, isMale]);

  // Pediatric calculations
  const pedCalc = useMemo(() => {
    if (pedGroup === 'neonate') {
      const w = Math.max(0.4, Math.min(6.0, parseFloat(neonateWeightKg) || 3.2));
      let uncuffed = '3.5 mm';
      let cuffed = '3.0 mm (Mikrokaflı)';
      let blade = 'Miller 1';

      if (w < 1.0) {
        uncuffed = '2.5 mm';
        cuffed = 'Kafsız 2.5 mm önerilir';
        blade = 'Miller 00 – 0';
      } else if (w < 2.0) {
        uncuffed = '3.0 mm';
        cuffed = 'Kafsız 3.0 mm (veya 2.5–3.0)';
        blade = 'Miller 0';
      } else if (w < 3.0) {
        uncuffed = '3.0 – 3.5 mm';
        cuffed = '3.0 mm (Mikrokaflı)';
        blade = 'Miller 0 – 1';
      } else {
        uncuffed = '3.5 mm';
        cuffed = '3.0 – 3.5 mm (Mikrokaflı)';
        blade = 'Miller 1';
      }

      const depth = +(w + 6.0).toFixed(1);
      const lma = getLmaSizeByWeight(w);
      const igel = getIgelSpecByWeight(w);

      return {
        weightUsed: w,
        weightSource: 'Girilen yenidoğan kilosu',
        cuffedEtt: cuffed,
        uncuffedEtt: uncuffed,
        depthCm: depth.toFixed(1),
        depthFormula: 'Tochen Kuralı: Kilo (kg) + 6 cm (Nazal: +2–3 cm)',
        blade,
        lma,
        igel,
        clinicalTip: 'Prematüre ve yenidoğanda (< 3 kg) rutin olarak kafsız ETT veya yalnızca kaflı gerekiyorsa < 20 cmH₂O basınçlı mikrokaflı tüp tercih edilir.'
      };
    }

    if (pedGroup === 'infant') {
      const months = Math.max(1, Math.min(12, parseFloat(infantMonths) || 6));
      const estW = +(months * 0.5 + 4.0).toFixed(1);
      const actualW = parseFloat(infantActualWeight);
      const w = !Number.isNaN(actualW) && actualW > 0 ? actualW : estW;

      const cuffed = months < 6 ? '3.0 mm' : '3.5 mm';
      const uncuffed = months < 6 ? '3.5 mm' : '3.5 – 4.0 mm';
      const depth = months < 6 ? 10.5 : 11.5;
      const lma = getLmaSizeByWeight(w);
      const igel = getIgelSpecByWeight(w);

      return {
        weightUsed: w,
        weightSource: !Number.isNaN(actualW) && actualW > 0
          ? `Girilen gerçek kilo (APLS tahmini: ${estW} kg)`
          : `Tahmini kilo: (${months} ay × 0.5) + 4 = ${estW} kg`,
        cuffedEtt: cuffed,
        uncuffedEtt: uncuffed,
        depthCm: depth.toFixed(1),
        depthFormula: 'Süt çocuğu standart oral derinlik (3 × ETT ID ile teyit edin)',
        blade: 'Miller 1',
        lma,
        igel,
        clinicalTip: '1–12 aylık süt çocuklarında Yaş/4 formülü uygulanmaz. İntübasyon sonrası her iki hemitoraks oskültasyonu ve kapnografi ile tüp derinliği mutlaka doğrulanmalıdır.'
      };
    }

    // Child (> 1 year)
    const age = Math.max(1, Math.min(16, parseFloat(childAgeYears) || 5));
    const estW = age <= 5 ? age * 2.0 + 8.0 : age * 3.0 + 7.0;
    const actualW = parseFloat(childActualWeight);
    const w = !Number.isNaN(actualW) && actualW > 0 ? actualW : estW;

    const cuffedVal = roundToHalf(age / 4.0 + 3.5);
    const uncuffedVal = roundToHalf(age / 4.0 + 4.0);
    const depthVal = age / 2.0 + 12.0;

    let blade = 'Miller 2 / MAC 2';
    if (age < 2) blade = 'Miller 1 / MAC 1';
    else if (age >= 8) blade = 'Miller 3 / MAC 3';

    const lma = getLmaSizeByWeight(w);
    const igel = getIgelSpecByWeight(w);

    return {
      weightUsed: w,
      weightSource: !Number.isNaN(actualW) && actualW > 0
        ? `Girilen gerçek kilo (APLS tahmini: ${estW.toFixed(1)} kg)`
        : age <= 5
          ? `APLS Tahmini Kilo: (2 × ${age}) + 8 = ${estW.toFixed(1)} kg`
          : `APLS Tahmini Kilo: (3 × ${age}) + 7 = ${estW.toFixed(1)} kg`,
      cuffedEtt: `${cuffedVal.toFixed(1)} mm`,
      uncuffedEtt: `${uncuffedVal.toFixed(1)} mm`,
      depthCm: depthVal.toFixed(1),
      depthFormula: `Formül: (Yaş ${age} / 2) + 12 cm · Teyit: 3 × ${cuffedVal.toFixed(1)} = ${(cuffedVal * 3).toFixed(1)} cm`,
      blade,
      lma,
      igel,
      clinicalTip: 'Güncel AHA PALS ve Coté kılavuzları 1 yaş üstü çocuklarda hava kaçağını önlemek için mikrokaflı ETT önerir (kaf basıncı ≤ 20 cmH₂O). Her zaman 0.5 mm küçük ve büyük yedek tüp hazır bulundurun.'
    };
  }, [pedGroup, neonateWeightKg, infantMonths, infantActualWeight, childAgeYears, childActualWeight]);

  const activeLmaSize = mode === 'adult' ? adultCalc.lma.size : pedCalc.lma.size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`p-5 rounded-2xl border space-y-3 ${
          mode === 'adult'
            ? isDark
              ? 'bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 border-cyan-500/30'
              : 'bg-gradient-to-r from-cyan-50 via-white to-slate-50 border-cyan-200 shadow-xs'
            : isDark
              ? 'bg-gradient-to-r from-amber-950/25 via-slate-900 to-slate-900 border-amber-500/30'
              : 'bg-gradient-to-r from-amber-50 via-white to-slate-50 border-amber-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>
                {mode === 'adult' ? 'Erişkin Havayolu Ekipman Boyutlandırma' : 'Pediatrik Havayolu Ekipman Boyutlandırma'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{mode === 'adult' ? 'Morgan & Mikhail / Miller' : 'Morgan & Mikhail / AHA PALS / Tochen'}</span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {mode === 'adult'
                ? 'Erişkin Havayolu Ekipman Hesaplayıcı'
                : 'Pediatrik Havayolu Ekipman Hesaplayıcı'}
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {mode === 'adult'
                ? 'Boy, kilo ve cinsiyete göre kaflı ETT iç çapı, kesici diş tespit derinliği, Macintosh bıçak, klasik LMA ve renk kodlu i-gel boyutlarını anında hesaplayın.'
                : 'Yenidoğan (0–28 gün), süt çocuğu (1–12 ay) ve çocuk (1–16 yaş) hastalarda kaflı/kafsız ETT çapı, Tochen/yaş bazlı oral derinlik, Miller/MAC bıçak, LMA ve renk kodlu i-gel boyutlarını hesaplayın.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start">
            {mode === 'adult' && onOpenPediatric && (
              <button
                type="button"
                onClick={onOpenPediatric}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                  isDark
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25'
                    : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <Baby className="w-3.5 h-3.5" />
                <span>Pediatrik Hesaplayıcıya Geç</span>
              </button>
            )}
            {mode === 'pediatric' && onOpenAdult && (
              <button
                type="button"
                onClick={onOpenAdult}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                  isDark
                    ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25'
                    : 'bg-cyan-50 border-cyan-200 text-cyan-800 hover:bg-cyan-100'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Erişkin Hesaplayıcıya Geç</span>
              </button>
            )}
            <button
              type="button"
              onClick={resetAll}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Varsayılana Dön</span>
            </button>
          </div>
        </div>
      </div>

      {/* ADULT MODE */}
      {mode === 'adult' && (
        <div
          className={`p-5 rounded-2xl border space-y-5 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Unit System */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Birim Sistemi
              </label>
              <div
                className={`grid grid-cols-2 p-1 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggleUnit(true)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    isMetric
                      ? 'bg-cyan-600 text-white'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Metrik (cm/kg)
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleUnit(false)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    !isMetric
                      ? 'bg-cyan-600 text-white'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  İmperial (in/lb)
                </button>
              </div>
            </div>

            {/* Sex */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Cinsiyet
              </label>
              <div
                className={`grid grid-cols-2 p-1 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsMale(true)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    isMale
                      ? 'bg-cyan-600 text-white'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Erkek
                </button>
                <button
                  type="button"
                  onClick={() => setIsMale(false)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    !isMale
                      ? 'bg-cyan-600 text-white'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Kadın
                </button>
              </div>
            </div>

            {/* Height */}
            <div className="space-y-1.5">
              <label
                htmlFor="airway-adult-height"
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                <Ruler className="w-3.5 h-3.5 text-cyan-500" />
                <span>Boy</span>
              </label>
              <div className="relative">
                <input
                  id="airway-adult-height"
                  type="number"
                  step="any"
                  min="0"
                  placeholder={isMetric ? '175' : '69'}
                  value={heightInput}
                  onChange={e => setHeightInput(e.target.value)}
                  className={`w-full px-3 py-2.5 pr-11 text-sm font-mono tabular-nums font-bold rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${
                    isDark
                      ? 'bg-slate-950 border-slate-700 text-white focus:border-cyan-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                  {isMetric ? 'cm' : 'in'}
                </span>
              </div>
            </div>

            {/* Weight */}
            <div className="space-y-1.5">
              <label
                htmlFor="airway-adult-weight"
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                <Weight className="w-3.5 h-3.5 text-cyan-500" />
                <span>Kilo (LMA &amp; i-gel için)</span>
              </label>
              <div className="relative">
                <input
                  id="airway-adult-weight"
                  type="number"
                  step="any"
                  min="0"
                  placeholder={isMetric ? '70' : '154'}
                  value={weightInput}
                  onChange={e => setWeightInput(e.target.value)}
                  className={`w-full px-3 py-2.5 pr-11 text-sm font-mono tabular-nums font-bold rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${
                    isDark
                      ? 'bg-slate-950 border-slate-700 text-white focus:border-cyan-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500'
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                  {isMetric ? 'kg' : 'lb'}
                </span>
              </div>
            </div>
          </div>

          {/* Adult Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 border-t border-slate-200/70 dark:border-slate-800">
            {/* ETT Size */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Kaflı ETT İç Çapı (ID)
              </div>
              <div className="text-xl font-mono tabular-nums font-black text-cyan-600 dark:text-cyan-400 mt-1">
                {adultCalc.ettSize}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                {adultCalc.ettAltNote}
              </p>
            </div>

            {/* ETT Depth */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Tespit Derinliği (Kesici Diş)
              </div>
              <div className="text-xl font-mono tabular-nums font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {adultCalc.ettDepth}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                {adultCalc.depthMethod}
              </p>
            </div>

            {/* Laryngoscope Blade */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Laringoskop Bıçağı (Blade)
              </div>
              <div className="text-xl font-mono tabular-nums font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {adultCalc.bladeSize}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                Macintosh eğri bıçak; derin valekulada MAC 4 tercih edilir.
              </p>
            </div>

            {/* LMA Size */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Klasik / 2. Nesil LMA Boyutu
              </div>
              <div className="text-xl font-mono tabular-nums font-black text-sky-600 dark:text-sky-400 mt-1">
                {adultCalc.lma.size === '—' ? 'Kilo Giriniz' : `No ${adultCalc.lma.size}`}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                {adultCalc.lma.size === '—'
                  ? 'Kilo bazlı supraglottik seçim için kilo girin'
                  : `${adultCalc.lma.note} · Maks kaf: ${adultCalc.lma.maxCuffMl}`}
              </p>
            </div>

            {/* i-gel Size */}
            <div className={`p-4 rounded-xl border sm:col-span-2 ${isDark ? 'bg-cyan-950/15 border-cyan-500/30' : 'bg-cyan-50/60 border-cyan-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                i-gel Supraglottik Havayolu Boyutu &amp; Renk Kodu
              </div>
              {adultCalc.igel ? (
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span className={`w-4 h-4 rounded-full shrink-0 ${adultCalc.igel.swatchClass}`} aria-hidden="true" />
                  <span className="text-xl font-mono tabular-nums font-black text-slate-900 dark:text-white">
                    No {adultCalc.igel.size} ({adultCalc.igel.colorName})
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Üretici aralığı: {adultCalc.igel.weightRange}
                  </span>
                </div>
              ) : (
                <div className="text-lg font-mono font-bold text-slate-400 mt-1">Kilo Giriniz</div>
              )}
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-snug">
                {adultCalc.hasOverlapNote
                  ? adultCalc.hasOverlapNote
                  : 'Kafsız jel yastıklı 2. nesil SGA; gastrik drenaj kanallıdır ve hızlı kurtarmada yüksek sızdırmazlık sağlar.'}
              </p>
            </div>
          </div>

          {adultCalc.hasShortHeightWarning && (
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
              isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Kısa Boy Uyarısı (&lt; 145 cm):</strong> ETT derinliği mutlaka bilateral oskültasyon ve sternal çentik üstü balon palpasyonu ile doğrulanmalıdır (tek akciğer entübasyonu riski).
              </span>
            </div>
          )}
        </div>
      )}

      {/* PEDIATRIC MODE */}
      {mode === 'pediatric' && (
        <div
          className={`p-5 rounded-2xl border space-y-5 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {/* Pediatric Sub-group Selector */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pediatrik Yaş Grubu Seçimi
            </label>
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 rounded-xl border ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              {[
                { id: 'neonate' as PediatricGroup, title: 'Yenidoğan (0–28 gün)', sub: 'Kilo bazlı · Tochen kuralı' },
                { id: 'infant' as PediatricGroup, title: 'Süt Çocuğu / İnfant (1–12 ay)', sub: 'Ay & kilo bazlı' },
                { id: 'child' as PediatricGroup, title: 'Çocuk (1–16 yaş)', sub: 'Motoyama / Cole / APLS' }
              ].map(g => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setPedGroup(g.id)}
                  className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    pedGroup === g.id
                      ? 'bg-amber-600 text-white shadow-xs'
                      : isDark
                        ? 'text-slate-300 hover:bg-slate-800/70'
                        : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="text-xs font-bold">{g.title}</div>
                  <div className={`text-[10px] mt-0.5 ${pedGroup === g.id ? 'text-amber-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {g.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pediatric Group Inputs */}
          {pedGroup === 'neonate' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div className="space-y-1.5">
                <label
                  htmlFor="ped-neonate-weight"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  Yenidoğan Kilosu (0.5 – 5.5 kg)
                </label>
                <div className="relative">
                  <input
                    id="ped-neonate-weight"
                    type="number"
                    step="0.1"
                    min="0.4"
                    max="6"
                    value={neonateWeightKg}
                    onChange={e => setNeonateWeightKg(e.target.value)}
                    className={`w-full px-3 py-2.5 pr-11 text-sm font-mono tabular-nums font-bold rounded-xl border ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">kg</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '0.8 kg (ELBW)', val: '0.8' },
                  { label: '1.5 kg (Preterm)', val: '1.5' },
                  { label: '2.5 kg', val: '2.5' },
                  { label: '3.2 kg (Term)', val: '3.2' },
                  { label: '4.0 kg', val: '4.0' }
                ].map(p => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => setNeonateWeightKg(p.val)}
                    className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-mono font-semibold cursor-pointer ${
                      neonateWeightKg === p.val
                        ? 'bg-amber-600 text-white border-amber-500'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {pedGroup === 'infant' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <label htmlFor="ped-infant-months">Yaş (1 – 12 Ay)</label>
                  <span className="font-mono text-amber-500">{infantMonths} Ay</span>
                </div>
                <input
                  id="ped-infant-months"
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={infantMonths}
                  onChange={e => setInfantMonths(e.target.value)}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="ped-infant-weight"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  Bilinen Gerçek Kilo (Opsiyonel)
                </label>
                <div className="relative">
                  <input
                    id="ped-infant-weight"
                    type="number"
                    step="0.1"
                    min="2"
                    max="20"
                    placeholder={`Boşsa APLS: ${((parseFloat(infantMonths) || 6) * 0.5 + 4).toFixed(1)} kg`}
                    value={infantActualWeight}
                    onChange={e => setInfantActualWeight(e.target.value)}
                    className={`w-full px-3 py-2 pr-11 text-sm font-mono tabular-nums font-bold rounded-xl border ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">kg</span>
                </div>
              </div>
            </div>
          )}

          {pedGroup === 'child' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <label htmlFor="ped-child-age">Çocuk Yaşı (1 – 16 Yıl)</label>
                  <span className="font-mono text-amber-500">{childAgeYears} Yaş</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    id="ped-child-age"
                    type="range"
                    min="1"
                    max="16"
                    step="0.5"
                    value={childAgeYears}
                    onChange={e => setChildAgeYears(e.target.value)}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="1"
                    max="16"
                    step="0.5"
                    aria-label="Çocuk yaşı sayısal giriş"
                    value={childAgeYears}
                    onChange={e => setChildAgeYears(e.target.value)}
                    className={`w-20 px-2.5 py-1.5 text-xs font-mono tabular-nums font-bold rounded-lg border text-center ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="ped-child-weight"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  Bilinen Gerçek Kilo (Opsiyonel — SGA Seçimi İçin)
                </label>
                <div className="relative">
                  <input
                    id="ped-child-weight"
                    type="number"
                    step="0.5"
                    min="5"
                    max="120"
                    placeholder="Boşsa APLS tahmini kilo kullanılır"
                    value={childActualWeight}
                    onChange={e => setChildActualWeight(e.target.value)}
                    className={`w-full px-3 py-2 pr-11 text-sm font-mono tabular-nums font-bold rounded-xl border ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">kg</span>
                </div>
              </div>
            </div>
          )}

          {/* Pediatric Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 border-t border-slate-200/70 dark:border-slate-800">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Kaflı ETT (Önerilen)
              </div>
              <div className="text-xl font-mono tabular-nums font-black text-amber-600 dark:text-amber-400 mt-1">
                {pedCalc.cuffedEtt}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                {pedGroup === 'child' ? 'Motoyama / Khine: (Yaş / 4) + 3.5 mm' : 'Mikrokaflı tüp (< 20 cmH₂O kaf basıncı)'}
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Kafsız ETT (Referans)
              </div>
              <div className="text-xl font-mono tabular-nums font-black text-slate-800 dark:text-slate-200 mt-1">
                {pedCalc.uncuffedEtt}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                {pedGroup === 'child' ? 'Cole Formülü: (Yaş / 4) + 4.0 mm' : 'Yenidoğan ve prematürelerde sık tercih edilir'}
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Oral Tespit Derinliği (Dudak)
              </div>
              <div className="text-xl font-mono tabular-nums font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {pedCalc.depthCm} cm
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                {pedCalc.depthFormula}
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Laringoskop Bıçağı (Blade)
              </div>
              <div className="text-xl font-mono tabular-nums font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {pedCalc.blade}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                Küçük çocuklarda yüksek/uzun epiglot nedeniyle düz (Miller) bıçak avantajlıdır.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                LMA Boyutu · Kullanılan Kilo: {pedCalc.weightUsed} kg
              </div>
              <div className="text-xl font-mono tabular-nums font-black text-sky-600 dark:text-sky-400 mt-1">
                No {pedCalc.lma.size}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                Maks kaf: {pedCalc.lma.maxCuffMl} · {pedCalc.weightSource}
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-amber-950/15 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'}`}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                i-gel Boyutu &amp; Renk Kodu
              </div>
              {pedCalc.igel ? (
                <div className="flex items-center gap-2.5 mt-1.5">
                  <span className={`w-4 h-4 rounded-full shrink-0 ${pedCalc.igel.swatchClass}`} aria-hidden="true" />
                  <span className="text-xl font-mono tabular-nums font-black text-slate-900 dark:text-white">
                    No {pedCalc.igel.size} ({pedCalc.igel.colorName})
                  </span>
                </div>
              ) : null}
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-snug">
                Aralık: {pedCalc.igel?.weightRange} · {pedCalc.lma.note}
              </p>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border text-xs flex items-start gap-2 ${
            isDark ? 'bg-emerald-950/15 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>{pedCalc.clinicalTip}</span>
          </div>
        </div>
      )}

      {/* Quick Reference Table */}
      <div
        className={`p-5 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200/70 dark:border-slate-800">
          <Calculator className="w-4 h-4 text-cyan-500" />
          <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Supraglottik Havayolu (LMA &amp; i-gel) Hızlı Kilo Tablosu
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="py-2 pr-3 font-bold">Boyut</th>
                <th className="py-2 pr-3 font-bold">Hasta Kilosu (LMA)</th>
                <th className="py-2 pr-3 font-bold">LMA Maks Kaf</th>
                <th className="py-2 pr-3 font-bold">i-gel Renk &amp; Kilo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/70 font-mono tabular-nums">
              {[
                { size: '1', lmaW: '< 5 kg', cuff: '4 mL', igel: 'Pembe (2–5 kg)', dot: 'bg-pink-400' },
                { size: '1.5', lmaW: '5 – 10 kg', cuff: '7 mL', igel: 'Mavi (5–12 kg)', dot: 'bg-sky-500' },
                { size: '2', lmaW: '10 – 20 kg', cuff: '10 mL', igel: 'Gri (10–25 kg)', dot: 'bg-slate-400' },
                { size: '2.5', lmaW: '20 – 30 kg', cuff: '14 mL', igel: 'Beyaz (25–35 kg)', dot: 'bg-slate-100 border border-slate-400' },
                { size: '3', lmaW: '30 – 50 kg', cuff: '20 mL', igel: 'Sarı (30–60 kg)', dot: 'bg-amber-400' },
                { size: '4', lmaW: '50 – 70 kg', cuff: '30 mL', igel: 'Yeşil (50–90 kg)', dot: 'bg-emerald-500' },
                { size: '5', lmaW: '70 – 100 kg', cuff: '40 mL', igel: 'Turuncu (> 90 kg)', dot: 'bg-orange-500' }
              ].map(row => {
                const isSelected = activeLmaSize === row.size || (activeLmaSize === '5 – 6' && row.size === '5');
                return (
                  <tr
                    key={row.size}
                    className={
                      isSelected
                        ? mode === 'adult'
                          ? isDark
                            ? 'bg-cyan-500/15'
                            : 'bg-cyan-50/90'
                          : isDark
                            ? 'bg-amber-500/15'
                            : 'bg-amber-50/90'
                        : undefined
                    }
                  >
                    <td className="py-2 pr-3 font-bold text-slate-900 dark:text-white">
                      No {row.size}
                      {isSelected && (
                        <span className={`ml-2 text-[10px] font-sans font-bold ${mode === 'adult' ? 'text-cyan-600 dark:text-cyan-400' : 'text-amber-600 dark:text-amber-400'}`}>
                          (Seçili)
                        </span>
                      )}
                    </td>
                    <td className="py-2 pr-3 text-slate-600 dark:text-slate-300">{row.lmaW}</td>
                    <td className="py-2 pr-3 text-slate-600 dark:text-slate-300">{row.cuff}</td>
                    <td className="py-2 pr-3 text-slate-700 dark:text-slate-200">
                      <span className="inline-flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${row.dot}`} aria-hidden="true" />
                        <span>{row.igel}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <Info className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
          <span>
            LMA kaf basıncı manometre ile &lt; 60 cmH₂O tutulmalıdır; maks kaf volümleri asla rutin şişirme hedefi değil üst sınırdır.
          </span>
        </div>
      </div>

      {/* References */}
      <div
        className={`p-4 rounded-xl border text-xs space-y-1.5 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <BookOpen className="w-4 h-4 text-cyan-500" />
          <span>
            {mode === 'adult'
              ? 'Kaynaklar (Erişkin Havayolu Yönetimi Standartları)'
              : 'Kaynaklar (Pediatrik Havayolu Yönetimi & Boyutlandırma Standartları)'}
          </span>
        </div>
        <p>1. Butterworth JF, Mackey DC, Wasnick JD. <em>Morgan &amp; Mikhail&apos;s Clinical Anesthesiology</em> (7th Ed.). Airway Management{mode === 'pediatric' ? ' & Pediatric Anesthesia' : ''}.</p>
        <p>2. Gropper MA, et al. <em>Miller&apos;s Anesthesia</em> (10th Ed.). Tracheal Intubation{mode === 'pediatric' ? ' & Pediatric Airway Sizing' : ' & Supraglottic Airway Devices'}.</p>
        {mode === 'pediatric' ? (
          <>
            <p>3. Khine HH, Corddry DH, Kettrick RG, et al. <em>Comparison of cuffed and uncuffed endotracheal tubes in young children during general anesthesia.</em> Anesthesiology. 1997;86(3):627–631. PMID: 9066329.</p>
            <p>4. Tochen ML. <em>Orotracheal intubation in the newborn infant: a method for determining depth of tube insertion.</em> J Pediatr. 1979;95(6):1050–1051. PMID: 501484.</p>
            <p>5. American Heart Association (AHA) <em>Pediatric Advanced Life Support (PALS)</em> &amp; Advanced Paediatric Life Support (APLS) Weight Estimation Guidelines.</p>
          </>
        ) : (
          <p>3. Intersurgical i-gel &amp; LMA Classic Weight-Based Sizing Specifications; Difficult Airway Society (DAS) Adult Airway Equipment Standards.</p>
        )}
      </div>
    </div>
  );
};

export default AirwayEquipmentSizer;
