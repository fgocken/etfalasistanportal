import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: İntrakraniyel Anevrizma Cerrahisi (Kliplenme / Rekonstrüksiyon)
 * 
 * Jaffe (5th ed.), AHA/ASA Guidelines for the Management of Aneurysmal Subarachnoid Hemorrhage,
 * SNACC (Society for Neuroscience in Anesthesiology and Critical Care),
 * ERAS Society ve PROSPECT konsensus raporları referans alınarak yapılandırılmıştır.
 */
export const craniotomyAneurysm: ProcedureDefinition = {
  id: 'craniotomy-aneurysm',
  name: 'Kraniyotomi: İntrakraniyel Anevrizma Kliplenmesi',
  shortCode: 'ANEVRİZMA-KLİP',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Serebrovasküler Nöroşirürji',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Serebral arter bifurkasyonlarında (özellikle ACoA, MCA, PCoA, ICA ve baziler tepe) yerleşen sakküler veya fuziform intrakraniyel anevrizmaların; mikrocerrahi diseksiyonla boynunun kalıcı klip ile kapatılması (kliplenmesi), parent damar lümeninin korunması, rüptüre olgularda hematom tahliyesi ve subaraknoid kanama (SAK) komplikasyonlarının önlenmesi/tedavisi amacıyla uygulanan yüksek riskli mikronöroşirürjikal kraniyotomi ameliyatıdır.',
  indications: [
    'Rüptüre intrakraniyel anevrizmalar: Akut spontan subaraknoid kanama (SAK) tablosunda yeniden kanamayı (rebleeding) önlemek ve intrakraniyal hematomu boşaltmak amacıyla acil/erken cerrahi klipleme',
    'Rüptüre olmamış (insidental) intrakraniyel anevrizmalar: Boyutu ≥7 mm olan, düzensiz multilobüler/kız lobcuklu morfolojiye sahip, posterior sirkülasyonda yerleşik veya takipte büyüme gösteren yüksek rüptür riskli anevrizmalar',
    'Kitle etkisi yaratan semptomatik anevrizmalar: PCoA veya baziler tepe anevrizmasına bağlı 3. kranial sinir (okülomotor) felci, pitozis, anizokori, optik kiyazma basısı veya intraktabl baş ağrısı olguları',
    'Endovasküler girişime (koilleme/stentleme) elverişsiz anevrizmalar: Geniş boyunlu (dome-to-neck oranı <1.5), damar çıkış dallarını içeren bifurkasyon lezyonları (özellikle MCA bifurkasyonu) veya endovasküler tedavi sonrası rekanalizasyon/nüks gelişen olgular',
    'Masif parankimal veya subdural hematomla komplike rüptüre anevrizmalarda acil dekompresif hemikraniyotomi ve eşzamanlı anevrizma kliplenmesi'
  ],
  averageDuration: '4 - 7 saat (Anestezi indüksiyonu, invaziv A-line, CVC, lumbar drenaj ve Mayfield tespiti: 60-75 dk; Pteriyonal/Orbitozigomatik kraniyotomi ve dura açılışı: 60-90 dk; Sylvian fissür diseksiyonu, proksimal damar kontrolü, geçici/kalıcı klipleme: 90-180 dk; ICG anjiyografi/Doppler kontrolü, hemostaz ve kraniyoplasti/kapanış: 60-90 dk)',

  // 1.5) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 500 mL (Elektif rüptürsüz olgularda kontrollü mikrovasküler kanama); ancak diseksiyon veya klip uygulaması esnasında İNTRAOPERATİF ANEVRİZMA RÜPTÜRÜ (IAR) geliştiğinde dakikalar içinde 1000 - 3000+ mL katastrofik masif arteriyel jet kanama ve hemorajik şok riski taşır',
    riskLevel: 'massive_potential',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Katastrofik Masif Kanama',
    crossMatchRequirement: 'En az 4 Ünite Eritrosit Süspansiyonu (ES) ve 2-4 Ünite Taze Donmuş Plazma (TDP) Cross-Match yapılarak kan merkezinde ve ameliyathane dolabında hazır bekletilmeli; Acil Masif Transfüzyon Protokolü (MTP) ve Cell-Saver aktif hazır bulundurulmalıdır',
    transfusionProbability: '%25 - %45 (Rüptüre SAK olgularında ve intraoperatif rüptür durumunda %80-100; elektif insidental olgularda %10-20)',
    criticalBleedingSources: [
      'İntraoperatif Anevrizma Rüptürü (IAR): Sylvian fissür diseksiyonu, anevrizma boynunun ayrılması veya klip yerleştirilmesi anında kubbenin (dome) yırtılması (en fatal arteriyel kanama)',
      'Parent Arter Laserasyonu veya Avülsiyonu (A. carotis interna [ICA], MCA M1 gövdesi, A. cerebri anterior [A1 segmenti])',
      'Sylvian ve Köprü Venlerinin Traksiyon Hasarı: Beyin ekartasyonu sırasında derin venöz göllenme ve yırtılma',
      'Skalp Flebi ve A. temporalis superficialis kesi kenarları',
      'Sfenoid Kanat ve Temporal Kemik Diploik Venöz Kanamaları ile Orta Meningeal Arter (MMA) laserasyonu'
    ],
    hemostasisStrategies: [
      'Çift Geniş Lümenli Aspiratör Düzeneği (No. 8-10 Frazier/Yankauer): Rüptür anında cerrahın kanama odağını ve parent arteri görebilmesi için kesintisiz yüksek vakumlu aspirasyon',
      'Geçici Klip Uygulaması (Temporary Clipping): Anevrizmayı besleyen proksimal ana artere geçici hemostatik klip konulması (İskemi süresi kronometreyle sesli sayılır; ideal olarak <10 dakika)',
      'Adenozin İle İndüklenmiş Geçici Kardiyak Asistoli (Adenosine-Induced Arrest): Cerrahın kontrolsüz kanayan alanda klip koyabilmesi için 30-45 saniyelik tansiyonsuz alan sağlamak üzere IV 0.3-0.4 mg/kg (18-36 mg) hızlı bolus Adenozin protokolü',
      'Hızlı Sıvı/Kan Isıtıcı ve Masif İnfüzyon Sistemi (Belmont / Rapid Infuser) ameliyathanede hazır ve hatları prime edilmiş olmalıdır',
      'Cell-Saver (Otolog Kan Kurtarma): İntrakraniyal anevrizma cerrahisinde enfeksiyon veya malignite bulunmadığından cerrahi alandan aspire edilen kan yıkanarak hızla hastaya geri verilebilir',
      'Topikal hemostatik matrisler: Bipolar mikro-koagülasyon, FloSeal jelatin hemostatik matris, pamuk kompresyonu ve Surgicel'
    ]
  },

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Dengeli Genel Endotrakeal Anestezi (GETA) + Total İntravenöz Anestezi (TIVA - Propofol & Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Uçucu İnhalasyon Anesteziği (<0.5 - 0.7 MAC Sevofluran): Serebral metabolik oksijen tüketimini (CMRO2) ve serebral kan akımını (CBF) azaltır, optimal beyin gevşemesi sağlar ve intraoperatif nöromonitörizasyonu (MEP/SSEP) baskılamaz'
    ],
    alternative: [
      'Opioid Tabanlı Yüksek Doz Dengeli Anestezi (Fentanil/Süfentanil + Düşük MAC İnhalasyon): Ciddi hemodinamik instabilite veya sol ventrikül yetmezliği olan SAK olgularında kardiyak stabiliteyi korumak için'
    ],
    notes: 'Anevrizma cerrahisinde anestezi yönetiminin 3 temel hedefi: (1) Klip konulana dek Transmural Basınç Gradyanını (TMP = MAP - ICP) sabit tutarak re-rüptürü önlemek (ani hipertansiyondan kesin kaçınma), (2) Mikronöroşirürjikal manevralar için ideal beyin gevşemesini sağlamak (mannitol, hipertonik salin, hafif hiperventilasyon, BOS drenajı), (3) Geçici klipleme veya rüptür durumunda nöroproteksiyon ve anlık kardiyovasküler manevraları kusursuz yönetmektir.'
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Nöroşirürji ve Girişimsel Nöroradyoloji Konsültasyonu: Anevrizmanın kesin anatomik yerleşimi (ACoA, MCA, PCoA, Baziler), boyun genişliği, kubbe (dome) yönelimi, vazospazm durumu ve BT Fisher kanama derecesinin incelenmesi.',
      'Kardiyoloji Konsültasyonu: SAK sonrası miyokardiyal "stunning" (nörojenik stres kardiyomiyopatisi / Takotsubo benzeri disfonksiyon), Troponin-I yüksekliği, EKG’de QT uzaması, ST segment çökmeleri ve T negatifliklerinin değerlendirilmesi.',
      'Yoğun Bakım Konsültasyonu: Ameliyat sonrası postoperatif invaziv mekanik ventilasyon, Nöro-YBÜ yatağı ve sürekli hemodinamik monitörizasyon koordinasyonu.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Hunt-Hess ve WFNS Derecelendirmesi: Hastanın klinik durumu (Grade I-II: Asemptomatik veya hafif baş ağrısı; Grade III: Letarji, konfüzyon, hafif fokal defisit; Grade IV-V: Stupor, koma, deserebre rijidite) perioperatif morbidite ve mortaliteyi belirler.',
      'Rüptür Zamanı ve SAK Günü: Rüptür sonrası ilk 24-72 saat yeniden kanama (rebleeding) açısından en riskli dönemdir; 4.-14. günler ise serebral vazospazm ve gecikmiş serebral iskemi (DCI) pik dönemidir.',
      'KİBAS ve Akut Hidrosefali Varlığı: Hastada ventrikülostomi / Eksternal Ventriküler Drenaj (EVD) açılmış mı? Bazal KİBAS düzeyi ve herniasyon riski değerlendirilmelidir.',
      'Ense Sertliği ve Meningeal İrritasyon: Şiddetli boyun kısıtlılığı ve zor laringoskopi riski sorgulanmalıdır.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 4 Ünite Eritrosit Süspansiyonu (ES) + 2-4 Ünite TDP Cross-Match doğrulaması.',
      'Seri Hemoglobin / Hematokrit: Bazal hematokrit düzeyi belirlenmelidir; serebral mikrosirkülasyonda ideal kan viskozitesi ve O2 taşınması için hedef Hct %30-33 aralığıdır.',
      'Koagülasyon Paneli (PT, aPTT, INR, Fibrinojen): SAK olgularında doku faktörü salınımına bağlı subklinik tüketim koagülopatisi gelişebilir; Fibrinojen >200 mg/dL olmalıdır.',
      'Serum Elektrolitleri (Özellikle Sodyum - Na+): SAK hastalarında Serebral Tuz Kaybettiren Sendrom (CSWS) veya SIADH nedeniyle HİPONATREMİ çok sıktır. Hiponatremi beyin ödemini ve vazospazmı tetikler; preoperatif mutlaka düzeltilmelidir!',
      'Kardiyak Belirteçler (Troponin-I, CK-MB) ve 12 Derivasyonlu EKG: Nörojenik miyokardiyal hasarın saptanması.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line) — Kalp (Sağ Atriyum) ve Tragus (Foramen Monro) Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle mutlaka yerleştirilmelidir. Transmural basıncı korumak ve indüksiyondaki ani dalgalanmaları yakalamak için şarttır.',
      'Santral Venöz Basınç (CVP) / Santral Venöz Kateter: Vazoaktif infüzyonların güvenli titrasyonu ve volüm durumunun izlenmesi.',
      'Sürekli End-Tidal CO2 (EtCO2) & Seri Arteriyel Kan Gazı (ABG): PaCO2 hedefi kesin olarak 32 - 35 mmHg aralığında tutulmalıdır (PaCO2 <30 mmHg vazospazm ve serebral iskemi yaratır; >38 mmHg beyin şişmesine yol açar).',
      'İntraoperatif Nöromonitörizasyon (İONM): Motor Uyarılmış Potansiyeller (MEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP) ve EEG. Klip uygulaması sırasında perforatör veya parent arter iskemisinin anında tespiti için.',
      'EEG / Bispektral İndeks (BIS / SedLine): Geçici klipleme öncesinde nöroproteksiyon amaçlı "Burst Süpresyon" (patlama baskılanması) düzeyinin izlenmesi.',
      'İntraoperatif İndosiyanin Yeşili (ICG) Video-Anjiyografi & Mikro-Vasküler Doppler USG: Klip konulduktan sonra anevrizmanın kapandığını ve komşu arterlerin açık kaldığını mikroskop altında teyit etmek için cerrahla koordinasyon.',
      'Isı Problu Foley İdrar Sondası: Sıvı-elektrolit dengesi, Mannitol diürezi ve normotermi takibi.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik venöz damar yolu (14G ve/veya 16G) — masif kan transfüzyon cihazına uygun olmalıdır.',
      'Ultrason eşliğinde İnternal Juguler veya Subklavyen Santral Venöz Kateter (CVC).',
      'İnvaziv Radial veya Brakial Arter Kateteri (indüksiyon öncesi yerleştirilmiş).'
    ],
    // 4c) Hasta pozisyonu
    patientPosition: 'Supine (Sırtüstü), baş Mayfield 3 çivili başlıkla tespit edilmiş; lezyon tarafına göre 15 - 45 derece rotasyon ve 15 - 20 derece baş elevasyonu (Reverse Trendelenburg).',
    patientPositionDetails: [
      'Baş Elevasyonu (15 - 20°): Serebral venöz drenajı kolaylaştırarak intrakraniyal venöz göllenmeyi ve intrakraniyal basıncı düşürür.',
      'Juguler Venöz Basının Önlenmesi: Boyun aşırı rotasyona veya fleksiyona zorlanmamalıdır (çene ile sternum arasında en az 2 parmak mesafe korunmalı); juguler ven kompresyonu akut beyin şişmesine ve kontrolsüz kanamaya neden olur.',
      'Mayfield Çivisi Takılma Anı: Şiddetli sempatik refleks yanıt (ani hipertansiyon ve taşikardi) anevrizmayı patlatabilir! Çivi giriş yerlerine bol lokal anestezik infiltrasyonu yapılmalı ve ek Propofol/Remifentanil bolusu verilmelidir.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'İndüksiyon Prensibi: Pürüzsüz ve kesinlikle hemodinamik dalgalanmasız indüksiyon. Laringoskopiye bağlı hipertansif atağın önlenmesi (Lidokain 1.5 mg/kg, Fentanil 3-5 mcg/kg veya Remifentanil, Propofol 1.5-2 mg/kg, Rokuronyum 1-1.2 mg/kg).',
      'Transmural Basınç (TMP) Dengesi: Klip konulana kadar TMP = MAP - ICP formülü geçerlidir. Anevrizma duvarına binen gerilimi azaltmak için MAP hastanın bazal değerinde veya %10-15 altında tutulmalı (Sistolik KB 100-120 mmHg, MAP 70-85 mmHg); hipertansiyondan KESİNLİKLE kaçınılmalıdır.',
      'Beyin Gevşetme Stratejisi (Optimal Brain Relaxation): (1) Mannitol %20 (0.5 - 1 g/kg IV 20-30 dakikada, kemik flebi kaldırılırken verilir) ve/veya Hipertonik Salin (%3 NaCl 150-250 mL); (2) PaCO2 32-35 mmHg hafif hiperventilasyon; (3) Derin nöromusküler blokaj (TOF 0); (4) EVD veya lomber drenajdan yavaşça BOS boşaltılması (hızlı boşaltma TMP\'yi artırıp rüptüre yol açabilir!).',
      'Geçici Klipleme (Temporary Clipping) & Nöroproteksiyon: Cerrah besleyici ana damara geçici klip koyduğunda: (1) Oklüzyon süresi kronometre ile sesli duyurulur (<10 dk hedeflenir); (2) Kollateral perfüzyonu artırmak için MAP %10-20 yükseltilir (MAP 85-100 mmHg); (3) CMRO2 süpresyonu için IV Propofol bolusu ile EEG\'de burst süpresyon indüklenir; (4) Geçici klip açıldığında kan basıncı normale indirilir.',
      'İNTRAOPERATİF ANEVRİZMA RÜPTÜRÜ ACİL PROTOKOLÜ: (1) Cerrah anında uyarılır, iki aspiratör tam vakumda çalıştırılır; (2) MAP 50-60 mmHg seviyesine düşürülür (cerraha proksimal kontrol şansı vermek için Labetalol, Esmolol veya Nitrogliserin); (3) ADENOZİN PROTOKOLÜ: Cerraha anevrizmayı kliplemesi için 30-45 saniyelik tansiyonsuz hareketsiz alan sağlamak üzere IV 0.3-0.4 mg/kg (18-36 mg) hızlı bolus Adenozin verilerek geçici kardiyak duraklama (asistoli) sağlanır; (4) Masif transfüzyon hızlı infüzörle başlatılır.',
      'Kalıcı Klip Sonrası Hemodinamik Hedef: Anevrizma başarıyla kliplendikten sonra cerrah vazospazm ve perforatör perfüzyonunu incelerken kan basıncı normotansif/ılımlı hipertansif seviyeye (SAB 120-140 mmHg) getirilir.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Güvenli Orotrekeal Entübasyon: Spiral telli (armored) veya bükülmeye dirençli endotrakeal tüp; cerrahi sahayı engellemeyecek şekilde karşı ağız köşesinden sabitlenir.',
      'Laringoskopi Yanıtının Baskılanması: Entübasyon öncesi IV Lidokain (1.5 mg/kg) ve Remifentanil bolusu ile öksürük ve sempatik yanıt tamamen bloke edilir.',
      'Ekstübasyon Kararı: Sadece Hunt-Hess Grade 1-2, intraoperatif rüptür veya komplikasyon yaşamayan, cerrahisi sorunsuz geçen, normotermik ve tam uyanık hastalarda masada ekstübasyon düşünülür. Grade 3-5, masif kanama gelişen veya beyin ödemi olan olgular sedatize ve entübe olarak Nöro-YBÜ\'ye devredilir.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Mayfield Başlığının Çivilenmesi: En riskli erken aşama; sempatik deşarja bağlı akut rüptür riski -> Derin anestezi ve çivi yerlerine lokal anestezik.',
      'Dura Mater Açılışı ve Beyin Gevşekliği: Dura açıldığında beyin gevşek ve pulsatil olmalıdır. Tıkız beyinde eksternal BOS drenajı, mannitol infüzyonu ve PaCO2 kontrolü hızla yapılır.',
      'Sylvian Fissür Diseksiyonu ve Araknoide Yaklaşım: Anevrizma kubbesine çok yaklaşıldığından cerrahın manipülasyonu sırasında ani rüptür riski; kan basıncı pürüzsüz tutulmalıdır.',
      'Proksimal Kontrol ve Geçici Klip Uygulanması: Anestezi ekibi süreyi dakika dakika cerraha duyurur (Örn: "Geçici klip 5. dakika, 8. dakika, 10. dakika").',
      'Kalıcı Klip Yerleştirilmesi ve Boyun Kapatılması: Klip bacakları otururken kubbenin yırtılma riski en üst düzeydedir; mutlak hareketsizlik şarttır.',
      'ICG Video-Anjiyografi Fazı: Cerrahın talebiyle IV İndosiyanin Yeşili (2.5 - 5 mg) enjekte edilir; anevrizmanın dolmadığı ve distal damarların açık olduğu floresan mikroskopla izlenir.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Öksürük ve Ikınmanın (Bucking/Straining) Kesinlikle Önlenmesi: Baş çividen çıkarılırken veya ekstübasyon sırasında ıkınma intrakraniyal basıncı ve arteriyel basıncı fırlatarak yeni konulan klibin kaymasına veya intrakraniyal kanamaya yol açar. IV Lidokain (1-1.5 mg/kg) veya düşük doz remifentanil infüzyonu eşliğinde pürüzsüz uyanma sağlanır.',
      'Hemodinamik Stabilite: Sistolik kan basıncının 140 mmHg üzerine çıkması önlenmeli; hipertansiyonda labetalol (5-10 mg aralıklı) veya nikardipin titre edilmelidir.',
      'Erken Nörolojik Muayene: Ekstübe edilen hastada pupiller refleksler, verbal yanıt ve ekstremite motor kuvveti ameliyat masasından ayrılmadan önce değerlendirilip kaydedilmelidir.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Bölgesel Skalp Bloğu: Cerrahi bitiminde tekrarlanan skalp bloğu (%0.25 Bupivakain + Epinefrin) postop ilk 12-24 saatlik opioid ihtiyacını belirgin azaltır.',
      'Sistemik Non-Opioid Analjezi: IV Parasetamol (1 g q6h) düzenli uygulanır.',
      'Opioid Titrasyonu: Pupiller yanıtı ve GKS takibini bozmamak için sadece şiddetli atılım ağrılarında düşük doz titre edilerek (IV Tramadol 50 mg veya Fentanil 25 mcg) verilir.',
      'NSAİİ Kısıtlaması: Nöroşirürjide intrakraniyal kanama ve hematom riski nedeniyle cerrah onayı olmaksızın NSAİİ kullanımı kısıtlanır.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Skalp Sinir Blokajı / İnsizyonel Lokal Anestezik İnfiltrasyonu: Postoperatif ağrı skorlarını ve opioid tüketimini azaltmada en yüksek kanıt düzeyine sahip yöntemdir.',
      'Sistemik Parasetamol: Rutin bazal analjezik olarak 6 saatte bir 1 g IV uygulanması önerilir.',
      'Sedatif Opioidlerden Kaçınma: Erken nörolojik değerlendirmeyi maskelememek amacıyla kurtarıcı opioidlerin yalnızca şiddetli ağrıda mikro-dozlar halinde titre edilmesi tavsiye edilir.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Övolemik Normotansiyon / Kontrollü Hipertansiyon: Eski "Triple-H" (Hipertansiyon, Hipervolemi, Hemodilüsyon) yaklaşımının yerini güncel rehberlerde övoleminin korunması ve vazospazm şüphesinde hedefe yönelik hipertansiyon almıştır.',
      'Nimodipin Tedavisi: Vazospazm ve gecikmiş serebral iskemi (DCI) profilaksisi için enteral yoldan 60 mg q4h (21 gün boyunca) sürdürülmelidir.',
      'Sürekli Nöromonitörizasyon ve TCD (Transkraniyal Doppler): Yoğun bakımda serebral vazospazm taraması için günlük MCA akım hızlarının takibi.',
      'Erken Postoperatif Beyin BT / BT Anjiyografi: Klip pozisyonu, rezidüel hematom veya parankimal iskeminin ilk saatlerde doğrulanması.',
      'Sıvı-Elektrolit Dengesi: Hiponatremi gelişiminin önlenmesi ve idrar çıkışının saatlik takibi.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section I: Neurosurgical Procedures - Craniotomy for Intracranial Aneurysm, pp. 35–42. Lippincott Williams & Wilkins.",
    erasReference: 'Hagan, K. B., et al. Consensus Statement for Perioperative Care in Craniotomy: Enhanced Recovery After Surgery (ERAS®) Society Recommendations. World Neurosurg.',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in craniotomy. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Hoh, B. L., et al. (2023). 2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage: A Guideline From the American Heart Association/American Stroke Association (AHA/ASA). Stroke, 54(7), e314-e370.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC): Consensus Statement on Anesthetic Management of Patients Undergoing Intracranial Aneurysm Surgery.',
      "Cottrell, J. E., & Patel, P. (2016). Cottrell and Patel's Neuroanesthesia (6th ed.). Chapter 15: Anesthetic Management of Cerebral Aneurysms and Subarachnoid Hemorrhage. Elsevier.",
      'ESAIC Guidelines on Management of Severe Perioperative Bleeding: Neurosurgical & Hemostatic Considerations.',
      'ASA Practice Guidelines for Perioperative Blood Management and Transfusion Triggers in High-Risk Neurosurgery.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 64: Anesthesia for Neurologic Surgery - Aneurysm Clipping, Burst Suppression and Temporary Occlusion.'
    ]
  }
};
