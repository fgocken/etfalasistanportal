export type AlbuminUnit = 'g/dL' | 'g/L';
export type LactateUnit = 'mmol/L' | 'mg/dL';
export type GlucoseUnit = 'mg/dL' | 'mmol/L';
export type UreaMode = 'urea' | 'bun';
export type SampleType = 'abg' | 'vbg';
export type RespChronicity = 'acute' | 'chronic';

export interface AbgInputValues {
  sampleType: SampleType;
  ph: string;
  pco2: string;
  hco3: string;
  sbe: string;
  na: string;
  k: string;
  cl: string;
  alb: string;
  albUnit: AlbuminUnit;
  lac: string;
  lacUnit: LactateUnit;
  pao2: string;
  fio2: string;
  age: string;
  peep: string;
  hb: string;
  sao2: string;
  glucose: string;
  glucoseUnit: GlucoseUnit;
  bun: string;
  ureaMode: UreaMode;
  measuredOsm: string;
  tempC: string;
  urcl: string;
  respChronicity: RespChronicity;
}

export interface AbgPreset {
  id: string;
  label: string;
  summary: string;
  values: Partial<AbgInputValues>;
}

export const DEFAULT_ABG_INPUTS: AbgInputValues = {
  sampleType: 'abg',
  ph: '7.40',
  pco2: '40',
  hco3: '',
  sbe: '',
  na: '140',
  k: '4.2',
  cl: '104',
  alb: '4.0',
  albUnit: 'g/dL',
  lac: '1.0',
  lacUnit: 'mmol/L',
  pao2: '95',
  fio2: '0.21',
  age: '40',
  peep: '',
  hb: '13.5',
  sao2: '98',
  glucose: '',
  glucoseUnit: 'mg/dL',
  bun: '',
  ureaMode: 'urea',
  measuredOsm: '',
  tempC: '37.0',
  urcl: '',
  respChronicity: 'acute'
};

export const ABG_PRESETS: AbgPreset[] = [
  {
    id: 'normal',
    label: 'Normal AKG',
    summary: 'Fizyolojik referans değerler',
    values: { ...DEFAULT_ABG_INPUTS, age: '35' }
  },
  {
    id: 'dka',
    label: 'Diyabetik Ketoasidoz',
    summary: 'HAGMA + Kussmaul hiperventilasyonu + hiperglisemi',
    values: {
      ...DEFAULT_ABG_INPUTS,
      ph: '7.18',
      pco2: '22',
      hco3: '8',
      sbe: '',
      na: '134',
      k: '5.4',
      cl: '96',
      alb: '4.2',
      lac: '2.1',
      pao2: '100',
      fio2: '0.21',
      age: '28',
      glucose: '480',
      ureaMode: 'urea',
      bun: '56',
      respChronicity: 'acute'
    }
  },
  {
    id: 'sepsis',
    label: 'Sepsis · Laktik Asidoz',
    summary: 'Laktat yüksekliği + hipoksemi + hipoalbüminemi',
    values: {
      ...DEFAULT_ABG_INPUTS,
      ph: '7.21',
      pco2: '30',
      hco3: '12',
      sbe: '-14',
      na: '138',
      k: '4.8',
      cl: '100',
      alb: '2.6',
      lac: '6.5',
      pao2: '72',
      fio2: '0.40',
      peep: '8',
      hb: '10.4',
      sao2: '93',
      age: '62',
      respChronicity: 'acute'
    }
  },
  {
    id: 'copd',
    label: 'Kronik KOAH Alevlenme',
    summary: 'Kronik hiperkapni + renal kompansasyon',
    values: {
      ...DEFAULT_ABG_INPUTS,
      ph: '7.32',
      pco2: '60',
      hco3: '31',
      sbe: '',
      na: '141',
      k: '4.4',
      cl: '98',
      alb: '3.8',
      lac: '1.2',
      pao2: '62',
      fio2: '0.28',
      age: '68',
      hb: '15.2',
      sao2: '90',
      respChronicity: 'chronic'
    }
  },
  {
    id: 'vomiting',
    label: 'Kusma · Metabolik Alkaloz',
    summary: 'Hipokloremik, hipopotasemik, klora yanıtlı alkaloz',
    values: {
      ...DEFAULT_ABG_INPUTS,
      ph: '7.52',
      pco2: '48',
      hco3: '38',
      sbe: '',
      na: '136',
      k: '3.0',
      cl: '84',
      alb: '4.0',
      lac: '1.0',
      pao2: '90',
      fio2: '0.21',
      age: '45',
      urcl: '8',
      respChronicity: 'acute'
    }
  },
  {
    id: 'diarrhea',
    label: 'İshal · Normal AG Asidoz',
    summary: 'Hiperkloremik metabolik asidoz (NAGMA)',
    values: {
      ...DEFAULT_ABG_INPUTS,
      ph: '7.28',
      pco2: '26',
      hco3: '12',
      sbe: '',
      na: '136',
      k: '3.1',
      cl: '112',
      alb: '4.0',
      lac: '1.0',
      pao2: '95',
      fio2: '0.21',
      age: '30',
      respChronicity: 'acute'
    }
  },
  {
    id: 'hidden-mixed',
    label: 'Gizli: HAGMA + Alkaloz',
    summary: 'Normal pH/HCO₃⁻ arkasında gizli yüksek anyon açığı',
    values: {
      ...DEFAULT_ABG_INPUTS,
      ph: '7.40',
      pco2: '40',
      hco3: '24',
      sbe: '',
      na: '140',
      k: '3.6',
      cl: '92',
      alb: '4.0',
      lac: '1.0',
      pao2: '95',
      fio2: '0.21',
      age: '55',
      respChronicity: 'acute'
    }
  },
  {
    id: 'salicylate',
    label: 'Salisilat Zehirlenmesi',
    summary: 'Eş zamanlı respiratuar alkaloz + HAGMA',
    values: {
      ...DEFAULT_ABG_INPUTS,
      ph: '7.46',
      pco2: '18',
      hco3: '13',
      sbe: '',
      na: '138',
      k: '3.9',
      cl: '106',
      alb: '4.0',
      lac: '1.5',
      pao2: '98',
      fio2: '0.21',
      age: '24',
      respChronicity: 'acute'
    }
  },
  {
    id: 'massive-hemorrhage',
    label: 'İntraop Masif Kanama',
    summary: 'Ciddi laktik asidoz + düşük CaO₂ + dilüsyonel hipoalbüminemi',
    values: {
      ...DEFAULT_ABG_INPUTS,
      ph: '7.19',
      pco2: '34',
      hco3: '13',
      sbe: '-14.5',
      na: '142',
      k: '5.6',
      cl: '110',
      alb: '2.1',
      lac: '5.8',
      pao2: '145',
      fio2: '0.60',
      peep: '6',
      hb: '6.8',
      sao2: '98',
      age: '58',
      tempC: '35.2',
      respChronicity: 'acute'
    }
  }
];

export type SeverityTone = 'ok' | 'warn' | 'bad' | 'neutral';

export type DisorderKey = 'mA' | 'mK' | 'rA' | 'rK';

export interface DisorderTag {
  key: DisorderKey;
  role: 'primary' | 'extra';
  label: string;
}

export interface StewartRow {
  label: string;
  value: number;
  detail?: string;
}

export interface AbgStep {
  tone: SeverityTone;
  title: string;
  body: string;
}

export interface AbgComparisonSnapshot {
  capturedAt: string;
  ph: number;
  pco2: number;
  hco3: number;
  sbe: number;
  lactate: number | null;
  pfRatio: number | null;
  hb: number | null;
  cag: number | null;
}

export interface AnionGapAnalysis {
  ag: number;
  rawDeltaAg: number;
  deltaHco3: number;
  rawDeltaGap: number;
  rawPredictedHco3: number;
  rawDeltaRatio: number | null;
  hasAlbumin: boolean;
  cag: number | null;
  corrDeltaAg: number | null;
  corrDeltaGap: number | null;
  corrPredictedHco3: number | null;
  corrDeltaRatio: number | null;
  highRawAg: boolean;
  highCorrAg: boolean;
  hiddenByHypoalbuminemia: boolean;
  interpretation: string;
}

export interface AbgAnalysisResult {
  valid: boolean;
  errorMessage?: string;
  sampleType: SampleType;
  ph: number;
  pco2: number;
  rawPh: number;
  rawPco2: number;
  hco3: number;
  hco3Given: boolean;
  hhCalculatedHco3: number;
  hhMismatch: boolean;
  sbe: number;
  sbeGiven: boolean;
  acidBaseStateLabel: string;
  verdictTone: SeverityTone;
  headline: string;
  disorders: DisorderTag[];
  extraFlags: string[];
  ag: number | null;
  agWithK: number | null;
  cag: number | null;
  highAg: boolean;
  deltaRatio: number | null;
  deltaGap: number | null;
  anionGapAnalysis: AnionGapAnalysis | null;
  correctedNa: number | null;
  correctedCl: number | null;
  freeWaterNaEffect: number | null;
  calcOsmolality: number | null;
  measuredOsm: number | null;
  osmolalGap: number | null;
  pfRatio: number | null;
  fio2Normalized: number | null;
  aaGradient: number | null;
  expectedAa: number | null;
  ardsCategory: string | null;
  cao2: number | null;
  lactateMmol: number | null;
  albuminGL: number | null;
  stewartRows: StewartRow[] | null;
  stewartUnmeasured: number | null;
  tempCorrection: {
    tempC: number;
    phStatPh: number;
    phStatPco2: number;
    phStatPao2: number | null;
  } | null;
  ventilationGuidance: {
    currentPco2: number;
    defaultTargetPco2: number;
    ratio: number;
    percentChange: number;
    direction: 'increase' | 'decrease' | 'maintain';
    advice: string;
  };
  steps: AbgStep[];
  clinicalNotes: string[];
  copyReport: string;
  snapshot: AbgComparisonSnapshot;
}

export function parseNum(val: string): number | null {
  if (!val || !val.trim()) return null;
  const cleaned = val.trim().replace(',', '.');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatTr(val: number, decimals = 1): string {
  return val.toFixed(decimals).replace('.', ',');
}

export function formatSignedTr(val: number, decimals = 1): string {
  const prefix = val >= 0 ? '+' : '−';
  return `${prefix}${formatTr(Math.abs(val), decimals)}`;
}

export function analyzeAbg(input: AbgInputValues): AbgAnalysisResult {
  const rawPh = parseNum(input.ph);
  const rawPco2 = parseNum(input.pco2);

  if (
    rawPh === null ||
    rawPco2 === null ||
    rawPh < 6.5 ||
    rawPh > 8.0 ||
    rawPco2 < 5 ||
    rawPco2 > 220
  ) {
    return {
      valid: false,
      errorMessage: 'Analiz için geçerli pH (6,50–8,00) ve pCO₂ (5–220 mmHg) değerlerini girin.',
      sampleType: input.sampleType,
      ph: 7.4,
      pco2: 40,
      rawPh: rawPh ?? 7.4,
      rawPco2: rawPco2 ?? 40,
      hco3: 24,
      hco3Given: false,
      hhCalculatedHco3: 24,
      hhMismatch: false,
      sbe: 0,
      sbeGiven: false,
      acidBaseStateLabel: '—',
      verdictTone: 'neutral',
      headline: 'Analiz bekleniyor',
      disorders: [],
      extraFlags: [],
      ag: null,
      agWithK: null,
      cag: null,
      highAg: false,
      deltaRatio: null,
      deltaGap: null,
      anionGapAnalysis: null,
      correctedNa: null,
      correctedCl: null,
      freeWaterNaEffect: null,
      calcOsmolality: null,
      measuredOsm: null,
      osmolalGap: null,
      pfRatio: null,
      fio2Normalized: null,
      aaGradient: null,
      expectedAa: null,
      ardsCategory: null,
      cao2: null,
      lactateMmol: null,
      albuminGL: null,
      stewartRows: null,
      stewartUnmeasured: null,
      tempCorrection: null,
      ventilationGuidance: {
        currentPco2: 40,
        defaultTargetPco2: 40,
        ratio: 1,
        percentChange: 0,
        direction: 'maintain',
        advice: ''
      },
      steps: [],
      clinicalNotes: [],
      copyReport: '',
      snapshot: {
        capturedAt: '',
        ph: 7.4,
        pco2: 40,
        hco3: 24,
        sbe: 0,
        lactate: null,
        pfRatio: null,
        hb: null,
        cag: null
      }
    };
  }

  // If Venous Blood Gas (VBG) mode selected, estimate arterial equivalents for screening:
  // Middleton et al. EMJ 2006 / Chong et al. 2013: ABG pH ≈ VBG pH + 0.03, ABG pCO2 ≈ VBG pCO2 - 5 mmHg
  const isVbg = input.sampleType === 'vbg';
  const ph = isVbg ? Number((rawPh + 0.03).toFixed(3)) : rawPh;
  const pco2 = isVbg ? Math.max(8, Number((rawPco2 - 5).toFixed(1))) : rawPco2;

  const hhCalculatedHco3 = 0.03 * rawPco2 * Math.pow(10, rawPh - 6.1);
  const enteredHco3 = parseNum(input.hco3);
  const hco3Given = enteredHco3 !== null;
  const hco3 = hco3Given ? enteredHco3! : hhCalculatedHco3;
  const hhMismatch = hco3Given && Math.abs(hco3 - hhCalculatedHco3) > 2;

  let albGL = parseNum(input.alb);
  if (albGL !== null && input.albUnit === 'g/dL') {
    albGL *= 10;
  }

  let lacMmol = parseNum(input.lac);
  if (lacMmol !== null && input.lacUnit === 'mg/dL') {
    lacMmol /= 9.01;
  }

  let glucoseMgDl = parseNum(input.glucose);
  if (glucoseMgDl !== null && input.glucoseUnit === 'mmol/L') {
    glucoseMgDl *= 18.018;
  }

  const na = parseNum(input.na);
  const k = parseNum(input.k);
  const cl = parseNum(input.cl);
  const pao2 = parseNum(input.pao2);
  const rawFio2 = parseNum(input.fio2);
  const fio2Normalized =
    rawFio2 !== null && rawFio2 > 0
      ? rawFio2 > 1 && rawFio2 <= 100
        ? rawFio2 / 100
        : rawFio2 <= 1
          ? rawFio2
          : null
      : null;
  const age = parseNum(input.age);
  const peep = parseNum(input.peep);
  const hb = parseNum(input.hb);
  const sao2 = parseNum(input.sao2);
  const rawRenalN = parseNum(input.bun);
  const bun = rawRenalN !== null ? (input.ureaMode === 'urea' ? rawRenalN / 2.14 : rawRenalN) : null;
  const measuredOsm = parseNum(input.measuredOsm);
  const tempC = parseNum(input.tempC);
  const urcl = parseNum(input.urcl);
  const chronic = input.respChronicity === 'chronic';

  const enteredSbe = parseNum(input.sbe);
  const sbeGiven = enteredSbe !== null;
  const sbe = sbeGiven ? enteredSbe! : 0.93 * (hco3 - 24.4 + 14.8 * (ph - 7.4));

  const steps: AbgStep[] = [];
  const rawDisorders: { key: DisorderKey; role: 'primary' | 'extra' }[] = [];
  const extraFlags: string[] = [];

  const addDisorder = (key: DisorderKey, role: 'primary' | 'extra') => {
    if (!rawDisorders.some((d) => d.key === key)) {
      rawDisorders.push({ key, role });
    }
  };

  if (isVbg) {
    steps.push({
      tone: 'warn',
      title: 'Venöz Kan Gazı (VBG) Çevrim Modu',
      body: `Girilen VBG değerleri (pH ${formatTr(rawPh, 2)}, pCO₂ ${formatTr(rawPco2, 0)} mmHg), asit-baz taraması için tahmini arteriyel karşılığa uyarlandı (pH ≈ ${formatTr(ph, 2)}, pCO₂ ≈ ${formatTr(pco2, 0)} mmHg). Şiddetli dolaşım şokunda VBG–AKG farkı açılabilir; oksijenasyon için AKG gerekir.`
    });
  }

  // Step 1: pH Assessment
  const acidBaseStateLabel =
    ph < 7.35 ? 'Asidemi' : ph > 7.45 ? 'Alkalemi' : 'Normal pH Aralığı';
  steps.push({
    tone: ph < 7.2 || ph > 7.6 ? 'bad' : ph < 7.35 || ph > 7.45 ? 'warn' : 'ok',
    title: `pH ${formatTr(ph, 2)} (${acidBaseStateLabel})`,
    body:
      ph < 7.2
        ? 'Ciddi asidemi (pH < 7,20): miyokard kontraktilite depresyonu, katekolamin direnci ve malign aritmi eşiği düşer.'
        : ph > 7.6
          ? 'Ciddi alkalemi (pH > 7,60): serebral/koroner vazokonstriksiyon, iyonize Ca²⁺ düşüşü ve nöbet/aritmi riski artar.'
          : ph < 7.35
            ? 'Sistemik asidemi mevcut.'
            : ph > 7.45
              ? 'Sistemik alkalemi mevcut.'
              : 'pH fizyolojik sınırlar içinde (kompanse veya eş zamanlı zıt karma bozukluk dışlanmalıdır).'
  });

  // Henderson-Hasselbalch Check
  if (hhMismatch) {
    steps.push({
      tone: 'warn',
      title: 'Henderson–Hasselbalch Tutarsızlığı',
      body: `Girilen HCO₃⁻ (${formatTr(hco3)} mmol/L), pH ve pCO₂'den hesaplanan değerle (${formatTr(hhCalculatedHco3)} mmol/L) >2 mmol/L sapma gösteriyor. Numune havalanması veya yazım hatasını kontrol edin.`
    });
  } else if (!hco3Given) {
    steps.push({
      tone: 'ok',
      title: 'HCO₃⁻ Hesaplaması',
      body: `HCO₃⁻ girilmediği için Henderson–Hasselbalch denklemiyle ${formatTr(hhCalculatedHco3)} mmol/L olarak hesaplandı.`
    });
  }

  // Step 2: Primary Disorder & Compensation (Boston rules + Winter)
  const mA = hco3 < 22;
  const mK = hco3 > 26;
  const rA = pco2 > 45;
  const rK = pco2 < 35;

  type Pattern = 'ba' | 'bk' | DisorderKey | null;
  let pattern: Pattern = null;
  if (mA && rA) pattern = 'ba';
  else if (mK && rK) pattern = 'bk';
  else if (mA && rK) pattern = ph < 7.4 ? 'mA' : 'rK';
  else if (mK && rA) pattern = ph > 7.4 ? 'mK' : 'rA';
  else pattern = mA ? 'mA' : mK ? 'mK' : rA ? 'rA' : rK ? 'rK' : null;

  const shortNames: Record<DisorderKey, string> = {
    mA: 'metabolik asidoz',
    mK: 'metabolik alkaloz',
    rA: 'respiratuar asidoz',
    rK: 'respiratuar alkaloz'
  };

  if (pattern === 'ba') {
    addDisorder('mA', 'primary');
    addDisorder('rA', 'primary');
    steps.push({
      tone: 'bad',
      title: 'Karma Asidoz',
      body: 'HCO₃⁻ düşük ve pCO₂ yüksek; solunumsal ve metabolik bileşenler birbirini kompanse etmiyor, pH’yı sinerjik olarak düşürüyor.'
    });
  } else if (pattern === 'bk') {
    addDisorder('mK', 'primary');
    addDisorder('rK', 'primary');
    steps.push({
      tone: 'bad',
      title: 'Karma Alkaloz',
      body: 'HCO₃⁻ yüksek ve pCO₂ düşük; her iki sistem pH’yı birlikte yükseltiyor.'
    });
  } else if (pattern) {
    addDisorder(pattern, 'primary');
    let expected = 0;
    let tol = 2;
    let observed = 0;
    let highKey: DisorderKey = 'rA';
    let lowKey: DisorderKey = 'rK';
    let formulaText = '';

    if (pattern === 'mA') {
      expected = 1.5 * hco3 + 8;
      tol = 2;
      observed = pco2;
      highKey = 'rA';
      lowKey = 'rK';
      formulaText = `Winter formülü: beklenen pCO₂ ${formatTr(expected)} ± 2 mmHg (${formatTr(expected - 2)}–${formatTr(expected + 2)}), ölçülen ${formatTr(pco2)} mmHg`;
    } else if (pattern === 'mK') {
      expected = 40 + 0.7 * (hco3 - 24);
      tol = 5;
      observed = pco2;
      highKey = 'rA';
      lowKey = 'rK';
      formulaText = `Metabolik alkaloz kompanzasyonu: beklenen pCO₂ ${formatTr(expected)} ± 5 mmHg (${formatTr(expected - 5)}–${formatTr(expected + 5)}), ölçülen ${formatTr(pco2)} mmHg`;
    } else if (pattern === 'rA') {
      expected = 24 + (chronic ? 0.35 : 0.1) * (pco2 - 40);
      tol = 3;
      observed = hco3;
      highKey = 'mK';
      lowKey = 'mA';
      formulaText = `${chronic ? 'Kronik' : 'Akut'} respiratuar asidoz (Boston): beklenen HCO₃⁻ ${formatTr(expected)} ± 3 mmol/L, ölçülen ${formatTr(hco3)} mmol/L`;
    } else {
      expected = 24 - (chronic ? 0.4 : 0.2) * (40 - pco2);
      tol = 3;
      observed = hco3;
      highKey = 'mK';
      lowKey = 'mA';
      formulaText = `${chronic ? 'Kronik' : 'Akut'} respiratuar alkaloz (Boston): beklenen HCO₃⁻ ${formatTr(expected)} ± 3 mmol/L, ölçülen ${formatTr(hco3)} mmol/L`;
    }

    let compConclusion = 'Uygun kompanzasyon sınırları içinde.';
    let compTone: SeverityTone = 'ok';

    if (observed > expected + tol) {
      addDisorder(highKey, 'extra');
      compConclusion = `Beklenenden yüksek: eşlik eden ${shortNames[highKey]} mevcut.`;
      compTone = 'bad';
    } else if (observed < expected - tol) {
      addDisorder(lowKey, 'extra');
      compConclusion = `Beklenenden düşük: eşlik eden ${shortNames[lowKey]} mevcut.`;
      compTone = 'bad';
    }

    steps.push({
      tone: compTone,
      title: `Primer Bozukluk: ${shortNames[pattern].charAt(0).toUpperCase() + shortNames[pattern].slice(1)}`,
      body: `${formulaText}. Değerlendirme: ${compConclusion}`
    });
  } else {
    steps.push({
      tone: 'ok',
      title: 'Primer Bozukluk Taraması',
      body: 'HCO₃⁻ (22–26 mmol/L) ve pCO₂ (35–45 mmHg) normal aralıkta; gizli yüksek anyon açığı kontrolü yapılıyor.'
    });
  }

  // Step 3: Anion Gap, Albumin Correction (Figge), Delta Ratio & Delta Gap
  const knownElectrolytes = na !== null && cl !== null;
  let ag: number | null = null;
  let agWithK: number | null = null;
  let cag: number | null = null;
  let highAg = false;
  let deltaRatio: number | null = null;
  let deltaGap: number | null = null;
  let anionGapAnalysis: AnionGapAnalysis | null = null;
  let correctedNa: number | null = null;
  let correctedCl: number | null = null;
  let freeWaterNaEffect: number | null = null;

  if (na !== null && glucoseMgDl !== null && glucoseMgDl > 100) {
    const factor = glucoseMgDl > 400 ? 0.024 : 0.016;
    correctedNa = na + factor * (glucoseMgDl - 100);
  }

  if (knownElectrolytes) {
    ag = na! - cl! - hco3;
    if (k !== null) {
      agWithK = na! + k - cl! - hco3;
    }
    const hasAlbumin = albGL !== null;
    const effectiveCag = hasAlbumin ? ag + 0.25 * (42 - albGL!) : ag;
    cag = effectiveCag;
    highAg = effectiveCag > 14;
    correctedCl = cl! * (140 / na!);
    freeWaterNaEffect = 0.25 * (na! - 140);

    const deltaHco3 = 24 - hco3;
    const rawDeltaAg = ag - 12;
    const rawDeltaGap = rawDeltaAg - deltaHco3;
    const rawPredictedHco3 = hco3 + rawDeltaAg;
    const rawDeltaRatio = deltaHco3 > 0 ? rawDeltaAg / deltaHco3 : null;

    const corrDeltaAg = hasAlbumin ? effectiveCag - 12 : null;
    const corrDeltaGap = corrDeltaAg !== null ? corrDeltaAg - deltaHco3 : null;
    const corrPredictedHco3 = corrDeltaAg !== null ? hco3 + corrDeltaAg : null;
    const corrDeltaRatio = corrDeltaAg !== null && deltaHco3 > 0 ? corrDeltaAg / deltaHco3 : null;

    const isHypoalbuminemic = albGL !== null && albGL < 35;
    const highRawAg = ag > 14;
    const highCorrAg = effectiveCag > 14;
    const hiddenByHypoalbuminemia = isHypoalbuminemic && !highRawAg && highCorrAg;

    let agInterpretation = '';
    if (!highCorrAg) {
      agInterpretation = mA
        ? 'Hem düzeltilmemiş hem albümin düzeltmeli anyon açığı ≤ 14 mEq/L — metabolik asidoz normal anyon açıklı (hiperkloremik, NAGMA) tiptedir; delta oranının klinik tanı gücü HAGMA varlığında anlamlıdır.'
        : 'Anyon açığı ve albümin düzeltmeli anyon açığı normal sınırlarda (≤ 14 mEq/L); delta indeksleri referans amaçlı sunulmuştur.';
    } else if (deltaHco3 <= 0) {
      agInterpretation =
        'Anyon açığı yükselmiş olmasına karşın HCO₃⁻ düşmemiş (ΔHCO₃⁻ ≤ 0); altta yatan gizli bir metabolik alkaloz veya kronik CO₂ retansiyonu HAGMA’yı maskeliyor.';
    } else {
      const refRatio = corrDeltaRatio ?? rawDeltaRatio!;
      const ratioDesc =
        refRatio < 0.4
          ? 'Normal anyon açıklı (hiperkloremik) metabolik asidoz baskın (<0,4).'
          : refRatio < 1
            ? 'Yüksek AG’li asidoz (HAGMA) ile normal AG’li asidoz (NAGMA) birlikte (0,4–0,99).'
            : refRatio <= 2
              ? 'Saf yüksek anyon açıklı metabolik asidoz (HAGMA) ile uyumlu (1,0–2,0).'
              : 'Eşlik eden metabolik alkaloz veya kronik respiratuar asidoz kompanzasyonu mevcut (>2,0).';
      agInterpretation = `${hiddenByHypoalbuminemia ? 'Dikkat: Albümin <3,5 g/dL (35 g/L) olduğu için düzeltilmemiş AG normal görünse de hipoalbüminemi nedeniyle albümin düzeltmeli AG yüksek (>14) saptandı! ' : ''}${ratioDesc}`;
    }

    anionGapAnalysis = {
      ag,
      rawDeltaAg,
      deltaHco3,
      rawDeltaGap,
      rawPredictedHco3,
      rawDeltaRatio,
      hasAlbumin,
      cag: hasAlbumin ? effectiveCag : null,
      corrDeltaAg,
      corrDeltaGap,
      corrPredictedHco3,
      corrDeltaRatio,
      highRawAg,
      highCorrAg,
      hiddenByHypoalbuminemia,
      interpretation: agInterpretation
    };

    steps.push({
      tone: highAg ? 'bad' : 'ok',
      title: `Anyon Açığı (AG): ${formatTr(ag)} mEq/L${albGL !== null ? ` · Albümin Düzeltmeli (Figge): ${formatTr(cag)} mEq/L` : ''}`,
      body: highAg
        ? `Düzeltilmiş AG > 14 mEq/L — ölçülemeyen anyon birikimi (HAGMA) saptandı.${agWithK !== null ? ` Potasyumlu AG: ${formatTr(agWithK)} mEq/L.` : ''}`
        : `Normal sınırlar içinde (≤ 14 mEq/L).${isHypoalbuminemic ? ' Hipoalbüminemi (<3,5 g/dL) nedeniyle düzeltilmiş değer özellikle önemlidir.' : ''}`
    });

    if (highAg) {
      if (!rawDisorders.some((d) => d.key === 'mA')) {
        addDisorder('mA', 'extra');
      }
      const dAg = cag - 12;
      const dHco3 = 24 - hco3;
      deltaGap = dAg + hco3;

      if (dHco3 > 0) {
        deltaRatio = dAg / dHco3;
        let ratioMsg = '';
        if (deltaRatio < 0.4) {
          ratioMsg = 'Normal AG’li (hiperkloremik) metabolik asidoz baskın.';
        } else if (deltaRatio < 1) {
          ratioMsg = 'Yüksek AG’li ve normal AG’li (hiperkloremik) metabolik asidoz bir arada.';
        } else if (deltaRatio <= 2) {
          ratioMsg = 'Saf yüksek anyon açıklı metabolik asidoz (HAGMA) ile uyumlu.';
        } else {
          ratioMsg =
            'HCO₃⁻ beklenenden az düşmüş — eşlik eden metabolik alkaloz (veya kronik CO₂ retansiyonu) mevcut.';
        }

        if (deltaRatio > 2) addDisorder('mK', 'extra');
        if (deltaRatio < 0.8) extraFlags.push('Ek normal AG’li asidoz');

        steps.push({
          tone: deltaRatio > 2 || deltaRatio < 0.8 ? 'warn' : 'ok',
          title: `Delta Oranı: ${formatTr(deltaRatio, 2)} (Delta Gap HCO₃⁻: ${formatTr(deltaGap, 1)} mmol/L)`,
          body: ratioMsg
        });
      } else {
        addDisorder('mK', 'extra');
        steps.push({
          tone: 'warn',
          title: 'Gizli Metabolik Bozukluk (Delta Analizi)',
          body: `Anyon açığı +${formatTr(dAg)} mEq/L yükselmiş olmasına karşın HCO₃⁻ (${formatTr(hco3)} mmol/L) düşmemiş; altta yatan gizli bir metabolik alkaloz HAGMA’yı maskeliyor.`
        });
      }
    } else if (mA) {
      steps.push({
        tone: 'neutral',
        title: 'Delta Oranı Yorumu',
        body: `Anyon açığı yüksek olmadığı için (cAG ${formatTr(cag)} mEq/L) delta oranı tanısal değildir; asidoz normal anyon açıklı (hiperkloremik, Cl⁻ düzeltmeli ${formatTr(correctedCl)} mmol/L) tiptedir.`
      });
    }
  }

  // Step 4: Story (BJA 2004) Simplified Stewart Breakdown
  let stewartRows: StewartRow[] | null = null;
  let stewartUnmeasured: number | null = null;
  if (knownElectrolytes && albGL !== null && lacMmol !== null) {
    const naClEffect = na! - cl! - 38;
    const albEffect = 0.25 * (42 - albGL);
    const lacEffect = 1 - lacMmol;
    stewartUnmeasured = sbe - (naClEffect + albEffect + lacEffect);

    stewartRows = [
      {
        label: 'Na–Cl (SID/Klor)',
        value: naClEffect,
        detail: freeWaterNaEffect !== null ? `Su etkisi ${formatSignedTr(freeWaterNaEffect)}` : undefined
      },
      { label: 'Albümin Etkisi', value: albEffect },
      { label: 'Laktat Etkisi', value: lacEffect },
      { label: 'Ölçülemeyen İyon', value: stewartUnmeasured }
    ];

    steps.push({
      tone: stewartUnmeasured < -5 ? 'bad' : 'neutral',
      title: `Stewart SBE Dökümü (Story BJA): SBE ${formatSignedTr(sbe)} mEq/L${sbeGiven ? '' : ' (tahmini)'}`,
      body: `Na–Cl katkısı ${formatSignedTr(naClEffect)}, albümin ${formatSignedTr(albEffect)}, laktat ${formatSignedTr(lacEffect)}, ölçülemeyen iyonlar ${formatSignedTr(stewartUnmeasured)} mEq/L.${
        stewartUnmeasured < -5
          ? ' Belirgin ölçülemeyen anyon (keton, üremi, salisilat veya toksik alkol) yükü araştırılmalıdır.'
          : ''
      }${albGL < 35 && albEffect > 2 ? ' Hipoalbüminemi (<3,5 g/dL; alkalozlaştırıcı etki) metabolik asidozu kısmen maskeliyor olabilir.' : ''}`
    });
  }

  // Step 5: Osmolality & Osmolal Gap
  let calcOsmolality: number | null = null;
  let osmolalGap: number | null = null;
  if (na !== null && (glucoseMgDl !== null || bun !== null)) {
    calcOsmolality = 2 * na + (glucoseMgDl ?? 90) / 18 + (bun ?? 14) / 2.8;
    if (measuredOsm !== null && glucoseMgDl !== null && bun !== null) {
      osmolalGap = measuredOsm - calcOsmolality;
      steps.push({
        tone: osmolalGap > 10 ? 'bad' : 'ok',
        title: `Osmolal Gap: ${formatSignedTr(osmolalGap)} mOsm/kg`,
        body: `Hesaplanan serum osmolalitesi ${formatTr(calcOsmolality, 0)} mOsm/kg, ölçülen ${formatTr(measuredOsm, 0)} mOsm/kg. ${
          osmolalGap > 10
            ? 'Osmolal gap > 10 mOsm/kg — metanol, etilen glikol, izopropanol veya mannitol varlığını araştırın.'
            : 'Fizyolojik sınırda (< 10 mOsm/kg).'
        }`
      });
    } else if (measuredOsm !== null) {
      steps.push({
        tone: 'neutral',
        title: 'Osmolal Gap (Eksik Bileşen)',
        body: 'Ölçülen osmolalite girildi; kesin Osmolal Gap hesabı için Glukoz ve Üre/BUN değerlerinin de girilmesi gerekir.'
      });
    }
  } else if (measuredOsm !== null) {
    steps.push({
      tone: 'neutral',
      title: 'Osmolal Gap (Eksik Bileşen)',
      body: 'Ölçülen osmolalite girildi; Osmolal Gap hesabı için Glukoz ve Üre/BUN değerlerinin de girilmesi gerekir.'
    });
  }

  // Step 6: Oxygenation, A–a Gradient, Berlin ARDS & CaO2
  let pfRatio: number | null = null;
  let aaGradient: number | null = null;
  let expectedAa: number | null = null;
  let ardsCategory: string | null = null;
  let cao2: number | null = null;

  if (!isVbg && pao2 !== null && fio2Normalized !== null && fio2Normalized > 0) {
    pfRatio = pao2 / fio2Normalized;
    const paO2Alveolar = fio2Normalized * 713 - pco2 / 0.8;
    aaGradient = paO2Alveolar - pao2;
    if (age !== null) {
      expectedAa = age / 4 + 4;
    }

    if (pfRatio <= 100) {
      ardsCategory = peep !== null && peep >= 5 ? 'Ağır ARDS düzeyi (P/F ≤ 100)' : 'Ağır hipoksemi (P/F ≤ 100)';
    } else if (pfRatio <= 200) {
      ardsCategory = peep !== null && peep >= 5 ? 'Orta ARDS düzeyi (P/F 101–200)' : 'Orta hipoksemi (P/F 101–200)';
    } else if (pfRatio <= 300) {
      ardsCategory = peep !== null && peep >= 5 ? 'Hafif ARDS düzeyi (P/F 201–300)' : 'Hafif oksijenasyon bozukluğu (P/F 201–300)';
    } else {
      ardsCategory = 'Normal oksijenasyon indeksi (P/F > 300)';
    }

    let oxTone: SeverityTone = pfRatio < 100 ? 'bad' : pfRatio < 300 ? 'warn' : 'ok';
    let oxText = `PaO₂/FiO₂ oranı ${formatTr(pfRatio, 0)} mmHg (${ardsCategory}${peep !== null ? `, PEEP ${formatTr(peep, 0)} cmH₂O` : ''}).`;
    if (aaGradient !== null) {
      oxText += ` A–a gradiyenti ${formatTr(aaGradient, 0)} mmHg`;
      if (expectedAa !== null) {
        const highAa = aaGradient > expectedAa + 5;
        oxText += ` (yaşa göre beklenen ≈ ${formatTr(expectedAa, 0)} mmHg — ${
          highAa ? 'yüksek: V/Q uyumsuzluğu, şant veya difüzyon bozukluğu' : 'beklenen sınırda'
        }).`;
        if (highAa && oxTone === 'ok') oxTone = 'warn';
      } else {
        oxText += '.';
      }
    }
    steps.push({
      tone: oxTone,
      title: `Oksijenasyon & A–a Gradyenti`,
      body: oxText
    });
  } else if (isVbg) {
    steps.push({
      tone: 'neutral',
      title: 'Oksijenasyon Notu (VBG)',
      body: 'Venöz kan gazından arteriyel PaO₂, P/F oranı ve A–a gradiyenti değerlendirilemez; hipoksemi şüphesinde pulse oksimetri ve arteriyel kan gazı kullanın.'
    });
  }

  if (hb !== null && sao2 !== null && pao2 !== null && !isVbg) {
    cao2 = 1.34 * hb * (sao2 / 100) + 0.0031 * pao2;
    if (cao2 < 12) {
      steps.push({
        tone: cao2 < 9 ? 'bad' : 'warn',
        title: `Düşük Arteriyel Oksijen İçeriği (CaO₂): ${formatTr(cao2, 1)} mL O₂/dL`,
        body: `Normal hedef 16–20 mL/dL'dir. Hb (${formatTr(hb, 1)} g/dL) ve/veya SaO₂ (%${formatTr(sao2, 0)}) düşüklüğü doku oksijen sunumunu (DO₂) ciddi biçimde kısıtlıyor.`
      });
    }
  }

  // Step 7: Temperature Correction (Alpha-stat vs pH-stat)
  let tempCorrection: AbgAnalysisResult['tempCorrection'] = null;
  if (tempC !== null && Math.abs(tempC - 37) >= 0.5) {
    const dt = tempC - 37;
    const phStatPh = rawPh - 0.0147 * dt;
    const phStatPco2 = rawPco2 * Math.pow(10, 0.019 * dt);
    const phStatPao2 = pao2 !== null && !isVbg ? pao2 * Math.pow(10, 0.032 * dt) : null;
    tempCorrection = {
      tempC,
      phStatPh,
      phStatPco2,
      phStatPao2
    };
  }

  // Labels & Headline
  const labelFor = (key: DisorderKey): string => {
    const map: Record<DisorderKey, string> = {
      mA: highAg
        ? 'Yüksek AG’li metabolik asidoz'
        : knownElectrolytes
          ? 'Normal AG’li metabolik asidoz'
          : 'Metabolik asidoz',
      mK: 'Metabolik alkaloz',
      rA: `Respiratuar asidoz (${chronic ? 'kronik' : 'akut'})`,
      rK: `Respiratuar alkaloz (${chronic ? 'kronik' : 'akut'})`
    };
    return map[key];
  };

  const disorders: DisorderTag[] = rawDisorders.map((d) => ({
    key: d.key,
    role: d.role,
    label: labelFor(d.key)
  }));

  const headline = disorders.length
    ? disorders.map((d) => d.label).join(' + ')
    : ph < 7.35 || ph > 7.45
      ? 'Primer bozukluk netleştirilemedi'
      : 'Asit-baz dengesi normal';

  const verdictTone: SeverityTone =
    ph < 7.2 || ph > 7.6 || (pfRatio !== null && pfRatio < 100)
      ? 'bad'
      : disorders.length > 0 || ph < 7.35 || ph > 7.45
        ? 'warn'
        : 'ok';

  // Alveolar Ventilation Guidance
  const defaultTargetPco2 = pco2 > 45 ? 40 : pco2 < 35 ? 38 : 40;
  const ratio = pco2 / defaultTargetPco2;
  const percentChange = (ratio - 1) * 100;
  const direction: 'increase' | 'decrease' | 'maintain' =
    Math.abs(percentChange) < 5 ? 'maintain' : percentChange > 0 ? 'increase' : 'decrease';
  const advice =
    direction === 'maintain'
      ? `Mevcut pCO₂ (${formatTr(pco2, 0)} mmHg) hedef aralığa yakın; mevcut dakika ventilasyonu korunabilir.`
      : direction === 'increase'
        ? `Hedef pCO₂ ${defaultTargetPco2} mmHg için dakika ventilasyonunun (f × VT) yaklaşık %${formatTr(Math.abs(percentChange), 0)} artırılması gerekir (oto-PEEP ve hava hapsine dikkat).`
        : `Hedef pCO₂ ${defaultTargetPco2} mmHg için dakika ventilasyonunun yaklaşık %${formatTr(Math.abs(percentChange), 0)} azaltılması önerilir.`;

  // Differential & Bedside Clinical Notes
  const causesByDisorder: Record<DisorderKey, string> = {
    mA: highAg
      ? 'MUDPILES / GOLDMARK: Laktik asidoz (sepsis, şok, hipoksi), ketoasidoz (DKA, açlık, alkol), üremi, toksinler (metanol, etilen glikol, salisilat, propilen glikol), rabdomiyoliz.'
      : 'HARDUPS / GİS & Renal kayıplar: İshal, GİS fistülü, renal tübüler asidoz (RTA), yüksek hacimli %0,9 NaCl infüzyonu (dilüsyonel/hiperkloremik), asetazolamid.',
    mK: `Kusma / NG drenaj, loop-tiyazid diüretikleri, hiperkapni sonrası alkaloz, hipovolemi${
      urcl !== null
        ? urcl < 20
          ? ` (İdrar Cl⁻ ${formatTr(urcl, 0)} mEq/L: klora yanıtlı — izotonik NaCl ve KCl replasmanı)`
          : ` (İdrar Cl⁻ ${formatTr(urcl, 0)} mEq/L: klora dirençli — mineralokortikoid fazlalığı, ağır hipokalemi veya aktif diüretik)`
        : ' (İdrar Cl⁻ <20 klora yanıtlı, >20 klora dirençli)'
    }.`,
    rA: 'Merkezi solunum depresyonu (opioid, propofol, volatil anestezikler, sedatifler), KOAH, nöromüsküler rezidüel blokaj, bronkospazm / üst havayolu obstrüksiyonu, obezite hipoventilasyonu.',
    rK: 'Ağrı, anksiyete, iatrojenik hiperventilasyon, pulmoner emboli, sepsis, erken dönem hipoksemi, karaciğer yetmezliği, salisilat toksisitesi, gebelik.'
  };

  const clinicalNotes: string[] = disorders.map((d) => `${d.label}: ${causesByDisorder[d.key]}`);

  if (lacMmol !== null && lacMmol > 2) {
    clinicalNotes.push(
      `Laktat ${formatTr(lacMmol, 1)} mmol/L: doku perfüzyonunu, volüm durumunu ve sepsisi değerlendirin; resüsitasyon sonrası seri laktat klirensi (%10–20↓ / 2 saat) takip edilmelidir.`
    );
  }
  if (k !== null) {
    if (k >= 5.5) {
      clinicalNotes.push(
        `Hiperkalemi uyarısı (K⁺ ${formatTr(k, 1)} mmol/L): 12 derivasyonlu EKG çekin; mineral asidozda pH her 0,10 düşüşte K⁺ ~0,4–0,6 mEq/L hücre dışına kayabilir. Acil membran stabilizasyonu (Ca-glukonat) ve insülin-dekstroz hazırlığı değerlendirin.`
      );
    } else if (k < 3.5) {
      clinicalNotes.push(
        `Hipokalemi uyarısı (K⁺ ${formatTr(k, 1)} mmol/L): Alkaloz K⁺'yı hücre içine iter. DKA veya asidoz tedavisinde insülin/bikarbonat öncesi K⁺ < 3,3 mmol/L ise önce potasyum replasmanı gerekir.`
      );
    }
  }
  if (correctedNa !== null && na !== null) {
    clinicalNotes.push(
      `Hiperglisemi düzeltmeli Na⁺: Ölçülen Na⁺ ${formatTr(na, 0)} → düzeltilmiş Na⁺ ${formatTr(correctedNa, 1)} mmol/L (Katz/Hillier). Gerçek tonisite ve sıvı seçimi düzeltilmiş Na⁺'ya göre planlanmalıdır.`
    );
  }
  if (disorders.some((d) => d.key === 'mA') && ph < 7.15) {
    clinicalNotes.push(
      'Ciddi metabolik asidemi (pH < 7,15): NaHCO₃ tedavisi etiyolojiye bağlıdır; DKA’da pH < 6,90 olmadıkça ve laktik asidozda hemodinamik refrakter şok/hiperkalemi dışında rutin önerilmez. Verilecekse etkin ventilasyon mutlaka sağlanmalıdır (CO₂ retansiyonu paradoksal intraselüler asidoz yapar).'
    );
  }
  if (knownElectrolytes && !highAg && mA) {
    clinicalNotes.push(
      'Hiperkloremik NAGMA’da güçlü iyon farkı (SID) sıfır olan %0,9 NaCl yerine dengeli kristaloid (İsolyte-S, Plasma-Lyte veya Ringer Laktat) tercih edilmesi önerilir.'
    );
  }
  if (disorders.some((d) => d.key === 'rA') && ph < 7.3) {
    clinicalNotes.push(
      'Akut respiratuar asidoz (pH < 7,30): Havayolu açıklığı, rezidüel nöromüsküler blokaj (TOF < 0,9), opioid antagonizması (nalokson) veya mekanik ventilasyon / NIV desteği acilen değerlendirilmelidir.'
    );
  }
  if (!clinicalNotes.length) {
    clinicalNotes.push('Klinik açıdan belirgin asit-baz veya oksijenasyon sapması saptanmadı.');
  }

  const subLine = `${isVbg ? 'VBG → Tahmini AKG: ' : ''}pH ${formatTr(ph, 2)}, pCO₂ ${formatTr(pco2, 0)} mmHg, HCO₃⁻ ${formatTr(hco3)} mmol/L, SBE ${formatSignedTr(sbe)} mEq/L${
    pfRatio !== null ? `, P/F ${formatTr(pfRatio, 0)}` : ''
  }`;

  const copyReport = [
    `[YATAK BAŞI AKG ANALİZİ] ${headline}`,
    subLine,
    cag !== null ? `AG: ${formatTr(ag!)} mEq/L | Albümin Düzeltmeli AG: ${formatTr(cag)} mEq/L` : '',
    deltaRatio !== null ? `Delta Oranı: ${formatTr(deltaRatio, 2)} | Delta Gap: ${formatTr(deltaGap!, 1)}` : '',
    cao2 !== null ? `CaO₂: ${formatTr(cao2, 1)} mL/dL (Hb ${formatTr(hb!, 1)} g/dL, SaO₂ %${formatTr(sao2!, 0)})` : '',
    '',
    'Değerlendirme Basamakları:',
    ...steps.map((s, idx) => `${idx + 1}. ${s.title}: ${s.body}`),
    '',
    'Klinik Notlar:',
    ...clinicalNotes.map((n) => `• ${n}`)
  ]
    .filter(Boolean)
    .join('\n');

  const snapshot: AbgComparisonSnapshot = {
    capturedAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    ph,
    pco2,
    hco3,
    sbe,
    lactate: lacMmol,
    pfRatio,
    hb,
    cag
  };

  return {
    valid: true,
    sampleType: input.sampleType,
    ph,
    pco2,
    rawPh,
    rawPco2,
    hco3,
    hco3Given,
    hhCalculatedHco3,
    hhMismatch,
    sbe,
    sbeGiven,
    acidBaseStateLabel,
    verdictTone,
    headline,
    disorders,
    extraFlags,
    ag,
    agWithK,
    cag,
    highAg,
    deltaRatio,
    deltaGap,
    anionGapAnalysis,
    correctedNa,
    correctedCl,
    freeWaterNaEffect,
    calcOsmolality,
    measuredOsm,
    osmolalGap,
    pfRatio,
    fio2Normalized,
    aaGradient,
    expectedAa,
    ardsCategory,
    cao2,
    lactateMmol: lacMmol,
    albuminGL: albGL,
    stewartRows,
    stewartUnmeasured,
    tempCorrection,
    ventilationGuidance: {
      currentPco2: pco2,
      defaultTargetPco2,
      ratio,
      percentChange,
      direction,
      advice
    },
    steps,
    clinicalNotes,
    copyReport,
    snapshot
  };
}
