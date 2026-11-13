import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior Fusion/Fixation of the Upper Cervical (C1-C2) Spine
 * (Üst Servikal [C1-C2 / Atlantoaksiyel] Anterior Füzyon ve Odontoid Vida Tespiti)
 * 
 * Jaffe (5th ed.), AANS/CNS Guidelines for Acute Cervical Spine and Spinal Cord Injuries,
 * Cervical Spine Research Society (CSRS), SNACC (Society for Neuroscience in Anesthesiology
 * and Critical Care) ve ERAS Society omurga cerrahisi konsensus raporları referans alınarak yapılandırılmıştır.
 */
export const anteriorUpperCervicalFusion: ProcedureDefinition = {
  id: 'anterior-upper-cervical-fusion',
  name: 'Üst Servikal (C1-C2) Anterior Füzyon ve Odontoid Vida Tespiti',
  shortCode: 'C1-C2-ANT-FÜZYON',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Spinal Nöroşirürji & Kraniyoservikal Bileşke',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Üst servikal omurganın en hareketli ve anatomik olarak en kritik bölgesi olan C1 (Atlas) ve C2 (Aksis) segmentlerinde; odontoid (dens) kırıkları veya atlantoaksiyel eklem instabilitesini tedavi etmek amacıyla anterior transservikal (retrografaringeal) veya transoral yaklaşımla uygulanan vida fiksasyonu (anterior kanüle lag vidası ile odontoid osteosentezi) ve/veya anterior C1-C2 artrodez/plak stabilizasyon cerrahisidir. C1-C2 rotasyon hareketinin korunmasını hedefleyen en zarif mikronöroşirürjikal spinal girişimlerdendir.',
  indications: [
    'Akut veya psödoartroz (non-union) Tip II Odontoid (Dens) Kırıkları: Özellikle kırık hattı anterior-inferiordan posterior-süperiora uzanan (veya transvers), posterior atlantoaksiyel ligaman kompleksi sağlam, dens deplasmanı <5-6 mm olan genç ve seçilmiş yaşlı hastalar',
    'Yüksek Tip III odontoid kırıkları (C2 korpus tepesini tutan instabil dens fraktürleri)',
    'Romatoid Artrit ve inflamatuar artropatilere bağlı atlantoaksiyel subluksasyon / instabilite (Transvers ligament gevşekliği, C1 anterior ark-dens mesafesi [ADI] > 3-4 mm olan ve retroodontoid pannus basısı gösteren olgular)',
    'Os Odontoideum ve konjenital kraniyoservikal bileşke anomalilerine bağlı instabilite ve progresif miyelopati riski',
    'Eksternal immobilizasyona (Halo-vest veya sert servikal boyunluk) uyum sağlayamayan, kontrendikasyonu olan veya konservatif takipte kaynamayan instabil odontoid fraktürleri',
    'Patolojik dens lezyonları (primer veya metastatik kemik tümörlerine bağlı instabilite)'
  ],
  averageDuration: '2.5 - 4.5 saat (Uyanık fiberoptik entübasyon, İONM kurulumu ve A-Line hazırlığı: 45-60 dk; Çift C-kollu floroskopi [Biplanar AP & Lateral] hizalanması ve Gardner-Wells/Mayfield traksiyonu: 30-45 dk; C4-C5 retrografaringeal retrovasküler cerrahi diseksiyon koridoru: 45-60 dk; K-teli yönlendirilmesi, matkaplama ve kanüle lag vidası yerleştirilmesi: 45-75 dk; Biyomekanik ve radyolojik doğrulama, hemostaz ve katmanlı kapatma: 30-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 350 mL (Standart transservikal diseksiyonda minimal-orta kanama; ancak derin retrofaringeal venöz pleksus kanamalarında veya C1-C2 lateral kitlesine komşu A. vertebralis laserasyonunda masif arteriyel kanama riski mevcuttur)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Potansiyel Kritik Arteriyel Kanama',
    crossMatchRequirement: 'En az 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır edilmeli, Tip ve Tarama (T&S) doğrulanmalıdır',
    transfusionProbability: '%10 - %25 (Travmatik instabilite, yaşlı osteoporotik hastalar veya revizyon cerrahilerinde %30-40)',
    criticalBleedingSources: [
      'A. vertebralis: C1-C2 foramen transversarium ve atlantoaksiyel eklem lateralinde seyreder; K-teli veya vida lateral veya posterior-laterale saptığında katastrofik arteriyel laserasyon riski doğar',
      'Retrografaringeal ve prevertebral derin venöz pleksus kanamaları',
      'Karotis kılıfı retraksiyonu sırasında A. carotis communis, A. carotis interna ve V. jugularis interna dalları',
      'A. thyroidea superior, A. lingualis ve A. facialis vasküler pedikülleri',
      'C2 korpus spongiyöz kemik yatağı ve dens tabanı mikrovasküler sızıntısı'
    ],
    hemostasisStrategies: [
      'Biplanar (Çift C-kollu) eşzamanlı floroskopik kontrol ile K-teli ve vidanın tam orta hatta (midline) ve sagital planda kalmasının sağlanması',
      'Cerrahi alanda bipolar koagülasyon, pamuk kompresyonu ve mikronöroşirürjikal hemostatik forsepsler',
      'Kemik kanamaları için kemik mumu (Bone wax) ve hemostatik jelatin sünger (Gelfoam)',
      'Akut venöz göllenmelerde akışkan trombinli jelatin matriks (FloSeal / Surgiflo)',
      'Vertebral arter hasarı şüphesinde anında bası, cerrahi vasküler klips ve acil Girişimsel Radyoloji endovasküler koilleme/stentleme koordinasyonu'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol & Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'Uyanık Esnek Fiberoptik Bronkoskopik Entübasyon (AFOI - Awake Flexible Optical Intubation) + TIVA İdamesi: C1-C2 instabilitesinde nörolojik morbiditeyi önleyen altın standart yaklaşım'
    ],
    alternative: [
      'Düşük Doz Uçucu Anestezik (<0.5 MAC Sevofluran) + Sürekli Remifentanil İnfüzyonu: İONM (MEP/SSEP) amplitüdlerini koruyacak şekilde titre edilerek'
    ],
    clinicalRationale: 'C1-C2 instabilitesinde direkt laringoskopi servikal ekstansiyonla kuadriplejiye yol açabileceğinden boyun nötral hatta iken uyanık fiberoptik entübasyon (AFOI) ve nörolojik kontrol en güvenli hava yolu stratejisidir. İntraoperatif MEP/SSEP sinyallerinin baskılanmaması ve nörolojik hasarın anında saptanabilmesi için Propofol + Remifentanil TIVA (idamede kas gevşeticisiz) altın standarttır.',
    notes: 'ANTERİOR ÜST SERVİKAL FİKSASYONDA TEMEL ANESTEZİ İLKELERİ: (1) İNSTABİL C1-C2 NEDENİYLE UYANIK FİBEROPTİK ENTÜBASYON (AFOI); (2) İONM (MEP/SSEP) KORUMASI İÇİN TIVA VE KAS GEVŞETİCİSİZ İDAME; (3) SPİNAL KORD PERFÜZYONU İÇİN YÜKSEK MAP HEDEFİ (MAP ≥ 85 mmHg).',
    rulesTitle: 'ANTERİOR ÜST SERVİKAL FİKSASYONDA TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'İNSTABİL C1-C2 OMURGA İÇİN UYANIK FİBEROPTİK ENTÜBASYON (AFOI)',
        content: 'Odontoid kırığı ve C1-C2 instabilitesinde direkt laringoskopi boynu ekstansiyona zorlayarak ani kuadripleji veya medüller arrest yapabilir. Sert boyunluk korunarak AFOI uygulanmalı ve hasta henüz uyanıkken entübasyon sonrası ekstremite motor yanıtı teyit edildikten sonra genel anesteziye geçilmelidir.'
      },
      {
        number: 2,
        title: 'NÖROMONİTÖRİZASYON (MEP/SSEP) İÇİN TIVA VE KAS GEVŞETİCİSİZ İDAME',
        content: 'Vida ilerletilmesi ve redüksiyon manevralarında spinal kord ve beyin sapı hasarını milisaniyeler içinde yakalamak için tcMEP ve SSEP takibi esastır. Bu sinyalleri baskılamamak için Propofol + Remifentanil TIVA kullanılmalı ve entübasyon sonrasında kas gevşetici KESİNLİKLE tekrarlanmamalıdır.'
      },
      {
        number: 3,
        title: 'SPİNAL KORD PERFÜZYON BASINCI (MAP ≥ 85 mmHg) VE POSTOP ÖDEM GÜVENLİĞİ',
        content: 'Kompresyona uğramış veya ödemli üst servikal spinal kordu korumak için Ortalama Arter Basıncı (MAP) ≥ 85 mmHg tutulmalıdır. Anterior retrofaringeal diseksiyon ciddi faringeal/epiglottik ödem yarattığından ekstübasyon öncesi mutlaka Cuff-Leak testi yapılmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Omurga Cerrahisi Konsültasyonu: Kırığın tipi (Tip IIA, IIB, IIC), dens deplasmanı yönü ve açısı, transvers ligamanın sağlamlığı ve C1 arka ark kırığı (Jefferson) eşlik edip etmediğinin ayrıntılı teyidi.',
      'Nöroloji / İntraoperatif Nöromonitörizasyon (İONM) Ekibi: Preoperatif bazal nörolojik defisit, kuadriparez/pleji bulguları, miyelopati testleri (Hoffman, Babinski, klonus) ve intraoperatif MEP/SSEP bazal elektrot planlaması.',
      'Nöroradyoloji Konsültasyonu: 3 boyutlu servikal BT ve servikal BT anjiyografi (vertebral arterlerin boyutu, dominansı, foramen transversarium varyasyonları ve "high-riding" yüksek binen vertebral arter anomalisi varlığı cerrahi vida güvenliği için hayati önem taşır).',
      'Yoğun Bakım Konsültasyonu: Postoperatif retrofaringeal/laringeal ödem riski nedeniyle Nöro-Yoğun Bakım yatağının rezerve edilmesi.'
    ],
    historyAndPhysical: [
      'Nörolojik Değerlendirme: Tüm ekstremitelerde motor güç (0-5/5 skala), duyu seviyesi, anal tonus ve derin tendon refleksleri kaydedilmelidir. Herhangi bir parestezi veya Lhermitte belirtisi (boyun hareketiyle elektrik çarpması hissi) sorgulanmalıdır.',
      'Zor ve Kararsız Hava Yolu Muayenesi: Servikal omurga İNSTABİLDİR! Rutin ekstansiyon, fleksiyon ve Mallampati manevraları KESİNLİKLE UYGULANMAZ. Hasta ameliyathaneye sert servikal boyunluk (Philadelphia / Miami-J) içinde alınmalıdır.',
      'Romatoid Artrit Sorgusu: RA hastalarında servikal omurga tutulumuna sıklıkla temporomandibuler eklem kısıtlılığı ve cricoarytenoid eklem artriti eşlik eder; laringeal açıklık daralmış olabilir.',
      'Politravma ve Eşlik Eden Yaralanmalar: Kafa travması (GKS), maksillofasiyal fraktürler, toraks travması ve multitravma varlığı taranmalıdır.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 2 Ünite ES Cross-Match teyidi.',
      'Hemoglobin / Hematokrit, Trombosit Sayımı, PT/INR, aPTT, Fibrinojen.',
      'Serum Elektrolitleri (Na+, K+, Ca++, Mg++), Kan Şekeri, Üre ve Kreatinin.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Dinamik Fleksiyon-Ekstansiyon Grafileri: İNSTABİLİTE ŞÜPHESİNDE ASLA ZORLANARAK ÇEKİLMEZ, KONTRENDİKEDİR.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line) — Kalp ve Dış Kulak Yolu (Tragus) Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle mutlaka yerleştirilmelidir. Spinal kord perfüzyon basıncını (SCPP) korumak ve indüksiyondaki ani hipotansiyonu anında yakalamak için şarttır.',
      'İntraoperatif Nöromonitörizasyon (İONM): Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP) ve serbest çalışan EMG (free-run EMG). Pozisyonlama, vida yerleştirme ve kemik kompresyonu aşamalarında spinal kord iletimi sürekli izlenir.',
      'Çift C-Kollu Floroskopi (Biplanar Fluoroscopy): Aynı anda hem açık ağız AP hem de Lateral projeksiyon sağlayan iki ayrı skopi cihazı yerleştirilir. Anestezi hortumları, ETT tespit bantları ve kablolar skopi görüş açısını ve rotasyonunu engellemeyecek şekilde izole edilmelidir.',
      'Sürekli End-Tidal CO2 (EtCO2) & Isı Problu Foley İdrar Sondası: MAP ≥ 85 mmHg tutulurken sıvı dengesi ve normotermi (36.0 - 37.0°C) korunmalıdır.',
      'Train-of-Four (TOF) Nöromusküler Monitörizasyon: Sadece indüksiyonda kullanılan kas gevşeticinin etkisinin tamamen geçtiğini (TOF > %90) teyit etmek için şarttır.'
    ],
    vascularAccess: [
      'En az iki adet geniş lümenli periferik intravenöz kanül (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Hedef odaklı vazoaktif ajan (Noradrenalin / Fenilefrin) infüzyonu, periferik damar yolu yetersizliği olan multitravmalı veya yaşlı olgularda tercih edilir'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon + Baş Gardner-Wells Traksiyonu veya Mayfield Çivili Başlık ile Nötral / Kontrollü Hafif Ekstansiyonda Sabitlenmiş',
    patientPositionDetails: [
      'Başın aşırı hiperekstansiyonu kırık odontoid fragmanının posteriora, medullaya ve spinal korda doğru deplase olmasına yol açabilir; tam tersine fleksiyon ise lümeni daraltır. Floroskopi altında tam nötral hizalama sağlanmalıdır.',
      'Açık Ağız Aparatı (Mouth bite block / radyolüsen mantar-stoper): Odontoid procesin açık ağız AP floroskopide net görülebilmesi için cerrahi öncesi ağız içine yerleştirilir ve tespit edilir.',
      'Omuzlar flaster bantlarla hafifçe kaudale (aşağıya) doğru çekilerek alt servikal ve C1-C2 lateral skopi projeksiyonunun kemik süperpozisyonundan kurtulması sağlanır.',
      'Pozisyon verildikten hemen sonra İONM (MEP/SSEP) bazal sinyalleri yeniden alınır; sinyal kaybı varsa pozisyon anında düzeltilir!'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Uyanık fiberoptik entübasyon tamamlandıktan ve tüp yerleşimi doğrulandıktan sonra Propofol (1.5 - 2.5 mg/kg) + Remifentanil (0.1 - 0.25 mcg/kg/dk) veya Fentanil (2 - 3 mcg/kg). Entübasyonda nöromusküler blokör olarak kısa/orta etkili tek doz Rokuronyum (0.6 mg/kg) veya Süksinilkolin (1 mg/kg) kullanılabilir; indüksiyon sonrası idame KAS GEVŞETİCİSİZ sürdürülür.',
      'İdame (TIVA): Propofol (80 - 130 mcg/kg/dk) + Remifentanil (0.1 - 0.3 mcg/kg/dk) TCI infüzyonu. Bispektral İndeks (BIS) 40 - 60 aralığında tutulur. İnhalasyon anestezikleri MEP sinyallerini doza bağımlı baskıladığından <0.3 - 0.5 MAC Sevofluran ile sınırlandırılmalı, tercihen saf TIVA uygulanmalıdır.',
      'Hemodinamik Hedef: Akut spinal kord iskemisini ve nörolojik kötüleşmeyi önlemek için Ortalama Arter Basıncı (MAP) kesinlikle ≥ 80 - 85 mmHg hedeflenir. Hipotansiyonda gecikmeksizin Noradrenalin (0.02 - 0.1 mcg/kg/dk) infüzyonu titre edilir.',
      'Sıvı Yönetimi: Aşırı sıvı yüklemesi üst servikal bölgede retrofaringeal ve laringeal ödemi şiddetlendireceğinden kristalloidler dengeli ve restriktif (2 - 4 mL/kg/saat) uygulanmalıdır.'
    ],
    airwayManagement: [
      'Altın Standart Hava Yolu Yaklaşımı: Uyanık Esnek Fiberoptik Bronkoskopik Entübasyon (AFOI - Awake Flexible Optical Intubation). Hastanın spontan solunumu ve nörolojik fonksiyonları korunarak boyun hareketsizken entübasyon gerçekleştirilir.',
      'Hava Yolu Hazırlığı: %2-4 Lidokain nebulizasyonu, dil kökü ve farinkse topikal Lidokain sprey, hafif anksiyoliz için Deksmedetomidin (0.5 - 1.0 mcg/kg IV yavaş infüzyon) veya düşük doz Remifentanil; hasta solumaya ve komutlara yanıt vermeye devam etmelidir.',
      'Tüp Tercihi: Spiral (Wire-reinforced / Zırhlı) Endotrakeal Tüp. Boyun ekartasyonunda ve cerrahi manipülasyonda tüpün katlanmasını (kink) ve lümen oklüzyonunu engellemek için kesinlikle zırhlı tüp kullanılmalıdır.',
      'Transoral C1-C2 yaklaşımı planlanıyorsa: Zırhlı tüp NAZOTRAKEAL yolla yerleştirilmelidir (cerrahi ağız içinden yapılacağı için orotrakeal tüp cerrahi görüşü ve vidalamayı tamamen engeller).',
      'Uyanık fiberoptik uygulanamayan acil olgularda: Sert boyunluk içinde Manuel İn-Line Stabilizasyon (MILS) + Hiperkavisli Videolaringoskop (GlideScope / C-MAC D-Blade) ile boyun nötralde tutularak dikkatli entübasyon yapılır; ancak fiberoptik yaklaşım daima ilk tercihtir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama ve Traksiyon Aşaması: Mayfield çivili başlık veya Gardner-Wells traksiyonu uygulanırken floroskopi ve İONM kontrolü; aşırı gerilmede MEP/SSEP sinyal kaybı riski.',
      '2. Retrografaringeal Koridor Diseksiyonu: C4-C5 cilt kesisinden retrofaringeal boşluğa girilerek prevertebral fasyanın açılması. Karotis kılıfı lateralde, özofagus ve laringofarenks medialde retrakte edilir; n. laryngeus recurrens ve n. laryngeus superior basısı riski.',
      '3. K-Teli (Kirschner Wires) ve Matkap Kılavuzunun Yönlendirilmesi (En Kritik An!): K-teli C2 anteroinferior sınırından sokulup dens apeksine yönlendirilir. K-teli dens korteksini geçerse medulla oblangata ve baziler arter yaralanabilir; çift C-kollu skopiyle telin ucu her milimetrede izlenir!',
      '4. Kanüle Vidanın Sıkılması ve Kompresyon: Vidanın sıkılmasıyla kırık hattı aproksime edilir; vertebral arter foramenine lateral migrasyon riski kontrol edilir.',
      '5. Ağız İçi Sterilite ve Faringeal Kapatma: Transoral vakalarda farenks arka duvarı kapatılırken nazogastrik sonda ve aspirasyon güvenliği sağlanır.'
    ],
    emergenceNotes: [
      'RETROFARİNGEAL VE LARİNGEAL ÖDEM UYARISI: Üst servikal anterior cerrahilerde en tehlikeli erken postoperatif komplikasyon cerrahi ekartasyona bağlı gelişen akut hava yolu ödemidir!',
      'Ekstübasyon Ön Koşulu — KAF KAÇAK TESTİ (Cuff Leak Test): Hasta uyandırılmadan önce endotrakeal tüp kafı indirilmeli ve ağız çevresinde hava kaçağı dinlenmelidir. Kaçak sesi yoksa veya hava kaçağı <110 mL ise larinks/farenks masif ödemlidir; HASTA ASLA EKSTÜBE EDİLMEMELİDİR!',
      'Şüpheli veya Zorlu Olgularda Yaklaşım: Cerrahi süresi > 4 saat süren, aşırı sıvı almış, boyun fleksiyonu kısıtlı veya kaf kaçak testi negatif olan hastalar zırhlı tüple entübe şekilde Nöro-Yoğun Bakım Ünitesine transfer edilmelidir. Baş 30-45° elevasyonda tutulmalı, IV Deksametazon (8 mg IV her 8 saatte bir) uygulanmalı ve 24-48 saat sonra kaçak testi pozitifleştiğinde YBÜ\'de planlı ekstübe edilmelidir.',
      'Ameliyathanede ekstübasyon yapılacaksa: Hasta sedyede tam uyanık, TOF %100, komutları dinlerken; acil zor hava yolu arabası, videolaringoskop ve cerrahi trakeostomi seti masanın yanında açık bekletilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü: İntraoperatif cerrahi kesi hattına lokal anestezik infiltrasyonu (Bupivakain / Ropivakain) + IV Parasetamol (1 g IV her 6 saatte bir).',
      'Hasta Kontrollü Analjezi (HKA / PCA): Düşük doz Morfin veya Fentanil PCA; sedasyon ve solunum depresyonunu önlemek için bazal infüzyon verilmez, sadece talep modu (bolus) kullanılır.',
      'Düşük Doz Ketamin İnfüzyonu (0.1 - 0.2 mg/kg/saat): Santral sensitizasyonu engeller ve opioid ihtiyacını %30-40 azaltır.',
      'NSAİİ Kısıtlaması: Omurga füzyon cerrahisinde yüksek doz non-steroid antiinflamatuar ilaçlar (NSAİİ) kemik kaynamasını (osteosentez) olumsuz etkileyebileceğinden ilk 48-72 saatte rutin verilmez veya cerrahla konsülte edilir.'
    ],
    prospectRecommendations: [
      'PROSPECT Spinal Cerrahi Önerileri: Kesi yeri lokal anestezik infiltrasyonu, sistemik Parasetamol, cerrah onaylı selektif analjezikler ve sedasyona yol açmayan titrasyonlu opioid kullanımı.',
      'Solunum fonksiyonunu ve nörolojik uyanıklığı baskılamayan multimodal analjezik ajanların tercih edilmesi.'
    ],
    erasRecommendations: [
      'ERAS Omurga Konsensüsü: Ameliyat öncesi multimodal analjezi eğitimi ve berrak sıvı alımı.',
      'Postoperatif Bulantı-Kusmayı (POBV) Önleme: Çift ajanlı profilaksi (Deksametazon 8 mg + Ondansetron 4 mg). Kusma ve öğürme üst servikal cerrahi sahada venöz basıncı fırlatarak retrofaringeal hematoma neden olabilir; agresif antiemetik tedavi zorunludur!',
      'Erken Mobilizasyon: Rijit servikal boyunluk (Philadelphia / Aspen collar) desteği ile postoperatif 1. günde yatak kenarına oturtma ve mobilizasyon.',
      'Erken Oral Beslenme: Yutma fonksiyonu (disfaji) ve farenks muayenesi doğrulandıktan sonra oral sıvılara başlanması.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Lippincott Williams & Wilkins. Section II: Neurosurgery - Cervical Spine Procedures: Anterior Odontoid Screw Fixation & Upper Cervical Fusion, pp. 450-456.',
    erasReference: 'ERAS® Society Guidelines for Perioperative Care in Lumbar and Cervical Spinal Surgery: Enhanced Recovery After Surgery (ERAS) Recommendations (2021).',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in spine surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Cervical Spine Research Society (CSRS) Guidelines on the Management of Type II Odontoid Fractures and Upper Cervical Instability.',
      'American Association of Neurological Surgeons (AANS) & Congress of Neurological Surgeons (CNS). Guidelines for the Management of Acute Cervical Spine and Spinal Cord Injuries.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement on the Management of Patients with Cervical Spine Instability undergoing General Anesthesia.',
      'Apfelbaum, N. E., et al. (2000). Direct anterior screw fixation for recent and remote odontoid fractures. Journal of Neurosurgery: Spine, 93(2), 227-236.'
    ]
  }
};
