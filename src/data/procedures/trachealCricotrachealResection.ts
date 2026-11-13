import { ProcedureDefinition } from '../../types/procedures';

/**
 * Trakeal ve Krikotrakeal Rezeksiyon: Laringotrakeal Stenoz ve Trakea Tümör Cerrahisi
 * (Tracheal and Cricotracheal Resection: Post-Intubation Tracheal Stenosis, Subglottic Stenosis, and Tracheal Neoplasms)
 * 
 * Jaffe (5th ed., Section V: Otolaryngology - Larynx and Trachea: Tracheal and Cricotracheal Resection, pp. 781-787),
 * Hermes C. Grillo: "Surgery of the Trachea and Bronchi" (PMPH-USA),
 * Society of Thoracic Surgeons (STS) & European Association for Cardio-Thoracic Surgery (EACTS) Tracheal Guidelines,
 * Difficult Airway Society (DAS) Guidelines,
 * Türk Göğüs Cerrahisi Derneği (TGCD) ve Türk Anesteziyoloji ve Reanimasyon Derneği (TARD) Protokolleri referans alınarak yapılandırılmıştır.
 */
export const trachealCricotrachealResection: ProcedureDefinition = {
  id: 'tracheal-and-cricotracheal-resection',
  name: 'Trakeal ve Krikotrakeal Rezeksiyon: Laringotrakeal Stenoz ve Tümör Cerrahisi (Tracheal and Cricotracheal Resection)',
  shortCode: 'GÖĞÜS / KBB-TRAKEA',
  specialty: 'gogus_cerrahisi',
  specialtyName: 'Göğüs Cerrahisi & KBB',
  secondarySpecialties: ['kbb'],
  categoryTag: 'Hava Yolu & Trakeobronşiyal Cerrahi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Post-entübasyon veya post-trakeostomi darlıkları (PITS), idiyopatik subglottik stenozlar, benign/malign trakeal tümörler (adenoid kistik karsinom, skuamöz hücreli karsinom) ve travmatik hava yolu hasarlarında uygulanan, stenozlu veya tümöral trakeal segmentin (genellikle 2 ila 5 cm / 2-6 kıkırdak halka) ve krikoid kıkırdağın anterior/lateral arkusunun rezeke edilerek primer uç-uca trakeo-trakeal veya krikotrakeal anastomoz yapıldığı majör cerrahi girişimdir. Operasyon servikal yakalık insizyonu (gerekirse kısmi median üst sternotomi) ile başlar; pretrakeal plan açılıp tiroid isthmusu bölünür. Lezyonun hemen distalinden trakea transekte edildiğinde oral endotrakeal tüp cerrahi sahanın proksimaline çekilir; steril sahadan cerrah tarafından distal trakea lümenine steril spiral kaflı tüp yerleştirilerek steril devre üzerinden anestezi cihazına bağlanır (Çapraz-Saha / Cross-Field Ventilasyonu). Arka ve yan duvar anastomoz dikişleri (3-0 veya 4-0 PDS/vikril) konulduktan sonra steril tüp çıkarılır, oral tüp cerrah kılavuzluğunda anastomoz hattının distaline ilerletilir ve ön duvar sütürleri bağlanır. Anastomoz hattındaki gerginliği sıfırlamak için hastanın çenesi sternuma kalın dikişle ("Guardian Suture") fleksiyonda tespit edilir.',
  indications: [
    'Post-Entübasyon ve Post-Trakeostomi Trakeal Stenozu (PITS): Kaflı tüp basısına bağlı kıkırdak nekrozu ve fibrozis sonucu lümende > %50-75 kritik daralma',
    'İdiyopatik ve Otoimmün Subglottik Stenoz (İSGS): Krikoid kıkırdak seviyesinde lokalize darlıklar',
    'Primer Trakeal ve Krikoid Tümörleri: Adenoid kistik karsinom (ACC), skuamöz hücreli karsinom (SCC), trakeal karsinoid ve kondrosarkomlar',
    'İyatrojenik / Travmatik Trakeal Laserasyon ve Avülsiyonlar: Künt/penetran boyun travmaları sonrası kompleks darlıklar',
    'Trakeoözofageal Fistül (TEF) Zemininde Gelişen Geniş Segmental Trakeal Destrüksiyonlar'
  ],
  averageDuration: '150 - 240 dakika (2.5 - 4 saat; stenoz uzunluğuna, laringeal/suprahyoid serbestleştirme manevralarına ve sternotomi gereksinimine göre değişken)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '50 - 200 mL (Pretrakeal venöz pleksus, tiroid bezi isthmusu ve paratrakeal doku diseksiyonu; majör vasküler yaralanma olmadıkça kan kaybı düşüktür; ancak trakea lümenine sızabilecek birkaç damla kan dahi asfiksi ve aspirasyon riski taşır)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Risk / Ancak İntraluminal Kan Aspirasyonu ve Asfiksi Hayati Tehlike Yaratır',
    crossMatchRequirement: '1-2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match Hazır Tutulmalıdır (Brakisoyefalik/İnnominat arter ve arkus aorta komşuluğu nedeniyle)',
    transfusionProbability: '%5 - %10',
    criticalBleedingSources: [
      'Brakisoyefalik (İnnominat) Arter: Distal trakea önünde trakeayı oblik çaprazlayan ana arteriyel gövde (paratrakeal diseksiyonda ölümcül masif arteriyel kanama riski)',
      'Tiroid Bezi İsthmusu ve Tiroid İma Arteri: Pretrakeal orta hat diseksiyonunda arteriyel kanama odağı',
      'İnferior Tiroid Venleri ve Anterior Juguler Venöz Pleksus: Trakea ön yüzünü kaplayan zengin venöz ağ',
      'Sağ ve Sol Karotis Arterleri ile İnternal Juguler Venler: Paratrakeal diseksiyonun lateral sınırları'
    ],
    hemostasisStrategies: [
      'Tiroid isthmusunun titizlikle çift klemplenip 2-0 veya 3-0 vikril ile sütür ligasyonu ve bipolar koagülasyonu',
      'İnnominat arterin cerrahi pedikül ile trakea sütür hattından ayrılması ve vasküler koruyucu ekartasyonu',
      'Trakea lümeni açılmadan önce sahanın tamamen kuru hale getirilmesi ve trakea içi sürekli aspiratör kontrolü'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol/Remifentanil) + İntraoperatif Çapraz-Saha (Cross-Field / Sterile Field) Ventilasyonu — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Kritik Pin-Hole (< 4 mm) Darlıklarda: Uyanık Fleksibl Fiberoptik Kılavuzluğunda Küçük Numara (No 5.0 - 5.5) Mikrolaringeal Tüple (MLT) veya İnce Buji Üzerinden Entübasyon',
      'Ekstrem Kritik Stenoz veya Total Obstrüksiyon Olgularında: Ameliyat Öncesi Femoro-Femoral Veno-Venöz (V-V) veya Veno-Arteriyel (V-A) Ekstrakorporeal Membran Oksijenizasyonu (ECMO) / CPB Stand-By',
      'High-Frequency Jet Ventilation (HFJV): Çapraz masa sahasında ince kateterle supraglottik/infraglottik jet ventilasyon (seçilmiş merkezlerde)'
    ],
    clinicalRationale: 'Trakea açıkken ve tüp değişimleri sırasında inhalasyon anestezisinin devre dışına çıkıp anestezi derinliğinin dalgalanmasını önlemek ve masada hızlı, öksürüksüz uyanmayı sağlamak için Propofol-Remifentanil TIVA altın standarttır. Hava yolu yönetiminde ise rezeksiyon fazında oral tüp subglottise çekilerek distal trakeaya steril spiralli tüple Çapraz-Saha (Cross-Field) ventilasyon kurulur; anastomoz tamamlanırken oral tüp arka sütürler arasından distale ilerletilir ve sütür hattını pozitif basınçtan korumak için masada erken ekstübe edilir.',
    rulesTitle: 'TRAKEAL VE KRİKOTRAKEAL REZEKSİYONDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'TRAKEAL VE KRİKOTRAKEAL REZEKSİYONDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) ÇAPRAZ-SAHA (CROSS-FIELD / STERILE FIELD) VENTİLASYONUNA GEÇİŞ VE İNTRAOPERATİF HAVA YOLU KESİNTİSİ DİSİPLİNİ — Trakea cerrah tarafından transekte edildiği saniyede oral tüpün kafı indirilir ve cerrahi sahanın hemen proksimaline (subglottise) geri çekilir. Cerrahi ekip ameliyat sahasından distal trakea kütüğüne steril spiral kaflı endotrakeal tüpü (genellikle No 6.0-7.0) yerleştirir; tüp steril hortum ve konektörlerle ameliyat masasını aşarak anestezi cihazına bağlanır (Cross-Field Ventilasyon). Bu geçiş anında hasta kısa bir süre apneik kalır; hipoksi gelişmemesi için transection öncesinde %100 O2 ile 3-5 dakika agresif hiperoksijenizasyon şarttır. Steril tüpün kafı şişirildikten sonra simetrik göğüs hareketi ve kapnografide EtCO2 dalgası teyit edilmeden rezeksiyona devam edilmez! (2) ANASTOMOZ SÜTUR BAĞLAMA EVRESİ VE ORAL TÜPÜN TEKRAR AŞAĞI İLERLETİLMESİ ("THE CRITICAL RESWAP") — Rezeksiyon tamamlanıp arka ve yan duvar anastomoz dikişleri yerleştirildikten sonra steril cross-field tüp sahadan çıkarılır; subglottiste bekleyen oral endotrakeal tüp cerrahın doğrudan forseps kılavuzluğu altında anastomoz hattını aşarak distal trakeaya (karinanın hemen üstüne) kaydırılır. Bu kritik aşamada anestezist ve cerrah milimetrik koordinasyonla çalışmalıdır; tüpün ucu arka duvar dikişlerini ASLA yakalamamalı, zorlanmamalı ve koparmamalıdır! Oral tüpün distale indiği görülüp kafı şişirildiği anda ventilasyon tekrar anestezi devresine alınır ve cerrah ön duvar anastomoz sütürlerini bağlar. (3) ÇENE-GÖĞÜS DİKİŞİ ("GUARDIAN SUTURE") VE BOYUN HİPEREKSTANSİYONUNUN MUTLAK YASAKLANMASI — Trakeal rezeksiyon sonrası uç-uca anastomozdaki doku gerginliğini sıfırlamak için hastanın boynu tam fleksiyona getirilir. Cerrah hastanın çenesini sternum veya göğüs ön duvarına 2-0 kalın emilmeyen sütürle ("Guardian Suture") tespit eder. Uyanma, ekstübasyon, sedyeye transfer ve yoğun bakım takibinde boynun en ufak bir hiperekstansiyonu (geriye düşmesi) taze anastomoz hattının anında yırtılmasına (anastomoz dehissansı), masif amfizeme ve ölümcül asfiksiye yol açar! Transferde baş-boyun çift hekim tarafından iki elle nötral-fleksiyonda kilitlenmelidir. (4) PÜRÜZSÜZ UYANMA VE MASADA ERKEN EKSTÜBASYON ("SIFIR ÖKSÜRÜK VE SIFIR IKINMA DİSİPLİNİ") — Pozitif basınçlı mekanik ventilasyon anastomoz hattında yüksek transmural basınç yaratarak hava kaçağına ve sütür rüptürüne neden olur. Bu nedenle altın standart; hastanın ameliyat masasında, tam uyanık, spontan solunumu geri dönmüş ve sıfır kas gevşetici etkisi varken (Sugammadeks ile TOF = %100 teyidi) masada ekstübe edilmesidir. Ekstübasyonda en kritik tehlike öksürme ve ıkınmadır (öksürük anında trakea içi basınç > 100 cmH2O\'ya fırlar!). Bu felaketi önlemek için ekstübasyondan önce İ.V. Lidokain (1.5 mg/kg), Remifentanil düşük doz infüzyonu veya Deksmedetomidin ile pürüzsüz (smooth) uyanma sağlanır. (5) HAVA YOLU YANGINI (AIRWAY FIRE) ÖNLEMİ VE SERUM FİZYOLOJİK İLE BALONCUK KAÇAK TESTİ ("BUBBLE LEAK TEST") — Trakea transekte edilirken ve lümen açıkken koter kullanılırsa yüksek konsantrasyonda O2 ile anında hava yolu yangını patlak verir; trakea açılırken FiO2 < %30\'a düşürülmeli, N2O asla kullanılmamalı ve trakea soğuk bistüri ile açılmalıdır. Ön ve arka duvar sütürleri tamamlandıktan sonra ameliyat sahası steril ılık serum fizyolojik ile doldurulur; anestezist manuel ventilasyonla hava yolu basıncını 20-25 cmH2O\'ya çıkarır ve baloncuk çıkışı (Bubble Test) kontrol edilir. Tek bir baloncuk dahi görülmemelidir!',
    indispensableRules: [
      {
        number: 1,
        title: 'ÇAPRAZ-SAHA (CROSS-FIELD / STERILE FIELD) VENTİLASYONUNA GEÇİŞ VE İNTRAOPERATİF HAVA YOLU KESİNTİSİ DİSİPLİNİ',
        content: 'Trakea cerrah tarafından transekte edildiği saniyede oral tüpün kafı indirilir ve cerrahi sahanın hemen proksimaline (subglottise) geri çekilir. Cerrahi ekip ameliyat sahasından distal trakea kütüğüne steril spiral kaflı endotrakeal tüpü (genellikle No 6.0-7.0) yerleştirir; tüp steril hortum ve konektörlerle ameliyat masasını aşarak anestezi cihazına bağlanır (Cross-Field Ventilasyon). Bu geçiş anında hasta kısa bir süre apneik kalır; hipoksi gelişmemesi için transection öncesinde %100 O2 ile 3-5 dakika agresif hiperoksijenizasyon şarttır. Steril tüpün kafı şişirildikten sonra simetrik göğüs hareketi ve kapnografide EtCO2 dalgası teyit edilmeden rezeksiyona devam edilmez!'
      },
      {
        number: 2,
        title: 'ANASTOMOZ SÜTUR BAĞLAMA EVRESİ VE ORAL TÜPÜN TEKRAR AŞAĞI İLERLETİLMESİ ("THE CRITICAL RESWAP")',
        content: 'Rezeksiyon tamamlanıp arka ve yan duvar anastomoz dikişleri yerleştirildikten sonra steril cross-field tüp sahadan çıkarılır; subglottiste bekleyen oral endotrakeal tüp cerrahın doğrudan forseps kılavuzluğu altında anastomoz hattını aşarak distal trakeaya (karinanın hemen üstüne) kaydırılır. Bu kritik aşamada anestezist ve cerrah milimetrik koordinasyonla çalışmalıdır; tüpün ucu arka duvar dikişlerini ASLA yakalamamalı, zorlanmamalı ve koparmamalıdır! Oral tüpün distale indiği görülüp kafı şişirildiği anda ventilasyon tekrar anestezi devresine alınır ve cerrah ön duvar anastomoz sütürlerini bağlar.'
      },
      {
        number: 3,
        title: 'ÇENE-GÖĞÜS DİKİŞİ ("GUARDIAN SUTURE") VE BOYUN HİPEREKSTANSİYONUNUN MUTLAK YASAKLANMASI',
        content: 'Trakeal rezeksiyon sonrası uç-uca anastomozdaki doku gerginliğini sıfırlamak için hastanın boynu tam fleksiyona getirilir. Cerrah hastanın çenesini sternum veya göğüs ön duvarına 2-0 kalın emilmeyen sütürle ("Guardian Suture") tespit eder. Uyanma, ekstübasyon, sedyeye transfer ve yoğun bakım takibinde boynun en ufak bir hiperekstansiyonu (geriye düşmesi) taze anastomoz hattının anında yırtılmasına (anastomoz dehissansı), masif amfizeme ve ölümcül asfiksiye yol açar! Transferde baş-boyun çift hekim tarafından iki elle nötral-fleksiyonda kilitlenmelidir.'
      },
      {
        number: 4,
        title: 'PÜRÜZSÜZ UYANMA VE MASADA ERKEN EKSTÜBASYON ("SIFIR ÖKSÜRÜK VE SIFIR IKINMA DİSİPLİNİ")',
        content: 'Pozitif basınçlı mekanik ventilasyon anastomoz hattında yüksek transmural basınç yaratarak hava kaçağına ve sütür rüptürüne neden olur. Bu nedenle altın standart; hastanın ameliyat masasında, tam uyanık, spontan solunumu geri dönmüş ve sıfır kas gevşetici etkisi varken (Sugammadeks ile TOF = %100 teyidi) masada ekstübe edilmesidir. Ekstübasyonda en kritik tehlike öksürme ve ıkınmadır (öksürük anında trakea içi basınç > 100 cmH2O\'ya fırlar!). Bu felaketi önlemek için ekstübasyondan önce İ.V. Lidokain (1.5 mg/kg), Remifentanil düşük doz infüzyonu veya Deksmedetomidin ile pürüzsüz (smooth) uyanma sağlanır.'
      },
      {
        number: 5,
        title: 'HAVA YOLU YANGINI (AIRWAY FIRE) ÖNLEMİ VE SERUM FİZYOLOJİK İLE BALONCUK KAÇAK TESTİ ("BUBBLE LEAK TEST")',
        content: 'Trakea transekte edilirken ve lümen açıkken koter kullanılırsa yüksek konsantrasyonda O2 ile anında hava yolu yangını patlak verir; trakea açılırken FiO2 < %30\'a düşürülmeli, N2O asla kullanılmamalı ve trakea soğuk bistüri ile açılmalıdır. Ön ve arka duvar sütürleri tamamlandıktan sonra ameliyat sahası steril ılık serum fizyolojik ile doldurulur; anestezist manuel ventilasyonla hava yolu basıncını 20-25 cmH2O\'ya çıkarır ve baloncuk çıkışı (Bubble Test) kontrol edilir. Tek bir baloncuk dahi görülmemelidir!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göğüs Cerrahisi & KBB Konsültasyonu: Stenozun etiyolojisi, lokalizasyonu (subglottik, üst/orta/alt trakea), rezeke edilecek trakea halka sayısı ve suprahyoid/hiler serbestleştirme ihtiyacı',
      'Toraks ve Boyun BT / Sanal Bronkoskopi: Stenozun kraniyokaudal uzunluğu (cm cinsinden), lümen rezidüel çapı (mm), vokal kordlara ve ana karinaya olan milimetrik mesafe',
      'Dinamik Rijit ve Fleksibl Bronkoskopi: Vokal kord mobilitesi (bilateral hareket kontrolü - preop reküren laringeal sinir hasarı ekarte edilmelidir), darlığın dinamik çöküşü ve distal trakeobronşiyal ağacın açıklığı',
      'Solunum Fonksiyon Testleri ve Akım-Volüm Halkası: Fiks üst hava yolu obstrüksiyonu paterninin (inspiratuar ve ekspiratuar plato) ve fonksiyonel akciğer kapasitesinin değerlendirilmesi',
      'Kardiyak Değerlendirme & ECMO / CPB Stand-By: Kritik pin-hole darlıklarda (< 4 mm) indüksiyonda tam obstrüksiyon ihtimaline karşı perfüzyonist ve ECMO ekibinin ameliyathanede hazır bulunması'
    ],
    historyAndPhysical: [
      'Önceki Entübasyon ve Trakeostomi Öyküsü: Yoğun bakım kalış süresi, entübasyon zorlukları, önceki trakeostomi skarı ve acil hava yolu girişimleri sorgulanmalıdır.',
      'Stridor ve Efor Dispnesi Şiddeti: İstirahatte bifazik stridor varlığı lümenin kritik derecede daraldığını (< 4-5 mm) ve sedasyonla tam kollaps riski taşıdığını gösterir.',
      'Ortopne ve Pozisyonel Dispne: Hastanın sırtüstü yatamaması, indüksiyonun oturur veya yarı-oturur pozisyonda fiberoptik ile yapılmasını gerektirir.',
      'Boyun Hareket Açıklığı: Ağır servikal spondiloz, ankilozan spondilit veya geçirilmiş boyun cerrahisi olanlarda ekstansiyon kısıtlılığı cerrahi serbestleştirmeyi güçleştirir.'
    ],
    laboratoryAndTests: [
      'Kan Grubu ve Çapraz Karşılaştırma (Cross-Match): En az 2 ünite ES ve 2 ünite TDP hazır bulundurulmalıdır (innominat arter yaralanması potansiyeli).',
      'Arter Kan Gazı (AKG): Bazal PaO2, PaCO2 ve pH değerleri (kronik hipoksemi veya CO2 retansiyonu takibi).',
      'Tam Kan Sayımı, Koagülasyon Parametreleri (INR, aPTT, Trombosit): Cerrahi hemostaz ve kanama profili kontrolü.',
      'Elektrolitler, Böbrek ve Karaciğer Fonksiyon Testleri: TIVA ilaçlarının farmakokinetik güvenliği.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (Sol Radiyal Arter Tercih Edilir): Cerrah mediastinal trakeayı diseke ederken veya innominat arteri ekarte ettiğinde arter basıya uğrayabilir; sağ kolda nabız kaybı innominat arter oklüzyonunu gösterir; bu nedenle eşzamanlı çift pulse oksimetre (sağ ve sol el) veya sol radiyal arter monitorizasyonu altın standarttır.',
      'Kapnografi (EtCO2): Oral ve steril cross-field tüp geçişlerinde ventilasyonun anlık doğrulanması için kesintisiz kapnografi takibi.',
      'Sürekli Nöromusküler Monitörizasyon (TOF-Watch): Çapraz ventilasyonda ve cerrahi rezeksiyonda masada mutlak hareketsizlik; ekstübasyonda ise TOF > %90-100 garantisi.',
      'Entropi / BIS (Bispektral İndeks): TIVA derinliğinin takibi ve uyanıklık (awareness) riskinin önlenmesi.',
      'Santral Venöz Basınç (CVP): Santral venöz kateter takibi.',
      'Hava Yolu Basınçları (Ppeak, Pplateau): Anastomoz öncesi ve sonrası hava yolu direncinin ve kompliyansın izlemi.'
    ],
    vascularAccess: [
      '2 adet geniş lümenli periferik İ.V. kanül (14G veya 16G)',
      'Santral Venöz Kateter (CVK): Sağ/sol internal juguler ven veya subklaviyan ven (boyun insizyonundan steril dikişle uzaklaştırılmış)',
      'İnvaziv Sol Radiyal Arter Kateteri (20G)'
    ],
    patientPosition: 'Supin Pozisyon; başlangıçta omuz altına silikon rulo yerleştirilerek boyun hiperekstansiyona getirilir (servikal trakeayı öne çekmek için); ancak rezeksiyon tamamlanıp anastomoz dikilirken OMUZ RULOSU ÇIKARILIR, boyun TAM FLEKSİYONA getirilir ve çene-sternum sütürü ("Guardian Suture") konulur.',
    patientPositionDetails: [
      'Başlangıç (Cerrahi Açılış): Omuz rulosu ile kontrollü boyun ekstansiyonu, baş halkası desteği.',
      'Anastomoz ve Kapanış (Kritik Evre): Omuz rulosu tamamen alınır; anestezist başı iki eliyle kaldırarak boynu anterior fleksiyona getirir (anastomoz hattı gerginliğini sıfırlamak için).',
      'Çene-Sternum Sütürü: Boyun fleksiyondayken çene ucu sternuma 2-0 polipropilen dikişle tespit edilir; ekstübasyonda ve nakilde boynun geriye açılması fiziksel olarak engellenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon Stratejisi: Darlık durumuna göre belirlenir. Orta dereceli darlıklarda Propofol + Remifentanil TIVA ve derin anestezi altında kas gevşetici vermeksizin nazik rijit/fiberoptik kılavuzluğunda entübasyon. Kritik pin-hole darlıklarda uyanık fiberoptik veya spontan solunum korunarak gaz indüksiyonu.',
      'İdame: Total İntravenöz Anestezi (TIVA - Propofol 100-150 mcg/kg/dk + Remifentanil 0.15-0.3 mcg/kg/dk) ile idame ettirilir. Sevofluran/İzofluran gibi inhalasyon ajanları çapraz-saha açık devre fazında ameliyathaneye gaz kaçışına neden olduğu için TIVA zorunludur!',
      'Nöromusküler Blokaj: İntraoperatif cerrahi rezeksiyon ve cross-field ventilasyon boyunca derin blokaj (Roküronyum sürekli infüzyon veya titre edilmiş boluslar). Ekstübasyon fazında Sugammadeks (2-4 mg/kg) ile anında tam blok çözümü (TOF = %100).'
    ],
    airwayManagement: [
      'Başlangıç Entübasyonu: Vokal kordlardan stenozun hemen üstüne kadar ilerletilen oral kaflı tüp (genellikle No 6.0 veya 6.5 mikrolaringeal MLT). Tüp kafı darlık seviyesine asla zorlanmamalıdır.',
      'Çapraz-Saha (Cross-Field) Ventilasyon Aşaması: Trakea transekte edildiğinde cerrahın ameliyat sahasından distal trakeaya soktuğu steril spiral kaflı tüp (No 6.5-7.0) üzerinden mekanik ventilasyon idamesi.',
      'Reswap (Geri Geçiş) Aşaması: Arka duvar sütürleri konulduktan sonra steril tüp çıkarılır; oral tüp cerrah kılavuzluğunda anastomoz hattını geçip distal lümene ilerletilir.',
      'Ekstübasyon Öncesi Bronkoskopi: Oral tüpten fleksibl video-bronkoskop sokularak anastomoz hattının açıklığı, lümen çapı, sütürlerin durumu ve kan/mukus kalıntıları temizlenir.'
    ],
    criticalSurgicalStages: [
      '1. Pretrakeal Disseksiyon ve Tiroid İsthmus Bölünmesi: Tiroid ima ve juguler venöz kanamaların kontrolü.',
      '2. Trakeanın İlk Transeksiyonu (Transection): Trakea lümenine bistüri girdiği an FiO2 < %30 olmalıdır; oral tüp kafı indirilip subglottise çekilir, distal trakeaya steril spiral tüp yerleştirilir.',
      '3. Patolojik Segmentin Çıkarılması: Trakea halkalarının (genellikle 2-5 halka) sınır kontrolü yapılarak rezeke edilmesi.',
      '4. Suprahyoid / Hiler Serbestleştirme (Gerekirse): Rezeksiyon > 4 cm ise anastomoz gerginliğini azaltmak için cerrah suprahyoid kasları veya sağ hiler perikardiyal yapıyı serbestleştirir.',
      '5. Anastomoz Arka Duvar Sütürleri: 3-0/4-0 monofilament sütürlerle posterior membranöz trakea anastomozu.',
      '6. Oral Tüpün Tekrar Distale İlerlemesi ("Reswap"): Steril tüpün sahadan çıkışı ve oral tüpün anastomoz hattını aşması.',
      '7. Baloncuk Kaçak Testi (Bubble Test): Sahaya ılık SF doldurulup 20-25 cmH2O basınç uygulanarak sıfır kaçak teyidi.',
      '8. Çene-Göğüs Dikişi ("Guardian Suture"): Boyun tam fleksiyona alınıp çenenin sternuma dikilmesi.'
    ],
    emergenceNotes: [
      'Masada Erken Ekstübasyon Zorunluluğu: Pozitif basınçlı mekanik ventilasyon anastomoz hattına stres bindirerek yırtılma riski doğurur. Hasta ameliyat masasında mutlaka ekstübe edilmelidir.',
      'Pürüzsüz Uyanma Protokolü (Sıfır Öksürük): Uyanmada öksürme ve ıkınmayı önlemek için ekstübasyondan 5-10 dakika önce İ.V. Lidokain (1.5 mg/kg) uygulanır veya Deksmedetomidin infüzyonu (0.3-0.5 mcg/kg/saat) titre edilir.',
      'Nöromusküler Bloğun Tam Çözümü: Sugammadeks (2-4 mg/kg) uygulanarak TOF oranı > %100 ve TOF sayımı 4/4 doğrulanmalıdır.',
      'Ekstübasyon Sonrası Yakın Solunum Takibi: Hasta uyanık, koopere, spontan solunumu yeterli olduğunda tüp aspire edilerek nazikçe çekilir; stridor ve boyun amfizemi anında kontrol edilir.'
    ]
  },

  // 6) Post-operatif Yönetim
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü: Trakeal anastomoz hattında ağrı ve solunum depresyonunu dengelemek için multimodal yaklaşım uygulanır.',
      'İ.V. Parasetamol (1000 mg 4x1) + Deksmetazon (4-8 mg, laringeal ödemi ve cerrahi travmayı azaltır).',
      'Tramadol veya Düşük Doz Titre Edilmiş Morfin: Sedasyona ve solunum depresyonuna yol açmayacak şekilde kontrollü opioid.',
      'Gereğinde Superficial Cervical Plexus Block (SCPB) veya lokal yara yeri infiltrasyonu.'
    ],
    prospectRecommendations: [
      'Ağır sedasyon ve solunum depresyonu yaratan yüksek doz opioidlerden kaçınılmalıdır (hipoventilasyon anastomoz distresini artırır).',
      'NSAİİ kullanımı anastomoz hemostazı ve böbrek fonksiyonları stabil olduğunda multimodal plana dahil edilebilir.',
      'Bulantı-kusma profilaksisi (Ondansetron 4-8 mg + Deksametazon 4 mg) titizlikle uygulanmalıdır (kusma ve öğürme anastomoz hattında ölümcül gerginlik yaratır).'
    ],
    erasRecommendations: [
      'Ameliyat Masasında Erken Ekstübasyon: Rutin mekanik ventilasyon uzatılmamalıdır; masada başarılı ekstübasyon ERAS hedeflerinin merkezindedir.',
      'Guardian Suture (Çene Dikişi) Koruması: Çene dikişi postoperatif 7 ila 10 gün boyunca korunmalı; yatak başı 30-45 derece eleve ve baş altına 2 yastık konularak boyun fleksiyonu kesintisiz sağlanmalıdır.',
      'Nemlendirilmiş ve Isıtılmış Oksijen Desteği: Sekresyonların kuruyup anastomoz hattında kabuk (krut) ve obstrüksiyon oluşturmaması için yüksek akımlı nemlendirilmiş oksijen veya soğuk buhar nebülizasyonu.',
      'Erken Mobilizasyon: Hastanın boyun fleksiyonunu bozmadan refakatçi ve fizyoterapist eşliğinde postop 1. günde mobilize edilmesi.',
      'Erken Oral Beslenmeye Geçiş: Anastomoz kaçağı ve aspirasyon riski ekarte edildikten sonra (genellikle postop 1-2. günde yutma testi sonrası) berrak sıvılarla başlanması.'
    ]
  },

  // 7) Kaynaklar ve Literatür
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures. 5th ed. Philadelphia: Wolters Kluwer Health / Lippincott Williams & Wilkins; 2014. Section V: Otolaryngology - Larynx and Trachea: Tracheal and Cricotracheal Resection, pp. 781-787.',
    erasReference: 'Batchelor TJP, Rasburn NJ, Abdelnour-Ehrlichman E, et al. Guidelines for enhanced recovery after lung and airway surgery: recommendations of the Enhanced Recovery After Surgery (ERAS®) Society and the European Society of Thoracic Surgeons (ESTS). Eur J Cardiothorac Surg. 2019;55(1):91-115.',
    prospectReference: 'PROSPECT Working Group of the European Society of Regional Anaesthesia and Pain Therapy (ESRA). Evidence-based recommendations for airway and thoracic surgical pain management.',
    otherReferences: [
      'Grillo HC. Surgery of the Trachea and Bronchi. Hamilton, ON: PMPH-USA; 2004.',
      'Wright CD, Li S, Geller AD, et al. Postintubation tracheal stenosis: results of tracheal resection and reconstruction in 901 patients. Ann Thorac Surg. 2019;108(5):1471-1477.',
      'Mathisen DJ, Wain JC. Results of tracheal and cricotracheal resection: an analysis of complications and risk factors. J Thorac Cardiovasc Surg. 2018;156(3):1234-1242.',
      'Difficult Airway Society (DAS) guidelines for management of unanticipated difficult intubation in adults. Br J Anaesth. 2015;115(6):827-848.',
      'Türk Göğüs Cerrahisi Derneği (TGCD) Trakea Hastalıkları ve Rekonstrüksiyonu Uzlaşı Raporu.'
    ]
  }
};
