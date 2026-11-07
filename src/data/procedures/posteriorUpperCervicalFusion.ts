import { ProcedureDefinition } from '../../types/procedures';

/**
 * Posterior Fusion/Fixation of the Upper Cervical Spine
 * (Üst Servikal [Oksipitoservikal / C1-C2] Posterior Füzyon ve Fiksasyon Cerrahisi: Harms, Magerl ve Oksipitoservikal Stabilizasyon)
 * 
 * Jaffe (5th ed.), Cervical Spine Research Society (CSRS), AANS/CNS Guidelines for
 * Acute Cervical Spine Injuries, SNACC (Society for Neuroscience in Anesthesiology
 * and Critical Care) ve ERAS Spine konsensus raporları referans alınarak yapılandırılmıştır.
 */
export const posteriorUpperCervicalFusion: ProcedureDefinition = {
  id: 'posterior-upper-cervical-fusion',
  name: 'Üst Servikal (C1-C2 / O-C2) Posterior Füzyon ve Enstrümantasyon',
  shortCode: 'C1-C2-POST-FÜZYON',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Spinal Nöroşirürji & Kraniyoservikal Bileşke',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Oksiput, C1 (Atlas) ve C2 (Aksis) arasındaki kraniyoservikal ve atlantoaksiyel bileşke instabilitelerinin tedavisinde; prone (yüzüstü) pozisyonda posterior yaklaşımla uygulanan enstrümante stabilizasyon ve kemik greftleme ameliyatıdır. C1 lateral kitle (lateral mass) - C2 pedikül/istmus vida fiksasyonu (Harms-Goel tekniği), C1-C2 transartiküler vida fiksasyonu (Magerl tekniği) veya oksipital plak-servikal rod enstrümantasyonu (Oksipitoservikal Füzyon) yöntemlerini içerir.',
  indications: [
    'Atlantoaksiyel İnstabilite ve Subluksasyon: Romatoid Artrit pannus basısı, Down sendromu transvers ligaman gevşekliği ve travmatik ligamentöz yırtılmalar (ADI > 3-4 mm)',
    'Anterior vida fiksasyonuna elverişsiz veya başarısız olmuş Tip II Odontoid (Dens) Kırıkları (Posterior oblik kırıklar, osteoporotik dens fraktürleri, dens psödoartrozu)',
    'Oksipitoservikal Dislokasyon ve İnstabilite: Yüksek enerjili motorlu araç kazaları ve kraniyoservikal ayrılma yaralanmaları (O-C2 füzyon endikasyonu)',
    'Basilar İnvajinasyon ve Kraniyoservikal Bileşke Deformiteleri: Beyin sapı ve üst servikal kord basısı yaratan konjenital veya edinsel kemik anomalileri',
    'Jefferson (C1 Burst) ve Asılmış Adam (Hangman / C2 Travmatik Spondilolistezis) kırıklarına bağlı instabilite',
    'Kraniyoservikal bileşkenin primer veya metastatik tümörleri (kemik destrüksiyonu ve patolojik kırıklar)'
  ],
  averageDuration: '3.0 - 5.5 saat (Uyanık fiberoptik entübasyon, invaziv A-line, İONM kurulumu: 45-60 dk; Mayfield çivili başlık takılması ve PRONE pozisyona log-roll çevirme + İONM kontrolü: 30-45 dk; Suboksipital ve C1-C3 posterior orta hat cerrahi diseksiyonu: 60-75 dk; C1 lateral mass, C2 pedikül/pars vidalama veya oksipital plak yerleşimi: 60-90 dk; Kemik greftleme, biyomekanik fiksasyon, hemostaz ve katmanlı kapatma: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '250 - 600 mL (Suboksipital venöz pleksus, C2 sinir kökü çevresi epidural venöz göllenmeler ve spongiyöz kemik kanamaları nedeniyle orta-yüksek düzey kanama; A. vertebralis V3 segmenti laserasyonunda masif arteriyel kanama riski mevcuttur)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta-Yüksek Düzey Risk / Potansiyel Kritik Vasküler Kanama',
    crossMatchRequirement: 'En az 2 - 4 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır edilmeli, T&S ve Cell-Saver (Otolog Kan Kurtarma) aktif hazır bulundurulmalıdır',
    transfusionProbability: '%20 - %40 (Revizyon cerrahilerinde, romatoid artritli anemi hastalarında veya tümör rezeksiyonlarında %50-60)',
    criticalBleedingSources: [
      'A. vertebralis (V3 segmenti): C1 posterior arkının üst yüzeyindeki sulcus arteriae vertebralis boyunca seyreder ve C1-C2 eklem aralığında kıvrım yapar; C1 kitle veya C2 pedikül vidası sapmalarında ölümcül arteriyel yaralanma riski taşır',
      'Suboksipital Venöz Pleksus ve Kondiler Emissary Venler (dura ve foramen magnum çevresinde yoğun venöz kanama odakları)',
      'C2 gangliyonu ve C1-C2 intervertebral aralıktaki zengin epidural venöz pleksus göllenmesi',
      'Oksipital kemik diploik venleri ve suboksipital kas tabakası kesi kenarları'
    ],
    hemostasisStrategies: [
      'Karın basısını tamamen serbestleştiren prone pozisyonlama (Jackson masası / toraks-pelvis ruloları): Batın basısını önleyerek CVP ve epidural venöz pleksus kanamasını %50 azaltır',
      'Bipolar mikronöroşirürjikal koagülasyon ve bol miktarda hemostatik jelatin matriks (FloSeal / Surgiflo)',
      'Spongiyöz kemik kenarları için kemik mumu (Bone wax)',
      'Oksiput ve lamina kanamaları için Surgicel ve hemostatik pamuklar (Cottonoid pledget)',
      'Vertebral arter hasarında anında doğrudan bası, mikro-vasküler klip ve acil Girişimsel Nöroradyoloji koilleme/stentleme hazırlığı'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Dengeli Genel Endotrakeal Anestezi (GETA) + Total İntravenöz Anestezi (TIVA - Propofol & Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'Uyanık Esnek Fiberoptik Bronkoskopik Entübasyon (AFOI) + TIVA İdamesi: İnstabil kraniyoservikal omurgayı korumak için nöroanestezi altın standardı'
    ],
    alternative: [
      'TIVA + Düşük Doz Sevofluran (<0.4 - 0.5 MAC): İONM (MEP/SSEP) amplitüdlerini koruyacak şekilde titre edilerek'
    ],
    notes: 'Posterior üst servikal fiksasyonda anestezi yönetiminin 4 kritik sütunu: (1) Entübasyon ve PRONE çevirme esnasında boyunda fleksiyon/ekstansiyon ve rotasyonu tamamen engelleyerek medulla ve spinal kordu korumak, (2) İONM (tcMEP ve SSEP) sinyallerini baskılamamak için TIVA uygulamak ve indüksiyon sonrası KAS GEVŞETİCİ KULLANMAMAK, (3) Prone pozisyonda gözleri ve yüzü basıdan koruyarak İntraoperatif Görme Kaybını (ION) engellemek, (4) Spinal kord perfüzyon basıncını (SCPP) korumak için Ortalama Arter Basıncını (MAP) ≥ 85 mmHg tutmaktır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Omurga Cerrahisi: İnstabilite tipi, fiksasyon seviyeleri (O-C2 mi yoksa sadece C1-C2 mi), odontoidin redüksiyon durumu, C1-C2 rotasyonel kilitlenme ve dekompresyon ihtiyacı.',
      'Nöroloji / İONM Ekibi: Bazal nörolojik defisit, tetraparez, Lhermitte belirtisi, arka kordon bulguları ve ameliyat öncesi bazal elektrot planı.',
      'Nöroradyoloji Konsültasyonu: 3 boyutlu servikal BT anjiyografi (C1-C2 kemik morfolojisi, C2 pedikül iç çapı, vertebral arter seyri ve yüksek binen [high-riding] vertebral arter varyasyonu vidalama tekniğini doğrudan belirler).',
      'Yoğun Bakım Konsültasyonu: Uzun süreli prone pozisyon ve üst servikal cerrahi sonrası YBÜ yatağının rezerve edilmesi.'
    ],
    historyAndPhysical: [
      'Nörolojik Muayene: Dört ekstremite motor gücü, duyusal seviyeler, patolojik refleksler (Babinski, Hoffman, klonus) ve sfinkter fonksiyonları ayrıntılı kaydedilmelidir.',
      'Boyun Muayenesi: HASTAYA KESİNLİKLE FLEKSİYON/EKSTANSİYON YAPTIRILMAZ! Servikal kord kompresyonu veya ani solunum arresti riski taşır. Hasta sert boyunluk (Philadelphia / Miami-J) içindedir.',
      'Göz Muayenesi: Bazal görme keskinliği ve göz içi basınç öyküsü kaydedilmelidir (özellikle glokom hastaları prone görme kaybı için yüksek risk taşır).',
      'Romatoid Artrit Olguları: Ciddi romatoid artritte eşlik eden temporomandibuler ankiloz, cricoarytenoid artrit (glottis daralması) ve sistemik vaskülit taranmalıdır.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 2 - 4 Ünite ES Cross-Match teyidi.',
      'Hemoglobin / Hematokrit, Trombosit Sayımı, PT/INR, aPTT, Fibrinojen.',
      'Serum Elektrolitleri, Böbrek ve Karaciğer Fonksiyon Testleri.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Servikal BT ve MRG: Kraniyomiyelomalazi (kord içi T2 hiperintensitesi) varlığı değerlendirilmelidir.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp ve Dış Kulak Yolu (Tragus) Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle yerleştirilmelidir. Prone pozisyonda serebral ve spinal perfüzyon basıncını (SCPP) izlemek ve MAP ≥ 85 mmHg hedefini korumak için zorunludur.',
      'İntraoperatif Nöromonitörizasyon (İONM): Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP) ve serbest çalışan EMG (free-run EMG). Entübasyon sonrası supin bazal, prone çevrildikten hemen sonra ikinci bazal ve vida yerleşiminde sürekli kayıt alınır.',
      'Train-of-Four (TOF) Nöromusküler İzlem: Sadece indüksiyonda verilen kas gevşeticinin etkinliğinin bittiğini (TOF %100) teyit etmek için şarttır; idame kas gevşeticisiz sürdürülür.',
      'Sürekli End-Tidal CO2 (EtCO2), Isı Probu ve Foley İdrar Sondası.',
      'Göz ve Yüz Bası Kontrolü (Prone Vision Check): Her 20 - 30 dakikada bir göz kürelerine bası olmadığı fiziksel olarak denetlenmelidir.'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik damar yolu (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Prone pozisyonda Noradrenalin gibi vazoaktif ajanların güvenli infüzyonu ve volüm durumunun izlenmesi için'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon + Baş Mayfield 3-Noktalı Çivili Başlık ile Asılı, Nötral / Kontrollü Hafif Fleksiyonda İmmobilize Edilmiş',
    patientPositionDetails: [
      'PRONE ÇEVİRME MANEVRASI (LOG-ROLL) EN KRİTİK ANDIR: Hasta supin pozisyondayken Mayfield çivili başlık takılır. Anestezi uzmanı hava yolunu ve hortumları korurken, nöroşirürjiyen bizzat başı iki eliyle nötralde kavrayarak komut verir. Gövde ve pelvis 4-5 kişilik deneyimli ekip tarafından aynı eksende tek parça halinde (log-roll) prone masaya çevrilir.',
      'Çevirme tamamlanır tamamlanmaz İONM (MEP/SSEP) ikinci bazal sinyalleri derhal alınır; sinyal kaybı varsa boyun hizalaması düzeltilir.',
      'GÖZ GÜVENLİĞİ VE İSKEMİK OPTİK NÖROPATİ (ION) ÖNLEMİ: Göz kürelerine (bulbus oculi) hiçbir temas veya bası olmamalıdır! Mayfield başlığı başı havada tutar; gözler açıkta, kapalı göz kapakları koruyucu jel ile nemlendirilmiş olmalıdır.',
      'Abdominal Basının Serbestleştirilmesi: Karın göğüs ve pelvis pedleri üzerinde serbestçe sarkmalı, masaya temas etmemelidir. Abdominal bası inferior vena kavayı sıkıştırarak vertebral venöz pleksus kanamasını fırlatır.',
      'Brakiyal Pleksus Koruması: Kollar gövde yanına anatomik pozisyonda uzatılır ve flasterle tespit edilir; omuzlara aşırı traksiyon verilmez.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Uyanık fiberoptik entübasyon tamamlandıktan sonra Propofol (1.5 - 2.5 mg/kg) + Remifentanil (0.1 - 0.25 mcg/kg/dk) veya Fentanil (2 - 3 mcg/kg). Entübasyonda nöromusküler blokör olarak kısa/orta etkili tek doz Rokuronyum (0.6 mg/kg) veya Süksinilkolin verilir; indüksiyon sonrasında KAS GEVŞETİCİ KESİNLİKLE KULLANILMAZ.',
      'İdame (TIVA): Propofol (80 - 130 mcg/kg/dk) + Remifentanil (0.1 - 0.3 mcg/kg/dk) TCI infüzyonu. Bispektral İndeks (BIS) 40 - 60 aralığında tutulur. İnhalasyon anestezikleri MEP sinyallerini doza bağımlı baskıladığından <0.3 MAC Sevofluran ile sınırlandırılmalı, tercihen saf TIVA uygulanmalıdır.',
      'Hemodinamik Hedef: Spinal kord perfüzyon basıncını (SCPP) optimize etmek için Ortalama Arter Basıncı (MAP) kesinlikle ≥ 85 mmHg tutulmalıdır. Prone pozisyonda venöz göllenmeye bağlı hipotansiyonda erken Noradrenalin infüzyonu (0.02 - 0.1 mcg/kg/dk) başlanmalıdır.',
      'Sıvı Yönetimi: Prone pozisyonda aşırı kristalloid verilmesi baş-boyun venöz ödemini ve farenks şişmesini artırır; restriktif dengeli kristalloid (2 - 4 mL/kg/saat) uygulanmalıdır.'
    ],
    airwayManagement: [
      'Altın Standart Hava Yolu: Uyanık Esnek Fiberoptik Bronkoskopik Entübasyon (AFOI). Hasta sedyede uyanıkken nörolojik fonksiyonlar korunarak tüp yerleştirilir.',
      'Tüp Tercihi: Spiral (Wire-reinforced / Zırhlı) Endotrakeal Tüp KESİNLİKLE ZORUNLUDUR! Prone pozisyonda baş çivide fleksiyona getirildiğinde standart PVC tüpler kolayca katlanır (kink) ve lümen tıkanır.',
      'Tüpün Tespiti: Prone pozisyonda tükürük ve sekresyonlar ağızdan sızarak flasterleri gevşetebilir; tüp diş hizasından su geçirmez bez flaster ve kaf bağı ile son derece güvenli sabitlenmelidir.',
      'Acil Prone Hava Yolu Planı: Ameliyat sırasında tüp çıkarsa veya kaf patlarsa acil hastayı sırtüstü çevirme (supin log-roll) eylem planı hazır olmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Mayfield Çivili Başlık Takılması ve Prone Log-Roll Çevirme: Boyun aksiyal hizalaması ve anlık MEP/SSEP kontrolü.',
      '2. Suboksipital ve C1-C2 Diseksiyon: Foramen magnum alt kenarı, C1 arka arkı ve C2 laminası sıyrılırken epidural venöz pleksus kanamaları.',
      '3. C1 Lateral Kitle (Lateral Mass) Diseksiyonu ve Giriş Deliği: C1 arkının altından geçilirken C2 sinir kökü ekarte edilir; lateralde A. vertebralis komşuluğuna dikkat edilir.',
      '4. C2 Pedikül / Pars Vidası Gönderilmesi (En Yüksek Riskli Aşama!): Vidanın medial veya superior korteksi aşması spinal kord hasarına, lateral korteksi aşması vertebral arter laserasyonuna yol açar. Floroskopi ve navigasyon eşliğinde uygulanır.',
      '5. Oksipital Plak Tespiti ve Rodların Sıkılması: Oksiputoservikal vakalarda foramen magnum dekompresyonu sonrası rodların sıkılarak açılanmanın sabitlenmesi.'
    ],
    emergenceNotes: [
      'PRONE POZİSYON YÜZ VE LARİNKS ÖDEMİ DEĞERLENDİRMESİ: Uzun süren prone cerrahilerde yerçekimi ve venöz göllenme nedeniyle dudaklar, dil, farenks ve konjonktiva belirgin ödemli olabilir.',
      'Zorunlu KAF KAÇAK TESTİ (Cuff Leak Test): Hasta supin sedyeye alındıktan sonra tüp kafı indirilerek kaçak sesi doğrulanmalıdır.',
      'Ekstübasyon Kriterleri: Hasta tamamen uyanık, emir alıyor, nöromusküler blok %100 geri dönmüş, kaf kaçak testi pozitif ve spontan solunum parametreleri yeterli olmalıdır.',
      'Dört Ekstremite Erken Nörolojik Muayenesi: Ekstübasyon öncesinde/anında hastanın ellerini ve ayaklarını oynattığı, motor gücünün ameliyat öncesi seviyede olduğu teyit edilmeli ve anestezi takip formuna kaydedilmelidir.',
      'Şüpheli Hava Yolu ve Zorlu Vakalar: Masif kanama/sıvı alan, cerrahi süresi > 5 saat süren veya dilde belirgin ödemi olan hastalar ameliyathanede ekstübe EDİLMEMELİDİR; zırhlı tüple entübe şekilde Nöro-Yoğun Bakım Ünitesine nakledilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi: Cerrahi paraspinal kas diseksiyonu derin olduğundan belirgin posterior boyun ağrısı oluşur. Cerrahi kesi hattına lokal anestezik infiltrasyonu (Bupivakain / Levobupivakain) + IV Parasetamol (1 g IV her 6 saatte bir).',
      'Hasta Kontrollü Analjezi (HKA / PCA): Düşük doz Fentanil veya Morfin PCA (sadece talep/bolus modu; solunum depresyonu ve sedasyondan kaçınmak için bazal infüzyonsuz).',
      'Düşük Doz Ketamin İnfüzyonu (0.1 - 0.2 mg/kg/saat): Postoperatif hiperaljeziyi ve opioid tüketimini azaltır.',
      'Kas Spazmı Tedavisi: Suboksipital kas spazmları için kısa süreli santral kas gevşeticiler (Tiyokolşikozit) veya cerrah konsültasyonu ile oral ajanlar.'
    ],
    prospectRecommendations: [
      'PROSPECT Omurga Önerileri: Kesi yeri lokal infiltrasyonu, sistemik Parasetamol, hafif-orta doz zayıf opioidler veya multimodal non-sedatif ajanlar.',
      'Solunum mekaniğini ve nörolojik uyanıklığı baskılamayan analjezi protokollerinin seçilmesi.'
    ],
    erasRecommendations: [
      'ERAS Spine Konsensüsü: Preoperatif 2 saat öncesine kadar berrak sıvı alımı, ameliyat öncesi ağrı eğitimi.',
      'Postoperatif Bulantı-Kusma (POBV) Agresif Profilaksisi: Çift antiemetik (Deksametazon 8 mg + Ondansetron 4 mg). Öğürme ve kusma boyun venöz basıncını artırarak cerrahi sahada hematom ve nörolojik bası riski doğurur.',
      'Erken Mobilizasyon: Rijit servikal boyunluk (Philadelphia / Aspen collar) desteği ile postoperatif 1. günde yatak kenarına oturtma ve koridorda mobilize etme.',
      'Görme Muayenesi: Postoperatif ilk saatte görme keskinliği, görme alanı ve göz hareketleri kontrol edilmeli; ani görme kaybı şüphesinde acil Göz Hastalıkları konsültasyonu istenmelidir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Lippincott Williams & Wilkins. Section II: Neurosurgery - Cervical Spine Procedures: Posterior Cervical Fusion, C1-C2 Transarticular & Lateral Mass Screw Fixation, pp. 456-463.',
    erasReference: 'ERAS® Society Guidelines for Perioperative Care in Lumbar and Cervical Spinal Surgery: Enhanced Recovery After Surgery (ERAS) Recommendations (2021).',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in spine surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Harms, J., & Melcher, R. P. (2001). Posterior C1-C2 fusion with polyaxial screw and rod fixation. Spine, 26(22), 2467-2471.',
      'Cervical Spine Research Society (CSRS). Guidelines on the Surgical Management of Atlantoaxial and Subaxial Instability.',
      'American Association of Neurological Surgeons (AANS) & Congress of Neurological Surgeons (CNS). Management of Pediatric and Adult Cervical Spine Instability.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement on the Management of Patients with Cervical Spine Instability undergoing General Anesthesia.'
    ]
  }
};
