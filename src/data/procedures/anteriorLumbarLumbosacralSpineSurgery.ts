import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior Lomber ve Lumbosakral Omurga Cerrahisi: Retroperitoneal Yaklaşımla ALIF, OLIF, XLIF/LLIF ve Korpektomi (L1-S1)
 * (Anterior Lumbar/Lumbosacral Spine Surgery: Retroperitoneal Approach for ALIF, OLIF, XLIF/LLIF, and Corpectomy)
 *
 * Jaffe (6th ed., 2020), ERAS® Society Spine Consensus (Debono et al., Spine J 2021),
 * PROSPECT Complex Spine Guidelines (Waelkens et al., Eur J Anaesthesiol 2021),
 * AABB 2023 Transfusion Guidelines ve SNACC kılavuzları referans alınarak yapılandırılmıştır.
 */
export const anteriorLumbarLumbosacralSpineSurgery: ProcedureDefinition = {
  id: 'anterior-lumbar-lumbosacral-spine-surgery',
  name: 'Anterior Lomber ve Lumbosakral Omurga Cerrahisi: Retroperitoneal Yaklaşımla ALIF, OLIF, XLIF/LLIF ve Korpektomi (L1-S1)',
  shortCode: 'LOMBER-ANT-ALIF',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Alt torakolomber ve lumbosakral omurgada (L1-L5 ve L5-S1 seviyeleri) dejeneratif disk hastalığı, spondilolistezis (bel kayması), instabilite, psödoartroz, patlama kırıkları veya omurga tümörlerinde uygulanan anterior ve anterolateral cerrahi yaklaşımları kapsar. Başlıca teknikler şunlardır: (1) ALIF (Anterior Lumbar Interbody Fusion — genellikle L4-S1, supin pozisyonda vasküler/genel cerrah [access surgeon] eşliğinde retroperitoneal veya transperitoneal yaklaşımla iliak damarların mobilizasyonu); (2) OLIF (Oblique Lumbar Interbody Fusion — pre-psoas / oblik yaklaşım, psoas kasının önünden ve büyük damarların lateralinden geçer, lomber pleksus traksiyon riski daha düşük ancak vasküler ve sempatik zincir yaralanması riski mevcuttur); (3) XLIF / LLIF (Extreme/Direct Lateral Interbody Fusion — transpsoas yaklaşım, doğrudan psoas kası içinden geçildiğinden gerçek zamanlı tetiklenmiş lomber pleksus EMG\'si KRİTİKTİR). Bozulmuş disk veya korpus çıkarılarak geniş lordotik titanyum/PEEK kafes ve kemik grefti yerleştirilir; sagital lordoz ve foraminal yükseklik restore edilir.',
  indications: [
    'Lomber Dejeneratif Disk Hastalığı (DDD): Konservatif tedaviye dirençli şiddetli aksiyel bel ağrısı yaratan L4-L5 veya L5-S1 disk dejenerasyonları ve Modic değişiklikleri',
    'Spondilolistezis (Lomber Bel Kayması): Derece I ve II istmik veya dejeneratif spondilolistezis olgularında disk ve foraminal yüksekliğin indirekt dekompresyonla restorasyonu',
    'Erişkin Omurga Deformitesi ve Dejeneratif Skolyoz: Sagital dengesizliği düzeltmek ve lomber lordozu artırmak için L1-S1 arası çok seviyeli anterior/lateral kafes yerleşimi',
    'Başarısız Bel Cerrahisi Sendromu (FBSS) ve Psödoartroz: Önceki posterior enstrümantasyon sonrası kaynamayan (nonunion) mesafelerin anterior revizyonu',
    'Lomber Vertebra Kırıkları ve Tümörleri: L1-L5 korpusunu tutan nörolojik basılı burst kırıkları veya metastatik kitlelerin anterior korpektomi ve expandable cage ile rekonstrüksiyonu',
    'Yapay Disk Protezi (Lomber Total Disk Artroplastisi - TDR): Seçilmiş genç hastalarda hareket koruyucu anterior cerrahi'
  ],
  averageDuration: '2.5 - 5.5 saat (Tek seviye ALIF [L5-S1]: 2.0 - 3.0 saat; Çift seviye ALIF [L4-L5 ve L5-S1]: 3.0 - 4.5 saat; Çok seviyeli OLIF/XLIF veya anterior korpektomi: 4.0 - 6.0 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '300 - 1000 mL (Sorunsuz tek seviye ALIF/OLIF\'te 150-300 mL; ancak sol ana iliak ven yırtılması veya korpektomide 1500-3000 mL masif kanama riski mevcuttur)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Sol Ana İliak Ven, Vena Cava Inferior ve Aort Çatallanması Komşuluğu)',
    crossMatchRequirement: 'En az 2-4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite Taze Donmuş Plazma (TDP) ameliyathanede hazır bulundurulmalıdır; Traneksamik Asit (TXA) ve Cell Saver (malignite/enfeksiyon dışı) hazır olmalıdır',
    transfusionProbability: '%30 - %50 (Çok seviyeli füzyon ve korpektomilerde %60)',
    criticalBleedingSources: [
      'V. Iliaca Communis Sinistra (Sol Ana İliak Ven — L4-L5 disk mesafesini çaprazlar; ince duvarlıdır, diske yapışıktır ve ekartasyon sırasında yırtılması saniyeler içinde 1-2 litre masif kanamaya yol açar)',
      'Vena Cava Inferior (VCI) ve Aorta Abdominalis Çatallanması (Bifurkasyon — L4-L5 seviyesi)',
      'A. ve V. Sacralis Mediana (Orta sakral damarlar — L5-S1 disk ön yüzünden geçer; bipolarla koagüle edilip kesilmelidir)',
      'Iliolumbar Ven (Ascending Lumbar Vein — V. iliaca communis arkasında L4-L5 lateralinde seyreder; serbestleştirilmeden ekarte edilirse kökünden koparak pelviste durdurulamaz kanama yaratır)',
      'Vertebra Korpusu Kansellöz Kemik Kanamaları'
    ],
    hemostasisStrategies: [
      'TÜM İV VE SANTRAL VENÖZ HATLAR DİYAFRAM ÜSTÜNDEN (üst ekstremite 14-16G / internal juguler / subklavyan) AÇILMALIDIR — Alt ekstremite İV hatlarına ASLA güvenilmez; iliak ven veya VCI yırtıldığında alt ekstremiteden verilen sıvı ve kan doğrudan retroperitona boşalır!',
      'Kanıta Dayalı İntraoperatif Traneksamik Asit (TXA) Protokolü: Çok seviyeli füzyon ve korpektomide indüksiyonda 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk), ardından 1-2 mg/kg/saat sürekli infüzyon. UYARI: Nöbet öyküsü, aktif venöz tromboembolizm (VTE) varlığında kullanılmaz; renal yetmezlikte doz azaltılır; insidental durotomi / BOS temasında nöbet riski göz önünde bulundurulur',
      'Vasküler cerrah veya deneyimli erişim cerrahı (access surgeon) eşliğinde damarların atravmatik mobilizasyonu',
      'İliak ven yaralanmasında anında parmak/pamuk basısı, vasküler klempaj ve 4-0/5-0 Prolene vasküler dikiş ile primer onarım',
      'Orta sakral damarların ve iliolomber venin önceden klemplenip bağlanması / klipslenmesi',
      'Kemik yüzeylerinde kemik mumu, FloSeal, Surgicel ve hemostatik matriks + malignite/enfeksiyon dışı Cell Saver kullanımı',
      'Nüanslı Transfüzyon Eşiği (AABB 2023): Hemodinamik stabil hastada Hb 7-8 g/dL; aktif iskemi, masif hemoraji veya İONM düşüşünde Hb 8-9 g/dL hedeflenir'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (Kürarsız TIVA: Propofol + Remifentanil) — İntraoperatif MEP, SSEP ve Transpsoas / Lomber Pleksus EMG monitörizasyonu için MUTLAK ALTIN STANDARTTIR'
    ],
    alternative: [
      'Multimodal Adjuvanlı TIVA: Propofol + Remifentanil + düşük doz IV Ketamin (0.1-0.2 mg/kg/saat) ve/veya IV Lidokain infüzyonu',
      'Dengeli Genel Anestezi (Düşük Doz Sevofluran/Desfluran ≤ 0.5 MAC + Opioid İnfüzyonu — Yalnızca İONM/EMG yapılmayan standart tek seviye L5-S1 ALIF olgularında; N₂O KESİNLİKLE KONTRENDİKEDİR!)'
    ],
    clinicalRationale: 'Transpsoas (XLIF/LLIF) yaklaşımda lomber pleksus Tetiklenmiş EMG\'si ile MEP/SSEP yanıtlarını korumak için entübasyon sonrası kas gevşeticisiz Propofol + Remifentanil TIVA altın standarttır. N₂O, İONM sinyallerini baskıladığı, bağırsak distansiyonu/PONV yaptığı ve hava embolisini genişlettiği için kesinlikle yasaktır. Trendelenburg pozisyonu ve retroperitoneal/abdominal ekartasyon diyaframı yukarı iterek hava yolu basınçlarını yükselttiğinden kontrollü ventilasyon için kaflı oral endotrakeal entübasyon şarttır.',
    notes: 'ANTERİOR LOMBER VE LUMBOSAKRAL CERRAHİDE TEMEL ANESTEZİ İLKELERİ: (1) Diyafram Üstü İV/CVC Zorunluluğu ve Sol Ana İliak Ven Masif Kanama Alarmı; (2) Sol/Bilateral Ayak Nabız Oksimetresi ve Normotansiyon (MAP ≥ 75-80 mmHg, Permisif Hipotansiyon YASAK); (3) OLIF (Pre-Psoas) vs XLIF/LLIF (Transpsoas EMG + TcMEP Yumuşak Bite Block); (4) Süperior Hipogastrik Pleksus Koruması (L5-S1 Monopolar Koter YASAK); (5) Retroperitoneal Organ Koruması, TXA ve Opioid Koruyucu İleus Önleme.',
    rulesTitle: 'ANTERİOR LOMBER VE LUMBOSAKRAL CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'DİYAFRAM ÜSTÜ İV/CVC ZORUNLULUĞU VE SOL ANA İLİAK VEN MASİF KANAMA ALARMI',
        content: 'TÜM periferik İV (en az 2 adet 14-16G) ve santral venöz kateterler (İJ/subklavyan) MUTLAKA DİYAFRAM ÜSTÜNDEN açılmalıdır; alt ekstremite İV hatlarına ASLA güvenilmez! L4-L5 önünde ince duvarlı sol ana iliak ven veya VCI yırtıldığında alt ekstremiteden verilen sıvı/kan doğrudan retroperitona dökülür. Yırtık anında sesli masif kanama alarmı verilir, cerrah parmak/pamuk basısına geçer, 4-0/5-0 Prolene ve vasküler klempler hazırlanır, üst ekstremite/CVC üzerinden hızlı transfüzyon başlatılır.'
      },
      {
        number: 2,
        title: 'NORMOTANSİYON (MAP ≥ 75-80 mmHg) VE SOL / BİLATERAL AYAK NABIZ OKSİMETRESİ',
        content: 'Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır; nöral ve vasküler perfüzyonu korumak için MAP ≥ 75-80 mmHg (İONM sinyal düşüşünde ≥ 85-90 mmHg) hedeflenir. Cerrahi ekartörler sol ana iliak arteri uzun süre sıkıştırarak distal ekstremite iskemisi veya tromboz yaratabilir; SOL AYAK (tercihen her iki ayak) başparmağına nabız oksimetresi (SpO₂ pletismografi) takılarak perfüzyon saniye saniye izlenir. Pletismografi dalgası kaybolursa cerrah ekartörü derhal gevşetmelidir!'
      },
      {
        number: 3,
        title: 'OLIF (PRE-PSOAS) vs XLIF/LLIF (TRANSPSOAS) FARKI, LOMBER PLEKSUS EMG VE YUMUŞAK BITE BLOCK',
        content: 'OLIF psoas kasının önünden (pre-psoas/oblik) geçer (pleksus riski daha düşük, ancak vasküler ve sempatik zincir riski vardır); XLIF/LLIF ise doğrudan psoas içinden (TRANSPSOAS) geçer ve femoral sinir/lomber pleksus hasarı riski yüksektir — gerçek zamanlı Tetiklenmiş EMG KRİTİKTİR, TOF 4/4 tutulur, N₂O kullanılmaz ve psoas ekartasyonu ≤ 20 dk ile sınırlandırılır. TcMEP uygulanan tüm olgularda bilateral YUMUŞAK GAZLI BEZ RULO molar bite block zorunludur (sert plastik Guedel airway KULLANILMAZ!).'
      },
      {
        number: 4,
        title: 'SÜPERİOR HİPOGASTRİK PLEKSUS KORUMASI VE RETROGRAD EJAKÜLASYON ÖNLEMİ',
        content: 'L5-S1 disk ön yüzünde ve aort bifurkasyonu üzerinde sempatik Süperior Hipogastrik Pleksus seyreder. Bu bölgede monopolar koter kullanımı erkek hastalarda retrograd ejakülasyon ve kalıcı fertilite kaybına yol açar; L5-S1 önünde MONOPOLAR KOTER KESİNLİKLE KULLANILMAZ, yalnızca künt diseksiyon ve bipolar koter uygulanır.'
      },
      {
        number: 5,
        title: 'KANITA DAYALI TXA, RETROPERİTONEAL ORGAN KORUMASI VE İLEUS ÖNLEMİ',
        content: 'Çok seviyeli ALIF/OLIF ve korpektomide TXA 10-15 mg/kg (veya 1 g) yükleme + 1-2 mg/kg/saat infüzyon uygulanır (nöbet öyküsü, aktif VTE, renal yetmezlik ve BOS teması uyarıları). Sol üreter, sigmoid kolon ve periton ekartör basısından korunur. Postoperatif paralitik ileusu önlemek için TAP/rektus kılıfı bloğu, parasetamol, kısa süreli NSAİİ ve bazalsız (demand-only) kurtarma IV PCA ile opioid koruyucu ERAS protokolü uygulanır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Damar Cerrahisi / Genel Cerrahi Konsültasyonu (Erişim Cerrahı - Access Surgeon): Retroperitoneal açılış, iliak damarların mobilizasyonu ve olası vasküler komplikasyonların yönetimi için cerrahi ekiple eşgüdüm.',
      'Nöroloji / Nöroşirürji Konsültasyonu: Lomber radikülopati derecesi (L2-S1 kök basıları), motor zaafiyet (düşük ayak, başparmak ekstansiyonu, kuadriseps gücü) ve yürüme mesafesi.',
      'Kardiyoloji Konsültasyonu: İleri yaş hastalarda aterosklerotik iliak ve aortik damar yapısı (aort kalsifikasyonları ve iliak darlık cerrahi ekartasyonda tromboz, plak kopması ve yırtılma riskini artırır).',
      'Üroloji Konsültasyonu: Erkek hastalarda preoperatif cinsel fonksiyon ve fertilite durumu sorgulanmalı; L5-S1 seviyesinde süperior hipogastrik pleksus hasarına bağlı retrograd ejakülasyon riski (%1-5) yazılı onamda açıklanmalıdır.'
    ],
    historyAndPhysical: [
      'ERAS Preoperatif Optimizasyon: Hasta Kan Yönetimi (PBM — anemi/demir optimizasyonu), sigaranın ≥ 4 hafta önce bırakılması (füzyon kaynaması için kritik), kronik opioid toleransı taraması ve ameliyattan 2 saat öncesine kadar berrak karbonhidrat (CHO) içeceği (diyabet/gastroparezi hariç).',
      'Geçirilmiş Abdominal ve Pelvik Cerrahi Öyküsü: Apandektomi, kolesistektomi, kolon rezeksiyonu, fıtık onarımı veya sezaryen öyküsü retroperitoneal yapışıklıkları ve vasküler yaralanma riskini belirgin artırır.',
      'Periferik Vasküler Muayene: Her iki alt ekstremitede femoral, popliteal, tibialis posterior ve dorsalis pedis nabızları preoperatif palpasyonla doğrulanmalı ve belgelenmelidir.',
      'Kaba Motor ve Duyu Muayenesi: L2-S1 dermatom ve miyotom fonksiyonları kaydedilir.',
      'Zor Hava Yolu Taraması: Standart Mallampati, tiromental mesafe ve boyun hareket açıklığı değerlendirmesi.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı, Demir/Ferritin (PBM) ve Koagülasyon Paneli: Trombosit ≥ 100.000/mm³, PT, aPTT, INR, Fibrinojen tam normal olmalıdır (antikoagülanlar kılavuzlara uygun kesilir).',
      'En az 2-4 Ünite Eritrosit Süspansiyonu ve 2 Ünite TDP Cross-Match hazırlığı.',
      'Biyokimya, Renal Fonksiyon (TXA doz ayarı) ve Kan Glukozu / HbA1c.',
      'Kontrastlı Abdominal ve Pelvik BT Anjiyografi (BTA) / MRG: Aort bifurkasyonu ve sol ana iliak venin L4-L5 ve L5-S1 disk mesafelerine göre konumu, orta sakral ve iliolomber ven anomalileri milimetrik değerlendirilir.',
      'Lumbosakral Dinamik Grafiler ve MRG: Bel kaymasının derecesi, disk yükseklik kaybı ve foraminal darlık seviyeleri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO₂, EtCO₂ ve Nazofaringeal/Özofageal Sıcaklık (normotermi > 36.0°C).',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Ani majör vasküler kanama, iliak klempleme, MAP ≥ 75-80 mmHg hedefi (İONM düşüşünde ≥ 85-90 mmHg) ve seri kan gazı/Hb/laktat/glukoz (140-180 mg/dL) takibi için zorunludur.',
      'SOL AYAK / BİLATERAL AYAK NABIZ OKSİMETRESİ (Foot Pulse Oximetry): Sol (ve tercihen sağ) ayak başparmağına takılan SpO₂ pletismografi probu ile cerrah iliak arterleri ekarte ettiğinde distal ekstremite perfüzyonunun kesilip kesilmediği saniye saniye izlenir.',
      'Santral Venöz Kateter (CVC — DİYAFRAM ÜSTÜ): Masif venöz kanama riski ve vazopressör desteği için sağ internal juguler veya subklavyan venöz hat.',
      'İntraoperatif Nöromonitörizasyon (İONM): XLIF/LLIF (transpsoas) olgularında zorunlu Lomber Pleksus Tetiklenmiş ve Serbest EMG + korpektomi/deformitede Bilateral tcMEP ve SSEP (kuadriseps, tibialis anterior, EHL, gastroknemius kayıtları).',
      'Nöromusküler İleti İzlemi (TOF) ve Anestezi Derinliği (BIS): İONM/EMG olgularında ameliyat boyunca TOF 4/4 (%100) korunur; kürarsız TIVA sürdürülür.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'ZORUNLU KURAL — DİYAFRAM ÜSTÜ ERİŞİM: En az 2 adet geniş lümenli (14-16G) ÜST EKSTREMİTE periferik İV yol + gerekirse Sağ İnternal Juguler / Subklavyan CVC (Alt ekstremite İV hatlarına ASLA güvenilmez!)',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı Hatlar ameliyathanede hazır',
      'Cell Saver (Kan Kurtarma Sistemi — malignite/enfeksiyon dışı olgularda steril hatta bağlı ve aktif)'
    ],
    patientPosition: 'Supin (ALIF İçin) veya Tam Lateral Dekübitüs (OLIF [Pre-Psoas] ve XLIF/LLIF [Transpsoas] İçin)',
    patientPositionDetails: [
      'ALIF (L4-S1) Supin Pozisyonu: Hasta sırtüstü yatırılır; L5-S1 aksını açmak için hafif Trendelenburg veya bel altına silikon pelvik destek verilebilir; bacaklar ayrık (Da Vinci / frog-leg) konumlandırılır, C-kollu floroskopi serbestçe dönebilmelidir.',
      'XLIF / LLIF ve OLIF Lateral Dekübitüs Pozisyonu: Hasta 90° tam lateral yatırılır; aksilla apeksinin 2-3 parmak altına aksiller rulo konur; masanın hafif fleksiyonu (kırma) iliak kanat ile alt kostalar arasını açar (aşırı kırma VCI basısı yapar).',
      'Tüm bası noktaları (fibulada peroneal sinir, dirseklerde ulnar sinir, alttaki kulak ve ayak bilekleri) jel pedlerle korunur.'
    ],
    anesthesiaManagement: [
      'Preoperatif Antibiyotik ve PONV Profilaksisi:',
      '  - İnsizyondan 30-60 dk önce IV Sefazolin 2 g (>120 kg 3 g); her 3-4 saatte bir veya > 1500 mL kan kaybında ek doz (redosing).',
      '  - PONV profilaksisi: İndüksiyonda Deksametazon 4-8 mg (cerrah/diyabet gözetilerek) + kapanışta Ondansetron 4 mg.',
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (1.5-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + orta etkili non-depolarizan kas gevşetici (Rokuronyum 0.5-0.6 mg/kg; İONM/EMG öncesi TOF 4/4 dönüşü veya gerekirse Sugammadeks ile tam dönüşüm).',
      '  - Videolaringoskop ile oral endotrakeal entübasyon; TcMEP yapılacaksa bilateral YUMUŞAK GAZLI BEZ RULO molar bite block yerleştirilir (sert plastik Guedel airway KESİNLİKLE KULLANILMAZ!).',
      '  - İONM/EMG olgularında entübasyon sonrası nöromusküler bloker verilmez (kürarsız idame; TOF 4/4).',
      'İdame (TIVA + Multimodal Adjuvanlar):',
      '  - Propofol (90-150 mcg/kg/dk) + Remifentanil (0.1-0.25 mcg/kg/dk) TIVA. N₂O KESİNLİKLE YASAKTIR! İONM/EMG olgularında volatil ajanlardan kaçınılır.',
      '  - PROSPECT Adjuvanlar: Düşük doz IV Ketamin (0.5 mg/kg bolus + 0.1-0.2 mg/kg/saat infüzyon), IV Lidokain infüzyonu (1-1.5 mg/kg bolus + 1-2 mg/kg/saat — TAP bloğu yapılacaksa LAST sınırı gözetilerek blok öncesi kesilir) ve çok seviyeli füzyon/korpektomide tek doz IV Metadon (0.1-0.2 mg/kg) seçeneği.',
      'Kan Koruma ve TXA Protokolü:',
      '  - Çok seviyeli füzyon ve korpektomide indüksiyonda Traneksamik Asit 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk), ardından 1-2 mg/kg/saat sürekli infüzyon (nöbet öyküsü, aktif VTE, renal yetmezlik ve BOS teması uyarılarına dikkat!).',
      'Hemodinami ve Perfüzyon Hedefleri:',
      '  - Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır; normotansiyon (MAP ≥ 75-80 mmHg) sürdürülür.',
      '  - Ayak nabız oksimetresinde (sol/bilateral) pletismografi dalgası düzleşir veya kaybolursa cerrah derhal uyarılır ve iliak ekartör gevşetilir.',
      'Vasküler Ekartasyon ve Akut Yırtılma Protokolü (Sol Ana İliak Ven / VCI):',
      '  - Ani kanama geliştiğinde: (1) Sesli "MASİF KANAMA ALARMI!" verilir, cerrah parmak/pamuk basısına geçer; (2) YALNIZCA DİYAFRAM ÜSTÜ (üst ekstremite/CVC) hatlardan Belmont/hızlı transfüzyon başlatılır, dengeli 1:1:1 kan ürünleri verilir; (3) Masada 4-0/5-0 Prolene ve vasküler Satinsky klempleri hazır edilir.',
      'XLIF/LLIF Transpsoas Süre İzlemi ve 7 Basamaklı İONM Düşüş Kontrol Listesi:',
      '  - Transpsoas girişimde ekartör açılış saati kaydedilir; femoral sinir iskemisini önlemek için 20. dakikada ekartör gevşetilmesi hatırlatılır.',
      '  - tcMEP/SSEP (>%50 düşüş) veya sürekli EMG deşarjında: (1) Cerrahı uyar / ekartörü-kafesi gevşet; (2) MAP ≥ 85-90 mmHg yükselt; (3) FiO₂ 1.0, PaCO₂ 35-40 mmHg; (4) Hb ≥ 8-9 g/dL düzelt; (5) Normotermi (>36.0°C) ve pH/iCa²⁺ optimize et; (6) Volatil/N₂O kapalı, propofol derinliği ve TOF 4/4 doğrula; (7) Elektrot ve pozisyon kontrolü yap.'
    ],
    airwayManagement: [
      'Standart kaflı oral endotrakeal tüp (lateral dekübitüste kinking riski varsa spiral telli ETT tercih edilebilir).',
      'TcMEP yapılan tüm vakalarda bilateral YUMUŞAK GAZLI BEZ RULO molar ısırma bloğu zorunludur (sert plastik Guedel airway KULLANILMAZ).',
      'Trendelenburg pozisyonunda ve retroperitoneal ekartasyon altında diyafram yukarı itileceğinden Ppeak ve kompliyans yakından izlenir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama, Sol/Bilateral Ayak SpO₂ Yerleştirilmesi ve Floroskopi ile Disk Seviyelerinin İşaretlenmesi.',
      '2. Sol Alt Kadran Oblik/Transvers Kesi (ALIF) veya Lateral Flank Kesi (OLIF/XLIF) ile Cilt-Fasya Açılışı.',
      '3. Retroperitoneal Boşluğa Giriş: Periton kesesinin ve sol üreterin künt diseksiyonla mediale sıyrılması.',
      '4. Vasküler Mobilizasyon (ALIF) veya Pre-Psoas (OLIF) / Transpsoas EMG Kılavuzlu (XLIF/LLIF) Disk Erişimi (L5-S1 önünde monopolar koter KULLANILMAZ!).',
      '5. Geniş Anterior/Lateral Diskektomi ve Kartilajinöz Son Plakların Temizlenmesi.',
      '6. Lordotik İntervertebral Kafesin (Cage) Kemik Grefti ile Yerleştirilmesi ve Anterior Plak/Vida Tespiti.',
      '7. Damarların Serbest Bırakılması, Distal Femoral/Pedal Nabızların, Ayak SpO₂ Dalgasının ve Hemostazın Doğrulanması.',
      '8. Retroperitoneal Dren Yerleştirilmesi ve Katmanlı Anatomik Kapanış.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ EKSTÜBASYON: Uyanmada ıkınma ve öksürme retroperitoneal alanda venöz basıncı artırarak hematom gelişimini tetikler; düşük doz Remifentanil veya IV Lidokain (LAST sınırı gözetilerek) ile pürüzsüz ekstübasyon sağlanır.',
      'Distal Nabızların Muayenesi: Hasta uyanır uyanmaz her iki ayakta dorsalis pedis ve tibialis posterior nabızları palpasyonla ve ısı/renk kontrolüyle teyit edilir (iliak tromboz ekarte edilir).',
      'Kuadriseps ve Düşük Ayak Muayenesi: Hasta dizini ekstansiyona getirmeli (L3-L4 femoral sinir — özellikle XLIF sonrası!) ve ayak bileğini/başparmağını dorsifleksiyona çekmelidir (L4-L5).',
      'Hemodinamik Stabilite ve Dren Kontrolü: Retroperitoneal gizli kanama yakın izlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Opioid Koruyucu Protokol (PROSPECT 2021 — İleus Önleyici):',
      '  - Ultrason Eşliğinde Rektus Kılıfı veya Transversus Abdominis Plan (TAP) Bloğu + Cerrahi Yara İnfiltrasyonu (Bupivakain/Ropivakain — LAST sınırı gözetilerek).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kısa Süreli IV / Oral NSAİİ veya COX-2 İnhibitörü (≤ 48-72 saat; renal fonksiyon, hemostaz ve cerrah onayı sonrası — kısa süreli kullanımın füzyonu anlamlı bozmadığı gösterilmiştir).',
      '  - İntraoperatif düşük doz IV Ketamin (ve çok seviyeli vakalarda tek doz IV Metadon 0.1-0.2 mg/kg seçeneği).',
      '  - Kurtarma İV Hasta Kontrollü Analjezi (IV PCA): Morfin veya Fentanil ile BAZALSIZ, YALNIZCA TALEP-KONTROLLÜ (demand-only) protokol (bazal infüzyon ve eşzamanlı benzodiazepin KULLANILMAZ).'
    ],
    prospectRecommendations: [
      'PROSPECT Kompleks Omurga Cerrahisi Kılavuzları (Waelkens et al., 2021): Fasyal plan blokları (TAP/rektus kılıfı), yara infiltrasyonu, düzenli parasetamol, kısa süreli NSAİİ/COX-2 inhibitörü ve bazalsız kurtarma IV PCA kombinasyonu opioid tüketimini azaltarak postoperatif paralitik ileus ve PONV riskini minimize eder.'
    ],
    erasRecommendations: [
      'ERAS® Kompleks Omurga Cerrahisi Kılavuzları (Debono et al., 2021):',
      '  - Paralitik İleus Önlemi ve Erken Oral Alım: Opioid kısıtlaması, erken sakız çiğneme ve tolere edildikçe kademeli berrak sıvı/oral beslenmeye geçiş.',
      '  - Glisemik Kontrol ve Erken Foley Çekimi: Kan glukozu 140-180 mg/dL aralığında tutulur; hemodinamik stabil ve idrar çıkışı yeterli hastalarda Foley kateter postop 1. günde çekilir.',
      '  - Vasküler ve DVT Profilaksisi: İliak ven retraksiyonuna bağlı yüksek DVT riskine karşı IPC cihazı kesintisiz uygulanır; cerrahi hemostaz teyidiyle 12-24. saatte profilaktik LMWH başlanır; distal pedal nabızlar seri izlenir.',
      '  - Erken Mobilizasyon: Stabil anterior kafes fiksasyonu sonrası hastalar postop 1. günde mobilize edilir.',
      '  - Erkek Hastalarda Ejakülasyon Takibi: Poliklinik kontrollerinde retrograd ejakülasyon sorgulanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Anterior Lumbar/Lumbosacral Spine Surgery. Philadelphia: Wolters Kluwer.',
    erasReference: 'Debono, B., Wainwright, T. W., Wang, M. Y., Sigmundsson, F. G., Yang, M. M. H., Smid-Nanninga, H., Bonnal, A., Le Huec, J. C., Fawcett, W. J., Ljungqvist, O., Lonjon, G., & de Boer, H. D. (2021). Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations. The Spine Journal, 21(5), 729–752.',
    prospectReference: 'Waelkens, P., Alsabbagh, E., Sauter, A., Joshi, G. P., & Beloeil, H.; PROSPECT Working Group of the European Society of Regional Anaesthesia and Pain Therapy (ESRA). (2021). Pain management after complex spine surgery: A systematic review and procedure-specific postoperative pain management recommendations. European Journal of Anaesthesiology, 38(9), 985–994.',
    otherReferences: [
      'Mobbs, R. J., Phan, K., Malham, G., Seex, K., & Rao, P. J. (2015). Lumbar interbody fusion: Techniques, indications and comparison of interbody fusion options including PLIF, TLIF, MI-TLIF, OLIF/ATP, LLIF and ALIF. Journal of Spine Surgery, 1(1), 2–18.',
      'Brau, S. A., Delamarter, R. B., Schiffman, M. L., Williams, L. A., & Watkins, R. G. (2004). Vascular injury during anterior lumbar surgery. The Spine Journal, 4(4), 409–412.',
      'Carson, J. L., Stanworth, S. J., Guyatt, G., et al. (2023). Red blood cell transfusion: 2023 AABB International Guidelines. JAMA, 330(19), 1892–1902.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Intraoperative Neurophysiological Monitoring and Anesthetic Considerations in Lateral and Anterior Lumbar Spine Surgery.'
    ]
  }
};
