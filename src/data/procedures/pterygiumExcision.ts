import { ProcedureDefinition } from '../../types/procedures';

/**
 * Pterjiyum Eksizyonu: Keratektomi, Tenon Rezeksiyonu ve Limbal-Konjonktival Otogreft (CAG) / Fibrin Yapıştırıcı Eşliğinde Rekonstrüksiyon
 * (Pterygium Excision with Limbal-Conjunctival Autograft [LCAG] and Fibrin Tissue Glue / Amniotic Membrane Transplantation)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Cornea and External Disease: Pterygium Excision, pp. 848-852),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Pterygium,
 * Cornea Society & European Society of Cornea and Ocular Surface Disease Specialists (EuCornea),
 * British Ophthalmic Anaesthesia Society (BOAS) ve Türk Oftalmoloji Derneği (TOD) Kornea ve Oküler Yüzey Birimi Protokolleri referans alınarak yapılandırılmıştır.
 */
export const pterygiumExcision: ProcedureDefinition = {
  id: 'pterygium-excision',
  name: 'Pterjiyum Eksizyonu ve Limbal-Konjonktival Otogreftleme (CAG) Cerrahisi',
  shortCode: 'GOZ-PTERJIYUM',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Kornea & Oküler Yüzey Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Bulber konjonktivanın interpalpebral aralıkta (özellikle nazal kadranda) elastotik dejenerasyonu ve proliferasyonu sonucu kornea üzerine doğru üçgen/kanat şeklinde ilerlemesi (pterjiyum / halk arasında "gözde et yürümesi") tablosunun cerrahi olarak eksizyonu ve oküler yüzeyin yeniden yapılandırılması ameliyatıdır. Kronik ultraviyole (UV) maruziyeti, sıcak, tozlu ve kuru iklim pterjiyum patogenezinde temel rol oynar; korneal astigmatizma, kronik yabancı cisim hissi, kızarıklık ve pupil eksenini kapatarak görme kaybı yaratır. Modern mikrocerrahi teknikler: (1) Çıplak Sklera (Bare Sclera) Eksizyonu: Yalnızca pterjiyumun çıkarılmasıdır; nüks oranı çok yüksek (%40-80) olduğundan günümüzde tek başına ASLA tercih edilmez; (2) Limbal-Konjonktival Otogreftleme (CAG / LCAG): DÜNYA GENELİNDE ALTIN STANDARTTIR (nüks < %2-5). Pterjiyum başı korneadan künt/keskin disseksiyonla avülse edilir (keratektomi); alttaki proliferatif Tenon dokusu eksize edilir. Aynı gözün üst/üst-temporal bulber konjonktivasından limbal kök hücreleri içeren çok ince, Tenonsuz serbest bir konjonktiva grefti hazırlanır ve sklera yatağına nakledilir; (3) Fibrin Doku Yapıştırıcısı (Tisseel / Beriplast): Greftin dikişsiz, ağrısız ve inflamasyonsuz tespiti için altın standarttır (dikiş konforu ve hız sağlar; alternatif olarak 8-0/10-0 eriyebilir sütürler kullanılır); (4) Amniyon Zar Transplantasyonu (AMT): Çok geniş veya nüks olgularda üst konjonktivayı korumak için uygulanabilir; (5) Adjuvan Ajanlar: Nüks riski yüksek olgularda intraoperatif Mitomisin C (MMC %0.02) süngeri.',
  indications: [
    'Pupil Eksenini Tehdit Eden veya Görme Aksını Kapatan İlerleyici Pterjiyum',
    'Korneal Düzensiz (İrregüler) Astigmatizma ve Görme Keskinliğinde Belirgin Azalma',
    'Kronik İrritasyon, Yanma, Batma, Rekürren İltihap (Pterijit) ve Kuru Göz Semptomları',
    'Oküler Hareket Kısıtlılığı ve Medial Rektus Traksiyonuna Bağlı Çift Görme (Diplopi)',
    'Kozmetik Deformite ve Ön Segment/Katarakt Cerrahisi Öncesi Kornea Topografisinin Düzeltilmesi',
    'Rekürren (Nüks) Pterjiyum Olguları'
  ],
  averageDuration: '20 - 45 dakika (Fibrin yapıştırıcı ile dikişsiz CAG: 20-30 dk; Dikişli CAG veya Amniyon zar transplantasyonu: 35-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 15 mL (Pterjiyum gövdesi yoğun neovaskülarizasyon içerir; ancak episkleral damarlar koterize edildiğinde ve lokal vazokonstriktör [adrenalin] kullanıldığında kan kaybı ihmal edilebilir düzeydedir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Korneal Perforasyon ve İntraoperatif Sklera İskemisi Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Episkleral Perforatör Damarlar ve Medial Rektus Kılıfı Pleksusu: Pterjiyum Tenon disseksiyonunda medial alandaki derin damarlar',
      'Greft Donör Sahası (Üst Temporal Konjonktiva) Mikrovasküler Sızıntıları'
    ],
    hemostasisStrategies: [
      'Subkonjonktival Lidokain enjeksiyonuna 1:100.000 veya 1:200.000 Epinefrin (Adrenalin) eklenmesi',
      'Bipolar wet-field mikro-koter ile minimal termal yayılımla noktasal hemostaz (aşırı koterizasyon skleral nekroz ve erimeye yol açabilir!)',
      'Fibrin yapıştırıcı uygulanacak yatağın BSS ve mikro-süngerlerle tamamen kuru hale getirilmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Topikal Damla Anestezisi (Proparakain %0.5 / Tetrakain) + Subkonjonktival İnfiltrasyon (Lidokain %2 + 1:100.000 Epinefrin) + Monitörize Anestezi Bakımı (MAC: Bilinçli Minimal Sedasyon) — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Sub-Tenon Bloğu veya Peribulber Blok: Kooperasyonu zayıf, aşırı göz hareketi olan veya anksiyeteli hastalarda tam oküler akinezi ve anestezi sağlamak amacıyla',
      'Genel Anestezi (LMA veya Endotrakeal): Pediatrik olgularda, kontrolsüz baş tremoru/Parkinson olanlarda, ileri derecede demans veya klostrofobisi olan erişkinlerde'
    ],
    clinicalRationale: 'Topikal damla + epinefrinli subkonjonktival infiltrasyon ve hafif MAC, pterjiyum başının korneadan ayrılması ve otogreft fiksasyonu için gereken yüzeyel analjezi ile lokal vazokonstriksiyonu sağlarken cerrahın hastaya yön bakışı ("yukarı/dışa bak") komutu verebilmesine olanak tanıdığı için altın standarttır. Hava yolu doğal spontan solunumda bırakılır ve örtü altı O2 köprüsü ile hiperkapnik huzursuzluk önlenir.',
    rulesTitle: 'PTERJİYUM CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'PTERJİYUM CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) KORNEAL KERATEKTOMİ FAZINDA SIFIR GÖZ HAREKETİ, SIFIR ÖKSÜRÜK VE İYATROJENİK KORNEA PERFORASYONU ÖNLEMİ — Pterjiyum başı korneadan künt ve keskin mikro-bıçaklarla (kresent/Beaver bıçak) sıyrılarak ayrılırken aletler doğrudan saydam kornea stromasının üzerindedir. Bu esnada hastanın aniden gözünü oynatması, başını çevirmesi, öksürmesi veya ıkınması mikro-bıçağın ön kamarayı delmesine (iyatrojenik korneal perforasyon / açık küre felaketi), iris prolapsusuna ve lens travmasına yol açabilir! Topikal ve subkonjonktival anestezi eksiksiz oturmuş olmalı, hastaya keratektomi anında tam hareketsizlik tembihlenmeli ve anestezi ekibi solunumu sarsıntısız tutmalıdır. (2) MEDİAL REKTUS KASI DİSSEKSİYON GÜVENLİĞİ VE OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) — Pterjiyum gövdesi geriye (nazale) doğru rezeke edilirken hemen alttaki medial rektus kası fasyasıyla iç içedir. Medial rektus kasının aşırı koterize edilmesi veya makasla kesilmesi ameliyat sonrası kalıcı paralitik şaşılık ve çift görmeye (diplopi) yol açar! Ayrıca medial rektus traksiyonu derin trigemino-vagal refleksi (CN V -> CN X) tetikleyerek ani derin bradikardi, hipotansiyon ve asistoli yaratabilir. Monitörde bradikardi görüldüğünde cerrah derhal uyarılmalı, traksiyon gevşetilmeli; düzelmezse İV Atropin (0.5 mg) uygulanmalıdır. (3) ADJUVAN MİTOMİSİN C (MMC) KULLANIMINDA DİSİPLİN, KRONOMETRE VE SKLERAL NEKROZ / ERİME ALARMI — Nüksü önlemek amacıyla çıplak sklera yatağına MMC (%0.02 solüsyon) emdirilmiş mikro-sünger uygulanacaksa, süngerlerin sklerada kalış süresi (1 ila 2 dakika) anestezi ve cerrahi ekip tarafından kronometre ile sıkı tutulmalıdır. Süre aşımı veya aşırı koterizasyonla birleşen MMC toksisitesi avasküler skleral nekroza, skleral erimeye (scleral melting) ve endoftalmiye yol açar! Sünger çıkarıldıktan sonra sahanın en az 20-30 mL BSS ile bol yıkanması izlenmelidir. (4) FİBRİN YAPIŞTIRICI (FIBRIN TISSUE GLUE) DİSİPLİNİ VE SERBEST OTOGREFTİN YÖNÜ (LİMBUS-LİMBUS UYUMU) — Konjonktival otogreft üst bülböz konjonktivadan kaldırılıp pterjiyum yatağına yapıştırılırken greftin epitelyal yüzeyi yukarıda ve limbal kökü mutlaka korneal limbusa bakmalıdır (ters çevrilirse limbal kök hücreler çalışmaz ve kist oluşur). Fibrin yapıştırıcı (Tisseel) kullanılırken kanama sahası kuru tutulmalı, trombin ve fibrinojen solüsyonları karıştırıldıktan sonra greft 2-3 dakika boyunca pürüzsüz basıyla fikse edilmelidir. (5) MONİTÖRİZE ANESTEZİ BAKIMINDA (MAC) "AŞIRI SEDASYON VE HİPOVENTİLASYON TUZAĞI" — Pterjiyum ameliyatı lokal anesteziyle yapılan günübirlik bir girişimdir. Ameliyat örtüleri altında nefes darlığı hisseden hastayı uyutmak amacıyla kontrolsüz Propofol bolusları verilmesi hastada solunum depresyonu, derin uyku ve ardından panikle sıçrayarak uyanmaya yol açar. Bu istemsiz kafa hareketi cerrahın elindeki mikro-bıçağın göze batmasına neden olabilecek en büyük tehlikedir! Yalnızca titre edilmiş minimal Midazolam (0.5-1 mg) uygulanmalı, örtü altına aktif oksijen akışı ve aspirasyon sağlanmalı, hasta ile sözel kooperasyon korunmalıdır.',
    indispensableRules: [
      {
        number: 1,
        title: 'KORNEAL KERATEKTOMİ FAZINDA SIFIR GÖZ HAREKETİ, SIFIR ÖKSÜRÜK VE İYATROJENİK KORNEA PERFORASYONU ÖNLEMİ',
        content: 'Pterjiyum başı korneadan künt ve keskin mikro-bıçaklarla (kresent/Beaver bıçak) sıyrılarak ayrılırken aletler doğrudan saydam kornea stromasının üzerindedir. Bu esnada hastanın aniden gözünü oynatması, başını çevirmesi, öksürmesi veya ıkınması mikro-bıçağın ön kamarayı delmesine (iyatrojenik korneal perforasyon / açık küre felaketi), iris prolapsusuna ve lens travmasına yol açabilir! Topikal ve subkonjonktival anestezi eksiksiz oturmuş olmalı, hastaya keratektomi anında tam hareketsizlik tembihlenmeli ve anestezi ekibi solunumu sarsıntısız tutmalıdır.'
      },
      {
        number: 2,
        title: 'MEDİAL REKTUS KASI DİSSEKSİYON GÜVENLİĞİ VE OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ)',
        content: 'Pterjiyum gövdesi geriye (nazale) doğru rezeke edilirken hemen alttaki medial rektus kası fasyasıyla iç içedir. Medial rektus kasının aşırı koterize edilmesi veya makasla kesilmesi ameliyat sonrası kalıcı paralitik şaşılık ve çift görmeye (diplopi) yol açar! Ayrıca medial rektus traksiyonu derin trigemino-vagal refleksi (CN V -> CN X) tetikleyerek ani derin bradikardi, hipotansiyon ve asistoli yaratabilir. Monitörde bradikardi görüldüğünde cerrah derhal uyarılmalı, traksiyon gevşetilmeli; düzelmezse İV Atropin (0.5 mg) uygulanmalıdır.'
      },
      {
        number: 3,
        title: 'ADJUVAN MİTOMİSİN C (MMC) KULLANIMINDA DİSİPLİN, KRONOMETRE VE SKLERAL NEKROZ / ERİME ALARMI',
        content: 'Nüksü önlemek amacıyla çıplak sklera yatağına MMC (%0.02 solüsyon) emdirilmiş mikro-sünger uygulanacaksa, süngerlerin sklerada kalış süresi (1 ila 2 dakika) anestezi ve cerrahi ekip tarafından kronometre ile sıkı tutulmalıdır. Süre aşımı veya aşırı koterizasyonla birleşen MMC toksisitesi avasküler skleral nekroza, skleral erimeye (scleral melting) ve endoftalmiye yol açar! Sünger çıkarıldıktan sonra sahanın en az 20-30 mL BSS ile bol yıkanması izlenmelidir.'
      },
      {
        number: 4,
        title: 'FİBRİN YAPIŞTIRICI (FIBRIN TISSUE GLUE) DİSİPLİNİ VE SERBEST OTOGREFTİN YÖNÜ (LİMBUS-LİMBUS UYUMU)',
        content: 'Konjonktival otogreft üst bülböz konjonktivadan kaldırılıp pterjiyum yatağına yapıştırılırken greftin epitelyal yüzeyi yukarıda ve limbal kökü mutlaka korneal limbusa bakmalıdır (ters çevrilirse limbal kök hücreler çalışmaz ve kist oluşur). Fibrin yapıştırıcı (Tisseel) kullanılırken kanama sahası kuru tutulmalı, trombin ve fibrinojen solüsyonları karıştırıldıktan sonra greft 2-3 dakika boyunca pürüzsüz basıyla fikse edilmelidir.'
      },
      {
        number: 5,
        title: 'MONİTÖRİZE ANESTEZİ BAKIMINDA (MAC) "AŞIRI SEDASYON VE HİPOVENTİLASYON TUZAĞI"',
        content: 'Pterjiyum ameliyatı lokal anesteziyle yapılan günübirlik bir girişimdir. Ameliyat örtüleri altında nefes darlığı hisseden hastayı uyutmak amacıyla kontrolsüz Propofol bolusları verilmesi hastada solunum depresyonu, derin uyku ve ardından panikle sıçrayarak uyanmaya yol açar. Bu istemsiz kafa hareketi cerrahın elindeki mikro-bıçağın göze batmasına neden olabilecek en büyük tehlikedir! Yalnızca titre edilmiş minimal Midazolam (0.5-1 mg) uygulanmalı, örtü altına aktif oksijen akışı ve aspirasyon sağlanmalı, hasta ile sözel kooperasyon korunmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Kornea Konsültasyonu: Pterjiyumun kornea üzerindeki boyutu (grade 1-3), pupiller aksa mesafesi, astigmatizma miktarı (keratometri/topografi), gözyaşı filmi (Schirmer ve BUT testi) ve greft donör sahasının (üst konjonktiva) incelenmesi.',
      'Kardiyoloji Konsültasyonu: Lokal anestezik içindeki adrenalin ve Aschner okülokardiyak refleksi açısından kardiyovasküler stabilite.',
      'Anestezi Polikliniği: Sırtüstü yatma toleransı, klostrofobi taraması ve sedasyon planı.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan Kullanımı: Aspirin, Klopidogrel veya DOAK kullanımı; pterjiyum cerrahisi yüzeyel konjonktival bir işlem olduğundan çoğu merkezde kan sulandırıcılar KESİLMEZ, ancak subkonjonktival kanama ve hematomu azaltmak için hemostaz titiz yönetilir.',
      'Önceki Cerrahi Öyküsü: Daha önce geçirilmiş glokom cerrahisi (trabekülektomi blebi varlığında üst konjonktiva donör olarak kullanılamaz; alt temporal konjonktiva veya amniyon zarı seçilir).',
      'Aktif Oküler Enfeksiyon Öyküsü: Blefarit, konjonktivit veya dakriyosistit varlığı operasyon öncesi tedavi edilmelidir.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri ve Temel Biyokimya.',
      '12 Derivasyonlu EKG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleksi ve adrenalin taşiaritmi analizi), SpO2, NIBP ve Solunum Sayısı.',
      'Ritim Takibi: Medial alanda pterjiyum gövdesi çekilirken ani bradikardi gelişimi açısından monitör sürekli izlenir.',
      'Sedasyon ve Solunum Takibi: Nazal kanülden O2 insüflasyonu ve solunum paterni takibi.'
    ],
    vascularAccess: [
      '1 adet güvenli periferik intravenöz damar yolu (20-22G)',
      'Acil Bradikardi Kiti: İV Atropin (0.5 mg ampul)',
      'Gereğinde Hipertansiyon Yönetimi: İV Esmolol veya Labetalol'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Donüt ile Hareketsiz',
    patientPositionDetails: [
      'Hasta ameliyat masasına sırtüstü yatırılır; baş mikroskobun optik eksenine paralel sabitlenir.',
      'Cerrahi örtülerin hastanın ağzına ve burnuna yapışmaması için esnek L-bar köprüsü veya tel çadır kurulur.',
      'Hastaya burun kanülü ile 2-3 L/dk O2 verilir ve örtü altına temiz hava/aspiratör hattı bağlanır.'
    ],
    anesthesiaManagement: [
      'Topikal & Subkonjonktival Anestezi Protokolü:',
      '  - Topikal Damla: Proparakain %0.5 (insizyondan önce 3-5 dakika arayla 2-3 damla).',
      '  - Subkonjonktival İnfiltrasyon: Pterjiyum gövdesine ve donör sahaya 0.5 - 1.0 mL Lidokain %2 + 1:100.000 Epinefrin (30G iğne ile nazikçe verilir; pterjiyum Tenondan kabarır).',
      '  - Tam vazokonstrüksiyon ve hemostaz için 5-7 dakika beklenir.',
      'Monitörize Anestezi Bakımı (MAC):',
      '  - Titre edilmiş ultra-hafif sedasyon: Midazolam (0.5 - 1.0 mg İV).',
      '  - Propofol boluslarından kesinlikle kaçınılır; hasta sözel komutlara yanıt verebilmeli, derin uyku ve apneye girmemelidir.'
    ],
    airwayManagement: [
      'MAC yönetiminde hava yolu hastanın spontan solunumudur; burun kanülü ile 2 L/dk O2 verilir.',
      'Örtü altında karbondioksit birikimini ve panik hissini önlemek için vakum hortumu ile aktif örtü altı havalandırma kurulur.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Monitörizasyon ve Başın Sabitlenmesi.',
      '2. Topikal Proparakain Damlası ve Povidon İyot (%5) Antisepsisi.',
      '3. Blefaroste Takılması (Göz kapaklarının açılması — Okülokardiyak refleks kontrolü!).',
      '4. Subkonjonktival Lokal Anestezik ve Epinefrin İnfiltrasyonu (Pterjiyum gövdesi ve üst konjonktiva).',
      '5. Korneal Keratektomi: Pterjiyum başının kresent/Beaver bıçak ile kornea stromasından düzgün sıyrılması (Sıfır hareket aşaması!).',
      '6. Pterjiyum Gövdesinin ve Alttaki Proliferatif Tenon Dokusunun Eksizyonu (Medial rektus kası fasyasının korunması).',
      '7. Bipolar Koter ile Noktasal Minimal Hemostaz (Aşırı skleral koterden kaçınılır).',
      '8. Üst Temporal Bulber Konjonktivadan İnce, Tenonsuz ve Limbal Kök Hücre İçeren Serbest Otogreftin (CAG) Hazırlanması.',
      '9. Greftin Pterjiyum Sklera Yatağına Taşınması (Limbus-Limbus oryantasyonunun doğrulanması).',
      '10. Fibrin Doku Yapıştırıcısı (Tisseel) Uygulanması ve Greftin 2-3 Dakika Bası ile Yapıştırılması (veya 8-0/10-0 dikişler).',
      '11. Blefarostanın Çıkarılması, Antibiyotikli Damla/Pomad ve Steril Basısız Kapama (Gereğinde Terapötik Kontakt Lens).'
    ],
    emergenceNotes: [
      'Lokal/MAC cerrahisinde uyanma dönemi yoktur; hasta ameliyat biter bitmez yürüyerek veya tekerlekli sandalyeyle ayrılabilir.',
      'Ameliyat edilen göze baskılı pansuman yapılmaz; steril gazlı bezle hafif pansuman uygulanır.',
      'İlk 24-48 saat batma hissi ve sulanma normaldir; hastanın gözü ovuşturması kesinlikle yasaklanır (greft yerinden oynayabilir).'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Fibrin yapıştırıcı ile yapılan otogreftlemede ağrı ve batma hissi dikişli cerrahiye göre %80 daha azdır.',
      'Oral Parasetamol (500-1000 mg) ilk 24-48 saatte tamamen yeterlidir.',
      'İlk 1-2 gün aralıklı soğuk jel kompres ödem ve batma hissini hafifletir.',
      'Cerrahi sonrası kornea epitel iyileşmesini hızlandırmak ve ağrıyı sıfırlamak için ilk 24-48 saat terapötik bandaj kontakt lens takılabilir.'
    ],
    prospectRecommendations: [
      'PROSPECT Kornea ve Yüzeyel Cerrahi Rehberleri:',
      'Fibrin doku yapıştırıcısı kullanımının sütürlere kıyasla postoperatif ağrıyı, yabancı cisim hissini ve inflamasyonu dramatik ölçüde azalttığı;',
      'Sistemik opioid ihtiyacının bulunmadığı ve multimodal topikal analjezi (koruyucusuz suni gözyaşı + topikal NSAİİ) önerilir.'
    ],
    erasRecommendations: [
      'ERAS Göz Cerrahisi Protokolleri:',
      'Günübirlik cerrahi (Day-case): Hasta işlemden 15-30 dakika sonra taburcu edilir.',
      'Güneş Gözlüğü ve UV Koruması: Postoperatif dönemde ve hayat boyu UV koruyucu kaliteli güneş gözlüğü kullanımı rekürrensi engellemede kritiktir.',
      'Topikal Steroid ve Antibiyotik: Greft ödemini baskılamak için topikal kortikosteroid damlalar 3-4 hafta süreyle kademeli azaltılarak kullanılır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Cornea and External Disease - Pterygium Excision with Conjunctival Autograft, pp. 848-852.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS): Day-Case Protocols for Ocular Surface Surgery.',
    prospectReference: 'PROSPECT Guidelines: Postoperative Pain Management in Corneal and Ocular Surface Procedures.',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Pterygium and Ocular Surface Disorders.',
      'Cornea Society & EuCornea: Evidence-Based Consensus on Pterygium Surgery and Grafting Techniques.',
      'Türk Oftalmoloji Derneği (TOD) Kornea ve Oküler Yüzey Birimi: Pterjiyum Tedavi Rehberi.'
    ]
  }
};
