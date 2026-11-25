import { ProcedureDefinition } from '../../types/procedures';

/**
 * Ektropiyon Onarımı: Lateral Tarsal Strip, Horizontal Kapak Kısaltması ve Greft/Flep ile Kapak Ektropiyonu Rekonstrüksiyonu
 * (Ectropion Repair / Lateral Tarsal Strip [LTS], Horizontal Shortening, Canthoplasty and Skin Flap/Graft)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth (2012),
 * Schein et al. (NEJM 2000), ASA OR Fire Advisory (2013), ASRA 5th Ed. (2025), Gan et al. 4th PONV Consensus (2020).
 */
export const ectropionRepair: ProcedureDefinition = {
  id: 'ectropion-repair',
  name: 'Ektropiyon Onarımı: Lateral Tarsal Strip ve Horizontal Kapak Kısaltması Cerrahisi',
  shortCode: 'GOZ-EKTROPIYON',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Kapak Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Göz kapağının (özellikle alt kapağın) kenarının dışa doğru dönmesi (eversiyonu) sonucu palpebral konjonktivanın açıkta kalması, epifora, kuru göz ve maruziyet keratopatisi (exposure keratitis) gelişen hastalarda kapak anatomisinin, tonusunun ve glob ile temasının yeniden sağlanması ameliyatıdır. Temel teknikler: (1) Lateral Tarsal Strip (LTS): İnvolüsyonel gevşeklikte altın standarttır; lateral kantotomi ve inferior kantolizis sonrası hazırlanan tarsus şeridi orbita lateral tüberkülü periostuna (Whitnall tüberkülü) asılır; (2) Medial Spindle (Tarsokonjonktival Eksizyon): Punktum eversiyonunda; (3) Tam Kat Pentagonal Kısaltma; (4) Skatrisyel Ektropiyon Rekonstrüksiyonu: Serbest tam kat deri grefti veya lokal transpozisyonel flep.',
  indications: [
    'İnvolüsyonel (Senil) Ektropiyon: Kantal tendon gevşekliği ve orbikülaris atrofisine bağlı alt kapak sarkması (en sık)',
    'Paralitik Ektropiyon: Fasiyal sinir felci (Bell paralizisi, akustik nörinom veya parotis cerrahisi sekeli) sonrası lagoftalmi',
    'Skatrisyel Ektropiyon: Travma, yanık, önceki blefaroplasti veya tümör eksizyonu sonrası skar kontraktürü',
    'Mekanik / Konjenital Ektropiyon ve İlerleyici Maruziyet Keratopatisi'
  ],
  averageDuration: '30 - 60 dakika (Tek taraflı LTS: 30-40 dk; Bilateral LTS veya serbest deri grefti/flep: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 20 mL (Lokal adrenalin ve bipolar koter ile kan kaybı minimaldir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Derin Retrobulber / Orbital Hematom Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Orbital Kompartman / Retrobulber Hematom: Lateral kantotomi ve periostal disseksiyon sırasında kanamanın orbita içine sızması (görmeyi tehdit eden acil kompartman sendromu)',
      'Angular Damarlar ve Medial/Lateral Palpebral Arter Arkadları',
      'Tarsal Strip Hazırlığı ve Tam Kat Kapak İnsizyonu Mikrovasküler Sızıntıları'
    ],
    hemostasisStrategies: [
      'Lokal anesteziğe 1:100.000 veya 1:200.000 Adrenalin eklenmesi ve insizyondan 7-10 dk önce enjeksiyon',
      'Bipolar wet-field mikro-koter ile selektif hemostaz (koter öncesi O₂ kesimi zorunlu!)',
      'Akut retrobulber hematom / OCS şüphesinde <60-90 dk içinde acil lateral kantotomi + inferior kantolizis + 30° baş elevasyonu + IV Mannitol (1-2 g/kg) + IV Asetazolamid (500 mg)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Lokal İnfiltrasyon (Lidokain %2 + Bupivakain %0.5 + 1:100.000 Adrenalin) ± İnfraorbital / Zigomatikofasiyal Sinir Bloğu + Minimal Bilinçli Sedasyon (MAC) — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Genel Anestezi (LMA veya Spiralli ETT): İleri demans, kontrolsüz baş tremoru, şiddetli klostrofobi, pediatrik olgular veya geniş deri grefti / kompleks rekonstrüksiyon gerektiren olgularda'
    ],
    clinicalRationale: 'Adrenalinli lokal infiltrasyon + bölgesel sinir bloğu ve minimal MAC, yaşlı oküloplastik popülasyonda genel anestezi morbiditesini önler ve uyanık hastada kapak gerginliğinin değerlendirilmesine olanak tanır. Yüzde bipolar koter kullanıldığı için ASA OR yangın üçgeni güvenliği (örtü altı medikal hava veya FiO₂ ≤%30, alkolsüz sulu %5 Povidon-İyot) hayati önem taşır.',
    rulesTitle: 'EKTROPİYON ONARIMINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'Ektropiyon onarımında temel kurallar: (1) ASA OR Yangın Üçgeni (yüz koteri + FiO₂ ≤%30) ve aşırı sedasyon tuzağı; (2) Adrenalinli lokal anestezik toksisitesi (negatif aspirasyon + EKG/KB takibi); (3) Kornea kalkanı (Corneal Shield) koruması; (4) Whitnall periostal dikişinde OCR yönetimi; (5) Akut retrobulber hematom / OCS (<60-90 dk) acil dekompresyon paketi.',
    indispensableRules: [
      {
        number: 1,
        title: 'ASA AMELİYATHANE YANGIN ÜÇGENİ (YÜZ KOTERİ + OKSİJEN) VE AŞIRI SEDASYON TUZAĞI',
        content: 'Kapak cerrahisinde bipolar koter yüzün tam ortasında kullanılır! Örtü altında yüksek akımlı O₂ birikimi ameliyathane yüz yanıklarının 1 numaralı sebebidir: Örtü altına medikal hava veya FiO₂ ≤%30 verilmeli, koter öncesi O₂ ≥1 dk kesilip havalandırılmalı, alkol bazlı antiseptik yerine sulu %5 Povidon-İyot kullanılmalıdır. Geriatrik hastada kontrolsüz Propofol bolusları apne ve panikle sıçramalı uyanmaya yol açtığından YASAKTIR.'
      },
      {
        number: 2,
        title: 'LOKAL ANESTEZİK & ADRENALİN TOKSİSİTESİ VE İNTRAVASKÜLER ENJEKSİYON ALARMI',
        content: 'Kapak ve kantal bölge yüksek vaskülariteye sahiptir; 1:100.000 Adrenalinli Lidokain/Bupivakain enjeksiyonunda negatif aspirasyon şarttır. Yaşlı koroner arter hastalarında ani taşikardi, aritmi ve hipertansiyon gelişebilir; EKG/NIBP kesintisiz izlenir, gerekirse kısa etkili İV Esmolol veya Labetalol titre edilir.'
      },
      {
        number: 3,
        title: 'KORNEA KALKANI (CORNEAL SHIELD) VE SIFIR İYATROJENİK KORNEA TRAVMASI',
        content: 'Diseksiyon, koter ve dikişler korneaya 1-2 mm mesafededir. İnsizyon öncesi antibiyotikli pomad eşliğinde kornea kalkanı yerleştirilmeli ve operasyon bitiminde çıkarıldığı sözel olarak teyit edilmelidir.'
      },
      {
        number: 4,
        title: 'LATERAL KANTUS / WHİTNALL PERİOST DİKİŞİNDE OKÜLOKARDİYAK REFLEKS (OCR)',
        content: 'İnferior kantolizis ve tarsal şeridin orbita lateral periostuna asılması trigemino-vagal refleksle (CN V → CN X) ani bradikardi/asistoli yapabilir. İlk adım cerrahı durdurmak, 2. adım oksijenasyon/ventilasyon kontrolü, düzelmezse İV Atropin 0.5 mg uygulamaktır.'
      },
      {
        number: 5,
        title: 'POSTOPERATİF AKUT RETROBULBER HEMATOM / ORBİTAL KOMPARTMAN SENDROMU (OCS) ACİL PAKETİ',
        content: 'Lateral kantotomi ve periostal alandaki sızıntı orbita kompartmanına ilerleyip ani şiddetli göz ağrısı, proptozis, sert kapak ödemi, RAPD ve görme kaybı yaratırsa altın pencere (<60-90 dk) içinde derhal: (1) Sütürlerin açılması + acil lateral kantotomi / inferior kantolizis, (2) Baş 30° elevasyon, (3) İV Mannitol (1-2 g/kg) ve (4) İV Asetazolamid (500 mg) uygulanır!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Ektropiyon etiyolojisi, horizontal laksite (pinch/snap-back testi), punktum pozisyonu ve maruziyet keratopatisi.',
      'Kardiyoloji / İç Hastalıkları (Yalnızca Klinik Endikasyonda): Dekompanse kardiyopulmoner hastalık veya kontrolsüz malign hipertansiyon yoksa stabil lokal/MAC hastada rutin konsültasyon GEREKMEZ.',
      'Anestezi Değerlendirmesi: Sırtüstü yatma toleransı, geriatrik deliryum riski ve minimal sedasyon planı.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan Yönetimi (ASRA 2025 & PAUSE): Komprese edilebilir yüzeyel kapak cerrahisinde tromboembolik risk ile orbital hematom riski cerrahla birlikte tartılır; DOAC kesilecekse 48 sa (5-7 gün değil!) ve rutin köprüleme YAPILMAZ (bkz. #infografik=antithrombotic-matrix).',
      'Hipertansiyon Öyküsü: Bazal KB regülasyonu kapak ve orbital hematom riskini azaltır.',
      'Önceki Kapak Cerrahisi, Fasiyal Paralizi ve Klostrofobi Öyküsü.'
    ],
    laboratoryAndTests: [
      'DÜŞÜK RİSKLİ LOKAL / MAC KAPAK CERRAHİSİNDE RUTİN PREOP LABORATUVAR VE EKG İSTENMEZ! (Schein NEJM 2000 & ASA Advisory).',
      'Klinik Endikasyon Bazlı Tetkikler: Warfarin kullananlarda güncel INR, diyabetiklerde vaka günü kan şekeri ve aktif/yeni kardiyak semptom varlığında 12 derivasyonlu EKG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (OCR ve adrenalin aritmi analizi), SpO₂, NIBP (3-5 dk) ve sedasyon veriliyorsa nazal EtCO₂.',
      'Sözel Kooperasyon ve Solunum Eforu İzlemi.'
    ],
    vascularAccess: [
      '1 adet güvenli periferik intravenöz damar yolu (20-22G).',
      'Acil İlaçlar Hazır: İV Atropin (0.5 mg), Esmolol veya Labetalol.'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, 15-20° Ters Trendelenburg ve Sabit Baş',
    patientPositionDetails: [
      'Baş silikon donut yastıkla nötral sabitlenir.',
      '15-20° ters Trendelenburg eğimi baş-boyun venöz basıncını düşürerek kapak kanamasını ve ödemi azaltır.',
      'Cerrahi örtü L-bar çadır ile kaldırılır; örtü altına medikal hava (veya yalnızca hipoksemi varsa FiO₂ ≤%30) verilerek CO₂ göllenmesi ve yangın riski önlenir.'
    ],
    anesthesiaManagement: [
      'Lokal İnfiltrasyon ve Rejyonel Blok Protokolü:',
      '  - Lidokain %2 + Bupivakain %0.5 (1:1) + 1:100.000 Adrenalin (toplam 2-4 mL; negatif aspirasyon zorunlu).',
      '  - Tam vazokonstriksiyon için insizyondan 7-10 dakika önce enjeksiyon yapılır.',
      'Monitörize Anestezi Bakımı (MAC):',
      '  - Minimal anksiyoliz/analjezi: Gerekirse Fentanil 25 mcg İV ve/veya Midazolam 0.5-1.0 mg İV (geriatrik hastalarda deliryum riski nedeniyle benzodiazepin minimal tutulur).',
      '  - Kontrolsüz Propofol boluslarından kesinlikle kaçınılır.',
      'Genel Anestezi Gereken Nadir Durumlarda: LMA veya spiralli ETT ile pürüzsüz öksürüksüz uyanma.'
    ],
    airwayManagement: [
      'MAC\'te spontan solunum korunur; ASA OR Fire Advisory gereği örtü altı medikal hava (veya FiO₂ ≤%30), bipolar koter açılmadan önce O₂ ≥1 dk kesilir ve sulu %5 Povidon-İyot kullanılır (alkollü antiseptik YASAK).'
    ],
    criticalSurgicalStages: [
      '1. Taraf Doğrulaması, 15-20° Baş Elevasyonu ve Örtü Altı Medikal Hava Çadırı.',
      '2. Topikal Proparakain, Sulu %5 Povidon-İyot ve Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '3. Adrenalinli Lokal İnfiltrasyon (7-10 dk bekleme; EKG/KB izlemi).',
      '4. Lateral Kantotomi ve İnferior Kantolizis (Koter öncesi O₂ KAPALI teyidi!).',
      '5. Lateral Tarsal Şeridin (Tarsal Strip) Hazırlanması ve Horizontal Kısaltma.',
      '6. Tarsal Şeridin Whitnall Tüberkülü Periostuna Tespiti (OCR kontrolü!).',
      '7. Lateral Kantal Açının Oluşturulması ve Cilt Kapanışı.',
      '8. Kornea Kalkanının Çıkarılma Teyidi, Antibiyotikli Pomad ve Görmeyi Kapatmayan Hafif Pansuman.'
    ],
    emergenceNotes: [
      'Lokal/MAC cerrahisinde hasta PADSS ≥9 kriteriyle kısa gözlem sonrası aynı gün taburcu edilir.',
      'Sıkı baskılı göz bandajı YAPILMAZ (retrobulber hematom ve görme kaybı takibini maskeler!).',
      'Hastaya ani şiddetli göz ağrısı, proptozis veya görme azalmasında acil başvuru (OCS alarmı) anlatılır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Ağrı genellikle hafiftir; uzun etkili lokal anestezik infiltrasyonu ilk 4-6 saatte etkin analjezi sağlar.',
      'Oral Parasetamol (500-1000 mg) yeterlidir; sistemik opioidlere (Tramadol/Kodein) gerek yoktur.',
      'İlk 24-48 saat aralıklı soğuk jel kompres ödem ve ekimozu azaltır; erken dönemde agresif antiplatelet NSAİİ\'lerden kaçınılır.'
    ],
    prospectRecommendations: [
      'Oküloplastik kapak cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; RCoA/RCOphth (2012) ve 4th PONV Consensus (2020) ilkeleri doğrultusunda:',
      '  - Bupivakain/Lidokain lokal infiltrasyonu + Parasetamol ile opioid ve PONV riski olmaksızın güvenli günübirlik analjezi sağlanır.'
    ],
    erasRecommendations: [
      'Günübirlik Oküloplastik Cerrahi İlkeleri (RCoA-RCOphth):',
      '  - Hızlı Taburculuk: PADSS ≥9 kriteriyle 30-45 dakika içinde oral alım ve aynı gün taburculuk.',
      '  - Baş 30-45° Elevasyonu: İlk 48 saat baş yüksek yatış ödem ve hematom riskini azaltır.',
      '  - Gözü Ovuşturma Yasağı: Lateral kantal dikişlerin ayrışmasını önlemek için göz ovuşturulmaz.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Ectropion and Entropion Repair. Wolters Kluwer / LWW.',
    erasReference: 'Kumar CM, Eke T, Dodds C, et al. Local anaesthesia for ophthalmic surgery — Joint guidelines from the Royal College of Anaesthetists (RCoA) and the Royal College of Ophthalmologists (RCOphth). 2012.',
    prospectReference: 'Oküloplastik cerrahi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi yaklaşımı RCoA/RCOphth (2012) ve 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'Schein OD, Katz J, Bass EB, et al. The value of routine preoperative medical testing before cataract surgery. N Engl J Med. 2000;342(3):168-175.',
      'ASA Task Force on Operating Room Fires. Practice Advisory for the Prevention and Management of Operating Room Fires. Anesthesiology. 2013;118(2):271-290.',
      'Kopp SL, Vandermeulen E, et al. ASRA Pain Medicine Evidence-Based Guidelines (5th ed.). Reg Anesth Pain Med. 2025.',
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.'
    ]
  }
};
