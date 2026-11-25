import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior Torasik Omurga Cerrahisi: Torakotomi / VATS Yaklaşımı İle Torakal Diskektomi, Korpektomi ve Enstrümentasyon (T3-T12)
 * (Anterior Thoracic Spine Surgery: Thoracotomy / VATS for Thoracic Discectomy, Corpectomy, and Instrumentation)
 *
 * Jaffe (6th ed., 2020), ERAS® Society Spine Consensus (Debono et al., Spine J 2021),
 * PROSPECT Complex Spine Guidelines (Waelkens et al., Eur J Anaesthesiol 2021),
 * AO Spine / Praxis 2024 Acute SCI Hemodynamic Guidelines, SNACC ve EACTA kılavuzları
 * referans alınarak yapılandırılmıştır.
 */
export const anteriorThoracicSpineSurgery: ProcedureDefinition = {
  id: 'anterior-thoracic-spine-surgery',
  name: 'Anterior Torasik Omurga Cerrahisi: Torakotomi / VATS Yaklaşımı İle Torakal Diskektomi, Korpektomi ve Enstrümentasyon (T3-T12)',
  shortCode: 'TORASİK-ANT',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orta ve alt torakal omurgada (T3-T12 seviyeleri) yer alan kalsifiye disk hernileri, travmatik patlama (burst) kırıkları, tümöral kemik destrüksiyonları veya tüberküloz spondilit (Pott hastalığı) olgularında transplevral/retroplevral açık torakotomi veya Video Yardımlı Torakoskopik Cerrahi (VATS) ile uygulanan anterior omurga ameliyatıdır. Torasik omurilik dar bir spinal kanalda yer aldığından ve kan akımı kritik su ayırıcı (watershed) özellik gösterdiğinden, özellikle santral kalsifiye diskler posterior yoldan manipüle edilemez (arka yoldan retraksiyon kalıcı parapleji yaratır). Anterior yoldan akciğer söndürülerek (tek akciğer ventilasyonu) parietal plevra açılır, segmental interkostal damarlar kontrol edilir ve anterior mikrodiskektomi veya korpektomi ile dural kese dekomprese edilir. Açılan boşluk genişleyebilir titanyum kafes (expandable cage), kemik grefti ve anterolateral kilitli rod-vida veya plak sistemleri ile rekonstrükte edilir.',
  indications: [
    'Kalsifiye Torakal Disk Hernileri (Torasik Miyelopati): İlerleyici paraparezi, bacaklarda spastisite, yürüyüş ataksisi ve sfinkter disfonksiyonu yaratan, posterior yoldan çıkarılması felç riski taşıyan santral/parasantral sert kalsifiye diskler',
    'Torakal Vertebra Travmatik Kırıkları: T4-T11 seviyelerinde nörolojik defisit yaratan, spinal kanalın %50\'den fazlasını işgal eden anterior retropulsiyonlu instabil burst kırıkları',
    'Torasik Omurga Primer veya Metastatik Tümörleri: Akciğer, meme, prostat, böbrek kanseri metastazları veya plazmasitom/miyelom kaynaklı korpus destrüksiyonu ve patolojik kırıklar',
    'Torasik Tüberküloz Spondiliti (Pott Hastalığı) ve Spondilodiskit: İlaç tedavisine dirençli, anterior korpus çökmesi, kifoz deformitesi ve soğuk apse ile omurilik basısı yaratan olgular',
    'Şiddetli Torasik Kifoz ve Skolyoz Deformiteleri: Scheuermann kifozunda veya rijit skolyozda posterior cerrahi öncesi anterior gevşetme (anterior release) ve füzyon'
  ],
  averageDuration: '3.5 - 6.5 saat (Çift lümenli tüp [DLT] entübasyonu, bronkoskopik doğrulama ve lateral dekübitüs pozisyonlama: 45-60 dk; Torakotomi veya VATS portlarının açılması, akciğerin kollabe edilmesi ve prevertebral plevral diseksiyon: 45-60 dk; Segmental damarların bağlanması, torasik diskektomi veya korpektomi: 90-150 dk; Expandable cage ve anterolateral fiksasyon: 60-90 dk; Akciğerin yeniden havalandırılması [re-ekspansiyon], göğüs tüpü yerleştirilmesi ve katmanlı torakotomi kapanışı: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '400 - 1200 mL (Standart tek seviye torasik diskektomide 300-600 mL; çok seviyeli korpektomi, hipervasküler tümör rezeksiyonu ve travmalarda 1000-2000 mL\'yi aşabilir)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Torasik Aort, Vena Cava, Azigos Venleri ve İnterkostal Damarlar Komşuluğu)',
    crossMatchRequirement: 'En az 3-4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite Taze Donmuş Plazma (TDP) hazır bulundurulmalıdır; Traneksamik Asit (TXA) protokolü ve Cell Saver (malignite/enfeksiyon dışı) ameliyathanede hazır olmalıdır',
    transfusionProbability: '%40 - %65',
    criticalBleedingSources: [
      'Aorta Thoracica (Sol taraflı torakotomilerde omurga korpuslarının hemen sol anterolateralinde seyreder; traksiyon veya vidalama perforasyonu masif katastrofik arteriyel kanama yaratır)',
      'Vena Azygos ve Vena Hemiazygos (Sağ ve sol prevertebral venöz ana kanallar)',
      'Segmental İnterkostal Arter ve Venler (Aortadan çıkan çiftler; korpektomi esnasında foramen girişinden kopması durumunda kemik deliğine geri kaçarak durdurulması güç kanama yaratır)',
      'Vena Cava Inferior / Superior (Sağ taraflı üst/alt torakal girişimlerde)',
      'Vertebra Korpusu Kansellöz Kemik İliği Kanamaları ve Epidural Venöz Pleksus',
      'Duktus Torasikus (T4-T12 anterolateral seyir — damar değil lenfatik kanal olup yaralanması dirençli şilotoraksa yol açar)'
    ],
    hemostasisStrategies: [
      'Kanıta Dayalı İntraoperatif Traneksamik Asit (TXA) Protokolü: İndüksiyonda 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk içinde), ardından 1-2 mg/kg/saat sürekli infüzyon. UYARI: Nöbet öyküsü, aktif venöz tromboembolizm (VTE) varlığında kullanılmaz; renal yetmezlikte doz azaltılır; insidental durotomi / BOS temasında nöbet riski nedeniyle (GABA/glisin antagonizması) yüksek dozlardan KESİNLİKLE kaçınılır',
      'Segmental damarların omurga korpusunun tam orta hattında, nöral foramenden uzak bir noktada hemoklips, cerrahi ligatür veya bipolar ile titizlikle bağlanması',
      'Kemik kanamalarında steril kemik mumu ve hemostatik ajanlar (FloSeal, Surgicel, Gelfoam)',
      'Aort adventisyasının spatül ve pamuk pedlerle nazikçe korunması',
      'Malignite veya aktif enfeksiyon dışı olgularda Cell Saver (hücre kurtarma) kullanımı',
      'Nüanslı Transfüzyon Eşiği (AABB 2023): Hemodinamik olarak stabil hastalarda Hb 7-8 g/dL; aktif miyokard/spinal kord iskemisi, masif devam eden hemoraji veya İONM amplitüd düşüşünde Hb 8-9 g/dL hedeflenir',
      'Geniş toraks drenajı (en az 1 veya 2 adet 28-32F göğüs tüpü)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (Sol Çift Lümenli Tüp [Left DLT] / OLV) + Kürarsız TIVA (Propofol + Remifentanil) — İONM ve torakotomide ALTIN STANDARTTIR'
    ],
    alternative: [
      'Zor Hava Yolu veya Küçük Havayolu Olan Olgularda: Tek lümenli tüp içerisinden fiberoptik kılavuzlu Bronşiyal Bloker (Arndt / Cohen / EZ-Blocker) + TIVA',
      'Multimodal Adjuvanlı TIVA: Propofol + Remifentanil TIVA rejimine düşük doz IV Ketamin (0.1-0.2 mg/kg/saat) ve/veya IV Lidokain infüzyonu eklenmesi (N₂O KESİNLİKLE KONTRENDİKEDİR!)'
    ],
    clinicalRationale: 'Torakotomi/VATS ile anterior torakal omurgaya erişmek için cerrahi taraf akciğerin selektif olarak kollabe edilmesi gerektiğinden bronkoskopik doğrulamalı Sol Çift Lümenli Tüp (Left DLT) veya bronşiyal bloker ile Tek Akciğer Ventilasyonu (OLV) zorunludur. Adamkiewicz arteri ligasyonu öncesi tcMEP/SSEP sinyallerini korumak için entübasyon sonrası kas gevşeticisiz Propofol + Remifentanil TIVA altın standarttır. N₂O (azot protoksit), İONM sinyallerini baskıladığı ve pnömotoraks/pnömosefali/venöz hava embolisini genişlettiği için KESİNLİKLE KULLANILMAZ.',
    notes: 'ANTERİOR TORASİK OMURGA CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) OLV, FOB DLT Doğrulaması ve Güvenli Tüp Değişimi; (2) Adamkiewicz Arteri (T8-L2), İONM (Bilateral Yumuşak Bite Block) ve MAP ≥ 80-85 mmHg (Permisif Hipotansiyon YASAK); (3) Lateral Dekübitüs, Aksiller Rulo, Nörojenik Şok / Otonomik Disrefleksi ve SCI Süksinilkolin Yasağı; (4) Büyük Damar Kanaması, TXA (10-15 mg/kg + 1-2 mg/kg/sa) ve Şilotoraks / VAE Farkındalığı; (5) Torasik Epidural Yerine PVB / ESPB + İnterkostal Blok ile Güvenli Analjezi.',
    rulesTitle: 'ANTERİOR TORASİK OMURGA CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'TEK AKCİĞER VENTİLASYONU (OLV), FOB DLT DOĞRULAMASI VE GÜVENLİ TÜP DEĞİŞİMİ',
        content: 'Sol DLT pozisyonu hem supin hem de lateral dekübitüse çevrildikten sonra fiberoptik bronkoskopi (FOB) ile KESİNLİKLE doğrulanmalıdır. OLV koruyucu tidal hacimle (4-6 mL/kg ideal vücut ağırlığı [PBW], PEEP 5-8 cmH₂O) sürdürülür. OLV hipoksemisinde İLK ADIM: FOB ile DLT pozisyon teyidi + FiO₂ 1.0 + bağımlı akciğere recruitment manevrasıdır. N₂O kesinlikle kontrendikedir. Ameliyat sonunda yoğun hava yolu ödemi varsa DLT değişimi zorlanmaz; bronşiyal kaf indirilip DLT trakeaya geri çekilerek YBÜ\'de ödem gerileyene dek ventile edilir.'
      },
      {
        number: 2,
        title: 'ADAMKIEWICZ ARTERİ (T8-L2), İONM DİSİPLİNİ VE MAP ≥ 80-85 mmHg (PERMİSİF HİPOTANSİYON YASAK)',
        content: 'Arteria Radicularis Magna (Adamkiewicz arteri) %75 sol tarafta ve T8-L2 seviyeleri arasından çıkar; feda edilmesi kalıcı parapleji yaratır. Pozisyon öncesi ve sonrası bazal tcMEP/SSEP kaydedilmeli, TcMEP için her iki molar diş arasına YUMUŞAK GAZLI BEZ RULO BITE BLOCK yerleştirilmelidir (sert plastik Guedel airway KESİNLİKLE KULLANILMAZ!). Permisif/kontrollü hipotansiyondan KESİNLİKLE kaçınılır: Rutin torasik kord koruması MAP ≥ 80-85 mmHg, İONM düşüşünde ≥ 85-90 mmHg, AO Spine 2024 akut SCI\'de 75-80 ile 90-95 mmHg hedeflenir (rutin yüksek doz NASCIS metilprednizolon önerilmez).'
      },
      {
        number: 3,
        title: 'LATERAL DEKÜBİTÜS KORUMASI, SCI SÜKSİNİLKOLİN YASAĞI VE OTONOMİK İNSTABİLİTE',
        content: 'Aksiller rulo aksilla apeksine DEĞİL, 2-3 parmak altına yerleştirilir (brakiyal pleksus koruması). Akut/subakut spinal kord hasarı (SCI) > 24-48 saat olan hastalarda ekstrasinaptik AChR up-regülasyonu nedeniyle SÜKSİNİLKOLİN KESİNLİKLE KONTRENDİKEDİR (ölümcül hiperkalemi). T1-T4 lezyonlarında Nörojenik Şok (hipotansiyon + bradikardi), T6 ve üzeri kronik SCI\'de Otonomik Disrefleksi (ani malign hipertansiyon + bradikardi) açısından tetikte olunmalıdır.'
      },
      {
        number: 4,
        title: 'BÜYÜK DAMAR KANAMASI, KANITA DAYALI TXA, ŞİLOTORAKS VE VAE RİSKİ',
        content: 'Aort, azigos venleri ve interkostal damarlar korpusa yapışıktır; iki geniş İV yol, A-line, CVC ve hızlı infüzyon cihazı hazır olmalıdır. TXA güvenli dozda (10-15 mg/kg [veya 1 g] yükleme + 1-2 mg/kg/saat infüzyon) uygulanır; nöbet öyküsü, aktif VTE, renal yetmezlik ve BOS temasında dikkat edilir. T4-T12 diseksiyonunda Duktus Torasikus yaralanmasına bağlı şilotoraks ve açık epidural/interkostal venlerden Venöz Hava Embolisi (VAE) riski akılda tutulmalıdır.'
      },
      {
        number: 5,
        title: 'TORASİK EPİDURAL (TEA) YERİNE TEK TARAFLI PVB / ESPB + İNTERKOSTAL BLOK',
        content: 'Torasik kord basısı, tümör ve korpektomi olgularında Torasik Epidural Analjezi (TEA) direkt kord hasarı, epidural hematom, sempatik bloğa bağlı kord iskemisi ve postoperatif Adamkiewicz paraplejisi muayenesini maskeleme riskleri nedeniyle 1. basamak olarak ÖNERİLMEZ! Birinci basamak bölgesel analjezi tek taraflı Torasik Paravertebral Blok (PVB) veya Erektör Spina Plan Bloğu (ESPB) + cerrah tarafından yerleştirilen interkostal blok ve bazalsız (demand-only) multimodal analjezidir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göğüs Cerrahisi Konsültasyonu: Torakotomi hattı, tek akciğer ventilasyonu planlaması, plevral yapışıklık riski (geçirilmiş tüberküloz/pnömoni), duktus torasikus komşuluğu ve göğüs tüpü takibi için multidisipliner eşgüdüm.',
      'Göğüs Hastalıkları Konsültasyonu: Tek akciğer ventilasyonunun tolere edilebilirliği açısından Solunum Fonksiyon Testleri (SFT: FEV1, FVC, DLCO; beklenen postop FEV1 > %40 hedeflenir) ve arteriyel kan gazı analizi.',
      'Nöroloji / Nöroşirürji Konsültasyonu: Torasik miyelopati tablosunun ayrıntılı değerlendirilmesi (alt ekstremite motor gücü, spastisite, Babinski/Klonus, duyu dermatom seviyesi, ataksi ve mesane kontrolü).',
      'Kardiyoloji Konsültasyonu: İleri yaş olgularda torakotomi ve lateral pozisyonun kardiyak fonksiyonlara etkisi; EKO (özellikle sağ ventrikül sistolik basıncı ve pulmoner hipertansiyon ekarte edilmelidir; pulmoner hipertansiyonda OLV ölümcül hipoksemi ve RV yetmezliği yaratabilir).',
      'Girişimsel Radyoloji Konsültasyonu: Hipervasküler omurga tümörlerinde (böbrek/tiroid metastazları) preoperatif transarteriyel embolizasyon ve gerekirse Adamkiewicz arteri (T8-L2) orijin haritalaması.'
    ],
    historyAndPhysical: [
      'ERAS Preoperatif Optimizasyon: Sigara bırakma (en az ≥ 4 hafta — psödoartroz ve pulmoner komplikasyonu belirgin azaltır), preoperatif Hasta Kan Yönetimi (PBM — demir eksikliği/anemi düzeltilmesi), kronik opioid toleransı taraması ve açlık süresi (ameliyattan 2 saat öncesine kadar berrak karbonhidrat [CHO] içeceği; diyabet/gastroparezi hariç).',
      'Spinal Kord Hasarı (SCI) Zamanlaması ve Seviyesi: > 24-48 saat SCI varlığında süksinilkolin kontrendikasyonu; T1-T4 nörojenik şok veya ≥ T6 otonomik disrefleksi öyküsünün sorgulanması.',
      'Sigara Öyküsü ve Kronik Akciğer Hastalığı: KOAH, amfizem, bronşektazi veya geçirilmiş plevrit varlığı (bronşiyal sekresyonlar ve atelektazi riski).',
      'Kord Basısı ve Motor Güç: Bacakların motor kuvveti (0-5/5 skalası) ve göğüs-karın duvarındaki hipoestezi dermatom sınırı (T4 meme başı, T10 göbek hizası).',
      'Zor Hava Yolu Taraması: Çift lümenli tüp (DLT) standart tüplere göre çok daha kalın (35-41 Fr) ve rijit olduğundan laringoskopi zorluğu, diş yapısı ve trakeal anatomik çaplar dikkatle incelenir.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı, Demir/Ferritin (PBM) ve Koagülasyon Paneli: Hb, Hct, Trombosit (≥ 100.000/mm³), PT, aPTT, INR, Fibrinojen tam normal olmalıdır.',
      'En az 3-4 Ünite Eritrosit Süspansiyonu ve 2 Ünite TDP Cross-Match hazırlığı.',
      'Biyokimya ve Kan Şekeri / HbA1c: Renal fonksiyon (TXA doz ayarı için), elektrolitler ve glisemik kontrol.',
      'Arteriyel Kan Gazı (Bazal PaO₂, PaCO₂ ve pH değerleri).',
      'Akciğer Grafisi ve Toraks BT: Trakea çapı, sol ana bronş lümen genişliği (DLT boyut seçimi: kadınlarda 35-37 Fr, erkeklerde 37-39 Fr), plevral kalsifikasyonlar ve mediasten anatomisi.',
      'Spinal Torakal MRG / BT Anjiyografi: Kalsifiye disk boyutu, miyelomalazi sinyali, aort ve Adamkiewicz (T8-L2) komşuluğu.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO₂, EtCO₂ ve Özofageal/Nazofaringeal Sıcaklık (normotermi > 36.0°C).',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Sürekli kan basıncı takibi, MAP ≥ 80-85 mmHg hedefi (İONM düşüşünde ≥ 85-90 mmHg) ve sık arteriyel kan gazı (OLV sırasında PaO₂/PaCO₂, Hb, laktat, iCa²⁺ ve glukoz 140-180 mg/dL takibi) için zorunludur.',
      'Santral Venöz Kateter (CVC): Sağ internal juguler venöz erişim (vazopressör infüzyonu, hızlı resüsitasyon ve olası VAE aspirasyonu için).',
      'İntraoperatif Nöromonitörizasyon (İONM): Bilateral Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP) ve Somatosensoriyel Uyarılmış Potansiyeller (SSEP). Hem supin (pozisyon öncesi) hem lateral dekübitüs (pozisyon sonrası) bazal kayıtlar alınır.',
      'Anestezi Derinliği (BIS/SedLine) ve Nöromusküler İleti İzlemi (TOF): MEP takibi için ameliyat boyunca TOF 4/4 (%100) korunur; entübasyon sonrası kas gevşetici kullanılmaz.',
      'Fiberoptik Bronkoskopi (FOB): DLT yerleşiminin hem supin hem lateral dekübitüs pozisyonunda ve OLV hipoksemisi anında anlık doğrulanması.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı (14-16G) üst ekstremite periferik intravenöz yol',
      'Santral Venöz Kateter (İnternal juguler ven)',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı Kan Hatları',
      'Cell Saver (Kan Kurtarma Cihazı — malignite/enfeksiyon dışı olgularda steril hatta bağlı)'
    ],
    patientPosition: 'Lateral Dekübitüs Pozisyonu (Sağ veya Sol Taraf Üstte, Cerrahi Patolojinin Tarafına Göre)',
    patientPositionDetails: [
      'Aksiller Rulo (Axillary Roll): Altta kalan göğüs duvarına, aksilla apeksinin 2-3 parmak altına silikon rulo yerleştirilir; brakiyal pleksus ve aksiller damarlar kompresyondan korunur.',
      'Alttaki kulak ve göz küresi özenle kontrol edilir; sıfır orbital bası teyit edilir.',
      'Alttaki bacak 90° fleksiyonda, üstteki bacak düz tutulur; bacaklar arasına geniş yastık konur ve fibula başındaki peroneal sinir silikon pedlerle korunur.',
      'Ameliyat masası hafif fleksiyona (kırma) getirilerek interkostal aralık genişletilir; aşırı kırmanın inferior vena cava basısı ve hipotansiyon yaratabileceği unutulmamalıdır.',
      'Pozisyon değişiminden hemen sonra FOB ile DLT pozisyonu ve İONM (tcMEP/SSEP) bazal yanıtları yeniden doğrulanır.'
    ],
    anesthesiaManagement: [
      'Preoperatif Antibiyotik ve PONV Profilaksisi:',
      '  - İnsizyondan 30-60 dk önce IV Sefazolin 2 g (>120 kg ise 3 g); her 3-4 saatte bir veya > 1500 mL kan kaybında ek doz (redosing) tekrarlanır.',
      '  - Multimodal PONV profilaksisi: İndüksiyonda Deksametazon 4-8 mg (cerrah onayı/diyabet gözetilerek) + kapanışta Ondansetron 4 mg.',
      'İndüksiyon ve DLT Entübasyonu:',
      '  - Propofol (1.5-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + orta etkili non-depolarizan kas gevşetici (Rokuronyum 0.5-0.6 mg/kg; gerekirse İONM öncesi Sugammadeks ile tam dönüşüm).',
      '  - KRİTİK UYARI: Akut/subakut spinal kord hasarı (SCI) > 24-48 saat olan hastalarda SÜKSİNİLKOLİN KESİNLİKLE KONTRENDİKEDİR!',
      '  - Sol Çift Lümenli Tüp (Left DLT) videolaringoskop/laringoskop ile yerleştirilir; FOB ile karina ve sol ana bronş kaf pozisyonu doğrulanır ve lateral pozisyonda FOB KESİNLİKLE TEKRARLANIR.',
      '  - TcMEP BITE BLOCK ZORUNLULUĞU: İki taraflı molar dişler arasına YUMUŞAK GAZLI BEZ RULO ısırma bloğu yerleştirilir; SERT PLASTİK GUEDEL AIRWAY KESİNLİKLE KULLANILMAZ!',
      'Tek Akciğer Ventilasyonu (OLV) ve Hipoksemi Algoritması:',
      '  - Koruyucu ventilasyon: Tidal hacim 4-6 mL/kg PBW (ideal vücut ağırlığı), PEEP 5-8 cmH₂O, plato basıncı < 25-30 cmH₂O.',
      '  - OLV Hipoksemisinde Basamaklı Yönetim: (1) İLK ADIM: FOB ile DLT pozisyonunun doğrulanması + FiO₂ 1.0 + bağımlı (dependent) akciğere recruitment manevrası ve PEEP optimizasyonu; (2) Devam ederse cerrahi sahadaki sönük (non-dependent) akciğere 2-5 cmH₂O CPAP uygulanması veya cerrahla iletişimde aralıklı iki akciğer ventilasyonuna (TLV) dönülmesi.',
      'İdame (Kürarsız TIVA + Multimodal Adjuvanlar):',
      '  - Propofol (80-140 mcg/kg/dk) + Remifentanil (0.1-0.25 mcg/kg/dk) TIVA; N₂O (AZOT PROTOKSİT) KESİNLİKLE YASAKTIR! Volatil ajanlardan kaçınılır.',
      '  - PROSPECT Multimodal Adjuvanlar: Düşük doz IV Ketamin (0.5 mg/kg bolus + 0.1-0.2 mg/kg/saat infüzyon; kapanıştan 30-45 dk önce kesilir) ve/veya IV Lidokain infüzyonu (1-1.5 mg/kg bolus + 1-2 mg/kg/saat — rejyonel blok planlanıyorsa kümülatif lokal anestezik toksisitesi [LAST] gözetilerek bloktan önce kesilir).',
      'Kan Koruma ve TXA Protokolü:',
      '  - İndüksiyonda Traneksamik Asit 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk), ardından 1-2 mg/kg/saat infüzyon (nöbet öyküsü, aktif VTE, renal yetmezlik ve BOS teması/durotomi uyarılarına dikkat!).',
      'Hemodinami, Adamkiewicz (T8-L2) ve AO Spine 2024 SCI Hedefleri:',
      '  - Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır.',
      '  - Rutin torasik kord koruması: MAP ≥ 80-85 mmHg (Noradrenalin desteği). Akut SCI olgularında AO Spine 2024 kılavuzu uyarınca MAP 75-80 ile 90-95 mmHg aralığında hedeflenir (rutin yüksek doz NASCIS metilprednizolon protokolü artık önerilmez).',
      '  - T1-T4 lezyonlarında Nörojenik Şok (hipotansiyon + bradikardi: Noradrenalin + Atropin/Glikopirolat), ≥ T6 kronik SCI\'de Otonomik Disrefleksi (anestezi derinleştirme + kısa etkili IV vazodilatör) ve Venöz Hava Embolisi (VAE: ani EtCO₂ düşüşü -> cerrahi sahayı salinle kapla, FiO₂ 1.0, venöz basıncı artır, CVC aspirasyonu) açısından tetikte olunur.',
      '7 Basamaklı İONM Sinyal Düşüşü Kontrol Listesi (tcMEP/SSEP > %50 kayıp):',
      '  1. Cerrahı derhal uyar ve cerrahi manevrayı durdur (segmental arter klemplerini aç, ekartör/kafes traksiyonunu gevşet).',
      '  2. Hemodinamiyi yükselt: MAP ≥ 85-90 mmHg (Noradrenalin infüzyonu).',
      '  3. Oksijenasyon/ventilasyonu optimize et: FiO₂ 1.0, PaCO₂ 35-40 mmHg.',
      '  4. Anemi/kanamayı düzelt: Acil kan gazı/Hb kontrolü (aktif İONM düşüşünde Hb ≥ 8-9 g/dL hedefle).',
      '  5. Normotermi (> 36.0°C), pH ve iyonize Ca²⁺ dengesini sağla.',
      '  6. Anestezi derinliği ve kas gevşemesini kontrol et (volatil/N₂O kapalı, aşırı derin propofol azalt, TOF 4/4 doğrula).',
      '  7. Teknik/ekipman ve pozisyon kontrolü (elektrot teması, aksiller/ekstremite malpozisyonu) — yanıt dönmezse implant/redüksiyon revizyonu.'
    ],
    airwayManagement: [
      'Sol Çift Lümenli Endotrakeal Tüp (Left DLT: kadınlarda 35-37 Fr, erkeklerde 37-39 Fr) veya zor hava yolunda tek lümenli tüp + bronşiyal bloker.',
      'TcMEP sırasında dil, dudak ve diş yaralanmasını önlemek için bilateral YUMUŞAK GAZLI BEZ RULO molar bite block yerleştirilir (sert plastik Guedel airway KESİNLİKLE KULLANILMAZ).',
      'Fiberoptik bronkoskopi cihazı ameliyathane içinde her an hazır ve çalışır durumda tutulur.',
      'GÜVENLİ DLT -> SLT TÜP DEĞİŞİMİ: Postoperatif mekanik ventilasyon gerekiyorsa değişim mutlaka videolaringoskop (VL) + airway exchange catheter (AEC) ve hazır hava yolu kurtarma/cerrahi hava yolu ekipmanı eşliğinde yapılır. Belirgin yüz/hava yolu ödemi varsa DLT değişimi ZORLANMAZ; bronşiyal kaf indirilip DLT trakeaya geri çekilerek tek lümen modunda YBÜ\'ye transfer edilir ve ödem gerileyince güvenli değişim/ekstübasyon yapılır.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama, DLT FOB Doğrulaması, Pre/Post-Pozisyon Bazal İONM ve Floroskopi ile Hedef Kosta Seviyesinin İşaretlenmesi.',
      '2. Posterolateral Torakotomi veya VATS Portlarının Açılması ve Tek Akciğer Ventilasyonunun (OLV) Başlatılması.',
      '3. Parietal Plevranın Açılması, Prevertebral Diseksiyon (Duktus torasikus / şilotoraks ve aort komşuluğuna dikkat!).',
      '4. Segmental İnterkostal Damarların Vertebra Ortasında Klipslenmesi (Adamkiewicz arteri T8-L2 izlemi — geçici test klempajı + tcMEP).',
      '5. Kalsifiye Torakal Diskin veya Tümörlü Korpusun Mikrocerrahi Eksizyonu (Dural kese ve omurilik dekompresyonu).',
      '6. Rekonstrüksiyon: Expandable Kafes (Cage) Yerleştirilmesi ve Anterolateral Titanyum Plak-Vida / Çift Rod Tespiti.',
      '7. Hemostaz Kontrolü, Valsalva Manevrası (Dural kaçak ve şilotoraks/lenf sızıntısı kontrolü), Göğüs Tüplerinin (28-32F) Yerleştirilmesi.',
      '8. Akciğerin Yeniden Havalandırılması (Nazik Recruitment Manevrası) ve Torakotominin Katmanlı Kapatılması.'
    ],
    emergenceNotes: [
      'AKCİĞER RE-EKSPANSİYONU VE KONTROLLÜ EKSTÜBASYON: Cerrah göğüs tüpünü bağlarken kollabe akciğere nazik recruitment manevrası uygulanır ve hava kaçağı kontrol edilir.',
      'DLT Yönetimi: Hasta normotermik, hemodinamik stabil, kan gazı normal ve hava yolu ödemi yoksa pürüzsüz ekstübe edilebilir. Uzun süren, masif kanamalı veya ödemli vakalarda DLT değişimi zorlanmaz (bronşiyal kaf indirilip DLT trakeaya çekilerek veya VL + AEC ile güvenli SLT değişimi yapılarak YBÜ\'ye entübe devredilir).',
      'Öksürmesiz Uyanma: Torakotomi dikişlerini ve interkostal hemostazı korumak için IV Lidokain (1-1.5 mg/kg — blok toksisite sınırı gözetilerek) veya düşük doz Remifentanil ile pürüzsüz ekstübasyon sağlanır.',
      'Acil Nörolojik Muayene: Hasta uyanır uyanmaz her iki bacakta ayak bileği ve başparmak motor hareketi teyit edilir (Adamkiewicz iskemisi ve parapleji derhal ekarte edilmelidir!).'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal ve Nörolojik Güvenli Torakotomi Analjezi Protokolü (PROSPECT 2021):',
      '  - TORASİK EPİDURAL (TEA) UYARISI: Torasik kord basısı, tümör ve korpektomi olgularında TEA (kord travması, epidural hematom, sempatik bloğa bağlı kord iskemisi ve postop parapleji muayenesini maskeleme riskleri nedeniyle) 1. basamak olarak ÖNERİLMEZ.',
      '  - Birinci Basamak Bölgesel Analjezi: Ultrason eşliğinde tek taraflı Torasik Paravertebral Blok (PVB — tek doz veya kateter) veya Erektör Spina Plan Bloğu (ESPB) + Cerrah tarafından kapanışta 3-4 seviyeye İnterkostal Sinir Bloğu (Bupivakain/Ropivakain — toplam LAST doz sınırı hesaplanarak).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kısa Süreli NSAİİ / COX-2 İnhibitörü (≤ 48-72 saat; renal fonksiyon, hemostaz ve cerrah onayı sonrası — kısa süreli kullanımın füzyonu anlamlı bozmadığı gösterilmiştir).',
      '  - İntraoperatif Düşük Doz IV Ketamin (ve seçilmiş majör korpektomide indüksiyonda tek doz IV Metadon 0.1-0.2 mg/kg seçeneği).',
      '  - Kurtarma İntravenöz Hasta Kontrollü Analjezi (IV PCA): Morfin veya Fentanil ile BAZALSIZ, YALNIZCA TALEP-KONTROLLÜ (demand-only) protokol (bazal infüzyon ve eşzamanlı benzodiazepin kullanımından solunum depresyonu nedeniyle KESİNLİKLE kaçınılır).'
    ],
    prospectRecommendations: [
      'PROSPECT Kompleks Omurga Cerrahisi Kılavuzları (Waelkens et al., 2021): Düzenli parasetamol, kısa süreli NSAİİ/COX-2 inhibitörü, rejyonel fasyal/paravertebral bloklar (tek taraflı PVB veya ESPB + interkostal blok), intraoperatif IV ketamin/lidokain ve bazalsız kurtarma IV PCA kombinasyonu sistemik opioid tüketimini ve solunum depresyonunu azaltır.'
    ],
    erasRecommendations: [
      'ERAS® Kompleks Omurga Cerrahisi Kılavuzları (Debono et al., 2021):',
      '  - Yoğun Bakım Takibi: İlk 24 saat YBÜ\'de sürekli arter basıncı (MAP ≥ 80-85 mmHg; akut SCI\'de 75-80 ile 90-95 mmHg), göğüs tüpü drenajı (kanama, hava kaçağı ve süt benzeri şilotoraks kontrolü) ve saatlik alt ekstremite motor muayenesi.',
      '  - Glisemik Kontrol ve Normotermi: Postoperatif kan glukozu 140-180 mg/dL aralığında tutulur; aktif normotermi sürdürülür.',
      '  - Göğüs Fizyoterapisi ve Triflo: Ameliyattan hemen sonra saat başı teşvik edici spirometre (triflo) ve derin solunum egzersizleri.',
      '  - Erken Foley Kateter Çekilmesi ve Mobilizasyon: Nörojenik mesane/akut SCI yoksa mesane sondası postop 1. günde çekilir; hemodinamisi stabil hastalar postop 1. günde mobilize edilir.',
      '  - Göğüs Tüpü ve DVT Profilaksisi: Aktif hava kaçağı olmadığında ve 24 saatlik seröz drenaj < 150-200 mL olduğunda göğüs tüpü çekilir; IPC kesintisiz sürdürülür ve cerrahi hemostaz teyidiyle 24. saatte profilaktik LMWH başlanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Anterior Thoracic Spine Surgery. Philadelphia: Wolters Kluwer.',
    erasReference: 'Debono, B., Wainwright, T. W., Wang, M. Y., Sigmundsson, F. G., Yang, M. M. H., Smid-Nanninga, H., Bonnal, A., Le Huec, J. C., Fawcett, W. J., Ljungqvist, O., Lonjon, G., & de Boer, H. D. (2021). Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations. The Spine Journal, 21(5), 729–752.',
    prospectReference: 'Waelkens, P., Alsabbagh, E., Sauter, A., Joshi, G. P., & Beloeil, H.; PROSPECT Working Group of the European Society of Regional Anaesthesia and Pain Therapy (ESRA). (2021). Pain management after complex spine surgery: A systematic review and procedure-specific postoperative pain management recommendations. European Journal of Anaesthesiology, 38(9), 985–994.',
    otherReferences: [
      'Kwon, B. K., Tetreault, L. A., Martin, A. R., et al. (2024). A clinical practice guideline for the management of patients with acute spinal cord injury: Recommendations on hemodynamic management (AO Spine / Praxis). Global Spine Journal, 14(3_suppl), 187S–211S.',
      'Carson, J. L., Stanworth, S. J., Guyatt, G., et al. (2023). Red blood cell transfusion: 2023 AABB International Guidelines. JAMA, 330(19), 1892–1902.',
      'Bendo, A. A., et al. (2007). Anesthetic considerations for anterior thoracic and lumbar spinal surgery. Anesthesiology Clinics, 25(3), 519–534.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC) & European Association of Cardiothoracic Anaesthesiology and Intensive Care (EACTAIC). Perioperative Spinal Cord Ischemia Monitoring and One-Lung Ventilation Guidelines.'
    ]
  }
};
