import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowDown,
  Baby,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  Copy,
  Droplets,
  Ear,
  Eye,
  Filter,
  HeartPulse,
  Info,
  Layers,
  Pill,
  RotateCcw,
  Scale,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Wind,
  X,
  XCircle,
  Zap
} from 'lucide-react';
import { copyToClipboard } from '../../utils/deepLink';

interface PONVInfographicProps {
  isDark: boolean;
}

type PathwayId = 'ctz' | 'gi_vagal' | 'vestibular' | 'cortical' | 'nts';
type ReceptorId = '5-HT3' | 'D2' | 'NK1' | 'H1' | 'M1' | 'Kortikal';
type DrugClassFilter =
  | 'Tümü'
  | '5-HT₃'
  | 'Kortikosteroid'
  | 'D₂ Antagonist'
  | 'NK₁ Antagonist'
  | 'Antihistaminik / Antikolinerjik'
  | 'Diğer / Multimodal';

type TrAvailability = 'rutin' | 'sinirli' | 'yok';

interface PathwayNode {
  id: PathwayId;
  title: string;
  shortTitle: string;
  anatomy: string;
  receptors: ReceptorId[];
  triggers: string[];
  mechanism: string;
  blockingClasses: string[];
  trExamples: string[];
  accent: 'teal' | 'sky' | 'amber' | 'violet' | 'rose';
}

interface AntiemeticAgent {
  id: string;
  drugClass: Exclude<DrugClassFilter, 'Tümü'>;
  name: string;
  trBrands: string;
  trAvailability: TrAvailability;
  trBadgeLabel: string;
  adultDose: string;
  pediatricDose: string;
  timing: string;
  timingTag: 'Preop' | 'İndüksiyon' | 'Bitişe Yakın' | 'İdame / PACU';
  rescueEligible: boolean;
  receptors: string;
  clinicalNotes: string[];
  warningTag?: string;
}

type ProphylaxisClassId = '5ht3' | 'steroid' | 'd2' | 'h1' | 'nk1' | 'tiva';

const SECTION_NAV = [
  { id: 'ponv-sec-intro', label: '1. Tanım & İnsidans' },
  { id: 'ponv-sec-patho', label: '2. Patofizyoloji' },
  { id: 'ponv-sec-apfel', label: '3. Risk & Apfel' },
  { id: 'ponv-sec-special', label: '4. Özel Gruplar' },
  { id: 'ponv-sec-baseline', label: '5. Bazal Risk' },
  { id: 'ponv-sec-matrix', label: '6. Antiemetikler (TR)' },
  { id: 'ponv-sec-nonpharm', label: '7. Non-Farmakolojik' },
  { id: 'ponv-sec-rescue', label: '8. Kurtarma (Rescue)' },
  { id: 'ponv-sec-pediatric', label: '9. Pediatrik (POVOC)' },
  { id: 'ponv-sec-refs', label: '10. Kaynakça' }
] as const;

const PATHWAYS: PathwayNode[] = [
  {
    id: 'ctz',
    title: 'CTZ — Area Postrema (KBB Dışında!)',
    shortTitle: 'CTZ (Area Postrema)',
    anatomy: '4. ventrikül tabanı — Kan-Beyin Bariyeri (KBB) dışında, dolaşımdaki ajanlara doğrudan açık',
    receptors: ['5-HT3', 'D2', 'NK1'],
    triggers: ['Opioidler (μ reseptör)', 'Volatil anestezikler', 'Sistemik toksinler & metabolitler', 'Kemoterapötikler'],
    mechanism:
      'KBB bulunmadığı için kandaki ve BOS’taki emetojenik ilaçları doğrudan algılar; NTS’ye (Kusma Merkezi) güçlü eksitatör sinyaller gönderir.',
    blockingClasses: ['5-HT₃ Antagonistleri', 'D₂ Antagonistleri', 'NK₁ Antagonistleri'],
    trExamples: ['Ondansetron / Palonosetron', 'Metoklopramid / Haloperidol', 'Aprepitant'],
    accent: 'rose'
  },
  {
    id: 'gi_vagal',
    title: 'GİS & Vagal Afferentler (Enterokromaffin Hücreler)',
    shortTitle: 'GİS & Vagal Afferent',
    anatomy: 'Mide & ince barsak mukozası → Enterokromaffin hücrelerden 5-HT salınımı → N. Vagus (CN X) → NTS',
    receptors: ['5-HT3', 'NK1'],
    triggers: ['Abdominal/laparoskopik cerrahi manipülasyon', 'Gastrik distansiyon & pnömoperitonyum', 'Yutulmuş kan (KBB/tonsillektomi)', 'Splanknik hipoperfüzyon / iskemi'],
    mechanism:
      'Mukoza gerilmesi ve cerrahi travma enterokromaffin hücrelerden masif serotonin (5-HT) salınımına yol açar; vagal 5-HT₃ reseptörlerini uyarır.',
    blockingClasses: ['5-HT₃ Antagonistleri', 'NK₁ Antagonistleri', 'Kortikosteroidler (prostaglandin ↓)'],
    trExamples: ['Ondansetron / Granisetron / Palonosetron', 'Deksametazon', 'Aprepitant'],
    accent: 'teal'
  },
  {
    id: 'vestibular',
    title: 'Vestibüler Sistem & Serebellum',
    shortTitle: 'Vestibüler Sistem',
    anatomy: 'İç kulak labirenti → N. Vestibulocochlearis (CN VIII) → Vestibüler çekirdekler → Kusma Merkezi',
    receptors: ['H1', 'M1'],
    triggers: ['Pozisyon / sedye hareketi', 'Orta kulak / timpanoplasti / mastoidektomi', 'Şaşılık (strabismus) cerrahisi', 'Opioid kaynaklı vestibüler duyarlılaşma'],
    mechanism:
      'Hareket, orta kulak basınç artışı (N₂O!) ve opioidlerin vestibüler aparatı duyarlılaştırması H₁ ve muskarinik M₁ yolaklarını aktive eder.',
    blockingClasses: ['Antihistaminikler (H₁)', 'Antikolinerjikler (M₁)'],
    trExamples: ['Dimenhidrinat (Dramamine®)', 'Transdermal Skopolamin (TR’de yok)'],
    accent: 'amber'
  },
  {
    id: 'cortical',
    title: 'Yüksek Kortikal & Limbik Merkezler',
    shortTitle: 'Kortikal & Limbik',
    anatomy: 'Prefrontal korteks, amigdala, talamus & koku yolakları → Medüller Kusma Merkezi',
    receptors: ['Kortikal'],
    triggers: ['Preoperatif yoğun anksiyete', 'Şiddetli postoperatif ağrı', 'Kötü kokular & görsel uyaranlar', 'Koşullu beklenti bulantısı & KİB artışı'],
    mechanism:
      'Anksiyete, ağrı ve duyusal uyaranlar inen kortikal yolaklarla kusma eşiğini düşürür; GABAerjik modülasyon ve multimodal analjezi ile baskılanır.',
    blockingClasses: ['Benzodiazepinler (GABA)', 'Propofol (TIVA / Subhipnotik)', 'Multimodal Analjezi & Koku/Anksiyoliz'],
    trExamples: ['Midazolam (2 mg IV)', 'Propofol TIVA', 'İzopropil Alkol (%70) inhalasyonu'],
    accent: 'violet'
  },
  {
    id: 'nts',
    title: 'Santral Entegratör — Kusma Merkezi (NTS)',
    shortTitle: 'Kusma Merkezi (NTS)',
    anatomy: 'Medulla oblongata — Nucleus Tractus Solitarius (NTS) & Dorsal Vagal Kompleks (son ortak motor çıkış)',
    receptors: ['NK1', '5-HT3', 'H1', 'M1', 'D2'],
    triggers: ['Tüm 4 afferent yolağın birleştiği nihai entegrasyon merkezi', 'Diyafram, karın kasları ve alt özofagus sfinkter motor çıkışı'],
    mechanism:
      'Tüm emetik girdiler NTS’de toplanır. Özellikle NK₁ (Substans P) reseptör blokajı, kusma refleksinin son ortak yolağını en geniş spektrumda kapatır.',
    blockingClasses: ['NK₁ Antagonistleri (En güçlü anti-emetik/kusma)', 'Multimodal Kombinasyon (5-HT₃ + Steroid + D₂/H₁)'],
    trExamples: ['Aprepitant (Emend®)', 'Deksametazon + Ondansetron + D₂/H₁ kombinasyonu'],
    accent: 'sky'
  }
];

const RECEPTOR_INFO: Record<
  ReceptorId,
  {
    label: string;
    drugClasses: string;
    trDrugs: string;
    note: string;
  }
> = {
  '5-HT3': {
    label: '5-HT₃ (Serotonin)',
    drugClasses: '5-HT₃ Reseptör Antagonistleri',
    trDrugs: 'Ondansetron, Granisetron, Palonosetron',
    note: 'GİS vagal afferentler ve CTZ’de ana hedef; akut ve postoperatif bulantı-kusmada temel taş.'
  },
  D2: {
    label: 'D₂ (Dopamin)',
    drugClasses: 'D₂ Reseptör Antagonistleri (Benzamid / Bütirfenon)',
    trDrugs: 'Metoklopramid, Haloperidol (TR dışı: Droperidol, Amisülprid)',
    note: 'CTZ’de etkili; Parkinson’da kontrendike, EPS/distoni ve QTc uzaması açısından dikkat.'
  },
  NK1: {
    label: 'NK₁ (Substans P)',
    drugClasses: 'NK₁ Reseptör Antagonistleri',
    trDrugs: 'Aprepitant (oral), Fosaprepitant (onkoloji IV)',
    note: 'NTS son ortak yolağında kusmayı (özellikle kusma atağını) önlemede en yüksek etkinlik & 40+ saat etki.'
  },
  H1: {
    label: 'H₁ (Histamin)',
    drugClasses: '1. Kuşak Antihistaminikler',
    trDrugs: 'Dimenhidrinat (Dramamine®)',
    note: 'Vestibüler çekirdeklerde çok etkili; KBB, orta kulak ve şaşılık cerrahisinde öncelikli.'
  },
  M1: {
    label: 'M₁ (Muskarinik)',
    drugClasses: 'Santral Antikolinerjikler',
    trDrugs: 'Transdermal Skopolamin (TR’de yok) — Dimenhidrinat kısmi M₁ etki',
    note: 'Taşıt tutması ve vestibüler bulantıda etkili; geriatride deliryum/antikolinerjik yük riski.'
  },
  Kortikal: {
    label: 'Kortikal / GABA / Prostaglandin',
    drugClasses: 'Kortikosteroidler, Propofol, Midazolam',
    trDrugs: 'Deksametazon, Metilprednizolon, Propofol TIVA, Midazolam',
    note: 'Santral prostaglandin inhibisyonu, endorfin salınımı ve kortikal anksiyoliz ile eşiği yükseltir.'
  }
};

const ANTIEMETIC_AGENTS: AntiemeticAgent[] = [
  // 5-HT3
  {
    id: 'ondansetron',
    drugClass: '5-HT₃',
    name: 'Ondansetron',
    trBrands: 'Zofran® / Zofer® / Onda® IV (4 mg & 8 mg ampul)',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Rutin',
    adultDose: '4 mg IV (profilaksi) · 1–4 mg IV (kurtarma — profilakside alınmadıysa)',
    pediatricDose: '0,1 mg/kg IV (maks 4 mg)',
    timing: 'Operasyon bitiminden 30 dk önce',
    timingTag: 'Bitişe Yakın',
    rescueEligible: true,
    receptors: '5-HT₃ (GİS vagal & CTZ)',
    clinicalNotes: [
      'En yaygın kullanılan 1. basamak 5-HT₃ antagonisti; NNT ~6 (kusma için ~5).',
      'Profilakside alındıysa ilk 6 saat içinde kurtarma amaçlı TEKRARLANMAZ (etkinlik yok).',
      'Yan etkiler: Doz bağımlı QTc uzaması, baş ağrısı, kabızlık, geçici transaminaz artışı.'
    ],
    warningTag: 'QTc Uzaması'
  },
  {
    id: 'granisetron',
    drugClass: '5-HT₃',
    name: 'Granisetron',
    trBrands: 'Kytril® / Setron® IV (1 mg & 3 mg ampul)',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Rutin',
    adultDose: '0,35–3 mg IV (klinik pratikte genellikle 1 mg IV)',
    pediatricDose: '0,04 mg/kg IV (maks 1 mg)',
    timing: 'Operasyon bitişine yakın (son 30 dk)',
    timingTag: 'Bitişe Yakın',
    rescueEligible: true,
    receptors: '5-HT₃',
    clinicalNotes: [
      'Ondansetron ile benzer etkinlik; daha uzun yarı ömür (~9 saat).',
      'Diğer 1. kuşak 5-HT₃ antagonistleri gibi QTc uzaması uyarısı taşır.'
    ],
    warningTag: 'QTc Uyarısı'
  },
  {
    id: 'palonosetron',
    drugClass: '5-HT₃',
    name: 'Palonosetron',
    trBrands: 'Aloxi® IV (0,25 mg/5 mL flakon — PONV dozu 0,075 mg)',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Mevcut',
    adultDose: '0,075 mg IV (tek doz)',
    pediatricDose: '0,02 mg/kg IV (maks 0,075–0,25 mg; pediatrik PONV verisi sınırlı)',
    timing: 'Anestezi İNDÜKSİYONUNDA',
    timingTag: 'İndüksiyon',
    rescueEligible: true,
    receptors: '5-HT₃ (allosterik & reseptör internalizasyonu)',
    clinicalNotes: [
      '2. kuşak 5-HT₃ antagonisti: ~40 saat yarı ömür ile geç PONV ve PDNV’de (günübirlik cerrahi) üstündür!',
      'Klinik dozlarda QTc uzaması etkisi minimal/anlamsız — uzun QT hastalarında önemli avantaj.'
    ],
    warningTag: 'PDNV Üstün / Minimal QTc'
  },
  {
    id: 'tropisetron',
    drugClass: '5-HT₃',
    name: 'Tropisetron',
    trBrands: 'Navoban® (TR’de rutin erişim sınırlı / ithal)',
    trAvailability: 'sinirli',
    trBadgeLabel: 'TR Sınırlı / İthal',
    adultDose: '2 mg IV',
    pediatricDose: '0,1 mg/kg IV (maks 2 mg)',
    timing: 'Operasyon bitişine yakın',
    timingTag: 'Bitişe Yakın',
    rescueEligible: true,
    receptors: '5-HT₃',
    clinicalNotes: [
      'Ondansetron benzeri etkinlik; Türkiye hastane stoklarında nadir bulunur.',
      'QTc uzaması açısından diğer 1. kuşak 5-HT₃ ajanlarıyla benzer izlem gerekir.'
    ]
  },

  // Kortikosteroidler
  {
    id: 'dexamethasone',
    drugClass: 'Kortikosteroid',
    name: 'Deksametazon',
    trBrands: 'Dekort® / Onadron® IV (8 mg/2 mL ampul)',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Rutin',
    adultDose: '4–8 mg IV (DREAMS BMJ 2017: 8 mg IV; rutin 4–8 mg)',
    pediatricDose: '0,15 mg/kg IV (maks 4–8 mg)',
    timing: 'Anestezi İNDÜKSİYONUNDA (yavaş etki başlangıcı!)',
    timingTag: 'İndüksiyon',
    rescueEligible: false,
    receptors: 'Santral prostaglandin inhibisyonu & endorfin',
    clinicalNotes: [
      'Etki başlangıcı 2+ saat olduğundan AKUT KURTARMADA (RESCUE) KULLANILMAZ!',
      'Uyanık hastada hızlı IV puşe şiddetli perineal yanma/kaşıntı yapar → indüksiyon sonrası yavaş verin.',
      'PADDI Trial (NEJM 2021): 8 mg IV tek doz cerrahi alan enfeksiyonunu ARTIRMAZ; hafif geçici hiperglisemi yapabilir (diyabetiklerde KŞ izlemi).',
      'Hematolojik maligniteli çocuklarda/erişkinlerde tümör lizis sendromu riskini gözetin.'
    ],
    warningTag: 'Kurtarmada KULLANILMAZ'
  },
  {
    id: 'methylprednisolone',
    drugClass: 'Kortikosteroid',
    name: 'Metilprednizolon',
    trBrands: 'Prednol-L® IV (20 / 40 / 250 mg flakon)',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Rutin',
    adultDose: '40 mg IV',
    pediatricDose: '0,5–1 mg/kg IV (maks 40 mg; Deksametazon öncelikli)',
    timing: 'Anestezi İNDÜKSİYONUNDA',
    timingTag: 'İndüksiyon',
    rescueEligible: false,
    receptors: 'Santral antiinflamatuar / prostaglandin inhibisyonu',
    clinicalNotes: [
      'Deksametazon stokta olmadığında kanıta dayalı geçerli steroid alternatifidir (Gan 2020).',
      'Deksametazon gibi geç etki başlangıcı nedeniyle kurtarma tedavisinde yeri yoktur.'
    ],
    warningTag: 'Deksametazon Alternatifi'
  },

  // D2 Antagonistleri
  {
    id: 'metoclopramide',
    drugClass: 'D₂ Antagonist',
    name: 'Metoklopramid',
    trBrands: 'Metpamid® IV (10 mg/2 mL ampul)',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Rutin',
    adultDose: '10 mg IV (yüksek etkinlik 25–50 mg’da olsa da EPS riski nedeniyle klinik pratikte 10 mg)',
    pediatricDose: '0,1–0,15 mg/kg IV (maks 10 mg — yalnızca 2. basamak / kurtarma!)',
    timing: 'Operasyon bitişine yakın veya PACU kurtarma',
    timingTag: 'Bitişe Yakın',
    rescueEligible: true,
    receptors: 'D₂ (CTZ) + Prokinestik (5-HT₄ agonist)',
    clinicalNotes: [
      '10 mg dozda tek başına profilaksi etkinliği zayıftır (NNT ~15–30), ancak multimodal kombinasyonda ve 5-HT₃ sonrası kurtarmada TR’de sık kullanılır.',
      'Ekstrapiramidal semptomlar (akut distoni, akatizi — özellikle genç kadın ve çocuklarda!), Parkinson’da KONTRENDİKE.',
      'Yavaş IV infüzyon (≥1–2 dk) akatiziyi azaltır; QTc uzaması potansiyeli.'
    ],
    warningTag: 'EPS / Parkinson Yasak'
  },
  {
    id: 'haloperidol',
    drugClass: 'D₂ Antagonist',
    name: 'Haloperidol',
    trBrands: 'Norodol® ampul (5 mg/1 mL — sulandırılıp düşük doz çekilir!)',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Rutin',
    adultDose: 'Düşük doz 0,5–1 mg IV veya IM (asla 5 mg ampulü tam verme!)',
    pediatricDose: 'Pediatrik PONV’de rutin ÖNERİLMEZ (EPS & QTc riski)',
    timing: 'İndüksiyonda, bitişe yakın veya PACU kurtarma',
    timingTag: 'Bitişe Yakın',
    rescueEligible: true,
    receptors: 'D₂ (CTZ — güçlü bütirfenon)',
    clinicalNotes: [
      'Droperidol’ün TR’de bulunmadığı pratikte güçlü D₂ alternatifi (NNT ~4–6).',
      'FDA uyarısı: IV uygulamada QTc uzaması & Torsades de Pointes riski → EKG/QTc kontrolü yapın, >2 mg dozlardan kaçının.',
      'Parkinson hastalığında ve uzun QT sendromunda KONTRENDİKE.'
    ],
    warningTag: 'FDA QTc / Torsades Uyarısı'
  },
  {
    id: 'droperidol',
    drugClass: 'D₂ Antagonist',
    name: 'Droperidol',
    trBrands: 'TR’de rutin ticari preparatı YOK (ithal / majistral erişim)',
    trAvailability: 'yok',
    trBadgeLabel: 'TR’de Yok / İthal',
    adultDose: '0,625–1,25 mg IV',
    pediatricDose: '0,01–0,015 mg/kg IV (maks 1,25 mg; yalnızca kurtarma)',
    timing: 'Operasyon bitişine yakın',
    timingTag: 'Bitişe Yakın',
    rescueEligible: true,
    receptors: 'D₂ (CTZ)',
    clinicalNotes: [
      'IMPACT çalışmasında Ondansetron ve Deksametazon ile eşdeğer (~%26 RRR) kanıtlı ajan.',
      'FDA Black-Box QTc uzaması uyarısı (ancak 0,625–1,25 mg düşük dozlarda risk çok düşüktür).',
      'Türkiye’de bulunmadığı için pratikte düşük doz Haloperidol (0,5–1 mg IV) yerine geçer.'
    ],
    warningTag: 'TR’de Yok · Black-Box QTc'
  },
  {
    id: 'amisulpride',
    drugClass: 'D₂ Antagonist',
    name: 'Amisülprid (IV)',
    trBrands: 'Barhemsys® (ABD) — TR’de yalnızca oral psikiyatri formu var, IV formu YOK',
    trAvailability: 'yok',
    trBadgeLabel: 'TR’de IV Yok',
    adultDose: '5 mg IV (profilaksi) · 10 mg IV (kurtarma)',
    pediatricDose: 'Pediatrik onaylı PONV dozu belirlenmemiştir',
    timing: 'İndüksiyonda (profilaksi) veya PACU kurtarma',
    timingTag: 'İndüksiyon',
    rescueEligible: true,
    receptors: 'Selektif D₂ / D₃ antagonisti',
    clinicalNotes: [
      'Gan 2020 kılavuzunun yıldız yeni ajanı: 5–10 mg IV dozlarda QTc uzaması ve sedasyon/EPS etkisi MİNİMAL!',
      '5-HT₃ profilaksisi başarısız olan hastalarda 10 mg IV kurtarmada yüksek kanıt düzeyi.'
    ],
    warningTag: 'TR’de IV Formu Yok'
  },

  // NK1 Antagonistleri
  {
    id: 'aprepitant',
    drugClass: 'NK₁ Antagonist',
    name: 'Aprepitant',
    trBrands: 'Emend® 80 mg & 125 mg oral kapsül (40 mg PONV kapsülü TR’de kısıtlı → 80 mg PO kullanılabiliyor)',
    trAvailability: 'sinirli',
    trBadgeLabel: 'TR ✓ Oral (80/125 mg)',
    adultDose: '40 mg PO (kılavuz) / 80 mg PO (TR pratik erişim) — preop 1–3 saat önce',
    pediatricDose: '3 mg/kg PO (maks 125 mg; adölesan/yüksek riskli seçilmiş vakalar)',
    timing: 'Preoperatif 1–3 saat önce (bir yudum su ile PO)',
    timingTag: 'Preop',
    rescueEligible: false,
    receptors: 'NK₁ (Substans P — NTS & CTZ)',
    clinicalNotes: [
      'Özellikle postoperatif KUSMAYI önlemede tüm sınıflar içinde en güçlü ajan; 40+ saat kalıcı etki (geç PONV & PDNV!).',
      'QTc uzaması yapmaz, sedasyon yapmaz — IMF, kraniyotomi ve bariatrik yüksek riskli vakalarda altın değerinde.',
      'CYP3A4 inhibitörü/indükleyicisi: 28 gün boyunca hormonal/oral kontraseptif etkinliğini azaltabilir (bariyer yöntemi uyarısı!), varfarin INR’yi etkileyebilir.'
    ],
    warningTag: 'CYP3A4 / OKS Etkileşimi'
  },
  {
    id: 'fosaprepitant',
    drugClass: 'NK₁ Antagonist',
    name: 'Fosaprepitant',
    trBrands: 'Ivemend® 150 mg IV flakon (onkoloji erişimli — perioperatif maliyet/geri ödeme kısıtlı)',
    trAvailability: 'sinirli',
    trBadgeLabel: 'TR ✓ Onkoloji / Sınırlı',
    adultDose: '150 mg IV (20–30 dk infüzyon)',
    pediatricDose: 'Onkoloji CINV dışı pediatrik PONV verisi sınırlı',
    timing: 'Anestezi İNDÜKSİYONUNDA',
    timingTag: 'İndüksiyon',
    rescueEligible: false,
    receptors: 'NK₁ (Aprepitant IV ön-ilacı)',
    clinicalNotes: [
      'Oral alımı mümkün olmayan aşırı yüksek riskli vakalarda IV NK₁ seçeneği.',
      'İnfüzyon bölgesi reaksiyonu / flebit riski ve yüksek maliyet nedeniyle perioperatif kullanımı sınırlıdır.'
    ]
  },
  {
    id: 'rolapitant',
    drugClass: 'NK₁ Antagonist',
    name: 'Rolapitant',
    trBrands: 'Varubi® — TR’de YOK',
    trAvailability: 'yok',
    trBadgeLabel: 'TR’de Yok',
    adultDose: '70–200 mg PO',
    pediatricDose: 'Pediatrik PONV onayı yok',
    timing: 'Preoperatif 1–2 saat önce',
    timingTag: 'Preop',
    rescueEligible: false,
    receptors: 'NK₁ (ultra uzun yarı ömür ~180 saat)',
    clinicalNotes: [
      'CYP3A4 inhibisyonu yapmaz (Aprepitant’tan farkı); ancak Türkiye’de ticari olarak bulunmamaktadır.'
    ]
  },

  // Antihistaminik & Antikolinerjik
  {
    id: 'dimenhydrinate',
    drugClass: 'Antihistaminik / Antikolinerjik',
    name: 'Dimenhidrinat',
    trBrands: 'Dramamine® 50 mg tb / Anti-Em® (TR’de oral & hastane IV/IM erişim)',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Mevcut',
    adultDose: '1 mg/kg IV/IM/PO (genellikle 50 mg)',
    pediatricDose: '0,5 mg/kg IV (maks 25 mg; >2 yaş)',
    timing: 'Bitişe yakın veya PACU kurtarma (vestibüler/KBB’de indüksiyonda da olabilir)',
    timingTag: 'Bitişe Yakın',
    rescueEligible: true,
    receptors: 'H₁ + kısmi M₁ (Vestibüler çekirdekler)',
    clinicalNotes: [
      'Orta kulak, şaşılık, taşıt tutması öyküsü olan hastalarda ve 5-HT₃ sonrası kurtarmada çok değerlidir.',
      'Yan etkiler: Sedasyon, ağız kuruluğu, idrar retansiyonu — ≥65 yaş geriatrik hastalarda Beers kriterleri nedeniyle deliryum riskine dikkat!'
    ],
    warningTag: 'Sedasyon / Geriatri Beers'
  },
  {
    id: 'diphenhydramine',
    drugClass: 'Antihistaminik / Antikolinerjik',
    name: 'Difenhidramin',
    trBrands: 'Benadryl® — TR’de saf IV ampul formu rutin DEĞİL (kombine/oral formlar)',
    trAvailability: 'yok',
    trBadgeLabel: 'TR’de Saf IV Rutin Değil',
    adultDose: '25–50 mg IV',
    pediatricDose: '0,5–1 mg/kg IV (maks 25–50 mg)',
    timing: 'İndüksiyonda veya PACU kurtarma',
    timingTag: 'Bitişe Yakın',
    rescueEligible: true,
    receptors: 'H₁ + M₁',
    clinicalNotes: [
      'Dimenhidrinat’ın aktif antihistaminik bileşenidir (Dimenhidrinat = Difenhidramin + 8-kloroteofilin).',
      'Türkiye’de saf IV formu rutin olmadığından Dimenhidrinat tercih edilir.'
    ]
  },
  {
    id: 'pheniramine',
    drugClass: 'Antihistaminik / Antikolinerjik',
    name: 'Feniramin Maleat',
    trBrands: 'Avil® 45,5 mg/2 mL IV/IM ampul',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ (Zayıf PONV Kanıtı)',
    adultDose: '22,75–45,5 mg yavaş IV (yalnızca sınırlı adjuvan/vestibüler destek)',
    pediatricDose: 'PONV için rutin önerilmez',
    timing: 'Yalnızca alternatif H₁ erişilemediğinde',
    timingTag: 'Bitişe Yakın',
    rescueEligible: true,
    receptors: 'H₁ + antikolinerjik',
    clinicalNotes: [
      'ÖNEMLİ KLİNİK NOT: Primer PONV kılavuzlarında (Gan 2020) doğrudan önerilen standart ajan DEĞİLDİR; kanıt düzeyi zayıftır.',
      'Yüksek sedasyon ve antikolinerjik/deliryum yükü nedeniyle rutinde Dimenhidrinat tercih edilmelidir.'
    ],
    warningTag: 'Zayıf Kanıt · Dimenhidrinat Öncelikli'
  },
  {
    id: 'scopolamine',
    drugClass: 'Antihistaminik / Antikolinerjik',
    name: 'Transdermal Skopolamin',
    trBrands: 'Transderm Scōp® 1,5 mg yama — TR’de YOK',
    trAvailability: 'yok',
    trBadgeLabel: 'TR’de Yok',
    adultDose: '1,5 mg transdermal yama (kulak arkasına)',
    pediatricDose: 'Pediatrik kullanım önerilmez',
    timing: 'Operasyondan 2–4 saat önce veya bir gece önce',
    timingTag: 'Preop',
    rescueEligible: false,
    receptors: 'M₁ (Santral muskarinik — vestibüler)',
    clinicalNotes: [
      'Etki başlangıcı 2–4 saat olduğundan AKUT KURTARMADA KULLANILMAZ!',
      'Yan etkiler: Midriyazis / bulanık görme (göze dokunma → anizokori!), ağız kuruluğu, yaşlılarda akut deliryum.'
    ],
    warningTag: 'TR’de Yok · Kurtarmada Kullanılmaz'
  },

  // Diğer Multimodal
  {
    id: 'propofol',
    drugClass: 'Diğer / Multimodal',
    name: 'Propofol (TIVA / Subhipnotik)',
    trBrands: 'Propofol-Lipuro® / Diprivan® / Propofol-PF %1–2 IV',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Rutin',
    adultDose: 'TIVA idame (volatilsiz) · PACU Kurtarma: 10–20 mg IV subhipnotik bolus',
    pediatricDose: 'TIVA idame (yüksek riskli pediatrik şaşılık / tonsillektomide çok etkili)',
    timing: 'İntraoperatif TIVA veya yakın monitörize PACU kurtarma',
    timingTag: 'İdame / PACU',
    rescueEligible: true,
    receptors: 'GABA-A / kortikal & area postrema modülasyonu',
    clinicalNotes: [
      'TIVA olarak idamede kullanıldığında tek başına ~%25 rölatif risk azalması sağlar (IMPACT NEJM 2004).',
      'PACU kurtarmada 10–20 mg IV subhipnotik bolus hızlı ama çok kısa etkilidir (~15–30 dk) — YALNIZCA yakın SpO₂/havayolu monitörizasyonu altında uygulanır!'
    ],
    warningTag: 'PACU’da Sıkı Monitör Şart'
  },
  {
    id: 'midazolam',
    drugClass: 'Diğer / Multimodal',
    name: 'Midazolam',
    trBrands: 'Dormicum® / Demizolam® / Sedozolam® IV (5 mg/5 mL)',
    trAvailability: 'rutin',
    trBadgeLabel: 'TR ✓ Rutin',
    adultDose: '2 mg IV (indüksiyon öncesi veya bitişten 30 dk önce)',
    pediatricDose: '0,05 mg/kg IV (premedikasyon; rutin antiemetik amaçlı değil)',
    timing: 'İndüksiyon öncesi veya operasyon bitişine yakın',
    timingTag: 'İndüksiyon',
    rescueEligible: false,
    receptors: 'GABA-A (Kortikal anksiyoliz + dopamin salınım inhibisyonu)',
    clinicalNotes: [
      'Meta-analizlerde 2 mg IV dozda anlamlı PONV azalması göstermiştir (özellikle yüksek anksiyeteli genç hastalarda).',
      'Geriatrik hastalarda (>65 yaş) postoperatif deliryum ve uzamış derlenme riski nedeniyle KAÇININ!'
    ],
    warningTag: 'Yaşlıda Deliryum Riski'
  }
];

const PROPHYLAXIS_OPTIONS: {
  id: ProphylaxisClassId;
  label: string;
  examples: string;
}[] = [
  { id: '5ht3', label: '5-HT₃ Antagonisti', examples: 'Ondansetron / Granisetron / Palonosetron' },
  { id: 'steroid', label: 'Kortikosteroid', examples: 'Deksametazon / Metilprednizolon' },
  { id: 'd2', label: 'D₂ Antagonisti', examples: 'Metoklopramid / Haloperidol / Droperidol' },
  { id: 'h1', label: 'Antihistaminik (H₁)', examples: 'Dimenhidrinat / Feniramin' },
  { id: 'nk1', label: 'NK₁ Antagonisti', examples: 'Aprepitant / Fosaprepitant' },
  { id: 'tiva', label: 'Propofol TIVA', examples: 'İntraoperatif volatilsiz idame' }
];

const SPECIAL_CLINICAL_GROUPS = [
  {
    id: 'pediatric',
    title: 'Pediatrik Hastalar (POVOC)',
    severity: 'Yüksek İnsidans (%70–80)',
    tone: 'sky' as const,
    icon: Baby,
    risk: 'Çocuklarda POV insidansı erişkinlerin ~2 katıdır; şaşılık ve adenotonsillektomide %70–80’e çıkar.',
    action: 'Eberhart POVOC skorlaması + Ondansetron (0,1 mg/kg) + Deksametazon (0,15 mg/kg) ± Propofol TIVA. Aşağıdaki Pediatrik Bölüme geçin.',
    jumpTo: 'ponv-sec-pediatric'
  },
  {
    id: 'icp',
    title: 'KİB Artışı / Kraniyotomi / Nöroşirürji',
    severity: 'KRİTİK — Herniasyon Riski',
    tone: 'rose' as const,
    icon: Brain,
    risk: 'Öğürme & Valsalva santral venöz basıncı ve KİB’yi ani yükseltir → intrakraniyel hemoraji, beyin ödemi, herniasyon!',
    action: 'Propofol TIVA + 3’lü multimodal profilaksi (Deksametazon + 5-HT₃ + NK₁/D₂). Postop yeni başlayan kusmada mutlaka KİB/kanama ekarte et (BT/nörolojik muayene)!'
  },
  {
    id: 'imf',
    title: 'İntermaksiller Çene Fiksasyonu (IMF / Telleme)',
    severity: 'KRİTİK — Havayolu Felaketi',
    tone: 'rose' as const,
    icon: ShieldAlert,
    risk: 'Çeneler kilitli olduğu için kusma = mekanik havayolu tıkanması ve ölümcül pulmoner aspirasyon!',
    action: 'Yatak başında TEL KESİCİ MAKAS zorunlu! Tam uyanık ekstübasyon + Propofol TIVA + 3–4’lü agresif profilaksi (Aprepitant + Deksametazon + 5-HT₃ + D₂/H₁).'
  },
  {
    id: 'iop',
    title: 'Göz İçi Basınç (GİB) / Açık Glob / Vitrektomi',
    severity: 'YÜKSEK — Ekspulsif Hemoraji',
    tone: 'amber' as const,
    icon: Eye,
    risk: 'Kusma sırasında Valsalva GİB’yi 30–40 mmHg sıçratır → ekspulsif koroidal hemoraji ve kalıcı görme/glob kaybı!',
    action: 'Volatil/N₂O yerine Propofol TIVA + Deksametazon + Ondansetron + Dimenhidrinat (şaşılık/göz cerrahisinde vestibüler-okülokardiyak avantaj).'
  },
  {
    id: 'gi_anastomosis',
    title: 'Özofagus / Gastrik / Bariatrik / Nissen Cerrahisi',
    severity: 'YÜKSEK — Anastomoz Rüptürü',
    tone: 'amber' as const,
    icon: Activity,
    risk: 'Şiddetli öğürme intraluminal basıncı artırır → anastomoz/sütür hattı rüptürü, Nissen fundoplikasyon sargısında açılma & mediastinit!',
    action: 'Minimal opioid + TIVA + 3–4’lü profilaksi (Aprepitant + Deksametazon + Ondansetron/Palonosetron + D₂). Gastrik distansiyondan kaçın.'
  },
  {
    id: 'neck_flap',
    title: 'Tiroid / Boyun / Plastik Serbest Flep Cerrahisi',
    severity: 'YÜKSEK — Boyun Hematomu',
    tone: 'violet' as const,
    icon: HeartPulse,
    risk: 'Valsalva kaynaklı venöz konjesyon & hipertansiyon → trakeaya bası yapan akut boyun hematomu veya mikrocerrahi serbest flepte venöz tromboz/nekroz!',
    action: 'Yumuşak ekstübasyon (öksürüksüz) + Propofol TIVA + 2–3’lü profilaksi (Deksametazon boyun ödemini de azaltır + Ondansetron + D₂/H₁).'
  }
];

const BASELINE_STRATEGIES = [
  {
    title: 'Rejyonel / Nöraksiyel Anestezi Tercihi',
    impact: 'En Düşük Bazal Risk',
    icon: ShieldCheck,
    detail:
      'Uygun vakalarda genel anestezi yerine periferik sinir bloğu veya nöraksiyel anestezi seçimi PONV’yi belirgin azaltır. Not: Spinal/epidural hipotansiyon beyin sapı hipoperfüzyonu ile bulantı tetikler — vazopresör ve sıvı ile normotansiyon korunmalıdır.'
  },
  {
    title: 'Propofol TIVA (Volatil Yerine)',
    impact: '~%25 Rölatif Risk Azalması (IMPACT)',
    icon: Syringe,
    detail:
      'Volatil anestezikler erken (0–2 sa) PONV’nin ana tetikleyicisidir. İdamede Propofol TIVA kullanımı tek başına 1 antiemetik ajan eklemekle eşdeğer koruma sağlar.'
  },
  {
    title: 'N₂O (Azot Protoksit)’den Kaçınma',
    impact: '~%12–20 Risk Azalması (>1 sa)',
    icon: Wind,
    detail:
      '1 saatten uzun vakalarda N₂O çıkarılması PONV’yi anlamlı azaltır; ayrıca orta kulak basıncını ve barsak distansiyonunu önleyerek KBB ve abdominal vakalarda çift avantaj sağlar.'
  },
  {
    title: 'Opioid-Sparing Multimodal Analjezi',
    impact: 'Geç PONV’de Kritik Azalma',
    icon: Layers,
    detail:
      'Parasetamol, NSAİİ / COX-2 inhibitörleri, rejyonel/fasyal plan blokları (TAP, ESP, PECS), IV lidokain infüzyonu, deksmedetomidin veya düşük doz ketamin ile intraop/postop opioid gereksinimini en aza indirin.'
  },
  {
    title: 'Perioperatif Kristaloid Hidrasyon & Preop CHO',
    impact: 'Splanknik İskemi Önleme',
    icon: Droplets,
    detail:
      'Uzamış açlık ve hipovolemi barsak mukozasında hipoperfüzyon ve 5-HT salınımı yapar. ERAS uyumlu preop berrak karbonhidrat içeceği ve 10–30 mL/kg dengeli kristaloid hidrasyon PONV’yi azaltır.'
  },
  {
    title: 'NMB Reversal Optimizasyonu (Sugammadeks)',
    impact: 'Neostigmin Dozunu Minimize Et',
    icon: Zap,
    detail:
      'Yüksek doz neostigmin (>2,5 mg) muskarinik GİS uyarısı nedeniyle tartışmalı/hafif PONV artışı gösterebilir. Sugammadeks ile reversal, özellikle yüksek riskli vakalarda erken PONV ve rezidüel blok avantajı sunar.'
  }
];

const EVIDENCE_REFS = [
  {
    citation:
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411–448.',
    note: 'Erişkin ve pediatrik PONV risk sınıflaması, multimodal 2–4 ajan profilaksi ve kurtarma algoritmasının ana uluslararası kılavuzu.'
  },
  {
    citation:
      'Apfel CC, Läärä E, Koivuranta M, Greim CA, Roewer N. A simplified risk score for predicting postoperative nausea and vomiting: conclusions from cross-validations between two centers. Anesthesiology. 1999;91(3):693–700.',
    note: '4 faktörlü erişkin Apfel risk skoru (%10, %21, %39, %61, %79 insidans eğrisi).'
  },
  {
    citation:
      'Apfel CC, Korttila K, Abdalla M, et al. (IMPACT Investigators). A factorial trial of six interventions for the prevention of postoperative nausea and vomiting. N Engl J Med. 2004;350(24):2441–2451.',
    note: 'Ondansetron, Deksametazon, Droperidol ve Propofol TIVA’nın her birinin bağımsız olarak rölatif riski ~%26 azalttığını gösteren dönüm noktası RKÇ.'
  },
  {
    citation:
      'Eberhart LH, Geldner G, Kranke P, et al. The development and validation of a risk score to predict the probability of postoperative vomiting in pediatric patients. Anesth Analg. 2004;99(6):1630–1637.',
    note: 'Pediatrik POVOC (Postoperative Vomiting in Children) 4 kriterli skorlaması (%9, %10, %30, %55, %70).'
  },
  {
    citation:
      'DREAMS Trial Collaborators and West Midlands Research Collaborative. Dexamethasone versus standard treatment for postoperative nausea and vomiting in gastrointestinal surgery: randomised controlled trial (DREAMS Trial). BMJ. 2017;357:j1455.',
    note: 'Gastrointestinal cerrahide indüksiyonda 8 mg IV Deksametazonun PONV’yi anlamlı azalttığını ve yan etki artışı yapmadığını gösteren geniş RKÇ.'
  },
  {
    citation:
      'Corcoran TB, Myles PS, Forbes AB, et al. (PADDI Trial Investigators). Dexamethasone and Surgical-Site Infection. N Engl J Med. 2021;384(18):1731–1741.',
    note: '8.725 hastada 8 mg IV Deksametazonun 30 günlük cerrahi alan enfeksiyonu açısından plaseboya non-inferior (güvenli) olduğunu kanıtlayan çalışma.'
  },
  {
    citation:
      'Lee A, Chan SKC, Fan LTY. Stimulation of the wrist acupuncture point PC6 for preventing postoperative nausea and vomiting. Cochrane Database Syst Rev. 2015;(11):CD003281.',
    note: 'P6 (Neiguan) akupunktur/akupresür/elektro-stimülasyonunun bulantı, kusma ve kurtarma antiemetik ihtiyacını anlamlı azalttığını gösteren Cochrane derlemesi.'
  }
];

function normalizeTr(text: string): string {
  return (text || '').toLocaleLowerCase('tr-TR');
}

function getApfelRiskPercent(score: number): number {
  const map = [10, 21, 39, 61, 79];
  return map[Math.min(Math.max(score, 0), 4)];
}

function getPovocRiskPercent(score: number): number {
  const map = [9, 10, 30, 55, 70];
  return map[Math.min(Math.max(score, 0), 4)];
}

function scrollToSection(id: string) {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export const PONVInfographic: React.FC<PONVInfographicProps> = ({ isDark }) => {
  // Section 2: Pathophysiology interactive state
  const [selectedPathwayId, setSelectedPathwayId] = useState<PathwayId>('ctz');
  const [selectedReceptor, setSelectedReceptor] = useState<ReceptorId | null>(null);

  // Section 3: Adult Apfel Calculator state
  const [apfelFemale, setApfelFemale] = useState(true);
  const [apfelNonSmoker, setApfelNonSmoker] = useState(true);
  const [apfelHistory, setApfelHistory] = useState(false);
  const [apfelOpioids, setApfelOpioids] = useState(true);
  const [apfelHighRiskSurgery, setApfelHighRiskSurgery] = useState(false);
  const [apfelCatastrophicGroup, setApfelCatastrophicGroup] = useState(false);
  const [copiedApfel, setCopiedApfel] = useState(false);

  // Section 6: Antiemetic Matrix filters
  const [trOnly, setTrOnly] = useState(false);
  const [classFilter, setClassFilter] = useState<DrugClassFilter>('Tümü');
  const [drugQuery, setDrugQuery] = useState('');
  const [copiedRecipeId, setCopiedRecipeId] = useState<string | null>(null);

  // Section 8: Rescue Selector state
  const [receivedProphylaxis, setReceivedProphylaxis] = useState<ProphylaxisClassId[]>([
    '5ht3',
    'steroid'
  ]);
  const [rescueAfter6h, setRescueAfter6h] = useState(false);
  const [copiedRescue, setCopiedRescue] = useState(false);

  // Section 9: Pediatric POVOC & Weight Calculator state
  const [povocDuration, setPovocDuration] = useState(true);
  const [povocAge, setPovocAge] = useState(true);
  const [povocStrabismus, setPovocStrabismus] = useState(false);
  const [povocHistory, setPovocHistory] = useState(false);
  const [pedWeightKg, setPedWeightKg] = useState<number>(20);
  const [copiedPediatric, setCopiedPediatric] = useState(false);

  // Section 10: References expand
  const [showRefs, setShowRefs] = useState(true);

  // Derived Pathophysiology
  const activePathway = useMemo(
    () => PATHWAYS.find((p) => p.id === selectedPathwayId) || PATHWAYS[0],
    [selectedPathwayId]
  );

  // Derived Adult Apfel
  const apfelScore =
    (apfelFemale ? 1 : 0) +
    (apfelNonSmoker ? 1 : 0) +
    (apfelHistory ? 1 : 0) +
    (apfelOpioids ? 1 : 0);
  const apfelRisk = getApfelRiskPercent(apfelScore);

  const apfelRecommendation = useMemo(() => {
    if (apfelCatastrophicGroup || apfelScore >= 3) {
      return {
        tier: apfelCatastrophicGroup ? 'Çok Yüksek / Özel Koruma (3–4 Ajan + TIVA)' : 'Yüksek Risk (3–4 Ajan Multimodal)',
        badgeColor: 'rose' as const,
        agentCount: '3–4 Farklı Sınıf + Propofol TIVA',
        summary:
          'Gan 2020 (>2 risk faktörü veya kusmanın felaket olacağı cerrahi): 3–4 farklı sınıftan multimodal profilaksi + bazal risk azaltma (Propofol TIVA + N₂O’suz + opioid-sparing blok/analjezi).',
        trPlan: [
          'Propofol TIVA (volatil ve N₂O’dan kaçın) + Rejyonel blok / opioid-sparing multimodal analjezi',
          'Deksametazon 4–8 mg IV (indüksiyonda, yavaş)',
          'Ondansetron 4 mg IV (bitişten 30 dk önce) VEYA Palonosetron 0,075 mg IV (indüksiyonda)',
          '3. Ajan: Haloperidol 0,5–1 mg IV (QTc kontrolü ile) VEYA Metoklopramid 10 mg IV VEYA Dimenhidrinat 50 mg IV (KBB/şaşılık)',
          '4. Ajan (Apfel 4 / IMF / KİB): Preop 1–3 sa önce Aprepitant 80 mg PO (varsa)'
        ]
      };
    }
    if (apfelScore >= 1 || apfelHighRiskSurgery) {
      return {
        tier: 'Orta Risk (2 Ajan Multimodal — Gan 2020)',
        badgeColor: 'amber' as const,
        agentCount: '2 Farklı Sınıf',
        summary:
          'Gan 2020 (1–2 risk faktörü): Monoterapi yerine baştan 2 farklı sınıftan multimodal profilaksi önerilir (yüksek riskli cerrahi eklendiyse TIVA veya 3. ajan düşünülebilir).',
        trPlan: [
          'Deksametazon 4–8 mg IV (indüksiyonda, yavaş)',
          'Ondansetron 4 mg IV (operasyon bitiminden 30 dk önce) VEYA Palonosetron 0,075 mg IV (indüksiyonda)',
          apfelHighRiskSurgery
            ? 'Yüksek riskli cerrahi nedeniyle ek olarak Propofol TIVA veya 3. ajan (Dimenhidrinat / D₂) düşünülmelidir.'
            : 'Opioid-sparing analjezi + yeterli kristaloid hidrasyon (10–30 mL/kg)'
        ]
      };
    }
    return {
      tier: 'Düşük Risk (0 Faktör — Bazal Risk Azaltma)',
      badgeColor: 'emerald' as const,
      agentCount: '0–1 Ajan / Bekle-Gör',
      summary:
        'Gan 2020 (0 risk faktörü): Rutin farmakolojik profilaksi zorunlu değildir; bazal risk azaltma (hidrasyon, multimodal analjezi) yeterlidir. Kurtarma gerekirse düşük doz 5-HT₃ (Ondansetron 1–4 mg IV) hazırdır.',
      trPlan: [
        'Rutin farmakolojik profilaksi şart değil (ancak günübirlik/hasta beklentisi varsa tek doz Deksametazon veya Ondansetron düşünülebilir)',
        'Yeterli perioperatif kristaloid hidrasyon + opioid-sparing analjezi',
        'PONV gelişirse kurtarmada 1. tercih: Ondansetron 1–4 mg IV'
      ]
    };
  }, [apfelScore, apfelHighRiskSurgery, apfelCatastrophicGroup]);

  // Derived Antiemetic Matrix
  const trCount = useMemo(
    () => ANTIEMETIC_AGENTS.filter((a) => a.trAvailability !== 'yok').length,
    []
  );

  const filteredAgents = useMemo(() => {
    const tokens = normalizeTr(drugQuery.trim()).split(/\s+/).filter(Boolean);
    return ANTIEMETIC_AGENTS.filter((agent) => {
      if (trOnly && agent.trAvailability === 'yok') return false;
      if (classFilter !== 'Tümü' && agent.drugClass !== classFilter) return false;
      if (tokens.length === 0) return true;
      const hay = normalizeTr(
        [
          agent.name,
          agent.trBrands,
          agent.drugClass,
          agent.adultDose,
          agent.pediatricDose,
          agent.timing,
          agent.receptors,
          agent.warningTag || '',
          ...agent.clinicalNotes
        ].join(' ')
      );
      return tokens.every((t) => hay.includes(t));
    });
  }, [trOnly, classFilter, drugQuery]);

  // Derived Rescue Selector
  const toggleProphylaxis = (id: ProphylaxisClassId) => {
    setReceivedProphylaxis((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rescueAnalysis = useMemo(() => {
    const noProph = receivedProphylaxis.length === 0;
    const blocked: { name: string; reason: string }[] = [
      {
        name: 'Deksametazon / Metilprednizolon',
        reason: 'Yavaş etki başlangıcı (>2 saat) nedeniyle akut kurtarmada KULLANILMAZ (Gan 2020).'
      },
      {
        name: 'Transdermal Skopolamin',
        reason: '2–4 saat geç etki başlangıcı nedeniyle akut kurtarmada KULLANILMAZ (TR’de de yok).'
      },
      {
        name: 'Oral Aprepitant (Akut Kusan Hastada)',
        reason: 'Oral emilim ve başlangıç süresi akut PACU kurtarması için uygun değildir.'
      }
    ];

    if (!rescueAfter6h) {
      if (receivedProphylaxis.includes('5ht3')) {
        blocked.unshift({
          name: '5-HT₃ Antagonistleri (Ondansetron / Granisetron / Palonosetron)',
          reason: 'İlk 6 saat içinde profilakside 5-HT₃ alan hastada tekrar dozu ETKİSİZDİR (QTc riskini artırır)!'
        });
      }
      if (receivedProphylaxis.includes('d2')) {
        blocked.unshift({
          name: 'D₂ Antagonistleri (Metoklopramid / Haloperidol)',
          reason: 'İlk 6 saat içinde aynı D₂ sınıfının tekrarı yerine farklı reseptör sınıfı seçilmelidir (EPS/QTc riski).'
        });
      }
      if (receivedProphylaxis.includes('h1')) {
        blocked.unshift({
          name: 'Antihistaminik H₁ (Dimenhidrinat)',
          reason: 'İlk 6 saat içinde tekrar H₁ yerine farklı sınıf (D₂ veya 5-HT₃) seçin; aşırı sedasyondan kaçının.'
        });
      }
    }

    const recommended: {
      priority: string;
      agent: string;
      dose: string;
      classLabel: string;
      note: string;
    }[] = [];

    if (noProph) {
      recommended.push({
        priority: '1. Tercih (TR ✓)',
        agent: 'Ondansetron',
        dose: '1–4 mg IV yavaş puşe',
        classLabel: '5-HT₃ Antagonisti',
        note: 'Hiç profilaksi almayan hastada düşük doz 5-HT₃ kurtarmada altın standart 1. tercihtir.'
      });
    } else if (!receivedProphylaxis.includes('5ht3')) {
      recommended.push({
        priority: '1. Tercih (TR ✓)',
        agent: 'Ondansetron (veya Granisetron 1 mg IV)',
        dose: '4 mg IV yavaş puşe',
        classLabel: '5-HT₃ Antagonisti',
        note: 'Profilakside 5-HT₃ alınmadığı için farklı sınıf olarak en yüksek kurtarma etkinliği.'
      });
    }

    if (!receivedProphylaxis.includes('d2') || rescueAfter6h) {
      recommended.push({
        priority: recommended.length === 0 ? '1. Tercih (TR ✓)' : 'Güçlü Alternatif (TR ✓)',
        agent: 'Haloperidol (düşük doz) veya Metoklopramid',
        dose: 'Haloperidol 0,5–1 mg IV (EKG/QTc kontrol!) · Metoklopramid 10 mg IV yavaş',
        classLabel: 'D₂ Antagonisti',
        note:
          receivedProphylaxis.includes('d2') && rescueAfter6h
            ? '>6 saat geçtiği için değerlendirilebilir; yine de almadığı sınıf varsa önceliklidir. Parkinson’da YASAK.'
            : '5-HT₃ + Deksametazon alan hastalarda TR pratiğinde en sık kurtarma sınıfı. Parkinson & uzun QT kontrolü yapın.'
      });
    }

    if (!receivedProphylaxis.includes('h1') || rescueAfter6h) {
      recommended.push({
        priority: recommended.length === 0 ? '1. Tercih (TR ✓)' : 'Özellikle KBB / Vestibüler (TR ✓)',
        agent: 'Dimenhidrinat',
        dose: '50 mg (1 mg/kg) IV/IM',
        classLabel: 'Antihistaminik (H₁)',
        note: 'Baş dönmesi, hareketle artan bulantı, KBB/şaşılık sonrası çok etkili. Geriatride sedasyon/deliryum izlemi.'
      });
    }

    if (receivedProphylaxis.includes('5ht3') && rescueAfter6h) {
      recommended.push({
        priority: '>6 Saat Opsiyonu (TR ✓)',
        agent: 'Ondansetron Tekrar Dozu (Yalnızca >6 sa geçtiyse)',
        dose: '4 mg IV (Palonosetron alındıysa 40 sa yarı ömür nedeniyle tekrarlama!)',
        classLabel: '5-HT₃ Antagonisti',
        note: 'İlk dozdan >6 saat geçtiyse ve başka sınıf kullanılamıyorsa düşünülebilir; farklı sınıf yine de tercih edilir.'
      });
    }

    recommended.push({
      priority: 'PACU Acil Köprü (TR ✓)',
      agent: 'Propofol Subhipnotik Bolus + %70 İzopropil Alkol İnhalasyonu',
      dose: 'Propofol 10–20 mg IV (sadece monitörize PACU!) · Alkollü ped koklatma (ilk 10–15 dk)',
      classLabel: 'Kısa Etkili Köprü',
      note: 'İnatçı PACU kusmasında hızlı rahatlama sağlar; Propofol kısa etkilidir (15–30 dk) ve havayolu/SpO₂ monitörizasyonu şarttır.'
    });

    return { noProph, blocked, recommended };
  }, [receivedProphylaxis, rescueAfter6h]);

  // Derived Pediatric POVOC & Weight
  const povocScore =
    (povocDuration ? 1 : 0) +
    (povocAge ? 1 : 0) +
    (povocStrabismus ? 1 : 0) +
    (povocHistory ? 1 : 0);
  const povocRisk = getPovocRiskPercent(povocScore);

  const pedDoses = useMemo(() => {
    const w = pedWeightKg;
    const ondRaw = +(w * 0.1).toFixed(2);
    const ondFinal = Math.min(ondRaw, 4);
    const dexRaw = +(w * 0.15).toFixed(2);
    const dexCap4 = Math.min(dexRaw, 4);
    const dexCap8 = Math.min(dexRaw, 8);
    const dimRaw = +(w * 0.5).toFixed(1);
    const dimFinal = Math.min(dimRaw, 25);
    const metLow = Math.min(+(w * 0.1).toFixed(2), 10);
    const metHigh = Math.min(+(w * 0.15).toFixed(2), 10);
    return {
      ondRaw,
      ondFinal,
      ondCapped: ondRaw > 4,
      dexRaw,
      dexCap4,
      dexCap8,
      dexCapped4: dexRaw > 4,
      dexCapped8: dexRaw > 8,
      dimRaw,
      dimFinal,
      dimCapped: dimRaw > 25,
      metLow,
      metHigh
    };
  }, [pedWeightKg]);

  const povocPlan = useMemo(() => {
    if (povocScore === 0) {
      return {
        level: 'Düşük Risk (POVOC 0 → %9)',
        tone: 'emerald' as const,
        plan: 'Rutin profilaksi gerekmez (bekle-gör). Yeterli hidrasyon ve opioid-sparing analjezi sağlayın.'
      };
    }
    if (povocScore <= 2) {
      return {
        level: `Orta Risk (POVOC ${povocScore} → %${povocRisk})`,
        tone: 'amber' as const,
        plan: 'Gan 2020: 2’li kombinasyon önerilir — Deksametazon 0,15 mg/kg IV (indüksiyonda) + Ondansetron 0,1 mg/kg IV (bitişe yakın).'
      };
    }
    return {
      level: `Yüksek Risk (POVOC ${povocScore} → %${povocRisk})`,
      tone: 'rose' as const,
      plan: 'Gan 2020: Propofol TIVA (volatil/N₂O’suz) + Deksametazon 0,15 mg/kg IV + Ondansetron 0,1 mg/kg IV + gerekirse 3. ajan (Dimenhidrinat 0,5 mg/kg IV, >2 yaş) + opioid-sparing rejyonel blok!'
    };
  }, [povocScore, povocRisk]);

  // Copy handlers
  const handleCopyApfel = async () => {
    const activeFactors: string[] = [];
    if (apfelFemale) activeFactors.push('Kadın cinsiyet');
    if (apfelNonSmoker) activeFactors.push('Sigara içmeme');
    if (apfelHistory) activeFactors.push('PONV / taşıt tutması öyküsü');
    if (apfelOpioids) activeFactors.push('Postoperatif opioid planı');
    const modifiers: string[] = [];
    if (apfelHighRiskSurgery) modifiers.push('Yüksek riskli cerrahi');
    if (apfelCatastrophicGroup) modifiers.push('Kusmanın felaket olacağı özel grup (KİB/IMF/GİB/anastomoz/boyun)');

    const text = [
      'PONV RİSK DEĞERLENDİRMESİ & PROFİLAKSİ PLANI (Gan 2020 / Apfel)',
      `• Apfel Skoru: ${apfelScore}/4 → Tahmini PONV Riski: %${apfelRisk}`,
      `• Mevcut Risk Faktörleri: ${activeFactors.length > 0 ? activeFactors.join(', ') : 'Yok'}`,
      modifiers.length > 0 ? `• Ek Klinik Modifiyerler: ${modifiers.join(', ')}` : null,
      `• Önerilen Basamak: ${apfelRecommendation.tier}`,
      '',
      'TR Klinik Uygulama Planı:',
      ...apfelRecommendation.trPlan.map((item) => `  - ${item}`),
      '',
      'Not: Kurtarma gerekirse ilk 6 saatte profilakside kullanılan sınıftan FARKLI sınıf seçiniz (Deksametazon kurtarmada kullanılmaz).',
      'Kaynak: Şişli Hamidiye Etfal Anestezi Asistan Portalı'
    ]
      .filter(Boolean)
      .join('\n');

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedApfel(true);
      setTimeout(() => setCopiedApfel(false), 2200);
    }
  };

  const handleCopyRecipe = async (recipeId: string, title: string, lines: string[]) => {
    const text = [
      `PONV TR PROFİLAKSİ REÇETESİ — ${title}`,
      ...lines.map((l) => `• ${l}`),
      'Kaynak: Fourth Consensus Guidelines (Gan 2020) · Şişli Etfal Anestezi Portalı'
    ].join('\n');
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedRecipeId(recipeId);
      setTimeout(() => setCopiedRecipeId(null), 2000);
    }
  };

  const handleCopyRescue = async () => {
    const givenLabels =
      receivedProphylaxis.length === 0
        ? 'Profilaksi almadı'
        : PROPHYLAXIS_OPTIONS.filter((o) => receivedProphylaxis.includes(o.id))
            .map((o) => o.label)
            .join(', ');
    const text = [
      'PONV KURTARMA (RESCUE) PLANI (Gan 2020)',
      `• Profilakside Verilenler: ${givenLabels}`,
      `• Zaman Penceresi: ${rescueAfter6h ? '>6 saat sonrası' : 'İlk 6 saat içi (<6 sa)'}`,
      '• Önce Dışla: Hipoksi, Hipotansiyon, Hipoglisemi, KİB artışı, yutulmuş kan, gastrik distansiyon, mekanik obstrüksiyon!',
      '',
      'Önerilen TR Kurtarma Seçenekleri:',
      ...rescueAnalysis.recommended.map(
        (r) => `  - [${r.priority}] ${r.agent}: ${r.dose} (${r.classLabel})`
      ),
      '',
      'Kaçınılması Gerekenler:',
      ...rescueAnalysis.blocked.map((b) => `  × ${b.name} — ${b.reason}`),
      'Kaynak: Şişli Hamidiye Etfal Anestezi Asistan Portalı'
    ].join('\n');

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedRescue(true);
      setTimeout(() => setCopiedRescue(false), 2200);
    }
  };

  const handleCopyPediatric = async () => {
    const text = [
      `PEDİATRİK POVOC & KİLO-BAZLI DOZ ÖZETİ (${pedWeightKg} kg)`,
      `• Eberhart POVOC Skoru: ${povocScore}/4 → Tahmini POV Riski: %${povocRisk}`,
      `• Plan: ${povocPlan.plan}`,
      '',
      `Hesaplanan IV Dozlar (${pedWeightKg} kg):`,
      `• Ondansetron (0,1 mg/kg, maks 4 mg): ${pedDoses.ondFinal} mg IV (bitişe yakın)`,
      `• Deksametazon (0,15 mg/kg, maks 4–8 mg): ${pedDoses.dexCap4}–${pedDoses.dexCap8} mg IV (indüksiyonda)`,
      `• Dimenhidrinat (0,5 mg/kg, maks 25 mg, >2 yaş): ${pedDoses.dimFinal} mg IV`,
      `• Metoklopramid (0,1–0,15 mg/kg, maks 10 mg — sadece 2. basamak/kurtarma, EPS riski!): ${pedDoses.metLow}–${pedDoses.metHigh} mg IV`,
      'Kaynak: Gan 2020 / Eberhart POVOC · Şişli Hamidiye Etfal Anestezi Portalı'
    ].join('\n');

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedPediatric(true);
      setTimeout(() => setCopiedPediatric(false), 2200);
    }
  };

  // Shared design tokens
  const cardSurface = isDark
    ? 'bg-slate-900/90 border-slate-800'
    : 'bg-white border-slate-200 shadow-xs';
  const mutedSurface = isDark
    ? 'bg-slate-950/60 border-slate-800/90'
    : 'bg-slate-50/90 border-slate-200/90';

  const receptorHighlightMatchesPathway = (p: PathwayNode) => {
    if (!selectedReceptor) return false;
    return p.receptors.includes(selectedReceptor);
  };

  return (
    <div className="space-y-6">
      {/* ===================================================================== */}
      {/* STICKY HIZLI BÖLÜM GEZGİNİ                                            */}
      {/* ===================================================================== */}
      <div
        className={`sticky top-0 z-20 -mx-1 px-2 py-2 rounded-xl border backdrop-blur-md ${
          isDark
            ? 'bg-slate-950/88 border-slate-800/90'
            : 'bg-white/92 border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <span
            className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${
              isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-50 text-teal-700'
            }`}
          >
            <Compass className="w-3 h-3" />
            Bölümler
          </span>
          {SECTION_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BÖLÜM 1: BAŞLANGIÇ, TANIM, İNSİDANS & KLİNİK ÖNEMİ                    */}
      {/* ===================================================================== */}
      <section id="ponv-sec-intro" className={`rounded-2xl border p-4 sm:p-6 scroll-mt-16 ${cardSurface}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md font-bold border ${
                  isDark
                    ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                    : 'bg-teal-50 text-teal-700 border-teal-200'
                }`}
              >
                Fourth Consensus Guidelines (Gan et al. 2020) · IMPACT · Eberhart POVOC
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                  isDark
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                Erişkin + Pediatrik · TR İlaç Filtreli
              </span>
            </div>
            <h2 className={`text-lg sm:text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              PONV — Postoperatif Bulantı ve Kusma: Patofizyoloji, Risk Skorlama, Multimodal Profilaksi &amp; Kurtarma
            </h2>
            <p className={`text-xs sm:text-[13px] max-w-4xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Cerrahi sonrası ilk 24 saatte ortaya çıkan bulantı, öğürme veya kusma; hastaların çoğu kez{' '}
              <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>
                postoperatif ağrıdan bile daha fazla korktuğu
              </strong>
              , PACU kalış süresini uzatan ve kritik cerrahilerde hayatı tehdit eden komplikasyonlara yol açabilen
              önlenebilir bir perioperatif sorundur.
            </p>
          </div>
        </div>

        {/* İnsidans KPI Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div
            className={`rounded-xl border p-3.5 ${
              isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50/80 border-amber-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-bold uppercase tracking-wide ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                Genel Cerrahi İnsidansı
              </span>
              <Activity className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <div className={`text-2xl sm:text-3xl font-black font-mono ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
              ~%30
            </div>
            <p className={`text-[11px] mt-1 leading-snug ${isDark ? 'text-amber-200/80' : 'text-amber-900/80'}`}>
              Profilaksi uygulanmayan tüm cerrahi hastalarda (bulantı ~%30–50, kusma ~%20–30)
            </p>
          </div>

          <div
            className={`rounded-xl border p-3.5 ${
              isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50/80 border-rose-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-bold uppercase tracking-wide ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                Yüksek Riskli Popülasyon
              </span>
              <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
            </div>
            <div className={`text-2xl sm:text-3xl font-black font-mono ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>
              %70–80
            </div>
            <p className={`text-[11px] mt-1 leading-snug ${isDark ? 'text-rose-200/80' : 'text-rose-900/80'}`}>
              Apfel 3–4 puan erişkinler veya yüksek riskli pediatrik şaşılık / tonsillektomi vakaları
            </p>
          </div>

          <div
            className={`rounded-xl border p-3.5 ${
              isDark ? 'bg-sky-500/10 border-sky-500/30' : 'bg-sky-50/80 border-sky-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-bold uppercase tracking-wide ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                Günübirlik PDNV Riski
              </span>
              <Clock className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
            </div>
            <div className={`text-2xl sm:text-3xl font-black font-mono ${isDark ? 'text-sky-200' : 'text-sky-900'}`}>
              ~%37
            </div>
            <p className={`text-[11px] mt-1 leading-snug ${isDark ? 'text-sky-200/80' : 'text-sky-900/80'}`}>
              Taburculuk sonrası evde gelişen bulantı-kusma; planlanmamış hastane yatışının başlıca nedeni
            </p>
          </div>
        </div>

        {/* 4 Klinik Tanım Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
          {[
            {
              tag: 'PONV (0–24 sa)',
              title: 'Postoperatif Bulantı & Kusma',
              desc: 'Cerrahi sonrası ilk 24 saatte görülen bulantı, öğürme (retching) veya kusma ataklarının tamamı.'
            },
            {
              tag: 'Erken vs Geç PONV',
              title: '0–2 Saat vs 2–24 Saat',
              desc: 'Erken (0–2 sa): Volatil anesteziklerin ana etkisi. Geç (2–24 sa): Postop opioidler, cerrahi inflamasyon & GİS stazı.'
            },
            {
              tag: 'PDNV',
              title: 'Taburculuk Sonrası (Günübirlik)',
              desc: 'Post-Discharge Nausea & Vomiting. Evde IV erişim yok! Uzun etkili profilaksi (Deksametazon, Palonosetron, Aprepitant) kritik.'
            },
            {
              tag: 'POV (Pediatrik)',
              title: 'Pediatrik Postoperatif Kusma',
              desc: 'Küçük çocuklar bulantıyı güvenilir ifade edemediğinden pediatrik klinik sonlanım objektif kusmadır (Eberhart POVOC).'
            }
          ].map((def) => (
            <div key={def.tag} className={`rounded-xl border p-3 ${mutedSurface}`}>
              <span
                className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded mb-1.5 ${
                  isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100/80 text-teal-800'
                }`}
              >
                {def.tag}
              </span>
              <h4 className={`text-xs font-bold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {def.title}
              </h4>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {def.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Klinik Önemi & Komplikasyonlar */}
        <div
          className={`rounded-xl border p-3.5 ${
            isDark ? 'bg-rose-950/20 border-rose-500/25' : 'bg-rose-50/50 border-rose-200/80'
          }`}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <AlertOctagon className={`w-4 h-4 shrink-0 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>
              Klinik Önemi &amp; Potansiyel Ciddi Komplikasyonlar
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
            {[
              { label: 'Pulmoner Aspirasyon', detail: 'Özellikle rezidüel sedasyon / havayolu refleksleri tam dönmeden' },
              { label: 'Sütür & Yara Ayrışması', detail: 'Karın içi basınç artışı → yara dehissansı, evisserasyon, anastomoz kaçağı' },
              { label: 'Özofagus Rüptürü (Boerhaave)', detail: 'Şiddetli öğürme/kusma → Mallory-Weiss yırtığı veya transmural rüptür' },
              { label: 'KİB & GİB Sıçraması', detail: 'Valsalva → intrakraniyel kanama / açık globda ekspulsif koroidal hemoraji' },
              { label: 'Boyun / Tiroid Hematomu', detail: 'Venöz konjesyon → akut trakea basısı ve mikrocerrahi flep kaybı' },
              { label: 'Dehidratasyon & Elektrolit', detail: 'Hipokalemi, hipokloremik metabolik alkaloz, oral alım gecikmesi' },
              { label: 'PACU Kalış Uzaması', detail: 'Her PONV atağı PACU taburculuğunu ~20–60 dk geciktirir, maliyet artar' },
              { label: 'Planlanmamış Yatış', detail: 'Günübirlik cerrahide beklenmedik hastane yatışının en sık nedenlerinden' }
            ].map((c) => (
              <div
                key={c.label}
                className={`rounded-lg border px-2.5 py-2 ${
                  isDark ? 'bg-slate-900/75 border-rose-500/20' : 'bg-white/90 border-rose-200/70'
                }`}
              >
                <div className={`font-bold ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>{c.label}</div>
                <div className={`mt-0.5 leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{c.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: PATOFİZYOLOJİ — İNTERAKTİF 5 YOLAK & NÖRO-RESEPTÖR HARİTASI  */}
      {/* ===================================================================== */}
      <section id="ponv-sec-patho" className={`rounded-2xl border p-4 sm:p-6 scroll-mt-16 ${cardSurface}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                isDark ? 'bg-violet-500/15 text-violet-300' : 'bg-violet-50 text-violet-700'
              }`}
            >
              Bölüm 2 · İnteraktif Nöro-Farmakoloji Haritası
            </span>
            <h3 className={`text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              PONV Patofizyolojisi: 5 Emetik Yolak &amp; Hedef Reseptörler
            </h3>
          </div>
          <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Bir yolağa veya reseptöre tıklayın → hangi antiemetik sınıflarının bloke ettiğini görün.
          </p>
        </div>

        {/* Reseptör Hızlı Filtre Çipleri */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          <span className={`text-[11px] font-semibold mr-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Reseptör Vurgula:
          </span>
          {(Object.keys(RECEPTOR_INFO) as ReceptorId[]).map((rec) => {
            const active = selectedReceptor === rec;
            return (
              <button
                key={rec}
                type="button"
                onClick={() => setSelectedReceptor(active ? null : rec)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border transition-all cursor-pointer ${
                  active
                    ? isDark
                      ? 'bg-teal-500/25 text-teal-200 border-teal-400 shadow-xs'
                      : 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-teal-500/50'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-400'
                }`}
              >
                {rec === '5-HT3' ? '5-HT₃' : rec === 'D2' ? 'D₂' : rec === 'NK1' ? 'NK₁' : rec === 'H1' ? 'H₁' : rec === 'M1' ? 'M₁' : 'Kortikal/GABA'}
              </button>
            );
          })}
          {selectedReceptor && (
            <button
              type="button"
              onClick={() => setSelectedReceptor(null)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <X className="w-3 h-3" /> Temizle
            </button>
          )}
        </div>

        {selectedReceptor && (
          <div
            className={`mb-4 rounded-xl border p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              isDark
                ? 'bg-teal-500/10 border-teal-500/35 text-teal-100'
                : 'bg-teal-50 border-teal-200 text-teal-950'
            }`}
          >
            <div className="space-y-0.5">
              <div className="text-xs font-bold">
                Hedef Reseptör: {RECEPTOR_INFO[selectedReceptor].label} →{' '}
                <span className={isDark ? 'text-teal-300' : 'text-teal-700'}>
                  {RECEPTOR_INFO[selectedReceptor].drugClasses}
                </span>
              </div>
              <div className={`text-[11px] ${isDark ? 'text-teal-200/85' : 'text-teal-900/85'}`}>
                {RECEPTOR_INFO[selectedReceptor].note}
              </div>
            </div>
            <div
              className={`shrink-0 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border ${
                isDark
                  ? 'bg-slate-900/80 border-teal-500/30 text-teal-200'
                  : 'bg-white border-teal-200 text-teal-800'
              }`}
            >
              TR: {RECEPTOR_INFO[selectedReceptor].trDrugs}
            </div>
          </div>
        )}

        {/* İnteraktif SVG Diyagram + Detay Paneli */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Sol: İnteraktif SVG */}
          <div className={`lg:col-span-7 rounded-xl border p-3 flex flex-col justify-between ${mutedSurface}`}>
            <svg
              viewBox="0 0 640 360"
              className="w-full h-auto select-none"
              role="img"
              aria-label="PONV 5 Emetik Yolak ve Kusma Merkezi Diyagramı"
            >
              <defs>
                <marker
                  id="ponv-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={isDark ? '#64748b' : '#94a3b8'} />
                </marker>
                <marker
                  id="ponv-arrow-active"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#14b8a6" />
                </marker>
              </defs>

              {/* Bağlantı okları -> Merkez NTS (320, 180) */}
              {[
                { id: 'ctz' as PathwayId, x1: 165, y1: 82, x2: 265, y2: 148 },
                { id: 'cortical' as PathwayId, x1: 475, y1: 82, x2: 375, y2: 148 },
                { id: 'gi_vagal' as PathwayId, x1: 165, y1: 278, x2: 265, y2: 212 },
                { id: 'vestibular' as PathwayId, x1: 475, y1: 278, x2: 375, y2: 212 }
              ].map((line) => {
                const p = PATHWAYS.find((item) => item.id === line.id)!;
                const isActive =
                  selectedPathwayId === line.id ||
                  selectedPathwayId === 'nts' ||
                  receptorHighlightMatchesPathway(p);
                return (
                  <line
                    key={line.id}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={isActive ? '#14b8a6' : isDark ? '#475569' : '#cbd5e1'}
                    strokeWidth={isActive ? 3 : 2}
                    strokeDasharray={isActive ? undefined : '5 4'}
                    markerEnd={isActive ? 'url(#ponv-arrow-active)' : 'url(#ponv-arrow)'}
                  />
                );
              })}

              {/* 1. CTZ (Sol Üst) */}
              {(() => {
                const p = PATHWAYS[0];
                const active = selectedPathwayId === 'ctz' || receptorHighlightMatchesPathway(p);
                return (
                  <g
                    onClick={() => setSelectedPathwayId('ctz')}
                    className="cursor-pointer"
                  >
                    <rect
                      x="18"
                      y="22"
                      width="196"
                      height="82"
                      rx="14"
                      fill={
                        active
                          ? isDark
                            ? 'rgba(244,63,94,0.22)'
                            : 'rgba(255,228,230,0.95)'
                          : isDark
                            ? '#0f172a'
                            : '#ffffff'
                      }
                      stroke={active ? '#f43f5e' : isDark ? '#334155' : '#cbd5e1'}
                      strokeWidth={active ? 2.5 : 1.5}
                    />
                    <text x="32" y="45" fontSize="12" fontWeight="800" fill={isDark ? '#fda4af' : '#be123c'}>
                      1. CTZ (Area Postrema)
                    </text>
                    <text x="32" y="62" fontSize="10" fill={isDark ? '#cbd5e1' : '#475569'}>
                      KBB dışında! Opioid · Volatil
                    </text>
                    <text x="32" y="84" fontSize="10.5" fontWeight="700" fontFamily="monospace" fill={isDark ? '#fb7185' : '#9f1239'}>
                      5-HT₃ · D₂ · NK₁
                    </text>
                  </g>
                );
              })()}

              {/* 4. Kortikal (Sağ Üst) */}
              {(() => {
                const p = PATHWAYS[3];
                const active = selectedPathwayId === 'cortical' || receptorHighlightMatchesPathway(p);
                return (
                  <g
                    onClick={() => setSelectedPathwayId('cortical')}
                    className="cursor-pointer"
                  >
                    <rect
                      x="426"
                      y="22"
                      width="196"
                      height="82"
                      rx="14"
                      fill={
                        active
                          ? isDark
                            ? 'rgba(139,92,246,0.22)'
                            : 'rgba(237,233,254,0.95)'
                          : isDark
                            ? '#0f172a'
                            : '#ffffff'
                      }
                      stroke={active ? '#8b5cf6' : isDark ? '#334155' : '#cbd5e1'}
                      strokeWidth={active ? 2.5 : 1.5}
                    />
                    <text x="440" y="45" fontSize="12" fontWeight="800" fill={isDark ? '#c4b5fd' : '#6d28d9'}>
                      4. Kortikal &amp; Limbik
                    </text>
                    <text x="440" y="62" fontSize="10" fill={isDark ? '#cbd5e1' : '#475569'}>
                      Anksiyete · Ağrı · Koku · KİB
                    </text>
                    <text x="440" y="84" fontSize="10.5" fontWeight="700" fontFamily="monospace" fill={isDark ? '#a78bfa' : '#5b21b6'}>
                      GABA · Kortikal Eşik
                    </text>
                  </g>
                );
              })()}

              {/* 2. GİS & Vagal (Sol Alt) */}
              {(() => {
                const p = PATHWAYS[1];
                const active = selectedPathwayId === 'gi_vagal' || receptorHighlightMatchesPathway(p);
                return (
                  <g
                    onClick={() => setSelectedPathwayId('gi_vagal')}
                    className="cursor-pointer"
                  >
                    <rect
                      x="18"
                      y="256"
                      width="196"
                      height="82"
                      rx="14"
                      fill={
                        active
                          ? isDark
                            ? 'rgba(20,184,166,0.22)'
                            : 'rgba(204,251,241,0.95)'
                          : isDark
                            ? '#0f172a'
                            : '#ffffff'
                      }
                      stroke={active ? '#14b8a6' : isDark ? '#334155' : '#cbd5e1'}
                      strokeWidth={active ? 2.5 : 1.5}
                    />
                    <text x="32" y="279" fontSize="12" fontWeight="800" fill={isDark ? '#5eead4' : '#0f766e'}>
                      2. GİS &amp; Vagal Afferent
                    </text>
                    <text x="32" y="296" fontSize="10" fill={isDark ? '#cbd5e1' : '#475569'}>
                      Enterokromaffin · Cerrahi · Kan
                    </text>
                    <text x="32" y="318" fontSize="10.5" fontWeight="700" fontFamily="monospace" fill={isDark ? '#2dd4bf' : '#115e59'}>
                      5-HT₃ · NK₁ (CN X)
                    </text>
                  </g>
                );
              })()}

              {/* 3. Vestibüler (Sağ Alt) */}
              {(() => {
                const p = PATHWAYS[2];
                const active = selectedPathwayId === 'vestibular' || receptorHighlightMatchesPathway(p);
                return (
                  <g
                    onClick={() => setSelectedPathwayId('vestibular')}
                    className="cursor-pointer"
                  >
                    <rect
                      x="426"
                      y="256"
                      width="196"
                      height="82"
                      rx="14"
                      fill={
                        active
                          ? isDark
                            ? 'rgba(245,158,11,0.22)'
                            : 'rgba(254,243,199,0.95)'
                          : isDark
                            ? '#0f172a'
                            : '#ffffff'
                      }
                      stroke={active ? '#f59e0b' : isDark ? '#334155' : '#cbd5e1'}
                      strokeWidth={active ? 2.5 : 1.5}
                    />
                    <text x="440" y="279" fontSize="12" fontWeight="800" fill={isDark ? '#fcd34d' : '#b45309'}>
                      3. Vestibüler Sistem
                    </text>
                    <text x="440" y="296" fontSize="10" fill={isDark ? '#cbd5e1' : '#475569'}>
                      Hareket · Orta Kulak · Şaşılık
                    </text>
                    <text x="440" y="318" fontSize="10.5" fontWeight="700" fontFamily="monospace" fill={isDark ? '#fbbf24' : '#92400e'}>
                      H₁ · M₁ (CN VIII)
                    </text>
                  </g>
                );
              })()}

              {/* 5. Merkez: NTS / Kusma Merkezi */}
              {(() => {
                const p = PATHWAYS[4];
                const active = selectedPathwayId === 'nts' || receptorHighlightMatchesPathway(p);
                return (
                  <g
                    onClick={() => setSelectedPathwayId('nts')}
                    className="cursor-pointer"
                  >
                    <rect
                      x="222"
                      y="132"
                      width="196"
                      height="96"
                      rx="18"
                      fill={
                        active
                          ? isDark
                            ? 'rgba(14,165,233,0.24)'
                            : 'rgba(224,242,254,0.98)'
                          : isDark
                            ? '#0f172a'
                            : '#f8fafc'
                      }
                      stroke={active ? '#0ea5e9' : isDark ? '#475569' : '#94a3b8'}
                      strokeWidth={active ? 3 : 2}
                    />
                    <text x="320" y="158" textAnchor="middle" fontSize="12.5" fontWeight="900" fill={isDark ? '#7dd3fc' : '#0369a1'}>
                      5. KUSMA MERKEZİ (NTS)
                    </text>
                    <text x="320" y="176" textAnchor="middle" fontSize="10" fill={isDark ? '#cbd5e1' : '#475569'}>
                      Medulla · Santral Entegratör
                    </text>
                    <text x="320" y="198" textAnchor="middle" fontSize="10.5" fontWeight="800" fontFamily="monospace" fill={isDark ? '#38bdf8' : '#0c4a6e'}>
                      NK₁ · 5-HT₃ · H₁ · M₁ · D₂
                    </text>
                    <text x="320" y="216" textAnchor="middle" fontSize="9.5" fill={isDark ? '#94a3b8' : '#64748b'}>
                      → Motor Çıkış (Bulantı / Öğürme / Kusma)
                    </text>
                  </g>
                );
              })()}
            </svg>

            {/* Mobil/Hızlı Seçim Düğmeleri */}
            <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-dashed border-slate-500/20">
              {PATHWAYS.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPathwayId(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    selectedPathwayId === p.id
                      ? isDark
                        ? 'bg-teal-500/25 text-teal-200 border border-teal-500/40'
                        : 'bg-teal-600 text-white'
                      : isDark
                        ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}. {p.shortTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Sağ: Seçili Yolak Farmakoloji Kartı */}
          <div className={`lg:col-span-5 rounded-xl border p-4 flex flex-col justify-between ${mutedSurface}`}>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                      isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    Seçili Yolak Detayı
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activePathway.receptors.map((r) => (
                      <span
                        key={r}
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isDark
                            ? 'bg-teal-500/20 text-teal-200 border border-teal-500/30'
                            : 'bg-teal-50 text-teal-800 border border-teal-200'
                        }`}
                      >
                        {r === '5-HT3' ? '5-HT₃' : r === 'D2' ? 'D₂' : r === 'NK1' ? 'NK₁' : r === 'H1' ? 'H₁' : r === 'M1' ? 'M₁' : 'Kortikal'}
                      </span>
                    ))}
                  </div>
                </div>
                <h4 className={`text-sm sm:text-base font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activePathway.title}
                </h4>
                <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <strong>Anatomi:</strong> {activePathway.anatomy}
                </p>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {activePathway.mechanism}
              </p>

              <div>
                <div className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Başlıca Tetikleyiciler
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activePathway.triggers.map((t) => (
                    <span
                      key={t}
                      className={`text-[11px] px-2 py-0.5 rounded-md border ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`mt-4 rounded-xl border p-3 ${
                isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
                Bu Yolağı Bloke Eden Antiemetik Sınıfları
              </div>
              <ul className="space-y-1 text-xs">
                {activePathway.blockingClasses.map((cls) => (
                  <li key={cls} className={`flex items-start gap-1.5 ${isDark ? 'text-emerald-100' : 'text-emerald-950'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" />
                    <span className="font-semibold">{cls}</span>
                  </li>
                ))}
              </ul>
              <div className={`mt-2 pt-2 border-t text-[11px] ${isDark ? 'border-emerald-500/20 text-emerald-200/90' : 'border-emerald-200 text-emerald-900'}`}>
                <strong>Klinik Örnekler:</strong> {activePathway.trExamples.join(' · ')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: RİSK FAKTÖRLERİ + İNTERAKTİF ERİŞKİN APFEL HESAPLAYICISI     */}
      {/* ===================================================================== */}
      <section id="ponv-sec-apfel" className={`rounded-2xl border p-4 sm:p-6 scroll-mt-16 ${cardSurface}`}>
        <div className="mb-4">
          <span
            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
              isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-50 text-amber-700'
            }`}
          >
            Bölüm 3 · Risk Faktörleri &amp; Erişkin Apfel Skoru
          </span>
          <h3 className={`text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            PONV Risk Faktörleri (Hasta / Anestezi / Cerrahi) &amp; İnteraktif Apfel Hesaplayıcısı
          </h3>
        </div>

        {/* 3 Sütunlu Risk Faktörleri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <div className={`rounded-xl border p-3.5 ${mutedSurface}`}>
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className={`w-4 h-4 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                Hasta İlişkili Faktörler
              </h4>
            </div>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Kadın cinsiyet</strong> (OR ~2,5–3; en güçlü bağımsız risk faktörü!)</li>
              <li>• <strong>Sigara içmemek</strong> (non-smoker — OR ~1,8)</li>
              <li>• <strong>PONV veya taşıt tutması (motion sickness)</strong> öyküsü (OR ~2,0)</li>
              <li>• <strong>Genç yaş (&lt;50 yaş)</strong> (ileri yaşta risk kademeli azalır)</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-3.5 ${mutedSurface}`}>
            <div className="flex items-center gap-2 mb-2">
              <Syringe className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                Anestezi İlişkili Faktörler
              </h4>
            </div>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Volatil anestezikler</strong> (doz &amp; süre bağımlı — özellikle erken 0–2 sa PONV)</li>
              <li>• <strong>N₂O (Azot protoksit)</strong> (&gt;1 saat kullanımda anlamlı artış)</li>
              <li>• <strong>Postoperatif opioidler</strong> (doz bağımlı — geç PONV’nin ana belirleyicisi)</li>
              <li>• <strong>Yüksek doz neostigmin (&gt;2,5 mg)</strong> (etkisi tartışmalı/minimal; sugammadeks avantajlı)</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-3.5 ${mutedSurface}`}>
            <div className="flex items-center gap-2 mb-2">
              <Activity className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                Cerrahi İlişkili Faktörler
              </h4>
            </div>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Cerrahi süre</strong> (her 30 dk artış riski <strong>~%60 artırır</strong>!)</li>
              <li>• <strong>Kolesistektomi</strong> &amp; <strong>Laparoskopik cerrahi</strong></li>
              <li>• <strong>Jinekolojik</strong> &amp; <strong>Bariatrik cerrahi</strong></li>
              <li>• <strong>Şaşılık, KBB (orta kulak/tonsillektomi)</strong> &amp; <strong>Nöroşirürji</strong></li>
            </ul>
          </div>
        </div>

        {/* İnteraktif Erişkin Apfel Hesaplayıcısı */}
        <div
          className={`rounded-2xl border p-4 sm:p-5 ${
            isDark
              ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/30 border-teal-500/30'
              : 'bg-gradient-to-br from-slate-50 via-white to-teal-50/50 border-teal-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
              <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                İnteraktif Erişkin Apfel Risk Skoru Hesaplayıcısı
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setApfelFemale(false);
                  setApfelNonSmoker(false);
                  setApfelHistory(false);
                  setApfelOpioids(false);
                  setApfelHighRiskSurgery(false);
                  setApfelCatastrophicGroup(false);
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <RotateCcw className="w-3 h-3" /> Sıfırla
              </button>
              <button
                type="button"
                onClick={handleCopyApfel}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  copiedApfel
                    ? 'bg-emerald-600 text-white'
                    : isDark
                      ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40 hover:bg-teal-500/30'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {copiedApfel ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedApfel ? 'Vaka Notu Kopyalandı!' : 'Vaka Notunu Kopyala'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Sol: 4 Apfel Kriteri + 2 Klinik Modifiyer */}
            <div className="lg:col-span-6 space-y-2.5">
              <div className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                4 Temel Apfel Kriteri (Her biri +1 puan)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    label: 'Kadın Cinsiyet',
                    sub: 'En güçlü bağımsız faktör',
                    checked: apfelFemale,
                    toggle: () => setApfelFemale((v) => !v)
                  },
                  {
                    label: 'Sigara İçmeme',
                    sub: 'Non-smoker',
                    checked: apfelNonSmoker,
                    toggle: () => setApfelNonSmoker((v) => !v)
                  },
                  {
                    label: 'PONV / Taşıt Tutması',
                    sub: 'Önceki PONV veya motion sickness',
                    checked: apfelHistory,
                    toggle: () => setApfelHistory((v) => !v)
                  },
                  {
                    label: 'Postoperatif Opioid Planı',
                    sub: 'IV / PCA / sistemik opioid',
                    checked: apfelOpioids,
                    toggle: () => setApfelOpioids((v) => !v)
                  }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.toggle}
                    className={`text-left rounded-xl border p-3 transition-all cursor-pointer ${
                      item.checked
                        ? isDark
                          ? 'bg-teal-500/20 border-teal-400/60 text-white shadow-xs'
                          : 'bg-teal-600 border-teal-600 text-white shadow-xs'
                        : isDark
                          ? 'bg-slate-900/70 border-slate-700 text-slate-300 hover:border-slate-500'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold">{item.label}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          item.checked
                            ? isDark
                              ? 'bg-teal-400/25 text-teal-100'
                              : 'bg-white/20 text-white'
                            : isDark
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.checked ? '+1 ✓' : '0'}
                      </span>
                    </div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        item.checked
                          ? isDark
                            ? 'text-teal-200/80'
                            : 'text-teal-50'
                          : isDark
                            ? 'text-slate-400'
                            : 'text-slate-500'
                      }`}
                    >
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>

              {/* Ek Modifiyerler */}
              <div className="pt-1">
                <div className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Opsiyonel Klinik Modifiyerler (Gan 2020 Basamak Yükseltici)
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => setApfelHighRiskSurgery((v) => !v)}
                    className={`flex-1 text-left rounded-xl border px-3 py-2 text-[11px] font-semibold transition-all cursor-pointer ${
                      apfelHighRiskSurgery
                        ? isDark
                          ? 'bg-amber-500/20 border-amber-400/50 text-amber-100'
                          : 'bg-amber-100 border-amber-400 text-amber-950'
                        : isDark
                          ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {apfelHighRiskSurgery ? '✓ ' : '+ '}Yüksek riskli cerrahi (laparoskopi / bariatrik / jinekoloji / &gt;2 sa)
                  </button>
                  <button
                    type="button"
                    onClick={() => setApfelCatastrophicGroup((v) => !v)}
                    className={`flex-1 text-left rounded-xl border px-3 py-2 text-[11px] font-semibold transition-all cursor-pointer ${
                      apfelCatastrophicGroup
                        ? isDark
                          ? 'bg-rose-500/25 border-rose-400/60 text-rose-100'
                          : 'bg-rose-100 border-rose-400 text-rose-950'
                        : isDark
                          ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {apfelCatastrophicGroup ? '✓ ' : '+ '}Özel felaket riski (KİB / IMF / GİB / Nissen / boyun)
                  </button>
                </div>
              </div>
            </div>

            {/* Sağ: Canlı Risk Barı & Gan 2020 Planı */}
            <div className={`lg:col-span-6 rounded-xl border p-4 flex flex-col justify-between ${cardSurface}`}>
              <div>
                <div className="flex items-end justify-between gap-3 mb-2">
                  <div>
                    <div className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Apfel Puanı &amp; Tahmini PONV İnsidansı
                    </div>
                    <div className="flex items-baseline gap-2.5 mt-0.5">
                      <span className={`text-3xl font-black font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        %{apfelRisk}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                          apfelScore >= 3
                            ? isDark
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-rose-100 text-rose-800'
                            : apfelScore >= 1
                              ? isDark
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-amber-100 text-amber-800'
                              : isDark
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        Apfel {apfelScore} / 4
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                        apfelRecommendation.badgeColor === 'rose'
                          ? isDark
                            ? 'bg-rose-500/20 text-rose-200 border-rose-500/40'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                          : apfelRecommendation.badgeColor === 'amber'
                            ? isDark
                              ? 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                            : isDark
                              ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {apfelRecommendation.agentCount}
                    </span>
                  </div>
                </div>

                {/* Canlı 5 kademeli risk barı */}
                <div className="mb-3">
                  <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        apfelScore >= 3
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : apfelScore >= 1
                            ? 'bg-gradient-to-r from-teal-500 to-amber-500'
                            : 'bg-emerald-500'
                      }`}
                      style={{ width: `${apfelRisk}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-5 text-[10px] font-mono mt-1.5 text-center">
                    {[
                      { s: 0, p: '%10' },
                      { s: 1, p: '%21' },
                      { s: 2, p: '%39' },
                      { s: 3, p: '%61' },
                      { s: 4, p: '%79' }
                    ].map((step) => (
                      <div
                        key={step.s}
                        className={`rounded py-0.5 ${
                          apfelScore === step.s
                            ? isDark
                              ? 'bg-teal-500/20 text-teal-200 font-bold'
                              : 'bg-teal-100 text-teal-900 font-bold'
                            : isDark
                              ? 'text-slate-500'
                              : 'text-slate-500'
                        }`}
                      >
                        {step.s}p: {step.p}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`text-xs font-bold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {apfelRecommendation.tier}
                </div>
                <p className={`text-[11px] leading-relaxed mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {apfelRecommendation.summary}
                </p>

                <ul className="space-y-1 text-[11px]">
                  {apfelRecommendation.trPlan.map((line) => (
                    <li
                      key={line}
                      className={`flex items-start gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-500" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: ÖZEL KLİNİK GRUPLAR                                          */}
      {/* ===================================================================== */}
      <section id="ponv-sec-special" className={`rounded-2xl border p-4 sm:p-6 scroll-mt-16 ${cardSurface}`}>
        <div className="mb-4">
          <span
            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
              isDark ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-50 text-rose-700'
            }`}
          >
            Bölüm 4 · Yüksek Hassasiyetli Klinik Gruplar
          </span>
          <h3 className={`text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Kusmanın Felaket Olabileceği Özel Hasta Grupları
          </h3>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Bu hasta gruplarında bazal Apfel skorundan bağımsız olarak <strong>agresif multimodal profilaksi + Propofol TIVA</strong> hedeflenir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SPECIAL_CLINICAL_GROUPS.map((g) => {
            const Icon = g.icon;
            const toneStyles =
              g.tone === 'rose'
                ? isDark
                  ? 'border-rose-500/35 bg-rose-500/8'
                  : 'border-rose-200 bg-rose-50/50'
                : g.tone === 'amber'
                  ? isDark
                    ? 'border-amber-500/35 bg-amber-500/8'
                    : 'border-amber-200 bg-amber-50/50'
                  : g.tone === 'violet'
                    ? isDark
                      ? 'border-violet-500/35 bg-violet-500/8'
                      : 'border-violet-200 bg-violet-50/50'
                    : isDark
                      ? 'border-sky-500/35 bg-sky-500/8'
                      : 'border-sky-200 bg-sky-50/50';

            const badgeStyles =
              g.tone === 'rose'
                ? isDark
                  ? 'bg-rose-500/20 text-rose-200'
                  : 'bg-rose-100 text-rose-800'
                : g.tone === 'amber'
                  ? isDark
                    ? 'bg-amber-500/20 text-amber-200'
                    : 'bg-amber-100 text-amber-800'
                  : g.tone === 'violet'
                    ? isDark
                      ? 'bg-violet-500/20 text-violet-200'
                      : 'bg-violet-100 text-violet-800'
                    : isDark
                      ? 'bg-sky-500/20 text-sky-200'
                      : 'bg-sky-100 text-sky-800';

            return (
              <div key={g.id} className={`rounded-xl border p-3.5 flex flex-col justify-between ${toneStyles}`}>
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 shrink-0 ${isDark ? 'text-slate-200' : 'text-slate-800'}`} />
                      <h4 className={`text-xs sm:text-[13px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {g.title}
                      </h4>
                    </div>
                  </div>
                  <span className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded mb-2 ${badgeStyles}`}>
                    {g.severity}
                  </span>
                  <p className={`text-[11px] leading-relaxed mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <strong>Mekanizma / Risk:</strong> {g.risk}
                  </p>
                  <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    <strong>Protokol:</strong> {g.action}
                  </p>
                </div>

                {g.jumpTo && (
                  <button
                    type="button"
                    onClick={() => scrollToSection(g.jumpTo!)}
                    className={`mt-3 inline-flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                      isDark
                        ? 'bg-sky-500/20 text-sky-200 hover:bg-sky-500/30 border border-sky-500/35'
                        : 'bg-sky-600 text-white hover:bg-sky-700'
                    }`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                    Pediatrik POVOC &amp; Doz Bölümüne Git
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 5: BAZAL RİSKİN AZALTILMASI                                     */}
      {/* ===================================================================== */}
      <section id="ponv-sec-baseline" className={`rounded-2xl border p-4 sm:p-6 scroll-mt-16 ${cardSurface}`}>
        <div className="mb-4">
          <span
            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
              isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            Bölüm 5 · Anestezik &amp; Perioperatif Stratejiler
          </span>
          <h3 className={`text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            PONV Profilaksisi: Bazal Riskin Azaltılması (6 Kanıta Dayalı Strateji)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {BASELINE_STRATEGIES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className={`rounded-xl border p-3.5 ${mutedSurface}`}>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {s.title}
                    </h4>
                  </div>
                </div>
                <span
                  className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded mb-2 ${
                    isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {s.impact}
                </span>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {s.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 6: İNTERAKTİF ANTİEMETİK MATRİSİ (TR FİLTRELİ) + TR REÇETELERİ  */}
      {/* ===================================================================== */}
      <section id="ponv-sec-matrix" className={`rounded-2xl border p-4 sm:p-6 scroll-mt-16 ${cardSurface}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
          <div>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-50 text-teal-700'
              }`}
            >
              Bölüm 6 · İnteraktif Antiemetik Farmakoloji Matrisi
            </span>
            <h3 className={`text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Multimodal Farmakolojik Ajanlar — Türkiye Erişim Filtreli ({filteredAgents.length}/{ANTIEMETIC_AGENTS.length})
            </h3>
          </div>

          {/* Prominent TR Filter Toggle */}
          <div
            className={`inline-flex rounded-xl p-1 border self-start ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setTrOnly(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !trOnly
                  ? isDark
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white text-slate-900 shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tümü ({ANTIEMETIC_AGENTS.length})
            </button>
            <button
              type="button"
              onClick={() => setTrOnly(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                trOnly
                  ? isDark
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
                  : isDark
                    ? 'text-emerald-300 hover:text-emerald-200'
                    : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Yalnızca Türkiye’de Bulunanlar (TR ✓ · {trCount})
            </button>
          </div>
        </div>

        {/* Arama & Sınıf Filtresi */}
        <div className="flex flex-col md:flex-row gap-2.5 mb-4">
          <div className="relative md:w-72 shrink-0">
            <Search
              className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            />
            <input
              type="text"
              value={drugQuery}
              onChange={(e) => setDrugQuery(e.target.value)}
              placeholder="İlaç, ticari ad, QTc, doz ara..."
              className={`w-full pl-9 pr-8 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/40 ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
            {drugQuery && (
              <button
                type="button"
                onClick={() => setDrugQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Filter className={`w-3.5 h-3.5 mr-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            {(
              [
                'Tümü',
                '5-HT₃',
                'Kortikosteroid',
                'D₂ Antagonist',
                'NK₁ Antagonist',
                'Antihistaminik / Antikolinerjik',
                'Diğer / Multimodal'
              ] as DrugClassFilter[]
            ).map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setClassFilter(cls)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                  classFilter === cls
                    ? isDark
                      ? 'bg-teal-500/20 text-teal-200 border-teal-500/45'
                      : 'bg-teal-600 text-white border-teal-600'
                    : isDark
                      ? 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* İlaç Kartları Grid */}
        {filteredAgents.length === 0 ? (
          <div className={`rounded-xl border p-6 text-center text-xs ${mutedSurface}`}>
            Seçili filtrelere uygun antiemetik bulunamadı. Filtreleri temizlemeyi deneyin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {filteredAgents.map((agent) => {
              const trBadgeCls =
                agent.trAvailability === 'rutin'
                  ? isDark
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : agent.trAvailability === 'sinirli'
                    ? isDark
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/35'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                    : isDark
                      ? 'bg-slate-800 text-slate-400 border-slate-700'
                      : 'bg-slate-100 text-slate-500 border-slate-200';

              return (
                <div
                  key={agent.id}
                  className={`rounded-xl border p-3.5 transition-all ${
                    agent.trAvailability === 'yok'
                      ? isDark
                        ? 'bg-slate-950/40 border-slate-800/70 opacity-85'
                        : 'bg-slate-50/70 border-slate-200/80 opacity-90'
                      : mutedSurface
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {agent.drugClass}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${trBadgeCls}`}>
                          {agent.trBadgeLabel}
                        </span>
                        {agent.warningTag && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              isDark
                                ? 'bg-rose-500/15 text-rose-300'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {agent.warningTag}
                          </span>
                        )}
                      </div>
                      <h4 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {agent.name}
                      </h4>
                      <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {agent.trBrands}
                      </div>
                    </div>

                    <span
                      className={`shrink-0 text-[10px] font-mono font-bold px-2 py-1 rounded-lg border ${
                        agent.timingTag === 'İndüksiyon'
                          ? isDark
                            ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
                            : 'bg-violet-50 text-violet-800 border-violet-200'
                          : agent.timingTag === 'Preop'
                            ? isDark
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                            : isDark
                              ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                              : 'bg-teal-50 text-teal-800 border-teal-200'
                      }`}
                    >
                      <Clock className="w-3 h-3 inline mr-1 -mt-0.5" />
                      {agent.timingTag}
                    </span>
                  </div>

                  {/* Doz & Zaman Kutusu */}
                  <div
                    className={`rounded-lg border p-2.5 mb-2 text-[11px] space-y-1 ${
                      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <span className={`font-bold ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>Erişkin Doz: </span>
                      <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{agent.adultDose}</span>
                    </div>
                    <div>
                      <span className={`font-bold ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>Pediatrik Doz: </span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{agent.pediatricDose}</span>
                    </div>
                    <div>
                      <span className={`font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>Uygulama Zamanı: </span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{agent.timing}</span>
                    </div>
                  </div>

                  {/* Klinik Notlar */}
                  <ul className={`space-y-1 text-[11px] leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {agent.clinicalNotes.map((n) => (
                      <li key={n} className="flex items-start gap-1.5">
                        <span className="text-teal-500 mt-0.5">•</span>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* TÜRKİYE KLİNİK PRATİĞİNE ÖZEL HAZIR KOMBİNASYON REÇETELERİ */}
        <div
          className={`rounded-2xl border p-4 ${
            isDark
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : 'bg-emerald-50/60 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Pill className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
            <h4 className={`text-sm font-bold ${isDark ? 'text-emerald-200' : 'text-emerald-950'}`}>
              Türkiye Klinik Pratiğine Özel Hazır Multimodal Kombinasyon Reçeteleri (TR ✓)
            </h4>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {[
              {
                id: 'tr-mod',
                badge: 'Orta Risk · Apfel 1–2',
                title: '2’li TR Kombinasyonu',
                tone: 'amber',
                lines: [
                  'Deksametazon 4–8 mg IV (indüksiyonda, yavaş puşe)',
                  'Ondansetron 4 mg IV (operasyon bitiminden 30 dk önce)',
                  'Alternatif (PDNV / Uzun QTc): Ondansetron yerine Palonosetron 0,075 mg IV (indüksiyonda)',
                  'Destek: Yeterli kristaloid hidrasyon + opioid-sparing analjezi'
                ]
              },
              {
                id: 'tr-high',
                badge: 'Yüksek Risk · Apfel 3',
                title: '3’lü TR Kombinasyonu + TIVA',
                tone: 'orange',
                lines: [
                  'Propofol TIVA (volatil & N₂O’dan kaçın) + Rejyonel blok / multimodal analjezi',
                  'Deksametazon 4–8 mg IV (indüksiyonda)',
                  'Ondansetron 4 mg IV (bitişten 30 dk önce) veya Palonosetron 0,075 mg IV',
                  '3. Ajan (birini seç): Haloperidol 0,5–1 mg IV (QTc kontrolü) VEYA Metoklopramid 10 mg IV VEYA Dimenhidrinat 50 mg IV (KBB/şaşılık)'
                ]
              },
              {
                id: 'tr-ultra',
                badge: 'Çok Yüksek · Apfel 4 / IMF / KİB',
                title: '4’lü Maksimal TR Protokolü',
                tone: 'rose',
                lines: [
                  'Preop 1–3 sa önce: Aprepitant 80 mg PO (Emend® — mevcutsa)',
                  'İntraop: Propofol TIVA (sıfır volatil, sıfır N₂O) + opioid-sparing blok + P6 akupresür',
                  'Deksametazon 8 mg IV (indüksiyonda) + Ondansetron 4 mg IV (veya Palonosetron 0,075 mg IV)',
                  '4. Ajan: Haloperidol 0,5–1 mg IV VEYA Dimenhidrinat 50 mg IV (kurtarma için farklı sınıfı yedekte tut!)'
                ]
              }
            ].map((rec) => (
              <div
                key={rec.id}
                className={`rounded-xl border p-3.5 flex flex-col justify-between ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-emerald-200/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        rec.tone === 'rose'
                          ? isDark
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-rose-100 text-rose-800'
                          : rec.tone === 'orange'
                            ? isDark
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-amber-100 text-amber-800'
                            : isDark
                              ? 'bg-teal-500/20 text-teal-300'
                              : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {rec.badge}
                    </span>
                  </div>
                  <h5 className={`text-xs sm:text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {rec.title}
                  </h5>
                  <ul className={`space-y-1.5 text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {rec.lines.map((l) => (
                      <li key={l} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyRecipe(rec.id, rec.title, rec.lines)}
                  className={`mt-3 w-full inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                    copiedRecipeId === rec.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {copiedRecipeId === rec.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Kopyalandı
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Reçeteyi Kopyala
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 7: NON-FARMAKOLOJİK YÖNTEMLER                                   */}
      {/* ===================================================================== */}
      <section id="ponv-sec-nonpharm" className={`rounded-2xl border p-4 sm:p-6 scroll-mt-16 ${cardSurface}`}>
        <div className="mb-4">
          <span
            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
              isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-50 text-sky-700'
            }`}
          >
            Bölüm 7 · Non-Farmakolojik &amp; Destekleyici Müdahaleler
          </span>
          <h3 className={`text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Kanıta Dayalı Non-Farmakolojik Yöntemler (Yan Etki Sıfır / Köprü Tedavi)
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* P6 (Neiguan) Mini Anatomik SVG Kartı */}
          <div className={`lg:col-span-5 rounded-xl border p-4 flex flex-col justify-between ${mutedSurface}`}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  P6 (Neiguan) Akupunktur / Akupresür / Elektro-Stimülasyon
                </h4>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  Cochrane Kanıtlı
                </span>
              </div>
              <p className={`text-[11px] leading-relaxed mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Bilek iç (volar) yüzünde, <strong>distal palmar bilek çizgisinin 3 parmak (~4–5 cm) proksimalinde</strong>,{' '}
                <em>m. flexor carpi radialis</em> ve <em>m. palmaris longus</em> tendonları arasında yer alır. Cochrane
                meta-analizi (Lee et al.) hem bulantı hem kusmada anlamlı azalma göstermiştir; ilaç yan etkisi sıfırdır.
              </p>
            </div>

            {/* P6 Wrist Locator SVG */}
            <svg viewBox="0 0 360 130" className="w-full h-auto" role="img" aria-label="P6 Neiguan bilek noktası konumu">
              {/* Önkol / Bilek silüeti */}
              <path
                d="M 20 35 L 250 38 Q 285 38 305 26 L 340 22 L 340 108 L 305 104 Q 285 92 250 92 L 20 95 Z"
                fill={isDark ? '#1e293b' : '#f1f5f9'}
                stroke={isDark ? '#475569' : '#94a3b8'}
                strokeWidth="1.5"
              />
              {/* Palmar bilek çizgisi */}
              <line x1="255" y1="38" x2="255" y2="92" stroke={isDark ? '#94a3b8' : '#64748b'} strokeWidth="2" strokeDasharray="4 3" />
              <text x="258" y="20" fontSize="9.5" fontWeight="700" fill={isDark ? '#94a3b8' : '#475569'}>
                Palmar Çizgi
              </text>

              {/* Tendonlar (FCR & Palmaris Longus) */}
              <line x1="30" y1="56" x2="255" y2="56" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.65" />
              <line x1="30" y1="74" x2="255" y2="74" stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1.5" opacity="0.65" />
              <text x="32" y="51" fontSize="9" fill={isDark ? '#7dd3fc' : '#0369a1'}>
                FCR &amp; Palmaris Longus Tendonları Arası
              </text>

              {/* 3 parmak ölçüsü */}
              <line x1="175" y1="108" x2="255" y2="108" stroke="#14b8a6" strokeWidth="1.8" />
              <line x1="175" y1="102" x2="175" y2="114" stroke="#14b8a6" strokeWidth="1.8" />
              <line x1="255" y1="102" x2="255" y2="114" stroke="#14b8a6" strokeWidth="1.8" />
              <text x="215" y="123" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#14b8a6">
                3 Parmak (~4–5 cm proksimal)
              </text>

              {/* P6 Noktası */}
              <circle cx="175" cy="65" r="11" fill="rgba(20,184,166,0.22)" stroke="#14b8a6" strokeWidth="2" />
              <circle cx="175" cy="65" r="4.5" fill="#14b8a6" />
              <text x="175" y="31" textAnchor="middle" fontSize="11" fontWeight="900" fill={isDark ? '#5eead4' : '#0f766e'}>
                P6 (Neiguan)
              </text>
              <text x="315" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill={isDark ? '#94a3b8' : '#64748b'}>
                AVUÇ İÇİ
              </text>
            </svg>
          </div>

          {/* Sağ: Diğer 3 Non-Farmakolojik Kart */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`rounded-xl border p-3.5 flex flex-col justify-between ${mutedSurface}`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wind className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
                  <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    %70 İzopropil Alkol İnhalasyonu
                  </h4>
                </div>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  PACU’da akut bulantıda alkollü mendil/pedin burun altında 2–3 derin nefesle koklatılması{' '}
                  <strong>ilk 10–15 dakikada</strong> IV antiemetik etki gösterene kadar hızlı köprü rahatlatma sağlar.
                </p>
              </div>
              <span
                className={`mt-3 inline-block self-start text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-800'
                }`}
              >
                Hızlı PACU Köprüsü
              </span>
            </div>

            <div className={`rounded-xl border p-3.5 flex flex-col justify-between ${mutedSurface}`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
                  <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Kristaloid Hidrasyon &amp; Preop CHO
                  </h4>
                </div>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <strong>10–30 mL/kg</strong> dengeli kristaloid replasmanı + preop berrak karbonhidrat yüklemesi,
                  uzamış açlık ve hipovolemi kaynaklı splanknik mukoza iskemisini ve 5-HT salınımını azaltır.
                </p>
              </div>
              <span
                className={`mt-3 inline-block self-start text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-100 text-sky-800'
                }`}
              >
                ERAS Standart
              </span>
            </div>

            <div className={`rounded-xl border p-3.5 flex flex-col justify-between ${mutedSurface}`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Postoperatif Sakız Çiğneme
                  </h4>
                </div>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Özellikle jinekolojik ve abdominal cerrahi sonrası şekersiz sakız çiğneme, sefalik-vagal refleksi
                  uyararak GİS motilitesini destekler ve postop ileus/bulantıyı hafifletir.
                </p>
              </div>
              <span
                className={`mt-3 inline-block self-start text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-800'
                }`}
              >
                Vagal Motilite Desteği
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 8: PONV YÖNETİMİ (KURTARMA / RESCUE TEDAVİSİ)                   */}
      {/* ===================================================================== */}
      <section id="ponv-sec-rescue" className={`rounded-2xl border p-4 sm:p-6 scroll-mt-16 ${cardSurface}`}>
        <div className="mb-4">
          <span
            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
              isDark ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-50 text-rose-700'
            }`}
          >
            Bölüm 8 · Akut PONV Yönetimi &amp; Kurtarma Algoritması
          </span>
          <h3 className={`text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Kurtarma (Rescue) Tedavisi: Önce Kırmızı Bayrakları Dışla, Sonra Doğru Sınıfı Seç!
          </h3>
        </div>

        {/* ADIM 1: RED FLAGS */}
        <div
          className={`rounded-xl border p-4 mb-5 ${
            isDark ? 'bg-rose-950/25 border-rose-500/35' : 'bg-rose-50/75 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <AlertTriangle className={`w-4 h-4 shrink-0 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
            <h4 className={`text-xs sm:text-sm font-extrabold uppercase tracking-wide ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>
              Adım 1 — Antiemetik Vermeden Önce Mutlaka Dışlanması Gereken Ayırıcı Tanılar (Red Flags)
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div
              className={`rounded-lg border p-3 ${
                isDark ? 'bg-slate-900/80 border-rose-500/20' : 'bg-white border-rose-200/80'
              }`}
            >
              <div className={`font-bold mb-1.5 ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                Mekanik / Cerrahi Nedenler
              </div>
              <ul className={`space-y-1 text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>• <strong>Yutulmuş kan</strong> (KBB, tonsillektomi, rinoplasti, oral cerrahi)</li>
                <li>• <strong>Gastrik distansiyon</strong> (zor maske ventilasyonu sonrası mideye hava dolması → gerekirse NG dekompresyon)</li>
                <li>• <strong>Boğazda tampon / throat pack unutulması!</strong></li>
                <li>• <strong>Mekanik barsak obstrüksiyonu / ileus</strong>, boğulmuş fıtık, anastomotik kaçak</li>
              </ul>
            </div>
            <div
              className={`rounded-lg border p-3 ${
                isDark ? 'bg-slate-900/80 border-rose-500/20' : 'bg-white border-rose-200/80'
              }`}
            >
              <div className={`font-bold mb-1.5 ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                Sistemik / Metabolik / Nörolojik Nedenler
              </div>
              <ul className={`space-y-1 text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>• <strong>HİPOKSİ</strong> (SpO₂ ve havayolunu derhal kontrol et!)</li>
                <li>• <strong>HİPOTANSİYON / Ortostatik hipovolemi</strong> (özellikle spinal anestezi &amp; kanama)</li>
                <li>• <strong>HİPOGLİSEMİ</strong> (diyabetik &amp; pediatrik hastalarda KŞ bak!)</li>
                <li>• <strong>KİB Artışı</strong> (kraniyotomi / posterior fossa!), aşırı opioid / PCA toksisitesi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ADIM 2: GAN 2020 ALTIN KURALLAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
          {[
            {
              num: 'ALTIN KURAL 1',
              title: 'İlk 6 Saat: FARKLI Sınıf!',
              desc: 'Profilakside kullanılan sınıftan FARKLI reseptör sınıfı seç! Ondansetron aldıysa tekrar Ondansetron VERME!',
              tone: 'teal'
            },
            {
              num: 'ALTIN KURAL 2',
              title: '>6 Saat Geçtiyse',
              desc: 'İlk dozdan >6 saat geçtiyse ve başka sınıf yoksa 5-HT₃ veya D₂ tekrarı düşünülebilir; yine de farklı sınıf tercih edilir.',
              tone: 'sky'
            },
            {
              num: 'ALTIN KURAL 3',
              title: 'Kurtarmada YASAKLILAR',
              desc: 'Deksametazon ve Transdermal Skopolamin yavaş etki başlangıcı (>2–4 sa) nedeniyle akut kurtarmada KULLANILMAZ!',
              tone: 'rose'
            },
            {
              num: 'ALTIN KURAL 4',
              title: 'Profilaksi Almayan Hasta',
              desc: 'Hiç profilaksi almayan hastada 1. tercih düşük doz 5-HT₃ antagonistidir (Ondansetron 1–4 mg IV).',
              tone: 'amber'
            }
          ].map((rule) => (
            <div
              key={rule.num}
              className={`rounded-xl border p-3 ${
                rule.tone === 'rose'
                  ? isDark
                    ? 'bg-rose-500/10 border-rose-500/35'
                    : 'bg-rose-50 border-rose-200'
                  : rule.tone === 'teal'
                    ? isDark
                      ? 'bg-teal-500/10 border-teal-500/35'
                      : 'bg-teal-50 border-teal-200'
                    : rule.tone === 'amber'
                      ? isDark
                        ? 'bg-amber-500/10 border-amber-500/35'
                        : 'bg-amber-50 border-amber-200'
                      : isDark
                        ? 'bg-sky-500/10 border-sky-500/35'
                        : 'bg-sky-50 border-sky-200'
              }`}
            >
              <div className={`text-[10px] font-mono font-black tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {rule.num}
              </div>
              <div className={`text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{rule.title}</div>
              <p className={`text-[11px] leading-snug ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{rule.desc}</p>
            </div>
          ))}
        </div>

        {/* İNTERAKTİF "PROFİLAKSİDE NE ALDI?" KURTARMA SEÇİCİ */}
        <div
          className={`rounded-2xl border p-4 sm:p-5 ${
            isDark
              ? 'bg-slate-950/75 border-slate-700'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                İnteraktif “Profilakside Ne Aldı?” Kurtarma Seçici (TR Pratiği)
              </h4>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Hastanın ameliyatta aldığı profilaktik sınıfları işaretleyin → sistem yasaklıları çizer ve en uygun TR kurtarma ajanlarını önerir.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyRescue}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                copiedRescue
                  ? 'bg-emerald-600 text-white'
                  : isDark
                    ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40 hover:bg-teal-500/30'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {copiedRescue ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedRescue ? 'Kurtarma Planı Kopyalandı!' : 'Kurtarma Planını Kopyala'}
            </button>
          </div>

          {/* Profilaksi Seçim Düğmeleri & Zaman Penceresi */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setReceivedProphylaxis([])}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer transition-all ${
                  receivedProphylaxis.length === 0
                    ? isDark
                      ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400'
                      : 'bg-emerald-600 text-white border-emerald-600'
                    : isDark
                      ? 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Hiç Profilaksi Almadı
              </button>
              {PROPHYLAXIS_OPTIONS.map((opt) => {
                const active = receivedProphylaxis.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleProphylaxis(opt.id)}
                    title={opt.examples}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer transition-all ${
                      active
                        ? isDark
                          ? 'bg-rose-500/20 text-rose-200 border-rose-400/60'
                          : 'bg-rose-600 text-white border-rose-600'
                        : isDark
                          ? 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {active ? '✓ Aldı: ' : '+ '}
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div
              className={`inline-flex rounded-xl p-1 border shrink-0 self-start ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => setRescueAfter6h(false)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                  !rescueAfter6h
                    ? isDark
                      ? 'bg-amber-500/25 text-amber-200'
                      : 'bg-amber-500 text-white'
                    : isDark
                      ? 'text-slate-400'
                      : 'text-slate-600'
                }`}
              >
                İlk 6 Saat (&lt;6 sa)
              </button>
              <button
                type="button"
                onClick={() => setRescueAfter6h(true)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                  rescueAfter6h
                    ? isDark
                      ? 'bg-sky-500/25 text-sky-200'
                      : 'bg-sky-600 text-white'
                    : isDark
                      ? 'text-slate-400'
                      : 'text-slate-600'
                }`}
              >
                &gt;6 Saat Sonra
              </button>
            </div>
          </div>

          {/* Sonuç: Yeşil Önerilenler vs Kırmızı Yasaklılar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Önerilenler */}
            <div
              className={`lg:col-span-7 rounded-xl border p-3.5 ${
                isDark ? 'bg-emerald-500/8 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>
                  Önerilen TR Kurtarma (Rescue) Seçenekleri
                </h5>
              </div>
              <div className="space-y-2">
                {rescueAnalysis.recommended.map((rec) => (
                  <div
                    key={rec.agent}
                    className={`rounded-lg border p-2.5 ${
                      isDark ? 'bg-slate-900/85 border-emerald-500/25' : 'bg-white border-emerald-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                      <span className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {rec.agent}
                      </span>
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {rec.priority}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {rec.classLabel}
                        </span>
                      </div>
                    </div>
                    <div className={`text-[11px] font-semibold ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
                      Doz: {rec.dose}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {rec.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yasaklı / Kaçınılması Gerekenler */}
            <div
              className={`lg:col-span-5 rounded-xl border p-3.5 ${
                isDark ? 'bg-rose-500/8 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2.5">
                <XCircle className="w-4 h-4 text-rose-500" />
                <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
                  Kaçınılması / Tekrarlanmaması Gerekenler
                </h5>
              </div>
              <div className="space-y-2">
                {rescueAnalysis.blocked.map((blk) => (
                  <div
                    key={blk.name}
                    className={`rounded-lg border p-2.5 ${
                      isDark ? 'bg-slate-900/80 border-rose-500/25' : 'bg-white border-rose-200'
                    }`}
                  >
                    <div className={`text-xs font-bold line-through ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                      {blk.name}
                    </div>
                    <div className={`text-[11px] mt-0.5 leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {blk.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 9: EŞ ZAMANLI PEDİATRİK PONV / POV BÖLÜMÜ (POVOC + DOZ)         */}
      {/* ===================================================================== */}
      <section id="ponv-sec-pediatric" className={`rounded-2xl border p-4 sm:p-6 scroll-mt-16 ${cardSurface}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-50 text-sky-700'
              }`}
            >
              Bölüm 9 · Pediatrik PONV / POV (Gan 2020 + Eberhart POVOC)
            </span>
            <h3 className={`text-base sm:text-lg font-bold mt-1 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Baby className={`w-5 h-5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
              Pediatrik POVOC Skor Hesaplayıcısı &amp; Kilo-Bazlı IV Doz Hesaplayıcısı
            </h3>
          </div>
          <button
            type="button"
            onClick={handleCopyPediatric}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
              copiedPediatric
                ? 'bg-emerald-600 text-white'
                : isDark
                  ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40 hover:bg-sky-500/30'
                  : 'bg-sky-600 text-white hover:bg-sky-700'
            }`}
          >
            {copiedPediatric ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedPediatric ? 'Pediatrik Plan Kopyalandı!' : 'Pediatrik Özeti Kopyala'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          {/* Sol: İnteraktif Eberhart POVOC Hesaplayıcı */}
          <div className={`lg:col-span-6 rounded-xl border p-4 ${mutedSurface}`}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h4 className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Eberhart POVOC Skoru (4 Kriter)
              </h4>
              <span
                className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-lg ${
                  povocScore >= 3
                    ? isDark
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-rose-100 text-rose-800'
                    : povocScore >= 2
                      ? isDark
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-amber-100 text-amber-800'
                      : isDark
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                POVOC {povocScore}/4 → %{povocRisk} POV
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {[
                {
                  label: 'Cerrahi Süre ≥ 30 dk',
                  checked: povocDuration,
                  toggle: () => setPovocDuration((v) => !v)
                },
                {
                  label: 'Yaş ≥ 3 Yıl',
                  checked: povocAge,
                  toggle: () => setPovocAge((v) => !v)
                },
                {
                  label: 'Şaşılık (Strabismus) Cerrahisi',
                  checked: povocStrabismus,
                  toggle: () => setPovocStrabismus((v) => !v)
                },
                {
                  label: 'Çocukta veya Ailede POV/PONV Öyküsü',
                  checked: povocHistory,
                  toggle: () => setPovocHistory((v) => !v)
                }
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.toggle}
                  className={`text-left rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    item.checked
                      ? isDark
                        ? 'bg-sky-500/20 border-sky-400/60 text-white'
                        : 'bg-sky-600 border-sky-600 text-white'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] shrink-0">{item.checked ? '+1 ✓' : '0'}</span>
                </button>
              ))}
            </div>

            {/* POVOC Risk Barı */}
            <div className="mb-3">
              <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    povocScore >= 3 ? 'bg-rose-500' : povocScore >= 2 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${povocRisk}%` }}
                />
              </div>
              <div className="grid grid-cols-5 text-[10px] font-mono mt-1 text-center">
                {[
                  { s: 0, p: '%9' },
                  { s: 1, p: '%10' },
                  { s: 2, p: '%30' },
                  { s: 3, p: '%55' },
                  { s: 4, p: '%70' }
                ].map((st) => (
                  <div
                    key={st.s}
                    className={`rounded py-0.5 ${
                      povocScore === st.s
                        ? isDark
                          ? 'bg-sky-500/25 text-sky-200 font-bold'
                          : 'bg-sky-100 text-sky-900 font-bold'
                        : isDark
                          ? 'text-slate-500'
                          : 'text-slate-500'
                    }`}
                  >
                    {st.s}p: {st.p}
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`rounded-lg border p-3 text-xs ${
                povocPlan.tone === 'rose'
                  ? isDark
                    ? 'bg-rose-500/12 border-rose-500/35 text-rose-100'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                  : povocPlan.tone === 'amber'
                    ? isDark
                      ? 'bg-amber-500/12 border-amber-500/35 text-amber-100'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                    : isDark
                      ? 'bg-emerald-500/12 border-emerald-500/35 text-emerald-100'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="font-bold mb-1">{povocPlan.level}</div>
              <div className="text-[11px] leading-relaxed">{povocPlan.plan}</div>
            </div>
          </div>

          {/* Sağ: İnteraktif Pediatrik Kilo-Bazlı Doz Hesaplayıcısı */}
          <div className={`lg:col-span-6 rounded-xl border p-4 ${mutedSurface}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Scale className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
                <h4 className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Kilo-Bazlı Pediatrik Antiemetik Doz Hesaplayıcısı
                </h4>
              </div>
              <span
                className={`text-sm font-mono font-black px-2.5 py-0.5 rounded-lg ${
                  isDark ? 'bg-teal-500/20 text-teal-200' : 'bg-teal-100 text-teal-900'
                }`}
              >
                {pedWeightKg} kg
              </span>
            </div>

            {/* Slider + Quick Preset Buttons */}
            <div className="mb-3 space-y-2">
              <input
                type="range"
                min={5}
                max={60}
                step={1}
                value={pedWeightKg}
                onChange={(e) => setPedWeightKg(Number(e.target.value))}
                aria-label="Pediatrik hasta kilosu (kg)"
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex flex-wrap gap-1">
                  {[8, 12, 15, 20, 30, 45, 60].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setPedWeightKg(w)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border cursor-pointer ${
                        pedWeightKg === w
                          ? isDark
                            ? 'bg-teal-500/25 text-teal-200 border-teal-400'
                            : 'bg-teal-600 text-white border-teal-600'
                          : isDark
                            ? 'bg-slate-900 text-slate-400 border-slate-700'
                            : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {w} kg
                    </button>
                  ))}
                </div>
                <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Aralık: 5–60 kg
                </span>
              </div>
            </div>

            {/* Hesaplanan Doz Kartları */}
            <div className="space-y-2 text-[11px]">
              <div className={`rounded-lg border p-2.5 flex items-center justify-between gap-2 ${cardSurface}`}>
                <div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Ondansetron <span className="font-mono font-normal opacity-75">(0,1 mg/kg IV · maks 4 mg)</span>
                  </div>
                  <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    Bitişe yakın · 1. basamak 5-HT₃
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-sm font-mono font-black ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
                    {pedDoses.ondFinal} mg IV
                  </div>
                  {pedDoses.ondCapped && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                      MAKS 4 mg tavan
                    </span>
                  )}
                </div>
              </div>

              <div className={`rounded-lg border p-2.5 flex items-center justify-between gap-2 ${cardSurface}`}>
                <div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Deksametazon <span className="font-mono font-normal opacity-75">(0,15 mg/kg IV · maks 4–8 mg)</span>
                  </div>
                  <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    İndüksiyonda · Tonsillektomide modern kanıtlar tek dozda cerrahi kanamayı artırmadığını gösterir (NSAİİ ile dikkatli izlem!)
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-sm font-mono font-black ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>
                    {pedDoses.dexCap4 === pedDoses.dexCap8
                      ? `${pedDoses.dexCap4} mg IV`
                      : `${pedDoses.dexCap4}–${pedDoses.dexCap8} mg IV`}
                  </div>
                  {pedDoses.dexCapped4 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                      Erişkin tavan (4–8 mg)
                    </span>
                  )}
                </div>
              </div>

              <div className={`rounded-lg border p-2.5 flex items-center justify-between gap-2 ${cardSurface}`}>
                <div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Dimenhidrinat <span className="font-mono font-normal opacity-75">(0,5 mg/kg IV · maks 25 mg · &gt;2 yaş)</span>
                  </div>
                  <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    Şaşılık / KBB / 3. ajan veya kurtarma
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-sm font-mono font-black ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                    {pedDoses.dimFinal} mg IV
                  </div>
                  {pedDoses.dimCapped && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">
                      MAKS 25 mg tavan
                    </span>
                  )}
                </div>
              </div>

              <div className={`rounded-lg border p-2.5 flex items-center justify-between gap-2 ${cardSurface}`}>
                <div>
                  <div className={`font-bold ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                    Metoklopramid <span className="font-mono font-normal opacity-75">(0,1–0,15 mg/kg IV · maks 10 mg)</span>
                  </div>
                  <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    Yalnızca 2. basamak / kurtarma — çocuklarda yüksek <strong>ekstrapiramidal distoni</strong> riski!
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-sm font-mono font-black ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                    {pedDoses.metLow}–{pedDoses.metHigh} mg IV
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pediatrik TIVA & Kurtarma Kutusu */}
        <div
          className={`rounded-xl border p-3.5 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] ${
            isDark ? 'bg-sky-950/20 border-sky-500/25' : 'bg-sky-50/70 border-sky-200'
          }`}
        >
          <div>
            <div className={`font-bold mb-1 flex items-center gap-1.5 ${isDark ? 'text-sky-300' : 'text-sky-900'}`}>
              <Ear className="w-3.5 h-3.5" />
              Yüksek Riskli Pediatrik Vakalar (Şaşılık &amp; Adenotonsillektomi)
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <strong>Propofol TIVA</strong> (sevofluran yerine) şaşılık ve tonsillektomi geçiren çocuklarda kusmayı
              dramatik biçimde düşürür. Deksametazon (0,15 mg/kg) tonsillektomide aynı zamanda postop ağrı ve
              ödemi azaltarak oral alımı hızlandırır.
            </p>
          </div>
          <div>
            <div className={`font-bold mb-1 flex items-center gap-1.5 ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>
              <Info className="w-3.5 h-3.5" />
              Pediatrik Kurtarma (Rescue) Kuralları
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Önce <strong>adenotonsillektomi sonrası yutulmuş kan / aktif kanama</strong> ve <strong>hipoglisemiyi</strong>{' '}
              dışla! Profilaksideki sınıftan farklı ajan seç: 5-HT₃ verilmediyse <strong>Ondansetron 0,1 mg/kg IV</strong>;
              verildiyse <strong>Dimenhidrinat 0,5 mg/kg IV</strong> (&gt;2 yaş) veya düşük doz Metoklopramid (distoni izlemi!).
              Deksametazon kurtarmada kullanılmaz.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 10: KANITA DAYALI KAYNAKÇA                                      */}
      {/* ===================================================================== */}
      <section id="ponv-sec-refs" className={`rounded-2xl border p-4 sm:p-5 scroll-mt-16 ${cardSurface}`}>
        <button
          type="button"
          onClick={() => setShowRefs((v) => !v)}
          className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <BookOpen className={`w-4 h-4 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Bölüm 10 · Kanıta Dayalı Kaynakça ({EVIDENCE_REFS.length} Temel Kılavuz &amp; RKÇ)
            </h3>
          </div>
          {showRefs ? (
            <ChevronUp className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          )}
        </button>

        {showRefs && (
          <ol className="mt-3 space-y-2 text-[11px] list-decimal list-inside">
            {EVIDENCE_REFS.map((ref) => (
              <li
                key={ref.citation}
                className={`rounded-lg border p-2.5 ${
                  isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {ref.citation}
                </span>
                <div className={`mt-0.5 pl-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {ref.note}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
};
