import { ProcedureDefinition } from '../../types/procedures';

/**
 * Endovasküler İntrakraniyal Anevrizma Koilleme, Akım Yönlendirici (Flow Diverter) ve AVM/dAVF Embolizasyonu
 *
 * AHA/ASA 2023 Anevrizmal SAK Kılavuzu (Hoh et al., Stroke 2023), SNACC Nörogirişimsel Radyoloji
 * Uzlaşı Önerileri ve güncel nöroanestezi standartları referans alınarak yapılandırılmıştır.
 */
export const endovascularAneurysmCoilingEmbolization: ProcedureDefinition = {
  id: 'endovascular-aneurysm-coiling-embolization',
  name: 'Endovasküler Anevrizma Koilleme, Akım Yönlendirici ve AVM Embolizasyonu',
  shortCode: 'NİV-KOİL-AVM',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Nörogirişimsel Radyoloji (NİV)',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description:
    'Günümüzde rüptüre ve insidental intrakraniyal anevrizmaların %70–80\'inden fazlasında birincil tedavi olan; femoral/radyal arteriyel erişimle mikrokateter üzerinden platin koil, balon/stent destekli koilleme, intrasakküler cihaz (WEB) veya akım yönlendirici (flow diverter) yerleştirilmesi ile serebral AVM/dAVF lezyonlarının sıvı embolizan (Onyx/DMSO, n-BCA) ile kapatılması işlemidir.',
  indications: [
    'Akut rüptüre anevrizmal subaraknoid kanama (aSAH): Yeniden kanamayı (rebleeding) önlemek için ilk 24 saat içinde acil endovasküler koilleme (AHA/ASA 2023 Sınıf I öneri)',
    'Rüptüre olmamış yüksek riskli anevrizmalar: Posterior sirkülasyon (baziler tepe, PICA), kavernöz/paraklinoid ICA veya cerrahiye yüksek riskli anevrizmalarda koilleme / akım yönlendirici (flow diverter) stentleme',
    'Geniş boyunlu veya fuziform anevrizmalarda balon/stent yardımlı koilleme ya da intrasakküler akım bozucu cihaz uygulaması',
    'Serebral Arteriovenöz Malformasyon (AVM) ve Dural Arteriovenöz Fistül (dAVF): Cerrahi/radyocerrahi öncesi nidus küçültme veya küratif amaçlı Onyx (DMSO) / n-BCA sıvı embolizasyonu'
  ],
  averageDuration: '90 - 180 dk (Tanısal DSA + yol haritalama + koilleme/embolizasyon)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 - 100 mL (Komplikasyonsuz perkütan işlem); ancak intraprocedural anevrizma rüptürü veya AVM nidus perforasyonu halinde dakikalar içinde masif intrakraniyal hemoraji ve KİBAS krizi gelişebilir',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta (Potansiyel Katastrofik İntrakraniyal Rüptür Riski)',
    crossMatchRequirement: 'Kan grubu ve T&S (Rüptüre SAK veya dev AVM olgularında 2 Ünite ES Cross-Match hazır bulundurulmalıdır)',
    transfusionProbability: '< %5 (Retroperitoneal hematom veya rüptür sonrası acil kraniyotomiye dönüşüm dışında)',
    criticalBleedingSources: [
      'İntraprosedürel anevrizma rüptürü (IAR): Mikrokateter, kılavuz tel veya ilk koil yerleştirilirken kubbe perforasyonu (yüksek mortalite riski)',
      'AVM embolizasyonu sırasında erken venöz drenaj tıkanmasına bağlı nidus basıncı artışı ve parankimal/intraventriküler kanama',
      'Sistemik heparinizasyon + ikili antiplatelet (DAPT) altında femoral arter ponksiyon yeri veya retroperitoneal hematom'
    ],
    hemostasisStrategies: [
      'İntraprosedürel Rüptürde Derhal Antikoagülasyon Geri Çevrimi: IV Protamin Sülfat (1 mg / 100 U heparin — yavaş IV bolus, anafilaksi/hipotansiyona dikkat!)',
      'Anevrizma rüptüründe girişimsel radyologun balonla geçici oklüzyon ve hızlı koil paketlemesine eşzamanlı SKB\'nin hızla düşürülmesi (SKB <120–130 mmHg), ozmoterapi ve acil EVD yerleşimi',
      'İntraprosedürel Tromboembolide: ACT kontrolü, ek heparin, MAP artışı ve girişimsel radyolog ile koordineli IV/IA GP IIb/IIIa inhibitörü (Tirofiban/Eptifibatid) veya IV Cangrelor uygulanması'
    ]
  },

  // 3) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi (GETA — Propofol/Remifentanil TIVA veya <0.8 MAC Sevofluran + Remifentanil) + Sürekli Nöromusküler Blokaj: Yüksek çözünürlüklü DSA yol haritalaması (roadmapping) için mutlak hareketsizlik ve kontrollü apne sağlar'
    ],
    alternative: [
      'Yüksek doz opioid + düşük MAC dengeli genel anestezi: Ciddi aSAH ilişkili nörojenik kardiyomiyopati veya hemodinamik kırılganlığı olan olgularda'
    ],
    clinicalRationale:
      'DSA yol haritalaması sırasında milimetrik baş hareketi veya solunum artefaktı, mikrokateterin anevrizma kubbesini delmesine yol açabilir. Bu nedenle entübe genel anestezi, derin nöromusküler blokaj ve kontrollü apne altın standarttır; ayrıca ani rüptür veya tromboemboli geliştiğinde hava yolu, PaCO2 ve kan basıncının saniyeler içinde yönetilmesini sağlar.',
    notes:
      'Girişimsel nörovasküler işlemlerde anesteziyolog iki zıt felakete aynı anda hazır olmalıdır: İntraprosedürel anevrizma rüptürü (derhal Protamin + SKB düşüşü + EVD) ve intraprocedural tromboz (ACT 250–300 sn idamesi, DAPT/Cangrelor/Tirofiban, MAP artışı). AHA/ASA 2023 aSAH kılavuzu övolemiyi vurgular; rutin TXA ve rutin hipotermi önerilmez.',
    rulesTitle: 'ENDOVASKÜLER KOİLLEME & EMBOLİZASYONDA VAZGEÇİLMEZ 5 KURAL',
    indispensableRules: [
      {
        number: 1,
        title: 'DSA YOL HARİTASI İÇİN MUTLAK HAREKETSİZLİK VE APNE KONTROLÜ',
        content: 'Mikrokateter ve koil ilerletilirken öksürük, spontan solunum eforu veya 1 mm baş hareketi bile rüptüre yol açabilir. Sürekli nöromusküler blokaj (TOF 0–1) sağlanmalı ve DSA çekimlerinde cerrah/radyolog komutuyla kontrollü ekspiryum sonu apne uygulanmalıdır.'
      },
      {
        number: 2,
        title: 'SİSTEMİK HEPARİNİZASYON (ACT 250–300 sn) VE DAPT KOORDİNASYONU',
        content: 'Bazal ACT alındıktan sonra kılavuz kateter yerleşince (rüptüre olgularda sıklıkla ilk koil sonrası) IV Heparin (70–100 U/kg) ile ACT 250–300 sn (bazalin 2–2.5 katı) aralığında tutulur ve 45–60 dk\'da bir ölçülür. Stent/akım yönlendirici olgularda preop DAPT (Aspirin + Klopidogrel/Tikagrelor/Prasugrel) veya intraop IV Cangrelor/Tirofiban protokolü teyit edilir.'
      },
      {
        number: 3,
        title: 'İNTRAPROSEDÜREL RÜPTÜR VE TROMBOZ ACİL REFLEKSLERİ',
        content: 'Rüptürde (ani hipertansiyon, Cushing bradikardisi, kontrast ekstravazasyonu): Derhal 1 mg/100 U heparin IV Protamin ver, SKB\'yi hızla düşür, Mannitol/HTS uygula ve acil EVD hazırlığı yap. Trombozda: ACT\'yi kontrol et, kollateral perfüzyon için MAP\'ı bazalin %15–20 üzerine çıkar ve IV/IA Tirofiban veya Cangrelor uygula.'
      },
      {
        number: 4,
        title: 'ONYX / DMSO TOKSİSİTESİNE VE KONTRAST NEFROPATİSİNE DİKKAT',
        content: 'AVM/dAVF embolizasyonunda kullanılan DMSO çözücüsü non-kardiyojenik pulmoner ödem, akut hipoksemi, bronkospazm, trigeminokardiyak bradikardi ve SpO2 okuma artefaktına neden olabilir (yavaş enjeksiyon, FiO2 artışı, Atropin hazır). İzotonik hidrasyon ile kontrast nefropatisi önlenmeli ve kontrast hacmi izlenmelidir.'
      },
      {
        number: 5,
        title: 'AHA/ASA 2023 aSAH STANDARTLARI: ÖVOLEMİ — RUTİN TXA/HİPOTERMİ YOK',
        content: 'Rüptüre aSAH olgularında anevrizma kapanana kadar SKB <160 mmHg (ani piklerden kaçın) tutulur, övolemi korunur ve enteral Nimodipin aksatılmaz. AHA/ASA 2023 kılavuzu gereği rutin antifibrinolitik (TXA) ve rutin terapötik hipotermi ÖNERİLMEZ; N2O kesinlikle kullanılmaz.'
      }
    ]
  },

  // 4) Pre-operatif hazırlık
  preoperative: {
    consultations: [
      'Girişimsel Nöroradyoloji & Nöroşirürji: Anevrizma/AVM anatomisi, rüptür durumu (Hunt-Hess / WFNS / mFisher), planlanan cihaz (koil vs stent/flow diverter vs Onyx) ve acil EVD gereksinimi değerlendirilir.',
      'Kardiyoloji (Rüptüre aSAH olgularında): Nörojenik stres kardiyomiyopatisi, Troponin yüksekliği, EKG\'de QT uzaması/ST-T değişiklikleri ve gerekirse yatak başı EKO.'
    ],
    historyAndPhysical: [
      'Nörolojik Durum ve KİBAS: Bazal GKS, fokal defisit, meningeal irritasyon, akut hidrosefali ve mevcut EVD varlığı/drenaj düzeyi (EVD işlem sırasında kazara aşırı drenaj yapmaması için yüksekliği kontrol edilmeli veya kapatma protokolü netleştirilmelidir).',
      'Antiplatelet / Antikoagülan Durumu: Elektif stent veya akım yönlendirici (flow diverter) hastalarında 5–7 günlük ikili antiplatelet (DAPT) uyumu ve varsa P2Y12 trombosit fonksiyon testi (VerifyNow/PRU) sonucu doğrulanır.',
      'Kontrast Allerjisi ve Renal Fonksiyon: Önceki iyotlu kontrast reaksiyonu (gerekirse steroid/antihistaminik premedikasyon) ve kronik böbrek hastalığı öyküsü.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı, Kreatinin/eGFR, Serum Elektrolitleri (aSAH\'ta CSWS/SIADH kaynaklı hiponatremi taraması), bazal PT/INR/aPTT ve bazal ACT.',
      'Elektif stent/flow diverter olgularında P2Y12 inhibisyon testi (PRU hedef aralığı); rüptüre aSAH\'ta 12 derivasyonlu EKG, Troponin ve Kan Grubu/Cross-Match.'
    ]
  },

  // 5) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line — indüksiyon ÖNCESİ takılması rüptüre aSAH ve büyük AVM\'lerde altın standarttır; transmural basınç kontrolü ve seri ACT/AKG örneklemesi için).',
      'Standart ASA monitörizasyonu: 5 derivasyonlu EKG, SpO2, sürekli EtCO2 (PaCO2 35–38 mmHg), özofageal/mesane ısı probu ve saatlik idrar çıkışı (kontrast kaynaklı ozmotik diürez + yıkama sıvısı yükünü izlemek için).',
      'Seri ACT (Activated Clotting Time): Bazal, heparin sonrası 5. dakika ve ardından her 45–60 dakikada bir.',
      'Nöromusküler Monitörizasyon (TOF — işlem boyunca mutlak hareketsizlik takibi) ve işlenmiş EEG/BIS.',
      'Mevcut EVD varsa ICP dalga formu takibi (intraprosedürel rüptürü anında saptamada çok değerlidir).'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı periferik IV kateter (16G–18G) — biri vazoaktif ajanlar/acil Protamin için ayrılmış, uzatma hatlı.',
      'İnvaziv Radyal Arter Kateteri (indüksiyon öncesi).',
      'Yüksek gradeli aSAH (WFNS IV-V), vazopresör bağımlılığı veya nörojenik kardiyomiyopatide santral venöz kateter (CVC).'
    ],
    patientPosition: 'Supine (Sırtüstü), biplan DSA anjiyografi masasında baş nötral ve hareket etmeyecek şekilde bant/yastıkla sabitlenmiş.',
    patientPositionDetails: [
      'Anjiyografi masası ve C-kollu tüp hareket edeceğinden solunum devresi, IV hatlar ve A-line uzatmaları gergin olmayacak şekilde uzun ve düzenli sabitlenmelidir.',
      'Tüm basınç noktaları (topuklar, dirsekler, oksiput) silikon pedlerle korunur; mesane sondası yerleştirilir (radyoloji kateter yıkama sıvıları ciddi hacim yükü ve mesane distansiyonu yaratabilir!).',
      'Radyasyon Koruması (ALARA): Kurşun önlük, tiroid koruyucu, dozimetre ve mobil kurşun paravan kullanımı zorunludur.'
    ],
    anesthesiaManagement: [
      'Pürüzsüz İndüksiyon: Laringoskopi hipertansiyonu anevrizmayı rüptüre edebilir! IV Lidokain (1.5 mg/kg), Remifentanil/Fentanil, Propofol ve Rokuronyum (0.8–1.0 mg/kg) ile sempatik yanıt tamamen baskılanır.',
      'İdame ve Nöromusküler Blokaj: Propofol/Remifentanil TIVA veya <0.8 MAC Sevofluran + Remifentanil; sürekli veya düzenli aralıklı Rokuronyum ile TOF 0–1 korunur. Azot Protoksit (N2O) KULLANILMAZ (hava embolisi ve pnömosefali riski).',
      'Hemodinamik Hedefler: Anevrizma güvenli şekilde kapatılana kadar rüptüre aSAH\'ta SKB <160 mmHg (ideal 110–140 mmHg) ve ani piklerden kaçınma; kapatıldıktan sonra normotansiyon (vazospazm varsa bireyselleştirilmiş yüksek MAP). AVM embolizasyonunda normal perfüzyon basıncı kırılması (NPPB) kanamasını önlemek için embolizasyon sonrası sıkı normotansiyon / hafif kontrollü hipotansiyon (bazalin %10–15 altı) hedeflenir.',
      'Heparinizasyon & Antiplatelet Yönetimi: Radyolog talebiyle IV Heparin (70–100 U/kg; hedef ACT 250–300 sn). Akut stent/flow diverter gerekirse IV Cangrelor (30 mcg/kg bolus + 4 mcg/kg/dk infüzyon) veya Tirofiban protokolü uygulanır.',
      'Sıvı Dengesi ve Kontrast Koruması: Girişimsel radyologun kateter yıkama (heparinli flush) sıvıları 1–2 L\'yi bulabilir; toplam sıvı dengesi hesaplanarak övolemi korunur ve aşırı hipervolemi/pulmoner ödem önlenir.'
    ],
    airwayManagement: [
      'Güvenli orotrakeal entübasyon (mümkünse bükülmeye dirençli/spiral tüp; kafa hareketi ve C-kollu temas riskine karşı sıkı sabitleme).',
      'Rüptüre olmayan elektif olgular ve düşük gradeli (WFNS I-II) komplike olmamış aSAH olguları işlem sonunda masada pürüzsüz ekstübe edilir.',
      'İntraprosedürel rüptür, yüksek gradeli aSAH (WFNS IV-V), ciddi beyin ödemi veya Onyx sonrası hipoksemi gelişen olgular entübe olarak Nöro-YBÜ\'ye devredilir.'
    ],
    criticalSurgicalStages: [
      'Kılavuz Kateter Yerleştirilmesi ve Sistemik Heparinizasyon: ACT 250–300 sn doğrulaması; karotis/vertebral arter vazospazmı takibi.',
      'Mikrokateterizasyon ve İlk Koil / Flow Diverter Yerleştirilmesi: İntraprosedürel rüptür açısından en kritik faz; mutlak hareketsizlik ve kontrollü apne.',
      'İntraprosedürel Rüptür Krizi: Kontrast ekstravazasyonu veya ani KİBAS/bradikardi -> Derhal IV Protamin (1 mg/100 U heparin), SKB <120–130 mmHg, %3 HTS/Mannitol, FiO2 %100 ve nöroşirürji/EVD aktivasyonu.',
      'İntraprosedürel Tromboz Krizi: Ana dalda pıhtı -> ACT kontrolü, MAP artışı, IV/IA Tirofiban veya Cangrelor.',
      'AVM\'de Onyx/DMSO Enjeksiyonu: DMSO verildiğinde sarımsak kokusu, ani trigeminokardiyak bradikardi, geçici SpO2 düşüşü/artefaktı veya pulmoner ödem gelişebilir; hemodinami ve oksijenasyon yakın izlenir.'
    ],
    emergenceNotes: [
      'Öksürük ve ıkınma (bucking) hem yeni kapatılmış anevrizma/AVM\'de kanamayı hem de antikoagüle hastada femoral kasık hematomunu tetikler! Remifentanil düşük doz infüzyonu veya IV Lidokain (1–1.5 mg/kg) eşliğinde pürüzsüz ekstübasyon uygulanır.',
      'Ekstübasyon öncesi nöromusküler blokaj Sugammadeks ile tam geri çevrilir (TOF ≥ 0.90).',
      'Masadan ayrılmadan hemen önce pupiller, bilinç düzeyi, konuşma ve dört ekstremite motor muayenesi yapılarak kaydedilir; yeni fokal defisit saptanırsa acil kontrol anjiyo/BT istenir.'
    ]
  },

  // 6) Post-operatif yönetim
  postoperative: {
    painManagement: [
      'Perkütan işlem sonrası hafif baş ağrısı ve kasık ağrısı için düzenli IV Parasetamol (1 g q6h) uygulanır.',
      'Nörolojik muayeneyi baskılamamak için sedatif opioidlerden, Tramadol ve Kodein\'den kaçınılır; şiddetli baş ağrısında mikro-doz IV Fentanil (25 mcg) titre edilir.',
      'Rüptüre aSAH, taze intrakraniyal kanama veya DAPT/heparin kullanımında rutin non-selektif NSAİİ\'lerden KESİNLİKLE kaçınılır.'
    ],
    erasRecommendations: [
      'AHA/ASA 2023 aSAH Bakımı: Övolemi (eski Triple-H ve profilaktik hipervolemi terk edilmiştir), 21 gün enteral Nimodipin (60 mg q4h), günlük TCD ile vazospazm/DCI takibi ve serum Na+ izlemi.',
      'Stent / Flow Diverter Olgularında: Kesintisiz ikili antiplatelet (DAPT) devamı; IV Cangrelor kullanıldıysa oral P2Y12 yüklemesine geçiş köprüsünün eksiksiz yürütülmesi.',
      'AVM Embolizasyonu Sonrası: İlk 24–48 saat Nöro-YBÜ\'de sıkı normotansiyon kontrolü (NPPB hemorajisini önlemek için), kasık hematomu ve böbrek fonksiyonu (CIN) takibi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference:
      "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. Anesthesiologist's Manual of Surgical Procedures (5th/6th ed.). Interventional Neuroradiology: Endovascular Coiling of Intracranial Aneurysms and Embolization of AVMs. Wolters Kluwer.",
    otherReferences: [
      'Hoh, B. L., et al. (2023). 2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage: A Guideline From the American Heart Association/American Stroke Association (AHA/ASA). Stroke, 54(7), e314–e370.',
      'Cottrell, J. E., & Patel, P. Cottrell and Patel\'s Neuroanesthesia (6th ed.). Anesthesia for Interventional Neuroradiology. Elsevier.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Perioperative Management of Patients Undergoing Endovascular Neurointerventional Procedures.',
      'Miller\'s Anesthesia (9th ed.). Neuroanesthesia & Interventional Neuroradiology: Anticoagulation, Intraprocedural Rupture, and Onyx/DMSO Toxicity.'
    ]
  }
};
