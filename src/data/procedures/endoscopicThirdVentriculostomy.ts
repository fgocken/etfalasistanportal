import { ProcedureDefinition } from '../../types/procedures';

/**
 * Endoskopik Üçüncü Ventrikülostomi (ETV) ve İntraventriküler Nöroendoskopi
 *
 * Güncel Nöroendoskopi Anestezi Standartları, Cottrell & Patel Neuroanesthesia ve
 * Jaffe Nöroşirürji Anestezisi kılavuzları referans alınarak yapılandırılmıştır.
 */
export const endoscopicThirdVentriculostomy: ProcedureDefinition = {
  id: 'endoscopic-third-ventriculostomy',
  name: 'Endoskopik Üçüncü Ventrikülostomi (ETV) & İntraventriküler Endoskopi',
  shortCode: 'ETV-ENDOSKOPİK',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Minimal İnvaziv Nöroendoskopi',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description:
    'Obstrüktif (non-komünikan) hidrosefali tedavisinde ventriküloperitoneal (VP) şanta modern ve yabancı cisim gerektirmeyen alternatif olarak uygulanan; sağ frontal tek bir burr-hole deliğinden rijit veya fleksibl nöroendoskopla lateral ventrikülden Foramen Monro yoluyla 3. ventriküle girilip 3. ventrikül tabanının (tuber cinereum — baziler arterin hemen önü) perfore edilerek BOS\'un interpedinküler sisterne drene edilmesi (ve gerekirse koroid pleksus koterizasyonu [CPC] / tümör biyopsisi) işlemidir.',
  indications: [
    'Obstrüktif (non-komünikan) hidrosefali: Akuaduktus Sylvii stenozu (konjenital veya edinsel), tektal/pineal/posterior fossa kitlelerine bağlı 3. veya 4. ventrikül çıkış tıkanıklığı',
    'Tekrarlayan VP şant enfeksiyonu veya şant disfonksiyonu olan uygun obstrüktif hidrosefali olguları (şant bağımsızlığı sağlamak amacıyla)',
    'İntraventriküler kist fenestrasyonu (araknoid/kolloid kist), septostomi veya intraventriküler tümör biyopsisi',
    'Seçilmiş pediatrik olgularda ETV + Koroid Pleksus Koterizasyonu (ETV/CPC)'
  ],
  averageDuration: '45 - 90 dk (Burr-hole + nöroendoskopi + fenestrasyon + kapanış)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 20 - 50 mL (Komplikasyonsuz rutin ETV); ancak 3. ventrikül tabanı perforasyonu sırasında BAZİLER ARTER veya dallarının yaralanması halinde saniyeler içinde fatal/katastrofik intraventriküler arteriyel hemoraji gelişebilir!',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük (Ancak Nadir Katastrofik Baziler Arter Kanaması Riski!)',
    crossMatchRequirement: 'Kan grubu ve T&S (Type & Screen) ZORUNLUDUR (baziler arter/koroid pleksus yaralanmasında acil kraniyotomi ve transfüzyon olasılığı için)',
    transfusionProbability: '< %2 (Majör vasküler yaralanma dışı nadir)',
    criticalBleedingSources: [
      'Baziler Arter Tepesi ve Posterior Serebral / Perforan Dalları (3. ventrikül tabanının hemen altında yer alır — en korkulan ve hayatı tehdit eden komplikasyon!)',
      'Foramen Monro komşuluğundaki talamostriat ve septal venler ile koroid pleksus kanamaları',
      'İntraventriküler kanama endoskop görüşünü anında sıfırlar ve akut şiddetli KİBAS oluşturur'
    ],
    hemostasisStrategies: [
      'Sürekli ılık (37°C) Ringer Laktat irrigasyonu ile görüşün korunması ve küçük venöz kanamaların tamponadı (irrigasyon çıkış kanalının açık olduğu teyit edilmelidir!)',
      'Fogarty balon kateteri ile nazik kompresyon veya endoskopik bipolar koagülasyon',
      'Majör Baziler Arter Yaralanmasında: Derhal EVD yerleştirilmesi, acil kraniyotomi/anjiyografi hazırlığı, agresif resüsitasyon ve kontrollü kan basıncı yönetimi'
    ]
  },

  // 3) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi (Propofol/Remifentanil TIVA veya <0.8 MAC Sevofluran + Remifentanil) + DERİN VE KESİNTİSİZ NÖROMUSKÜLER BLOKAJ (TOF 0)'
    ],
    alternative: [
      'Pediatrik olgularda Sevofluran + Remifentanil/Fentanil + Rokuronyum ile kontrollü endotrakeal genel anestezi'
    ],
    clinicalRationale:
      'Rijit nöroendoskop beyin parankimi içinden geçip Foramen Monro\'yu aşarak 3. ventrikül tabanında baziler arterin milimetreler üzerinde çalışır. Bu esnada hastanın en ufak öksürmesi, yutkunması veya başını oynatması forniks, hipotalamus veya baziler arteri yırtarak ölümcül kanamaya yol açar. Bu nedenle tam hareketsizliği garanti eden derin nöromusküler blokajlı GETA tek güvenli seçenektir.',
    notes:
      'ETV küçük ve hızlı bir prosedür gibi görünse de nöroanestezide "yüksek uyanıklık" gerektirir: 3. ventrikül tabanına bası, hipotalamik/forniks traksiyonu veya yüksek basınçlı/soğuk irrigasyon saniyeler içinde ağır bradikardi, ASİSTOLİ, ani hipertansiyon veya aritmi tetikler. İrrigasyon sıvısı MUTLAKA 37°C ısıtılmış Ringer Laktat olmalı ve N2O kesinlikle kullanılmamalıdır.',
    rulesTitle: 'ENDOSKOPİK ÜÇÜNCÜ VENTRİKÜLOSTOMİDE (ETV) VAZGEÇİLMEZ 5 KURAL',
    indispensableRules: [
      {
        number: 1,
        title: 'RİJİT ENDOSKOP İÇERİDEYKEN MUTLAK HAREKETSİZLİK (SIFIR ÖKSÜRÜK / TOF 0!)',
        content: 'Rijit nöroendoskop Foramen Monro ve 3. ventrikül içindeyken 1 mm\'lik hareket veya tek bir öksürük refleksi forniksi, hipotalamusu veya baziler arteri yırtar! Sürekli derin anestezi ve derin nöromusküler blokaj (TOF 0) endoskop beyinden tamamen çıkarılana dek KESİNTİSİZ korunmalıdır.'
      },
      {
        number: 2,
        title: 'ANİ BRADİKARDİ / ASİSTOLİ / HİPERTANSİYON — CERRAHI DERHAL UYAR!',
        content: 'Hipotalamik traksiyon, 3. ventrikül tabanı perforasyonu veya yüksek basınçlı irrigasyon ani ağır bradikardi, ASİSTOLİ, hipertansiyon veya ventriküler aritmi (Cushing/hipotalamik refleks) yaratır. İLK VE EN ETKİLİ TEDAVİ: Cerraha sesli bildir -> endoskop/balon basısı derhal bırakılır ve irrigasyon boşaltılır! Çoğu ritim saniyeler içinde döner; düzelmezse hazır bekleyen IV Atropin uygulanır.'
      },
      {
        number: 3,
        title: 'BAZİLER ARTER KOMŞULUĞU — KATASTROFİK KANAMA HAZIRLIĞI',
        content: '3. ventrikül tabanı (tuber cinereum) baziler arter tepesine milimetreler uzaklıktadır. Perforasyon anında tam kan basıncı kontrolü, geniş damar yolu, hazır kan grubu/T&S ve gerektiğinde acil EVD / açık kraniyotomi dönüşüm hazırlığı bulunmalıdır.'
      },
      {
        number: 4,
        title: 'ISITILMIŞ (37°C) RİNGER LAKTAT İRRİGASYONU & BASINÇ KONTROLÜ (N2O YOK!)',
        content: 'İntraventriküler yıkama için YALNIZCA vücut ısısında (37°C) ısıtılmış izotonik Ringer Laktat (veya fizyolojik yapay BOS) kullanılır. Soğuk sıvı hipotermi ve bradikardi; yüksek basınçlı/çıkışı tıkalı irrigasyon ise akut KİBAS krizi ve retina/beyin sapı hasarı yapar! Ventriküler hava genleşmesini önlemek için N2O KESİNLİKLE YASAKTIR.'
      },
      {
        number: 5,
        title: 'POSTOP GECİKMİŞ UYANMA, GEÇİCİ DI / SIADH VE HİPERTERMİ TAKİBİ',
        content: 'Hipotalamik manipülasyona bağlı postop ilk 24–48 saatte geçici Diabetes Insipidus (poliüri/hipernatremi), SIADH (hiponatremi), santral ateş/hipertermi, geçici kısa süreli bellek bozukluğu (forniks) veya intraventriküler kanama/hava kaynaklı gecikmiş uyanma açısından yakın nörolojik ve elektrolit takibi şarttır.'
      }
    ]
  },

  // 4) Pre-operatif hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji: Obstrüksiyon nedeni (akuadukt stenozu vs tümör), baziler arterin 3. ventrikül tabanıyla ilişkisi (sagittal MRG) ve baziler yaralanma/başarısız ETV durumunda yedek plan (EVD / VP şant) görüşülür.',
      'Pediatri / Endokrinoloji (Suprasellar / pineal tümörlü olgularda): Preoperatif hipofiz-hipotalamus aksı (kortizol, tiroid, DI öyküsü) değerlendirmesi.'
    ],
    historyAndPhysical: [
      'KİBAS ve Akut Hidrosefali Bulguları: Baş ağrısı, fışkırır tarzda kusma (aspirasyon riski ve dehidratasyon/elektrolit bozukluğu!), papilödem, 6. sinir felci, letarji, bebeklerde kabarık fontanel ve batan güneş bakışı.',
      'Kardiyak ve Solunum Durumu: KİBAS kaynaklı preop Cushing bradikardisi veya düzensiz solunum paterni.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı, Koagülasyon Paneli (PT/INR, aPTT — intraventriküler kanamayı önlemek için normal hemostaz şarttır!), Serum Elektrolitleri (özellikle Na+, K+ — kusma veya hipotalamik disfonksiyon nedeniyle), Kan Grubu ve T&S.',
      'Yüksek Çözünürlüklü Sagittal Beyin MRG (CISS/FIESTA): 3. ventrikül tabanı inceliği, Liliequist membranı ve baziler arter tepesi anatomisi.'
    ]
  },

  // 5) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: Sesli QRS tonu AÇIK 5 derivasyonlu EKG (ani bradikardi/asistoliyi saniyesinde duymak için ses mutlaka açık olmalıdır!), SpO2, sürekli EtCO2, özofageal/nazofaringeal ısı probu ve NİKB.',
      'İnvaziv Arteriyel Kan Basıncı (A-Line): KİBAS\'ı belirgin, baziler artere çok yakın anatomili, tümör biyopsisi eşlik eden veya hemodinamik instabilitesi olan olgularda (ani Cushing hipertansiyonu/bradikardisini ve irrigasyon kaynaklı CPP düşüşünü anında yakalamak için) kuvvetle önerilir.',
      'Nöromusküler Monitörizasyon (TOF — endoskop içerideyken TOF 0 doğrulaması şarttır!), işlenmiş EEG/BIS ve saatlik idrar çıkışı (DI/poliüri taraması).'
    ],
    vascularAccess: [
      'En az 1–2 adet güvenilir geniş çaplı periferik IV kateter (erişkinde 16G–18G, pediatride 20G–22G) — acil Atropin/vazopresör ve olası baziler kanama resüsitasyonu için.',
      'Seçilmiş yüksek riskli veya pediatrik olgularda invaziv Radyal Arter Kateteri.'
    ],
    patientPosition: 'Supine (Sırtüstü), baş nötral pozisyonda ve 20–30° elevasyonda (burr-hole en yüksek noktada olacak şekilde — BOS kaybını ve intraventriküler hava girişini azaltmak için); erişkinde Mayfield başlık veya pediatride jel simit yastık.',
    patientPositionDetails: [
      'Başın 20–30° elevasyonu ve nötral hizalaması serebral venöz dönüşü optimize eder ve burr-hole\'dan aşırı BOS boşalmasını/hava emilimini sınırlar.',
      'Nöronavigasyon kullanılıyorsa başın Mayfield çivileriyle hareketsiz sabitlenmesi sırasında hipertansiyon pikini önlemek için derin anestezi + lokal infiltrasyon sağlanır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: KİBAS\'ı artırmadan pürüzsüz indüksiyon (Propofol + Remifentanil/Fentanil + IV Lidokain + Rokuronyum 0.8–1.0 mg/kg; aktif kusma varsa modifiye RSI).',
      'İdame: Propofol/Remifentanil TIVA veya <0.8 MAC Sevofluran + Remifentanil. Endoskop ventrikül içindeyken KESİNLİKLE derin nöromusküler blokaj (TOF 0) sürdürülür. N2O KESİNLİKLE KULLANILMAZ.',
      'Acil İlaçların Hazır Bulundurulması: IV Atropin (erişkin 0.5–1 mg, çocuk 0.02 mg/kg), Esmolol/Labetalol ve Fenilefrin/Noradrenalin enjektörlerde çekili ve hazır bekletilir.',
      'İrrigasyon Sıvısı Takibi: Cerrahi hemşire ile kullanılan irrigasyon sıvısının 37°C ısıtılmış Ringer Laktat olduğu ve yüksek basınçlı pompadan kaçınılarak serbest yerçekimi akışı/açık çıkış portu kullanıldığı teyit edilir. %0.9 NaCl yüksek hacimde asidoz/irritasyon yapabildiğinden Ringer Laktat tercih edilir.',
      'Ventilasyon ve Sıvı: Normokapni (PaCO2 34–38 mmHg), izotonik dengeli kristaloidlerle övolemi ve normotermi (36–37°C).'
    ],
    airwayManagement: [
      'Güvenli orotrakeal entübasyon (mümkünse bükülmeye dirençli tüp); başörtüsü altında bağlantıların güvenliği doğrulanır.',
      'Komplike olmamış ETV hastaları nöromusküler blokaj tam geri çevrilip (Sugammadeks, TOF ≥ 0.90) pürüzsüz biçimde ameliyathanede ekstübe edilir.',
      'İntraventriküler masif kanama, uzamış bradikardi/asistoli veya açıklanamayan uyanma gecikmesi varsa hasta entübe tutularak acil Beyin BT\'ye alınır.'
    ],
    criticalSurgicalStages: [
      'Frontal Burr-Hole ve Ventriküler Kanülasyon: Ani BOS basıncı boşalmasına bağlı geçici hemodinamik değişiklik.',
      'Foramen Monro Geçişi ve 3. Ventrikül Navigasyonu: Forniks ve talamostriat ven komşuluğu — SIFIR HAREKET (TOF 0) şarttır!',
      '3. Ventrikül Tabanı (Tuber Cinereum) Perforasyonu ve Fogarty Balon Dilatasyonu: EN KRİTİK AN! Baziler arter perforasyonu riski + hipotalamik/beyin sapı basısına bağlı ani ağır bradikardi, ASİSTOLİ veya hipertansiyon krizi -> EKG sesi açık, cerrahla anlık iletişim!',
      'İntraventriküler İrrigasyon Fazı: Çıkış kanalı tıkanırsa saniyeler içinde akut KİBAS ve Cushing refleksi (hipertansiyon + bradikardi) gelişir -> irrigasyon derhal durdurulur ve ventrikül dekomprese edilir.',
      'Endoskopun Çıkarılması ve Kapanış: Hava girişini önlemek için ventrikül ılık Ringer Laktat ile doldurulur; N2O kapalıdır.'
    ],
    emergenceNotes: [
      'Öksürük ve ıkınma intraventriküler venöz kanamayı tetikleyebilir; düşük doz Remifentanil veya IV Lidokain desteğiyle pürüzsüz uyanma sağlanır.',
      'Beklenmeyen gecikmiş uyanma, pupiller asimetri, yeni kraniyal sinir defisiti (3. sinir felci!) veya şiddetli bradikardi görülürse intraventriküler hemoraji, akut KİBAS veya pnömosefali açısından ACİL Beyin BT çekilir.'
    ]
  },

  // 6) Post-operatif yönetim
  postoperative: {
    painManagement: [
      'ETV minimal invaziv tek burr-hole girişimidir; insizyon yerine lokal anestezik infiltrasyonu + düzenli IV Parasetamol (erişkin 1 g q6h; pediatrik 10–15 mg/kg q6h) genellikle tam analjezi sağlar.',
      'Nörolojik takibi maskeleyen sedatif opioidlerden, Tramadol ve Kodein\'den kaçınılır; erken dönemde taze intraventriküler kanama riski nedeniyle rutin non-selektif NSAİİ\'lerden kaçınılır.',
      'Şiddetli atılım ağrısında yalnızca mikro-doz IV Fentanil (erişkinde 25 mcg) titre edilir.'
    ],
    erasRecommendations: [
      'İlk 24 saat yakın nörolojik takip (bilinç, pupiller, kısa süreli hafıza/forniks fonksiyonu ve 3. sinir muayenesi).',
      'Hipotalamik Disfonksiyon Taraması: Saatlik idrar çıkışı (poliüri >3–4 mL/kg/saat ve idrar dansitesi <1.005 -> geçici Diabetes Insipidus!), 6–12 saatlik serum Na+ (DI hipernatremisi vs SIADH hiponatremisi) ve vücut ısısı (santral hipertermi) izlenir.',
      'Baş 30° elevasyonda tutulur, erken mobilizasyon ve oral alıma geçilir; nüks KİBAS bulguları açısından aile/hasta bilgilendirilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference:
      "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. Anesthesiologist's Manual of Surgical Procedures (5th/6th ed.). Endoscopic Third Ventriculostomy and Intraventricular Endoscopy. Wolters Kluwer.",
    otherReferences: [
      'Fabregas, N., & Craen, R. A. (2002). Anaesthesia for minimally invasive neurosurgery (endoscopic third ventriculostomy). Best Practice & Research Clinical Anaesthesiology, 16(1), 81–93.',
      'Baykan, N., Isbir, O., Gerçek, A., Dagçinar, A., & Özek, M. M. (2005). Ten years of experience with pediatric neuroendoscopic third ventriculostomy: features and perioperative complications of 210 cases. Journal of Neurosurgical Anesthesiology, 17(1), 33–37.',
      'Kalmar, A. F., Van Aken, J., Caemaert, J., Mortier, E. P., & Struys, M. M. (2005). Value of Cushing reflex as warning sign for brain ischaemia during neuroendoscopy. British Journal of Anaesthesia, 94(6), 791–799.',
      "Cottrell, J. E., & Patel, P. Cottrell and Patel's Neuroanesthesia (6th ed.). Anesthesia for Neuroendoscopy and Hydrocephalus. Elsevier."
    ]
  }
};
