import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior Fusion/Fixation of the Upper Cervical (C1-C2) Spine
 * (Üst Servikal [C1-C2 / Atlantoaksiyel] Anterior Füzyon ve Odontoid Vida Tespiti)
 *
 * Jaffe (6th ed., 2020), AO Spine / Praxis 2024, AANS/CNS, CSRS, SNACC,
 * PROSPECT (2021) ve ERAS Society (2021) kılavuzları referans alınarak yapılandırılmıştır.
 */
export const anteriorUpperCervicalFusion: ProcedureDefinition = {
  id: 'anterior-upper-cervical-fusion',
  name: 'Üst Servikal (C1-C2) Anterior Füzyon ve Odontoid Vida Tespiti',
  shortCode: 'C1-C2-ANT-FÜZYON',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Spinal Nöroşirürji & Kraniyoservikal Bileşke',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Üst servikal omurganın en hareketli ve anatomik olarak en kritik bölgesi olan C1 (Atlas) ve C2 (Aksis) segmentlerinde; odontoid (dens) kırıkları veya atlantoaksiyel eklem instabilitesini tedavi etmek amacıyla anterior transservikal (retrofaringeal) veya transoral yaklaşımla uygulanan vida fiksasyonu (anterior kanüle lag vidası ile odontoid osteosentezi) ve/veya anterior C1-C2 artrodez/plak stabilizasyon cerrahisidir. C1-C2 rotasyon hareketinin korunmasını hedefleyen en zarif mikronöroşirürjikal spinal girişimlerdendir.',
  indications: [
    'Akut veya psödoartroz (non-union) Tip II Odontoid (Dens) Kırıkları: Özellikle kırık hattı anterior-inferiordan posterior-süperiora uzanan (veya transvers), posterior atlantoaksiyel ligaman kompleksi sağlam, dens deplasmanı <5-6 mm olan genç ve seçilmiş yaşlı hastalar',
    'Yüksek Tip III odontoid kırıkları (C2 korpus tepesini tutan instabil dens fraktürleri)',
    'Romatoid Artrit ve inflamatuar artropatilere bağlı atlantoaksiyel subluksasyon / instabilite (Transvers ligament gevşekliği, C1 anterior ark-dens mesafesi [ADI] > 3-4 mm olan ve retroodontoid pannus basısı gösteren olgular)',
    'Os Odontoideum ve konjenital kraniyoservikal bileşke anomalilerine bağlı instabilite ve progresif miyelopati riski',
    'Eksternal immobilizasyona (Halo-vest veya sert servikal boyunluk) uyum sağlayamayan, kontrendikasyonu olan veya konservatif takipte kaynamayan instabil odontoid fraktürleri',
    'Patolojik dens lezyonları (primer veya metastatik kemik tümörlerine bağlı instabilite)'
  ],
  averageDuration: '2.5 - 4.5 saat (Uyanık fiberoptik entübasyon, İONM kurulumu ve A-Line hazırlığı: 45-60 dk; Çift C-kollu floroskopi [Biplanar AP & Lateral] hizalanması ve Gardner-Wells/Mayfield traksiyonu: 30-45 dk; C4-C5 retrofaringeal retrovasküler cerrahi diseksiyon koridoru: 45-60 dk; K-teli yönlendirilmesi, matkaplama ve kanüle lag vidası yerleştirilmesi: 45-75 dk; Biyomekanik ve radyolojik doğrulama, hemostaz ve katmanlı kapatma: 30-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 350 mL (Standart transservikal diseksiyonda minimal-orta kanama; ancak derin retrofaringeal venöz pleksus kanamalarında veya C1-C2 lateral kitlesine komşu A. vertebralis laserasyonunda masif arteriyel kanama riski mevcuttur)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Potansiyel Kritik Arteriyel Kanama',
    crossMatchRequirement: 'En az 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır edilmeli, Tip ve Tarama (T&S) doğrulanmalıdır',
    transfusionProbability: '%10 - %25 (Travmatik instabilite, yaşlı osteoporotik hastalar veya revizyon cerrahilerinde %30-40)',
    criticalBleedingSources: [
      'A. vertebralis: C1-C2 foramen transversarium ve atlantoaksiyel eklem lateralinde seyreder; K-teli veya vida lateral veya posterior-laterale saptığında katastrofik arteriyel laserasyon riski doğar',
      'Retrofaringeal ve prevertebral derin venöz pleksus kanamaları',
      'Karotis kılıfı retraksiyonu sırasında A. carotis communis, A. carotis interna ve V. jugularis interna dalları',
      'A. thyroidea superior, A. lingualis ve A. facialis vasküler pedikülleri',
      'C2 korpus spongiyöz kemik yatağı ve dens tabanı mikrovasküler sızıntısı'
    ],
    hemostasisStrategies: [
      'Biplanar (Çift C-kollu) eşzamanlı floroskopik kontrol ile K-teli ve vidanın tam orta hatta (midline) ve sagital planda kalmasının sağlanması',
      'Cerrahi alanda bipolar koagülasyon, pamuk kompresyonu ve mikronöroşirürjikal hemostatik forsepsler',
      'Kemik kanamaları için kemik mumu (Bone wax) ve hemostatik jelatin sünger (Gelfoam)',
      'Akut venöz göllenmelerde akışkan trombinli jelatin matriks (FloSeal / Surgiflo)',
      'Vertebral arter hasarı şüphesinde anında bası, cerrahi vasküler klips ve acil Girişimsel Radyoloji endovasküler koilleme/stentleme koordinasyonu',
      'Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır; hemostaz cerrahi ve lokal hemostatiklerle sağlanır'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi — Saf TIVA (Propofol & Remifentanil Hedef Kontrollü İnfüzyon [TCI]): İONM (tcMEP/SSEP) için altın standart',
      'Uyanık Esnek Fiberoptik Bronkoskopik Entübasyon (AFOI - Awake Flexible Optical Intubation) + TIVA İdamesi: C1-C2 instabilitesinde nörolojik morbiditeyi önleyen altın standart hava yolu yaklaşımı'
    ],
    alternative: [
      'Zorunlu Kombinasyonda Düşük Doz Volatil Anestezik (≤ 0.5 MAC, tercihen < 0.3-0.5 MAC Sevofluran) + Sürekli Remifentanil İnfüzyonu (N₂O KESİNLİKLE KULLANILMAZ!)'
    ],
    clinicalRationale: 'C1-C2 instabilitesinde direkt laringoskopi servikal ekstansiyonla kuadriplejiye yol açabileceğinden boyun nötral hatta iken uyanık fiberoptik entübasyon (AFOI) ve nörolojik kontrol en güvenli hava yolu stratejisidir. İntraoperatif tcMEP/SSEP sinyallerinin baskılanmaması için saf Propofol + Opioid TIVA (kas gevşeticisiz idame; N₂O kesinlikle kontrendike) altın standarttır.',
    notes: 'ANTERİOR ÜST SERVİKAL FİKSASYONDA TEMEL ANESTEZİ İLKELERİ: (1) İNSTABİL C1-C2 İÇİN AFOI VE AKUT/SUBAKUT SCI\'DE SÜKSİNİLKOLİN YASAĞI; (2) İONM İÇİN SAF TIVA, N₂O YASAĞI VE BİLATERAL YUMUŞAK MOLAR BITE BLOCK; (3) PERMİSİF HİPOTANSİYON YASAĞI VE YÜKSEK MAP HEDEFİ; (4) RETROFARİNGEAL ÖDEM/HEMATOMDA YATAKBAŞI ACİL DİKİŞ-FASYA AÇMA PROTOKOLÜ.',
    rulesTitle: 'ANTERİOR ÜST SERVİKAL FİKSASYONDA TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'İNSTABİL C1-C2 İÇİN AFOI VE SCI\'DE SÜKSİNİLKOLİN KONTRENDİKASYONU',
        content: 'Odontoid kırığı ve C1-C2 instabilitesinde direkt laringoskopi boynu ekstansiyona zorlayarak ani kuadripleji veya medüller arrest yapabilir. Sert boyunluk korunarak AFOI uygulanmalı ve entübasyon sonrası uyanık nörolojik yanıt teyit edilmelidir. AFOI zaten tamamlandığından entübasyon için kas gevşetici GEREKMEZ; yalnızca uyutularak MILS+VL entübasyon yapılacaksa tek doz orta etkili Rokuronyum kullanılır. Akut/subakut SCI, üst motor nöron lezyonu (>24–48 saat) ve uzun immobilizasyonda Süksinilkolin ölümcül hiperkalemik kardiyak arrest nedeniyle KESİNLİKLE KONTRENDİKEDİR.'
      },
      {
        number: 2,
        title: 'İONM (tcMEP/SSEP) İÇİN SAF TIVA, N₂O YASAĞI VE BİLATERAL YUMUŞAK BITE BLOCK',
        content: 'Vida ilerletilmesi ve redüksiyonda spinal kord/beyin sapı hasarını yakalamak için pozisyonlama öncesi (supin) ve sonrası bazal tcMEP/SSEP doğrulaması esastır. Saf Propofol + Opioid TIVA altın standarttır (zorunlu kombinasyonda ≤ 0.5 MAC, tercihen < 0.3–0.5 MAC; N₂O KESİNLİKLE KULLANILMAZ). tcMEP uyarısı sırasında dil/dudak laserasyonu ve diş kırığını önlemek için bilateral yumuşak gazlı bez rulo molar bite block zorunludur (sert plastik Guedel airway KULLANILMAZ).'
      },
      {
        number: 3,
        title: 'SPİNAL KORD PERFÜZYONU (PERMİSİF HİPOTANSİYON YOK) VE AO SPINE 2024 HEDEFLERİ',
        content: 'Permisif/kontrollü hipotansiyondan KESİNLİKLE kaçınılır. Miyelopati/servikal stenozda MAP ≥ 80–85 mmHg; akut travmatik SCI olgularında (AO Spine/Praxis 2024) MAP alt sınır 75–80 mmHg, üst sınır 90–95 mmHg (3–7 gün) hedeflenir. Rutin yüksek doz NASCIS metilprednizolon güncel AANS/CNS ve AO Spine kılavuzlarınca önerilmez.'
      },
      {
        number: 4,
        title: 'RETROFARİNGEAL ÖDEM VE GENİŞLEYEN BOYUN HEMATOMUNDA ACİL YATAKBAŞI PROTOKOLÜ',
        content: 'Anterior retrofaringeal diseksiyon şiddetli faringeal/epiglottik ödem ve derin hematom riski taşır. Ekstübasyon öncesi Cuff-Leak testi zorunludur. Genişleyen boyun hematomuna bağlı stridor/solunum sıkıntısında re-entübasyondan ÖNCE veya EŞZAMANLI olarak yatakbaşında acil dikiş/zımba sökme ve derin fasyayı açarak hematomu boşaltma seti ve protokolü derhal uygulanmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Omurga Cerrahisi Konsültasyonu: Kırığın tipi (Tip IIA, IIB, IIC), dens deplasmanı yönü ve açısı, transvers ligamanın sağlamlığı ve C1 arka ark kırığı (Jefferson) eşlik edip etmediğinin ayrıntılı teyidi.',
      'Nöroloji / İntraoperatif Nöromonitörizasyon (İONM) Ekibi: Preoperatif bazal nörolojik defisit, kuadriparez/pleji bulguları, miyelopati testleri (Hoffman, Babinski, klonus) ve intraoperatif tcMEP/SSEP bazal elektrot planlaması.',
      'Nöroradyoloji Konsültasyonu: 3 boyutlu servikal BT ve servikal BT anjiyografi (vertebral arterlerin boyutu, dominansı, foramen transversarium varyasyonları ve "high-riding" yüksek binen vertebral arter anomalisi varlığı cerrahi vida güvenliği için hayati önem taşır).',
      'Yoğun Bakım Konsültasyonu: Postoperatif retrofaringeal/laringeal ödem ve hematom riski nedeniyle Nöro-Yoğun Bakım yatağının rezerve edilmesi.'
    ],
    historyAndPhysical: [
      'Nörolojik Değerlendirme ve Otonomik Risk Taraması: Tüm ekstremitelerde motor güç (0-5/5 skala), duyu seviyesi, anal tonus ve derin tendon refleksleri kaydedilmelidir. Akut yüksek servikal SCI\'de nörojenik şok (T1–T4 sempatik kayıp: hipotansiyon + paradoksal bradikardi), kronik ≥T6 SCI\'de otonomik disrefleksi (ağrılı uyaranla şiddetli hipertansiyon + refleks bradikardi) riski sorgulanmalıdır.',
      'Zor ve Kararsız Hava Yolu Muayenesi: Servikal omurga İNSTABİLDİR! Rutin ekstansiyon, fleksiyon ve zorlayıcı boyun manevraları KESİNLİKLE UYGULANMAZ. Hasta ameliyathaneye sert servikal boyunluk (Philadelphia / Miami-J) içinde alınmalıdır.',
      'Romatoid Artrit Sorgusu: RA hastalarında servikal omurga tutulumuna sıklıkla temporomandibuler eklem kısıtlılığı ve cricoarytenoid eklem artriti eşlik eder; laringeal açıklık daralmış olabilir.',
      'ERAS Preoperatif Optimizasyon (PBM & Risk Azaltma): Elektif olgularda Hasta Kan Yönetimi (PBM) ile anemi/demir eksikliği tedavisi, sigaranın en az ≥ 4 hafta önce bırakılması (psödoartroz riskini azaltmak için), kronik opioid kullanım taraması ve beslenme/glisemik kontrol optimizasyonu.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 2 Ünite ES Cross-Match teyidi.',
      'Hemoglobin / Hematokrit, Trombosit Sayımı, PT/INR, aPTT, Fibrinojen; elektif olgularda anemi varsa ferritin/TSAT (PBM).',
      'Serum Elektrolitleri (Na+, K+, Ca++, Mg++), Kan Şekeri (HbA1c diyabetiklerde), Üre ve Kreatinin.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Dinamik Fleksiyon-Ekstansiyon Grafileri: AKUT TRAVMA VE İNSTABİLİTE ŞÜPHESİNDE ASLA ZORLANARAK ÇEKİLMEZ, KESİNLİKLE KONTRENDİKEDİR.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line) — Hedefe Göre Doğru Sıfırlama: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle mutlaka yerleştirilir. Spinal kord perfüzyon basıncı (SCPP) takibi için flebostatik aks (kalp/sağ atriyum seviyesi) esas alınır; baş-yukarı (reverse Trendelenburg) pozisyon verildiğinde serebral perfüzyon basıncı (CPP) için dış kulak yolu (tragus) düzeyi referans alınır (aynı anda iki farklı seviyede sıfırlanmaz).',
      'İntraoperatif Nöromonitörizasyon (İONM): Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP) ve serbest çalışan EMG. Supin pozisyonlama öncesi VE pozisyon/traksiyon sonrası bazal kayıtlar mutlaka doğrulanır.',
      'Çift C-Kollu Floroskopi (Biplanar Fluoroscopy): Aynı anda hem açık ağız AP hem de Lateral projeksiyon sağlayan iki ayrı skopi cihazı yerleştirilir. Anestezi hortumları, ETT tespit bantları ve kablolar skopi görüş açısını engellemeyecek şekilde izole edilmelidir.',
      'Sürekli End-Tidal CO2 (EtCO2), Kan Glukozu (hedef 140–180 mg/dL) ve Isı Problu Foley İdrar Sondası: Normotermi (36.0–37.0°C) ve normokapni (PaCO2 35–40 mmHg) korunmalıdır.',
      'Train-of-Four (TOF) Nöromusküler Monitörizasyon: Uyutularak entübasyonda tek doz Rokuronyum kullanıldıysa İONM öncesi etkisinin tamamen geçtiğini (TOF > %90, gerekirse Sugammadeks ile geri dönüş) ve idamede kazara blokaj olmadığını teyit etmek için şarttır.'
    ],
    vascularAccess: [
      'En az iki adet geniş lümenli periferik intravenöz kanül (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Hedef odaklı vazoaktif ajan (Noradrenalin / Fenilefrin) infüzyonu, periferik damar yolu yetersizliği olan multitravmalı veya yaşlı olgularda tercih edilir'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon + Baş Gardner-Wells Traksiyonu veya Mayfield Çivili Başlık ile Nötral / Kontrollü Hafif Ekstansiyonda Sabitlenmiş',
    patientPositionDetails: [
      'Başın aşırı hiperekstansiyonu kırık odontoid fragmanının posteriora, medullaya ve spinal korda doğru deplase olmasına yol açabilir; tam tersine fleksiyon ise lümeni daraltır. Floroskopi altında tam nötral hizalama sağlanmalıdır.',
      'Mayfield Çivili Başlık / Gardner-Wells Hipertansif Yanıt Önleme: Çivi yerleştirme öncesinde çivi giriş noktalarına lokal anestezik (örn. Bupivakain/Lidokain) infiltrasyonu ve eşzamanlı kısa etkili opioid (Remifentanil/Fentanil bolusu) veya derin anestezi/Esmolol ile ani hipertansiyon-taşikardi yanıtı mutlaka baskılanmalıdır.',
      'Bilateral Yumuşak Molar Isırma Bloğu (Bite Block) & Açık Ağız Aparatı: tcMEP elektrik uyarısı çiğneme kaslarını şiddetle kasarak dil/dudak laserasyonu ve diş kırığına yol açabileceğinden bilateral yumuşak gazlı bez rulo molar bite block zorunludur (sert plastik Guedel airway KESİNLİKLE KULLANILMAZ). Odontoid açık ağız AP floroskopi için radyolüsen yumuşak ağız stoperi dişlere/dile bası yapmayacak şekilde koordine edilir.',
      'Omuzlar flaster bantlarla hafifçe kaudale (aşağıya) çekilerek C1-C2 lateral skopi görüşü açılır; aşırı traksiyondan (brakiyal pleksus gerilmesi) kaçınılır.',
      'Pozisyonlama öncesi (supin) ve pozisyon/traksiyon tamamlandıktan hemen sonra İONM (tcMEP/SSEP) bazal sinyalleri doğrulanır; sinyal düşüşünde pozisyon anında düzeltilir!'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Nöromusküler Bloker Disiplini: AFOI tamamlanıp ETT yerleşimi ve uyanık nörolojik yanıt doğrulandıktan sonra Propofol (1.5–2.5 mg/kg) + Remifentanil (0.1–0.25 mcg/kg/dk) veya Fentanil (2–3 mcg/kg) ile indüksiyon yapılır; AFOI zaten tamamlandığı için entübasyon amaçlı kas gevşetici KULLANILMAZ. Yalnızca uyutularak MILS + Videolaringoskopi yapılacaksa tek doz orta etkili Rokuronyum (0.6 mg/kg) verilir (İONM öncesi TOF > %90 beklenir veya Sugammadeks ile tam geri döndürülür). AKUT/SUBAKUT SCI, ÜST MOTOR NÖRON LEZYONU (>24–48 SAAT) VE UZUN İMMOBİLİZASYONDA SÜKSİNİLKOLİN ÖLÜMCÜL HİPERKALEMİK KARDİYAK ARREST NEDENİYLE KESİNLİKLE KONTRENDİKEDİR! İdame kas gevşeticisiz sürdürülür.',
      'İdame (Altın Standart Saf TIVA): Propofol (80–130 mcg/kg/dk) + Remifentanil (0.1–0.3 mcg/kg/dk) TCI infüzyonu (BIS 40–60). Zorunlu volatil kombinasyonunda ≤ 0.5 MAC (tercihen < 0.3–0.5 MAC Sevofluran) aşılmaz. N₂O (Azot Protoksit) tcMEP/SSEP baskılaması ve venöz hava embolisi/pnömotoraks genişletme riski nedeniyle KESİNLİKLE KULLANILMAZ.',
      'Multimodal İntraoperatif Analjezi & Antibiyotik Profilaksisi: Cerrahi insizyondan 30–60 dk önce IV Sefazolin (2 g; >120 kg ise 3 g) uygulanır, cerrahi > 3–4 saat sürerse veya kan kaybı > 1.5 L olursa tekrar dozu yapılır. İntraoperatif düşük doz IV Ketamin (0.25–0.5 mg/kg yükleme + 0.1–0.2 mg/kg/saat) ve/veya IV Lidokain infüzyonu (1–1.5 mg/kg/saat) opioid ihtiyacını azaltır.',
      'Hemodinamik Hedefler ve AO Spine 2024: Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır! Miyelopati/stenozda MAP ≥ 80–85 mmHg; akut travmatik SCI\'de (AO Spine/Praxis 2024) MAP alt sınır 75–80 mmHg, üst sınır 90–95 mmHg (3–7 gün boyunca) hedeflenir (gereğinde Noradrenalin 0.02–0.1 mcg/kg/dk; nörojenik şokta bradikardi eşlik ediyorsa Atropin/Noradrenalin/Dopamin). Rutin yüksek doz NASCIS metilprednizolon güncel AANS/CNS ve AO Spine kılavuzlarınca önerilmez.',
      'Standart İONM Sinyal Düşüşü (Drop) Kontrol Listesi (tcMEP/SSEP >%50 amplitüd düşüşü veya >%10 latans uzaması): (1) Cerrahı derhal uyar ve son manevrayı/traksiyonu/vidayı geri al, (2) MAP ≥ 85–90 mmHg yükselt, (3) SpO₂/PaO₂ ve normokapni (PaCO₂ 35–40 mmHg) doğrula, (4) Hb/Hct kontrolü yap ve anemiyi düzelt, (5) Normotermi (36.0–37.0°C) sağla, (6) Anestezi derinliğini (<0.5 MAC / saf TIVA) ve TOF/kazara NMB durumunu kontrol et, (7) Elektrot/teknik bağlantı ve boyun-omuz pozisyonunu gözden geçir.',
      'Sıvı ve Glukoz Yönetimi: Aşırı sıvı yüklemesi üst servikal retrofaringeal/laringeal ödemi artırdığından dengeli kristalloidler hedefe yönelik (2–4 mL/kg/saat) verilir; kan şekeri 140–180 mg/dL aralığında tutulur.'
    ],
    airwayManagement: [
      'Altın Standart Hava Yolu Yaklaşımı: Uyanık Esnek Fiberoptik Bronkoskopik Entübasyon (AFOI - Awake Flexible Optical Intubation). Hastanın spontan solunumu ve nörolojik fonksiyonları korunarak boyun hareketsizken entübasyon gerçekleştirilir.',
      'Hava Yolu Hazırlığı: %2-4 Lidokain nebulizasyonu, dil kökü ve farinkse topikal Lidokain sprey, hafif anksiyoliz için Deksmedetomidin (0.5–1.0 mcg/kg IV yavaş infüzyon) veya düşük doz Remifentanil; hasta solumaya ve komutlara yanıt vermeye devam etmelidir.',
      'Tüp Tercihi ve Bite Block: Spiral (Wire-reinforced / Zırhlı) Endotrakeal Tüp zorunludur (ekartasyon sırasında tüp katlanmasını önler). tcMEP için bilateral yumuşak gazlı bez rulo molar bite block yerleştirilir; sert plastik Guedel airway KULLANILMAZ.',
      'Transoral C1-C2 yaklaşımı planlanıyorsa: Zırhlı tüp NAZOTRAKEAL yolla yerleştirilmelidir (cerrahi ağız içinden yapılacağı için orotrakeal tüp cerrahi görüşü ve vidalamayı tamamen engeller).',
      'Uyanık fiberoptik uygulanamayan acil olgularda: Sert boyunluk içinde Manuel İn-Line Stabilizasyon (MILS) + Hiperkavisli Videolaringoskop (GlideScope / C-MAC D-Blade) ile boyun nötralde tutularak tek doz orta etkili Rokuronyum eşliğinde entübasyon yapılır (akut/subakut SCI\'de Süksinilkolin KESİNLİKLE KONTRENDİKE).'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama ve Traksiyon Aşaması: Mayfield çivili başlık (lokal anestezik + opioid blunting) veya Gardner-Wells traksiyonu uygulanırken floroskopi ile supin pre-pozisyon ve post-pozisyon İONM bazal kontrolü.',
      '2. Retrofaringeal Koridor Diseksiyonu: C4-C5 cilt kesisinden retrofaringeal boşluğa girilerek prevertebral fasyanın açılması. Karotis kılıfı lateralde, özofagus ve laringofarenks medialde retrakte edilir; n. laryngeus recurrens ve n. laryngeus superior basısı riski (ekartör yerleşimi sonrası ETT kaf basıncı indirilip 20–22 cmH2O\'ya yeniden ayarlanır).',
      '3. K-Teli (Kirschner Wire) ve Matkap Kılavuzunun Yönlendirilmesi (En Kritik An!): K-teli C2 anteroinferior sınırından sokulup dens apeksine yönlendirilir. K-teli dens korteksini geçerse medulla oblangata ve baziler arter yaralanabilir; çift C-kollu skopiyle telin ucu her milimetrede izlenir!',
      '4. Kanüle Vidanın Sıkılması ve Kompresyon: Vidanın sıkılmasıyla kırık hattı aproksime edilir; vertebral arter foramenine lateral migrasyon ve İONM sinyal değişimi kontrol edilir.',
      '5. Ağız İçi Sterilite ve Faringeal Kapatma: Transoral vakalarda farenks arka duvarı kapatılırken nazogastrik sonda ve aspirasyon güvenliği sağlanır.'
    ],
    emergenceNotes: [
      'RETROFARİNGEAL ÖDEM VE GENİŞLEYEN BOYUN HEMATOMU ALARMI: Üst servikal anterior cerrahilerde en ölümcül erken postoperatif komplikasyonlar akut hava yolu ödemi ve genişleyen retrofaringeal/boyun hematomudur!',
      'ACİL YATAKBAŞI DİKİŞ/ZIMBA SÖKME VE DERİN FASYA AÇMA PROTOKOLÜ: Derlenmede veya serviste boyunda gergin şişlik, stridor, dispne veya hızlı desatürasyon gelişirse RE-ENTÜBASYONDAN ÖNCE VEYA RE-ENTÜBASYONLA EŞZAMANLI OLARAK yatakbaşındaki steril acil set ile cilt dikişleri/zımbaları ve derin platizma/prevertebral fasya tabakaları DERHAL AÇILIP hematom dekomprese edilmelidir! Acil dikiş/zımba alma seti, videolaringoskop ve krikotirotomi/cerrahi hava yolu kiti yatakbaşında görünür ve hazır bulundurulur.',
      'Ekstübasyon Ön Koşulu — KAF KAÇAK TESTİ (Cuff Leak Test): Hasta uyandırılmadan önce endotrakeal tüp kafı indirilmeli ve ağız çevresinde hava kaçağı dinlenmelidir. Kaçak sesi yoksa veya hava kaçağı <110 mL ise larinks/farenks masif ödemlidir; HASTA ASLA EKSTÜBE EDİLMEMELİDİR!',
      'Pürüzsüz Uyanma ve Gecikmiş Ekstübasyon Kriterleri: Öksürme ve ıkınma venöz basıncı artırarak hematomu tetikler (IV Lidokain 1.5 mg/kg veya düşük doz Remifentanil ile pürüzsüz uyanma). Cerrahi > 4 saat süren, aşırı sıvı almış veya kaf kaçak testi negatif olan hastalar zırhlı tüple entübe şekilde Nöro-YBÜ\'ye transfer edilmeli; baş 30–45° elevasyon ve IV Deksametazon sonrası 24–48 saat içinde kontrollü ekstübe edilmelidir.',
      'Ameliyathanede ekstübasyon yapılacaksa: Hasta tam uyanık, TOF %100, dört ekstremite motor muayenesi bazal ile uyumlu, zor hava yolu arabası ve acil dikiş/fasya açma kiti masanın yanında açık bekletilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Opioid Koruyucu Analjezi (PROSPECT 2021): İntraoperatif cerrahi kesi hattına lokal anestezik infiltrasyonu (Bupivakain/Ropivakain) + düzenli IV Parasetamol (1 g IV her 6 saatte bir).',
      'Hasta Kontrollü Analjezi (IV PCA): Yalnızca talep/bolus modunda (BAZAL İNFÜZYONSUZ!) düşük doz Morfin veya Fentanil PCA. Opioid PCA ile eşzamanlı Benzodiazepin (Diazepam vb.) KESİNLİKLE KULLANILMAZ (FDA Black Box solunum depresyonu, deliryum ve nörolojik muayene maskelemesi riski).',
      'Opioid Koruyucu Adjuvanlar: İntraoperatif/erken postoperatif düşük doz IV Ketamin infüzyonu (0.1–0.2 mg/kg/saat) ve/veya IV Lidokain infüzyonu (1–1.5 mg/kg/saat); majör/revizyon füzyon olgularında tek doz intraoperatif IV Metadon (0.1–0.2 mg/kg) seçeneği değerlendirilebilir.',
      'NSAİİ / COX-2 Nüansı: Kısa süreli (≤ 48–72 saat) standart doz NSAİİ veya selektif COX-2 inhibitörü kullanımı kemik füzyonunu anlamlı düzeyde bozmaz; ancak yüksek doz Ketorolak (>120 mg/gün) veya >2 hafta uzun süreli NSAİİ kullanımından kaçınılır (cerrahi hemostaz sağlandıktan sonra).',
      'Gabapentinoid Uyarısı: Rutin Pregabalin/Gabapentin kullanımından kaçınılır (PROSPECT 2021 ve FDA solunum depresyonu/sedasyon uyarısı).'
    ],
    prospectRecommendations: [
      'PROSPECT Kompleks Omurga Cerrahisi (Waelkens et al., 2021): Düzenli Parasetamol + kısa süreli NSAİİ/COX-2 inhibitörü, insizyonel lokal anestezik infiltrasyonu, intraoperatif IV Ketamin (ve/veya majör füzyonda tek doz IV Metadon / IV Lidokain) ve kurtarma amaçlı bazal infüzyonsuz opioid önerilir.',
      'Rutin gabapentinoid ve opioid+benzodiazepin kombinasyonlarından sedasyon ve solunum depresyonu riski nedeniyle kaçınılmalıdır.'
    ],
    erasRecommendations: [
      'ERAS Omurga Konsensüsü (Debono et al., 2021): Preoperatif anemi optimizasyonu (PBM), ≥ 4 hafta sigara bırakma, kronik opioid taraması ve ameliyattan 2 saat öncesine kadar berrak karbonhidratlı (CHO) sıvı alımı.',
      'Agresif Multimodal POBV (PONV) Profilaksisi: Çift/üçlü antiemetik profilaksi (Deksametazon 8 mg + Ondansetron 4 mg ± Droperidol/Aprepitant). Kusma ve öğürme üst servikal cerrahi sahada venöz basıncı fırlatarak retrofaringeal hematoma yol açabileceğinden agresif POBV önlemi hayati önem taşır!',
      'Glisemik Kontrol ve Kateter Yönetimi: Perioperatif kan glukozu 140–180 mg/dL aralığında tutulur; Foley idrar sondası mümkün olan en erken dönemde (genellikle postop 1. gün) çekilir.',
      'Erken Mobilizasyon ve Beslenme: Rijit servikal boyunluk (Philadelphia/Aspen) desteği ile postop 1. günde mobilizasyon; yutma (disfaji) ve farenks güvenliği doğrulandıktan sonra erken oral sıvı alımı.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B, eds. Anesthesiologist\'s Manual of Surgical Procedures (6th ed., 2020). Section II: Neurosurgery — Anterior Upper Cervical Spine Procedures.',
    erasReference: 'Debono B, Wainwright TW, Wang MY, et al. Consensus statement for perioperative care in lumbar spinal fusion: ERAS Society recommendations. Spine J. 2021;21(5):729–752.',
    prospectReference: 'Waelkens P, et al.; PROSPECT Working Group. Pain management after complex spine surgery. Eur J Anaesthesiol. 2021;38(9):985–994.',
    otherReferences: [
      'AO Spine / Praxis Spinal Cord Institute Clinical Practice Guideline (2024): Hemodynamic Management of Acute Spinal Cord Injury (MAP 75–80 to 90–95 mmHg) & Methylprednisolone Recommendations.',
      'AANS/CNS Guidelines for the Management of Acute Cervical Spine and Spinal Cord Injuries.',
      'SNACC Consensus Statement on Anesthetic Management of Patients with Cervical Spine Instability and Intraoperative Neuromonitoring.',
      'Apfelbaum RI, Lonser RR, Veres R, Casey A. Direct anterior screw fixation for recent and remote odontoid fractures. J Neurosurg. 2000;93(2 Suppl):227–236.'
    ]
  }
};
