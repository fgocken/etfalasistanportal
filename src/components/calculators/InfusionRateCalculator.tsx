import React, { useState, useEffect, useMemo } from 'react';
import { 
  Syringe, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRightLeft, 
  Info, 
  Copy, 
  Check, 
  Timer,
  Sparkles,
  Bookmark,
  BookmarkPlus,
  Trash2,
  X,
  Plus
} from 'lucide-react';

interface InfusionRateCalculatorProps {
  isDark: boolean;
}

// Dose Units
export type DoseUnit = 'mcg' | 'mg' | 'g';

// Infusion Rate Units
export type RateUnit = 
  | 'ml/saat'
  | 'ml/dk'
  | 'mg/saat'
  | 'mg/dk'
  | 'mcg/saat'
  | 'mcg/dk'
  | 'mcg/kg/dk'
  | 'mcg/kg/saat'
  | 'mg/kg/saat'
  | 'mg/kg/dk';

/**
 * Turkish Number Formatter
 * Binlikler nokta (.), ondalıklar virgül (,) ile ayrılır. Örn: 1.423,52
 */
export function formatTurkishNumber(
  value: number | undefined | null, 
  minDecimals = 0, 
  maxDecimals = 2
): string {
  if (value === undefined || value === null || isNaN(value) || !isFinite(value)) {
    return '0';
  }
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  }).format(value);
}

/**
 * Turkish Number Parser
 * Parses strings like '1.423,52' or '1423,52' or '1423.52'
 */
export function parseTurkishNumber(input: string): number {
  if (!input) return 0;
  const trimmed = input.trim();
  const standardized = trimmed.replace(/\./g, '').replace(/,/g, '.');
  const num = parseFloat(standardized);
  return isNaN(num) ? 0 : num;
}

export interface UserSavedTemplate {
  id: string;
  name: string;
  dose: string;
  doseUnit: DoseUnit;
  solventMl: string;
  enableWeight: boolean;
  weightKg: string;
  syringeVolumeMl: string;
  hasRemainingVolume: boolean;
  remainingVolumeMl: string;
  inputRate: string;
  activeUnit: RateUnit;
  createdAt: number;
}

export const InfusionRateCalculator: React.FC<InfusionRateCalculatorProps> = ({ isDark }) => {
  // 1. Drug Preparation Inputs
  const [dose, setDose] = useState<string>('4');
  const [doseUnit, setDoseUnit] = useState<DoseUnit>('mg');
  const [solventMl, setSolventMl] = useState<string>('50');
  
  // Weight dependency
  const [enableWeight, setEnableWeight] = useState<boolean>(true);
  const [weightKg, setWeightKg] = useState<string>('70');

  // 2. Pump / Syringe Preparation Inputs
  const [syringeVolumeMl, setSyringeVolumeMl] = useState<string>('50');
  const [hasRemainingVolume, setHasRemainingVolume] = useState<boolean>(false);
  const [remainingVolumeMl, setRemainingVolumeMl] = useState<string>('35');

  // 3. Active Rate Input (User can input any of the units)
  const [inputRate, setInputRate] = useState<string>('0,05');
  const [activeUnit, setActiveUnit] = useState<RateUnit>('mcg/kg/dk');

  // 4. Timer State
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(0);
  const [initialCountdownSeconds, setInitialCountdownSeconds] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 5. User Custom Saved Presets / Templates (Persisted in localStorage)
  const [savedTemplates, setSavedTemplates] = useState<UserSavedTemplate[]>(() => {
    try {
      const raw = localStorage.getItem('etfal_infusion_user_templates');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [newTemplateName, setNewTemplateName] = useState<string>('');
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('etfal_infusion_user_templates', JSON.stringify(savedTemplates));
    } catch (e) {
      console.error(e);
    }
  }, [savedTemplates]);

  const handleOpenSaveModal = () => {
    const defaultName = `${dose} ${doseUnit === 'g' ? 'gram' : doseUnit} / ${solventMl} mL (${inputRate} ${activeUnit})`;
    setNewTemplateName(defaultName);
    setShowSaveModal(true);
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTemplateName.trim();
    if (!trimmed) return;
    const newTpl: UserSavedTemplate = {
      id: Date.now().toString(),
      name: trimmed,
      dose,
      doseUnit,
      solventMl,
      enableWeight,
      weightKg,
      syringeVolumeMl,
      hasRemainingVolume,
      remainingVolumeMl,
      inputRate,
      activeUnit,
      createdAt: Date.now()
    };
    setSavedTemplates(prev => [newTpl, ...prev]);
    setActiveTemplateId(newTpl.id);
    setShowSaveModal(false);
    setFeedbackMessage(`"${trimmed}" şablonu kaydedildi`);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleLoadTemplate = (tpl: UserSavedTemplate) => {
    setDose(tpl.dose);
    setDoseUnit(tpl.doseUnit);
    setSolventMl(tpl.solventMl);
    setEnableWeight(tpl.enableWeight);
    setWeightKg(tpl.weightKg);
    setSyringeVolumeMl(tpl.syringeVolumeMl);
    setHasRemainingVolume(tpl.hasRemainingVolume);
    setRemainingVolumeMl(tpl.remainingVolumeMl);
    setInputRate(tpl.inputRate);
    setActiveUnit(tpl.activeUnit);
    setActiveTemplateId(tpl.id);
    setFeedbackMessage(`"${tpl.name}" şablonu yüklendi`);
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  const handleDeleteTemplate = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedTemplates(prev => prev.filter(t => t.id !== id));
    if (activeTemplateId === id) setActiveTemplateId(null);
    setFeedbackMessage(`"${name}" şablonu silindi`);
    setTimeout(() => setFeedbackMessage(null), 2500);
  };

  // Numeric values
  const doseNum = parseTurkishNumber(dose);
  const solventNum = parseTurkishNumber(solventMl);
  const weightNum = enableWeight ? parseTurkishNumber(weightKg) : 0;
  const syringeVolNum = parseTurkishNumber(syringeVolumeMl);
  const remainingVolNum = hasRemainingVolume ? parseTurkishNumber(remainingVolumeMl) : 0;
  const inputRateNum = parseTurkishNumber(inputRate);

  // Effective volume for finish estimation
  const effectiveVolume = (hasRemainingVolume && remainingVolNum > 0) 
    ? remainingVolNum 
    : (syringeVolNum > 0 ? syringeVolNum : solventNum);

  // Total Dose in mcg & mg
  const totalDoseMcg = useMemo(() => {
    if (doseUnit === 'mcg') return doseNum;
    if (doseUnit === 'mg') return doseNum * 1000;
    if (doseUnit === 'g') return doseNum * 1000000;
    return 0;
  }, [doseNum, doseUnit]);

  const totalDoseMg = totalDoseMcg / 1000;

  // Concentrations
  const concMcgPerMl = solventNum > 0 ? totalDoseMcg / solventNum : 0;
  const concMgPerMl = solventNum > 0 ? totalDoseMg / solventNum : 0;

  // Canonical Rate: mL/saat (mlPerHour)
  const canonicalMlPerHour = useMemo(() => {
    if (inputRateNum <= 0) return 0;

    switch (activeUnit) {
      case 'ml/saat':
        return inputRateNum;
      case 'ml/dk':
        return inputRateNum * 60;
      case 'mg/saat':
        return concMgPerMl > 0 ? inputRateNum / concMgPerMl : 0;
      case 'mg/dk':
        return concMgPerMl > 0 ? (inputRateNum * 60) / concMgPerMl : 0;
      case 'mcg/saat':
        return concMcgPerMl > 0 ? inputRateNum / concMcgPerMl : 0;
      case 'mcg/dk':
        return concMcgPerMl > 0 ? (inputRateNum * 60) / concMcgPerMl : 0;
      case 'mcg/kg/dk':
        if (weightNum <= 0 || concMcgPerMl <= 0) return 0;
        return (inputRateNum * weightNum * 60) / concMcgPerMl;
      case 'mcg/kg/saat':
        if (weightNum <= 0 || concMcgPerMl <= 0) return 0;
        return (inputRateNum * weightNum) / concMcgPerMl;
      case 'mg/kg/saat':
        if (weightNum <= 0 || concMgPerMl <= 0) return 0;
        return (inputRateNum * weightNum) / concMgPerMl;
      case 'mg/kg/dk':
        if (weightNum <= 0 || concMgPerMl <= 0) return 0;
        return (inputRateNum * weightNum * 60) / concMgPerMl;
      default:
        return 0;
    }
  }, [inputRateNum, activeUnit, concMgPerMl, concMcgPerMl, weightNum]);

  // Derived Rates for ALL 10 units
  const convertedRates = useMemo(() => {
    const mlPerHour = canonicalMlPerHour;
    const mlPerMin = mlPerHour / 60;
    const mgPerHour = mlPerHour * concMgPerMl;
    const mgPerMin = mgPerHour / 60;
    const mcgPerHour = mlPerHour * concMcgPerMl;
    const mcgPerMin = mcgPerHour / 60;

    // Weight dependent
    const hasValidWeight = enableWeight && weightNum > 0;
    const mcgPerKgPerMin = hasValidWeight ? mcgPerMin / weightNum : 0;
    const mcgPerKgPerHour = hasValidWeight ? mcgPerHour / weightNum : 0;
    const mgPerKgPerHour = hasValidWeight ? mgPerHour / weightNum : 0;
    const mgPerKgPerMin = hasValidWeight ? mgPerMin / weightNum : 0;

    return {
      'ml/saat': mlPerHour,
      'ml/dk': mlPerMin,
      'mg/saat': mgPerHour,
      'mg/dk': mgPerMin,
      'mcg/saat': mcgPerHour,
      'mcg/dk': mcgPerMin,
      'mcg/kg/dk': mcgPerKgPerMin,
      'mcg/kg/saat': mcgPerKgPerHour,
      'mg/kg/saat': mgPerKgPerHour,
      'mg/kg/dk': mgPerKgPerMin,
      hasValidWeight
    };
  }, [canonicalMlPerHour, concMgPerMl, concMcgPerMl, enableWeight, weightNum]);

  // Calculated finish duration
  const finishCalculation = useMemo(() => {
    if (canonicalMlPerHour <= 0 || effectiveVolume <= 0) {
      return { totalHours: 0, totalSeconds: 0, finishDateStr: '—' };
    }
    const totalHours = effectiveVolume / canonicalMlPerHour;
    const totalSeconds = Math.round(totalHours * 3600);
    
    // Future Date
    const now = new Date();
    const finishDate = new Date(now.getTime() + totalSeconds * 1000);
    const finishDateStr = finishDate.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });

    return {
      totalHours,
      totalSeconds,
      finishDateStr
    };
  }, [canonicalMlPerHour, effectiveVolume]);

  // Sync countdown seconds when calculation changes or timer is not actively running
  useEffect(() => {
    if (!timerRunning) {
      setCountdownSeconds(finishCalculation.totalSeconds);
      setInitialCountdownSeconds(finishCalculation.totalSeconds);
    }
  }, [finishCalculation.totalSeconds, timerRunning]);

  // Countdown timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && countdownSeconds > 0) {
      interval = setInterval(() => {
        setCountdownSeconds(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, countdownSeconds]);

  // Timer reset handler
  const handleResetTimer = () => {
    setTimerRunning(false);
    setCountdownSeconds(finishCalculation.totalSeconds);
    setInitialCountdownSeconds(finishCalculation.totalSeconds);
  };

  // Format seconds to Saat:Dakika:Saniye
  const formatCountdownTime = (seconds: number) => {
    if (seconds <= 0) return '00:00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper to switch active unit and convert input value
  const handleSelectActiveUnit = (unit: RateUnit) => {
    if (unit === activeUnit) return;
    const currentRateVal = convertedRates[unit];
    setActiveUnit(unit);
    // Format to Turkish representation with appropriate decimals
    if (currentRateVal > 0) {
      const decimals = (unit === 'mcg/kg/dk' || unit === 'mg/dk' || unit === 'ml/dk') ? 3 : 2;
      setInputRate(formatTurkishNumber(currentRateVal, 0, decimals));
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Percentage of timer completed
  const progressPercent = useMemo(() => {
    if (initialCountdownSeconds <= 0) return 0;
    const elapsed = initialCountdownSeconds - countdownSeconds;
    return Math.min(100, Math.max(0, (elapsed / initialCountdownSeconds) * 100));
  }, [initialCountdownSeconds, countdownSeconds]);

  return (
    <div className="space-y-6">
      {/* Top Banner / Tool Header */}
      <div className={`p-5 rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700'
            }`}>
              <Syringe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  İnfüzyon Hızı Çevirici/Hesaplayıcı
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  Klinik Araç
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                İlaç konsantrasyonu, 11 birimde eş zamanlı hız çevrimi ve canlı geri sayımlı infüzyon bitiş süresi.
              </p>
            </div>
          </div>

          {/* Action Buttons: Save Template & Format Badge */}
          <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
            <button
              type="button"
              onClick={handleOpenSaveModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border shadow-xs ${
                isDark
                  ? 'bg-teal-500/20 border-teal-500/40 text-teal-300 hover:bg-teal-500/30'
                  : 'bg-teal-50 border-teal-300 text-teal-800 hover:bg-teal-100'
              }`}
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-teal-500" />
              <span>Ayarları Şablon Olarak Kaydet</span>
            </button>

            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border ${
              isDark ? 'bg-slate-800/80 border-slate-700 text-teal-300' : 'bg-slate-50 border-slate-200 text-teal-800'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span>Format: 1.423,52</span>
            </div>
          </div>
        </div>

        {/* Temporary Feedback Notification */}
        {feedbackMessage && (
          <div className="mt-3 p-2.5 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-teal-500 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Inline Save Template Form Modal / Drawer */}
        {showSaveModal && (
          <form 
            onSubmit={handleSaveTemplate}
            className={`mt-4 p-4 rounded-xl border space-y-3 transition-all ${
              isDark ? 'bg-slate-800/80 border-teal-500/40' : 'bg-teal-50/70 border-teal-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-teal-300' : 'text-teal-900'}`}>
                Mevcut Ayarları Şablon Olarak Kaydet
              </span>
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <input
                type="text"
                autoFocus
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="Şablon adı giriniz (örn: Noradrenalin 4mg/50mL Standart)"
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={!newTemplateName.trim()}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Vazgeç
                </button>
              </div>
            </div>

            <div className={`flex items-center gap-2 text-[11px] font-mono pt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <span>Kaydedilecek:</span>
              <span className={`px-2 py-0.5 rounded font-medium ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-800 border border-slate-200'}`}>
                {dose} {doseUnit === 'g' ? 'gram' : doseUnit}
              </span>
              <span>·</span>
              <span className={`px-2 py-0.5 rounded font-medium ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-800 border border-slate-200'}`}>
                {solventMl} mL
              </span>
              <span>·</span>
              <span className={`px-2 py-0.5 rounded font-medium ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-800 border border-slate-200'}`}>
                {inputRate} {activeUnit}
              </span>
              {enableWeight && (
                <>
                  <span>·</span>
                  <span className={`px-2 py-0.5 rounded font-medium ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-800 border border-slate-200'}`}>
                    {weightKg} kg
                  </span>
                </>
              )}
            </div>
          </form>
        )}

        {/* User Saved Templates List */}
        {savedTemplates.length > 0 ? (
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <Bookmark className="w-3.5 h-3.5 text-teal-500" />
                <span>Kayıtlı Şablonlarınız ({savedTemplates.length}):</span>
              </span>
              <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Tek tıkla tüm ayarları yükler · Tarayıcınızda kalıcı saklanır
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {savedTemplates.map((tpl) => {
                const isActive = activeTemplateId === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => handleLoadTemplate(tpl)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all shrink-0 ${
                      isActive
                        ? isDark
                          ? 'bg-teal-500/20 border-teal-400 text-teal-200 font-semibold ring-1 ring-teal-500/30'
                          : 'bg-teal-50 border-teal-500 text-teal-900 font-semibold ring-1 ring-teal-500/20'
                        : isDark
                          ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs leading-tight">
                        {tpl.name}
                      </span>
                      <span className="text-[10px] opacity-75 font-mono">
                        {tpl.dose}{tpl.doseUnit === 'g' ? 'g' : tpl.doseUnit} · {tpl.solventMl}mL · {tpl.inputRate} {tpl.activeUnit}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleDeleteTemplate(tpl.id, tpl.name, e)}
                      title="Şablonu Sil"
                      className="opacity-40 group-hover:opacity-100 hover:text-rose-500 transition-opacity p-0.5 rounded cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Sık kullandığınız ilaç, çözücü ve hız ayarlarını tekrar tekrar yazmamak için sağ üstteki butondan şablon olarak kaydedebilirsiniz.</span>
          </div>
        )}
      </div>

      {/* Main Grid: Inputs (Left) and Results / Converter / Timer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Section 1: İlaç Hazırlığı & Hasta Kilosu */}
          <div className={`p-5 rounded-xl border space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between border-b pb-2.5 dark:border-slate-800 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-500/10 text-teal-500 text-xs font-bold">1</span>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  İlaç Dozu &amp; Çözücü Hacmi
                </h4>
              </div>
            </div>

            {/* İlaç Dozu & Birimi */}
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                İlaç Dozu (Flakon / Ampul Miktarı)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  placeholder="Örn: 4 veya 250"
                  className={`flex-1 px-3 py-2 text-sm font-mono font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                {/* Unit Selector */}
                <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border dark:border-slate-700 border-slate-200">
                  {(['mcg', 'mg', 'g'] as DoseUnit[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setDoseUnit(u)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                        doseUnit === u
                          ? isDark
                            ? 'bg-teal-500 text-slate-950 font-bold shadow-xs'
                            : 'bg-teal-600 text-white font-bold shadow-xs'
                          : isDark
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {u === 'g' ? 'gram' : u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Çözücü Mililitresi (mL) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Çözücü Hacmi (Toplam Sıvı)
                </label>
                <div className="flex items-center gap-1">
                  {['50', '100', '250', '500'].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => {
                        setSolventMl(vol);
                        setSyringeVolumeMl(vol);
                      }}
                      className={`text-[10px] px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                        solventMl === vol 
                          ? 'bg-teal-500/20 text-teal-400 font-bold' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {vol} mL
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={solventMl}
                  onChange={(e) => setSolventMl(e.target.value)}
                  placeholder="50"
                  className={`w-full px-3 py-2 pr-12 text-sm font-mono font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                  mL
                </span>
              </div>
            </div>

            {/* Hasta Kilosu & Kilo Bağımlı Seçeneği */}
            <div className={`p-3.5 rounded-lg border space-y-2.5 ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={enableWeight}
                    onChange={(e) => setEnableWeight(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 cursor-pointer"
                  />
                  <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    Hasta Kilosu (Kilo Bağımlı Hesaplama)
                  </span>
                </label>
                <span className={`text-[10px] font-mono ${
                  enableWeight ? 'text-teal-500 font-bold' : 'text-slate-400'
                }`}>
                  {enableWeight ? 'Aktif' : 'Pasif'}
                </span>
              </div>

              {enableWeight && (
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="70"
                      className={`w-full px-3 py-2 pr-12 text-sm font-mono font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 tabular-nums ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                      kg
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Hesaplanmış İlaç Konsantrasyonu Özeti */}
            <div className={`p-3 rounded-lg border flex items-center justify-between transition-colors ${
              isDark 
                ? 'bg-teal-950/30 border-teal-800/40 text-teal-200' 
                : 'bg-teal-50/70 border-teal-200 text-teal-900'
            }`}>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Hesaplanan Konsantrasyon
                </div>
                <div className="text-sm font-mono font-bold mt-0.5 tabular-nums">
                  {formatTurkishNumber(concMcgPerMl, 0, 2)} <span className="text-xs font-normal">mcg/mL</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Alternatif Birim
                </div>
                <div className="text-sm font-mono font-bold mt-0.5 tabular-nums">
                  {formatTurkishNumber(concMgPerMl, 0, 3)} <span className="text-xs font-normal">mg/mL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Pompa / Enjektör Hacmi & Kalan Hacim */}
          <div className={`p-5 rounded-xl border space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between border-b pb-2.5 dark:border-slate-800 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-500 text-xs font-bold">2</span>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Enjektör &amp; Kalan Solüsyon Hacmi
                </h4>
              </div>
            </div>

            {/* Çekilen İlaç Solüsyonu Hacmi */}
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Enjektöre / Pompaya Çekilen Solüsyon Hacmi
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={syringeVolumeMl}
                  onChange={(e) => setSyringeVolumeMl(e.target.value)}
                  placeholder="50"
                  className={`w-full px-3 py-2 pr-12 text-sm font-mono font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                  mL
                </span>
              </div>
            </div>

            {/* Kalan Hacim (Opsiyonel) */}
            <div className={`p-3.5 rounded-lg border space-y-2.5 ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasRemainingVolume}
                    onChange={(e) => setHasRemainingVolume(e.target.checked)}
                    className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500 cursor-pointer"
                  />
                  <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    Anlık Kalan Hacim Belirt (Opsiyonel)
                  </span>
                </label>
                <span className={`text-[10px] font-mono ${
                  hasRemainingVolume ? 'text-cyan-500 font-bold' : 'text-slate-400'
                }`}>
                  {hasRemainingVolume ? 'Özel Takip' : 'Tam Hacim'}
                </span>
              </div>

              {hasRemainingVolume ? (
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      value={remainingVolumeMl}
                      onChange={(e) => setRemainingVolumeMl(e.target.value)}
                      placeholder="35"
                      className={`w-full px-3 py-2 pr-12 text-sm font-mono font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 tabular-nums ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 pointer-events-none">
                      mL
                    </span>
                  </div>
                  <p className={`text-[10px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Geri sayım ve tahmini bitiş süresi bu kalan hacme göre hesaplanır.
                  </p>
                </div>
              ) : (
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Kalan hacim girilmediğinde, enjektöre çekilen toplam hacim ({syringeVolumeMl || '0'} mL) üzerinden bitiş süresi hesaplanır.
                </p>
              )}
            </div>
          </div>

          {/* Section 3: Hedef İnfüzyon Hızı Girişi */}
          <div className={`p-5 rounded-xl border space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`flex items-center justify-between border-b pb-2.5 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold">3</span>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  İnfüzyon Hızı Girişi
                </h4>
              </div>
              <span className={`text-[10px] font-mono font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                Herhangi bir birimde girilebilir
              </span>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Hedef Hız Değeri
              </label>
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="text"
                  value={inputRate}
                  onChange={(e) => setInputRate(e.target.value)}
                  placeholder="0,05"
                  className={`flex-1 px-3.5 py-2.5 text-base font-mono font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-emerald-300' : 'bg-white border-slate-300 text-emerald-900'
                  }`}
                />
                
                {/* Active Unit Select without commentaries */}
                <select
                  value={activeUnit}
                  onChange={(e) => handleSelectActiveUnit(e.target.value as RateUnit)}
                  className={`px-3 py-2.5 text-xs font-semibold rounded-lg border font-mono cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-slate-100' 
                      : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="mcg/kg/dk">mcg/kg/dk</option>
                  <option value="ml/saat">mL/saat</option>
                  <option value="mg/saat">mg/saat</option>
                  <option value="mcg/dk">mcg/dk</option>
                  <option value="mg/kg/saat">mg/kg/saat</option>
                  <option value="mcg/kg/saat">mcg/kg/saat</option>
                  <option value="mg/kg/dk">mg/kg/dk</option>
                  <option value="mg/dk">mg/dk</option>
                  <option value="ml/dk">mL/dk</option>
                  <option value="mcg/saat">mcg/saat</option>
                </select>
              </div>
              <p className={`text-[10px] mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Değeri değiştirdiğinizde veya sağdaki tablodan herhangi bir birime tıkladığınızda tüm hızlar anında güncellenir.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Conversion Matrix (11 Units) + Live Countdown Timer (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Card: Live Pump Status & Countdown Timer */}
          <div className={`p-5 rounded-xl border relative overflow-hidden transition-all ${
            isDark 
              ? 'bg-slate-900/90 border-slate-800 ring-1 ring-teal-500/20' 
              : 'bg-white border-slate-200 shadow-sm ring-1 ring-teal-500/10'
          }`}>
            {/* Top Bar: Status */}
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800 border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${
                  timerRunning 
                    ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' 
                    : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Timer className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Tahmini İnfüzyon Bitiş Süresi &amp; Canlı Sayaç
                  </h4>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Hesaplanan Hacim: <strong>{formatTurkishNumber(effectiveVolume, 0, 1)} mL</strong> · Pompa Hızı: <strong>{formatTurkishNumber(canonicalMlPerHour, 1, 2)} mL/saat</strong>
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5">
                {canonicalMlPerHour > 0 ? (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                    timerRunning
                      ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${timerRunning ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                    {timerRunning ? 'İnfüzyon Akıyor' : 'Beklemede'}
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-slate-400">
                    Hız Belirtiniz
                  </span>
                )}
              </div>
            </div>

            {/* Big Countdown Display */}
            <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                  Kalan Süre (Saat : Dakika : Saniye)
                </div>
                <div className={`text-4xl sm:text-5xl font-mono font-black tracking-tight tabular-nums ${
                  countdownSeconds === 0 && initialCountdownSeconds > 0
                    ? 'text-rose-500 animate-bounce'
                    : timerRunning
                      ? isDark ? 'text-teal-300' : 'text-teal-600'
                      : isDark ? 'text-slate-200' : 'text-slate-900'
                }`}>
                  {formatCountdownTime(countdownSeconds)}
                </div>

                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className={`flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                    Tahmini Bitiş Saati: <strong className={`font-mono ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{finishCalculation.finishDateStr}</strong>
                  </span>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    ({formatTurkishNumber(finishCalculation.totalHours, 1, 2)} saat)
                  </span>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex sm:flex-col items-center gap-2 self-stretch sm:self-auto justify-end">
                <button
                  type="button"
                  onClick={() => setTimerRunning(!timerRunning)}
                  disabled={canonicalMlPerHour <= 0 || countdownSeconds <= 0}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    timerRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
                      : 'bg-teal-600 hover:bg-teal-500 text-white font-bold'
                  }`}
                >
                  {timerRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Duraklat</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Sayacı Başlat</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResetTimer}
                  className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Sıfırla</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>Tamamlanan: %{formatTurkishNumber(progressPercent, 0, 1)}</span>
                <span>Kalan: %{formatTurkishNumber(100 - progressPercent, 0, 1)}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-teal-500 to-cyan-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Section: 11 Units Conversion Matrix (Clean without comments) */}
          <div className={`p-5 rounded-xl border space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 dark:border-slate-800 border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Tüm Birimler Arası Otomatik Hız Dönüşümü
                  </h4>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Birbirine dönüştürülen hız birimleri (Tıklayarak hedef birim yapabilirsiniz)
                  </p>
                </div>
              </div>

              {/* Status Note on Weight */}
              {!enableWeight && (
                <div className="text-[11px] px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  Kilo bağımlı birimler için kilo giriniz
                </div>
              )}
            </div>

            {/* Rate Conversion Grid - Clean, No Comments or Extra Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* 1. ml/saat */}
              <div 
                onClick={() => handleSelectActiveUnit('ml/saat')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'ml/saat'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
                    mL/saat
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['ml/saat'], 1, 2), 'ml/saat');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-teal-300' : 'text-slate-500 hover:text-teal-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'ml/saat' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {formatTurkishNumber(convertedRates['ml/saat'], 1, 2)}
                </div>
              </div>

              {/* 2. mcg/kg/dk */}
              <div 
                onClick={() => handleSelectActiveUnit('mcg/kg/dk')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'mcg/kg/dk'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-800'}`}>
                    mcg/kg/dk
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['mcg/kg/dk'], 2, 4), 'mcg/kg/dk');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-cyan-300' : 'text-slate-500 hover:text-cyan-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'mcg/kg/dk' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {enableWeight && weightNum > 0 ? (
                    formatTurkishNumber(convertedRates['mcg/kg/dk'], 2, 4)
                  ) : (
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Kilo Giriniz</span>
                  )}
                </div>
              </div>

              {/* 3. mg/saat */}
              <div 
                onClick={() => handleSelectActiveUnit('mg/saat')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'mg/saat'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>mg/saat</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['mg/saat'], 2, 3), 'mg/saat');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-teal-300' : 'text-slate-500 hover:text-teal-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'mg/saat' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {formatTurkishNumber(convertedRates['mg/saat'], 2, 3)}
                </div>
              </div>

              {/* 4. mcg/dk */}
              <div 
                onClick={() => handleSelectActiveUnit('mcg/dk')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'mcg/dk'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>mcg/dk</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['mcg/dk'], 1, 3), 'mcg/dk');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-teal-300' : 'text-slate-500 hover:text-teal-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'mcg/dk' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {formatTurkishNumber(convertedRates['mcg/dk'], 1, 3)}
                </div>
              </div>

              {/* 5. mg/kg/saat */}
              <div 
                onClick={() => handleSelectActiveUnit('mg/kg/saat')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'mg/kg/saat'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>mg/kg/saat</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['mg/kg/saat'], 2, 4), 'mg/kg/saat');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-teal-300' : 'text-slate-500 hover:text-teal-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'mg/kg/saat' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {enableWeight && weightNum > 0 ? (
                    formatTurkishNumber(convertedRates['mg/kg/saat'], 2, 4)
                  ) : (
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Kilo Giriniz</span>
                  )}
                </div>
              </div>

              {/* 6. mcg/kg/saat */}
              <div 
                onClick={() => handleSelectActiveUnit('mcg/kg/saat')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'mcg/kg/saat'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>mcg/kg/saat</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['mcg/kg/saat'], 2, 3), 'mcg/kg/saat');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-teal-300' : 'text-slate-500 hover:text-teal-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'mcg/kg/saat' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {enableWeight && weightNum > 0 ? (
                    formatTurkishNumber(convertedRates['mcg/kg/saat'], 2, 3)
                  ) : (
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Kilo Giriniz</span>
                  )}
                </div>
              </div>

              {/* 7. mg/kg/dk */}
              <div 
                onClick={() => handleSelectActiveUnit('mg/kg/dk')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'mg/kg/dk'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>mg/kg/dk</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['mg/kg/dk'], 3, 5), 'mg/kg/dk');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-teal-300' : 'text-slate-500 hover:text-teal-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'mg/kg/dk' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {enableWeight && weightNum > 0 ? (
                    formatTurkishNumber(convertedRates['mg/kg/dk'], 3, 5)
                  ) : (
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Kilo Giriniz</span>
                  )}
                </div>
              </div>

              {/* 8. mg/dk */}
              <div 
                onClick={() => handleSelectActiveUnit('mg/dk')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'mg/dk'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>mg/dk</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['mg/dk'], 3, 4), 'mg/dk');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-teal-300' : 'text-slate-500 hover:text-teal-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'mg/dk' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {formatTurkishNumber(convertedRates['mg/dk'], 3, 4)}
                </div>
              </div>

              {/* 9. ml/dk */}
              <div 
                onClick={() => handleSelectActiveUnit('ml/dk')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'ml/dk'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>mL/dk</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['ml/dk'], 2, 4), 'ml/dk');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-teal-300' : 'text-slate-500 hover:text-teal-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'ml/dk' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {formatTurkishNumber(convertedRates['ml/dk'], 2, 4)}
                </div>
              </div>

              {/* 10. mcg/saat */}
              <div 
                onClick={() => handleSelectActiveUnit('mcg/saat')}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${
                  activeUnit === 'mcg/saat'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/60 ring-1 ring-teal-500/30'
                      : 'bg-teal-50/90 border-teal-500 ring-1 ring-teal-500/30 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>mcg/saat</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(formatTurkishNumber(convertedRates['mcg/saat'], 0, 1), 'mcg/saat');
                    }}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 ${
                      isDark ? 'text-slate-400 hover:text-teal-300' : 'text-slate-500 hover:text-teal-700'
                    }`}
                    title="Kopyala"
                  >
                    {copiedKey === 'mcg/saat' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className={`text-xl font-mono font-bold mt-1.5 tabular-nums ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {formatTurkishNumber(convertedRates['mcg/saat'], 0, 1)}
                </div>
              </div>

            </div>

            {/* Formula Breakdown Legend */}
            <div className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
              isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="font-bold flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-teal-500" />
                  Klinik Dönüşüm Formülleri Referansı
                </span>
                <span className={`font-mono ${isDark ? 'text-teal-400' : 'text-teal-700 font-bold'}`}>
                  Konsantrasyon: {formatTurkishNumber(concMcgPerMl, 0, 2)} mcg/mL
                </span>
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <div>• <strong>mL/saat =</strong> (mcg/kg/dk × Kilo × 60) ÷ Konsantrasyon (mcg/mL)</div>
                <div>• <strong>mcg/kg/dk =</strong> (mL/saat × Konsantrasyon) ÷ (60 × Kilo)</div>
                <div>• <strong>mg/saat =</strong> mL/saat × Konsantrasyon (mg/mL)</div>
                <div>• <strong>Kalan Süre =</strong> Hacim (mL) ÷ Hız (mL/saat)</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
