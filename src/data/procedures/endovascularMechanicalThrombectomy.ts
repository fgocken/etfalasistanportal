import { ProcedureDefinition } from '../../types/procedures';

/**
 * Endovasküler Mekanik Trombektomi (EVT) — Akut İskemik İnme (Büyük Damar Oklüzyonu)
 *
 * SNACC Konsensus Bildirisi, AHA/ASA Akut İskemik İnme Kılavuzları,
 * GASS (2022), SIESTA, ANSTROKE, GOLIATH, ENCHANTED2/MT (Lancet 2022) ve
 * OPTIMAL-BP (JAMA 2023) çalışmaları referans alınarak yapılandırılmıştır.
 */
export const endovascularMechanicalThrombectomy: ProcedureDefinition = {
  id: 'endovascular-mechanical-thrombectomy',
  name: 'Endovasküler Mekanik Trombektomi (Akut İskemik İnme - EVT)',
  shortCode: 'NİV-EVT-İNME',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Nörogirişimsel Radyoloji (NİV)',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description:
    'Akut iskemik inmede intrakraniyal büyük damar oklüzyonunun (LVO; ICA, MCA M1/M2 veya baziler arter) femoral/radyal arter yoluyla anjiyografi ünitesinde stent-retriever ve/veya aspirasyon kateteri ile acil mekanik rekanalizasyonudur. Anestezi yönetiminin temel ekseni "Zaman Beyindir" (Time is Brain) ilkesiyle kasık ponksiyonunu geciktirmemek ve iskemik penumbrayı hemodinamik dalgalanmalardan korumaktır.',
  indications: [
    'Anterior sirkülasyon büyük damar oklüzyonu (İnternal Karotis Arter [ICA], MCA M1 veya proksimal M2) — semptom başlangıcından itibaren ilk 6 saat ve seçilmiş perfüzyon/geniş kor olgularında 24 saate kadar',
    'Posterior sirkülasyon akut baziler arter oklüzyonu (yüksek mortalite ve beyin sapı iskemisi nedeniyle acil rekanalizasyon)',
    'İntravenöz trombolitik (IV tPA / Tenekteplaz) tedavisine kontrendikasyonu olan veya IV trombolize rağmen rekanalize olmayan LVO hastaları',
    'Tandem oklüzyonlar (ekstrakraniyal karotis stenozu/oklüzyonu + intrakraniyal LVO) — eşzamanlı karotis stentleme ve mekanik trombektomi'
  ],
  averageDuration: '60 - 120 dk (Girişimsel anjiyografi + mekanik rekanalizasyon)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 - 100 mL (Tipik perkütan endovasküler girişim); ancak IV trombolitik sonrası intrakraniyal hemoraji veya intraprocedural damar perforasyonu gelişirse katastrofik kanama riski mevcuttur',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük (Ancak Yüksek Hemorajik Dönüşüm / Perforasyon Riski)',
    crossMatchRequirement: 'Kan grubu ve T&S (Type & Screen) alınmalı; acil girişim kan hazırlığı için KESİNLİKLE geciktirilmemelidir',
    transfusionProbability: '< %5 (Retroperitoneal hematom veya iyatrojenik damar rüptürü hariç)',
    criticalBleedingSources: [
      'İntraprosedürel intrakraniyal arter perforasyonu veya diseksiyon (mikrokateter/stent-retriever geçişi sırasında)',
      'Semptomatik intrakraniyal hemoraji (sICH) / reperfüzyon kanaması (özellikle IV tPA/TNK almış ve kontrolsüz hipertansiyonu olan olgularda)',
      'Femoral ponksiyon bölgesinde hematom veya retroperitoneal kanama (antikoagülan/trombolitik varlığında)'
    ],
    hemostasisStrategies: [
      'İntraprosedürel damar perforasyonunda: Heparin verilmişse derhal IV Protamin Sülfat (1 mg / 100 U heparin), sistolik KB\'nin hızla düşürülmesi ve gerekirse balon oklüzyon / koil embolizasyon + acil EVD',
      'IV trombolitik (tPA/TNK) ilişkili sICH durumunda: Trombolitik infüzyonunun kesilmesi, kriyopresipitat (fibrinojen > 150-200 mg/dL hedefi) ve hematoloji/nöroşirürji konsültasyonu',
      'İşlem sonrası femoral girişim yerine vasküler kapatma cihazı (closure device) veya kontrollü manuel kompresyon'
    ]
  },

  // 3) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Monitörize Anestezi Bakımı (MAC) / Bilinçli Sedasyon (Lokal anestezi + düşük doz Deksmedetomidin veya Remifentanil/Propofol titrasyonu): Kooperasyonu korunan, hava yolu güvenli ve düşük aspirasyon riskli anterior LVO olgularında',
      'Genel Endotrakeal Anestezi (GETA — Hızlı Seri İndüksiyon [RSI], düşük MAC Sevofluran veya Propofol/Remifentanil TIVA): Şiddetli ajitasyon, afazi/kooperasyon kaybı, düşük GKS (<8-10), posterior sirkülasyon/baziler oklüzyon, kusma veya hava yolu koruma kaybı olan olgularda'
    ],
    alternative: [
      'Yalnızca Lokal Anestezi + Anestezi Ekibi Hazır Beklemesi (Standby): Çok koopere, hemodinamik olarak stabil ve kısa sürmesi beklenen seçilmiş anterior LVO olgularında (acil entübasyon donanımı başucunda hazır)'
    ],
    clinicalRationale:
      'GASS (2022), SIESTA, ANSTROKE ve GOLIATH randomize çalışmaları, kan basıncı sıkı yönetildiği ve kasık ponksiyonu geciktirilmediği sürece GETA ile MAC/bilinçli sedasyon arasında fonksiyonel sonuçların benzer olduğunu göstermiştir. Teknik seçimi klinik tabloya göre bireyselleştirilmeli; hangi yöntem seçilirse seçilsin hemodinamik çöküşten ve kapı-ponksiyon gecikmesinden kaçınılmalıdır.',
    notes:
      'EVT\'de en büyük nörolojik düşman hipotansiyon ve zaman kaybıdır. Rekanalizasyon öncesi kollateral akımı korumak için SKB 140–180 mmHg tutulmalı; başarılı rekanalizasyon (TICI 2b-3) sonrası ise ENCHANTED2/MT (Lancet 2022) ve OPTIMAL-BP (JAMA 2023) gereği SKB < 120–130 mmHg gibi agresif düşüşlerden kesinlikle kaçınılmalıdır.',
    rulesTitle: 'MEKANİK TROMBEKTOMİDE (EVT) VAZGEÇİLMEZ 5 KURAL',
    indispensableRules: [
      {
        number: 1,
        title: 'ZAMAN BEYİNDİR — KASIK PONKSİYONUNU ASLA GECİKTİRME',
        content: 'Arteriyel hat (A-line), santral kateter (CVC) veya mesane sondası yerleştirilmesi için kasık ponksiyonu KESİNLİKLE geciktirilmemelidir. Femoral arteriyel kılıfın (sheath) yan portundan invaziv basınç izlenebilir; vazopresör (Fenilefrin veya Noradrenalin) ilk aşamada güvenli periferik damar yolundan başlatılır.'
      },
      {
        number: 2,
        title: 'REKANALİZASYON ÖNCESİ HİPOTANSİYONDAN KAÇIN (SKB 140–180 mmHg)',
        content: 'Pıhtı açılana kadar iskemik penumbra tamamen basınç-bağımlı kollateral akıma muhtaçtır. İndüksiyon öncesi vazopresör infüzyonu hazır/aktif olmalı; SKB 140–180 mmHg (IV tPA/TNK aldıysa <180/105 mmHg) ve MAP bazal değerin ≥%90\'ı (genellikle >70–85 mmHg) aralığında tutulmalıdır.'
      },
      {
        number: 3,
        title: 'REKANALİZASYON SONRASI AGRESİF KB DÜŞÜŞÜ ZARARLIDIR',
        content: 'ENCHANTED2/MT (Lancet 2022) ve OPTIMAL-BP (JAMA 2023) çalışmaları, başarılı EVT sonrası SKB\'nin <120–130 mmHg düzeyine agresif indirilmesinin fonksiyonel sonuçları kötüleştirdiğini göstermiştir. TICI 2b-3 rekanalizasyon sonrası hedef SKB <180 mmHg (ideal 140–160 mmHg) düzeyidir.'
      },
      {
        number: 4,
        title: 'NORMOKAPNİ, NORMOGLİSEMİ VE NORMOOKSEMİ KORUNMALI',
        content: 'Hiperventilasyon serebral vazokonstriksiyon yaparak iskemik penumbrayı genişletir; hiperkapni ise "steal" (çalma) fenomeni yaratır. Hedefler: PaCO2 35–40 mmHg, SpO2 > %94 (aşırı hiperoksiden kaçın), kan glukozu 140–180 mg/dL, vücut ısısı 36–37°C.'
      },
      {
        number: 5,
        title: 'İNTRAOP DAMAR PERFORASYONUNA HAZIRLIK VE RADYASYON GÜVENLİĞİ',
        content: 'Ani hipertansiyon/bradikardi ve anjiyoda kontrast ekstravazasyonu damar perforasyonu işaretidir: Heparin verilmişse derhal IV Protamin uygula, KB\'yi hızla düşür ve nöroşirürji/EVD ekibini aktive et. Anjiyografi odasında tüm personel kurşun önlük, tiroid koruyucu ve dozimetre kullanmalıdır (ALARA).'
      }
    ]
  },

  // 4) Pre-operatif hazırlık
  preoperative: {
    consultations: [
      'İnme Nörolojisi & Girişimsel Nöroradyoloji: Oklüzyon lokalizasyonu (anterior vs baziler), NIHSS skoru, ASPECTS skoru, IV tPA/Tenekteplaz uygulama zamanı ve beklenen anestezi tekniği (MAC vs GETA) hızla (hedef <5 dk) kararlaştırılır.',
      'Nöroşirürji (Gerektiğinde): Malign MCA enfarktı gelişimi, hemorajik transformasyon veya intraprocedural damar perforasyonunda acil EVD / dekompresif hemikraniektomi için ulaşılabilirlik.'
    ],
    historyAndPhysical: [
      'Hızlı Nörolojik Değerlendirme (<2-3 dk): Bazal GKS, NIHSS, pupiller simetri, motor lateralizasyon, afazi, yutma/öğürme refleksi ve ajitasyon düzeyi kayıt altına alınır (işlem sonu nörolojik karşılaştırma için).',
      'Hava Yolu ve Aspirasyon Riski: Akut inme hastaları tam mide (full stomach) kabul edilir; bulber disfonksiyon, kusma ve obstrüktif uyku apnesi sorgulanır.',
      'Son Bilinen İyi Olma Zamanı ve İlaç Öyküsü: IV tPA/TNK uygulanıp uygulanmadığı, oral antikoagülan (DOAC/Warfarin) ve antiplatelet kullanımı hızla teyit edilir.',
      'Kardiyovasküler Komorbiditeler: Atriyal fibrilasyon, kronik hipertansiyon (otoregülasyon sağa kaymıştır — daha yüksek MAP gerekir), kalp yetmezliği ve aort stenozu.'
    ],
    laboratoryAndTests: [
      'Acil laboratuvar (Kan Glukozu, INR/aPTT, Trombosit, Kreatinin, Hemoglobin) ve EKG incelenir; ANCAK laboratuvar sonuçları beklenerek anjiyografi veya indüksiyon KESİNLİKLE geciktirilmez.',
      'Beyin BT + BT Anjiyografi (ve varsa BT Perfüzyon): İntrakraniyal kanamanın dışlanması, LVO yeri ve kollateral dolaşım kalitesinin gözden geçirilmesi.'
    ]
  },

  // 5) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA monitörizasyonu: 5 derivasyonlu EKG, SpO2, sürekli kapnografi (EtCO2 — MAC\'ta nazal örnekleme kanülü ile zorunlu) ve vücut ısısı.',
      'Kan Basıncı İzlemi: Başlangıçta 2–3 dk aralıklarla NİKB; invaziv A-line takılması kasık ponksiyonunu GECİKTİRMEMELİDİR. Girişimsel radyologun femoral arter kılıfı (sheath) transdüserine bağlanarak sürekli arteriyel basınç izlenebilir; gerekirse işlem sürerken eşzamanlı radyal A-line takılır.',
      'Kan Glukozu Takibi: Başlangıçta ve uzun vakalarda saatlik ölçüm (hedef 140–180 mg/dL; hipoglisemi <70 mg/dL derhal tedavi edilir).',
      'Nöromusküler Monitörizasyon (GETA olgularında TOF) ve işlenmiş EEG/BIS (derin anestezi kaynaklı hipotansiyonu önlemek için).'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı periferik IV kateter (18G; biri yalnızca vazopresör infüzyonu için ayrılmış ve uzatma hattı kısa/minimal ölü boşluklu olmalı).',
      'IV trombolitik (tPA/TNK) almış hastalarda gereksiz santral venöz veya ek arteriyel ponksiyonlardan (kanama riski) kaçınılır; femoral sheath basıncı tercih edilir.',
      'Nöro-anjiyografi masası hareketli olduğundan tüm IV hatlar, ventilatör hortumları ve monitör kabloları ekstra uzun (extension) olmalı ve sıkışmaya karşı sabitlenmelidir.'
    ],
    patientPosition: 'Supine (Sırtüstü), nöro-anjiyografi (biplan DSA) masasında baş nötral pozisyonda ve radyolusent baş destek yastığına nazikçe tespit edilmiş.',
    patientPositionDetails: [
      'Biplan C-kollu floroskopi tüpünün 360° serbest dönüşü için baş çevresinde metal obje ve kablo karmaşası bırakılmamalıdır.',
      'Kollar vücut yanına yumuşak şekilde sabitlenmeli, basınç noktaları desteklenmeli ve IV hatlar kontrol altında tutulmalıdır.',
      'Radyasyon Güvenliği (ALARA): Anestezi cihazı ve ekibi mümkün olduğunca mobil kurşun paravan arkasında konumlanmalı; hastaya müdahale ederken kurşun önlük, tiroid koruyucu ve kurşun gözlük giyilmelidir.'
    ],
    anesthesiaManagement: [
      'Hızlı Karar ve Kurulum (SNACC): Girişimsel ekiple paralel çalışılır. GETA gerekiyorsa indüksiyon öncesi vazopresör (Fenilefrin 50–100 mcg/dk veya Noradrenalin 0.03–0.1 mcg/kg/dk) hazır ve bağlı olarak indüksiyon yapılır.',
      'GETA İndüksiyon ve İdame: Hemodinamiyi koruyan titre indüksiyon (Etomidat 0.2–0.3 mg/kg veya düşük doz Propofol + Fentanil/Remifentanil + Rokuronyum 1.0–1.2 mg/kg RSI). İdamede <1.0 MAC Sevofluran (genellikle 0.6–0.8 MAC) veya düşük-orta doz Propofol/Remifentanil TIVA. Azot Protoksit (N2O) KESİNLİKLE KULLANILMAZ.',
      'MAC / Bilinçli Sedasyon: Kısa etkili, kolay titre edilebilir ve hızlı nörolojik muayeneye izin veren ajanlar tercih edilir (düşük doz Remifentanil 0.02–0.05 mcg/kg/dk veya Deksmedetomidin / minimal Propofol). Midazolam ve uzun etkili sedatiflerden kaçınılır (nörolojik muayeneyi ve deliryumu bozar).',
      'Sıvı Yönetimi: İzotonik dengeli kristaloid (veya %0.9 NaCl) ile övolemi korunur; hipotonik ve glukoz içeren sıvılardan kaçınılır.',
      'Ventilasyon: Normokapni (EtCO2 32–36 mmHg / PaCO2 35–40 mmHg) ve normooksemi (SpO2 %94–98); yüksek PEEP (>10 cmH2O) serebral venöz dönüşü ve kardiyak debiyi düşürebileceğinden kaçınılır.',
      'Antikoagülasyon / Antiplatelet İletişimi: Sistemik heparin veya tandem karotis stentlemesi için IV Cangrelor/Tirofiban uygulanacaksa girişimsel radyologla doz, saat ve IV tPA öyküsü sözlü teyit edilir.'
    ],
    airwayManagement: [
      'MAC olgularında nazal kanül/maske ile oksijen desteği ve sürekli EtCO2 takibi yapılır; ancak ani kusma, hipoksi, desatürasyon veya kontrolsüz hareket gelişirse derhal GETA\'ya dönüşüm (kurtarma entübasyonu) planı ve videolaringoskop başucunda hazır bulundurulur.',
      'GETA olgularında akut inme hastası tam mide kabul edildiğinden modifiye RSI ve videolaringoskop ile ilk geçişte (first-pass) travmasız entübasyon hedeflenir; entübasyon sırasında SKB düşüşüne karşı proaktif vazopresör bolusu uygulanır.'
    ],
    criticalSurgicalStages: [
      'Kasık Ponksiyonu ve Kılavuz Kateter Yerleştirilmesi: MAC\'ta ağrıya bağlı hareketi önlemek için yeterli lokal anestezi + kısa etkili analjezik (Remifentanil) desteği; karotis kılıfı geçişinde bradikardi/hipotansiyon takibi.',
      'DSA Yol Haritası (Roadmapping) ve Pıhtıya Ulaşım: Kısa süreli mutlak hareketsizlik kritik; gerekirse GETA\'da 10–15 sn kontrollü ekspiryum sonu apne sağlanır.',
      'Stent-Retriever Açılımı / Aspirasyon ve Pıhtı Çekilmesi: Damar gerilmesine bağlı ağrı/hareket (MAC\'ta) ve damar perforasyonu riski en yüksek aşamadır.',
      'Rekanalizasyon Anı (TICI 2b-3) — KRİTİK GEÇİŞ: Girişimsel radyolog damarın açıldığını bildirdiği anda vazopresör hızla azaltılır/kesilir ve KB hedefi post-rekanalizasyon aralığına (SKB 140–160 mmHg, kesinlikle <180 mmHg ve asla <120–130 mmHg değil) çekilir.',
      'İntraprosedürel Damar Perforasyonu Acil Senaryosu: Ani Cushing yanıtı veya anjiyoda ekstravazasyon -> Heparin varsa IV Protamin, SKB\'yi hızla <140 mmHg\'ye çek, nöroşirürjiyi çağır (acil EVD).'
    ],
    emergenceNotes: [
      'Başarılı rekanalizasyon sağlanan, hava yolu refleksleri korunan ve ağır beyin sapı enfarktı/kanaması olmayan GETA hastaları, erken nörolojik muayeneye olanak tanımak için anjiyografi odasında veya hemen sonrasında ekstübe edilmelidir.',
      'Ekstübasyon sırasında öksürük ve şiddetli hipertansiyon pikini önlemek için düşük doz Remifentanil veya IV Lidokain (1 mg/kg) desteği sağlanır; SKB >180 mmHg olursa IV Nikardipin, Labetalol veya Esmolol titre edilir.',
      'Geniş hemisferik enfarkt, baziler arter oklüzyonu sonrası bilinç kapalı seyir, intraprocedural hemoraji veya aspirasyon gelişen olgular entübe olarak Nöro-YBÜ\'ye devredilir.'
    ]
  },

  // 6) Post-operatif yönetim
  postoperative: {
    painManagement: [
      'EVT minimal invaziv bir perkütan girişimdir; kasık ponksiyon ağrısı ve baş ağrısı için bazal olarak IV Parasetamol (1 g q6h) yeterlidir.',
      'Sedasyon yaparak seri nörolojik muayeneyi (NIHSS/GKS) maskeleyecek opioidlerden, Tramadol ve Kodein\'den kaçınılır; şiddetli atılım ağrısında sadece mikro-doz IV Fentanil (12.5–25 mcg) titre edilir.',
      'Trombolitik/antikoagülan ve hemorajik transformasyon riski nedeniyle rutin non-selektif NSAİİ\'lerden KESİNLİKLE kaçınılır.'
    ],
    erasRecommendations: [
      'İnme Ünitesi / Nöro-YBÜ\'de ilk 24 saat sıkı hemodinamik izlem: Başarılı rekanalizasyonda SKB 140–160 mmHg (<180 mmHg, >130 mmHg — ENCHANTED2/MT & OPTIMAL-BP); rekanalize olmayan (TICI 0–2a) olgularda permisif hipertansiyon (IV tPA yoksa <220/120 mmHg, varsa <180/105 mmHg).',
      'Saatlik nörolojik muayene (NIHSS, pupiller), femoral ponksiyon bölgesi ve distal nabız kontrolü.',
      '24. saatte kontrol Beyin BT (hemorajik transformasyon değerlendirmesi), erken disfaji taraması ve DVT profilaksisi (intermittan pnömatik kompresyon).'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference:
      "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. Anesthesiologist's Manual of Surgical Procedures (5th/6th ed.). Interventional Neuroradiology & Endovascular Stroke Therapy. Wolters Kluwer.",
    otherReferences: [
      'Talke, P. O., et al. (2014). Society for Neuroscience in Anesthesiology and Critical Care (SNACC) Expert Consensus Statement: Anesthetic Management of Endovascular Treatment for Acute Ischemic Stroke. Journal of Neurosurgical Anesthesiology, 26(2), 95–108.',
      'Maurice, A., et al. (2022). General Anesthesia versus Sedation, Both with Hemodynamic Control, during Intraarterial Treatment for Stroke: The GASS Randomized Trial. Anesthesiology, 136(4), 567–576.',
      'Yang, P., et al. (2022). Intensive blood pressure control after endovascular thrombectomy for acute ischaemic stroke (ENCHANTED2/MT): a multicentre, open-label, blinded-endpoint, randomised controlled trial. The Lancet, 400(10363), 1585–1596.',
      'Nam, H. S., et al. (2023). Intensive vs Conventional Blood Pressure Lowering After Endovascular Thrombectomy in Acute Ischemic Stroke: The OPTIMAL-BP Randomized Clinical Trial. JAMA, 330(9), 832–842.',
      'Schönenberger, S., et al. (2016). Effect of Conscious Sedation vs General Anesthesia on Early Neurological Improvement Among Patients With Ischemic Stroke Undergoing Endovascular Thrombectomy (SIESTA). JAMA, 316(19), 1986–1996.',
      'Löwhagen Hendén, P., et al. (2017). General Anesthesia Versus Conscious Sedation for Endovascular Treatment of Acute Ischemic Stroke: The ANSTROKE Trial. Stroke, 48(6), 1601–1607.',
      'Simonsen, C. Z., et al. (2018). Effect of General Anesthesia and Conscious Sedation During Endovascular Therapy on Infarct Growth and Clinical Outcomes in Acute Ischemic Stroke: The GOLIATH Randomized Clinical Trial. JAMA Neurology, 75(4), 470–477.'
    ]
  }
};
