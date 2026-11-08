import { ProcedureDefinition } from '../../types/procedures';

/**
 * Akut Epiglotit Hava Yolu Yönetimi ve Acil Entübasyon (Intubation for Epiglottitis)
 * 
 * Jaffe (5th ed., Section V: Otolaryngology - Larynx and Trachea: Epiglottitis and Pediatric Airway Emergencies, pp. 787-792),
 * Difficult Airway Society (DAS) Pediatric and Adult Difficult Airway Guidelines,
 * American Academy of Pediatrics (AAP) & American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS),
 * Association of Paediatric Anaesthetists of Great Britain and Ireland (APAGBI),
 * Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) & Türk Anesteziyoloji ve Reanimasyon Derneği (TARD)
 * acil hava yolu kılavuzları referans alınarak hazırlanmıştır.
 */
export const intubationForEpiglottitis: ProcedureDefinition = {
  id: 'intubation-for-epiglottitis',
  name: 'Akut Epiglotit Hava Yolu Yönetimi ve Acil Entübasyon (Intubation for Epiglottitis)',
  shortCode: 'KBB-EPİGLOTİT',
  specialty: 'kbb',
  specialtyName: 'Kulak Burun Boğaz',
  categoryTag: 'Acil Hava Yolu & Laringoloji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Akut epiglotit (supraglotit), epiglot, ariepiglottik kıvrımlar, aritenoid kıkırdaklar ve yalancı vokal kordların hızlı, fulminan ve potansiyel olarak fatal seyirli bakteriyel/inflamatuar selülit ve ödemidir. Geçmişte çoğunlukla çocuklarda Haemophilus influenzae tip b (Hib) aşılama öncesi görülürken, günümüzde aşılanmamış çocuklarda ve erişkin popülasyonda (Streptococcus pneumoniae, Staphylococcus aureus, Grup A Streptokok) görülmektedir. Hava yolu lümeni saatler içinde tamamen kapanabilir. Bu prosedür; hastanın acil servisten ameliyathaneye taşınmasından, spontan solunumun korunduğu nazik inhalasyon indüksiyonuna, supraglottik anatomik işaretlerin bozulduğu ödemli larinkste trakeal entübasyonun sağlanmasına ve cerrahi acil hava yolu (trakeostomi / krikotiroidotomi) hazır bekleyişine kadar tüm aşamaları kapsayan en yüksek alarm düzeyindeki anestezi ve KBB acil protokolüdür.',
  indications: [
    'Akut Supraglotit / Epiglotit Tanısı Alan ve İlerleyici Hava Yolu Obstrüksiyonu Gösteren Tüm Pediatrik ve Erişkin Olgular',
    'Klasik "4D" Semptom Kompleksi: Disfaji (yutamama), Disfoni (boğuk ses / "sıcak patates" sesi), Drooling (ağızdan kontrolsüz tükürük akması) ve Distress (şiddetli solunum sıkıntısı)',
    'İnspiratuar Stridor, İnterkostal/Suprasternal Çekilmeler ve Taşikardi',
    'Tripod / Sniffing (Koklama) Pozisyonunda Oturma (Hastanın hava yolu açıklığını korumak için boynunu uzatıp öne doğru eğilmesi)',
    'Yanal Boyun Grafisinde "Başparmak Belirtisi" (Thumb Sign - şişmiş epiglot görüntüsü) veya Klinik Olarak Yüksek Şüphe'
  ],
  averageDuration: '15 - 45 dakika (Entübasyonun sağlanması ve güvenli hava yolu stabilizasyonu; eşzamanlı KBB trakeostomi gerekirse süre 60 dakikaya uzayabilir)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 15 mL (Entübasyon girişiminde primer kanama beklenmez; ancak ödemli ve frajil supraglottik dokuların travmatize edilmesi durumunda hava yoluna kanama ve pıhtı aspirasyonu ölümcül olabilir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Sistemik Kan Kaybı / Ancak Supraglottik Travma ve Hava Yolu İçi Masif Hematom Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (Acil cerrahi trakeostomi ihtimaline karşı kan grubu bilinmeli ve T&S hazır tutulmalıdır)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Hiperemik, şişmiş epiglot ve ariepiglottik plikaların laringoskop bıçağı veya baji/tüp ucuyla yırtılması',
      'Acil cerrahi hava yoluna (trakeostomi / krikotiroidotomi) geçilirse anterior juguler venler ve tiroid isthmus kanamaları',
      'Farengeal mukoza laserasyonları'
    ],
    hemostasisStrategies: [
      'Laringoskopinin aşırı nazik yapılması, epiglota doğrudan dokunulmadan vallekula üzerinden veya epiglottisi travmatize etmeden görüş aranması',
      'Tüp zorlanmadan ilerletilmesi; atravmatik kayganlaştırıcı jel kullanımı',
      'Acil trakeostomi gerekirse koter ve sütür ligasyon hazırlığı'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Ameliyathanede Ebeveyn Kucağında / Oturur Pozisyonda Spontan Solunumun Korunduğu İnhalasyon İndüksiyonu (Sevofluran + %100 O2) + Derin Anestezi Sağlandıktan Sonra İV Damar Yolu + Atropin (0.02 mg/kg) + Direkt/Video Laringoskopi ile Küçük Numaralı Tüp (Yaşa göre 0.5-1.0 numara küçük) ile Oral Entübasyon — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Koopere Erişkin Hastada: Uyanık Fleksibl Fiberoptik Nazotrakeal Entübasyon (AFOI) — Yalnızca solunum sıkıntısı hafif, panik ve ajitasyonu olmayan stabil erişkinlerde deneyimli ekipçe uygulanabilir; çocuklarda kesinlikle kontrendikedir',
      'Acil Cerrahi Hava Yolu: İndüksiyonda tam hava yolu obstrüksiyonu (CICO) gelişirse masada steril bekleyen KBB ekibi tarafından derhal Rijit Bronkoskopi kılavuzluğu veya Acil Trakeostomi / Krikotiroidotomi'
    ],
    rulesTitle: 'AKUT EPİGLOTİT ENTÜBASYONUNDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'AMELİYATHANE DIŞINDA MUAYENE, DAMAR YOLU VEYA AJİTASYON YASAKTIR — ÇOCUK EBEVEYNİNDEN ASLA AYRILMAZ VE DİL BASACAĞIYLA BOĞAZINA BAKILMAZ',
        content: 'Akut epiglotit şüphesi olan bir çocukta acil serviste veya serviste dil basacağı ile orofarenks muayenesi yapmak, zorla damar yolu açmaya çalışmak veya çocuğu ebeveyninden ayırıp ağlatmak akut laringospazma, ödemli epiglotun hava yolu girişine tam oturmasına ve SANİYELER İÇİNDE KARDİYAK ARRESTE yol açar! Hasta sedye yerine ebeveyninin kucağında, tercih ettiği oturur (tripod) pozisyonda, yanında acil hava yolu kiti ve anestezi uzmanı refakatinde DOĞRUDAN AMELİYATHANEYE transfer edilir.'
      },
      {
        number: 2,
        title: 'KAS GEVŞETİCİ KESİNLİKLE KONTRAENDİKEDİR — SPONTAN SOLUNUMUN KORUNDUĞU İNHALASYON İNDÜKSİYONU (SEVOFLURAN) ZORUNLUDUR',
        content: 'Hastaya nöromusküler blokör (kas gevşetici) verilmesi KESİNLİKLE YASAKTIR! Faringeal kas tonusu kaybolduğu anda devasa şişmiş epiglot ve peri-epiglottik yumuşak dokular negatif intratorasik basınç desteğini de yitirerek laringeal girişi bir çek-valf gibi tamamen kapatır; balon-maske ile ventilasyon imkansız hale gelir ve "Cannot Intubate, Cannot Oxygenate" (CICO) felaketi patlak verir. İndüksiyon %100 O2 ve Sevofluran ile spontan solunum bozulmadan, hasta derin anesteziye ulaşana kadar (10-15 dakika) sabırla sürdürülmelidir.'
      },
      {
        number: 3,
        title: 'KBB CERRAHI STERİL GİYİNMİŞ, RİJİT BRONKOSKOP VE AÇIK TRAKEOSTOMİ SETİ İLE MASADA BEKLEMEDEN İNDÜKSİYONA BAŞLANMAZ',
        content: 'Ameliyathanede anestezi indüksiyonuna başlandığı an cerrahi ekip (KBB cerrahı) steril önlük ve eldivenlerini giymiş olarak hastanın başucunda bulunmalıdır. Rijit bronkoskop (ışık kaynağı açık), trakeotomi kiti ve cerrahi bistüri masada açılmış olmalıdır. İndüksiyon veya laringoskopi esnasında tam obstrüksiyon gelişirse ve entübasyon 1-2 denemede başarılamazsa zaman kaybetmeksizin rijit bronkoskopi ile lümen açılmalı veya cerrahi trakeostomiye/krikotiroidotomiye geçilmelidir.'
      },
      {
        number: 4,
        title: 'YAŞA GÖRE 0.5 - 1.0 NUMARA KÜÇÜK TÜP SEÇİMİ VE "KÖPÜK BALONCUĞU" KILAVUZLUĞUNDA NAZİK ENTÜBASYON',
        content: 'Laringoskopide epiglot devasa, hiperemik ve morfolojisi bozulmuş bir "kiraz kırmızısı" kitle olarak görülür; vokal kordlar ve glottik yarık ödemden dolayı neredeyse tamamen görünmezdir. Tüp numarası yaşa göre hesaplanan formülden en az 0.5 ile 1.0 mm daha küçük seçilmelidir (örn. 4 yaş çocuk için normalde 5.0 mm iken 4.0 veya 3.5 mm kaflı tüp hazır bulundurulur). Glottik lümen seçilemiyorsa bir asistanın göğüs kafesine hafifçe dışarıdan basmasıyla vokal kord seviyesinden çıkan küçük HAVA KÖPÜĞÜ / BALONCUKLAR izlenir ve stileli tüp doğrudan bu baloncuk kaynağına yönlendirilir; ödemli dokulara asla travmatik baskı uygulanmaz!'
      },
      {
        number: 5,
        title: 'TÜPÜN KAZARA ÇIKMASINA (AKSEDENTAL EKSTÜBASYON) KARŞI SIFIR TOLERANS VE YOĞUN BAKIMDA TAM SEDASYON GÜVENLİĞİ',
        content: 'Epiglotit hastasında entübe edildikten sonra tüpün kazara çıkması (aksendental ekstübasyon) re-entübasyonun imkansız olduğu ölümcül bir felakettir! Tüp ağız köşesine su geçirmez flasterlerle ve baş çevresine çift sargıyla sarsılmaz biçimde sabitlenmelidir. Çocuk yoğun bakıma entübe ve derin sedatize nakledilir; ellerine tespit bandajları uygulanır. Ekstübasyon kararı ancak 48-72 saatlik parenteral antibiyotik ve kortikosteroid tedavisinden sonra, ameliyathanede anestezi altında KBB cerrahı ile birlikte direkt laringoskopide supraglottik ödemin tamamen gerilediği ve kaf kaçağının pozitif olduğu doğrudan görülerek verilir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Acil KBB Konsültasyonu: İvedilikle ameliyathanede karşılanma; acil cerrahi hava yolu ekibi olarak hazır bulunma.',
      'Pediatrik Yoğun Bakım (Çocuk) / Genel Yoğun Bakım (Erişkin) Konsültasyonu: Ameliyathane sonrası mekanik ventilatör ve yoğun bakım yatağının önceden rezerve edilmesi.',
      'Pediatrik Enfeksiyon Hastalıkları: Ampirik bakteriyel tedavi planı (3. Kuşak Sefalosporin: Seftriakson / Sefotaksim ± Vankomisin).'
    ],
    historyAndPhysical: [
      'Semptomların Başlangıç Hızı: Birkaç saat içinde hızla gelişen yüksek ateş, boğaz ağrısı, yutma güçlüğü ve solunum sıkıntısı.',
      'Aşılanma Öyküsü: Hib aşısı takvimi (aşısız çocuklarda Hib riski çok yüksektir).',
      'Pozisyonel Özellikler: Hastanın sırtüstü yatmaya direnmesi, boynunu öne uzatıp ağzı açık nefes alması (tripod pozisyonu bozulmamalıdır).',
      'Sekresyon Kontrolü: Ağızdan salya akması (drooling) epiglot ve hipofarinksin tam obstrüksiyonunun en güvenilir fizik muayene bulgusudur.'
    ],
    laboratoryAndTests: [
      'DİKKAT: Hastayı ajite edecek hiçbir rutin kan alma, damar yolu açma veya radyolojik tetkik için ameliyathaneye gidiş geciktirilmemelidir!',
      'Eğer tanı kesin değilse ve hasta stabilse refakat eşliğinde portatif Yumuşak Doku Boyun Grafisi (lateral): Epiglotun başparmak gibi şişmiş görünümü ("Thumb Sign").',
      'Kan grubu ve Cross-Match/T&S: Hasta uyutulduktan sonra ameliyathanede kan örneği alınır.',
      'Tam Kan Sayımı (Lökositoz ve sola kayma), CRP, Prokalsitonin ve Kan Kültürü (İndüksiyon sonrası damar yolu açıldığında alınır).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart Monitörizasyon: Preoksijenizasyon anında SpO2 probu nazikçe takılır; EKG elektrotları ve NIBP manşonu hastayı ajite etmeden veya uykuya daldıktan sonra yerleştirilir.',
      'Sürekli Kapnografi (EtCO2): Entübasyon tüpünün trakeada olduğunu teyit eden en hayati gösterge.',
      'Prekordiyal Stetoskop: Solunum seslerinin ve kalp ritminin anlık ve kesintisiz dinlenmesi.',
      'Vücut Sıcaklığı Monitörizasyonu (yüksek ateş takibi).'
    ],
    vascularAccess: [
      'İndüksiyon Öncesi Damar Yolu Açılmaz (Ajitasyon ve kardiyak arresti tetikler).',
      'Hasta Sevofluran ile derin anesteziye ulaştığı an (kirpik refleksi kaybolup solunum düzenli hale gelince) en az 1-2 adet güvenli periferik intravenöz damar yolu (20G veya 22G) hızla açılır.',
      'İntraoperatif Atropin (0.02 mg/kg İV): Vagal bradikardiyi önlemek ve aşırı hava yolu sekresyonlarını kurutmak için damar yolu açılır açılmaz uygulanır.',
      'İntraoperatif İV Deksametazon (0.5 - 1.0 mg/kg, maks 16 mg): Supraglottik ödemi hızla baskılamak için indüksiyonun hemen ardından verilir.'
    ],
    patientPosition: 'Ebeveyn Kucağında / Yarı Oturur (Tripod) Pozisyonda Başlanır; Derin Anestezi Sağlandıktan Sonra Supin Pozisyona Alınır',
    patientPositionDetails: [
      'Çocuk ameliyathaneye ebeveyni ile birlikte girer ve ebeveynin kucağında dik veya hafif öne eğik oturur pozisyonda tutulur.',
      'Anestezi maskesi yüze bastırılmadan, hekimin veya ebeveynin elinde hafif mesafeden ("blow-by" tekniği) yaklaştırılarak %100 O2 ve düşük konsantrasyonda Sevofluran başlatılır.',
      'Sevofluran kademeli olarak %8\'e titre edilir; hasta derinleştikçe ameliyat masasına sırtüstü nazikçe yatırılır.',
      'Başın altına küçük bir omuz desteği/rulo konularak hafif ekstansiyon sağlanır (koklama / sniffing pozisyonu).'
    ],
    anesthesiaManagement: [
      'İndüksiyon: %100 O2 ile Sevofluran inhalasyon indüksiyonu; spontan solunum kesintisiz sürdürülür.',
      'Pozitif basınçlı maske ventilasyonundan kaçınılır; gerekirse nazik CPAP (3-5 cmH2O) ile hava yolunun kollabe olması engellenir.',
      'KAS GEVŞETİCİ ASLA VERİLMEZ: Süksinilkolin veya Rokuronyum faringeal kas tonusunu yok ederek laringeal girişi tam tıkar ve CICO krizini tetikler.',
      'Preoperatif Sedatifler / Opioidler Yasaktır: Midazolam veya Morfin spontan solunum eforunu kırarak akut arrest yaratabilir.',
      'Azot Protoksit (N2O) Yasaktır: Hipoksi riskini önlemek için %100 O2 kullanılır.',
      'Derin anestezi sağlandıktan sonra İV damar yolu açılır, İV Atropin ve antibiyotik uygulanır.'
    ],
    airwayManagement: [
      'Videolaringoskop (C-MAC, GlideScope vb.) veya rijit Mac/Miller bleydi ile aşırı nazik direkt laringoskopi yapılır.',
      'Vallekulaya nazikçe oturulur; ödemli epiglota doğrudan temas edilmemeye çalışılır (epiglot devasa "kiraz kırmızısı" bir kütledir).',
      'Yaşa göre hesaplanan formülden (Yaş/4 + 4) 0.5 - 1.0 numara küçük kaflı mikrokaflı endotrakeal tüp (stilesi içinde hafif eğimli) hazırlanır.',
      'Göğse hafif dış bası ile çıkan köpük/baloncuk kılavuzluğunda tüp trakeaya nazikçe kaydırılır.',
      'Tüpün kafı şişirilir; bilateral solunum sesleri ve 5 dalga boyu EtCO2 ile trakeal yerleşim kesinleştirilir.',
      'Hava Yolu Sabitleme: Tüp dudak hizasında santimetre olarak kaydedilir; su geçirmez çift bantla skull tabanına sarılarak sabitlenir.'
    ],
    criticalSurgicalStages: [
      '1. Hastanın Ebeveyn Kucağında ve Tripod Pozisyonunda Ameliyathanede Karşılanması.',
      '2. KBB Cerrahının Steril Önlükle, Açık Trakeostomi Seti ve Rijit Bronkoskop Masada Hazır Beklemesi.',
      '3. Sevofluran ve %100 O2 ile Spontan Solunumu Korumalı İnhalasyon İndüksiyonu.',
      '4. Derin Anesteziye Ulaşılması, Supin Pozisyona Alınma ve Acil İV Damar Yolunun Açılması.',
      '5. İV Atropin (0.02 mg/kg) ve İV Deksametazon (0.5-1.0 mg/kg) Uygulaması.',
      '6. Nazik Laringoskopi ve Şişmiş Kiraz Kırmızısı Epiglotun Görülmesi.',
      '7. Baloncuk Kılavuzluğunda Küçük Numaralı (0.5-1.0 No Küçük) Kaflı Tüple Trakeal Entübasyon.',
      '8. EtCO2 ve Solunum Seslerinin Teyidi, Tüpün Kafatasına Sarsılmaz Şekilde Bantlanması.',
      '9. Ameliyathaneden Pediatrik/Erişkin Yoğun Bakıma Entübe ve Derin Sedatize Nakil.'
    ],
    emergenceNotes: [
      'HASTA AMELİYATHANEDE ASLA EKSTÜBE EDİLMEZ!',
      'Entübasyon tüpü sabitlendikten ve stabil ventilasyon sağlandıktan sonra hasta doğrudan Yoğun Bakım Ünitesine (YBÜ) nakledilir.',
      'Nakil esnasında taşınabilir ventilatör/Ambu balonu, monitör, acil hava yolu kiti ve anestezi hekimi refakati zorunludur.',
      'Yoğun bakımda hasta ajite olup tüpü çekmesin diye sürekli sedoanaljezi (Deksmedetomidin veya Fentanil/Midazolam) ve el bileği tespit bantları uygulanır.',
      'Ekstübasyon kararı 48-72 saat sonra ameliyathanede anestezi altında KBB cerrahı gözetiminde supraglottik ödemin tamamen gerilediği ve kaf kaçağının pozitif olduğu doğrudan görülerek verilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Yoğun bakımda İV Parasetamol (15 mg/kg, 6 saatte bir) bazal analjezik olarak uygulanır.',
      'Sürekli sedoanaljezi idamesi: Deksmedetomidin veya Fentanil/Midazolam infüzyonu (hastanın ajitasyonunu ve tüple mücadele etmesini önler).',
      'İntravenöz Kortikosteroid İdamesi: Deksametazon (0.15 - 0.3 mg/kg/gün) 48-72 saat sürdürülür.',
      'Parenteral Antibiyotik Tedavisi: İV Seftriakson (100 mg/kg/gün) veya Ampisilin-Sulbaktam.'
    ],
    prospectRecommendations: [
      'PROSPECT Acil Hava Yolu ve Laringeal Enfeksiyon Önerileri:',
      'Hasta ajitasyonunun önlenmesi birinci önceliktir; yoğun bakımda dengeli sedoanaljezi sağlanmalıdır.',
      'Laringeal ödemin baskılanması için erken ve agresif sistemik kortikosteroid (Deksametazon) protokolü uygulanır.',
      'Ağrılı invaziv girişimler ancak yeterli sedasyon ve lokal anestezik infiltrasyonu altında gerçekleştirilmelidir.'
    ],
    erasRecommendations: [
      'ERAS ve Pediatrik Kritik Bakım Protokolleri:',
      'Akut fazda (ilk 48 saat) erken ekstübasyon kontrendikedir; güvenli havayolu stabilizasyonu önceliklidir.',
      '48-72. saatte elektif ekstübasyon kriterleri:',
      '  - Ateşin normale dönmesi, sistemik inflamasyon belirteçlerinin (lökosit, CRP) gerilemesi;',
      '  - Pozitif Kaf Kaçağı Testi (Cuff-Leak Test): Kafta hava boşaltıldığında tüp çevresinden hava kaçağının dinlenmesi;',
      '  - Ameliyathanede direkt/videolaringoskopi kontrolü: Epiglot ve vokal kord ödeminin kaybolduğunun KBB uzmanıyla birlikte doğrudan teyidi.',
      'Ekstübasyon sonrası en az 24 saat daha YBÜ\'de yakın solunum takibi sürdürülmelidir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section V: Otolaryngology - Larynx and Trachea: Epiglottitis & Pediatric Airway Emergencies, pp. 787-792.',
    erasReference: 'Enhanced Recovery and Critical Care Guidelines: Management of Pediatric Acute Airway Obstruction and Epiglottitis.',
    prospectReference: 'PROSPECT and Difficult Airway Society (DAS) Guidelines on Upper Airway Infection and Supraglottitis.',
    otherReferences: [
      'Difficult Airway Society (DAS) and Association of Paediatric Anaesthetists of Great Britain and Ireland (APAGBI): Pediatric Difficult Airway Guidelines.',
      'American Academy of Pediatrics (AAP) & American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS): Consensus on the Management of Acute Supraglottitis / Epiglottitis in Children and Adults.',
      'Miller\'s Anesthesia, 9th Edition. Chapter 68: Pediatric Anesthesia & Chapter 44: Airway Management in the Difficult Airway.',
      'Barash, P. G., et al. Clinical Anesthesia, 8th Edition. Pediatric Otolaryngology and Acute Upper Airway Infections.',
      'British Journal of Anaesthesia (BJA): "Management of Acute Epiglottitis: Lessons Learned from National Airway Audits (NAP4)".',
      'Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) & Türk Anesteziyoloji ve Reanimasyon Derneği (TARD): Çocukluk Çağı ve Erişkin Akut Üst Solunum Yolu Obstrüksiyonlarında Anestezi ve Cerrahi Güvenlik Konsensusu.'
    ]
  }
};
