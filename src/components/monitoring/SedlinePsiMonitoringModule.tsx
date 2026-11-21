import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sliders,
} from 'lucide-react';

interface SedlinePsiMonitoringModuleProps {
  isDark: boolean;
}

type SedlinePresetId =
  | 'awake'
  | 'surgical'
  | 'light_trap'
  | 'burst_suppression'
  | 'left_ischemia'
  | 'artifact_high';

const COMPARISON_ROWS = [
  {
    feature: 'Optimal Cerrahi Anestezi Hedefi',
    sedline: 'PSI 25 – 50 (Kritik fark!)',
    bis: 'BIS 40 – 60',
  },
  {
    feature: 'Kanal ve Elektrot Mimarisi',
    sedline: '4 aktif kanal, bilateral (Fp1, Fp2, F7, F8 + CB, CT · 6 elektrot)',
    bis: 'Standart Quatro: 1 kanal, unilateral (4 elektrot); ayrı bilateral sensör opsiyonel',
  },
  {
    feature: 'Spektrogram Teknolojisi',
    sedline: 'Bilateral Ayna Multitaper DSA (Sol üst / Sağ alt) + L/R SEF95 çizgisi',
    bis: 'Klasik FFT tabanlı tek taraflı DSA (bilateral sensörle çift taraf)',
  },
  {
    feature: 'Hemisferik Asimetri (ASYM)',
    sedline: 'Standart her hastada anlık Sol–Sağ güç asimetrisi izlenir',
    bis: 'Yalnızca özel bilateral sensör takılırsa izlenebilir',
  },
  {
    feature: 'EMG ve Artifakt Yönetimi',
    sedline: 'Next-Gen algoritma EMG’ye daha dirençli; ayrı EMG% ve ARTF% göstergesi',
    bis: 'EMG > 50–55 dB BIS’i belirgin yükseltebilir; SQI% ve EMG (dB)',
  },
  {
    feature: 'Serebral Oksimetri Uyumu',
    sedline: 'Root platformunda Masimo O3 NIRS sensörleri ile aynı alında kombine',
    bis: 'Ayrı NIRS monitörü (INVOS / FORE-SIGHT) gerektirir',
  },
];

const REFERENCES = [
  {
    authors: 'Chen X, Tang J, White PF, Wender RH, Ma H, Sloninsky A, Kariger R.',
    title: 'A comparison of patient state index and bispectral index values during the perioperative period.',
    journal: 'Anesth Analg. 2002;95(6):1669–1674.',
    pmid: '12456436',
  },
  {
    authors: 'Prichep LS, Gugino LD, John ER, Chabot RJ, et al.',
    title: 'The Patient State Index as an indicator of the level of hypnosis under general anaesthesia.',
    journal: 'Br J Anaesth. 2004;92(3):393–399.',
    pmid: '14742326',
  },
  {
    authors: 'White PF, Tang J, Ma H, Wender RH, Sloninsky A, Kariger R.',
    title: 'Is the Patient State Analyzer with the PSArray 2 a cost-effective alternative to the Bispectral Index monitor during the perioperative period?',
    journal: 'Anesth Analg. 2004;99(5):1429–1435.',
    pmid: '15520151',
  },
  {
    authors: 'Drover D, Ortega HR.',
    title: 'Patient state index.',
    journal: 'Best Pract Res Clin Anaesthesiol. 2006;20(1):121–128.',
    pmid: '16634419',
  },
  {
    authors: 'Purdon PL, Sampson A, Pavone KJ, Brown EN.',
    title: 'Clinical electroencephalography for anesthesiologists: Part I: Background and basic signatures.',
    journal: 'Anesthesiology. 2015;123(4):937–960.',
    pmid: '26275092',
  },
];

export const SedlinePsiMonitoringModule: React.FC<SedlinePsiMonitoringModuleProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<SedlinePresetId>('surgical');
  const [depth, setDepth] = useState<number>(62); // 0..96%
  const [leftIschemia, setLeftIschemia] = useState<number>(0); // 0..85% (asymmetric left hypoperfusion)
  const [artifactPct, setArtifactPct] = useState<number>(6); // 0..85%

  const applyPreset = (preset: SedlinePresetId) => {
    setActivePreset(preset);
    if (preset === 'awake') {
      setDepth(6);
      setLeftIschemia(0);
      setArtifactPct(12);
    } else if (preset === 'surgical') {
      setDepth(62);
      setLeftIschemia(0);
      setArtifactPct(5);
    } else if (preset === 'light_trap') {
      setDepth(36);
      setLeftIschemia(0);
      setArtifactPct(8);
    } else if (preset === 'burst_suppression') {
      setDepth(88);
      setLeftIschemia(0);
      setArtifactPct(4);
    } else if (preset === 'left_ischemia') {
      setDepth(60);
      setLeftIschemia(72);
      setArtifactPct(6);
    } else if (preset === 'artifact_high') {
      setDepth(60);
      setLeftIschemia(0);
      setArtifactPct(70);
    }
  };

  // Physiological 4-Channel Bilateral Model
  const sim = useMemo(() => {
    // Baseline PSI mapping: awake ~90-98, light sedation 51-75, optimal surgical 25-50, deep < 25
    let rightPsi = Math.round(96 - depth * 0.96);
    let rightSr = 0;
    if (depth > 74) {
      rightSr = Math.min(92, Math.round(((depth - 74) / 26) * 92));
      rightPsi = Math.max(4, Math.round(24 - rightSr * 0.22));
    }

    // Left hemisphere affected additionally by unilateral hypoperfusion/ischemia
    const leftEffectiveDepth = Math.min(98, depth + leftIschemia * 0.45);
    let leftSr = rightSr;
    if (leftIschemia > 25) {
      leftSr = Math.min(95, Math.max(rightSr, Math.round(((leftIschemia - 20) / 65) * 68)));
    }

    // Overall PSI reflects bilateral frontal state (Next-Gen SedLine resists mild EMG but high ARTF degrades confidence)
    const psiDropFromIschemia = Math.round(leftIschemia * 0.16);
    const psi = Math.max(2, Math.min(98, rightPsi - psiDropFromIschemia));
    const srCombined = Math.round((leftSr + rightSr) / 2);

    // EMG% correlates with awake/light states and artifact
    const emgPct = Math.min(
      95,
      Math.max(2, Math.round((depth < 35 ? (35 - depth) * 1.4 : 4) + artifactPct * 0.45))
    );

    // Bilateral SEF95 (Hz)
    const calcSef = (effDepth: number, srVal: number) => {
      if (srVal > 20) return Number(Math.max(3.8, 9.5 - srVal * 0.07).toFixed(1));
      if (effDepth < 20) return Number((24.5 - effDepth * 0.28).toFixed(1));
      if (effDepth <= 74) return Number((19 - ((effDepth - 20) / 54) * 9.5).toFixed(1));
      return Number(Math.max(4.5, 9.5 - (effDepth - 74) * 0.22).toFixed(1));
    };
    const sefR = calcSef(depth, rightSr);
    const sefL = calcSef(leftEffectiveDepth, leftSr);
    const asymPct = Math.min(90, Math.round(leftIschemia * 0.92 + (artifactPct > 50 ? 12 : 2)));

    // Hemisphere band powers (Right vs Left)
    const getBands = (effDepth: number, srVal: number, isch: number) => ({
      beta: effDepth < 25 ? 0.85 : effDepth < 45 ? 0.55 : artifactPct > 50 ? 0.78 : 0.14,
      alpha:
        isch > 35
          ? Math.max(0.12, 0.88 - isch * 0.01)
          : effDepth >= 42 && effDepth <= 75
            ? 0.94
            : effDepth < 42
              ? 0.38
              : 0.18,
      theta: effDepth >= 30 && effDepth <= 74 ? 0.44 : 0.18,
      delta:
        isch > 35
          ? 0.86
          : effDepth < 18
            ? 0.18
            : effDepth <= 76
              ? Math.min(0.95, 0.28 + effDepth * 0.01)
              : Math.max(0.16, 0.88 - srVal * 0.008),
    });

    const rightBands = getBands(depth, rightSr, 0);
    const leftBands = getBands(leftEffectiveDepth, leftSr, leftIschemia);

    // Clinical interpretation
    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let title = 'Optimal Cerrahi Anestezi (PSI 25–50 · Simetrik)';
    let action =
      'Sol ve Sağ hemisferlerde simetrik Alfa (8–12 Hz) + Yavaş/Delta şeridi, SR %0 ve düşük ARTF%. Mevcut hipnotik idamesi idealdir.';

    if (artifactPct >= 45) {
      status = 'warning';
      title = `Yüksek Artifakt (ARTF %${artifactPct}) — PSI Değeri Güvenilmez`;
      action =
        'Elektrokoter, baş-boyun hareketi veya yüksek elektrot impedansı sinyali bozuyor. Önce sensör impedansını ve koter parazitini düzeltin; yüksek ARTF% iken ilaç dozunu değiştirmeyin.';
    } else if (leftIschemia >= 35) {
      status = 'critical';
      title = `Kırmızı Bayrak: Sol Hemisfer Asimetrisi (ASYM %${asymPct} · SEF-L ${sefL} vs SEF-R ${sefR} Hz)`;
      action =
        'Sol hemisferde (L1/L2) Alfa bandı söndü, yavaşlama ve supresyon gelişti! Karotis klempi, tek taraflı serebral hipoperfüzyon, emboli veya malpozisyon açısından derhal MAP’ı yükseltin, cerrahı uyarın ve O3 rSO₂ değerini kontrol edin.';
    } else if (psi > 50 && psi <= 75) {
      status = 'warning';
      title = `Yüzeyel Anestezi / Sedasyon Bandı (PSI ${psi} — BIS ile Karıştırma!)`;
      action =
        'Önemli Tuzak: BIS’te 50–60 normal iken SedLine’da PSI > 50 cerrahi anestezi için YÜZEYELDİR! Paralize hastada farkındalık riskine karşı TIVA akışını veya ETAG MAC düzeyini kontrol edip derinleştirin.';
    } else if (psi > 75) {
      status = 'warning';
      title = `Uyanık / Çok Hafif Sedasyon (PSI ${psi})`;
      action =
        'Bilateral hızlı Beta/Gama desenkronize EEG hakimdir. Cerrahi insizyon öncesi hipnotik derinlik henüz oluşmamıştır.';
    } else if (psi < 25 || srCombined > 0) {
      status = 'critical';
      title = `Aşırı Derin Anestezi / Burst Supresyon (PSI ${psi} · SR %${srCombined})`;
      action =
        'Bilateral Alfa bandı kaybolmuş ve izoelektrik supresyon başlamıştır. Önce hipotansiyon/hipotermiyi dışlayın; ardından hipnotik infüzyonunu veya volatil konsantrasyonunu kademeli azaltın.';
    }

    return {
      psi,
      leftSr,
      rightSr,
      srCombined,
      emgPct,
      sefL,
      sefR,
      asymPct,
      leftBands,
      rightBands,
      status,
      title,
      action,
    };
  }, [depth, leftIschemia, artifactPct]);

  // Helper: Generate a single EEG channel SVG path
  const buildChannelPath = (
    midY: number,
    bands: { beta: number; alpha: number; theta: number; delta: number },
    srVal: number,
    phaseOffset: number,
    ampScale: number
  ) => {
    const startX = 44;
    const endX = 548;
    const steps = 200;
    const pts: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = startX + t * (endX - startX);

      let env = 1;
      if (srVal > 5) {
        const cyc = (t * 2.1 + phaseOffset * 0.05) % 1;
        const activeFrac = Math.max(0.14, 1 - srVal / 100);
        env = cyc < activeFrac ? 1 : 0.05;
      }

      const slow = bands.delta * 12 * Math.sin(2 * Math.PI * 3.0 * t + phaseOffset);
      const alpha = bands.alpha * 7 * Math.sin(2 * Math.PI * 21 * t + phaseOffset * 1.4);
      const fast = bands.beta * 5.5 * Math.sin(2 * Math.PI * 56 * t + phaseOffset * 2.1);
      const noise =
        artifactPct > 35
          ? ((artifactPct - 35) / 50) * 11 * Math.sin(2 * Math.PI * 129 * t + phaseOffset)
          : 0;

      const y = midY - ((slow + alpha + fast) * env * ampScale + noise);
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const eegPaths = useMemo(() => {
    const leftAmp = leftIschemia > 45 ? 0.55 : 1.0;
    return {
      l1: buildChannelPath(28, sim.leftBands, sim.leftSr, 0.3, leftAmp),
      l2: buildChannelPath(62, sim.leftBands, sim.leftSr, 1.1, leftAmp * 0.92),
      r1: buildChannelPath(106, sim.rightBands, sim.rightSr, 0.7, 1.0),
      r2: buildChannelPath(140, sim.rightBands, sim.rightSr, 1.8, 0.94),
    };
  }, [sim.leftBands, sim.rightBands, sim.leftSr, sim.rightSr, leftIschemia, artifactPct]);

  const dsaColor = (power: number, suppressed: boolean): string => {
    if (suppressed) return '#090d16';
    if (power > 0.78) return '#ef4444';
    if (power > 0.56) return '#f59e0b';
    if (power > 0.36) return '#10b981';
    if (power > 0.2) return '#0284c7';
    return '#1e3a8a';
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* EDITORIAL OPENING HEADER */}
      <header className={`pb-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Anestezi Derinliği &amp; Bilateral pEEG</span>
          <span aria-hidden="true">·</span>
          <span>Masimo SedLine · Patient State Index (PSI)</span>
          <span aria-hidden="true">·</span>
          <span>4-Kanal EEG &amp; Multitaper DSA</span>
        </div>

        <h1 className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${isDark ? 'text-white' : 'text-slate-900'}`}>
          SedLine / PSI Monitörizasyonu (Bilateral İşlenmiş EEG)
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          SedLine, 6 elektrotlu tek bir alın sensörüyle <strong>eş zamanlı 4 kanallı bilateral frontal EEG</strong>{' '}
          (<em>Fp1, Fp2, F7, F8</em>) kaydeder ve hem <strong>Patient State Index (PSI: hedef 25–50)</strong> hem de
          yüksek çözünürlüklü <strong>Ayna Multitaper DSA</strong> ile Sol–Sağ hemisfer simetrisini anlık izler.
        </p>

        <nav aria-label="Bölüm geçişleri" className="mt-5 flex flex-wrap items-center gap-2">
          {[
            { id: 'psi-01', label: '01. PSI 25–50 & BIS Farkı' },
            { id: 'psi-02', label: '02. Canlı Bilateral Lab & DSA' },
            { id: 'psi-03', label: '03. 6 Elektrotlu Sensör' },
            { id: 'psi-04', label: '04. İlaçlar, Yaşlı Beyin & Tuzaklar' },
            { id: 'psi-05', label: '05. Karar Akışı ve Literatür' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-indigo-400'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. PSI SKALASI, BIS FARKI VE YARDIMCI GÖSTERGELER                    */}
      {/* ===================================================================== */}
      <section id="psi-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. PSI (25–50) Skalası, BIS’ten Kritik Farkları ve Ekran Göstergeleri
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Klinikte en sık yapılan hata, BIS’in alışılmış <strong>40–60</strong> aralığını SedLine’a uyarlamaktır.
            SedLine PSI algoritması ön–arka güç dağılımını, interhemisferik koherensi ve frekans kaymasını kullanır;
            optimal genel anestezi aralığı <strong>25 ile 50</strong> arasıdır.
          </p>
        </div>

        {/* Scale Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              range: '75 – 100',
              label: 'Uyanık / Çok Hafif Sedasyon',
              note: 'Bilateral hızlı Beta/Gama aktivitesi; bilinç açıktır.',
              cls: isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200',
              numCls: isDark ? 'text-slate-200' : 'text-slate-800',
            },
            {
              range: '51 – 74',
              label: 'Sedasyon / Yüzeyel Anestezi',
              note: 'Genel anestezide FARKINDALIK RİSKİ! (BIS 55 ile karıştırma)',
              cls: isDark ? 'bg-amber-950/25 border-amber-500/40' : 'bg-amber-50 border-amber-300',
              numCls: 'text-amber-600 dark:text-amber-400',
            },
            {
              range: '25 – 50',
              label: 'Optimal Cerrahi Anestezi',
              note: 'Hedef aralık. Simetrik Alfa (8–12 Hz) + Delta; SR %0.',
              cls: isDark ? 'bg-emerald-950/25 border-emerald-500/40' : 'bg-emerald-50 border-emerald-300',
              numCls: 'text-emerald-700 dark:text-emerald-400',
            },
            {
              range: '0 – 24',
              label: 'Derin Hipnoz / Supresyon',
              note: 'Burst supresyon (SR > %0) ve hipotansiyon riski; dozu azalt.',
              cls: isDark ? 'bg-rose-950/25 border-rose-500/40' : 'bg-rose-50 border-rose-300',
              numCls: 'text-rose-600 dark:text-rose-400',
            },
          ].map((band) => (
            <div key={band.range} className={`rounded-xl border p-3.5 space-y-1 ${band.cls}`}>
              <div className={`text-xl font-mono font-bold tabular-nums ${band.numCls}`}>{band.range}</div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{band.label}</div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{band.note}</p>
            </div>
          ))}
        </div>

        {/* SedLine vs BIS Comparison Table */}
        <div className={`rounded-xl border overflow-x-auto ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 bg-slate-900/80 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                <th className="py-3 px-4 font-semibold">Karşılaştırma Kriteri</th>
                <th className="py-3 px-4 font-semibold text-indigo-600 dark:text-indigo-400">Masimo SedLine (PSI)</th>
                <th className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Medtronic BIS (Quatro)</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="align-top">
                  <td className={`py-2.5 px-4 font-semibold min-w-[170px] ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.feature}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[230px]">{row.sedline}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[210px] text-slate-500 dark:text-slate-400">{row.bis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI 4-KANAL BİLATERAL SEDLINE & AYNA MULTITAPER DSA LAB         */}
      {/* ===================================================================== */}
      <section id="psi-02" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            02. Canlı 4-Kanal Bilateral EEG ve Ayna Multitaper DSA Laboratuvarı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            SedLine’ın en büyük gücü, Sol ve Sağ hemisferi ayna görüntüsü (<em>butterfly</em>) şeklinde aynı anda
            göstermesidir. Özellikle <strong>“Sol Hemisfer İskemisi (Karotis Klemp)”</strong> senaryosunu seçerek
            tek-kanallı monitörde gözden kaçabilecek asimetrik Alfa sönmesini inceleyin.
          </p>
        </div>

        {/* 6 Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'awake', label: 'Uyanık (PSI ~90)' },
            { id: 'surgical', label: 'Optimal Cerrahi (PSI 25–50)' },
            { id: 'light_trap', label: 'Yüzeyel Tuzak (PSI ~61)' },
            { id: 'burst_suppression', label: 'Burst Supresyon (SR ↑)' },
            { id: 'left_ischemia', label: 'Sol İskemi / Karotis Klemp' },
            { id: 'artifact_high', label: 'Koter / Yüksek ARTF%' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as SedlinePresetId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-900 border-slate-900 text-white'
                  : isDark
                    ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT STAGE */}
          <div className={`lg:col-span-8 rounded-xl border p-4 sm:p-5 space-y-5 ${isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/70 border-slate-200'}`}>
            {/* 6-Tile Telemetry Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <div className={`p-2.5 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">PSI</div>
                <div
                  className={`mt-0.5 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.status === 'optimal'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : sim.status === 'critical'
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {sim.psi}
                </div>
              </div>
              <div className={`p-2.5 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">SEF-L</div>
                <div className={`mt-1 text-base font-mono font-bold tabular-nums ${leftIschemia >= 35 ? 'text-rose-500' : 'text-sky-600 dark:text-sky-400'}`}>
                  {sim.sefL} Hz
                </div>
              </div>
              <div className={`p-2.5 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">SEF-R</div>
                <div className="mt-1 text-base font-mono font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                  {sim.sefR} Hz
                </div>
              </div>
              <div className={`p-2.5 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">SR%</div>
                <div className={`mt-1 text-base font-mono font-bold tabular-nums ${sim.srCombined > 0 ? 'text-rose-500' : 'text-teal-600 dark:text-teal-400'}`}>
                  %{sim.srCombined}
                </div>
              </div>
              <div className={`p-2.5 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">EMG%</div>
                <div className={`mt-1 text-base font-mono font-bold tabular-nums ${sim.emgPct > 45 ? 'text-amber-500' : isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  %{sim.emgPct}
                </div>
              </div>
              <div className={`p-2.5 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">ARTF%</div>
                <div className={`mt-1 text-base font-mono font-bold tabular-nums ${artifactPct >= 45 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  %{artifactPct}
                </div>
              </div>
            </div>

            {/* 4-Channel Bilateral Raw EEG SVG */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  4-Kanal Eş Zamanlı Ham EEG (Sol: L1/L2 · Sağ: R1/R2)
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  ASYM: %{sim.asymPct} {leftIschemia >= 35 ? '(Sol ↓)' : '(Dengeli)'}
                </span>
              </div>
              <svg
                viewBox="0 0 560 166"
                className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
                role="img"
                aria-label="4 kanallı bilateral SedLine ham EEG trasesi"
              >
                {/* Hemisphere divider */}
                <line x1="10" y1="84" x2="550" y2="84" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />

                <text x="12" y="32" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#38bdf8">L1</text>
                <text x="12" y="66" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#38bdf8">L2</text>
                <text x="12" y="110" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#a78bfa">R1</text>
                <text x="12" y="144" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#a78bfa">R2</text>

                <path d={eegPaths.l1} fill="none" stroke={leftIschemia >= 35 ? '#fb7185' : '#38bdf8'} strokeWidth="1.6" strokeLinejoin="round" />
                <path d={eegPaths.l2} fill="none" stroke={leftIschemia >= 35 ? '#fb7185' : '#0ea5e9'} strokeWidth="1.6" strokeLinejoin="round" />
                <path d={eegPaths.r1} fill="none" stroke="#a78bfa" strokeWidth="1.6" strokeLinejoin="round" />
                <path d={eegPaths.r2} fill="none" stroke="#818cf8" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Mirror Bilateral Multitaper DSA */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Bilateral Ayna Multitaper DSA (Üst: Sol Hemisfer · Alt: Sağ Hemisfer)
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  Sol SR %{sim.leftSr} · Sağ SR %{sim.rightSr}
                </span>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 space-y-1">
                {/* Left Hemisphere (30 Hz down to 0 Hz) */}
                {[
                  { label: 'L 20–30', power: sim.leftBands.beta },
                  { label: 'L Alfa', power: sim.leftBands.alpha },
                  { label: 'L Delta', power: sim.leftBands.delta },
                ].map((row, rIdx) => (
                  <div key={row.label} className="grid grid-cols-12 items-center gap-2">
                    <span className="col-span-2 text-[10px] font-mono text-sky-400 whitespace-nowrap">{row.label}</span>
                    <div className="col-span-10 grid grid-cols-16 gap-0.5 h-4">
                      {Array.from({ length: 16 }).map((_, cIdx) => {
                        const sup = sim.leftSr > 15 && ((cIdx + rIdx) % 3 === 1 || (sim.leftSr > 50 && cIdx % 2 === 0));
                        const jitter = Math.sin(cIdx * 1.7 + rIdx * 2.1) * 0.06;
                        return (
                          <div
                            key={cIdx}
                            className="h-full rounded-[2px]"
                            style={{ backgroundColor: dsaColor(Math.max(0, Math.min(1, row.power + jitter)), sup) }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Center 0 Hz Symmetry Axis */}
                <div className="flex items-center gap-2 py-0.5">
                  <span className="text-[9px] font-mono text-slate-500">0 Hz</span>
                  <div className="flex-1 h-px bg-slate-700" />
                  <span className="text-[9px] font-mono text-slate-500">Ayna Ekseni</span>
                </div>

                {/* Right Hemisphere (0 Hz down to 30 Hz — mirrored!) */}
                {[
                  { label: 'R Delta', power: sim.rightBands.delta },
                  { label: 'R Alfa', power: sim.rightBands.alpha },
                  { label: 'R 20–30', power: sim.rightBands.beta },
                ].map((row, rIdx) => (
                  <div key={row.label} className="grid grid-cols-12 items-center gap-2">
                    <span className="col-span-2 text-[10px] font-mono text-violet-400 whitespace-nowrap">{row.label}</span>
                    <div className="col-span-10 grid grid-cols-16 gap-0.5 h-4">
                      {Array.from({ length: 16 }).map((_, cIdx) => {
                        const sup = sim.rightSr > 15 && ((cIdx + rIdx) % 3 === 1 || (sim.rightSr > 50 && cIdx % 2 === 0));
                        const jitter = Math.cos(cIdx * 1.6 + rIdx * 2.4) * 0.06;
                        return (
                          <div
                            key={cIdx}
                            className="h-full rounded-[2px]"
                            style={{ backgroundColor: dsaColor(Math.max(0, Math.min(1, row.power + jitter)), sup) }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTROL DECK */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`rounded-xl border p-4 space-y-4 ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Sliders className="w-4 h-4 text-indigo-500" />
                <span>Bilateral Simülatör Kontrolleri</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="psi-depth" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Hipnotik Derinlik
                  </label>
                  <span className="font-mono tabular-nums font-bold text-indigo-600 dark:text-indigo-400">
                    %{depth}
                  </span>
                </div>
                <input
                  id="psi-depth"
                  type="range"
                  min={0}
                  max={96}
                  step={2}
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Uyanık</span>
                  <span>PSI 25–50</span>
                  <span>Supresyon</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="psi-isch" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Sol Hemisfer Hipoperfüzyonu
                  </label>
                  <span className="font-mono tabular-nums font-bold text-rose-600 dark:text-rose-400">
                    %{leftIschemia}
                  </span>
                </div>
                <input
                  id="psi-isch"
                  type="range"
                  min={0}
                  max={85}
                  step={5}
                  value={leftIschemia}
                  onChange={(e) => setLeftIschemia(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Simetrik (0%)</span>
                  <span>Karotis İskemi (85%)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="psi-artf" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Artifakt / Koter (ARTF%)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400">
                    %{artifactPct}
                  </span>
                </div>
                <input
                  id="psi-artf"
                  type="range"
                  min={0}
                  max={85}
                  step={5}
                  value={artifactPct}
                  onChange={(e) => setArtifactPct(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Temiz (0%)</span>
                  <span>Koter / Gürültü (85%)</span>
                </div>
              </div>
            </div>

            {/* Dual-Coded Clinical Action Box */}
            <div
              className={`rounded-xl border p-4 text-xs leading-relaxed space-y-2 ${
                sim.status === 'optimal'
                  ? isDark
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : sim.status === 'critical'
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                    : isDark
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {sim.status === 'optimal' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : sim.status === 'critical' ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>{sim.title}</span>
              </div>
              <p>{sim.action}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 03. 6 ELEKTROTLU BİLATERAL SENSÖR ANATOMİSİ                           */}
      {/* ===================================================================== */}
      <section id="psi-03" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            03. 6 Elektrotlu Bilateral SedLine Sensör Yerleşimi (10–20 Sistemi)
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Sensör alnın tam ortasına simetrik yerleştirilir. Merkezdeki <strong>CB (Toprak)</strong> ve{' '}
            <strong>CT (Referans)</strong> elektrotları orta hatta kalırken, <strong>L1/R1 (Fp1/Fp2)</strong> kaş
            üzerine, <strong>L2/R2 (F7/F8)</strong> ise her iki şakağa (göz dış kantus hizası, saçsız bölge) uzanır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Bilateral 6-Electrode SVG */}
          <div className={`lg:col-span-6 rounded-xl border p-4 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'}`}>
            <svg
              viewBox="0 0 440 232"
              className="w-full h-auto"
              role="img"
              aria-label="Masimo SedLine 6 elektrotlu bilateral alın ve şakak sensör yerleşimi"
            >
              {/* Head contour */}
              <path
                d="M 105 188 C 94 136, 98 62, 144 34 C 184 10, 256 10, 296 34 C 342 62, 346 136, 335 188"
                fill={isDark ? '#0f172a' : '#ffffff'}
                stroke={isDark ? '#334155' : '#cbd5e1'}
                strokeWidth="2"
              />
              {/* Eyebrows & Eyes */}
              <path d="M 142 132 Q 170 122, 198 132" fill="none" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="3" strokeLinecap="round" />
              <path d="M 242 132 Q 270 122, 298 132" fill="none" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="170" cy="148" rx="16" ry="7" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
              <ellipse cx="270" cy="148" rx="16" ry="7" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
              <path d="M 220 134 L 214 176 Q 220 182, 226 176" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />

              {/* Symmetric Sensor Band */}
              <path
                d="M 114 126 L 166 98 L 220 88 L 274 98 L 326 126"
                fill="none"
                stroke="#6366f1"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.2"
              />

              {/* L2 (F7) & L1 (Fp1) */}
              <circle cx="114" cy="126" r="11" fill="#0284c7" />
              <text x="114" y="130" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily="ui-monospace, monospace">L2</text>
              <circle cx="166" cy="98" r="11" fill="#0ea5e9" />
              <text x="166" y="102" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily="ui-monospace, monospace">L1</text>

              {/* Center CB (Ground) & CT (Reference) stacked on midline */}
              <circle cx="220" cy="68" r="9.5" fill="#14b8a6" />
              <text x="220" y="71.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="ui-monospace, monospace">CB</text>
              <circle cx="220" cy="96" r="9.5" fill="#f59e0b" />
              <text x="220" y="99.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="ui-monospace, monospace">CT</text>

              {/* R1 (Fp2) & R2 (F8) */}
              <circle cx="274" cy="98" r="11" fill="#7c3aed" />
              <text x="274" y="102" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily="ui-monospace, monospace">R1</text>
              <circle cx="326" cy="126" r="11" fill="#6366f1" />
              <text x="326" y="130" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily="ui-monospace, monospace">R2</text>

              {/* Labels */}
              <text x="14" y="122" fontSize="10" fontWeight="700" fill={isDark ? '#38bdf8' : '#0369a1'}>L2 (F7) · Sol Şakak</text>
              <text x="14" y="88" fontSize="10" fontWeight="700" fill={isDark ? '#7dd3fc' : '#0284c7'}>L1 (Fp1) · Sol Alın</text>

              <text x="346" y="88" fontSize="10" fontWeight="700" fill={isDark ? '#c4b5fd' : '#5b21b6'}>R1 (Fp2) · Sağ Alın</text>
              <text x="346" y="122" fontSize="10" fontWeight="700" fill={isDark ? '#a5b4fc' : '#4338ca'}>R2 (F8) · Sağ Şakak</text>

              <text x="220" y="214" textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill={isDark ? '#94a3b8' : '#64748b'}>
                CB: Toprak (Üst Orta) · CT: Referans (Alt Orta) · O3 NIRS kaş üstü boşluğa uyumlu
              </text>
            </svg>
          </div>

          <div className="lg:col-span-6 space-y-3">
            {[
              {
                title: '1. İmpedans Trafik Işığı Kontrolü',
                body: 'SedLine monitörü 6 elektrotun her birini ayrı renk koduyla denetler (Yeşil: ideal temas, Sarı: sınırda, Kırmızı: yetersiz). İndüksiyon öncesi tüm 6 nokta yeşil olmalıdır.',
              },
              {
                title: '2. Orta Hat (CB / CT) Simetrisi',
                body: 'CB/CT referans-toprak çifti alın orta hattında kayarsa Sol–Sağ ASYM okuması sahte asimetri verebilir. Sensör daima burun köprüsü dikey eksenine hizalanmalıdır.',
              },
              {
                title: '3. O3 Serebral Oksimetri (NIRS) ile Birlikte Kullanım',
                body: 'Kardiyak ve karotis cerrahisinde SedLine sensörü üst alına, Masimo O3 NIRS sensörleri hemen altına yerleştirilerek tek ekranda EEG + rSO₂ takibi yapılır.',
              },
              {
                title: '4. Pediatrik Sensör Seçimi',
                body: 'Çocuk hastalarda küçük alın anatomisine özel SedLine Pediatrik sensör mevcuttur; ancak < 1 yaş infantlarda olgunlaşmamış kortikal EEG (alfa bandı gelişmemiştir) nedeniyle PSI rakamı dikkatle yorumlanmalıdır.',
              },
            ].map((step) => (
              <div key={step.title} className={`rounded-xl border p-3.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.title}</div>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. İLAÇ İMZALARI, GERİATRİK BEYİN VE KLİNİK TUZAKLAR                 */}
      {/* ===================================================================== */}
      <section id="psi-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. İlaç İmzaları, Yaşlı Beyin ve Sık Yapılan Klinik Tuzaklar
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Next-Generation SedLine algoritması EMG ve düşük voltajlı EEG’ye karşı geliştirilmiş olsa da hiçbir işlenmiş
            indeks tek başına farmakolojik imzaların ve fizyolojik DSA okumasının yerini tutmaz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '1. En Sık Hata: PSI 50–60’ı “Normal” Sanmak',
              tone: 'amber',
              body: 'BIS’e alışkın klinisyenler PSI = 55 görünce rahatlayabilir. Oysa PSI > 50 genel anestezi için yüzeyel banttır. Tersine PSI = 30 aşırı derin değil, tam hedef ortasıdır (25–50).',
            },
            {
              title: '2. Yaşlı ve Kırılgan Beyin (Zayıflamış Alfa Bandı)',
              tone: 'indigo',
              body: 'Yaş ilerledikçe frontal kortikal kalınlık ve 8–12 Hz Alfa gücü azalır; aynı MAC/propofol dozunda geriatrik beyin çok daha kolay burst supresyona (SR > %0) girer. DSA’da Alfa şeridini koruyup SR’yi %0 tutmak esastır.',
            },
            {
              title: '3. Ketamin, N₂O ve Deksmedetomidin Etkisi',
              tone: 'rose',
              body: 'Ketamin (25–40 Hz gama artışı) ve N₂O, PSI değerini paradoksal yükseltebilir; Deksmedetomidin ise uyandırılabilir NREM benzeri yavaş dalgalarla PSI’yı 30–45 bandına çekebilir. Her zaman Multitaper DSA + ilaç bağlamıyla okuyun.',
            },
            {
              title: '4. Nöromüsküler Blokerler ve EMG Direnci',
              tone: 'teal',
              body: 'Next-Gen SedLine, EMG artifaktını filtrelemede klasik algoritmalardan daha kararlıdır; ancak tam paralize hastada yine de TIVA damar yolu bütünlüğü ve volatil ETAG konsantrasyonu mutlaka doğrulanmalıdır.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Activity className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{card.title}</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. KARAR AKIŞI VE LİTERATÜR                                          */}
      {/* ===================================================================== */}
      <section id="psi-05" className="scroll-mt-6 space-y-6">
        <div className={`rounded-xl border p-4 sm:p-5 space-y-3 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'}`}>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Brain className="w-4 h-4 text-indigo-500" />
            <span>Ameliyathanede 4 Adımlı SedLine Okuma Sırası</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              {
                step: '1. Önce ARTF% & İmpedans',
                text: '6 elektrot yeşil ve ARTF < %20 mi? Yüksek koter/hareket artifaktında PSI sayısına göre karar verme.',
              },
              {
                step: '2. Sonra Ayna DSA & ASYM',
                text: 'Sol ve Sağ hemisfer simetrik mi? Tek taraflı Alfa kaybı veya SEF95 farkı (> 3–4 Hz) serebral iskemi alarmıdır.',
              },
              {
                step: '3. SR% Kontrolü',
                text: 'SR > %0 ise önce MAP/perfüzyonu ve kor ısısını doğrula; stabilse hipnotik dozu azaltarak SR’yi %0’a çek.',
              },
              {
                step: '4. Son Olarak PSI (25–50)',
                text: 'Sinyal temiz ve simetrikse cerrahi idameyi PSI 25–50 bandında tut; TIVA + NMB’de hat bütünlüğünü izle.',
              },
            ].map((s) => (
              <div key={s.step} className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">{s.step}</div>
                <p className="leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Literature */}
        <footer className={`pt-4 border-t space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`flex items-center gap-2 text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Temel Literatür ve Referanslar</span>
          </div>
          <ol className="space-y-2 text-xs leading-relaxed">
            {REFERENCES.map((ref, idx) => (
              <li key={ref.pmid} className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                <span className="font-mono font-semibold text-slate-500 mr-1.5">{idx + 1}.</span>
                <span className={isDark ? 'text-slate-300' : 'text-slate-800'}>{ref.authors}</span>{' '}
                <em>{ref.title}</em> {ref.journal}{' '}
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
                >
                  <span>PMID: {ref.pmid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ol>
        </footer>
      </section>
    </div>
  );
};
