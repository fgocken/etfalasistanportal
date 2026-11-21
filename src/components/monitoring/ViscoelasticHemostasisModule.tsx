import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FlaskConical,
  Layers,
  ShieldAlert,
  Stethoscope,
  TestTube2,
} from 'lucide-react';

interface ViscoelasticHemostasisModuleProps {
  isDark: boolean;
}

interface ParamEquivRow {
  phase: string;
  rotemParam: string;
  rotemNormal: string;
  tegParam: string;
  tegNormal: string;
  clinicalMeaning: string;
}

type AnatomyFocusId = 'all' | 'ct-r' | 'cft-k' | 'alpha' | 'a5-a10' | 'mcf-ma' | 'lysis';

interface AnatomyParamDetail {
  id: Exclude<AnatomyFocusId, 'all'>;
  shortRotem: string;
  shortTeg: string;
  phase: string;
  geometryDef: string;
  biology: string;
  normalRange: string;
  abnormalMeaning: string;
  colorHex: string;
}

const ANATOMY_PARAM_DETAILS: AnatomyParamDetail[] = [
  {
    id: 'ct-r',
    shortRotem: 'CT',
    shortTeg: 'R',
    phase: '1. İnisiyasyon (Başlangıç)',
    geometryDef: 'Test başlangıcından (0 mm) ilk belirgin fibrin oluşumu olan 2 mm amplitüde kadar geçen düz çizgi süresi.',
    biology: 'Koagülasyon faktörlerinin aktivasyonu ve ilk trombin üretimi.',
    normalRange: 'ROTEM EXTEM CT: 38–79 sn (INTEM: 100–240 sn) · TEG CK R: 4–8 dk',
    abnormalMeaning: 'Uzama → Faktör eksikliği (TDP / 4F-PCC), heparin (HEPTEM/CKH ile kontrol) veya antikoagülan (VKA/DOAK).',
    colorHex: '#8b5cf6',
  },
  {
    id: 'cft-k',
    shortRotem: 'CFT',
    shortTeg: 'K',
    phase: '2. Amplifikasyon (Kinetik)',
    geometryDef: 'Pıhtı amplitüdünün 2 mm’den 20 mm’ye yükselmesi için geçen süre.',
    biology: 'Fibrin polimerizasyonu ve trombositlerin fibrin ağına ilk tutunma hızı.',
    normalRange: 'ROTEM EXTEM CFT: 34–159 sn · TEG K: 1–3 dk',
    abnormalMeaning: 'Uzama → Hipofibrinojenemi (en sık) veya ağır trombositopeni. Fibrinojen düşükse CFT/K hiç 20 mm’ye ulaşamayabilir.',
    colorHex: '#f59e0b',
  },
  {
    id: 'alpha',
    shortRotem: 'α-Açısı',
    shortTeg: 'α-Açısı',
    phase: '2. Amplifikasyon (Hız Eğimi)',
    geometryDef: '2 mm ayrılma noktasından yükselen eğriye çizilen teğetin yatay eksenle yaptığı açı.',
    biology: 'Fibrin oluşum ve çapraz bağlanma (Faktör XIII) hızı; pıhtının büyüme ivmesi.',
    normalRange: 'ROTEM EXTEM α: 63–83° · TEG α: 55–78°',
    abnormalMeaning: 'Daralma (düşük açı) → Fibrinojen eksikliği veya trombosit disfonksiyonu (Fibrinojen / Kriyopresipitat düşün).',
    colorHex: '#ec4899',
  },
  {
    id: 'a5-a10',
    shortRotem: 'A5 · A10',
    shortTeg: 'Erken Amplitüd',
    phase: '3. Erken Pıhtı Sertliği',
    geometryDef: 'CT’den sonraki 5. (A5) ve 10. (A10) dakikalardaki pıhtı genişliği (mm).',
    biology: 'MCF’nin (nihai pıhtı gücünün) erken öngörücüsü — Görlinger A5 algoritmasının temeli.',
    normalRange: 'ROTEM EXTEM A5 ≥ 35 mm · FIBTEM A5 ≥ 10 mm (Obstetrikte ≥ 12 mm)',
    abnormalMeaning: 'MCF beklenmeden 5. dakikada hızlı karar sağlar: FIBTEM A5 < 10 → Fibrinojen; FIBTEM normal + EXTEM A5 < 35 → Trombosit.',
    colorHex: '#06b6d4',
  },
  {
    id: 'mcf-ma',
    shortRotem: 'MCF',
    shortTeg: 'MA',
    phase: '3. Maksimum Pıhtı Gücü',
    geometryDef: 'Eğrinin üst ve alt kolları arasındaki en geniş toplam düşey mesafe (mm).',
    biology: 'Nihai pıhtı sertliği: yaklaşık %80 trombosit (GP IIb/IIIa + sayı) + %20 fibrin ağı ve Faktör XIII.',
    normalRange: 'ROTEM EXTEM MCF: 50–72 mm (FIBTEM: 9–25 mm) · TEG CK MA: 55–73 mm (CFF: 15–32 mm)',
    abnormalMeaning: 'Düşük MCF/MA → Önce FIBTEM/CFF’ye bak: ikisi de düşükse Fibrinojen, yalnızca ana kanal düşükse Trombosit.',
    colorHex: '#10b981',
  },
  {
    id: 'lysis',
    shortRotem: 'LI30 · ML',
    shortTeg: 'LY30',
    phase: '4. Fibrinoliz (Pıhtı Stabilitesi)',
    geometryDef: 'TEG LY30: MA’dan 30 dk sonraki amplitüd kaybı (%). ROTEM LI30: CT’den 30 dk sonra kalan pıhtı (%). ML: Maksimum erime (%).',
    biology: 'Plazmin aracılı fibrin yıkımı ve pıhtı stabilitesi dengesi.',
    normalRange: 'ROTEM ML < %15 · LI30 > %85 · TEG LY30 < %3 (travma eşiği) – %8',
    abnormalMeaning: 'Eğrinin hızla daralması ("kalem ucu / ters damla") → Akut hiperfibrinoliz → Acil Traneksamik Asit (TXA) + APTEM doğrulaması.',
    colorHex: '#f43f5e',
  },
];

const PARAM_EQUIV_TABLE: ParamEquivRow[] = [
  {
    phase: '1. Pıhtı Başlaması (İnisiyasyon)',
    rotemParam: 'CT (Clotting Time)',
    rotemNormal: 'EXTEM 38–79 sn · INTEM 100–240 sn',
    tegParam: 'R (Reaction Time)',
    tegNormal: 'Kaolin 4–8 dk (TEG 6s CK: 4.6–9.1 dk)',
    clinicalMeaning: 'İlk fibrin (2 mm) oluşumuna kadar geçen süre. Uzama: koagülasyon faktör eksikliği, heparin veya antikoagülan (VKA/DOAK).',
  },
  {
    phase: '2. Pıhtı Kinetiği (Amplifikasyon)',
    rotemParam: 'CFT · α Açısı',
    rotemNormal: 'EXTEM CFT 34–159 sn · α 63–83°',
    tegParam: 'K · α Açısı',
    tegNormal: 'K 1–3 dk · α 55–78°',
    clinicalMeaning: '2 mm’den 20 mm sertliğe ulaşma hızı. Fibrinojen düzeyi ve trombositlerin fibrin ağına bağlanma hızını yansıtır.',
  },
  {
    phase: '3. Erken Pıhtı Sertliği (5–10 dk)',
    rotemParam: 'A5 · A10',
    rotemNormal: 'EXTEM A5 ≥ 35 mm · FIBTEM A5 ≥ 10 mm',
    tegParam: 'Erken Amplitüd / CFF',
    tegNormal: 'Hızlı protokolde CFF MA ≥ 14–15 mm',
    clinicalMeaning: 'Görlinger A5 algoritması: MCF beklenmeden 5. dakikada fibrinojen ve trombosit tedavi kararını vermeyi sağlar.',
  },
  {
    phase: '4. Maksimum Pıhtı Sertliği',
    rotemParam: 'MCF (Max Clot Firmness)',
    rotemNormal: 'EXTEM 50–72 mm · FIBTEM 9–25 mm',
    tegParam: 'MA (Maximum Amplitude)',
    tegNormal: 'CK MA 55–73 mm · CFF MA 15–32 mm',
    clinicalMeaning: 'Nihai pıhtı gücü (~%80 trombosit, ~%20 fibrin + Faktör XIII). Düşük MCF/MA’da nedenin fibrin mi trombosit mi olduğunu FIBTEM/CFF ayırır.',
  },
  {
    phase: '5. Fibrinoliz (Pıhtı Erimesi)',
    rotemParam: 'ML · LI30',
    rotemNormal: 'ML < %15 · LI30 > %85',
    tegParam: 'LY30',
    tegNormal: 'LY30 < %3 (travma eşiği) – %8',
    clinicalMeaning: 'MCF/MA’dan sonraki pıhtı çözünme yüzdesi. ML > %15 veya LY30 > %3 hiperfibrinolizdir (APTEM ile doğrulanır).',
  },
];

interface TracePattern {
  id: string;
  label: string;
  severity: 'optimal' | 'warning' | 'critical';
  rotemReadout: {
    extemCt: string;
    extemA5: string;
    fibtemA5: string;
    ml: string;
    extraChannel?: string;
  };
  tegReadout: {
    r: string;
    alpha: string;
    ma: string;
    cffMa: string;
    ly30: string;
  };
  // Geometry parameters for symmetric viscoelastic trace rendering
  delayX: number; // onset position (clotting time)
  rampW: number; // slope width (CFT / K)
  maxAmp: number; // main channel half-height (0..44)
  fibAmp: number; // FIBTEM/CFF half-height (0..26)
  lysisDecay: number; // 0 = none, 0.85 = severe lysis
  category: 'core' | 'cpb-drug' | 'special';
  clinicalContext: string;
  topChannelLabel?: {
    rotem: string;
    teg: string;
  };
  secondaryCompare?: {
    label: string;
    delayX: number;
    maxAmp: number;
    lysisDecay: number;
    isAbnormal?: boolean;
  };
  diagnosis: string;
  targetedTherapy: string;
  clinicalNote: string;
}

const TRACE_PATTERNS: TracePattern[] = [
  {
    id: 'normal',
    label: '1. Normal Hemostaz',
    severity: 'optimal',
    category: 'core',
    clinicalContext: 'Dengeli hemostaz / Cerrahi kanama ayrımı',
    rotemReadout: { extemCt: '58 sn', extemA5: '48 mm', fibtemA5: '14 mm', ml: '%4' },
    tegReadout: { r: '6.2 dk', alpha: '66°', ma: '63 mm', cffMa: '21 mm', ly30: '%1.2' },
    delayX: 48,
    rampW: 42,
    maxAmp: 31,
    fibAmp: 14,
    lysisDecay: 0.05,
    diagnosis: 'Normal Viskoelastik Profil (Koagülopati Dışlandı)',
    targetedTherapy: 'Kan ürünü / faktör gerekmez — aktif kanama sürüyorsa CERRAHİ KANAMA ODAĞI ara!',
    clinicalNote:
      'Normal ROTEM/TEG’in negatif prediktif değeri çok yüksektir. Ancak standart kanalların Aspirin/Klopidogrel, vWD ve hipotermiyi görmediğini unutmayın.',
  },
  {
    id: 'hypofibrinogenemia',
    label: '2. Fibrinojen Eksikliği',
    severity: 'critical',
    category: 'core',
    clinicalContext: 'Masif kanamada ilk tükenen faktör',
    rotemReadout: { extemCt: '86 sn (ikincil ↑)', extemA5: '26 mm ↓', fibtemA5: '5 mm ↓↓', ml: '%5' },
    tegReadout: { r: '8.4 dk', alpha: '42° ↓', ma: '44 mm ↓', cffMa: '8 mm ↓↓', ly30: '%1.0' },
    delayX: 66,
    rampW: 72,
    maxAmp: 18,
    fibAmp: 4.5,
    lysisDecay: 0.06,
    diagnosis: 'Hipofibrinojenemi (Masif Kanamada İLK Tükenen Faktör!)',
    targetedTherapy: 'Fibrinojen Konsantresi 2–4 g IV (25–50 mg/kg) VEYA Kriyopresipitat 10 Ü (2 havuz).',
    clinicalNote:
      'Ağır fibrinojen eksikliğinde EXTEM CT de ikincil olarak uzayabilir. Önce fibrinojeni düzeltin; FIBTEM A5 ≥ 10 mm (obstetrikte ≥ 12 mm) olduktan sonra CT’yi yeniden değerlendirin.',
  },
  {
    id: 'thrombocytopenia',
    label: '3. Trombosit Eksikliği',
    severity: 'critical',
    category: 'core',
    clinicalContext: 'FIBTEM normal iken ana kanal dar',
    rotemReadout: { extemCt: '62 sn', extemA5: '25 mm ↓', fibtemA5: '13 mm (Normal)', ml: '%4' },
    tegReadout: { r: '6.5 dk', alpha: '54°', ma: '41 mm ↓', cffMa: '20 mm (Normal)', ly30: '%1.1' },
    delayX: 50,
    rampW: 60,
    maxAmp: 17,
    fibAmp: 13.5,
    lysisDecay: 0.05,
    diagnosis: 'Trombositopeni veya Trombosit Fonksiyon Bozukluğu',
    targetedTherapy: '1 Aferez Trombosit veya 1 Havuz (4–6 Ü Random) Trombosit Süspansiyonu.',
    clinicalNote:
      'Ayırıcı kural: EXTEM A5 düşük (< 35 mm) veya CK MA düşük (< 50 mm) iken FIBTEM A5 (≥ 10 mm) / CFF MA (≥ 15 mm) NORMAL ise sorun trombosittir.',
  },
  {
    id: 'factor-deficiency',
    label: '4. Faktör Eksikliği (CT/R ↑)',
    severity: 'warning',
    category: 'core',
    clinicalContext: 'Trombin üretim gecikmesi / VKA',
    rotemReadout: { extemCt: '118 sn ↑↑', extemA5: '44 mm', fibtemA5: '13 mm (Normal)', ml: '%3' },
    tegReadout: { r: '13.5 dk ↑↑', alpha: '58°', ma: '58 mm', cffMa: '19 mm', ly30: '%0.8' },
    delayX: 118,
    rampW: 54,
    maxAmp: 29,
    fibAmp: 13,
    lysisDecay: 0.04,
    diagnosis: 'Trombin Üretim / Koagülasyon Faktör Eksikliği (veya VKA / DOAK)',
    targetedTherapy: 'TDP 15–20 mL/kg VEYA 4-Faktör PCC 15–25 IU/kg (Warfarin/VKA varlığında ilk tercih 4F-PCC + K vit).',
    clinicalNote:
      'FIBTEM normalken EXTEM CT > 80 sn (veya TEG R > 10 dk) gerçek faktör eksikliğini gösterir. VKA dışı dilüsyonel kanamada ESAIC 2023 faktör eksikliğini fibrinojen düzeldikten sonra hedefler.',
  },
  {
    id: 'combined-dilutional',
    label: '5. Kombine Dilüsyonel',
    severity: 'critical',
    category: 'core',
    clinicalContext: 'Masif kanama + yoğun sıvı/ES',
    rotemReadout: { extemCt: '108 sn ↑', extemA5: '21 mm ↓↓', fibtemA5: '5 mm ↓↓', ml: '%6' },
    tegReadout: { r: '11.2 dk ↑', alpha: '38° ↓↓', ma: '36 mm ↓↓', cffMa: '7 mm ↓↓', ly30: '%1.4' },
    delayX: 102,
    rampW: 82,
    maxAmp: 15,
    fibAmp: 4,
    lysisDecay: 0.06,
    diagnosis: 'Kombine Dilüsyonel Koagülopati (Fibrinojen + Trombosit + Faktör ↓)',
    targetedTherapy: 'Sırayla düzelt: 1) Fibrinojen 4 g (veya 10 Ü Kriyo) → 2) Trombosit 1 Aferez/Havuz → 3) CT > 80 sn sürerse TDP / 4F-PCC.',
    clinicalNote:
      'Kristaloid/ES ağırlıklı resüsitasyonda sık görülür. Tüm parametreler aynı anda bozulduğunda önce fibrinojen replasmanı yapılır; çünkü düşük fibrinojen tek başına EXTEM CT’yi de uzatır.',
  },
  {
    id: 'hyperfibrinolysis',
    label: '6. Akut Hiperfibrinoliz',
    severity: 'critical',
    category: 'core',
    clinicalContext: 'Travma · PPH · KC nakli reperfüzyon',
    rotemReadout: {
      extemCt: '68 sn',
      extemA5: '36 mm',
      fibtemA5: '10 mm',
      ml: '%78 ↑↑ (APTEM: %4)',
      extraChannel: 'APTEM kanalında pıhtı tamamen korunur',
    },
    tegReadout: { r: '6.8 dk', alpha: '60°', ma: '48 mm', cffMa: '15 mm', ly30: '%42 ↑↑' },
    delayX: 52,
    rampW: 48,
    maxAmp: 27,
    fibAmp: 10,
    lysisDecay: 0.92,
    secondaryCompare: { label: 'APTEM (Antifibrinolitikli → Stabil Pıhtı!)', delayX: 50, maxAmp: 31, lysisDecay: 0.04 },
    diagnosis: 'Akut Hiperfibrinoliz (Pıhtı Erimesi — "Kalem Ucu / Ters Damla")',
    targetedTherapy: 'ACİL Traneksamik Asit (TXA 1 g IV 10 dk + 1 g / 8 sa infüzyon) + gerekirse Fibrinojen replasmanı.',
    clinicalNote:
      'Ağır travma, PPH, kardiyak cerrahi ve karaciğer naklinin reperfüzyon fazında sıktır. Klinik olarak hayatı tehdit eden kanamada TXA için ROTEM/TEG sonucunu beklemeyin!',
  },
  {
    id: 'heparin-effect',
    label: '7. Heparin Etkisi / Rebound',
    severity: 'warning',
    category: 'cpb-drug',
    clinicalContext: 'CPB sonrası INTEM vs HEPTEM',
    topChannelLabel: { rotem: 'INTEM (Heparine Duyarlı Kanal)', teg: 'CK (Kaolin — Heparine Duyarlı)' },
    rotemReadout: {
      extemCt: '64 sn',
      extemA5: '46 mm',
      fibtemA5: '14 mm',
      ml: '%3',
      extraChannel: 'INTEM CT 340 sn ↑↑ · HEPTEM CT 168 sn (Normal — Oran > 1.25)',
    },
    tegReadout: { r: 'CK R 17.2 dk ↑↑ · CKH R 6.4 dk', alpha: '62°', ma: '60 mm', cffMa: '20 mm', ly30: '%1.0' },
    delayX: 145,
    rampW: 55,
    maxAmp: 30,
    fibAmp: 14,
    lysisDecay: 0.04,
    secondaryCompare: { label: 'HEPTEM / CKH (Heparinazlı → Normal!)', delayX: 50, maxAmp: 31, lysisDecay: 0.04 },
    diagnosis: 'Rezidüel Heparin veya Heparin Rebound (CPB Sonrası Tipik!)',
    targetedTherapy: 'Ek Protamin Sülfat (tipik 25–50 mg yavaş IV; aşırı protamin kendisi koagülopati yapar!).',
    clinicalNote:
      'INTEM CT belirgin uzun iken heparinaz içeren HEPTEM CT normale dönüyorsa (INTEM/HEPTEM CT > 1.25 veya TEG CK R >> CKH R) kesin heparin etkisidir.',
  },
  {
    id: 'protamine-overdose',
    label: '8. Protamin Aşırı Dozu',
    severity: 'warning',
    category: 'cpb-drug',
    clinicalContext: 'CPB sonrası kritik tuzak (HEPTEM de uzun!)',
    topChannelLabel: { rotem: 'INTEM (Uzamış CT)', teg: 'CK (Uzamış R Zamanı)' },
    rotemReadout: {
      extemCt: '96 sn ↑',
      extemA5: '40 mm',
      fibtemA5: '13 mm',
      ml: '%4',
      extraChannel: 'INTEM CT 310 sn ↑↑ · HEPTEM CT 295 sn ↑↑ (Heparinazla DÜZELMEZ!)',
    },
    tegReadout: { r: 'CK R 15.4 dk ↑↑ · CKH R 14.8 dk ↑↑', alpha: '55°', ma: '54 mm', cffMa: '18 mm', ly30: '%1.1' },
    delayX: 136,
    rampW: 58,
    maxAmp: 27,
    fibAmp: 13,
    lysisDecay: 0.04,
    secondaryCompare: {
      label: 'HEPTEM / CKH (Hâlâ Uzun → Heparin DEĞİL!)',
      delayX: 130,
      maxAmp: 27,
      lysisDecay: 0.04,
      isAbnormal: true,
    },
    diagnosis: 'Protamin Fazlalığı / Overdozu (Heparin Rebound ile Karıştırma!)',
    targetedTherapy: 'EK PROTAMİN VERMEYİN! Klinik kanama sürüyorsa faktör/trombosit desteği değerlendir ve 10–15 dk sonra testi tekrarla.',
    clinicalNote:
      'Protamin:heparin oranı 1:1’i aştığında serbest protamin Faktör V, VII ve trombosit agregasyonunu inhibe eder. Hem INTEM hem HEPTEM birlikte uzunsa (oran ≈ 1.0) ek protamin kanamayı DAHA DA artırır!',
  },
  {
    id: 'hypercoagulability',
    label: '9. Hiperkoagülabilite',
    severity: 'warning',
    category: 'special',
    clinicalContext: 'Sepsis (erken) · Malignite · 3. Trimester',
    rotemReadout: { extemCt: '34 sn ↓', extemA5: '64 mm ↑↑', fibtemA5: '26 mm ↑↑ (MCF 32)', ml: '%0' },
    tegReadout: { r: '3.2 dk ↓', alpha: '81° ↑', ma: '78 mm ↑↑', cffMa: '35 mm ↑↑', ly30: '%0' },
    delayX: 28,
    rampW: 22,
    maxAmp: 39,
    fibAmp: 25,
    lysisDecay: 0.0,
    diagnosis: 'Hiperkoagülabilite / Protrombotik Profil (Kısa CT/R · Geniş MCF/MA)',
    targetedTherapy: 'Pro-hemostatik ajan (PCC, fibrinojen, TXA) VERMEYİN — VTE profilaksisini ve tromboz riskini gözden geçirin.',
    clinicalNote:
      'Erken sepsis, malignite, majör travma sonrası akut faz, gebelik ve inflamasyonda sık görülür. FIBTEM/CFF çok yüksekse fibrinojen baskın, FIBTEM normalken EXTEM/MA yüksekse trombosit baskın hiperkoagülabilitedir.',
  },
  {
    id: 'severe-dic',
    label: '10. Geç Faz DIC (Tüketim)',
    severity: 'critical',
    category: 'special',
    clinicalContext: 'Septik şok · Abrupsiyo · Amniyotik emboli',
    rotemReadout: { extemCt: '142 sn ↑↑', extemA5: '16 mm ↓↓', fibtemA5: '3 mm ↓↓', ml: '%34 ↑' },
    tegReadout: { r: '15.8 dk ↑↑', alpha: '31° ↓↓', ma: '29 mm ↓↓', cffMa: '5 mm ↓↓', ly30: '%18 ↑' },
    delayX: 132,
    rampW: 85,
    maxAmp: 12,
    fibAmp: 3,
    lysisDecay: 0.55,
    diagnosis: 'Geç Faz DIC / Ağır Tüketim Koagülopatisi (Tüm Komponentler Tükenmiş)',
    targetedTherapy: 'Altta yatan nedeni acil tedavi et + aktif kanamada Fibrinojen + Trombosit + TDP (fibrinolitik fenotipte TXA; trombotik DIC’te TXA’dan kaçın).',
    clinicalNote:
      'Uzamış CT/R, çok dar EXTEM ve FIBTEM amplitüdü ile ikincil fibrinolizin birlikteliğidir. Amniyotik sıvı embolisi, abrupsiyo plasenta veya ağır septik şokta hızla "düz çizgiye" ilerleyebilir.',
  },
  {
    id: 'fxiii-deficiency',
    label: '11. Faktör XIII Eksikliği',
    severity: 'warning',
    category: 'special',
    clinicalContext: 'Geç pıhtı gevşemesi — APTEM düzeltmez!',
    rotemReadout: {
      extemCt: '58 sn',
      extemA5: '42 mm',
      fibtemA5: '12 mm',
      ml: '%28 ↑ (Geç daralma)',
      extraChannel: 'APTEM ML %26 ↑ (TXA/Aprotinin ile DÜZELMEZ!)',
    },
    tegReadout: { r: '6.1 dk', alpha: '64°', ma: '56 mm', cffMa: '18 mm', ly30: '%14 ↑ (geç zayıflama)' },
    delayX: 50,
    rampW: 44,
    maxAmp: 29,
    fibAmp: 12,
    lysisDecay: 0.48,
    secondaryCompare: {
      label: 'APTEM (Antifibrinolitikle DÜZELMEZ → FXIII Düşün!)',
      delayX: 50,
      maxAmp: 29,
      lysisDecay: 0.44,
      isAbnormal: true,
    },
    diagnosis: 'Faktör XIII Eksikliği ("Yalancı Hiperfibrinoliz" — Çapraz Bağlanma Defekti)',
    targetedTherapy: 'Faktör XIII Konsantresi 15–30 IU/kg IV (yoksa FXIII içeren Kriyopresipitat veya TDP).',
    clinicalNote:
      'Konvansiyonel PT/aPTT, trombosit ve Clauss fibrinojen tamamen NORMALDİR. Gerçek hiperfibrinoliz APTEM’de tamamen düzelirken, FXIII eksikliğindeki geç pıhtı zayıflaması APTEM’de düzelmez; kesin tanı FXIII aktivitesi (< %50–70) ile konur.',
  },
  {
    id: 'obstetric-pph',
    label: '12. Obstetrik / PPH Eşiği',
    severity: 'critical',
    category: 'special',
    clinicalContext: 'Term gebede FIBTEM A5 < 12 mm kritik!',
    rotemReadout: {
      extemCt: '64 sn',
      extemA5: '38 mm (sınırda)',
      fibtemA5: '9 mm ↓↓ (PPH eşiği < 12!)',
      ml: '%8',
      extraChannel: 'Term gebe normali: FIBTEM A5 15–25 mm (Fibrinojen 4–6 g/L)',
    },
    tegReadout: { r: '6.0 dk', alpha: '56°', ma: '54 mm', cffMa: '12 mm ↓ (gebe için düşük)', ly30: '%2.1' },
    delayX: 54,
    rampW: 54,
    maxAmp: 25,
    fibAmp: 8.2,
    lysisDecay: 0.1,
    diagnosis: 'Postpartum Hemorajide (PPH) Erken Kritik Hipofibrinojenemi',
    targetedTherapy: 'Fibrinojen Konsantresi 2–4 g IV (veya Kriyopresipitat) + Doğumdan ilk 3 saatte TXA 1 g IV (WOMAN).',
    clinicalNote:
      'Önemli klinik tuzak: Genel cerrahi/travmada “sınırda normal” görünen FIBTEM A5 = 9–11 mm, fizyolojik fibrinojeni 4–6 g/L olan term gebede ağır fibrinojen tükenmesidir (< 2.0 g/L). ESAIC 2023 & OBS2 kılavuzları PPH’de FIBTEM A5 < 12 mm eşiğini kullanır.',
  },
];

const ASSAY_CHANNELS = [
  {
    system: 'ROTEM',
    channel: 'EXTEM',
    reagent: 'Doku Faktörü (Ekstrinsik yol)',
    role: 'Ana tarama kanalı: CT (faktörler), A5/MCF (trombosit + fibrin), ML (fibrinoliz).',
  },
  {
    system: 'ROTEM',
    channel: 'FIBTEM',
    reagent: 'EXTEM + Sitokalazin D (trombosit blokeri)',
    role: 'Trombosit katkısını sıfırlar → yalnızca FİBRİN pıhtı sertliğini (A5/MCF) izole ölçer.',
  },
  {
    system: 'ROTEM',
    channel: 'INTEM',
    reagent: 'Ellajik asit (İntrinsik yol)',
    role: 'İntrinsik faktörler ve heparin duyarlılığı (HEPTEM ile kıyaslanır).',
  },
  {
    system: 'ROTEM',
    channel: 'HEPTEM',
    reagent: 'INTEM + Heparinaz',
    role: 'Heparini nötralize eder; INTEM > HEPTEM ise rezidüel heparin/rebound kanıtıdır.',
  },
  {
    system: 'ROTEM',
    channel: 'APTEM',
    reagent: 'EXTEM + Aprotinin (veya TXA)',
    role: 'İn-vitro fibrinolizi durdurur; EXTEM’deki erimenin APTEM’de düzelmesi hiperfibrinolizi doğrular.',
  },
  {
    system: 'TEG',
    channel: 'CK / CRT',
    reagent: 'Kaolin (CK) · Kaolin + Doku Faktörü (RapidTEG)',
    role: 'Ana pıhtılaşma profili (R, K, α, MA, LY30). RapidTEG (CRT) travmada dakikalar içinde ACT/MA verir.',
  },
  {
    system: 'TEG',
    channel: 'CFF',
    reagent: 'Doku Faktörü + Abciximab (GP IIb/IIIa blokeri)',
    role: 'Functional Fibrinogen: Trombositleri bloke ederek saf fibrin sertliğini (CFF MA) ölçer.',
  },
  {
    system: 'TEG',
    channel: 'CKH',
    reagent: 'Kaolin + Heparinaz',
    role: 'CK ile karşılaştırıldığında heparin etkisini (CK R >> CKH R) ayırt eder.',
  },
];

const LIMITATIONS = [
  {
    title: '1. Antiplatelet İlaçlar (Aspirin / Klopidogrel) & Von Willebrand Hastalığı',
    body: 'Standart ROTEM (EXTEM/INTEM) ve standart TEG (CK/CRT) yüksek düzeyde trombin üreterek trombositleri PAR reseptörlerinden güçlü biçimde uyarır; bu nedenle Aspirin, P2Y12 inhibitörleri (Klopidogrel/Tikagrelor) ve Von Willebrand hastalığını YAKALAYAMAZ. Antiplatelet etki için TEG PlateletMapping veya empedans agregometri (Multiplate) gerekir.',
  },
  {
    title: '2. 37 °C Ölçümü Nedeniyle Hipotermi Koagülopatisini Gizler',
    body: 'Cihaz kan örneğini standart olarak 37 °C’ye ısıtarak analiz eder. Kor ısısı 33 °C olan bir hastada klinik olarak ciddi hipotermik koagülopati varken ROTEM/TEG sonucu normal görünebilir — mutlaka hastanın gerçek kor ısısını ≥ 36.0 °C tutun.',
  },
  {
    title: '3. DMAH (Enoksaparin) ve DOAK’lara Sınırlı Duyarlılık',
    body: 'Standart kanallar profilaktik/terapötik DMAH veya faktör Xa inhibitörlerini (özellikle Apiksaban) her zaman güvenilir biçimde uzatmaz. DOAK/DMAH şüphesinde ilaç öyküsü, spesifik anti-Xa/dTT veya özel DOAK testleri (örn. Russell Viper Venom / Ecarin) gerekir.',
  },
  {
    title: '4. Ağır Anemide (Düşük Hct) Yapay Yüksek FIBTEM/MA',
    body: 'Tam kanda hematokrit çok düştüğünde (< %20–25) aynı hacimdeki plazma ve fibrinojen oranı göreceli arttığı için FIBTEM MCF hafif yüksek okunabilir. Tersine yüksek hematokritte (polistemi) amplitüd düşük görünür.',
  },
  {
    title: '5. Kanıt Nüansı (Cochrane 2016 · iTACTIC 2021)',
    body: 'ROTEM/TEG rehberli algoritmalar özellikle kardiyak cerrahi ve karaciğer naklinde kan ürünü kullanımını anlamlı azaltır. Majör travmada randomize iTACTIC çalışması (2021) genel mortalite farkı göstermemiş, ancak ağır travmatik beyin hasarı (TBI) alt grubunda mortalite avantajı saptamıştır.',
  },
];

const FALLBACK_CONVENTIONAL_TABLE = [
  {
    target: '1. Fibrinojen (İlk Tükenen!)',
    labTest: 'Clauss Fibrinojen (Rutin panele ekle!)',
    threshold: '< 1.5 – 2.0 g/L (Obstetrikte < 2.0 g/L)',
    action: 'Fibrinojen Konsantresi 2–4 g IV (25–50 mg/kg) VEYA Kriyopresipitat 10 Ü (2 havuz).',
  },
  {
    target: '2. Trombosit',
    labTest: 'Tam Kan Sayımı (Hemogram)',
    threshold: '< 50.000 /µL (TBI / CNS / masif aktif kanamada < 100.000 /µL)',
    action: '1 Aferez Trombosit veya 1 Havuz (4–6 Ü Random) Trombosit Süspansiyonu.',
  },
  {
    target: '3. Koagülasyon Faktörleri',
    labTest: 'PT / INR ve aPTT',
    threshold: 'Aktif kanama + INR veya aPTT > 1.5 × normal üst sınır',
    action: 'TDP 15–20 mL/kg (VKA/warfarin acil dönüşünde 4-Faktör PCC 25–50 IU/kg + IV K Vitamini).',
  },
  {
    target: '4. Heparin / Protamin Takibi',
    labTest: 'ACT (Activated Clotting Time — Yatak Başı)',
    threshold: 'Kardiyak/vasküler cerrahide bazal ACT’ye dönmemesi',
    action: 'Ek Protamin Sülfat (yavaş IV; aşırı dozdan kaçın).',
  },
  {
    target: '5. Oksijen Taşıma & Perfüzyon',
    labTest: 'Seri AKG (Hb, iCa²⁺, Laktat, BE, pH)',
    threshold: 'Hb < 7–9 g/dL · iCa²⁺ < 0.90–1.00 mmol/L · pH < 7.20',
    action: 'ES transfüzyonu (hedef Hb 7–9 g/dL), her 4 Ü üründe IV Kalsiyum, aktif ısıtma ≥ 36 °C.',
  },
];

const REFERENCES = [
  {
    authors: 'Wikkelsø A, Wetterslev J, Møller AM, Afshari A',
    title: 'Thromboelastography (TEG) or thromboelastometry (ROTEM) to monitor haemostatic treatment versus usual care in adults or children with bleeding',
    journal: 'Cochrane Database Syst Rev. 2016;(8):CD007871',
    pmid: '27552162',
  },
  {
    authors: 'Görlinger K, Pérez-Ferrer A, Dirkmann D, et al.',
    title: 'The role of evidence-based algorithms for rotational thromboelastometry-guided bleeding management',
    journal: 'Korean J Anesthesiol. 2019;72(4):297–322',
    pmid: '31096732',
  },
  {
    authors: 'Baksaas-Aasen K, Gall LS, Stensballe J, et al. (iTACTIC Investigators)',
    title: 'Viscoelastic haemostatic assay augmented protocols for major trauma haemorrhage (ITACTIC): a randomized, controlled trial',
    journal: 'Intensive Care Med. 2021;47(1):49–59',
    pmid: '33048195',
  },
  {
    authors: 'Kietaibl S, Ahmed A, Afshari A, et al. (ESAIC Guidelines)',
    title: 'Management of severe peri-operative bleeding: Guidelines from the European Society of Anaesthesiology and Intensive Care: Second update 2022',
    journal: 'Eur J Anaesthesiol. 2023;40(4):226–304',
    pmid: '36855941',
  },
  {
    authors: 'Rossaint R, Afshari A, Bouillon B, et al.',
    title: 'The European guideline on management of major bleeding and coagulopathy following trauma: sixth edition',
    journal: 'Crit Care. 2023;27(1):80',
    pmid: '36855171',
  },
];

// Build symmetric viscoelastic tuning-fork polygon SVG path
function buildViscoelasticPath(delayX: number, rampW: number, maxAmp: number, lysisDecay: number, centerY: number): string {
  const startX = 16;
  const endX = 336;
  const peakX = Math.min(endX - 40, delayX + rampW);
  const tailAmp = Math.max(1.5, maxAmp * (1 - lysisDecay));

  // Upper half from startX -> delayX -> peakX -> endX, then lower half back to startX
  const upper = [
    `M ${startX} ${centerY}`,
    `L ${delayX} ${centerY}`,
    `C ${delayX + rampW * 0.35} ${centerY}, ${delayX + rampW * 0.45} ${(centerY - maxAmp).toFixed(1)}, ${peakX} ${(centerY - maxAmp).toFixed(1)}`,
    `C ${peakX + (endX - peakX) * 0.45} ${(centerY - maxAmp * (1 - lysisDecay * 0.35)).toFixed(1)}, ${peakX + (endX - peakX) * 0.72} ${(centerY - tailAmp).toFixed(1)}, ${endX} ${(centerY - tailAmp).toFixed(1)}`,
  ];

  const lower = [
    `L ${endX} ${(centerY + tailAmp).toFixed(1)}`,
    `C ${peakX + (endX - peakX) * 0.72} ${(centerY + tailAmp).toFixed(1)}, ${peakX + (endX - peakX) * 0.45} ${(centerY + maxAmp * (1 - lysisDecay * 0.35)).toFixed(1)}, ${peakX} ${(centerY + maxAmp).toFixed(1)}`,
    `C ${delayX + rampW * 0.45} ${(centerY + maxAmp).toFixed(1)}, ${delayX + rampW * 0.35} ${centerY}, ${delayX} ${centerY}`,
    `L ${startX} ${centerY} Z`,
  ];

  return [...upper, ...lower].join(' ');
}

// Monotone cubic Hermite interpolation (Fritsch-Carlson) for smooth normal TEG/ROTEM anatomy curve
interface CurveKnot {
  x: number;
  amp: number; // total amplitude in mm (symmetric top+bottom)
}

const NORMAL_ANATOMY_KNOTS: CurveKnot[] = [
  { x: 64, amp: 0 },
  { x: 186, amp: 0 },
  { x: 196, amp: 0.35 },
  { x: 206, amp: 2 },     // CT / R end (2 mm)
  { x: 236, amp: 20 },    // CFT / K end (20 mm)
  { x: 266, amp: 36 },
  { x: 306, amp: 46 },    // A5
  { x: 386, amp: 56 },    // A10
  { x: 460, amp: 60.5 },
  { x: 522, amp: 62 },    // MCF / MA peak (62 mm)
  { x: 636, amp: 60.4 },
  { x: 756, amp: 58 },    // 30 min post-peak (LI30 ≈ 94% / LY30 ≈ 6%)
  { x: 834, amp: 56.8 },
];

const HYPERFIB_GHOST_KNOTS: CurveKnot[] = [
  { x: 522, amp: 62 },
  { x: 585, amp: 48 },
  { x: 655, amp: 27 },
  { x: 725, amp: 12 },
  { x: 756, amp: 7.5 },
  { x: 834, amp: 3.5 },
];

function evalMonotoneHermite(knots: CurveKnot[], samplesPerSeg = 14): { x: number; amp: number }[] {
  const n = knots.length;
  const dx: number[] = [];
  const dy: number[] = [];
  const slopes: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(knots[i + 1].x - knots[i].x);
    dy.push(knots[i + 1].amp - knots[i].amp);
    slopes.push(dy[i] / dx[i]);
  }
  const tangents: number[] = new Array(n).fill(0);
  tangents[0] = slopes[0];
  tangents[n - 1] = slopes[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (slopes[i - 1] * slopes[i] <= 0) {
      tangents[i] = 0;
    } else {
      tangents[i] = (slopes[i - 1] + slopes[i]) / 2;
    }
  }
  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(slopes[i]) < 1e-6) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
    } else {
      const a = tangents[i] / slopes[i];
      const b = tangents[i + 1] / slopes[i];
      const h = Math.hypot(a, b);
      if (h > 3) {
        tangents[i] = (3 / h) * a * slopes[i];
        tangents[i + 1] = (3 / h) * b * slopes[i];
      }
    }
  }

  const pts: { x: number; amp: number }[] = [];
  for (let i = 0; i < n - 1; i++) {
    const x0 = knots[i].x;
    const x1 = knots[i + 1].x;
    const y0 = knots[i].amp;
    const y1 = knots[i + 1].amp;
    const h = x1 - x0;
    const steps = i === n - 2 ? samplesPerSeg : samplesPerSeg - 1;
    for (let s = 0; s <= steps; s++) {
      const t = s / samplesPerSeg;
      const t2 = t * t;
      const t3 = t2 * t;
      const h00 = 2 * t3 - 3 * t2 + 1;
      const h10 = t3 - 2 * t2 + t;
      const h01 = -2 * t3 + 3 * t2;
      const h11 = t3 - t2;
      const x = x0 + t * h;
      const amp = Math.max(0, h00 * y0 + h10 * h * tangents[i] + h01 * y1 + h11 * h * tangents[i + 1]);
      pts.push({ x, amp });
    }
  }
  return pts;
}

const ANATOMY_CENTER_Y = 196;
const ANATOMY_HALF_PX_PER_MM = 1.42; // 62 mm total -> 88.04 px half-height (total span 176 px)

function buildNormalAnatomyPaths() {
  const pts = evalMonotoneHermite(NORMAL_ANATOMY_KNOTS, 14);
  const upperCoords = pts.map((p) => `${p.x.toFixed(1)} ${(ANATOMY_CENTER_Y - p.amp * ANATOMY_HALF_PX_PER_MM).toFixed(1)}`);
  const lowerCoords = [...pts]
    .reverse()
    .map((p) => `${p.x.toFixed(1)} ${(ANATOMY_CENTER_Y + p.amp * ANATOMY_HALF_PX_PER_MM).toFixed(1)}`);

  const fillPath = `M ${upperCoords[0]} L ${upperCoords.slice(1).join(' L ')} L ${lowerCoords.join(' L ')} Z`;
  const upperStroke = `M ${upperCoords[0]} L ${upperCoords.slice(1).join(' L ')}`;
  const lowerStroke = `M ${pts
    .map((p) => `${p.x.toFixed(1)} ${(ANATOMY_CENTER_Y + p.amp * ANATOMY_HALF_PX_PER_MM).toFixed(1)}`)
    .join(' L ')}`;

  const ghostPts = evalMonotoneHermite(HYPERFIB_GHOST_KNOTS, 10);
  const ghostUpper = `M ${ghostPts
    .map((p) => `${p.x.toFixed(1)} ${(ANATOMY_CENTER_Y - p.amp * ANATOMY_HALF_PX_PER_MM).toFixed(1)}`)
    .join(' L ')}`;
  const ghostLower = `M ${ghostPts
    .map((p) => `${p.x.toFixed(1)} ${(ANATOMY_CENTER_Y + p.amp * ANATOMY_HALF_PX_PER_MM).toFixed(1)}`)
    .join(' L ')}`;

  return { fillPath, upperStroke, lowerStroke, ghostUpper, ghostLower };
}

const NORMAL_ANATOMY_SVG = buildNormalAnatomyPaths();

export const ViscoelasticHemostasisModule: React.FC<ViscoelasticHemostasisModuleProps> = ({ isDark }) => {
  const [selectedPatternId, setSelectedPatternId] = useState<string>('hypofibrinogenemia');
  const [patternFilter, setPatternFilter] = useState<'all' | 'core' | 'cpb-drug' | 'special'>('all');
  const [displayMode, setDisplayMode] = useState<'rotem' | 'teg'>('rotem');
  const [anatomyFocus, setAnatomyFocus] = useState<AnatomyFocusId>('all');
  const [anatomyLabelMode, setAnatomyLabelMode] = useState<'both' | 'rotem' | 'teg'>('both');

  const filteredPatterns =
    patternFilter === 'all' ? TRACE_PATTERNS : TRACE_PATTERNS.filter((p) => p.category === patternFilter);
  const activePattern = TRACE_PATTERNS.find((p) => p.id === selectedPatternId) ?? TRACE_PATTERNS[0];
  const activeAnatomyDetail = ANATOMY_PARAM_DETAILS.find((p) => p.id === anatomyFocus) ?? null;

  const isHighlighted = (id: Exclude<AnatomyFocusId, 'all'>) => anatomyFocus === 'all' || anatomyFocus === id;
  const labelFor = (rotem: string, teg: string) =>
    anatomyLabelMode === 'both' ? `${rotem} / ${teg}` : anatomyLabelMode === 'rotem' ? rotem : teg;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-8 pb-8">
      {/* ===================================================================== */}
      {/* EDITORIAL HEADER                                                      */}
      {/* ===================================================================== */}
      <header className={`pb-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">Viskoelastik Hemostaz</span>
          <span aria-hidden="true">·</span>
          <span>ROTEM &amp; TEG Rehberli Kanama Yönetimi</span>
          <span aria-hidden="true">·</span>
          <span>ESAIC 2023 · Rossaint 2023 · Görlinger A5 · iTACTIC</span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Viskoelastik Testler (TEG &amp; ROTEM) Rehberliğinde Hemostaz
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Tam kanda pıhtı başlangıcından fibrinolize kadar tüm hücre bazlı koagülasyonu yatak başında (5–15 dk) gösteren{' '}
          <strong>ROTEM</strong> ve <strong>TEG</strong> parametreleri, 12 klinik koagülopati paterninin hedefe yönelik tedavisi,
          testlerin kör noktaları ve <strong>TEG/ROTEM’in bulunmadığı merkezlerde</strong> kanıta dayalı alternatif hemostaz yönetimi.
        </p>

        {/* Chapter Navigation Strip */}
        <nav aria-label="Modül bölümleri" className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'vha-ch1', label: '01 · Fizik & Parametreler' },
            { id: 'vha-ch2', label: '02 · Patern Atlası' },
            { id: 'vha-ch3', label: '03 · Kanallar & A5 Algoritması' },
            { id: 'vha-ch4', label: '04 · Sınırlar & Kör Noktalar' },
            { id: 'vha-ch5', label: '05 · TEG/ROTEM Yoksa Yönetim' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* CHAPTER 01: MEASUREMENT PHYSICS & PARAMETER EQUIVALENCY               */}
      {/* ===================================================================== */}
      <section id="vha-ch1" className="space-y-4 scroll-mt-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-400">
            Bölüm 01 · Ölçüm Fiziği &amp; Parametre Karşılıkları
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            ROTEM ve TEG Nasıl Ölçer? (Tam Kan vs. Plazma Testleri)
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            PT ve aPTT santrifüjlenmiş plazmada yalnızca pıhtılaşmanın başlangıcını ölçerken, viskoelastik testler{' '}
            <strong>tam kanda</strong> (trombosit + eritrosit + fibrin etkileşimiyle) oluşan pıhtının mekanik direncini
            gerçek zamanlı eğriye (<em>TEMogram / TEGogram</em>) dönüştürür.
          </p>
        </div>

        {/* ================================================================= */}
        {/* DETAILED NORMAL THROMBOELASTOGRAM / TEMOGRAM ANATOMY DIAGRAM      */}
        {/* ================================================================= */}
        <div
          className={`rounded-2xl border p-4 sm:p-5 space-y-4 ${
            isDark ? 'bg-slate-900/75 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-fuchsia-600 dark:text-fuchsia-400">
                Temel Anatomi · Normal Eğri Okuma Rehberi
              </div>
              <h3 className={`text-base sm:text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Normal Tromboelastogram (TEG) &amp; TEMogram (ROTEM) Ayrıntılı Şeması
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Eğri yatay eksende <strong>zamanı</strong>, düşey eksende simetrik olarak <strong>pıhtı sertliğini (mm)</strong> gösterir.
                Parametreleri izole incelemek için alttaki etiketlere tıklayabilirsiniz.
              </p>
            </div>

            {/* Dual / ROTEM / TEG Label Toggle */}
            <div className="flex items-center gap-1">
              {(
                [
                  { id: 'both', label: 'ROTEM + TEG' },
                  { id: 'rotem', label: 'ROTEM' },
                  { id: 'teg', label: 'TEG' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAnatomyLabelMode(opt.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-bold border transition-colors cursor-pointer ${
                    anatomyLabelMode === opt.id
                      ? isDark
                        ? 'bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-200'
                        : 'bg-fuchsia-50 border-fuchsia-400 text-fuchsia-900'
                      : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Annotated Technical SVG */}
          <div
            className={`rounded-xl border p-2 sm:p-3 overflow-x-auto ${
              isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <svg
              viewBox="0 0 880 410"
              className="w-full min-w-[660px] h-auto block select-none"
              role="img"
              aria-label="Normal Tromboelastogram (TEG) ve TEMogram (ROTEM) ayrıntılı parametre şeması: CT/R, CFT/K, alfa açısı, A5, A10, MCF/MA ve LI30/LY30"
            >
              <defs>
                <linearGradient id="normalClotFill" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={isDark ? '#c026d3' : '#a21caf'} stopOpacity={isDark ? '0.24' : '0.16'} />
                  <stop offset="55%" stopColor={isDark ? '#10b981' : '#059669'} stopOpacity={isDark ? '0.26' : '0.18'} />
                  <stop offset="100%" stopColor={isDark ? '#0ea5e9' : '#0284c7'} stopOpacity={isDark ? '0.20' : '0.14'} />
                </linearGradient>
                <marker id="arrViolet" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 7 4 L 0 6.5 z" fill="#8b5cf6" />
                </marker>
                <marker id="arrAmber" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 7 4 L 0 6.5 z" fill="#f59e0b" />
                </marker>
                <marker id="arrCyan" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 7 4 L 0 6.5 z" fill="#06b6d4" />
                </marker>
                <marker id="arrEmerald" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 7 4 L 0 6.5 z" fill="#10b981" />
                </marker>
                <marker id="arrRose" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 7 4 L 0 6.5 z" fill="#f43f5e" />
                </marker>
              </defs>

              {/* TOP PHYSIOLOGICAL PHASE BANDS (4 Hemostasis Phases) */}
              <g>
                {/* Phase 1: Initiation */}
                <rect
                  x="64"
                  y="14"
                  width="142"
                  height="38"
                  rx="6"
                  fill={isDark ? 'rgba(139,92,246,0.14)' : 'rgba(139,92,246,0.09)'}
                  stroke={isDark ? 'rgba(167,139,250,0.35)' : 'rgba(139,92,246,0.35)'}
                  opacity={isHighlighted('ct-r') ? 1 : 0.35}
                />
                <text x="135" y="29" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#c4b5fd' : '#6d28d9'}>
                  1. İNİSİYASYON
                </text>
                <text x="135" y="43" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#475569'}>
                  Koagülasyon Faktörleri
                </text>

                {/* Phase 2: Amplification / Kinetics */}
                <rect
                  x="210"
                  y="14"
                  width="132"
                  height="38"
                  rx="6"
                  fill={isDark ? 'rgba(245,158,11,0.14)' : 'rgba(245,158,11,0.10)'}
                  stroke={isDark ? 'rgba(251,191,36,0.35)' : 'rgba(217,119,6,0.35)'}
                  opacity={isHighlighted('cft-k') || isHighlighted('alpha') ? 1 : 0.35}
                />
                <text x="276" y="29" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#fcd34d' : '#b45309'}>
                  2. AMPLİFİKASYON
                </text>
                <text x="276" y="43" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#475569'}>
                  Fibrinojen &amp; Polimerizasyon
                </text>

                {/* Phase 3: Max Clot Strength */}
                <rect
                  x="346"
                  y="14"
                  width="244"
                  height="38"
                  rx="6"
                  fill={isDark ? 'rgba(16,185,129,0.14)' : 'rgba(16,185,129,0.10)'}
                  stroke={isDark ? 'rgba(52,211,153,0.35)' : 'rgba(5,150,105,0.35)'}
                  opacity={isHighlighted('a5-a10') || isHighlighted('mcf-ma') ? 1 : 0.35}
                />
                <text x="468" y="29" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#6ee7b7' : '#047857'}>
                  3. MAKSİMUM PIHTI DAYANIKLILIĞI
                </text>
                <text x="468" y="43" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#475569'}>
                  ~%80 Trombosit + ~%20 Fibrin &amp; FXIII
                </text>

                {/* Phase 4: Fibrinolysis */}
                <rect
                  x="594"
                  y="14"
                  width="250"
                  height="38"
                  rx="6"
                  fill={isDark ? 'rgba(244,63,94,0.13)' : 'rgba(244,63,94,0.08)'}
                  stroke={isDark ? 'rgba(251,113,133,0.35)' : 'rgba(225,29,72,0.30)'}
                  opacity={isHighlighted('lysis') ? 1 : 0.35}
                />
                <text x="719" y="29" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#fda4af' : '#be123c'}>
                  4. FİBRİNOLİZ &amp; STABİLİTE
                </text>
                <text x="719" y="43" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#475569'}>
                  Plazmin Dengesi · Pıhtı Erimesi
                </text>
              </g>

              {/* BACKGROUND GRID & AXES */}
              <g stroke={isDark ? '#1e293b' : '#e2e8f0'} strokeWidth="1">
                {/* Y-axis vertical line */}
                <line x1="64" y1="74" x2="64" y2="318" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.25" />
                {/* Horizontal amplitude grid lines: 20 mm, 40 mm, 60 mm symmetric around centerY=196 */}
                {[20, 40, 60].map((mm) => {
                  const dy = mm * ANATOMY_HALF_PX_PER_MM;
                  return (
                    <g key={mm}>
                      <line x1="64" y1={ANATOMY_CENTER_Y - dy} x2="844" y2={ANATOMY_CENTER_Y - dy} strokeDasharray="3 4" />
                      <line x1="64" y1={ANATOMY_CENTER_Y + dy} x2="844" y2={ANATOMY_CENTER_Y + dy} strokeDasharray="3 4" />
                    </g>
                  );
                })}
                {/* Baseline midline (0 mm) */}
                <line
                  x1="64"
                  y1={ANATOMY_CENTER_Y}
                  x2="844"
                  y2={ANATOMY_CENTER_Y}
                  stroke={isDark ? '#475569' : '#94a3b8'}
                  strokeDasharray="4 4"
                />
                {/* Bottom X-axis line */}
                <line x1="64" y1="318" x2="848" y2="318" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.25" />
              </g>

              {/* Y-AXIS LABELS (Total Clot Amplitude in mm) */}
              <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9.5" fill={isDark ? '#94a3b8' : '#64748b'}>
                <text x="58" y={ANATOMY_CENTER_Y - 60 * ANATOMY_HALF_PX_PER_MM + 3} textAnchor="end">60</text>
                <text x="58" y={ANATOMY_CENTER_Y - 40 * ANATOMY_HALF_PX_PER_MM + 3} textAnchor="end">40</text>
                <text x="58" y={ANATOMY_CENTER_Y - 20 * ANATOMY_HALF_PX_PER_MM + 3} textAnchor="end" fontWeight="700" fill={isDark ? '#fbbf24' : '#b45309'}>
                  20
                </text>
                <text x="58" y={ANATOMY_CENTER_Y + 3} textAnchor="end" fontWeight="700">0</text>
                <text x="58" y={ANATOMY_CENTER_Y + 20 * ANATOMY_HALF_PX_PER_MM + 3} textAnchor="end" fontWeight="700" fill={isDark ? '#fbbf24' : '#b45309'}>
                  20
                </text>
                <text x="58" y={ANATOMY_CENTER_Y + 40 * ANATOMY_HALF_PX_PER_MM + 3} textAnchor="end">40</text>
                <text x="58" y={ANATOMY_CENTER_Y + 60 * ANATOMY_HALF_PX_PER_MM + 3} textAnchor="end">60</text>
                <text
                  x="19"
                  y={ANATOMY_CENTER_Y}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill={isDark ? '#cbd5e1' : '#334155'}
                  transform={`rotate(-90 19 ${ANATOMY_CENTER_Y})`}
                >
                  AMPLİTÜD / PIHTI SERTLİĞİ (mm)
                </text>
              </g>

              {/* PATHOLOGICAL HYPERFIBRINOLYSIS GHOST COMPARISON (Right Side) */}
              <g opacity={isHighlighted('lysis') ? 0.85 : 0.22}>
                <path
                  d={NORMAL_ANATOMY_SVG.ghostUpper}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="1.75"
                  strokeDasharray="5 4"
                />
                <path
                  d={NORMAL_ANATOMY_SVG.ghostLower}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="1.75"
                  strokeDasharray="5 4"
                />
                <text
                  x="639"
                  y="192"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fill={isDark ? '#fda4af' : '#be123c'}
                >
                  Hiperfibrinoliz
                </text>
                <text
                  x="639"
                  y="204"
                  textAnchor="middle"
                  fontSize="8.2"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#fb7185' : '#e11d48'}
                >
                  (ML &gt; %15 · LY30 &gt; %3)
                </text>
              </g>

              {/* MAIN NORMAL VISCOELASTIC TUNING-FORK TRACE */}
              <path d={NORMAL_ANATOMY_SVG.fillPath} fill="url(#normalClotFill)" />
              <path
                d={NORMAL_ANATOMY_SVG.upperStroke}
                fill="none"
                stroke={isDark ? '#e2e8f0' : '#0f172a'}
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path
                d={NORMAL_ANATOMY_SVG.lowerStroke}
                fill="none"
                stroke={isDark ? '#e2e8f0' : '#0f172a'}
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              {/* Initial baseline bold line until CT/R */}
              <line
                x1="64"
                y1={ANATOMY_CENTER_Y}
                x2="206"
                y2={ANATOMY_CENTER_Y}
                stroke={isDark ? '#a78bfa' : '#7c3aed'}
                strokeWidth="2.8"
                opacity={isHighlighted('ct-r') ? 1 : 0.3}
              />

              {/* ============================================================= */}
              {/* 1. CT / R ANNOTATION (x: 64 -> 206, 2 mm split marker)        */}
              {/* ============================================================= */}
              <g opacity={isHighlighted('ct-r') ? 1 : 0.22}>
                {/* Vertical guide at CT/R (2 mm split) */}
                <line x1="206" y1="168" x2="206" y2="352" stroke="#8b5cf6" strokeWidth="1.3" strokeDasharray="3 3" />
                {/* 2 mm marker dots on upper & lower branch */}
                <circle cx="206" cy={ANATOMY_CENTER_Y - 2 * ANATOMY_HALF_PX_PER_MM} r="3" fill="#8b5cf6" />
                <circle cx="206" cy={ANATOMY_CENTER_Y + 2 * ANATOMY_HALF_PX_PER_MM} r="3" fill="#8b5cf6" />
                <text
                  x="197"
                  y="181"
                  textAnchor="end"
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#c4b5fd' : '#6d28d9'}
                >
                  2 mm
                </text>
                {/* Bottom CT / R horizontal bracket */}
                <line
                  x1="68"
                  y1="342"
                  x2="202"
                  y2="342"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  markerStart="url(#arrViolet)"
                  markerEnd="url(#arrViolet)"
                />
                <rect
                  x="93"
                  y="350"
                  width="86"
                  height="21"
                  rx="5"
                  fill={isDark ? 'rgba(139,92,246,0.22)' : 'rgba(139,92,246,0.12)'}
                  stroke="#8b5cf6"
                  strokeWidth="1"
                />
                <text
                  x="136"
                  y="364"
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#ddd6fe' : '#5b21b6'}
                >
                  {labelFor('CT', 'R')}
                </text>
                <text x="136" y="384" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#64748b'}>
                  0 → 2 mm
                </text>
              </g>

              {/* ============================================================= */}
              {/* 2. CFT / K ANNOTATION (x: 206 -> 236, 2 mm to 20 mm)          */}
              {/* ============================================================= */}
              <g opacity={isHighlighted('cft-k') ? 1 : 0.22}>
                {/* Vertical guide at 20 mm point (x=236) */}
                <line x1="236" y1={ANATOMY_CENTER_Y - 20 * ANATOMY_HALF_PX_PER_MM} x2="236" y2="352" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="3 3" />
                {/* 20 mm amplitude vertical bar inside trace */}
                <line
                  x1="236"
                  y1={ANATOMY_CENTER_Y - 20 * ANATOMY_HALF_PX_PER_MM + 2}
                  x2="236"
                  y2={ANATOMY_CENTER_Y + 20 * ANATOMY_HALF_PX_PER_MM - 2}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  markerStart="url(#arrAmber)"
                  markerEnd="url(#arrAmber)"
                />
                <circle cx="236" cy={ANATOMY_CENTER_Y - 20 * ANATOMY_HALF_PX_PER_MM} r="3.2" fill="#f59e0b" />
                <circle cx="236" cy={ANATOMY_CENTER_Y + 20 * ANATOMY_HALF_PX_PER_MM} r="3.2" fill="#f59e0b" />
                <rect
                  x="241"
                  y={ANATOMY_CENTER_Y - 8}
                  width="36"
                  height="16"
                  rx="4"
                  fill={isDark ? '#0f172a' : '#ffffff'}
                  stroke="#f59e0b"
                  strokeWidth="1"
                />
                <text
                  x="259"
                  y={ANATOMY_CENTER_Y + 3.5}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="700"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#fcd34d' : '#b45309'}
                >
                  20 mm
                </text>

                {/* Bottom CFT / K horizontal bracket */}
                <line
                  x1="209"
                  y1="342"
                  x2="233"
                  y2="342"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  markerStart="url(#arrAmber)"
                  markerEnd="url(#arrAmber)"
                />
                <rect
                  x="194"
                  y="350"
                  width="68"
                  height="21"
                  rx="5"
                  fill={isDark ? 'rgba(245,158,11,0.22)' : 'rgba(245,158,11,0.14)'}
                  stroke="#f59e0b"
                  strokeWidth="1"
                />
                <text
                  x="228"
                  y="364"
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#fde68a' : '#92400e'}
                >
                  {labelFor('CFT', 'K')}
                </text>
                <text x="228" y="384" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#64748b'}>
                  2 → 20 mm
                </text>
              </g>

              {/* ============================================================= */}
              {/* 3. ALPHA ANGLE (α) TANGENT FROM 2 mm SPLIT POINT              */}
              {/* ============================================================= */}
              <g opacity={isHighlighted('alpha') ? 1 : 0.22}>
                {/* Tangent ray from (206, 196) passing steeply along upper shoulder up to (272, 92) */}
                <line
                  x1="206"
                  y1={ANATOMY_CENTER_Y}
                  x2="274"
                  y2="90"
                  stroke="#ec4899"
                  strokeWidth="2.2"
                  strokeDasharray="6 3"
                />
                {/* Angle arc wedge between horizontal midline and tangent */}
                <path
                  d={`M 244 ${ANATOMY_CENTER_Y} A 38 38 0 0 0 227 164`}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="2.4"
                />
                <rect
                  x="248"
                  y="66"
                  width="76"
                  height="22"
                  rx="5"
                  fill={isDark ? 'rgba(236,72,153,0.22)' : 'rgba(236,72,153,0.12)'}
                  stroke="#ec4899"
                  strokeWidth="1.1"
                />
                <text
                  x="286"
                  y="81"
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#f9a8d4' : '#be185d'}
                >
                  α-Açısı
                </text>
                <text
                  x="221"
                  y="186"
                  fontSize="12"
                  fontWeight="800"
                  fill={isDark ? '#f472b6' : '#db2777'}
                >
                  α
                </text>
              </g>

              {/* ============================================================= */}
              {/* 4. A5 & A10 EARLY CLOT FIRMNESS (Görlinger A5)                */}
              {/* ============================================================= */}
              <g opacity={isHighlighted('a5-a10') ? 1 : 0.22}>
                {/* A5 at x=306, amp=46 mm */}
                <line
                  x1="306"
                  y1={ANATOMY_CENTER_Y - 46 * ANATOMY_HALF_PX_PER_MM + 4}
                  x2="306"
                  y2={ANATOMY_CENTER_Y + 46 * ANATOMY_HALF_PX_PER_MM - 4}
                  stroke="#06b6d4"
                  strokeWidth="2"
                  markerStart="url(#arrCyan)"
                  markerEnd="url(#arrCyan)"
                />
                <line x1="306" y1={ANATOMY_CENTER_Y + 46 * ANATOMY_HALF_PX_PER_MM} x2="306" y2="338" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                <rect
                  x="286"
                  y={ANATOMY_CENTER_Y - 12}
                  width="40"
                  height="24"
                  rx="5"
                  fill={isDark ? '#0f172a' : '#ffffff'}
                  stroke="#06b6d4"
                  strokeWidth="1.2"
                />
                <text
                  x="306"
                  y={ANATOMY_CENTER_Y + 4}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#67e8f9' : '#0e7490'}
                >
                  A5
                </text>
                <text x="306" y="355" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={isDark ? '#67e8f9' : '#0e7490'}>
                  +5 dk
                </text>
                <text x="306" y="368" textAnchor="middle" fontSize="8" fill={isDark ? '#94a3b8' : '#64748b'}>
                  (CT sonrası)
                </text>

                {/* A10 at x=386, amp=56 mm */}
                <line
                  x1="386"
                  y1={ANATOMY_CENTER_Y - 56 * ANATOMY_HALF_PX_PER_MM + 4}
                  x2="386"
                  y2={ANATOMY_CENTER_Y + 56 * ANATOMY_HALF_PX_PER_MM - 4}
                  stroke="#06b6d4"
                  strokeWidth="2"
                  markerStart="url(#arrCyan)"
                  markerEnd="url(#arrCyan)"
                />
                <line x1="386" y1={ANATOMY_CENTER_Y + 56 * ANATOMY_HALF_PX_PER_MM} x2="386" y2="338" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                <rect
                  x="363"
                  y={ANATOMY_CENTER_Y - 12}
                  width="46"
                  height="24"
                  rx="5"
                  fill={isDark ? '#0f172a' : '#ffffff'}
                  stroke="#06b6d4"
                  strokeWidth="1.2"
                />
                <text
                  x="386"
                  y={ANATOMY_CENTER_Y + 4}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#67e8f9' : '#0e7490'}
                >
                  A10
                </text>
                <text x="386" y="355" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={isDark ? '#67e8f9' : '#0e7490'}>
                  +10 dk
                </text>
              </g>

              {/* ============================================================= */}
              {/* 5. MCF / MA PEAK AMPLITUDE (x=522, amp=62 mm)                 */}
              {/* ============================================================= */}
              <g opacity={isHighlighted('mcf-ma') ? 1 : 0.22}>
                {/* Horizontal peak reference line extending right to LY30 */}
                <line
                  x1="522"
                  y1={ANATOMY_CENTER_Y - 62 * ANATOMY_HALF_PX_PER_MM}
                  x2="778"
                  y2={ANATOMY_CENTER_Y - 62 * ANATOMY_HALF_PX_PER_MM}
                  stroke="#10b981"
                  strokeWidth="1.15"
                  strokeDasharray="4 4"
                />
                <line
                  x1="522"
                  y1={ANATOMY_CENTER_Y + 62 * ANATOMY_HALF_PX_PER_MM}
                  x2="778"
                  y2={ANATOMY_CENTER_Y + 62 * ANATOMY_HALF_PX_PER_MM}
                  stroke="#10b981"
                  strokeWidth="1.15"
                  strokeDasharray="4 4"
                />
                {/* Main peak vertical double-arrow */}
                <line
                  x1="522"
                  y1={ANATOMY_CENTER_Y - 62 * ANATOMY_HALF_PX_PER_MM + 4}
                  x2="522"
                  y2={ANATOMY_CENTER_Y + 62 * ANATOMY_HALF_PX_PER_MM - 4}
                  stroke="#10b981"
                  strokeWidth="2.6"
                  markerStart="url(#arrEmerald)"
                  markerEnd="url(#arrEmerald)"
                />
                <rect
                  x="472"
                  y={ANATOMY_CENTER_Y - 19}
                  width="100"
                  height="38"
                  rx="7"
                  fill={isDark ? '#064e3b' : '#ecfdf5'}
                  stroke="#10b981"
                  strokeWidth="1.5"
                />
                <text
                  x="522"
                  y={ANATOMY_CENTER_Y - 3}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#6ee7b7' : '#065f46'}
                >
                  {labelFor('MCF', 'MA')}
                </text>
                <text
                  x="522"
                  y={ANATOMY_CENTER_Y + 12}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#a7f3d0' : '#047857'}
                >
                  Tepe (~62 mm)
                </text>
                <line x1="522" y1={ANATOMY_CENTER_Y + 62 * ANATOMY_HALF_PX_PER_MM} x2="522" y2="346" stroke="#10b981" strokeWidth="1.1" strokeDasharray="3 3" />
                <text x="522" y="361" textAnchor="middle" fontSize="9" fontWeight="700" fill={isDark ? '#6ee7b7' : '#047857'}>
                  Tepe
                </text>
                <text x="522" y="374" textAnchor="middle" fontSize="8" fill={isDark ? '#94a3b8' : '#64748b'}>
                  (MCF / MA)
                </text>
              </g>

              {/* ============================================================= */}
              {/* 6. LI30 / ML / LY30 CLOT LYSIS (x=756, 30 min post-peak)      */}
              {/* ============================================================= */}
              <g opacity={isHighlighted('lysis') ? 1 : 0.22}>
                {/* Remaining clot vertical bar at x=756 (amp=58 mm) */}
                <line
                  x1="756"
                  y1={ANATOMY_CENTER_Y - 58 * ANATOMY_HALF_PX_PER_MM + 4}
                  x2="756"
                  y2={ANATOMY_CENTER_Y + 58 * ANATOMY_HALF_PX_PER_MM - 4}
                  stroke="#f43f5e"
                  strokeWidth="2.1"
                  markerStart="url(#arrRose)"
                  markerEnd="url(#arrRose)"
                />
                {/* Top lysis reduction callout bar */}
                <rect
                  x="752"
                  y={ANATOMY_CENTER_Y - 62 * ANATOMY_HALF_PX_PER_MM}
                  width="8"
                  height={(62 - 58) * ANATOMY_HALF_PX_PER_MM}
                  fill="#f43f5e"
                  opacity="0.7"
                />
                <rect
                  x="706"
                  y={ANATOMY_CENTER_Y - 19}
                  width="102"
                  height="38"
                  rx="7"
                  fill={isDark ? '#4c0519' : '#fff1f2'}
                  stroke="#f43f5e"
                  strokeWidth="1.4"
                />
                <text
                  x="757"
                  y={ANATOMY_CENTER_Y - 3}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#fda4af' : '#be123c'}
                >
                  {labelFor('LI30 · ML', 'LY30')}
                </text>
                <text
                  x="757"
                  y={ANATOMY_CENTER_Y + 11.5}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="700"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fill={isDark ? '#fecdd3' : '#9f1239'}
                >
                  Normal (%0–8 erime)
                </text>

                {/* Bottom +30 min bracket from MCF/MA to LY30 */}
                <line x1="756" y1={ANATOMY_CENTER_Y + 58 * ANATOMY_HALF_PX_PER_MM} x2="756" y2="348" stroke="#f43f5e" strokeWidth="1.1" strokeDasharray="3 3" />
                <line
                  x1="528"
                  y1="342"
                  x2="750"
                  y2="342"
                  stroke="#f43f5e"
                  strokeWidth="1.6"
                  strokeDasharray="4 3"
                  markerStart="url(#arrRose)"
                  markerEnd="url(#arrRose)"
                />
                <text x="642" y="359" textAnchor="middle" fontSize="9" fontWeight="700" fill={isDark ? '#fda4af' : '#be123c'}>
                  +30 dk (LY30 / LI30)
                </text>
                <text x="642" y="372" textAnchor="middle" fontSize="8" fill={isDark ? '#94a3b8' : '#64748b'}>
                  TEG: MA sonrası · ROTEM: CT sonrası
                </text>
              </g>

              {/* X-AXIS TITLE */}
              <text
                x="844"
                y="312"
                textAnchor="end"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fill={isDark ? '#94a3b8' : '#64748b'}
              >
                ZAMAN (dk) →
              </text>
            </svg>
          </div>

          {/* Interactive Parameter Highlight Selector + Instant Detail Strip */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setAnatomyFocus('all')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  anatomyFocus === 'all'
                    ? isDark
                      ? 'bg-slate-100 text-slate-900 border-slate-100'
                      : 'bg-slate-900 text-white border-slate-900'
                    : isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Tüm Parametreler
              </button>
              {ANATOMY_PARAM_DETAILS.map((p) => {
                const active = anatomyFocus === p.id;
                const chipLabel =
                  anatomyLabelMode === 'both'
                    ? p.shortRotem === p.shortTeg
                      ? p.shortRotem
                      : `${p.shortRotem} / ${p.shortTeg}`
                    : anatomyLabelMode === 'rotem'
                      ? p.shortRotem
                      : p.shortTeg;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setAnatomyFocus(active ? 'all' : p.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? isDark
                          ? 'bg-slate-800 text-white border-slate-500'
                          : 'bg-slate-900 text-white border-slate-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.colorHex }} />
                    {chipLabel}
                  </button>
                );
              })}
            </div>

            {activeAnatomyDetail ? (
              <div
                className={`rounded-xl border p-3.5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs ${
                  isDark ? 'bg-slate-950/75 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: activeAnatomyDetail.colorHex }}>
                    {activeAnatomyDetail.phase} · Geometrik Tanım
                  </div>
                  <p className={`leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {activeAnatomyDetail.geometryDef}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Biyolojik Karşılık &amp; Normal Aralık
                  </div>
                  <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {activeAnatomyDetail.biology}
                  </p>
                  <div className={`font-mono text-[11px] font-semibold pt-0.5 ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                    {activeAnatomyDetail.normalRange}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    Bozulduğunda Klinik Anlam &amp; Aksiyon
                  </div>
                  <p className={`leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {activeAnatomyDetail.abnormalMeaning}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`rounded-xl border px-3.5 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2 ${
                  isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span>
                  <strong>Hızlı Okuma Kuralı:</strong> Soldan sağa sırasıyla{' '}
                  <strong className="text-violet-600 dark:text-violet-400">Faktörler (CT/R)</strong> →{' '}
                  <strong className="text-amber-600 dark:text-amber-400">Fibrinojen Hızı (CFT/K · α)</strong> →{' '}
                  <strong className="text-emerald-600 dark:text-emerald-400">Pıhtı Gücü (A5/A10 · MCF/MA)</strong> →{' '}
                  <strong className="text-rose-600 dark:text-rose-400">Fibrinoliz (LI30/ML · LY30)</strong> okunur.
                </span>
                <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Detay için yukarıdan bir parametre seçin
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className={`rounded-xl border p-4 space-y-1.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400">ROTEM (Rotational Thromboelastometry)</div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <strong>ROTEM delta:</strong> Küvet sabittir, pim ±4.75° salınır; fibrin köprüleri pimin hareketini kısıtladıkça
              optik sensör direnci milimetre cinsinden kaydeder. <strong>ROTEM sigma</strong> ise tam otomatik kartuş sistemidir
              (manuel pipetleme hatasını ortadan kaldırır).
            </p>
          </div>
          <div className={`rounded-xl border p-4 space-y-1.5 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs font-bold text-sky-600 dark:text-sky-400">TEG (Thromboelastography)</div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <strong>TEG 5000:</strong> Küvet ±4.45° döner, pim bir tork teline bağlıdır ve pıhtı oluştukça tork aktarımını ölçer.{' '}
              <strong>TEG 6s</strong> ise mikroakışkan kartuş içinde pıhtının <em>rezonans frekansını</em> optik olarak ölçerek
              titreşime karşı direnç kazanmıştır.
            </p>
          </div>
        </div>

        {/* Equivalency Table */}
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
                <th className="py-2.5 px-4 font-bold">Hemostaz Fazı</th>
                <th className="py-2.5 px-4 font-bold text-fuchsia-600 dark:text-fuchsia-400">ROTEM Parametresi &amp; Normal</th>
                <th className="py-2.5 px-4 font-bold text-sky-600 dark:text-sky-400">TEG Parametresi &amp; Normal</th>
                <th className="py-2.5 px-4 font-bold">Klinik Anlamı</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {PARAM_EQUIV_TABLE.map((row) => (
                <tr key={row.phase} className="align-top">
                  <td className={`py-2.5 px-4 font-bold min-w-[165px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.phase}
                  </td>
                  <td className="py-2.5 px-4 min-w-[190px]">
                    <div className="font-mono font-bold text-fuchsia-600 dark:text-fuchsia-400">{row.rotemParam}</div>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">{row.rotemNormal}</div>
                  </td>
                  <td className="py-2.5 px-4 min-w-[190px]">
                    <div className="font-mono font-bold text-sky-600 dark:text-sky-400">{row.tegParam}</div>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">{row.tegNormal}</div>
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[230px]">{row.clinicalMeaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* CHAPTER 02: INTERACTIVE TEMOGRAM / TEGOGRAM PATTERN ATLAS             */}
      {/* ===================================================================== */}
      <section id="vha-ch2" className="space-y-4 scroll-mt-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Bölüm 02 · İnteraktif TEMogram / TEGogram Atlası
            </div>
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              12 Klinik Koagülopati Paterni &amp; Hedefe Yönelik Tedavi
            </h2>
          </div>

          {/* ROTEM vs TEG Terminology Switch */}
          <div className="flex items-center gap-1.5">
            {(['rotem', 'teg'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setDisplayMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                  displayMode === mode
                    ? mode === 'rotem'
                      ? isDark
                        ? 'bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-200'
                        : 'bg-fuchsia-50 border-fuchsia-400 text-fuchsia-900'
                      : isDark
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                        : 'bg-sky-50 border-sky-400 text-sky-900'
                    : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-400'
                      : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {mode === 'rotem' ? 'ROTEM (EXTEM / FIBTEM)' : 'TEG (CK / CFF)'}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'all', label: 'Tümü (12)' },
              { id: 'core', label: 'Temel & Eksiklikler (6)' },
              { id: 'cpb-drug', label: 'CPB · Heparin / Protamin (2)' },
              { id: 'special', label: 'Özel Senaryolar · DIC · PPH · FXIII (4)' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setPatternFilter(tab.id);
                if (tab.id !== 'all') {
                  const firstInCat = TRACE_PATTERNS.find((p) => p.category === tab.id);
                  if (firstInCat && activePattern.category !== tab.id) {
                    setSelectedPatternId(firstInCat.id);
                  }
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                patternFilter === tab.id
                  ? isDark
                    ? 'bg-slate-100 text-slate-900 border-slate-100'
                    : 'bg-slate-900 text-white border-slate-900'
                  : isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 12 Pattern Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredPatterns.map((p) => {
            const active = p.id === selectedPatternId;
            const dotClass =
              p.severity === 'optimal'
                ? 'bg-emerald-500'
                : p.severity === 'critical'
                  ? 'bg-rose-500'
                  : 'bg-amber-500';
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPatternId(p.id)}
                className={`text-left px-3 py-2 rounded-xl border transition-colors cursor-pointer space-y-0.5 ${
                  active
                    ? isDark
                      ? 'bg-fuchsia-500/15 border-fuchsia-400 text-white'
                      : 'bg-fuchsia-50 border-fuchsia-400 text-fuchsia-950'
                    : isDark
                      ? 'bg-slate-900/70 border-slate-800 text-slate-200 hover:border-slate-700'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold leading-snug">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dotClass}`} />
                  <span className="truncate">{p.label}</span>
                </div>
                <div className={`text-[10.5px] leading-tight truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {p.clinicalContext}
                </div>
              </button>
            );
          })}
        </div>

        {/* Atlas Visual + Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left 7 Cols: Paired Main Channel + Fibrin/Comparator Channel SVG */}
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 overflow-x-auto">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>
                {displayMode === 'rotem' ? 'ROTEM ÇİFT KANAL GÖRÜNÜMÜ' : 'TEG ÇİFT KANAL GÖRÜNÜMÜ'} · {activePattern.label.toUpperCase()}
              </span>
              <span className="text-slate-500">Yatay: Zaman (dk) · Dikey: Amplitüd (mm)</span>
            </div>

            <svg
              viewBox="0 0 360 228"
              className="w-full h-auto min-w-[320px] select-none"
              role="img"
              aria-label={`${activePattern.label} viskoelastik pıhtılaşma eğrisi`}
            >
              {/* TOP CHANNEL: EXTEM / INTEM / CK */}
              <rect x="6" y="6" width="348" height="104" rx="8" fill="#0f172a" stroke="#1e293b" />
              <text x="16" y="21" fill="#e879f9" fontSize="9.5" fontWeight="700" fontFamily="monospace">
                {activePattern.topChannelLabel
                  ? displayMode === 'rotem'
                    ? activePattern.topChannelLabel.rotem
                    : activePattern.topChannelLabel.teg
                  : displayMode === 'rotem'
                    ? 'EXTEM (Ana Ekstrinsik Kanal)'
                    : 'CK / CRT (Ana Kaolin Kanalı)'}
              </text>
              <line x1="16" y1="62" x2="338" y2="62" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
              {/* Reference normal outline (subtle dashed) */}
              <path
                d={buildViscoelasticPath(48, 42, 31, 0.05, 62)}
                fill="none"
                stroke="#64748b"
                strokeOpacity="0.55"
                strokeDasharray="3 3"
                strokeWidth="1.1"
              />
              {/* Active trace */}
              <path
                d={buildViscoelasticPath(activePattern.delayX, activePattern.rampW, activePattern.maxAmp, activePattern.lysisDecay, 62)}
                fill={activePattern.severity === 'optimal' ? '#10b981' : activePattern.severity === 'critical' ? '#f43f5e' : '#f59e0b'}
                fillOpacity="0.28"
                stroke={activePattern.severity === 'optimal' ? '#34d399' : activePattern.severity === 'critical' ? '#fb7185' : '#fbbf24'}
                strokeWidth="2"
              />
              <text x="344" y="102" textAnchor="end" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                Kesikli çizgi: Normal referans
              </text>

              {/* BOTTOM CHANNEL: FIBTEM / CFF OR HEPTEM / APTEM COMPARATOR */}
              <rect x="6" y="118" width="348" height="104" rx="8" fill="#0f172a" stroke="#1e293b" />
              <text
                x="16"
                y="133"
                fill={activePattern.secondaryCompare?.isAbnormal ? '#fbbf24' : '#38bdf8'}
                fontSize="9.5"
                fontWeight="700"
                fontFamily="monospace"
              >
                {activePattern.secondaryCompare
                  ? activePattern.secondaryCompare.label
                  : displayMode === 'rotem'
                    ? 'FIBTEM (Sitokalazin D — Saf Fibrin Sertliği)'
                    : 'CFF (Functional Fibrinogen — Saf Fibrin)'}
              </text>
              <line x1="16" y1="174" x2="338" y2="174" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
              {activePattern.secondaryCompare ? (
                <>
                  {/* Reference normal outline for comparator */}
                  <path
                    d={buildViscoelasticPath(48, 42, 31, 0.05, 174)}
                    fill="none"
                    stroke="#64748b"
                    strokeOpacity="0.45"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <path
                    d={buildViscoelasticPath(
                      activePattern.secondaryCompare.delayX,
                      44,
                      activePattern.secondaryCompare.maxAmp,
                      activePattern.secondaryCompare.lysisDecay,
                      174
                    )}
                    fill={activePattern.secondaryCompare.isAbnormal ? '#f59e0b' : '#10b981'}
                    fillOpacity="0.28"
                    stroke={activePattern.secondaryCompare.isAbnormal ? '#fbbf24' : '#34d399'}
                    strokeWidth="2"
                  />
                </>
              ) : (
                <>
                  {/* Normal FIBTEM outline */}
                  <path
                    d={buildViscoelasticPath(48, 38, 14, 0.04, 174)}
                    fill="none"
                    stroke="#64748b"
                    strokeOpacity="0.55"
                    strokeDasharray="3 3"
                    strokeWidth="1.1"
                  />
                  <path
                    d={buildViscoelasticPath(Math.min(72, activePattern.delayX), 42, activePattern.fibAmp, 0.04, 174)}
                    fill={
                      activePattern.fibAmp < 9
                        ? '#f43f5e'
                        : activePattern.fibAmp > 20
                          ? '#f59e0b'
                          : '#38bdf8'
                    }
                    fillOpacity="0.32"
                    stroke={
                      activePattern.fibAmp < 9
                        ? '#fb7185'
                        : activePattern.fibAmp > 20
                          ? '#fbbf24'
                          : '#38bdf8'
                    }
                    strokeWidth="2"
                  />
                </>
              )}
              <text x="344" y="214" textAnchor="end" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                {activePattern.secondaryCompare
                  ? activePattern.secondaryCompare.isAbnormal
                    ? 'Ayırıcı doğrulama: Kanal düzelmiyor!'
                    : 'Ayırıcı doğrulama: Kanal normale dönüyor'
                  : activePattern.id === 'obstetric-pph'
                    ? 'PPH hedefi: FIBTEM A5 ≥ 12 mm (Fibrinojen > 2.0 g/L)'
                    : 'Hedef: FIBTEM A5 ≥ 10 mm / CFF MA ≥ 14–15 mm'}
              </text>
            </svg>
          </div>

          {/* Right 5 Cols: Live Pattern Readout & Targeted Therapy */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Numeric Strip */}
            <div className={`rounded-xl border p-4 space-y-2.5 ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                {displayMode === 'rotem' ? 'ROTEM Parametre Özeti' : 'TEG Parametre Özeti'}
              </div>
              {displayMode === 'rotem' ? (
                <div className="grid grid-cols-2 gap-2 text-xs font-mono tabular-nums">
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400">EXTEM CT</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activePattern.rotemReadout.extemCt}</div>
                  </div>
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400">EXTEM A5</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activePattern.rotemReadout.extemA5}</div>
                  </div>
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400">FIBTEM A5</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activePattern.rotemReadout.fibtemA5}</div>
                  </div>
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400">EXTEM ML</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activePattern.rotemReadout.ml}</div>
                  </div>
                  {activePattern.rotemReadout.extraChannel && (
                    <div className={`col-span-2 p-2 rounded-lg border text-[11px] ${isDark ? 'bg-slate-950 border-fuchsia-500/40 text-fuchsia-300' : 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-900'}`}>
                      {activePattern.rotemReadout.extraChannel}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 text-xs font-mono tabular-nums">
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400">R Zamanı</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activePattern.tegReadout.r}</div>
                  </div>
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400">α Açısı</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activePattern.tegReadout.alpha}</div>
                  </div>
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400">CK MA</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activePattern.tegReadout.ma}</div>
                  </div>
                  <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] text-slate-400">CFF MA · LY30</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {activePattern.tegReadout.cffMa} · {activePattern.tegReadout.ly30}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dual-Coded Clinical Decision Box */}
            <div
              className={`rounded-xl border p-4 text-xs leading-relaxed space-y-2 ${
                activePattern.severity === 'optimal'
                  ? isDark
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : activePattern.severity === 'critical'
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                    : isDark
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="font-bold text-sm flex items-start gap-1.5">
                {activePattern.severity === 'optimal' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : activePattern.severity === 'critical' ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <span>{activePattern.diagnosis}</span>
              </div>
              <div className="font-semibold">Hedefe Yönelik Tedavi: {activePattern.targetedTherapy}</div>
              <p className="opacity-90">{activePattern.clinicalNote}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* CHAPTER 03: CHANNELS & STEPWISE A5 ALGORITHM                          */}
      {/* ===================================================================== */}
      <section id="vha-ch3" className="space-y-4 scroll-mt-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Bölüm 03 · Test Kanalları &amp; Basamaklı A5 Algoritması
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Hangi Kanal Ne Gösterir ve Hangi Sırayla Düzeltilir?
          </h2>
        </div>

        {/* Ordered 5-Step Goal-Directed Sequence (Görlinger 2019 / ESAIC 2023) */}
        <div
          className={`rounded-xl border p-4 sm:p-5 space-y-2.5 ${
            isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Layers className="w-4 h-4" />
            <span>Görlinger A5 &amp; ESAIC 2023 Sıralı Düzeltme Kuralı (Sırayı Bozma!)</span>
          </div>
          <ol className={`text-xs leading-relaxed space-y-1.5 list-decimal pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <li>
              <strong>Önce Temel Koşullar:</strong> Kor ısı <strong>≥ 36.0 °C</strong>, <strong>pH &gt; 7.20</strong>,{' '}
              <strong>iCa<sup>2+</sup> &gt; 0.90–1.00 mmol/L</strong>, <strong>Hb 7–9 g/dL</strong>.
            </li>
            <li>
              <strong>Önce Hiperfibrinoliz:</strong> Klinik masif kanama veya <strong>ML &gt; %15 / LY30 &gt; %3</strong> (APTEM ile doğrulanır) → <strong>TXA 1 g IV</strong> (ilk 3 saatte!).
            </li>
            <li>
              <strong>Sonra Fibrinojen (Pıhtının Çimentosu):</strong> <strong>FIBTEM A5 &lt; 10 mm</strong> (obstetrikte <strong>&lt; 12 mm</strong>) veya <strong>CFF MA &lt; 14 mm</strong> → <strong>Fibrinojen Konsantresi 2–4 g</strong> veya <strong>10 Ü Kriyopresipitat</strong>.
            </li>
            <li>
              <strong>Sonra Trombosit (Pıhtının Tuğlası):</strong> <strong>EXTEM A5 &lt; 35 mm</strong> (<em>FIBTEM ≥ 10 mm iken!</em>) veya <strong>CK MA &lt; 50 mm</strong> (<em>CFF MA normalken</em>) → <strong>1 Aferez / Havuz Trombosit</strong>.
            </li>
            <li>
              <strong>En Son Trombin / Faktörler &amp; Heparin:</strong> FIBTEM düzeldikten sonra hâlâ <strong>EXTEM CT &gt; 80 sn</strong> veya <strong>TEG R &gt; 10 dk</strong> → <strong>TDP 15–20 mL/kg</strong> veya <strong>4F-PCC</strong>. <strong>INTEM CT &gt; HEPTEM CT</strong> (&gt; 1.25 oran) → <strong>Protamin</strong>.
            </li>
          </ol>
        </div>

        {/* Channels Reference Table */}
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
                <th className="py-2.5 px-4 font-bold">Sistem</th>
                <th className="py-2.5 px-4 font-bold">Kanal</th>
                <th className="py-2.5 px-4 font-bold">Aktivatör / İnhibitör</th>
                <th className="py-2.5 px-4 font-bold">Klinik Görevi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {ASSAY_CHANNELS.map((c) => (
                <tr key={`${c.system}-${c.channel}`} className="align-top">
                  <td className="py-2.5 px-4 font-mono text-[11px] font-bold whitespace-nowrap">
                    <span className={c.system === 'ROTEM' ? 'text-fuchsia-500' : 'text-sky-500'}>{c.system}</span>
                  </td>
                  <td className={`py-2.5 px-4 font-mono font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {c.channel}
                  </td>
                  <td className="py-2.5 px-4 min-w-[200px]">{c.reagent}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[240px]">{c.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* CHAPTER 04: LIMITATIONS & BLIND SPOTS                                 */}
      {/* ===================================================================== */}
      <section id="vha-ch4" className="space-y-4 scroll-mt-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Bölüm 04 · Kör Noktalar &amp; Klinik Sınırlar
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            TEG / ROTEM Neleri Göremez?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {LIMITATIONS.map((item) => (
            <div
              key={item.title}
              className={`rounded-xl border p-4 space-y-1.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-xs font-bold flex items-start gap-1.5 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{item.title}</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* CHAPTER 05: FALLBACK HEMOSTASIS WHEN TEG / ROTEM IS UNAVAILABLE       */}
      {/* ===================================================================== */}
      <section id="vha-ch5" className="space-y-4 scroll-mt-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Bölüm 05 · Alternatif Pratik Yönetim &amp; Kanıtlar
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            TEG / ROTEM Mümkün Değilse Hemostaz Yönetimi Nasıl Yapılır?
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Viskoelastik test cihazı bulunmayan merkezlerde veya acil nöbet şartlarında kanıta dayalı yönetim,{' '}
            <strong>ön koşulların korunması + erken TXA + aktif masif kanamada 1:1:1 dengeli paket + konvansiyonel
            laboratuvar (özellikle Clauss Fibrinojen) rehberliği</strong> üzerine kurulur (ESAIC 2023 · Rossaint 2023).
          </p>
        </div>

        {/* 3 Immediate Actions Without Waiting for Lab */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div
            className={`rounded-xl border p-4 space-y-1.5 ${
              isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
            }`}
          >
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>1. Laboratuvar Bekleme (45–60 dk!)</span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Klasik PT/INR, aPTT ve Clauss fibrinojen sonuçları en az 45–60 dk sürer. Kontrolsüz masif kanamada sonuç
              beklemeden <strong>MTP 1:1:1 (ES : TDP : Trombosit)</strong> dengeli paketini başlatın; kanama yavaşlayıp
              lab gelince hedefe yönelik tedaviye dönün.
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 space-y-1.5 ${
              isDark ? 'bg-amber-950/20 border-amber-500/35' : 'bg-amber-50/70 border-amber-200'
            }`}
          >
            <div className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <TestTube2 className="w-4 h-4 shrink-0" />
              <span>2. Erken Ampirik TXA (İlk 3 Saat)</span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Hiperfibrinolizi gösterecek ROTEM/TEG yoksa majör travma, obstetrik kanama (PPH) veya yüksek riskli majör
              cerrahide ilk 3 saatte ampirik <strong>TXA 1 g IV (10 dk) + 1 g / 8 sa</strong> uygulayın (CRASH-2 / WOMAN).
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 space-y-1.5 ${
              isDark ? 'bg-emerald-950/20 border-emerald-500/35' : 'bg-emerald-50/70 border-emerald-200'
            }`}
          >
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 shrink-0" />
              <span>3. Ölümcül Dörtlü &amp; Saha Gözlemi</span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Aktif ısıtma (<strong>≥ 36 °C</strong>), asidoz kontrolü (<strong>pH &gt; 7.20</strong>) ve her 4 Ü üründe{' '}
              <strong>IV Kalsiyum</strong> (iCa<sup>2+</sup> &gt; 1.0 mmol/L) sağlayın; cerrahla sahadaki pıhtı kalitesini ve
              kateter girişlerinde sızıntıyı düzenli değerlendirin.
            </p>
          </div>
        </div>

        {/* Conventional Lab Guided Thresholds Table */}
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
                <th className="py-2.5 px-4 font-bold">Hedef Komponent</th>
                <th className="py-2.5 px-4 font-bold">İstenecek Konvansiyonel Test</th>
                <th className="py-2.5 px-4 font-bold">Müdahale Eşiği (ESAIC / Rossaint 2023)</th>
                <th className="py-2.5 px-4 font-bold">Tedavi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {FALLBACK_CONVENTIONAL_TABLE.map((row) => (
                <tr key={row.target} className="align-top">
                  <td className={`py-2.5 px-4 font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.target}
                  </td>
                  <td className="py-2.5 px-4 font-medium min-w-[175px]">{row.labTest}</td>
                  <td className="py-2.5 px-4 font-mono text-[11px] font-bold text-rose-600 dark:text-rose-400 min-w-[200px]">
                    {row.threshold}
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[230px]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Conventional Test Pitfalls Box */}
        <div
          className={`rounded-xl border p-4 space-y-1.5 text-xs leading-relaxed ${
            isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
            <FlaskConical className="w-4 h-4 shrink-0" />
            <span>Konvansiyonel Koagülasyon Testlerini Yorumlarken 4 Kritik Kural</span>
          </div>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <strong>PT / aPTT yalnızca ilk %4–5 trombin fazını ölçer:</strong> Pıhtı sağlamlığını, trombosit fonksiyonunu ve hiperfibrinolizi göstermez.
            </li>
            <li>
              <strong>Rutin panele mutlaka Clauss Fibrinojen ekle:</strong> Kanamada ilk düşen faktör fibrinojendir; yalnızca INR/aPTT bakarak hipofibrinojenemi atlanır.
            </li>
            <li>
              <strong>Aktif kanama yoksa hafif yüksek INR (1.3–1.6) için TDP VERME:</strong> TDP’nin kendi INR’si zaten ~1.1–1.3’tür; gereksiz TDP yalnızca TACO/TRALI riskini artırır.
            </li>
            <li>
              <strong>Antikoagülan öyküsünü preop netleştir:</strong> VKA/Warfarin’de acil dönüş <strong>4F-PCC + IV K Vitamini</strong>, Dabigatran’da <strong>İdarusizumab</strong>, Xa inhibitörlerinde (Apiksaban/Rivaroksaban) <strong>Andeksanet alfa veya 4F-PCC</strong> ile yapılır.
            </li>
          </ul>
        </div>

        {/* Verified PubMed References */}
        <div
          className={`rounded-xl border p-4 space-y-2.5 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            <BookOpen className="w-3.5 h-3.5 text-fuchsia-500" />
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
        </div>
      </section>
    </div>
  );
};
