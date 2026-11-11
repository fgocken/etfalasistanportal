import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Clock, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Download, 
  Info, 
  Bell, 
  CheckCircle2, 
  Sparkles,
  ShieldAlert,
  Brain,
  HelpCircle,
  Eye,
  AlertCircle,
  Lock,
  Unlock
} from 'lucide-react';
import { copyToClipboard } from '../../utils/deepLink';

interface EktTrackerViewProps {
  isDark: boolean;
}

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  isAlert?: boolean;
  isSuccess?: boolean;
}

export const EktTrackerView: React.FC<EktTrackerViewProps> = ({ isDark }) => {
  // Protocol State
  const [protokolNo, setProtokolNo] = useState<string>('');
  const [grup, setGrup] = useState<string>('Grup 1 (PSi)');
  const [isProtocolLocked, setIsProtocolLocked] = useState<boolean>(false);

  // Timestamps (ms)
  const [t1Time, setT1Time] = useState<number | null>(null); // İndüksiyon başlangıç zamanı (ms)
  const [t2Time, setT2Time] = useState<number | null>(null); // Şok zamanı (ms)
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // PSi Values
  const [t0Psi, setT0Psi] = useState<string>('');
  const [isT0PsiLogged, setIsT0PsiLogged] = useState<boolean>(false);

  const [t1Psi, setT1Psi] = useState<string>('');
  const [isT1PsiLogged, setIsT1PsiLogged] = useState<boolean>(false);

  const [t2Psi, setT2Psi] = useState<string>('');
  const [isT2PsiLogged, setIsT2PsiLogged] = useState<boolean>(false);

  const [t3Psi, setT3Psi] = useState<string>('');
  const [isT3PsiLogged, setIsT3PsiLogged] = useState<boolean>(false);
  const [isWaitingT3PsiAlert, setIsWaitingT3PsiAlert] = useState<boolean>(false); // Göz açıldıktan sonra kırmızı uyarı flag'i

  // Hemodynamic confirmations
  const [hemoT0Done, setHemoT0Done] = useState<boolean>(false);
  const [hemoT1Done, setHemoT1Done] = useState<boolean>(false);

  // Timed Hemodynamic confirmation flags
  const [conf15s, setConf15s] = useState<boolean>(false);
  const [conf60s, setConf60s] = useState<boolean>(false);
  const [conf180s, setConf180s] = useState<boolean>(false);
  const [conf600s, setConf600s] = useState<boolean>(false);

  // Reshock status
  const [reshockStatus, setReshockStatus] = useState<'Evet' | 'Hayır' | null>(null);

  // Recovery milestones (durations from induction in seconds)
  const [recoverySolunum, setRecoverySolunum] = useState<number | null>(null);
  const [recoveryGoz, setRecoveryGoz] = useState<number | null>(null);
  const [recoveryEmir, setRecoveryEmir] = useState<number | null>(null);

  // Post-anesthesia discharge (duration from shock in minutes)
  const [recoveryMas, setRecoveryMas] = useState<string | null>(null);

  // Induction to shock interval in seconds
  const [indukUyariSec, setIndukUyariSec] = useState<number | null>(null);

  // Logs
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [copyToast, setCopyToast] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState<boolean>(false);

  // Refs
  const logContainerRef = useRef<HTMLDivElement>(null);
  const t2PsiInputRef = useRef<HTMLInputElement>(null);
  const t3PsiInputRef = useRef<HTMLInputElement>(null);

  // Audio tone generator for alarms
  const playAlertSound = (frequency = 880, duration = 350, type: OscillatorType = 'sine') => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration / 1000);
    } catch {
      // Audio autoplay may be blocked in some browsers
    }
  };

  // Play double urgency beep
  const playUrgentDoubleBeep = () => {
    playAlertSound(980, 250, 'triangle');
    setTimeout(() => {
      playAlertSound(1180, 350, 'triangle');
    }, 280);
  };

  // Timestamp helper
  const getExactTimestamp = (): string => {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const addLog = (message: string, isAlert = false, isSuccess = false) => {
    const entry: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: getExactTimestamp(),
      message,
      isAlert,
      isSuccess
    };
    setLogs(prev => [...prev, entry]);
  };

  // Timer loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom on new log
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Format MM:SS helper
  const formatMMSS = (ms: number): string => {
    if (ms < 0) ms = 0;
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Global induction timer elapsed (ms)
  const inductionElapsedMs = t1Time ? Math.max(0, currentTime - t1Time) : 0;
  // Shock timer elapsed (ms)
  const shockElapsedMs = t2Time ? Math.max(0, currentTime - t2Time) : 0;

  // Sound triggering refs for timed hemodynamics
  const alerted15Ref = useRef(false);
  const alerted60Ref = useRef(false);
  const alerted180Ref = useRef(false);
  const alerted600Ref = useRef(false);

  useEffect(() => {
    if (!t2Time) return;
    const elapsed = currentTime - t2Time;

    if (elapsed >= 15000 && !conf15s && !alerted15Ref.current) {
      alerted15Ref.current = true;
      playAlertSound(880, 400);
      addLog('🔔 UYARI: T2 Hemodinami (15. Saniye) Ölçüm ve Onay Bekliyor!', true);
    }
    if (elapsed >= 60000 && !conf60s && !alerted60Ref.current) {
      alerted60Ref.current = true;
      playAlertSound(750, 400);
      addLog('🔔 UYARI: T3 Hemodinami (1. Dakika) Ölçüm ve Onay Bekliyor!', true);
    }
    if (elapsed >= 180000 && !conf180s && !alerted180Ref.current) {
      alerted180Ref.current = true;
      playAlertSound(650, 400);
      addLog('🔔 UYARI: T4 Hemodinami (3. Dakika) Ölçüm ve Onay Bekliyor!', true);
    }
    if (elapsed >= 600000 && !conf600s && !alerted600Ref.current) {
      alerted600Ref.current = true;
      playAlertSound(550, 400);
      addLog('🔔 UYARI: T5 Hemodinami (10. Dakika) Ölçüm ve Onay Bekliyor!', true);
    }
  }, [t2Time, currentTime, conf15s, conf60s, conf180s, conf600s]);

  // Action Handlers
  const handleConfirmHemoT0 = () => {
    if (hemoT0Done) return;
    setHemoT0Done(true);
    addLog('✅ Onaylandı: T0 Hemodinami (Bazal)', false, true);
  };

  const handleLogT0Psi = () => {
    if (isT0PsiLogged) return;
    if (!t0Psi.trim()) {
      alert('Lütfen T0 PSi değerini giriniz.');
      return;
    }
    setIsT0PsiLogged(true);
    setIsProtocolLocked(true);
    addLog(`Hasta Protokol: ${protokolNo || 'Belirtilmedi'} | Grup: ${grup}`);
    addLog(`T0 PSi Kaydedildi: ${t0Psi}`);
  };

  const handleStartInduction = () => {
    if (t1Time) return;
    if (!hemoT0Done || !isT0PsiLogged) {
      playAlertSound(450, 300);
      alert('⚠️ T0 Bazal Fazı tamamlanmadan indüksiyon başlatılamaz!\n\nLütfen önce:\n1. T0 Hemodinami ölçümünü onaylayınız,\n2. T0 PSi değerini kaydediniz.');
      return;
    }
    const now = Date.now();
    setT1Time(now);
    addLog('▶ İNDÜKSİYON BAŞLATILDI (Ketofol İV Verilmeye Başlandı)', false, true);
  };

  const handleConfirmHemoT1 = () => {
    if (hemoT1Done || !t1Time) return;
    setHemoT1Done(true);
    addLog('✅ Onaylandı: T1 Hemodinami (İndüksiyon Sonu)', false, true);
  };

  // Group 1: Ask "PSi >= 50 hedefine ulaşıldı mı?"
  const handleGroup1T1Target = (reached: boolean) => {
    if (!t1Time || isT1PsiLogged) return;
    if (reached) {
      setIsT1PsiLogged(true);
      setT1Psi('PSi ≥ 50 (Ulaşıldı)');
      addLog('✅ T1 İndüksiyon Hedefi: PSi ≥ 50 hedefine başarıyla ulaşıldı (Grup 1 Onaylandı)', false, true);
    } else {
      addLog('⚠️ T1 İndüksiyon: PSi ≥ 50 hedefine henüz ulaşılamadı. Titrasyona devam ediliyor.');
    }
  };

  // Group 2: Enter numeric PSi
  const handleLogT1Psi = () => {
    if (isT1PsiLogged || !t1Time) return;
    if (!t1Psi.trim()) {
      alert('Lütfen T1 PSi değerini giriniz.');
      return;
    }
    setIsT1PsiLogged(true);
    addLog(`T1 PSi Kaydedildi (İndüksiyon Sonu - Kör): ${t1Psi}`);
  };

  const handleLogT2Psi = () => {
    if (isT2PsiLogged || !isT1PsiLogged) return;
    if (!t2Psi.trim()) {
      alert('Lütfen T2 PSi değerini giriniz.');
      return;
    }
    setIsT2PsiLogged(true);
    addLog(`T2 PSi Kaydedildi (Pre-İktal / Uyarı Öncesi Kritik Değer): ${t2Psi}`);
  };

  const handleTriggerShock = () => {
    if (t2Time) return;
    if (!t1Time) {
      alert('Lütfen önce indüksiyonu başlatınız.');
      return;
    }
    if (!isT1PsiLogged) {
      alert('Lütfen önce T1 İndüksiyon aşamasını tamamlayınız.');
      return;
    }
    if (!isT2PsiLogged) {
      if (!t2Psi.trim()) {
        playAlertSound(450, 350);
        alert('⚠️ T2 PSi girilmeden şok verilemez!\n\nLütfen önce şok öncesi T2 PSi (Pre-İktal) değerini giriniz.');
        if (t2PsiInputRef.current) {
          t2PsiInputRef.current.focus();
        }
        return;
      }
      setIsT2PsiLogged(true);
      addLog(`T2 PSi Kaydedildi (Pre-İktal / Uyarı Öncesi Kritik Değer): ${t2Psi.trim()}`);
    }

    const now = Date.now();
    setT2Time(now);
    const diffSec = Math.floor((now - t1Time) / 1000);
    setIndukUyariSec(diffSec);
    playAlertSound(980, 500, 'square');
    addLog('⚡ EKT UYARISI VERİLDİ (ŞOK).', true);
    addLog(`Hesaplanan İndüksiyon-Uyarı Aralığı: ${diffSec} saniye (${Math.floor(diffSec / 60)} dk ${diffSec % 60} sn)`, false, true);
  };

  const handleConfirmTimedHemo = (type: '15s' | '60s' | '180s' | '600s', label: string) => {
    if (type === '15s') {
      if (conf15s) return;
      setConf15s(true);
    } else if (type === '60s') {
      if (conf60s) return;
      setConf60s(true);
    } else if (type === '180s') {
      if (conf180s) return;
      setConf180s(true);
    } else if (type === '600s') {
      if (conf600s) return;
      setConf600s(true);
    }
    addLog(`✅ Onaylandı: ${label}`, false, true);
  };

  const handleLogReshock = (status: 'Evet' | 'Hayır') => {
    if (reshockStatus !== null || !t2Time) return;
    setReshockStatus(status);
    addLog(`Yeniden Uyarı Gereksinimi: ${status}`);
  };

  // Recovery milestones - Göz Açtı triggers sound + red alert for T3 PSi
  const handleLogRecovery = (type: 'Spontan Solunum' | 'Göz Açtı' | 'Emirlere Uydu') => {
    if (!t1Time) return;
    const now = Date.now();
    const durSec = Math.floor((now - t1Time) / 1000);

    if (type === 'Spontan Solunum' && recoverySolunum === null) {
      setRecoverySolunum(durSec);
      addLog(`Derlenme - Spontan Solunum: İndüksiyon başlangıcından ${durSec} sn sonra.`);
    } else if (type === 'Göz Açtı' && recoveryGoz === null) {
      setRecoveryGoz(durSec);
      addLog(`Derlenme - Göz Açtı: İndüksiyon başlangıcından ${durSec} sn sonra.`, false, true);

      // Trigger audible sound and red visual alert for T3 PSi!
      playUrgentDoubleBeep();
      setIsWaitingT3PsiAlert(true);
      addLog('🔔 UYARI: Hasta gözlerini açtı! T3 PSi uyanma değerini hemen giriniz!', true);

      // Focus input field smoothly
      setTimeout(() => {
        if (t3PsiInputRef.current) {
          t3PsiInputRef.current.focus();
        }
      }, 150);
    } else if (type === 'Emirlere Uydu' && recoveryEmir === null) {
      setRecoveryEmir(durSec);
      addLog(`Derlenme - Emirlere Uydu: İndüksiyon başlangıcından ${durSec} sn sonra.`);
    }
  };

  const handleLogT3Psi = () => {
    if (isT3PsiLogged || !t2Time) return;
    if (!t3Psi.trim()) {
      alert('Lütfen T3 PSi değerini giriniz.');
      return;
    }
    setIsT3PsiLogged(true);
    setIsWaitingT3PsiAlert(false);
    addLog(`T3 PSi Kaydedildi (Uyanma / Göz Açma İndeksi): ${t3Psi}`, false, true);
  };

  const handleLogMas = () => {
    if (recoveryMas !== null || !t2Time) return;
    const now = Date.now();
    const durMin = ((now - t2Time) / 1000 / 60).toFixed(1);
    setRecoveryMas(durMin);
    addLog(`Geç Derlenme: MAS ≥ 9 Skalasına ulaşıldı (Taburculuk Kriteri). Şoktan itibaren geçen süre: ${durMin} dakika.`, false, true);
  };

  const handleCopyLogs = async () => {
    if (logs.length === 0) return;
    const formatted = logs.map(l => `[${l.timestamp}] ${l.message}`).join('\n');
    const header = `ŞİŞLİ HAMİDİYE ETFAL EAH - EKT VAKA TAKİP VE CRF GÜNLÜĞÜ\nProtokol No: ${protokolNo || 'Belirtilmedi'} | Grup: ${grup}\nTarih: ${new Date().toLocaleDateString('tr-TR')}\n${'='.repeat(60)}\n\n`;
    const fullText = header + formatted;
    const success = await copyToClipboard(fullText);
    if (success) {
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2500);
    }
  };

  const handleDownloadReport = () => {
    if (logs.length === 0) return;
    const formatted = logs.map(l => `[${l.timestamp}] ${l.message}`).join('\n');
    const header = `ŞİŞLİ HAMİDİYE ETFAL EAH - EKT VAKA TAKİP VE CRF GÜNLÜĞÜ\nProtokol No: ${protokolNo || 'Belirtilmedi'} | Grup: ${grup}\nTarih: ${new Date().toLocaleDateString('tr-TR')}\n${'='.repeat(60)}\n\n`;
    const fullText = header + formatted;

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EKT_CRF_Protokol_${protokolNo || 'Kayit'}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const executeReset = () => {
    setProtokolNo('');
    setGrup('Grup 1 (PSi)');
    setIsProtocolLocked(false);
    setT1Time(null);
    setT2Time(null);
    setT0Psi('');
    setIsT0PsiLogged(false);
    setT1Psi('');
    setIsT1PsiLogged(false);
    setT2Psi('');
    setIsT2PsiLogged(false);
    setT3Psi('');
    setIsT3PsiLogged(false);
    setIsWaitingT3PsiAlert(false);
    setHemoT0Done(false);
    setHemoT1Done(false);
    setConf15s(false);
    setConf60s(false);
    setConf180s(false);
    setConf600s(false);
    setReshockStatus(null);
    setRecoverySolunum(null);
    setRecoveryGoz(null);
    setRecoveryEmir(null);
    setRecoveryMas(null);
    setIndukUyariSec(null);
    setLogs([]);
    setShowResetConfirmModal(false);
    alerted15Ref.current = false;
    alerted60Ref.current = false;
    alerted180Ref.current = false;
    alerted600Ref.current = false;
  };

  // Helper calculation for countdowns
  const getCountdown = (targetMs: number) => {
    if (!t2Time) return { remainingSec: Math.ceil(targetMs / 1000), isDue: false };
    const elapsed = currentTime - t2Time;
    const diff = targetMs - elapsed;
    if (diff <= 0) return { remainingSec: 0, isDue: true };
    return { remainingSec: Math.ceil(diff / 1000), isDue: false };
  };

  const cd15 = getCountdown(15000);
  const cd60 = getCountdown(60000);
  const cd180 = getCountdown(180000);
  const cd600 = getCountdown(600000);

  const isGroup1 = grup === 'Grup 1 (PSi)';
  const isBazalCompleted = isT0PsiLogged && hemoT0Done;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 relative">
      {/* Sticky Tactical Header (Docked under portal navbar at top-14) */}
      <div className={`p-4 rounded-2xl border transition-all sticky top-14 sm:top-16 z-30 shadow-lg backdrop-blur-md ${
        isDark 
          ? 'bg-slate-900/95 border-slate-700/80 text-white' 
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Title & Protocol Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 mr-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Zap className="w-5 h-5 fill-amber-500" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight flex items-center gap-2">
                  <span>EKT Vaka Takip & Zamanlayıcı</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                    CRF Protokol
                  </span>
                </h1>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Ketofol indüksiyonu, PSi monitörizasyonu ve zamanlı hemodinami kontrolü
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col">
                <label className="text-[9px] uppercase font-bold text-slate-400">Protokol No</label>
                <input
                  type="text"
                  placeholder="Örn: 2026/042"
                  value={protokolNo}
                  onChange={(e) => setProtokolNo(e.target.value)}
                  disabled={isProtocolLocked}
                  className="bg-transparent text-xs font-mono font-bold w-28 px-1 py-0.5 outline-none text-slate-900 dark:text-white disabled:opacity-60"
                />
              </div>

              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

              <div className="flex flex-col">
                <label className="text-[9px] uppercase font-bold text-slate-400">Grup</label>
                <select
                  value={grup}
                  onChange={(e) => setGrup(e.target.value)}
                  disabled={isProtocolLocked}
                  className="bg-transparent text-xs font-semibold outline-none text-slate-900 dark:text-white disabled:opacity-60 cursor-pointer"
                >
                  <option value="Grup 1 (PSi)" className="dark:bg-slate-800 text-slate-900 dark:text-white">Grup 1 (PSi ≥ 50 Hedefi)</option>
                  <option value="Grup 2 (Kör)" className="dark:bg-slate-800 text-slate-900 dark:text-white">Grup 2 (Kör Kontrol)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Realtime Dual Timers & Prominent Reset Button */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Global Timer */}
            <div className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border flex flex-col items-center ${
              t1Time
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}>
              <div className="text-xl sm:text-2xl font-black font-mono tracking-tight leading-none">
                {t1Time ? formatMMSS(inductionElapsedMs) : '00:00'}
              </div>
              <div className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">
                İndüksiyon Süresi
              </div>
            </div>

            {/* Shock Timer */}
            <div className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border flex flex-col items-center ${
              t2Time
                ? 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400'
                : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}>
              <div className="text-xl sm:text-2xl font-black font-mono tracking-tight leading-none">
                {t2Time ? formatMMSS(shockElapsedMs) : '00:00'}
              </div>
              <div className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">
                Şoktan İtibaren
              </div>
            </div>

            {/* Prominent Reset Button (Yeni Hasta) */}
            <button
              type="button"
              onClick={() => setShowResetConfirmModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Yeni hasta için tüm verileri ve sayaçları sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yeni Hasta (Sıfırla)</span>
            </button>

            {/* Quick Info Modal Button */}
            <button
              type="button"
              onClick={() => setShowInfoModal(true)}
              title="Klinik EKT Rehberi & Protokol İpuçları"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Workflow (7 Cols), Right Event Log (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Workflow Phases (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">

          {/* FAZ T0: Bazal Faz (Pre-Oksijenasyon) */}
          <div className={`p-4 rounded-xl border-l-4 border-l-slate-400 rounded-r-xl border transition-all ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span>T0 — Bazal Faz (Pre-Oksijenasyon)</span>
              </h2>
              {isT0PsiLogged && hemoT0Done && (
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Tamamlandı
                </span>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/70">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-900 dark:text-slate-200">Monitör:</span> T0 Bazal Hemodinamik parametreleri (KAH, SKB, DKB, SpO2) kaydedin.
                </div>
                <button
                  type="button"
                  onClick={handleConfirmHemoT0}
                  disabled={hemoT0Done}
                  className={`text-xs font-bold py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
                    hemoT0Done
                      ? 'bg-emerald-600 text-white border-emerald-500 cursor-default'
                      : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
                  }`}
                >
                  {hemoT0Done ? '✔ Onaylandı' : 'Yapıldı / Onayla'}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                  <input
                    type="number"
                    placeholder="T0 PSi Değeri (90-100)"
                    value={t0Psi}
                    onChange={(e) => setT0Psi(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogT0Psi();
                      }
                    }}
                    disabled={isT0PsiLogged}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-white outline-none focus:border-teal-500 disabled:opacity-60"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-bold">PSi</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogT0Psi}
                  disabled={isT0PsiLogged}
                  className={`px-5 py-2 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${
                    isT0PsiLogged
                      ? 'bg-slate-500 opacity-60 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-500 shadow-xs'
                  }`}
                >
                  {isT0PsiLogged ? 'Kaydedildi' : 'Kaydet'}
                </button>
              </div>
            </div>
          </div>

          {/* FAZ T1: İndüksiyon (Ketofol İntravenöz Verilişi) */}
          <div className={`p-4 rounded-xl border-l-4 border-l-blue-500 rounded-r-xl border transition-all ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                T1 — İndüksiyon (Ketofol İntravenöz Verilişi)
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-semibold">
                {isGroup1 ? 'Grup 1: Hedef Odaklı' : 'Grup 2: Kör Kayıt'}
              </span>
            </div>

            <div className="space-y-3">
              {!t1Time ? (
                <div className="space-y-2">
                  {!isBazalCompleted && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>
                          {!hemoT0Done && !isT0PsiLogged
                            ? 'Bazal Faz Bekleniyor: T0 Hemodinami ve T0 PSi kaydedilmeden indüksiyon başlatılamaz.'
                            : !hemoT0Done
                              ? 'Bazal Faz Bekleniyor: T0 Hemodinami onayı yapılmalıdır.'
                              : 'Bazal Faz Bekleniyor: T0 PSi kaydedilmelidir.'}
                        </span>
                      </span>
                      <span className="text-[10px] font-mono bg-amber-500/20 px-2 py-0.5 rounded font-bold">KİLİTLİ</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleStartInduction}
                    disabled={!isBazalCompleted}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-between shadow-md transition-all ${
                      !isBazalCompleted
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-60'
                        : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer active:scale-98 shadow-blue-500/20'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {!isBazalCompleted ? (
                        <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <Play className="w-4 h-4 fill-white" />
                      )}
                      <span>
                        {!isBazalCompleted
                          ? 'İndüksiyonu Başlat (Önce T0 Bazal Fazı Tamamlayınız)'
                          : 'İndüksiyonu Başlat (Ketofol İV Verildi)'}
                      </span>
                    </span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      !isBazalCompleted ? 'bg-slate-300 dark:bg-slate-700 text-slate-500' : 'bg-blue-700/70 text-white'
                    }`}>
                      {!isBazalCompleted ? 'T0 KİLİTLİ' : 'Kronometreyi Başlat'}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    İndüksiyon Devam Ediyor: {formatMMSS(inductionElapsedMs)}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Global Kronometre Aktif</span>
                </div>
              )}

              {/* T1 Hemodinami: Pulses when induction started until confirmed */}
              <div className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                t1Time && !hemoT1Done
                  ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-400/50 shadow-md animate-pulse'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/70'
              }`}>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <span className={`font-bold ${t1Time && !hemoT1Done ? 'text-amber-800 dark:text-amber-300 font-black' : 'text-slate-900 dark:text-slate-200'}`}>
                    Monitör:
                  </span> T1 Hemodinami (İndüksiyon sonu / bilinç kaybı anı).
                </div>
                <button
                  type="button"
                  onClick={handleConfirmHemoT1}
                  disabled={!t1Time || hemoT1Done}
                  className={`text-xs font-bold py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
                    hemoT1Done
                      ? 'bg-emerald-600 text-white border-emerald-500 cursor-default'
                      : !t1Time
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-60'
                        : 'bg-amber-600 hover:bg-amber-500 text-white border-amber-500 font-black shadow-md animate-pulse active:scale-95'
                  }`}
                >
                  {hemoT1Done ? '✔ Onaylandı' : 'Yapıldı / Onayla'}
                </button>
              </div>

              {/* T1 PSi: Conditioned by Group - Pulses when induction started until confirmed */}
              {isGroup1 ? (
                /* Grup 1: Soru Tabanlı (PSi >= 50 hedefine erişildi mi?) - Yanıp Sönen Uyarı */
                <div className={`p-3.5 rounded-xl border transition-all ${
                  isT1PsiLogged
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                    : t1Time
                      ? 'bg-blue-500/15 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/50 shadow-lg animate-pulse'
                      : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        <span className={t1Time && !isT1PsiLogged ? 'text-blue-900 dark:text-blue-200 font-extrabold' : ''}>
                          PSi ≥ 50 Hedefine Erişildi mi?
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 font-medium">
                        Grup 1 protokolü: Değer girmeye gerek yoktur; PSi ≥ 50 sağlandığında indüksiyon tamamlanır.
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isT1PsiLogged ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-emerald-500/30 shadow-2xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Hedefe Ulaşıldı (Onaylandı)</span>
                        </span>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleGroup1T1Target(false)}
                            disabled={!t1Time}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-50 cursor-pointer transition-colors"
                          >
                            Henüz Değil
                          </button>
                          <button
                            type="button"
                            onClick={() => handleGroup1T1Target(true)}
                            disabled={!t1Time}
                            className={`px-4 py-1.5 rounded-lg text-xs font-black shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-1.5 transition-all active:scale-95 ${
                              t1Time
                                ? 'bg-blue-600 hover:bg-blue-500 text-white animate-pulse ring-2 ring-blue-400/60'
                                : 'bg-slate-300 text-slate-500'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Evet, PSi ≥ 50 Ulaşıldı</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Grup 2: Sayısal PSi Değeri Girilir (Kör Kayıt) */
                <div className={`p-2 rounded-xl border transition-all ${
                  t1Time && !isT1PsiLogged
                    ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-400/40 animate-pulse'
                    : 'border-transparent'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-xs">
                      <input
                        type="number"
                        placeholder="T1 PSi Değeri (Kör Kayıt)"
                        value={t1Psi}
                        onChange={(e) => setT1Psi(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleLogT1Psi();
                        }}
                        disabled={!t1Time || isT1PsiLogged}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-white outline-none focus:border-blue-500 disabled:opacity-60"
                      />
                      <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-bold">PSi</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogT1Psi}
                      disabled={!t1Time || isT1PsiLogged}
                      className={`px-5 py-2 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${
                        isT1PsiLogged
                          ? 'bg-slate-500 opacity-60 cursor-not-allowed'
                          : !t1Time
                            ? 'bg-slate-300 dark:bg-slate-700 opacity-50 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 shadow-xs'
                      }`}
                    >
                      {isT1PsiLogged ? 'Kaydedildi' : 'Kaydet'}
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 pl-1">
                    (Grup 2: MOAA/S ≤ 1 klinik kör kayıt)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAZ T2: Pre-İktal (Uyarı Öncesi) & ŞOK */}
          <div className={`p-4 rounded-xl border-l-4 border-l-rose-500 rounded-r-xl border transition-all ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2 flex items-center justify-between">
              <span>Pre-İktal (Elektrot Öncesi) &amp; EKT Şoku</span>
              {t2Time && (
                <span className="text-xs font-mono text-purple-500 font-bold">
                  Şok Verildi: {formatMMSS(shockElapsedMs)}
                </span>
              )}
            </h2>

            <div className="space-y-3">
              {/* Pre-Shock Security Interlock Indicator */}
              {!isT1PsiLogged ? (
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-500 text-xs flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>T1 İndüksiyon aşaması tamamlanmadan Pre-İktal T2 PSi girilemez ve şok verilemez.</span>
                </div>
              ) : !isT2PsiLogged && !t2Psi.trim() ? (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-semibold flex items-center justify-between animate-pulse">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Şok Güvenlik Kilidi Aktif: T2 PSi girilmeden şok verilemez!</span>
                  </span>
                  <span className="text-[10px] font-mono bg-rose-500/20 px-2 py-0.5 rounded font-bold">KİLİTLİ</span>
                </div>
              ) : !t2Time ? (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Unlock className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Şok Kilidi Açıldı: T2 PSi hazır ({t2Psi || 'Girilmiş'}).</span>
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 px-2 py-0.5 rounded font-bold">ŞOKA HAZIR</span>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-400 text-xs font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>Şok Başarıyla Verildi. İktal faz takibi devam ediyor.</span>
                  </span>
                  <span className="text-[10px] font-mono bg-purple-500/20 px-2 py-0.5 rounded font-bold">{indukUyariSec} sn</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                  <input
                    ref={t2PsiInputRef}
                    type="number"
                    placeholder="T2 PSi (En Kritik Değer!)"
                    value={t2Psi}
                    onChange={(e) => setT2Psi(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogT2Psi();
                      }
                    }}
                    disabled={!isT1PsiLogged || isT2PsiLogged}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-white outline-none disabled:opacity-60 transition-all ${
                      isT1PsiLogged && !isT2PsiLogged && !t2Psi.trim()
                        ? 'border-rose-500 ring-1 ring-rose-500/40 focus:border-rose-500'
                        : 'border-slate-300 dark:border-slate-600 focus:border-teal-500'
                    }`}
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] text-rose-500 font-bold">Kritik</span>
                </div>
                <button
                  type="button"
                  onClick={handleLogT2Psi}
                  disabled={!isT1PsiLogged || isT2PsiLogged}
                  className={`px-5 py-2 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${
                    isT2PsiLogged
                      ? 'bg-slate-500 opacity-60 cursor-not-allowed'
                      : !isT1PsiLogged
                        ? 'bg-slate-300 dark:bg-slate-700 opacity-50 cursor-not-allowed'
                        : 'bg-rose-600 hover:bg-rose-500 shadow-xs'
                  }`}
                >
                  {isT2PsiLogged ? 'Kaydedildi' : 'Kaydet'}
                </button>
              </div>

              {/* Huge Tactical Shock Button with Strict Safety Guard */}
              <button
                type="button"
                onClick={handleTriggerShock}
                disabled={!!t2Time || !isT1PsiLogged}
                className={`w-full py-4 px-4 rounded-xl font-black text-base tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-3 border ${
                  !!t2Time
                    ? 'bg-purple-900/40 text-purple-300 border-purple-500/40 cursor-default'
                    : !isT1PsiLogged
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-slate-300 dark:border-slate-700 cursor-not-allowed opacity-50'
                      : !t2Psi.trim()
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-rose-500/50 cursor-pointer'
                        : 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)] cursor-pointer active:scale-98 animate-pulse'
                }`}
              >
                {t2Time ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <span>ŞOK VERİLDİ ({indukUyariSec} SN)</span>
                  </>
                ) : !t2Psi.trim() ? (
                  <>
                    <Lock className="w-5 h-5 text-rose-500" />
                    <span>T2 PSi GİRİLMELİDİR (ŞOK KİLİTLİ)</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6 fill-white" />
                    <span>EKT UYARISINI VER (ŞOK)</span>
                    <Zap className="w-6 h-6 fill-white" />
                  </>
                )}
              </button>

              <div className="text-center font-mono text-xs text-rose-500 dark:text-rose-400 font-semibold">
                {indukUyariSec !== null 
                  ? `İndüksiyon - Uyarı Aralığı: ${indukUyariSec} saniye (${Math.floor(indukUyariSec / 60)} dk ${indukUyariSec % 60} sn)`
                  : 'İndüksiyon - Uyarı Aralığı: Şok bekleniyor...'}
              </div>
            </div>
          </div>

          {/* FAZ: İktal / Nöbet Fazı (T2 Hemo 15s & T3 Hemo 60s) */}
          <div className={`p-4 rounded-xl border-l-4 border-l-purple-500 rounded-r-xl border transition-all ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                İktal / Nöbet Fazı &amp; Zamanlı Uyarılar
              </h2>
              <span className="font-mono text-xs text-purple-600 dark:text-purple-400 font-bold">
                {t2Time ? `${formatMMSS(shockElapsedMs)} (Şoktan)` : 'Beklemede'}
              </span>
            </div>

            <div className="space-y-2.5">
              {/* 15. Saniye Alarmı */}
              <button
                type="button"
                onClick={() => handleConfirmTimedHemo('15s', 'T2 Hemodinami (15. Sn)')}
                disabled={!t2Time || conf15s}
                className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                  conf15s
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 cursor-default'
                    : cd15.isDue
                      ? 'bg-red-600 border-red-500 text-white font-bold animate-pulse shadow-md cursor-pointer'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-not-allowed opacity-80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold">15. Sn — T2 Hemodinami (Zirve Otonom Yanıt)</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/20">
                  {conf15s ? '✔ Yapıldı' : cd15.isDue ? 'ONAYLA' : `${cd15.remainingSec} sn kaldı`}
                </span>
              </button>

              {/* 60. Saniye (1. Dk) Alarmı */}
              <button
                type="button"
                onClick={() => handleConfirmTimedHemo('60s', 'T3 Hemodinami (1. Dk)')}
                disabled={!t2Time || conf60s}
                className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                  conf60s
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 cursor-default'
                    : cd60.isDue
                      ? 'bg-red-600 border-red-500 text-white font-bold animate-pulse shadow-md cursor-pointer'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-not-allowed opacity-80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold">1. Dk — T3 Hemodinami (Post-İktal Dönem)</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/20">
                  {conf60s ? '✔ Yapıldı' : cd60.isDue ? 'ONAYLA' : `${cd60.remainingSec} sn kaldı`}
                </span>
              </button>

              {/* Yeniden Uyarı Gereksinimi */}
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Yeniden Uyarı (Re-shock) Gereksinimi Oldu mu?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleLogReshock('Hayır')}
                    disabled={!t2Time || reshockStatus !== null}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      reshockStatus === 'Hayır'
                        ? 'bg-emerald-600 text-white'
                        : !t2Time || reshockStatus !== null
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'
                          : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    Hayır
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLogReshock('Evet')}
                    disabled={!t2Time || reshockStatus !== null}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      reshockStatus === 'Evet'
                        ? 'bg-amber-600 text-white'
                        : !t2Time || reshockStatus !== null
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 opacity-60 cursor-not-allowed'
                          : 'bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 text-amber-800 dark:text-amber-200 border border-amber-500/30'
                    }`}
                  >
                    Evet
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAZ T4: Erken Derlenme Fazı (Spontan Solunum & Uyanma) */}
          <div className={`p-4 rounded-xl border-l-4 border-l-teal-500 rounded-r-xl border transition-all ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Erken Derlenme Fazı (Spontan Solunum &amp; Uyanma)
              </h2>
              {isWaitingT3PsiAlert && !isT3PsiLogged && (
                <span className="text-[11px] font-mono font-bold text-red-500 flex items-center gap-1 animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" /> PSi Girişi Bekleniyor!
                </span>
              )}
            </div>

            <div className="space-y-3">
              {/* 3. Dk Alarmı */}
              <button
                type="button"
                onClick={() => handleConfirmTimedHemo('180s', 'T4 Hemodinami (3. Dk)')}
                disabled={!t2Time || conf180s}
                className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                  conf180s
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 cursor-default'
                    : cd180.isDue
                      ? 'bg-red-600 border-red-500 text-white font-bold animate-pulse shadow-md cursor-pointer'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-not-allowed opacity-80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold">3. Dk — T4 Hemodinami (Erken Derlenme)</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/20">
                  {conf180s ? '✔ Yapıldı' : cd180.isDue ? 'ONAYLA' : `${cd180.remainingSec} sn kaldı`}
                </span>
              </button>

              {/* 3 Recovery Milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleLogRecovery('Spontan Solunum')}
                  disabled={!t2Time || recoverySolunum !== null}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center transition-all ${
                    recoverySolunum !== null
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 cursor-default'
                      : !t2Time
                        ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-60'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-teal-500/30 hover:border-teal-500 text-teal-600 dark:text-teal-400 cursor-pointer active:scale-98'
                  }`}
                >
                  <span className="text-xs font-bold mb-1">Spontan Solunum</span>
                  <span className="text-[10px] font-mono">
                    {recoverySolunum !== null ? `${recoverySolunum} sn (İndük)` : 'Tıkla ve Kaydet'}
                  </span>
                </button>

                {/* Göz Açtı: Pressing this activates sound & red alert on T3 PSi */}
                <button
                  type="button"
                  onClick={() => handleLogRecovery('Göz Açtı')}
                  disabled={!t2Time || recoveryGoz !== null}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center transition-all ${
                    recoveryGoz !== null
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 cursor-default ring-1 ring-emerald-500/30'
                      : !t2Time
                        ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-60'
                        : 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/40 hover:border-amber-500 text-amber-700 dark:text-amber-300 font-bold cursor-pointer active:scale-98 hover:shadow-md'
                  }`}
                >
                  <span className="text-xs font-bold mb-1 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Göz Açtı</span>
                  </span>
                  <span className="text-[10px] font-mono">
                    {recoveryGoz !== null ? `${recoveryGoz} sn (İndük)` : 'Tıkla & PSi Uyar'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLogRecovery('Emirlere Uydu')}
                  disabled={!t2Time || recoveryEmir !== null}
                  className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center transition-all ${
                    recoveryEmir !== null
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 cursor-default'
                      : !t2Time
                        ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-60'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-teal-500/30 hover:border-teal-500 text-teal-600 dark:text-teal-400 cursor-pointer active:scale-98'
                  }`}
                >
                  <span className="text-xs font-bold mb-1">Emirlere Uydu</span>
                  <span className="text-[10px] font-mono">
                    {recoveryEmir !== null ? `${recoveryEmir} sn (İndük)` : 'Tıkla ve Kaydet'}
                  </span>
                </button>
              </div>

              {/* T3 PSi Input with Red Alarm State triggered by Göz Açtı */}
              <div className={`p-3 rounded-xl border transition-all ${
                isWaitingT3PsiAlert && !isT3PsiLogged
                  ? 'border-red-500 bg-red-500/10 ring-2 ring-red-500/40 animate-pulse'
                  : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40'
              }`}>
                {isWaitingT3PsiAlert && !isT3PsiLogged && (
                  <div className="flex items-center gap-2 text-xs font-black text-red-600 dark:text-red-400 mb-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 animate-bounce" />
                    <span>⚠️ DİKKAT: Hasta gözlerini açtı! Hemen T3 PSi değerini giriniz!</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <input
                      ref={t3PsiInputRef}
                      type="number"
                      placeholder="T3 PSi (Göz Açma Anı)"
                      value={t3Psi}
                      onChange={(e) => setT3Psi(e.target.value)}
                      disabled={!t2Time || isT3PsiLogged}
                      className={`w-full bg-white dark:bg-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 dark:text-white outline-none disabled:opacity-60 border transition-all ${
                        isWaitingT3PsiAlert && !isT3PsiLogged
                          ? 'border-red-500 ring-2 ring-red-500/50'
                          : 'border-slate-300 dark:border-slate-600 focus:border-teal-500'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-[10px] text-teal-500 font-bold">PSi</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogT3Psi}
                    disabled={!t2Time || isT3PsiLogged}
                    className={`px-5 py-2 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${
                      isT3PsiLogged
                        ? 'bg-slate-500 opacity-60 cursor-not-allowed'
                        : isWaitingT3PsiAlert
                          ? 'bg-red-600 hover:bg-red-500 shadow-lg animate-pulse'
                          : !t2Time
                            ? 'bg-slate-300 dark:bg-slate-700 opacity-50 cursor-not-allowed'
                            : 'bg-teal-600 hover:bg-teal-500 shadow-xs'
                    }`}
                  >
                    {isT3PsiLogged ? 'Kaydedildi' : 'Kaydet'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAZ T5: Geç Derlenme (PACU) */}
          <div className={`p-4 rounded-xl border-l-4 border-l-emerald-500 rounded-r-xl border transition-all ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
              Geç Derlenme Fazı (PACU &amp; Taburculuk)
            </h2>

            <div className="space-y-3">
              {/* 10. Dk Alarmı */}
              <button
                type="button"
                onClick={() => handleConfirmTimedHemo('600s', 'T5 Hemodinami (10. Dk)')}
                disabled={!t2Time || conf600s}
                className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                  conf600s
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 cursor-default'
                    : cd600.isDue
                      ? 'bg-red-600 border-red-500 text-white font-bold animate-pulse shadow-md cursor-pointer'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-not-allowed opacity-80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-bold">10. Dk — T5 Hemodinami (PACU Geç Dönem)</span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black/20">
                  {conf600s ? '✔ Yapıldı' : cd600.isDue ? 'ONAYLA' : `${cd600.remainingSec} sn kaldı`}
                </span>
              </button>

              {/* MAS Score Button */}
              <button
                type="button"
                onClick={handleLogMas}
                disabled={!t2Time || recoveryMas !== null}
                className={`w-full py-3.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-between transition-all ${
                  recoveryMas !== null
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 cursor-default'
                    : !t2Time
                      ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-60'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600 shadow-xs cursor-pointer active:scale-98'
                }`}
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>MAS (Modifiye Aldrete Skoru) ≥ 9 Ulaşıldı (Taburcu)</span>
                </span>
                <span className="font-mono text-xs">
                  {recoveryMas !== null ? `${recoveryMas} dk (Şoktan)` : 'Tıkla ve Kaydet'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Event Log & Live CRF (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`rounded-xl border flex flex-col h-[650px] shadow-sm overflow-hidden ${
            isDark ? 'bg-slate-900 border-slate-700/80' : 'bg-white border-slate-200'
          }`}>
            {/* Log Panel Header */}
            <div className={`p-3 border-b flex items-center justify-between shrink-0 ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Olay Günlüğü (CRF Log)
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {logs.length} kayıt
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyLogs}
                  disabled={logs.length === 0}
                  className="flex items-center gap-1 text-[11px] font-semibold bg-teal-600 hover:bg-teal-500 text-white px-2.5 py-1 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  title="Tüm logları panoya kopyala"
                >
                  <Copy className="w-3 h-3" />
                  <span>Kopyala</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  disabled={logs.length === 0}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer disabled:opacity-50"
                  title="TXT olarak indir"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Log Content Area */}
            <div
              ref={logContainerRef}
              className={`flex-1 p-3 overflow-y-auto space-y-2 text-xs font-mono select-text ${
                isDark ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-50/50 text-slate-700'
              }`}
            >
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Activity className="w-8 h-8 mb-2 opacity-40 animate-pulse" />
                  <p className="font-sans text-xs font-semibold">Sistem hazır, kayıt bekleniyor...</p>
                  <p className="font-sans text-[11px] text-slate-400 mt-1">
                    T0 PSi kaydedip indüksiyonu başlattığınızda canlı zaman damgalı loglar burada birikir.
                  </p>
                </div>
              ) : (
                logs.map((entry) => (
                  <div
                    key={entry.id}
                    className={`p-2 rounded-lg border-l-2 text-[11px] leading-relaxed transition-all ${
                      entry.isAlert
                        ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300'
                        : entry.isSuccess
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                          : isDark
                            ? 'border-slate-600 bg-slate-800/80 text-slate-200'
                            : 'border-slate-300 bg-white text-slate-800 shadow-2xs'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mr-1.5 font-bold">
                      [{entry.timestamp}]
                    </span>
                    <span>{entry.message}</span>
                  </div>
                ))
              )}
            </div>

            {/* Quick Summary Pill in Log Footer */}
            <div className={`p-2.5 border-t text-[11px] font-mono flex items-center justify-between shrink-0 ${
              isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              <span>İndük-Şok: <strong>{indukUyariSec !== null ? `${indukUyariSec}s` : '--'}</strong></span>
              <button
                type="button"
                onClick={() => setShowResetConfirmModal(true)}
                className="text-[10px] font-sans font-bold text-rose-500 hover:text-rose-600 underline cursor-pointer"
              >
                Yeni Hasta Başlat
              </button>
            </div>
          </div>

          {/* Clinical Reference Card */}
          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-teal-500" />
              <span>EKT Ketofol &amp; PSi Protokol Hatırlatıcısı</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li><strong>Grup 1 Protokolü:</strong> Bilinç kaybı ve PSi ≥ 50 hedefine ulaşıldığı an indüksiyon sonlandırılır.</li>
              <li><strong>Grup 2 (Kör):</strong> Klinisyen MOAA/S ≤ 1 derinliğinde şoka geçer; PSi değerleri kör olarak kaydedilir.</li>
              <li><strong>Ketofol 1:1 Hazırlığı:</strong> 100 mg Ketamin + 100 mg Propofol, toplam 20 mL (5 mg/mL + 5 mg/mL).</li>
              <li><strong>Göz Açma Uyarısı:</strong> Hasta gözünü açtığı anda T3 PSi değeri hemen kaydedilmelidir.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Floating Sticky Live Timer HUD (Ekranı aşağı kaydırırken sürekli takip eden canlı bar) */}
      {t1Time && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] sm:w-auto">
          <div className={`px-4 py-2.5 rounded-2xl shadow-2xl border flex items-center justify-between gap-3 sm:gap-6 backdrop-blur-xl transition-all ${
            isDark 
              ? 'bg-slate-900/95 border-slate-700/80 text-white shadow-black/60' 
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-900/15'
          }`}>
            {/* Global Induction Timer */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-slate-400 leading-none">İndüksiyon</span>
                <span className="font-mono font-black text-sm sm:text-base text-blue-500 tabular-nums">
                  {formatMMSS(inductionElapsedMs)}
                </span>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

            {/* Shock Timer */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${t2Time ? 'bg-purple-500 animate-pulse' : 'bg-slate-400'}`} />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-slate-400 leading-none">Şoktan</span>
                <span className={`font-mono font-black text-sm sm:text-base tabular-nums ${
                  t2Time ? 'text-purple-500' : 'text-slate-400'
                }`}>
                  {t2Time ? formatMMSS(shockElapsedMs) : 'Bekliyor'}
                </span>
              </div>
            </div>

            {/* Quick alert badge if eye opened & waiting T3 PSi */}
            {isWaitingT3PsiAlert && !isT3PsiLogged && (
              <>
                <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />
                <button
                  type="button"
                  onClick={() => {
                    if (t3PsiInputRef.current) {
                      t3PsiInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      t3PsiInputRef.current.focus();
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-black animate-pulse flex items-center gap-1 cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>T3 PSi Gir!</span>
                </button>
              </>
            )}

            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />

            {/* Reset button inside floating bar */}
            <button
              type="button"
              onClick={() => setShowResetConfirmModal(true)}
              title="Yeni Hasta İçin Sıfırla"
              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Copy Toast */}
      {copyToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white font-bold text-xs py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>EKT Vaka Günlüğü Panoya Kopyalandı!</span>
        </div>
      )}

      {/* Custom Reset Confirmation Modal (Yeni Hasta) */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`max-w-md w-full rounded-2xl border p-6 space-y-4 shadow-2xl ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Yeni Hasta Başlatılsın mı?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tüm sayaçlar, PSi değerleri ve vaka logları sıfırlanacaktır.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs">
              <strong>İpucu:</strong> Mevcut vaka kaydını kaybetmemek için önce sağdaki <strong>"Kopyala"</strong> veya <strong>"İndir"</strong> butonunu kullanarak günlüğü saklayabilirsiniz.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={executeReset}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs transition-colors cursor-pointer"
              >
                Evet, Sıfırla ve Başlat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Information Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className={`max-w-xl w-full rounded-2xl border p-6 space-y-4 shadow-2xl ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base">EKT Vaka Takip ve Zamanlayıcı Rehberi</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed max-h-[70vh] overflow-y-auto pr-1">
              <p>
                Bu araç, Elektrokonvülsif Tedavi (EKT) seanslarında anestezi indüksiyonu (Ketofol), EEG/PSi derinlik takibi ve şok sonrası otonomik hemodinami zirvelerini saniyesi saniyesine kayıt altına almak için geliştirilmiştir.
              </p>

              <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-800 dark:text-teal-300">
                <strong>Grup Ayrımı ve Klinik Farklar:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1 text-[11px]">
                  <li><strong>Grup 1 (PSi ≥ 50 Hedefi):</strong> İndüksiyonda sayısal PSi girişi zorunlu değildir. Bilinç kaybı ve PSi ≥ 50 hedefine ulaşıldığı onaylandığında indüksiyon tamamlanır.</li>
                  <li><strong>Grup 2 (Kör Kontrol):</strong> Klinisyen klinik skalaya (MOAA/S ≤ 1) göre şoka geçer; PSi değerleri kör olarak kaydedilir.</li>
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300">
                <strong>Uyanma &amp; Göz Açma Kuralı:</strong>
                <p className="mt-1 text-[11px]">
                  Hasta gözlerini açtığında <strong>"Göz Açtı"</strong> butonuna basıldığı an sistem sesli ve kırmızı görsel alarm ile uyarır. Göz açma anındaki <strong>T3 PSi</strong> değeri hemen kaydedilmelidir.
                </p>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Seans tamamlandığında <strong>Kopyala</strong> veya <strong>İndir</strong> butonu ile tüm olay günlüğü hastane bilgi sistemine (HBYS/CRF) yapıştırılmaya hazır formatta dışa aktarılabilir.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs cursor-pointer"
              >
                Anladım
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
