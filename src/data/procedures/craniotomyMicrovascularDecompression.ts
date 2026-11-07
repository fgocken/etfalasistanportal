import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: Kranyal Sinir Mikrovasküler Dekompresyonu (MVD - Jannetta Prosedürü)
 * (Microvascular Decompression of Cranial Nerves: Trigeminal, Facial, Glossopharyngeal)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Cranial Nerve Decompression, pp. 427-433),
 * American Association of Neurological Surgeons (AANS/CNS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Nöroşirürji Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const craniotomyMicrovascularDecompression: ProcedureDefinition = {
  id: 'craniotomy-microvascular-decompression',
  name: 'Kraniyotomi: Kranyal Sinir Mikrovasküler Dekompresyonu (MVD - Trigeminal, Fasiyal ve Glossofaringeal)',
  shortCode: 'MVD-JANNETTA',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Kafa Tabanı Nöroşirürjisi',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Beyin sapı kök çıkış bölgesinde (Root Entry/Exit Zone - REZ) kompresyon oluşturan ektatik arteriyel (SCA, AICA, PICA, Vertebral arter) veya venöz damarların, mikroskopik retrosigmoid suboksipital kraniyotomi/kraniektomi yoluyla serbestleştirilerek sinir ile damar arasına kalıcı teflon keçe (Teflon felt / köpük spongostan) yerleştirilmesi (Jannetta prosedürü) ameliyatıdır. En sık N. trigeminus (CN V - Trigeminal Nevralji), N. facialis (CN VII - Hemifasiyal Spazm) ve N. glossopharyngeus (CN IX - Glossofaringeal Nevralji) tutulur.',
  indications: [
    'Klasik Trigeminal Nevralji (Tic Douloureux / CN V): Karbamazepin, Okskarbazepin veya diğer antiepileptik ilaç tedavisine dirençli ya da ilaç toksisitesi gelişen, Superior Serebellar Arter (SCA) veya AICA kompresyonuna bağlı şimşek çakar tarzda yüz ağrısı krizleri',
    'Hemifasiyal Spazm (CN VII): Yüzün tek yarısında göz çevresinden başlayıp ağız köşesine yayılan istemsiz paroksismal kas kasılmaları; Anterior İnferior Serebellar Arter (AICA) veya PICA basısı',
    'Glossofaringeal Nevralji (CN IX / CN X): Boğaz, tonsil loju, dil kökü ve kulak derinliğinde yutkunma/öksürme ile tetiklenen dayanılmaz batıcı ağrılar; PICA veya vertebral arter kompresyonuna bağlı bradikardi ve senkop krizleri',
    'Vestibüler Paroksizmi / Nörovasküler Tinnitus (CN VIII): AICA basısına bağlı medikal tedaviye yanıtsız paroksismal baş dönmesi ve çınlama',
    'Spazmodik Tortikollis / N. Accessorius Nörovasküler Çatışması (CN XI): Nadir görülen aksesuar sinir vasküler kompresyon olguları'
  ],
  averageDuration: '3.0 - 5.0 saat (Anestezi indüksiyonu, invaziv A-line, BAEP ve Fasiyal EMG elektrotlarının yerleşimi, Park-Bench / Lateral pozisyonlama ve Mayfield çivili başlık tespiti: 50-70 dk; Retrosigmoid insizyon, anahtar deliği [keyhole] kraniektomi ve dural açılış: 45-60 dk; Serebellar retraksiyon, araknoid diseksiyon, beyin sapı sisternlerinin boşaltılması, suçlu damarın tespiti ve Teflon keçe ile sinir dekompresyonu: 60-120 dk; Su sızdırmaz [water-tight] dural tamir, kraniyoplasti ve cilt kapanışı: 40-55 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 350 mL (Mikronöroşirürjikal anatomik diseksiyonda kan kaybı genellikle düşüktür; ancak emissary venler, Sinüs Sigmoideus / Sinüs Transversus laserasyonu veya Dandy petroz veni yırtığında kan kaybı hızla 600 - 1200 mL düzeyine çıkabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Dural Sinüs ve Petroz Ven Komşuluğu',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bekletilmeli, T&S doğrulanmalıdır; dural sinüs hasarı ve venöz hava embolisi (VAE) riski göz önünde bulundurulmalıdır',
    transfusionProbability: '%5 - %15 (Dural sinüs veya petroz ven hasarı gelişmedikçe transfüzyon nadirdir)',
    criticalBleedingSources: [
      'Sinüs Sigmoideus ve Sinüs Transversus Bileşkesi (Retrosigmoid kraniektomi sınırında yüksek debili venöz kanama ve hava embolisi riski)',
      'Petroz Ven (Dandy Veni): CN V trigeminal köke ulaşılırken gerilen veya koagüle edilmek zorunda kalınan büyük köprü veni',
      'Mastoid Emissary Venler (Kemik pencere açılırken diploik venöz sızıntılar)',
      'A. Cerebellaris Superior (SCA) ve AICA Yan Dalları (Mikrovasküler diseksiyonda perforatör arter hasarı beyin sapı enfarktına yol açabilir)',
      'Suboksipital Venöz Pleksus Kanayanları'
    ],
    hemostasisStrategies: [
      'Bipolar hassas mikronöroşirürjikal koagülasyon (perforatör damarlar yakılmamalıdır)',
      'Kemik diploik kanamalarında steril kemik mumu (Bone Wax) basılması',
      'Dural sinüs kenarı sızıntılarında Gelfoam, Surgicel veya FloSeal ile nazik kompresyon',
      'Sinüs laserasyonunda cerrahi dural tamir, başın hafif indirilmesi ve venöz hava embolisini önlemek için alana serum fizyolojik doldurulması',
      'Teflon Keçe (Teflon Felt): Sinir ile damar arasına yerleştirilen implantın damar duvarını zedelemeyecek yumuşaklıkta olması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Dengeli Genel Endotrakeal Anestezi (GETA) + Total İntravenöz Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA ŞARTTIR: İntraoperatif Nöromonitörizasyon (BAEP / ABR ve Fasiyal / Alt Kranyal Sinir Spontan-Tetiklenmiş EMG) kullanıldığından indüksiyon sonrasında KAS GEVŞETİCİ KESİNLİKLE KULLANILMAZ!'
    ],
    alternative: [
      'TIVA + Çok Düşük Doz Sevofluran (< 0.3 - 0.4 MAC): Yalnızca BAEP dalgalarını baskılamayacak ve EMG amplitüdünü bozmayacak mikro düzeyde'
    ],
    notes: 'MVD CERRAHİSİNDE ANESTEZİNİN 4 HAYATİ ZORUNLULUĞU: (1) KAS GEVŞETİCİSİZ İDAME — Fasiyal sinir serbest EMG (Free-run EMG), Lateral Spread Response (LSR) ve alt kranyal sinir kas yanıtlarını izlemek için indüksiyon sonrası kas gevşetici tekrarlanmamalıdır, (2) BEYİN SAPI VE İŞİTME MONİTÖRİZASYONU (BAEP) — CN VIII gerildiğinde BAEP Dalga V latansında > 1.0 ms uzama veya amplitüdde > %50 düşüş işitme kaybı alarmıdır; cerrah derhal retraktörü gevşetmeli ve alana papaverin uygulamalıdır, (3) OTONOMİK REFLEKSLER — Trigemino-kardiyak refleks (CN V) veya glossofaringeal-vagal refleks (CN IX/X) ile cerrahi manipulasyon sırasında aniden ASİSTOLİ, masif bradikardi veya hipotansiyon gelişebilir; cerraha manipülasyonu durdurması söylenmeli ve Atropin hazır bulundurulmalıdır, (4) PÜRÜZSÜZ UYANMA — Arka çukur dar ve rijit bir kompartmandır; uyanmada öksürme/ıkınma beyin sapına bası yapan ölümcül hematoma yol açar!'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Nöroradyoloji Konsültasyonu: Yüksek çözünürlüklü 3D CISS / FIESTA ve MR-Anjiyografi bulguları; suçlu damarın tipi (SCA, AICA, PICA, ektatik baziller arter), sinir kök basısının anatomisi ve arka çukur hacmi incelenmelidir.',
      'Nöroloji / İONM Ekibi: Bazal işitme durumu, preoperatif odyometri testi (işitme kaybı bazali bilinmelidir!), trigeminal duyu muayenesi ve fasiyal asimetri taranmalıdır.',
      'Kardiyoloji Konsültasyonu: Özellikle Glossofaringeal Nevralji olgularında yutkunma ile tetiklenen senkop, bradikardi veya kardiyak arrest atakları (karotid sinüs / vagal hiperaktivite) sorgulanmalı; bazal EKG ve kardiyak rezerv değerlendirilmelidir.',
      'Nöro-Yoğun Bakım Konsültasyonu: Postoperatif yakın nörolojik gözlem, alt kranyal sinir fonksiyonları ve solunum/havayolu güvenliği için YBÜ planlaması.'
    ],
    historyAndPhysical: [
      'Ağrı ve Tetikleyici Noktaların Sorgulanması: Yüze dokunma, tıraş olma, diş fırçalama veya rüzgarla tetiklenen şimşek çakar nevralji krizleri.',
      'Antiepileptik İlaç Kullanımı: Hastalar çoğunlukla yüksek doz Karbamazepin (Tegretol), Okskarbazepin, Baklofen veya Gabapentin kullanmaktadır. Bu ilaçların kan tablosu üzerindeki etkileri (hiponatremi, lökopeni, hepatotoksisite) ve kardiyak iletim gecikmeleri (PR uzaması) değerlendirilmelidir.',
      'Alt Kranyal Sinir Fonksiyonları (CN IX, X, XII): Yutma refleksi, öğürme (gag) refleksi, ses kısıklığı ve uvula deviasyonu bazal muayenesi mutlaka preoperatif kaydedilmelidir.',
      'Zor Hava Yolu ve Boyun Değerlendirmesi: Park-bench veya lateral pozisyonda başa verilecek rotasyon ve fleksiyona servikal omurganın toleransı.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve 2 Ünite ES Cross-Match teyidi.',
      'Serum Elektrolitleri: Özellikle Sodyum (Na+) seviyesi (Karbamazepin ve Okskarbazepin kullanan olgularda ilaca bağlı hiponatremi sık görülür; intraoperatif beyin ödemi riskini artırır!).',
      'Tam Kan Sayımı (Karbamazepine bağlı agranülositoz/trombositopeni kontrolü) ve Karaciğer Enzimleri.',
      'Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen).',
      'Preoperatif Odyometri Raporu ve Ameliyathane Nöronavigasyon İstasyonuna Yüklenmiş MRG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp ve Foramen Monro / Dış Kulak Yolu Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle takılmalıdır. CN V ve CN IX/X manipülasyonundaki ani kardiyak arrest ve tansiyon çöküşlerini saniyelik yakalamak için zorunludur.',
      'Beyin Sapı İşitsel Uyarılmış Potansiyelleri (BAEP / ABR): İşitme sinirinin (CN VIII) korunmasında altın standart. Dalga I (akustik sinir), Dalga III (koklear nükleus/superior oliver kompleks) ve Dalga V (inferior kollikulus) izlenir. Dalga V latansında > 1.0 ms gecikme veya Dalga V amplitüdünde > %50 düşüş geri dönüşümsüz işitme kaybı alarmıdır!',
      'Fasiyal Sinir Serbest ve Uyarılmış EMG (Free-run EMG ve Triggered EMG): M. orbicularis oculi ve M. orbicularis oris kaslarına yerleştirilen iğne elektrotlarla CN VII gerilimi ve irritasyonu izlenir.',
      'Lateral Spread Response (LSR) Monitörizasyonu (Hemifasiyal Spazm İçin): Fasiyal sinirin temporal dalı uyarıldığında mandibular daldan anormal kas yanıtı alınmasıdır; Teflon keçe yerleştirilip mikrovasküler dekompresyon sağlandığı anda LSR yanıtının kaybolması cerrahi başarının kanıtıdır.',
      'Alt Kranyal Sinir EMG Monitörizasyonu (Glossofaringeal Nevralji İçin): CN IX, X, XI, XII kas yanıtları (vokal kord EMG elektrotlu endotrakeal tüp, yumuşak damak ve trapez kası elektrotları).',
      'Venöz Hava Embolisi (VAE) Takibi: Prekordiyal Doppler Ultrason ve Sürekli End-Tidal CO2 (EtCO2 ani düşüşü hava embolisi şüphesidir).',
      'Nöromusküler İleti İzlemi (TOF - Train-of-Four): İdame evresinde kas gevşetici blokajının tamamen kalktığını (TOF = 4/4 ve post-tetanik fasilitasyon) doğrulamak için zorunludur.'
    ],
    vascularAccess: [
      'En az iki adet geniş lümenli periferik intravenöz hat (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Otonomik instabilite veya vazoaktif infüzyon gereksinimi olan yaşlı/riskli olgularda',
      'Kan/Sıvı Isıtıcı Düzenekleri'
    ],
    patientPosition: 'Park-Bench Pozisyonu veya Modifiye Lateral Dekübitus (Mayfield 3-Noktalı Çivili Başlık ile İmmobilize Edilmiş)',
    patientPositionDetails: [
      'Hasta ameliyat edilecek taraf üstte kalacak şekilde lateral veya modifiye üç çeyrek prone (Park-Bench) pozisyona alınır.',
      'Baş Mayfield çivili başlık ile karşı tarafa 10-15° rotasyon, 10-15° apeks fleksiyonu ve hafif lateral tilt ile sabitlenir.',
      'Boyun Venöz Dönüşünün Korunması Hayatidir: Aşırı boyun fleksiyonu veya aşırı torsiyon ipsilateral internal juguler veni tıkayarak arka çukurda masif serebellar venöz konjesyona, cerrahi alanın daralmasına ve intraoperatif serebellar enfarkta yol açar! Çene ile sternum arasında en az 2 parmak mesafe korunmalıdır.',
      'Brakial Pleksus Koruması: Altta kalan kol göğüs seviyesinin altına alınır ve göğüs altına aksiller rulo (axillary roll) yerleştirilir.',
      'Gözler, kulaklar ve peroneal sinir bası noktaları jel pedlerle tam korunmalıdır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (1.5 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Kısa/Orta Etkili Kas Gevşetici (Rokuronyum 0.6 mg/kg). Entübasyon sonrası kas gevşetici KESİNLİKLE tekrarlanmaz!',
      'İdame: TIVA Protokolü (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.25 mcg/kg/dk TCI infüzyonu). BIS hedefi: 40 - 50. Uçucu anestezikler (Sevofluran vb.) BAEP ve EMG dalgalarını baskıladığı için tercih edilmez.',
      'Cerebellar Gevşeme Stratejisi ("Slack Posterior Fossa"):',
      '  - Retrosigmoid koridorda serebelluma minimal ekarte basısı uygulamak için insizyonla birlikte %20 Mannitol (0.5 g/kg IV yavaş) uygulanır.',
      '  - Hafif kontrollü hiperventilasyon (PaCO2 32 - 35 mmHg).',
      '  - Cerrah dura açılışında sisterna magna veya serebellomedüller sisterni açarak BOS drene eder; BOS drene olduğu anda serebellum kendiliğinden çöker ve ekartöre ihtiyaç kalmaz.',
      'Otonomik Krizlerin Yönetimi (Kritik Refleksler):',
      '  - Trigemino-Kardiyak Refleks (TCR): Cerrahi mikroskop altında CN V manipüle edilirken ani bradikardi, asistoli veya hipotansiyon gelişirse: ANINDA CERRAHA MANİPÜLASYONU DURDURMASI SÖYLENİR! Cerrah ekartörü çektiğinde kalp hızı düzelmezse IV Atropin (0.5 - 1.0 mg) veya Glikopirolat uygulanır.',
      '  - Glossofaringeal-Vagal Refleks: CN IX/X manipülasyonunda şiddetli bradikardi veya aritmiye karşı lokal anestezik (sinir üzerine %1 Lidokain damlatılması) ve Atropin hazır bulundurulur.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; başın lateral ve fleksiyonda pozisyonlandırılması sırasında tüpün katlanmasını önlemek için Spiral (Zırhlı / Wire-reinforced) ETT.',
      'Glossofaringeal Nevralji olgularında: Nöromonitörizasyon amacıyla vokal kord EMG kayıt elektrotlu özel endotrakeal tüp (NIM ETT) kullanılabilir.',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Mayfield Çivili Başlık Takılması ve Park-Bench Pozisyonlama: Sempatik pik, juguler ven açıklığı ve aksiller rulo kontrolü.',
      '2. Retrosigmoid Kraniektomi ve Dural Sinüs Kenarı: Sinüs Transversus ve Sigmoideus bileşkesinde kanama ve venöz hava embolisi riski; cerrah sinüs sınırını kemik mumu ile yalıtır.',
      '3. Sisternal Drenaj ve Serebellar Gevşeme: BOS drenajı ile serebellumun düşmesi; beyin sapı işitsel uyarılmış potansiyellerinin (BAEP) bazal teyidi.',
      '4. CN VIII İşitme Sinirinin Korunması: Akustik sinir aşırı gerilirse BAEP Dalga V uzar; retraktör açısı ve cerrahi çekme kuvveti anestezi ekibi uyarısıyla ayarlanır.',
      '5. Suçlu Damarın Diseksiyonu ve Teflon Keçe Yerleştirilmesi: Damar sinir REZ bölgesinden nazikçe ayrılır, araya Teflon keçe yerleştirilir; Hemifasiyal spazmda Lateral Spread Response (LSR) anında kaybolur.',
      '6. Su Sızdırmaz (Water-tight) Dural Tamir ve Valsalva Manevrası: BOS fistülü ve psödomeningosel gelişimini önlemek için cerrah tamir yaparken anestezi uzmanı 25-30 cmH2O hava yolu basıncı uygular.'
    ],
    emergenceNotes: [
      'HİPERTANSİYONSUZ VE ÖKSÜRMESİZ UYANMA (SMOOTH EMERGENCE): Arka çukur rijit ve hacmi çok kısıtlı bir alandır. Uyanma esnasında ıkınma ve hipertansif pikler cerrahi lojda arka çukur hematomuna, beyin sapı kompresyonuna, akut solunum durmasına ve ölüme yol açar!',
      'Uyanma Sırasında Sempatik Blokaj: Ekstübasyon öncesi IV Lidokain (1.5 mg/kg), Esmolol (0.5 mg/kg) veya Deksmedetomidin infüzyonu uygulanarak öksürük ve hipertansiyon tamamen engellenir. Sistolik kan basıncı < 130-140 mmHg tutulmalıdır.',
      'Alt Kranyal Sinir ve Yutma Fonksiyonlarının Değerlendirilmesi: Özellikle CN IX ve CN X cerrahisi geçirmiş hastalarda vokal kord paralizisi, öğürme refleksi kaybı ve aspirasyon riski mevcuttur. Ekstübasyon öncesi vokal kordlar ve spontan yutma refleksi mutlaka kontrol edilmelidir.',
      'Nörolojik Muayene: Ekstübe edilen hastada fasiyal simetri, göz kırpma, işitme kabiliyeti ve ekstremite motor güçleri ameliyathanede anında değerlendirilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Retrosigmoid İnsizyon ve Suboksipital Kas Ağrısı Yönetimi:',
      '  - Cerrahi Başlangıcında veya Kapanışta Cilt/Kas İçi Lokal İnfiltrasyon (%0.25 Bupivakain veya %0.5 Ropivakain): Suboksipital boyun kaslarının spazmını ve ameliyat sonrası ense ağrısını belirgin azaltır.',
      '  - IV Parasetamol (1000 mg 6 saatte bir düzenli infüzyon).',
      '  - IV Deksketoprofen (50 mg 12 saatte bir): Cerrahi hemostaz teyit edildikten sonra.',
      '  - Kurtarma Opiyatı: Düşük doz Tramadol (50 mg IV yavaş) veya Fentanil (25-50 mcg IV); aşırı sedasyon nörolojik takibi engellememelidir.'
    ],
    prospectRecommendations: [
      'Retrosigmoid kraniyotomi sonrası postoperatif ense ve baş ağrısı insidansı yüksektir; cerrahi sahaya preoperatif lokal anestezik infiltrasyonu ve multimodal non-opioid analjezi A-düzeyinde önerilmektedir.'
    ],
    erasRecommendations: [
      'ERAS Nöroşirürji ve Kafa Tabanı Kılavuzları:',
      '  - Postoperatif Bulantı ve Kusmanın (PONV) Agresif Profilaksisi: Arka çukur ve vestibüler cerrahilerde PONV insidansı %70-80\'e ulaşabilir; öğürme KİBAS ve dural BOS kaçağını tetikler. Çift/Üçlü antiemetik (Deksametazon 4-8 mg intraoperatif + Ondansetron 4 mg kapanışta + gerekirse Metoklopramid) uygulanmalıdır.',
      '  - BOS Fistülü Önlemi: Hastanın başı 30° elevasyonda tutulmalı, postoperatif ıkınma, öksürme ve burun sümkürmesi engellenmelidir.',
      '  - Oral Beslenme Öncesi Gag/Yutma Testi: Alt kranyal sinir (CN IX/X) cerrahisi geçiren olgularda su verilmeden önce yutma ve öğürme refleksi hekim tarafından bizzat doğrulanmalıdır.',
      '  - Erken Mobilizasyon: Hemodinamik ve nörolojik stabilitesi tam olan hastaların postoperatif 1. günde yatak dışına çıkarılması.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Cranial Nerve Decompression (pp. 427-433). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Neurosurgical Oncology and Skull Base Surgery: Consensus Guidelines. Journal of Neurosurgery, 134(3), 781-791.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Craniotomy and Suboccipital Approaches. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Jannetta, P. J. (1980). Neurovascular compression in cranial nerve disorders. Neurosurgery, 7(3), 295-300.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Clinical Practice Guideline for Anesthetic Care of Patients Undergoing Microvascular Decompression.',
      'Barker, F. G., et al. (1996). The long-term outcome of microvascular decompression for trigeminal neuralgia. The New England Journal of Medicine, 334(17), 1077-1084.'
    ]
  }
};
