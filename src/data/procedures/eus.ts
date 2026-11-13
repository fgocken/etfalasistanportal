import { ProcedureDefinition } from '../../types/procedures';

/**
 * Endoskopik Ultrasonografi (EUS) ve EUS Eşliğinde İnce İğne Biyopsisi (EUS-FNA / FNB)
 * 
 * Jaffe (5th ed.), ASGE Standards of Practice, ESGE Clinical Guidelines 
 * ve ERAS Society NORA prensipleri referans alınarak yapılandırılmıştır.
 */
export const eus: ProcedureDefinition = {
  id: 'eus',
  name: 'Endoskopik Ultrasonografi (EUS) & EUS-FNA/FNB',
  shortCode: 'EUS',
  specialty: 'gastroenteroloji',
  specialtyName: 'Gastroenteroloji',
  categoryTag: 'İleri Girişimsel Endoskopi & NORA (Ultrasonografik Biyopsi / Drenaj)',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Uç kısmında yüksek frekanslı minyatür ultrason transdüseri taşıyan özel ekoendoskop (radyal veya lineer) yardımıyla gastrointestinal lümenden (özofagus, mide, duodenum, rektum) komşu duvar tabakalarının, pankreas, safra yolları, mediastinal/çölyak lenf nodları ve vasküler yapıların yüksek çözünürlüklü görüntülenmesi; lineer ekoendoskop eşliğinde şüpheli lezyonlara gerçek zamanlı ince iğne aspirasyon/kor biyopsisi (EUS-FNA / EUS-FNB), kistogastrostomi (LAMS/stent) veya çölyak pleksus blokajı/nörolizi uygulanması işlemidir.',
  indications: [
    'Pankreas kitleleri, kistik lezyonları (IPMN, müsinöz kistadenom) ve kronik pankreatit değerlendirmesi',
    'Gastrointestinal traktus submukozal lezyonlarının (GIST, leyomiyom, lipom) ve karsinomlarının T/N evrelemesi',
    'Mediastinal, perigastrik, periduodenal ve çölyak lenfadenopatilerin EUS-FNA/FNB ile histopatolojik tanısı',
    'Biliyer striktürler, ampuller neoplaziler ve mikrolitiyazis araştırması',
    'Terapötik Girişimler: Pankreatik psödokist veya walled-off nekroz (WON) kistogastrostomisi/drenajı, lümen apozisyonel metal stent (LAMS) uygulamaları',
    'İntraktabl malign pankreas/üst GIS kanser ağrısında EUS eşliğinde Çölyak Pleksus Nörolizi (CPN) / Blokajı (CPB)'
  ],
  averageDuration: '25 - 60 dakika (Tanısal Radyal EUS: 20-30 dk; Lineer EUS-FNA/FNB: 30-45 dk; Terapötik Kistogastrostomi / Çölyak Nörolizi: 45-75 dk)',

  // Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 mL (Tanısal radyal EUS\'ta 0 mL; EUS-FNA/FNB iğne geçişinde < 10 mL ihmal edilebilir; kistogastrostomi ve nekrozektomi drenajlarında 20–100 mL)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Risk (FNA/FNB biyopsisinde kanama insidansı < %1; terapötik kist drenajında %2–4)',
    crossMatchRequirement: 'Tanısal EUS ve standart FNA/FNB için rutin kan hazırlığı gerekmez (Terapötik LAMS kistogastrostomi / nekrozektomi planlananlarda 1-2 Ünite ES rezerve edilmelidir)',
    transfusionProbability: 'Tanısal ve FNA/FNB\'de < %0.5 (Terapötik nekrozektomide %3–5)',
    criticalBleedingSources: [
      'İğne geçiş trasesinde vasküler yapıların delinmesi (Portal ven, süperior mezenterik ven, gastroduodenal arter)',
      'Vaskülarize kitle veya kist duvarındaki psödoanevrizmaların delinmesi',
      'Mide/duodenum duvarında kistogastrostomi traktüsü açılırken submukozal damar kesisi',
      'İğne batırılmış durumdayken hastanın ani öksürme veya öğürmesi sonucu oluşan vasküler yırtılmalar'
    ],
    hemostasisStrategies: [
      'İğne batırılmadan önce Renkli Doppler ile lezyon önündeki ve trasedeki tüm damarların taranması',
      'Biyopsi anında hastanın mutlak hareketsizliğinin ve derin sedasyonunun garanti edilmesi',
      'Lümen apozisyonel metal stent (LAMS / Hot AXIOS) ile kistogastrostomi traktüsünde mekanik tamponad sağlanması',
      'İşlem öncesi INR < 1.5 ve trombosit sayısı > 50.000/mcL sınırlarının titizlikle doğrulanması'
    ]
  },
  anesthesiaTechniques: {
    primary: [
      'Monitörizeli Anestezi Bakımı (MAC) / Hedefe Yönelik Derin Sedasyon: Hedef kontrollü veya titre edilen Propofol infüzyonu + analjezik adjuvan (Fentanil/Remifentanil/Ketamin) — Tanısal ve standart FNA/FNB olgularında en sık uygulanan konforlu yöntemdir',
      'Genel Anestezi (Endotrakeal Entübasyonlu): İleri terapötik EUS (kistogastrostomi, nekrozektomi), obez/OUA hastalar, gastrik retansiyon/aspirasyon riski yüksek veya uzun sürmesi öngörülen zorlu vakalarda kesin havayolu ve mutlak hareketsizlik için önerilir'
    ],
    alternative: [
      'Orta Düzey Sedasyon (Bilinçli Sedasyon): Yalnızca minimal invaziv, kısa ve tecrübeli ellerde tanısal radyal EUS için (FNA ve terapötik girişimlerde ani hasta hareketi vasküler yaralanma riski doğurduğundan tercih edilmez)'
    ],
    notes: 'EUS işlemlerinde hasta hareketsizliği yaşamsal önem taşır: İğne lezyona (özellikle pankreas başı, portal ven veya mezenterik damar komşuluğu) batırılmışken hastanın öğürmesi, öksürmesi veya kıpırdaması fatal vasküler laserasyonlara yol açabilir. Bu nedenle sedasyon düzeyi kesintisiz derinlikte tutulmalı, şüpheli havayolunda entübe genel anesteziye geçilmelidir.',
    rulesTitle: 'ENDOSKOPİK ULTRASONOGRAFİDE (EUS) TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'FNA / FNB İĞNE BİYOPSİSİ ANINDA MUTLAK HAREKETSİZLİK',
        content: 'Pankreas kitleleri, çölyak pleksus veya mediastinal lenf nodlarına 19G-22G iğne ile girilirken iğne ucu portal ven, splenik arter veya aorttan milimetreler uzaktadır. Öğürme, öksürük veya ani uyanma hareketi ölümcül iç kanamaya yol açar; biyopsi öncesi hedef derinlik/stabilite kesinleştirilmelidir.'
      },
      {
        number: 2,
        title: 'RİJİT VE KALIN EKOENDOSKOP İLE FARENGEAL/ÖZOFAGEAL GÜVENLİK',
        content: 'Ekoendoskopun uç kısmı standart gastroskoptan daha uzun, kalın ve rijittir; krikofaringeal geçiş sırasında faringeal travma ve laringospazm riski yüksektir. İndüksiyonda baş-boyun hizalaması iyi sağlanmalı ve endoskop geçerken yeterli anestezi derinliği mevcut olmalıdır.'
      },
      {
        number: 3,
        title: 'MİDE ÇIKIŞI OBSTRÜKSİYONU VE KİST DRENAJINDA ASPİRASYON KORUMASI',
        content: 'Pankreas başı tümörü bulunan olgularda sıklıkla gizli gastrik çıkış obstrüksiyonu (mide stazı) bulunur; ayrıca büyük psödokist/WOPN drenajında (LAMS / Hot AXIOS) aniden mideye litrelerce kist sıvısı boşalabilir. Bu yüksek riskli olgularda Endotrakeal Genel Anestezi (RSI) mutlak tercih edilmelidir.'
      },
      {
        number: 4,
        title: 'ÇÖLYAK PLEKSUS BLOKAJI HİPOTANSİYONU VE SÜREKLİ HEMODİNAMİ',
        content: 'EUS eşliğinde çölyak pleksus nörolizi/blokajı (CPB/CPN) uygulanan olgularda ani splanknik vazodilatasyona bağlı şiddetli ortostatik hipotansiyon ve ishal gelişebilir. İşlem öncesi yeterli IV kristaloid yüklemesi yapılmalı ve işlem sonrası kan basıncı yakından takip edilmelidir.'
      }
    ]
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Kardiyoloji Konsültasyonu: EUS planlanan ileri yaş, koroner arter hastalığı veya stentli hastalarda antiagregan/antikoagülan kesilme/köprüleme protokolünün netleştirilmesi için.',
      'Göğüs Hastalıkları: Kronik obstrüktif akciğer hastalığı (KOAH) veya OUA tanısı olanlarda sedasyon kaynaklı hipoventilasyon riskinin belirlenmesi için.',
      'Hematoloji / Gastroenteroloji Konsültasyonu: EUS-FNA ve EUS-FNB yüksek kanama riski taşıyan işlemlerdir; antikoagülan (DOAK, Warfarin) ve antitrombositer ajanların (klopidogrel, tikagrelor) ASGE/ESGE rehberine uygun kesilme zamanlaması teyit edilmelidir.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Gastrik Çıkış Obstrüksiyonu & Mide Retansiyonu: Pankreas başı kitlesi veya duodenal darlık olan hastalarda mide boşalması günlerce gecikebilir. 12 saat aç olsalar dahi midede birikmiş gıda/safra içeriği bulunabilir; aspirasyon riski çok yüksektir.',
      'Ekoendoskopun Rijit Ucu & Farengeal Geçiş Riski: EUS endoskopunun uç kısmı standart gastroskoplara göre daha kalın, rijit ve uzundur. Krikofaringeal bölgeden ve Zenker divertikülünden geçerken perforasyon riski daha yüksektir; boyun mobilitesi ve farenks anatomisi incelenmelidir.',
      'Alerji Öyküsü: Terapötik kist drenajlarında kullanılacak kontrast veya antibiyotik alerjisi (profilaktik Florokinolon/Sefalosporin).',
      'Protez Dişler: Ağız içine diş koruyucu blokaj yerleştirilmeden önce mutlaka çıkarılmalıdır.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Koagülasyon Parametreleri (INR, aPTT, Trombosit Sayısı): EUS-FNA ve FNB için INR < 1.5, trombosit sayısı > 50.000/mcL olmalıdır. Terapötik kistogastrostomi ve nekrozektomide trombosit > 80.000/mcL hedeflenir.',
      'Tam Kan Sayımı (Hb / Hct): Olası gizli veya belirgin kitle kanaması bazalinin belirlenmesi.',
      'Karaciğer ve Böbrek Fonksiyon Testleri: Biliyer bası derecesi ve organ fonksiyonları.',
      'Kan Grubu ve Antikor Tarama: Terapötik veya vasküler komşuluklu biyopsilerde cross-match hazır bulundurulmalıdır.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (özellikle aritmi ve iskemi takibi), SpO2, Non-invaziv Kan Basıncı (NIBP 3-5 dk aralıkla).',
      'Sürekli Mikroakım Kapnografi (EtCO2): Sedasyon altındaki spontan soluyan hastada hipoventilasyon, hava yolu obstrüksiyonu ve apneyi erkenden yakalamak için ZORUNLUDUR.',
      'Derinlik Monitörizasyonu (BIS - Opsiyonel/Önerilen): İğne biyopsisi sırasında beklenmedik uyanma ve hareketlerin önlenmesi için sedasyon derinliğinin stabil tutulmasına yardımcı olur.',
      'İnvaziv Arter Monitörizasyonu: Çölyak pleksus nörolizi planlanan, anstabil kardiyovasküler komorbiditesi olan kritik hastalarda.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az bir adet geniş lümenli (18G veya 20G) periferik venöz kateter — İnfüzyon pompaları ve acil resüsitasyon ilaçları için uzatma hatlarıyla güvenli tespit.'
    ],
    // 4c) Hasta pozisyonu & fizyolojik güvenlik önlemleri
    patientPosition: 'Sol Lateral Dekubitus Pozisyonu (Gereğinde yarı-prone / supine).',
    patientPositionDetails: [
      'Hasta sol tarafına yatırılır; baş nötral veya hafif fleksiyonda tutulur, boyun hiperekstansiyonundan farenks basısını artırmamak için kaçınılır.',
      'Bacaklar kalça ve dizlerden hafif bükülü desteklenir; kollar arasına ve dizler arasına basıyı önleyici jel pedler yerleştirilir.',
      'Ağız içine anatomik ısırma koruyucu (bite-block) yerleştirilir ve elastik bantla kafaya sabitlenir.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'MAC İdamesi: Propofol (hedef kontrollü infüzyon 2-4 mcg/mL veya 50-100 mcg/kg/dk) + düşük doz Fentanil (0.5-1 mcg/kg) veya Remifentanil (0.02-0.05 mcg/kg/dk titrasyonu). Alternatif olarak Ketofol kombinasyonu.',
      'Hareketsizliğin Sağlanması (En Kritik Unsur): Biyopsi iğnesi lezyona saplandığı anda gastroenterolog "hasta kıpırdamasın" komutu verir; bu esnada derin anestezi/sedasyon garanti edilmelidir.',
      'Çölyak Pleksus Nörolizi (CPN) Spesifik Yönetimi: Çölyak ganglionuna mutlak alkol / bupivakain enjeksiyonu sempatik tonusu aniden ortadan kaldırarak ŞİDDETLİ HİPOTANSİYON ve refleks vazodilatasyona neden olur. İşlem öncesi 500-1000 mL kristaloid hidrasyonu yapılmalı, Efedrin veya Fenilefrin hazır bulundurulmalıdır.',
      'Duodenal Motilite Baskılanması: Duodenumdan yapılan pankreas ve safra yolu taramalarında peristaltizmi durdurmak için Butilskopolamin (Buscopan 20 mg IV) veya Glukagon (0.5 mg IV) uygulanabilir.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Büyük Çaplı Ekoendoskopun Yarattığı Bası: Ekoendoskop laringofaringeal bölgede posterior bası yaparak parsiyel obstrüksiyon ve desatürasyon geliştirebilir.',
      'Oksijenasyon Desteği: Kapnografi portlu modifiye nazal kanül veya özel endoskopi yüz maskesi ile 4-6 L/dk O2 desteği.',
      'Havayolu Manevraları: Sedasyon derinleştiğinde anestezi teknikeri/uzmanı tarafından çene itme (jaw-thrust) manevrası ile havayolu açık tutulmalıdır.',
      'Acil Havayolu Hazırlığı: Sedasyon sırasında kontrolsüz apne veya laringospazm durumunda endoskopun acilen çıkarılması, videolaringoskop, endotrakeal tüp ve aspiratörün başucunda hazır olması şarttır.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Krikofaringeal ve Üst Özofagus Geçişi: Ekoendoskopun kalın ve rijit yapısı nedeniyle iatrojenik farenks/özofagus perforasyonunun en sık görüldüğü andır; zorlamadan nazik geçiş sağlanmalıdır.',
      'Vasküler Doppler Taraması & İğne Girişi (FNA/FNB): İğne lezyona girmeden önce renkli Doppler ile lezyon önündeki damarlar taranır. Damar içi iğne girişi ve hastanın hareketi masif intraabdominal hematoma yol açabilir.',
      'Kistogastrostomi ve Sıcak AXIOS / LAMS Uygulaması: Kist içine koter destekli stent atılırken intragastrik gaz dekompresyonu ve hasta stabilitesi hayati önem taşır.',
      'Vagal Uyarı: Endoskopun manevralarında ani bradikardi gelişebilir; Atropin (0.5 mg IV) hazır bulundurulmalıdır.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'İntragastrik Havanın/Gazın Boşaltılması: İşlem sonunda gastroenterolog midedeki havayı tamamen aspire etmelidir; aşırı mide distansiyonu diyafram basısına ve uyanma ajitasyonuna yol açar.',
      'Aspirasyon Riski: Ekoendoskop çıkarılırken orofarenkste biriken tükürük ve sekresyonlar nazikçe aspire edilmelidir.',
      'Uyanma Kriterleri: Koruyucu refleksleri tam dönmüş, vital bulguları stabil hastalar derlenme odasına (PACU) transfer edilir.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Tanısal EUS sonrası ağrı genellikle minimaldir (hafif boğaz ağrısı ve gaz şişkinliği).',
      'EUS-FNA veya FNB sonrası gelişen ŞİDDETLİ KARIN AĞRISI; akut pankreatit (%1-2), hematom veya perforasyon göstergesi olabilir; acil amilaz/lipaz ve fizik muayene yapılmalıdır.',
      'Standart analjezide IV Parasetamol (1 g) ilk tercihtir; spazmodik ağrılarda Butilskopolamin eklenebilir.',
      'Çölyak Nörolizi Sonrası: Ağrıda dramatik azalma beklenir; ancak geçici lokal sırt ağrısı, ishal (sempatik blokaj nedeniyle parasempatik hakimiyet) ve ortostatik hipotansiyon görülebilir.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Karbondioksit (CO2) İnsüflasyonu: Oda havası yerine medikal CO2 insüflasyonu kullanılması işlem sonrası abdominal gerginlik ve kramp ağrılarını belirgin biçimde azaltır.',
      'Multimodal Analjezi ve Opioid Koruyucu Yaklaşım: Gereksiz yüksek doz opioidlerden kaçınarak sedasyon kaynaklı solunum depresyonu riskini minimize etme.',
      'Postoperatif Bulantı-Kusma (PONV) Profilaksisi: Propofol bazlı TIVA/MAC kullanımı doğal antiemetik etki sağlar; riskli hastalara IV Ondansetron (4 mg) eklenmesi önerilir.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Sedasyon Derinliğinin Titrasyonu: İşlem biter bitmez hastanın hızlı derlenmesini ve bilişsel fonksiyonların normale dönmesini sağlayacak kısa etkili ajanların (Propofol) kullanımı.',
      'Erken Oral Alım ve Mobilizasyon: Komplikasyonsuz tanısal EUS vakalarında işlemden 1-2 saat sonra sıvı gıda başlanması ve erken taburculuk.',
      'Taburculuk Kriterleri (Aldrete / PADSS): Skor ≥ 9 olan, oral sıvı tolere eden, eşlikçisi bulunan hastaların güvenle taburcu edilmesi; kanama ve perforasyon uyarı semptomlarının hastaya yazılı verilmesi.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section XVII: Nonoperating Room Anesthesia (NORA) - Endoscopic Ultrasound (EUS) & Fine-Needle Aspiration, pp. 1435–1440. Lippincott Williams & Wilkins.",
    erasReference: 'Enhanced Recovery After Surgery (ERAS®) Society Guidelines for Perioperative Care in Ambulatory and Non-Operating Room Anesthesia (NORA).',
    prospectReference: 'PROSPECT Guidelines & ESGE / ASGE Consensus: Sedation, analgesia and patient safety in advanced diagnostic and interventional endoscopy.',
    otherReferences: [
      'ESGE (European Society of Gastrointestinal Endoscopy) Guideline: Endoscopic ultrasound-guided sampling in gastroenterology (EUS-FNA / FNB) & Bleeding Risk Management.',
      'ASGE Standards of Practice Committee: Adverse events associated with EUS and therapeutic interventions.',
      'ASA (American Society of Anesthesiologists): Practice Guidelines for Perioperative Blood Management.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 82: Non-Operating Room Anesthesia (NORA).'
    ]
  }
};
