import { ProcedureDefinition } from '../../types/procedures';

/**
 * Transsfenoidal Hipofiz Tümörü Rezeksiyonu (Endoskopik Endonazal Hipofiz Cerrahisi)
 * (Endoscopic Endonasal Transsphenoidal Resection of Pituitary Tumor / Adenoma)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Pituitary Surgery: Transsphenoidal Resection of Pituitary Tumor, pp. 427-433),
 * The Endocrine Society & Pituitary Society Kılavuzları,
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Kafa Tabanı Konsensus Raporları referans alınarak yapılandırılmıştır.
 */
export const transsphenoidalPituitaryResection: ProcedureDefinition = {
  id: 'transsphenoidal-pituitary-resection',
  name: 'Transsfenoidal Hipofiz Tümörü Rezeksiyonu (Endoskopik Endonazal Hipofiz Cerrahisi)',
  shortCode: 'TRANSSFENOİDAL-HİPOFİZ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Nöroendokrin & Kafa Tabanı Cerrahisi',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Sella tursika içerisine ve suprasellar/parasellar boşluğa uzanım gösteren hipofiz bezi adenomları, kraniofarenjiyomlar, Rathke kleft kistleri veya kordomaların; optik kiazma ve çevre nörovasküler yapılar korunarak endoskopik endonazal transsfenoidal yolla (burun deliklerinden sfenoid sinüse, oradan sella tabanına ulaşılarak) mikrocerrahi yöntemle kürete edilip çıkarılması ameliyatıdır. BOS kaçağı gelişen olgularda vaskülarize nazoseptal flep (Hadad flebi), otolog yağ veya fasya lata grefti ile sellar dural rekonstrüksiyon uygulanır.',
  indications: [
    'Non-Fonksiyone Hipofiz Makroadenomları (> 10 mm): Optik kiazmaya bası yaparak bitemporal hemianopsi (görme alanı kaybı), optik atrofi ve hipopitüitarizm tablosu oluşturan kitleler',
    'Fonksiyonel (Hormon Salgılayan) Hipofiz Adenomları:',
    '  - Cushing Hastalığı (ACTH salgılayan mikro/makroadenom): Hiperkortizolizm, kontrolsüz hipertansiyon, diyabet, santral obezite ve frajil vasküler doku',
    '  - Akromegali (GH / IGF-1 salgılayan adenom): Makroglossi, prognatizm, subglottik darlık ve şiddetli zor hava yolu, kardiyomiyopati ve uyku apnesi (OSA)',
    '  - Prolaktinoma (PRL salgılayan adenom): Dopamin agonisti (Kabergolin) medikal tedavisine dirençli, intolerans gelişen veya apopleksi riski taşıyan olgular',
    '  - TSH Salgılayan Adenomlar (Sekonder Hipertiroidizm): Tirotoksikoz kliniği oluşturan nadir adenomlar',
    'Hipofiz Apopleksisi (Akut İskemik/Hemorajik İnfarkt): Ani gelişen şiddetli baş ağrısı, akut görme kaybı, oftalmopleji ve akut adrenal kriz (panhipopitüitarizm) tablosu ile acil dekompresyon gerektiren durumlar',
    'Sellar / Suprasellar Diğer Lezyonlar: Semptomatik Rathke kleft kisti, Kraniofarenjiyom, Sfenoid Kordoma ve Tüberkülüm Sella Menenjiyomları'
  ],
  averageDuration: '2.5 - 4.5 saat (Anestezi indüksiyonu, zor hava yolu güvenliği [özellikle akromegali], A-line, başın Mayfield ile tespiti, nazal dekonjestan/kokain-epinefrin pamukların yerleşimi ve nöronavigasyon kaydı: 45-60 dk; Endonazal transsfenoidal koridor açılışı, sfenoidotomi ve sella tabanının açılması: 40-60 dk; Kapsül insizyonu, tümör içi küretaj, suprasellar tümörün Valsalva ile indirilmesi ve hemostaz: 45-90 dk; Sellar taban rekonstrüksiyonu, Hadad flebi serilmesi ve nazal tampon yerleşimi: 30-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 400 mL (Standart transsfenoidal adenom küretajında düşük-orta kanama; ancak sella tabanında Kavernöz Sinüs invazyonu veya sella lateral duvarındaki A. Carotis Interna [ICA] hasarında kan kaybı saniyeler içinde 1500 - 3000+ mL masif arteriyel fışkırmaya dönüşebilir!)',
    riskLevel: 'high',
    riskLevelLabel: 'Orta Düzey / Kavernöz Sinüs ve Karotid Arter Laserasyonunda Masif Kanama Riski',
    crossMatchRequirement: 'En az 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalı, T&S doğrulanmalı; dev invaziv adenomlarda 4 Ünite ES ve Masif Transfüzyon hazır bekletilmelidir',
    transfusionProbability: '%10 - %25 (Standart olguda <%10; kavernöz sinüs invazyonunda %30-50)',
    criticalBleedingSources: [
      'A. Carotis Interna (ICA - Kavernöz Segment): Sella tursikanın lateral sınırını oluşturur; cerrahi kuret veya mikromakas ile yırtılması transsfenoidal cerrahinin EN ÖLÜMCÜL KATASTROFİSİDİR (yüksek debili fışkıran arteriyel kanama!)',
      'Kavernöz Sinüs ve İntersirküler Sinüsler (Sella tabanı dural açılışında masif venöz göllenme)',
      'Nazal Mukoza ve Sfenoid Sinüs Damarları (A. sphenopalatina ve septal dallar)',
      'Tümör Lojundaki Frajil Neovasküler Yatak'
    ],
    hemostasisStrategies: [
      'Topikal hemostatik ajanlar: Surgicel, Gelfoam trombin matriksi, FloSeal ve pamuk kompresyonu',
      'Kavernöz sinus sızıntılarında hemostatik matriks ile nazik tamponaj',
      'İntraoperatif ICA Yırtılması Yönetimi: Cerrahi sellar kompresyon (kas/fasya grefti ile sıkı tamponaj), eşzamanlı anestezi masif resüsitasyonu (MTP 1:1:1), acil endotravasküler stent/koilleme için anjiyografi laboratuvarına transfer',
      'Sellar tabanın otolog yağ ve nazoseptal vaskülarize flep (Hadad-Bassagasteguy flebi) ile su sızdırmaz kapatılması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Sevofluran (< 0.5 MAC): İntraoperatif hemodinamik stabilite sağlar, cerrahi alan kanamasını azaltır ve pürüzsüz uyanma kolaylığı sunar'
    ],
    alternative: [
      'Dengeli İnhalasyon Anestezisi (Sevofluran / Desfluran + Remifentanil İnfüzyonu)'
    ],
    clinicalRationale: 'Transsfenoidal cerrahide mukozal kanamayı azaltan hemodinamik kontrol ve suprasellar tümörü indirmek için kontrollü Valsalva manevralarına olanak tanıyan TIVA (veya <0.5 MAC Sevofluran) altın standarttır. Endonazal cerrahi sahadan kaçacak kanın aspirasyonunu önlemek ve akromegalideki zor hava yolunu güvenceye almak için sol ağız köşesine tespitli spiral/Güney RAE ETT ve farengeal tampon kullanımı şarttır.',
    notes: 'TRANSSFENOİDAL CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ DİREĞİ: (1) HAVA YOLU KRİZİ — Akromegali hastalarında makroglossi, prognatizm, laringeal hipertrofi ve daralmış glottis nedeniyle ŞİDDETLİ ZOR HAVA YOLU mevcuttur; videolaringoskop/fiberoptik ve 0.5-1.0 numara küçük ETT hazır tutulmalıdır! (2) NAZAL DEKONJESTAN / EPİNEFRİN TOKSİSİTESİ — Cerrah mukozaya adrenalinli lokal anestezik (1:100.000 veya 1:200.000) enjekte ettiğinde masif sempatik fırlama (hipertansiyon, taşikardi, ventriküler aritmi) gelişebilir; anestezi derinliği artırılmalı ve Esmolol hazır olmalıdır, (3) SUPRASELLAR TÜMÖRÜN İNDİRİLMESİ İÇİN VALSALVA — Kraniyotomilerin aksine burada beynin aşırı gevşetilmesi İSTENMEZ! Suprasellar tümörün kiazmadan ayrılıp sellaya düşmesi için cerrahın talebiyle 20-30 cmH2O pozitif inspirasyon basıncı uygulanır, (4) BOĞAZ TAMPONU (THROAT PACK) KURALI — Nazofarenksten mideye ve trakeaya kan akmasını önlemek için yerleştirilen farengeal tampon ekstübasyondan önce KESİNLİKLE ÇIKARILMALIDIR! (5) DİYABETES İNSİPİDUS (DI) VE KORTİZOL TAKİBİ — Arka hipofiz manipülasyonu saatlik > 300 mL/saat masif poliüri (DI) yaratabilir; idrar takibi ve intraoperatif stres dozu steroid (Hidrokortizon) esastır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Endokrinoloji Konsültasyonu: Hipofiz hormon paneli (Bazal ACTH, Kortizol, GH, IGF-1, Prolaktin, TSH, Serbest T4, LH, FSH); panhipopitüitarizm varlığında preoperatif hormon replasmanı (Levotiroksin ve Hidrokortizon) doğrulanmalıdır.',
      'Endokrin Spesifik Risk Yönetimi:',
      '  - Cushing Hastalığı: Ağır hipertansiyon, hiperglisemi kontrolü ve derin ven trombozu (DVT) profilaksisi.',
      '  - Akromegali: Ekokardiyografi (akromegalik kardiyomiyopati, sol ventrikül hipertrofisi), polisomnografi (ağır obstrüktif uyku apnesi - OSA) ve zor hava yolu planlaması.',
      'Göz Hastalıkları Konsültasyonu: Görme keskinliği ve Görme Alanı (Perimetri - bitemporal hemianopsi derecesi kaydedilmelidir).',
      'Nöroradyoloji / Nöroşirürji: Kontrastlı Dinamik Hipofiz MRG; sellar taban kemik erozyonu, suprasellar optik kiazma basısı ve Kavernöz Karotid Arterler arası interkarotid mesafe (dar interkarotid mesafe cerrahi karotid laserasyon riskini katlar!).'
    ],
    historyAndPhysical: [
      'Zor Hava Yolu Taraması: Akromegalik yüz hatları, genişlemiş dil (makroglossi), alt çene protrüzyonu, Mallampati Sınıf III-IV, horlama ve gündüz aşırı uykululuk (OSA öyküsü).',
      'Endokrin Belirti ve Semptomlar: Galaktore, amenore, libido kaybı (Prolaktinoma); aydede yüzü, bufalo hörgücü, mor strialar (Cushing); el-ayak büyümesi, ayakkabı numarasında artış (Akromegali).',
      'Kardiyovasküler Durum: Hipofizer tümörlerde kontrolsüz hipertansiyon ve aritmi öyküsü.',
      'Görme Muayenesi: Hasta preop parmak sayma ve periferik görme alanını kendisi tarif edebilmelidir (postop erken cerrahi başarı/komplikasyon kontrolü için).'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve 2 Ünite ES Cross-Match doğrulaması.',
      'Serum Elektrolitleri: Özellikle bazal Sodyum (Na+), Potasyum ve Serum Osmolaritesi (postoperatif Diyabetes İnsipidus / SIADH ayrımında bazal değer hayatidir).',
      'Kan Glukozu, HbA1c, Tam Kan Sayımı ve Koagülasyon Paneli.',
      'Endokrin Hormon Düzeyleri (özellikle sabah 08:00 açlık kortizol ve ACTH düzeyi).',
      'Nöronavigasyon Endoskopik BT/MR Verilerinin Yüklenmesi.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp Seviyesinde Sıfırlanmış: İndüksiyon öncesi yerleştirilmelidir. Nazal adrenalin enjeksiyonundaki sempatik pikleri, karotid arter komşuluğundaki hemodinamik stabiliteleri ve kan gazı/elektrolit serilerini izlemek için zorunludur.',
      'Saatlik İdrar Çıkışı Takibi (Isı Problu Foley Kateter): Diyabetes İnsipidus (DI) erken tespiti için; ardışık 2 saat boyunca > 4 mL/kg/saat veya > 250-300 mL/saat berrak poliüri gelişirse derhal idrar dansitesi ve kan sodyumu bakılmalıdır!',
      'Sürekli End-Tidal CO2 (EtCO2): Hedef NORMOKAPNİ (PaCO2 35 - 40 mmHg); hiperventilasyondan kaçınılır (beyin aşırı büzüşürse suprasellar tümör kiazmaya yapışır ve sellaya inmez).',
      'Anestezi Derinliği İzlemi: BIS (40 - 50 aralığında tutulur).',
      'Sürekli Isı Takibi (Normotermi 36.0 - 37.0°C).',
      'Train-of-Four (TOF) Nöromusküler Monitörizasyon.'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz hat (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Cushing hastalığı olan obez olgularda veya karotid arter yaralanması riski yüksek invaziv dev adenomlarda'
    ],
    patientPosition: 'Supin Pozisyon, Baş 15° Elevasyonda ve Cerrahın Konforu İçin Sağa 10-15° Hafif Çevrilmiş (Mayfield 3-Noktalı Çivili Başlık ile Sabitlenmiş)',
    patientPositionDetails: [
      'Gövde 15-20° hafif baş yukarı (Reverse Trendelenburg) pozisyona alınarak nazal venöz göllenme ve mukozal kanama azaltılır.',
      'Nöronavigasyon referans çerçevesi başa rijit şekilde kilitlenir.',
      'Endoskopik ekibin monitör görüş alanını rahatlatmak için hasta anestezi cihazından hafif uzaklaştırılır; solunum devreleri ve endotrakeal tüp uzatma hortumlarıyla güvene alınır.',
      'Gözler koruyucu göz merhemiyle kapatılır; endoskopik manipülasyon esnasında göz kürelerine dış bası yapılmadığı sürekli kontrol edilir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 - 1.0 mg/kg). Akromegalik olgularda Zor Hava Yolu Arabası ve Videolaringoskop (McGrath/Glidescope) hazır bekletilir.',
      'İdame: TIVA (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.25 mcg/kg/dk TCI infüzyonu) veya Düşük Doz Sevofluran (< 0.5 MAC).',
      'Lokal Mukozal Adrenalin Enjeksiyonu Reaksiyonu:',
      '  - Cerrahi başlangıçta nazal mukozaya yapılan epinefrinli solüsyon (1:100.000 veya 1:200.000) masif kan basıncı fırlaması ve taşikardi yapabilir.',
      '  - Müdahale: Anestezi derinliği geçici artırılır, gerekirse Esmolol (0.5 mg/kg IV bolus) ile hız ve tansiyon dizginlenir; aritmi takibi yapılır.',
      'Suprasellar Tümörün İndirilmesi (Valsalva Manevrası):',
      '  - Kraniyotomilerin aksine hipofiz cerrahisinde Mannitol veya hiperventilasyon İSTENMEZ!',
      '  - Cerrah intrasellar kitleyi temizledikten sonra yukarıda kalan suprasellar kapsülü aşağı çekmek için anestezi ekibinden solunum devresinde 20 - 30 cmH2O pozitif basınç (Valsalva) uygulamasını ister; artan venöz basınç tümör kapsülünü sellaya iter.',
      'Stres Dozu Glukokortikoid Replasmanı:',
      '  - Ameliyat esnasında hipofiz bezi manipülasyonu akut adrenal krizi tetikleyebileceğinden Hidrokortizon (50 - 100 mg IV bolus) uygulanır.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) veya Güney RAE Endotrakeal Tüp:',
      '  - Tüp cerrahın endonazal girişini engellemeyecek şekilde sol ağız köşesine sağlam bantlanır.',
      '  - Akromegali hastalarında larinks ödemli ve dar olduğundan standart tüpten 1 numara küçük ETT (kadınlarda 6.5, erkeklerde 7.0) tercih edilir.',
      'Farengeal Boğaz Tamponu (Throat Pack):',
      '  - Nazal cerrahi boyunca arkaya sızan kan ve kemik tozunun mideye dolmasını ve aspirasyonunu önlemek için orofarenkse ıslak gaz tampon yerleştirilir.',
      '  - HAYATİ GÜVENLİK KURALI: Tamponun takıldığı ameliyat tahtasına ve anestezi formuna BÜYÜK HARFLERLE yazılır; EKSTÜBASYONDAN ÖNCE KESİNLİKLE ÇIKARILMALIDIR!',
      'Mide Dekompresyonu: Cerrahi bitiminde laringoskop görüşü altında ağızdan Orogastrik Tüp (OGT) sokularak mide içeriği aspire edilir.'
    ],
    criticalSurgicalStages: [
      '1. Nazal Mukozal İnfiltrasyon (Kokain/Epinefrin): Masif sempatik yanıt, hipertansiyon ve aritmi kontrolü.',
      '2. Sfenoidotomi ve Sella Tabanının Tur ile Açılması: Kemik tozu aspirasyonu, vaskülarize Hadad flebinin hazırlanması.',
      '3. Dural Açılış ve Tümör Küretajı: Kavernöz sinüs kanamaları ve A. Carotis Interna (ICA) sınırlarının Doppler ile teyidi.',
      '4. Suprasellar Tümörün İnmesi İçin Valsalva Uygulanması: Anestezi uzmanı hava yolu basıncını 20-30 cmH2O seviyesine çıkarır.',
      '5. Sellar Rekonstrüksiyon ve Hadad Flebinin Serilmesi: BOS kaçağı varlığında otolog yağ grefti ve nazoseptal flep ile dural kapatma.',
      '6. Nazal Tamponların Yerleştirilmesi: Bilateral burun tamponu konulduğunda hastanın uyanınca sadece ağızdan nefes alabileceği anestezi ekibince bilinmelidir.'
    ],
    emergenceNotes: [
      'BOĞAZ TAMPONUNUN (THROAT PACK) ÇIKARILMASI ZORUNLUDUR: Ekstübasyon öncesi farengeal tamponun çıkarıldığı anestezi uzmanı ve cerrah tarafından sesli olarak doğrulanır!',
      'ÖKSÜRMESİZ VE IKINMASIZ PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE): Ikınma ve öksürme sella tabanındaki nazoseptal flebi fırlatır ve masif BOS fistülüne yol açar; IV Lidokain (1.5 mg/kg) ve Esmolol ile öksürük refleksi köreltilmelidir.',
      'Ağızdan Solunum Hazırlığı: Burun delikleri tamponla tamamen tıkalı olacağından hasta uyanırken panikleyebilir; preoperatif hastaya burnunun tıkalı olacağı anlatılmış olmalı, uyanırken ağızdan nefes alması sakinleştirici telkinlerle desteklenmelidir.',
      'Postoperatif Görme Muayenesi: Hasta uyanır uyanmaz ameliyathanede parmak sayma ve ışık refleksi değerlendirilir; akut görme kaybı sella lojunda hematom göstergesidir ve acil revizyon gerektirir!'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Transsfenoidal Cerrahi Sonrası Ağrı Profili:',
      '  - Ağrı kraniyotomilere göre genellikle daha hafiftir; baş ağrısı ve burun tıkanıklığı/sinüs dolgunluğu hissi ön plandadır.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir).',
      '  - Selektif NSAİİ (Deksketoprofen 50 mg IV): Cerrahi hemostaz teyit edildiyse.',
      '  - Düşük doz Tramadol (50 mg) kurtarma analjeziği olarak; sedasyonun bilinç takibini gölgelememesi esastır.'
    ],
    prospectRecommendations: [
      'Endonazal kafa tabanı cerrahisinde rutin multimodal non-opioid analjezi ve cerrahi sahaya lokal anestezik infiltrasyonu erken postoperatif analjezi için önerilmektedir.'
    ],
    erasRecommendations: [
      'ERAS Nöroşirürji ve Kafa Tabanı Kılavuzları:',
      '  - Diyabetes İnsipidus (DI) Taraması: İlk 24-48 saatte saatlik idrar takibi; idrar çıkışı > 300 mL/saat (2 ardışık saat) ve idrar dansitesi < 1.005 ise Desmopressin (DDAVP 1 - 2 mcg IV/SC) başlanması ve serum sodyum takibi.',
      '  - BOS Kaçağını Önleme: Yatak başı sürekli 30° dik tutulmalı; sümkürme, burnu çekme, pipet kullanma ve ıkınma kesinlikle yasaklanmalı, laksatif başlanmalıdır.',
      '  - Glukokortikoid İdamesi: Preop hipokortizolemik olgularda postop Hidrokortizon dozu titre edilmeli, sabah 08:00 açlık kortizolü ölçülmelidir.',
      '  - Bulantı/Kusma Önlemi (PONV): Mideye sızan kan bulantıyı tetikleyebileceğinden Deksametazon + Ondansetron ikili profilaksisi sürdürülmelidir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Pituitary Surgery: Transsphenoidal Resection of Pituitary Tumor (pp. 427-433). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Endoscopic Pituitary and Endonasal Cranial Base Surgery: Consensus Guidelines. Journal of Neurosurgery, 134(3), 781-791.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Endonasal Skull Base Approaches. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Katznelson, L., et al. (2014). Acromegaly: an endocrine society clinical practice guideline. The Journal of Clinical Endocrinology & Metabolism, 99(11), 3933-3951.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Perioperative Management of Patients Undergoing Transsphenoidal Pituitary Surgery.',
      'Nemergut, E. C., et al. (2007). Perioperative management of patients with pituitary tumors. Anesthesia & Analgesia, 105(5), 1400-1413.'
    ]
  }
};
