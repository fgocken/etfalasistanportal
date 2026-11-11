import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: Supratentoryal Beyin Tümörü Rezeksiyonu (Gliom, Menenjiyom ve Metastaz Cerrahisi)
 * (Craniotomy for Supratentorial Neoplasm / Brain Tumor Resection)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Supratentorial Neoplasm, pp. 416-422),
 * SNACC (Society for Neuroscience in Anesthesiology and Critical Care),
 * ERAS Society Nöroşirürji Onkoloji Konsensus Kılavuzları ve WHO SSS Tümörleri
 * rehberleri referans alınarak yapılandırılmıştır.
 */
export const craniotomyTumor: ProcedureDefinition = {
  id: 'craniotomy-tumor',
  name: 'Kraniyotomi: Supratentoryal Beyin Tümörü Rezeksiyonu (Gliom, Menenjiyom ve Metastaz Cerrahisi)',
  shortCode: 'KRANİO-TÜMÖR',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Nöroonkolojik Cerrahi',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Supratentoryal kompartmanda (frontal, temporal, parietal, oksipital loblar veya kafa kaidesi konveksiteleri) yerleşimli primer parankimal (yüksek/düşük dereceli gliomlar, glioblastoma multiforme, oligodendrogliom), ekstra-aksiyel (menenjiyomlar) veya sekonder (beyin metastazları) tümöral kitlelerin; nöronavigasyon, cerrahi mikroskop, ultrasonik aspiratör (CUSA) ve intraoperatif nöromonitörizasyon (İONM) kılavuzluğunda kraniyotomi yapılarak çevre fonksiyonel nöronal doku korunup maksimum güvenli sınırda rezeke edilmesi (sitoredüksiyon / total eksizyon) ameliyatıdır.',
  indications: [
    'Yüksek Dereceli Malign Gliomlar (Glioblastoma Multiforme - GBM / Anaplastik Astrositom): Kitle etkisi, perifokal vazojenik ödem, orta hat şifti ve fokal nörolojik defisit yaratan primer parankimal malignitelerin dekompresyonu ve sitoredüksiyonu',
    'Düşük Dereceli Gliomlar (Evre II Astrositom / Oligodendrogliom): Genç hastalarda intraktabl epilepsi veya nörolojik kayba yol açan lezyonların fonksiyonel koruma ile cerrahi eksizyonu',
    'Semptomatik ve İntrakraniyel Menenjiyomlar: Konveksite, parasagittal, falks veya sfenoid kanat yerleşimli, dural invazyon ve sinus komşuluğu gösteren iyi huylu/atipik ekstra-aksiyel kitleler',
    'Soliter veya Oligometastatik Beyin Metastazları (Akciğer, Meme, Renal, Melanom): Sistemik hastalığı kontrol altında olan, kitle etkisi ve KİBAS yaratan sekonder serebral lezyonların küratif/palyatif rezeksiyonu',
    'Medikal Tedaviye Dirençli Tümöral Epilepsi ve Kafa İçi Basınç Artışı Sendromu (KİBAS): Fıtıklaşma (uncal/subfalcine herniasyon) tehdidi oluşturan intrakraniyel kitleler'
  ],
  averageDuration: '3.5 - 6.5 saat (Anestezi indüksiyonu, invaziv A-line, İONM elektrotlarının yerleşimi, nöronavigasyon eşleştirmesi ve Mayfield çivili başlık tespiti: 50-70 dk; Cilt flebi, kraniyotomi kemik penceresi açılışı ve dural açılış: 45-60 dk; Mikroskopik tümör debulking, CUSA ile kitle içi eksizyon ve sınır diseksiyonu: 90-180 dk; Rezeksiyon loju hemostazı, Valsalva manevrası, dural rekonstrüksiyon, kemik flebin mini-plaklarla fiksasyonu ve cilt kapanışı: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 800 mL (Standart intraparenkimal gliom ve metastaz rezeksiyonunda düşük-orta kanama; ancak zengin vaskülarize büyük menenjiyomlarda, dural venöz sinus invazyonu olan kitlelerde veya glioblastomun derin besleyici damarlarında kan kaybı 1200 - 2500+ mL masif kanamaya dönüşebilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Menenjiyom ve Sinüs İnvazyonunda Potansiyel Masif Kanama',
    crossMatchRequirement: 'En az 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalı, T&S doğrulanmalıdır; dural sinüs komşuluğu olan veya preop embolize edilmemiş dev menenjiyomlarda 4 Ünite ES ve 2 Ünite TDP hazır tutulmalıdır',
    transfusionProbability: '%20 - %40 (Derin gliom ve vasküler menenjiyomlarda %40-60; küçük periferik metastazlarda %10-15)',
    criticalBleedingSources: [
      'Tümör Yatağı Neovaskülarizasyonu ve Kırılgan Tümöral Damarlar (özellikle Glioblastoma ve renal hücreli karsinom metastazlarında)',
      'Dural Venöz Sinüs Laserasyonu: Sinüs Sagittalis Superior (SSS) veya Sinüs Transversus komşuluğundaki parasagittal menenjiyomların diseksiyonunda yüksek debili venöz kanama ve venöz hava embolisi (VAE) riski',
      'Kemik Diploe Kanalları ve Skalp Flebi: Kraniyotomi kenarlarındaki emissary venler ve zengin skalp arterleri (A. temporalis superficialis dalları)',
      'A. Meningea Media Dalları: Dural flep kaldırılırken arteriyel yırtılmalar',
      'Derin Besleyici Lentikülostriat veya Koroidal Arter Dallarının Tümör Kapsülünden Ayrılması Esnasında Retraksiyon Kanayanları'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal hassas koagülasyon (çevre sağlıklı serebral dokuya termal hasar vermeden)',
      'Topikal hemostatik ajanlar: Surgicel (oksidize selüloz), Gelfoam (trombin emdirilmiş jelatin sünger) ve FloSeal hemostatik jelatin matriks',
      'Kemik diploik kanamalarında steril kemik mumu (Bone Wax) uygulaması',
      'CUSA (Cavitron Ultrasonic Surgical Aspirator): Tümör parankimini selektif parçalayarak aspire ederken damarsal yapıları korur',
      'Rezeksiyon Lojunda Valsalva Manevrası: Kapanış öncesi cerrahın talebiyle hava yolu basıncını 25-30 cmH2O seviyesine 5-10 saniye yükselterek gizli venöz kaçakların açığa çıkarılması ve koterizasyonu',
      'Dural sinus yırtıklarında cerrahi sinüs tamiri, Gelita kompresyonu ve venöz hava embolisine karşı cerrahi alana serum fizyolojik irrigasyonu'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Uçucu Anestezik (< 0.5 MAC Sevofluran): İONM (MEP/SSEP) sinyal kalitesini bozmadan serebral metabolizma (CMRO2) ve serebral kan akımını (CBF) azaltır, intrakraniyel kompliyansı artırır ve cerrah için ideal "rahat / gevşek beyin" (slack brain) sağlar'
    ],
    alternative: [
      'Dengeli İnhalasyon Anestezisi (Sevofluran < 0.7 MAC + Remifentanil İnfüzyonu): İONM motor uyarılmış potansiyel (MEP) monitörizasyonu kullanılmayan vakalarda'
    ],
    notes: 'Beyin tümörü cerrahisinde anestezinin altın üçgeni: (1) CERRAHİ İÇİN RAHAT BEYİN (SLACK BRAIN) SAĞLAMAK — Mannitol veya Hipertonik Salin, hafif kontrollü hiperventilasyon (PaCO2 32-35 mmHg), baş elevasyonu ve TIVA ile beyin ödeminin kırılması, (2) İNTRAOPERATİF NÖROMONİTÖRİZASYONU (MEP/SSEP) KORUMAK — İndüksiyon sonrası idame evresinde nöromusküler blokörlerden kaçınmak, (3) UYANMA SIRASINDA ÖKSÜRME VE HİPERTANSİYONU ÖNLEMEK (SMOOTH EMERGENCE) — Uyanma pikleri tümör rezeksiyon yatağında ölümcül hematoma yol açar; tansiyon sıkı kontrol edilmelidir (Sistolik KB < 140 mmHg).'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji Konsültasyonu: Kranial MRG ve BT bulguları; tümörün lob yerleşimi, kistik/nekrotik komponentler, peritümöral vazojenik ödem derecesi, orta hat şifti (midline shift > 5 mm KİBAS göstergesidir), bazal sisternaların silinmesi ve elokent korteks (motor korteks, Broca/Wernicke alanları) komşuluğu değerlendirilmelidir.',
      'Nöroloji / Epileptoloji Konsültasyonu: Supratentoryal tümörlü olguların %40-70\'inde nöbet (jeneralize veya fokal) anamnezi mevcuttur. Preoperatif antiepileptik profilaksi (özellikle Levetirasetam [Keppra] 1000-1500 mg/gün IV) doğrulanmalı ve operasyon sabahı dozu aksatılmamalıdır.',
      'Endokrinoloji Konsültasyonu: Hipofiz/sellar uzanımı olan tümörlerde panhipopituitarizm ve adrenal yetmezlik taranmalı; uzun süredir yüksek doz Deksametazon kullanan olgularda HPA aksı baskılanması nedeniyle intraoperatif stres dozu steroid gereksinimi planlanmalıdır.',
      'Nöro-Yoğun Bakım Konsültasyonu: Postoperatif invaziv arteriyel kan basıncı takibi ve nörolojik gözlem için YBÜ yatağı teyit edilmelidir.'
    ],
    historyAndPhysical: [
      'Kafa İçi Basınç Artışı Sendromu (KİBAS) Bulguları: Sabah baş ağrısı, fışkırır tarzda bulantı-kusma, papilödem, diplopi (6. kranyal sinir felci), letarji ve Cushing Triadı (hipertansiyon, bradikardi, düzensiz solunum — fıtıklaşma acil alarmı!).',
      'Fokal Nörolojik Muayene: Dört ekstremite motor gücü (0-5 skala), duyusal kayıplar, konuşma disfazisi/afazisi, görme alanı defisiti (hemianopsi) ve refleksler preoperatif tam kaydedilmelidir.',
      'Steroid Tedavisi Öyküsü: Vazojenik peritümöral ödemi azaltmak amacıyla hastalar sıklıkla Deksametazon (4 - 8 mg IV/oral günde 2-4 kez) kullanmaktadır; kan şekeri düzeyi ve stres dozu steroid ihtiyacı belirlenmelidir.',
      'Hava Yolu ve Servikal Muayene: Mallampati, tiromental mesafe; Mayfield başlığı ile başa verilecek rotasyon ve fleksiyon açısından servikal vertebra hareketliliği değerlendirilmelidir.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 2 Ünite ES Cross-Match doğrulaması.',
      'Tam Kan Sayımı (Hb, Hct, Trombosit), Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen).',
      'Serum Elektrolitleri: Özellikle bazal Sodyum (Na+) ve Osmolarite takibi şarttır; hiperosmolar tedavi (Mannitol / Hipertonik Salin) planlaması ve olası SIADH/CSWS/DI bozukluklarının erken tespiti için bazal değer bilinmelidir.',
      'Böbrek ve Karaciğer Fonksiyon Testleri: Mannitol atılımı ve antiepileptik ilaç metabolizması açısından Serum Kreatinin ve GFR seviyesi.',
      'Ameliyathane Nöronavigasyon İstasyonuna Yüklenmiş Kontrastlı Volümetrik Kranial MRG ve BT verileri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp ve Foramen Monro / Dış Kulak Yolu (Tragus) Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle mutlaka yerleştirilmelidir. Serebral Perfüzyon Basıncını (CPP = MAP - ICP) hassas yönetmek, Mayfield pinning sırasındaki hipertansiyonu ve tümör rezeksiyonundaki ani kanamaları anlık yakalamak için zorunludur.',
      'İntraoperatif Nöromonitörizasyon (İONM): Motor Uyarılmış Potansiyeller (MEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP), EEG ve elokent motor alana komşu tümörlerde Faz Ters Dönmesi (Phase Reversal / Somatosensory Evoked Cortical Potentials) ile merkezi sulkusun haritalanması.',
      'Nöromusküler İleti İzlemi (Train-of-Four - TOF): İdame fazında kas gevşeticisiz rejimde hastanın cerrahi mikroskop altında kıpırdamasını önlemek ve derin anesteziyi doğrulamak için.',
      'Anestezi Derinliği İzlemi: Bispektral İndeks (BIS: 40 - 50 aralığında tutularak beyin metabolik oksijen tüketimi [CMRO2] baskılanır).',
      'Isı Problu Foley İdrar Sondası: Mannitol ve furosemid infüzyonunun yarattığı masif ozmotik diürezin saatlik takibi ve mesane distansiyonunun önlenmesi.',
      'Sürekli End-Tidal CO2 (EtCO2) ve Seri Arteriyel Kan Gazı (ABG): PaCO2 hedefi 32 - 35 mmHg hafif hiperventilasyondur; aşırı hipokapniden (PaCO2 < 28 mmHg serebral iskemi riski) kesinlikle kaçınılmalıdır.',
      'Sürekli Vücut Sıcaklığı Monitörizasyonu (Normotermi 36.0 - 37.0°C; hipotermi koagülopatiyi, hipertermi nöronal iskemik hasarı artırır).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz yol (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Periferik venöz erişimi zayıf, vasküler invazyon riski taşıyan menenjiyom olgularında veya vazoaktif ajan infüzyonları için',
      'Kan ve Sıvı Isıtıcı Düzenekleri'
    ],
    patientPosition: 'Tümörün Anatomik Lokalizasyonuna Göre Supin + Baş Rotasyonu (Mayfield 3-Noktalı Çivili Başlık ile İmmobilize Edilmiş)',
    patientPositionDetails: [
      'Frontal, Temporal ve Ön Parietal Lezyonlar: Supin pozisyon, gövde ve baş 15 - 30° elevasyonda tutulur.',
      'Serebral Venöz Dönüşün Korunması: Baş cerrahi alana göre karşı tarafa 30-45° rotasyona getirilebilir; ancak internal juguler ven basısını ve serebral venöz konjesyonu önlemek için çene ile sternum arasında en az 2 parmak mesafe korunmalı, aşırı boyun torsiyonundan kesinlikle kaçınılmalıdır!',
      'Mayfield Çivili Başlık Uygulaması: Çiviler takılmadan önce giriş yerlerine lokal anestezik (Bupivakain + Lidokain) infiltre edilir; çivi sıkılması esnasındaki masif sempatik deşarjı ve hipertansif atağı önlemek için Remifentanil bolusu, Propofol veya Esmolol (0.5 mg/kg) ile hemodinami baskılanır.',
      'Bası Noktaları: Oksiput, skapula, sakrum ve topuklar jel pedlerle desteklenir; gözler koruyucu göz merhemi ve bantla kapatılarak dış basıdan korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (1.5 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 - 1.0 mg/kg). Laringoskopi ve entübasyon esnasında intrakraniyel basınç artışını ve fıtıklaşmayı önlemek için IV Lidokain (1.5 mg/kg) uygulanır.',
      'İdame: TIVA (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.3 mcg/kg/dk TCI infüzyonu). BIS hedefi: 40 - 50. İONM MEP kayıtları için indüksiyon sonrası kas gevşetici tekrarlanmaz.',
      'Beyin Gevşetme Protokolü ("Slack Brain" - Rahat Beyin Stratejisi):',
      '  1. Ozmotik Diürez: Cilt insizyonu başladığında %20 Mannitol (0.5 - 1.0 g/kg IV 15-20 dakikada infüzyon) veya %3 Hipertonik Salin (2 - 3 mL/kg IV bolus). Dura açılana kadar beynin küçülüp gevşemesi hedeflenir.',
      '  2. Kontrollü Ventilasyon: PaCO2 32 - 35 mmHg aralığında tutulur (serebral vazokonstriksiyon ile intrakraniyel hacmi küçültür).',
      '  3. Baş Pozisyonu: 20-30° venöz drenaj elevasyonu ve serbest boyun.',
      '  4. Gaz Kontrendikasyonu: Azot Protoksit (N2O) KESİNLİKLE KULLANILMAZ (KİBAS\'ı artırır ve pnömosefaliyi genişletir). Uçucu gazlar veriliyorsa < 0.5 MAC seviyesinde tutulur.',
      '  5. Sıvı Yönetimi: Hipo-ozmolar sıvılardan (%5 Dekstroz, Ringer Laktat) kaçınılmalı; izotonik Dengeli Elektrolit Çözeltileri (Plasmalyte / İzolen) veya %0.9 NaCl tercih edilmelidir.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; baş pozisyonlandırması ve cerrahi mikroskop manipülasyonunda lümen oklüzyonunu önlemek için tercihen Spiral (Zırhlı / Wire-reinforced) ETT.',
      'Laringoskopiye bağlı sempatik yanıt ve intrakraniyel basınç piki derin anestezi altında tamamen köreltilmelidir.',
      'Kaf basıncı manometre ile 20 - 25 cmH2O aralığında sabitlenir.'
    ],
    criticalSurgicalStages: [
      '1. Mayfield Çivili Başlık Takılması: Sempatik pik, hipertansiyon ve taşikardi kontrolü.',
      '2. Kraniyotomi Kemik Flebinin Kaldırılması: Diploe venlerinden kanama (kemik mumu uygulanır), dural yırtılma riski.',
      '3. Dura Açılışı ve Beyin Gevşekliğinin Değerlendirilmesi: Dura açıldığında beyin rahat (slack) olmalıdır; eğer beyin gergin ve herniye oluyorsa acil algoritma uygulanır: Ventilasyon kontrol edilir (PaCO2?), boyun venöz basısı kontrol edilir, anestezi derinleştirilir, ek Mannitol / Hipertonik Salin verilir, PEEP düşürülür.',
      '4. Mikroskopik Tümör Rezeksiyonu ve CUSA Kullanımı: Kitle debulking edilirken derin vasküler yapılar ve sinüs duvarları korunmalıdır; anestezi ekibi kanama ve hemodinamiyi yakın takip eder.',
      '5. Rezeksiyon Lojunda Valsalva Manevrası: Tümör çıkarıldıktan sonra cerrahın talebiyle solunum devresinde 25-30 cmH2O hava yolu basıncı 5-10 saniye tutularak gizli venöz kanamalar kontrol edilir.',
      '6. Dural Kapanış ve Mayfield Çivilerinin Çıkarılması: Çiviler çıkarılırken uyanma ajitasyonu ve hipertansif atak önlenmelidir.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE) ZORUNLUDUR: Uyanma sırasında öksürme, ıkınma, tüpü ısırma ve hipertansiyon; taze tümör rezeksiyon lojunda venöz basıncı fırlatarak intrakraniyel hematom gelişimine ve ani nörolojik ölüme yol açar!',
      'Uyanma Sırasında Hemodinamik Baskılama: Ekstübasyon öncesi IV Lidokain (1.0 - 1.5 mg/kg), Esmolol (0.5 mg/kg) veya Deksmedetomidin infüzyonu ile öksürük refleksi ve taşikardi baskılanır. Sistolik kan basıncı kesinlikle < 140 mmHg tutulmalıdır.',
      'Nörolojik Değerlendirme: Hasta ameliyathanede ekstübe edilir edilmez bilinci, kooperasyonu, göz açması, dört ekstremite motor gücü ve pupilleri hızla değerlendirilerek kaydedilir.',
      'Gecikmiş Uyanma veya Yeni Fokal Defisit Durumu: Hasta ameliyathanede beklenenden geç uyanıyor veya yeni anizokori/hemiparezi geliştiyse derhal acil Kontrastsız Kranial BT çekilmeli; postoperatif hematom, akut serebral ödem veya tansiyon pnömosefalisi ekarte edilmelidir!'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - Cerrahi Başlangıcında veya Sonunda Skalp Blokajı: N. supraorbitalis, N. supratrochlearis, N. auriculotemporalis, N. occipitalis major ve minor sinirlerine lokal anestezik (%0.25 Bupivakain veya %0.5 Ropivakain) infiltrasyonu postoperatif ilk 12-24 saatlik opiat ihtiyacını dramatik azaltır.',
      '  - IV Parasetamol (1000 mg 6 saatte bir düzenli infüzyon).',
      '  - Selektif NSAİİ (Deksketoprofen 50 mg IV): Cerrahi hemostaz tam ve cerrah onaylı ise postop 12. saatten sonra eklenebilir.',
      '  - Kurtarma Opiyatı: Düşük doz Tramadol (50 mg IV yavaş) veya Fentanil (25-50 mcg IV); aşırı sedasyonun nörolojik takibi gölgelememesi için morfinden kaçınılmalıdır.'
    ],
    prospectRecommendations: [
      'Kraniyotomi sonrası şiddetli ağrı insidansı %60-80 olup intrakraniyel basıncı ve kanama riskini artırır; preoperatif/postoperatif Skalp Bloğu A-düzeyinde önerilmektedir.',
      'Sedasyon skorunu bozmayan non-opioid analjeziklerin (Parasetamol) bazal kullanımı esastır.'
    ],
    erasRecommendations: [
      'ERAS Nöroşirürji Onkoloji Kılavuzları:',
      '  - Postoperatif Bulantı ve Kusmanın (PONV) Çoklu Profilaksisi: Kusma ve öğürme intrakraniyel basıncı fırlattığı için çift ajan profilaksisi (Deksametazon 4-8 mg intraoperatif + Ondansetron 4 mg kapanışta) şarttır.',
      '  - Normotansiyon Hedefi: Postoperatif ilk 24 saatte sistolik kan basıncı < 140 mmHg, MAP 75-90 mmHg aralığında sıkı kontrol edilmelidir.',
      '  - Erken Mobilizasyon ve Erken Oral Beslenme: Postop 4-6. saatte bilinç açıksa yudum su ile başlanması.',
      '  - Üriner Kateterin Erken Çekilmesi: Postop 1. günde mobilizasyonla birlikte Foley sondanın sonlandırılması.',
      '  - Nöbet Profilaksisi: Supratentoryal kitlelerde Levetirasetam (Keppra) tedavisine postoperatif en az 7 gün devam edilmesi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Supratentorial Neoplasm (pp. 416-422). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Neurosurgical Oncology: A Systematic Review and Consensus Guidelines. Journal of Neurosurgery, 134(3), 781-791.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Craniotomy. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement for Anesthetic Management of Patients Undergoing Craniotomy for Brain Tumor.',
      'Louis, D. N., et al. (2021). The 2021 WHO Classification of Tumors of the Central Nervous System: a summary. Neuro-Oncology, 23(8), 1231-1251.',
      'American Society of Anesthesiologists (ASA). Practice Guidelines for Central Nervous System Interventions and Brain Relaxation Strategies.'
    ]
  }
};
