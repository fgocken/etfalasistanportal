import { ProcedureDefinition } from '../../types/procedures';

/**
 * Pterjiyum Eksizyonu: Keratektomi, Tenon Rezeksiyonu ve Limbal-Konjonktival Otogreft (CAG) / Fibrin Yapıştırıcı Eşliğinde Rekonstrüksiyon
 * (Pterygium Excision with Limbal-Conjunctival Autograft [LCAG] and Fibrin Tissue Glue / Amniotic Membrane Transplantation)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth Joint Guidelines (2012),
 * Schein et al. (NEJM 2000), ASA OR Fire Practice Advisory (2013), Gan et al. 4th PONV Consensus (2020).
 */
export const pterygiumExcision: ProcedureDefinition = {
  id: 'pterygium-excision',
  name: 'Pterjiyum Eksizyonu ve Limbal-Konjonktival Otogreftleme (CAG) Cerrahisi',
  shortCode: 'GOZ-PTERJIYUM',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Kornea & Oküler Yüzey Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Bulber konjonktivanın interpalpebral aralıkta (özellikle nazal kadranda) elastotik dejenerasyonu ve proliferasyonu sonucu kornea üzerine doğru üçgen/kanat şeklinde ilerlemesi (pterjiyum) tablosunun cerrahi olarak eksizyonu ve oküler yüzeyin yeniden yapılandırılması ameliyatıdır. Kronik ultraviyole (UV) maruziyeti, sıcak, tozlu ve kuru iklim patogenezde temel rol oynar; korneal astigmatizma, kronik yabancı cisim hissi, kızarıklık ve pupil eksenini kapatarak görme kaybı yaratır. Modern mikrocerrahi teknikler: (1) Çıplak Sklera (Bare Sclera) Eksizyonu: Nüks oranı çok yüksek (%40-80) olduğundan tek başına tercih edilmez; (2) Limbal-Konjonktival Otogreftleme (CAG / LCAG): DÜNYA GENELİNDE ALTIN STANDARTTIR (nüks <%2-5). Pterjiyum başı korneadan künt/keskin disseksiyonla ayrılır (keratektomi), proliferatif Tenon dokusu eksize edilir ve üst/üst-temporal bulber konjonktivadan hazırlanan ince serbest greft yatağa nakledilir; (3) Fibrin Doku Yapıştırıcısı (Tisseel / Beriplast): Dikişsiz, daha az ağrılı ve hızlı fiksasyon sağlar; (4) Amniyon Zar Transplantasyonu (AMT) ve yüksek nüks riskinde adjuvan Mitomisin C (MMC %0.02) uygulanabilir.',
  indications: [
    'Pupil Eksenini Tehdit Eden veya Görme Aksını Kapatan İlerleyici Pterjiyum',
    'Korneal Düzensiz (İrregüler) Astigmatizma ve Görme Keskinliğinde Belirgin Azalma',
    'Kronik İrritasyon, Yanma, Batma, Rekürren İltihap (Pterijit) ve Kuru Göz Semptomları',
    'Oküler Hareket Kısıtlılığı ve Medial Rektus Traksiyonuna Bağlı Çift Görme (Diplopi)',
    'Ön Segment / Katarakt Cerrahisi Öncesi Kornea Topografisinin Düzeltilmesi ve Kozmetik Deformite',
    'Rekürren (Nüks) Pterjiyum Olguları'
  ],
  averageDuration: '20 - 45 dakika (Fibrin yapıştırıcı ile dikişsiz CAG: 20-30 dk; Dikişli CAG veya Amniyon zar transplantasyonu: 35-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 15 mL (Pterjiyum gövdesi neovaskülarizasyon içerir; episkleral koter ve lokal adrenalin ile kan kaybı minimaldir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Korneal Perforasyon ve Sklera İskemisi Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Episkleral Perforatör Damarlar ve Medial Rektus Kılıfı Pleksusu: Nazal Tenon disseksiyonunda derin damarlar',
      'Greft Donör Sahası (Üst Temporal Konjonktiva) Mikrovasküler Sızıntıları'
    ],
    hemostasisStrategies: [
      'Subkonjonktival Lidokain enjeksiyonuna 1:100.000 veya 1:200.000 Adrenalin (Epinefrin) eklenmesi',
      'Bipolar wet-field mikro-koter ile minimal termal yayılımla noktasal hemostaz (aşırı koterizasyon skleral nekroz ve erimeye yol açabilir; koter öncesi O₂ kesimi zorunludur!)',
      'Fibrin yapıştırıcı uygulanacak yatağın BSS ve mikro-süngerlerle kuru hale getirilmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Topikal Damla Anestezisi (Proparakain %0.5 / Oksibuprokain) + Subkonjonktival İnfiltrasyon (Lidokain %2 + 1:100.000 Adrenalin) + Minimal Bilinçli Sedasyon (MAC) veya Sedasyonsuz Takip — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Sub-Tenon Bloğu (Künt Kanül): Kooperasyonu zayıf veya nüks/geniş pterjiyumlu hastalarda en güvenli rejyonel akinezi seçeneğidir (yüksek miyopide [>26 mm] iğneli bloktan kaçınılır)',
      'Genel Anestezi (LMA veya ETT): Pediatrik olgularda, kontrolsüz baş tremoru, ileri demans veya şiddetli klostrofobisi olan hastalarda'
    ],
    clinicalRationale: 'Topikal damla + adrenalinli subkonjonktival infiltrasyon ve minimal MAC, keratektomi ve otogreft fiksasyonu için gereken analjezi ile vazokonstriksiyonu sağlarken cerrahın yön bakışı ("yukarı/dışa bak") komutu verebilmesine olanak tanır. Yüzde bipolar koter kullanıldığı için örtü altı medikal hava veya FiO₂ ≤%30 kuralı ile ASA OR yangın güvenliği mutlaka sağlanmalıdır.',
    rulesTitle: 'PTERJİYUM CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'Pterjiyum cerrahisinde temel kurallar: (1) Keratektomi anında sıfır hareket ve iyatrojenik kornea perforasyonu önlemi; (2) Medial rektus disseksiyonunda Okülokardiyak Refleks (OCR) yönetimi; (3) Adjuvan Mitomisin C kronometresi ve skleral erime koruması; (4) ASA OR Yangın Üçgeni (koter + O₂ uyarısı) ve aşırı sedasyon tuzağı; (5) Fibrin yapıştırıcı ve limbus-limbus oryantasyon disiplini.',
    indispensableRules: [
      {
        number: 1,
        title: 'KORNEAL KERATEKTOMİ FAZINDA SIFIR GÖZ HAREKETİ VE İYATROJENİK PERFORASYON ÖNLEMİ',
        content: 'Pterjiyum başı kornea stromasından mikro-bıçaklarla (kresent/Beaver) sıyrılırken hastanın aniden gözünü oynatması, öksürmesi veya başını çevirmesi ön kamaranın delinmesine (iyatrojenik korneal perforasyon / açık küre), iris prolapsusuna ve lens hasarına yol açabilir. Topikal/subkonjonktival anestezi tam oturmalı ve keratektomi anında hasta sözel temasla hareketsiz tutulmalıdır.'
      },
      {
        number: 2,
        title: 'MEDİAL REKTUS DİSSEKSİYONUNDA OKÜLOKARDİYAK REFLEKS (ASCHNER–DAGNİNİ)',
        content: 'Pterjiyum gövdesi nazale doğru eksize edilirken alttaki medial rektus kası traksiyonu trigemino-vagal refleksi (CN V → CN X) tetikleyerek ani bradikardi, AV blok veya asistoli yapabilir. İlk adım cerrahı durdurmaktır; ardından oksijenasyon/ventilasyon kontrol edilir, düzelmezse İV Atropin 0.5 mg uygulanır (rutin profilaktik Atropin önerilmez).'
      },
      {
        number: 3,
        title: 'ASA AMELİYATHANE YANGIN ÜÇGENİ VE AŞIRI SEDASYON TUZAĞI',
        content: 'Pterjiyum cerrahisinde sklera yatağında bipolar koter kullanılır! Örtü altında yüksek akımlı O₂ birikimi yüz yanığı yaratır: Örtü altına medikal hava veya FiO₂ ≤%30 verilmeli, koter öncesi O₂ ≥1 dk kesilip havalandırılmalı, sulu %5 Povidon-İyot (alkolsüz) kullanılmalıdır. Kontrolsüz Propofol bolusları derin uyku + ani sıçramalı uyanmaya yol açtığından YASAKTIR.'
      },
      {
        number: 4,
        title: 'ADJUVAN MİTOMİSİN C (MMC) KRONOMETRESİ VE SKLERAL NEKROZ ALARMI',
        content: 'Nüks olgularda çıplak skleraya MMC (%0.02) emdirilmiş mikro-sünger uygulanacaksa süre (1-2 dakika) kronometre ile takip edilmeli, süre bitiminde sesli uyarı verilmeli ve sahanın ≥20-30 mL BSS ile bol yıkanması teyit edilmelidir. Süre aşımı veya aşırı koter skleral erimeye (scleral melting) yol açar.'
      },
      {
        number: 5,
        title: 'ADRENALİN / OFTALMİK DAMLA SİSTEMİK ETKİLERİ VE ANTİKOAGÜLAN YÖNETİMİ',
        content: 'Subkonjonktival 1:100.000 Adrenalin yaşlı/koroner arter hastalarında ani taşikardi ve hipertansiyon yapabilir (gereğinde kısa etkili İV Esmolol/Labetalol titre edilir). Yüzeyel ekstraoküler bir işlem olduğundan çoğu hastada Aspirin, Klopidogrel, Warfarin (terapötik INR) ve DOAC kesilmeden (ASRA/RCoA uyumlu) işlem yapılabilir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Kornea Konsültasyonu: Pterjiyum evresi, korneal astigmatizma, kuru göz değerlendirmesi ve önceki glokom blebi varlığı (üst konjonktiva korunacaksa alt temporal greft veya AMT seçilir).',
      'Kardiyoloji / İç Hastalıkları (Yalnızca Klinik Endikasyonda): Dekompanse kardiyopulmoner hastalık veya kontrolsüz malign hipertansiyon yoksa stabil hastalarda rutin konsültasyon GEREKMEZ.',
      'Anestezi Değerlendirmesi: Sırtüstü yatma toleransı, klostrofobi ve anksiyete düzeyi.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan Kullanımı (RCoA/RCOphth & ASRA 2025): Yüzeyel konjonktival cerrahi olduğundan rutin antikoagülan/antiagregan kesimi GEREKMEZ; lokal adrenalin ve bipolar koter ile hemostaz güvenle sağlanır.',
      'Önceki Glokom Cerrahisi: Trabekülektomi blebi olan hastalarda üst konjonktiva donör saha olarak kullanılmaz.',
      'Aktif Oküler Enfeksiyon: Blefarit, konjonktivit veya dakriyosistit operasyon öncesi tedavi edilmelidir.'
    ],
    laboratoryAndTests: [
      'RUTİN PREOPERATİF LABORATUVAR VE EKG İSTENMEZ! (Schein NEJM 2000 & ASA Advisory: Düşük riskli yüzeyel oftalmik lokal/MAC cerrahisinde rutin TKS, PT/aPTT/INR, biyokimya ve EKG gereksizdir.)',
      'Klinik Endikasyon Bazlı Tetkikler: Warfarin kullananlarda güncel INR, diyabetiklerde vaka günü kan şekeri ve aktif kardiyak semptom varlığında 12 derivasyonlu EKG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (OCR bradikardi ve adrenalin taşiaritmi takibi), SpO₂, NIBP ve sedasyon veriliyorsa nazal EtCO₂.',
      'Sözel Kooperasyon ve Solunum Takibi: Örtü altı solunum eforu ve anksiyete izlemi.'
    ],
    vascularAccess: [
      '1 adet güvenli periferik intravenöz damar yolu (20-22G — sedasyon veya iğneli blok yapılacaksa zorunlu).',
      'Acil İlaçlar Hazır: İV Atropin (0.5 mg), gereğinde İV Esmolol veya Labetalol.'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Donut ile Hareketsiz',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; baş silikon donut yastıkla mikroskop eksenine paralel sabitlenir.',
      'Cerrahi örtü L-bar çadır sistemi ile hastanın yüzünden uzaklaştırılır.',
      'Örtü altına medikal hava (4-6 L/dk) veya yalnızca hipoksemi varsa FiO₂ ≤%30 verilerek CO₂ göllenmesi ve koter yangın riski önlenir.'
    ],
    anesthesiaManagement: [
      'Topikal & Subkonjonktival Anestezi Protokolü:',
      '  - Topikal Damla: Proparakain %0.5 (2-3 damla).',
      '  - Subkonjonktival İnfiltrasyon: 0.5 - 1.0 mL Lidokain %2 + 1:100.000 Adrenalin (30G iğne ile; tam vazokonstriksiyon için 3-5 dk beklenir).',
      'Monitörize Anestezi Bakımı (MAC):',
      '  - Gerekirse minimal anksiyoliz: Midazolam 0.5 - 1.0 mg İV (çoğu hasta sedasyonsuz tolere eder).',
      '  - Kontrolsüz Propofol boluslarından kesinlikle kaçınılır; hasta sözel komutlara ("dışa/yukarı bak") yanıt verebilmelidir.',
      '  - İntraoperatif hipertansiyonda önce ağrı/anksiyete/hiperkapni dışlanır; gerekirse kısa etkili İV Esmolol veya Labetalol titre edilir.'
    ],
    airwayManagement: [
      'Lokal/MAC yönetiminde spontan solunum korunur; ASA OR Fire kuralı gereği örtü altı medikal hava (veya FiO₂ ≤%30) kullanılır, koter açılmadan önce O₂ ≥1 dk kesilir.',
      'Genel anestezi gereken pediatrik veya koopere olamayan olgularda LMA tercih edilir.'
    ],
    criticalSurgicalStages: [
      '1. Taraf Doğrulaması, Baş Sabitleme ve Örtü Altı Medikal Hava Çadırı Kurulumu.',
      '2. Topikal Proparakain ve Sulu %5 Povidon-İyot Antisepsisi (Alkolsüz!).',
      '3. Blefarosta Takılması (Okülokardiyak refleks kontrolü).',
      '4. Subkonjonktival Lidokain + Adrenalin İnfiltrasyonu (Kalp hızı ve KB takibi).',
      '5. Korneal Keratektomi: Pterjiyum başının kornea stromasından sıyrılması (Sıfır hareket aşaması!).',
      '6. Pterjiyum Gövdesi ve Tenon Eksizyonu (Medial rektus kası koruması ve OCR izlemi).',
      '7. Bipolar Koter ile Noktasal Hemostaz (O₂ kapalı teyidi! Aşırı skleral koterden kaçınılır).',
      '8. Gerekirse MMC (%0.02) Uygulaması (Kronometre 1-2 dk + ≥20-30 mL BSS yıkama).',
      '9. Üst Temporal Konjonktivadan Serbest Otogreftin (CAG) Hazırlanması ve Limbus-Limbus Oryantasyonuyla Transferi.',
      '10. Fibrin Doku Yapıştırıcısı (2-3 dk fiksasyon) veya 8-0/10-0 Eriyebilir Sütürlerle Tespit.',
      '11. Antibiyotikli Damla/Pomad ve Steril Kapama (Gereğinde Terapötik Bandaj Kontakt Lens).'
    ],
    emergenceNotes: [
      'Lokal/MAC cerrahisinde uyanma süreci yoktur; PADSS ≥9 kriteriyle kısa gözlem sonrası taburcu edilir.',
      'Gözü ovuşturmak kesinlikle yasaklanır (serbest otogreft yerinden oynayabilir); ilk 24-48 saat hafif batma ve sulanma normaldir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Fibrin yapıştırıcı ile yapılan otogreftlemede postoperatif ağrı ve batma dikişli cerrahiye göre belirgin düzeyde daha azdır.',
      'Oral Parasetamol (500-1000 mg) ve kontrendikasyon yoksa kısa süreli oral/topikal NSAİİ ilk 24-48 saatte yeterlidir; sistemik opioidlere (Tramadol/Kodein) gerek yoktur.',
      'İlk 1-2 gün aralıklı soğuk jel kompres ödem ve yabancı cisim hissini azaltır.',
      'Kornea epitel defektine bağlı batmayı azaltmak için cerrah kararıyla ilk 24-48 saat terapötik bandaj kontakt lens uygulanabilir.'
    ],
    prospectRecommendations: [
      'Oftalmik oküler yüzey cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; RCoA/RCOphth ve güncel kanıta dayalı oftalmik analjezi ilkeleri doğrultusunda:',
      '  - Fibrin yapıştırıcı kullanımı sütürlere kıyasla postoperatif ağrıyı ve inflamasyonu anlamlı ölçüde azaltır.',
      '  - Parasetamol + topikal koruyucusuz lubrikasyon/NSAİİ ile opioid gerektirmeyen multimodal konfor sağlanır.'
    ],
    erasRecommendations: [
      'Günübirlik Oftalmik Cerrahi (Day-Case / RCoA-RCOphth) İlkeleri:',
      '  - Hızlı Taburculuk: PADSS kriterleriyle işlemden 30-60 dakika sonra taburcu edilir.',
      '  - UV Koruması: Postoperatif dönemde ve uzun vadede UV-400 koruyucu güneş gözlüğü kullanımı nüksü önlemede esastır.',
      '  - Topikal Tedavi: Greft ödemini ve nüksü önlemek için topikal steroid damlalar 3-4 hafta kademeli azaltılarak kullanılır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Cornea and External Disease Procedures. Wolters Kluwer / LWW.',
    erasReference: 'Kumar CM, Eke T, Dodds C, et al. Local anaesthesia for ophthalmic surgery — Joint guidelines from the Royal College of Anaesthetists (RCoA) and the Royal College of Ophthalmologists (RCOphth). 2012.',
    prospectReference: 'Oftalmik oküler yüzey cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi yaklaşımı RCoA/RCOphth (2012) ve Cochrane Pterygium Fibrin Glue vs Sutures derlemelerine dayanmaktadır.',
    otherReferences: [
      'Schein OD, Katz J, Bass EB, et al. The value of routine preoperative medical testing before cataract surgery. N Engl J Med. 2000;342(3):168-175.',
      'ASA Task Force on Operating Room Fires. Practice Advisory for the Prevention and Management of Operating Room Fires. Anesthesiology. 2013;118(2):271-290.',
      'Romano V, Cruciani M, Conti L, Fontana L. Fibrin glue versus sutures for conjunctival autografting in primary pterygium surgery. Cochrane Database Syst Rev. 2016;12:CD011308.',
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.'
    ]
  }
};
