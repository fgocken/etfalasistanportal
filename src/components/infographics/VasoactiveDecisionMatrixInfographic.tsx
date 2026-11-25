import React, { useState, useMemo } from 'react';
import {
  Activity,
  Zap,
  Sliders,
  Layers,
  HeartPulse,
  Flame,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  GitBranch,
  Search,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface VasoactiveDecisionMatrixInfographicProps {
  isDark: boolean;
}

// 1. Dynamic Dose-Dependent Drug Model
interface DoseTier {
  range: string;
  label: string;
  primaryReceptor: string;
  secondaryReceptors: string;
  co: number; // -2 to +3
  svr: number; // -3 to +3
  hr: number; // -1 to +3
  pvr: number; // -2 to +2
  mvo2: number; // 0 to 3
  arrhythmiaRisk: 'Çok Düşük' | 'Düşük' | 'Orta' | 'Yüksek' | 'Çok Yüksek';
  pearl: string;
}

interface AdvancedDrug {
  id: string;
  name: string;
  subTitle: string;
  classType: 'Vazopresör' | 'İnotrop' | 'İnodilatör' | 'Mikst / Özel';
  mechanism: string;
  defaultTierIndex: number;
  tiers: DoseTier[];
  preparationTR: {
    form: string;
    dilution: string;
    concentration: string;
    quickRate70kg: string;
  };
  mvo2RiskText: string;
  cautionNotes: string[];
}

const ADVANCED_DRUGS: AdvancedDrug[] = [
  {
    id: 'noradrenalin',
    name: 'Noradrenalin (Norepinefrin)',
    subTitle: 'Vazodilatör Şokun 1. Sıra Altın Standardı',
    classType: 'Vazopresör',
    mechanism: 'Güçlü α1 vazokonstriksiyon + orta düzey β1 inotropi. Refleks bradikardi β1 etkisini dengeler, nabız genellikle stabil kalır.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '0.02 – 0.1 mcg/kg/dk',
        label: 'Düşük - Orta Doz',
        primaryReceptor: 'α1 +++ / β1 ++',
        secondaryReceptors: 'β2 zayıf',
        co: 1, // venöz dönüş artışı ile CO artabilir
        svr: 2,
        hr: 0,
        pvr: 1,
        mvo2: 1,
        arrhythmiaRisk: 'Düşük',
        pearl: 'Splanşnik ve venöz yatakta "unstressed" kanı kalbe iterek önyükü (venöz dönüşü) artırır; kalp debisini düşürmez, hafif artırabilir.'
      },
      {
        range: '0.1 – 0.5 mcg/kg/dk',
        label: 'Yüksek Doz',
        primaryReceptor: 'α1 ++++',
        secondaryReceptors: 'β1 ++',
        co: 0,
        svr: 3,
        hr: 0,
        pvr: 2,
        mvo2: 2,
        arrhythmiaRisk: 'Orta',
        pearl: 'Aşırı afterload artışı sol ventrikülü yormaya başlayabilir. Noradrenalin 0.25–0.5 mcg/kg/dk eşiğine ulaştığında MAP ≥ 65 mmHg sağlanamıyorsa 2. ajan olarak sabit maks. 0.03 IU/dk Vazopressin eklenmelidir (SSC 2021).'
      },
      {
        range: '> 0.5 mcg/kg/dk',
        label: 'Refrakter Vazopleji Dozu',
        primaryReceptor: 'α1 +++++ (Doygunluk)',
        secondaryReceptors: 'β1 doygunluğu / desensitizasyon',
        co: -1,
        svr: 3,
        hr: 1,
        pvr: 2,
        mvo2: 3,
        arrhythmiaRisk: 'Yüksek',
        pearl: 'Katekolamin reseptör duyarsızlaşması başlar. Periferik nekroz riski artar. Vazopressin (maks. 0.03 IU/dk), Hidrokortizon (200 mg/gün), 3. basamak Epinefrin (SSC 2021) veya dirençli vazoplejide Metilen Mavisi değerlendirilmelidir.'
      }
    ],
    preparationTR: {
      form: '4 mg / 4 mL ampul',
      dilution: '4 mg ampul + 46 mL %5 Dekstroz/SF (Toplam 50 mL)',
      concentration: '80 mcg/mL (veya SVK için 160 mcg/mL: 8 mg/50 mL)',
      quickRate70kg: '0.05 mcg/kg/dk = 2.6 mL/saat (80 mcg/mL konsantrasyon ile)'
    },
    mvo2RiskText: 'Koroner perfüzyon basıncını (diastolik MAP) artırdığı için MVO2 artışı dengelenir; taşikardi yapmadığı sürece iskemik kalpte güvenlidir.',
    cautionNotes: [
      'SSC 2021: Santral venöz kateter (SVK) beklenerek hipotansiyon uzatılmamalıdır; kısa süreli olarak proksimal ve geniş çaplı (≥18–20G, antekubital üstü) periferik damar yolundan yakın takip ile başlanabilir.',
      'Gereksiz aşırı dozda splanknik ve renal vazokonstriksiyon ile mezenterik/periferik iskemi yapabilir.',
      'Periferik damar yolu ekstravazasyonunda doku nekrozu riski! Lokal antidot: Fentolamin (5–10 mg, 10–15 mL SF içinde subkutan infiltrasyon).'
    ]
  },
  {
    id: 'adrenalin',
    name: 'Adrenalin (Epinefrin)',
    subTitle: 'Kardiyak Arrest, Anafilaksi & 3. Basamak Refrakter Septik Şok',
    classType: 'Mikst / Özel',
    mechanism: 'Non-selektif potent adrenerjik agonist (α1, β1, β2). Doza göre reseptör kayması en belirgin olan ajandır.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '0.01 – 0.05 mcg/kg/dk',
        label: 'Düşük Doz (β-Baskın)',
        primaryReceptor: 'β1 ++++ / β2 +++',
        secondaryReceptors: 'α1 zayıf',
        co: 3,
        svr: -1, // β2 vazodilatasyonu ile SVR düşebilir!
        hr: 2,
        pvr: -1,
        mvo2: 2,
        arrhythmiaRisk: 'Orta',
        pearl: 'İskelet kası β2 vazodilatasyonu nedeniyle diyastolik kan basıncı düşebilir, nabız basıncı genişler, güçlü pozitif inotrop ve taşikardi yapar.'
      },
      {
        range: '0.05 – 0.2 mcg/kg/dk',
        label: 'Orta Doz (Dengeli α + β)',
        primaryReceptor: 'α1 +++ / β1 ++++',
        secondaryReceptors: 'β2 ++',
        co: 3,
        svr: 2,
        hr: 2,
        pvr: 1,
        mvo2: 3,
        arrhythmiaRisk: 'Yüksek',
        pearl: 'Hem inotropik debi hem de arteriyel vazokonstriksiyon birleşir. Kas glikolizini tetikleyerek Tip B Laktik Asidoz ve hiperglisemi yapar.'
      },
      {
        range: '> 0.2 mcg/kg/dk',
        label: 'Yüksek Doz (α1-Baskın Vazokonstriksiyon)',
        primaryReceptor: 'α1 +++++',
        secondaryReceptors: 'β1 ++++',
        co: 1,
        svr: 3,
        hr: 3,
        pvr: 2,
        mvo2: 3,
        arrhythmiaRisk: 'Çok Yüksek',
        pearl: 'Şiddetli vazokonstriksiyon, taşiaritmi, miyokardiyal iskemi. Laktat yükselmesi doku hipoksisinden değil β2 glikoliz uyarısından kaynaklanabilir.'
      }
    ],
    preparationTR: {
      form: '1 mg / 1 mL ampul (1:1000)',
      dilution: '4 mg (4 ampul) + 46 mL %5 Dekstroz/SF (50 mL)',
      concentration: '80 mcg/mL (veya 1 mg + 49 mL = 20 mcg/mL)',
      quickRate70kg: '0.05 mcg/kg/dk = 2.6 mL/saat (80 mcg/mL ile)'
    },
    mvo2RiskText: 'Miyokardiyal O2 tüketimini (MVO2) en agresif artıran ajandır. Koroner arter hastalığında anjina, laktik asidoz ve taşiaritmiyi tetikleyebilir.',
    cautionNotes: [
      'OptimaCC (Levy, JACC 2018): Akut MI ilişkili kardiyojenik şokta Noradrenalin’e kıyasla 3 kat daha yüksek refrakter şok oranı (%37 vs %7, P=0.008) nedeniyle çalışma erken sonlandırılmıştır; kardiyojenik şokta ilk tercih olarak KULLANILMAMALIDIR.',
      'SSC 2021: Noradrenalin + Vazopressin’e rağmen hedef MAP sağlanamayan refrakter septik şokta 3. basamak vazopresör olarak eklenmesi önerilir.',
      'β2 glikoliz uyarısıyla geçici Tip B laktat artışı ve hipokalemi/hiperglisemi yapar; laktat yükselmesini tek başına doku hipoksisi sanmayın (kapiller dolum zamanı — ANDROMEDA-SHOCK — ile birlikte yorumlayın).'
    ]
  },
  {
    id: 'dopamin',
    name: 'Dopamin',
    subTitle: 'Üç Kademeli Klasik Reseptör Kayması (D1 → β1 → α1)',
    classType: 'Mikst / Özel',
    mechanism: 'Endojen katekolamin öncülü; doza bağımlı olarak dopaminerjik (D1/D2), beta-1 ve alfa-1 reseptörlerini ardışık olarak aktive eder.',
    defaultTierIndex: 1,
    tiers: [
      {
        range: '0.5 – 3 mcg/kg/dk',
        label: 'Düşük ("Renal") Doz',
        primaryReceptor: 'D1 ++++ / D2 +++',
        secondaryReceptors: 'α1 ve β1 minimal',
        co: 0,
        svr: -1,
        hr: 0,
        pvr: 0,
        mvo2: 0,
        arrhythmiaRisk: 'Düşük',
        pearl: 'Renal ve mezenterik vazodilatasyon yapar. DİKKAT: Büyük klinik çalışmalarda mortaliteyi veya akut böbrek hasarını önlemediği kanıtlanmıştır.'
      },
      {
        range: '3 – 10 mcg/kg/dk',
        label: 'Orta (İnotropik) Doz',
        primaryReceptor: 'β1 +++ / Endojen NA salınımı',
        secondaryReceptors: 'D1 ++, α1 +',
        co: 2,
        svr: 1,
        hr: 2,
        pvr: 0,
        mvo2: 2,
        arrhythmiaRisk: 'Yüksek',
        pearl: 'Presinaptik veziküllerden noradrenalin salınımını tetikler. Doğrudan miyokardiyal β1 uyarımı ile inotropi ve belirgin taşikardi yapar.'
      },
      {
        range: '10 – 20 mcg/kg/dk',
        label: 'Yüksek (Vazopresör) Doz',
        primaryReceptor: 'α1 ++++',
        secondaryReceptors: 'β1 +++, D1 baskılanır',
        co: 1,
        svr: 3,
        hr: 3,
        pvr: 2,
        mvo2: 3,
        arrhythmiaRisk: 'Çok Yüksek',
        pearl: 'Alfa-1 etkisiyle sistemik vazokonstriksiyon yapar. SOAP II çalışmasında aritmi insidansı Noradrenalin’in yaklaşık 2 katıdır (%24.1 vs %12.4, P<0.001).'
      }
    ],
    preparationTR: {
      form: '200 mg / 5 mL ampul',
      dilution: '200 mg (1 ampul) + 45 mL SF (50 mL)',
      concentration: '4000 mcg/mL (4 mg/mL)',
      quickRate70kg: '5 mcg/kg/dk = 5.25 mL/saat (4000 mcg/mL ile)'
    },
    mvo2RiskText: 'Taşiaritmi potansiyeli çok yüksektir; MVO2 dramatik artar. SOAP II çalışmasında (De Backer, NEJM 2010) genel 28 günlük mortalitede anlamlı fark olmamakla birlikte (P=0.10), 2 kat aritmi artışı (%24.1 vs %12.4, P<0.001) ve kardiyojenik şok alt grubunda anlamlı mortalite artışı (P=0.03) gösterilmiştir.',
    cautionNotes: [
      'SOAP II bulguları (2 kat aritmi ve kardiyojenik şokta mortalite artışı) nedeniyle septik ve kardiyojenik şokta 1. basamak kılavuzlardan çıkarılmıştır.',
      'Yalnızca semptomatik bradikardi eşlik eden hipotansiyonda veya Noradrenalin bulunamadığında alternatif düşünülür.'
    ]
  },
  {
    id: 'efedrin',
    name: 'Efedrin (Ephedrine)',
    subTitle: 'Anestezi Pratiğinin Temel İndirekt / Karma α+β Vazopresörü',
    classType: 'Vazopresör',
    mechanism: 'Karma (indirekt + direkt) sempatomimetik: Presinaptik sinir uçlarından endojen noradrenalin salınımını tetikler ve doğrudan α1, β1, β2 reseptörlerini uyarır. Hem SVR hem kalp hızı/kontraktilite artışı sağlar.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '5 – 10 mg IV Bolus (Titre)',
        label: 'Standart Anestezi Bolusu',
        primaryReceptor: 'Endojen NA ↑ + α1 ++ / β1 ++',
        secondaryReceptors: 'β2 +',
        co: 2,
        svr: 1,
        hr: 2,
        pvr: 1,
        mvo2: 2,
        arrhythmiaRisk: 'Orta',
        pearl: 'Genel veya spinal anesteziye bağlı bradikardi eşlik eden geçici hipotansiyonda hızlı etkili klasik kurtarıcıdır. Direkt + indirekt mekanizmayla hem nabzı hem kan basıncını yükseltir.'
      },
      {
        range: 'Tekrarlayan Boluslar (> 30–50 mg)',
        label: 'Taşifilaksi & Yüksek Kümülatif Doz',
        primaryReceptor: 'Presinaptik NA Depo Tükenmesi',
        secondaryReceptors: 'Artan β1 taşikardi / aritmi riski',
        co: 1,
        svr: 1,
        hr: 3,
        pvr: 1,
        mvo2: 3,
        arrhythmiaRisk: 'Yüksek',
        pearl: 'Kısa aralıklarla tekrarlanan dozlarda presinaptik noradrenalin depoları tükendiği için vazopresör yanıt hızla azalır (taşifilaksi). Sürekli ihtiyaç varsa direkt etkili infüzyona (Noradrenalin/Fenilefrin) geçilmelidir.'
      }
    ],
    preparationTR: {
      form: '50 mg / 1 mL ampul (TR standart)',
      dilution: '1 ampul (50 mg / 1 mL) + 9 mL SF → Toplam 10 mL enjektör',
      concentration: '5 mg/mL',
      quickRate70kg: 'IV Bolus: 1–2 mL (5–10 mg) etkiye göre titre edilir (sürekli infüzyon olarak kullanılmaz)'
    },
    mvo2RiskText: 'Kalp hızını ve kontraktiliteyi artırdığı için MVO2’yi yükseltir; taşikardik veya şiddetli koroner arter hastalığı/aort darlığı olan olgularda Fenilefrin tercih edilmelidir.',
    cautionNotes: [
      'Tekrarlayan dozlarda presinaptik NA depolarının tükenmesine bağlı taşifilaksi gelişir; kalıcı vazoplejide Noradrenalin infüzyonuna geçilmelidir.',
      'Obstetrik (sezaryen) spinal hipotansiyonda yüksek kümülatif Efedrin plasentayı geçerek fetal metabolik asidozu artırabildiğinden Fenilefrin veya düşük doz Noradrenalin öne çıkar; MAO inhibitörü kullananlarda hipertansif kriz riski taşır.'
    ]
  },
  {
    id: 'fenilefrin',
    name: 'Fenilefrin',
    subTitle: 'Saf α1 Agonisti (Sıfır Doğrudan İnotropi)',
    classType: 'Vazopresör',
    mechanism: 'Saf ve seçici postsinaptik α1 adrenerjik agonist. β uyarımı yoktur. Güçlü vazokonstriksiyon ve MAP artışı sağlar.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '0.1 – 0.5 mcg/kg/dk (Bolus: 50–100 mcg IV)',
        label: 'Standart / Titrasyon',
        primaryReceptor: 'α1 +++++',
        secondaryReceptors: 'Sıfır β1, Sıfır β2',
        co: -1, // Afterload artışı ve bradikardi ile CO düşebilir!
        svr: 3,
        hr: -1, // Refleks vagal bradikardi!
        pvr: 2,
        mvo2: 0,
        arrhythmiaRisk: 'Düşük',
        pearl: 'Arteriyel basınca bağlı baroreseptör deşarjı güçlü vagal refleks bradikardi yaratır. Taşikardi istemediğimiz olgularda (HOCM, aort darlığı, taşikardik anestezi indüksiyonu) idealdir.'
      },
      {
        range: '0.5 – 2.0 mcg/kg/dk',
        label: 'Yüksek Doz İnfüzyon',
        primaryReceptor: 'α1 +++++',
        secondaryReceptors: 'Sıfır β',
        co: -2,
        svr: 3,
        hr: -2,
        pvr: 3,
        mvo2: 1,
        arrhythmiaRisk: 'Düşük',
        pearl: 'Aşırı afterload sol ventrikül ejeksiyon fraksiyonunu düşürür, kardiyak debi sert düşebilir. Kardiyak debisi zaten sınırda olan hastada tek başına infüze edilmemelidir.'
      }
    ],
    preparationTR: {
      form: '10 mg / 1 mL ampul',
      dilution: '10 mg (1 ampul) + 99 mL SF (100 mL torba = 100 mcg/mL). IV bolus için bu çözeltiden 10 mL enjektöre çekilir (her 0.5–1 mL = 50–100 mcg bolus) veya 50 mcg/mL dilüsyon için 5 mL çözelti + 5 mL SF yapılır.',
      concentration: '100 mcg/mL (Standart infüzyon & bolus stoğu)',
      quickRate70kg: 'Bolus: 50–100 mcg (0.5–1 mL) IV · İnfüzyon: 0.5 mcg/kg/dk = 21 mL/saat (100 mcg/mL ile)'
    },
    mvo2RiskText: 'Kalp hızını düşürdüğü ve diyastol süresini uzattığı için MVO2 artışı yapmaz; fakat aşırı afterload sol ventrikül duvar stresini artırır.',
    cautionNotes: [
      'Sol ventrikül sistolik fonksiyonu bozuk veya düşük kardiyak indeksli hastalarda kardiyak debiyi çökertebilir.',
      'Pulmoner vasküler direnci (PVR) belirgin artırdığı için Sağ Ventrikül Yetersizliğinde kaçınılmalıdır.'
    ]
  },
  {
    id: 'vazopressin',
    name: 'Vazopressin (Arjinin Vazopressin / AVP)',
    subTitle: 'Adrenerjik Olmayan V1 Endotelyal Vazokonstriktör (PVR-Nötr)',
    classType: 'Vazopresör',
    mechanism: 'Vasküler düz kas V1a reseptörlerini uyararak Gq/IP3-kalsiyum yolunu aktive eder. Asidozda katekolaminler iflas ederken V1 çalışmaya devam eder; pulmoner damar yatakta PVR-nötr etki gösterir.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '0.01 – 0.03 IU/dk (Sabit Maks. 0.03 IU/dk)',
        label: 'SSC 2021 Sabit Doz / Katekolamin Koruyucu',
        primaryReceptor: 'V1a +++++ (Sistemik Vasküler)',
        secondaryReceptors: 'V2 (Renal toplayıcı tübül), V3 (Hipofiz)',
        co: 0,
        svr: 3,
        hr: 0,
        pvr: 0, // PVR-nötr: PVR'ı artırmadan SVR'ı yükselterek PVR/SVR oranını iyileştirir
        mvo2: 0,
        arrhythmiaRisk: 'Çok Düşük',
        pearl: 'Düşük doz Vazopressin aktif pulmoner vazodilatatör değildir, ancak PVR-nötrdür: PVR’ı artırmadan sistemik SVR’ı yükselterek PVR/SVR oranını düşürür (iyileştirir) ve sağ ventrikül (RV) koroner perfüzyon basıncını korur.'
      },
      {
        range: '> 0.03 – 0.04 IU/dk',
        label: 'Yüksek Doz (İskemi Riski — Önerilmez)',
        primaryReceptor: 'V1a +++++',
        secondaryReceptors: 'Dijital, Mezenterik & Koroner Vazokonstriksiyon',
        co: -1,
        svr: 3,
        hr: 0,
        pvr: 1,
        mvo2: 1,
        arrhythmiaRisk: 'Düşük',
        pearl: 'SSC 2021 sabit üst sınırı 0.03 IU/dk’dır. >0.03–0.04 IU/dk dozlarında ek sağkalım avantajı olmadan dijital/periferik, mezenterik ve koroner iskemi riski belirgin şekilde artar.'
      }
    ],
    preparationTR: {
      form: '20 IU / 1 mL ampul',
      dilution: '20 IU + 99 mL SF (Toplam 100 mL) veya 20 IU + 49 mL SF (50 mL)',
      concentration: '0.2 IU/mL (100 mL içine konulduğunda)',
      quickRate70kg: '0.03 IU/dk = 9 mL/saat (0.2 IU/mL ile, kilodan bağımsız sabit doz)'
    },
    mvo2RiskText: 'Doğrudan pozitif inotropik veya taşikardik etkisi yoktur; taşiaritmi yapmaz. Ancak >0.03–0.04 IU/dk dozlarında koroner vazospazm ve dijital/mezenterik iskemi riski artar.',
    cautionNotes: [
      'SSC 2021: Noradrenalin 0.25–0.5 mcg/kg/dk eşiğine ulaştığında sabit maks. 0.03 IU/dk hızında eklenir; anlık titre edilmez ve bolus yapılmaz (>0.03–0.04 IU/dk dijital/mezenterik iskemi riskini artırır).',
      'VASST (Russell, NEJM 2008): Genel 28 günlük mortalitede anlamlı fark yoktur (%35.4 vs %39.3, P=0.26); sağkalım sinyali yalnızca daha hafif şok alt grubunda (NE < 15 mcg/dk) gözlenmiştir.'
    ]
  },
  {
    id: 'dobutamin',
    name: 'Dobutamin',
    subTitle: 'Saf Sentetik İnotrop (Miyokardiyal Pompa Güçlendirici)',
    classType: 'İnotrop',
    mechanism: 'Sentetik katekolamin; kuvvetli β1 (inotropi + kronotropi) ve zayıf β2 (hafif periferik vazodilatasyon). Afterload\'u düşürürken inotropiyi katlar.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '2.5 – 10 mcg/kg/dk',
        label: 'Terapötik İnotropik Doz',
        primaryReceptor: 'β1 ++++',
        secondaryReceptors: 'β2 ++ / α1 minimal',
        co: 3,
        svr: -1, // Hafif afterload düşüşü
        hr: 1,
        pvr: -1,
        mvo2: 2,
        arrhythmiaRisk: 'Orta',
        pearl: 'Kardiyak debiyi hızla yükseltir, sol ventrikül dolum basıncını (PCWP) düşürür. Hipovolemik hastada vazodilatasyonla kan basıncını düşürebilir!'
      },
      {
        range: '10 – 20 mcg/kg/dk',
        label: 'Yüksek Doz',
        primaryReceptor: 'β1 +++++',
        secondaryReceptors: 'β2 +++',
        co: 3,
        svr: -2,
        hr: 3, // Şiddetli taşikardi!
        pvr: -1,
        mvo2: 3,
        arrhythmiaRisk: 'Yüksek',
        pearl: 'Belirgin taşikardi, ektopi ve miyokardiyal iskemi riski. 48-72 saat kesintisiz infüzyonda reseptör desensitizasyonu (taşiflaksi) gelişir.'
      }
    ],
    preparationTR: {
      form: '250 mg / 20 mL flakon',
      dilution: '250 mg (1 flakon) + 30 mL SF (Toplam 50 mL)',
      concentration: '5000 mcg/mL (5 mg/mL)',
      quickRate70kg: '5 mcg/kg/dk = 4.2 mL/saat (70 kg için, 5000 mcg/mL ile)'
    },
    mvo2RiskText: 'Kalbi kırbaçlar: Hem kontraktilite hem kalp hızı arttığı için miyokardiyal oksijen tüketimini (MVO2) ciddi düzeyde yükseltir.',
    cautionNotes: [
      'Kronik beta-bloker kullanan hastalarda beta reseptörleri bloklu olduğundan Dobutamin etkisiz kalabilir; bu hastalarda Milrinon veya Levosimendan tercih edilmelidir.',
      'HOCM ve dinamik LVOT obstrüksiyonunda KONTRENDİKEDİR (gradyenti uçurur).'
    ]
  },
  {
    id: 'milrinon',
    name: 'Milrinon',
    subTitle: 'Fosfodiesteraz-3 (PDE-3) İnhibitörü İnodilatör',
    classType: 'İnodilatör',
    mechanism: 'Hücre içi cAMP yıkımını engeller. Beta adrenerjik reseptörlerden tamamen BAĞIMSIZDIR. Güçlü inotropi + hem sistemik hem pulmoner vazodilatasyon.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '0.25 – 0.75 mcg/kg/dk',
        label: 'İdame İnfüzyon (Bolus Önerilmez)',
        primaryReceptor: 'PDE-3 İnhibisyonu (cAMP ↑)',
        secondaryReceptors: 'Reseptör bağımsız',
        co: 3,
        svr: -2, // Sistemik afterload düşüşü
        hr: 1,
        pvr: -3, // Agresif pulmoner vazodilatasyon!
        mvo2: 1, // Dobutamin\'e göre MVO2 artışı daha azdır
        arrhythmiaRisk: 'Orta',
        pearl: 'Pulmoner vasküler direnci (PVR) ve RV afterload\'unu dramatik düşürür. Sağ ventrikül yetersizliği ve pulmoner hipertansiyonda Dobutamin\'den çok daha üstündür.'
      }
    ],
    preparationTR: {
      form: '10 mg / 10 mL ampul',
      dilution: '10 mg (1 ampul) + 40 mL SF (Toplam 50 mL)',
      concentration: '200 mcg/mL (0.2 mg/mL)',
      quickRate70kg: '0.375 mcg/kg/dk = 7.87 mL/saat (70 kg için, 200 mcg/mL ile)'
    },
    mvo2RiskText: 'Afterload\'u belirgin düşürdüğü için sol ventrikülün sistolik iş yükünü azaltır; MVO2 artışı Dobutamin\'e kıyasla çok daha ılımlıdır.',
    cautionNotes: [
      'Yarı ömrü uzundur (~2.5 saat). Böbrek yetmezliğinde klirensi düşer, vücutta birikir ve uzamış dirençli hipotansiyona yol açar.',
      'Yükleme dozu (50 mcg/kg bolus) şiddetli hipotansiyon ve kollaps yapabileceği için güncel klinik pratikte genellikle ATLANIR, doğrudan idame başlanır.'
    ]
  },
  {
    id: 'levosimendan',
    name: 'Levosimendan',
    subTitle: 'Kalsiyum Duyarlılaştırıcı & ATP-Duyarlı K+ Kanal Açıcı',
    classType: 'İnodilatör',
    mechanism: 'Hücre içi kalsiyum miktarını artırmadan Troponin C\'ye kalsiyum bağlanmasını stabilize eder; diyastolü bozmaz (lusitropi). K-ATP kanallarını açarak sistemik ve pulmoner vazodilatasyon sağlar.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '0.05 – 0.2 mcg/kg/dk (24 Saat İnfüzyon)',
        label: 'Standart İnfüzyon (Bolussuz)',
        primaryReceptor: 'Troponin C + K-ATP Kanalları',
        secondaryReceptors: 'PDE-3 (Yüksek dozda hafif inhibisyon)',
        co: 3,
        svr: -2,
        hr: 1, // Vazodilatasyona sekonder refleks taşikardi / SVT-AF eğilimi
        pvr: -2,
        mvo2: 0, // Hücre içi Ca yükünü artırmadığı için direkt MVO2 artışı minimaldir
        arrhythmiaRisk: 'Orta',
        pearl: 'Hücre içine ek kalsiyum sokmadan inotropi sağlasa da belirgin vazodilatasyon nedeniyle refleks taşikardi, hipotansiyon ve SVT/AF risk artışı yaratır. Aktif metaboliti OR-1896 ile hemodinamik etki 7–9 gün sürer.'
      }
    ],
    preparationTR: {
      form: '12.5 mg / 5 mL flakon (2.5 mg/mL)',
      dilution: '12.5 mg (1 flakon) + 495 mL %5 Dekstroz (500 mL)',
      concentration: '25 mcg/mL (0.025 mg/mL)',
      quickRate70kg: '0.1 mcg/kg/dk = 16.8 mL/saat (70 kg için, 25 mcg/mL ile)'
    },
    mvo2RiskText: 'Direkt miyokardiyal kalsiyum yükünü artırmadığı için MVO2 profili klasik katekolaminlerden daha avantajlıdır; ancak vazodilatasyona bağlı hipotansiyon ve SVT/AF gelişirse koroner perfüzyon bozulabilir.',
    cautionNotes: [
      'SSC 2021, septik şokta Levosimendan kullanımına KARŞI öneride bulunur (LeoPARDS, NEJM 2016: organ yetmezliği azalmadı, SVT/AF artışı ve mekanik ventilasyondan ayrılmada gecikme saptandı).',
      'Supraventriküler taşikardi (SVT) ve atriyal fibrilasyon (AF) riskini artırır; başlangıç bolusu (6–12 mcg/kg) ağır hipotansiyon yapacağından atlanmalı ve çoğu olguda Noradrenalin desteğiyle birlikte verilmelidir.'
    ]
  }
];

// 2. Combination Synergy Matrix
interface SynergyPair {
  title: string;
  drugA: string;
  drugB: string;
  indication: string;
  synergyRationale: string;
  pearl: string;
  warning: string;
  badge: string;
  color: string;
}

const SYNERGY_PAIRS: SynergyPair[] = [
  {
    title: 'Noradrenalin + Vazopressin',
    drugA: 'Noradrenalin (α1/β1)',
    drugB: 'Vazopressin (V1)',
    indication: 'Refrakter Septik Şok & Vazopleji',
    synergyRationale: 'İki farklı reseptör yolağı (Adrenerjik + Vasküler V1). SSC 2021 klinik uygulama eşiği olarak Noradrenalin 0.25–0.5 mcg/kg/dk düzeyine ulaştığında sabit maks. 0.03 IU/dk Vazopressin eklenmesi katekolamin yükünü azaltır. Not: VASST çalışmasında (NEJM 2008) genel 28 günlük mortalitede anlamlı fark bulunmamış (%35.4 vs %39.3, P=0.26), sağkalım sinyali yalnızca daha hafif şok alt grubunda (NE < 15 mcg/dk) görülmüştür.',
    pearl: 'Düşük doz Vazopressin PVR-nötrdür: PVR’ı artırmadan sistemik MAP ve SVR’ı yükselterek PVR/SVR oranını ve sağ ventrikül koroner perfüzyonunu iyileştirir (>0.03–0.04 IU/dk dijital/mezenterik iskemi riskini artırır).',
    warning: 'Weaning (azaltma) sırası konusunda güncel kanıtlar karmaşıktır: Vazopressin önce kesildiğinde geçici rebound hipotansiyon daha sık görülse de mortalite farkı net değildir; azaltma sırası hastanın hemodinamik yanıtı, kalp hızı ve iskemi riskine göre bireyselleştirilmelidir.',
    badge: 'Yoğun Bakım Altın Standardı',
    color: 'emerald'
  },
  {
    title: 'Vazopressin + Milrinon (± iNO)',
    drugA: 'Vazopressin (V1)',
    drugB: 'Milrinon (PDE-3i) / iNO',
    indication: 'Akut Sağ Ventrikül Yetersizliği & Pulmoner Hipertansiyon',
    synergyRationale: 'Sağ kalp için hedefe yönelik kombinasyon: Milrinon RV kontraktilitesini artırıp PVR’ı düşürür (seçici pulmoner vazodilatasyon için inhale Nitrik Oksit [iNO] eklenebilir). Milrinon’un sistemik hipotansiyon yan etkisini ise PVR-nötr olan Vazopressin pulmoner basıncı yükseltmeden dengeler.',
    pearl: 'Vazopressin PVR-nötr olduğu için PVR’ı artırmadan SVR’ı yükseltir, böylece PVR/SVR oranını düşürür ve RV koroner perfüzyon basıncını korur.',
    warning: 'Milrinon birikimini önlemek için böbrek fonksiyonları (kreatinin klirensi) yakın takip edilmelidir; iNO kesilirken rebound pulmoner hipertansiyona karşı kademeli azaltılmalıdır.',
    badge: 'RV Kurtarma İkilisi',
    color: 'teal'
  },
  {
    title: 'Noradrenalin + Dobutamin',
    drugA: 'Noradrenalin (α1/β1)',
    drugB: 'Dobutamin (β1/β2)',
    indication: 'Kardiyojenik Şok & Sepsise Bağlı Kardiyomiyopati',
    synergyRationale: 'Noradrenalin kritik MAP ve koroner perfüzyon basıncını garantiye alırken, Dobutamin düşük kardiyak debiyi (CI < 2.2) ve periferik doku perfüzyonunu (kapiller dolum zamanı / laktat — ANDROMEDA-SHOCK) toparlar.',
    pearl: 'Tek başına Dobutamin hipotansiyon yapabilir; Noradrenalin ile MAP ≥ 65 mmHg sağlandıktan sonra Dobutamin eklenmelidir. Kardiyojenik şokta Adrenalin’den (OptimaCC: 3× refrakter şok) kaçınılmalıdır.',
    warning: 'Hastada taşikardi (>115–120/dk) veya iskemi başlarsa Dobutamin azaltılmalı; kronik beta-bloker kullanımında Milrinon/Levosimendan değerlendirilmelidir.',
    badge: 'Kardiyojenik Şok Protokolü',
    color: 'blue'
  },
  {
    title: 'Noradrenalin + Levosimendan',
    drugA: 'Noradrenalin (α1/β1)',
    drugB: 'Levosimendan (Ca Duyarlılaştırıcı)',
    indication: 'Düşük EF\'li Kardiyak Cerrahi Sonrası Weaning & İskemik Kalp',
    synergyRationale: 'Levosimendan hücre içine ek kalsiyum sokmadan miyokardı güçlendirir ve koronerleri genişletir. Noradrenalin ise K-ATP kaynaklı sistemik vazodilatasyonu dengeleyerek perfüzyonu korur.',
    pearl: 'Aktif metaboliti (OR-1896) sayesinde etkisi 7–9 gün sürer; kardiyak cerrahi weaning ve beta-bloker altındaki düşük debili olgularda avantaj sağlar.',
    warning: 'SVT/AF ve hipotansiyon riskini artırır (bolus önerilmez). SSC 2021, septik şokta Levosimendan kullanımına KARŞI öneride bulunur (LeoPARDS, NEJM 2016).',
    badge: 'Kalsiyum Koruyucu İkili',
    color: 'indigo'
  },
  {
    title: 'Dirençli Vazopleji Üçlüsü: NA + AVP + Metilen Mavisi',
    drugA: 'Noradrenalin + Vazopressin',
    drugB: 'Metilen Mavisi (1.5–2 mg/kg IV)',
    indication: 'KPB Sonrası / Ağır Sepsiste Refrakter Vazoplejik Şok',
    synergyRationale: 'Aşırı Nitrik Oksit (NO) sentezi guanilat siklazı uyararak damar düz kasını felç eder. Metilen mavisi çözünür guanilat siklazı (sGC) bloke ederek vazoplejiyi 15–30 dakikada kırar.',
    pearl: 'Katekolamin infüzyon hızlarını dakikalar içinde düşürerek periferik iskemi riskini azaltır; refrakter septik şokta SSC 2021 kapsamında Hidrokortizon ve 3. basamak Epinefrin ile birlikte kurtarma stratejileri değerlendirilir.',
    warning: 'SSRI kullanan hastalarda Serotonin Sendromu riski; G6PD eksikliğinde hemolitik anemi yapabilir. Nabız oksimetresinde geçici SpO2 düşüşü (%85) yalancıdır.',
    badge: 'Son Basamak Kurtarma Protokolü',
    color: 'rose'
  }
];

// 3. Clinical Decision Simulator Scenarios
interface SimulatorScenario {
  id: string;
  title: string;
  clinicalPresentation: string;
  vitals: { hr: string; bp: string; ci: string; svr: string; lactate: string };
  pathophysiology: string;
  recommendedLine: {
    firstChoice: string;
    secondChoice: string;
    contraindicated: string;
  };
  clinicalDecisionRationale: string;
  keyRule: string;
}

const SIMULATOR_SCENARIOS: SimulatorScenario[] = [
  {
    id: 'septic-tachycardia',
    title: 'Septik Şok + Taşikardik Atriyal Fibrilasyon (HR 135/dk)',
    clinicalPresentation: 'Pnömoni odağı, sıcak şok, periferik vazodilatasyon, hızlı ventrikül yanıtlı AF.',
    vitals: { hr: '135 /dk (AF)', bp: '75/40 (MAP 51)', ci: '3.4 L/dk/m²', svr: '520 dyn·s/cm⁵', lactate: '4.8 mmol/L' },
    pathophysiology: 'Genişlemiş vasküler yatak, şiddetli vazopleji. Taşikardi diyastolik koroner dolum süresini kritik düzeyde kısaltıyor.',
    recommendedLine: {
      firstChoice: 'Noradrenalin (Hedef MAP ≥ 65; SVK beklenmeden proksimal periferik yoldan başlanabilir)',
      secondChoice: 'Sabit Maks. 0.03 IU/dk Vazopressin (NE 0.25–0.5 mcg/kg/dk eşiğinde — SSC 2021)',
      contraindicated: 'Dopamin (SOAP II: 2× aritmi) ve Septik Şokta Levosimendan (SSC 2021 / LeoPARDS: SVT/AF ↑)'
    },
    clinicalDecisionRationale: 'SSC 2021’e göre SVK beklenmeden geniş proksimal periferik yoldan Noradrenalin başlanır; NE 0.25–0.5 mcg/kg/dk düzeyine ulaştığında sabit maks. 0.03 IU/dk Vazopressin eklenir. Perfüzyon yanıtı laktat yanında kapiller dolum zamanı (ANDROMEDA-SHOCK) ile seri izlenir; refrakter hipotansiyonda 3. basamak Epinefrin düşünülür.',
    keyRule: 'Taşikardik septik şokta Vazopressin (maks. 0.03 IU/dk) katekolamin yükünü azaltır; Dopamin kesinlikle 1. basamak değildir.'
  },
  {
    id: 'cardiogenic-shock',
    title: 'Akut MI Sonrası Kardiyojenik Şok (Düşük Debi + Yüksek SVR)',
    clinicalPresentation: 'Geniş ön yüz STEMI, soğuk soluk ekstremiteler, oligüri, akciğerde yaygın krepitan raller.',
    vitals: { hr: '105 /dk', bp: '82/55 (MAP 64)', ci: '1.6 L/dk/m²', svr: '1950 dyn·s/cm⁵', lactate: '5.2 mmol/L' },
    pathophysiology: 'Sol ventrikül pompa iflası, ileriye debi yok, kompansatuar aşırı vazokonstriksiyon (afterload çok yüksek).',
    recommendedLine: {
      firstChoice: 'Noradrenalin (Perfüzyon MAP koruması) + Dobutamin (İnotrop)',
      secondChoice: 'Milrinon veya Levosimendan (Beta-bloker altında / afterload düşürücü inodilatatör)',
      contraindicated: 'Epinefrin (OptimaCC: 3× refrakter şok %37 vs %7), Dopamin (SOAP II: P=0.03 mortalite ↑) & Yüksek Doz Fenilefrin'
    },
    clinicalDecisionRationale: 'Önce Noradrenalin ile diyastolik koroner perfüzyon basıncı (MAP ≥ 65) sağlanır; ardından Dobutamin ile kontraktilite artırılır. OptimaCC çalışması (JACC 2018) Epinefrin’in 3 kat refrakter şok yaptığını, SOAP II (NEJM 2010) ise Dopamin’in kardiyojenik şokta mortaliteyi artırdığını göstermiştir. Beta-bloker altındaki hastada Milrinon seçilir.',
    keyRule: 'Kardiyojenik şokta Noradrenalin ilk vazopresördür; Epinefrin (OptimaCC), Dopamin (SOAP II) ve saf Fenilefrin’den kaçının!'
  },
  {
    id: 'massive-pe-rv',
    title: 'Masif Pulmoner Emboli & Akut Sağ Ventrikül Dekompanzasyonu',
    clinicalPresentation: 'Ani nefes darlığı, hipotansiyon, boyun venöz dolgunluğu, EKO\'da genişlemiş RV ve D-şekilli septum.',
    vitals: { hr: '118 /dk', bp: '78/48 (MAP 58)', ci: '1.8 L/dk/m²', svr: '1100 dyn·s/cm⁵', lactate: '3.9 mmol/L' },
    pathophysiology: 'Pulmoner vasküler direnç (PVR) fırlamış, RV afterload\'a karşı kasılamıyor, koroner perfüzyonu bozulmuş ve iskemide.',
    recommendedLine: {
      firstChoice: 'Noradrenalin (RV koroner perfüzyonunu kurtarmak için şart)',
      secondChoice: 'Vazopressin (PVR-nötr, maks. 0.03 IU/dk) + İnhale Nitrik Oksit (iNO) / İnhale İloprost veya Milrinon',
      contraindicated: 'Agresif Sıvı Yüklemesi & Yüksek Doz Fenilefrin (PVR\'ı uçurur)'
    },
    clinicalDecisionRationale: 'RV sadece diyastolde değil sistolde de perfüze olur; sistemik MAP düşerse RV iskemiye girer ve durur. Noradrenalin sistemik basıncı sağlayarak RV iskemi kısır döngüsünü kırar. İnhale Nitrik Oksit (iNO) veya inhale İloprost sistemik hipotansiyon yapmadan seçici pulmoner vazodilatasyonla RV ardyükünü düşürür. Aşırı sıvı RV\'yi daha da gerer ve sol ventrikülü ezer.',
    keyRule: 'Akut RV yetmezliğinde aşırı sıvı zehirdir. Vazopressin PVR-nötrdür: PVR’ı artırmadan SVR’ı yükselterek PVR/SVR oranını ve RV koroner perfüzyonunu iyileştirir; seçici PVR düşüşü için iNO eklenir.'
  },
  {
    id: 'hocm-sam',
    title: 'HOCM & Dinamik LVOT Obstrüksiyonu (SAM Fenomeni)',
    clinicalPresentation: 'Genç hasta, anestezi indüksiyonu veya kanama sonrası şiddetli hipotansiyon, sistolik ejeksiyon üfürümü.',
    vitals: { hr: '112 /dk', bp: '68/35 (MAP 46)', ci: '1.9 L/dk/m²', svr: '700 dyn·s/cm⁵', lactate: '2.4 mmol/L' },
    pathophysiology: 'Mitral ön yaprakçığın aşırı sistolik hareketi (SAM) LV çıkış yolunu tıkamıştır. Kontraktilite veya taşikardi arttıkça darlık derinleşir.',
    recommendedLine: {
      firstChoice: 'Fenilefrin (Saf α1 ile SVR artırılır, refleks bradikardi sağlanır)',
      secondChoice: 'Kristaloid Sıvı Bolusu (LV dolumunu ve kavite hacmini artırır)',
      contraindicated: 'Dobutamin, Adrenalin, İzoproterenol, Dopamin, Efedrin (KESİNLİKLE YASAK)'
    },
    clinicalDecisionRationale: 'Tüm inotroplar ve beta agonistler sol ventrikülü daha güçlü kastırarak çıkış yolunu tamamen kapatır ve arrest yapar! Fenilefrin SVR\'ı artırarak LVOT\'yi açar, kalp hızını düşürerek doluş süresini uzatır.',
    keyRule: 'HOCM/SAM krizinde inotropik ajan vermek hastayı ameliyathanede kaybettirebilir; tek çare Fenilefrin + Sıvı + Beta-blokerdir.'
  },
  {
    id: 'severe-acidosis',
    title: 'Dirençli Laktik Asidozda Refrakter Şok (pH 7.10, Laktat 9.8)',
    clinicalPresentation: 'Mezenter iskemi veya gecikmiş septik şok, yüksek doz Noradrenalin\'e (>0.8 mcg/kg/dk) yanıtsız vazopleji.',
    vitals: { hr: '122 /dk', bp: '70/36 (MAP 47)', ci: '2.9 L/dk/m²', svr: '380 dyn·s/cm⁵', lactate: '9.8 mmol/L' },
    pathophysiology: 'pH < 7.20 altında adrenerjik reseptörler konformasyonel olarak felç olur (desensitizasyon). ATP-duyarlı K+ kanalları açılır.',
    recommendedLine: {
      firstChoice: 'Vazopressin (Sabit maks. 0.03 IU/dk — Asidozda V1 reseptörleri duyarlıdır)',
      secondChoice: 'Hidrokortizon (200 mg/gün) + 3. Basamak Epinefrin (SSC 2021) veya Kurtarma Metilen Mavisi (1.5–2 mg/kg IV)',
      contraindicated: 'Noradrenalin Dozunu Sürekli Artırmak veya AVP > 0.04 IU/dk (Dijital/mezenterik iskemi ve nekroz riski)'
    },
    clinicalDecisionRationale: 'Adrenerjik reseptörler asidozda yanıt vermezken V1 reseptör fonksiyonu korunur. Sabit maks. 0.03 IU/dk Vazopressin + Hidrokortizon eklenir; refrakter vazoplejide Metilen mavisi NO/cGMP yolağını durdurarak dakikalar içinde yanıt üretebilir.',
    keyRule: 'Asidozda inatla katekolamin artırmak yerine non-adrenerjik kurtarma (Vazopressin maks. 0.03 IU/dk + Steroid / Metilen Mavisi) başlatılmalıdır.'
  }
];

export const VasoactiveDecisionMatrixInfographic: React.FC<VasoactiveDecisionMatrixInfographicProps> = ({
  isDark
}) => {
  const [activeTab, setActiveTab] = useState<'dose-shift' | 'synergy' | 'simulator'>('dose-shift');
  const [selectedDrugId, setSelectedDrugId] = useState<string>('noradrenalin');
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('septic-tachycardia');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Drug Object
  const currentDrug = useMemo(() => {
    return ADVANCED_DRUGS.find(d => d.id === selectedDrugId) || ADVANCED_DRUGS[0];
  }, [selectedDrugId]);

  // Selected Tier
  const currentTier = useMemo(() => {
    return currentDrug.tiers[selectedTierIndex] || currentDrug.tiers[0];
  }, [currentDrug, selectedTierIndex]);

  // When changing drug, reset tier index
  const handleSelectDrug = (id: string) => {
    setSelectedDrugId(id);
    const drug = ADVANCED_DRUGS.find(d => d.id === id);
    setSelectedTierIndex(drug ? drug.defaultTierIndex : 0);
  };

  // Filtered drugs
  const filteredDrugs = useMemo(() => {
    if (!searchQuery.trim()) return ADVANCED_DRUGS;
    const q = searchQuery.toLowerCase();
    return ADVANCED_DRUGS.filter(d => 
      d.name.toLowerCase().includes(q) ||
      d.subTitle.toLowerCase().includes(q) ||
      d.classType.toLowerCase().includes(q) ||
      d.mechanism.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Selected Simulator Scenario
  const currentScenario = useMemo(() => {
    return SIMULATOR_SCENARIOS.find(s => s.id === activeScenarioId) || SIMULATOR_SCENARIOS[0];
  }, [activeScenarioId]);

  // Helper for arrow badges
  const renderParamMetric = (label: string, value: number, unitLabel: string) => {
    let text = '0 (Nötr)';
    let color = isDark ? 'text-slate-400 bg-slate-800 border-slate-700' : 'text-slate-600 bg-slate-100 border-slate-200';

    if (value === 3) {
      text = '↑↑↑ Belirgin Artış';
      color = 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30';
    } else if (value === 2) {
      text = '↑↑ Orta Artış';
      color = 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30';
    } else if (value === 1) {
      text = '↑ Hafif Artış';
      color = 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    } else if (value === -1) {
      text = '↓ Hafif Düşüş';
      color = 'text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/30';
    } else if (value === -2) {
      text = '↓↓ Orta Düşüş';
      color = 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/30';
    } else if (value === -3) {
      text = '↓↓↓ Agresif Düşüş';
      color = 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
    }

    return (
      <div className={`p-3 rounded-xl border flex flex-col justify-between ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{label}</span>
          <span className="text-[10px] text-slate-400 font-mono">{unitLabel}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${color}`}>
            {text}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark
          ? 'bg-gradient-to-r from-indigo-950/70 via-slate-900 to-purple-950/60 border-indigo-500/30 shadow-lg shadow-indigo-950/30'
          : 'bg-gradient-to-r from-indigo-50 via-white to-purple-50 border-indigo-200 shadow-xs'
      }`}>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              KLİNİK KARAR MATRİKSİ
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Doz-Yanıt Spektrumu · Reseptör Kayması · İkili Sinerjiler · Şok Yönetimi
            </span>
          </div>
          <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Vazoaktif ve İnotropik Ajanlar Klinik Karar Matriksi
          </h2>
          <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            İlaçları sadece statik tablolarla değil; <strong>doza göre değişen reseptör kayması (biphasic response)</strong>, 
            <strong>ikili vazopresör kombinasyon sinerjileri (VASST & RV kurtarma)</strong> ve 
            <strong>şok senaryosu simülatörü</strong> ile derinlemesine yönetin.
          </p>
        </div>

        {/* 3 Navigation Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-5 mt-5 border-t border-indigo-500/20">
          <button
            type="button"
            onClick={() => setActiveTab('dose-shift')}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'dose-shift'
                ? isDark
                  ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-sm'
                  : 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-2xs'
                : isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  : 'bg-white/70 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sliders className={`w-4 h-4 shrink-0 ${activeTab === 'dose-shift' ? 'text-indigo-400' : 'text-slate-400'}`} />
            <div>
              <div className="text-xs font-bold leading-none">1. Doz-Yanıt Kayması</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Dinamik Reseptör Spektrumu</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('synergy')}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'synergy'
                ? isDark
                  ? 'bg-emerald-600/25 border-emerald-500 text-white shadow-sm'
                  : 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-2xs'
                : isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  : 'bg-white/70 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GitBranch className={`w-4 h-4 shrink-0 ${activeTab === 'synergy' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <div>
              <div className="text-xs font-bold leading-none">2. İkili Sinerjiler</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Kombinasyon & Weaning</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'simulator'
                ? isDark
                  ? 'bg-rose-600/25 border-rose-500 text-white shadow-sm'
                  : 'bg-rose-50 border-rose-400 text-rose-950 shadow-2xs'
                : isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  : 'bg-white/70 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <HeartPulse className={`w-4 h-4 shrink-0 ${activeTab === 'simulator' ? 'text-rose-400' : 'text-slate-400'}`} />
            <div>
              <div className="text-xs font-bold leading-none">3. Şok Simülatörü</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">5 Kritik Klinik Senaryo</div>
            </div>
          </button>
        </div>
      </div>

      {/* MODULE 1: DOSE-DEPENDENT RECEPTOR SHIFT */}
      {activeTab === 'dose-shift' && (
        <div className="space-y-6">
          {/* Quick Drug Picker Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {filteredDrugs.map(drug => {
                const isSelected = drug.id === selectedDrugId;
                return (
                  <button
                    key={drug.id}
                    type="button"
                    onClick={() => handleSelectDrug(drug.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                          : 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : isDark
                          ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {drug.name.split(' (')[0]}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-56 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="İlaç veya mekanizma ara..."
                className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                  isDark ? 'bg-slate-800/90 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Active Drug Card */}
          <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {currentDrug.name}
                  </h3>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                    currentDrug.classType === 'Vazopresör'
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                      : currentDrug.classType === 'İnotrop'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        : currentDrug.classType === 'İnodilatör'
                          ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30'
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                  }`}>
                    {currentDrug.classType}
                  </span>
                </div>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                  {currentDrug.subTitle}
                </p>
                <p className={`text-xs mt-1.5 leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {currentDrug.mechanism}
                </p>
              </div>

              {/* Dose Tier Selector Buttons */}
              <div className={`p-2 rounded-xl border flex flex-col gap-1.5 shrink-0 ${
                isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                  Doz Kademesi & Reseptör Kayması Seçin:
                </div>
                <div className="flex flex-col gap-1">
                  {currentDrug.tiers.map((tier, idx) => {
                    const isTierSelected = idx === selectedTierIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedTierIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold text-left border transition-all cursor-pointer ${
                          isTierSelected
                            ? isDark
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                              : 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : isDark
                              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span>{tier.label}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                            isTierSelected ? 'bg-white/20 text-white' : 'text-slate-400'
                          }`}>
                            {tier.range}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Current Tier Dynamics Display */}
            <div className="pt-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Aktif İnfüzyon Aralığı:</span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                    {currentTier.range}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Baskın Reseptör: </span>
                    <strong className="text-rose-500 font-mono">{currentTier.primaryReceptor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">İkincil: </span>
                    <span className="text-slate-300 font-mono">{currentTier.secondaryReceptors}</span>
                  </div>
                </div>
              </div>

              {/* 5 Dynamic Hemodynamic Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {renderParamMetric('Kalp Debisi (CO)', currentTier.co, 'L/dk')}
                {renderParamMetric('Sistemik Direnç (SVR)', currentTier.svr, 'dyn·s/cm⁵')}
                {renderParamMetric('Kalp Hızı (HR)', currentTier.hr, 'atım/dk')}
                {renderParamMetric('Pulmoner Direnç (PVR)', currentTier.pvr, 'dyn·s/cm⁵')}
                
                {/* MVO2 & Arrhythmia Risk Card */}
                <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Aritmi Riski</span>
                    <span className="text-[10px] text-slate-400 font-mono">MVO2: {currentTier.mvo2}/3</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md border ${
                      currentTier.arrhythmiaRisk === 'Çok Düşük' || currentTier.arrhythmiaRisk === 'Düşük'
                        ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                        : currentTier.arrhythmiaRisk === 'Orta'
                          ? 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                          : 'text-rose-500 bg-rose-500/10 border-rose-500/20'
                    }`}>
                      {currentTier.arrhythmiaRisk}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clinical Pearl Box for this specific Tier */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                isDark ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50/70 border-indigo-200 text-indigo-900'
              }`}>
                <Zap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <strong className="font-bold text-indigo-600 dark:text-indigo-400">Doz-Özgü Kritik Fizyoloji: </strong>
                  {currentTier.pearl}
                </div>
              </div>

              {/* TR Ampoule & Practical Dilution Box (P2 High-Value Resident Utility) */}
              <div className={`p-4 rounded-xl border space-y-2.5 ${
                isDark ? 'bg-teal-950/20 border-teal-500/30' : 'bg-teal-50/60 border-teal-200'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-teal-700 dark:text-teal-300">
                    <Layers className="w-4 h-4 text-teal-500 shrink-0" />
                    <span>🇹🇷 TR Ampul &amp; Pratik Hazırlama</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                    {currentDrug.preparationTR.concentration}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className={`p-2.5 rounded-lg border ${
                    isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-teal-100'
                  }`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ampul / Flakon Formu</div>
                    <div className={`font-mono font-semibold mt-0.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {currentDrug.preparationTR.form}
                    </div>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${
                    isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-teal-100'
                  }`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Standart Dilüsyon</div>
                    <div className={`mt-0.5 leading-snug ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {currentDrug.preparationTR.dilution}
                    </div>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${
                    isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white/90 border-teal-100'
                  }`}>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">70 kg Pratik Hız / Bolus</div>
                    <div className="font-mono font-bold text-teal-600 dark:text-teal-400 mt-0.5 leading-snug">
                      {currentDrug.preparationTR.quickRate70kg}
                    </div>
                  </div>
                </div>
              </div>

              {/* MVO2 and Safety Note */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-500" />
                    <span>Miyokard O2 Dengesi (MVO2) ve Koroner Perfüzyon:</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {currentDrug.mvo2RiskText}
                  </p>
                </div>

                <div className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-amber-950/20 border-amber-500/20' : 'bg-amber-50/60 border-amber-200'
                }`}>
                  <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Klinik Güvenlik Uyarıları:</span>
                  </div>
                  <ul className="text-xs space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                    {currentDrug.cautionNotes.map((note, nIdx) => (
                      <li key={nIdx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: COMBINATION SYNERGIES */}
      {activeTab === 'synergy' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <GitBranch className="w-4 h-4 text-emerald-500" />
              <span>Kombinasyon Vazopresör Stratejisi (Multi-Modal Hemodynamic Support)</span>
            </h3>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Tek bir ilacın dozunu aşırı yükseltmek reseptör desensitizasyonuna ve toksisiteye (taşikardi, aritmik ölüm, organ iskemisi) yol açar.
              Aşağıdaki kanıta dayalı kombinasyonlar, farklı reseptör yolaklarını eşzamanlı aktive ederek düşük dozla maksimum perfüzyon sağlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SYNERGY_PAIRS.map((pair, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  isDark ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {pair.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">{pair.indication}</span>
                  </div>

                  <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {pair.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 dark:bg-slate-800 dark:text-slate-300 border border-slate-700">
                      {pair.drugA}
                    </span>
                    <span className="text-slate-400 font-bold">+</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 dark:bg-slate-800 dark:text-slate-300 border border-slate-700">
                      {pair.drugB}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pair.synergyRationale}
                  </p>

                  <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                    isDark ? 'bg-indigo-950/20 border-indigo-500/30 text-indigo-300' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
                  }`}>
                    <Zap className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <strong>Klinik Püf Noktası: </strong>{pair.pearl}
                    </div>
                  </div>
                </div>

                <div className={`mt-4 pt-3 border-t text-[11px] flex items-center gap-1.5 ${
                  isDark ? 'border-slate-800 text-amber-400' : 'border-slate-100 text-amber-700'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>Dikkat: </strong>{pair.warning}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 3: CLINICAL DECISION SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-5">
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span>Klinik Şok Vaka Simülatörü & Karar Ağacı</span>
            </h3>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Şok tablosunda her hipotansiyona körü körüne Noradrenalin veya Dobutamin başlanmaz. 
              Aşağıdaki 5 kritik ameliyathane / yoğun bakım tablosundan birini seçerek fizyolojik gerekçeleri inceleyin.
            </p>
          </div>

          {/* Scenario Tab Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {SIMULATOR_SCENARIOS.map(sc => {
              const isSelected = sc.id === activeScenarioId;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-rose-600/25 border-rose-500 text-white shadow-sm ring-1 ring-rose-500'
                        : 'bg-rose-50 border-rose-500 text-rose-950 shadow-2xs ring-1 ring-rose-400'
                      : isDark
                        ? 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold line-clamp-1">{sc.title.split(' (')[0]}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                    {sc.vitals.bp} · HR {sc.vitals.hr.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Scenario Detailed Dashboard */}
          <div className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  VAKA PROFİLİ
                </span>
                <h3 className={`text-base sm:text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentScenario.title}
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {currentScenario.clinicalPresentation}
                </p>
              </div>

              {/* Hemodynamic Monitor Strip */}
              <div className={`p-3 rounded-xl border grid grid-cols-2 sm:grid-cols-5 gap-3 shrink-0 ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'
              }`}>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-mono">Nabız (HR)</div>
                  <div className="text-xs font-mono font-bold text-rose-500">{currentScenario.vitals.hr}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-mono">Tansiyon (BP)</div>
                  <div className="text-xs font-mono font-bold text-emerald-500">{currentScenario.vitals.bp}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-mono">Kardiyak İndeks</div>
                  <div className="text-xs font-mono font-bold text-sky-500">{currentScenario.vitals.ci}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-mono">SVR</div>
                  <div className="text-xs font-mono font-bold text-amber-500">{currentScenario.vitals.svr}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase font-mono">Laktat</div>
                  <div className="text-xs font-mono font-bold text-purple-500">{currentScenario.vitals.lactate}</div>
                </div>
              </div>
            </div>

            {/* Pathophysiology & Action Plan */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 1st Choice */}
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-300'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>1. Tercih Ajan & Strateji</span>
                </div>
                <div className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentScenario.recommendedLine.firstChoice}
                </div>
              </div>

              {/* 2nd Choice */}
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50/70 border-indigo-300'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span>2. Sıra Kombinasyon Ajanı</span>
                </div>
                <div className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentScenario.recommendedLine.secondChoice}
                </div>
              </div>

              {/* Contraindicated */}
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/70 border-rose-300'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>KESİNLİKLE KAÇINILMASI GEREKEN</span>
                </div>
                <div className={`text-sm font-bold mt-1 text-rose-600 dark:text-rose-400`}>
                  {currentScenario.recommendedLine.contraindicated}
                </div>
              </div>
            </div>

            {/* In-depth Decision Rationale */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Fizyolojik Karar Gerekçesi (Neden Bu Ajan?):
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {currentScenario.clinicalDecisionRationale}
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <Flame className="w-4 h-4 shrink-0" />
                <span>Kural: {currentScenario.keyRule}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CLINICAL EVIDENCE & CANONICAL REFERENCES SECTION (En Aşağıda) */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Klinik Kaynaklar & Kanıta Dayalı Referanslar
          </h4>
        </div>
        <p className={`text-xs mb-4 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Bu karar matriksi, randomize kontrollü klinik çalışmalar (RCT), uluslararası kılavuzlar ve kanıtlanmış hemodinamik farmakoloji temellerine dayanmaktadır:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>1. Surviving Sepsis Campaign (SSC 2021)</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500">Kılavuz</span>
            </div>
            <p className="text-[11px]">
              Evans L, Rhodes A, Alhazzani W, et al. <em>Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021.</em> Crit Care Med. 2021;49(11):e1063–e1143.
            </p>
            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → 1. basamak Noradrenalin (SVK beklenmeden proksimal periferik yoldan başlanabilir); NE 0.25–0.5 mcg/kg/dk eşiğinde sabit maks. 0.03 IU/dk Vazopressin (&gt;0.03–0.04 IU/dk dijital/mezenterik iskemi riski ↑); 3. basamak Epinefrin; septik şokta Levosimendan’a KARŞI öneri.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>2. SOAP II Trial (Dopamin vs Noradrenalin)</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500">RCT / NEJM</span>
            </div>
            <p className="text-[11px]">
              De Backer D, Biston P, Devriendt J, et al. <em>Comparison of Dopamine and Norepinephrine in the Treatment of Shock.</em> N Engl J Med. 2010;362(9):779–789.
            </p>
            <div className="text-[10px] text-rose-600 dark:text-rose-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → Genel 28 günlük mortalitede anlamlı fark yok (P=0.10); ancak Dopamin kolunda 2 kat aritmi artışı (%24.1 vs %12.4, P&lt;0.001) ve kardiyojenik şok alt grubunda anlamlı mortalite artışı (P=0.03) gösterilmiştir.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>3. VASST Trial (Vazopressin Sinerjisi)</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500">RCT / NEJM</span>
            </div>
            <p className="text-[11px]">
              Russell JA, Walley KR, Singer J, et al. <em>Vasopressin versus Norepinephrine Infusion in Patients with Septic Shock.</em> N Engl J Med. 2008;358(9):877–887.
            </p>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → Genel 28 günlük mortalitede anlamlı fark yok (%35.4 vs %39.3, P=0.26); sağkalım sinyali yalnızca daha hafif şok alt grubunda (NE &lt; 15 mcg/dk) görülmüştür. NE 0.25–0.5 mcg/kg/dk eşiği SSC 2021 klinik uygulama eşiğidir.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>4. OptimaCC (Kardiyojenik Şokta Epinefrin)</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500">RCT / JACC</span>
            </div>
            <p className="text-[11px]">
              Levy B, Clere-Jehl R, Legras A, et al. <em>Epinephrine Versus Norepinephrine for Cardiogenic Shock After Acute Myocardial Infarction.</em> J Am Coll Cardiol. 2018;72(2):173–182.
            </p>
            <div className="text-[10px] text-rose-600 dark:text-rose-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → Epinefrin kolunda 3 kat daha yüksek refrakter şok oranı (%37 vs %7, P=0.008) ve daha fazla laktik asidoz/taşikardi nedeniyle çalışma erken sonlandırılmıştır.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>5. LeoPARDS (Septik Şokta Levosimendan)</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500">RCT / NEJM</span>
            </div>
            <p className="text-[11px]">
              Gordon AC, Perkins GD, Singer M, et al. <em>Levosimendan for the Prevention of Acute Organ Dysfunction in Sepsis.</em> N Engl J Med. 2016;375(17):1638–1648.
            </p>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → Organ yetmezliğinde iyileşme sağlamamış; supraventriküler taşiaritmi (SVT/AF) artışı ve ventilatörden ayrılma oranında düşüş nedeniyle SSC 2021 septik şokta önermez.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>6. ANDROMEDA-SHOCK (Kapiller Dolum Zamanı)</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-500">RCT / JAMA</span>
            </div>
            <p className="text-[11px]">
              Hernández G, Ospina-Tascón GA, Damiani LP, et al. <em>Effect of a Resuscitation Strategy Targeting Peripheral Perfusion Status vs Serum Lactate Levels on 28-Day Mortality Among Patients With Septic Shock.</em> JAMA. 2019;321(7):654–664.
            </p>
            <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → Kapiller dolum zamanı (CRT) rehberli perfüzyon izlemi, tek başına laktat klirensi takibine kıyasla daha hızlı perfüzyon yanıtı ve daha az organ disfonksiyonu sağlamıştır.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>7. ESC Kalp Yetersizliği &amp; Akut RV / Pulmoner HT</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-500">ESC · ATS/ERS</span>
            </div>
            <p className="text-[11px]">
              McDonagh TA, et al. <em>ESC Heart Failure Guidelines.</em> Eur Heart J. 2021;42(36):3599–3726; Lahm T, et al. <em>Assessment and Management of Right Ventricular Failure.</em> Am J Respir Crit Care Med. 2018;198(8):e15–e41.
            </p>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → Kardiyojenik şokta Dobutamin/Milrinon basamakları; RV yetmezliğinde PVR-nötr Vazopressin (PVR/SVR oranını iyileştirir), iNO/Milrinon ve aşırı sıvıdan kaçınma.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>8. Refrakter Vazopleji &amp; Anestezi Farmakolojisi</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-500">Derleme &amp; Textbook</span>
            </div>
            <p className="text-[11px]">
              Hosseinian L, et al. <em>Methylene Blue for Vasoplegic Syndrome.</em> Ann Thorac Surg. 2016;101(3):1206–1212; Gropper MA, et al. <em>Miller&apos;s Anesthesia</em> (10th Ed.); Barash PG, et al. <em>Clinical Anesthesia</em>.
            </p>
            <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → sGC inhibisyonu (Metilen Mavisi), Efedrin/Fenilefrin perioperatif yönetimi, adrenerjik reseptör afiniteleri ve ekstravazasyon (Fentolamin) protokolü.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
