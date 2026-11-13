import { ProcedureDefinition } from '../../types/procedures';

/**
 * Pilot Prosedür: Laparoskopik Kolesistektomi
 * 
 * Jaffe (5th ed.), ERAS Society Laparoscopic Cholecystectomy Guidelines 
 * ve PROSPECT Recommendations referans alınarak yapılandırılmıştır.
 */
export const laparoscopicCholecystectomy: ProcedureDefinition = {
  id: 'lap-chole',
  name: 'Laparoskopik Kolesistektomi',
  shortCode: 'LAP-KOLE',
  specialty: 'genel_cerrahi',
  specialtyName: 'Genel Cerrahi',
  categoryTag: 'Laparoskopik Minimal İnvaziv Cerrahi',
  
  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Karbondioksit (CO2) insüflasyonu ile oluşturulan pnömoperiton yardımıyla karın içinde sağlanan video-endoskopik çalışma alanında, milimetrik trokar girişleri aracılığıyla sistik kanal ve sistik arterin kliplenip kesilmesi ve safra kesesinin karaciğer yatağından (sistik plak) minimal invaziv yöntemle diseke edilerek vücut dışına çıkarılması işlemidir.',
  indications: [
    'Semptomatik Kolelitiyazis (Safra kesesi taşları)',
    'Akut veya Kronik Kolesistit',
    'Biliyer Kolik atakları',
    'Safra Kesesi Polipleri (>10 mm veya semptomatik/büyüyen)',
    'Biliyer Diskinezi / Asemptomatik porselen kese'
  ],
  averageDuration: '45 - 90 dakika (Komplike olmayan elektif vaka: ~60 dk; Akut gangrenöz kolesistit/adezyon: 90-120 dk)',

  // Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 mL (Elektif vakalarda genellikle 20–50 mL arası ihmal edilebilir; akut flegmonöz/gangrenöz kolesistitte 100–200 mL)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Risk (< 100 mL)',
    crossMatchRequirement: 'Rutin Cross-Match gerekmez. Kan Grubu ve Tip-Tarama (Type & Screen) yeterlidir (Akut gangrenöz kolesistit veya açık konversiyon riski yüksek olgularda 1-2 ünite ES rezerve edilir)',
    transfusionProbability: '< %1 (Çok Düşük)',
    criticalBleedingSources: [
      'Sistik arter yaralanması veya klips kayması/avülsiyonu',
      'Karaciğer yatağı (gallbladder fossa) parankimal kanaması',
      'Calot üçgeninde aberan sağ hepatik arter yaralanması',
      'İlk trokar girişi (kör Veress iğnesi veya trokar) sırasında inferior epigastrik arter veya majör retroperitoneal damar (aort, v. kava) yaralanması'
    ],
    hemostasisStrategies: [
      'Bipolar veya monopolar titiz koterizasyon ve titanyum/polimerik klipsleme',
      'Karaciğer parankim yatağına topikal hemostatik ajanlar (oksitlenmiş rejenere selüloz, jelatin matriks)',
      'Kontrolsüz Calot kanamalarında kör klemplemeden kaçınma (ortak safra kanalı yaralanmasını önlemek için) ve ivedilikle açığa geçiş (açık konversiyon) hazırlığı'
    ]
  },
  anesthesiaTechniques: {
    primary: [
      'Genel Anestezi (Endotrakeal Entübasyonlu) — Altın Standart'
    ],
    alternative: [
      'Seçilmiş yüksek riskli (ciddi KOAH, kardiyak kısıtlılık vb.) hastalarda düşük basınçlı (8–10 mmHg) pnömoperitoneum eşliğinde Spinal / Epidural Anestezi (Literatürde bildirilmiş ancak diyafram irritasyonu ve omuz ağrısı nedeniyle rutin tercih edilmez)'
    ],
    notes: 'Pnömoperitoneum oluşturulması, diyafram elevasyonu ve intraabdominal basınç artışı nedeniyle hava yolu güvenliği ve kontrollü mekanik ventilasyon için endotrakeal entübasyonla genel anestezi şarttır. LMA rutin önerilmez (aspirasyon riski ve yüksek tepe inspiratuar basınç ihtiyacı nedeniyle).',
    rulesTitle: 'LAPAROSKOPİK KOLESİSTEKTOMİDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'CO2 PNÖMOPERİTONEUM BASINCI VE KARDİYOVASKÜLER STABİLİTE',
        content: 'İntraabdominal basınç (İAB) ideal olarak 12-15 mmHg sınırında tutulmalıdır (>15 mmHg vena kava inferior basısıyla venöz dönüşü ve kalp debisini %20-30 düşürür, SVR artar). İnsüflasyon yavaş başlatılmalı (≤ 2 L/dk); Ters Trendelenburg pozisyonu öncesi yeterli önyük (hidrasyon) sağlanmalıdır.'
      },
      {
        number: 2,
        title: 'TROKAR GİRİŞİ, VAGAL BRADİKARDİ VE DAMAR / GAZ EMBOLİSİ TEYAKKUZU',
        content: 'İlk kör trokar / Veress iğnesi girişinde ani peritoneal gerilmeye bağlı derin vagal bradikardi veya asistoli gelişebilir; Atropin (0.5 mg IV) hazır tutulmalı ve cerraha derhal insüflasyonu durdurması söylenmelidir. İnsüflasyon başlangıcında ani EtCO2 düşüşü ve hipotansiyon gelişirse CO2 gaz embolisi veya retroperitoneal majör damar yaralanması düşünülmelidir.'
      },
      {
        number: 3,
        title: 'HİPERKAPNİ VE AKCİĞER KORUYUCU MEKANİK VENTİLASYON',
        content: 'Peritondan emilen CO2 ve diyaframın sefale itilmesiyle FRC düşer, pik hava yolu basınçları artar. Normokapniyi (EtCO2 35-40 mmHg) korumak için tidal volüm (PBW\'ye göre 6-8 mL/kg) yerine dakika ventilasyonu solunum sayısı artırılarak sağlanmalı; atelektaziyi önlemek için 5-8 cmH2O PEEP ve derin cerrahi relaksasyon (TOF 0-1) uygulanmalıdır.'
      },
      {
        number: 4,
        title: 'YÜKSEK PONV RİSKİNE KARŞI İKİLİ PROFİLAKSİ VE MULTİMODAL ANALJEZİ',
        content: 'Laparoskopik cerrahi yüksek postoperatif bulantı-kusma (PONV) riski taşır; indüksiyonda Deksametazon (4-8 mg IV) + kapanışta Ondansetron (4 mg IV) ikili profilaksisi standarttır. Diyafragmatik sağ omuz yansıma ağrısını ve opioid ihtiyacını azaltmak için kapanışta rezidüel CO2 tamamen boşaltılmalı, trokar yerlerine lokal anestezik veya Subkostal TAP/ESP bloğu uygulanmalıdır.'
      }
    ]
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Gastroenteroloji / ERCP Konsültasyonu: Koledokolitiyazis şüphesi, son dönem kolanjit öyküsü veya biliyer pankreatit atağı geçiren hastalarda preop ERCP gerekliliği ve zamanlaması netleştirilmelidir.',
      'Kardiyoloji Konsültasyonu: Özellikle yaşlı ve komorbid hastalarda, pnömoperitoneum ve Ters Trendelenburg pozisyonunun hemodinamik yükü (SVR artışı, CO dalgalanması) göz önüne alınarak MACE riski değerlendirilmelidir.',
      'Göğüs Hastalıkları Konsültasyonu: İleri evre KOAH veya restriktif akciğer hastalığı olanlarda CO2 retansiyonu ve atelektazi risk analizi yapılmalıdır.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Geçirilmiş üst batın cerrahisi öyküsü (omental ve visseral yapışıklık, açık cerrahiye dönme ve trokar girişinde vasküler/barsak yaralanması riskini artırır).',
      'Akut kolanjit belirtileri (Charcot triadı: ateş, sarılık, sağ üst kadran ağrısı) ve sepsis bulguları sorgulanmalıdır.',
      'GÖR / Reflü öyküsü ve obezite varlığı (aspirasyon riski artışı).',
      'Antikoagülan / Antiagregan kullanımı: Elektif vakalarda kesilme/köprüleme süreleri kontrol edilmelidir.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Karaciğer Fonksiyon Testleri (AST, ALT, Total/Direkt Bilirubin, ALP, GGT): Koledok taşı veya biliyer obstrüksiyon taraması.',
      'Serum Amilaz ve Lipaz: Biliyer pankreatit ekarte edilmesi için.',
      'Tam Kan Sayımı (Hemogram): Lökositoz (akut kolesistit/flegmon) ve anemi kontrolü.',
      'Koagülasyon Paneli (PT, aPTT, INR): Karaciğer disfonksiyonu veya kolesistit zemininde pıhtılaşma bozukluğu dışlanmalıdır.',
      'Kan Grubu ve Antikor Tarama (T&S): Kanama riski düşük kabul edilmekle birlikte, akut olgularda ve yapışıklıklarda kan grubu hazır bulundurulmalıdır.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (DII ve V5 derivasyonları), Non-invaziv Kan Basıncı (NIBP), Nabız Oksimetresi (SpO2), Kapnografi (EtCO2), Vücut Sıcaklığı.',
      'Sürekli EtCO2 Takibi (Zorunlu): İntraperitoneal CO2 insüflasyonu absorbsiyonu sonucu hiperkarbi gelişiminin tespiti için hayati önem taşır.',
      'Havayolu Basınç Monitörizasyonu: Tepe inspiratuar basınç (Ppeak) ve plato basıncı pnömoperitoneum ve pozisyon sonrası yakından izlenmelidir.',
      'İnvaziv Arter Basıncı (Gerektiğinde): Şiddetli kardiyak veya solunumsal komorbiditesi olan hastalarda anlık hemodinamik titrasyon ve arteriyel kan gazı takibi için planlanabilir.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az 1 adet geniş lümenli periferik venöz kateter (18G veya 16G yeşil/gri intraket). Üst ekstremiteden (tercihen sol kol) açılması tercih edilir (sağ kol cerrahi manevralar nedeniyle gövdeye bitişik tespit edilebilir).',
      'Vasküler yaralanma riski (iliak damarlar, vena kava, aort - ilk trokar girişi anında) göz önünde bulundurularak hızlı sıvı resüsitasyonuna hazır olunmalıdır.'
    ],
    // 4c) Hasta pozisyonu
    patientPosition: 'Ters Trendelenburg (Reverse Trendelenburg, 15-20° baş yukarı) + Sol Lateral Tilt (10-15° sola eğim).',
    patientPositionDetails: [
      'Karaciğer ve safra kesesinin daha iyi ekspoze olması, omentum ve barsakların yerçekimiyle pelvise doğru yer değiştirmesi sağlanır.',
      'Ayak desteği (footboard) ve lateral destekler emniyetle takılmalı, hastanın masadan kayması önlenmelidir.',
      'Bası noktaları, brakial pleksus ve peroneal sinir basılarına karşı özenle desteklenmelidir.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'İndüksiyon: Propofol + Fentanil/Remifentanil + Nöromusküler Blokör (Rokuronyum/Vekuronyum).',
      'Derin Nöromusküler Blokaj: Düşük basınçlı pnömoperitoneum (10-12 mmHg) altında yeterli cerrahi görüş sağlamak ve intraabdominal basınç artışının olumsuz hemodinamik/solunumsal etkilerini minimize etmek için derin blok önerilir (TOF takibi ile).',
      'İdame: Sevofluran/Desfluran veya TIVA (Propofol + Remifentanil infüzyonu). TIVA, ERAS protokollerinde postoperatif bulantı-kusmayı (PONV) azaltmada güçlü bir tercihtir.',
      'Sıvı Stratejisi: Restriktif / Övolemik sıvı yönetimi (doku ödemini ve barsak distansiyonunu önlemek için dengeli elektrolit solüsyonu 1-3 mL/kg/saat).',
      'Nazogastrik / Orogastrik Sonda: Mide dekompresyonu sağlamak, trokar girişi sırasında mide perforasyon riskini önlemek ve cerrahi görüşü genişletmek için indüksiyon sonrası OG tüp takılıp aspire edilmeli, ekstübasyon öncesi çıkarılmalıdır.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Endotrakeal Kaflı Tüp (ETT): Oral kaflı entübasyon zorunludur.',
      'Pozisyonel ve Pnömoperitoneum Değişiklikleri: Pnömoperitoneum oluşturulup Ters Trendelenburg pozisyonu verildiğinde karina kraniale yer değiştirebilir; tüpün sağ ana bronşa kayma riski kontrol edilmeli, bilateral solunum sesleri insüflasyon sonrası tekrar oskülte edilmelidir.',
      'Akciğer Koruyucu Ventilasyon: Tidal volüm 6–8 mL/kg (PBW/öngörülen ağırlık), PEEP 5–8 cmH2O, frekans EtCO2 35–40 mmHg aralığında tutulacak şekilde ayarlanmalıdır.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'İlk Trokar Girişi (Veress İğnesi / Hasson Tekniği): Aort, vena kava veya mezenterik ana damar laserasyonu riski. Ani hipotansiyon, taşikardi veya bradikardi gelişirse anında cerraha haber verilmeli ve açık cerrahiye dönüş planlanmalıdır.',
      'CO2 İnsüflasyonu Başlangıcı: Ani peritoneal distansiyon vagal stimülasyona ve ciddi bradikardi/asistoliye yol açabilir. İnsüflasyon hızı yavaş başlatılmalı (1 L/dk), gerekirse atropin/glikopirolat hazır bulundurulmalıdır.',
      'Gaz Embolisi Riski: Nadir fakat hayatı tehdit eden bir komplikasyondur. Belirtileri: ani EtCO2 düşüşü, derin hipotansiyon, hipoksi, sağ kalp yüklenmesi ve değirmen çarkı (mill-wheel) üfürümü. Eylem: İnsüflasyon anında durdurulur, %100 O2, sol lateral dekübit + Trendelenburg (Durant manevrası).',
      'Calot Üçgeni Disseksiyonu ve Kistik Arter Kliplenmesi: Sağ hepatik arter veya kistik arter kanama riski. Kanama kontrolü için aspirasyon ve hemostaz adımları.',
      'Safra Kesesi Yatağından Ayrılması: Karaciğer parankim kanaması riski.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'CO2 Desüflasyonu: Cerrahi sonunda trokarlar açık bırakılarak ve batına hafif manuel bası yapılarak rezidüel CO2 gazı tamamen boşaltılmalıdır (postoperatif diyafram irritasyonu ve omuz ağrısını dramatik azaltır).',
      'Nöromusküler Blokajın Geri Döndürülmesi: TOF oranı > 0.9 olmadan hasta ekstübe edilmemelidir. Derin blokajda Sugammadeks (2-4 mg/kg), yüzeyel blokta Neostigmin + Atropin tercih edilir.',
      'PONV Profilaksisi: Çiftli veya üçlü antiemetik profilaksisi (Deksametazon 4-8 mg indüksiyonda + Ondansetron 4 mg cerrahi bitiminde 30 dk önce).',
      'Uyanık ve Normotermik Ekstübasyon: Sekresyonlar aspire edilmiş, spontan solunumu ve havayolu koruyucu refleksleri tam dönmüş hastada ekstübasyon.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Multimodal Analjezi Yaklaşımı (Opioid Koruyucu Strateji).',
      'İntraoperatif Trokar Giriş Yerlerine Lokal Anestezik İnfiltrasyonu (Bupivakain %0.25 veya Levobupivakain %0.25, cerrah tarafından insizyon öncesi veya kapanışta).',
      'Rejyonel Analjezi Teknikleri: Bilateral Subkostal TAP Bloğu (Transversus Abdominis Plane) veya Erektör Spina Plan (ESP) Bloğu (T7-T8 seviyesi) mükemmel somatik analjezi sağlar.',
      'İntravenöz Parasetamol (1 g IV her 6 saatte bir) + NSAİİ (ör. İntravenöz Ketorolak 15-30 mg veya Deksaketoprofen 50 mg - renal kontrendikasyon yoksa).',
      'Kurtarıcı Opioid: Şiddetli atılım ağrılarında titre edilmiş düşük doz Tramadol (50 mg) veya Fentanil (25-50 mcg).'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Rutin Pre/İntraoperatif Sistemik Analjezi: Parasetamol ve NSAİİ / COX-2 inhibitörlerinin operasyon başlangıcında veya öncesinde kombinasyonu güçlü önerilir.',
      'Deksametazon: Hem analjezik etkinliği artırmak hem de PONV profilaksisi sağlamak için IV 4–8 mg uygulanmalıdır.',
      'Port Giriş Yeri Lokal Anestezik İnfiltrasyonu: Cerrahi sonunda veya insizyon öncesi trokar yerlerine lokal anestezik infiltrasyonu önerilir.',
      'İntraperitoneal Lokal Anestezik Yıkama: Kese çıkarıldıktan sonra subdiyafragmatik alana ve safra kesesi yatağına lokal anestezik instilasyonu viseral ve omuz ağrısını azaltmada tavsiye edilir.',
      'Rutin intraoperatif güçlü opioid kullanımının kısıtlanması (özellikle sedasyon, solunum depresyonu ve ileusu önlemek için).'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Preoperatif: Açlık süresini kısaltma (katı gıdalar 6 saat, berrak sıvılar 2 saat öncesine kadar), preop berrak karbonhidrat yüklemesi.',
      'İntraoperatif: Düşük intraabdominal insüflasyon basıncı (<12 mmHg), profilaktik antibiyotik tek doz, aktif ısıtma ile normotermi idamesi.',
      'Cerrahi Dren ve Nazogastrik Tüp: Rutin cerrahi dren ve nazogastrik tüp KULLANILMAMALIDIR (ameliyat sonunda OG sonda çekilmelidir).',
      'Postoperatif: Erken oral alım (PACU çıkışından 2-4 saat sonra berrak sıvılar ve hafif gıda), erken mobilizasyon, aynı gün veya <24 saat taburculuk hedefi.'
    ]
  },

  // Kullanılabilecek kaynaklar
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section II: General Surgery - Laparoscopic Cholecystectomy, pp. 412–418. Lippincott Williams & Wilkins.",
    erasReference: 'Gustafsson, U. O., et al. Guidelines for Perioperative Care in Elective Colorectal and Abdominal Surgery: Enhanced Recovery After Surgery (ERAS®) Society Recommendations. World J Surg.',
    prospectReference: 'Barazanchi, A. W. H., et al. Evidence-based management of pain after laparoscopic cholecystectomy: a PROSPECT review update. British Journal of Anaesthesia (BJA).',
    otherReferences: [
      'ESAIC (European Society of Anaesthesiology and Intensive Care) Guidelines: Management of Severe Perioperative Bleeding.',
      'ASA (American Society of Anesthesiologists): Practice Guidelines for Perioperative Blood Management.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter: Anesthesia for Laparoscopic and Robotic Surgeries.',
      'Barash, P. G., et al. Clinical Anesthesia (8th ed.). Laparoscopic Surgery Principles.'
    ]
  }
};
