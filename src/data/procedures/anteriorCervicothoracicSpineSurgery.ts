import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior Servikotorasik Omurga Cerrahisi: Transsternal / Manubriotomi Yaklaşımı İle C7-T3 Dekompresyon ve Rekonstrüksiyon
 * (Anterior Cervicothoracic Spine Surgery: Transsternal / Manubriotomy Approach for C7-T3 Decompression and Reconstruction)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Spine Surgery: Anterior Cervicothoracic Spine Surgery, pp. 518-524),
 * Cervical Spine Research Society (CSRS), North American Spine Society (NASS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Kompleks Omurga Cerrahisi Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const anteriorCervicothoracicSpineSurgery: ProcedureDefinition = {
  id: 'anterior-cervicothoracic-spine-surgery',
  name: 'Anterior Servikotorasik Omurga Cerrahisi: Transsternal / Manubriotomi Yaklaşımı İle C7-T3 Dekompresyon ve Rekonstrüksiyon',
  shortCode: 'SERVİKOTORASİK-ANT',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Servikotorasik bileşkede (C7, T1, T2 ve T3 seviyelerinde) yer alan spinal patolojilere anterior yoldan ulaşmak amacıyla uygulanan yüksek riskli ve multidisipliner kompleks spinal cerrahidir. Bu anatomik bölge önden manubrium sterni, klavikula, 1. kosta ve mediasten büyük damarları (brakisefalik arter, sol ana karotid arter, brakisefalik venler ve aort arkı) tarafından perdelendiğinden; standart anterior servikal yaklaşımın yetersiz kaldığı T1-T3 korpuslarına ulaşabilmek için manubriotomi (parsiyel sternal ayrışma), tam median sternotomi, klavikula rezeksiyonu veya transmanubrial-transsternal yaklaşımlar uygulanır. Omurilik basısı yaratan tümöral kitle, kırık veya enfekte korpuslar mikrocerrahi korpektomi ile çıkarılır; açılan geniş boşluk titanyum kafes (expandable cage), kemik grefti ve anterior kilitli servikotorasik plak-vida sistemleri ile rekonstrükte edilir.',
  indications: [
    'Servikotorasik Bileşke Tümörleri ve Metastazları: C7, T1 veya T2 vertebra korpusunu destrükte eden, patolojik kırık ve anterior omurilik basısı yaratan primer veya metastatik tümörler (akciğer, meme, renal hücreli, prostat karsinomları, plazmasitom, dev hücreli tümörler)',
    'İnstabil Servikotorasik Travmatik Kırık-Çıkıklar: C7-T1 veya T1-T2 seviyesinde fırlama, ezilme (burst) kırıkları ve kord hasarlı anterior instabilite',
    'Servikotorasik Spondilodiskit ve Tüberküloz (Pott Hastalığı): Anterior korpus çökmesi, epidural apse ve nörolojik defisit yaratan şiddetli enfeksiyonların cerrahi debridmanı',
    'Şiddetli Servikotorasik Bileşke Kifoz Deformitesi: Konjenital, post-travmatik veya ankilozan spondilit zemininde gelişen chin-on-chest (çene-göğüs) deformitesinin anterior osteotomi ile düzeltilmesi',
    'Posterior Cerrahi Sonrası Psödoartroz veya Komşu Segment Yıkımı'
  ],
  averageDuration: '4.0 - 7.0 saat (Pozisyonlama, floroskopi ve manubriotomi/sternotomi planlaması: 60 dk; Düşük servikal insizyon ve manubriotomi / sternal split ile büyük damarların diseksiyonu: 60-90 dk; C7-T2 korpektomi, tümör rezeksiyonu ve dural dekompresyon: 90-150 dk; Expandable cage ve servikotorasik plak fiksasyonu: 60-90 dk; Plevral/mediastinal drenaj, sternal tel kapatma ve tabakalı yara rekonstrüksiyonu: 60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '500 - 1500 mL (Geniş korpektomi, sternal kemik iliği kanamaları ve mediasten venöz pleksus diseksiyonlarında masif kanama riski yüksektir; tümör olgularında 2000 mL\'yi aşabilir)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Mediasten Büyük Damarları ve Vertebral Arter Komşuluğu)',
    crossMatchRequirement: 'En az 3-4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite Taze Donmuş Plazma (TDP) ameliyathanede hazır bulundurulmalıdır; Cell Saver (İntraoperatif Kan Kurtarma) cihazı hazır edilmelidir',
    transfusionProbability: '%50 - %75',
    criticalBleedingSources: [
      'A. Brachiocephalica (Innominate Arter — T1-T2 omurga ön yüzünden transvers geçer; ekartasyon yırtılması ölümcül fışkırıcı kanamaya yol açar)',
      'V. Brachiocephalica Sinistra (Sol Innominate Ven — sternum arkasında diseksiyon sahasını çaprazlar; yaralanması hava embolisi ve masif venöz kanama yaratır)',
      'A. Carotis Communis ve A. Subclavia Dalları',
      'A. Vertebralis (C7 korpus rezeksiyonunda foramen transversarium komşuluğu)',
      'Sternum ve Manubrium Süngeröz Kemik İliği Kanamaları',
      'Prevertebral ve Mediastinal Venöz Pleksuslar'
    ],
    hemostasisStrategies: [
      'Sternotomi kenarlarına anında steril kemik mumu uygulaması',
      'Mediasten büyük damarlarının vasküler teyplerle dönülerek olası yaralanmada vasküler klempaj hazırlığı',
      'FloSeal, Surgicel, Tisseel ve mikronöroşirürjikal bipolar koagülasyon',
      'Hücre kurtarma (Cell Saver) sistemi kullanımı (malignite olmayan olgularda)',
      'Geniş mediasten ve retrofaringeal negatif basınçlı drenaj'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Dengeli Genel Endotrakeal Anestezi (GETA) + TIVA (Propofol + Remifentanil) — İntraoperatif Transkraniyal MEP ve SSEP nöromonitörizasyonu için ZORUNLU ALTIN STANDARTTIR'
    ],
    alternative: [
      'İONM Sinyal Düşüşlerinde: Yalnızca TIVA protokolünün devamı; volatil ajanlar (Sevofluran/Desfluran) kord perfüzyonunu ve MEP yanıtlarını baskıladığından kaçınılır (< 0.3 MAC)'
    ],
    notes: 'ANTERİOR SERVİKOTORASİK CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) MEDİASTEN BÜYÜK DAMARLARI VE SOL RADİYAL ARTER KANÜLASYONU KURALI — Brakisefalik (innominate) arter ve sol ana karotid arter doğrudan T1-T3 korpuslarının önünde yer alır. Cerrahi ekartörler innominate arteri sağa doğru gerip sıkıştırdığında sağ koldaki arteriyel nabız ve tansiyon tamamen sıfırlanabilir! Bu nedenle İNVAZİV ARTERİYEL HAT KESİNLİKLE SOL RADİYAL ARTERE VEYA FEMORAL ARTERE TAKILMALIDIR. (2) REKÜRREN LARİNGEAL SİNİR (RLN) VE DUKTUS TORASİKUS TEHLİKESİ — Sağda subklaviyan arterin, solda aort arkının altından dönen her iki RLN servikotorasik bileşkede trakeoözofageal oluğa girer; mediastinal retraksiyon iki taraflı vokal kord felcine ve akut hava yolu obstrüksiyonuna yol açabilir (tüp kaf basıncı ekartör konunca derhal söndürülüp 20 cmH2O\'ya ayarlanmalıdır). Sol taraflı yaklaşımlarda duktus torasikus yaralanması masif şilotoraksa (chylothorax) yol açabileceğinden lenfatik sızıntı kontrol edilmelidir. (3) PLEVRAL KUBBE (KUPULA) YARALANMASI VE PNÖMOTORAKS — Akciğer apekleri ve plevra C7-T1 bileşkesinde klavikulanın 2-3 cm üzerine kadar uzanır; cerrahi disseksiyon sırasında plevra açılırsa tansiyon pnömotoraks veya hemotoraks gelişebilir. Ventilatör tepe basınçları (Ppeak) ve EtCO2 sürekli izlenmeli; ameliyat sonunda göğüs tüpü hazırlığı bulundurulmalıdır. (4) SPİNAL KORD SU AYIRICI (WATERSHED) İSKEMİSİ VE MAP > 85 mmHg HEDEFİ — C7-T3 bölgesi servikal ve torasik anterior spinal arter dolaşımının kritik sınır (watershed) bölgesidir; omurilik perfüzyonunun bozulmaması için ortalama arter basıncı (MAP) kesinlikle 80-85 mmHg\'nin altına düşürülmemelidir. İONM (MEP/SSEP) kesintisiz izlenmeli ve kürarsız TIVA sürdürülmelidir. (5) MANUBRİOTOMİ SONRASI HAVAYOLU GÜVENLİĞİ VE YATAKBAŞI KATASTROFİ PROTOKOLÜ — Sternal ayrışma ve derin retrosternal retraksiyon masif larinks ve trakea ödemine yol açar. Ameliyat bitiminde hasta hemen ekstübe edilmemeli; Kaf Kaçak Testi yapılmalı, gerekirse hasta entübe olarak Yoğun Bakıma transfer edilmelidir. Retrosternal/boyun hematomu trakeayı ezip tamponad yaratabilir; acil yatakbaşı tel/dikiş açma seti hazır bulundurulmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göğüs Cerrahisi / Kalp ve Damar Cerrahisi Konsültasyonu: Manubriotomi, median sternotomi ve innominate arter/ven diseksiyonu için cerrahi ekiple eşgüdüm; torakotomi ve vasküler onarım hazırlığı.',
      'Nöroloji / Nöroşirürji Konsültasyonu: Servikotorasik miyelopati derecesi, alt ekstremite paraparezisi, T1-T2 dermatomunda duyusal seviye (meme başı üstü his kaybı) ve sfinkter fonksiyonu.',
      'Kardiyoloji Konsültasyonu: Büyük damar manipülasyonunun ve innominate kros-klempaj olasılığının tolere edilebilirliği, bazal EKO ve koroner arter rezervi.',
      'Girişimsel Radyoloji Konsültasyonu: Cerrahi öncesinde vasküler tümörlerin (örn. hemanjiyom, renal hücreli karsinom metastazı) preoperatif anjiyografik transarteriyel embolizasyonu (kanamayı dramatik azaltır).',
      'KBB Konsültasyonu: Preoperatif vokal kord muayenesi (özellikle daha önce boyun/tiroid cerrahisi geçirmiş hastalarda mevcut tek taraflı RLN felcinin tespiti hayati önem taşır).'
    ],
    historyAndPhysical: [
      'Kord Kompresyonu ve Radikülopati Muayenesi: T1 kök basısına bağlı elin intrinsik kaslarında atrofi (pençe el), C8 hipoestezisi, Horner Sendromu (sempatik zincir basısı: pitozis, miyozis, anhidrozis).',
      'Hava Yolu ve Servikotorasik Deformite: Kifoz nedeniyle çenenin göğse yapışması (chin-on-chest), boyun ekstansiyonunun sıfır olması, boyun venöz dolgunluğu (vena cava superior sendromu varlığı).',
      'Pulmoner Rezerv Tespiti: İnterkostal kas zaafiyeti ve restriktif akciğer paterni; arteriyel kan gazı ve spirometri analizi.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı ve Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen tam normal olmalıdır.',
      'En az 3-4 Ünite Eritrosit Süspansiyonu ve 2 Ünite TDP Cross-Match hazırlığı.',
      'Biyokimya Paneli: Elektrolitler, BUN, Kreatinin, KCFT, Kalsiyum (kemik metastazlarında hiperkalsemi kontrolü).',
      'Kontrastlı Servikotorasik BT Anjiyografi (BTA): Innominate arter ve arkus aorta dallarının omurgaya olan mesafesi, vertebral arter anatomisi ve manubrium ilişkisi milimetrik incelenir.',
      'Servikotorasik Kontrastlı MRG: Spinal kord basısının derecesi, epidural tümör yayılımı ve plevral invazyon doğrulanır.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 ve Sıcaklık.',
      'SOL RADİYAL ARTERİYEL HAT (İnvaziv A-Line): Innominate arter ekarte edildiğinde veya klemp konduğunda sağ kol nabzı kaybolacağından, invaziv tansiyon KESİNLİKLE SOL KOLDAN VEYA FEMORAL ARTERDEN takip edilmelidir.',
      'Santral Venöz Kateter (CVC): Sağ internal juguler veya subklaviyan ven cerrahi sahada kalabileceğinden, sol internal juguler ven veya ultrason eşliğinde femoral venöz santral yol tercih edilir.',
      'İntraoperatif Nöromonitörizasyon (İONM): Bilateral Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP) ve Somatosensoriyel Uyarılmış Potansiyeller (SSEP); el ve bacak kaslarından sürekli kayıt.',
      'Nöromusküler İleti İzlemi (TOF): MEP takibi için ameliyat boyunca TOF 4/4 tutulur; kürarsız TIVA uygulanır.',
      'Endotrakeal Tüp Kaf Manometresi: Cerrahi ekartasyon esnasında kaf basıncı fırlamalarını engellemek için sürekli 20-22 cmH2O seviyesinde tutulur.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı hedefi > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (14-16G) periferik intravenöz yol',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı Kan Hatları',
      'Cell Saver (Kan Kurtarma Sistemi) ameliyathanede hazır ve steril hatta bağlı'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Boyun Hafif Ekstansiyonda, İnterskapular Silikon Rulo Desteği',
    patientPositionDetails: [
      'İnterskapular rulo ile göğüs kafesi öne doğru yükseltilir; manubrium sterni ve C7-T2 omurgası yüzeye yaklaştırılır.',
      'Baş hafif ekstansiyona ve hafif sağa çevrilir (yaklaşım sol veya sağ manubriotomiye göre değişir; brakiyal pleksus ve karotid gerilmemelidir).',
      'Kollar gövde yanında nötral sarılır; sol eldeki arteriyel ve intravenöz hatlar cerrahi örtü dışından erişilebilir tutulur.',
      'Steril Saha Hazırlığı: Çeneden ksifoid çıkıntıya kadar geniş anterior boyun ve göğüs ön duvarı açıkta bırakılır; olası acil median sternotomi veya torakotomi için hazırlıklı olunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2-2.5 mg/kg) + Fentanil (3-5 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk).',
      '  - İnstabil C7-T2 omurgada MILS eşliğinde Videolaringoskop veya AFOI ile kontrollü entübasyon.',
      '  - Entübasyondan sonra nöromusküler bloker verilmez (kürarsız idame).',
      'İdame: TIVA Protokolü (Propofol 90-150 mcg/kg/dk + Remifentanil 0.1-0.3 mcg/kg/dk). Volatil anesteziklerden kaçınılır (< 0.3 MAC).',
      'Büyük Damar Ekartasyonu ve Hemodinami:',
      '  - Cerrah manubriumu açıp innominate arter ve veni ekarte ederken geçici hipotansiyon veya bradikardi gelişebilir; anestezi ekibi kros-klemp ihtimaline karşı vazopressörleri (Noradrenalin infüzyonu) hazır tutar.',
      'Omurilik Perfüzyon Hedefleri (Watershed Koruması):',
      '  - C7-T3 anterior spinal arter sınır bölgesinde mikrovasküler kord iskemisini engellemek için MAP > 85-90 mmHg tutulmalıdır.',
      'Plevra Açılması Durumunda:',
      '  - Cerrahi sırasında apeks plevrası perfore olursa PEEP nazikçe 5-8 cmH2O\'ya yükseltilir; ameliyat sonunda cerrah tarafından göğüs tüpü konur.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; göğüs ve boyun manipülasyonlarında tüpün bükülmesini engeller.',
      'Tüp cerrahi sahanın karşı tarafındaki ağız kenarına sağlam flasterlenir.',
      'Ekartör yerleşimi sonrası tüp kafı söndürülüp 20 cmH2O\'ya yeniden ayarlanır (RLN felci önleme).'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama, Floroskopik Seviye Teyidi ve Geniş Cerrahi Boyun-Göğüs Örtümü.',
      '2. Düşük Anterior Servikal İnsizyonun Sternum Üzerine Uzatılması (T veya L insizyonu).',
      '3. Manubriotomi / Parsiyel Sternal Split: Salınımlı sternum testeresi (oscillating saw) ile manubriumun açılması ve internal torasik damarların korunması.',
      '4. Retrosternal Mediastinal Diseksiyon: V. brachiocephalica sinistra, A. brachiocephalica (innominate) ve A. carotis communis\'in serbestleştirilip vasküler teyplerle ekarte edilmesi.',
      '5. Prevertebral Fasyanın Açılması ve C7-T3 Omurga Ön Yüzünün Ortaya Konması.',
      '6. Mikrocerrahi Korpektomi ve Dural Dekompresyon (Tümör veya kırık dokuların boşaltılması, omuriliğin rahatlatılması).',
      '7. İntervertebral Expandable Kafes (Cage) / Greft Yerleşimi ve Anterior Servikotorasik Kilitli Plak-Vida Tespiti.',
      '8. Hemostaz Kontrolü, Valsalva Manevrası (BOS kaçağı ve plevral delinme testi), Retrofaringeal ve Mediastinal Drenlerin Konulması, Manubriumun Sternal Tellerle Kapatılması.'
    ],
    emergenceNotes: [
      'GENELDE GECİKMİŞ EKSTÜBASYON TERCİH EDİLİR: Manubriotomi, mediastinal diseksiyon ve uzun süreli trakeal retraksiyon nedeniyle masif havayolu ve retrosternal ödem kaçınılmazdır. Hasta çoğunlukla ameliyathanede ekstübe EDİLMEZ; entübe, sedatize ve baş 30-45° eleve olarak Nöroşirürji/Cerrahi Yoğun Bakım Ünitesine devredilir.',
      'Kaf Kaçak Testi (Cuff Leak Test): Postoperatif 12-24. saatte YBÜ\'de ödem geriledikten ve kaf kaçak sesi pozitif doğrulandıktan sonra kontrollü ekstübasyon planlanır.',
      'Kanama ve Tamponad Alarmı: Retrosternal alanda kanama trakeayı basıya uğratabileceği gibi vena cava superior basısı ve hemodinamik kollaps yaratabilir; mediastinal drenler saatlik takip edilir.',
      'Acil Yatakbaşı Sternal Açma Kiti: Yatakbaşında hazır tel kesici ve krikotirotomi kiti bulundurulmalıdır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal İntensif Analjezi Protokolü:',
      '  - Sternal ayrışma ve derin servikotorasik diseksiyon nedeniyle postoperatif ağrı çok şiddetlidir.',
      '  - Cerrahi Kapanış Sırasında Sternal Periost ve Servikal Cilde Lokal Anestezik İnfiltrasyonu (Levobupivakain %0.25 + Epinefrin).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Hasta Kontrollü Analjezi (İV PCA): Fentanil veya Morfin infüzyonu (solunum depresyonu yakın izlenir).',
      '  - Nöropatik ağrı ve radiküler sızılar için Pregabalin / Gabapentin idamesi.'
    ],
    prospectRecommendations: [
      'Kompleks transsternal omurga cerrahilerinde multimodal non-opioid analjezikler (parasetamol ve seçilmiş NSAİİ) opioid ihtiyacını azaltarak solunum eforunun ve akciğer atelektazisinin önüne geçer.'
    ],
    erasRecommendations: [
      'ERAS Kompleks Omurga Cerrahisi Kılavuzları:',
      '  - Yoğun Bakım İzlemi: İlk 24-48 saat YBÜ\'de sürekli invaziv arter basıncı, CVP, mediastinal drenaj ve saatlik nörolojik muayene takibi.',
      '  - Göğüs Fizyoterapisi ve Erken Spirometri: Sternal açılış ve atelektaziye bağlı pnömoniyi önlemek için triflo (teşvik edici spirometre) ve agresif göğüs fizyoterapisi.',
      '  - Drenaj Yönetimi: Mediastinal ve prevertebral drenler 24 saatlik kanama < 50-75 mL olana dek (genellikle 48-72 saat) tutulur; lenfatik şilöz sızıntı (trigliserid testi) izlenir.',
      '  - Erken Nörolojik Değerlendirme: Alt ekstremite motor kuvveti ve T1-T2 dermatomunda duyusal fonksiyon saatlik kontrol edilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Spine Surgery: Anterior Cervicothoracic Spine Surgery, pp. 518-524. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Debono, B., et al. (2021). Consensus statement for perioperative care in lumbar and cervical spine surgery: Enhanced Recovery After Surgery (ERAS®) Society recommendations. Spine, 46(11), 740-754.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Complex Spine and Thoracotomy/Sternotomy Procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Sundaresan, N., et al. (1993). The transsternal approach to the upper thoracic vertebrae. American Journal of Surgery, 166(4), 384-388.',
      'Kaya, R. A., et al. (2007). Modified transmanubrial approach for the cervicothoracic junction. Journal of Neurosurgery: Spine, 6(1), 89-94.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Clinical Guidelines for Hemodynamic and Neurophysiological Monitoring in High-Risk Cervicothoracic Spine Surgery.',
      'North American Spine Society (NASS). Evidence-Based Clinical Guidelines for Multidisciplinary Spine Care: Cervicothoracic Decompression and Stabilization.'
    ]
  }
};
