import { ProcedureDefinition } from '../../types/procedures';

/**
 * Ektropiyon Onarımı: Lateral Tarsal Strip, Horizontal Kapak Kısaltması ve Greft/Flep ile Kapak Ektropiyonu Rekonstrüksiyonu
 * (Ectropion Repair / Lateral Tarsal Strip [LTS], Horizontal Shortening, Canthoplasty and Skin Flap/Graft)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Oculoplastics: Ectropion and Entropion Repair, pp. 868-874),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Oculofacial Plastic Surgery,
 * European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS),
 * British Ophthalmic Anaesthesia Society (BOAS) ve Türk Oftalmoloji Derneği (TOD) Oküloplastik Cerrahi Birimi Protokolleri referans alınarak yapılandırılmıştır.
 */
export const ectropionRepair: ProcedureDefinition = {
  id: 'ectropion-repair',
  name: 'Ektropiyon Onarımı: Lateral Tarsal Strip ve Horizontal Kapak Kısaltması Cerrahisi',
  shortCode: 'GOZ-EKTROPIYON',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Kapak Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Göz kapağının (özellikle alt kapağın) kenarının dışa doğru dönmesi (eversiyonu) sonucu palpebral konjonktivanın açıkta kalması, lakrimal punktumun eversiyonuna bağlı sürekli göz sulanması (epifora), kuru göz, maruziyet keratopati (exposure keratitis) ve kornea ülseri gelişen hastalarda kapak anatomisinin, tonusunun ve glob ile temasının cerrahi olarak yeniden sağlanması ameliyatıdır. En sık uygulanan mikrocerrahi teknikler: (1) Lateral Tarsal Strip (LTS / Bick Prosedürü): İnvolüsyonel (senil) gevşeklikte altın standarttır; lateral kantotomi ve inferior kantolizis sonrası alt tarsus lateralinden bir şerit hazırlanıp fazla doku eksize edilir ve tarsal şerit orbita lateral tüberkülü periostuna (Whitnall tüberkülü) 4-0/5-0 erimeyen dikişlerle asılarak kapak yatay gerginliği sağlanır; (2) Medial İğsi / Tarsokonjonktival Eksizyon (Medial Spindle): Punktum eversiyonu ve medial laksitede punktum altına eliptik eksizyon; (3) Tam Kat Pentagonal Kısaltma: Kapağın santral/lateralinden kama şeklinde doku çıkarılması; (4) Skatrisyel Ektropiyon Rekonstrüksiyonu: Yanık, skar veya aktinik hasara bağlı ön lamel kısalığında retroauriküler/üst kapak tam kat serbest deri grefti veya lokal transpozisyonel flep (Z-plasti).',
  indications: [
    'İnvolüsyonel (Senil) Ektropiyon: İleri yaşta kantal tendonların uzaması, alt kapak retraktörlerinin ayrılması ve orbikülaris kas atrofisine bağlı alt kapak sarkması (en sık endikasyon)',
    'Paralitik Ektropiyon: Fasiyal sinir felci (Bell paralizisi, akustik nörinom veya parotis cerrahisi sekeli) sonucu orbikülaris okuli kas tonusunun kaybı ve lagoftalmi',
    'Skatrisyel Ektropiyon: Travma, termal/kimyasal yanık, önceki başarısız blefaroplasti veya deri tümörü eksizyonu sonrası skar kontraktürü ile kapağın aşağı çekilmesi',
    'Mekanik ve Konjenital Ektropiyon: Kapakta kitle/tümör ağırlığı ile dışa dönme veya doğumsal kraniofasial malformasyonlar',
    'İlerleyici Maruziyet Keratopati (Exposure Keratopathy) ve Kornea Enfeksiyon/Perforasyon Riski'
  ],
  averageDuration: '30 - 60 dakika (Tek taraflı izole LTS: 30-40 dk; Bilateral LTS veya deri grefti/lokal flep ile kombine skatrisyel onarımlar: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 20 mL (Göz kapağı ve kantus zengin kan dolaşımına sahiptir; ancak lokal vazokonstriktör [epinefrin] ve titiz bipolar koterizasyon ile kanama minimaldir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Postoperatif Retrobulber/Orbital Hematom Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Orbital Kompartman / Retrobulber Hematom: Lateral kantotomi ve periostal disseksiyon esnasında derin orbital damarların veya lakrimal arter dallarının kanayarak orbita içine sızması (akut kompartman sendromu ve optik sinir basısı yaratan en kritik acil durum)',
      'Angular Damarlar ve Medial Palpebral Arter: Medial kantal alanda yapılan disseksiyonlarda',
      'Marginal ve Periferik Palpebral Arter Arkadları: Tarsal strip hazırlığı ve tam kat kapak insizyonlarında mikrovasküler kanama'
    ],
    hemostasisStrategies: [
      'Lokal anestezik solüsyonuna 1:100.000 veya 1:200.000 Epinefrin (Adrenalin) eklenmesi ve insizyondan 7-10 dakika önce dokuya infüze edilmesi',
      'Bipolar wet-field mikro-koter ile doku nekrozu yaratmadan selektif hemostaz',
      'Antikoagülan / antiagregan ilaçların perioperatif hemostaz planlaması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Lokal İnfiltrasyon Anestezisi (Lidokain %2 + Bupivakain %0.5 + 1:100.000 Epinefrin) + Rejyonel Sinir Bloğu (İnfraorbital ve Zigomatikofasiyal Blok) + Monitörize Anestezi Bakımı (MAC: Bilinçli Minimal Sedasyon) — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Genel Endotrakeal Anestezi (GETA) veya Laringeal Maske (LMA): İleri derecede demansı, kontrolsüz baş tremoru, mental retardasyonu, klostrofobisi veya panik bozukluğu olan yaşlı hastalarda; pediatrik olgularda veya büyük serbest deri grefti / kompleks rekonstrüksiyon gerektiren olgularda'
    ],
    rulesTitle: 'EKTROPİYON ONARIMINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'EKTROPİYON ONARIMINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) LOKAL ANESTEZİK VE EPİNEFRİN (ADRENALİN) TOKSİSİTESİ, İNTRAVASKÜLER ENJEKSİYON VE KARDİYOVASKÜLER DALGALANMA ALARMI — Kapak derisi ve kantal bölge son derece zengin mikrovasküler ağa sahiptir. Kanama kontrolü için Lidokain/Bupivakain karışımına 1:100.000 veya 1:200.000 Epinefrin eklenir. Enjeksiyon esnasında negatif aspirasyon yapılmazsa veya yaşlı kardiyak hastada aşırı doz uygulanırsa akut taşikardi, ventriküler aritmiler, şiddetli hipertansif kriz ve miyokardiyal iskemi gelişebilir! Anestezi ekibi enjeksiyon anında ritmi ve tansiyonu kesintisiz izlemeli, cerrah ile verilen lokal anestezik hacmini mililitre bazında teyit etmeli ve kardiyak dalgalanmalara karşı beta-bloker/vazodilatatör hazır bulundurmalıdır. (2) KORNEAL KORUMA, KORNEA SHIELD (KORUYUCU SKLERAL PLASTİK KALKAN) VE SIFIR İYATROJENİK KORNEA TRAVMASI — Kapak diseksiyonu, koterizasyon ve dikiş atımı korneanın yalnızca 1-2 milimetre yakınında icra edilir. Korneanın cerrahi örtü altında kurumasını, koter yanığını veya iğne/bıçak perforasyonunu önlemek için insizyon öncesi göze antibiyotikli göz merhemi sürülerek steril opak plastik veya silikon kornea kalkanı (Corneal Shield) yerleştirilmelidir. Kalkan yerleştirilirken ve operasyon sonunda çıkarılırken kornea epiteline sıfır travma prensibine uyulmalı, operasyon bitiminde florosein ile epitel sağlamlığı teyit edilmelidir. (3) LATERAL KANTUS DİSSEKSİYONU VE PERİOSTAL DİKİŞTE OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) — Lateral tarsal strip hazırlanırken inferior kantolizis yapılması ve tarsal şeridin orbita lateral tüberkül periostuna (Whitnall tüberkülü) 4-0/5-0 dikişlerle asılması derin trigemino-vagal refleksi (CN V oftalmik/maksiller dal -> CN X vagus) tetikleyebilir. Monitörde ani derin bradikardi, nodal kaçış ritmi veya asistoli gelişebilir! Ritim anında takip edilmeli, bradikardi görüldüğünde cerraha çekmeyi gevşetmesi söylenmeli; düzelmezse derhal İV Atropin (0.5 mg) uygulanmalıdır. (4) MONİTÖRİZE ANESTEZİ BAKIMINDA (MAC) "AŞIRI SEDASYON VE HİPOVENTİLASYON TUZAĞI" — Ektropiyon hastaları çoğunlukla ileri yaşta, kardiyak ve akciğer patolojisi olan bireylerdir. Hastayı sakinleştirmek amacıyla kontrolsüz Propofol bolusları veya yüksek doz benzodiazepin verilmesi solunum depresyonuna, hiperkapniye ve örtü altında hava açlığıyla ani sıçrayarak uyanmaya yol açar. Bu istemsiz baş hareketi cerrahın elindeki bistüri veya koterin glob perforasyonu yapmasına yol açabilecek en büyük tehlikedir! Yalnızca titre edilmiş minimal Midazolam (0.5-1 mg) ve Fentanil (25 mcg) uygulanmalı, nazal O2 ile örtü altı aktif aspirasyon sürdürülmeli ve hasta ile sakin sözel iletişim korunmalıdır. (5) POSTOPERATİF DERİN ORBİTAL / RETROBULBER HEMATOM, GÖZ İÇİ BASINCI (GİB) VE KALICI KÖRLÜK RİSKİ — Lateral kantotomi ve periostal disseksiyon sahasındaki yetersiz hemostaz, kanın orbita kompartmanına sızarak retrobulber/orbital hematom oluşturmasına neden olabilir. Hematom intraorbital basıncı ve GİB\'i hızla yükselterek santral retinal arter tıkanıklığı ve optik sinir iskemisiyle saatler içinde KALICI KÖRLÜK yaratır! Operasyon bitiminde koterizasyon eksiksiz olmalı; derlenme odasında hastada ani gelişen şiddetli göz ağrısı, proptozis, kapakta gergin şişlik veya görme kaybı görüldüğünde anestezi ve cerrahi ekibi derhal acil lateral kantotomi/kantolizis ile orbitayı dekomprese etmeye hazır olmalıdır.',
    indispensableRules: [
      {
        number: 1,
        title: 'LOKAL ANESTEZİK VE EPİNEFRİN (ADRENALİN) TOKSİSİTESİ, İNTRAVASKÜLER ENJEKSİYON VE KARDİYOVASKÜLER DALGALANMA ALARMI',
        content: 'Kapak derisi ve kantal bölge son derece zengin mikrovasküler ağa sahiptir. Kanama kontrolü için Lidokain/Bupivakain karışımına 1:100.000 veya 1:200.000 Epinefrin eklenir. Enjeksiyon esnasında negatif aspirasyon yapılmazsa veya yaşlı kardiyak hastada aşırı doz uygulanırsa akut taşikardi, ventriküler aritmiler, şiddetli hipertansif kriz ve miyokardiyal iskemi gelişebilir! Anestezi ekibi enjeksiyon anında ritmi ve tansiyonu kesintisiz izlemeli, cerrah ile verilen lokal anestezik hacmini mililitre bazında teyit etmeli ve kardiyak dalgalanmalara karşı beta-bloker/vazodilatatör hazır bulundurmalıdır.'
      },
      {
        number: 2,
        title: 'KORNEAL KORUMA, KORNEA SHIELD (KORUYUCU SKLERAL PLASTİK KALKAN) VE SIFIR İYATROJENİK KORNEA TRAVMASI',
        content: 'Kapak diseksiyonu, koterizasyon ve dikiş atımı korneanın yalnızca 1-2 milimetre yakınında icra edilir. Korneanın cerrahi örtü altında kurumasını, koter yanığını veya iğne/bıçak perforasyonunu önlemek için insizyon öncesi göze antibiyotikli göz merhemi sürülerek steril opak plastik veya silikon kornea kalkanı (Corneal Shield) yerleştirilmelidir. Kalkan yerleştirilirken ve operasyon sonunda çıkarılırken kornea epiteline sıfır travma prensibine uyulmalı, operasyon bitiminde florosein ile epitel sağlamlığı teyit edilmelidir.'
      },
      {
        number: 3,
        title: 'LATERAL KANTUS DİSSEKSİYONU VE PERİOSTAL DİKİŞTE OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ)',
        content: 'Lateral tarsal strip hazırlanırken inferior kantolizis yapılması ve tarsal şeridin orbita lateral tüberkül periostuna (Whitnall tüberkülü) 4-0/5-0 dikişlerle asılması derin trigemino-vagal refleksi (CN V oftalmik/maksiller dal -> CN X vagus) tetikleyebilir. Monitörde ani derin bradikardi, nodal kaçış ritmi veya asistoli gelişebilir! Ritim anında takip edilmeli, bradikardi görüldüğünde cerraha çekmeyi gevşetmesi söylenmeli; düzelmezse derhal İV Atropin (0.5 mg) uygulanmalıdır.'
      },
      {
        number: 4,
        title: 'MONİTÖRİZE ANESTEZİ BAKIMINDA (MAC) "AŞIRI SEDASYON VE HİPOVENTİLASYON TUZAĞI"',
        content: 'Ektropiyon hastaları çoğunlukla ileri yaşta, kardiyak ve akciğer patolojisi olan bireylerdir. Hastayı sakinleştirmek amacıyla kontrolsüz Propofol bolusları veya yüksek doz benzodiazepin verilmesi solunum depresyonuna, hiperkapniye ve örtü altında hava açlığıyla ani sıçrayarak uyanmaya yol açar. Bu istemsiz baş hareketi cerrahın elindeki bistüri veya koterin glob perforasyonu yapmasına yol açabilecek en büyük tehlikedir! Yalnızca titre edilmiş minimal Midazolam (0.5-1 mg) ve Fentanil (25 mcg) uygulanmalı, nazal O2 ile örtü altı aktif aspirasyon sürdürülmeli ve hasta ile sakin sözel iletişim korunmalıdır.'
      },
      {
        number: 5,
        title: 'POSTOPERATİF DERİN ORBİTAL / RETROBULBER HEMATOM, GÖZ İÇİ BASINCI (GİB) VE KALICI KÖRLÜK RİSKİ',
        content: 'Lateral kantotomi ve periostal disseksiyon sahasındaki yetersiz hemostaz, kanın orbita kompartmanına sızarak retrobulber/orbital hematom oluşturmasına neden olabilir. Hematom intraorbital basıncı ve GİB\'i hızla yükselterek santral retinal arter tıkanıklığı ve optik sinir iskemisiyle saatler içinde KALICI KÖRLÜK yaratır! Operasyon bitiminde koterizasyon eksiksiz olmalı; derlenme odasında hastada ani gelişen şiddetli göz ağrısı, proptozis, kapakta gergin şişlik veya görme kaybı görüldüğünde anestezi ve cerrahi ekibi derhal acil lateral kantotomi/kantolizis ile orbitayı dekomprese etmeye hazır olmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Ektropiyon etiyolojisi (involüsyonel, paralitik, skatrisyel), kapak distraksiyon testi (pinch test > 6 mm), snap-back testi, punktum pozisyonu, maruziyet keratopati düzeyi ve cerrahi teknik planı.',
      'Kardiyoloji Konsültasyonu: İleri yaş hasta grubunda hipertansiyon, aritmiler ve koroner arter hastalığının kontrolü; lokal anestezik içindeki adrenalin etkileşimi planı.',
      'Göğüs Hastalıkları Konsültasyonu: Cerrahi örtü altında nefes darlığı yaşamaması için KOAH veya astım hastalarının preoperatif bronkodilatör optimizasyonu.',
      'Anestezi Değerlendirmesi: Sırtüstü yatma (kifoz/artrit) toleransı, mental kognitif durum ve sedasyon güvenliği.'
    ],
    historyAndPhysical: [
      'Antikoagülan ve Antiagregan Kullanımı: Aspirin, Klopidogrel, Warfarin ve DOAK (Apiksaban, Rivaroksaban vb.); oküloplastik kapak cerrahisinde ameliyat sonrası orbital hematom ve görme kaybı riskini en aza indirmek için hemostatik ilaç planı cerrah ile konsülte edilir.',
      'Hipertansiyon Öyküsü: İntraoperatif ve postoperatif tansiyon piki hematom riskini tetikleyeceğinden bazal kan basıncı SKB < 140 mmHg seviyesinde hedeflenir.',
      'Önceki Göz ve Kapak Girişimleri: Geçirilmiş blefaroplasti, katarakt, radyoterapi veya fasiyal travma.',
      'Klostrofobi ve Anksiyete Düzeyi: Cerrahi örtünün yüze kapanmasını tolere edememe öyküsü.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit düzeyi).',
      'Koagülasyon Parametreleri: PT, aPTT, INR.',
      'Açlık Kan Şekeri ve Temel Biyokimya (Böbrek ve karaciğer fonksiyonları).',
      '12 Derivasyonlu EKG (Aritmi ve iskemi taraması).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleksi ve adrenalin kaynaklı taşiaritmi analizi), SpO2, NIBP ve Solunum Sayısı.',
      'Kan Basıncı Takibi (3-5 dakikada bir): Adrenalin enjeksiyonu ve kantal periostal diseksiyon esnasında hipertansif dalgalanmaların takibi.',
      'Sedasyon ve Solunum Takibi: Nazal kanülden CO2 örneklemesi (kapnografi) ve örtü altı oksijenizasyon izlemi.'
    ],
    vascularAccess: [
      '1 adet güvenli periferik intravenöz damar yolu (20-22G)',
      'Acil Bradikardi Kiti: İV Atropin (0.5 mg ampul)',
      'Gereğinde Hipertansiyon Yönetimi: İV Esmolol veya Labetalol'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Hafif Yükseltilmiş (15-20 Derece) ve Hareketsiz',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; baş silikon donüt yastıkla sabitlenerek yüzün hafifçe cerraha doğru paralel olması sağlanır.',
      'Kafa ve boyun venöz basıncını azaltarak cerrahi kanamayı minimize etmek için yatağın baş kısmı 15-20 derece yükseltilir (Reverse Trendelenburg eğimi).',
      'Cerrahi örtülerin yüze doğrudan temas etmemesi ve solunum alanının açık kalması için esnek L-bar köprüsü kurulur.',
      'Hastaya burun kanülü ile 2-3 L/dk O2 verilir ve örtü altına temiz hava/aspirasyon hattı yerleştirilir.'
    ],
    anesthesiaManagement: [
      'Lokal İnfiltrasyon ve Rejyonel Blok Protokolü:',
      '  - Solüsyon: Lidokain %2 + Bupivakain %0.5 (1:1 karışım) + 1:100.000 Epinefrin + Hyaluronidaz (15 IU/mL, doku difüzyonunu artırmak için).',
      '  - Enjeksiyon Alanı: Alt kapak subkutan/pretarsal doku, lateral kantus ve periost sahası (toplam 2-4 mL). Enjeksiyon öncesi kanama olmaması için negatif aspirasyon zorunludur.',
      '  - Tam vazokonstrüksiyon ve anestezi oturması için insizyondan önce EN AZ 7-10 DAKİKA BEKLENMELİDİR.',
      'Monitörize Anestezi Bakımı (MAC):',
      '  - Minimal sedasyon: Midazolam 0.5 - 1.0 mg İV + Fentanil 25 mcg İV.',
      '  - Derin sedasyondan kesinlikle kaçınılır; hasta sözel komutlara yanıt verebilmeli, derin uyku ve apneye girmemelidir.',
      'Genel Anestezi Gereken Nadir Durumlarda:',
      '  - Laringeal Maske (LMA) veya Spiral Telli Endotrakeal Tüp ile pürüzsüz uyanma sağlanır; ekstübasyonda öksürük engellenir.'
    ],
    airwayManagement: [
      'MAC yönetiminde hava yolu hastanın kendi spontan solunumudur; nazal kanül ile 2 L/dk O2 verilir.',
      'Örtü altında karbondioksit birikimini ve sıcaklık hissini önlemek için vakum hortumu ile aktif örtü altı havalandırma kurulur.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Monitörizasyon ve Başın Sabitlenmesi.',
      '2. Topikal Anestezi Damlası (Proparakain %0.5) Damlatılması ve Koruyucu Merhem Eşliğinde Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '3. Lokal Anestezik ve Epinefrin İnfiltrasyonu (Lateral kantus ve alt kapak — 7-10 dk bekleme süresi).',
      '4. Lateral Kantotomi Yapılması (15 numara bistüri veya Westcott makası ile lateral kantal tendonun kesilmesi).',
      '5. İnferior Kantolizis (Alt kapağın orbita kenarından serbestleştirilmesi).',
      '6. Lateral Tarsal Şeridin (Tarsal Strip) Hazırlanması (Ön lamel deri/orbikülaris ve konjonktiva epitelinin sıyrılarak çıplak tarsus şeridi oluşturulması).',
      '7. Kapak Boyunun Ölçülmesi ve Fazla Tarsal Dokunun Kısaltılması (Horizontal laksitenin düzeltilmesi).',
      '8. Tarsal Şeridin Orbita Lateral Tüberkülü Periostuna (Whitnall Tüberkülü) Tespiti (4-0 veya 5-0 erimeyen dikiş — Okülokardiyak refleks kontrolü!).',
      '9. Kantal Açının (Lateral Canthal Angle) Yeniden Oluşturulması ve Deri Sütürasyonu (6-0 sütürler).',
      '10. Kornea Kalkanının Nazikçe Çıkarılması, Kornea Epitel Muayenesi, Antibiyotikli Pomad ve Basısız Pansuman.'
    ],
    emergenceNotes: [
      'Lokal/MAC cerrahisinde uyanma dönemi yoktur; ameliyat bitiminde hasta sedyeye veya tekerlekli sandalyeye oturur vaziyette alınabilir.',
      'Ameliyat edilen göze baskı yapılmaz; steril gazlı bezle hafif pansuman uygulanır (görme keskinliği ve hematom kontrolü için bantlar çok sıkı olmamalıdır).',
      'Hastaya ve refakatçisine ameliyat sonrası ani gelişen şiddetli göz ağrısı veya görme kaybında acilen hekime başvurması tembihlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Ektropiyon onarımı sonrası ağrı genellikle hafif düzeydedir ve cerrahi sahada künt gerginlik/sızlama şeklindedir.',
      'Oral Parasetamol (500-1000 mg) ilk 24-48 saatte tamamen yeterlidir.',
      'Trombosit fonksiyonlarını baskılayarak hematom riskini artırabilecek aspirin veya agresif NSAİİ kullanımından ilk günlerde kaçınılmalıdır.',
      'İlk 24-48 saat cerrahi sahaya aralıklı soğuk jel kompres uygulanması ödemi ve hematom riskini belirgin şekilde azaltır.'
    ],
    prospectRecommendations: [
      'PROSPECT Oküloplastik Cerrahi Rehberleri:',
      'Preoperatif ve intraoperatif lokal infiltrasyon + sinir bloğunun postoperatif analjezik gereksinimini sıfıra indirdiği;',
      'Opioid kullanımından kaçınılarak PONV (bulantı/kusma) ve buna bağlı venöz basınç artışının engellenmesi tavsiye edilir.'
    ],
    erasRecommendations: [
      'ERAS Göz ve Oküloplastik Cerrahi Protokolleri:',
      'Günübirlik cerrahi (Day-case surgery): Hasta operasyondan 30-45 dakika sonra oral alıma başlayabilir ve aynı gün güvenle taburcu edilir.',
      'Postoperatif Baş Pozisyonu: İlk gece başın 2 yastıkla (30-45 derece) yükseltilmesi ödem ve kanama riskini önler.',
      'Gözü Ovuşturma Yasağı: Yeni atılan kantal dikişlerin korunması için hastanın gözünü ovuşturması kesinlikle yasaklanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Oculoplastics - Ectropion and Entropion Repair, pp. 868-874.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS): Recommendations for Day-Case Oculofacial Surgery.',
    prospectReference: 'PROSPECT Guidelines: Postoperative Pain Management in Ophthalmic and Oculoplastic Procedures.',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Oculofacial Plastic Surgery (Involutional Ectropion Management).',
      'European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS): Consensus on Lateral Tarsal Strip and Canthoplasty Techniques.',
      'Türk Oftalmoloji Derneği (TOD) Oküloplastik Cerrahi Birimi: Kapak Malpozisyonları ve Ektropiyon Tedavi Rehberi.'
    ]
  }
};
