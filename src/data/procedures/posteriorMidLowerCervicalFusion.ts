import { ProcedureDefinition } from '../../types/procedures';

/**
 * Orta ve Alt Servikal Omurga Posterior Füzyon ve Fiksasyonu: Laminektomi, Laminoplasti ve Lateral Mas / Pedikül Vidalama (C3-T1)
 * (Posterior Fusion/Fixation of the Mid and Lower Cervical Spine: Laminectomy, Laminoplasty, and Lateral Mass / Pedicle Screws)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Spine Surgery: Posterior Fusion/Fixation of the Mid and Lower Cervical Spine, pp. 512-518),
 * Cervical Spine Research Society (CSRS), North American Spine Society (NASS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Omurga Cerrahisi Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const posteriorMidLowerCervicalFusion: ProcedureDefinition = {
  id: 'posterior-mid-lower-cervical-fusion',
  name: 'Orta ve Alt Servikal Omurga Posterior Füzyon ve Fiksasyonu: Laminektomi, Laminoplasti ve Lateral Mas / Pedikül Vidalama (C3-T1)',
  shortCode: 'POST-SERVİKAL-FÜZYON',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Spinal Nöroşirürji & Omurga Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orta ve alt servikal omurgada (C3-C7 ve servisikotorasik bileşke C7-T1/T2) çok seviyeli spinal kanal darlığı, servikal spondilotik miyelopati, travmatik kırık-çıkıklar veya instabilite olgularında uygulanan posterior cerrahi dekompresyon ve enstrümentasyon ameliyatıdır. Posterior orta hat insizyonu ile paraspinal kaslar subperiosteal olarak lateral mas sınırlarına dek sıyrılır. Omurilik ve sinir kökleri üzerindeki basıyı kaldırmak amacıyla Laminektomi veya omurga stabilitesini koruyan Laminoplasti (açık kapı / çift kapı teknikleri) uygulanır. Ardından omurganın biyomekanik stabilitesini sağlamak ve post-laminektomi kifozunu önlemek için C3-C6 lateral maslarına (Magerl veya Roy-Camille teknikleriyle) ve C7-T1/T2 pediküllerine çok eksenli titanyum vidalar yerleştirilerek rodlar ve çapraz bağlayıcılarla posterior rijit füzyon tamamlanır.',
  indications: [
    'Çok Seviyeli Servikal Spondilotik Miyelopati (CSM): Korunmuş servikal lordozu olan, 3 veya daha fazla seviyede anterior ve posterior kord basısı bulunan, konjenital dar servikal kanalı olan hastalar',
    'Posterior Longitudinal Ligaman Ossifikasyonu (OPLL): Çok seviyeli anterior bası yaratan ve anterior yaklaşımın morbiditesinin yüksek olduğu yaygın kalsifiye olgular',
    'Travmatik Servikal Kırık-Çıkıklar: C3-C7 faset kırıkları, kilitli fasetler (unilateral/bilateral facet dislocation) ve posterior ligamentöz kompleks hasarları',
    'Post-Laminektomi Kifoz Deformitesi: Önceki dekompresif laminektomiler sonrası servikal aksın kifoza kayması ve kordun gerilmesi',
    'Servikal Tümörler, Metastazlar veya Enfeksiyonlar: Posterior enstrümentasyon ile stabilizasyon gerektiren patolojiler',
    'Kombine Anterior-Posterior (360 Derece) Füzyonun İkinci Seansı: Ağır instabilite veya osteoporotik kemik yapısında anterior füzyonu desteklemek amacıyla'
  ],
  averageDuration: '2.5 - 5.0 saat (Prone pozisyonlama, Mayfield çivili başlık fiksasyonu ve floroskopik seviye belirleme: 45-60 dk; Posterior subperiosteal kas diseksiyonu ve lateral masların açılması: 45-60 dk; Laminektomi / Laminoplasti ile kord dekompresyonu: 45-75 dk; Lateral mas ve C7/T1 pedikül vidalama, rod montajı ve posterolateral kemik greftleme: 60-90 dk; Tabakalı yara kapanışı ve uyanma: 30-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 500 mL (Çok seviyeli enstrümentasyon ve kemik dekompresyonunda 300-600 mL; travma veya revizyon olgularında 800 mL\'yi bulabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Kanama Riski (Zengin paraspinal kas yatağı, epidural venöz pleksus ve vertebral arter komşuluğu)',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalıdır; çok seviyeli veya travmatik olgularda ek 2 Ünite ES + Taze Donmuş Plazma (TDP) planlanmalıdır',
    transfusionProbability: '%15 - %35 (Özellikle 4 seviye ve üzeri laminektomi-füzyon uygulanan yaşlı hastalarda)',
    criticalBleedingSources: [
      'A. Vertebralis (Lateral mas vidalamasında iğne/vidalama açısının aşırı anterior veya mediyale kaçması sonucu foramen transversariumdaki vertebral arterin delinmesi — katastrofik fışkırıcı arteriyel kanama ve posterior serebral/serebellar inme riski!)',
      'Posterior Epidural Venöz Pleksus (Batson pleksusu — lamina ve sarı ligaman [ligamentum flavum] rezeksiyonunda masif venöz kanama)',
      'Suboksipital ve Paravertebral Kas İçi Derin Venöz Pleksuslar',
      'Vertebra Korpus ve Lamina Spongioz Kemik Kanamaları'
    ],
    hemostasisStrategies: [
      'Geniş paraspinal kas diseksiyonunda titiz bipolar koter ve monopolar koter hemostazı',
      'Epidural venöz kanamalarda hemostatik matriks ajanları (FloSeal, Surgicel, Gelfoam + pamuk basısı)',
      'Lateral mas kemik giriş deliklerinde ve lamina kenarlarında kemik mumu uygulaması',
      'Vertebral arter yırtılması acil protokolü: Delik hattına anında FloSeal/Surgicel tamponadı, doğrudan basınç ve tampon uygulaması; nöro-girişimsel anjiyografi/stent-embolizasyon hazırlığı',
      'Ameliyat sonunda subfasial negatif basınçlı çift dren yerleştirilmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) — İntraoperatif MEP ve SSEP nöromonitörizasyonu için MUTLAK ALTIN STANDARTTIR'
    ],
    alternative: [
      'GETA + Düşük Doz Sevofluran/Desfluran (< 0.5 MAC) + Opioid İnfüzyonu (Yalnızca İONM yapılmayan olgularda; ancak çok seviyeli posterior servikal cerrahide İONM uluslararası kılavuzlarca şiddetle önerilir)'
    ],
    notes: 'POSTERİOR ORTA VE ALT SERVİKAL FÜZYONDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) İNSTABİL SERVİKAL OMURGADA PRONE DÖNÜŞÜ (LOG-ROLL) VE MAYFIELD ÇİVİ BASINCI — Hasta supin entübe edildikten sonra Mayfield 3 çivili başlık takılır (çivi giriş yerlerine lokal anestezik infiltre edilmelidir; aksi halde ani şiddetli hipertansif kriz tetiklenir). Hastayı yüzüstü (prone) pozisyona çevirirken en az 4-5 kişilik koordineli ekip gereklidir. Başı tutan hekim Manuel İn-Line Stabilizasyon (MILS) ile boynu MUTLAK NÖTRAL eksende tutmalı; aşırı fleksiyon (kordu osteofitlere basıya uğratır) veya hiperekstansiyondan (sarı ligamanı arkadan korda katlar) kesinlikle kaçınmalıdır! (2) SIFIR OKÜLER BASI VE POSTOPERATİF GÖRME KAYBI (POVL) KORUMASI — Prone pozisyonda göz kürelerine binen dış bası Santral Retinal Arter Oklüzyonuna (CRAO) veya İskemik Optik Nöropatiye (ION) yol açarak KORUYUCU DÖNÜŞÜ OLMAYAN KÖRLÜĞE neden olur! Gözler her 15-30 dakikada bir ProneView aynası ile kontrol edilmeli; orbital bası sıfır tutulmalı, intraoperatif derin hipotansiyon ve aşırı hemodilüsyondan kaçınılmalıdır. (3) İNTRAOPERATİF NÖROMONİTÖRİZASYON (tcMEP/SSEP) VE KAS GEVŞETİCİ DİSİPLİNİ — Prone pozisyona alış, laminektomi ve vida girişleri sırasında omurilik mikrovasküler iskemisi ve sinir kökü gerilimi tcMEP ve SSEP ile izlenir. Entübasyon sonrasında KESİNLİKLE nöromusküler bloker verilmemeli (TOF 4/4 korunmalı) ve anestezi TIVA ile yürütülmelidir. (4) LATERAL MAS VİDALAMASINDA VERTEBRAL ARTER VE C5 KÖK KORUMASI — Lateral mas vidaları (Magerl tekniği: 25-30° lateral, 25-30° kranyal açı) yerleştirilirken foramen transversariumdaki vertebral arter ve foramenden çıkan sinir kökü hemen komşudur. Açı hatası vertebral arter laserasyonuna veya postoperatif C5 felcine (deltoid ve biseps zaafiyeti) yol açar; kanama ve İONM düşüşlerinde cerrah derhal uyarılmalıdır. (5) PRONE HİPOTERMİ, YÜZ/LARİNKS ÖDEMİ VE PÜRÜZSÜZ UYANMA — Saatlerce süren prone cerrahide yerçekimi venöz stazı nedeniyle yüz, dil ve larinkste masif ödem gelişir. Ekstübasyon öncesinde KAF KAÇAK TESTİ (Cuff Leak Test) yapılmadan hasta kesinlikle ekstübe edilmemelidir. Ekstübasyonda ıkınma ve hipertansiyon derin cerrahi yatakta hematom yaratabileceğinden IV Lidokain (1.5 mg/kg) ile pürüzsüz uyanma sağlanmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji / Nöroşirürji Konsültasyonu: Servikal miyelopati tablosunun ağırlığı (el beceriksizliği, ataksi, sfinkter disfonksiyonu, hiperrefleksi), kök basıları (C5-C8 radikülopatileri) ve bazal nörolojik defisitler yazılı olarak belgelenmelidir.',
      'Kardiyoloji Konsültasyonu: İleri yaş hastalarda koroner arter hastalığı, sol ventrikül fonksiyonu, hipertansiyon ve serebrovasküler perfüzyon rezervi; uzun süreli prone pozisyonun kardiyak önyüke ve doluma etkileri.',
      'Göz Hastalıkları Konsültasyonu: Glokom, diyabetik retinopati veya vasküler göz hastalığı olan olgularda bazal vizyon ve optik disk değerlendirmesi (POVL riski için).',
      'Göğüs Hastalıkları Konsültasyonu: Servikal kord basısı diyafram innervasyonunu (C3-C5 frenik sinir) etkileyebilir; restriktif solunum fonksiyon testi ve arteriyel kan gazı analizi.'
    ],
    historyAndPhysical: [
      'Servikal Hareket Açıklığı ve Ağrı: Boyun fleksiyon ve ekstansiyonunda Lhermitte belirtisi (sırttan bacaklara elektrik çarpması hissi), instabilite semptomları.',
      'Zor Hava Yolu Taraması: Servikal spondilotik sertlik, kısıtlı ağız açıklığı, kalın boyun ve Mallampati skoru (laringoskopi sırasında boyun kesinlikle zorlanmamalıdır).',
      'Vasküler Değerlendirme: Vertebrobaziler yetmezlik semptomları (baş dönmesi, nistagmus, bayılma atakları — vertebral arter anomalilerini ekarte etmek için).',
      'Ayrıntılı Motor ve Duyu Taban Muayenesi: Üst ve alt ekstremite kas kuvvetleri (deltoid, biseps, triseps, interosseöz kaslar, kuadriseps, tibialis anterior) kaydedilir.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR tam normal olmalıdır (epidural hematom parapleji/kuadripleji yaratabileceğinden antikoagülan ve antiagregan kesilme sürelerine harfiyen uyulmalıdır).',
      'Serum Elektrolitleri, BUN, Kreatinin ve Glukoz düzeyi.',
      'Kan Grubu, Antikor Tarama ve 2 Ünite Eritrosit Süspansiyonu Cross-Match hazırlığı.',
      'Tüm Servikal MRG ve BT İncelemeleri: Kanal darlığı seviyeleri, kord miyelomalazi odağı, kemik osteofitleri, faset kilitlenmeleri ve vertebral arterlerin foramen transversariumdaki anatomik rotası (yüksek yerleşimli veya kıvrımlı arter anomalileri).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Prone pozisyonda pozisyonel hipotansiyonu engellemek, MAP > 80-85 mmHg hedefini sürekli sağlamak ve kan gazı/hemoglobin takibi için zorunludur.',
      'Santral Venöz Erişim (CVC): Çok seviyeli kanamalı cerrahilerde, zor damar yolu olan veya vazopressör infüzyonu gerektiren yaşlı olgularda.',
      'İntraoperatif Nöromonitörizasyon (İONM): Bilateral Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP) ve serbest salınımlı EMG (özellikle C5 sinir kökü için deltoid ve biseps EMG takibi).',
      'Nöromusküler İleti İzlemi (TOF): MEP kayıtlarının güvenilirliği için TOF oranı 4/4 (%100) olmalı, ameliyat boyunca kas gevşeticiden kaçınılmalıdır.',
      'Mesane Sondası (Sıcaklık sensörlü) ve İdrar Çıkışı Takibi (> 0.5-1.0 mL/kg/saat).',
      'Floroskopi (C-Kollu Skopi) Rehberliği: Vida giriş açıları ve derinlikleri floroskopi ile doğrulanır.'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı (14-16G) periferik intravenöz yol (pronedan önce damar yolları ve uzatma hatları sağlamlaştırılmalıdır)',
      'İnvaziv radiyal arter kanülü'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon, Mayfield 3 Çivili Başlık Fiksasyonu, Karın Serbest Asılı',
    patientPositionDetails: [
      'MAYFIELD ÇİVİ FİKSASYONU: Baş nötral hatta, boyun hafif fleksiyonda sabitlenir; başlık takılmadan önce çivi giriş yerlerine lokal anestezik (Bupivakain + Epinefrin) infiltre edilir.',
      'LOG-ROLL ÇEVİRME: Supinden prone pozisyona geçiş en az 4-5 kişilik deneyimli ekip tarafından boyun nötral aksı bozulmadan tek parça halinde gerçekleştirilir.',
      'SIFIR OKÜLER BASI: Göz küreleri kontrol edilir; gözler, burun ve dudaklar üzerinde hiçbir dış bası olmamalıdır (ProneView koruma sistemi).',
      'GÖĞÜS VE PELVİS SİLİKON RULOLARI: Karın tamamen serbest asılı bırakılır; batın içi basınç artışı Vena Cava Inferior\'a bası yaparak Batson epidural venöz pleksus kanamasını masif şekilde artırır.',
      'Kollar gövde yanında nötral pozisyonda desteklenir, omuzlar aşırı gerdirilmeden brakiyal pleksus korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk).',
      '  - İnstabil boyunda MILS eşliğinde Videolaringoskop veya AFOI ile atravmatik entübasyon.',
      '  - Entübasyonda kısa etkili gevşetici kullanılsa bile cerrahi başlamadan önce etki tamamen sonlandırılır.',
      'İdame: TIVA Protokolü (Propofol 80-140 mcg/kg/dk + Remifentanil 0.05-0.25 mcg/kg/dk). MEP genliklerini baskılamamak için inhalasyon gazlarından kaçınılır (< 0.3 MAC).',
      'Omurilik Perfüzyon Hedefleri:',
      '  - Prone pozisyona alıştan operasyon sonuna dek ortalama arter basıncı (MAP) > 80-85 mmHg tutulmalıdır; spinal kord mikrovasküler iskemiye karşı korunur.',
      'İONM Sinyal Alarmı Protokolü:',
      '  - tcMEP veya SSEP genliğinde > %50 düşüş veya latansta > %10 uzama olursa:',
      '    1. Cerraha derhal haber verilir; vida pozisyonu, kord basısı veya distaksiyon gözden geçirilir.',
      '    2. MAP hızla > 85-90 mmHg seviyesine yükseltilir (Efedrin/Noradrenalin desteği).',
      '    3. Sıcaklık, hematokrit ve anestezi derinliği kontrol edilir.',
      'Pediatrik/Yaşlı Hipotermi Önlemi:',
      '  - Sıvı ısıtıcıları ve aktif hava ısıtıcı battaniyeler ile vücut sıcaklığı > 36.5°C tutulur.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; prone pozisyonda tüpün bükülmesini ve ısırmasını engellemek için ısırma bloğu (bite block) yerleştirilir.',
      'Tüpün ağız köşesine ve yüze tespiti terlemeye ve dezenfektana dayanıklı su geçirmez flasterlerle yapılır.',
      'Kaf basıncı 20-25 cmH2O seviyesinde sabit tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Mayfield Fiksasyonu ve Supinden Prone Pozisyona Güvenli Log-Roll Dönüşü.',
      '2. Floroskopi Altında C3-C7/T1 Seviyelerinin İşaretlenmesi ve Orta Hat Cerrahi İnsizyonu.',
      '3. Subperiosteal Kas Diseksiyonu: Lamina, faset eklemleri ve lateral masların açığa çıkarılması.',
      '4. Laminektomi veya Laminoplasti: Yüksek devirli tur (high-speed drill) ile oluk açılması ve kordun dekompresyonu.',
      '5. Lateral Mas Vidalarının Yerleştirilmesi (C3-C6: Magerl tekniği ile 25° lateral, 25° kranyal açı — vertebral arter ve sinir kökü koruması).',
      '6. C7 ve T1 Pedikül Vidalarının Yerleştirilmesi.',
      '7. Titanyum Rodların Montajı, Kompresyon/Distraksiyon Ayarı ve Posterolateral Dekortikasyon/Kemik Greftleme.',
      '8. Hemostaz Kontrolü, Valsalva Manevrası (Dural kaçak kontrolü), Çift Subfasial Dren Yerleştirilmesi ve Kapanış.'
    ],
    emergenceNotes: [
      'KAF KAÇAK TESTİ (CUFF LEAK TEST) VE HAVA YOLU ÖDEMİ: Uzun süren prone pozisyon sonrası yüz, dil ve faringeal yumuşak dokularda yerçekimi ödemi gelişebilir. Tüp kafı indirilerek pozitif hava kaçağı duyulmadan hasta KESİNLİKLE ekstübe edilmemelidir. Şiddetli ödemde hasta entübe olarak YBÜ\'ye transfer edilir ve baş 30-45° eleve edilir.',
      'Pürüzsüz Ekstübasyon (Smooth Emergence): Boyun gerilimini ve venöz kanamayı önlemek için IV Lidokain (1.5 mg/kg) ile öksürmesiz uyanma sağlanır.',
      'Acil Postoperatif Nörolojik Muayene: Hasta uyanır uyanmaz her iki el, kol ve bacakta motor kuvvet teyit edilmelidir (özellikle C5 kök felci açısından omuz abdüksiyonu ve dirsek fleksiyonu [deltoid ve biseps] mutlaka kontrol edilir).',
      'Prone Sonrası Göz Kontrolü: Hastanın görme duyusu ve ışık refleksi değerlendirilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Opioid Koruyucu Protokol:',
      '  - Geniş posterior boyun kas diseksiyonu nedeniyle ameliyat sonrası ağrı ve spazm şiddetlidir.',
      '  - Cerrahi Kapanış Sırasında Paraspinal Kas Yatağına Lokal Anestezik İnfiltrasyonu (Bupivakain %0.25 + Epinefrin).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kısa Süreli Oral/IV NSAİİ (İbuprofen veya Deksketoprofen): Cerrahi hemostaz sağlandıktan sonra (kemik füzyonu için düşük dozda tutulur).',
      '  - Şiddetli Ağrıda Hasta Kontrollü Analjezi (PCA): Düşük doz Morfin veya Fentanil infüzyonu.',
      '  - Şiddetli Boyun Kas Spazmları İçin: Tizanidin veya düşük doz oral/IV Benzodiazepin (Diazepam).'
    ],
    prospectRecommendations: [
      'Posterior servikal laminektomi ve enstrümentasyon cerrahisinde cerrahi alan lokal anestezik infiltrasyonu, parasetamol ve selektif NSAİİ kullanımı postoperatif ağrıyı kontrol altına alarak opioid tüketimini ve sedasyon riskini azaltır.'
    ],
    erasRecommendations: [
      'ERAS Servikal Omurga Cerrahisi Kılavuzları:',
      '  - Postoperatif Nörolojik İzlem: İlk 24 saat saatlik motor ve duyusal muayene; özellikle C5 motor felci (deltoid/biseps zaafiyeti) ve epidural hematom basısı takibi.',
      '  - Subfasial Dren Takibi: Dren çıkış miktarı ve vasfı (kanama vs berrak BOS kaçağı) saatlik izlenir; genellikle 24-48 saatte çekilir.',
      '  - Erken Mobilizasyon: Rijit posterior vida fiksasyonu sağlanan hastalar ameliyat sonrası 1. günde servikal boyunluk (Philadelphia tipi) desteği ile mobilize edilir.',
      '  - Solunum ve Yutma Takibi: Yüksek servikal ödem varlığında solunum eforu ve yutma güvenliği izlenir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Spine Surgery: Posterior Fusion/Fixation of the Mid and Lower Cervical Spine, pp. 512-518. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Debono, B., et al. (2021). Consensus statement for perioperative care in lumbar and cervical spine surgery: Enhanced Recovery After Surgery (ERAS®) Society recommendations. Spine, 46(11), 740-754.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Complex Posterior Cervical Spine Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Kaloostian, P. E., et al. (2014). Posterior cervical laminectomy and fusion: a systematic review and meta-analysis of clinical and radiological outcomes. Global Spine Journal, 4(3), 163-172.',
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. Practice advisory for perioperative visual loss associated with spine surgery. Anesthesiology, 130(1), 12-30.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Clinical Consensus Statement on Intraoperative Neuromonitoring and Hemodynamic Management in Cervical Spine Surgery.',
      'Cervical Spine Research Society (CSRS). Posterior Surgical Techniques and Complication Avoidance in Subaxial Cervical Spine Instability.'
    ]
  }
};
