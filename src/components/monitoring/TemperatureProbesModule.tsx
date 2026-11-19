import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Flame,
  Info,
  ShieldAlert,
  Sliders,
  Thermometer,
  Waves,
  Wrench,
} from 'lucide-react';

interface TemperatureProbesModuleProps {
  isDark: boolean;
}

type ThermalScenarioId = 'unwarmed-ga' | 'prewarmed-faw' | 'neuraxial' | 'shock' | 'mh';
type ProbeSiteId = 'nasopharyngeal' | 'bladder' | 'zhf' | 'rectal' | 'axillary' | 'skin';
type TrendPatternId = 'sessler-3phase' | 'prewarmed' | 'neuraxial' | 'shock-gradient' | 'mh' | 'irrigation-artifact';

interface ThermalScenario {
  id: ThermalScenarioId;
  label: string;
  shortTag: string;
  /** Returns [trueCoreC, peripheralSkinC, phaseLabel, clinicalNote] at minute t (0..180) */
  compute: (t: number) => {
    core: number;
    periph: number;
    phase: string;
    note: string;
    status: 'normal' | 'warning' | 'critical';
  };
}

const THERMAL_SCENARIOS: ThermalScenario[] = [
  {
    id: 'unwarmed-ga',
    label: 'Isıtmasız Genel Anestezi (Klasik 3 Faz)',
    shortTag: 'Isıtmasız GA',
    compute: (t) => {
      let core = 37.0;
      let periph = 33.4;
      let phase = 'Bazal (Uyanık)';
      if (t === 0) {
        core = 37.0;
        periph = 33.4;
      } else if (t <= 60) {
        // Phase 1: Rapid redistribution (-1.3°C in first hour)
        const frac = t / 60;
        core = 37.0 - 1.3 * Math.pow(frac, 0.8);
        periph = 33.4 + 1.1 * frac; // vasodilation warms periphery initially
        phase = 'Faz 1: Redistribüsyon (İlk 1 Saat · %80 Kayıp)';
      } else if (t <= 150) {
        // Phase 2: Linear heat loss (-0.5°C/h)
        const hrs = (t - 60) / 60;
        core = 35.7 - 0.55 * hrs;
        periph = 34.5 - 0.8 * hrs;
        phase = 'Faz 2: Lineer Isı Kaybı (Radyasyon & Konveksiyon)';
      } else {
        // Phase 3: Vasoconstriction plateau (~34.7°C)
        core = 34.85 - 0.05 * ((t - 150) / 30);
        periph = 33.3 - 1.4 * ((t - 150) / 30);
        phase = 'Faz 3: Vazokonstriksiyon Platosu (Perifer Soğur)';
      }
      return {
        core: Number(core.toFixed(1)),
        periph: Number(periph.toFixed(1)),
        phase,
        status: core < 36.0 ? (core < 35.2 ? 'critical' : 'warning') : 'normal',
        note:
          core < 36.0
            ? 'Aktif ısıtma olmadan genel anestezide vazodilatasyon kor ısısını soğuk perifere dağıtır (Faz 1). <36.0 °C altında koagülopati ve enfeksiyon riski başlar.'
            : 'İndüksiyon öncesi bazal kor ve periferik kompartman arasında ~3.5 °C fizyolojik ısı gradyanı bulunur.',
      };
    },
  },
  {
    id: 'prewarmed-faw',
    label: 'Pre-Warming + Zorlu Hava Isıtma (FAW)',
    shortTag: 'Pre-Warm + FAW',
    compute: (t) => {
      const core = t === 0 ? 37.0 : 37.0 - 0.35 * Math.sin(Math.min(t, 60) * (Math.PI / 120)) + (t > 60 ? 0.15 * ((t - 60) / 120) : 0);
      const periph = t === 0 ? 35.4 : 35.4 + 0.6 * (t / 180);
      return {
        core: Number(core.toFixed(1)),
        periph: Number(periph.toFixed(1)),
        phase: t === 0 ? '30 dk Pre-Warming Tamamlandı' : 'Aktif Normotermi Koruması (≥36.5 °C)',
        status: 'normal',
        note: 'İndüksiyon öncesi 20–30 dk pre-warming periferik kompartmanı ısıtarak kor–periferik gradyanı daraltır; Faz 1 redistribüsyon düşüşünü ~%70 azaltır.',
      };
    },
  },
  {
    id: 'neuraxial',
    label: 'Spinal / Epidural Blok (Platosuz Düşüş)',
    shortTag: 'Nöroaksiyel',
    compute: (t) => {
      const core = 37.0 - 0.9 * Math.min(t / 60, 1) - (t > 60 ? 0.7 * ((t - 60) / 60) : 0);
      const periph = 33.5 + 1.8 * Math.min(t / 45, 1) - (t > 60 ? 0.4 * ((t - 60) / 60) : 0);
      return {
        core: Number(core.toFixed(1)),
        periph: Number(periph.toFixed(1)),
        phase: t <= 60 ? 'Sempatektomi Redistribüsyonu' : 'Blok Altında Vazokonstriksiyon Yok → Platosuz Düşüş!',
        status: core < 35.5 ? 'critical' : core < 36.0 ? 'warning' : 'normal',
        note: 'Nöroaksiyel blokta vazokonstriksiyon eşiği düşer ve blok altındaki bacaklarda vazokonstriksiyon yapılamaz. Hasta sıcak hissetse bile gizli derin hipotermi gelişir!',
      };
    },
  },
  {
    id: 'shock',
    label: 'Hemorajik / Kardiyojenik Şok (Geniş ΔT)',
    shortTag: 'Şok (ΔT ↑↑)',
    compute: (t) => {
      const frac = t / 180;
      const core = 36.8 - 0.9 * frac;
      const periph = 33.4 - 4.2 * Math.pow(frac, 0.7);
      return {
        core: Number(core.toFixed(1)),
        periph: Number(periph.toFixed(1)),
        phase: 'Şiddetli Periferik Vazokonstriksiyon (CO ↓ · SVR ↑↑)',
        status: core - periph > 4.5 ? 'critical' : 'warning',
        note: 'Kor sıcaklığı normale yakın görünürken periferik cilt hızla soğur (ΔT > 4–6 °C). Genişleyen kor–periferik gradyan düşük kalp debisi ve hipoperfüzyonun erken işaretidir.',
      };
    },
  },
  {
    id: 'mh',
    label: 'Malign Hipertermi (MH) Krizi',
    shortTag: 'Malign Hipertermi',
    compute: (t) => {
      const core = t <= 30 ? 37.0 + 0.2 * (t / 30) : 37.2 + 2.8 * ((t - 30) / 90);
      const cappedCore = Math.min(40.8, core);
      const periph = Math.min(39.4, 34.0 + 4.8 * (t / 120));
      return {
        core: Number(cappedCore.toFixed(1)),
        periph: Number(periph.toFixed(1)),
        phase: t <= 30 ? 'Erken Faz: EtCO₂ ↑↑ & Taşikardi (Isı Henüz Normal!)' : 'Hipermetabolik Fırtına (+1–2 °C / saat)',
        status: cappedCore >= 38.5 ? 'critical' : cappedCore >= 37.8 ? 'warning' : 'normal',
        note: 'DİKKAT: Hipertermi MH’nin GEÇ bulgusudur! İlk belirtiler açıklanamayan EtCO₂ artışı, taşikardi ve masseter spazmıdır; ateş yükselmesini beklemeden dantrolen başlanmalıdır.',
      };
    },
  },
];

interface ProbeSiteConfig {
  id: ProbeSiteId;
  label: string;
  category: 'Kor' | 'Yarı-Kor' | 'Periferik';
  biasVsCore: number;
  lagFactor: number; // 0 = instant core tracking, 1 = sluggish
  usesPeriphBlend: number; // 0 = pure core, 1 = pure peripheral
  note: string;
}

const PROBE_SITES: ProbeSiteConfig[] = [
  {
    id: 'nasopharyngeal',
    label: 'Nazofarengeal (Kor)',
    category: 'Kor',
    biasVsCore: 0.0,
    lagFactor: 0.05,
    usesPeriphBlend: 0.0,
    note: 'İnternal karotid artere komşudur; kor sıcaklığını hızlı ve yüksek doğrulukla (±0.2 °C) yansıtır. Ancak sığ yerleşimde solunum gazı kaçağından etkilenir.',
  },
  {
    id: 'bladder',
    label: 'Mesane / Foley (Kor)',
    category: 'Kor',
    biasVsCore: -0.1,
    lagFactor: 0.25,
    usesPeriphBlend: 0.05,
    note: 'İdrar akımı >0.5 mL/kg/saat iken güvenilir kor monitörüdür. Oligüri/anüride veya soğuk mesane irrigasyonunda yanıtı belirgin gecikir/düşer.',
  },
  {
    id: 'zhf',
    label: 'Zero-Heat-Flux Alın (Yarı-Kor)',
    category: 'Yarı-Kor',
    biasVsCore: -0.1,
    lagFactor: 0.15,
    usesPeriphBlend: 0.05,
    note: 'Non-invazivdir; rejyonel anestezide ve entübe olmayan hastalarda kor ısısını ±0.2–0.3 °C doğrulukla izler (3–5 dk ilk dengeleme gerekir).',
  },
  {
    id: 'rectal',
    label: 'Rektal (Yavaş Kor)',
    category: 'Kor',
    biasVsCore: 0.2,
    lagFactor: 0.55,
    usesPeriphBlend: 0.0,
    note: 'Dışkı ve düşük rektal kan akımı nedeniyle hızlı ısı değişimlerinde (KPB, MH, aktif ısıtma) 15–30 dk geriden gelir; stabil dönemde +0.2–0.3 °C yüksek okuyabilir.',
  },
  {
    id: 'axillary',
    label: 'Aksiller (Yarı-Kor / Değişken)',
    category: 'Yarı-Kor',
    biasVsCore: -0.5,
    lagFactor: 0.35,
    usesPeriphBlend: 0.35,
    note: 'Kol sıkıca addüksiyonda ve prob aksiller arter üzerindeyse kabul edilebilir; kol açıldığında veya soğuk IV infüzyon altında hızla yalancı düşük okur.',
  },
  {
    id: 'skin',
    label: 'Periferik Cilt (Parmak / Ayak)',
    category: 'Periferik',
    biasVsCore: 0.0,
    lagFactor: 0.1,
    usesPeriphBlend: 1.0,
    note: 'Kor sıcaklığını YANSITMAZ! Ancak kor probu ile birlikte ΔT (kor − periferik) izlendiğinde vazomotor tonus ve periferik perfüzyonu gösterir.',
  },
];

interface TrendPattern {
  id: TrendPatternId;
  label: string;
  coreEnd: string;
  periphEnd: string;
  deltaT: string;
  rate: string;
  status: 'normal' | 'warning' | 'critical';
  statusText: string;
  /** 10 time points (0..180 min) in °C for Core */
  corePoints: number[];
  /** 10 time points (0..180 min) in °C for Peripheral Skin */
  periphPoints: number[];
  annotation: string;
  morphology: string;
  causes: string[];
  action: string;
}

const TREND_PATTERNS: TrendPattern[] = [
  {
    id: 'sessler-3phase',
    label: 'Klasik Sessler 3-Fazlı Hipotermi',
    coreEnd: '34.8 °C',
    periphEnd: '32.1 °C',
    deltaT: '2.7 °C',
    rate: '-1.3 °C/ilk st',
    status: 'warning',
    statusText: 'Faz 1 Redistribüsyon → Faz 2 Lineer → Faz 3 Plato',
    corePoints: [37.0, 36.4, 36.0, 35.7, 35.5, 35.3, 35.1, 34.9, 34.8, 34.8],
    periphPoints: [33.4, 34.0, 34.5, 34.4, 34.1, 33.8, 33.4, 32.9, 32.4, 32.1],
    annotation: 'Faz 1 (0–60 dk): Perifer ısınırken kor hızla düşer!',
    morphology:
      'İlk 1 saatte anestezik vazodilatasyonla kor ısısı perifere akar (Faz 1, %80 sorumlu). 1–3. saatte çevresel kayıpla lineer düşer (Faz 2). ~34.5–35.0 °C’de termoregülatuvar vazokonstriksiyon devreye girer, perifer tekrar soğurken kor plato çizer (Faz 3).',
    causes: [
      'Pre-warming yapılmadan soğuk ameliyathanede (<21 °C) genel anestezi',
      'Geniş açık abdominal/torasik cerrahi ve ısıtılmamış IV sıvılar',
    ],
    action:
      'Aktif zorlu hava ısıtma (FAW) battaniyesini hemen başlatın, IV sıvıları >500 mL/st ise ısıtıcıdan geçirin ve oda sıcaklığını optimize edin.',
  },
  {
    id: 'prewarmed',
    label: 'Pre-Warming + Aktif FAW Normotermi',
    coreEnd: '36.8 °C',
    periphEnd: '35.8 °C',
    deltaT: '1.0 °C',
    rate: '±0.2 °C/st',
    status: 'normal',
    statusText: 'Hedef Normotermi Korundu (≥36.5 °C) · Dar ΔT',
    corePoints: [37.0, 36.8, 36.7, 36.6, 36.6, 36.7, 36.7, 36.8, 36.8, 36.8],
    periphPoints: [35.3, 35.5, 35.6, 35.6, 35.7, 35.7, 35.8, 35.8, 35.8, 35.8],
    annotation: 'Pre-warming kor–periferik gradyanı önceden kapatır',
    morphology:
      'İndüksiyon öncesi 20–30 dk aktif cilt ısıtması periferik dokuyu 35.3 °C üzerine çıkardığı için anestezi indüksiyonundaki Faz 1 düşüşü yalnızca 0.3–0.4 °C ile sınırlı kalır.',
    causes: [
      'ERAS / NICE uyumlu pre-warming + intraoperatif zorlu hava ısıtma',
      'Düşük akım anestezi ve ısıtılmış IV sıvılar',
    ],
    action:
      'Hedef normotermi (36.0–37.5 °C) korunuyor; özellikle bebeklerde aşırı ısınmayı (>37.5 °C) önlemek için FAW sıcaklığını titre edin.',
  },
  {
    id: 'neuraxial',
    label: 'Nöroaksiyel Blokta Platosuz Hipotermi',
    coreEnd: '34.9 °C',
    periphEnd: '34.6 °C',
    deltaT: '0.3 °C',
    rate: '-0.8 °C/st',
    status: 'critical',
    statusText: 'Vazokonstriksiyon Bloke · Faz 3 Platosu Yok!',
    corePoints: [37.0, 36.6, 36.3, 36.0, 35.8, 35.6, 35.4, 35.2, 35.0, 34.9],
    periphPoints: [33.5, 34.6, 35.2, 35.3, 35.2, 35.1, 35.0, 34.8, 34.7, 34.6],
    annotation: 'Blok altında vazokonstriksiyon yok → sürekli düşüş!',
    morphology:
      'Spinal/epidural sempatik blok alt ekstremitelerde vazodilatasyon yapar. Hastada sıcak cilt sinyalleri nedeniyle üşüme hissi baskılanır; kor ısısı plato çizmeden düşmeye devam eder (kombine GA+epiduralde risk maksimumdur!).',
    causes: [
      'Uzun süren sezaryen, ortopedik veya ürolojik spinal/epidural vakalar',
      'Kombine genel + torasik epidural anestezi',
    ],
    action:
      'Uyanık spinal/epidural hastalarda da kor sıcaklığını (ör. Zero-Heat-Flux alın probu) mutlaka izleyin; hasta "üşümüyorum" dese bile aktif ısıtma uygulayın.',
  },
  {
    id: 'shock-gradient',
    label: 'Şokta Ayrışan Kor–Periferik Gradyan',
    coreEnd: '36.1 °C',
    periphEnd: '29.8 °C',
    deltaT: '6.3 °C!',
    rate: 'ΔT ↑↑',
    status: 'critical',
    statusText: 'Kritik Periferik Hipoperfüzyon (ΔT > 4 °C)',
    corePoints: [36.8, 36.8, 36.7, 36.6, 36.5, 36.4, 36.3, 36.2, 36.1, 36.1],
    periphPoints: [33.6, 33.1, 32.5, 31.8, 31.2, 30.8, 30.4, 30.1, 29.9, 29.8],
    annotation: 'Kor normal görünürken perifer soğur → ΔT > 6 °C!',
    morphology:
      'Kor ve periferik eğriler birbirinden hızla uzaklaşır (timsah ağzı ayrışması). Kor ısısı 36 °C üstünde kalsa bile başparmak/ayak tabanı cilt sıcaklığı 30 °C altına iner.',
    causes: [
      'Hipovolemik/hemorajik şok veya düşük kardiyak debi (kardiyojenik şok)',
      'Yüksek doz vazopresör infüzyonu veya derin hipovolemik telafi',
    ],
    action:
      'Tek başına kor sıcaklığına aldanmayın: laktat, kapiller dolum, idrar çıkışı, PPV/SVV ve kalp debisi yönünden acil hemodinamik resüsitasyon değerlendirin.',
  },
  {
    id: 'mh',
    label: 'Malign Hipertermi (MH) Tırmanışı',
    coreEnd: '40.1 °C',
    periphEnd: '38.6 °C',
    deltaT: '1.5 °C',
    rate: '+1.8 °C/st!',
    status: 'critical',
    statusText: 'Acil Hipermetabolik Kriz · Sıcaklık Geç Bulgudur!',
    corePoints: [36.9, 37.0, 37.1, 37.4, 37.8, 38.3, 38.8, 39.3, 39.7, 40.1],
    periphPoints: [34.2, 34.4, 34.8, 35.4, 36.1, 36.8, 37.4, 37.9, 38.3, 38.6],
    annotation: '30. dk’dan sonra hızlı ivmelenen hipertermi (EtCO₂ önce yükselir!)',
    morphology:
      'Başlangıçta düz seyreden eğri, hipermetabolizma yerleştikten sonra 15 dakikada +0.5 °C’yi aşan ivmeli yükseliş gösterir. Aktif ısıtıcı kapalıyken sıcaklığın hızla artması alarmdır.',
    causes: [
      'Volatil anestezikler / süksinilkolin ile tetiklenen Malign Hipertermi',
      'Ayırıcı tanı: Tiroid fırtınası, sepsis/bakteriyemi, nöroleptik malign sendrom, aşırı ısıtma',
    ],
    action:
      'Tetikleyici ajanları derhal kapat, %100 O₂ yüksek akım + aktif karbon filtresi, IV Dantrolen 2.5 mg/kg bolus, aktif soğutma (soğuk SF, buz paketleri; 38 °C’de soğutmayı durdur!).',
  },
  {
    id: 'irrigation-artifact',
    label: 'Soğuk İrrigasyon / Prob Kayma Artefaktı',
    coreEnd: '33.6 °C?',
    periphEnd: '34.8 °C',
    deltaT: '-1.2 °C?!',
    rate: '-3.1 °C/5 dk!',
    status: 'warning',
    statusText: 'Fizyolojik Olmayan Basamak Düşüşü (Artefakt!)',
    corePoints: [36.7, 36.7, 36.6, 36.6, 34.1, 33.7, 33.6, 35.9, 36.5, 36.6],
    periphPoints: [34.6, 34.6, 34.7, 34.7, 34.7, 34.8, 34.8, 34.8, 34.8, 34.8],
    annotation: 'Kor sıcaklığı periferin altına düştü → İmkânsız, prob artefaktı!',
    morphology:
      'Birkaç dakika içinde 2–3 °C’lik ani dikey düşüş (basamak) ve ardından irrigasyon durunca/prob itilince hızlı toparlanma görülür. Fizyolojik olarak kor sıcaklığı dakikalar içinde 3 °C düşemez.',
    causes: [
      'TURP / ürolojik cerrahide mesane probunun soğuk irrigasyon sıvısıyla yıkanması',
      'Nazofarengeal probun burun girişine kayıp kuru/soğuk oksijen akımına maruz kalması',
    ],
    action:
      'Gereksiz panik veya aşırı ısıtma yapmadan önce probun anatomik yerleşimini ve kablo/seri (400 vs 700) uyumunu kontrol edin; alternatif kor bölgesinden doğrulayın.',
  },
];

interface SiteComparisonRow {
  site: string;
  tier: string;
  accuracyLag: string;
  placement: string;
  caveat: string;
}

const SITE_COMPARISON_TABLE: SiteComparisonRow[] = [
  {
    site: 'Pulmoner Arter (PA)',
    tier: 'Altın Standart Kor',
    accuracyLag: '±0.1 °C · Anlık',
    placement: 'Swan-Ganz kateter termistörü',
    caveat: 'Yüksek invaziv; sadece kardiyak/majör vakalarda zaten takılıysa.',
  },
  {
    site: 'Distal Özofagus*',
    tier: 'Klinik Altın Standart',
    accuracyLag: '±0.1–0.2 °C · Hızlı',
    placement: 'Alt 1/3 özofagus (*ayrı kartta detay)',
    caveat: 'Proksimalde kalırsa soğuk havayolu gazından etkilenir.',
  },
  {
    site: 'Nazofarengeal',
    tier: 'Kor (Entübe/SGA)',
    accuracyLag: '±0.2 °C · Hızlı',
    placement: 'Burun kanadı–tragus mesafesi (~10–20 cm)',
    caveat: 'Epistaksis riski; kafa tabanı kırığında YASAK; hava kaçağı soğutur.',
  },
  {
    site: 'Timpanik (Temas Probu)',
    tier: 'Kor (Hipotalamik)',
    accuracyLag: '±0.2 °C · Çok hızlı',
    placement: 'Dış kulak yolundan zara yakın temas',
    caveat: 'Zar perforasyonu/kanama riski; IR tabancalar buşondan yanılır.',
  },
  {
    site: 'Mesane (Termistör Foley)',
    tier: 'Kor (Debi Bağımlı)',
    accuracyLag: '±0.2–0.3 °C · Orta',
    placement: 'Standart Foley kateter içi termistör',
    caveat: 'Oligüri/anüride ciddi lag; ürolojik/pelvik irrigasyonda yalancı düşük.',
  },
  {
    site: 'Zero-Heat-Flux (Alın)',
    tier: 'Non-İnvaziv Yarı-Kor',
    accuracyLag: '±0.2–0.3 °C · 3–5 dk',
    placement: 'Lateral kaş üstü alın bandı (SpotOn)',
    caveat: 'Uyanık/spinal hastalarda mükemmel; kraniyotomide yer çakışabilir.',
  },
  {
    site: 'Rektal',
    tier: 'Yavaş Kor',
    accuracyLag: '+0.2 °C · 15–30 dk lag',
    placement: 'Anal sfinkterden 5–8 cm proksimal',
    caveat: 'Dışkı izolasyonu; MH veya KPB’de hızlı değişimi geç yakalar.',
  },
  {
    site: 'Aksiller / Periferik Cilt',
    tier: 'Periferik (ΔT İçin)',
    accuracyLag: 'Kor’dan −0.5 ila −4 °C',
    placement: 'Aksiller arter / el-ayak başparmağı',
    caveat: 'Tek başına kor yerine geçmez; kor ile birlikte ΔT perfüzyon göstergesi.',
  },
];

export const TemperatureProbesModule: React.FC<TemperatureProbesModuleProps> = ({ isDark }) => {
  const [scenarioId, setScenarioId] = useState<ThermalScenarioId>('unwarmed-ga');
  const [probeSiteId, setProbeSiteId] = useState<ProbeSiteId>('nasopharyngeal');
  const [minutes, setMinutes] = useState<number>(60);
  const [activeTrendId, setActiveTrendId] = useState<TrendPatternId>('sessler-3phase');

  const scenario = THERMAL_SCENARIOS.find((s) => s.id === scenarioId) ?? THERMAL_SCENARIOS[0];
  const probeSite = PROBE_SITES.find((p) => p.id === probeSiteId) ?? PROBE_SITES[0];
  const activeTrend = TREND_PATTERNS.find((t) => t.id === activeTrendId) ?? TREND_PATTERNS[0];

  // Current & lagged state for interactive simulator
  const current = scenario.compute(minutes);
  const laggedTime = Math.max(0, Math.round(minutes - probeSite.lagFactor * 45));
  const lagged = scenario.compute(laggedTime);

  const probeReading = Number(
    (
      lagged.core * (1 - probeSite.usesPeriphBlend) +
      current.periph * probeSite.usesPeriphBlend +
      probeSite.biasVsCore
    ).toFixed(1)
  );
  const probeError = Number((probeReading - current.core).toFixed(1));
  const corePeriphDelta = Number((current.core - current.periph).toFixed(1));

  const cardSurface = isDark
    ? 'bg-slate-900/90 border-slate-800'
    : 'bg-white border-slate-200';
  const mutedSurface = isDark
    ? 'bg-slate-800/60 border-slate-700/80'
    : 'bg-slate-50 border-slate-200/80';
  const headingColor = isDark ? 'text-white' : 'text-slate-900';
  const bodyColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const subtleColor = isDark ? 'text-slate-400' : 'text-slate-500';

  // Helper to convert temperature (29..41 °C) to SVG Y coordinate (175..22)
  const tempToY = (temp: number) => {
    const clamped = Math.max(29, Math.min(41, temp));
    return 175 - ((clamped - 29) / 12) * 150;
  };

  const buildTrendPath = (points: number[]) =>
    points
      .map((val, idx) => {
        const x = 44 + idx * 50;
        const y = tempToY(val);
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <div className="space-y-6">
      {/* Header Summary Banner */}
      <div className={`rounded-2xl border p-5 sm:p-6 ${cardSurface}`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className={`flex flex-wrap items-center gap-2 text-xs font-medium ${subtleColor}`}>
              <span className="font-semibold text-orange-600 dark:text-orange-400">Termoregülasyon & Perfüzyon</span>
              <span aria-hidden="true">·</span>
              <span>Kor, Yarı-Kor & Periferik Problar</span>
              <span aria-hidden="true">·</span>
              <span>6 Bölümlü Sistematik İnceleme</span>
            </div>
            <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${headingColor}`}>
              Kor ve Periferik Sıcaklık Probları
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
              Genel ve nöroaksiyel anestezi hipotalamik termoregülasyon eşiğini bozarak ilk saatte hızlı redistribüsyon hipotermisine
              yol açar. Doğru <strong>kor probu seçimi</strong> (nazofarenks, mesane, timpanik, rektal, Zero-Heat-Flux) hipotermi ve
              malign hipertermiyi yakalarken, eşzamanlı <strong>periferik sıcaklık</strong> izlemi (<span className="font-mono">ΔT</span>)
              vazomotor tonusu ve doku perfüzyonunu ortaya koyar.
            </p>
            <div className={`text-[11px] flex items-center gap-1.5 pt-1 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>
                <strong>Kapsam Notu:</strong> Distal özofagus kor ısısı ölçümü (anatomik kılavuz, kalp-trakea etkileşimi ve özofageal stetoskop)
                ayrı bir monitörizasyon kartında müstakil olarak ele alınacaktır.
              </span>
            </div>
          </div>

          {/* 4-Metric Quick Reference Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 shrink-0">
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Normotermi</div>
              <div className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                36.0–37.5°C
              </div>
              <div className={`text-[10px] ${subtleColor}`}>&lt;36.0 °C = Hipotermi</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Sensör Fiziği</div>
              <div className="text-sm font-bold font-mono tabular-nums text-orange-600 dark:text-orange-400">
                NTC · ZHF
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Termistör · Seebeck · IR</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Faz 1 (1. Saat)</div>
              <div className="text-sm font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400">
                −1.0–1.5°C
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Redistribüsyon (%80)</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Kor–Perifer ΔT</div>
              <div className="text-sm font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400">
                &gt; 4.0 °C
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Vazokonstriksiyon / Şok</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BÖLÜM 1: FİZİKSEL PRENSİP VE ÇALIŞMA MEKANİZMASI                      */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            1
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Klinik sıcaklık probları fiziksel olarak dört ana prensiple çalışır: <strong>NTC termistör</strong> (direnç değişimi),{' '}
              <strong>termokupl</strong> (Seebeck voltajı), <strong>kızılötesi (IR)</strong> (kara cisim ışıması) ve{' '}
              <strong>sıfır ısı akısı (Zero-Heat-Flux)</strong> (derin doku izotermal tüneli).
            </p>
          </div>
        </div>

        {/* Visual 1A: 4 Sensor Physics SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <span className={`text-xs font-bold ${headingColor}`}>
                Biyofizik Şema: 4 Klinik Sıcaklık Sensörü Teknolojisi
              </span>
            </div>
            <span className={`text-[11px] font-mono ${subtleColor}`}>
              Klinik Hassasiyet Hedefi: ±0.1–0.2 °C
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 200"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Termistör, termokupl, kızılötesi ve sıfır ısı akısı sıcaklık sensörlerinin çalışma prensipleri"
            >
              {/* 1. NTC Thermistor */}
              <g transform="translate(8, 8)">
                <rect width="206" height="184" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="24" fontSize="11" fontWeight="700" fill="#f97316">1. NTC Termistör (En Sık)</text>
                {/* R vs T curve */}
                <rect x="14" y="34" width="178" height="72" rx="6" fill="#0b1120" stroke="#1e293b" />
                <line x1="34" y1="94" x2="178" y2="94" stroke="#475569" strokeWidth="1" />
                <line x1="34" y1="42" x2="34" y2="94" stroke="#475569" strokeWidth="1" />
                <path d="M 38 46 Q 75 78, 174 88" fill="none" stroke="#fb923c" strokeWidth="2.4" />
                <text x="38" y="45" fontSize="8" fontFamily="monospace" fill="#94a3b8">R (Ω)</text>
                <text x="174" y="103" textAnchor="end" fontSize="8" fontFamily="monospace" fill="#94a3b8">T (°C) →</text>
                <text x="112" y="62" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#fdba74">T ↑ → R ↓↓</text>
                <text x="14" y="124" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Yarı iletken metal oksit boncuk.</text>
                <text x="14" y="139" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Yüksek hassasiyet (±0.1 °C).</text>
                <text x="14" y="154" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Nazofarenks, mesane, cilt, PA.</text>
                <text x="14" y="172" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#f97316">YSI 400 vs 700 seri uyumu şart!</text>
              </g>

              {/* 2. Thermocouple (Seebeck) */}
              <g transform="translate(226, 8)">
                <rect width="206" height="184" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="24" fontSize="11" fontWeight="700" fill="#0ea5e9">2. Termokupl (Seebeck)</text>
                <rect x="14" y="34" width="178" height="72" rx="6" fill="#0b1120" stroke="#1e293b" />
                {/* Two dissimilar metals */}
                <path d="M 38 70 L 82 52 L 154 52" fill="none" stroke="#f59e0b" strokeWidth="2.4" />
                <path d="M 38 70 L 82 88 L 154 88" fill="none" stroke="#38bdf8" strokeWidth="2.4" />
                <circle cx="38" cy="70" r="6" fill="#f43f5e" />
                <rect x="148" y="45" width="32" height="50" rx="4" fill="#1e293b" stroke="#64748b" />
                <text x="164" y="73" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#e2e8f0">µV</text>
                <text x="38" y="92" textAnchor="middle" fontSize="8" fill="#fda4af">Ölçüm</text>
                <text x="108" y="47" fontSize="8" fill="#fcd34d">Bakır</text>
                <text x="102" y="99" fontSize="8" fill="#7dd3fc">Konstantan</text>
                <text x="14" y="124" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• İki farklı metal kavşağında ΔT</text>
                <text x="14" y="139" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  orantılı mikrovoltaj (V = S·ΔT).</text>
                <text x="14" y="154" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Çok ince, ucuz ve hızlı yanıt.</text>
                <text x="14" y="172" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#0ea5e9">Timpanik & ince cilt probları</text>
              </g>

              {/* 3. Infrared (IR) */}
              <g transform="translate(444, 8)">
                <rect width="206" height="184" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="24" fontSize="11" fontWeight="700" fill="#f59e0b">3. Kızılötesi (IR) Termometri</text>
                <rect x="14" y="34" width="178" height="72" rx="6" fill="#0b1120" stroke="#1e293b" />
                {/* Tympanic membrane + IR waves */}
                <ellipse cx="44" cy="70" rx="8" ry="20" fill="#f43f5e" fillOpacity="0.35" stroke="#fb7185" strokeWidth="1.8" />
                <path d="M 60 62 Q 72 56, 84 62 T 108 62" fill="none" stroke="#fbbf24" strokeWidth="1.8" />
                <path d="M 60 76 Q 72 70, 84 76 T 108 76" fill="none" stroke="#fbbf24" strokeWidth="1.8" />
                <rect x="116" y="54" width="60" height="32" rx="5" fill="#1e293b" stroke="#f59e0b" />
                <text x="146" y="73" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#fde68a">IR Sensör</text>
                <text x="44" y="99" textAnchor="middle" fontSize="7.5" fill="#fda4af">Zar / Cilt</text>
                <text x="14" y="124" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Planck kara cisim ışıması (T⁴).</text>
                <text x="14" y="139" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Hızlı, non-kontakt tarama.</text>
                <text x="14" y="154" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Buşon, ter ve açı hatası yüksek!</text>
                <text x="14" y="172" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#f59e0b">Sürekli intraop izleme uygun değil</text>
              </g>

              {/* 4. Zero-Heat-Flux (ZHF / SpotOn) */}
              <g transform="translate(662, 8)">
                <rect width="210" height="184" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#10b981" strokeOpacity="0.65" />
                <text x="14" y="24" fontSize="11" fontWeight="700" fill="#10b981">4. Sıfır Isı Akısı (ZHF / Alın)</text>
                <rect x="14" y="34" width="182" height="72" rx="6" fill="#0b1120" stroke="#1e293b" />
                {/* Layered patch + skin + deep core */}
                <rect x="40" y="42" width="130" height="12" rx="2" fill="#f97316" fillOpacity="0.8" />
                <text x="105" y="51" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff">Aktif Servo Isıtıcı + Yalıtım</text>
                <rect x="40" y="56" width="130" height="14" fill="#334155" />
                <text x="105" y="66" textAnchor="middle" fontSize="7.5" fill="#e2e8f0">Cilt (T1 = T2 → Isı Akısı q = 0)</text>
                <rect x="40" y="72" width="130" height="26" rx="2" fill="#991b1b" fillOpacity="0.55" />
                <text x="105" y="88" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fecaca">Derin Doku (1–2 cm = Kor!)</text>
                <text x="14" y="124" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• İki termistör eşitlenene dek ısıtır.</text>
                <text x="14" y="139" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Dikey ısı kaybı durur (izotermal).</text>
                <text x="14" y="154" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Non-invaziv kor (±0.2–0.3 °C).</text>
                <text x="14" y="172" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#10b981">Spinal / uyanık hastada ideal!</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Visual 1B: Interactive Core vs Peripheral & Probe Lag Simulator */}
        <div className={`rounded-xl border p-4 space-y-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-orange-500" />
              <span className={`text-xs sm:text-sm font-bold ${headingColor}`}>
                İnteraktif Simülatör: Kor–Periferik Dinamiği, Prob Seçimi & Termal Gecikme (Lag)
              </span>
            </div>
            <span className={`text-[11px] font-mono tabular-nums ${subtleColor}`}>
              Süre: {minutes} dk · {current.phase}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-4">
              {/* Scenario Presets */}
              <div>
                <div className={`text-[11px] font-semibold mb-1.5 ${subtleColor}`}>
                  1. Klinik Termoregülasyon Senaryosu
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {THERMAL_SCENARIOS.map((s) => {
                    const active = s.id === scenarioId;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setScenarioId(s.id)}
                        className={`px-3 py-2 rounded-lg border text-left text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-orange-600 text-white border-orange-500'
                            : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-orange-500/50'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-orange-400'
                        }`}
                      >
                        <div className="font-bold">{s.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Probe Site Selector */}
              <div>
                <div className={`text-[11px] font-semibold mb-1.5 ${subtleColor}`}>
                  2. Seçili Sıcaklık Probu Bölgesi
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {PROBE_SITES.map((site) => {
                    const active = site.id === probeSiteId;
                    return (
                      <button
                        key={site.id}
                        type="button"
                        onClick={() => setProbeSiteId(site.id)}
                        className={`px-2.5 py-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                          active
                            ? 'bg-orange-600 text-white border-orange-500'
                            : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-orange-500/50'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-orange-400'
                        }`}
                      >
                        <div className="font-bold truncate">{site.label}</div>
                        <div className={`text-[10px] font-mono ${active ? 'text-orange-100' : subtleColor}`}>
                          {site.category}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slider */}
              <div className={`p-3 rounded-xl border ${cardSurface}`}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`font-semibold ${headingColor}`}>3. İntraoperatif Süre (Dakika)</span>
                  <span className="font-mono tabular-nums font-bold text-orange-600 dark:text-orange-400">
                    {minutes} dk ({(minutes / 60).toFixed(1)} saat)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={180}
                  step={15}
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                  aria-label="İntraoperatif anestezi süresi"
                />
                <div className={`flex justify-between text-[10px] font-mono mt-1 ${subtleColor}`}>
                  <span>0 dk (Bazal)</span>
                  <span>60 dk (Faz 1 Sonu)</span>
                  <span>120 dk (Faz 2)</span>
                  <span>180 dk (Faz 3)</span>
                </div>
              </div>
            </div>

            {/* Right Dark Telemetry Readout */}
            <div className="lg:col-span-5 rounded-xl border bg-slate-950 border-slate-800 p-4 flex flex-col justify-between space-y-3 text-slate-100">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>TERMAL KOMPARTMAN MONİTÖRÜ</span>
                <span
                  className={`font-bold ${
                    current.status === 'normal'
                      ? 'text-emerald-400'
                      : current.status === 'warning'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                  }`}
                >
                  {current.core >= 38.0
                    ? 'HİPERTERMİ'
                    : current.core < 36.0
                      ? 'HİPOTERMİ'
                      : corePeriphDelta > 4.0
                        ? 'PERİFERİK ŞOK ΔT'
                        : 'NORMOTERMİ'}
                </span>
              </div>

              {/* Thermal Compartment Visual Bars */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">Gerçek Kor</div>
                  <div
                    className={`text-lg font-bold font-mono tabular-nums mt-0.5 ${
                      current.core >= 38.0
                        ? 'text-rose-400'
                        : current.core < 36.0
                          ? 'text-sky-400'
                          : 'text-emerald-400'
                    }`}
                  >
                    {current.core.toFixed(1)} °C
                  </div>
                  <div className="text-[10px] text-slate-400">Merkez organlar</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-orange-500/40">
                  <div className="text-[10px] font-mono text-orange-300">Seçili Prob</div>
                  <div className="text-lg font-bold font-mono tabular-nums text-orange-300 mt-0.5">
                    {probeReading.toFixed(1)} °C
                  </div>
                  <div className="text-[10px] font-mono tabular-nums text-slate-400">
                    Fark: {probeError > 0 ? `+${probeError.toFixed(1)}` : probeError.toFixed(1)} °C
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-mono text-cyan-300">ΔT (Kor–Cilt)</div>
                  <div
                    className={`text-lg font-bold font-mono tabular-nums mt-0.5 ${
                      corePeriphDelta > 4.0 ? 'text-rose-400' : 'text-cyan-300'
                    }`}
                  >
                    {corePeriphDelta.toFixed(1)} °C
                  </div>
                  <div className="text-[10px] font-mono tabular-nums text-slate-400">
                    Cilt: {current.periph.toFixed(1)} °C
                  </div>
                </div>
              </div>

              {/* Compact Thermal Compartment SVG */}
              <svg viewBox="0 0 320 78" className="w-full h-auto rounded-lg bg-slate-900/90 border border-slate-800">
                {/* Core Cylinder */}
                <rect x="16" y="14" width="130" height="50" rx="8" fill="#ea580c" fillOpacity="0.22" stroke="#f97316" strokeWidth="1.5" />
                <text x="81" y="34" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fed7aa">
                  KOR KOMPARTMAN
                </text>
                <text x="81" y="51" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#ffffff">
                  {current.core.toFixed(1)} °C
                </text>

                {/* Heat flux arrows */}
                <line x1="150" y1="39" x2="174" y2="39" stroke={corePeriphDelta > 4 ? '#f43f5e' : '#38bdf8'} strokeWidth="2.2" />
                <polygon points="178,39 170,34 170,44" fill={corePeriphDelta > 4 ? '#f43f5e' : '#38bdf8'} />
                <text x="164" y="26" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#94a3b8">
                  ΔT {corePeriphDelta.toFixed(1)}
                </text>

                {/* Peripheral Shell */}
                <rect x="182" y="14" width="122" height="50" rx="8" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="243" y="34" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#bae6fd">
                  PERİFERİK KABUK
                </text>
                <text x="243" y="51" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="700" fill="#e0f2fe">
                  {current.periph.toFixed(1)} °C
                </text>
              </svg>

              <div className="text-[11px] leading-relaxed text-slate-300 border-t border-slate-800 pt-2.5 space-y-1">
                <div>
                  <strong className="text-orange-300">{probeSite.label}:</strong> {probeSite.note}
                </div>
                <div className="text-slate-400">{current.note}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: ENDİKASYONLAR VE KLİNİK AMAÇ                                 */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            2
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Endikasyonlar ve Klinik Amaç
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              ASA Standart II ve NICE NG65 kılavuzlarına göre &gt;30 dk süren genel veya nöroaksiyel anestezide, tüm pediatrik/geriatrik
              vakalarda ve klinik açıdan anlamlı sıcaklık değişimi beklenen her hastada <strong>sürekli kor sıcaklığı</strong> izlenmelidir.
            </p>
          </div>
        </div>

        {/* Visual 2: 4-Panel Clinical Consequences & Dual Core/Peripheral Purpose SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 185"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Hipotermi komplikasyonları, hipertermi taraması ve kor-periferik gradyan endikasyonları"
            >
              {/* Panel 1: Who needs monitoring */}
              <g transform="translate(8, 8)">
                <rect width="206" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f97316">1. Zorunlu Endikasyonlar</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• &gt;30 dk Genel / Nöroaksiyel blok</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Yenidoğan, pediatri & geriatri</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Açık vücut boşluğu / uzun vaka</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Masif transfüzyon / KPB / travma</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Malign hipertermi yatkınlığı</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">Hedef Kor: 36.0 – 37.5 °C</text>
              </g>

              {/* Panel 2: Cost of Mild Hypothermia */}
              <g transform="translate(226, 8)">
                <rect width="206" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#0ea5e9" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#0ea5e9">2. Hafif Hipotermi (&lt;36 °C)</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Trombosit disfonksiyonu → Kanama ↑</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Cerrahi alan enfeksiyonu (×2–3)</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Postop titreme (VO₂ +%200–400)</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Miyokard iskemisi & aritmi riski</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• NMB & propofol etki uzaması</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#38bdf8">1 °C düşüş bile kanamayı %16 artırır</text>
              </g>

              {/* Panel 3: Hyperthermia & MH */}
              <g transform="translate(444, 8)">
                <rect width="206" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f43f5e" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f43f5e">3. Hipertermi & MH İzlemi</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Malign Hipertermi (geç, hızlı ↑)</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• İatrojenik aşırı ısıtma (bebek!)</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sepsis, pirojenik transfüzyon</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Tiroid fırtınası / feokromositoma</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Beyin hasarında ateş nörotoksik!</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#fb7185">MH’de EtCO₂ önce, ateş SONRA ↑</text>
              </g>

              {/* Panel 4: Core-Peripheral Gradient */}
              <g transform="translate(662, 8)">
                <rect width="210" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f59e0b" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f59e0b">4. Periferik Prob & ΔT Amacı</text>
                <text x="14" y="48" fontSize="9.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>ΔT = Tkor − Tcilt (Ayak/Parmak)</text>
                <text x="14" y="68" fontSize="9.5" fill="#10b981">• Normal / İyi perfüzyon: &lt; 2–4 °C</text>
                <text x="14" y="86" fontSize="9.5" fill="#fb7185">• Şok / Düşük CO: &gt; 4–6 °C</text>
                <text x="14" y="106" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kardiyak cerrahi & pediatrik YBÜ’de</text>
                <text x="14" y="121" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  perfüzyon ve ısıtma etkinliğini ölçer.</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#f59e0b">Periferik prob kor yerine geçmez!</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: TEKNİK KURULUM VE KALİBRASYON                                */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            3
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Teknik Kurulum ve Kalibrasyon
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Vücut <strong>homojen bir sıcaklığa sahip değildir</strong>. Probun yerleştirildiği anatomik kompartman, ölçümün
              doğruluğunu ve ısı değişimlerine yanıt hızını doğrudan belirler.
            </p>
          </div>
        </div>

        {/* Visual 3A: Anatomical Probe Site Map SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="w-4 h-4 text-orange-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              Anatomik Yerleşim Haritası: Kor · Yarı-Kor · Periferik Bölgeler
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 250"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Vücutta kor, yarı-kor ve periferik sıcaklık probu yerleşim noktaları"
            >
              {/* Left: Stylized Body Silhouette */}
              <rect x="10" y="10" width="260" height="230" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <text x="140" y="30" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                Termal Kompartmanlar
              </text>

              {/* Head */}
              <circle cx="140" cy="64" r="21" fill="#ea580c" fillOpacity="0.18" stroke="#f97316" strokeWidth="1.6" />
              {/* Torso (Core) */}
              <rect x="108" y="88" width="64" height="86" rx="14" fill="#ea580c" fillOpacity="0.22" stroke="#f97316" strokeWidth="1.6" />
              {/* Arms (Peripheral) */}
              <rect x="78" y="92" width="22" height="72" rx="10" fill="#0284c7" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="1.4" />
              <rect x="180" y="92" width="22" height="72" rx="10" fill="#0284c7" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="1.4" />
              {/* Legs (Peripheral) */}
              <rect x="112" y="178" width="22" height="52" rx="9" fill="#0284c7" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="1.4" />
              <rect x="146" y="178" width="22" height="52" rx="9" fill="#0284c7" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="1.4" />

              {/* Probe dots on silhouette */}
              {/* ZHF Forehead */}
              <circle cx="140" cy="52" r="4" fill="#10b981" />
              {/* Nasopharyngeal */}
              <circle cx="148" cy="67" r="4" fill="#f97316" />
              {/* Tympanic */}
              <circle cx="119" cy="64" r="4" fill="#f97316" />
              {/* PA / Distal Esophagus */}
              <circle cx="140" cy="118" r="4.5" fill="#f43f5e" />
              {/* Axilla */}
              <circle cx="105" cy="104" r="4" fill="#f59e0b" />
              {/* Bladder / Rectal */}
              <circle cx="140" cy="160" r="4" fill="#f97316" />
              {/* Peripheral foot/hand */}
              <circle cx="89" cy="156" r="4" fill="#38bdf8" />
              <circle cx="157" cy="222" r="4" fill="#38bdf8" />

              {/* Legend at bottom-left */}
              <circle cx="28" cy="206" r="4" fill="#f97316" />
              <text x="36" y="209" fontSize="8.5" fill={isDark ? '#cbd5e1' : '#334155'}>Kor</text>
              <circle cx="28" cy="222" r="4" fill="#10b981" />
              <text x="36" y="225" fontSize="8.5" fill={isDark ? '#cbd5e1' : '#334155'}>ZHF / Yarı-Kor</text>
              <circle cx="195" cy="222" r="4" fill="#38bdf8" />
              <text x="203" y="225" fontSize="8.5" fill={isDark ? '#cbd5e1' : '#334155'}>Periferik</text>

              {/* Right: Detailed Callout Cards for Each Major Site */}
              <g transform="translate(286, 10)">
                <rect width="584" height="230" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="16" y="26" fontSize="11" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                  Bölgelere Göre Anatomik Yerleşim Kuralları
                </text>

                {[
                  {
                    title: 'Nazofarengeal Prob (Kor)',
                    rule: 'Derinlik = Burun kanadı → Tragus mesafesi (erişkinde 10–20 cm). Yumuşak damak arkasına oturur.',
                    color: '#f97316',
                  },
                  {
                    title: 'Zero-Heat-Flux Alın Bandı (Non-İnvaziv Yarı-Kor)',
                    rule: 'Lateral kaşın hemen üstüne, kuru/temiz alına yapıştır; 3–5 dk ısınma ve dengeleme bekle.',
                    color: '#10b981',
                  },
                  {
                    title: 'Mesane (Termistörlü Foley) & Rektal Prob',
                    rule: 'Mesane: İdrar çıkışı >0.5 mL/kg/st şart. Rektal: 5–8 cm it (ampulla dışkı izolasyonu lag yapar!).',
                    color: '#f59e0b',
                  },
                  {
                    title: 'Aksiller & Periferik Cilt Probu (Başparmak / Ayak Tabanı)',
                    rule: 'Aksilla: Prob aksiller arterde + kol sıkıca gövdeye addüksiyonda. Cilt: FAW üflemesinden yalıtılmış.',
                    color: '#38bdf8',
                  },
                  {
                    title: 'Distal Özofagus Kor Isısı (Ayrı Modül)',
                    rule: 'Alt 1/3 özofagus yerleşimi, kardiyak ses kılavuzluğu ve trakeal hava artefaktları ayrı kartta yer alacaktır.',
                    color: '#a855f7',
                  },
                ].map((item, idx) => (
                  <g key={item.title} transform={`translate(16, ${38 + idx * 36})`}>
                    <rect width="552" height="31" rx="6" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#e2e8f0'} />
                    <circle cx="13" cy="15.5" r="4" fill={item.color} />
                    <text x="25" y="13" fontSize="9.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                      {item.title}
                    </text>
                    <text x="25" y="25" fontSize="8.5" fill={isDark ? '#94a3b8' : '#475569'}>
                      {item.rule}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* Comparison Table + Calibration Checklist */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-700'}>
                  <th className="py-2.5 px-3 font-bold">Ölçüm Bölgesi</th>
                  <th className="py-2.5 px-3 font-bold">Sınıf</th>
                  <th className="py-2.5 px-3 font-bold font-mono">Doğruluk / Lag</th>
                  <th className="py-2.5 px-3 font-bold">Başlıca Kısıtlılık</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {SITE_COMPARISON_TABLE.map((row) => (
                  <tr
                    key={row.site}
                    className={isDark ? 'hover:bg-slate-800/40 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                  >
                    <td className="py-2 px-3 font-semibold">{row.site}</td>
                    <td className="py-2 px-3 text-orange-600 dark:text-orange-400 font-medium">{row.tier}</td>
                    <td className="py-2 px-3 font-mono tabular-nums whitespace-nowrap">{row.accuracyLag}</td>
                    <td className="py-2 px-3">{row.caveat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`xl:col-span-4 p-4 rounded-xl border space-y-2.5 ${mutedSurface}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-orange-500" />
              <span className={`text-xs font-bold ${headingColor}`}>
                Kalibrasyon & Teknik Doğrulama
              </span>
            </div>
            <ul className={`space-y-2 text-xs leading-relaxed ${bodyColor}`}>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>YSI 400 vs 700 Serisi Uyumu:</strong> En yaygın tek kullanımlık problar YSI-400 (25 °C’de 2252 Ω)
                  standardındadır; yanlış seri ara kablosu <strong>tamamen hatalı sıcaklık</strong> okutur!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Fabrika & Yıllık Doğrulama:</strong> Termistörler tek kullanımlıktır ve kullanıcı kalibrasyonu gerektirmez;
                  monitör girişi yılda bir hassas direnç simülatörüyle (±0.1 °C) test edilir.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>İki Kanal (T1 + T2 = ΔT):</strong> Çift kanal destekli monitörde T1’e kor, T2’ye periferik cilt bağlayarak
                  otomatik <span className="font-mono">ΔT</span> takibi açılabilir.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: NORMAL VE PATOLOJİK DALGA FORMLARI (SICAKLIK TRENDLERİ)      */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            4
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Normal ve Patolojik Dalga Formları (Zaman–Sıcaklık Trend Analizi)
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Anlık tek bir sayı yerine <strong>sıcaklık trend eğrisinin eğimi</strong> ve <strong>kor–periferik ayrışması</strong>{' '}
              klinik tanıyı koydurur: ani dikey düşüşler artefaktı, platosuz düşüş nöroaksiyel bloğu, genişleyen ΔT şoku, ivmeli yükseliş ise MH’yi gösterir.
            </p>
          </div>
        </div>

        {/* Pattern Selector */}
        <div className="flex flex-wrap gap-1.5">
          {TREND_PATTERNS.map((pattern) => {
            const active = pattern.id === activeTrendId;
            return (
              <button
                key={pattern.id}
                type="button"
                onClick={() => setActiveTrendId(pattern.id)}
                className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-orange-600 text-white border-orange-500'
                    : isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-orange-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-orange-400'
                }`}
              >
                {pattern.label}
              </button>
            );
          })}
        </div>

        {/* Dark Thermal Trend Console */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 text-slate-100 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Waves className="w-4 h-4 text-orange-400" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">{activeTrend.label}</div>
                <div className="text-[11px] font-mono text-slate-400">{activeTrend.statusText}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono tabular-nums">
              <div>
                <div className="text-[10px] text-orange-300">Tkor (T1)</div>
                <div
                  className={`text-lg font-bold ${
                    activeTrend.status === 'normal'
                      ? 'text-emerald-400'
                      : activeTrend.status === 'warning'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                  }`}
                >
                  {activeTrend.coreEnd}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-cyan-300">Tperifer (T2)</div>
                <div className="text-lg font-bold text-cyan-300">{activeTrend.periphEnd}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">ΔT (T1−T2)</div>
                <div className="text-sm font-bold text-slate-200">{activeTrend.deltaT}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Hız</div>
                <div className="text-sm font-bold text-amber-300">{activeTrend.rate}</div>
              </div>
            </div>
          </div>

          {/* Dual-Curve SVG Trend Chart */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 540 205"
              className="w-full min-w-[460px] h-auto"
              role="img"
              aria-label={`${activeTrend.label} kor ve periferik sıcaklık trend eğrisi`}
            >
              {/* Grid lines at 40, 38, 36, 34, 32, 30 °C */}
              {[40, 38, 36, 34, 32, 30].map((tVal) => {
                const y = tempToY(tVal);
                const isHypoThreshold = tVal === 36;
                return (
                  <g key={tVal}>
                    <line
                      x1="38"
                      y1={y}
                      x2="514"
                      y2={y}
                      stroke={isHypoThreshold ? '#0ea5e9' : '#1e293b'}
                      strokeWidth={isHypoThreshold ? '1.3' : '1'}
                      strokeDasharray={isHypoThreshold ? '5 3' : undefined}
                    />
                    <text
                      x="32"
                      y={y + 3}
                      textAnchor="end"
                      fontSize="8.5"
                      fontFamily="monospace"
                      fill={isHypoThreshold ? '#38bdf8' : '#64748b'}
                    >
                      {tVal}°
                    </text>
                  </g>
                );
              })}

              {/* Threshold label */}
              <text x="510" y={tempToY(36) - 4} textAnchor="end" fontSize="8" fontFamily="monospace" fill="#38bdf8">
                36.0 °C Hipotermi Eşiği
              </text>

              {/* X-axis time ticks */}
              {[0, 30, 60, 90, 120, 150, 180].map((min, idx) => {
                const x = 44 + (idx / 6) * 450;
                return (
                  <text key={min} x={x} y="191" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#64748b">
                    {min} dk
                  </text>
                );
              })}

              {/* Peripheral Curve (Cyan) */}
              <path
                d={buildTrendPath(activeTrend.periphPoints)}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.2"
                strokeDasharray="6 3"
              />
              {activeTrend.periphPoints.map((val, idx) => (
                <circle key={`p-${idx}`} cx={44 + idx * 50} cy={tempToY(val)} r="2.8" fill="#38bdf8" />
              ))}

              {/* Core Curve (Orange/Rose) */}
              <path
                d={buildTrendPath(activeTrend.corePoints)}
                fill="none"
                stroke={activeTrend.id === 'mh' ? '#fb7185' : '#fb923c'}
                strokeWidth="3"
              />
              {activeTrend.corePoints.map((val, idx) => (
                <circle
                  key={`c-${idx}`}
                  cx={44 + idx * 50}
                  cy={tempToY(val)}
                  r="3.5"
                  fill={activeTrend.id === 'mh' ? '#fb7185' : '#fb923c'}
                />
              ))}

              {/* Annotation pill-free clean callout */}
              <rect x="44" y="8" width="466" height="18" rx="4" fill="#0f172a" stroke="#334155" />
              <text x="277" y="20" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#fed7aa">
                {activeTrend.annotation}
              </text>
            </svg>
          </div>

          {/* Clinical Interpretation Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-800 pt-3.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-orange-300">Eğri Morfolojisi</div>
              <p className="text-slate-300 leading-relaxed">{activeTrend.morphology}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-300">Sık Klinik Nedenler</div>
              <ul className="space-y-1 text-slate-300 list-disc pl-4">
                {activeTrend.causes.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-300">Anestezist Klinik Eylemi</div>
              <p className="text-slate-200 leading-relaxed">{activeTrend.action}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 5: LİMİTASYONLAR VE ARTEFAKTLAR                                 */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            5
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Limitasyonlar ve Artefaktlar
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Sıcaklık probları çevresel hava akımı, soğuk irrigasyon sıvıları, ısıtıcı battaniye teması ve fizyolojik termal gecikme
              nedeniyle kolayca yanıltıcı değer üretebilir.
            </p>
          </div>
        </div>

        {/* Visual 5: 3-Zone Thermometry Pitfall SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              3 Bölgeli Termometri Hata Haritası (Yalancı Düşük · Termal Gecikme · Yalancı Yüksek)
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 170"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Sıcaklık monitörizasyonunda yalancı düşük, gecikmiş yanıt ve yalancı yüksek nedenleri"
            >
              {/* Zone 1: False Low */}
              <g transform="translate(8, 8)">
                <rect width="280" height="154" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#0ea5e9" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#0ea5e9">▼ YALANCI DÜŞÜK OKUMA</text>
                <text x="14" y="47" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Nazofarenks probu sığ + gaz kaçağı</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Mesanede soğuk TURP/pelvik irrigasyon</text>
                <text x="14" y="81" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Aksiller probda kol abdüksiyonu</text>
                <text x="14" y="98" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Aksilla tarafında soğuk IV sıvı</text>
                <text x="14" y="115" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• IR timpanik probda buşon / yanlış açı</text>
                <text x="14" y="132" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Cilt probunun ciltten ayrılması</text>
              </g>

              {/* Zone 2: Thermal Lag */}
              <g transform="translate(300, 8)">
                <rect width="280" height="154" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f59e0b" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f59e0b">◷ TERMAL GECİKME (LAG)</text>
                <text x="14" y="47" fontSize="9.5" fontWeight="700" fill="#fbbf24">• Rektal prob: 15–30 dk gecikme!</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Dışkı kitlesi ısı yalıtımı yapar</text>
                <text x="14" y="81" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Mesane probu: Oligüri / anüride yavaşlar</text>
                <text x="14" y="98" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• ZHF (alın): İlk 3–5 dk dengeleme süresi</text>
                <text x="14" y="115" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• KPB hızlı soğutma/ısıtmada sapma</text>
                <text x="14" y="132" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• MH’de sıcaklık her zaman geç yükselir!</text>
              </g>

              {/* Zone 3: False High */}
              <g transform="translate(592, 8)">
                <rect width="280" height="154" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f43f5e" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f43f5e">▲ YALANCI YÜKSEK OKUMA</text>
                <text x="14" y="47" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• FAW battaniyenin doğrudan proba üflemesi</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Yenidoğanda radyant ısıtıcı altında açık prob</text>
                <text x="14" y="81" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Isıtılmış IV infüzyon hattına bitişik aksilla</text>
                <text x="14" y="98" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Batın içi sıcak irrigasyon (mesane/rektal)</text>
                <text x="14" y="115" fontSize="9.5" fontWeight="700" fill="#fb7185">• YSI 400 vs 700 kablo seri uyumsuzluğu!</text>
                <text x="14" y="132" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Cilt probunda termal lokal enflamasyon</text>
              </g>
            </svg>
          </div>
        </div>

        {/* 8-Row Limitation Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-700'}>
                <th className="py-2.5 px-3 font-bold">Artefakt / Sınırlama</th>
                <th className="py-2.5 px-3 font-bold">Etki</th>
                <th className="py-2.5 px-3 font-bold">Mekanizma</th>
                <th className="py-2.5 px-3 font-bold">Klinik Çözüm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  cause: 'Nazofarengeal Hava Kaçağı',
                  effect: 'Yalancı Düşük',
                  col: 'text-sky-600 dark:text-sky-400',
                  mech: 'Kaçak taze gaz / burun kanülü prob ucunu soğutur.',
                  fix: 'Probu burun-tragus mesafesine kadar ilerlet; SGA/tüp kaçağını düzelt.',
                },
                {
                  cause: 'Oligüri / Soğuk Mesane İrrigasyonu',
                  effect: 'Lag / Yalancı Düşük',
                  col: 'text-sky-600 dark:text-sky-400',
                  mech: 'Düşük idrar akımı ısı iletimini durdurur; irrigasyon yıkaması soğutur.',
                  fix: 'TURP veya anürik hastada nazofarengeal veya ZHF kor probu kullan.',
                },
                {
                  cause: 'Rektal Dışkı İzolasyonu',
                  effect: '15–30 dk Gecikme',
                  col: 'text-amber-600 dark:text-amber-400',
                  mech: 'Düşük rektal kan akımı ve fekal kitle hızlı değişimleri maskeler.',
                  fix: 'KPB, travma ve MH şüphesinde rektal proba güvenme; santral kor seç.',
                },
                {
                  cause: 'FAW Battaniye Doğrudan Teması',
                  effect: 'Yalancı Yüksek',
                  col: 'text-rose-600 dark:text-rose-400',
                  mech: '43 °C sıcak hava cilt/aksiller/ZHF probunu doğrudan ısıtır.',
                  fix: 'Probu sıcak hava akımından yalıtıcı bantla koru veya başka bölge seç.',
                },
                {
                  cause: 'Cilt Probunun Kor Sanılması',
                  effect: '−1 ila −5 °C Hata',
                  col: 'text-rose-600 dark:text-rose-400',
                  mech: 'Alın/kol cildi vazokonstriksiyon ve oda havasıyla hızla soğur.',
                  fix: 'Standart yapışkan cilt probunu kor yerine kullanma; ZHF veya santral kor tak.',
                },
                {
                  cause: 'IR Timpanik Tabanca Hatası',
                  effect: 'Değişken (−1.5 °C)',
                  col: 'text-amber-600 dark:text-amber-400',
                  mech: 'Sensör timpanik zar yerine soğuk dış kulak yolu duvarını görür.',
                  fix: 'İntraoperatif sürekli izlemde IR tabanca yerine temas/ZHF kor probu kullan.',
                },
                {
                  cause: 'YSI 400 vs 700 Kablo Uyumsuzluğu',
                  effect: 'Tamamen Hatalı Değer',
                  col: 'text-rose-600 dark:text-rose-400',
                  mech: 'Farklı direnç-sıcaklık eğrisi monitörün kalibrasyonunu bozar.',
                  fix: 'Prob ve ara kablo üzerindeki "400 Series" etiketini mutlaka eşleştir.',
                },
                {
                  cause: 'MH’de Geç Sıcaklık Yükselişi',
                  effect: 'Gecikmiş Müdahale',
                  col: 'text-rose-600 dark:text-rose-400',
                  mech: 'Kas hipermetabolizmasının kor ısısını artırması zaman alır.',
                  fix: 'İlk uyaran olarak EtCO₂ ↑, taşikardi ve rijiditeyi takip et.',
                },
              ].map((row) => (
                <tr
                  key={row.cause}
                  className={isDark ? 'hover:bg-slate-800/40 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                >
                  <td className="py-2.5 px-3 font-semibold">{row.cause}</td>
                  <td className={`py-2.5 px-3 font-mono font-bold whitespace-nowrap ${row.col}`}>{row.effect}</td>
                  <td className="py-2.5 px-3">{row.mech}</td>
                  <td className="py-2.5 px-3">{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 6: KOMPLİKASYONLAR VE GÜVENLİK                                  */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            6
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Komplikasyonlar ve Güvenlik
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Sıcaklık probları basit görünse de yanlış bölge seçimi <strong>intrakraniyal geçiş</strong>,{' '}
              <strong>timpanik perforasyon</strong>, <strong>rektal perforasyon</strong> ve <strong>MRG/koter termal yanıkları</strong> gibi
              önlenebilir ciddi zararlara yol açabilir.
            </p>
          </div>
        </div>

        {/* Visual 6: 3-Panel Safety SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              Perioperatif Sıcaklık Probu Güvenlik Şeması (Anatomik Travma · Termal/MRG Yanığı · Servo & Enfeksiyon)
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 185"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Sıcaklık probu komplikasyonları ve güvenlik önlemleri"
            >
              {/* Panel 1: Anatomical Trauma */}
              <g transform="translate(8, 8)">
                <rect width="280" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f43f5e" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f43f5e">1. Anatomik Travma & Kontrendikasyon</text>
                <text x="14" y="48" fontSize="9.5" fontWeight="700" fill="#fb7185">• Kafa tabanı kırığı / Koagülopati:</text>
                <text x="14" y="63" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Nazofarengeal prob KESİN YASAK (kraniyal geçiş!).</text>
                <text x="14" y="84" fontSize="9.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>• Timpanik Temas Probu:</text>
                <text x="14" y="99" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Kulak zarı perforasyonu ve otoraji riski.</text>
                <text x="14" y="120" fontSize="9.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>• Rektal Prob:</text>
                <text x="14" y="135" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Yenidoğan/nötropenik hastada perforasyon &amp;</text>
                <text x="14" y="149" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  bakteriyemi riski → nazikçe, kayganlaştırıcıyla.</text>
              </g>

              {/* Panel 2: Thermal, Cautery & MRI Burns */}
              <g transform="translate(300, 8)">
                <rect width="280" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f97316" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f97316">2. Koter, MRG & "Hosing" Yanıkları</text>
                <text x="14" y="48" fontSize="9.5" fontWeight="700" fill="#fdba74">• MRG’de Standart Kablolu Prob YASAK!</text>
                <text x="14" y="63" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  RF anten etkisiyle prob ucunda derin yanık;</text>
                <text x="14" y="77" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  yalnızca MR-güvenli fiberoptik prob kullan.</text>
                <text x="14" y="98" fontSize="9.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>• Elektrokoter Alternatif Akım Yolu:</text>
                <text x="14" y="113" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Kablo hasarı/topraklama hatasında mukozal yanık.</text>
                <text x="14" y="134" fontSize="9.5" fontWeight="700" fill="#fb7185">• FAW Hortumu Battaniyesiz ("Hosing"):</text>
                <text x="14" y="149" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Anestezili cilde direkt üfleme → 3. derece yanık!</text>
              </g>

              {/* Panel 3: Servo Runaway & Infection */}
              <g transform="translate(592, 8)">
                <rect width="280" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#0ea5e9" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#0ea5e9">3. Servo Aşırı Isıtma & Enfeksiyon</text>
                <text x="14" y="48" fontSize="9.5" fontWeight="700" fill="#38bdf8">• Yenidoğan Radyant Isıtıcı Tuzağı:</text>
                <text x="14" y="63" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Servo cilt probu ciltten ayrılırsa cihaz oda</text>
                <text x="14" y="77" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  havasını (24 °C) okur → %100 güçle YAKAR!</text>
                <text x="14" y="98" fontSize="9.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>• ZHF Alın Bandı Bası/Cilt Hasarı:</text>
                <text x="14" y="113" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Prone pozisyonda baş yastığına sıkıştırma;</text>
                <text x="14" y="127" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  kırılgan yenidoğan cildinde 24 saatte kontrol.</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">
                  Tek kullanımlık prob + CAUTI önlemi
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* 2 Clinical Safety Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold flex items-center gap-1.5 ${headingColor}`}>
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Aktif Isıtma & Termal Yanık Koruması</span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Zorlu hava ısıtıcısı (FAW) mutlaka onaylı difüzör battaniyeyle kullanılmalıdır. İskemik ekstremiteye (aort kros-klemp
              distali) veya bası altındaki cilde yüksek ısı uygulanması düşük kan akımı nedeniyle hızla termal yanık oluşturur.
            </p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold flex items-center gap-1.5 ${headingColor}`}>
              <Activity className="w-3.5 h-3.5 text-rose-500" />
              <span>Alarm Limitleri & Derlenme (PACU) Devri</span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Alt alarmı <strong>36.0 °C</strong>, üst alarmı <strong>37.8 °C</strong> olarak ayarlayın. Ekstübasyon öncesi kor
              sıcaklığını mutlaka doğrulayın; &lt;36.0 °C ile PACU’ya çıkan hastalarda postop titreme ve kardiyak olaylar belirgin artar.
            </p>
          </div>
        </div>

        {/* References */}
        <div className={`pt-3 border-t flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
          <span className="inline-flex items-center gap-1 font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-orange-500" />
            Kaynaklar:
          </span>
          <span>Miller’s Anesthesia (Temperature Regulation & Monitoring)</span>
          <span aria-hidden="true">·</span>
          <span>Sessler DI — Perioperative Thermoregulation (Lancet / Anesthesiology)</span>
          <span aria-hidden="true">·</span>
          <span>NICE NG65 Hypothermia Guideline</span>
          <span aria-hidden="true">·</span>
          <span>ASA Basic Monitoring Standards (2020)</span>
        </div>
      </section>
    </div>
  );
};
