import { ProcedureDefinition } from '../../types/procedures';

/**
 * Posterior Torasik Omurga Cerrahisi: Laminektomi, Kostotransversektomi ve Enstrümente Füzyon (Pedikül Vidaları ve Osteotomiler)
 * (Posterior Thoracic Spine Surgery: Laminectomy, Costotransversectomy, and Instrumented Fusion)
 *
 * Jaffe (6th ed., 2020), ERAS® Society Spine Consensus (Debono et al., Spine J 2021),
 * PROSPECT Complex Spine Guidelines (Waelkens et al., Eur J Anaesthesiol 2021),
 * ASA POVL Practice Advisory (Anesthesiology 2019), AO Spine / Praxis 2024 Acute SCI Guidelines
 * ve SNACC kılavuzları referans alınarak yapılandırılmıştır.
 */
export const posteriorThoracicSpineSurgery: ProcedureDefinition = {
  id: 'posterior-thoracic-spine-surgery',
  name: 'Posterior Torasik Omurga Cerrahisi: Laminektomi, Kostotransversektomi ve Enstrümente Füzyon (Pedikül Vidaları ve Osteotomiler)',
  shortCode: 'TORASİK-POST',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orta ve alt torakal omurgada (T1-T12 seviyeleri) kord basısı, travmatik kırık-çıkıklar, spinal tümörler veya kifoskolyoz deformitelerinde posterior orta hat yaklaşımı ile uygulanan majör cerrahi dekompresyon ve enstrümentasyon ameliyatıdır. Paraspinal kaslar subperiosteal olarak faset eklemleri ve transvers çıkıntılara dek sıyrılır. Basıyı kaldırmak için Laminektomi uygulanabilir; anterior patolojilere (kalsifiye disk veya korpus tümörü) plevraya girmeden posterolateralden ulaşmak için ise kosta rezeksiyonu ve transvers proçesin çıkarılmasıyla Kostotransversektomi veya Lateral Ekstrakaviter Yaklaşım (LECA) uygulanır. Biyomekanik rekonstrüksiyon ve deformite düzeltilmesi amacıyla pedikül vidaları, kancalar (hooks), rodlar ve osteotomiler (Smith-Petersen [SPO], Pedikül Çıkarma [PSO] veya Vertebral Kolon Rezeksiyonu [VCR]) eşliğinde rijit posterior füzyon tamamlanır.',
  indications: [
    'Torasik Spinal Stenoz ve Torasik Miyelopati: Ligamentum flavum hipertrofisi/ossifikasyonu (OLF) veya faset artrozuna bağlı torasik kord basısı',
    'İnstabil Torakal Kırık-Çıkıklar: T1-T12 instabil burst kırıkları, Chance kırıkları (fleksiyon-distraksiyon yaralanmaları) veya faset subluksasyonları',
    'Torakal Omurga Tümörleri ve Metastazları: Arka veya ön-arka elemanları tutan, patolojik kırık ve kord basısı yaratan kitlelerin dekompresyonu ve çok seviyeli posterior enstrümantasyonu',
    'Kifoskolyoz ve Sagital Dengesizlik Düzeltilmesi: Scheuermann kifozu, ankilozan spondilit ("bambu omurga") rijit kifozu veya adölesan idiyopatik skolyoz (AIS) deformite cerrahisi (SPO/PSO/VCR osteotomileri)',
    'Posterolateral Yolla Torakal Diskektomi / Korpektomi: Plevrayı ve göğüs boşluğunu açmadan kostotransversektomi yoluyla anterior korpus lezyonlarının boşaltılması'
  ],
  averageDuration: '3.5 - 7.0 saat (Pozisyonlama, Jackson masası ve pre/post-pozisyon bazal İONM: 45-60 dk; Posterior subperiosteal kas diseksiyonu: 45-60 dk; Laminektomi veya kostotransversektomi: 60-90 dk; Çok seviyeli pedikül vidalama [genellikle 6-12 vida]: 60-90 dk; Deformite osteotomisi [SPO/PSO], rod montajı ve posterolateral greftleme: 60-120 dk; Hemostaz, subfasial drenaj ve katmanlı kapanış: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '500 - 1800 mL (Geniş kas diseksiyonu, çok seviyeli pedikül girişleri, osteotomiler ve epidural venöz pleksus nedeniyle; 6 seviye üstü deformite ve tümör cerrahilerinde 2000-3000 mL\'yi bulabilir)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Geniş Kemik Kansellöz Yatak ve Epidural Pleksus)',
    crossMatchRequirement: 'En az 3-4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite Taze Donmuş Plazma (TDP) hazır bulundurulmalıdır; Traneksamik Asit (TXA) infüzyonu ve Cell Saver cihazı (malignite/enfeksiyon dışı) ZORUNLUDUR',
    transfusionProbability: '%45 - %70 (Deformite osteotomilerinde ve tümör rezeksiyonlarında %80)',
    criticalBleedingSources: [
      'Epidural Venöz Pleksus (Batson pleksusu — özellikle batın basısı olduğunda masif venöz göllenme)',
      'Segmental İnterkostal Arter ve Venler (Kostotransversektomide kosta başı rezeke edilirken foramen girişinde yırtılma)',
      'Geniş Paraspinal Kas Yatağı ve Çok Seviyeli Pedikül Kemik İliği Kanamaları',
      'PSO / VCR Osteotomi Hatlarında Korpus Süngeröz Kanamaları'
    ],
    hemostasisStrategies: [
      'Kanıta Dayalı İntraoperatif Traneksamik Asit (TXA) Protokolü: İndüksiyonda 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk içinde), ardından 1-2 mg/kg/saat sürekli infüzyon (nöbet toksisitesi nedeniyle >20-30 mg/kg yüksek dozlardan KESİNLİKLE kaçınılır). UYARI: Nöbet öyküsü ve aktif VTE varlığında kullanılmaz; renal yetmezlikte doz azaltılır; insidental durotomi / BOS temasında nöbet riski göz önünde bulundurulur',
      'Prone pozisyonda Jackson omurga masasında batın boşluğunun tamamen serbest bırakılarak Batson pleksus basıncının sıfırlanması',
      'Pedikül girişlerinde ve kemik osteotomi yüzeylerinde bol steril kemik mumu uygulaması',
      'Hemostatik matriks (FloSeal, Surgicel, Gelfoam + trombin) ve malignite/enfeksiyon dışı olgularda Cell Saver kullanımı',
      'Nüanslı Transfüzyon Eşiği (ASA POVL 2019 / AABB 2023): Hemodinamik stabil hastalarda Hb 7-8 g/dL; aktif kord/miyokard iskemisi, masif devam eden hemoraji veya İONM amplitüd düşüşünde Hb 8-9 g/dL hedeflenir (kolloid + kristaloid dengesi korunur)',
      'Derin subfasial çift negatif basınçlı drenaj'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (Kürarsız TIVA: Propofol + Remifentanil) — İntraoperatif Transkraniyal MEP ve SSEP takibi için MUTLAK ALTIN STANDARTTIR'
    ],
    alternative: [
      'Multimodal Adjuvanlı TIVA: Propofol + Remifentanil TIVA protokolüne düşük doz IV Ketamin (0.1-0.2 mg/kg/saat) ve/veya IV Lidokain infüzyonu (1-2 mg/kg/saat) eklenmesi',
      'Dengeli Anestezi + TIVA Hibrit (Yalnızca İONM sinyalleri güçlü ve stabil seçilmiş olgularda): Çok düşük doz Sevofluran/Desfluran (≤ 0.3-0.5 MAC) + Propofol/Remifentanil; N₂O (Azot Protoksit) KESİNLİKLE KONTRENDİKEDİR!'
    ],
    clinicalRationale: 'Dar torakal omurilik kanalında deformite düzeltme, osteotomi ve pedikül vidalaması sırasında tcMEP/SSEP yanıtlarını korumak için volatil ajan ve N₂O içermeyen, entübasyon sonrası kas gevşeticisiz Propofol + Remifentanil TIVA altın standarttır. Uzun süreli prone pozisyonda hava yolu katlanmasını (kinking) ve TcMEP sırasında dil/diş travmasını önlemek için su geçirmez tespitli spiral telli (zırhlı) ETT ve bilateral yumuşak gazlı bez rulo molar ısırma bloğu zorunludur.',
    notes: 'POSTERİOR TORASİK OMURGA CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) Jackson Masası, Serbest Batın ve ASA POVL 2019 Koruması; (2) Torakal Kord İskemisi, Pre/Post-Pozisyon İONM (Bilateral Yumuşak Bite Block) ve MAP ≥ 80-85 mmHg (Permisif Hipotansiyon YASAK); (3) SCI Süksinilkolin Yasağı, Nörojenik Şok, Otonomik Disrefleksi ve Ankilozan Spondilit Pozisyonlaması; (4) Kostotransversektomi Pnömotoraks ve Venöz Hava Embolisi (VAE) Yönetimi; (5) Kanıta Dayalı TXA (10-15 mg/kg + 1-2 mg/kg/sa), Nüanslı Transfüzyon ve Bazalsız Multimodal Analjezi.',
    rulesTitle: 'POSTERİOR TORASİK OMURGA CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'ASA POVL 2019 KORUMASI, JACKSON MASASI VE SERBEST BATIN',
        content: 'Jackson omurga masası, Wilson çerçevesine (bağımsız PION risk faktörü, OR ~4.3) kesinlikle tercih edilir; batın tamamen boşlukta sarkıtılarak VCI basısı ve Batson venöz kanaması sıfırlanır. Baş nötral ve KALP SEVİYESİNDE veya HAFİF YUKARISINDA (ters Trendelenburg; ASLA baş aşağı değil!) tutulur. Göz küreleri her 15-30 dakikada kontrol edilir (sıfır orbital bası — CRAO önlemi). PION\'un SIFIR oküler bası altında dahi sistemik nedenlerle (uzun prone >6 sa, >1000 mL kanama, aşırı kristaloid) gelişebileceği unutulmaz; masif kanamada kolloid + kristaloid dengesi gözetilir ve Hb eşiği AABB/POVL kılavuzuna göre (stabil 7-8 g/dL; aktif iskemi/masif kanama/İONM düşüşü 8-9 g/dL) bireyselleştirilir.'
      },
      {
        number: 2,
        title: 'TORAKAL KORD PERFÜZYONU (MAP ≥ 80-85 mmHg), İONM VE BİLATERAL YUMUŞAK BITE BLOCK',
        content: 'T4-T8 watershed alanı ve Adamkiewicz bölgesi iskemiye son derece duyarlıdır; permisif/kontrollü hipotansiyondan KESİNLİKLE kaçınılır! MAP ≥ 80-85 mmHg (osteotomi/İONM düşüşünde ≥ 85-90 mmHg; AO Spine 2024 akut SCI\'de 75-80 ile 90-95 mmHg; rutin yüksek doz NASCIS metilprednizolon yok) korunur. Hem supin hem prone pozisyonda bazal tcMEP/SSEP alınır, N₂O kesinlikle yasaktır, TOF 4/4 tutulur ve TcMEP için bilateral YUMUŞAK GAZLI BEZ RULO molar bite block kullanılır (sert plastik Guedel airway KULLANILMAZ!). Stagnara uyanma testi prone pozisyonda ekstübasyon/VAE/implant kayması riski taşıdığından YALNIZCA İONM başarısız olursa son çare olarak düşünülür.'
      },
      {
        number: 3,
        title: 'SCI SÜKSİNİLKOLİN YASAĞI, OTONOMİK İNSTABİLİTE VE ANKİLOZAN SPONDİLİT ("BAMBU OMURGA")',
        content: 'Akut/subakut SCI > 24-48 saat olan hastalarda SÜKSİNİLKOLİN KESİNLİKLE KONTRENDİKEDİR (ölümcül hiperkalemi). T1-T4 lezyonlarında Nörojenik Şok (hipotansiyon + bradikardi), ≥ T6 kronik SCI\'de Otonomik Disrefleksi (ani malign hipertansiyon) izlenir. Ankilozan spondilit ("bambu omurga") olgularında rijit kifoz asla düzleştirilmeye zorlanmaz; hastanın mevcut kifotik açısını destekleyen özel yastık/masa konfigürasyonu ve uyanık/videolaringoskopik nötral entübasyon uygulanır (zorla ekstansiyon kırık ve parapleji yaratır!).'
      },
      {
        number: 4,
        title: 'KOSTOTRANSVERSEKTOMİDE GİZLİ PNÖMOTORAKS VE VENÖZ HAVA EMBOLİSİ (VAE)',
        content: 'Kosta başı çıkarılırken parietal plevra yırtılabilir; prone pozisyonda Ppeak artışı, hipoksemi ve hipotansiyon sinsi tansiyon pnömotoraksı gösterir (cerrahi sahaya salin doldurup Valsalva ile kabarcık testi ve gerekirse göğüs tüpü). Ayrıca prone pozisyonda kalp seviyesinin üzerindeki açık kemik/epidural venlerden Venöz Hava Embolisi (VAE) gelişebilir: ani EtCO₂ düşüşü, hipoksi ve hipotansiyonda sahayı salinle kapla, FiO₂ 1.0 ver, venöz basıncı artır ve CVC\'den hava aspire et.'
      },
      {
        number: 5,
        title: 'KANITA DAYALI TXA (10-15 mg/kg + 1-2 mg/kg/sa) VE GÜVENLİ MULTİMODAL ANALJEZİ',
        content: 'TXA 10-15 mg/kg (veya 1 g) yükleme + 1-2 mg/kg/saat infüzyon ile uygulanır (nöbet öyküsü, aktif VTE, renal yetmezlik ve BOS teması/durotomi uyarıları). Postoperatif ağrıda ESPB, yara infiltrasyonu, parasetamol, kısa süreli NSAİİ (≤ 48-72 sa), intraoperatif ketamin/metadon ve BAZALSIZ talep-kontrollü IV PCA uygulanır; opioid PCA ile eşzamanlı diazepam/benzodiazepin kullanımından solunum depresyonu nedeniyle KESİNLİKLE kaçınılır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji / Nöroşirürji Konsültasyonu: Torasik miyelopati tablosunun ayrıntılı haritalanması (bacaklarda spastisite, motor güç, Babinski/Klonus, duyu seviyesi ve sfinkter fonksiyonu).',
      'Kardiyoloji Konsültasyonu: Şiddetli torasik kifoskolyozu olan hastalarda kor pulmonale, sağ kalp yüklenmesi ve azalmış kardiyak rezerv; uzun süreli prone pozisyonun kardiyak doluşa etkileri.',
      'Göğüs Hastalıkları Konsültasyonu: Restriktif akciğer hastalığı (özellikle Cobb açısı > 60-70° olan skolyoz veya Scheuermann kifozunda vital kapasite %40-50 düşebilir); arteriyel kan gazı ve spirometri değerlendirmesi.',
      'Girişimsel Radyoloji Konsültasyonu: Spinal tümör olgularında (özellikle böbrek, tiroid hücreli metastazlar) cerrahi kanamayı azaltmak için preoperatif transarteriyel tümör embolizasyonu.'
    ],
    historyAndPhysical: [
      'ERAS Preoperatif Optimizasyon: Preoperatif Hasta Kan Yönetimi (PBM — anemi/demir eksikliğinin düzeltilmesi), sigaranın en az ≥ 4 hafta önce bırakılması (psödoartroz riskini azaltır), kronik opioid kullanım/tolerans öyküsü ve ameliyattan 2 saat öncesine kadar karbonhidrat (CHO) yüklemesi (diyabet/gastroparezi hariç).',
      'SCI Zamanlaması ve Ankilozan Spondilit Taraması: > 24-48 saat SCI\'de süksinilkolin yasağı; T1-T4 nörojenik şok ve ≥ T6 otonomik disrefleksi riski; ankilozan spondilitte servikotorasik rijidite ve zor hava yolu değerlendirmesi.',
      'Nörolojik Taban Muayenesi: Her iki bacakta tüm kas gruplarının (kuadriseps, hamstring, tibialis anterior, EHL, gastroknemius) kuvveti ve duyu seviyeleri ayrıntılı kaydedilir.',
      'Deformite ve Solunum Eforu: Kifoskolyoz derecesi, göğüs kafesi asimetrisi ve yardımcı solunum kaslarının kullanımı.',
      'Koagülasyon Öyküsü: Antikoagülan veya antiagregan kullanımı (epidural hematom parapleji yaratabileceğinden kılavuzlara uygun kesilmelidir).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı, Demir/Ferritin (PBM) (Hb, Hct, Trombosit sayısı ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen düzeyi (bazal > 200 mg/dL hedeflenir).',
      'En az 3-4 Ünite Eritrosit Süspansiyonu ve 2 Ünite TDP Cross-Match hazırlığı.',
      'Biyokimya, Renal Fonksiyon (TXA doz ayarı) ve Kan Glukozu / HbA1c.',
      'Arteriyel Kan Gazı (Bazal PaO₂, PaCO₂ ve asit-baz dengesi — restriktif deformitelerde zorunlu).',
      'Tüm Omurga Boy Grafileri (Skolyoz/Kifoz Cobb açıları), Torakal MRG ve BT: Spinal kord bası seviyeleri, pedikül kemik çapları ve kalsifiye lezyonlar.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO₂, EtCO₂ ve Nazofaringeal/Özofageal Sıcaklık (normotermi > 36.0°C).',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Pozisyonel hipotansiyonu engellemek, MAP ≥ 80-85 mmHg (osteotomi/İONM düşüşünde ≥ 85-90 mmHg) hedefini sürdürmek, seri kan gazı, Hb, laktat, iCa²⁺ ve glukoz (140-180 mg/dL) takibi için zorunludur.',
      'Santral Venöz Kateter (CVC): Vazopressör infüzyonu, masif kanamada hızlı santral erişim ve olası VAE aspirasyonu için.',
      'İntraoperatif Nöromonitörizasyon (İONM): Bilateral Transkraniyal MEP (tcMEP), SSEP ve pedikül vidalama için Tetiklenmiş/Serbest EMG. Pozisyon ÖNCESİ (supin) ve pozisyon SONRASI (prone) bazal kayıtlar mutlaka alınır.',
      'Anestezi Derinliği (BIS/SedLine) ve Nöromusküler İleti İzlemi (TOF): Ameliyat boyunca TOF 4/4 (%100) korunur; entübasyon sonrası kas gevşetici kullanılmaz.',
      'Ventilatör Tepe Basıncı (Ppeak) ve EtCO₂ Takibi: Kostotransversektomi sırasında plevra yırtığına bağlı pnömotoraksı ve açık kemik venlerinden VAE\'yi erken yakalamak için.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (14-16G) üst ekstremite periferik intravenöz yol',
      'Santral Venöz Kateter (İnternal juguler ven)',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı Hatlar',
      'Cell Saver (Hücre Kurtarma Sistemi — malignite/enfeksiyon dışı steril hatta bağlı ve aktif)'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon — Jackson Omurga Masası (Wilson Çerçevesine Kesinlikle Tercih Edilir)',
    patientPositionDetails: [
      'JACKSON MASASI VE SERBEST BATIN: Wilson çerçevesi bağımsız PION risk faktörüdür (OR ~4.3) ve batın/venöz basıyı artırır; Jackson omurga masasında karın tamamen boşlukta asılarak VCI basısı ve Batson pleksus kanaması sıfırlanır.',
      'BAŞ SEVİYESİ VE ASA POVL 2019: Baş nötral pozisyonda ve KALP SEVİYESİNDE veya HAFİF YUKARISINDA (hafif ters Trendelenburg — ASLA baş aşağı pozisyon verilmez!) ProneView aynalı kaskta veya Mayfield başlığında tutulur. Göz küreleri her 15-30 dakikada kontrol edilerek orbital bası sıfır tutulur.',
      'ANKİLOZAN SPONDİLİT ("BAMBU OMURGA") UYARISI: Rijit kifozlu hastalarda omurga zorla düzleştirilmez; mevcut kifotik kavisi tam destekleyen yastık/masa ayarlaması yapılır.',
      'Kollar omuz < 90° abdüksiyonda "Superman" pozisyonunda veya gövde yanında nötral desteklenir; ulnar sinir ve brakiyal pleksus korunur.',
      'Dizler hafif fleksiyonda tutulur, fibula başındaki peroneal sinir jel pedlerle desteklenir, ayak parmaklarının masaya basması önlenir.'
    ],
    anesthesiaManagement: [
      'Preoperatif Antibiyotik ve PONV Profilaksisi:',
      '  - İnsizyondan 30-60 dk önce IV Sefazolin 2 g (>120 kg 3 g); her 3-4 saatte bir veya > 1500 mL kan kaybında ek doz (redosing) tekrarlanır.',
      '  - PONV profilaksisi: İndüksiyonda Deksametazon 4-8 mg (cerrah/diyabet gözetilerek) + kapanışta Ondansetron 4 mg.',
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (1.5-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + orta etkili non-depolarizan kas gevşetici (Rokuronyum 0.5-0.6 mg/kg; gerekirse İONM öncesi Sugammadeks ile tam dönüşüm).',
      '  - KRİTİK UYARI: Akut/subakut SCI > 24-48 saat olan hastalarda SÜKSİNİLKOLİN KESİNLİKLE KONTRENDİKEDİR!',
      '  - Videolaringoskop (ankilozan spondilitte uyanık fiberoptik bronkoskopi) ile atravmatik entübasyon; spiral (zırhlı) endotrakeal tüp tercih edilir.',
      '  - TcMEP BITE BLOCK: İki taraflı molar dişler arasına YUMUŞAK GAZLI BEZ RULO ısırma bloğu konur (SERT PLASTİK GUEDEL AIRWAY KESİNLİKLE KULLANILMAZ!).',
      '  - Entübasyondan sonra nöromusküler bloker verilmez (kürarsız idame; TOF 4/4).',
      'İdame (Kürarsız TIVA + PROSPECT Adjuvanlar):',
      '  - Propofol (90-150 mcg/kg/dk) + Remifentanil (0.1-0.3 mcg/kg/dk) TIVA. N₂O KESİNLİKLE YASAKTIR! Volatil ajanlardan kaçınılır.',
      '  - PROSPECT Adjuvanlar: Düşük doz IV Ketamin (0.5 mg/kg bolus + 0.1-0.2 mg/kg/saat infüzyon), IV Lidokain infüzyonu (1-1.5 mg/kg bolus + 1-2 mg/kg/saat — ESPB/infiltrasyon yapılacaksa LAST riskine karşı blok öncesi durdurulur) ve majör çok seviyeli füzyon/osteotomide indüksiyonda tek doz IV Metadon (0.1-0.2 mg/kg) seçeneği.',
      'Kan Koruma, TXA ve Nüanslı Transfüzyon:',
      '  - İndüksiyonda Traneksamik Asit 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk), ardından 1-2 mg/kg/saat sürekli infüzyon (nöbet öyküsü, aktif VTE, renal doz ayarı ve insidental durotomi/BOS teması nöbet riski gözetilerek).',
      '  - Masif kanamada kolloid + kristaloid dengesi korunur; stabil hastada Hb 7-8 g/dL, aktif iskemi/masif hemoraji/İONM düşüşünde Hb 8-9 g/dL hedeflenir.',
      'Omurilik Perfüzyonu, Otonomik İnstabilite ve VAE:',
      '  - Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır! Rutin torasik kord koruması MAP ≥ 80-85 mmHg; osteotomi/deformite redüksiyonu ve İONM düşüşünde ≥ 85-90 mmHg; AO Spine 2024 akut SCI\'de 75-80 ile 90-95 mmHg hedeflenir (rutin NASCIS yüksek doz metilprednizolon önerilmez).',
      '  - T1-T4 nörojenik şok (hipotansiyon + bradikardi), ≥ T6 otonomik disrefleksi ve Venöz Hava Embolisi (VAE: ani EtCO₂ düşüşü, hipoksi -> salin ile saha kapama, FiO₂ 1.0, venöz basınç artırma, CVC aspirasyonu) yönetimine hazır olunur.',
      '7 Basamaklı İONM Sinyal Düşüşü Kontrol Listesi (tcMEP/SSEP > %50 kayıp):',
      '  1. Cerraha derhal bildir ve cerrahi manevrayı durdur (osteotomi/rod redüksiyonunu gevşet, vida pozisyonunu kontrol et).',
      '  2. Hemodinamiyi optimize et: MAP ≥ 85-90 mmHg (Noradrenalin desteği).',
      '  3. Oksijenasyon/ventilasyonu optimize et: FiO₂ 1.0, PaCO₂ 35-40 mmHg.',
      '  4. Kanama/anemiyi düzelt: Acil kan gazı/Hb kontrolü (İONM düşüşünde Hb ≥ 8-9 g/dL).',
      '  5. Normotermi (> 36.0°C), pH ve iyonize Ca²⁺ dengesini düzelt.',
      '  6. Anestezi derinliğini ve kas gevşemesini kontrol et (volatil/N₂O kapalı, aşırı derin propofol azalt, TOF 4/4).',
      '  7. Teknik/ekipman ve pozisyon kontrolü (elektrot teması, boyun/omuz malpozisyonu) — yanıt dönmezse implant gevşetme/revizyon; Stagnara uyanma testi prone pozisyon tehlikeleri (ekstübasyon, VAE, implant kayması) nedeniyle YALNIZCA İONM tamamen başarısız olursa son çare olarak uygulanır.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; prone pozisyonda katlanmayı önler.',
      'TcMEP sırasında dil, dudak ve diş hasarını önlemek için her iki molar diş arasına YUMUŞAK GAZLI BEZ RULO ısırma bloğu yerleştirilir (sert plastik Guedel airway KESİNLİKLE KULLANILMAZ).',
      'Tüpün yüze tespiti terlemeye ve dezenfektana dayanıklı su geçirmez bantlarla sağlamlaştırılır; kaf basıncı 20-25 cmH₂O seviyesinde izlenir.'
    ],
    criticalSurgicalStages: [
      '1. Supin Bazal İONM, Jackson Masasına Prone Pozisyonlama, Prone Bazal İONM ve Floroskopi ile Seviye Doğrulaması.',
      '2. Posterior Orta Hat Cerrahi İnsizyonu ve Subperiosteal Kas Diseksiyonu.',
      '3. Laminektomi veya Kostotransversektomi (Kosta başı rezeksiyonu — gizli plevra yırtığı ve pnömotoraks alarmı!).',
      '4. Çok Seviyeli Torasik Pedikül Vidalarının Yerleştirilmesi (Floroskopi/navigasyon + Tetiklenmiş EMG).',
      '5. Deformite Düzeltme Manevraları ve Osteotomiler (SPO, PSO veya VCR — kord gerilimi ve İONM alarmı!).',
      '6. Titanyum/Kobalt-Krom Rodların Montajı, Kompresyon/Distraksiyon Ayarı ve Posterolateral Kemik Greftleme.',
      '7. Hemostaz Kontrolü, Valsalva Manevrası (Plevra yırtığı ve insidental durotomi/BOS kaçağı kontrolü).',
      '8. Derin Subfasial Çift Dren Yerleştirilmesi ve Katmanlı Kapanış.'
    ],
    emergenceNotes: [
      'KONTROLLÜ UYANMA VEYA GECİKMİŞ EKSTÜBASYON: 6 saatten uzun süren, masif kanamalı (> 1500 mL) veya çok seviyeli osteotomi yapılan olgularda yüz ve larinks ödemi riski nedeniyle hasta ameliyathanede ekstübe edilmeyebilir; entübe olarak Yoğun Bakıma transfer edilir.',
      'Kaf Kaçak Testi (Cuff-Leak Test): Ekstübasyon planlanıyorsa tüp kafı indirilerek pozitif hava kaçağı doğrulanır.',
      'Öksürmesiz Uyanma: Geniş cerrahi sahada venöz kanamayı ve dural yama zorlanmasını önlemek için düşük doz Remifentanil veya IV Lidokain (LAST sınırı gözetilerek) ile pürüzsüz ekstübasyon sağlanır.',
      'Acil Nörolojik Muayene: Hasta uyanır uyanmaz her iki bacakta ayak bileği ve başparmak motor hareketi teyit edilmelidir (spinal kord hasarı ve akut epidural hematom derhal ekarte edilmelidir!).'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Agresif ve Güvenli Analjezi Protokolü (PROSPECT 2021):',
      '  - Ultrason Eşliğinde İki Taraflı Erektör Spina Plan Bloğu (ESPB) veya Cerrahi Kapanışta Paraspinal Kas Yatağına Lokal Anestezik İnfiltrasyonu (Bupivakain/Ropivakain — LAST sınırı gözetilerek).',
      '  - Seçilmiş yüksek ağrılı olgularda intratekal morfin (0.1-0.2 mg) veya indüksiyonda tek doz IV Metadon (0.1-0.2 mg/kg) seçeneği.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kısa Süreli NSAİİ / COX-2 İnhibitörü (≤ 48-72 saat; hemostaz, renal fonksiyon ve cerrah onayıyla — kısa süreli kullanımın füzyonu anlamlı bozmadığı gösterilmiştir).',
      '  - Kurtarma İV Hasta Kontrollü Analjezi (IV PCA): Morfin veya Fentanil ile BAZALSIZ, YALNIZCA TALEP-KONTROLLÜ (demand-only) protokol.',
      '  - Postoperatif Kas Spazmları İçin: Tizanidin veya Metokarbamol / Baklofen (UYARI: Opioid PCA ile eşzamanlı Diazepam/Benzodiazepin kullanımı ağır solunum depresyonu riski nedeniyle KESİNLİKLE ÖNERİLMEZ!).'
    ],
    prospectRecommendations: [
      'PROSPECT Kompleks Omurga Cerrahisi Kılavuzları (Waelkens et al., 2021): Düzenli parasetamol, kısa süreli NSAİİ/COX-2 inhibitörü, intraoperatif IV ketamin veya tek doz metadon, rejyonel fasyal plan blokları (ESPB) / cerrahi yara infiltrasyonu ve bazalsız kurtarma IV PCA kombinasyonu opioid gereksinimini ve yan etkileri azaltır.'
    ],
    erasRecommendations: [
      'ERAS® Kompleks Omurga Cerrahisi Kılavuzları (Debono et al., 2021):',
      '  - Yoğun Bakım Takibi: İlk 24 saat YBÜ\'de saatlik alt ekstremite motor muayenesi, hemodinamik stabilite (MAP ≥ 80-85 mmHg; akut SCI\'de 75-80 ile 90-95 mmHg) ve drenaj takibi.',
      '  - Glukoz ve Normotermi Kontrolü: Postoperatif kan glukozu 140-180 mg/dL aralığında tutulur; aktif normotermi korunur.',
      '  - Solunum Desteği ve Erken Teşvik Edici Spirometri (Triflo): Atelektazi ve hipoventilasyonu önlemek için saat başı göğüs fizyoterapisi.',
      '  - Erken Foley Kateter Çekilmesi ve Drenaj Yönetimi: Nörojenik mesane/akut SCI yoksa mesane sondası postop 1. günde çekilir; subfasial drenler 24 saatlik kanama < 50-100 mL olduğunda (genellikle 48-72 saatte) sonlandırılır.',
      '  - Erken Mobilizasyon ve DVT Profilaksisi: IPC kesintisiz sürdürülür, hemostaz teyidiyle 24. saatte LMWH başlanır; hastalar postop 1-2. günde hekim onayı ile mobilize edilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Posterior Thoracic Spine Surgery. Philadelphia: Wolters Kluwer.',
    erasReference: 'Debono, B., Wainwright, T. W., Wang, M. Y., Sigmundsson, F. G., Yang, M. M. H., Smid-Nanninga, H., Bonnal, A., Le Huec, J. C., Fawcett, W. J., Ljungqvist, O., Lonjon, G., & de Boer, H. D. (2021). Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations. The Spine Journal, 21(5), 729–752.',
    prospectReference: 'Waelkens, P., Alsabbagh, E., Sauter, A., Joshi, G. P., & Beloeil, H.; PROSPECT Working Group of the European Society of Regional Anaesthesia and Pain Therapy (ESRA). (2021). Pain management after complex spine surgery: A systematic review and procedure-specific postoperative pain management recommendations. European Journal of Anaesthesiology, 38(9), 985–994.',
    otherReferences: [
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. (2019). Practice advisory for perioperative visual loss associated with spine surgery 2019: An updated report. Anesthesiology, 130(1), 12–30.',
      'Kwon, B. K., Tetreault, L. A., Martin, A. R., et al. (2024). A clinical practice guideline for the management of patients with acute spinal cord injury: Recommendations on hemodynamic management (AO Spine / Praxis). Global Spine Journal, 14(3_suppl), 187S–211S.',
      'Carson, J. L., Stanworth, S. J., Guyatt, G., et al. (2023). Red blood cell transfusion: 2023 AABB International Guidelines. JAMA, 330(19), 1892–1902.',
      'Bridwell, K. H., et al. (2003). Complications and outcomes in posterior thoracic and lumbar spine deformity surgery. Spine, 28(20S), S209–S218.'
    ]
  }
};
