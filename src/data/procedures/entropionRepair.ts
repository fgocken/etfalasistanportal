import { ProcedureDefinition } from '../../types/procedures';

/**
 * Entropiyon Onarımı: Alt Kapak Retraktör Plikasyonu, Transvers Tarsotomi (Wies/Quickert) ve Lateral Tarsal Strip Cerrahisi
 * (Entropion Repair / Lower Eyelid Retractor Plication, Wies Transverse Blepharotomy, Quickert Sutures and Lateral Tarsal Strip)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth (2012),
 * Schein et al. (NEJM 2000), ASA OR Fire Advisory (2013), ASRA 5th Ed. (2025), Gan et al. 4th PONV Consensus (2020).
 */
export const entropionRepair: ProcedureDefinition = {
  id: 'entropion-repair',
  name: 'Entropiyon Onarımı: Alt Kapak Retraktör Plikasyonu ve Tarsal Strip Cerrahisi',
  shortCode: 'GOZ-ENTROPIYON',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Kapak Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Göz kapağının (özellikle alt kapağın) serbest kenarının ve kirpiklerinin içe, göz küresine doğru dönmesi (inversiyonu) sonucu kirpiklerin korneaya sürtünmesiyle epitel erozyonu, keratit ve ülser gelişen hastalarda kapak anatomisinin cerrahi olarak düzeltilmesi ameliyatıdır. Başlıca mikrocerrahi teknikler: (1) Alt Kapak Retraktör Plikasyonu / Reinsersiyonu (Jones / Wobig); (2) Kombine Lateral Tarsal Strip (LTS — nüksü önlemede altın standart); (3) Wies Transvers Tarsotomi ve Quickert Eversiyon Sütürleri; (4) Skatrisyel Entropiyonda sert damak/bukkal mukoza grefti ile arka lamel uzatılması.',
  indications: [
    'İnvolüsyonel (Senil) Entropiyon: Alt kapak retraktör ayrılması, preseptal orbikülaris over-riding\'i ve horizontal gevşeklik (en sık)',
    'Persistan Korneal Epitelyal Defekt ve Kornea Ülseri Riski',
    'Skatrisyel Entropiyon: Oküler sikatrisyel pemfigoid, Stevens-Johnson sendromu, yanık veya trahom sekeli',
    'Spastik Entropiyon ve Konjenital Entropiyon / Epiblefaron'
  ],
  averageDuration: '30 - 60 dakika (Tek taraflı retraktör plikasyonu + LTS: 35-45 dk; Bilateral veya mukoza greftli skatrisyel onarım: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 20 mL (Lokal adrenalin ve bipolar koter ile kan kaybı minimaldir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Derin Orbital / Retrobulber Hematom Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Orbital Kompartman / Retrobulber Hematom: Orbital yağ yastıkçığı veya lateral kantal damarlardan orbita arkasına sızıntı (akut kompartman sendromu ve körlük riski)',
      'Marginal ve Periferik Palpebral Arter Arkadları',
      'İnferior Oblik Kas Çevresi Venöz Pleksusu'
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
      'Lokal İnfiltrasyon (Lidokain %2 + Bupivakain %0.5 + 1:100.000 Adrenalin) ± İnfraorbital Sinir Bloğu + Minimal Bilinçli Sedasyon (MAC) — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Genel Anestezi (LMA veya Spiralli ETT): Pediatrik epiblefaron/konjenital olgular, sert damak/bukkal mukoza greftli skatrisyel onarımlar, ileri demans, tremor veya klostrofobisi olan erişkinlerde'
    ],
    clinicalRationale: 'Adrenalinli lokal infiltrasyon + infraorbital blok ve minimal MAC, geriatrik oküloplastik popülasyonda genel anestezi morbiditesini ve ekstübasyon hipertansiyonu kaynaklı hematomu önler. Yüzde bipolar koter kullanıldığı için ASA OR yangın üçgeni güvenliği (örtü altı medikal hava veya FiO₂ ≤%30, sulu %5 Povidon-İyot) zorunludur.',
    rulesTitle: 'ENTROPİYON ONARIMINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'Entropiyon onarımında hayati kurallar: (1) ASA OR Yangın Üçgeni (yüz koteri + FiO₂ ≤%30) ve aşırı sedasyon tuzağı; (2) Mevcut kornea erozyonu/ülseri için kornea kalkanı koruması; (3) İnferior oblik kas koruması (postop diplopi önlemi) ve lateral kantusta OCR yönetimi; (4) Adrenalinli lokal anestezik toksisitesi; (5) Akut retrobulber hematom / OCS (<60-90 dk) acil dekompresyon paketi.',
    indispensableRules: [
      {
        number: 1,
        title: 'ASA AMELİYATHANE YANGIN ÜÇGENİ (YÜZ KOTERİ + OKSİJEN) VE AŞIRI SEDASYON TUZAĞI',
        content: 'Kapak diseksiyonunda bipolar koter yüzün ortasında kullanılır! Örtü altında yüksek akımlı O₂ birikimi yüz yanıklarının 1 numaralı nedenidir: Örtü altına medikal hava veya FiO₂ ≤%30 verilmeli, koter öncesi O₂ ≥1 dk kesilip havalandırılmalı ve alkol bazlı antiseptik yerine sulu %5 Povidon-İyot kullanılmalıdır. Geriatrik hastada kontrolsüz Propofol bolusları apne ve ani sıçramalı uyanmaya yol açtığından YASAKTIR.'
      },
      {
        number: 2,
        title: 'MEVCUT KORNEA EROZYONU / ÜLSERİ KORUMASI VE KORNEA KALKANI (CORNEAL SHIELD)',
        content: 'İçe dönük kirpiklerin sürekli sürtünmesi nedeniyle kornea epiteli zaten incelmiş/erozyone olabilir. İnsizyon öncesi bol antibiyotikli pomad ile kornea kalkanı takılmalı ve operasyon sonunda çıkarıldığı teyit edilmelidir.'
      },
      {
        number: 3,
        title: 'İNFERİOR OBLİK KAS KORUMASI (DİPLOPİ ÖNLEMİ) VE LATERAL KANTUSTA OCR ALARMI',
        content: 'Alt kapak retraktör diseksiyonu sırasında hemen arkadaki inferior oblik kasa derin koter/dikiş temasından kaçınılır (kalıcı dikey şaşılık ve DİPLOPİ riski!). Lateral tarsal strip asılırken gelişebilecek OCR bradikardisinde 1. adım cerrahı durdurmak, düzelmezse İV Atropin 0.5 mg uygulamaktır.'
      },
      {
        number: 4,
        title: 'LOKAL ANESTEZİK & ADRENALİN TOKSİSİTESİ VE GERİATRİK DELİRYUM ÖNLEMİ',
        content: '1:100.000 Adrenalinli infiltrasyonda negatif aspirasyon zorunludur; EKG/KB izlenir (gerekirse İV Esmolol/Labetalol). Geriatrik hastalarda postop deliryumu tetikleyen yüksek doz benzodiazepinden kaçınılır.'
      },
      {
        number: 5,
        title: 'POSTOPERATİF AKUT RETROBULBER HEMATOM / ORBİTAL KOMPARTMAN SENDROMU (OCS) ACİL PAKETİ',
        content: 'Orbital yağ veya kantal damarlardan orbita arkasına kanama gelişip ani şiddetli göz ağrısı, proptozis, sert kapak ödemi, diplopi veya görme kaybı yaratırsa altın pencere (<60-90 dk) içinde derhal: (1) Sütürlerin açılması + acil lateral kantotomi / inferior kantolizis, (2) 30° baş elevasyonu, (3) İV Mannitol (1-2 g/kg) ve (4) İV Asetazolamid (500 mg) uygulanır!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Entropiyon etiyolojisi, kornea ülseri/erozyonu, alt kapak retraktör ayrılması ve horizontal laksite değerlendirmesi.',
      'Kardiyoloji / İç Hastalıkları (Yalnızca Klinik Endikasyonda): Dekompanse kardiyopulmoner hastalık yoksa stabil lokal/MAC hastada rutin konsültasyon GEREKMEZ.',
      'Anestezi Değerlendirmesi: Sırtüstü yatma toleransı, geriatrik deliryum riski ve minimal sedasyon planı.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan Yönetimi (ASRA 2025 & PAUSE): Yüzeyel kapak cerrahisinde tromboemboli riski ile orbital hematom riski cerrahla birlikte tartılır; DOAC kesilecekse 48 sa (5-7 gün değil!) ve rutin köprüleme YAPILMAZ (bkz. #infografik=antithrombotic-matrix).',
      'Aktif Bakteriyel Keratit / Kornea Ülseri, Hipertansiyon ve Klostrofobi Öyküsü.'
    ],
    laboratoryAndTests: [
      'DÜŞÜK RİSKLİ LOKAL / MAC KAPAK CERRAHİSİNDE RUTİN PREOP LABORATUVAR VE EKG İSTENMEZ! (Schein NEJM 2000 & ASA Advisory).',
      'Klinik Endikasyon Bazlı Tetkikler: Warfarin kullananlarda güncel INR, diyabetiklerde vaka günü kan şekeri ve aktif kardiyak semptom varlığında 12 derivasyonlu EKG.'
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
      '15-20° ters Trendelenburg eğimi baş-boyun venöz basıncını düşürerek kanamayı ve ödemi azaltır.',
      'Cerrahi örtü L-bar çadır ile kaldırılır; örtü altına medikal hava (veya yalnızca hipoksemi varsa FiO₂ ≤%30) verilerek CO₂ göllenmesi ve yangın riski önlenir.'
    ],
    anesthesiaManagement: [
      'Lokal İnfiltrasyon ve Rejyonel Blok Protokolü:',
      '  - Lidokain %2 + Bupivakain %0.5 (1:1) + 1:100.000 Adrenalin (toplam 2-4 mL; negatif aspirasyon zorunlu).',
      '  - Tam vazokonstriksiyon için insizyondan 7-10 dakika önce enjeksiyon yapılır.',
      'Monitörize Anestezi Bakımı (MAC):',
      '  - Minimal anksiyoliz/analjezi: Gerekirse Fentanil 25 mcg İV ve/veya Midazolam 0.5-1.0 mg İV (geriatrik deliryum riskine karşı minimal doz).',
      '  - Kontrolsüz Propofol boluslarından kesinlikle kaçınılır.',
      'Genel Anestezi Gereken Durumlarda: LMA veya spiralli ETT ile pürüzsüz uyanma (damak/bukkal mukoza grefti alınacaksa boğaz tamponu ve çıkarılma teyidi!).'
    ],
    airwayManagement: [
      'MAC\'te spontan solunum korunur; ASA OR Fire Advisory gereği örtü altı medikal hava (veya FiO₂ ≤%30), bipolar koter açılmadan önce O₂ ≥1 dk kesilir ve sulu %5 Povidon-İyot kullanılır.'
    ],
    criticalSurgicalStages: [
      '1. Taraf Doğrulaması, 15-20° Baş Elevasyonu ve Örtü Altı Medikal Hava Çadırı.',
      '2. Topikal Proparakain, Sulu %5 Povidon-İyot ve Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '3. Adrenalinli Lokal İnfiltrasyon (7-10 dk bekleme; EKG/KB izlemi).',
      '4. Subsiliyer İnsizyon ve Preseptal Orbikülaris Disseksiyonu (Koter öncesi O₂ KAPALI teyidi!).',
      '5. Alt Kapak Retraktörlerinin Tanımlanması (İnferior oblik kası koruma!).',
      '6. Retraktörlerin Tarsus Alt Sınırına Plikasyonu / Reinsersiyonu.',
      '7. Eşlik Eden Laksitede Lateral Tarsal Strip (Whitnall tüberkülüne tespit — OCR kontrolü!).',
      '8. Cilt Kapanışı, Kornea Kalkanının Çıkarılma Teyidi, Antibiyotikli Pomad ve Görmeyi Kapatmayan Hafif Pansuman.'
    ],
    emergenceNotes: [
      'Lokal/MAC cerrahisinde hasta PADSS ≥9 kriteriyle kısa gözlem sonrası aynı gün taburcu edilir.',
      'Sıkı baskılı göz bandajı YAPILMAZ (retrobulber hematom ve görme kaybı takibini maskeler!).',
      'Ani şiddetli göz ağrısı, proptozis, diplopi veya görme azalmasında acil başvuru (OCS alarmı) anlatılır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Ağrı genellikle hafiftir; uzun etkili lokal infiltrasyon ilk saatlerde etkin analjezi sağlar.',
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
      '  - Gözü Ovuşturma Yasağı: Yeni atılan retraktör ve kantal dikişlerin korunması için göz ovuşturulmaz.'
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
