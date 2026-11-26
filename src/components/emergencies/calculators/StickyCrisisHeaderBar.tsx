import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Pause,
  Play,
  RotateCcw,
  Timer,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import {
  computeEmergencyDoses,
  getStickyDoseHighlights,
  StickyDoseHighlight,
} from './emergencyDoseCalculations';

export interface StickyCrisisHeaderBarProps {
  protocolId: string;
  patientWeight: string;
  onWeightChange: (val: string) => void;
  doses: ReturnType<typeof computeEmergencyDoses>;
  crisisMode: boolean;
  onToggleCrisisMode: () => void;
  isDark: boolean;
}

interface CycleConfig {
  seconds: number;
  label: string;
}

function getCycleConfig(protocolId: string): CycleConfig {
  switch (protocolId) {
    case 'acls':
    case 'malignant-arrhythmias':
      return { seconds: 120, label: 'KPR / Ritim döngüsü' };
    case 'last':
      return { seconds: 300, label: 'Lipid tekrarı' };
    case 'mh':
    case 'dantrolene':
      return { seconds: 300, label: 'Dantrolen tekrarı' };
    case 'anaphylaxis':
      return { seconds: 180, label: 'Adrenalin tekrarı' };
    case 'intraop-bradycardia':
      return { seconds: 180, label: 'Atropin / Pacing' };
    case 'intraop-hypoglycemia':
      return { seconds: 900, label: '15 dk KŞ kontrol' };
    default:
      return { seconds: 60, label: 'İlk 60 sn' };
  }
}

function formatMmSs(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getToneClasses(tone: StickyDoseHighlight['tone'], isDark: boolean): string {
  switch (tone) {
    case 'red':
      return isDark
        ? 'bg-red-950/70 border-red-700/60 text-red-100'
        : 'bg-red-50 border-red-200 text-red-900';
    case 'amber':
      return isDark
        ? 'bg-amber-950/60 border-amber-700/60 text-amber-100'
        : 'bg-amber-50 border-amber-200 text-amber-900';
    case 'emerald':
      return isDark
        ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-100'
        : 'bg-emerald-50 border-emerald-200 text-emerald-900';
    case 'blue':
    default:
      return isDark
        ? 'bg-sky-950/60 border-sky-700/60 text-sky-100'
        : 'bg-sky-50 border-sky-200 text-sky-900';
  }
}

function getToneLabelClasses(tone: StickyDoseHighlight['tone'], isDark: boolean): string {
  switch (tone) {
    case 'red':
      return isDark ? 'text-red-300' : 'text-red-700';
    case 'amber':
      return isDark ? 'text-amber-300' : 'text-amber-700';
    case 'emerald':
      return isDark ? 'text-emerald-300' : 'text-emerald-700';
    case 'blue':
    default:
      return isDark ? 'text-sky-300' : 'text-sky-700';
  }
}

export const StickyCrisisHeaderBar: React.FC<StickyCrisisHeaderBarProps> = ({
  protocolId,
  patientWeight,
  onWeightChange,
  doses,
  crisisMode,
  onToggleCrisisMode,
  isDark,
}) => {
  const cycleConfig = useMemo(() => getCycleConfig(protocolId), [protocolId]);
  const highlights = useMemo(
    () => getStickyDoseHighlights(protocolId, doses),
    [protocolId, doses]
  );

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [cycleAlertFlash, setCycleAlertFlash] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef<boolean>(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  // Reset stopwatch cleanly when switching protocols
  useEffect(() => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setCycleAlertFlash(false);
  }, [protocolId]);

  // Close AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {
          // Ignore close errors in restricted environments
        });
      }
    };
  }, []);

  const triggerCycleFeedback = () => {
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate(200);
      }
    } catch {
      // Ignore unsupported vibration API errors
    }

    if (!soundEnabledRef.current) return;

    try {
      const AudioContextCtor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioContextCtor();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, now);
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.24);
    } catch {
      // Gracefully ignore Web Audio restrictions
    }
  };

  // Interval timer with strict cleanup on pause / unmount / protocol change
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning, protocolId]);

  // Trigger audio/haptic alert on cycle completion
  useEffect(() => {
    if (!isRunning || elapsedSeconds === 0) return;
    if (elapsedSeconds % cycleConfig.seconds === 0) {
      triggerCycleFeedback();
      setCycleAlertFlash(true);
      const timeoutId = window.setTimeout(() => {
        setCycleAlertFlash(false);
      }, 2000);
      return () => window.clearTimeout(timeoutId);
    }
  }, [elapsedSeconds, isRunning, cycleConfig.seconds]);

  const remainingCycleSeconds =
    elapsedSeconds === 0
      ? cycleConfig.seconds
      : cycleConfig.seconds - (elapsedSeconds % cycleConfig.seconds);
  const completedCycles = Math.floor(elapsedSeconds / cycleConfig.seconds);
  const isCycleEndingSoon = isRunning && remainingCycleSeconds <= 10;

  const handleToggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setCycleAlertFlash(false);
  };

  return (
    <div
      className={`sticky top-14 z-20 rounded-xl border backdrop-blur-md shadow-md transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-slate-700/80 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}
      role="region"
      aria-label="Kriz Hızlı Doz ve Zamanlayıcı Çubuğu"
    >
      <div className="px-3 py-2.5 flex flex-col gap-2.5">
        {/* Top Row: Weight Input + Stopwatch/Countdown + Crisis/Reference Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Weight Input + Status Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <label
              htmlFor="sticky-crisis-weight"
              className={`text-xs font-semibold uppercase tracking-wide ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Kilo (kg)
            </label>
            <div className="relative flex items-center">
              <input
                id="sticky-crisis-weight"
                type="number"
                inputMode="decimal"
                min={1}
                max={300}
                step="any"
                value={patientWeight}
                onChange={(e) => onWeightChange(e.target.value)}
                aria-invalid={!doses.isValidWeight}
                className={`w-20 rounded-lg border px-2.5 py-1 text-sm font-bold tabular-nums focus:outline-none focus:ring-2 transition-colors ${
                  !doses.isValidWeight
                    ? isDark
                      ? 'bg-red-950/60 border-red-500 text-red-200 focus:ring-red-500/40'
                      : 'bg-red-50 border-red-400 text-red-900 focus:ring-red-400/40'
                    : isDark
                      ? 'bg-slate-800 border-slate-600 text-white focus:ring-sky-500/40'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-sky-500/40'
                }`}
              />
            </div>

            {!doses.isValidWeight && (
              <span
                role="alert"
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                  isDark
                    ? 'bg-red-950/80 border-red-600/70 text-red-200'
                    : 'bg-red-100 border-red-300 text-red-800'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Geçerli kilo (1–300 kg)
              </span>
            )}

            {doses.isPediatric && (
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-extrabold tracking-wide border ${
                  isDark
                    ? 'bg-amber-500/20 border-amber-400/60 text-amber-200'
                    : 'bg-amber-100 border-amber-400 text-amber-900'
                }`}
              >
                PEDİATRİK
              </span>
            )}
          </div>

          {/* Right Controls: Live Stopwatch + Cycle Countdown + Crisis Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Stopwatch & Protocol Cycle Countdown */}
            <div
              className={`flex items-center gap-2 rounded-lg border px-2.5 py-1 text-xs transition-colors ${
                cycleAlertFlash
                  ? isDark
                    ? 'bg-red-900/80 border-red-400 text-white'
                    : 'bg-red-100 border-red-500 text-red-950'
                  : isDark
                    ? 'bg-slate-800/90 border-slate-700 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <Timer className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <div className="flex items-center gap-1.5 font-mono tabular-nums">
                <span className="font-bold text-sm" title="Toplam geçen süre">
                  {formatMmSs(elapsedSeconds)}
                </span>
                <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>|</span>
                <span
                  className={`font-semibold ${
                    isCycleEndingSoon
                      ? 'text-red-500 font-bold'
                      : isDark
                        ? 'text-amber-300'
                        : 'text-amber-700'
                  }`}
                  title={`${cycleConfig.label} geri sayımı`}
                >
                  {formatMmSs(remainingCycleSeconds)}
                </span>
                <span
                  className={`hidden sm:inline font-sans text-[11px] ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {cycleConfig.label}
                  {completedCycles > 0 ? ` (#${completedCycles + 1})` : ''}
                </span>
              </div>

              <div className="flex items-center gap-1 ml-1">
                <button
                  type="button"
                  onClick={handleToggleTimer}
                  aria-label={isRunning ? 'Zamanlayıcıyı duraklat' : 'Zamanlayıcıyı başlat'}
                  title={isRunning ? 'Duraklat' : 'Başlat'}
                  className={`p-1 rounded-md transition-colors ${
                    isRunning
                      ? isDark
                        ? 'bg-amber-600/30 text-amber-300 hover:bg-amber-600/40'
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      : isDark
                        ? 'bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/40'
                        : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleResetTimer}
                  aria-label="Zamanlayıcıyı sıfırla"
                  title="Sıfırla"
                  className={`p-1 rounded-md transition-colors ${
                    isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSoundEnabled((prev) => !prev)}
                  aria-label={soundEnabled ? 'Uyarı sesini kapat' : 'Uyarı sesini aç'}
                  title={soundEnabled ? 'Ses açık' : 'Ses kapalı'}
                  className={`p-1 rounded-md transition-colors ${
                    isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Crisis Mode vs Full Reference Mode Toggle */}
            <button
              type="button"
              onClick={onToggleCrisisMode}
              aria-pressed={crisisMode}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold border transition-all ${
                crisisMode
                  ? 'bg-red-600 border-red-500 text-white shadow-sm hover:bg-red-700'
                  : isDark
                    ? 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {crisisMode ? (
                <>
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  Kriz Modu
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  Tam Referans
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row: Top 2-3 Critical Bolus Dose Highlights */}
        <div className="flex flex-wrap items-stretch gap-2">
          {highlights.map((item) => (
            <div
              key={item.label}
              className={`flex-1 min-w-[140px] rounded-lg border px-2.5 py-1.5 flex flex-col justify-center ${getToneClasses(
                item.tone,
                isDark
              )}`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider leading-tight ${getToneLabelClasses(
                  item.tone,
                  isDark
                )}`}
              >
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-extrabold leading-snug tabular-nums">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
