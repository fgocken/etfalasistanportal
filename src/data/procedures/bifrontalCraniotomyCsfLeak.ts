import { ProcedureDefinition } from '../../types/procedures';

/**
 * Bifrontal Kraniyotomi: Beyin Omurilik Sıvısı (BOS) Fistülü ve Rinore Onarımı (Ön Kafa Kaidesi Rekonstrüksiyonu)
 * (Bifrontal Craniotomy for CSF Leak / Anterior Skull Base Dural Repair & Cranialization)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Cranial Approaches: Bifrontal Craniotomy for CSF Leak, pp. 422-427),
 * North American Skull Base Society (NASBS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Nöroşirürji Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const bifrontalCraniotomyCsfLeak: ProcedureDefinition = {
  id: 'bifrontal-craniotomy-csf-leak',
  name: 'Bifrontal Kraniyotomi: Beyin Omurilik Sıvısı (BOS) Fistülü ve Rinore Onarımı (Ön Kafa Kaidesi Rekonstrüksiyonu)',
  shortCode: 'BİFRONTAL-BOS-FİSTÜL',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kafa Tabanı & Rekonstrüktif Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Ön kafa kaidesinde (lamina kribrosa, fovea etmoidalis, sfenoid planum veya frontal sinüs arka duvarı) kemik ve dural bütünlüğün bozulması sonucu nazal kaviteye BOS akışının (BOS rinoresi) olduğu olgularda; bikoronal insizyon, vaskülarize perikranyal flep hazırlanması ve bifrontal kraniyotomi ile ön kafa tabanına ulaşılarak dural defektin fasya lata, perikranyal flep ve fibrin yapıştırıcılarla su sızdırmaz şekilde onarılması ameliyatıdır. Frontal sinüs arka duvarı kırıklarında sinüs mukozasının ekzentere edilerek sinüsün kranialize edilmesi (frontal sinüs kranializasyonu) ve nazofrontal kanalın kapatılması işlemi de eşzamanlı uygulanır.',
  indications: [
    'Travmatik Ön Kafa Kaidesi Kırıkları ve Dirençli BOS Rinoresi: Maksillofasiyal/kafa travması sonrası 7-10 günden uzun süren veya medikal tedaviye/lomber drenaja rağmen devam eden yüksek debili BOS akıntısı',
    'Tekrarlayan Bakteriyel Menenjit Öyküsü: Kafa tabanındaki gizli dural-kemik defektten nazal floranın intrakraniyel kompartmana geçişiyle tetiklenen hayatı tehdit edici menenjit atakları',
    'Geniş ve Parçalı Ön Kafa Tabanı Kemik Defektleri: Endoskopik endonazal yaklaşımla kapatılamayacak büyüklükteki (> 1.5 - 2 cm) defektler veya parçalı frontal sinüs arka duvarı fraktürleri',
    'İatrojenik Kafa Tabanı Hasarları: Endoskopik sinüs cerrahisi (FESS), hipofiz veya kafa kaidesi tümör rezeksiyonu sonrası gelişen intrakraniyel dural yırtıklar',
    'Konjenital veya Spontan Ön Kafa Kaidesi Ensefaloselleri: Lamina kribrosa veya etmoid çatıdaki defektlerden nazal kaviteye herniye olan serebral doku ve dural keselerin eksizyonu ve rekonstrüksiyonu'
  ],
  averageDuration: '3.5 - 6.0 saat (Anestezi indüksiyonu, invaziv A-line, preoperatif Lomber Drenaj [LD] yerleşimi, İntratekal Flöresein uygulaması ve pozisyonlama: 60-75 dk; Bikoronal cilt insizyonu, geniş supraorbital pediküllü galeoperikranyal flep diseksiyonu ve bifrontal kraniyotomi kemik penceresi: 60-80 dk; Frontal lob retraksiyonu, sisterna veya lomber drenajla BOS boşaltımı, fistül odaklarının mikroskop altında tespiti: 45-60 dk; Dural rekonstrüksiyon [fasya lata / perikranium], frontal sinüs mukozasının temizlenmesi ve kranializasyon, fibrin yapıştırıcı uygulaması: 60-90 dk; Kemik flebin tespiti, dural askı dikişleri, subgaleal dren ve bikoronal cilt kapanışı: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '250 - 750 mL (Standart dural tamirde kan kaybı genellikle orta düzeydedir; ancak geniş skalp flebi, A. ethmoidalis anterior/posterior yırtıkları veya Sinüs Sagittalis Superior ön ucunun ligasyonunda kanama 1000 - 1500 mL seviyesine çıkabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Skalp ve Ön Dural Sinüs Komşuluğu',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır edilmeli, T&S teyit edilmelidir',
    transfusionProbability: '%15 - %35',
    criticalBleedingSources: [
      'Sinüs Sagittalis Superior (SSS) Ön Ucu: Crista galli hizasında dural flep kaldırılırken sinüsün en anterior kesiminin bağlanması veya koagülasyonu esnasında venöz kanama',
      'A. Ethmoidalis Anterior ve Posterior: Ön kafa kaidesi kemik kırıklarında veya diseksiyonda kemik forameninden yırtılan arterler; orbitaya doğru retrakte olursa retrobulbar hematom ve akut körlük riski doğurur!',
      'Geniş Bikoronal Skalp Flebi ve Galea Altı Damar Yatağı (A. temporalis superficialis, A. supraorbitalis ve A. supratrochlearis dalları)',
      'Frontal Kemik Diploe Kanalları ve Emissary Venler',
      'Frontal Sinüs Mukozası ve Kemik Fraktür Kenarları'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal hassas koagülasyon',
      'Kemik diploik kanamalarında steril kemik mumu (Bone Wax) basılması',
      'A. ethmoidalis kanamalarında mikrovasküler klips veya bipolar koterizasyon',
      'SSS ön ucu için ipek sütür ligasyonu veya hemostatik dural klipsler',
      'Su geçirmez dural tamir için hemostatik fibrin yapıştırıcı matriksler (Tisseel / Beriplast / FloSeal) ve pamuk kompresyonu'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Sevofluran (< 0.5 MAC): Frontal lobların cerrahi retraksiyonunu kolaylaştırmak için mükemmel beyin gevşemesi (CMRO2 ve CBF azaltılması) sağlar'
    ],
    alternative: [
      'Dengeli İnhalasyon Anestezisi (Sevofluran < 0.7 MAC + Remifentanil İnfüzyonu): İntraoperatif nöromonitörizasyon gereksinimi olmayan olgularda'
    ],
    notes: 'BİFRONTAL BOS FİSTÜLÜ ONARIMINDA 5 HAYATİ ANESTEZİ KURALI: (1) NAZOGASTRİK TÜP VE NAZAL HAVA YOLU KESİNLİKLE KONTRENDİKEDİR! — Ön kafa kaidesi kırıklarında nazal tüp kribriform platodan intrakraniyel kompartmana (beyin parankimine) girebilir; dekompresyon için sadece doğrudan görüş altında Oral Orogastrik Tüp (OGT) kullanılmalıdır. (2) AZOT PROTOKSİT (N2O) KESİNLİKLE YASAKTIR! — Kafa tabanındaki açıklıktan intrakraniyel boşluğa hava girmiştir; N2O pnömosefaliyi hızla genişleterek TANSİYON PNÖMOSEFALİSİ ve beyin herniasyonuna yol açar. (3) BEYİN GEVŞEMESİ (SLACK FRONTAL LOBES) — Frontal lob kontüzyonunu ve olfaktör sinir avülsiyonunu (kalıcı anozmi) önlemek için Lomber Drenaj ile BOS boşaltımı, Mannitol/Hipertonik Salin ve hafif hiperventilasyon (PaCO2 32-35 mmHg) şarttır. (4) İNTRATEKAL FLÖRESEİN DİKKATİ — BOS kaçağını mikroskop altında sarı-yeşil parlatmak için intratekal flöresein verilebilir; yüksek doz/hızlı enjeksiyon nöbete yol açabileceğinden çok düşük dozda, yavaşça ve antiepileptik koruması altında uygulanmalıdır. (5) PÜRÜZSÜZ UYANMA VE SÜMKÜRME/ÖKSÜRME YASAĞI — Uyanmada ıkınma taze dural grefti patlatarak fistülü nüks ettirir; ekstübasyon öksürmesiz yapılmalı ve hastaya asla burnunu sümkürmemesi tembihlenmelidir.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve KBB (Rinoloji) Konsültasyonu: İnce kesitli Yüksek Çözünürlüklü Koronal/Aksiyel Kranial BT ve MR-Sisternografi bulguları; kribriform plato, etmoid çatı veya sfenoid defektinin yeri ve boyutu, frontal sinüs tutulumu incelenmelidir.',
      'Enfeksiyon Hastalıkları Konsültasyonu: Geçirilmiş menenjit atakları, BOS kültür sonuçları ve perioperatif antibiyotik profilaksisi (kan-beyin bariyerini geçen 3. kuşak sefalosporin veya vankomisin).',
      'Nöroloji Konsültasyonu: İntratekal flöresein planlanan olgularda nöbet profilaksisi için Levetirasetam (Keppra 1000 mg IV) teyidi.',
      'Göz Hastalıkları Konsültasyonu: Travmaya bağlı optik kanal kırığı, görme alanı kaybı veya orbita tavanı defektlerinin preoperatif değerlendirilmesi.'
    ],
    historyAndPhysical: [
      'BOS Rinoresinin Özellikleri: Eğilmekle (Valsalva veya öne eğilme manevrası) burundan gelen berrak, tuzlu/tatlımsı sıvı akıntısı; akıntıda Beta-2 Transferrin veya Beta-Trace protein pozitifliği doğrulanmalıdır.',
      'Geçirilmiş Travma veya Ameliyat Zamanı: Travmanın oluş şekli (araç içi kaza, darp), maksillofasiyal fraktürler (Le Fort II/III) ve geçirilmiş endoskopik sinüs ameliyatları.',
      'Koku Alma Fonksiyonu (Anozmi / Hipozmi): Preoperatif koku duyusu kaydedilmelidir; bifrontal yaklaşımda kribriform plato diseksiyonu bilateral anozmi riski taşır.',
      'Hava Yolu Muayenesi: Maksillofasiyal travmalı olgularda ağız açıklığı, diş kırıkları ve zor entübasyon olasılığı değerlendirilmelidir.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve 2 Ünite ES Cross-Match doğrulaması.',
      'Burun Akıntısı Biyokimyası: Beta-2 Transferrin teyidi (mukus ile BOS ayrımında altın standart).',
      'Tam Kan Sayımı, Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen) ve Serum Elektrolitleri.',
      'BOS Hücre Sayımı ve Kültürü (aktif enfeksiyon varlığı ekarte edilmelidir).',
      'Ameliyathane Nöronavigasyon İstasyonuna Yüklenmiş İnce Kesit BT/MR Verileri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp ve Foramen Monro / Dış Kulak Yolu Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle yerleştirilmelidir. Frontal lob retraksiyonunda serebral perfüzyon basıncını (CPP) korumak ve dural açılışta hemodinamik dalgalanmaları yönetmek için zorunludur.',
      'Lomber Kateter Basınç ve Volüm Monitörizasyonu: Ameliyat öncesi veya indüksiyon sonrası yerleştirilen lomber drenajın kontrollü BOS boşaltım hızının takibi.',
      'Sürekli End-Tidal CO2 (EtCO2) ve Kan Gazı (ABG): PaCO2 hedefi 32 - 35 mmHg; beyin gevşemesi için kontrollü hafif hiperventilasyon.',
      'Anestezi Derinliği İzlemi: BIS (40 - 50 aralığında tutularak frontal lob metabolik tüketimi baskılanır).',
      'Isı Problu Foley İdrar Sondası: Mannitol diürezi ve sıvı dengesi takibi.',
      'Sürekli Isı Takibi (Normotermi 36.0 - 37.0°C).'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı periferik intravenöz yol (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Yaşlı, kardiyak rezervi kısıtlı veya zor damar yolu olan politravmalı olgularda',
      'Kan ve Sıvı Isıtıcı Cihazları'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Mayfield 3-Noktalı Çivili Başlık ile Nötral veya Hafif 10-15° Hiperekstansiyonda Sabitlenmiş',
    patientPositionDetails: [
      'Başın nötral ve hafif ekstansiyonda tutulması frontal lobların yerçekimi etkisiyle ön kafa kaidesinden geriye doğru kendiliğinden düşmesini (gravitational frontal retraction) sağlar.',
      'Gövde ve baş 15 - 20° elevasyonda tutularak serebral venöz drenaj maksimize edilir.',
      'Bikoronal insizyon alanına tam erişim için saçlar uygun şekilde tıraş edilir; Mayfield çivileri insizyon hattının dışına (temporal fossalara) yerleştirilir.',
      'Gözler antibiyotikli koruyucu göz merhemi sürülerek özenle bantlanır; supraorbital flep kaldırılırken göz kürelerine bası yapılmaması sağlanır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 - 1.0 mg/kg). Laringoskopi sempatik pikini ve intrakraniyel basınç artışını önlemek için IV Lidokain (1.5 mg/kg) verilir.',
      'İdame: TIVA (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.25 mcg/kg/dk TCI infüzyonu) veya Düşük Doz Sevofluran (< 0.5 MAC).',
      'Ön Kafa Kaidesinde "Gevşek Beyin" (Frontal Relaxation) Protokolü:',
      '  1. Lomber Drenaj (LD) ile BOS Boşaltımı: Kraniyotomi yapıldıktan sonra cerrahın talebiyle lomber drenden yavaşça 30 - 60 mL BOS aspire edilir; frontal loblar kendiliğinden tabandan ayrılır ve ekartör hasarı önlenir.',
      '  2. Ozmotik Diürez: Kemik kesisi başladığında %20 Mannitol (0.5 - 1.0 g/kg) veya %3 Hipertonik Salin (2 - 3 mL/kg) infüzyonu.',
      '  3. Ventilasyon: PaCO2 32 - 35 mmHg aralığında hafif hiperventilasyon.',
      '  4. Gaz Kısıtlaması: Azot Protoksit (N2O) KESİNLİKLE KONTRENDİKEDİR!',
      'İntratekal Flöresein Protokolü (Fistül Tespiti İçin):',
      '  - Koruyucu içermeyen (preservative-free) %5 Flöresein solüsyonundan 0.1 - 0.2 mL alınır, hastanın kendi BOS\'u ile 10 mL\'ye seyreltilir.',
      '  - Lomber kateterden en az 10-15 dakikada çok yavaş şekilde intratekal enjekte edilir.',
      '  - Cerrahi mikroskopta kobalt mavisi ışık altında dural kaçak noktası parlak sarı-yeşil floresans vererek saniyeler içinde saptanır.',
      '  - Nöbet Profilaksisi: Flöresein kortikal irritasyon yapabileceğinden Levetirasetam (1000 mg IV) önceden uygulanmış olmalıdır.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; cerrahın kafa tespiti ve bikoronal insizyonuna engel olmayacak şekilde ETT ağız köşesine sağlam tespit edilir.',
      'NAZAL GİRİŞİMLER KESİNLİKLE YASAKTIR: Nazogastrik tüp (NGT), nazal entübasyon veya nazofaringeal airway ASLA uygulanmaz! Mide dekompresyonu için laringoskop görüşü altında ağızdan Orogastrik Tüp (OGT) takılır.',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Bikoronal Skalp İnsizyonu ve Galeoperikranyal Flep Diseksiyonu: Geniş skalp kanaması; Raney klipsleri ve koter ile hemostaz; supraorbital sinir ve damarların korunması.',
      '2. Bifrontal Kraniyotomi ve Crista Galli Düzeyinde Dural Askı: Kemik diploe kanamaları ve kemik mumu uygulaması.',
      '3. SSS Ön Ucunun Ligasyonu veya Dural Açılış: Ön dural sinus bağlanırken hava embolisi ve venöz kanama kontrolü.',
      '4. Frontal Lobların Kaldırılması ve BOS Drenajı: Lomber drenden BOS çekilerek frontal tabanın açılması; A. ethmoidalis kanamalarının koterizasyonu.',
      '5. Flöresein Işığı Altında Fistül Tespiti ve Rekonstrüksiyon: Lamina kribrosa defektine fasya lata veya perikranyal vaskülarize flep serilmesi ve fibrin yapıştırıcı ile yapıştırılması.',
      '6. Frontal Sinüs Kranializasyonu: Parçalanmış sinüsün mukozası kazınır, nazofrontal kanal kas/kemik mumu ile tıkanır ve sinüs kranyal kaviteye dahil edilir.',
      '7. Valsalva Manevrası: Dural tamir tamamlandıktan sonra su sızdırmazlığı (water-tight seal) test etmek için anestezi ekibi 25-30 cmH2O hava yolu basıncını 5-10 saniye tutar; fistül lojunda kaçak olmadığı cerrah tarafından onaylanır.'
    ],
    emergenceNotes: [
      'ÖKSÜRMESİZ VE IKINMASIZ PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE) ZORUNLUDUR: Ekstübasyon anında hastanın öksürmesi veya ıkınması kafa içi venöz basıncı fırlatarak yeni yerleştirilen taze dural grefti ve fibrin yapıştırıcıyı yerinden oynatır; fistülün anında nüks etmesine yol açar!',
      'Uyanma Sırasında Sempatik Blokaj: Ekstübasyon öncesi IV Lidokain (1.5 mg/kg), Esmolol (0.5 mg/kg) veya Deksmedetomidin ile laringeal refleksler ve kan basıncı baskılanır.',
      'Postoperatif Pozitif Basınç Kontrendikasyonu: Ekstübasyon sonrası hastaya ASLA CPAP veya BiPAP uygulanmamalıdır; burun içine hava basılması dural grefti yırtarak pnömosefali yaratır.',
      'Nörolojik Değerlendirme: Hasta uyanır uyanmaz motor fonksiyonlar, pupiller, görme keskinliği (A. ethmoidalis/optik bası kontrolü) hızla kaydedilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Bikoronal İnsizyon ve Skalp Ağrısı Yönetimi:',
      '  - Cerrahi Başlangıcında veya Sonunda Bilateral Supraorbital ve Supratroklear Sinir Bloğu (%0.25 Bupivakain): Alın ve skalp anteriorunda derin anestezi ve postoperatif opiat tasarrufu sağlar.',
      '  - IV Parasetamol (1000 mg 6 saatte bir düzenli infüzyon).',
      '  - IV Tramadol (50 mg yavaş) veya Fentanil (25-50 mcg) kurtarma analjeziği; aşırı sedasyondan kaçınılmalıdır.',
      '  - Cerrahi hemostaz tam ise postop 12-24. saatten sonra selektif NSAİİ eklenebilir.'
    ],
    prospectRecommendations: [
      'Ön kafa kaidesi ve bikoronal kraniyotomilerde supraorbital/supratroklear periferik sinir blokajı ve düzenli non-opioid analjezi multimodal analjezinin temel taşıdır.'
    ],
    erasRecommendations: [
      'ERAS Nöroşirürji ve Kafa Kaidesi Kılavuzları:',
      '  - Postoperatif Dural Koruma Protokolü: Yatak başı sürekli 30° elevasyonda tutulmalı; hastanın sümkürmesi, burnunu çekmesi, pipetle içecek içmesi ve ıkınması KESİNLİKLE YASAKLANMALIDIR.',
      '  - Ikınmayı Önleme: Rutin laksatif ve dışkı yumuşatıcı tedavisi başlanmalıdır.',
      '  - Postoperatif Lomber Drenaj Yönetimi: Lomber kateter omuz/dış kulak yolu seviyesinde tutulmalı; saatlik 5 - 10 mL kontrollü BOS drenajı sağlanarak greft üzerindeki hidrostatik basınç 3-5 gün boyunca düşürülmelidir.',
      '  - Agresif PONV Profilaksisi: Kusma ve öğürme kafa içi basıncı fırlatarak grefti patlatabileceğinden Deksametazon + Ondansetron ikili profilaksisi sürdürülmelidir.',
      '  - Menenjit Takibi: Günlük ateş, ense sertliği ve lökositoz izlemi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Cranial Approaches: Bifrontal Craniotomy for CSF Leak (pp. 422-427). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Neurosurgical Oncology and Cranial Base Surgery: Consensus Guidelines. Journal of Neurosurgery, 134(3), 781-791.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Bicoronal Craniotomy. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'North American Skull Base Society (NASBS). Multidisciplinary Consensus Guidelines for the Management of Cerebrospinal Fluid Rhinorrhea.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Considerations for Anterior Skull Base Repair and Intrathecal Fluorescein Use.',
      'Platt, M. P., et al. (2011). Intrathecal fluorescein in the management of cerebrospinal fluid leaks: a systematic review. American Journal of Rhinology & Allergy, 25(6), 405-410.'
    ]
  }
};
