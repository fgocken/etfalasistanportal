import { ProcedureDefinition } from '../../types/procedures';

/**
 * Torasik ve Lomber Omurgada Kombine Anterior ve Posterior Enstrümantasyon: Aynı Gün / Aşamalı Çift Seviyeli Rekonstrüksiyon (360 Derece Füzyon)
 * (Combined Anterior and Posterior Instrumentation of the Thoracic and Lumbar Spine)
 *
 * Jaffe (6th ed., 2020), ERAS® Society Spine Consensus (Debono et al., Spine J 2021),
 * PROSPECT Complex Spine Guidelines (Waelkens et al., Eur J Anaesthesiol 2021),
 * ASA POVL Practice Advisory (Anesthesiology 2019), AO Spine / Praxis 2024 Acute SCI Guidelines
 * ve AABB 2023 Transfusion Guidelines referans alınarak yapılandırılmıştır.
 */
export const combinedAnteriorPosteriorThoracolumbarInstrumentation: ProcedureDefinition = {
  id: 'combined-anterior-posterior-thoracolumbar-instrumentation',
  name: 'Torasik ve Lomber Omurgada Kombine Anterior ve Posterior Enstrümantasyon: Aynı Gün / Aşamalı Çift Seviyeli Rekonstrüksiyon (360 Derece Füzyon)',
  shortCode: 'KOMBINE-ANT-POST-360',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji ve Deformite Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Torakolomber ve lumbosakral omurganın (T1-S1 ve Pelvis) hem anterior (ön) hem posterior (arka) kolonunu içeren en radikal, yüksek riskli ve invaziv omurga cerrahisidir. Genellikle "360 Derece Füzyon" olarak adlandırılır. Cerrahi aynı seansta (aynı gün ardışık iki ameliyat) veya 3-7 gün arayla aşamalı (staged) olarak icra edilir. İlk aşamada (Anterior/Anterolateral Yaklaşım): Hasta lateral dekübitüs veya supin pozisyonda torakotomi, torakoabdominal yaklaşım, retroperitoneal ALIF/OLIF veya diyafram insizyonu (torakofrenotomi) ile omurganın ön yüzüne ulaşılır; patolojik vertebra korpusu rezeke edilir (korpektomi), kalsifiye diskler boşaltılır, ön kolon yüksekliğini restore eden lordotik ekspandabl titanyum kafesler veya yapısal kemik greftleri yerleştirilir. İkinci aşamada (Posterior Yaklaşım): Hasta prone (yüzüstü) pozisyona çevrilir; posterior orta hat insizyonuyla çok seviyeli pedikül vidaları, pelvik vidalar (S2AI), dekompresyon, deformite redüksiyonu veya osteotomiler (PSO/SPO) uygulanarak rijit çift rod sistemiyle biyomekanik 360 derece ankoraj kilitlenir.',
  indications: [
    'Şiddetli Erişkin Omurga Deformitesi ve Rijit Kifoskolyoz: Anterior serbestleştirme (mobilizasyon) ve korpektomi yapılmadan tek başına posterior yolla düzeltilemeyen ileri derecede rijit deformiteler',
    'Yüksek Dereceli Lumbosakral Spondilolistezis ve Spondilopitozis (Grade IV ve V / Meyerding): L5 korpusunun sakrumun önüne düştüğü olgularda 360 derece redüksiyon ve füzyon',
    'Omurga Tümörleri ve Soliter Metastazlar (Total En-Bloc Spondilektomi): Omurilik basısı yaratan korpus ve arka eleman tümörlerinin tam onkolojik rezeksiyonu ve 3 kolon rekonstrüksiyonu',
    'Torakolomber İnstabil Patlama (Burst) Kırıkları ve Kırıklı Çıkıklar: Nörolojik bası yapan korpus fragmanlarının anterior dekompresyonu ve çok seviyeli posterior rijit stabilizasyonu',
    'Başarısız Bel Cerrahisi Sendromu (FBSS), Ağır Psödoartroz ve İmplant Yetmezliği: Önceki posterior enstrümantasyon kırılmış, anterior füzyon kaynamamış ve kifotik çökme gelişmiş kompleks revizyon vakaları',
    'Spinal Tüberküloz (Pott Hastalığı) ve Piyojenik Spondilodiskit: Korpus yıkımı ve apse boşaltılması sonrası anterior biyomekanik kafes ve posterior gergi bandı fiksasyonu'
  ],
  averageDuration: '6.0 - 12.0 saat (Aynı gün kombine prosedür: Anterior aşama [torakotomi/retroperitoneal]: 3.0 - 4.5 saat; Resüsitasyon molası, pozisyon değişimi ve örtünme: 1.0 - 1.5 saat; Posterior aşama [çok seviyeli pedikül vidalama/osteotomi]: 4.0 - 6.0 saat; Aşamalı cerrahi tercih edilirse her seans 3.5 - 5.5 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '1500 - 4500 mL (Hem anterior torakolomber/retroperitoneal diseksiyon hem posterior çok seviyeli kas sıyırma, osteotomi ve korpektomi yüzeyleri nedeniyle; tümör spondilektomisi veya revizyon deformitelerde 5000 mL üzeri masif hemoraji riski yüksektir)',
    riskLevel: 'high',
    riskLevelLabel: 'Aşırı Yüksek Risk / Katastrofik Masif Kanama ve Tüketim Koagülopatisi Potansiyeli',
    crossMatchRequirement: 'En az 6-8 Ünite Eritrosit Süspansiyonu (ES), 4-6 Ünite Taze Donmuş Plazma (TDP), 2 Aferez Trombosit ve 2 g Fibrinojen Konsantresi ameliyathane kan dolabında hazır bekletilmelidir; Çift aspiratörlü Cell Saver (malignite/enfeksiyon dışı) ve hızlı infüzyon pompası ZORUNLUDUR',
    transfusionProbability: '%85 - %98 (Aynı gün kombine cerrahilerde kan transfüzyonu kaçınılmazdır)',
    criticalBleedingSources: [
      'Torasik ve Abdominal Aort, Vena Cava Inferior, Sol Ana İliak Ven ve Ana İliak Damarlar (Anterior korpektomi/ALIF ekartasyonu sırasında doğrudan komşuluk)',
      'Segmental İnterkostal ve Lomber Arter ve Venler (Segmental ligasyon sırasında foramen girişinde yırtılma)',
      'Epidural Batson Venöz Pleksusu (Hem anterior hem posterior dekompresyon fazında durdurulması güç venöz göllenme)',
      'Geniş Spongiyöz Korpektomi ve Çok Seviyeli Pedikül/Pelvik Vida Kemik Girişleri',
      'Geniş Paraspinal Kas Yatağı, Subperiosteal Diseksiyon Alanları ve S2AI Siyatik Çentik / Süperior Gluteal Damarlar',
      'Duktus Torasikus (T4-T12 anterolateral seyir — damar değil lenfatik kanal olup yaralanması dirençli şilotoraksa yol açar)'
    ],
    hemostasisStrategies: [
      'TÜM İV VE SANTRAL VENÖZ HATLAR DİYAFRAM ÜSTÜNDEN (üst ekstremite 14-16G / internal juguler / subklavyan) AÇILMALIDIR — Alt ekstremite İV hatlarına ASLA güvenilmez; anterior fazda iliak ven/VCI yırtığında alt ekstremite sıvıları doğrudan retroperitona boşalır!',
      'Kanıta Dayalı İntraoperatif Traneksamik Asit (TXA) Protokolü: İndüksiyonda 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk içinde), tüm aşamalar boyunca 1-2 mg/kg/saat sürekli infüzyon (nöbet toksisitesi nedeniyle >20-30 mg/kg yüksek dozlardan KESİNLİKLE kaçınılır!). UYARI: Nöbet öyküsü ve aktif VTE varlığında kullanılmaz; renal yetmezlikte doz azaltılır; insidental durotomi / BOS temasında nöbet riski (GABA/glisin antagonizması) gözetilir',
      'Çift Aspiratörlü Cell Saver Sistemi (malignite/enfeksiyon dışı): Hem anterior kavite hem posterior cerrahi loj kanamalarını eşzamanlı toplayıp yıkayarak ototransfüzyon sağlama',
      'Masif Transfüzyon Protokolü (MTP) & Nüanslı Hb Eşiği (ASA POVL 2019 / AABB 2023): 1:1:1 oranında ES, TDP ve Trombosit; viskoelastik analiz (ROTEM/TEG) ile hedefe yönelik replasman; kolloid + kristaloid dengesi korunur; hemodinamik stabil dönemde Hb 7-8 g/dL, aktif iskemi/masif devam eden hemoraji/İONM düşüşünde Hb 8-9 g/dL hedeflenir',
      'KALSİYUM REPLASMANI — DOZ HATASINA DİKKAT: 1 g Kalsiyum Klorür (272 mg elementel Ca²⁺) = 1 g Kalsiyum Glukonat (90 mg elementel Ca²⁺) DEĞİLDİR (CaCl₂ 3 kat daha güçlüdür!). Replasman İYONİZE Ca²⁺ < 1.1 mmol/L değerine göre yönlendirilir: YALNIZCA santral venöz kateterden (CVC) CaCl₂ 0.5-1 g (ekstravazasyonda doku nekrozu!) VEYA periferik/santral yoldan Ca-Glukonat 1-2 g İV yavaş infüzyon; Fibrinojen > 200 mg/dL hedeflenir',
      'Topikal Biyolojik Hemostatikler (FloSeal, Surgicel, Gelfoam + trombin, kemik mumu) ve Aktif Normotermi (> 36.0°C)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (Anterior Torakotomide Sol Çift Lümenli Tüp [Left DLT] / OLV veya Bronşiyal Bloker; Posterior Prone Aşamada Spiralli Tek Lümenli Tüp) + Kürarsız TIVA (Propofol + Remifentanil) — Sürekli tcMEP, SSEP ve Pedikül Vida EMG için MUTLAK STANDARTTIR'
    ],
    alternative: [
      'Multimodal Adjuvanlı TIVA (PROSPECT 2021): Propofol + Remifentanil TIVA protokolüne düşük doz IV Ketamin (0.5 mg/kg bolus + 0.1-0.2 mg/kg/saat), IV Lidokain infüzyonu ve/veya indüksiyonda tek doz IV Metadon (0.1-0.2 mg/kg) eklenmesi',
      'Anterior Aşamada Tek Lümenli Spiralli ETT + Bronşiyal Bloker Kullanımı: Prone aşamaya geçerken riskli DLT -> SLT tüp değişimi gereksinimini ortadan kaldırmak için seçilmiş olgularda bloker çekilerek doğrudan spiralli ETT ile prone faza geçilmesi (N₂O KESİNLİKLE KONTRENDİKEDİR!)'
    ],
    clinicalRationale: 'Hem anterior torakolomber/retroperitoneal aşamada hem de posterior çok seviyeli enstrümantasyonda kesintisiz tcMEP, SSEP ve tetiklenmiş EMG takibini koruyabilmek için volatil ajan ve N₂O içermeyen kürarsız Propofol + Remifentanil TIVA mutlak standarttır. Anterior torakotomi gerekiyorsa OLV için sol DLT veya spiralli ETT + bronşiyal bloker seçilir; prone aşamaya geçerken DLT -> SLT değişimi yalnızca videolaringoskop + airway exchange catheter + hazır cerrahi hava yolu eşliğinde yapılır, şiddetli hava yolu ödemi varsa tüp değişimi zorlanmaz ve bronşiyal kaf indirilip DLT trakeaya çekilerek YBÜ\'de aşamalı (staged) cerrahi planlanır.',
    notes: 'KOMBİNE 360° TORAKOLOMBER CERRAHİDE TEMEL ANESTEZİ İLKELERİ: (1) Resüsitasyon Molası, Güvenli DLT -> SLT Ödem Kurtarma ve Aşamalı Cerrahi Kararı; (2) Diyafram Üstü İV/CVC, Sol/Bilateral Ayak SpO₂, Kanıta Dayalı TXA ve Doğru Kalsiyum Dozlaması (CaCl₂ vs Ca-Glukonat); (3) Birleştirilmiş MAP Hedefleri (≥ 80-85 mmHg; Osteotomi/İONM ≥ 85-90 mmHg; AO Spine 2024 SCI; Permisif Hipotansiyon YASAK), Pre/Post-Pozisyon İONM ve TcMEP Yumuşak Bite Block; (4) ASA POVL 2019 (Baş Kalp Seviyesinde/Yukarısında, Jackson > Wilson Frame OR ~4.3, Zorunlu Postop YBÜ Ventilasyonu); (5) Şilotoraks, Pnömotoraks, VAE, SCI Süksinilkolin Yasağı, Otonomik İnstabilite ve Epiduralsiz Multimodal Analjezi.',
    rulesTitle: 'KOMBİNE 360° TORAKOLOMBER CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'RESÜSİTASYON MOLASI, GÜVENLİ DLT -> SLT ÖDEM KURTARMA VE AŞAMALI (STAGED) CERRAHİ',
        content: 'Anterior faz bitip prone faza geçmeden önce zorunlu "Resüsitasyon Molası" verilir: pH < 7.25, baz açığı < -8, koagülopati, hipotermi (< 35.0°C) veya > 3000 mL kan kaybı varsa posterior aşama 3-5 gün sonraya ERTELENİR! Prone öncesi DLT -> spiralli SLT tüp değişimi MUTLAKA videolaringoskop (VL) + airway exchange catheter (AEC) ve hazır kurtarma/cerrahi hava yolu ile yapılır; yoğun hava yolu ödemi varsa değişim ZORLANMAZ — bronşiyal kaf indirilip DLT trakeaya geri çekilerek hasta YBÜ\'ye entübe transfer edilir.'
      },
      {
        number: 2,
        title: 'DİYAFRAM ÜSTÜ İV/CVC, AYAK SpO₂, GÜVENLİ TXA VE DOĞRU KALSİYUM DOZLAMASI',
        content: 'TÜM İV (≥ 2 adet 14-16G) ve CVC hatları DİYAFRAM ÜSTÜNDEN açılır (alt ekstremite İV\'ye ASLA güvenilmez!); anterior ALIF/retroperitoneal fazda iliak arter ekartasyonu için SOL/BİLATERAL AYAK NABIZ OKSİMETRESİ izlenir. TXA güvenli dozda (10-15 mg/kg [veya 1 g] + 1-2 mg/kg/saat; nöbet/VTE/renal/durotomi uyarıları) verilir. KALSİYUM UYARISI: 1 g CaCl₂ (272 mg elementel Ca²⁺) = 3× 1 g Ca-Glukonat (90 mg)! İyonize Ca²⁺ < 1.1 mmol/L ise YALNIZCA CVC\'den CaCl₂ 0.5-1 g VEYA İV Ca-Glukonat 1-2 g yavaş verilir.'
      },
      {
        number: 3,
        title: 'BİRLEŞİK MAP HEDEFLERİ (≥ 80-85 mmHg), PRE/POST-POZİSYON İONM VE YUMUŞAK BITE BLOCK',
        content: 'Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır! Her iki aşamada standart torakolomber kord/Adamkiewicz (T8-L2) koruması MAP ≥ 80-85 mmHg, osteotomi/redüksiyon ve İONM düşüşünde MAP ≥ 85-90 mmHg, AO Spine 2024 akut SCI\'de 75-80 ile 90-95 mmHg hedeflenir (rutin yüksek doz NASCIS metilprednizolon yok). Supin, lateral ve prone pozisyonlarda bazal tcMEP/SSEP kaydedilir; N₂O kesinlikle yasaktır; TOF 4/4 korunur ve TcMEP için bilateral YUMUŞAK GAZLI BEZ RULO molar bite block zorunludur (sert plastik Guedel airway KULLANILMAZ!).'
      },
      {
        number: 4,
        title: 'ASA POVL 2019, JACKSON MASASI (WILSON YERİNE!) VE ZORUNLU POSTOP YBÜ VENTİLASYONU',
        content: '8-12 saatlik 360° cerrahide PION (SIFIR oküler bası altında dahi!) ve hava yolu ödemi riski maksimumdur. Posterior fazda Jackson omurga masası (Wilson çerçevesi bağımsız PION risk faktörü, OR ~4.3!) kullanılır, batın serbest bırakılır, baş nötral ve KALP SEVİYESİNDE veya HAFİF YUKARISINDA (ters Trendelenburg; ASLA baş aşağı değil!) tutulur, gözler her 15-30 dk kontrol edilir (CRAO önlemi). Kolloid + kristaloid dengesi ve nüanslı Hb eşiği (stabil 7-8 g/dL; aktif iskemi/masif hemoraji/İONM düşüşü 8-9 g/dL) uygulanır. Hasta ameliyathanede KESİNLİKLE EKSTÜBE EDİLMEZ; entübe YBÜ\'ye transfer edilir.'
      },
      {
        number: 5,
        title: 'ŞİLOTORAKS, PNÖMOTORAKS, VAE, SCI SÜKSİNİLKOLİN YASAĞI VE EPİDURALSİZ ANALJEZİ',
        content: 'Akut/subakut SCI > 24-48 saatte SÜKSİNİLKOLİN KESİNLİKLE KONTRENDİKEDİR. T1-T4 nörojenik şok ve ≥ T6 otonomik disrefleksiye karşı hazırlıklı olunur. Anterior torakotomide Duktus Torasikus (T4-T12) yaralanmasına bağlı şilotoraks, prone aşamada göğüs tüpü tıkanmasına bağlı tansiyon pnömotoraks ve açık kemik venlerinden VAE izlenir. Epidural kateter kontrendikedir; ESP/yara infiltrasyonu, parasetamol, kısa süreli NSAİİ (≤ 48-72 sa), ketamin/metadon ve BAZALSIZ (demand-only) IV PCA uygulanır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji / Nöroşirürji Taban Konsültasyonu: Ayrıntılı taban motor ve duyu haritalaması (L1-S1 dermatom/miyotomları, refleksler, sfinkter tonusu ve eyer tarzı duyu tespiti).',
      'Göğüs Cerrahisi / Damar Cerrahisi Konsültasyonu (Access Surgeon): Anterior fazda torakotomi/torakofrenotomi (duktus torasikus komşuluğu) veya retroperitoneal ALIF vasküler erişimi için multidisipliner planlama.',
      'Kardiyoloji Konsültasyonu: EKO (EF, kapak fonksiyonları, sağ ventrikül sistolik basıncı ve pulmoner hipertansiyon), koroner iskemi taraması ve 8-12 saatlik çift cerrahi stresine tolerans.',
      'Göğüs Hastalıkları Konsültasyonu: Torakotomi/torakofrenotomi ve OLV planlandığından SFT (FVC, FEV1, DLCO) ve arteriyel kan gazı analizi.',
      'Girişimsel Radyoloji & Kan Bankası (PBM): Hipervasküler tümörlerde preoperatif embolizasyon; en az 6-8 Ünite ES, 4-6 Ünite TDP, 2 Aferez Trombosit, Fibrinojen rezervasyonu ve preoperatif anemi optimizasyonu.'
    ],
    historyAndPhysical: [
      'ERAS Preoperatif Optimizasyon: Hasta Kan Yönetimi (PBM — Hb ≥ 12-13 g/dL, IV demir), sigaranın en az ≥ 4 hafta önce bırakılması (psödoartroz ve pulmoner komplikasyonu azaltır), kronik opioid toleransı taraması ve ameliyattan 2 saat öncesine kadar berrak karbonhidrat (CHO) içeceği (diyabet/gastroparezi hariç).',
      'SCI Zamanlaması ve Otonomik Risk: > 24-48 saat SCI\'de süksinilkolin yasağı; T1-T4 nörojenik şok ve ≥ T6 otonomik disrefleksi taraması.',
      'Periferik Vasküler ve Deformite Muayenesi: Her iki ayakta dorsalis pedis / tibialis posterior nabızlarının belgelenmesi (ALIF fazı için); kifoskolyoz Cobb açısı ve solunum kapasitesi.',
      'Antikoagülan / Antiagregan Öyküsü ve Zor Hava Yolu Taraması: DLT ve olası tüp değişimi için kapsamlı hava yolu değerlendirmesi.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı, Demir/Ferritin (PBM) (Hb, Hct, Trombosit ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen düzeyi (bazal > 200 mg/dL).',
      'En az 6-8 Ünite ES, 4-6 Ünite TDP ve 2 Aferez Trombosit Cross-Match hazırlığı.',
      'Biyokimya (renal fonksiyon — TXA doz ayarı, elektrolitler, kan glukozu / HbA1c) ve Bazal Arteriyel Kan Gazı.',
      'Tüm Omurga Boy Grafileri (SVA, Cobb açıları, pelvik insidans), Torakolomber İnce Kesit BT/MRG ve BT Anjiyografi (Aort, VCI, iliak damarlar ve Adamkiewicz arteri T8-L2 komşulukları).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (ST iskemi analizi), SpO₂, EtCO₂ (VAE/pnömotoraks takibi) ve Nazofaringeal/Özofageal Sıcaklık (normotermi > 36.0°C).',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Pozisyon değişikliklerinde hemodinamiği izlemek, birleşik MAP ≥ 80-85 mmHg (osteotomi/İONM düşüşünde ≥ 85-90 mmHg) hedefini korumak, saatlik kan gazı, laktat, Hb/Hct, iyonize Ca²⁺, glukoz (140-180 mg/dL) ve ROTEM/TEG takibi için ZORUNLUDUR.',
      'SOL / BİLATERAL AYAK NABIZ OKSİMETRESİ (Foot Pulse Oximetry): Anterior ALIF/retroperitoneal fazda iliak arter ekartasyonuna bağlı distal ekstremite iskemisini saniye saniye saptamak için zorunludur.',
      'Santral Venöz Kateter (CVC — DİYAFRAM ÜSTÜ): Üç lümenli internal juguler/subklavyan kateter (vazopressör, masif transfüzyon, CaCl₂ uygulaması ve VAE aspirasyonu için).',
      'İntraoperatif Nöromonitörizasyon (İONM): Supin (pozisyon öncesi), lateral (anterior faz) ve prone (posterior faz) bazal kayıtlı Bilateral tcMEP, SSEP, Serbest EMG ve Pedikül/S2AI Tetiklenmiş EMG.',
      'Anestezi Derinliği (BIS/SedLine), Nöromusküler İleti (TOF 4/4) ve Fiberoptik Bronkoskop (DLT/OLV doğrulaması).',
      'Sıcaklık Sensörlü Mesane Sondası (> 0.5-1.0 mL/kg/saat) ve Prone Fazda Göğüs Tüpü Basınç/Su Altı Drenaj Takibi.'
    ],
    vascularAccess: [
      'ZORUNLU KURAL — DİYAFRAM ÜSTÜ ERİŞİM: En az 2 adet geniş lümenli (14-16G) ÜST EKSTREMİTE periferik İV yol + Üç Lümenli Sağ İnternal Juguler / Subklavyan CVC (Alt ekstremite İV hatlarına ASLA güvenilmez!)',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı İnfüzyon Hatları',
      'Çift Aspiratörlü Cell Saver (Kan Kurtarma Cihazı — malignite/enfeksiyon dışı steril hatta aktif)'
    ],
    patientPosition: 'Çift Aşamalı Pozisyonlama: (1) Lateral Dekübitüs veya Supin (Anterior Faz), ardından Resüsitasyon Molası + (2) Jackson Masasında Prone (Posterior Faz)',
    patientPositionDetails: [
      'AŞAMA 1 (ANTERİOR FAZ): Lateral dekübitüs (torakotomi/torakoabdominal — aksilla apeksinin 2-3 parmak altına aksiller rulo) veya supin (retroperitoneal ALIF — sol/bilateral ayak SpO₂ takılı).',
      'POZİSYON DEĞİŞİMİ VE RESÜSİTASYON MOLASI: Anterior yara kapatılıp göğüs tüpü/dren bağlandıktan sonra kan gazı, Hb, laktat, ROTEM, iCa²⁺ ve sıcaklık değerlendirilir; hasta hemodinamik/metabolik olarak stabilse (aşamalı cerrahi gerekmiyorsa) güvenli tüp kontrolü ile prone çevrilir.',
      'AŞAMA 2 (POSTERİOR FAZ — JACKSON MASASI & ASA POVL 2019): Wilson çerçevesi (bağımsız PION risk faktörü, OR ~4.3) yerine Jackson omurga masası kullanılır; batın tamamen boşlukta sarkıtılarak VCI/Batson basısı sıfırlanır.',
      'BAŞ SEVİYESİ VE SIFIR OKÜLER BASI: Baş nötral ve KALP SEVİYESİNDE veya HAFİF YUKARISINDA (hafif ters Trendelenburg; ASLA baş aşağı değil!) ProneView aynalı kaskta tutulur; göz küreleri her 15-30 dk kontrol edilir (CRAO önlemi).',
      'Kollar < 90° abdüksiyonda "Superman" pozisyonunda; dizler, fibula başı (peroneal sinir), göğüs/pelvis kemik çıkıntıları jel pedlerle korunur. Her pozisyon değişimi sonrası bazal İONM yenilenir.'
    ],
    anesthesiaManagement: [
      'Preoperatif Antibiyotik ve PONV Profilaksisi:',
      '  - İnsizyondan 30-60 dk önce IV Sefazolin 2 g (>120 kg 3 g); her 3-4 saatte bir veya > 1500 mL kan kaybında ek doz (redosing) tekrarlanır.',
      '  - PONV profilaksisi: İndüksiyonda Deksametazon 4-8 mg (cerrah/diyabet gözetilerek) + kapanışta Ondansetron 4 mg.',
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (1.5-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + orta etkili non-depolarizan kas gevşetici (Rokuronyum 0.5-0.6 mg/kg; gerekirse İONM öncesi Sugammadeks ile tam dönüşüm).',
      '  - KRİTİK UYARI: Akut/subakut SCI > 24-48 saat olan hastalarda SÜKSİNİLKOLİN KESİNLİKLE KONTRENDİKEDİR!',
      '  - Anterior torakotomi için sol DLT (FOB ile supin + lateral doğrulama; OLV 4-6 mL/kg PBW, hipoksemide ilk adım FOB teyidi + FiO₂ 1.0 + bağımlı akciğer recruitment) veya spiralli ETT + bronşiyal bloker.',
      '  - TcMEP BITE BLOCK: Her iki molar diş arasına YUMUŞAK GAZLI BEZ RULO ısırma bloğu yerleştirilir (SERT PLASTİK GUEDEL AIRWAY KESİNLİKLE KULLANILMAZ!).',
      '  - Entübasyondan sonra KESİNLİKLE nöromusküler bloker tekrarlanmaz (kürarsız idame; TOF 4/4).',
      'İdame (Kürarsız TIVA + PROSPECT 2021 Adjuvanlar):',
      '  - Propofol (90-150 mcg/kg/dk) + Remifentanil (0.1-0.3 mcg/kg/dk) TIVA. N₂O KESİNLİKLE YASAKTIR! Volatil ajanlardan kaçınılır.',
      '  - PROSPECT Adjuvanlar: Düşük doz IV Ketamin (0.5 mg/kg bolus + 0.1-0.2 mg/kg/saat), IV Lidokain infüzyonu (LAST sınırına dikkat) ve indüksiyonda tek doz IV Metadon (0.1-0.2 mg/kg) seçeneği.',
      'Kan Koruma, Güvenli TXA ve Doğru Kalsiyum Yönetimi:',
      '  - Traneksamik Asit: İndüksiyonda 10-15 mg/kg (veya 1 g) İV yükleme (15-20 dk), tüm aşamalarda 1-2 mg/kg/saat sürekli infüzyon (nöbet öyküsü, aktif VTE, renal doz ayarı ve insidental durotomi/BOS temasında nöbet riski uyarıları!).',
      '  - Masif transfüzyonda kolloid + kristaloid dengesi korunur; stabil dönemde Hb 7-8 g/dL, aktif iskemi/masif hemoraji/İONM düşüşünde Hb 8-9 g/dL; ROTEM/TEG ile Fibrinojen > 200 mg/dL.',
      '  - İyonize Ca²⁺ < 1.1 mmol/L ise: YALNIZCA CVC\'den CaCl₂ 0.5-1 g (272 mg elementel Ca²⁺/g) VEYA İV Ca-Glukonat 1-2 g (90 mg elementel Ca²⁺/g — CaCl₂ ile ASLA eşdeğer değildir!).',
      'Birleştirilmiş Hemodinamik Hedefler, Otonomik İnstabilite ve VAE:',
      '  - Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır! Standart torakolomber kord/Adamkiewicz (T8-L2) koruması MAP ≥ 80-85 mmHg; osteotomi/redüksiyon ve İONM düşüşünde MAP ≥ 85-90 mmHg; AO Spine 2024 akut SCI\'de 75-80 ile 90-95 mmHg hedeflenir (rutin NASCIS metilprednizolon yok).',
      '  - T1-T4 nörojenik şok, ≥ T6 otonomik disrefleksi, ALIF ayak SpO₂ dalga kaybı, prone göğüs tüpü tıkanması (tansiyon pnömotoraks) ve VAE (salinle saha kapama, FiO₂ 1.0, venöz basınç artırma, CVC aspirasyonu) yönetimine hazır olunur.',
      '7 Basamaklı İONM Düşüş Kontrol Listesi (tcMEP/SSEP > %50 kayıp):',
      '  1. Cerrahı derhal uyar ve cerrahi manevrayı durdur (kafes/rod redüksiyonunu gevşet, segmental klempleri aç, vida pozisyonunu kontrol et).',
      '  2. Hemodinamiyi yükselt: MAP ≥ 85-90 mmHg (Noradrenalin).',
      '  3. Oksijenasyon/ventilasyonu optimize et: FiO₂ 1.0, PaCO₂ 35-40 mmHg.',
      '  4. Kanama/anemiyi düzelt: Acil kan gazı/Hb kontrolü (İONM düşüşünde Hb ≥ 8-9 g/dL).',
      '  5. Normotermi (> 36.0°C), pH ve iyonize Ca²⁺ dengesini düzelt.',
      '  6. Anestezi derinliği ve kas gevşemesini kontrol et (volatil/N₂O kapalı, aşırı derin propofol azalt, TOF 4/4).',
      '  7. Elektrot ve pozisyon kontrolü yap — yanıt dönmezse implant/redüksiyon revizyonu.',
      'Aşamalı (Staged) Cerrahi Kararı:',
      '  - Anterior faz sonunda şiddetli metabolik asidoz (pH < 7.25, BE < -8), kontrolsüz koagülopati, hipotermi (< 35.0°C), > 3000 mL kan kaybı veya ciddi hava yolu ödemi varsa posterior aşama ertelenerek hasta entübe YBÜ\'ye alınır.'
    ],
    airwayManagement: [
      'Anterior torasik fazda OLV için sol DLT (FOB ile supin + lateral doğrulama) veya spiralli ETT + bronşiyal bloker.',
      'TcMEP için bilateral YUMUŞAK GAZLI BEZ RULO molar ısırma bloğu zorunludur (sert plastik Guedel airway KESİNLİKLE KULLANILMAZ).',
      'GÜVENLİ DLT -> SLT DEĞİŞİMİ VE ÖDEM KURTARMA: Posterior prone faza geçerken DLT -> spiralli SLT değişimi MUTLAKA videolaringoskop (VL) + airway exchange catheter (AEC) + hazır hava yolu kurtarma/cerrahi hava yolu eşliğinde yapılır. Belirgin hava yolu ödemi varsa tüp değişimi ZORLANMAZ; bronşiyal kaf indirilip DLT trakeaya geri çekilerek tek lümen modunda YBÜ\'ye transfer edilir ve posterior aşama ertelenir.',
      'Prone çevrilmede iki kişi başı nötral eksende sabit tutar; kaf basıncı 20-25 cmH₂O\'da izlenir.'
    ],
    criticalSurgicalStages: [
      '1. Supin Bazal İONM, Anterior Faz Pozisyonlama (Lateral/Supin + ALIF Ayak SpO₂), DLT FOB Doğrulaması ve Seviye Tespiti.',
      '2. Torakotomi, Torakoabdominal (Torakofrenotomi) veya Retroperitoneal Yaklaşım (Duktus torasikus / şilotoraks ve büyük damar komşuluğu!).',
      '3. Segmental Damar Kontrolü, Korpektomi ve Anterior Dekompresyon (Adamkiewicz T8-L2 ve iliak ven/VCI alarmı!).',
      '4. Anterior Kafes (Expandable Cage) Yerleşimi, Hemostaz, Göğüs Tüpü / Retroperitoneal Dren ve Anterior Kapanış.',
      '5. RESÜSİTASYON MOLASI: Kan gazı, Hb, ROTEM/TEG, iCa²⁺, sıcaklık, hava yolu ödemi ve aşamalı cerrahi kararı.',
      '6. Güvenli Tüp Kontrolü/Değişimi ve Jackson Masasına Prone Pozisyonlama (Baş Kalp Seviyesinde/Yukarısında, Serbest Batın, Sıfır Oküler Bası, Prone Bazal İONM).',
      '7. Posterior Orta Hat Diseksiyonu, Çok Seviyeli Pedikül ve Pelvik (S2AI) Vidaların Gönderilmesi (Tetiklenmiş EMG).',
      '8. Deformite Redüksiyonu, Osteotomiler (PSO/SPO — İONM ve MAP ≥ 85-90 mmHg alarmı!), Rod Montajı ve Greftleme.',
      '9. Posterior Normotansif Hemostaz, Valsalva (Dural kaçak/pnömotoraks testi), Göğüs Tüpü Açıklığı Teyidi, Çift Subfasial Dren ve Kapanış.'
    ],
    emergenceNotes: [
      'AMELİYATHANEDE KESİNLİKLE EKSTÜBE EDİLMEZ: 8-12 saatlik cerrahi, masif sıvı/kan resüsitasyonu, diyafram insizyonu ve uzun prone pozisyon nedeniyle belirgin baş, yüz ve larinks ödemi gelişir.',
      'Hasta ameliyat bitiminde entübe, sedatize, normotermik ve tam monitörizasyon altında Cerrahi Yoğun Bakım Ünitesine (YBÜ) transfer edilir.',
      'Ekstübasyon kararı YBÜ\'de ödemin gerilediği, pozitif kaf kaçak testi (cuff-leak) alındığı, hemodinami ve solunum mekaniğinin stabilize olduğu 24-48. saatlerde verilir.',
      'Acil Nörolojik Değerlendirme: YBÜ\'de ilk stabilizasyon sonrası sedasyon kontrollü hafifletilerek her iki bacakta ayak bileği/başparmak motor hareketi (L4, L5, S1) ve ALIF sonrası distal pedal nabızlar teyit edilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Çift Kavite Multimodal Opioid-Koruyucu Analjezi Protokolü (PROSPECT 2021):',
      '  - Epidural Kateter KESİNLİKLE KULLANILMAZ (masif kanama/koagülopati sonrası epidural hematom, sempatik kord iskemisi ve saatlik nörolojik muayeneyi maskeleme riski nedeniyle kontrendikedir).',
      '  - Ultrason Eşliğinde İki Taraflı Erektör Spina Plan (ESP) Bloğu (veya tek taraflı torasik PVB + interkostal blok) / Cerrahi Alan Lokal Anestezik İnfiltrasyonu (Bupivakain/Ropivakain — toplam LAST doz sınırı hesaplanarak).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kısa Süreli NSAİİ / COX-2 İnhibitörü (≤ 48-72 saat; koagülasyon, renal fonksiyon ve cerrah onayı teyit edildikten sonra).',
      '  - Düşük doz IV Ketamin infüzyonu (0.05-0.1 mg/kg/saat) ve indüksiyonda tek doz IV Metadon (0.1-0.2 mg/kg) desteği.',
      '  - Ekstübasyon Sonrası Kurtarma IV PCA: Morfin veya Fentanil ile BAZALSIZ, YALNIZCA TALEP-KONTROLLÜ (demand-only) protokol (opioid PCA ile eşzamanlı benzodiazepin KULLANILMAZ!).',
      '  - Kas Spazmları İçin: Tizanidin veya Baklofen.'
    ],
    prospectRecommendations: [
      'PROSPECT Kompleks Omurga Cerrahisi Kılavuzları (Waelkens et al., 2021): Epidural kateterin kontrendike olduğu majör kombine rekonstrüksiyonlarda fasyal plan blokları (ESP/PVB), cerrahi infiltrasyon, düzenli parasetamol, intraoperatif IV ketamin/tek doz metadon ve ekstübasyon sonrası bazalsız kurtarma IV PCA kombinasyonu solunum fonksiyonlarını korur ve paralitik ileusu azaltır.'
    ],
    erasRecommendations: [
      'ERAS® 360° Omurga Rekonstrüksiyonu ve Deformite Kılavuzları (Debono et al., 2021):',
      '  - Cerrahi Yoğun Bakım İzlemi: İlk 48 saat YBÜ\'de invaziv arter (MAP ≥ 80-85 mmHg; akut SCI\'de 75-80 ile 90-95 mmHg), saatlik alt ekstremite motor muayenesi ve distal pedal nabız kontrolü.',
      '  - Göğüs Tüpü ve Dren Yönetimi: Göğüs tüpü saatlik kanama, hava kaçağı ve süt benzeri şilotoraks (duktus torasikus hasarı) yönünden izlenir; subfasial posterior drenler 24 saatlik debi < 100 mL olana dek tutulur.',
      '  - Hedefe Yönelik Sıvı, Glukoz ve Transfüzyon Yönetimi: Aşırı kristaloid yüklemesinden kaçınılır; glukoz 140-180 mg/dL, normotermi (> 36.0°C) ve nüanslı Hb eşiği (stabil 7-8 g/dL; aktif iskemi 8-9 g/dL) sürdürülür.',
      '  - Derin Ven Trombozu (DVT) Profilaksisi ve Foley Yönetimi: IPC çorapları aralıksız çalıştırılır; hemostaz ve dren çıkışı kontrol edilerek postop 24-48. saatte profilaktik LMWH başlanır. Foley kateter hemodinamik stabilite ve mobilizasyonla birlikte (nörojenik mesane/SCI yoksa) mümkün olan en erken dönemde çekilir.',
      '  - Solunum Fizyoterapisi ve Mobilizasyon: Ekstübasyon sonrası agresif göğüs fizyoterapisi, Triflo ve kademeli erken mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Combined Anterior and Posterior Instrumentation of the Thoracic and Lumbar Spine. Philadelphia: Wolters Kluwer.',
    erasReference: 'Debono, B., Wainwright, T. W., Wang, M. Y., Sigmundsson, F. G., Yang, M. M. H., Smid-Nanninga, H., Bonnal, A., Le Huec, J. C., Fawcett, W. J., Ljungqvist, O., Lonjon, G., & de Boer, H. D. (2021). Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations. The Spine Journal, 21(5), 729–752.',
    prospectReference: 'Waelkens, P., Alsabbagh, E., Sauter, A., Joshi, G. P., & Beloeil, H.; PROSPECT Working Group of the European Society of Regional Anaesthesia and Pain Therapy (ESRA). (2021). Pain management after complex spine surgery: A systematic review and procedure-specific postoperative pain management recommendations. European Journal of Anaesthesiology, 38(9), 985–994.',
    otherReferences: [
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. (2019). Practice advisory for perioperative visual loss associated with spine surgery 2019: An updated report. Anesthesiology, 130(1), 12–30.',
      'Kwon, B. K., Tetreault, L. A., Martin, A. R., et al. (2024). A clinical practice guideline for the management of patients with acute spinal cord injury: Recommendations on hemodynamic management (AO Spine / Praxis). Global Spine Journal, 14(3_suppl), 187S–211S.',
      'Carson, J. L., Stanworth, S. J., Guyatt, G., et al. (2023). Red blood cell transfusion: 2023 AABB International Guidelines. JAMA, 330(19), 1892–1902.',
      'Lenke, L. G., Fehlings, M. G., Shaffrey, C. I., et al. (2010). Multicenter assessment of complications associated with adult spinal deformity surgery: Evaluation of 306 patients. Neurosurgery, 67(6), 1700–1707.'
    ]
  }
};
