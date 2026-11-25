import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Droplets,
  ExternalLink,
  Flame,
  GitBranch,
  HeartPulse,
  Layers,
  Play,
  ShieldAlert,
  Stethoscope,
  Table2,
  Wind,
  XCircle,
  Zap
} from 'lucide-react';
import type { DiureticId } from './NephronDiureticsAnimator';

export interface NephronDiureticsClinicalMatrixProps {
  isDark: boolean;
  selectedDiuretic: DiureticId;
  onSelectDiuretic: (id: DiureticId) => void;
  onJumpToAnimation?: (id: DiureticId) => void;
}

type ScenarioAccent = 'sky' | 'indigo' | 'amber' | 'emerald' | 'teal' | 'violet' | 'rose';

interface DiureticMeta {
  shortName: string;
  classLabel: string;
  segment: string;
  pillDark: string;
  pillLight: string;
}

const DIURETIC_META: Partial<Record<DiureticId, DiureticMeta>> = {
  loop: {
    shortName: 'Loop (Furosemid)',
    classLabel: 'Loop Diüretik · NKCC2',
    segment: 'Henle Çıkan Kalın Kol (TAL)',
    pillDark: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    pillLight: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  thiazide: {
    shortName: 'Tiyazid (HCTZ / Metolazon)',
    classLabel: 'Tiyazid · NCC Blokeri',
    segment: 'Distal Kıvrımlı Tübül (DCT)',
    pillDark: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    pillLight: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  osmotic: {
    shortName: 'Ozmotik (Mannitol)',
    classLabel: 'Ozmotik Diüretik',
    segment: 'PCT + İnen İnce Henle',
    pillDark: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    pillLight: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  ksparing: {
    shortName: 'K⁺-Tutucu (Spironolakton)',
    classLabel: 'MRA / ENaC Blokeri',
    segment: 'Geç DCT / Toplayıcı Kanal',
    pillDark: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    pillLight: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  cai: {
    shortName: 'KA İnh. (Asetazolamid)',
    classLabel: 'Karbonik Anhidraz İnhibitörü',
    segment: 'Proksimal Kıvrımlı Tübül (PCT)',
    pillDark: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    pillLight: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  vaptan: {
    shortName: 'Vaptan (Tolvaptan)',
    classLabel: 'V2 Reseptör Antagonisti',
    segment: 'Toplayıcı Kanal (AQP2)',
    pillDark: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    pillLight: 'bg-violet-50 text-violet-700 border-violet-200'
  }
};

interface ClinicalScenario {
  id: string;
  shortTitle: string;
  title: string;
  domain: string;
  accent: ScenarioAccent;
  primaryDiureticId: DiureticId;
  secondaryDiureticIds?: DiureticId[];
  icon: 'heart' | 'layers' | 'brain' | 'droplets' | 'wind' | 'activity' | 'stethoscope';
  pathophysiologyOrRuleLabel: string;
  pathophysiologyOrRule: string;
  firstLineLabel: string;
  firstLine: string;
  secondLineLabel: string;
  secondLine: string;
  monitoringLabel: string;
  monitoring: string;
  avoidLabel: string;
  avoid: string;
  quickSummary: {
    firstChoice: string;
    keyThreshold: string;
    avoidShort: string;
  };
  evidenceBadges: string[];
}

const CLINICAL_SCENARIOS: ClinicalScenario[] = [
  {
    id: 'adhf',
    shortTitle: 'ADKY & Pulmoner Ödem',
    title: 'Akut Dekompanse Kalp Yetmezliği (ADKY) & Akut Pulmoner Ödem',
    domain: 'Kardiyoloji · YBÜ',
    accent: 'sky',
    primaryDiureticId: 'loop',
    secondaryDiureticIds: ['cai', 'thiazide'],
    icon: 'heart',
    pathophysiologyOrRuleLabel: 'Erken Yanıt Testi (ESC HFA 2019)',
    pathophysiologyOrRule:
      'İlk IV loop dozundan 2 saat sonra spot idrar Na⁺ <50–70 mEq/L VEYA ilk 6 saatte idrar çıkışı <100–150 mL/sa ise yetersiz natriürez vardır → Loop dozunu gecikmeden 2× artırın.',
    firstLineLabel: '1. Basamak Strateji',
    firstLine:
      'IV Loop Diüretik (Furosemid): Diüretik-naif hastada 20–40 mg IV; kronik oral loop kullanıcıda oral günlük dozun 1–2,5× katı IV bolus veya infüzyon (DOSE / ESC 2021).',
    secondLineLabel: '2. Basamak (Direnç / Yetersiz Dekonjesyon)',
    secondLine:
      'Loop yanıtı yetersizse ardışık nefron blokajı ekleyin: IV Asetazolamid 500 mg/gün × 3 gün (ADVOR, NEJM 2022) veya Tiyazid — HCTZ / Metolazon (CLOROTIC, EHJ 2023).',
    monitoringLabel: 'Kritik İzlem',
    monitoring:
      '2. saat spot idrar Na⁺ (>50–70 mEq/L hedef), saatlik idrar çıkışı, 12 saatlik K⁺ / Mg²⁺ / kreatinin, akciğer USG B-çizgileri ve net sıvı dengesi.',
    avoidLabel: 'Kesin Kaçınılacak',
    avoid:
      'Mannitol — akut intravasküler hacim genişlemesi yaparak sol ventrikül dolum basıncını ve akut akciğer ödemini ölümcül biçimde kötüleştirir!',
    quickSummary: {
      firstChoice: 'IV Furosemid (naif 20–40 mg; kronik 1–2,5× oral)',
      keyThreshold: '2. sa idrar Na⁺ <50–70 mEq/L → 2× doz',
      avoidShort: 'Mannitol (akciğer ödemini ağırlaştırır)'
    },
    evidenceBadges: ['ESC 2021 / 2023', 'ESC HFA 2019', 'DOSE', 'ADVOR', 'CLOROTIC']
  },
  {
    id: 'resistance',
    shortTitle: 'Diüretik Direnci & KRS',
    title: 'Diüretik Direnci & Kardiyorenal Sendrom (Ardışık Nefron Blokajı)',
    domain: 'Kardiyorenal · YBÜ',
    accent: 'indigo',
    primaryDiureticId: 'thiazide',
    secondaryDiureticIds: ['loop', 'cai'],
    icon: 'layers',
    pathophysiologyOrRuleLabel: 'Patofizyoloji (Nefron Adaptasyonu)',
    pathophysiologyOrRule:
      'Kronik loop maruziyeti sonrası proksimal tübülde Na⁺ geri emilimi artar (frenleme fenomeni) ve distal kıvrımlı tübül (DCT) hücre hipertrofisi ile NCC taşıyıcı upregülasyonu gelişir.',
    firstLineLabel: '1. Basamak Optimizasyon + Kombinasyon',
    firstLine:
      'IV Loop optimizasyonu (yüksek doz bolus veya sürekli infüzyon 5–20 mg/sa) + Asetazolamid 500 mg IV (proksimal blokaj — ADVOR) veya Tiyazid (distal blokaj — CLOROTIC).',
    secondLineLabel: 'Distal Blokaj Zamanlaması (Püf Noktası)',
    secondLine:
      'HCTZ 25–100 mg PO veya Metolazon 2,5–5 mg PO, IV loop dozundan 30–60 dakika önce uygulanır; böylece TAL sonrası distale ulaşan yüksek Na⁺ yükü DCT’de bloke edilir.',
    monitoringLabel: 'Kritik Elektrolit & Renal İzlem',
    monitoring:
      '12 saatte bir K⁺, Mg²⁺, Na⁺ ve kreatinin takibi; agresif K⁺ ve Mg²⁺ replasmanı. Aşırı intravasküler deplesyon ve prerenal azotemiye dikkat.',
    avoidLabel: 'Kaçınılacaklar & Tuzaklar',
    avoid:
      'Yakın elektrolit izlemi olmadan yüksek doz tiyazid eklemek (derin hipokalemi/hiponatremi), NSAİİ kullanımı ve hipoalbüminemi/hipoperfüzyonu göz ardı etmek.',
    quickSummary: {
      firstChoice: 'IV Loop (5–20 mg/sa) + Asetazolamid / Tiyazid',
      keyThreshold: 'Tiyazid loop’tan 30–60 dk önce; 12 sa K⁺/Mg²⁺',
      avoidShort: 'İzlemsiz yüksek doz tiyazid · NSAİİ'
    },
    evidenceBadges: ['ADVOR 2022', 'CLOROTIC 2023', 'DOSE 2011', 'ESC HFA 2019']
  },
  {
    id: 'icp',
    shortTitle: 'KİBAS & Beyin Ödemi',
    title: 'KİBAS & Akut Beyin Ödemi (Nöroanestezi / Nöro-YBÜ)',
    domain: 'Nöroanestezi · Nöro-YBÜ',
    accent: 'amber',
    primaryDiureticId: 'osmotic',
    icon: 'brain',
    pathophysiologyOrRuleLabel: 'Ajan Seçim Kuralı (NCS 2020)',
    pathophysiologyOrRule:
      'Sağlam kan-beyin bariyeri boyunca ozmotik gradiyent oluşturarak beyin parankiminden su çeker. Hipotansif veya hipovolemik hastada Hipertonik Salin (HTS) Mannitol’e tercih edilir!',
    firstLineLabel: '1. Basamak Osmoterapi (NCS 2020)',
    firstLine:
      'Mannitol %20: 0,25–1 g/kg IV (15–20 dk infüzyon) VEYA Hipertonik Salin (%3 veya %23,4 santral yoldan). Hemodinamik instabilitede ilk seçenek HTS’dir.',
    secondLineLabel: 'Övolemi & Hemodinami Koruması',
    secondLine:
      'Mannitol sonrası yoğun ozmotik diürez gelişir; serebral perfüzyon basıncını (CPP) korumak için idrar kaybını izotonik SF ile karşılayarak övolemiyi koruyun.',
    monitoringLabel: 'Güvenlik Sınırları & İzlem',
    monitoring:
      'Serum osmolarite <320 mOsm/kg ve özellikle osmolar gap <20 mOsm/kg tutulmalıdır (ABH ve kan-beyin bariyerine sızma sonucu rebound ödem önleme).',
    avoidLabel: 'Kesin Kaçınılacak',
    avoid:
      'Hipotonik sıvılar (beyin ödemini artırır); anürik ABH veya dekompanse KKY’de Mannitol (akut hacim yüklenmesi ve ozmotik nefroz riski).',
    quickSummary: {
      firstChoice: 'Mannitol %20 0,25–1 g/kg IV veya HTS (%3/%23,4)',
      keyThreshold: 'Osmolarite <320 · Osmolar gap <20 mOsm/kg',
      avoidShort: 'Hipotonik sıvılar · Anürik ABH/KKY’de Mannitol'
    },
    evidenceBadges: ['NCS 2020 Kılavuzu']
  },
  {
    id: 'cirrhosis',
    shortTitle: 'Siroz & Asit Yönetimi',
    title: 'Karaciğer Sirozu & Asit Yönetimi',
    domain: 'Hepatoloji · Perioperatif',
    accent: 'emerald',
    primaryDiureticId: 'ksparing',
    secondaryDiureticIds: ['loop'],
    icon: 'droplets',
    pathophysiologyOrRuleLabel: 'EASL 2018 — 100:40 Altın Oranı',
    pathophysiologyOrRule:
      'Sirozda splanknik vazodilatasyon belirgin sekonder hiperaldosteronizme yol açar. Spironolakton 100 mg + Furosemid 40 mg (100:40 oranı) natriürezi maksimize ederken normokalemiyi korur.',
    firstLineLabel: '1. Basamak Kombinasyon (EASL 2018)',
    firstLine:
      'Spironolakton 100 mg/gün + Furosemid 40 mg/gün ile başlayın; yanıta göre 3–5 günde bir aynı 100:40 oranıyla kademeli olarak maksimum 400 mg : 160 mg/gün’e çıkın.',
    secondLineLabel: 'Günlük Kilo Kaybı Hedefleri',
    secondLine:
      'İntravasküler volüm deplesyonunu ve hepatorenal sendromu önlemek için günlük kilo kaybı periferik ödem yoksa ≤0,5 kg/gün, periferik ödem varsa ≤1 kg/gün ile sınırlandırılır.',
    monitoringLabel: 'Kesme Kriterleri & İzlem',
    monitoring:
      'Serum Na⁺ <125 mEq/L, K⁺ >6 mEq/L, akut böbrek hasarı veya hepatik ensefalopati gelişiminde diüretikleri derhal kesin; günlük tartı ve elektrolit izleyin.',
    avoidLabel: 'Kesin Kaçınılacak',
    avoid:
      'Asetazolamid (idrarı alkalileştirip NH₃ atılımını azaltarak hepatik ensefalopatiyi tetikler!) ve NSAİİ’ler (prostaglandin inhibisyonu → ABH / hepatorenal sendrom).',
    quickSummary: {
      firstChoice: 'Spironolakton 100 mg + Furosemid 40 mg (maks 400:160)',
      keyThreshold: 'Kilo kaybı ≤0,5 (ödemli ≤1) kg/gün · Na⁺ <125 kes',
      avoidShort: 'Asetazolamid (ensefalopati!) · NSAİİ'
    },
    evidenceBadges: ['EASL 2018 Kılavuzu']
  },
  {
    id: 'alkalosis',
    shortTitle: 'Metabolik Alkaloz (YBÜ)',
    title: 'Post-Diüretik / YBÜ Metabolik Alkalozu (Weaning Zorluğu)',
    domain: 'YBÜ Asit-Baz · Ventilasyon',
    accent: 'teal',
    primaryDiureticId: 'cai',
    icon: 'wind',
    pathophysiologyOrRuleLabel: 'Klinik Gerekçe (Ventilatör Weaning)',
    pathophysiologyOrRule:
      'Agresif loop/tiyazid diürezine bağlı kontraksiyon ve hipokloremik metabolik alkaloz, santral solunum dürtüsünü baskılayarak kompansatuvar hipoventilasyon ve ekstübasyon/weaning başarısızlığına yol açar.',
    firstLineLabel: '1. Basamak: Önce Cl⁻ ve K⁺ Düzeltmesi',
    firstLine:
      'İlk adım Klorür (SF) ve Potasyum (KCl) açığını kapatmaktır. Hacim yükü sürüyorsa ve pH >7,48–7,50 + HCO₃⁻ >32 mEq/L devam ediyorsa Asetazolamid 250–500 mg IV/PO q12–24h × 1–3 gün ekleyin.',
    secondLineLabel: 'Fizyolojik Etki (Proksimal HCO₃⁻ Atılımı)',
    secondLine:
      'Proksimal tübülde karbonik anhidraz inhibisyonu bikarbonatüri oluşturur; metabolik alkalozu düzelterek solunum dürtüsünü ve oksijen-hemoglobin dissosiasyon eğrisini normalize eder.',
    monitoringLabel: 'Kritik İzlem',
    monitoring:
      'Arteriyel kan gazı (pH, HCO₃⁻, PaCO₂), serum K⁺ (distal Na⁺/HCO₃⁻ artışı hipokalemiyi derinleştirebilir!) ve solunum mekaniği / weaning yanıtı.',
    avoidLabel: 'Kaçınılacak & Dikkat Edilecekler',
    avoid:
      'Siroz / hepatik ensefalopati (kesin kontrendike), ciddi hipokalemi düzeltilmeden uygulama; ağır hiperkapnik solunum kas yorgunluğunda dikkatli kullanım.',
    quickSummary: {
      firstChoice: 'Cl⁻/K⁺ replasmanı → Asetazolamid 250–500 mg q12–24h',
      keyThreshold: 'Hacim yükü + pH >7,48–7,50 + HCO₃⁻ >32 mEq/L',
      avoidShort: 'Siroz/ensefalopati · Düzeltilmemiş ağır hipokalemi'
    },
    evidenceBadges: ['ADVOR Mekanizma', 'YBÜ Asit-Baz Prensibi']
  },
  {
    id: 'siadh',
    shortTitle: 'SIADH & Hiponatremi',
    title: 'SIADH & Hipervolemik Hiponatremi (Serbest Su Fazlalığı)',
    domain: 'Sıvı-Elektrolit · YBÜ',
    accent: 'violet',
    primaryDiureticId: 'vaptan',
    secondaryDiureticIds: ['loop'],
    icon: 'activity',
    pathophysiologyOrRuleLabel: 'SERT GÜVENLİK SINIRI — ODS Koruması',
    pathophysiologyOrRule:
      'Hızlı Na⁺ yükselişi Ozmotik Demiyelinizasyon Sendromuna (ODS) yol açar! İlk 24 saatte ΔNa⁺ ≤ 8–10 mmol/L (yüksek riskli hastada ≤6–8 mmol/L) sınırını kesinlikle aşmayın.',
    firstLineLabel: '1. Basamak Yönetim (ESICM / Spasovski 2014)',
    firstLine:
      'Akut ağır semptomatik hiponatremide (nöbet/koma) derhal %3 Hipertonik Salin 150 mL IV (20 dk). Kronik SIADH’da sıvı kısıtlaması + oral üre/tuz + düşük doz loop diüretik.',
    secondLineLabel: 'Seçilmiş Refrakter Olgular (Vaptan)',
    secondLine:
      'Tolvaptan (15 mg/gün başlangıç) yalnızca hastane ortamında başlanır ve başlandığında sıvı kısıtlaması kaldırılır (aşırı hızlı düzelmeyi önlemek için susama yanıtına izin verilir).',
    monitoringLabel: 'Yakın Na⁺ & Akuarez İzlemi',
    monitoring:
      'İlk 24 saatte 4–6 saatte bir serum Na⁺ ve saatlik idrar çıkışı. Hedef aşımı riskinde %5 Dekstroz infüzyonu ve/veya desmopressin ile frenleme hazır bulundurulmalıdır.',
    avoidLabel: 'Kesin Kaçınılacak',
    avoid:
      'Hipovolemik hiponatremide Vaptan (hipovolemik şok ve akut böbrek hasarı!) ve Tiyazid diüretikler (serbest su klirensini bozarak hiponatremiyi dramatik biçimde ağırlaştırır!).',
    quickSummary: {
      firstChoice: 'Ağır semptom: %3 HTS 150 mL IV · Refrakter: Tolvaptan 15 mg',
      keyThreshold: 'SERT SINIR: İlk 24 sa ΔNa⁺ ≤ 8–10 mmol/L (ODS!)',
      avoidShort: 'Hipovolemide Vaptan · Tiyazid (hiponatremi ↑)'
    },
    evidenceBadges: ['ESICM / ESE / ERA-EDTA 2014']
  },
  {
    id: 'aki',
    shortTitle: 'ABH & Oligüri (KDIGO)',
    title: 'Akut Böbrek Hasarı (ABH) & Oligüri Değerlendirmesi',
    domain: 'Nefroloji · Perioperatif YBÜ',
    accent: 'rose',
    primaryDiureticId: 'loop',
    icon: 'stethoscope',
    pathophysiologyOrRuleLabel: 'KDIGO Altın Kuralı',
    pathophysiologyOrRule:
      'Diüretikler ABH’yi ÖNLEMEZ ve TEDAVİ ETMEZ! Oligürik ABH’yi zorla non-oligürik hale getirmek renal iyileşmeyi hızlandırmaz ve mortaliteyi azaltmaz.',
    firstLineLabel: 'Doğru Endikasyon (Yalnızca Hacim Yükü)',
    firstLine:
      'Diüretikler ABH’de yalnızca klinik hacim yükü / pulmoner konjesyon yönetiminde kullanılır. Önce volüm durumu, MAP ≥65 mmHg perfüzyonu ve postrenal obstrüksiyon dışlanmalıdır.',
    secondLineLabel: 'Furosemid Stres Testi (FST — Prognostik)',
    secondLine:
      'Övolemik erken evre ABH’de FST: 1,0 mg/kg IV (diüretik-naif) veya 1,5 mg/kg IV (kronik kullanıcı). 2 saatte <200 mL idrar çıkışı progresif Evre 3 ABH ve RRT ihtiyacının güçlü öngörücüsüdür.',
    monitoringLabel: 'İzlem & RRT Hazırlığı',
    monitoring:
      '2 saatlik FST idrar yanıtı, K⁺, asit-baz durumu, üremi, sıvı yükü ve acil RRT endikasyonları (dirençli hiperkalemi, ağır metabolik asidoz, diüretiğe yanıtsız pulmoner ödem).',
    avoidLabel: 'Kesin Kaçınılacak',
    avoid:
      'Hipovolemik veya prerenal oligüride yüksek doz Furosemid ya da Mannitol uygulaması (renal medüller iskemiyi ve akut tübüler nekrozu ağırlaştırır; nefrotoksik etki).',
    quickSummary: {
      firstChoice: 'Yalnızca hacim yükü + FST (1,0–1,5 mg/kg IV)',
      keyThreshold: 'FST 2 sa <200 mL = progresif ABH / RRT riski',
      avoidShort: 'Hipovolemik/prerenal oligüride yüksek doz Loop/Mannitol'
    },
    evidenceBadges: ['KDIGO ABH Prensibi', 'Furosemid Stres Testi']
  }
];

interface SynergyCard {
  id: string;
  title: string;
  badge: string;
  segments: string;
  drugA: { label: string; id: DiureticId };
  drugB: { label: string; id: DiureticId };
  regimen: string;
  rationale: string;
  outcome: string;
  caution: string;
  accent: 'teal' | 'indigo' | 'emerald' | 'sky';
}

const SYNERGY_COMBINATIONS: SynergyCard[] = [
  {
    id: 'loop-cai',
    title: 'Loop + Asetazolamid (Proksimal + Henle Blokajı)',
    badge: 'ADVOR · NEJM 2022',
    segments: 'PCT + TAL',
    drugA: { label: 'Furosemid IV', id: 'loop' },
    drugB: { label: 'Asetazolamid 500 mg IV', id: 'cai' },
    regimen: 'Standart IV Loop + Asetazolamid 500 mg IV/gün × 3 gün',
    rationale:
      'Proksimal tübüldeki Na⁺ ve HCO₃⁻ geri emilimini keserek loop diüretiklerin etkinliğini artırır ve kontraksiyon metabolik alkalozunu önler.',
    outcome: 'ADKY’de başarılı dekonjesyon oranını %46 artırır (RR 1,46; p<0,001), hastanede kalış süresini kısaltır.',
    caution: 'Siroz/hepatik ensefalopatide kullanmayın; metabolik asidoz ve hipokalemi açısından kan gazı/K⁺ izleyin.',
    accent: 'teal'
  },
  {
    id: 'loop-thiazide',
    title: 'Loop + Tiyazid (Ardışık Distal Nefron Blokajı)',
    badge: 'CLOROTIC · EHJ 2023',
    segments: 'TAL + DCT',
    drugA: { label: 'Furosemid IV', id: 'loop' },
    drugB: { label: 'HCTZ / Metolazon', id: 'thiazide' },
    regimen: 'Furosemid IV + HCTZ 25–100 mg PO (veya Metolazon 2,5–5 mg, loop’tan 30–60 dk önce)',
    rationale:
      'Kronik loop maruziyetine bağlı gelişen distal tübül (DCT) hücre hipertrofisini ve NCC taşıyıcı upregülasyonunu kırarak güçlü natriürez sağlar.',
    outcome: 'CLOROTIC çalışmasında 72 saatlik kilo kaybını ve 24 saatlik diürez yanıtını anlamlı düzeyde artırmıştır.',
    caution: 'K⁺, Na⁺ ve kreatinin yakın izlemi şarttır! Hipokalemi, hiponatremi ve böbrek fonksiyon bozulması riski yüksektir.',
    accent: 'indigo'
  },
  {
    id: 'spiro-loop',
    title: 'Spironolakton + Furosemid (Siroz 100:40 Oranı)',
    badge: 'EASL 2018 Kılavuzu',
    segments: 'TAL + Toplayıcı Kanal',
    drugA: { label: 'Spironolakton 100 mg', id: 'ksparing' },
    drugB: { label: 'Furosemid 40 mg', id: 'loop' },
    regimen: '100 mg : 40 mg/gün başlangıç → 3–5 günde bir kademeli artış (maks 400 : 160 mg/gün)',
    rationale:
      'Siroz asitinde baskın mekanizma olan sekonder hiperaldosteronizmi bloke eder; loop kaynaklı K⁺ kaybını dengeleyerek normokalemiyi korur.',
    outcome: 'Tek başına spironolaktona göre daha hızlı asit mobilizasyonu ve daha dengeli potasyum profili sağlar.',
    caution: 'Kilo kaybı hedefi ≤0,5 kg/gün (ödemli ≤1 kg/gün); Na⁺ <125, K⁺ >6 veya ensefalopatide derhal kesin.',
    accent: 'emerald'
  },
  {
    id: 'loop-mra',
    title: 'Loop + MRA / ENaC Blokeri (K⁺ Koruyucu Sinerji)',
    badge: 'ESC HF Kılavuzu',
    segments: 'TAL + Esas Hücre',
    drugA: { label: 'Loop Diüretik', id: 'loop' },
    drugB: { label: 'MRA / Amilorid', id: 'ksparing' },
    regimen: 'Loop Diüretik + Spironolakton / Eplerenon (HFrEF hedef dozu) veya seçilmiş olgularda Amilorid',
    rationale:
      'Distal aldosteron kaynaklı Na⁺ geri emilimini ve K⁺/H⁺ sekresyonunu durdurarak loop kaynaklı hipokalemi ve hipomagnezemiyi engeller.',
    outcome: 'HFrEF hastalarında kanıtlanmış prognostik mortalite ve rehospitalizasyon azalması (sınıf I öneri).',
    caution: 'ACEi/ARB/ARNI ile eşzamanlı kullanımda eGFR ve K⁺ (özellikle K⁺ >5,0–5,5 mEq/L) yakın takip gerektirir.',
    accent: 'sky'
  }
];

interface DangerousInteraction {
  id: string;
  pair: string;
  riskTag: string;
  mechanism: string;
  clinicalAction: string;
}

const DANGEROUS_INTERACTIONS: DangerousInteraction[] = [
  {
    id: 'otonephro',
    pair: 'Loop + Aminoglikozid / Sisplatin / Vankomisin',
    riskTag: 'Ototoksisite & Nefrotoksisite',
    mechanism: 'İç kulak stria vaskülariste NKCC1 inhibisyonu + renal tübüler hasar ile sinerjik ototoksisite ve nefrotoksisite.',
    clinicalAction: 'Hızlı yüksek doz IV bolus furosemidden kaçının (≤4 mg/dk infüzyon); ilaç düzeyleri ve böbrek fonksiyonlarını izleyin.'
  },
  {
    id: 'hyperkalemia',
    pair: 'K⁺-Tutucu + ACEi / ARB / ARNI / KCl / Trimetoprim',
    riskTag: 'Ölümcül Hiperkalemi',
    mechanism: 'Aldosteron baskılanması + ENaC blokajı (trimetoprim amilorid benzeri etki gösterir) ile potasyum atılımı durur — özellikle eGFR <30–45 mL/dk’da kritik.',
    clinicalAction: 'KCl suplementasyonunu gözden geçirin, seri K⁺ ve EKG (sivri T, QRS genişlemesi) izleyin.'
  },
  {
    id: 'lithium',
    pair: 'Tiyazid / Loop + Lityum',
    riskTag: 'Lityum Toksisitesi',
    mechanism: 'Hacim deplesyonu proksimal tübülde kompansatuvar Na⁺ geri emilimini artırır; Lityum Na⁺ ile paralel geri emilerek toksik düzeylere çıkar.',
    clinicalAction: 'Tiyazidlerle etki en şiddetlidir; zorunluysa Lityum dozunu azaltın ve serum düzeyini sık takip edin.'
  },
  {
    id: 'digoxin',
    pair: 'Tiyazid / Loop + Digoksin',
    riskTag: 'Ventriküler Aritmi',
    mechanism: 'Diüretik kaynaklı hipokalemi ve hipomagnezemi, Digoksin’in miyokardiyal Na⁺/K⁺-ATPaz bağlanmasını güçlendirir.',
    clinicalAction: 'Serum K⁺ ≥4,0 mEq/L ve Mg²⁺ ≥2,0 mg/dL düzeyinde tutun; bradiaritmi / ektopi açısından monitörize edin.'
  },
  {
    id: 'nsaid',
    pair: 'Loop / Tiyazid + NSAİİ (İbuprofen, Diklofenak, Ketorolak)',
    riskTag: 'Diüretik Direnci & "Triple Whammy" ABH',
    mechanism: 'Renal afferent arteriyolde vazodilatör PGE₂ sentezini bloke ederek GFR’yi ve tübüler diüretik sekresyonunu düşürür.',
    clinicalAction: 'Perioperatif analjezide riskli hastalarda (KKY, KBH, siroz, ACEi/ARB kullananlar) NSAİİ’den kesinlikle kaçının.'
  }
];

interface GuidelineHighlight {
  badge: string;
  title: string;
  keyTakeaway: string;
  accent: 'sky' | 'teal' | 'amber' | 'emerald';
}

const GUIDELINE_HIGHLIGHTS: GuidelineHighlight[] = [
  {
    badge: 'ESC 2021 / 2023 & HFA 2019',
    title: 'Objektif Natriürez Kılavuzlu Dekonjesyon',
    keyTakeaway:
      'Klinik gözlem yerine 2. saat spot idrar Na⁺ (<50–70 mEq/L) ve 6. saat idrar debisi (<100–150 mL/sa) ile erken loop doz titrasyonu yapılmalıdır.',
    accent: 'sky'
  },
  {
    badge: 'ADVOR 2022 & CLOROTIC 2023',
    title: 'Dirençte Erken Ardışık Nefron Blokajı',
    keyTakeaway:
      'Yüksek doz IV loop’a Asetazolamid 500 mg IV (ADVOR) veya HCTZ (CLOROTIC) eklenmesi dekonjesyon başarısını ve 72 saatlik sıvı/kilo kaybını anlamlı artırır.',
    accent: 'teal'
  },
  {
    badge: 'NCS 2020 & ESICM 2014',
    title: 'Nöro-Kritik Osmoterapi & ODS Koruması',
    keyTakeaway:
      'KİBAS’ta hipotansif hastada HTS tercih edilir; Mannitol’de osmolar gap <20 mOsm/kg tutulur. Hiponatremide ilk 24 sa ΔNa⁺ ≤8–10 mmol/L sert sınırdır.',
    accent: 'amber'
  },
  {
    badge: 'EASL 2018 & DOSE 2011',
    title: 'Sirozda 100:40 Oranı · ADKY’de Yüksek Doz Loop',
    keyTakeaway:
      'Siroz asitinde Spironolakton:Furosemid 100:40 oranı normokalemiyi korur. DOSE’ta yüksek doz IV loop daha hızlı dekonjesyon sağlar; bolus vs infüzyon eşdeğerdir.',
    accent: 'emerald'
  }
];

interface VerifiedReference {
  num: number;
  title: string;
  tag: string;
  tagColor: 'sky' | 'teal' | 'indigo' | 'emerald' | 'amber' | 'violet';
  citation: string;
  journal: string;
  pmids: string[];
  doi?: string;
  clinicalNote: string;
}

const VERIFIED_REFERENCES: VerifiedReference[] = [
  {
    num: 1,
    title: 'ESC 2021 / 2023 Focused Update — Heart Failure Guidelines',
    tag: 'ESC Kılavuzu',
    tagColor: 'sky',
    citation: 'McDonagh TA, Metra M, Adamo M, et al.',
    journal: 'Eur Heart J. 2021;42(36):3599–3726 & 2023 Focused Update',
    pmids: ['34447992', '37622666'],
    clinicalNote: 'ADKY’de 1. basamak IV loop dozlama stratejisi, HFrEF’de MRA sınıf I önerisi ve dekonjesyon yönetimi.'
  },
  {
    num: 2,
    title: 'ESC HFA Diuretic Position Statement (Spot İdrar Na⁺ Algoritması)',
    tag: 'HFA Pozisyon',
    tagColor: 'sky',
    citation: 'Mullens W, Damman K, Harjola VP, et al.',
    journal: 'Eur J Heart Fail. 2019;21(2):137–155',
    pmids: ['30600580'],
    doi: '10.1002/ejhf.1369',
    clinicalNote: '2. saat spot idrar Na⁺ (<50–70 mEq/L) ve 6. saat idrar hacmi (<100–150 mL/sa) ile basamaklı diüretik protokolü.'
  },
  {
    num: 3,
    title: 'ADVOR Trial (Loop + Asetazolamid)',
    tag: 'RCT · NEJM',
    tagColor: 'teal',
    citation: 'Mullens W, Dauw J, Martens P, et al.',
    journal: 'N Engl J Med. 2022;387(13):1185–1195',
    pmids: ['36027559'],
    doi: '10.1056/NEJMoa2203094',
    clinicalNote: 'IV loop’a Asetazolamid 500 mg/gün × 3 gün eklenmesi başarılı dekonjesyonu %46 artırdı (RR 1,46; p<0,001).'
  },
  {
    num: 4,
    title: 'CLOROTIC Trial (Loop + Hidroklorotiyazid)',
    tag: 'RCT · EHJ',
    tagColor: 'indigo',
    citation: 'Trullàs JC, Morales-Rull JL, Casado J, et al.',
    journal: 'Eur Heart J. 2023;44(5):411–421',
    pmids: ['36423214'],
    doi: '10.1093/eurheartj/ehac689',
    clinicalNote: 'ADKY’de IV furosemide eklenen HCTZ’nin 72 saatlik kilo kaybını artırması ve elektrolit/renal izlem gereksinimi.'
  },
  {
    num: 5,
    title: 'DOSE Trial (Yüksek vs Düşük Doz · Bolus vs İnfüzyon)',
    tag: 'RCT · NEJM',
    tagColor: 'sky',
    citation: 'Felker GM, Lee KL, Bull DA, et al.',
    journal: 'N Engl J Med. 2011;364(9):797–805',
    pmids: ['21366472'],
    doi: '10.1056/NEJMoa1005419',
    clinicalNote: 'Oral dozun 2,5× katı IV yüksek doz stratejisi daha hızlı sıvı kaybı ve dispne düzelmesi sağlar; bolus ve sürekli infüzyon benzerdir.'
  },
  {
    num: 6,
    title: 'NCS 2020 Cerebral Edema Guideline (Mannitol vs HTS)',
    tag: 'NCS Kılavuzu',
    tagColor: 'amber',
    citation: 'Cook AM, Morgan Jones G, Hawryluk GWJ, et al.',
    journal: 'Neurocrit Care. 2020;32(3):647–666',
    pmids: ['32227294'],
    doi: '10.1007/s12028-020-00959-7',
    clinicalNote: 'Akut beyin ödeminde Mannitol %20 (0,25–1 g/kg) ve HTS karşılaştırması; osmolar gap <20 mOsm/kg ve övolemi güvenliği.'
  },
  {
    num: 7,
    title: 'EASL 2018 Decompensated Cirrhosis / Ascites Guideline',
    tag: 'EASL Kılavuzu',
    tagColor: 'emerald',
    citation: 'European Association for the Study of the Liver.',
    journal: 'J Hepatol. 2018;69(2):406–460',
    pmids: ['29653741'],
    doi: '10.1016/j.jhep.2018.03.024',
    clinicalNote: 'Siroz asitinde Spironolakton 100 mg : Furosemid 40 mg başlangıç oranı, kilo kaybı sınırları ve kesme kriterleri.'
  },
  {
    num: 8,
    title: 'ESICM / ESE / ERA-EDTA Hyponatremia Guideline',
    tag: 'Avrupa Kılavuzu',
    tagColor: 'violet',
    citation: 'Spasovski G, Vanholder R, Allolio B, et al.',
    journal: 'Intensive Care Med. 2014;40(3):320–331',
    pmids: ['24562549'],
    doi: '10.1007/s00134-014-3210-2',
    clinicalNote: 'Ağır semptomatik hiponatremide %3 HTS 150 mL IV, SIADH yönetimi ve ODS koruması için 24 saatlik ΔNa⁺ üst sınırları.'
  }
];

const renderScenarioIcon = (icon: ClinicalScenario['icon'], className = 'w-4 h-4') => {
  switch (icon) {
    case 'heart':
      return <HeartPulse className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'brain':
      return <Brain className={className} />;
    case 'droplets':
      return <Droplets className={className} />;
    case 'wind':
      return <Wind className={className} />;
    case 'activity':
      return <Activity className={className} />;
    case 'stethoscope':
      return <Stethoscope className={className} />;
  }
};

const getAccentClasses = (accent: ScenarioAccent, isDark: boolean) => {
  const map: Record<
    ScenarioAccent,
    {
      activePill: string;
      badge: string;
      iconText: string;
      ruleBox: string;
      ctaBtn: string;
    }
  > = {
    sky: {
      activePill: isDark
        ? 'bg-sky-500/20 border-sky-400 text-white ring-1 ring-sky-400/70'
        : 'bg-sky-50 border-sky-500 text-sky-950 ring-1 ring-sky-400/60',
      badge: isDark
        ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
        : 'bg-sky-50 text-sky-700 border-sky-200',
      iconText: 'text-sky-500',
      ruleBox: isDark
        ? 'bg-sky-950/30 border-sky-500/30 text-sky-100'
        : 'bg-sky-50/80 border-sky-200 text-sky-950',
      ctaBtn: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20'
    },
    indigo: {
      activePill: isDark
        ? 'bg-indigo-500/20 border-indigo-400 text-white ring-1 ring-indigo-400/70'
        : 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-1 ring-indigo-400/60',
      badge: isDark
        ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
        : 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconText: 'text-indigo-500',
      ruleBox: isDark
        ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-100'
        : 'bg-indigo-50/80 border-indigo-200 text-indigo-950',
      ctaBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
    },
    amber: {
      activePill: isDark
        ? 'bg-amber-500/20 border-amber-400 text-white ring-1 ring-amber-400/70'
        : 'bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-400/60',
      badge: isDark
        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
        : 'bg-amber-50 text-amber-800 border-amber-200',
      iconText: 'text-amber-500',
      ruleBox: isDark
        ? 'bg-amber-950/30 border-amber-500/30 text-amber-100'
        : 'bg-amber-50/80 border-amber-200 text-amber-950',
      ctaBtn: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
    },
    emerald: {
      activePill: isDark
        ? 'bg-emerald-500/20 border-emerald-400 text-white ring-1 ring-emerald-400/70'
        : 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-400/60',
      badge: isDark
        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconText: 'text-emerald-500',
      ruleBox: isDark
        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-100'
        : 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
      ctaBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
    },
    teal: {
      activePill: isDark
        ? 'bg-teal-500/20 border-teal-400 text-white ring-1 ring-teal-400/70'
        : 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-400/60',
      badge: isDark
        ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
        : 'bg-teal-50 text-teal-700 border-teal-200',
      iconText: 'text-teal-500',
      ruleBox: isDark
        ? 'bg-teal-950/30 border-teal-500/30 text-teal-100'
        : 'bg-teal-50/80 border-teal-200 text-teal-950',
      ctaBtn: 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/20'
    },
    violet: {
      activePill: isDark
        ? 'bg-violet-500/20 border-violet-400 text-white ring-1 ring-violet-400/70'
        : 'bg-violet-50 border-violet-500 text-violet-950 ring-1 ring-violet-400/60',
      badge: isDark
        ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
        : 'bg-violet-50 text-violet-700 border-violet-200',
      iconText: 'text-violet-500',
      ruleBox: isDark
        ? 'bg-violet-950/30 border-violet-500/30 text-violet-100'
        : 'bg-violet-50/80 border-violet-200 text-violet-950',
      ctaBtn: 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/20'
    },
    rose: {
      activePill: isDark
        ? 'bg-rose-500/20 border-rose-400 text-white ring-1 ring-rose-400/70'
        : 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-400/60',
      badge: isDark
        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
        : 'bg-rose-50 text-rose-700 border-rose-200',
      iconText: 'text-rose-500',
      ruleBox: isDark
        ? 'bg-rose-950/30 border-rose-500/30 text-rose-100'
        : 'bg-rose-50/80 border-rose-200 text-rose-950',
      ctaBtn: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
    }
  };
  return map[accent];
};

const getTagColorClasses = (color: VerifiedReference['tagColor'], isDark: boolean) => {
  switch (color) {
    case 'sky':
      return isDark ? 'bg-sky-500/15 text-sky-300 border-sky-500/25' : 'bg-sky-50 text-sky-700 border-sky-200';
    case 'teal':
      return isDark ? 'bg-teal-500/15 text-teal-300 border-teal-500/25' : 'bg-teal-50 text-teal-700 border-teal-200';
    case 'indigo':
      return isDark ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25' : 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'emerald':
      return isDark ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'amber':
      return isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/25' : 'bg-amber-50 text-amber-800 border-amber-200';
    case 'violet':
      return isDark ? 'bg-violet-500/15 text-violet-300 border-violet-500/25' : 'bg-violet-50 text-violet-700 border-violet-200';
  }
};

export const NephronDiureticsClinicalMatrix: React.FC<NephronDiureticsClinicalMatrixProps> = ({
  isDark,
  selectedDiuretic,
  onSelectDiuretic,
  onJumpToAnimation
}) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(CLINICAL_SCENARIOS[0].id);
  const [showQuickTable, setShowQuickTable] = useState<boolean>(true);

  const activeScenario =
    CLINICAL_SCENARIOS.find((s) => s.id === activeScenarioId) ?? CLINICAL_SCENARIOS[0];
  const accentStyles = getAccentClasses(activeScenario.accent, isDark);
  const primaryMeta = DIURETIC_META[activeScenario.primaryDiureticId];

  const handleInspectInAnimation = (id: DiureticId) => {
    onSelectDiuretic(id);
    onJumpToAnimation?.(id);
  };

  return (
    <div className="space-y-8">
      {/* ===================================================================== */}
      {/* SECTION 1: KLINIK SENARYOLARA GORE INTERAKTIF KARAR MATRISI (7 VAKA)  */}
      {/* ===================================================================== */}
      <section id="diuretics-sec-matrix" className="scroll-mt-20 space-y-4">
        {/* Section Header */}
        <div
          className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isDark
                    ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                    : 'bg-teal-50 text-teal-700 border-teal-200'
                }`}
              >
                Bölüm 1 · Perioperatif & YBÜ Karar Matrisi
              </span>
              <span
                className={`text-[11px] font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                7 Kritik Klinik Senaryo
              </span>
            </div>
            <h2
              className={`text-base sm:text-lg font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Klinik Senaryolara Göre İnteraktif Diüretik Seçimi
            </h2>
            <p
              className={`text-xs leading-relaxed max-w-3xl ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Aşağıdaki perioperatif ve yoğun bakım tablolarından birini seçerek kanıta dayalı 1. basamak dozlama, erken yanıt eşikleri ve kritik kontrendikasyonları inceleyin; ilgili ilacın nefron mekanizmasını simülatörde anında açın.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowQuickTable((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Table2 className="w-4 h-4 text-teal-500" />
            <span>Hızlı Tarama Tablosu</span>
            {showQuickTable ? (
              <ChevronUp className="w-3.5 h-3.5 opacity-70" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            )}
          </button>
        </div>

        {/* Interactive Scenario Selector Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2">
          {CLINICAL_SCENARIOS.map((sc, idx) => {
            const isSelected = sc.id === activeScenario.id;
            const scAccent = getAccentClasses(sc.accent, isDark);
            const meta = DIURETIC_META[sc.primaryDiureticId];
            const matchesSimulator = selectedDiuretic === sc.primaryDiureticId;

            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setActiveScenarioId(sc.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? scAccent.activePill
                    : isDark
                      ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span className={`inline-flex items-center gap-1.5 ${scAccent.iconText}`}>
                    {renderScenarioIcon(sc.icon, 'w-3.5 h-3.5 shrink-0')}
                    <span className="text-[10px] font-mono font-bold opacity-80">0{idx + 1}</span>
                  </span>
                  {matchesSimulator && (
                    <span
                      title="Nefron simülatöründe aktif seçili ilaç sınıfı"
                      className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-teal-400' : 'bg-teal-500'
                      }`}
                    />
                  )}
                </div>

                <div>
                  <div
                    className={`text-xs font-bold leading-snug line-clamp-2 ${
                      isSelected
                        ? isDark
                          ? 'text-white'
                          : 'text-slate-900'
                        : isDark
                          ? 'text-slate-200'
                          : 'text-slate-800'
                    }`}
                  >
                    {sc.shortTitle}
                  </div>
                  {meta && (
                    <div
                      className={`text-[10px] mt-1 truncate ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {meta.shortName}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Detailed Decision Card */}
        <div
          className={`p-5 sm:p-6 rounded-2xl border space-y-5 transition-all ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {/* Card Header + CTA */}
          <div
            className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${accentStyles.badge}`}
                >
                  {renderScenarioIcon(activeScenario.icon, 'w-3 h-3')}
                  {activeScenario.domain}
                </span>
                {primaryMeta && (
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-md border ${
                      isDark ? primaryMeta.pillDark : primaryMeta.pillLight
                    }`}
                  >
                    1. Ajan: {primaryMeta.classLabel} · {primaryMeta.segment}
                  </span>
                )}
              </div>

              <h3
                className={`text-base sm:text-xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {activeScenario.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleInspectInAnimation(activeScenario.primaryDiureticId)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer ${accentStyles.ctaBtn}`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Animasyonda İncele</span>
              </button>

              {activeScenario.secondaryDiureticIds?.map((secId) => {
                const secMeta = DIURETIC_META[secId];
                if (!secMeta) return null;
                return (
                  <button
                    key={secId}
                    type="button"
                    onClick={() => handleInspectInAnimation(secId)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[11px] font-semibold transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Play className="w-3 h-3 opacity-75" />
                    <span>+ {secMeta.shortName.split(' (')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Physiological Principle / Threshold Highlight Banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${accentStyles.ruleBox}`}>
            <Zap className={`w-5 h-5 shrink-0 mt-0.5 ${accentStyles.iconText}`} />
            <div className="space-y-0.5 text-xs leading-relaxed">
              <div className="font-bold uppercase tracking-wider text-[11px] opacity-90">
                {activeScenario.pathophysiologyOrRuleLabel}
              </div>
              <p className="font-medium">{activeScenario.pathophysiologyOrRule}</p>
            </div>
          </div>

          {/* 4-Quadrant Clinical Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Basamak */}
            <div
              className={`p-4 rounded-xl border space-y-1.5 ${
                isDark
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-emerald-50/70 border-emerald-200'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs font-bold ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{activeScenario.firstLineLabel}</span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {activeScenario.firstLine}
              </p>
            </div>

            {/* 2. Basamak / Titrasyon */}
            <div
              className={`p-4 rounded-xl border space-y-1.5 ${
                isDark
                  ? 'bg-indigo-950/20 border-indigo-500/30'
                  : 'bg-indigo-50/70 border-indigo-200'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs font-bold ${
                  isDark ? 'text-indigo-400' : 'text-indigo-700'
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{activeScenario.secondLineLabel}</span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {activeScenario.secondLine}
              </p>
            </div>

            {/* İzlem */}
            <div
              className={`p-4 rounded-xl border space-y-1.5 ${
                isDark
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs font-bold ${
                  isDark ? 'text-amber-400' : 'text-amber-800'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{activeScenario.monitoringLabel}</span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}
              >
                {activeScenario.monitoring}
              </p>
            </div>

            {/* Kesin Kaçınılacak */}
            <div
              className={`p-4 rounded-xl border space-y-1.5 ${
                isDark
                  ? 'bg-rose-950/25 border-rose-500/35'
                  : 'bg-rose-50/80 border-rose-200'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs font-bold ${
                  isDark ? 'text-rose-400' : 'text-rose-700'
                }`}
              >
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{activeScenario.avoidLabel}</span>
              </div>
              <p
                className={`text-xs leading-relaxed font-medium ${
                  isDark ? 'text-rose-100' : 'text-rose-950'
                }`}
              >
                {activeScenario.avoid}
              </p>
            </div>
          </div>

          {/* Evidence Footer Strip */}
          <div
            className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider mr-1 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                Dayanak Kılavuz / Çalışma:
              </span>
              {activeScenario.evidenceBadges.map((b) => (
                <span
                  key={b}
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
            <span className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Senaryo {CLINICAL_SCENARIOS.findIndex((s) => s.id === activeScenario.id) + 1} /{' '}
              {CLINICAL_SCENARIOS.length}
            </span>
          </div>
        </div>

        {/* Compact Quick-Scan Comparison Table */}
        {showQuickTable && (
          <div
            className={`rounded-2xl border overflow-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div
              className={`px-4 py-3 border-b flex items-center justify-between gap-2 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-teal-500" />
                <span
                  className={`text-xs font-bold ${
                    isDark ? 'text-slate-100' : 'text-slate-800'
                  }`}
                >
                  Hızlı Tarama Karşılaştırma Tablosu (7 Klinik Senaryo)
                </span>
              </div>
              <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Satıra tıklayarak vaka detayını açın
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr
                    className={`border-b text-[10px] uppercase tracking-wider font-bold ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800 text-slate-400'
                        : 'bg-slate-50/70 border-slate-200 text-slate-500'
                    }`}
                  >
                    <th className="py-2.5 px-3.5">Klinik Senaryo</th>
                    <th className="py-2.5 px-3.5">1. Basamak Strateji</th>
                    <th className="py-2.5 px-3.5">Kritik Eşik / Hedef</th>
                    <th className="py-2.5 px-3.5">Kaçınılacak</th>
                    <th className="py-2.5 px-3.5 text-right">Simülatör</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-100'}`}>
                  {CLINICAL_SCENARIOS.map((sc) => {
                    const isRowActive = sc.id === activeScenario.id;
                    const meta = DIURETIC_META[sc.primaryDiureticId];
                    return (
                      <tr
                        key={sc.id}
                        onClick={() => setActiveScenarioId(sc.id)}
                        className={`transition-colors cursor-pointer ${
                          isRowActive
                            ? isDark
                              ? 'bg-teal-500/10'
                              : 'bg-teal-50/60'
                            : isDark
                              ? 'hover:bg-slate-800/50'
                              : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 px-3.5 font-bold whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={getAccentClasses(sc.accent, isDark).iconText}>
                              {renderScenarioIcon(sc.icon, 'w-3.5 h-3.5')}
                            </span>
                            <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>
                              {sc.shortTitle}
                            </span>
                          </div>
                        </td>
                        <td
                          className={`py-2.5 px-3.5 text-[11px] ${
                            isDark ? 'text-slate-300' : 'text-slate-700'
                          }`}
                        >
                          {sc.quickSummary.firstChoice}
                        </td>
                        <td
                          className={`py-2.5 px-3.5 text-[11px] font-mono ${
                            isDark ? 'text-amber-300' : 'text-amber-800'
                          }`}
                        >
                          {sc.quickSummary.keyThreshold}
                        </td>
                        <td
                          className={`py-2.5 px-3.5 text-[11px] font-medium ${
                            isDark ? 'text-rose-300' : 'text-rose-700'
                          }`}
                        >
                          {sc.quickSummary.avoidShort}
                        </td>
                        <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveScenarioId(sc.id);
                              handleInspectInAnimation(sc.primaryDiureticId);
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-colors cursor-pointer ${
                              meta
                                ? isDark
                                  ? meta.pillDark
                                  : meta.pillLight
                                : isDark
                                  ? 'bg-slate-800 text-slate-200 border-slate-700'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>İncele</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: KOMBINASYON ONERILERI & TEHLIKELI ETKILESIMLER             */}
      {/* ===================================================================== */}
      <section id="diuretics-sec-combos" className="scroll-mt-20 space-y-5">
        <div
          className={`p-5 rounded-2xl border ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
            >
              Bölüm 2 · Ardışık Nefron Blokajı & Güvenlik
            </span>
          </div>
          <h2
            className={`text-base sm:text-lg font-bold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Klinik Durumlara Göre Kombinasyon Önerileri & Tehlikeli Etkileşimler</span>
          </h2>
          <p
            className={`text-xs mt-1 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Tek bir nefron segmentini bloke etmek komşu segmentlerde kompansatuvar Na⁺ emilimini artırır. Kanıta dayalı ardışık nefron blokajı kombinasyonlarını ve kaçınılması gereken ilaç etkileşimlerini birlikte değerlendirin.
          </p>
        </div>

        {/* 4 Evidence-Based Synergistic Combinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SYNERGY_COMBINATIONS.map((combo) => {
            const badgeCls =
              combo.accent === 'teal'
                ? isDark
                  ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                  : 'bg-teal-50 text-teal-700 border-teal-200'
                : combo.accent === 'indigo'
                  ? isDark
                    ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : combo.accent === 'emerald'
                    ? isDark
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : isDark
                      ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                      : 'bg-sky-50 text-sky-700 border-sky-200';

            return (
              <div
                key={combo.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${badgeCls}`}
                    >
                      {combo.badge}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isDark
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {combo.segments}
                    </span>
                  </div>

                  <h3
                    className={`text-sm sm:text-base font-bold leading-snug ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {combo.title}
                  </h3>

                  {/* Clickable Drug Pair Formula */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => handleInspectInAnimation(combo.drugA.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-teal-500/60'
                          : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-teal-400'
                      }`}
                    >
                      <Play className="w-2.5 h-2.5 text-teal-500 fill-current" />
                      <span>{combo.drugA.label}</span>
                    </button>
                    <span className="text-slate-400 font-bold">+</span>
                    <button
                      type="button"
                      onClick={() => handleInspectInAnimation(combo.drugB.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-teal-500/60'
                          : 'bg-slate-100 border-slate-200 text-slate-800 hover:border-teal-400'
                      }`}
                    >
                      <Play className="w-2.5 h-2.5 text-teal-500 fill-current" />
                      <span>{combo.drugB.label}</span>
                    </button>
                  </div>

                  <div
                    className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="font-bold text-teal-500">Protokol: </span>
                    {combo.regimen}
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {combo.rationale}
                  </p>

                  <div
                    className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                      isDark
                        ? 'bg-emerald-950/20 border-emerald-500/25 text-emerald-200'
                        : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong>Klinik Sonuç: </strong>
                      {combo.outcome}
                    </div>
                  </div>
                </div>

                <div
                  className={`pt-3 border-t text-[11px] flex items-start gap-2 ${
                    isDark
                      ? 'border-slate-800 text-amber-300'
                      : 'border-slate-100 text-amber-800'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>İzlem / Dikkat: </strong>
                    {combo.caution}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Red Alarm Strip: 5 Dangerous / Contraindicated Combinations */}
        <div
          className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
            isDark
              ? 'bg-rose-950/25 border-rose-500/40'
              : 'bg-rose-50/70 border-rose-300'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-xl border ${
                  isDark
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-rose-100 border-rose-300 text-rose-700'
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? 'text-rose-400' : 'text-rose-700'
                  }`}
                >
                  Kırmızı Alarm · Perioperatif Güvenlik Bariyeri
                </div>
                <h3
                  className={`text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-rose-950'
                  }`}
                >
                  5 Tehlikeli / Kontrendike Diüretik Kombinasyonu & Klinik Tuzaklar
                </h3>
              </div>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border self-start sm:self-center ${
                isDark
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                  : 'bg-white border-rose-200 text-rose-700'
              }`}
            >
              YÜKSEK TOKSİSİTE RİSKİ
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            {DANGEROUS_INTERACTIONS.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 ${
                  isDark
                    ? 'bg-slate-950/75 border-rose-500/25'
                    : 'bg-white border-rose-200 shadow-2xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {item.riskTag}
                    </span>
                    <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  </div>

                  <h4
                    className={`text-xs font-bold leading-snug ${
                      isDark ? 'text-rose-100' : 'text-slate-900'
                    }`}
                  >
                    {item.pair}
                  </h4>

                  <p
                    className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {item.mechanism}
                  </p>
                </div>

                <div
                  className={`pt-2 border-t text-[10px] leading-relaxed font-medium ${
                    isDark
                      ? 'border-slate-800 text-rose-300'
                      : 'border-rose-100 text-rose-800'
                  }`}
                >
                  <strong>Önlem: </strong>
                  {item.clinicalAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: GUNCEL KLINIK REHBER ONERILERI & DOGRULANMIS LITERATUR     */}
      {/* ===================================================================== */}
      <section
        id="diuretics-sec-guidelines"
        className={`scroll-mt-20 p-5 sm:p-6 rounded-2xl border space-y-5 ${
          isDark
            ? 'bg-slate-900/95 border-slate-800'
            : 'bg-slate-50 border-slate-200 shadow-xs'
        }`}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                  : 'bg-sky-50 text-sky-700 border-sky-200'
              }`}
            >
              Bölüm 3 · Kılavuz Özetleri & Doğrulanmış PubMed Kaynakları
            </span>
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
            <h2
              className={`text-base sm:text-lg font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Güncel Klinik Rehber Önerileri & Doğrulanmış Literatür
            </h2>
          </div>
          <p
            className={`text-xs leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Bu karar matrisindeki tüm dozlama eşikleri ve kombinasyon protokolleri, aşağıda doğrulanmış PMID/DOI bağlantılarıyla sunulan güncel uluslararası kılavuzlara ve randomize kontrollü çalışmalara dayanmaktadır.
          </p>
        </div>

        {/* Structured Guideline Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {GUIDELINE_HIGHLIGHTS.map((gl) => {
            const borderCls =
              gl.accent === 'sky'
                ? isDark
                  ? 'border-sky-500/30 bg-sky-950/20'
                  : 'border-sky-200 bg-white'
                : gl.accent === 'teal'
                  ? isDark
                    ? 'border-teal-500/30 bg-teal-950/20'
                    : 'border-teal-200 bg-white'
                  : gl.accent === 'amber'
                    ? isDark
                      ? 'border-amber-500/30 bg-amber-950/20'
                      : 'border-amber-200 bg-white'
                    : isDark
                      ? 'border-emerald-500/30 bg-emerald-950/20'
                      : 'border-emerald-200 bg-white';

            const badgeTextCls =
              gl.accent === 'sky'
                ? isDark
                  ? 'text-sky-300'
                  : 'text-sky-700'
                : gl.accent === 'teal'
                  ? isDark
                    ? 'text-teal-300'
                    : 'text-teal-700'
                  : gl.accent === 'amber'
                    ? isDark
                      ? 'text-amber-300'
                      : 'text-amber-800'
                    : isDark
                      ? 'text-emerald-300'
                      : 'text-emerald-700';

            return (
              <div
                key={gl.badge}
                className={`p-3.5 rounded-xl border space-y-1.5 ${borderCls}`}
              >
                <div className={`text-[10px] font-mono font-bold uppercase ${badgeTextCls}`}>
                  {gl.badge}
                </div>
                <div
                  className={`text-xs font-bold leading-snug ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {gl.title}
                </div>
                <p
                  className={`text-[11px] leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {gl.keyTakeaway}
                </p>
              </div>
            );
          })}
        </div>

        {/* Verified Reference List with Clickable PubMed Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {VERIFIED_REFERENCES.map((ref) => (
            <div
              key={ref.num}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-2.5 ${
                isDark
                  ? 'bg-slate-950/50 border-slate-800'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`text-xs font-bold leading-snug ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {ref.num}. {ref.title}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border shrink-0 ${getTagColorClasses(
                      ref.tagColor,
                      isDark
                    )}`}
                  >
                    {ref.tag}
                  </span>
                </div>

                <p
                  className={`text-[11px] leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {ref.citation} <em className={isDark ? 'text-slate-300' : 'text-slate-700'}>{ref.journal}</em>.
                </p>

                <p
                  className={`text-[11px] leading-relaxed pt-1.5 border-t ${
                    isDark
                      ? 'border-slate-800/80 text-slate-300'
                      : 'border-slate-100 text-slate-700'
                  }`}
                >
                  → {ref.clinicalNote}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {ref.pmids.map((pmid) => (
                  <a
                    key={pmid}
                    href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded-md border transition-colors ${
                      isDark
                        ? 'bg-teal-500/10 border-teal-500/30 text-teal-300 hover:bg-teal-500/20'
                        : 'bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100'
                    }`}
                  >
                    <span>PMID: {pmid}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ))}
                {ref.doi && (
                  <span
                    className={`text-[10px] font-mono px-2 py-1 rounded-md border ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-slate-400'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    DOI: {ref.doi}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
