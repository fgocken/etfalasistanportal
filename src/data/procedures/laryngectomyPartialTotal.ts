import { ProcedureDefinition } from '../../types/procedures';

/**
 * Larenjektomi: Parsiyel ve Total Larenjektomi
 * (Laryngectomy: Partial and Total Laryngectomy with Neck Dissection)
 * 
 * Jaffe (5th ed., Section V: Otolaryngology - Larynx and Trachea: Laryngectomy [Partial and Total], pp. 760-766),
 * NCCN Clinical Practice Guidelines in Oncology: Head and Neck Cancers (Ver 2.2024),
 * American Head and Neck Society (AHNS) Consensus Guidelines on Laryngeal Cancer,
 * National Tracheostomy Safety Project (NTSP) UK Laryngectomy Guidelines,
 * Difficult Airway Society (DAS) Guidelines for Head & Neck Surgery,
 * Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) ve TARD Protokolleri referans alınarak yapılandırılmıştır.
 */
export const laryngectomyPartialTotal: ProcedureDefinition = {
  id: 'laryngectomy-partial-and-total',
  name: 'Larenjektomi: Parsiyel ve Total Larenjektomi (Laryngectomy: Partial and Total)',
  shortCode: 'KBB-LARENJEKTOMİ',
  specialty: 'kbb',
  specialtyName: 'Kulak Burun Boğaz',
  categoryTag: 'Baş-Boyun Onkolojisi & İleri Hava Yolu Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'İleri evre laringeal skuamöz hücreli karsinom (T3-T4 evre larinks kanseri), radyoterapi veya kemoradyoterapi sonrası nüks eden tümörler (kurtarma / salvage larenjektomi), larenks kıkırdak iskeletinin destrüksiyonu veya fonksiyonunu yitirmiş kronik aspirasyonlu larenks olgularında uygulanan; laringeal yapıların kısmi (Supraglottik larenjektomi, Hemilarenjektomi, Krikohiyoidopeksi [CHP], Krikohiyoidoepiglottopeksi [CHEP]) veya tam (tiroid kıkırdak, krikoid kıkırdak, hyoid kemik, epiglot, vokal kordlar ve preepiglottik alanın radikal olarak çıkarılması) rezeksiyonu ve trakeanın anterior boyun cildine kalıcı uç stoma (End-Tracheostomy) olarak ağızlaştırılması ameliyatıdır. Sıklıkla tek veya iki taraflı Selektif / Modifiye Radikal Boyun Diseksiyonu (MRND / SND), faringeal mukozanın primer rekonstrüksiyonu veya mikrovasküler serbest flep (ALT, serbest radyal önkol) / pektoralis majör flebi ile kombine edilir. Cerrahi sırasında larinks kıkırdakları trakeadan ayrılırken trakea transekte edilir; oral endotrakeal tüp çekilerek distal trakea kütüğüne steril sahadan spiral kaflı tüp (No 7.0-8.0 Montandon / armored) yerleştirilir (Çapraz-Saha / Cross-Field Ventilasyonu). Total larenjektomide farinks tüp şeklinde primer dikilerek sindirim yolu hava yolundan tamamen ayrılır; trakea kalıcı stoma olarak cilde dikilir.',
  indications: [
    'İleri Evre Primer Larenks ve Hipofarinks Kanseri (T3-T4 Skuamöz Hücreli Karsinom): Kıkırdak invazyonu, tiroid bezi veya prevertebral fasya yayılımı olan olgular',
    'Radyoterapi / Kemoradyoterapi Başarısızlığı Sonrası Salvage (Kurtarma) Larenjektomi: Kalıcı veya nüks tümör varlığı',
    'Radyonekroz ve İntraktabl Laringeal Disfonksiyon: Larenksin korunamadığı nekrotik ve kronik enfekte kıkırdak tablosu',
    'Şiddetli ve Tedavi Edilemeyen Kronik Aspirasyon: Nörolojik hasar veya travmaya bağlı hayatı tehdit eden tekrarlayan aspirasyon pnömonileri',
    'Kıkırdak Kaynaklı İleri Evre Nadir Laringeal Tümörler: Krikoid/tiroid kıkırdak kondrosarkomları, adenoid kistik karsinomlar'
  ],
  averageDuration: '180 - 360 dakika (3 - 6 saat; tek veya bilateral boyun diseksiyonu ve serbest flep rekonstrüksiyonunun varlığına göre 8 saate kadar uzayabilir)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 500 mL (Geniş boyun fleplerinin kaldırılması, tek/çift taraflı boyun diseksiyonu, superior ve inferior tiroid damarlarının ligasyonu ve faringeal mukoza kesisi; bilateral diseksiyon veya kurtarma cerrahilerinde 600-800 mL\'ye ulaşabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Boyun Diseksiyonu ve Majör Servikal Damarsal Komşuluk',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match Hazır Bulundurulmalıdır',
    transfusionProbability: '%15 - %30 (Özellikle preoperatif anemisi olan veya kurtarma [salvage] cerrahisi geçiren hastalarda transfüzyon gerekebilir)',
    criticalBleedingSources: [
      'İnternal Juguler Ven (İJV) ve Ana Dalları: Fasiyal ven, lingual ven, süperior ve orta tiroid venleri (özellikle boyun diseksiyonunda avülsiyon veya yırtılma riski)',
      'Süperior Tiroid Arteri ve İnferior Tiroid Arteri: Larenksin ve tiroid lobunun vasküler pedikülleri',
      'Eksternal Karotis Arteri Dalları ve Asendan Faringeal Arter',
      'Transvers Servikal Arter ve Ven (Bölge IV ve V diseksiyonu sınırında)'
    ],
    hemostasisStrategies: [
      'Büyük vasküler dalların (tiroid arterleri, İJV yan dalları) titizlikle çift klemplenerek 2-0 veya 3-0 ipek/vikril ile sütür ligasyonu',
      'Bipolar elektrokoagülasyon ve gelişmiş enerji cihazlarının (Harmonic, Ligasure) etkin kullanımı',
      'Farinks kapatılmadan ve boyun insizyonu dikilmeden önce cerrah tarafından Valsalva manevrası (30 cmH2O basınç) ile gizli venöz kanama odaklarının aranması',
      'Cerrahi loja çift vakumlu aktif dren (Hemovac / Jackson-Pratt) yerleştirilerek hematom birikiminin önlenmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol/Remifentanil) + İntraoperatif Çapraz-Saha (Cross-Field) Kalıcı Stoma Ventilasyonu — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Zor Hava Yolu / Laringeal Kitle Olgusunda: Lokal İnfiltrasyon Anestezisi Eşliğinde Bilinçli Uyanık Trakeostomi (Awake Tracheostomy) yapılarak genel anestezi indüksiyonuna stoma üzerinden başlanması',
      'Uyanık Fiberoptik Nazal / Oral Entübasyon: Kitle vokal kordların üstündeyse ve trakeaya lümen girişi izin veriyorsa dikkatli fiberoptik entübasyon',
      'Videolaringoskop Kılavuzluğunda Küçük Numara Kaflı Tüple (No 5.5-6.5 MLT) Spontan Solunum Korunarak İndüksiyon'
    ],
    clinicalRationale: 'Trakea transekte edilip kalıcı stoma oluşturulurken devre değişimleri boyunca kesintisiz hipnoz sağlamak ve boyun diseksiyonu sırasında CN XI/XII sinir stimülasyonu için kas gevşetici kesildiğinde hareketsizliği sürdürmek amacıyla TIVA altın standarttır. Büyük laringeal kitlelerde CICO riskini önlemek için indüksiyonda spontan solunum/uyanık trakeostomi korunur; cerrahi sırasında ise steril Montandon/armored tüp ile Çapraz-Saha (Cross-Field) stoma ventilasyonu kalıcı hava yolu güvenliği sağlar.',
    rulesTitle: 'LARENJEKTOMİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'LARENJEKTOMİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) İNDÜKSİYONDA ZOR HAVA YOLU VE "KAS GEVŞETİCİ VERMEDEN ÖNCE VENTİLASYONU GÖRME" DİSİPLİNİ — Ekzofitik laringeal kitlelerde kas gevşetici verildiğinde üst hava yolu kas tonusu çöker; tümör lümeni tıkayarak anında "Cannot Intubate, Cannot Oxygenate" (CICO) felaketine yol açar! Trakeostomi seti ve cerrahi ekip ameliyathanede sterile örtünmüş hazır beklemelidir. Anestezi indüksiyonu uyanık fiberoptik, uyanık trakeostomi veya spontan solunum korunarak dikkatli inhalasyon/TIVA ile yapılmalı; tüpün geçtiği ve EtCO2 alındığı doğrulanmadan kas gevşetici ASLA enjekte edilmemelidir! (2) ÇAPRAZ-SAHA (CROSS-FIELD) STERİL VENTİLASYONA GEÇİŞ VE SIFIR HİPOKSİ — Cerrahi disseksiyon trakea transeksiyonuna ulaştığında cerrah anesteziste "TRAKEA AÇILIYOR" uyarısı verir. Oral tüpün kafı indirilir ve kord seviyesine çekilir; cerrah distal trakea kütüğüne ameliyat sahasından steril spiral kaflı tüp (No 7.5-8.0) yerleştirir ve steril ventilatör hortumuna bağlar. Bu geçişte hipoksiye girmemesi için transeksiyon öncesi hasta en az 3-5 dakika %100 FiO2 ile hiperoksijenize edilmelidir. Tüp kafı şişirildikten sonra bilateral solunum sesleri ve kapnografi EtCO2 eğrisi görülmeden diseksiyona devam edilmez! (3) KAROTİS SİNÜS REFLEKSİ VE BOYUN DİSEKSİYONU BRADİCARDİ / ASİSTOLİ ALARMI — Boyun diseksiyonunda karotis kılıfı açılırken ve karotis bifurkasyonu manipüle edilirken karotis sinüs baroreseptörlerinin gerilmesi ani ve derin bradikardi, asistoli ve vazodilatatör hipotansiyona (vagal deşarj) yol açar. Bu durumda cerrah derhal uyarılır ve manipülasyon durdurulur; karotis bifurkasyonuna cerrah tarafından 1-2 mL %2 Lidokain infiltrasyonu yapılır; anestezi masasında Atropin ve Efedrin hazır bulundurulur. (4) VENÖZ HAVA EMBOLİSİ (VAE) SAVUNMASI VE İNTRAOPERATİF NÖROMONİTÖRİZASYON — Baş-boyun cerrahisinde internal juguler ven (İJV) ve ana venöz kütükler kalbin üzerinde yer aldığından açık venöz lümenden negatif intratorasik basınçla sisteme hava kaçabilir (Venöz Hava Embolisi). Kapnografide ani EtCO2 düşüşü, ani hipotansiyon ve taşikardi VAE alarmıdır. Cerrahi sahada venöz göllenmeyi artırmak için baş hafif yükseltilir ancak aşırı kaldırılmaz; açık venler anında klemplenir. Boyun diseksiyonunda aksesuar sinir (CN XI), hipoglossal sinir (CN XII) ve marjinal mandibuler sinirin korunması için cerrah sinir stimülatörü kullanıyorsa kas gevşetici verilmemeli veya TIVA titre edilmelidir. (5) "GERİ DÖNÜŞSÜZ KALICI STOMA" VE ÖMÜR BOYU ORAL ENTÜBASYON İMKANSIZLIĞI — Total larenjektomide larenks tamamen çıkarıldığı ve farinks kalıcı olarak kapatılarak hava yolu sindirim sisteminden anatomik olarak koparıldığı için hasta ömür boyu YALNIZCA VE SADECE BOYUNDAKİ STOMADAN NEFES ALIR! Ağız veya burundan akciğerlere giden hiçbir anatomik yol kalmamıştır. Bu hastaya acil bir krizde ağızdan maske ventilasyonu veya oral entübasyon uygulamak İMKANSIZDIR (asfiksiye yol açar!). Ekstübasyonda ve serviste hastanın başına ve göğsüne "TOTAL LARENJEKTOMİ - YALNIZCA BOYUN STOMASINDAN OKSİJEN VERİNİZ" uyarısı asılmalıdır!',
    indispensableRules: [
      {
        number: 1,
        title: 'İNDÜKSİYONDA ZOR HAVA YOLU VE "KAS GEVŞETİCİ VERMEDEN ÖNCE VENTİLASYONU GÖRME" DİSİPLİNİ',
        content: 'Ekzofitik laringeal kitlelerde kas gevşetici verildiğinde üst hava yolu kas tonusu çöker; tümör lümeni tıkayarak anında "Cannot Intubate, Cannot Oxygenate" (CICO) felaketine yol açar! Trakeostomi seti ve cerrahi ekip ameliyathanede sterile örtünmüş hazır beklemelidir. Anestezi indüksiyonu uyanık fiberoptik, uyanık trakeostomi veya spontan solunum korunarak dikkatli inhalasyon/TIVA ile yapılmalı; tüpün geçtiği ve EtCO2 alındığı doğrulanmadan kas gevşetici ASLA enjekte edilmemelidir!'
      },
      {
        number: 2,
        title: 'ÇAPRAZ-SAHA (CROSS-FIELD) STERİL VENTİLASYONA GEÇİŞ VE SIFIR HİPOKSİ',
        content: 'Cerrahi disseksiyon trakea transeksiyonuna ulaştığında cerrah anesteziste "TRAKEA AÇILIYOR" uyarısı verir. Oral tüpün kafı indirilir ve kord seviyesine çekilir; cerrah distal trakea kütüğüne ameliyat sahasından steril spiral kaflı tüp (No 7.5-8.0) yerleştirir ve steril ventilatör hortumuna bağlar. Bu geçişte hipoksiye girmemesi için transeksiyon öncesi hasta en az 3-5 dakika %100 FiO2 ile hiperoksijenize edilmelidir. Tüp kafı şişirildikten sonra bilateral solunum sesleri ve kapnografi EtCO2 eğrisi görülmeden diseksiyona devam edilmez!'
      },
      {
        number: 3,
        title: 'KAROTİS SİNÜS REFLEKSİ VE BOYUN DİSEKSİYONU BRADİCARDİ / ASİSTOLİ ALARMI',
        content: 'Boyun diseksiyonunda karotis kılıfı açılırken ve karotis bifurkasyonu manipüle edilirken karotis sinüs baroreseptörlerinin gerilmesi ani ve derin bradikardi, asistoli ve vazodilatatör hipotansiyona (vagal deşarj) yol açar. Bu durumda cerrah derhal uyarılır ve manipülasyon durdurulur; karotis bifurkasyonuna cerrah tarafından 1-2 mL %2 Lidokain infiltrasyonu yapılır; anestezi masasında Atropin ve Efedrin hazır bulundurulur.'
      },
      {
        number: 4,
        title: 'VENÖZ HAVA EMBOLİSİ (VAE) SAVUNMASI VE İNTRAOPERATİF NÖROMONİTÖRİZASYON',
        content: 'Baş-boyun cerrahisinde internal juguler ven (İJV) ve ana venöz kütükler kalbin üzerinde yer aldığından açık venöz lümenden negatif intratorasik basınçla sisteme hava kaçabilir (Venöz Hava Embolisi). Kapnografide ani EtCO2 düşüşü, ani hipotansiyon ve taşikardi VAE alarmıdır. Cerrahi sahada venöz göllenmeyi artırmak için baş hafif yükseltilir ancak aşırı kaldırılmaz; açık venler anında klemplenir. Boyun diseksiyonunda aksesuar sinir (CN XI), hipoglossal sinir (CN XII) ve marjinal mandibuler sinirin korunması için cerrah sinir stimülatörü kullanıyorsa kas gevşetici verilmemeli veya TIVA titre edilmelidir.'
      },
      {
        number: 5,
        title: '"GERİ DÖNÜŞSÜZ KALICI STOMA" VE ÖMÜR BOYU ORAL ENTÜBASYON İMKANSIZLIĞI',
        content: 'Total larenjektomide larenks tamamen çıkarıldığı ve farinks kalıcı olarak kapatılarak hava yolu sindirim sisteminden anatomik olarak koparıldığı için hasta ömür boyu YALNIZCA VE SADECE BOYUNDAKİ STOMADAN NEFES ALIR! Ağız veya burundan akciğerlere giden hiçbir anatomik yol kalmamıştır. Bu hastaya acil bir krizde ağızdan maske ventilasyonu veya oral entübasyon uygulamak İMKANSIZDIR (asfiksiye yol açar!). Ekstübasyonda ve serviste hastanın başına ve göğsüne "TOTAL LARENJEKTOMİ - YALNIZCA BOYUN STOMASINDAN OKSİJEN VERİNİZ" uyarısı asılmalıdır!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'KBB & Baş-Boyun Cerrahisi Konsültasyonu: Tümör evresi (TNM), vokal kord fiksasyonu, tiroid ve krikoid kıkırdak invazyonu, stomal planlama ve eşlik eden boyun diseksiyonu sınırları',
      'Direkt ve Fleksibl Laringoskopi: Tümörün anatomik yerleşimi, ekzofitik komponenti, subglottik uzanımı ve vokal kordlar arasındaki rezidüel lümen açıklığı (milimetrik değerlendirme)',
      'Boyun ve Toraks Kontrastlı BT / MRG: Preepiglottik ve paraglottik alan invazyonu, servikal lenf nodu metastazları, karotis kılıfı invazyonu ve vasküler varyasyonlar',
      'Solunum Fonksiyon Testleri ve Göğüs Hastalıkları: Kronik sigara öyküsü, KOAH ve postoperatif bronkopulmoner hijyen kapasitesinin tayini',
      'Nutrisyonel Değerlendirme & Diyetisyen: İleri evre larenks kanserli hastalarda malnütrisyon ve disfaji sık görülür; preop albümin/prealbümin düzeyleri ve PEG / NG planlaması'
    ],
    historyAndPhysical: [
      'Stridor, Ses Kısıklığı ve Dispne Süresi: İstirahat stridoru varlığında ameliyat masasına yatırıldığında akut obstrüksiyon riski yüksektir; uyanık trakeostomi hazırlığı tam yapılmalıdır.',
      'Geçirilmiş Radyoterapi / Kemoradyoterapi Öyküsü: Radyoterapi almış boyun dokusu ("frozen neck") sert, fibrotik ve zayıf vaskülarizedir; yara iyileşmesi gecikir ve faringokutanöz fistül riski %30-40\'lara çıkar.',
      'Alkol ve Ağır Tütün Kullanımı: Kronik bronşit, sekresyon artışı, deliryum tremens ve kardiyovasküler komorbidite riskleri sorgulanmalıdır.',
      'Boyun Ekstansiyon Açıklığı: Boyun diseksiyonu ve cerrahi ekspozisyon için boyun ekstansiyon kabiliyeti değerlendirilmelidir.'
    ],
    laboratoryAndTests: [
      'Kan Grubu ve Çapraz Karşılaştırma (Cross-Match): En az 2 ünite ES ve 2 ünite TDP hazır bulundurulmalıdır.',
      'Tam Kan Sayımı (CBC), Koagülasyon Parametreleri (INR, aPTT, Fibrinojen): Cerrahi hemostaz kontrolü.',
      'Serum Elektrolitleri, Albümin, Karaciğer ve Böbrek Fonksiyon Testleri.',
      'EKG ve Ekokardiyografi: Aritmi, iskemi ve sol ventrikül sistolik fonksiyonlarının perioperatif risk değerlendirmesi.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (Radial Arter Kateteri): Boyun diseksiyonunda karotis manipülasyonu, ani vagal bradikardi ve kan basıncı dalgalanmalarının anlık takibi için zorunludur.',
      'Kapnografi (EtCO2): Oral tüpten steril çapraz tüpe ve kalıcı stomaya geçişlerde kesintisiz ventilasyon ve VAE (ani EtCO2 düşüşü) izlemi.',
      'Santral Venöz Kateter (CVK) ve CVP Takibi: Volüm yükü ve vazoaktif infüzyon desteği.',
      'TOF-Watch (Nöromusküler İzlem): Cerrahi disseksiyon boyunca derin blok; ancak motor sinir uyarımı (CN XI, CN XII) esnasında kontrollü serbestlik.',
      'Bispektral İndeks (BIS) / Entropi: TIVA derinliği ve farkındalığın (awareness) önlenmesi.',
      'Vücut Sıcaklığı Monitörizasyonu: Uzun süreli cerrahilerde aktif ısıtıcı battaniye (Bair Hugger) ile normoterminin korunması.'
    ],
    vascularAccess: [
      '2 adet geniş lümenli periferik İ.V. hat (14G veya 16G)',
      'Santral Venöz Kateter (Sağ/sol subklaviyan veya boyun insizyonundan uzaklaştırılmış internal juguler ven)',
      'Sol Radial Arter Kateteri (20G)'
    ],
    patientPosition: 'Supin Pozisyon, omuz altına destek rulosu yerleştirilerek boyun hiperekstansiyona getirilir, baş halkası ile sabitlenir; baş hafif 15-20 derece yükseltilerek (Anti-Trendelenburg) serebral ve servikal venöz göllenme azaltılır.',
    patientPositionDetails: [
      'Gözlerin Koruması: Gözler nemlendirici pomat ile kapatılıp bantlanır (tümör cerrahisinde uzun süre steril örtü altında kalacağı için kornea abrazyonu önlenir).',
      'Sinir ve Bası Noktaları: Kollar vücut yanında nötral pozisyonda sabitlenir, dirsekler ve topuklar jel pedlerle desteklenir.',
      'Hafif Baş Elevasyonu: Başın 15° elevasyonu venöz kanamayı belirgin azaltır; ancak aşırı elevasyon hava embolisi riskini artırır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Kitle obstrüksiyonu olmayan olgularda Propofol + Remifentanil TIVA. Kitle obstrüktif ise uyanık trakeostomi veya uyanık fiberoptik kılavuzluğunda küçük çaplı kaflı tüp (No 5.5-6.5 MLT) yerleştirilir.',
      'İdame: Total İntravenöz Anestezi (TIVA - Propofol 100-150 mcg/kg/dk + Remifentanil 0.15-0.3 mcg/kg/dk) tercih edilir. TIVA, açık havayolu ve çapraz ventilasyon fazında ameliyathaneye anestezik gaz salınımını önler ve postoperatif bulantı-kusmayı minimalize eder.',
      'Nöromusküler Yönetim: Diseksiyon evresinde orta/derin blokaj; cerrah spinal aksesuar siniri (CN XI) veya fasiyal sinirin marjinal dalını stimülatörle ararken kas gevşetici etkisi hafifletilir.'
    ],
    airwayManagement: [
      '1. Faz (Giriş): Oral kaflı endotrakeal tüp ile standart veya fiberoptik entübasyon.',
      '2. Faz (Çapraz Ventilasyon): Trakea laringeal yapıdan ayrılıp transekte edildiğinde cerrahın distal trakea lümenine yerleştirdiği steril spiral kaflı tüp (No 7.5-8.0 Montandon / armored) üzerinden mekanik ventilasyon.',
      '3. Faz (Kalıcı Stoma): Farinks kapatılıp trakea kütüğü anterior boyun cildine 2-0/3-0 vikril ile çepeçevre dikilerek kalıcı stoma oluşturulur. Spiral tüp çekilip stoma içine kaflı trakeostomi/larenjektomi kanülü yerleştirilir ve kafı şişirilir.',
      'Nazogastrik Sonda (NGS): Farinks kapatılmadan önce cerrah kılavuzluğunda geniş lümenli silikon NGS (No 16-18) yerleştirilir (postop 7-10 gün oral beslenme yasaktır; tüm beslenme NGS üzerinden sağlanır).'
    ],
    criticalSurgicalStages: [
      '1. Boyun Fleplerinin Kaldırılması (Apron / Gluck Flebi): Geniş cilt flebi elevasyonunda venöz kanama kontrolü.',
      '2. Boyun Diseksiyonu ve Karotis Manipülasyonu: Karotis kılıfı diseksiyonunda bradikardi ve asistoli refleksi takibi.',
      '3. Tirohyoid Membran ve Hyoid Kemiğin Serbestlenmesi: Laringeal iskeletin yukarıdan serbestleştirilmesi.',
      '4. Trakeanın Transeksiyonu: Hava yolunun cerrahi sahaya açıldığı an (FiO2 < %30 kuralı ve çapraz steril tüp yerleşimi).',
      '5. Larenksin En-Blok Çıkarılması: Spesimenin çıkarılması ve faringeal defaktın ortaya konması.',
      '6. Farinksin Primer Kapatılması (Faringorafi): T şeklinde veya lineer mukozal dikişlerle neofarinks oluşturulması (su geçirmez kapatma).',
      '7. Kalıcı Uç Stoma Oluşturulması (End-Tracheostomy): Trakeanın sternum üstüne cilde anastomozu.',
      '8. Hemostatik Kontrol ve Aktif Drenlerin Yerleştirilmesi: Çift vakumlu Hemovac dren.'
    ],
    emergenceNotes: [
      'Pürüzsüz Uyanma ve Sıfır Öğürme / Kusma Disiplini: Öğürme ve şiddetli kusma neofarinks sütürlerini patlatarak salyanın boyun boşluğuna akmasına ve ölümcül faringokutanöz fistüle yol açar! İ.V. Lidokain ve Deksmedetomidin ile pürüzsüz uyanma sağlanır.',
      'Antiemetik Profilaksisi: Güçlü üçlü profilaksi (Ondansetron 8 mg + Deksametazon 8 mg + Metoklopramid 10 mg) ameliyat bitiminden 30 dk önce uygulanır.',
      'Stoma Güvenliği: Hasta uyanırken stoma kanülü steril spançla temizlenir; sekresyonlar nazikçe aspire edilir; kaf basıncı kontrol edilir (20-25 cmH2O).',
      'Hasta Transferi: Hasta yarı-oturur pozisyonda (30° Fowler), boynu nötral pozisyonda tutularak Cerrahi Yoğun Bakım Ünitesine taşınır.'
    ]
  },

  // 6) Post-operatif Yönetim
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü: İ.V. Parasetamol (1000 mg 4x1) + Tramadol (50-100 mg 3x1) veya Titre Edilmiş Opioid.',
      'Gereğinde Superficial Cervical Plexus Block (SCPB) veya yara kenarına cerrahi bupivakain infiltrasyonu.',
      'Sedasyondan Kaçınma: Aşırı sedasyon öksürük refleksini ve stoma sekresyon temizliğini baskılar.'
    ],
    prospectRecommendations: [
      'Neofarinks dikiş hattını korumak için postoperatif ilk 7 gün hiçbir şekilde ağızdan besin veya sıvı verilmez; beslenme tamamen NGS veya PEG ile idame ettirilir.',
      'Aktif dren takibi: Dren sıvısının berraklığı ve rengi izlenir; drenaj sıvısında tükürük veya köpük görülmesi faringokutanöz fistülün erken işaretidir.',
      'Öğürme ve kusmanın mutlak engellenmesi için düzenli antiemetik tedavisi.'
    ],
    erasRecommendations: [
      'Nemlendirilmiş ve Isıtılmış Oksijen Desteği: Stoma üzerine trakeostomi maskesi veya larenjektomi filtresi (HME - Heat and Moisture Exchanger) yerleştirilerek trakeal mukozanın kuruması ve kabuklanması (krut) önlenir.',
      'Sık ve Nazik Stoma Aspirasyonu: Steril kateterle stoma içi sekresyonlar trakea mukozası kanatılmadan aspire edilir.',
      'Erken Mobilizasyon: Postoperatif 1. günde yatak kenarında oturtma ve refakatçi eşliğinde oda içi yürüyüş.',
      'İletişim Güvenliği: Hastanın ses kordları alındığı için konuşamayacağı bilinmeli; yatak başında yazı tahtası veya iletişim zili sürekli hazır tutulmalıdır.'
    ]
  },

  // 7) Kaynaklar ve Literatür
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures. 5th ed. Philadelphia: Wolters Kluwer Health / Lippincott Williams & Wilkins; 2014. Section V: Otolaryngology - Larynx and Trachea: Laryngectomy (Partial and Total), pp. 760-766.',
    erasReference: 'Dort JC, Farwell DG, Findlay M, et al. Optimal perioperative care in major head and neck cancer surgery with free flap reconstruction: Enhanced Recovery After Surgery (ERAS) Society recommendations. JAMA Otolaryngol Head Neck Surg. 2017;143(3):292-303.',
    prospectReference: 'PROSPECT Working Group. Procedure-specific postoperative pain management for major head and neck oncological surgeries. ESRA / Eur J Anaesthesiol.',
    otherReferences: [
      'National Comprehensive Cancer Network (NCCN). Clinical Practice Guidelines in Oncology: Head and Neck Cancers. Version 2.2024.',
      'National Tracheostomy Safety Project (NTSP) UK. Emergency management of the patient with a laryngectomy and neck stoma. Anaesthesia. 2012;67(9):1025-1041.',
      'Weber RS, Lewis CM. Advanced Head and Neck Oncology and Laryngectomy Guidelines. American Head and Neck Society (AHNS).',
      'Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) Larenks Kanseri Tanı ve Tedavi Uzlaşı Kılavuzu.'
    ]
  }
};
