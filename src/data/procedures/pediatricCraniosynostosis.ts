import { ProcedureDefinition } from '../../types/procedures';

/**
 * Pediatrik Kraniyosinostoz Cerrahisi (Kranial Kubbe Rekonstrüksiyonu / Fronto-Orbital İlerletme / Endoskopik Şerit Kraniyektomi)
 *
 * Goobie & Dadure Pediatrik Kraniyofasiyal TXA Randomize Çalışmaları, Pediatrik Hasta Kan Yönetimi (PBM)
 * ve güncel pediatrik nöroanestezi kılavuzları referans alınarak yapılandırılmıştır.
 */
export const pediatricCraniosynostosis: ProcedureDefinition = {
  id: 'pediatric-craniosynostosis',
  name: 'Pediatrik Kraniyosinostoz Cerrahisi (Kranial Remodeling / FOA)',
  shortCode: 'PED-KRANİYOSİNOSTOZ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  secondarySpecialties: ['cocuk_cerrahisi'],
  categoryTag: 'Pediatrik Kraniyofasiyal Nöroşirürji',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description:
    'İnfantlarda (genellikle 3–12 ay; 5–10 kg) bir veya birden fazla kranial sütürün erken kapanmasına (kraniyosinostoz) bağlı kafatası deformitesini düzeltmek ve artan intrakraniyal basıncı önlemek amacıyla uygulanan açık kranial kubbe rekonstrüksiyonu (CVR), fronto-orbital ilerletme (FOA) veya erken dönemde (<3–4 ay) endoskopik sütür serbestleştirme ameliyatıdır. Vücut ağırlığına oranla MASİF KAN KAYBI (>1 Tahmini Kan Hacmi [EBV]), Venöz Hava Embolisi (VAE) ve hipotermi açısından pediatrik anestezinin en kritik vakalarındandır.',
  indications: [
    'Non-sendromik tek sütür kraniyosinostozlar: Sagittal (skafosefali), metopik (trigonosefali), unikoronal (ön plagiosefali) veya lambdoid sinostoz',
    'Sendromik çoklu sütür kraniyosinostozlar (Apert, Crouzon, Pfeiffer, Saethre-Chotzen sendromları): Artmış KİBAS, ekzoftalmi, orta yüz hipoplazisi ve obstrüktif uyku apnesi/zor hava yolu eşlik eder',
    'Erken bebeklik (<3–4 ay) döneminde seçilmiş olgularda minimal invaziv endoskopik şerit kraniyektomi (+ postop kask tedavisi)'
  ],
  averageDuration: '2.5 - 5 saat (Endoskopik şerit kraniyektomi: 60-90 dk; Açık kranial remodeling/FOA: 3-5 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: 'Açık CVR/FOA\'da sıklıkla 0.5 - 1.5+ Tahmini Kan Hacmi (EBV = 75-80 mL/kg; yani 8 kg bebekte 400 - 1000+ mL sinsi ve sürekli kanama!); endoskopik yaklaşımda < 0.2 - 0.3 EBV',
    riskLevel: 'massive_potential',
    riskLevelLabel: 'Çok Yüksek / Masif Pediatrik Kanama Riski (>1 EBV)',
    crossMatchRequirement: 'İnsizyon ÖNCESİ ameliyathanede soğutucuda hazır en az 2 Ünite taze (<7-14 gün), lökosit filtrelenmiş/ışınlanmış Cross-Match\'li Eritrosit Süspansiyonu (ES) + TDP + Kriyopresipitat planı ZORUNLUDUR',
    transfusionProbability: '%70 - %95 (Açık kranial kubbe rekonstrüksiyonunda); endoskopik şerit kraniyektomide %10 - %20',
    criticalBleedingSources: [
      'Geniş bikoronal skalp flebi ve subperiosteal diseksiyon yüzeyinden sürekli, örtülerde gizlenen sinsi kanama (bebeklerde 50 mL kayıp erişkinde ~500 mL\'ye eşdeğerdir!)',
      'Osteotomi hatlarındaki yoğun diploik kemik iliği kanaması',
      'Superior Sagittal Sinüs (SSS) ve torcula komşuluğunda dural venöz sinüs laserasyonu (ani masif kanama + VAE)'
    ],
    hemostasisStrategies: [
      'Pediatrik Traneksamik Asit (TXA) Protokolü (Goobie / Dadure RCT\'leri): İnsizyon öncesi 10–30 mg/kg IV yükleme (15 dk\'da) ardından cerrahi bitimine kadar 5 mg/kg/saat sürekli infüzyon (kan kaybını ve transfüzyonu %30–40 azaltır!)',
      'Erken ve Dengeli 1:1 ES : TDP Transfüzyonu + Fibrinojen (>200 mg/dL) ve İyonize Kalsiyum (>1.1 mmol/L) replasmanı (dilüsyonel koagülopatiyi önlemek için)',
      'Epinefrinli skalp infiltrasyonu, Raney klipsleri, kemik mumu ve mümkünse pediatrik çanaklı Cell-Saver'
    ]
  },

  // 3) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi (Düşük-Orta MAC Sevofluran + Remifentanil veya Fentanil infüzyonu + Nöromusküler Blokaj): İnfantlarda hemodinamik kontrol ve hızlı derlenme sağlar'
    ],
    alternative: [
      'Propofol/Remifentanil TIVA (seçilmiş >6 ay olgularda veya malign hipertermi şüphesinde; küçük infantlarda uzun süreli yüksek doz Propofol infüzyonu PRIS riski nedeniyle sınırlı tutulur)'
    ],
    clinicalRationale:
      'Açık kraniyosinostoz cerrahisi küçük infantlarda (5–10 kg) masif ve sinsi kan kaybı, koagülopati, venöz hava embolisi ve hızlı ısı kaybıyla seyreder. Güvenli kaflı/mikrokaflı orotrakeal entübasyon, en az iki güvenilir periferik damar yolu, invaziv arteriyel monitörizasyon, profilaktik TXA ve erken 1:1 kan ürünü replasmanı mortaliteyi önlemenin temelidir.',
    notes:
      'İnfantlarda kan kaybı cerrahi örtülerde ve aspiratör hortumunda kolayca gözden kaçabilir; taşikardi ve nabız basıncı daralması ilk uyarıdır, hipotansiyon ise GEÇ ve pre-arrest bulgudur! Preoperatif İzin Verilebilir Kan Kaybı (ABL) mutlaka hesaplanmalı ve fizyolojik nadir anemi (3–6 ay) göz önünde bulundurulmalıdır.',
    rulesTitle: 'PEDİATRİK KRANİYOSİNOSTOZDA VAZGEÇİLMEZ 5 KURAL',
    indispensableRules: [
      {
        number: 1,
        title: 'PREOP ABL HESABI + ERKEN 1:1 ES:TDP TRANSFÜZYONU (HİPOTANSİYONU BEKLEME!)',
        content: 'İnfantta EBV = 75–80 mL/kg\'dır; açık CVR\'de kan kaybı kolayca >1 EBV\'ye ulaşır. Preop ABL = EBV × (Başlangıç Hct − Hedef Hct) / Ortalama Hct hesaplanır. Kanama hızlandığında kristaloidle dilüsyon yapmadan erken 1:1 ES:TDP transfüzyonuna geçilir; sitrat hipokalsemisi (IV Kalsiyum Klorür/Glukonat) ve masif transfüzyon hiperkalemisi (taze <7–14 gün ES kullan!) seri AKG ile izlenir.'
      },
      {
        number: 2,
        title: 'PEDİATRİK TRANEKSAMİK ASİT (TXA) RUTİN PROTOKOLÜ',
        content: 'Goobie ve Dadure pediatrik kraniyofasiyal randomize çalışmaları gereği açık kraniyosinostozda profilaktik TXA (10–30 mg/kg IV yükleme + 5 mg/kg/saat sürekli infüzyon) insizyon öncesi başlatılır; kan kaybı ve allojenik kan ürünü ihtiyacını anlamlı düzeyde azaltır.'
      },
      {
        number: 3,
        title: 'EN AZ 2 GENİŞ DAMAR YOLU + İNVAZİV A-LİNE + VAE UYANIKLIĞI',
        content: 'İnsizyon öncesi mutlaka 2 adet güvenilir periferik IV (20G–22G) ve invaziv Arteriyel Kateter (A-line) takılmalıdır (seri Hb, laktat, Ca²+, K+, glukoz ve nabız basıncı varyasyonu takibi). Açık diploik venler ve dural sinüsler nedeniyle baş elevasyonunda VAE riski yüksektir — Prekordiyal Doppler + EtCO2 izlenir, N2O KESİNLİKLE kullanılmaz.'
      },
      {
        number: 4,
        title: 'AGRESİF NORMOTERMİ + İZOTONİK DENGELİ SIVI & GLUKOZ TAKİBİ',
        content: 'İnfantların vücut yüzey alanı/kütle oranı çok yüksektir; hipotermi (<36°C) koagülopatiyi ve kanamayı ağırlaştırır (oda ısısı 24–26°C, sıcak hava battaniyesi, tüm sıvı ve kanlar ısıtılmış). Hiponatremiyi önlemek için YALNIZCA izotonik dengeli kristaloid (RL/Plasmalyte) kullanılır; infant hipoglisemisini önlemek için seri kan glukozu izlenip gerektiğinde %1–2 dekstrozlu izotonik idame verilir.'
      },
      {
        number: 5,
        title: 'HAVA YOLU ÖDEMİ KONTROLÜ + TRAMADOL VE KODEİN KESİNLİKLE YASAK',
        content: 'Özellikle prone pozisyon, FOA ve masif sıvı/kan resüsitasyonu sonrası yüz, göz ve dil/hava yolu ödemi gelişebilir — ekstübasyon öncesi mutlaka hava kaçağı (cuff leak) testi yapılır, şüphede PED-YBÜ\'de entübe izlenir. Çocuklarda solunum depresyonu riski nedeniyle Tramadol ve Kodein KESİNLİKLE KULLANILMAZ!'
      }
    ]
  },

  // 4) Pre-operatif hazırlık
  preoperative: {
    consultations: [
      'Pediatrik Nöroşirürji & Plastik/Kraniyofasiyal Cerrahi: Sütür sayısı, planlanan prosedür (endoskopik vs açık CVR vs FOA), beklenen pozisyon (supine vs prone/sphinx) ve öngörülen kanama miktarı.',
      'Pediatrik Kardiyoloji / Genetik (Sendromik Olgularda): Apert, Crouzon, Pfeiffer sendromlarında eşlik eden konjenital kalp hastalığı, obstrüktif uyku apnesi (OSA) ve zor hava yolu değerlendirmesi.',
      'Çocuk Yoğun Bakım (PED-YBÜ): Açık kraniyal kubbe rekonstrüksiyonu sonrası tüm infantlar postop ilk 24 saat PED-YBÜ\'de izlenmelidir.'
    ],
    historyAndPhysical: [
      'Ağırlık (hassas gram/kg) ve Yaş: 3–6 aylık infantlarda fizyolojik anemi (Hb 9.5–10.5 g/dL) nadir dönemine denk gelir — preop demir/eritropoietin optimizasyonu sorgulanır.',
      'Hava Yolu Muayenesi: Sendromik kraniyosinostozlarda maksiller/orta yüz hipoplazisi, koanal stenoz/atrezi, yüksek damak ve mikrognati maske ventilasyonu ile entübasyonu zorlaştırabilir.',
      'KİBAS ve Göz Koruması: Fontanel gerginliği, batan güneş işareti, kusma ve propitozis/ekzoftalmi (kornea kuruma riski).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Bazal Hb/Hct — ABL hesabı için şart!), Trombosit, Koagülasyon Paneli (PT, aPTT, Fibrinojen) ve Serum Elektrolitleri.',
      'Kan Grubu, Antikor Taraması ve taze (<7–14 gün) Cross-Match\'li ES + TDP hazırlığı (pediatrik alikot/pedipak halinde).'
    ]
  },

  // 5) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line — radyal, ulnar veya dorsalis pedis/posterior tibial; USG eşliğinde): Anlık hemodinami, nabız basıncı varyasyonu ve 30–60 dk aralıklarla AKG/Hb/K+/Ca²+/glukoz/laktat örneklemesi için ZORUNLUDUR.',
      'Standart Pediatrik ASA Monitörizasyonu: EKG, 2 farklı bölgeden SpO2 (periferik vazokonstriksiyonda güvenilirlik için), EtCO2, özofageal/rektal çift ısı probu ve Foley idrar sondası (hedef >1–2 mL/kg/saat).',
      'VAE Monitörizasyonu: Prekordiyal Doppler + sürekli EtCO2 (açık sinüs/diploik ven kaynaklı hava embolisi infantlarda hızla hemodinamik kollaps yapar!).',
      'Viskoelastik Test (ROTEM / TEG) — mevcutsa masif kanamada hedefe yönelik faktör/fibrinojen replasmanı için.'
    ],
    vascularAccess: [
      'En az 2 adet güvenilir geniş çaplı periferik IV kateter (20G–22G; en az biri tamamen ısıtılmış kan ürünü transfüzyonuna ayrılmış).',
      'İnvaziv Arteriyel Kateter (A-Line).',
      'Periferik erişimi yetersiz veya çok yüksek kanama beklentili sendromik olgularda USG eşliğinde femoral veya internal juguler pediatrik CVC (internal juguler kateter boyun/baş sahası dışından ve serebral venöz drenajı engellemeyecek şekilde planlanır).'
    ],
    patientPosition: 'Supine (Anterior FOA / metopik / koronal) veya Modifiye Prone / Sfenks (Posterior kubbe / sagittal remodeling) — yumuşak at nalı (horseshoe) baş desteği üzerinde.',
    patientPositionDetails: [
      'Göz Koruması: Propitozisli infantlarda ve FOA/prone pozisyonlarda gözler lubrikan pomat ve koruyucu şeffaf örtü/göz kalkanıyla korunur; at nalı başlığın göz küresine KESİNLİKLE basmadığı aralıklarla teyit edilir.',
      'Prone / Sfenks Pozisyonda: Göğüs ve pelvis destekleriyle karın serbest bırakılır; başın aşırı ekstansiyonu veya rotasyonu ETT\'yi kaydırabileceği için pozisyon sonrası akciğer sesleri mutlaka yeniden dinlenir.',
      'Isı Koruması: Ekstremiteler ve gövde sıcak hava üflemeli alt-battaniye (underbody forced-air warmer) üzerinde konumlandırılır; ameliyathane ısısı indüksiyon ve pozisyonlama boyunca 24–26°C tutulur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: İnhalasyon (Sevofluran/O2/Hava — N2O YOK!) veya mevcut IV hattan Propofol (2–3 mg/kg) + Fentanil (2–3 mcg/kg) + Rokuronyum (0.6–1.0 mg/kg). Sendromik zor hava yolunda spontan solunumu koruyan inhalasyon indüksiyonu ve videolaringoskop/fiberoptik hazırlık esastır.',
      'İdame: Sevofluran (%1.5–2.2, <1 MAC) + Remifentanil (0.1–0.3 mcg/kg/dk) veya aralıklı Fentanil + Rokuronyum. N2O KESİNLİKLE KULLANILMAZ (VAE riski).',
      'Profilaktik TXA: İnsizyon öncesi 10–30 mg/kg IV yükleme (15 dk\'da; nöbet riskine karşı >30 mg/kg aşırı bolustan kaçın), ardından 5 mg/kg/saat sürekli infüzyon.',
      'Sıvı ve Kan Yönetimi: İdame ve ilk kayıplarda YALNIZCA ısıtılmış izotonik dengeli kristaloid (RL/Plasmalyte) — hipotonik sıvılar serebral ödem ve hiponatremi yapar! Kan kaybı ABL\'ye yaklaştığında (veya aktif hızlı kanamada hemen) ısıtılmış taze 1:1 ES : TDP başlanır (hedef Hb 9–10 g/dL, Fibrinojen >200 mg/dL, Trombosit >100.000/mm³, iyonize Ca²+ >1.1 mmol/L).',
      'Glukoz ve Elektrolitler: 1–2 saatte bir AKG\'de K+ (eski ES hiperkalemi arresti yapabilir!), iyonize Ca²+, Na+ ve glukoz (hedef 80–150 mg/dL; <70 mg/dL ise %10 Dekstroz 2 mL/kg IV bolus) kontrol edilir.'
    ],
    airwayManagement: [
      'Mikrokaflı (Microcuff) orotrakeal tüp (sızıntı ve kaf basıncı ≤20 cmH2O izlenir; sütür veya güvenilir bantla sabitleme — infant trakeası kısadır, 1 cm kayma ekstübasyon veya sağ ana bronş entübasyonu yapar!).',
      'FOA veya prone pozisyonda uzun vakalarda dil, yanak ve üst hava yolu ödemi gelişebilir: Ekstübasyon öncesi mutlaka cuff-leak testi yapılır; belirgin ödem, masif transfüzyon (>1 EBV), hipotermi veya hemodinamik kararsızlık varsa infant entübe olarak PED-YBÜ\'ye devredilir.'
    ],
    criticalSurgicalStages: [
      'Bikoronal Skalp İnsizyonu ve Flep Kaldırılması: En hızlı gizli kan kaybının başladığı aşama — TXA yüklü ve ES ameliyathanede hazır olmalıdır!',
      'Kraniyotomi ve Dural Sinüs Üzerinden Kemik Kaldırılması: Superior sagittal sinüs yaralanması (ani masif kanama) ve Venöz Hava Embolisi (VAE) açısından en yüksek riskli an! Prekordiyal Doppler ve EtCO2 anlık takip edilir.',
      'Orbital Bant (FOA) Manipülasyonu: Göz küresine bası kaynaklı Okülokardiyak Refleks (ani bradikardi) gelişebilir -> cerrahı uyar, basıyı kaldırt, gerekirse IV Atropin (0.02 mg/kg).',
      'Kapanış ve Subgaleal Dren Yerleştirilmesi: Postoperatif ilk 12–24 saatte subgaleal boşluğa ve drene 100–300 mL ek gizli kanama devam edebilir — son Hb ve koagülasyon mutlaka kontrol edilir.'
    ],
    emergenceNotes: [
      'Açık CVR/FOA hastaları normotermik, hemodinamik stabil, koagülasyon/Hb normal (Hb >9–10 g/dL), minimal yüz/hava yolu ödemli ve pozitif cuff-leak testi varsa ameliyathanede ekstübe edilip PED-YBÜ\'ye alınabilir.',
      'Masif transfüzyon (>1 EBV), belirgin periorbital/dil ödemi, sendromik zor hava yolu veya hipotermi varsa erken zorlama ekstübasyon YAPILMAZ; PED-YBÜ\'de birkaç saat/gece entübe stabilizasyon sonrası kontrollü ekstübe edilir.'
    ]
  },

  // 6) Post-operatif yönetim
  postoperative: {
    painManagement: [
      'Düzenli IV Parasetamol (infant dozlaması: <10 kg için 7.5–10 mg/kg q6h, >10 kg için 15 mg/kg q6h; günlük maksimum doza dikkat!) + cerrahi insizyon kenarlarına lokal anestezik (Bupivakain toksik doz sınırı <2 mg/kg aşılmadan!).',
      'Orta-şiddetli ağrıda PED-YBÜ monitörizasyonu altında düşük doz titre IV Morfin (0.02–0.05 mg/kg) veya Fentanil (0.5–1 mcg/kg) ± Deksmedetomidin (0.2–0.5 mcg/kg/saat) uygulanır.',
      'Tramadol ve Kodein (FDA Kara Kutu Uyarısı — CYP2D6 ultra-hızlı metabolizörlerde fatal solunum depresyonu!) pediatrik hastalarda KESİNLİKLE KONTRENDİKEDİR. Taze kranial cerrahi sonrası ilk 24–48 saatte rutin NSAİİ\'lerden (kanama riski) kaçınılır.'
    ],
    erasRecommendations: [
      'İlk 24 saat PED-YBÜ\'de sürekli A-line, saatlik dren/pansuman takibi ve seri Hb/Hct, Na+ (SIADH taraması), Ca²+ kontrolleri (postop sinsi subgaleal kanama sık görülür!).',
      'Periorbital ödemi azaltmak için baş 30° elevasyonda tutulur; erken enteral/anne sütü beslenmesine geçilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference:
      "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. Anesthesiologist's Manual of Surgical Procedures (5th/6th ed.). Pediatric Craniosynostosis Repair. Wolters Kluwer.",
    otherReferences: [
      'Goobie, S. M., et al. (2011). Efficacy of tranexamic acid in pediatric craniosynostosis surgery: a double-blind, placebo-controlled trial. Anesthesiology, 114(4), 862–871.',
      'Dadure, C., et al. (2011). Intraoperative tranexamic acid reduces blood transfusion in children undergoing craniosynostosis surgery: a randomized double-blind study. Anesthesiology, 114(4), 856–861.',
      'Goobie, S. M., et al. (2018). High-Dose versus Low-Dose Tranexamic Acid for Paediatric Craniosynostosis Surgery: A Double-Blind Randomised Controlled Non-Inferiority Trial. British Journal of Anaesthesia, 120(3), 501–509.',
      'Coté, C. J., Lerman, J., & Anderson, B. J. A Practice of Anesthesia for Infants and Children (6th ed.). Neurosurgery & Craniofacial Surgery in Infants. Elsevier.',
      'Stricker, P. A., et al. (2017). Perioperative Outcomes and Management in Pediatric Complex Cranial Vault Reconstruction: A Multicenter Study from the Pediatric Craniofacial Collaborative Group. Anesthesiology, 126(2), 276–287.'
    ]
  }
};
