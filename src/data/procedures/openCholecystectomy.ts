import { ProcedureDefinition } from '../../types/procedures';

/**
 * Açık Kolesistektomi (Open Cholecystectomy)
 * 
 * Jaffe (5th ed.), ERAS Society Open Abdominal / Hepatobiliary Guidelines 
 * ve PROSPECT Recommendations referans alınarak yapılandırılmıştır.
 */
export const openCholecystectomy: ProcedureDefinition = {
  id: 'open-chole',
  name: 'Açık Kolesistektomi',
  shortCode: 'AÇIK-KOLE',
  specialty: 'genel_cerrahi',
  specialtyName: 'Genel Cerrahi',
  categoryTag: 'Açık Üst Batın Cerrahisi',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Sağ subkostal (Kocher) veya üst orta hat/paramedian insizyonu ile karın boşluğuna girilerek safra kesesinin Calot üçgeninde kistik arter ve kistik kanal diseksiyonu ve ligasyonu sonrası karaciğer yatağından disseke edilerek çıkarılması ameliyatıdır.',
  indications: [
    'Laparoskopiden konversiyon (kontrol edilemeyen kanama, anatomik varyasyon, yoğun skatris/adezyon veya koledok yaralanması şüphesi)',
    'Safra kesesi karsinomu şüphesi veya kanıtlanmış malignite (radikal kolesistektomi / karaciğer yatak rezeksiyonu / lenf nodu diseksiyonu gereksinimi)',
    'Şiddetli kardiyopulmoner instabilite nedeniyle laparoskopik CO2 pnömoperitoneumunu ve pozisyonu tolere edemeyen hastalar',
    'Çok sayıda geçirilmiş üst batın cerrahisi ve masif omental/viseral yapışıklıklar',
    'Mirizzi sendromu (evre II-IV), kolesistodigestif (kolesistoduodenal/kolesistokolik) fistüller',
    'Perfore kolesistit, peritonit, biliyer flegmon veya yaygın intraabdominal apse tablosu'
  ],
  averageDuration: '60 - 120 dakika (Elektif primer açık vaka: 60-90 dk; Laparoskopiden konversiyon veya şiddetli gangrenöz kolesistit/adezyon: 90-150 dk)',

  // Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 300 mL (Akut flegmonöz/gangrenöz kolesistit, siroz zemininde portal hipertansiyon veya yoğun yapışıklıklarda 400–600 mL üzerine çıkabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk (100 – 300 mL)',
    crossMatchRequirement: '1 - 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match yapılarak kan merkezinde rezerve edilmeli, kan grubu ve antikor tarama doğrulanmalıdır',
    transfusionProbability: '%3 - %8 (Laparoskopiden konversiyon ve sirotik hastalarda %15-20)',
    criticalBleedingSources: [
      'Calot diseksiyonunda sistik arter ligatür yetmezliği veya aberan sağ hepatik arter yaralanması',
      'Geniş karaciğer yatağı parankimal venöz sızıntıları ve derin yatak laserasyonları',
      'Porta hepatis eksplorasyonunda portal ven veya ana hepatik arter dalları',
      'Subkostal insizyonda rektus kası ve çevre vasküler yapılar (superior epigastrik damarlar)'
    ],
    hemostasisStrategies: [
      'Sistik artere çift ligatür veya transfikse sütür ligasyonu',
      'Karaciğer yatağına topikal hemostatik ajanlar (fibrin yapıştırıcı matriks, jelatin sünger, oksitlenmiş selüloz)',
      'Subkostal kas tabakalarının titiz elektrokoagülasyonu',
      'İntraoperatif hemostazı korumak için normotermi, normal pH ve iyonize kalsiyum optimizasyonu; aşırı kanamada Traneksamik Asit (TXA 1 g IV bolus)'
    ]
  },
  anesthesiaTechniques: {
    primary: [
      'Genel Anestezi (Endotrakeal Entübasyonlu) + Torakal Epidural Anestezi / Rejyonel Fasya Plan Blokları (Bilateral Subkostal TAP veya ESP Bloğu) ile Multimodal Analjezi'
    ],
    alternative: [
      'Ciddi kardiyopulmoner kısıtlılığı olan ve genel anestezi yüksek mortalite riski taşıyan çok nadir seçilmiş olgularda Torakal Epidural Anestezi veya Kombine Spinal-Epidural Anestezi (ancak subkostal ekartasyon, diyafram traksiyonu ve cerrahi manipülasyon nedeniyle genel anestezi açık cerrahide temel dayanaktır)'
    ],
    notes: 'Açık kolesistektomide sağ subkostal insizyon, karın duvarı retraksiyonu ve subdiyafragmatik cerrahi manipulasyon yüksek derecede nosiseptif uyarı ve diyafram irritasyonu oluşturur. Hastanın cerrahi relaksasyonu, derin anestezi idamesi ve kontrollü mekanik ventilasyonu için endotrakeal entübasyonla genel anestezi şarttır. Torakal epidural kateter veya ultrason eşliğinde rejyonel fasya plan blokları (Subkostal TAP / ESP) intraoperatif anestezik/opioid ihtiyacını belirgin azaltır.',
    rulesTitle: 'AÇIK KOLESİSTEKTOMİDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'SAĞ SUBKOSTAL KESİDE SOLUNUMSAL KOMPLİKASYON VE DİYAFRAM KORUMASI',
        content: 'Sağ subkostal (Kocher) kesisi postoperatif vital kapasiteyi ve FRC\'yi %40-50 azaltarak bazal atelektazi ve hipoksemi riskini dramatik biçimde artırır. Etkin intraoperatif/postoperatif rejyonel analjezi (Torakal Epidural veya USG eşliğinde Subkostal TAP/ESP bloğu) öksürme ve derin solunumu koruyarak pnömoniyi önleyen en kritik müdahaledir.'
      },
      {
        number: 2,
        title: 'SAĞ SUBKOSTAL EKARTASYON VE VENA KAVA BASISI YÖNETİMİ',
        content: 'Karaciğeri yukarı kaldırmak için yerleştirilen derin ekartörler diyaframı irrite eder ve Vena Kava İnferior\'u komprese ederek ani venöz dönüş azalmasına ve hipotansiyona neden olabilir. Cerrahi ekartasyon anında gelişen ani tansiyon düşüklüğünde cerrah uyarılmalı ve vazopressör/sıvı desteği sağlanmalıdır.'
      },
      {
        number: 3,
        title: 'KARACİĞER YATAĞI KANAMASI VE BİLİYER OBSTRÜKSİYON KOAGÜLOPATİSİ',
        content: 'Özellikle kronik inflamasyon, siroz veya obstrüktif sarılık (K vitamini malabsorpsiyonu) zeminindeki olgularda Calot üçgeni ve karaciğer yatağından ciddi kanama gelişebilir. Preoperatif PT/INR düzeltilmeli (gerekirse K vitamini / TDP), 2 adet geniş lümenli IV yol açılmalı ve 1-2 ünite ES cross-match hazır bulundurulmalıdır.'
      },
      {
        number: 4,
        title: 'BİLİYER SEPSİS VE AKUT KOLANJİTTE HEMODİNAMİK HAZIRLIK',
        content: 'Akut gangrenöz kolesistit veya kolanjit olgularında safra manipülasyonu bakteriyemi ve septik hipotansiyonu tetikleyebilir; profilaktik antibiyotik insizyon öncesi tamamlanmalı, vazoaktif ajanlar ve invaziv takip hazırlığı yapılmalıdır.'
      }
    ]
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Gastroenteroloji / ERCP Konsültasyonu: Koledokolitiyazis, biliyer pankreatit veya kolanjit öyküsü olan hastalarda preoperatif ERCP ile koledok dekompresyonu ve sfinkterotomi gerekliliği netleştirilmelidir.',
      'Kardiyoloji Konsültasyonu: Açık cerrahinin laparoskopiye kıyasla daha yüksek cerrahi stres yanıtı, hemodinamik dalgalanma ve ağrıya bağlı kardiyak iş yükü yaratması nedeniyle MACE risk değerlendirmesi yapılmalıdır.',
      'Göğüs Hastalıkları Konsültasyonu: Sağ subkostal kesi diyafram mobilitesini %40-50 azaltarak atelektazi ve hipoventilasyon riskini artırır; ileri evre KOAH veya restriktif akciğer hastalığı olan olgularda solunum fonksiyonları optimize edilmelidir.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Sepsis ve sistemik toksisite bulguları (Charcot triadı / Reynolds pentadı: ateş, titreme, sarılık, sağ üst kadran hassasiyeti, hipotansiyon ve konfüzyon - akut kolanjit/gangrenöz kolesistit tablosu).',
      'Karaciğer sirozu ve portal hipertansiyon bulguları (asit, sarılık, splenomegali, kaput medusa - safra kesesi yatağında masif varis kanaması riski).',
      'Antikoagülan / Antiagregan kullanımı: Torakal epidural kateter veya rejyonel blok planlanıyorsa ASRA kılavuzlarına göre ilaç kesilme süreleri ve INR/trombosit düzeyleri doğrulanmalıdır.',
      'Obezite ve zor havayolu parametreleri (aspirasyon riski ve yüksek intraabdominal basınç değerlendirilmelidir).'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Karaciğer Fonksiyon Testleri (Total/Direkt Bilirubin, AST, ALT, ALP, GGT): Obstrüktif sarılık ve biliyer bası taraması.',
      'Koagülasyon Paneli (PT, aPTT, INR, Trombosit Sayısı): Karaciğer disfonksiyonu, biliyer obstrüksiyona bağlı K vitamini malabsorpsiyonu veya sepsis koagülopatisi dışlanmalıdır.',
      'Kan Grubu ve Çapraz Karşılaştırma (T&S): Açık cerrahide (özellikle konversiyon, malignite şüphesi veya yoğun inflamasyon varsa) kanama riski laparoskopiye göre daha yüksektir; en az 2 ünite Eritrosit Süspansiyonu (ES) hazır bulundurulmalıdır.',
      'Serum Amilaz ve Lipaz: Biliyer pankreatit atağı ekarte edilmelidir.',
      'Tam Kan Sayımı (Hemogram), Böbrek Fonksiyon Testleri (Üre, Kreatinin) ve Elektrolitler (Na, K, Cl, Ca).'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (DII ve V5 derivasyonları), Nabız Oksimetresi (SpO2), Kapnografi (EtCO2), Non-invaziv Kan Basıncı (NIBP), Isı Probu.',
      'İnvaziv Arteriyel Kan Basıncı (A-Line): Akut kolesistit zemininde sepsiste olan, bilinen ciddi kardiyovasküler hastalığı bulunan veya konversiyon anında aktif kanama riski taşıyan hastalarda anlık hemodinamik titrasyon ve seri kan gazı takibi için planlanmalıdır.',
      'Nöromusküler Monitörizasyon (TOF): Subkostal ekartasyon ve batın kapanışı için cerrahi relaksasyonun objektif takibi ve ekstübasyon öncesi rezidüel kürarizasyonun dışlanması için zorunludur.',
      'İdrar Sondası (Foley Kateter): Açık batın cerrahisinde sıvı dengesi, kanama ve renal perfüzyon takibi için takılmalıdır.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik venöz kateter (16G veya 14G).',
      'Santral Venöz Kateter (CVP): Ciddi hemodinamik instabilite, vazopresör/inotrop ihtiyacı veya periferik venöz yetersizlik olan komorbid hastalarda planlanabilir.'
    ],
    // 4c) Hasta pozisyonu
    patientPosition: 'Supine (Sırtüstü) Pozisyon.',
    patientPositionDetails: [
      'Cerrahi görüşü artırmak için torakolomber bileşkeye bazen hafif bel desteği (roll / köprü) yerleştirilebilir veya masaya hafif Ters Trendelenburg (10-15°) ve hafif sol lateral eğim verilebilir.',
      'Bası noktaları, sakrum, topuklar, brakial pleksus ve ulnar sinir yumuşak desteklerle özenle korunmalıdır.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'İndüksiyon: Propofol veya Etomidat (hemodinamik instabilite riski olanlarda) + Fentanil/Sufentanil + Rokuronyum (1.0-1.2 mg/kg - hızlı seri indüksiyon / RSI gerekiyorsa).',
      'İdame: Sevofluran/Desfluran veya TIVA (Propofol + Remifentanil infüzyonu) + multimodal analjezikler (IV Parasetamol, Deksametazon, uygun olgularda Magnezyum veya Lidokain infüzyonu).',
      'Cerrahi Kas Gevşemesi: Kocher subkostal ekartasyonu ve mekanik ekartörlerin yerleştirilmesi sırasında diyafram irritasyonunu önlemek ve cerrahi görüşü sağlamak için derin nöromusküler blokaj (TOF 1-2) hedeflenir.',
      'Sıvı Stratejisi: Hedefe Yönelik Sıvı Tedavisi (GDFT). Açık batında evaporatif ve üçüncü boşluk sıvı kayıpları laparoskopiye kıyasla daha yüksektir (~4-6 mL/kg/saat dengeli elektrolit solüsyonu), ancak aşırı sıvı yüklenmesinden ve doku/barsak ödeminden kaçınılmalıdır.',
      'Nazogastrik Tüp: Mide dekompresyonu sağlamak ve cerrahi görüşü rahatlatmak için indüksiyon sonrası yerleştirilmeli; vaka sonunda aspire edilip çekilmeli veya ileus riski yüksekse postop kısa süreli bırakılmalıdır.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Kaflı Endotrakeal Tüp (ETT): Açık üst batın cerrahisinde oral kaflı entübasyon zorunludur (LMA kontrendikedir).',
      'Akciğer Koruyucu Ventilasyon: Tidal volüm 6–8 mL/kg (öngörülen ağırlık - PBW), PEEP 5–8 cmH2O, EtCO2 35–40 mmHg aralığında tutulacak şekilde dakika ventilasyonu titre edilir.',
      'Atelektazi Önleme: Subkostal insizyon ve ekartasyon diyafram basısı yarattığından aralıklı alveolar açma (recruitment) manevraları uygulanmalıdır.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Subkostal Kesi ve Mekanik Ekartör (Omni-Tract / Thompson) Yerleşimi: Güçlü kostal traksiyon vagal reflekslere, geçici hipotansiyona, aritmilere veya diyafram kısıtlılığına bağlı havayolu basınç artışına yol açabilir.',
      'Calot Üçgeni Diseksiyonu ve Kistik Arter / Kanal Ayrımı: Sağ hepatik arter veya ana hepatik/koledok kanalı yaralanması riski. Ani masif arteriyel kanama gelişirse cerraha haber verilmeli, aspirasyon, kompresyon ve kan ürünü transfüzyonuna hazır olunmalıdır.',
      'Safra Kesesinin Karaciğer Yatağından Ayrılması: Sirotik karaciğerde parankim kanaması riski. Cerrahi koterizasyon dumanı ve aspirat miktarı takip edilmelidir.',
      'İntraoperatif Kolanjiografi (İOK): C-kollu skopi kullanımı esnasında cerrahın talebiyle solunumun geçici olarak apneye alınması (ventilasyonun durdurulması) gerekebilir. Oddi sfinkter spazmı şüphesinde glukagon (1-2 mg IV) uygulanması planlanabilir.',
      'Batın Kapanışı Aşaması: Subkostal fasyanın primer kapatılması sırasında cerrahın rahatlaması ve dikiş emniyeti için derin kas gevşemesi (TOF = 0) sağlanmalıdır.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Güçlü Postoperatif Ağrı Riski: Açık subkostal insizyon ameliyat bitiminde şiddetli ağrı ve solunumsal splinting (yüzeyel solunum) oluşturabileceğinden, hasta uyandırılmadan önce multimodal analjezikler ve bölgesel bloklar tamamlanmış olmalıdır.',
      'Nöromusküler Blokajın Geri Döndürülmesi: Üst batın cerrahisi geçiren hastada rezidüel kürarizasyon atelektazi ve solunum yetmezliğini tetikler. TOF oranı > 0.9 olmadan ekstübasyon yapılmamalı; derin blokta Sugammadeks (2-4 mg/kg) tercih edilmelidir.',
      'PONV Profilaksisi: Çiftli antiemetik profilaksisi (Deksametazon 4-8 mg indüksiyonda + Ondansetron 4 mg cerrahi bitiminden 30 dk önce).',
      'Uyanık ve Normotermik Ekstübasyon: Sekresyonlar aspire edilmiş, spontan solunumu ve havayolu koruyucu refleksleri tam dönmüş hastada uyanık ekstübasyon.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Açık kolesistektomi, insizyonun diyaframa yakınlığı nedeniyle laparoskopiden çok daha şiddetli postoperatif ağrı ve pulmoner kısıtlılık yaratan cerrahilerdendir; agresif multimodal analjezi gerektirir.',
      'Torakal Epidural Analjezi (T7-T9 seviyesinden kateter ile lokal anestezik + düşük doz opioid infüzyonu veya PCEA) — Altın Standart.',
      'Epidural uygulanamayan veya kontrendike olan hastalarda: Ultrason eşliğinde Bilateral Subkostal TAP Bloğu, Bilateral Erektör Spina Plan (ESP) Bloğu veya Rektus Kılıfı Bloğu + cerrahi yara yerine sürekli lokal anestezik infiltrasyon kateteri.',
      'Sistemik Multimodal Analjezi: IV Parasetamol (1 g q6h) + IV NSAİİ (ör. Ketorolak 15-30 mg veya Deksaketoprofen 50 mg - renal kontrendikasyon yoksa).',
      'Kurtarıcı Analjezi: İntravenöz Hasta Kontrollü Analjezi (İV-PCA Morfin veya Fentanil).'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Torakal Epidural Analjezi: Açık üst batın cerrahilerinde postoperatif ağrıyı, pulmoner morbiditeyi ve ileus süresini azaltmada en yüksek kanıt düzeyine sahip yöntem olarak önerilmektedir.',
      'Sistemik Non-Opioid Baz: Parasetamol ve NSAİİ / COX-2 inhibitörlerinin preoperatif veya cerrahi başında kombine edilmesi opioid ihtiyacını belirgin azaltır.',
      'Cerrahi İnsizyon Alanına Lokal Anestezik İnfiltrasyonu: Yara dudaklarına ve fasya katlarına uzun etkili lokal anestezik infiltrasyonu önerilir.',
      'İntraperitoneal Lokal Anestezik Yıkama: Subdiyafragmatik alana cerrahi bitiminde LA instilasyonu visseral ağrıyı azaltmada tavsiye edilir.',
      'Sistemik Glukokortikoid: Deksametazon (4-8 mg IV) hem analjezik etkinliği artırmada hem de antiemetik profilakside güçlü önerilmektedir.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Torakal Epidural Analjezi: İleusu önlemek, erken mobilizasyonu ve pulmoner rehabilitasyonu sağlamak amacıyla açık batın cerrahisinde temel ERAS bileşenidir (mümkünse post-op 48. saatte sonlandırılmalıdır).',
      'Hedefe Yönelik Sıvı Yönetimi: Aşırı tuz ve sıvı yüklenmesinden kaçınılmalı, övolemi hedeflenmelidir.',
      'Nazogastrik Tüp ve Drenler: Cerrahi drenler gereksiz yere tutulmamalı, nazogastrik sonda uyanma anında veya ilk 24 saat içinde çekilmelidir.',
      'Erken Mobilizasyon ve Erken Oral Beslenme: Postoperatif 1. günde yatak dışı mobilizasyon ve kademeli berrak sıvı alımı başlatılmalıdır.',
      'Tromboprofilaksi: Mekanik kompresyon çorapları + postop Düşük Molekül Ağırlıklı Heparin (DMAH).'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section II: General Surgery - Open Cholecystectomy, pp. 418–424. Lippincott Williams & Wilkins.",
    erasReference: 'Lassen, K., et al. Guidelines for Perioperative Care for Pancreaticoduodenectomy and Open Hepatobiliary Surgery: Enhanced Recovery After Surgery (ERAS®) Society Recommendations. World J Surg.',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in open abdominal and hepatobiliary surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'ESAIC Guidelines on Management of Severe Perioperative Bleeding: Updated Recommendations. Eur J Anaesthesiol.',
      'ASA (American Society of Anesthesiologists) Practice Guidelines for Perioperative Blood Management. Anesthesiology.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 65: Anesthesia for Abdominal and Hepatobiliary Surgery.',
      'Barash, P. G., et al. Clinical Anesthesia (8th ed.). Anesthesia for Gastrointestinal and Biliary Procedures.'
    ]
  }
};
