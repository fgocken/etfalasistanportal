import { ProcedureDefinition } from '../../types/procedures';

/**
 * Enükleasyon, Eviserasyon ve Orbital Ekzenterasyon
 * (Enucleation, Evisceration and Orbital Exenteration)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth (2012),
 * Gan et al. 4th PONV Consensus (2020), ASRA 5th Ed. (2025) & PAUSE, POQI Blood Pressure Consensus.
 */
export const enucleationEviscerationExenteration: ProcedureDefinition = {
  id: 'enucleation-evisceration-exenteration',
  name: 'Enükleasyon, Eviserasyon ve Orbital Ekzenterasyon Cerrahisi',
  shortCode: 'GOZ-ENUK-EVIS',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Orbita & Onkolojik Göz Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Görme potansiyelini tamamen yitirmiş ağrılı gözlerin, ağır enfeksiyonların veya hayatı tehdit eden göz içi/orbital malignitelerin cerrahi olarak çıkarıldığı üç farklı kapsamda girişimdir: (1) Eviserasyon: Skleral kılıf ve ekstraoküler kas insersiyonları korunarak yalnızca kornea ve göz içi dokuların (üvea, lens, vitreus, retina) boşaltılması ve sklera içine orbital implant yerleştirilmesi (endoftalmi veya travmada; göz içi malignitede KONTRENDİKEDİR!); (2) Enükleasyon: Ekstraoküler kaslar ve optik sinir kesilerek tüm göz küresinin bütün olarak çıkarılması ve orbital implant (hidroksiapatit/poröz polietilen/akrilik) yerleştirilmesi (uveal melanom, retinoblastom, sempatik oftalmi önlemi); (3) Orbital Ekzenterasyon: İleri invaziv orbital malignitelerde göz küresi, ekstraoküler kaslar, orbital yağ, periorbita ve gerektiğinde kapaklar ile komşu kemik duvarların radikal olarak çıkarılması.',
  indications: [
    'Göz İçi Maligniteler: İleri evre uveal melanom veya göz koruyucu tedaviye yanıtsız retinoblastom (Enükleasyon)',
    'Ağrılı Kör Göz (Phthisis Bulbi / Neovasküler Glokom): Medikal tedaviye dirençli şiddetli oküler ağrı (Eviserasyon veya Enükleasyon)',
    'Ağır Destrüktif Oküler Travma: Onarılamayan glob parçalanması (sempatik oftalmi riskini azaltmak için ilk 14 gün içinde enükleasyon/eviserasyon)',
    'Tedaviye Yanıtsız Panoftalmi / Endoftalmi (Eviserasyon)',
    'İleri İnvaziv Orbital / Periorbital Maligniteler: İnvaziv SCC, BCC, sebase karsinom, adenoid kistik karsinom veya mukormikozis (Orbital Ekzenterasyon)'
  ],
  averageDuration: '60 - 210 dakika (Eviserasyon / Enükleasyon + İmplant: 60-90 dk; Radikal Orbital Ekzenterasyon + Flep/Greft: 120-210 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: 'Eviserasyon/Enükleasyon: 20 - 80 mL · Orbital Ekzenterasyon: 200 - 600+ mL (oftalmik arter/ven, etmoidal damarlar ve kemik rezeksiyonundan anlamlı kanama!)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Eviserasyon/Enükleasyonda Düşük-Orta · Orbital Ekzenterasyonda Yüksek Kanama Riski',
    crossMatchRequirement: 'Enükleasyon/Eviserasyon: T&S opsiyonel · Orbital Ekzenterasyon: 2 Ünite ES Cross-Match hazır bulundurulmalıdır',
    transfusionProbability: 'Enükleasyon/Eviserasyon: <%1 · Orbital Ekzenterasyon: %10 - %25',
    criticalBleedingSources: [
      'Oftalmik Arter ve Santral Retinal Arter (optik sinir kesisi anında derin orbital arteriyel kanama!)',
      'Anterior ve Posterior Etmoidal Arterler ile Supraorbital/İnfraorbital Damarlar (ekzenterasyon)',
      'Kavernöz Sinüs / Superior Oftalmik Ven Bağlantıları (apikal tümör diseksiyonunda venöz kanama ve VAE riski!)'
    ],
    hemostasisStrategies: [
      'Optik sinir kesisinden sonra sıcak salin kompres, hemostatik matriks (Surgicel/Floseal) ve bipolar koter',
      '15-20° Reverse Trendelenburg + Normokapni + normotansif/hafif kontrollü hemodinami (bazal MAP −%20 tabanı)',
      'Orbital ekzenterasyonda İV Traneksamik Asit (1 g) ve 2 geniş lümenli IV yol'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA — Propofol + Remifentanil TIVA) + Spiralli / Oral RAE ETT + Preemptif Peribulber / Sub-Tenon / Retrobulber Blok (tümör yoksa!) + Çiftli PONV Profilaksisi — ALTIN STANDARTTIR'
    ],
    alternative: [
      'Ağır Komorbiditesi Olan Seçilmiş Erişkin Eviserasyon Olgularında: Derin Peribulber/Retrobulber Blok + MAC (ancak psikolojik travma ve yoğun ağrı/OCR nedeniyle hastaların büyük çoğunluğunda genel anestezi tercih edilir)',
      'UYARI: Göz içi malignite (uveal melanom, retinoblastom) veya açık travmatik globda iğneli retrobulber blok tümör ekimi/glob rüptürü riski nedeniyle CERRAH TEYİDİ OLMADAN YAPILMAZ (kapanışta doğrudan görüş altında orbita içi lokal infiltrasyon/kateter uygulanabilir)!'
    ],
    clinicalRationale: 'Enükleasyon, eviserasyon ve ekzenterasyon göz cerrahisinin en ağrılı (yüksek postop ağrı + yüksek PONV) ve en derin Okülokardiyak Refleks (optik sinir ve 4 rektus kesisi!) yaratan ameliyatlarıdır. Propofol TIVA + preemptif/kapanış rejyonel lokal blok + çiftli antiemetik profilaksisi ve güçlü psikolojik destek altın standarttır.',
    rulesTitle: 'ENÜKLEASYON, EVİSERASYON & EKZENTERASYONDA ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Bu ameliyatlarda hayati kurallar: (1) YANLIŞ TARAF CERRAHİSİ NEVER-EVENT ÖNLEMİ (çift bağımsız doğrulama + ameliyat öncesi göz muayenesi); (2) Optik sinir ve 4 rektus kesisinde ani derin OCR / ASİSTOLİ alarmı; (3) Şiddetli postop ağrı ve yüksek PONV → Propofol TIVA + preemptif/kapanış lokal blok + multimodal analjezi (Tramadol/Kodein YASAK); (4) Fantom göz ağrısı ve psikolojik/empatik yaklaşım; (5) Ekzenterasyonda yüksek kanama, 2 büyük IV, invaziv arter ve kafa tabanı/BOS kaçağı hazırlığı; (6) Antitrombotik yönetim (ASRA 2025 / PAUSE).',
    indispensableRules: [
      {
        number: 1,
        title: 'YANLIŞ GÖZ (WRONG-SITE) NEVER-EVENT ÖNLEMİ — MUTLAK ÇİFT DOĞRULAMA!',
        content: 'Gözün geri dönüşümsüz olarak çıkarıldığı bu ameliyatta yanlış taraf cerrahisi tıbbın en yıkıcı "never-event" felaketidir! WHO Time-Out aşamasında hasta uyanıkken (veya ebeveynle) işaretlenen taraf, dosya/MRG/USG ve oftalmoskopik bulgu en az İKİ bağımsız hekim (cerrah + anestezi) tarafından sesli doğrulanmadan indüksiyona veya kesiye KESİNLİKLE başlanmaz.'
      },
      {
        number: 2,
        title: 'OPTİK SİNİR KESİSİ VE DÖRT REKTUS TRAKSİYONUNDA ANİ DERİN OCR / ASİSTOLİ!',
        content: 'Dört rektus kasının askıya alınması ve optik sinirin enükleasyon makası/snare ile kesilmesi anında çok şiddetli trigemino-vagal refleks (CN V₁ → CN X) ani derin bradikardi veya ASİSTOLİ tetikleyebilir! Cerrah optik siniri kesmeden önce anesteziye sesli uyarı vermeli; EKG sesli nabız açık ve İV Atropin (erişkin 0.5 mg / pediatrik 0.02 mg/kg) enjektörde çekili olmalıdır.'
      },
      {
        number: 3,
        title: 'ŞİDDETLİ POSTOP AĞRI & YÜKSEK PONV: PREEMPTİF BLOK + PROPOFOL TIVA + ÇİFT ANTİEMETİK',
        content: 'Enükleasyon ve eviserasyon göz cerrahisinin en ağrılı ameliyatlarıdır (derin orbital implant gerginliği!). Preemptif (veya malignitede glob çıkarıldıktan sonra doğrudan görüş altında) uzun etkili lokal anestezik bloğu (Ropivakain/Bupivakain) + Propofol TIVA + İV Deksametazon + Ondansetron + Parasetamol hem ağrıyı hem de kusmayı dramatik azaltır. Kusmayı tetikleyen TRAMADOL ve KODEİN rutin kullanılmaz!'
      },
      {
        number: 4,
        title: 'FANTOM GÖZ SENDROMU VE PSİKOLOJİK / EMPATİK YAKLAŞIM',
        content: 'Göz kaybı ağır psikolojik yas ve %20-40 oranında fantom göz ağrısı/görsel halüsinasyonlar yaratabilir. Etkin preemptif rejyonel/multimodal analjezi (gereğinde Gabapentinoid/düşük doz Ketamin adjuvanı ekzenterasyonda) santral sensitizasyonu ve kronik fantom ağrısını azaltır; derlenme ve serviste empatik iletişim esastır.'
      },
      {
        number: 5,
        title: 'ORBİTAL EKZENTERASYONDA KANAMA, İNVAZİV ARTER VE BOS KAÇAĞI / VAE HAZIRLIĞI',
        content: 'Radikal ekzenterasyon majör baş-boyun onkolojik cerrahisidir: 2 adet 16-18G IV yol, 2 Ünite ES Cross-Match, invaziv arter monitörizasyonu, İV Traneksamik Asit (1 g), normotermi ve orbita tavanı/sfenoid kemik rezeksiyonunda BOS kaçağı veya venöz hava embolisi (VAE) uyanıklığı gerektirir.'
      },
      {
        number: 6,
        title: 'ANTİTROMBOTİK YÖNETİM (ASRA 2025 / PAUSE) VE BASKILI PANSUMAN FARKI',
        content: 'Yüksek kanama riskli kapalı/derin orbital cerrahi olduğu için DOAC\'lar 48 sa (Dabigatran CrCl <50\'de 96 sa), Warfarin 5 gün (INR <1.5) önce kesilir ve rutin köprüleme YAPILMAZ (bkz. #infografik=antithrombotic-matrix). Orbitotomiden farklı olarak, göz küresi çıkarıldığı için enükleasyon/eviserasyon sonrası kanamayı ve ödemi önlemek amacıyla cerrah tarafından soket üzerine kontrollü baskılı pansuman uygulanabilir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküler Onkoloji & Orbita: Kesin endikasyon, taraf doğrulaması, malignite evrelemesi (MRG/BT), implant planı ve ekzenterasyonda serbest/lokal flep için Plastik Cerrahi/KBB koordinasyonu.',
      'Kardiyoloji / Onkoloji / Pediatri (Klinik Endikasyonda): Retinoblastom çocuklarda önceki kemoterapi kardiyotoksisitesi/anemi; yaşlı ekzenterasyon hastalarında kardiyopulmoner rezerv.',
      'Anestezi Değerlendirmesi: Taraf işareti teyidi, antitrombotik kesim takvimi, kan hazırlığı (ekzenterasyon) ve multimodal analjezi/PONV planı.'
    ],
    historyAndPhysical: [
      'Kesin Taraf ve Onam Doğrulaması: Çıkarılacak gözün klinik bulgusuyla (kör/tümörlü göz) tam uyumu.',
      'Antikoagülan / Antiagregan Yönetimi (ASRA 2025 & PAUSE).',
      'Önceki Kemoterapi / Radyoterapi (retinoblastom, melanom, SCC — zor havayolu/doku frajilitesi) ve Ağrı/Anksiyete Düzeyi.'
    ],
    laboratoryAndTests: [
      'Enükleasyon/Eviserasyon: Klinik endikasyona göre TKS, koagülasyon (antikoagülan varsa), biyokimya ve kardiyak öyküde EKG.',
      'Orbital Ekzenterasyon: TKS, koagülasyon, böbrek/karaciğer fonksiyonları, elektrolitler, 12 derivasyonlu EKG ve 2 Ünite ES Cross-Match.',
      'Güncel Orbita / Beyin MRG ve BT.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (sesli nabız açık — optik sinir kesisinde OCR/asistoli alarmı!), SpO₂, EtCO₂, NIBP ve Core Sıcaklık.',
      'Orbital Ekzenterasyonda: İnvaziv Arter Basıncı (Radial), idrar çıkışı (Foley) ve uzun vakada seri Hb/AKG takibi.',
      'Kantitatif TOF Monitörü.'
    ],
    vascularAccess: [
      'Enükleasyon/Eviserasyon: 1-2 adet 18-20G IV yol.',
      'Orbital Ekzenterasyon: 2 adet 16-18G geniş lümenli IV yol + 20G Radial Arter Hattı.',
      'Acil OCR Kiti MASADA ÇEKİLİ: İV Atropin (erişkin 0.5 mg / pediatrik 0.02 mg/kg).'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, 15-20° Ters Trendelenburg ve Sabit Baş',
    patientPositionDetails: [
      'Baş silikon donut yastıkla nötral sabitlenir; 15-20° ters Trendelenburg orbital venöz kanamayı azaltır.',
      'Ekzenterasyonda uzun süre için bası noktası koruması, aktif ısıtıcı battaniye ve DVT pnömatik kompresyon çorapları kullanılır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - Propofol (1.5-2.5 mg/kg) + Remifentanil veya Fentanil + Rokuronyum (0.6 mg/kg).',
      '  - Spiralli veya Oral RAE kaflı ETT.',
      'İdame:',
      '  - Propofol + Remifentanil TIVA (en düşük PONV riski ve derin analjezi kontrolü!).',
      '  - Sıkı normokapni (EtCO₂ 35-38 mmHg) ve bazal MAP −%20 tabanı içinde stabil hemodinami.',
      '  - OPTİK SİNİR KESİSİ ANINDA: Cerrahla sözel teyit → EKG yakın izlem → bradikardide cerrahı durdur + gerekirse İV Atropin.',
      '  - Analjezi Paketi: İV Parasetamol (1 g / ped 15 mg/kg) + İV Deksametazon (4-8 mg) + (malignite yoksa preemptif, malignite varsa glob çıkarıldıktan sonra cerrah tarafından doğrudan görüş altında) uzun etkili lokal anestezik (Ropivakain %0.5 / Bupivakain %0.5) infiltrasyonu ± ekzenterasyonda subanestezik Ketamin (0.25-0.5 mg/kg bolus).',
      '  - Çiftli PONV Profilaksisi: Deksametazon + Ondansetron (4 mg; ped 0.1 mg/kg).'
    ],
    airwayManagement: [
      'Spiralli veya Oral RAE kaflı ETT; ekzenterasyonda maksillektomi/flep kombineyse hava yolu ekibiyle tüp yönlendirmesi (kontralateral/submental/trakeostomi gereksinimi) önceden planlanır.'
    ],
    criticalSurgicalStages: [
      '1. WHO ÇİFT BAĞIMSIZ TARAF DOĞRULAMASI (NEVER-EVENT ÖNLEMİ!) ve 15-20° Baş Elevasyonu.',
      '2. Konjonktival Peritomi ve Dört Rektus Kasının Askıya Alınması (OCR Alarmı!).',
      '3. Eviserasyonda: Kornea eksizyonu ve üvea/glob içeriğinin tam temizlenmesi.',
      '4. Enükleasyonda: OPTİK SİNİRİN KESİLMESİ (DERİN OCR / ASİSTOLİ + OFTALMİK ARTER KANAMASI!).',
      '5. Hemostaz (Sıcak salin kompres + bipolar + hemostatik matriks) ve Orbital İmplant Yerleştirilmesi.',
      '6. Ekzenterasyonda: Periorbita sıyrılması, apeks kesisi (kanama/BOS kontrolü) ve greft/flep rekonstrüksiyonu.',
      '7. Doğrudan Görüş Altında Uzun Etkili Lokal Anestezik İnfiltrasyonu, Kapanış ve Kontrollü Soket Pansumanı.'
    ],
    emergenceNotes: [
      'Pürüzsüz Uyanık Ekstübasyon: İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil + Sugammadeks (TOF ≥0.9) ile öksürük/hipertansiyon kaynaklı soket hematomu önlenir.',
      'Derlenme odasında şiddetli ağrı ve PONV için erken kurtarma analjezisi ve sakin, empatik destek sağlanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Enükleasyon ve eviserasyon sonrası ilk 24-48 saatte ORTA-ŞİDDETLİ derin orbital ağrı sıktır!',
      'Multimodal Analjezi Planı: İntraoperatif uzun etkili lokal blok/infiltrasyon + düzenli İV/Oral Parasetamol (1000 mg 6 sa) + kontrendikasyon yoksa (hemostaz güvenli olduğunda) kısa süreli NSAİİ.',
      'Şiddetli Kurtarma Ağrısı: Mikro-doz titre İV Fentanil (25 mcg) veya kısa süreli İV Morfin/Oksikodon (ek antiemetikle birlikte) — yüksek PONV yapan TRAMADOL ve pediatrik/OSA kontrendike KODEİN rutin tercih edilmez.',
      'Kronik Fantom Göz Ağrısı Riski: Nöropatik karakterli ağrı gelişirse erken Gabapentin/Pregabalin ve psikolojik destek değerlendirilir.'
    ],
    prospectRecommendations: [
      'Enükleasyon/eviserasyon için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; 4th PONV Consensus (2020) ve oftalmik anestezi literatürü doğrultusunda:',
      '  - İntraoperatif orbital/retrobulber uzun etkili lokal anestezik (Ropivakain/Bupivakain) + Propofol TIVA + çiftli antiemetik + Parasetamol, postop şiddetli ağrı ve bulantıyı belirgin azaltır.'
    ],
    erasRecommendations: [
      'Postoperatif İzlem ve Rehabilitasyon İlkeleri:',
      '  - 24 saat (ekzenterasyonda 2-5 gün) hastane izlemi: Soket kanaması, ateş/enfeksiyon ve ağrı kontrolü.',
      '  - Baş 30-45° Elevasyonu ve ilk 48 saat soğuk kompres.',
      '  - Psikososyal Destek ve Oküler Protez Planı: Hastaya/aileye iyileşme sonrası estetik oküler protez (6-8 hafta) süreci hakkında umut verici bilgilendirme yapılır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Enucleation, Evisceration, and Exenteration. Wolters Kluwer / LWW.',
    erasReference: 'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.',
    prospectReference: 'Enükleasyon ve orbital cerrahi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi yaklaşımı RCoA/RCOphth (2012) ve 4th PONV Consensus (2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'Kumar CM, Eke T, Dodds C, et al. Local anaesthesia for ophthalmic surgery — Joint guidelines from the RCoA and RCOphth. 2012.',
      'Kopp SL, Vandermeulen E, et al. ASRA Pain Medicine Evidence-Based Guidelines (5th ed.). Reg Anesth Pain Med. 2025.',
      'Rasmussen ML, Prause JU, Toft PB. Phantom eye syndrome: prevalence and risk factors. Ophthalmology. 2009;116(12):2436-2441.'
    ]
  }
};
