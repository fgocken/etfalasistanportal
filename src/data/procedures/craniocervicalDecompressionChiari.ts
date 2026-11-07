import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyoservikal Dekompresyon: Chiari Malformasyonu Cerrahisi (Foramen Magnum Dekompresyonu ve Duraplasti)
 * (Craniocervical Decompression for Chiari Malformation: Suboccipital Craniectomy, C1 Laminectomy & Duraplasty)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Pediatric & Adult: Craniocervical Decompression, pp. 468-474),
 * AANS/CNS Chiari Malformation Consensus Guidelines,
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Nöroşirürji Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const craniocervicalDecompressionChiari: ProcedureDefinition = {
  id: 'craniocervical-decompression-chiari',
  name: 'Kraniyoservikal Dekompresyon: Chiari Malformasyonu Cerrahisi (Foramen Magnum Dekompresyonu ve Duraplasti)',
  shortCode: 'CHİARİ-DEKOMPRESYON',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kraniyoservikal Bileşke & Pediatrik Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Serebellar tonsillerin foramen magnumdan aşağıya, servikal spinal kanal içine herniye olması (Chiari Tip I malformasyonu) veya beyin sapı/vermisin servikal kanala deplasmanı (Chiari Tip II / Arnold-Chiari) sonucu oluşan beyin sapı kompresyonu ve kraniyoservikal BOS akım obstrüksiyonunu tedavi etmek amacıyla; orta hat suboksipital kraniektomi, C1 arka arkus laminektomisi (gerekirse C2 laminektomisi), Y-şekilli dural açılış, ektopik tonsillerin bipolar küçültülmesi (tonsiller redüksiyon) ve genişletici yama ile su sızdırmaz duraplasti (perikranium, fasya lata veya sığır perikardı) yapılması ameliyatıdır. Eşlik eden siringomiyelinin (servikal kord kisti) gerilemesini ve nörolojik restorasyonu sağlar.',
  indications: [
    'Semptomatik Chiari Tip I Malformasyonu: Foramen magnumdan > 5 mm aşağıya sarkan serebellar tonsiller ve öksürme, hapşırma, ıkınma (Valsalva) ile tetiklenen şiddetli suboksipital baş-ense ağrısı',
    'Servikal Siringomiyeli / Siringobulbi Birlikteliği: Kord içerisinde kistik kavite (syrinx) gelişen, üst ekstremitelerde pelerin tarzı ağrı ve ısı duyusu kaybı (dissosifiye duyu kusuru) ve el kaslarında atrofi gösteren olgular',
    'Beyin Sapı ve Alt Kranyal Sinir Kompresyonu: Disfaji (yutma güçlüğü), vokal kord paralizisi, öğürme (gag) refleksi kaybı, santral uyku apnesi, ataksi ve vertikal nistagmus',
    'İlerleyici Miyelopati ve Skolyoz: Spastisite, hiperrefleksi, Babinski pozitifliği veya özellikle çocuklarda Chiari/siringomiyeli zemininde hızla ilerleyen torakolomber skolyoz',
    'Chiari Tip II (Arnold-Chiari Malformasyonu): Miyelomeningoselli yenidoğan/süt çocuklarında hayatı tehdit edici stridor, apne nöbetleri ve aspirasyon ataklarının acil dekompresyonu'
  ],
  averageDuration: '2.5 - 4.5 saat (Anestezi indüksiyonu, nötral servikal korumalı entübasyon, İONM [MEP/SSEP/BAEP] elektrot kurulumu, Prone pozisyona çevirme ve Mayfield tespiti: 50-70 dk; Orta hat suboksipital insizyon, suboksipital paraspinal kas diseksiyonu, kraniektomi ve C1 laminektomi: 45-60 dk; Dural açılış, araknoid serbestleştirme, Magendie forameni açılışı ve tonsiller redüksiyon: 45-60 dk; Su sızdırmaz genişletici duraplasti yamasının dikilmesi, Valsalva testi ve kas/cilt tabakalı kapanışı: 40-55 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '150 - 450 mL (Standart foramen magnum dekompresyonunda kanama genellikle orta düzeydedir; ancak suboksipital derin venöz pleksus kanamaları, dural marjinal sinüs yırtıkları veya pediatrik olgularda kan kaybı 600 - 1000 mL seviyesine ulaşabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Suboksipital Venöz Pleksus ve Sinüs Komşuluğu',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalı, T&S doğrulanmalıdır; pediatrik olgularda 1 Ünite taze kan hazır tutulmalıdır',
    transfusionProbability: '%10 - %25 (Pediatrik Chiari olgularında ve siringomiyelili revizyonlarda %20-35)',
    criticalBleedingSources: [
      'Suboksipital Venöz Pleksus ve Posterior Atlanto-Oksipital Membran Komşuluğu: C1 posterior arkus diseksiyonunda yoğun venöz sızıntı',
      'Dural Marjinal Sinüs ve Oksipital Sinüs: Foramen magnum kenarında dura açılırken yüksek debili venöz kanama ve Venöz Hava Embolisi (VAE) riski',
      'A. Vertebralis V3 Segmenti: C1 lateral mass diseksiyonunda arterin aşırı lateral manipülasyonla laserasyonu (katastrofik arteriyel kanama)',
      'Suboksipital Kas Diseksiyon Kenarları ve Oksipital Kemik Diploik Emissary Venleri'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal hassas koagülasyon',
      'Kemik diploik kanamalarında steril kemik mumu (Bone Wax) basılması',
      'Venöz pleksus sızıntılarında Surgicel, Gelfoam trombin matriksi veya FloSeal uygulaması',
      'C1 laminektomi esnasında diseksiyonun kesinlikle orta hatta (kemik orta 1.5 cm) tutulması; lateraldeki vertebral arterlere yaklaşılmaması',
      'Duraplasti hattında tam su sızdırmazlık sağlamak için Tisseel / Beriplast fibrin yapıştırıcı matriks'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Dengeli Genel Endotrakeal Anestezi (GETA) + Total İntravenöz Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'İntraoperatif Nöromonitörizasyon (tcMEP, SSEP, BAEP) kullanıldığından entübasyon sonrasında KAS GEVŞETİCİ KESİNLİKLE KULLANILMAZ!'
    ],
    alternative: [
      'TIVA + Çok Düşük Doz Sevofluran (< 0.3 - 0.4 MAC): MEP sinyallerini baskılamayacak mikro düzeyde'
    ],
    notes: 'CHİARİ DEKOMPRESYONUNDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) HAVA YOLUNDA SERVİKAL FLEKSİYON TEHLİKESİ — Entübasyonda başa aşırı fleksiyon veya ekstansiyon verilmesi foramen magnumdaki tonsilleri servikomedüller bileşkeye sıkıştırarak AKUT SOLUNUM ARRESTİ ve KUADRİPLEJİ yaratabilir; entübasyon nötral hatta videolaringoskop veya AFOI ile yapılmalıdır! (2) PRONE POZİSYONDA ÇENE-GÖĞÜS MESAFESİ — Kraniyoservikal alanı açmak için baş fleksiyona getirilirken çene ile sternum arasında EN AZ 2 PARMAK MESAFE KORUNMALIDIR; aşırı fleksiyon internal juguler venleri tıkayarak masif serebellar venöz infarkt ve beyin şişmesine yol açar, (3) İONM VE BEYİN SAPI KORUMASI — tcMEP/SSEP ve alt kranyal sinir (vokal kord EMG) takibi için kas gevşeticisiz rejim şarttır; foramen magnum açılırken ve tonsillere dokunulurken beyin sapı refleksleri (asistoli, bradikardi, hipertansiyon) anında cerraha bildirilmelidir, (4) VENÖZ HAVA EMBOLİSİ (VAE) — Prone pozisyonda cerrahi alan kalp seviyesinin üzerinde olduğundan marjinal dural sinüslerden hava embolisi riski vardır; sürekli EtCO2 izlenmelidir, (5) EKSTÜBASYONDA SANTRAL HİPOVENTİLASYON RİSKİ — Chiari hastalarında bazal santral apne ve alt kranyal sinir disfonksiyonu riski yüksektir; hasta ameliyathanede tam uyanık, vokal kord ve öğürme (gag) refleksi tam olmadan ekstübe edilmemelidir!'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Nöroradyoloji Konsültasyonu: Servikal ve Kranial Sagittal MRG; tonsiller herniasyon mesafesi (mm), siringomiyelinin boyutu/uzanımı, retrofleks odontoid, baziller invajinasyon ve atlantoaksiyel instabilite (C1-C2 açıları) incelenmelidir.',
      'Göğüs Hastalıkları / Uyku Laboratuvarı: Polisomnografi bulguları; santral veya obstrüktif uyku apnesi, desatürasyon indeksleri ve hipoventilasyon skoru taranmalıdır.',
      'KBB Konsültasyonu: Preoperatif vokal kord muayenesi (stridor veya tek taraflı vokal kord paralizisi varlığı postoperatif solunum yetmezliği riskini belirler).',
      'Pediatrik Konsültasyonu (Chiari II Olgularında): Eşlik eden hidrosefali, fonksiyonel şant varlığı, miyelomeningosel defekti ve latex alerjisi riski.'
    ],
    historyAndPhysical: [
      'Valsalva Başağrısı ve Ense Ağrısı: Öksürmek, gülmek, ıkınmak veya başı öne eğmekle şimşek çakar tarzda ense-oksipital ağrı öyküsü.',
      'Bulbar ve Kranyal Sinir Muayenesi: Disfaji, sıvı içerken burundan gelme veya öksürük krizi, dilde atrofi/fasikülasyon (CN XII), öğürme refleksi (CN IX/X) ve ses kısıklığı.',
      'Üst ve Alt Ekstremite Nörolojisi: El kaslarında zayıflık, intrinsik kas atrofisi, ağrı-ısı duyusu kaybı (hastanın elini fark etmeden yakma öyküsü) ve yürüyüş ataksisi.',
      'Zor Hava Yolu Taraması: Kısa boyun, kısıtlı boyun hareketleri (Klippel-Feil sendromu birlikteliği) ve retrognati.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve 2 Ünite ES Cross-Match doğrulaması.',
      'Tam Kan Sayımı, Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen) ve Serum Elektrolitleri.',
      'Arteriyel Kan Gazı (kronik hipoventilasyonu olan Chiari olgularında bazal PaCO2 ve bikarbonat düzeyi).',
      'Dinamik Servikal Fleksiyon-Ekstansiyon Grafileri (atlantoaksiyel instabiliteyi ekarte etmek için).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp ve Foramen Monro Seviyesinde Sıfırlanmış: İndüksiyon öncesi takılmalıdır. Prone çevirmedeki tansiyon düşüşlerini, beyin sapı basısına bağlı bradikardi/hipertansiyon ataklarını saniyelik yakalamak için zorunludur.',
      'İntraoperatif Nöromonitörizasyon (İONM): Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP) ve Beyin Sapı İşitsel Uyarılmış Potansiyelleri (BAEP). Pozisyonlama öncesinde ve prone çevirme sonrasında bazal sinyaller doğrulanmalıdır!',
      'Alt Kranyal Sinir EMG Monitörizasyonu: Vokal kord EMG elektrotlu tüp (CN X), dil elektrotları (CN XII) ve trapez kası elektrotları (CN XI).',
      'Sürekli End-Tidal CO2 (EtCO2) ve Prekordiyal Doppler: Prone pozisyonda venöz hava embolisinin (VAE) anlık takibi.',
      'Nöromusküler İleti İzlemi (TOF - Train-of-Four): İdame evresinde kas gevşetici blokajının tamamen çözüldüğünü (TOF 4/4) doğrulamak için.',
      'Sürekli Isı Takibi (Normotermi 36.5 - 37.5°C).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz yol (14G veya 16G)',
      'Pediatrik olgularda kan ve sıvı ısıtıcı hatlar, mikro-infüzyon pompaları',
      'Santral Venöz Kateter (CVC): Ciddi bulbar tutulumu olan veya hava embolisi riski taşıyan olgularda'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon, Baş Mayfield 3-Noktalı Çivili Başlık ile Hafif Fleksiyonda Sabitlenmiş',
    patientPositionDetails: [
      'Pediatrik Olgularda Kafa Tespiti: 3-4 yaşından küçük veya kafatası ince çocuklarda çivili başlık yerine jel at nalı (horseshoe) başlık kullanılır (çivinin kafatasını delme riski!).',
      'Çene-Sternum Güvenlik Aralığı: Kraniyoservikal bileşkeyi açmak için başa hafif apeks fleksiyonu verilir; ancak çene ile göğüs kemiği arasında MUTLAKA EN AZ 2 PARMAK MESAFE bırakılmalıdır. Aşırı fleksiyon internal juguler venleri sıkıştırarak masif serebellar venöz göllenmeye ve dural açılışta beyin fıtıklaşmasına yol açar!',
      'Karın Serbestliği: Göğüs ve pelvis altına yerleştirilen silikon rulolarla batın tamamen boşta bırakılır (vena cava inferior basısını ve epidural venöz kanamayı önlemek için).',
      'Göz Güvenliği: Göz kürelerine kesinlikle doğrudan temas veya dış bası olmamalıdır (İskemik Optik Nöropati ve körlük önlemi); gözler her 20-30 dakikada bir kontrol edilir.',
      'Brakial pleksus gerilmesini önlemek için kollar gövde yanına anatomik pozisyonda sabitlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 mg/kg). Entübasyonda servikal omurganın aşırı fleksiyon ve ekstansiyonundan kesinlikle kaçınılır.',
      'İdame: TIVA Protokolü (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.25 mcg/kg/dk TCI infüzyonu). BIS hedefi: 40 - 50. İONM MEP kayıtları için indüksiyon sonrası kas gevşetici tekrarlanmaz!',
      'Hava Yolu Güvenliği: Prone pozisyonda ve boyun fleksiyondayken tüpün bükülmesini önlemek için Spiral (Zırhlı / Wire-reinforced) ETT ZORUNLUDUR.',
      'Beyin Sapı ve Vagal Otonomik Krizlerin Yönetimi:',
      '  - Cerrah tonsilleri foramen magnumdan serbestleştirirken veya obex bölgesini manipüle ederken aniden masif bradikardi, asistoli veya hipertansiyon gelişebilir.',
      '  - Müdahale: Anında cerraha manipülasyonu durdurması söylenir; bası kalktığında ritim düzelmezse IV Atropin (0.5 - 1.0 mg) uygulanır.',
      'Ventilasyon Yönetimi: Normokapni (PaCO2 35 - 38 mmHg) hedeflenir; aşırı hiperventilasyondan (PaCO2 < 30 mmHg serebral iskemi riski) kaçınılır.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) Endotrakeal Tüp zorunludur.',
      'Videolaringoskop (McGrath / Glidescope) veya Uyanık Fiberoptik (AFOI): Boyunda manipülasyondan kaçınarak nötral hatta atravmatik entübasyon.',
      'Prone pozisyonda yüz ve dilde venöz göllenmeye bağlı ödem gelişebileceğinden tüp tespit bağları dili sıkıştırmayacak şekilde kontrol edilir.',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Prone Çevirme ve Mayfield Tespiti: İONM bazal sinyallerinin doğrulanması, boyun venöz dönüşünün kontrolü.',
      '2. Suboksipital Kraniektomi ve Foramen Magnum Riminin Alınması: Kemik kenarlarından diploik kanamaların kemik mumu ile durdurulması.',
      '3. C1 Posterior Arkus Laminektomisi: Diseksiyonun orta hatta tutulması; lateraldeki vertebral arterlerin korunması.',
      '4. Y-Şekilli Dural Açılış: Dural marjinal sinüs kanamalarının koagüle edilmesi; araknoid zarın korunarak BOS pulzasyonunun görülmesi.',
      '5. Ektopik Tonsillerin Bipolar Küçültülmesi (Tonsiller Redüksiyon): Magendie forameninin açılması, 4. ventrikül çıkışının serbestleştirilmesi; beyin sapı kardiyak reflekslerinin izlemi.',
      '6. Genişletici Duraplasti Dikilmesi ve Valsalva Manevrası: Yama dikildikten sonra su sızdırmazlığı (water-tight) test etmek için anestezi ekibi 25-30 cmH2O hava yolu basıncını 5-10 saniye tutar; BOS sızıntısı olmadığı teyit edilir.'
    ],
    emergenceNotes: [
      'ÖKSÜRMESİZ VE IKINMASIZ PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE): Ekstübasyon anında öksürme ve ıkınma arka çukur venöz basıncını fırlatarak duraplasti yamasını patlatır ve masif psödomeningosel / BOS fistülüne yol açar; IV Lidokain (1.5 mg/kg) ve Esmolol ile öksürük refleksi baskılanır.',
      'SANTRAL SOLUNUM DEPRESYONU VE APNE RİSKİ: Chiari hastalarında medüller solunum merkezinin cerrahi manipülasyonu veya basısı sonucu postoperatif hipoventilasyon, santral apne ve CO2 yanıtsızlığı gelişebilir. Hasta ameliyathanede tam uyanık, solunum eforu güçlü, tidal volümleri yeterli ve dört ekstremitesini hareket ettirmeden ASLA ekstübe edilmemelidir!',
      'Alt Kranyal Sinir Muayenesi: Ekstübasyon öncesi öğürme (gag) refleksi, vokal kord hareketleri ve spontan yutkunma değerlendirilir; bulbar disfonksiyonu devam eden olgularda entübe olarak Yoğun Bakıma transfer planlanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Suboksipital Paraspinal Kas Spazmı ve Ense Ağrısı Protokolü:',
      '  - Cerrahi Başlangıcında veya Kapanışta Suboksipital Kas ve Fasyaya Lokal İnfiltrasyon (%0.25 Bupivakain): Ense kası spazmını ve ameliyat sonrası rijiditeyi belirgin azaltır.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir düzenli infüzyon).',
      '  - IV Deksketoprofen (50 mg 12 saatte bir): Cerrahi hemostaz teyidi sonrasında.',
      '  - Kurtarma Opiyatı: Düşük doz Tramadol veya Fentanil; solunum merkezini deprese edebilecek yüksek doz morfinden kaçınılmalıdır.'
    ],
    prospectRecommendations: [
      'Kraniyoservikal bileşke cerrahilerinde suboksipital paraspinal kas infiltrasyonu ve düzenli non-opioid analjezikler solunum depresyonu yaratmadan optimal analjezi sağlar.'
    ],
    erasRecommendations: [
      'ERAS Nöroşirürji ve Kraniyoservikal Kılavuzları:',
      '  - BOS Fistülü ve Psödomeningosel Önlemi: Yatak başı sürekli 30° elevasyonda tutulmalı; postoperatif ıkınma, öksürme ve boynun aşırı fleksiyonu engellenmeli, laksatif tedavisi başlanmalıdır.',
      '  - Santral Apne ve Oksijenasyon Takibi: Hastalar postoperatif ilk 24 saat Nöro-Yoğun Bakım veya Yakın Takip Ünitesinde sürekli pulse oksimetre ve kapnografi ile izlenmelidir.',
      '  - Agresif PONV Profilaksisi: Arka çukur ameliyatlarında kusma ve öğürme duraplasti dikişlerini zorlayacağından Deksametazon + Ondansetron ikili profilaksisi sürdürülmelidir.',
      '  - Oral Beslenme Öncesi Gag Testi: Yutma ve öğürme fonksiyonları hekim tarafından bizzat test edilmeden oral katı/sıvı verilmemelidir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Pediatric & Adult: Craniocervical Decompression (pp. 468-474). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Pediatric and Adult Cranial Surgery: Consensus Guidelines. Journal of Neurosurgery, 134(3), 781-791.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Suboccipital Craniectomy and Cervical Spine Procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Tubbs, R. S., et al. (2007). Surgical management of Chiari I malformation: an update. Neurosurgery, 60(4), 213-222.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Care for Posterior Fossa and Craniocervical Junction Surgery.',
      'Arnautovic, K., et al. (2015). Surgical management of Chiari I malformation: surgical technique and international consensus. World Neurosurgery, 84(4), 1162-1172.'
    ]
  }
};
