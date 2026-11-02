import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: Serebral Embolektomi (Akut İskemik İnmede Cerrahi Trombektomi / Revaskülarizasyon)
 * 
 * Jaffe (5th ed.), AHA/ASA Guidelines for the Early Management of Patients With Acute Ischemic Stroke,
 * SNACC (Society for Neuroscience in Anesthesiology and Critical Care),
 * ESO (European Stroke Organisation) ve ERAS Society ilkeleri referans alınarak yapılandırılmıştır.
 */
export const craniotomyEmbolectomy: ProcedureDefinition = {
  id: 'craniotomy-embolectomy',
  name: 'Kraniyotomi: Serebral Embolektomi',
  shortCode: 'SEREBRAL-EMBOLEKTOMİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Serebrovasküler Nöroşirürji / Akut İskemik İnme Cerrahisi',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Akut iskemik inme zemininde intrakraniyel majör arter dallarını (özellikle A. cerebri media [MCA M1/M2], A. carotis interna [ICA] bifurkasyonu veya nadiren baziler tepe) tıkayan akut tromboembolik tıkacın acil mikronöroşirürjikal kraniyotomi ve mikro-arteriyotomi ile cerrahi mikroskop altında doğrudan mekanik olarak çıkarılması (cerrahi embolektomi / tromboembolektomi), vasküler lümenin rekanalizasyonu ve kurtarılabilir iskemik penumbra dokusunun korunması amacıyla uygulanan ultra-acil, zaman kritik mikrocerrahi ameliyatıdır.',
  indications: [
    'Başarısız veya Ulaşılamayan Endovasküler Trombektomi (EVT): Kateterin aşırı vasküler kıvrımlılık (tortuosity), kalsifiye aortik ark ateromu veya femoral/karotid erişim imkansızlığı nedeniyle hedefe ulaşamaması ya da anjiyografik stent-retriever/aspirasyon trombektomi denemelerinin başarısız kalması (TICI 0-1) durumu',
    'İntraoperatif / İyatrojenik Tromboemboli: İntrakraniyel anevrizma kliplemesi, karotis endarterektomi, kafa tabanı cerrahisi veya tanısal/girişimsel kateterizasyon esnasında intrakraniyel artere (özellikle MCA bifurkasyonuna) akut trombüs atması ve ani damar tıkanması gelişmesi',
    'Büyük Damar Oklüzyonu (LVO) ve Kurtarılabilir İskemik Penumbra Varlığı: ASPECTS skoru ≥6 olan, BT perfüzyon veya MR perfüzyon/diffüzyon incelemelerinde geniş kurtarılabilir iskemik penumbra alanı saptanmış ve irreversibl masif infarktı henüz gelişmemiş olgular',
    'Endovasküler trombektominin teknik olarak kontrendike olduğu veya anjiyo ünitesi/girişimsel ekibin hazır bulunamadığı merkezlerde zaman penceresindeki hiperakut MCA M1/bifurkasyon tıkayıcı embolileri',
    'Tıkayıcı Kardiyoembolik Masif Emboliler: Sol atriyal/ventriküler trombüs, AF veya kardiyak miksomadan kopan, endovasküler stentle çıkarılamayacak kadar sert, organize fibröz emboli olguları'
  ],
  averageDuration: '3 - 5 saat (Ultra-acil anestezi indüksiyonu ve eşzamanlı invaziv A-line/CVC yerleşimi: 30-45 dk; Acil frontotemporal/pteriyonal kraniyotomi ve dural açılış: 45-60 dk; Sylvian fissür diseksiyonu, MCA/ICA bifurkasyonuna ulaşım, geçici arteriyel klempleme ve mikro-arteriyotomi ile cerrahi embolektomi: 60-120 dk; Mikro-vasküler Doppler/ICG kontrolü, arteriyotominin 10-0 mikro-dikişlerle onarımı, hemostaz ve kraniyoplasti/kapanış: 45-60 dk)',

  // 1.5) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 600 mL (Kontrollü mikrocerrahi koşullarında); ancak hastaların büyük çoğunluğunun acil servis veya anjiyo ünitesinde İV TROMBOLİTİK (IV tPA - Alteplase / Tenekteplase) veya yüksek doz sistemik Heparin almış olması sebebiyle cerrahi sahada sızıntı tarzında kontrolsüz mikrovasküler kanama, dural oozing, reperfüzyon hemorajisi veya hemorajik transformasyon riski YÜKSEKTİR.',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Trombolitik Reversal & Reperfüzyon Kanama Riski',
    crossMatchRequirement: 'En az 2 - 4 Ünite Eritrosit Süspansiyonu (ES), 2 Ünite Taze Donmuş Plazma (TDP) ve 1 Aferez Trombosit Süspansiyonu Cross-Match yapılarak kan merkezinde ve ameliyathanede hazır bekletilmeli; önceden IV tPA alan olgularda Kriyopresipitat (10 Ünite) ve Traneksamik Asit (TXA) acil hazır bulundurulmalıdır',
    transfusionProbability: '%30 - %50 (Preoperatif sistemik IV tPA veya Glikoprotein IIb/IIIa inhibitörü alan olgularda transfüzyon ihtiyacı %60-70 seviyesine çıkar)',
    criticalBleedingSources: [
      'Mikro-Arteriyotomi Kesi Hattı ve Dikiş Sızıntısı: MCA veya ICA arter duvarı açılıp pıhtı çıkarıldıktan sonra 9-0 / 10-0 monofilament dikişlerle kapatılan arter lümeninden yüksek basınçlı arteriyel jet kanama veya sızma',
      'Akut Reperfüzyon Kanaması ve Hemorajik Transformasyon (Reperfusion Hemorrhage): Tıkalı ana arter açıldığında iskemik endotel hasarına uğramış kan-beyin bariyerinin yüksek perfüzyon basıncıyla yırtılması ve parankim içine masif hematom oluşumu',
      'Preoperatif Sistemik IV Trombolitik (tPA) Etkisi: Fibrinojen lizisi ve sistemik litik durum nedeniyle skalp flebi, temporal kas dokusu ve dural yüzeylerde diffüz mikrovasküler durdurulamayan sızıntı (oozing)',
      'Sylvian Venöz Pleksus ve Derin Kortikal Venler: Sylvian fissürün acil diseksiyonu sırasında venöz traksiyon ve yırtılmalar',
      'Temporal ve Frontal Kemik Diploik Venöz Kanalları ile A. temporalis superficialis kesi kenarları'
    ],
    hemostasisStrategies: [
      'Trombolitik (tPA) Etkisinin Tersine Çevrilmesi (Reversal): Preoperatif IV tPA almış ve cerrahi alanda kontrolsüz mikrovasküler kanaması olan olgularda acil Kriyopresipitat infüzyonu (hedef Fibrinojen >200 mg/dL; 10 Ünite IV) ve Traneksamik Asit (10-15 mg/kg IV yavaş bolus, ardından 1 mg/kg/saat infüzyon) uygulanması',
      'Heparin Reversali: Anjiyo ünitesinde sistemik heparin uygulanmışsa, ACT/aPTT değerine göre uygun dozda IV Protamin Sülfat (1 mg protamin / 100 U heparin) titrasyonu',
      'Trombosit Transfüzyonu: Antiplatelet ajan (Aspirin, Klopidogrel, Tikagrelor) veya tirofiban/eptifibatid almış olgularda cerrahi hemostaz için 1 ünite aferez trombosit süspansiyonu',
      'Topikal Hemostatikler: Bipolar mikro-koagülasyon, mikrocerrahi hemostatik matrisler (FloSeal jelatin hemostatik granül, Tisseel fibrin yapıştırıcı, mikrofibriler kolajen ve pamuk kompresyon)',
      'Mikro-Arteriyotomi Onarımı: Arteriyotomi hattına ince fibril hemostatik tül ve biyolojik doku yapıştırıcı desteği'
    ]
  },

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Total İntravenöz Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI]) + Dengeli Genel Endotrakeal Anestezi (GETA)',
      'TIVA + Düşük Doz Uçucu İnhalasyon Anesteziği (<0.5 - 0.7 MAC Sevofluran): İskemik penumbra perfüzyonunu bozmayan, serebral otoregülasyonu koruyan, serebral metabolik oksijen tüketimini (CMRO2) düşüren ve intraoperatif nöromonitörizasyona (MEP/SSEP) engel olmayan dengeli rejim'
    ],
    alternative: [
      'Etomidat İndüksiyonu + Titre Opioid Tabanlı Anestezi (Remifentanil/Süfentanil + Düşük MAC İnhalasyon): Ciddi hemodinamik instabilite, sol ventrikül sistolik disfonksiyonu veya ejeksiyon fraksiyonu düşük akut inme hastalarında hemodinamik çöküşü önlemek için'
    ],
    notes: 'Serebral embolektomi anestezisinde en kritik kural İKİ FARKLI DÖNEMİN hemodinamik hedeflerini titizlikle ayırmaktır: (1) REKANALİZASYON ÖNCESİ (Pre-recanalization): İskemik penumbradaki kollateral perfüzyonu yaşatmak için KESİNLİKLE HİPOTANSİYONDAN KAÇINILMALI ve MAP ≥85-90 mmHg (SAB 140-160 mmHg) tutulmalıdır; (2) REKANALİZASYON SONRASI (Post-recanalization): Damar açılıp embolektomi tamamlandığında reperfüzyon hasarı ve öldürücü hemorajik transformasyonu (beyin kanamasını) engellemek için MAP katı bir şekilde <80-85 mmHg (SAB 110-130 mmHg) seviyesine düşürülüp kontrol altında tutulmalıdır.'
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    consultations: [
      'Nöroloji / Nörogirişimsel Radyoloji Konsültasyonu: Semptom başlangıç saati (Son normal görülme zamanı - LSN), NIHSS skoru, ASPECTS skoru, tPA/EVT geçmişi ve revaskülarizasyon için hedeflenen damar oklüzyon düzeyinin anlık değerlendirilmesi.',
      'Girişimsel Anjiyografi Ekibi ile Koordinasyon: Kateter laboratuvarında verilen sistemik heparin dozu, intra-arteriyel vazodilatatörler, stent/trombektomi deneme sayısı ve damar diseksiyonu varlığının teyidi.',
      'Nöro-Yoğun Bakım Konsültasyonu: Acil cerrahi sonrası invaziv mekanik ventilasyon, multimodal nöromonitörizasyon ve saatlik nörolojik takip için acil YBÜ yatak rezervasyonu.'
    ],
    historyAndPhysical: [
      'Semptom Başlangıç Zamanı ve "Last Seen Normal" (LSN): Kurtarılabilir penumbra dokusunun mevcudiyeti zaman bağımlıdır ("Time is brain" - Zaman beyindir prensibi). Her geciken dakikada milyonlarca nöron ölmektedir.',
      'Nörolojik Defisit Derecesi (NIHSS): Yüksek NIHSS skoru (özellikle >15-20) masif kortikal ve subkortikal iskemiye işaret eder; pupiller reaksiyon, anizokori ve bilateral ışık refleksi unkal herniasyon riski açısından saniyeler içinde kaydedilmelidir.',
      'Aspirasyon Riski ve Mide Doluluğu: Akut inme hastalarında bulbar disfonksiyon, yutma refleksi kaybı, bilinç bozukluğu ve ultra-acil durum nedeniyle mide tam dolu kabul edilir; Hızlı Seri İndüksiyon (RSI) zorunludur.',
      'Kardiyovasküler Anamnez: Atriyal fibrilasyon (AF), mekanik kapak, sol ventrikül trombüsü, yakın zamanda geçirilmiş Mİ veya karotis stenozu sorgulanmalıdır.'
    ],
    laboratoryAndTests: [
      'Koagülasyon Profili (PT, aPTT, INR, Fibrinojen): Özellikle preoperatif IV tPA (Alteplase/Tenecteplase) uygulanmışsa Fibrinojen düzeyi acilen bakılmalıdır (Hedef Fibrinojen >200 mg/dL; düşüklükte Kriyopresipitat infüzyonu planlanır).',
      'Acil Kan Grubu ve Cross-Match: En az 2 - 4 Ünite ES + 2 Ünite TDP + 1 Aferez Trombosit süspansiyonu.',
      'Arteriyel Kan Gazı, Bazal Laktat ve Kan Şekeri: HİPERGLİSEMİ (glukoz >180 mg/dL) ve HİPOGLİSEMİ (<70 mg/dL) iskemik laktik asidozu ve infarkt alanını genişletir; kan şekeri sıkı bir şekilde 140 - 180 mg/dL arasında tutulmalıdır.',
      'Serum Elektrolitleri (Özellikle Na+ ve K+): Hiponatremi beyin ödemini katlar; normonatremi (138-145 mEq/L) hedeflenmelidir.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line) — Kalp ve Dış Kulak Yolu (Tragus) Seviyesinde Kalibre Edilmiş: İndüksiyon anında penumbra perfüzyonunun çökmesini engellemek için mutlaka İNDÜKSİYON ÖNCESİ yerleştirilmelidir.',
      'Santral Venöz Kateter (CVC): Norepinefrin, fenilefrin veya vazodilatatör infüzyonlarının güvenli santral titrasyonu ve hemodinamik izlem için.',
      'İntraoperatif Nöromonitörizasyon (İONM - MEP, SSEP ve Sürekli EEG): Kortikal ve subkortikal iskeminin tespiti; geçici arteriyel klempleme ve embolektomi anında perfüzyon bütünlüğünün izlenmesi.',
      'Mikro-Vasküler Doppler USG ve İndosiyanin Yeşili (ICG) Video-Anjiyografi: Trombüs çıkarılıp arter kapatıldıktan sonra damar içi akımın (TICI 3 revaskülarizasyon) ve perforatör arterlerin açık olduğunun intraoperatif teyidi.',
      'Sürekli End-Tidal CO2 (EtCO2) ve Arteriyel Kan Gazı (ABG): PaCO2 hedefi 35 - 38 mmHg (Normokapni). DİKKAT: Anevrizma cerrahisinin aksine akut iskemik inmede AŞIRI HİPERVENTİLASYONDAN (PaCO2 <35 mmHg) KESİNLİKLE KAÇINILMALIDIR, çünkü vazokonstriksiyon yaparak iskemik penumbrayı geri dönüşsüz infarkta çevirir!',
      'Sürekli Çift Isı Takibi (Özofagus/Mesane): Normotermi (36.0 - 37.0°C) korunmalıdır; hipertermi iskemik nöron ölümünü katlayarak artırır.',
      'Saatlik İdrar Çıkışı Takibi için Sıcaklık Problu Foley Sonda.'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı periferik damar yolu (14G ve/veya 16G) — acil sıvı ve kan replasmanına uygun.',
      'Ultrason eşliğinde İnternal Juguler veya Subklavyen Santral Venöz Kateter (CVC).',
      'İnvaziv Radial veya Brakial Arter Kateteri (anestezi indüksiyonu öncesinde yerleştirilmiş).'
    ],
    patientPosition: 'Supine (Sırtüstü), baş Mayfield 3 çivili başlık veya nöroşirürji halkasında lezyon karşı tarafına 30-45 derece hafif rotasyonda; serebral venöz dönüşü rahatlatmak için 15 derece Reverse Trendelenburg.',
    patientPositionDetails: [
      'Boyun Rotasyonu ve Venöz Drenaj: Başın 45 dereceden fazla döndürülmesi ipsilateral juguler veni basıya uğratarak intrakraniyal venöz hipertansiyona, serebral perfüzyon basıncının düşmesine ve cerrahi sahada beyin şişmesine yol açar; çene ile sternum arasında en az 2 parmak mesafe korunmalıdır.',
      'Mayfield Çivisi Uygulaması: İntrakraniyal basınç fırlamasını ve hipertansif atakları engellemek için çivi giriş yerlerine bol lokal anestezik (Bupivakain/Lidokain) infiltrasyonu ve ek bolus anestezi uygulanmalıdır.',
      'Gözlerin Korunması: Sylvian fissür diseksiyonu sırasında baş açısı nedeniyle bağımlı kalan göze bası olmaması için koruyucu göz merhemi ve bası önleyici pedler yerleştirilmelidir.'
    ],
    anesthesiaManagement: [
      'Ultra-Acil Zaman Kritik Hızlı İndüksiyon (Time-Critical RSI): Mide doluluğu ve aspirasyon riskine karşı hızlı seri indüksiyon; MAP düşüşü yaratmayacak hemodinamik stabil ajanlar (Etomidat 0.2-0.3 mg/kg veya titre Propofol + Fentanil 2-3 mcg/kg + Rokuronyum 1-1.2 mg/kg).',
      'İKİ AŞAMALI KAN BASINCI HEDEF PROTOKOLÜ: (1) REKANALİZASYON ÖNCESİ (Pre-Recanalization): İskemik penumbradaki kollateral perfüzyonu yaşatmak için KESİNLİKLE HİPOTANSİYONDAN KAÇINILMALI ve MAP ≥85-90 mmHg (SAB 140-160 mmHg) tutulmalıdır (Gerektiğinde Norepinefrin veya Fenilefrin infüzyonu); (2) REKANALİZASYON SONRASI (Post-Recanalization): Damar açılıp embolektomi tamamlandığında reperfüzyon hasarı ve ölümcül hemorajik transformasyonu (beyin kanamasını) engellemek için MAP derhal <80-85 mmHg (SAB 110-130 mmHg) seviyesine indirilmeli ve sıkı kontrol edilmelidir (Nikardipin, Labetalol veya Esmolol).',
      'Optimal Beyin Gevşemesi (İskemiye Zarar Vermeden): Beyin gevşemesi için Mannitol (0.5 g/kg) veya Hipertonik Salin (%3 NaCl 150 mL) dikkatle uygulanabilir; derin hipovolemi ve hipotansiyondan kaçınmak için izotonik kristaloidlerle övolemi titizlikle korunmalıdır. İskemik alanda vazokonstriktif hasar yaratmamak için PaCO2 kesinlikle 35-38 mmHg seviyesinde tutulmalıdır.',
      'Serebral Nöroproteksiyon: Trombüs çıkarılması için uygulanan mikro-arteriyotomi ve geçici klempleme esnasında CMRO2 süpresyonu (Propofol infüzyonu veya hafif kontrollü normotermi 35.5-36.5°C) ve sıkı kan şekeri kontrolü (140-180 mg/dL).',
      'Trombolitik Reversal Protokolü: Preoperatif IV tPA almış hastada cerrahi alanda kontrolsüz mikrovasküler kanama gelişirse cerrah ile koordineli olarak derhal 10 Ünite Kriyopresipitat ve 1 g Traneksamik Asit IV uygulanır.'
    ],
    airwayManagement: [
      'Güvenli Orotrekeal Entübasyon: Fleksibl spiral telli (armored) endotrakeal tüp ile cerrahi sahayı ve mikroskop hareketlerini engellemeyecek şekilde karşı ağız köşesinden sağlam tespit.',
      'Venöz Dönüşün Korunması: Tüp tespit bantları ve flasterler juguler venöz dönüşü engelleyecek şekilde boyun venlerini sıkmamalıdır.',
      'Postoperatif Ekstübasyon Stratejisi: Masif serebral iskemi, rekanalizasyon sonrası beyin ödemi riski ve nörolojik tablonun yoğun bakımda yakın takibi gerektiğinden hastaların büyük çoğunluğu ameliyat masasında EKSTÜBE EDİLMEZ; sedatize ve entübe halde Nöro-YBÜ\'ye nakledilir.'
    ],
    criticalSurgicalStages: [
      'Acil Kraniyotomi ve Dural Açılış: Dura açıldığında iskemik parankim şişkin olabilir; masif ödem ve herniasyon bulguları varsa cerrah dekompresif hemikraniektomiye geçiş kararını değerlendirir.',
      'Sylvian Fissür Diseksiyonu ve Tıkalı Arterin Belirlenmesi: MCA bifurkasyonu veya M1 gövdesine ulaşılırken derin perforatör lentikülostriat dalların korunması hayati önem taşır.',
      'Geçici Arteriyel Klempleme: Trombüsün proksimal ve distaline minyatür geçici mikrovasküler klerler yerleştirilir; iskemi süresi anestezi ekibi tarafından sesli olarak sayılır (hedef <10-15 dk).',
      'Mikro-Arteriyotomi ve Embolektomi: Arter mikromakslarla açılarak pıhtı mikro-forseps ve hafif aspirasyonla çıkartılır; taze embolus patolojik ve mikrobiyolojik incelemeye gönderilir.',
      'Arteriyotomi Onarımı ve Akımın Açılması (Rekanalizasyon Anı): 10-0 dikişlerle arter kapatılır, geçici klerler açılır ve cerrah mikro-Doppler veya ICG ile damar açıklığını teyit eder. BU ANDA ANESTEZİST KAN BASINCINI DERHAL DÜŞÜRMELİDİR (MAP <85 mmHg)!',
      'Kemik Flebinin Durumu (Kraniyoplasti vs Dekompresif Kraniektomi): Beyin dokusunda malign ödem bulgusu varsa kemik flebi yerine konulmaz, kraniektomi olarak kapatılır.'
    ],
    emergenceNotes: [
      'Hastalar çoğunlukla yoğun bakım takibi için entübe tutulur; ancak uyanık devredilecek stabil seçilmiş olgularda ıkınma ve öksürük (bucking) tamamen engellenmelidir.',
      'Hipertansif sıçramalar (rebound HT) reperfüzyon kanamasına yol açacağından uyanma evresinde nikardipin veya labetalol infüzyonu hazır bulundurulmalıdır.',
      'Erken Nörolojik Muayene: Ekstübe edilen veya sedasyonu hafifletilen hastada pupiller refleksi, motor defisit ve GKS amortismanı hızla değerlendirilmelidir.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    painManagement: [
      'Bölgesel Skalp Sinir Blokajı: Cerrahi bitiminde uygulanan skalp bloğu (%0.25 Bupivakain + Epinefrin) insizyon ağrısını ve postoperatif sistemik opioid ihtiyacını belirgin azaltır.',
      'Sistemik Non-Opioid Analjezi: IV Parasetamol (1 g q6h) düzenli bazal analjezik olarak verilir.',
      'Opioid Titrasyonu: Pupiller yanıtı ve GKS takibini gölgelememek için sadece şiddetli atılım ağrılarında mikro-doz Tramadol (50 mg) veya Fentanil (25 mcg) titre edilir.',
      'NSAİİ Kesin Kontrendikasyonu: Erken dönemde hemorajik transformasyon riski nedeniyle cerrahın kesin onayı olmaksızın NSAİİ kullanımı yasaktır.'
    ],
    prospectRecommendations: [
      'Skalp Sinir Blokajı / İnsizyonel İnfiltrasyon: Ağrı skorlarını düşürmede ve hemodinamik stabiliteyi sağlamada en yüksek kanıt düzeyine sahip yöntemdir.',
      'Sistemik Parasetamol: Rutin bazal analjezik olarak 6 saatte bir 1 g IV uygulanması önerilir.',
      'Aşırı Sedatif Analjeziklerden Kaçınma: Nörolojik muayene doğruluğunu korumak adına sedasyon yapıcı ilaçlar sınırlandırılmalıdır.'
    ],
    erasRecommendations: [
      'Sıkı Kan Basıncı Hedefleri: Post-rekanalizasyon döneminde kan basıncı sistolik <140 mmHg ve diyastolik <90 mmHg (MAP <85 mmHg) tutulmalıdır (Hemorajik transformasyon profilaksisi).',
      'Erken Kontrol Beyin BT / BT Anjiyografi: Postoperatif 2-4. saatte veya nörolojik kötüleşme anında reperfüzyon hematomu, beyin ödemi ve damar açıklığı için acil görüntüleme.',
      'Normoglisemi ve Normotermi: Kan şekeri 140 - 180 mg/dL aralığında, vücut ısısı <37.5°C idame ettirilmelidir.',
      'Antikoagülan / Antiplatelet Zamanlaması: Trombüs nüksünü önleme ile hematom riski arasında multidisipliner konsey kararı (genellikle postop 24-48 saat sonra kontrol BT temizse başlanır).'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section I: Neurosurgical Procedures - Craniotomy for Cerebral Revascularization and Embolectomy, pp. 45–52. Lippincott Williams & Wilkins.",
    erasReference: 'Smith, M., et al. Consensus Statement for Perioperative Care in Neurovascular Surgery and Craniotomy: Enhanced Recovery After Surgery (ERAS®) Society Guidelines.',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in craniotomy and neurovascular interventions. ESRA.',
    otherReferences: [
      'Powers, W. J., et al. (2019/2023). Guidelines for the Early Management of Patients With Acute Ischemic Stroke: A Guideline for Healthcare Professionals From the American Heart Association/American Stroke Association (AHA/ASA). Stroke.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC): Consensus Statement on Anesthetic Management of Endovascular and Surgical Recanalization in Acute Ischemic Stroke.',
      "Cottrell, J. E., & Patel, P. (2016). Cottrell and Patel's Neuroanesthesia (6th ed.). Chapter 16: Anesthesia for Acute Ischemic Stroke and Cerebral Revascularization. Elsevier.",
      'European Stroke Organisation (ESO) Guidelines on Acute Ischemic Stroke Management & Rescue Surgical Thrombectomy.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 64: Anesthesia for Neurologic Surgery - Acute Cerebral Ischemia, Penumbral Perfusion and Surgical Embolectomy.',
      'Yousef, K. M., et al. Blood Pressure Management in Acute Ischemic Stroke and Post-Recanalization Hemorrhagic Transformation: Current Evidence and Neurocritical Guidelines.'
    ]
  }
};
