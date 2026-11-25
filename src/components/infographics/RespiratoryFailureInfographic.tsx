import React, { useMemo, useRef, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Gauge,
  HeartPulse,
  Info,
  Layers,
  ShieldAlert,
  Stethoscope,
  TrendingUp,
  Wind
} from 'lucide-react';

interface RespiratoryFailureInfographicProps {
  isDark: boolean;
}

type RespFailureTypeId = 'type1' | 'type2' | 'type3' | 'type4';
type AlveolarStateId = 'normal' | 'vq-mismatch' | 'shunt' | 'dead-space';
type WorkspaceTabId = 'clinical' | 'physiology' | 'progression';
type ProgressionCategoryId = 'all' | 'airway-parenchyma' | 'periop-shock';

interface ExamFinding {
  group: string;
  detail: string;
}

interface RespFailureProfile {
  id: RespFailureTypeId;
  shortLabel: string;
  title: string;
  subtitle: string;
  badgeText: string;
  primaryDefect: string;
  accent: {
    text: string;
    border: string;
    bgSoft: string;
    tabActive: string;
    dot: string;
  };
  definition: string;
  mechanismSummary: string;
  diagnosticCriteria: { label: string; value: string; detail: string }[];
  clinicalExamples: string[];
  criticalHistory: string[];
  physicalExam: ExamFinding[];
  firstIntervention: string[];
  clinicalPearl: string;
}

const RESPIRATORY_FAILURE_TYPES: RespFailureProfile[] = [
  {
    id: 'type1',
    shortLabel: 'Tip 1',
    title: 'Tip 1: Hipoksemik Solunum Yetmezliği',
    subtitle: 'Oksijenasyonun bozulduğu, klinikte en sık karşılaşılan form',
    badgeText: 'Oda havasında PaO₂ < 60 mmHg · PaCO₂ Normal / ↓',
    primaryDefect: 'Oksijenasyon Bozukluğu (V/Q Eşitsizliği veya İntrapulmoner Şant)',
    accent: {
      text: 'text-sky-600 dark:text-sky-400',
      border: 'border-sky-500/30',
      bgSoft: 'bg-sky-50/70 dark:bg-sky-950/20',
      tabActive: 'bg-sky-600 text-white shadow-xs',
      dot: 'bg-sky-500'
    },
    definition:
      'Oksijenasyonun bozulduğu, klinikte en sık karşılaşılan solunum yetmezliği formudur. Yeterli alveoler ventilasyona rağmen arteriyel kan yeterince oksijenlenemez.',
    mechanismSummary:
      'Ventilasyon/Perfüzyon (V/Q) eşitsizliği (en sık), intrapulmoner sağdan-sola şant, difüzyon bariyeri kalınlaşması veya düşük PiO₂ (yüksek irtifa / hipoksik gaz karışımı — normal A–a). Not: Saf alveoler hipoventilasyon Tip 2 solunum yetmezliğidir.',
    diagnosticCriteria: [
      { label: 'Kan Gazı (PaO₂)', value: '< 60 mmHg', detail: 'Oda havasında (FiO₂ 0.21) veya SpO₂ < %90' },
      { label: 'Arteriyel PaCO₂', value: 'Normal / ↓', detail: 'Hipoksiye sekonder hiperventilasyon nedeniyle genellikle normal veya düşük' },
      {
        label: 'PaO₂/FiO₂ & ARDS',
        value: '≤ 300 mmHg',
        detail: 'Berlin (PEEP ≥ 5 cmH₂O): Hafif 200–300, Orta 100–200, Ağır ≤ 100 · Global Yeni ARDS (Matthay 2024): HFNO ≥ 30 L/dk, SpO₂/FiO₂ ≤ 315 & Akciğer USG (LUS)'
      },
      { label: 'A–a O₂ Gradiyenti', value: 'ARTMIŞ', detail: 'V/Q eşitsizliği, şant ve difüzyon bozukluğunda yükselir (oda havasında > Yaş/4 + 4; düşük PiO₂’de normal)' }
    ],
    clinicalExamples: [
      'ARDS (Berlin PEEP ≥ 5 cmH₂O & 2024 Global Tanım: HFNO ≥ 30 L/dk, SpO₂/FiO₂ ≤ 315, LUS)',
      'Pnömoni (bakteriyel, viral, aspirasyon)',
      'Kardiyojenik pulmoner ödem',
      'Pulmoner emboli',
      'Masif atelektazi, pnömotoraks veya yüksek irtifa / düşük PiO₂'
    ],
    criticalHistory: [
      'Akut başlayan şiddetli dispne.',
      'Plöritik göğüs ağrısı → Pulmoner emboli şüphesi.',
      'Ateş ve pürülan balgam → Pnömoni.',
      'Ortopne ve paroksismal noktürnal dispne → Kardiyojenik pulmoner ödem.'
    ],
    physicalExam: [
      {
        group: 'Nörolojik',
        detail: 'Beyin dokusunun akut hipoksiye ilk yanıtı olan huzursuzluk, ajitasyon, anksiyete ve konfüzyon.'
      },
      {
        group: 'İnspeksiyon',
        detail: 'Santral siyanoz (dil ve oral mukozada morarma), belirgin takipne, interkostal çekilmeler ve sternokleidomastoid / skalen gibi aksesuar solunum kaslarının aktif kullanımı.'
      },
      {
        group: 'Oskültasyon',
        detail: 'Bilateral yaygın krepitan raller (pulmoner ödem, ARDS), lokalize ince raller / tuber sufl (pnömoni) veya tek taraflı solunum seslerinin alınamaması (pnömotoraks).'
      }
    ],
    firstIntervention: [
      'Hedeflenen satürasyona (SpO₂ > %92–94) ulaşmak için oksijen desteği (rezervuarlı maske, Yüksek Akışlı Nazal Kanül — HFNO ≥ 30 L/dk) başlanır; HFNO yanıtı ROX indeksi [(SpO₂/FiO₂) / RR ≥ 4.88 = düşük entübasyon riski] ile seri takip edilir.',
      'Kardiyojenik ödem tablosunda alveolleri açık tutmak ve venöz dönüşü (preload) azaltmak için CPAP (NIMV) hayat kurtarıcıdır.',
      'Altta yatan nedene yönelik tedaviye ek olarak invaziv ventilasyon gereken ARDS’de akciğer koruyucu hedefler uygulanır: VT 4–8 mL/kg PBW, Pplat ≤ 30 cmH₂O, sürüş basıncı ΔP (Pplat − PEEP) < 15 cmH₂O, uygun PEEP (≥ 5 cmH₂O) ve ağır ARDS’de prone pozisyon.'
    ],
    clinicalPearl:
      'Tip 1 yetmezlikte FiO₂ %100’e çıkarıldığı halde PaO₂ yükselmiyorsa (refrakter hipoksemi) hakim mekanizma V/Q uyumsuzluğu değil intrapulmoner ŞANTtır; çözüm yalnız FiO₂ artışı değil PEEP ve alveoler açılmadır. HFNO’da 2–12. saatlerde ROX < 3.85 ise entübasyon geciktirilmemelidir.'
  },
  {
    id: 'type2',
    shortLabel: 'Tip 2',
    title: 'Tip 2: Hiperkapnik (Ventilatuvar) Solunum Yetmezliği',
    subtitle: 'Alveoler ventilasyonun CO₂ üretimini karşılayamadığı pompa yetmezliği',
    badgeText: 'PaCO₂ > 45–50 mmHg · Akut pH < 7.35',
    primaryDefect: 'Solunum Pompası Yetmezliği / Alveoler Hipoventilasyon',
    accent: {
      text: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-500/30',
      bgSoft: 'bg-violet-50/70 dark:bg-violet-950/20',
      tabActive: 'bg-violet-600 text-white shadow-xs',
      dot: 'bg-violet-500'
    },
    definition:
      'Alveoler ventilasyonun, vücudun metabolik karbondioksit üretimini karşılayamadığı "pompa yetmezliği" durumudur.',
    mechanismSummary:
      'Solunum merkezinin baskılanması (azalmış solunum dürtüsü), nöromüsküler zayıflık veya solunum iş yükünde / ölü boşluk ventilasyonunda artış.',
    diagnosticCriteria: [
      { label: 'Kan Gazı (PaCO₂)', value: '> 45–50 mmHg', detail: 'Alveoler hipoventilasyonun temel belirteci' },
      { label: 'Arteriyel pH', value: '< 7.35 (Akut)', detail: 'Akut tablolarda renal kompansasyon gelişmediği için asidemi belirgindir' },
      { label: 'Eşlik Eden PaO₂', value: 'Genelde < 60', detail: 'Alveoler gaz denklemine göre hiperkapniye ikincil hipoksemi sık eşlik eder' },
      { label: 'A–a O₂ Gradiyenti', value: 'Saf: NORMAL', detail: 'Opioid/NMB’de normal; KOAH veya parankimal patoloji varsa artmıştır' }
    ],
    clinicalExamples: [
      'KOAH akut alevlenmesi',
      'Opiat / sedatif zehirlenmesi veya postoperatif opioid depresyonu',
      'Guillain-Barré sendromu',
      'Myastenia Gravis krizleri',
      'Yelken göğüs (flail chest) & obezite-hipoventilasyon sendromu'
    ],
    criticalHistory: [
      'Bilinen ileri evre KOAH veya nöromüsküler hastalık öyküsü.',
      'Yakın zamanda opioid / benzodiazepin alımı veya anestezi sonrası erken dönem.',
      'Kronik formlarda sabah baş ağrıları ve gündüz aşırı uyku hali (obezite-hipoventilasyon sendromu).'
    ],
    physicalExam: [
      {
        group: 'Nörolojik (CO₂ Narkozu)',
        detail: 'Letarji, somnolans ve koma. Hiperkapnik ensefalopatinin en karakteristik nöromüsküler bulgusu asteriksis (flapping tremor)’tir.'
      },
      {
        group: 'Vasküler (CO₂ Vazodilatasyonu)',
        detail: 'Periferik vazodilatasyona bağlı sıcak, hiperemik (kızarık) ve terli cilt, sıçrayıcı nabız (bounding pulse) ve papil ödemi.'
      },
      {
        group: 'Solunum Paterni',
        detail: 'Santral dürtü baskılanmasında bradipne ve yüzeyel solunum; diyafram yorgunluğunda paradoksal solunum (inspiryumda karnın dışarı çıkmak yerine içe çökmesi). Obstrüktif patolojilerde uzamış ekspiryum, ronküs ve vizing.'
      }
    ],
    firstIntervention: [
      'KOAH’ta kontrollü oksijenasyon (hedef SpO₂ %88–92) sağlanır: kontrolsüz hiperoksinin hiperkapniyi ağırlaştırmasında PRİMER mekanizma (~%50–70) hipoksik pulmoner vazokonstriksiyonun (HPV) kalkmasına bağlı V/Q bozulması ve fizyolojik ölü boşluk artışıdır; ek olarak Haldane etkisi (~%25–30) ve hipoksik solunum dürtüsünün baskılanması (~%10–20) rol oynar.',
      'CO₂ atılımını artırmak (ventilasyonu desteklemek) için kontrendikasyon yoksa ilk seçenek BPAP / BiPAP (NIMV) uygulamasıdır.',
      'Opiyat/sedatif toksisitesi varsa spesifik antidotlar (Nalokson; benzodiyazepinde kronik bağımlılık/nöbet riski yoksa dikkatli Flumazenil) uygulanır; KOAH’ta bronkodilatör ve sistemik steroid başlanır.'
    ],
    clinicalPearl:
      'Astım atağındaki hastada PaCO₂’nin 30 mmHg’den 42 mmHg’ye "normalleşmesi" iyileşme değil, solunum kaslarının tükendiğini ve dakikalar içinde arrest gelişebileceğini gösteren kritik uyarıdır.'
  },
  {
    id: 'type3',
    shortLabel: 'Tip 3',
    title: 'Tip 3: Perioperatif (Atelektatik) Solunum Yetmezliği',
    subtitle: 'Genel anestezi ve cerrahiye bağlı FRC kaybı & alveoler kollaps',
    badgeText: 'Postop Dönem · FRC < Kapanma Kapasitesi (CC)',
    primaryDefect: 'Perioperatif Mikroatelektaziler & FRC Kaybı',
    accent: {
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-500/30',
      bgSoft: 'bg-amber-50/70 dark:bg-amber-950/20',
      tabActive: 'bg-amber-600 text-white shadow-xs',
      dot: 'bg-amber-500'
    },
    definition:
      'Özellikle genel anestezi sonrası fonksiyonel rezidüel kapasitenin (FRC) kapanma kapasitesinin (CC) altına düşmesiyle karakterize, anestezi pratiğinin spesifik solunum yetmezliği tipidir.',
    mechanismSummary:
      'Anestezik ajanların diyafram tonusunu azaltması, supin pozisyon, yüksek FiO₂ ile rezorpsiyon atelektazisi, cerrahi insizyon ağrısı nedeniyle mikroatelektazilerin gelişmesi ve mukosiliyer klirensin bozulması.',
    diagnosticCriteria: [
      { label: 'Fizyolojik Kriter', value: 'FRC < CC', detail: 'Fonksiyonel rezidüel kapasite ekspiryumda kapanma kapasitesinin altına iner' },
      { label: 'Zamanlama & Risk', value: 'Postop 0–72 sa', detail: 'Üst batın, toraks cerrahisi ve morbid obezitede en yüksek insidans' },
      { label: 'Oksijenasyon', value: 'SpO₂ < %90', detail: 'Bazal mikroatelektazilere bağlı şant/V/Q eşitsizliği ve artmış A–a gradiyenti' },
      { label: 'Klinik / NMB', value: 'Splinting / TOF', detail: 'Yüzeyel solunum veya rezidüel blokaj (kantitatif TOF < 0.90)' }
    ],
    clinicalExamples: [
      'Üst batın cerrahileri sonrası erken postoperatif dönem (kolesistektomi, gastrektomi, hepatektomi)',
      'Toraks cerrahisi (torakotomi / VATS) ve kardiyak cerrahi sonrası',
      'Morbid obezite (düşük bazal FRC nedeniyle riski en yüksek grup)',
      'Uzamış laparoskopik / Trendelenburg cerrahisi sonrası bazal atelektazi'
    ],
    criticalHistory: [
      'Yakın zamanlı üst batın veya toraks cerrahisi öyküsü.',
      'Yetersiz postoperatif analjezi (derin nefes alamama / ağrı kısıtlaması).',
      'Nöromüsküler bloker (NMB) ajanların etkisinin tam dönmemiş olması şüphesi.'
    ],
    physicalExam: [
      {
        group: 'Solunum Mekaniği',
        detail: 'İnsizyon ağrısına bağlı göğüs kafesinin hareketini refleks olarak kısıtlama (splinting), çok hızlı ve yüzeyel (düşük tidal volümlü) solunum.'
      },
      {
        group: 'Hava Yolu & Oskültasyon',
        detail: 'Zayıf/etkisiz öksürük refleksi, sekresyon atılamaması. Akciğer bazallerinde solunum seslerinde azalma veya derin inspiryumla açılan ince raller.'
      },
      {
        group: 'Kas Gücü (Rezidüel Blokaj)',
        detail: 'Rezidüel kürarizasyon durumunda hastanın başını yataktan 5 saniye boyunca kaldıramaması (head-lift testinde başarısızlık) ve diplopi (kesin dışlama için kantitatif TOF ≥ 0.90 esastır).'
      }
    ],
    firstIntervention: [
      'Solunumun kısıtlanmasını önlemek için multimodal ve etkin ağrı kontrolü (Torakal epidural analjezi, lokal/fasya plan blokları veya HKA/PCA) sağlanır.',
      'Nöromüsküler blokaj tam dönmemişse uygun ajanla (Sugammadeks, Neostigmin) antagonize edilir.',
      'Atelektazileri açmak için insentif spirometri (triflo), baş yukarı (30–45°) pozisyon, erken mobilizasyon, göğüs fizyoterapisi ve gerekirse maske ile aralıklı CPAP / HFNO uygulanır.'
    ],
    clinicalPearl:
      'Genel anestezi indüksiyonundan sonraki ilk 5 dakika içinde hastaların %90’ında bağımlı akciğer bölgelerinde atelektazi başlar; indüksiyon/idamede PEEP (≥ 5–8 cmH₂O) uygulamak ve gereksiz %100 FiO₂’den kaçınmak Tip 3 yetmezliği önler.'
  },
  {
    id: 'type4',
    shortLabel: 'Tip 4',
    title: 'Tip 4: Şok ve Hipoperfüzyona Bağlı Solunum Yetmezliği',
    subtitle: 'Kardiyovasküler instabilitede solunum kası enerji krizi & DO₂ çöküşü',
    badgeText: 'Şok (MAP < 65) · Laktik Asidoz · Kas Yorgunluğu',
    primaryDefect: 'Solunum Kaslarına Yetersiz O₂ Sunumu (DO₂ ↓) & Aşırı Solunum İşi',
    accent: {
      text: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-500/30',
      bgSoft: 'bg-rose-50/70 dark:bg-rose-950/20',
      tabActive: 'bg-rose-600 text-white shadow-xs',
      dot: 'bg-rose-500'
    },
    definition:
      'Kardiyovasküler instabilite zemininde, solunum kaslarının kanlanmasının bozulması ve hücresel düzeyde oksijen sunumunun (DO₂) çökmesidir.',
    mechanismSummary:
      'Şok tablosunda doku perfüzyonunun bozulmasıyla laktik asidoz gelişir ve bunu kompanse etmek için solunum işi artar. Ancak düşük kardiyak debi nedeniyle solunum kaslarına giden kan akımı yetersiz kalır ve solunum kası yorgunluğu (respiratory muscle fatigue) gelişir.',
    diagnosticCriteria: [
      { label: 'Hemodinami', value: 'SBP < 90 / MAP < 65', detail: 'Şok tablosu, daralmış nabız basıncı ve vazopresör ihtiyacı' },
      { label: 'Metabolik Yük', value: 'Laktat > 2 mmol/L', detail: 'Laktik asidozu kompanze etmek için dakika ventilasyonu aşırı artar' },
      { label: 'O₂ Tüketim Payı', value: 'CO’nun %20–40’ı', detail: 'Normalde <%5 tüketen solunum kasları şokta kalp debisinin %20–40’ını çalar' },
      { label: 'Entübasyon Kriteri', value: 'Erken Entübasyon', detail: 'Yalnız hipoksiyi değil, kalp üzerindeki aşırı solunum işi yükünü devralmak için' }
    ],
    clinicalExamples: [
      'Kardiyojenik şok (akut MI, dekompanse kalp yetmezliği)',
      'Ağır sepsis / septik şok',
      'Masif kanama (hemorajik / hipovolemik şok)',
      'Obstrüktif şok (masif pulmoner emboli, kardiyak tamponad)'
    ],
    criticalHistory: [
      'Akut miyokard enfarktüsü öyküsü veya ani göğüs ağrısı.',
      'Masif hemoraji veya ağır travma.',
      'Kontrolsüz enfeksiyon odağı ve ilerleyici sepsis bulguları.'
    ],
    physicalExam: [
      {
        group: 'Hemodinami & Perfüzyon',
        detail: 'Hipotansiyon, daralmış nabız basıncı, taşikardi, oligüri. Ciltte uzamış kapiller dolum (> 3 sn), soğuk, soluk ve alacalı (mottled) görünüm (erken septik şokta ise tam tersi sıcak ve kuru/hiperemik cilt).'
      },
      {
        group: 'Solunum Paterni',
        detail: 'Başlangıçta laktik asidozu kompanse etmeye yönelik derin ve hızlı solunum (Kussmaul solunumu). Solunum kasları tükendiğinde ise solunum hızında ani düşüş ve apne gelişimi.'
      }
    ],
    firstIntervention: [
      'Acil hemodinamik resüsitasyon (sıvı replasmanı, kan transfüzyonu, vazopressör ve inotropik ajanlar) başlatılır ("Resuscitate Before You Intubate").',
      'Solunum kaslarının aşırı oksijen tüketimini (%20–40 kalp debisi payını) derhal durdurmak ve kalbi rahatlatmak amacıyla erken entübasyon ve invaziv mekanik ventilasyon (uygun sedasyon/paralizi ile) en stratejik adımdır.',
      'İndüksiyonda hipotansiyonu derinleştirmeyen ajanlar (ör. Ketamin/Etomidat) tercih edilir ve entübasyon sonrası kompanzatuvar yüksek dakika ventilasyonu sürdürülür.'
    ],
    clinicalPearl:
      'Tip 4’te entübasyon sadece hipoksiyi çözmek için değil, solunum kaslarının harcadığı ve %20–40’lara varan ekstra kardiyak oksijen tüketimini devralıp kalp, beyin ve böbreği rahatlatmak için endikedir.'
  }
];

interface AlveolarState {
  id: AlveolarStateId;
  label: string;
  shortTag: string;
  vqRatio: string;
  o2Response: string;
  o2BadgeClass: string;
  title: string;
  physiology: string;
  examples: string;
  management: string;
  typeLink: string;
}

const ALVEOLAR_STATES: AlveolarState[] = [
  {
    id: 'normal',
    label: 'Normal Ünite',
    shortTag: 'V/Q ≈ 0.8 – 1.0',
    vqRatio: '0.8 – 1.0',
    o2Response: 'PaO₂ Normal (~95–100 mmHg)',
    o2BadgeClass: 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
    title: 'Dengeli Ventilasyon ve Perfüzyon (Normal Gaz Değişimi)',
    physiology:
      'Alveoler ventilasyon (V̇A ≈ 4 L/dk) ve pulmoner kapiller kan akımı (Q̇ ≈ 5 L/dk) dengelidir. Mikst venöz kan (PvO₂ 40 mmHg, SvO₂ / S̄vO₂ %75) alveolokapiller membrandan tam oksijenlenerek ayrılır (PaO₂ ≈ 95–100 mmHg, SaO₂ %98).',
    examples: 'Sağlıklı akciğer parankimi',
    management: 'Fizyolojik referans durumu',
    typeLink: 'Referans'
  },
  {
    id: 'vq-mismatch',
    label: 'V/Q Uyumsuzluğu (Düşük V/Q)',
    shortTag: '0 < V/Q < 0.8',
    vqRatio: '< 0.8 (Kısmi Ventilasyon ↓)',
    o2Response: 'Ek O₂ (FiO₂ ↑) ile DÜZELİR',
    o2BadgeClass: 'text-sky-700 dark:text-sky-300 bg-sky-500/15 border-sky-500/30',
    title: 'Kısmi Havayolu Obstrüksiyonu / V/Q Eşitsizliği',
    physiology:
      'Bronkospazm, sekresyon veya hafif interstisyel ödem nedeniyle alveole giren hava azalmış ancak tamamen kesilmemiştir. Alveol kısmen düşük PAO₂’ye sahiptir; yüksek FiO₂ verildiğinde kalan açık yoldan alveol içi O₂ basıncı yükselir ve PaO₂ belirgin düzelir.',
    examples: 'KOAH, Astım atağı, erken dönem bronkopnömoni, hafif pulmoner ödem',
    management: 'Ek O₂ desteği (rezervuarlı maske / HFNO) + bronkodilatör / diüretik',
    typeLink: 'Tip 1 & Tip 2'
  },
  {
    id: 'shunt',
    label: 'Gerçek Şant (İntrapulmoner)',
    shortTag: 'V/Q = 0',
    vqRatio: '0 (Sıfır Ventilasyon)',
    o2Response: 'Yalnız FiO₂ ↑ ile DÜZELMEZ (PEEP Gerekir)',
    o2BadgeClass: 'text-rose-700 dark:text-rose-300 bg-rose-500/15 border-rose-500/30',
    title: 'İntrapulmoner Sağdan-Sola Şant (Kollabe / Sıvı Dolu Alveol)',
    physiology:
      'Alveol sıvı/püy ile tamamen dolu (ARDS, lober pnömoni) veya tamamen kollabedir (masif atelektazi); alveol içinde gaz fazı yoktur. Hiç taze gaz girmediği için FiO₂ %100 yapılsa bile şantlanan kan mikst venöz düzeyde (PvO₂ ≈ 40 mmHg, SvO₂ / S̄vO₂ ≈ %75) kalır ve iyi ventile olan ünitelerdeki hemoglobin zaten %100 satüre olduğu için hipoksemi düzelmez.',
    examples: 'ARDS, yaygın atelektazi (Tip 3), masif pulmoner ödem, konsolide lober pnömoni',
    management: 'Alveolü açmak gerekir: CPAP / PEEP titrasyonu, rekruitment manevrası, prone pozisyon',
    typeLink: 'Tip 1 & Tip 3'
  },
  {
    id: 'dead-space',
    label: 'Alveoler Ölü Boşluk',
    shortTag: 'V/Q = ∞',
    vqRatio: '∞ (Sıfır Perfüzyon)',
    o2Response: 'CO₂ Atılımı Bozulur (ETCO₂ ↓, PaCO₂ ↑)',
    o2BadgeClass: 'text-violet-700 dark:text-violet-300 bg-violet-500/15 border-violet-500/30',
    title: 'Perfüzyon Yokluğu / Artmış Alveoler Ölü Boşluk (VD/VT ↑)',
    physiology:
      'Alveol normal veya aşırı ventile olur ancak pulmoner kapiller kan akımı pıhtı, şok veya aşırı alveoler basınç (yüksek PEEP) nedeniyle kesilmiştir. Bu ünite gaz değişimine katılamaz; CO₂ atılımı verimsizleşir (PaCO₂–ETCO₂ farkı açılır).',
    examples: 'Pulmoner emboli, derin şok / hipotansiyon, ağır amfizem / aşırı PEEP',
    management: 'Perfüzyonu sağla (antikoagülan / trombolitik, sıvı/vazopresör) + dakika ventilasyonu',
    typeLink: 'Tip 1, Tip 2 & Tip 4'
  }
];

interface AlveolarShuntDiagramProps {
  isDark: boolean;
  selectedState: AlveolarStateId;
  onSelectState: (state: AlveolarStateId) => void;
}

const AlveolarShuntDiagram: React.FC<AlveolarShuntDiagramProps> = ({
  isDark,
  selectedState,
  onSelectState
}) => {
  const active = ALVEOLAR_STATES.find((s) => s.id === selectedState) || ALVEOLAR_STATES[2];

  // Dynamic visual state styling for SVG
  const isCollapsed = selectedState === 'shunt';
  const isNarrowAirway = selectedState === 'vq-mismatch';
  const isNoPerfusion = selectedState === 'dead-space';
  const isNormal = selectedState === 'normal';

  const capillaryEndColor = isNormal
    ? '#ef4444'
    : selectedState === 'vq-mismatch'
      ? '#a855f7'
      : selectedState === 'shunt'
        ? '#3b82f6'
        : '#64748b';

  const sao2Output = isNormal
    ? 'SaO₂ ~%98 (PaO₂ 95)'
    : selectedState === 'vq-mismatch'
      ? 'SaO₂ ~%86 → O₂ ile >%95'
      : selectedState === 'shunt'
        ? 'SvO₂ ~%75 (PvO₂ 40 · O₂’ye dirençli)'
        : 'Akım Kesik (CO₂ ↑)';

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-sky-500" />
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              İnteraktif Alveoler Gaz &amp; İntrapulmoner Şant Diyagramı
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              V/Q eşitsizliği, gerçek şant ve ölü boşluk mekanizmalarının oksijen tedavisine yanıt farkını inceleyin.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-slate-400">
          Fizyolojik Durum Seçiniz
        </span>
      </div>

      {/* State selector buttons */}
      <div
        className={`grid grid-cols-2 lg:grid-cols-4 gap-1.5 p-1 rounded-xl border ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}
      >
        {ALVEOLAR_STATES.map((st) => {
          const isActive = st.id === selectedState;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => onSelectState(st.id)}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                isActive
                  ? st.id === 'normal'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : st.id === 'vq-mismatch'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : st.id === 'shunt'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-violet-600 text-white shadow-xs'
                  : isDark
                    ? 'text-slate-300 hover:bg-slate-800/70'
                    : 'text-slate-700 hover:bg-white'
              }`}
            >
              <div className="text-xs font-extrabold">{st.label}</div>
              <div className={`text-[10px] font-mono mt-0.5 ${isActive ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                {st.shortTag}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual SVG + Explanation Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Physiological Diagram */}
        <div
          className={`lg:col-span-6 p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          <svg
            viewBox="0 0 420 265"
            className="w-full h-auto"
            role="img"
            aria-label={`Alveol ve kapiller gaz değişim diyagramı: ${active.label}`}
          >
            <defs>
              <linearGradient id="capillaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="45%" stopColor={isNoPerfusion ? '#475569' : '#6366f1'} />
                <stop offset="100%" stopColor={capillaryEndColor} />
              </linearGradient>
              <marker id="arrowSky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#0ea5e9" />
              </marker>
              <marker id="arrowRose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#f43f5e" />
              </marker>
              <marker id="arrowWhite" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#e2e8f0" />
              </marker>
            </defs>

            {/* Airway neck */}
            <rect
              x={isNarrowAirway ? 196 : 185}
              y="14"
              width={isNarrowAirway ? 28 : 50}
              height="48"
              rx="6"
              fill={isDark ? '#1e293b' : '#e2e8f0'}
              stroke={isDark ? '#475569' : '#94a3b8'}
              strokeWidth="2"
            />

            {/* Obstruction / Fluid plug in airway for V/Q mismatch or Shunt */}
            {isNarrowAirway && (
              <>
                <ellipse cx="198" cy="40" rx="6" ry="11" fill="#f59e0b" opacity="0.85" />
                <ellipse cx="222" cy="40" rx="6" ry="11" fill="#f59e0b" opacity="0.85" />
                <text x="275" y="42" fontSize="10" fontWeight="700" fill="#f59e0b">
                  Bronkospazm / Sekresyon
                </text>
              </>
            )}

            {isCollapsed && (
              <>
                <rect x="188" y="34" width="44" height="16" rx="4" fill="#ef4444" opacity="0.85" />
                <text x="245" y="45" fontSize="10" fontWeight="700" fill="#ef4444">
                  Tıkanma / Kollaps
                </text>
              </>
            )}

            {/* Incoming O2 Arrow */}
            {!isCollapsed && (
              <line
                x1="210"
                y1="6"
                x2="210"
                y2="54"
                stroke="#0ea5e9"
                strokeWidth={isNarrowAirway ? 2 : 3.5}
                strokeDasharray={isNarrowAirway ? '3,3' : undefined}
                markerEnd="url(#arrowSky)"
              />
            )}
            <text x="108" y="24" fontSize="11" fontWeight="700" fill={isDark ? '#38bdf8' : '#0284c7'}>
              {isCollapsed ? 'Ventilasyon YOK (V̇ = 0)' : isNarrowAirway ? 'Azalmış O₂ Girişi' : 'Taze O₂ (FiO₂)'}
            </text>

            {/* Alveolus Sac */}
            <circle
              cx="210"
              cy={isCollapsed ? 114 : 118}
              r={isCollapsed ? 42 : 62}
              fill={
                isCollapsed
                  ? isDark
                    ? '#451a1a'
                    : '#fee2e2'
                  : isNarrowAirway
                    ? isDark
                      ? '#172554'
                      : '#e0f2fe'
                    : isDark
                      ? '#0f172a'
                      : '#f0f9ff'
              }
              stroke={isCollapsed ? '#ef4444' : isNarrowAirway ? '#f59e0b' : '#0ea5e9'}
              strokeWidth="3"
            />

            {/* Fluid / Consolidation fill inside collapsed alveolus */}
            {isCollapsed && (
              <path
                d="M 171 120 Q 210 110 249 120 A 41 41 0 0 1 171 120 Z"
                fill="#ef4444"
                opacity="0.45"
              />
            )}

            {/* Alveolar Labels */}
            <text
              x="210"
              y={isCollapsed ? 108 : 106}
              textAnchor="middle"
              fontSize={isCollapsed ? '10' : '12'}
              fontWeight="800"
              fill={isDark ? '#f8fafc' : '#0f172a'}
            >
              {isCollapsed ? 'Kollabe / Sıvı Dolu' : 'ALVEOL'}
            </text>
            <text
              x="210"
              y={isCollapsed ? 124 : 124}
              textAnchor="middle"
              fontSize={isCollapsed ? '9.5' : '10'}
              fontWeight="700"
              fontFamily="monospace"
              fill={isCollapsed ? (isDark ? '#fca5a5' : '#b91c1c') : isDark ? '#7dd3fc' : '#0369a1'}
            >
              {isCollapsed
                ? '(Gaz Fazı Yok)'
                : isNarrowAirway
                  ? 'PAO₂ ↓ (Düşük V/Q)'
                  : isNoPerfusion
                    ? 'PAO₂ ↑ · Ölü Boşluk'
                    : 'PAO₂ ~100 mmHg'}
            </text>

            {/* Gas exchange arrows across alveolar-capillary membrane */}
            {!isCollapsed && !isNoPerfusion && (
              <>
                <line
                  x1="194"
                  y1="150"
                  x2="194"
                  y2="196"
                  stroke="#0ea5e9"
                  strokeWidth={isNarrowAirway ? 2 : 3}
                  markerEnd="url(#arrowSky)"
                />
                <text x="166" y="176" fontSize="10" fontWeight="700" fill="#0ea5e9">
                  O₂
                </text>
                <line
                  x1="226"
                  y1="196"
                  x2="226"
                  y2="150"
                  stroke="#f43f5e"
                  strokeWidth={isNarrowAirway ? 2 : 3}
                  markerEnd="url(#arrowRose)"
                />
                <text x="234" y="176" fontSize="10" fontWeight="700" fill="#f43f5e">
                  CO₂
                </text>
              </>
            )}

            {isCollapsed && (
              <>
                <text x="210" y="170" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#ef4444">
                  Alveol Kollabe / Sıvı Dolu (Gaz Fazı Yok)
                </text>
                <text x="210" y="182" textAnchor="middle" fontSize="9.5" fontWeight="800" fontFamily="monospace" fill="#ef4444">
                  → Şantlanan Kan: PvO₂ ≈ 40 mmHg
                </text>
              </>
            )}

            {isNoPerfusion && (
              <text x="210" y="182" textAnchor="middle" fontSize="10" fontWeight="800" fill="#a855f7">
                ✕ Kan Akımı Yok (Gaz Değişimi Boşa Gider)
              </text>
            )}

            {/* Pulmonary Capillary Vessel */}
            <rect
              x="24"
              y="202"
              width="372"
              height="30"
              rx="15"
              fill="url(#capillaryGrad)"
              opacity={isNoPerfusion ? 0.55 : 0.92}
            />

            {/* Thrombus / Embolus block in capillary if Dead Space */}
            {isNoPerfusion && (
              <>
                <ellipse cx="145" cy="217" rx="18" ry="11" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                <text x="145" y="248" textAnchor="middle" fontSize="10" fontWeight="800" fill="#f43f5e">
                  Emboli / Hipoperfüzyon (Q̇ = 0)
                </text>
              </>
            )}

            {/* Blood flow direction arrow inside capillary */}
            <line x1="42" y1="217" x2="90" y2="217" stroke="#ffffff" strokeWidth="2" markerEnd="url(#arrowWhite)" />
            {!isNoPerfusion && (
              <line x1="315" y1="217" x2="365" y2="217" stroke="#ffffff" strokeWidth="2" markerEnd="url(#arrowWhite)" />
            )}

            {/* Capillary Inflow / Outflow Labels */}
            <text x="28" y="194" fontSize="10" fontWeight="700" fill="#3b82f6">
              Venöz (SvO₂ / S̄vO₂ %75)
            </text>
            <text x="392" y="194" textAnchor="end" fontSize="10" fontWeight="800" fill={capillaryEndColor}>
              {sao2Output}
            </text>
          </svg>
        </div>

        {/* Clinical Interpretation Panel */}
        <div className="lg:col-span-6 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-extrabold ${active.o2BadgeClass}`}>
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span>{active.o2Response}</span>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              V/Q Oranı: {active.vqRatio} · İlişkili Tip: {active.typeLink}
            </div>
            <h5 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {active.title}
            </h5>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {active.physiology}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className={`p-3 rounded-xl border text-xs ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Klinik Örnekler</div>
              <div className={isDark ? 'text-slate-200' : 'text-slate-800'}>{active.examples}</div>
            </div>
            <div className={`p-3 rounded-xl border text-xs ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Temel Fizyolojik Çözüm</div>
              <div className={isDark ? 'text-slate-200' : 'text-slate-800'}>{active.management}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DiseaseProgressionItem {
  disease: string;
  category: Exclude<ProgressionCategoryId, 'all'>;
  earlyType: RespFailureTypeId;
  earlyLabel: string;
  earlyDetail: string;
  trigger: string;
  lateType: RespFailureTypeId;
  lateLabel: string;
  lateDetail: string;
}

const DISEASE_PROGRESSIONS: DiseaseProgressionItem[] = [
  {
    disease: 'Akut Astım Atağı (Status Astmatikus)',
    category: 'airway-parenchyma',
    earlyType: 'type1',
    earlyLabel: 'Erken: Tip 1 (Hipoksemik)',
    earlyDetail: 'Bronkospazma bağlı V/Q eşitsizliği + hiperventilasyon (PaO₂ ↓, PaCO₂ < 35 mmHg respiratuvar alkaloz).',
    trigger: 'Solunum kası tükenmesi & ağır hava hapsi',
    lateType: 'type2',
    lateLabel: 'Geç / Kritik: Tip 2 (Hiperkapnik)',
    lateDetail: 'Önce PaCO₂’nin yalancı "normalleşmesi" (35→42), ardından PaCO₂ > 45, pH ↓ ve sessiz akciğer (acil entübasyon!).'
  },
  {
    disease: 'KOAH Akut Alevlenme',
    category: 'airway-parenchyma',
    earlyType: 'type1',
    earlyLabel: 'Erken / Hafif: Tip 1',
    earlyDetail: 'Havayolu inflamasyonu ve sekresyona bağlı V/Q uyumsuzluğu ile izole hipoksemi; PaCO₂ henüz normal.',
    trigger: 'Dinamik hiperinflasyon (oto-PEEP) + diyafram yorgunluğu',
    lateType: 'type2',
    lateLabel: 'İleri / Geç: Tip 2',
    lateDetail: 'Akut-kronik hiperkapnik solunum asidozu (PaCO₂ > 50, pH < 7.35) ve CO₂ narkozu / asteriksis.'
  },
  {
    disease: 'Kardiyojenik Pulmoner Ödem',
    category: 'airway-parenchyma',
    earlyType: 'type1',
    earlyLabel: 'Erken: Tip 1',
    earlyDetail: 'Alveoler/interstisyel sıvı birikimine bağlı V/Q eşitsizliği & şant; takipne ile hipokapni.',
    trigger: 'Aşırı solunum işi veya kardiyojenik şok eklenmesi',
    lateType: 'type4',
    lateLabel: 'Geç: Tip 2 / Tip 4',
    lateDetail: 'Solunum kası yorgunluğuyla hiperkapni (Tip 2) ve düşük kalp debisi/hipotansiyon gelişirse Tip 4 şok yetmezliği.'
  },
  {
    disease: 'Ağır Pnömoni / ARDS',
    category: 'airway-parenchyma',
    earlyType: 'type1',
    earlyLabel: 'Erken: Tip 1',
    earlyDetail: 'Alveoler eksüda, sürfaktan kaybı ve yaygın sağdan-sola şant (O₂’ye dirençli hipoksemi).',
    trigger: 'Septik şok veya ağır kompliyans düşüşü (VD/VT ↑)',
    lateType: 'type4',
    lateLabel: 'Geç: Tip 4 / Tip 2',
    lateDetail: 'Sepsis → Septik şok ve laktik asidoz geliştiğinde Tip 4; geç fibrotik/ölü boşluk fazında Tip 2 hiperkapni.'
  },
  {
    disease: 'Üst Batın / Toraks Cerrahisi (Postop)',
    category: 'periop-shock',
    earlyType: 'type3',
    earlyLabel: 'Erken (0–24 sa): Tip 3 (± Tip 2)',
    earlyDetail: 'FRC < CC atelektazi (Tip 3); eşlik eden opioid veya rezidüel NMB varsa hiperkapni (Tip 2).',
    trigger: 'Sekresyon retansiyonu, pnömoni, PE veya kanama',
    lateType: 'type1',
    lateLabel: 'Geç (24–72+ sa): Tip 1 / Tip 4',
    lateDetail: 'Postop pnömoni/ARDS/PE gelişirse Tip 1; postop hemorajik veya septik şok gelişirse Tip 4.'
  },
  {
    disease: 'Pulmoner Emboli (PE)',
    category: 'periop-shock',
    earlyType: 'type1',
    earlyLabel: 'Submasif / Erken: Tip 1',
    earlyDetail: 'Ölü boşluk artışı, refleks bronkokonstriksiyon ve V/Q dengesizliği (hipoksemi + hipokapni).',
    trigger: 'Akut sağ ventrikül yetmezliği & obstrüktif şok',
    lateType: 'type4',
    lateLabel: 'Masif / Geç: Tip 4',
    lateDetail: 'Ciddi hipotansiyon, düşük kardiyak debi, laktik asidoz ve solunum kası hipoperfüzyonu.'
  },
  {
    disease: 'Septik veya Hemorajik Şok',
    category: 'periop-shock',
    earlyType: 'type4',
    earlyLabel: 'Erken (Kompanzasyon): Tip 4',
    earlyDetail: 'Laktik asidoza yanıt Kussmaul hiperventilasyonu (PaCO₂ ↓); PaO₂ başlangıçta normal görünebilir.',
    trigger: 'Diyafram hipoperfüzyonu & glikojen tükenmesi',
    lateType: 'type2',
    lateLabel: 'Geç (Tükenme): Tip 4 + Tip 2 Çöküşü',
    lateDetail: 'Ani bradipne, PaCO₂ yükselmesi, ağır mikst asidoz ve kardiyopulmoner arrest (+ ARDS varsa Tip 1).'
  },
  {
    disease: 'Nöromusküler Kriz (GBS / Myasteni) & Opioid',
    category: 'periop-shock',
    earlyType: 'type3',
    earlyLabel: 'Erken: Pre-hiperkapnik / Mikroatelektazi',
    earlyDetail: 'FVC ve öksürük gücü düşer, bazal atelektazi başlar; PaCO₂ başlangıçta normaldir (yanıltıcı olabilir!).',
    trigger: 'Alveoler ventilasyonun kritik eşik altına düşmesi',
    lateType: 'type2',
    lateLabel: 'Geç: Tip 2 (Pompa Yetmezliği)',
    lateDetail: 'PaCO₂ hızla yükselir (> 45–50 mmHg), pH < 7.35 asidoz ve solunum arresti gelişir.'
  }
];

interface DifferentialPreset {
  id: string;
  label: string;
  diagramState: AlveolarStateId;
  pb: string;
  fio2: string;
  paco2: string;
  pao2: string;
  age: string;
  rq: string;
}

const DIFFERENTIAL_PRESETS: DifferentialPreset[] = [
  {
    id: 'pure-hypovent',
    label: 'Saf Hipoventilasyon (Opioid/NMB)',
    diagramState: 'normal',
    pb: '760',
    fio2: '21',
    paco2: '68',
    pao2: '55',
    age: '35',
    rq: '0.8'
  },
  {
    id: 'parenchymal-vq',
    label: 'Parankimal (Pnömoni / ARDS)',
    diagramState: 'shunt',
    pb: '760',
    fio2: '21',
    paco2: '32',
    pao2: '52',
    age: '52',
    rq: '0.8'
  },
  {
    id: 'mixed-copd-pneumonia',
    label: 'Mikst (KOAH + Pnömoni)',
    diagramState: 'vq-mismatch',
    pb: '760',
    fio2: '21',
    paco2: '62',
    pao2: '40',
    age: '68',
    rq: '0.8'
  },
  {
    id: 'high-altitude',
    label: 'Yüksek İrtifa / Düşük PiO₂',
    diagramState: 'normal',
    pb: '520',
    fio2: '21',
    paco2: '28',
    pao2: '55',
    age: '32',
    rq: '0.8'
  }
];

const AlveolarGasAndAaSimulator: React.FC<{
  isDark: boolean;
  onSyncDiagramState?: (state: AlveolarStateId) => void;
}> = ({ isDark, onSyncDiagramState }) => {
  const [pbInput, setPbInput] = useState<string>('760');
  const [fio2Input, setFio2Input] = useState<string>('21');
  const [paco2Input, setPaco2Input] = useState<string>('32');
  const [pao2Input, setPao2Input] = useState<string>('52');
  const [ageInput, setAgeInput] = useState<string>('52');
  const [rqInput, setRqInput] = useState<string>('0.8');

  const applyPreset = (p: DifferentialPreset) => {
    setPbInput(p.pb);
    setFio2Input(p.fio2);
    setPaco2Input(p.paco2);
    setPao2Input(p.pao2);
    setAgeInput(p.age);
    setRqInput(p.rq);
    onSyncDiagramState?.(p.diagramState);
  };

  const sim = useMemo(() => {
    const pb = Math.max(400, Math.min(800, parseFloat(pbInput) || 760));
    const fio2Pct = Math.max(21, Math.min(100, parseFloat(fio2Input) || 21));
    const fio2 = fio2Pct / 100;
    const paco2 = Math.max(10, Math.min(120, parseFloat(paco2Input) || 40));
    const pao2 = Math.max(15, Math.min(600, parseFloat(pao2Input) || 80));
    const age = Math.max(1, Math.min(110, parseFloat(ageInput) || 40));
    const rq = Math.max(0.65, Math.min(1.05, parseFloat(rqInput) || 0.8));

    const pio2 = fio2 * (pb - 47);
    const pao2Alveolar = pio2 - paco2 / rq;
    const aaGradient = pao2Alveolar - pao2;
    const expectedAaUpper = age / 4 + 4;
    const pfRatio = pao2 / fio2;

    // P0: Physiologically impossible values (PaO2 > PAO2 or PAO2 <= 0)
    const isPhysiologicallyImpossible = pao2Alveolar <= 0 || aaGradient < 0;

    // P1: (Age/4 + 4) only applies to room air (FiO2 21%).
    // At elevated FiO2, expected normal A-a widens physiologically (up to ~100-120 mmHg at FiO2 100%).
    const adjustedUpperForFio2 =
      fio2Pct <= 21
        ? expectedAaUpper
        : Math.max(expectedAaUpper + (fio2 - 0.21) * 120, Math.min(125, expectedAaUpper + (fio2 - 0.21) * 135));

    const isHealthyHighFio2 =
      !isPhysiologicallyImpossible &&
      fio2Pct >= 40 &&
      pfRatio >= 400 &&
      aaGradient <= Math.max(adjustedUpperForFio2, 125);

    const isAaElevated =
      !isPhysiologicallyImpossible && !isHealthyHighFio2 && aaGradient > adjustedUpperForFio2;
    const isHypercapnic = paco2 > 45;
    const isLowPio2 = pb < 680 || fio2Pct < 21;
    const isHypoxemic = !isPhysiologicallyImpossible && ((fio2Pct <= 21 && pao2 < 60) || pfRatio < 300);

    let diffCategory = 'Normal Gaz Değişimi';
    let diffDetail =
      fio2Pct > 21
        ? `Yüksek FiO₂ (%${fio2Pct}) altında hesaplanan A–a gradiyenti (${aaGradient.toFixed(1)} mmHg) ve P/F oranı (${pfRatio.toFixed(0)} mmHg) beklenen fizyolojik sınırlar içindedir.`
        : 'Alveol–arteriyel oksijen farkı (A–a) ve PaCO₂ yaşa/FiO₂’ye göre beklenen fizyolojik sınırlar içindedir.';
    let diffClass = 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/30';

    if (isPhysiologicallyImpossible) {
      diffCategory = 'Fizyolojik Olarak İmkânsız Değer — FiO₂ / ABG Ölçüm Hatası Kontrol Edilmeli';
      diffDetail =
        pao2Alveolar <= 0
          ? `Hesaplanan alveoler PAO₂ (${pao2Alveolar.toFixed(1)} mmHg ≤ 0) fizyolojik olarak mümkün değildir. Girilen FiO₂, barometrik basınç (PB) ve PaCO₂ değerlerini doğrulayın.`
          : `Arteriyel PaO₂ (${pao2} mmHg) hesaplanan alveoler PAO₂ (${pao2Alveolar.toFixed(1)} mmHg) değerinden yüksek olamaz (A–a = ${aaGradient.toFixed(1)} mmHg). Hastanın kayıtlı olandan daha yüksek FiO₂ alıyor olması, hava kabarcığı kontaminasyonu veya kan gazı analizörü ölçüm hatası kontrol edilmelidir.`;
      diffClass = 'text-rose-700 dark:text-rose-300 bg-rose-500/15 border-rose-500/40';
    } else if (!isAaElevated && isHypercapnic) {
      diffCategory = 'Normal A–a Gradiyenti + Hiperkapni → Saf Alveoler Hipoventilasyon (Tip 2)';
      diffDetail =
        'Akciğer parankimi sağlamdır! Hipoksemi tümüyle yüksek PaCO₂’nin alveolde O₂’nin yerini almasından (PAO₂ ↓) kaynaklanır. Nedenler: Opioid/sedatif depresyonu, rezidüel NMB, nöromusküler hastalık veya santral dürtü kaybı.';
      diffClass = 'text-violet-700 dark:text-violet-300 bg-violet-500/15 border-violet-500/30';
    } else if (!isAaElevated && isLowPio2) {
      diffCategory = 'Normal A–a Gradiyenti + Normal/↓ PaCO₂ → Düşük İnspire O₂ Basıncı (PiO₂ ↓)';
      diffDetail =
        'Alveolokapiller gaz değişimi tamamen normaldir; hipoksemi düşük barometrik basınç (yüksek irtifa) veya hipoksik gaz karışımı kaynaklıdır.';
      diffClass = 'text-sky-700 dark:text-sky-300 bg-sky-500/15 border-sky-500/30';
    } else if (isAaElevated && isHypercapnic) {
      diffCategory = 'Artmış A–a Gradiyenti + Hiperkapni → Mikst Patoloji (Parankim + Pompa Yetmezliği)';
      diffDetail =
        'Hem alveoler hipoventilasyon (PaCO₂ ↑) hem de intrapulmoner V/Q uyumsuzluğu/şant (A–a ↑) bir aradadır. Tipik örnekler: KOAH alevlenme + pnömoni, ağır astım yorgunluğu veya postop atelektazi + opioid.';
      diffClass = 'text-amber-700 dark:text-amber-300 bg-amber-500/15 border-amber-500/30';
    } else if (isAaElevated) {
      diffCategory = 'Artmış A–a Gradiyenti + Normal/↓ PaCO₂ → İntrapulmoner Gaz Değişimi Bozukluğu (Tip 1 / Tip 3)';
      diffDetail =
        'Sorun akciğer parankimi veya pulmoner dolaşımdadır: V/Q eşitsizliği (ek O₂’ye yanıtlı), sağdan-sola şant (ARDS/atelektazi — PEEP gerekir) veya difüzyon bozukluğu.';
      diffClass = 'text-rose-700 dark:text-rose-300 bg-rose-500/15 border-rose-500/30';
    } else if (isHypoxemic) {
      diffCategory = 'Sınırda A–a Değerleri / Hipoksemi — Klinik Bağlamla Değerlendirin';
      diffDetail =
        'Yüksek FiO₂ altında PaO₂ düşük ancak A–a farkı eşikte olabilir; ölçüm hatalarını ve PiO₂/PaCO₂ değerlerini doğrulayın.';
      diffClass = 'text-amber-700 dark:text-amber-300 bg-amber-500/15 border-amber-500/30';
    }

    // Visual cascade percentages relative to PiO2
    const safePio2 = Math.max(1, pio2);
    const pao2AlvPct = Math.max(0, Math.min(100, (pao2Alveolar / safePio2) * 100));
    const pao2ArtPct = Math.max(0, Math.min(pao2AlvPct, (pao2 / safePio2) * 100));
    const aaBarPct = Math.max(0, pao2AlvPct - pao2ArtPct);

    return {
      pb,
      fio2Pct,
      paco2,
      pao2,
      age,
      rq,
      pio2,
      pao2Alveolar,
      aaGradient,
      expectedAaUpper,
      adjustedUpperForFio2,
      pfRatio,
      isPhysiologicallyImpossible,
      isAaElevated,
      diffCategory,
      diffDetail,
      diffClass,
      pao2AlvPct,
      pao2ArtPct,
      aaBarPct
    };
  }, [pbInput, fio2Input, paco2Input, pao2Input, ageInput, rqInput]);

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}
    >
      {/* Header + Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
        <div className="flex items-start gap-2.5">
          <Calculator className="w-4 h-4 text-sky-500 shrink-0 mt-1" />
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ayırıcı Tanıda Alveoler Gaz Denklemi &amp; A–a Gradiyenti Simülatörü
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Hipokseminin akciğer dışı (Normal A–a: Hipoventilasyon / Düşük PiO₂) veya parankimal (Artmış A–a: V/Q / Şant / Difüzyon) kökenli olduğunu canlı simüle edin.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {DIFFERENTIAL_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p)}
              className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer transition-colors ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-sky-500/50 hover:text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* FiO2 */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <label htmlFor="sim-fio2">FiO₂ (%)</label>
            <span className="font-mono text-sky-500">{sim.fio2Pct}%</span>
          </div>
          <input
            id="sim-fio2"
            type="range"
            min="21"
            max="100"
            step="1"
            value={fio2Input}
            onChange={(e) => setFio2Input(e.target.value)}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>21% (Oda)</span>
            <span>40%</span>
            <span>100%</span>
          </div>
        </div>

        {/* PaCO2 */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <label htmlFor="sim-paco2">PaCO₂ (mmHg)</label>
            <span className="font-mono text-violet-500">{sim.paco2} mmHg</span>
          </div>
          <input
            id="sim-paco2"
            type="range"
            min="15"
            max="95"
            step="1"
            value={paco2Input}
            onChange={(e) => setPaco2Input(e.target.value)}
            className="w-full accent-violet-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>15</span>
            <span>35–45 (Normal)</span>
            <span>95</span>
          </div>
        </div>

        {/* PaO2 */}
        <div className={`p-3 rounded-xl border space-y-1.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <label htmlFor="sim-pao2">Arteriyel PaO₂ (mmHg)</label>
            <span className="font-mono text-emerald-500">{sim.pao2} mmHg</span>
          </div>
          <input
            id="sim-pao2"
            type="range"
            min="25"
            max="600"
            step="1"
            value={pao2Input}
            onChange={(e) => setPao2Input(e.target.value)}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>25</span>
            <span>60 (Eşik)</span>
            <span>600</span>
          </div>
        </div>

        {/* Age */}
        <div className={`p-3 rounded-xl border space-y-1 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <label htmlFor="sim-age" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Hasta Yaşı (yıl) — Oda Havası Üst Sınırı: {(sim.age / 4 + 4).toFixed(0)} mmHg
          </label>
          <input
            id="sim-age"
            type="number"
            min="1"
            max="110"
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
            className={`w-full px-3 py-1.5 text-sm font-mono tabular-nums font-bold rounded-lg border ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {/* Barometric Pressure */}
        <div className={`p-3 rounded-xl border space-y-1 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <label htmlFor="sim-pb">Barometrik Basınç PB</label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setPbInput('760')}
                className="text-[10px] font-mono underline text-sky-500 cursor-pointer"
              >
                760 (Deniz)
              </button>
              <button
                type="button"
                onClick={() => setPbInput('520')}
                className="text-[10px] font-mono underline text-amber-500 cursor-pointer"
              >
                520 (İrtifa)
              </button>
            </div>
          </div>
          <input
            id="sim-pb"
            type="number"
            min="400"
            max="800"
            value={pbInput}
            onChange={(e) => setPbInput(e.target.value)}
            className={`w-full px-3 py-1.5 text-sm font-mono tabular-nums font-bold rounded-lg border ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {/* RQ */}
        <div className={`p-3 rounded-xl border space-y-1 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <label htmlFor="sim-rq" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Solunum Katsayısı (RQ)
          </label>
          <input
            id="sim-rq"
            type="number"
            min="0.65"
            max="1.05"
            step="0.05"
            value={rqInput}
            onChange={(e) => setRqInput(e.target.value)}
            className={`w-full px-3 py-1.5 text-sm font-mono tabular-nums font-bold rounded-lg border ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>
      </div>

      {/* Live Equation Cascade + Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">1. İnspire PiO₂</div>
          <div className="text-lg font-mono tabular-nums font-black text-sky-600 dark:text-sky-400 mt-0.5">
            {sim.pio2.toFixed(1)} mmHg
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">
            {(sim.fio2Pct / 100).toFixed(2)} × ({sim.pb} − 47)
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">2. Alveoler PAO₂</div>
          <div
            className={`text-lg font-mono tabular-nums font-black mt-0.5 ${
              sim.pao2Alveolar <= 0 ? 'text-rose-600 dark:text-rose-400' : 'text-indigo-600 dark:text-indigo-400'
            }`}
          >
            {sim.pao2Alveolar.toFixed(1)} mmHg
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">
            {sim.pio2.toFixed(0)} − ({sim.paco2} / {sim.rq})
          </div>
        </div>

        <div
          className={`p-3.5 rounded-xl border ${
            sim.isPhysiologicallyImpossible
              ? 'bg-rose-500/10 border-rose-500/40'
              : isDark
                ? 'bg-slate-950/70 border-slate-800'
                : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">3. A–a Gradiyenti</div>
          <div
            className={`text-lg font-mono tabular-nums font-black mt-0.5 ${
              sim.isPhysiologicallyImpossible || sim.isAaElevated
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {sim.aaGradient.toFixed(1)} mmHg
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">
            {sim.isPhysiologicallyImpossible
              ? 'İmkânsız değer (Ölçüm/FiO₂ hatası!)'
              : sim.fio2Pct <= 21
                ? `Oda sınırı ≤ ${sim.expectedAaUpper.toFixed(0)} mmHg`
                : `Yüksek FiO₂ beklenen ≤ ${sim.adjustedUpperForFio2.toFixed(0)} mmHg`}
          </div>
        </div>

        <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">4. PaO₂ / FiO₂ (P/F)</div>
          <div
            className={`text-lg font-mono tabular-nums font-black mt-0.5 ${
              sim.isPhysiologicallyImpossible
                ? 'text-rose-600 dark:text-rose-400'
                : sim.pfRatio >= 400
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            {sim.pfRatio.toFixed(0)} mmHg
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-1">
            {sim.pao2} / {(sim.fio2Pct / 100).toFixed(2)} {sim.pfRatio >= 400 && !sim.isPhysiologicallyImpossible ? '(Normal ≥400)' : ''}
          </div>
        </div>
      </div>

      {/* Visual Oxygen Cascade Bar */}
      <div className={`p-3.5 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold">
          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
            Oksijen Kaskadı (PiO₂ → PAO₂ → PaO₂): A–a Farkı Görselleştirmesi
          </span>
          <span className="font-mono text-slate-400">
            Toplam PiO₂ = {sim.pio2.toFixed(0)} mmHg (%100)
          </span>
        </div>
        {sim.isPhysiologicallyImpossible ? (
          <div className="w-full h-6 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center gap-2 text-[11px] font-bold text-rose-600 dark:text-rose-300 px-2">
            <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
            <span>Fizyolojik Olarak İmkânsız Değer — PaO₂ &gt; PAO₂ veya PAO₂ ≤ 0 (FiO₂ / ABG Kontrol Edilmeli)</span>
          </div>
        ) : (
          <div className="w-full h-5 rounded-lg overflow-hidden flex bg-slate-200 dark:bg-slate-800">
            <div
              style={{ width: `${sim.pao2ArtPct}%` }}
              className="bg-emerald-500 transition-all duration-300 flex items-center justify-center text-[10px] font-mono font-bold text-white truncate px-1"
              title={`Arteriyel PaO₂: ${sim.pao2} mmHg`}
            >
              PaO₂ {sim.pao2}
            </div>
            <div
              style={{ width: `${sim.aaBarPct}%` }}
              className={`${sim.isAaElevated ? 'bg-rose-500' : 'bg-sky-400'} transition-all duration-300 flex items-center justify-center text-[10px] font-mono font-bold text-white truncate px-1`}
              title={`A–a Gradiyenti: ${sim.aaGradient.toFixed(1)} mmHg`}
            >
              A–a {sim.aaGradient.toFixed(0)}
            </div>
            <div
              style={{ width: `${Math.max(0, 100 - sim.pao2AlvPct)}%` }}
              className="bg-violet-500/75 transition-all duration-300 flex items-center justify-center text-[10px] font-mono font-bold text-white truncate px-1"
              title={`PaCO₂ / RQ düşüşü: ${(sim.paco2 / sim.rq).toFixed(1)} mmHg`}
            >
              CO₂/RQ
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" /> Yeşil: Arteriyel PaO₂
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-xs ${sim.isAaElevated ? 'bg-rose-500' : 'bg-sky-400'}`} /> Mavi/Kırmızı: A–a Gradiyenti
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-violet-500/75" /> Mor: Alveolde CO₂’nin kapladığı basınç (PaCO₂/RQ)
          </span>
        </div>
      </div>

      {/* Differential Diagnosis Interpretation */}
      <div className={`p-4 rounded-xl border space-y-1.5 ${sim.diffClass}`}>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold">
          {sim.isPhysiologicallyImpossible && <AlertOctagon className="w-4 h-4 shrink-0" />}
          <span>{sim.diffCategory}</span>
        </div>
        <p className="text-xs leading-relaxed opacity-95">{sim.diffDetail}</p>
        {sim.fio2Pct > 21 && !sim.isPhysiologicallyImpossible && (
          <p className="text-[11px] opacity-85 pt-0.5">
            Not: Klasik yaş formülü <code>(Yaş/4) + 4</code> yalnızca oda havası (<code>FiO₂ %21</code>) içindir; yüksek <code>FiO₂</code> altında normal A–a üst sınırı fizyolojik olarak genişler (%100 O₂’de ~100–120 mmHg’ye kadar çıkabilir) ve <code>P/F</code> oranı ile birlikte yorumlanmalıdır.
          </p>
        )}
      </div>
    </div>
  );
};

const DiseaseProgressionSection: React.FC<{
  isDark: boolean;
  onSelectTypeAndNavigate: (id: RespFailureTypeId) => void;
}> = ({ isDark, onSelectTypeAndNavigate }) => {
  const [category, setCategory] = useState<ProgressionCategoryId>('all');

  const filteredItems = useMemo(
    () =>
      category === 'all'
        ? DISEASE_PROGRESSIONS
        : DISEASE_PROGRESSIONS.filter((item) => item.category === category),
    [category]
  );

  const typePillClass = (id: RespFailureTypeId) => {
    switch (id) {
      case 'type1':
        return 'text-sky-700 dark:text-sky-300 bg-sky-500/10 border-sky-500/30 hover:bg-sky-500/20';
      case 'type2':
        return 'text-violet-700 dark:text-violet-300 bg-violet-500/10 border-violet-500/30 hover:bg-violet-500/20';
      case 'type3':
        return 'text-amber-700 dark:text-amber-300 bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20';
      case 'type4':
        return 'text-rose-700 dark:text-rose-300 bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20';
    }
  };

  const filterButtons: { id: ProgressionCategoryId; label: string }[] = [
    { id: 'all', label: 'Tümü (8)' },
    { id: 'airway-parenchyma', label: 'Havayolu & Parankim (4)' },
    { id: 'periop-shock', label: 'Perioperatif, Emboli & Şok (4)' }
  ];

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
        <div className="flex items-start gap-2.5">
          <TrendingUp className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Hastalıkların Erken ve Geç Evre Solunum Yetmezliği Geçişleri
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Bir evreye tıklayarak Tip 1–4 Klinik Rehber sekmesindeki ilgili profilin ayrıntılarını doğrudan açabilirsiniz.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {filterButtons.map((btn) => {
            const active = category === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setCategory(btn.id)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                  active
                    ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                    : isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredItems.map((item) => (
          <div
            key={item.disease}
            className={`p-4 rounded-xl border space-y-3 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className={`text-xs sm:text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {item.disease}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-stretch">
              <button
                type="button"
                onClick={() => onSelectTypeAndNavigate(item.earlyType)}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer flex flex-col justify-between gap-1.5 ${typePillClass(item.earlyType)}`}
              >
                <div>
                  <div className="text-[11px] font-extrabold">{item.earlyLabel}</div>
                  <p className="text-[11px] mt-1 leading-snug opacity-90">{item.earlyDetail}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Tip rehberini aç →
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSelectTypeAndNavigate(item.lateType)}
                className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer flex flex-col justify-between gap-1.5 ${typePillClass(item.lateType)}`}
              >
                <div>
                  <div className="text-[11px] font-extrabold">{item.lateLabel}</div>
                  <p className="text-[11px] mt-1 leading-snug opacity-90">{item.lateDetail}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Tip rehberini aç →
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <ArrowRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>
                <strong>Geçiş Tetikleyicisi:</strong> {item.trigger}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RespiratoryFailureInfographic: React.FC<RespiratoryFailureInfographicProps> = ({ isDark }) => {
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTabId>('clinical');
  const [activeTypeId, setActiveTypeId] = useState<RespFailureTypeId>('type1');
  const [alveolarState, setAlveolarState] = useState<AlveolarStateId>('vq-mismatch');
  const topAnchorRef = useRef<HTMLDivElement>(null);

  const activeProfile =
    RESPIRATORY_FAILURE_TYPES.find((t) => t.id === activeTypeId) || RESPIRATORY_FAILURE_TYPES[0];

  const defaultDiagramForType = (id: RespFailureTypeId): AlveolarStateId => {
    switch (id) {
      case 'type1':
        return 'vq-mismatch';
      case 'type2':
        return 'normal';
      case 'type3':
        return 'shunt';
      case 'type4':
        return 'dead-space';
    }
  };

  const handleSelectType = (id: RespFailureTypeId) => {
    setActiveTypeId(id);
    setAlveolarState(defaultDiagramForType(id));
  };

  const handleJumpToClinicalType = (id: RespFailureTypeId) => {
    handleSelectType(id);
    setWorkspaceTab('clinical');
    topAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOpenPhysiologyForActiveType = () => {
    setAlveolarState(defaultDiagramForType(activeTypeId));
    setWorkspaceTab('physiology');
    topAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const workspaceTabs: {
    id: WorkspaceTabId;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'clinical',
      title: '1. Tip 1–4 Klinik Rehber',
      subtitle: 'Tanı, muayene, ilk müdahale & matriks',
      icon: <Stethoscope className="w-4 h-4 shrink-0" />
    },
    {
      id: 'physiology',
      title: '2. Fizyoloji & A–a Simülatörü',
      subtitle: 'Şant diyagramı & alveoler gaz denklemi',
      icon: <Calculator className="w-4 h-4 shrink-0" />
    },
    {
      id: 'progression',
      title: '3. Erken → Geç Hastalık Seyri',
      subtitle: '8 klinik senaryoda evre geçişleri',
      icon: <TrendingUp className="w-4 h-4 shrink-0" />
    }
  ];

  return (
    <div ref={topAnchorRef} className="space-y-5 scroll-mt-4">
      {/* Compact Header + 3 Workspace Tabs */}
      <div
        className={`p-5 rounded-2xl border space-y-4 ${
          isDark
            ? 'bg-gradient-to-r from-sky-950/30 via-slate-900 to-slate-900 border-sky-500/30'
            : 'bg-gradient-to-r from-sky-50 via-white to-slate-50 border-sky-200 shadow-xs'
        }`}
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Akut &amp; Perioperatif Solunum Fizyolojisi</span>
            <span aria-hidden="true">·</span>
            <span>Roussos / Miller&apos;s Anesthesia / ERS-ATS</span>
          </div>
          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Solunum Yetmezliği Sınıflaması (Tip 1 – Tip 4)
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Klinik tipler, fizyopatolojik şant / A–a gradiyenti simülatörü ve erken–geç hastalık geçişleri tek çalışma alanında üç odaklı sekmede düzenlenmiştir.
          </p>
        </div>

        {/* 3 Primary Workspace Tabs */}
        <div
          role="tablist"
          aria-label="Solunum yetmezliği çalışma alanları"
          className={`grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 rounded-xl border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {workspaceTabs.map((tab) => {
            const active = workspaceTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setWorkspaceTab(tab.id)}
                className={`p-3 rounded-lg text-left transition-all cursor-pointer flex items-center gap-3 ${
                  active
                    ? 'bg-sky-600 text-white shadow-xs'
                    : isDark
                      ? 'text-slate-300 hover:bg-slate-800/70'
                      : 'text-slate-700 hover:bg-white'
                }`}
              >
                <span className={active ? 'text-white' : 'text-sky-500'}>{tab.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-extrabold truncate">{tab.title}</div>
                  <div className={`text-[11px] truncate ${active ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                    {tab.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: Clinical Classification (Type 1-4 Selector + Immediate Deep-Dive + Red Flag + Matrix) */}
      {workspaceTab === 'clinical' && (
        <div className="space-y-5">
          {/* Quick 4-Type Selector Tabs directly attached above Active Type Card */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {RESPIRATORY_FAILURE_TYPES.map((item) => {
              const active = item.id === activeTypeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectType(item.id)}
                  className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    active
                      ? item.accent.tabActive
                      : isDark
                        ? 'text-slate-300 hover:bg-slate-800/70'
                        : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-extrabold">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${active ? 'bg-white' : item.accent.dot}`}
                      aria-hidden="true"
                    />
                    <span>{item.shortLabel}</span>
                  </div>
                  <div className={`text-[10px] mt-0.5 truncate ${active ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                    {item.id === 'type1'
                      ? 'Hipoksemik'
                      : item.id === 'type2'
                        ? 'Hiperkapnik'
                        : item.id === 'type3'
                          ? 'Perioperatif'
                          : 'Şok / Hipoperfüzyon'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Type Deep-Dive Section */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${
              isDark ? `bg-slate-900 ${activeProfile.accent.border}` : `bg-white ${activeProfile.accent.border} shadow-xs`
            }`}
          >
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800">
              <div className="space-y-1">
                <div className={`text-xs font-bold uppercase tracking-wider ${activeProfile.accent.text}`}>
                  {activeProfile.primaryDefect}
                </div>
                <h4 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeProfile.title}
                </h4>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{activeProfile.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                <div className="text-xs font-mono tabular-nums font-bold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
                  {activeProfile.badgeText}
                </div>
                <button
                  type="button"
                  onClick={handleOpenPhysiologyForActiveType}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                    isDark
                      ? 'bg-slate-950 border-slate-700 text-sky-400 hover:border-sky-500/60'
                      : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Şant &amp; A–a’da İncele</span>
                </button>
              </div>
            </div>

            {/* Definition & Mechanism */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              <div className={`p-4 rounded-xl border ${activeProfile.accent.bgSoft} ${activeProfile.accent.border}`}>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Tanım
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {activeProfile.definition}
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Fizyopatolojik Mekanizma
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {activeProfile.mechanismSummary}
                </p>
              </div>
            </div>

            {/* Diagnostic Criteria */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Gauge className="w-4 h-4 text-sky-500" />
                <span>Tanı &amp; Kan Gazı Kriterleri</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {activeProfile.diagnosticCriteria.map((c, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border ${
                      isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{c.label}</div>
                    <div className={`text-lg font-mono tabular-nums font-black mt-1 ${activeProfile.accent.text}`}>
                      {c.value}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical History & Clinical Examples */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <ClipboardList className="w-4 h-4 text-indigo-500" />
                  <span>Kritik Anamnez Bilgileri</span>
                </div>
                <ul
                  className={`p-4 rounded-xl border space-y-2 text-xs ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50/70 border-slate-200 text-slate-700'
                  }`}
                >
                  {activeProfile.criticalHistory.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${activeProfile.accent.dot}`} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <Layers className="w-4 h-4 text-cyan-500" />
                  <span>Klinik Örnekler</span>
                </div>
                <ul
                  className={`p-4 rounded-xl border space-y-2 text-xs ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50/70 border-slate-200 text-slate-700'
                  }`}
                >
                  {activeProfile.clinicalExamples.map((ex, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${activeProfile.accent.dot}`} aria-hidden="true" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Physical Exam & First Intervention */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <Stethoscope className="w-4 h-4 text-emerald-500" />
                  <span>Kritik Fizik Muayene Bulguları</span>
                </div>
                <div className="space-y-2">
                  {activeProfile.physicalExam.map((pe, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                      }`}
                    >
                      <div className={`text-xs font-bold ${activeProfile.accent.text}`}>{pe.group}</div>
                      <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {pe.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <HeartPulse className="w-4 h-4 text-rose-500" />
                  <span>Kısa İlk Müdahale</span>
                </div>
                <ul
                  className={`p-4 rounded-xl border space-y-2.5 text-xs ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50/70 border-slate-200 text-slate-700'
                  }`}
                >
                  {activeProfile.firstIntervention.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Clinical Pearl */}
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Klinik İpucu:</strong> {activeProfile.clinicalPearl}
              </span>
            </div>

            {/* Type 1 Extended Protocol Strip: Global New ARDS 2024, ROX Index & Lung-Protective Targets */}
            {activeProfile.id === 'type1' && (
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  isDark ? 'bg-sky-950/20 border-sky-500/30' : 'bg-sky-50/70 border-sky-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                    Güncel ARDS Tanımı (Berlin &amp; Global 2024) · HFNO ROX İndeksi · Akciğer Koruyucu Hedefler
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                    Matthay et al., AJRCCM 2024
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-sky-100'}`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      Global Yeni ARDS Tanımı (2024)
                    </div>
                    <p className={`mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Berlin kriterlerindeki <strong>PEEP ≥ 5 cmH₂O</strong> şartına ek olarak, entübe olmayan hastalarda <strong>HFNO ≥ 30 L/dk</strong>, arter kan gazı yokluğunda <strong>SpO₂/FiO₂ ≤ 315</strong> (SpO₂ ≤ %97 iken) ve görüntülemede <strong>Akciğer USG (LUS)</strong> kabul edilmiştir.
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-sky-100'}`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      HFNO Takibinde ROX İndeksi
                    </div>
                    <p className={`mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <code>ROX = (SpO₂ / FiO₂) / Solunum Hızı</code>. 2, 6 ve 12. saatlerde <strong>ROX ≥ 4.88</strong> düşük entübasyon riski gösterir; <strong>&lt; 2.85 (2. sa) / &lt; 3.47 (6. sa) / &lt; 3.85 (12. sa)</strong> HFNO başarısızlığı lehinedir.
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-sky-100'}`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Akciğer Koruyucu Ventilasyon
                    </div>
                    <p className={`mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <strong>V<sub>T</sub>: 4–8 mL/kg PBW</strong> (tahmini ideal ağırlık), <strong>P<sub>plat</sub> ≤ 30 cmH₂O</strong>, <strong>Sürüş Basıncı (ΔP = P<sub>plat</sub> − PEEP) &lt; 15 cmH₂O</strong> ve uygun PEEP / prone pozisyon.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Universal Clinical Red Flag Callout */}
          <div
            className={`p-5 rounded-2xl border space-y-2 ${
              isDark ? 'bg-rose-950/25 border-rose-500/40 text-rose-100' : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-black text-rose-600 dark:text-rose-400">
              <AlertOctagon className="w-5 h-5 shrink-0" />
              <span>Klinik Kırmızı Bayrak (Yaklaşan Kardiyopulmoner Arrest)</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              Herhangi bir solunum yetmezliği tipinde hastanın takipnesi ve aksesuar kas kullanımının aniden azalıp yerini <strong>bradipneye, yüzeyel solunuma veya gasping&apos;e (iç çekme)</strong> bırakması klinik düzelme değil; <strong>solunum kası tükenmesi (fatigue)</strong> göstergesidir. Buna oskültasyonda <strong>&quot;sessiz akciğer&quot; (silent chest)</strong> ve bradikardi eşlik ediyorsa <strong>acil endotrakeal entübasyon</strong> gereklidir.
            </p>
          </div>

          {/* 4-Type Side-by-Side Comparison Matrix */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200/70 dark:border-slate-800">
              <ShieldAlert className="w-4 h-4 text-sky-500" />
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tip 1 – Tip 4 Solunum Yetmezliği Hızlı Karşılaştırma Matriksi
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                    <th className="py-2.5 pr-3 font-bold">Sınıf</th>
                    <th className="py-2.5 pr-3 font-bold">Primer Defekt</th>
                    <th className="py-2.5 pr-3 font-bold">PaO₂</th>
                    <th className="py-2.5 pr-3 font-bold">PaCO₂</th>
                    <th className="py-2.5 pr-3 font-bold">Tipik Muayene</th>
                    <th className="py-2.5 pr-3 font-bold">Öncelikli İlk Müdahale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/70">
                  {[
                    {
                      id: 'type1' as RespFailureTypeId,
                      label: 'Tip 1 · Hipoksemik',
                      defect: 'V/Q eşitsizliği, Şant, Difüzyon, Düşük PiO₂',
                      pao2: '< 60 mmHg',
                      paco2: 'Normal / ↓',
                      exam: 'Santral siyanoz, ajitasyon, raller',
                      tx: 'SpO₂ >%92–94 (HFNO ≥30 L/dk, ROX ≥4.88); ARDS: 4–8 mL/kg PBW, ΔP <15'
                    },
                    {
                      id: 'type2' as RespFailureTypeId,
                      label: 'Tip 2 · Hiperkapnik',
                      defect: 'Pompa yetmezliği / Hipoventilasyon',
                      pao2: 'Genelde < 60',
                      paco2: '> 45–50 mmHg',
                      exam: 'Asteriksis, sıcak/terli cilt, bradipne/paradoksal',
                      tx: 'KOAH %88–92 O₂ (HPV korunumu), BiPAP, Nalokson'
                    },
                    {
                      id: 'type3' as RespFailureTypeId,
                      label: 'Tip 3 · Perioperatif',
                      defect: 'FRC < CC, Mikroatelektaziler',
                      pao2: '< 60 mmHg',
                      paco2: 'Normal / ↑',
                      exam: 'Splinting, bazallerde ses ↓, head-lift ↓',
                      tx: 'Multimodal/epidural analjezi, Sugammadeks, Triflo/CPAP'
                    },
                    {
                      id: 'type4' as RespFailureTypeId,
                      label: 'Tip 4 · Şok İlişkili',
                      defect: 'Solunum kası hipoperfüzyonu / DO₂ ↓',
                      pao2: 'Değişken',
                      paco2: 'Kussmaul ↓ → Apne ↑',
                      exam: 'Hipotansiyon, kapiller dolum >3 sn, mottling',
                      tx: 'Hemodinamik resüsitasyon + Erken entübasyon'
                    }
                  ].map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => handleJumpToClinicalType(row.id)}
                      className={`cursor-pointer transition-colors ${
                        activeTypeId === row.id
                          ? isDark
                            ? 'bg-sky-500/10'
                            : 'bg-sky-50/80'
                          : isDark
                            ? 'hover:bg-slate-800/40'
                            : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2.5 pr-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">{row.label}</td>
                      <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-300">{row.defect}</td>
                      <td className="py-2.5 pr-3 font-mono tabular-nums text-slate-700 dark:text-slate-200 whitespace-nowrap">{row.pao2}</td>
                      <td className="py-2.5 pr-3 font-mono tabular-nums text-slate-700 dark:text-slate-200 whitespace-nowrap">{row.paco2}</td>
                      <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-300">{row.exam}</td>
                      <td className="py-2.5 pr-3 text-slate-700 dark:text-slate-200">{row.tx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <Info className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
              <span>Tablodaki herhangi bir satıra tıklayarak yukarıdaki ayrıntılı inceleme görünümünü doğrudan açabilirsiniz.</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Physiology & Differential Diagnosis Lab (Synced Shunt Diagram + Alveolar Gas Equation Simulator) */}
      {workspaceTab === 'physiology' && (
        <div className="space-y-5">
          <AlveolarShuntDiagram
            isDark={isDark}
            selectedState={alveolarState}
            onSelectState={setAlveolarState}
          />
          <AlveolarGasAndAaSimulator
            isDark={isDark}
            onSyncDiagramState={setAlveolarState}
          />
        </div>
      )}

      {/* TAB 3: Early vs Late Disease Progression */}
      {workspaceTab === 'progression' && (
        <DiseaseProgressionSection
          isDark={isDark}
          onSelectTypeAndNavigate={handleJumpToClinicalType}
        />
      )}

      {/* References */}
      <div
        className={`p-4 rounded-xl border text-xs space-y-1.5 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <BookOpen className="w-4 h-4 text-sky-500" />
          <span>Kaynaklar (Textbook &amp; Solunum Yetmezliği Kılavuzları)</span>
        </div>
        <p>1. Matthay MA, Arabi Y, Arroliga AC, et al. <em>A New Global Definition of Acute Respiratory Distress Syndrome.</em> Am J Respir Crit Care Med. 2024;209(1):37–47. (HFNO ≥30 L/dk, SpO₂/FiO₂ ≤315, LUS).</p>
        <p>2. Roca O, Caralt B, Messika J, et al. <em>An Index Combining Respiratory Rate and Oxygenation to Predict Outcome of Nasal High-Flow Therapy (ROX Index).</em> Am J Respir Crit Care Med. 2019;199(11):1368–1376.</p>
        <p>3. ARDS Definition Task Force (Berlin 2012, JAMA) &amp; Fan E, et al. <em>ATS/ESICM/SCCM Clinical Practice Guideline: Mechanical Ventilation in Adult Patients with ARDS</em> (VT 4–8 mL/kg PBW, Pplat ≤30, ΔP &lt;15 cmH₂O).</p>
        <p>4. Roussos C, Koutsoukou A. <em>Respiratory failure.</em> Eur Respir J Suppl. 2003;47:3s–14s. PMID: 14621112.</p>
        <p>5. Hedenstierna G, Edmark L. <em>Mechanisms of atelectasis in the perioperative period.</em> Best Pract Res Clin Anaesthesiol. 2010;24(2):157–169. PMID: 20608554.</p>
        <p>6. Abdo WF, Heunks LM. <em>Oxygen-induced hypercapnia in COPD: myths and facts</em> (Crit Care. 2012) &amp; Rochwerg B, et al. <em>ERS/ATS NIV Guidelines</em> (Eur Respir J. 2017).</p>
        <p>7. Aubier M, Trippenbach T, Roussos C. <em>Respiratory muscle fatigue during cardiogenic shock.</em> J Appl Physiol. 1981;51(2):499–508. &amp; Gropper MA, et al. <em>Miller&apos;s Anesthesia</em> (10th Ed.).</p>
      </div>
    </div>
  );
};

export default RespiratoryFailureInfographic;
