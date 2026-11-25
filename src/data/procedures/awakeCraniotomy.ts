import { ProcedureDefinition } from '../../types/procedures';

/**
 * Uyanık Kraniyotomi (Awake Craniotomy)
 * 
 * Jaffe (6th ed., 2020), ERAS Craniotomy (Hagan et al., J Clin Neurosci 2016),
 * PROSPECT Craniotomy 2023 (Mestdagh et al.) ve SNACC
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
    'Elokent motor ve konuşma alanlarında yerleşik seçilmiş arteriovenöz malformasyonlar (AVM) ve kavernomlar'
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
      'Aşırı kanama ve mikrovasküler sızıntılarda cerrahla koordine Traneksamik Asit (TXA 1 g IV yavaş infüzyon) ve cell-saver (malignite dışı lezyonlarda) hazırlığı'
    ]
  },
  anesthesiaTechniques: {
    primary: [
      'Asleep-Awake-Asleep (AAA) Tekniği: Açılış evresinde LMA/sedasyon altında anestezi -> Kortikal haritalama ve rezeksiyon evresinde tam uyanıklık ve kooperasyon -> Kapanış evresinde tekrar sedasyon/anestezi',
      'Monitored Anesthesia Care (MAC) / Conscious Sedation: Ameliyat boyunca hastanın spontan solunumu korunarak hafif/orta sedasyon ve iki taraflı bölgesel Skalp Bloğu eşliğinde vakanın yürütülmesi',
      'Awake-Awake-Awake (Saf Bölgesel Anestezi): Başından sonuna kadar minimal sedasyon ve titizlikle uygulanmış Skalp Bloğu (özellikle solunum depresyonundan kesin kaçınılması gereken olgularda)'
    ],
    alternative: [
      'Acil Dönüşüm Planı (Emergency Airway Rescue): Fokal/jeneralize nöbet, hava embolisi, masif kanama, akut beyin şişmesi veya hastanın ajite olup koopere olamaması halinde baş Mayfield çivisine tespitliyken 2. nesil LMA, videolaringoskop veya fiberoptik ile acil genel anesteziye geçiş'
    ],
    clinicalRationale: 'Uyanık kraniyotomide başarının temeli; LAST güvenlik sınırlarına tam uyularak uygulanmış bilateral Skalp Bloğu, solunum depresyonu ve hiperkapni yaratmadan dil/motor haritalamaya izin veren kısa etkili titre ajanlar (Deksmedetomidin dil haritalaması öncesi azaltılıp/kesilerek, düşük doz Remifentanil, açılış/kapanışta Propofol), agresif intraoperatif çift PONV profilaksisi ve her an erişilebilir acil havayolu kurtarma planıdır. Azot protoksit (N2O) KESİNLİKLE KONTRENDİKEDİR.',
    notes: 'UYANIK KRANİYOTOMİDE TEMEL ANESTEZİ İLKELERİ: (1) BİLATERAL SKALP BLOĞU VE LAST GÜVENLİĞİ (Ropivakain/Levobupivakain + 1:200.000 Epinefrin + aditif maks mg/kg sınırı + %20 Intralipid hazır); (2) DİL HARİTALAMASINDA SEDASYONSUZ KOOPERASYON (Deksmedetomidin azaltılır/kesilir, Propofol 15-20 dk önce kesilir) VE AGRESİF İNTRAOP ÇİFT PONV PROFİLAKSİSİ; (3) NÖBETTE SOĞUK SF + DÜŞÜK DOZ PROPOFOL (10-30 mg — MİDAZOLAM YASAK!); (4) ACİL HAVA YOLU VE VAE HAZIRLIĞI.',
    rulesTitle: 'UYANIK KRANİYOTOMİDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'BİLATERAL SKALP BLOĞU VE LAST GÜVENLİĞİ (%20 INTRALIPID HAZIR)',
        content: '6 çift skalp siniri + Mayfield çivi infiltrasyonu yüksek vasküler emilim nedeniyle ciddi LAST riski taşır! Farklı lokal anestezikler karıştırıldığında toksisite ADİTİFTİR. Rasemik Bupivakain yerine Ropivakain (≤3 mg/kg) veya Levobupivakain (≤2.5 mg/kg; epinefrinli ≤3 mg/kg; Lidokain ≤4.5 mg/kg, epinefrinli ≤7 mg/kg) + 1:200.000 Epinefrin tercih edilir; %20 Lipid Emülsiyonu (Intralipid) ameliyathanede anında hazır bulundurulmalıdır!'
      },
      {
        number: 2,
        title: 'İNTRAOPERATİF NÖBETTE MİDAZOLAM YASAĞI: SOĞUK SF + PROPOFOL 10-30 mg',
        content: 'Kortikal stimülasyon nöbetinde (%3-15) ilk müdahale cerrahın korteksi BUZLU/SOĞUK SERUM FİZYOLOJİK (4°C SF) ile irrige etmesidir. Devam ederse düşük doz titre Propofol (10-30 mg IV) verilir. Baş çivideki uyanık hastada Midazolam (2-5 mg IV) KESİNLİKLE KULLANILMAZ (apne, hiperkapni, akut beyin herniasyonu yapar ve haritalamayı iptal eder!).'
      },
      {
        number: 3,
        title: 'DİL HARİTALAMASINDA KOOPERASYON VE ÇİVİDE KUSMAYA KARŞI ÇİFT PONV PROFİLAKSİSİ',
        content: 'Dil/kognitif haritalama öncesi Propofol 15-20 dk önce kesilir, Deksmedetomidin dozu 0.1-0.3 mcg/kg/saat\'e indirilir veya tamamen kesilir. Baş Mayfield çivisine sabitliyken öğürme/kusma katastrofik kafa/boyun travması, KİBAS fırlaması ve herniasyona yol açar → İntraoperatif agresif çift PONV profilaksisi (Deksametazon + Ondansetron) zorunludur!'
      },
      {
        number: 4,
        title: 'BAŞ ÇİVİDE ACİL HAVA YOLU KURTARMA, NORMOKAPNİ VE SIVI/GLİSEMİ KONTROLÜ',
        content: '2. nesil LMA, videolaringoskop ve fleksibl bronkoskop her an ulaşılabilir olmalıdır. Bazal normokapni (PaCO2 35-40 mmHg; spontan solunumda >45 mmHg beyin şişmesi yapar) korunur. N2O ve hipotonik/dekstrozlu sıvılar kullanılmaz; izotonik kristaloidler, glukoz 140-180 mg/dL, normotermi korunur ve kısa Mannitolsüz vakalarda rutin Foley sondadan kaçınılır (ERAS).'
      }
    ]
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
      'Serum Elektrolitleri (Na, K, Ca, Mg) ve Kan Şekeri: Hiponatremi (beyin ödemini tetikler) ve hipomagnezemi/hipokalsemi (nöbet eşiğini düşürür) düzeltilmeli; glisemi 140-180 mg/dL hedeflenmelidir.',
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
      'İnvaziv Arteriyel Kan Basıncı (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu / Foramen Monro) Seviyesinde Sıfırlanmış: Baş elevasyonunda doğru Serebral Perfüzyon Basıncı (CPP) ölçümü için transdüser yalnızca Tragus seviyesinde sıfırlanır; anlık hemodinamik titrasyon ve seri ABG (PaCO2, glukoz 140-180 mg/dL) için yerleştirilir.',
      'Sürekli Kapnografi (EtCO2): Spontan soluyan hastada nazal örnekleme kanülü ile apne, hipoventilasyon ve hiperkarbi (>45 mmHg beyin şişmesi) takibi zorunludur.',
      'Venöz Hava Embolisi (VAE) Monitörizasyonu (Yarı-Oturur Pozisyonda veya Dural Venöz Sinüs Komşuluğunda): Prekordiyal Doppler USG ve sürekli EtCO2 takibi (ani EtCO2 düşüşü ve Dopplerde hava sesi acil VAE alarmıdır).',
      'Elektrokortikografi (ECoG) & İntraoperatif Nöromonitörizasyon: Kortikal stimülasyon sırasında epileptik ardıl deşarjların (after-discharges) anında tespiti için.',
      'Derinlik / Sedasyon Monitörizasyonu (BIS / SedLine): Sedasyon evresinde 60-70, uyanık test evresinde >85-90 hedeflenir.',
      'Foley İdrar Sondası (ERAS Seçici Yaklaşım): Kısa süreli ve Mannitol kullanılmayacak uyanık vakalarda RUTİN FOLEY SONDA ÖNERİLMEZ (uyanık hastada şiddetli üretral rahatsızlık, ajitasyon ve hipertansiyon kaynağıdır; ameliyat öncesi mesane boşaltılır). Yalnızca uzun süreli (>4-5 sa) veya Mannitol planlanan olgularda bol lidokain jelle seçici olarak düşünülür.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik venöz kateter (16G veya 18G) — biri hastanın uyanık motor test yapacağı dominant elin/kolun TERS tarafında olmalıdır.',
      'Santral Venöz Kateter (CVC): Uyanık hastada konforsuzluk yarattığından rutin tercih edilmez; ancak zor damaryolu, yarı-oturur pozisyonda yüksek VAE riski veya inotrop ihtiyacında USG eşliğinde yerleştirilebilir.'
    ],
    // 4c) Hasta pozisyonu & fizyolojik güvenlik önlemleri
    patientPosition: 'Supin (baş rotasyonlu), Lateral Dekübit / Park-Bench (Modifiye Lateral) veya nadiren Yarı-Oturur (Semi-Sitting) pozisyon — NOT: Park-Bench bir lateral dekübit pozisyonudur, yarı-oturur (semi-sitting) DEĞİLDİR!',
    patientPositionDetails: [
      'Mayfield Çivili Başlık: Baş çivilere tespit edilmeden önce çivi giriş yerlerine lokal anestezik infiltrasyonu şarttır (kümülatif maksimum LA mg/kg hesabına mutlaka dahil edilmelidir!).',
      'Görüş Alanı & Şeffaf Örtüleme (Clear-Drape Tunnel): Hastanın yüzü örtülerle kapatılmamalı; nöropsikoloğu ve anestezi ekibini rahatça görüp konuşabileceği şeffaf bir tünel oluşturulmalıdır.',
      'Yarı-Oturur (Semi-Sitting) Pozisyon Uyarısı: Nadiren seçilirse dural sinüsler kalp seviyesinin üzerinde kalacağından ciddi Venöz Hava Embolisi (VAE) riski doğar; Prekordiyal Doppler ve VAE acil müdahale hazırlığı zorunludur.',
      'Bası Noktaları ve Hasta Konforu: Aksilla, sakrum, peroneal sinir ve topuklar jel pedlerle desteklenmeli, oda sıcaklığı/ısıtma battaniyesi hastanın konforuna göre ayarlanmalıdır.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'Bölgesel Bilateral Skalp Bloğu ve LAST Güvenlik Protokolü (Başarının Anahtarı): 6 çift sinir (Supraorbital, Supratroklear, Zigomatikotemporal, Aurikulotemporal, Büyük ve Küçük Oksipital) bloke edilir. KARDİYOTOKSİSİTE RİSKİNİ AZALTMAK İÇİN rasemik Bupivakain yerine Ropivakain veya Levobupivakain tercih edilmeli ve sistemik emilimi azaltmak için 1:200.000 Epinefrin eklenmelidir. MAKSİMUM DOZ LİMİTLERİ (Farklı lokal anestezikler karıştırıldığında toksisite ADİTİFTİR, toplam fraksiyonel doz %100\'ü GEÇEMEZ!): Ropivakain ≤ 3 mg/kg; Levobupivakain / Bupivakain ≤ 2.5 mg/kg (epinefrinli ≤ 3 mg/kg); Lidokain ≤ 4.5 mg/kg (epinefrinli ≤ 7 mg/kg). Çivi ve kesi infiltrasyonu bu toplama dahildir; her enjeksiyonda negatif aspirasyon yapılır ve %20 Lipid Emülsiyonu (Intralipid: 1.5 mL/kg IV bolus + 0.25 mL/kg/dk infüzyon) ameliyathanede anında hazır bulundurulur!',
      'Deksmedetomidin İnfüzyonu ve Dil Haritalaması Ayarı: Açılış ve kapanış evrelerinde 0.2–0.7 mcg/kg/saat titre edilebilir; ancak DİL VE KOGNİTİF HARİTALAMA FAZI ÖNCESİNDE uyuklama ve test bozulmasını önlemek için dozu 0.1–0.3 mcg/kg/saat\'e düşürülmeli veya TAMAMEN KESİLMELİDİR.',
      'Remifentanil (0.02–0.08 mcg/kg/dk) ve Propofol (25–75 mcg/kg/dk TCI): Ağrılı açılış/kapanış aşamalarında titre edilir; Propofol ECoG zemin ritmini baskıladığı için kortikal haritalamadan 15-20 dakika önce tamamen kesilir. Benzodiazepinlerden kaçınılır.',
      'AGRESİF İNTRAOPERATİF ÇİFT PONV PROFİLAKSİSİ (HAYATİ!): Baş Mayfield çivisine sabitliyken öğürme veya kusma katastrofik boyun/kafa travması, ani KİBAS fırlaması, beyin herniasyonu ve aspirasyona yol açar! İntraoperatif agresif çift antiemetik profilaksi (Deksametazon 4-8 mg IV + Ondansetron 4 mg IV; yüksek riskte üçlü kurtarma ajanı hazır) ZORUNLUDUR.',
      'İntraoperatif Nöbet Yönetimi (MİDAZOLAM KULLANILMAZ!): Kortikal stimülasyonda fokal/jeneralize nöbet gelişirse: (1) Cerraha anında bildirilir ve cerrah korteks üzerine BUZLU/SOĞUK SERUM FİZYOLOJİK (4°C SF) döker (altın standart ilk müdahale). (2) Nöbet devam ederse düşük doz titre IV Propofol (10 - 30 mg) ve gerekirse IV Levetirasetam uygulanır — uyanık çivili hastada Midazolam (2-5 mg IV) apne, hiperkapni, beyin herniasyonu yaratıp haritalamayı iptal edeceği için KESİNLİKLE VERİLMEZ! (3) Status epileptikusta derhal acil havayolu kurtarma protokolüne geçilir.',
      'Solunum, Gaz, Sıvı ve Glisemi Yönetimi: N2O KESİNLİKLE KONTRENDİKEDİR. Spontan solunumda normokapni (PaCO2 35-40 mmHg) korunur (hiperkapni >45 mmHg beyin şişmesine yol açar; kısa süreli 30-35 mmHg yalnızca kontrollü havayolunda tıkız beyin kurtarması içindir). Yalnızca izotonik kristaloidler (%0.9 NaCl veya dengeli izotonik Plasmalyte/İzolen) kullanılır (hipotonik/dekstrozlu sıvılar yasak); kan şekeri 140-180 mg/dL tutulur. Nöromusküler bloker KULLANILMAZ.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Asleep-Awake-Asleep Tekniğinde: Açılışta 2. jenerasyon supraglottik havayolu aracı (i-gel / ProSeal LMA) ile kontrollü solunum; uyanık haritalama fazına geçilirken hasta spontan solunuma getirilir ve LMA nazikçe çıkarılır; kapanışta gerekirse tekrar uygulanır.',
      'MAC / Sedasyon Tekniğinde: Yüksek akımlı nazal kanül veya nazofaringeal tüp ile O2 desteği; spontan solunumun sürekli EtCO2 ile izlenmesi.',
      'Acil Havayolu Kurtarma Kiti (Masa Başında Hazır): Baş çivilere tespitliyken entübasyon güç olacağından 2. nesil LMA, Videolaringoskop, Fiberoptik bronkoskop ve acil cerrahi havayolu seti ameliyathanede her an ulaşılabilir hazır bekletilmelidir.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Mayfield Çivili Başlık Takılması: Şiddetli sempatik refleks yanıt (ani hipertansiyon, taşikardi). Çivi giriş yerlerine kümülatif LA limitini aşmadan infiltrasyon ve ek remifentanil bolusu verilir.',
      'Dura Açılması ve Meninks Çekintisi: Dura iç yüzü trigeminal dallarla innerve edildiğinden ağrılı olabilir; dural yüzeye lokal anestezik emdirilmiş pamuk uygulanır (toplam LA doz hesabına dahil edilir).',
      'Kortikal ve Subkortikal Haritalama (Uyanık Faz): Propofol kesilmiş, Deksmedetomidin 0.1-0.3 mcg/kg/saat\'e indirilmiş veya tamamen kapatılmıştır; hasta tamamen uyanık, oryante ve koopere durumdadır.',
      'Tümör Rezeksiyonu ve Fonksiyonel Takip: Testlerde konuşma tutukluğu (speech arrest), dizartri, anomi veya kolda/bacakta motor güçsüzlük saptandığı an cerraha bildirilir; rezeksiyon sınırı durdurulur.',
      'Venöz Hava Embolisi (VAE) Acil Müdahalesi (Yarı-Oturur Pozisyon / Açık Dural Sinüs): Prekordiyal Dopplerde hava sesi, ani EtCO2 düşüşü (>3-5 mmHg), öksürük veya hipotansiyon gelişirse: (1) Cerrah derhal alanı bol izotonik SF ve ıslak gaz/kemik mumuyla kapatır; (2) %100 O2 verilir (N2O kesinlikle yok); (3) Baş kalp seviyesine indirilir, kısa juguler ven kompresyonu uygulanır; (4) Mevcutsa CVC\'den hava aspire edilir ve hemodinamik destek (sıvı + Noradrenalin/Adrenalin; gerekirse acil havayolu güvenliği) sağlanır.',
      'Kemik Flep Tespiti ve Kapanış: Hastanın yorulduğu ve ağrının nüksedebileceği evredir; sedasyon tekrar derinleştirilebilir.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Öksürük, Kusma ve Ikınmanın (Straining) Kesinlikle Önlenmesi: Baş çivide sabitken ıkınma veya kusma KİBAS\'ı fırlatarak beyin ödemine, kanamaya ve herniasyona yol açar; çift ajan antiemetik profilaksi (Deksametazon + Ondansetron) ve gerektiğinde düşük doz remifentanil/lidokain titre edilir.',
      'Normotermi ve Titremenin (Shivering) Önlenmesi: Titreme serebral metabolizmayı (CMRO2) artırır ve baş çivideyken mekanik travma yaratır; aktif ısıtma battaniyesi kullanılır.',
      'Hemodinamik Stabilite: Sistolik kan basıncının 140 mmHg üzerine çıkması önlenmeli; hipertansiyonda labetalol, nikardipin veya esmolol titre edilmelidir.',
      'Erken Nörolojik Değerlendirme: Hasta ameliyat masasından ayrılmadan önce oryantasyon, konuşma fonksiyonları ve motor kuvvet ayrıntılı olarak muayene edilip kaydedilmelidir.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Kraniyotomi sonrası ağrı genellikle ilk 24-48 saatte orta-şiddetli düzeydedir; en önemli kaynak kemik kesisi, temporalis kası diseksiyonu ve skalp gerilimidir.',
      'Skalp Bloğunun Koruyucu Etkisi: Preoperatif uygulanan uzun etkili skalp bloğu (Ropivakain/Levobupivakain + 1:200.000 Epinefrin) ilk 12-24 saatlik postoperatif analjeziyi sağlar; cerrahi sonunda ek infiltrasyon yapılacaksa kümülatif mg/kg LAST sınırları mutlaka kontrol edilir.',
      'Sistemik Non-Opioid Analjezi: IV Parasetamol (1 g q6h) düzenli uygulanır.',
      'Güvenli Kurtarıcı Opioid Titrasyonu (TRAMADOL KULLANILMAZ!): Tramadol nöbet eşiğini düşürdüğü (epilepsi/kortikal stimülasyon olgularında özellikle tehlikeli!) ve şiddetli POBV tetiklediği için KESİNLİKLE KULLANILMAZ. Yalnızca şiddetli atılım ağrısında nörolojik değerlendirmeyi maskelemeyecek şekilde düşük doz titre IV Fentanil (25-50 mcg), Oksikodon veya bazal infüzyonsuz Morfin PCA kullanılır.',
      'NSAİİ Kısıtlaması: Taze kraniyotomi/rezeksiyon yatağında intrakraniyal kanama ve subdural hematom riski nedeniyle erken dönemde rutin NSAİİ (Deksketoprofen dahil — non-selektif COX-1/2 inhibitörüdür!) KULLANILMAZ; yalnızca nöroşirürjik hemostaz ve postop kontrol BT doğrulaması sonrası cerrah onayıyla değerlendirilebilir.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'PROSPECT Craniotomy 2023 (Mestdagh et al.): Skalp Bloğu / insizyonel lokal anestezik infiltrasyonu (maks mg/kg ve LAST kurallarına uyarak) ile düzenli sistemik Parasetamol (1 g IV q6h) temel multimodal analjeziyi oluşturur.',
      'Tramadol ve taze yatakta erken rutin NSAİİ\'den kaçınılır; nörolojik muayeneyi bozmayan kurtarıcı opioid titrasyonu ve sistemik Deksametazon + Ondansetron ile çoklu PONV profilaksisi uygulanır.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Preoperatif Hasta Eğitimi ve Anksiyete Yönetimi: Uyanık kraniyotomide ameliyat esnası kooperasyon için hastanın psikolojik hazırlığı temel ERAS bileşenidir.',
      'Açlık Sürelerinin Kısaltılması: Katı gıdalar 6 saat, berrak sıvılar 2 saat öncesine kadar alınabilir.',
      'Foley Sondadan Kaçınma ve Erken Mobilizasyon: Kısa, Mannitolsüz uyanık vakalarda rutin Foley sonda takılmaması hasta konforunu artırır; postop erken oral alım ve 1. günde mobilizasyon hedeflenir (sonda takıldıysa ilk 24 saatte çekilir).',
      'Postoperatif Yakın Nöromonitörizasyon, Normotermi ve Glisemi: Saatlik GKS, dil/motor muayene, pupil takibi, SKB <140 mmHg ve kan şekeri 140-180 mg/dL kontrolü.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2020). Anesthesiologist's Manual of Surgical Procedures (6th ed.). Wolters Kluwer. Section: Neurosurgery — Awake Craniotomy.",
    erasReference: 'Hagan, K. B., Bhavsar, S., Raza, S. M., Arnold, B., Arunkumar, R., Dang, A., et al. (2016). Enhanced recovery after surgery for oncological craniotomies. Journal of Clinical Neuroscience, 24, 10–16.',
    prospectReference: "Mestdagh, F., Lavand'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group (ESRA). (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(5), 301–314.",
    otherReferences: [
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC): Consensus Statement on Anesthetic Management of Patients Undergoing Awake Craniotomy.',
      'Neal, J. M., Neal, E. J., & Weinberg, G. L. (2021). American Society of Regional Anesthesia and Pain Medicine Local Anesthetic Systemic Toxicity checklist: 2020 version. Regional Anesthesia & Pain Medicine, 46(1), 81–82.',
      "Cottrell, J. E., & Patel, P. (2016). Cottrell and Patel's Neuroanesthesia (6th ed.). Chapter 14: Anesthetic Considerations for Awake Craniotomy and Brain Mapping. Elsevier.",
      'Meng, L., McDonagh, D. L., Berger, M. S., & Gelb, A. W. (2017). Anesthesia for awake craniotomy: a how-to guide for the occasional practitioner. Canadian Journal of Anesthesia, 64(5), 517–529.'
    ]
  }
};
