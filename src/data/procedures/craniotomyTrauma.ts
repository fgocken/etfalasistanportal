import { ProcedureDefinition } from '../../types/procedures';

/**
 * Acil Kraniyotomi ve Kraniektomi: Akut Kafa Travması Cerrahisi (Epidural, Subdural Hematom ve Dekompresyon)
 * (Emergency Craniotomy & Decompressive Craniectomy for Traumatic Brain Injury - TBI)
 *
 * Jaffe (6th ed., 2020), Brain Trauma Foundation (BTF 4th ed., Carney et al., Neurosurgery 2017),
 * SIBICC (Hawryluk et al., Intensive Care Med 2019), ATLS (10th ed., 2018),
 * CRASH-1 / CRASH-3, SAFE-TBI, BaSICS, RESCUEicp, PATCH ve PROSPECT Craniotomy (2023)
 * kılavuzları referans alınarak yapılandırılmıştır.
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
    'Refrakter İntrakraniyel Hipertansiyon (Dekompresif Hemikraniektomi): Maksimal medikal tedaviye (sedasyon, ozmotik terapi, kontrollü ventilasyon) rağmen BTF 4. baskı eşiği olan ICP > 22 mmHg üzerinde seyreden difüz aksonal yaralanma ve malign beyin ödemi olguları (RESCUEicp)',
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
      'Antikoagülan Hızlı Geri Çevirme (Reversal): Warfarin için 4-Faktör Protrombin Kompleks Konsantresi (4F-PCC 25-50 IU/kg) + IV K Vitamini (10 mg) İLK TERCİHTİR; Dabigatran için İdarusizumab (Praxbind); Faktör Xa inhibitörleri (Apiksaban/Rivaroksaban) için Türkiye klinik pratiğinde 4-Faktör PCC (25-50 IU/kg) öncelikli geri çevirme stratejisidir (mevcutsa Andexanet Alfa)',
      'Antiagregan Kullanan TBI Olgularında Trombosit Yaklaşımı (PATCH, Lancet 2016): PATCH çalışması spontan intraserebral kanamalarda rutin trombosit transfüzyonunun mortaliteyi artırdığını göstermiştir; travmatik beyin hasarında da rutin profilaktik trombosit transfüzyonu yapılmaz, yalnızca acil kraniyotomiye alınan aktif kanamalı veya trombosit sayısı < 100.000/mm³ olan seçilmiş olgularda trombosit süspansiyonu (ve gerekirse DDAVP 0.3 mcg/kg) bireyselleştirilerek değerlendirilir',
      'Traneksamik Asit (TXA): Travmanın ilk 3 saati içinde başvuran hafif-orta TBI (GKS 9-15 veya reaktif pupilli) olgularında 1 g IV bolus (10 dk) ardından 1 g IV 8 saat infüzyon (CRASH-3 protokolü)',
      'Cerrahi Hemostaz: Bipolar mikronöroşirürji, dural askı dikişleri (tenting sutures), kemik mumu (Bone Wax), FloSeal / Fibrin yapıştırıcı matriksler',
      'Dural Sinüs Yırtığında: Baş elevasyonunun azaltılması, cerrahi alanın derhal steril %0.9 NaCl ile doldurulması (VAE önlemi), doğrudan sinüs sütürü veya kas/fasya grefti ile kompresyon'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Anestezi + Hızlı Seri İndüksiyon (RSI) ve Manuel Hat İçi Servikal Stabilizasyon (MILS): Tüm travma hastaları aksi kanıtlanana kadar TOK (dolu mide) ve SERVİKAL TRAVMALI kabul edilir; videolaringoskop eşliğinde MILS altında başa fleksiyon/ekstansiyon verilmeden entübasyon zorunludur (ATLS 10 / DAS kılavuzlarına göre rutin krikoid bası önerilmez)',
      'Endotrakeal Genel Anestezi (GETA) — TIVA (Propofol veya hemodinamik instabilitede Etomidat/Ketamin indüksiyonu + Fentanil/Remifentanil) ya da Düşük Doz Sevofluran (< 0.5 MAC); N₂O KESİNLİKLE KONTRENDİKEDİR'
    ],
    alternative: [
      'Saf TIVA (Propofol + Remifentanil Hedef Kontrollü İnfüzyon): Hemodinamik olarak resüsite edilmiş, stabil olgularda serebral metabolizma (CMRO2) ve intrakraniyel basıncı (ICP) düşürmek için'
    ],
    clinicalRationale: 'Akut kafa travmalı hastalar dolu mide ve servikal travmalı kabul edildiğinden, aspirasyonu ve sekonder kord hasarını önlemek için MILS altında (rutin krikoid bası uygulanmadan) videolaringoskop ile RSI zorunludur. Serebral perfüzyonu koruyarak CMRO2\'yi düşürmek, normokapniyi (PaCO2 35-38 mmHg) sağlamak ve pnömosefali/pnömotoraks genişlemesini önlemek amacıyla N₂O kullanılmadan TIVA veya düşük doz Sevofluran (< 0.5 MAC) altın standarttır.',
    notes: 'NÖROTRAVMA ANESTEZİSİNİN TEMEL İLKELERİ: (1) Hipotansiyon ve hipoksiden kesin kaçınma (BTF 4. baskı: SBP ≥ 100-110 mmHg, CPP 60-70 mmHg, ICP < 22 mmHg); (2) Kortikosteroid (CRASH-1) ve Albümin (SAFE-TBI) kesin kontrendikasyonu, izole TBI\'da %0.9 NaCl önceliği (BaSICS); (3) N₂O kesin yasağı ve aşırı hiperventilasyondan kaçınma; (4) MILS ile servikal koruma ve rutin krikoid basıdan kaçınma; (5) Dura açılışında ani dekompresyon hipotansiyonu ve kontralateral hematom hazırlığı.',
    rulesTitle: 'NÖROTRAVMA ANESTEZİSİNİN 5 ÖLÜMCÜL KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'HİPOTANSİYON VE HİPOKSİDEN KESİN KAÇINMA (BTF 4. BASKI HEDEFLERİ)',
        content: 'Tek bir hipotansiyon veya hipoksi (SpO2 < %90) atağı travmatik beyin hasarında mortaliteyi ikiye katlar! Hedefler: 50-69 yaşta SBP ≥ 100 mmHg, 15-49 ve ≥ 70 yaşta SBP ≥ 110 mmHg; CPP 60-70 mmHg; ICP < 22 mmHg; SpO2 ≥ %95 ve PaO2 80-120 mmHg.'
      },
      {
        number: 2,
        title: 'KORTİKOSTEROİD (CRASH-1) VE ALBÜMİN (SAFE-TBI) KESİN KONTRENDİKASYONU — %0.9 NaCl ÖNCELİĞİ',
        content: 'BTF Düzey I kanıt (CRASH-1, Lancet 2004): TBI\'da Deksametazon veya Metilprednizolon mortaliteyi artırır, ASLA VERİLMEZ! SAFE-TBI (NEJM 2007): Albümin mortaliteyi artırır, KONTRENDİKEDİR! BaSICS (JAMA 2021) ve SMART verileri gereği izole TBI\'da %0.9 NaCl dengeli kristaloidlere göre daha düşük mortalite ile ilişkilidir; hipotonik ve dekstrozlu sıvılar kesinlikle yasaktır.'
      },
      {
        number: 3,
        title: 'AZOT PROTOKSİT (N₂O) YASAĞI VE KONTROLLÜ NORMOKAPNİ',
        content: 'N₂O; kafa tabanı kırığı, pnömosefali ve eşlik eden pnömotoraksta gaz hacmini hızla genişleterek tansiyon pnömosefali/pnömotoraks ve KİBAS artışına yol açtığından KESİNLİKLE KONTRENDİKEDİR. PaCO2 hedefi 35-38 mmHg olmalıdır; ilk 24 saatte profilaktik derin hiperventilasyon (< 30 mmHg) serebral iskemiyi derinleştirir (yalnızca akut herniasyonda geçici 30-32 mmHg).'
      },
      {
        number: 4,
        title: 'SERVİKAL OMURGA KORUMASI (MILS) VE GÜVENLİ RSI',
        content: 'Aksi radyolojik olarak kanıtlanana kadar tüm kafa travmaları servikal travmalı ve dolu mide kabul edilir. MILS altında videolaringoskop ilk tercihtir; ATLS 10 ve DAS kılavuzları uyarınca rutin krikoid bası laringoskopiyi zorlaştırdığı ve servikal deplasman riski taşıdığı için uygulanmaz.'
      },
      {
        number: 5,
        title: 'DURA AÇILIŞINDA ANİ DEKOMPRESYON HİPOTANSİYONU VE KONTRALATERAL HEMATOM HAZIRLIĞI',
        content: 'Hematom boşaltılıp tamponad kalktığı anda intrakraniyel sempatik baskı düşerek derin vazodilatasyon/hipotansiyon veya karşı tarafta gizli hematom genişlemesi (bulging brain) gelişebilir; Noradrenalin infüzyonu ve hızlı kan ısıtıcı önceden hazır olmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Acil Nöroşirürji Değerlendirmesi: Kranial BT bulguları; hematom lokalizasyonu ve hacmi, orta hat şifti (> 5 mm kritik), bazal sisternaların açıklığı (effacement), kontüzyon odakları, pnömosefali ve kafatası fraktür hatları incelenmelidir.',
      'Travma Ekibi / Genel Cerrahi & Ortopedi Konsültasyonu: Politravma varlığı; eşlik eden pnömotoraks/hemotoraks, intraabdominal kanama (eFAST ultrason ile serbest sıvı tespiti) ve pelvik/femur kırıkları hızla taranmalıdır (kafa içi cerrahi sırasında masif batın içi şok gelişebilir!).',
      'Kan Bankası / Transfüzyon Merkezi: Acil Masif Transfüzyon Protokolünün (MTP) derhal devreye sokulması.'
    ],
    historyAndPhysical: [
      'GCS ve Nörolojik Durum: Travma anındaki ve ameliyathaneye girişteki Glasgow Koma Skoru (GKS), pupil çapları ve ışık refleksleri (anizokori, tek taraflı fiks dilate pupil = uncal herniasyon / acil dekompresyon alarmı).',
      'Travma Mekanizması ve Zamanı: Yüksekten düşme, araç içi/dışı trafik kazası, ateşli silah veya darp; travmadan bu yana geçen süre (CRASH-3 ilk 3 saat penceresi ve lusid interval sorgusu).',
      'Mide Doluluğu: Tüm travma olguları "TAM DOLU MİDE" kabul edilir; aspirasyon riski maksimumdur.',
      'Antikoagülan / Antiagregan Anamnezi: Yaşlı hastalarda Aspirin, Klopidogrel, Warfarin veya DOAK (Apiksaban, Rivaroksaban, Dabigatran) kullanımı derhal sorgulanmalı ve 4F-PCC / spesifik tersine çevirme ajanı hazırlanmalıdır.',
      'Servikal Omurga Durumu: Aksi radyolojik olarak kanıtlanana kadar tüm kafa travmalarında instabil servikal fraktür varsayılır; boyunluk veya MILS korunmalıdır.'
    ],
    laboratoryAndTests: [
      'Acil Kan Grubu ve Cross-Match (0 Negatif acil kan ayrılması).',
      'Hemoglobin / Hematokrit, Trombosit Sayımı, Arteriyel Kan Gazı (Laktat, Baz Açığı ve Glukoz — şokun derinliğini ve glisemik durumu gösterir).',
      'Koagülasyon Paneli: PT/INR, aPTT, Fibrinojen düzeyi (Fibrinojen < 150-200 mg/dL ise fibrinojen konsantresi veya kriyopresipitat endikedir) ve varsa ROTEM / TEG (Tromboelastometri).',
      'Serum Elektrolitleri ve Ozmolalite: Sodyum (Na+ — hipertonik salin öncesi bazal), Potasyum (K+), Kalsiyum (iyonize Ca2+ — masif transfüzyonda sitrat toksisitesini önlemek için > 1.1 mmol/L tutulmalıdır).',
      'Alkol ve Toksikoloji Taraması (bilinç baskılanmasında kafa travması ile toksik etki ayrımı için).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu) Seviyesinde Sıfırlanmış: İdeal olarak indüksiyon öncesi, vaka çok acilse indüksiyonla eşzamanlı takılmalıdır. Doğru Serebral Perfüzyon Basıncı (CPP = MAP_tragus - ICP; hedef 60-70 mmHg) hesabı için tek transdüser Dış Kulak Yolu (Tragus) seviyesinde sıfırlanır.',
      'Sürekli End-Tidal CO2 (EtCO2) ve Sık Seri Arteriyel Kan Gazı (ABG): PaCO2 hedefi 35 - 38 mmHg (Normokapni); ani KİBAS fıtıklaşmasında kemik flep kalkana kadar 30 - 32 mmHg geçici hiperventilasyon; glukoz hedefi 140 - 180 mg/dL.',
      'Geniş Santral Venöz Kateter (CVC) / Hızlı İnfüzyon Kateteri (MAC kateter / 8.5 Fr): Masif transfüzyon ve vazopressör (Noradrenalin) titrasyonu için (kraniyotomi aciliyetini geciktirmeden).',
      'Isı Problu Foley İdrar Sondası: Ozmotik diürez takibi ve sıvı dengesi kontrolü.',
      'Sürekli Isı Monitörizasyonu: Isıtıcı battaniyeler ve sıvı ısıtıcıları ile hipoterminin önlenmesi (hedef 36.0 - 37.0°C; hipotermi < 35°C koagülopatiyi ve mortaliteyi fırlatır!).',
      'İntraoperatif / Postoperatif İntrakraniyel Basınç (ICP) Monitörizasyonu: Parankimal ICP probu veya Eksternal Ventriküler Drenaj (EVD) yerleşimi (BTF 4. baskı tedavi eşiği: ICP > 22 mmHg).'
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
      'İndüksiyon: Hemodinamik instabilitesi olan travma hastalarında Etomidat (0.2 - 0.3 mg/kg) veya Ketamin (1.5 - 2.0 mg/kg) + Fentanil (2 - 3 mcg/kg) + Rokuronyum (1.0 - 1.2 mg/kg RSI dozu). Şoktaki politravma hastalarında derin hipotansiyon yaratabileceği için standart doz Propofolden kaçınılmalıdır.',
      'İdame: TIVA (Düşük doz Propofol infüzyonu + Remifentanil) veya Düşük Doz Sevofluran (< 0.5 MAC). Nöromusküler blokaj idame ettirilir (kemik kaldırılırken ve dura açılırken öksürme/ıkınma herniasyona yol açar).',
      'KESİN KONTRENDİKASYONLAR (TBI):',
      '  - KORTİKOSTEROİD YASAKTIR (CRASH-1, Lancet 2004 — BTF Düzey I): Deksametazon veya Metilprednizolon travmatik beyin hasarında mortaliteyi belirgin artırır; beyin ödemi veya PONV için dahi ASLA verilmez!',
      '  - ALBÜMİN YASAKTIR (SAFE-TBI, NEJM 2007): Hipo-ozmolarite ve artmış ICP nedeniyle TBI\'da mortaliteyi artırır, kesinlikle kontrendikedir!',
      '  - AZOT PROTOKSİT (N₂O) YASAKTIR: Pnömosefali, kafa tabanı kırığı ve pnömotoraksta ölümcül tansiyon genişlemesine ve KİBAS artışına yol açar!',
      'CPP ve Kan Basıncı Hedefleri (BTF 4. Baskı):',
      '  - Serebral Perfüzyon Basıncı (CPP = MAP_tragus - ICP) 60 - 70 mmHg aralığında, ICP < 22 mmHg tutulmalıdır.',
      '  - Sistolik Kan Basıncı: 50-69 yaş hastalarda SBP ≥ 100 mmHg; 15-49 yaş ve ≥ 70 yaş hastalarda SBP ≥ 110 mmHg olmalıdır.',
      '  - Hipotansiyonda beklemeden Noradrenalin infüzyonu ve izotonik sıvı/kan resüsitasyonu başlanmalıdır.',
      'Beyin Ödemi, Ozmotik Tedavi Tavanları ve Sıvı / Glukoz Yönetimi:',
      '  - %3 Hipertonik Salin (2 - 3 mL/kg IV bolus, 15-20 dk): Hipovolemik veya hipotansif travma olgularında İLK TERCİHTİR. Güvenlik tavanı: Serum Na+ < 155 - 160 mEq/L aşılmamalıdır!',
      '  - %20 Mannitol (0.25 - 1.0 g/kg IV): Yalnızca normovolemik ve normotansif olgularda; güvenlik tavanı: Serum Ozmolalitesi < 320 mOsm/L (ozmolal gap < 20) aşılmamalıdır!',
      '  - Sıvı Seçimi (BaSICS JAMA 2021 / SMART): İzole TBI\'da izotonik %0.9 NaCl dengeli kristaloidlere göre daha düşük mortalite ile ilişkilidir ve İLK TERCİHTİR. Hipotonik ve dekstrozlu sıvılar (%5 Dekstroz, Ringer Laktat) kesinlikle kontrendikedir!',
      '  - Glisemik Hedef: Kan glukozu 140 - 180 mg/dL aralığında tutulur; > 180 mg/dL ise IV insülin protokolü başlanır, hipoglisemiden (< 70 mg/dL) kesin kaçınılır.',
      '  - Ventilasyon: PaCO2 35 - 38 mmHg (normokapni); yalnızca akut herniasyon krizinde kemik flep kalkana kadar geçici 30 - 32 mmHg hiperventilasyon.'
    ],
    airwayManagement: [
      'Manuel Hat İçi Eksenel Stabilizasyon (MILS) ile Hızlı Seri İndüksiyon (RSI): Servikal boyunluğun ön kapağı açılır, bir asistan başı ve boynu nötralde iki eliyle sabitler (traksiyon yapmadan, sadece fleksiyon/ekstansiyonu engelleyerek).',
      'Rutin Krikoid Bası (Sellick Manevrası) ÖNERİLMEZ (ATLS 10 / DAS): MILS altında krikoid bası laringoskopik görüşü bozabilir ve servikal omurgayı deplase edebilir; yalnızca seçilmiş durumda uygulanırsa ve görüşü kısıtlarsa derhal serbest bırakılır.',
      'Videolaringoskop (Glidescope / McGrath) İlk Tercihtir: Başa pozisyon vermeden glottik açıklığı doğrudan görerek atravmatik entübasyon sağlar.',
      'Aspirasyon Hazırlığı: Çift geniş lümenli sert Yankauer aspiratör başucunda hazır ve çalışır olmalıdır. Kafa tabanı kırığı şüphesinde nazal entübasyon ve nazogastrik tüp (NGT) yasaktır; sadece oral entübasyon ve orogastrik tüp (OGT) kullanılır.',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Acil Burr-Hole (Trepanasyon): Ameliyathaneye girer girmez herniasyonu kırmak için hızla burr-hole açılıp hematom dekomprese edilebilir.',
      '2. Kemik Flebinin Kaldırılması: Epidural hematom yatağından masif arteryel fışkırma başlayabilir; cerrah hızla pıhtıları aspire eder ve A. meningea media\'yı bipolarla koagüle eder veya kemik foramenine mum basar.',
      '3. Dura Açılışı ve Dekompresyon (Kritik Reperfüzyon Fazı): Dura açıldığı anda intrakraniyel basınç aniden düşer. Bu fazda 3 kritik risk mevcuttur:',
      '   a) Akut Hipotansiyon: İntrakraniyel sempatik baskı aniden kalktığında sistemik vazodilatasyon ve tansiyon çöküşü gelişebilir; vazopressör hazır olmalıdır.',
      '   b) Malign Beyin Şişmesi (Bulging Brain): Dura açılır açılmaz beyin parankimi kemik sınırından dışarı fıtıklaşabilir. Nedenleri: Akut kontralateral hematom gelişimi, derin serebral iskemi veya venöz sinüs obstrüksiyonudur. Anestezi derinliği artırılır, ek hipertonik salin verilir (Na+ < 155-160 mEq/L tavanı gözetilerek) ve cerrah gerekirse kontralateral burr-hole açar.',
      '   c) Kontralateral Hematom Gelişimi: Bir taraftaki hematom boşaltıldığında kafa içi basınç düşer ve karşı taraftaki gizli epidural/subdural hematom açığa çıkarak hızla büyüyebilir.',
      '4. Duraplasti ve Kemik Kararı: Beyin parankimi rahatladıysa kemik flep yerine konur (osteoplastik); beyin ödemli ve pulsatil değilse kemik batına veya doku bankasına saklanarak geniş dekompresif kraniektomi yapılır.'
    ],
    emergenceNotes: [
      'ŞİDDETLİ TBI, ASDH VE DEKOMPRESİF KRANİEKTOMİ HASTALARI AMELİYATHANEDE UYANDIRILMAZ: Preoperatif GKS ≤ 8 olan, akut subdural hematom, yaygın parankimal kontüzyon, belirgin beyin ödemi veya dekompresif kraniektomi uygulanan olgular entübe, sedatize ve mekanik ventilatöre bağlı olarak Nöroşirürji Yoğun Bakım Ünitesine (NYBÜ) transfer edilir.',
      'SEÇİLMİŞ İZOLE KOMPLİKE OLMAYAN AKUT EDH İSTİSNASI: Preoperatif GKS 13 - 15 olan, yaygın beyin ödemi veya ek politravması bulunmayan, komplikasyonsuz izole akut epidural hematom boşaltımı sonrasında cerrahi ekiple ortak karar verilerek ameliyathanede pürüzsüz (smooth) ekstübasyon ve erken nörolojik muayene güvenle değerlendirilebilir.',
      'Transfer Öncesi Stabilizasyon: SBP ≥ 100-110 mmHg (CPP 60-70 mmHg), SpO2 ≥ %95, normokapni (PaCO2 35-38 mmHg), normoglisemi (140-180 mg/dL) ve normotermi sağlandığı doğrulanır; transferde taşınabilir ventilatör, monitör ve vazopressör infüzyonu sürdürülür.',
      'Postoperatif Acil Kontrol Kranial BT: Hasta yoğun bakıma geçmeden önce veya stabil olur olmaz hematom yatağı ve kontralateral kanama kontrolü için Kranial BT\'ye yönlendirilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Sedasyon ve Analjezi Protokolü: Entübe hastalarda sürekli Remifentanil veya Fentanil infüzyonu + Propofol infüzyonu ile hasta-ventilatör uyumu sağlanır ve öksürme/KİBAS pikleri önlenir.',
      'IV Parasetamol (1000 mg 6 saatte bir düzenli) uygulanarak non-opioid bazal analjezi ve ateş kontrolü sağlanır.',
      'NSAİİ\'lar (Deksketoprofen dahil) travmatik kanama ve koagülopati riski nedeniyle; Tramadol ise nöbet eşiğini düşürmesi ve kusma (KİBAS artışı) riski nedeniyle akut TBI\'da KESİNLİKLE KONTRENDİKEDİR.'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi (2023) kılavuzu doğrultusunda elektif/izole EDH ekstübe olgularda skalp lokal infiltrasyonu ve düzenli IV Parasetamol temel non-opioid stratejidir; nörotravmada ICP kontrolü her zaman analjeziden önce gelir ve sedasyon/analjezi nörolojik muayeneyi engellemeyecek şekilde titre edilir.'
    ],
    erasRecommendations: [
      'BTF (4. Baskı) ve SIBICC Nörokritik Bakım Protokolleri:',
      '  - Hedef ICP ve CPP: ICP < 22 mmHg (tedavi eşiği > 22 mmHg) ve CPP 60 - 70 mmHg aralığında tutulmalı; ARDS riskini artıran > 70 mmHg agresif vazopressör zorlamasından kaçınılmalıdır.',
      '  - SIBICC Kademeli ICP Algoritması: Tier 1 (baş 30° elevasyon, derin analjezi/sedasyon, %3 Hipertonik Salin [Na+ < 155-160 mEq/L] veya Mannitol [Osm < 320 mOsm/L], EVD drenajı) → Tier 2 (hafif hipokapni 32-35 mmHg, NMB denemesi, MAP testi) → Tier 3 (barbitürat koması, sekonder dekompresif kraniektomi).',
      '  - Kortikosteroid Kesin Yasağı (CRASH-1 / BTF Düzey I): TBI ödeminde steroid ASLA başlanmaz.',
      '  - Normotermi Hedefi (36.0 - 37.0°C): Ateş (> 37.5°C) nöronal metabolizmayı ve sekonder beyin hasarını katlayarak artırır; agresif antipiretik ve yüzeyel soğutma uygulanmalıdır.',
      '  - Normoglisemi Hedefi: Kan glukoz düzeyi 140 - 180 mg/dL aralığında tutulmalı; hipoglisemiden (< 70 mg/dL) ve laktik asidozu artıran hiperglisemiden (> 180 mg/dL) kaçınılmalıdır.',
      '  - Erken Nöbet Profilaksisi: Travma sonrası ilk 7 günde erken posttravmatik nöbetleri önlemek amacıyla Levetirasetam (500-1000 mg IV 12 saatte bir) uygulanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Craniotomy for Trauma. Philadelphia: Wolters Kluwer.',
    erasReference: 'Carney, N., Totten, A. M., O\'Reilly, C., et al. (2017). Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition. Neurosurgery, 80(1), 6-15. (Brain Trauma Foundation).',
    prospectReference: 'Mestdagh, F., Lavand\'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Hawryluk, G. W. J., Aguilera, S., Buki, A., et al. (2019). A management algorithm for patients with intracranial pressure monitoring: the Seattle International Severe Traumatic Brain Injury Consensus Conference (SIBICC). Intensive Care Medicine, 45(12), 1783-1794.',
      'American College of Surgeons Committee on Trauma. (2018). Advanced Trauma Life Support (ATLS) Student Course Manual (10th ed.). Chicago: American College of Surgeons.',
      'Hutchinson, P. J., Kolias, A. G., Timofeev, I. S., et al. (2016). Trial of Decompressive Craniectomy for Traumatic Intracranial Hypertension (RESCUEicp). New England Journal of Medicine, 375(12), 1119-1130.',
      'Roberts, I., Yates, D., Sandercock, P., et al. (2004). Effect of intravenous corticosteroids on death within 14 days in 10008 adults with clinically significant head injury (MRC CRASH trial): randomised placebo-controlled trial. The Lancet, 364(9442), 1321-1328.',
      'SAFE Study Investigators. (2007). Saline or Albumin for Fluid Resuscitation in Patients with Traumatic Brain Injury (SAFE-TBI). New England Journal of Medicine, 357(9), 874-884.',
      'Zampieri, F. G., Machado, F. R., Biondi, R. S., et al. (2021). Effect of Intravenous Fluid Treatment With a Balanced Solution vs 0.9% Saline Solution on Mortality in Critically Ill Patients (BaSICS). JAMA, 326(9), 818-829.',
      'Baharoglu, M. I., Cordonnier, C., Al-Shahi Salman, R., et al. (2016). Platelet transfusion versus standard care after acute stroke due to spontaneous cerebral haemorrhage associated with antiplatelet therapy (PATCH). The Lancet, 387(10038), 2605-2613.',
      'CRASH-3 trial collaborators. (2019). Effects of tranexamic acid on death, disability, vascular occlusive events and other morbidities in patients with acute traumatic brain injury (CRASH-3). The Lancet, 394(10210), 1713-1723.'
    ]
  }
};
