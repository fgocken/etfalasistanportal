import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  ShieldAlert,
  Sliders,
} from 'lucide-react';

interface NirsCerebralOximetryModuleProps {
  isDark: boolean;
}

type NirsPresetId =
  | 'baseline'
  | 'beach_chair'
  | 'carotid_clamp'
  | 'hyperventilation'
  | 'hemorrhage'
  | 'hypothermic_cpb';

interface DenaultStep {
  id: string;
  order: string;
  title: string;
  target: string;
  detail: string;
}

const DENAULT_STEPS: DenaultStep[] = [
  {
    id: 'head_cannula',
    order: '01',
    title: 'Baş Pozisyonu ve Vasküler Kanül Kontrolü',
    target: 'Mekanik obstrüksiyonu dışla',
    detail:
      'Boyun aşırı rotasyon/fleksiyonu internal jugüler ven drenajını veya karotis akımını bozar. KPB sırasında tek taraflı ani düşüşte aortik/venöz kanül malpozisyonunu derhal cerraha bildir.',
  },
  {
    id: 'map',
    order: '02',
    title: 'Ortalama Arter Basıncını (MAP) Optimize Et',
    target: 'MAP ≥ bazal / ≥ 65–75 mmHg',
    detail:
      'Serebral otoregülasyon alt sınırının (LLA) altına inildiyse vazopresör veya sıvı ile MAP’ı artır. Fenilefrinin kutanöz vazokonstriksiyon ve CO düşüşüyle rSO₂’yi paradoksal azaltabileceğini unutma.',
  },
  {
    id: 'oxygenation',
    order: '03',
    title: 'Arteriyel Oksijenasyonu (SpO₂ / FiO₂) Kontrol Et',
    target: 'SpO₂ ≥ %95 · ETT & Devre doğrulama',
    detail:
      'FiO₂’yi geçici artır, endotrakeal tüp pozisyonunu (sağ ana bronş entübasyonu, kinking) ve oksijenatör gaz akışını (KPB’de FiO₂/sweep) doğrula.',
  },
  {
    id: 'paco2',
    order: '04',
    title: 'PaCO₂ ve Ventilasyonu Düzelt (Hipokapniyi Önle)',
    target: 'PaCO₂ 35–45 mmHg (Normokapni)',
    detail:
      'Her 1 mmHg PaCO₂ düşüşü serebral kan akımını ~%3–4 azaltır. İstenmeyen hiperventilasyon (EtCO₂ < 32 mmHg) serebral vazokonstriksiyon yaparak rSO₂’yi hızla düşürür.',
  },
  {
    id: 'hemoglobin',
    order: '05',
    title: 'Hemoglobin (CaO₂) ve Hemodilüsyonu Değerlendir',
    target: 'Hb ≥ 7–8 g/dL (KPB / yüksek riskte bireyselleştir)',
    detail:
      'Ciddi akut kanama veya KPB prime hemodilüsyonu arteriyel oksijen içeriğini (CaO₂) düşürür. Diğer basamaklar normalken dirençli desatürasyonda eritrosit replasmanı düşün.',
  },
  {
    id: 'cardiac_output',
    order: '06',
    title: 'Kardiyak Debiyi (CO) veya KPB Pompa Akımını Artır',
    target: 'CI ≥ 2.2–2.4 L/dk/m²',
    detail:
      'Normal MAP altında bile düşük kardiyak debi serebral venöz desatürasyon yaratır. Önyük, inotropi, ritim (AF/bradikardi) veya KPB pompa debisini (2.4–2.6 L/dk/m²) optimize et.',
  },
  {
    id: 'cmro2',
    order: '07',
    title: 'Serebral Oksijen Tüketimini (CMRO₂) Azalt',
    target: 'Normotermi · Yeterli Hipnoz · Nöbet Kontrolü',
    detail:
      'Ateş/hipertermi (her +1°C CMRO₂’yi ~%6–7 artırır), yüzeyel anestezi/ağrı veya non-konvülzif nöbet oksijen talebini fırlatır. Soğutma sağla ve pEEG (BIS/PSI) eşliğinde anesteziyi derinleştir.',
  },
];

const SPO2_VS_NIRS_ROWS = [
  {
    criterion: 'Temel Optik Prensip',
    nirs: 'Yakın kızılötesi spektroskopi (700–900 nm) · Uzaysal Çözünürlük (SRS)',
    spo2: 'Kırmızı (660 nm) & Kızılötesi (940 nm) · Beer-Lambert AC/DC',
  },
  {
    criterion: 'Nabız (Pulsatilite) Gereksinimi',
    nirs: 'Gerekmez (Non-pulsatil). KPB, VA-ECMO, LVAD ve KPR’de çalışır.',
    spo2: 'Zorunlu. Nabızsız akımda, derin şokta ve arrestte ölçüm vermez.',
  },
  {
    criterion: 'Örneklenen Damar Kompartmanı',
    nirs: 'Mikrovasküler ağırlıklı venöz (~%70–75 venöz / %25–30 arteriyel)',
    spo2: 'Yalnızca pulsatil arteriyel kan (%100 arteriyel SaO₂)',
  },
  {
    criterion: 'Yansıttığı Fizyoloji',
    nirs: 'Bölgesel serebral O₂ arz / talep dengesi (DO₂ vs CMRO₂)',
    spo2: 'Sistemik akciğer gaz değişimi ve arteriyel hemoglobin satürasyonu',
  },
  {
    criterion: 'Normal Aralık (Uyanık Oda Havası)',
    nirs: '%60 – %80 (bireysel ve cihaza göre geniş varyasyon)',
    spo2: '%95 – %100',
  },
  {
    criterion: 'Klinik Müdahale Eşiği',
    nirs: 'Bazaldan ≥ %20 bağıl düşüş, mutlak < %50 veya |L−R| > %10–15',
    spo2: '< %90–94 (mutlak eşik)',
  },
];

const PLATFORM_ROWS = [
  {
    device: 'INVOS 5100C / 7100 (Medtronic)',
    wavelengths: '2 dalga boyu (730, 810 nm)',
    detectors: '30 mm (yakın) & 40 mm (uzak)',
    ratio: '75% Venöz / 25% Arteriyel',
    note: 'En yaygın klinik literatür (Murkin, Denault). Trend odaklı; bazal belirleme esastır.',
  },
  {
    device: 'FORE-SIGHT Elite (Edwards)',
    wavelengths: '5 dalga boyu (690–870 nm)',
    detectors: '15 mm & 50 mm (erişkin)',
    ratio: '70% Venöz / 30% Arteriyel',
    note: 'Çoklu dalga boyu ile melanin ve ekstrakranial etkiyi azaltmaya yönelik mutlak odaklı algoritma.',
  },
  {
    device: 'Masimo O3 (Root Platformu)',
    wavelengths: '4 dalga boyu (730–880 nm)',
    detectors: '30 mm & 40 mm',
    ratio: '70% Venöz / 30% Arteriyel',
    note: 'Aynı alında SedLine (PSI/DSA) ile eşzamanlı kombine nöromonitörizasyon uyumu.',
  },
  {
    device: 'Nonin SenSmart / Equanox',
    wavelengths: '4 dalga boyu (730, 760, 810, 880 nm)',
    detectors: 'Çift verici / çift alıcı (20 & 40 mm)',
    ratio: '70% Venöz / 30% Arteriyel',
    note: 'Çift ışık yolu geometrisi ile yüzeyel doku (kafa derisi) kontaminasyonuna karşı dirençli.',
  },
];

const REFERENCES = [
  {
    authors: 'Murkin JM, Adams SJ, Novick RJ, et al.',
    title: 'Monitoring brain oxygen saturation during coronary bypass surgery: a randomized, prospective study.',
    journal: 'Anesth Analg. 2007;104(1):51–58.',
    pmid: '17179242',
  },
  {
    authors: 'Denault A, Deschamps A, Murkin JM.',
    title: 'A proposed algorithm for the intraoperative use of cerebral near-infrared spectroscopy.',
    journal: 'Semin Cardiothorac Vasc Anesth. 2007;11(4):274–281.',
    pmid: '18270192',
  },
  {
    authors: 'Murkin JM, Arango M.',
    title: 'Near-infrared spectroscopy as an index of brain and tissue oxygenation.',
    journal: 'Br J Anaesth. 2009;103(Suppl 1):i3–i13.',
    pmid: '20007987',
  },
  {
    authors: 'Davie SN, Grocott HP.',
    title: 'Impact of extracranial contamination on regional cerebral oxygen saturation: a comparison of three cerebral oximetry technologies.',
    journal: 'Anesthesiology. 2012;116(4):834–840.',
    pmid: '22343469',
  },
  {
    authors: 'Bickler PE, Feiner JR, Rollins MD.',
    title: 'Factors affecting the performance of 5 cerebral oximeters during hypoxia in healthy volunteers.',
    journal: 'Anesth Analg. 2013;117(4):813–823.',
    pmid: '24023027',
  },
  {
    authors: 'Deschamps A, Hall R, Grocott H, et al. (CPACT Group).',
    title: 'Cerebral oximetry monitoring to maintain normal cerebral oxygen saturation during high-risk cardiac surgery: a randomized controlled feasibility trial.',
    journal: 'Anesthesiology. 2016;124(4):826–836.',
    pmid: '26808629',
  },
];

export const NirsCerebralOximetryModule: React.FC<NirsCerebralOximetryModuleProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<NirsPresetId>('baseline');
  const [map, setMap] = useState<number>(80); // mmHg (40..110)
  const [paco2, setPaco2] = useState<number>(38); // mmHg (22..55)
  const [hb, setHb] = useState<number>(12.5); // g/dL (5.5..15.0)
  const [temp, setTemp] = useState<number>(36.5); // °C (28.0..39.5)
  const [leftOcclusion, setLeftOcclusion] = useState<number>(0); // 0..85% unilateral carotid/cannula restriction

  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const BASELINE_RSO2 = 71;

  const applyPreset = (preset: NirsPresetId) => {
    setActivePreset(preset);
    if (preset === 'baseline') {
      setMap(80);
      setPaco2(38);
      setHb(12.5);
      setTemp(36.5);
      setLeftOcclusion(0);
    } else if (preset === 'beach_chair') {
      setMap(50);
      setPaco2(31);
      setHb(11.5);
      setTemp(36.4);
      setLeftOcclusion(0);
    } else if (preset === 'carotid_clamp') {
      setMap(78);
      setPaco2(38);
      setHb(12.0);
      setTemp(36.5);
      setLeftOcclusion(72);
    } else if (preset === 'hyperventilation') {
      setMap(76);
      setPaco2(23);
      setHb(12.5);
      setTemp(36.5);
      setLeftOcclusion(0);
    } else if (preset === 'hemorrhage') {
      setMap(62);
      setPaco2(36);
      setHb(6.4);
      setTemp(36.0);
      setLeftOcclusion(0);
    } else if (preset === 'hypothermic_cpb') {
      setMap(66);
      setPaco2(38);
      setHb(9.2);
      setTemp(28.5);
      setLeftOcclusion(0);
    }
  };

  // Physiological Fick-based Cerebral Oxygenation Model (rSO2 ≈ 0.28*SaO2 + 0.72*SvO2)
  const sim = useMemo(() => {
    const saO2 = 98;

    // 1. Autoregulation factor on CBF (plateau 62..140 mmHg, drop below LLA ~62 mmHg)
    const mapFactor = map >= 64 ? 1.0 + Math.min(0.08, (map - 64) * 0.0015) : Math.max(0.45, 1.0 - (64 - map) * 0.022);

    // 2. PaCO2 cerebrovascular reactivity (~3% CBF change per mmHg CO2 from 38 mmHg)
    const co2Factor = Math.max(0.55, Math.min(1.42, 1.0 + (paco2 - 38) * 0.028));

    // 3. Temperature effect on CMRO2 (~6.5% per °C around 36.5 °C)
    const cmro2Rel = Math.max(0.45, Math.min(1.3, 1.0 + (temp - 36.5) * 0.065));

    // 4. Right hemisphere CBF & DO2 relative to baseline (baseline Hb = 12.5)
    const cbfRightRel = Math.max(0.35, mapFactor * co2Factor);
    const cbfLeftRel = Math.max(0.22, cbfRightRel * (1 - leftOcclusion * 0.0072));

    const hbRatio = hb / 12.5;
    const do2RightRel = Math.max(0.25, cbfRightRel * hbRatio);
    const do2LeftRel = Math.max(0.2, cbfLeftRel * hbRatio);

    // Baseline cerebral O2 extraction fraction (OEF) ≈ 0.37 (SvO2 ≈ 61%, rSO2 = 0.28*98 + 0.72*61 ≈ 71.3%)
    const calcRso2 = (do2Rel: number) => {
      const oef = Math.min(0.86, Math.max(0.14, 0.37 * (cmro2Rel / do2Rel)));
      const svo2 = Math.max(12, saO2 * (1 - oef));
      return Math.round(Math.min(92, Math.max(24, 0.28 * saO2 + 0.72 * svo2)));
    };

    const rso2Right = calcRso2(do2RightRel);
    const rso2Left = calcRso2(do2LeftRel);

    const relDropRight = Math.round(((rso2Right - BASELINE_RSO2) / BASELINE_RSO2) * 100);
    const relDropLeft = Math.round(((rso2Left - BASELINE_RSO2) / BASELINE_RSO2) * 100);
    const diffLR = Math.abs(rso2Left - rso2Right);

    const isLeftCrit = relDropLeft <= -20 || rso2Left < 50;
    const isRightCrit = relDropRight <= -20 || rso2Right < 50;
    const isAsymmetric = diffLR >= 10;
    const isWarn = !isLeftCrit && !isRightCrit && (relDropLeft <= -12 || relDropRight <= -12);

    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let headline = 'Serebral Oksijen Arz–Talep Dengesi Korunmuş (Nominal)';
    let action =
      'Bilateral rSO₂ bazal değerin (%71) ±%12 içinde ve mutlak ≥ %50. Sol–Sağ simetrisi dengelidir; rutin trend takibine devam edin.';

    if (isAsymmetric && isLeftCrit) {
      status = 'critical';
      headline = `Tek Taraflı Sol Serebral Desatürasyon (Sol %${rso2Left} vs Sağ %${rso2Right} · Δ${diffLR} puan)`;
      action =
        'Kırmızı Bayrak: Tek taraflı düşüş sistemik değil MEKANİK/VASKÜLER sorundur! Baş rotasyonunu düzeltin, KPB’de aortik/venöz kanül yerleşimini veya karotis endarterektomide şant/klemp perfüzyonunu derhal cerrahla doğrulayın ve MAP’ı yükseltin.';
    } else if (isLeftCrit || isRightCrit) {
      status = 'critical';
      if (map < 60 && paco2 < 34) {
        headline = `Bilateral Hipoperfüzyon + Hipokapni (rSO₂ %${Math.min(rso2Left, rso2Right)} · ${Math.min(relDropLeft, relDropRight)}%)`;
        action =
          'Beach-chair veya derin hipotansiyon + hiperventilasyon kombinasyonu! Transdüseri tragus (dış kulak yolu) düzeyinde doğrulayın, MAP’ı hızla yükseltin ve dakika ventilasyonunu azaltarak PaCO₂’yi 38–42 mmHg’ye getirin.';
      } else if (hb < 8.0) {
        headline = `Anemik Serebral Desatürasyon (Hb ${hb.toFixed(1)} g/dL · rSO₂ %${rso2Right})`;
        action =
          'Oksijen taşıma kapasitesi (CaO₂) kritik düzeyde azaldı. Kanama kontrolünü hızlandırın, FiO₂’yi yükseltin, kardiyak debiyi koruyun ve eritrosit süspansiyonu replasmanı planlayın.';
      } else if (paco2 <= 28) {
        headline = `Hipokapnik Vazokonstriksiyon Desatürasyonu (PaCO₂ ${paco2} mmHg · rSO₂ %${rso2Right})`;
        action =
          'Aşırı hiperventilasyon serebral arteriyolleri daraltarak CBF’yi ciddi oranda düşürdü. Solunum hızını / tidal volümü azaltarak PaCO₂’yi 38–42 mmHg normokapni bandına çekin.';
      } else if (temp >= 38.5) {
        headline = `Hipermetabolik Talep Artışı (Ateş ${temp.toFixed(1)}°C · rSO₂ %${rso2Right})`;
        action =
          'Artan vücut sıcaklığı CMRO₂’yi yükseltiyor. Aktif soğutma başlatın, nöbet/yüzeyel anestezi olasılığını dışlayın ve serebral oksijen sunumunu (MAP/CO) destekleyin.';
      } else {
        headline = `Kritik Bilateral Serebral Desatürasyon (rSO₂ %${Math.min(rso2Left, rso2Right)} · ${Math.min(relDropLeft, relDropRight)}%)`;
        action =
          'Bazaldan ≥ %20 düşüş veya mutlak < %50 eşiği aşıldı! Aşağıdaki Denault 7 basamaklı algoritmasını (Baş/Kanül → MAP → SpO₂ → PaCO₂ → Hb → CO → CMRO₂) sırayla uygulayın.';
      }
    } else if (isWarn) {
      status = 'warning';
      headline = `Erken Trend Uyarısı (rSO₂ %${Math.min(rso2Left, rso2Right)} · Bazaldan ${Math.min(relDropLeft, relDropRight)}%)`;
      action =
        'Henüz −%20 kritik eşiğine inilmedi ancak aşağı yönlü trend başladı. MAP, EtCO₂, baş pozisyonu ve hemoglobini proaktif olarak gözden geçirin.';
    } else if (temp <= 31.0) {
      status = 'optimal';
      headline = `Hipotermik KPB Koruması (Non-Pulsatil · rSO₂ %${rso2Right})`;
      action =
        'Hipotermi CMRO₂’yi belirgin düşürdüğü için düşük hemoglobin ve non-pulsatil KPB akımına rağmen serebral oksijenasyon korunmuştur. Yeniden ısıtma (rewarming) fazında ani rSO₂ düşüşüne dikkat edin!';
    }

    return {
      rso2Left,
      rso2Right,
      relDropLeft,
      relDropRight,
      diffLR,
      cbfLeftPct: Math.round(cbfLeftRel * 100),
      cbfRightPct: Math.round(cbfRightRel * 100),
      do2LeftPct: Math.round(do2LeftRel * 100),
      do2RightPct: Math.round(do2RightRel * 100),
      cmro2Pct: Math.round(cmro2Rel * 100),
      isLeftCrit,
      isRightCrit,
      isAsymmetric,
      status,
      headline,
      action,
    };
  }, [map, paco2, hb, temp, leftOcclusion]);

  // Build bilateral 15-minute trend SVG curves from BASELINE_RSO2 (71%) to simulated state
  const trendPaths = useMemo(() => {
    const startX = 48;
    const endX = 536;
    const mapY = (val: number) => {
      // Y-axis range: 30% (bottom y=162) to 95% (top y=22)
      const clamped = Math.max(30, Math.min(95, val));
      return 162 - ((clamped - 30) / 65) * 140;
    };

    const buildCurve = (targetVal: number, phase: number) => {
      const pts: string[] = [];
      const steps = 40;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = startX + t * (endX - startX);
        // Smooth S-curve transition between t=0.20 and t=0.72
        const s = t < 0.2 ? 0 : t > 0.72 ? 1 : 0.5 - 0.5 * Math.cos(((t - 0.2) / 0.52) * Math.PI);
        const microVar = Math.sin(i * 0.7 + phase) * 0.6;
        const val = BASELINE_RSO2 + (targetVal - BASELINE_RSO2) * s + microVar;
        pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${mapY(val).toFixed(1)}`);
      }
      return { path: pts.join(' '), endY: mapY(targetVal) };
    };

    return {
      left: buildCurve(sim.rso2Left, 0.4),
      right: buildCurve(sim.rso2Right, 2.1),
      yBaseline: mapY(BASELINE_RSO2),
      yRel20: mapY(Math.round(BASELINE_RSO2 * 0.8)), // 57%
      yAbs50: mapY(50),
    };
  }, [sim.rso2Left, sim.rso2Right]);

  const toggleStep = (id: string) => {
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = DENAULT_STEPS.filter((s) => checkedSteps[s.id]).length;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* EDITORIAL OPENING HEADER */}
      <header className={`pb-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span className="text-sky-600 dark:text-sky-400 font-semibold">Serebral Oksijenasyon &amp; Perfüzyon</span>
          <span aria-hidden="true">·</span>
          <span>Yakın Kızılötesi Spektroskopi (NIRS)</span>
          <span aria-hidden="true">·</span>
          <span>rSO₂ / ScO₂ · Non-Pulsatil Trend</span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Serebral Oksimetri (NIRS — Yakın Kızılötesi Spektroskopi)
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Serebral oksimetri, alın cildine yerleştirilen bilateral sensörlerle frontal korteksin (~1.5–2.5 cm derinlik)
          bölgesel hemoglobin oksijen satürasyonunu (<strong>rSO₂</strong>) <strong>nabız gerektirmeden</strong> sürekli
          izler. Ağırlıklı olarak venöz kanı (~%70–75 venöz) örneklediği için beyin oksijen <strong>arz–talep dengesinin</strong>{' '}
          (<em>DO₂ vs CMRO₂</em>) erken uyarı barometresidir.
        </p>

        <nav aria-label="Bölüm geçişleri" className="mt-5 flex flex-wrap items-center gap-2">
          {[
            { id: 'nirs-01', label: '01. NIRS Fiziği & SpO₂ Farkı' },
            { id: 'nirs-02', label: '02. Canlı Bilateral rSO₂ Lab' },
            { id: 'nirs-03', label: '03. Sensör Yerleşimi & Cihazlar' },
            { id: 'nirs-04', label: '04. Fenilefrin & Tuzaklar' },
            { id: 'nirs-05', label: '05. Denault Algoritması & Kanıtlar' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-sky-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-sky-400'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. OPTİK BİYOFİZİK, MUZ ŞEKİLLİ IŞIK YOLU VE SpO2 FARKLARI           */}
      {/* ===================================================================== */}
      <section id="nirs-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. NIRS Biyofiziği, Uzaysal Çözünürlük (SRS) ve SpO₂’den Kritik Farkları
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            700–900 nm dalga boyundaki yakın kızılötesi ışık kemik ve deriyi nispeten geçirirken, başlıca kromoforlar
            olan <strong>oksihemoglobin (HbO₂)</strong> ve <strong>deoksihemoglobin (HHb)</strong> tarafından farklı
            oranlarda soğurulur. Işık dokuda saçılım nedeniyle <em>muz (yay) şekilli</em> bir yörünge izler.
          </p>
        </div>

        {/* Banana-Shaped Optical Path Diagram + 3 Core Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div
            className={`lg:col-span-7 rounded-xl border p-4 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Uzaysal Çözünürlüklü Spektroskopi (SRS) · Muz Şekilli Foton Yolu
              </span>
              <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400">
                700–900 nm · ~%70–75 Venöz
              </span>
            </div>

            <svg
              viewBox="0 0 560 228"
              className="w-full h-auto rounded-lg"
              role="img"
              aria-label="NIRS yakın ve uzak dedektör muz şekilli ışık yolu ve kortikal derinlik şeması"
            >
              {/* Tissue Layers */}
              <rect x="20" y="62" width="520" height="24" rx="4" fill={isDark ? '#1e293b' : '#fde68a'} fillOpacity={isDark ? '0.9' : '0.45'} />
              <rect x="20" y="86" width="520" height="28" rx="2" fill={isDark ? '#334155' : '#e2e8f0'} fillOpacity="0.7" />
              <rect x="20" y="114" width="520" height="14" fill={isDark ? '#0c4a6e' : '#bae6fd'} fillOpacity="0.45" />
              <rect x="20" y="128" width="520" height="74" rx="6" fill={isDark ? '#0f172a' : '#f1f5f9'} stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1" />

              {/* Layer Labels */}
              <text x="28" y="78" fontSize="10" fontWeight="600" fill={isDark ? '#cbd5e1' : '#78350f'}>Kafa Derisi (Ekstrakranial)</text>
              <text x="28" y="104" fontSize="10" fontWeight="600" fill={isDark ? '#e2e8f0' : '#334155'}>Kafatası Kemiği</text>
              <text x="28" y="124" fontSize="9" fontWeight="600" fill={isDark ? '#7dd3fc' : '#0369a1'}>BOS / Subaraknoid</text>
              <text x="28" y="148" fontSize="10.5" fontWeight="700" fill={isDark ? '#38bdf8' : '#0284c7'}>
                Frontal Korteks (~1.5 – 2.5 cm derinlik · ACA–MCA Sınır Bölgesi)
              </text>

              {/* Sensor Pad on Scalp */}
              <rect x="115" y="42" width="320" height="20" rx="6" fill={isDark ? '#1e293b' : '#0f172a'} stroke="#38bdf8" strokeWidth="1.2" />

              {/* Emitter + Near + Far Detectors */}
              <rect x="135" y="45" width="46" height="14" rx="3" fill="#0ea5e9" />
              <text x="158" y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff" fontFamily="ui-monospace, monospace">LED</text>

              <rect x="280" y="45" width="54" height="14" rx="3" fill="#f59e0b" />
              <text x="307" y="55" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff" fontFamily="ui-monospace, monospace">YAKIN</text>

              <rect x="372" y="45" width="54" height="14" rx="3" fill="#10b981" />
              <text x="399" y="55" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff" fontFamily="ui-monospace, monospace">UZAK</text>

              {/* Distance markers above sensor */}
              <line x1="158" y1="30" x2="307" y2="30" stroke="#f59e0b" strokeWidth="1.2" />
              <text x="232" y="25" textAnchor="middle" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#f59e0b">~30 mm</text>
              <line x1="158" y1="14" x2="399" y2="14" stroke="#10b981" strokeWidth="1.2" />
              <text x="278" y="10" textAnchor="middle" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#10b981">~40 mm (Derin Kortikal Yol)</text>

              {/* Shallow Banana Arc (Extracranial) */}
              <path
                d="M 158 62 Q 232 122, 307 62"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="7"
                strokeOpacity="0.3"
                strokeLinecap="round"
              />
              <path
                d="M 158 62 Q 232 122, 307 62"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Deep Banana Arc (Cortical) */}
              <path
                d="M 158 62 Q 278 214, 399 62"
                fill="none"
                stroke="#10b981"
                strokeWidth="12"
                strokeOpacity="0.22"
                strokeLinecap="round"
              />
              <path
                d="M 158 62 Q 278 214, 399 62"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.4"
              />

              {/* Formula callout at bottom */}
              <text
                x="280"
                y="219"
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="ui-monospace, monospace"
                fill={isDark ? '#e2e8f0' : '#0f172a'}
              >
                Kortikal rSO₂ ≈ Uzak Sinyal (Derin + Yüzeyel) − Yakın Sinyal (Yüzeyel)
              </text>
            </svg>
          </div>

          <div className="lg:col-span-5 space-y-3">
            {[
              {
                title: '1. Nabızsız Akımda Çalışma Üstünlüğü',
                body: 'SpO₂ yalnızca arteriyel pulsatil dalgayı okurken, NIRS non-pulsatil doku spektroskopisidir. Kardiyopulmoner baypas (KPB), VA-ECMO, LVAD ve kardiyak arrest / KPR sırasında kesintisiz serebral veri verir.',
              },
              {
                title: '2. Ağırlıklı Venöz Kompartman (~%70–75 Venöz)',
                body: 'Kortikal mikrodolaşımın büyük kısmı venül ve kapiller yataktır. Bu nedenle rSO₂ arteriyel SpO₂’den (~%98) düşüktür (%60–80) ve doğrudan O₂ sunumu / tüketimi dengesini yansıtır.',
              },
              {
                title: '3. Mutlak Sayı Değil, Bireysel Trend Monitörü',
                body: 'Kafatası kalınlığı, BOS hacmi ve cihaz algoritması mutlak sayıyı ±%10–15 kaydırabilir (Bickler 2013). Klinik karar uyanık oda havası bazalından ≥ %20 düşüş veya mutlak < %50 eşiğine dayanır.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</div>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SpO2 vs NIRS Comparison Table */}
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-3 px-4 font-semibold">Karşılaştırma Parametresi</th>
                <th className="py-3 px-4 font-semibold text-sky-600 dark:text-sky-400">Serebral Oksimetri (NIRS · rSO₂)</th>
                <th className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">Pulse Oksimetri (SpO₂)</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {SPO2_VS_NIRS_ROWS.map((row) => (
                <tr key={row.criterion} className="align-top">
                  <td className={`py-2.5 px-4 font-semibold min-w-[175px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.criterion}
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[240px]">{row.nirs}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[210px] text-slate-500 dark:text-slate-400">{row.spo2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI BİLATERAL rSO2 & SEREBRAL FİZYOLOJİ LABORATUVARI            */}
      {/* ===================================================================== */}
      <section id="nirs-02" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            02. Canlı Bilateral rSO₂ Trend ve Serebral Fizyoloji Laboratuvarı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            MAP (otoregülasyon), PaCO₂ (vazoreaktivite), Hemoglobin (CaO₂), Sıcaklık (CMRO₂) ve tek taraflı karotis / kanül
            akım kısıtlamasının bilateral rSO₂ trendini nasıl değiştirdiğini test edin. Uyanık oda havası bazalı{' '}
            <strong className="font-mono tabular-nums">%71</strong> kabul edilmiştir (<strong>−%20 eşiği = %57</strong>).
          </p>
        </div>

        {/* 6 Clinical Scenario Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'baseline', label: 'Bazal Stabil (%71)' },
            { id: 'beach_chair', label: 'Beach-Chair Hipotansiyon' },
            { id: 'carotid_clamp', label: 'Karotis Klemp / Kanül Malpoz.' },
            { id: 'hyperventilation', label: 'Derin Hipokapni (PaCO₂ 23)' },
            { id: 'hemorrhage', label: 'Akut Kanama (Hb 6.4)' },
            { id: 'hypothermic_cpb', label: 'Hipotermik KPB (28.5°C)' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as NirsPresetId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-sky-600 border-sky-500 text-white'
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
          <div
            className={`lg:col-span-8 rounded-xl border p-4 sm:p-5 space-y-5 ${
              isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            {/* Bilateral Live Monitor Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* LEFT rSO2 */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.isLeftCrit
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>SOL (L) rSO₂</span>
                  <span className="font-mono tabular-nums">
                    {sim.relDropLeft >= 0 ? `+${sim.relDropLeft}%` : `${sim.relDropLeft}%`}
                  </span>
                </div>
                <div
                  className={`mt-1 text-3xl font-mono font-bold tabular-nums leading-none ${
                    sim.isLeftCrit
                      ? 'text-rose-600 dark:text-rose-400'
                      : sim.relDropLeft <= -12
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-sky-600 dark:text-sky-400'
                  }`}
                >
                  %{sim.rso2Left}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.isLeftCrit ? 'DESATÜRASYON' : sim.relDropLeft <= -12 ? 'AZALMA TRENDİ' : 'NOMİNAL'}
                </div>
              </div>

              {/* RIGHT rSO2 */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.isRightCrit
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>SAĞ (R) rSO₂</span>
                  <span className="font-mono tabular-nums">
                    {sim.relDropRight >= 0 ? `+${sim.relDropRight}%` : `${sim.relDropRight}%`}
                  </span>
                </div>
                <div
                  className={`mt-1 text-3xl font-mono font-bold tabular-nums leading-none ${
                    sim.isRightCrit
                      ? 'text-rose-600 dark:text-rose-400'
                      : sim.relDropRight <= -12
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-indigo-600 dark:text-indigo-400'
                  }`}
                >
                  %{sim.rso2Right}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.isRightCrit ? 'DESATÜRASYON' : sim.relDropRight <= -12 ? 'AZALMA TRENDİ' : 'NOMİNAL'}
                </div>
              </div>

              {/* L-R Asymmetry */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.isAsymmetric
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">|L − R| Farkı</div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.isAsymmetric ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {sim.diffLR} puan
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.isAsymmetric ? 'ASİMETRİ (≥ 10)' : 'SİMETRİK'}
                </div>
              </div>

              {/* DO2 vs CMRO2 */}
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Arz / Talep</div>
                <div className="mt-1 text-sm font-mono font-bold tabular-nums text-slate-800 dark:text-slate-100">
                  DO₂ %{Math.min(sim.do2LeftPct, sim.do2RightPct)}
                </div>
                <div className="mt-1 text-xs font-mono font-semibold tabular-nums text-amber-600 dark:text-amber-400">
                  CMRO₂ %{sim.cmro2Pct}
                </div>
              </div>
            </div>

            {/* Bilateral rSO2 Trend SVG */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Bilateral rSO₂ Trend Grafiği (Bazal %71 · −%20 Eşik %57 · Mutlak Eşik %50)
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  Sol CBF %{sim.cbfLeftPct} · Sağ CBF %{sim.cbfRightPct}
                </span>
              </div>

              <svg
                viewBox="0 0 560 184"
                className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
                role="img"
                aria-label="Sol ve sağ frontal serebral oksimetri rSO2 trend grafiği"
              >
                {/* Critical <50% Zone */}
                <rect x="48" y={trendPaths.yAbs50} width="488" height={162 - trendPaths.yAbs50} fill="#ef4444" fillOpacity="0.14" />

                {/* Y-Axis grid & labels */}
                {[90, 70, 50, 30].map((val) => {
                  const y = 162 - ((val - 30) / 65) * 140;
                  return (
                    <g key={val}>
                      <line x1="48" y1={y} x2="536" y2={y} stroke="#1e293b" strokeWidth="1" />
                      <text x="40" y={y + 3.5} textAnchor="end" fontSize="9.5" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                        %{val}
                      </text>
                    </g>
                  );
                })}

                {/* Baseline Dashed Line (71%) */}
                <line x1="48" y1={trendPaths.yBaseline} x2="536" y2={trendPaths.yBaseline} stroke="#38bdf8" strokeDasharray="4 4" strokeWidth="1" strokeOpacity="0.6" />
                <text x="534" y={trendPaths.yBaseline - 4} textAnchor="end" fontSize="9" fontFamily="ui-monospace, monospace" fill="#38bdf8">
                  Bazal %71
                </text>

                {/* -20% Relative Threshold Line (57%) */}
                <line x1="48" y1={trendPaths.yRel20} x2="536" y2={trendPaths.yRel20} stroke="#f59e0b" strokeDasharray="5 3" strokeWidth="1.2" />
                <text x="534" y={trendPaths.yRel20 - 4} textAnchor="end" fontSize="9" fontFamily="ui-monospace, monospace" fill="#f59e0b">
                  −%20 Eşik (%57)
                </text>

                {/* Absolute 50% Line */}
                <line x1="48" y1={trendPaths.yAbs50} x2="536" y2={trendPaths.yAbs50} stroke="#f43f5e" strokeWidth="1.2" />
                <text x="56" y={trendPaths.yAbs50 + 12} fontSize="9" fontFamily="ui-monospace, monospace" fill="#fb7185">
                  Mutlak Desatürasyon Alanı (&lt; %50)
                </text>

                {/* Right & Left Curves */}
                <path
                  d={trendPaths.right.path}
                  fill="none"
                  stroke={sim.isRightCrit ? '#fb7185' : '#818cf8'}
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                <path
                  d={trendPaths.left.path}
                  fill="none"
                  stroke={sim.isLeftCrit ? '#f43f5e' : '#38bdf8'}
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />

                {/* End Dots */}
                <circle cx="536" cy={trendPaths.right.endY} r="4" fill={sim.isRightCrit ? '#fb7185' : '#818cf8'} />
                <circle cx="536" cy={trendPaths.left.endY} r="4.5" fill={sim.isLeftCrit ? '#f43f5e' : '#38bdf8'} />

                {/* X-Axis legend */}
                <text x="48" y="176" fontSize="9" fontFamily="ui-monospace, monospace" fill="#64748b">Bazal (0 dk)</text>
                <text x="292" y="176" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#64748b">İntraoperatif Olay</text>
                <text x="536" y="176" textAnchor="end" fontSize="9" fontFamily="ui-monospace, monospace" fill="#64748b">+15 dk (L: Mavi · R: Mor)</text>
              </svg>
            </div>
          </div>

          {/* RIGHT CONTROL DECK */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className={`rounded-xl border p-4 space-y-3.5 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Sliders className="w-4 h-4 text-sky-500" />
                <span>Serebral Arz / Talep Parametreleri</span>
              </div>

              {/* MAP */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="nirs-map" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Ortalama Arter Basıncı (MAP)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-sky-600 dark:text-sky-400">{map} mmHg</span>
                </div>
                <input
                  id="nirs-map"
                  type="range"
                  min={40}
                  max={110}
                  step={2}
                  value={map}
                  onChange={(e) => setMap(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              {/* PaCO2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="nirs-co2" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Arteriyel PaCO₂
                  </label>
                  <span className="font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400">{paco2} mmHg</span>
                </div>
                <input
                  id="nirs-co2"
                  type="range"
                  min={22}
                  max={55}
                  step={1}
                  value={paco2}
                  onChange={(e) => setPaco2(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Hemoglobin */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="nirs-hb" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Hemoglobin (Hb)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-rose-600 dark:text-rose-400">
                    {hb.toFixed(1)} g/dL
                  </span>
                </div>
                <input
                  id="nirs-hb"
                  type="range"
                  min={5.5}
                  max={15.0}
                  step={0.1}
                  value={hb}
                  onChange={(e) => setHb(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              {/* Temperature */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="nirs-temp" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Kor Sıcaklığı (CMRO₂)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-indigo-600 dark:text-indigo-400">
                    {temp.toFixed(1)} °C
                  </span>
                </div>
                <input
                  id="nirs-temp"
                  type="range"
                  min={28.0}
                  max={39.5}
                  step={0.5}
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Unilateral Left Carotid / Cannula Restriction */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="nirs-occ" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Sol Karotis / Kanül Kısıtlaması
                  </label>
                  <span className="font-mono tabular-nums font-bold text-rose-600 dark:text-rose-400">
                    %{leftOcclusion}
                  </span>
                </div>
                <input
                  id="nirs-occ"
                  type="range"
                  min={0}
                  max={85}
                  step={5}
                  value={leftOcclusion}
                  onChange={(e) => setLeftOcclusion(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
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
                <span>{sim.headline}</span>
              </div>
              <p>{sim.action}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 03. SENSÖR YERLEŞİMİ VE TİCARİ CİHAZ KARŞILAŞTIRMASI                  */}
      {/* ===================================================================== */}
      <section id="nirs-03" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            03. Bilateral Sensör Yerleşimi ve Ticari Serebral Oksimetre Platformları
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Sensörler <strong>kaşların 1–2 cm üzerine</strong>, orta hattan <strong>en az 1–2 cm laterale</strong>{' '}
            (superior sagital sinüs ve frontal sinüslerden uzak) ve saçsız alın cildine simetrik yerleştirilir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Bilateral Frontal Sensor SVG */}
          <div
            className={`lg:col-span-5 rounded-xl border p-4 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <svg
              viewBox="0 0 420 228"
              className="w-full h-auto"
              role="img"
              aria-label="Bilateral frontal serebral oksimetri NIRS sensör yerleşimi"
            >
              {/* Head silhouette */}
              <path
                d="M 102 190 C 90 135, 94 58, 140 30 C 178 8, 242 8, 280 30 C 326 58, 330 135, 318 190"
                fill={isDark ? '#0f172a' : '#ffffff'}
                stroke={isDark ? '#334155' : '#cbd5e1'}
                strokeWidth="2"
              />

              {/* Midline Superior Sagittal Sinus Warning Zone */}
              <line x1="210" y1="22" x2="210" y2="128" stroke="#f43f5e" strokeDasharray="3 3" strokeWidth="1.4" />
              <rect x="200" y="72" width="20" height="44" rx="4" fill="#f43f5e" fillOpacity="0.16" />
              <text x="210" y="64" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fb7185" fontFamily="ui-monospace, monospace">
                Sinüs (Kaçın)
              </text>

              {/* Eyebrows & Eyes */}
              <path d="M 134 134 Q 162 124, 190 134" fill="none" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="3" strokeLinecap="round" />
              <path d="M 230 134 Q 258 124, 286 134" fill="none" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="162" cy="150" rx="15" ry="6.5" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
              <ellipse cx="258" cy="150" rx="15" ry="6.5" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
              <path d="M 210 136 L 204 176 Q 210 182, 216 176" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />

              {/* Left & Right NIRS Pads */}
              <rect x="122" y="84" width="70" height="28" rx="6" fill="#0ea5e9" fillOpacity="0.22" stroke="#0ea5e9" strokeWidth="2" />
              <circle cx="136" cy="98" r="4" fill="#0ea5e9" />
              <circle cx="162" cy="98" r="3.5" fill="#f59e0b" />
              <circle cx="179" cy="98" r="4" fill="#10b981" />
              <text x="157" y="79" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#38bdf8' : '#0284c7'}>
                SOL (L) NIRS
              </text>

              <rect x="228" y="84" width="70" height="28" rx="6" fill="#6366f1" fillOpacity="0.22" stroke="#6366f1" strokeWidth="2" />
              <circle cx="241" cy="98" r="4" fill="#10b981" />
              <circle cx="258" cy="98" r="3.5" fill="#f59e0b" />
              <circle cx="284" cy="98" r="4" fill="#6366f1" />
              <text x="263" y="79" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#a5b4fc' : '#4338ca'}>
                SAĞ (R) NIRS
              </text>

              {/* Optional Upper pEEG (SedLine/BIS) Zone */}
              <rect x="148" y="40" width="124" height="14" rx="4" fill="none" stroke={isDark ? '#475569' : '#94a3b8'} strokeDasharray="3 2" strokeWidth="1" />
              <text x="210" y="50" textAnchor="middle" fontSize="8" fill={isDark ? '#94a3b8' : '#64748b'}>
                Üst Alın: pEEG (SedLine / BIS) Alanı
              </text>

              <text x="210" y="214" textAnchor="middle" fontSize="9.5" fontFamily="ui-monospace, monospace" fill={isDark ? '#94a3b8' : '#64748b'}>
                Kaş +1–2 cm · Orta Hattan ≥1–2 cm Lateral · ACA–MCA Sınır Alanı
              </text>
            </svg>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {[
              {
                title: '1. Altın Kural: İndüksiyon ve Preoksijenasyon Öncesi Bazal Kayıt',
                body: 'Bazal rSO₂ hasta uyanıkken ve oda havasında (FiO₂ %21) kaydedilmelidir. %100 O₂ preoksijenasyonu sonrası alınan bazal suni olarak yüksek (~%80) çıkar ve ameliyat boyu sahte desatürasyon alarmlarına yol açar.',
              },
              {
                title: '2. Neden Her Zaman Bilateral (Çift Taraflı)?',
                body: 'Karotis endarterektomide klemp tarafı iskemisi, KPB’de innominat/karotis kanül malpozisyonu veya baş rotasyonu tek hemisferi düşürür. Tek sensör karşı taraf felaketini tamamen kaçırır.',
              },
              {
                title: '3. Alın Temizliği ve Işık Sızıntısı Önlemi',
                body: 'Cilt alkolle silinip kurulanmalı, sensör kenarları tam yapışmalıdır. Ameliyathane lambası (ambient light) sensör altından sızarsa optik sinyal bozulur.',
              },
              {
                title: '4. Pediatrik ve Somatik (2-Bölge) Kullanım',
                body: 'Konjenital kalp cerrahisinde serebral (alın) sensöre ek olarak flank/renal bölgeye takılan somatik rSO₂ probu (normali serebralden ~%10–15 yüksektir) düşük kardiyak debiyi beyinden bile önce yakalar.',
              },
            ].map((step) => (
              <div
                key={step.title}
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.title}</div>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Platforms Table */}
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-3 px-4 font-semibold">Platform / Cihaz</th>
                <th className="py-3 px-4 font-semibold">Dalga Boyu</th>
                <th className="py-3 px-4 font-semibold">Dedektör Mesafesi</th>
                <th className="py-3 px-4 font-semibold">V:A Oranı</th>
                <th className="py-3 px-4 font-semibold">Klinik Not (Bickler 2013)</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {PLATFORM_ROWS.map((row) => (
                <tr key={row.device} className="align-top">
                  <td className={`py-2.5 px-4 font-semibold min-w-[180px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.device}
                  </td>
                  <td className="py-2.5 px-4 font-mono tabular-nums min-w-[140px]">{row.wavelengths}</td>
                  <td className="py-2.5 px-4 font-mono tabular-nums min-w-[130px]">{row.detectors}</td>
                  <td className="py-2.5 px-4 font-mono tabular-nums min-w-[120px]">{row.ratio}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[220px] text-slate-500 dark:text-slate-400">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. KLİNİK TUZAKLAR, FENİLEFRİN PARADOKSU VE ÖZEL CERRAHİLER          */}
      {/* ===================================================================== */}
      <section id="nirs-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. Sık Yapılan Klinik Tuzaklar, Fenilefrin Paradoksu ve Kör Noktalar
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            NIRS ekranda basit bir yüzde sayısı gösterir; ancak fizyolojik kör noktaları ve kromofor artefaktları
            bilinmeden yorumlanırsa hem gereksiz transfüzyona hem de sahte güvenceye yol açabilir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '1. Fenilefrin Paradoksu (MAP ↑ ama rSO₂ ↓)',
              tone: 'amber',
              body: 'Saf α₁-agonist fenilefrin MAP’ı yükseltirken rSO₂’yi sıklıkla %3–10 düşürür. İki nedeni vardır: (1) Kafa derisinde ekstrakranial vazokonstriksiyon (Davie & Grocott 2012), (2) Baroreseptör refleks bradikardi ile kardiyak debi (CO) azalması. CO’yu koruyan efedrin veya düşük doz noradrenalin rSO₂’yi daha iyi destekler.',
            },
            {
              title: '2. Kör Nokta: Yalnızca Frontal Korteks (~2 cm)',
              tone: 'rose',
              body: 'NIRS yalnızca alın altındaki ACA–MCA sınır bölgesini görür. Posterior dolaşım (vertebrobaziler), beyin sapı, derin bazal ganglion veya pariyetal/oksipital fokal inmeleri GÖREMEZ. Normal rSO₂ perioperatif inmeyi dışlamaz.',
            },
            {
              title: '3. Kromofor Artefaktları: Bilirubin & Boyalar',
              tone: 'sky',
              body: 'Ağır hiperbilirubinemi (karaciğer nakli / tıkanma sarılığı) 730 nm ışığı soğurarak kronik sahte düşük rSO₂ (%30–45) verir — burada trend izlenebilir. Metilen mavisi ve indosiyanin yeşili (ICG) IV bolusları rSO₂’yi saniyeler içinde dramatik ancak sahte şekilde çökertebilir.',
            },
            {
              title: '4. Beyin Ölümünde / Enfarktta Sahte Normal rSO₂',
              tone: 'rose',
              body: 'Oksijen tüketimi (CMRO₂) sıfırlanan nekrotik beyin dokusunda veya beyin ölümünde venöz desatürasyon durduğu için rSO₂ normal hatta yüksek (%65–75) okunabilir. Benzer şekilde sensör altındaki kronik subdural hematom veya pnömosefali ölçümü geçersiz kılar.',
            },
          ].map((trap) => (
            <div
              key={trap.title}
              className={`rounded-xl border p-4 space-y-1.5 ${
                trap.tone === 'rose'
                  ? isDark
                    ? 'bg-rose-950/20 border-rose-500/35'
                    : 'bg-rose-50/70 border-rose-200'
                  : trap.tone === 'amber'
                    ? isDark
                      ? 'bg-amber-950/20 border-amber-500/35'
                      : 'bg-amber-50/70 border-amber-200'
                    : isDark
                      ? 'bg-sky-950/20 border-sky-500/35'
                      : 'bg-sky-50/70 border-sky-200'
              }`}
            >
              <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{trap.title}</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{trap.body}</p>
            </div>
          ))}
        </div>

        {/* High-Value Surgical Indications Strip */}
        <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Activity className="w-4 h-4 text-sky-500" />
            <span>Klinik Kanıtın En Güçlü Olduğu 4 Cerrahi Alan</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              {
                name: 'Kardiyak & Aort Arkı Cerrahisi',
                desc: 'KPB’de non-pulsatil perfüzyon, selektif antegrad serebral perfüzyon (SACP) ve kanül malpozisyonunun anlık saptanması.',
              },
              {
                name: 'Karotis Endarterektomi (CEA)',
                desc: 'Genel anestezi altında karotis klempleme sonrası ipsilateral ≥ %15–20 düşüş → şant ihtiyacı veya MAP artırma kararı.',
              },
              {
                name: 'Beach-Chair Omuz Cerrahisi',
                desc: 'Oturur pozisyonda hidrostatik basınç farkı kaynaklı gizli serebral hipotansiyonun (tragus MAP farkı) erken yakalanması.',
              },
              {
                name: 'Pediatrik Kalp & Majör Cerrahi',
                desc: 'Çift bölge (serebral + renal somatik) NIRS ile düşük kalp debisi sendromunun (LCOS) laktat yükselmeden önce tanınması.',
              },
            ].map((ind) => (
              <div key={ind.name} className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className={`font-bold ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>{ind.name}</div>
                <p className={`mt-1 leading-relaxed text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. DENAULT 7-BASAMAKLI MÜDAHALE ALGORİTMASI VE KANITLAR              */}
      {/* ===================================================================== */}
      <section id="nirs-05" className="scroll-mt-6 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1.5">
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              05. Serebral Desatürasyonda Denault 7-Basamaklı Müdahale Algoritması
            </h2>
            <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              rSO₂ bazal değerden <strong>≥ %20 düştüğünde</strong>, mutlak <strong>&lt; %50</strong> olduğunda veya{' '}
              <strong>|L − R| &gt; %10–15</strong> asimetri geliştiğinde aşağıdaki adımları sırayla kontrol edin.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tabular-nums font-semibold text-sky-600 dark:text-sky-400">
              {completedCount} / {DENAULT_STEPS.length} adım
            </span>
            {completedCount > 0 && (
              <button
                type="button"
                onClick={() => setCheckedSteps({})}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Sıfırla</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Denault 7-Step Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DENAULT_STEPS.map((step) => {
            const done = !!checkedSteps[step.id];
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => toggleStep(step.id)}
                className={`text-left rounded-xl border p-3.5 transition-colors cursor-pointer ${
                  done
                    ? isDark
                      ? 'bg-emerald-950/30 border-emerald-500/50'
                      : 'bg-emerald-50/80 border-emerald-300'
                    : isDark
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-sky-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-xs font-bold tabular-nums ${
                        done ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-sky-400'
                      }`}
                    >
                      {step.order}.
                    </span>
                    <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.title}</span>
                  </div>
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      done ? 'text-emerald-500' : isDark ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  />
                </div>
                <div className="mt-1 text-[11px] font-mono font-semibold text-sky-700 dark:text-sky-300">
                  Hedef: {step.target}
                </div>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {step.detail}
                </p>
              </button>
            );
          })}
        </div>

        {/* Landmark Clinical Evidence Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              study: 'Murkin et al. · 2007 (CABG RCT, n=200)',
              finding:
                'Aktif rSO₂ müdahale grubunda uzun süreli serebral desatürasyon azaldı; majör organ morbidite/mortalite (MOMM) ve YBÜ yatış süresi anlamlı biçimde düştü.',
            },
            {
              study: 'Deschamps et al. · 2016 (CPACT Çok Merkezli RCT)',
              finding:
                'Yüksek riskli kalp cerrahisinde sistematik Denault algoritması ile desatürasyon epizotlarının %97’si başarıyla geri döndürüldü; algoritmik düzeltmenin uygulanabilirliği kanıtlandı.',
            },
            {
              study: 'Davie 2012 & Bickler 2013 (Teknoloji & Bias)',
              finding:
                'Kafa derisi kontaminasyonu ve cihazlar arası sabit V:A oranı farkları mutlak sapma yaratır. NIRS, tek mutlak rakam yerine trend + multimodal değerlendirme ile kullanılmalıdır.',
            },
          ].map((ev) => (
            <div
              key={ev.study}
              className={`rounded-xl border p-3.5 space-y-1 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{ev.study}</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{ev.finding}</p>
            </div>
          ))}
        </div>

        {/* References */}
        <div className={`rounded-xl border p-4 space-y-2.5 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/60 border-slate-200'}`}>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <BookOpen className="w-4 h-4 text-sky-500" />
            <span>Temel Akademik Kaynaklar (PubMed Doğrulamalı)</span>
          </div>
          <ol className="space-y-2 text-xs">
            {REFERENCES.map((ref, idx) => (
              <li
                key={ref.pmid}
                className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <span>
                  <span className="font-mono text-slate-400 mr-1.5">{idx + 1}.</span>
                  <strong>{ref.authors}</strong> {ref.title}{' '}
                  <em className="text-slate-500 dark:text-slate-400">{ref.journal}</em>
                </span>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
                >
                  <span>PMID: {ref.pmid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};
