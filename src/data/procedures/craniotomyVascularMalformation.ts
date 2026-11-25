import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: İntrakraniyel Vasküler Malformasyon Cerrahisi (AVM ve Kavernom Rezeksiyonu)
 * (Craniotomy for Intracranial Vascular Malformations: AVM & Cavernoma Resection)
 * 
 * Jaffe (6th ed., 2020), AHA/ASA Scientific Statement for Brain AVMs (Derdeyn et al., 2017),
 * ARUBA Trial, SNACC, ERAS (Hagan et al., 2016) ve PROSPECT Craniotomy 2023 (Mestdagh et al.)
 * referans alınarak yapılandırılmıştır.
 */
export const craniotomyVascularMalformation: ProcedureDefinition = {
  id: 'craniotomy-vascular-malformation',
  name: 'Kraniyotomi: İntrakraniyel Vasküler Malformasyon Cerrahisi (AVM ve Kavernom Rezeksiyonu)',
  shortCode: 'AVM-KAVERNOM-CERRAHİSİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Serebrovasküler Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Serebral parankim veya dural yapraklar içerisinde yerleşen yüksek akımlı-düşük dirençli Arteriyovenöz Malformasyonlar (AVM), Dural AV Fistüller (dAVF) ve düşük akımlı Kavernöz Malformasyonların (Kavernom / Kavernöz Hemanjiom) mikrocerrahi rezeksiyonudur. Hemodinamik yönetim iki patoloji arasında KESİN OLARAK AYRILMALIDIR: Yüksek akımlı AVM\'lerde nidus eksizyonu sonrası kronik vazoparalitik çevre dokuda "Normal Perfüzyon Basıncı Çöküşü" (NPPB) riski bulunurken, düşük akımlı Kavernomlarda arteriovenöz şant ve NPPB RİSKİ YOKTUR; kavernomlara agresif post-rezeksiyon hipotansiyonu ASLA uygulanmaz!',
  indications: [
    'Rüptüre Olmuş Serebral AVM\'ler: İntraserebral (İHK) veya subaraknoid kanamaya yol açmış, tekrarlayan katastrofik kanama riski taşıyan malformasyonlar',
    'Seçilmiş Rüptüre Olmamış (Unruptured) Spetzler-Martin Grade I-II AVM\'ler (ARUBA Perspektifi): ARUBA çalışması ışığında rüptüre olmamış AVM\'lerde konservatif izlem ile girişim kararı multidisipliner konseyce bireyselleştirilerek verilir; düşük cerrahi morbiditeli (Spetzler-Martin I-II) genç, semptomatik (nöbet, ilerleyici nörolojik defisit) olgularda mikrocerrahi ön plandadır',
    'Preoperatif Endovasküler Embolizasyon (Onyx / Glubran) Sonrası AVM Rezeksiyonu: Çoklu seanslarla nidal debisi düşürülmüş geniş lezyonların küratif mikrocerrahi eksizyonu',
    'Semptomatik Kavernöz Malformasyonlar (Kavernomlar): Tekrarlayan mikrokanamalar, medikal tedaviye dirençli epilepsi veya kitle etkisi (özellikle beyin sapı, talamus, elokent motor/konuşma alanları) yaratan düşük akımlı lezyonlar',
    'Dural Arteriyovenöz Fistüller (Borden Tip II-III / Cognard Tip III-IV-V): Retrograd kortikal venöz drenaj ve yüksek intrakraniyel kanama riski taşıyan dural lezyonlar'
  ],
  averageDuration: '4.5 - 8.0 saat (Anestezi indüksiyonu, invaziv A-line, CVC, İONM elektrotlarının kurulumu ve Mayfield baş tespiti: 60-75 dk; Kraniyotomi, dural açılış ve mikroskop altına geçiş: 60-90 dk; Besleyici arterlerin diseksiyonu, geçici klipleme ve nidusun sirkumferansiyel ayrılması: 120-240 dk; Drenaj veninin kapatılması, nidus eksizyonu ve ICG video-anjiyografi kontrolü: 45-90 dk; Titiz hemostaz, lezyon tipine uygun post-rezeksiyon kan basıncı titrasyonu ve kraniyoplasti/kapanış: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '400 - 1500 mL (Yüksek akımlı büyük AVM\'lerde derin besleyicilerin diseksiyonunda kan kaybı hızla 2000 - 3500+ mL masif kanamaya dönüşebilir; izole düşük akımlı kavernom olgularında ise kanama genelde sınırlıdır: 100 - 300 mL)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Arteriyovenöz Kanama (AVM)',
    crossMatchRequirement: 'Büyük AVM\'lerde en az 4 Ünite Eritrosit Süspansiyonu (ES), 2-4 Ünite Taze Donmuş Plazma (TDP) ve 1 Aferez Trombosit Cross-Match hazır bekletilmeli; Cell-Saver (Otolog Kan Kurtarma) ve Acil Masif Transfüzyon Protokolü (MTP) aktif hazır bulundurulmalıdır (küçük izole kavernomlarda 2 Ünite ES yeterlidir)',
    transfusionProbability: '%40 - %70 (Spetzler-Martin Grade III-IV ve rüptüre AVM\'lerde %80-90; küçük periferik kavernomlarda %5-10)',
    criticalBleedingSources: [
      'Nidus İntraoperatif Rüptürü (AVM): Diseksiyon esnasında frajil nidal damarların yırtılması (yüksek debili arteriyovenöz jet kanama)',
      'Derin Lentikülostriat ve Talamoperforatör Besleyici Arterler (derin beyaz cevherde retraksiyonu zor arteriyel kanama)',
      'Drenaj Veninin Erken Kesilmesi veya Trombozu (AVM): Nidus içindeki venöz çıkış tıkanırsa nidus saniyeler içinde patlar ve masif intrakraniyal kanama (Oklüzif Hiperemi) gelişir!',
      'Dura Mater, Sinüs Sigmoideus / Sinüs Sagittalis Superior komşuluğundaki dural venöz göllenmeler',
      'Normal Perfüzyon Basıncı Çöküşü (NPPB — Sadece Yüksek Akımlı AVM): Nidus çıkarıldıktan sonra komşu vazoparalitik serebral yatakta gelişen kontrolsüz hiperemik ödem ve parankim içi hematom'
    ],
    hemostasisStrategies: [
      'Drenaj Veninin En Son Kapatılması Kuralı (AVM): Cerrahi ekip tüm besleyici arterleri kapatıp nidusu tamamen serbestleştirene kadar ana drenaj venini kesinlikle kesmemelidir',
      'Yüksek Vakumlu Çift Frazier/Yankauer Aspiratör Düzeni hazır ve açık olmalıdır',
      'Hızlı Sıvı/Kan Isıtıcı ve Masif İnfüzyon Pompası (Belmont / Rapid Infuser) hatları prime edilmiş bekletilmelidir',
      'Cell-Saver (Otolog Kan Kurtarma): Enfeksiyon veya malignite bulunmadığı için cerrahi alandan aspire edilen kan yıkanarak hızla hastaya geri verilebilir',
      'Mikronöroşirürjikal hemostatik ajanlar: Bipolar hassas mikro-koagülasyon, FloSeal jelatin matriks, Oxycel/Surgicel ve pamuk kompresyonu',
      'Lezyon Tipine Göre Post-Rezeksiyon Hemodinamisi: YALNIZCA yüksek akımlı geniş AVM\'lerde NPPB önlemi için kan basıncı hastanın bazal değerinin %10-20 altına bireyselleştirilerek titre edilir (bazali normotansif hastada tipik SKB 100-120 mmHg; kronik hipertansif hastada daha yüksek bireyselleştirilmiş hedef). Düşük akımlı KAVERNOMLARDA NPPB riski yoktur; agresif hipotansiyon YAPILMAZ, normotansiyon korunur!'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Sevofluran (<0.4 - 0.5 MAC): Serebral metabolik oksijen tüketimini (CMRO2) ve serebral kan akımını (CBF) azaltır, optimal beyin gevşemesi sağlar ve intraoperatif nöromonitörizasyonu (MEP/SSEP) baskılamaz'
    ],
    alternative: [
      'Opioid Tabanlı Yüksek Doz GETA (Fentanil/Süfentanil + TIVA): Ciddi kardiyovasküler instabilitesi olan olgularda'
    ],
    clinicalRationale: 'Yüksek akımlı AVM nidusunda serebral vazodilatasyonu ve hipertansif rüptürü önlemek, aynı zamanda elokent alan / beyin sapı kavernomu haritalaması ile İONM (TcMEP/SSEP) sinyallerini korumak için Propofol + Remifentanil TIVA (veya <0.5 MAC Sevofluran) altın standarttır. Azot protoksit (N2O) KESİNLİKLE KONTRENDİKEDİR. Uzun mikrocerrahi sırasında baş pozisyonuna bağlı lümen tıkanmasını önlemek için spiral telli ETT ile kontrollü normokapnik ventilasyon (PaCO2 35-38 mmHg) tercih edilir.',
    notes: 'AVM VE KAVERNOM CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) YÜKSEK AKIMLI AVM İLE DÜŞÜK AKIMLI KAVERNOM AYRIMI (Kavernomda NPPB YOKTUR — agresif hipotansiyon yasaktır!); (2) İONM İÇİN KAS GEVŞETİCİSİZ TIVA + ISIRMA BLOĞU; (3) BAZAL NORMOKAPNİ (35-38 mmHg) VE İZOTONİK SIVI YÖNETİMİ; (4) TAZE VAZOPARALİTİK AVM YATAĞINDA HİPOTANSİYON ALTINDA VALSALVA YASAĞI.',
    rulesTitle: 'AVM VE KAVERNOM CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'YÜKSEK AKIMLI AVM (NPPB RİSKİ) İLE DÜŞÜK AKIMLI KAVERNOM (NPPB YOK) AYRIMI',
        content: 'Büyük yüksek akımlı AVM\'lerde nidus çıkarılınca NPPB riski için KB hastanın bazalinin %10-20 altına bireyselleştirilerek titre edilir (bazali normotansif hastada SKB 100-120 mmHg, kronik hipertansifte daha yüksek hedef). Buna karşın KAVERNOMLAR düşük akımlıdır ve NPPB RİSKİ YOKTUR; kavernomlara (özellikle beyin sapı kavernomlarına) agresif post-rezeksiyon hipotansiyonu (MAP 65-75) ASLA uygulanmaz (ağır iskemi riski!).'
      },
      {
        number: 2,
        title: 'TAZE VAZOPARALİTİK AVM YATAĞINDA HİPOTANSİYON ALTINDA VALSALVA YASAĞI',
        content: 'Yüksek akımlı AVM çıkarıldıktan sonra çevre yatak vazoparalitiktir; hipotansiyon altında yapılan Valsalva manevrası intrakraniyal venöz basıncı ani yükselterek oklüzif hiperemi kanamasını ve kardiyovasküler kollapsı tetikler! Taze AVM yatağında hipotansiyon eşliğinde Valsalva manevrası YAPILMAZ.'
      },
      {
        number: 3,
        title: 'ELOKENT KORTEKS / BEYİN SAPI HARİTALAMASI VE İONM İÇİN TIVA (TOF ≥ 0.90)',
        content: 'Elokent alan veya beyin sapı komşuluğunda TcMEP, SSEP ve kortikal haritalama sinyallerini korumak için Propofol + Remifentanil TIVA uygulanmalı, entübasyon sonrasında idamede nöromusküler bloker verilmemeli (TOF ≥0.90 doğrulanır) ve yumuşak ısırma bloğu (bite block) yerleştirilmelidir.'
      },
      {
        number: 4,
        title: 'BAZAL NORMOKAPNİ (PaCO2 35-38 mmHg), N2O YASAĞI VE İZOTONİK ÖVOLEMİ',
        content: 'Rutin profilaktik hiperventilasyon yapılmaz; bazal PaCO2 35-38 mmHg korunur, hafif hipokapni (30-35 mmHg) yalnızca tıkız beyinde kısa süreli geçici kurtarma olarak kullanılır. Azot protoksit (N2O) ile hipotonik/dekstrozlu sıvılar kullanılmaz; glisemi 140-180 mg/dL aralığında tutulur.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Girişimsel Nöroradyoloji Konsültasyonu: Lezyonun kesin ayrımı (Yüksek akımlı AVM / dAVF vs Düşük akımlı Kavernom), Spetzler-Martin Skoru (Boyut: <3 cm [1], 3-6 cm [2], >6 cm [3]; Elokent alan: [1]; Derin venöz drenaj: [1]), nidal anevrizma varlığı, besleyici arter sayısı ve ARUBA ışığında cerrahi endikasyonun değerlendirilmesi.',
      'Preoperatif Embolizasyon ve Onyx / DMSO Toksisite Değerlendirmesi: Embolizasyonda kullanılan ajan (Onyx [etilen-vinil alkol kopolimeri + Dimetil Sülfoksit - DMSO] / Histoacryl), son seans zamanlaması, oklüde edilen damarlar ve DMSO çözücüsüne bağlı olası pulmoner ödem/ARDS, bradikardi/hipotansiyon (vagal/trigeminokardiyak refleks) ve karakteristik sarımsak kokusu (garlic odor) ile işlem sonrası ödem/nörolojik bulgular sorgulanmalıdır.',
      'Nöroloji / Epileptoloji Konsültasyonu: AVM ve kavernom hastalarının %40-60\'ında nöbet öyküsü vardır; nöbet öyküsü olan olgularda preoperatif antiepileptik ilaç (özellikle Levetirasetam) tedavisi doğrulanmalı ve sabah dozu aksatılmamalıdır.',
      'Yoğun Bakım Konsültasyonu: Postoperatif sıkı invaziv arter takibi ve kontrollü sedasyon/uyanma planı için Nöro-Yoğun Bakım yatağının ayrılması.'
    ],
    historyAndPhysical: [
      'Nörolojik Muayene: Dört ekstremite motor gücü, görme alanı (özellikle oksipital ve temporal AVM\'lerde homonim hemianopsi), kranyal sinirler (beyin sapı kavernomlarında 3-12. sinirler) ve konuşma (Broca / Wernicke disfazisi) kaydedilmelidir.',
      'Bazal Kan Basıncı Profili: Hastanın kronik hipertansiyon öyküsü ve uyanık bazal MAP/SKB değerleri mutlaka belgelenmelidir (büyük AVM\'lerde post-rezeksiyon bireyselleştirilmiş bazal -%10-20 KB hedefi buna göre hesaplanır).',
      'KİBAS ve Kanama Bulguları: Akut rüptüre AVM veya kavernom olgularında baş ağrısı, bulantı-kusma, papilödem ve bilinç düzeyi (GKS) değerlendirilmelidir.',
      'Kardiyovasküler Aşırı Yüklenme Sorgusu: Çok geniş yüksek akımlı AVM\'lerde (özellikle pediatrik/genç erişkin dev AVM\'lerde) yüksek debili kalp yetmezliği (yüksek kardiyak indeks) ve kardiyomegali gelişebilir.',
      'Zor Hava Yolu Muayenesi: Mallampati skoru, tiromental mesafe ve servikal boyun hareketleri kaydedilmelidir.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve büyük AVM\'lerde en az 4 Ünite ES + 2-4 Ünite TDP Cross-Match teyidi (izole kavernomlarda 2 Ünite ES).',
      'Hemoglobin / Hematokrit, Trombosit Sayımı, PT/INR, aPTT, Fibrinojen (tüketim koagülopatisi ekarte edilmelidir).',
      'Serum Elektrolitleri (Özellikle Sodyum - Na+; ozmoterapi ve SIADH/CSWS ayrımı için) ve bazal Kan Şekeri (hedef 140-180 mg/dL).',
      'Dijital Subtraksiyon Anjiyografi (DSA), Beyin BT ve MRG / Traktografi tetkiklerinin ameliyathane ekranına aktarılması.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu / Foramen Monro) Seviyesinde Sıfırlanmış: Baş elevasyonunda doğru CPP ölçümü için transdüser yalnızca Tragus seviyesinde sıfırlanır. Anestezi indüksiyonu ÖNCESİ lokal anesteziyle yerleştirilmelidir.',
      'Santral Venöz Kateter (CVC): Yüksek akımlı büyük AVM\'lerde vazoaktif infüzyonların (Noradrenalin, Labetalol, Esmolol, Nikardipin) güvenli titrasyonu ve volüm takibi için.',
      'İntraoperatif Nöromonitörizasyon (İONM) ve TOF: TcMEP, SSEP, beyin sapı kavernomlarında BAEP/kranyal sinir EMG, EEG ve elokent korteks AVM\'lerinde Faz Ters Dönmesi (Phase Reversal). TcMEP için TOF ≥0.90 (4/4) doğrulanır ve yumuşak ısırma bloğu yerleştirilir.',
      'İntraoperatif İndosiyanin Yeşili (ICG) Video-Anjiyografi & Mikro-Vasküler Doppler USG: Nidal damarların, arter/ven ayrımının ve rezeksiyon sonrası rezidüel erken venöz doluş kalmadığının doğrulanması.',
      'Sürekli End-Tidal CO2 (EtCO2), Seri ABG ve Kan Şekeri: Bazal normokapni (PaCO2 35-38 mmHg; yalnızca tıkız beyinde kısa süreli 30-35 mmHg kurtarma) ve glukoz 140-180 mg/dL takibi.',
      'Isı Problu Foley İdrar Sondası ve Sürekli Isı Takibi (Normotermi 36.0 - 37.0°C).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz yol (14G veya 16G)',
      'Santral Venöz Kateter (Üç lümenli CVC — büyük/yüksek riskli AVM\'lerde)',
      'Hızlı Sıvı/Kan İnfüzyon Sistemi (Belmont / Level 1) için hazır geniş lümenli kan yolu'
    ],
    patientPosition: 'Lezyonun Anatomik Yerleşimine Göre Değişken: Supin + Baş Rotasyonu, Park-Bench (Modifiye Lateral) veya Prone Pozisyon (Mayfield 3-Noktalı Çivili Başlık ile İmmobilize Edilmiş)',
    patientPositionDetails: [
      'Konveksite ve Frontal/Temporal Lezyonlar: Supin pozisyon, baş karşı tarafa hafif rotasyon ve 15-20° elevasyonda tutulur.',
      'Oksipital veya Posterior Fossa / Beyin Sapı Lezyonları: Park-Bench (modifiye lateral) veya Prone pozisyon kullanılır; boyun venöz dönüşünün engellenmemesi için çene ile sternum arasında en az 2 parmak mesafe korunur.',
      'Mayfield çivisi takılmadan önce çivi yerlerine lokal anestezik (toplam mg/kg maks dozu aşmadan, intravasküler epinefrin enjeksiyonundan kaçınarak) infiltre edilir ve anestezi derinliği (Remifentanil bolusu) artırılarak hipertansif yanıt önlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (1.5 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 - 1.0 mg/kg). Entübasyon esnasında hipertansiyon rüptüre yol açabileceğinden IV Lidokain (1.0 - 1.5 mg/kg) ve gerektiğinde Esmolol (0.5 mg/kg) ile hemodinami baskılanır.',
      'İdame, Gaz ve Sıvı Yönetimi: TIVA (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.3 mcg/kg/dk TCI; BIS 40-50). Kas gevşetici sadece indüksiyonda verilir (TcMEP için TOF ≥0.90). Azot protoksit (N2O) KESİNLİKLE KONTRENDİKEDİR. Yalnızca izotonik kristaloidler (%0.9 NaCl veya dengeli izotonik Plasmalyte/İzolen) kullanılır; hipotonik (Ringer Laktat dahil) ve dekstrozlu sıvılardan kaçınılır. Kan şekeri 140-180 mg/dL, vücut ısısı 36.0-37.0°C korunur.',
      'Beyin Gevşetme ve Solunum Hedefi: Dura açılmadan önce gerektiğinde %20 Mannitol (0.5 - 1.0 g/kg IV) veya %3 Hipertonik Salin (2 - 3 mL/kg IV). Bazal PaCO2 35 - 38 mmHg (normokapni) tutulur; rutin profilaktik hiperventilasyon yapılmaz, hafif hipokapni (30-35 mmHg) yalnızca tıkız beyin kurtarma amaçlı kısa süreli uygulanır.',
      'Kan Basıncının Lezyon Tipi ve Cerrahi Evreye Göre Titrasyonu:',
      '  - Yüksek Akımlı AVM — Diseksiyon Fazı: Kontrollü normotansiyon (bazal KB sınırlarında; ani hipertansiyon piklerinden kesinlikle kaçınılır).',
      '  - Yüksek Akımlı Büyük AVM — NİDUS REZEKSİYONU SONRASI (NPPB Önlemi): Kan basıncı hastanın bazal değerinin %10 - 20 ALTINA bireyselleştirilerek titre edilir (bazali normotansif hastalarda tipik SKB 100 - 120 mmHg; kronik hipertansif hastalarda otoregülasyon sağa kaydığı için daha yüksek bireyselleştirilmiş hedef). Hipertansiyonda Esmolol, Labetalol veya Nikardipin infüzyonu anında titre edilir.',
      '  - DÜŞÜK AKIMLI KAVERNOM (NPPB RİSKİ YOKTUR!): Hem diseksiyon hem rezeksiyon sonrasında BAZAL NORMOTANSİYON korunur! Kavernomlarda (özellikle beyin sapı ve derin kavernomlarda) agresif post-rezeksiyon hipotansiyonu (MAP 65-75) KESİNLİKLE UYGULANMAZ (serebral/beyin sapı iskemisi riski!).'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; mikroskop ve cerrah manipülasyonunda tüpün katlanmasını önlemek için tercihen Spiral (Zırhlı / Wire-reinforced) ETT ve TcMEP uygulanacaksa yumuşak ısırma bloğu (bite block).',
      'Laringoskopi ve entübasyona bağlı sempatik yanıt (taşikardi ve ani hipertansiyon) nidal kubbe rüptürünü tetikleyebilir; derin anestezi altında, yumuşak ve atravmatik entübasyon şarttır.',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Mayfield Çivili Başlık Takılması ve Dura Açılışı: KİBAS ve hipertansif atak kontrolü.',
      '2. Pial Diseksiyon ve Yüzeyel Besleyicilerin Kliplenmesi: Cerrahi alan mikroskopla büyütülür; mikroklipsler ve bipolar koter kullanılır.',
      '3. Derin Besleyicilerin Ayrılması (AVM\'de En Zorlu Aşama): Derin lentikülostriat veya koroidal dallar ayrılırken nidal yırtılma ve masif kanama riski; anestezi ekibi kan ısıtıcılarını ve transfüzyonu hazır tutar.',
      '4. Ana Drenaj Veninin Kapatılması (AVM): Nidus tamamen izole edilmeden drenaj veni KESİNLİKLE kesilmemelidir. Nidus izole edildikten sonra ven kliplenir ve nidus tek parça (en-bloc) çıkarılır.',
      '5. ICG Video-Anjiyografi ile Doğrulama: Nidus yatağında rezidüel erken venöz doluş veya kaçak kalmadığı mikroskop altında belgelenir.',
      '6. Post-Rezeksiyon Hemostaz ve NPPB Kontrolü (VALSALVA UYARISI!): Yüksek akımlı taze vazoparalitik AVM rezeksiyon yatağında hipotansiyon altında Valsalva manevrası KESİNLİKLE YAPILMAZ (oklüzif hiperemi kanaması ve kardiyovasküler kollapsı provoke eder!). Hemostaz nazik mikrocerrahi teknikler ve lezyon tipine göre bireyselleştirilmiş kan basıncı kontrolüyle (AVM: bazal -%10-20; Kavernom: normotansiyon) sağlanır.'
    ],
    emergenceNotes: [
      'ÖKSÜRMESİZ VE HİPERTANSİYONSUZ UYANDIRMA (SMOOTH EMERGENCE) ZORUNLUDUR: Uyanma esnasında ıkınma, öksürme ve hipertansif pikler rezeksiyon yatağında ölümcül sekonder hematom ve büyük AVM\'lerde NPPB kanamasına yol açar!',
      'Uyanma Sırasında Hemodinamik Blokaj: Ekstübasyondan 10-15 dakika önce IV Lidokain (1 mg/kg), Deksmedetomidin (0.2 - 0.5 mcg/kg/saat) veya Esmolol/Labetalol ile taşikardi ve hipertansiyon köreltilir (kavernomlarda aşırı hipotansiyona düşülmeden normotansiyon korunur).',
      'Nörolojik Değerlendirme: Hasta uyanır uyanmaz motor fonksiyonlar, pupiller, konuşma, kranyal sinirler ve görme alanı ameliyathanede değerlendirilir ve kaydedilir.',
      'Şüpheli veya Zorlu Olgularda Yaklaşım: Spetzler-Martin Grade IV-V, masif kanama geçirmiş, rezeksiyon yatağında ödem/NPPB şüphesi gözlenen veya intraoperatif komplikasyon gelişen AVM hastaları ameliyathanede uyandırılmaz; entübe, sedatize ve bireyselleştirilmiş sıkı KB kontrolü altında Nöro-Yoğun Bakım Ünitesine transfer edilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi: Cerrahi bitiminde skalp bloğu veya insizyonel lokal anestezik infiltrasyonu (Ropivakain ≤3 mg/kg veya Levobupivakain/Bupivakain ≤2.5 mg/kg [epinefrinli ≤3 mg/kg]; toplam mg/kg maks dozu aşılmamalı ve LAST [%20 Lipid Emülsiyonu] hazır olmalıdır) + düzenli IV Parasetamol (1 g IV her 6 saatte bir).',
      'Güvenli Kurtarıcı Opioid Titrasyonu (TRAMADOL KULLANILMAZ!): Tramadol nöbet eşiğini düşürdüğü ve şiddetli POBV tetiklediği için kraniyal cerrahide KESİNLİKLE KULLANILMAZ. Şiddetli atılım ağrısında nörolojik izlemi maskelemeyecek şekilde düşük doz titre IV Fentanil (25-50 mcg), Oksikodon veya bazal infüzyonsuz Morfin PCA kullanılır.',
      'NSAİİ Kısıtlaması: Taze vasküler malformasyon rezeksiyon yatağında intrakraniyal kanama riski nedeniyle erken dönemde rutin NSAİİ (Deksketoprofen dahil — non-selektif COX-1/2 inhibitörüdür!) KULLANILMAZ; yalnızca nöroşirürjik hemostaz ve postop kontrol BT doğrulaması sonrası cerrah onayıyla değerlendirilebilir.',
      'Ağrı Kaynaklı Hipertansiyonun Önlenmesi: Yetersiz analjezi kan basıncını yükselterek rezeksiyon yatağında kanamaya zemin hazırlar; ağrı proaktif tedavi edilmelidir.'
    ],
    prospectRecommendations: [
      'PROSPECT Craniotomy 2023 (Mestdagh et al.): Skalp bloğu / insizyonel lokal anestezik infiltrasyonu (maksimum mg/kg ve LAST kurallarına uyarak) ile planlı sistemik Parasetamol (1 g IV q6h) temel multimodal analjeziyi oluşturur.',
      'Erken dönemde taze vasküler yatakta rutin NSAİİ ve Tramadol\'den kaçınılır; kurtarıcı düşük doz opioid titrasyonu ve agresif POBV profilaksisi uygulanır.'
    ],
    erasRecommendations: [
      'Lezyon Tipine Göre Postoperatif Kan Basıncı Kontrolü: Büyük yüksek akımlı AVM\'lerde ilk 24-48 saat bireyselleştirilmiş bazal -%10-20 KB sınırları (normotansif bazalde tipik SKB 100-120 mmHg) korunur; KAVERNOMLARDA ise normotansiyon sürdürülür (hipotansiyon yapılmaz).',
      'Bulantı-Kusma Profilaksisi: Çift antiemetik (Ondansetron 4 mg + Deksametazon 4-8 mg). Öğürme ve kusma intrakraniyel venöz basıncı fırlatarak intrakraniyal kanama riskini katlar!',
      'Glisemi ve Normotermi: Kan şekeri 140-180 mg/dL ve vücut ısısı <37.5°C idame ettirilir.',
      'Nöbet Yönetimi: Preoperatif nöbet öyküsü olan olgularda antiepileptik (Levetirasetam) tedavisine düzenli devam edilir.',
      'Erken Kontrol Beyin BT: Rezeksiyon yatağında hematom, NPPB ödemi veya iskemi gelişimini dışlamak için postoperatif ilk saatlerde çekilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2020). Anesthesiologist's Manual of Surgical Procedures (6th ed.). Wolters Kluwer. Section: Neurosurgery — Resection of Intracranial Arteriovenous Malformation.",
    erasReference: 'Hagan, K. B., Bhavsar, S., Raza, S. M., Arnold, B., Arunkumar, R., Dang, A., et al. (2016). Enhanced recovery after surgery for oncological craniotomies. Journal of Clinical Neuroscience, 24, 10–16.',
    prospectReference: "Mestdagh, F., Lavand'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group (ESRA). (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(5), 301–314.",
    otherReferences: [
      'Derdeyn, C. P., Zipfel, G. J., Albuquerque, F. C., Cooke, D. L., Feldmann, E., Sheehan, J. P., & Torner, J. C.; AHA/ASA Stroke Council. (2017). Management of Brain Arteriovenous Malformations: A Scientific Statement for Healthcare Professionals From the American Heart Association/American Stroke Association. Stroke, 48(8), e200–e224.',
      'Mohr, J. P., Parides, M. K., Stapf, C., Moquete, E., Moy, C. S., Overbey, J. R., et al.; ARUBA Investigators. (2014). Medical management with or without interventional therapy for unruptured brain arteriovenous malformations (ARUBA): a multicentre, non-blinded, randomised trial. The Lancet, 383(9917), 614–621.',
      'Spetzler, R. F., & Martin, N. A. (1986). A proposed grading system for arteriovenous malformations. Journal of Neurosurgery, 65(4), 476–483.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement on the Perioperative Management of Patients with Intracranial Vascular Malformations.'
    ]
  }
};
