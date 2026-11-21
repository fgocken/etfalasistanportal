import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  CheckCircle2,
  Droplets,
  ExternalLink,
  Eye,
  Flame,
  Scale,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react';

interface IntraoperativeBleedingMonitoringModuleProps {
  isDark: boolean;
}

interface PatientProfile {
  id: string;
  label: string;
  ebvPerKg: number;
  defaultWeight: number;
  defaultStartHb: number;
  defaultMinHb: number;
}

const PATIENT_PROFILES: PatientProfile[] = [
  { id: 'adult-male', label: 'Erişkin Erkek (75)', ebvPerKg: 75, defaultWeight: 80, defaultStartHb: 13.5, defaultMinHb: 8.0 },
  { id: 'adult-female', label: 'Erişkin Kadın (65)', ebvPerKg: 65, defaultWeight: 65, defaultStartHb: 12.0, defaultMinHb: 8.0 },
  { id: 'pregnant', label: 'Gebe · Term (75)', ebvPerKg: 75, defaultWeight: 78, defaultStartHb: 11.2, defaultMinHb: 7.5 },
  { id: 'obese', label: 'Obez (60)', ebvPerKg: 60, defaultWeight: 110, defaultStartHb: 13.0, defaultMinHb: 8.0 },
  { id: 'child', label: 'Çocuk (75)', ebvPerKg: 75, defaultWeight: 20, defaultStartHb: 11.5, defaultMinHb: 7.5 },
  { id: 'infant', label: 'İnfant (80)', ebvPerKg: 80, defaultWeight: 8, defaultStartHb: 11.0, defaultMinHb: 8.0 },
  { id: 'neonate', label: 'Yenidoğan (85)', ebvPerKg: 85, defaultWeight: 3.5, defaultStartHb: 15.0, defaultMinHb: 10.0 },
  { id: 'preterm', label: 'Prematüre (95)', ebvPerKg: 95, defaultWeight: 1.8, defaultStartHb: 14.5, defaultMinHb: 11.0 },
];

const MEASUREMENT_METHODS = [
  {
    method: 'Görsel Tahmin (Visual Estimation)',
    accuracy: 'Düşük (%30–50 hata)',
    strength: 'Hızlı ve sıfır maliyetli; sürekli kaba farkındalık sağlar.',
    pitfall: 'Az kanamayı abartır, MASİF kanamayı sistematik olarak %30–50 eksik tahmin eder! Tek başına güvenilmemelidir (Bose 2006 · ACOG 794).',
  },
  {
    method: 'Aspiratör Kavanozu − İrigasyon',
    accuracy: 'Orta–İyi',
    strength: 'Sıvı kanamanın ana kaynağını anlık ölçekli kavanozda gösterir.',
    pitfall: 'Kullanılan yıkama SF’si, obstetrikte amniyon sıvısı, ürolojide irigasyon ve karın içi asit mutlaka toplamdan düşülmelidir.',
  },
  {
    method: 'Gravimetrik Yöntem (Tartım · QBL)',
    accuracy: 'Yüksek (Pratik Altın Standart)',
    strength: '1 gram ağırlık artışı ≈ 1 mL kan (Islak g − Kuru g). Obstetrik (QBL) ve pediatrik cerrahide en güvenilir yatak başı yöntemdir.',
    pitfall: 'Kuru spanç/ped darasının bilinmesi ve tartım öncesi irigasyon sıvısıyla karışmaması gerekir.',
  },
  {
    method: 'Kolorimetrik Optik Tarama (Triton™)',
    accuracy: 'Çok Yüksek',
    strength: 'Spanç ve kavanozdaki hemoglobin kütlesini optik analizle doğrudan ölçer; yıkama SF ve amniyon sıvısından etkilenmez.',
    pitfall: 'Özel donanım/sarf maliyeti gerektirir; her merkezde bulunmaz.',
  },
];

const EARLY_WARNING_SIGNS = [
  {
    order: '01',
    title: 'Dinamik Ön Yük (En Erken Sinyal)',
    detail: 'PPV / SVV > %13 ve invaziv arter trasesinde belirgin solunumsal salınım (swing) ortaya çıkar.',
  },
  {
    order: '02',
    title: 'Pleth / PVI & Periferik Vazokonstriksiyon',
    detail: 'Pletismogram amplitüdünde küçülme, PVI artışı, soğuk ekstremite ve SpO₂ dalga kaybı görülür.',
  },
  {
    order: '03',
    title: 'EtCO₂’de Açıklanamayan Düşüş',
    detail: 'Dakika ventilasyonu sabitken EtCO₂ kademeli düşer — azalan pulmoner kan akımı ve kalp debisinin erken işaretidir.',
  },
  {
    order: '04',
    title: 'Sessiz Vazopressör İhtiyacı Artışı',
    detail: 'Aynı MAP’ı korumak için noradrenalin hızının artması veya efedrin/fenilefrin bolus yanıtlarının hızla kısalması.',
  },
  {
    order: '05',
    title: 'AKG’de Baz Açığı (BE ↓) & Laktat (↑)',
    detail: 'Akut kanamada Hb/Hct henüz normal görünürken doku hipoperfüzyonunun ilk güvenilir laboratuvar kanıtıdır.',
  },
  {
    order: '06',
    title: 'Geç Bulgu: Hipotansiyon & Oligüri',
    detail: 'MAP < 65 mmHg ve idrar azalması geç fazdır. Özellikle beta-bloker alan hastada taşikardi hiç olmadan ani çöküş gelişebilir!',
  },
];

const ATLS_CLASSES = [
  {
    cls: 'Sınıf I',
    lossPct: '< %15',
    lossMl: '< 750 mL',
    hr: 'Normal (< 100)',
    bp: 'Normal',
    pulsePressure: 'Normal',
    baseDeficit: '0 .. −2 mEq/L',
    replacement: 'Dengeli kristaloid',
  },
  {
    cls: 'Sınıf II',
    lossPct: '%15 – %30',
    lossMl: '750 – 1500 mL',
    hr: '100 – 120 (Anestezide maskelenebilir!)',
    bp: 'Normal',
    pulsePressure: 'Daralmış ↓',
    baseDeficit: '−2 .. −6 mEq/L',
    replacement: 'Kristaloid ± Kan ürünü hazırlığı',
  },
  {
    cls: 'Sınıf III',
    lossPct: '%30 – %40',
    lossMl: '1500 – 2000 mL',
    hr: '120 – 140',
    bp: 'Düşük ↓',
    pulsePressure: 'Daralmış ↓↓',
    baseDeficit: '−6 .. −10 mEq/L',
    replacement: 'Kristaloid + ES + TDP (1:1)',
  },
  {
    cls: 'Sınıf IV',
    lossPct: '> %40',
    lossMl: '> 2000 mL',
    hr: '> 140 (veya pre-arrest bradikardi)',
    bp: 'Kritik Düşük ↓↓',
    pulsePressure: 'Çok Dar / Alınamaz',
    baseDeficit: '< −10 mEq/L',
    replacement: 'ACİL MTP (1:1:1 · TXA · Ca²⁺)',
  },
];

const MTP_EXECUTION_STEPS = [
  {
    step: '1',
    title: 'MTP Aktivasyonu, Runner Atama & Geçici Cerrahi Hemostaz',
    detail:
      'Kan merkezini arayarak "MTP Kod Kırmızı" başlatın; salondan yalnızca kan taşıma ve ısıtıcıya beslemeden sorumlu bir "Runner" belirleyin. Cross-match beklemeden acil durumda 0 Rh(−) [≤ 50 yaş kadın] veya 0 Rh(+) [erkek / > 50 yaş kadın] ES + AB TDP isteyin; cerraha packing/klemp/turnike/REBOA bildirimi yapın.',
  },
  {
    step: '2',
    title: 'Geniş Damar Yolu (≥ 2 × 14G–16G) & Yüksek Akımlı Isıtıcı (38–40 °C)',
    detail:
      'En az 2 adet kısa-geniş periferik kanül (14G Turuncu / 16G Gri) veya hızlı infüzyon santral kateteri (8.5 Fr MAC / Introducer) açın. Standart uzun 3-lümenli SVK (20 cm) hızlı transfüzyon için yetersizdir (Poiseuille Yasası). Tüm ürünleri yüksek akımlı ısıtıcıdan (Level 1 / Belmont) geçirin.',
  },
  {
    step: '3',
    title: 'Erken Traneksamik Asit (TXA — İlk 3 Saat Penceresi)',
    detail:
      'Kanama/travma başlangıcından sonraki ilk 3 saat içinde 1 g TXA IV (100 mL SF içinde 10 dk) uygulayın, ardından 1 g TXA 8 saatte infüzyon başlatın. Obstetrik kanamada (WOMAN) kanama sürerse 30 dk sonra 1 g ikinci doz verilir (> 3 saat sonra yeni TXA başlanması mortaliteyi artırabilir!).',
  },
  {
    step: '4',
    title: '1:1:1 Dengeli Paket Transfüzyonu (PROPPR Stratejisi)',
    detail:
      'Paket 1 (4–6 Ü ES + 4–6 Ü TDP + 1 Havuz/Aferez Trombosit) ile sabit oranlı dengeli resüsitasyon başlatın. Kristaloidi en fazla 1–1.5 L ile sınırlayın; HES/nişasta/jelatin kolloidlerinden kaçının (dilüsyonel koagülopati ve glikokaliks hasarı).',
  },
  {
    step: '5',
    title: 'Kalsiyum Replasmanı (Her 4 Ünitede 1 · iCa²⁺ > 1.1 mmol/L)',
    detail:
      'Banka kanındaki sitrat iyonize kalsiyumu hızla şelatlar. Her 4 Ü kan ürünü (ES/TDP) sonrası veya iCa²⁺ < 1.1 mmol/L ise %10 CaCl₂ 10 mL (1 g, tercihen SVK) veya %10 Ca-Glukonat 20–30 mL (2–3 g) IV uygulayın.',
  },
  {
    step: '6',
    title: 'ROTEM / TEG & Fibrinojen Hedefli Hemostaz',
    detail:
      'İlk ampirik paketten sonra ROTEM/TEG ve seri lab rehberliğine geçin: İlk tükenen Fibrinojendir (FIBTEM A5 < 10 mm veya < 1.5–2.0 g/L → 2–4 g Fibrinojen Konsantresi veya 10 Ü Kriyopresipitat). EXTEM CT > 80 sn / INR > 1.5 → TDP veya 4F-PCC; PLT < 50.000 (TBI/masif kanamada < 100.000) → 1 Havuz/Aferez PLT; hedef Hb 7–9 g/dL.',
  },
  {
    step: '7',
    title: 'Hipotermi (≥ 36 °C), Permisif Hipotansiyon & Stand-Down',
    detail:
      'Aktif ısıtma ve salon ısısı ≥ 24 °C ile kor ısıyı ≥ 36.0 °C tutun. Kafa travması (TBI) YOKSA cerrahi hemostaza kadar SKB 80–90 / MAP 50–65 mmHg; TBI veya spinal kord travması VARSA MAP ≥ 80 mmHg hedefleyin! Kanama durunca resmi "Stand-Down" bildirip kullanılmayan ürünleri soğuk zincirle Kan Merkezine iade edin.',
  },
];

const REFERENCES = [
  {
    authors: 'Gross JB',
    title: 'Estimating allowable blood loss: corrected for dilution',
    journal: 'Anesthesiology. 1983;58(3):277–280',
    pmid: '6829965',
  },
  {
    authors: 'Bose P, Regan F, Paterson-Brown S',
    title: 'Improving the accuracy of estimated blood loss at obstetric haemorrhage using clinical reconstructions',
    journal: 'BJOG. 2006;113(8):919–924',
    pmid: '16907938',
  },
  {
    authors: 'Mutschler M, Nienaber U, Brockamp T, et al. (TraumaRegister DGU)',
    title: 'Renaissance of base deficit for the initial assessment of trauma patients: a base deficit-based classification for hypovolemic shock',
    journal: 'Crit Care. 2013;17(2):R42',
    pmid: '23497602',
  },
  {
    authors: 'ACOG Committee on Obstetric Practice',
    title: 'Quantitative Blood Loss in Obstetric Hemorrhage: ACOG Committee Opinion, Number 794',
    journal: 'Obstet Gynecol. 2019;134(6):e150–e156',
    pmid: '31764759',
  },
  {
    authors: 'Kietaibl S, Ahmed A, Afshari A, et al. (ESAIC Guidelines)',
    title: 'Management of severe peri-operative bleeding: Guidelines from the European Society of Anaesthesiology and Intensive Care: Second update 2022',
    journal: 'Eur J Anaesthesiol. 2023;40(4):226–304',
    pmid: '36855941',
  },
];

export const IntraoperativeBleedingMonitoringModule: React.FC<IntraoperativeBleedingMonitoringModuleProps> = ({ isDark }) => {
  // Section A: EBV & MABL
  const [profileId, setProfileId] = useState<string>('adult-male');
  const [weightKg, setWeightKg] = useState<number>(80);
  const [startHb, setStartHb] = useState<number>(13.5);
  const [minHb, setMinHb] = useState<number>(8.0);

  // Section B: Live OR Blood Loss Quantifier (EBL / QBL)
  const [suctionTotalMl, setSuctionTotalMl] = useState<number>(950);
  const [irrigationMl, setIrrigationMl] = useState<number>(400);
  const [sponge4x4Count, setSponge4x4Count] = useState<number>(12);
  const [lapPadCount, setLapPadCount] = useState<number>(3);
  const [gravimetricNetG, setGravimetricNetG] = useState<number>(0);
  const [drapeFloorMl, setDrapeFloorMl] = useState<number>(100);

  const activeProfile = PATIENT_PROFILES.find((p) => p.id === profileId) ?? PATIENT_PROFILES[0];

  const handleProfileChange = (next: PatientProfile) => {
    setProfileId(next.id);
    setWeightKg(next.defaultWeight);
    setStartHb(next.defaultStartHb);
    setMinHb(next.defaultMinHb);
  };

  const calc = useMemo(() => {
    const safeWeight = Math.max(0.5, weightKg || 0.5);
    const ebv = Math.round(safeWeight * activeProfile.ebvPerKg);

    const validHbDiff = Math.max(0, (startHb || 0) - (minHb || 0));
    const avgHb = Math.max(1, ((startHb || 0) + (minHb || 0)) / 2);
    const mablGross = Math.round((ebv * validHbDiff) / avgHb);

    const netSuction = Math.max(0, (suctionTotalMl || 0) - (irrigationMl || 0));
    const spongeMl = Math.max(0, sponge4x4Count || 0) * 10;
    const lapPadMl = Math.max(0, lapPadCount || 0) * 100;
    const gravMl = Math.max(0, gravimetricNetG || 0);
    const extraMl = Math.max(0, drapeFloorMl || 0);
    const totalEbl = Math.round(netSuction + spongeMl + lapPadMl + gravMl + extraMl);

    const pctEbv = ebv > 0 ? (totalEbl / ebv) * 100 : 0;
    const pctMabl = mablGross > 0 ? (totalEbl / mablGross) * 100 : totalEbl > 0 ? 150 : 0;

    let atlsClass = 'Sınıf I (< %15 EBV)';
    if (pctEbv >= 40) atlsClass = 'Sınıf IV (> %40 EBV)';
    else if (pctEbv >= 30) atlsClass = 'Sınıf III (%30–40 EBV)';
    else if (pctEbv >= 15) atlsClass = 'Sınıf II (%15–30 EBV)';

    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let headline = '';
    let guidance = '';

    if (pctEbv >= 40 || (mablGross > 0 && totalEbl >= mablGross * 1.25)) {
      status = 'critical';
      headline = `KRİTİK KAN KAYBI (${totalEbl} mL · %${pctEbv.toFixed(0)} EBV) — MABL Ciddi Düzeyde Aşıldı!`;
      guidance =
        'Acil eritrosit + TDP + trombosit replasmanı (aktif masif kanamada MTP 1:1:1), TXA (1 g IV), iCa²⁺ ve sıcaklık koruması (≥ 36 °C) başlatın; ROTEM/TEG ve seri AKG (Hb, laktat, BE, iCa²⁺) alın.';
    } else if ((mablGross > 0 && totalEbl >= mablGross) || pctEbv >= 25) {
      status = 'critical';
      headline = `MABL Eşiği Aşıldı (${totalEbl} mL / MABL ${mablGross} mL) — Transfüzyon Eşiği!`;
      guidance =
        'İzin verilebilir maksimum kan kaybına ulaşıldı. Güncel AKG/Hb kontrolü yapın, cross-match edilmiş eritrosit süspansiyonunu masaya getirin, PPV/SVV, laktat ve cerrahi hemostazı gözden geçirin.';
    } else if ((mablGross > 0 && totalEbl >= mablGross * 0.7) || pctEbv >= 15) {
      status = 'warning';
      headline = `MABL’ın %${Math.round(pctMabl)}’ine Ulaşıldı (${totalEbl} mL · ${atlsClass})`;
      guidance =
        'Dengeli kristaloid (veya seçilmiş olguda kolloid) ile normovolemiyi koruyun, kan bankası hazırlığını (Type & Cross) teyit edin ve erken baz açığı/laktat takibine geçin.';
    } else {
      status = 'optimal';
      headline = `MABL Sınırları İçinde (${totalEbl} mL · %${pctEbv.toFixed(0)} EBV · ${atlsClass})`;
      guidance =
        'Mevcut ölçülen kayıp izin verilebilir sınırın altında. Aspiratör yıkama hacmini hemşireyle düzenli güncelleyin ve gizli/örtü altı kanama açısından hemodinamiyi izleyin.';
    }

    return {
      ebv,
      mablGross,
      netSuction,
      spongeMl,
      lapPadMl,
      totalEbl,
      pctEbv,
      atlsClass,
      status,
      headline,
      guidance,
    };
  }, [
    weightKg,
    activeProfile,
    startHb,
    minHb,
    suctionTotalMl,
    irrigationMl,
    sponge4x4Count,
    lapPadCount,
    gravimetricNetG,
    drapeFloorMl,
  ]);

  const inputClass = `w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-red-500 ${
    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
  }`;

  const drapeFill = isDark ? '#0f2942' : '#dbeafe';
  const drapeStroke = isDark ? '#1e3a5f' : '#93c5fd';

  return (
    <div className="space-y-7 pb-8">
      {/* ===================================================================== */}
      {/* HEADER                                                                */}
      {/* ===================================================================== */}
      <header className={`pb-5 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span className="text-red-600 dark:text-red-400 font-semibold">Hemostaz &amp; Volüm Yönetimi</span>
          <span aria-hidden="true">·</span>
          <span>Ameliyathane Pratik Rehberi</span>
          <span aria-hidden="true">·</span>
          <span>Gross 1983 · Bose 2006 · ACOG 794 · ATLS 10 · ESAIC 2023</span>
        </div>

        <h1
          className={`mt-2 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          İntraoperatif Kanama Takibi (EBL · QBL · MABL · MTP)
        </h1>

        <p className={`mt-2.5 text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Ameliyathanede <strong>EBV / MABL</strong> hesabı, aspiratör/spanç/gravimetrik (QBL) ölçüm,{' '}
          <strong>görsel spanç &amp; göllenme rehberi</strong>, genel anestezide maskelenen <strong>gizli kanama</strong>{' '}
          uyarıları, <strong>ATLS 10</strong> sınıflaması, <strong>cerrahi vs. koagülopatik</strong> ayrım ve{' '}
          <strong>Masif Transfüzyon Protokolü (MTP)</strong> uygulama akışı.
        </p>
      </header>

      {/* ===================================================================== */}
      {/* 1. BEDSIDE EBV / MABL + LIVE EBL/QBL QUANTIFIER                       */}
      {/* ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
          <Calculator className="w-4 h-4" />
          <span>Yatak Başı EBV · MABL (Gross) &amp; Anlık Kan Kaybı (EBL/QBL) Hesaplayıcı</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left: Patient Profile + EBV/MABL */}
          <div
            className={`lg:col-span-5 rounded-xl border p-4 space-y-3.5 ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              1. Hasta Profili &amp; MABL Sınırı
            </div>

            <div className="flex flex-wrap gap-1.5">
              {PATIENT_PROFILES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleProfileChange(p)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                    profileId === p.id
                      ? isDark
                        ? 'bg-red-500/20 border-red-400 text-red-200'
                        : 'bg-red-50 border-red-400 text-red-900'
                      : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <label className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500">Ağırlık (kg)</span>
                <input
                  type="number"
                  min={1}
                  max={250}
                  step={profileId === 'neonate' || profileId === 'preterm' ? 0.1 : 1}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className={inputClass}
                />
              </label>
              <label className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500">Başl. Hb</span>
                <input
                  type="number"
                  min={5}
                  max={22}
                  step={0.1}
                  value={startHb}
                  onChange={(e) => setStartHb(Number(e.target.value))}
                  className={inputClass}
                />
              </label>
              <label className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-500">Alt Eşik Hb</span>
                <input
                  type="number"
                  min={5}
                  max={14}
                  step={0.5}
                  value={minHb}
                  onChange={(e) => setMinHb(Number(e.target.value))}
                  className={inputClass}
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[10px] font-mono text-slate-400">Tahmini Kan Hacmi (EBV)</div>
                <div className="mt-0.5 text-lg font-mono font-bold tabular-nums text-sky-500">
                  {calc.ebv.toLocaleString('tr-TR')} <span className="text-[10px] font-normal">mL</span>
                </div>
                <div className="text-[10px] text-slate-400">{activeProfile.ebvPerKg} mL/kg</div>
              </div>
              <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[10px] font-mono text-slate-400">MABL (Gross 1983)</div>
                <div className="mt-0.5 text-lg font-mono font-bold tabular-nums text-emerald-500">
                  {calc.mablGross.toLocaleString('tr-TR')} <span className="text-[10px] font-normal">mL</span>
                </div>
                <div className="text-[10px] text-slate-400">Dilüsyon düzeltmeli</div>
              </div>
            </div>

            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <strong>Gross Formülü:</strong> MABL = EBV × (Hb<sub>başl</sub> − Hb<sub>min</sub>) / Hb<sub>ort</sub>. KAH veya
              serebrovasküler hastalıkta alt eşik Hb genellikle <strong>8–9 g/dL</strong>, sağlıklı erişkinde <strong>7 g/dL</strong> seçilir.
            </p>
          </div>

          {/* Right: Live Blood Loss Quantifier + Verdict */}
          <div className="lg:col-span-7 space-y-3">
            <div
              className={`rounded-xl border p-4 space-y-3 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2. Anlık Ameliyathane Kan Kaybı Toplayıcısı (EBL / QBL)
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <label className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Aspiratör Toplam (mL)</span>
                  <input type="number" min={0} step={50} value={suctionTotalMl} onChange={(e) => setSuctionTotalMl(Number(e.target.value))} className={inputClass} />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Yıkama SF / İrigasyon (mL)</span>
                  <input type="number" min={0} step={50} value={irrigationMl} onChange={(e) => setIrrigationMl(Number(e.target.value))} className={inputClass} />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Tam Islak 4×4 Spanç (×10 mL)</span>
                  <input type="number" min={0} step={1} value={sponge4x4Count} onChange={(e) => setSponge4x4Count(Number(e.target.value))} className={inputClass} />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Tam Islak Batın Pedi (×100 mL)</span>
                  <input type="number" min={0} step={1} value={lapPadCount} onChange={(e) => setLapPadCount(Number(e.target.value))} className={inputClass} />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Gravimetrik Net Tartım (g = mL)</span>
                  <input type="number" min={0} step={10} value={gravimetricNetG} onChange={(e) => setGravimetricNetG(Number(e.target.value))} className={inputClass} />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500">Örtü / Zemin Tahmini (mL)</span>
                  <input type="number" min={0} step={50} value={drapeFloorMl} onChange={(e) => setDrapeFloorMl(Number(e.target.value))} className={inputClass} />
                </label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 tabular-nums">
                <span>
                  Net Aspiratör: <strong>{calc.netSuction} mL</strong> · Spanç: <strong>{calc.spongeMl} mL</strong> · Batın:{' '}
                  <strong>{calc.lapPadMl} mL</strong>
                </span>
                <span className="text-red-600 dark:text-red-400 font-bold text-xs">
                  Toplam EBL: {calc.totalEbl.toLocaleString('tr-TR')} mL ({calc.pctEbv.toFixed(1)}% EBV)
                </span>
              </div>
            </div>

            {/* Dual-Coded Verdict Banner */}
            <div
              className={`rounded-xl border p-4 space-y-1.5 text-xs leading-relaxed ${
                calc.status === 'optimal'
                  ? isDark
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : calc.status === 'critical'
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                    : isDark
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="font-bold text-sm flex items-start gap-1.5">
                {calc.status === 'optimal' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : calc.status === 'critical' ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <span>{calc.headline}</span>
              </div>
              <p>{calc.guidance}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. QUANTIFICATION METHODS (FULL WIDTH)                                */}
      {/* ===================================================================== */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-sky-500" />
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Kan Kaybı Nasıl Ölçülür? (Görsel Tahmin vs. Gravimetrik QBL)
          </h2>
        </div>

        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-2.5 px-4 font-bold">Ölçüm Yöntemi</th>
                <th className="py-2.5 px-4 font-bold">Doğruluk</th>
                <th className="py-2.5 px-4 font-bold">Güçlü Yönü</th>
                <th className="py-2.5 px-4 font-bold">Klinik Tuzak &amp; Kural</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {MEASUREMENT_METHODS.map((row) => (
                <tr key={row.method} className="align-top">
                  <td className={`py-2.5 px-4 font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.method}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-[11px] whitespace-nowrap">{row.accuracy}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[200px]">{row.strength}</td>
                  <td className="py-2.5 px-4 leading-relaxed text-rose-600 dark:text-rose-400 font-medium min-w-[230px]">
                    {row.pitfall}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. PICTORIAL SPONGE & POOL VOLUME GUIDE (MOVED BELOW, FULL WIDTH)     */}
      {/* ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-500" />
            <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Pratik Spanç &amp; Göllenme Hacimleri (Görsel Kılavuz)
            </h2>
          </div>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Bose et al. (BJOG 2006) &amp; ACOG 794 görsel rekonstrüksiyon standardı
          </span>
        </div>

        {/* 6 Pictorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Card 1: 4x4 Sponge (50% vs 100%) */}
          <div className={`rounded-xl border p-3.5 space-y-2.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <svg viewBox="0 0 240 116" className="w-full h-auto rounded-lg" role="img" aria-label="4x4 spanç yarı ıslak 5 mL ve tam doymuş 10 mL">
              <defs>
                <pattern id="gauzeMesh1" width="6" height="6" patternUnits="userSpaceOnUse">
                  <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="0.7" />
                </pattern>
              </defs>
              <rect width="240" height="116" rx="8" fill={drapeFill} stroke={drapeStroke} strokeWidth="1" />
              {/* Half-wet 4x4 */}
              <rect x="24" y="20" width="76" height="66" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
              <rect x="24" y="20" width="76" height="66" rx="5" fill="url(#gauzeMesh1)" />
              <path d="M44 40 C52 32, 74 34, 80 48 C84 62, 72 72, 56 70 C42 68, 38 50, 44 40 Z" fill="#b91c1c" fillOpacity="0.88" />
              <text x="62" y="102" textAnchor="middle" fill={isDark ? '#cbd5e1' : '#334155'} fontSize="10" fontWeight="700" fontFamily="monospace">
                Yarı Islak: ~5 mL
              </text>
              {/* Fully saturated 4x4 */}
              <rect x="140" y="20" width="76" height="66" rx="5" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1.2" />
              <rect x="140" y="20" width="76" height="66" rx="5" fill="url(#gauzeMesh1)" />
              <path d="M144 24 C166 20, 206 22, 212 32 C216 54, 214 78, 204 82 C178 86, 148 84, 144 74 Z" fill="#dc2626" fillOpacity="0.55" />
              <text x="178" y="102" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700" fontFamily="monospace">
                Tam Doymuş: 10 mL
              </text>
            </svg>
            <div className="flex items-baseline justify-between gap-2">
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>4 × 4 Gazlı Bez (10×10 cm)</span>
              <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400">5 – 10 mL</span>
            </div>
          </div>

          {/* Card 2: Ray-Tec Small Surgical Pad */}
          <div className={`rounded-xl border p-3.5 space-y-2.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <svg viewBox="0 0 240 116" className="w-full h-auto rounded-lg" role="img" aria-label="Ray-Tec küçük cerrahi ped 15-20 mL">
              <rect width="240" height="116" rx="8" fill={drapeFill} stroke={drapeStroke} strokeWidth="1" />
              {/* Half-wet Ray-Tec */}
              <rect x="20" y="26" width="84" height="54" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
              <rect x="20" y="26" width="84" height="54" rx="5" fill="url(#gauzeMesh1)" />
              <path d="M36 38 C52 32, 82 34, 88 48 C92 62, 76 70, 56 68 C38 66, 30 50, 36 38 Z" fill="#b91c1c" fillOpacity="0.86" />
              {/* Blue radiopaque thread */}
              <path d="M24 34 Q42 54 28 74" fill="none" stroke="#2563eb" strokeWidth="2" />
              <text x="62" y="102" textAnchor="middle" fill={isDark ? '#cbd5e1' : '#334155'} fontSize="10" fontWeight="700" fontFamily="monospace">
                Yarı: ~10 mL
              </text>
              {/* Saturated Ray-Tec */}
              <rect x="136" y="26" width="84" height="54" rx="5" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1.2" />
              <rect x="136" y="26" width="84" height="54" rx="5" fill="url(#gauzeMesh1)" />
              <path d="M140 34 Q158 54 144 74" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <text x="178" y="102" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700" fontFamily="monospace">
                Tam: 15–20 mL
              </text>
            </svg>
            <div className="flex items-baseline justify-between gap-2">
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Küçük Cerrahi Ped (Ray-Tec)</span>
              <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400">15 – 20 mL</span>
            </div>
          </div>

          {/* Card 3: Large Lap Pad (Batın Kompresi) */}
          <div className={`rounded-xl border p-3.5 space-y-2.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <svg viewBox="0 0 240 116" className="w-full h-auto rounded-lg" role="img" aria-label="Büyük batın kompresi yarı ıslak 50 mL tam doymuş 100-150 mL">
              <rect width="240" height="116" rx="8" fill={drapeFill} stroke={drapeStroke} strokeWidth="1" />
              {/* Half-wet Lap Pad */}
              <rect x="18" y="14" width="88" height="72" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.3" />
              <rect x="18" y="14" width="88" height="72" rx="6" fill="url(#gauzeMesh1)" />
              <path d="M32 28 C54 20, 88 26, 94 48 C98 68, 76 78, 52 74 C30 70, 24 44, 32 28 Z" fill="#b91c1c" fillOpacity="0.88" />
              {/* Blue corner loop */}
              <path d="M18 22 C8 14, 8 34, 18 30" fill="none" stroke="#2563eb" strokeWidth="2.2" />
              <text x="62" y="102" textAnchor="middle" fill={isDark ? '#cbd5e1' : '#334155'} fontSize="10" fontWeight="700" fontFamily="monospace">
                Yarı: ~50 mL
              </text>
              {/* Saturated Lap Pad */}
              <rect x="134" y="14" width="88" height="72" rx="6" fill="#7f1d1d" stroke="#450a0a" strokeWidth="1.3" />
              <rect x="134" y="14" width="88" height="72" rx="6" fill="url(#gauzeMesh1)" />
              <path d="M140 20 C168 16, 212 18, 216 36 C220 62, 214 80, 198 82 C166 86, 140 82, 138 66 Z" fill="#dc2626" fillOpacity="0.5" />
              <path d="M134 22 C124 14, 124 34, 134 30" fill="none" stroke="#3b82f6" strokeWidth="2.2" />
              <text x="178" y="102" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700" fontFamily="monospace">
                Tam: 100–150 mL
              </text>
            </svg>
            <div className="flex items-baseline justify-between gap-2">
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Batın Kompresi (30–45 cm)</span>
              <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400">100 – 150 mL</span>
            </div>
          </div>

          {/* Card 4: Full Kidney Dish (~500 mL) */}
          <div className={`rounded-xl border p-3.5 space-y-2.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <svg viewBox="0 0 240 116" className="w-full h-auto rounded-lg" role="img" aria-label="Dolu böbrek küveti yaklaşık 500 mL">
              <rect width="240" height="116" rx="8" fill={drapeFill} stroke={drapeStroke} strokeWidth="1" />
              {/* Stainless kidney dish outer rim */}
              <path
                d="M44 46 C44 20, 98 18, 120 34 C142 18, 196 20, 196 46 C196 76, 166 94, 120 88 C74 94, 44 76, 44 46 Z"
                fill="#cbd5e1"
                stroke="#64748b"
                strokeWidth="2.2"
              />
              {/* Inner blood pool */}
              <path
                d="M54 48 C54 28, 98 26, 120 40 C142 26, 186 28, 186 48 C186 70, 160 84, 120 79 C80 84, 54 70, 54 48 Z"
                fill="#991b1b"
              />
              {/* Specular reflection */}
              <path d="M72 44 Q92 38 106 46" fill="none" stroke="#fca5a5" strokeOpacity="0.45" strokeWidth="2.2" strokeLinecap="round" />
              <text x="120" y="104" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700" fontFamily="monospace">
                Dolu Böbrek Küveti ≈ 500 mL
              </text>
            </svg>
            <div className="flex items-baseline justify-between gap-2">
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Dolu Böbrek Küveti</span>
              <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400">~500 mL</span>
            </div>
          </div>

          {/* Card 5: 50 cm Floor Spill (~500 mL) */}
          <div className={`rounded-xl border p-3.5 space-y-2.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <svg viewBox="0 0 240 116" className="w-full h-auto rounded-lg" role="img" aria-label="50 cm çaplı zemin göllenmesi yaklaşık 500 mL">
              <defs>
                <pattern id="floorTile" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="240" height="116" rx="8" fill={isDark ? '#0f172a' : '#f1f5f9'} stroke={isDark ? '#1e293b' : '#cbd5e1'} />
              <rect width="240" height="116" rx="8" fill="url(#floorTile)" />
              {/* 50 cm pool */}
              <path
                d="M84 44 C92 24, 146 24, 154 44 C162 66, 142 82, 118 82 C94 82, 76 64, 84 44 Z"
                fill="#991b1b"
                fillOpacity="0.92"
              />
              {/* Diameter measurement line */}
              <line x1="82" y1="54" x2="156" y2="54" stroke="#fef2f2" strokeWidth="1.4" strokeDasharray="3 2" />
              <text x="119" y="50" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="700" fontFamily="monospace">
                Ø 50 cm
              </text>
              <text x="120" y="104" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700" fontFamily="monospace">
                50 cm Zemin Göllenmesi ≈ 500 mL
              </text>
            </svg>
            <div className="flex items-baseline justify-between gap-2">
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>50 cm Zemin / Örtü Göllenmesi</span>
              <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400">~500 mL</span>
            </div>
          </div>

          {/* Card 6: 100 cm Floor Spill (~1000-1500 mL) */}
          <div className={`rounded-xl border p-3.5 space-y-2.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <svg viewBox="0 0 240 116" className="w-full h-auto rounded-lg" role="img" aria-label="100 cm çaplı geniş zemin göllenmesi 1000-1500 mL">
              <rect width="240" height="116" rx="8" fill={isDark ? '#0f172a' : '#f1f5f9'} stroke={isDark ? '#1e293b' : '#cbd5e1'} />
              <rect width="240" height="116" rx="8" fill="url(#floorTile)" />
              {/* 100 cm wide pool */}
              <path
                d="M34 48 C44 16, 128 12, 178 24 C212 32, 214 68, 184 82 C142 94, 62 90, 38 72 C26 64, 28 56, 34 48 Z"
                fill="#7f1d1d"
                fillOpacity="0.93"
              />
              <path
                d="M52 46 C72 28, 152 24, 180 42 C194 58, 168 76, 118 78 C74 78, 42 62, 52 46 Z"
                fill="#b91c1c"
                fillOpacity="0.55"
              />
              <line x1="34" y1="54" x2="206" y2="54" stroke="#fef2f2" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="120" y="50" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="monospace">
                Ø 100 cm (1 Metre)
              </text>
              <text x="120" y="104" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="700" fontFamily="monospace">
                100 cm Göllenme ≈ 1000–1500 mL
              </text>
            </svg>
            <div className="flex items-baseline justify-between gap-2">
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>100 cm Geniş Zemin Göllenmesi</span>
              <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400">1000 – 1500 mL</span>
            </div>
          </div>
        </div>

        {/* Pediatric Golden Rule */}
        <div
          className={`rounded-xl border p-3.5 text-xs leading-relaxed ${
            isDark ? 'bg-amber-950/20 border-amber-500/35 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <strong>Pediatrik Altın Kural:</strong> 10 kg bir çocukta toplam EBV yalnızca <strong>750–800 mL</strong>’dir!
          Sadece 2 tam ıslak batın kompresi (200 mL) bu çocukta <strong>%25 kan hacmi kaybı (Sınıf II–III şok)</strong>{' '}
          demektir — bebek ve çocuklarda küçük ölçekli (100–250 mL) aspiratör kavanozu ve gravimetrik tartım şarttır.
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. SILENT/OCCULT BLEEDING: 6 EARLY SIGNS (FULL WIDTH)                 */}
      {/* ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-rose-500" />
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Anestezi Taşikardiyi Maskeler — Gizli Kanamada İlk Bozulan 6 İşaret
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EARLY_WARNING_SIGNS.map((item) => (
            <div
              key={item.order}
              className={`rounded-xl border p-4 space-y-1.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                  {item.order}
                </span>
                <h3 className={`text-xs font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h3>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.detail}</p>
            </div>
          ))}
        </div>

        <div
          className={`rounded-xl border p-3.5 text-xs leading-relaxed ${
            isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <strong>Görünmeyen Gizli (Okült) Kanama Odakları:</strong> Cerrahi saha kuru görünürken hemodinami bozuluyorsa{' '}
          <strong>retroperiton</strong> (pelvik/vasküler/üroloji), <strong>plevral boşluk / hemotoraks</strong>, batın içi
          (tıkanmış aspiratör), <strong>uyluk/pelvis fraktürü</strong> ve <strong>ameliyat örtüsü / masa altı göllenmesini</strong>{' '}
          (özellikle obstetrik ve ortopedide!) mutlaka kontrol edin.
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. ATLS 10 HEMORRHAGIC SHOCK TABLE (MOVED BELOW, FULL WIDTH)          */}
      {/* ===================================================================== */}
      <section className="space-y-2.5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            ATLS 10. Baskı Hemorajik Şok Sınıflaması (Baz Açığı Dahil)
          </h2>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            70 kg erişkin (EBV ≈ 5000 mL) referanslı · Mutschler 2013
          </span>
        </div>

        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-2.5 px-3.5 font-bold">Sınıf</th>
                <th className="py-2.5 px-3.5 font-bold">Kan Kaybı (%EBV)</th>
                <th className="py-2.5 px-3.5 font-bold">Tahmini Hacim</th>
                <th className="py-2.5 px-3.5 font-bold">Kalp Hızı</th>
                <th className="py-2.5 px-3.5 font-bold">KB / Nabız Basıncı</th>
                <th className="py-2.5 px-3.5 font-bold">Baz Açığı (BE)</th>
                <th className="py-2.5 px-3.5 font-bold">İlk Replasman</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {ATLS_CLASSES.map((row) => (
                <tr key={row.cls} className="align-top">
                  <td className={`py-2.5 px-3.5 font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.cls}
                  </td>
                  <td className="py-2.5 px-3.5 font-mono font-bold whitespace-nowrap text-red-600 dark:text-red-400">
                    {row.lossPct}
                  </td>
                  <td className="py-2.5 px-3.5 font-mono whitespace-nowrap">{row.lossMl}</td>
                  <td className="py-2.5 px-3.5 min-w-[140px]">{row.hr}</td>
                  <td className="py-2.5 px-3.5 min-w-[145px]">
                    {row.bp} · <span className="text-slate-500">{row.pulsePressure}</span>
                  </td>
                  <td className="py-2.5 px-3.5 font-mono font-bold whitespace-nowrap text-amber-600 dark:text-amber-400">
                    {row.baseDeficit}
                  </td>
                  <td className="py-2.5 px-3.5 min-w-[165px]">{row.replacement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. SURGICAL vs. COAGULOPATHIC BLEEDING                                */}
      {/* ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-red-500" />
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Cerrahi Kanama vs. Koagülopatik (Mikrovasküler) Kanama Ayrımı
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`rounded-xl border p-4 space-y-2 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Cerrahi (Mekanik) Kanama
            </div>
            <ul className={`text-xs leading-relaxed space-y-1.5 list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>Kanama <strong>tek bir anatomik odaktan</strong> (arteriyel pulsatil veya büyük venöz akış) gelir.</li>
              <li>Diğer cerrahi doku yüzeyleri, insizyon kenarları ve IV/arter kateter girişleri <strong>kurudur</strong>.</li>
              <li>Sahada normal pıhtılaşma gözlenir; ROTEM/TEG ve fibrinojen başlangıçta normaldir.</li>
              <li><strong>Çözüm:</strong> Cerrahi hemostaz (sütür, klips, kompresyon, koter veya girişimsel embolizasyon) + normovolemik destek.</li>
            </ul>
          </div>

          <div
            className={`rounded-xl border p-4 space-y-2 ${
              isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Koagülopatik (Mikrovasküler) Kanama — ESAIC 2023
            </div>
            <ul className={`text-xs leading-relaxed space-y-1.5 list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>Tüm kesik yüzeylerden, mukozalardan ve IV/arter/SVK giriş yerlerinden <strong>yaygın sızıntı (oozing)</strong> vardır; pıhtı tutmaz.</li>
              <li><strong>Ölümcül Dörtlü’yü kır:</strong> Kor ısı <strong>≥ 36.0 °C</strong>, <strong>pH &gt; 7.20</strong>, <strong>iCa<sup>2+</sup> &gt; 0.90–1.00 mmol/L</strong>.</li>
              <li><strong>İlk tükenen faktör Fibrinojendir!</strong> Hedef: <strong>&gt; 1.5–2.0 g/L</strong> (obstetrik kanamada <strong>&gt; 2.0 g/L</strong>) · Trombosit <strong>&gt; 50.000</strong> (TBI/aktif masif kanamada &gt; 100.000).</li>
              <li><strong>Erken TXA (1 g IV)</strong> ve mümkünse <strong>ROTEM/TEG</strong> rehberliğinde hedefli faktör/ürün replasmanı başlatın.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. MASSIVE TRANSFUSION PROTOCOL (MTP): INDICATIONS & EXECUTION        */}
      {/* ===================================================================== */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-500" />
            <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Masif Transfüzyon Protokolü (MTP) — Endikasyonlar &amp; Ameliyathane Uygulaması
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
            Anestezi Acilleri · Kod Kırmızı · 1:1:1 &amp; ROTEM
          </span>
        </div>

        {/* MTP Indications & Scoring Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <div
            className={`lg:col-span-6 rounded-xl border p-4 space-y-2.5 ${
              isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              MTP Aktivasyon Endikasyonları (Laboratuvarı Bekleme!)
            </div>
            <ul className={`text-xs leading-relaxed space-y-1.5 list-disc pl-4 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              <li><strong>Klasik Tanım:</strong> 24 saatte <strong>≥ 10 Ünite ES</strong> (~1 toplam kan hacmi; 70 mL/kg).</li>
              <li><strong>Dinamik Acil Tanım:</strong> <strong>1 saatte ≥ 4 Ü ES</strong> + devam eden kontrolsüz kanama.</li>
              <li><strong>Hızlı Kayıp Tanımı:</strong> 3 saatte <strong>&gt; %50 EBV kaybı</strong> veya <strong>≥ 150 mL/dk</strong> aktif hemoraji.</li>
              <li><strong>Obstetrik (PPH):</strong> <strong>&gt; 1500 mL</strong> kanama + devam eden akış veya <strong>Şok İndeksi ≥ 1.1</strong>.</li>
              <li><strong>Hemodinami / AKG:</strong> Kristaloide geçici yanıt/yanıtsızlık (ATLS Evre III–IV) veya hızla derinleşen asidoz (<strong>BE &lt; −6</strong>, <strong>Laktat &gt; 4</strong>).</li>
            </ul>
          </div>

          <div
            className={`lg:col-span-6 rounded-xl border p-4 space-y-2.5 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              ABC Skoru (≥ 2 Puan → MTP Aktive Et) &amp; Şok İndeksi
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: '1. Penetran Mekanizma', pts: '+1 Puan' },
                { label: '2. Başlangıç SKB ≤ 90 mmHg', pts: '+1 Puan' },
                { label: '3. Başlangıç Nabız ≥ 120 /dk', pts: '+1 Puan' },
                { label: '4. Pozitif FAST Ultrason', pts: '+1 Puan' },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`px-2.5 py-2 rounded-lg border flex items-center justify-between gap-2 ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{s.label}</span>
                  <span className="font-mono text-[11px] font-bold text-rose-500 shrink-0">{s.pts}</span>
                </div>
              ))}
            </div>
            <p className={`text-xs leading-relaxed pt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <strong>Şok İndeksi (SI = Kalp Hızı / SKB):</strong> Normal <strong>0.5–0.7</strong> · <strong>≥ 1.0</strong> MTP hazırlığı ·{' '}
              <strong>≥ 1.4</strong> acil MTP ve erken koagülopati alarmı. MTP aktivasyonundaki her 1 dakikalık gecikme mortaliteyi %5 artırır!
            </p>
          </div>
        </div>

        {/* 7-Step Anesthesia Emergency MTP Implementation */}
        <div
          className={`rounded-xl border p-4 sm:p-5 space-y-3 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Anestezi Acilleri MTP Uygulama Protokolü (7 Temel Adım)
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Detaylı doz hesaplayıcı ve paket şeması: Anestezi Acilleri → Masif Transfüzyon Protokolü
            </span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {MTP_EXECUTION_STEPS.map((item) => (
              <div key={item.step} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3">
                <span className="font-mono text-xs font-bold w-6 h-6 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div className="space-y-0.5">
                  <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 8. VERIFIED PUBMED REFERENCES                                         */}
      {/* ===================================================================== */}
      <section
        className={`rounded-xl border p-4 space-y-2.5 ${
          isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          <BookOpen className="w-3.5 h-3.5 text-red-500" />
          <span>Kanıta Dayalı Kaynaklar (PubMed Doğrulamalı)</span>
        </div>
        <ul className="space-y-2 text-xs">
          {REFERENCES.map((ref) => (
            <li
              key={ref.pmid}
              className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <div>
                <span className="font-semibold">{ref.authors}.</span> {ref.title}.{' '}
                <span className="italic text-slate-500">{ref.journal}.</span>
              </div>
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
        </ul>
      </section>
    </div>
  );
};
