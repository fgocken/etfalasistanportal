import { ProcedureDefinition } from '../../types/procedures';

/**
 * Dakriyosistorinostomi (DCR): Eksternal ve Endoskopik Endonazal Lakrimal Kese-Burun Anastomozu ve Silikon Tüp İmplantasyonu
 * (Dacryocystorhinostomy [DCR]: External and Endoscopic Endonasal Approach with Bicanalicular Silicone Intubation)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth (2012),
 * POQI / Perioperative Blood Pressure Consensus, Gan et al. 4th PONV Consensus (2020), ASRA 5th Ed. (2025) & PAUSE.
 */
export const dacryocystorhinostomy: ProcedureDefinition = {
  id: 'dacryocystorhinostomy-dcr',
  name: 'Dakriyosistorinostomi (DCR): Eksternal ve Endoskopik Endonazal Gözyaşı Kesesi Cerrahisi',
  shortCode: 'GOZ-DCR',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Lakrimal Cerrahi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Gözyaşı kesesi (saccus lacrimalis) ile nazolakrimal kanal boyunca gelişen tıkanıklıkların, kronik dakriyosistit ataklarının, mukosellerin ve inatçı epiforanın tedavisinde; gözyaşı kesesi ile burun boşluğu (orta mea) arasında kemik pencere (osteotomi) açılarak doğrudan drenaj yolu (anastomoz) oluşturulması ameliyatıdır. İki ana yaklaşımla icra edilir: (1) Eksternal DCR (Toti Prosedürü): Medial kantal insizyon, angular damarların ekartasyonu, kemik osteotomi ve kese-nazal mukoza fleplerinin sütürasyonu; (2) Endoskopik Endonazal DCR: Cilt kesisi olmadan rijit 0°/30° endoskoplarla burun içinden kemik osteotomi ve kese ağızlaştırılması; (3) Bikanaliküler Silikon Tüp İmplantasyonu (Crawford / O\'Donoghue tüpü).',
  indications: [
    'Primer Edinsel Nazolakrimal Kanal Obstrüksiyonu (PANDO): İnatçı epifora',
    'Kronik ve Tekrarlayan Akut Dakriyosistit (akut enfeksiyon/apse yatıştıktan sonra)',
    'Lakrimal Kese Mukoseli ve Dakriyosistolitiazis',
    'Post-Travmatik Nazolakrimal Kanal Tıkanıklıkları (NOE kırıkları sekeli)',
    'Başarısız Sondalama veya DCR Revizyonu'
  ],
  averageDuration: '45 - 90 dakika (Endoskopik DCR: 45-60 dk; Eksternal DCR: 60-75 dk; Septoplasti kombine: 75-100 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 30 - 100 mL (Nazal mukoza, lakrimal kese venöz pleksusu ve kemik osteotomi hattı vaskülerdir; 15-20° baş elevasyonu, güvenli nazal dekonjestan ve Remifentanil kalp hızı kontrolüyle kanama minimalize edilir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Sistemik Kayıp / Ancak Nazofarinkse Kan Aspirasyonu ve Postop Epistaksis Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S opsiyonel; kanama diyatezi veya majör epistaksis öyküsünde kontrol edilir)',
    transfusionProbability: '< %0.05 (İzole DCR\'de transfüzyon gerekmez)',
    criticalBleedingSources: [
      'Nazal Mukoza ve Sfenopalatin Arter Dalları: Orta mea mukozal kanaması',
      'Angular Arter ve Ven: Eksternal DCR insizyonunun hemen medialinde',
      'Anterior Etmoidal Arter: Osteotominin aşırı superior/posteriora uzanmasında (orbital hematom riski!)',
      'Lakrimal Kese Venöz Pleksusu'
    ],
    hemostasisStrategies: [
      'Güvenli Topikal Nazal Dekonjesyon: Ksilometazolin / Oksimetazolin + 1:100.000–1:200.000 Adrenalinli tampon (Rutin %4 Kokain yüksek kardiyak toksisite ve beta-bloker kontrendikasyonu nedeniyle KULLANILMAZ!)',
      'Lokal İnfiltrasyon: İnsizyon/osteotomi hattına 1:100.000–1:200.000 Adrenalinli Lidokain (negatif aspirasyon + EKG/KB izlemi)',
      'Kansız Saha Fizyolojisi: 15-20° Reverse Trendelenburg + Normokapni + Remifentanil ile kalp hızı kontrolü (55-65/dk) + Bazal MAP\'ın en fazla %20-25 altına inen güvenli perfüzyon',
      'Bipolar wet-field koter, kemik mumu ve gerekirse İV Traneksamik Asit (1 g)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi (GETA — Propofol + Remifentanil TIVA) + Oral RAE / Spiralli Kaflı Tüp + Boğaz Tamponu (Throat Pack) + 15-20° Reverse Trendelenburg + Pürüzsüz Uyanık Ekstübasyon — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'İnfratroklear / İnfraorbital Sinir Blokları + Nazal Topikal Anestezi + Minimal MAC: Genel anestezi riski aşırı yüksek seçilmiş eksternal DCR olgularında (nazofarinkse kan akışı nedeniyle aspirasyon riski çok yüksek dikkat gerektirir)',
      'Laringeal Maske (LMA): Burun içi kanama ve yıkama sıvısının hava yoluna sızma riski nedeniyle standart DCR\'de ÖNERİLMEZ (kaflı ETT + boğaz tamponu standarttır)'
    ],
    clinicalRationale: 'Osteotomi ve nazal mukoza flebi sırasında posterior nazofarinkse sürekli kan ve irrigasyon sıvısı aktığından aspirasyon ve laringospazmı önlemek, ayrıca Propofol + Remifentanil TIVA ile düşük kalp hızı ve kansız endoskopik görüş sağlamak için kaflı ETT + nemli boğaz tamponu ile GETA altın standarttır.',
    rulesTitle: 'DAKRİYOSİSTORİNOSTOMİDE (DCR) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'DCR\'de hayati kurallar: (1) Boğaz tamponu zorunluluğu ve ekstübasyon öncesi direkt görüşle çıkarma teyidi; (2) Güvenli nazal dekonjestan (Ksilometazolin + Adrenalin) — Kokain + Saf Beta-Bloker ölümcül etkileşim uyarısı!; (3) Güvenli hemodinami (Sabit MAP 60-70 YASAK → Bazal MAP −%20-25 tabanı, hipertansifte ≥70-80 mmHg + HR 55-65/dk); (4) Kornea kalkanı ve medial kantus eksplorasyonu güvenliği; (5) Pürüzsüz uyanık ekstübasyon, çift PONV ve Tramadol/Kodein yasağı.',
    indispensableRules: [
      {
        number: 1,
        title: 'BOĞAZ TAMPONU (THROAT PACK) GÜVENLİĞİ VE ÇIKARMA TEYİDİ PROTOKOLÜ',
        content: 'Osteotomi ve nazal mukoza açıldığında arka nazofarinkse sürekli kan ve kemik tozu sızar. Entübasyon sonrası yerleştirilen nemli boğaz tamponu anestezi formuna ve ameliyathane tahtasına görünür biçimde kaydedilir (tüp üzerinde uyarı etiketi). Ekstübasyon öncesi direkt laringoskopiyle farenks kontrol edilir, aspire edilir ve boğaz tamponunun çıkarıldığı cerrahla karşılıklı sesli teyit edilir — unutulan boğaz tamponu ölümcül hava yolu obstrüksiyonu (never-event) yaratır!'
      },
      {
        number: 2,
        title: 'NAZAL DEKONJESTAN GÜVENLİĞİ: KOKAİN + SAF BETA-BLOKER (ESMOLOL) ÖLÜMCÜL ETKİLEŞİMİ!',
        content: 'Rutin nazal dekonjesyonda %4 Kokain yerine güvenli Ksilometazolin / Oksimetazolin + 1:100.000–1:200.000 Adrenalin kullanılır. Adrenalin emilimine bağlı taşikardi/hipertansiyon piki izlenir. KRİTİK FARMAKOLOJİ UYARISI: Eğer cerrahi ekip tarafından topikal Kokain kullanılmışsa, kokain kaynaklı hipertansiyon/taşikardide SAF BETA-BLOKER (Esmolol, Metoprolol, Propranolol) KESİNLİKLE KONTRENDİKEDİR (karşılanmamış α-adrenerjik vazokonstriksiyon → malign hipertansiyon, koroner vazospazm ve MI!). Kokain maruziyetinde yalnızca direkt vazodilatör (Nikardipin, NTG veya Fentolamin) + derin anestezi / benzodiazepin uygulanır!'
      },
      {
        number: 3,
        title: 'GÜVENLİ KANSIZ SAHA HEMODİNAMİSİ: SABİT "MAP 60–70" YERİNE BAZAL MAP −%20–25 TABANI!',
        content: 'DCR hastaları çoğunlukla ileri yaşlı ve kronik hipertansiftir. Sabit MAP 60-70 mmHg hedeflemek hipertansif hastada perioperatif inme, MINS, AKI ve iskemik optik nöropati (İON) yaratır! Altın kural: BAZAL MAP\'IN %20–25 ALTINA İNİLMEZ (sağlıklı gençte MAP 65-75 mmHg; ileri yaş/hipertansifte ≥70-80 mmHg). Kansız endoskopik görüş için asıl silahlar: 15-20° Reverse Trendelenburg + sıkı normokapni + Propofol/Remifentanil TIVA ile kalp hızının 55-65/dk tutulmasıdır.'
      },
      {
        number: 4,
        title: 'KORNEA GÜVENLİĞİ VE MEDİAL KANTUS EKSPLORASYONUNDA SIFIR GLOB BASISI',
        content: 'Eksternal DCR\'de medial kantal ekartasyon ve endoskopik DCR\'de Bowman probları/silikon tüpler korneanın hemen yanındadır. Antibiyotikli pomad ile kornea kalkanı (Corneal Shield) yerleştirilir, glob basısı sıfır tutulur ve kapanışta kalkanın çıkarıldığı teyit edilir.'
      },
      {
        number: 5,
        title: 'PÜRÜZSÜZ UYANIK EKSTÜBASYON, ÇİFT PONV VE TRAMADOL / KODEİN YASAĞI',
        content: 'Uyanmada öksürme, ıkınma veya kusma nazal venöz pleksusları patlatarak masif epistaksis ve medial kantal/orbital hematom yaratır! İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil (0.03-0.05 mcg/kg/dk) + Sugammadeks (TOF ≥0.9) + çiftli PONV profilaksisi (Deksametazon + Ondansetron) ile pürüzsüz uyanık ekstübasyon yapılır. Postop TRAMADOL ve KODEİN KULLANILMAZ; 10-14 gün burun sümkürme kesinlikle yasaklanır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Lakrimal lavaj/sondalama, kese boyutu ve cerrahi yaklaşım seçimi (eksternal vs. endoskopik).',
      'KBB Konsültasyonu (Endonazal DCR\'de): Septum deviasyonu, konka hipertrofisi veya eşzamanlı sinüzit değerlendirmesi.',
      'Kardiyoloji (Klinik Endikasyonda): İleri yaş hipertansif/KAH hastalarında bazal KB teyidi (kontrollü hipotansiyon tabanı için) ve adrenalin güvenliği.',
      'Anestezi Değerlendirmesi: Hava yolu, epistaksis/kanama öyküsü ve boğaz tamponu güvenlik planı.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan Yönetimi (ASRA 2025 & PAUSE): Nazal mukozal/osteotomi kanaması ve epistaksis riski nedeniyle DOAC\'lar genelde 48 sa (Dabigatran CrCl <50\'de 96 sa), Warfarin 5 gün (INR <1.5) önce kesilir ve RUTİN KÖPRÜLEME YAPILMAZ (yüksek tromboembolik riskli olgular bireyselleştirilir; bkz. #infografik=antithrombotic-matrix).',
      'Aktif Akut Dakriyosistit / Apse: Akut selülit ve apse varken elektif DCR yapılmaz; önce sistemik antibiyotik ile yatıştırılır.',
      'Bazal Hipertansiyon Değerleri ve Tekrarlayan Epistaksis Öyküsü.'
    ],
    laboratoryAndTests: [
      'Klinik Endikasyon Bazlı Laboratuvar: Genel anestezi alacak ileri yaş/komorbid hastalarda TKS, böbrek fonksiyonu/elektrolitler; antikoagülan veya epistaksis öyküsü varsa PT/INR/aPTT; kardiyak öyküde 12 derivasyonlu EKG.',
      'Gereğinde Paranazal Sinüs / Lakrimal Sistem BT.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (adrenalin taşiaritmi ve iskemi takibi), SpO₂, NIBP (2-3 dk arayla; yüksek riskli KAH/hipertansifte arteriyel kanülasyon), EtCO₂ ve Sıcaklık.',
      'Kantitatif Nöromusküler Monitörizasyon (TOF): Mikrotur/osteotomi sırasında hareketsizlik; ekstübasyonda TOF ≥0.9.',
      'EtCO₂ Takibi: Sıkı normokapni (EtCO₂ 35-38 mmHg — hiperkapni mukozal vazodilatasyon ve kanamayı artırır!).'
    ],
    vascularAccess: [
      '1-2 adet geniş lümenli periferik IV damar yolu (18G).',
      'Acil Hemodinami İlaçları: İV Esmolol / Labetalol (YALNIZCA kokainsiz adrenalin pikinde!), İV Nikardipin (kokain maruziyeti şüphesinde 1. tercih!), İV Atropin (0.5 mg) ve İV Lidokain hazır.'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, 15-20° Reverse Trendelenburg ve Sabit Baş',
    patientPositionDetails: [
      'Baş silikon donut yastıkla nötral sabitlenir; jugüler bası engellenir.',
      '15-20° Reverse Trendelenburg eğimi nazal venöz göllenmeyi ve kanamayı dramatik biçimde azaltır.',
      'Eksternal DCR\'de kornea kalkanı (Corneal Shield) yerleştirilir; anestezi devresi cerrahi sahanın karşı tarafına sabitlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - Propofol (1.5-2.5 mg/kg) + Remifentanil (0.1-0.2 mcg/kg/dk) veya Fentanil + Rokuronyum (0.6 mg/kg).',
      '  - Oral RAE (güney-kutuplu) veya spiralli kaflı ETT ile entübasyon.',
      '  - ENTÜBASYON SONRASI HEMEN: Nemli Boğaz Tamponu (Throat Pack) yerleştirilir, anestezi formuna ve salon tahtasına kaydedilir.',
      'İdame ve Kansız Saha Yönetimi:',
      '  - Propofol + Remifentanil TIVA (volatil vazodilatasyonunu önleyerek sinonasal/DCR sahasında en iyi görüşü ve en düşük PONV\'yi sağlar!).',
      '  - Hemodinamik Hedef: Kalp hızı 55-65/dk; MAP bazalin en fazla %20-25 altında (sağlıklı gençte 65-75 mmHg; kronik hipertansif/ileri yaşta ≥70-80 mmHg — sabit MAP 60 YASAK!).',
      '  - Topikal Dekonjestan: Ksilometazolin/Oksimetazolin + 1:100.000–1:200.000 Adrenalin uygulanırken EKG/KB yakın izlenir (Kokain kullanılmışsa saf beta-bloker KESİN YASAK!).',
      '  - İV Traneksamik Asit (1 g, kontrendikasyon yoksa) mukozal kanamayı anlamlı azaltabilir.'
    ],
    airwayManagement: [
      'Oral RAE veya spiralli kaflı ETT + nemli boğaz tamponu altın standarttır.',
      'Ekstübasyon öncesi direkt laringoskopi ile boğaz tamponu çıkarılır (cerrahla sesli teyit!), farenks ve mideye sızmış kan nazikçe aspire edilir.'
    ],
    criticalSurgicalStages: [
      '1. Entübasyon, Boğaz Tamponu Yerleştirilmesi (Tahtaya Kayıt!) ve 15-20° Ters Trendelenburg.',
      '2. Güvenli Topikal Nazal Dekonjesyon (Ksilometazolin + Adrenalin — EKG/KB izlemi!).',
      '3. Sulu %5 Povidon-İyot ve Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '4. Cilt İnsizyonu (Eksternal) veya Endoskopik Nazal Mukozal Flep Disseksiyonu.',
      '5. Kemik Osteotomi (Mikrotur / Kerrison punch — kansız saha ve hareketsizlik!).',
      '6. Lakrimal Kesenin Açılması ve Kese-Nazal Mukoza Fleplerinin Oluşturulması.',
      '7. Bikanaliküler Silikon Tüp (Crawford) İmplantasyonu ve Anastomoz.',
      '8. Hemostaz, Kornea Kalkanının Çıkarılma Teyidi, Nazal Tampon ve Boğaz Tamponu Çıkarma Teyidi!'
    ],
    emergenceNotes: [
      'BOĞAZ TAMPONU ÇIKARMA TEYİDİ (ZORUNLU): Ekstübasyondan hemen önce farenks direkt laringoskopiyle kontrol edilir, aspire edilir ve boğaz tamponunun çıktığı cerrahla sesli teyit edilir.',
      'Pürüzsüz Uyanık Ekstübasyon: İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil (0.03-0.05 mcg/kg/dk) + Sugammadeks (TOF ≥0.9) ile öksürük, ıkınma ve hipertansiyon piki önlenir.',
      'Çiftli PONV Profilaksisi: İV Deksametazon (4-8 mg) + Ondansetron (4 mg) eksiksiz uygulanır.',
      'Hastaya burnunu en az 10-14 gün kesinlikle sümkürmemesi ve ağız açık hapşırması tembihlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'DCR sonrası ağrı genellikle hafif-orta düzeydedir (burun kökü ve medial kantusta dolgunluk/sızı).',
      'Temel Analjezi: İntraoperatif lokal infiltrasyon + düzenli İV/Oral Parasetamol (1000 mg 6 saatte bir).',
      'KAÇINILACAK AJANLAR: TRAMADOL ve KODEİN yüksek PONV riskiyle öğürme/kusma ve masif epistaksisi tetikleyebileceğinden rutin analjezide KULLANILMAZ! Şiddetli kurtarma ağrısında mikro-doz titre İV Fentanil (25 mcg) + ek antiemetik kullanılır.',
      'Erken dönemde epistaksis riskini artıran aspirin ve agresif antiplatelet NSAİİ\'lerden kaçınılır; burun köküne aralıklı soğuk kompres uygulanır.'
    ],
    prospectRecommendations: [
      'Lakrimal / DCR cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; 4th PONV Consensus (2020) ve sinonasal/oküloplastik anestezi literatürü doğrultusunda:',
      '  - Propofol TIVA + lokal infiltrasyon + Parasetamol + çiftli antiemetik profilaksisi (Deksametazon + Ondansetron), hem intraoperatif görüşü hem de postop epistaksissiz konforu maksimize eder.'
    ],
    erasRecommendations: [
      'DCR Perioperatif İyileşme İlkeleri:',
      '  - Seçilmiş olgularda günübirlik (PADSS ≥9) veya 1 gece gözlem.',
      '  - Baş 30-45° Elevasyonu: İlk 48 saat nazal venöz basıncı ve epistaksis riskini azaltır.',
      '  - Sümkürme Yasağı (10-14 gün): Retrograd orbital amfizem ve hematom riskini önlemek için burun sümkürülmez, hapşırırken ağız açık tutulur; nazal salin spreyi kullanılır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Dacryocystorhinostomy (External and Endonasal). Wolters Kluwer / LWW.',
    erasReference: 'Athanasiadis T, Beule A, Embate J, Steinmeier E, Field J, Wormald PJ. Standardized video-endoscopy and surgical field grading scale for endoscopic sinus surgery: a multi-centre study (TIVA vs volatile & HR control). Laryngoscope. 2008.',
    prospectReference: 'DCR cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve PONV yaklaşımı 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'Sessler DI, Bloomstone JA, Aronson S, et al. Perioperative Quality Initiative consensus statement on intraoperative blood pressure, risk and outcomes for elective surgery. Br J Anaesth. 2019;122(5):563-574.',
      'Richards JR, Garber D, Laurin EG, et al. Treatment of cocaine cardiovascular toxicity: a systematic review (unopposed alpha stimulation warning with pure beta-blockers). Clin Toxicol. 2016;54(5):345-364.',
      'Douketis JD, Spyropoulos AC, Duncan J, et al. Perioperative Management of Patients With Atrial Fibrillation Receiving a Direct Oral Anticoagulant (PAUSE Study). JAMA Intern Med. 2019;179(11):1469-1478.',
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.'
    ]
  }
};
