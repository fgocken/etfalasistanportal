import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  Compass,
  ExternalLink,
  Eye,
  Maximize2,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface UsgCvcModuleProps {
  isDark: boolean;
}

type CvcSiteId = 'ijv' | 'subclavian' | 'femoral';
type ProbeAxis = 'oop' | 'ip';
type PeresAccessSite = 'r-ijv' | 'l-ijv' | 'r-scv' | 'l-scv' | 'femoral';
type CatheterType = 'triple-7fr' | 'sheath-85fr' | 'dialysis-12fr';

interface RealSonoItem {
  id: string;
  siteTag: CvcSiteId | 'general';
  regionLabel: string;
  title: string;
  imagePath: string;
  landmarks: string;
  clinicalNote: string;
  attribution: string;
  pmid: string;
  doi: string;
  license: string;
}

interface SiteProtocolSpec {
  id: CvcSiteId;
  name: string;
  shortName: string;
  probeInfo: string;
  position: string;
  landmarkSummary: string;
  anatomyNotes: string[];
  advantages: string[];
  cautions: string[];
  needleStrategy: string;
  compressionNote: string;
  depthRange: string;
  infectionRisk: string;
  thrombosisRisk: string;
  pneumothoraxRisk: string;
  coagulopathySafety: string;
}

const SITE_PROTOCOLS: Record<CvcSiteId, SiteProtocolSpec> = {
  ijv: {
    id: 'ijv',
    name: 'İnternal Juguler Ven (İJV)',
    shortName: 'İnternal Juguler (İJV)',
    probeInfo: 'Yüksek frekanslı Lineer Prob (7–15 MHz) · Derinlik ayarı: 2.5–3.5 cm',
    position: '15° Trendelenburg (hava embolisi önlemi + venöz dolgunluk) · Baş karşıya maksimum 15–30° rotasyon (aşırı rotasyon İJV’yi karotis üzerine bindirir).',
    landmarkSummary: 'Krikoid kıkırdak / Sedillot üçgeni (SKM sternal ve klaviküler başları arası). Sağ İJV brakiyosefalik ven ve SVC ile düz hat oluşturduğundan birinci tercihtir.',
    anatomyNotes: [
      'İJV tipik olarak Ana Karotis Arterin (AKA) anterolateralinde, ince duvarlı ve oval/eliptik kesitli olarak izlenir.',
      'Prob ile hafif basıda İJV tamamen kollabe olurken, kalın kas duvarlı Karotis Arter yuvarlak ve pulsatil kalır.',
      'Başın >45° döndürülmesi veni arterin tam önüne taşır ("double-wall" arter ponksiyonu riski artar).',
      'Johnston 2025: Ponksiyon öncesi ven çapı USG ile ölçülmeli; kateter dış çapı / ven çapı oranı mümkünse ≤%33–45 tutularak kateter ilişkili tromboz (CRT) azaltılmalıdır.'
    ],
    advantages: [
      'USG altında anatomik görüntülemesi en net ve öğrenme eğrisi en yüksek erişim yeridir.',
      'Dışarıdan doğrudan bası uygulanabildiği için koagülopati/antikoagülan varlığında uzman operatör + gerçek zamanlı USG ile rutin kan ürünü profilaksisi gerektirmeden güvenli uygulanabilir.',
      'Sağ İJV yoluyla kateter ucunun kava-atriyal bileşkeye (CAJ / alt SVC, karina düzeyi) malpozisyon oranı en düşüktür.'
    ],
    cautions: [
      'Sol İJV seçilirse torasik duktus hasarı (şilotoraks) ve sol brakiyosefalik ven açılanmasına bağlı duvar erozyonu riski daha yüksektir.',
      'Çok derin veya klavikulaya çok yakın ponksiyonda apikal plevra (pnömotoraks) veya subklavyen arter yaralanması gelişebilir.',
      'Hipovolemik hastada solunumla tam kollaps görülebilir; Trendelenburg artırılmalı ve hastaya Valsalva/ekspiratuvar tutma yaptırılmalıdır.'
    ],
    needleStrategy: 'Kısa eksende (Out-of-Plane) "walk-down" tekniği veya uzun eksende (In-Plane) oblik/supraklaviküler yaklaşım kullanılır. İğne açısı 30–45° olmalıdır.',
    compressionNote: 'Kompresyon altında İJV lümeni tamamen kapanır; AKA dairesel formunu ve pulsasyonunu korur.',
    depthRange: '1.0 – 2.2 cm',
    infectionRisk: 'Orta (3SITES: Subklavyenden yüksek, femoral ile benzer/hafif düşük)',
    thrombosisRisk: 'Orta (Kateter/Ven oranı ≤%33–45 ile CRT azaltılır)',
    pneumothoraxRisk: 'Çok Düşük (< %0.1–0.5, USG ile nadir)',
    coagulopathySafety: 'Uygun (Basılabilir bölge + USG)'
  },
  subclavian: {
    id: 'subclavian',
    name: 'Subklavyen / İnfraklaviküler Aksiller Ven (SKV)',
    shortName: 'Subklavyen / Aksiller',
    probeInfo: 'Lineer Prob (7–13 MHz, obezitede mikrokonveks) · Derinlik ayarı: 3.0–4.5 cm',
    position: '10–15° Trendelenburg · Baş nötral veya hafif karşıya dönük · Omuzlar doğal pozisyonda (omuz altına rulo koymak klavikulayı vene bastırıp daraltabilir).',
    landmarkSummary: 'USG ile klavikula altında aslında "İnfraklaviküler Aksiller Ven" görüntülenir (1. kosta dış kenarında subklavyen vene devam eder).',
    anatomyNotes: [
      'Klavikula distal 1/3 altında prob aksiyel/oblik yerleştirildiğinde Aksiller Ven yüzeyelde ve anteromedialde, Aksiller Arter posterolateralde görülür.',
      'Damarların hemen derininde parlak hiperekoik Plevral Çizgi ve solunumla senkron "lung sliding" izlenir.',
      'Klavikula güçlü akustik gölgelenme oluşturur; prob hafif kaudale/laterale açılandırılarak ven penceresi açılır.'
    ],
    advantages: [
      '3SITES çalışmasına göre santral kateter ilişkili kan dolaşımı enfeksiyonu (CLABSI) ve semptomatik DVT riski en düşük bölgedir.',
      'Pansuman stabilitesi ve hasta konforu (boyun hareketlerinden etkilenmez, uzun süreli yoğun bakım/TPN) mükemmeldir.',
      'Kafa içi basınç artışı (KİBAS) veya boyunluk (servikal travma) bulunan olgularda venöz dönüşü engellemez.'
    ],
    cautions: [
      'Klavikula arkasında kaldığı için arteriyel kanamada dışarıdan kompresyon UYGULANAMAZ; koagülopati/antikoagülasyon varlığında basılabilir bölgelere göre risklidir.',
      'Pnömotoraks ve hemotoraks riski (3SITES verisi: ~%1.5) İJV ve femorale kıyasla anlamlı olarak daha yüksektir.',
      'Ömür Boyu Damar Koruma (Johnston 2025): Kronik böbrek hastalığında (KBH / gelecekteki diyaliz AV fistülü) santral venöz stenozu önlemek için subklavyen erişimden kaçınılmalı; mastektomi veya aksiller lenf nodu diseksiyonu geçiren tarafta aksiller/subklavyen kanülasyon yapılmamalıdır.'
    ],
    needleStrategy: 'Klavikula gölgesinden kaçınmak için Uzun Eksen (In-Plane) lateral-to-medial aksiller yaklaşım plevrayı ve iğne ucunu kesintisiz görmek açısından altın standarttır.',
    compressionNote: 'Göğüs duvarı/klavikula komşuluğu nedeniyle ven tam kollabe olmayabilir; Renkli/Pulse Doppler ve duvar kalınlığı mutlaka doğrulanmalıdır.',
    depthRange: '2.0 – 3.8 cm',
    infectionRisk: 'En Düşük (3SITES: 0.5 / 1000 kateter günü)',
    thrombosisRisk: 'En Düşük (Subklavyen HR belirgin düşük)',
    pneumothoraxRisk: 'En Yüksek (~%1.5; USG In-Plane ile azaltılır)',
    coagulopathySafety: 'Riskli (Komprese edilemez bölge)'
  },
  femoral: {
    id: 'femoral',
    name: 'Femoral Ven (FV)',
    shortName: 'Femoral Ven (FV)',
    probeInfo: 'Lineer Prob (7–15 MHz) · Derinlik ayarı: 3.0–4.5 cm (obezitede 5–6 cm)',
    position: 'Supin (Trendelenburg gerektirmez — solunum sıkıntısında ideal) · Bacak hafif abdüksiyon ve dış rotasyon ("kurbağa bacağı").',
    landmarkSummary: 'İnguinal ligaman (ASIS–pubik tüberkül hattı) 1–2 cm distali. Lateralden Mediale "NAVEL" sırası: Sinir (Nerve) – Arter – Ven – Boşluk – Lenfatikler.',
    anatomyNotes: [
      'Femoral Ven (FV), Femoral Arterin (FA) hemen medialinde yerleşir; ancak distale indikçe ven arterin posterioruna (altına) kayar — ponksiyon inguinal kıvrıma yakın yapılmalıdır.',
      'Safena magna veninin femoral vene döküldüğü proksimal düzeyde (saphenofemoral junction) hedef çap en geniştir.',
      'Femoral sinir, fasya iliaka altında arterin lateralinde kama şeklinde hiperekoik görünür.'
    ],
    advantages: [
      'Pnömotoraks/hemotoraks riski SIFIRDIR ve KPR sırasında göğüs kompresyonları sürerken eş zamanlı takılabilir.',
      'Supin pozisyonda baş-aşağı yatırılmayı tolere edemeyen ağır pulmoner ödem, KOAH atağı veya KİBAS hastalarında hızlı erişim sağlar.',
      'Tamamen basılabilir olduğu için ağır koagülopatide veya trombolitik tedavi alacak hastalarda en güvenli alternatiftir.'
    ],
    cautions: [
      'Kasık kıvrımı florası ve nem nedeniyle CLABSI enfeksiyon riski ile derin ven trombozu (DVT) insidansı en yüksektir (ASA/CDC: elektif uzun süreli erişimde son tercih, 48–72 sa içinde çekilmeli).',
      'İnguinal ligaman üstüne çıkılırsa retroperitoneal kanama gelişebilir (kompresyonla durmaz!).',
      'CVP ölçümü yüksek karın içi basıncından etkilenebilir; ancak Johnston 2025 damar koruma ilkesi gereği üst ekstremite venlerinin mutlak korunması gereken diyaliz/SVC trombozu olgularında stratejik alternatiftir.'
    ],
    needleStrategy: 'Kısa eksen (Out-of-Plane) veya oblik yaklaşımla FV, FA ile üst üste binmeden tam medialde yakalanır. İğne açısı 30–45°.',
    compressionNote: 'Kompresyonda FV tamamen kapanır; FA ise yuvarlak ve pulsatil kalır (ancak derin ven trombozunda ven komprese olmaz — trombüsü dışla!).',
    depthRange: '1.5 – 3.5 cm',
    infectionRisk: 'En Yüksek (İnguinal kolonizasyon; 3SITES)',
    thrombosisRisk: 'En Yüksek (İliofemoral DVT riski)',
    pneumothoraxRisk: 'Yok (%0)',
    coagulopathySafety: 'Çok Güvenli (Tam basılabilir)'
  }
};

const SELDINGER_STEPS = [
  {
    id: 1,
    title: 'LocSSIPs Time-Out, Pre-Prosedürel USG (RaCeVA) & Damar Koruma',
    detail: 'İşlem öncesi LocSSIPs güvenlik kontrolü yapılır. Her iki taraf venleri USG ile taranır: ven iç çapı ölçülür (Kateter/Ven oranı ≤%33–45), trombüs/hipoplazi dışlanır. KBH (AV fistül) veya mastektomi/aksiller cerrahi tarafı korunur. Antikoagülan/koagülopati risk-yarar dengesi kurulur; basılabilir bölge (İJV/FV) ve deneyimli operatör + USG ile gereksiz kan ürünü profilaksisinden kaçınılır.'
  },
  {
    id: 2,
    title: 'Maksimal Steril Bariyer (MSB) & Klorheksidin Antisepsisi',
    detail: 'Operatör: bone, maske, steril önlük ve steril eldiven. Hasta: tepeden tırnağa tam steril örtü. Cilt: %2 Klorheksidin Glukonat + %70 İzopropil Alkol ile temizlenip tam kuruma (≥ 30 sn) beklenir. USG probu steril kılıf ve steril jel ile kaplanır.'
  },
  {
    id: 3,
    title: 'Pozisyon & Gerçek Zamanlı Dinamik USG Ponksiyonu',
    detail: 'İJV/SKV için 15° Trendelenburg verilir; baş rotasyonu ≤ 30° tutulur. Lokal anestezi (%1–2 lidokain) sonrası iğne ucu ekranda kesintisiz takip edilerek damar ön duvarına tek geçişte girilir (arka duvara geçilmez).'
  },
  {
    id: 4,
    title: 'Venöz Kan Akımı & İğne İçi Konum Doğrulaması',
    detail: 'Aspirasyonda koyu renkli ve pulsatil olmayan düşük basınçlı venöz akım doğrulanır. Şüphe halinde (hipotansif hastada koyu arter kanı veya yüksek basınçlı ven) iğneyi oynatmadan basınç transdüksiyonu (manometri) veya USG’de tel görünümü teyit edilir.'
  },
  {
    id: 5,
    title: 'J-Uçlu Kılavuz Tel (Guidewire) İlerletme Güvenliği',
    detail: 'İğne sabit tutulurken J-uçlu kılavuz tel dirençsiz biçimde en fazla ~18–20 cm ilerletilir. Direnç varsa ZORLAMA. Monitörde yeni ventriküler ektopi/PVC görülürse tel derhal 2–3 cm geri çekilir. Tel ASLA elden bırakılmaz ("Never Event" önlemi).'
  },
  {
    id: 6,
    title: 'Kontrollü Cilt İnsizyonu & Kısa Dilatasyon',
    detail: 'Telin damar içinde olduğu USG (uzun/kısa eksen) ile teyit edildikten sonra bistüri sırtı tele dönük küçük cilt kesisi yapılır. Dilatatör tüm boyuyla değil, sadece cilt-subkütan-damar duvarı mesafesi kadar (genellikle 2–4 cm) tel üzerinde serbestçe kaydırılarak çevrilir.'
  },
  {
    id: 7,
    title: 'Kateter İlerletme & İki Kişilik "Never Event" Tel Teyidi',
    detail: 'Kateter tel üzerinden ilerletilmeden önce telin arka ucu distal hub’dan dışarı çıkana dek geri çekilip elle kavranır. Kateter Peres derinliğine yerleştirilir, tel tamamen çıkarılır ve J-ucun tam/sağlam çıktığı iki kişiyle görsel-fiziksel teyit edilir (en ufak şüphede acil grafi zorunludur!).'
  },
  {
    id: 8,
    title: 'Lümen Hazırlığı, Tespit & Multimodal Uç Doğrulama (CAJ / Karina)',
    detail: 'Tüm lümenlerden serbest kan aspirasyonu yapılıp %0.9 NaCl ile yıkanır. Sütür + steril CHG şeffaf pansuman uygulanır. Hedef uç (alt SVC / kava-atriyal bileşke, radyografik karina düzeyi, perikard dışı) İntrakaviter EKG (IC-ECG) veya grafi + USG plevral kayma ile doğrulanır.'
  }
];

const QUICK_NAV = [
  { id: 'cvc-sites', label: '1. Bölge Seçimi & 3SITES' },
  { id: 'cvc-usg', label: '2. İnteraktif USG Sonoanatomi' },
  { id: 'cvc-peres', label: '3. Peres Derinlik Hesabı' },
  { id: 'cvc-seldinger', label: '4. Seldinger 8 Adım' },
  { id: 'cvc-complications', label: '5. Komplikasyon & Kriz' },
  { id: 'cvc-refs', label: '6. Kaynaklar' }
];

const CVC_REFERENCES = [
  {
    id: 'aa-safe-vascular-2025',
    citation: 'Johnston AJ, Simpson MJ, McCormack V, et al. Association of Anaesthetists guidelines: safe vascular access 2025. Anaesthesia. 2025;80(11):1381–1396.',
    note: '2025 Güncel Kılavuz: 6 alanda 15 uzlaşı önerisi — LocSSIPs güvenlik listeleri, ömür boyu damar koruma (KBH/AVF ve mastektomi/aksiller cerrahi), Kateter/Ven çap oranı & CRT önlemi, koagülopati/antikoagülasyon yönetimi, IC-ECG/karina uç doğrulama ve kılavuz tel retansiyonu ("Never Event") önlemi.',
    pmid: '40958714',
    doi: '10.1111/anae.16727'
  },
  {
    id: 'asa-cvc-2020',
    citation: 'ASA Task Force on Central Venous Access. Practice Guidelines for Central Venous Access 2020. Anesthesiology. 2020;132(1):8–43.',
    note: 'Gerçek zamanlı USG, basınç/USG venöz doğrulama, arteriyel dilatasyonda kateteri yerinde bırakma ve post-prosedür uç doğrulama standardı.',
    pmid: '31821240',
    doi: '10.1097/ALN.0000000000002864'
  },
  {
    id: 'perseus-2020',
    citation: 'Lamperti M, Biasucci DG, Disma N, et al. European Society of Anaesthesiology guidelines on peri-operative use of ultrasound-guided for vascular access (PERSEUS). Eur J Anaesthesiol. 2020;37(5):344–376.',
    note: 'Perioperatif İJV, aksiller/subklavyen ve femoral erişimde USG tarama (RaCeVA), In-Plane/Out-of-Plane teknik ve plevral doğrulama.',
    pmid: '32265391',
    doi: '10.1097/EJA.0000000000001180'
  },
  {
    id: '3sites-2015',
    citation: 'Parienti JJ, Mongardon N, Mégarbane B, et al. (3SITES Study Group). Intravascular Complications of Central Venous Catheterization by Insertion Site. N Engl J Med. 2015;373(13):1220–1229.',
    note: '3.471 kateterizasyonda Subklavyen vs İJV vs Femoral bölgelerinin enfeksiyon, tromboz ve pnömotoraks risk karşılaştırması.',
    pmid: '26398070',
    doi: '10.1056/NEJMoa1500964'
  },
  {
    id: 'peres-1990',
    citation: 'Peres PW. Positioning central venous catheters—a prospective survey. Anaesth Intensive Care. 1990;18(4):536–539.',
    note: 'Boy temelli SVK yerleştirme derinliği formülleri (Sağ İJV Boy/10, Sol İJV Boy/10+4, Sağ SKV Boy/10−2, Sol SKV Boy/10+2).',
    pmid: '2268022',
    doi: '10.1177/0310057X9001800422'
  },
  {
    id: 'cdc-clabsi-2011',
    citation: 'O’Grady NP, Alexander M, Burns LA, et al. Guidelines for the Prevention of Intravascular Catheter-Related Infections. Clin Infect Dis. 2011;52(9):e162–e193.',
    note: 'Maksimal Steril Bariyer (MSB), >%0.5 alkolik klorheksidin cilt antisepsisi, femoral bölgeden kaçınma ve günlük kateter gerekliliği değerlendirmesi.',
    pmid: '21460264',
    doi: '10.1093/cid/cir257'
  }
];

const REAL_SONO_GALLERY: RealSonoItem[] = [
  {
    id: 'real-ijv-compression',
    siteTag: 'ijv',
    regionLabel: 'İJV · Kısa Eksen + Kompresyon Testi',
    title: 'İnternal Juguler Ven (j) vs Karotis Arter (c): Kompresyonla Kollaps',
    imagePath: '/usg/ijv_compression_real.jpg',
    landmarks: 'scm: Sternokleidomastoid · j: İJV · c: Ana Karotis Arter · kalın ok: Vagus siniri · scal: Skalen kas',
    clinicalNote: 'Panel A (kompresyon yok): İnce duvarlı oval İJV (j) açık izlenir. Panel B (prob basısı): İJV tamamen kollabe olurken kalın duvarlı Karotis Arter (c) yuvarlak formunu korur.',
    attribution: 'Walter U et al. Front Neurol. 2018;9:805 (Fig. 1A–B kırpılmış) · Wikimedia Commons',
    pmid: '30319534',
    doi: '10.3389/fneur.2018.00805',
    license: 'CC BY 4.0'
  },
  {
    id: 'real-axillary-inplane',
    siteTag: 'subclavian',
    regionLabel: 'Aksiller / Subklavyen · Uzun Eksen (In-Plane)',
    title: 'İnfraklaviküler Aksiller Ven: In-Plane Ponksiyon & Tel Geçişi',
    imagePath: '/usg/axillary_inplane_real.jpg',
    landmarks: 'Yüzeyelde Pektoralis Major/Minör fasya planları · Derinde hipoekoik Aksiller Ven lümeni · Hiperekoik iğne/tel hattı',
    clinicalNote: 'Klavikula gölgesinden kaçınarak deltopektoral alanda uzun eksende ön duvar tentingi ve kılavuz telin lümen içi ilerleyişi izlenmektedir.',
    attribution: 'Nikorowitsch J et al. Clin Res Cardiol. 2026 (Fig. 1B kırpılmış)',
    pmid: '40553151',
    doi: '10.1007/s00392-025-02692-7',
    license: 'CC BY 4.0'
  },
  {
    id: 'real-femoral-variation',
    siteTag: 'femoral',
    regionLabel: 'Femoral Ven · Kısa Eksen Anatomi & Varyasyon',
    title: 'Ana Femoral Ven (CFV) & Femoral Arter (CFA) İlişkisi',
    imagePath: '/usg/femoral_real.png',
    landmarks: 'CFA: Ana Femoral Arter · CFV: Ana Femoral Ven (a: olağan yan yana yerleşim · b: arter altı üst üste binme)',
    clinicalNote: 'Panel a’da beklenen medial ven konumu, Panel b’de ise distale indikçe venin arterin posterioruna (altına) kaydığı yüksek riskli varyasyon görülmektedir.',
    attribution: 'Kupó P et al. J Interv Card Electrophysiol. 2020 (Fig. 1)',
    pmid: '31823233',
    doi: '10.1007/s10840-019-00683-z',
    license: 'CC BY 4.0'
  },
  {
    id: 'real-dual-axis',
    siteTag: 'general',
    regionLabel: 'Kısa + Uzun Eksen · Çift Ekran Ponksiyon',
    title: 'Dinamik Eş Zamanlı OOP + IP İğne Şaftı ve Uç Doğrulaması',
    imagePath: '/usg/dual_axis_puncture_real.png',
    landmarks: '1a–3a: Kısa eksen (OOP) merkezleme · 1b–3b: Uzun eksen (IP) şaft/uç · 1c–3c: Gerçek zamanlı steril prob pozisyonu',
    clinicalNote: 'Önce kısa eksende ven orta hatta hizalanır, ardından uzun eksende iğne şaftı ve ucunun (3b) arka duvarı delmeden lümen ortasına girişi takip edilir.',
    attribution: 'Zhang Y et al. Front Cardiovasc Med. 2022 (Fig. 1)',
    pmid: '36741842',
    doi: '10.3389/fcvm.2022.1026619',
    license: 'CC BY 4.0'
  },
  {
    id: 'real-pleura-barcode',
    siteTag: 'subclavian',
    regionLabel: 'Post-SVK Plevra Tarama · M-Mod',
    title: 'Pnömotoraks Bulgusu: M-Mod "Barcode / Stratosphere Sign"',
    imagePath: '/usg/pleura_barcode_real.jpg',
    landmarks: 'Üstte B-Mod plevra çizgisi (3.8 cm) · Altta M-Mod plevral kayma kaybına bağlı yatay paralel çizgiler',
    clinicalNote: 'Normalde plevral kayma ile oluşan granüler "Seashore (kıyı)" görüntüsünün kaybolup paralel barkod çizgilerine dönmesi pnömotoraks açısından yüksek derecede anlamlıdır.',
    attribution: 'Anto AM et al. Front Med. 2026 (Fig. 2)',
    pmid: '41939769',
    doi: '10.3389/fmed.2026.1795346',
    license: 'CC BY 4.0'
  }
];

export const UsgCvcModule: React.FC<UsgCvcModuleProps> = ({ isDark }) => {
  const [selectedSite, setSelectedSite] = useState<CvcSiteId>('ijv');
  const [probeAxis, setProbeAxis] = useState<ProbeAxis>('oop');
  const [compressionActive, setCompressionActive] = useState<boolean>(false);
  const [selectedSonoItem, setSelectedSonoItem] = useState<RealSonoItem | null>(null);

  // Peres & Equipment + Catheter-to-Vein Ratio Calculator States
  const [heightCm, setHeightCm] = useState<number>(175);
  const [peresSite, setPeresAccessSite] = useState<PeresAccessSite>('r-ijv');
  const [catheterType, setCatheterType] = useState<CatheterType>('triple-7fr');
  const [veinDiameterMm, setVeinDiameterMm] = useState<number>(10.0);

  // Seldinger 8-Step Checklist State
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const siteSpec = SITE_PROTOCOLS[selectedSite];

  const peresResult = useMemo(() => {
    const safeHeight = Math.max(100, Math.min(220, heightCm || 170));
    let depthCm = safeHeight / 10;
    let formulaText = 'Boy (cm) / 10';
    let recommendedLength = '15 – 16 cm';
    let targetAnatomy = 'Kava-Atriyal Bileşke (CAJ) · Alt SVC';
    let warningNote = 'Perikardiyal refleksiyon üzerinde (karina ~2–3 cm altı) tutulmalıdır.';

    if (peresSite === 'r-ijv') {
      depthCm = safeHeight / 10;
      formulaText = 'Boy (cm) / 10';
      recommendedLength = safeHeight >= 180 ? '16 – 20 cm' : '15 – 16 cm';
    } else if (peresSite === 'l-ijv') {
      depthCm = safeHeight / 10 + 4;
      formulaText = '(Boy (cm) / 10) + 4 cm';
      recommendedLength = '20 cm (16 cm çoğu erişkinde kısa kalır)';
      warningNote = 'Sol brakiyosefalik ven açısı nedeniyle uç lateral SVC duvarına dayanmamalıdır.';
    } else if (peresSite === 'r-scv') {
      depthCm = safeHeight / 10 - 2;
      formulaText = '(Boy (cm) / 10) − 2 cm';
      recommendedLength = '15 – 16 cm';
    } else if (peresSite === 'l-scv') {
      depthCm = safeHeight / 10 + 2;
      formulaText = '(Boy (cm) / 10) + 2 cm';
      recommendedLength = '20 cm';
    } else {
      depthCm = 18;
      formulaText = 'Standart İliofemoral / Alt İVC Uzunluğu';
      recommendedLength = '15 – 20 cm (tercihen 20 cm erişkin)';
      targetAnatomy = 'Ana İliak Ven / İnferior Vena Kava (renal ven altı)';
      warningNote = 'Femoral kateterde uç derinliği Peres formülü ile değil anatomik kateter boyu (15–20 cm göbekte) ile belirlenir.';
    }

    const catheterLabel =
      catheterType === 'triple-7fr'
        ? '7 Fr · 3 Lümen (16G Distal / 18G Med / 18G Prox)'
        : catheterType === 'sheath-85fr'
          ? '8.5 Fr · Geniş Çaplı İntrodüser (Hızlı Masif Resüsitasyon / PA Kateter)'
          : '11.5 – 13.5 Fr · Çift Lümenli Hemodiyaliz / CRRT Kateteri';

    const flushVolume =
      catheterType === 'triple-7fr'
        ? 'Her lümen için 5–10 mL %0.9 NaCl (Ölü boşluk ~0.4–0.6 mL)'
        : catheterType === 'sheath-85fr'
          ? 'Yan kol 10 mL %0.9 NaCl + kapalı valf kontrolü'
          : 'Lümen başına ~1.5–2.2 mL ölü boşluk · %0.9 NaCl veya protokol kilidi';

    const catheterOuterMm =
      catheterType === 'triple-7fr' ? 2.33 : catheterType === 'sheath-85fr' ? 2.83 : 4.0;
    const safeVeinMm = Math.max(4.0, Math.min(20.0, veinDiameterMm || 10.0));
    const catheterToVeinPct = (catheterOuterMm / safeVeinMm) * 100;

    const cvrStatus =
      catheterToVeinPct <= 33
        ? {
            tier: 'ideal' as const,
            label: 'İdeal Oran (≤ %33)',
            note: 'Johnston 2025: Endotel hasarı ve kateter ilişkili tromboz (CRT) riski minimaldir.'
          }
        : catheterToVeinPct <= 45
          ? {
              tier: 'borderline' as const,
              label: 'Kabul Edilebilir Sınır (%34 – %45)',
              note: 'Johnston 2025: Sınır değer; daha uzun kalış veya protrombotik zeminde CRT açısından yakın izlem gerekir.'
            }
          : {
              tier: 'high' as const,
              label: 'Yüksek CRT Riski (> %45)',
              note: 'Johnston 2025 Uyarı: Kateter ven lümeninin %45’inden fazlasını tıkamaktadır — daha ince kalibre kateter veya daha geniş ven seçin!'
            };

    return {
      depthCm: depthCm.toFixed(1),
      rangeLow: Math.max(8, depthCm - 1).toFixed(1),
      rangeHigh: (depthCm + 1).toFixed(1),
      formulaText,
      recommendedLength,
      targetAnatomy,
      warningNote,
      catheterLabel,
      flushVolume,
      catheterOuterMm: catheterOuterMm.toFixed(2),
      catheterToVeinPct: catheterToVeinPct.toFixed(1),
      cvrStatus
    };
  }, [heightCm, peresSite, catheterType, veinDiameterMm]);

  const toggleStep = (id: number) => {
    setCheckedSteps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const panelClass = `rounded-xl border transition-colors ${
    isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
  }`;

  const subSurfaceClass = `rounded-xl border ${
    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
  }`;

  return (
    <div className="space-y-6">
      {/* Sticky-Free Quick Section Navigation */}
      <nav
        aria-label="SVK Modül Bölümleri"
        className={`p-3 rounded-xl border flex flex-wrap items-center gap-2 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {QUICK_NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
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

      {/* BÖLÜM 1: ENDİKASYONLAR, KONTRENDİKASYONLAR & 3 BÖLGE KARŞILAŞTIRMASI (3SITES) */}
      <section id="cvc-sites" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
              <span>01 · Anatomik Erişim &amp; Damar Koruma</span>
              <span aria-hidden="true">·</span>
              <span>3SITES RKÇ · ASA 2020 · Association of Anaesthetists 2025</span>
            </div>
            <h3 className={`text-lg font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Endikasyonlar, Kontrendikasyonlar ve 3 Bölge Risk Matriksi
            </h3>
          </div>
        </div>

        {/* Endikasyonlar vs Rölatif Kontrendikasyonlar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
              Klinik Endikasyonlar
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• Vazoaktif ajan (Noradrenalin, Adrenalin, Vazopressin), hiperozmolar TPN (&gt;900 mOsm/L) veya irritan ilaç infüzyonu.</li>
              <li>• Çoklu uyumsuz ilaçların eş zamanlı çok lümenli uygulaması veya yetersiz periferik venöz erişim.</li>
              <li>• Hemodinamik monitörizasyon (CVP, ScvO₂, transpulmoner termodilüsyon) ve geçici transvenöz pacemaker.</li>
              <li>• Akut hemodiyaliz / CRRT (geniş lümenli diyaliz kateteri) veya masif hızlı volüm/kan resüsitasyonu (8.5 Fr Sheath).</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
              Rölatif Kontrendikasyonlar &amp; Bölge Değiştirme Kriterleri
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• Girişim bölgesinde cilt enfeksiyonu, yanık veya lokal derin ven trombozu (USG kompresyon testinde trombüs saptanması).</li>
              <li>• Koagülopati / Antikoagülan kullanımı (Johnston 2025): Subklavyen yerine <strong>basılabilir İJV veya Femoral</strong> seçilir; deneyimli operatör + gerçek zamanlı USG ile rutin gereksiz TDP/trombosit profilaksisinden kaçınılır.</li>
              <li>• Tek taraflı akciğer patolojisi (örn. karşı akciğerde pnömotoraks varsa): Sağlam hemitoraksı korumak için <strong>patolojik tarafa</strong> veya İJV/Femoral takılır.</li>
              <li>• İpsilateral klavikula kırığı, SVC sendromu, kalıcı pacemaker lead’leri, mastektomi/aksiller cerrahi tarafı veya KBH (diyaliz AV fistül korunması).</li>
            </ul>
          </div>
        </div>

        {/* 3 Bölge Karşılaştırma Tablosu */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse min-w-[680px]">
            <thead>
              <tr className={isDark ? 'bg-slate-950/90 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Klinik Parametre</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">İnternal Juguler (İJV)</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Subklavyen / Aksiller (SKV)</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Femoral Ven (FV)</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              <tr>
                <td className="p-3 font-medium">CLABSI Enfeksiyon Riski</td>
                <td className="p-3">Orta</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>En Düşük (3SITES referans)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>En Yüksek (48–72 sa çekilmeli)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Semptomatik Tromboz (DVT/CRT)</td>
                <td className="p-3">Orta (%0.9–2 · Kateter/Ven ≤%45 korur)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>En Düşük (%0.5)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>En Yüksek (%1.4–3+)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Pnömotoraks / Hemotoraks</td>
                <td className="p-3">Çok Düşük (&lt; %0.1–0.5)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>En Yüksek (~%1.5)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Yok (%0)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Kompresyon / Koagülopati</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Basılabilir · Güvenli</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>Basılamaz · Riskli</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Tam Basılabilir · Güvenli</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Ana Klinik Tercih</td>
                <td className="p-3">Perioperatif &amp; acil ameliyathane standart 1. tercih (Sağ İJV)</td>
                <td className="p-3">Uzun süreli YBÜ, TPN, KİBAS/boyunluk, trakeostomi (KBH’de kaçın)</td>
                <td className="p-3">KPR esnasında, ağır solunum yetmezliği, ağır koagülopati</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Johnston 2025 (Association of Anaesthetists): Ömür Boyu Damar Koruma & Koagülopati/CRT Çerçevesi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
              Ömür Boyu Damar Koruma (Vessel Preservation · Johnston 2025)
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>KBH &amp; Renal Replasman Adayları:</strong> Gelecekteki arteriyovenöz (AV) fistül/greft için ekstremite ve subklavyen venleri korumak amacıyla subklavyen erişimden kaçının; kısa süreli diyaliz dışında küçük kalibreli İJV seçin.</li>
              <li>• <strong>Mastektomi &amp; Aksiller Lenf Nodu Cerrahisi:</strong> Lenfödem ve venöz staz riski nedeniyle opere edilen ipsilateral üst ekstremite, aksiller ve subklavyen bölgeden uzak durun.</li>
              <li>• <strong>Cihaz Seçimi &amp; Lümen Sayısı:</strong> Klinik gereksinimi karşılayan <em>en ince kalibre ve en az lümenli</em> kateter seçilmelidir; Kateter / Ven iç çap oranı (aşağıdaki hesaplayıcı) işlem öncesi USG ile doğrulanır.</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
              Koagülopati, Antikoagülasyon &amp; CRT Çerçevesi (Johnston 2025)
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Kanama vs Trombüs/Transfüzyon Dengesi:</strong> Antikoagülan/antiagregan alan veya hafif-orta koagülopatili hastalarda gerçek zamanlı USG eşliğinde basılabilir bölgeden (İJV/Femoral) deneyimli operatörce yapılan girişim güvenlidir; kanıt olmadan rutin profilaktik TDP/trombosit önerilmez.</li>
              <li>• <strong>Kateter İlişkili Tromboz (CRT):</strong> Kateter çapının damar lümeninin %33–45’ini aşması akımı yavaşlatıp endotel hasarıyla CRT’yi artırır; klinik gereksinim bittiği gün kateter çekilmelidir.</li>
              <li>• <strong>LocSSIPs &amp; Ekip Standartları:</strong> Kurumsal vasküler erişim paketleri (LocSSIPs) ve ekip bazlı standartlar mekanik komplikasyonları ve “Never Event”leri anlamlı azaltır.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BÖLÜM 2: İNTERAKTİF USG SONOANATOMİ ATLASI */}
      <section id="cvc-usg" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span>02 · Dinamik B-Mod Ultrasonografi</span>
              <span aria-hidden="true">·</span>
              <span>ESAIC PERSEUS Standardı</span>
            </div>
            <h3 className={`text-lg font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              İnteraktif USG Sonoanatomi &amp; İğne Yaklaşım Simülatörü
            </h3>
          </div>

          {/* Bölge Sekmeleri */}
          <div className={`inline-flex flex-wrap p-1 rounded-lg border gap-1 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            {(['ijv', 'subclavian', 'femoral'] as CvcSiteId[]).map((sId) => (
              <button
                key={sId}
                type="button"
                onClick={() => setSelectedSite(sId)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSite === sId
                    ? isDark
                      ? 'bg-sky-600 text-white'
                      : 'bg-white text-sky-800 shadow-2xs'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {SITE_PROTOCOLS[sId].shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Kontroller + Split Console (SVG USG Viewport & Teknik Bilgi Paneli) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Sol Kolon: B-Mod USG Simülatörü */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
            {/* Prob Ekseni & Kompresyon Testi Butonları */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className={`inline-flex p-1 rounded-lg border text-xs ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setProbeAxis('oop')}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    probeAxis === 'oop'
                      ? isDark ? 'bg-slate-800 text-sky-300' : 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  Out-of-Plane (Kısa Eksen)
                </button>
                <button
                  type="button"
                  onClick={() => setProbeAxis('ip')}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    probeAxis === 'ip'
                      ? isDark ? 'bg-slate-800 text-sky-300' : 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  In-Plane (Uzun Eksen)
                </button>
              </div>

              <button
                type="button"
                onClick={() => setCompressionActive((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  compressionActive
                    ? 'bg-sky-600 border-sky-500 text-white'
                    : isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{compressionActive ? 'Prob Kompresyonu: AÇIK' : 'Kompresyon Testi Uygula'}</span>
              </button>
            </div>

            {/* Kalibreli B-Mode USG Ekranı (SVG) */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-slate-400 px-1">
                <span>B-MODE · LINEAR 10–12 MHz · {probeAxis === 'oop' ? 'TRANSVERS (OOP)' : 'LONGİTUDİNAL (IP)'}</span>
                <span className={compressionActive ? 'text-amber-400 font-semibold' : 'text-sky-400'}>
                  {compressionActive ? 'KOMPRESYON (+)' : 'NORMAL BASI'}
                </span>
              </div>

              <svg
                viewBox="0 0 560 300"
                className="w-full h-auto rounded-lg bg-[#05080f] border border-slate-800/80"
                role="img"
                aria-label={`${siteSpec.name} USG sonoanatomi şeması`}
              >
                <defs>
                  <linearGradient id="tissueBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity="0.55" />
                    <stop offset="35%" stopColor="#0f172a" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#020617" stopOpacity="0.98" />
                  </linearGradient>
                  <linearGradient id="veinLumen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#040914" />
                    <stop offset="100%" stopColor="#0a1628" />
                  </linearGradient>
                  <linearGradient id="arteryLumen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#070a12" />
                    <stop offset="100%" stopColor="#140c12" />
                  </linearGradient>
                </defs>

                {/* Tissue Field */}
                <rect x="0" y="0" width="510" height="300" fill="url(#tissueBg)" />

                {/* Subcutaneous / Fascia Echo Lines */}
                <path d="M 12 28 Q 250 34 495 28" stroke="#475569" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.7" />
                <path d="M 12 52 Q 250 62 495 50" stroke="#64748b" strokeWidth="1.2" fill="none" opacity="0.5" />

                {/* Right-side Depth Ruler (0 - 4 cm) */}
                <line x1="515" y1="10" x2="515" y2="285" stroke="#334155" strokeWidth="1.5" />
                {[0, 1, 2, 3, 4].map((cm) => {
                  const y = 14 + cm * 66;
                  return (
                    <g key={cm}>
                      <line x1="515" y1={y} x2="524" y2={y} stroke="#64748b" strokeWidth="1.5" />
                      <text x="528" y={y + 4} fill="#94a3b8" fontSize="11" fontFamily="monospace">
                        {cm}cm
                      </text>
                    </g>
                  );
                })}

                {/* SITE 1: INTERNAL JUGULAR VEIN */}
                {selectedSite === 'ijv' && probeAxis === 'oop' && (
                  <g>
                    {/* SCM Muscle */}
                    <path
                      d="M 85 48 Q 245 30 415 56 Q 360 95 245 96 Q 130 92 85 48 Z"
                      fill="#1e293b"
                      stroke="#64748b"
                      strokeWidth="1.4"
                      opacity="0.85"
                    />
                    <text x="245" y="68" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">
                      M. Sternokleidomastoideus (SKM)
                    </text>

                    {/* Thyroid (Medial) */}
                    <ellipse cx="425" cy="198" rx="48" ry="42" fill="#334155" stroke="#64748b" strokeWidth="1.2" opacity="0.7" />
                    <text x="425" y="202" textAnchor="middle" fill="#cbd5e1" fontSize="10.5">
                      Tiroid Lobu
                    </text>

                    {/* Carotid Artery (Medial, thick wall, non-compressible) */}
                    <circle cx="292" cy="176" r="28" fill="url(#arteryLumen)" stroke="#f87171" strokeWidth="2.8" />
                    <circle cx="292" cy="176" r="24" fill="none" stroke="#fca5a5" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.6" />
                    <text x="292" y="173" textAnchor="middle" fill="#fecaca" fontSize="11" fontWeight="700">
                      Karotis
                    </text>
                    <text x="292" y="187" textAnchor="middle" fill="#fca5a5" fontSize="9.5" fontFamily="monospace">
                      Pulsatil
                    </text>

                    {/* Internal Jugular Vein (Anterolateral, thin wall, collapses on compression) */}
                    <ellipse
                      cx="188"
                      cy={compressionActive ? 148 : 138}
                      rx={compressionActive ? 54 : 46}
                      ry={compressionActive ? 8 : 27}
                      fill="url(#veinLumen)"
                      stroke="#38bdf8"
                      strokeWidth="2.2"
                      style={{ transition: 'all 180ms ease-out' }}
                    />
                    <text
                      x="188"
                      y={compressionActive ? 128 : 136}
                      textAnchor="middle"
                      fill="#7dd3fc"
                      fontSize="11.5"
                      fontWeight="700"
                    >
                      İJV (Ven)
                    </text>
                    <text
                      x="188"
                      y={compressionActive ? 172 : 150}
                      textAnchor="middle"
                      fill="#38bdf8"
                      fontSize="9.5"
                      fontFamily="monospace"
                    >
                      {compressionActive ? 'Kollabe (%100)' : 'Kompresibl'}
                    </text>

                    {/* OOP Needle Tip Dot inside Vein */}
                    {!compressionActive && (
                      <g>
                        <circle cx="188" cy="130" r="4.5" fill="#facc15" />
                        <circle cx="188" cy="130" r="9" fill="none" stroke="#facc15" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="115" y="114" fill="#fde047" fontSize="10" fontFamily="monospace">
                          İğne Ucu (Eko)
                        </text>
                        <line x1="158" y1="117" x2="181" y2="127" stroke="#fde047" strokeWidth="1" />
                      </g>
                    )}

                    {/* Orientation Markers */}
                    <text x="18" y="286" fill="#94a3b8" fontSize="11" fontFamily="monospace">LATERAL</text>
                    <text x="435" y="286" fill="#94a3b8" fontSize="11" fontFamily="monospace">MEDİAL</text>
                  </g>
                )}

                {/* SITE 2: SUBCLAVIAN / AXILLARY VEIN */}
                {selectedSite === 'subclavian' && probeAxis === 'oop' && (
                  <g>
                    {/* Pectoralis Major / Minor */}
                    <rect x="28" y="40" width="450" height="44" rx="12" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" opacity="0.75" />
                    <text x="250" y="66" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">
                      M. Pectoralis Major &amp; Minor
                    </text>

                    {/* Clavicle / Rib Shadow (Medial/Superior) */}
                    <ellipse cx="425" cy="94" rx="44" ry="14" fill="#cbd5e1" stroke="#f8fafc" strokeWidth="1.5" />
                    <polygon points="382,102 468,102 478,285 372,285" fill="#020617" opacity="0.92" />
                    <text x="425" y="98" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="700">
                      Klavikula
                    </text>
                    <text x="425" y="165" textAnchor="middle" fill="#64748b" fontSize="9.5" fontFamily="monospace">
                      Akustik Gölge
                    </text>

                    {/* Axillary / Subclavian Artery (Lateral & slightly deeper) */}
                    <circle cx="162" cy="176" r="24" fill="url(#arteryLumen)" stroke="#f87171" strokeWidth="2.8" />
                    <text x="162" y="175" textAnchor="middle" fill="#fecaca" fontSize="10.5" fontWeight="700">
                      Aksiller Art.
                    </text>
                    <text x="162" y="188" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">
                      Pulsatil
                    </text>

                    {/* Axillary / Subclavian Vein (Medial/Superficial to Artery) */}
                    <ellipse
                      cx="265"
                      cy="160"
                      rx="42"
                      ry={compressionActive ? 14 : 25}
                      fill="url(#veinLumen)"
                      stroke="#38bdf8"
                      strokeWidth="2.2"
                      style={{ transition: 'all 180ms ease-out' }}
                    />
                    <text x="265" y="158" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="700">
                      Aksiller / SKV
                    </text>
                    <text x="265" y="172" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                      {compressionActive ? 'Kısmi Kollaps' : 'Venöz Lümen'}
                    </text>

                    {/* Hyperechoic Pleura Line & Lung */}
                    <line x1="40" y1="242" x2="368" y2="242" stroke="#fbbf24" strokeWidth="3" />
                    <line x1="40" y1="256" x2="368" y2="256" stroke="#fbbf24" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />
                    <text x="200" y="234" textAnchor="middle" fill="#fcd34d" fontSize="10.5" fontWeight="700">
                      PLEVRA ÇİZGİSİ ("Lung Sliding" Kontrol Et!)
                    </text>
                    <text x="200" y="274" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">
                      A-Çizgileri (Akciğer Parankimi)
                    </text>

                    {!compressionActive && (
                      <circle cx="265" cy="156" r="4.5" fill="#facc15" />
                    )}

                    <text x="18" y="286" fill="#94a3b8" fontSize="11" fontFamily="monospace">LATERAL</text>
                    <text x="435" y="286" fill="#94a3b8" fontSize="11" fontFamily="monospace">MEDİAL</text>
                  </g>
                )}

                {/* SITE 3: FEMORAL VEIN */}
                {selectedSite === 'femoral' && probeAxis === 'oop' && (
                  <g>
                    {/* Fascia Lata & Iliopsoas */}
                    <path d="M 18 76 Q 250 86 485 74" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
                    <text x="255" y="66" textAnchor="middle" fill="#cbd5e1" fontSize="10.5">
                      Fasya Lata &amp; Subkütan Doku
                    </text>

                    {/* Femoral Nerve (Lateral, honeycomb hyperechoic wedge) */}
                    <polygon points="80,152 136,142 128,176 74,174" fill="#334155" stroke="#a3e635" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x="105" y="162" textAnchor="middle" fill="#bef264" fontSize="10" fontWeight="700">
                      N (Sinir)
                    </text>

                    {/* Femoral Artery (Middle/Lateral) */}
                    <circle cx="204" cy="160" r="26" fill="url(#arteryLumen)" stroke="#f87171" strokeWidth="2.8" />
                    <text x="204" y="157" textAnchor="middle" fill="#fecaca" fontSize="10.5" fontWeight="700">
                      A (Arter)
                    </text>
                    <text x="204" y="170" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">
                      Pulsatil
                    </text>

                    {/* Femoral Vein (Medial) */}
                    <ellipse
                      cx="306"
                      cy={compressionActive ? 162 : 160}
                      rx={compressionActive ? 48 : 38}
                      ry={compressionActive ? 7 : 28}
                      fill="url(#veinLumen)"
                      stroke="#38bdf8"
                      strokeWidth="2.2"
                      style={{ transition: 'all 180ms ease-out' }}
                    />
                    <text
                      x="306"
                      y={compressionActive ? 144 : 158}
                      textAnchor="middle"
                      fill="#7dd3fc"
                      fontSize="11"
                      fontWeight="700"
                    >
                      V (Femoral Ven)
                    </text>
                    <text
                      x="306"
                      y={compressionActive ? 184 : 172}
                      textAnchor="middle"
                      fill="#38bdf8"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {compressionActive ? 'Kollabe (Trombüs Yok)' : 'Kompresibl'}
                    </text>

                    {/* Empty Space / Lymphatics */}
                    <circle cx="404" cy="158" r="14" fill="#1e293b" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="404" y="162" textAnchor="middle" fill="#94a3b8" fontSize="9.5">
                      EL (Lenf)
                    </text>

                    {!compressionActive && (
                      <circle cx="306" cy="152" r="4.5" fill="#facc15" />
                    )}

                    <text x="245" y="232" textAnchor="middle" fill="#94a3b8" fontSize="10.5" fontFamily="monospace">
                      NAVEL DİZİLİMİ (Lateral ➔ Medial)
                    </text>
                    <text x="18" y="286" fill="#94a3b8" fontSize="11" fontFamily="monospace">LATERAL</text>
                    <text x="435" y="286" fill="#94a3b8" fontSize="11" fontFamily="monospace">MEDİAL</text>
                  </g>
                )}

                {/* LONGITUDINAL / IN-PLANE VIEW FOR ALL SITES */}
                {probeAxis === 'ip' && (
                  <g>
                    <text x="255" y="42" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="600">
                      {siteSpec.name} · Uzun Eksen (Longitudinal / In-Plane) Görünümü
                    </text>

                    {/* Longitudinal Vein Channel */}
                    <rect
                      x="30"
                      y={compressionActive ? 132 : 108}
                      width="450"
                      height={compressionActive ? 18 : 66}
                      rx="6"
                      fill="url(#veinLumen)"
                      stroke="#38bdf8"
                      strokeWidth="2.2"
                      style={{ transition: 'all 180ms ease-out' }}
                    />
                    <text
                      x="360"
                      y={compressionActive ? 124 : 145}
                      textAnchor="middle"
                      fill="#7dd3fc"
                      fontSize="12"
                      fontWeight="700"
                    >
                      {selectedSite === 'ijv'
                        ? 'İnternal Juguler Ven Lümeni'
                        : selectedSite === 'subclavian'
                          ? 'Aksiller / Subklavyen Ven Lümeni'
                          : 'Femoral Ven Lümeni'}
                    </text>

                    {/* Full Needle Shaft + Bevel Tip inside Lumen */}
                    {!compressionActive && (
                      <g>
                        <line x1="45" y1="42" x2="218" y2="136" stroke="#facc15" strokeWidth="3.2" strokeLinecap="round" />
                        <circle cx="218" cy="136" r="5" fill="#fde047" />
                        <text x="122" y="72" fill="#fde047" fontSize="10.5" fontWeight="700">
                          İğne Şaftı + Uç Tamamı Görünür
                        </text>
                      </g>
                    )}

                    {/* Pleura / Deep Floor Warning Line */}
                    {selectedSite === 'subclavian' && (
                      <g>
                        <line x1="30" y1="226" x2="480" y2="226" stroke="#fbbf24" strokeWidth="3" />
                        <text x="255" y="246" textAnchor="middle" fill="#fcd34d" fontSize="10.5" fontWeight="700">
                          PLEVRA ÇİZGİSİ — İğne Ucu Daima Plevranın Üzerinde Tutulur!
                        </text>
                      </g>
                    )}

                    {selectedSite !== 'subclavian' && (
                      <g>
                        <rect x="30" y="198" width="450" height="32" rx="4" fill="url(#arteryLumen)" stroke="#f87171" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.7" />
                        <text x="255" y="218" textAnchor="middle" fill="#fca5a5" fontSize="10">
                          Arka Duvarın Altında Arter / Derin Yapılar (Arka Duvar Delinmez!)
                        </text>
                      </g>
                    )}

                    <text x="18" y="286" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                      {selectedSite === 'subclavian' ? 'LATERAL (İĞNE GİRİŞİ)' : 'SEFALİK / PROKSİMAL'}
                    </text>
                    <text x="365" y="286" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                      {selectedSite === 'subclavian' ? 'MEDİAL (KLAVİKULA)' : 'KAUDAL / KALP YÖNÜ'}
                    </text>
                  </g>
                )}
              </svg>

              {/* Ven vs Arter Ayırıcı Tanı Özeti (4 Kısa Kriter) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Kompresyon</span>
                  <span className="text-sky-300 font-semibold">Ven Tam Kapanır</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Duvar &amp; Şekil</span>
                  <span className="text-sky-300 font-semibold">İnce Duvar · Oval</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Solunum / Valsalva</span>
                  <span className="text-sky-300 font-semibold">Ven Çapı Değişir</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Hedef Derinlik</span>
                  <span className="text-slate-100 font-mono tabular-nums font-semibold">{siteSpec.depthRange}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Bölgeye Özel Klinik ve Teknik Detaylar */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className={`${subSurfaceClass} p-4 space-y-3 flex-1`}>
              <div className="pb-2.5 border-b border-slate-200 dark:border-slate-800">
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {siteSpec.name}
                </h4>
                <p className={`text-xs mt-1 font-mono ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
                  {siteSpec.probeInfo}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hasta Pozisyonu &amp; Landmark
                </span>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {siteSpec.position}
                </p>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {siteSpec.landmarkSummary}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Sonoanatomi &amp; İğne Tekniği
                </span>
                <ul className={`text-xs space-y-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {siteSpec.anatomyNotes.map((note, idx) => (
                    <li key={idx}>• {note}</li>
                  ))}
                </ul>
                <p className={`text-xs pt-1 font-medium ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                  İğne Stratejisi: {siteSpec.needleStrategy}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className={`font-semibold block ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    Üstünlükler:
                  </span>
                  <ul className={`space-y-0.5 mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {siteSpec.advantages.map((adv, idx) => (
                      <li key={idx}>• {adv}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className={`font-semibold block ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                    Dikkat Edilecek Tuzaklar:
                  </span>
                  <ul className={`space-y-0.5 mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {siteSpec.cautions.map((c, idx) => (
                      <li key={idx}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gerçek Klinik B-Mod / M-Mod Sonoanatomi Arşivi (Telifsiz CC BY 4.0) */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Gerçek Klinik B-Mod &amp; M-Mod Sonoanatomi Görselleri
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Açık erişimli hakemli dergi ve Wikimedia Commons arşivlerinden derlenen doğrulanmış CC BY 4.0 gerçek hasta taramaları · Büyütmek için görsele tıklayın
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
              {REAL_SONO_GALLERY.length} Gerçek Taramalar · CC BY 4.0
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {REAL_SONO_GALLERY.map((item) => {
              const isSiteMatch = item.siteTag === selectedSite;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSonoItem(item)}
                  className={`group rounded-xl border text-left overflow-hidden flex flex-col transition-colors cursor-pointer ${
                    isSiteMatch
                      ? isDark
                        ? 'bg-slate-950 border-sky-500/70'
                        : 'bg-sky-50/40 border-sky-400'
                      : isDark
                        ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative bg-black aspect-[16/10] w-full overflow-hidden border-b border-slate-800">
                    <img
                      src={item.imagePath}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-200"
                    />
                    <span className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-950/80 border border-slate-700 text-slate-200 opacity-85 group-hover:opacity-100">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="text-[11px] font-mono text-sky-600 dark:text-sky-400">
                        {item.regionLabel}
                      </div>
                      <div className={`text-xs font-bold leading-snug ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {item.title}
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.clinicalNote}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                      {item.attribution} · {item.license}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* BÖLÜM 3: İNTERAKTİF PERES KATETER DERİNLİĞİ & EKİPMAN HESAPLAYICISI */}
      <section id="cvc-peres" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-50 text-sky-700'}`}>
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Peres Derinliği &amp; Kateter / Ven Çap Oranı Hesaplayıcısı
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peres (1990) boy temelli hedef derinlik · Johnston (2025) Kateter/Ven oranı &amp; Kava-Atriyal Bileşke (CAJ)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Sol Girişler */}
          <div className={`lg:col-span-5 ${subSurfaceClass} p-4 space-y-4`}>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Hasta Boyu (cm)
                </label>
                <span className="text-sm font-mono tabular-nums font-bold text-sky-500">
                  {heightCm} cm
                </span>
              </div>
              <input
                type="range"
                min={120}
                max={210}
                step={1}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[155, 165, 175, 185, 195].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setHeightCm(preset)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono tabular-nums border transition-colors cursor-pointer ${
                      heightCm === preset
                        ? 'bg-sky-600 border-sky-500 text-white font-semibold'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {preset} cm
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Girişim Bölgesi &amp; Taraf
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {(
                  [
                    { id: 'r-ijv', label: 'Sağ İJV' },
                    { id: 'l-ijv', label: 'Sol İJV' },
                    { id: 'r-scv', label: 'Sağ SKV' },
                    { id: 'l-scv', label: 'Sol SKV' },
                    { id: 'femoral', label: 'Femoral' }
                  ] as { id: PeresAccessSite; label: string }[]
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPeresAccessSite(item.id)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      peresSite === item.id
                        ? 'bg-sky-600 border-sky-500 text-white'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Kateter Tipi &amp; Kalibre
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {(
                  [
                    { id: 'triple-7fr', label: '7 Fr (2.33 mm) · 3 Lümenli Standart SVK' },
                    { id: 'sheath-85fr', label: '8.5 Fr (2.83 mm) · Hızlı İnfüzyon / Sheath' },
                    { id: 'dialysis-12fr', label: '12 Fr (4.00 mm) · Diyaliz / CRRT Kateteri' }
                  ] as { id: CatheterType; label: string }[]
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCatheterType(cat.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium text-left border transition-colors cursor-pointer ${
                      catheterType === cat.id
                        ? 'bg-sky-600 border-sky-500 text-white font-semibold'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  USG Ölçülen Ven Çapı (mm)
                </label>
                <span className="text-sm font-mono tabular-nums font-bold text-teal-500">
                  {veinDiameterMm.toFixed(1)} mm
                </span>
              </div>
              <input
                type="range"
                min={5.0}
                max={18.0}
                step={0.5}
                value={veinDiameterMm}
                onChange={(e) => setVeinDiameterMm(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>5.0 mm (Hipovolemik / Dar)</span>
                <span>10.0 mm (Ortalama İJV)</span>
                <span>18.0 mm</span>
              </div>
            </div>
          </div>

          {/* Sağ Hesaplama Çıktıları */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-sky-950/30 border-sky-800/70' : 'bg-sky-50/70 border-sky-200'
              }`}>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                  Cilt Sabitleme Derinliği
                </span>
                <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums mt-1 ${
                  isDark ? 'text-sky-300' : 'text-sky-900'
                }`}>
                  {peresSite === 'femoral' ? '15–20' : peresResult.depthCm}{' '}
                  <span className="text-xs font-normal text-slate-400">cm</span>
                </div>
                <div className="text-[11px] font-mono tabular-nums mt-1 text-slate-500 dark:text-slate-400">
                  {peresSite === 'femoral'
                    ? 'İliofemoral tam boy'
                    : `${peresResult.rangeLow}–${peresResult.rangeHigh} cm · ${peresResult.formulaText}`}
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                  Önerilen Kateter Boyu
                </span>
                <div className={`text-lg sm:text-xl font-bold font-mono tabular-nums mt-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {peresResult.recommendedLength}
                </div>
                <div className="text-[11px] mt-1.5 text-slate-500 dark:text-slate-400">
                  Hedef: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{peresResult.targetAnatomy}</strong>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                peresResult.cvrStatus.tier === 'ideal'
                  ? isDark ? 'bg-emerald-950/30 border-emerald-800/70' : 'bg-emerald-50/80 border-emerald-200'
                  : peresResult.cvrStatus.tier === 'borderline'
                    ? isDark ? 'bg-amber-950/30 border-amber-800/70' : 'bg-amber-50/80 border-amber-200'
                    : isDark ? 'bg-rose-950/30 border-rose-800/70' : 'bg-rose-50/80 border-rose-200'
              }`}>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                  Kateter / Ven Oranı
                </span>
                <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums mt-1 ${
                  peresResult.cvrStatus.tier === 'ideal'
                    ? isDark ? 'text-emerald-300' : 'text-emerald-800'
                    : peresResult.cvrStatus.tier === 'borderline'
                      ? isDark ? 'text-amber-300' : 'text-amber-800'
                      : isDark ? 'text-rose-300' : 'text-rose-800'
                }`}>
                  %{peresResult.catheterToVeinPct}
                </div>
                <div className={`text-[11px] font-semibold mt-1 ${
                  peresResult.cvrStatus.tier === 'ideal'
                    ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                    : peresResult.cvrStatus.tier === 'borderline'
                      ? isDark ? 'text-amber-400' : 'text-amber-700'
                      : isDark ? 'text-rose-400' : 'text-rose-700'
                }`}>
                  {peresResult.cvrStatus.label}
                </div>
              </div>
            </div>

            <div className={`${subSurfaceClass} p-4 space-y-2.5 text-xs`}>
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                    Uç Doğrulama (Karina / IC-ECG) &amp; Tromboz (CRT) Koruması
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                    <strong>{peresResult.warningNote}</strong> {peresResult.cvrStatus.note} İntrakaviter EKG (IC-ECG) ile tel/kateter kava-atriyal bileşkeye (radyografik karina seviyesi) ulaştığında P dalgası maksimum amplitüde çıkar; bu noktadan <strong>1–2 cm geri çekilerek</strong> tespit edilir. Sağ atriyum içi yerleşim perforasyon ve tamponad riski taşır!
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Seçilen Ekipman ({peresResult.catheterOuterMm} mm Dış Çap):</span>
                  <span className="text-slate-600 dark:text-slate-400">{peresResult.catheterLabel}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Lümen Yıkama &amp; Hazırlık:</span>
                  <span className="text-slate-600 dark:text-slate-400">{peresResult.flushVolume}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BÖLÜM 4: SELDİNGER TEKNİĞİ 8 ADIMLI GÜVENLİ SVK KONTROL LİSTESİ */}
      <section id="cvc-seldinger" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Seldinger Tekniği: 8 Adımlı Güvenli SVK &amp; LocSSIPs Protokolü
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                LocSSIPs Time-Out · Maksimal Steril Bariyer · Dinamik USG · &quot;Never Event&quot; Tel Kontrolü
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono tabular-nums font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
              {checkedSteps.length} / {SELDINGER_STEPS.length} Tamamlandı
            </span>
            {checkedSteps.length > 0 && (
              <button
                type="button"
                onClick={() => setCheckedSteps([])}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {SELDINGER_STEPS.map((step) => {
            const isChecked = checkedSteps.includes(step.id);
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => toggleStep(step.id)}
                className={`p-4 rounded-xl border text-left transition-colors cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? isDark
                      ? 'bg-emerald-950/30 border-emerald-700/60'
                      : 'bg-emerald-50/70 border-emerald-300'
                    : isDark
                      ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono tabular-nums font-bold transition-colors ${
                    isChecked
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-400'
                        : 'bg-white border-slate-300 text-slate-600'
                  }`}
                >
                  {isChecked ? <Check className="w-3.5 h-3.5" /> : step.id}
                </span>
                <div className="space-y-1">
                  <span className={`text-xs font-bold block ${
                    isChecked
                      ? isDark ? 'text-emerald-300' : 'text-emerald-900'
                      : isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {step.title}
                  </span>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {step.detail}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* BÖLÜM 5: KRİTİK KOMPLİKASYONLAR & ACİL MÜDAHALE MATRİKSİ */}
      <section id="cvc-complications" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-rose-500/15 text-rose-400' : 'bg-rose-50 text-rose-700'}`}>
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kritik Mekanik Komplikasyonlar &amp; Acil Müdahale Kriterleri
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ASA 2020 &amp; Association of Anaesthetists 2025: Arteriyel Dilatasyon · Pnömotoraks · Hava Embolisi · &quot;Never Event&quot; Kılavuz Tel Güvenliği
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-rose-950/25 border-rose-900/60' : 'bg-rose-50/70 border-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Yanlışlıkla Arteriyel Ponksiyon vs Dilatasyon</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • <strong>Sadece İnce İğne (18G) İle Girildiyse:</strong> İğneyi hemen geri çekin ve basılabilir bölgede (İJV/Femoral) kesintisiz 5–10 dk doğrudan bası uygulayın.<br />
              • <strong>Dilatatör veya Kateter Arter İçindeyse (ASA KRİTİK KURAL):</strong> <strong>KATETERİ ASLA DOĞRUDAN ÇEKMEYİN!</strong> Kateteri yerinde sabit bırakın, transdüsere bağlayın ve derhal Kalp-Damar Cerrahisi / Girişimsel Radyoloji ile cerrahi/endovasküler onarım planlayın. Körlemesine çekilmesi ölümcül hemoraji, hava yolu basısı (retrofaringeal hematom) veya inme yaratır.
            </p>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
              <Activity className="w-4 h-4 shrink-0" />
              <span>Pnömotoraks &amp; Hemotoraks (USG Plevral Tarama)</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • İşlem bitiminde lineer probla her iki anterior göğüs duvarında (2–4. İKA) <strong>plevral kayma (lung sliding)</strong> ve B-çizgileri bakılır; kaymanın kaybı (“Barcode / Stratosphere sign”) ve akciğer noktası (lung point) yüksek doğrulukla pnömotoraksı gösterir.<br />
              • Pozitif basınçlı ventilasyon altındaki hastada ani Ppeak artışı, desatürasyon ve hipotansiyon varsa tansiyon pnömotoraks düşünülerek acil iğne/tüp dekompresyonu yapılır.
            </p>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-sky-600 dark:text-sky-400">
              <Compass className="w-4 h-4 shrink-0" />
              <span>Venöz Hava Embolisi (VAE)</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • Hipovolemik veya spontan soluyan hastada açık kateter hub’ından negatif intratorasik basınçla hava emilebilir (ani EtCO₂ düşüşü, taşikardi, "mill-wheel" üfürüm, hipotansiyon).<br />
              • <strong>Acil Eylem:</strong> Hub’ı hemen kapat, %100 O₂ ver, hastayı <strong>Sol Lateral Dekübitus + Trendelenburg (Durant Manevrası)</strong> pozisyonuna al ve santral kateterden hava aspire etmeye çalış.
            </p>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>&quot;Never Event&quot; Kılavuz Tel Retansiyonu, Aritmi &amp; Tamponad</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • <strong>Johnston 2025 &amp; LocSSIPs Kuralı:</strong> Tel daima görünür ve elle kavranmış olmalıdır. İşlem sonunda kılavuz telin tüm boyu ve J-ucuyla birlikte işlem sahasından tamamen çıkarıldığı <strong>iki kişi tarafından görsel-fiziksel teyit edilir</strong>; telin varlığından en ufak kuşku duyulursa derhal grafi ile dışlanmalıdır.<br />
              • Kateter ucunun sağ atriyum içine fazla itilmesi aritmi ve miyokard erozyonu ile <strong>kardiyak tamponada</strong> yol açabilir; uç alt SVC / CAJ (karina düzeyi) seviyesinde tutulur.
            </p>
          </div>
        </div>
      </section>

      {/* BÖLÜM 6: KANITA DAYALI KAYNAKLAR */}
      <section id="cvc-refs" className={`${panelClass} p-5 sm:p-6 space-y-4`}>
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kanıta Dayalı Kaynaklar (PubMed &amp; DOI)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Bu modüldeki tüm kılavuz ve eşikler aşağıdaki uluslararası yayınlara dayanmaktadır
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {CVC_REFERENCES.map((ref) => (
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gerçek Sonoanatomi Büyütülmüş İnceleme Modalı */}
      {selectedSonoItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4"
          onClick={() => setSelectedSonoItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedSonoItem.title}
        >
          <div
            className={`w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl border shadow-2xl ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-xs font-mono text-sky-500">
                  {selectedSonoItem.regionLabel} · {selectedSonoItem.license}
                </div>
                <h4 className="text-base sm:text-lg font-bold mt-0.5">
                  {selectedSonoItem.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSonoItem(null)}
                aria-label="Görseli kapat"
                className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              <div className="rounded-xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
                <img
                  src={selectedSonoItem.imagePath}
                  alt={selectedSonoItem.title}
                  className="max-h-[58vh] w-auto object-contain"
                />
              </div>

              <div className={`${subSurfaceClass} p-4 space-y-2 text-xs`}>
                <div>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">Anatomik İşaretler: </span>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{selectedSonoItem.landmarks}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Klinik Yorum: </span>
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{selectedSonoItem.clinicalNote}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>Kaynak: {selectedSonoItem.attribution} ({selectedSonoItem.license})</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${selectedSonoItem.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sky-500 hover:underline"
                    >
                      <span>PubMed {selectedSonoItem.pmid}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={`https://doi.org/${selectedSonoItem.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-teal-500 hover:underline"
                    >
                      <span>DOI: {selectedSonoItem.doi}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
