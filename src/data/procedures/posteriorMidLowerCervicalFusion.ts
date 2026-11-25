import { ProcedureDefinition } from '../../types/procedures';

/**
 * Orta ve Alt Servikal Omurga Posterior Füzyon ve Fiksasyonu: Laminektomi, Laminoplasti ve Lateral Mas / Pedikül Vidalama (C3-T1)
 * (Posterior Fusion/Fixation of the Mid and Lower Cervical Spine: Laminectomy, Laminoplasty, and Lateral Mass / Pedicle Screws)
 *
 * Jaffe (6th ed., 2020), AO Spine / Praxis (2024), ASA POVL Advisory (2019),
 * PROSPECT Complex Spine (2021), ERAS Society (2021), CSRS ve SNACC kılavuzları referans alınarak yapılandırılmıştır.
 */
export const posteriorMidLowerCervicalFusion: ProcedureDefinition = {
  id: 'posterior-mid-lower-cervical-fusion',
  name: 'Orta ve Alt Servikal Omurga Posterior Füzyon ve Fiksasyonu: Laminektomi, Laminoplasti ve Lateral Mas / Pedikül Vidalama (C3-T1)',
  shortCode: 'POST-SERVİKAL-FÜZYON',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Spinal Nöroşirürji & Omurga Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orta ve alt servikal omurgada (C3-C7 ve servikotorasik bileşke C7-T1/T2) çok seviyeli spinal kanal darlığı, servikal spondilotik miyelopati, travmatik kırık-çıkıklar veya instabilite olgularında uygulanan posterior cerrahi dekompresyon ve enstrümentasyon ameliyatıdır. Posterior orta hat insizyonu ile paraspinal kaslar subperiosteal olarak lateral mas sınırlarına dek sıyrılır; Laminektomi veya Laminoplasti ile kord dekomprese edildikten sonra C3-C6 lateral maslarına ve C7-T1/T2 pediküllerine çok eksenli titanyum vidalar ve rodlar yerleştirilerek rijit posterior füzyon sağlanır.',
  indications: [
    'Çok Seviyeli Servikal Spondilotik Miyelopati (CSM): Korunmuş servikal lordozu olan, ≥ 3 seviyede kord basısı bulunan veya konjenital dar servikal kanallı hastalar',
    'Posterior Longitudinal Ligaman Ossifikasyonu (OPLL): Çok seviyeli kalsifiye anterior kord basısı olguları',
    'Travmatik Servikal Kırık-Çıkıklar: C3-C7 faset kırıkları, kilitli fasetler (unilateral/bilateral facet dislocation) ve posterior ligamentöz kompleks hasarları',
    'Post-Laminektomi Kifoz Deformitesi: Önceki dekompresif laminektomiler sonrası servikal aksın kifoza kayması ve kord gerilmesi',
    'Servikal Tümörler, Metastazlar veya Enfeksiyonlar: Posterior enstrümentasyon ile stabilizasyon gerektiren patolojiler',
    'Kombine Anterior-Posterior (360°) Füzyonun İkinci Seansı'
  ],
  averageDuration: '2.5 - 5.0 saat (Prone pozisyonlama, Mayfield fiksasyonu ve pre/post-pozisyon İONM: 45-60 dk; Dekompresyon ve lateral mas/pedikül vidalama: 120-180 dk; Kapanış ve uyanma: 30-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 500 mL (Çok seviyeli enstrümentasyon ve kemik dekompresyonunda 300-600 mL; travma veya revizyon olgularında 800 mL\'yi bulabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Kanama Riski (Paraspinal kas yatağı, Batson epidural venöz pleksusu ve vertebral arter komşuluğu)',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalıdır; çok seviyeli/travma olgularında ek ES + TDP planlanır',
    transfusionProbability: '%15 - %35 (Özellikle ≥ 4 seviye laminektomi-füzyon uygulanan yaşlı hastalarda)',
    criticalBleedingSources: [
      'A. Vertebralis (Lateral mas vidalamasında aşırı anterior/medial sapmada foramen transversariumdaki vertebral arterin delinmesi — masif kanama ve posterior inme riski!)',
      'Posterior Epidural Venöz Pleksus (Batson pleksusu — prone pozisyonda batın basısı varsa kanama katlanır; ayrıca Venöz Hava Embolisi [VAE] giriş kapısıdır!)',
      'Suboksipital ve Paravertebral Kas İçi Derin Venöz Pleksuslar',
      'Vertebra Korpus ve Lamina Spongioz Kemik Kanamaları'
    ],
    hemostasisStrategies: [
      'Kanıta Dayalı Traneksamik Asit (TXA): Çok seviyeli füzyon/kanama riskinde 10–15 mg/kg (veya 1 g) IV yükleme + 1–2 mg/kg/saat idame (nöbet öyküsü, aktif VTE, renal yetmezlik doz ayarı ve insidental durotomi/BOS temasında nöbet riski gözetilir)',
      'Serbest batınlı Jackson omurga masası ile IVC ve Batson pleksus venöz basıncının düşürülmesi (permisif hipotansiyon KULLANILMAZ!)',
      'Epidural venöz kanamalarda FloSeal, Surgicel, Gelfoam + kemik mumu ve bipolar hemostaz',
      'Vertebral arter yırtılması acil protokolü: Anında FloSeal/Surgicel tamponadı + nöro-girişimsel anjiyo-stent/embolizasyon hazırlığı'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi — Saf TIVA (Propofol + Remifentanil): Çok seviyeli posterior servikal dekompresyon ve lateral mas vidalamasında tcMEP/SSEP ve C5 EMG izlemi için ALTIN STANDARTTIR (N₂O KESİNLİKLE YOK)'
    ],
    alternative: [
      'Zorunlu Kombinasyon: Düşük Doz Volatil Anestezik (≤ 0.5 MAC, tercihen < 0.3–0.5 MAC) + Sürekli Remifentanil İnfüzyonu (N₂O KESİNLİKLE KONTRENDİKE; idamede kas gevşetici yok)'
    ],
    clinicalRationale: 'Prone pozisyonda çok seviyeli posterior servikal laminektomi ve lateral mas vidalamasında tcMEP/SSEP ve C5 kök EMG\'sinin korunması için kürarsız saf Propofol + Opioid TIVA (N₂O yok) altın standarttır. Boyun fleksiyonu ve çivili başlık altında tüp katlanmasını önlemek için spiral telli ETT ile bilateral yumuşak molar bite block zorunludur.',
    notes: 'POSTERİOR SERVİKAL FÜZYONDA TEMEL İLKELER: (1) İNSTABİL BOYUNDA NÖTRAL LOG-ROLL, SCI SÜKSİNİLKOLİN YASAĞI VE PRE/POST-POZİSYON İONM; (2) ASA POVL 2019 (MAYFIELD\'DA DAHİ PION RİSKİ — BAŞ KALP SEVİYESİNDE/YUKARISINDA); (3) SAF TIVA, N₂O YASAĞI VE BİLATERAL YUMUŞAK BITE BLOCK; (4) MAP ≥ 80–85 mmHg, AO SPINE 2024 SCI VE PERMİSİF HİPOTANSİYON YASAĞI; (5) PRONE VAE FARKINDALIĞI, KAF KAÇAK TESTİ VE C5 KÖK MUAYENESİ.',
    rulesTitle: 'POSTERİOR ORTA-ALT SERVİKAL FÜZYONDA 5 VAZGEÇİLMEZ ANESTEZİ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'İNSTABİL BOYUNDA NÖTRAL ENTÜBASYON, SCI\'DE SÜKSİNİLKOLİN YASAĞI VE PRE/POST-POZİSYON İONM',
        content: 'İnstabil C3–C7 kırık/OPLL/CSM olgularında MILS + Videolaringoskop veya AFOI ile nötral entübasyon yapılır. Akut/subakut SCI (>24–48 saat) ve üst motor nöron lezyonunda Süksinilkolin ölümcül hiperkalemik arrest nedeniyle KESİNLİKLE KONTRENDİKEDİR. Supinden prone pozisyona log-roll öncesi (supin bazal) ve sonrası (prone bazal) tcMEP/SSEP kayıtları mutlaka karşılaştırılır.'
      },
      {
        number: 2,
        title: 'ASA POVL (2019) KORUMASI: MAYFIELD\'DA DAHİ PION GELİŞEBİLİR! (PRONEVIEW ÇELİŞKİSİ YOK)',
        content: 'Direkt göz basısı CRAO yapar; ancak omurga cerrahisinde körlüğün en sık nedeni olan Posterior İskemik Optik Nöropati (PION), sıfır göz basısında (Mayfield 3 çivili başlıkta dahi!) uzun prone süre (> 6 saat), EBL > 1 L, başın kalp seviyesinin altında kalması ve aşırı saf kristaloid ile gelişir! Baş nötral ve KALP SEVİYESİNDE/HAFİF YUKARIDA (ters Trendelenburg) tutulur; ağır kanamada kolloid + kristaloid dengesi sağlanır. (Not: Mayfield çivili başlık kullanıldığında yüz tamamen serbesttir — ProneView yüz kaskı aynı anda KULLANILMAZ; sadece çivisiz vakalarda tercih edilir.)'
      },
      {
        number: 3,
        title: 'İONM İÇİN SAF TIVA, N₂O YASAĞI VE BİLATERAL YUMUŞAK BITE BLOCK',
        content: 'tcMEP, SSEP ve C5 (deltoid/biseps) EMG izlemi boyunca saf TIVA (zorunlu volatil ≤ 0.5 MAC; N₂O KESİNLİKLE YOK) ve kantitatif TOF ≥ 0.90 korunur. tcMEP sırasında dil/dudak laserasyonunu önlemek için bilateral yumuşak gazlı bez rulo molar bite block zorunludur (sert Guedel airway KULLANILMAZ).'
      },
      {
        number: 4,
        title: 'SPİNAL KORD PERFÜZYONU (PERMİSİF HİPOTANSİYON YASAK) VE AO SPINE 2024 SCI',
        content: 'Permisif hipotansiyon KESİNLİKLE uygulanmaz. Miyelopati/stenozda MAP ≥ 80–85 mmHg, İONM düşüşünde ≥ 85–90 mmHg hedeflenir. Akut travmatik SCI\'de AO Spine 2024 hedefi MAP 75–80 ile 90–95 mmHg arasıdır (3–7 gün); rutin yüksek doz NASCIS metilprednizolon önerilmez.'
      },
      {
        number: 5,
        title: 'PRONE VAE RİSKİ, KAF KAÇAK TESTİ VE POSTOP C5 KÖK MUAYENESİ',
        content: 'Kalp seviyesi üzerindeki açık Batson venöz pleksusu Venöz Hava Embolisi (VAE) riski taşır (EtCO2 ani düşüşünde sahayı SF ile doldur, %100 O2, vazopressör). Uzun prone sonrası dil/larinks ödemi için Cuff Leak Test yapılmadan ekstübe edilmez; uyanır uyanmaz deltoid/biseps (C5 kök felci) ve görme muayenesi yapılır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji / Nöroşirürji Konsültasyonu: Servikal miyelopati ağırlığı (mJOA/Nurick), C5-C8 radikülopatileri ve bazal motor kuvvetler yazılı belgelenmelidir.',
      'Kardiyoloji Konsültasyonu: İleri yaş hastalarda KAH, LV fonksiyonu ve uzun süreli prone pozisyonda venöz dönüş/önyük rezervi.',
      'Göz Hastalıkları Konsültasyonu: Glokom, diyabetik retinopati veya vasküler optik nöropati öyküsünde bazal vizyon kaydı (ASA POVL 2019).',
      'Göğüs Hastalıkları Konsültasyonu: C3-C5 frenik sinir/diyafram etkilenimi, restriktif solunum paterni ve OSA değerlendirmesi.'
    ],
    historyAndPhysical: [
      'Servikal İnstabilite, Lhermitte Belirtisi ve Ayrıntılı Motor Taban Muayenesi (özellikle deltoid/biseps C5 kuvveti).',
      'Zor Hava Yolu Taraması: Boyun sertliği, kısıtlı ağız açıklığı ve Mallampati (boyna ekstansiyon verilmeden).',
      'Vertebrobaziler Yetmezlik & Sigara/Opioid Taraması: Baş dönmesi/drop attack sorgusu; ERAS 2021 gereği ≥ 4 hafta sigara bırakma ve kronik opioid toleransı tespiti.',
      'Nörojenik Şok / Otonom Disrefleksi Riski: Akut travmatik veya subakut/kronik ≥ T6 SCI öyküsü.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı ve Preop PBM / Anemi Optimizasyonu (4 hafta önce Hb/ferritin taraması, Trombosit ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR tam normal olmalıdır (epidural hematom riski).',
      'Serum Elektrolitleri, BUN, Kreatinin ve Glukoz (hedef 140–180 mg/dL).',
      'Kan Grubu, Antikor Tarama ve 2 Ünite ES Cross-Match hazırlığı.',
      'Servikal MRG ve BT Anjiyografi: Kanal darlığı, miyelomalazi, kilitli fasetler ve vertebral arter anomalileri (akut travmada dinamik grafi ÇEKİLMEZ!).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 (normokapni 35–40 mmHg; ani EtCO2 düşüşü = VAE/kanama alarmı) ve Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line — Flebotatik Aks / Sağ Atriyum Sıfırlaması): Prone pozisyonda MAP ≥ 80–85 mmHg hedefini kesintisiz sağlamak ve ABG/Hb izlemi için zorunludur.',
      'Santral Venöz Kateter (CVC): Çok seviyeli kanamalı cerrahi, vazopressör infüzyonu veya yüksek VAE riski olan olgularda.',
      'İntraoperatif Nöromonitörizasyon (İONM): Bilateral tcMEP, SSEP ve serbest EMG (özellikle C5 sinir kökü için deltoid ve biseps); supin bazal + prone pozisyonlama sonrası bazal kayıtlar karşılaştırılır.',
      'Kantitatif Nöromusküler İleti İzlemi (TOF): TOF oranı ≥ 0.90 (4/4) korunur; idamede kas gevşetici verilmez.',
      'Sıcaklık Sensörlü Mesane Sondası (> 0.5–1.0 mL/kg/saat) ve Floroskopi Rehberliği.'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı (14–16G) periferik IV yol (pronedan önce sağlamlaştırılır ve uzatma hatları kilitlenir)',
      'İnvaziv radiyal arter kanülü; Sefazolin profilaksisi (kesiden 30–60 dk önce; > 3–4 saat veya > 1.5 L kanamada tekrar doz)'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon, Mayfield 3 Çivili Başlık Fiksasyonu (Baş Kalp Seviyesinde/Hafif Yukarıda), Jackson Masası (Serbest Batın)',
    patientPositionDetails: [
      'MAYFIELD 3 ÇİVİLİ BAŞLIK VE HİPERTANSİF YANIT ÖNLEMİ: Çivi giriş yerlerine önceden lokal anestezik infiltre edilir ve derin analjezi (Remifentanil/Propofol bolusu) sağlanır. Mayfield kullanıldığında yüz/gözler tamamen boşluktadır — ProneView yüz kaskı aynı anda KULLANILMAZ (ProneView yalnızca çivisiz olgularda alternatif olarak kullanılır).',
      'LOG-ROLL ÇEVİRME VE PRE/POST-POZİSYON İONM: 4–5 kişilik ekip ile MILS altında tek parça çevrilir; çevirme öncesi ve sonrası tcMEP/SSEP bazalleri karşılaştırılır.',
      'ASA POVL 2019 VE BAŞ SEVİYESİ: Baş nötral ve KALP SEVİYESİNDE veya HAFİF YUKARISINDA (hafif ters Trendelenburg — ASLA baş aşağı değil!) tutulur. Göğüs ve pelvis destekleriyle (Jackson masası; Wilson frame PION riski nedeniyle tercih edilmez) batın tamamen serbest bırakılarak IVC/Batson basıncı önlenir.',
      'Kollar gövde yanında nötral desteklenir; brakiyal pleksus ve ulnar sinir korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2–2.5 mg/kg) + Fentanil (2–3 mcg/kg) veya Remifentanil (0.1–0.2 mcg/kg/dk).',
      '  - İnstabil boyunda MILS eşliğinde Videolaringoskop veya AFOI ile nötral entübasyon.',
      '  - Entübasyonda orta etkili Rokuronyum (0.6 mg/kg) kullanılır (akut/subakut SCI >24–48 saatte Süksinilkolin KESİNLİKLE KONTRENDİKE!); İONM başlamadan önce TOF ≥ 0.90 doğrulanır (gerekirse Sugammadeks).',
      'İdame: Saf TIVA (Propofol 80–140 mcg/kg/dk + Remifentanil 0.05–0.25 mcg/kg/dk; zorunlu kombinasyonda volatil ≤ 0.5 MAC, tercihen < 0.3–0.5 MAC; N₂O KESİNLİKLE KULLANILMAZ!). Multimodal analjezi için düşük doz IV Ketamin (0.25–0.5 mg/kg bolus + 0.1–0.2 mg/kg/saat) ve/veya IV Lidokain (1.5 mg/kg bolus + 1–1.5 mg/kg/saat) eklenebilir.',
      'Multimodal POBV Profilaksisi: Deksametazon (4–8 mg IV) + Ondansetron (4 mg IV).',
      'Sıvı, Kanama & POVL Dengesi: Çok seviyeli kanamalı füzyonda aşırı saf kristaloid yerine dengeli kristaloid + kolloid (albümin) dengesi sağlanır; transfüzyon eşiği stabil olguda Hb 7–8 g/dL, aktif kord iskemisi/masif kanama/İONM düşüşünde 8–9 g/dL. TXA: 10–15 mg/kg + 1–2 mg/kg/saat.',
      'Omurilik Perfüzyonu (Permisif Hipotansiyon YASAK!): MAP ≥ 80–85 mmHg; akut travmatik SCI\'de AO Spine 2024 hedefi 75–80 ile 90–95 mmHg (3–7 gün; rutin NASCIS steroid önerilmez). Nörojenik şok ve otonom disrefleksi (≥ T6) izlenir.',
      '7 Adımlı İONM Sinyal Alarmı Protokolü (> %50 amplitüd kaybı / > %10 latans uzaması):',
      '  - 1. Cerrahı derhal uyar; vida/kord basısı/distraksiyon manevrasını geri al.',
      '  - 2. MAP\'ı hızla ≥ 85–90 mmHg seviyesine çıkar (Noradrenalin / Fenilefrin).',
      '  - 3. SpO2/PaO2 ve normokapniyi (PaCO2 35–40 mmHg) doğrula.',
      '  - 4. Hb/Hct ve kan gazını kontrol et (gerekirse transfüzyon).',
      '  - 5. Normotermiyi (> 36.0–36.5°C) sağla.',
      '  - 6. Anestezi derinliğini (< 0.5 MAC / TIVA) ve TOF ≥ 0.90 (kazara NMB yok) doğrula.',
      '  - 7. Elektrot/teknik empedans ve baş/boyun/kol pozisyonunu kontrol et.',
      'VAE Acil Müdahalesi: EtCO2 ani düşüş + hipotansiyonda cerrahı uyar (sahayı SF/kemik mumu ile kapat), %100 O2, vazopressör, CVC varsa hava aspirasyonu.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp kullanılır.',
      'BİLATERAL YUMUŞAK MOLAR BITE BLOCK (TcMEP ZORUNLULUĞU): Dil/dudak laserasyonunu ve ETT ısırmasını önlemek için bilateral yumuşak gazlı bez rulo bite block yerleştirilir (sert plastik Guedel airway KULLANILMAZ!).',
      'Tüp tespiti su geçirmez flasterlerle sağlamlaştırılır; kaf basıncı 20–25 cmH2O tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Supin Bazal İONM, Mayfield Fiksasyonu, Güvenli Log-Roll ve Prone Bazal İONM Karşılaştırması.',
      '2. Floroskopi ile C3–T1 Seviye Doğrulaması ve Posterior Orta Hat İnsizyonu.',
      '3. Subperiosteal Kas Diseksiyonu: Lamina, faset eklemleri ve lateral masların açığa çıkarılması.',
      '4. Laminektomi veya Laminoplasti (Kord dekompresyonu; Batson pleksusu ve VAE dikkati).',
      '5. Lateral Mas Vidaları (C3–C6) ve C7–T1 Pedikül Vidaları (Vertebral arter ve C5 kök koruması).',
      '6. Titanyum Rod Montajı, Dekortikasyon ve Posterolateral Kemik Greftleme.',
      '7. Hemostaz, Valsalva (Dural kaçak testi), Çift Subfasial Dren ve Kapanış.'
    ],
    emergenceNotes: [
      'SUPİN ÇEVİRME VE KAF KAÇAK TESTİ (CUFF LEAK TEST): Hasta mutlaka SUPİN pozisyona çevrilir. Uzun prone cerrahi sonrası yüz, dil ve larinks ödemi için pozitif kaf kaçağı doğrulanmadan ekstübe edilmez; şiddetli ödemde entübe ve baş 30–45° eleve YBÜ\'ye alınır.',
      'Pürüzsüz Ekstübasyon: IV Lidokain (1.5 mg/kg) veya düşük doz Remifentanil altında öksürmesiz uyanma sağlanır.',
      'Acil Postoperatif Nörolojik ve Görme Muayenesi: Uyanır uyanmaz tüm ekstremiteler (özellikle C5 kök felci: deltoid/biseps!) ve her iki gözde görme keskinliği/ışık refleksi (POVL taraması) kontrol edilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'PROSPECT (2021) & ERAS (2021) Uyumlu Multimodal Analjezi Protokolü:',
      '  - Cerrahi Kapanışta Paraspinal Kas/Yara Yatağına Lokal Anestezik İnfiltrasyonu (Bupivakain/Ropivakain %0.25 + Epinefrin) veya Ultrason Eşliğinde Servikal/Üst Torasik ESPB.',
      '  - Düzenli IV Parasetamol (1000 mg q6h).',
      '  - Kısa Süreli Standart Doz NSAİİ / COX-2 (≤ 48–72 saat; cerrahi hemostaz kesinleştikten sonra; yüksek doz Ketorolak > 120 mg/gün veya > 2 haftalık kullanımdan kaçınılır).',
      '  - İntraoperatif IV Ketamin (PROSPECT Grade A), IV Lidokain ve/veya majör çok seviyeli füzyonda tek doz IV Metadon (0.15–0.2 mg/kg) seçeneği.',
      '  - Hasta Kontrollü Analjezi (İV PCA): Yalnızca talep/bolus modunda (BAZAL İNFÜZYONSUZ!) düşük doz Morfin veya Fentanil PCA.',
      '  - KISITLAMALAR: Opioid PCA ile eşzamanlı Benzodiazepin (Diazepam) FDA Black Box solunum depresyonu ve deliryum riski nedeniyle KESİNLİKLE KULLANILMAZ! Kas spazmı için Tizanidin veya Metokarbamol tercih edilir; rutin Gabapentinoid başlanmaz.'
    ],
    prospectRecommendations: [
      'PROSPECT Complex Spine (Waelkens et al., EJA 2021): Parasetamol + kısa süreli NSAİİ/COX-2 + yara yeri LA infiltrasyonu/ESPB + intraoperatif IV Ketamin (Grade A) temel multimodal stratejidir; bazalsız IV PCA kurtarma olarak kullanılır, rutin gabapentinoid önerilmez.'
    ],
    erasRecommendations: [
      'ERAS Omurga Cerrahisi Kılavuzları (Debono et al., Spine J 2021):',
      '  - Preop Hazırlık: ≥ 4 hafta sigara bırakma, PBM anemi taraması, 2 saat önce berrak CHO ve multimodal POBV profilaksisi.',
      '  - Postoperatif Nörolojik & Görme İzlemi: İlk 24 saat saatlik motor/duyu muayenesi (C5 kök felci ve epidural hematom) + vizyon takibi.',
      '  - Glisemik Hedef (140–180 mg/dL), Foley Sondanın Postop 1. Günde Erken Çekilmesi, Subfasial Dren Takibi (BOS kaçağı/kanama) ve Postop 1. Günde Boyunluk ile Erken Mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Neurosurgery — Spine Surgery: Posterior Cervical Spine Procedures. Philadelphia: Wolters Kluwer.',
    erasReference: 'Debono, B., Wainwright, T. W., Wang, M. Y., et al. (2021). Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations. The Spine Journal, 21(5), 729-752.',
    prospectReference: 'Waelkens, P., Alsabbagh, E., Sauter, A., Joshi, G. P., & Beloeil, H.; PROSPECT Working Group (2021). Pain management after complex spine surgery: A systematic review and procedure-specific postoperative pain management recommendations. European Journal of Anaesthesiology, 38(9), 985-994.',
    otherReferences: [
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss (2019). Practice Advisory for Perioperative Visual Loss Associated with Spine Surgery 2019. Anesthesiology, 130(1), 12-30.',
      'Fehlings, M. G., et al. (2024). AO Spine / Praxis Clinical Practice Guideline for the Management of Acute Spinal Cord Injury: Hemodynamic Management. Global Spine Journal, 14(3_suppl).',
      'Kaloostian, P. E., et al. (2014). Posterior cervical laminectomy and fusion: a systematic review and meta-analysis. Global Spine Journal, 4(3), 163-172.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Clinical Consensus on Intraoperative Neuromonitoring and Hemodynamic Management in Cervical Spine Surgery.'
    ]
  }
};
