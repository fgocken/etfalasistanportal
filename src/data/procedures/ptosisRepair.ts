import { ProcedureDefinition } from '../../types/procedures';

/**
 * Pitozis Onarımı: Levator Aponörozu İlerletmesi / Rezeksiyonu, Müller Kası-Konjonktiva Rezeksiyonu (MMCR) ve Frontalis Askı Cerrahisi
 * (Ptosis Repair / Blepharoptosis Surgery: Levator Aponeurosis Advancement, Müller's Muscle Resection and Frontalis Sling)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Oculoplastics: Ptosis Repair, pp. 874-880),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Blepharoptosis,
 * European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS),
 * British Ophthalmic Anaesthesia Society (BOAS) ve Türk Oftalmoloji Derneği (TOD) Oküloplastik Cerrahi Birimi Protokolleri referans alınarak hazırlanmıştır.
 */
export const ptosisRepair: ProcedureDefinition = {
  id: 'ptosis-repair',
  name: 'Pitozis Onarımı: Levator Aponörozu İlerletmesi ve Blefaropitozis Cerrahisi',
  shortCode: 'GOZ-PITOZIS',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Kapak Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Üst göz kapağının serbest kenarının normal anatomik seviyesinden (kornea üst limbusunun 1.5 - 2 mm altı veya pupilla ışık refleksinden kapağa olan mesafe [MRD1] > 4.0 - 4.5 mm) aşağı düşmesi (blefaropitozis) sonucu üst görme alanının daralması, baş pozisyonu (çene yukarıda yürüme), astenopi, yorgunluk hissi ve kozmetik disfonksiyon yaşayan hastalarda kapak yüksekliğinin, kıvrımının ve simetrisinin cerrahi olarak düzeltilmesi ameliyatıdır. Temel mikrocerrahi teknikler: (1) Anterior Yaklaşım - Levator Aponörozu İlerletmesi / Rezeksiyonu (LPS Advancement): Aponevrotik ve involüsyonel pitoziste dünya genelinde altın standarttır. Üst kapak cilt kıvrımından (crease) insizyon yapılır; orbikülaris kası geçilerek orbital septum açılır, preaponevrotik yağ yastıkçıkları ekarte edilerek Whitnall ligamenti ve levator aponörozu ortaya konur; aponöroz tarsus ön yüzüne 5-0 veya 6-0 kalıcı dikişlerle asılır. Ameliyat esnasında hasta oturtularak kapak seviyesi ve kontürü milimetrik ayarlanır; (2) Posterior Yaklaşım - Müller Kası-Konjonktiva Rezeksiyonu (MMCR / Putterman Prosedürü): Fenilefrin testi pozitif olan hafif-orta pitoziste konjonktival yaklaşımla 8 mm rezeksiyon; (3) Frontalis Askı Cerrahisi (Frontalis Sling): Levator fonksiyonu çok zayıf (< 4 mm) olan konjenital pitoziste fasya lata veya silikon askı materyali ile kapağın alın (frontalis) kasına bağlanması.',
  indications: [
    'Aponevrotik (İnvolüsyonel / Senil) Pitozis: İleri yaşta levator aponörozunun tarsustan ayrılması (dehissens/dezinsersiyon) veya incelmesi (en sık endikasyon; yüksek kapak kıvrımı ve iyi levator fonksiyonu > 10-12 mm)',
    'Post-Cerrahi ve Kontakt Lens Pitozisi: Katarakt, glokom veya vitrektomi ameliyatlarında blefaroste (spekulum) basısına veya kronik sert lens kullanımına bağlı aponöroz ayrılması',
    'Miyojenik ve Konjenital Pitozis: Levator kasının gelişimsel disfonksiyonu (çocuklarda ambliyopi riski) veya Kronik Progresif Eksternal Oftalmopleji (CPEO)',
    'Nörojenik Pitozis: Parsiyel 3. kranyal sinir felci sekeli veya Horner Sendromu (Müller kası denervasyonu)',
    'Travmatik ve Mekanik Pitozis: Kapak laserasyonu sonrası aponevrotik yırtılma veya kitle eksizyonu sonrası rekonstrüksiyon'
  ],
  averageDuration: '30 - 60 dakika (Tek taraflı levator ilerletmesi: 30-45 dk; Bilateral olgular: 60-75 dk; Frontalis askı cerrahisi: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 20 mL (Üst göz kapağı ve preaponevrotik orbital yağ dokusu son derece zengin mikrovasküler ağa sahiptir; ancak lokal vazokonstriktör [epinefrin] ve titiz bipolar koterizasyon ile kan kaybı ihmal edilebilir düzeydedir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Postoperatif Derin Orbital/Retrobulber Hematom Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Preaponevrotik Orbital Yağ Damarları: Orbital septum açıldığında sarı renkli yağ dokusu içindeki perforatör damarların kanayarak orbitaya sızması (akut orbital kompartman sendromu ve optik sinir iskemisi riski)',
      'Marginal ve Periferik Palpebral Arter Arkadları: Tarsusun üst sınırında yer alan periferik arkadın aponöroz diseksiyonunda zedelenmesi',
      'Medial ve Lateral Palpebral Arter Dallarından Kanamalar'
    ],
    hemostasisStrategies: [
      'Lokal anestezik solüsyonuna 1:100.000 veya 1:200.000 Epinefrin (Adrenalin) eklenmesi ve insizyondan 7-10 dakika önce dokuya infüze edilmesi',
      'Bipolar wet-field mikro-koter ile doku nekrozu yaratmadan selektif hemostaz',
      'Preaponevrotik yağ eksize edilecekse tabanına hemostatik klemp konulup koterize edilmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Lokal İnfiltrasyon Anestezisi (Lidokain %2 + Bupivakain %0.5 + 1:100.000 Epinefrin, Düşük Hacim: 1.0 - 1.5 mL) + Monitörize Anestezi Bakımı (MAC: Titre Edilmiş Ultra-Hafif Bilinçli Sedasyon) — İntraoperatif hasta kooperasyonu ve kapak seviyesi ayarlanabilmesi için DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Genel Endotrakeal Anestezi (GETA) veya Laringeal Maske (LMA): Pediatrik konjenital pitozis olgularında (frontalis askı cerrahisi), ileri derecede demansı, kontrolsüz baş tremoru, mental retardasyonu, klostrofobisi veya panik bozukluğu olan erişkinlerde (ameliyat masasında intraoperatif kapak yüksekliği testi yapılamaz; cerrah kapak seviyesini milimetrik cetvelle tahmin eder)'
    ],
    clinicalRationale: 'Düşük hacimli (1-1.5 mL) lokal infiltrasyon + ultra-hafif bilinçli sedasyon (MAC), cerrahın hastayı ameliyat masasında oturtarak gözlerini açıp kapatmasını istemesine ve levator aponöroz gerginliğini gerçek zamanlı simetriyle ayarlamasına imkan tanıdığı için mutlak altın standarttır. Hava yolu doğal spontan solunumda tutulur; genel anestezi veya ağır sedasyon kapak kas fonksiyonunu ve hasta kooperasyonunu bozacağından yalnızca pediatrik ya da uyumsuz olgularda tercih edilir.',
    rulesTitle: 'PİTOZİS ONARIMINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'PİTOZİS ONARIMINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) İNTRAOPERATİF HASTA KOOPERASYONU, OTURUR POZİSYON VE KAPAK KONTÜRÜ AYARLAMASI İÇİN "SIFIR DERİN SEDASYON" DİSİPLİNİ — Levator aponörozu tarsusa dikilirken cerrah hastayı ameliyat masasında dik/yarı-oturur (fowler) pozisyona getirir ve gözlerini açıp kapamasını, yukarı ve tam karşıya bakmasını ister (kapak yüksekliği, kıvrımı ve simetrisi ancak tam uyanık ve koopere hastada ayarlanabilir!). Derin sedasyon, propofol bolusları veya aşırı opioid alan hasta disoryante olur, gözlerini açamaz, kapak dinamiği çöker veya pitozis aşırı/yetersiz düzeltilir (overcorrection/undercorrection). Hasta ile sözel temas kesintisiz sürdürülmeli; sedasyon yalnızca lokal enjeksiyon esnasında ultra-kısa ve minimal tutulmalıdır. (2) LOKAL ANESTEZİKTE DÜŞÜK HACİM KURALI, MOTOR BLOK VE MÜLLER KASI / EPİNEFRİN YANILSAMASI — Üst kapağa verilecek lokal anestezik hacmi 1–1.5 mL\'yi KESİNLİKLE GEÇMEMELİDİR! Yüksek hacimli enjeksiyon mekanik ödem yaratarak kapağı aşağı iter; orbikülaris kası motor blokajı kapak açıklığını bozar. Ayrıca lokal anestezikteki Epinefrin sempatomimetik etkiyle Müller kasını kasarak kapağı yapay olarak 1-2 mm yukarı kaldırır. Cerrah ve anestezi bu "adrenalin yanılsamasını" hesaba katmalı, gereksiz yüksek doz epinefrinden kaçınmalıdır. (3) KORNEA GÜVENLİĞİ, CORNEAL SHIELD (KORUYUCU SKLERAL KALKAN) VE BELL FENOMENİ KONTROLÜ — Cilt insizyonu, orbital septum açılması ve tarsal dikişler korneanın birkaç milimetre üzerinde icra edilir. Kornea epitel erozyonu veya perforasyonunu önlemek için insizyon öncesi antibiyotikli pomad sürülerek opak plastik Kornea Kalkanı (Corneal Shield) yerleştirilmelidir. Ameliyat öncesi hastanın Bell fenomeni (göz kapandığında kürenin yukarı kayma refleksi) mutlaka değerlendirilmelidir; Bell refleksi zayıf olan hastalarda ameliyat sonrası lagoftalmi ve ağır kornea ülseri riski çok yüksektir! (4) OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE WHITNALL LİGAMENTİ / LEVATOR TRAKSİYONU ALARMI — Levator aponörozu disseke edilirken ve Whitnall ligamenti altından serbestleştirilirken uygulanan orbital çekme manevraları trigemino-vagal refleksi (CN V oftalmik dal -> CN X vagus) tetikleyebilir. Monitörde ani derin bradikardi, nodal kaçış ritmi veya ventriküler asistoli gelişebilir. Ritim kesintisiz izlenmeli, bradikardi görüldüğünde cerraha çekmeyi gevşetmesi söylenmeli; düzelmezse derhal İV Atropin (0.5 mg) uygulanmalıdır. (5) MİYOPATİK PİTOZİSTE (MİYASTENİ, MİTOKONDRİYAL HASTALIK, CPEO) GENEL ANESTEZİ VE KAS GEVŞETİCİ TEHLİKESİ — Pitozis altta yatan Miyastenia Gravis, Kronik Progresif Eksternal Oftalmopleji (CPEO) veya miyotonik distrofilere bağlı olabilir. Genel anestezi uygulanacaksa: Non-depolarizan kas gevşeticilere (rokuronyum vb.) karşı aşırı duyarlılık vardır; süksinilkolin rabdomiyoliz, hiperkalemi ve malign hipertermi benzeri reaksiyon riski nedeniyle KONTRENDİKEDİR! Solunum yetmezliği ve uzamış postoperatif mekanik ventilasyon riskine karşı TOF kesintisiz izlenmeli, Sugammadeks hazır bulundurulmalı ve hasta tam uyanık olmadan ekstübe edilmemelidir.',
    indispensableRules: [
      {
        number: 1,
        title: 'İNTRAOPERATİF HASTA KOOPERASYONU, OTURUR POZİSYON VE KAPAK KONTÜRÜ AYARLAMASI İÇİN "SIFIR DERİN SEDASYON" DİSİPLİNİ',
        content: 'Levator aponörozu tarsusa dikilirken cerrah hastayı ameliyat masasında dik/yarı-oturur (fowler) pozisyona getirir ve gözlerini açıp kapamasını, yukarı ve tam karşıya bakmasını ister (kapak yüksekliği, kıvrımı ve simetrisi ancak tam uyanık ve koopere hastada ayarlanabilir!). Derin sedasyon, propofol bolusları veya aşırı opioid alan hasta disoryante olur, gözlerini açamaz, kapak dinamiği çöker veya pitozis aşırı/yetersiz düzeltilir (overcorrection/undercorrection). Hasta ile sözel temas kesintisiz sürdürülmeli; sedasyon yalnızca lokal enjeksiyon esnasında ultra-kısa ve minimal tutulmalıdır.'
      },
      {
        number: 2,
        title: 'LOKAL ANESTEZİKTE DÜŞÜK HACİM KURALI, MOTOR BLOK VE MÜLLER KASI / EPİNEFRİN YANILSAMASI',
        content: 'Üst kapağa verilecek lokal anestezik hacmi 1–1.5 mL\'yi KESİNLİKLE GEÇMEMELİDİR! Yüksek hacimli enjeksiyon mekanik ödem yaratarak kapağı aşağı iter; orbikülaris kası motor blokajı kapak açıklığını bozar. Ayrıca lokal anestezikteki Epinefrin sempatomimetik etkiyle Müller kasını kasarak kapağı yapay olarak 1-2 mm yukarı kaldırır. Cerrah ve anestezi bu "adrenalin yanılsamasını" hesaba katmalı, gereksiz yüksek doz epinefrinden kaçınmalıdır.'
      },
      {
        number: 3,
        title: 'KORNEA GÜVENLİĞİ, CORNEAL SHIELD (KORUYUCU SKLERAL KALKAN) VE BELL FENOMENİ KONTROLÜ',
        content: 'Cilt insizyonu, orbital septum açılması ve tarsal dikişler korneanın birkaç milimetre üzerinde icra edilir. Kornea epitel erozyonu veya perforasyonunu önlemek için insizyon öncesi antibiyotikli pomad sürülerek opak plastik Kornea Kalkanı (Corneal Shield) yerleştirilmelidir. Ameliyat öncesi hastanın Bell fenomeni (göz kapandığında kürenin yukarı kayma refleksi) mutlaka değerlendirilmelidir; Bell refleksi zayıf olan hastalarda ameliyat sonrası lagoftalmi ve ağır kornea ülseri riski çok yüksektir!'
      },
      {
        number: 4,
        title: 'OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE WHITNALL LİGAMENTİ / LEVATOR TRAKSİYONU ALARMI',
        content: 'Levator aponörozu disseke edilirken ve Whitnall ligamenti altından serbestleştirilirken uygulanan orbital çekme manevraları trigemino-vagal refleksi (CN V oftalmik dal -> CN X vagus) tetikleyebilir. Monitörde ani derin bradikardi, nodal kaçış ritmi veya ventriküler asistoli gelişebilir. Ritim kesintisiz izlenmeli, bradikardi görüldüğünde cerraha çekmeyi gevşetmesi söylenmeli; düzelmezse derhal İV Atropin (0.5 mg) uygulanmalıdır.'
      },
      {
        number: 5,
        title: 'MİYOPATİK PİTOZİSTE (MİYASTENİ, MİTOKONDRİYAL HASTALIK, CPEO) GENEL ANESTEZİ VE KAS GEVŞETİCİ TEHLİKESİ',
        content: 'Pitozis altta yatan Miyastenia Gravis, Kronik Progresif Eksternal Oftalmopleji (CPEO) veya miyotonik distrofilere bağlı olabilir. Genel anestezi uygulanacaksa: Non-depolarizan kas gevşeticilere (rokuronyum vb.) karşı aşırı duyarlılık vardır; süksinilkolin rabdomiyoliz, hiperkalemi ve malign hipertermi benzeri reaksiyon riski nedeniyle KONTRENDİKEDİR! Solunum yetmezliği ve uzamış postoperatif mekanik ventilasyon riskine karşı TOF kesintisiz izlenmeli, Sugammadeks hazır bulundurulmalı ve hasta tam uyanık olmadan ekstübe edilmemelidir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Pitozis tipi (aponevrotik, konjenital, miyojenik, nörojenik), MRD1 ölçümü, levator fonksiyonu (üst kapak hareketi > 10 mm iyi, 5-9 mm orta, < 4 mm zayıf), kapak kıvrımı yüksekliği, fenilefrin testi (Müller kası yanıtı), Bell fenomeni ve kornea hassasiyeti.',
      'Nöroloji Konsültasyonu: Şüpheli olgularda Miyastenia Gravis taraması (AChR antikorları, Tensilon/Buz testi, EMG), Horner Sendromu veya CPEO araştırması.',
      'Kardiyoloji Konsültasyonu: Geriatrik grupta hipertansiyon, aritmiler ve koroner arter hastalığının optimizasyonu; adrenalinli lokal anestezik güvenliği.',
      'Anestezi Polikliniği: Genel vs lokal/MAC değerlendirmesi, sedasyon planı ve hasta kooperasyonu.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan İlaç Kullanımı: Aspirin, Klopidogrel, DOAK ve Warfarin; preaponevrotik yağ disseksiyonunda orbital hematom riskini önlemek için hemostatik planlama cerrah ile yapılır.',
      'Göz Kuruluğu (Kuru Göz) ve Lagoftalmi Öyküsü: Cerrahi sonrası kapak yukarı kalkacağından yetersiz göz kırpma ve Bell fenomeni eksikliği korneayı kurutabilir (Schirmer testi).',
      'Hipertansiyon ve Taşikardi Öyküsü: İntraoperatif adrenalin enjeksiyonuna ve hasta oturtulmasına karşı kardiyovasküler yanıt stabilitesi.',
      'Klostrofobi ve Anksiyete Düzeyi.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit düzeyi).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri ve Temel Biyokimya (Böbrek ve karaciğer fonksiyonları).',
      '12 Derivasyonlu EKG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleksi ve adrenalin kaynaklı taşiaritmi analizi), SpO2, NIBP ve Solunum Sayısı.',
      'Kan Basıncı Takibi (3-5 dakikada bir): Adrenalinli infiltrasyon ve hastayı masada oturtup kaldırma esnasında tansiyon dalgalanmalarının izlenmesi.',
      'Sedasyon ve Solunum Takibi: Nazal kanülden kapnografi ve oksijenasyon izlemi.'
    ],
    vascularAccess: [
      '1 adet güvenli periferik intravenöz damar yolu (20-22G)',
      'Acil Bradikardi Kiti: İV Atropin (0.5 mg ampul)',
      'Gereğinde Hipertansiyon Yönetimi: İV Esmolol veya Labetalol'
    ],
    patientPosition: 'Supin Başlangıç, İntraoperatif Ayarlanabilir Yarı-Oturur / Oturur (Fowler) Pozisyon',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; baş silikon donüt yastıkla sabitlenir.',
      'Ameliyat masasının sırt kısmı motorlu ve kolayca oturur pozisyona (45-60 derece) getirilebilir olmalıdır.',
      'Kapak yüksekliği ayarlanırken yerçekiminin kapağa gerçek etkisini görebilmek için hasta oturur pozisyona alınır ve cerrah ile tam karşı karşıya bakar.',
      'Cerrahi örtülerin yüze yapışmaması ve hasta oturtulduğunda görüşün engellenmemesi için esnek askı çadırı veya L-bar köprüsü kurulur.'
    ],
    anesthesiaManagement: [
      'Lokal İnfiltrasyon Protokolü (Minimal Volüm):',
      '  - Solüsyon: Lidokain %2 + Bupivakain %0.5 (1:1 karışım) + 1:100.000 veya 1:200.000 Epinefrin.',
      '  - Enjeksiyon Hacmi: Üst kapak cilt altı ve preseptal alana MAKSİMUM 1.0 - 1.5 mL! Aşırı volüm mekanik pitozis yapar ve kapak ayarını bozar.',
      '  - Tam vazokonstrüksiyon için insizyondan önce EN AZ 7-10 DAKİKA BEKLENMELİDİR.',
      'Monitörize Anestezi Bakımı (MAC):',
      '  - Yalnızca lokal enjeksiyon yapılırken ağrıyı kesmek amacıyla ultra-kısa sedasyon: Midazolam 0.5 - 1.0 mg İV veya çok düşük doz Fentanil 25 mcg İV.',
      '  - Diseksiyon ve kapak ayarı aşamasında HASTA TAMAMEN UYANIK OLMALIDIR; propofol infüzyonu veya bolusları KESİNLİKLE YASAKTIR.',
      'Genel Anestezi (Pediatrik / Frontalis Askı / İleri Demans):',
      '  - LMA veya Endotrakeal Entübasyon; miyopati/CPEO hastalarında süksinilkolin kontrendikedir, TOF takibi şarttır.'
    ],
    airwayManagement: [
      'MAC yönetiminde hava yolu hastanın spontan solunumudur; burun kanülü ile 2 L/dk O2 verilir.',
      'Örtü altında karbondioksit birikimini ve sıcaklık hissini önlemek için vakum hortumu ile aktif örtü altı havalandırma kurulur.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Monitörizasyon ve Başın Sabitlenmesi.',
      '2. Üst Kapak Cilt Kıvrımının (Crease) Cerrahi Kalemle İşaretlenmesi (Simetri kontrolü).',
      '3. Koruyucu Pomad Eşliğinde Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '4. Minimal Hacimli (1-1.5 mL) Lokal Anestezik ve Epinefrin İnfiltrasyonu (7-10 dk bekleme süresi).',
      '5. Cilt ve Orbikülaris İnsizyonu (15 numara bistüri veya radyofrekans mikro-iğne).',
      '6. Orbital Septumun Transvers Açılması ve Preaponevrotik Sarı Yağ Yastıkçıklarının Görülmesi.',
      '7. Levator Aponörozu ve Whitnall Ligamentinin Ortaya Konması (Orbital çekme manevralarında okülokardiyak refleks kontrolü!).',
      '8. Aponörozun Tarsus Ön Yüzüne Geçici Sütürlerle Tespiti (5-0 veya 6-0 kalıcı dikişler).',
      '9. Ameliyat Masasının Oturur Pozisyona Getirilmesi ve Hastanın Uyandırılarak Gözlerini Açmasının İstenmesi (Kapak yüksekliği, eğimi ve simetrisinin canlı ayarlanması).',
      '10. Sütürlerin Kalıcı Bağlanması, Kornea Kalkanının Çıkarılması, Cilt Kapanışı ve Basısız Pansuman.'
    ],
    emergenceNotes: [
      'Lokal/MAC cerrahisinde uyanma dönemi yoktur; ameliyat bitiminde hasta tekerlekli sandalyeye oturur vaziyette alınabilir.',
      'Ameliyat edilen göze baskılı pansuman yapılmaz; korneanın kurumasını önlemek için göz kapağı üzerine antibiyotikli pomad ve steril gevşek gazlı bez konulur.',
      'Postoperatif ilk 24-48 saatte aralıklı soğuk jel uygulaması ödemi ve hematom riskini azaltır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Pitozis onarımı sonrası ağrı genellikle hafif düzeydedir ve cerrahi sahada sızlama şeklindedir.',
      'Oral Parasetamol (500-1000 mg) ilk 24-48 saatte tamamen yeterlidir.',
      'Trombosit fonksiyonlarını baskılayarak hematom riskini artırabilecek aspirin veya agresif NSAİİ kullanımından kaçınılmalıdır.',
      'İlk 24-48 saat cerrahi sahaya aralıklı soğuk jel kompres uygulanması ödemi belirgin şekilde azaltır.'
    ],
    prospectRecommendations: [
      'PROSPECT Oküloplastik Cerrahi Rehberleri:',
      'Preoperatif ve intraoperatif lokal infiltrasyonun postoperatif analjezik gereksinimini sıfıra indirdiği;',
      'Opioid kullanımından kaçınılarak PONV (bulantı/kusma) ve buna bağlı venöz basınç artışının engellenmesi tavsiye edilir.'
    ],
    erasRecommendations: [
      'ERAS Göz ve Oküloplastik Cerrahi Protokolleri:',
      'Günübirlik cerrahi (Day-case surgery): Hasta operasyondan 30-45 dakika sonra oral alıma başlayabilir ve aynı gün güvenle taburcu edilir.',
      'Postoperatif Baş Pozisyonu: İlk gece başın 2 yastıkla (30-45 derece) yükseltilmesi ödem ve kanama riskini önler.',
      'Lagoftalmi Takibi: Ameliyat sonrası erken dönemde kapak tam kapanamayabileceğinden korneayı korumak için gündüz suni gözyaşı damlaları, gece ise yoğun oftalmik jel/pomad kullanılması esastır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Oculoplastics - Ptosis Repair (Levator Resection/Advancement and Frontalis Sling), pp. 874-880.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS): Recommendations for Day-Case Oculofacial Surgery.',
    prospectReference: 'PROSPECT Guidelines: Postoperative Pain Management in Ophthalmic and Oculoplastic Procedures.',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Blepharoptosis Management Guidelines.',
      'European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS): Consensus on Levator Advancement and Ptosis Surgery.',
      'Türk Oftalmoloji Derneği (TOD) Oküloplastik Cerrahi Birimi: Pitozis Tanı ve Tedavi Rehberi.'
    ]
  }
};
