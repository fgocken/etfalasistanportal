import { ProcedureDefinition } from '../../types/procedures';

/**
 * Endoskopik Retrograd Kolanjiyopankreatografi (ERCP)
 * 
 * Jaffe (5th ed.), ASGE Standards of Practice, ESGE Clinical Guidelines 
 * ve ERAS Society NORA prensipleri referans alınarak yapılandırılmıştır.
 */
export const ercp: ProcedureDefinition = {
  id: 'ercp',
  name: 'Endoskopik Retrograd Kolanjiyopankreatografi (ERCP)',
  shortCode: 'ERCP',
  specialty: 'gastroenteroloji',
  specialtyName: 'Gastroenteroloji',
  categoryTag: 'İleri Girişimsel Endoskopi & NORA (Floroskopi Eşliğinde)',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Yan görüşlü özel duodenoskop yardımıyla ağız boşluğundan girilerek duodenum ikinci kıtadaki Vater papillasının kanüle edilmesi, kontrast madde verilerek floroskopi altında biliyer ve pankreatik kanal ağacının görüntülenmesi; endoskopik sfinkterotomi (EST), koledok taşı ekstraksiyonu, mekanik litotripsi, biliyer/pankreatik stent yerleştirilmesi veya darlık dilatasyonu uygulanması işlemidir.',
  indications: [
    'Koledokolitiyazis (safra kanalında taş) ve ilişkili akut kolanjit tablosu',
    'Malign veya benign biliyer obstrüksiyonlar (pankreas başı tümörü, kolanjiyokarsinom, periampuller tm, benign striktürler)',
    'Kolesistektomi veya karaciğer rezeksiyonu/transplantasyonu sonrası safra kaçakları ve fistülleri',
    'Oddi Sfinkter Disfonksiyonu (SOD) şüphesi ve manometrisi',
    'Kronik pankreatit komplikasyonları (pankreatik kanal taşları, striktürler, psödokist drenajı)',
    'Tıkanmış, disloke olmuş veya süresi dolmuş biliyer stentlerin değişimi/çıkarılması'
  ],
  averageDuration: '30 - 75 dakika (Tanısal / basit taş ekstraksiyonu: 30-45 dk; Zor kanülasyon, impakte taş, mekanik litotripsi veya bilateral stentleme: 60-90 dk)',

  // Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 15 mL (Tanısal ve stentlemede ihmal edilebilir; Endoskopik Sfinkterotomi [EST] yapılan olgularda 20–50 mL; kontrolsüz retroduodenal arteriyel kanamalarda masif olabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk (EST uygulanan olgularda %1.5–3 majör kanama riski)',
    crossMatchRequirement: 'Tip-Tarama (Type & Screen) önerilir; koagülopatisi bulunan, septik kolanjitli veya cerrahi müdahale olasılığı olanlarda 1-2 Ünite ES rezerve edilmelidir',
    transfusionProbability: '%1 - %3',
    criticalBleedingSources: [
      'Vater ampullası sfinkterotomi (EST) kesi hattı (özellikle saat 1–2 yönünde derin keside retroduodenal arter veya aberan dalların kesilmesi)',
      'İmpakte taşın mekanik litotripsi veya balonla çekilmesi sırasında koledok mukozal laserasyonları',
      'Duodenal duvar veya koledok perforasyonuna eşlik eden retroperitoneal vasküler yırtılmalar'
    ],
    hemostasisStrategies: [
      'Sfinkterotomi öncesi koagülasyon profilinin optimize edilmesi (INR < 1.5, Trombosit > 50.000/mcL)',
      'Aktif sfinkterotomi kanamasında seyreltik adrenalin (1:10.000) enjeksiyonu ve endoskopik hemoklipsleme',
      'Masif arteriyel kanamada kanama odağına tam kaplı kendiliğinden genişleyen metal biliyer stent (FCSEMS) yerleştirilerek tamponad uygulanması',
      'Refrakter olgularda anjiyo-embolizasyon veya acil cerrahi eksplorasyon hazırlığı'
    ]
  },
  anesthesiaTechniques: {
    primary: [
      'Genel Anestezi (Endotrakeal Entübasyonlu) — Güncel ASGE ve ESGE Kılavuzlarında İleri ve Karmaşık ERCP Olgularında Önerilen Birincil Seçenek: Prone pozisyonda kesin havayolu güvenliği, hareketsizlik ve aspirasyon koruması sağlar',
      'Monitored Anesthesia Care (MAC) / Derin Sedasyon: Hedef kontrollü Propofol infüzyonu + analjezik adjuvan (Fentanil/Remifentanil/Ketamin) — Kısa ve düşük riskli olgularda deneyimli merkezlerde tercih edilir'
    ],
    alternative: [
      'Orta Düzey Sedasyon (Bilinçli Sedasyon): Yalnızca minimal tanısal olgularda (günümüzde ERCP invazivliği ve prone pozisyon zorlukları nedeniyle nadiren tercih edilir)'
    ],
    notes: 'ERAS, ASGE ve ESGE kılavuzları; hastanın yüzüstü (prone) pozisyonda yatması, duodenoskopun geniş çapı, floroskopi tüpünün sürekli hareketi, sfinkterotomi ağrısı ve acil havayolu müdahalesinin prone pozisyonda güç olması nedeniyle, özellikle yaşlı, obez, aspirasyon riski yüksek veya zor kanülasyon beklenen hastalarda endotrakeal genel anesteziyi öncelikli önermektedir.',
    rulesTitle: 'ERCP İŞLEMİNDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'PRONE / YARI-PRONE POZİSYONDA HAVA YOLU GÜVENLİĞİ (GETA TERCİHİ)',
        content: 'ERCP çoğunlukla yüzüstü (prone) veya yüzüstü-sol yan pozisyonda uygulanır; skopi cihazı baş etrafında döner ve endotrakeal tüp olmayan hastada acil havayolu müdahalesi son derece zordur. Obez, OUA, mide retansiyonu olan veya uzun terapötik işlem beklenen hastalarda Endotrakeal Genel Anestezi (GETA) altın standarttır.'
      },
      {
        number: 2,
        title: 'AKUT KOLANJİT, SEPSİS VE HİPOTANSİYON RESÜSİTASYONU',
        content: 'Biliyer obstrüksiyonlu hastalar sıklıkla septik kolanjit ve dehidratasyon tablosunda acil ERCP\'ye alınır. İndüksiyon öncesi geniş lümenli IV yol ile sıvı resüsitasyonu yapılmalı ve Noradrenalin/Efedrin hazır tutulmalıdır; sfinkterotomi esnasında geçici bakteriyemi gelişebileceğinden antibiyotik profilaksisi doğrulanmalıdır.'
      },
      {
        number: 3,
        title: 'SFİNKTEROTOMİ KANAMASI, KOAGÜLOPATİ VE PERFORASYON ALARMİ',
        content: 'Tıkanma sarılığında K vitamini malabsorpsiyonuna bağlı INR uzaması sık görülür; sfinkterotomi öncesi INR < 1.5 ve Trombosit > 50.000/mcL olmalıdır. İşlem sonu veya sırasında karında aşırı sertleşme, subkütan amfizem veya açıklanamayan hipotansiyon gelişirse retroperitoneal duodenal perforasyon akla gelmelidir.'
      },
      {
        number: 4,
        title: 'BİLİYER SPAZM VE POST-ERCP PANKREATİT ÖNLEMİ',
        content: 'Oddi sfinkteri spazmını önlemek için gereksiz yüksek doz morfinden kaçınılmalıdır (gerektiğinde kısa etkili Fentanil/Remifentanil tercih edilir; spazm çözmek için Glukagon veya Hiyosin Butilbromür uygulanabilir). Kontrendikasyon yoksa işlem öncesi Rektal İndometazin/Diklofenak (100 mg) post-ERCP pankreatit riskini %50 azaltır.'
      }
    ]
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Kardiyoloji Konsültasyonu: İskemik kalp hastalığı, kapak patolojisi veya septik kolanjit zemininde kardiyak kısıtlılığı olan hastalarda, floroskopi masasında pozisyonel ve hemodinamik stres yönetimi için.',
      'Göğüs Hastalıkları: Prone pozisyonun yarattığı torasik kompliyans azalması, obezite ve OUA varlığında solunumsal rezervin değerlendirilmesi için.',
      'Hematoloji / Kan Bankası: Endoskopik sfinkterotomi (EST) majör kanama riski taşıdığından, biliyer obstrüksiyona bağlı K vitamini malabsorpsiyonu veya sepsis koagülopatisi olan hastalarda hemostazın düzeltilmesi için.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Akut Kolanjit ve Sepsis Bulguları (Charcot Triadı / Reynolds Pentadı: ateş, titreme, sarılık, sağ üst kadran ağrısı, hipotansiyon ve konfüzyon) — Septik şoktaki hasta işlem öncesi agresif resüsite edilmeli, vazoaktif ajanlar hazır bulundurulmalıdır.',
      'Açlık Süresi & Gastrik Staz (Aspirasyon Riski): Biliyer kolik veya pankreatit atağı geçiren hastalarda mide boşalması belirgin gecikebilir; hasta 12 saat aç olsa dahi mide dolu kabul edilmelidir.',
      'İyotlu Radyokontrast Madde Alerjisi Öyküsü: Floroskopide biliyer kanala radyoopak kontrast enjekte edileceğinden kontrast alerjisi mutlaka sorgulanmalıdır.',
      'Zor Havayolu Parametreleri: Prone pozisyonda entübasyon son derece zor olduğundan entübasyon kararı işlem başında verilmelidir.',
      'Hareketli Protez Dişler: Isırma bloğu yerleştirilmeden önce takma dişler MUTLAKA çıkarılmalıdır.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Koagülasyon Paneli (PT, aPTT, INR, Trombosit Sayısı): Endoskopik sfinkterotomi (EST) koter kesisidir; kanamayı önlemek için INR < 1.5 ve trombosit sayısı > 50.000/mcL olmalıdır (gerekirse K vitamini veya TDP replasmanı).',
      'Karaciğer Fonksiyon Testleri (Total/Direkt Bilirubin, AST, ALT, ALP, GGT): Tıkanma sarılığı ve kolestaz derecesi.',
      'Serum Amilaz ve Lipaz: İşlem öncesi bazal pankreatit durumu belgelenmelidir.',
      'Böbrek Fonksiyonları (BUN, Kreatinin): Kontrast nefropatisi ve sepsis ilişkili akut böbrek hasarı taraması.',
      'Kan Grubu ve Çapraz Karşılaştırma (T&S): Sfinkterotomi kanaması riski için en az 1-2 ünite ES hazır bulundurulmalıdır.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (DII ve V5 derivasyonları), Nabız Oksimetresi (SpO2), Non-invaziv Kan Basıncı (NIBP 3-5 dakika aralıklarla), Isı Probu.',
      'Sürekli Kapnografi (EtCO2): Entübe veya sedasyonlu hastada ventilasyon ve apne takibi için zorunludur.',
      'Floroskopi Radyasyon Güvenliği: Anestezi ekibi kurşun önlük, tiroid koruyucu ve dozimetre kullanmalıdır; skopi tüpünden güvenli mesafe korunmalıdır.',
      'İnvaziv Arteriyel Kan Basıncı (A-Line): Şiddetli kolanjit/sepsiste olan, inotrop/vazopresör gereksinimi bulunan veya ciddi kardiyak hastalığı olanlarda planlanmalıdır.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az 1-2 adet geniş lümenli periferik venöz kateter (18G veya 16G) — Floroskopi masasının ileri-geri hareketleri sırasında hatların çekilmemesi için uzatma hortumları (extension lines) emniyetle tespit edilmelidir.'
    ],
    // 4c) Hasta pozisyonu & fizyolojik güvenlik önlemleri
    patientPosition: 'Prone (Yüzüstü) veya Sol Lateral / Yarı-Prone (Semiprone) Pozisyonu.',
    patientPositionDetails: [
      'Floroskopi altında duodenum ve safra ağacının optimum açıyla görüntülenmesi için prone veya yarı-prone pozisyon standarttır.',
      'Baş sağa dönük tutulur; göğüs kafesi ve pelvis silikon jel yastıklarla desteklenerek karın basısı (vena kava basısı ve diyafram kısıtlılığı) önlenmelidir.',
      'Gözlerin ve Bası Noktalarının Korunması: Prone pozisyonda göz küresine doğrudan bası (iskemik optik nöropati) KESİNLİKLE engellenmeli, gözler koruyucu pomat ve bantla kapatılmalıdır. Brakial pleksus gerilimine dikkat edilmelidir.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'Genel Anestezi İdamesi: Sevofluran/Desfluran veya TIVA (Propofol + Remifentanil); derin sedasyon uygulanıyorsa hedef kontrollü Propofol + Fentanil/Ketamin titrasyonu.',
      'Duodenal Motilitenin Durdurulması (Çok Önemli): Vater papillasının kanülasyonu esnasında duodenal peristaltizm sfinkterotomi telinin kaymasına yol açar. Gastroenteroloğun talebiyle: Butilskopolamin (Buscopan 20 mg IV) veya Glukagon (0.5–1 mg IV) uygulanır (Oddi sfinkterini gevşetir ve duodenal hareketleri durdurur).',
      'Post-ERCP Pankreatit (PEP) Profilaksisi İçin Hidrasyon: İşlem esnasında agresif Ringer Laktat hidrasyonu (3 mL/kg/saat veya işlem başında 20 mL/kg bolus), postoperatif pankreatit riskini dramatik azaltır.',
      'Rektal NSAİİ Profilaksisi: Kontrendikasyon yoksa işlem başında veya bitiminde 100 mg Rektal İndometazin / Diklofenak uygulanması post-ERCP pankreatitini önlemede altın standarttır.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Endotrakeal Entübasyon (Güçlendirilmiş/Spiralli ETT Tercihi): Prone pozisyonda baş rotasyonu esnasında tüpün bükülmesini (kinking) önlemek için spiralli (armored) kaflı tüp idealdir. Tüpün dudak kenarına tespiti çok sağlam yapılmalıdır.',
      'Sedasyon Uygulanıyorsa: Özel kapnografili nazal kanül; prone pozisyonda laringospazm veya apne gelişirse hastayı yüzüstü entübe etmek son derece zordur; acil durumda hasta hızla sırtüstü (supine) çevrilmelidir.',
      'Acil Havayolu Kiti: Aspiratör, Ambu maske, videolaringoskop ve acil entübasyon seti skopi odasında hazır bekletilmelidir.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Vater Papillası Kanülasyonu ve Sfinkterotomi (EST): Diatermi / elektrokoter kullanımı sırasında kardiyak pili (pacemaker/ICD) olan hastalarda dikkat edilmelidir. Akut sfinkterotomi kanaması gelişirse anestezi ekibine haber verilir.',
      'Duodenal veya Koledok Perforasyonu Riski (Kritik Komplikasyon): Retroperitoneal veya intraperitoneal perforasyon (cilt altı amfizem, ani karın distansiyonu, taşikardi veya hipotansiyon ile belirti verir); işlem derhal durdurulur ve cerrahi konsültasyon istenir.',
      'Kontrast Enjeksiyonu ve Kolanjiyovenöz Reflü: Enfekte biliyer sistemde basınç artışı bakterilerin kana geçişine ve işlem esnasında ani bakteriyemiye/septik şoka yol açabilir.',
      'Vagal Stimülasyon: Duodenoskopun gerilimi ve sfinkter manipülasyonunda ani bradikardi/asistoli riski (Atropin 0.5 mg IV hazır bulundurulur).'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Prone -> Supine Pozisyon Değişimi: Vaka bitiminde hasta dikkatle sırtüstü çevrilir, hemodinami anlık takip edilir.',
      'Mide ve Duodenum Gazının Dekompresyonu: Duodenoskop çıkarılmadan önce lümendeki aşırı hava/CO2 cerrah tarafından aspire edilerek diyafram basısı ve postop ağrı azaltılır.',
      'Uyanık ve Normotermik Ekstübasyon: Koruyucu refleksleri tam dönmüş, TOF > 0.9 olan hastada ekstübasyon; aspirasyon takibi.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Post-ERCP ağrısının en tehlikeli kaynağı Post-ERCP Pankreatiti (PEP) ve retroperitoneal perforasyondur; şiddetli kuşak tarzı karın veya sırt ağrısında anında amilaz/lipaz ve görüntüleme istenmelidir.',
      'Standart analjezide IV Parasetamol (1 g q6h) + spazmolitikler (Buscopan) + atılım ağrılarında titre edilmiş düşük doz IV Tramadol (50 mg).',
      'Oddi sfinkter spazmı yapabileceğinden yüksek doz morfinden kaçınılmalıdır.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Medikal Karbondioksit (CO2) İnsüflasyonu: İşlem esnasında oda havası yerine CO2 kullanılması postoperatif karın ağrısı ve distansiyonu en güçlü kanıt düzeyiyle azaltır.',
      'Rektal NSAİİ Profilaksisi: Kontrendikasyon yoksa işlem başında veya bitiminde 100 mg Rektal İndometazin / Diklofenak uygulanması postoperatif ağrıyı ve pankreatiti önlemede esastır.',
      'Karmaşık ve uzun vakalarda genel anestezi ile sedasyon kaynaklı hipoventilasyonun ve işlem içi hasta hareketinin önlenmesi.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Post-ERCP Pankreatiti (PEP) Önleme Paketi: Rektal NSAİİ (İndometazin 100 mg) + periprosedürel agresif Ringer Laktat hidrasyonu + yüksek riskli olgularda profilaktik pankreatik kanal stenti.',
      'Floroskopi radyasyon süresini ve kontrast enjeksiyon hacmini minimumda tutma.',
      'Postoperatif Yakın İzlem: En az 2-4 saat PACU/servis takibi; karın ağrısı, bulantı ve peritoneal bulguların kontrolü.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section XVII: Nonoperating Room Anesthesia (NORA) - Endoscopic Retrograde Cholangiopancreatography (ERCP), pp. 1428–1434. Lippincott Williams & Wilkins.",
    erasReference: 'Enhanced Recovery After Surgery (ERAS®) Society Principles for Ambulatory and Non-Operating Room Interventional Procedures (NORA).',
    prospectReference: 'PROSPECT Guidelines & ESGE / ASGE Consensus: Evidence-based pain and sedation management in advanced interventional endoscopy (ERCP).',
    otherReferences: [
      'ESGE Clinical Guideline: Endoscopic management of acute lower and upper GI hemorrhage and post-sphincterotomy bleeding.',
      'ASGE Standards of Practice Committee: Adverse events associated with ERCP & Sedation and anesthesia in GI endoscopy.',
      'ASA (American Society of Anesthesiologists): Practice Guidelines for Perioperative Blood Management.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 82: Non-Operating Room Anesthesia (NORA).'
    ]
  }
};
