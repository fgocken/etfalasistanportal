import { ProcedureDefinition } from '../../types/procedures';

/**
 * Spontan İntraserebral Hemoraji (İSH) Cerrahisi: Minimal İnvaziv Hematom Tahliyesi (ENRICH) & Dekompresif Kraniyektomi (SWITCH)
 *
 * AHA/ASA 2022 Spontan İSH Kılavuzu (Greenberg et al., Stroke 2022), ENRICH (NEJM 2024) ve
 * SWITCH (Lancet 2024) çalışmaları referans alınarak yapılandırılmıştır.
 */
export const intracerebralHemorrhageEvacuation: ProcedureDefinition = {
  id: 'intracerebral-hemorrhage-evacuation',
  name: 'Spontan İntraserebral Hemoraji Cerrahisi (Minimal İnvaziv / Dekompresif)',
  shortCode: 'İSH-ENRICH-DEKOMP',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Acil Nörovasküler Nöroşirürji',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description:
    'Hipertansif mikroanjiyopati, serebral amiloid anjiyopati veya antikoagülan kullanımı zemininde gelişen spontan intraparankimal beyin kanamalarında; kitle etkisini ve sekonder beyin hasarını azaltmak amacıyla uygulanan minimal invaziv transsulkus parafasiküler hematom tahliyesi (MIPS — ENRICH 2024), açık kraniyotomi/hematom tahliyesi veya dekompresif hemikraniektomi (SWITCH 2024) ameliyatıdır.',
  indications: [
    'Supratentoryal lober spontan İSH (30–80 mL): Semptom başlangıcından itibaren ilk 24 saat içinde nöronavigasyon eşliğinde erken minimal invaziv parafasiküler cerrahi (MIPS) ile hematom tahliyesi (ENRICH, NEJM 2024)',
    'Serebellar (posterior fossa) İSH (>3 cm çap, beyin sapı basısı veya obstrüktif hidrosefali): Acil suboksipital dekompresyon ve hematom boşaltılması (AHA/ASA 2022 Sınıf I hayat kurtarıcı öneri)',
    'Geniş derin (bazal ganglia / talamik) supratentoryal İSH ve dirençli KİBAS: Seçilmiş olgularda mortalite ve ağır sakatlık bileşkesini azaltmak amacıyla dekompresif hemikraniektomi (SWITCH, Lancet 2024 — hasta/aile hedeflerine göre bireyselleştirilmiş)',
    'İntraventriküler kanama (IVH) ve akut hidrosefali eşlik eden olgularda eksternal ventriküler drenaj (EVD) yerleşimi'
  ],
  averageDuration: '90 - 180 dk (Minimal invaziv ENRICH: 90-120 dk; Dekompresif hemikraniektomi: 120-180 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 600 mL (Minimal invaziv tahliyede 150-300 mL; geniş dekompresif hemikraniektomi veya koagülopatik olgularda 500-1000+ mL)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk (Aktif Hematom Genişlemesi & Koagülopati)',
    crossMatchRequirement: 'En az 2-4 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalı; antikoagülan kullananlarda 4F-PCC / Idarucizumab derhal temin edilmelidir',
    transfusionProbability: '%20 - %40 (Dekompresif kraniyektomi ve koagülopatik hastalarda daha yüksek)',
    criticalBleedingSources: [
      'Hematom kavitesi duvarındaki frajil perforan arterler veya serebral amiloid anjiyopatili (CAA) kortikal damarlar',
      'Tam geri çevrilmemiş antikoagülasyon veya tüketim koagülopatisine bağlı yaygın parankimal sızıntı',
      'Dekompresif hemikraniektomide büyük skalp flebi, temporal kas ve dural sinüs komşuluğundan kanama'
    ],
    hemostasisStrategies: [
      'AHA/ASA 2022 Acil Antikoagülan Geri Çevirme: Warfarin (INR > 1.4) için 4F-PCC + IV Vitamin K; Dabigatran için Idarucizumab; FXa inhibitörleri için Andexanet alfa veya 4F-PCC',
      'Antiplatelet kullanan ve ACİL cerrahiye alınan seçilmiş olgularda trombosit transfüzyonu (cerrahi dışı İSH\'de PATCH çalışması gereği rutin trombosit transfüzyonu zararlıdır ve yapılmaz!)',
      'Sıkı kan basıncı kontrolü (SKB 130–140 mmHg), mikroskop/ekzoskop altında bipolar hemostaz ve topikal hemostatik ajanlar'
    ]
  },

  // 3) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi (GETA — Propofol/Remifentanil TIVA veya <0.8 MAC Sevofluran + Remifentanil) + Kontrollü Mekanik Ventilasyon'
    ],
    alternative: [
      'Hemodinamik instabilite veya derin koma (GKS ≤ 6) durumunda Etomidat/Ketamin (dikkatli titre) veya düşük doz opioid-tabanlı dengeli genel anestezi'
    ],
    clinicalRationale:
      'Spontan İSH hastaları yüksek KİBAS, hematom genişleme riski, aspirasyon tehlikesi ve ciddi hipertansiyon krizleriyle başvurur. GETA; hava yolu güvenliğini, PaCO2 optimizasyonunu, nöronavigasyon için hareketsizliği ve kan basıncının milimetrik titrasyonunu (SKB 130–140 mmHg) sağlar.',
    notes:
      'AHA/ASA 2022 İSH kılavuzuna göre SKB 130–140 mmHg hedeflenir ancak ani >60 mmHg düşüşten kaçınılır. Steroidler (Deksametazon) İSH\'de KESİNLİKLE KULLANILMAZ (enfeksiyon ve hiperglisemiyi artırır, faydası yoktur). ENRICH (NEJM 2024) lober İSH\'de erken minimal invaziv yaklaşımı, SWITCH (Lancet 2024) ise seçilmiş ağır derin İSH\'de dekompresif kraniyektomiyi tanımlamıştır.',
    rulesTitle: 'SPONTAN İSH CERRAHİSİNDE VAZGEÇİLMEZ 5 KURAL',
    indispensableRules: [
      {
        number: 1,
        title: 'AHA/ASA 2022 KAN BASINCI HEDEFİ: SKB 130–140 mmHg (ANİ >60 mmHg DÜŞÜŞ YOK!)',
        content: 'SKB 150–220 mmHg ile başvuran hastalarda hematom genişlemesini durdurmak için SKB pürüzsüz biçimde 130–140 mmHg aralığına indirilir ve değişkenlik (variability) minimize edilir. İlk 1 saatte >60 mmHg ani düşüş veya SKB <130 mmHg agresif düşüş renal ve perihematomal serebral iskemiye yol açtığı için ZARARLIDIR.'
      },
      {
        number: 2,
        title: 'ANTİKOAGÜLANI DAKİKALAR İÇİNDE GERİ ÇEVİR (4F-PCC / IDARUCIZUMAB)',
        content: 'İSH\'de en güçlü mortalite belirleyicisi hematom genişlemesidir. Warfarin (INR > 1.4) için 4F-PCC + IV Vitamin K, Dabigatran için Idarucizumab, FXa inhibitörleri için Andexanet alfa/4F-PCC laboratuvar doğrulamasını beklemeden hızla uygulanmalıdır.'
      },
      {
        number: 3,
        title: 'STEROİDLER KESİNLİKLE KONTRENDİKEDİR — OZMOTERAPİ VE NORMOKAPNİ UYGULA',
        content: 'Spontan İSH\'de kortikosteroidlerin (Deksametazon) beyin ödemini azaltıcı yararı yoktur; aksine enfeksiyon, hiperglisemi ve mortaliteyi artırır (AHA/ASA 2022 Sınıf III - Zararlı). KİBAS kontrolü %3 Hipertonik Salin / Mannitol, baş elevasyonu (30°) ve normokapni (PaCO2 35–40 mmHg; yalnızca akut herniasyonda geçici 30–35 mmHg) ile sağlanır.'
      },
      {
        number: 4,
        title: 'NORMOGLİSEMİ (140–180 mg/dL) VE NORMOTERMİ (36–37°C)',
        content: 'Hem hiperglisemi (>180 mg/dL) hem de hipoglisemi (<70 mg/dL) sekonder nöronal hasarı ağırlaştırır. Ateş (>37.5°C) CMRO2 ve KİBAS\'ı fırlattığından agresif normotermi korunmalıdır; N2O kesinlikle kullanılmaz.'
      },
      {
        number: 5,
        title: 'CERRAHİ STRATEJİYE UYGUN ANESTEZİ (ENRICH vs SWITCH)',
        content: 'Lober İSH\'de minimal invaziv tahliyede (ENRICH 2024) daha kısa cerrahi, daha az kanama ve seçilmiş olgularda erken nörolojik değerlendirme ön plandadır. Derin İSH dekompresif kraniyektomide (SWITCH 2024) ise masif beyin ödemi, büyük kemik flebi kaybı, ani dekompresyon hipotansiyonu ve postop Nöro-YBÜ entübe takibi esastır.'
      }
    ]
  },

  // 4) Pre-operatif hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji & Nöro-YBÜ: Hematom hacmi (ABC/2), lokalizasyon (lober vs derin vs serebellar), IVH/hidrosefali varlığı, cerrahi yaklaşım (MIPS/ENRICH vs açık vs dekompresif/SWITCH) ve postop YBÜ yatağı netleştirilir.',
      'Hematoloji / Kardiyoloji (Gerektiğinde): Mekanik kapak veya kompleks antikoagülan geri çevirme + ciddi hipertansif kalp hastalığı / EKG değişikliklerinin yönetimi.'
    ],
    historyAndPhysical: [
      'Nörolojik Durum ve İSH Skoru: Başlangıç GKS, pupiller yanıt/anizokori (herniasyon bulgusu), hemipleji ve solunum paterni kaydedilir.',
      'Kan Basıncı Trendi ve İlaçlar: Başvuru SKB değeri, başlatılmış IV antihipertansifler (Nikardipin, Clevidipin, Labetalol) ve son antikoagülan/antiplatelet alım zamanı sorgulanır.',
      'Serebellar İSH\'de Beyin Sapı Bulguları: Ani bilinç kapanması, apne, bradikardi veya alt kranial sinir felci (aspirasyon riski) değerlendirilir.'
    ],
    laboratoryAndTests: [
      'Acil Koagülasyon Paneli (PT, INR, aPTT, Fibrinojen), Tam Kan Sayımı (Hb, Trombosit), Kan Grubu / Cross-Match.',
      'Kan Glukozu, Serum Elektrolitleri (Na+, K+), Kreatinin, Karaciğer Enzimleri ve 12 Derivasyonlu EKG (sekonder nörokardiyak ST-T/QT değişiklikleri).',
      'Beyin BT + BT Anjiyografi: Altta yatan anevrizma, AVM, venöz sinüs trombozu veya "spot sign" (aktif kontrast ekstravazasyonu = yüksek genişleme riski) değerlendirmesi.'
    ]
  },

  // 5) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line — tragus/Foramen Monro seviyesinde sıfırlanmış): SKB 130–140 mmHg hedefinin dalgalanmasız korunması ve ani >60 mmHg düşüşün önlenmesi için zorunludur (indüksiyon öncesi veya acil herniasyonda indüksiyona eşzamanlı).',
      'Standart ASA monitörizasyonu: 5 derivasyonlu EKG, SpO2, sürekli EtCO2, özofageal/mesane ısı probu ve saatlik idrar çıkışı (ozmoterapi diürezi).',
      'Seri AKG, Serum Sodyum, Kan Glukozu (saatlik; hedef 140–180 mg/dL) ve Hb/Hct takibi.',
      'İşlenmiş EEG/BIS ve Nöromusküler Monitörizasyon (TOF); mevcutsa EVD/ICP monitörü.'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı periferik IV kateter (16G–18G).',
      'İnvaziv Radyal Arter Kateteri.',
      'Vazoaktif infüzyonlar (Nikardipin/Noradrenalin) ve hipertonik salin (%3 NaCl) infüzyonu gerektiren ağır olgularda Santral Venöz Kateter (CVC — cerrahiyi GECİKTİRMEDEN!).'
    ],
    patientPosition: 'Supratentoryal/MIPS olgularında Supine (baş Mayfield çivili, 15–30° elevasyon); Serebellar İSH olgularında Prone veya 3/4 Prone (Park-Bench).',
    patientPositionDetails: [
      'Başın 15–30° elevasyonu ve boynun nötral/hafif rotasyonu ile juguler venöz drenajın kesinlikle engellenmemesi sağlanır.',
      'Mayfield çivi yerleşiminde ani SKB yükselmesini (hematom genişleme riski!) önlemek için çivi yerlerine lokal anestezik + ek Remifentanil/Propofol bolusu uygulanır.',
      'Serebellar İSH için prone pozisyonda gözler, göğüs/pelvis yastıkları ve serbest karın kontrol edilir.'
    ],
    anesthesiaManagement: [
      'Hemodinamik Kontrollü İndüksiyon: Akut İSH hastası tam mide kabul edilerek modifiye RSI uygulanır. Laringoskopi sırasındaki SKB pikini önlemek için IV Lidokain (1.5 mg/kg), Remifentanil/Fentanil ve titre Propofol (veya Etomidat) + Rokuronyum (1.0–1.2 mg/kg) kullanılır.',
      'İdame: Propofol/Remifentanil TIVA veya <0.8 MAC Sevofluran + Remifentanil. Azot Protoksit (N2O) KESİNLİKLE KULLANILMAZ.',
      'Sıkı Kan Basıncı Titrasyonu (AHA/ASA 2022): Hedef SKB 130–140 mmHg (MAP genellikle 75–90 mmHg; ancak KİBAS çok yüksekse CPP ≥ 60–70 mmHg gözetilir). Hipertansiyonda kısa etkili titre edilebilir IV Nikardipin, Esmolol veya Labetalol kullanılır; Nitroprussid ve Nitrogliserin serebral vazodilatasyonla KİBAS\'ı artırdığından TERCİH EDİLMEZ.',
      'Ozmoterapi ve Beyin Gevşemesi: Dura açılışı öncesi yüksek KİBAS varsa %3 Hipertonik Salin (150–250 mL IV) veya Mannitol (0.5–1 g/kg IV) uygulanır. Steroid (Deksametazon) KULLANILMAZ!',
      'Ventilasyon ve Sıvı Yönetimi: Normokapni (PaCO2 35–40 mmHg; akut herniasyonda geçici 30–35 mmHg). Yalnızca izotonik, glukozsuz dengeli kristaloid/%0.9 NaCl ile övolemi sağlanır (hipotonik sıvılar beyin ödemini artırır).'
    ],
    airwayManagement: [
      'Modifiye RSI ile videolaringoskop eşliğinde güvenli orotrakeal entübasyon (spiral/armored ETT özellikle prone serebellar İSH olgularında tercih edilir).',
      'Ekstübasyon Kararı: Dekompresif hemikraniektomi (SWITCH), preop GKS < 9, serebellar beyin sapı basısı veya ciddi beyin ödemi olan olgular KESİNLİKLE entübe ve sedatize olarak Nöro-YBÜ\'ye devredilir. Yalnızca preop bilinci açık, komplikasyonsuz minimal invaziv lober İSH (ENRICH) olgularında seçilmiş erken ekstübasyon değerlendirilebilir.'
    ],
    criticalSurgicalStages: [
      'Mayfield Çivileme ve İnsizyon: Sempatik hipertansiyon piki hematomu büyütebilir -> derin anestezi + skalp lokal infiltrasyonu.',
      'Dura Açılışı ve Dekompresyon Anı: Yüksek KİBAS aniden serbestlediğinde sempatik tonus kaybına bağlı ani ve derin HİPOTANSİYON gelişebilir! Noradrenalin/Fenilefrin ve sıvı bolusu hazır tutulur.',
      'Hematom Boşaltılması ve Kavite Hemostazı: Cerrah kavite hemostazını test ederken kan basıncı hedef aralıkta (SKB 130–140 mmHg) stabil tutularak gizli kanama odakları açığa çıkarılır.',
      'Dekompresif Kraniyektomi Kapanışı (SWITCH): Geniş duraplasti ve kemik flebi olmadan gerilimsiz skalp kapatılması; postop beyin ödemi takibi için ICP probu/EVD yerleşimi.'
    ],
    emergenceNotes: [
      'Çoğu geniş İSH ve dekompresif kraniyektomi olgusu Nöro-YBÜ\'ye entübe transfer edilir (transfer sırasında monitörizasyon, sedasyon ve SKB 130–140 mmHg kontrolü kesintisiz sürdürülür).',
      'Seçilmiş minimal invaziv (ENRICH) olgularda ekstübasyon planlanıyorsa öksürük/ıkınma ve hipertansiyon piki IV Lidokain / düşük doz Remifentanil ile önlenir; ekstübasyon sonrası acil nörolojik muayene kaydedilir.'
    ]
  },

  // 6) Post-operatif yönetim
  postoperative: {
    painManagement: [
      'Skalp bloğu / insizyonel lokal anestezik infiltrasyonu + düzenli IV Parasetamol (1 g q6h) multimodal analjezinin temelidir.',
      'Taze intrakraniyal kanama nedeniyle rutin non-selektif NSAİİ\'ler KESİNLİKLE KONTRENDİKEDİR.',
      'Nöbet eşiğini düşüren ve nörolojik muayeneyi bozan Tramadol ve Kodein kullanılmaz; entübe YBÜ olgularında kısa etkili Remifentanil/Fentanil, uyanık olgularda mikro-doz IV Fentanil titre edilir.'
    ],
    erasRecommendations: [
      'Nöro-YBÜ\'de Sürekli Hemodinamik & ICP İzlemi: SKB 130–140 mmHg hedefi (değişkenlikten kaçın), CPP 60–70 mmHg, normotermi (<37.5°C) ve normoglisemi (140–180 mg/dL).',
      'VTE Profilaksisi: İlk günden itibaren intermittan pnömatik kompresyon (IPC); kontrol BT\'de hematom stabilitesi doğrulandıktan 24–48 saat sonra düşük doz profilaktik heparin/LMWH değerlendirilir (AHA/ASA 2022).',
      'Nöbet Yönetimi: Rutin profilaktik antiepileptik önerilmez; ancak klinik nöbet veya açıklanamayan bilinç değişikliğinde cEEG ve Levetirasetam tedavisi uygulanır.',
      'Erken Kontrol Beyin BT (rezidüel hematom / yeniden kanama) ve disfaji taraması.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference:
      "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. Anesthesiologist's Manual of Surgical Procedures (5th/6th ed.). Craniotomy for Intracerebral Hematoma / Decompressive Craniectomy. Wolters Kluwer.",
    otherReferences: [
      'Greenberg, S. M., et al. (2022). 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage: A Guideline From the American Heart Association/American Stroke Association (AHA/ASA). Stroke, 53(7), e282–e361.',
      'Pradilla, G., et al. (2024). Trial of Early Minimally Invasive Removal of Intracerebral Hemorrhage (ENRICH). New England Journal of Medicine, 390(14), 1277–1289.',
      'Beck, J., et al. (2024). Decompressive craniectomy plus best medical treatment versus best medical treatment alone for spontaneous severe deep supratentorial intracerebral haemorrhage: a randomised controlled clinical trial (SWITCH). The Lancet, 403(10442), 2395–2404.',
      'Baharoglu, M. I., et al. (2016). Platelet transfusion versus standard care after acute stroke due to spontaneous cerebral haemorrhage associated with antiplatelet therapy (PATCH). The Lancet, 387(10038), 2605–2613.',
      "Cottrell, J. E., & Patel, P. Cottrell and Patel's Neuroanesthesia (6th ed.). Management of Intracranial Hypertension and Intracerebral Hemorrhage. Elsevier."
    ]
  }
};
