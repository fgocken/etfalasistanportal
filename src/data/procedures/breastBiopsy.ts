import { ProcedureDefinition } from '../../types/procedures';

/**
 * Meme Biyopsileri (Eksizyonel, İnsizyonel ve Tel/Klip ile İşaretli Biyopsiler)
 * 
 * Jaffe (5th ed.), ERAS Society Breast Surgery Guidelines 
 * ve PROSPECT Recommendations referans alınarak yapılandırılmıştır.
 */
export const breastBiopsy: ProcedureDefinition = {
  id: 'breast-biopsy',
  name: 'Meme Biyopsileri (Eksizyonel, İnsizyonel & Tel ile İşaretli Biyopsiler)',
  shortCode: 'MEME-BX',
  specialty: 'genel_cerrahi',
  specialtyName: 'Genel Cerrahi',
  categoryTag: 'Meme Cerrahisi & Girişimsel Tanısal Girişimler',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Palpabl veya non-palpabl (radyoloji eşliğinde tel, radyoaktif tohum/ROLL veya manyetik klip ile işaretlenmiş) şüpheli meme kitlelerinin, mikrokalsifikasyon kümelerinin veya doku lezyonlarının histopatolojik kesin tanı ve cerrahi sınır değerlendirmesi amacıyla total eksizyonu (eksizyonel biyopsi), doku örneğinin çıkarılması (insizyonel biyopsi) veya ameliyathane şartlarında genişletilmiş biyopsisidir.',
  indications: [
    'BI-RADS 4 veya 5 olarak sınıflandırılan şüpheli solid kitleler, yapısal distorsiyon alanları veya pleomorfik mikrokalsifikasyon kümeleri',
    'Radyolojik olarak tel ile işaretlenmiş non-palpabl lezyonların cerrahi rezeksiyonu (WLBB - Wire-Localized Breast Biopsy / ROLL)',
    'Tru-cut (kor iğne) biyopsisinde atipik duktal hiperplazi (ADH), lobüler neoplazi (ALH/LCIS), radial skar, papiller lezyon veya filloides tümör saptanarak cerrahi eksizyon kararı verilen lezyonlar',
    'Tru-cut biyopsi patoloji sonucu ile radyolojik görüntüleme bulgularının uyumsuz (diskordan) olduğu kuşkulu durumlar',
    'Palpabl, hızla büyüyen veya semptomatik meme kitlelerinin (ör. dev fibroadenomlar) tanısal ve terapötik total eksizyonu',
    'Lokal ileri evre veya inoperabl tümörlerde moleküler immünohistokimya ve reseptör tayini (ER, PR, HER2, Ki-67) amacıyla insizyonel örnekleme'
  ],
  averageDuration: '30 - 60 dakika (Palpabl basit kitle eksizyonu: 20-30 dk; Tel lokalizasyonlu eksizyon, derin yerleşimli lezyon veya intraoperatif spesimen mamografisi/frozen incelemesi beklenen vakalar: 45-75 dk)',

  // Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 10 - 30 mL (Minimal / ihmal edilebilir; retromammar veya aksiller kuyruk lezyonlarında nadiren 50 mL\'ye kadar)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal / İhmal Edilebilir Risk (< 50 mL)',
    crossMatchRequirement: 'Rutin kan hazırlığı ve Cross-Match gerekmez. Tip & Screen (T&S) rutin vakalarda önerilmez; ileri derecede koagülopatik veya pansitopenik olgular haricinde kan merkezi rezervasyonu yapılmaz',
    transfusionProbability: '< %0.1 (İstisnai kanama diyatezi vakaları dışında transfüzyon endikasyonu yoktur)',
    criticalBleedingSources: [
      'İnternal torasik (mammar) arter ve venin anterior perforan dalları (özellikle medial/iç kadran lezyonlarında)',
      'Lateral torasik arter ve ven dalları (üst dış kadran ve aksiller uzanımlı lezyonlarda)',
      'Pektoralis majör kas fasyasına invaze veya komşu derin retromammar perforan damarlar',
      'Radyolojide kılavuz tel yerleştirilmesi esnasında telin çekilmesine veya migrasyonuna bağlı parankim içi vasküler laserasyonlar',
      'Antikoagülan / antiagregan kullanan hastalarda cerrahi alanda gelişebilecek doku içi hematom'
    ],
    hemostasisStrategies: [
      'Titiz elektrokoter (bipolar ve hassas monopolar koter) hemostazı',
      'Lokal anestezik solüsyonu içerisine Epinefrin (1:200.000 konsantrasyonda Adrenalin) ilavesi ile mikrovasküler vazokonstrüksiyon',
      'Cerrahi yatağa hemostatik jelatin sünger, oksitlenmiş rejenere selüloz veya topikal trombin matriksi uygulaması',
      'Postoperatif dönemde meme parankimine destek sağlayan sıkı kompresyon bandajı, elastik elastomerik pansuman veya cerrahi sütyen kullanımı'
    ]
  },

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Monitörize Anestezi Bakımı (MAC / Bilinçli Sedoanaljezi) + Cerrah Tarafından Lokal Anestezi İnfiltrasyonu (Lidokain %1-2 veya Bupivakain %0.25-0.5 + 1:200.000 Epinefrin)',
      'Genel Anestezi (Laringeal Maske [LMA] veya Endotrakeal Tüp [ETT]) — Yoğun anksiyeteli, koopere olamayan, derin pektoral yerleşimli lezyonu olan veya bilateral girişim yapılacak hastalar'
    ],
    alternative: [
      'Ultrason Eşliğinde Rejyonel Fasya Plan Blokları (PECS I/II Bloğu, Serratus Anterior Plan Bloğu [SAPB] veya Torasik Paravertebral Blok [TPVB]) + Hafif Sedasyon (Genel anestezinin yüksek risk taşıdığı ciddi kardiyopulmoner komorbiditesi olan hastalarda mükemmel hedefe yönelik anestezi sağlar)',
      'Yalnızca Lokal Anestezi İnfiltrasyonu (Sedasyonsuz, küçük yüzeyel kitlelerde ayaktan poliklinik/küçük cerrahi odası şartlarında)'
    ],
    notes: 'Meme biyopsilerinin büyük kısmı günübirlik (outpatient/ambulatory) cerrahi prosedürlerdir. Hızlı derlenme ve erken taburculuk için MAC (Sedoanaljezi) altın standarttır. Ancak cerrahi örtülerin hastanın baş ve yüzünü kapatması nedeniyle sedasyon derinliğinin dikkatle titre edilmesi ve mikroakım kapnografi ile solunum paterninin kesintisiz izlenmesi şarttır. Derin retromammar lezyonlarda lokal anestezik iğnesi veya cerrahi bistürinin göğüs duvarına/plevraya yaklaşımı pnömotoraks riski açısından cerrahi ekiple koordine edilmelidir.'
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Meme Radyolojisi İletişimi: Tel ile işaretli biyopsilerde (WLBB), kılavuz telin giriş açısı, cilt-lezyon derinliği, tel çengeli ile mikrokalsifikasyon odağının mesafesi ve işlem sonrası radyoloji kontrol grafileri anestezi ve cerrahi ekibince teyit edilmelidir.',
      'Kardiyoloji Konsültasyonu: İskemik kalp hastalığı, aritmisi veya kontrolsüz hipertansiyonu olan hastalarda lokal anestezik içine katılan epinefrinin (adrenalin) oluşturabileceği taşikardi/hipertansif yanıt açısından perioperatif risk değerlendirmesi.',
      'Hematoloji Konsültasyonu / İlaç Kesilme Protokolü: Kronik antikoagülan (Varfarin, DOAK) veya antiagregan (Klopidogrel, Tikagrelor) kullanan hastalarda hematom ve kanama riskini önlemek adına ASRA / ESAIC kılavuzlarına göre ilaç kesilme süreleri planlanmalıdır.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Radyolojide Tel Yerleştirilmesi Sonrası Vazo-Vagal Senkop ve Hipotansiyon Taraması: Hastalar ameliyathaneye sıklıkla aç karnına, oturur/ayakta pozisyonda tel yerleştirilmesinden hemen sonra gelirler. Bu süreçte gelişen vazo-vagal reaksiyon, anksiyete, soğuk terleme, bulantı ve dehidratasyon operasyon öncesi hızla değerlendirilip hidrate edilmelidir.',
      'Kılavuz Tel Güvenliği Kontrolü: Cilt dışına uzanan telin stabilitesi kontrol edilmeli; cerrahi örtünme, boyama ve hastayı pozisyonlandırma sırasında telin kazara çekilmesi, bükülmesi veya derine migrasyonu engellenmelidir.',
      'Lokal Anestezik ve İlaç Alerjisi Öyküsü (özellikle amid grubu lokal anestezikler, lateks, flaster yapıştırıcıları ve cilt antisepsi ajanları).',
      'Havayolu ve Obstrüktif Uyku Apnesi (OUA) Değerlendirmesi: Sedasyon altında supine pozisyonda yüz örtülü iken havayolu kollapsı riski yüksek olan hastalar belirlenmelidir.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hemogram): Bazal hemoglobin ve trombosit sayısı kontrolü.',
      'Koagülasyon Parametreleri (PT, aPTT, INR): Antikoagülan kullanan veya karaciğer bozukluğu olan hastalarda doku içi hematomu önlemek için doğrulanmalıdır.',
      'Gebelik Testi (Beta-hCG): Doğurganlık çağındaki kadın hastalarda preoperatif iyonizan radyasyon (spesimen mamografisi) veya sedatif/anestezik maruziyeti öncesi teyit edilmelidir.',
      'Günübirlik cerrahi standart rutin kan paneli (Glikoz, Kreatinin, Elektrolitler - endikasyon dahilinde).'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (DII ve V5 derivasyonu), SpO2, Non-invaziv Kan Basıncı (NIBP), Isı Takibi.',
      'Sürekli Mikroakım Kapnografi (Microstream EtCO2): Sedasyon / MAC uygulanan tüm hastalarda nazal kanül veya solunum örneklemeli oksijen maskesi ile kesintisiz EtCO2 takibi zorunludur (cerrahi örtü altında gelişebilecek hipoventilasyon ve obstrüktif apnenin saniyeler içinde fark edilmesini sağlar).',
      'Sedasyon Derinliği Skalası (RASS - Richmond Agitasyon-Sedasyon Skalası): Bilinçli sedasyon hedeflendiğinde hastanın sözel komutlara yanıt verebilir düzeyde (RASS -1 ila -2) tutulması, kontrolsüz genel anesteziye kayışın engellenmesi.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'Kontralateral Üst Ekstremiteden 1 Adet 18G veya 20G Periferik Venöz Kateter (Cerrahi yapılan meme tarafındaki koldan cerrahi manipulasyon ve olası lenfatik/vasküler kısıtlamalar nedeniyle damar yolu açılmamalıdır).'
    ],
    // 4c) Hasta pozisyonu
    patientPosition: 'Supine (Sırtüstü) Pozisyon, Operasyon Tarafındaki Kol 90°\'den Az Abdüksiyonda.',
    patientPositionDetails: [
      'İpsilateral kol armboard üzerine 80-90°\'yi aşmayacak şekilde yumuşak silikon destekle yerleştirilir (brakial pleksusun traksiyon gerilme nöropatisini önlemek için aşırı abdüksiyon ve hiperekstansiyondan kesinlikle kaçınılmalıdır).',
      'Lezyon üst dış kadranda veya aksiller uzanımda ise, operasyon tarafı toraks altına ince bir silikon rulo/yastık konularak 15-20° hafif lateral eğim verilebilir (memenin göğüs duvarında yayılması ve cerrahi görüşü kolaylaştırır).',
      'Baş hafifçe karşı tarafa çevrilir; cerrahi örtülerin hastanın yüzüne temas etmesini önlemek ve anestezistin hastanın havayolunu doğrudan görebilmesini sağlamak için anestezi örtü askısı (ether screen) veya mayo masası siperi oluşturulur.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'MAC / Sedoanaljezi Protokolü: İndüksiyon/Giriş: Midazolam 1-2 mg IV + Fentanil 25-50 mcg IV bolus. İdame: Propofol hedef kontrollü infüzyon (TCI 0.8–1.5 mcg/mL) veya mikrodamlalık infüzyonu (25–50 mcg/kg/dk) ya da aralıklı 10-20 mg Propofol bolusları.',
      'Lokal Anestezik İnfiltrasyonu ve Epinefrin Yanıtı: Cerrahın lezyon etrafına ve cilt altına uyguladığı Epinefrinli Lidokain/Bupivakain infiltrasyonu sırasında geçici sinüs taşikardisi ve tansiyon yükselmesi gelişebilir; anestezi ekibi hemodinamiyi dikkatle izlemelidir.',
      'Lokal Anestezik Sistemik Toksisitesi (LAST) Titizliği: Meme dokusu yüksek oranda vaskülarize olduğundan ve infiltrasyon hacmi 20-40 mL\'yi bulabileceğinden maksimum güvenli toksik dozlar (Lidokain + Epinefrin: 7 mg/kg; Bupivakain: 2 mg/kg) kesinlikle aşılmamalıdır; alanda %20 Lipid Emülsiyonu (Intralipid) hazır bulundurulmalıdır.',
      'Pnömotoraks Riski Farkındalığı: Özellikle derin yerleşimli, retromammar lezyonlarda pektoral fasya tabanında iğne veya cerrahi koter/bistürinin göğüs duvarını ve pariyetal plevrayı delme riski akılda tutulmalı; ani SpO2 desatürasyonu, taşikardi veya plöritik nefes darlığında plevra oskültasyonu ve akciğer ultrasonu yapılmalıdır.',
      'Spesimen Mamografisi / Frozen İnceleme Bekleme Aralığı: Eksizyon sonrası spesimen radyolojiye veya patolojiye gönderildiğinde operasyon 15-30 dakika süreyle durur. Bu bekleme aralığında sedatif infüzyon dozları azaltılmalı, hasta gereksiz yere aşırı derinleştirilmemeli ve hasta normotermisi (ısıtıcı battaniye ile) korunmalıdır.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'MAC / Sedasyon Vakalarında: Nazal kanül veya CO2 örneklemeli venturi maskesi ile 2-4 L/dk O2 desteği; çene desteği (chin lift/jaw thrust) ve nazofaringeal airway gereksinimine anında hazır olunmalıdır.',
      'Genel Anestezi Uygulanan Vakalar: 2. nesil Laringeal Maske (LMA ProSeal / Supreme / i-gel) ilk tercihtir; spontan solunum veya hafif basınç destekli ventilasyon (PSV) ile mükemmel havayolu kontrolü sağlar.',
      'Obez, şiddetli gastroözofageal reflüsü olan veya derin yerleşimli lezyon nedeniyle relaksasyon gereken olgularda oral endotrakeal entübasyon (ETT).'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Tel Çıkış Deliği ve Cilt İnsizyonu Aşaması: En yoğun nosiseptif uyarının oluştuğu andır; cerrahın lokal infiltrasyonunun yeterli derinliğe ulaştığı doğrulanmalı, gerekirse ilave 25 mcg Fentanil veya 10-20 mg Propofol desteği verilmelidir.',
      'Tel Boyunca Diseksiyon ve Lezyon Rezeksiyonu: Kılavuz telin cerrahi makas/koter ile kesilmemesi ve lezyonun sağlam cerrahi sınırlarla çıkarılması için cerrah traksiyon uygular. Pektoral kas fasyasına yakın derin diseksiyonda ani ağrı veya kas seyirmesi görülebilir.',
      'Spesimen Radyografisi / Patoloji Doğrulaması: Radyoloji, mikrokalsifikasyonların ve tel çengelinin çıkarılan doku içinde olduğunu onaylayana kadar cerrahi alan açık ve beklemededir; hemostaz kontrol altında tutulmalı ve sedasyon seviyesi hafifletilmelidir.',
      'Cerrahi Kapanış ve Kompresyonel Pansuman: Yara dudaklarına uzun etkili lokal anestezik infiltrasyonu yapılmalı ve doku içi hematom gelişimini önlemek amacıyla sıkı baskılı pansuman uygulanmalıdır.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Hızlı ve Berrak Derlenme: Kısa etkili ajanlar (Propofol, Fentanil) kullanıldığından sedasyon sonlandırıldığında hasta dakikalar içinde uyanmalı, oryantasyonu tam olmalı ve sözel komutlara yanıt vermelidir.',
      'Vazo-Vagal Senkop ve Ortostatik Hipotansiyon Önlemi: Hasta aniden ayağa kaldırılmamalı veya dik oturtulmamalıdır; ameliyat masasında 5-10 dakika yarı oturur pozisyonda dinlendirildikten sonra derlenme odasına (PACU) transfer edilmelidir.',
      'PONV Profilaksisi: Ayaktan günübirlik cerrahi taburculuğunu hızlandırmak için operasyon başında Deksametazon (4 mg IV) veya cerrahi bitiminde Ondansetron (4 mg IV) uygulanmalıdır.',
      'Cerrahi Pansuman ve Doku Drenaj Kontrolü: Cilt insizyonu ve baskılı bandaj altından aktif arteriyel kanama, hematom gerginliği veya pansuman kirlenmesi olmadığı doğrulanmalıdır.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Meme biyopsisi sonrası ağrı genellikle hafif-orta şiddettedir ve multimodal non-opioid analjezik rejimleri ile mükemmel kontrol edilir.',
      'Cerrahi Yara Yerine Lokal Anestezik İnfiltrasyonu (Bupivakain %0.25 veya Levobupivakain): Postoperatif ilk 6-12 saat boyunca nosiseptif ağrıyı belirgin biçimde bloke eder.',
      'Sistemik Non-Opioid Analjezi: IV/Oral Parasetamol (1 g q6h) + Oral/IV NSAİİ (İbuprofen 400-600 mg veya Deksaketoprofen 25-50 mg - cerrahi hemostaz sağlandıktan sonra).',
      'Opioid Kısıtlaması: Rutin postoperatif opioid reçetesinden kaçınılmalıdır; şiddetli refrakter ağrıda yalnızca düşük doz kurtarıcı oral Tramadol veya Kodein düşünülmelidir.',
      'Destekleyici Cerrahi Sütyen / Kompresyonel Elastik Bandaj: Memenin hareketini ve doku içi gerilimi sınırlandırarak ağrıyı, seroma ve hematom gelişimini belirgin azaltır.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Cerrahi yara yerine lokal anestezik infiltrasyonu: İnsizyon öncesi veya ameliyat bitiminde yara tabanına ve fasya üzerine lokal anestezik infiltrasyonu en yüksek kanıt düzeyine sahiptir.',
      'Sistemik Parasetamol ve NSAİİ / COX-2 İnhibitörü kombinasyonu: Rutin opioid kullanımını önler, yan etki profilini azaltır ve erken taburculuk skorlarını iyileştirir.',
      'Gereksiz derin anesteziden kaçınma ve sedasyon derinliğinin objektif titrasyonu: Postoperatif sedasyon uzamasını ve bulantı-kusmayı önler.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Ayaktan Cerrahi (Day-Surgery / Ambulatuvar) Protokolleri: Hastaların aynı gün 1-2 saat içinde taburcu edilebilmesi için kısa etkili sedatiflerin/anesteziklerin kullanımı ve gereksiz açlık sürelerinin önlenmesi.',
      'Preoperatif Detaylı Bilgilendirme ve Anksiyete Yönetimi: Radyolojik tel işaretlemesi ve operasyon süreci hakkında kapsamlı bilgilendirme perioperatif vazo-vagal reaksiyonları ve anksiyeteyi anlamlı düzeyde azaltır.',
      'PONV Profilaksisi ve Opioid-Sparing Strateji: Postoperatif taburculuğu geciktiren en temel iki faktör olan postoperatif bulantı-kusma ve aşırı sedasyonun önlenmesi.',
      'Erken Mobilizasyon ve Erken Oral Beslenme: İşlemden 1 saat sonra berrak sıvı alımı ve yardımsız mobilizasyon sonrası güvenli taburculuk kriterlerinin (PADSS skoru ≥ 9) sağlanması.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section I: General Surgery - Excisional Breast Biopsy / Wire-Localized Breast Biopsy, pp. 268–272. Lippincott Williams & Wilkins.",
    erasReference: 'Temple-Oberle, C., et al. Clinical practice guidelines for Enhanced Recovery After Surgery (ERAS) in breast surgery. Enhanced Recovery After Surgery (ERAS®) Society Recommendations. Am J Surg / World J Surg.',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in oncological breast surgery and localized breast procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'ASA (American Society of Anesthesiologists). Practice Advisory for Preanesthesia Evaluation and Ambulatory Surgery Management. Anesthesiology.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 68: Ambulatory (Outpatient) Anesthesia & Breast Surgery. Elsevier.',
      'Barash, P. G., et al. Clinical Anesthesia (8th ed.). Outpatient Anesthesia and Monitored Anesthesia Care (MAC). Lippincott Williams & Wilkins.',
      'ASRA (American Society of Regional Anesthesia and Pain Medicine) Practice Advisory on Local Anesthetic Systemic Toxicity (LAST).'
    ]
  }
};
