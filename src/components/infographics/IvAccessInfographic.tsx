import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Droplet,
  ExternalLink,
  Gauge,
  MapPin,
  ShieldAlert,
  Syringe,
  Timer,
  Zap
} from 'lucide-react';

interface IvAccessInfographicProps {
  isDark: boolean;
}

interface AccessRowSpec {
  id: string;
  kind: 'peripheral' | 'cvc';
  gauge: string;
  subLabel: string;
  colorName: string;
  colorHex: string;
  badgeClass: string;
  outerDiameterMm: string;
  lengthLabel: string;
  flowRateMlMinLabel: string;
  flowRateNumericMid: number;
  oneLiterTimeApprox: string;
  bloodTransfusion: string;
  primaryUse: string;
  preferredSites: string;
  siteRationale: string;
  clinicalNotes: string;
  scenarioTags: ('resuscitation' | 'blood' | 'routine' | 'pediatric')[];
}

// Periferik IV kanüller (ISO 10555-5) + Standart Üç Lümenli 7 Fr 20 cm SVK (Teleflex/Arrow)
// Tümü görünümünde Poiseuille akım hızına göre büyükten küçüğe iç içe (karşılaştırmalı) sıralıdır.
const ACCESS_ROWS: AccessRowSpec[] = [
  {
    id: 'piv-14g',
    kind: 'peripheral',
    gauge: '14G',
    subLabel: 'Periferik IV',
    colorName: 'Turuncu',
    colorHex: '#f97316',
    badgeClass: 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/40',
    outerDiameterMm: '2.1 mm',
    lengthLabel: '45 – 50 mm',
    flowRateMlMinLabel: '240 – 300 mL/dk',
    flowRateNumericMid: 270,
    oneLiterTimeApprox: '~3.5 – 4 dk',
    bloodTransfusion: 'Masif Transfüzyon (MTP) · Çok Hızlı',
    primaryUse: 'Masif travma, hemorajik şok resüsitasyonu, majör kardiyovasküler/transplant cerrahisi',
    preferredSites: 'Antekübital fossa (medyan kübital, bazilik, sefalik) veya geniş düz proksimal ön kol veni',
    siteRationale: 'El sırtı veya ince distal venlerde duvar rüptürü ve ani hematom riski yüksek olduğundan yalnızca geniş proksimal venlere takılır.',
    clinicalNotes:
      'En yüksek akım kapasitesine sahip standart periferik kanüldür. Standart 7 Fr 20 cm SVK distal lümeninden ~5 kat daha hızlı volüm verir.',
    scenarioTags: ['resuscitation', 'blood']
  },
  {
    id: 'piv-16g',
    kind: 'peripheral',
    gauge: '16G',
    subLabel: 'Periferik IV',
    colorName: 'Gri',
    colorHex: '#64748b',
    badgeClass: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/40',
    outerDiameterMm: '1.7 – 1.8 mm',
    lengthLabel: '45 mm',
    flowRateMlMinLabel: '180 – 210 mL/dk',
    flowRateNumericMid: 195,
    oneLiterTimeApprox: '~5 dk',
    bloodTransfusion: 'Hızlı Transfüzyon · Uygun',
    primaryUse: 'Majör batın/ortopedi/obstetrik cerrahi, aktif GİS kanama, travma ve hızlı kristaloid yükleme',
    preferredSites: 'Proksimal ön kol sefalik/bazilik veni (1. tercih) veya antekübital fossa venleri',
    siteRationale: 'Mümkünse eklem kıvrımı dışındaki düz proksimal ön kol veni seçilir; böylece kol bükülse dahi akım kesintiye uğramaz.',
    clinicalNotes:
      'Kanama riski yüksek ameliyatlarda (plasenta previa, majör vasküler, çoklu travma) anestezi öncesi/sonrası güvenli geniş damar yolu standardıdır.',
    scenarioTags: ['resuscitation', 'blood']
  },
  {
    id: 'piv-18g',
    kind: 'peripheral',
    gauge: '18G',
    subLabel: 'Periferik IV',
    colorName: 'Yeşil',
    colorHex: '#10b981',
    badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40',
    outerDiameterMm: '1.3 mm',
    lengthLabel: '32 – 45 mm',
    flowRateMlMinLabel: '90 – 105 mL/dk',
    flowRateNumericMid: 98,
    oneLiterTimeApprox: '~10 dk',
    bloodTransfusion: 'Standart Kan Transfüzyonu (İdeal)',
    primaryUse: 'Orta–majör cerrahi, rutin eritrosit/TDP transfüzyonu, yüksek basınçlı BT kontrast enjeksiyonu',
    preferredSites: 'Ön kol (sefalik, bazilik, medyan antebrakiyal) veya geniş antekübital ven (BT kontrast için)',
    siteRationale: 'Yüksek basınçlı BT anjiyografi enjeksiyonunda (≥ 4–5 mL/sn) el sırtı yerine geniş ön kol/antekübital ven şarttır; el sırtında ekstravazasyon riski artar.',
    clinicalNotes:
      'Anestezi pratiğinde kan ürünü transfüzyonu (hemoliz oluşturmadan akım) ve kontrastlı görüntüleme için en yaygın "altın denge" kanülüdür.',
    scenarioTags: ['resuscitation', 'blood', 'routine']
  },
  {
    id: 'piv-20g',
    kind: 'peripheral',
    gauge: '20G',
    subLabel: 'Periferik IV',
    colorName: 'Pembe',
    colorHex: '#ec4899',
    badgeClass: 'bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/40',
    outerDiameterMm: '1.1 mm',
    lengthLabel: '32 mm',
    flowRateMlMinLabel: '55 – 65 mL/dk',
    flowRateNumericMid: 60,
    oneLiterTimeApprox: '~16 – 17 dk',
    bloodTransfusion: 'Yavaş/Elektif Transfüzyon İçin Uygun',
    primaryUse: 'Erişkin elektif cerrahi ve servis bakımında 1. tercih: indüksiyon, idame sıvı, antibiyotik/analjezi',
    preferredSites: 'Ön kol orta-distal sefalik/aksesuar sefalik venleri veya el sırtı dorsal metakarpal venler',
    siteRationale: 'Elektifte antekübital kıvrım ve el bileği volar yüzünden kaçınılıp düz ön kol veya el sırtı seçilerek mekanik flebit en aza indirilir (INS 2024).',
    clinicalNotes:
      'Dikkat: Kısa bir 20G Pembe periferik kanül (~60 mL/dk), uzun 20 cm 7 Fr SVK’nın 16G distal lümeninden (~52 mL/dk) bile daha hızlı akım sağlar!',
    scenarioTags: ['blood', 'routine']
  },
  {
    id: 'cvc-distal',
    kind: 'cvc',
    gauge: '16G',
    subLabel: '7 Fr SVK · Distal',
    colorName: 'Kahverengi',
    colorHex: '#78350f',
    badgeClass: 'bg-amber-900/15 text-amber-800 dark:text-amber-300 border-amber-700/40',
    outerDiameterMm: '7 Fr Toplam (2.3 mm dış)',
    lengthLabel: '20 cm (200 mm)',
    flowRateMlMinLabel: '~52 mL/dk (3,100 mL/sa)',
    flowRateNumericMid: 52,
    oneLiterTimeApprox: '~19 – 20 dk',
    bloodTransfusion: 'Uygun ama Yavaş (16G Periferik ~3.8× hızlı)',
    primaryUse: 'CVP monitörizasyonu, yüksek volümlü sıvı/kan ürünü, acil bolus ve ScvO₂ kan örneklemesi',
    preferredSites: 'Santral Venler: Sağ İnternal Juguler Ven (İJV) · Subklavyen/Aksiller Ven · Acilde Femoral Ven',
    siteRationale: 'Ucu alt SVC / kavoatriyal bileşkeye (CAJ) oturur. Buradan vazopresör infüzyonu verilmez (bolus anında hemodinamik sıçrama yapar).',
    clinicalNotes:
      'Poiseuille 1/L yasasının kanıtı: Periferik 16G Gri ile aynı iç çapa (16G) sahip olsa da 200 mm uzunluğu nedeniyle hızı 195 mL/dk’dan ~52 mL/dk’ya düşer.',
    scenarioTags: []
  },
  {
    id: 'piv-22g',
    kind: 'peripheral',
    gauge: '22G',
    subLabel: 'Periferik IV',
    colorName: 'Mavi',
    colorHex: '#3b82f6',
    badgeClass: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/40',
    outerDiameterMm: '0.9 mm',
    lengthLabel: '25 mm',
    flowRateMlMinLabel: '33 – 36 mL/dk',
    flowRateNumericMid: 35,
    oneLiterTimeApprox: '~28 – 30 dk',
    bloodTransfusion: 'Yalnızca Yavaş / Pediatrik Transfüzyon',
    primaryUse: 'İnce/frajil venli erişkinler, geriatri, günübirlik cerrahi, büyük çocuklar, rutin IV ilaçlar',
    preferredSites: 'El sırtı dorsal metakarpal venler, ince geriatrik ön kol venleri, çocukta ayak sırtı / büyük safen ven',
    siteRationale: 'İnce, sklerotik veya hareketli yaşlı venlerinde 25 mm boyu sayesinde arka duvar perforasyonu yapmadan yüksek ilk-giriş başarısı sunar.',
    clinicalNotes:
      'Masif resüsitasyon için akımı yetersizdir; ancak ince venlerde kanülasyon başarısı yüksek, tromboflebit riski düşüktür ve SVK 18G lümenlerinden hızlıdır.',
    scenarioTags: ['routine', 'pediatric']
  },
  {
    id: 'cvc-proximal',
    kind: 'cvc',
    gauge: '18G',
    subLabel: '7 Fr SVK · Proksimal',
    colorName: 'Beyaz / Pembe',
    colorHex: '#94a3b8',
    badgeClass: 'bg-slate-400/15 text-slate-700 dark:text-slate-300 border-slate-400/40',
    outerDiameterMm: '7 Fr Toplam',
    lengthLabel: '20 cm (200 mm)',
    flowRateMlMinLabel: '~27 mL/dk (1,600 mL/sa)',
    flowRateNumericMid: 27,
    oneLiterTimeApprox: '~37 – 38 dk',
    bloodTransfusion: 'Kısıtlı (Uzun 18G · Yüksek Direnç)',
    primaryUse: 'Aralıklı IV ilaçlar, antibiyotikler, sedatif/analjezikler, idame sıvı ve rutin kan örneklemesi',
    preferredSites: 'Santral Ven (Sağ İJV / Subklavyen / Femoral) — Venöz dönüş yönünde en proksimal yan port',
    siteRationale: 'Kan akımında diğer portların gerisinde açıldığı için kan örneklemesi distal/medial infüzyonlardan minimal etkilenir.',
    clinicalNotes:
      'Uzun 20 cm gövde nedeniyle hızı ~27 mL/dk düzeyindedir (kısa 22G Mavi periferik kanülden bile daha yavaştır).',
    scenarioTags: []
  },
  {
    id: 'cvc-medial',
    kind: 'cvc',
    gauge: '18G',
    subLabel: '7 Fr SVK · Medial',
    colorName: 'Mavi (Orta)',
    colorHex: '#0284c7',
    badgeClass: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/40',
    outerDiameterMm: '7 Fr Toplam',
    lengthLabel: '20 cm (200 mm)',
    flowRateMlMinLabel: '~25 mL/dk (1,500 mL/sa)',
    flowRateNumericMid: 25,
    oneLiterTimeApprox: '~40 dk',
    bloodTransfusion: 'Kısıtlı (Uzun 18G · Yüksek Direnç)',
    primaryUse: 'Kesintisiz vazopresör & inotrop infüzyonu (Noradrenalin, Adrenalin — ayrı hat!) veya TPN',
    preferredSites: 'Santral Ven (Sağ İJV / Subklavyen / Femoral) — Ayrı ve kesintisiz vazoaktif ilaç portu',
    siteRationale: 'Vezikan ve kısa yarı ömürlü katekolaminler için özel ayrılmış santral lümendir; buradan ek bolus yapılmaz ve kan alınmaz.',
    clinicalNotes:
      'Hızı ~25 mL/dk (1,500 mL/saat) olup yüksek hacim resüsitasyonu değil, güvenli sürekli vazoaktif/hiperozmolar infüzyon içindir.',
    scenarioTags: []
  },
  {
    id: 'piv-24g',
    kind: 'peripheral',
    gauge: '24G',
    subLabel: 'Periferik IV',
    colorName: 'Sarı',
    colorHex: '#eab308',
    badgeClass: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/40',
    outerDiameterMm: '0.7 mm',
    lengthLabel: '19 mm',
    flowRateMlMinLabel: '18 – 23 mL/dk',
    flowRateNumericMid: 20,
    oneLiterTimeApprox: '~48 – 50 dk',
    bloodTransfusion: 'Kısıtlı (Sadece Yavaş/Pompa Pediatrik)',
    primaryUse: 'Pediatri, süt çocukları, yenidoğanlar ve çok frajil/sklerotik yaşlı hasta venleri',
    preferredSites: 'Pediatrik el sırtı, ayak sırtı dorsal venöz arkus, ön kol veya bebeklerde yüzeyel skalp venleri',
    siteRationale: '19 mm kısa uzunluğu bebek ve yaşlıların yüzeyel, ince ve kıvrımlı ven anatomisine tam uyum sağlar.',
    clinicalNotes:
      'Yüksek viskoziteli eritrosit süspansiyonunu hızlı geçiremez; yavaş idame ve hassas ilaç infüzyonları için idealdir.',
    scenarioTags: ['pediatric', 'routine']
  },
  {
    id: 'piv-26g',
    kind: 'peripheral',
    gauge: '26G',
    subLabel: 'Periferik IV',
    colorName: 'Mor',
    colorHex: '#a855f7',
    badgeClass: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/40',
    outerDiameterMm: '0.6 mm',
    lengthLabel: '14 – 19 mm',
    flowRateMlMinLabel: '13 – 15 mL/dk',
    flowRateNumericMid: 14,
    oneLiterTimeApprox: '~70 dk',
    bloodTransfusion: 'Önerilmez (Mikro-infüzyon)',
    primaryUse: 'Prematüre ve yenidoğan yoğun bakım (NICU), düşük hacimli hassas ilaç/idame infüzyonu',
    preferredSites: 'Yenidoğan el/ayak sırtı kapiller-venöz ağı ve yüzeyel temporal/frontal skalp venleri',
    siteRationale: 'Prematüre ven çapına uygun en ince kalibredir; büyük venlere göre mekanik oklüzyon/tıkanma riskine karşı düşük hızda sürekli akım tercih edilir.',
    clinicalNotes:
      'ISO 10555-5 ek neonatal renk standardıdır. Tıkanmayı önlemek için düzenli nazik %0.9 NaCl flush gerektirir.',
    scenarioTags: ['pediatric']
  }
];

const DIVA_TECHNIQUES = [
  {
    step: '01',
    title: '2-Deneme Kuralı & Erken Eskalasyon (INS 2024)',
    detail: 'Aynı klinisyen başarısız 2 girişimden sonra aynı hastada körlemesine denemeye devam etmez; daha deneyimli bir hekime veya cihaz destekli yönteme (USG / NIR) geçilir.'
  },
  {
    step: '02',
    title: 'Fizyolojik Venodilatasyon & Doğru Turnike',
    detail: 'Ön kola 40–42 °C sıcak kompres (5–10 dk), kolu kalp seviyesinin altına sarkıtma ve tansiyon manşonunu diyastolik kan basıncının hemen altında (40–60 mmHg) şişirme ven dolgunluğunu belirgin artırır. Damara sert vurmak vazospazm ve hematomu tetikler.'
  },
  {
    step: '03',
    title: 'USG Eşliğinde Derin Periferik Ven (DIVA Altın Standardı)',
    detail: 'Yüksek frekanslı lineer prob (10–15 MHz) ile bazilik, brakiyal veya derin sefalik ven hedeflenir. Ven > 0.5–1.0 cm derindeyse standart 32 mm yerine UZUN (45–64 mm) 18G–20G kanül kullanılmalıdır; aksi halde kanülün damar içi payı < 1/3 kalıp saatler içinde çıkar.'
  },
  {
    step: '04',
    title: 'Optik Görüntüleme (NIR / Soğuk Işık Transillüminasyon)',
    detail: 'Yakın kızılötesi (NIR) damar görüntüleyiciler subkutan ven ağını haritalar; yenidoğan ve süt çocuklarında el/ayak bileği altında soğuk ışık kaynağı (transillüminasyon) yüzeyel venleri netleştirir.'
  },
  {
    step: '05',
    title: 'Eksternal Juguler Ven (EJV) & Midline Kateter',
    detail: 'Acilde 15° Trendelenburg ile EJV üzerinden hızlı 16G–18G periferik yol açılabilir. 1–4 haftalık orta süreli erişimde USG ile üst kola yerleştirilen Midline kateter (8–20 cm, ucu aksiller vende kalır; vezikan değildir) tercih edilebilir.'
  },
  {
    step: '06',
    title: 'Acil Kurtarma: İntraosseöz (İO) & USG-SVK',
    detail: 'KPR veya derin şokta 60–90 saniye içinde IV yol sağlanamazsa proksimal tibia veya proksimal humerustan İO erişim açılır (tüm ilaçlar & kan verilebilir, ≤ 24 sa içinde IV/SVK ile değiştirilir). Vezikan infüzyon veya periferik tükenmede USG eşliğinde SVK kalıcı çözümdür.'
  }
];

type ScenarioFilter = 'all' | 'resuscitation' | 'blood' | 'routine' | 'pediatric';

const SCENARIO_GUIDES: {
  id: ScenarioFilter;
  label: string;
  recommended: string;
  rationale: string;
}[] = [
  {
    id: 'all',
    label: 'Tümü (14G – 26G + 7Fr SVK)',
    recommended: 'ISO 10555-5 Tam Ölçek + Standart 7 Fr (20 cm) 3 Lümenli SVK (Hız Sıralı)',
    rationale: 'Periferik IV kanüller ile standart 7 Fr 20 cm 3 lümenli SVK lümenleri akım hızına göre aynı tabloda iç içe sıralanmıştır: kısa bir 20G Pembe kanülün SVK 16G distal lümenden daha hızlı olduğu doğrudan görülür.'
  },
  {
    id: 'resuscitation',
    label: 'Acil Resüsitasyon / Şok',
    recommended: '14G Turuncu · 16G Gri · (18G Yeşil)',
    rationale: 'Travma, hemorajik şok ve masif kanama riski olan majör cerrahilerde iki adet geniş proksimal periferik yol (14G–16G) tek bir standart SVK lümeninden ~3.5–5 kat daha hızlı sıvı verir.'
  },
  {
    id: 'blood',
    label: 'Kan & Kan Ürünü Transfüzyonu',
    recommended: '18G Yeşil (İdeal) · 16G / 14G · (20G Yavaş)',
    rationale: 'Eritrosit süspansiyonunun hemoliz riskini artırmadan güvenle geçmesi için erişkinde standart 18G (acil masif transfüzyonda 14G–16G) tercih edilir; elektifte 20G kullanılabilir.'
  },
  {
    id: 'routine',
    label: 'Elektif Cerrahi & Servis',
    recommended: '20G Pembe (1. Tercih) · 18G · 22G',
    rationale: 'INS 2024 standardına göre klinik ihtiyacı karşılayan en küçük kalibre seçilir; elektif erişkinde ön kol/el sırtında 20G Pembe, ince/yaşlı venlerde 22G Mavi damar duvarı travmasını en aza indirir.'
  },
  {
    id: 'pediatric',
    label: 'Pediatri & Yenidoğan',
    recommended: '24G Sarı · 22G Mavi · 26G Mor',
    rationale: 'Çocuklarda 22G–24G, yenidoğan/prematürelerde 24G–26G kullanılır (el sırtı, ayak sırtı dorsal arkus veya skalp venleri). Büyük okul çağı çocuklarda 20G–22G tercih edilebilir.'
  }
];

const IV_REFERENCES = [
  {
    id: 'iso-10555',
    type: 'Uluslararası Standart',
    citation: 'ISO 10555-5:2013/Amd 1:2017. Intravascular catheters — Sterile and single-use catheters — Part 5: Over-needle peripheral catheters.',
    note: 'Periferik IV kanül göbek/kapak renk kodlaması (14G Turuncu – 26G Mor), dış çap toleransları ve standart akım test koşulları.',
    url: 'https://www.iso.org/standard/57882.html'
  },
  {
    id: 'ins-2024',
    type: 'Klinik Uygulama Standardı',
    citation: 'Nickel B, Gorski L, Kleidon T, et al. Infusion Therapy Standards of Practice, 9th Edition. J Infus Nurs. 2024;47(1S Suppl 1):S1–S285.',
    note: 'Kalibre ve anatomik bölge eşleştirme kuralları, 2-deneme DIVA kuralı, USG eşliğinde uzun kanül kullanımı, flebit/ekstravazasyon önleme ve ven koruma ilkeleri.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38211609/'
  },
  {
    id: 'arrow-7fr-20cm',
    type: 'Kateter Teknik Spesifikasyonu (IFU)',
    citation: 'Teleflex / Arrow® Three-Lumen Central Venous Catheterization Set (7 Fr · 20 cm: Distal 16G, Medial 18G, Proximal 18G Gravity Flow Specifications).',
    note: '100 cm su sütunu yüksekliğinde %0.9 NaCl yerçekimi akım hızları: Distal 16G ≈ 3,100 mL/sa (~52 mL/dk), Proksimal 18G ≈ 1,600 mL/sa (~27 mL/dk), Medial 18G ≈ 1,500 mL/sa (~25 mL/dk).',
    url: 'https://www.teleflex.com/'
  },
  {
    id: 'millers-iv',
    type: 'Referans Textbook',
    citation: 'Gropper MA, Cohen NH, Eriksson LI, et al. Miller’s Anesthesia. 9th/10th ed. Elsevier; Chapter: Vascular Cannulation & Perioperative Fluid Therapy.',
    note: 'Poiseuille yasası (Q ∝ r⁴/L), kanül çapı/uzunluğu ile infüzyon hızı ilişkisi ve masif resüsitasyonda periferik vs santral erişim akım dinamikleri.'
  },
  {
    id: 'aa-safe-vascular-2025',
    type: 'Klinik Kılavuz (2025)',
    citation: 'Johnston AJ, Simpson MJ, McCormack V, et al. Association of Anaesthetists guidelines: safe vascular access 2025. Anaesthesia. 2025;80(11):1381–1396.',
    note: 'KBH (AV fistül) ve mastektomi/aksiller diseksiyon tarafında periferik ve santral damar yolundan kaçınılması (ömür boyu damar koruma) ve İO/DIVA eskalasyonu.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/40958714/'
  }
];

export const IvAccessInfographic: React.FC<IvAccessInfographicProps> = ({ isDark }) => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioFilter>('all');
  const [pressureBagActive, setPressureBagActive] = useState<boolean>(false);

  const activeGuide = SCENARIO_GUIDES.find((g) => g.id === selectedScenario) || SCENARIO_GUIDES[0];
  const visibleRows =
    selectedScenario === 'all'
      ? ACCESS_ROWS
      : ACCESS_ROWS.filter((r) => r.kind === 'peripheral' && r.scenarioTags.includes(selectedScenario));

  const peripheralDetailCards = visibleRows.filter((r) => r.kind === 'peripheral');
  const maxFlow = 270;

  return (
    <div className="space-y-6">
      {/* 1. Üst Özet Başlık + Büyük Poiseuille Yasası + Senaryo Filtreleri + Basınç Modu Seçici */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border-slate-800'
            : 'bg-gradient-to-br from-white via-cyan-50/30 to-slate-50 border-slate-200 shadow-xs'
        }`}
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md font-bold bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
              ISO 10555-5 · INS 2024
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Periferik İntravenöz Kanülasyon &amp; Akım Dinamiği Rehberi
            </span>
          </div>
          <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            IV Erişim: Standart Kanül Renkleri, Tercih Edilen Bölgeler, İnfüzyon Hızları &amp; 7 Fr SVK Kıyaslaması
          </h4>
          <p className={`text-xs sm:text-sm max-w-4xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Gauge (G) numarası <strong>küçüldükçe</strong> kanül çapı büyür ve akım hızı katlanarak artar. Klinik hedef: <em>&quot;Tedaviyi güvenle karşılayan en kısa ve en ince yeterli kalibre&quot;</em> ile damar duvarını korumak; masif resüsitasyonda ise uzun santral kateterler yerine kısa ve geniş periferik yolları tercih etmektir.
          </p>
        </div>

        {/* BÜYÜK & GÖRÜNÜR POISEUILLE AKIM KANUNU KARTI (Filtrelerin Üzerinde) */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border-2 space-y-3.5 ${
            isDark
              ? 'bg-cyan-950/30 border-cyan-500/40'
              : 'bg-cyan-50/80 border-cyan-300'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-cyan-500/25">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-600 text-white shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h5 className={`text-sm sm:text-base font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Poiseuille Akım Kuralı (Hagen–Poiseuille Yasası: r⁴ / L)
                </h5>
                <p className={`text-xs ${isDark ? 'text-cyan-200/80' : 'text-cyan-900/80'}`}>
                  Laminar akımda debi (Q); yarıçapın 4. kuvveti ve basınç farkıyla doğru, kateter uzunluğu ve sıvı viskozitesiyle ters orantılıdır.
                </p>
              </div>
            </div>

            <div
              className={`px-4 py-2 rounded-xl border font-mono text-sm sm:text-base font-bold tracking-tight shrink-0 text-center ${
                isDark
                  ? 'bg-slate-950 border-cyan-500/40 text-cyan-300'
                  : 'bg-white border-cyan-300 text-cyan-800 shadow-2xs'
              }`}
            >
              Q = (ΔP · π · <span className="text-amber-500 underline decoration-2">r⁴</span>) / (8 · η · <span className="text-rose-500 underline decoration-2">L</span>)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-cyan-200'}`}>
              <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                1. Çap Etkisi (r⁴) — Dominant Faktör
              </div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                İç yarıçap sadece <strong>2 kat</strong> büyüdüğünde akım hızı <strong>16 kat (2⁴)</strong> artar. Örnek: 14G (2.1 mm) bir kanül, 20G (1.1 mm) kanüle göre yaklaşık <strong>4.5 kat</strong> daha hızlıdır.
              </p>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-cyan-200'}`}>
              <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                2. Uzunluk Etkisi (1 / L) — SVK Neden Yavaş?
              </div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Kateter boyu <strong>2 kat</strong> uzarsa akım <strong>yarıya (%50)</strong> düşer. Aynı <strong>16G</strong> çapta olsa bile 45 mm periferik kanül (~195 mL/dk), 200 mm 7 Fr SVK distal lümeninden (~52 mL/dk) <strong>~3.8× hızlıdır</strong>.
              </p>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-cyan-200'}`}>
              <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                3. Basınç (ΔP) &amp; Viskozite (η)
              </div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>300 mmHg basınçlı torba</strong> itici basıncı artırarak kristaloid akımını ~2× hızlandırır. Soğuk eritrosit süspansiyonunun yüksek viskozitesi (η) akımı yavaşlatır; ısıtma ve %0.9 NaCl eşliği akışı açar.
              </p>
            </div>
          </div>
        </div>

        {/* Senaryo Filtre Butonları */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Klinik Senaryoya Göre Filtrele
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SCENARIO_GUIDES.map((guide) => {
                const active = selectedScenario === guide.id;
                return (
                  <button
                    key={guide.id}
                    type="button"
                    onClick={() => setSelectedScenario(guide.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      active
                        ? 'bg-cyan-600 border-cyan-500 text-white shadow-xs'
                        : isDark
                          ? 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {guide.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* NET VE BELİRGİN BASINÇ MODU SEÇİCİ (Segmented Control) */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col lg:flex-row lg:items-center justify-between gap-3 ${
              pressureBagActive
                ? isDark
                  ? 'bg-amber-950/25 border-amber-500/50'
                  : 'bg-amber-50/90 border-amber-300'
                : isDark
                  ? 'bg-slate-950/70 border-slate-800'
                  : 'bg-slate-100/80 border-slate-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Gauge className={`w-5 h-5 shrink-0 mt-0.5 ${pressureBagActive ? 'text-amber-500' : 'text-cyan-500'}`} />
              <div>
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  İnfüzyon Basınç Modu Seçimi (Tablodaki Hızları Anlık Günceller)
                </div>
                <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {pressureBagActive
                    ? 'Basınçlı Torba (300 mmHg) AKTİF: Tablodaki tüm akım hızları ve 1 L süreleri 300 mmHg manşon basıncı altındaki tahmini değerleri (~2× hızlanma) gösterir.'
                    : 'Standart Yerçekimi AKTİF: Tablodaki akım hızları 100 cm (1 metre) serum askısı yüksekliğindeki standart yerçekimi değerleridir.'}
                </p>
              </div>
            </div>

            <div
              className={`inline-flex p-1 rounded-xl border shrink-0 self-start lg:self-auto ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
              }`}
              role="group"
              aria-label="İnfüzyon basınç modu"
            >
              <button
                type="button"
                onClick={() => setPressureBagActive(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !pressureBagActive
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Yerçekimi (100 cm)
              </button>
              <button
                type="button"
                onClick={() => setPressureBagActive(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  pressureBagActive
                    ? 'bg-amber-600 text-white shadow-xs'
                    : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Basınçlı Torba (300 mmHg · ~2×)
              </button>
            </div>
          </div>
        </div>

        {/* Seçili Senaryo Öneri Şeridi */}
        <div
          className={`p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-cyan-50/70 border-cyan-200'
          }`}
        >
          <div className="space-y-0.5">
            <div className="font-bold text-cyan-700 dark:text-cyan-300">
              Önerilen Seçim: {activeGuide.recommended}
            </div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>{activeGuide.rationale}</p>
          </div>
        </div>
      </div>

      {/* 2. Birleşik Kanül & 7 Fr SVK Karşılaştırma Tablosu (Hız Sıralı + Tercih Edilen Anatomik Bölge) */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-cyan-500" />
            <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {selectedScenario === 'all'
                ? 'Periferik IV Kanüller & Standart 7 Fr (20 cm) 3 Lümenli SVK — Hız Sıralı Karşılaştırma'
                : 'Seçili Klinik Senaryoya Göre Standart IV Kanüller'}
            </h5>
          </div>
          <span className={`text-[11px] font-mono font-semibold ${pressureBagActive ? 'text-amber-500' : 'text-slate-500 dark:text-slate-400'}`}>
            %0.9 NaCl · 100 cm yükseklik · {pressureBagActive ? '300 mmHg Basınçlı Torba (~2×)' : 'Standart Yerçekimi Akımı'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[980px]">
            <thead>
              <tr className={isDark ? 'bg-slate-950/90 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Gauge · Tip &amp; Renk</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Çap / Uzunluk</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">
                  {pressureBagActive ? 'Basınçlı Akım (300 mmHg)' : 'İnfüzyon Hızı (Yerçekimi)'}
                </th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">1 L Süresi</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Tercih Edilen Bölge &amp; Nedeni</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Klinik Kullanım &amp; Kan Transfüzyonu</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-200' : 'divide-slate-200 text-slate-800'}`}>
              {visibleRows.map((row) => {
                const isCvc = row.kind === 'cvc';
                const barWidthPct = Math.max(5, Math.round((row.flowRateNumericMid / maxFlow) * 100));
                const pressurizedLow = Math.round(row.flowRateNumericMid * 1.85);
                const pressurizedHigh = Math.round(row.flowRateNumericMid * (isCvc ? 2.25 : 2.35));
                return (
                  <tr
                    key={row.id}
                    className={
                      isCvc
                        ? isDark
                          ? 'bg-indigo-950/25 hover:bg-indigo-950/40 transition-colors'
                          : 'bg-indigo-50/45 hover:bg-indigo-50/80 transition-colors'
                        : isDark
                          ? 'hover:bg-slate-800/40 transition-colors'
                          : 'hover:bg-slate-50 transition-colors'
                    }
                  >
                    <td className="p-3 align-top">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-9 rounded-sm border border-black/15 shrink-0"
                          style={{ backgroundColor: row.colorHex }}
                          aria-hidden="true"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-sm">{row.gauge}</span>
                            <span
                              className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                isCvc
                                  ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'
                                  : isDark
                                    ? 'bg-slate-800 text-slate-300'
                                    : 'bg-slate-200/80 text-slate-700'
                              }`}
                            >
                              {row.subLabel}
                            </span>
                          </div>
                          <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded border mt-1 ${row.badgeClass}`}>
                            {row.colorName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 align-top font-mono tabular-nums whitespace-nowrap">
                      <div className="font-semibold">{row.outerDiameterMm}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Boy: {row.lengthLabel}</div>
                    </td>
                    <td className="p-3 align-top min-w-[205px]">
                      <div
                        className={`font-mono tabular-nums font-bold ${
                          pressureBagActive
                            ? 'text-amber-500'
                            : isCvc
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'text-cyan-600 dark:text-cyan-400'
                        }`}
                      >
                        {pressureBagActive ? `~${pressurizedLow} – ${pressurizedHigh} mL/dk` : row.flowRateMlMinLabel}
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 mt-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${barWidthPct}%`, backgroundColor: row.colorHex }}
                        />
                      </div>
                    </td>
                    <td className="p-3 align-top font-mono tabular-nums whitespace-nowrap">
                      <div className="inline-flex items-center gap-1 font-semibold">
                        <Timer className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {pressureBagActive
                            ? `~${Math.max(1.5, Math.round((1000 / ((pressurizedLow + pressurizedHigh) / 2)) * 10) / 10)} dk`
                            : row.oneLiterTimeApprox}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 align-top max-w-[260px] leading-relaxed">
                      <div className="flex items-start gap-1.5 font-semibold text-slate-800 dark:text-slate-100">
                        <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{row.preferredSites}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {row.siteRationale}
                      </div>
                    </td>
                    <td className="p-3 align-top max-w-[270px] leading-relaxed">
                      <div className="font-semibold">{row.primaryUse}</div>
                      <div className="text-[11px] font-medium text-cyan-700 dark:text-cyan-300 mt-1">
                        Kan: {row.bloodTransfusion}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Detaylı Kanül Kartları Grid (Bölge & Klinik İnciler) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {peripheralDetailCards.map((c) => (
          <div
            key={c.id}
            className={`p-4 rounded-xl border flex flex-col justify-between space-y-2.5 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                    style={{ backgroundColor: c.colorHex }}
                  />
                  <span className={`font-mono font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {c.gauge} · {c.colorName}
                  </span>
                </div>
                <span className="text-[11px] font-mono tabular-nums font-semibold text-cyan-600 dark:text-cyan-400">
                  {c.flowRateMlMinLabel}
                </span>
              </div>
              <div className="flex items-start gap-1.5 text-[11px] font-semibold text-cyan-700 dark:text-cyan-300">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{c.preferredSites}</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {c.clinicalNotes}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Ø {c.outerDiameterMm} · {c.lengthLabel}</span>
              <span>1 L: {c.oneLiterTimeApprox}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Klinik İnciler: Periferik vs Santral Akım & Damar Koruma Kuralları */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
        <div
          className={`p-4 sm:p-5 rounded-xl border space-y-2.5 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm text-cyan-600 dark:text-cyan-400">
            <Syringe className="w-4 h-4 shrink-0" />
            <span>Masif Resüsitasyonda Neden Geniş Periferik Kanül?</span>
          </div>
          <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <li>
              • <strong>Kısa + Geniş Üstünlüğü:</strong> 14G (45 mm, ~270 mL/dk) veya 16G (45 mm, ~195 mL/dk) periferik kanül, standart 20 cm 3 lümenli SVK’nın distal 16G lümeninden (~52 mL/dk) <strong>3.8–5 kat daha hızlı</strong> akım sağlar.
            </li>
            <li>
              • <strong>İki Damar Kuralı:</strong> Hemorajik şokta santral hat açılmasını beklemek yerine hemen iki ayrı geniş periferik (≥ 16G–18G) damar yolu açılır; çok yüksek hız gerekiyorsa 8.5 Fr hızlı infüzyon kılıfı (RIC / introdüser) takılır.
            </li>
            <li>
              • <strong>Kan Viskozitesi:</strong> Soğuk eritrosit süspansiyonunun viskozitesi yüksektir; hızlı transfüzyonda izotonik (%0.9 NaCl) ile birlikte ve ısıtıcı/basınçlı sistemle (≤ 300 mmHg) 14G–18G üzerinden verilmelidir.
            </li>
          </ul>
        </div>

        <div
          className={`p-4 sm:p-5 rounded-xl border space-y-2.5 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm text-amber-600 dark:text-amber-400">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Damar Koruma, Bölge Seçimi &amp; Güvenlik Kuralları (INS 2024 / Johnston 2025)</span>
          </div>
          <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <li>
              • <strong>Kontrendike Ekstremiteler:</strong> Aktif/planlanan AV fistül (KBH Evre 3b–5), ipsilateral aksiller lenf nodu diseksiyonu/mastektomi, lenfödem, tromboz veya enfeksiyon bulunan kola kanül takılmaz.
            </li>
            <li>
              • <strong>Bölge Seçimi:</strong> Elektifte bükülme/kink ve flebit riski nedeniyle eklem kıvrım yerlerinden (antekübital fossa, el bileği volar yüzü) kaçınılır; düz <strong>ön kol sefalik/bazilik veya el sırtı</strong> venleri tercih edilir.
            </li>
            <li>
              • <strong>Vezikan/Hiperozmolar İlaçlar:</strong> Vankomisin, KCl (&gt; 40 mEq/L), %3 NaCl, yüksek doz vazopresör veya pH &lt; 5 / &gt; 9 / &gt; 900 mOsm/L solüsyonlar uzun süreli periferik yoldan ekstravazasyon riski taşır; yakın izlem veya santral erişim gerektirir.
            </li>
          </ul>
        </div>
      </div>

      {/* 5. Klinik Dikkat Kutusu */}
      <div
        className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
          isDark ? 'bg-rose-950/20 border-rose-900/50 text-rose-200' : 'bg-rose-50/70 border-rose-200 text-rose-900'
        }`}
      >
        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Önemli Klinik Uyarı (Örtü Altı &amp; Ameliyat İçi Kontrol):</strong> Anestezi indüksiyonundan hemen önce ve hasta cerrahi örtülerle kapatılmadan önce tüm periferik IV hatların serbest akımı, geri dönüşü ve tespit bandı kontrol edilir. Örtü altında sızan yüksek basınçlı pompa infüzyonları dakikalar içinde <strong>kompartman sendromu</strong> veya ciddi doku nekrozuna yol açabilir.
        </div>
      </div>

      {/* 6. ZOR DAMAR YOLU (DIVA) DURUMUNDA KULLANILABİLECEK TEKNİKLER (Kaynaklardan Hemen Önce) */}
      <div
        className={`p-5 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <h5 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Zor Damar Yolu (DIVA) Durumunda Kullanılabilecek Teknikler ve Eskalasyon Basamakları
            </h5>
          </div>
          <span className="text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
            INS 2024 · Association of Anaesthetists 2025
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          {DIVA_TECHNIQUES.map((tech) => (
            <div
              key={tech.step}
              className={`p-4 rounded-xl border space-y-1.5 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  {tech.step}
                </span>
                <h6 className={`font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {tech.title}
                </h6>
              </div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {tech.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Kaynaklar ve Standartlar */}
      <div
        className={`p-5 rounded-2xl border text-xs space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-slate-100">
          <BookOpen className="w-4 h-4 text-cyan-500 shrink-0" />
          <span>Kaynaklar ve Standartlar</span>
        </div>

        <div className="space-y-2.5">
          {IV_REFERENCES.map((ref) => (
            <div
              key={ref.id}
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  {ref.type}
                </span>
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>Kaynağa Git</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="leading-relaxed font-medium text-slate-800 dark:text-slate-200">
                {ref.citation}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {ref.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
