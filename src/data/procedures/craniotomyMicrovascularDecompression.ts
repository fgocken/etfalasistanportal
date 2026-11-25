import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: Kranyal Sinir Mikrovasküler Dekompresyonu (MVD - Jannetta Prosedürü)
 * (Microvascular Decompression of Cranial Nerves: Trigeminal, Facial, Glossopharyngeal)
 *
 * Jaffe (6th ed., 2020), PROSPECT Craniotomy Guidelines (Mestdagh et al., EJA 2023),
 * 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020),
 * AANS/CNS ve SNACC kılavuzları referans alınarak yapılandırılmıştır.
 */
export const craniotomyMicrovascularDecompression: ProcedureDefinition = {
  id: 'craniotomy-microvascular-decompression',
  name: 'Kraniyotomi: Kranyal Sinir Mikrovasküler Dekompresyonu (MVD - Trigeminal, Fasiyal ve Glossofaringeal)',
  shortCode: 'MVD-JANNETTA',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Kafa Tabanı Nöroşirürjisi',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Beyin sapı kök çıkış bölgesinde (Root Entry/Exit Zone - REZ) kompresyon oluşturan ektatik arteriyel (SCA, AICA, PICA, Vertebral arter) veya venöz damarların, mikroskopik retrosigmoid suboksipital kraniyotomi/kraniektomi yoluyla serbestleştirilerek sinir ile damar arasına kalıcı teflon keçe (Teflon felt / köpük spongostan) yerleştirilmesi (Jannetta prosedürü) ameliyatıdır. En sık N. trigeminus (CN V - Trigeminal Nevralji), N. facialis (CN VII - Hemifasiyal Spazm) ve N. glossopharyngeus (CN IX - Glossofaringeal Nevralji) tutulur.',
  indications: [
    'Klasik Trigeminal Nevralji (Tic Douloureux / CN V): Karbamazepin, Okskarbazepin veya diğer antiepileptik ilaç tedavisine dirençli ya da ilaç toksisitesi gelişen, Superior Serebellar Arter (SCA) veya AICA kompresyonuna bağlı şimşek çakar tarzda yüz ağrısı krizleri',
    'Hemifasiyal Spazm (CN VII): Yüzün tek yarısında göz çevresinden başlayıp ağız köşesine yayılan istemsiz paroksismal kas kasılmaları; Anterior İnferior Serebellar Arter (AICA) veya PICA basısı',
    'Glossofaringeal Nevralji (CN IX / CN X): Boğaz, tonsil loju, dil kökü ve kulak derinliğinde yutkunma/öksürme ile tetiklenen dayanılmaz batıcı ağrılar; PICA veya vertebral arter kompresyonuna bağlı bradikardi ve senkop krizleri',
    'Vestibüler Paroksizmi / Nörovasküler Tinnitus (CN VIII): AICA basısına bağlı medikal tedaviye yanıtsız paroksismal baş dönmesi ve çınlama',
    'Spazmodik Tortikollis / N. Accessorius Nörovasküler Çatışması (CN XI): Nadir görülen aksesuar sinir vasküler kompresyon olguları'
  ],
  averageDuration: '3.0 - 5.0 saat (Anestezi indüksiyonu, invaziv A-line, BAEP ve Fasiyal EMG elektrotlarının yerleşimi, Park-Bench / Lateral pozisyonlama ve Mayfield çivili başlık tespiti: 50-70 dk; Retrosigmoid insizyon, anahtar deliği [keyhole] kraniektomi ve dural açılış: 45-60 dk; Serebellar retraksiyon, araknoid diseksiyon, beyin sapı sisternlerinin boşaltılması, suçlu damarın tespiti ve Teflon keçe ile sinir dekompresyonu: 60-120 dk; Su sızdırmaz [water-tight] dural tamir, kraniyoplasti ve cilt kapanışı: 40-55 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 350 mL (Mikronöroşirürjikal anatomik diseksiyonda kan kaybı genellikle düşüktür; ancak emissary venler, Sinüs Sigmoideus / Sinüs Transversus laserasyonu veya Dandy petroz veni yırtığında kan kaybı hızla 600 - 1200 mL düzeyine çıkabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Dural Sinüs ve Petroz Ven Komşuluğu',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bekletilmeli, T&S doğrulanmalıdır; dural sinüs hasarı ve venöz hava embolisi (VAE) riski göz önünde bulundurulmalıdır',
    transfusionProbability: '%5 - %15 (Dural sinüs veya petroz ven hasarı gelişmedikçe transfüzyon nadirdir)',
    criticalBleedingSources: [
      'Sinüs Sigmoideus ve Sinüs Transversus Bileşkesi (Retrosigmoid kraniektomi sınırında yüksek debili venöz kanama ve hava embolisi riski)',
      'Petroz Ven (Dandy Veni): CN V trigeminal köke ulaşılırken gerilen veya koagüle edilmek zorunda kalınan büyük köprü veni',
      'Mastoid Emissary Venler (Kemik pencere açılırken diploik venöz sızıntılar)',
      'A. Cerebellaris Superior (SCA) ve AICA Yan Dalları (Mikrovasküler diseksiyonda perforatör arter hasarı beyin sapı enfarktına yol açabilir)',
      'Suboksipital Venöz Pleksus Kanayanları'
    ],
    hemostasisStrategies: [
      'Bipolar hassas mikronöroşirürjikal koagülasyon (perforatör damarlar yakılmamalıdır)',
      'Kemik diploik kanamalarında steril kemik mumu (Bone Wax) basılması',
      'Dural sinüs kenarı sızıntılarında Gelfoam, Surgicel veya FloSeal ile nazik kompresyon',
      'Sinüs laserasyonunda cerrahi dural tamir, baş elevasyonunun azaltılması ve venöz hava embolisini önlemek için alana steril %0.9 NaCl doldurulması',
      'Teflon Keçe (Teflon Felt): Sinir ile damar arasına yerleştirilen implantın damar duvarını zedelemeyecek yumuşaklıkta olması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI]): Arka çukur/vestibüler cerrahideki çok yüksek (%70-80) PONV riskini düşürmek, ideal serebellar gevşeme ve pürüzsüz uyanma sağlamak için ilk tercihtir',
      'KAS GEVŞETİCİSİZ İDAME ŞARTTIR: Fasiyal / alt kranyal sinir EMG ve Lateral Spread Response (LSR) yanıtlarını ortadan kaldıran temel faktör NÖROMUSKÜLER BLOKERLERDİR (NMB); entübasyon sonrası kas gevşetici KESİNLİKLE tekrarlanmaz! (N₂O KESİNLİKLE KONTRENDİKEDİR)'
    ],
    alternative: [
      'Düşük Doz Sevofluran (< 0.5 - 0.8 MAC) + Remifentanil İnfüzyonu (Kas Gevşeticisiz): BAEP ve kranyal sinir EMG/LSR volatil anesteziklere SON DERECE DİRENÇLİDİR (volatiller başlıca kortikal SSEP ve TcMEP\'i baskılar); ancak PONV riski ve serebral vazodilatasyon nedeniyle saf TIVA üstündür'
    ],
    clinicalRationale: 'MVD cerrahisinde kranyal sinir EMG ve LSR kayıtları nöromusküler blokerler (NMB) tarafından bloke edildiğinden entübasyon sonrası kas gevşeticisiz idame zorunludur. BAEP ve EMG/LSR volatil anesteziklere oldukça dirençli olmakla birlikte, arka çukur cerrahisindeki %70-80\'lik PONV riskini en aza indirmek, serebellar gevşemeyi optimize etmek ve (kullanılırsa) kortikal SSEP/TcMEP\'i korumak için Propofol + Remifentanil TIVA altın standarttır; VAE ve pnömosefali riski nedeniyle N₂O kesinlikle kontrendikedir.',
    notes: 'MVD CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) NMB\'siz TIVA idamesi (EMG/LSR\'yi ortadan kaldıran NMB\'dir; BAEP ve EMG volatillere dirençlidir); (2) BAEP / işitme monitörizasyonu ve retraktör uyarısı; (3) Trigemino-kardiyak / vagal refleks yönetimi (CN IX/X üzerine direkt Lidokain damlatılmaz); (4) N₂O yasağı ve tam VAE acil tedavi algoritması; (5) Pürüzsüz uyanma, agresif çoklu PONV profilaksisi ve taze arka çukurda Deksketoprofen/Tramadol yasağı.',
    rulesTitle: 'MVD CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'KAS GEVŞETİCİSİZ TIVA İDAMESİ VE DOĞRU NÖROFİZYOLOJİ (EMG / LSR / BAEP)',
        content: 'BAEP ve kranyal sinir EMG/LSR yanıtları volatil anesteziklere SON DERECE DİRENÇLİDİR; EMG ve LSR\'yi ortadan kaldıran asıl ajan NÖROMUSKÜLER BLOKERLERDİR (NMB). Volatil ajanlar esas olarak kortikal SSEP ve TcMEP\'i baskılar. Entübasyon sonrası kas gevşetici KESİNLİKLE yapılmamalı, kantitatif TOF oranı ≥ 0.90 doğrulanmalı ve yüksek PONV riski nedeniyle Propofol + Remifentanil TIVA tercih edilmelidir.'
      },
      {
        number: 2,
        title: 'BEYİN SAPI İŞİTSEL UYARILMIŞ POTANSİYELLERİ (BAEP) VE RETRAKTÖR UYARISI',
        content: 'Serebellar retraksiyon sırasında vestibülokoklear sinirin (CN VIII) gerilmesi kalıcı işitme kaybı yaratabilir. BAEP Dalga V latansında ≥ 1.0 ms gecikme veya amplitüdde > %50 azalma geliştiğinde anestezi/İONM ekibi derhal cerrahı uyarmalıdır (retraktörün gevşetilmesi ve papaverin uygulanması için).'
      },
      {
        number: 3,
        title: 'TRİGEMİNO-KARDİYAK VE GLOSOFARİNGEAL-VAGAL REFLEKS (ANİ ASİSTOLİ)',
        content: 'CN V, IX veya X köklerinin manipülasyonu saniyeler içinde şiddetli bradikardi, hipotansiyon veya ani ASİSTOLİYE yol açabilir. İlk ve en etkili müdahale cerrahın manevrayı DERHAL durdurmasıdır; yanıt vermezse IV Atropin (0.5-1 mg) uygulanır. CN IX/X üzerine doğrudan %1 Lidokain damlatılması vokal kord paralizisi ve aspirasyon riski doğurduğundan UYGULANMAZ!'
      },
      {
        number: 4,
        title: 'N₂O KESİN YASAĞI VE VENÖZ HAVA EMBOLİSİ (VAE) ACİL ALGORİTMASI',
        content: 'Dural sinüs (Sigmoideus/Transversus) ve emissary ven komşuluğu nedeniyle N₂O KESİNLİKLE KONTRENDİKEDİR. Ani EtCO2 düşüşü veya Doppler "mill-wheel" sesinde: Cerrahı uyar, sahayı SF ile doldur + kemik mumu bas, %100 O₂ ver, baş elevasyonunu düşür (mümkünse sol lateral/Durant), CVC varsa hava aspire et, vazopressör başla.'
      },
      {
        number: 5,
        title: 'PÜRÜZSÜZ UYANMA, ÇOKLU PONV PROFİLAKSİSİ VE ARKA ÇUKUR HEMATOMU ÖNLEMİ',
        content: 'Dar arka çukur kompartmanında uyanmada öksürük, kusma veya hipertansiyon ölümcül beyin sapı basısı yapan hematoma yol açar. 2020 PONV Kılavuzuna uygun TIVA + Deksametazon + Ondansetron + Aprepitant uygulanır; taze arka çukur hematom riski nedeniyle rutin IV Deksketoprofen ve yüksek PONV riski nedeniyle Tramadol KESİNLİKLE KULLANILMAZ.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Nöroradyoloji Konsültasyonu: Yüksek çözünürlüklü 3D CISS / FIESTA ve MR-Anjiyografi bulguları; suçlu damarın tipi (SCA, AICA, PICA, ektatik baziller arter), sinir kök basısının anatomisi ve arka çukur hacmi incelenmelidir.',
      'Nöroloji / İONM Ekibi: Bazal işitme durumu, preoperatif odyometri testi (işitme kaybı bazali bilinmelidir!), trigeminal duyu muayenesi ve fasiyal asimetri taranmalıdır.',
      'Kardiyoloji Konsültasyonu: Özellikle Glossofaringeal Nevralji olgularında yutkunma ile tetiklenen senkop, bradikardi veya kardiyak arrest atakları (karotid sinüs / vagal hiperaktivite) sorgulanmalı; bazal EKG ve kardiyak rezerv değerlendirilmelidir.',
      'Nöro-Yoğun Bakım Konsültasyonu: Postoperatif yakın nörolojik gözlem, alt kranyal sinir fonksiyonları ve solunum/havayolu güvenliği için YBÜ planlaması.'
    ],
    historyAndPhysical: [
      'Ağrı ve Tetikleyici Noktaların Sorgulanması: Yüze dokunma, tıraş olma, diş fırçalama veya rüzgarla tetiklenen şimşek çakar nevralji krizleri.',
      'Antiepileptik İlaç Kullanımı: Hastalar çoğunlukla yüksek doz Karbamazepin (Tegretol), Okskarbazepin, Baklofen veya Gabapentin kullanmaktadır. Bu ilaçların kan tablosu üzerindeki etkileri (hiponatremi, lökopeni, hepatotoksisite) ve kardiyak iletim gecikmeleri (PR uzaması) değerlendirilmelidir.',
      'Alt Kranyal Sinir Fonksiyonları (CN IX, X, XII): Yutma refleksi, öğürme (gag) refleksi, ses kısıklığı ve uvula deviasyonu bazal muayenesi mutlaka preoperatif kaydedilmelidir.',
      'Zor Hava Yolu ve Boyun Değerlendirmesi: Park-bench veya lateral pozisyonda başa verilecek rotasyon ve fleksiyona servikal omurganın toleransı.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve 2 Ünite ES Cross-Match teyidi.',
      'Serum Elektrolitleri: Özellikle Sodyum (Na+) seviyesi (Karbamazepin ve Okskarbazepin kullanan olgularda ilaca bağlı hiponatremi sık görülür; intraoperatif beyin ödemi riskini artırır!).',
      'Tam Kan Sayımı (Karbamazepine bağlı agranülositoz/trombositopeni kontrolü), Kan Glukozu ve Karaciğer Enzimleri.',
      'Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen).',
      'Preoperatif Odyometri Raporu ve Ameliyathane Nöronavigasyon İstasyonuna Yüklenmiş MRG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu) Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle takılmalıdır. Doğru CPP izlemi ve CN V / CN IX-X manipülasyonundaki ani bradikardi/tansiyon çöküşlerini saniyelik yakalamak için zorunludur.',
      'Beyin Sapı İşitsel Uyarılmış Potansiyelleri (BAEP / ABR): İşitme sinirinin (CN VIII) korunmasında altın standart. Dalga I (akustik sinir), Dalga III (koklear nükleus/superior oliver kompleks) ve Dalga V (inferior kollikulus) izlenir. Dalga V latansında > 1.0 ms gecikme veya Dalga V amplitüdünde > %50 düşüş geri dönüşümsüz işitme kaybı alarmıdır!',
      'Fasiyal Sinir Serbest ve Uyarılmış EMG (Free-run EMG ve Triggered EMG): M. orbicularis oculi ve M. orbicularis oris kaslarına yerleştirilen iğne elektrotlarla CN VII gerilimi ve irritasyonu izlenir.',
      'Lateral Spread Response (LSR) Monitörizasyonu (Hemifasiyal Spazm İçin): Fasiyal sinirin temporal dalı uyarıldığında mandibular daldan anormal kas yanıtı alınmasıdır; Teflon keçe yerleştirilip mikrovasküler dekompresyon sağlandığı anda LSR yanıtının kaybolması cerrahi başarının kanıtıdır.',
      'Alt Kranyal Sinir EMG Monitörizasyonu (Glossofaringeal Nevralji İçin): CN IX, X, XI, XII kas yanıtları (zırhlı/telli vokal kord EMG elektrotlu endotrakeal tüp, yumuşak damak ve trapez kası elektrotları).',
      'Venöz Hava Embolisi (VAE) Takibi: Prekordiyal Doppler Ultrason ve Sürekli End-Tidal CO2 (EtCO2 ani düşüşü ve açıklanamayan hipotansiyon hava embolisi alarmıdır).',
      'Kantitatif Nöromusküler İleti İzlemi (TOF - Train-of-Four): İdame evresinde EMG/LSR kayıtlarına başlanmadan önce nöromusküler bloğun tamamen çözüldüğünü doğrulamak için kantitatif TOF oranı (TOFR) ≥ 0.90 teyit edilmelidir.',
      'Sürekli Isı Takibi (Normotermi 36.0 - 37.0°C) ve Seri Kan Gazı / Kan Glukozu Takibi (hedef 140 - 180 mg/dL).'
    ],
    vascularAccess: [
      'En az iki adet geniş lümenli periferik intravenöz hat (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Yüksek VAE riski, otonomik instabilite veya vazoaktif infüzyon gereksinimi olan olgularda (sağ atriyum-SVC bileşkesinden hava aspirasyonu olanağı)',
      'Kan/Sıvı Isıtıcı Düzenekleri'
    ],
    patientPosition: 'Park-Bench Pozisyonu veya Modifiye Lateral Dekübitus (Mayfield 3-Noktalı Çivili Başlık ile İmmobilize Edilmiş)',
    patientPositionDetails: [
      'Hasta ameliyat edilecek taraf üstte kalacak şekilde lateral veya modifiye üç çeyrek prone (Park-Bench) pozisyona alınır.',
      'Baş Mayfield çivili başlık ile karşı tarafa 10-15° rotasyon, 10-15° apeks fleksiyonu ve hafif lateral tilt ile sabitlenir.',
      'Boyun Venöz Dönüşünün Korunması Hayatidir: Aşırı boyun fleksiyonu veya aşırı torsiyon ipsilateral internal juguler veni tıkayarak arka çukurda masif serebellar venöz konjesyona, cerrahi alanın daralmasına ve intraoperatif serebellar enfarkta yol açar! Çene ile sternum arasında en az 2 parmak mesafe korunmalıdır.',
      'Brakial Pleksus Koruması: Altta kalan kol göğüs seviyesinin altına alınır ve göğüs altına aksiller rulo (axillary roll) yerleştirilir.',
      'Gözler, kulaklar ve peroneal sinir bası noktaları jel pedlerle tam korunmalıdır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (1.5 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Kısa/Orta Etkili Kas Gevşetici (Rokuronyum 0.6 mg/kg). Entübasyon sonrası kas gevşetici KESİNLİKLE tekrarlanmaz; EMG/LSR başlamadan önce kantitatif TOFR ≥ 0.90 doğrulanır (gerekirse düşük doz Sugammadeks).',
      'İdame: TIVA Protokolü (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.25 mcg/kg/dk TCI infüzyonu; BIS 40 - 50). Not: BAEP ve kranyal sinir EMG/LSR volatil anesteziklere dirençlidir (EMG/LSR\'yi ortadan kaldıran NMB\'dir; volatiller esas olarak kortikal SSEP/TcMEP\'i baskılar); ancak MVD\'de TIVA yüksek PONV riskini düşürmek ve serebellar gevşemeyi optimize etmek için ilk tercihtir.',
      'Azot Protoksit (N₂O) KESİNLİKLE KONTRENDİKEDİR: Venöz hava embolisi (VAE) hacmini hızla katlar, pnömosefaliye ve PONV artışına yol açar.',
      'Sıvı ve Glukoz Yönetimi: İzotonik dengeli kristalloid (Plasmalyte/Isolyte-S) veya %0.9 NaCl kullanılır; hipotonik ve dekstrozlu sıvılar (%5 Dekstroz, Ringer Laktat) beyin ödemini artırdığından KESİNLİKLE verilmez. Kan glukozu hedefi 140 - 180 mg/dL tutulur.',
      'Serebellar Gevşeme Stratejisi ("Slack Posterior Fossa"):',
      '  - Retrosigmoid koridorda serebelluma minimal ekarte basısı uygulamak için insizyonla birlikte %20 Mannitol (0.5 g/kg IV yavaş; Osm < 320 mOsm/L) uygulanabilir.',
      '  - Normokapni / hafif hipokapni (PaCO2 33 - 36 mmHg).',
      '  - Cerrah dura açılışında sisterna magna veya serebellomedüller sisterni açarak BOS drene eder; BOS drene olduğu anda serebellum kendiliğinden çöker.',
      'Otonomik Krizlerin Yönetimi (Kritik Refleksler):',
      '  - Trigemino-Kardiyak Refleks (TCR) ve Glossofaringeal-Vagal Refleks: CN V veya CN IX/X manipülasyonu sırasında ani bradikardi, asistoli veya derin hipotansiyon gelişirse ANINDA CERRAHA MANİPÜLASYONU DURDURMASI SÖYLENİR! Yanıt vermezse IV Atropin (0.5 - 1.0 mg) veya Glikopirolat uygulanır.',
      '  - CN IX/X üzerine doğrudan %1 Lidokain damlatılması postoperatif vokal kord paralizisi, öğürme kaybı ve aspirasyon riski yarattığından UYGULANMAZ!',
      'Venöz Hava Embolisi (VAE) Acil Müdahale Algoritması:',
      '  1. Cerrahı derhal uyar: Cerrahi sahayı bol steril %0.9 NaCl (SF) ile doldur (flood), kemik kenarlarına kemik mumu (bone wax) ve ıslak gaz tampon uygula.',
      '  2. Solunum gazı: %100 O₂ ventilasyona geç (N₂O zaten kapalı/kontrendikedir).',
      '  3. Pozisyon: Cerrahi elverdiğince baş elevasyonunu düşür; hemodinamik kollapsta mümkünse sol lateral dekübitus / baş aşağı (Durant) pozisyona yaklaştır.',
      '  4. CVC Aspirasyonu: SVC-sağ atriyum hizasında santral venöz kateter mevcutsa hava aspirasyonu uygula.',
      '  5. Hemodinamik Destek: Hızlı izotonik sıvı bolusu + vazopressör (Noradrenalin / Fenilefrin / Efedrin; arrestte Adrenalin ve KPR).',
      '  6. Juguler Kompresyon: Yalnızca cerrahın doğrudan talebi/kontrolü altında, kısa süreli ve nazikçe uygulanır (serebral venöz basıncı artırarak hava girişini kesmek için).'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; başın lateral ve fleksiyonda pozisyonlandırılması sırasında tüpün katlanmasını önlemek için Spiral (Zırhlı / Wire-reinforced) ETT.',
      'Glossofaringeal Nevralji olgularında: Vokal kord EMG monitörizasyonu için zırhlı/telli (armored/reinforced) EMG endotrakeal tüp tercih edilmelidir (standart plastik NIM tüpleri boyun fleksiyonunda katlanabilir).',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Mayfield Çivili Başlık Takılması ve Park-Bench Pozisyonlama: Sempatik pik, juguler ven açıklığı ve aksiller rulo kontrolü.',
      '2. Retrosigmoid Kraniektomi ve Dural Sinüs Kenarı: Sinüs Transversus ve Sigmoideus bileşkesinde kanama ve venöz hava embolisi (VAE) riski; cerrah sinüs sınırını kemik mumu ile yalıtır.',
      '3. Sisternal Drenaj ve Serebellar Gevşeme: BOS drenajı ile serebellumun düşmesi; BAEP bazal teyidi ve kantitatif TOFR ≥ 0.90 doğrulaması.',
      '4. CN VIII İşitme Sinirinin Korunması: Akustik sinir aşırı gerilirse BAEP Dalga V uzar; retraktör açısı ve cerrahi çekme kuvveti anestezi ekibi uyarısıyla ayarlanır.',
      '5. Suçlu Damarın Diseksiyonu ve Teflon Keçe Yerleştirilmesi: Damar sinir REZ bölgesinden nazikçe ayrılır, araya Teflon keçe yerleştirilir; Hemifasiyal spazmda Lateral Spread Response (LSR) anında kaybolur.',
      '6. Su Sızdırmaz (Water-tight) Dural Tamir ve Valsalva Manevrası: BOS fistülü ve psödomeningosel gelişimini önlemek için cerrah tamir yaparken anestezi uzmanı 25-30 cmH2O hava yolu basıncı uygular.'
    ],
    emergenceNotes: [
      'HİPERTANSİYONSUZ VE ÖKSÜRMESİZ UYANMA (SMOOTH EMERGENCE): Arka çukur rijit ve hacmi çok kısıtlı bir alandır. Uyanma esnasında ıkınma ve hipertansif pikler cerrahi lojda arka çukur hematomuna, beyin sapı kompresyonuna, akut solunum durmasına ve ölüme yol açar!',
      'Uyanma Sırasında Sempatik Blokaj: Ekstübasyon öncesi düşük doz Remifentanil idamesi, IV Lidokain (1.5 mg/kg), Esmolol (0.5 mg/kg) veya Deksmedetomidin ile öksürük ve hipertansiyon tamamen engellenir. Sistolik kan basıncı < 130-140 mmHg tutulmalıdır.',
      'Alt Kranyal Sinir ve Yutma Fonksiyonlarının Değerlendirilmesi: Özellikle CN IX ve CN X cerrahisi geçirmiş hastalarda vokal kord paralizisi, öğürme refleksi kaybı ve aspirasyon riski mevcuttur. Ekstübasyon öncesi vokal kordlar ve spontan yutma refleksi mutlaka kontrol edilmelidir.',
      'Nörolojik Muayene: Ekstübe edilen hastada fasiyal simetri, göz kırpma, işitme kabiliyeti ve ekstremite motor güçleri ameliyathanede anında değerlendirilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Retrosigmoid İnsizyon ve Suboksipital Kas Ağrısı Yönetimi:',
      '  - Cerrahi Başlangıcında veya Kapanışta Cilt/Kas İçi Lokal İnfiltrasyon (%0.25 Bupivakain veya %0.5 Ropivakain): Suboksipital boyun kaslarının spazmını ve ameliyat sonrası ense ağrısını belirgin azaltır (PROSPECT 2023 A-düzeyi öneri).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kurtarma Opiyatı: Dikkatle titre edilen düşük doz IV Fentanil (25-50 mcg); aşırı sedasyon nörolojik takibi engellememelidir.',
      '  - KAÇINILACAK AJANLAR: Taze arka çukur cerrahisinde ölümcül beyin sapı hematomu riski nedeniyle rutin IV Deksketoprofen (non-selektif NSAİİ) KULLANILMAZ; ayrıca %70-80\'e ulaşan arka çukur PONV riskini şiddetle artırması ve nöbet eşiğini düşürmesi nedeniyle Tramadol KESİNLİKLE KULLANILMAZ!'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi (2023) kılavuzuna göre retrosigmoid yaklaşımlarda preoperatif/kapanış skalp-suboksipital lokal anestezik infiltrasyonu (veya skalp bloğu) ile düzenli IV Parasetamol multimodal analjezinin temel taşıdır; kanama riski yüksek arka çukur cerrahisinde non-selektif NSAİİ\'lardan ve yüksek emetojenik Tramadolden kaçınılır.'
    ],
    erasRecommendations: [
      '4. Konsensus PONV (2020) ve Arka Çukur Postoperatif Bakım Protokolleri:',
      '  - Agresif Çoklu PONV Profilaksisi: Arka çukur ve vestibüler manipülasyonda PONV insidansı %70-80\'e ulaşır; öğürme ve kusma KİBAS, arka çukur kanaması ve BOS kaçağını tetikler. 2020 Konsensus Kılavuzuna uygun olarak TIVA (Propofol) + Deksametazon (4-8 mg indüksiyonda) + 5-HT3 antagonisti (Ondansetron 4 mg kapanışta) + NK1 reseptör antagonisti (Aprepitant 40 mg PO preoperatif) uygulanır (zayıf etkili Metoklopramid yerine).',
      '  - BOS Fistülü Önlemi: Hastanın başı 30° elevasyonda tutulmalı, postoperatif ıkınma, öksürme ve burun sümkürmesi engellenmelidir.',
      '  - Glisemik Kontrol ve Sıvı: Kan glukozu 140 - 180 mg/dL aralığında tutulur; izotonik sıvılar tercih edilir.',
      '  - Oral Beslenme Öncesi Gag/Yutma Testi: Alt kranyal sinir (CN IX/X) cerrahisi geçiren olgularda su verilmeden önce yutma ve öğürme refleksi hekim tarafından bizzat doğrulanmalıdır.',
      '  - Erken Mobilizasyon: Hemodinamik ve nörolojik stabilitesi tam olan hastaların postoperatif 1. günde yatak dışına çıkarılması.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Cranial Nerve Decompression. Philadelphia: Wolters Kluwer.',
    erasReference: 'Gan, T. J., Belani, K. G., Bergese, S., et al. (2020). Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesthesia & Analgesia, 131(2), 411-448.',
    prospectReference: 'Mestdagh, F., Lavand\'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Jannetta, P. J. (1980). Neurovascular compression in cranial nerve disorders. Neurosurgery, 7(3), 295-300.',
      'Barker, F. G., Jannetta, P. J., Bissonette, D. J., Larkins, M. V., & Jho, H. D. (1996). The long-term outcome of microvascular decompression for trigeminal neuralgia. New England Journal of Medicine, 334(17), 1077-1084.',
      'Sloan, T. B., & Jäntti, V. (2008). Anesthetic effects on evoked potentials. In: Nuwer, M. R. (Ed.), Intraoperative Monitoring of Neural Function (Handbook of Clinical Neurophysiology, Vol. 8, pp. 94-126). Elsevier.'
    ]
  }
};
