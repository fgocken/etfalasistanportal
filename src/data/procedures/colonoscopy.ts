import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kolonoskopi (Alt GİS Endoskopi & Polipektomi)
 * 
 * Jaffe (5th ed.), ASGE / ASA Sedation Guidelines, ESGE Consensus 
 * ve ERAS NORA prensipleri referans alınarak yapılandırılmıştır.
 */
export const colonoscopy: ProcedureDefinition = {
  id: 'colonoscopy',
  name: 'Kolonoskopi (Alt GİS Endoskopi & Polipektomi)',
  shortCode: 'KOLONOSKOPİ',
  specialty: 'gastroenteroloji',
  specialtyName: 'Gastroenteroloji',
  categoryTag: 'Girişimsel Endoskopi & NORA',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Esnek video kolonoskop yardımıyla anüsten girilerek rektum, sigmoid kolon, inen kolon, splenik fleksura, transvers kolon, hepatik fleksura, çıkan kolon, çekum ve terminal ileum lümeninin doğrudan incelenmesi; doku biyopsisi alınması, polipektomi, mukozal rezeksiyon (EMR), kanama kontrolü ve darlık dilatasyonu uygulanması işlemidir.',
  indications: [
    'Kolorektal kanser taraması ve adenomatöz polip sürveyansı',
    'Polip rezeksiyonu (polipektomi / endoskopik mukozal rezeksiyon - EMR)',
    'Rektal kanama, hematokezya veya gaitada gizli kan pozitifliği',
    'Açıklanamayan demir eksikliği anemisi ve kronik kilo kaybı',
    'İnflamatuar barsak hastalıklarının (Ülseratif Kolit, Crohn Hastalığı) tanı, yaygınlık ve remisyon takibi',
    'Dışkılama alışkanlığında açıklanamayan persistan değişiklikler (kronik ishal veya kabızlık)'
  ],
  averageDuration: '20 - 45 dakika (Tanısal Kolonoskopi: 20-30 dk; Polipektomi / EMR / Hemostaz: 30-60 dk)',

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Monitored Anesthesia Care (MAC) / Derin Sedasyon: Propofol bazlı titre edilen sedasyon + analjezik adjuvan (Fentanil veya Ketamin / "Ketofol") eşliğinde spontan solunumun korunması — Altın Standart'
    ],
    alternative: [
      'Orta Düzey Sedasyon (Bilinçli Sedasyon): Titre edilmiş Midazolam + Fentanil kombinasyonu',
      'Genel Anestezi (Endotrakeal Entübasyonlu): İleri derecede ajite, kooperasyon kurulamayan, masif kolon dilatasyonu/toksik megakolon riski taşıyan veya şiddetli kardiyopulmoner komorbiditesi olan seçilmiş olgularda'
    ],
    notes: 'Kolonoskopide temel anestezik zorluk; splenik ve hepatik fleksuraların geçişi esnasında kolonun gerilmesi ve mezenterik traksiyonun oluşturduğu şiddetli viseral ağrı ile vagal stimülasyondur. Propofol tek başına hipnotik olup analjezik etkisi bulunmadığından; fentanil veya ketamin kombinasyonu hasta konforu, sedasyon stabilitesi ve vagal reflekslerin önlenmesi için esastır.'
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Kardiyoloji Konsültasyonu: Yaşlı ve kardiyak komorbiditesi olan hastalarda, kolon temizlik lavajlarının (polietilen glikol / sodyum fosfat) oluşturduğu dehidratasyon, hipovolemi ve elektrolit kayıplarının kompanzasyonu için.',
      'Hematoloji Konsültasyonu: Polipektomi planlanan ve antikoagülan/antiagregan (Varfarin, DOAK/NOAK, Klopidogrel vb.) kullanan hastalarda ilacın kesilme süreleri ve köprüleme tedavisi ESGE/ASGE kılavuzlarına göre belirlenmelidir.',
      'Göğüs Hastalıkları: Ciddi Obstrüktif Uyku Apnesi (OUA) veya KOAH öyküsü olan hastalarda sedasyon derinliğine bağlı havayolu kollapsı riski değerlendirilmelidir.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Kolon Temizliği ve Dehidratasyon Değerlendirmesi: Oral laksatif solüsyonlara bağlı hipovolemi bulguları (ortostatik hipotansiyon, kuru müköz membranlar, oligüri ve taşikardi) sorgulanmalıdır.',
      'Geçirilmiş Pelvik ve Abdominal Cerrahiler: Histerektomi, sezaryen veya apendektomi öyküsü olan hastalarda pelvik adezyonlar kolonoskop geçişini zorlaştırır ve mezenterik traksiyon ağrısını artırır.',
      'Açlık Süresi: Berrak sıvılar işlemden 2 saat öncesine kadar alınabilir; ancak kolon lavajı sonrası sedasyon indüksiyonunda gastrik içeriğin reflü olma ihtimaline karşı aspiratör hazır tutulmalıdır.',
      'Zor Havayolu Parametreleri: Mallampati, boyun çevresi ve çene yapısı incelenmelidir.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Serum Elektrolitleri (Na, K, Cl, Ca, Mg) ve Böbrek Fonksiyonları (BUN, Kreatinin): Agresif barsak hazırlığı sonrası HİPOKALEMİ ve hiponatremi sıktır; kardiyak aritmileri önlemek için potasyum düzeyi işlem öncesi kontrol edilmelidir.',
      'Tam Kan Sayımı (Hemogram): Anemi taraması; polipektomi planlanan olgularda trombosit sayısı (>50.000/mcL güvenli kabul edilir).',
      'Koagülasyon Paneli (PT, aPTT, INR): Polipektomi ve biyopsi için INR < 1.5 olmalıdır.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (DII ve V5 derivasyonları), Nabız Oksimetresi (SpO2), Non-invaziv Kan Basıncı (NIBP 3-5 dakika aralıklarla), Isı.',
      'Sürekli Kapnografi (EtCO2 - Mikroakım / Microstream Nazal Örnekleme Kanülü) — Zorunlu: Derin sedasyonda solunum depresyonu ve apneyi periferik oksijen satürasyonu (SpO2) düşmeden dakikalar önce tespit etmek için esastır (ASA ve ASGE standartı).',
      'Sedasyon Derinliği İzlemi: MOAA/S skoru ile amaca uygun sedasyon seviyesinin takibi.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az 1 adet güvenli periferik venöz kateter (20G veya 18G) — Tercihen SAĞ koldan açılmalıdır (hasta sol lateral yattığı için sağ kol üstte ve ekibe kesintisiz açıktır).'
    ],
    // 4c) Hasta pozisyonu & fizyolojik güvenlik önlemleri
    patientPosition: 'Sol Lateral Dekübit (Left Lateral Decubitus) Pozisyonu — Altın Standart.',
    patientPositionDetails: [
      'Dizler göğse doğru hafif bükülerek sfinkter gevşemesi ve rektal aksa uyum sağlanır.',
      'Splenik ve hepatik fleksuraların geçişinde veya transvers kolon manipulasyonunda cerrahın talebiyle hasta geçici olarak Sırtüstü (Supine) pozisyona çevrilebilir.',
      'Karın Duvarına Harici Manuel Bası: Kolonoskopun lümeni katlamasını (looping) önlemek için asistan tarafından karın duvarına dışarıdan manuel bası uygulanabilir.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'Propofol Bazlı Titre Edilen Sedasyon: İndüksiyon bolus 0.5–1.0 mg/kg IV yavaşça verilir, ardından ihtiyaca göre 10-20 mg aralıklı ek boluslar veya 50–75 mcg/kg/dk sürekli infüzyonla idame ettirilir.',
      'Analjezik Adjuvan Stratejisi (Esastır): Mezenterik traksiyon ağrısını önlemek için işlem başında Fentanil (25–50 mcg IV) veya Ketamin (10–20 mg IV "Ketofol") eklenmelidir; bu kombinasyon toplam propofol tüketimini ve apne riskini azaltır.',
      'Spazmolitik İlaçlar: Kolon spazmını ve lümen katlantılarını çözmek için gastroenteroloğun talebiyle Butilskopolamin (Buscopan 20 mg IV) veya Glukagon (0.5–1 mg IV) uygulanabilir (taşikardi ve dar açılı glokomda kontrendikedir).',
      'Sıvı Tedavisi: Kolon hazırlığına bağlı dehidrate hastalarda sedasyon vazodilatasyonunu kompanse etmek için 250–500 mL dengeli kristalloid infüzyonu.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Oksijen Desteği: Kapnografi portlu nazal kanül üzerinden 2–4 L/dk O2 verilir.',
      'Çene İtme / Çene Kaldırma (Jaw-Thrust) Manevrası: Derin sedasyonda farengeal kasların gevşemesiyle dil kökü geriye düşebilir; anestezi teknikeri/hekimi işlem boyunca çene desteği sağlamalıdır.',
      'Nazofaringeal Airway (NPA): Obstrüksiyon gelişirse iyi kayganlaştırılmış nazofaringeal tüp havayolunu anında açar.',
      'Acil Havayolu Kurtarma Kiti Masada Hazır: Aspiratör, Ambu maske ve acil entübasyon seti.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Splenik ve Hepatik Fleksura Dönüşleri (Mezenterik Traksiyon): En şiddetli viseral uyarının olduğu ve ŞİDDETLİ VAGAL STİMÜLASYON (ani derin bradikardi, hipotansiyon ve asistoli) riskinin en yüksek olduğu andır. Vagal yanıtta skop manipülasyonu anında durdurulur, gerekirse Atropin (0.5 mg IV) uygulanır.',
      'Lümen İnsüflasyonu (Hava / CO2 Distansiyonu): Aşırı gaz insüflasyonu diyafram elevasyonuna ve torasik kompliyans azalmasına yol açar. Güncel kılavuzlar oda havası yerine hızla emilen Medikal Karbondioksit (CO2) insüflasyonunu önermektedir.',
      'Kolon Perforasyonu Riski: Özellikle divertikülit zemininde, polipektomide veya zor fleksura geçişinde ani karın distansiyonu, taşikardi veya hipotansiyon ile belirti verir; işlem sonlandırılır ve cerrahi konsültasyon istenir.',
      'Çekuma Ulaşılması ve Geri Çekilme (Withdrawal) Aşaması: Kolonoskop çekuma ulaştıktan sonra geri çekilirken nosiseptif uyarı azalır; sedasyon dozu bu aşamada azaltılmalıdır.'
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
      'Post-kolonoskopi ağrısının en yaygın nedeni lümene verilen gazın oluşturduğu distansiyon ve kramp tarzı spazmlardır (hafif-orta şiddettedir).',
      'Gaz Çıkarma ve Erken Mobilizasyon: Hastanın yürütülmesi ve gaz çıkarmasının teşvik edilmesi temel rahatlama yöntemidir (CO2 kullanılmışsa gaz çok daha hızlı emilir ve ağrı neredeyse hiç oluşmaz).',
      'Sistemik Hafif Analjezi: Gerekli olgularda oral veya IV Parasetamol (500 mg - 1 g) yeterlidir.',
      'Spazmolitik Tedavi: Şiddetli kramplarda Butilskopolamin (Buscopan) eklenebilir. Rutin güçlü opioid kullanımından kaçınılmalıdır.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Medikal Karbondioksit (CO2) İnsüflasyonu: İşlem esnasında oda havası yerine CO2 gazı kullanılması, işlem sonrası karın ağrısı, distansiyon ve gaz şikayetlerini en yüksek kanıt düzeyiyle azaltan yöntemdir.',
      'Sedasyon Derinliğinin Titrasyonu: Hasta konforunu sağlarken solunum depresyonunu önlemek için sedasyonun minimum etkili dozda titre edilmesi.',
      'Rutin Aşırı Opioid Yüklemesinden Kaçınma: Postoperatif sedasyon süresini uzatmamak, bulantıyı önlemek ve taburculuğu geciktirmemek için opioid dozu sınırlandırılmalıdır.',
      'Multimodal Hafif Analjezi: Ağrı gelişirse parasetamol ve antispazmodik ajanlar önceliklidir.'
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
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section XVII: Nonoperating Room Anesthesia (NORA) - Colonoscopy, pp. 1425–1428. Lippincott Williams & Wilkins.",
    erasReference: 'Enhanced Recovery After Surgery (ERAS®) Society Principles for Ambulatory and Non-Operating Room Interventional Procedures (NORA).',
    prospectReference: 'PROSPECT Guidelines & ESGE / ASGE Consensus: Evidence-based pain and sedation management in colonoscopy.',
    otherReferences: [
      'ASGE / ASA Consensus Guidelines: Guidelines for Sedation and Anesthesia in Gastrointestinal Endoscopy. Gastrointestinal Endoscopy journal.',
      'ESGE (European Society of Gastrointestinal Endoscopy) Guideline: Non-anesthesiologist and anesthesiologist-administered sedation for GI endoscopy.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 82: Non-Operating Room Anesthesia (NORA).'
    ]
  }
};
