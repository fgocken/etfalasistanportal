import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior ve Lateral Orbitotomi: İntrakonal ve Ekstrakonal Orbita Tümörleri, Lakrimal Bez Lezyonları ve Dekompresyon Cerrahisi
 * (Orbitotomy—Anterior and Lateral: Intraconal/Extraconal Tumor Resection, Lacrimal Gland Excision and Lateral Wall Osteotomy)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth (2012),
 * ASRA 5th Ed. (2025) & PAUSE / ACCP (2022), POQI Blood Pressure Consensus (2019), Gan et al. 4th PONV Consensus (2020).
 */
export const orbitotomyAnteriorLateral: ProcedureDefinition = {
  id: 'orbitotomy-anterior-and-lateral',
  name: 'Anterior ve Lateral Orbitotomi: İntrakonal / Ekstrakonal Orbita Tümör ve Kitle Cerrahisi',
  shortCode: 'GOZ-ORBITOTOMI',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Orbita Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orbita boşluğundaki selim veya malign tümörlerin (kavernöz hemanjiyom, schwannom, optik sinir kılıf menenjiyomu, lakrimal bez tümörü, orbital lenfoma, dermoid kist), vasküler malformasyonların eksizyonu veya Graves orbitopatisinde distiroid optik nöropatiyi önlemek için orbita duvarlarının cerrahi açılması ameliyatıdır. İki ana yaklaşım kullanılır: (1) Anterior Orbitotomi: Glob ekvatoru önündeki ekstrakonal lezyonlara kemik kesisi olmadan transkonjonktival/kapak kıvrımı yaklaşımı; (2) Lateral Orbitotomi (Krönlein / Stallard-Wright): Retrobulber intrakonal ve lateral apeks kitleleri için zigomatik kemik ve sfenoid büyük kanadından osteotomi penceresi açılarak mikronöroşirürjikal rezeksiyon ve kemik pencerenin titanyum mikroplaklarla tespiti.',
  indications: [
    'Retrobulber / İntrakonal Selim Tümörler: Kavernöz hemanjiyom (erişkinde en sık), schwannom, soliter fibröz tümör',
    'Lakrimal Bez Tümörleri: Pleomorfik adenom, adenoid kistik karsinom veya tanısal biyopsi',
    'Optik Sinir / Kılıf Tümörleri: Menenjiyom, optik gliyom',
    'Orbital Maligniteler / Metastazlar (Lenfoma, rabdomyosarkom, meme/akciğer metastazı)',
    'Graves Orbitopatisi: Distiroid optik nöropati (DON) için orbita dekompresyonu (hasta kesinlikle ötiroid olmalıdır!)'
  ],
  averageDuration: '90 - 180 dakika (İzole anterior orbitotomi: 60-90 dk; Osteotomili lateral orbitotomi: 120-180 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 - 150 mL (Sistemik kayıp genellikle düşük-orta olsa da kapalı kemik orbitada birkaç mL kanama bile körlük yapan Orbital Kompartman Sendromu oluşturur)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Kapalı Kemik Kompartmanda Katastrofik Retrobulber Hematom Riski',
    crossMatchRequirement: 'Kan Grubu ve T&S (Geniş osteotomi, vasküler kitle/hemanjiyom veya pediatrik olgularda 1-2 Ünite ES Cross-Match)',
    transfusionProbability: '< %1 - 3 (Vasküler kitle veya pediatrik olgular hariç nadirdir)',
    criticalBleedingSources: [
      'Oftalmik Arter Dalları ve Derin İntrakonal Venöz Pleksuslar (optik sinir komşuluğu)',
      'Lateral Duvar Spongiyöz Kemik Osteotomi Kenarları (zigoma ve sfenoid)',
      'Lakrimal Arter ve Anterior/Posterior Etmoidal Arter Dalları',
      'Akut Retrobulber Hematom: Kapalı kemik orbitada basıncı 60-80 mmHg üzerine fırlatarak 60-90 dakikada kalıcı körlük yaratan acil kompartman sendromu'
    ],
    hemostasisStrategies: [
      'İntrakonal alanda yalnızca bipolar wet-field mikro-koter (monopolar koter optik sinir termal hasarı nedeniyle KESİN YASAK!)',
      'Kemik mumu (bone wax) ve hemostatik matriksler (Surgicel / Floseal)',
      'Optik sinir perfüzyonunu koruyan normotansif hemodinami (MAP bazalin −%20\'sinden aşağı düşürülmez, genelde 70-85 mmHg) + 20° Reverse Trendelenburg',
      'Akut Orbital Kompartman Sendromunda (<60-90 dk): Acil dikiş açma + lateral kantotomi / inferior kantolizis + 30° baş elevasyonu + IV Mannitol (1-2 g/kg) + IV Asetazolamid (500 mg)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA — Propofol + Remifentanil TIVA) + Spiralli Kaflı Tüp + Normotansif Optik Perfüzyon + Pürüzsüz Uyanık Ekstübasyon — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'KONTRENDİKASYON UYARISI: İğneli retrobulber/peribulber veya Sub-Tenon blokları intrakonal/lateral orbitotomide kitle/optik sinir delinmesi ve retrobulber hematom riski nedeniyle KESİNLİKLE UYGULANMAZ!',
      'Yalnızca çok yüzeyel, ön kapak kıvrımından yapılan küçük anterior biyopsilerde seçilmiş erişkinlerde lokal infiltrasyon + MAC (ASA OR Fire uyumlu) düşünülebilir.'
    ],
    clinicalRationale: 'Optik sinire milimetrik mesafede intrakonal disseksiyon, kemik osteotomi ve iğneli blokların kontrendike olması nedeniyle Propofol + Remifentanil TIVA ile GETA (en düşük PONV ve en pürüzsüz uyanma profiliyle) mutlak standarttır.',
    rulesTitle: 'ORBİTOTOMİDE (ANTERİOR VE LATERAL) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'Orbitotomide hayati kurallar: (1) Optik sinir perfüzyonu (OPP = MAP − GİB) — aşırı hipotansiyon yasağı ve İON koruması; (2) AKUT Derin Orbital / Retrobulber Hematom ve <60-90 dk acil OCS dekompresyon paketi (baskılı bandaj KESİN YASAK!); (3) Lateral rektus ve apeks traksiyonunda çok yüksek OCR riski; (4) Pürüzsüz uyanık ekstübasyon, çift PONV ve Tramadol/Kodein yasağı; (5) Kornea kalkanı ve sfenoid kanadı/tavan komşuluğunda BOS kaçağı alarmı.',
    indispensableRules: [
      {
        number: 1,
        title: 'OPTİK SİNİR PERFÜZYON GÜVENLİĞİ (OPP = MAP − GİB): AŞIRI HİPOTANSİYON YASAĞI!',
        content: 'İntrakonal tümör disseksiyonunda optik sinir ve santral retinal arter milimetrik komşuluktadır. Kanama azaltma bahanesiyle aşırı hipotansiyon (MAP <65 mmHg veya bazalin >%20 altı) + ekartör basısı İSKEMİK OPTİK NÖROPATİ (İON) ve KALICI KÖRLÜK yaratır! MAP bazal değere yakın normotansif sınırda (genellikle 70-85 mmHg, kronik hipertansifte ≥75-85 mmHg) korunur.'
      },
      {
        number: 2,
        title: 'AKUT DERİN ORBİTAL / RETROBULBER HEMATOM (OCS) ACİL PAKETİ VE BASKILI BANDAJ YASAĞI',
        content: 'Kemik pencere plaklarla kapatıldığında orbita rijit bir kapalı kompartmana dönüşür. Derlenme odasında ani şiddetli göz ağrısı, taş gibi sert proptozis, RAPD veya görme kaybı gelişirse altın pencere (<60-90 dk) içinde derhal: (1) Sütürlerin açılması + acil lateral kantotomi / inferior kantolizis / cerrahi drenaj, (2) 30° baş elevasyonu, (3) İV Mannitol (1-2 g/kg) ve (4) İV Asetazolamid (500 mg) uygulanır! GÖZE BASKILI BANDAJ KESİNLİKLE YAPILMAZ (proptozisi ve görme takibini maskeleyerek körlük yaratır!).'
      },
      {
        number: 3,
        title: 'LATERAL REKTUS VE ORBİTAL APEKS TRAKSİYONUNDA OKÜLOKARDİYAK REFLEKS (OCR)',
        content: 'Lateral rektus askısı ve orbita apeksi manipülasyonu şiddetli trigemino-vagal refleks (CN V₁ → CN X) ile ani derin bradikardi, AV blok veya asistoli tetikleyebilir. 1. adım cerrahı durdurmak, 2. adım normokapni/oksijenizasyon kontrolü, 3. adım düzelmezse İV Atropin 0.5 mg uygulamaktır (rutin profilaktik Atropin önerilmez).'
      },
      {
        number: 4,
        title: 'PÜRÜZSÜZ EKSTÜBASYON, ÇİFT PONV PROFİLAKSİSİ VE TRAMADOL / KODEİN YASAĞI',
        content: 'Ekstübasyonda öksürme/ıkınma veya postop kusma baş-boyun venöz basıncını fırlatarak kemik pencere altında retrobulber hematom oluşturur! Propofol TIVA + İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil + Sugammadeks (TOF ≥0.9) + çiftli PONV profilaksisi (Deksametazon + Ondansetron) uygulanır. Postop TRAMADOL ve KODEİN KULLANILMAZ!'
      },
      {
        number: 5,
        title: 'KORNEA KALKANI, SIFIR GLOB BASISI VE KAFA TABANI / BOS KAÇAĞI ALARMI',
        content: 'İnsizyon öncesi antibiyotikli pomad ile kornea kalkanı takılır ve sonunda çıkarıldığı teyit edilir. Sfenoid büyük kanadı ve orbita tavanı komşuluğunda dural yırtık ve BOS kaçağı (berrak sıvı) riski izlenir; Graves orbitopatisinde hasta operasyon öncesi kesinlikle ötiroid olmalıdır (tiroid fırtınası önlemi!).'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Orbita Konsültasyonu: Hertel proptozis ölçümü, görme keskinliği, renkli görme, RAPD ve oküler motilite.',
      'Nöroradyoloji: İnce kesit kontrastlı Orbita/Beyin MRG ve 3B kemik pencere Orbita BT (intrakraniyal / kavernöz sinüs uzanımı kontrolü).',
      'Beyin Cerrahisi (Kafa İçi Uzanım Varsa) & Endokrinoloji (Graves Orbitopatisinde Ötiroidi Teyidi: TSH, sT3, sT4).',
      'Kardiyoloji / Anestezi: Bazal KB profili, zor havayolu ve kapalı kompartman antitrombotik yönetimi.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan Yönetimi (ASRA 5th Ed. 2025, PAUSE & ACCP 2022 — Kapalı Kompartman Yüksek Kanama Riski): Eski "hepsini 5-7 gün kes ve köprüle" yaklaşımı YANLIŞTIR! Güncel protokol: DOAC\'lar (Apiksaban/Rivaroksaban/Edoksaban) 48 saat önce kesilir (Dabigatran CrCl <50 mL/dk ise 96 sa) ve RUTİN KÖPRÜLEME YAPILMAZ; Warfarin 5 gün önce kesilip INR <1.5 doğrulanır (köprüleme yalnızca mekanik mitral kapak/çok yüksek tromboembolik riskte); P2Y₁₂ inhibitörleri (Klopidogrel 5 gün, Tikagrelor 3-5 gün, Prasugrel 7 gün) ve Aspirin koroner stent riskine göre kardiyoloji+cerrahla bireyselleştirilir (bkz. #infografik=antithrombotic-matrix).',
      'Tiroid Fonksiyon Durumu (Graves), Sistemik Malignite ve Görme Kaybı Hızı.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit), Koagülasyon Paneli (PT/INR, aPTT), Böbrek Fonksiyonu (CrCl — DOAC yönetimi için!) ve Elektrolitler.',
      'Kan Grubu ve T&S (vasküler kitle/geniş osteotomide 1-2 Ünite ES Cross-Match).',
      'Graves Orbitopatisinde güncel TSH, sT3, sT4; kardiyovasküler endikasyonda 12 derivasyonlu EKG.',
      'Yüksek Çözünürlüklü Orbita BT / MRG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (OCR bradikardi/asistoli izlemi), SpO₂, EtCO₂ ve Sıcaklık.',
      'İnvaziv Arter Basıncı (Radial Arter Kanülasyonu — özellikle lateral osteotomi/intrakonal/vasküler kitlelerde): Optik sinir perfüzyonu için MAP 70-85 mmHg (bazal −%20 tabanı) anlık takip edilir.',
      'Kantitatif Nöromusküler Monitörizasyon (TOF): Osteotomi ve optik sinir diseksiyonunda TOF 0/4; ekstübasyonda TOF ≥0.9.',
      'EtCO₂ Kontrolü: Sıkı normokapni (EtCO₂ 35-38 mmHg).'
    ],
    vascularAccess: [
      '2 adet geniş lümenli periferik IV damar yolu (16-18G) + seçilmiş lateral orbitotomide 20G Radial Arter Hattı.',
      'Acil İlaçlar Hazır: İV Atropin (0.5 mg), Esmolol/Labetalol, İV Mannitol (%20) ve İV Asetazolamid (500 mg).'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, 20° Reverse Trendelenburg ve Sabit Baş',
    patientPositionDetails: [
      'Baş silikon donut (veya kraniyofasiyal kombine vakada Mayfield) ile 10-15° karşı tarafa çevrilerek sabitlenir; jugüler bası sıfırdır.',
      '20° Reverse Trendelenburg eğimi orbital venöz basıncı düşürür.',
      'Kornea kalkanı (Corneal Shield) takılır; spiralli ETT ve uzatma hatları cerrahi sahanın karşı tarafına güvenle sabitlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - Propofol (1.5-2.5 mg/kg) + Remifentanil (0.1-0.2 mcg/kg/dk) + İV Lidokain (1.5 mg/kg) + Rokuronyum (0.6 mg/kg).',
      '  - Spiralli kaflı ETT ile atravmatik entübasyon.',
      'İdame ve Optik Perfüzyon Hedefi:',
      '  - Propofol + Remifentanil TIVA (en düşük PONV riski, en sakin uyanma!).',
      '  - HEDEF: MAP bazalin %20 altına düşürülmez (genellikle 70-85 mmHg; hipertansifte ≥75-85 mmHg). Aşırı hipotansiyon (MAP <65) İON riski nedeniyle KESİN YASAK!',
      '  - Sıkı normokapni (EtCO₂ 35-38 mmHg) ve tümör/apeks manipülasyonunda OCR takibi.',
      '  - İntrakonal alanda monopolar koter YASAK; yalnızca bipolar mikro-koter ve kemik mumu kullanılır.'
    ],
    airwayManagement: [
      'Spiralli (zırhlı) kaflı endotrakeal tüp baş pozisyonuna ve cerrahi örtü basısına karşı bükülmez.',
      'Ekstübasyon öncesi öksürüğü ve hipertansiyon pikini sıfırlayan pürüzsüz uyanma planlanır.'
    ],
    criticalSurgicalStages: [
      '1. Taraf Doğrulaması, 20° Ters Trendelenburg ve Sulu %5 Povidon-İyot + Kornea Kalkanı.',
      '2. Cilt İnsizyonu ve Temporalis/Periorbita Sıyrılması.',
      '3. Lateral Duvar Kemik Osteotomisi (Zigoma/sfenoid — mikrotur soğutması ve hareketsizlik!).',
      '4. Periorbita Açılması ve Retrobulber İntrakonal Boşluğa Giriş.',
      '5. Lateral Rektus Askısı ve Tümör Disseksiyonu (EN YÜKSEK OCR VE OPTİK SİNİR RİSKİ!).',
      '6. Derin Orbital Bipolar Hemostaz, Kemik Mumu ve Titanyum Mikroplaklarla Kemik Pencere Tespiti.',
      '7. Kornea Kalkanının Çıkarılma Teyidi, Kapanış ve BASKISIZ Şeffaf Koruyucu Kalkan.'
    ],
    emergenceNotes: [
      'Pürüzsüz Uyanık Ekstübasyon: İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil (0.03-0.05 mcg/kg/dk) + Sugammadeks (TOF ≥0.9) ile sıfır öksürük/ıkınma/hipertansiyon sağlanır.',
      'Çiftli PONV Profilaksisi: İV Deksametazon (4-8 mg) + Ondansetron (4 mg) eksiksiz uygulanır.',
      'GÖZE BASKILI BANDAJ KESİNLİKLE YAPILMAZ! Gelişebilecek retrobulber hematomun erken tanınması için görme ve pupil muayenesine izin veren şeffaf/gevşek koruma uygulanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Osteotomi ve temporalis diseksiyonu nedeniyle orta-şiddetli periorbital/baş ağrısı görülebilir.',
      'Temel Analjezi: Düzenli İV/Oral Parasetamol (1000 mg 6 saatte bir) + aralıklı soğuk kompres.',
      'KAÇINILACAK AJANLAR: TRAMADOL ve KODEİN yüksek PONV riskiyle kapalı kemik orbitada retrobulber hematomu tetikleyebileceğinden rutin analjezide KULLANILMAZ! Erken dönemde agresif antiplatelet NSAİİ ve aspirinden kaçınılır.',
      'Şiddetli Kurtarma Ağrısı: Önce mutlaka AKUT RETROBULBER HEMATOM / OCS (proptozis, görme kaybı, RAPD) dışlanır! Ardından mikro-doz titre İV Fentanil (25 mcg) + ek antiemetik verilir.'
    ],
    prospectRecommendations: [
      'Orbita cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; 4th PONV Consensus (2020) ilkeleri doğrultusunda:',
      '  - Propofol TIVA + ikili antiemetik profilaksisi + Parasetamol bazlı multimodal analjezi ile öğürme/kusma ve buna bağlı orbital venöz basınç artışı önlenir.'
    ],
    erasRecommendations: [
      'Postoperatif Orbita Cerrahisi Güvenlik Protokolü:',
      '  - 24-48 Saat Yakın Gözlem: İlk 24 saat boyunca saatlik görme keskinliği (parmak sayma/ışık hissi), pupil refleksi (RAPD) ve proptozis/gerginlik takibi zorunludur.',
      '  - Baş 30-45° Elevasyonu: Orbital venöz göllenmeyi ve ödemi azaltır.',
      '  - Valsalva Önlemleri: Öksürük baskılanması ve laksatif desteği ile ıkınma engellenir; başucu acil kantotomi seti ulaşılabilir tutulur.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Orbitotomy (Anterior and Lateral). Wolters Kluwer / LWW.',
    erasReference: 'Kopp SL, Vandermeulen E, et al. ASRA Pain Medicine Evidence-Based Guidelines (5th ed.). Reg Anesth Pain Med. 2025 & Douketis JD, et al. ACCP Perioperative Management of Antithrombotic Therapy (2022) / PAUSE Study (2019).',
    prospectReference: 'Orbita cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve PONV yaklaşımı 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'Sessler DI, Bloomstone JA, Aronson S, et al. Perioperative Quality Initiative consensus statement on intraoperative blood pressure, risk and outcomes for elective surgery. Br J Anaesth. 2019;122(5):563-574.',
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.',
      'Muralidhar P, et al. Orbital Compartment Syndrome: Recognition and Emergency Lateral Canthotomy and Cantholysis (Clinical Review).',
      'Kietaibl S, Ferrandis R, Godier A, et al. Regional anaesthesia in patients on antithrombotic drugs: Joint ESAIC/ESRA guidelines. Eur J Anaesthesiol. 2022;39(2):100-132.'
    ]
  }
};
