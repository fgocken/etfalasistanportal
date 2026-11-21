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

interface BisMonitoringModuleProps {
  isDark: boolean;
}

type BisPresetId =
  | 'awake'
  | 'sedation'
  | 'surgical'
  | 'burst_suppression'
  | 'emg_artifact'
  | 'ketamine_paradox';

interface AgentRow {
  agent: string;
  mechanism: string;
  eegSignature: string;
  bisReliability: 'high' | 'caution' | 'unreliable';
  reliabilityLabel: string;
  clinicalNote: string;
}

const AGENT_ROWS: AgentRow[] = [
  {
    agent: 'Propofol · Sevofluran · Desfluran · İzofluran',
    mechanism: 'GABA-A reseptör potansiyalizasyonu',
    eegSignature: 'Güçlü Yavaş/Delta (0,1–4 Hz) + frontal Alfa bandı (8–12 Hz); volatillerde ek Teta (4–8 Hz) dolgunluğu.',
    bisReliability: 'high',
    reliabilityLabel: 'Yüksek Güvenilirlik',
    clinicalNote: 'BIS algoritmasının temel kalibrasyon grubudur. Cerrahi hedefte (40–60) tutarlı seyreder; yaşlılarda alfa gücü azalabilir.',
  },
  {
    agent: 'Ketamin (İndüksiyon veya Analjezik Adjuvan)',
    mechanism: 'NMDA reseptör antagonizması',
    eegSignature: 'Yüksek frekanslı Beta/Gama (25–40 Hz) patlamaları (“Gama-Yavaş” osilasyonlar).',
    bisReliability: 'unreliable',
    reliabilityLabel: 'Paradoksal Artış',
    clinicalNote: 'Cerrahi anestezide 0,5 mg/kg IV ketamin eklenmesi bile BIS’i 60–80 bandına yükseltir. Yanlışlıkla anestezik dozu artırılmamalıdır.',
  },
  {
    agent: 'Azot Protoksit (N₂O %50–70)',
    mechanism: 'NMDA blokajı (GABA dışı)',
    eegSignature: 'Yüksek frekanslı Beta/Gama hakimiyeti; kesildiğinde geçici yoğun yavaş/delta (“N₂O çekilme dalgası”).',
    bisReliability: 'unreliable',
    reliabilityLabel: 'Duyarsız',
    clinicalNote: 'Klinik derinlik artmasına rağmen BIS rakamı düşmez veya hafif artar. N₂O anestezisi BIS ile titre edilmez.',
  },
  {
    agent: 'Deksmedetomidin',
    mechanism: 'Lokus seruleus α₂-adrenerjik agonizması',
    eegSignature: 'Fizyolojik NREM Evre 2 uykusuna benzer 12–16 Hz uyku iğcikleri (spindles) + yavaş dalgalar.',
    bisReliability: 'caution',
    reliabilityLabel: 'Aşırı Düşük Gösterir',
    clinicalNote: 'Hasta sesli/dokunsal uyaranla kolayca uyandırılabilirken bile BIS 35–50 okunabilir. Sedasyon derinliği klinik skorla (RASS) doğrulanmalıdır.',
  },
  {
    agent: 'Opioidler (Remifentanil · Fentanil · Sufentanil)',
    mechanism: 'μ-opioid reseptör (subkortikal/spinal)',
    eegSignature: 'Tek başına kortikal EEG’yi minimal yavaşlatır; yüksek dozda delta artışı görülür.',
    bisReliability: 'caution',
    reliabilityLabel: 'Dolaylı Etki',
    clinicalNote: 'BIS nosisepsiyonu doğrudan ölçmez; ancak yeterli analjezi cerrahi uyaranla oluşacak ani EMG/arousal sıçramasını önler.',
  },
  {
    agent: 'Nöromüsküler Blokerler (Roküronyum · Süksinilkolin)',
    mechanism: 'Periferik nikotinik blokaj (Santral etki YOK)',
    eegSignature: 'Kortikal EEG değişmez; ancak 70–110 Hz frontalis EMG gürültüsü tamamen kaybolur.',
    bisReliability: 'unreliable',
    reliabilityLabel: 'Schuller Tuzağı!',
    clinicalNote: 'Uyanık gönüllülerde yalnızca NMB verilmesi BIS’i 44–65’e düşürebilir (Schuller 2015). Paralize hastada düşük BIS tek başına hipnozu garanti etmez.',
  },
];

const LANDMARK_TRIALS = [
  {
    name: 'B-Aware (Myles et al., Lancet 2004)',
    population: '2.463 yüksek riskli hasta (TIVA + volatil karışık)',
    finding: 'BIS (40–60) rehberliği rutin bakıma göre kesin farkındalığı %82 azalttı (%0,17 vs %0,91).',
    takeaway: 'Yüksek riskli hastalarda, özellikle TIVA veya kontrolsüz gaz pratiğinde koruyucudur.',
    pmid: '15172773',
  },
  {
    name: 'BAG-RECALL (Avidan et al., NEJM 2011)',
    population: '6.041 yüksek riskli hasta (Yalnızca volatil anestezi)',
    finding: 'BIS protokolü, alarmlı ETAG (≥ 0,7 MAC) protokolüne üstün bulunmadı (%0,24 vs %0,07).',
    takeaway: 'Volatil anestezide alarmlı ≥ 0,7 MAC ETAG izlemi farkındalık açısından BIS’e eşdeğerdir.',
    pmid: '21848460',
  },
  {
    name: 'Schuller et al. (BJA 2015)',
    population: 'İzole önkol tekniğiyle tam uyanık sağlıklı gönüllüler',
    finding: 'Hipnotik ilaç olmadan yalnızca kas gevşetici verildiğinde BIS değerleri 44–65’e kadar düştü.',
    takeaway: 'BIS algoritması EMG’ye kısmen bağımlıdır; paralize hastada ilaç iletimi (TIVA hattı / ETAG) mutlaka denetlenmelidir.',
    pmid: '26174308',
  },
  {
    name: 'ENGAGES (Wildes et al., JAMA 2019)',
    population: '1.232 yaşlı (≥ 60 yaş) majör cerrahi hastası',
    finding: 'EEG/BIS rehberliği burst supresyon süresini ve volatil dozunu azalttı, ancak postoperatif deliryumu tek başına anlamlı azaltmadı (%26 vs %23).',
    takeaway: 'Deliryum çok faktörlüdür; yine de burst supresyondan (SR > %0) kaçınmak aşırı anestezi ve hipotansiyonu önler.',
    pmid: '30721296',
  },
];

const REFERENCES = [
  {
    authors: 'Myles PS, Leslie K, McNeil J, Forbes A, Chan MTV (B-Aware Trial Group).',
    title: 'Bispectral index monitoring to prevent awareness during anaesthesia: the B-Aware randomised controlled trial.',
    journal: 'Lancet. 2004;363(9423):1757–1763.',
    pmid: '15172773',
  },
  {
    authors: 'Avidan MS, Jacobsohn E, Glick D, et al. (BAG-RECALL Research Group).',
    title: 'Prevention of intraoperative awareness in a high-risk surgical population.',
    journal: 'N Engl J Med. 2011;365(7):591–600.',
    pmid: '21848460',
  },
  {
    authors: 'Schuller PJ, Newell S, Strickland PA, Barry JJ.',
    title: 'Response of bispectral index to neuromuscular block in awake volunteers.',
    journal: 'Br J Anaesth. 2015;115(Suppl 1):i95–i103.',
    pmid: '26174308',
  },
  {
    authors: 'Purdon PL, Sampson A, Pavone KJ, Brown EN.',
    title: 'Clinical electroencephalography for anesthesiologists: Part I: Background and basic signatures.',
    journal: 'Anesthesiology. 2015;123(4):937–960.',
    pmid: '26275092',
  },
  {
    authors: 'Wildes TS, Mickle AM, Ben Abdallah A, et al. (ENGAGES Research Group).',
    title: 'Effect of electroencephalography-guided anesthetic administration on postoperative delirium among older adults undergoing major surgery.',
    journal: 'JAMA. 2019;321(5):473–483.',
    pmid: '30721296',
  },
];

export const BisMonitoringModule: React.FC<BisMonitoringModuleProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<BisPresetId>('surgical');
  const [depth, setDepth] = useState<number>(56); // 0 (awake) .. 100 (isoelectric)
  const [emgDb, setEmgDb] = useState<number>(30); // 25 .. 75 dB
  const [impedanceKohm, setImpedanceKohm] = useState<number>(4); // 2 .. 22 kΩ
  const [ketamineActive, setKetamineActive] = useState<boolean>(false);

  const applyPreset = (preset: BisPresetId) => {
    setActivePreset(preset);
    if (preset === 'awake') {
      setDepth(5);
      setEmgDb(56);
      setImpedanceKohm(4);
      setKetamineActive(false);
    } else if (preset === 'sedation') {
      setDepth(28);
      setEmgDb(40);
      setImpedanceKohm(4);
      setKetamineActive(false);
    } else if (preset === 'surgical') {
      setDepth(56);
      setEmgDb(30);
      setImpedanceKohm(3);
      setKetamineActive(false);
    } else if (preset === 'burst_suppression') {
      setDepth(85);
      setEmgDb(26);
      setImpedanceKohm(3);
      setKetamineActive(false);
    } else if (preset === 'emg_artifact') {
      setDepth(58);
      setEmgDb(68);
      setImpedanceKohm(5);
      setKetamineActive(false);
    } else if (preset === 'ketamine_paradox') {
      setDepth(56);
      setEmgDb(32);
      setImpedanceKohm(3);
      setKetamineActive(true);
    }
  };

  // Physiological EEG + BIS Model
  const sim = useMemo(() => {
    // True cortical BIS from GABAergic depth
    let trueBis = Math.round(98 - depth * 0.94);
    let sr = 0;
    if (depth > 70) {
      sr = Math.min(95, Math.round(((depth - 70) / 30) * 95));
      trueBis = Math.max(4, Math.round(38 - sr * 0.36));
    }

    // SQI drops when impedance > 7.5 kOhm or extreme EMG artifact
    const sqiPenaltyImpedance = impedanceKohm > 7 ? (impedanceKohm - 7) * 5.2 : 0;
    const sqiPenaltyEmg = emgDb > 62 ? (emgDb - 62) * 1.4 : 0;
    const sqi = Math.max(12, Math.min(100, Math.round(98 - sqiPenaltyImpedance - sqiPenaltyEmg)));

    // Displayed BIS can be falsely inflated by EMG (> 50 dB) or Ketamine gamma power
    const emgInflation = depth > 35 && emgDb > 50 ? Math.round((emgDb - 50) * 1.35) : 0;
    const ketInflation = ketamineActive && depth > 30 ? 21 : 0;
    const displayedBis = Math.min(98, Math.max(0, trueBis + emgInflation + ketInflation));

    // SEF95 (Hz)
    const baseSef = depth < 20 ? 25 - depth * 0.25 : depth < 70 ? 20 - ((depth - 20) / 50) * 10 : Math.max(4, 10 - (depth - 70) * 0.2);
    const sef95 = Math.min(30, Number((baseSef + (emgInflation > 0 ? 7.5 : 0) + (ketamineActive ? 9 : 0)).toFixed(1)));

    const isLowSqi = sqi < 50;
    const isEmgSpurious = emgInflation >= 10;
    const isKetSpurious = ketamineActive && depth > 30;

    let clinicalState: 'awake' | 'sedation' | 'surgical' | 'deep' | 'artifact' = 'surgical';
    let stateTitle = 'Hedef Cerrahi Anestezi (BIS 40–60)';
    let stateAdvice =
      'Frontal yavaş/delta (0,1–4 Hz) ve tutarlı alfa bandı (8–12 Hz) mevcut, SR = %0. Mevcut hipnotik idame düzeyi dengelidir.';

    if (isLowSqi) {
      clinicalState = 'artifact';
      stateTitle = `Düşük Sinyal Kalitesi (SQI %${sqi}) — BIS Güvenilmez`;
      stateAdvice =
        'Elektrot impedansı yüksek veya temas gevşek. Bu BIS değerine göre ilaç dozunu değiştirmeyin; alnı alkolle silip her 4 elektrota 5 sn bastırın.';
    } else if (isEmgSpurious) {
      clinicalState = 'artifact';
      stateTitle = `EMG Artifaktı ile Sahte Yüksek BIS (Görünen ${displayedBis} / Kortikal ~${trueBis})`;
      stateAdvice =
        'Ham EEG yavaş ve uyumlu olmasına rağmen yüksek frontalis EMG (> 50 dB) BIS’i yapay olarak yukarı çekiyor. Önce hipnotik bolusu değil; analjezi, ısıtma/titreme veya gerekiyorsa NMB değerlendirin.';
    } else if (isKetSpurious) {
      clinicalState = 'artifact';
      stateTitle = `Ketamin Paradoksu (Görünen ${displayedBis} / Kortikal ~${trueBis})`;
      stateAdvice =
        'Ketamin 25–40 Hz gama aktivitesi yaratarak BIS’i yükseltir. ETAG/propofol infüzyonu ve klinik yanıt uygunsa yalnızca BIS’i düşürmek için anestezik derinliğini artırmayın.';
    } else if (displayedBis >= 80) {
      clinicalState = 'awake';
      stateTitle = 'Uyanık Durum (BIS 80–100)';
      stateAdvice =
        'Düşük amplitüdlü, hızlı beta/gama desenkronize EEG hakimdir. Cerrahi başlangıcı öncesi indüksiyon/hipnotik derinlik henüz sağlanmamıştır.';
    } else if (displayedBis > 60) {
      clinicalState = 'sedation';
      stateTitle = 'Hafif–Orta Sedasyon / Yüzeyel Anestezi (BIS 61–79)';
      stateAdvice =
        'Genel anestezi altındaki paralize bir hastada intraoperatif farkındalık riski artar! TIVA damar yolunu, pompa akışını veya volatil ETAG konsantrasyonunu derhal kontrol edin.';
    } else if (displayedBis < 40 || sr > 0) {
      clinicalState = 'deep';
      stateTitle = sr > 0 ? `Aşırı Derin Anestezi · Burst Supresyon (SR %${sr})` : 'Derin Anestezi Bandı (BIS < 40)';
      stateAdvice =
        sr > 0
          ? 'EEG’de izoelektrik düz çizgiler mevcut! Önce hipotansiyon/serebral hipoperfüzyon ve hipotermiyi dışlayın; ardından hipnotik dozu kademeli azaltın.'
          : 'Gereğinden derin anestezi hipotansiyon ve uzamış derlenmeye yol açar. Cerrahi uyaran düşükse hipnotik infüzyonu/MAC’ı hafifçe titre edin.';
    }

    // Band power distribution for DSA visualization (0..1 normalized)
    const slowDelta = depth < 15 ? 0.18 : depth < 72 ? Math.min(0.96, 0.25 + depth * 0.011) : Math.max(0.15, 0.9 - sr * 0.008);
    const theta = depth < 25 ? 0.15 : depth < 70 ? 0.42 : 0.16;
    const alpha = depth >= 35 && depth <= 72 ? 0.92 : depth < 35 ? 0.35 : 0.18;
    const betaGamma =
      ketamineActive || emgDb > 55
        ? 0.88
        : depth < 25
          ? 0.82
          : depth < 40
            ? 0.52
            : 0.14;

    return {
      trueBis,
      displayedBis,
      sr,
      sqi,
      sef95,
      clinicalState,
      stateTitle,
      stateAdvice,
      bands: { slowDelta, theta, alpha, betaGamma },
    };
  }, [depth, emgDb, impedanceKohm, ketamineActive]);

  // Procedural deterministic Raw EEG SVG Path (4-second window)
  const rawEegPath = useMemo(() => {
    const startX = 14;
    const endX = 546;
    const midY = 66;
    const steps = 260;
    const pts: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps; // 0..1 (~4 sec window)
      const x = startX + t * (endX - startX);

      // Burst suppression mask when SR > 0
      let burstEnv = 1;
      if (sim.sr > 0) {
        const cycle = (t * 2.2) % 1;
        const activeFrac = Math.max(0.12, 1 - sim.sr / 100);
        burstEnv = cycle < activeFrac ? 1 : 0.04;
      }

      const slowWave =
        sim.bands.slowDelta * 26 * Math.sin(2 * Math.PI * 3.2 * t + 0.4) +
        sim.bands.slowDelta * 11 * Math.sin(2 * Math.PI * 5.8 * t + 1.3);
      const alphaWave =
        sim.bands.alpha * 13 * Math.sin(2 * Math.PI * 22 * t) * (0.65 + 0.35 * Math.sin(2 * Math.PI * 2.5 * t));
      const fastWave =
        sim.bands.betaGamma * 9 * Math.sin(2 * Math.PI * 58 * t) +
        sim.bands.betaGamma * 5 * Math.cos(2 * Math.PI * 92 * t);
      const emgNoise =
        emgDb > 48
          ? ((emgDb - 48) / 27) * 14 * Math.sin(2 * Math.PI * 137 * t) * Math.cos(2 * Math.PI * 63 * t)
          : 0;

      const y = midY - ((slowWave + alphaWave + fastWave) * burstEnv + emgNoise);
      const clampedY = Math.max(12, Math.min(120, y));
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${clampedY.toFixed(1)}`);
    }

    return pts.join(' ');
  }, [sim.sr, sim.bands, emgDb]);

  // DSA (Density Spectral Array) horizontal columns across time
  const dsaColumns = useMemo(() => {
    const cols = 32;
    const rows = [
      { label: '20–30 Hz', key: 'betaGamma' as const, power: sim.bands.betaGamma },
      { label: '8–14 Hz (Alfa)', key: 'alpha' as const, power: sim.bands.alpha },
      { label: '4–8 Hz (Teta)', key: 'theta' as const, power: sim.bands.theta },
      { label: '0,5–4 Hz (Delta)', key: 'slowDelta' as const, power: sim.bands.slowDelta },
    ];
    return { cols, rows };
  }, [sim.bands]);

  const dsaColor = (power: number, suppressed: boolean): string => {
    if (suppressed) return isDark ? '#0f172a' : '#1e293b';
    if (power > 0.78) return '#ef4444'; // Hot red power band
    if (power > 0.56) return '#f59e0b'; // Warm amber
    if (power > 0.36) return '#10b981'; // Mid emerald
    if (power > 0.2) return '#0284c7'; // Cool blue
    return '#1e3a8a'; // Deep cold navy
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* EDITORIAL HEADER */}
      <header className={`pb-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="text-violet-600 dark:text-violet-400 font-semibold">Anestezi Derinliği Monitörizasyonu</span>
          <span aria-hidden="true">·</span>
          <span>İşlenmiş Frontal EEG (pEEG)</span>
          <span aria-hidden="true">·</span>
          <span>BIS / EMG / SQI / SR / DSA</span>
        </div>

        <h1 className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${isDark ? 'text-white' : 'text-slate-900'}`}>
          BIS Monitörizasyonu (Bispektral İndeks ve İşlenmiş EEG)
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Bispektral İndeks (BIS), frontal korteksten kaydedilen tek kanallı elektroensefalogramı (EEG) zaman, frekans
          ve bispektral faz analizinden geçirerek <strong>0–100</strong> arası boyutsuz bir hipnoz indeksine indirger.
          Güvenli kullanımın altın kuralı: <strong>Tek başına BIS rakamını değil; ham EEG dalgasını, EMG çubuğunu,
          SQI’yı ve Burst Supresyon Oranını (SR) birlikte okumaktır.</strong>
        </p>

        <nav aria-label="Bölüm geçişleri" className="mt-5 flex flex-wrap items-center gap-2">
          {[
            { id: 'bis-01', label: '01. Algoritma ve 4 Gösterge' },
            { id: 'bis-02', label: '02. Canlı EEG / DSA Laboratuvarı' },
            { id: 'bis-03', label: '03. Quatro Sensör Kurulumu' },
            { id: 'bis-04', label: '04. İlaç İmzaları ve Tuzaklar' },
            { id: 'bis-05', label: '05. Klinik Kanıtlar ve Karar' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-violet-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-violet-400'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. ALGORİTMA FİZİĞİ VE 4 ZORUNLU GÖSTERGE                            */}
      {/* ===================================================================== */}
      <section id="bis-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. BIS Skalasının Ardındaki 4 Alt Parametre ve Yardımcı Göstergeler
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Anestezi derinleştikçe kortikal nöronlar desenkronize hızlı ateşlemeden (Beta/Gama) senkronize yavaş
            osilasyonlara (Alfa + Delta) ve sonunda elektriksel sessizliğe (Burst Supresyon) geçer. BIS algoritması
            her derinlik bandında farklı bir matematiksel alt parametreyi ağırlıklandırır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: 4 Sub-parameters + Scale */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-slate-800 bg-slate-900/80 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                    <th className="py-2.5 px-3.5 font-semibold">BIS Aralığı</th>
                    <th className="py-2.5 px-3.5 font-semibold">Klinik Durum</th>
                    <th className="py-2.5 px-3.5 font-semibold">Baskın Alt Parametre &amp; EEG</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                  <tr>
                    <td className="py-2.5 px-3.5 font-mono tabular-nums font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">80 – 100</td>
                    <td className="py-2.5 px-3.5 font-semibold">Uyanık</td>
                    <td className="py-2.5 px-3.5"><strong>BetaRatio</strong> baskın · Düşük amplitüdlü hızlı Beta/Gama (15–40 Hz)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">60 – 80</td>
                    <td className="py-2.5 px-3.5 font-semibold">Hafif–Orta Sedasyon</td>
                    <td className="py-2.5 px-3.5"><strong>BetaRatio → SynchFastSlow</strong> geçişi · Genel anestezide farkındalık riski</td>
                  </tr>
                  <tr className={isDark ? 'bg-emerald-950/20' : 'bg-emerald-50/50'}>
                    <td className="py-2.5 px-3.5 font-mono tabular-nums font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">40 – 60</td>
                    <td className="py-2.5 px-3.5 font-bold text-emerald-800 dark:text-emerald-300">Hedef Cerrahi Anestezi</td>
                    <td className="py-2.5 px-3.5"><strong>SynchFastSlow</strong> baskın · Yüksek amplitüdlü Yavaş/Delta + 8–12 Hz Alfa</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-mono tabular-nums font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap">20 – 40</td>
                    <td className="py-2.5 px-3.5 font-semibold">Derin Hipnoz / Supresyon</td>
                    <td className="py-2.5 px-3.5"><strong>BSR / QUAZI</strong> devreye girer · Aralıklı izoelektrik sessizlik (SR &gt; %0)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-mono tabular-nums font-bold text-rose-700 dark:text-rose-300 whitespace-nowrap">0 – 20</td>
                    <td className="py-2.5 px-3.5 font-semibold">Ağır Burst Supresyon / İzoelektrik</td>
                    <td className="py-2.5 px-3.5"><strong>SR &gt; %40</strong> iken doğrusal formül: <span className="font-mono">BIS ≈ 50 − (SR / 2)</span>; 0 = düz EEG</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={`rounded-xl border p-4 text-xs leading-relaxed ${isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>İşleme Gecikmesi (Processing Lag — 15 ila 30 saniye): </strong>
              BIS değeri anlık değildir; son 15–60 saniyelik veri penceresinin ortalamasını yansıtır. İndüksiyonda hasta
              bilincini kaybettikten 20–30 sn sonra BIS düşer; aynı şekilde cerrahi uyaranla ani uyanışta da BIS geç yükselir.
            </div>
          </div>

          {/* Right: 4 Mandatory Companion Indices */}
          <div className={`lg:col-span-5 rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              BIS Ekranında Birlikte Okunması Zorunlu 4 Gösterge
            </div>

            {[
              {
                code: 'SQI',
                range: 'Hedef > %80 (Min %50)',
                desc: 'Sinyal Kalite İndeksi. Elektrot impedansı ve artifakt oranını ölçer. SQI < %50 iken BIS rakamı güvenilmezdir; < %15 iken silinir.',
              },
              {
                code: 'EMG',
                range: 'Hedef < 40–45 dB',
                desc: '70–110 Hz bandındaki frontalis kas aktivitesi. > 50–55 dB olduğunda yüksek frekanslı EEG gibi algılanır ve BIS’i sahte yükseltir.',
              },
              {
                code: 'SR (BSR)',
                range: 'Hedef %0',
                desc: 'Son 63 saniyede izoelektrik (< ±5 µV) geçen zaman yüzdesi. SR > %0 aşırı derin anestezi veya serebral hipoperfüzyon alarmıdır.',
              },
              {
                code: 'SEF95',
                range: 'Cerrahi: 8–13 Hz',
                desc: 'Spektral Kenar Frekansı (%95 güç sınırı). EMG’den daha az etkilenen ek frekans göstergesidir; uyanıklıkta 20–28 Hz’ye çıkar.',
              },
            ].map((item) => (
              <div key={item.code} className={`pt-2.5 first:pt-0 border-t first:border-t-0 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-xs text-violet-600 dark:text-violet-400">{item.code}</span>
                  <span className="font-mono tabular-nums text-[11px] font-semibold text-slate-500 dark:text-slate-400">{item.range}</span>
                </div>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI BIS / HAM EEG / SPEKTROGRAM (DSA) LABORATUVARI              */}
      {/* ===================================================================== */}
      <section id="bis-02" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            02. Canlı BIS, Ham EEG ve Spektrogram (DSA) Laboratuvarı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Aşağıdaki klinik senaryoları seçerek veya kaydırıcıları hareket ettirerek anestezi derinliği, EMG artifaktı
            ve ketaminin <strong>BIS rakamı</strong>, <strong>ham EEG dalgası</strong> ve <strong>DSA renk haritası</strong>{' '}
            üzerindeki ayrışmasını canlı gözlemleyin.
          </p>
        </div>

        {/* 6 Clinical Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'awake', label: 'Uyanık (BIS ~95)' },
            { id: 'sedation', label: 'Hafif Sedasyon (BIS ~72)' },
            { id: 'surgical', label: 'Cerrahi Hedef (BIS ~45)' },
            { id: 'burst_suppression', label: 'Burst Supresyon (SR ↑)' },
            { id: 'emg_artifact', label: 'Tuzak: Yüksek EMG' },
            { id: 'ketamine_paradox', label: 'Tuzak: Ketamin Eklendi' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as BisPresetId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-violet-600 border-violet-500 text-white'
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
          {/* LEFT STAGE: Monitor Telemetry + Raw EEG + DSA */}
          <div className={`lg:col-span-8 rounded-xl border p-4 sm:p-5 space-y-5 ${isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/70 border-slate-200'}`}>
            {/* Monitor Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <div className={`p-3 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">BIS</div>
                <div
                  className={`mt-0.5 text-3xl font-mono font-bold tabular-nums leading-none ${
                    sim.clinicalState === 'surgical'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : sim.clinicalState === 'deep' || sim.clinicalState === 'artifact'
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {sim.sqi < 15 ? '--' : sim.displayedBis}
                </div>
              </div>
              <div className={`p-3 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">SQI</div>
                <div className={`mt-1 text-lg font-mono font-bold tabular-nums ${sim.sqi < 50 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  %{sim.sqi}
                </div>
              </div>
              <div className={`p-3 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">EMG</div>
                <div className={`mt-1 text-lg font-mono font-bold tabular-nums ${emgDb > 50 ? 'text-amber-500' : isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {emgDb} dB
                </div>
              </div>
              <div className={`p-3 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">SR (BSR)</div>
                <div className={`mt-1 text-lg font-mono font-bold tabular-nums ${sim.sr > 0 ? 'text-rose-500' : 'text-teal-600 dark:text-teal-400'}`}>
                  %{sim.sr}
                </div>
              </div>
              <div className={`col-span-2 sm:col-span-1 p-3 rounded-lg border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">SEF95</div>
                <div className={`mt-1 text-lg font-mono font-bold tabular-nums ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
                  {sim.sef95} Hz
                </div>
              </div>
            </div>

            {/* Raw Frontal EEG Trace */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Ham Frontal EEG Trasesi (4 sn pencere · ±50 µV)
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  Kortikal Durum ≈ BIS {sim.trueBis} {ketamineActive ? '· Ketamin Gama (+)' : ''}
                </span>
              </div>
              <svg
                viewBox="0 0 560 132"
                className={`w-full h-auto rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-800'}`}
                role="img"
                aria-label="Ham frontal EEG dalga formu simülasyonu"
              >
                {/* Reference grid */}
                {[26, 66, 106].map((y) => (
                  <line
                    key={y}
                    x1="14"
                    y1={y}
                    x2="546"
                    y2={y}
                    stroke="#1e293b"
                    strokeDasharray={y === 66 ? undefined : '3 4'}
                    strokeWidth="1"
                  />
                ))}
                <text x="18" y="20" fontSize="9" fontFamily="ui-monospace, monospace" fill="#64748b">+50 µV</text>
                <text x="18" y="122" fontSize="9" fontFamily="ui-monospace, monospace" fill="#64748b">−50 µV</text>
                <path
                  d={rawEegPath}
                  fill="none"
                  stroke={sim.sr > 0 ? '#fb7185' : emgDb > 55 ? '#fbbf24' : '#34d399'}
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Density Spectral Array (DSA) */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Yoğunluk Spektral Dizisi (DSA · Frekans Bandı Güç Haritası)
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Mavi: Düşük Güç · Kırmızı: Yüksek Güç · Siyah: Supresyon
                </span>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 space-y-1.5">
                {dsaColumns.rows.map((row, rIdx) => (
                  <div key={row.key} className="grid grid-cols-12 items-center gap-2">
                    <span className="col-span-3 sm:col-span-2 text-[10px] font-mono text-slate-400 whitespace-nowrap">
                      {row.label}
                    </span>
                    <div className="col-span-9 sm:col-span-10 grid grid-cols-16 gap-0.5 h-5">
                      {Array.from({ length: 16 }).map((_, cIdx) => {
                        const isSuppressedGap =
                          sim.sr > 0 && ((cIdx + rIdx) % 4 === 1 || (sim.sr > 50 && cIdx % 2 === 0));
                        const jitter = Math.sin(cIdx * 1.9 + rIdx * 2.3) * 0.08;
                        return (
                          <div
                            key={cIdx}
                            className="h-full rounded-[2px]"
                            style={{
                              backgroundColor: dsaColor(
                                Math.max(0, Math.min(1, row.power + jitter)),
                                isSuppressedGap
                              ),
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <p className={`mt-2 text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <strong>Purdon–Brown İmzası:</strong> İdeal Propofol/Sevofluran anestezisinde DSA’da iki paralel sıcak
                şerit görülür — alt kenarda <strong>Yavaş/Delta (0,5–4 Hz)</strong> ve ortada kesintisiz{' '}
                <strong>Alfa bandı (8–12 Hz)</strong>. Alfa şeridi kaybolup siyah dikey yarıklar belirdiğinde beyin
                burst supresyona girmiştir.
              </p>
            </div>
          </div>

          {/* RIGHT CONTROL DECK */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`rounded-xl border p-4 space-y-4 ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Sliders className="w-4 h-4 text-violet-500" />
                <span>Simülatör Kontrolleri</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="bis-depth" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    GABAerjik Anestezi Derinliği
                  </label>
                  <span className="font-mono tabular-nums font-bold text-violet-600 dark:text-violet-400">
                    %{depth}
                  </span>
                </div>
                <input
                  id="bis-depth"
                  type="range"
                  min={0}
                  max={96}
                  step={2}
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full accent-violet-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Uyanık</span>
                  <span>Cerrahi</span>
                  <span>İzoelektrik</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="bis-emg" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Frontalis EMG Aktivitesi
                  </label>
                  <span className="font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400">
                    {emgDb} dB
                  </span>
                </div>
                <input
                  id="bis-emg"
                  type="range"
                  min={25}
                  max={75}
                  step={1}
                  value={emgDb}
                  onChange={(e) => setEmgDb(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>25 dB (Sessiz)</span>
                  <span>50 dB (Eşik)</span>
                  <span>75 dB (Yüksek)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="bis-imp" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Elektrot İmpedansı
                  </label>
                  <span className="font-mono tabular-nums font-bold text-sky-600 dark:text-sky-400">
                    {impedanceKohm} kΩ
                  </span>
                </div>
                <input
                  id="bis-imp"
                  type="range"
                  min={2}
                  max={22}
                  step={1}
                  value={impedanceKohm}
                  onChange={(e) => setImpedanceKohm(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>&lt; 5 kΩ (İdeal)</span>
                  <span>10 kΩ (Sınır)</span>
                  <span>22 kΩ (Kötü)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setKetamineActive((v) => !v)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center justify-between ${
                  ketamineActive
                    ? isDark
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                      : 'bg-rose-50 border-rose-300 text-rose-800'
                    : isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Ketamin Adjuvanı (Gama Etkisi)</span>
                <span className="font-mono font-bold">{ketamineActive ? 'AÇIK' : 'KAPALI'}</span>
              </button>
            </div>

            {/* Explicit Clinical Interpretation Box */}
            <div
              className={`rounded-xl border p-4 text-xs leading-relaxed space-y-2 ${
                sim.clinicalState === 'surgical'
                  ? isDark
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : sim.clinicalState === 'deep' || sim.clinicalState === 'artifact'
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                    : isDark
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {sim.clinicalState === 'surgical' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : sim.clinicalState === 'deep' || sim.clinicalState === 'artifact' ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>{sim.stateTitle}</span>
              </div>
              <p>{sim.stateAdvice}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 03. QUATRO SENSÖR YERLEŞİMİ VE SİNYAL HAZIRLIĞI                       */}
      {/* ===================================================================== */}
      <section id="bis-03" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            03. 4 Elektrotlu Quatro Sensör Yerleşimi ve Kurulum Disiplini
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            EEG sinyali mikrovolt (µV) düzeyindedir — EKG’den yaklaşık <strong>100 kat daha zayıftır</strong>. Hatalı
            cilt hazırlığı veya yanlış elektrot açısı yüksek impedansa, düşük SQI’ya ve koter/EMG gürültüsüne yol açar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Anatomical Forehead Placement Diagram SVG */}
          <div className={`lg:col-span-6 rounded-xl border p-4 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'}`}>
            <svg
              viewBox="0 0 420 230"
              className="w-full h-auto"
              role="img"
              aria-label="BIS Quatro 4 elektrotlu alın ve şakak yerleşim şeması"
            >
              {/* Stylized head & brow contour */}
              <path
                d="M 105 185 C 96 135, 98 65, 138 38 C 175 14, 245 14, 282 38 C 322 65, 324 135, 315 185"
                fill={isDark ? '#0f172a' : '#ffffff'}
                stroke={isDark ? '#334155' : '#cbd5e1'}
                strokeWidth="2"
              />
              {/* Eyebrows */}
              <path d="M 135 128 Q 162 118, 190 128" fill="none" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="3" strokeLinecap="round" />
              <path d="M 230 128 Q 258 118, 285 128" fill="none" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="3" strokeLinecap="round" />
              {/* Eyes & Nose bridge */}
              <ellipse cx="163" cy="146" rx="16" ry="7" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
              <ellipse cx="257" cy="146" rx="16" ry="7" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
              <path d="M 210 132 L 204 176 Q 210 182, 216 176" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />

              {/* Sensor Strip Outline connecting 1 -> 2 -> 4 -> 3 */}
              <path
                d="M 210 74 L 244 82 L 274 96 L 304 128"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.22"
              />
              <path
                d="M 210 74 L 244 82 L 274 96 L 304 128"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Electrode 1 (Mid-forehead, ~5 cm above nasion) */}
              <circle cx="210" cy="74" r="11" fill="#7c3aed" />
              <text x="210" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff" fontFamily="ui-monospace, monospace">1</text>

              {/* Electrode 2 (Ground / Reference) */}
              <circle cx="244" cy="82" r="10" fill="#0d9488" />
              <text x="244" y="86" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#ffffff" fontFamily="ui-monospace, monospace">2</text>

              {/* Electrode 4 (Outer eyebrow / EMG reference) */}
              <circle cx="274" cy="96" r="10" fill="#f59e0b" />
              <text x="274" y="100" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#ffffff" fontFamily="ui-monospace, monospace">4</text>

              {/* Electrode 3 (Temple, between outer canthus and hairline) */}
              <circle cx="304" cy="128" r="11" fill="#0284c7" />
              <text x="304" y="132" textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff" fontFamily="ui-monospace, monospace">3</text>

              {/* Callout annotations */}
              <text x="16" y="64" fontSize="10.5" fontWeight="700" fill={isDark ? '#c4b5fd' : '#5b21b6'}>1 · Orta Alın (Aktif)</text>
              <text x="16" y="77" fontSize="9.5" fill={isDark ? '#94a3b8' : '#64748b'}>Burun kökünün ~5 cm üstü</text>
              <line x1="145" y1="70" x2="198" y2="73" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1" />

              <text x="16" y="106" fontSize="10.5" fontWeight="700" fill={isDark ? '#5eead4' : '#0f766e'}>2 · Toprak (Ground)</text>
              <text x="16" y="119" fontSize="9.5" fill={isDark ? '#94a3b8' : '#64748b'}>1 ile 4 arasında alın düzlemi</text>

              <text x="324" y="88" fontSize="10.5" fontWeight="700" fill={isDark ? '#fbbf24' : '#b45309'}>4 · Kaş Dışı</text>
              <text x="324" y="101" fontSize="9.5" fill={isDark ? '#94a3b8' : '#64748b'}>EMG &amp; Referans</text>

              <text x="324" y="134" fontSize="10.5" fontWeight="700" fill={isDark ? '#38bdf8' : '#0369a1'}>3 · Şakak</text>
              <text x="324" y="147" fontSize="9.5" fill={isDark ? '#94a3b8' : '#64748b'}>Dış kantus–saç çizgisi</text>

              <text x="210" y="214" textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill={isDark ? '#94a3b8' : '#64748b'}>
                Hedef İmpedans &lt; 5 kΩ (Üst sınır 10 kΩ) · Kıllı/yağlı bölgeye yapıştırmayın
              </text>
            </svg>
          </div>

          {/* 4-Step Practical Setup Discipline */}
          <div className="lg:col-span-6 space-y-3">
            {[
              {
                step: '1. Alkol Temizliği ve Tam Kurutma',
                detail: 'Alın ve şakağı %70 alkollü pedle yağdan arındırın ve tamamen kurumasını bekleyin (ıslak alkol elektrot jelini bozar).',
              },
              {
                step: '2. 5 Saniye Sabit Parmak Basısı',
                detail: 'Sensörü yerleştirdikten sonra 1, 2, 4 ve 3 numaralı dairelerin tam ortasına değil kenar halkalarına beşer saniye sıkıca bastırarak mikro-dişlerin stratum korneumla temasını sağlayın.',
              },
              {
                step: '3. İndüksiyon Öncesi Bazal Kayıt',
                detail: 'Sensörü hasta henüz uyanıkken takın (bazal BIS 93–98 ve temiz SQI teyidi). İndüksiyondan sonra yapıştırılan sensörde teknik arıza ile derin anestezi ayrımı zorlaşır.',
              },
              {
                step: '4. Bilateral Sensör Ne Zaman?',
                detail: 'Karotis endarterektomisi, arkus aort cerrahisi veya serebral iskemi riskinde bilateral BIS sensörü hemisferler arası ani asimetriyi (tek taraflı hipoperfüzyon) yakalar.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`rounded-xl border p-3.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}
              >
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.step}</div>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. ANESTEZİK AJAN İMZALARI & SAHTE YÜKSEK / DÜŞÜK TUZAKLARI          */}
      {/* ===================================================================== */}
      <section id="bis-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. İlaçlara Göre BIS Güvenilirliği ve Klinik Tuzaklar
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            BIS tüm anesteziklere eşit yanıt vermez; esas olarak <strong>GABAerjik ajanlar</strong> için kalibre
            edilmiştir. NMDA antagonistleri, α₂ agonistleri ve kas gevşeticiler rakamı ters yöne saptırabilir.
          </p>
        </div>

        {/* Agent Reliability Table */}
        <div className={`rounded-xl border overflow-x-auto ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 bg-slate-900/80 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                <th className="py-3 px-4 font-semibold">Ajan / Sınıf</th>
                <th className="py-3 px-4 font-semibold">Güvenilirlik</th>
                <th className="py-3 px-4 font-semibold">Baskın EEG İmzası</th>
                <th className="py-3 px-4 font-semibold">Yatak Başı Klinik Yorum</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {AGENT_ROWS.map((row) => (
                <tr key={row.agent} className="align-top">
                  <td className="py-3 px-4 min-w-[190px]">
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.agent}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{row.mechanism}</div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        row.bisReliability === 'high'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : row.bisReliability === 'caution'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {row.reliabilityLabel}
                    </span>
                  </td>
                  <td className="py-3 px-4 leading-relaxed min-w-[210px]">{row.eegSignature}</td>
                  <td className="py-3 px-4 leading-relaxed min-w-[230px]">{row.clinicalNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Spurious High vs Spurious Low BIS Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-xl border p-4 space-y-2.5 ${isDark ? 'bg-amber-950/20 border-amber-500/35' : 'bg-amber-50/70 border-amber-200'}`}>
            <div className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Sahte Yüksek BIS Nedenleri (Gereksiz Doz Artışından Kaçın!)</span>
            </div>
            <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li><strong>Yüksek Frontalis EMG / Titreme:</strong> Yüz kas aktivitesi 70–110 Hz gürültüyle BIS’i 65–85’e taşır.</li>
              <li><strong>Elektromanyetik &amp; Mekanik Artifakt:</strong> Elektrokoter, baş-boyun ısıtma battaniyesi (Bair Hugger) titreşimi, yüksek frekanslı kardiyak pacemaker, endoskopik shaver.</li>
              <li><strong>Farmakolojik Paradoks:</strong> Ketamin (gama artışı), N₂O, halotan, yüksek doz katekolamin/efedrin.</li>
              <li><strong>Ağır Yaşlılık / Düşük Voltajlı EEG:</strong> İnce alfa bandı nedeniyle bazen bazal sapmalar görülebilir.</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'}`}>
            <div className="flex items-center gap-2 text-sm font-bold text-rose-700 dark:text-rose-300">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Sahte veya Patolojik Düşük BIS Nedenleri (Önce Perfüzyonu Dışla!)</span>
            </div>
            <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li><strong>Serebral Hipoperfüzyon / İskemi (KIRMIZI BAYRAK):</strong> Ani hipotansiyon, kardiyak arrest, karotis klempleme veya KPB pompa akım düşüşünde BIS saniyeler içinde çakılır!</li>
              <li><strong>Derin Hipotermi:</strong> Her 1 °C vücut ısısı düşüşü BIS’i ortalama ~1,1 puan düşürür (KPB derin hipotermide SR yükselir).</li>
              <li><strong>NMB Sonrası EMG Kaybı (Schuller):</strong> Paralize hastada EMG’nin sıfırlanması BIS’i yapay düşürür; uyanıklığı maskeleyebilir.</li>
              <li><strong>Metabolik &amp; Nörolojik Nedenler:</strong> Ağır hipoglisemi, postiktal dönem, ileri demans, ağır hepatik/üremik ensefalopati, deksmedetomidin.</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. KLİNİK KANITLAR, ENDİKASYONLAR VE KAYNAKLAR                       */}
      {/* ===================================================================== */}
      <section id="bis-05" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            05. Dönüm Noktası Klinik Çalışmalar ve Endikasyon Özeti
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Güncel kılavuzlar (NAP5, AAGBI, ESAIC) özellikle <strong>TIVA + nöromüsküler bloker</strong> uygulanan tüm
            hastalarda işlenmiş EEG (BIS/SedLine/Entropy) kullanımını güçlü biçimde önerir; çünkü TIVA’da end-tidal
            ajan monitörizasyonu yoktur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LANDMARK_TRIALS.map((trial) => (
            <div
              key={trial.name}
              className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{trial.name}</h3>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${trial.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-[11px] font-mono font-semibold text-violet-600 dark:text-violet-400 hover:underline whitespace-nowrap shrink-0"
                >
                  <span>PMID: {trial.pmid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{trial.population}</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{trial.finding}</p>
              <div className={`pt-2 border-t text-xs font-medium ${isDark ? 'border-slate-800 text-violet-300' : 'border-slate-100 text-violet-800'}`}>
                <strong>Klinik Mesaj:</strong> {trial.takeaway}
              </div>
            </div>
          ))}
        </div>

        {/* Rapid Bedside Action Rule */}
        <div className={`rounded-xl border p-4 sm:p-5 space-y-3 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'}`}>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Brain className="w-4 h-4 text-violet-500" />
            <span>Ameliyathanede 30 Saniyelik BIS Kontrol Protokolü</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
              <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">BIS &gt; 60 Yükselirse</div>
              1. SQI ve EMG’ye bak (koter/titreme?). 2. TIVA IV hattını ve pompa bağlantısını kontrol et; volatilde ETAG ≥ 0,7 MAC mı doğrula. 3. Gerçek yüzeyelleşme ise hipnotik + analjeziyi artır.
            </div>
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
              <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">BIS &lt; 35 veya SR &gt; %0 İse</div>
              1. Önce kan basıncı (MAP), kalp debisi ve serebral perfüzyonu kontrol et! 2. Hipotermi/hipoglisemiyi dışla. 3. Hemodinami stabilse hipnotik dozu kademeli azaltarak SR’yi %0’a getir.
            </div>
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">Öncelikli Kullanım Alanları</div>
              TIVA + NMB (zorunlu standart), geçmişte farkındalık öyküsü, kardiyak/travma/sezaryen genel anestezisi, kırılgan geriatrik hastalar ve kronik alkol/opioid toleransı.
            </div>
          </div>
        </div>

        {/* Verified Literature */}
        <footer className={`pt-4 border-t space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`flex items-center gap-2 text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <BookOpen className="w-4 h-4 text-violet-500" />
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
                  className="inline-flex items-center gap-0.5 font-mono font-semibold text-violet-600 dark:text-violet-400 hover:underline ml-1"
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
