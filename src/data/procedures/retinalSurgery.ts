import { ProcedureDefinition } from '../../types/procedures';

/**
 * Vitreoretinal Cerrahi: Pars Plana Vitrektomi (PPV), Skleral Çökertme (Scleral Buckle), Endolazer ve Gaz/Silikon Tamponad
 * (Retinal Surgery / Vitreoretinal Procedures: Pars Plana Vitrectomy, Scleral Buckling, Endolaser and Intravitreal Gas/Silicone Oil)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth Joint Guidelines (2012),
 * AAO PPP: Posterior Vitreous Detachment, Retinal Breaks, and Lattice Degeneration,
 * Gan et al. 4th PONV Consensus (2020), ASA OR Fire Advisory (2013), ASRA 5th Ed. (2025).
 */
export const retinalSurgery: ProcedureDefinition = {
  id: 'retinal-surgery-vitrectomy-scleral-buckle',
  name: 'Vitreoretinal Cerrahi: Pars Plana Vitrektomi (PPV), Skleral Çökertme ve Gaz/Silikon Tamponad',
  shortCode: 'GOZ-RETINA-PPV',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Vitreoretinal & Arka Segment Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Gözün arka segmentini dolduran vitreus cisminin ve nörosensoryal retina tabakasının yırtık, dekolman, kanama, traksiyon veya proliferatif membranlar sonucu gelişen patolojilerinin mikrocerrahi yöntemlerle onarılması ameliyatıdır. Temel teknikler: (1) Pars Plana Vitrektomi (PPV — 23G/25G/27G MIVS): Limbusun 3.5-4.0 mm gerisinden pars planaya 3-4 valfli mikro-trokar yerleştirilir; kor ve periferik vitreus temizlenir, epiretinal/internal limitan membran (İLM) mikron hassasiyetinde soyulur, yırtıklar etrafına endolazer fotokoagülasyon uygulanır ve sıvı-hava değişimi (FAX) sonrası göz içine tamponad gaz (Hava, SF₆ veya C₃F₈) ya da silikon yağı enjekte edilir; (2) Skleral Çökertme (Scleral Buckling / Serklaj): Dört rektus kası askıya alınır, kriyoterapi uygulanır ve sklera üzerine silikon bant/sünger dikilerek göz duvarı içeri çökertilir; (3) Kombine Fako-Vitrektomi.',
  indications: [
    'Regmatojen Retina Dekolmanı (RRD): Retina yırtığına bağlı subretinal sıvı toplanması ve makula dekolmanı',
    'Traksiyonel Retina Dekolmanı (TRD): Proliferatif diyabetik retinopatiye (PDR) bağlı fibrovasküler zarlar',
    'Rezorbe Olmayan Vitreus Kanaması: Diyabetik retinopati, retinal ven tıkanıklığı veya travma sekeli',
    'Makula Deliği (Macular Hole) ve Epiretinal Membran (ERM / Makuler Pucker)',
    'Proliferatif Vitreoretinopati (PVR) ve Endoftalmi',
    'Arka Segmente Düşmüş Lens Nükleusu / Disloke Göz İçi Lensi (İOL)'
  ],
  averageDuration: '60 - 150 dakika (Standart 25G PPV makula deliği/ERM: 45-60 dk; Kompleks PDR: 90-120 dk; Kombine vitrektomi + skleral çökertme: 120-150 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 10 - 30 mL (Sistemik dolaşım için ihmal edilebilir düzeydedir; ancak göz içi neovasküler veya suprakoroidal kanama görmeyi tehdit eder)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Sistemik Kan Kaybı / Ancak Ekspulsif Koroidal Hemoraji Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Ekspulsif Suprakoroidal Hemoraji: Ani oküler hipotoni, öksürük, ıkınma veya hipertansiyon ile arka siliyer arterlerin patlaması',
      'Diyabetik Fibrovasküler Zarların Kanaması: Neovasküler membran disseksiyonunda intraoküler kanama',
      'İntraretinal / Subretinal Kanamalar ve İğneli Blok Yapılırsa Retrobulber Hematom'
    ],
    hemostasisStrategies: [
      'Vitreus içi kanamada cerrahın infüzyon basıncını geçici olarak 40-60 mmHg\'ye çıkararak tamponad sağlaması',
      'Endolazer veya endodiatermi ile kanayan retinovasküler odakların koagülasyonu',
      'Normotansiyon, normokapni ve öksürüksüz/ıkınmasız pürüzsüz anestezi idamesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA — Propofol + Remifentanil TIVA) + Spiralli Tüp + TOF 0/4 + N₂O KESİN YASAK — Uzun PPV, skleral çökertme, diyabetik TRD ve genç/anksiyeteli olgularda ALTIN STANDARTTIR',
      'Genişletilmiş Künt Sub-Tenon Bloğu + Minimal MAC: Komorbiditesi yüksek, 60-90 dk sırtüstü yatabilen koopere erişkin 25G/27G PPV olgularında güvenle uygulanır (yüksek miyopide [>26 mm] iğneli blok KONTRENDİKEDİR!)'
    ],
    alternative: [
      'Laringeal Maske (LMA) ile Propofol TIVA: Aspirasyon riski düşük, 60-90 dk altı seçilmiş PPV olgularında öksürüksüz pürüzsüz uyanma avantajıyla',
      'Peribulber Blok (Ekstrakonal): Yalnızca aksiyel uzunluğu ≤26 mm ve antikoagülasyonu uygun seçilmiş erişkinlerde'
    ],
    clinicalRationale: 'Vitrektomide makula ve foveaya mikron mesafede çalışılırken tam hareketsizlik, skleral çökertmede dört rektus kas traksiyonunun ağrısız tolere edilmesi ve SF₆/C₃F₈ gaz kabarcığını genişleten N₂O\'dan kesin kaçınılması için Propofol TIVA temelli genel anestezi (düşük PONV avantajıyla) idealdir. Rejyonel blok seçilirse yüksek miyopi (>26 mm / stafilom) perforasyon riski nedeniyle künt Sub-Tenon tercih edilmeli, aşırı sedasyon apnesinden ve örtü altı yangın riskinden kaçınılmalıdır.',
    rulesTitle: 'VİTREORETİNAL CERRAHİDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Vitreoretinal cerrahide hayati kurallar: (1) N₂O + SF₆/C₃F₈ gaz kabarcığı CRAO/körlük yasağı ve uçuş/irtifa takvimi; (2) Makula/fovea çalışılırken sıfır hareket (TOF 0/4) ve yüksek miyopide iğneli blok yasağı; (3) Skleral çökertmede yüksek OCR protokolü; (4) Pürüzsüz uyanma + ikili PONV (Tramadol/Kodein YASAK); (5) Postop yüzüstü pozisyon ve gaz uyarı bilekliği; (6) Oftalmik damla toksisitesi (%2.5 Fenilefrin) ve MAC\'te ASA OR Yangın Üçgeni.',
    indispensableRules: [
      {
        number: 1,
        title: 'AZOT PROTOKSİT (N₂O) + İNTRAOKÜLER GAZ (HAVA / SF₆ / C₃F₈) KESİN YASAĞI VE UÇUŞ KURALLARI',
        content: 'Kanda çözünürlüğü yüksek olan N₂O, göz içindeki hava veya gaz kabarcığına hızla difüze olarak kabarcığı 2-3 kat genişletir → GİB 60-100 mmHg\'ye fırlayarak santral retinal arter tıkanıklığı (CRAO) ve KALICI KÖRLÜK yapar! N₂O gaz enjeksiyonundan en az 15-20 dk önce kesilmelidir — en güvenli kural vitreoretinal cerrahide N₂O\'yu HİÇ KULLANMAMAKTIR. Gözünde gaz olan hastada tam rezorpsiyona dek (Hava: 3-7 gün · SF₆: 2-3 hafta · C₃F₈: 6-8 [bazen 10-12] hafta) hiçbir ameliyatta N₂O verilemez ve uçak/yüksek irtifa kesinlikle yasaktır!'
      },
      {
        number: 2,
        title: 'MAKULA / FOVEADA MUTLAK HAREKETSİZLİK (TOF 0/4) VE YÜKSEK MİYOPİDE (>26 MM) İĞNELİ BLOK YASAĞI',
        content: '23G/25G/27G vitrektör ve forsepsler foveaya mikron mesafede çalışır; en ufak hareket dev retinal yırtık veya masif subretinal kanama yaratır (GA\'da TOF 0/4 korunur). Retina dekolmanı hastalarının önemli kısmı yüksek miyoptur (>26 mm aksiyel uzunluk / posterior stafilom): Bu gözlerde iğneli retrobulber/peribulber blok glob perforasyonu riskini ~30 kat artırdığı için KONTRENDİKEDİR → künt Sub-Tenon bloğu veya GA seçilir.'
      },
      {
        number: 3,
        title: 'SKLERAL ÇÖKERTME VE DÖRT REKTUS KAS TRAKSİYONUNDA OKÜLOKARDİYAK REFLEKS (OCR)',
        content: 'Skleral çökertmede dört rektus kasının askıya alınması ve kriyoterapi çok güçlü trigemino-vagal refleks (CN V → CN X) tetikleyerek ani bradikardi, AV blok veya asistoli yapabilir. İlk adım cerrahı durdurmak ("TRAKSİYONU BIRAK"), 2. adım normokapni/oksijenizasyon kontrolü, 3. adım düzelmezse İV Atropin 0.5 mg uygulamaktır (rutin profilaktik Atropin önerilmez; refleks yorulma/fatigability gösterir).'
      },
      {
        number: 4,
        title: 'PÜRÜZSÜZ UYANMA, ÇİFTLİ PONV PROFİLAKSİSİ VE TRAMADOL / KODEİN YASAĞI',
        content: 'Öksürme, ıkınma ve kusma 23G/25G dikişsiz sklerotomilerden gaz/aköz kaçağına, akut hipotoniye ve suprakoroidal kanamaya yol açar. Propofol TIVA + ikili PONV profilaksisi (Deksametazon + Ondansetron) + İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil ile pürüzsüz ekstübasyon uygulanır. Kusmayı tetikleyen Tramadol ve Kodein postoperatif analjezide KULLANILMAZ!'
      },
      {
        number: 5,
        title: 'POSTOPERATİF YÜZÜSTÜ (FACE-DOWN) POZİSYON VE GAZ UYARI BİLEKLİĞİ',
        content: 'İntraoküler gaz/silikon verilen hasta derlenme odasından itibaren sırtüstü yatırılmamalı, cerrahın tarif ettiği baş-aşağı/yüzüstü pozisyona alınmalıdır (sırtüstü yatış gazı öne iterek akut açı kapanması glokomu ve kornea endotel hasarı yapar). Hastaya mutlaka "Gözümde Gaz Vardır — N₂O ve Uçuş Yasak" bilekliği takılır.'
      },
      {
        number: 6,
        title: 'OFTALMİK DAMLA TOKSİSİTESİ (%2.5 FENİLEFRİN) VE MAC\'TE ASA YANGIN ÜÇGENİ',
        content: 'Geniş midriyazis için %10 yerine daima %2.5 Fenilefrin damla kullanılır (%10 Fenilefrin hipertansif kriz ve akciğer ödemi yapabilir; tedavisinde non-selektif beta-bloker KULLANILMAZ!). Karanlık ameliyat salonunda monitör sesli alarmları açık tutulur; MAC/blok vakalarında örtü altı medikal hava veya FiO₂ ≤%30 ile ASA OR yangın güvenliği korunur.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Vitreoretinal Konsültasyonu: Dekolman yayılımı (makula-on acil vs makula-off), aksiyel uzunluk (>26 mm yüksek miyopi kontrolü), tamponad planı (Hava / SF₆ / C₃F₈ / Silikon) ve postop pozisyon gereksinimi.',
      'Dahiliye / Kardiyoloji (Klinik Endikasyonda): Diyabetik vitrektomi hastalarında yaygın olan KAH, otonom nöropati (gastroparezi/aspirasyon riski!), diyabetik nefropati ve hipertansiyon optimizasyonu.',
      'Anestezi Değerlendirmesi: N₂O kesin yasağının kaydı, diyabetik gastroparezi/açlık kontrolü ve boyun/omurga yüzüstü yatış toleransı.'
    ],
    historyAndPhysical: [
      'Diyabet ve Otonom Nöropati: Proliferatif diyabetik retinopati hastalarında gastroparezi ve sessiz miyokard iskemisi sıktır; ameliyat günü kan şekeri 120-180 mg/dL hedeflenir.',
      'Antikoagülan / Antiagregan Yönetimi (ASRA 2025 & RCoA/RCOphth): 23G/25G mikroinsizyonel PPV\'de tromboemboli riski yüksek hastalarda Aspirin genellikle devam ettirilir; Warfarin/DOAC/Klopidogrel yönetimi cerrahla bireyselleştirilir ve rutin köprüleme yapılmaz (bkz. #infografik=antithrombotic-matrix).',
      'Önceki İntraoküler Gaz Öyküsü: Yakın dönemde gözüne gaz verilmiş bir hastada yeniden ameliyat gerekirse N₂O kesinlikle kapalıdır!'
    ],
    laboratoryAndTests: [
      'Diyabetik ve Komorbid Genel Anestezi Adaylarında: Vaka günü kan şekeri, serum elektrolitleri (K⁺), böbrek fonksiyonları (kreatinin/eGFR) ve 12 derivasyonlu EKG.',
      'Antikoagülan kullananlarda güncel INR (Warfarin); klinik endikasyonda TKS.',
      'Oftalmolojik Değerlendirme: Aksiyel uzunluk (yüksek miyopi kontrolü) ve opak ortamlarda B-Scan USG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (OCR alarmı — karanlık salonda sesli nabız tonu mutlaka açık!), SpO₂, EtCO₂, NIBP ve Sıcaklık.',
      'Kantitatif Nöromusküler Monitör (TOF): İLM/makula soyulması sırasında TOF 0/4; ekstübasyon öncesi Sugammadeks ile TOF ≥0.9.',
      'EtCO₂ Takibi: Sıkı normokapni (EtCO₂ 35-38 mmHg — hiperkapni hem koroidal konjesyon hem de OCR şiddetlenmesi yapar!).',
      'Kan Şekeri İzlemi: Uzun diyabetik PPV olgularında perioperatif KŞ kontrolü.'
    ],
    vascularAccess: [
      '1-2 adet güvenli periferik intravenöz damar yolu (18-20G).',
      'Acil Bradikardi / Hemodinami İlaçları: İV Atropin (0.5 mg), Esmolol/Labetalol ve İV Lidokain hazır.'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Donut ile Sabit ve Nötral',
    patientPositionDetails: [
      'Baş silikon donut yastıkla mikroskop eksenine paralel sabitlenir; jugüler bası engellenir.',
      'Karanlık ameliyat salonunda IV hatların, ETT bağlantılarının ve monitör kablolarının cerrahi ayak pedallarına takılmaması için düzenli sabitleme yapılır.',
      'MAC/Sub-Tenon vakalarında örtü altı medikal hava veya FiO₂ ≤%30 sağlanır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - Propofol (1.5-2.5 mg/kg) + Remifentanil (0.1-0.2 mcg/kg/dk) veya Fentanil (2 mcg/kg) + Rokuronyum (0.6 mg/kg).',
      '  - İV Lidokain (1.5 mg/kg) laringoskopi ve öksürük yanıtını baskılar.',
      'İdame (N₂O KESİN YASAK!):',
      '  - Propofol + Remifentanil TIVA (en düşük PONV riski!) veya Hava/O₂ içinde Sevofluran + Remifentanil.',
      '  - AZOT PROTOKSİT (N₂O) HİÇ KULLANILMAZ! (Kayıtlarda ve anestezi cihazında N₂O kapalı teyidi).',
      '  - Makula/fovea aşamasında TOF 0/4 ve sıkı normokapni (EtCO₂ 35-38 mmHg) sürdürülür.',
      '  - Skleral çökertme ve kriyoterapi sırasında OCR alarmı; bradikardide önce cerrah durdurulur, gerekirse İV Atropin 0.5 mg verilir.',
      '  - Şiddetli skleral çökertme ağrısı için cerrahi sonunda cerrah tarafından Sub-Tenon / peribulber lokal anestezik eklenmesi postop analjeziyi dramatik iyileştirir.'
    ],
    airwayManagement: [
      'Spiralli (zırhlı) kaflı endotrakeal tüp uzun vitrektomide ve karanlık salonda en güvenli hava yoludur; cerrahi tarafın karşısından sağlam tespit edilir.',
      'Seçilmiş kısa PPV olgularında LMA; rejyonel blok+MAC olgularında spontan solunum + örtü altı medikal hava / FiO₂ ≤%30 (ASA OR Fire uyumlu).'
    ],
    criticalSurgicalStages: [
      '1. Taraf Doğrulaması, N₂O Kilidi Teyidi ve Baş Sabitleme.',
      '2. Sulu %5 Povidon-İyot Antisepsisi ve 23G/25G/27G Valfli Mikro-Trokar Yerleşimi.',
      '3. İnfüzyon Hattının Açılması, Kor Vitrektomi ve PVD İndüksiyonu.',
      '4. Skleral Çökertme / 4 Rektus Askısı ve Kriyoterapi (EN YÜKSEK OCR AŞAMASI!).',
      '5. Makula Cerrahisi: Epiretinal Membran ve İLM Soyulması (TOF 0/4 — sıfır hareket!).',
      '6. Sıvı-Hava Değişimi (FAX) ve Endolazer Fotokoagülasyon (Lazer göz güvenliği!).',
      '7. İntraoküler Gaz (Hava / SF₆ / C₃F₈) veya Silikon Yağı Enjeksiyonu (N₂O kesin kapalı teyidi!).',
      '8. Trokar Çekimi, Kaçak Kontrolü, Sub-Tenon Adjuvan Analjezi, Basısız Kalkan ve Gaz Uyarı Bilekliği.'
    ],
    emergenceNotes: [
      'Pürüzsüz Ekstübasyon (Smooth Emergence): Düşük doz Remifentanil (0.03-0.05 mcg/kg/dk) veya Deksmedetomidin + İV Lidokain (1.5 mg/kg) + Sugammadeks (TOF ≥0.9) ile sıfır öksürük/ıkınma sağlanır.',
      'Çiftli PONV Profilaksisi: İV Deksametazon (4-8 mg) + Ondansetron (4 mg) zorunludur.',
      'Gaz/silikon tamponadlı hasta derlenme odasından itibaren cerrahın belirttiği yüzüstü / baş-aşağı pozisyona alınır (sırtüstü yatırılmaz!).'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'PPV sonrası ağrı hafif-orta, skleral çökertme sonrası derin künt orbital ağrı belirgin olabilir.',
      'Temel Analjezi: Cerrahi sonu Sub-Tenon lokal anestezik + düzenli Oral/İV Parasetamol (1000 mg 6-8 saatte bir).',
      'KAÇINILACAK AJANLAR: TRAMADOL ve KODEİN yüksek PONV riskiyle dikişsiz sklerotomilerde gaz kaçağı ve koroidal kanamaya yol açabileceğinden rutin analjezide KULLANILMAZ! Şiddetli dirençli kurtarma ağrısında önce AKUT GİB ARTIŞI (gaz genleşmesi / GİB >50 mmHg) dışlanır, gerekirse mikro-doz titre İV Fentanil (25 mcg) + ek antiemetik verilir.',
      'Erken dönemde hifema/koroid kanaması riskini artıran agresif antiplatelet etkili NSAİİ\'lerden kaçınılır.'
    ],
    prospectRecommendations: [
      'Vitreoretinal cerrahi için yayımlanmış özel bir PROSPECT (ESRA) kılavuzu bulunmamaktadır; 4th PONV Consensus (2020) ve RCoA/RCOphth ilkeleri doğrultusunda:',
      '  - Propofol TIVA + preemptif/kapanış Sub-Tenon lokal anestezik + Parasetamol + çiftli antiemetik profilaksisi (Deksametazon + Ondansetron) hem skleral çökertme ağrısını hem de PONV\'yi etkin kontrol eder.'
    ],
    erasRecommendations: [
      'Vitreoretinal Perioperatif Güvenlik ve Taburculuk Protokolü (RCoA-RCOphth & AAO):',
      '  - ZORUNLU POZİSYONLAMA: Gaz/silikon tamponadlı hastalar cerrahın talimatına göre baş-aşağı/yüzüstü pozisyonda kalır; sırtüstü yatış açı kapanması glokomu yapar.',
      '  - UÇAK VE YÜKSEK İRTİFA YASAĞI (DOĞRU FİZYOPATOLOJİ): Uçak kabin basıncı düşüşünde veya yüksek irtifada intraoküler gaz kabarcığı (Boyle yasası gereği) genişleyerek GİB\'i >60-80 mmHg\'ye fırlatır → SANTRAL RETİNAL ARTER TIKANIKLIĞI (CRAO) ve KALICI KÖRLÜK yaratır! Gaz tamamen emilene dek uçuş ve dağ geçişi yasaktır: Hava 3-7 gün · SF₆ 2-3 hafta · C₃F₈ 6-8 (bazen 10-12) hafta. Hastaya uyarı bilekliği takılır.',
      '  - GELECEK ANESTEZİLERDE N₂O YASAĞI: Gaz tamamen rezorbe olana dek hiçbir ameliyatta N₂O verilemez.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Vitreoretinal Surgery (Pars Plana Vitrectomy and Scleral Buckling). Wolters Kluwer / LWW.',
    erasReference: 'Kumar CM, Eke T, Dodds C, et al. Local anaesthesia for ophthalmic surgery — Joint guidelines from the Royal College of Anaesthetists (RCoA) and the Royal College of Ophthalmologists (RCOphth). 2012.',
    prospectReference: 'Vitreoretinal cerrahi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve PONV yaklaşımı 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ve RCoA/RCOphth (2012) ilkelerine dayanmaktadır.',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Posterior Vitreous Detachment, Retinal Breaks, and Lattice Degeneration.',
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.',
      'ASA Task Force on Operating Room Fires. Practice Advisory for the Prevention and Management of Operating Room Fires. Anesthesiology. 2013;118(2):271-290.',
      'Kopp SL, Vandermeulen E, et al. ASRA Pain Medicine Evidence-Based Guidelines (5th ed.). Reg Anesth Pain Med. 2025.'
    ]
  }
};
