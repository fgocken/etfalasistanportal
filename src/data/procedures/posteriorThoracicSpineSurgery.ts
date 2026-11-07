import { ProcedureDefinition } from '../../types/procedures';

/**
 * Posterior Torasik Omurga Cerrahisi: Laminektomi, Kostotransversektomi ve Enstrümente Füzyon (Pedikül Vidaları ve Osteotomiler)
 * (Posterior Thoracic Spine Surgery: Laminectomy, Costotransversectomy, and Instrumented Fusion)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Spine Surgery: Posterior Thoracic Spine Surgery, pp. 530-536),
 * Scoliosis Research Society (SRS), North American Spine Society (NASS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Kompleks Omurga Cerrahisi Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const posteriorThoracicSpineSurgery: ProcedureDefinition = {
  id: 'posterior-thoracic-spine-surgery',
  name: 'Posterior Torasik Omurga Cerrahisi: Laminektomi, Kostotransversektomi ve Enstrümente Füzyon (Pedikül Vidaları ve Osteotomiler)',
  shortCode: 'TORASİK-POST',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orta ve alt torakal omurgada (T1-T12 seviyeleri) kord basısı, travmatik kırık-çıkıklar, spinal tümörler veya kifoskolyoz deformitelerinde posterior orta hat yaklaşımı ile uygulanan majör cerrahi dekompresyon ve enstrümentasyon ameliyatıdır. Paraspinal kaslar subperiosteal olarak faset eklemleri ve transvers çıkıntılara dek sıyrılır. Basıyı kaldırmak için Laminektomi uygulanabilir; anterior patolojilere (kalsifiye disk veya korpus tümörü) plevraya girmeden posterolateralden ulaşmak için ise Kosta rezeksiyonu ve transvers proçesin çıkarılmasıyla Kostotransversektomi veya Lateral Ekstrakaviter Yaklaşım (LECA) uygulanır. Biyomekanik rekonstrüksiyon ve deformite düzeltilmesi amacıyla pedikül vidaları, kancalar (hooks), rodlar ve osteotomiler (Smith-Petersen [SPO], Pedikül Çıkarma [PSO] veya Vertebral Kolon Rezeksiyonu [VCR]) eşliğinde rijit posterior füzyon tamamlanır.',
  indications: [
    'Torasik Spinal Stenoz ve Torasik Miyelopati: Ligamentum flavum hipertrofisi/ossifikasyonu (OLF) veya faset artrozuna bağlı torasik kord basısı',
    'İnstabil Torakal Kırık-Çıkıklar: T1-T12 instabil burst kırıkları, şans kırıkları veya faset subluksasyonları',
    'Torakal Omurga Tümörleri ve Metastazları: Arka veya ön-arka elemanları tutan, patolojik kırık ve kord basısı yaratan kitlelerin dekompresyonu ve çok seviyeli posterior enstrümantasyonu',
    'Kifoskolyoz ve Sagital Dengesizlik Düzeltilmesi: Scheuermann kifozu, ankilozan spondilit rijit kifozu veya adölesan idiyopatik skolyoz (AIS) deformite cerrahisi (SPO/PSO osteotomileri)',
    'Posterolateral Yolla Torakal Diskektomi / Korpektomi: Plevrayı ve göğüs boşluğunu açmadan kostotransversektomi yoluyla anterior korpus lezyonlarının boşaltılması'
  ],
  averageDuration: '3.5 - 7.0 saat (Pozisyonlama ve silikon rulo desteği: 45-60 dk; Posterior subperiosteal kas diseksiyonu: 45-60 dk; Laminektomi veya kostotransversektomi: 60-90 dk; Çok seviyeli pedikül vidalama [genellikle 6-12 vida]: 60-90 dk; Deformite osteotomisi [SPO/PSO], rod montajı ve posterolateral greftleme: 60-120 dk; Hemostaz, subfasial drenaj ve katmanlı kapanış: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '500 - 1800 mL (Geniş kas diseksiyonu, çok seviyeli pedikül girişleri, osteotomiler ve epidural venöz pleksus nedeniyle; 6 seviye üstü deformite ve tümör cerrahilerinde 2000-3000 mL\'yi bulabilir)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Geniş Kemik Kansellöz Yatak ve Epidural Pleksus)',
    crossMatchRequirement: 'En az 3-4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite Taze Donmuş Plazma (TDP) hazır bulundurulmalıdır; Traneksamik Asit (TXA) infüzyonu ve Cell Saver cihazı ZORUNLUDUR',
    transfusionProbability: '%45 - %70 (Deformite cerrahisinde ve tümör rezeksiyonlarında %80)',
    criticalBleedingSources: [
      'Epidural Venöz Pleksus (Batson pleksusu — özellikle batın basısı olduğunda masif venöz göllenme)',
      'Segmental İnterkostal Arter ve Venler (Kostotransversektomide kosta başı rezeke edilirken foramen girişinde yırtılma)',
      'Geniş Paraspinal Kas Yatağı ve Çok Seviyeli Pedikül Kemik İliği Kanamaları',
      'PSO / VCR Osteotomi Hatlarında Korpus Süngeröz Kanamaları'
    ],
    hemostasisStrategies: [
      'İntraoperatif Traneksamik Asit (TXA) Protokolü: İndüksiyonda 10-30 mg/kg yükleme, ardından 1-5 mg/kg/saat sürekli infüzyon (kan kaybını %30-50 azaltır)',
      'Prone pozisyonda batın boşluğunun tamamen serbest bırakılarak Batson pleksus basıncının sıfırlanması',
      'Pedikül girişlerinde ve kemik osteotomi yüzeylerinde bol steril kemik mumu uygulaması',
      'Hemostatik matriks (FloSeal, Surgicel, Gelfoam + trombin) ve Cell Saver kullanımı',
      'Derin subfasial çift negatif basınçlı drenaj'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Dengeli Genel Endotrakeal Anestezi (GETA) + TIVA (Total İntravenöz Anestezi: Propofol + Remifentanil) — İntraoperatif Transkraniyal MEP ve SSEP takibi için MUTLAK ALTIN STANDARTTIR'
    ],
    alternative: [
      'İONM Sinyal Düşüşlerinde: Yalnızca TIVA protokolünün optimize edilmesi; volatil inhalasyon gazları (< 0.3 MAC) MEP amplitüdlerini baskıladığından kaçınılır'
    ],
    notes: 'POSTERİOR TORASİK CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) PRONE POZİSYONDA KARIN BOŞLUĞU VE BATSON EPİDURAL PLEKSUS KANAMASI — Hasta prone pozisyona (Jackson masası veya göğüs-pelvis silikon ruloları) alınırken batın kesinlikle hiçbir yere temas etmemeli, tamamen boşlukta asılı kalmalıdır! Karına binen en ufak bası Vena Cava Inferior\'u sıkıştırır; kan Batson epidural pleksusuna şant olarak spinal kanalda durdurulamaz venöz kan gölüne yol açar ve cerrahi görüşü imkansız kılar. (2) SIFIR OKÜLER BASI VE POSTOPERATİF GÖRME KAYBI (POVL) KORUMASI — Saatler süren prone pozisyon, masif kan kaybı ve hipotansiyon İskemik Optik Nöropati (ION) ve Santral Retinal Arter Oklüzyonuna (CRAO) yol açarak KALICI KÖRLÜK yaratır! Göz küreleri her 15-30 dakikada bir kontrol edilmeli; orbital bası sıfır tutulmalı, hematokrit > %25-28 (Hgb > 8-9 g/dL) ve MAP > 75-80 mmHg korunmalıdır. (3) TORAKAL KORD İSKEMİSİ, ADAMKIEWICZ VE İONM DİSİPLİNİ — Torakal omurilik dar bir kanaldadır ve T4-T8 watershed bölgesinde kanlanması zayıftır; deformite düzeltme (rotasyon/traksiyon) veya osteotomi sırasında omurilik iskemisi hızla paraplejiye yol açar. Transkraniyal MEP ve SSEP kesintisiz izlenmeli; entübasyon sonrası KESİNLİKLE nöromusküler bloker verilmemelidir (TOF 4/4). MAP > 80-85 mmHg tutulmalı, gerektiğinde Stagnara Uyanma Testi (Wake-up test) hazırlığı bilinmelidir. (4) KOSTOTRANSVERSEKTOMİDE GİZLİ PLEVRAL DELİNME VE PNÖMOTORAKS — Kosta başı ve transvers proçes çıkarılırken parietal plevra hemen kemiğin önündedir; yırtılma durumunda prone pozisyondaki hastada sinsi tansiyon pnömotoraks veya hemotoraks gelişebilir! Ventilatör tepe basınçları (Ppeak) ve EtCO2 sürekli izlenmeli; şüphe anında cerrahi sahaya sıvı dökülüp pozitif basınçlı ventilasyon (Valsalva) ile hava kabarcığı testi yapılmalı ve gerekirse göğüs tüpü konulmalıdır. (5) MASİF KANAMA, TRANEKSAMİK ASİT (TXA) VE CELL SAVER — Çok seviyeli dekortikasyon ve vida girişleri masif kanamaya yol açar; TXA infüzyonu ameliyat başından itibaren uygulanmalı, Cell Saver hazır tutulmalı, kan gazında pıhtılaşma (fibrinojen, kalsiyum, trombosit) yakın takip edilmelidir.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji / Nöroşirürji Konsültasyonu: Torasik miyelopati tablosunun ayrıntılı haritalanması (bacaklarda spastisite, motor güç, Babinski/Klonus, duyu seviyesi ve sfinkter fonksiyonu).',
      'Kardiyoloji Konsültasyonu: Şiddetli torasik kifoskolyozu olan hastalarda kor pulmonale, sağ kalp yüklenmesi ve azalmış kardiyak rezerv; uzun süreli prone pozisyonun kardiyak doluşa etkileri.',
      'Göğüs Hastalıkları Konsültasyonu: Restriktif akciğer hastalığı (özellikle Cobb açısı > 60-70° olan skolyoz veya Scheuermann kifozunda vitalkapasite %40-50 düşebilir); arteriyel kan gazı ve spirometri değerlendirmesi.',
      'Girişimsel Radyoloji Konsültasyonu: Spinal tümör olgularında (özellikle böbrek, tiroid hücreli metastazlar) cerrahi kanamayı azaltmak için preoperatif transarteriyel tümör embolizasyonu.'
    ],
    historyAndPhysical: [
      'Nörolojik Taban Muayenesi: Her iki bacakta tüm kas gruplarının (kuadriseps, hamstring, tibialis anterior, gastroknemius) kuvveti ve duyu seviyeleri ayrıntılı kaydedilir.',
      'Deformite ve Solunum Eforu: Kifoskolyoz derecesi, göğüs kafesi asimetrisi ve yardımcı solunum kaslarının kullanımı.',
      'Zor Hava Yolu Taraması: Torasik deformiteye eşlik eden servikal hareket kısıtlılığı, kısa boyun ve laringoskopi zorluğu.',
      'Koagülasyon Öyküsü: Antikoagülan veya antiagregan kullanımı (epidural hematom parapleji yaratabileceğinden kılavuzlara uygun kesilmelidir).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen düzeyi.',
      'En az 3-4 Ünite Eritrosit Süspansiyonu ve 2 Ünite TDP Cross-Match hazırlığı.',
      'Arteriyel Kan Gazı (Bazal PaO2, PaCO2 ve asit-baz dengesi).',
      'Tüm Omurga Boy Grafileri (Skolyoz/Kifoz Cobb açıları), Torakal MRG ve BT: Spinal kord bası seviyeleri, pedikül kemik çapları (vida boyutu için) ve kalsifiye lezyonlar.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Pozisyonel hipotansiyonu engellemek, MAP > 80-85 mmHg hedefini sürdürmek, seri kan gazı, hemoglobin, laktat ve kalsiyum takibi için zorunludur.',
      'Santral Venöz Kateter (CVC): Vazopressör infüzyonu, CVP takibi ve masif kanamada hızlı santral erişim.',
      'İntraoperatif Nöromonitörizasyon (İONM): Bilateral Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP) ve Somatosensoriyel Uyarılmış Potansiyeller (SSEP); bacak kaslarından sürekli kayıt.',
      'Nöromusküler İleti İzlemi (TOF): MEP takibi için ameliyat boyunca TOF 4/4 (%100) olmalıdır; entübasyon sonrası kas gevşetici kullanılmaz.',
      'Ventilatör Tepe Basıncı (Ppeak) Takibi: Kostotransversektomi esnasında plevra yırtılmasına bağlı pnömotoraksı erken yakalamak için tepe basınç alarmı yakın izlenir.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (14-16G) periferik intravenöz yol',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı Hatlar',
      'Cell Saver (Hücre Kurtarma Sistemi) steril hatta bağlı ve aktif'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon, Jackson Omurga Masası veya Silikon Göğüs-Pelvis Ruloları',
    patientPositionDetails: [
      'BATININ TAMAMEN SERBEST ASILMASI: İntraabdominal basınç artışı Vena Cava Inferior\'a bası yapmamalı ve Batson pleksus kanamasını artırmamalıdır.',
      'SIFIR OKÜLER BASI: Baş ProneView aynalı kask sistemine alınır; göz küreleri her 15-30 dakikada bir aynadan kontrol edilerek orbital bası sıfır tutulur.',
      'Kollar baş yanında "Superman" pozisyonunda veya gövde yanında nötral sarılır; omuzlar aşırı gerdirilmeden brakiyal pleksus ve ulnar sinir korunur.',
      'Dizler hafif fleksiyonda tutulur, ayak bilekleri desteklenir ve parmakların masaya basması önlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2-2.5 mg/kg) + Fentanil (3-4 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + kısa etkili kas gevşetici.',
      '  - Videolaringoskop ile atravmatik entübasyon; spiral (zırhlı) endotrakeal tüp tercih edilir.',
      '  - Entübasyondan sonra nöromusküler bloker verilmez (kürarsız idame).',
      'İdame: TIVA Protokolü (Propofol 90-150 mcg/kg/dk + Remifentanil 0.1-0.3 mcg/kg/dk). İnhalasyon anesteziklerinden kaçınılır (< 0.3 MAC).',
      'Kan Koruma ve TXA Protokolü:',
      '  - İndüksiyonda Traneksamik Asit (10-30 mg/kg İV bolus), ardından 1-5 mg/kg/saat infüzyon.',
      '  - Cell Saver ile toplanan kanın yıkanıp geri verilmesi.',
      'Omurilik Perfüzyon Hedefleri:',
      '  - T4-T8 watershed ve Adamkiewicz alanını korumak için ameliyat boyunca MAP > 80-85 mmHg tutulur.',
      'İONM Alarm Protokolü (Sinyal Düşüşünde):',
      '  - MEP veya SSEP genliğinde > %50 düşüş olursa:',
      '    1. Cerraha derhal haber verilir; vida pozisyonu, kord traksiyonu veya osteotomi hattı kontrol edilir.',
      '    2. MAP hızla > 85-90 mmHg seviyesine yükseltilir (Noradrenalin desteği).',
      '    3. Hematokrit (> %28) ve vücut sıcaklığı kontrol edilir.',
      '    4. Gerekirse implantlar gevşetilir veya Stagnara uyanma testi planlanır.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; prone pozisyonda tüpün bükülmesini ve ısırmasını engellemek için ısırma bloğu yerleştirilir.',
      'Tüpün yüze tespiti terlemeye ve dezenfektana dayanıklı su geçirmez bantlarla sağlamlaştırılır.',
      'Kaf basıncı sürekli manometre ile 20-25 cmH2O seviyesinde sabit tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama ve Floroskopi Altında Torasik Hedef Seviyelerin Doğrulanması.',
      '2. Posterior Orta Hat Cerrahi İnsizyonu ve Subperiosteal Kas Diseksiyonu.',
      '3. Laminektomi veya Kostotransversektomi (Kosta başı rezeksiyonu ve plevra korunması).',
      '4. Çok Seviyeli Torasik Pedikül Vidalarının Yerleştirilmesi (Floroskopi veya nöronavigasyon ile).',
      '5. Deformite Düzeltme Manevraları ve Osteotomiler (SPO, PSO veya VCR — kord gerilimi ve İONM alarmı!).',
      '6. Titanyum Rodların Montajı, Kompresyon/Distraksiyon Ayarı ve Posterolateral Dekortikasyon/Kemik Greftleme.',
      '7. Hemostaz Kontrolü, Valsalva Manevrası (Plevra yırtığı ve BOS kaçağı kontrolü).',
      '8. Derin Subfasial Çift Dren Yerleştirilmesi ve Katmanlı Kapanış.'
    ],
    emergenceNotes: [
      'KONTROLLÜ UYANMA VEYA GECİKMİŞ EKSTÜBASYON: 6 saatten uzun süren, masif kanamalı (> 1500 mL) veya çok seviyeli osteotomi yapılan olgularda yüz ve larinks ödemi riski nedeniyle hasta ameliyathanede ekstübe edilmeyebilir; entübe olarak Yoğun Bakıma transfer edilir.',
      'Kaf Kaçak Testi: Ekstübasyon planlanıyorsa tüp kafı indirilerek kaçak sesi doğrulanır.',
      'Öksürmesiz Uyanma: Geniş cerrahi sahada venöz kanamayı önlemek için IV Lidokain (1.5 mg/kg) ile pürüzsüz uyanma sağlanır.',
      'Acil Nörolojik Muayene: Hasta uyanır uyanmaz her iki bacakta ayak bileği ve başparmak motor hareketi teyit edilmelidir (spinal kord hasarı derhal ekarte edilmelidir!).'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Agresif Analjezi Protokolü:',
      '  - Geniş posterior torasik kas diseksiyonu ve kosta rezeksiyonları şiddetli postoperatif ağrı yaratır.',
      '  - Cerrahi Kapanış Sırasında Paraspinal Kas Yatağına Lokal Anestezik İnfiltrasyonu (Bupivakain %0.25 + Epinefrin).',
      '  - Ultrason Eşliğinde İki Taraflı Erektör Spina Plan Bloğu (ESPB) veya İnterkostal Bloklar.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - İV Hasta Kontrollü Analjezi (IV PCA): Morfin veya Fentanil infüzyonu.',
      '  - Postoperatif Kas Spazmları İçin: Tizanidin veya düşük doz Benzodiazepin.'
    ],
    prospectRecommendations: [
      'Majör posterior spinal füzyon cerrahisinde cerrahi alan lokal anestezik infiltrasyonu, rejyonel fasyal plan blokları (ESPB) ve sistemik parasetamol kullanımı opioid gereksinimini azaltır ve erken solunum rehabilitasyonunu destekler.'
    ],
    erasRecommendations: [
      'ERAS Kompleks Omurga Cerrahisi Kılavuzları:',
      '  - Yoğun Bakım Takibi: İlk 24 saat YBÜ\'de saatlik alt ekstremite motor muayenesi, hemodinamik stabilite ve drenaj takibi.',
      '  - Solunum Desteği ve Erken Teşvik Edici Spirometri (Triflo): Atelektazi ve hipoventilasyonu önlemek için saat başı göğüs fizyoterapisi.',
      '  - Drenaj Yönetimi: Subfasial drenler saatlik izlenir; 24 saatlik kanama < 50-100 mL olduğunda (genellikle 48-72 saatte) çekilir.',
      '  - Erken Mobilizasyon: Rijit vida fiksasyonu sağlanan hastalar hekim onayı ile postoperatif 1-2. günde torakolumbosakral ortezi (TLSO) ile mobilize edilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Spine Surgery: Posterior Thoracic Spine Surgery, pp. 530-536. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Debono, B., et al. (2021). Consensus statement for perioperative care in lumbar and cervical spine surgery: Enhanced Recovery After Surgery (ERAS®) Society recommendations. Spine, 46(11), 740-754.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Complex Thoracic and Lumbar Spine Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Bridwell, K. H., et al. (2003). Complications and outcomes in posterior thoracic and lumbar spine deformity surgery. Spine, 28(20S), S209-S218.',
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. Practice advisory for perioperative visual loss associated with spine surgery. Anesthesiology, 130(1), 12-30.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Guidelines on Intraoperative Neuromonitoring and Hemodynamic Management in Complex Spine Deformity Surgery.',
      'Scoliosis Research Society (SRS). Morbidity & Mortality Guidelines for Posterior Thoracic Instrumentation and Osteotomies.'
    ]
  }
};
