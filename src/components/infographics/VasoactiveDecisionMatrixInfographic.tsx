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
        pearl: 'Aşırı afterload artışı sol ventrikülü yormaya başlayabilir. MAP > 65 hedefine ulaşılamıyorsa 2. ajan (Vazopressin) eklenmelidir.'
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
        pearl: 'Katekolamin reseptör duyarsızlaşması başlar. Periferik nekroz riski uçurur. Acil Vazopressin, Steroid veya Metilen Mavisi devreye girmelidir.'
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
      'Gereksiz aşırı dozda splanknik ve renal vazokonstriksiyon ile mezenterik/periferik iskemi yapabilir.',
      'Periferik damar yolu ekstravazasyonunda doku nekrozu! Fentolamin (5-10 mg) lokal antidottur.'
    ]
  },
  {
    id: 'adrenalin',
    name: 'Adrenalin (Epinefrin)',
    subTitle: 'Kardiyak Arrest, Anafilaksi & Dirençli Düşük Debili Şok',
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
    mvo2RiskText: 'Miyokardiyal O2 tüketimini (MVO2) en agresif artıran ajandır. Koroner arter hastalığında anjina ve taşiaritmiyi tetikleyebilir.',
    cautionNotes: [
      'Glikoliz uyarısıyla geçici Tip B laktat artışı ve hipokalemi/hiperglisemi yapar; kan gazında laktatı körü körüne organ yetmezliği sanmayın.',
      'Şiddetli taşikardi (>120/dk) diyastolik doluşu bozup kardiyak debiyi paradoksal olarak düşürebilir.'
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
        pearl: 'Alfa-1 etkisiyle sistemik vazokonstriksiyon yapar. Taşikardi ve atriyal fibrilasyon insidansı Noradrenalin\'den 2-3 kat daha yüksektir.'
      }
    ],
    preparationTR: {
      form: '200 mg / 5 mL ampul',
      dilution: '200 mg (1 ampul) + 45 mL SF (50 mL)',
      concentration: '4000 mcg/mL (4 mg/mL)',
      quickRate70kg: '5 mcg/kg/dk = 5.25 mL/saat (4000 mcg/mL ile)'
    },
    mvo2RiskText: 'Taşiaritmi potansiyeli çok yüksektir; MVO2 dramatik artar. SOAP-II çalışmasında Noradrenalin\'e göre belirgin aritmik mortalite artışı gösterilmiştir.',
    cautionNotes: [
      'Sağkalım avantajı olmaması ve aşırı aritmojenite nedeniyle septik şokta 1. basamak kılavuzlardan çıkarılmıştır.',
      'Sadece semptomatik bradikardi eşlik eden hipotansiyonda veya Noradrenalin bulunamadığında alternatif düşünülür.'
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
        range: '0.1 – 0.5 mcg/kg/dk (Bolus: 50-100 mcg)',
        label: 'Standart / Titrasyon',
        primaryReceptor: 'α1 +++++',
        secondaryReceptors: 'Sıfır β1, Sıfır β2',
        co: -1, // Afterload artışı ve bradikardi ile CO düşebilir!
        svr: 3,
        hr: -1, // Refleks vagal bradikardi!
        pvr: 2,
        mvo2: 0,
        arrhythmiaRisk: 'Düşük',
        pearl: 'Arteriyel basınca bağlı baroreseptör deşarjı güçlü vagal refleks bradikardi yaratır. Taşikardi istemediğimiz olgularda (HOCM, AS, anestezi indüksiyonu) idealdir.'
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
      dilution: '10 mg ampulü 100 mL SF içine seyreltin (100 mcg/mL). Bolus için 1 mL çekip 9 mL SF ile 10 mcg/mL veya direkt 50-100 mcg/mL kullanın.',
      concentration: '100 mcg/mL',
      quickRate70kg: '0.5 mcg/kg/dk = 21 mL/saat (100 mcg/mL ile)'
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
    subTitle: 'Adrenerjik Olmayan V1 Endotelyal Vazokonstriktör',
    classType: 'Vazopresör',
    mechanism: 'Vasküler düz kas V1a reseptörlerini uyararak Gq/IP3-kalsiyum yolunu aktive eder. Asidozda katekolaminler iflas ederken V1 çalışmaya devam eder.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '0.01 – 0.03 IU/dk (Sabit Doz)',
        label: 'Kombinasyon / Katekolamin Koruyucu',
        primaryReceptor: 'V1a +++++ (Vasküler)',
        secondaryReceptors: 'V2 (Renal toplayıcı tübül), V3 (Hipofiz)',
        co: 0,
        svr: 3,
        hr: 0,
        pvr: -1, // Pulmoner endotelyal NO salınımı ile pulmoner vazodilatasyon!
        mvo2: 0,
        arrhythmiaRisk: 'Çok Düşük',
        pearl: 'Pulmoner yataktaki V1 uyarımı endotelyal Nitrik Oksit (NO) sentezini uyararak PVR\'ı düşürebilir! Bu yüzden pulmoner hipertansiyonda Noradrenalin\'den üstündür.'
      },
      {
        range: '> 0.04 IU/dk',
        label: 'Yüksek Doz (İskemi Riski)',
        primaryReceptor: 'V1a +++++',
        secondaryReceptors: 'Sistemik & Koroner vazokonstriksiyon',
        co: -1,
        svr: 3,
        hr: 0,
        pvr: 0,
        mvo2: 1,
        arrhythmiaRisk: 'Düşük',
        pearl: 'Doz > 0.03 IU/dk üstüne çıkıldığında koroner, splanknik ve cilt vazokonstriksiyonu ile mezenter ve ekstremite nekrozu riski hızla tırmanır. Titre edilmez, sabit verilir.'
      }
    ],
    preparationTR: {
      form: '20 IU / 1 mL ampul',
      dilution: '20 IU + 99 mL SF (Toplam 100 mL) veya 50 mL içine 20 IU',
      concentration: '0.2 IU/mL (100 mL içine konulduğunda)',
      quickRate70kg: '0.03 IU/dk = 9 mL/saat (0.2 IU/mL ile, kilodan bağımsız sabit doz)'
    },
    mvo2RiskText: 'Doğrudan pozitif inotropik veya taşikardik etkisi yoktur; taşiaritmi yapmaz. Ancak yüksek dozda koroner vazospazma yol açabilir.',
    cautionNotes: [
      'Asla bolus verilmez ve kan basıncına göre anlık titre edilmez; 0.01 - 0.03 IU/dk sabit infüzyon hızıyla Noradrenalin dozunu düşürmek için kullanılır.',
      'Sepsiste rölatif vazopressin eksikliğini replase eder (VASST çalışması).'
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
    mechanism: 'Hücre içi kalsiyum miktarını artırmadan Troponin C\'ye kalsiyum bağlanmasını stabilize eder; diyastolü bozmaz (lusitropi). K-ATP kanallarını açarak vazodilatasyon sağlar.',
    defaultTierIndex: 0,
    tiers: [
      {
        range: '0.05 – 0.2 mcg/kg/dk (24 Saat İnfüzyon)',
        label: 'Standart İnfüzyon',
        primaryReceptor: 'Troponin C + K-ATP Kanalları',
        secondaryReceptors: 'PDE-3 (Hafif inhibitör etki)',
        co: 3,
        svr: -2,
        hr: 0,
        pvr: -2,
        mvo2: 0, // Kalsiyum yükü artmadığı için MVO2 artışı YOKTUR!
        arrhythmiaRisk: 'Düşük',
        pearl: 'Hücre içine kalsiyum sokmadığı için MVO2\'yi artırmaz, aritmi riski minimaldir. Aktif metaboliti OR-1896 sayesinde etkisi 7-9 gün boyunca sürer.'
      }
    ],
    preparationTR: {
      form: '12.5 mg / 5 mL flakon (2.5 mg/mL)',
      dilution: '12.5 mg (1 flakon) + 495 mL %5 Dekstroz (500 mL)',
      concentration: '25 mcg/mL (0.025 mg/mL)',
      quickRate70kg: '0.1 mcg/kg/dk = 16.8 mL/saat (70 kg için, 25 mcg/mL ile)'
    },
    mvo2RiskText: 'İskemik kalp hastaları için en koruyucu inotropik mekanizmadır. Oksijen sarfiyatını artırmadan kardiyak debiyi artırır ve miyokardı korur.',
    cautionNotes: [
      'Başlangıçta bolus (6-12 mcg/kg) verilirse ağır hipotansiyon yapar; bolussuz doğrudan 0.1 mcg/kg/dk infüzyon önerilir.',
      'Hipotansiyonu önlemek için genellikle Noradrenalin ile kombine edilir.'
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
    synergyRationale: 'İki farklı reseptör yolağı (Adrenerjik + Vasküler V1). Noradrenalin dozu > 0.25 mcg/kg/dk olduğunda Vazopressin eklenmesi "katekolamin toksisitesini" azaltır, taşiaritmiyi kırar ve mortaliteyi düşürür (VASST çalışması).',
    pearl: 'Vazopressin pulmoner endotelyal NO salınımını uyararak PVR\'ı düşürürken sistemik MAP\'i yükseltir.',
    warning: 'Noradrenalin aniden kesilmemeli; önce Noradrenalin titre edilerek düşürülmeli, en son Vazopressin kesilmelidir.',
    badge: 'Yoğun Bakım Altın Standardı',
    color: 'emerald'
  },
  {
    title: 'Vazopressin + Milrinon',
    drugA: 'Vazopressin (V1)',
    drugB: 'Milrinon (PDE-3i)',
    indication: 'Akut Sağ Ventrikül Yetersizliği & Pulmoner Hipertansiyon',
    synergyRationale: 'Sağ kalp için "Rüya Kombinasyon": Milrinon RV kontraktilitesini artırıp PVR\'ı agresif düşürür. Milrinon\'un sistemik hipotansiyon yan etkisini ise Vazopressin pulmoner basıncı yükseltmeden dengeler.',
    pearl: 'Noradrenalin yerine Vazopressin seçilmesi, PVR\'ın artmasını engeller ve RV koroner perfüzyonunu korur.',
    warning: 'Milrinon birikimini önlemek için böbrek fonksiyonları (kreatinin klirensi) yakın takip edilmelidir.',
    badge: 'RV Kurtarma İkilisi',
    color: 'teal'
  },
  {
    title: 'Noradrenalin + Dobutamin',
    drugA: 'Noradrenalin (α1/β1)',
    drugB: 'Dobutamin (β1/β2)',
    indication: 'Kardiyojenik Şok & Sepsise Bağlı Kardiyomiyopati',
    synergyRationale: 'Noradrenalin kritik MAP ve koroner perfüzyon basıncını garantiye alırken, Dobutamin düşük kardiyak debiyi (CI < 2.2) ve periferik doku perfüzyonunu toparlar.',
    pearl: 'Tek başına Dobutamin hipotansiyon yapabilir; Noradrenalin ile MAP ≥ 65 mmHg sağlandıktan sonra Dobutamin eklenmelidir.',
    warning: 'Hastada taşikardi (>115-120/dk) başlarsa Dobutamin azaltılmalı veya Milrinon/Levosimendan\'a geçilmelidir.',
    badge: 'Kardiyojenik Şok Protokolü',
    color: 'blue'
  },
  {
    title: 'Noradrenalin + Levosimendan',
    drugA: 'Noradrenalin (α1/β1)',
    drugB: 'Levosimendan (Ca Duyarlılaştırıcı)',
    indication: 'Düşük EF\'li Kardiyak Cerrahi Sonrası Weaning & İskemik Kalp',
    synergyRationale: 'Levosimendan hücre içine kalsiyum sokmadan miyokardı güçlendirir ve koronerleri genişletir. Noradrenalin ise K-ATP kaynaklı sistemik vazodilatasyonu dengeleyerek perfüzyonu korur.',
    pearl: 'Etkisi 7-9 gün sürdüğü için yoğun bakımdan çıkış sürecinde uzun süreli hemodinamik stabilite sağlar.',
    warning: 'Levosimendan infüzyonu esnasında volüm durumunun (CVP / Ultrason IVC) tam olması şarttır.',
    badge: 'Kalsiyum Koruyucu İkili',
    color: 'indigo'
  },
  {
    title: 'Dirençli Vazopleji Üçlüsü: NA + AVP + Metilen Mavisi',
    drugA: 'Noradrenalin + Vazopressin',
    drugB: 'Metilen Mavisi (1.5-2 mg/kg IV)',
    indication: 'KPB Sonrası / Ağır Sepsiste Refrakter Vazoplejik Şok',
    synergyRationale: 'Aşırı Nitrik Oksit (NO) sentezi guanilat siklazı uyararak damar düz kasını felç eder. Metilen mavisi çözünür guanilat siklazı (sGC) bloke ederek vazoplejiyi 15-30 dakikada kırar.',
    pearl: 'Katekolamin infüzyon hızlarını dakikalar içinde yarı yarıya düşürerek periferik ampütasyon riskini önler.',
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
      firstChoice: 'Noradrenalin (Hedef MAP ≥ 65)',
      secondChoice: 'Erken Vazopressin (0.03 IU/dk sabit)',
      contraindicated: 'Dopamin ve Adrenalin (Aşırı aritmojenik, AF hızını ölümcül seviyeye taşır)'
    },
    clinicalDecisionRationale: 'Noradrenalin hafif beta uyarısıyla taşikardiyi azdırabilir; bu nedenle Noradrenalin 0.25 mcg/kg/dk\'ya ulaştığında vakit kaybetmeden Vazopressin eklenmelidir. Dopamin kesinlikle YASAKTIR.',
    keyRule: 'Taşikardik septik hastada Vazopressin, katekolamin sparing etkisiyle kalp hızını düşürmeye yardımcı olur.'
  },
  {
    id: 'cardiogenic-shock',
    title: 'Akut MI Sonrası Kardiyojenik Şok (Düşük Debi + Yüksek SVR)',
    clinicalPresentation: 'Geniş ön yüz STEMI, soğuk soluk ekstremiteler, oligüri, akciğerde yaygın krepitan raller.',
    vitals: { hr: '105 /dk', bp: '82/55 (MAP 64)', ci: '1.6 L/dk/m²', svr: '1950 dyn·s/cm⁵', lactate: '5.2 mmol/L' },
    pathophysiology: 'Sol ventrikül pompa iflası, ileriye debi yok, kompansatuar aşırı vazokonstriksiyon (afterload çok yüksek).',
    recommendedLine: {
      firstChoice: 'Noradrenalin (Perfüzyon MAP koruması) + Dobutamin (İnotrop)',
      secondChoice: 'Milrinon veya Levosimendan (Afterload düşürücü inodilatatör)',
      contraindicated: 'Yüksek doz Fenilefrin (SVR\'ı daha da artırarak kalbi kilitler)'
    },
    clinicalDecisionRationale: 'Önce Noradrenalin ile diyastolik koroner perfüzyon basıncı (MAP ≥ 65) sağlanır; ardından Dobutamin ile kontraktilite artırılır. Hasta beta-bloker altındaysa Dobutamin yerine Milrinon seçilmelidir.',
    keyRule: 'SVR zaten yüksekken saf vazokonstriktör (Fenilefrin) vermek kalp debisini sıfırlar!'
  },
  {
    id: 'massive-pe-rv',
    title: 'Masif Pulmoner Emboli & Akut Sağ Ventrikül Dekompanzasyonu',
    clinicalPresentation: 'Ani nefes darlığı, hipotansiyon, boyun venöz dolgunluğu, EKO\'da genişlemiş RV ve D-şekilli septum.',
    vitals: { hr: '118 /dk', bp: '78/48 (MAP 58)', ci: '1.8 L/dk/m²', svr: '1100 dyn·s/cm⁵', lactate: '3.9 mmol/L' },
    pathophysiology: 'Pulmoner vasküler direnç (PVR) fırlamış, RV afterload\'a karşı kasılamıyor, koroner perfüzyonu bozulmuş ve iskemide.',
    recommendedLine: {
      firstChoice: 'Noradrenalin (RV koroner perfüzyonunu kurtarmak için şart)',
      secondChoice: 'Vazopressin (PVR\'ı artırmaz) + İnhale İloprost veya Milrinon',
      contraindicated: 'Agresif Sıvı Yüklemesi & Yüksek Doz Fenilefrin (PVR\'ı uçurur)'
    },
    clinicalDecisionRationale: 'RV sadece diyastolde değil sistolde de perfüze olur; sistemik MAP düşerse RV iskemiye girer ve durur. Noradrenalin sistemik basıncı sağlayarak RV iskemi kısır döngüsünü kırar. Aşırı sıvı RV\'yi daha da gerer ve sol ventrikülü ezer.',
    keyRule: 'Akut RV yetmezliğinde sıvı TEDAVİ DEĞİL ZEHİRDİR. Vazopressin pulmoner NO salınımıyla PVR\'ı düşürür.'
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
      contraindicated: 'Dobutamin, Adrenalin, İzoproterenol, Dopamin (KESİNLİKLE YASAK)'
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
      firstChoice: 'Vazopressin (0.03 IU/dk - Asidozda V1 reseptörleri duyarlıdır)',
      secondChoice: 'Metilen Mavisi (1.5-2 mg/kg IV) + Hidrokortizon (200 mg/gün)',
      contraindicated: 'Noradrenalin Dozunu Sürekli Artırmak (Perifer nekrozu yapar, reseptör tıkalıdır)'
    },
    clinicalDecisionRationale: 'Adrenerjik reseptörler asidozda yanıt vermezken V1 reseptör fonksiyonu korunur. Metilen mavisi NO/cGMP yolağını durdurarak dakikalar içinde yanıt üretir.',
    keyRule: 'Asidozda inatla katekolamin artırmak yerine non-adrenerjik kurtarma (Vazopressin + Metilen Mavisi) başlatılmalıdır.'
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

              {/* MVO2 and Safety Note */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
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
              → Noradrenalin 1. basamak vazopresör; Vazopressin (0.02-0.05 IU/dk) 2. basamak katekolamin koruyucu ajan; Dobutamin inotrop ekleme kriterleri.
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
              → Dopamin kolunda anlamlı düzeyde artmış aritmojenik mortalite ve taşiaritmi kanıtlanmıştır; şokta 1. basamak kullanım dışıdır.
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
              → Düşük/orta doz şokta erken Vazopressin eklenmesinin katekolamin ihtiyacını azaltması ve sağkalım avantajı.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>4. ESC Kalp Yetersizliği & Kardiyojenik Şok</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500">ESC Kılavuzu</span>
            </div>
            <p className="text-[11px]">
              McDonagh TA, Metra M, Adamo M, et al. <em>2021/2023 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure.</em> Eur Heart J. 2021;42(36):3599–3726.
            </p>
            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → Dobutamin, Milrinon ve Levosimendan inotropik basamakları; beta-bloker altındaki hastada PDE-3i/kalsiyum duyarlılaştırıcı üstünlüğü.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>5. Akut Sağ Ventrikül Yetersizliği & Pulmoner HT</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-500">ATS / ERS</span>
            </div>
            <p className="text-[11px]">
              Lahm T, Douglas IS, Archer SL, et al. <em>Assessment and Management of Right Ventricular Failure: A Comprehensive Review.</em> Am J Respir Crit Care Med. 2018;198(8):e15–e41.
            </p>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → RV koroner perfüzyon basıncını korurken PVR'yi düşürme stratejisi (Vazopressin + PDE-3i sinerjisi; aşırı hacim yüklemesinden kaçınma).
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>6. Refrakter Vazopleji & Metilen Mavisi Protokolü</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-500">Sistematik Derleme</span>
            </div>
            <p className="text-[11px]">
              Hosseinian L, Weiner M, Levin MA, Fischer GW. <em>Methylene Blue for Vasoplegic Syndrome: A Systematic Review.</em> Ann Thorac Surg. 2016;101(3):1206–1212.
            </p>
            <div className="text-[10px] text-purple-600 dark:text-purple-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800/80">
              → Guanilat siklaz (sGC) inhibisyonu ile nitrik oksit aşırı üretimini durdurup dirençli vazoplejiyi kırma prensibi.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 space-y-1 md:col-span-2">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>7. Farmakolojik Standartlar: Miller's Anesthesia & Barash Clinical Anesthesia</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-500">Temel Kaynak</span>
            </div>
            <p className="text-[11px]">
              Gropper MA, et al. <em>Miller's Anesthesia (9th Ed, Elsevier, 2020)</em>; Barash PG, et al. <em>Clinical Anesthesia (8th Ed, Wolters Kluwer)</em>. Otonom sinir sistemi, adrenerjik reseptör afiniteleri, miyokardiyal oksijen tüketimi ($MVO_2$) ve ekstravazasyon (Fentolamin) yönetimi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
