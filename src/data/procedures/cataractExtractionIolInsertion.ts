import { ProcedureDefinition } from '../../types/procedures';

/**
 * Katarakt Cerrahisi ve Göz İçi Lens İmplantasyonu: Fakoemülsifikasyon (FAKO) Yöntemi ile İntraoküler Lens (İOL) Yerleşimi
 * (Cataract Extraction with Intraocular Lens Insertion / Phacoemulsification)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Cataract Extraction with Intraocular Lens Insertion, pp. 844-852),
 * American Academy of Ophthalmology (AAO), European Society of Cataract and Refractive Surgeons (ESCRS),
 * Ophthalmic Anesthesia Society (OAS) ve Türk Oftalmoloji Derneği (TOD) Klinik Protokolleri referans alınarak yapılandırılmıştır.
 */
export const cataractExtractionIolInsertion: ProcedureDefinition = {
  id: 'cataract-extraction-iol-insertion',
  name: 'Katarakt Cerrahisi ve Göz İçi Lens İmplantasyonu: Fakoemülsifikasyon (FAKO) Yöntemi ile İntraoküler Lens (İOL) Yerleşimi',
  shortCode: 'GOZ-FAKO-IOL',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Ön Segment & Mikrocerrahi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Saydamlığını kaybederek görme keskinliğini bozan doğal göz merceğinin (lens), ultrasonik titreşimlerle çalışan fakoemülsifikasyon (FAKO) probu ile mikroskobik parçalara ayrılarak aspire edilmesi ve boşaltılan kapsül kesesi içerisine yapay katlanabilir intraoküler lensin (İOL: monofokal, multifokal veya torik lens) implante edilmesi ameliyatıdır. Temporal veya süperior saydam korneadan yapılan 2.2 - 2.8 mm\'lik mikro insizyonla ön kamaraya girilir. Ön kamara viskoelastik madde (sodyum hiyalüronat) ile doldurularak endotel korunur. Ön kapsülden dairesel bir pencere açılır (kapsüloreksis), hidrodisseksiyon ile lens çekirdeği kapsülden serbestleştirilir. FAKO probu ile nükleus parçalanıp temizlenir, epinükleus ve korteks kalıntıları aspire edilir. Kapsül kesesi içine enjektör kartuşuyla katlanabilir İOL yerleştirilir ve sentre edilir. Viskoelastik madde aspire edildikten sonra kornea kesi dudakları stromanın hidrasyonu (stromal hidrasyon) ile sütürsüz, kendiliğinden kapanır hale getirilir; intrakameral sefuroksim ile endoftalmi profilaksisi tamamlanır.',
  indications: [
    'Senil ve Nükleer / Kortikal Katarakt: Yaşa bağlı lens opasifikasyonu, görme keskinliğinde azalma, kontrast kaybı ve parlama şikayeti',
    'Matür ve Hipermatür (Beyaz) Katarakt: İleri derecede yoğunlaşmış, görmeyi el hareketleri düzeyine indiren sert lensler',
    'Sekonder ve Komplike Katarakt: Üveit, diyabet, travma veya uzun süreli sistemik/topikal kortikosteroid kullanımına bağlı lens opasiteleri',
    'Fakomorfik ve Fakolitik Glokom: Şişen lensin ön kamara açısını daraltarak akut göz içi basıncı (GİB) artışına yol açması',
    'Psödoeksfoliyasyon Sendromu (PEX) ile Birlikte Katarakt: Zayıf zonül yapısı ve dar pupilla ile seyreden yüksek riskli kataraktlar'
  ],
  averageDuration: '15 - 35 dakika (Standart komplikasyonsuz olgular: 15-20 dk; Psödoeksfoliyasyon, küçük pupilla, matür katarakt veya arka sineşi olguları: 30-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 10 mL (Saydam korneal kesiden yapıldığı için avaskülerdir ve rutin olgularda ihmal edilebilir düzeydedir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal / İhmal Edilebilir Düzey (Ancak Ekspulsif Koroidal Hemoraji Potansiyel Felaket Riski Taşır)',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S veya Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Ekspulsif Supracoroidal / Koroidal Hemoraji: Göz küresi açıkken ani GİB düşüşü veya hastanın öksürmesi/ıkınması sonucu arka siliyer arterlerin yırtılmasıyla gelişen ve göz içi dokularının dışarı fırlamasına yol açan katastrofik arteriyel kanama',
      'İris Kökü Kanaması (Hifema): İris yırtılması veya pupiller sineşi açılması esnasında küçük damarların açılması',
      'Retrobulber / Peribulber İğne Hematomu: Blok esnasında oftalmik ven veya arter dallarının delinmesiyle retrobulber alanda gelişen masif kompresif hematom'
    ],
    hemostasisStrategies: [
      'Göz içi viskoelastik tamponad (Healon / OVD) ve ön kamaranın hızla basınçlandırılması',
      'Ekspulsif kanama şüphesinde cerrahın korneal kesiyi derhal 10-0 naylon sütürle kapatması veya skleral arka dekompresyon insizyonu',
      'Kan basıncının normotansif tutulması (SKB < 140 mmHg) ve intraoperatif ani hipertansif krizlerin önlenmesi',
      'Öksürük ve ıkınmanın mutlak engellenmesi; uyanık hastanın derin soluk alması ve gevşetilmesinin sağlanması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Topikal Anestezi (Lokal Anestezik Damla: Proparakain %0.5 / Tetrakain) + Koruyucusuz İntrakameral Lidokain %1 + Monitörize Anestezi Bakımı (MAC: Düşük Doz Midazolam / Fentanil ile Bilinçli Minimal Sedasyon) — Modern katarakt cerrahisinde DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Sub-Tenon Bloğu (Künt Kanül ile Fasyal Anestezi): İğnesiz, optik sinir veya glob perforasyonu riski taşımayan, mükemmel anestezi ve akinezi sağlayan en güvenli rejyonel blok tekniği',
      'Peribulber Blok (Kısa İğne ile İntrakonal/Ekstrakonal Enjeksiyon): Kooperasyonu zayıf, aşırı göz hareketi olan hastalarda',
      'Genel Anestezi (Laringeal Maske [LMA] veya Endotrakeal Entübasyon): İleri derecede demansı, kontrolsüz Parkinson baş tremoru, mental retardasyonu olan veya klastrofobik/panik hastalarda'
    ],
    clinicalRationale: 'Topikal damla + koruyucusuz intrakameral lidokain ve hafif bilinçli sedasyon (MAC), iğneli retrobulber/peribulber blok komplikasyonlarını (glob perforasyonu, retrobulber hemoraji, beyin sapı anestezisi) ve geriatrik popülasyonda genel anesteziye bağlı kardiyopulmoner stresi ile ekstübasyon öksürüklerini önlediği için altın standarttır. Hava yolu doğal spontan solunumda korunur; örtü altına kurulan O2/medikal hava çadır sistemi klostrofobi ve CO2 birikimini engelleyerek derin sedasyondan kaynaklanan ani sıçramaların önüne geçer.',
    notes: 'KATARAKT CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE ANİ VAGAL DURAKLAMA — Ekstraoküler kaslara bası, göze spekulum takılması veya göz küresine traksiyon uygulandığında trigemino-vagal refleks arkı (CN V oftalmik dal afferent -> CN X vagus efferent) tetiklenir. Bu refleks ani bradikardi, nodal ritim, atriyoventriküler blok veya asistoli yaratabilir! Monitörde bradikardi görüldüğü anda cerraha derhal "TRAKSİYONU BIRAK" uyarısı verilmelidir; bası kalkınca nabız saniyeler içinde düzelir. Düzelmezse derhal İV Atropin (0.5 mg) veya Glikopirolat uygulanmalıdır. (2) GÖZ KÜRESİ AÇIKKEN ÖKSÜRÜK, IKINMA VE EKSPULSİF KOROİDAL HEMORAJİ FELAKETİ — Kornea kesilip ön kamara açıldığında göz küresi "açık küre" (open globe) haline gelir. Bu aşamada hastanın aniden öksürmesi, hapşırması, başını oynatması veya ıkınması intratorasik ve oküler venöz basıncı fırlatarak arka siliyer arterlerin patlamasına (ekspulsif koroidal kanama) yol açar; göz içi dokuları (iris, lens, retina) yaradan dışarı fırlar ve kalıcı körlük gelişir! Anestezi ekibi hastanın öksürük ve hapşırma uyarısını önceden sezinlemeli; aşırı hipoventilasyon kaynaklı huzursuz uyanmaları önlemeli ve sedasyonu titizlikle yönetmelidir. (3) RETROBULBER / PERİBULBER BLOKTA BEYİN SAPI ANESTEZİSİ VE RETROBULBER HEMATOM — İğneli bloklarda iğne ucu optik sinir kılıfının dural uzantısını delerse lokal anestezik doğrudan subaraknoid mesafeye enjekte olur. 2-5 dakika içinde kontralateral amaurozis (körlük), afoni, bilinç kaybı, konvülsiyon, solunum arresti ve kardiyovasküler kollaps (BEYİN SAPI ANESTEZİSİ) gelişir! Anestezi ekibi anında acil hava yolu ve kardiyak resüsitasyona hazır olmalıdır; ayrıca retrobulber hematom gelişirse göz içi basıncı fırlar ve optik sinir iskemisini önlemek için acil lateral kantotomi gerekebilir. (4) TOPİKAL / SEDASYON YÖNETİMİNDE "AŞIRI SEDASYON VE HİPOVENTİLASYON TUZAĞI" — Katarakt hastaları çoğunlukla yaşlı, KOAH\'lı ve kalp hastasıdır. Cerrahi örtülerin altında hava açlığı ve CO2 birikmesi (hiperkapni) hastada ani panik, örtüyü kaldırma refleksi ve kontrolsüz baş hareketi yaratır. Hastayı aşırı uyutmak (derin sedasyon) kesinlikle YASAKTIR; derin uyuyan hasta aniden sıçrayarak uyanır ve mikroskop altındaki gözde arka kapsül yırtığına yol açar. Örtü altına vakum veya 2-3 L/dk O2 köprüsü kurulmalı, hasta ile uyanık ve sakin sözel iletişim sürdürülmelidir. (5) İNTRAOPERATİF GEVŞEK İRİS SENDROMU (IFIS) VE ALFA-1 BLOKERLERİ (TAMSULOSİN) — Prostat hipertrofisi için Tamsulosin (Flomax vb.) veya diğer alfa-1 antagonistlerini kullanan hastalarda cerrahi esnasında iris sfinkter tonusu kaybolur; iris gevşekçe dalgalanır, pupilla hızla büzüşür (miyozis) ve iris fako ucuna aspire olarak yırtılır. Preoperatif sorgulamada tamsulosin öyküsü mutlaka tespit edilmeli, cerraha IFIS uyarısı verilmeli ve intrakameral fenilefrin/adrenalin ile iris kancaları (iris hooks / Malyugin halkası) hazır bulundurulmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Ön Segment Muayenesi: Biyomikroskopi ile katarakt tipi ve sertliği, kornea endotel hücre sayısı (speküler mikroskopi), ön kamara derinliği, zonül gevşekliği (psödoeksfoliyasyon sendromu) ve optik biyometri (İOL numarasının tespiti).',
      'Kardiyoloji Konsültasyonu: İleri yaş popülasyonda yaygın olan hipertansiyon, koroner arter hastalığı ve kalp yetmezliği optimizasyonu; katarakt günü kan basıncının regüle olması (SKB < 150-160 mmHg) koroid kanamasını önlemek için şarttır.',
      'Göğüs Hastalıkları Konsültasyonu: Kronik bronşit, KOAH veya alerjik riniti olan hastalarda ameliyat masasında gelebilecek öksürük veya hapşırma nöbetlerinin önceden medikal olarak baskılanması (inhaler, bronkodilatör ve antihistaminik desteği).',
      'Anestezi Değerlendirmesi: Sırtüstü yatma (ortopne, kifoz, boyun artriti) toleransı, mental kognitif uyum ve fobi/anksiyete düzeyi.'
    ],
    historyAndPhysical: [
      'Alfa-1 Antagonisti İlaç Öyküsü: Tamsulosin, Doksazosin, Terazosin, Alfuzosin veya Silodosin kullanımı (İntraoperatif Gevşek İris Sendromu [IFIS] riskini belirlemek için zorunludur; ilacın kesilmesi sendromu engellemez, cerrahi hazırlık gerekir!).',
      'Antikoagülan / Antiagregan Kullanımı: Aspirin, Klopidogrel ve DOAK kullanımı; modern dikişsiz saydam korneal fakoemülsifikasyon avasküler olduğundan kılavuzlara göre antikoagülan ve antiagreganların KESİLMESİ GEREKMEZ (tromboemboli riskini artırmamak için devam edilir; ancak retrobulber blok yapılacaksa dikkat edilmelidir).',
      'Öksürük ve Reflü Öyküsü: Cerrahi örtü altında öksürük krizi geçirme riski taşıyan aktif üst solunum yolu enfeksiyonu veya şiddetli reflü.',
      'Sırtüstü Yatamama / Ağır Kifoz: Hastanın ameliyat masasında mikroskop altına başını paralel yerleştirebilmesi için yastık ve rulo desteği planlaması.'
    ],
    laboratoryAndTests: [
      'Açlık Kan Şekeri (Diyabetik hastalarda glukoz < 200 mg/dL olmalıdır; cerrahi alan enfeksiyonu ve endoftalmiyi önlemek için).',
      'Kan Basıncı Ölçümü ve 12 Derivasyonlu EKG.',
      'Göz İçi Basıncı (GİB) Ölçümü: Tonometri ile bazal GİB takibi.',
      'Gerekli olgularda Tam Kan Sayımı ve Serum Elektrolitleri (İleri evre sistemik hastalık varlığında).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (özellikle bradikardi ve disritmi izlemi), SpO2 (örtü altı hipoksemiyi erken yakalamak için), non-invaziv kan basıncı (NIBP — 5 dakikada bir otomatik ölçüm).',
      'Solunum Eforu ve Göğüs Hareketlerinin Gözlenmesi: Örtü altı hipoventilasyon, apoid solunum duraklaması veya CO2 birikiminin fiziksel takibi.',
      'Sözel Temas ve Nörolojik Kooperasyon: Uyanık hastada ses tonu, anksiyete ve panik belirtilerinin izlenmesi.'
    ],
    vascularAccess: [
      'En az 1 adet güvenli periferik intravenöz yol (20-22G) — tercihen ameliyat edilecek gözün karşı tarafındaki koldan açılır (operasyon sahasına engel olmaması için)',
      'Acil Bradikardi / Hipotansiyon Kiti: Atropin (0.5 mg ampul), Efedrin, Noradrenalin ve Midazolam enjektöre çekilmiş ve hazır'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Destekli ve Nötral',
    patientPositionDetails: [
      'Baş "donut" silikon halka veya oyuk baş desteğine sabitlenir; başın sağa/sola rotasyonu tamamen engellenir.',
      'Ağır kifozu olan hastalarda bel ve omuz altına kademeli rulo yastıklar konularak yüz ameliyat mikroskobuna tam paralel hale getirilir.',
      'ÖRTÜ ALTI HAVA SİRKÜLASYONU VE ÇADIR SİSTEMİ: Cerrahi örtü hastanın ağız ve burnunu kapatmayacak şekilde özel L-bar veya fleksibl borularla yukarı kaldırılır; örtü altına 2-3 L/dk medikal hava veya O2 köprüsü kurularak klostrofobi ve CO2 göllenmesi önlenir.',
      'Göz kapakları özel tel blefarostele (spekulum) ile nazikçe açılır; aşırı gerdirme okülokardiyak refleksi tetikleyebilir.'
    ],
    anesthesiaManagement: [
      'Topikal ve İntrakameral Anestezi Protokolü:',
      '  - Ameliyattan 15-20 dakika önce: 5 dakika arayla 3 kez Proparakain %0.5 (Alcaine) veya Tetrakain göz damlası damlatılır.',
      '  - Pupil Dilatasyonu: Tropikamid %1 + Fenilefrin %2.5 damlalar ile sağlanır.',
      '  - Kesi Yapıldıktan Hemen Sonra: Cerrah tarafından ön kamaraya 0.2 - 0.5 mL KORUYUCUSUZ (Preservative-free) Lidokain %1 yavaşça enjekte edilir (iris ve siliyer cisim anestezisi sağlar).',
      'Sedasyon ve Monitörize Anestezi Bakımı (MAC):',
      '  - Minimal Anksiyoliz: Midazolam 0.5 - 1.0 mg İV yavaş bolus (hastanın bilinci tamamen açık kalmalı, emirleri uygulayabilmelidir).',
      '  - Gereğinde Hafif Analjezi: Fentanil 25 mcg İV bolus.',
      '  - DERİN SEDASYONDAN (Propofol bolusları veya yüksek doz benzodiazepin) KESİNLİKLE KAÇINILMALIDIR! Derin uyuyan hasta aniden disoryante uyanıp başını çevirirse fako ucu arka kapsülü patlatır ve nükleus vitreusa düşer.',
      'Okülokardiyak Refleks Yönetimi:',
      '  - Spekulum takılırken veya nükleus manipülasyonunda ani bradikardi gelişirse anestezi derhal cerraha bildirir; cerrah teması keser.',
      '  - Düzelmeyen bradikardide derhal İV Atropin 0.5 mg uygulanır.',
      'Kan Basıncı Yönetimi:',
      '  - Preoperatif ve intraoperatif SKB > 160-170 mmHg olursa koroidal kanama riskini önlemek için İV Nitrogliserin sprey/infüzyon veya Esmolol / Labetalol ile tansiyon kontrol altına alınır.',
      'Öksürük Krizi Alarmı:',
      '  - Hasta boğazında gıcıklanma veya öksürük hissettiğinde cerraha "DUR" demesi için önceden eğitilir; cerrah aletleri gözden çektikten sonra hastaya kontrollü öksürme izni verilir.'
    ],
    airwayManagement: [
      'Topikal/lokal anestezide hava yolu açıktır; burun kanülü ile 2-3 L/dk O2 verilir.',
      'Örtü altında karbondioksit birikimini önlemek için aspiratör hortumu veya hava üfleyici ile aktif havalandırma sağlanır.',
      'Genel anestezi gereken nadir olgularda Laringeal Maske (LMA) tercih edilir (öksürmesiz ve pürüzsüz uyanma için).'
    ],
    criticalSurgicalStages: [
      '1. Hastanın Masaya Alınması, Baş Pozisyonu ve Örtü Altı O2 Çadırının Kurulması.',
      '2. Topikal Anestezi Damlası ve Göz Çevresi Povidon İyot (%5) Antisepsisi.',
      '3. Blefaroste Takılması (Göz kapaklarının açılması — Okülokardiyak refleks kontrolü!).',
      '4. Şeffaf Korneal Mikroinsizyon (2.2-2.8 mm) ve Parasentez Girişleri.',
      '5. Ön Kamaraya Viskoelastik Madde ve Koruyucusuz İntrakameral Lidokain %1 Verilmesi.',
      '6. Sürekli Dairesel Kapsüloreksis (CCC) ve Hidrodisseksiyon.',
      '7. Fakoemülsifikasyon Fazı: Nükleusun ultrasonik enerjiyle kırılıp emilmesi (Göz içi basınç dalgalanmaları ve öksürük yasağı!).',
      '8. Korteks Temizliği (İrrigasyon / Aspirasyon).',
      '9. Katlanabilir İntraoküler Lensin (İOL) Kapsül Kesesi İçine Enjeksiyonu ve Santralizasyonu.',
      '10. Viskoelastik Maddenin Boşaltılması, İntrakameral Sefuroksim (Endoftalmi profilaksisi) ve Stromal Hidrasyonla Kesi Kapanışı.'
    ],
    emergenceNotes: [
      'Topikal cerrahide uyanma süreci yoktur; hasta ameliyat biter bitmez masadan yürüyerek veya tekerlekli sandalyeyle ayrılabilir.',
      'Ameliyat edilen göze koruyucu şeffaf plastik kapak (eye shield) takılır; hastanın gözü ovuşturması kesinlikle engellenir.',
      'Genel anestezi uygulanan nadir olgularda ekstübasyon evresinde öksürük ve ıkınmayı sıfırlamak için IV Lidokain (1.5 mg/kg) uygulanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Hafif / Minimal Ağrı Yönetimi:',
      '  - Fakoemülsifikasyon sonrası ağrı genellikle yok denecek kadar azdır; batma ve yabancı cisim hissi normaldir.',
      '  - Gerektiğinde Oral Parasetamol (500-1000 mg).',
      '  - Şiddetli zonklayıcı baş ve göz ağrısı gelişirse bu durum analjezik eksikliği değil, akut Göz İçi Basıncı (GİB) fırlaması (oküler hipertansiyon veya viskoelastik kalıntısı) belirtisidir; acil göz tansiyonu ölçülmelidir!'
    ],
    prospectRecommendations: [
      'PROSPECT Oftalmik Cerrahi Kılavuzları: Topikal anestezi ve koruyucusuz intrakameral lidokain kombinasyonu sistemik analjezik ihtiyacını neredeyse tamamen ortadan kaldırır; sedatif ve opioid ilaçların minimalize edilmesi taburculuk süresini kısaltır ve kognitif disfonksiyonu önler.'
    ],
    erasRecommendations: [
      'ERAS Göz Cerrahisi ve Ayaktan Günübirlik Cerrahi (Day-Surgery) Protokolleri:',
      '  - Hızlı Taburculuk: Hasta operasyondan 30-60 dakika sonra oral sıvı alarak refakatçisiyle birlikte taburcu edilir.',
      '  - Pozisyon ve Basınç Kısıtlamaları: İlk 48 saat öne doğru ağır eğilmekten, 5 kg üzeri ağırlık kaldırmaktan ve ıkınmaktan (Valsalva) kaçınılmalıdır.',
      '  - Enfeksiyon ve Travma Koruması: İlk 1 hafta uyurken koruyucu plastik kalkan takılır; göze su değdirilmez; reçete edilen topikal antibiyotik ve steroid damlalar tarif edilir.',
      '  - Kırmızı Bayrak Bulguları: Ani görme kaybı, artan kızarıklık, çapaklanma veya şiddetli ağrı durumunda derhal acil servise başvuru eğitimi verilir (Endoftalmi alarmı!).'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmology - Cataract Extraction with Intraocular Lens Insertion, pp. 844-852. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'European Society of Cataract and Refractive Surgeons (ESCRS). (2020). Guidelines on prevention, investigation and management of post-operative endophthalmitis and perioperative care.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Ophthalmic Day Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern Guidelines: Cataract in the Adult Eye (2021).',
      'Ophthalmic Anesthesia Society (OAS). Clinical practice advisory for monitored anesthesia care and regional blocks in cataract surgery.',
      'Chang, D. F., & Campbell, J. R. (2005). Intraoperative floppy iris syndrome associated with tamsulosin. Journal of Cataract & Refractive Surgery, 31(4), 664-673.',
      'Ling, R., et al. (2004). Suprachoroidal haemorrhage complicating cataract surgery: Clinical features and visual outcome. British Journal of Ophthalmology, 88(4), 478-480.',
      'Türk Oftalmoloji Derneği (TOD) Katarakt ve Refraktif Cerrahi Birimi Uygulama Kılavuzu.'
    ]
  }
};
