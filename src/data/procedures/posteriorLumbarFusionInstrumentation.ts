import { ProcedureDefinition } from '../../types/procedures';

/**
 * Posterior Lomber Füzyon ve Enstrümantasyon: Çok Seviyeli Pedikül Vidaları, Pelvik Fiksasyon (S2AI/İliak), Cisimlerarası Füzyon (TLIF/PLIF) ve Deformite Osteotomileri (L1-Pelvis)
 * (Posterior Lumbar Fusion and Instrumentation: Multilevel Pedicle Screws, Pelvic Fixation, Interbody Fusion, and Deformity Osteotomies)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Spine Surgery: Posterior Lumbar Fusion and Instrumentation, pp. 548-554),
 * North American Spine Society (NASS), Scoliosis Research Society (SRS),
 * International Society for the Advancement of Spine Surgery (ISASS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Kompleks Spinal Füzyon ve Deformite Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const posteriorLumbarFusionInstrumentation: ProcedureDefinition = {
  id: 'posterior-lumbar-fusion-instrumentation',
  name: 'Posterior Lomber Füzyon ve Enstrümantasyon: Çok Seviyeli Pedikül Vidaları, Pelvik Fiksasyon (S2AI/İliak), Cisimlerarası Füzyon (TLIF/PLIF) ve Deformite Osteotomileri (L1-Pelvis)',
  shortCode: 'LOMBER-POST-FUS',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Lomber ve lumbosakral omurgada çok seviyeli instabilite, erişkin omurga deformitesi (dejeneratif skolyoz, lomber düzleşme / flat-back sendromu), yüksek dereceli spondilolistezis, psödoartroz revizyonu veya instabil travma ve tümör olgularında uygulanan majör posterior rijit enstrümantasyon ve kemik füzyon ameliyatıdır. Posterior orta hat boyunca geniş diseksiyonla multifidus ve uzun paraspinal kaslar subperiosteal olarak faset eklemlerine ve transvers proçes uçlarına kadar iki taraflı açılır. Gereken seviyelerde kanal ve foramen dekompresyonu yapıldıktan sonra, disk mesafelerine lordoz kazandırıcı interbody kafesler (TLIF/PLIF) yerleştirilir. Omurga stabilitesini sağlamak ve sagital dengeyi restore etmek amacıyla çok seviyeli bikortikal lomber pedikül vidaları gönderilir; L5-S1 seviyesindeki yüksek biyomekanik kesme kuvvetlerine karşı sakral (S1) vidalara ilave olarak ilium kanatlarına S2-Alar-İliak (S2AI) veya iliak vidalar (pelvik fiksasyon) eklenir. Şiddetli sagital dengesizliklerde Smith-Petersen (SPO) veya Pedikül Çıkarma Osteotomisi (PSO) yapılarak titanyum rodlar ile rijit montaj ve posterolateral otolog/allogreft kemik greftlemesi tamamlanır.',
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
    crossMatchRequirement: 'En az 4 Ünite Eritrosit Süspansiyonu (ES), 2-4 Ünite Taze Donmuş Plazma (TDP) ve 1 Aferez Trombosit hazır bulundurulmalıdır; Traneksamik Asit (TXA) infüzyonu ve Cell Saver cihazı ZORUNLUDUR',
    transfusionProbability: '%50 - %80 (Pelvik fiksasyon ve 4 seviye üzeri füzyonlarda %85)',
    criticalBleedingSources: [
      'Geniş Paraspinal Kas Yatağı ve Fasya Sıyırma Alanları (Multifidus, Longissimus ve İliokostalis)',
      'Pedikül Giriş Noktaları ve Spongiyöz Kemik Kanalları (Vida kanallarından sürekli kemik iliği sızıntısı)',
      'S2AI ve İliak Vida Girişleri (İliak kanat kansellöz yatağı ve siyatik çentik komşuluğunda süperior gluteal damarlar)',
      'Epidural Batson Venöz Pleksusu (Foraminotomi, TLIF penceresi ve dekompresyonda dural kese çevresi)',
      'PSO / SPO Osteotomi Yüzeyleri (Vertebra korpusunun kama şeklinde kesilmesi sırasında kemik ve epidural venöz kan gölü)',
      'Segmental Lomber Damarlar ve Anterior Damar Yaralanması Riski (Diskektomi aletlerinin anterior anulusu delerek ana damarları yırtması)'
    ],
    hemostasisStrategies: [
      'Prone Pozisyonda Batın Askısı: Jackson omurga masasında karın tamamen boşlukta sarkıtılarak VCI ve Batson venöz basıncı sıfırlanmalıdır',
      'Yüksek Doz İntraoperatif Traneksamik Asit (TXA) Protokolü: İndüksiyonda 20-30 mg/kg İV yükleme, operasyon boyunca 2-5 mg/kg/saat sürekli infüzyon',
      'Steril Kemik Mumu (Bone Wax): Açılan tüm pedikül vida delikleri ve osteotomi kenarlarına anında yoğun kemik mumu tıkama',
      'Topikal Hemostatikler: FloSeal, Surgicel, Gelfoam + Trombin emdirilmiş pamuk tamponlar',
      'Cell Saver (Kan Kurtarma Cihazı) ile yıkanmış eritrosit ototransfüzyonu (kan kaybının %40-60\'ını geri kazandırır)',
      'Hedefe Yönelik Koagülasyon Yönetimi: Fibrinojen > 150-200 mg/dL, İyonize Kalsiyum > 1.15 mmol/L, Trombosit > 100.000/mm³ tutulması',
      'Derin subfasial çift negatif basınçlı kapalı drenaj'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Dengeli Genel Endotrakeal Anestezi (GETA) + TIVA (Total İntravenöz Anestezi: Propofol + Remifentanil) — Sürekli tcMEP, SSEP ve Pedikül/Pelvik Vida Tetiklenmiş EMG takibi için MUTLAK STANDARTTIR'
    ],
    alternative: [
      'TIVA Protokolüne Düşük Doz Ketamin İnfüzyonu Eklenmesi (0.1-0.2 mg/kg/saat): N-metil-D-aspartat (NMDA) reseptör antagonisti olarak intraoperatif remifentanil hiperaljezisini önler ve İONM sinyallerini baskılamaz',
      'İnhalasyon Ajanları (< 0.3 MAC Sevofluran): Yalnızca stabil İONM sinyali olan merkezlerde yardımcı olarak; kas gevşetici KESİNLİKLE verilmez'
    ],
    notes: 'POSTERİOR LOMBER FÜZYON VE ENSTRÜMANTASYONDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) S2AI / İLİAK VİDA PELVİK ANKORAJINDA SİYATİK ÇENTİK VE SÜPERİOR GLUTEAL ARTER TEHLİKESİ — Uzun füzyonlarda lumbosakral bileşkeyi korumak için S2-alar-iliak (S2AI) veya iliak vidalar takılır. Vida iliak kanat dışına taşarsa veya siyatik çentikten (greater sciatic notch) çıkarsa süperior gluteal arteri yırtarak pelviste durdurulamaz arteriyel masif kanama yaratır veya siyatik siniri ezer. Floroskopi açısı dikkatle takip edilmeli, pelvik vidalama esnasında anestezi ekibi ani hipotansiyon ve derin venöz/arteriyel kanama belirtilerini gözlemlemelidir. (2) ÇOK SEVİYELİ PEDİKÜL VİDALARINDA TETİKLENMİŞ EMG (TRIGGERED EMG) VE KÜRARSIZ TIVA ZORUNLULUĞU — 8 ila 16 pedikül vidasının her biri gönderilirken medial korteks delinme (pedicle breach) riski taşır; medial penetrasyon L1-S1 sinir köklerine veya kauda ekuinaya basarak parezi yaratır. Cerrahi stimülasyon probu ile vida başına akım verilip eşik değer test edilir (< 6-8 mA alarm!). Bu elektriksel kas yanıtını güvenle yakalamak için entübasyon sonrası KAS GEVŞETİCİ KESİNLİKLE VERİLMEZ (TOF 4/4) ve anestezi TIVA ile sürdürülür. (3) 5 SAATİ AŞAN PRONE CERRAHİDE MASİF FÜZYON İLİŞKİLİ POVL (POSTOPERATİF GÖRME KAYBI) SAVUNMASI — Uzun ameliyat süresi (> 5-6 saat), masif kan kaybı (> 1000-1500 mL), aşırı kristaloid yüklenmesi ve bağımlı pozisyon İskemik Optik Nöropatiye (ION) ve Santral Retinal Arter Oklüzyonuna (CRAO) yol açarak KALICI KÖRLÜK yapar! Baş ProneView aynalı kaskında asılı tutulur; göz küreleri her 15-30 dakikada bir kontrol edilir, hematokrit > %28 (Hgb > 9 g/dL) ve MAP > 75-80 mmHg korunur; kolloid/kristaloid dengesi gözetilir. (4) OSTEOTOMİ (PSO/SPO), SAGİTAL DÜZELTME VE ANİ KORD/KÖK İSKEMİSİNDE İONM ALARMI — Skolyoz ve düz bel deformitelerinde kemik kama çıkarılıp (PSO) omurga hiperekstansiyona zorlandığında dural kese katlanır ve sinir kökleri gerilir. tcMEP/SSEP sinyallerinde > %50 düşüş olursa anestezi derhal MAP > 85-90 mmHg seviyesine çıkarmalı, cerrah kompresyonu gevşetmeli ve implantları rahatlatmalıdır. (5) MASİF KANAMA, KOAGÜLOPATİ VE DVT İLE EPİDURAL HEMATOM DENGESİ — Çok seviyeli dekortikasyon ve osteotomi masif kanamaya yol açar; TXA infüzyonu ameliyat başından itibaren uygulanmalı, Cell Saver kullanılmalı, seri kan gazında iyonize kalsiyum ve fibrinojen replase edilmelidir. Postoperatif dönemde pelvik venöz staza bağlı yüksek DVT riskine karşı IPC çorapları sürdürülürken, erken dönemde kauda ekuinayı sıkıştırabilecek akut epidural hematoma karşı cerrahi hemostaz teyit edilmeden antikoagülan verilmemeli, saatlik alt ekstremite nörolojik muayenesi yapılmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji / Nöroloji Taban Konsültasyonu: Çok seviyeli lumbosakral kök fonksiyonlarının ayrıntılı belgelenmesi; L2 (kalça fleksiyonu), L3-L4 (kuadriseps diz ekstansiyonu, patella refleksi), L5 (ekstansör hallusis longus başparmak dorsifleksiyonu), S1 (gastroknemius plantar fleksiyonu, aşil refleksi); perianal duyu ve sfinkter tonusu.',
      'Kardiyoloji Konsültasyonu: İleri yaş dejeneratif deformite hastalarında koroner arter hastalığı, kalp yetmezliği ve eko (EF, diyastolik disfonksiyon, kapak patolojileri) tespiti; uzun prone pozisyona kardiyovasküler tolerans.',
      'Göğüs Hastalıkları Konsültasyonu: Lomber skolyoz ve kifozun göğüs kafesine yansıması (restriktif akciğer patern); spirometri ve kan gazı değerlendirmesi.',
      'Kemik Dansitometrisi (DEXA Taraması) & Endokrinoloji: Şiddetli osteoporoz varlığında (T-skoru < -2.5) vidaların kemikten sıyrılmasını önlemek için çimentolu pedikül vidaları (fenestre vidalar + polimetilmetakrilat [PMMA]) hazırlığı.',
      'Hematoloji / Kan Bankası: Beklenen masif kanama için en az 4 Ünite Eritrosit ve 4 Ünite TDP rezervasyonu.'
    ],
    historyAndPhysical: [
      'Nörolojik Taban Muayenesi: Mevcut paraparezi, düşük ayak ve yürüme mesafesi (preoperatif kladikasyon tablosu).',
      'Deformite Derecesi: Sagital vertikal aks (SVA), pelvik insidans (PI) ve lomber lordoz (LL) uyumsuzluğu; hastanın ayakta durma postürü.',
      'Antikoagülan / Antiagregan Öyküsü: Klopidogrel, Tikagrelor, DOAK (Rivaroksaban, Apiksaban) ve LMWH kesilme zamanlarının protokole uygunluğu.',
      'Önceki Cerrahi ve İmplant Varlığı: Eski rod/vidaların çıkarılması (donanım revizyonu) diseksiyon süresini ve kanamayı katlar.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen düzeyi (bazal > 200 mg/dL olmalıdır).',
      'En az 4 Ünite ES ve 4 Ünite TDP Cross-Match hazırlığı.',
      'Serum Biyokimyası: Elektrolitler (Na, K, Ca, Mg), böbrek fonksiyon testleri (üre, kreatinin).',
      'Tüm Omurga Boy Ayakta Grafileri (Spinosakral parametreler: SVA, PI-LL), Dinamik Grafiler.',
      'Lomber ve Pelvik İnce Kesit BT: Pedikül kemik çapları, S2AI trajesi kemik koridoru ve kemik kalitesi.',
      'Lomber MRG: Kanal bası seviyeleri, foraminal stenoz, dural kese genişliği.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (ST segment iskemi analizi), SpO2, EtCO2 ve Nazofaringeal Sıcaklık.',
      'İnvaziv Radyal Arter Basıncı İzlemi (A-Line): Pozisyonel hipotansiyonun engellenmesi, MAP > 75-80 mmHg hedeflenmesi, saatlik kan gazı, Hb/Hct, laktat, iyonize kalsiyum ve glukoz takibi (ZORUNLU).',
      'Santral Venöz Kateter (CVC) ve Santral Venöz Basınç (CVP): Masif kanama resüsitasyonu, yüksek konsantrasyonlu vazopressör/inotrop infüzyonu için.',
      'İntraoperatif Nöromonitörizasyon (İONM) Sistemi:',
      '  - Bilateral Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP): L2-S1 miyotomlarından (kuadriseps, tibialis anterior, EHL, abduktor hallusis/gastroknemius) devamlı kayıt.',
      '  - Somatosensoriyel Uyarılmış Potansiyeller (SSEP): Posterior tibial sinir uyarımı ile dorsal kolon iletimi.',
      '  - Serbest Çalışan EMG (Free-run EMG): Cerrahi aletin kök manipülasyonunda anlık nöronal deşarj uyarısı.',
      '  - Tetiklenmiş Vida EMG (Triggered EMG): Tüm lomber, sakral ve pelvik vidaların medial duvar bütünlüğünü test etmek için elektriksel uyarım.',
      'Nöromusküler İleti Monitörizasyonu (TOF): Entübasyon sonrası kas gevşetici kesinlikle verilmez; TOF 4/4 (%100) korunur.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (14-16G) periferik intravenöz damar yolu',
      'Santral Venöz Kateter (Üç lümenli, juguler veya subklavyan)',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı Sıvı Hatları',
      'Cell Saver (Kan Kurtarma Cihazı) steril hatta aspiratöre bağlı ve aktif'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon — Jackson Omurga Masası (Karın Tamamen Asılı)',
    patientPositionDetails: [
      'BATININ TAMAMEN BOŞLUKTA SARKITILMASI: Abdominal duvara binen herhangi bir temas Vena Cava Inferior\'a bası yapar; venöz kan Batson epidural pleksusuna yönlenerek cerrahi sahayı kan gölüne çevirir.',
      'SIFIR OKÜLER BASI: Baş ProneView aynalı kask sistemine alınır; göz küreleri her 15-30 dakikada bir kontrol edilir, orbital bası kesinlikle sıfır tutulur.',
      'Kollar baş yanında "Superman" pozisyonunda veya gövde yanında nötral sarılır; omuz abdüksiyonu < 90° tutularak brakiyal pleksus gerilmesi önlenir.',
      'Göğüs ve krista iliaka pedleri kemik yapılara denk getirilir; meme dokusu, klavikula ve erkek hastalarda genital organlar (testisler) basıdan korunur.',
      'Dizler hafif fleksiyonda tutulur; fibula başındaki peroneal sinir jel pedlerle desteklenir; ayak parmaklarının masaya basması önlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - İV Propofol (2-2.5 mg/kg) + Fentanil (3-4 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + kısa etkili kas gevşetici (Rokuronyum 0.6 mg/kg).',
      '  - Videolaringoskop ile atravmatik entübasyon; spiral (zırhlı) endotrakeal tüp takılır.',
      '  - Entübasyondan sonra KESİNLİKLE nöromusküler bloker verilmez (kürarsız idame).',
      'İdame: TIVA Protokolü (Propofol + Remifentanil):',
      '  - Propofol infüzyonu (90-150 mcg/kg/dk) + Remifentanil infüzyonu (0.1-0.3 mcg/kg/dk).',
      '  - Ketamin infüzyonu (0.1-0.2 mg/kg/saat) ile remifentanil toleransı ve hiperaljezisi önlenir.',
      '  - İnhalasyon gazlarından kaçınılır (< 0.3 MAC) veya hiç kullanılmaz.',
      'Yüksek Doz Traneksamik Asit (TXA) Protokolü:',
      '  - İndüksiyonda 20-30 mg/kg İV bolus (15-20 dakikada), cerrahi boyunca 2-5 mg/kg/saat sürekli infüzyon.',
      '  - Cilt kapanışına kadar sürdürülür.',
      'Çok Seviyeli Pedikül ve S2AI Vidalarında Tetiklenmiş EMG Protokolü:',
      '  - Her bir vidaya monopolar stimülasyon probu dokundurulup akım verilir:',
      '    * Eşik > 10-12 mA: Güvenli kemik içi vida pozisyonu.',
      '    * Eşik 6-10 mA: Şüpheli kortikal çatlak / incelme.',
      '    * Eşik < 6 mA: Medial korteks delinmiş (pedicle breach); vida omurilik veya kök kanalına basmaktadır, derhal çıkarılıp revize edilmelidir!',
      'Osteotomi (PSO) ve Deformite Redüksiyonunda Kord Koruma Protokolü:',
      '  - Vertebra kaması çıkarılıp lordoz verilirken kord gerilir; bu evrede MAP KESİNLİKLE > 85-90 mmHg tutulmalıdır (Noradrenalin desteği).',
      '  - MEP genliğinde > %50 düşüş olursa derhal cerraha haber verilir; redüksiyon gevşetilir, hematokrit > %28 ve MAP > 90 mmHg seviyesine çıkarılır.',
      'S2AI / İliak Vida Yerleşimi Takibi:',
      '  - S2AI vidası gönderilirken siyatik çentik perforasyonu ve süperior gluteal arter kanaması şüphesi varsa hemodinamik stabilite ve cerrahi aspirasyon yakın takip edilir.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; prone pozisyonda fleksiyon ve baş hareketlerinde lümenin kıvrılmasını engeller.',
      'Isırma bloğu (bite block) yerleştirilerek tüpün dişlerle ezilmesi önlenir.',
      'Tüp cilde terlemeye dayanıklı su geçirmez flasterlerle tespit edilir; kaf basıncı 20-25 cmH2O\'da tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma ve Floroskopi ile Seviyelerin Doğrulanması.',
      '2. Posterior Geniş Orta Hat Kesisive Çok Seviyeli Paraspinal Kas Diseksiyonu.',
      '3. Dekompresyon (Laminektomi, Foraminotomi) ve Diskektomi Fazı.',
      '4. TLIF / PLIF Kafes Yerleşimi ve Ön Kolon Desteğinin Oluşturulması.',
      '5. Çok Seviyeli Bikortikal Pedikül Vidalarının Yerleştirilmesi ve Tetiklenmiş EMG ile Test Edilmesi.',
      '6. Sakral (S1) ve Pelvik (S2AI / İliak) Vidaların Yerleştirilmesi (Siyatik çentik kontrolü).',
      '7. Deformite Düzeltme Osteotomisi (Smith-Petersen veya Pedikül Çıkarma Osteotomisi [PSO] — İONM alarmı!).',
      '8. Titanyum/Kobalt-Krom Rodların Montajı, Sagital Lordozun Verilmesi ve Posterolateral Greftleme.',
      '9. Titiz Hemostaz Kontrolü, Valsalva Manevrası (Dural kaçak testi), Çift Subfasial Dren ve Kapanış.'
    ],
    emergenceNotes: [
      'KONTROLLÜ UYANMA VEYA YOĞUN BAKIM TRANSFERİ: 6 saatten uzun süren, masif kanamalı (> 1500-2000 mL) veya çok seviyeli PSO osteotomisi yapılan olgularda yüz ve larinks ödemi riski nedeniyle hasta ameliyathanede ekstübe edilmeyebilir; entübe olarak Yoğun Bakıma transfer edilir.',
      'Kaf Kaçak Testi: Ameliyathanede ekstübasyon planlanıyorsa tüp kafı indirilerek pozitif hava kaçağı doğrulanmalıdır.',
      'Pürüzsüz Uyanma: Geniş kemik yüzeylerinden ve epidural pleksustan reaktif kanamayı önlemek için IV Lidokain (1.5 mg/kg) ile öksürük tamamen engellenir.',
      'AMELİYATHANEDE ANINDA NÖROLOJİK MUAYENE: Hasta uyanır uyanmaz her iki bacakta ayak bileği ve başparmak dorsifleksiyonu (L4, L5) ve plantar fleksiyonu (S1) teyit edilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Agresif Opioid Koruyucu Analjezi Protokolü:',
      '  - Geniş cerrahi insizyon, çok seviyeli kas traksiyonu ve pelvik vida girişleri şiddetli postoperatif ağrı yaratır.',
      '  - Ultrason Eşliğinde İki Taraflı Çok Seviyeli Erektör Spina Plan (ESP) Bloğu veya TLIP Bloğu (Bupivakain %0.25).',
      '  - Cerrahi Kapanışta Kas Yataklarına ve Fasyaya Uzun Etkili Lokal Anestezik İnfiltrasyonu (Bupivakain + Epinefrin).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - IV Deksketoprofen / İbuprofen (Cerrahi ve kemik kaynaması onayı ile kısa süreli multimodal destek).',
      '  - İV Hasta Kontrollü Analjezi (IV PCA): Morfin veya Fentanil ile bazalsız yalnızca bolus protokolü.',
      '  - Şiddetli Kas Spazmları İçin: Tizanidin veya Baklofen.'
    ],
    prospectRecommendations: [
      'PROSPECT Kompleks Spinal Füzyon Kılavuzları: Cerrahi alan lokal infiltrasyonu, rejyonel fasyal plan blokları (ESP), sistemik parasetamol ve non-opioid analjeziklerin kombine kullanımı ameliyat sonrası opioid tüketimini %40-50 azaltır; postoperatif bulantı-kusmayı (PONV), sedasyonu, üriner retansiyonu ve paralitik ileusu belirgin engeller.'
    ],
    erasRecommendations: [
      'ERAS Kompleks Omurga Füzyonu ve Deformite Kılavuzları:',
      '  - Yoğun Bakım Takibi: İlk 24 saat YBÜ\'de saatlik alt ekstremite motor muayenesi (L2-S1), hemodinamik stabilite ve drenaj takibi (Akut Epidural Hematom tespiti!).',
      '  - Drenaj Yönetimi: Çift subfasial dren saatlik debisi izlenir; 24 saatlik drenaj < 100 mL olduğunda (genellikle 48-72. saatte) sonlandırılır.',
      '  - Derin Ven Trombozu (DVT) Profilaksisi: Aralıklı Pnömotik Kompresyon (IPC) çorapları ameliyathaneden itibaren aralıksız çalıştırılır; hemostaz teyidiyle postoperatif 24. saatte profilaktik LMWH başlanır.',
      '  - Erken Mobilizasyon: Rijit pelvik ankoraj sağlanan hastalar ameliyat sonrası 1-2. günde lumbosakral korse (TLSO) eşliğinde fizyoterapistle ayağa kaldırılır.',
      '  - Erken Enteral Beslenme: Postoperatif 4. saatte berrak sıvılarla başlayıp tolere edildikçe hızla normal beslenmeye geçilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Spine Surgery: Posterior Lumbar Fusion and Instrumentation, pp. 548-554. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Debono, B., et al. (2021). Consensus statement for perioperative care in lumbar and cervical spine surgery: Enhanced Recovery After Surgery (ERAS®) Society recommendations. Spine, 46(11), 740-754.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Complex Lumbar Spine Fusion Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'North American Spine Society (NASS). Evidence-Based Clinical Guidelines for Multidisciplinary Spine Care: Lumbar Fusion for Degenerative Conditions.',
      'Scoliosis Research Society (SRS). Morbidity & Mortality Guidelines for Multilevel Posterior Instrumented Fusion and Pelvic Fixation.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement on Neuromonitoring and Neuromuscular Blockade Management in Pedicle Screw Placement.',
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. Practice advisory for perioperative visual loss associated with spine surgery. Anesthesiology, 130(1), 12-30.',
      'Kebaish, K. M. (2010). Sacropelvic fixation: Techniques and complications. Spine, 35(25), 2245-2251.',
      'Oskouian, R. J., et al. (2017). S2-alar-iliac screw fixation: A comprehensive review of anatomy, biomechanics, and clinical outcomes. World Neurosurgery.'
    ]
  }
};
