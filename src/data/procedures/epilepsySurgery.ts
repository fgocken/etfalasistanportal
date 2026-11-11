import { ProcedureDefinition } from '../../types/procedures';

/**
 * Epilepsi Cerrahisi: Rezektif Cerrahi, Amigdalohipokampektomi ve Elektrokortikografi (ECoG) Eşliğinde Odak Rezeksiyonu
 * (Epilepsy Surgery: Resective Surgery, Amygdalohippocampectomy, and Electrocorticography-Guided Resection)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Epilepsy Surgery, pp. 492-498),
 * International League Against Epilepsy (ILAE), American Epilepsy Society (AES),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Nöroşirürji Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const epilepsySurgery: ProcedureDefinition = {
  id: 'epilepsy-surgery',
  name: 'Epilepsi Cerrahisi: Rezektif Cerrahi, Amigdalohipokampektomi ve Elektrokortikografi (ECoG) Eşliğinde Odak Rezeksiyonu',
  shortCode: 'EPİLEPSİ-CERRAHİSİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Epilepsi Nöroşirürjisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal tedaviye dirençli fokal epilepsi olgularında epileptojenik odağın cerrahi olarak çıkarılması (rezeksiyon) veya yayılım yollarının kesilmesi (diskoneksiyon) ameliyatıdır. En sık uygulanan prosedür Mezial Temporal Skleroz (MTS) tedavisinde Anterior Temporal Lobektomi (ATL) ve Selektif Amigdalohipokampektomi (AH)\'dir. İntraoperatif Elektrokortikografi (ECoG) ile dural açılış sonrası doğrudan beyin korteksi üzerine dizilen elektrotlarla epileptojenik diken dalga deşarjları haritalanır; odak çıkarıldıktan sonra rezeksiyon sınırlarında rezidüel epileptik aktivite olup olmadığı yeniden ECoG ile doğrulanır. Dil ve motor alanlara komşu lezyonlarda uyanık kraniyotomi (Asleep-Awake-Asleep) veya genel anestezi altında nöromonitörizasyon (SSEP, MEP, faz dönüşümü) eşliğinde kortikal haritalama uygulanır.',
  indications: [
    'Mezial Temporal Lobe Epilepsisi (MTLE / Mezial Temporal Skleroz - MTS): Hipokampal skleroz zemininde gelişen ve çoklu antiepileptik ilaçlara dirençli fokal nöbetler (epilepsi cerrahisinin en sık ve başarı oranı en yüksek endikasyonu)',
    'Ekstratemporal Fokal Epilepsiler: Frontal, paryetal veya oksipital lob yerleşimli epileptojenik odak ve lezyonlar',
    'Fokal Kortikal Displazi (FCD) ve Nöronal Göç Anomalileri (Polimikrogiri, Schizensefali, Tuberoskleroz Tüberleri)',
    'Epileptojenik Düşük Evreli Tümörler ve Vasküler Malformasyonlar (DNET, Gangliyogliom, Kavernom, Düşük Evreli Gliomlar)',
    'Hemisferik Epilepsi Sendromları: Rasmussen Ensefaliti, Sturge-Weber Sendromu veya masif perinatal iskemik inme sekeli (Fonksiyonel Hemisferektomi / Hemisferotomi endikasyonu)',
    'Düşme Atakları (Atonik Nöbetler): Cerrahi rezeksiyona uygun olmayan Lennox-Gastaut Sendromu olgularında sekonder jeneralizasyonu önlemek için Korpus Kallozotomi (ön 2/3 veya tam kesi)'
  ],
  averageDuration: '3.5 - 6.0 saat (Pozisyonlama, nöronavigasyon kaydı ve kraniyotomi: 45-60 dk; Dural açılış, elektrot grid yerleşimi ve bazal Elektrokortikografi [ECoG] kaydı: 30-45 dk; Anterior temporal lobektomi, amigdalohipokampektomi veya lezyonektomi: 90-150 dk; Post-rezeksiyon kontrol ECoG kaydı: 20-30 dk; Titiz hemostaz, dural su geçirmez kapama ve kranyoplasti: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '150 - 450 mL (Standart temporal lobektomi ve lezyonektomide 150-300 mL; geniş kortikal displazi, vasküler kavernom veya hemisferektomi olgularında 400-800 mL ve üzeri)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Kanama Riski (Derin venöz yapılar ve koroidal arter komşuluğu; masif kanama potansiyeli)',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalıdır; hemisferektomi veya pediatrik olgularda 3-4 Ünite ES + Taze Donmuş Plazma (TDP) hazırlanmalıdır',
    transfusionProbability: '%10 - %25 (Pediatrik geniş rezeksiyonlarda ve hemisferektomilerde %40-60)',
    criticalBleedingSources: [
      'A. Choroidea Anterior (Hipokampus rezeksiyonunda yırtılma riski; posterior bacak enfarktı ve kalıcı hemipleji riski taşır)',
      'A. Cerebri Media (MCA) M2/M3 İnsular Dalları ve Sylvian Venler',
      'V. Basalis (Rosenthal bazı veni) ve V. Cerebri Media Profunda (Mezial temporal venöz drenaj)',
      'V. Anastomotica Inferior (Labbé Veni — temporal lob retraksiyonunda yırtılma venöz enfarkt ve masif beyin ödemine yol açar)',
      'Dural Marjinal Sinüsler, Orta Meningeal Arter (MMA) ve Diploe Kanamaları'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal koagülasyon ve emici pamuk (cottonoid) diseksiyonu',
      'Hemostatik matriks ajanları (FloSeal, Surgicel, Gelfoam, trombin solüsyonları)',
      'Labbé venini korumak için aşırı temporal lob retraksiyonundan kesinlikle kaçınılması',
      'Hipokampus yatağında A. choroidea anterior ve optik traktusun korunması için düşük güçte bipolar koter kullanımı',
      'Dural asıcı dikişler ve kemik mumu uygulaması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) — ECoG ve nöromonitörizasyon için altın standarttır',
      'Uyanık Kraniyotomi (Asleep-Awake-Asleep - AAA Tekniği): Dominant hemisfer konuşma (Broca / Wernicke) ve motor alan komşuluğundaki rezeksiyonlarda LMA/Kafa Bloku eşliğinde uyanık testleme'
    ],
    alternative: [
      'Düşük Doz İnhalasyon (< 0.5 MAC Sevofluran/İzofluran) + Opioid İnfüzyonu: ECoG kaydı öncesinde inhalasyon gazı kapatılarak veya < 0.3 MAC seviyesine çekilerek TIVA\'ya geçilir'
    ],
    notes: 'EPİLEPSİ CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) ECoG KAYDINA ANESTEZİK ETKİLER — Halojenli inhalasyon ajanları (Sevofluran, Desfluran) ve yüksek doz Propofol/Benzodiazepinler kortikal epileptojenik diken deşarjlarını baskılar veya "burst suppression" yaratarak cerrahın odağı saptamasını engeller. ECoG kaydından 15-20 dakika önce inhalasyon ajanları kapatılmalı veya < 0.3 MAC\'a indirilmeli, propofol dozu titre edilmeli ve gerekirse remifentanil/fentanil bazlı idameye geçilmelidir. (2) İNTRAOPERATİF AKUT NÖBET YÖNETİMİ — Elektriksel kortikal stimülasyon haritalaması veya cerrahi manipülasyon ameliyat masasında fokal veya sekonder jeneralize nöbeti tetikleyebilir. Kortikal deşarjları durdurmak için cerrahi sahaya dökülmek üzere BUZLU SOĞUK SERUM FİZYOLOJİK (Cold Saline, 4°C) masada anında hazır olmalıdır; durmazsa IV Propofol (30-50 mg bolus) veya Midazolam uygulanır. (3) KRONİK ANTİEPİLEPTİK İLAÇLARIN (AED) FARMAKOKİNETİK ETKİLEŞİMLERİ — Fenitoin, Karbamazepin ve Fenobarbital gibi hepatik Sitokrom P450 enzim indükleyicileri kullanan hastalarda nondepolarizan kas gevşeticilerin (Rokuronyum, Vekuronyum) ve opioidlerin klirensi çok hızlıdır; etki süreleri kısalır ve daha yüksek/sık doz gereksinimi doğar. İlaçlar ameliyat sabahı dahil kesintisiz verilmelidir. (4) AMİGDALOHİPOKAMPEKTOMİDE DAMAR VE GÖRME YOLU KORUNMASI — Mezial rezeksiyonda A. choroidea anterior hasarı internal kapsül enfarktına (kalıcı kontralateral hemipleji); Meyer lupunun zedelenmesi ise superior homonim kuadrantanopsiye ("gökteki pasta" defekti) neden olur. Hipotansiyondan kesinlikle kaçınılmalıdır (MAP > 75-80 mmHg). (5) PÜRÜZSÜZ EKSTÜBASYON (SMOOTH EMERGENCE) — Uyanma sırasında öksürme, ıkınma ve hipertansiyon temporal rezeksiyon kavitesinde ölümcül hematoma yol açar; IV Lidokain (1.5 mg/kg) ile laringeal refleksler baskılanarak pürüzsüz uyanma sağlanmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Kapsamlı Epileptoloji / Nöroloji Konsültasyonu: Nöbet semiolojisi, video-EEG monitörizasyon kayıtları, fonksiyonel MRG (fMRI), Wada testi (konuşma ve hafıza lateralizasyonu) ve PET/SPECT bulgularının cerrahi planla örtüşmesi teyit edilmelidir.',
      'Nöropsikoloji Konsültasyonu: Dominant veya non-dominant temporal lob rezeksiyonu öncesinde hastanın bazal hafıza (sözel ve görsel bellek) ve kognitif kapasitesi belgelenmelidir.',
      'Göz Hastalıkları Konsültasyonu: Bazal görme alanı değerlendirmesi (özellikle optik radyasyon ve Meyer lupu komşuluğu nedeniyle homonim görme alanı defekti riski sorgulanmalıdır).',
      'Kardiyoloji Konsültasyonu: Kronik antiepileptik ilaç kullanımına bağlı kardiyak iletim anomalileri, bradiaritmiler veya EKG QT değişiklikleri (örn. Sodyum kanal blokerleri).',
      'Enfeksiyon Hastalıkları: Eğer invaziv monitörizasyon (faz 1 subdural grid veya stereo-EEG) sonrası ikinci seans rezeksiyon yapılıyorsa intrakraniyel enfeksiyon/menenjit ekarte edilmelidir.'
    ],
    historyAndPhysical: [
      'Nöbet Tipi, Sıklığı ve Son Nöbet Zamanı: Son 24-48 saatteki nöbet sayısı, status epileptikus öyküsü ve postiktal konfüzyon durumu sorgulanır.',
      'Antiepileptik İlaç (AED) Rejimi ve Dozları: Politerapi (enzim indükleyen vs indüklemeyen ilaçlar), ilaç düzeyleri ve son alınan doz saati yazılı olarak belgelenir.',
      'Zor Hava Yolu Taraması: Fenitoin kullanımına bağlı diş eti hipertrofisi (gingival hiperplazi), dil büyümesi, boyun kalınlığı ve Mallampati skoru incelenir.',
      'Ayrıntılı Nörolojik Taban Muayenesi: Kranyal sinirler, motor kuvvet, duyu muayenesi ve konuşma yeteneği (Broca/Wernicke) preoperatif kaydedilir.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (AED kullanımına bağlı nötropeni, anemi veya trombositopeni kontrolü; Valproat kullanımında trombosit sayısı ve disfonksiyonu).',
      'Koagülasyon Paneli (PT, aPTT, INR, Fibrinojen; Valproat kullanan olgularda edinsel von Willebrand faktör eksikliği veya hipofibrinojenemi araştırılmalıdır).',
      'Serum Elektrolitleri: Özellikle Serum Sodyum düzeyi (Karbamazepin ve Okskarbazepin hiponatremiye yol açarak nöbet eşiğini düşürür ve beyin ödemi riskini artırır!).',
      'Karaciğer ve Böbrek Fonksiyon Testleri: Karaciğer transaminazları (AST, ALT), Albumin ve Kreatinin düzeyleri.',
      '2 Ünite Eritrosit Süspansiyonu Cross-Match hazırlığı.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (5 derivasyonlu, ST analizi), SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Kan gazı, elektrolit takibi ve serebral perfüzyon basıncının (CPP) milimetrik kontrolü için zorunludur.',
      'Santral Venöz Kateter (CVC): Pediatrik olgularda, geniş hemisferektomilerde veya zor periferik damar yolu olan hastalarda santral erişim.',
      'İntraoperatif Elektrokortikografi (ECoG): Dural açılış sonrası korteks üzerine dizilen çok kanallı silikon grid veya strip elektrotlarla nörolog/epileptolog eşliğinde sürekli kortikal EEG kaydı.',
      'İntraoperatif Nöromonitörizasyon (İONM): SSEP, Transkraniyal MEP, EMG, Faz Dönüşümü (Phase Reversal N20/P20) ve serbest salınımlı kranyal sinir izlemi (CN III, IV, VI, VII).',
      'Mesane Sondası (Sıcaklık sensörlü) ve Hedef İdrar Çıkışı > 0.5-1.0 mL/kg/saat.',
      'Nöromusküler İleti Monitörizasyonu (TOF): Antiepileptik kullanan hastalarda hızlı kas gevşetici yıkımı nedeniyle TOF takibi esastır; ECoG ve MEP test aşamalarında kas gevşeticiden kaçınılır.'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı (16-18G) periferik intravenöz yol',
      'İnvaziv radiyal arter kanülasyonu',
      'Geniş rezeksiyon veya hemisferektomi planlanan olgularda santral venöz kateter (CVC)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş 30-45° Kontralateral Tarafa Çevrilmiş ve Mayfield Çivili Başlıkla Fikse Edilmiş',
    patientPositionDetails: [
      'Temporal lob ve Sylvian fissürü yatay düzleme paralel hale getirmek için baş çevrilir ve hafif ekstansiyona alınır.',
      'İPSİLATERAL OMUZ ALTINA DESTEK RULO: Boyundaki internal juguler ven basısını ve venöz stazı önlemek için ipsilateral omuz yükseltilir; aşırı baş rotasyonundan kaçınılır.',
      'Masa 15-20° Ters Trendelenburg (Baş yukarı): İntrakraniyel venöz drenajı rahatlatmak ve beyin ödemini azaltmak için baş kalp seviyesinin üzerinde tutulur.',
      'Gözler koruyucu pomad ile kapatılır; baskı noktaları (sakrum, topuklar, dirsekler) jel pedlerle korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + Rokuronyum (0.6 mg/kg). Atravmatik videolaringoskopi ile entübasyon.',
      'İdame: TIVA Protokolü (Propofol 70-130 mcg/kg/dk + Remifentanil 0.05-0.2 mcg/kg/dk). İnhalasyon anestezikleri (< 0.5 MAC) kullanılabilir ancak ECoG öncesi kesilir.',
      'ECoG Kaydı Sırasında Anestezi Yönetimi:',
      '  - ECoG kaydından 15 dakika önce tüm volatil gazlar kapatılır veya < 0.3 MAC seviyesinde tutulur.',
      '  - Bolus propofol veya benzodiazepin verilmesi KESİNLİKLE YASAKTIR (diken deşarjlarını siler).',
      '  - Anestezi remifentanil ve düşük doz propofol infüzyonuyla idame ettirilir.',
      'Akut İntraoperatif Nöbet Protokolü:',
      '  - Kortikal stimülasyon veya cerrahi traksiyon sırasında fokal/jeneralize nöbet başlarsa:',
      '    1. Kortikal stimülasyon derhal durdurulur.',
      '    2. Cerrahi sahaya steril BUZLU SOĞUK SERUM FİZYOLOJİK (Cold Saline, 4°C, 30-50 mL) dökülür (termal kortikal susturma).',
      '    3. Nöbet 15-20 saniyede durmazsa IV Propofol (30-50 mg bolus) veya Midazolam (2-5 mg IV) uygulanır.',
      'Beyin Rahatlatma Stratejisi (Brain Relaxation):',
      '  - Normovolemi korunarak Mannitol (%20, 0.5-1.0 g/kg) veya Hipertonik Salin (%3 NaCl, 2-3 mL/kg) uygulanır.',
      '  - Hafif hipokapni (PaCO2 32-35 mmHg) sağlanır; aşırı hiperventilasyon (PaCO2 < 30) epileptojenik aktiviteyi artırabileceğinden kaçınılmalıdır.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; spiral (zırhlı) veya sağlam tespit edilmiş tüp.',
      'Mayfield başlığı takılırken ve cerrahi örtüm esnasında tüpün yerinden oynaması veya bükülmesi engellenir.',
      'Kaf basıncı 20-25 cmH2O aralığında sabitlenir.',
      'Uyanık kraniyotomi uygulanacaksa Asleep-Awake-Asleep (AAA) fazında supraglottik hava yolu (LMA) çıkarılır ve hasta uyanıkken spontan solunuma geçirilir.'
    ],
    criticalSurgicalStages: [
      '1. Kraniyotomi ve Dural Açılış: Kemik flebi kaldırılırken ve dura açılırken beyin şişkinliği değerlendirilir.',
      '2. Pre-rezeksiyon ECoG Kaydı: Kortikal grid yerleştirilerek primer epileptojenik diken dalga odağının sınırları haritalanır.',
      '3. Fonksiyonel Kortikal Haritalama: Konuşma ve motor sahaların tespiti için doğrudan elektriksel uyarım (nöbet riski!).',
      '4. Anterior Temporal Lobektomi (ATL): Temporal kutbun (dominant hemisferde 3-3.5 cm, non-dominant hemisferde 4-4.5 cm) rezeksiyonu; Labbé veninin korunması.',
      '5. Amigdalohipokampektomi (AH): Hipokampus ve amigdalanın çıkarılması; A. choroidea anterior, optik traktus ve beyin sapının korunması.',
      '6. Post-rezeksiyon Kontrol ECoG Kaydı: Rezeksiyon marjinlerinde rezidüel epileptik diken aktivitesi kalmadığının teyidi.',
      '7. Titiz Hemostaz, Dural Su Geçirmez Kapanış ve Kemik Flebinin Tespiti.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ EKSTÜBASYON (SMOOTH EMERGENCE): Ameliyat bitiminde öksürme, ıkınma ve arteriyel hipertansiyon temporal lob kavitesinde cerrahi alan hematomuna yol açar; bu durum herniasyon ve kalıcı nörolojik kayıp ile sonuçlanabilir! IV Lidokain (1.5 mg/kg) veya Remifentanil düşük doz infüzyon altında yumuşak ekstübasyon sağlanır.',
      'Normotansiyon Hedefi: Sistolik kan basıncı < 130-140 mmHg tutulur (Labetalol veya Esmolol ile regülasyon).',
      'Erken Nörolojik Değerlendirme: Hasta uyanır uyanmaz motor kuvvet, görme alanı kaba muayenesi ve konuşma/anlama fonksiyonları teyit edilir.',
      'Postoperatif Nöbet Alarmı: Uyanma esnasında nöbet gelişirse havayolu emniyeti alınır ve antiepileptik yükleme tedavisi başlatılır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - Cerrahi İnsizyon Hattına ve Çivi Giriş Yerlerine Preemptif Kafa Bloku / Lokal İnfiltrasyon (Bupivakain %0.25 + 1:200.000 Epinefrin): İlk 12-18 saatlik kraniyotomi ağrısını belirgin azaltır.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Oral / IV Tramadol veya kontrollü düşük doz Fentanil/Hidromorfon (aşırı sedasyon yaratmayacak ve nörolojik takibi maskelemeyecek düzeyde tutulur).',
      '  - Cerrahi hemostaz sağlandıktan ve intrakraniyel kanama ekarte edildikten sonra selektif NSAİİ eklenebilir.'
    ],
    prospectRecommendations: [
      'Kraniyotomi sonrası ağrı yönetiminde kafa bloku (skalp bloğu), preemptif lokal anestezik infiltrasyonu ve sistemik parasetamol kullanımı opioid gereksinimini ve postoperatif bulantı/kusmayı (POBK) anlamlı ölçüde azaltır.'
    ],
    erasRecommendations: [
      'ERAS Nöroşirürji ve Epilepsi Cerrahisi Kılavuzları:',
      '  - Antiepileptik İlaçların Kesintisiz Sürdürülmesi: Preoperatif tüm antiepileptik ilaçlar ameliyat sonrası erken dönemde oral veya IV eşdeğer dozlarda kesintisiz devam ettirilir.',
      '  - Erken Postoperatif Beyin BT Kontrolü: Rezeksiyon kavitesi hematomu, beyin ödemi veya pnömosefaliyi dışlamak için ilk 4-6 saat içinde kontrol tomografisi.',
      '  - Yoğun Bakım Takibi: İlk 24 saat Nöroşirürji Yoğun Bakım Ünitesinde saatlik nörolojik muayene, GKS ve pupilla takibi.',
      '  - Normotermi ve Enfeksiyon Kontrolü: Hipertermi nöbet eşiğini düşürdüğünden normotermi (36.5-37.2°C) titizlikle korunmalı, titreme engellenmelidir.',
      '  - Erken Oral Alım ve Postoperatif 1. Günde Kademeli Yatak Dışı Mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Epilepsy Surgery, pp. 492-498. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Epilepsy Surgery: Consensus Recommendations. Journal of Neurosurgery.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Craniotomy and Brain Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Engel, J., et al. (2012). Practice parameter: temporal lobectomy and infantile spasms: report of the American Academy of Neurology Quality Standards Subcommittee. Neurology, 60(4), 538-547.',
      'Kuruvilla, A., & Flink, R. (2018). Intraoperative Electrocorticography in Epilepsy Surgery: Technique, Principles, and Anesthetic Challenges. Clinical Neurophysiology, 129(4), 882-895.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Management of Patients Undergoing Epilepsy Surgery and Electrocorticography.',
      'Wieser, H. G., et al. (2001). ILAE Commission Report: Recommendations for the Subclassification of Outcome After Epilepsy Surgery. Epilepsia, 42(2), 282-286.'
    ]
  }
};
