import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: İntrakraniyel Anevrizma Cerrahisi (Kliplenme / Rekonstrüksiyon)
 * 
 * Jaffe (6th ed., 2020), AHA/ASA 2023 Guidelines for the Management of Patients With Aneurysmal
 * Subarachnoid Hemorrhage, SAHARA Trial (2024/2025), ULTRA (Lancet 2021), IHAST (NEJM 2005),
 * SNACC, ERAS (Hagan et al., 2016) ve PROSPECT Craniotomy 2023 (Mestdagh et al.) referans alınarak yapılandırılmıştır.
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
      'Seçilmiş Olgularda Adenozin İle Geçici Akım Duraklatması (Adenosine-Induced Flow Arrest): Proksimal geçici kliplemenin teknik olarak mümkün olmadığı derin/kontrolsüz rüptürde 30-45 saniyelik tansiyonsuz alan sağlamak üzere santral hattan IV 0.3-0.4 mg/kg hızlı bolus Adenozin + 20 mL SF puşe (ZORUNLU ÖN KOŞUL: vaka başından takılı eksternal transkutanöz pacing/defibrilasyon pedleri; kontrendikasyonlar dışlanmalıdır)',
      'Hızlı Sıvı/Kan Isıtıcı ve Masif İnfüzyon Sistemi (Belmont / Rapid Infuser) ameliyathanede hazır ve hatları prime edilmiş olmalıdır',
      'Cell-Saver (Otolog Kan Kurtarma): İntrakraniyal anevrizma cerrahisinde enfeksiyon veya malignite bulunmadığından cerrahi alandan aspire edilen kan yıkanarak hızla hastaya geri verilebilir',
      'Rutin Traneksamik Asit (TXA) ÖNERİLMEZ: AHA/ASA 2023 Class 3 (Yararsız) ve ULTRA (Lancet 2021) çalışması doğrultusunda aSAH olgularında rutin antifibrinolitik profilaksi klinik sonlanımı iyileştirmez ve tromboembolik komplikasyon riski taşır',
      'Topikal hemostatik matrisler: Bipolar mikro-koagülasyon, FloSeal jelatin hemostatik matris, pamuk kompresyonu ve Surgicel'
    ]
  },

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol & Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Uçucu İnhalasyon Anesteziği (<0.5 MAC Sevofluran): Serebral metabolik oksijen tüketimini (CMRO2) ve serebral kan akımını (CBF) azaltır, optimal beyin gevşemesi sağlar ve intraoperatif nöromonitörizasyonu (MEP/SSEP) baskılamaz'
    ],
    alternative: [
      'Opioid Tabanlı Yüksek Doz Dengeli Anestezi (Fentanil/Süfentanil + Düşük MAC İnhalasyon): Ciddi hemodinamik instabilite veya SAK kaynaklı sol ventrikül disfonksiyonu (Takotsubo stres kardiyomiyopatisi) olan olgularda kardiyak stabiliteyi korumak için'
    ],
    clinicalRationale: 'Propofol ve Remifentanil bazlı TIVA (veya <0.5 MAC Sevofluran desteği), serebral metabolik hızı (CMRO2) ve serebral kan akımını (CBF) azaltarak cerrahi için ideal beyin gevşemesini sağlarken İONM (TcMEP/SSEP) sinyallerini korur. Azot protoksit (N2O) KİBAS, serebral vazodilatasyon ve pnömosefali riski nedeniyle KESİNLİKLE KONTRENDİKEDİR. Laringoskopi ve Mayfield çivisi sırasındaki hipertansiyon pikini baskılamak ve baş-mikroskop manipülasyonlarında tüp katlanmasını (kinking) önlemek için spiral telli (armored) orotrakeal entübasyon altın standarttır.',
    notes: 'ANEVRİZMA CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) TRANSMURAL BASINÇ GRADYANI (TMP) VE AHA/ASA 2023 KB HEDEFİ — Klip öncesi ağır hipertansiyon (SKB ≥160 mmHg) ve hipotansiyondan (bazal MAP\'ta >%20 düşüş) kesinlikle kaçınılır; (2) OPTİMAL BEYİN GEVŞEMESİ VE NORMOKAPNİ — Bazal PaCO2 35-38 mmHg, yalnızca tıkız beyinde kısa süreli 30-35 mmHg kurtarma; (3) GEÇİCİ KLİPLEME VE RÜPTÜR (IAR) PROTOKOLÜ — IAR\'da NTG KONTRENDİKEDİR; hızlı volüm resüsitasyonu, proksimal geçici klipleme veya pacing pedli seçilmiş Adenozin akım duraklatması uygulanır.',
    rulesTitle: 'ANEVRİZMA CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'TRANSMURAL BASINÇ GRADYANI (TMP) VE AHA/ASA 2023 KAN BASINCI YÖNETİMİ',
        content: 'Anevrizma kliplenene dek duvar gerilimini belirleyen TMP = MAP - ICP pürüzsüz tutulmalıdır. AHA/ASA 2023 aSAH kılavuzu uyarınca ağır hipertansiyondan (SKB <160 mmHg korunur) ve ani ICP düşüşünden (hızlı BOS drenajı) kaçınılırken; serebral iskemiyi önlemek için HİPOTANSİYONDAN DA KESİNLİKLE KAÇINILIR (bazal MAP\'tan >%20 düşüş yapılmaz, rutin agresif SKB 100-120 hedeflenmez).'
      },
      {
        number: 2,
        title: 'BEYİN GEVŞEMESİ (SLACK BRAIN), NORMOKAPNİ VE İONM-TOF UYUMU',
        content: 'Bazal solunum hedefi normokapnidir (PaCO2 35-38 mmHg); hafif hipokapni (30-35 mmHg) yalnızca tıkız beyin (tight brain) durumunda geçici kurtarma olarak uygulanır. TcMEP monitörizasyonu varsa idamede KESİNLİKLE sürekli nöromusküler bloker verilmez (TOF ≥0.90 / 4/4 doğrulanır) ve koruyucu ısırma bloğu (bite block) yerleştirilir.'
      },
      {
        number: 3,
        title: 'İNTRAOPERATİF RÜPTÜR (IAR) PROTOKOLÜ: NTG YASAĞI VE ADENOZİN GÜVENLİĞİ',
        content: 'IAR\'da Nitrogliserin (NTG) serebral vazodilatasyonla KİBAS\'ı fırlattığı için KESİNLİKLE KONTRENDİKEDİR ve hipovolemik hastada rutin sistemik hipotansiyon (MAP 50-60) uygulanmaz. Öncelik hızlı volüm/kan resüsitasyonu ve proksimal geçici kliplemedir; seçilmiş olgularda IV Adenozin (0.3-0.4 mg/kg CVC bolusu + SF puşe) yalnızca önceden takılı eksternal pacing/defibrilasyon pedleriyle ve kontrendikasyonlar dışlanarak uygulanır.'
      },
      {
        number: 4,
        title: 'GEÇİCİ KLİPTE KOLLATERAL PERFÜZYON, NORMOTERMİ VE MODERN TRANSFÜZYON',
        content: 'Geçici kliplemede öncelik kollateral akımı korumak için MAP\'ı bazale göre %10-20 yükseltmek ve oklüzyonu <10 dk tutmaktır (rutin burst süpresyon kanıta dayalı standart değildir). Rutin hipotermi (IHAST) ve rutin TXA (ULTRA) önerilmez; normotermi (36.0-37.0°C), izotonik sıvılar, glukoz 140-180 mg/dL ve modern transfüzyon eşiği (Hb <7-8 g/dL; aktif vazospazm/DCI\'da 8-9 g/dL) korunur.'
      }
    ]
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Nöroşirürji ve Girişimsel Nöroradyoloji Konsültasyonu: Anevrizmanın kesin anatomik yerleşimi (ACoA, MCA, PCoA, Baziler), boyun genişliği, kubbe (dome) yönelimi, vazospazm durumu ve BT Fisher kanama derecesinin incelenmesi.',
      'Kardiyoloji Konsültasyonu: SAK sonrası miyokardiyal "stunning" (nörojenik stres kardiyomiyopatisi / Takotsubo benzeri disfonksiyon), Troponin-I yüksekliği, EKG\'de QT uzaması, ST segment çökmeleri ve T negatifliklerinin değerlendirilmesi (Takotsubo veya ciddi iletim bloğu varlığı Adenozin kullanımını kontrendike kılar!).',
      'Yoğun Bakım Konsültasyonu: Ameliyat sonrası postoperatif invaziv mekanik ventilasyon, Nöro-YBÜ yatağı ve sürekli hemodinamik monitörizasyon koordinasyonu.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Hunt-Hess ve WFNS Derecelendirmesi: Hastanın klinik durumu (Grade I-II: Asemptomatik veya hafif baş ağrısı; Grade III: Letarji, konfüzyon, hafif fokal defisit; Grade IV-V: Stupor, koma, deserebre rijidite) perioperatif morbidite ve mortaliteyi belirler.',
      'Rüptür Zamanı ve SAK Günü: Rüptür sonrası ilk 24-72 saat yeniden kanama (rebleeding) açısından en riskli dönemdir; 4.-14. günler ise serebral vazospazm ve gecikmiş serebral iskemi (DCI) pik dönemidir.',
      'KİBAS ve Akut Hidrosefali Varlığı: Hastada ventrikülostomi / Eksternal Ventriküler Drenaj (EVD) açılmış mı? Bazal KİBAS düzeyi ve herniasyon riski değerlendirilmelidir.',
      'Adenozin Kontrendikasyon Taraması: Ağır astım/bronkospazm, 2./3. derece AV blok, hasta sinüs sendromu, ciddi koroner arter hastalığı / aSAH Takotsubo kardiyomiyopatisi, WPW sendromu ve dipiridamol kullanımı preoperatif mutlaka sorgulanmalıdır.',
      'Ense Sertliği ve Meningeal İrritasyon: Şiddetli boyun kısıtlılığı ve zor laringoskopi riski sorgulanmalıdır.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 4 Ünite Eritrosit Süspansiyonu (ES) + 2-4 Ünite TDP Cross-Match doğrulaması.',
      'Seri Hemoglobin / Hematokrit (AHA/ASA 2023 & SAHARA 2024/2025): Eski "Triple-H" kaynaklı sabit Hct %30-33 hemodilüsyon yaklaşımı terk edilmiştir. Modern transfüzyon eşiği genel olgularda Hb <7-8 g/dL, aktif serebral vazospazm veya gecikmiş serebral iskemi (DCI) varlığında bireyselleştirilmiş olarak Hb 8-9 g/dL hedeflenir.',
      'Koagülasyon Paneli (PT, aPTT, INR, Fibrinojen): SAK olgularında doku faktörü salınımına bağlı subklinik tüketim koagülopatisi gelişebilir; Fibrinojen >200 mg/dL olmalıdır.',
      'Serum Elektrolitleri (Özellikle Sodyum - Na+): SAK hastalarında CSWS veya SIADH nedeniyle hiponatremi sıktır. Hafif/asemptomatik hiponatremi için ACİL ANEVRİZMA KLİPLENMESİ ASLA GECİKTİRİLMEMELİDİR! AHA/ASA 2023 Class 3 (Zararlı) uyarınca aSAH\'ta SIVI KISITLAMASI KONTRENDİKEDİR (vazospazm ve DCI\'yı artırır); tedavi izotonik/hipertonik salin (%3 NaCl) ± fludrokortizon ile övolemik olarak yapılır ve Ozmotik Demiyelinizasyon Sendromunu (ODS) önlemek için düzeltme hızı ≤ 6-8 mEq/L / 24 saat ile sınırlandırılır.',
      'Kardiyak Belirteçler (Troponin-I, CK-MB), Kan Şekeri (hedef 140-180 mg/dL) ve 12 Derivasyonlu EKG: Nörojenik miyokardiyal hasarın ve ileti kusurlarının saptanması.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu / Foramen Monro) Seviyesinde Sıfırlanmış: Baş elevasyonunda doğru Serebral Perfüzyon Basıncı (CPP) ölçümü için transdüser yalnızca Tragus (Foramen Monro) seviyesinde sıfırlanır. Anestezi indüksiyonu ÖNCESİ lokal anesteziyle mutlaka yerleştirilmelidir.',
      'Santral Venöz Kateter (CVC): Vazoaktif infüzyonların güvenli santral titrasyonu, gerektiğinde hızlı Adenozin bolusu (20 mL SF puşe ile) ve intravasküler volüm/övolemi takibi için.',
      'Eksternal Transkutanöz Pacing / Defibrilasyon Pedleri: Adenozin akım duraklatması olasılığına karşı indüksiyon öncesinde/başlangıçta hastaya mutlaka yapıştırılıp defibrilatör/pacer bağlantısı doğrulanmalıdır.',
      'Sürekli End-Tidal CO2 (EtCO2) & Seri Arteriyel Kan Gazı (ABG): Bazal hedef normokapnidir (PaCO2 35-38 mmHg). Rutin profilaktik hiperventilasyon YAPILMAZ; yalnızca tıkız beyin (tight brain) geliştiğinde geçici kurtarma amaçlı kısa süreli hafif hipokapni (PaCO2 30-35 mmHg) uygulanır.',
      'İntraoperatif Nöromonitörizasyon (İONM) ve TOF: TcMEP, SSEP ve EEG ile klip uygulaması sırasında perforatör veya parent arter iskemisinin anında tespiti. TcMEP izleniyorsa TOF ≥0.90 (4/4) ile nöromusküler blokajın olmadığı doğrulanır ve dil/dudak yaralanmasını önlemek için yumuşak ısırma bloğu (bite block) yerleştirilir.',
      'İntraoperatif İndosiyanin Yeşili (ICG) Video-Anjiyografi & Mikro-Vasküler Doppler USG: Klip konulduktan sonra anevrizmanın kapandığını ve komşu arterlerin açık kaldığını mikroskop altında teyit etmek için cerrahla koordinasyon.',
      'Seri Kan Şekeri (hedef 140-180 mg/dL) ve Isı Problu Foley İdrar Sondası: Övolemi, ozmotik diürez ve sıkı normotermi (36.0-37.0°C) takibi.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik venöz damar yolu (14G ve/veya 16G) — masif kan transfüzyon cihazına uygun olmalıdır.',
      'Ultrason eşliğinde İnternal Juguler veya Subklavyen Santral Venöz Kateter (CVC).',
      'İnvaziv Radial veya Brakial Arter Kateteri (indüksiyon öncesi yerleştirilmiş, Tragus/Foramen Monro seviyesinde sıfırlanmış).'
    ],
    // 4c) Hasta pozisyonu
    patientPosition: 'Supine (Sırtüstü), baş Mayfield 3 çivili başlıkla tespit edilmiş; lezyon tarafına göre 15 - 45 derece rotasyon ve 15 - 20 derece baş elevasyonu (Reverse Trendelenburg).',
    patientPositionDetails: [
      'Baş Elevasyonu (15 - 20°): Serebral venöz drenajı kolaylaştırarak intrakraniyal venöz göllenmeyi ve intrakraniyal basıncı düşürür (A-line transdüseri mutlaka Tragus/Foramen Monro seviyesinde tutulmalıdır).',
      'Juguler Venöz Basının Önlenmesi: Boyun aşırı rotasyona veya fleksiyona zorlanmamalıdır (çene ile sternum arasında en az 2 parmak mesafe korunmalı); juguler ven kompresyonu akut beyin şişmesine ve kontrolsüz kanamaya neden olur.',
      'Mayfield Çivisi Takılma Anı: Şiddetli sempatik refleks yanıt (ani hipertansiyon ve taşikardi) anevrizmayı patlatabilir! Çivi giriş yerlerine lokal anestezik infiltrasyonu yapılır ve ek Propofol/Remifentanil bolusu verilir. DİKKAT: Klip öncesi skalp bloğu veya çivi infiltrasyonunda epinefrin içeren solüsyonların kazara intravasküler enjeksiyonu ani hipertansiyon/taşikardi ve rüptür tetikleyebileceğinden mutlaka dikkatli aspirasyon yapılmalı veya klip öncesi epinefrinsiz/düşük riskli dikkatli infiltrasyon tercih edilmelidir (toplam LA mg/kg maks dozu aşılmamalı, LAST protokolü hazır olmalıdır).'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'İndüksiyon Prensibi: Pürüzsüz ve hemodinamik dalgalanmasız indüksiyon. Laringoskopiye bağlı hipertansif atağın önlenmesi (Lidokain 1.5 mg/kg, Fentanil 3-5 mcg/kg veya Remifentanil, Propofol 1.5-2 mg/kg, Rokuronyum 0.6-1.0 mg/kg) ile birlikte hipotansiyonun da önlenmesi şarttır.',
      'Pre-Klip Kan Basıncı ve TMP Dengesi (AHA/ASA 2023): Klip konulana kadar TMP = MAP - ICP sabit tutulur. Ağır hipertansiyondan kesinlikle kaçınılır (SKB <160 mmHg korunur, pürüzsüz geçişler sağlanır); ancak eski rutin SKB 100-120 hedefi UYGULANMAZ ve bazal MAP\'ta >%20 düşüşe (hipotansiyon/iskemi) kesinlikle izin verilmez.',
      'İdame, N2O Yasağı, Sıvı ve Glisemik Hedef: Propofol + Remifentanil TIVA (veya <0.5 MAC Sevofluran). Azot protoksit (N2O) KESİNLİKLE KONTRENDİKEDİR. Yalnızca izotonik kristaloidler (%0.9 NaCl veya dengeli izotonik Plasmalyte/İzolen) ile övolemi korunur; hipotonik (Ringer Laktat dahil hipo-ozmolar) ve dekstroz içeren sıvılar KULLANILMAZ. İntraoperatif kan şekeri 140-180 mg/dL, vücut ısısı normotermik (36.0-37.0°C; rutin hipotermi IHAST çalışması gereği önerilmez) tutulur.',
      'Nöromusküler Blokaj ve İONM Uyumu: TcMEP monitörizasyonu uygulanıyorsa entübasyon sonrasında idamede KESİNLİKLE sürekli kas gevşetici verilmez (TOF ≥0.90 / 4/4 doğrulanır) + TIVA + yumuşak ısırma bloğu (bite block) kullanılır. Yalnızca MEP kullanılmayan ve cerrahın mutlak immobilizasyon istediği seçilmiş olgularda idame NMB uygulanabilir.',
      'Beyin Gevşetme Stratejisi (Slack Brain): (1) %20 Mannitol (0.5-1 g/kg IV) ve/veya %3 Hipertonik Salin (150-250 mL); (2) Bazal normokapni (PaCO2 35-38 mmHg) — kısa süreli hafif hipokapni (PaCO2 30-35 mmHg) YALNIZCA tıkız beyinde geçici kurtarma amaçlı kullanılır; (3) EVD veya lomber drenajdan kademeli ve yavaş BOS boşaltılması (hızlı drenaj TMP\'yi artırıp rüptüre yol açabilir!).',
      'Geçici Klipleme (Temporary Clipping): Cerrah besleyici ana damara geçici klip koyduğunda: (1) Oklüzyon süresi kronometre ile sesli duyurulur (<10 dk hedeflenir); (2) ÖNCELİK kollateral perfüzyonu artırmak için MAP\'ın bazale göre %10-20 yükseltilmesidir; (3) Rutin EEG burst süpresyonunun kanıtlanmış üstünlüğü olmadığından standart olarak önerilmez (yalnızca uzamış oklüzyon öngörülen seçilmiş olgularda cerrahla birlikte değerlendirilir); (4) Klip açıldığında KB bazal/hedef düzeyine indirilir.',
      'İNTRAOPERATİF ANEVRİZMA RÜPTÜRÜ (IAR) ACİL PROTOKOLÜ: (1) Cerrah anında uyarılır, iki yüksek vakumlu aspiratör çalıştırılır; (2) NİTROGLİSERİN (NTG) KESİNLİKLE KULLANILMAZ (serebral vazodilatatördür, KİBAS\'ı fırlatır!) ve hipovolemik hastada rutin sistemik hipotansiyon (MAP 50-60) UYGULANMAZ; (3) Öncelik hızlı volüm/kan resüsitasyonu (Rapid Infuser) ve cerrahın proksimal geçici kliplemesidir; (4) ADENOZİN AKIM DURAKLATMA PROTOKOLÜ (seçilmiş zor/derin rüptürde): Önceden yerleştirilmiş eksternal transkutanöz pacing/defibrilasyon pedleri eşliğinde, kontrendikasyonlar (ağır astım, 2./3. derece AV blok, hasta sinüs, ciddi KAH / aSAH Takotsubo kardiyomiyopatisi, WPW, dipiridamol) yoksa CVC\'den 0.3-0.4 mg/kg IV hızlı bolus Adenozin + 20 mL SF puşe ile 30-45 sn geçici akım duraklatması sağlanır.',
      'Kalıcı Klip Sonrası Hemodinamik Hedef: Anevrizma güvenle kliplendikten sonra perforatör perfüzyonunu korumak için normotansiyon veya vazospazm şüphesinde kontrollü/ılımlı yüksek KB (övolemik) idame ettirilir.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      'Güvenli Orotrekeal Entübasyon: Spiral telli (armored) veya bükülmeye dirençli endotrakeal tüp; cerrahi sahayı engellemeyecek şekilde karşı ağız köşesinden sabitlenir ve TcMEP uygulanacaksa yumuşak ısırma bloğu (bite block) yerleştirilir.',
      'Laringoskopi Yanıtının Baskılanması: Entübasyon öncesi IV Lidokain (1.5 mg/kg) ve Remifentanil bolusu ile öksürük ve sempatik yanıt tamamen bloke edilir; eşzamanlı hipotansiyondan kaçınılır.',
      'Ekstübasyon Kararı: Sadece Hunt-Hess Grade 1-2, intraoperatif rüptür veya komplikasyon yaşamayan, cerrahisi sorunsuz geçen, normotermik ve tam uyanık hastalarda masada ekstübasyon düşünülür. Grade 3-5, masif kanama gelişen veya beyin ödemi olan olgular sedatize ve entübe olarak Nöro-YBÜ\'ye devredilir.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Mayfield Başlığının Çivilenmesi: En riskli erken aşama; sempatik deşarja bağlı akut rüptür riski -> Derin anestezi, çivi yerlerine dikkatli lokal anestezik (intravasküler epinefrin enjeksiyonundan kaçınarak).',
      'Dura Mater Açılışı ve Beyin Gevşekliği: Dura açıldığında beyin gevşek ve pulsatil olmalıdır. Tıkız beyinde boyun venöz drenajı, anestezi derinliği, yavaş BOS drenajı, ozmoterapi ve yalnızca kurtarma amaçlı kısa süreli PaCO2 30-35 mmHg uygulanır.',
      'Sylvian Fissür Diseksiyonu ve Araknoide Yaklaşım: Anevrizma kubbesine çok yaklaşıldığından cerrahın manipülasyonu sırasında ani rüptür riski; kan basıncı pürüzsüz tutulmalı, hızlı transfüzyon ve Adenozin/pacing hazırlığı kontrol edilmelidir.',
      'Proksimal Kontrol ve Geçici Klip Uygulanması: Anestezi ekibi süreyi dakika dakika cerraha duyurur ("Geçici klip 5. dk, 8. dk, 10. dk") ve MAP\'ı bazale göre %10-20 yükseltir.',
      'Kalıcı Klip Yerleştirilmesi ve Boyun Kapatılması: Klip bacakları otururken kubbenin yırtılma riski en üst düzeydedir; tam hareketsizlik (TIVA derinliği ile) şarttır.',
      'ICG Video-Anjiyografi Fazı: Cerrahın talebiyle IV İndosiyanin Yeşili (2.5 - 5 mg) enjekte edilir; anevrizmanın dolmadığı ve distal damarların açık olduğu floresan mikroskopla izlenir.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Öksürük ve Ikınmanın (Bucking/Straining) Kesinlikle Önlenmesi: Baş çividen çıkarılırken veya ekstübasyon sırasında ıkınma intrakraniyal basıncı ve arteriyel basıncı fırlatarak yeni konulan klibin kaymasına veya intrakraniyal kanamaya yol açar. IV Lidokain (1-1.5 mg/kg) veya düşük doz remifentanil infüzyonu eşliğinde pürüzsüz uyanma sağlanır.',
      'Hemodinamik Stabilite: Aşırı hipertansiyon pikleri önlenmeli (gerektiğinde Labetalol 5-10 mg aralıklı veya Nikardipin titre edilerek), ancak klip sonrası vazospazm/perforatör iskemisine yol açacak ani hipotansiyondan da kaçınılmalıdır.',
      'Erken Nörolojik Muayene: Ekstübe edilen hastada pupiller refleksler, verbal yanıt ve ekstremite motor kuvveti ameliyat masasından ayrılmadan önce değerlendirilip kaydedilmelidir.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Bölgesel Skalp Bloğu / İnsizyonel İnfiltrasyon: Cerrahi bitiminde (klip güvence altına alındıktan sonra) uygulanan skalp bloğu veya insizyonel infiltrasyon (Ropivakain ≤3 mg/kg veya Levobupivakain/Bupivakain ≤2.5 mg/kg [epinefrinli ≤3 mg/kg]) postop ilk 12-24 saatlik opioid ihtiyacını belirgin azaltır; maksimum kümülatif mg/kg dozu aşılmamalı, aspirasyonla intravasküler enjeksiyon dışlanmalı ve LAST (%20 Lipid Emülsiyonu) protokolü hazır tutulmalıdır.',
      'Sistemik Non-Opioid Analjezi: IV Parasetamol (1 g q6h) düzenli bazal analjezik olarak uygulanır.',
      'Güvenli Kurtarıcı Opioid Titrasyonu (TRAMADOL KULLANILMAZ!): Tramadol nöbet eşiğini düşürdüğü ve şiddetli POBV/kusma ile KİBAS ve kan basıncı sıçramasına yol açtığı için kraniyal cerrahide KESİNLİKLE KULLANILMAZ. Yalnızca şiddetli atılım ağrısında nörolojik muayeneyi maskelemeyecek şekilde düşük doz titre IV Fentanil (25 mcg), Oksikodon veya bazal infüzyonsuz Morfin PCA tercih edilir.',
      'NSAİİ Kısıtlaması: Taze serebrovasküler cerrahi lojunda kanama ve hematom riski nedeniyle erken dönemde rutin NSAİİ (Deksketoprofen dahil — non-selektif COX-1/2 inhibitörüdür!) KULLANILMAZ; ancak nöroşirürjik hemostaz ve kontrol beyin BT doğrulaması sonrası cerrah onayıyla değerlendirilebilir.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'PROSPECT Craniotomy 2023 (Mestdagh et al.): Skalp sinir blokajı veya insizyonel lokal anestezik infiltrasyonu (maksimum mg/kg ve LAST kurallarına uyarak) ile düzenli sistemik Parasetamol (1 g IV q6h) temel multimodal omurgayı oluşturur.',
      'Kurtarıcı Opioid ve Antiemetik Stratejisi: Tramadol\'den kaçınılmalı; kurtarıcı kısa/düşük doz opioidler nörolojik izlemi maskelemeyecek biçimde titre edilmeli ve çift ajan POBV profilaksisi (Ondansetron + Deksametazon/antagonistler) rutin uygulanmalıdır.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Övolemik Normotansiyon / Hedefe Yönelik Hipertansiyon (AHA/ASA 2023): Eski "Triple-H" (Hipervolemi, Hemodilüsyon) yaklaşımı terk edilmiştir; övolemi korunur ve yalnızca semptomatik vazospazm/DCI geliştiğinde indüklenmiş hipertansiyon uygulanır.',
      'Nimodipin Tedavisi ve Hipotansiyon Yönetimi: Enteral Nimodipin 60 mg q4h (21 gün boyunca) Class 1 standarttır. Nimodipine bağlı hipotansiyon gelişirse ilacı KESMEK yerine doz bölünerek (30 mg q2h) veya eşzamanlı vazopressör desteğiyle tedavi sürdürülür.',
      'Sıvı-Elektrolit ve Sodyum Yönetimi: aSAH\'ta sıvı kısıtlaması KONTRENDİKEDİR (AHA/ASA 2023 Class 3 Zararlı). Hiponatremi izotonik/hipertonik salin ± fludrokortizon ile övolemik düzeltilir (ODS sınırı: ≤6-8 mEq/L / 24 saat).',
      'Glisemik Kontrol ve Normotermi: Kan şekeri 140-180 mg/dL, vücut ısısı normotermik (<37.5°C) tutulur.',
      'Sürekli Nöromonitörizasyon, TCD ve Erken Kontrol Beyin BT/BTA: Klip pozisyonu, rezidüel hematom, iskemi ve günlük TCD ile serebral vazospazm takibi yapılır.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2020). Anesthesiologist's Manual of Surgical Procedures (6th ed.). Wolters Kluwer. Section: Neurosurgery — Craniotomy for Intracranial Aneurysm.",
    erasReference: 'Hagan, K. B., Bhavsar, S., Raza, S. M., Arnold, B., Arunkumar, R., Dang, A., et al. (2016). Enhanced recovery after surgery for oncological craniotomies. Journal of Clinical Neuroscience, 24, 10–16.',
    prospectReference: "Mestdagh, F., Lavand'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group (ESRA). (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(5), 301–314.",
    otherReferences: [
      'Hoh, B. L., Ko, N. U., Amin-Hanjani, S., Chou, S. H.-Y., Cruz-Flores, S., Dangayach, N. S., et al. (2023). 2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage: A Guideline From the American Heart Association/American Stroke Association (AHA/ASA). Stroke, 54(7), e314–e370.',
      'English, S. W., Delaney, A., Fergusson, D. A., Chassé, M., Turgeon, A. F., Lauzier, F., et al.; SAHARA Trial Investigators. (2025). Liberal or Restrictive Transfusion Strategy in Aneurysmal Subarachnoid Hemorrhage (SAHARA). New England Journal of Medicine, 392, 1079–1088.',
      'Post, R., Germans, M. R., Tjerkstra, M. A., Vergouwen, M. D. I., Jellema, K., Koot, R. W., et al.; ULTRA Investigators. (2021). Ultra-early tranexamic acid after subarachnoid haemorrhage (ULTRA): a randomised controlled trial. The Lancet, 397(10269), 112–118.',
      'Todd, M. M., Hindman, B. J., Clarke, W. R., & Torner, J. C.; IHAST Investigators. (2005). Mild intraoperative hypothermia during surgery for intracranial aneurysm (IHAST). New England Journal of Medicine, 352(2), 135–145.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC): Consensus Statement on Anesthetic Management of Patients Undergoing Intracranial Aneurysm Surgery.',
      "Cottrell, J. E., & Patel, P. (2016). Cottrell and Patel's Neuroanesthesia (6th ed.). Chapter 15: Anesthetic Management of Cerebral Aneurysms and Subarachnoid Hemorrhage. Elsevier."
    ]
  }
};
