import { ProcedureDefinition } from '../../types/procedures';

/**
 * Orta ve Alt Servikal Omurga Anterior Füzyon ve Fiksasyonu: Anterior Servikal Diskektomi ve Füzyon (ACDF / ACCF)
 * (Anterior Fusion/Fixation of The Mid and Lower Cervical Spine: ACDF / ACCF)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Spine Surgery: Anterior Fusion/Fixation of the Mid and Lower Cervical Spine, pp. 506-512),
 * Cervical Spine Research Society (CSRS), North American Spine Society (NASS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Omurga Cerrahisi Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const anteriorMidLowerCervicalFusion: ProcedureDefinition = {
  id: 'anterior-mid-lower-cervical-fusion',
  name: 'Orta ve Alt Servikal Omurga Anterior Füzyon ve Fiksasyonu: Anterior Servikal Diskektomi ve Füzyon (ACDF / ACCF)',
  shortCode: 'ACDF-ACCF',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Spinal Nöroşirürji & Omurga Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orta ve alt servikal omurgada (C3-C7 ve C7-T1 bileşkesi) disk hernisi, spondilotik miyelopati, travmatik kırık-çıkık veya spinal instabilite olgularında; anterior Smith-Robinson yaklaşımı ile trakea ve özofagus mediale, karotid kılıf (A. carotis communis ve V. jugularis interna) laterale ekarte edilerek omurga ön yüzüne ulaşılması, bası yapan dejeneratif diskin (ACDF) veya korpusun (ACCF / korpektomi) ve osteofitlerin mikrocerrahi ile çıkarılarak omurilik ve sinir köklerinin dekomprese edilmesi, ardından boşalan mesafeye otolog/allogreft kemik veya PEEK/titanyum kafes (cage) yerleştirilip anterior titanyum plak ve vidalarla kalıcı biyomekanik fiksasyon sağlanması ameliyatıdır.',
  indications: [
    'Servikal Spondilotik Miyelopati (CSM): Omurilik basısına bağlı el beceriksizliği, ataksik yürüyüş, hiperrefleksi ve patolojik refleksler (Hoffmann, Babinski) gösteren C3-C7 arası tek veya çok seviyeli anterior spinal kord basıları',
    'Servikal Radikülopati: Medikal ve fizik tedaviye dirençli, dermatom boyunca yayılan şiddetli radiküler kol ağrısı, parestezi ve motor kayıp yaratan servikal disk hernileri',
    'Servikal Travma ve Kırık-Çıkıklar: C3-C7 instabil burst kırıkları, tear-drop kırıkları veya faset subluksasyonları',
    'Posterior Longitudinal Ligaman Ossifikasyonu (OPLL): Anterior bası yaratan servikal kalsifikasyonlar (ACCF gerektiren olgular)',
    'Servikal Kifoz ve Deformite Düzeltilmesi',
    'Servikal Vertebra Tümörleri veya Osteomiyelit / Diskit Sekeli: Korpektomi, dekompresyon ve kafes/plak rekonstrüksiyonu',
    'Psödoartroz veya Komşu Segment Hastalığı (ASD): Önceki füzyon cerrahisi sonrası gelişen instabilite veya komşu disk dejenerasyonu'
  ],
  averageDuration: '1.5 - 4.0 saat (Tek seviye ACDF: 1.5 - 2.0 saat; Çok seviyeli [2-3 seviye] ACDF veya korpektomi [ACCF]: 2.5 - 4.0 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '50 - 250 mL (Standart tek-çift seviye ACDF\'de 50-150 mL; korpektomi [ACCF], travma veya tümör rezeksiyonlarında 200-500 mL)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük - Orta Düzey Risk (Ancak Boyundaki Zengin Damar Yatağı ve Dar Servikal Alanda Küçük Bir Hematom Dahi Ölümcül Hava Yolu Tıkanıklığı Yaratır)',
    crossMatchRequirement: 'Tip & Screen (T&S) kan grubu doğrulaması zorunludur; çok seviyeli korpektomi veya travma olgularında 1-2 Ünite Eritrosit Süspansiyonu (ES) hazır bulundurulmalıdır',
    transfusionProbability: '< %3 (Standart ACDF); korpektomi ve travma olgularında %10 - %20',
    criticalBleedingSources: [
      'A. Carotis Communis ve V. Jugularis Interna (Karotid kılıfın lateral ekartasyonunda vasküler adventisya yırtılması veya traksiyon hasarı)',
      'A. Thyroidea Superior ve A. Thyroidea Inferior Dalları (Prevertebral diseksiyonda bağlanması gerekebilir)',
      'A. Vertebralis (Özellikle korpektomi sırasında unkovertebral eklem sınırları [Luschka eklemi] aşıldığında foramen transversariumdaki vertebral arterin yırtılması — masif fışkırıcı kanama ve beyin sapı iskemisi riski!)',
      'Prevertebral Venöz Pleksus ve Korpus Kemik Süngeröz Kanamaları'
    ],
    hemostasisStrategies: [
      'Mikronöroşirürjikal bipolar koagülasyon (monopolar koter trakea, özofagus ve karotid kılıf komşuluğunda KESİNLİKLE kullanılmaz)',
      'Vertebra korpus ve posterior longitudinal ligaman kanamalarında kemik mumu ve hemostatik ajanlar (FloSeal, Surgicel, pamuk basısı)',
      'Vertebral arter yaralanması şüphesinde anında FloSeal tamponadı, cerrahi klips veya mikro-dikiş; acil anjiyo-embolizasyon hazırlığı',
      'Operasyon sahasına subfasial negatif basınçlı mini-dren yerleştirilmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) — İntraoperatif MEP ve SSEP nöromonitörizasyonu yapılacak olgularda ALTIN STANDARTTIR',
      'İkinci Seçenek (İONM Yapılmayan Standart Tek Seviye ACDF İçin): GETA + Düşük Doz Sevofluran/Desfluran (MAC 0.8-1.0) + Titre Edilmiş Opioid'
    ],
    alternative: [
      'Servikal Pleksus Bloğu + Sedasyon: Yalnızca genel anestezi alamayacak aşırı yüksek kardiyopulmoner riskli seçilmiş olgularda (rutin pratikte hava yolu kontrolü ve ekartör basısı nedeniyle tercih edilmez)'
    ],
    clinicalRationale: 'İntraoperatif MEP/SSEP monitörizasyonu gereken anterior servikal cerrahide sinyalleri baskılamamak için kürarsız Propofol + Remifentanil TIVA altın standarttır. Miyelopatik servikal kordda ekstansiyondan kaçınmak için nötral videolaringoskop/AFOI ile entübasyon ve Caspar ekartör basısı altında lümen kollapsını önlemek için karşı ağız köşesine sabitlenen spiral telli ETT seçimi zorunludur.',
    notes: 'ANTERİOR SERVİKAL FÜZYONDA (ACDF/ACCF) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) İNSTABİL BOYUNDA HAVA YOLU VE ENTÜBASYON GÜVENLİĞİ — Şiddetli miyelopati, spinal darlık veya travmatik servikal kırığı olan hastalarda doğrudan laringoskopi sırasında boyna ekstansiyon verilmesi omuriliği sıkıştırarak masif kord iskemisine ve kuadriplejiye yol açar! Entübasyon boyun nötral pozisyondayken Manuel İn-Line Stabilizasyon (MILS) eşliğinde Videolaringoskop (GlideScope/McGrath) veya Uyanık Fiberoptik Entübasyon (AFOI) ile gerçekleştirilmelidir. (2) EKARTÖR BASINCI VE REKÜRREN LARİNGEAL SİNİR (RLN) KORUMASI (KAF BASINCI DEFLASYONU!) — Cerrah Caspar veya Cloward ekartörlerini yerleştirip trakea ve özofagusu mediale çektiğinde, endotrakeal tüpün kafı trakea mukozasını ve altındaki Rekürren Laringeal Siniri (RLN) tüp duvarı ile krikoid kıkırdak arasına sıkıştırır; bu durum kalıcı ses kısıklığına ve vokal kord felcine yol açar! Ekartörler yerleştirildikten hemen sonra ANESTEZİ UZMANI KAF BASINCINI GEÇİCİ OLARAK SÖNDÜRMELİ (deflate) VE YALNIZCA KAÇAĞI ÖNLEYECEK MİNİMUM BASINCA (20 cmH2O) YENİDEN ŞİŞİRMELİDİR. (3) İNTRAOPERATİF NÖROMONİTÖRİZASYON (MEP/SSEP) VE KAS GEVŞETİCİ DİSİPLİNİ — Diskektomi, korpektomi ve kafes yerleştirilmesi esnasında spinal kord gerilimini ve perfüzyonunu izlemek için Transkraniyal MEP ve SSEP kullanılır. Entübasyon sonrasında KESİNLİKLE nöromusküler bloker verilmemeli (TOF 4/4 korunmalı) ve anestezi TIVA ile idame ettirilmelidir. (4) OMURİLİK PERFÜZYON BASINCI HEDEFLERİ (MAP > 80 mmHg) — Spondilotik miyelopatik kord mikrovasküler iskemiye aşırı hassastır; ameliyat boyunca ortalama arter basıncı (MAP) kesinlikle 75-80 mmHg\'nin altına düşürülmemelidir; hipotansiyondan kaçınılmalı, gereğinde Efedrin veya Noradrenalin infüzyonu ile perfüzyon desteklenmelidir. (5) POSTOPERATİF HAVA YOLU KATASTROFİSİ: BASI HEMATOMU VE ACİL YATAKBAŞI PROTOKOLÜ — Anterior servikal cerrahinin en korkulan ölümcül komplikasyonu derin prevertebral hematom ve retrofaringeal ödemdir. Ameliyat sonrasında hasta derlenmede veya serviste aniden stridor, solunum sıkıntısı ve boyunda gergin şişlik geliştirirse RE-ENTÜBASYON İÇİN DAKİKALARCA BEKLENMEMELİ; DERHAL YATAKBAŞINDA TÜM DİKİŞLER SÖKÜLEREK HEMATOM BOŞALTILMALI VE TRAKEA BASIDAN KURTARILMALIDIR! Yatakbaşında hazır acil dikiş alma seti ve krikotirotomi kiti bulundurulmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji / Nöroşirürji Konsültasyonu: Servikal miyelopati derecesi (Nurick skalası, mJOA skoru), etkilenen dermatom ve myotom seviyeleri, patolojik refleksler (Hoffmann, Babinski, klonus) ve bazal motor güç belgelenmelidir.',
      'Kardiyoloji Konsültasyonu: İleri yaş hastalarda eşlik eden koroner arter hastalığı, hipertansiyon ve serebrovasküler hastalık rezervi; karotid arter ekartasyonunun tolere edilebilirliği.',
      'KBB Konsültasyonu: Preoperatif ses kısıklığı öyküsü veya daha önce geçirilmiş anterior boyun cerrahisi (önceki cerrahi tarafında kompanse asemptomatik vokal kord paralizisi olabilir; ikinci girişimde karşı taraf RLN felci gelişirse iki taraflı kord felci ve tam hava yolu tıkanıklığı doğar; vokal kord muayenesi zorunludur!).',
      'Göğüs Hastalıkları Konsültasyonu: Miyelopatik hastalarda diyafram kas gücü, restriktif solunum disfonksiyonu ve uyku apnesi tespiti.'
    ],
    historyAndPhysical: [
      'Spinal Kord İskemisi ve İnstabilite Taraması: Boyun hareketleriyle kollarda elektriklenme hissi (Lhermitte belirtisi), yürüme ataksisi ve spastisite varlığı.',
      'Zor Hava Yolu Taraması: Servikal fleksiyon ve ekstansiyon kısıtlılığı, kısa ve kalın boyun, diş yapısı ve Mallampati skoru (boyna ekstansiyon verilmeden değerlendirilir).',
      'Karotid Arter Patolojisi: Boyun üfürümü sorgulaması, karotid darlığı öyküsü (ameliyatta karotid kılıf mediale/laterale çekilecektir).',
      'Disfaji ve Yutma Güçlüğü: Preoperatif bazal yutma fonksiyonu (özofagus retraksiyonuna bağlı postoperatif geçici disfaji sıktır).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR tam normal olmalıdır (servikal hematom gelişimini önlemek için antikoagülan ve antiagreganlar kılavuzlara uygun kesilmiş olmalıdır).',
      'Serum Elektrolitleri, BUN, Kreatinin ve Glukoz düzeyi.',
      'Kan Grubu, Antikor Tarama ve T&S doğrulaması (korpektomi planlanan olgularda 1-2 Ünite ES Cross-Match).',
      'Servikal Omurga Dinamik Grafileri ve MRG / BT: İnstabilite (fleksiyon-ekstansiyon grafileri), spinal kord hiperintensitesi (miyelomalazi sinyali), osteofit boyutu ve vertebral arterin unkusla ilişkisi incelenir.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Miyelopatisi olan, çok seviyeli korpektomi yapılan veya kardiyovasküler riski bulunan hastalarda sürekli kan basıncı takibi ve spinal kord perfüzyonunun (MAP > 80 mmHg) kesintisiz korunması için önerilir.',
      'İntraoperatif Nöromonitörizasyon (İONM): Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP) ve Somatosensoriyel Uyarılmış Potansiyeller (SSEP) kaydı (üst ve alt ekstremitelerden bilateral kayıt alınır).',
      'Nöromusküler İleti İzlemi (TOF): MEP izlemi için ameliyat boyunca TOF oranı 4/4 (%100) tutulmalıdır; kas gevşeticiden kaçınılır.',
      'Endotrakeal Tüp Kaf Manometresi: Ekartörler açıldıktan sonra tüp kaf basıncını 20-25 cmH2O seviyesinde tutmak için sürekli manometrik izlem.',
      'İdrar Çıkışı Takibi: Mesane sondası ile saatlik idrar takibi (> 0.5 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı (16-18G) güvenli periferik intravenöz yol (kollar gövde yanında sarılacağından uzatma hatları sağlam tespit edilmelidir)',
      'Gereğinde radiyal arter kanülasyonu'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Boyun Nötral-Hafif Ekstansiyonda, Baş Silikon Halka İle Desteklenmiş',
    patientPositionDetails: [
      'Kollar Vücut Yanına Nötral Pozisyonda Alınır ve Çarşafla Sarılır: Floroskopik görüntüde omuzların alt servikal mesafeyi (C6-C7) gölgelemesini engellemek için omuzlar aşağıya doğru nazikçe flasterle traksiyona alınır.',
      'AŞIRI OMUZ TRAKSİYONUNDAN KAÇINILMALIDIR: Omuzların aşırı aşağı çekilmesi brakiyal pleksus gerilme hasarına (pleksopati) yol açar; İONM\'de brakiyal sinir yanıtları izlenir.',
      'Boyun altına küçük bir silikon rulo konularak servikal lordoz nazikçe desteklenir; aşırı hiperekstansiyondan kaçınılır.',
      'Gözler koruyucu pomadla kapatılır, bası noktaları jel pedlerle korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk).',
      '  - Entübasyonda MILS eşliğinde Videolaringoskop (GlideScope/McGrath) veya uyanık fiberoptik yaklaşım.',
      '  - Entübasyon için kısa etkili Rokuronyum (0.6 mg/kg) verilebilir; ancak cerrahi ve İONM başlamadan önce nöromusküler blokaj Sugammadeks ile geri döndürülür veya kendiliğinden çözülmesi beklenir.',
      'İdame: TIVA Protokolü (Propofol 80-140 mcg/kg/dk + Remifentanil 0.05-0.25 mcg/kg/dk). MEP sinyallerini baskılamamak için inhalasyon gazlarından kaçınılır veya < 0.3 MAC seviyesinde tutulur.',
      'Ekartör Yerleşimi ve Kaf Basıncı Yönetimi:',
      '  - Cerrahi ekartörler açıldığında tüp kaf basıncı fırlar; anestezi uzmanı kafı tamamen indirip şırınga veya manometre ile sadece kaçak kesilene dek (20-22 cmH2O) yeniden şişirir (RLN felci önleme).',
      'Omurilik Perfüzyon Hedefleri:',
      '  - Dekompresyon ve greft çakılması esnasında kord iskemisini önlemek için MAP > 80-85 mmHg seviyesinde tutulur; hipotansiyona izin verilmez.',
      'İONM Sinyal Düşüşü Protokolü:',
      '  - MEP veya SSEP genliğinde > %50 düşüş veya latansta > %10 uzama olursa:',
      '    1. Cerraha anında bildirilir; cerrahi manipülasyon, ekartör gerginliği veya greft boyutu kontrol edilir.',
      '    2. Ortalama arter basıncı (MAP) > 85-90 mmHg seviyesine yükseltilir (vazopressör desteği).',
      '    3. Anestezi derinliği, hematokrit ve vücut sıcaklığı kontrol edilir.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp tercih edilir; cerrahi sahanın karşı tarafındaki ağız köşesine sağlam tespit edilir.',
      'Kaf basıncı sürekli manometre ile takip edilir.',
      'Ekstübasyonda Düzgün Uyanma: Öksürük ve ıkınmayı önlemek için IV Lidokain (1.5 mg/kg) uygulanır.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama ve Floroskopik Cerrahi Seviye Doğrulaması (C3-C7 aralığının işaretlenmesi).',
      '2. Anterior Transvers veya Longitudinal Boyun İnsizyonu ve Platizma Kası Diseksiyonu.',
      '3. Smith-Robinson Planı: Karotid kılıf ile trakeoözofageal kompartman arasından prevertebral fasyaya ulaşılması.',
      '4. Cerrahi Ekartörlerin Yerleştirilmesi (Kaf basıncının söndürülüp yeniden ayarlanması!).',
      '5. Diskektomi / Korpektomi ve Posterior Osteofitlerin Eksizyonu (Vertebral arter ve dura koruması).',
      '6. Posterior Longitudinal Ligamanın Açılması ve Omuriliğin / Sinir Köklerinin Tam Dekompresyonu.',
      '7. İntervertebral Kafes (Cage) / Kemik Greftinin Yerleştirilmesi ve Anterior Titanyum Plak-Vida Fiksasyonu.',
      '8. Hemostaz Kontrolü, Valsalva Manevrası (Dural yırtık kontrolü), Subfasial Dren Yerleştirilmesi ve Tabakalı Kapanış.'
    ],
    emergenceNotes: [
      'ÖKSÜRMESİZ VE IKINMASIZ PÜRÜZSÜZ UYANMA: Ekstübasyon esnasında öksürme ve venöz hipertansiyon anterior prevertebral alanda kanamayı tetikleyerek dakikalar içinde ölümcül servikal hematom yaratır! IV Lidokain (1.5 mg/kg) veya Remifentanil infüzyonu altında uyanma sağlanır.',
      'KAF KAÇAK TESTİ (CUFF LEAK TEST): Çok seviyeli cerrahilerde veya uzun süren ekartasyon olgularında laringeal/retrofaringeal ödem riski nedeniyle tüp kafı indirilerek kaçak sesi doğrulanmadan ekstübe edilmemelidir.',
      'Erken Nörolojik Değerlendirme: Hasta uyanır uyanmaz her iki el, kol ve bacakta motor kuvvet (deltoid, biseps, el sıkma, kuadriseps, ayak bileği) teyit edilmelidir.',
      'Ses Kalitesi Kontrolü: Hastanın konuşması dinlenir; kaba ses kısıklığı veya nefesli ses tek taraflı RLN zedelenmesini gösterir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - Cerrahi Kapanış Sırasında Cilt ve Fasyaya Lokal Anestezik İnfiltrasyonu (Bupivakain %0.25 + Epinefrin): Erken postop kesi ağrısını belirgin azaltır.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kısa Süreli Oral/IV NSAİİ (İbuprofen veya Deksketoprofen): Kemik füzyonunu olumsuz etkilememesi için düşük dozda ve kısa süreli (ilk 48 saat) tutulur.',
      '  - Şiddetli Ağrıda Düşük Doz Titre Edilmiş Opioid (Tramadol veya kontrollü Fentanil).',
      '  - Postoperatif Kas Spazmları ve Boyun Gerilimi İçin: Kısa süreli kas gevşetici (Tizanidin) veya düşük doz benzodiazepin.'
    ],
    prospectRecommendations: [
      'Anterior servikal diskektomi ve füzyon olgularında insizyonel lokal anestezik infiltrasyonu, sistemik parasetamol ve kontrollü non-opioid analjezikler postoperatif ağrıyı güvenle kontrol altına alarak erken ekstübasyon ve mobilizasyonu kolaylaştırır.'
    ],
    erasRecommendations: [
      'ERAS Servikal Omurga Cerrahisi Rehberi:',
      '  - Kırmızı Bayrak Alarmı (Genişleyen Servikal Hematom): İlk 24 saat boyunca boyun çevresi, solunum rahatlığı, stridor ve dren çıkışı saatlik izlenir. Boyunda gergin şişlik veya solunum sıkıntısında DERHAL YATAKBAŞINDA YARA AÇILIP DRENE EDİLMELİDİR.',
      '  - Disfaji Takibi: Hastalarda özofagus retraksiyonuna bağlı geçici yutma güçlüğü sıktır; postop ilk saatlerde sıvı gıdalarla başlanır, tolere ettikçe yumuşak diyete geçilir.',
      '  - Erken Mobilizasyon: Cerrahi stabilitesi anterior plakla sağlanan hastalar ameliyat sonrası 4-6. saatte servikal boyunluk (Philadelphia veya yumuşak boyunluk) desteğiyle ayağa kaldırılır.',
      '  - Subfasial Dren Çekilmesi: 24 saatlik drenaj < 30-50 mL olduğunda genellikle postoperatif 1. günde çekilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Spine Surgery: Anterior Fusion/Fixation of the Mid and Lower Cervical Spine, pp. 506-512. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Debono, B., et al. (2021). Consensus statement for perioperative care in lumbar and cervical spine surgery: Enhanced Recovery After Surgery (ERAS®) Society recommendations. Spine, 46(11), 740-754.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Cervical Spine Decompression and Fusion Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Fountas, K. N., et al. (2007). Anterior cervical discectomy and fusion associated complications: results of 1015 consecutive cases. Spine, 32(21), 2310-2317.',
      'Sagi, H. C., et al. (2002). Airway complications associated with surgery on the anterior cervical spine. Spine, 27(9), 949-953.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Considerations for Patients Undergoing Anterior Cervical Spine Surgery.',
      'Cervical Spine Research Society (CSRS). Clinical Practice Guidelines for the Diagnosis and Treatment of Cervical Spondylotic Myelopathy and Radiculopathy.'
    ]
  }
};
