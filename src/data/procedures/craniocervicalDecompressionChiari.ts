import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyoservikal Dekompresyon: Chiari Malformasyonu Cerrahisi (Foramen Magnum Dekompresyonu ve Duraplasti)
 * (Craniocervical Decompression for Chiari Malformation: Suboccipital Craniectomy, C1 Laminectomy & Duraplasty)
 *
 * Jaffe (6th ed., 2020), PROSPECT Craniotomy Guidelines (Mestdagh et al., EJA 2023),
 * 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020),
 * ASA POVL Practice Advisory, FDA/EMA Pediatrik & OSA Tramadol Güvenlik Uyarısı
 * ve AANS/CNS kılavuzları referans alınarak yapılandırılmıştır.
 */
export const craniocervicalDecompressionChiari: ProcedureDefinition = {
  id: 'craniocervical-decompression-chiari',
  name: 'Kraniyoservikal Dekompresyon: Chiari Malformasyonu Cerrahisi (Foramen Magnum Dekompresyonu ve Duraplasti)',
  shortCode: 'CHİARİ-DEKOMPRESYON',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kraniyoservikal Bileşke & Pediatrik Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Serebellar tonsillerin foramen magnumdan aşağıya, servikal spinal kanal içine herniye olması (Chiari Tip I malformasyonu) veya beyin sapı/vermisin servikal kanala deplasmanı (Chiari Tip II / Arnold-Chiari) sonucu oluşan beyin sapı kompresyonu ve kraniyoservikal BOS akım obstrüksiyonunu tedavi etmek amacıyla; orta hat suboksipital kraniektomi, C1 arka arkus laminektomisi (gerekirse C2 laminektomisi), Y-şekilli dural açılış, ektopik tonsillerin bipolar küçültülmesi (tonsiller redüksiyon) ve genişletici yama ile su sızdırmaz duraplasti (perikranium, fasya lata veya sığır perikardı) yapılması ameliyatıdır. Eşlik eden siringomiyelinin (servikal kord kisti) gerilemesini ve nörolojik restorasyonu sağlar.',
  indications: [
    'Semptomatik Chiari Tip I Malformasyonu: Foramen magnumdan > 5 mm aşağıya sarkan serebellar tonsiller ve öksürme, hapşırma, ıkınma (Valsalva) ile tetiklenen şiddetli suboksipital baş-ense ağrısı',
    'Servikal Siringomiyeli / Siringobulbi Birlikteliği: Kord içerisinde kistik kavite (syrinx) gelişen, üst ekstremitelerde pelerin tarzı ağrı ve ısı duyusu kaybı (dissosifiye duyu kusuru) ve el kaslarında atrofi gösteren olgular',
    'Beyin Sapı ve Alt Kranyal Sinir Kompresyonu: Disfaji (yutma güçlüğü), vokal kord paralizisi, öğürme (gag) refleksi kaybı, santral uyku apnesi, ataksi ve vertikal nistagmus',
    'İlerleyici Miyelopati ve Skolyoz: Spastisite, hiperrefleksi, Babinski pozitifliği veya özellikle çocuklarda Chiari/siringomiyeli zemininde hızla ilerleyen torakolomber skolyoz',
    'Chiari Tip II (Arnold-Chiari Malformasyonu): Miyelomeningoselli yenidoğan/süt çocuklarında hayatı tehdit edici stridor, apne nöbetleri ve aspirasyon ataklarının acil dekompresyonu'
  ],
  averageDuration: '2.5 - 4.5 saat (Anestezi indüksiyonu, nötral servikal korumalı entübasyon, İONM [tcMEP/SSEP/BAEP] elektrot kurulumu, Prone pozisyona çevirme ve Mayfield/jel başlık tespiti: 50-70 dk; Orta hat suboksipital insizyon, suboksipital paraspinal kas diseksiyonu, kraniektomi ve C1 laminektomi: 45-60 dk; Dural açılış, araknoid serbestleştirme, Magendie forameni açılışı ve tonsiller redüksiyon: 45-60 dk; Su sızdırmaz genişletici duraplasti yamasının dikilmesi, Valsalva testi ve kas/cilt tabakalı kapanışı: 40-55 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '150 - 450 mL (Standart foramen magnum dekompresyonunda kanama genellikle orta düzeydedir; ancak suboksipital derin venöz pleksus kanamaları, dural marjinal sinüs yırtıkları veya pediatrik olgularda kan kaybı 600 - 1000 mL seviyesine ulaşabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Suboksipital Venöz Pleksus ve Sinüs Komşuluğu',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalı, T&S doğrulanmalıdır; pediatrik olgularda 1 Ünite taze kan hazır tutulmalıdır',
    transfusionProbability: '%10 - %25 (Pediatrik Chiari olgularında ve siringomiyelili revizyonlarda %20-35)',
    criticalBleedingSources: [
      'Suboksipital Venöz Pleksus ve Posterior Atlanto-Oksipital Membran Komşuluğu: C1 posterior arkus diseksiyonunda yoğun venöz sızıntı',
      'Dural Marjinal Sinüs ve Oksipital Sinüs: Foramen magnum kenarında dura açılırken yüksek debili venöz kanama ve Venöz Hava Embolisi (VAE) riski',
      'A. Vertebralis V3 Segmenti: C1 lateral mass diseksiyonunda arterin aşırı lateral manipülasyonla laserasyonu (katastrofik arteriyel kanama)',
      'Suboksipital Kas Diseksiyon Kenarları ve Oksipital Kemik Diploik Emissary Venleri'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal hassas koagülasyon',
      'Kemik diploik kanamalarında steril kemik mumu (Bone Wax) basılması',
      'Venöz pleksus sızıntılarında Surgicel, Gelfoam trombin matriksi veya FloSeal uygulaması',
      'C1 laminektomi esnasında diseksiyonun kesinlikle orta hatta (kemik orta 1.5 cm) tutulması; lateraldeki vertebral arterlere yaklaşılmaması',
      'Duraplasti hattında tam su sızdırmazlık sağlamak için Tisseel / Beriplast fibrin yapıştırıcı matriks'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI]): tcMEP/SSEP monitörizasyonunu korumak, PONV riskini düşürmek ve pürüzsüz uyanma sağlamak için altın standarttır',
      'KAS GEVŞETİCİSİZ İDAME ŞARTTIR: İntraoperatif nöromonitörizasyon (tcMEP, SSEP, BAEP ve alt kranyal sinir EMG) nedeniyle entübasyon sonrasında kas gevşetici KESİNLİKLE tekrarlanmaz; N₂O KESİNLİKLE KONTRENDİKEDİR!'
    ],
    alternative: [
      'TIVA + Çok Düşük Doz Sevofluran (< 0.3 - 0.4 MAC): Yalnızca tcMEP/SSEP sinyallerini baskılamayacak mikro düzeyde (ancak saf TIVA üstündür)'
    ],
    clinicalRationale: 'Beyin sapı ve servikomedüller bileşke dekompresyonunda tcMEP, SSEP ve alt kranyal sinir EMG kayıtlarını korumak ve arka çukur PONV riskini düşürmek için entübasyon sonrası kas gevşeticisiz Propofol + Remifentanil TIVA altın standarttır; VAE ve pnömosefali riski nedeniyle N₂O kesin kontrendikedir. Miyelopati/siringomiyeli/Chiari II olgularında Süksinilkolin kesin yasaktır; boyun manipülasyonundan kaçınarak nötral hatta videolaringoskop/AFOI ile zırhlı spiral (gerekirse zırhlı EMG) ETT yerleştirilir.',
    notes: 'CHİARİ DEKOMPRESYONUNDA TEMEL ANESTEZİ İLKELERİ: (1) Nötral servikal hava yolu ve miyelopati/siringomiyeli/Chiari II\'de Süksinilkolin kesin kontrendikasyonu; (2) Kas gevşeticisiz TIVA, çene-sternum ≥ 2 parmak ve prone PION/POVL koruması; (3) N₂O yasağı ve tam VAE acil tedavi algoritması; (4) Chiari II / miyelomeningoselde zorunlu Lateks-Free ameliyathane protokolü; (5) Santral apnede aşırı opioid hassasiyeti, pediatrik/OSA Tramadol FDA/EMA Black Box yasağı ve taze arka çukurda IV Deksketoprofen yasağı.',
    rulesTitle: 'CHİARİ DEKOMPRESYONUNDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'SERVİKAL NÖTRAL ENTÜBASYON VE SÜKSİNİLKOLİN KESİN KONTRENDİKASYONU',
        content: 'Entübasyonda başa aşırı fleksiyon/ekstansiyon verilmesi tonsilleri sıkıştırıp akut solunum arresti ve kuadripleji yaratır (videolaringoskop veya AFOI ile nötral hat korunur). Miyelopati, siringomiyeli veya Chiari II miyelomeningosel olgularında üst/alt motor nöron denervasyonuna bağlı ölümcül hiperkalemik kardiyak arrest riski nedeniyle SÜKSİNİLKOLİN KESİNLİKLE KONTRENDİKEDİR!'
      },
      {
        number: 2,
        title: 'PRONE POZİSYONDA ÇENE-GÖĞÜS MESAFESİ, İONM VE PION / POVL RİSKİ',
        content: 'Baş fleksiyona alınırken çene-sternum arasında EN AZ 2 PARMAK MESAFE korunmalıdır (juguler tıkanma = serebellar venöz enfarkt). Prone pozisyonda Mayfield çivili başlıkta göze dış bası olmasa dahi artmış venöz basınç, hipotansiyon ve anemi zemininde Posterior İskemik Optik Nöropati (PION/POVL) gelişebilir! İONM için NMB\'siz TIVA ve kantitatif TOFR ≥ 0.90 doğrulanır.'
      },
      {
        number: 3,
        title: 'N₂O YASAĞI VE VENÖZ HAVA EMBOLİSİ (VAE) ACİL MÜDAHALE ALGORİTMASI',
        content: 'Prone pozisyonda dural marjinal/oksipital sinüslerden VAE riski yüksektir; N₂O KESİNLİKLE KONTRENDİKEDİR! VAE şüphesinde: Cerrahı uyar, sahayı steril SF ile doldur + kemik mumu bas, %100 O₂ ver, baş elevasyonunu düşür (mümkünse sol lateral/Durant), CVC varsa hava aspire et, vazopressör başla, juguler bası yalnızca cerrah kontrolünde.'
      },
      {
        number: 4,
        title: 'CHİARİ II / MİYELOMENİNGOSELDE ZORUNLU LATEKS-FREE AMELİYATHANE PROTOKOLÜ',
        content: 'Miyelomeningoselli (Chiari II) hastalarda tekrarlayan girişimlere bağlı hayatı tehdit edici lateks anaflaksisi insidansı çok yüksektir (%30-60). Bu hastalar günün ilk vakası olarak planlanmalı; eldiven, kateter, Foley, IV setler ve solunum devreleri dahil %100 LATEKS-FREE ameliyathane ortamı zorunlu tutulmalıdır!'
      },
      {
        number: 5,
        title: 'SANTRAL APNE / AŞIRI OPİOİD HASSASİYETİ VE TRAMADOL / DEKSKETOPROFEN YASAĞI',
        content: 'Beyin sapı kompresyonu ve santral uyku apnesi olan Chiari hastaları opioidlere AŞIRI HASSASTIR (minimal opioid + sürekli pulse oksimetri/kapnografi!). Pediatrik ve uyku apneli hastalarda TRAMADOL FDA/EMA KARA KUTU (BLACK BOX) KONTRENDİKASYONUDUR; taze arka çukur duraplastide rutin IV Deksketoprofen ölümcül hematom riski nedeniyle ve pediatrik onaysızlığı sebebiyle KULLANILMAZ!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Nöroradyoloji Konsültasyonu: Servikal ve Kranial Sagittal MRG; tonsiller herniasyon mesafesi (mm), siringomiyelinin boyutu/uzanımı, retrofleks odontoid, baziller invajinasyon ve atlantoaksiyel instabilite (C1-C2 açıları) incelenmelidir.',
      'Göğüs Hastalıkları / Uyku Laboratuvarı: Polisomnografi bulguları; santral veya obstrüktif uyku apnesi, desatürasyon indeksleri ve hipoventilasyon skoru taranmalıdır (aşırı opioid hassasiyeti ve postop yoğun bakım gereksinimini belirler!).',
      'KBB Konsültasyonu: Preoperatif vokal kord muayenesi (stridor veya tek taraflı vokal kord paralizisi varlığı postoperatif solunum yetmezliği riskini belirler).',
      'Pediatri Konsültasyonu ve Lateks-Free Planlama (Chiari II Olgularında): Eşlik eden hidrosefali, fonksiyonel şant varlığı, miyelomeningosel defekti ve ZORUNLU LATEKS-FREE ameliyathane hazırlığı.'
    ],
    historyAndPhysical: [
      'Valsalva Başağrısı ve Ense Ağrısı: Öksürmek, gülmek, ıkınmak veya başı öne eğmekle şimşek çakar tarzda ense-oksipital ağrı öyküsü.',
      'Bulbar ve Kranyal Sinir Muayenesi: Disfaji, sıvı içerken burundan gelme veya öksürük krizi, dilde atrofi/fasikülasyon (CN XII), öğürme refleksi (CN IX/X) ve ses kısıklığı.',
      'Üst ve Alt Ekstremite Nörolojisi: Miyelopati, spastisite, el kaslarında atrofi, ağrı-ısı duyusu kaybı (siringomiyeli) ve motor nöron denervasyon bulguları (Süksinilkolin kesin yasağı!).',
      'Zor Hava Yolu Taraması: Kısa boyun, kısıtlı boyun hareketleri (Klippel-Feil sendromu birlikteliği) ve retrognati.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve 2 Ünite ES Cross-Match doğrulaması (pediatrikte 1 Ünite taze ES).',
      'Tam Kan Sayımı, Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen), Kan Glukozu ve Serum Elektrolitleri.',
      'Arteriyel Kan Gazı (kronik hipoventilasyonu/santral apnesi olan Chiari olgularında bazal PaCO2 ve bikarbonat düzeyi).',
      'Dinamik Servikal Fleksiyon-Ekstansiyon Grafileri (atlantoaksiyel instabiliteyi ekarte etmek için).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu) Seviyesinde Sıfırlanmış: İndüksiyon öncesi takılmalıdır. Prone pozisyonda doğru CPP takibi, tansiyon düşüşlerinin ve beyin sapı manipülasyonuna bağlı ani bradikardi/hipertansiyon ataklarının saniyelik yakalanması için zorunludur.',
      'İntraoperatif Nöromonitörizasyon (İONM): Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP) ve Beyin Sapı İşitsel Uyarılmış Potansiyelleri (BAEP). Pozisyonlama öncesinde ve prone çevirme sonrasında bazal sinyaller doğrulanmalıdır!',
      'Alt Kranyal Sinir EMG Monitörizasyonu: Zırhlı/telli (armored/reinforced) vokal kord EMG elektrotlu tüp (CN X), dil elektrotları (CN XII) ve trapez kası elektrotları (CN XI).',
      'Sürekli End-Tidal CO2 (EtCO2) ve Prekordiyal Doppler: Prone pozisyonda venöz hava embolisinin (VAE) anlık takibi.',
      'Kantitatif Nöromusküler İleti İzlemi (TOF - Train-of-Four): İONM kayıtları başlamadan önce ve ekstübasyon öncesi nöromusküler bloğun tamamen çözüldüğünü doğrulamak için kantitatif TOF oranı (TOFR) ≥ 0.90 teyit edilmelidir.',
      'Sürekli Isı Takibi (Normotermi 36.0 - 37.0°C) ve Seri Kan Glukozu Takibi (hedef 140 - 180 mg/dL).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz yol (14G veya 16G; pediatrikte yaşa uygun çift güvenli IV yol)',
      'Pediatrik olgularda kan ve sıvı ısıtıcı hatlar, hassas infüzyon pompaları',
      'Santral Venöz Kateter (CVC): Ciddi bulbar tutulumu olan veya yüksek hava embolisi riski taşıyan olgularda'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon, Baş Mayfield 3-Noktalı Çivili Başlık (3-4 Yaş Altı Pediatrikte Jel At Nalı Başlık) ile Hafif Fleksiyonda Sabitlenmiş',
    patientPositionDetails: [
      'Pediatrik Olgularda Kafa Tespiti: 3-4 yaşından küçük veya kafatası ince çocuklarda çivili başlık yerine jel at nalı (horseshoe) başlık kullanılır (çivinin kafatasını delme riski!).',
      'Çene-Sternum Güvenlik Aralığı: Kraniyoservikal bileşkeyi açmak için başa hafif apeks fleksiyonu verilir; ancak çene ile göğüs kemiği arasında MUTLAKA EN AZ 2 PARMAK MESAFE bırakılmalıdır. Aşırı fleksiyon internal juguler venleri sıkıştırarak masif serebellar venöz göllenmeye ve dural açılışta beyin fıtıklaşmasına yol açar!',
      'Karın Serbestliği: Göğüs ve pelvis altına yerleştirilen silikon rulolarla batın tamamen boşta bırakılır (vena cava inferior basısını ve epidural venöz kanamayı önlemek için).',
      'PION / POVL (POSTOPERATİF GÖRME KAYBI) GÜVENLİĞİ: Göz kürelerine doğrudan temas/dış bası olmaması (CRAO önlemi) şarttır; ancak Mayfield çivili başlıkta gözlere dış bası olmasa dahi prone pozisyonda artmış oküler venöz basınç, uzamış süre, hipotansiyon ve anemi zemininde Posterior İskemik Optik Nöropati (PION / POVL) gelişebilir! Bu nedenle hafif baş elevasyonu, normotansiyon, normovolemi ve yeterli hemoglobin korunmalıdır.',
      'Brakial pleksus gerilmesini önlemek için kollar gövde yanına anatomik pozisyonda sabitlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2 - 2.5 mg/kg) + Fentanil (1.5 - 2 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 mg/kg). Entübasyonda servikal omurganın aşırı fleksiyon ve ekstansiyonundan kesinlikle kaçınılır.',
      'SÜKSİNİLKOLİN KESİN KONTRENDİKASYONU: Miyelopati, siringomiyeli veya Chiari II miyelomeningosel olgularında üst/alt motor nöron denervasyonuna sekonder ölümcül hiperkalemik kardiyak arrest riski nedeniyle Süksinilkolin ASLA KULLANILMAZ!',
      'İdame: TIVA Protokolü (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.25 mcg/kg/dk TCI; BIS 40 - 50). İONM tcMEP/SSEP ve EMG kayıtları için indüksiyon sonrası kas gevşetici tekrarlanmaz ve kantitatif TOFR ≥ 0.90 doğrulanır.',
      'Azot Protoksit (N₂O) KESİNLİKLE KONTRENDİKEDİR: Venöz hava embolisi (VAE) hacmini büyütür, pnömosefaliye yol açar, SSEP/MEP dalgalarını ve PONV\'u bozar.',
      'LATEKS-FREE OR PROTOKOLÜ (Chiari II / Miyelomeningosel): Tüm eldivenler, kateterler, IV setler ve hava yolu ekipmanı %100 lateks içermeyen malzemelerden hazırlanır.',
      'Sıvı ve Glukoz Yönetimi:',
      '  - Erişkinlerde izotonik dengeli kristalloid (Plasmalyte/Isolyte-S) veya %0.9 NaCl kullanılır; hipotonik ve dekstrozlu sıvılar yasaktır.',
      '  - Pediatrik olgularda izotonik dengeli kristalloid temel sıvıdır (hipotonik sıvılar kesinlikle kontrendikedir); YALNIZCA yenidoğan ve süt çocuklarında hipoglisemiyi önlemek için kan şekeri izlemiyle %1 - 2 dekstroz içeren izotonik dengeli sıvı uygulanır.',
      '  - Glisemik Hedef: 140 - 180 mg/dL (pediatrikte hipoglisemi < 70 mg/dL ve hiperglisemi > 180 mg/dL\'den kaçınılır).',
      'Beyin Sapı ve Vagal Otonomik Krizlerin Yönetimi: Tonsiller serbestleştirilirken veya obex manipüle edilirken ani bradikardi, asistoli veya hipertansiyon gelişirse ANINDA cerraha manipülasyonu durdurması söylenir; yanıt vermezse IV Atropin (0.5 - 1.0 mg erişkin; 0.02 mg/kg pediatrik) uygulanır.',
      'Venöz Hava Embolisi (VAE) Acil Müdahale Algoritması:',
      '  1. Cerrahı derhal uyar: Cerrahi sahayı steril %0.9 NaCl (SF) ile doldur, kemik mumu ve ıslak gaz bas.',
      '  2. Solunum gazı: %100 O₂ ventilasyona geç (N₂O kapalı/kontrendike).',
      '  3. Pozisyon: Baş elevasyonunu azalt; hemodinamik kollapsta cerrahi kapatma sonrası mümkünse sol lateral/Durant pozisyonuna al.',
      '  4. CVC Aspirasyonu: SVC-sağ atriyumda kateter varsa hava aspire et.',
      '  5. Hemodinamik Destek: Sıvı bolusu + vazopressör (Noradrenalin / Efedrin / Adrenalin).',
      '  6. Juguler Kompresyon: Yalnızca cerrahın doğrudan kontrolü altında, nazikçe ve kısa süreli uygulanır.',
      'Ventilasyon Yönetimi: Normokapni (PaCO2 35 - 38 mmHg) hedeflenir; aşırı hiperventilasyondan (< 30 mmHg) kaçınılır.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) Endotrakeal Tüp prone pozisyon ve boyun fleksiyonu nedeniyle standarttır.',
      'NIM EMG Tüpü vs Spiral ETT Kuralı: Alt kranyal sinir (CN X vokal kord) EMG monitörizasyonu gereken prone Chiari olgularında standart plastik NIM tüpü boyun fleksiyonunda katlanabileceğinden ZIRHLI/TELLİ (Armored / Reinforced) EMG Endotrakeal Tüp (veya spiral ETT üzerine yapıştırılan yüzey EMG elektrodu) tercih edilmelidir!',
      'Videolaringoskop (McGrath / Glidescope) veya Uyanık Fiberoptik (AFOI): Boyunda manipülasyondan kaçınarak nötral hatta atravmatik entübasyon.',
      'Prone pozisyonda yüz ve dilde venöz ödem gelişebileceğinden tüp tespit bağları dili sıkıştırmayacak şekilde kontrol edilir; kaf basıncı 20 - 25 cmH2O aralığında tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Prone Çevirme ve Kafa Tespiti: İONM (tcMEP/SSEP/BAEP) bazal sinyallerinin doğrulanması, çene-sternum ≥ 2 parmak mesafesi ve göz/PION kontrolü.',
      '2. Suboksipital Kraniektomi ve Foramen Magnum Riminin Alınması: Kemik kenarlarından diploik kanamaların kemik mumu ile durdurulması; VAE izlemi.',
      '3. C1 Posterior Arkus Laminektomisi: Diseksiyonun orta hatta tutulması; lateraldeki vertebral arterlerin korunması.',
      '4. Y-Şekilli Dural Açılış: Dural marjinal sinüs kanamalarının koagüle edilmesi; araknoid zarın korunarak BOS pulzasyonunun görülmesi.',
      '5. Ektopik Tonsillerin Bipolar Küçültülmesi (Tonsiller Redüksiyon): Magendie forameninin açılması, 4. ventrikül çıkışının serbestleştirilmesi; beyin sapı kardiyak reflekslerinin izlemi.',
      '6. Genişletici Duraplasti Dikilmesi ve Valsalva Manevrası: Yama dikildikten sonra su sızdırmazlığı (water-tight) test etmek için anestezi ekibi 25-30 cmH2O hava yolu basıncını 5-10 saniye tutar; BOS sızıntısı olmadığı teyit edilir.'
    ],
    emergenceNotes: [
      'ÖKSÜRMESİZ VE IKINMASIZ PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE): Ekstübasyon anında öksürme ve ıkınma arka çukur venöz basıncını fırlatarak duraplasti yamasını patlatır ve masif psödomeningosel / BOS fistülü ya da arka çukur hematomuna yol açar; düşük doz Remifentanil veya IV Lidokain (1.5 mg/kg) ile öksürük refleksi baskılanır, TOFR ≥ 0.90 doğrulanır.',
      'SANTRAL SOLUNUM DEPRESYONU VE AŞIRI OPİOİD HASSASİYETİ: Beyin sapı kompresyonu ve santral uyku apnesi olan Chiari hastalarında medüller solunum merkezinin CO2 yanıtı körelmiş olup opioidlere AŞIRI HASSASİYET mevcuttur! Uzun etkili/yüksek doz opioidlerden kaçınılmalı; hasta tam uyanık, solunum eforu güçlü, tidal volümleri yeterli ve dört ekstremitesini hareket ettirmeden ASLA ekstübe edilmemelidir!',
      'Alt Kranyal Sinir Muayenesi: Ekstübasyon öncesi öğürme (gag) refleksi, vokal kord hareketleri ve spontan yutkunma değerlendirilir; bulbar disfonksiyonu devam eden olgularda entübe olarak Yoğun Bakıma transfer planlanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Suboksipital Paraspinal Kas Spazmı ve Ense Ağrısı Protokolü:',
      '  - Cerrahi Başlangıcında veya Kapanışta Suboksipital Kas ve Fasyaya Lokal İnfiltrasyon (%0.25 Bupivakain veya %0.2-0.5 Ropivakain; pediatrik toksik doz ≤ 2-2.5 mg/kg aşılmadan): Ense kası spazmını ve opiat ihtiyacını dramatik azaltır (PROSPECT 2023).',
      '  - Düzenli IV Parasetamol (10-15 mg/kg pediatrik, 1000 mg erişkin 6 saatte bir düzenli infüzyon).',
      '  - Kurtarma Opiyatı: Aşırı opioid hassasiyeti gözetilerek yalnızca sürekli pulse oksimetri ve kapnografi altında çok düşük doz titre edilen IV Fentanil (0.25-0.5 mcg/kg pediatrik; 25 mcg erişkin).',
      '  - KESİN KONTRENDİKASYONLAR: TRAMADOL, pediatrik hastalarda (< 12 yaş ve OSA/uyku apneli < 18 yaş adölesanlarda) FDA/EMA KARA KUTU (BLACK BOX) KONTRENDİKASYONU taşıdığından ve santral apneli erişkinlerde de ölümcül solunum depresyonu/PONV yarattığından KESİNLİKLE KULLANILMAZ! Rutin IV DEKSKETOPROFEN (non-selektif NSAİİ) ise taze arka çukur duraplastisi sonrası ölümcül hematom riski ve pediatrik onaysızlığı nedeniyle KULLANILMAZ!'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi (2023) kılavuzuna göre suboksipital paraspinal kas lokal infiltrasyonu ve düzenli IV Parasetamol solunum depresyonu yaratmadan optimal analjezi sağlar; arka çukur kanama ve santral apne riskleri nedeniyle Deksketoprofen ve Tramadolden kesinlikle kaçınılır.'
    ],
    erasRecommendations: [
      '4. Konsensus PONV (2020) ve Kraniyoservikal Postoperatif Bakım Protokolleri:',
      '  - BOS Fistülü ve Psödomeningosel Önlemi: Yatak başı sürekli 30° elevasyonda tutulmalı; postoperatif ıkınma, öksürme ve boynun aşırı fleksiyonu engellenmeli, laksatif tedavisi başlanmalıdır.',
      '  - Santral Apne ve Aşırı Opioid Hassasiyeti Monitörizasyonu: Hastalar postoperatif ilk 24 saat Nöro-Yoğun Bakım veya Yakın Takip Ünitesinde sürekli pulse oksimetre ve kapnografi (EtCO2) ile izlenmelidir.',
      '  - Agresif Çoklu PONV Profilaksisi: Arka çukur cerrahisinde kusma duraplasti dikişlerini patlatabileceğinden TIVA + Deksametazon (0.15 mg/kg pediatrik / 4-8 mg erişkin) + Ondansetron (0.1-0.15 mg/kg pediatrik / 4 mg erişkin) ± erişkinde Aprepitant uygulanır.',
      '  - Glisemik Hedef ve Lateks-Free Bakım: Kan glukozu 140 - 180 mg/dL aralığında tutulur; Chiari II / miyelomeningosel olgularında servis/YBÜ boyunca Lateks-Free protokol sürdürülür.',
      '  - Oral Beslenme Öncesi Gag Testi: Yutma ve öğürme fonksiyonları hekim tarafından bizzat test edilmeden oral katı/sıvı verilmemelidir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Craniocervical Decompression. Philadelphia: Wolters Kluwer.',
    erasReference: 'Gan, T. J., Belani, K. G., Bergese, S., et al. (2020). Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesthesia & Analgesia, 131(2), 411-448.',
    prospectReference: 'Mestdagh, F., Lavand\'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Tubbs, R. S., Beckman, J., Naftel, R. P., et al. (2011). Institutional experience with 500 cases of surgically treated pediatric Chiari malformation Type I. Journal of Neurosurgery: Pediatrics, 7(3), 248-256.',
      'Arnautovic, A., Splavski, B., Boop, F. A., & Arnautovic, K. I. (2015). Pediatric and adult Chiari malformation Type I surgical series 1965-2013: a review of demographics, operative treatment, and outcomes. Journal of Neurosurgery: Pediatrics, 15(2), 161-177.',
      'American Society of Anesthesiologists Task Force on Perioperative Visual Loss. (2019). Practice Advisory for Perioperative Visual Loss Associated with Spine Surgery 2019. Anesthesiology, 130(1), 12-30.',
      'U.S. Food and Drug Administration (FDA). (2017). FDA Drug Safety Communication: Restricting use of prescription codeine pain and cough medicines and tramadol pain medicines in children and adolescents with OSA/sleep apnea.'
    ]
  }
};
