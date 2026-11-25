import { ProcedureDefinition } from '../../types/procedures';

/**
 * Posterior Lomber Füzyon ve Enstrümantasyon: Çok Seviyeli Pedikül Vidaları, Pelvik Fiksasyon (S2AI/İliak), Cisimlerarası Füzyon (TLIF/PLIF) ve Deformite Osteotomileri (L1-Pelvis)
 * (Posterior Lumbar Fusion and Instrumentation: Multilevel Pedicle Screws, Pelvic Fixation, Interbody Fusion, and Deformity Osteotomies)
 *
 * Jaffe (6th ed., 2020), ERAS® Society Spine Consensus (Debono et al., Spine J 2021),
 * PROSPECT Complex Spine Guidelines (Waelkens et al., Eur J Anaesthesiol 2021),
 * ASA POVL Practice Advisory (Anesthesiology 2019), AABB 2023 Transfusion Guidelines
 * ve SNACC kılavuzları referans alınarak yapılandırılmıştır.
 */
export const posteriorLumbarFusionInstrumentation: ProcedureDefinition = {
  id: 'posterior-lumbar-fusion-instrumentation',
  name: 'Posterior Lomber Füzyon ve Enstrümantasyon: Çok Seviyeli Pedikül Vidaları, Pelvik Fiksasyon (S2AI/İliak), Cisimlerarası Füzyon (TLIF/PLIF) ve Deformite Osteotomileri (L1-Pelvis)',
  shortCode: 'LOMBER-POST-FUS',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Lomber ve lumbosakral omurgada çok seviyeli instabilite, erişkin omurga deformitesi (dejeneratif skolyoz, lomber düzleşme / flat-back sendromu), yüksek dereceli spondilolistezis, psödoartroz revizyonu veya instabil travma ve tümör olgularında uygulanan majör posterior rijit enstrümantasyon ve kemik füzyon ameliyatıdır. Posterior orta hat boyunca geniş diseksiyonla multifidus ve uzun paraspinal kaslar subperiosteal olarak faset eklemlerine ve transvers proçes uçlarına kadar iki taraflı açılır. Gereken seviyelerde kanal ve foramen dekompresyonu yapıldıktan sonra, disk mesafelerine lordoz kazandırıcı interbody kafesler (TLIF/PLIF) yerleştirilir. Omurga stabilitesini sağlamak ve sagital dengeyi restore etmek amacıyla çok seviyeli bikortikal lomber pedikül vidaları (osteoporotik olgularda fenestre çimentolu PMMA vidalar) gönderilir; L5-S1 seviyesindeki yüksek biyomekanik kesme kuvvetlerine karşı sakral (S1) vidalara ilave olarak ilium kanatlarına S2-Alar-İliak (S2AI) veya iliak vidalar (pelvik fiksasyon) eklenir. Şiddetli sagital dengesizliklerde Smith-Petersen (SPO) veya Pedikül Çıkarma Osteotomisi (PSO) yapılarak titanyum/kobalt-krom rodlar ile rijit montaj ve posterolateral kemik greftlemesi tamamlanır.',
  indications: [
    'Erişkin Dejeneratif Lomber Skolyoz ve Düz Bel (Flat-Back) Sendromu: İlerleyici sagital/koronal dengesizlik, kompansatuar diz/kalça fleksiyonu ve şiddetli mekanik ağrı',
    'Çok Seviyeli Yüksek Dereceli Spondilolistezis ve İnstabilite: L3-L4, L4-L5 ve L5-S1 aralıklarında Grade II-IV kayma ve lumbosakral kifoz',
    'Başarısız Bel Cerrahisi Sendromu (FBSS) ve Geniş Psödoartroz Revizyonu: Önceki füzyonun kaynamaması, vida gevşemesi/kırılması ve lumbosakral çökmelerin revizyonu',
    'Lumbosakral Bileşke Fiksasyonu (L1-Sakrum/Pelvis): S1 vida gevşemesini ve psödoartrozu önlemek için S2AI veya iliak vidalar ile pelvik tabana ankoraj',
    'Lomber Patlama Kırıkları ve Fleksiyon-Distraksiyon Travmaları: Çok seviyeli posterior redüksiyon, ligamantotaksi ve pedikül vida fiksasyonu',
    'Metastatik ve Primer Omurga Tümörleri: Vertebra korpus rezeksiyonu sonrası posterior kolonun çok seviyeli rijit rod ve vidalarla rekonstrüksiyonu'
  ],
  averageDuration: '3.5 - 7.5 saat (2-3 seviye enstrümente füzyon: 3.5 - 4.5 saat; Çok seviyeli [4+ seviye] pelvik fiksasyonlu [S2AI] deformite cerrahisi: 5.0 - 7.0 saat; PSO osteotomili kompleks revizyon cerrahisi: 6.0 - 8.5 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '600 - 2500 mL (Geniş subperiosteal kas sıyırma alanı, çoklu pedikül vida girişleri [8-16 vida], fasetektomiler, osteotomiler ve Batson epidural pleksusu nedeniyle; osteotomili deformite revizyonlarında 3000-4000 mL masif kanama riski mevcuttur)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Geniş Kansellöz Kemik Alanı, Pelvik Girişler ve Epidural Pleksus)',
    crossMatchRequirement: 'En az 4 Ünite Eritrosit Süspansiyonu (ES), 2-4 Ünite Taze Donmuş Plazma (TDP) ve 1 Aferez Trombosit hazır bulundurulmalıdır; Traneksamik Asit (TXA) infüzyonu ve Cell Saver cihazı (malignite/enfeksiyon dışı) ZORUNLUDUR',
    transfusionProbability: '%50 - %80 (Pelvik fiksasyon ve 4 seviye üzeri füzyonlarda %85)',
    criticalBleedingSources: [
      'Geniş Paraspinal Kas Yatağı ve Fasya Sıyırma Alanları (Multifidus, Longissimus ve İliokostalis)',
      'Pedikül Giriş Noktaları ve Spongiyöz Kemik Kanalları (Vida kanallarından sürekli kemik iliği sızıntısı)',
      'S2AI ve İliak Vida Girişleri (İliak kanat kansellöz yatağı ve siyatik çentik komşuluğunda süperior gluteal damarlar)',
      'Epidural Batson Venöz Pleksusu (Foraminotomi, TLIF penceresi ve dekompresyonda dural kese çevresi)',
      'PSO / SPO Osteotomi Yüzeyleri (Vertebra korpusunun kama şeklinde kesilmesi sırasında kemik ve epidural venöz kan gölü)',
      'Segmental Lomber Damarlar ve Anterior Büyük Damar Yaralanması Riski (Diskektomi aletlerinin anterior anulusu delerek aort/VCI/iliak damarları yırtması)'
    ],
    hemostasisStrategies: [
      'Prone Pozisyonda Jackson Omurga Masası: Karın tamamen boşlukta sarkıtılarak VCI ve Batson venöz basıncı sıfırlanmalıdır (Wilson çerçevesinden kaçınılır)',
      'Kanıta Dayalı İntraoperatif Traneksamik Asit (TXA) Protokolü: İndüksiyonda 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk içinde), operasyon boyunca 1-2 mg/kg/saat sürekli infüzyon (nöbet toksisitesi nedeniyle >20-30 mg/kg yüksek dozlardan KESİNLİKLE kaçınılır!). UYARI: Nöbet öyküsü ve aktif VTE varlığında kullanılmaz; renal yetmezlikte doz azaltılır; insidental durotomi / BOS temasında nöbet riski (GABA/glisin antagonizması) gözetilir',
      'Steril Kemik Mumu (Bone Wax) ve Topikal Hemostatikler (FloSeal, Surgicel, Gelfoam + trombin)',
      'Cell Saver (Kan Kurtarma Cihazı — malignite/enfeksiyon dışı) ile yıkanmış eritrosit ototransfüzyonu',
      'Nüanslı Transfüzyon ve Koagülasyon Yönetimi (ASA POVL 2019 / AABB 2023): Hemodinamik stabil hastada Hb 7-8 g/dL, aktif iskemi/masif devam eden hemoraji/İONM düşüşünde Hb 8-9 g/dL hedeflenir; masif kanamada kolloid + kristaloid dengesi korunur; Fibrinojen > 150-200 mg/dL, iyonize Ca²⁺ > 1.1 mmol/L, Trombosit > 100.000/mm³ tutulur',
      'Derin subfasial çift negatif basınçlı kapalı drenaj'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (Kürarsız TIVA: Propofol + Remifentanil) — Sürekli tcMEP, SSEP ve Pedikül/Pelvik Vida Tetiklenmiş EMG takibi için MUTLAK STANDARTTIR'
    ],
    alternative: [
      'Multimodal Adjuvanlı TIVA (PROSPECT 2021): Propofol + Remifentanil TIVA protokolüne düşük doz IV Ketamin (0.5 mg/kg bolus + 0.1-0.2 mg/kg/saat), IV Lidokain infüzyonu ve/veya indüksiyonda tek doz IV Metadon (0.1-0.2 mg/kg) eklenmesi',
      'Hibrit TIVA + Çok Düşük Doz Volatil (≤ 0.3 MAC Sevofluran): Yalnızca güçlü ve stabil İONM sinyali olan seçilmiş olgularda; entübasyon sonrası kas gevşetici ve N₂O KESİNLİKLE KULLANILMAZ!'
    ],
    clinicalRationale: 'Propofol ve remifentanil temelli kürarsız TIVA, 8-16 pedikül/S2AI vidasının test edildiği tetiklenmiş EMG (triggered EMG) ile tcMEP/SSEP sinyallerini volatil ajanlar gibi baskılamadığı için altın standarttır. N₂O, İONM sinyallerini baskıladığı ve venöz hava embolisi/durotomi pnömosefalisini genişlettiği için kesinlikle yasaktır. Uzun prone pozisyonda tüp bükülmesini önlemek için spiralli (zırhlı) ETT ve TcMEP için bilateral yumuşak gazlı bez rulo molar bite block zorunludur.',
    notes: 'POSTERİOR LOMBER FÜZYON VE ENSTRÜMANTASYONDA TEMEL ANESTEZİ İLKELERİ: (1) ASA POVL 2019 (Baş Kalp Seviyesinde/Yukarısında, Jackson > Wilson Frame OR ~4.3, Kolloid+Kristaloid, Nüanslı Hb); (2) Pedikül/S2AI Tetiklenmiş EMG, TcMEP Yumuşak Bite Block ve Osteotomide MAP ≥ 85-90 mmHg (Permisif Hipotansiyon YASAK); (3) Fenestre Çimentolu Vidalarda PMMA BCIS / Pulmoner Çimento Embolisi ve VAE Yönetimi; (4) Kanıta Dayalı TXA (10-15 mg/kg + 1-2 mg/kg/sa), S2AI Siyatik Çentik Kanaması ve Koagülopati; (5) PROSPECT / ERAS 2021 Multimodal Analjezi (Ketamin, Metadon, ESP/TLIP, Bazalsız PCA).',
    rulesTitle: 'POSTERİOR LOMBER FÜZYON VE ENSTRÜMANTASYONDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'ASA POVL 2019 KORUMASI, JACKSON MASASI (WILSON YERİNE!) VE KOLLOİD-KRİSTALOİD DENGESİ',
        content: '5-6 saati aşan ve > 1000 mL kanamalı prone füzyonlarda PION riski en üst düzeydedir ve PION SIFIR OKÜLER BASI ALTINDA DAHİ gelişebilir! Jackson omurga masası, Wilson çerçevesine (bağımsız PION risk faktörü, OR ~4.3) kesinlikle tercih edilir ve batın tamamen serbest bırakılır. Baş nötral ve KALP SEVİYESİNDE veya HAFİF YUKARISINDA (ters Trendelenburg; ASLA baş aşağı değil!) tutulur; gözler her 15-30 dk kontrol edilir (CRAO önlemi). Aşırı kristaloid yüklemesinden kaçınılarak kolloid + kristaloid dengesi gözetilir; Hb eşiği ASA POVL 2019 / AABB 2023\'e göre bireyselleştirilir (stabil 7-8 g/dL; aktif iskemi/masif kanama/İONM düşüşü 8-9 g/dL).'
      },
      {
        number: 2,
        title: 'PEDİKÜL/S2AI TETİKLENMİŞ EMG, BİLATERAL YUMUŞAK BITE BLOCK VE HEMODİNAMİK HEDEFLER',
        content: '8-16 pedikül/S2AI vidasının medial duvar bütünlüğü Tetiklenmiş EMG ile (< 6 mA medial breach alarmı!) test edilir; TOF 4/4 tutulur, N₂O kesinlikle yasaktır, pre/post-pozisyon bazal tcMEP/SSEP kaydedilir ve TcMEP için bilateral YUMUŞAK GAZLI BEZ RULO molar bite block kullanılır (sert plastik Guedel airway KULLANILMAZ!). Permisif hipotansiyondan KESİNLİKLE kaçınılır: Rutin füzyonda MAP ≥ 75-80 mmHg; PSO/SPO osteotomi, deformite redüksiyonu ve İONM düşüşünde MAP ≥ 85-90 mmHg hedeflenir.'
      },
      {
        number: 3,
        title: 'PMMA KEMİK ÇİMENTOSU İMPLANTASYON SENDROMU (BCIS) VE VENÖZ HAVA EMBOLİSİ (VAE)',
        content: 'Osteoporotik hastalarda fenestre çimentolu pedikül vidalarına PMMA enjeksiyonu sırasında BCIS ve pulmoner çimento embolisi gelişebilir: ANİ EtCO₂ DÜŞÜŞÜ, HİPOKSİ, SAĞ VENTRİKÜL YETMEZLİĞİ ve DERİN HİPOTANSİYON! Çimento öncesi FiO₂ 1.0, normovolemi, floroskopi ile venöz kaçak takibi ve acil noradrenalin/adrenalin hazırlığı şarttır. Benzer şekilde açık kemik/epidural venlerden gelişebilecek VAE\'de cerrahi saha salinle doldurulur, FiO₂ 1.0 verilir, venöz basınç artırılır ve CVC\'den hava aspire edilir.'
      },
      {
        number: 4,
        title: 'KANITA DAYALI TXA (10-15 mg/kg + 1-2 mg/kg/sa) VE S2AI SİYATİK ÇENTİK KANAMASI',
        content: 'Yüksek doz TXA nöbet riski yaratır; güvenli doz 10-15 mg/kg (veya 1 g) yükleme + 1-2 mg/kg/saat infüzyondur (nöbet öyküsü, aktif VTE, renal doz ayarı ve insidental durotomi/BOS teması nöbet riski uyarılarına dikkat!). S2AI/iliak vida yerleşiminde siyatik çentik perforasyonu süperior gluteal arterden masif pelvik kanama yaratabilir; Cell Saver, 1:1:1 kan ürünleri, fibrinojen ve iyonize kalsiyum replasmanı hazır tutulur.'
      },
      {
        number: 5,
        title: 'PROSPECT 2021 MULTİMODAL ANALJEZİ, BAZALSIZ PCA VE EPİDURAL HEMATOM - DVT DENGESİ',
        content: 'İntraoperatif düşük doz IV Ketamin, IV Lidokain ve/veya tek doz IV Metadon (0.1-0.2 mg/kg), bilateral ESP/TLIP bloğu veya yara infiltrasyonu, düzenli parasetamol, kısa süreli NSAİİ (≤ 48-72 sa) ve BAZALSIZ (demand-only) kurtarma IV PCA uygulanır (opioid + benzodiazepin kombinasyonundan kaçınılır). Postoperatif dönemde IPC kesintisiz sürdürülür, ancak akut epidural hematom/Kauda Ekuina riskine karşı saatlik nörolojik muayene ve cerrahi hemostaz teyidi olmadan antikoagülan başlanmaz.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji / Nöroloji Taban Konsültasyonu: Çok seviyeli lumbosakral kök fonksiyonlarının ayrıntılı belgelenmesi; L2 (kalça fleksiyonu), L3-L4 (kuadriseps, patella refleksi), L5 (EHL başparmak dorsifleksiyonu), S1 (gastroknemius, aşil refleksi), perianal duyu ve sfinkter tonusu.',
      'Kardiyoloji Konsültasyonu: İleri yaş dejeneratif deformite hastalarında koroner arter hastalığı, kalp yetmezliği ve EKO (EF, diyastolik disfonksiyon, sağ ventrikül basıncı — BCIS/VAE riski açısından kritik) değerlendirmesi.',
      'Göğüs Hastalıkları Konsültasyonu: Lomber/torakolomber skolyozda restriktif akciğer paterni; spirometri ve arteriyel kan gazı değerlendirmesi.',
      'Kemik Dansitometrisi (DEXA) & Endokrinoloji: Şiddetli osteoporozda (T-skoru < -2.5) fenestre çimentolu (PMMA) pedikül vidaları planlanıyorsa anestezi ekibi BCIS ve pulmoner çimento embolisi için önceden bilgilendirilmelidir.',
      'Kan Bankası / Hasta Kan Yönetimi (PBM): Beklenen masif kanama için en az 4 Ünite ES, 4 Ünite TDP rezervasyonu ve preoperatif anemi/demir eksikliği optimizasyonu.'
    ],
    historyAndPhysical: [
      'ERAS Preoperatif Optimizasyon: Hasta Kan Yönetimi (PBM — Hb ≥ 12-13 g/dL hedefi, IV demir), sigaranın en az ≥ 4 hafta önce bırakılması (psödoartroz riskini azaltır), kronik opioid toleransı taraması ve ameliyattan 2 saat öncesine kadar karbonhidrat (CHO) içeceği (diyabet/gastroparezi hariç).',
      'Nörolojik Taban Muayenesi: Mevcut paraparezi, düşük ayak ve yürüme mesafesi belgelenir.',
      'Deformite Derecesi: Sagital vertikal aks (SVA), pelvik insidans (PI) ve lomber lordoz (LL) uyumsuzluğu.',
      'Antikoagülan / Antiagregan Öyküsü: Klopidogrel, Tikagrelor, DOAK ve LMWH kesilme sürelerinin doğrulanması.',
      'Önceki Cerrahi ve İmplant Varlığı: Donanım revizyonu süreyi, kanamayı ve insidental durotomi riskini katlar.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı, Demir/Ferritin (PBM) (Hb, Hct, Trombosit ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen düzeyi (bazal > 200 mg/dL hedeflenir).',
      'En az 4 Ünite ES ve 4 Ünite TDP Cross-Match hazırlığı.',
      'Serum Biyokimyası: Elektrolitler (Na, K, Ca, Mg), renal fonksiyon (TXA doz ayarı) ve kan glukozu / HbA1c.',
      'Tüm Omurga Boy Ayakta Grafileri (SVA, PI-LL), Dinamik Grafiler, Lomber/Pelvik İnce Kesit BT (pedikül ve S2AI koridoru) ve Lomber MRG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (ST iskemi analizi), SpO₂, EtCO₂ (BCIS ve VAE erken tanısı için kritik) ve Nazofaringeal/Özofageal Sıcaklık (normotermi > 36.0°C).',
      'İnvaziv Radyal Arter Basıncı İzlemi (A-Line): Pozisyonel hipotansiyonun önlenmesi, MAP ≥ 75-80 mmHg (osteotomi/İONM düşüşünde ≥ 85-90 mmHg) hedefi, saatlik kan gazı, Hb/Hct, laktat, iyonize Ca²⁺ ve glukoz (140-180 mg/dL) takibi için ZORUNLUDUR.',
      'Santral Venöz Kateter (CVC): Masif kanama resüsitasyonu, yüksek konsantrasyonlu vazopressör/inotrop infüzyonu ve olası VAE aspirasyonu için.',
      'İntraoperatif Nöromonitörizasyon (İONM) Sistemi: Pozisyon ÖNCESİ (supin) ve SONRASI (prone) bazal tcMEP (L2-S1 miyotomları), SSEP (posterior tibial sinir), Serbest Çalışan EMG ve tüm pedikül/S2AI vidaları için Tetiklenmiş EMG (Triggered EMG).',
      'Anestezi Derinliği (BIS/SedLine) ve Nöromusküler İleti Monitörizasyonu (TOF): Entübasyon sonrası kas gevşetici verilmez; TOF 4/4 (%100) korunur.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (14-16G) üst ekstremite periferik İV damar yolu',
      'Santral Venöz Kateter (Üç lümenli, internal juguler veya subklavyan)',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı Sıvı Hatları',
      'Cell Saver (Kan Kurtarma Cihazı — malignite/enfeksiyon dışı steril hatta bağlı ve aktif)'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon — Jackson Omurga Masası (Wilson Çerçevesine Kesinlikle Tercih Edilir)',
    patientPositionDetails: [
      'JACKSON MASASI VE SERBEST BATIN: Wilson çerçevesi bağımsız PION risk faktörüdür (OR ~4.3) ve abdominal/venöz basıncı artırır; Jackson omurga masasında karın tamamen boşlukta sarkıtılarak VCI basısı ve Batson epidural venöz kanaması sıfırlanır.',
      'BAŞ SEVİYESİ VE ASA POVL 2019: Baş nötral pozisyonda ve KALP SEVİYESİNDE veya HAFİF YUKARISINDA (hafif ters Trendelenburg; ASLA baş aşağı pozisyon verilmez!) ProneView aynalı kaskta tutulur. Göz küreleri her 15-30 dakikada kontrol edilerek sıfır orbital bası (CRAO önlemi) doğrulanır.',
      'Kollar baş yanında "Superman" pozisyonunda (< 90° omuz abdüksiyonu) veya gövde yanında nötral sarılır; ulnar oluk ve brakiyal pleksus jel pedlerle korunur.',
      'Göğüs ve krista iliaka pedleri kemik yapılara denk getirilir; meme dokusu ve erkeklerde genital organlar basıdan korunur.',
      'Dizler hafif fleksiyonda tutulur; fibula başındaki peroneal sinir jel pedlerle desteklenir; ayak parmaklarının masaya basması önlenir.'
    ],
    anesthesiaManagement: [
      'Preoperatif Antibiyotik ve PONV Profilaksisi:',
      '  - İnsizyondan 30-60 dk önce IV Sefazolin 2 g (>120 kg 3 g); her 3-4 saatte bir veya > 1500 mL kan kaybında ek doz (redosing).',
      '  - PONV profilaksisi: İndüksiyonda Deksametazon 4-8 mg (cerrah/diyabet gözetilerek) + kapanışta Ondansetron 4 mg.',
      'İndüksiyon ve Hava Yolu:',
      '  - IV Propofol (1.5-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + orta etkili non-depolarizan kas gevşetici (Rokuronyum 0.5-0.6 mg/kg; gerekirse İONM öncesi Sugammadeks ile tam dönüşüm).',
      '  - Videolaringoskop ile atravmatik entübasyon; spiral (zırhlı) endotrakeal tüp takılır.',
      '  - TcMEP BITE BLOCK: Her iki molar diş arasına YUMUŞAK GAZLI BEZ RULO ısırma bloğu yerleştirilir (SERT PLASTİK GUEDEL AIRWAY KESİNLİKLE KULLANILMAZ!).',
      '  - Entübasyondan sonra KESİNLİKLE nöromusküler bloker verilmez (kürarsız idame; TOF 4/4).',
      'İdame (Kürarsız TIVA + PROSPECT 2021 Multimodal Adjuvanlar):',
      '  - Propofol (90-150 mcg/kg/dk) + Remifentanil (0.1-0.3 mcg/kg/dk) TIVA. N₂O (AZOT PROTOKSİT) KESİNLİKLE YASAKTIR! Volatil ajanlardan kaçınılır.',
      '  - PROSPECT Adjuvanlar: Düşük doz IV Ketamin (0.5 mg/kg bolus + 0.1-0.2 mg/kg/saat infüzyon), IV Lidokain infüzyonu (1-1.5 mg/kg bolus + 1-2 mg/kg/saat — ESP/TLIP bloğu yapılacaksa LAST sınırı gözetilerek blok öncesi durdurulur) ve çok seviyeli füzyon/kronik opioid kullananlarda indüksiyonda tek doz IV Metadon (0.1-0.2 mg/kg) seçeneği.',
      'Kanıta Dayalı TXA ve Sıvı/Transfüzyon Yönetimi:',
      '  - İndüksiyonda Traneksamik Asit 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk), operasyon boyunca 1-2 mg/kg/saat sürekli infüzyon (nöbet öyküsü, aktif VTE, renal doz ayarı ve insidental durotomi/BOS temasında nöbet riski gözetilir).',
      '  - Masif kanamada aşırı kristaloid yüklemesinden kaçınılarak kolloid + kristaloid dengesi korunur (POVL önlemi); stabil hastada Hb 7-8 g/dL, aktif iskemi/masif hemoraji/İONM düşüşünde Hb 8-9 g/dL hedeflenir.',
      'Çok Seviyeli Pedikül ve S2AI Vidalarında Tetiklenmiş EMG Protokolü:',
      '  - Eşik > 10-12 mA: Güvenli kemik içi vida; Eşik 6-10 mA: Şüpheli kortikal incelme; Eşik < 6 mA: Medial korteks delinmesi (pedicle breach) — vida derhal çıkarılıp revize edilir!',
      'PMMA Çimentolu Pedikül Vidaları — BCIS ve Pulmoner Çimento Embolisi Protokolü:',
      '  - Fenestre vidalara PMMA enjeksiyonu öncesi cerrah anestezi ekibini uyarır: FiO₂ 1.0 yapılır, normovolemi sağlanır, floroskopi ile paravertebral/epidural venöz kaçak izlenir, düşük viskozitede yüksek basınçlı enjeksiyondan kaçınılır.',
      '  - Ani EtCO₂ düşüşü, SpO₂ düşüşü, RV yetmezliği veya hipotansiyon gelişirse enjeksiyon DERHAL durdurulur; Noradrenalin/Adrenalin ve RV desteği başlatılır.',
      'Venöz Hava Embolisi (VAE) Yönetimi:',
      '  - Ani EtCO₂ düşüşü, hipoksi ve hipotansiyonda: Cerrahi sahayı salin/ıslak kompresle kapla, FiO₂ 1.0 ver (N₂O zaten kapalı), venöz basıncı artır, vazopressör başla ve CVC\'den hava aspire et.',
      'Hemodinami ve 7 Basamaklı İONM Düşüş Kontrol Listesi (tcMEP/SSEP > %50 kayıp):',
      '  - Permisif hipotansiyon KESİNLİKLE YASAKTIR! Rutin füzyonda MAP ≥ 75-80 mmHg; PSO/SPO osteotomi ve deformite redüksiyonunda MAP ≥ 85-90 mmHg tutulur.',
      '  - İONM Düşüşünde: (1) Cerraha bildir ve redüksiyonu/kompresyonu gevşet, vida pozisyonunu kontrol et; (2) MAP ≥ 85-90 mmHg yükselt; (3) FiO₂ 1.0, PaCO₂ 35-40 mmHg; (4) Hb ≥ 8-9 g/dL düzelt; (5) Normotermi (>36.0°C), pH ve iCa²⁺ optimize et; (6) Volatil/N₂O kapalı, aşırı derin propofol azalt, TOF 4/4 doğrula; (7) Elektrot ve ekstremite pozisyonunu kontrol et — yanıt dönmezse implant/osteotomi revizyonu.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; prone pozisyonda baş hareketlerinde lümenin kıvrılmasını engeller.',
      'TcMEP sırasında dil, dudak ve diş hasarını önlemek için bilateral YUMUŞAK GAZLI BEZ RULO molar ısırma bloğu yerleştirilir (sert plastik Guedel airway KESİNLİKLE KULLANILMAZ).',
      'Tüp cilde su geçirmez flasterlerle iki taraflı tespit edilir; kaf basıncı 20-25 cmH₂O\'da tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Supin Bazal İONM, Jackson Masasına Prone Pozisyonlama (Baş Kalp Seviyesinde/Yukarısında), Prone Bazal İONM ve Floroskopi Doğrulaması.',
      '2. Posterior Geniş Orta Hat Kesisi ve Çok Seviyeli Paraspinal Kas Diseksiyonu.',
      '3. Dekompresyon (Laminektomi, Foraminotomi) ve Diskektomi Fazı.',
      '4. TLIF / PLIF Kafes Yerleşimi ve Ön Kolon Desteğinin Oluşturulması.',
      '5. Çok Seviyeli Bikortikal (ve gerekirse Fenestre PMMA Çimentolu — BCIS alarmı!) Pedikül Vidalarının Yerleştirilmesi ve Tetiklenmiş EMG Testi.',
      '6. Sakral (S1) ve Pelvik (S2AI / İliak) Vidaların Yerleştirilmesi (Siyatik çentik ve süperior gluteal arter kontrolü).',
      '7. Deformite Düzeltme Osteotomisi (SPO veya PSO — İONM ve MAP ≥ 85-90 mmHg alarmı!).',
      '8. Titanyum/Kobalt-Krom Rodların Montajı, Sagital Lordozun Verilmesi ve Posterolateral Greftleme.',
      '9. Normotansif Hemostaz Kontrolü, Valsalva Manevrası (Dural kaçak testi), Çift Subfasial Dren ve Kapanış.'
    ],
    emergenceNotes: [
      'KONTROLLÜ UYANMA VEYA YOĞUN BAKIM TRANSFERİ: 6 saatten uzun süren, masif kanamalı (> 1500-2000 mL) veya çok seviyeli PSO osteotomisi yapılan olgularda yüz ve larinks ödemi riski nedeniyle hasta ameliyathanede ekstübe edilmeyebilir; entübe olarak Yoğun Bakıma transfer edilir.',
      'Kaf Kaçak Testi (Cuff-Leak Test): Ameliyathanede ekstübasyon planlanıyorsa tüp kafı indirilerek pozitif hava kaçağı doğrulanmalıdır.',
      'Pürüzsüz Uyanma: Geniş kemik yüzeylerinden ve epidural pleksustan reaktif kanamayı önlemek için düşük doz Remifentanil veya IV Lidokain (LAST sınırı gözetilerek) ile öksürmesiz ekstübasyon sağlanır.',
      'AMELİYATHANEDE ANINDA NÖROLOJİK MUAYENE: Hasta uyanır uyanmaz her iki bacakta L4 (ayak bileği dorsifleksiyonu), L5 (başparmak dorsifleksiyonu) ve S1 (plantar fleksiyon) motor hareketi teyit edilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Agresif Opioid-Koruyucu Analjezi Protokolü (PROSPECT 2021):',
      '  - Ultrason Eşliğinde İki Taraflı Çok Seviyeli Erektör Spina Plan (ESP) Bloğu veya TLIP Bloğu ya da Cerrahi Kapanışta Paraspinal Lokal Anestezik İnfiltrasyonu (Bupivakain/Ropivakain — LAST sınırı gözetilerek).',
      '  - Seçilmiş majör füzyon olgularında intratekal morfin (0.1-0.2 mg) veya indüksiyonda tek doz IV Metadon (0.1-0.2 mg/kg) seçeneği.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kısa Süreli NSAİİ veya COX-2 İnhibitörü (≤ 48-72 saat; hemostaz, renal fonksiyon ve cerrah onayıyla — kısa süreli kullanımın füzyonu anlamlı bozmadığı gösterilmiştir; uzun süreli yüksek doz NSAİİ\'den kaçınılır).',
      '  - İntraoperatif/Erken Postop Düşük Doz IV Ketamin (0.05-0.1 mg/kg/saat — özellikle kronik opioid kullanan hastalarda).',
      '  - Kurtarma IV Hasta Kontrollü Analjezi (IV PCA): Morfin veya Fentanil ile BAZALSIZ, YALNIZCA TALEP-KONTROLLÜ (demand-only) protokol (opioid PCA ile eşzamanlı benzodiazepin KULLANILMAZ!).',
      '  - Kas Spazmları İçin: Tizanidin veya Baklofen / Metokarbamol.'
    ],
    prospectRecommendations: [
      'PROSPECT Kompleks Omurga Cerrahisi Kılavuzları (Waelkens et al., 2021): Düzenli parasetamol, kısa süreli NSAİİ/COX-2 inhibitörü, intraoperatif IV ketamin/lidokain/tek doz metadon, rejyonel fasyal plan blokları (ESP/TLIP) / yara infiltrasyonu ve bazalsız kurtarma IV PCA kombinasyonu opioid tüketimini, PONV\'u ve paralitik ileusu belirgin azaltır.'
    ],
    erasRecommendations: [
      'ERAS® Kompleks Omurga Füzyonu Kılavuzları (Debono et al., 2021):',
      '  - Yoğun Bakım / Yakın İzlem: İlk 24 saat saatlik alt ekstremite motor muayenesi (L2-S1), hemodinamik stabilite ve drenaj takibi (Akut Epidural Hematom tespiti!).',
      '  - Glukoz Kontrolü ve Normotermi: Kan glukozu 140-180 mg/dL aralığında tutulur.',
      '  - Erken Foley Kateter Çekilmesi ve Drenaj Yönetimi: Nörojenik mesane/kauda ekuina yoksa mesane sondası postop 1. günde çekilir; çift subfasial dren 24 saatlik debi < 100 mL olduğunda (48-72. saatte) sonlandırılır.',
      '  - Derin Ven Trombozu (DVT) Profilaksisi: IPC çorapları ameliyathaneden itibaren aralıksız çalıştırılır; hemostaz teyidiyle postop 24. saatte profilaktik LMWH başlanır.',
      '  - Erken Enteral Beslenme ve Mobilizasyon: Postop 4. saatte berrak sıvılarla oral alım; hastalar postop 1. günde fizyoterapist eşliğinde ayağa kaldırılır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Posterior Lumbar Fusion and Instrumentation. Philadelphia: Wolters Kluwer.',
    erasReference: 'Debono, B., Wainwright, T. W., Wang, M. Y., Sigmundsson, F. G., Yang, M. M. H., Smid-Nanninga, H., Bonnal, A., Le Huec, J. C., Fawcett, W. J., Ljungqvist, O., Lonjon, G., & de Boer, H. D. (2021). Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations. The Spine Journal, 21(5), 729–752.',
    prospectReference: 'Waelkens, P., Alsabbagh, E., Sauter, A., Joshi, G. P., & Beloeil, H.; PROSPECT Working Group of the European Society of Regional Anaesthesia and Pain Therapy (ESRA). (2021). Pain management after complex spine surgery: A systematic review and procedure-specific postoperative pain management recommendations. European Journal of Anaesthesiology, 38(9), 985–994.',
    otherReferences: [
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. (2019). Practice advisory for perioperative visual loss associated with spine surgery 2019: An updated report. Anesthesiology, 130(1), 12–30.',
      'Carson, J. L., Stanworth, S. J., Guyatt, G., et al. (2023). Red blood cell transfusion: 2023 AABB International Guidelines. JAMA, 330(19), 1892–1902.',
      'Donaldson, A. J., Thomson, H. E., Harper, N. J., & Kenny, N. W. (2009). Bone cement implantation syndrome. British Journal of Anaesthesia, 102(1), 12–22.',
      'Kebaish, K. M. (2010). Sacropelvic fixation: Techniques and complications. Spine, 35(25), 2245–2251.'
    ]
  }
};
