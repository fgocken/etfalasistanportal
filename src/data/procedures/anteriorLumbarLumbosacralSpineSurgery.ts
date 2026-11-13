import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior Lomber ve Lumbosakral Omurga Cerrahisi: Retroperitoneal Yaklaşımla ALIF, OLIF ve Korpektomi (L1-S1)
 * (Anterior Lumbar/Lumbosacral Spine Surgery: Retroperitoneal Approach for ALIF, OLIF, and Corpectomy)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Spine Surgery: Anterior Lumbar/Lumbosacral Spine Surgery, pp. 536-542),
 * North American Spine Society (NASS), International Society for the Advancement of Spine Surgery (ISASS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Kompleks Omurga Cerrahisi Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const anteriorLumbarLumbosacralSpineSurgery: ProcedureDefinition = {
  id: 'anterior-lumbar-lumbosacral-spine-surgery',
  name: 'Anterior Lomber ve Lumbosakral Omurga Cerrahisi: Retroperitoneal Yaklaşımla ALIF, OLIF ve Korpektomi (L1-S1)',
  shortCode: 'LOMBER-ANT-ALIF',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Alt torakolomber ve lumbosakral omurgada (L1-L5 ve L5-S1 seviyeleri) dejeneratif disk hastalığı, spondilolistezis (bel kayması), instabilite, psödoartroz, patlama kırıkları veya omurga tümörlerinde uygulanan anterior/anterolateral cerrahi yaklaşımları kapsar. En sık uygulanan yöntem Anterior Lomber Cisimlerarası Füzyon (ALIF / Anterior Lumbar Interbody Fusion) ve Oblik Lomber Cisimlerarası Füzyon (OLIF / Oblique Lumbar Interbody Fusion)\'dur. Genellikle bir damar/genel cerrah (access surgeon) eşliğinde sol alt kadrandan retroperitoneal veya transperitoneal yolla periton kesesi mediale ekarte edilir; ana iliak damarlar (A. iliaca communis ve V. iliaca communis sinistra) ile Vena Cava Inferior diseke edilerek disk mesafeleri ve vertebra korpusu ortaya konur. Bozulmuş disk veya korpus tamamen çıkarılarak (korpektomi) geniş lordotik titanyum/PEEK kafes (cage) ve kemik grefti yerleştirilir; anterior kilitli vidalar veya plaklarla biyomekanik füzyon sağlanır. Posterior omurga kasları ve sinir kökleri kesilmediğinden posterior yaklaşımlara göre daha geniş kafes yerleştirilebilir ve sagital lordoz mükemmel restore edilir.',
  indications: [
    'Lomber Dejeneratif Disk Hastalığı (DDD): Konservatif tedaviye dirençli şiddetli aksiyel bel ağrısı yaratan L4-L5 veya L5-S1 disk dejenerasyonları ve Modic değişiklikleri',
    'Spondilolistezis (Lomber Bel Kayması): Derece I ve II istmik veya dejeneratif spondilolistezis olgularında disk yüksekliğinin ve foraminal yüksekliğin indirekt dekompresyonla restorasyonu',
    'Erişkin Omurga Deformitesi ve Dejeneratif Skolyoz: Sagital dengesizliği düzeltmek ve lomber lordozu artırmak için L1-S1 arası çok seviyeli anterior kafes yerleşimi',
    'Başarısız Bel Cerrahisi Sendromu (FBSS) ve Psödoartroz: Önceki posterior enstrümantasyon sonrası kaynamayan (nonunion) mesafelerin anterior revizyonu',
    'Lomber Vertebra Kırıkları ve Tümörleri: L1-L5 korpusunu tutan nörolojik basılı burst kırıkları veya metastatik kitlelerin anterior korpektomi ve expandable cage ile rekonstrüksiyonu',
    'Yapay Disk Protezi (Lomber Total Disk Artroplastisi - TDR): Seçilmiş genç hastalarda hareket koruyucu anterior cerrahi'
  ],
  averageDuration: '2.5 - 5.5 saat (Tek seviye ALIF [L5-S1]: 2.0 - 3.0 saat; Çift seviye ALIF [L4-L5 ve L5-S1]: 3.0 - 4.5 saat; Çok seviyeli OLIF veya anterior korpektomi: 4.0 - 6.0 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '300 - 1000 mL (Sorunsuz tek seviye ALIF\'te 150-300 mL; ancak iliak ven yırtılması veya korpektomide 1500-3000 mL masif kanama riski mevcuttur)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Sol Ana İliak Ven, Vena Cava Inferior ve Aort Çatallanması Komşuluğu)',
    crossMatchRequirement: 'En az 2-4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite Taze Donmuş Plazma (TDP) ameliyathanede hazır bulundurulmalıdır; Cell Saver (Kan Kurtarma Cihazı) steril hatta bağlanmalıdır',
    transfusionProbability: '%30 - %50 (Çok seviyeli füzyon ve korpektomilerde %60)',
    criticalBleedingSources: [
      'V. Iliaca Communis Sinistra (Sol Ana İliak Ven — L4-L5 disk mesafesini çaprazlar; ince duvarlıdır, diske yapışıktır ve ekartasyon sırasında yırtılması saniyeler içinde 1-2 litre masif kanamaya yol açar)',
      'Vena Cava Inferior (VCI) ve Aorta Abdominalis Çatallanması (Bifurkasyon — L4-L5 seviyesi)',
      'A. ve V. Sacralis Mediana (Orta sakral damarlar — L5-S1 disk ön yüzünden geçer; bipolarla koagüle edilip kesilmelidir)',
      'Iliolumbar Ven (Ascending Lumbar Vein — V. iliaca communis arkasında L4-L5 lateralinde seyreder; serbestleştirilmeden ekarte edilirse kökünden koparak pelviste durdurulamaz kanama yaratır)',
      'Vertebra Korpusu Kansellöz Kemik Kanamaları'
    ],
    hemostasisStrategies: [
      'Vasküler cerrah veya deneyimli erişim cerrahı (access surgeon) eşliğinde damarların atravmatik mobilizasyonu',
      'İliak ven yaralanmasında anında vasküler klempaj, parmak/pamuk basısı ve 4-0/5-0 Prolene vasküler dikiş ile primer onarım',
      'Orta sakral damarların ve iliolumber venin önceden klemplenip bağlanması / klipslenmesi',
      'Kemik yüzeylerinde kemik mumu, FloSeal, Surgicel ve Tisseel hemostatik matriks kullanımı',
      'Hücre kurtarma (Cell Saver) sisteminin aktif kullanımı'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) — İntraoperatif MEP, SSEP ve Transpsoas / Lomber Pleksus EMG monitörizasyonu için MUTLAK ALTIN STANDARTTIR'
    ],
    alternative: [
      'GETA + Düşük Doz Sevofluran/Desfluran (< 0.5 MAC) + Opioid İnfüzyonu (Yalnızca psoas içinden geçilmeyen ve İONM yapılmayan standart L5-S1 ALIF olgularında)'
    ],
    clinicalRationale: 'Transpsoas/oblik yaklaşımda (XLIF/OLIF) lomber pleksus EMG\'si ile MEP/SSEP yanıtlarını korumak için entübasyon sonrası kas gevşeticisiz Propofol + Remifentanil TIVA altın standarttır. Trendelenburg pozisyonu ve retroperitoneal/abdominal ekartasyon diyaframı yukarı iterek hava yolu basınçlarını yükselttiğinden kontrollü ventilasyon için kaflı oral endotrakeal entübasyon şarttır.',
    notes: 'ANTERİOR LOMBER VE LUMBUSAKRAL CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) SOL ANA İLİAK VEN YIRTILMASI VE MASİF KANAMA ALARMI — L4-L5 ve L5-S1 disk mesafelerinin tam önünde Aort bifurkasyonu ve Sol Ana İliak Ven yer alır. Özellikle sol ana iliak ven son derece ince duvarlı ve diske yapışıktır; cerrahi ekartörle çekilirken veya disk mesafesi açılırken yırtılırsa pelvis derinliğinde saniyeler içinde 1500-2000 mL masif venöz kanama gelişir! Cerraha anında haber verilmeli, masada 4-0 Prolene dikiş ve vasküler klempler hazır olmalı, hızlı transfüzyon cihazı (Belmont/Ranger) ve kan ürünleri anında başlatılmalıdır. (2) SÜPERİOR HİPOGASTRİK PLEKSUS HASARI VE RETROGRAD EJAKÜLASYON — L5-S1 disk ön yüzünde ve aort bifurkasyonu üzerinde sempatik Süperior Hipogastrik Pleksus sinir lifleri seyreder. Bu bölgede monopolar koter kullanımı veya aşırı kaba diseksiyon sempatik lifleri harap ederek erkek hastalarda RETROGRAD EJAKÜLASYONA (mesane iç sfinkter felci sonucu spermin mesaneye kaçması ve kalıcı kısırlık) yol açar! L5-S1 önünde MONOPOLAR KOTER KESİNLİKLE KULLANILMAZ; yalnızca künt diseksiyon ve bipolar koter uygulanır. (3) DİSTAL EKSTREMİTE PERFÜZYON TAKİBİ (AYAK NABIZ OKSİMETRESİ) — Cerrahi ekartörler iliak arterleri laterale doğru uzun süre gerdiğinde alt ekstremiteye giden arteriyel kan akımı kesilebilir veya akut iliak tromboz gelişebilir. Bu nedenle her iki ayağa nabız oksimetresi (SpO2 probu) takılmalı veya sol/sağ pedal nabızlar cerrahi ekartasyon boyunca sürekli kontrol edilmelidir; pletismografik dalga kaybolursa cerrah ekartörü derhal gevşetmelidir! (4) TRANSPROAS YAKLAŞIMDA (XLIF/OLIF) LOMBER PLEKSUS VE FEMORAL SİNİR KORUMASI — Psoas kası içinden veya önünden geçilen lateral/oblik girişimlerde (L1-L5), kas dokusu içindeki Lomber Pleksus ve Femoral Sinir doğrudan risk altındadır. Hasar kuadriseps felcine (diz ekstansiyon kaybı) ve uyluk ön yüzünde kalıcı uyuşukluğa yol açar. Gerçek zamanlı tetiklenmiş EMG (Triggered EMG) kullanılır; bu nedenle entübasyon sonrası KESİNLİKLE KAS GEVŞETİCİ VERİLMEMELİ (TOF 4/4) ve kürarsız TIVA sürdürülmelidir. Psoas ekartasyon süresi 20-30 dakikayı aşmamalıdır. (5) RETROPERİTONEAL ORGAN KORUMASI VE POSTOPERATİF PARALİTİK İLEUS — Periton kesesi, sol üreter ve sigmoid kolon diseksiyon hattındadır. Üreter peritonun arkasına yapışık kalkar; ekartör basısı üreter iskemisine veya yırtılmasına yol açabilir. Geniş retroperitoneal diseksiyon nedeniyle postoperatif dönemde paralitik ileus sıktır; erken oral alım kademeli planlanmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Damar Cerrahisi / Genel Cerrahi Konsültasyonu (Erişim Cerrahı - Access Surgeon): Retroperitoneal açılış, iliak damarların mobilizasyonu ve olası vasküler komplikasyonların yönetimi için cerrahi ekiple eşgüdüm.',
      'Nöroloji / Nöroşirürji Konsültasyonu: Lomber radikülopati derecesi (L4, L5, S1 kök basıları), motor zaafiyet (düşük ayak, başparmak ekstansiyonu, kuadriseps gücü) ve yürüme mesafesi.',
      'Kardiyoloji Konsültasyonu: İleri yaş hastalarda aterosklerotik iliak ve aortik damar yapısı (aort kalsifikasyonları ve iliak darlık varlığı cerrahi ekartasyonda tromboz ve yırtılma riskini artırır).',
      'Üroloji Konsültasyonu: Erkek hastalarda preoperatif cinsel fonksiyon ve fertilite durumu sorgulanmalı; L5-S1 seviyesinde süperior hipogastrik pleksus hasarına bağlı retrograd ejakülasyon riski (%1-5) yazılı onamda ayrıntılı açıklanmalıdır.'
    ],
    historyAndPhysical: [
      'Geçirilmiş Abdominal ve Pelvik Cerrahi Öyküsü: Daha önce apandektomi, kolesistektomi, sigmoid kolon rezeksiyonu, fıtık onarımı veya sezaryen geçirmiş hastalarda retroperitoneal yapışıklıklar diseksiyonu ve damar serbestleştirmesini son derece güçleştirir.',
      'Periferik Vasküler Muayene: Her iki alt ekstremitede femoral, popliteal, tibialis posterior ve dorsalis pedis nabızları preoperatif palpasyonla doğrulanmalı ve belgelenmelidir.',
      'Kaba Motor ve Duyu Muayenesi: L2-S1 dermatom ve myotom fonksiyonları kaydedilir.',
      'Zor Hava Yolu Taraması: Standart Mallampati ve boyun hareket açıklığı değerlendirmesi.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı ve Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen tam normal olmalıdır (retroperitoneal hematom hayatı tehdit edebilir; antikoagülanlar kılavuzlara uygun kesilmelidir).',
      'En az 2-4 Ünite Eritrosit Süspansiyonu ve 2 Ünite TDP Cross-Match hazırlığı.',
      'Kontrastlı Abdominal ve Pelvik BT Anjiyografi (BTA) / MRG: Aort bifurkasyonu ve iliak venlerin L4-L5 ve L5-S1 disk mesafelerine göre konumu (özellikle "high bifurcation" veya "low bifurcation" anatomisi), orta sakral ve iliolumber ven anomalileri milimetrik değerlendirilir.',
      'Lumbosakral Dinamik Grafiler ve MRG: Bel kaymasının derecesi, disk yükseklik kaybı ve foraminal darlık seviyeleri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Ani majör vasküler kanama, iliak klempleme ve sürekli hemodinamik kontrol için zorunludur.',
      'İKİ TARAFLI AYAK NABIZ OKSİMETRESİ (Dual Foot Pulse Oximetry): Sol ve sağ ayak başparmaklarına takılan SpO2 probları ile cerrah iliak arterleri ekarte ettiğinde distal ekstremite perfüzyonunun kesilip kesilmediği saniye saniye izlenir.',
      'Santral Venöz Kateter (CVC): Masif venöz kanama riski ve vazopressör desteği için sağ internal juguler venöz hat.',
      'İntraoperatif Nöromonitörizasyon (İONM): Bilateral Transkraniyal MEP, SSEP ve Transpsoas / Lomber Pleksus Tetiklenmiş EMG (Triggered EMG); kuadriseps ve tibialis anterior kaslarından sürekli kayıt.',
      'Nöromusküler İleti İzlemi (TOF): Lomber pleksus EMG takibi için ameliyat boyunca TOF 4/4 (%100) olmalıdır; kürarsız TIVA sürdürülür.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı takibi > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (14-16G) periferik intravenöz yol',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ameliyathanede hazır ve ısıtıcı hatları takılı',
      'Cell Saver (Kan Kurtarma Sistemi) steril hatta bağlı ve aktif'
    ],
    patientPosition: 'Supin (ALIF İçin) veya Lateral Dekübitüs (XLIF/OLIF İçin)',
    patientPositionDetails: [
      'ALIF (L4-S1) Supin Pozisyonu: Hasta sırtüstü yatırılır; L5-S1 disk mesafesine anterior aksı rahatlatmak için ameliyat masasına hafif Trendelenburg veya bel altına silikon pelvik destek verilebilir.',
      'Bacaklar hafif açık (frog-leg veya ayrık bacak) tutulabilir; C-kollu floroskopi AP ve lateral eksende serbestçe dönebilmelidir.',
      'XLIF / OLIF Lateral Dekübitüs Pozisyonu: Hasta 90° tam lateral yatırılır; masanın kırma (flexion) fonksiyonu ile iliak kanat ile alt kostalar arasındaki mesafe açılır.',
      'Tüm bası noktaları (fibulada peroneal sinir, dirseklerde ulnar sinir, ayak bilekleri) jel pedlerle korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2-2.5 mg/kg) + Fentanil (3-4 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + kısa etkili kas gevşetici.',
      '  - Videolaringoskop ile oral endotrakeal entübasyon.',
      '  - Entübasyondan sonra nöromusküler bloker verilmez (kürarsız idame).',
      'İdame: TIVA Protokolü (Propofol 90-150 mcg/kg/dk + Remifentanil 0.1-0.3 mcg/kg/dk). İONM sinyallerini baskılamamak için volatil gazlardan kaçınılır (< 0.3 MAC).',
      'Vasküler Ekartasyon ve Akut Yırtılma Protokolü:',
      '  - Sol ana iliak ven yırtıldığında derin retroperitoneal alanda ani kan seli başlar:',
      '    1. Cerraha sesli "MASİF KANAMA ALARMI!" verilir; cerrahi ekip anında parmak ve pamuk kompresyonuna geçer.',
      '    2. Hızlı kan infüzyon cihazı (Belmont) çalıştırılır, kristaloid kısıtlanarak kan ve plazma boluslanır.',
      '    3. Masada 4-0/5-0 Prolene dikiş, vasküler Satinsky klempleri ve FloSeal hazır edilir.',
      'Ayak Pletismografi Dalga Kaybı (İliak Arter İskemisi):',
      '  - Ayak nabız oksimetresinde pletismografi düzleşirse veya dalga kaybolursa cerrah uyarılır; iliak ekartör gerginliği derhal azaltılır.',
      'Psoas Ekartasyon Süresi İzlemi:',
      '  - Transpsoas girişimde ekartör açılış saati kaydedilir; femoral sinir iskemisini önlemek için cerraha 20. dakikada ekartörü gevşetmesi hatırlatılır.'
    ],
    airwayManagement: [
      'Standart oral endotrakeal tüp.',
      'Trendelenburg pozisyonunda ve retroperitoneal bası altında diyafram yukarı itileceğinden tepe havayolu basınçları (Ppeak) yakından izlenir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama ve Floroskopi ile L4-L5 ve L5-S1 Disk Seviyelerinin İşaretlenmesi.',
      '2. Sol Alt Kadran Oblik veya Transvers Kesi ile Cilt-Fasya Açılışı.',
      '3. Retroperitoneal Boşluğa Giriş: Periton kesesinin ve sol üreterin künt diseksiyonla mediale sıyrılması.',
      '4. Vasküler Mobilizasyon: Sol ana iliak ven ve arterin, Vena Cava\'nın serbestleştirilmesi; orta sakral damarların bağlanması (Monopolar koter KULLANILMAZ!).',
      '5. Disk Mesafesinin Açılması ve Geniş Anterior Diskektomi (Kartilajinöz son plakların temizlenmesi).',
      '6. Geniş Lordotik İntervertebral Kafesin (Cage) Kemik Grefti ile Çakılması ve Kilitli Vidalarla Tespiti.',
      '7. Damarların Serbest Bırakılması, Distal Femoral/Pedal Nabızların ve Hemostazın Doğrulanması.',
      '8. Retroperitoneal Dren Yerleştirilmesi ve Katmanlı Anatomik Kapanış.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ EKSTÜBASYON: Ameliyat sonunda ıkınma ve öksürme retroperitoneal alanda venöz basıncı artırarak hematom gelişimini tetikler; IV Lidokain (1.5 mg/kg) ile pürüzsüz uyanma sağlanır.',
      'Distal Nabızların Muayenesi: Hasta uyanır uyanmaz her iki ayakta dorsalis pedis ve tibialis posterior nabızları palpasyonla teyit edilir (iliak tromboz ekarte edilir).',
      'Kuadriseps ve Düşük Ayak Muayenesi: Hasta bacaklarını dizden uzatmalı (L3-L4 femoral sinir) ve ayak bileğini yukarı çekmelidir (L5 derin peroneal sinir).',
      'Hemodinamik Stabilite ve Dren Kontrolü: Retroperitoneal gizli kanama takibi.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Opioid Koruyucu Protokol:',
      '  - Posterior kas diseksiyonu yapılmadığı için ALIF cerrahisinde yara ağrısı posterior füzyonlara göre belirgin azdır; ancak karın duvarı gerilimi ve retroperitoneal ağrı mevcuttur.',
      '  - Cerrahi Kapanış Sırasında Rektus Kılıfı ve Transversus Abdominis Plan (TAP) Bloğu / Lokal İnfiltrasyon (Levobupivakain %0.25).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Oral / IV NSAİİ (İbuprofen veya Deksketoprofen): Renal fonksiyon ve hemostaz teyidi sonrası.',
      '  - Kurtarma Amaçlı İV Hasta Kontrollü Analjezi (IV PCA): Düşük doz Morfin veya Fentanil.'
    ],
    prospectRecommendations: [
      'Anterior retroperitoneal omurga cerrahisinde fasyal plan blokları (TAP bloğu), yara yeri infiltrasyonu ve sistemik parasetamol kullanımı opioid tüketimini azaltarak postoperatif paralitik ileus riskini minimize eder.'
    ],
    erasRecommendations: [
      'ERAS Kompleks Omurga Cerrahisi Kılavuzları:',
      '  - Paralitik İleus Takibi ve Sakız Çiğneme (Gum Chewing): Retroperitoneal manipulasyona bağlı bağırsak tembelliğini önlemek için erken sakız çiğneme protokolü uygulanır; bağırsak sesleri duyulup gaz çıkışı olana dek oral sıvı alımı kademeli artırılır.',
      '  - Vasküler ve DVT Taraması: İliak ven retraksiyonuna bağlı derin ven trombozu (DVT) riskine karşı aralıklı pnömatik kompresyon (IPC) cihazı kesintisiz uygulanır; profilaktik LMWH cerrah onayından sonra başlatılır.',
      '  - Erken Mobilizasyon: Anterior kilitli kafes stabilitesi tam olan hastalar ameliyat sonrası 1. günde yatak dışına çıkarılır ve yürütülür.',
      '  - Erkek Hastalarda Ejakülasyon Takibi: Taburculuk sonrası ilk haftalarda retrograd ejakülasyon gelişimi sorgulanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Spine Surgery: Anterior Lumbar/Lumbosacral Spine Surgery, pp. 536-542. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Debono, B., et al. (2021). Consensus statement for perioperative care in lumbar and cervical spine surgery: Enhanced Recovery After Surgery (ERAS®) Society recommendations. Spine, 46(11), 740-754.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Lumbar Interbody Fusion and Retroperitoneal Spine Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Mobbs, R. J., et al. (2015). Lumbar interbody fusion: techniques, indications and comparison of interbody fusion options including PLIF, TLIF, MI-TLIF, OLIF/ATP, LLIF and ALIF. Journal of Spine Surgery, 1(1), 2-18.',
      'Brau, S. A., et al. (2004). Vascular complications in anterior lumbar surgery. The Spine Journal, 4(4), 405-412.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Intraoperative Neurophysiological Monitoring and Anesthetic Considerations in Lateral and Anterior Lumbar Spine Surgery.',
      'North American Spine Society (NASS). Diagnosis and Treatment of Adult Degenerative Spondylolisthesis and Degenerative Lumbar Spondylosis.'
    ]
  }
};
