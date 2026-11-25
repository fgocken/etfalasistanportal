import { ProcedureDefinition } from '../../types/procedures';

/**
 * Transsfenoidal Hipofiz Tümörü Rezeksiyonu (Endoskopik Endonazal Hipofiz Cerrahisi)
 * (Endoscopic Endonasal Transsphenoidal Resection of Pituitary Tumor / Adenoma)
 *
 * Jaffe (6th ed., 2020), Endocrine Society & Pituitary Society Kılavuzları (Katznelson 2014,
 * Fleseriu 2016, Fleseriu 2021), PROSPECT Craniotomy Guidelines (Mestdagh et al., EJA 2023)
 * ve 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) referans alınarak yapılandırılmıştır.
 */
export const transsphenoidalPituitaryResection: ProcedureDefinition = {
  id: 'transsphenoidal-pituitary-resection',
  name: 'Transsfenoidal Hipofiz Tümörü Rezeksiyonu (Endoskopik Endonazal Hipofiz Cerrahisi)',
  shortCode: 'TRANSSFENOİDAL-HİPOFİZ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Nöroendokrin & Kafa Tabanı Cerrahisi',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Sella tursika içerisine ve suprasellar/parasellar boşluğa uzanım gösteren hipofiz bezi adenomları, kraniofarenjiyomlar, Rathke kleft kistleri veya kordomaların; optik kiazma ve çevre nörovasküler yapılar korunarak endoskopik endonazal transsfenoidal yolla (burun deliklerinden sfenoid sinüse, oradan sella tabanına ulaşılarak) mikrocerrahi yöntemle kürete edilip çıkarılması ameliyatıdır. BOS kaçağı gelişen olgularda vaskülarize nazoseptal flep (Hadad flebi), otolog yağ veya fasya lata grefti ile sellar dural rekonstrüksiyon uygulanır.',
  indications: [
    'Non-Fonksiyone Hipofiz Makroadenomları (> 10 mm): Optik kiazmaya bası yaparak bitemporal hemianopsi (görme alanı kaybı), optik atrofi ve hipopitüitarizm tablosu oluşturan kitleler',
    'Fonksiyonel (Hormon Salgılayan) Hipofiz Adenomları:',
    '  - Cushing Hastalığı (ACTH salgılayan mikro/makroadenom): Hiperkortizolizm, kontrolsüz hipertansiyon, diyabet, santral obezite ve frajil vasküler doku',
    '  - Akromegali (GH / IGF-1 salgılayan adenom): Makroglossi, prognatizm, subglottik darlık ve şiddetli zor hava yolu, kardiyomiyopati ve obstrüktif uyku apnesi (OSA)',
    '  - Prolaktinoma (PRL salgılayan adenom): Dopamin agonisti (Kabergolin) medikal tedavisine dirençli, intolerans gelişen veya apopleksi riski taşıyan olgular',
    '  - TSH Salgılayan Adenomlar (Sekonder Hipertiroidizm): Tirotoksikoz kliniği oluşturan nadir adenomlar',
    'Hipofiz Apopleksisi (Akut İskemik/Hemorajik İnfarkt): Ani gelişen şiddetli baş ağrısı, akut görme kaybı, oftalmopleji ve akut adrenal kriz (panhipopitüitarizm) tablosu ile acil dekompresyon gerektiren durumlar',
    'Sellar / Suprasellar Diğer Lezyonlar: Semptomatik Rathke kleft kisti, Kraniofarenjiyom, Sfenoid Kordoma ve Tüberkülüm Sella Menenjiyomları'
  ],
  averageDuration: '2.5 - 4.5 saat (Anestezi indüksiyonu, zor hava yolu güvenliği [özellikle akromegali], A-line, başın jel halka [elektromanyetik navigasyon] veya gerekirse Mayfield ile tespiti, nazal dekonjestan [%0.05 Oksimetazolin veya Lidokain + Epinefrin] yerleşimi ve nöronavigasyon kaydı: 45-60 dk; Endonazal transsfenoidal koridor açılışı, sfenoidotomi ve sella tabanının açılması: 40-60 dk; Kapsül insizyonu, tümör içi küretaj, suprasellar tümörün Valsalva/lomber dren ile indirilmesi ve hemostaz: 45-90 dk; Sellar taban rekonstrüksiyonu, Hadad flebi serilmesi ve nazal tampon yerleşimi: 30-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 400 mL (Standart transsfenoidal adenom küretajında düşük-orta kanama; ancak sella tabanında Kavernöz Sinüs invazyonu veya sella lateral duvarındaki A. Carotis Interna [ICA] hasarında kan kaybı saniyeler içinde 1500 - 3000+ mL masif arteriyel fışkırmaya dönüşebilir!)',
    riskLevel: 'high',
    riskLevelLabel: 'Orta Düzey / Kavernöz Sinüs ve Karotid Arter Laserasyonunda Masif Kanama Riski',
    crossMatchRequirement: 'En az 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalı, T&S doğrulanmalı; dev invaziv adenomlarda 4 Ünite ES ve Masif Transfüzyon hazır bekletilmelidir',
    transfusionProbability: '%10 - %25 (Standart olguda <%10; kavernöz sinüs invazyonunda %30-50)',
    criticalBleedingSources: [
      'A. Carotis Interna (ICA - Kavernöz Segment): Sella tursikanın lateral sınırını oluşturur; cerrahi küret veya mikromakas ile yırtılması transsfenoidal cerrahinin EN ÖLÜMCÜL KATASTROFİSİDİR (yüksek debili fışkıran arteriyel kanama!)',
      'Kavernöz Sinüs ve İntersirküler Sinüsler (Sella tabanı dural açılışında masif venöz göllenme)',
      'Nazal Mukoza ve Sfenoid Sinüs Damarları (A. sphenopalatina ve septal dallar)',
      'Tümör Lojundaki Frajil Neovasküler Yatak'
    ],
    hemostasisStrategies: [
      'Topikal hemostatik ajanlar: Surgicel, Gelfoam trombin matriksi, FloSeal ve pamuk kompresyonu',
      'Kavernöz sinüs sızıntılarında hemostatik matriks ile nazik tamponaj',
      'İntraoperatif ICA Laserasyonu Yönetimi: Cerrahi sellar sıkı kompresyon (kas/fasya grefti ve pamukla tamponaj), eşzamanlı anestezi masif resüsitasyonu (MTP 1:1:1) ve acil ENDOVASKÜLER stent/koilleme için anjiyografi laboratuvarına transfer. HAYATİ HEMODİNAMİK KURAL: ICA laserasyonunda derin hipotansiyondan KESİNLİKLE KAÇINILMALI; Willis Poligonu kollateral serebral perfüzyonunu korumak için NORMOTANSİYON / YETERLİ CPP (MAP ≥ 75-85 mmHg) sürdürülmelidir!',
      'Sellar tabanın otolog yağ ve nazoseptal vaskülarize flep (Hadad-Bassagasteguy flebi) ile su sızdırmaz kapatılması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI]): Mukozal kanamayı azaltan stabil hemodinami, düşük PONV (Hadad flep koruması) ve pürüzsüz uyanma için ilk tercihtir',
      'TIVA + Düşük Doz Sevofluran (< 0.5 MAC): İntraoperatif hemodinamik stabilite sağlar (N₂O KESİNLİKLE KONTRENDİKEDİR!)'
    ],
    alternative: [
      'Dengeli İnhalasyon Anestezisi (Sevofluran < 0.7 - 0.8 MAC + Remifentanil İnfüzyonu): Mutlaka çoklu PONV profilaksisi ile'
    ],
    clinicalRationale: 'Transsfenoidal cerrahide mukozal kanamayı azaltan hemodinamik kontrol, kusmasız/öksürmesiz pürüzsüz uyanma ve suprasellar tümörü indirmek için kontrollü Valsalva manevralarına olanak tanıyan Propofol + Remifentanil TIVA (veya < 0.5 MAC Sevofluran) altın standarttır; pnömosefali riski nedeniyle N₂O kesinlikle kontrendikedir. Endonazal cerrahi sahadan kaçacak kanın aspirasyonunu önlemek ve akromegalideki zor hava yolunu güvenceye almak için sol ağız köşesine tespitli spiral/Güney RAE ETT ve farengeal tampon (ekstübasyon öncesi çift kontrollü çıkarılmak şartıyla) kullanılır.',
    notes: 'TRANSSFENOİDAL HİPOFİZ CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) Akromegali zor hava yolu ve postop CPAP/BiPAP/BMV/HFNC kesin yasağı; (2) Kokain + Epinefrin ve kokain HTN\'de beta-bloker kesin yasağı (%0.05 Oksimetazolin veya tek başına Lidokain+Epinefrin); (3) Cushing hastalığında steroid-koruyucu protokol (rutin Hidrokortizon/Deksametazon verilmez!); (4) DI yönetiminde Serum Na+ > 145 mEq/L + ozmolalite teyidiyle düşük doz DDAVP (0.5-1 mcg) ve Trifazik Yanıt / gecikmiş SIADH (5-10. gün) takibi; (5) Boğaz tamponu çıkarma kuralı ve N₂O yasağı.',
    rulesTitle: 'TRANSSFENOİDAL CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ DİREĞİ',
    indispensableRules: [
      {
        number: 1,
        title: 'AKROMEGALİDE ZOR HAVA YOLU VE POSTOPERATİF CPAP / BiPAP / BMV / HFNC KESİN YASAĞI',
        content: 'Akromegalide makroglossi, prognatizm ve glottik darlık nedeniyle şiddetli zor hava yolu vardır (videolaringoskop/fiberoptik ve 0.5-1 numara küçük ETT hazır olmalıdır). Ekstübasyon sonrası akromegali/OSA hastaları dahil ASLA CPAP, BiPAP, pozitif basınçlı maske ventilasyonu (BMV) veya HFNC uygulanmaz — ölümcül tansiyon pnömosefali ve Hadad flep patlamasına yol açar!'
      },
      {
        number: 2,
        title: 'KOKAİN + EPİNEFRİN YASAĞI VE GÜVENLİ NAZAL VAZOKONSTRİKSİYON',
        content: 'Kokain + Epinefrin kombinasyonu ve kokain kaynaklı hipertansiyonda Esmolol/beta-bloker kullanımı karşılanmamış alfa-adrenerjik kriz ve ölümcül koroner vazospazma yol açtığından KESİNLİKLE YASAKTIR! Yalnızca %0.05 Oksimetazolin veya tek başına Lidokain + Epinefrin (1:100.000-1:200.000) kullanılır.'
      },
      {
        number: 3,
        title: 'CUSHİNG HASTALIĞINDA STEROİD-KORUYUCU (STEROID-SPARING) PROTOKOL',
        content: 'Cushing hastalığında (ACTH adenomu) rutin Hidrokortizon veya PONV amaçlı Deksametazon KESİNLİKLE VERİLMEZ — postoperatif sabah 08:00 kortizol remisyon testini geçersiz kılar! Stres dozu Hidrokortizon (50-100 mg IV) yalnızca preop adrenal yetmezlik, panhipopitüitarizm, hipofiz apopleksisi veya kronik steroid kullanımı olan hastalara uygulanır.'
      },
      {
        number: 4,
        title: 'DİYABETES İNSİPİDUS (DI), DÜŞÜK DOZ DDAVP VE TRİFAZİK YANIT / GECİKMİŞ SIADH',
        content: 'Körlemesine 1-2 mcg IV DDAVP hiponatremik nöbet yaratır, YASAKTIR! Poliüride önce Serum Na+ (> 145 mEq/L) ve eşzamanlı serum/idrar ozmolalitesi doğrulanır; başlangıç dozu 0.5-1 mcg IV/SC\'dir. Postop 5-10. günde gelişen gecikmiş SIADH hiponatremisi en sık yeniden yatış nedenidir; SIADH (övolemik) ile CSW (hipovolemik) mutlaka ayrılmalıdır.'
      },
      {
        number: 5,
        title: 'BOĞAZ TAMPONU (THROAT PACK) KURALI, N₂O YASAĞI VE ICA NORMOTANSİYONU',
        content: 'Orofarengeal tampon takıldığı tahtaya yazılır ve ekstübasyon öncesi cerrah+anestezist sesli çift kontrolü ile çıkarılır. N₂O pnömosefali riski nedeniyle kesin kontrendikedir. ICA laserasyonunda derin hipotansiyon değil, Willis Poligonu kollateralleri için NORMOTANSİYON/CPP korunur!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Endokrinoloji Konsültasyonu: Hipofiz hormon paneli (Bazal ACTH, Kortizol, GH, IGF-1, Prolaktin, TSH, Serbest T4, LH, FSH); panhipopitüitarizm veya sekonder adrenal yetmezlik varsa preoperatif Levotiroksin ve stres dozu Hidrokortizon planı; Cushing hastalığında steroid-koruyucu (steroid-sparing) protokol teyidi.',
      'Endokrin Spesifik Risk Yönetimi:',
      '  - Cushing Hastalığı: Ağır hipertansiyon, hiperglisemi kontrolü, hipokalemi, cilt/damar frajilitesi ve derin ven trombozu (DVT) profilaksisi.',
      '  - Akromegali: Ekokardiyografi (akromegalik kardiyomiyopati, sol ventrikül hipertrofisi), polisomnografi (ağır OSA — postop CPAP/BiPAP kontrendikasyonu için yakın monitörizasyon planı!) ve zor hava yolu planlaması.',
      'Göz Hastalıkları Konsültasyonu: Görme keskinliği ve Görme Alanı (Perimetri — bitemporal hemianopsi derecesi kaydedilmelidir).',
      'Nöroradyoloji / Nöroşirürji: Kontrastlı Dinamik Hipofiz MRG; sellar taban kemik erozyonu, suprasellar optik kiazma basısı, kavernöz sinüs invazyonu (Knosp derecesi) ve interkarotid mesafe.'
    ],
    historyAndPhysical: [
      'Zor Hava Yolu Taraması: Akromegalik yüz hatları, genişlemiş dil (makroglossi), alt çene protrüzyonu, Mallampati Sınıf III-IV, horlama ve gündüz aşırı uykululuk (OSA öyküsü).',
      'Endokrin Belirti ve Semptomlar: Galaktore, amenore, libido kaybı (Prolaktinoma); aydede yüzü, bufalo hörgücü, mor strialar, miyopati (Cushing); el-ayak büyümesi, ayakkabı numarasında artış (Akromegali).',
      'Kardiyovasküler Durum: Kontrolsüz hipertansiyon, diyabetik otonom nöropati ve aritmi öyküsü.',
      'Görme Muayenesi: Hasta preop parmak sayma ve periferik görme alanını kendisi tarif edebilmelidir (postop erken cerrahi başarı/sellar hematom kontrolü için).'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve 2 Ünite ES Cross-Match doğrulaması (dev/invaziv adenomlarda 4 Ünite ES).',
      'Serum Elektrolitleri ve Ozmolalite: Bazal Sodyum (Na+), Potasyum ve Serum Ozmolalitesi (postoperatif DI / SIADH / CSW ayrımında bazal değer hayatidir).',
      'Kan Glukozu, HbA1c, Tam Kan Sayımı ve Koagülasyon Paneli.',
      'Endokrin Hormon Düzeyleri (sabah 08:00 açlık kortizol, ACTH, Serbest T4, TSH, IGF-1, Prolaktin).',
      'Nöronavigasyon Endoskopik BT/MR Verilerinin Yüklenmesi.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu) Seviyesinde Sıfırlanmış: İndüksiyon öncesi yerleştirilmelidir. Reverse Trendelenburg (15-20°) pozisyonda doğru CPP takibi, nazal epinefrin sempatik piklerinin kontrolü, ICA komşuluğunda hemodinamik izlem ve seri elektrolit/glukoz/kan gazı alımı için zorunludur.',
      'Saatlik İdrar Çıkışı Takibi (Isı Problu Foley Kateter): Diyabetes İnsipidus (DI) erken tespiti için; ardışık 2 saat boyunca > 4 mL/kg/saat veya > 250-300 mL/saat berrak poliüri gelişirse derhal Serum Na+, eşzamanlı serum ozmolalitesi ve idrar ozmolalitesi/dansitesi gönderilmelidir!',
      'Sürekli End-Tidal CO2 (EtCO2) ve ABG: Hedef NORMOKAPNİ (PaCO2 35 - 40 mmHg); rutin hiperventilasyondan kaçınılır (beyin aşırı büzüşürse suprasellar tümör kiazmaya yapışır ve sellaya inmez). Kan glukozu hedefi 140 - 180 mg/dL.',
      'Lomber Drenaj Monitörizasyonu (Büyük Suprasellar Tümörler / Yüksek Debili BOS Kaçağı Riski): Cerrahi ekip tarafından suprasellar tümörü indirmek veya BOS kaçağını yönetmek için lomber dren yerleştirilmişse yalnızca cerrahla koordineli kontrollü protokol uygulanır; hasta transferinde/çevirmede MUTLAKA klemplenir.',
      'Anestezi Derinliği İzlemi: BIS (40 - 50), Sürekli Isı Takibi (36.0 - 37.0°C) ve Kantitatif TOF Monitörizasyonu (ekstübasyon öncesi TOFR ≥ 0.90).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz hat (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Cushing hastalığı olan obez/zor damar yollu olgularda veya ICA yaralanması riski yüksek invaziv dev adenomlarda'
    ],
    patientPosition: 'Supin Pozisyon, Gövde ve Baş 15-20° Elevasyonda (Reverse Trendelenburg), Jel Halka / At Nalı Başlık (Elektromanyetik Navigasyon) veya Seçilmiş Olgularda Mayfield Başlık',
    patientPositionDetails: [
      'Mayfield Çivili Başlık Her Endoskopik Olguda ZORUNLU DEĞİLDİR: Modern endoskopik endonazal hipofiz cerrahisinde elektromanyetik (EM) nöronavigasyon ile jel halka / at nalı (gel donut / horseshoe) başlık yaygın ve atravmatik standarttır; Mayfield 3-noktalı çivili başlık yalnızca optik rijit navigasyon gerektiren seçilmiş olgularda kullanılır.',
      'Gövde 15-20° hafif baş yukarı (Reverse Trendelenburg) pozisyona alınarak nazal venöz göllenme ve mukozal kanama azaltılır (A-line tragus seviyesinde sıfırlanır!).',
      'Endoskopik ekibin monitör görüş alanını rahatlatmak için hasta anestezi cihazından hafif uzaklaştırılır; solunum devreleri ve endotrakeal tüp uzatma hortumlarıyla güvene alınır.',
      'Gözler koruyucu göz merhemiyle kapatılır; endoskopik manipülasyon esnasında göz kürelerine dış bası yapılmadığı sürekli kontrol edilir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 - 1.0 mg/kg). Akromegalik olgularda Zor Hava Yolu Arabası, Videolaringoskop (McGrath/Glidescope) ve Fiberoptik bronkoskop hazır bekletilir.',
      'İdame: TIVA (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.25 mcg/kg/dk TCI) veya Düşük Doz Sevofluran (< 0.5 MAC).',
      'Azot Protoksit (N₂O) KESİNLİKLE KONTRENDİKEDİR: Sellar/intrakraniyel boşluğa giren havayı genişleterek tansiyon pnömosefaliye yol açar!',
      'Güvenli Nazal Vazokonstriksiyon Protokolü (KOKAİN + EPİNEFRİN YASAKTIR!):',
      '  - KOKAİN + EPİNEFRİN kombinasyonu ve kokaine bağlı hipertansiyonda beta-bloker (Esmolol) kullanımı karşılanmamış alfa-adrenerjik kriz ve ölümcül koroner vazospazma neden olduğundan KESİNLİKLE KULLANILMAZ!',
      '  - Güvenli Seçenekler: Topikal %0.05 Oksimetazolin (Afrin) VEYA tek başına Lidokain + Epinefrin (1:100.000 - 1:200.000) mukozal infiltrasyonu.',
      '  - Lidokain+Epinefrin kaynaklı geçici hipertansif pikte anestezi derinliği (Remifentanil/Propofol) artırılır; gerekirse kısa etkili vazodilatör (Nikardipin) veya kokain kullanılmadığından emin olunarak dikkatle Esmolol titre edilir.',
      'Suprasellar Tümörün İndirilmesi (Valsalva / Lomber Dren):',
      '  - Rutin Mannitol veya hiperventilasyon İSTENMEZ. Cerrahın talebiyle 20 - 30 cmH2O pozitif hava yolu basıncı (Valsalva) veya suprasellar büyük adenomlarda yerleştirilen lomber dren üzerinden cerrahla koordineli kontrollü salin/BOS yönetimi uygulanır.',
      'Glukokortikoid Yönetimi — CUSHİNG STEROİD-KORUYUCU PROTOKOLÜ:',
      '  - CUSHİNG HASTALIĞI (ACTH Adenomu) ve HPA ekseni intakt olgularda: İntraoperatif stres dozu Hidrokortizon ve PONV amaçlı Deksametazon KESİNLİKLE VERİLMEZ! (Postop sabah 08:00 kortizol remisyon testini geçersiz kılar!).',
      '  - Stres Dozu Hidrokortizon (50 - 100 mg IV bolus): YALNIZCA preoperatif adrenal yetmezlik, panhipopitüitarizm, hipofiz apopleksisi veya kronik steroid kullanımı olan hastalarda uygulanır.',
      'Sıvı ve Glukoz Yönetimi: İzotonik dengeli kristalloid (Plasmalyte/Isolyte-S) veya %0.9 NaCl kullanılır; hipotonik ve dekstrozlu sıvılar (%5 Dekstroz, Ringer Laktat) verilmez. Kan glukozu (özellikle Cushing ve Akromegalide) sıkı biçimde 140 - 180 mg/dL aralığında tutulur.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) veya Güney RAE Endotrakeal Tüp:',
      '  - Tüp cerrahın endonazal girişini engellemeyecek şekilde sol ağız köşesine sağlam bantlanır.',
      '  - Akromegali hastalarında larinks hipertrofik ve subglottis dar olduğundan standart tüpten 0.5-1 numara küçük ETT (kadınlarda 6.5, erkeklerde 7.0) hazır bulundurulur.',
      'Farengeal Boğaz Tamponu (Throat Pack):',
      '  - Nazal cerrahi boyunca mideye ve trakeaya kan sızmasını önlemek için yerleştirilirse ameliyat tahtasına ve anestezi formuna BÜYÜK HARFLERLE yazılır; EKSTÜBASYONDAN ÖNCE CERRAH VE ANESTEZİSTİN SESLİ ÇİFT KONTROLÜ İLE KESİNLİKLE ÇIKARILIR!',
      'Mide Dekompresyonu: Cerrahi bitiminde laringoskop görüşü altında ağızdan Orogastrik Tüp (OGT) ile mide içeriği nazikçe aspire edilir (NGT KESİNLİKLE KONTRENDİKEDİR).'
    ],
    criticalSurgicalStages: [
      '1. Nazal Mukozal Dekonjesyon (%0.05 Oksimetazolin veya Lidokain + Epinefrin 1:100.000-1:200.000 — KOKAİN + EPİNEFRİN YASAKTIR!): Sempatik yanıt, hipertansiyon ve aritmi kontrolü.',
      '2. Sfenoidotomi ve Sella Tabanının Tur ile Açılması: Kemik tozu aspirasyonu, vaskülarize Hadad flebinin hazırlanması.',
      '3. Dural Açılış ve Tümör Küretajı: Kavernöz sinüs kanamaları ve A. Carotis Interna (ICA) sınırlarının mikro-Doppler ile teyidi. ICA laserasyonunda normotansiyon/CPP korunarak tamponaj + MTP + acil endovasküler transfer!',
      '4. Suprasellar Tümörün İnmesi İçin Valsalva / Lomber Dren Yönetimi: Anestezi uzmanı cerrahın komutuyla 20-30 cmH2O hava yolu basıncı uygular.',
      '5. Sellar Rekonstrüksiyon ve Hadad Flebinin Serilmesi: BOS kaçağı varlığında otolog yağ/fasya grefti ve nazoseptal flep ile su sızdırmaz kapatma.',
      '6. Nazal Tamponların Yerleştirilmesi: Bilateral burun tamponu konulduğunda hastanın uyanınca sadece ağızdan nefes alabileceği bilinmeli ve hasta sakinleştirilmelidir.'
    ],
    emergenceNotes: [
      'BOĞAZ TAMPONUNUN (THROAT PACK) ÇIKARILMASI ZORUNLUDUR: Ekstübasyon öncesi farengeal tamponun çıkarıldığı anestezi uzmanı ve cerrah tarafından sesli çift kontrolle doğrulanır!',
      'ÖKSÜRMESİZ VE IKINMASIZ PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE): Ikınma ve öksürme sella tabanındaki nazoseptal flebi fırlatır ve masif BOS fistülüne/sellar kanamaya yol açar; düşük doz Remifentanil, IV Lidokain (1.5 mg/kg) veya Deksmedetomidin ile öksürük refleksi köreltilir, TOFR ≥ 0.90 doğrulanır.',
      'POSTOPERATİF CPAP / BiPAP / BMV / HFNC KESİN KONTRENDİKASYONU: Akromegali ve ağır OSA hastaları dahil olmak üzere transsfenoidal cerrahi sonrası ASLA CPAP, BiPAP, pozitif basınçlı balon-valf-maske (BMV) ventilasyonu veya yüksek akımlı nazal kanül (HFNC) uygulanmamalıdır! Pozitif nazofarengeal basınç ölümcül tansiyon pnömosefaliye ve Hadad flebinin patlamasına yol açar; solunum yetersizliğinde erken kontrollü reentübasyon tercih edilir.',
      'Ağızdan Solunum Hazırlığı ve Postop Görme Muayenesi: Burun tamponu nedeniyle ağızdan nefes alma telkinle desteklenir. Hasta uyanır uyanmaz parmak sayma, görme alanı ve ışık refleksi kontrol edilir; akut görme kaybı sellar hematom acilidir!'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Transsfenoidal Cerrahi Sonrası Ağrı Profili:',
      '  - Ağrı kraniyotomilere göre genellikle daha hafiftir; baş ağrısı ve sinüs dolgunluğu hissi ön plandadır.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kurtarma Analjeziği: Dikkatle titre edilen düşük doz IV Fentanil (25-50 mcg); özellikle Akromegali/OSA hastalarında solunum depresyonu ve CPAP yasağı nedeniyle opiatlar minimal düzeyde tutulur.',
      '  - KAÇINILACAK AJANLAR: Deksketoprofen (selektif NSAİİ değildir; non-selektif COX-1 inhibisyonu ile taze sellar kavitede görme kaybına yol açan sellar hematom riski nedeniyle) rutin kullanılmaz! Tramadol ise şiddetli PONV (kusma = Hadad flep patlaması), OSA\'da solunum depresyonu ve nöbet riski nedeniyle KESİNLİKLE KULLANILMAZ!'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi (2023) ve kafa tabanı ilkeleri doğrultusunda düzenli IV Parasetamol ve cerrahi saha lokal infiltrasyonu multimodal analjezinin temelidir; sellar hematom riski nedeniyle non-selektif NSAİİ\'lardan ve yüksek emetojenik/OSA riskli Tramadolden kaçınılır.'
    ],
    erasRecommendations: [
      'Endokrinoloji / Pituitary Society ve 4. Konsensus PONV (2020) Postoperatif Protokolleri:',
      '  - Diyabetes İnsipidus (DI) Güvenli Yönetim Protokolü: İlk 24-48 saatte saatlik idrar takibi yapılır. Ardışık ≥ 2 saat > 250-300 mL/saat (> 4 mL/kg/saat) berrak poliüride KÖRLEMESİNE DDAVP VERİLMEZ! Önce Serum Na+ (> 145 mEq/L) + eşzamanlı serum ozmolalitesi (> 295-300 mOsm/kg) ve idrar ozmolalitesi (< 200-300 mOsm/kg; dansite < 1.005) doğrulanır (glikozüri/sıvı yükü dışlanır). Doğrulandığında düşük başlangıç dozu Desmopressin (DDAVP 0.5 - 1 mcg IV/SC — körlemesine 1-2 mcg IV hiponatremik nöbet yaratabilir!) uygulanır ve 4-6 saatte bir Serum Na+ izlenir.',
      '  - TRİFAZİK YANIT (TRIPHASIC RESPONSE) VE SIADH vs CSW AYRIMI: (1) Erken santral DI (1-5. gün) → (2) GECİKMİŞ SIADH HİPONATREMİSİ (Postop 5-10. günler — transsfenoidal cerrahi sonrası EN SIK HASTANEYE YENİDEN YATIŞ NEDENİDİR; taburculuk sonrası 7. gün mutlaka Serum Na+ kontrolü!) → (3) Kalıcı DI. Hiponatremide SIADH (övolemik, tedavi: sıvı kısıtlaması ± %3 NaCl) ile Serebral Tuz Kaybı — CSW (hipovolemik + poliürik, tedavi: %0.9/%3 NaCl ile volüm/sodyum replasmanı; sıvı kısıtlaması yasaktır!) mutlaka ayrılmalıdır.',
      '  - Glukokortikoid ve Remisyon Takibi: Cushing hastalığında postop 24-48. saatlerde sabah 08:00 açlık kortizol (< 2-5 mcg/dL = biyokimyasal remisyon) ölçülene dek steroid verilmez; yalnızca adrenal kriz belirtisinde hemen Hidrokortizon başlanır.',
      '  - PONV Profilaksisi (2020 Konsensus): Mideye sızan kan bulantıyı tetikler; kusma Hadad flebini patlatır. Cushing hastalığında Deksametazon KULLANILMADAN TIVA + Ondansetron (4 mg) + Aprepitant (40 mg PO) uygulanır; steroid kısıtlaması olmayan olgularda Deksametazon eklenebilir.',
      '  - BOS Kaçağı, CPAP Yasağı ve Glisemi: Yatak başı 30° elevasyon, sümkürme/pipet/ıkınma/CPAP/BiPAP/HFNC yasağı, laksatif profilaksisi ve kan glukozu 140 - 180 mg/dL hedefi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Transsphenoidal Resection of Pituitary Tumor. Philadelphia: Wolters Kluwer.',
    erasReference: 'Fleseriu, M., Auchus, R., Bancos, I., et al. (2021). Consensus on diagnosis and management of Cushing\'s disease: a guideline update. The Lancet Diabetes & Endocrinology, 9(12), 847-875.',
    prospectReference: 'Mestdagh, F., Lavand\'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Katznelson, L., Laws, E. R., Jr, Melmed, S., et al. (2014). Acromegaly: an Endocrine Society clinical practice guideline. The Journal of Clinical Endocrinology & Metabolism, 99(11), 3933-3951.',
      'Fleseriu, M., Hashim, I. A., Karavitaki, N., et al. (2016). Hormonal Replacement in Hypopituitarism in Adults: An Endocrine Society Clinical Practice Guideline. The Journal of Clinical Endocrinology & Metabolism, 101(11), 3888-3921.',
      'Gan, T. J., Belani, K. G., Bergese, S., et al. (2020). Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesthesia & Analgesia, 131(2), 411-448.',
      'Nemergut, E. C., Dumont, A. S., Barry, U. T., & Laws, E. R. (2005). Perioperative management of patients undergoing transsphenoidal pituitary surgery. Anesthesia & Analgesia, 101(4), 1170-1181.'
    ]
  }
};
