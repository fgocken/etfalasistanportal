import { ProcedureDefinition } from '../../types/procedures';

/**
 * Bifrontal Kraniyotomi: Beyin Omurilik Sıvısı (BOS) Fistülü ve Rinore Onarımı (Ön Kafa Kaidesi Rekonstrüksiyonu)
 * (Bifrontal Craniotomy for CSF Leak / Anterior Skull Base Dural Repair & Cranialization)
 *
 * Jaffe (6th ed., 2020), PROSPECT Craniotomy Guidelines (Mestdagh et al., EJA 2023),
 * 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020),
 * North American Skull Base Society (NASBS) ve SNACC kılavuzları referans alınarak yapılandırılmıştır.
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
    'Travmatik Ön Kafa Kaidesi Kırıkları ve Dirençli BOS Rinoresi: Maksillofasiyal/kafa travması sonrası 7-10 günden uzun süren veya konservatif tedaviye/lomber drenaja rağmen devam eden yüksek debili BOS akıntısı',
    'Tekrarlayan Bakteriyel Menenjit Öyküsü: Kafa tabanındaki gizli dural-kemik defektten nazal floranın intrakraniyel kompartmana geçişiyle tetiklenen hayatı tehdit edici menenjit atakları',
    'Geniş ve Parçalı Ön Kafa Tabanı Kemik Defektleri: Endoskopik endonazal yaklaşımla kapatılamayacak büyüklükteki (> 1.5 - 2 cm) defektler veya parçalı frontal sinüs arka duvarı fraktürleri',
    'İatrojenik Kafa Tabanı Hasarları: Endoskopik sinüs cerrahisi (FESS), hipofiz veya kafa kaidesi tümör rezeksiyonu sonrası gelişen intrakraniyel dural yırtıklar',
    'Konjenital veya Spontan Ön Kafa Kaidesi Ensefaloselleri: Lamina kribrosa veya etmoid çatıdaki defektlerden nazal kaviteye herniye olan serebral doku ve dural keselerin eksizyonu ve rekonstrüksiyonu'
  ],
  averageDuration: '3.5 - 6.0 saat (Anestezi indüksiyonu, invaziv A-line, preoperatif Lomber Drenaj [LD] yerleşimi, İntratekal Flöresein uygulaması ve pozisyonlama: 60-75 dk; Bikoronal cilt insizyonu, geniş supraorbital pediküllü galeoperikranyal flep diseksiyonu ve bifrontal kraniyotomi kemik penceresi: 60-80 dk; Frontal lob retraksiyonu, dura açılışı sonrası lomber drenden kontrollü pasif BOS boşaltımı, fistül odaklarının mikroskop altında tespiti: 45-60 dk; Dural rekonstrüksiyon [fasya lata / perikranium], frontal sinüs mukozasının temizlenmesi ve kranializasyon, fibrin yapıştırıcı uygulaması: 60-90 dk; Kemik flebin tespiti, dural askı dikişleri, subgaleal dren ve bikoronal cilt kapanışı: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '250 - 750 mL (Standart dural tamirde kan kaybı genellikle orta düzeydedir; ancak geniş skalp flebi, A. ethmoidalis anterior/posterior yırtıkları veya Sinüs Sagittalis Superior ön ucunun ligasyonunda kanama 1000 - 1500 mL seviyesine çıkabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Skalp ve Ön Dural Sinüs Komşuluğu',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır edilmeli, T&S teyit edilmelidir',
    transfusionProbability: '%15 - %35',
    criticalBleedingSources: [
      'Sinüs Sagittalis Superior (SSS) Ön Ucu: Crista galli hizasında dural flep kaldırılırken sinüsün en anterior kesiminin bağlanması veya koagülasyonu esnasında venöz kanama ve VAE riski',
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
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI]): Frontal lob gevşemesi, düşük PONV riski ve öksürmesiz pürüzsüz uyanma için ilk tercihtir',
      'TIVA + Düşük Doz Sevofluran (< 0.5 MAC): Nöromonitörizasyon gerekmeyen olgularda serebral metabolizma ve kan akımını koruyarak dengeli idame sağlar (N₂O KESİNLİKLE KONTRENDİKEDİR)'
    ],
    alternative: [
      'Dengeli İnhalasyon Anestezisi (Sevofluran < 0.7 MAC + Remifentanil İnfüzyonu): İntraoperatif nöromonitörizasyon gereksinimi olmayan olgularda (mutlaka agresif PONV profilaksisi ile)'
    ],
    clinicalRationale: 'Frontal lob retraksiyonunu kolaylaştıran beyin gevşemesi, kusmasız/öksürmesiz pürüzsüz uyanma ve taze dural greftin korunması için Propofol + Remifentanil TIVA (veya < 0.5 MAC Sevofluran) altın standarttır; pnömosefali riski nedeniyle N₂O kesinlikle kullanılmaz. Ön kafa kaidesi defektinde nazal tüplerin intrakraniyel penetrasyon riski bulunduğundan hava yolu güvenliği mutlaka oral kaflı endotrakeal entübasyonla sağlanır.',
    notes: 'BİFRONTAL BOS FİSTÜLÜ ONARIMINDA TEMEL ANESTEZİ İLKELERİ: (1) Nazal tüp/NGT kesin yasağı; (2) N₂O ve postop BMV/CPAP/BiPAP/HFNC kesin kontrendikasyonu; (3) Lomber drenden aktif aspirasyon yasağı — yalnızca dura açılışı sonrası 5-10 mL pasif yerçekimi drenajı ve transferde klempleme; (4) İntratekal Flöresein off-label çift kontrol güvenlik protokolü; (5) Bazal normokapni (35-38 mmHg), pürüzsüz uyanma ve Tramadol yasağı.',
    rulesTitle: 'BİFRONTAL BOS FİSTÜLÜ ONARIMINDA 5 HAYATİ ANESTEZİ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'NAZAL GİRİŞİM KESİN YASAĞI (NGT / NAZAL ETT / NAZOFARİNGEAL AİRWAY)',
        content: 'Ön kafa kaidesi defektinde nazal tüpler lamina kribrosadan intrakraniyel beyin parankimine girebilir! Tüm nazal girişimler KESİNLİKLE KONTRENDİKEDİR; mide dekompresyonu gerekiyorsa yalnızca doğrudan görüş altında Oral Orogastrik Tüp (OGT) takılır.'
      },
      {
        number: 2,
        title: 'N₂O VE POSTOPERATİF POZİTİF BASINÇ (BMV / CPAP / BiPAP / HFNC) YASAĞI',
        content: 'Azot Protoksit (N₂O) pnömosefaliyi hızla büyüterek tansiyon pnömosefalisine yol açar, KESİNLİKLE YASAKTIR! Ekstübasyon sonrası pozitif basınçlı maske ventilasyonu (BMV), CPAP, BiPAP ve yüksek akımlı nazal kanül (HFNC) de nazofarenksten kafa içine hava basarak taze grefti patlatır ve tansiyon pnömosefali yaratır.'
      },
      {
        number: 3,
        title: 'LOMBER DRENAJ GÜVENLİĞİ: PASİF YERÇEKİMİ DRENAJI VE TRANSFERDE KLEMPLEME',
        content: 'Lomber drenden şırınga ile aktif/hızlı (30-60 mL) BOS aspirasyonu KESİNLİKLE YASAKTIR ("ters soda şişesi etkisi" ile tansiyon pnömosefali, tonsiller herniasyon ve akut subdural hematom yaratır!). BOS drenajı YALNIZCA dura açıldıktan sonra cerrahla eşgüdümlü 5-10 mL\'lik kontrollü pasif yerçekimi drenajı ile yapılır; hasta çevirme ve transfer sırasında dren MUTLAKA klemplenir!'
      },
      {
        number: 4,
        title: 'İNTRATEKAL FLÖRESEİN OFF-LABEL GÜVENLİK PROTOKOLÜ (ÇİFT KONTROL)',
        content: 'İntratekal Flöresein kullanımı FDA onay dışıdır (off-label) ve özel bilgilendirilmiş onam gerektirir. Yalnızca koruyucu içermeyen (preservative-free) preparat kullanılmalı, konsantrasyon (%5 vs %10) iki klinisyen tarafından ÇİFT KONTROL edilmelidir! Yanlış ampul/doz aşımı status epileptikus, kimyasal menenjit, paraparezi ve ölüme yol açar; yüksek ICP veya kitle lezyonunda KESİNLİKLE KONTRENDİKEDİR.'
      },
      {
        number: 5,
        title: 'PÜRÜZSÜZ UYANMA, BAZAL NORMOKAPNİ VE GREFT KORUMASI',
        content: 'Bazal ventilasyon hedefi normokapnidir (PaCO2 35-38 mmHg). Uyanmada öksürme, ıkınma ve kusma taze dural grefti patlatır; öksürmesiz ekstübasyon, agresif çoklu PONV profilaksisi ve nöbet/kusma riski taşıyan Tramadolden kesin kaçınma zorunludur.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve KBB (Rinoloji) Konsültasyonu: İnce kesitli Yüksek Çözünürlüklü Koronal/Aksiyel Kranial BT ve MR-Sisternografi bulguları; kribriform plato, etmoid çatı veya sfenoid defektinin yeri ve boyutu, frontal sinüs tutulumu incelenmelidir.',
      'Enfeksiyon Hastalıkları / Antibiyotik Yönetimi: Komplike olmayan BOS rinoresinde rutin preoperatif profilaktik antibiyotik ÖNERİLMEZ (dirençli flora gelişimi ve menenjit maskelenmesi riski — Cochrane / NASBS); yalnızca cerrahi insizyondan 30-60 dk önce standart cerrahi insizyon profilaksisi (aktif menenjit varsa kültür/kılavuz odaklı tedavi) uygulanır.',
      'Nöroloji / İntratekal Flöresein Onamı: İntratekal flöresein planlanıyorsa FDA off-label özel aydınlatılmış onam alınmış olmalı, yüksek ICP/kitle lezyonu BT/MR ile kesin dışlanmalı ve nöbet profilaksisi (Levetirasetam) değerlendirilmelidir.',
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
      'Tam Kan Sayımı, Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen), Kan Glukozu ve Serum Elektrolitleri.',
      'BOS Hücre Sayımı ve Kültürü (aktif enfeksiyon varlığı ekarte edilmelidir).',
      'Ameliyathane Nöronavigasyon İstasyonuna Yüklenmiş İnce Kesit BT/MR Verileri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu) Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle yerleştirilmelidir. Frontal lob retraksiyonunda doğru CPP izlemi ve dural açılışta hemodinamik kontrol için zorunludur.',
      'Lomber Kateter Pasif Drenaj ve Volüm Takibi: Drenin yalnızca dura açıldıktan sonra cerrahla koordineli açılması; hasta çevirme ve transfer sırasında MUTLAKA klemplenmiş olduğunun doğrulanması.',
      'Sürekli End-Tidal CO2 (EtCO2) ve Arteriyel Kan Gazı (ABG): Bazal hedef NORMOKAPNİ (PaCO2 35 - 38 mmHg); yalnızca cerrahın anlık frontal retraksiyon güçlüğü bildirdiği kısa periyotta geçici hafif hiperventilasyon (32 - 35 mmHg). Glukoz hedefi 140 - 180 mg/dL.',
      'Anestezi Derinliği İzlemi: BIS (40 - 50 aralığında tutularak frontal lob metabolik tüketimi baskılanır).',
      'Isı Problu Foley İdrar Sondası: Ozmotik diürez ve sıvı dengesi takibi.',
      'Sürekli Isı Takibi (Normotermi 36.0 - 37.0°C) ve Kantitatif TOF Monitörizasyonu (ekstübasyon öncesi TOFR ≥ 0.90).'
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
      'LOMBER DREN KLEMPLEME KURALI: Hasta supin pozisyona çevrilirken, masa yüksekliği değiştirilirken ve ameliyat sonrası yatağa transfer edilirken lomber drenaj hattı KESİNLİKLE KLEMPLEME (kapatma) pozisyonunda tutulmalıdır!',
      'Bikoronal insizyon alanına tam erişim için Mayfield çivileri insizyon hattının dışına (temporal fossalara) yerleştirilir; gözler merhem ve bantla tam korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 - 1.0 mg/kg). Laringoskopi sempatik pikini önlemek için IV Lidokain (1.5 mg/kg) veya Remifentanil bolusu uygulanır.',
      'İdame: TIVA (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.25 mcg/kg/dk TCI) veya Düşük Doz Sevofluran (< 0.5 MAC).',
      'Azot Protoksit (N₂O) KESİNLİKLE KONTRENDİKEDİR: Kafa tabanındaki defektten giren intrakraniyel havayı genişleterek tansiyon pnömosefali ve herniasyona yol açar!',
      'Sıvı ve Glukoz Yönetimi: İzotonik dengeli kristalloid (Plasmalyte/Isolyte-S) veya %0.9 NaCl kullanılır; hipotonik ve dekstrozlu sıvılar (%5 Dekstroz, Ringer Laktat) beyin ödemi riski nedeniyle verilmez. Kan glukozu hedefi 140 - 180 mg/dL.',
      'Ön Kafa Kaidesinde "Gevşek Beyin" (Frontal Relaxation) Güvenli Protokolü:',
      '  1. Lomber Drenaj (LD) — PASİF YERÇEKİMİ DRENAJI (AKTİF ASPİRASYON YASAKTIR!): Şırınga ile 30-60 mL aktif BOS aspirasyonu ASLA yapılmaz ("ters soda şişesi etkisi" ile tansiyon pnömosefali, tonsiller herniasyon ve akut subdural hematom riski!). BOS drenajı YALNIZCA dura açıldıktan sonra cerrahla koordineli biçimde 5 - 10 mL\'lik kontrollü pasif yerçekimi (gravity) alikotları halinde gerçekleştirilir.',
      '  2. Ozmotik Terapi: Kemik kesisi başladığında gerekirse %20 Mannitol (0.5 g/kg; Osm < 320 mOsm/L) veya %3 Hipertonik Salin (2 mL/kg; Na+ < 155 mEq/L).',
      '  3. Ventilasyon: Bazal hedef NORMOKAPNİ (PaCO2 35 - 38 mmHg); yalnızca cerrahi frontal retraksiyon sırasında geçici 32 - 35 mmHg.',
      'İntratekal Flöresein Off-Label Güvenlik Protokolü (Fistül Tespiti İçin):',
      '  - FDA Onay Dışı (Off-Label) Kullanım: Hastadan mutlaka özel bilgilendirilmiş onam alınmış olmalı; artmış KİBAS veya yer kaplayıcı kitle lezyonu varsa KESİNLİKLE UYGULANMAMALIDIR!',
      '  - Zorunlu Çift Kontrol (Double-Check): Yalnızca koruyucu içermeyen (preservative-free) preparat seçilmeli ve ampul konsantrasyonu (%5 vs %10) iki hekim tarafından sesli doğrulanmalıdır! Yanlış ampul/doz aşımı status epileptikus, kimyasal menenjit, paraparezi ve ölümle sonuçlanabilir.',
      '  - Uygulama: Standart düşük doz (toplam ≤ 10 mg; örn. %5 koruyucusuz flöreseinden 0.1 - 0.2 mL veya %10\'luktan 0.1 mL) hastanın kendi 10 mL BOS\'u ile seyreltilerek en az 10 - 15 dakikada çok yavaş intratekal enjekte edilir.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; cerrahın kafa tespiti ve bikoronal insizyonuna engel olmayacak şekilde ETT ağız köşesine sağlam tespit edilir.',
      'NAZAL GİRİŞİMLER KESİNLİKLE YASAKTIR: Nazogastrik tüp (NGT), nazal entübasyon veya nazofaringeal airway ASLA uygulanmaz! Mide dekompresyonu için doğrudan görüş altında ağızdan Orogastrik Tüp (OGT) takılır.',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Bikoronal Skalp İnsizyonu ve Galeoperikranyal Flep Diseksiyonu: Geniş skalp kanaması; Raney klipsleri ve koter ile hemostaz; supraorbital sinir ve damarların korunması.',
      '2. Bifrontal Kraniyotomi ve Crista Galli Düzeyinde Dural Askı: Kemik diploe kanamaları ve kemik mumu uygulaması.',
      '3. SSS Ön Ucunun Ligasyonu veya Dural Açılış: Ön dural sinüs bağlanırken hava embolisi ve venöz kanama kontrolü.',
      '4. Frontal Lobların Kaldırılması ve Kontrollü Pasif BOS Drenajı: Dura açılışı sonrası lomber drenden cerrahla koordineli 5-10 mL\'lik pasif yerçekimi drenajı ile frontal tabanın açılması; A. ethmoidalis kanamalarının koterizasyonu.',
      '5. Flöresein Işığı Altında Fistül Tespiti ve Rekonstrüksiyon: Lamina kribrosa defektine fasya lata veya perikranyal vaskülarize flep serilmesi ve fibrin yapıştırıcı ile yapıştırılması.',
      '6. Frontal Sinüs Kranializasyonu: Parçalanmış sinüsün mukozası kazınır, nazofrontal kanal kas/kemik mumu ile tıkanır ve sinüs kranyal kaviteye dahil edilir.',
      '7. Valsalva Manevrası: Dural tamir tamamlandıktan sonra su sızdırmazlığı (water-tight seal) test etmek için anestezi ekibi 25-30 cmH2O hava yolu basıncını 5-10 saniye tutar; fistül lojunda kaçak olmadığı cerrah tarafından onaylanır.'
    ],
    emergenceNotes: [
      'ÖKSÜRMESİZ VE IKINMASIZ PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE) ZORUNLUDUR: Ekstübasyon anında öksürme veya ıkınma kafa içi venöz basıncı fırlatarak yeni yerleştirilen taze dural grefti yerinden oynatır ve fistülün anında nüks etmesine yol açar!',
      'Uyanma Sırasında Sempatik Blokaj: Ekstübasyon öncesi düşük doz Remifentanil, IV Lidokain (1.5 mg/kg), Esmolol (0.5 mg/kg) veya Deksmedetomidin ile laringeal refleksler ve kan basıncı baskılanır; kantitatif TOFR ≥ 0.90 doğrulanır.',
      'POSTOPERATİF POZİTİF BASINÇ KESİN KONTRENDİKASYONU: Ekstübasyon sonrası hastaya ASLA pozitif basınçlı balon-valf-maske (BMV) ventilasyonu, CPAP, BiPAP veya yüksek akımlı nazal kanül (HFNC) uygulanmamalıdır! Nazofarenkse pozitif hava akımı taze kafa tabanı greftini yırtarak ölümcül tansiyon pnömosefaliye yol açar (solunum yetmezliğinde erken kontrollü reentübasyon tercih edilir).',
      'TRANSFERDE LOMBER DREN KLEMPLEME: Hasta ameliyat masasından sedyeye alınırken lomber drenin klempli olduğu çift kontrol ile doğrulanır.',
      'Nörolojik Değerlendirme: Hasta uyanır uyanmaz motor fonksiyonlar, pupiller ve görme keskinliği (A. ethmoidalis/optik bası kontrolü) hızla kaydedilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Bikoronal İnsizyon ve Skalp Ağrısı Yönetimi:',
      '  - Cerrahi Başlangıcında veya Sonunda Bilateral Supraorbital ve Supratroklear Sinir Bloğu (%0.25 Bupivakain veya %0.5 Ropivakain): Alın ve skalp anteriorunda derin analjezi ve postoperatif opiat tasarrufu sağlar (PROSPECT 2023).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kurtarma Opiyatı: Dikkatle titre edilen düşük doz IV Fentanil (25-50 mcg); aşırı sedasyondan kaçınılır.',
      '  - KAÇINILACAK AJANLAR: Tramadol (özellikle intratekal flöresein ve frontal lob cerrahisinde nöbet eşiğini düşürmesi + kusma/greft patlaması riski nedeniyle) KESİNLİKLE KULLANILMAZ; non-selektif NSAİİ\'lardan (Deksketoprofen dahil) taze intrakraniyel kanama riski nedeniyle akut dönemde kaçınılır.'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi (2023) kılavuzuna göre bikoronal kraniyotomilerde skalp sinir bloğu (supraorbital/supratroklear) veya insizyon lokal infiltrasyonu ile düzenli IV Parasetamol multimodal analjezinin temel taşıdır.'
    ],
    erasRecommendations: [
      '4. Konsensus PONV (2020) ve Ön Kafa Kaidesi Postoperatif Koruma Protokolleri:',
      '  - Postoperatif Dural Koruma Protokolü: Yatak başı sürekli 30° elevasyonda tutulmalı; hastanın sümkürmesi, burnunu çekmesi, pipetle içecek içmesi ve ıkınması KESİNLİKLE YASAKLANMALI; CPAP/BiPAP/HFNC kullanılmamalıdır.',
      '  - Ikınmayı Önleme: Rutin laksatif ve dışkı yumuşatıcı tedavisi başlanmalıdır.',
      '  - Postoperatif Lomber Drenaj Yönetimi: Lomber kateter dış kulak yolu (tragus) seviyesinde ayarlanarak saatlik 5 - 10 mL kontrollü pasif yerçekimi drenajı (3-5 gün) sağlanır; hasta transferi, çevirme ve pozisyon değişikliklerinde dren MUTLAKA klemplenir!',
      '  - Agresif Çoklu PONV Profilaksisi: Kusma ve öğürme grefti patlatabileceğinden TIVA + Deksametazon (4-8 mg) + Ondansetron (4 mg) ± Aprepitant (40 mg PO) uygulanır.',
      '  - Glisemik ve Sıvı Takibi: Kan glukozu 140 - 180 mg/dL aralığında, izotonik sıvı dengesiyle sürdürülür; komplikasyonsuz olgularda uzamış profilaktik antibiyotik yerine yakın menenjit kliniği (ateş, ense sertliği, lökositoz) izlemi yapılır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Bifrontal Craniotomy for CSF Leak. Philadelphia: Wolters Kluwer.',
    erasReference: 'Gan, T. J., Belani, K. G., Bergese, S., et al. (2020). Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesthesia & Analgesia, 131(2), 411-448.',
    prospectReference: 'Mestdagh, F., Lavand\'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Wang, E. W., Zanation, A. M., Gardner, P. A., et al. (2019). ICAR: endoscopic skull-base surgery (CSF leak, intrathecal fluorescein & lumbar drain consensus). International Forum of Allergy & Rhinology, 9(S3), S145-S365.',
      'Ratilal, B. O., Costa, J., Pappamikail, L., & Sampaio, C. (2015). Antibiotic prophylaxis for preventing meningitis in patients with basilar skull fractures. Cochrane Database of Systematic Reviews, (4), CD004884.',
      'Platt, M. P., Parnes, S. M., & Tucci, D. L. (2011). Intrathecal fluorescein in the management of cerebrospinal fluid leaks: a systematic review. American Journal of Rhinology & Allergy, 25(6), 405-410.'
    ]
  }
};
