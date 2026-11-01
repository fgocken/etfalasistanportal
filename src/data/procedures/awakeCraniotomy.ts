import { ProcedureDefinition } from '../../types/procedures';

/**
 * Uyanık Kraniyotomi (Awake Craniotomy)
 * 
 * Jaffe (5th ed.), ERAS Society Craniotomy Consensus Guidelines, 
 * PROSPECT ve SNACC (Society for Neuroscience in Anesthesiology and Critical Care) 
 * konsensus raporları referans alınarak yapılandırılmıştır.
 */
export const awakeCraniotomy: ProcedureDefinition = {
  id: 'awake-craniotomy',
  name: 'Uyanık Kraniyotomi',
  shortCode: 'UYANIK-KRAN',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Onkolojik Nöroşirürji',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Beynin elokent alanlarında (motor korteks, primer duyu alanı, Broca ve Wernicke dil alanları) yerleşen lezyonların rezeksiyonu veya epileptojenik odak cerrahisi sırasında; kalıcı nörolojik defisit gelişimini önlemek amacıyla hastanın kortikal haritalama ve rezeksiyon aşamasında tamamen uyandırılarak nöromonitörizasyon ve nöropsikolojik testlerin uygulandığı kraniyotomi ameliyatıdır.',
  indications: [
    'Elokent korteks ve subkortikal yolaklar (kortikospinal trakt, arkuat fasikül) komşuluğundaki düşük ve yüksek dereceli gliomlar ile intraaksiyel beyin tümörleri',
    'İntraktabl fokal epilepsi cerrahisi (epileptojenik odak sınırlarının elektrokortikografi [ECoG] ile belirlenmesi ve elokent alan sınırlarının korunması)',
    'Elokent motor ve konuşma alanlarında yerleşik derin arteriovenöz malformasyonlar (AVM) ve kavernomlar',
    'Derin Beyin Stimülasyonu (DBS) elektrot yerleştirme prosedürleri'
  ],
  averageDuration: '3 - 6 saat (Pozisyonlama ve Skalp Bloğu: 45-60 dk; Kemik flep açılışı: 45-60 dk; Uyanık haritalama ve rezeksiyon: 60-120 dk; Kapanış: 45-60 dk)',

  // Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 250 mL (Standart gliom rezeksiyonunda kontrollüdür; ancak dural venöz sinüs komşuluğunda, aşırı vaskülarize gliom/menenjiyom veya AVM olgularında 500–1000+ mL ani masif kanama riski taşır)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama',
    crossMatchRequirement: 'En az 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match yapılarak kan merkezinde hazır bekletilmeli; Tip-Tarama ve antikor paneli doğrulanmalıdır',
    transfusionProbability: '%5 - %12 (Tümör vaskülaritesine ve venöz sinüs tutulumuna bağlı)',
    criticalBleedingSources: [
      'Skalp kesisi ve vasküler flep kenarları (A. temporalis superficialis, A. occipitalis dalları)',
      'Kemik flebi kenarları ve diploik venöz göllenmeler',
      'Dura mater ve orta meningeal arter (MMA) dalları',
      'Dural Venöz Sinüsler (Superior sagittal sinüs veya transvers sinüs laserasyonu hem masif kanama hem de fatal venöz hava embolisi yaratabilir)',
      'Tümör içi derin besleyici arteriyel pediküller ve köprü venleri'
    ],
    hemostasisStrategies: [
      'Skalp hemostazı için Raney klipsleri veya Dandy klempleri; kemik kenarlarına kemik mumu (bone wax)',
      'Bipolar mikro-koagülasyon, topikal hemostatik jelatin matriksler (FloSeal, Surgicel, pamuk pattiler)',
      'Hemodinamik Kontrol: Uyanıklık aşamasında anksiyete ve ajitasyona bağlı hipertansiyon kanamayı şiddetlendirir; MAP hedefe göre titre edilmelidir',
      'Aşırı kanama ve mikrovasküler sızıntılarda Traneksamik Asit (TXA 1 g IV yavaş infüzyon) ve cell-saver (malignite dışı lezyonlarda) hazırlığı'
    ]
  },
  anesthesiaTechniques: {
    primary: [
      'Asleep-Awake-Asleep (AAA) Tekniği: Açılış evresinde LMA/sedasyon altında anestezi -> Kortikal haritalama ve rezeksiyon evresinde tam uyanıklık ve kooperasyon -> Kapanış evresinde tekrar sedasyon/anestezi',
      'Monitored Anesthesia Care (MAC) / Conscious Sedation: Ameliyat boyunca hastanın spontan solunumu korunarak hafif/orta sedasyon ve iki taraflı bölgesel Skalp Bloğu eşliğinde vakanın yürütülmesi',
      'Awake-Awake-Awake (Saf Bölgesel Anestezi): Başından sonuna kadar minimal sedasyon ve titizlikle uygulanmış Skalp Bloğu (özellikle solunum depresyonundan kesin kaçınılması gereken olgularda)'
    ],
    alternative: [
      'Acil Dönüşüm Planı (Emergency Airway Rescue): Fokal/jeneralize nöbet, hava embolisi, masif kanama, akut beyin şişmesi veya hastanın ajite olup koopere olamaması halinde baş Mayfield çivisine tespitliyken videolaringoskop, LMA veya fiberoptik ile acil genel anesteziye geçiş'
    ],
    notes: 'Uyanık kraniyotomide başarının temeli; mükemmel uygulanmış iki taraflı Skalp Bloğu (Scalp Block), solunumu deprese etmeden hızlı kooperasyon sağlayan kısa etkili ajanlar (Deksmedetomidin, Remifentanil, Propofol) ve hastanın ameliyat öncesi ayrıntılı nöropsikolojik/psikolojik hazırlığına dayanır.'
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Nöropsikoloji / Dil ve Konuşma Terapisi (DKT) Konsültasyonu: Hastanın ameliyat esnasında uygulanacak dil testlerini (nesne adlandırma, okuma, anlama) ve motor görevleri preoperatif öğrenmesi, taban puanının belirlenmesi.',
      'Klinik Nörofizyoloji Konsültasyonu: Elektrokortikografi (ECoG), uyarılmış potansiyeller ve intraoperatif nöromonitörizasyon (İONM) protokolünün cerrahi ekiple koordine planlanması.',
      'Psikiyatri Konsültasyonu: Ağır anksiyete, panik bozukluk, klostrofobi, psikoz veya zihinsel kısıtlılık uyanık kraniyotomi için KESİN KONTRENDİKASYONDUR; şüpheli olgularda değerlendirilmelidir.',
      'Göğüs Hastalıkları / Uyku Tıbbı: Ciddi Obstrüktif Uyku Apnesi (OUA), morbid obezite veya şiddetli kronik öksürük (vaka esnasında baş çivilere sabitken kontrolsüz öksürük KİBAS ve beyin herniasyonuna yol açar) elenmelidir.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Ayrıntılı Nörolojik Muayene: Preoperatif mevcut fokal nörolojik defisitler, afazi derecesi, motor parezi taban düzeyi ayrıntılı olarak kayıt altına alınmalıdır.',
      'Nöbet Öyküsü ve Antiepileptik Tedavi (AEİ): Hastanın kullandığı antiepileptik ilaçlar (Levetirasetam, Lakozamid, Valproat vb.) sorgulanmalı, sabah dozu ameliyat sabahı bir yudum suyla mutlaka verilmelidir.',
      'KİBAS Bulguları (Kontrendikasyon Taraması): Papilödem, kontrolsüz intrakraniyal hipertansiyon veya şiddetli orta hat şifti olan hastalar uyanık kraniyotomiye ALINMAZ (akut beyin ödemi ve fıtıklaşma riski).',
      'Boyun Hareket Kısıtlılığı ve Zor Havayolu: Baş Mayfield çivisine tespitliyken havayoluna erişim çok kısıtlı olacağından zor maske ve entübasyon öngörü parametreleri titizlikle incelenmelidir.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Koagülasyon Paneli (PT, aPTT, INR, Trombosit Sayısı): İntrakraniyal kanama ve subdural hematom riskini dışlamak için kusursuz hemostaz doğrulanmalıdır.',
      'Serum Elektrolitleri (Na, K, Ca, Mg, Glukoz): Hiponatremi (beyin ödemini tetikler) ve hipomagnezemi/hipokalsemi (nöbet eşiğini düşürür) mutlaka opere olmadan önce düzeltilmelidir.',
      'Antiepileptik İlaç Kan Düzeyleri (özellikle fenitoin/karbamazepin kullananlarda).',
      'Kan Grubu ve Çapraz Karşılaştırma (T&S): Dural venöz sinüs komşuluğunda kanama riski için en az 2 ünite Eritrosit Süspansiyonu hazır bulundurulmalıdır.',
      'Tam Kan Sayımı ve Böbrek Fonksiyon Testleri (Mannitol kullanımı planlanıyorsa bazal kreatinin düzeyi).'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (DII-V5 derivasyonları), Nabız Oksimetresi (SpO2), Non-invaziv Kan Basıncı (NIBP), Isı Probu.',
      'İnvaziv Arteriyel Kan Basıncı (A-Line) — Zorunlu: Anlık hemodinamik titrasyon, serebral perfüzyon basıncı (CPP) optimizasyonu ve seri kan gazı (özellikle PaCO2 kontrolü) için kateter yerleştirilmelidir.',
      'Sürekli Kapnografi (EtCO2): Spontan soluyan hastada nazal örnekleme kanülü ile apne, hipoventilasyon ve hiperkarbi takibi zorunludur.',
      'Elektrokortikografi (ECoG) & İntraoperatif Nöromonitörizasyon: Kortikal stimülasyon sırasında epileptik ardıl deşarjların (after-discharges) anında tespiti için.',
      'Derinlik / Sedasyon Monitörizasyonu (BIS / SedLine): Sedasyon evresinde 60-70, uyanık test evresinde >85-90 hedeflenir.',
      'Foley İdrar Sondası: Sıvı dengesi ve gerektiğinde uygulanan Mannitol diürezini izlemek için.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik venöz kateter (16G veya 18G) — biri hastanın uyanık motor test yapacağı dominant elin/kolun TERS tarafında olmalıdır.',
      'Santral Venöz Kateter (CVP): Uyanık hastada konforsuzluk yarattığından rutin tercih edilmez; ancak zor damaryolu veya inotrop ihtiyacında internal juguler venden USG eşliğinde yerleştirilebilir.'
    ],
    // 4c) Hasta pozisyonu & fizyolojik güvenlik önlemleri
    patientPosition: 'Lateral Dekübit, Yarı-Oturur (Park-Bench) veya Supine (Tümör lokalizasyonuna göre).',
    patientPositionDetails: [
      'Mayfield Çivili Başlık: Baş çivilere tespit edilmeden önce çivi giriş yerlerine bol lokal anestezik enjeksiyonu şarttır.',
      'Görüş Alanı & Şeffaf Örtüleme (Clear-Drape Tunnel): Hastanın yüzü örtülerle kapatılmamalı; nöropsikoloğu ve anestezi ekibini rahatça görüp konuşabileceği şeffaf bir tünel oluşturulmalıdır.',
      'Bası Noktaları: Aksilla, sakrum, peroneal sinir ve topuklar jel pedlerle desteklenmeli; hasta vaka ortasında pozisyondan rahatsız olup hareket etmemelidir.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'Bölgesel Skalp Bloğu (Scalp Block) — Başarının Anahtarı: Bilateral veya ipsilateral 6 çift sinir bloke edilir (Supraorbital, Supratroklear, Zigomatikotemporal, Aurikulotemporal, Büyük Oksipital ve Küçük Oksipital sinirler). %0.25-0.5 Bupivakain/Levobupivakain + %1 Lidokain kombinasyonu.',
      'Deksmedetomidin İnfüzyonu (0.2–0.7 mcg/kg/saat): Solunumu deprese etmeden sakin, koopere ve uyandırılabilir sedasyon sağlayan ideal ajandır.',
      'Remifentanil İnfüzyonu (0.02–0.08 mcg/kg/dk): Ağrılı aşamalarda (çivi takılması, insizyon, kemik flebi) hızlı analjezi sağlar; haritalama evresinde dozu azaltılır.',
      'Propofol İnfüzyonu (TCI veya 25–75 mcg/kg/dk): Asleep-Awake-Asleep tekniğinde açılış ve kapanışta kullanılır; kortikal haritalamadan 15-20 dakika önce ECoG zemin ritmini bozmamak için tamamen kesilir.',
      'İntraoperatif Nöbet Yönetimi (Kritik Acil Durum): Kortikal stimülasyonda fokal/jeneralize nöbet gelişirse: (1) Cerraha derhal haber verilir; cerrah korteks üzerine SOĞUK SERUM FİZYOLOJİK (Cold Saline) döker (altın standart ilk müdahale). (2) Nöbet durmazsa: IV Propofol (20-50 mg) veya Midazolam (2-5 mg). (3) Status epileptikusta hava yolu derhal emniyete alınır.',
      'Nöromusküler Blokör KULLANILMAZ: Kortikal motor haritalamayı ve motor uyarılmış potansiyelleri (MEP) bozmamak için kas gevşetici verilmez.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Asleep-Awake-Asleep Tekniğinde: Açılışta 2. jenerasyon supraglottik havayolu aracı (i-gel / ProSeal LMA) ile kontrollü solunum; uyanık haritalama fazına geçilirken hasta spontan solunuma getirilir ve LMA nazikçe çıkarılır; kapanışta gerekirse tekrar uygulanır.',
      'MAC / Sedasyon Tekniğinde: Yüksek akımlı nazal kanül veya nazofaringeal tüp ile O2 desteği; spontan solunumun sürekli EtCO2 ile izlenmesi.',
      'Acil Havayolu Kurtarma Kiti (Masa Başında Hazır): Baş çivilere tespitliyken entübasyon güç olacağından Videolaringoskop, LMA, Fiberoptik bronkoskop ve acil cerrahi havayolu seti ameliyathanede hazır bekletilmelidir.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Mayfield Çivili Başlık Takılması: Şiddetli sempatik refleks yanıt (ani hipertansiyon, taşikardi). Çivi giriş yerlerine bol lokal anestezik ve ek remifentanil bolusu verilir.',
      'Dura Açılması ve Meninks Çekintisi: Dura iç yüzü trigeminal dallarla innerve edildiğinden ağrılı olabilir; dural yüzeye lokal anestezik emdirilmiş pamuk (spongostan) uygulanır.',
      'Kortikal ve Subkortikal Haritalama (Uyanık Faz): Hastanın tamamen uyanık, oryante ve kooperasyonunun en üst düzeyde olduğu evre. Sedasyon tamamen durdurulmuş veya bazal düzeydedir.',
      'Tümör Rezeksiyonu ve Fonksiyonel Takip: Testlerde konuşma tutukluğu (speech arrest), dizartri, anomi veya kolda/bacakta motor güçsüzlük saptandığı an cerraha bildirilir; rezeksiyon sınırı durdurulur.',
      'Venöz Hava Embolisi Riski: Oturur/yarı-oturur pozisyonda dural sinüs açık kaldığında risk artar. Belirtiler: EtCO2 düşüşü, ani hipotansiyon. Cerrahi alana SF dökülür, hava aspirasyonu planlanır.',
      'Kemik Flep Tespiti ve Kapanış: Hastanın yorulduğu ve ağrının nüksedebileceği evredir; sedasyon tekrar derinleştirilebilir.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Öksürük ve Ikınmanın (Straining) Kesinlikle Önlenmesi: Baş çivide sabitken ıkınma intrakraniyal basıncı fırlatarak beyin ödemine, kanamaya ve herniasyona yol açar; IV Lidokain (1-1.5 mg/kg) veya düşük doz remifentanil titre edilir.',
      'Normotermi ve Titremenin (Shivering) Önlenmesi: Titreme serebral metabolizmayı ve oksijen tüketimini (CMRO2) artırır; aktif ısıtma battaniyesi kullanılır.',
      'Hemodinamik Stabilite: Sistolik kan basıncının 140-150 mmHg üzerine çıkması önlenmeli; hipertansiyonda labetalol, nikardipin veya esmolol titre edilmelidir.',
      'Erken Nörolojik Değerlendirme: Hasta ameliyat masasından ayrılmadan önce oryantasyon, konuşma fonksiyonları ve motor kuvvet ayrıntılı olarak muayene edilip kaydedilmelidir.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Kraniyotomi sonrası ağrı genellikle ilk 24-48 saatte orta-şiddetli düzeydedir; en önemli kaynak kemik kesisi, temporalis kası diseksiyonu ve skalp gerilimidir.',
      'Skalp Bloğunun Koruyucu Etkisi: Preoperatif veya cerrahi bitiminde yinelenen skalp bloğu ilk 12-24 saatlik postoperatif analjeziyi sağlar ve opioid ihtiyacını belirgin azaltır.',
      'Sistemik Non-Opioid Analjezi: IV Parasetamol (1 g q6h) düzenli uygulanır.',
      'Opioid Titrasyonu: Sedasyon ve solunum depresyonu yaparak nörolojik değerlendirmeyi maskelememek için güçlü opioidler yalnızca şiddetli atılım ağrılarında düşük doz titre edilerek (IV Tramadol 50 mg veya Fentanil 25-50 mcg) kullanılır.',
      'NSAİİ Kısıtlaması: Nöroşirürjide intrakraniyal kanama ve subdural hematom riski nedeniyle NSAİİ kullanımı cerrah onayına tabidir; postop ilk 24 saatte genellikle kısıtlanır.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Skalp Bloğu / İnsizyonel Lokal Anestezik İnfiltrasyonu: Postoperatif ağrıyı ve opioid tüketimini azaltmada A düzeyi en yüksek kanıt değerine sahip yöntem olarak önerilmektedir.',
      'Sistemik Parasetamol: Rutin bazal analjezik olarak 6 saatte bir 1 g IV uygulanması tavsiye edilir.',
      'Opioid Koruyucu Strateji: Bilinç durumunu, Glasgow Koma Skalasını ve pupiller refleksi bozmamak amacıyla kurtarıcı opioidlerin yalnızca şiddetli ağrıda titre edilmesi önerilir.',
      'Sistemik Deksametazon: Peritümöral beyin ödemini azaltmada ve postoperatif bulantı-kusma (PONV) profilaksisinde temel bileşendir.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Preoperatif Hasta Eğitimi ve Anksiyete Yönetimi: Uyanık kraniyotomide ameliyat esnası kooperasyon için hastanın psikolojik hazırlığı temel ERAS bileşenidir.',
      'Açlık Sürelerinin Kısaltılması: Katı gıdalar 6 saat, berrak sıvılar 2 saat öncesine kadar alınabilir.',
      'Skalp Bloğu ile Perioperatif Hemodinamik Stabilite ve Erken Uyanıklık.',
      'Erken Mobilizasyon ve Erken Oral Beslenme: Postoperatif 1. günde yatak dışı mobilizasyon hedeflenir.',
      'Postoperatif Yakın Nöromonitörizasyon: Nöroşirürji yoğun bakım veya ara bakım ünitesinde saatlik GKS, motor muayene ve pupil takibi; Foley sondanın ilk 24 saatte çekilmesi.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section I: Neurosurgical Procedures - Awake Craniotomy, pp. 28–34. Lippincott Williams & Wilkins.",
    erasReference: 'Hagan, K. B., et al. Consensus Statement for Perioperative Care in Craniotomy: Enhanced Recovery After Surgery (ERAS®) Society Recommendations. World Neurosurg.',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in craniotomy. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'ESAIC Guidelines on Management of Severe Perioperative Bleeding: Neurosurgical & Hemostatic Considerations.',
      'ASA Practice Guidelines for Perioperative Blood Management and Transfusion Triggers.',
      "Cottrell, J. E., & Patel, P. (2016). Cottrell and Patel's Neuroanesthesia (6th ed.). Chapter 14: Anesthetic Considerations for Awake Craniotomy and Brain Mapping.",
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC): Consensus Statement on Anesthetic Management of Patients Undergoing Awake Craniotomy.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 64: Anesthesia for Neurologic Surgery.'
    ]
  }
};
