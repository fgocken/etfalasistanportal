import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Info,
  ShieldAlert,
  Sliders,
  Waves,
  Wrench,
  Zap,
} from 'lucide-react';

interface PulseOximetryModuleProps {
  isDark: boolean;
}

type PhysicsScenarioId = 'normal' | 'borderline' | 'hypoxemia' | 'cohb' | 'methb';
type PlethPatternId =
  | 'normal'
  | 'vasoconstriction'
  | 'vasodilation'
  | 'hypovolemia'
  | 'artifact'
  | 'venous';

interface PhysicsScenario {
  id: PhysicsScenarioId;
  label: string;
  shortTag: string;
  trueO2Hb: number;
  displayedSpO2: number;
  rRatio: number;
  coHb: number;
  metHb: number;
  clinicalNote: string;
  warningLevel: 'ok' | 'warn' | 'danger';
}

const PHYSICS_SCENARIOS: PhysicsScenario[] = [
  {
    id: 'normal',
    label: 'Normal Oksijenasyon',
    shortTag: 'SaO₂ %99',
    trueO2Hb: 99,
    displayedSpO2: 99,
    rRatio: 0.43,
    coHb: 1,
    metHb: 0,
    clinicalNote:
      'Kırmızı (660 nm) absorbsiyon düşük, kızılötesi (940 nm) absorbsiyon görece yüksektir. R ≈ 0.43 değeri kalibrasyon eğrisinde %99 SpO₂’ye karşılık gelir.',
    warningLevel: 'ok',
  },
  {
    id: 'borderline',
    label: 'Sınır Hipoksemi (Eşik)',
    shortTag: 'SaO₂ %90',
    trueO2Hb: 90,
    displayedSpO2: 90,
    rRatio: 0.81,
    coHb: 1,
    metHb: 0,
    clinicalNote:
      'Oksihemoglobin dissosiyasyon eğrisinin dikleşmeye başladığı kritik omuz noktasıdır (PaO₂ ≈ 60 mmHg). Bu seviyenin altında satürasyon saniyeler içinde hızla düşer.',
    warningLevel: 'warn',
  },
  {
    id: 'hypoxemia',
    label: 'Ciddi Hipoksemi',
    shortTag: 'SaO₂ %76',
    trueO2Hb: 76,
    displayedSpO2: 76,
    rRatio: 1.32,
    coHb: 1,
    metHb: 0,
    clinicalNote:
      'Deoksihemoglobin (HHb) artışı 660 nm absorbsiyonunu belirgin yükseltir ve R > 1.0 olur. Not: %70 altında insan kalibrasyon verisi olmadığından ölçüm doğruluğu düşer.',
    warningLevel: 'danger',
  },
  {
    id: 'cohb',
    label: 'CO Zehirlenmesi (%25 COHb)',
    shortTag: 'COHb Tuzağı',
    trueO2Hb: 74,
    displayedSpO2: 98,
    rRatio: 0.46,
    coHb: 25,
    metHb: 0,
    clinicalNote:
      'TEHLİKELİ YALANCI YÜKSEK! Karboksihemoglobin 660 nm’de oksihemoglobinle neredeyse aynı ışık absorbsiyonuna sahiptir. Gerçek O₂Hb %74 iken monitör %98 gösterir. Tanı yalnızca CO-oksimetreli kan gazıyla konur.',
    warningLevel: 'danger',
  },
  {
    id: 'methb',
    label: 'Methemoglobinemi (%30 MetHb)',
    shortTag: 'MetHb → %85',
    trueO2Hb: 69,
    displayedSpO2: 85,
    rRatio: 1.0,
    coHb: 1,
    metHb: 30,
    clinicalNote:
      '%85 KİLİTLENME TUZAĞI! MetHb hem 660 nm hem 940 nm dalga boyunu güçlü biçimde emer; R oranı 1.0’a yaklaşır ve SpO₂ oksijen verilmesine rağmen %85 civarında sabitlenir. Prilokain/benzokain sonrası akılda tutulmalıdır.',
    warningLevel: 'danger',
  },
];

interface PlethPattern {
  id: PlethPatternId;
  label: string;
  badge: string;
  spo2Display: string;
  prDisplay: string;
  piDisplay: string;
  pviDisplay: string;
  reliability: 'reliable' | 'caution' | 'invalid';
  reliabilityText: string;
  ecgX: number[];
  plethPath: string;
  morphology: string;
  causes: string[];
  action: string;
}

const PLETH_PATTERNS: PlethPattern[] = [
  {
    id: 'normal',
    label: 'Normal Pletismografi',
    badge: 'Referans',
    spo2Display: '99',
    prDisplay: '72',
    piDisplay: '4.2%',
    pviDisplay: '7%',
    reliability: 'reliable',
    reliabilityText: 'Güvenilir Sinyal · EKG ile Senkron',
    ecgX: [45, 165, 285, 405],
    plethPath:
      'M 10 132 L 55 132 C 63 132, 68 48, 80 42 C 90 38, 97 72, 106 84 C 113 92, 118 76, 125 80 C 134 86, 146 124, 175 132 ' +
      'C 183 132, 188 48, 200 42 C 210 38, 217 72, 226 84 C 233 92, 238 76, 245 80 C 254 86, 266 124, 295 132 ' +
      'C 303 132, 308 48, 320 42 C 330 38, 337 72, 346 84 C 353 92, 358 76, 365 80 C 374 86, 386 124, 415 132 ' +
      'C 423 132, 428 48, 440 42 C 450 38, 457 72, 466 84 C 473 92, 478 76, 485 80 C 492 86, 500 116, 510 128',
    morphology:
      'Keskin ve dik sistolik çıkış (anakrotik kol), yuvarlak tepe, üst-orta üçte belirgin dikrotik çentik (aort kapağı kapanması ve vasküler yansıma) ve pürüzsüz diyastolik iniş (katakrotik kol). Her EKG R-dalgasını ~180–220 ms gecikmeyle izler.',
    causes: ['Normovolemi ve yeterli periferik perfüzyon', 'Normal sistemik vasküler direnç (SVR)', 'Uygun prob yerleşimi'],
    action: 'Ekrandaki SpO₂ ve nabız değerleri güvenilirdir; bazal pletismografi referansı olarak kabul edilir.',
  },
  {
    id: 'vasoconstriction',
    label: 'Vazokonstriksiyon / Hipotermi',
    badge: 'Düşük PI',
    spo2Display: '95',
    prDisplay: '104',
    piDisplay: '0.3%',
    pviDisplay: '10%',
    reliability: 'caution',
    reliabilityText: 'Düşük Amplitüd · Desatürasyon Gecikmesi Riski',
    ecgX: [40, 126, 212, 298, 384, 470],
    plethPath:
      'M 10 132 L 50 132 C 57 132, 62 104, 72 102 C 82 100, 92 114, 102 122 C 112 128, 124 132, 136 132 ' +
      'C 143 132, 148 105, 158 103 C 168 101, 178 115, 188 123 C 198 129, 210 132, 222 132 ' +
      'C 229 132, 234 104, 244 102 C 254 100, 264 114, 274 122 C 284 128, 296 132, 308 132 ' +
      'C 315 132, 320 105, 330 103 C 340 101, 350 115, 360 123 C 370 129, 382 132, 394 132 ' +
      'C 401 132, 406 104, 416 102 C 426 100, 436 114, 446 122 C 456 128, 468 132, 480 132 ' +
      'C 487 132, 492 105, 502 103 L 510 112',
    morphology:
      'Belirgin biçimde küçülmüş (sönümlenmiş) amplitüd, silikleşmiş veya sistolik tepeye yaklaşmış dikrotik çentik ve çok düşük Perfüzyon İndeksi (PI < %0.5).',
    causes: [
      'Hipotermi / soğuk ekstremite',
      'Yüksek doz vazopresör (Noradrenalin, Fenilefrin)',
      'Hemorajik/kardiyojenik şok veya yoğun sempatik deşarj',
      'Aynı kolda NIBP manşonu şişmesi veya proksimal arteriyel bası',
    ],
    action:
      'Ekstremiteyi ısıt, NIBP manşonunu karşı kola al; yanıt yoksa probu santral bölgeye (alın reflektans probu veya kulak memesi) taşı. Parmaktan desatürasyon okuması >90–120 sn gecikebilir!',
  },
  {
    id: 'vasodilation',
    label: 'Vazodilatasyon / Sempatik Blok',
    badge: 'Yüksek PI',
    spo2Display: '99',
    prDisplay: '88',
    piDisplay: '8.4%',
    pviDisplay: '9%',
    reliability: 'reliable',
    reliabilityText: 'Güçlü Sinyal · Düşük SVR Paterni',
    ecgX: [45, 165, 285, 405],
    plethPath:
      'M 10 136 L 54 136 C 60 136, 65 26, 76 24 C 85 22, 92 114, 102 126 C 109 132, 117 104, 126 108 C 136 112, 148 134, 174 136 ' +
      'C 180 136, 185 26, 196 24 C 205 22, 212 114, 222 126 C 229 132, 237 104, 246 108 C 256 112, 268 134, 294 136 ' +
      'C 300 136, 305 26, 316 24 C 325 22, 332 114, 342 126 C 349 132, 357 104, 366 108 C 376 112, 388 134, 414 136 ' +
      'C 420 136, 425 26, 436 24 C 445 22, 452 114, 462 126 C 469 132, 477 104, 486 108 C 495 112, 502 128, 510 134',
    morphology:
      'Çok yüksek amplitüdlü, keskin yükselen ve hızla inen sistolik tepe; dikrotik çentik bazal hatta yakın çok aşağıya kaymış ve ardından belirgin sekonder diyastolik dalga oluşmuş.',
    causes: [
      'Spinal/epidural anestezi veya periferik sinir bloğu sonrası sempatoliz',
      'Derin volatil anestezi / Propofol vazodilatasyonu',
      'Erken sıcak sepsis, anafilaksi veya ateş',
    ],
    action:
      'Sinyal son derece güçlüdür. Rejyonel anestezi sonrası ilgili ekstremitede PI’nın bazale göre ≥2 kat artması başarılı sempatik blokajın erken göstergesidir.',
  },
  {
    id: 'hypovolemia',
    label: 'Solunumsal Varyasyon (Yüksek PVI)',
    badge: 'PVI %22',
    spo2Display: '98',
    prDisplay: '112',
    piDisplay: '1.8%',
    pviDisplay: '22%',
    reliability: 'reliable',
    reliabilityText: 'Dinamik Preload Bağımlılığı Göstergesi',
    ecgX: [38, 122, 206, 290, 374, 458],
    plethPath:
      'M 10 124 L 46 124 C 52 124, 57 42, 67 38 C 76 35, 84 74, 92 84 C 98 90, 104 78, 110 82 C 118 88, 124 122, 132 128 ' +
      'C 138 128, 143 68, 152 64 C 161 61, 168 92, 176 100 C 182 106, 188 96, 194 100 C 202 106, 208 130, 216 135 ' +
      'C 222 135, 227 98, 236 95 C 244 92, 252 114, 260 120 C 266 124, 272 116, 278 120 C 286 125, 292 134, 300 134 ' +
      'C 306 134, 311 78, 320 74 C 328 71, 336 98, 344 106 C 350 112, 356 102, 362 106 C 370 112, 376 126, 384 126 ' +
      'C 390 126, 395 44, 404 40 C 413 37, 421 76, 429 86 C 435 92, 441 80, 447 84 C 455 90, 461 122, 469 128 ' +
      'C 475 128, 480 68, 489 64 C 498 61, 504 92, 510 104',
    morphology:
      'Pozitif basınçlı mekanik ventilasyon sırasında pletismografi tepe amplitüdünün ve bazal hattının solunum döngüsüyle paralel belirgin sinüzoidal dalgalanması (PVI > %14).',
    causes: [
      'Hipovolemi / intravasküler hacim açığı (sıvıya yanıtlı preload bağımlılığı)',
      'Yüksek tidal volüm (> 8 mL/kg) veya yüksek PEEP',
      'Sağ ventrikül preload azalması / tamponad fizyolojisi',
    ],
    action:
      'Sinüs ritmi ve kontrollü mekanik ventilasyon koşulları (VT ≥ 7–8 mL/kg, kapalı göğüs) sağlanıyorsa 250 mL kristalloid bolusu ile sıvı yanıtını değerlendir. Not: PVI otomatik gain (auto-scaling) açık monitörlerde görsel olarak maskelenebilir.',
  },
  {
    id: 'artifact',
    label: 'Hareket / Titreme / Koter Artefaktı',
    badge: 'Geçersiz',
    spo2Display: '84?',
    prDisplay: '138?',
    piDisplay: '--',
    pviDisplay: '--',
    reliability: 'invalid',
    reliabilityText: 'GEÇERSİZ TRASE · EKG ile Senkron Değil!',
    ecgX: [45, 165, 285, 405],
    plethPath:
      'M 10 105 L 22 72 L 31 124 L 40 58 L 52 135 L 61 88 L 73 46 L 82 118 L 93 92 L 104 138 L 116 62 L 128 112 ' +
      'L 139 42 L 151 128 L 163 76 L 172 134 L 184 54 L 195 119 L 207 82 L 218 136 L 231 64 L 243 108 L 254 48 ' +
      'L 266 132 L 278 79 L 289 121 L 301 56 L 314 138 L 326 70 L 338 116 L 350 44 L 363 129 L 376 84 L 388 134 ' +
      'L 401 60 L 414 122 L 426 74 L 438 136 L 451 52 L 463 118 L 476 68 L 489 130 L 500 78 L 510 110',
    morphology:
      'Düzensiz, yüksek frekanslı, kaotik ve keskin köşeli gürültü trasesi. Yeşil EKG R-dalgalarıyla hiçbir zamansal ilişkisi yoktur; cihaz mekanik hareketi nabız sanarak yanlış PR ve yalancı düşük SpO₂ (~%84–88) üretir.',
    causes: [
      'Postoperatif titreme (shivering), Parkinson tremoru, uyanma ajitasyonu',
      'Monopolar elektrokoter (EMI elektromanyetik girişimi)',
      'Hastanın prob takılı elini hareket ettirmesi veya gevşek klips',
    ],
    action:
      'Ekrandaki %84 değerine panikle müdahale etmeden önce hastayı (solunum, renk, kapnografi) kontrol et! Probu sabitle, koter pedi ve kablolarını oksimetre kablosundan uzaklaştır, gerekirse kulak/alın probuna geç.',
  },
  {
    id: 'venous',
    label: 'Venöz Pulsasyon (TR / Sıkı Prob)',
    badge: 'Yalancı ↓',
    spo2Display: '87↓',
    prDisplay: '78',
    piDisplay: '2.4%',
    pviDisplay: '8%',
    reliability: 'caution',
    reliabilityText: 'Venöz Kontaminasyon · Yalancı Düşük SpO₂',
    ecgX: [45, 165, 285, 405],
    plethPath:
      'M 10 128 L 54 128 C 62 128, 68 58, 78 54 C 86 52, 92 84, 100 88 C 108 92, 116 62, 128 66 C 140 70, 152 120, 174 128 ' +
      'C 182 128, 188 58, 198 54 C 206 52, 212 84, 220 88 C 228 92, 236 62, 248 66 C 260 70, 272 120, 294 128 ' +
      'C 302 128, 308 58, 318 54 C 326 52, 332 84, 340 88 C 348 92, 356 62, 368 66 C 380 70, 392 120, 414 128 ' +
      'C 422 128, 428 58, 438 54 C 446 52, 452 84, 460 88 C 468 92, 476 62, 488 66 C 498 70, 504 106, 510 120',
    morphology:
      'Diyastolik kolda alışılmadık biçimde yüksek ikinci bir dalga (çift hörgüçlü / geniş venöz dalga). Pulsatil venöz kan AC bileşenine karıştığı için oksimetre arteriyel + venöz satürasyon ortalamasını okur.',
    causes: [
      'Şiddetli triküspit yetmezliği (yüksek v-dalgası)',
      'Trendelenburg pozisyonunda alın reflektans probunda venöz göllenme',
      'Aşırı sıkı sarılmış yapışkanlı sensör veya AV fistül olan ekstremite',
    ],
    action:
      'Sensörü gevşet veya probu farklı bölgeye (ör. alın yerine parmak/kulak veya karşı el) al. Trendelenburg pozisyonunda alın probu kullanılıyorsa üreticinin hafif kompresyon sağlayan özel elastik kafa bandını uygula.',
  },
];

interface LimitationRow {
  factor: string;
  category: string;
  effect: 'high' | 'low' | 'toward85' | 'loss';
  effectLabel: string;
  mechanism: string;
  remedy: string;
}

const LIMITATION_ROWS: LimitationRow[] = [
  {
    factor: 'Karboksihemoglobin (COHb)',
    category: 'Dishemoglobinemi',
    effect: 'high',
    effectLabel: 'Yalancı Yüksek / Normal ↑',
    mechanism:
      'COHb, 660 nm kırmızı ışığı O₂Hb ile neredeyse aynı oranda emer. %30 COHb’de bile SpO₂ %97–99 görünür.',
    remedy: 'Yangın/duman inhalasyonu veya karbonmonoksit şüphesinde mutlaka CO-oksimetreli kan gazı alın.',
  },
  {
    factor: 'Methemoglobin (MetHb)',
    category: 'Dishemoglobinemi',
    effect: 'toward85',
    effectLabel: '%85’e Kilitlenir (→ %85)',
    mechanism:
      'Hem 660 nm hem 940 nm’de yüksek absorbsiyon yapar → R ≈ 1.0 → SpO₂ ≈ %85 (SaO₂ > %85 ise yalancı düşük, < %85 ise yalancı yüksek).',
    remedy: 'Prilokain, benzokain, nitrat sonrası oksijene yanıtsız ~%85 SpO₂’de CO-oksimetri iste; tedavide Metilen Mavisi (1–2 mg/kg).',
  },
  {
    factor: 'Koyu Cilt Pigmentasyonu (FDA)',
    category: 'Hasta Faktörü',
    effect: 'high',
    effectLabel: 'Yalancı Yüksek (+%2–4 ↑)',
    mechanism:
      'Melanin absorbsiyonu özellikle gerçek SaO₂ < %90 aralığında okült hipoksemi (overestimation) riskini artırır.',
    remedy: 'Sınırda SpO₂ (%90–94) veya solunum sıkıntısında eşiği düşük tutup ABG ile doğrula.',
  },
  {
    factor: 'İntravenöz Boyalar (Metilen Mavisi, ICG)',
    category: 'İlaç / Boya',
    effect: 'low',
    effectLabel: 'Ani Yalancı Düşüş ↓',
    mechanism:
      'Metilen mavisi ~660 nm’de yoğun pik absorbsiyon yapar; enjeksiyon sonrası 5–10 dk boyunca SpO₂’yi %65–70’e çekebilir (ICG ve indigo karmin daha hafif düşürür).',
    remedy: 'Cerrahi/ürolojik boya veriliş zamanını ekip ile teyit et; ventilasyon ve EtCO₂ normalse geçici artefakt olduğunu bil.',
  },
  {
    factor: 'Oje (Mavi, Yeşil, Siyah) & Takma Tırnak',
    category: 'Optik Engel',
    effect: 'low',
    effectLabel: 'Yalancı Düşük (-%2–6 ↓)',
    mechanism:
      'Koyu mavi/yeşil/siyah pigmentler 660 nm kırmızı ışığı absorbe ederek deoksihemoglobin taklidi yapar.',
    remedy: 'Ojeyi sil veya acil durumda probu parmağa 90° yan çevirerek (tırnak yerine lateral pulpadan) tak; alternatif olarak kulak/alın kullan.',
  },
  {
    factor: 'Venöz Pulsasyon (TR, Sıkı Prob, Trendelenburg)',
    category: 'Hemodinamik',
    effect: 'low',
    effectLabel: 'Yalancı Düşük ↓',
    mechanism:
      'Pulsatil venöz kan AC sinyaline eklenir; oksimetre arteriyel + venöz karışım satürasyonunu hesaplar.',
    remedy: 'Sıkı bandı gevşet, probu kalp düzeyine getir veya karşı ekstremite/uygun bölgeye taşı.',
  },
  {
    factor: 'Düşük Perfüzyon, Hipotermi, Vazopresör, NIBP',
    category: 'Perfüzyon',
    effect: 'loss',
    effectLabel: 'Sinyal Kaybı / Gecikme',
    mechanism:
      'Arteriyoler AC nabız dalgası zayıflar (PI < %0.3); cihaz sinyali kaybeder veya santral hipoksemiyi >2 dk geç yansıtır.',
    remedy: 'NIBP manşonunu karşı kola al, ekstremiteyi ısıt, alın (reflektans) veya kulak probuna geç.',
  },
  {
    factor: 'Hareket / Titreme & Elektrokoter (EMI)',
    category: 'Artefakt',
    effect: 'low',
    effectLabel: 'Kaotik / Yalancı ↓',
    mechanism:
      'Rastgele doku hareketi ve elektromanyetik gürültü AC sinyaline biner; R oranı 1.0’a (~%85) kayar.',
    remedy: 'Pletismografi dalgasını ve EKG-PR uyumunu kontrol et; yeni nesil hareket-toleranslı (SET) algoritma ve sabit yerleşim kullan.',
  },
  {
    factor: 'Optik Şant (Penumbra) & Ortam Işığı',
    category: 'Optik Engel',
    effect: 'toward85',
    effectLabel: '%85’e Kayma / Yalancı ↓',
    mechanism:
      'LED ışığının dokudan geçmeden kenardan fotodedektöre sızması veya Xenon/IR lamba ışığı fotodedektörü doyurması.',
    remedy: 'Yaşa uygun prob boyutu seç, tam oturt ve parlak cerrahi lamba altında opak örtüyle kapat.',
  },
  {
    factor: 'Şiddetli Anemi (Hb < 5 g/dL) & Hiperkapni',
    category: 'Fizyolojik Kör Nokta',
    effect: 'high',
    effectLabel: 'Normal Görünebilir (!)',
    mechanism:
      'SpO₂ yalnızca mevcut hemoglobinin % kaçının dolu olduğunu gösterir; düşük CaO₂’yi (anemi) veya yüksek PaCO₂’yi (hipoventilasyon) ölçmez.',
    remedy: 'SpO₂ %100 iken hasta ciddi anemik veya ağır hiperkapnik olabilir — mutlaka Hb, EtCO₂ ve kan gazı ile birlikte değerlendir.',
  },
];

const SECTION_LINKS = [
  { id: 'spo2-sec-1', num: '1', label: 'Fizik & Mekanizma' },
  { id: 'spo2-sec-2', num: '2', label: 'Endikasyonlar' },
  { id: 'spo2-sec-3', num: '3', label: 'Kurulum & Kalibrasyon' },
  { id: 'spo2-sec-4', num: '4', label: 'Dalga Formları' },
  { id: 'spo2-sec-5', num: '5', label: 'Limitasyonlar' },
  { id: 'spo2-sec-6', num: '6', label: 'Komplikasyonlar' },
];

export const PulseOximetryModule: React.FC<PulseOximetryModuleProps> = ({ isDark }) => {
  const [scenarioId, setScenarioId] = useState<PhysicsScenarioId>('normal');
  const [customSat, setCustomSat] = useState<number>(99);
  const [useCustomSlider, setUseCustomSlider] = useState<boolean>(false);
  const [activePlethId, setActivePlethId] = useState<PlethPatternId>('normal');

  const activeScenario =
    PHYSICS_SCENARIOS.find((s) => s.id === scenarioId) ?? PHYSICS_SCENARIOS[0];
  const activePleth =
    PLETH_PATTERNS.find((p) => p.id === activePlethId) ?? PLETH_PATTERNS[0];

  const sliderR = Number((0.4 + ((100 - customSat) / 100) * 2.85).toFixed(2));
  const displayedSpO2 = useCustomSlider ? customSat : activeScenario.displayedSpO2;
  const trueO2Hb = useCustomSlider ? customSat : activeScenario.trueO2Hb;
  const rRatio = useCustomSlider ? sliderR : activeScenario.rRatio;
  const coHb = useCustomSlider ? 0 : activeScenario.coHb;
  const metHb = useCustomSlider ? 0 : activeScenario.metHb;

  const estimatePaO2 = (sat: number): string => {
    if (sat >= 99) return '> 110';
    if (sat >= 97) return '90 – 105';
    if (sat >= 95) return '75 – 85';
    if (sat >= 90) return '~60';
    if (sat >= 85) return '~50';
    if (sat >= 75) return '~40';
    return '< 35';
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cardSurface = isDark
    ? 'bg-slate-900/80 border-slate-800'
    : 'bg-white border-slate-200 shadow-xs';
  const subSurface = isDark
    ? 'bg-slate-800/60 border-slate-700/80'
    : 'bg-slate-50 border-slate-200';
  const diagramBg = isDark
    ? 'bg-slate-950/80 border-slate-800'
    : 'bg-slate-50/90 border-slate-200';

  return (
    <div className="space-y-6">
      {/* Module Hero Banner */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-sky-950/30 to-slate-900 border-sky-500/30'
            : 'bg-gradient-to-br from-sky-50/80 via-white to-cyan-50/50 border-sky-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span
                className={`px-2 py-0.5 rounded ${
                  isDark ? 'bg-sky-500/20 text-sky-300' : 'bg-sky-100 text-sky-800'
                }`}
              >
                ASA Standart II · Oksijenasyon
              </span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                6 Bölümlü Görsel &amp; İnteraktif Monitörizasyon Rehberi
              </span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Pulse Oksimetri (SpO₂ &amp; Fotopletismografi)
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Beer-Lambert spektrofotometrisi ile pulsatil fotopletismografiyi birleştirerek periferik arteriyel fonksiyonel
              oksijen satürasyonunu (<strong className={isDark ? 'text-white' : 'text-slate-900'}>SpO₂</strong>), nabız hızını ve
              perfüzyon kalitesini kesintisiz ve non-invaziv izleyen temel perioperatif güvenlik monitörü.
            </p>
          </div>

          {/* 3 Compact Telemetry Facts */}
          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">Dalga Boyu</div>
              <div className="text-sm font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400 mt-0.5">
                660 / 940 nm
              </div>
              <div className="text-[10px] text-slate-500">Red · Infrared</div>
            </div>
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">İzosbestik</div>
              <div className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                805 nm
              </div>
              <div className="text-[10px] text-slate-500">HHb = O₂Hb</div>
            </div>
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">Kalibrasyon</div>
              <div className="text-sm font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-0.5">
                %70 – %100
              </div>
              <div className="text-[10px] text-slate-500">±%2–3 (SaO₂≥70)</div>
            </div>
          </div>
        </div>

        {/* 6-Section Jump Bar */}
        <div className={`mt-5 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-sky-200/70'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SECTION_LINKS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left text-xs font-semibold transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-700/80 text-slate-200 hover:border-sky-500/60 hover:text-sky-300'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-700'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-sky-500/15 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                  {sec.num}
                </span>
                <span className="truncate">{sec.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BÖLÜM 1: FİZİKSEL PRENSİP VE ÇALIŞMA MEKANİZMASI                      */}
      {/* ===================================================================== */}
      <section id="spo2-sec-1" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-sky-500/15 border-sky-500/30 text-sky-400'
                : 'bg-sky-50 border-sky-200 text-sky-700'
            }`}
          >
            1
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Beer-Lambert Spektrofotometrisi + Pulsatil Fotopletismografi (AC / DC Ayrımı)
            </p>
          </div>
        </div>

        {/* Visual Diagram 1A: Biophysical Cross-Section (LED -> Tissue AC/DC -> Photodetector) */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Optik İletim &amp; AC / DC Doku Absorbsiyon Diyagramı
            </span>
            <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-semibold">
              Beer-Lambert: A = ε · c · L · R = (AC/DC)₆₆₀ / (AC/DC)₉₄₀
            </span>
          </div>

          <svg
            viewBox="0 0 760 220"
            className="w-full h-auto"
            role="img"
            aria-label="Pulse oksimetre LED ışık yolu ve AC/DC doku absorbsiyon şeması"
          >
            {/* LEFT PANEL: LED -> Finger Cross Section -> Photodetector */}
            <rect
              x="12"
              y="10"
              width="340"
              height="200"
              rx="12"
              fill={isDark ? '#0f172a' : '#ffffff'}
              stroke={isDark ? '#1e293b' : '#e2e8f0'}
            />
            <text x="26" y="29" fontSize="10.5" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>
              1. Prob Kesiti (Işık Yolu)
            </text>

            {/* Top LED Housing */}
            <rect x="112" y="38" width="140" height="26" rx="6" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#0ea5e9" strokeWidth="1.2" />
            <circle cx="145" cy="51" r="6" fill="#f43f5e" />
            <text x="157" y="54" fontSize="9" fontWeight="700" fill="#f43f5e" fontFamily="monospace">
              660 nm
            </text>
            <circle cx="206" cy="51" r="6" fill="#6366f1" />
            <text x="218" y="54" fontSize="9" fontWeight="700" fill="#6366f1" fontFamily="monospace">
              940 nm
            </text>

            {/* Light Beams Downward */}
            <line x1="145" y1="64" x2="145" y2="174" stroke="#f43f5e" strokeWidth="2.5" strokeOpacity="0.65" strokeDasharray="4 3" />
            <line x1="206" y1="64" x2="206" y2="174" stroke="#6366f1" strokeWidth="2.5" strokeOpacity="0.65" strokeDasharray="4 3" />

            {/* Finger Outline */}
            <rect
              x="64"
              y="76"
              width="236"
              height="86"
              rx="22"
              fill={isDark ? '#1e293b' : '#fef2f2'}
              stroke={isDark ? '#475569' : '#fca5a5'}
              strokeWidth="1.4"
            />
            {/* Nail Plate */}
            <rect x="108" y="76" width="148" height="10" rx="4" fill={isDark ? '#334155' : '#fecdd3'} />
            <text x="27" y="92" fontSize="9" fill={isDark ? '#94a3b8' : '#64748b'} fontFamily="monospace">
              Tırnak
            </text>

            {/* Pulsatile Arterial Layer (AC) */}
            <path
              d="M 80 105 Q 112 97, 144 105 T 208 105 T 282 105 L 282 121 Q 245 127, 208 121 T 144 121 T 80 121 Z"
              fill="#f43f5e"
              fillOpacity="0.32"
              stroke="#f43f5e"
              strokeWidth="1.3"
            />
            <text x="181" y="116" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#fda4af' : '#be123c'} fontFamily="monospace">
              AC · Pulsatil Arteriyel Kan
            </text>

            {/* Venous + Capillary + Bone Layer (DC) */}
            <rect x="82" y="128" width="198" height="24" rx="7" fill={isDark ? '#0f172a' : '#e0f2fe'} stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />
            <text x="181" y="143" textAnchor="middle" fontSize="9" fontWeight="600" fill={isDark ? '#7dd3fc' : '#0369a1'} fontFamily="monospace">
              DC · Venöz + Kapiller + Doku + Kemik
            </text>

            {/* Bottom Photodetector */}
            <rect x="112" y="174" width="140" height="24" rx="6" fill={isDark ? '#064e3b' : '#ecfdf5'} stroke="#10b981" strokeWidth="1.3" />
            <text x="182" y="189" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#6ee7b7' : '#047857'} fontFamily="monospace">
              Fotodedektör (Alıcı)
            </text>

            {/* Arrow connecting Left to Right */}
            <line x1="358" y1="110" x2="386" y2="110" stroke="#0ea5e9" strokeWidth="2" />
            <polygon points="386,105 396,110 386,115" fill="#0ea5e9" />

            {/* RIGHT PANEL: Stacked Absorbance Over Time (AC riding on DC) */}
            <rect
              x="402"
              y="10"
              width="346"
              height="200"
              rx="12"
              fill={isDark ? '#0f172a' : '#ffffff'}
              stroke={isDark ? '#1e293b' : '#e2e8f0'}
            />
            <text x="418" y="29" fontSize="10.5" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>
              2. Zamanla Toplam Işık Absorbsiyonu (AC vs. DC)
            </text>

            {/* Static DC Bands */}
            <rect x="424" y="160" width="230" height="32" fill={isDark ? '#334155' : '#e2e8f0'} />
            <text x="539" y="179" textAnchor="middle" fontSize="9" fontWeight="600" fill={isDark ? '#cbd5e1' : '#475569'} fontFamily="monospace">
              Doku + Kemik + Cilt Pigmenti (DC)
            </text>

            <rect x="424" y="132" width="230" height="28" fill={isDark ? '#1e3a5f' : '#dbeafe'} />
            <text x="539" y="149" textAnchor="middle" fontSize="9" fontWeight="600" fill={isDark ? '#93c5fd' : '#1d4ed8'} fontFamily="monospace">
              Venöz &amp; Kapiller Kan (DC)
            </text>

            <rect x="424" y="108" width="230" height="24" fill={isDark ? '#4c1d24' : '#ffe4e6'} />
            <text x="539" y="123" textAnchor="middle" fontSize="9" fontWeight="600" fill={isDark ? '#fda4af' : '#be123c'} fontFamily="monospace">
              Non-Pulsatil Arteriyel Kan (DC)
            </text>

            {/* Pulsatile AC Wave on top */}
            <path
              d="M 424 108 L 424 94 C 434 94, 440 50, 452 46 C 462 43, 468 72, 478 76 C 486 78, 492 68, 498 72 C 508 78, 518 94, 534 94 C 544 94, 550 50, 562 46 C 572 43, 578 72, 588 76 C 596 78, 602 68, 608 72 C 618 78, 628 94, 654 94 L 654 108 Z"
              fill="#f43f5e"
              fillOpacity="0.35"
              stroke="#f43f5e"
              strokeWidth="2"
            />

            {/* AC Bracket on Right */}
            <line x1="664" y1="46" x2="674" y2="46" stroke="#f43f5e" strokeWidth="1.5" />
            <line x1="669" y1="46" x2="669" y2="94" stroke="#f43f5e" strokeWidth="1.5" />
            <line x1="664" y1="94" x2="674" y2="94" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="680" y="67" fontSize="10" fontWeight="700" fill="#f43f5e" fontFamily="monospace">
              AC
            </text>
            <text x="680" y="80" fontSize="8.5" fill={isDark ? '#fda4af' : '#be123c'}>
              Pulsatil
            </text>
            <text x="680" y="91" fontSize="8.5" fill={isDark ? '#fda4af' : '#be123c'}>
              (Sistol)
            </text>

            {/* DC Bracket on Right */}
            <line x1="664" y1="108" x2="674" y2="108" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="669" y1="108" x2="669" y2="192" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="664" y1="192" x2="674" y2="192" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="680" y="147" fontSize="10" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">
              DC
            </text>
            <text x="680" y="160" fontSize="8.5" fill={isDark ? '#7dd3fc' : '#0369a1'}>
              Sabit
            </text>
            <text x="680" y="171" fontSize="8.5" fill={isDark ? '#7dd3fc' : '#0369a1'}>
              Taban
            </text>
          </svg>
        </div>

        {/* Two Core Physical Principles Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center justify-between gap-2">
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                A) Beer-Lambert Yasası (Spektrofotometri)
              </h5>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-500/15 text-sky-600 dark:text-sky-400">
                A = ε · c · L
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Bir çözeltiden geçen ışığın absorbsiyonu (<strong>A</strong>); maddenin molar ekstinksiyon katsayısı (<strong>ε</strong>),
              konsantrasyonu (<strong>c</strong>) ve optik yol uzunluğu (<strong>L</strong>) ile doğru orantılıdır:
            </p>
            <ul className={`text-xs space-y-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-rose-500 shrink-0">660 nm (Kırmızı):</span>
                <span><strong>Deoksihemoglobin (HHb)</strong> kırmızı ışığı güçlü biçimde absorbe eder; O₂Hb daha çok geçirir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-indigo-500 shrink-0">940 nm (Kızılötesi):</span>
                <span><strong>Oksihemoglobin (O₂Hb)</strong> kızılötesi ışığı HHb’den daha fazla absorbe eder.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-emerald-500 shrink-0">805 nm (İzosbestik):</span>
                <span>O₂Hb ve HHb absorbsiyon eğrilerinin kesiştiği eşitlik noktasıdır.</span>
              </li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center justify-between gap-2">
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                B) Fotopletismografi (AC / DC &amp; R Oranı)
              </h5>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                R = (AC/DC)₆₆₀ / (AC/DC)₉₄₀
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              AC/DC normalizasyonu sayesinde parmak kalınlığı, cilt rengi ve LED parlaklık farkları elenir:
            </p>
            <ul className={`text-xs space-y-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>DC (Statik):</strong> Cilt, kemik, pigment, venöz ve kapiller kanın sabit absorbsiyonu.
              </li>
              <li>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>AC (Pulsatil):</strong> Yalnızca sistolde arteriyoler genişlemeyle gelen arteriyel kan hacmi.
              </li>
              <li>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>Ampirik Kalibrasyon:</strong>{' '}
                <span className="font-mono">R=0.4 → %100</span>, <span className="font-mono">R=1.0 → %85</span>,{' '}
                <span className="font-mono">R=2.0 → %50</span>, <span className="font-mono">R=3.4 → %0</span>.
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Biophysical Simulator */}
        <div className={`rounded-xl border p-4 sm:p-5 space-y-4 ${diagramBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-500" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                İnteraktif Spektrofotometri &amp; R-Oranı Simülatörü
              </h5>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PHYSICS_SCENARIOS.map((sc) => {
                const isSelected = !useCustomSlider && scenarioId === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      setUseCustomSlider(false);
                      setScenarioId(sc.id);
                      setCustomSat(sc.trueO2Hb);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-500'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-sky-500/50'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-sky-400'
                    }`}
                  >
                    {sc.shortTag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Left: Hemoglobin Extinction Spectrum SVG */}
            <div
              className={`lg:col-span-7 rounded-xl border p-3 sm:p-4 flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] mb-2">
                <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Hemoglobin Işık Absorbsiyon Spektrumu (600 – 1000 nm)
                </span>
                <div className="flex items-center gap-3 font-mono text-[10px]">
                  <span className="flex items-center gap-1 text-rose-500 font-bold">
                    <span className="w-2.5 h-0.5 bg-rose-500 inline-block" /> O₂Hb
                  </span>
                  <span className="flex items-center gap-1 text-sky-500 font-bold">
                    <span className="w-2.5 h-0.5 bg-sky-500 inline-block" /> HHb
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <span className="w-2.5 h-0.5 bg-amber-500 inline-block" /> COHb
                  </span>
                  <span className="flex items-center gap-1 text-purple-500 font-bold">
                    <span className="w-2.5 h-0.5 bg-purple-500 inline-block" /> MetHb
                  </span>
                </div>
              </div>

              <svg viewBox="0 0 460 215" className="w-full h-auto" role="img" aria-label="Hemoglobin ışık absorbsiyon spektrumu">
                {[35, 75, 115, 155, 185].map((y) => (
                  <line
                    key={y}
                    x1="42"
                    y1={y}
                    x2="440"
                    y2={y}
                    stroke={isDark ? '#1e293b' : '#e2e8f0'}
                    strokeWidth="1"
                  />
                ))}

                <line x1="42" y1="20" x2="42" y2="185" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.2" />
                <line x1="42" y1="185" x2="440" y2="185" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.2" />

                <text
                  x="14"
                  y="105"
                  transform="rotate(-90 14 105)"
                  textAnchor="middle"
                  fontSize="9.5"
                  fill={isDark ? '#94a3b8' : '#64748b'}
                  fontFamily="monospace"
                >
                  Absorbans (ε)
                </text>

                {/* 660 nm */}
                <line x1="102" y1="20" x2="102" y2="185" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 3" />
                <rect x="74" y="8" width="56" height="15" rx="4" fill="#f43f5e" fillOpacity="0.16" />
                <text x="102" y="19" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#f43f5e" fontFamily="monospace">
                  660 nm
                </text>

                {/* 805 nm */}
                <line x1="246" y1="20" x2="246" y2="185" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
                <rect x="206" y="8" width="80" height="15" rx="4" fill="#10b981" fillOpacity="0.16" />
                <text x="246" y="19" textAnchor="middle" fontSize="9" fontWeight="700" fill="#10b981" fontFamily="monospace">
                  805 İzosbestik
                </text>

                {/* 940 nm */}
                <line x1="380" y1="20" x2="380" y2="185" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 3" />
                <rect x="352" y="8" width="56" height="15" rx="4" fill="#6366f1" fillOpacity="0.16" />
                <text x="380" y="19" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#6366f1" fontFamily="monospace">
                  940 nm
                </text>

                {/* MetHb */}
                <path
                  d="M 48 40 C 78 36, 98 44, 130 68 C 175 98, 225 104, 285 95 C 335 88, 370 80, 434 74"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth={!useCustomSlider && scenarioId === 'methb' ? '3' : '1.4'}
                  strokeDasharray={!useCustomSlider && scenarioId === 'methb' ? undefined : '4 4'}
                  opacity={!useCustomSlider && scenarioId === 'methb' ? '1' : '0.45'}
                />

                {/* COHb */}
                <path
                  d="M 48 118 C 72 152, 92 166, 128 169 C 185 174, 275 178, 380 180 L 434 181"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={!useCustomSlider && scenarioId === 'cohb' ? '3' : '1.4'}
                  strokeDasharray={!useCustomSlider && scenarioId === 'cohb' ? undefined : '4 4'}
                  opacity={!useCustomSlider && scenarioId === 'cohb' ? '1' : '0.45'}
                />

                {/* HHb */}
                <path
                  d="M 48 48 C 74 52, 96 66, 122 86 C 165 118, 206 130, 246 138 C 292 146, 340 154, 380 156 L 434 158"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="2.6"
                />

                {/* O2Hb */}
                <path
                  d="M 48 122 C 72 154, 92 164, 122 163 C 168 160, 206 148, 246 138 C 295 126, 342 114, 380 108 L 434 102"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.6"
                />

                <circle cx="246" cy="138" r="4" fill="#10b981" stroke={isDark ? '#0f172a' : '#ffffff'} strokeWidth="1.5" />
                <circle cx="102" cy="72" r="3.5" fill="#0ea5e9" />
                <circle cx="102" cy="164" r="3.5" fill="#f43f5e" />
                <circle cx="380" cy="156" r="3.5" fill="#0ea5e9" />
                <circle cx="380" cy="108" r="3.5" fill="#f43f5e" />
                {!useCustomSlider && scenarioId === 'methb' && (
                  <>
                    <circle cx="102" cy="48" r="4.5" fill="#a855f7" />
                    <circle cx="380" cy="79" r="4.5" fill="#a855f7" />
                  </>
                )}
                {!useCustomSlider && scenarioId === 'cohb' && (
                  <circle cx="102" cy="168" r="4.5" fill="#f59e0b" />
                )}

                {[
                  { nm: '600', x: 42 },
                  { nm: '700', x: 142 },
                  { nm: '800', x: 241 },
                  { nm: '900', x: 340 },
                  { nm: '1000 nm', x: 432 },
                ].map((t) => (
                  <text
                    key={t.nm}
                    x={t.x}
                    y="201"
                    textAnchor="middle"
                    fontSize="9.5"
                    fill={isDark ? '#94a3b8' : '#64748b'}
                    fontFamily="monospace"
                  >
                    {t.nm}
                  </text>
                ))}
              </svg>

              <div className={`mt-3 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1.5">
                  <label htmlFor="sao2-sim-slider" className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Serbest SaO₂ Test Kaydırıcısı (Dishemoglobin Yok):
                  </label>
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400 tabular-nums">
                    SaO₂: %{customSat} · Tahmini PaO₂: {estimatePaO2(customSat)} mmHg
                  </span>
                </div>
                <input
                  id="sao2-sim-slider"
                  type="range"
                  min={65}
                  max={100}
                  value={customSat}
                  onChange={(e) => {
                    setUseCustomSlider(true);
                    setCustomSat(Number(e.target.value));
                  }}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Right: Live Monitor Readout vs CO-Oximetry Truth */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3 text-slate-100">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <span>Cihaz Hesaplaması</span>
                  <span>Modülasyon Oranı (R)</span>
                </div>

                <div className="grid grid-cols-3 gap-2 items-end">
                  <div>
                    <div className="text-[10px] font-mono text-sky-400">EKRAN SpO₂</div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-sky-400 leading-none mt-1">
                      {displayedSpO2}
                      <span className="text-sm ml-0.5">%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400">GERÇEK O₂Hb</div>
                    <div
                      className={`text-2xl font-bold font-mono tabular-nums leading-none mt-1 ${
                        Math.abs(displayedSpO2 - trueO2Hb) > 5 ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {trueO2Hb}
                      <span className="text-xs ml-0.5">%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-amber-400">R ORANI</div>
                    <div className="text-2xl font-bold font-mono tabular-nums text-amber-400 leading-none mt-1">
                      {rRatio.toFixed(2)}
                    </div>
                  </div>
                </div>

                {(coHb > 2 || metHb > 2) && (
                  <div className="rounded-lg bg-rose-500/15 border border-rose-500/40 px-3 py-2 text-[11px] font-mono text-rose-300 flex items-center justify-between">
                    <span>CO-Oksimetre Bulgusu:</span>
                    <span className="font-bold">
                      {coHb > 2 ? `COHb %${coHb}` : `MetHb %${metHb}`} · Hata: {displayedSpO2 - trueO2Hb > 0 ? '+' : ''}
                      {displayedSpO2 - trueO2Hb}%
                    </span>
                  </div>
                )}

                {/* Visual R-Ratio Calibration Bar */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>R=0.4 (%100)</span>
                    <span>R=1.0 (%85)</span>
                    <span>R=2.0 (%50)</span>
                  </div>
                  <div className="relative h-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600 overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 w-1.5 bg-white shadow"
                      style={{
                        left: `${Math.min(96, Math.max(2, ((rRatio - 0.4) / 1.6) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`rounded-xl border p-3.5 text-xs leading-relaxed ${
                  !useCustomSlider && activeScenario.warningLevel === 'danger'
                    ? isDark
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                    : !useCustomSlider && activeScenario.warningLevel === 'warn'
                      ? isDark
                        ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                      : isDark
                        ? 'bg-slate-900 border-slate-800 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>{useCustomSlider ? `Serbest SaO₂ (%${customSat}) Yorumu` : activeScenario.label}</span>
                </div>
                <p>
                  {useCustomSlider
                    ? customSat < 70
                      ? 'DİKKAT: %70 altındaki satürasyonlarda cihazlar insan kalibrasyonu yerine ekstrapolasyon kullanır; doğruluk belirgin şekilde azalır.'
                      : customSat <= 90
                        ? 'Oksihemoglobin dissosiyasyon eğrisinin dik bölgesindesiniz (PaO₂ ≤ 60 mmHg). Küçük oksijenasyon kayıpları SpO₂’de sert düşüşe yol açar.'
                        : 'Eğrinin üst platosundasınız. Unutmayın: Yüksek FiO₂ altında apne gelişse bile hiperkapni derinleşirken SpO₂ dakikalarca %98–100 kalabilir!'
                    : activeScenario.clinicalNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: ENDİKASYONLAR VE KLİNİK AMAÇ                                 */}
      {/* ===================================================================== */}
      <section id="spo2-sec-2" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            2
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Endikasyonlar ve Klinik Amaç
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              ASA Standart II Zorunluluğu · Oksihemoglobin Dissosiyasyon Eğrisi &amp; Yanıt Gecikmesi
            </p>
          </div>
        </div>

        {/* Visual Diagram 2A: Oxyhemoglobin Dissociation Curve + Response Lag Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Sigmoid Curve SVG */}
          <div className={`lg:col-span-7 rounded-xl border p-4 ${diagramBg}`}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Oksihemoglobin Dissosiyasyon Eğrisi &amp; “%90 Kritik Omuz”
              </span>
              <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                PaO₂ 60 mmHg ≈ SpO₂ %90
              </span>
            </div>
            <svg viewBox="0 0 460 195" className="w-full h-auto" role="img" aria-label="Oksihemoglobin dissosiyasyon eğrisi">
              {/* Shaded Danger Cliff Zone (< 60 mmHg) */}
              <rect x="44" y="18" width="186" height="147" fill="#f43f5e" fillOpacity={isDark ? '0.10' : '0.07'} />
              {/* Shaded Upper Plateau Zone (60 - 110 mmHg) */}
              <rect x="230" y="18" width="210" height="147" fill="#10b981" fillOpacity={isDark ? '0.09' : '0.06'} />

              {/* Gridlines */}
              {[33, 66, 99, 132, 165].map((y) => (
                <line key={y} x1="44" y1={y} x2="440" y2={y} stroke={isDark ? '#1e293b' : '#e2e8f0'} strokeWidth="1" />
              ))}
              <line x1="44" y1="18" x2="44" y2="165" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.2" />
              <line x1="44" y1="165" x2="440" y2="165" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.2" />

              {/* Y Axis Labels */}
              {[
                { label: '100%', y: 24 },
                { label: '90%', y: 39 },
                { label: '75%', y: 63 },
                { label: '50%', y: 100 },
                { label: '0%', y: 165 },
              ].map((t) => (
                <text key={t.label} x="38" y={t.y + 3} textAnchor="end" fontSize="9" fill={isDark ? '#94a3b8' : '#64748b'} fontFamily="monospace">
                  {t.label}
                </text>
              ))}

              {/* X Axis Labels: PaO2 0..120 -> 44..440 (3.3px per mmHg) */}
              {[
                { label: '0', x: 44 },
                { label: '27 (P50)', x: 133 },
                { label: '40', x: 176 },
                { label: '60', x: 242 },
                { label: '100', x: 374 },
                { label: '120 mmHg', x: 425 },
              ].map((t) => (
                <text key={t.label} x={t.x} y="182" textAnchor="middle" fontSize="9" fill={isDark ? '#94a3b8' : '#64748b'} fontFamily="monospace">
                  {t.label}
                </text>
              ))}

              {/* Reference Lines at PaO2=60 / SpO2=90% */}
              <line x1="242" y1="39" x2="242" y2="165" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="4 3" />
              <line x1="44" y1="39" x2="242" y2="39" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="4 3" />

              {/* Sigmoid Curve */}
              <path
                d="M 44 165 C 76 162, 102 135, 133 100 C 158 72, 170 66, 186 56 C 206 44, 224 41, 242 39 C 285 33, 330 27, 374 25 L 436 24"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Key Physiological Points */}
              <circle cx="133" cy="100" r="4" fill="#6366f1" />
              <text x="142" y="106" fontSize="9" fontWeight="700" fill={isDark ? '#a5b4fc' : '#4338ca'} fontFamily="monospace">
                P₅₀ = 26.8 mmHg
              </text>

              <circle cx="176" cy="63" r="4" fill="#f43f5e" />
              <text x="115" y="61" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#f43f5e" fontFamily="monospace">
                Venöz (40 / %75)
              </text>

              <circle cx="242" cy="39" r="5" fill="#f59e0b" stroke={isDark ? '#0f172a' : '#ffffff'} strokeWidth="1.5" />
              <rect x="249" y="45" width="130" height="28" rx="5" fill={isDark ? '#451a03' : '#fef3c7'} stroke="#f59e0b" strokeWidth="0.9" />
              <text x="314" y="57" textAnchor="middle" fontSize="8.8" fontWeight="700" fill={isDark ? '#fde68a' : '#92400e'}>
                Kritik Omuz (60 / %90)
              </text>
              <text x="314" y="68" textAnchor="middle" fontSize="8" fill={isDark ? '#fcd34d' : '#b45309'}>
                Altında hızla desatüre olur!
              </text>

              <circle cx="374" cy="25" r="4" fill="#10b981" />
              <text x="366" y="17" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#10b981" fontFamily="monospace">
                Düz Plato (PaO₂ 100→60: SpO₂ %98→%90)
              </text>
            </svg>
          </div>

          {/* Desaturation Lag Bar Chart */}
          <div className={`lg:col-span-5 rounded-xl border p-4 flex flex-col justify-between space-y-3 ${diagramBg}`}>
            <div>
              <div className={`text-xs font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Santral Hipoksemiyi Yansıtma Gecikmesi (Lag Time)
              </div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Santral dolaşımdan periferik prob bölgesine kanın ulaşma süresi + cihaz ortalama alma (averaging) penceresi:
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className={isDark ? 'text-emerald-300' : 'text-emerald-700'}>Alın (Reflektans) / Kulak</span>
                  <span className="font-mono font-bold text-emerald-500">15 – 25 sn</span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <div className="h-full w-[22%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className={isDark ? 'text-sky-300' : 'text-sky-700'}>Parmak Ucu (Normotermik)</span>
                  <span className="font-mono font-bold text-sky-500">35 – 60 sn</span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <div className="h-full w-[52%] rounded-full bg-sky-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className={isDark ? 'text-rose-300' : 'text-rose-700'}>Parmak / Ayak (Vazokonstriksiyon)</span>
                  <span className="font-mono font-bold text-rose-500">90 – 150+ sn</span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <div className="h-full w-[94%] rounded-full bg-rose-500" />
                </div>
              </div>
            </div>

            <div
              className={`rounded-lg border p-2.5 text-[11px] leading-relaxed ${
                isDark
                  ? 'bg-amber-950/25 border-amber-500/30 text-amber-200'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <strong>Ventilasyon Monitörü Değildir:</strong> Yüksek FiO₂’de apne geliştiğinde PaCO₂ hızla yükselirken
              SpO₂ dakikalarca %100 kalabilir — ventilasyon her zaman <strong>EtCO₂</strong> ile izlenir.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Klinik Endikasyonlar
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Tüm anestezi uygulamaları:</strong> Genel, rejyonel ve sedasyon (MAC) vakalarının tamamında ASA Standart II gereği zorunludur.</li>
              <li>• <strong>PACU &amp; Hasta Transferi:</strong> Ekstübasyon sonrası erken hipoksemi ve opioid/NMB solunum depresyonu izlemi.</li>
              <li>• <strong>Yenidoğan Tarama:</strong> Preduktal (sağ el) vs. postduktal (ayak) SpO₂ farkı (&gt;%3) ile kritik konjenital kalp hastalığı taraması.</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Activity className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Doğrudan Ölçtüğü Parametreler
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Fonksiyonel SpO₂:</strong> O₂Hb / (O₂Hb + HHb) oranı (2 dalga boylu cihazlar MetHb/COHb’yi paydada göremez).</li>
              <li>• <strong>Nabız Hızı (PR):</strong> Pulsatil arteriyel dalga frekansı — mekanik kardiyak yakalamanın teyidi.</li>
              <li>• <strong>Perfüzyon İndeksi (PI = AC/DC × 100):</strong> %0.02–%20 aralığında periferik arteriyoler pulsatilite göstergesi.</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Zap className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Dolaylı Klinik Kullanımlar
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Sıvı Yanıtlılığı (PVI):</strong> Kontrollü ventilasyonda solunum döngüsü boyunca PI değişimiyle dinamik preload tahmini.</li>
              <li>• <strong>Sempatik Blok Teyidi:</strong> Periferik sinir bloğu veya spinal sonrası PI’da ≥2 kat artış.</li>
              <li>• <strong>Ekstremite Dolaşımı:</strong> Radyal arter kanülasyonu sonrası modifiye Allen doğrulaması, turnike veya aksiller bası tespiti.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: TEKNİK KURULUM VE KALİBRASYON                                */}
      {/* ===================================================================== */}
      <section id="spo2-sec-3" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-teal-500/15 border-teal-500/30 text-teal-400'
                : 'bg-teal-50 border-teal-200 text-teal-700'
            }`}
          >
            3
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Teknik Kurulum ve Kalibrasyon
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Transmisyon vs. Reflektans Optik Geometrisi · Penumbra Hatası · Yatak Başı 3-Adım Doğrulama
            </p>
          </div>
        </div>

        {/* Visual Diagram 3A: Transmission vs Reflectance + Penumbra Error + Contralateral NIBP Rule */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Prob Teknolojileri, Optik Şant (Penumbra) &amp; NIBP Karşı Kol Kuralı
            </span>
            <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
              Doğru Optik Hizalama = Güvenilir SpO₂
            </span>
          </div>

          <svg viewBox="0 0 760 180" className="w-full h-auto" role="img" aria-label="Transmisyon ve reflektans pulse oksimetre prob yerleşim şeması">
            {/* Panel 1: Transmission Probe */}
            <rect x="8" y="8" width="238" height="164" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="20" y="26" fontSize="10" fontWeight="700" fill="#10b981">
              A) Transmisyon (Doğru Yerleşim)
            </text>
            <rect x="88" y="38" width="76" height="18" rx="5" fill="#0ea5e9" fillOpacity="0.2" stroke="#0ea5e9" />
            <text x="126" y="50" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">
              LED (660/940)
            </text>
            <rect x="52" y="66" width="148" height="44" rx="18" fill={isDark ? '#1e293b' : '#fef2f2'} stroke={isDark ? '#475569' : '#fca5a5'} />
            <text x="126" y="91" textAnchor="middle" fontSize="9" fontWeight="600" fill={isDark ? '#cbd5e1' : '#334155'}>
              Parmak / Kulak Dokusu
            </text>
            <line x1="114" y1="56" x2="114" y2="120" stroke="#f43f5e" strokeWidth="2" />
            <line x1="138" y1="56" x2="138" y2="120" stroke="#6366f1" strokeWidth="2" />
            <rect x="88" y="120" width="76" height="18" rx="5" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
            <text x="126" y="132" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981" fontFamily="monospace">
              Fotodedektör
            </text>
            <text x="126" y="158" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#64748b'}>
              LED &amp; Dedektör tam karşılıklı
            </text>

            {/* Panel 2: Reflectance Probe (Forehead) */}
            <rect x="260" y="8" width="238" height="164" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="272" y="26" fontSize="10" fontWeight="700" fill="#0ea5e9">
              B) Reflektans (Alın / Supraorbital)
            </text>
            {/* Side-by-side sensor */}
            <rect x="306" y="42" width="60" height="18" rx="4" fill="#0ea5e9" fillOpacity="0.2" stroke="#0ea5e9" />
            <text x="336" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">
              LED
            </text>
            <rect x="392" y="42" width="60" height="18" rx="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
            <text x="422" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981" fontFamily="monospace">
              Alıcı
            </text>
            {/* Forehead Skin & Skull */}
            <rect x="284" y="62" width="190" height="36" rx="4" fill={isDark ? '#1e293b' : '#fef2f2'} stroke={isDark ? '#475569' : '#fca5a5'} />
            <text x="379" y="81" textAnchor="middle" fontSize="8.5" fill={isDark ? '#fda4af' : '#be123c'}>
              Supraorbital Arteriyel Yatak
            </text>
            <rect x="284" y="98" width="190" height="22" rx="4" fill={isDark ? '#334155' : '#e2e8f0'} />
            <text x="379" y="112" textAnchor="middle" fontSize="8.5" fontWeight="600" fill={isDark ? '#cbd5e1' : '#475569'}>
              Frontal Kemik (Yansıtıcı Yüzey)
            </text>
            {/* Reflected Light Arc */}
            <path d="M 336 60 Q 379 112, 422 60" fill="none" stroke="#f43f5e" strokeWidth="2.2" strokeDasharray="4 2" />
            <polygon points="419,65 424,58 426,66" fill="#f43f5e" />
            <text x="379" y="142" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#64748b'}>
              Şok, hipotermi ve yüksek vazopresörde üstün
            </text>
            <text x="379" y="156" textAnchor="middle" fontSize="8.5" fill="#f59e0b" fontWeight="600">
              Trendelenburg’da özel kafa bandı şart!
            </text>

            {/* Panel 3: Penumbra / Optical Shunt + NIBP Rule */}
            <rect x="512" y="8" width="240" height="164" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#7f1d1d' : '#fecdd3'} />
            <text x="524" y="26" fontSize="10" fontWeight="700" fill="#f43f5e">
              C) Hatalı Yerleşim: Optik Şant
            </text>
            <rect x="594" y="38" width="76" height="16" rx="4" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" />
            <text x="632" y="49" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f43f5e" fontFamily="monospace">
              Gevşek LED
            </text>
            {/* Too small / misaligned finger */}
            <rect x="550" y="68" width="68" height="34" rx="14" fill={isDark ? '#1e293b' : '#fef2f2'} stroke={isDark ? '#475569' : '#fca5a5'} />
            <text x="584" y="88" textAnchor="middle" fontSize="8" fill={isDark ? '#cbd5e1' : '#334155'}>
              Küçük Parmak
            </text>
            {/* Bypassing light ray */}
            <path d="M 642 54 C 668 74, 668 96, 642 114" fill="none" stroke="#f43f5e" strokeWidth="2.2" strokeDasharray="3 2" />
            <text x="698" y="85" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f43f5e">
              Boşluktan
            </text>
            <text x="698" y="96" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f43f5e">
              Sızan Işık!
            </text>
            <rect x="594" y="114" width="76" height="16" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" />
            <text x="632" y="125" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f59e0b" fontFamily="monospace">
              Alıcı (R → 1.0)
            </text>
            <text x="632" y="146" textAnchor="middle" fontSize="8.5" fontWeight="600" fill={isDark ? '#fda4af' : '#be123c'}>
              Penumbra Etkisi → SpO₂ %85’e kayar
            </text>
            <text x="632" y="160" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#64748b'}>
              + Probu NIBP olmayan karşı kola tak!
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Anatomical Placement Table */}
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className={`px-4 py-2.5 border-b flex items-center gap-2 ${subSurface}`}>
              <Wrench className="w-4 h-4 text-teal-500" />
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Anatomik Bölge Seçim Tablosu
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                  <tr>
                    <th className="px-3 py-2 font-semibold">Bölge / Tip</th>
                    <th className="px-3 py-2 font-semibold">En Uygun Klinik Durum</th>
                    <th className="px-3 py-2 font-semibold">Dikkat Noktası</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                  <tr>
                    <td className="px-3 py-2.5 font-semibold">
                      Parmak Ucu (2.–4.)
                      <div className="text-[10px] font-mono text-slate-400">Transmisyon</div>
                    </td>
                    <td className="px-3 py-2.5">Standart erişkin vakalar</td>
                    <td className="px-3 py-2.5">NIBP olmayan karşı kola tak; tırnak üstte, kablo el sırtında sabit.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-semibold">
                      Alın (Supraorbital)
                      <div className="text-[10px] font-mono text-sky-500">Reflektans</div>
                    </td>
                    <td className="px-3 py-2.5">Şok, hipotermi, yüksek vazopresör, ekstremite yanığı</td>
                    <td className="px-3 py-2.5">Kaşın hemen üstü, hafif lateral; Trendelenburg’da venöz göllenmeye karşı özel bant.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-semibold">
                      Kulak Memesi / Burun
                      <div className="text-[10px] font-mono text-slate-400">Transmisyon</div>
                    </td>
                    <td className="px-3 py-2.5">Periferik vazokonstriksiyon, hızlı santral yanıt</td>
                    <td className="px-3 py-2.5">Desatürasyonu parmaktan 15–30 sn erken yakalar; klips bası nekrozuna dikkat.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 font-semibold">
                      El / Ayak Ayası (Wrap)
                      <div className="text-[10px] font-mono text-slate-400">Transmisyon</div>
                    </td>
                    <td className="px-3 py-2.5">Yenidoğan ve küçük bebekler</td>
                    <td className="px-3 py-2.5">LED ve dedektör tam karşılıklı olmalı; optik şantı ve sıkı sarmayı önle.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Calibration & 3-Step Dynamic Verification */}
          <div className="space-y-3">
            <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
              <h5 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Kalibrasyon Prensibi
              </h5>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Pulse oksimetreler <strong>hasta başında sıfırlama (zeroing) veya kullanıcı kalibrasyonu gerektirmez.</strong>{' '}
                Üreticiler cihazları sağlıklı gönüllülerde CO-oksimetre referansıyla <strong>%70–%100 SaO₂</strong> aralığında
                ampirik olarak kalibre eder (RMS doğruluk <strong>±%2–3</strong>).
              </p>
            </div>

            <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal-500" />
                <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Yatak Başı 3 Adımlı Dinamik Sinyal Doğrulama
                </h5>
              </div>
              <ol className={`text-xs space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-teal-500">1.</span>
                  <span>
                    <strong>Pletismografi Kalitesi:</strong> Düzenli, dikrotik çentikli ve parazitsiz dalga formu görülüyor mu?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-teal-500">2.</span>
                  <span>
                    <strong>EKG–PR Eşleşmesi:</strong> Oksimetrenin nabız hızı EKG kalp hızıyla birebir örtüşüyor mu? (Örtüşmüyorsa SpO₂ sayısına güvenme!)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-teal-500">3.</span>
                  <span>
                    <strong>Perfüzyon İndeksi (PI) &amp; İzolasyon:</strong> PI &gt; %1.0 güçlü sinyal; PI &lt; %0.3 düşük perfüzyon. Parlak cerrahi lamba / fototerapi altında probu opak materyalle ört.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: NORMAL VE PATOLOJİK DALGA FORMLARI                           */}
      {/* ===================================================================== */}
      <section id="spo2-sec-4" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
                isDark
                  ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400'
                  : 'bg-cyan-50 border-cyan-200 text-cyan-700'
              }`}
            >
              4
            </div>
            <div>
              <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Normal ve Patolojik Dalga Formları (Pletismografi Analizi)
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Önce Dalga Formu, Sonra Sayı! · 6 İnteraktif Klinik Trase Paterni
              </p>
            </div>
          </div>
          <span
            className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border self-start sm:self-auto ${
              isDark
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                : 'bg-cyan-50 border-cyan-200 text-cyan-800'
            }`}
          >
            Dalga bozuksa sayı geçersizdir
          </span>
        </div>

        {/* Waveform Pattern Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PLETH_PATTERNS.map((pattern) => {
            const selected = pattern.id === activePlethId;
            return (
              <button
                key={pattern.id}
                type="button"
                onClick={() => setActivePlethId(pattern.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selected
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/70 border-slate-700 text-slate-300 hover:border-cyan-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-cyan-400'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <Waves className={`w-3.5 h-3.5 shrink-0 ${selected ? 'text-cyan-100' : 'text-cyan-500'}`} />
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      selected
                        ? 'bg-white/20 text-white'
                        : pattern.reliability === 'invalid'
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                          : pattern.reliability === 'caution'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {pattern.badge}
                  </span>
                </div>
                <div className="text-[11px] font-bold leading-snug">{pattern.label}</div>
              </button>
            );
          })}
        </div>

        {/* Bedside Monitor SVG Screen + Clinical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <span>PLETH (660/940 nm)</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400">EKG R-Ref</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activePleth.reliability === 'invalid'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : activePleth.reliability === 'caution'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {activePleth.reliabilityText}
              </span>
            </div>

            <div className="rounded-xl bg-slate-900/80 border border-slate-800/90 p-2">
              <svg viewBox="0 0 520 165" className="w-full h-auto" role="img" aria-label={activePleth.label}>
                {[30, 60, 90, 120, 145].map((y) => (
                  <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="#1e293b" strokeWidth="1" />
                ))}
                {[65, 130, 195, 260, 325, 390, 455].map((x) => (
                  <line key={x} x1={x} y1="0" x2={x} y2="165" stroke="#1e293b" strokeWidth="1" />
                ))}

                {activePleth.ecgX.map((rx, idx) => (
                  <g key={idx}>
                    <line x1={rx} y1="6" x2={rx} y2="155" stroke="#10b981" strokeOpacity="0.18" strokeDasharray="2 3" />
                    <path
                      d={`M ${rx - 7} 16 L ${rx - 3} 16 L ${rx} 5 L ${rx + 3} 20 L ${rx + 6} 16 L ${rx + 10} 16`}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}

                <path
                  d={activePleth.plethPath}
                  fill="none"
                  stroke={
                    activePleth.reliability === 'invalid'
                      ? '#fb7185'
                      : activePleth.reliability === 'caution'
                        ? '#fbbf24'
                        : '#22d3ee'
                  }
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {activePleth.id === 'normal' && (
                  <g fontFamily="monospace" fontSize="9" fontWeight="700">
                    <circle cx="80" cy="42" r="3.5" fill="#facc15" />
                    <text x="80" y="33" textAnchor="middle" fill="#facc15">
                      Sistolik Tepe
                    </text>

                    <circle cx="108" cy="85" r="3.5" fill="#fb7185" />
                    <text x="148" y="64" textAnchor="middle" fill="#fb7185">
                      Dikrotik Çentik
                    </text>
                    <line x1="111" y1="83" x2="132" y2="68" stroke="#fb7185" strokeWidth="1" />

                    {/* Electro-mechanical Delay Arrow (R to Peak) */}
                    <line x1="165" y1="26" x2="200" y2="26" stroke="#34d399" strokeWidth="1.2" />
                    <text x="183" y="22" textAnchor="middle" fill="#34d399" fontSize="8">
                      ~200 ms
                    </text>

                    <text x="200" y="156" textAnchor="middle" fill="#38bdf8">
                      Anakrotik Kol (Hızlı Çıkış)
                    </text>
                    <text x="366" y="156" textAnchor="middle" fill="#94a3b8">
                      Diyastolik İniş (Runoff)
                    </text>
                  </g>
                )}

                {activePleth.id === 'hypovolemia' && (
                  <path
                    d="M 67 34 Q 152 60, 236 90 T 404 36 Q 450 50, 495 62"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.4"
                    strokeDasharray="5 4"
                  />
                )}
              </svg>
            </div>

            <div className="grid grid-cols-4 gap-2 font-mono">
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-cyan-400">SpO₂ (%)</div>
                <div
                  className={`text-xl font-bold tabular-nums ${
                    activePleth.reliability === 'invalid' ? 'text-rose-400' : 'text-cyan-300'
                  }`}
                >
                  {activePleth.spo2Display}
                </div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-emerald-400">PR (atım/dk)</div>
                <div className="text-xl font-bold tabular-nums text-emerald-300">{activePleth.prDisplay}</div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-amber-400">PI (%)</div>
                <div className="text-xl font-bold tabular-nums text-amber-300">{activePleth.piDisplay}</div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-violet-400">PVI (%)</div>
                <div className="text-xl font-bold tabular-nums text-violet-300">{activePleth.pviDisplay}</div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-5 rounded-2xl border p-4 flex flex-col justify-between space-y-3 ${subSurface}`}>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                  Trase Morfolojisi
                </div>
                <h5 className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activePleth.label}
                </h5>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {activePleth.morphology}
                </p>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                  Başlıca Klinik Nedenler
                </div>
                <ul className={`text-xs space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {activePleth.causes.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-500 font-bold">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className={`rounded-xl border p-3 text-xs leading-relaxed ${
                activePleth.reliability === 'invalid'
                  ? isDark
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                  : isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="font-bold text-[11px] uppercase tracking-wider mb-1 text-cyan-600 dark:text-cyan-400">
                Anestezist Aksiyonu
              </div>
              <p>{activePleth.action}</p>
            </div>
          </div>
        </div>

        {/* 4 Anatomical Phases Visual Mini Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              step: 'Faz 1',
              title: 'Anakrotik Kol',
              desc: 'Sol ventrikül ejeksiyonuyla arteriyoler kan hacminin ani sistolik artışı.',
              accent: 'text-sky-600 dark:text-sky-400',
            },
            {
              step: 'Faz 2',
              title: 'Sistolik Tepe',
              desc: 'Maksimal arteriyel genişleme; EKG R-dalgasından ~180–220 ms sonra oluşur.',
              accent: 'text-amber-600 dark:text-amber-400',
            },
            {
              step: 'Faz 3',
              title: 'Dikrotik Çentik',
              desc: 'Aort kapağı kapanması ve periferik dalga yansıması; SVR arttıkça yukarı, düştükçe aşağı iner.',
              accent: 'text-rose-600 dark:text-rose-400',
            },
            {
              step: 'Faz 4',
              title: 'Katakrotik İniş',
              desc: 'Diyastolik arteriyoler boşalma (runoff); bazal hatta pürüzsüz dönüş.',
              accent: 'text-emerald-600 dark:text-emerald-400',
            },
          ].map((phase) => (
            <div key={phase.step} className={`rounded-xl border p-3 ${subSurface}`}>
              <div className={`text-[10px] font-mono font-bold uppercase ${phase.accent}`}>{phase.step}</div>
              <div className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{phase.title}</div>
              <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 5: LİMİTASYONLAR VE ARTEFAKTLAR                                 */}
      {/* ===================================================================== */}
      <section id="spo2-sec-5" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}
          >
            5
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Limitasyonlar ve Artefaktlar (Yanlış Okuma Matrisi)
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              SpO₂ Sapma Pusulası · Cihazın Yalancı Yüksek, Yalancı Düşük veya %85’e Kilitlendiği Durumlar
            </p>
          </div>
        </div>

        {/* Visual Diagram 5A: SpO2 Error Deviation Compass SVG */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Görsel SpO₂ Sapma Pusulası (Hızlı Akılda Tutma Haritası)
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Gerçek SaO₂’ye Göre Monitör Hatasının Yönü
            </span>
          </div>

          <svg viewBox="0 0 760 148" className="w-full h-auto" role="img" aria-label="SpO2 yanlış okuma yön haritası">
            {/* 3 Colored Zones */}
            {/* Left: False Low */}
            <rect x="10" y="14" width="244" height="122" rx="10" fill="#f59e0b" fillOpacity={isDark ? '0.12' : '0.09'} stroke="#f59e0b" strokeOpacity="0.45" />
            <text x="132" y="34" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={isDark ? '#fbbf24' : '#b45309'} fontFamily="monospace">
              ← YALANCI DÜŞÜK (↓)
            </text>
            <text x="24" y="55" fontSize="9.5" fill={isDark ? '#fde68a' : '#78350f'}>• Metilen Mavisi (en şiddetli, ~%65)</text>
            <text x="24" y="72" fontSize="9.5" fill={isDark ? '#fde68a' : '#78350f'}>• İndigosiyan Yeşili (ICG) / İndigo Karmin</text>
            <text x="24" y="89" fontSize="9.5" fill={isDark ? '#fde68a' : '#78350f'}>• Koyu Oje (Mavi, Yeşil, Siyah)</text>
            <text x="24" y="106" fontSize="9.5" fill={isDark ? '#fde68a' : '#78350f'}>• Venöz Pulsasyon (TR / Sıkı Prob)</text>
            <text x="24" y="123" fontSize="9.5" fill={isDark ? '#fde68a' : '#78350f'}>• Hareket / Titreme / Elektrokoter</text>

            {/* Center: Lock to 85% */}
            <rect x="266" y="14" width="228" height="122" rx="10" fill="#a855f7" fillOpacity={isDark ? '0.14' : '0.09'} stroke="#a855f7" strokeOpacity="0.5" />
            <text x="380" y="34" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={isDark ? '#d8b4fe' : '#7e22ce'} fontFamily="monospace">
              %85’E KİLİTLENİR (R → 1.0)
            </text>
            <text x="280" y="58" fontSize="9.5" fontWeight="700" fill={isDark ? '#e9d5ff' : '#581c87'}>• Methemoglobinemi (MetHb)</text>
            <text x="288" y="73" fontSize="8.8" fill={isDark ? '#d8b4fe' : '#6b21a8'}>Prilokain, Benzokain, Nitratlar</text>
            <text x="280" y="94" fontSize="9.5" fontWeight="700" fill={isDark ? '#e9d5ff' : '#581c87'}>• Optik Şant (Penumbra)</text>
            <text x="288" y="109" fontSize="8.8" fill={isDark ? '#d8b4fe' : '#6b21a8'}>Işık dokuyu bypass eder → R≈1.0</text>
            <text x="380" y="127" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill={isDark ? '#c084fc' : '#7e22ce'}>
              O₂ ile düzelmeyen %85 = MetHb düşün!
            </text>

            {/* Right: False High / Normal */}
            <rect x="506" y="14" width="244" height="122" rx="10" fill="#f43f5e" fillOpacity={isDark ? '0.13' : '0.08'} stroke="#f43f5e" strokeOpacity="0.5" />
            <text x="628" y="34" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={isDark ? '#fda4af' : '#be123c'} fontFamily="monospace">
              YALANCI YÜKSEK / NORMAL (↑) →
            </text>
            <text x="520" y="55" fontSize="9.5" fontWeight="700" fill={isDark ? '#fecdd3' : '#881337'}>• Karboksihemoglobin (COHb)</text>
            <text x="528" y="69" fontSize="8.5" fill={isDark ? '#fda4af' : '#9f1239'}>%30 COHb’de bile SpO₂ %98–99!</text>
            <text x="520" y="88" fontSize="9.5" fill={isDark ? '#fecdd3' : '#881337'}>• Koyu Cilt Pigmentasyonu (FDA +2–4%)</text>
            <text x="520" y="106" fontSize="9.5" fill={isDark ? '#fecdd3' : '#881337'}>• Şiddetli Anemi (Hb &lt;5, SpO₂ %100)</text>
            <text x="520" y="123" fontSize="9.5" fill={isDark ? '#fecdd3' : '#881337'}>• Yüksek FiO₂’de Hiperkapni / Apne</text>
          </svg>
        </div>

        <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className={isDark ? 'bg-slate-800/90 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                <tr>
                  <th className="px-3.5 py-2.5 font-semibold">Faktör / Durum</th>
                  <th className="px-3.5 py-2.5 font-semibold">SpO₂ Etkisi</th>
                  <th className="px-3.5 py-2.5 font-semibold">Fizyolojik / Optik Mekanizma</th>
                  <th className="px-3.5 py-2.5 font-semibold">Klinik Çözüm</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                {LIMITATION_ROWS.map((row, idx) => (
                  <tr key={idx} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'}>
                    <td className="px-3.5 py-3 align-top">
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.factor}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{row.category}</div>
                    </td>
                    <td className="px-3.5 py-3 align-top whitespace-nowrap">
                      <span
                        className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                          row.effect === 'high'
                            ? 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30'
                            : row.effect === 'toward85'
                              ? 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30'
                              : row.effect === 'low'
                                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                                : 'bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30'
                        }`}
                      >
                        {row.effectLabel}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 align-top leading-relaxed max-w-xs">{row.mechanism}</td>
                    <td className="px-3.5 py-3 align-top leading-relaxed max-w-xs">{row.remedy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`rounded-xl border p-3.5 text-xs ${subSurface}`}>
          <strong className={isDark ? 'text-white' : 'text-slate-900'}>Sık Sorulan Sınav / Klinik Notu (HbF &amp; Bilirubin):</strong>{' '}
          <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
            <strong>Fetal hemoglobin (HbF)</strong> ve <strong>hiperbilirubinemi</strong> 660/940 nm dalga boylarında O₂Hb/HHb
            absorbsiyon oranını klinik olarak anlamlı düzeyde bozmaz.
          </span>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 6: KOMPLİKASYONLAR VE GÜVENLİK                                  */}
      {/* ===================================================================== */}
      <section id="spo2-sec-6" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                : 'bg-rose-50 border-rose-200 text-rose-700'
            }`}
          >
            6
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Komplikasyonlar ve Güvenlik
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Görsel Güvenlik Protokolü · MRG Kablo İlmek Yasağı · 2–4 Saat Rotasyon · Pitch Modülasyonu
            </p>
          </div>
        </div>

        {/* Visual Diagram 6A: 3-Panel Visual Safety Strip */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <svg viewBox="0 0 760 138" className="w-full h-auto" role="img" aria-label="Pulse oksimetri güvenlik şemaları: MRI kablo kuralı, 2-4 saat rotasyon ve değişken perdeli ses">
            {/* Safety Visual 1: MRI Cable Loop Burn Hazard */}
            <rect x="8" y="8" width="238" height="122" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#7f1d1d' : '#fecdd3'} />
            <text x="20" y="26" fontSize="9.8" fontWeight="700" fill="#f43f5e">
              1. MRG İndüksiyon Yanığı Kuralı
            </text>
            {/* Bad Loop */}
            <path d="M 28 74 C 48 44, 82 44, 82 68 C 82 88, 52 88, 56 64 C 60 46, 94 54, 110 74" fill="none" stroke="#f43f5e" strokeWidth="2.4" />
            <line x1="36" y1="44" x2="96" y2="90" stroke="#f43f5e" strokeWidth="2" />
            <text x="68" y="105" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f43f5e">
              Metal / İlmek = YANIK
            </text>
            {/* Good Straight Fiberoptic */}
            <line x1="138" y1="68" x2="226" y2="68" stroke="#10b981" strokeWidth="2.8" />
            <circle cx="226" cy="68" r="5" fill="#10b981" />
            <text x="182" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981">
              Düz Hat (Loop Yok)
            </text>
            <text x="182" y="105" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981">
              Fiberoptik MR-Uyumlu ✓
            </text>
            <text x="127" y="121" textAnchor="middle" fontSize="8" fill={isDark ? '#94a3b8' : '#64748b'}>
              Kablo hasta cildine temas ettirilmez
            </text>

            {/* Safety Visual 2: 2-4 Hour Site Rotation */}
            <rect x="260" y="8" width="238" height="122" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="272" y="26" fontSize="9.8" fontWeight="700" fill="#f59e0b">
              2. Bası &amp; Termal Yanık Rotasyonu
            </text>
            <circle cx="322" cy="74" r="28" fill="none" stroke={isDark ? '#334155' : '#e2e8f0'} strokeWidth="5" />
            <path d="M 322 46 A 28 28 0 0 1 350 74" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
            <text x="322" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="#f59e0b" fontFamily="monospace">
              2–4 sa
            </text>
            <text x="322" y="84" textAnchor="middle" fontSize="7.5" fill={isDark ? '#94a3b8' : '#64748b'}>
              Yer Değiştir
            </text>
            <text x="364" y="56" fontSize="8.5" fontWeight="600" fill={isDark ? '#e2e8f0' : '#334155'}>• Uzun ameliyat / YBÜ</text>
            <text x="364" y="72" fontSize="8.5" fontWeight="600" fill={isDark ? '#e2e8f0' : '#334155'}>• Prematüre / Yenidoğan</text>
            <text x="364" y="88" fontSize="8.5" fontWeight="600" fill={isDark ? '#e2e8f0' : '#334155'}>• Diyabet / Vazopresör</text>
            <text x="364" y="106" fontSize="8.5" fontWeight="700" fill="#10b981">• Orijinal uyumlu sensör</text>

            {/* Safety Visual 3: Variable Pitch Pulse Tone */}
            <rect x="512" y="8" width="240" height="122" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="524" y="26" fontSize="9.8" fontWeight="700" fill="#0ea5e9">
              3. Değişken Perdeli Ses (ASA Std II)
            </text>
            {/* Pitch bars dropping from 99% to 85% */}
            <rect x="534" y="42" width="38" height="52" rx="4" fill="#10b981" fillOpacity="0.25" stroke="#10b981" />
            <text x="553" y="64" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#10b981" fontFamily="monospace">99%</text>
            <text x="553" y="80" textAnchor="middle" fontSize="8" fill={isDark ? '#a7f3d0' : '#047857'}>Tiz Ton</text>

            <rect x="586" y="54" width="38" height="40" rx="4" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" />
            <text x="605" y="72" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#f59e0b" fontFamily="monospace">92%</text>
            <text x="605" y="86" textAnchor="middle" fontSize="8" fill={isDark ? '#fde68a' : '#b45309'}>Orta</text>

            <rect x="638" y="68" width="38" height="26" rx="4" fill="#f43f5e" fillOpacity="0.25" stroke="#f43f5e" />
            <text x="657" y="85" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#f43f5e" fontFamily="monospace">85%</text>

            <rect x="688" y="46" width="52" height="48" rx="6" fill="#f43f5e" fillOpacity="0.16" stroke="#f43f5e" strokeDasharray="3 2" />
            <text x="714" y="65" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f43f5e" fontFamily="monospace">ALARM</text>
            <text x="714" y="80" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f43f5e" fontFamily="monospace">≤90–92%</text>

            <text x="632" y="116" textAnchor="middle" fontSize="8.3" fill={isDark ? '#94a3b8' : '#64748b'}>
              Ekrana bakmadan ses tonundan desatürasyonu duy!
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Termal Yanık &amp; Bası İskemisi
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Aynı bölgede uzun süre bırakılan problar (özellikle yenidoğan/prematüre, düşük perfüzyon, diyabetik nöropati
              veya periferik arter hastalığında) kapiller bası nekrozuna yol açabilir. Hasarlı kablolar veya farklı marka
              uyumsuz sensör-monitör eşleşmeleri LED aşırı ısınmasıyla <strong>2.–3. derece cilt yanığına</strong> neden olabilir.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Uzun vakalarda ve YBÜ’de prob yerini her 2–4 saatte bir değiştir; yalnızca onaylı uyumlu sensör kullan.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                MRG (MRI) İndüksiyon Yanığı — Kritik Risk
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Standart metal iletkenli kablolu pulse oksimetre sensörleri MRG radyo-frekans alanında indüklenen akımla
              saniyeler içinde <strong>ağır parmak ve cilt yanıklarına</strong> yol açar.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: MRG’de yalnızca fiberoptik MR-uyumlu (MR-conditional) prob kullan; kabloyu asla ilmek (loop) yapma ve hasta cildine temas ettirme.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Activity className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Alarm Yorgunluğu &amp; Nabız Sesi (Pitch) Disiplini
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Sık yalancı alarmlar (hareket, gevşek klips, aynı kolda NIBP) ekibin alarm sesini kısmasına veya eşiği tehlikeli
              biçimde aşağı çekmesine neden olur. ASA Standart II gereği <strong>değişken perdeli nabız sesi</strong> ve{' '}
              <strong>düşük SpO₂ alarmı</strong> ameliyathanede mutlaka duyulabilir düzeyde açık olmalıdır.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Erişkinde alt alarm eşiğini genellikle %90–92’de tut (KOAH / siyanotik kalp hastalığında bireyselleştir); nabız tonunu kapatma.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Cilt Sıyrılması (MARSI) &amp; Çapraz Enfeksiyon
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Prematüre yenidoğanlarda ve frajil yaşlı cildinde yapışkanlı tek kullanımlık sensörlerin hızlı sökülmesi
              epidermal sıyrılmaya (MARSI) yol açabilir. Yeniden kullanılabilir klips problar ise dezenfekte edilmezse
              nozokomiyal patojen (MRSA, VRE) vektörüne dönüşür.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Klips probları her vaka sonrası dezenfekte et; frajil ciltte köpük/non-adeziv sargılı sensör tercih et.
            </div>
          </div>
        </div>
      </section>

      {/* References Footer */}
      <div
        className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-start gap-3 text-xs ${
          isDark ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <BookOpen className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Klinik Referanslar
          </div>
          <p className="leading-relaxed">
            1. Miller’s Anesthesia (9th/10th Ed.) — Respiratory Monitoring &amp; Pulse Oximetry. • 2. Butterworth JF, Mackey DC, Wasnick JD.{' '}
            <em>Morgan &amp; Mikhail’s Clinical Anesthesiology</em> (7th Ed.). • 3. Jubran A. Pulse oximetry. <em>Crit Care</em>. 2015;19:272. •
            4. ASA Standards for Basic Anesthetic Monitoring (Reaffirmed Dec 2020). • 5. U.S. FDA Safety Communication: Pulse Oximeter Accuracy and Limitations (Skin Pigmentation &amp; Occult Hypoxemia).
          </p>
        </div>
      </div>
    </div>
  );
};
