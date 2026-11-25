import { ProcedureDefinition } from '../../types/procedures';

/**
 * Posterior Fossa / Serebellopontin Köşe (CPA) Tümör Cerrahisi (Vestibüler Schwannoma, Meningioma, Medulloblastoma)
 *
 * SNACC Posterior Fossa / Sitting Position Konsensus Önerileri, PROSPECT & ERAS Kraniyotomi Rehberleri
 * ve güncel nöromonitörizasyon / Venöz Hava Embolisi (VAE) kılavuzları referans alınarak yapılandırılmıştır.
 */
export const posteriorFossaCpaTumor: ProcedureDefinition = {
  id: 'posterior-fossa-cpa-tumor',
  name: 'Posterior Fossa & Serebellopontin Köşe (CPA) Tümör Cerrahisi',
  shortCode: 'POST-FOSSA-CPA',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Posterior Fossa & Kafa Tabanı Nöroşirürjisi',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description:
    'Serebellopontin köşe (vestibüler schwannoma/akustik nörinom, petroklival meningioma, epidermoid) ve posterior fossa tümörlerinin (serebellar tümör, medulloblastoma, ependimoma) retrosigmoid, suboksipital veya translabirintin yaklaşımla mikrocerrahi rezeksiyonudur. Beyin sapı ve kranial sinir (CN V–XII) komşuluğu, semi-sitting veya park-bench pozisyonu, Venöz Hava Embolisi (VAE) ve Trigeminokardiyak Refleks (TCR) nedeniyle nöroanestezinin en yüksek teknik dikkat gerektiren vakalarındandır.',
  indications: [
    'Vestibüler Schwannoma (Akustik Nörinom): İlerleyici işitme kaybı, tinnitus, vertigo, fasiyal sinir (CN VII) veya beyin sapı basısı yapan CPA lezyonları',
    'Serebellopontin köşe ve petroklival meningiomalar, epidermoid kistler ve glomus/juguler foramen tümörleri',
    'Serebellar ve 4. ventrikül tümörleri (medulloblastoma, pilositik astrositoma, ependimoma, hemanjiyoblastoma, metastazlar) — obstrüktif hidrosefali ve beyin sapı kompresyonu',
    'Mikrovasküler dekompresyon (MVD) veya posterior fossa arteriyovenöz patolojileri'
  ],
  averageDuration: '4 - 7 saat (Pozisyon + İONM kurulumu: 60 dk; Mikrocerrahi rezeksiyon ve kapanış: 3-6 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 600 mL (Tipik CPA schwannoma); ancak transvers/sigmoid sinüs laserasyonu veya hipervasküler tümörlerde (meningioma, hemanjiyoblastoma) ani 1000 - 2000+ mL masif venöz kanama ve eşzamanlı VAE riski vardır',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk (Dural Venöz Sinüs Kanaması & VAE Riski)',
    crossMatchRequirement: 'En az 2-4 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalı; hipervasküler posterior fossa tümörlerinde 4 Ünite ES + TDP hazır olmalıdır',
    transfusionProbability: '%15 - %30 (Vasküler meningioma/hemanjiyoblastoma veya dural sinüs yaralanmasında >%50)',
    criticalBleedingSources: [
      'Transvers ve Sigmoid Dural Venöz Sinüsler (retrosigmoid kraniyotomide kemik kenarına bitişiktir — hem masif kanama hem de VAE giriş kapısıdır!)',
      'Emisser mastoid ve suboksipital diploik venler',
      'Anterior İnferior Serebellar Arter (AICA), Posterior İnferior Serebellar Arter (PICA) ve beyin sapı perforan dalları'
    ],
    hemostasisStrategies: [
      'Sinüs yaralanmasında ıslak pamuk/Surgicel/FloSeal ile tamponad, başın hafif indirilmesi ve eşzamanlı VAE protokolünün başlatılması',
      'Kemik mumu (bone wax) ile diploik ve mastoid emisser venlerin derhal kapatılması',
      'Vasküler tümörlerde preoperatif besleyici arter embolizasyonu ve mikrocerrahi bipolar hemostaz'
    ]
  },

  // 3) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi (Propofol + Remifentanil TIVA) — Nöromusküler Blokaj İdamesi OLMADAN (CN VII/IX/X EMG ve MEP monitörizasyonu için TOF ≥ 0.90!)',
      'Düşük MAC Volatil + Remifentanil (sadece BAEP ve serbest EMG izlenen, MEP kullanılmayan seçilmiş CPA olgularında: BAEP ve kranial sinir EMG\'si düşük-orta MAC inhalasyon ajanlarına dirençlidir)'
    ],
    alternative: [
      'NIM (Nerve Integrity Monitor) EMG Endotrakeal Tüp ile TIVA: Alt kranial sinir (CN IX/X - Vagus) basısı olan büyük CPA/juguler foramen tümörlerinde'
    ],
    clinicalRationale:
      'CPA cerrahisinde fasiyal sinir (CN VII), işitme yolu (CN VIII - BAEP) ve alt kranial sinir (CN IX/X) korunması esastır. Fasiyal ve vokal kord EMG\'sinin güvenilir çalışabilmesi için entübasyon sonrası nöromusküler bloker idamesi KESİNLİKLE YAPILMAZ (TOF ≥ 0.90). Propofol/Remifentanil TIVA; hareketsizlik, beyin gevşemesi, İONM uyumu ve posterior fossa cerrahisindeki yoğun PONV\'u azaltmada altın standarttır.',
    notes:
      'Semi-sitting (yarı oturur) pozisyon cerraha kansız saha ve iyi venöz drenaj sağlasa da Patent Foramen Ovale (PFO) varlığında paradoksal arteriyel hava embolisi felaketine yol açar: Preop kontrastlı (bubble) EKO ile PFO saptanması semi-sitting için MUTLAK KONTRENDİKASYONDUR! N2O pnömosefali ve VAE\'yi büyüttüğünden KESİNLİKLE YASAKTIR.',
    rulesTitle: 'POSTERİOR FOSSA / CPA CERRAHİSİNDE VAZGEÇİLMEZ 5 KURAL',
    indispensableRules: [
      {
        number: 1,
        title: 'SEMİ-SİTTİNG ÖNCESİ ZORUNLU PFO TARAMASI — PFO = MUTLAK KONTRENDİKASYON',
        content: 'Semi-sitting (yarı oturur) pozisyon planlanan her hastada preoperatif kontrastlı (bubble) TTE veya TEE ile Patent Foramen Ovale (PFO) taranmalıdır. PFO pozitifliği (paradoksal koroner/serebral hava embolisi riski nedeniyle) semi-sitting pozisyon için MUTLAK KONTRENDİKASYONDUR; bu hastalarda Park-Bench (lateral) pozisyon seçilir.'
      },
      {
        number: 2,
        title: 'VENÖZ HAVA EMBOLİSİ (VAE) MONİTÖRİZASYONU VE ACİL ALGORİTMASI',
        content: 'Semi-sitting pozisyonda TEE (en duyarlı) veya Prekordiyal Doppler + EtCO2 + Sağ Atriyal Multiorifice CVC (SVC–SA bileşkesinde) zorunludur. VAE bulgusunde (Doppler\'de "mill-wheel"/hışırtı, ani EtCO2 düşüşü, hipotansiyon): (1) Cerrahı uyar -> sahayı salinle doldur/kemik mumu uygula; (2) FiO2 %100 yap (N2O zaten KAPALI!); (3) Geçici juguler kompresyon uygula; (4) Sağ atriyal CVC\'den hava aspire et; (5) Masayı düzleştir/başı indir ve vazopresör başlat.'
      },
      {
        number: 3,
        title: 'KRANİAL SİNİR (CN VII / VIII / IX / X) MONİTÖRİZASYONU: NMB İDAMESİ YOK!',
        content: 'Fasiyal (CN VII) ve Vagus (CN IX/X - NIM ETT) EMG\'sinin bozulmaması için yalnızca entübasyonda kısa etkili kas gevşetici kullanılır; insizyon öncesi TOF ≥ 0.90 doğrulanır ve cerrahi boyunca kas gevşetici KESİNLİKLE yapılmaz. Hareketsizlik Remifentanil + Propofol TIVA ile sağlanır.'
      },
      {
        number: 4,
        title: 'TRİGEMİNOKARDİYAK REFLEKS (TCR) VE BOYUN FLEKSİYONU / MAKROGLOSSİ',
        content: 'CN V, beyin sapı veya dura traksiyonunda ani ağır bradikardi, asistoli ve hipotansiyon (TCR) gelişebilir: Cerrah derhal durdurulur (çoğu kez spontan düzelir) ve gerekirse IV Atropin (0.5–1 mg) verilir. Aşırı boyun fleksiyonu juguler tıkanıklık, ETT katlanması, servikal kord iskemisi ve MAKROGLOSSİ yapar — çene-sternum arasında en az 2 parmak mesafe korunmalıdır.'
      },
      {
        number: 5,
        title: 'N2O KESİNLİKLE YASAK (TANSİYON PNÖMOSEFALİ) + AGRESİF ÜÇLÜ PONV PROFİLAKSİSİ',
        content: 'BOS kaybı sonrası intrakraniyal boşlukta hava biriktiğinden N2O kullanımı TANSİYON PNÖMOSEFALİ ve VAE genişlemesine yol açar — KESİNLİKLE KULLANILMAZ. Vestibüler/posterior fossa manipülasyonu çok yüksek PONV (%60–70) yarattığından agresif üçlü profilaksi (Propofol TIVA + Deksametazon + Ondansetron ± Aprepitant/düşük doz Droperidol) şarttır.'
      }
    ]
  },

  // 4) Pre-operatif hazırlık
  preoperative: {
    consultations: [
      'Kardiyoloji (Semi-Sitting Planlanıyorsa ZORUNLU): Kontrastlı (salin-bubble) TTE veya TEE ile Patent Foramen Ovale (PFO), atriyal septal defekt ve sağ-sol şant dışlanması + kardiyak rezerv değerlendirmesi.',
      'KBB / Odyoloji & Nörofizyoloji: Preop işitme (BAEP bazal düzeyi), fasiyal sinir derecesi (House-Brackmann) ve alt kranial sinir (yutma/vokal kord) muayenesi.'
    ],
    historyAndPhysical: [
      'Alt Kranial Sinir (CN IX, X, XII) Disfonksiyonu: Ses kısıklığı, yutma güçlüğü (disfaji), öğürme refleksi kaybı ve sessiz aspirasyon riski — postop ekstübasyon güvenliğini doğrudan belirler!',
      'KİBAS ve Obstrüktif Hidrosefali: 4. ventrikül basısına bağlı baş ağrısı, kusma, papilödem ve ataksi (gerekirse operasyon öncesi EVD açılır).',
      'Servikal Omurga Hareket Açıklığı ve Karotis/Vertebral Stenoz: Semi-sitting veya park-bench pozisyonunda boyun fleksiyon-rotasyon toleransı.'
    ],
    laboratoryAndTests: [
      'Kontrastlı (Bubble) Ekokardiyografi (semi-sitting için zorunlu), 12 Derivasyonlu EKG.',
      'Tam Kan Sayımı, Koagülasyon Paneli, Serum Elektrolitleri, Kan Grubu ve 2–4 Ünite ES Cross-Match.',
      'Beyin MRG & MR Venografi: Tümörün beyin sapı, dural venöz sinüsler ve kranial sinirlerle ilişkisi.'
    ]
  },

  // 5) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line): Semi-sitting pozisyonda transdüser KESİNLİKLE dış kulak yolu / tragus (Willis poligonu) seviyesinde sıfırlanmalıdır (kalp seviyesinde sıfırlanırsa beyin perfüzyon basıncı 15–20 mmHg olduğundan yüksek görünür ve serebral iskemi gelişir!).',
      'VAE Monitörizasyonu (Semi-Sitting\'te Zorunlu; Park-Bench\'te Önerilir): Transözofageal Ekokardiyografi (TEE — altın standart) ve/veya sağ parasternal 4. interkostal aralıkta Prekordiyal Doppler + sürekli EtCO2 (ani >2–4 mmHg düşüş VAE alarmıdır!).',
      'İntraoperatif Nöromonitörizasyon (İONM): CN VII (fasiyal EMG), CN VIII (BAEP), CN IX/X (NIM ETT vokal kord EMG), SSEP ve gerekirse MEP.',
      'TOF Nöromusküler Monitör (EMG doğruluğu için TOF ≥ 0.90 takibi), işlenmiş EEG/BIS, ısı probu ve saatlik idrar çıkışı.'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı periferik IV kateter (16G–18G).',
      'İnvaziv Radyal Arter Kateteri (indüksiyon öncesi; beyin seviyesinde sıfırlanmış).',
      'Sağ Atriyal Multiorifice Santral Venöz Kateter (Semi-sitting pozisyonda zorunlu): İntravasküler EKG (bifazik P dalgası) veya TEE kılavuzluğunda SVC–sağ atriyum bileşkesine yerleştirilerek olası VAE\'de hava aspirasyonu sağlanır.'
    ],
    patientPosition: 'Park-Bench (Modifiye Lateral / 3/4 Prone) veya Semi-Sitting (Yarı Oturur) pozisyon — Mayfield 3 çivili başlık ile tespit.',
    patientPositionDetails: [
      'Boyun Fleksiyonu Güvenliği: Çene ile sternum arasında en az 2 parmak (3–4 cm) mesafe bırakılmalıdır; aşırı fleksiyon juguler drenajı bozar, ETT\'yi büker, servikal spinal kordu gerer ve postop ağır MAKROGLOSSİ (dil şişmesi) oluşturur.',
      'Oral Airway / Isırık Bloğu Uyarısı: Semi-sitting ve uzun park-bench vakalarında sert plastik airway veya büyük TEE probu uzun süre dili sıkıştırarak ağır makroglossi ve hava yolu obstrüksiyonu yapabilir — yumuşak gazlı bez ısırık bloğu kullanılır ve dil basısı sık kontrol edilir.',
      'Park-Bench Pozisyonunda: Alttaki kol aksiller rulo ile brakiyal pleksus basısından korunur; bacaklara elastik kompresyon çorabı / IPC takılır (semi-sitting\'te venöz göllenmeyi azaltmak için dizler hafif fleksiyonda ve kalp seviyesine yakın).'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Pürüzsüz indüksiyon (Propofol + Remifentanil + Lidokain + tek doz kısa/orta etkili kas gevşetici [Rokuronyum 0.6 mg/kg]; NIM ETT kullanılacaksa düşük doz veya kas gevşeticisiz entübasyon/Sugammadeks ile erken geri çevirme).',
      'İdame (İONM Uyumlu): Propofol (TCI veya 100–150 mcg/kg/dk) + Remifentanil (0.1–0.25 mcg/kg/dk) TIVA; nöromusküler bloker idamesi YAPILMAZ (TOF ≥ 0.90). Sadece BAEP/EMG kullanılan olgularda <0.5–0.7 MAC Sevofluran eklenebilir. N2O KESİNLİKLE KULLANILMAZ.',
      'Hemodinamik Yönetim: Semi-sitting pozisyona geçiş kademeli yapılmalı, sıvı yüklemesi ve Noradrenalin/Fenilefrin infüzyonu ile beyin (tragus) seviyesindeki MAP ≥ 65–75 mmHg korunmalıdır.',
      'Agresif Üçlü PONV Profilaksisi: Propofol TIVA + indüksiyonda IV Deksametazon (8 mg) + cerrahi bitimine 30 dk kala IV Ondansetron (4–8 mg) ± yüksek riskte preop oral Aprepitant (40 mg) veya düşük doz Droperidol (0.625 mg).',
      'Sıvı ve Ozmoterapi: İzotonik dengeli kristaloidlerle normovolemi (hipovolemi semi-sitting\'te venöz basıncı düşürerek VAE riskini artırır!). Gerektiğinde Mannitol / %3 HTS ve normokapni (PaCO2 32–36 mmHg).'
    ],
    airwayManagement: [
      'Bükülmeye dirençli spiral telli (armored) orotrakeal tüp — boyun fleksiyonu sırasında katlanmayı önler. CN IX/X monitörizasyonu planlanıyorsa videolaringoskop eşliğinde elektrotları vokal kord hizasına tam oturtulan NIM EMG ETT kullanılır.',
      'Baş pozisyonu verildikten sonra ETT derinliği (endobronşiyal kayma riski!) ve kaf basıncı mutlaka yeniden doğrulanır.',
      'Ekstübasyon Öncesi Kontrol: Dil/orofarenks ödemi (makroglossi), hava kaçağı testi (cuff leak) ve alt kranial sinir (CN IX/X) bütünlüğü doğrulanmadan ekstübasyon yapılmaz.'
    ],
    criticalSurgicalStages: [
      'Pozisyon Verme (Semi-Sitting / Park-Bench): Ortostatik hipotansiyon, ETT yer değiştirmesi ve prekordiyal Doppler/TEE yerleşiminin doğrulanması (salin bolus testi).',
      'Suboksipital / Retrosigmoid Kraniyotomi: Transvers/sigmoid sinüs ve diploik venlerin açılması — VAE riskinin ilk zirve noktası! Prekordiyal Doppler ve EtCO2 saniye saniye izlenir.',
      'CPA Tümör Diseksiyonu ve Beyin Sapı Manipülasyonu: (1) Trigeminokardiyak Refleks (TCR) — ani bradikardi/asistoli; (2) CN VII/VIII/IX/X EMG deşarjları — nörofizyolog ve cerrahla anlık iletişim; (3) Solunum/vazomotor merkez irritasyonuna bağlı ani hipertansiyon/aritmi.',
      'Dura Kapanışı ve Valsalva Manevrası: Cerrahın hemostaz kontrolü sırasında N2O kesinlikle kapalı; intrakraniyal hava boşaltılır (tansiyon pnömosefali önlemi).'
    ],
    emergenceNotes: [
      'Öksürük ve ıkınma posterior fossa gibi dar bir kompartımanda katastrofik hematom oluşturur! Remifentanil düşük doz infüzyonu veya IV Lidokain ile pürüzsüz uyanma sağlanır.',
      'Yeni gelişen CN IX/X (vagus) yaralanması, belirgin makroglossi, ağır beyin sapı ödemi veya uzamış cerrahi varsa hasta entübe olarak Nöro-YBÜ\'ye devredilir.',
      'Uyanma gecikmesi, yeni anizokori veya açıklanamayan letarji gelişirse TANSİYON PNÖMOSEFALİ veya posterior fossa hematomu açısından ACİL Beyin BT çekilir.'
    ]
  },

  // 6) Post-operatif yönetim
  postoperative: {
    painManagement: [
      'Suboksipital/retrosigmoid insizyon ve kas diseksiyonu orta-şiddetli ağrı oluşturur: Cerrahi bitiminde Büyük/Küçük Oksipital Sinir Bloğu / insizyonel Bupivakain infiltrasyonu + düzenli IV Parasetamol (1 g q6h) uygulanır.',
      'PONV ve sedasyon riskini artıran Tramadol ve Kodein KULLANILMAZ; taze posterior fossa kanaması riski nedeniyle erken dönemde rutin non-selektif NSAİİ\'lerden kaçınılır.',
      'Atılım ağrısında mikro-doz IV Fentanil (25 mcg) veya düşük doz Deksmedetomidin (Nöro-YBÜ\'de ajitasyon/hipertansiyon kontrolünde) titre edilir.'
    ],
    prospectRecommendations: [
      'Bölgesel skalp/oksipital sinir bloğu veya insizyonel lokal anestezik infiltrasyonu + sistemik Parasetamol temel multimodal rejimdir.',
      'Sedasyonu ve solunum depresyonunu minimize ederek seri posterior fossa nörolojik muayenesini (bilinç, pupiller, CN VII, yutma) korumak esastır.'
    ],
    erasRecommendations: [
      'İlk 24 saat Nöro-YBÜ\'de yakın nörolojik, solunum ve hemodinamik izlem (posterior fossa ödem/hematomu hızla beyin sapı herniasyonuna ilerler).',
      'Oral alım öncesi mutlaka yutma / alt kranial sinir (CN IX, X, XII) güvenliği değerlendirilmelidir (sessiz aspirasyon pnömonisini önlemek için).',
      'Agresif antiemetik idame, erken mobilizasyon (vestibüler rehabilitasyon) ve kornea koruması (fasiyal parezi varsa suni gözyaşı/göz kapatma).'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference:
      "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. Anesthesiologist's Manual of Surgical Procedures (5th/6th ed.). Posterior Fossa Craniotomy & Acoustic Neuroma Resection. Wolters Kluwer.",
    prospectReference:
      'Mestdagh, F. P., et al. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 731–740.',
    otherReferences: [
      'Fathi, A. R., Eshtehardi, P., & Meier, B. (2009). Patent foramen ovale and neurosurgery in sitting position: a systematic review. British Journal of Anaesthesia, 102(5), 588–596.',
      'Gan, T. J., et al. (2020). Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesthesia & Analgesia, 131(2), 411–448.',
      "Cottrell, J. E., & Patel, P. Cottrell and Patel's Neuroanesthesia (6th ed.). Anesthesia for Posterior Fossa Surgery, Venous Air Embolism, and Cranial Nerve Monitoring. Elsevier.",
      'Meuwly, C., et al. (2015). Trigeminal Cardiac Reflex: New Thinking Model About the Definition Based on a Literature Review. Medicine, 94(5), e484.'
    ]
  }
};
