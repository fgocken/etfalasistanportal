/**
 * Bölgesel ve Periferik Sinir Blokları Veri Tabanı
 * Şişli Etfal Anesteziyoloji ve Reanimasyon Kliniği
 * 
 * Kaynaklar: NYSORA, ASRA/ESRA Regional Anesthesia Guidelines, TARD
 */

export type BlockRegion = 'upper' | 'lower' | 'trunk';

export interface NerveBlock {
  id: string;
  name: string;
  trName: string;
  region: BlockRegion;
  regionLabel: string;
  summary: string;
  indications: string[];
  contraindications: string[];
  targetNerves: string[];
  sensoryCoverage: string[];
  motorCoverage: string[];
  usg: {
    probe: string;
    patientPosition: string;
    probePosition: string;
    needleApproach: 'In-plane (Prob ekseninde)' | 'Out-of-plane (Prob dik ekseninde)' | 'In-plane (Tercih) veya Out-of-plane';
    sonoanatomy: string[];
  };
  localAnesthetic: {
    recommendedDrugs: string;
    volumeRange: string;
    onsetDuration: string;
    sensoryVsMotor: string;
  };
  pearlsAndPitfalls: string[];
  complications: string[];
  tags: string[];
}

export const NERVE_BLOCKS_DATA: NerveBlock[] = [
  // ==================== ÜST EKSTREMİTE ====================
  {
    id: 'interskalen',
    name: 'Interscalene Brachial Plexus Block',
    trName: 'İnterskalen Brakiyal Pleksus Bloğu (ISB)',
    region: 'upper',
    regionLabel: 'Üst Ekstremite',
    summary: 'Omuz ve proksimal kol cerrahisi için altın standart rejyonel anestezi ve analjezi tekniği.',
    indications: [
      'Omuz artroskopisi ve artroplastisi',
      'Proksimal humerus kırıkları ve revizyon cerrahisi',
      'Klavikula lateral 1/3 kırıkları (supraklaviküler sinir katkısıyla)'
    ],
    contraindications: [
      'Şiddetli KOAH veya ciddi solunum yetmezliği (Frenik sinir paralizisi riski!)',
      'Kontralateral diyafram paralizisi / pnömonektomi',
      'Lokal enfeksiyon veya hematom',
      'Hasta reddi veya koagülopati'
    ],
    targetNerves: ['C5, C6 ve C7 sinir kökleri (Üst ve orta trunkus)'],
    sensoryCoverage: ['Omuz eklemi ve eklem kapsülü', 'Klavikula lateral kısmı', 'Lateral deltoid ve üst kol'],
    motorCoverage: ['Deltoid, supraspinatus, infraspinatus, biseps (kol elevasyonu ve abdüksiyonu baskılanır)'],
    usg: {
      probe: 'Lineer Yüksek Frekans (10-15 MHz)',
      patientPosition: 'Yarı oturur veya sırtüstü, baş 30-45° karşı tarafa çevrilmiş',
      probePosition: 'Krikoid kıkırdak (C6) hizasında boyun lateraline transvers yerleşim',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Anterior ve mediya skalen kaslar arasında "trafik lambası" görünümünde hipoekoik C5-C7 kökleri',
        'Köklerin süperfisiyelinde sternokleidomastoid (SKM) kası',
        'C6 seviyesinde Chassaignac tüberkülü ve vertebral arter/ven trasesi'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.25 - %0.5 Bupivakain / Levobupivakain veya %0.5 Ropivakain',
      volumeRange: '8 - 15 mL (Analjezi için düşük volüm 5-10 mL frenik blok insidansını azaltır)',
      onsetDuration: 'Başlama: 10-20 dk, Süre: 12-24 saat',
      sensoryVsMotor: 'Konsantrasyon düşürüldükçe (%0.2) motor blok azalır, mükemmel analjezi kalır'
    },
    pearlsAndPitfalls: [
      '%100’e yakın oranda geçici ipsilateral frenik sinir paralizisi gelişir; solunum rezervi kısıtlı hastalarda dikkat!',
      'Horner sendromu (ptozis, miyozis, anhidroz) sempatik zincir difüzyonundan kaynaklanır ve geçicidir; hastaya önceden bilgi verilmelidir.',
      'Rekürren laringeal sinir blokajına bağlı geçici ses kısıklığı görülebilir.',
      'İğne daima posterior skalen kastan girerek yönlendirilmeli, epinöral kılıf delinmeden kökler arasına hidrodiseksiyon yapılmalıdır.'
    ],
    complications: ['Frenik sinir parezisi', 'Horner sendromu', 'Pnömotoraks (nadir)', 'Vertebral arter enjeksiyonu', 'Nöropraksi'],
    tags: ['omuz', 'humerus', 'brakiyal', 'C5-C6', 'frenik']
  },
  {
    id: 'supraklavikuler',
    name: 'Supraclavicular Brachial Plexus Block',
    trName: 'Supraklaviküler Brakiyal Pleksus Bloğu (SCB)',
    region: 'upper',
    regionLabel: 'Üst Ekstremite',
    summary: 'Brakiyal pleksusun "spinal anestezisi"; dirsek, önkol ve el cerrahilerinde kompakt ve hızlı başlangıçlı blokaj.',
    indications: [
      'Humerus orta-distal şaft kırıkları',
      'Dirsek artroskopisi, replasmanı ve osteosentezi',
      'Önkol (radius/ulna) ve el cerrahileri'
    ],
    contraindications: [
      'Ağır solunum yetmezliği (Frenik blok riski %30-50)',
      'Girişim yerinde enfeksiyon',
      'Koagülopati (Subklavyan ven basısı zordur)'
    ],
    targetNerves: ['Trunkus ve divizyonlar (Brakiyal pleksus kompakt demeti)'],
    sensoryCoverage: ['Tüm kol, dirsek, önkol ve el (Omuz tepe bölgesi hariç)'],
    motorCoverage: ['Dirsek fleksör/ekstansörleri, el bileği ve tüm el parmak kasları'],
    usg: {
      probe: 'Lineer Yüksek Frekans (10-15 MHz)',
      patientPosition: 'Sırtüstü, baş hafif karşıya çevrilmiş, kol gövde yanında',
      probePosition: 'Klavikulanın hemen üstünde, orta 1/3 hatta koronal/oblik yerleşim',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Pulsasyon gösteren anekoik Subklavyan Arter (SCA)',
        'Arterin süperolateralinde petek/üzüm salkımı şeklinde hipoekoik pleksus demeti',
        'Arterin derininde 1. kosta hiperekoik çizgisi ve altında plevranın kayma hareketi ("seashore sign")'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.375 - %0.5 Ropivakain veya %0.25 - %0.5 Bupivakain + Lidokain',
      volumeRange: '20 - 25 mL',
      onsetDuration: 'Başlama: 10-15 dk, Süre: 10-18 saat',
      sensoryVsMotor: 'Derin motor ve cerrahi anestezi için yüksek konsantrasyon tercih edilir'
    },
    pearlsAndPitfalls: [
      'Kritik Köşe ("Corner Pocket"): 1. kosta ile subklavyan arter arasındaki alt trunkus (C8-T1/Ulnar) lifleri için ilk 5-8 mL bu cebe verilmelidir.',
      'Plevra delinme ve pnömotoraks riskine karşı 1. kosta net olarak görülmeli, iğne kostanın üzerine yönlendirilmelidir.',
      'Frenik sinir parezisi riski yaklaşık %30-50 arasındadır.'
    ],
    complications: ['Pnömotoraks', 'Vasküler ponksiyon (SCA)', 'Geçici Horner', 'Frenik parezi'],
    tags: ['dirsek', 'onkol', 'el', 'subklavyan', 'pleksus', 'corner-pocket']
  },
  {
    id: 'infraklavikuler',
    name: 'Infraclavicular Brachial Plexus Block',
    trName: 'İnfraklaviküler Brakiyal Pleksus Bloğu (ICB)',
    region: 'upper',
    regionLabel: 'Üst Ekstremite',
    summary: 'Aksiller arter etrafında fasiküller düzeyinde blok; kateter yerleşimi ve el/önkol cerrahileri için idealdir.',
    indications: [
      'Önkol, el bileği ve el kompleks rekonstrüksiyonları',
      'Dirsek altı travma cerrahileri',
      'Sürekli analjezi amacıyla periferik kateter takılması'
    ],
    contraindications: ['Pektoral bölge enfeksiyonu', 'Ağır kanama diyatezi', 'Klavikula kırığı olan taraf'],
    targetNerves: ['Lateral, posterior ve mediyal fasiküller (Kordlar)'],
    sensoryCoverage: ['Dirsek eklemi distalindeki tüm önkol ve el (T1 median/ulnar/radial)'],
    motorCoverage: ['El bileği ve elin tüm intrinsik kasları'],
    usg: {
      probe: 'Lineer Yüksek Frekans veya Kavisli Lineer',
      patientPosition: 'Sırtüstü, kol gövde yanında veya 90° abduksiyonda',
      probePosition: 'Korakoid çıkıntının hemen mediyaline, klavikulanın altına parasagittal yerleşim',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Yüzeyde Pektoralis Majör ve Minör kas tabakaları',
        'Derinde yuvarlak anekoik Aksiller Arter ve mediyalinde Aksiller Ven',
        'Arterin saat 9 (lateral), saat 6 (posterior) ve saat 3-4 (medial) yönündeki hiperekoik kordlar'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.375 - %0.5 Ropivakain veya %0.25 Bupivakain',
      volumeRange: '20 - 30 mL (Arter etrafında "at nalı" / "U şeklinde" yayılım hedeflenir)',
      onsetDuration: 'Başlama: 15-25 dk, Süre: 12-20 saat',
      sensoryVsMotor: 'Derin sensoryel ve motor blok'
    },
    pearlsAndPitfalls: [
      'Pnömotoraks riski supraklavikülere göre çok daha düşüktür; frenik sinir tutulumu nadirdir (<%3).',
      'İğne ucunun posterior korda (arterin tam arkasına, saat 6 hizasına) ulaşması tek enjeksiyonla tüm fasiküllerin homojen blokajını sağlar.',
      'Aksiller ven basıyla kollabe olabileceğinden renkli doppler ile venöz yapılar teyit edilmelidir.'
    ],
    complications: ['Aksiller arter ponksiyonu', 'Hematom', 'Lokal anestezik sistemik toksisitesi (LAST)'],
    tags: ['onkol', 'el', 'kateter', 'korakoid', 'fasikul']
  },
  {
    id: 'aksiller',
    name: 'Axillary Brachial Plexus Block',
    trName: 'Aksiller Brakiyal Pleksus Bloğu',
    region: 'upper',
    regionLabel: 'Üst Ekstremite',
    summary: 'Terminal sinir dalları düzeyinde yüzeyel, güvenli ve günübirlik el/el bileği cerrahisi bloğu.',
    indications: [
      'El ve el bileği cerrahileri (Karpal tünel, Dupuytren, tendon tamirleri)',
      'Distal önkol kırıkları (Colles vb.)',
      'Arteriyovenöz fistül (AVF) açılması'
    ],
    contraindications: ['Aksiller lenfadenit veya lokal enfeksiyon', 'Aksiller diseksiyon öyküsü'],
    targetNerves: ['Median, Ulnar, Radial ve Müskülokutanöz sinirler'],
    sensoryCoverage: ['Önkol distal 2/3’ü ve tüm el (Lateral önkol müskülokutanöz ile uyuşur)'],
    motorCoverage: ['El bileği fleksör ve ekstansörleri, parmak hareketleri'],
    usg: {
      probe: 'Lineer Yüksek Frekans (10-15 MHz)',
      patientPosition: 'Sırtüstü, kol 90° abdüksiyonda ve dirsek fleksiyonda',
      probePosition: 'Aksiller fossanın tepe noktasına transvers yerleşim',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Ortada anekoik pulsasyon veren Aksiller Arter',
        'Arter etrafındaki Median (süperolateral), Ulnar (medial/inferior) ve Radial (posterior) sinirler',
        'Korakobrakialis kası içinde ayrı seyreden fasiküler Müskülokutanöz Sinir'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.5 Lidokain + %0.25 Bupivakain karışımı veya %0.5 Ropivakain',
      volumeRange: '15 - 20 mL (Aksiller kılıfa 12-15 mL, Müskülokutanöz sinir çevresine 4-5 mL)',
      onsetDuration: 'Başlama: 10-15 dk, Süre: 8-14 saat',
      sensoryVsMotor: 'Dengeli cerrahi anestezi'
    },
    pearlsAndPitfalls: [
      'Müskülokutanöz sinir aksiller kılıfın dışındadır! Korakobrakialis kası içinde ayrıca bloke edilmezse lateral önkolda anestezi başarısız olur.',
      'Torasik duvara uzak olduğu için pnömotoraks riski yoktur; günübirlik hastalarda son derece emniyetlidir.',
      'Turnike ağrısını önlemek için medial antebrakial kutanöz ve interkostobrakial sinirler cilt altına 3-5 mL infiltrasyonla bloke edilebilir.'
    ],
    complications: ['İntravasküler enjeksiyon (Aksiller arter/ven)', 'Lokal hematom', 'Geçici parestezi'],
    tags: ['el', 'bilek', 'av-fistul', 'muskulokutanoz', 'gunubirlik']
  },

  // ==================== ALT EKSTREMİTE ====================
  {
    id: 'adduktor-kanal',
    name: 'Adductor Canal Block',
    trName: 'Adduktor Kanal Bloğu (ACB / Subsartoryal Blok)',
    region: 'lower',
    regionLabel: 'Alt Ekstremite',
    summary: 'Diz cerrahisinde motor gücü (kuadrisepsi) koruyarak erken mobilizasyon sağlayan modern analjezi yöntemi.',
    indications: [
      'Total diz artroplastisi (TKA) postoperatif analjezisi',
      'Ön çapraz bağ (ÖÇB / ACL) rekonstrüksiyonu',
      'Medial diz ve bacak cerrahileri analjezisi'
    ],
    contraindications: ['Uyluk anteromedialinde enfeksiyon', 'Ciddi nöropati', 'Hasta reddi'],
    targetNerves: ['Safenos sinir ve vastus medialis siniri (Motor koruyucu)'],
    sensoryCoverage: ['Diz anteromediali, patella altı ve bacağın medial yüzeyi'],
    motorCoverage: ['Kuadriseps motor gücü korunur (Düşme riski femoral bloğa göre belirgin düşüktür!)'],
    usg: {
      probe: 'Lineer Yüksek Frekans (10-15 MHz)',
      patientPosition: 'Sırtüstü, bacak hafif dış rotasyonda ve diz hafif fleksiyonda ("kurbağa bacağı")',
      probePosition: 'Uyluk orta 1/3 medialinde transvers yerleşim (Sartorius kası altında)',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Üstte üçgen biçimli Sartorius Kası çatısı',
        'Laterale Vastus Medialis kası, derinde Adductor Longus / Magnus kasları',
        'Adduktor kanal içinde Femoral Arter ve lateralinde/anteriorunda hiperekoik Safen Sinir'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.2 Ropivakain veya %0.125 - %0.25 Bupivakain',
      volumeRange: '15 - 20 mL',
      onsetDuration: 'Başlama: 10-15 dk, Süre: 16-24 saat',
      sensoryVsMotor: 'Saf duyusal analjezi (Motor blok minimal veya hiç)'
    },
    pearlsAndPitfalls: [
      'İğne ucu femoral arterin lateralinde veya anterolateralinde subsartoryal fasya altına yerleştirilmelidir.',
      'Yüksek volüm (>20 mL) proksimale kaçarak femoral sinir motor dallarını bloke edebilir; motor koruma için 15 mL idealdir.',
      'Total diz artroplastisinde tam analjezi için sıklıkla iPACK (İnterkapsüler popliteal boşluk) bloğu ile kombine edilir.'
    ],
    complications: ['Femoral arter ponksiyonu', 'Proksimal yayılıma bağlı geçici kuadriseps zaafı'],
    tags: ['diz', 'artroplasti', 'safen', 'motor-koruyucu', 'erken-mobilizasyon']
  },
  {
    id: 'femoral',
    name: 'Femoral Nerve Block',
    trName: 'Femoral Sinir Bloğu (FNB)',
    region: 'lower',
    regionLabel: 'Alt Ekstremite',
    summary: 'Uyluk ön yüzü, femur şaftı ve diz cerrahisinde yüksek başarı oranına sahip klasik blok.',
    indications: [
      'Femur şaft ve boyun kırıkları analjezisi (Acil servis ve perioperatif)',
      'Kuadriseps tendon rüptürü tamiri',
      'Uyluk ön yüzü greft alımı'
    ],
    contraindications: ['İnguinal bölge enfeksiyonu', 'Femoral arter grefti öyküsü', 'Şiddetli koagülopati'],
    targetNerves: ['Femoral Sinir (L2, L3, L4 anterior ramusları)'],
    sensoryCoverage: ['Uyluk ön yüzü, diz ekleminin anterioru, bacak medial kutanöz alanı'],
    motorCoverage: ['Kuadriseps femoris kası felci (Diz ekstansiyonu kaybolur - Düşme riski!)'],
    usg: {
      probe: 'Lineer Yüksek Frekans (10-15 MHz)',
      patientPosition: 'Sırtüstü, bacak nötral pozisyonda',
      probePosition: 'İnguinal katlantının hemen altında transvers yerleşim',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Medialden laterale: Femoral Ven, Femoral Arter ve Femoral Sinir ("VAN" kuralı)',
        'Arterin lateralinde, Fascia Iliaca altında hiperekoik kama/üçgen biçimli femoral sinir'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.25 - %0.5 Bupivakain veya %0.375 - %0.5 Ropivakain',
      volumeRange: '15 - 20 mL',
      onsetDuration: 'Başlama: 10-15 dk, Süre: 14-24 saat',
      sensoryVsMotor: 'Kuvvetli analjezi ve belirgin motor blok'
    },
    pearlsAndPitfalls: [
      'Lokal anestezik mutlaka Fascia Iliaca’nın altına enjekte edilmelidir; fasya üstü enjeksiyon başarısızlığın en sık nedenidir.',
      'Kuadriseps motor bloğu nedeniyle ameliyat sonrası ilk 24-48 saat hastanın desteksiz basmasına izin verilmemelidir (düşme protokolü uygulanmalıdır).',
      'Sadece analjezi istenen diz cerrahilerinde yerini büyük oranda Adduktor Kanal Bloğuna bırakmıştır.'
    ],
    complications: ['Femoral arter ponksiyonu', 'Kuadriseps atrofisi/düşme travması', 'Nöropati'],
    tags: ['femur', 'kirik', 'uyluk', 'kuadriseps', 'inguinal']
  },
  {
    id: 'popliteal-siyatik',
    name: 'Popliteal Sciatic Nerve Block',
    trName: 'Popliteal Siyatik Sinir Bloğu',
    region: 'lower',
    regionLabel: 'Alt Ekstremite',
    summary: 'Ayak, ayak bileği ve Aşil tendonu cerrahilerinde mükemmel anestezi ve uzun süreli analjezi.',
    indications: [
      'Ayak bileği kırıkları (Bimalleolar / Trimalleolar osteosentez)',
      'Aşil tendon onarımı',
      'Diyabetik ayak debridmanı ve ampütasyonları',
      'Halluks valgus ve ön ayak rekonstrüksiyonları'
    ],
    contraindications: ['Popliteal fossa enfeksiyonu', 'Ciddi periferik vasküler iskemi'],
    targetNerves: ['Siyatik Sinir bifürkasyonu: Tibial Sinir ve Common Peroneal Sinir (CPN)'],
    sensoryCoverage: ['Ayak ve ayak bileğinin tamamı (Medial malleol üzerindeki küçük safen alanı hariç)'],
    motorCoverage: ['Ayak bileği dorsifleksiyon/plantar fleksiyon ve parmak hareketleri'],
    usg: {
      probe: 'Lineer Yüksek Frekans (10-15 MHz)',
      patientPosition: 'Yüzüstü (Prone), lateral dekübit veya sırtüstü bacak elevasyonda',
      probePosition: 'Popliteal katlantının 5-8 cm proksimalinde transvers yerleşim',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Derinde popliteal arter ve ven',
        'Yüzeyelinde ve lateralinde Tibial ve Common Peroneal sinirlerin birleşme (bifürkasyon) noktası',
        'Venter kas kitleleri (Biseps femoris laterale, Semimembranozus mediyale)'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.375 - %0.5 Ropivakain veya %0.25 - %0.5 Bupivakain',
      volumeRange: '20 - 25 mL (Paranöral kılıf içine)',
      onsetDuration: 'Başlama: 15-25 dk, Süre: 18-30 saat',
      sensoryVsMotor: 'Derin anestezi ve tam motor blok'
    },
    pearlsAndPitfalls: [
      'Subepinevral değil, PARANÖRAL kılıf (Vloka kılıfı) içine girilip sinirlerin etrafında "donut işareti" oluşturulmalıdır.',
      'Safen sinir medial malleolü inerve ettiği için ayak bileği cerrahisinde sıklıkla Adduktor Kanal veya Safen blok ile kombine edilir.',
      'Turnike popliteal fossanın yukarısına konulacaksa uyluk kutanöz ağrısı için ek önlem gerekebilir.'
    ],
    complications: ['Common peroneal sinir hasarı (düşük ayak)', 'Vasküler ponksiyon', 'Gecikmiş motor blok çözülmesi'],
    tags: ['ayak', 'ayak-bilegi', 'asill', 'siyatik', 'popliteal']
  },
  {
    id: 'peng',
    name: 'PENG Block (Pericapsular Nerve Group)',
    trName: 'PENG Bloğu (Perikapsüler Sinir Grubu Bloğu)',
    region: 'lower',
    regionLabel: 'Alt Ekstremite',
    summary: 'Kalça kırıklarında ve artroplastisinde motor gücü tamamen koruyarak dramatik analjezi sağlayan yenilikçi blok.',
    indications: [
      'Kalça kırıkları (Femur boyun/trokanterik) acil analjezisi',
      'Total kalça artroplastisi (THA)',
      'Asetabulum ve kalça eklem revizyon cerrahileri'
    ],
    contraindications: ['İnguinal ligaman altında lokal enfeksiyon', 'Antikoagülasyon (rölatif)'],
    targetNerves: ['Femoral sinir artiküler dalları, Obturator sinir aksesuar/artiküler dalları'],
    sensoryCoverage: ['Kalça eklemi anterior kapsülü ve perikapsüler periost'],
    motorCoverage: ['Kuadriseps motor gücü TAMAMEN KORUNUR! Hastanın ayağa kalkışında zaaf yapmaz.'],
    usg: {
      probe: 'Düşük Frekanslı Kavisli (Konveks) veya Yüksek Frekanslı Lineer',
      patientPosition: 'Sırtüstü (Supine), bacak nötral pozisyonda',
      probePosition: 'Spina iliaka anterior inferior (AIIS) ile İliopubik eminens arasına oblik transvers',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Kemik konturları: AIIS (lateralde) ve İliopubik Eminens (IPE - medialde)',
        'Kemik tabanının hemen üstünde İliopsoas Tendo-kas kompleksi',
        'Tendonun süperomediyalinde Femoral Nörovasküler Paket'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.25 - %0.5 Bupivakain / Levobupivakain veya %0.375 Ropivakain',
      volumeRange: '20 - 25 mL',
      onsetDuration: 'Başlama: 15-20 dk, Süre: 16-24 saat',
      sensoryVsMotor: 'Motoru koruyan saf kapsüler artiküler analjezi'
    },
    pearlsAndPitfalls: [
      'İğne kemik tabana (İliopubik eminens ile AIIS arasındaki psoas oluğu) temas ettirilmeli ve LA psoas tendonunun DERİNİNE enjekte edilmelidir.',
      'Yüzeyel enjeksiyon femoral sinire difüzyon yaparak kuadriseps zaafına yol açabilir; kemik temasında hidrodiseksiyon görülmelidir.',
      'Lateral insizyon ağrısı için Lateral Femoral Kutanöz Sinir (LFCN) bloğu ile kombine edilmesi önerilir.'
    ],
    complications: ['Femoral arter yaralanması', 'Hematom', 'Kemiğe bağlı iğne ucu küntleşmesi'],
    tags: ['kalca', 'peng', 'motor-koruyucu', 'femur-boyun', 'artroplasti']
  },

  // ==================== GÖVDE & FASYA PLAN ====================
  {
    id: 'esp',
    name: 'Erector Spinae Plane Block',
    trName: 'Erector Spinae Plan Bloğu (ESP)',
    region: 'trunk',
    regionLabel: 'Gövde & Fasya Plan',
    summary: 'Torakal ve abdominal cerrahilerde geniş kraniyokaudal yayılımla somatik ve visseral analjezi sağlayan güvenli fasya bloğu.',
    indications: [
      'Torakotomi, VATS ve göğüs tüpü takılması',
      'Kaburga (kosta) kırıkları analjezisi',
      'Meme cerrahisi ve rekonstrüksiyonları (T4-T5 seviyesi)',
      'Laparoskopik kolesistektomi, bariatrik ve kolorektal cerrahi (T7-T9 seviyesi)',
      'Omurga cerrahileri ve lomber füzyonlar (Lomber ESP)'
    ],
    contraindications: ['Enjeksiyon bölgesinde cilt enfeksiyonu', 'Ağır sepsiste derin hematom riski'],
    targetNerves: ['Spinal sinirlerin dorsal ve ventral ramusları, sempatik zincir difüzyonu'],
    sensoryCoverage: ['Enjeksiyon seviyesinin 3-4 segment üst ve altındaki göğüs veya batın duvarı'],
    motorCoverage: ['Minimal (Erector spinae paraspinal kasları)'],
    usg: {
      probe: 'Lineer Yüksek Frekans (Torakal) veya Konveks (Lomber / Obez hasta)',
      patientPosition: 'Oturur pozisyon, yüzüstü (prone) veya lateral dekübit',
      probePosition: 'Hedef vertebra seviyesinde orta hattan 2.5 - 3 cm lateralde parasagittal yerleşim',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Transvers çıkıntı (TP - Transverse Process): Kare/yuvarlak hiperekoik gölgelenme',
        'Transvers çıkıntının üzerinde Erector Spinae kas kompleksi',
        'TP’ler arasında daha derinde plevra ve kostalar (iğne TP kemiği hedeflenerek plevradan korunur!)'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.25 - %0.375 Ropivakain veya %0.25 Bupivakain',
      volumeRange: '20 - 30 mL (Bilateral uygulamalarda toplam LA doz sınırına dikkat edilmelidir!)',
      onsetDuration: 'Başlama: 15-30 dk, Süre: 16-24 saat',
      sensoryVsMotor: 'Derin somatik analjezi, sempatik modülasyon'
    },
    pearlsAndPitfalls: [
      'En büyük güvenlik avantajı: İğne transvers çıkıntı kemiğine çarptırılır, plevraya ve nöraksiyel kordona dokunulmaz.',
      'Lokal anestezik ilacın Erector Spinae kasını transvers çıkıntıdan yukarı doğru kaldırdığı ("hidrodiseksiyon") net olarak izlenmelidir.',
      'Bilateral uygulamalarda hastanın ağırlığına göre hesaplanan maksimum güvenli doz aşılmamalıdır (Örn. bupivakain 2 mg/kg).'
    ],
    complications: ['Pnömotoraks (son derece nadir)', 'Hematom', 'LAST (yüksek volüm kullanımında)'],
    tags: ['toraks', 'vats', 'kosta', 'meme', 'fasya', 'kolesistektomi', 'omurga']
  },
  {
    id: 'tap',
    name: 'Transversus Abdominis Plane Block',
    trName: 'Transversus Abdominis Plan Bloğu (TAP)',
    region: 'trunk',
    regionLabel: 'Gövde & Fasya Plan',
    summary: 'Alt ve orta batın cerrahilerinde ön karın duvarı somatik ağrısını dindiren klasik fasya plan bloğu.',
    indications: [
      'Sezaryen operasyonu (Bilateral TAP)',
      'Apendektomi ve alt batın laparoskopik cerrahileri',
      'Kolorektal cerrahi ve radikal prostatektomi',
      'İnguinal herni onarımları'
    ],
    contraindications: ['Karın duvarında lokal enfeksiyon / flegmon', 'Peritonit'],
    targetNerves: ['Alt torakal ve 1. lomber spinal sinirlerin anterior dalları (T7-L1)'],
    sensoryCoverage: ['T7-L1 arası ön karın duvarı cildi, kasları ve paryetal periton (Visseral ağrıyı KESMEZ!)'],
    motorCoverage: ['Karın duvarı kasları geçici gevşeme gösterebilir'],
    usg: {
      probe: 'Lineer Yüksek Frekans (10-15 MHz)',
      patientPosition: 'Sırtüstü (Supine)',
      probePosition: 'Midaksiller hatta, iliak kanat ile subkostal marjin arasına transvers yerleşim',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Yüzeyden derine 3 kas tabakası:',
        '1. Eksternal Oblik Kas (EOM)',
        '2. İnternal Oblik Kas (IOM)',
        '3. Transversus Abdominis Kası (TAM) ve altında Periton tabakası'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.25 Bupivakain veya %0.375 Ropivakain',
      volumeRange: 'Bilateral için taraf başına 15 - 20 mL (Toplam 30 - 40 mL)',
      onsetDuration: 'Başlama: 15-20 dk, Süre: 12-18 saat',
      sensoryVsMotor: 'Somatik analjezi'
    },
    pearlsAndPitfalls: [
      'İlaç İnternal Oblik ile Transversus Abdominis kasları arasındaki fasyal plana verilerek iki kas birbirinden açılmalıdır ("çift gözlük" görünümü).',
      'Visseral (organ kaynaklı kramp) ağrıyı dindirmez; bu nedenle multimodal analjezinin (parasetamol, NSAİİ) bir parçası olarak kullanılmalıdır.',
      'Peritonun derin delinmesi veya intraabdominal organ (karaciğer/dalak) ponksiyonunu önlemek için iğne ucu sürekli USG altında takip edilmelidir.'
    ],
    complications: ['İntraperitoneal enjeksiyon', 'Karaciğer/barsak yaralanması', 'Hematom'],
    tags: ['sezaryen', 'batın', 'apendektomi', 'kolon', 'periton']
  },
  {
    id: 'rektus-kilifi',
    name: 'Rectus Sheath Block',
    trName: 'Rektus Kılıfı Bloğu (Rectus Sheath)',
    region: 'trunk',
    regionLabel: 'Gövde & Fasya Plan',
    summary: 'Göbek fıtığı ve orta hat laparotomilerinde periumbilikal somatik insizyonel ağrıyı kesen mükemmel teknik.',
    indications: [
      'Göbek fıtığı (Umblikal herni) ve epigastrik herni onarımı',
      'Orta hat laparotomi insizyonu analjezisi',
      'Laparoskopik cerrahide umblikal kamera portu ağrısı'
    ],
    contraindications: ['Rektus kılıfı hematomu veya enfeksiyonu'],
    targetNerves: ['7-11. interkostal sinirlerin anterior kutanöz dalları'],
    sensoryCoverage: ['Ön orta hat (ksifoidden pubise kadar göbek çevresi insizyon hattı)'],
    motorCoverage: ['Rektus abdominis kası'],
    usg: {
      probe: 'Lineer Yüksek Frekans (10-15 MHz)',
      patientPosition: 'Sırtüstü',
      probePosition: 'Göbeğin hemen lateralinde rektus kası üzerine transvers yerleşim',
      needleApproach: 'In-plane (Prob ekseninde)',
      sonoanatomy: [
        'Oval şekilli Rektus Abdominis kas kitlesi',
        'Kasın derininde hiperekoik Posterior Rektus Kılıfı (PRS)',
        'Kılıfın altında periton ve barsak peristaltizmi'
      ]
    },
    localAnesthetic: {
      recommendedDrugs: '%0.25 Bupivakain veya %0.2 Ropivakain',
      volumeRange: 'Bilateral taraf başına 10 - 15 mL',
      onsetDuration: 'Başlama: 10-15 dk, Süre: 10-16 saat',
      sensoryVsMotor: 'Kutanöz ve fasyal analjezi'
    },
    pearlsAndPitfalls: [
      'İlaç rektus kası ile posterior rektus kılıfı arasına verilmelidir; kılıfın delinip periton boşluğuna girilmemesine çok dikkat edilmelidir.',
      'Bilateral yapılmalıdır; orta hat ağrısı her iki taraftan gelen liflerle inerve edilir.',
      'Epigastrik arter ve venler kasın derin yüzeyinde yer aldığından renkli doppler ile vasküler yapılar kontrol edilmelidir.'
    ],
    complications: ['Epigastrik damar ponksiyonu', 'Periton delinmesi', 'Rektus hematomu'],
    tags: ['gobek', 'herni', 'laparatomi', 'orta-hat', 'rektus']
  }
];

// ==================== LOKAL ANESTESTİK VE LAST DOZLARI ====================

export interface LocalAnestheticProfile {
  id: string;
  name: string;
  brandTr: string;
  plainMaxDoseMgKg: number;
  plainMaxTotalMg: number;
  withEpiMaxDoseMgKg: number | null;
  withEpiMaxTotalMg: number | null;
  durationHours: string;
  toxicityRank: 'Yüksek (Kardiyotoksik)' | 'Orta-Yüksek' | 'Orta' | 'Düşük-Orta';
  toxicityColor: string;
  notes: string;
}

export const LOCAL_ANESTHETICS: LocalAnestheticProfile[] = [
  {
    id: 'bupivacaine',
    name: 'Bupivakain',
    brandTr: 'Marcaine / Buvasin',
    plainMaxDoseMgKg: 2.0,
    plainMaxTotalMg: 150,
    withEpiMaxDoseMgKg: 2.5,
    withEpiMaxTotalMg: 175,
    durationHours: '8 - 24 saat',
    toxicityRank: 'Yüksek (Kardiyotoksik)',
    toxicityColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    notes: 'Kardiyotoksisite potansiyeli en yüksek amiddir; miyokardiyal Na+ kanallarına güçlü bağlanır ve yavaş ayrılır. Ventriküler disritmi riski.'
  },
  {
    id: 'levobupivacaine',
    name: 'Levobupivakain',
    brandTr: 'Chirocaine',
    plainMaxDoseMgKg: 2.0,
    plainMaxTotalMg: 150,
    withEpiMaxDoseMgKg: 2.5,
    withEpiMaxTotalMg: 175,
    durationHours: '8 - 24 saat',
    toxicityRank: 'Orta-Yüksek',
    toxicityColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    notes: 'Bupivakainin saf S(-) enantiyomeri. Bupivakaine kıyasla daha düşük kardiyotoksik ve SSS toksisite profili.'
  },
  {
    id: 'ropivacaine',
    name: 'Ropivakain',
    brandTr: 'Naropin',
    plainMaxDoseMgKg: 3.0,
    plainMaxTotalMg: 225,
    withEpiMaxDoseMgKg: 3.5,
    withEpiMaxTotalMg: 250,
    durationHours: '8 - 20 saat',
    toxicityRank: 'Orta',
    toxicityColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    notes: 'Saf S(-) propil türevi. Motor bloktan ziyade duyusal blokaj ön plandadır (differansiyel blokaj). Kardiyotoksisitesi bupivakainden düşüktür.'
  },
  {
    id: 'lidocaine',
    name: 'Lidokain',
    brandTr: 'Aritmal / Jetokain',
    plainMaxDoseMgKg: 4.5,
    plainMaxTotalMg: 300,
    withEpiMaxDoseMgKg: 7.0,
    withEpiMaxTotalMg: 500,
    durationHours: '2 - 4 saat',
    toxicityRank: 'Düşük-Orta',
    toxicityColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    notes: 'Hızlı başlangıçlı orta etkili amid. Adrenalin eklendiğinde emilim belirgin yavaşlar ve güvenli doz 7 mg/kg’a çıkar.'
  },
  {
    id: 'prilocaine',
    name: 'Prilokain',
    brandTr: 'Citanest',
    plainMaxDoseMgKg: 6.0,
    plainMaxTotalMg: 400,
    withEpiMaxDoseMgKg: 8.0,
    withEpiMaxTotalMg: 600,
    durationHours: '2 - 5 saat',
    toxicityRank: 'Düşük-Orta',
    toxicityColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    notes: 'Yüksek dozlarda o-toluidin metaboliti methemoglobinemiye (>600 mg) yol açabilir. Tedavisi: Metilen mavisi 1-2 mg/kg.'
  }
];

export interface LastRescueDose {
  weightKg: number;
  bolusMl: number;
  infusionMlPerHour: number;
  infusionMlPerMin: number;
  refractoryBolusMl: number;
  refractoryInfusionMlPerHour: number;
  maxCumulativeMl: number;
}

/**
 * ASRA / ESRA 2024-2025 Kılavuzlarına göre %20 İntralipid (Lipid Rescue) hesaplayıcısı
 */
export function calculateLastLipidDoses(weightKg: number): LastRescueDose {
  const safeWeight = Math.max(1, Math.min(180, weightKg));
  
  // Bolus: 1.5 mL/kg İV (2-3 dakikada)
  const bolusMl = Math.round(safeWeight * 1.5);
  
  // İnfizyon: 0.25 mL/kg/dk -> saatlik mL = 0.25 * kg * 60 = 15 * kg
  const infusionMlPerMin = Number((safeWeight * 0.25).toFixed(1));
  const infusionMlPerHour = Math.round(safeWeight * 15);
  
  // Dirençli durumda tekrar bolus (1.5 mL/kg) ve 0.5 mL/kg/dk (saatlik 30 * kg)
  const refractoryBolusMl = bolusMl;
  const refractoryInfusionMlPerHour = Math.round(safeWeight * 30);
  
  // İlk 30-45 dakikadaki maksimum kümülatif doz: 12 mL/kg (veya üst sınır ~1000 mL)
  const maxCumulativeMl = Math.min(1000, Math.round(safeWeight * 12));

  return {
    weightKg: safeWeight,
    bolusMl,
    infusionMlPerHour,
    infusionMlPerMin,
    refractoryBolusMl,
    refractoryInfusionMlPerHour,
    maxCumulativeMl
  };
}
