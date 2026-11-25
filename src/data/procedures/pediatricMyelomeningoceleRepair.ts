import { ProcedureDefinition } from '../../types/procedures';

/**
 * Yenidoğan Miyelomeningosel (Spina Bifida) ve Ensefalosel Onarımı
 *
 * Güncel Pediatrik/Neonatal Nöroanestezi Standartları, Lateks-Free Spina Bifida Kılavuzları ve
 * Coté & Cottrell-Patel Neonatal Nöroanestezi prensipleri referans alınarak yapılandırılmıştır.
 */
export const pediatricMyelomeningoceleRepair: ProcedureDefinition = {
  id: 'pediatric-myelomeningocele-repair',
  name: 'Yenidoğan Miyelomeningosel & Ensefalosel Onarımı',
  shortCode: 'PED-MİYELOMENİNGOSEL',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  secondarySpecialties: ['cocuk_cerrahisi'],
  categoryTag: 'Neonatal Pediatrik Nöroşirürji',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description:
    'Nöral tüp defekti (spina bifida aperta) ile doğan yenidoğanlarda yaşamın ilk 24–72 saati içinde bakteriyel menenjit ve ilerleyici nöral plakod hasarını önlemek amacıyla açık spinal kesenin (miyelomeningosel) veya kraniyal kesenin (ensefalosel) mikrocerrahi olarak kapatılması ameliyatıdır. Doğumdan itibaren KESİNLİKLE LATEKS-FREE ortam, keseyi ezmeden güvenli entübasyon, neonatal termoregülasyon, Süksinilkolin yasağı ve eşlik eden Chiari II / apne riski anestezi yönetiminin temel sütunlarıdır.',
  indications: [
    'Açık yenidoğan miyelomeningoseli (lomber, torakolomber veya sakral): Menenjit, BOS kaçağı ve sinir kökü hasarını önlemek için doğum sonrası ilk 24–72 saat içinde erken kapatma',
    'Oksipital, paryetal veya nazofaringeal ensefalosel (beyin dokusu ve meninkslerin kraniyal defektten herniasyonu)',
    'Büyük defektlerde plastik cerrahi işbirliğiyle fasyokutanöz / kas flebi ile kapatma ve eşzamanlı veya aşamalı hidrosefali/VP şant değerlendirmesi'
  ],
  averageDuration: '90 - 180 dk (Standart kapatma: 90-120 dk; Geniş flep/ensefalosel: 120-180 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '10 - 30 mL (Tipik küçük/orta miyelomeningosel); ancak geniş deri/kas flebi rotasyonu veya dev oksipital ensefalosel olgularında 50 - 100+ mL (3 kg yenidoğanda EBV ~250–270 mL olduğundan %20–40 kan hacmi kaybına ulaşabilir!)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta (Yenidoğan Küçük Kan Hacmi Nedeniyle Hızlı Hemodinamik Etki)',
    crossMatchRequirement: 'Kan grubu, maternal antikor taraması ve taze (<7 gün) Cross-Match\'li pediatrik Eritrosit Süspansiyonu (pedipak) hazır bulundurulmalıdır',
    transfusionProbability: '%10 - %20 (Standart kapatmada düşük; geniş flep veya dural sinüs komşuluğundaki ensefaloselde %30–50)',
    criticalBleedingSources: [
      'Geniş subkutanöz cilt/fasya serbestleştirme ve rotasyon flepleri (kümülatif sinsi sızıntı)',
      'Epidural venöz pleksus (prone pozisyonda karın basısı olursa ciddi venöz kanama artışı!)',
      'Oksipital ensefaloselde transvers sinüs veya torcula komşuluğu'
    ],
    hemostasisStrategies: [
      'Prone pozisyonda karnın tamamen serbest bırakılması (IVC basısını önleyerek epidural venöz kanamayı minimize eder)',
      'Titiz mikrocerrahi bipolar hemostaz ve tartılmış spançlarla (gravimetrik) hassas kan kaybı ölçümü (1 g ağırlık artışı ≈ 1 mL kan)',
      'Yenidoğanda hedef Hb genellikle >10–12 g/dL; kanama >%10–15 EBV\'ye yaklaşırsa ısıtılmış 10–15 mL/kg taze ES replasmanı'
    ]
  },

  // 3) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi (Sevofluran + Düşük Doz Fentanil/Remifentanil) — KESİNLİKLE LATEKS-FREE VE SÜKSİNİLKOLİNSİZ!'
    ],
    alternative: [
      'İntraoperatif spinal sinir kökü stimülasyonu (EMG) planlanıyorsa nöromusküler bloker idamesi yapılmadan (yalnızca entübasyonda düşük doz Rokuronyum/Atrakuryum veya derin Sevofluran/Remifentanil ile) genel anestezi'
    ],
    clinicalRationale:
      'Yenidoğan miyelomeningosel cerrahisi prone pozisyon, ince ve kırılgan neonatal fizyoloji, nöral plakodun korunması ve yüksek ısı/sıvı kaybı nedeniyle güvenli orotrakeal entübasyonla genel anestezi gerektirir. Spina bifida hastaları tekrarlayan cerrahiler ve kateterizasyonlar nedeniyle yaşam boyu lateks anafilaksisi açısından en yüksek risk grubudur; bu yüzden ilk ameliyatlarından itibaren %100 lateks-free protokol zorunludur.',
    notes:
      'Entübasyon sırasında nöral plakod (kese) üzerine ASLA ağırlık veya bası gelmemelidir (lateral dekübit pozisyonda veya keseyi tam içine alan yumuşak simit/donut yastık üzerinde entübasyon). Denervasyon nedeniyle Süksinilkolin hiperkalemik arrest riski taşır ve KESİNLİKLE KULLANILMAZ.',
    rulesTitle: 'YENİDOĞAN MİYELOMENİNGOSELDE VAZGEÇİLMEZ 5 KURAL',
    indispensableRules: [
      {
        number: 1,
        title: 'DOĞUMDAN İTİBAREN %100 LATEKS-FREE AMELİYATHANE!',
        content: 'Spina bifida hastalarında tekrarlayan tıbbi maruziyetlere bağlı lateks alerjisi ve fatal anafilaksi oranı %20–70\'lere ulaşabilir. İlk nefesten itibaren tüm eldivenler, solunum devreleri, kateterler, turnikeler, enjektör pistonları ve ilaç flakon kapakları KESİNLİKLE LATEKS-FREE olmalıdır.'
      },
      {
        number: 2,
        title: 'KESEYİ KORUYAN ENTÜBASYON (LATERAL VEYA DONUT YASTIK — ASLA BASI YOK!)',
        content: 'Sırtüstü düz yatırma nöral plakodu ezer, keseyi rüptüre eder ve BOS kaçağı/nörolojik hasara yol açar! Yenidoğan ya SOL/SAĞ LATERAL DEKÜBİT pozisyonda ya da keseyi tamamen boşlukta bırakacak yumuşak pedli SİMİT/DONUT yastık üzerinde sırtüstü desteklenerek entübe edilir.'
      },
      {
        number: 3,
        title: 'SÜKSİNİLKOLİN KESİNLİKLE YASAK + PRONE\'DA KARIN TAMAMEN SERBEST',
        content: 'Spinal kord malformasyonu ve alt ekstremite denervasyonu nedeniyle Süksinilkolin masif hiperkalemiye yol açabilir — KESİNLİKLE KULLANILMAZ (non-depolarizan Rokuronyum/Atrakuryum veya kas gevşeticisiz entübasyon). Prone pozisyonda göğüs ve pelvis altına rulolar konularak karın serbest bırakılır (IVC ve diyafram basısı önlenir).'
      },
      {
        number: 4,
        title: 'NEONATAL TERMOREGÜLASYON + İZOTONİK (%1-2 DEKSTROZLU) SIVI & GLUKOZ TAKİBİ',
        content: 'Açık nemli keseden evaporatif kayıp ve küçük vücut kütlesi yenidoğanı dakikalar içinde hipotermik yapar: Ameliyathane 26–28°C, radyant ısıtıcı, sıcak hava üflemeli alt-battaniye ve ısıtılmış sıvılar şarttır. Hipoglisemi ve hiponatremiyi önlemek için izotonik dengeli sıvı + %1–2 dekstroz idamesi verilir ve sık kan şekeri (hedef 60–150 mg/dL) ölçülür.'
      },
      {
        number: 5,
        title: 'CHİARİ II / HİDROSEFALİ / APNE RİSKİ + TRAMADOL & KODEİN YASAK',
        content: 'Miyelomeningoselli yenidoğanların >%80\'inde Chiari II malformasyonu ve hidrosefali bulunur; beyin sapı basısına bağlı vokal kord paralizisi, stridor ve postoperatif santral APNE riski yüksektir (NICU\'da en az 24–48 saat apne monitörizasyonu). Yenidoğanlarda Tramadol, Kodein, NSAİİ ve N2O KESİNLİKLE KULLANILMAZ.'
      }
    ]
  },

  // 4) Pre-operatif hazırlık
  preoperative: {
    consultations: [
      'Neonatoloji (NICU) & Pediatrik Nöroşirürji: Gestasyonel yaş (prematürite/apne riski), doğum ağırlığı, K vitamini uygulanması, eşlik eden Chiari II / hidrosefali, kardiyak/renal anomaliler ve postop NICU küvöz/ventilatör yatağı planlanır.',
      'Pediatrik Kardiyoloji (Üfürüm veya siyanoz varsa): Eşlik eden konjenital kalp hastalığı / PDA değerlendirmesi.'
    ],
    historyAndPhysical: [
      'Kesenin Durumu ve Lokalizasyonu: Kese rüptüre mi yoksa intakt mı? Steril ılık salinle nemlendirilmiş lateks-free gazlı bezle örtülü ve bebek prone/lateral pozisyonda tutulmalıdır.',
      'Nörolojik ve Solunum Değerlendirmesi: Alt ekstremite hareket düzeyi, baş çevresi/fontanel gerginliği (hidrosefali), inspiratuvar stridor, zayıf ağlama veya apne atakları (Chiari II beyin sapı/vokal kord tutulumu!).',
      'Ensefalosel Olgularında Hava Yolu: Büyük oksipital ensefalosel başın ekstansiyonunu engelleyerek zor laringoskopi yaratır; nazofaringeal ensefalosel nazal geçişi tıkar.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (yenidoğanda fizyolojik yüksek Hb 14–18 g/dL), Kan Glukozu, Serum Elektrolitleri, Kan Grubu ve Cross-Match (maternal kan ile uyumlu taze pedipak ES).',
      'Kranial Ultrasonografi (ventrikülomegali/hidrosefali bazal ölçümü) ve doğum sonrası IM K Vitamini yapıldığının doğrulanması.'
    ]
  },

  // 5) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'Standart Neonatal ASA Monitörizasyonu: EKG, pre- ve post-duktal SpO2 (sağ el ve ayak — PDA/pulmoner hipertansiyon izlemi), düşük ölü boşluklu sürekli EtCO2, NİKB (uygun yenidoğan manşonu) ve sürekli özofageal/rektal ısı probu.',
      'Prekordiyal Stetoskop: Yenidoğanda kalp sesleri ve solunum seslerinin (özellikle prone pozisyonda ETT kaymasının!) anlık takibi için çok değerlidir.',
      'Sık Kan Glukozu Takibi (30–60 dk\'da bir; hedef 60–150 mg/dL) ve tartılmış spançlarla hassas kan kaybı ölçümü.',
      'İnvaziv Arteriyel Hat (A-Line): Rutin küçük miyelomeningoselde şart değildir; ancak dev ensefalosel, geniş flep, prematürite/kardiyak anomali veya yüksek kanama beklentisinde (umbilikal veya radyal) yerleştirilir.'
    ],
    vascularAccess: [
      'En az 2 adet güvenilir periferik IV kateter (24G — biri sürekli %1–2 dekstrozlu izotonik idame, diğeri ilaç/sıvı bolusu ve gerekirse kan ürünü için; mümkünse üst ekstremitelerde çünkü alt ekstremite venöz dönüşü prone pozisyonda azalabilir).',
      'Tüm damar yolları ve uzatma hatları KESİNLİKLE HAVA KABARCIKSIZ olmalıdır (yenidoğanlarda foramen ovale açık olduğundan en küçük hava kabarcığı paradoksal emboli yapar!).'
    ],
    patientPosition: 'Prone (Yüzüstü) — göğüs ve pelvis altına yumuşak rulolar konularak karın tamamen serbest bırakılmış; baş yan/nötral, göz ve kulak basısı tamamen önlenmiş.',
    patientPositionDetails: [
      'Entübasyon Pozisyonu: Lateral dekübit VEYA keseyi tam çevreleyen içi boş yumuşak simit/donut yastık üzerinde supine — kese ASLA masaya değmez!',
      'Prone Pozisyonda Karın Serbestliği: El ile kontrol edilerek göbek/karın altında boşluk olduğu doğrulanır; karın basısı IVC\'yi sıkıştırıp epidural venöz kanamayı artırır ve diyafram hareketini kısıtlar.',
      'Sıcaklık Kontrolü: Oda 26–28°C, sıcak hava üflemeli alt-battaniye, başa pamuklu bone ve ekstremitelere ısı koruyucu sargı (tümü lateks-free).'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Lateks-free devreyle Sevofluran/O2/Hava inhalasyon indüksiyonu veya mevcut IV hattan Propofol (1–2 mg/kg) / Fentanil (1–2 mcg/kg). Nöromusküler blokaj gerekirse YALNIZCA non-depolarizan ajan (Rokuronyum 0.5–0.6 mg/kg veya Atrakuryum) kullanılır; SÜKSİNİLKOLİN KESİNLİKLE YASAKTIR! Sinir kökü EMG\'si yapılacaksa kas gevşeticisiz (Sevofluran + Remifentanil) entübasyon tercih edilir.',
      'İdame: Sevofluran (yenidoğanda yaşa uygun MAC) + düşük doz Remifentanil (0.05–0.15 mcg/kg/dk) veya minimal Fentanil (postop apne riskini artırmamak için uzun etkili yüksek doz opioidlerden kaçınılır!). N2O KULLANILMAZ.',
      'Sıvı ve Glukoz Yönetimi: İdame olarak %1–2 dekstroz içeren izotonik dengeli kristaloid (4 mL/kg/saat Holliday-Segar), açık kese/evaporatif ve üçüncü boşluk kayıpları için dekstrozsuz izotonik dengeli kristaloid (RL/Plasmalyte 5–10 mL/kg/saat titre). Hipotonik sıvılar KESİNLİKLE kullanılmaz!',
      'Ventilasyon: Basınç kontrollü koruyucu ventilasyon (Vt 5–7 mL/kg, PEEP 4–5 cmH2O), normokapni (PaCO2 35–42 mmHg), prematüre yenidoğanlarda retinopati (ROP) riskine karşı SpO2 %91–95 hedeflenir (gereksiz %100 hiperoksiden kaçın).'
    ],
    airwayManagement: [
      '3.0–3.5 mm (tercihen mikrokaflı veya uygun kaflısız) orotrakeal tüp; yenidoğan trakeası yalnızca ~4 cm olduğundan tüp ucu tam orta-trakeada (T2–T3) özenle sabitlenir.',
      'Lateral/donut entübasyon sonrası bebek prone çevrildiğinde tüpün kayma veya katlanma (kinking) riski çok yüksektir — çevirme sonrası iki taraflı akciğer sesleri, EtCO2 ve pik hava yolu basıncı hemen doğrulanır.',
      'Ekstübasyon: Yenidoğan tamamen uyanık, düzenli spontan solunumda, normotermik (>36.5°C), nöromusküler blokajı tam dönmüş (TOF ≥ 0.90) ve hava yolu refleksleri güçlü olduğunda ekstübe edilir. Büyük ensefalosel, ağır prematürite, uzun/kanamalı cerrahi veya Chiari II stridor/apnesi varsa entübe olarak NICU\'ya devredilir.'
    ],
    criticalSurgicalStages: [
      'Anestezi İndüksiyonu ve Keseyi Koruyan Entübasyon: Kese rüptürü olmadan travmasız entübasyon ve güvenli prone çevirme.',
      'Nöral Plakodun Serbestleştirilmesi ve Kapatılması: Cerrah sinir köklerini ayırt etmek için düşük akımlı elektriksel stimülasyon kullanabilir -> kas gevşetici etkisi olmamalıdır.',
      'Sıkı Dural Kapanış ve Cilt/Flep Kapatılması: BOS kaçağını önlemek için gerilimsiz kapatma; geniş flep kaldırılıyorsa kan kaybı ve ısı kaybı hızla artar.',
      'Valsalva Manevrası: Cerrah dural dikiş hattından BOS kaçağı kontrolü için 15–20 cmH2O pozitif basınç isteyebilir (yenidoğanda venöz dönüş düşüşüne karşı kısa ve kontrollü uygulanır).'
    ],
    emergenceNotes: [
      'Hipotermik veya rezidüel opioid/volatil etkili yenidoğanda ekstübasyon sonrası şiddetli apne ve bradikardi gelişebilir — normotermi ve tam uyanıklık şarttır.',
      'Ekstübasyon sonrası bebek yine yara/onarım hattına bası gelmeyecek şekilde PRONE veya LATERAL pozisyonda ısıtılmış transport küvözüyle NICU\'ya nakledilir.'
    ]
  },

  // 6) Post-operatif yönetim
  postoperative: {
    painManagement: [
      'Multimodal Opioid-Koruyucu Neonatal Analjezi: Düzenli IV Parasetamol (term yenidoğanda 7.5 mg/kg q6-8h, prematürede doz aralığı uzatılır; maks 30 mg/kg/gün) + cerrahın yara kenarına toksik sınır altında (Bupivakain <1.5–2 mg/kg) lokal anestezik infiltrasyonu.',
      'Apne riskini minimize etmek için opioidler en düşük etkili dozda (gerekirse NICU monitörizasyonu altında mikro-doz IV Morfin 0.02–0.03 mg/kg veya Fentanil) titre edilir.',
      'Yenidoğanlarda Tramadol, Kodein ve NSAİİ\'ler (renal toksisite, trombosit disfonksiyonu, PDA kapanma etkisi) KESİNLİKLE KONTRENDİKEDİR.'
    ],
    erasRecommendations: [
      'NICU\'da en az 24–48 saat sürekli kardiyorespiratuvar ve APNE monitörizasyonu (Chiari II malformasyonu ve prematürite kaynaklı santral apne / vokal kord paralizisi riski).',
      'Onarım sahasının fekal/üriner kontaminasyondan korunması için bebek ilk günlerde prone/lateral yatırılır; baş çevresi ve fontanel günlük izlenir (kese kapatıldıktan sonra hidrosefali belirginleşebilir ve VP şant / ETV gerekebilir).',
      'Tüm hastane yatışı ve ömür boyu medikal kayıtlara "KESİNLİKLE LATEKS-FREE (SPİNA BİFİDA)" uyarısı işlenir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference:
      "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. Anesthesiologist's Manual of Surgical Procedures (5th/6th ed.). Repair of Myelomeningocele and Encephalocele. Wolters Kluwer.",
    otherReferences: [
      'Coté, C. J., Lerman, J., & Anderson, B. J. A Practice of Anesthesia for Infants and Children (6th ed.). Neonatal Neurosurgery: Myelomeningocele, Encephalocele, and Latex Allergy. Elsevier.',
      "Cottrell, J. E., & Patel, P. Cottrell and Patel's Neuroanesthesia (6th ed.). Pediatric Neuroanesthesia: Neural Tube Defects and Chiari Malformations. Elsevier.",
      'Spina Bifida Association (SBA). Guidelines for the Care of People with Spina Bifida: Latex Allergy Prevention and Neurosurgical Perioperative Care.',
      'Sümpelmann, R., et al. (2017). Perioperative intravenous fluid therapy in children: guidelines from the Association of the Scientific Medical Societies in Germany (AWMF). Paediatric Anaesthesia, 27(1), 10–18.'
    ]
  }
};
