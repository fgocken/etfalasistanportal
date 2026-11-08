import { ProcedureDefinition } from '../../types/procedures';

/**
 * Larinks Çatı Cerrahisi: Mediyalizasyon Tiroplastisi (Tip I), Aritenoid Adduksiyonu ve Enjeksiyon Laringoplasti
 * (Laryngeal Framework Surgery: Type I Thyroplasty, Arytenoid Adduction, and Injection Laryngoplasty)
 * 
 * Jaffe (5th ed., Section V: Otolaryngology - Larynx and Trachea: Laryngeal Framework Surgery & Thyroplasty, pp. 799-804),
 * American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS) Clinical Practice Guideline: Vocal Fold Paralysis and Phonosurgery,
 * Society for Head and Neck Anesthesia (SHNA) & Difficult Airway Society (DAS),
 * British Laryngological Association (BLA) & European Laryngological Society (ELS),
 * Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) Laringoloji ve Fonocerrahi Okulu Kılavuzları referans alınarak hazırlanmıştır.
 */
export const laryngealFrameworkSurgery: ProcedureDefinition = {
  id: 'laryngeal-framework-surgery',
  name: 'Larinks Çatı Cerrahisi: Mediyalizasyon Tiroplastisi (Tip I), Aritenoid Adduksiyonu ve Enjeksiyon Laringoplasti',
  shortCode: 'KBB-TİROPLASTİ',
  specialty: 'kbb',
  specialtyName: 'Kulak Burun Boğaz',
  categoryTag: 'Laringoloji & Fonocerrahi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Larinks çatı cerrahisi (Laryngeal Framework Surgery / Isshiki Tiroplastisi), laringeal kıkırdak iskeletin geometrisini ve vokal kordların pozisyon/gerilimini değiştirerek ses kalitesini ve hava yolu koruyucu sfinkter fonksiyonunu restore eden rekonstrüktif fonocerrahi girişimleridir. Başlıca komponentleri: (1) Tip I Mediyalizasyon Tiroplastisi: Tek taraflı vokal kord paralizisinde (felcinde) tiroid kıkırdak laminasında cerrahi bir pencere açılarak iç perikondriyum arkasındaki paraglottik alana kalıcı bir implant (Silastik blok, Gore-Tex [ePTFE], Titanyum klips veya Montgomery implantı) yerleştirilir ve felçli kord orta hatta itilir; (2) Aritenoid Adduksiyonu (Isshiki Tekniği): Geniş posterior glottik defektlerde kıkırdaksı arka glottisi kapatmak amacıyla aritenoid kıkırdağın muskuler çıkıntısına çekme sütürü konularak aritenoid kıkırdak anteromediyale rotatiftir; (3) Enjeksiyon Laringoplastisi: Paraglottik alana transoral veya perkütan transkrikotiroid/transtirohyoid yolla hyaluronik asit, kalsiyum hidroksiapatit (Radiesse Voice) veya otolog yağ enjekte edilerek kordun mediyalizasyonu sağlanır. Bu ameliyatların EN KRİTİK ANESTEZİK ÖZELLİĞİ: İmplantın boyutu, derinliği ve sütür gerginliği ayarlanırken hastanın uyanık ve koopere olması, gerçek zamanlı konuşarak (fonasyon: "eeeee" diyerek, sayı sayarak) cerrahla iletişim kurması ve fleksibl nazofaringolaringoskopi ile ses tellerinin tam kapandığının doğrudan doğrulanması zorunluluğudur (Uyanık / Bilinçli Sedasyon - MAC şarttır).',
  indications: [
    'Tek Taraflı Vokal Kord Paralizisi (Unilateral Vocal Fold Paralysis - UVFP): Tiroidektomi, karotis endarterektomisi, akciğer/mediasten cerrahisi veya idiyopatik nedenlerle n. recurrens laryngeus hasarı sonucu gelişen glottik yetmezlik',
    'Şiddetli Disfoni (Soluklu, fısıltılı, boğuk ses kalitesi, konuşurken aşırı hava kaçağı ve çabuk yorulma)',
    'Aspirasyon ve Yutma Bozukluğu: Glottisin kapanamamasına bağlı sıvı gıdaların trakeaya kaçması ve tekrarlayan aspirasyon pnömonisi riski',
    'Zayıf Öksürük ve Sekresyon Temizleme Güçlüğü (Yetersiz glottik basınç oluşumu)',
    'Vokal Kord Atrofisi ve Presbifoni (İleri yaşta ses teli kas erimesine bağlı orta hat açıklığı)',
    'Geçirilmiş Laringeal Travma veya Parsiyel Rezeksiyon Sonrası Glottik Defektler'
  ],
  averageDuration: '60 - 120 dakika (Yalnızca Tip I Mediyalizasyon Tiroplastisi: 60-75 dk; Tiroplasti + Aritenoid Adduksiyonu: 90-120 dk; Enjeksiyon laringoplastisi: 20-40 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '10 - 50 mL (Laringeal kıkırdak penceresi disseksiyonunda kanama genellikle minimaldir; ancak tiroid lamina perikondriyumu ve paraglottik venöz ağaçtan sızıntı olabilir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Sistemik Kan Kaybı / Ancak Paraglottik Hematom Hava Yolu Obstrüksiyonu Yaratabilir',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Tiroid Laminası İç Perikondriyumu ve Paraglottik Venöz Pleksus (Pencere açılırken veya implant yerleştirilirken yırtılma)',
      'Superior Laringeal Arter ve Venin İntra-kıkırdaksı dalları',
      'Aritenoid Disseksiyonunda Piriform Sinüs submukozal venleri',
      'Ön boyun anterior juguler ven dalları'
    ],
    hemostasisStrategies: [
      'Lokal anestezik solüsyonuna Epinefrin (1:100.000 veya 1:200.000) eklenerek vazokonstriksiyon sağlanması',
      'İnce uçlu bipolar koter ile mikrovasküler hemostaz',
      'Kemik/kıkırdak sızıntılarında hemostatik mum (bone wax) veya mikrofibriler kollajen kullanımı',
      'Cerrahi alan kapatılırken kıkırdak lojuna küçük silikon vakumlu dren (Jackson-Pratt / Mini-Redon) yerleştirilmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Monitörize Anestezi Bakımı (MAC) / Bilinçli Sedoanaljezi + Lokal İnfiltrasyon Anestezisi (Lidokain %1-2 + Bupivakain %0.25 + 1:200.000 Epinefrin) + Yüzeyel Servikal Pleksus Bloğu + Deksmedetomidin İnfüzyonu (0.2 - 0.7 mcg/kg/saat) + Düşük Doz Remifentanil TCI (0.5 - 1.5 ng/mL) — DÜNYA GENELİNDE ALTIN STANDARTTIR (İntraoperatif Fonasyon ve Hasta Kooperasyonu İçin Şarttır)'
    ],
    alternative: [
      'Genel Endotrakeal Anestezi (GETA) + Mikrolaringeal Tüp (MLT): Yalnızca hasta kesinlikle uyanık cerrahiye koopere olamayacaksa veya anksiyetesi kontrol edilemiyorsa uygulanır; ancak intraoperatif ses kalitesi doğrudan dinlenemediğinden implant başarısı düşüktür',
      'Lokal Anestezi Tek Başına: Yüksek motivasyonlu ve ağrı eşiği yüksek olgularda minimal sedatif ile'
    ],
    rulesTitle: 'LARİNKS ÇATI CERRAHİSİNDE (TİROPLASTİ) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'İNTRAOPERATİF SES DEĞERLENDİRMESİ VE HASTA KOOPERASYONU İÇİN "BİLİNÇLİ SEDOANALJEZİ / MAC" DİSİPLİNİ — GENEL ENTÜBE ANESTEZİ YASAKTIR',
        content: 'Tip I Mediyalizasyon Tiroplastisi ve Aritenoid Adduksiyonunda implantın boyutu, kalınlığı ve çekme süturunun gerginliği cerrah hastaya intraoperatif fonasyon yaptırırken ("eeeee" dedirterek, 1\'den 10\'a kadar saydırarak) belirlenir. Cerrah burundan fleksibl nazofaringoskop ile vokal kordun orta hatta gelişini ve glottik yarığın kapandığını canlı izlerken hastanın sesinin pürüzsüzlüğünü dinler. Endotrakeal tüp ses tellerini birbirinden ayırdığı için genel entübe anestezi bu ameliyatın cerrahi mantığına aykırıdır. Anestezinin temel direği; solunumu deprese etmeyen, hasta uyandırıldığında saniyeler içinde net ve peltekleşmemiş bir sesle konuşmasını sağlayan DEKSMEDETOMİDİN bazlı bilinçli sedasyondur!'
      },
      {
        number: 2,
        title: 'AŞIRI SEDASYON VE DİSİNHİBİSYON ÖNLEMİ — AŞIRI DERİNLEŞME VE HİPOVENTİLASYON KESİNLİKLE YASAKTIR',
        content: 'Yüksek doz propofol, midazolam veya kontrolsüz opioid kullanımı hastada paradoksal ajitasyon, disinhibisyon, hava yolu obstrüksiyonu ve konuşma disartrisine (peltekleşme) yol açar. Peltek veya uyku sersemi konuşan bir hastada cerrahın ses tınısını doğru analiz etmesi imkansızlaşır. Ayrıca cerrahi örtülerin altında başın kapalı olması karbondioksit birikimine (hiperkapni) ve hipoksiye zemin hazırlar. Hastaya burun kanülü ile nazik O2 (2-3 L/dk) verilmeli; mikroakım yan akışlı (sidestream) kapnografi ile solunum hızı ve EtCO2 dalgası kesintisiz izlenmelidir.'
      },
      {
        number: 3,
        title: 'PARAGLOTTİK HEMATOM VE AKUT LARİNGEAL ÖDEME BAĞLI HAVA YOLU OBSTRÜKSİYONU (STRİDOR) ALARMI',
        content: 'Tiroid lamina penceresi kıkırdak bistürisi veya tur ile açılırken iç perikondriyum yırtılırsa paraglottik venöz pleksus kanayarak laringeal lümenin içine doğru genişleyen masif bir submukozal hematom oluşturabilir. Ayrıca vokal kordun implantla aşırı mediyalize edilmesi (over-medialization) veya cerrahi ödem glottik lümeni kritik derecede daraltabilir. Hastada aniden hırıltılı solunum (inspiratuar stridor), dispne veya ajitasyon başlarsa implant derhal gevşetilmeli/çıkarılmalıdır; masada steril trakeostomi kiti, videolaringoskop ve kaflı endotrakeal tüp daima hazır bulundurulmalıdır.'
      },
      {
        number: 4,
        title: 'PİRİFORM SİNÜS MUKOZASI VE ENDOLARİNKS PERFORASYONU ÖNLEMİ',
        content: 'Özellikle Aritenoid Adduksiyonu aşamasında cerrah aritenoid kıkırdağın muskuler proçesine ulaşmak için posterior tiroid laminası arkasından piriform sinüs mukozasını diseke eder. Piriform sinüs mukozası son derece ince ve kırılgandır. Mukoza delinirse faringeal tükürük cerrahi alana sızar, hasta şiddetli öksürük krizine girer ve laringeal kıkırdak nekrozu / derin boyun apsesi riski doğar. Hastaya cerrahi disseksiyon boyunca yutkunmaması ve öksürmemesi tembihlenmeli; öksürüğü baskılamak için indüksiyonda İV Deksametazon ve gereğinde lokal anestezik titizlikle uygulanmalıdır.'
      },
      {
        number: 5,
        title: 'POSTOPERATİF BOYUN HEMATOMU, İMPLANT EKSTRÜZYONU VE DERLENME GÜVENLİĞİ',
        content: 'Ameliyat sonrası dönemde öksürme, ıkınma, kusma veya hipertansif pikler boyun lojunda hematom oluşturarak kıkırdak iskeleti ezer ve hava yolunu boğabilir; ayrıca silastik/Gore-Tex implantın kıkırdak penceresinden dışarı veya laringeal lümene kaymasına (ekstrüzyon) yol açabilir. Derlenmede hastanın kan basıncı sıkı kontrol altında tutulmalı (Sistolik KB < 140 mmHg); boyun çevresinde şişlik, pansumanda kanama veya stridor anında KBB ekibine haber verilmelidir. Hastaya ilk 24-48 saat tam ses istirahati (fısıldamak dahi yasaktır) uygulanmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'KBB / Fonocerrahi ve Laringoloji Konsültasyonu: Vokal kord paralizisinin etiyolojisi, süresi (en az 6-12 ay spontan düzelme beklenip beklenmediği), glottik açıklığın boyutu (anterior vs posterior gap).',
      'Videolaringostroboskopi (VLS) & Akustik Ses Analizi: Preoperatif ses kısıklığı derecesi (GRBAS skalası, Maksimum Fonasyon Süresi [MPT]), vokal kord seviye farkı ve mukozal dalga analizi.',
      'Boyun ve Toraks BT: N. laryngeus recurrens trasesinde kitle, lenfadenopati veya vasküler bası varlığının taranması.',
      'Anestezi Ön Değerlendirmesi: Hastanın uyanık cerrahiye psikolojik uyumu, anksiyete düzeyi, kapalı kalma korkusu (klostrofobi) ve zor hava yolu riski.'
    ],
    historyAndPhysical: [
      'Geçirilmiş Cerrahi Öyküsü: Tiroidektomi, paratiroidektomi, karotis endarterektomisi, anterior servikal diskektomi (ACDF) veya torakotomi öyküsü.',
      'Aspirasyon ve Yutma Güçlüğü: Sıvı gıdalarla boğulma hissi ve öksürük atakları.',
      'Boyun Muayenesi: Boyun hareket açıklığı, trakea deviasyonu, önceki insizyon skarları ve tiroid kıkırdak anatomik işaret noktaları.',
      'Psikolojik Hazırlık: Hastaya ameliyat esnasında uyutulmayacağı, cerrahın sorularına net yanıt vermesi ve istendiğinde "eeeee" diyerek ses çıkaracağı ayrıntılı olarak anlatılmalıdır.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR (Kanama diatezi cerrahi hematom ve hava yolu tıkanması yaratabileceğinden koagülopati dışlanmalıdır).',
      'Açlık Kan Şekeri, Serum Elektrolitleri ve Böbrek Fonksiyonları.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Videolaringostroboskopi Kayıtları (Cerrahi öncesi referans ses ve kord görüntüsü).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart Monitörizasyon: 5 derivasyonlu EKG, NIBP, SpO2 ve Vücut Sıcaklığı.',
      'Nazal Mikroakım Kapnografi (Sidestream EtCO2): Cerrahi örtüler altındaki hastanın solunum sayısını ve apne periyotlarını anlık yakalamak için kesintisiz izlenir.',
      'Sedasyon Derinliği İzlemi: Ramsay Sedasyon Skalası veya Richmond Ajitasyon-Sedasyon Skalası (RASS: -1 ila -2 seviyesinde tutulmalı; komutla anında gözünü açmalı ve konuşabilmelidir).',
      'İnvaziv Arter Basıncı (Gereğinde): Ciddi kardiyovasküler komorbiditesi olan veya kontrolsüz hipertansif olgularda.'
    ],
    vascularAccess: [
      '1-2 adet güvenli periferik intravenöz damar yolu (18G veya 20G)',
      'İnfüzyon Pompaları: Deksmedetomidin ve düşük doz Remifentanil infüzyonları için hazır enjektör pompaları',
      'Acil Hipertansiyon Kiti: İntraoperatif kanamayı önlemek için İV Esmolol, Labetalol veya Gliseril Trinitrat ampulleri',
      'Acil Hava Yolu Kiti: Videolaringoskop, stileli endotrakeal tüpler, laringeal maske (LMA) ve açık cerrahi trakeostomi seti masada hazır'
    ],
    patientPosition: 'Supin Pozisyon, Boyun Hafif Ekstansiyonda, Omuz Altına Küçük Silikon Destek Rulosu',
    patientPositionDetails: [
      'Hasta ameliyat masasına sırtüstü rahatça yatırılır; bacakların ve kolların altına yumuşak pedler yerleştirilir (uzun süre uyanık kalacağı için hasta konforu esastır).',
      'Omuzların altına küçük bir rulo konularak tiroid kıkırdak ve ön boyun anatomisi belirginleştirilir.',
      'Yüz ve burun bölgesi cerrahi örtülerle tamamen kapatılmaz; cerrahın fleksibl nazofaringoskopu burundan rahatça sokabilmesi ve hastanın klostrofobi yaşamaması için şeffaf çadır (tenting) örtüm tekniği uygulanır.',
      'Burun kanülü ile 2-3 L/dk O2 verilir.'
    ],
    anesthesiaManagement: [
      'Sedoanaljezi Protokolü:',
      '  - Deksmedetomidin Yükleme: 0.5 - 1.0 mcg/kg dozunda 10-15 dakikada yavaş İV infüzyonla başlanır.',
      '  - Deksmedetomidin İdame: 0.2 - 0.7 mcg/kg/saat hızında titre edilir (hastada bradikardi ve hipotansiyona dikkat edilir).',
      '  - Remifentanil İdame: Çok düşük doz TCI (0.5 - 1.5 ng/mL) veya 0.02 - 0.05 mcg/kg/dk infüzyon ile kıkırdak manipülasyonu ağrısı baskılanır.',
      '  - Propofol ve Benzodiazepinlerden Kaçınılır (Peltek konuşma ve hava yolu obstrüksiyonunu önlemek için).',
      'Lokal ve Rejyonel Anestezi:',
      '  - Yüzeyel Servikal Pleksus Bloğu (USG eşliğinde veya anatomik işaretle sternokleidomastoid arka kenarından): 10 mL Bupivakain %0.25 + Lidokain %1.',
      '  - Cerrahi İnsizyon Hattı İnfiltrasyonu: Tiroid laminası ve yumuşak dokulara 5-10 mL Lidokain %2 + 1:100.000 Epinefrin enjeksiyonu.',
      'İntraoperatif Vokal Test (Fonasyon Fazı):',
      '  - İmplant yerleştirilip cerrah vokal kordu mediyale iterken sedasyon hafifletilir.',
      '  - Hasta "eeeee" der, 1\'den 10\'a kadar sayar; cerrah burundan fleksibl endoskopla kordun kapanmasını izler.',
      '  - En uygun ses tonu ve nefessiz fonasyon yakalandığında implant kıkırdağa sabitlenir.'
    ],
    airwayManagement: [
      'Spontan solunumun kesintisiz korunması şarttır; apneik dönemlere izin verilmez.',
      'Cerrahi örtü altında CO2 birikimini önlemek için aktif hava akımı / aspiratör hattı sağlanır.',
      'Laringeal hematom veya ani spazm gelişirse derhal lokal anesteziye ara verilir, cerrahi implant gevşetilir, gerekirse hasta hızla entübe edilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Rahatlatma, Yüzeyel Servikal Blok ve Lokal Anestezik İnfiltrasyonu.',
      '2. Deksmedetomidin ile Bilinçli Sedasyon İdamesi ve Nazal Endoskopi Görüşünün Sağlanması.',
      '3. Tiroid Kıkırdak Üzerine Transvers Boyun İnsizyonu ve Kıkırdak Laminasının Açığa Çıkarılması.',
      '4. Tiroid Kıkırdakta Dikdörtgen Pencerenin (Window) Ölçülmesi ve Tur/Bistüri ile Kesilmesi.',
      '5. İç Perikondriyumun Korunarak Paraglottik Alana Girilmesi (Hematom oluşturmama aşaması!).',
      '6. Deneme İmplantının (Sizer) Yerleştirilmesi ve Gerçek Zamanlı Fonasyon Testi ("eeeee" dedirtilmesi).',
      '7. Gereğinde Aritenoid Adduksiyonu Sütürünün Geçilmesi ve Posterior Açıklığın Kapatılması.',
      '8. Kalıcı İmplantın (Silastik / Titanyum / Gore-Tex) Kıkırdak Penceresine Kilitlenmesi.',
      '9. Hemostaz Kontrolü, Cerrahi Mini-Dren Yerleştirilmesi ve Cilt Kapatılması.'
    ],
    emergenceNotes: [
      'Hasta ameliyat boyunca zaten uyanık olduğundan genel anestezi derlenmesi gerekmez.',
      'Deksmedetomidin ve Remifentanil infüzyonları cerrahi kapatma başlarken kademeli olarak sonlandırılır.',
      'Öksürük ve Ikınmayı Önleme: Boyun içi hematomu engellemek için hasta sakinleştirilir.',
      'Cerrahi Sahada Hematom ve Hava Yolu Kontrolü: Cilt altı şişlik veya stridor olmadığı teyit edilir.',
      'Hasta sedyeye alınarak yarı oturur pozisyonda ameliyathane derlenme ünitesine (PACU) transfer edilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Laringeal çatı cerrahisi sonrası ağrı genellikle hafif-orta düzeydedir ve boyun hareketleriyle artan batma hissi şeklindedir.',
      'İntravenöz Parasetamol (1000 mg her 6 saatte bir) bazal analjezik olarak uygulanır.',
      'Gereğinde İV Deksketoprofen (50 mg) veya Tramadol (50 mg) kurtarıcı analjezik olarak verilir.',
      'Boyun insizyon bölgesine nazik soğuk uygulama (buz jeli) ödem ve ağrıyı belirgin azaltır.'
    ],
    prospectRecommendations: [
      'PROSPECT Fonocerrahi ve Laringoloji Önerileri:',
      'Preoperatif ve intraoperatif multimodal analjezi;',
      'Yüzeyel servikal pleksus bloğunun rutin kullanımı intraoperatif ve postoperatif opioid tüketimini %50\'den fazla azaltır;',
      'Postoperatif bulantı-kusmanın (PONV) agresif önlenmesi (Deksametazon + 5-HT3 antagonisti); kusma ve öğürme implant yerleşimini bozabilir ve hematom yaratabilir.'
    ],
    erasRecommendations: [
      'ERAS ve KBB / Fonocerrahi Kılavuzları:',
      'ZORUNLU SES İSTİRAHATİ (ABSOLUTE VOCAL REST): İlk 48 saat hasta kesinlikle konuşmamalıdır (fısıldamak vokal kordları daha çok gerer, fısıldama yasaktır!).',
      'Erken Mobilizasyon ve Yarı Oturur Pozisyon: Yatak başı 30-45° eleve tutularak laringeal ödem ve venöz konjesyon azaltılır.',
      'Dren Takibi: Mini vakumlu drenden gelen kanama miktarı saatlik izlenir; ani artış boyun hematomu alarmıdır.',
      'Hava Yolu Güvenliği: Postoperatif inspiratuar stridor, nefes darlığı veya boyunda gergin şişlik gelişmesi durumunda acil KBB müdahalesi ve cerrahi revizyon planlanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section V: Otolaryngology - Larynx and Trachea: Laryngeal Framework Surgery & Thyroplasty, pp. 799-804.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Laryngological Association (BLA): Consensus on Day-Case Phonosurgery and Laryngeal Framework Procedures.',
    prospectReference: 'PROSPECT Guidelines: Perioperative Pain and Sedation Management in Awake Head and Neck Surgery.',
    otherReferences: [
      'American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS): Clinical Practice Guideline on Vocal Fold Paralysis and Medialization Phonosurgery.',
      'Society for Head and Neck Anesthesia (SHNA) & Difficult Airway Society (DAS): Consensus on Conscious Sedation and Airway Safety in Phonosurgery.',
      'European Laryngological Society (ELS): Recommendations for Laryngeal Framework Surgery (Type I Thyroplasty and Arytenoid Adduction).',
      'Miller\'s Anesthesia, 9th Edition. Chapter 66: Anesthesia for Head and Neck Surgery & Dexmedetomidine in Monitored Anesthesia Care.',
      'Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC): Fonocerrahi ve Ses Bozuklukları Tedavi Rehberi.'
    ]
  }
};
