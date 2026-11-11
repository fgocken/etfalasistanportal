import { ProcedureDefinition } from '../../types/procedures';

/**
 * Vagal Sinir Stimülasyonu (VNS): Sol Vagus Siniri Stimülatörü İmplantasyonu (Dirençli Epilepsi Tedavisi)
 * (Vagal Nerve Stimulation - VNS: Left Vagus Nerve Stimulator Implantation)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Functional Procedures: Vagal Nerve Stimulation, pp. 482-486),
 * American Epilepsy Society (AES), International League Against Epilepsy (ILAE),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Nöroşirürji Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const vagalNerveStimulation: ProcedureDefinition = {
  id: 'vagal-nerve-stimulation',
  name: 'Vagal Sinir Stimülasyonu (VNS): Sol Vagus Siniri Stimülatörü İmplantasyonu (Dirençli Epilepsi Tedavisi)',
  shortCode: 'VNS-EPİLEPSİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Epilepsi Nöroşirürjisi',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal tedaviye dirençli epilepsi ve tedaviye dirençli majör depresyon olgularında; sol servikal karotid kılıf içerisindeki N. vagus (CN X) ana gövdesine sarmal (helikal) elektrotların sarılması, elektrot kablosunun cilt altından tünellenerek sol subklaviküler/aksiller bölgede hazırlanan cebe yerleştirilen programlanabilir bir puls jeneratörüne (VNS pili / IPG) bağlanması ameliyatıdır. Elektriksel uyarılar vagus sinirinin afferent lifleri üzerinden beyin sapı nukleus traktus solitarius (NTS) ve talamokortikal ağlara iletilerek epileptik deşarjlar desenkronize edilir ve nöbet sıklığı azaltılır.',
  indications: [
    'Medikal Tedaviye Dirençli Fokal veya Jeneralize Epilepsi: En az 2-3 uygun antiepileptik ilacın (AED) maksimal tolere edilen dozda kullanılmasına rağmen kontrol altına alınamayan, rezeksiyona uygun olmayan veya cerrahi rezeksiyondan fayda görmemiş erişkin ve pediatrik (> 4 yaş) hastalar',
    'Lennox-Gastaut Sendromu ve Pediatrik Epileptik Ensefalopatiler: Düşme atakları (atoni nöbetleri) ve çoklu nöbet tipleri gösteren dirençli olgular',
    'Tedaviye Dirençli Majör Depresyon (TRD): Çoklu antidepresan ve EKT tedavilerine dirençli unipolar veya bipolar depresyon',
    'Tuberoskleroz ve Kortikal Displaziye Bağlı Dirençli Nöbetler',
    'VNS Pil / Jeneratör Değişimi veya Donanım Revizyonu: Batarya ömrü tükenen (genellikle 5-10 yıl) jeneratörlerin lokal/genel anestezi altında elektrot hattına dokunulmaksızın subklaviküler cepten değiştirilmesi'
  ],
  averageDuration: '1.0 - 2.0 saat (Anestezi indüksiyonu, pozisyonlama ve boyun/göğüs cerrahi örtümü: 25-35 dk; Sol servikal insizyon, karotid kılıf diseksiyonu ve sol vagus sinirinin serbestleştirilmesi: 25-35 dk; Helikal elektrotların sinire sarılması, subklaviküler cep açılışı ve subkütan tünelleme: 20-30 dk; Cihaz diagnostik testlemesi [empedans ve test stimülasyonu esnasında EKG/bradikardi kontrolü] ve çift tabakalı yara kapanışı: 20-30 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 30 - 100 mL (Minimal cerrahi kanama; standart VNS implantasyonunda kan kaybı ihmal edilebilir düzeydedir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal / İhmal Edilebilir Cerrahi Kan Kaybı',
    crossMatchRequirement: 'Tip & Screen (T&S) doğrulaması yeterlidir; rutin kan hazırlığı gerekmez',
    transfusionProbability: '< %1 (Son derece nadir)',
    criticalBleedingSources: [
      'V. Jugularis Interna ve Yan Dalları (V. facialis, V. thyroidea superior — karotid kılıf diseksiyonunda yırtılma riski)',
      'A. Carotis Communis (Derin diseksiyonda vasküler adventisya hasarı)',
      'Subklaviküler Cep Kanayanları (A. thoracica interna perforatör dalları ve V. cephalica)',
      'Servikal ve Pektoral Cilt Altı Mikrovasküler Yatak'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal hassas koagülasyon (vagus siniri doğrudan koterize edilmemelidir)',
      'İntraoperatif boyun venöz yaralanmalarında pamuk/Surgicel kompresyonu ve vasküler sütür',
      'Subklaviküler cepte hematom gelişimini önlemek için titiz hemostaz ve cep içine hafif kompresyon'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA) — İnhalasyonel Anestezi (Sevofluran) veya TIVA (Propofol + Remifentanil): Hava yolu güvenliği ve hareketsiz cerrahi saha sağlar',
      'İkinci Seçenek (Revizyon/Pil Değişimi İçin): Laringeal Maske (LMA) veya Lokal Anestezi + Sedasyon (yalnızca izole subklaviküler jeneratör değişimi yapılan erişkin olgularda)'
    ],
    alternative: [
      'Monitörize Anestezi Bakımı (MAC) + Servikal Pleksus Bloğu: Yüksek anestezi riski taşıyan seçilmiş kooperatif erişkin olgularda'
    ],
    notes: 'VNS İMPLANTASYONUNDA ANESTEZİNİN 5 VAZGEÇİLMEZ İLKESİ: (1) DAİMA SOL VAGUS SİNİRİ TERCİH EDİLİR! — Sağ vagus siniri sinoatriyal (SA) nodu yoğun inerve eder; sağ vagus uyarımı KATASROFİK ASİSTOLİ VE KALP DURMASINA yol açar! Sol vagus ise ağırlıklı olarak AV nodu ve beyin sapı duyu afferentlerini uyarır; bu nedenle implantasyon KESİNLİKLE SOL TARAFA yapılır. (2) SİNİR DİSEKSİYONU SIRASINDA VAGAL VE KAROTİD REFLEKSLER — Cerrahi ekip karotid kılıfı açarken veya vagus sinirini çengelle kaldırırken masif bradikardi, hipotansiyon ve asistoli tetiklenebilir; anestezi uzmanı EKG\'yi sürekli sesli izlemeli, cerraha manipülasyonu durdurması söylenmeli ve Atropin hazır tutulmalıdır! (3) CİHAZ SİSTEM TESTLEMESİ (LEAD INTERROGATION) — Elektrotlar pile bağlandığında cerrah test uyarıları gönderir; bu sırada anestezi uzmanı EKG\'de geçici bradikardi/AV blok ve sol vokal kord seğirmesi / laringeal spazm olup olmadığını saniye saniye takip etmelidir. (4) POSTOPERATİF SERVİKAL HEMATOM VE HAVA YOLU BASISI — Boyunda gelişecek küçük bir hematom dahi trakeayı basıya uğratarak akut hava yolu obstrüksiyonu yaratır; uyanma öksürmesiz (smooth emergence) sağlanmalıdır. (5) ANTİEPİLEPTİK İLAÇLARIN AKSATILMAMASI — Hastanın düzenli kullandığı antiepileptik ilaçlar ameliyat sabahı dahil kesintisiz sürdürülmelidir; ilaç atlanması ameliyat masasında status epileptikusu tetikler.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Epileptoloji / Pediatrik Nöroloji Konsültasyonu: Nöbet tipleri (fokal, atoni, sekonder jeneralize), nöbet sıklığı, antiepileptik ilaç rejimleri (AED kombinasyonları) ve son nöbet zamanı kaydedilmelidir.',
      'Kardiyoloji Konsültasyonu: Bazal EKG ve kardiyak ritim değerlendirmesi (özellikle preoperatif bradikardi, AV blok, uzun QT veya hasta sinüs sendromu ekarte edilmelidir; kardiyak iletim defekti olan olgularda VNS göreceli kontrendikedir!).',
      'KBB Konsültasyonu: Preoperatif ses kalitesi ve vokal kord muayenesi (hastanın bazal laringeal fonksiyonu kaydedilmelidir; sol rekürren laringeal sinir hasarı postop ses kısıklığı yaratabilir).',
      'Göğüs Hastalıkları / Uyku Tıbbı: VNS uyarımı solunumsal kas tonusunu etkileyerek Obstrüktif Uyku Apnesini (OSA) tetikleyebilir veya derinleştirebilir; uyku apnesi öyküsü sorgulanmalıdır.'
    ],
    historyAndPhysical: [
      'Nöbet Hikayesi ve Status Epileptikus Riski: İntraoperatif nöbet geçirme olasılığı; kullanılan ilaçların sedasyon ve karaciğer enzim indüksiyonu (Sitokrom P450) etkileri.',
      'Kardiyak Otonomik Değerlendirme: Senkop öyküsü, vagal hiperaktivite ve karotid sinüs aşırı duyarlılığı.',
      'Sol Boyun ve Klavikula Bölgesi Muayenesi: Daha önce geçirilmiş boyun cerrahisi, trakeostomi veya skarlar (karotid kılıf anatomisini değiştirebilir).',
      'Hava Yolu Değerlendirmesi: Antiepileptik ilaçlara bağlı diş eti hipertrofisi (Fenitoin), obezite ve Mallampati skoru.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve T&S doğrulaması.',
      'Tam Kan Sayımı (AED kullanımına bağlı nötropeni/trombositopeni kontrolü) ve Koagülasyon Paneli.',
      'Serum Elektrolitleri: Özellikle Sodyum (Karbamazepin ve Okskarbazepine bağlı hiponatremi sık görülür ve nöbet eşiğini düşürür!).',
      'Karaciğer ve Böbrek Fonksiyon Testleri (AED metabolizması takibi).',
      '12 Derivasyonlu EKG (PR mesafesi ve bazal kalp hızı kontrolü).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: Kesintisiz EKG (özellikle elektrot yerleşimi ve test uyarımı esnasında bradikardi takibi için sesli EKG puls tonu açık tutulmalıdır), Non-invaziv Kan Basıncı (3-5 dk aralıkla), SpO2, EtCO2 ve Vücut Sıcaklığı.',
      'İntraoperatif Test Uyarımı (Diagnostic Lead Test) İzlemi: Cerrah cihazı test ettiğinde kalpte ani bradikardi, asistoli veya disritmi gelişimi saniye saniye izlenir.',
      'Vokal Kord / Laringeal Yanıt İzlemi: İsteğe bağlı olarak vokal kord elektrotlu endotrakeal tüp (NIM ETT) kullanılarak vagal motor liflerin uyarımı doğrulanabilir.',
      'Nöromusküler İleti İzlemi (TOF): İntraoperatif elektrot testinde laringeal motor yanıt gözlenecekse cerrah testi yapmadan önce nöromusküler blokajın çözülmüş olması gerekir.',
      'Isı Takibi (Normotermi 36.5 - 37.5°C).'
    ],
    vascularAccess: [
      'En az 1 veya 2 adet güvenli periferik intravenöz hat (sağ kolda tercih edilir; sol göğüs ve boyun cerrahi örtü altında kalacaktır)',
      'Pediatrik olgularda sıvı infüzyon pompası ve ısıtıcı pedler'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Sağa 30 - 45° Döndürülmüş ve Sol Omuz Altına Hafif Destek Rulo Yerleştirilmiş',
    patientPositionDetails: [
      'Sol boyun bölgesini germek ve karotid üçgeni rahat expose etmek için baş sağa çevrilir ve boyun hafif ekstansiyona getirilir.',
      'AŞIRI BOYUN ROTASYONUNDAN KAÇINILMALIDIR: Aşırı çevirme endotrakeal tüpü bükebilir veya sol internal juguler veni gererek venöz yırtılma riskini artırır.',
      'Geniş Cerrahi Örtüm: Sol boyun, sol klavikula, sol pektoral ve ön aksiller alan aynı steril sahada açık bırakılır.',
      'Gözler koruyucu pomadla kapatılır; bası noktaları jel pedlerle desteklenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2 - 2.5 mg/kg) + Fentanil (2 mcg/kg) + Rokuronyum (0.6 mg/kg). Yumuşak ve atravmatik laringoskopi ile entübasyon.',
      'İdame: İnhalasyon anestezisi (Sevofluran / Desfluran MAC 0.8 - 1.0) veya TIVA (Propofol + Remifentanil).',
      'Vagal Manipülasyon Sırasında Bradikardi ve Asistoli Yönetimi:',
      '  - Sol vagus siniri karotid kılıftan diseke edilirken cerrah siniri forseps veya lastik teyp ile gerdiğinde ani bradikardi gelişebilir.',
      '  - Müdahale: Cerraha anında haber verilir, manipülasyon durdurulur; kalp hızı 5-10 saniyede düzelmezse IV Atropin (0.5 - 1.0 mg) veya Glikopirolat uygulanır.',
      'Cihaz Test Uyarımı (Interrogation) Fazı:',
      '  - Cerrah telemetri asası ile jeneratörü çalıştırıp 1 mA test stimülasyonu verdiğinde:',
      '    1. EKG\'de geçici kalp yavaşlaması veya asistoli olup olmadığı teyit edilir.',
      '    2. Sol vokal kord seğirmesi ve hafif trakeal titreşim hissedilerek elektrotun sinire tam temas ettiği cerraha bildirilir.',
      'Subkütan Tünelleme Sırasında Analjezi:',
      '  - Tünel boyundan subklaviküler cebe trokar ile açılırken anestezi derinliği artırılır veya hatta lokal anestezik infiltre edilir.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; tüp sağ ağız köşesine sağlam bantlanır (sol cerrahi saha serbest kalmalıdır).',
      'Sol Vagus ve Sol Rekürren Laringeal Sinir Koruması: Cerrahın manipülasyonu sol vokal kord fonksiyonunu etkileyebileceğinden, tüpün laringeal manşonunun aşırı şişirilmemesi (kaf basıncı 20-25 cmH2O) önemlidir.',
      'Ekstübasyonda tüp laringeal travma yaratmadan yumuşakça çekilmelidir.'
    ],
    criticalSurgicalStages: [
      '1. Sol Servikal Karotid Kılıf Diseksiyonu: V. jugularis interna ve A. carotis communis arasından N. vagus\'un izole edilmesi (bradikardi izlemi).',
      '2. Üç Helikal Elektrotun Vagus Sinirine Sarılması: Sinir travması ve gerginlikten kaçınılması; çapa ve aktif elektrotların sabitlenmesi.',
      '3. Sol Subklaviküler Pektoral Cep Açılışı ve Subkütan Tünelleme: Şiddetli ağrılı uyaran kontrolü.',
      '4. Lead Kablosunun Jeneratöre Kilitlenmesi ve Cihaz Test Uyarımı: EKG\'de kardiyak ritim ve impedans doğrulaması.',
      '5. Çok Tabakalı Su Geçirmez Kapanış: Servikal hematom ve seroma gelişimini önlemek için titiz hemostaz.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE): Ekstübasyon esnasında öksürme ve ıkınma boyun venöz basıncını artırarak derin servikal hematom gelişimine yol açar; bu durum trakeayı dakikalar içinde basıya uğratarak boğulmaya neden olabilir! IV Lidokain (1.5 mg/kg) ile öksürük refleksi baskılanır.',
      'Ses Kısıklığı ve Laringeal Disfonksiyon Değerlendirmesi: Hasta uyanır uyanmaz ses kalitesi kontrol edilir (geçici ses kısıklığı, boğuk ses veya stridor sol rekürren laringeal sinir irritasyonunu gösterir).',
      'Nörolojik Takip: Hastanın bilinci ve nöbet aktivitesi ameliyathanede değerlendirilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - Boyun ve Subklaviküler İnsizyon Hatlarına Lokal Anestezik İnfiltrasyonu (%0.25 Bupivakain): Postoperatif ilk 8-12 saatlik analjezi konforu sağlar.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Oral / IV NSAİİ (İbuprofen / Deksketoprofen): Cerrahi hemostaz teyit edildikten sonra.',
      '  - Şiddetli ağrı nadirdir; hafif oral tramadol veya parasetamol-kodein kombinasyonları kurtarma amaçlı yeterlidir.'
    ],
    prospectRecommendations: [
      'Minör servikal ve pektoral cerrahilerde insizyonel lokal anestezik infiltrasyonu ve sistemik parasetamol opiat gereksinimini ve sedasyon riskini minimize eder.'
    ],
    erasRecommendations: [
      'ERAS Epilepsi Cerrahisi Kılavuzları:',
      '  - Antiepileptik Tedavinin Kesintisiz Devamı: Hastanın ameliyat öncesi kullandığı tüm antiepileptik ilaçlar ameliyat sonrası ilk saatlerde oral veya IV formda eksiksiz verilmelidir.',
      '  - Boyun Hematomu Takibi: Boyunda şişlik, solunum sıkıntısı veya pansumanda kanama varlığında acil yara açılması ve hava yolu emniyeti sağlanmalıdır.',
      '  - VNS Cihaz Aktivasyonu: Ameliyathanede cihaz genellikle "kapalı" (off) veya minimum bazal akımda bırakılır; kalıcı terapötik stimülasyon ameliyattan 2-4 hafta sonra nöroloji polikliniğinde kademeli olarak başlatılır.',
      '  - Erken Oral Beslenme ve Mobilizasyon: Postoperatif 2-4. saatte oral sıvı alımı ve yatak dışı mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Functional Procedures: Vagal Nerve Stimulation (pp. 482-486). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Functional Neurosurgery and Neuromodulation: Consensus Guidelines. Journal of Neurosurgery.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Minor Cervical and Chest Wall Procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Morris, G. L., et al. (2013). Evidence-based guideline update: vagus nerve stimulation for the etiology of epilepsy: report of the Guideline Development Subcommittee of the American Academy of Neurology. Neurology, 81(16), 1453-1459.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Management of Patients Undergoing Vagus Nerve Stimulator Implantation.',
      'Englot, D. J., et al. (2016). Vagus nerve stimulation for epilepsy: a systematic review of efficacy and predictors of response. The Lancet Neurology, 15(4), 369-379.'
    ]
  }
};
