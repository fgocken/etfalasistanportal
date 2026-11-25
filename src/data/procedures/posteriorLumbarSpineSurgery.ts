import { ProcedureDefinition } from '../../types/procedures';

/**
 * Posterior Lomber Dekompresyon Cerrahisi: Mikrodiskektomi, Laminektomi ve Foraminotomi (Enstrümantasyonsuz, L1-S1)
 * (Posterior Lumbar Decompression Surgery: Microdiscectomy, Laminectomy, and Foraminotomy — Non-Instrumented)
 *
 * Jaffe (6th ed., 2020), ERAS® Society Spine Consensus (Debono et al., Spine J 2021),
 * PROSPECT Spine Guidelines (Waelkens et al., Eur J Anaesthesiol 2021),
 * ASA POVL Practice Advisory (Anesthesiology 2019) ve AABB 2023 kılavuzları
 * referans alınarak yapılandırılmıştır.
 */
export const posteriorLumbarSpineSurgery: ProcedureDefinition = {
  id: 'posterior-lumbar-spine-surgery',
  name: 'Posterior Lomber Dekompresyon Cerrahisi: Mikrodiskektomi, Laminektomi ve Foraminotomi (Enstrümantasyonsuz, L1-S1)',
  shortCode: 'LOMBER-POST',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Lomber ve lumbosakral omurgada (L1-S1 seviyeleri) instabilite veya füzyon gereksinimi olmaksızın uygulanan enstrümantasyonsuz posterior nöral dekompresyon ameliyatlarını (mikrodiskektomi, hemilaminektomi, laminektomi ve foraminotomi) kapsar. Mikroskop veya tübüler ekartör eşliğinde paraspinal kaslar sınırlı olarak sıyrılır; hipertrofik ligamentum flavum ve kemik lamina kenarı çıkarılarak dural kese ve sıkışmış sinir kökü serbestleştirilir, fıtıklaşmış nükleus pulposus eksize edilir. Çok seviyeli pedikül vidalama, TLIF/PLIF veya deformite osteotomisi gerektiren enstrümente füzyon prosedürlerinden farklı olarak cerrahi süre daha kısa, kan kaybı belirgin ölçüde düşüktür ve çoğu hasta aynı gün veya ertesi gün mobilize edilerek taburcu edilebilir.',
  indications: [
    'Lomber Disk Hernisi (Bel Fıtığı): Konservatif tedaviye dirençli şiddetli L1-S1 radikülopati, siyatalji veya ilerleyici motor defisit (düşük ayak, kuadriseps zaafiyeti) için mikrodiskektomi',
    'İnstabilitesiz Lomber Spinal Stenoz (Kanal Darlığı): Nörojenik kladikasyon ve yürüme mesafesinde kısalma yaratan santral veya lateral reses darlıklarında laminektomi / bilateral dekompresyon',
    'Lomber Foraminal Stenoz ve Sinir Kökü Sıkışması: İzole kök basısı yaratan osteofit veya faset hipertrofisinde foraminotomi',
    'Kauda Ekuina Sendromu (Acil Dekompresyon): Masif santral disk hernisine bağlı bilateral siyatik, eyer tarzı anestezi ve akut mesane/bağırsak disfonksiyonu',
    'Nüks Lomber Disk Hernisi (Enstrümantasyon Gerektirmeyen): Seçilmiş olgularda revizyon mikrodiskektomi (epidural skar nedeniyle yüksek insidental durotomi riski)'
  ],
  averageDuration: '1.0 - 2.5 saat (Tek seviye mikrodiskektomi / tübüler dekompresyon: 60 - 90 dk; 2-3 seviye laminektomi ve foraminotomi: 90 - 150 dk; Revizyon dekompresyon: 120 - 180 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '50 - 250 mL (Tek seviye mikrodiskektomide 30 - 100 mL; çok seviyeli laminektomi veya revizyon dekompresyonda 150 - 300 mL)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük - Orta Düzey Risk (Rutin Kanama Az; Nadir Ancak Katastrofik Anterior Büyük Damar Yaralanması Riski)',
    crossMatchRequirement: 'Rutin kan grubu ve antikor taraması (Type & Screen - T&S) yeterlidir; rutin ES cross-match, CVC, Belmont veya Cell Saver gerekmez (çok seviyeli revizyon, preoperatif anemi veya koagülopati hariç)',
    transfusionProbability: '< %2 - %5',
    criticalBleedingSources: [
      'Epidural Venöz Pleksus (Batson pleksusu — prone pozisyonda karın sıkışırsa cerrahi görüşü bozan venöz sızıntı artar)',
      'Sınırlı Paraspinal Kas ve Laminotomi Kemik Kenarı Kanamaları',
      'NADİR ANCAK KATASTROFİK KOMPLİKASYON (%0.01-0.05): Diskektomi sırasında pituitary rongeur veya küretin anterior anulus fibrozusu delerek Abdominal Aort, Vena Cava Inferior veya Ana İliak Damarları yırtması (prone pozisyonda cerrahi sahada kanama görünmeyebilir — sessiz retroperitoneal hemoraji!)'
    ],
    hemostasisStrategies: [
      'Prone pozisyonda Jackson omurga masasında karın boşluğunun tamamen serbest bırakılması (VCI kompresyonu ve Batson pleksus venöz göllenmesinin önlenmesi)',
      'Epidural venöz sızıntılarda bipolar mikrokoterizasyon, jelatin sünger (Gelfoam), Surgicel ve trombinli hemostatik matriks',
      'Laminotomi kemik kenarlarında steril kemik mumu',
      'Traneksamik Asit (TXA): Rutin tek seviye mikrodiskektomide gerekmez; yalnızca çok seviyeli (≥ 3 seviye) veya yüksek kanamalı revizyon laminektomilerde opsiyonel olarak güvenli dozda (10-15 mg/kg [veya 1 g] yükleme + 1-2 mg/kg/saat infüzyon) düşünülebilir. UYARI: Nöbet öyküsü, aktif VTE varlığında kullanılmaz; renal yetmezlikte doz azaltılır; insidental durotomi/BOS temasında nöbet riski göz önünde bulundurulur',
      'Nüanslı Transfüzyon Eşiği (ASA POVL 2019 / AABB 2023): Rutin transfüzyon beklenmez; ciddi kanama gelişirse stabil hastada Hb 7-8 g/dL, aktif iskemi veya masif hemorajide Hb 8-9 g/dL hedeflenir'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (Dengeli Anestezi: Sevofluran/Desfluran + Remifentanil/Fentanil veya Propofol + Remifentanil TIVA) — Prone pozisyonda tam hava yolu güvenliği için STANDARTTIR'
    ],
    alternative: [
      'Kürarsız TIVA (Propofol + Remifentanil): Kauda ekuina, ciddi stenoz veya revizyon cerrahisi nedeniyle seçilmiş olgularda İONM/EMG kullanılıyorsa tercih edilir',
      'Spinal Anestezi (İleri Derecede Seçilmiş Olgularda): Yalnızca deneyimli merkezlerde, non-obez, tek seviye, kısa süreli (< 90 dk) mikrodiskektomilerde (prone pozisyonda acil hava yolu yönetimi zorluğu ve sedasyon riski mutlaka gözetilmelidir)'
    ],
    clinicalRationale: 'Enstrümantasyonsuz tek seviye mikrodiskektomi veya basit laminektomide rutin İONM/pedikül vida EMG\'si gerekmediğinden dengeli genel anestezi veya TIVA güvenle kullanılabilir; ancak N₂O (azot protoksit) PONV artışı, olası pnömosefali (durotomi) ve venöz hava embolisi (VAE) genişlemesi riski nedeniyle KESİNLİKLE KULLANILMAZ. Prone pozisyonda tüp bükülmesini önlemek için spiral telli (zırhlı) ETT ve güvenli tespit tercih edilir; seçilmiş vakada TcMEP/İONM kullanılırsa kürarsız TIVA ve bilateral yumuşak gazlı bez rulo molar bite block zorunludur.',
    notes: 'POSTERİOR LOMBER DEKOMPRESYONDA TEMEL ANESTEZİ İLKELERİ: (1) Jackson Masası Tercihi (Wilson Çerçevesi PION Riski OR ~4.3!), Serbest Batın ve ASA POVL 2019; (2) Diskektomi Sırasında Sessiz Retroperitoneal Büyük Damar Yaralanması -> Hızlı Kapatma ve DERHAL SUPİN LAPAROTOMİ; (3) Normotansiyon (MAP ≥ 75-80 mmHg, Permisif Hipotansiyon YASAK), N₂O Yasağı ve VAE Farkındalığı; (4) İnsidental Durotomi, Öksürmesiz Pürüzsüz Uyanma ve Acil Kauda Ekuina / Hematom Taraması; (5) PROSPECT / ERAS Multimodal Opioid-Koruyucu Analjezi ve Erken Mobilizasyon.',
    rulesTitle: 'POSTERİOR LOMBER DEKOMPRESYON CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'ASA POVL 2019, JACKSON MASASI TERCİHİ (WILSON FRAME UYARISI!) VE SERBEST BATIN',
        content: 'Jackson omurga masası, Wilson çerçevesine (Wilson frame) kesinlikle tercih edilmelidir — Wilson çerçevesi başı kalp seviyesinin altına düşürdüğü ve abdominal/venöz basıncı artırdığı için bağımsız PION risk faktörüdür (OR ~4.3) ve Batson epidural venöz kanamasını katlar! Baş nötral ve KALP SEVİYESİNDE veya HAFİF YUKARISINDA (ters Trendelenburg; ASLA baş aşağı değil!) tutulur; gözler her 15-30 dk kontrol edilir (sıfır orbital bası — CRAO önlemi). PION\'un SIFIR oküler bası altında dahi sistemik nedenlerle gelişebileceği unutulmaz; ağır kanamada kolloid + kristaloid dengesi ve nüanslı Hb eşiği (stabil 7-8 g/dL; aktif iskemi/kanama 8-9 g/dL) uygulanır.'
      },
      {
        number: 2,
        title: 'DİSKEKTOMİDE SESSİZ RETROPERİTONEAL BÜYÜK DAMAR YARALANMASI: DERHAL SUPİN FLİP!',
        content: 'Disk mesafesi kürete edilirken aletin anterior anulusu delip Aort, VCI veya Ana İliak Damarları yırtması nadir (%0.01-0.05) ancak ölümcüldür. Prone pozisyonda kan retroperitona dolduğundan CERRAHİ SAHADA KANAMA GÖRÜNMEYEBİLİR! Diskektomi esnasında ani açıklanamayan hipotansiyon, taşikardi ve EtCO₂ düşüşü alarm işaretidir: Sırt yarası hızla gazlı bezle paketlenip geçici kapatılır, hasta DERHAL SUPİN POZİSYONA ÇEVRİLİR, üst ekstremite geniş İV hatlardan masif transfüzyon başlatılır ve acil laparotomi için damar cerrahisi çağrılır!'
      },
      {
        number: 3,
        title: 'NORMOTANSİYON (MAP ≥ 75-80 mmHg), N₂O YASAĞI, VAE VE İONM VARSA YUMUŞAK BITE BLOCK',
        content: 'Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır; nöral kök ve optik sinir perfüzyonu için MAP ≥ 75-80 mmHg (veya bazalin %20 içinde) sürdürülür. N₂O (azot protoksit) durotomide pnömosefali, VAE genişlemesi ve PONV nedeniyle KESİNLİKLE KULLANILMAZ. Prone pozisyonda açık epidural venlerden Venöz Hava Embolisi (VAE: ani EtCO₂ düşüşü) akılda tutulur. Revizyon/kauda ekuina nedeniyle TcMEP/İONM kullanılırsa kürarsız TIVA + bilateral YUMUŞAK GAZLI BEZ RULO molar bite block uygulanır (sert plastik Guedel airway KULLANILMAZ!).'
      },
      {
        number: 4,
        title: 'İNSİDENTAL DUROTOMİ (BOS KAÇAĞI), PÜRÜZSÜZ UYANMA VE AKUT EPİDURAL HEMATOM',
        content: 'Özellikle kalsifiye stenoz ve revizyon cerrahisinde insidental durotomi (%5-15) görülebilir. Dural onarım sonrası uyanmada öksürük, ıkınma ve hipertansiyon tamir hattını patlatır (BOS fistülü/psödomeningosel) veya epidural hematom (akut Kauda Ekuina Sendromu) tetikler. Kapanış öncesi normotansif hemostaz kontrolü yapılmalı ve düşük doz Remifentanil veya IV Lidokain ile öksürmesiz pürüzsüz ekstübasyon sağlanmalıdır.'
      },
      {
        number: 5,
        title: 'PROSPECT / ERAS OPİOİD-KORUYUCU MULTİMODAL ANALJEZİ VE ERKEN MOBİLİZASYON',
        content: 'Yara infiltrasyonu veya USG eşliğinde bilateral TLIP / Lomber ESP bloğu, düzenli IV Parasetamol, kısa süreli NSAİİ/COX-2 inhibitörü (≤ 48-72 sa), PONV profilaksisi ve gerekirse BAZALSIZ (demand-only) kurtarma IV PCA uygulanır (opioid + benzodiazepin kombinasyonundan kaçınılır). Çoğu hasta aynı gün mobilize edilir; mesane sondası rutin gerekmez (takıldıysa postop erken çekilir).'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji / Nöroloji Taban Değerlendirmesi: L1-S1 miyotom ve dermatom haritalaması — kuadriseps (L3-L4), tibialis anterior (L4-L5), ekstansör hallusis longus (L5) ve gastroknemius (S1) kas gücü, patella/aşil refleksleri ve sfinkter tonusu.',
      'Kardiyoloji / Göğüs Hastalıkları Konsültasyonu (Yalnızca Komorbiditesi Olan Olgularda): İleri yaş, koroner arter hastalığı, KOAH veya morbid obezite varlığında prone pozisyon toleransı.',
      'Anestezi Değerlendirmesi: Prone pozisyon için boyun hareket açıklığı, obezite (BMI > 35 kg/m²), obstrüktif uyku apnesi (OSA) ve zor hava yolu taraması.'
    ],
    historyAndPhysical: [
      'ERAS Preoperatif Optimizasyon: Sigara bırakma (≥ 4 hafta — yara iyileşmesi), preoperatif anemi taraması (PBM), kronik opioid kullanımı/tolerans öyküsü ve ameliyattan 2 saat öncesine kadar berrak karbonhidrat (CHO) içeceği (diyabet/gastroparezi hariç).',
      'Nörolojik Taban Muayenesi: Mevcut düşük ayak veya duyu kaybı cerrahi öncesi mutlaka belgelenmelidir.',
      'Kauda Ekuina Taraması: Eyer tarzı anestezi, akut idrar retansiyonu veya inkontinans varlığı acil cerrahi endikasyonudur (dolu mide / RSI hazırlığı gerekebilir!).',
      'Antikoagülan / Antiagregan Öyküsü: Epidural hematom riskine karşı kılavuzlara uygun kesilme sürelerinin (Klopidogrel 5-7 gün, DOAK 48-72 saat, LMWH 12-24 saat) doğrulanması.',
      'Revizyon Cerrahisi Öyküsü: Önceki bel ameliyatı epidural skar ve insidental durotomi riskini artırır.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit ≥ 100.000/mm³) ve Koagülasyon Paneli (PT, aPTT, INR).',
      'Kan Grubu ve Antikor Taraması (Type & Screen - T&S; rutin ES cross-match gerekmez).',
      'Biyokimya: Elektrolitler, böbrek fonksiyon testleri ve açlık kan glukozu / HbA1c.',
      'Lomber MRG (ve gerekirse dinamik grafiler): Disk hernisi/stenoz seviyeleri ve instabilite ekartasyonu.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO₂, EtCO₂ (VAE ve ani şok takibi için sürekli) ve Nazofaringeal/Özofageal Sıcaklık (normotermi > 36.0°C).',
      'Kan Basıncı İzlemi: Çoğu sağlıklı hastada sık aralıklı (3-5 dk) NİBP yeterlidir; ciddi kardiyopulmoner komorbidite, çok seviyeli stenoz veya belirgin kanama beklentisinde İnvaziv Radyal Arter (A-Line) eklenir. MAP ≥ 75-80 mmHg korunur.',
      'İntraoperatif Nöromonitörizasyon (İONM): Rutin tek seviye mikrodiskektomide gerekmez; yalnızca seçilmiş kompleks revizyon, kauda ekuina veya ciddi çok seviyeli stenozda (Serbest EMG / tcMEP / SSEP + TOF 4/4) uygulanır.',
      'Mesane Sondası: Kısa süreli (< 2 saat) tek seviye mikrodiskektomide rutin gerekmez (postop üriner retansiyonu azaltır); > 2.5 saat sürecek çok seviyeli laminektomi veya kauda ekuinada takılır.'
    ],
    vascularAccess: [
      'En az 1-2 adet güvenilir üst ekstremite periferik İV yol (16-18G — ani retroperitoneal damar yaralanması olasılığına karşı sağlam ve erişilebilir üst ekstremite hattı)',
      'Rutin CVC, Belmont veya Cell Saver GEREKMEZ (yalnızca ciddi komorbidite veya yüksek riskli revizyon olgularında)'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon — Jackson Omurga Masası (Wilson Çerçevesine Tercih Edilir)',
    patientPositionDetails: [
      'JACKSON MASASI TERCİHİ VE SERBEST BATIN: Wilson çerçevesi (Wilson frame) başı kalp seviyesinin altına indirdiği ve batın/VCI basısını artırdığı için bağımsız PION risk faktörüdür (OR ~4.3) ve epidural venöz kanamayı artırır; Jackson omurga masası tercih edilerek batın tamamen boşlukta sarkıtılır.',
      'ASA POVL 2019 VE BAŞ SEVİYESİ: Baş nötral pozisyonda ve KALP SEVİYESİNDE veya HAFİF YUKARISINDA (hafif ters Trendelenburg; ASLA baş aşağı pozisyon verilmez!) ProneView aynalı kask/yüz yastığına alınır; göz küreleri her 15-30 dakikada kontrol edilerek sıfır orbital bası teyit edilir.',
      'Boyun ve servikal omurga nötral eksende; aşırı ekstansiyon veya rotasyondan kaçınılır.',
      'Kollar omuz < 90° abdüksiyonda jel pedlerle desteklenir (ulnar sinir ve brakiyal pleksus koruması); meme dokusu ve erkeklerde genital organlar basıdan korunur.',
      'Dizler hafif fleksiyonda, fibula başı (peroneal sinir) jel pedle korunur ve ayak parmaklarının masaya basması önlenir.'
    ],
    anesthesiaManagement: [
      'Preoperatif Antibiyotik ve PONV Profilaksisi:',
      '  - İnsizyondan 30-60 dk önce IV Sefazolin 2 g (>120 kg 3 g); cerrahi > 3-4 saati aşarsa ek doz (redosing).',
      '  - Multimodal PONV profilaksisi: İndüksiyonda Deksametazon 4-8 mg (diyabet gözetilerek) + kapanışta Ondansetron 4 mg.',
      'İndüksiyon ve Hava Yolu:',
      '  - IV Propofol (2-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + orta etkili non-depolarizan kas gevşetici (Rokuronyum 0.5-0.6 mg/kg).',
      '  - Kaflı spiral (zırhlı) endotrakeal tüp ile atravmatik entübasyon ve su geçirmez tespit. (İONM/TcMEP kullanılıyorsa bilateral YUMUŞAK GAZLI BEZ RULO molar bite block yerleştirilir; sert plastik Guedel airway KESİNLİKLE KULLANILMAZ!).',
      'İdame:',
      '  - Rutin İONM olmayan olgularda: Sevofluran veya Desfluran (0.8-1.0 MAC, hava/O₂ karışımı) + Remifentanil (0.05-0.2 mcg/kg/dk) veya aralıklı Fentanil; alternatif olarak Propofol + Remifentanil TIVA.',
      '  - İONM/EMG kullanılan seçilmiş olgularda: Kürarsız Propofol + Remifentanil TIVA (TOF 4/4).',
      '  - N₂O (AZOT PROTOKSİT) KESİNLİKLE KULLANILMAZ (durotomi pnömosefalisi, VAE genişlemesi ve PONV riski)!',
      '  - PROSPECT Multimodal Adjuvanlar: İntraoperatif düşük doz IV Ketamin (0.25-0.5 mg/kg bolus ± 0.1-0.2 mg/kg/saat) veya IV Lidokain infüzyonu (1-1.5 mg/kg bolus + 1-2 mg/kg/saat — yara infiltrasyonu/TLIP/ESP bloğu planlanıyorsa LAST sınırı gözetilerek blok öncesi durdurulur).',
      'Hemodinami, Normotermi ve Glisemik Kontrol:',
      '  - Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır; MAP ≥ 75-80 mmHg (veya bazalin %20 içinde) tutulur. Aktif ısıtma (> 36.0°C) ve diyabetik hastalarda glukoz 140-180 mg/dL hedeflenir.',
      '  - Venöz Hava Embolisi (VAE) farkındalığı: Ani EtCO₂ düşüşü, hipoksi/hipotansiyonda cerrahi sahayı salinle kapla, FiO₂ 1.0 ver, venöz basıncı artır.',
      'ACİL ALARM — Diskektomi Sırasında Retroperitoneal Büyük Damar Yaralanması:',
      '  - Disk küretajı sırasında ani açıklanamayan hipotansiyon, taşikardi ve EtCO₂ düşüşü (sırt yarası kuru görünse bile!) anterior anulus perforasyonu ve Aort/VCI/İliak yırtığı lehinedir:',
      '    1. Cerraha derhal bildir; cerrahi ekip sırt yarasını hızla gazlı bezle paketleyip geçici olarak kapatır.',
      '    2. Hasta DERHAL SUPİN POZİSYONA ÇEVRİLİR (prone pozisyonda aort/VCI onarılamaz!).',
      '    3. Üst ekstremite geniş İV hatlardan masif transfüzyon protokolü (1:1:1) başlatılır ve acil laparotomi için damar cerrahisi çağrılır.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; prone pozisyonda tüp bükülmesini (kinking) engeller.',
      'Tüp cilde terlemeye ve dezenfektana dayanıklı su geçirmez bantlarla iki taraflı güvenle tespit edilir; kaf basıncı 20-25 cmH₂O\'da tutulur.',
      'İONM/TcMEP kullanılan vakalarda bilateral YUMUŞAK GAZLI BEZ RULO molar ısırma bloğu zorunludur (sert plastik Guedel airway KESİNLİKLE KULLANILMAZ).'
    ],
    criticalSurgicalStages: [
      '1. Prone Pozisyonlama (Jackson Masası, Serbest Batın, Sıfır Oküler Bası) ve Floroskopi ile Seviye İşaretlemesi.',
      '2. Sınırlı Orta Hat veya Paramedian İnsizyon ve Subperiosteal / Tübüler Kas Ayrılması.',
      '3. Hemilaminektomi / Laminektomi, Flavektomi ve Foraminotomi (Dural kese serbestleştirilmesi — insidental durotomi riski!).',
      '4. Sinir Kökünün Nazik Ekartasyonu ve Mikrodiskektomi (Anterior anulus perforasyonu ve sessiz retroperitoneal damar yaralanması farkındalığı!).',
      '5. Normotansif Hemostaz Kontrolü ve Valsalva Manevrası (Gizli BOS kaçağı ve epidural venöz kanama testi).',
      '6. Yara İçi Lokal Anestezik İnfiltrasyonu / Blok ve Anatomik Kapanış.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ ÖKSÜRMESİZ UYANMA: Özellikle insidental durotomi tamiri veya epidural venöz koterizasyon sonrası öksürük, ıkınma ve hipertansiyon BOS kaçağını veya akut epidural hematomu tetikler; düşük doz Remifentanil veya IV Lidokain (LAST sınırı gözetilerek) ile sakin ekstübasyon sağlanır.',
      'AMELİYATHANEDE ANINDA NÖROLOJİK MUAYENE: Hasta uyanır uyanmaz L4 (ayak bileği dorsifleksiyonu), L5 (başparmak dorsifleksiyonu) ve S1 (plantar fleksiyon) motor kuvvetleri doğrulanır; yeni motor defisit veya şiddetli progresif ağrıda akut epidural hematom dışlanmalıdır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Opioid-Koruyucu Ağrı Protokolü (PROSPECT 2021):',
      '  - Cerrahi Kapanışta Paraspinal Kas/Yara İnfiltrasyonu veya USG Eşliğinde Bilateral TLIP (Thoracolumbar Interfascial Plane) / Lomber ESP Bloğu (Bupivakain/Ropivakain — LAST sınırı gözetilerek).',
      '  - Düzenli IV/Oral Parasetamol (1000 mg 6 saatte bir).',
      '  - Kısa Süreli NSAİİ veya COX-2 İnhibitörü (≤ 48-72 saat; hemostaz ve renal fonksiyon uygunsa — enstrümantasyonsuz dekompresyonda mükemmel opioid-koruyucu etki sağlar).',
      '  - Kurtarma Analjezisi: Kısa etkili oral/IV kurtarma opioidi veya çok seviyeli laminektomide BAZALSIZ, YALNIZCA TALEP-KONTROLLÜ (demand-only) IV PCA (opioid + benzodiazepin kombinasyonundan KESİNLİKLE kaçınılır).',
      '  - Kas Spazmları İçin: Gerekirse Tizanidin veya Metokarbamol.'
    ],
    prospectRecommendations: [
      'PROSPECT Lomber Laminektomi / Diskektomi ve Omurga Cerrahisi Kılavuzları (Waelkens et al., 2021): Düzenli parasetamol, kısa süreli NSAİİ/COX-2 inhibitörü, yara infiltrasyonu veya fasyal plan bloğu (TLIP/ESP) ve düşük doz kurtarma opioidi kombinasyonu yüksek kaliteli analjezi ve hızlı taburculuk sağlar.'
    ],
    erasRecommendations: [
      'ERAS® Lomber Omurga Cerrahisi Kılavuzları (Debono et al., 2021):',
      '  - Erken Nörolojik ve Mesane İzlemi: İlk 12-24 saat alt ekstremite motor gücü ve idrar çıkışı izlenir (akut epidural hematom ve Kauda Ekuina Sendromunu erken saptamak için).',
      '  - Erken Foley Çekimi: Ameliyatta sonda takıldıysa nörojenik mesane/kauda ekuina yoksa postop derlenme veya 1. günde erken çekilir.',
      '  - Erken Oral Alım ve Mobilizasyon: Postoperatif 2-4. saatte oral alıma geçilir; insidental durotomi yoksa hastalar aynı gün (4-6 saat içinde) mobilize edilir.',
      '  - DVT Profilaksisi ve Glukoz Kontrolü: Erken mobilizasyon + IPC çorapları; diyabetiklerde glukoz 140-180 mg/dL aralığında tutulur.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Posterior Lumbar Spine Surgery (Microdiscectomy & Laminectomy). Philadelphia: Wolters Kluwer.',
    erasReference: 'Debono, B., Wainwright, T. W., Wang, M. Y., Sigmundsson, F. G., Yang, M. M. H., Smid-Nanninga, H., Bonnal, A., Le Huec, J. C., Fawcett, W. J., Ljungqvist, O., Lonjon, G., & de Boer, H. D. (2021). Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations. The Spine Journal, 21(5), 729–752.',
    prospectReference: 'Waelkens, P., Alsabbagh, E., Sauter, A., Joshi, G. P., & Beloeil, H.; PROSPECT Working Group of the European Society of Regional Anaesthesia and Pain Therapy (ESRA). (2021). Pain management after complex spine surgery: A systematic review and procedure-specific postoperative pain management recommendations. European Journal of Anaesthesiology, 38(9), 985–994.',
    otherReferences: [
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. (2019). Practice advisory for perioperative visual loss associated with spine surgery 2019: An updated report. Anesthesiology, 130(1), 12–30.',
      'Carson, J. L., Stanworth, S. J., Guyatt, G., et al. (2023). Red blood cell transfusion: 2023 AABB International Guidelines. JAMA, 330(19), 1892–1902.',
      'Papadoulas, S., Konstantinou, D., Kourea, H. P., Kritikos, N., Haftouras, N., & Tsolakis, J. A. (2002). Vascular injury complicating lumbar disc surgery: A systematic review. European Journal of Vascular and Endovascular Surgery, 24(3), 189–195.',
      'North American Spine Society (NASS). Evidence-Based Clinical Guidelines for Multidisciplinary Spine Care: Lumbar Disc Herniation with Radiculopathy and Degenerative Lumbar Spinal Stenosis.'
    ]
  }
};
