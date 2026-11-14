import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Compass,
  ExternalLink,
  Gauge,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Waves
} from 'lucide-react';

interface ArterialCannulationModuleProps {
  isDark: boolean;
}

type ArterySiteId = 'radial' | 'brachial' | 'femoral' | 'axillary' | 'ulnar' | 'dorsalis-pedis';
type DampingStateId = 'optimal' | 'overdamped' | 'underdamped';

interface ArterySiteSpec {
  id: ArterySiteId;
  shortName: string;
  title: string;
  priorityBadge: string;
  catheterSpec: string;
  anatomyAndPosition: string;
  collateralStatus: string;
  keyAdvantages: string[];
  criticalRisksAndPrecautions: string[];
  usgNotes: string;
}

const ARTERY_SITES: Record<ArterySiteId, ArterySiteSpec> = {
  radial: {
    id: 'radial',
    shortName: 'Radiyal Arter',
    title: 'Radiyal Arter — Standart 1. Tercih Perioperatif Erişim',
    priorityBadge: '1. Tercih (Altın Standart)',
    catheterSpec: '20G (32–45 mm · erişkin standart) · Pediatride 22G–24G · Seldinger veya Over-the-Needle',
    anatomyAndPosition:
      'El bileği volar yüzünde, radius stiloid çıkıntısının 1–2 cm proksimalinde, fleksör karpi radialis (FKR) tendonu lateralinde yüzeyel seyreder. El bileği 30–45° dorsifleksiyona getirilir (gazlı bez rulosu üzerine hafif destek); > 60° aşırı hiperekstansiyon arteri gerip lümeni daraltır!',
    collateralStatus:
      'Çift dolaşım: Ulnar arter ile yüzeyel ve derin palmar arkuslar üzerinden güçlü kollateral ağ mevcuttur (ancak %5–15 olguda arkus inkomplettir).',
    keyAdvantages: [
      'Cilde çok yakın (~2–5 mm), tam basılabilir ve hemostazı kolaydır; sinir komşuluğu minimaldir (sadece yüzeyel radial sinir dalı lateraldedir).',
      'Kollateral dolaşım sayesinde kalıcı el iskemisi riski son derece düşüktür (< %0.1); hasta konforu ve bakımı en kolay bölgedir.'
    ],
    criticalRisksAndPrecautions: [
      'Johnston 2025 Damar Koruma: KBH/AV fistül adayı hastada ve yakın dönemde koroner by-pass/anjio grefti (radial arter) planlanan kolda korunmalıdır.',
      'Periferik vazokonstriksiyon/şokta distal-santral sistolik basınç farkı (vasopresör direnci) gelişebilir; gerekirse femoral veya brakiyal teyit gerekir.'
    ],
    usgNotes:
      'Lineer yüksek frekanslı prob (10–15 MHz) ile Out-of-Plane (OOP) Dinamik İğne Ucu Takibi (DNTP) ilk giriş başarısını belirgin artırır. Sıklıkla radiyal arter her iki yanında iki eşlikçi ven (venae comitantes) ile görülür — doppler veya kompresyonla ayırt edilir.'
  },
  brachial: {
    id: 'brachial',
    shortName: 'Brakiyal Arter',
    title: 'Brakiyal Arter — Antekübital Fossa Erişimi (End-Arter Dikkat!)',
    priorityBadge: '2. / Alternatif Seçenek',
    catheterSpec: '20G veya geniş lümende 18G (45–50 mm uzun kateter) · Tercihen USG eşliğinde',
    anatomyAndPosition:
      'Antekübital fossada biseps brachii aponevrozunun (lacertus fibrosus) altında, biseps tendonunun hemen MEDİALİNDE ve MEDİAN SİNİRİN hemen LATERALİNDE seyreder. Kol supinasyonda tam ekstansiyona alınır ve kateterizasyon sonrası dirsek fleksiyonunu önleyen kol ateli (armboard) uygulanır.',
    collateralStatus:
      'FONKSİYONEL SON-ARTER (End-Artery): Radiyal/ulnar gibi tam bir distal arkus kollaterali yoktur (sadece derin brakiyal arter üzerinden sınırlı periartiküler kollateraller bulunur).',
    keyAdvantages: [
      'Şok, şiddetli hipotermi veya yüksek doz vazopresör altında radiyal/ulnar arter spazmında güçlü ve güvenilir santrale yakın basınç trasesi sağlar.',
      'Femoral katetere göre hastanın mobilizasyonunu daha az kısıtlar ve kasık enfeksiyon riskinden kaçınılmasını sağlar (kalp/aortik cerrahide sık tercih edilir).'
    ],
    criticalRisksAndPrecautions: [
      'Kritik İskemi Riski: Gerçek end-arter niteliği nedeniyle tromboz veya distal emboli gelişirse tüm ön kol ve el iskemisi gelişebilir! Handlogten (2014) 21.597 vakalık seride majör komplikasyon oranı %0.19 saptansa da sıkı takip şarttır.',
      'Median Sinir Hasarı: Median sinir brakiyal arterin hemen medialindedir; kör çoklu denemeler ve antekübital hematom akut median nöropati ve kompartman sendromu yapabilir.',
      'Saatlik Distal Takip: Radiyal nabız, el ısısı, kapiller dolum ve parmak SpO₂ pletismografisi sürekli izlenir; iskemi/parestezi bulgusunda kateter DERHAL çekilir.'
    ],
    usgNotes:
      'Brakiyal arter kateterizasyonunda MUTLAKA USG önerilir: prob ile biseps tendonu, eşlikçi brakiyal venler ve hemen medialdeki petek görünümlü (honeycomb) Median Sinir netleştirilerek tek geçişte anterior duvar ponksiyonu yapılır.'
  },
  femoral: {
    id: 'femoral',
    shortName: 'Femoral Arter',
    title: 'Femoral Arter — Şok, Kardiyak Cerrahi & KPR Erişimi',
    priorityBadge: 'Şok / KPR / Majör Kardiyak',
    catheterSpec: '18G veya 20G · 10–16 cm Seldinger arter kateter seti (kısa periferik kanül çıkıp hematom yapar!)',
    anatomyAndPosition:
      'İnguinal ligamanın (ASIS – pubik tüberkül hattı) 1–2 cm DİSTALİNDE, "NAVEL" sırasına göre Femoral Sinirin medialinde ve Femoral Venin lateralinde palpe edilir. Kalça nötral/hafif dış rotasyondadır.',
    collateralStatus:
      'Alt ekstremite ana besleyici arteri olmakla birlikte derin femoral arter (profunda femoris) bifurkasyonu önemli bir kollateral ağ sağlar; girişim bifurkasyonun üstünde (ana femoral arter) ancak inguinal ligaman altında olmalıdır.',
    keyAdvantages: [
      'Santral aortik basıncı ve gerçek MAP/Sistolik basıncı en doğru yansıtan bölgedir; derin şok ve kardiyopulmoner bypass çıkışı vazoplejide radiyal arterin yalancı düşük okumalarından etkilenmez.',
      'Nabzın alınamadığı KPR veya masif hemorajik şokta büyük çapı nedeniyle USG/landmark ile hızla takılabilir; termodilüsyon (PiCCO) kateterleri için de standarttır.'
    ],
    criticalRisksAndPrecautions: [
      'Retroperitoneal Hematom (Hayati Tehlike): İnguinal ligamanın ÜZERİNE yapılan ponksiyonlarda bası uygulanamayan eksternal iliak arter retroperitona gizlice kanar!',
      'Enfeksiyon (CLABSI) ve İskemi: Kasık florası nedeniyle enfeksiyon riski periferik hatlardan yüksektir (mümkün olan en kısa sürede çıkarılmalıdır); alt ekstremite perfüzyonu ve dorsalis pedis nabzı izlenir.'
    ],
    usgNotes:
      'USG ile ana femoral arter–derin femoral arter bifurkasyonu görüntülenip mutlaka bifurkasyonun proksimalinden (ancak inferior epigastrik arter/inguinal ligaman altında) girilir; ön duvarda kalsifik plak yoksa tek duvar ponksiyonu yapılır.'
  },
  axillary: {
    id: 'axillary',
    shortName: 'Aksiller Arter',
    title: 'Aksiller Arter — Uzun Süreli YBÜ & Periferik Erişim Yokluğu',
    priorityBadge: 'YBÜ / Alternatif Santral',
    catheterSpec: '18G veya 20G · 10–16 cm Seldinger arter kateteri',
    anatomyAndPosition:
      'Kol 90–120° abdüksiyona ve hafif dış rotasyona getirilir; aksilla kıvrımında pektoralis majör alt kenarında, aksiller venin süperior/lateralinde ve brakiyal pleksus fasiküllerinin ortasında palpe edilir.',
    collateralStatus:
      'Geniş skapular ve humerosirkümfleks kollateral ağı nedeniyle üst ekstremite distal iskemi riski brakiyale göre daha düşüktür.',
    keyAdvantages: [
      'Femoral katetere kıyasla enfeksiyon riski düşüktür ve aortik basınç dalgasına çok yakın santral ölçüm sunar.',
      'Yanık, periferik vasküler hastalık veya bilateral radiyal/femoral kontrendikasyonda uzun süreli YBÜ takibi için uygundur.'
    ],
    criticalRisksAndPrecautions: [
      'Serebral Emboli Riski: Özellikle SOL aksiller artere kıyasla SAĞ aksiller arter brakiyosefalik/karotis ağızlarına yakındır — yüksek basınçlı veya uzun süreli flush sırasında hava/pıhtı serebral dolaşıma kaçabilir! Nazik kısa flush şarttır.',
      'Brakiyal Pleksus Kompresyonu: Aksiller kılıf içinde hematom gelişirse hızla brakiyal pleksus nöropatisi yapar (koagülopatide USG ile çok dikkatli olunmalıdır).'
    ],
    usgNotes:
      'Deltopektoral oluk / aksiller yaklaşım lineer prob ile taranarak aksiller arter çevresindeki lateral/medial/posterior pleksus kordlarından ve aksiller venden güvenli pencere seçilir.'
  },
  ulnar: {
    id: 'ulnar',
    shortName: 'Ulnar Arter',
    title: 'Ulnar Arter — Radiyal Arter Korunması veya Tıkanıklığında Alternatif',
    priorityBadge: 'Alternatif Bilek Erişimi',
    catheterSpec: '20G (32–45 mm)',
    anatomyAndPosition:
      'El bileği volar-ulnar tarafında, fleksör karpi ulnaris (FKU) tendonunun hemen radialinde ve Ulnar Sinirin hemen LATERALİNDE seyreder.',
    collateralStatus:
      'Sağlam ve açık bir radiyal arter varlığında elin kollateral dolaşımı palmar arkuslar üzerinden korunur. Aynı kolda radiyal arter zaten tıkalı/hasarlıysa ulnar kateterizasyon EL İSKEMİSİNE yol açabilir!',
    keyAdvantages: [
      'Önceden radiyal arter hasarı olmayan, ancak radiyal arterin koroner greft veya AV fistül için saklanması gereken olgularda aynı bilek konforunu sağlar.'
    ],
    criticalRisksAndPrecautions: [
      'Aynı bilekte başarısız radiyal girişim veya radiyal hematom/spazm sonrası ulnar artere geçmek palmar arkus tek yanlı kalabileceği için son derece risklidir (kontralateral taraf tercih edilmelidir).',
      'Ulnar sinir komşuluğu nedeniyle Guyon kanalı içinde sinir irritasyonuna dikkat edilir.'
    ],
    usgNotes:
      'Ulnar arter radiyale göre biraz daha derinde seyreder; USG ile mediale düşen ulnar sinir ayrıştırılarak güvenle kanüle edilir.'
  },
  'dorsalis-pedis': {
    id: 'dorsalis-pedis',
    shortName: 'Dorsalis Pedis',
    title: 'Dorsalis Pedis (ve Posterior Tibial) Arter — Alt Ekstremite Periferik',
    priorityBadge: 'Üst Ekstremite Kısıtlıysa',
    catheterSpec: '20G veya 22G (25–32 mm)',
    anatomyAndPosition:
      'Ayak sırtında, ekstansör hallusis longus (EHL) tendonunun hemen LATERALİNDE (1. ve 2. metatarsal kemikler arası proksimalde) palpe edilir. Ayak hafif plantar fleksiyona getirilir.',
    collateralStatus:
      'Plantar arkus üzerinden posterior tibial arter ile kollateral bağlantı mevcuttur (diyabet ve periferik arter hastalığında bu ağ zayıflar).',
    keyAdvantages: [
      'İki üst ekstremitenin de yanık, travma, ortopedik cerrahi veya bilateral mastektomi/AV fistül nedeniyle kullanılamadığı durumlarda hızlı ve basılabilir periferik erişim sağlar.'
    ],
    criticalRisksAndPrecautions: [
      'Nabız Dalga Amplifikasyonu (Miller’s Anesthesia): Kalpten çok uzak olduğu için sistolik basınç santrale göre 10–20 mmHg DAHA YÜKSEK, diyastolik basınç 10–15 mmHg daha düşük ölçülür; ancak Ortalama Arter Basıncı (MAP) güvenilirdir.',
      'Diyabetik ayak, ileri ateroskleroz veya yüksek vazopresör ihtiyacında ayak parmağı nekrozu riski nedeniyle kullanılmamalıdır.'
    ],
    usgNotes:
      'Çok yüzeyel (1–3 mm) olduğu için düşük basılı (hafif jel yastığı ile) lineer prob kullanılmalıdır; aksi halde prob basısı arteri kolayca kollabe eder.'
  }
};

const ARTERY_COMPARE_TABLE: {
  site: string;
  gauge: string;
  collateral: string;
  thrombosisOrIschemiaRisk: string;
  keyNote: string;
  highlight?: boolean;
}[] = [
  {
    site: 'Radiyal Arter',
    gauge: '20G · 32–45 mm',
    collateral: 'İyi (Ulnar – Palmar Arkus)',
    thrombosisOrIschemiaRisk: 'Klinik iskemi < %0.1 (geçici oklüzyon sık)',
    keyNote: '1. tercih; KBH/AVF ve radial greft adaylarında koru'
  },
  {
    site: 'Brakiyal Arter',
    gauge: '20G/18G · 45–50 mm',
    collateral: 'Kısıtlı (Fonksiyonel End-Arter)',
    thrombosisOrIschemiaRisk: 'Majör komp. ~%0.19 · Median sinir riski',
    keyNote: 'Antekübital fossa; dirsek ateli + saatlik radiyal nabız takibi şart',
    highlight: true
  },
  {
    site: 'Femoral Arter',
    gauge: '18G/20G · 10–16 cm',
    collateral: 'Profunda Femoris ağı',
    thrombosisOrIschemiaRisk: 'Retroperitoneal hematom & yüksek enfeksiyon',
    keyNote: 'Şok/KPR/kardiyakta gerçek santral basınç; ligaman ALTINA gir'
  },
  {
    site: 'Aksiller Arter',
    gauge: '18G/20G · 10–16 cm',
    collateral: 'Zengin Skapular ağ',
    thrombosisOrIschemiaRisk: 'Brakiyal pleksus basısı & sağda serebral emboli',
    keyNote: 'Uzun süreli YBÜ alternatifi; hızlı/büyük hacim flush YASAK'
  },
  {
    site: 'Ulnar Arter',
    gauge: '20G · 32–45 mm',
    collateral: 'İyi (Radiyal açık ise)',
    thrombosisOrIschemiaRisk: 'Aynı kolda radiyal tıkalıysa el iskemisi!',
    keyNote: 'Başarısız aynı-taraf radiyal sonrası tercih etme'
  },
  {
    site: 'Dorsalis Pedis',
    gauge: '20G/22G · 25–32 mm',
    collateral: 'Posterior Tibial (Plantar arkus)',
    thrombosisOrIschemiaRisk: 'PAH/Diyabette parmak nekrozu riski',
    keyNote: 'Sistolik 10–20 mmHg yüksek okur (MAP güvenilir)'
  }
];

const DAMPING_SPECS: Record<
  DampingStateId,
  {
    label: string;
    flushWaves: string;
    dicroticNotch: string;
    sbpEffect: string;
    dbpEffect: string;
    mapEffect: string;
    commonCauses: string[];
    fixAction: string;
  }
> = {
  optimal: {
    label: 'Optimal Sönümleme (Normal · ζ ≈ 0.5 – 0.7)',
    flushWaves: 'Hızlı Flush sonrası 1.5 – 2 keskin osilasyon ve ardından bazale dönüş',
    dicroticNotch: 'Net ve keskin dikrotik çentik (aort kapağı kapanışı)',
    sbpEffect: 'Gerçek Sistolik',
    dbpEffect: 'Gerçek Diyastolik',
    mapEffect: 'Gerçek MAP',
    commonCauses: [
      'Kısa, sert (non-compliant) basınç hattı (< 120 cm), minimal ara bağlantı ve hava kabarcıksız sıvı sütunu.'
    ],
    fixAction: 'Sistem dinamik yanıtı idealdir; güvenle klinik karar ve PPV/SVV analizi yapılabilir.'
  },
  overdamped: {
    label: 'Aşırı Sönümlü (Overdamped · ζ > 1.0)',
    flushWaves: 'Hızlı Flush sonrası 0 – 1 osilasyon (bazale yavaş, yuvarlak iniş)',
    dicroticNotch: 'Silik veya tamamen kayıp; dalga tepesi künt/yuvarlak',
    sbpEffect: 'YALANCI DÜŞÜK',
    dbpEffect: 'YALANCI YÜKSEK',
    mapEffect: 'Genellikle Doğru (Nabız basıncı daralır!)',
    commonCauses: [
      'Hat içinde veya transdüser kubbesinde HAVA KABARCIĞI (en sık neden)',
      'Kateter ucunda pıhtı/trombüs, bilekte kateter bükülmesi (kink) veya arter duvarına yaslanma',
      'Gevşek Luer bağlantı, sızıntı, basınç torbasının < 300 mmHg inmesi veya yumuşak/uzun IV uzatma hattı'
    ],
    fixAction: 'Hattı aspire et (hava/pıhtıyı geriye çek, ileri itme!), bağlantıları sık, basınç torbasını 300 mmHg şişir ve bilek açısını düzelt.'
  },
  underdamped: {
    label: 'Yetersiz Sönümlü / Rezonans (Underdamped · ζ < 0.3)',
    flushWaves: 'Hızlı Flush sonrası ≥ 3 – 4 yüksek amplitüdlü salınım ("ringing")',
    dicroticNotch: 'Yapay çoklu çentikler ve sivri, ince yüksek tepe ("whip")',
    sbpEffect: 'YALANCI YÜKSEK (+15 ila +30 mmHg)',
    dbpEffect: 'Hafif Yalancı Düşük',
    mapEffect: 'Doğru Kalır',
    commonCauses: [
      'Aşırı uzun (> 150 cm) ve çok sert basınç uzatma hatları + çoklu üç yollu musluklar',
      'Hiperdinamik dolaşım, taşikardi veya yaşlı/sert arter duvarı (rezonans frekansının doğal frekansa yaklaşması)'
    ],
    fixAction: 'Gereksiz uzatma ve ek muslukları çıkar; sistolik tepe yerine MAP değerini baz al veya mekanik damping modülü kullan.'
  }
};

const QUICK_NAV = [
  { id: 'art-sites', label: '1. Endikasyonlar & 6 Bölge' },
  { id: 'art-detail', label: '2. Bölge Rehberi (Brakiyal Dahil)' },
  { id: 'art-technique', label: '3. USG & Seldinger Tekniği' },
  { id: 'art-transducer', label: '4. Sıfırlama & Kare Dalga Testi' },
  { id: 'art-safety', label: '5. Komplikasyon & İlaç Hatası' },
  { id: 'art-ppv-svv', label: '6. PPV & SVV (Sıvı Yanıtlılığı)' },
  { id: 'art-refs', label: '7. Kaynaklar' }
];

const ARTERIAL_REFERENCES = [
  {
    id: 'art-johnston-2025',
    citation:
      'Johnston AJ, Simpson MJ, McCormack V, et al. Association of Anaesthetists guidelines: safe vascular access 2025. Anaesthesia. 2025;80(11):1381–1396.',
    note: 'KBH (AV fistül) ve koroner radial greft adaylarında damar koruma, mastektomi/lenfödem prensipleri, LocSSIPs güvenliği ve ekip standartları.',
    pmid: '40958714',
    doi: '10.1111/anae.16727'
  },
  {
    id: 'art-perseus-2020',
    citation:
      'Lamperti M, Biasucci DG, Disma N, et al. European Society of Anaesthesiology guidelines on peri-operative use of ultrasound-guided for vascular access (PERSEUS). Eur J Anaesthesiol. 2020;37(5):344–376.',
    note: 'Perioperatif arteriyel kanülasyonda (radiyal, brakiyal, femoral, aksiller) rutin dinamik USG kullanımı, OOP/IP teknikler ve ilk geçiş başarı artışı.',
    pmid: '32265391',
    doi: '10.1097/EJA.0000000000001180'
  },
  {
    id: 'art-nuttall-2016',
    citation:
      'Nuttall G, Burckhardt J, Hadley A, et al. Surgical and Patient Risk Factors for Severe Arterial Line Complications in Adults. Anesthesiology. 2016;124(3):590–597.',
    note: '62.626 erişkin arter kateteri analizi: genel ciddi komplikasyon oranı 3.4/10.000; radiyale kıyasla femoral ve brakiyal kateterlerde ve 20G yerine 18G kullanımında risk artışı.',
    pmid: '26640979',
    doi: '10.1097/ALN.0000000000000967'
  },
  {
    id: 'art-handlogten-2014',
    citation:
      'Handlogten KS, Wilson GA, Clifford L, Nuttall GA, Kor DJ. Brachial artery catheterization: an assessment of use patterns and associated complications. Anesth Analg. 2014;118(2):288–295.',
    note: '21.597 brakiyal arter kateterizasyonu incelemesi: majör vasküler/nörolojik komplikasyon ~%0.19; end-arter ve median sinir yakınlığı nedeniyle sıkı distal perfüzyon izlemi şarttır.',
    pmid: '24445630',
    doi: '10.1213/ANE.0000000000000082'
  },
  {
    id: 'art-scheer-2002',
    citation:
      'Scheer B, Perel A, Pfeiffer UJ. Clinical review: complications and risk factors of peripheral arterial catheters used for haemodynamic monitoring in anaesthesia and intensive care medicine. Crit Care. 2002;6(3):199–204.',
    note: 'Radiyal, femoral, aksiller, brakiyal, ulnar ve dorsalis pedis arterlerinin tromboz, hematom, psödoanevrizma ve enfeksiyon oranlarının sistematik derlemesi.',
    pmid: '12133178'
  },
  {
    id: 'art-gardner-1981',
    citation:
      'Gardner RM. Direct blood pressure measurement—dynamic response requirements. Anesthesiology. 1981;54(3):227–236.',
    note: 'Arteriyel basınç monitörizasyonunda doğal frekans, sönümleme katsayısı (ζ), kare dalga (fast-flush) testi ve overdamped/underdamped distorsiyon fiziğinin temel referansı.',
    pmid: '7469106'
  },
  {
    id: 'art-foti-2022',
    citation:
      'Foti L, Michard F, Villa G, et al. The impact of arterial pressure waveform underdamping and resonance filters on cardiac output measurements with pulse wave analysis. Br J Anaesth. 2022;129(1):e6–e8.',
    note: 'Underdamped (rezonant) arteriyel dalga formunun sistolik basıncı ve nabız dalga analiziyle hesaplanan atım hacmi / kardiyak debi değerlerini anlamlı biçimde yapay yükseltebildiğini gösterir.',
    pmid: '35459533',
    doi: '10.1016/j.bja.2022.03.024'
  },
  {
    id: 'art-michard-2000',
    citation:
      'Michard F, Boussat S, Chemla D, et al. Relation between respiratory changes in arterial pulse pressure and fluid responsiveness in septic patients with acute circulatory failure. Am J Respir Crit Care Med. 2000;162(1):134–138.',
    note: 'Mekanik ventilasyonda arteriyel Nabız Basıncı Varyasyonu (PPV ≥ %13) eşiğinin sıvı yanıtlılığını öngörmedeki klasik dönüm noktası klinik çalışması.',
    pmid: '10903232'
  },
  {
    id: 'art-yang-2014',
    citation:
      'Yang X, Du B. Does pulse pressure variation predict fluid responsiveness in critically ill patients? A systematic review and meta-analysis. Crit Care. 2014;18(6):650.',
    note: '22 çalışmalık sistematik derleme & meta-analiz: sinüs ritminde ve kontrollü ventilasyonda PPV eşiği (~%12) için havuzlanmış duyarlılık %88, özgüllük %89 (AUROC 0.94).',
    pmid: '25427970',
    doi: '10.1186/s13054-014-0650-6'
  },
  {
    id: 'art-myatra-2017',
    citation:
      'Myatra SN, Prabu NR, Divatia JV, et al. The Changes in Pulse Pressure Variation or Stroke Volume Variation After a "Tidal Volume Challenge" Reliably Predict Fluid Responsiveness During Low Tidal Volume Ventilation. Crit Care Med. 2017;45(3):415–421.',
    note: 'Akciğer koruyucu düşük tidal volüm (6 mL/kg) altında 1 dk süreyle VT 8 mL/kg’a çıkarıldığında ΔPPV ≥ %3.5 (veya ΔSVV ≥ %2.5) artışının sıvı yanıtlılığını güvenle saptadığını gösterir.',
    pmid: '27922879',
    doi: '10.1097/CCM.0000000000002183'
  }
];

const DAMPING_WAVE_PATHS: Record<
  DampingStateId,
  {
    mainTrace: string;
    flushSegment: string;
    strokeColor: string;
    badgeText: string;
    readoutText: string;
    oscillationLabel: string;
    notchLabel: string;
  }
> = {
  optimal: {
    // 120 mmHg -> y=72, 80 mmHg -> y=132, dicrotic notch -> y=104
    mainTrace:
      'M 36 132 L 52 72 L 62 98 L 67 104 L 74 99 L 112 128 L 136 132 L 152 72 L 162 98 L 167 104 L 174 99 L 212 128 L 236 132 L 252 72 L 262 98 L 267 104 L 274 99 L 310 132',
    // Fast-flush square pulse (y=26) -> vertical drop -> 1.5–2 clean damped oscillations -> return to baseline beat
    flushSegment:
      'M 332 132 L 348 132 L 350 26 L 424 26 L 426 146 L 442 104 L 458 138 L 474 128 L 492 132 L 508 72 L 518 98 L 523 104 L 530 99 L 568 128 L 594 132',
    strokeColor: '#10b981',
    badgeText: '120 / 80 (MAP 93) · Doğru Okuma',
    readoutText: 'Gerçek ile tam uyumlu',
    oscillationLabel: '1.5 – 2 keskin osilasyon',
    notchLabel: 'Net Dikrotik Çentik'
  },
  overdamped: {
    // Blunted low peak (~y=105 => ~98 mmHg), elevated trough (~y=120 => ~88 mmHg), no notch
    mainTrace:
      'M 36 120 Q 48 106 60 105 Q 84 110 136 120 Q 148 106 160 105 Q 184 110 236 120 Q 248 106 260 105 Q 284 110 310 120',
    // Fast-flush square pulse -> slow rounded decay with ZERO oscillation (ζ > 1.0)
    flushSegment:
      'M 332 120 L 348 120 L 352 26 L 424 26 Q 430 96 462 117 Q 480 120 494 120 Q 506 106 518 105 Q 542 110 594 120',
    strokeColor: '#f59e0b',
    badgeText: '98 / 88 (MAP 91) · Dar Nabız Basıncı!',
    readoutText: 'SKB YALANCI DÜŞÜK · DKB YALANCI YÜKSEK',
    oscillationLabel: '0 Osilasyon (Yavaş yuvarlak iniş)',
    notchLabel: 'Dikrotik Çentik KAYIP / Künt Tepe'
  },
  underdamped: {
    // Sharp exaggerated systolic whip (~y=40 => ~144 mmHg), ringing sub-peaks, slightly lower trough (~y=140 => ~74 mmHg)
    mainTrace:
      'M 36 140 L 49 40 L 55 96 L 61 78 L 68 110 L 75 97 L 82 114 L 114 135 L 136 140 L 149 40 L 155 96 L 161 78 L 168 110 L 175 97 L 182 114 L 214 135 L 236 140 L 249 40 L 255 96 L 261 78 L 268 110 L 275 97 L 282 114 L 310 138',
    // Fast-flush square pulse -> ≥ 4 high-amplitude ringing oscillations before settling
    flushSegment:
      'M 332 140 L 348 140 L 350 26 L 424 26 L 426 168 L 436 74 L 446 158 L 456 90 L 466 150 L 476 106 L 486 144 L 496 126 L 508 40 L 514 96 L 520 78 L 527 110 L 534 97 L 541 114 L 570 135 L 594 140',
    strokeColor: '#f43f5e',
    badgeText: '144 / 74 (MAP 93) · "Systolic Whip"!',
    readoutText: 'SKB YALANCI YÜKSEK (+15–30 mmHg) · Çoklu Çentik',
    oscillationLabel: '≥ 4 Yüksek Genlikli "Ringing" Salınımı',
    notchLabel: 'Yapay Çoklu Çentik & Sivri Tepe'
  }
};

const OPTIMAL_REFERENCE_GHOST =
  'M 36 132 L 52 72 L 62 98 L 67 104 L 74 99 L 112 128 L 136 132 L 152 72 L 162 98 L 167 104 L 174 99 L 212 128 L 236 132 L 252 72 L 262 98 L 267 104 L 274 99 L 310 132';

const DampingWaveformChart: React.FC<{ stateId: DampingStateId; isDark: boolean }> = ({ stateId, isDark }) => {
  const wave = DAMPING_WAVE_PATHS[stateId];
  const gridStroke = isDark ? '#1e293b' : '#e2e8f0';
  const labelFill = isDark ? '#94a3b8' : '#64748b';
  const ghostStroke = isDark ? '#475569' : '#94a3b8';

  return (
    <div
      className={`rounded-xl border p-3 space-y-2 ${
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono tabular-nums">
        <span className="font-bold" style={{ color: wave.strokeColor }}>
          {wave.badgeText}
        </span>
        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{wave.readoutText}</span>
      </div>

      <svg
        viewBox="0 0 610 185"
        role="img"
        aria-label={`Arteriyel basınç dalgası ve kare dalga testi: ${DAMPING_SPECS[stateId].label}`}
        className="w-full h-auto block"
      >
        {/* Yatay mmHg kalibrasyon çizgileri */}
        {[
          { y: 40, label: '150' },
          { y: 72, label: '120' },
          { y: 102, label: '100' },
          { y: 132, label: '80' },
          { y: 162, label: '50' }
        ].map((line) => (
          <g key={line.label}>
            <line x1="34" y1={line.y} x2="598" y2={line.y} stroke={gridStroke} strokeWidth="1" />
            <text x="6" y={line.y + 3} fontSize="9" fontFamily="monospace" fill={labelFill}>
              {line.label}
            </text>
          </g>
        ))}

        {/* Dikey zaman bölücüleri */}
        {[136, 236, 332, 424, 508].map((xPos) => (
          <line key={xPos} x1={xPos} y1="16" x2={xPos} y2="170" stroke={gridStroke} strokeWidth="1" strokeDasharray="3 3" />
        ))}

        {/* Bölüm ayırıcısı: Arteriyel Dalga vs Fast-Flush Kare Dalga */}
        <line
          x1="332"
          y1="14"
          x2="332"
          y2="174"
          stroke={isDark ? '#475569' : '#94a3b8'}
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <text x="150" y="15" fontSize="9.5" fontWeight="700" fontFamily="sans-serif" fill={labelFill} textAnchor="middle">
          ARTERİYEL NABIZ DALGASI
        </text>
        <text x="466" y="15" fontSize="9.5" fontWeight="700" fontFamily="sans-serif" fill={labelFill} textAnchor="middle">
          KARE DALGA TESTİ (FAST-FLUSH · 300 mmHg)
        </text>

        {/* Gerçek referans eğrisi (yalnızca overdamped/underdamped modlarında karşılaştırma için kesikli çizgi) */}
        {stateId !== 'optimal' && (
          <path
            d={OPTIMAL_REFERENCE_GHOST}
            fill="none"
            stroke={ghostStroke}
            strokeWidth="1.4"
            strokeDasharray="4 3"
          />
        )}

        {/* Aktif arteriyel nabız eğrisi */}
        <path
          d={wave.mainTrace}
          fill="none"
          stroke={wave.strokeColor}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Fast-Flush kare dalga + sönümleme yanıtı */}
        <path
          d={wave.flushSegment}
          fill="none"
          stroke={wave.strokeColor}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Önemli anatomik/fiziksel etiketler */}
        <text x="180" y="178" fontSize="9.5" fontWeight="600" fill={wave.strokeColor} textAnchor="middle">
          {wave.notchLabel}
        </text>
        <text x="466" y="178" fontSize="9.5" fontWeight="600" fill={wave.strokeColor} textAnchor="middle">
          {wave.oscillationLabel}
        </text>
      </svg>

      {stateId !== 'optimal' && (
        <div className="flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-4 border-t-2 border-dashed border-slate-400 inline-block" />
            Gerçek İntra-arteriyel Dalga (120/80 Referans)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-4 border-t-2 inline-block" style={{ borderColor: wave.strokeColor }} />
            Monitörde Görülen Bozulmuş Trase
          </span>
        </div>
      )}
    </div>
  );
};

export const ArterialCannulationModule: React.FC<ArterialCannulationModuleProps> = ({ isDark }) => {
  const [selectedSite, setSelectedSite] = useState<ArterySiteId>('radial');
  const [dampingState, setDampingState] = useState<DampingStateId>('optimal');
  const [transducerOffsetCm, setTransducerOffsetCm] = useState<number>(0);
  const [ppMax, setPpMax] = useState<number>(54);
  const [ppMin, setPpMin] = useState<number>(40);

  const site = ARTERY_SITES[selectedSite];
  const damping = DAMPING_SPECS[dampingState];

  const ppvResult = useMemo(() => {
    const high = Math.max(ppMax, ppMin);
    const low = Math.min(ppMax, ppMin);
    const mean = (high + low) / 2;
    if (mean <= 0) return { value: 0, zone: 'low' as const };
    const val = ((high - low) / mean) * 100;
    const zone = val >= 13 ? ('responsive' as const) : val >= 9 ? ('gray' as const) : ('unresponsive' as const);
    return { value: val, zone };
  }, [ppMax, ppMin]);

  // 1 cm H2O = 0.7355 mmHg (10 cm = ~7.4 mmHg)
  const hydrostaticErrorMmHg = useMemo(() => {
    return (transducerOffsetCm * 0.7355).toFixed(1);
  }, [transducerOffsetCm]);

  const panelClass = `rounded-xl border transition-colors ${
    isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
  }`;

  const subSurfaceClass = `rounded-xl border ${
    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
  }`;

  return (
    <div className="space-y-6">
      {/* Hızlı Bölüm Navigasyonu */}
      <nav
        aria-label="İnvaziv Arteriyel Kanülasyon Bölümleri"
        className={`p-3 rounded-xl border flex flex-wrap items-center gap-2 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {QUICK_NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              const el = document.getElementById(item.id);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-700/80'
                : 'bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* BÖLÜM 1: ENDİKASYONLAR, KONTRENDİKASYONLAR & 6 ARTERİYEL BÖLGE KARŞILAŞTIRMASI */}
      <section id="art-sites" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
              <span>01 · İnvaziv Hemodinamik Monitörizasyon</span>
              <span aria-hidden="true">·</span>
              <span>Miller’s Anesthesia · PERSEUS 2020 · Johnston 2025</span>
            </div>
            <h3 className={`text-lg font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              İnvaziv Arteriyel Kanülasyon: Endikasyonlar ve 6 Bölge Karşılaştırması
            </h3>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-md border self-start sm:self-auto ${
              isDark ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            Kırmızı Etiket &amp; Enjeksiyon Portsuz Hat
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
              Klinik Endikasyonlar
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Atımdan Atıma (Beat-to-Beat) Tansiyon Takibi:</strong> Kardiyak, torasik, vasküler, intrakraniyal cerrahiler ve ciddi hemodinamik instabilite / şok.</li>
              <li>• <strong>Vazoaktif İlaç Titrasyonu:</strong> Noradrenalin, adrenalin, nitrogliserin veya sodyum nitroprussid infüzyonları.</li>
              <li>• <strong>Sık Kan Gazı &amp; Laboratuvar Örneklemesi:</strong> Ağır solunum yetmezliği, asit-baz/laktat takibi ve masif transfüzyon yönetimi.</li>
              <li>• <strong>Nabız Dalga Analizi &amp; NIBP Yetersizliği:</strong> PPV/SVV ile hedefe yönelik sıvı tedavisi (GDFT), kardiyopulmoner bypass (non-pulsatil akım), morbid obezite veya aritmi.</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
              Kontrendikasyonlar &amp; Damar Koruma (Johnston 2025)
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Kesin Bölgesel Engeller:</strong> Girişim yerinde enfeksiyon/yanık, bilinen arteriyel trombüs, Buerger/Raynaud hastalığı veya aynı tarafta bozuk kollateral akım.</li>
              <li>• <strong>Ömür Boyu Damar Koruma (KBH &amp; Greft):</strong> AV fistül planlanan/mevcut koldan, gelecekte koroner by-pass için greft olarak kullanılacak radiyal arterden kaçınılır.</li>
              <li>• <strong>Brakiyal &amp; End-Arter Dikkat:</strong> Brakiyal arter fonksiyonel bir end-arterdir; zorunlu olmadıkça 1. seçenek yapılmaz ve radiyal/femoral alternatifleri öncelenir.</li>
              <li>• <strong>Koagülopati:</strong> Trombositopeni/antikoagülasyonda basılamayan bölgeler yerine tam basılabilir <strong>Radiyal / Dorsalis Pedis</strong> USG eşliğinde önceliklidir.</li>
            </ul>
          </div>
        </div>

        {/* 6 Arteriyel Bölge Özet Tablosu */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse min-w-[780px]">
            <thead>
              <tr className={isDark ? 'bg-slate-950/90 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Arter Bölgesi</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Standart Kateter</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Kollateral Dolaşım</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Ana Komplikasyon Profili</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Klinik Özet</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              {ARTERY_COMPARE_TABLE.map((row) => (
                <tr
                  key={row.site}
                  className={
                    row.highlight
                      ? isDark
                        ? 'bg-amber-950/20'
                        : 'bg-amber-50/50'
                      : isDark
                        ? 'hover:bg-slate-800/30'
                        : 'hover:bg-slate-50'
                  }
                >
                  <td className="p-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">{row.site}</td>
                  <td className="p-3 font-mono tabular-nums whitespace-nowrap">{row.gauge}</td>
                  <td className="p-3">{row.collateral}</td>
                  <td className="p-3">{row.thrombosisOrIschemiaRisk}</td>
                  <td className="p-3">{row.keyNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* BÖLÜM 2: BÖLGESEL DETAY REHBERİ (RADİYAL, BRAKİYAL, FEMORAL, AKSİLLER, ULNAR, DORSALİS PEDİS) */}
      <section id="art-detail" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-50 text-sky-700'}`}>
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Bölgesel Anatomi &amp; Klinik Teknik Rehberi (Brakiyal Arter Dahil)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Anatomik komşuluklar, kollateral durumu, kateter boyutu ve bölgeye özgü güvenlik kuralları
              </p>
            </div>
          </div>
        </div>

        {/* Bölge Seçim Sekmeleri */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {(Object.values(ARTERY_SITES) as ArterySiteSpec[]).map((item) => {
            const active = selectedSite === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedSite(item.id)}
                className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                  active
                    ? 'bg-sky-600 border-sky-500 text-white shadow-xs'
                    : isDark
                      ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold truncate">{item.shortName}</div>
                <div className={`text-[10px] mt-0.5 truncate ${active ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {item.priorityBadge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Seçili Arter Detay Kartı */}
        <div className={`${subSurfaceClass} p-5 space-y-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {site.priorityBadge}
              </span>
              <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {site.title}
              </h4>
            </div>
            <span
              className={`px-3 py-1 rounded-lg border text-xs font-mono font-semibold ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              {site.catheterSpec}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="font-bold text-sky-600 dark:text-sky-400">Anatomik Seyir &amp; Pozisyon</div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {site.anatomyAndPosition}
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">Kollateral Dolaşım Durumu:</span>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{site.collateralStatus}</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="font-bold text-emerald-600 dark:text-emerald-400">Klinik Avantajlar</div>
              <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {site.keyAdvantages.map((adv, idx) => (
                  <li key={idx}>• {adv}</li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="font-bold text-teal-600 dark:text-teal-400 block mb-0.5">USG İpuçları (PERSEUS):</span>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{site.usgNotes}</p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border text-xs space-y-1.5 ${
              isDark ? 'bg-rose-950/25 border-rose-900/60 text-rose-200' : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Kritik Riskler ve Bölgeye Özgü Önlemler</span>
            </div>
            <ul className="space-y-1 leading-relaxed">
              {site.criticalRisksAndPrecautions.map((risk, idx) => (
                <li key={idx}>• {risk}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BÖLÜM 3: USG REHBERLİĞİ, SELDİNGER vs DİREKT TEKNİK & MODİFİYE ALLEN / BARBEAU */}
      <section id="art-technique" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ponksiyon Teknikleri (USG · Seldinger · Direkt Kanülasyon &amp; Kollateral Test)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ESAIC PERSEUS 2020 · Dinamik İğne Ucu Takibi (DNTP) · Ayrı Seldinger vs İntegral Kılavuz Tel
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className="font-bold text-sm text-sky-600 dark:text-sky-400">
              1. Dinamik USG Tekniği (PERSEUS)
            </h4>
            <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>OOP + DNTP (Dinamik İğne Ucu Takibi):</strong> Kısa eksende damar ortalanır; iğne ucu parlak nokta olarak görülünce prob 1–2 mm ileri kaydırılıp ucu kaybedilir, ardından iğne tekrar nokta belirene dek ilerletilir.</li>
              <li>• <strong>Uzun Eksen (In-Plane):</strong> İğne şaftının tamamı ve arter arka duvarı izlenir; brakiyal ve femoral arterde arka duvar perforasyonunu önlemede çok etkilidir.</li>
              <li>• <strong>Asepsi:</strong> Steril prob kılıfı, steril jel ve CHG cilt antisepsisi; femoral/aksiller hatlarda SVK’ya benzer <strong>Maksimal Steril Bariyer (MSB)</strong> uygulanır.</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
              2. Seldinger vs Direkt Kanülasyon
            </h4>
            <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Direkt (Catheter-over-Needle):</strong> 30–45° açıyla ilk kan görülünce açı 10–15°’ye düşürülüp 1–2 mm daha ilerlenir (kateter ucu iğne ucundan 1 mm geride olduğu için), sonra plastik kanül iğne sabitlenerek sürülür.</li>
              <li>• <strong>Klasik / Modifiye Seldinger (Kılavuz Tel):</strong> İnce iğneden pulsatil akım alınınca yumuşak uçlu 0.018–0.025 inç kılavuz tel dirençsiz ilerletilir; tel dirençle karşılaşırsa <strong>ASLA zorlanmaz</strong> (diseksiyon/spazm yapar).</li>
              <li>• <strong>Transfiksiyon (Çift Duvar):</strong> Arka duvardan geçilip iğne çıkarıldıktan sonra kanül pulsatil akım gelene dek milim milim geri çekilir ve tel gönderilir (koagülopatide önerilmez!).</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400">
              3. Modifiye Allen &amp; Barbeau Testi
            </h4>
            <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Modifiye Allen:</strong> Hem radiyal hem ulnar arter sıkılıp el açtırılır; yalnızca ulnar serbest bırakıldığında avuç içi rengi <strong>≤ 5–10 sn</strong> içinde dönmelidir.</li>
              <li>• <strong>Barbeau (Pletismografi) Testi:</strong> İşaret parmağına takılan SpO₂ probunda radiyal sıkılıyken dalga formu ve sinyalin sürmesi ulnar kollateralin objektif göstergesidir.</li>
              <li>• <strong>Kanıt Notu (Miller’s):</strong> Allen testinin iskemiyi öngörme gücü sınırlıdır (yalancı pozitif/negatif olabilir); asıl koruyucu olan USG ile damar çapına uygun <strong>20G ince kanül</strong> seçmek ve iskemi takibi yapmaktır.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BÖLÜM 4: İNTERAKTİF TRANSDÜSER SIFIRLAMA & KARE DALGA (FAST-FLUSH) TESTİ */}
      <section id="art-transducer" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/15 text-indigo-400' : 'bg-indigo-50 text-indigo-700'}`}>
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Transdüser Sıfırlama (Flebostatik Eksen) &amp; Kare Dalga (Fast-Flush) Analizi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Miller’s Anesthesia: Hidrostatik Seviye Hatası (10 cm = 7.4 mmHg) ve Dinamik Yanıt (Damping)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Sol: İnteraktif Hidrostatik Yükseklik Hatası Simülatörü */}
          <div className={`lg:col-span-5 ${subSurfaceClass} p-4 space-y-4`}>
            <div className="flex items-center gap-2 font-bold text-sm text-sky-600 dark:text-sky-400">
              <Sliders className="w-4 h-4 shrink-0" />
              <span>Hidrostatik Sıfırlama Hatası Hesaplayıcısı</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold">Transdüser – Flebostatik Eksen Farkı</span>
                <span className="font-mono font-bold text-sky-500">
                  {transducerOffsetCm > 0 ? `+${transducerOffsetCm} cm (Yukarıda)` : transducerOffsetCm < 0 ? `${transducerOffsetCm} cm (Aşağıda)` : '0 cm (Tam Hizada)'}
                </span>
              </div>
              <input
                type="range"
                min={-30}
                max={30}
                step={2}
                value={transducerOffsetCm}
                onChange={(e) => setTransducerOffsetCm(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>−30 cm (Çok Aşağıda)</span>
                <span>0 cm</span>
                <span>+30 cm (Çok Yukarıda)</span>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                transducerOffsetCm === 0
                  ? isDark ? 'bg-emerald-950/30 border-emerald-800/60' : 'bg-emerald-50 border-emerald-200'
                  : isDark ? 'bg-amber-950/30 border-amber-800/60' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="font-bold">
                {transducerOffsetCm === 0
                  ? 'Hidrostatik Hata: 0.0 mmHg (Doğru Okuma)'
                  : transducerOffsetCm > 0
                    ? `Monitör Gerçekten ${Math.abs(Number(hydrostaticErrorMmHg))} mmHg DÜŞÜK Okur!`
                    : `Monitör Gerçekten ${Math.abs(Number(hydrostaticErrorMmHg))} mmHg YÜKSEK Okur!`}
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                Her <strong>10 cm</strong> yükseklik sapması <strong>7.4 mmHg</strong> hata yaratır (13.6 cm = 10 mmHg).
                <br />• <strong>Standart Referans (Flebostatik Eksen):</strong> 4. interkostal aralık (İKA) ile mid-aksiller çizginin orta noktası (sağ atriyum seviyesi).
                <br />• <strong>Nöroşirürji / Oturur Pozisyon (CPP):</strong> Beyin perfüzyon basıncı takibi için transdüser <strong>Dış Kulak Yolu (EAM / Tragus)</strong> hizasına sıfırlanır!
              </p>
            </div>
          </div>

          {/* Sağ: İnteraktif Kare Dalga (Fast-Flush) Dinamik Yanıt Analizi */}
          <div className={`lg:col-span-7 ${subSurfaceClass} p-4 space-y-4`}>
            <div className="flex items-center gap-2 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              <Gauge className="w-4 h-4 shrink-0" />
              <span>Kare Dalga (Fast-Flush) Testi &amp; Sönümleme (Damping) Durumu</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(
                [
                  { id: 'optimal', label: 'Optimal (Normal)' },
                  { id: 'overdamped', label: 'Overdamped (Aşırı Sönümlü)' },
                  { id: 'underdamped', label: 'Underdamped (Rezonant)' }
                ] as { id: DampingStateId; label: string }[]
              ).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setDampingState(st.id)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    dampingState === st.id
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <div className={`p-4 rounded-xl border text-xs space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="font-bold text-sm text-indigo-600 dark:text-indigo-300">{damping.label}</div>

              {/* Seçili Durumun İnteraktif Dalga Formu Görseli */}
              <DampingWaveformChart stateId={dampingState} isDark={isDark} />

              {/* 3 Durumun Yan Yana Hızlı Görsel Karşılaştırması */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {(
                  [
                    { id: 'optimal', title: 'Optimal', desc: '1.5–2 osilasyon · Net çentik' },
                    { id: 'overdamped', title: 'Overdamped', desc: '0 osilasyon · Çentik silik' },
                    { id: 'underdamped', title: 'Underdamped', desc: '≥3–4 "ringing" · Whip tepe' }
                  ] as { id: DampingStateId; title: string; desc: string }[]
                ).map((thumb) => {
                  const activeThumb = dampingState === thumb.id;
                  const w = DAMPING_WAVE_PATHS[thumb.id];
                  return (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => setDampingState(thumb.id)}
                      className={`p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                        activeThumb
                          ? isDark
                            ? 'bg-slate-950 border-indigo-500'
                            : 'bg-indigo-50/60 border-indigo-500'
                          : isDark
                            ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span style={{ color: w.strokeColor }}>{thumb.title}</span>
                        <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
                          {activeThumb ? 'Seçili' : 'Seç'}
                        </span>
                      </div>
                      <svg viewBox="0 0 610 185" className="w-full h-14 mt-1" aria-hidden="true">
                        {thumb.id !== 'optimal' && (
                          <path
                            d={OPTIMAL_REFERENCE_GHOST}
                            fill="none"
                            stroke={isDark ? '#475569' : '#cbd5e1'}
                            strokeWidth="2.5"
                            strokeDasharray="6 4"
                          />
                        )}
                        <path
                          d={w.mainTrace}
                          fill="none"
                          stroke={w.strokeColor}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d={w.flushSegment}
                          fill="none"
                          stroke={w.strokeColor}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{thumb.desc}</div>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] text-slate-500">Sistolik (SBP)</div>
                  <div className="font-bold mt-0.5">{damping.sbpEffect}</div>
                </div>
                <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] text-slate-500">Diyastolik (DBP)</div>
                  <div className="font-bold mt-0.5">{damping.dbpEffect}</div>
                </div>
                <div className={`p-2 rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] text-slate-500">Ortalama (MAP)</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{damping.mapEffect}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div><strong>Fast-Flush Yanıtı:</strong> {damping.flushWaves}</div>
                <div><strong>Dikrotik Çentik:</strong> {damping.dicroticNotch}</div>
              </div>

              <div>
                <div className="font-bold mb-1">Nedenleri:</div>
                <ul className={`space-y-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {damping.commonCauses.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 font-semibold text-sky-700 dark:text-sky-300">
                Çözüm: {damping.fixAction}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BÖLÜM 5: KRİTİK KOMPLİKASYONLAR & İLAÇ HATASI GÜVENLİĞİ */}
      <section id="art-safety" className={`${panelClass} p-5 sm:p-6 space-y-4`}>
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-rose-500/15 text-rose-400' : 'bg-rose-50 text-rose-700'}`}>
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kritik Güvenlik Kuralları &amp; İntra-Arteriyel Enjeksiyon Hatası Önleme
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-rose-950/25 border-rose-900/60' : 'bg-rose-50/70 border-rose-200'}`}>
            <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>ASLA İlaç Enjekte Etme (Yanlışlıkla İntra-Arteriyel Enjeksiyon)</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • Arter hattı üzerinden tiopental, prometazin, propofol, antibiyotik veya vazoaktif ilaç verilmesi ani şiddetli yanma, kristal presipitasyonu, tromboz ve <strong>ekstremite gangrenine</strong> yol açar!<br />
              • <strong>Koruma:</strong> Hat boyunca enjeksiyon portu bulunmayan, <strong>KIRMIZI renk kodlu ve &quot;ARTER&quot; etiketli</strong> transdüser seti kullanılır; basınç torbasında yalnızca <strong>%0.9 NaCl</strong> (dekstrozsuz — kan gazında yalancı hiperglisemiyi önlemek için) 300 mmHg ile (~3 mL/sa) tutulur.
            </p>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Kateter Çekme, Hemostaz &amp; Nörovasküler Kontrol</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • Arteriyel hat artık gerekmediği gün çekilir (enfeksiyon &amp; tromboz riski süreyle artar).<br />
              • Çekildikten sonra <strong>radiyalde ≥ 5 dk, brakiyalde 5–10 dk, femoralde ≥ 10–15 dk</strong> kesintisiz doğrudan bası (arteriyel hemostaz) uygulanır; koagülopati/heparin varlığında süre uzatılır.<br />
              • Çekim sonrası ve takılı olduğu sürece <strong>Brakiyal, Femoral ve Radiyal</strong> kateterlerin distalindeki nabız, renk ve motor/duyu muayenesi kayıt altına alınır.
            </p>
          </div>
        </div>
      </section>

      {/* BÖLÜM 6: ARTERİYEL NABIZ DALGA ANALİZİ — PPV VE SVV (DİNAMİK ÖN YÜK YANITLILIĞI) */}
      <section id="art-ppv-svv" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Arteriyel Nabız Dalga Analizi: PPV ve SVV (Dinamik Sıvı Yanıtlılığı)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Michard 2000 · Yang &amp; Du 2014 · Myatra 2017 (Tidal Volume Challenge) · Foti 2022 · Miller’s Anesthesia
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center text-xs font-mono font-semibold px-2.5 py-1 rounded-md border self-start sm:self-auto ${
              isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            Eşik: PPV / SVV ≥ %12–13
          </span>
        </div>

        {/* Solunum Döngüsü + PPV/SVV Formül ve İnteraktif Hesaplayıcı */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className={`lg:col-span-7 ${subSurfaceClass} p-4 space-y-3 text-xs`}>
            <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
              Fizyolojik Mekanizma: Kalp–Akciğer Etkileşimi &amp; Frank–Starling Eğrisi
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Pozitif basınçlı mekanik inspirasyon intratorasik basıncı artırarak sağ atriyuma venöz dönüşü geçici olarak azaltır (sağ ventrikül ön yükü ↓) ve pulmoner vasküler direnci artırır. Bu azalmış sağ ventrikül atım hacmi <strong>2–3 kalp atımı sonra</strong> sol ventriküle ulaşır; hasta Frank–Starling eğrisinin dik (önyük-bağımlı) kısmındaysa ekspiryumda sol ventrikül atım hacmi (<strong>SV</strong>) ve nabız basıncı (<strong>PP = SKB − DKB</strong>) belirgin dalgalanma gösterir.
            </p>

            {/* PPV Solunum Döngüsü SVG Şeması */}
            <div className={`rounded-xl border p-3 ${isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200'}`}>
              <svg
                viewBox="0 0 600 155"
                role="img"
                aria-label="Mekanik ventilasyon sırasında arteriyel nabız basıncında PPmax ve PPmin değişimi (PPV)"
                className="w-full h-auto block"
              >
                {/* Solunum fazı şeridi */}
                <rect x="35" y="10" width="215" height="22" rx="4" fill={isDark ? '#0f172a' : '#eff6ff'} stroke={isDark ? '#1e3a8a' : '#bfdbfe'} />
                <text x="142" y="25" fontSize="10" fontWeight="700" textAnchor="middle" fill={isDark ? '#60a5fa' : '#1d4ed8'}>
                  MEKANİK İNSPİRASYON (↑ Ptp)
                </text>
                <rect x="255" y="10" width="315" height="22" rx="4" fill={isDark ? '#0f172a' : '#f0fdf4'} stroke={isDark ? '#14532d' : '#bbf7d0'} />
                <text x="412" y="25" fontSize="10" fontWeight="700" textAnchor="middle" fill={isDark ? '#34d399' : '#047857'}>
                  EKSPİRASYON (Venöz Dönüş ↓ → 2-3 atım gecikmeli PPmin)
                </text>

                {/* Referans çizgileri */}
                <line x1="35" y1="52" x2="570" y2="52" stroke={isDark ? '#1e293b' : '#e2e8f0'} strokeDasharray="3 3" />
                <line x1="35" y1="128" x2="570" y2="128" stroke={isDark ? '#1e293b' : '#e2e8f0'} strokeDasharray="3 3" />

                {/* Nabız dalgaları (PPmax -> azalma -> PPmin -> artış) */}
                <path
                  d="M 38 128 L 54 48 L 64 78 L 72 84 L 116 126 L 132 54 L 142 82 L 150 88 L 194 124 L 210 64 L 220 88 L 228 93 L 272 122 L 288 76 L 298 96 L 306 100 L 350 120 L 366 84 L 376 102 L 384 106 L 428 122 L 444 68 L 454 90 L 462 95 L 506 126 L 522 50 L 532 80 L 540 86 L 568 124"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* PPmax ve PPmin çift yönlü ok göstergeleri */}
                <line x1="54" y1="48" x2="54" y2="128" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="54" y="144" fontSize="10" fontWeight="700" fontFamily="monospace" fill="#0284c7" textAnchor="middle">
                  PPmax (Büyük)
                </text>

                <line x1="366" y1="84" x2="366" y2="120" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="2 2" />
                <text x="366" y="144" fontSize="10" fontWeight="700" fontFamily="monospace" fill="#d97706" textAnchor="middle">
                  PPmin (Küçük)
                </text>
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="font-bold text-sky-600 dark:text-sky-400">PPV (Nabız Basıncı Varyasyonu)</div>
                <div className="font-mono tabular-nums text-[11px] font-semibold mt-1">
                  PPV (%) = [(PPmax − PPmin) / PPmean] × 100
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Doğrudan standart arter kateterinden ölçülür; ek kardiyak debi kiti olmadan vasküler tonus etkisinden görece bağımsızdır (ekspiryum–inspirasyon arası 1 solunum döngüsü).
                </p>
              </div>
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400">SVV (Atım Hacmi Varyasyonu)</div>
                <div className="font-mono tabular-nums text-[11px] font-semibold mt-1">
                  SVV (%) = [(SVmax − SVmin) / SVmean] × 100
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Arteriyel eğrinin sistolik alan integrali (<em>pulse contour analysis</em>: FloTrac, PiCCO, LiDCO, MostCare) ile hesaplanır; kalibrasyon gereksinimi veya algoritmik arteriyel kompliyans varsayımına duyarlıdır.
                </p>
              </div>
            </div>
          </div>

          {/* Sağ: Hızlı Yatak Başı PPV Hesaplayıcı + Klinik Eşik Yorumu */}
          <div className={`lg:col-span-5 ${subSurfaceClass} p-4 space-y-3 text-xs`}>
            <div className="font-bold text-sm text-sky-600 dark:text-sky-400">
              Yatak Başı PPV Hesaplayıcı &amp; Eşik Değerler
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="pp-max-input" className="block text-[11px] font-semibold mb-1">
                  PPmax (mmHg)
                </label>
                <input
                  id="pp-max-input"
                  type="number"
                  min={10}
                  max={140}
                  value={ppMax}
                  onChange={(e) => setPpMax(Math.max(10, Math.min(140, Number(e.target.value) || 10)))}
                  className={`w-full px-3 py-1.5 rounded-lg border font-mono tabular-nums text-xs ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Örn: 124 − 70 = 54</span>
              </div>
              <div>
                <label htmlFor="pp-min-input" className="block text-[11px] font-semibold mb-1">
                  PPmin (mmHg)
                </label>
                <input
                  id="pp-min-input"
                  type="number"
                  min={5}
                  max={130}
                  value={ppMin}
                  onChange={(e) => setPpMin(Math.max(5, Math.min(130, Number(e.target.value) || 5)))}
                  className={`w-full px-3 py-1.5 rounded-lg border font-mono tabular-nums text-xs ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Örn: 108 − 68 = 40</span>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border space-y-1.5 ${
                ppvResult.zone === 'responsive'
                  ? isDark
                    ? 'bg-emerald-950/35 border-emerald-700/60'
                    : 'bg-emerald-50 border-emerald-300'
                  : ppvResult.zone === 'gray'
                    ? isDark
                      ? 'bg-amber-950/35 border-amber-700/60'
                      : 'bg-amber-50 border-amber-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-700'
                      : 'bg-white border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">Hesaplanan PPV:</span>
                <span className="text-lg font-mono font-bold tabular-nums">
                  %{ppvResult.value.toFixed(1)}
                </span>
              </div>
              <div className="text-[11px] leading-relaxed">
                {ppvResult.zone === 'responsive' ? (
                  <span>
                    <strong>≥ %13 (Sıvı Yanıtlı Bölge):</strong> Ön koşullar sağlanıyorsa 250 mL dengeli kristaloid bolusu ile atım hacmi artışı (ΔSV ≥ %10) beklenir. <em>(Laparoskopi/pnömoperitonda eşik %15–17 kabul edilir.)</em>
                  </span>
                ) : ppvResult.zone === 'gray' ? (
                  <span>
                    <strong>%9 – %13 (Gri Zon):</strong> Tek başına kör bolus verme; <strong>Tidal Volüm Challenge</strong> (VT 6 → 8 mL/kg, 1 dk’da ΔPPV ≥ %3.5) veya <strong>100 mL Mini-Fluid Challenge</strong> ile teyit et.
                  </span>
                ) : (
                  <span>
                    <strong>&lt; %9 (Frank–Starling Platosu):</strong> Hasta büyük olasılıkla sıvı yanıtsızdır. Hipotansiyon sürüyorsa sıvı yüklemek yerine <strong>vazopresör</strong> veya kardiyak fonksiyon (POCUS) değerlendir.
                  </span>
                )}
              </div>
            </div>

            <div className={`p-3 rounded-lg border text-[11px] space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="font-bold text-indigo-600 dark:text-indigo-400">
                Kare Dalga Testi ile Doğrudan İlişki (Foti 2022)
              </div>
              <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
                <strong>Overdamped</strong> hat nabız basıncı farkını bastırarak PPV/SVV’yi <strong>yalancı düşük</strong>, <strong>Underdamped (rezonant)</strong> hat ise sistolik tepeyi yapay şişirerek SVV/kardiyak debiyi <strong>yalancı yüksek</strong> ölçer. PPV/SVV’ye göre sıvı kararı vermeden önce daima <strong>Fast-Flush testi</strong> yapılmalıdır.
              </p>
            </div>
          </div>
        </div>

        {/* Güvenilirlik İçin 5 Zorunlu Ön Koşul ve Alternatif Testler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400">
              PPV &amp; SVV Geçerliliği İçin 5 Zorunlu Ön Koşul (&quot;LIMITS&quot;)
            </h4>
            <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>1. Tam Kontrollü Mekanik Ventilasyon:</strong> Spontan solunum eforunda plevral basınç düzensizleştiği için PPV/SVV <strong>geçersizdir</strong>.</li>
              <li>• <strong>2. Yeterli Tidal Volüm (VT ≥ 8 mL/kg PBW):</strong> Düşük VT (6 mL/kg) altında yalancı negatif çıkar; <strong>Myatra Tidal Volume Challenge</strong> (1 dk VT 8 mL/kg → ΔPPV ≥ %3.5 veya ΔSVV ≥ %2.5) uygulanır.</li>
              <li>• <strong>3. Düzenli Sinüs Ritmi:</strong> Atriyal fibrilasyon veya sık ekstrasistollerde diyastolik doluş süresi değiştiğinden ölçüm tamamen <strong>kontrendikedir</strong>.</li>
              <li>• <strong>4. Kapalı Toraks &amp; Normal Karın İçi Basınç:</strong> Açık torakotomi/VATS ve yüksek PEEP yanıltır; pnömoperitonda (12–15 mmHg) eşik ~<strong>%15–17</strong>’ye yükselir.</li>
              <li>• <strong>5. HR / RR Oranı &gt; 3.6 &amp; Sağ Ventrikül Fonksiyonu:</strong> Ciddi taşipne/bradikardide ve akut RV yetmezliğinde PPV yalancı pozitif artabilir (sıvı zararlı olur!).</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className="font-bold text-sm text-teal-600 dark:text-teal-400">
              PPV / SVV Geçersizse Alternatif Dinamik Testler
            </h4>
            <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Pasif Bacak Kaldırma (PLR):</strong> Yarı-otururdan (45°) sırtüstü + bacak 45° kaldırma (~300 mL endojen ototransfüzyon) sonrası 60–90 sn içinde <strong>SV / Nabız Basıncı ≥ %10–12</strong> artışı (aritmi ve spontan solunumda da geçerli!).</li>
              <li>• <strong>End-Ekspiratuar Oklüzyon Testi (EEOT):</strong> Mekanik ventilatörde 15 saniyelik ekspiryum sonu tutma sonrası SV veya nabız basıncında <strong>≥ %5</strong> artış; düşük VT’de bile uygulanabilir.</li>
              <li>• <strong>Mini-Fluid Challenge:</strong> 1 dakikada 100 mL kristaloid sonrası kalıcı SV artışı (<strong>ΔSV ≥ %5–6</strong>).</li>
              <li>• <strong>Ekokardiyografi (POCUS):</strong> LVOT VTI respiratuvar değişimi (&gt; %12) ve VCI kolapsibilite/distensibilite indeksi.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BÖLÜM 7: KANITA DAYALI KAYNAKLAR */}
      <section id="art-refs" className={`${panelClass} p-5 sm:p-6 space-y-4`}>
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kanıta Dayalı Kaynaklar (PubMed &amp; DOI)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              İnvaziv arteriyel kanülasyon, brakiyal arter serileri, dinamik damping fiziği ve PPV/SVV kanıtları
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {ARTERIAL_REFERENCES.map((ref) => (
            <div key={ref.id} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5 text-xs">
                <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                  {ref.citation}
                </p>
                <p className="text-slate-500 dark:text-slate-400">{ref.note}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono tabular-nums font-semibold transition-colors ${
                    isDark
                      ? 'bg-sky-500/10 border-sky-500/30 text-sky-300 hover:bg-sky-500/20'
                      : 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
                  }`}
                >
                  <span>PubMed {ref.pmid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                {ref.doi && (
                  <a
                    href={`https://doi.org/${ref.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono font-semibold transition-colors ${
                      isDark
                        ? 'bg-teal-500/10 border-teal-500/30 text-teal-300 hover:bg-teal-500/20'
                        : 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
                    }`}
                  >
                    <span>DOI</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
