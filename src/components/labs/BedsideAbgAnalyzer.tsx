import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Pin,
  PinOff,
  RotateCcw,
  SlidersHorizontal,
  Thermometer,
  Wind,
  XCircle
} from 'lucide-react';
import {
  ABG_PRESETS,
  AbgComparisonSnapshot,
  AbgInputValues,
  AlbuminUnit,
  analyzeAbg,
  DEFAULT_ABG_INPUTS,
  formatSignedTr,
  formatTr,
  GlucoseUnit,
  LactateUnit,
  parseNum,
  SeverityTone,
  UreaMode
} from '../../utils/abgAnalysis';
import { AbgAcidBaseMap } from './AbgAcidBaseMap';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface BedsideAbgAnalyzerProps {
  isDark: boolean;
}

export const BedsideAbgAnalyzer: React.FC<BedsideAbgAnalyzerProps> = ({ isDark }) => {
  const [inputs, setInputs] = useState<AbgInputValues>(DEFAULT_ABG_INPUTS);
  const [activePresetId, setActivePresetId] = useState<string>('normal');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [pinnedBaseline, setPinnedBaseline] = useState<AbgComparisonSnapshot | null>(null);

  // Bedside Ventilator & Deficit Interactive Controls
  const [targetPco2, setTargetPco2] = useState<string>('40');
  const [currentMvLmin, setCurrentMvLmin] = useState<string>('7.0');
  const [patientWeightKg, setPatientWeightKg] = useState<string>('70');

  // Horizontal scroll controls for Quick Clinical Scenarios
  const presetsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPresetsLeft, setCanScrollPresetsLeft] = useState<boolean>(false);
  const [canScrollPresetsRight, setCanScrollPresetsRight] = useState<boolean>(false);

  const checkPresetsScroll = () => {
    const el = presetsScrollRef.current;
    if (!el) return;
    setCanScrollPresetsLeft(el.scrollLeft > 4);
    setCanScrollPresetsRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkPresetsScroll();
    const el = presetsScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkPresetsScroll, { passive: true });
    window.addEventListener('resize', checkPresetsScroll);
    return () => {
      el.removeEventListener('scroll', checkPresetsScroll);
      window.removeEventListener('resize', checkPresetsScroll);
    };
  }, []);

  const scrollPresets = (direction: 'left' | 'right') => {
    const el = presetsScrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -240 : 240,
      behavior: 'smooth'
    });
  };

  const handlePresetsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = presetsScrollRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
      el.scrollLeft += e.deltaY;
    }
  };

  const analysis = useMemo(() => analyzeAbg(inputs), [inputs]);

  const updateField = <K extends keyof AbgInputValues>(key: K, value: AbgInputValues[K]) => {
    setActivePresetId('');
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetId: string) => {
    const preset = ABG_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(preset.id);
    setInputs({ ...DEFAULT_ABG_INPUTS, ...preset.values });
    if (
      preset.values.glucose ||
      preset.values.bun ||
      preset.values.hb ||
      preset.values.peep ||
      preset.values.urcl ||
      (preset.values.tempC && preset.values.tempC !== '37.0')
    ) {
      setShowAdvanced(true);
    }
  };

  const handleReset = () => {
    setActivePresetId('normal');
    setInputs(DEFAULT_ABG_INPUTS);
    setTargetPco2('40');
  };

  const handleAlbUnitChange = (nextUnit: AlbuminUnit) => {
    if (nextUnit === inputs.albUnit) return;
    const val = parseNum(inputs.alb);
    const converted =
      val !== null ? String(Number((nextUnit === 'g/L' ? val * 10 : val / 10).toFixed(1))) : inputs.alb;
    setInputs((prev) => ({ ...prev, albUnit: nextUnit, alb: converted }));
  };

  const handleLacUnitChange = (nextUnit: LactateUnit) => {
    if (nextUnit === inputs.lacUnit) return;
    const val = parseNum(inputs.lac);
    const converted =
      val !== null ? String(Number((nextUnit === 'mg/dL' ? val * 9.01 : val / 9.01).toFixed(1))) : inputs.lac;
    setInputs((prev) => ({ ...prev, lacUnit: nextUnit, lac: converted }));
  };

  const handleGlucoseUnitChange = (nextUnit: GlucoseUnit) => {
    if (nextUnit === inputs.glucoseUnit) return;
    const val = parseNum(inputs.glucose);
    const converted =
      val !== null
        ? String(Number((nextUnit === 'mmol/L' ? val / 18.018 : val * 18.018).toFixed(1)))
        : inputs.glucose;
    setInputs((prev) => ({ ...prev, glucoseUnit: nextUnit, glucose: converted }));
  };

  const handleUreaModeChange = (nextMode: UreaMode) => {
    if (nextMode === inputs.ureaMode) return;
    const val = parseNum(inputs.bun);
    const converted =
      val !== null
        ? String(Number((nextMode === 'bun' ? val / 2.14 : val * 2.14).toFixed(1)))
        : inputs.bun;
    setInputs((prev) => ({ ...prev, ureaMode: nextMode, bun: converted }));
  };

  const handleCopyReport = async () => {
    if (!analysis.copyReport) return;
    try {
      await navigator.clipboard.writeText(analysis.copyReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore clipboard errors silently
    }
  };

  const toggleBaselinePin = () => {
    if (!analysis.valid) return;
    if (pinnedBaseline) {
      setPinnedBaseline(null);
    } else {
      setPinnedBaseline(analysis.snapshot);
    }
  };

  // Interactive MV calculation based on user target PaCO2
  const mvCalc = useMemo(() => {
    const tPco2 = parseNum(targetPco2);
    const curMv = parseNum(currentMvLmin);
    if (!analysis.valid || !tPco2 || tPco2 <= 10 || tPco2 >= 100) return null;
    const requiredFactor = analysis.pco2 / tPco2;
    const pctDelta = (requiredFactor - 1) * 100;
    const targetMv = curMv && curMv > 0 ? curMv * requiredFactor : null;
    return {
      targetPco2: tPco2,
      pctDelta,
      targetMv
    };
  }, [analysis.valid, analysis.pco2, targetPco2, currentMvLmin]);

  // Interactive NaHCO3 Deficit estimation (0.4 * weight * (targetHCO3 - currentHCO3))
  const bicarbCalc = useMemo(() => {
    const wt = parseNum(patientWeightKg);
    if (!analysis.valid || !wt || wt <= 0 || analysis.hco3 >= 22) return null;
    const targetHco3 = 20;
    const deficit = 0.4 * wt * (targetHco3 - analysis.hco3);
    if (deficit <= 0) return null;
    return {
      deficit,
      halfDose: deficit * 0.5,
      targetHco3
    };
  }, [analysis.valid, analysis.hco3, patientWeightKg]);

  const inputBaseClass = `w-full px-2.5 py-1.5 text-sm font-mono tabular-nums rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
    isDark
      ? 'bg-slate-950/70 border-slate-700/80 text-slate-100 placeholder:text-slate-600'
      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
  }`;

  const labelTextClass = `block text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`;
  const helperTextClass = `block text-[11px] mt-0.5 font-mono tabular-nums ${isDark ? 'text-slate-500' : 'text-slate-400'}`;

  const renderToneIcon = (tone: SeverityTone, sizeClass = 'w-4 h-4') => {
    if (tone === 'bad') return <XCircle className={`${sizeClass} text-rose-500 shrink-0`} />;
    if (tone === 'warn') return <AlertTriangle className={`${sizeClass} text-amber-500 shrink-0`} />;
    if (tone === 'ok') return <CheckCircle2 className={`${sizeClass} text-emerald-500 shrink-0`} />;
    return <Activity className={`${sizeClass} text-slate-400 shrink-0`} />;
  };

  const verdictStyle = (tone: SeverityTone) => {
    if (tone === 'bad') {
      return isDark
        ? 'bg-rose-950/35 border-rose-800/70 text-rose-100'
        : 'bg-rose-50/90 border-rose-200 text-rose-950';
    }
    if (tone === 'warn') {
      return isDark
        ? 'bg-amber-950/30 border-amber-800/70 text-amber-100'
        : 'bg-amber-50/90 border-amber-200 text-amber-950';
    }
    if (tone === 'ok') {
      return isDark
        ? 'bg-emerald-950/30 border-emerald-800/70 text-emerald-100'
        : 'bg-emerald-50/90 border-emerald-200 text-emerald-950';
    }
    return isDark
      ? 'bg-slate-900 border-slate-800 text-slate-100'
      : 'bg-white border-slate-200 text-slate-900';
  };

  const stepToneStyle = (tone: SeverityTone) => {
    if (tone === 'bad') {
      return isDark ? 'bg-rose-950/20 border-rose-900/50' : 'bg-rose-50/50 border-rose-200/80';
    }
    if (tone === 'warn') {
      return isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/50 border-amber-200/80';
    }
    if (tone === 'ok') {
      return isDark ? 'bg-emerald-950/15 border-emerald-900/40' : 'bg-emerald-50/40 border-emerald-200/70';
    }
    return isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200';
  };

  const stewartMax = useMemo(() => {
    if (!analysis.stewartRows) return 10;
    return Math.max(
      10,
      ...analysis.stewartRows.map((r) => Math.abs(r.value)),
      Math.abs(analysis.sbe)
    );
  }, [analysis.stewartRows, analysis.sbe]);

  return (
    <div className="space-y-5">
      {/* Header & Top Toolbar */}
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Yatak Başı Arteriyel Kan Gazı (AKG) Analizi
            </h2>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Henderson–Hasselbalch · Boston/Winter kompanzasyonu · Figge düzeltmeli anyon açığı · Story (BJA) Stewart SBE · Oksijenasyon ve ventilatör kararı
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* ABG / VBG Mode Switch */}
          <div
            className={`flex items-center p-0.5 rounded-lg border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => updateField('sampleType', 'abg')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                inputs.sampleType === 'abg'
                  ? isDark
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-slate-900 shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Arteriyel (AKG)
            </button>
            <button
              type="button"
              onClick={() => updateField('sampleType', 'vbg')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                inputs.sampleType === 'vbg'
                  ? isDark
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-900 shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Venöz (VBG Çevrimi)
            </button>
          </div>

          <button
            type="button"
            onClick={toggleBaselinePin}
            disabled={!analysis.valid}
            title={
              pinnedBaseline
                ? 'Sabitlenen bazal kan gazını temizle'
                : 'Mevcut kan gazını önceki/bazal değer olarak sabitle ve trendi gör'
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              pinnedBaseline
                ? isDark
                  ? 'bg-sky-950/60 border-sky-700 text-sky-300 hover:bg-sky-900/70'
                  : 'bg-sky-50 border-sky-300 text-sky-800 hover:bg-sky-100'
                : isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {pinnedBaseline ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
            <span>{pinnedBaseline ? 'Trendi Temizle' : 'Bazal Sabitle'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyReport}
            disabled={!analysis.valid}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-40'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Özeti Kopyala'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>

          <ShareLinkButton type="arac" id="abg" isDark={isDark} variant="compact" title="AKG Analizi Bağlantısını Paylaş" />
        </div>
      </div>

      {/* Clinical Scenario Presets */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Hızlı Klinik Senaryolar
          </div>
          <span className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {ABG_PRESETS.length} klinik örnek · sağ/sol oklarla kaydırın
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollPresets('left')}
            disabled={!canScrollPresetsLeft}
            title="Önceki senaryolar (sola kaydır)"
            aria-label="Önceki senaryolar"
            className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
              canScrollPresetsLeft
                ? isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-teal-500/60 cursor-pointer'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-teal-500/60 shadow-2xs cursor-pointer'
                : isDark
                  ? 'bg-slate-900/40 border-slate-800/70 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={presetsScrollRef}
            onWheel={handlePresetsWheel}
            className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
          >
            {ABG_PRESETS.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  title={preset.summary}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-teal-600/20 border-teal-500 text-teal-300 font-semibold'
                        : 'bg-teal-50 border-teal-500 text-teal-900 font-semibold'
                      : isDark
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollPresets('right')}
            disabled={!canScrollPresetsRight}
            title="Sonraki senaryolar (sağa kaydır)"
            aria-label="Sonraki senaryolar"
            className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
              canScrollPresetsRight
                ? isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-teal-500/60 cursor-pointer'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-teal-500/60 shadow-2xs cursor-pointer'
                : isDark
                  ? 'bg-slate-900/40 border-slate-800/70 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Split Console: Left Parameter Input + Right Diagnostic Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Input Form */}
        <aside
          className={`lg:col-span-4 rounded-xl border p-4 space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kan Gazı & Elektrolit Girdisi
            </h3>
            <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {inputs.sampleType === 'vbg' ? 'VBG Modu' : 'AKG Modu'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* pH */}
            <div>
              <label className={labelTextClass} htmlFor="abg-ph">
                pH
              </label>
              <input
                id="abg-ph"
                type="number"
                step="0.01"
                inputMode="decimal"
                value={inputs.ph}
                onChange={(e) => updateField('ph', e.target.value)}
                className={inputBaseClass}
              />
              <span className={helperTextClass}>7,35–7,45</span>
            </div>

            {/* pCO2 */}
            <div>
              <label className={labelTextClass} htmlFor="abg-pco2">
                pCO₂ (mmHg)
              </label>
              <input
                id="abg-pco2"
                type="number"
                step="0.5"
                inputMode="decimal"
                value={inputs.pco2}
                onChange={(e) => updateField('pco2', e.target.value)}
                className={inputBaseClass}
              />
              <span className={helperTextClass}>35–45 mmHg</span>
            </div>

            {/* HCO3 */}
            <div>
              <label className={labelTextClass} htmlFor="abg-hco3">
                HCO₃⁻ (mmol/L)
              </label>
              <input
                id="abg-hco3"
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="Oto hesap"
                value={inputs.hco3}
                onChange={(e) => updateField('hco3', e.target.value)}
                className={inputBaseClass}
              />
              <span className={helperTextClass}>boşsa HH hesaplar</span>
            </div>

            {/* SBE */}
            <div>
              <label className={labelTextClass} htmlFor="abg-sbe">
                SBE (mEq/L)
              </label>
              <input
                id="abg-sbe"
                type="number"
                step="0.1"
                inputMode="decimal"
                placeholder="Oto tahmin"
                value={inputs.sbe}
                onChange={(e) => updateField('sbe', e.target.value)}
                className={inputBaseClass}
              />
              <span className={helperTextClass}>−2 ile +2</span>
            </div>

            {/* Na+ */}
            <div>
              <label className={labelTextClass} htmlFor="abg-na">
                Na⁺ (mmol/L)
              </label>
              <input
                id="abg-na"
                type="number"
                step="1"
                inputMode="decimal"
                value={inputs.na}
                onChange={(e) => updateField('na', e.target.value)}
                className={inputBaseClass}
              />
              <span className={helperTextClass}>135–145</span>
            </div>

            {/* Cl- */}
            <div>
              <label className={labelTextClass} htmlFor="abg-cl">
                Cl⁻ (mmol/L)
              </label>
              <input
                id="abg-cl"
                type="number"
                step="1"
                inputMode="decimal"
                value={inputs.cl}
                onChange={(e) => updateField('cl', e.target.value)}
                className={inputBaseClass}
              />
              <span className={helperTextClass}>98–106</span>
            </div>

            {/* K+ */}
            <div>
              <label className={labelTextClass} htmlFor="abg-k">
                K⁺ (mmol/L)
              </label>
              <input
                id="abg-k"
                type="number"
                step="0.1"
                inputMode="decimal"
                value={inputs.k}
                onChange={(e) => updateField('k', e.target.value)}
                className={inputBaseClass}
              />
              <span className={helperTextClass}>3,5–5,0</span>
            </div>

            {/* Resp Chronicity */}
            <div>
              <label className={labelTextClass} htmlFor="abg-resp-type">
                Solunumsal Süreç
              </label>
              <select
                id="abg-resp-type"
                value={inputs.respChronicity}
                onChange={(e) => updateField('respChronicity', e.target.value as 'acute' | 'chronic')}
                className={inputBaseClass}
              >
                <option value="acute">Akut</option>
                <option value="chronic">Kronik</option>
              </select>
              <span className={helperTextClass}>Boston kuralı</span>
            </div>

            {/* Albumin */}
            <div className="col-span-2">
              <label className={labelTextClass} htmlFor="abg-alb">
                Albümin
              </label>
              <div className="flex gap-1.5">
                <input
                  id="abg-alb"
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  value={inputs.alb}
                  onChange={(e) => updateField('alb', e.target.value)}
                  className={inputBaseClass}
                />
                <select
                  aria-label="Albümin birimi"
                  value={inputs.albUnit}
                  onChange={(e) => handleAlbUnitChange(e.target.value as AlbuminUnit)}
                  className={`w-24 shrink-0 px-2 py-1.5 text-xs font-mono rounded-lg border ${
                    isDark
                      ? 'bg-slate-950/70 border-slate-700/80 text-slate-100'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="g/dL">g/dL</option>
                  <option value="g/L">g/L</option>
                </select>
              </div>
              <span className={helperTextClass}>Normal: 3,5–5,0 g/dL (35–50 g/L)</span>
            </div>

            {/* Lactate */}
            <div className="col-span-2">
              <label className={labelTextClass} htmlFor="abg-lac">
                Laktat
              </label>
              <div className="flex gap-1.5">
                <input
                  id="abg-lac"
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  value={inputs.lac}
                  onChange={(e) => updateField('lac', e.target.value)}
                  className={inputBaseClass}
                />
                <select
                  aria-label="Laktat birimi"
                  value={inputs.lacUnit}
                  onChange={(e) => handleLacUnitChange(e.target.value as LactateUnit)}
                  className={`w-24 shrink-0 px-2 py-1.5 text-xs font-mono rounded-lg border ${
                    isDark
                      ? 'bg-slate-950/70 border-slate-700/80 text-slate-100'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="mmol/L">mmol/L</option>
                  <option value="mg/dL">mg/dL</option>
                </select>
              </div>
              <span className={helperTextClass}>Normal: 0,5–1,6 mmol/L</span>
            </div>
          </div>

          {/* Oxygenation Subsection */}
          <div className={`pt-3 border-t space-y-2.5 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Oksijenasyon & Ventilasyon Parametreleri
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className={labelTextClass} htmlFor="abg-pao2">
                  PaO₂
                </label>
                <input
                  id="abg-pao2"
                  type="number"
                  step="1"
                  inputMode="decimal"
                  value={inputs.pao2}
                  onChange={(e) => updateField('pao2', e.target.value)}
                  className={inputBaseClass}
                />
                <span className={helperTextClass}>mmHg</span>
              </div>
              <div>
                <label className={labelTextClass} htmlFor="abg-fio2">
                  FiO₂
                </label>
                <input
                  id="abg-fio2"
                  type="number"
                  step="0.01"
                  inputMode="decimal"
                  value={inputs.fio2}
                  onChange={(e) => updateField('fio2', e.target.value)}
                  className={inputBaseClass}
                />
                <span className={helperTextClass}>0,21–1,0</span>
              </div>
              <div>
                <label className={labelTextClass} htmlFor="abg-age">
                  Yaş
                </label>
                <input
                  id="abg-age"
                  type="number"
                  step="1"
                  inputMode="numeric"
                  value={inputs.age}
                  onChange={(e) => updateField('age', e.target.value)}
                  className={inputBaseClass}
                />
                <span className={helperTextClass}>yıl</span>
              </div>
            </div>

            {/* Quick FiO2 Buttons */}
            <div className="flex flex-wrap gap-1">
              {[
                { label: '%21 Oda', val: '0.21' },
                { label: '%32 Nazal', val: '0.32' },
                { label: '%40 Maske', val: '0.40' },
                { label: '%60', val: '0.60' },
                { label: '%100', val: '1.00' }
              ].map((btn) => (
                <button
                  key={btn.val}
                  type="button"
                  onClick={() => updateField('fio2', btn.val)}
                  className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                    inputs.fio2 === btn.val
                      ? isDark
                        ? 'bg-teal-600/25 border-teal-500 text-teal-300'
                        : 'bg-teal-50 border-teal-500 text-teal-800'
                      : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Expandable Advanced Bedside Parameters */}
          <div className={`pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className={`w-full flex items-center justify-between text-xs font-semibold py-1 cursor-pointer transition-colors ${
                isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-700 hover:text-teal-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>İleri Parametreler (Hb, Glukoz, Isı, Osmolalite, PEEP)</span>
              </span>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvanced && (
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div>
                  <label className={labelTextClass} htmlFor="abg-hb">
                    Hemoglobin (g/dL)
                  </label>
                  <input
                    id="abg-hb"
                    type="number"
                    step="0.1"
                    inputMode="decimal"
                    value={inputs.hb}
                    onChange={(e) => updateField('hb', e.target.value)}
                    className={inputBaseClass}
                  />
                  <span className={helperTextClass}>CaO₂ hesabı için</span>
                </div>

                <div>
                  <label className={labelTextClass} htmlFor="abg-sao2">
                    SaO₂ / SpO₂ (%)
                  </label>
                  <input
                    id="abg-sao2"
                    type="number"
                    step="1"
                    inputMode="decimal"
                    value={inputs.sao2}
                    onChange={(e) => updateField('sao2', e.target.value)}
                    className={inputBaseClass}
                  />
                  <span className={helperTextClass}>%94–100</span>
                </div>

                <div className="col-span-2">
                  <label className={labelTextClass} htmlFor="abg-glucose">
                    Glukoz (DKA Na⁺ düzeltmesi)
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      id="abg-glucose"
                      type="number"
                      step="1"
                      placeholder="İsteğe bağlı"
                      inputMode="decimal"
                      value={inputs.glucose}
                      onChange={(e) => updateField('glucose', e.target.value)}
                      className={inputBaseClass}
                    />
                    <select
                      aria-label="Glukoz birimi"
                      value={inputs.glucoseUnit}
                      onChange={(e) => handleGlucoseUnitChange(e.target.value as GlucoseUnit)}
                      className={`w-24 shrink-0 px-2 py-1.5 text-xs font-mono rounded-lg border ${
                        isDark
                          ? 'bg-slate-950/70 border-slate-700/80 text-slate-100'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="mg/dL">mg/dL</option>
                      <option value="mmol/L">mmol/L</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className={labelTextClass} htmlFor="abg-bun">
                    {inputs.ureaMode === 'urea' ? 'Üre (mg/dL)' : 'BUN — Kan Üre Azotu (mg/dL)'}
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      id="abg-bun"
                      type="number"
                      step="1"
                      placeholder="İsteğe bağlı"
                      inputMode="decimal"
                      value={inputs.bun}
                      onChange={(e) => updateField('bun', e.target.value)}
                      className={inputBaseClass}
                    />
                    <select
                      aria-label="Üre veya BUN seçimi"
                      value={inputs.ureaMode}
                      onChange={(e) => handleUreaModeChange(e.target.value as UreaMode)}
                      className={`w-28 shrink-0 px-2 py-1.5 text-xs font-mono rounded-lg border ${
                        isDark
                          ? 'bg-slate-950/70 border-slate-700/80 text-slate-100'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="urea">Üre (mg/dL)</option>
                      <option value="bun">BUN (mg/dL)</option>
                    </select>
                  </div>
                  <span className={helperTextClass}>
                    {(() => {
                      const val = parseNum(inputs.bun);
                      if (inputs.ureaMode === 'urea') {
                        return val !== null
                          ? `Normal: 15–43 mg/dL · BUN ≈ ${formatTr(val / 2.14, 1)} mg/dL`
                          : 'Normal: 15–43 mg/dL (÷ 2,14 = BUN)';
                      }
                      return val !== null
                        ? `Normal: 7–20 mg/dL · Üre ≈ ${formatTr(val * 2.14, 0)} mg/dL`
                        : 'Normal: 7–20 mg/dL (× 2,14 = Üre)';
                    })()}
                  </span>
                </div>

                <div>
                  <label className={labelTextClass} htmlFor="abg-osm">
                    Ölçülen Osm.
                  </label>
                  <input
                    id="abg-osm"
                    type="number"
                    step="1"
                    placeholder="mOsm/kg"
                    inputMode="decimal"
                    value={inputs.measuredOsm}
                    onChange={(e) => updateField('measuredOsm', e.target.value)}
                    className={inputBaseClass}
                  />
                  <span className={helperTextClass}>275–295</span>
                </div>

                <div>
                  <label className={labelTextClass} htmlFor="abg-peep">
                    PEEP (cmH₂O)
                  </label>
                  <input
                    id="abg-peep"
                    type="number"
                    step="1"
                    placeholder="ör. 5"
                    inputMode="decimal"
                    value={inputs.peep}
                    onChange={(e) => updateField('peep', e.target.value)}
                    className={inputBaseClass}
                  />
                  <span className={helperTextClass}>Berlin ARDS</span>
                </div>

                <div>
                  <label className={labelTextClass} htmlFor="abg-temp">
                    Vücut Isısı (°C)
                  </label>
                  <input
                    id="abg-temp"
                    type="number"
                    step="0.1"
                    inputMode="decimal"
                    value={inputs.tempC}
                    onChange={(e) => updateField('tempC', e.target.value)}
                    className={inputBaseClass}
                  />
                  <span className={helperTextClass}>37,0 °C ref.</span>
                </div>

                <div>
                  <label className={labelTextClass} htmlFor="abg-urcl">
                    İdrar Cl⁻ (mEq/L)
                  </label>
                  <input
                    id="abg-urcl"
                    type="number"
                    step="1"
                    placeholder="Alkalozda isteğe bağlı"
                    inputMode="decimal"
                    value={inputs.urcl}
                    onChange={(e) => updateField('urcl', e.target.value)}
                    className={inputBaseClass}
                  />
                  <span className={helperTextClass}>&lt;20 yanıtlı · &gt;20 dirençli</span>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT COLUMN: Diagnostic Output */}
        <section className="lg:col-span-8 space-y-4 min-w-0" aria-live="polite">
          {!analysis.valid ? (
            <div
              className={`rounded-xl border p-8 text-center text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              {analysis.errorMessage}
            </div>
          ) : (
            <>
              {/* 1. Primary Verdict Card */}
              <div className={`rounded-xl border p-5 space-y-3 ${verdictStyle(analysis.verdictTone)}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 font-mono tabular-nums">
                    {renderToneIcon(analysis.verdictTone)}
                    <span className="font-semibold">
                      {analysis.sampleType === 'vbg' ? 'VBG → Tahmini AKG' : 'Arteriyel Kan Gazı'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>pH {formatTr(analysis.ph, 2)}</span>
                    <span aria-hidden="true">·</span>
                    <span>pCO₂ {formatTr(analysis.pco2, 0)} mmHg</span>
                    <span aria-hidden="true">·</span>
                    <span>HCO₃⁻ {formatTr(analysis.hco3, 1)} mmol/L</span>
                    <span aria-hidden="true">·</span>
                    <span>SBE {formatSignedTr(analysis.sbe, 1)}</span>
                  </div>
                  <span className="font-semibold">{analysis.acidBaseStateLabel}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                  {analysis.headline}
                </h3>

                {(analysis.disorders.length > 0 || analysis.extraFlags.length > 0) && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs pt-1 opacity-90">
                    {analysis.disorders.map((d, idx) => (
                      <span key={d.key} className="inline-flex items-center gap-1.5 font-medium">
                        {idx > 0 && <span aria-hidden="true">/</span>}
                        <span>
                          {d.role === 'extra' ? 'Ek bozukluk: ' : 'Primer: '}
                          {d.label}
                        </span>
                      </span>
                    ))}
                    {analysis.extraFlags.map((flag) => (
                      <span key={flag} className="inline-flex items-center gap-1.5 font-medium">
                        <span aria-hidden="true">/</span>
                        <span>{flag}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Optional Baseline Comparison Strip */}
              {pinnedBaseline && (
                <div
                  className={`rounded-xl border p-4 space-y-2.5 ${
                    isDark
                      ? 'bg-sky-950/25 border-sky-800/60 text-sky-100'
                      : 'bg-sky-50/70 border-sky-200 text-sky-950'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-sky-500" />
                      Seri Kan Gazı Karşılaştırması (Bazal {pinnedBaseline.capturedAt} → Güncel)
                    </span>
                    <span className="font-mono opacity-80">
                      pH {formatTr(pinnedBaseline.ph, 2)} → {formatTr(analysis.ph, 2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono tabular-nums">
                    <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-sky-100'}`}>
                      <div className="text-[11px] opacity-70 font-sans">Δ pH</div>
                      <div className="font-bold">{formatSignedTr(analysis.ph - pinnedBaseline.ph, 2)}</div>
                    </div>
                    <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-sky-100'}`}>
                      <div className="text-[11px] opacity-70 font-sans">Δ pCO₂</div>
                      <div className="font-bold">{formatSignedTr(analysis.pco2 - pinnedBaseline.pco2, 0)} mmHg</div>
                    </div>
                    <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-sky-100'}`}>
                      <div className="text-[11px] opacity-70 font-sans">Δ HCO₃⁻</div>
                      <div className="font-bold">{formatSignedTr(analysis.hco3 - pinnedBaseline.hco3, 1)} mmol/L</div>
                    </div>
                    {pinnedBaseline.lactate !== null && analysis.lactateMmol !== null && (
                      <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-sky-100'}`}>
                        <div className="text-[11px] opacity-70 font-sans">Laktat Klirensi</div>
                        <div className="font-bold">
                          {pinnedBaseline.lactate > 0
                            ? `%${formatSignedTr(((pinnedBaseline.lactate - analysis.lactateMmol) / pinnedBaseline.lactate) * 100, 0)} azalma`
                            : `${formatSignedTr(analysis.lactateMmol - pinnedBaseline.lactate, 1)}`}
                        </div>
                      </div>
                    )}
                    {pinnedBaseline.pfRatio !== null && analysis.pfRatio !== null && (
                      <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-sky-100'}`}>
                        <div className="text-[11px] opacity-70 font-sans">Δ P/F Oranı</div>
                        <div className="font-bold">{formatSignedTr(analysis.pfRatio - pinnedBaseline.pfRatio, 0)}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. Key Quantitative Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {analysis.ag !== null && (
                  <MetricTile
                    label="Anyon Açığı (AG)"
                    value={`${formatTr(analysis.ag)} mEq/L`}
                    tone={analysis.ag > 14 ? 'bad' : 'neutral'}
                    isDark={isDark}
                  />
                )}
                {analysis.cag !== null && analysis.albuminGL !== null && (
                  <MetricTile
                    label="Düzeltilmiş AG (Figge)"
                    value={`${formatTr(analysis.cag)} mEq/L`}
                    tone={analysis.highAg ? 'bad' : 'neutral'}
                    isDark={isDark}
                  />
                )}
                {analysis.deltaRatio !== null && (
                  <MetricTile
                    label="Delta Oranı (ΔAG/ΔHCO₃)"
                    value={formatTr(analysis.deltaRatio, 2)}
                    sub={`Delta Gap: ${formatTr(analysis.deltaGap!, 1)}`}
                    tone={analysis.deltaRatio > 2 || analysis.deltaRatio < 0.8 ? 'warn' : 'neutral'}
                    isDark={isDark}
                  />
                )}
                <MetricTile
                  label="SBE (Baz Fazlası)"
                  value={`${formatSignedTr(analysis.sbe)} mEq/L`}
                  tone={Math.abs(analysis.sbe) > 3 ? 'warn' : 'neutral'}
                  isDark={isDark}
                />
                {analysis.pfRatio !== null && (
                  <MetricTile
                    label="PaO₂ / FiO₂ Oranı"
                    value={formatTr(analysis.pfRatio, 0)}
                    sub={analysis.fio2Normalized ? `FiO₂ %${formatTr(analysis.fio2Normalized * 100, 0)}` : undefined}
                    tone={analysis.pfRatio < 100 ? 'bad' : analysis.pfRatio < 300 ? 'warn' : 'neutral'}
                    isDark={isDark}
                  />
                )}
                {analysis.aaGradient !== null && (
                  <MetricTile
                    label="A–a Gradyenti"
                    value={`${formatTr(analysis.aaGradient, 0)} mmHg`}
                    sub={analysis.expectedAa !== null ? `Beklenen ≈ ${formatTr(analysis.expectedAa, 0)}` : undefined}
                    tone={
                      analysis.expectedAa !== null && analysis.aaGradient > analysis.expectedAa + 5
                        ? 'warn'
                        : 'neutral'
                    }
                    isDark={isDark}
                  />
                )}
                {analysis.cao2 !== null && (
                  <MetricTile
                    label="Oksijen İçeriği (CaO₂)"
                    value={`${formatTr(analysis.cao2, 1)} mL/dL`}
                    sub="Normal 16–20"
                    tone={analysis.cao2 < 10 ? 'bad' : analysis.cao2 < 13 ? 'warn' : 'neutral'}
                    isDark={isDark}
                  />
                )}
                {analysis.correctedNa !== null && (
                  <MetricTile
                    label="Glukoz Düzeltmeli Na⁺"
                    value={`${formatTr(analysis.correctedNa, 1)} mmol/L`}
                    sub="Katz / Hillier"
                    tone="warn"
                    isDark={isDark}
                  />
                )}
                <MetricTile
                  label="Osmolal Gap"
                  value={
                    analysis.osmolalGap !== null
                      ? `${formatSignedTr(analysis.osmolalGap, 0)} mOsm/kg`
                      : 'N/A'
                  }
                  sub={
                    analysis.osmolalGap !== null
                      ? `Hesap: ${formatTr(analysis.calcOsmolality!, 0)} mOsm/kg`
                      : analysis.measuredOsm !== null
                        ? 'Glukoz ve Üre/BUN gerekli'
                        : analysis.calcOsmolality !== null
                          ? `Hesap: ${formatTr(analysis.calcOsmolality, 0)} · Ölç. Osm. yok`
                          : 'Ölçülen Osm. girilmedi'
                  }
                  tone={analysis.osmolalGap !== null && analysis.osmolalGap > 10 ? 'bad' : 'neutral'}
                  isDark={isDark}
                />
              </div>

              {/* 2B. Dedicated Anyon Açığı (Anion Gap) & Delta Analizi Panel */}
              {analysis.anionGapAnalysis && (
                <div
                  className={`rounded-xl border p-4 space-y-3.5 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Anyon Açığı (Anion Gap) Analizi — Düzeltilmemiş vs Albümin Düzeltmeli
                      </h4>
                      <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Bazal AG = 12 mEq/L · Bazal HCO₃⁻ = 24 mmol/L · ΔHCO₃⁻ = {formatSignedTr(analysis.anionGapAnalysis.deltaHco3, 1)} mmol/L
                      </p>
                    </div>
                    {analysis.anionGapAnalysis.hiddenByHypoalbuminemia && (
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                          isDark
                            ? 'bg-rose-950/50 border-rose-800 text-rose-300'
                            : 'bg-rose-50 border-rose-200 text-rose-800'
                        }`}
                      >
                        Hipoalbüminemi AG’yi maskeliyordu
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Sol Blok: Düzeltilmemiş */}
                    <div
                      className={`rounded-lg border p-3 space-y-2.5 ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
                      }`}
                    >
                      <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        Düzeltilmemiş Değerler
                      </div>
                      <div className="grid grid-cols-3 gap-2 font-mono tabular-nums">
                        <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <div className={`text-[10.5px] font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Anion Gap
                          </div>
                          <div className={`text-sm font-bold mt-0.5 ${
                            analysis.anionGapAnalysis.highRawAg
                              ? isDark ? 'text-rose-300' : 'text-rose-700'
                              : isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {formatTr(analysis.anionGapAnalysis.ag, 1)}
                          </div>
                          <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            8–12 mEq/L
                          </div>
                        </div>

                        <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <div className={`text-[10.5px] font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Delta Gap
                          </div>
                          <div className={`text-sm font-bold mt-0.5 ${
                            Math.abs(analysis.anionGapAnalysis.rawDeltaGap) > 6
                              ? isDark ? 'text-amber-300' : 'text-amber-800'
                              : isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {formatSignedTr(analysis.anionGapAnalysis.rawDeltaGap, 1)}
                          </div>
                          <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            Düz.HCO₃: {formatTr(analysis.anionGapAnalysis.rawPredictedHco3, 1)}
                          </div>
                        </div>

                        <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <div className={`text-[10.5px] font-sans ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Delta Ratio
                          </div>
                          <div className={`text-sm font-bold mt-0.5 ${
                            analysis.anionGapAnalysis.rawDeltaRatio !== null &&
                            (analysis.anionGapAnalysis.rawDeltaRatio > 2 || analysis.anionGapAnalysis.rawDeltaRatio < 0.8)
                              ? isDark ? 'text-amber-300' : 'text-amber-800'
                              : isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {analysis.anionGapAnalysis.rawDeltaRatio !== null
                              ? formatTr(analysis.anionGapAnalysis.rawDeltaRatio, 2)
                              : '—'}
                          </div>
                          <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            {analysis.anionGapAnalysis.rawDeltaRatio !== null ? '1,0–2,0 saf' : 'HCO₃⁻ ≥ 24'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sağ Blok: Albümin Düzeltmeli (Figge) */}
                    <div
                      className={`rounded-lg border p-3 space-y-2.5 ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-teal-50/30 border-teal-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold ${isDark ? 'text-teal-300' : 'text-teal-900'}`}>
                          Albümin Düzeltmeli (Figge)
                        </span>
                        <span className={`text-[10.5px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {analysis.albuminGL !== null ? `Alb: ${formatTr(analysis.albuminGL / 10, 1)} g/dL` : 'Albümin girilmedi'}
                        </span>
                      </div>

                      {analysis.anionGapAnalysis.hasAlbumin && analysis.anionGapAnalysis.cag !== null ? (
                        <div className="grid grid-cols-3 gap-2 font-mono tabular-nums">
                          <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div className={`text-[10.5px] font-sans leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Alb. Corr. AG
                            </div>
                            <div className={`text-sm font-bold mt-0.5 ${
                              analysis.anionGapAnalysis.highCorrAg
                                ? isDark ? 'text-rose-300' : 'text-rose-700'
                                : isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              {formatTr(analysis.anionGapAnalysis.cag, 1)}
                            </div>
                            <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                              8–12 mEq/L
                            </div>
                          </div>

                          <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div className={`text-[10.5px] font-sans leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Alb. Delta Gap
                            </div>
                            <div className={`text-sm font-bold mt-0.5 ${
                              analysis.anionGapAnalysis.corrDeltaGap !== null && Math.abs(analysis.anionGapAnalysis.corrDeltaGap) > 6
                                ? isDark ? 'text-amber-300' : 'text-amber-800'
                                : isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              {analysis.anionGapAnalysis.corrDeltaGap !== null
                                ? formatSignedTr(analysis.anionGapAnalysis.corrDeltaGap, 1)
                                : '—'}
                            </div>
                            <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                              Düz.HCO₃: {analysis.anionGapAnalysis.corrPredictedHco3 !== null ? formatTr(analysis.anionGapAnalysis.corrPredictedHco3, 1) : '—'}
                            </div>
                          </div>

                          <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div className={`text-[10.5px] font-sans leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Alb. Delta Ratio
                            </div>
                            <div className={`text-sm font-bold mt-0.5 ${
                              analysis.anionGapAnalysis.corrDeltaRatio !== null &&
                              (analysis.anionGapAnalysis.corrDeltaRatio > 2 || analysis.anionGapAnalysis.corrDeltaRatio < 0.8)
                                ? isDark ? 'text-amber-300' : 'text-amber-800'
                                : isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              {analysis.anionGapAnalysis.corrDeltaRatio !== null
                                ? formatTr(analysis.anionGapAnalysis.corrDeltaRatio, 2)
                                : '—'}
                            </div>
                            <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                              {analysis.anionGapAnalysis.corrDeltaRatio !== null ? '1,0–2,0 saf' : 'HCO₃⁻ ≥ 24'}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`text-xs py-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Albümin düzeltmeli AG, Delta Gap ve Delta Oranı hesabı için soldan Albümin değeri girin.
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`text-xs px-3 py-2 rounded-lg border leading-relaxed ${
                      analysis.anionGapAnalysis.hiddenByHypoalbuminemia
                        ? isDark
                          ? 'bg-rose-950/25 border-rose-900/50 text-rose-200'
                          : 'bg-rose-50/70 border-rose-200 text-rose-900'
                        : isDark
                          ? 'bg-slate-950/40 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <strong>Klinik Yorum:</strong> {analysis.anionGapAnalysis.interpretation}
                    <span className={`block text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Delta Gap = ΔAG − ΔHCO₃⁻ (Ref: −6 ile +6 mEq/L; alternatif Düzeltilmiş HCO₃⁻ = HCO₃⁻ + ΔAG, Ref: 22–26 mmol/L) · Delta Ratio = ΔAG / ΔHCO₃⁻ (&lt;0,4 saf NAGMA, 0,4–0,99 HAGMA+NAGMA, 1,0–2,0 saf HAGMA, &gt;2,0 ek metabolik alkaloz).
                    </span>
                  </div>
                </div>
              )}

              {/* 3. Acid-Base Map + Story Stewart Contribution Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`rounded-xl border p-4 space-y-2 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Asit-Baz Haritası (pH × HCO₃⁻)
                    </h4>
                    <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      pCO₂ izobarları
                    </span>
                  </div>
                  <AbgAcidBaseMap
                    ph={analysis.ph}
                    hco3={analysis.hco3}
                    isAbnormal={analysis.verdictTone !== 'ok'}
                    isDark={isDark}
                    baselinePoint={
                      pinnedBaseline
                        ? { ph: pinnedBaseline.ph, hco3: pinnedBaseline.hco3 }
                        : null
                    }
                  />
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Yeşil/teal kutu fizyolojik normal bölgeyi, eğriler sabit pCO₂ (10–80 mmHg) izobarlarını gösterir.
                  </p>
                </div>

                <div
                  className={`rounded-xl border p-4 space-y-3 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Stewart SBE Katkıları (mEq/L)
                    </h4>
                    <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Story (BJA 2004)
                    </span>
                  </div>

                  {analysis.stewartRows ? (
                    <div className="space-y-3 pt-1">
                      {analysis.stewartRows.map((row) => {
                        const widthPct = Math.min(50, (Math.abs(row.value) / stewartMax) * 50);
                        const isPos = row.value >= 0;
                        return (
                          <div key={row.label} className="space-y-0.5">
                            <div className="grid grid-cols-[125px_1fr_56px] items-center gap-2 text-xs">
                              <span className={`truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                {row.label}
                              </span>
                              <div
                                className={`relative h-3.5 rounded ${
                                  isDark ? 'bg-slate-950' : 'bg-slate-100'
                                }`}
                              >
                                <div
                                  className={`absolute top-0 bottom-0 left-1/2 w-px ${
                                    isDark ? 'bg-slate-600' : 'bg-slate-400'
                                  }`}
                                />
                                <div
                                  className={`absolute top-0 bottom-0 rounded-xs ${
                                    isPos ? 'bg-teal-500' : 'bg-rose-500'
                                  }`}
                                  style={{
                                    left: isPos ? '50%' : undefined,
                                    right: !isPos ? '50%' : undefined,
                                    width: `${widthPct}%`
                                  }}
                                />
                              </div>
                              <span className="text-right font-mono font-semibold tabular-nums">
                                {formatSignedTr(row.value)}
                              </span>
                            </div>
                            {row.detail && (
                              <div className={`text-[10px] font-mono pl-[133px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                {row.detail}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Total SBE row */}
                      <div
                        className={`pt-2.5 border-t grid grid-cols-[125px_1fr_56px] items-center gap-2 text-xs font-bold ${
                          isDark ? 'border-slate-800 text-white' : 'border-slate-200 text-slate-900'
                        }`}
                      >
                        <span>Toplam SBE</span>
                        <div className={`relative h-3.5 rounded ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                          <div
                            className={`absolute top-0 bottom-0 left-1/2 w-px ${
                              isDark ? 'bg-slate-600' : 'bg-slate-400'
                            }`}
                          />
                          <div
                            className={`absolute top-0 bottom-0 rounded-xs ${
                              analysis.sbe >= 0 ? 'bg-teal-600' : 'bg-rose-600'
                            }`}
                            style={{
                              left: analysis.sbe >= 0 ? '50%' : undefined,
                              right: analysis.sbe < 0 ? '50%' : undefined,
                              width: `${Math.min(50, (Math.abs(analysis.sbe) / stewartMax) * 50)}%`
                            }}
                          />
                        </div>
                        <span className="text-right font-mono tabular-nums">
                          {formatSignedTr(analysis.sbe)}
                        </span>
                      </div>

                      <p className={`text-[11px] pt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Negatif (kırmızı) değerler asidoz yönünde, pozitif (teal) değerler alkaloz yönünde katkıyı gösterir.
                      </p>
                    </div>
                  ) : (
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Na⁺, Cl⁻, albümin ve laktat girildiğinde SBE’nin Stewart bileşenleri burada hesaplanır.
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Interactive Bedside Action & Temperature Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mechanical Ventilation Target Calculator */}
                <div
                  className={`rounded-xl border p-4 space-y-3 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <Wind className="w-4 h-4 text-teal-500" />
                      <span>Mekanik Ventilasyon PaCO₂ Hedef Ayarı</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={labelTextClass} htmlFor="mv-target-pco2">
                        Hedef PaCO₂ (mmHg)
                      </label>
                      <input
                        id="mv-target-pco2"
                        type="number"
                        step="1"
                        value={targetPco2}
                        onChange={(e) => setTargetPco2(e.target.value)}
                        className={inputBaseClass}
                      />
                    </div>
                    <div>
                      <label className={labelTextClass} htmlFor="mv-current">
                        Mevcut MV (L/dk)
                      </label>
                      <input
                        id="mv-current"
                        type="number"
                        step="0.2"
                        value={currentMvLmin}
                        onChange={(e) => setCurrentMvLmin(e.target.value)}
                        className={inputBaseClass}
                      />
                    </div>
                  </div>

                  {mvCalc && (
                    <div
                      className={`p-3 rounded-lg border text-xs space-y-1 ${
                        isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="font-semibold flex items-center justify-between">
                        <span>Önerilen Dakika Ventilasyonu Değişimi</span>
                        <span className="font-mono font-bold text-teal-600 dark:text-teal-400 tabular-nums">
                          {mvCalc.pctDelta >= 0 ? '+' : '−'}%{formatTr(Math.abs(mvCalc.pctDelta), 0)}
                          {mvCalc.targetMv !== null ? ` (${formatTr(mvCalc.targetMv, 1)} L/dk)` : ''}
                        </span>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Alveoler ventilasyon formülü: Yeni MV = Mevcut MV × (Mevcut PaCO₂ / Hedef PaCO₂). ARDS/KOAH’da permisif hiperkapni (pH ≥ 7,20) ve plato basıncı ≤ 30 cmH₂O hedeflenir.
                      </p>
                    </div>
                  )}
                </div>

                {/* Hypothermia Temperature Correction OR NaHCO3 Deficit Helper */}
                <div
                  className={`rounded-xl border p-4 space-y-3 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  {analysis.tempCorrection ? (
                    <>
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          <Thermometer className="w-4 h-4 text-sky-500" />
                          <span>Sıcaklık Düzeltmesi ({formatTr(analysis.tempCorrection.tempC, 1)} °C)</span>
                        </h4>
                        <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Alpha-stat vs pH-stat
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono tabular-nums">
                        <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <div className="text-[11px] font-sans font-semibold text-teal-600 dark:text-teal-400">
                            Alpha-stat (37 °C Cihaz)
                          </div>
                          <div className="mt-1">pH: {formatTr(analysis.rawPh, 2)}</div>
                          <div>pCO₂: {formatTr(analysis.rawPco2, 0)} mmHg</div>
                        </div>
                        <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <div className="text-[11px] font-sans font-semibold text-sky-600 dark:text-sky-400">
                            pH-stat ({formatTr(analysis.tempCorrection.tempC, 1)} °C)
                          </div>
                          <div className="mt-1">pH: {formatTr(analysis.tempCorrection.phStatPh, 2)}</div>
                          <div>pCO₂: {formatTr(analysis.tempCorrection.phStatPco2, 0)} mmHg</div>
                        </div>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Erişkin KPB ve serebral otoregülasyonda yaygın olarak Alpha-stat (37 °C okuması) tercih edilir; pediatrik/derin hipotermik sirkulatuar arrestte pH-stat stratejisi düşünülebilir.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Bikarbonat Açığı & Sıvı Planı Hesaplayıcısı
                        </h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32">
                          <label className={labelTextClass} htmlFor="abg-wt">
                            Hasta Kilosu (kg)
                          </label>
                          <input
                            id="abg-wt"
                            type="number"
                            step="1"
                            value={patientWeightKg}
                            onChange={(e) => setPatientWeightKg(e.target.value)}
                            className={inputBaseClass}
                          />
                        </div>
                        <div className={`flex-1 text-xs font-mono tabular-nums p-2.5 rounded-lg border ${
                          isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}>
                          {bicarbCalc ? (
                            <>
                              <div>
                                Toplam Açık (Hedef HCO₃⁻ 20): <strong>{formatTr(bicarbCalc.deficit, 0)} mEq</strong>
                              </div>
                              <div className="text-[11px] opacity-80 mt-0.5 font-sans">
                                Endike ise başlangıçta yarısı (~{formatTr(bicarbCalc.halfDose, 0)} mEq) yavaş infüzyonla verilir ve kontrol AKG alınır.
                              </div>
                            </>
                          ) : (
                            <span className="font-sans">
                              HCO₃⁻ ≥ 22 mmol/L — bikarbonat açığı hesaplanacak düzeyde metabolik açık yok.
                            </span>
                          )}
                        </div>
                      </div>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Uyarı: DKA ve laktik asidozda altta yatan neden düzeltilmeden rutin NaHCO₃ önerilmez; NAGMA veya hiperkalemi eşlikli ağır asidemide (pH &lt; 7,15) etkin ventilasyon eşliğinde değerlendirilir.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* 5. Step-by-Step Clinical Trace */}
              <div
                className={`rounded-xl border p-4 space-y-3 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Adım Adım Sistematik Değerlendirme
                </h4>
                <ol className="space-y-2">
                  {analysis.steps.map((step, idx) => (
                    <li
                      key={`${step.title}-${idx}`}
                      className={`p-3 rounded-lg border text-xs leading-relaxed flex items-start gap-2.5 ${stepToneStyle(step.tone)}`}
                    >
                      <span className="mt-0.5">{renderToneIcon(step.tone, 'w-4 h-4')}</span>
                      <div className="min-w-0">
                        <div className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                          {idx + 1}. {step.title}
                        </div>
                        <div className={`mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{step.body}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 6. Differential Diagnosis & Bedside Notes */}
              <div
                className={`rounded-xl border p-4 space-y-2.5 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Olası Nedenler ve Yatak Başı Klinik Notlar
                </h4>
                <ul className={`space-y-1.5 text-xs leading-relaxed list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {analysis.clinicalNotes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>

              {/* 7. Authoritative Sources & References */}
              <div
                className={`rounded-xl border p-4 space-y-2 ${
                  isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                  <span>Dayanak Kaynaklar & Güncel Literatür</span>
                </div>
                <ul className={`text-[11px] space-y-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <li>
                    • <strong>Gropper MA et al.</strong> <em>Miller&apos;s Anesthesia</em> (9th &amp; 10th Eds.), Acid–Base Equilibrium &amp; Blood Gas Analysis. Elsevier.
                  </li>
                  <li>
                    • <strong>Butterworth JF, Mackey DC, Wasnick JD.</strong> <em>Morgan &amp; Mikhail&apos;s Clinical Anesthesiology</em> (7th Ed.), Acid–Base Balance &amp; Management. McGraw-Hill.
                  </li>
                  <li>
                    • <strong>Story DA, Morimatsu H, Bellomo R.</strong> Strong ions, weak acids and base excess: a simplified Fencl-Stewart approach to clinical acid-base disorders. <em>British Journal of Anaesthesia</em>. 2004;92(1):54–60.
                  </li>
                  <li>
                    • <strong>Figge J, Jabor A, Kazda A, Fencl V.</strong> Anion gap and hypoalbuminemia. <em>Critical Care Medicine</em>. 1998;26(11):1807–1810.
                  </li>
                  <li>
                    • <strong>Berend K, de Vries AP, Gans RO.</strong> Physiological approach to assessment of acid-base disturbances. <em>New England Journal of Medicine</em>. 2014;371(15):1434–1445.
                  </li>
                </ul>
                <div className={`text-[11px] pt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Klinik karar destek aracıdır; hastanın hemodinamik muayenesi ve sorumlu hekim değerlendirmesinin yerini tutmaz.
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      {/* En Alt Bölüm: Dipnotlar */}
      <section
        aria-labelledby="abg-footnotes-heading"
        className={`rounded-xl border p-5 space-y-5 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div>
            <h3
              id="abg-footnotes-heading"
              className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
            >
              Dipnotlar: Parametre Tanımları, Klinik Önemi, Normal Aralıklar ve Formüller
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Yatak başı asit-baz ve oksijenasyon değerlendirmesinde kullanılan temel indekslerin fizyolojik özeti
            </p>
          </div>
          <span className={`text-[11px] font-mono ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
            Miller · Morgan &amp; Mikhail · Story (BJA)
          </span>
        </div>

        {/* 1 - 7 Temel Parametreler (AG, Delta Gap ve Delta Oranı Ayrı Kartlarda) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FootnoteCard
            number="1"
            title="Anyon Açığı (AG — Düzeltilmemiş & Albümin Düzeltmeli)"
            normalRange="8–12 mEq/L (K⁺ dahil: 12–16 mEq/L)"
            definition="Plazmada ölçülen ana katyon (Na⁺) ile ana anyonlar (Cl⁻ + HCO₃⁻) arasındaki fark olup ölçülmemiş anyon yükünü (başta albümin, fosfat, laktat, ketonlar) yansıtır."
            significance="Metabolik asidozun altta yatan mekanizmasını ayırır. Hipoalbüminemi AG’yi yapay olarak düşürdüğünden (her 1 g/dL düşüşte ~2,5 mEq/L) yoğun bakım ve cerrahide mutlaka Figge albümin düzeltmeli cAG kullanılmalıdır."
            formula="AG = Na⁺ − (Cl⁻ + HCO₃⁻)  |  cAG (Figge) = AG + 0,25 × (42 − Albümin [g/L])"
            interpretation={[
              { range: '≤ 12 mEq/L', meaning: 'Normal aralık (asidoz varsa hiperkloremik NAGMA).' },
              { range: '13–14 mEq/L', meaning: 'Sınırda değer; albümin düzeltmesi ve laktat/keton kontrolü önerilir.' },
              { range: '> 14 mEq/L', meaning: 'Yüksek Anyon Açıklı Metabolik Asidoz (HAGMA): laktat, keton, üremi, toksinler.' }
            ]}
            isDark={isDark}
          />

          <FootnoteCard
            number="2"
            title="Delta Gap (ΔAG − ΔHCO₃⁻ ve Öngörülen HCO₃⁻)"
            normalRange="−6 ile +6 mEq/L (Öngörülen HCO₃⁻: 22–26 mmol/L)"
            definition="Anyon açığındaki artışın (ΔAG = AG − 12) bikarbonattaki düşüşle (ΔHCO₃⁻ = 24 − HCO₃⁻) 1:1 tamponlanıp tamponlanmadığını fark üzerinden ölçer. Albümin düşükse cAG bazlı hesaplanır."
            significance="Yüksek anyon açıklı asidoz (HAGMA) zemininde gizlenmiş ikinci bir metabolik asit-baz bozukluğunun (ek NAGMA veya ek metabolik alkaloz) varlığını saptar."
            formula="Delta Gap = ΔAG − ΔHCO₃⁻  |  Eşdeğer Öngörülen HCO₃⁻ = HCO₃⁻ + (AG − 12)"
            interpretation={[
              { range: '< −6 mEq/L (Öng. HCO₃⁻ < 22)', meaning: 'HCO₃⁻ beklenenden fazla düşmüş → HAGMA + eşlik eden Normal AG’li Asidoz (NAGMA).' },
              { range: '−6 ile +6 mEq/L (22–26)', meaning: 'Bikarbonat düşüşü AG artışıyla orantılı → Saf HAGMA.' },
              { range: '> +6 mEq/L (Öng. HCO₃⁻ > 26)', meaning: 'HCO₃⁻ beklenenden az düşmüş → HAGMA + eşlik eden Metabolik Alkaloz (veya kronik CO₂ retansiyonu).' }
            ]}
            isDark={isDark}
          />

          <FootnoteCard
            number="3"
            title="Delta Oranı (Delta Ratio = ΔAG / ΔHCO₃⁻)"
            normalRange="1,0–2,0 (HAGMA varlığında yorumlanır)"
            definition="Anyon açığındaki artışın (ΔAG = AG − 12 veya cAG − 12), bikarbonat düşüşüne (ΔHCO₃⁻ = 24 − HCO₃⁻) oranıdır."
            significance="Delta Gap ile aynı fizyolojik ilkeyi oran olarak verir; ancak HAGMA’ya eşlik eden karma metabolik bozuklukların ayırımında klinik eşikleri en yaygın standardize edilen indekstir. (HCO₃⁻ ≥ 24 iken oran hesaplanmaz, gizli alkaloz aranır)."
            formula="Delta Oranı = (AG − 12) ÷ (24 − HCO₃⁻)  |  Albümin Düzeltmeli: (cAG − 12) ÷ (24 − HCO₃⁻)"
            interpretation={[
              { range: '< 0,4', meaning: 'Saf veya baskın Normal Anyon Açıklı (Hiperkloremik) Metabolik Asidoz (NAGMA).' },
              { range: '0,4 – 0,99', meaning: 'HAGMA ve NAGMA bir arada (örn. ishal + laktik asidoz veya salin resüsitasyonu sonrası DKA).' },
              { range: '1,0 – 2,0', meaning: 'Saf Yüksek Anyon Açıklı Metabolik Asidoz (laktik asidoz ~1,6’ya kadar çıkabilir).' },
              { range: '> 2,0', meaning: 'Eşlik eden Metabolik Alkaloz (kusma/diüretik) veya kronik respiratuar asidoz kompansasyonu.' }
            ]}
            isDark={isDark}
          />

          <FootnoteCard
            number="4"
            title="SBE (Standart Baz Fazlası)"
            normalRange="−2 ile +2 mEq/L (Ağır baz açığı: < −10 mEq/L)"
            definition="Ekstraselüler sıvıyı (Hb 5 g/dL varsayımıyla) standart koşullarda (pCO₂ 40 mmHg, 37 °C) pH 7,40’a getirmek için gereken güçlü asit veya baz miktarıdır."
            significance="Akut pCO₂ değişimlerinden (solunumsal tamponlamadan) büyük ölçüde bağımsızdır. Saf metabolik yükü, hemorajik şok derinliğini (ATLS) ve resüsitasyon yanıtını izlemede en güvenilir metabolik göstergedir."
            formula="SBE = 0,93 × [HCO₃⁻ − 24,4 + 14,8 × (pH − 7,40)]"
            interpretation={[
              { range: '< −2 mEq/L', meaning: 'Metabolik asidoz yükü (ATLS: −2/−6 hafif, −6/−10 orta, <−10 ağır şok/asidoz).' },
              { range: '−2 ile +2 mEq/L', meaning: 'Normal metabolik asit-baz dengesi.' },
              { range: '> +2 mEq/L', meaning: 'Metabolik alkaloz veya kronik hiperkapniye ikincil renal kompansasyon.' }
            ]}
            isDark={isDark}
          />

          <FootnoteCard
            number="5"
            title="PaO₂ / FiO₂ Oranı (Horowitz İndeksi)"
            normalRange="400–500 mmHg (Normal akciğer)"
            definition="Arteriyel parsiyel oksijen basıncının (PaO₂) solunan oksijen fraksiyonuna (FiO₂) bölünmesiyle elde edilen alveoler-arteriyel gaz değişim verimliliği indeksidir."
            significance="Farklı FiO₂ düzeylerindeki hastalarda hipoksemi şiddetini standardize eder. PEEP ≥ 5 cmH₂O altında Berlin ARDS sınıflamasının ve ventilatör PEEP/recruitment kararlarının temel ölçütüdür."
            formula="P/F Oranı = PaO₂ (mmHg) ÷ FiO₂ (0,21–1,00)"
            interpretation={[
              { range: '> 300 mmHg', meaning: 'Normal / belirgin oksijenasyon defekti yok (normal fizyolojik aralık 400–500).' },
              { range: '201 – 300 mmHg', meaning: 'Hafif oksijenasyon bozukluğu (PEEP ≥ 5 ile Hafif ARDS).' },
              { range: '101 – 200 mmHg', meaning: 'Orta düzey hipoksemi (PEEP ≥ 5 ile Orta ARDS).' },
              { range: '≤ 100 mmHg', meaning: 'Ağır hipoksemi / refrakter şant (PEEP ≥ 5 ile Ağır ARDS).' }
            ]}
            isDark={isDark}
          />

          <FootnoteCard
            number="6"
            title="A–a Gradyenti (Alveoler–Arteriyel O₂ Farkı)"
            normalRange="Genç erişkin: 5–15 mmHg · Üst sınır ≈ (Yaş / 4) + 4 mmHg"
            definition="Alveol içindeki hesaplanan parsiyel oksijen basıncı (PAO₂) ile arter kanındaki ölçülen PaO₂ arasındaki basınç farkıdır."
            significance="Hipokseminin ekstrapulmoner hipoventilasyondan mı, yoksa intrinsik akciğer patolojisinden mi kaynaklandığını hızla ayırır."
            formula="PAO₂ = FiO₂ × 713 − (PaCO₂ / 0,8)  |  A–a = PAO₂ − PaO₂"
            interpretation={[
              { range: '≤ (Yaş / 4) + 4 mmHg', meaning: 'Hipoksemi varsa neden alveoler hipoventilasyon (opioid, NMB) veya düşük FiO₂’dir.' },
              { range: '> (Yaş / 4) + 4 mmHg', meaning: 'V/Q uyumsuzluğu, sağ-sol şant (atelektazi, emboli, ödem) veya difüzyon bozukluğu.' }
            ]}
            isDark={isDark}
          />

          <FootnoteCard
            number="7"
            title="Oksijen İçeriği (CaO₂)"
            normalRange="16–20 mL O₂/dL (Kadın 16–18 · Erkek 18–20)"
            definition="100 mL (1 dL) arteriyel kanda hemoglobine kimyasal bağlı ve plazmada fiziksel olarak çözünmüş toplam oksijen hacmidir."
            significance="PaO₂ ve SpO₂ normalken dahi derin anemide veya masif kanamada CaO₂ çöker. Kalp debisi ile çarpılarak (DO₂ = CO × CaO₂) gerçek doku oksijen sunumunu ve eritrosit transfüzyon ihtiyacını belirler."
            formula="CaO₂ = (1,34 × Hb [g/dL] × SaO₂ [ondalık]) + (0,0031 × PaO₂ [mmHg])"
            interpretation={[
              { range: '16–20 mL/dL', meaning: 'Normal arteriyel oksijen taşıma kapasitesi.' },
              { range: '< 12 mL/dL', meaning: 'Belirgin azalmış CaO₂ (anemi veya desatürasyon; doku hipoksisini önlemek için DO₂ optimize edilmeli).' }
            ]}
            isDark={isDark}
            className="md:col-span-2"
          />
        </div>

        {/* 8. Stewart SBE Katkıları */}
        <div
          className={`rounded-xl border p-4 space-y-3 ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                8. Stewart SBE Katkıları (Story Basitleştirilmiş Fizikokimyasal Yaklaşım)
              </h4>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Toplam Standart Baz Fazlasını (SBE) dört bağımsız metabolik bileşene ayırır; pozitif (+) değerler alkaloz, negatif (−) değerler asidoz yönündeki etkiyi gösterir.
              </p>
            </div>
            <span className={`text-[11px] font-mono shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Σ Bileşenler = SBE (mEq/L)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FootnoteCard
              number="8a"
              title="Na–Cl (SID / Klor & Serbest Su Etkisi)"
              normalRange="−2 ile +2 mEq/L (Referans: Na⁺ − Cl⁻ ≈ 38 mEq/L)"
              definition="Ana güçlü katyon (Na⁺) ile ana güçlü anyon (Cl⁻) arasındaki farkın normal fizyolojik referans (38 mEq/L) ile sapmasını ifade eder."
              significance="Yüksek hacimli %0,9 NaCl infüzyonuna bağlı hiperkloremik asidozu veya kusma/diüretik kaynaklı hipokloremik alkalozu doğrudan niceler."
              formula="Na–Cl Katkısı = (Na⁺ − Cl⁻) − 38"
              interpretation={[
                { range: '< −2 mEq/L', meaning: 'Hiperkloremik (veya hiponatremik) asidoz yönünde katkı.' },
                { range: '> +2 mEq/L', meaning: 'Hipokloremik (veya hipernatremik) alkaloz yönünde katkı.' }
              ]}
              isDark={isDark}
            />

            <FootnoteCard
              number="8b"
              title="Albümin Etkisi (Zayıf Asit / Atot)"
              normalRange="−2 ile +2 mEq/L (Referans albümin: 42 g/L = 4,2 g/dL)"
              definition="Plazmadaki başlıca uçucu olmayan zayıf asit olan albüminin referans düzeyden sapmasının asit-baz dengesine etkisidir."
              significance="Hipoalbüminemi zayıf asit kaybı yaratarak alkalozlaştırıcı (+) etki yapar; yoğun bakım ve sepsis hastalarında ağır laktik veya hiperkloremik asidozu kısmen maskeleyebilir."
              formula="Albümin Katkısı = 0,25 × (42 − Albümin [g/L])"
              interpretation={[
                { range: '> +2 mEq/L', meaning: 'Hipoalbüminemi kaynaklı alkalozlaştırıcı etki (asidozu maskeler).' },
                { range: '< −2 mEq/L', meaning: 'Hiperalbüminemiye bağlı zayıf asit artışı (asitleştirici etki).' }
              ]}
              isDark={isDark}
            />

            <FootnoteCard
              number="8c"
              title="Laktat Etkisi"
              normalRange="−0,6 ile +0,5 mEq/L (Normal serum laktatı: 0,5–1,6 mmol/L)"
              definition="Güçlü bir organik anyon olan laktatın (pKa ≈ 3,86) bazal 1,0 mmol/L düzeyinin üzerindeki artışının SBE üzerine doğrudan asitleştirici katkısıdır."
              significance="Laktattaki her 1 mmol/L yükseliş SBE’yi yaklaşık 1 mEq/L negatife çeker; doku hipoperfüzyonu, şok ve anaerobik metabolizma yükünü net biçimde ortaya koyar."
              formula="Laktat Katkısı = 1 − Laktat (mmol/L)"
              interpretation={[
                { range: '< −1 mEq/L (Laktat >2)', meaning: 'Belirgin hiperlaktatemi / laktik asidoz yükü; doku perfüzyonunu değerlendirin.' }
              ]}
              isDark={isDark}
            />

            <FootnoteCard
              number="8d"
              title="Ölçülemeyen İyon (SIG Benzeri Katkı)"
              normalRange="−2 ile +2 mEq/L (Klinik anlamlı yük: < −5 mEq/L)"
              definition="Ölçülen SBE içinden Na–Cl, albümin ve laktat etkileri çıkarıldıktan sonra geriye kalan açıklanamayan güçlü iyon yüküdür."
              significance="Belirgin negatif değerler keton cisimleri, üremik anyonlar veya toksik alkol metabolitlerinin varlığını güçlü biçimde işaret eder."
              formula="Ölçülemeyen İyon = SBE − [(Na⁺ − Cl⁻ − 38) + 0,25×(42 − Alb g/L) + (1 − Laktat)]"
              interpretation={[
                { range: '< −5 mEq/L', meaning: 'Yüksek olasılıkla ölçülemeyen anyon (keton, üremi, salisilat, metanol/etilen glikol).' }
              ]}
              isDark={isDark}
            />
          </div>
        </div>

        {/* 9 - 10. Serum Osmolalitesi ve Osmolal Gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FootnoteCard
            number="9"
            title="Serum Osmolalitesi (Hesaplanan & Ölçülen)"
            normalRange="275–295 mOsm/kg (Efektif tonisite: 275–290)"
            definition="Plazma çözücü kilogramı başına düşen ozmotik aktif partikül yüküdür; başlıca bileşenleri Na⁺ (ve eşlik eden anyonlar), glukoz ve üredir."
            significance="Hipo/hipertonik bozuklukları ve DKA/HHS hiperosmolar durumları izler. Üre hücre zarını serbestçe geçtiği için efektif tonisite hesabında (2×Na⁺ + Glukoz/18) yer almaz; ancak laboratuvarda ölçülen osmolaliteyle karşılaştırmak için toplam hesaplanan osmolaliteye mutlaka eklenir."
            formula="Osm = 2×Na⁺ + (Glukoz ÷ 18) + (BUN ÷ 2,8)  |  Üre ile: (Üre ÷ 6) [BUN = Üre ÷ 2,14]"
            interpretation={[
              { range: '< 275 mOsm/kg', meaning: 'Hipoosmolalite (SIADH, su intoksikasyonu, gerçek hipotonik hiponatremi).' },
              { range: '275–295 mOsm/kg', meaning: 'Normal fizyolojik serum osmolalitesi.' },
              { range: '> 295 mOsm/kg', meaning: 'Hiperosmolalite (hipernatremi, DKA/HHS, üremi, mannitol/toksik alkol; >320 HHS eşiği).' }
            ]}
            isDark={isDark}
          />

          <FootnoteCard
            number="10"
            title="Osmolal Gap (Osmolal Açık)"
            normalRange="< 10 mOsm/kg (−10 ile +10 mOsm/kg)"
            definition="Ozmometre ile ölçülen gerçek serum osmolalitesinden formül ile hesaplanan serum osmolalitesinin çıkarılmasıyla elde edilen farktır."
            significance="Nedeni açıklanamayan yüksek anyon açıklı metabolik asidozda (HAGMA) düşük molekül ağırlıklı, ölçülemeyen ozmotik aktif maddelerin (metanol, etilen glikol, izopropanol, etanol, propilen glikol, mannitol) taramasında kullanılır. Toksik alkoller organik asitlere metabolize oldukça Osmolal Gap düşerken Anyon Açığı yükselir."
            formula="Osmolal Gap = Ölçülen Serum Osmolalitesi − Hesaplanan Osmolalite"
            interpretation={[
              { range: '≤ 10 mOsm/kg', meaning: 'Fizyolojik sınırda (ancak geç başvuran toksik alkol zehirlenmesini tek başına dışlamaz).' },
              { range: '> 10 mOsm/kg', meaning: 'Ölçülemeyen ozmol şüphesi — etanol düzeyini değerlendirin; açıklamıyorsa toksik alkol/mannitol araştırın.' },
              { range: '> 25 mOsm/kg', meaning: 'Metanol, etilen glikol, izopropanol veya yüksek doz mannitol açısından yüksek klinik olasılık.' }
            ]}
            isDark={isDark}
          />
        </div>
      </section>
    </div>
  );
};

interface FootnoteCardProps {
  number: string;
  title: string;
  normalRange: string;
  definition: string;
  significance: string;
  formula: string;
  interpretation?: { range: string; meaning: string }[];
  isDark: boolean;
  className?: string;
}

const FootnoteCard: React.FC<FootnoteCardProps> = ({
  number,
  title,
  normalRange,
  definition,
  significance,
  formula,
  interpretation,
  isDark,
  className = ''
}) => {
  return (
    <article
      className={`rounded-xl border p-4 space-y-2.5 flex flex-col justify-between ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      } ${className}`}
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {number}. {title}
          </h4>
          <span
            className={`text-[11px] font-mono tabular-nums font-semibold ${
              isDark ? 'text-teal-400' : 'text-teal-700'
            }`}
          >
            Normal: {normalRange}
          </span>
        </div>

        <div className={`text-xs leading-relaxed space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <p>
            <strong className={isDark ? 'text-slate-100' : 'text-slate-900'}>Tanım:</strong> {definition}
          </p>
          <p>
            <strong className={isDark ? 'text-slate-100' : 'text-slate-900'}>Klinik Önem:</strong> {significance}
          </p>
        </div>

        {interpretation && interpretation.length > 0 && (
          <div
            className={`rounded-lg border p-2.5 space-y-1 text-[11px] leading-snug ${
              isDark ? 'bg-slate-950/50 border-slate-800/80 text-slate-300' : 'bg-slate-50/90 border-slate-200/80 text-slate-700'
            }`}
          >
            <div className={`font-semibold text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Referans Eşikleri &amp; Yorum:
            </div>
            {interpretation.map((item) => (
              <div key={item.range} className="flex items-baseline gap-1.5">
                <span className={`font-mono tabular-nums font-semibold shrink-0 ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
                  {item.range}:
                </span>
                <span>{item.meaning}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-mono tabular-nums ${
          isDark
            ? 'bg-slate-950/70 border-slate-800 text-slate-200'
            : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}
      >
        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Hesaplama: </span>
        {formula}
      </div>
    </article>
  );
};

interface MetricTileProps {
  label: string;
  value: string;
  sub?: string;
  tone: SeverityTone;
  isDark: boolean;
}

const MetricTile: React.FC<MetricTileProps> = ({ label, value, sub, tone, isDark }) => {
  const borderClass =
    tone === 'bad'
      ? isDark
        ? 'border-rose-800/70 bg-rose-950/25'
        : 'border-rose-200 bg-rose-50/60'
      : tone === 'warn'
        ? isDark
          ? 'border-amber-800/70 bg-amber-950/20'
          : 'border-amber-200 bg-amber-50/60'
        : isDark
          ? 'border-slate-800 bg-slate-900'
          : 'border-slate-200 bg-white';

  const valClass =
    tone === 'bad'
      ? isDark
        ? 'text-rose-300'
        : 'text-rose-700'
      : tone === 'warn'
        ? isDark
          ? 'text-amber-300'
          : 'text-amber-800'
        : isDark
          ? 'text-white'
          : 'text-slate-900';

  return (
    <div className={`rounded-xl border p-3 ${borderClass}`}>
      <div className={`text-[11px] font-medium truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {label}
      </div>
      <div className={`text-lg font-bold font-mono tabular-nums mt-0.5 ${valClass}`}>{value}</div>
      {sub && (
        <div className={`text-[10.5px] font-mono tabular-nums mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {sub}
        </div>
      )}
    </div>
  );
};
