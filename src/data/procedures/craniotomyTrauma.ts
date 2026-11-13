import { ProcedureDefinition } from '../../types/procedures';

/**
 * Acil Kraniyotomi ve Kraniektomi: Akut Kafa Travması Cerrahisi (Epidural, Subdural Hematom ve Dekompresyon)
 * (Emergency Craniotomy & Decompressive Craniectomy for Traumatic Brain Injury - TBI)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Trauma: Craniotomy for Trauma, pp. 433-439),
 * Brain Trauma Foundation (BTF 4th ed.) Şiddetli Travmatik Beyin Hasarı Yönetim Kılavuzu,
 * ATLS (Advanced Trauma Life Support 10th ed.), ERC/AHA ve ERAS Nöroşirürji
 * konsensus raporları referans alınarak yapılandırılmıştır.
 */
export const craniotomyTrauma: ProcedureDefinition = {
  id: 'craniotomy-trauma',
  name: 'Acil Kraniyotomi ve Kraniektomi: Akut Kafa Travması Cerrahisi (Epidural, Subdural Hematom ve Dekompresyon)',
  shortCode: 'NÖROTRAVMA-KRANİO',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Nörotravma & Acil Cerrahi',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Künt veya penetran kafa travması sonrasında gelişen akut intrakraniyel yer kaplayıcı hematomların (akut epidural, akut subdural ve travmatik intraserebral hematomlar), çöken kafatası kırıklarının ve refrakter kafa içi basınç artışının (KİBAS) acil cerrahi boşaltımı ile serebral herniasyonun (uncal/subfalcine) önlenmesi ameliyatıdır. Olguların patolojisine göre osteoplastik kraniyotomi (kemik flebin yerine konulması) veya beyin ödeminin şiddetli olduğu olgularda intrakraniyel basıncı düşürmek amacıyla geniş dekompresif hemikraniektomi (kemik flebin batına/doku bankasına saklanarak duraplasti yapılması) uygulanır.',
  indications: [
    'Akut Epidural Hematom (EDH): A. meningea media laserasyonu veya kemik fraktürü kaynaklı, hematom hacmi > 30 mL olan veya kalınlığı > 15 mm ya da orta hat şifti > 5 mm olan ve GKS < 9 / anizokorik pupil gelişen olgular (hızlı "lusid interval" sonrası bilinç kaybı)',
    'Akut Subdural Hematom (ASDH): Kortikal köprü venlerinin veya parankimal laserasyonların yırtılmasına bağlı, hematom kalınlığı > 10 mm veya orta hat şifti > 5 mm olan, ya da tabaka hematom olsa bile GKS skoru düşen ve pupil asimetrisi gösteren acil vakalar',
    'Travmatik İntraserebral Hematom (İHK) ve Parankimal Kontüzyonlar: Kitle etkisi yaratan, frontal/temporal lob herniasyon tehdidi oluşturan ve medikal tedaviye dirençli KİBAS oluşturan lezyonlar',
    'Refrakter İntrakraniyel Hipertansiyon (Dekompresif Hemikraniektomi): Maksimal medikal tedaviye (sedasyon, ozmotik terapi, hiperventilasyon) rağmen ICP > 20-25 mmHg üzerinde seyreden difüz aksonal yaralanma ve malign beyin ödemi olguları',
    'Çökme (Deprese) Kafatası Kırıkları: Kemik fraktür derinliği kafatası kalınlığını aşan, dural yırtılma, parankim basısı veya açık enfeksiyon riski taşıyan travmalar'
  ],
  averageDuration: '2.0 - 4.5 saat (Acil hasta karşılama, hemodinamik resüsitasyon, hızlı seri indüksiyon [RSI] ve boyunlukla stabilizasyon: 20-30 dk; Cilt insizyonu, geniş travma soru işareti [Trauma Question Mark] flebi, acil burr-hole ile dekompresyon ve geniş kraniyotomi/hemikraniektomi: 30-45 dk; Hematomun aspirasyonu, aktif arteriyel/venöz kanama odaklarının mikrocerrahi hemostazı: 45-90 dk; Genişletme duraplastisi [fascia lata veya sentetik dural greft], titiz hemostaz, ICP monitörü / EVD yerleşimi ve cilt kapanışı: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '400 - 1500 mL (İzole epidural hematomda 300-600 mL; ancak dural venöz sinüs yırtığı, yaygın kortikal laserasyon, skalp avülsiyonu ve Travmaya Bağlı Koagülopati [TIC] eşlik eden olgularda kan kaybı hızla 2000 - 3500+ mL masif kanamaya dönüşebilir)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama ve Travma Koagülopatisi',
    crossMatchRequirement: 'Acil Koşullarda: 0 Negatif / Çapraz Karşılaştırmasız (Uncrossed) Acil Kan derhal hazır bulundurulmalı; eşzamanlı en az 4-6 Ünite Eritrosit Süspansiyonu (ES), 4 Ünite TDP ve 1 Aferez Trombosit Cross-Match gönderilmeli ve Masif Transfüzyon Protokolü (MTP - 1:1:1) aktif edilmelidir',
    transfusionProbability: '%50 - %80 (Şiddetli kafa travmalı ve politravmalı olgularda %75-90)',
    criticalBleedingSources: [
      'A. Meningea Media ve Dural Dallarının Yırtılması (Epidural Hematomun klasik yüksek debili arteriyel kaynağı)',
      'Dural Venöz Sinüs Laserasyonları (Sinüs Sagittalis Superior, Sinüs Transversus ve Torcula Herophili yırtıkları — katastrofik venöz kanama ve masif Venöz Hava Embolisi [VAE] riski)',
      'Kortikal Köprü Venleri ve Serebral Parankimal Yırtılmalar (Subdural hematom yatağı)',
      'Geniş Skalp Laserasyonları ve Galea Altı Masif Hematomlar (Skalp aşırı vaskülerdir; dekompresyon insizyonunda hızla hipovolemi yaratabilir)',
      'Travmaya Bağlı Koagülopati (TIC) ve Tüketim Koagülopatisi (DIC): Doku faktörünün kana karışması ve hipotermi/asidoz ile koagülasyon kaskatının çökmesi'
    ],
    hemostasisStrategies: [
      'Masif Transfüzyon Protokolü (MTP 1:1:1 Dengeli Plazma:Trombosit:ES transfüzyonu) ve Hızlı Kan Isıtıcı/İnfüzyon Cihazı (Belmont / Level 1) kullanımı',
      'Antikoagülan / Antiagregan Hızlı Geri Çevirme (Reversal): Warfarin için Protrombin Kompleks Konsantresi (PCC 25-50 IU/kg) + K Vitamini; Dabigatran için İdarusizumab (Praxbind); Faktör Xa inhibitörleri için Andexanet Alfa veya 4-faktör PCC; Trombosit disfonksiyonunda Trombosit Süspansiyonu ve DDAVP (0.3 mcg/kg)',
      'Traneksamik Asit (TXA): Travmanın ilk 3 saati içinde başvuran hafif-orta TBI olgularında 1 g IV bolus (10 dk) ardından 1 g IV 8 saat infüzyon (CRASH-3 protokolü); izole şiddetli TBI olgularında cerrahi hemostazla birlikte değerlendirilir',
      'Cerrahi Hemostaz: Bipolar mikronöroşirürji, dural askı dikişleri (kemik kenarından epidural sızıntıyı önlemek için tenting sutures), kemik mumu (Bone Wax), FloSeal / Fibrin yapıştırıcı matriksler',
      'Dural Sinüs Yırtığında: Baş elevasyonunun azaltılması (hava embolisini önlemek için cerrahi alan ıslak tutulur), doğrudan sinüs sütürü veya kas/fasya grefti ile kompresyon'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Anestezi + Hızlı Seri İndüksiyon (RSI) ve Manuel Hat İçi Servikal Stabilizasyon (MILS): Tüm travma hastaları aksi kanıtlanana kadar TOK (dolu mide) ve SERVİKAL TRAVMALI kabul edilir; krikoid bası veya videolaringoskop eşliğinde başa fleksiyon/ekstansiyon verilmeden entübasyon zorunludur',
      'Endotrakeal Genel Anestezi (GETA) — TIVA (Propofol/Ketamin + Fentanil) veya Düşük Doz Sevofluran (< 0.5 MAC)'
    ],
    alternative: [
      'Saf TIVA (Propofol + Remifentanil Hedef Kontrollü İnfüzyon): Hemodinamik olarak resüsite edilmiş, stabil olgularda serebral metabolizma (CMRO2) ve intrakraniyel basıncı (ICP) düşürmek için'
    ],
    clinicalRationale: 'Akut kafa travmalı hastalar aksi kanıtlanana kadar dolu mide ve servikal omurga yaralanmalı kabul edildiğinden, aspirasyonu ve sekonder kord hasarını önlemek için Manuel Hat İçi Stabilizasyon (MILS) altında Hızlı Seri İndüksiyon (RSI) ile videolaringoskopik entübasyon zorunludur. Serebral perfüzyonu bozmadan CMRO2\'yi düşürmek ve normokapniyi (PaCO2 35-38 mmHg) kesin kontrol etmek için TIVA veya düşük doz Sevofluran (<0.5 MAC) ile kontrollü ventilasyon altın standarttır.',
    notes: 'NÖROTRAVMA ANESTEZİSİNİN 5 ÖLÜMCÜL KURALI: (1) HİPOTANSİYONDAN KESİNLİKLE KAÇINMAK — Sistolik kan basıncının < 100 mmHg altına (veya MAP < 80 mmHg) tek bir kez bile düşmesi travmatik beyin hasarında MORTALİTEYİ İKİYE KATLAR! Hedef: SBP ≥ 100-110 mmHg, MAP ≥ 80-90 mmHg, CPP ≥ 60-70 mmHg. (2) HİPOKSİYİ ÖNLEMEK — SpO2 < %90 veya PaO2 < 60 mmHg mortaliteyi ikiye katlar; hedef PaO2 80-120 mmHg, SpO2 ≥ %95. (3) AŞIRI HİPERVENTİLASYONDAN KAÇINMAK — İlk 24 saatte serebral kan akımı (CBF) zaten yarıya inmiştir; PaCO2 < 30 mmHg derin iskemiye yol açar; PaCO2 hedefi 35-38 mmHg (Normokapni) olmalı, sadece akut herniasyonda geçici 30-32 mmHg uygulanmalıdır. (4) SERVİKAL OMURGA İMMOBİLİZASYONU — Boyunluk çıkarılsa bile MILS ile eksenel hat korunmalıdır. (5) KEMİK VE DURA AÇILDIĞINDA ANİ TAMPONAD KALKMASINA HAZIRLIK — Hematom boşaltılırken kontralateral hematom gelişimi veya ani vazodilatasyon/hipotansiyona karşı vazopressör hazır olmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Acil Nöroşirürji Değerlendirmesi: Kranial BT bulguları; hematom lokalizasyonu ve hacmi, orta hat şifti (> 5 mm kritik), bazal sisternaların açıklığı (effacement), kontüzyon odakları ve kafatası fraktür hatları incelenmelidir.',
      'Travma Ekibi / Genel Cerrahi & Ortopedi Konsültasyonu: Politravma varlığı; eşlik eden hemotoraks, intraabdominal kanama (FAST ultrason ile serbest sıvı tespiti) ve pelvik/femur kırıkları hızla taranmalıdır (kafa içi cerrahi sırasında masif batın içi şok gelişebilir!).',
      'Kan Bankası / Transfüzyon Merkezi: Acil Masif Transfüzyon Protokolünün (MTP) derhal devreye sokulması.'
    ],
    historyAndPhysical: [
      'GCS ve Nörolojik Durum: Travma anındaki ve ameliyathaneye girişteki Glasgow Koma Skoru (GKS), pupil çapları ve ışık refleksleri (anizokori, tek taraflı fiks dilate pupil = uncal herniasyon / acil dekompresyon alarmı).',
      'Travma Mekanizması ve Zamanı: Yüksekten düşme, araç içi/dışı trafik kazası, ateşli silah veya darp; travmadan bu yana geçen süre (lusid interval sorgusu).',
      'Mide Doluluğu: Tüm travma olguları "TAM DOLU MİDE" kabul edilir; aspirasyon riski maksimumdur.',
      'Antikoagülan / Antiagregan Anamnezi: Yaşlı hastalarda Aspirin, Klopidogrel, Warfarin veya YOA (Yeni Oral Antikoagülan - Apiksaban, Rivaroksaban, Dabigatran) kullanımı derhal sorgulanmalı ve tersine çevirme ajanı hazırlanmalıdır.',
      'Servikal Omurga Durumu: Aksi radyolojik olarak kanıtlanana kadar tüm kafa travmalarında instabil servikal fraktür varsayılır; boyunluk veya MILS korunmalıdır.'
    ],
    laboratoryAndTests: [
      'Acil Kan Grubu ve Cross-Match (0 Negatif acil kan ayrılması).',
      'Hemoglobin / Hematokrit, Trombosit Sayımı, Kan Gazı (Laktat ve Baz Açığı — şokun derinliğini gösterir).',
      'Koagülasyon Paneli: PT/INR, aPTT, Fibrinojen düzeyi (Fibrinojen < 150-200 mg/dL ise kriyopresipitat veya fibrinojen konsantresi endikedir) ve varsa ROTEM / TEG (Tromboelastometri).',
      'Serum Elektrolitleri: Sodyum (Na+), Potasyum (K+), Kalsiyum (iyonize Ca2+ — masif transfüzyonda sitrat toksisitesini önlemek için > 1.1 mmol/L tutulmalıdır).',
      'Alkol ve Toksikoloji Taraması (bilinç baskılanmasında kafa travması ile toksik etki ayrımı için).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp ve Foramen Monro (Tragus) Seviyesinde Sıfırlanmış: İdeal olarak indüksiyon öncesi, vaka çok acilse indüksiyonla eşzamanlı takılmalıdır. Serebral Perfüzyon Basıncını (CPP = MAP - ICP) 60-70 mmHg üzerinde tutmak ve ani dekompresyon hipotansiyonunu anında yakalamak için zorunludur.',
      'Sürekli End-Tidal CO2 (EtCO2) ve Sık Seri Kan Gazı (ABG): PaCO2 hedefi 35 - 38 mmHg (Normokapni); ani KİBAS fıtıklaşmasında kemik flep kalkana kadar 30 - 32 mmHg geçici hiperventilasyon.',
      'Geniş Santral Venöz Kateter (CVC) / Hızlı İnfüzyon Kateteri (MAC kateter / 8.5 Fr): Masif transfüzyon ve vazopressör (Noradrenalin) titrasyonu için.',
      'Isı Problu Foley İdrar Sondası: Ozmotik diürez takibi ve mesane rüptürü kontrolü.',
      'Sürekli Isı Monitörizasyonu: Isıtıcı battaniyeler ve sıvı ısıtıcıları ile hipoterminin önlenmesi (hedef 36.0 - 37.0°C; hipotermi < 35°C koagülopatiyi ve mortaliteyi fırlatır!).',
      'İntraoperatif / Postoperatif İntrakraniyel Basınç (ICP) Monitörizasyonu: Parankimal ICP probu veya Eksternal Ventriküler Drenaj (EVD) yerleşimi.'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı periferik intravenöz damar yolu (14G veya 16G)',
      'Büyük Lümenli Santral Venöz Erişim (8.5 Fr Hızlı İnfüzyon Kateteri [MAC] veya 3 lümenli CVC)',
      'Hızlı Sıvı/Kan İnfüzyon Sistemi (Level 1 / Belmont Rapid Infuser) ameliyathanede hazır ve prime edilmiş olmalıdır'
    ],
    patientPosition: 'Supin Pozisyon, Baş 20 - 30° Hafif Gövde Elevasyonunda (Boyunluk veya Servikal Destek ile Eksenel Nötralde Tutulmuş)',
    patientPositionDetails: [
      'Mayfield Çivili Başlık KONTRENDİKE OLABİLİR: Kafatasında parçalı fraktürler, açık çökme kırıkları veya pediatrik olgularda çivili başlık yerine kafatası jel halka (horseshoe headrest) üzerine yerleştirilir.',
      'Servikal Korumalı Baş Rotasyonu: Hematom tarafına ulaşmak için baş hafif karşı tarafa çevrilir; ancak juguler ven basısını önlemek için aşırı rotasyondan kaçınılmalı, omuz altına destek rulo konularak gövdeyle birlikte çevrilmelidir.',
      'Çene ile sternum arasında en az 2 parmak mesafe bırakılmalı, internal juguler venöz dönüş asla kısıtlanmamalıdır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Hemodinamik instabilitesi olan travma hastalarında Etomidat (0.2 - 0.3 mg/kg) veya Ketamin (1.5 - 2.0 mg/kg) + Fentanil (2 - 3 mcg/kg) + Rokuronyum (1.0 - 1.2 mg/kg RSI dozu). Propofolden derin hipotansiyon yaratabileceği için şoktaki politravma hastalarında kaçınılmalıdır.',
      'İdame: TIVA (Düşük doz Propofol infüzyonu + Remifentanil) veya Düşük Doz Sevofluran (< 0.5 MAC). Nöromusküler blokaj idame ettirilir (cerrah kemik kaldırırken ve dura açarken hastanın öksürmesi veya ıkınması herniasyona yol açar!).',
      'CPP ve Kan Basıncı Hedefleri:',
      '  - Serebral Perfüzyon Basıncı (CPP = MAP - ICP) kesinlikle ≥ 60 - 70 mmHg tutulmalıdır.',
      '  - Sistolik Kan Basıncı: 15-49 yaş ve >70 yaş hastalarda SBP ≥ 110 mmHg; 50-69 yaş hastalarda SBP ≥ 100 mmHg olmalıdır (BTF Kılavuzları).',
      '  - Hipotansiyon gelişiminde beklemeden Noradrenalin infüzyonu ve kristalloid/kan resüsitasyonu başlanmalıdır.',
      'Beyin Ödemi ve KİBAS Acil Müdahalesi:',
      '  - Ozmotik Tedavi: %3 Hipertonik Salin (2 - 3 mL/kg IV bolus 15-20 dakikada) veya %20 Mannitol (0.5 - 1.0 g/kg). Hipovolemik veya politravmalı hipotansif olgularda Mannitol dehidratasyon ve şoku derinleştireceğinden HİPERTONİK SALİN İLK TERCİHTİR!',
      '  - Ventilasyon: PaCO2 35 - 38 mmHg tutulur. Akut herniasyon anında (tek taraflı midriyatik pupil) kemik flep kalkana kadar geçici 30 - 32 mmHg hiperventilasyon uygulanabilir.',
      '  - Sıvı Yönetimi: Hipo-ozmolar sıvılardan (%5 Dekstroz, Ringer Laktat) kesinlikle kaçınılmalı; izotonik %0.9 NaCl veya Plasmalyte verilmelidir.'
    ],
    airwayManagement: [
      'Manuel Hat İçi Eksenel Stabilizasyon (MILS) ile Hızlı Seri İndüksiyon (RSI): Servikal boyunluğun ön kapağı açılır, bir asistan başı ve boynu nötralde iki eliyle sabitler (traksiyon yapmadan, sadece fleksiyon/ekstansiyonu engelleyerek).',
      'Videolaringoskop (Glidescope / McGrath) İlk Tercihtir: Başa pozisyon vermeden glottik açıklığı doğrudan görerek atravmatik entübasyon sağlar.',
      'Aspirasyon Hazırlığı: Çift geniş lümenli sert Yankauer aspiratör başucunda hazır ve çalışır olmalıdır.',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Acil Burr-Hole (Trepanasyon): Ameliyathaneye girer girmez herniasyonu kırmak için hızla burr-hole açılıp hematom dekomprese edilebilir.',
      '2. Kemik Flebinin Kaldırılması: Epidural hematom yatağından masif arteryel fışkırma başlayabilir; cerrah hızla pıhtıları aspire eder ve A. meningea media\'yı bipolarla koagüle eder veya kemik foramenine mum basar.',
      '3. Dura Açılışı ve Dekompresyon (Kritik Reperfüzyon Fazı): Dura açıldığı anda intrakraniyel basınç aniden düşer. Bu fazda 3 kritik risk mevcuttur:',
      '   a) Akut Hipotansiyon: İntrakraniyel sempatik baskı aniden kalktığında sistemik vazodilatasyon ve tansiyon çöküşü gelişebilir; vazopressör hazır olmalıdır.',
      '   b) Malign Beyin Şişmesi (Bulging Brain): Dura açılır açılmaz beyin parankimi kemik sınırından dışarı fıtıklaşabilir. Nedenleri: Akut kontralateral hematom gelişimi, derin serebral iskemi veya venöz sinüs obstrüksiyonudur. Anestezi derinliği artırılır, ek hipertonik salin verilir ve cerrah gerekirse kontralateral burr-hole açar.',
      '   c) Kontralateral Hematom Gelişimi: Bir taraftaki hematom boşaltıldığında kafa içi basınç düşer ve karşı taraftaki gizli epidural/subdural hematom açığa çıkarak hızla büyüyebilir.',
      '4. Duraplasti ve Kemik Kararı: Beyin parankimi rahatladıysa kemik flep yerine konur (osteoplastik); beyin ödemli ve pulsatil değilse kemik batına veya doku bankasına saklanarak geniş dekompresif kraniektomi yapılır.'
    ],
    emergenceNotes: [
      'TRAVMA KRANİYOTOMİSİ HASTALARI AMELİYATHANEDE UYANDIRILMAZ!',
      'Şiddetli TBI, hematom boşaltımı veya dekompresif kraniektomi uygulanan olgular entübe, sedatize ve mekanik ventilatöre bağlı olarak Nöroşirürji Yoğun Bakım Ünitesine (NYBÜ) transfer edilir.',
      'Transfer Öncesi Stabilizasyon: MAP ≥ 80-90 mmHg, SpO2 ≥ %95, normokapni ve normotermi sağlandığı doğrulanır; transfer esnasında taşınabilir ventilatör, monitör, acil resüsitasyon ilaçları ve tam dolu oksijen tüpü kullanılır.',
      'Postoperatif Acil Kontrol Kranial BT: Hasta yoğun bakıma geçmeden önce veya stabil olur olmaz postoperatif hematom yatağı ve kontralateral kanama kontrolü için Kranial BT\'ye yönlendirilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Sedasyon ve Analjezi Protokolü: Sürekli Remifentanil veya Fentanil infüzyonu + Propofol infüzyonu ile hasta-ventilatör uyumu sağlanır ve öksürme/KİBAS pikleri önlenir.',
      'IV Parasetamol (1000 mg 6 saatte bir düzenli) uygulanarak non-opioid bazal analjezi ve ateş kontrolü sağlanır.',
      'NSAİİ\'lar travmatik kanama ve koagülopati riski nedeniyle akut fazda KONTRENDİKEDİR.'
    ],
    prospectRecommendations: [
      'Nörotravma olgularında intrakraniyel basınç kontrolü analjeziden önce gelir; multimodal analjezi sedasyon derinliğini ve nöromonitörizasyonu engellemeyecek şekilde titre edilmelidir.'
    ],
    erasRecommendations: [
      'Beyin Travması Vakfı (BTF) ve Nörokritik Bakım Protokolleri:',
      '  - Hedef CPP: 60 - 70 mmHg aralığında tutulmalı; serebral iskemi veya ARDS riskini artıran > 70 mmHg zorlamasından kaçınılmalıdır.',
      '  - Hedef ICP: < 20 - 22 mmHg olmalıdır; ICP artışında kademeli protokol (baş 30° elevasyon, sedasyon, hipertonik salin, hafif hiperventilasyon) uygulanır.',
      '  - Normotermi Hedefi (36.0 - 37.0°C): Travmatik beyin hasarında ateş (hipertermi > 37.5°C) nöronal metabolizmayı ve sekonder beyin hasarını katlayarak artırır; agresif antipiretik ve yüzeyel soğutma uygulanmalıdır.',
      '  - Normoglisemi Hedefi: Kan glukoz düzeyi 140 - 180 mg/dL aralığında tutulmalı; hipoglisemiden ve laktik asidozu artıran hiperglisemiden (> 200 mg/dL) kaçınılmalıdır.',
      '  - Erken Nöbet Profilaksisi: Travma sonrası ilk 7 günde erken posttravmatik nöbetleri önlemek amacıyla Levetirasetam (Keppra 500-1000 mg IV günde 2 kez) başlanmalıdır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Trauma: Craniotomy for Trauma (pp. 433-439). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Carney, N., et al. (2017). Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition. Neurosurgery, 80(1), 6-15. Brain Trauma Foundation.',
    prospectReference: 'American College of Surgeons Committee on Trauma. (2018). Advanced Trauma Life Support (ATLS) Student Course Manual (10th ed.). Chicago: American College of Surgeons.',
    otherReferences: [
      'The CRASH-3 trial collaborators. (2019). Effects of tranexamic acid on death, disability, vascular occlusive events and other morbidities in patients with acute traumatic brain injury (CRASH-3): a randomised, placebo-controlled trial. The Lancet, 394(10210), 1713-1723.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement for the Anesthetic Management of Patients with Acute Traumatic Brain Injury.',
      'European Guideline on Management of Major Bleeding and Coagulopathy Following Trauma (6th ed., 2023).'
    ]
  }
};
