import { ProcedureDefinition } from '../../types/procedures';

/**
 * Gastroskopi (Özofagogastroduodenoskopi - ÖGD / Üst GİS Endoskopi)
 * 
 * Jaffe (5th ed.), ASGE / ASA Sedation Guidelines, ESGE Consensus 
 * ve ERAS NORA prensipleri referans alınarak yapılandırılmıştır.
 */
export const gastroscopy: ProcedureDefinition = {
  id: 'gastroscopy',
  name: 'Gastroskopi (Özofagogastroduodenoskopi - ÖGD)',
  shortCode: 'GASTROSKOPİ',
  specialty: 'gastroenteroloji',
  specialtyName: 'Gastroenteroloji',
  categoryTag: 'Girişimsel Endoskopi & NORA',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Esnek video endoskop yardımıyla ağız boşluğundan girilerek orofarenks, krikofarengeal bileşke, özofagus, mide ve duodenumun (bulb ve inen kıta) doğrudan incelenmesi; doku biyopsisi alınması, aktif kanama hemostazı, varis ligasyonu/skleroterapi, yabancı cisim çıkarılması, darlık dilatasyonu ve Perkütan Endoskopik Gastrostomi (PEG) açılması işlemidir.',
  indications: [
    'Akut üst gastrointestinal kanamalar (hematemez, melena, peptik ülser veya özofagus/mide varis kanamaları)',
    'Açıklanamayan demir eksikliği anemisi, kronik kilo kaybı ve erken doyma şikayetleri',
    'Disfaji (yutma güçlüğü), odinofaji (ağrılı yutma), persistan kusma ve regürjitasyon',
    'Medikal tedaviye dirençli Gastroözofageal Reflü Hastalığı (GÖRH) ve Barrett özofagus takibi',
    'Mide ve özofagus poliplerinin rezeksiyonu (polipektomi / EMR / ESD)',
    'Özofagus varis ligasyonu/skleroterapi, korozif darlık dilatasyonu ve PEG açılması'
  ],
  averageDuration: '10 - 25 dakika (Tanısal Gastroskopi: 10-15 dk; Terapötik hemostaz / dilatasyon / polipektomi / PEG: 20-45 dk)',

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Monitored Anesthesia Care (MAC) / Derin Sedasyon: Propofol bazlı titre edilen sedasyon (Propofol bolus/TCI + düşük doz Fentanil/Remifentanil veya Midazolam) eşliğinde spontan solunumun korunması — Altın Standart'
    ],
    alternative: [
      'Genel Anestezi (Endotrakeal Entübasyonlu): Masif aktif üst GİS kanaması olan, dolu mideli, pilor darlığı/gastrik çıkış obstrüksiyonu bulunan, akalazyalı, yüksek aspirasyon riskli veya kardiyopulmoner instabilitesi olan olgularda hava yolunu korumak için Hızlı Seri İndüksiyon (RSI) ile endotrakeal entübasyon',
      'Orta Düzey Sedasyon (Bilinçli Sedasyon): Titre edilmiş Midazolam + Fentanil (özellikle anestezi derinliği kısıtlı tutulmak istenen hafif tanısal vakalarda)'
    ],
    notes: 'Gastroskopi ameliyathane dışı anestezi (NORA) ortamında uygulanır. Ağız boşluğu ve farenkste cerrahi endoskop bulunması nedeniyle havayolu paylaşılmaktadır. Propofol ile sağlanan derin sedasyon öğürme refleksini ve hasta stresini mükemmel baskılarken; aspirasyon, hipofaringeal sekresyon birikimi ve laringospazm riskine karşı havayolu açıklığı ve spontan solunum kapnografi ile kesintisiz gözetim altında tutulmalıdır.'
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Kardiyoloji Konsültasyonu: Koroner arter hastalığı, kalp yetmezliği veya ciddi kapak patolojisi olan hastalarda, derin sedasyonun yaratacağı vazodilatasyon ve hipotansiyon riskinin yönetimi için.',
      'Göğüs Hastalıkları / Uyku Tıbbı: Şiddetli Obstrüktif Uyku Apnesi (OUA), morbid obezite veya KOAH öyküsü olan hastalarda sedasyon esnasında üst havayolu kollapsı, hipoventilasyon ve hızlı desatürasyon riski preoperatif değerlendirilmelidir.',
      'Hematoloji Konsültasyonu: Terapötik müdahale (varis ligasyonu, polipektomi, dilatasyon) planlanan ve antikoagülan/antiagregan (Varfarin, DOAK, Klopidogrel vb.) kullanan hastalarda ilacın kesilme süreleri ESGE/ASGE kılavuzlarına göre belirlenmelidir.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Açlık Süresi ve Mide Boşalması (Kritik): Standart 2 saat berrak sıvı, 6 saat katı gıda kuralı uygulanır; ancak diyabetik gastroparezis, pilor stenozu/gastrik obstrüksiyon, akalazya veya aktif kanamada hasta saatlerce aç olsa dahi mide dolu kabul edilmelidir (aspirasyon riski).',
      'Hareketli Protez ve Takma Dişler: Isırma bloğu (bite-block) yerleştirilmeden önce takma dişler aspirasyon ve kırılma riskine karşı MUTLAKA çıkartılmalıdır.',
      'Zor Havayolu Taraması: Sedasyon altında dil kökünün geriye düşmesi ve farengeal kollaps riski (Mallampati skoru, retrognati, kısa-kalın boyun değerlendirilmelidir).',
      'Aktif Kanama Belirtileri: Taşikardi, ortostatik hipotansiyon, aktif hematemez veya aspirasyon öyküsü sorgulanmalıdır.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hemogram): Aktif kanaması olanlarda Hemoglobin/Hematokrit takibi; invaziv girişimlerde trombosit sayısı (>50.000/mcL).',
      'Koagülasyon Paneli (PT, aPTT, INR): Karaciğer yetmezliği veya varis kanaması zemininde koagülopati dışlanmalı, biyopsi/polipektomi için INR < 1.5 olmalıdır.',
      'Serum Elektrolitleri (Na, K, Cl, Ca) ve Böbrek Fonksiyonları (BUN, Kreatinin).',
      'Kan Grubu ve Çapraz Karşılaştırma (T&S): Masif üst GİS kanamalı acil gastroskopi olgularında transfüzyon hazırlığı yapılmalıdır.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (DII ve V5 derivasyonları), Nabız Oksimetresi (SpO2), Non-invaziv Kan Basıncı (NIBP 3-5 dakika aralıklarla), Isı.',
      'Sürekli Kapnografi (EtCO2 - Mikroakım / Microstream Nazal Örnekleme Kanülü) — Zorunlu: Derin sedasyonda solunum depresyonunu, hipoventilasyonu, apne ve laringospazmı periferik oksijen satürasyonu (SpO2) düşmeden dakikalar önce tespit etmek için esastır (ASA ve ASGE standartı).',
      'Sedasyon Derinliği İzlemi: MOAA/S (Modified Observer’s Assessment of Alertness/Sedation) skoru ile amaca uygun sedasyon seviyesinin takibi.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az 1 adet güvenli periferik venöz kateter (20G veya 18G) — Tercihen SAĞ koldan açılmalıdır (hasta sol lateral yattığı için sağ kol üstte ve ekibe kesintisiz açıktır).',
      'Aktif masif üst GİS kanaması olan acil olgularda 16G veya 14G geniş damaryolu.'
    ],
    // 4c) Hasta pozisyonu & fizyolojik güvenlik önlemleri
    patientPosition: 'Sol Lateral Dekübit (Left Lateral Decubitus) Pozisyonu — Altın Standart.',
    patientPositionDetails: [
      'Sol lateral pozisyon orofarengeal sekresyonların yerçekimiyle ağız köşesinden dışarı akmasını sağlar ve regürjitasyon/aspirasyon riskini belirgin azaltır.',
      'Isırma Bloğu (Bite-Block): Endoskopu diş travmasından korumak ve havayolu açıklığını sağlamak için oksijen girişli özel ağızlık lastikle başa sabitlenir.',
      'Baş hafif fleksiyonda tutulur; aspiratör ucu anında erişilebilir şekilde başucunda bekletilir.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'Propofol Bazlı Titre Edilen Sedasyon: İndüksiyon bolus 0.5–1.0 mg/kg IV yavaşça verilir, ardından ihtiyaca göre 10-20 mg aralıklı ek boluslar veya 50–100 mcg/kg/dk sürekli infüzyonla idame ettirilir.',
      'Analjezik / Adjuvan İlaç Stratejisi: Gastroskopide somatik ağrı azdır; genellikle düşük doz Fentanil (25-50 mcg IV) veya Remifentanil (0.025-0.05 mcg/kg/dk) endoskop geçiş konforunu artırır.',
      'Spazmolitik İlaçlar: Duodenum peristaltizmini durdurmak ve cerrahi görüşü sabitlemek için gastroenteroloğun talebiyle Butilskopolamin (Buscopan 20 mg IV) veya Glukagon (0.5–1 mg IV) uygulanabilir (taşikardi ve dar açılı glokomda kontrendikedir).',
      'Sıvı Tedavisi: Vazodilatasyona bağlı hipotansiyonu kompanse etmek için 250–500 mL dengeli kristalloid infüzyonu.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Oksijen Desteği: Kapnografi portlu nazal kanül veya oksijen girişli endoskopi ağızlığı üzerinden 2–4 L/dk O2 verilir.',
      'Çene İtme / Çene Kaldırma (Jaw-Thrust) Manevrası: Derin sedasyonda dil kökü geriye düşüp laringeal obstrüksiyon yapabilir; anestezi hekimi/teknikeri işlem boyunca çene desteği sağlamalıdır.',
      'Nazofaringeal Airway (NPA): Ağız içinde endoskop varken oral airway takılamaz; obstrüksiyon devam ederse iyi kayganlaştırılmış nazofaringeal tüp havayolunu anında açar.',
      'Acil Havayolu Kurtarma Kiti: Laringospazm veya aspirasyonda endoskop anında çektirilir, orofarenks aspire edilir, %100 O2 ile pozitif basınçlı maske ventilasyonu ve gerekirse acil endotrakeal entübasyon uygulanır.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Krikofarengeal Kas ve Üst Özofagus Sfinkterinden Geçiş: En yüksek laringospazm, öğürme ve aspirasyon riskinin olduğu andır. Hastanın sedasyon derinliği yeterli olmalı, ancak apneye girmemelidir.',
      'Mide Fundus Retrofleksiyonu (J-Manevrası): Vagal stimülasyona bağlı ani bradikardi gelişebilir; kalp hızı monitörden yakından izlenir.',
      'Varis Ligasyonu / Skleroterapi Aşaması: Bant atımı veya enjeksiyon sırasında aktif fışkırır tarzda masif kanama gelişebilir; derhal aspirasyon ve kan transfüzyonuna hazır olunmalıdır.',
      'İyatrojenik Özofagus veya Mide Perforasyonu: Subkutan amfizem, ani göğüs/karın ağrısı veya taşikardi/hipotansiyon; işlem sonlandırılır, cerrahi konsültasyon istenir.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Hızlı Derlenme: Propofol infüzyonu işlem bittiğinde kesilir; hasta genellikle 5-10 dakika içinde tamamen uyanır.',
      'Sedasyon Reversali (Gerektiğinde): Flumazenil (0.2 mg IV) veya Nalokson (0.04-0.1 mg IV) hazır bulundurulur.',
      'Taburculuk Kriterleri: Modifiye Aldrete Skoru veya PADSS >= 9 olmalı, hasta desteksiz yürüyebilmeli, oral sıvı tolere edebilmeli ve yanında refakatçi bulunmalıdır.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Gastroskopi sonrası ağrı genellikle hafiftir; en sık boğazda batma hissi, kuruluk veya hafif epigastrik dolgunluk görülür.',
      'Sistemik Hafif Analjezi: Gerekli olgularda oral veya IV Parasetamol (500 mg - 1 g) yeterlidir.',
      'Opioid İhtiyacı Yoktur: Rutin postoperatif opioid kullanımından kaçınılmalıdır.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Sedasyon Derinliğinin Titrasyonu: Hasta konforunu sağlarken solunum depresyonunu önlemek için sedasyonun minimum etkili dozda titre edilmesi.',
      'Aspirasyon Riski Yüksek Hastalarda Genel Anestezi: Şiddetli kanama veya gastrik stazı olan olgularda sedasyonda ısrar edilmemeli, havayolu erken endotrakeal tüple korunmalıdır.',
      'Rutin Aşırı Opioid Yüklemesinden Kaçınma: Postoperatif sedasyon süresini uzatmamak ve bulantıyı önlemek için opioid dozu sınırlandırılmalıdır.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Gereksiz Uzun Açlık Sürelerinin Önlenmesi: Berrak sıvılar işlemden 2 saat öncesine kadar serbest bırakılmalıdır.',
      'Kısa Etkili İlaçlar ile Hızlı Derlenme: Propofol bazlı sedasyon ile hastanın işlemden dakikalar sonra uyanması ve aynı gün erken taburculuk.',
      'Sürekli EtCO2 Kapnografi ile Hasta Güvenliği: NORA alanlarında sedasyon güvenliğini artıran temel kalite standardı.',
      'Sedasyon Sonrası Hasta Bilgilendirmesi: Hastanın 24 saat boyunca motorlu araç kullanmaması, hukuki belge imzalamaması ve alkol almaması yazılı olarak tebliğ edilmelidir.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section XVII: Nonoperating Room Anesthesia (NORA) - Upper Gastrointestinal Endoscopy, pp. 1422–1425. Lippincott Williams & Wilkins.",
    erasReference: 'Enhanced Recovery After Surgery (ERAS®) Society Principles for Ambulatory and Non-Operating Room Interventional Procedures (NORA).',
    prospectReference: 'PROSPECT Guidelines & ESGE / ASGE Consensus: Evidence-based pain and sedation management in upper gastrointestinal endoscopy.',
    otherReferences: [
      'ASGE / ASA Consensus Guidelines: Guidelines for Sedation and Anesthesia in Gastrointestinal Endoscopy. Gastrointestinal Endoscopy journal.',
      'ESGE (European Society of Gastrointestinal Endoscopy) Guideline: Non-anesthesiologist and anesthesiologist-administered sedation for GI endoscopy.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 82: Non-Operating Room Anesthesia (NORA).'
    ]
  }
};
