import { ProcedureDefinition } from '../../types/procedures';

/**
 * Posterior Fusion/Fixation of the Upper Cervical Spine
 * (Üst Servikal [Oksipitoservikal / C1-C2] Posterior Füzyon ve Fiksasyon Cerrahisi: Harms, Magerl ve Oksipitoservikal Stabilizasyon)
 *
 * Jaffe (6th ed., 2020), ASA POVL Practice Advisory (2019), AO Spine / Praxis (2024),
 * CSRS, AANS/CNS, SNACC, PROSPECT (2021) ve ERAS Society (2021) kılavuzları referans alınarak yapılandırılmıştır.
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
  averageDuration: '3.0 - 5.5 saat (Uyanık fiberoptik entübasyon, invaziv A-line, İONM supin bazal kurulumu: 45-60 dk; Mayfield çivili başlık takılması ve PRONE pozisyona log-roll çevirme + post-pozisyon İONM kontrolü: 30-45 dk; Suboksipital ve C1-C3 posterior orta hat cerrahi diseksiyonu: 60-75 dk; C1 lateral mass, C2 pedikül/pars vidalama veya oksipital plak yerleşimi: 60-90 dk; Kemik greftleme, biyomekanik fiksasyon, hemostaz ve katmanlı kapatma: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '250 - 600 mL (Suboksipital venöz pleksus, C2 sinir kökü çevresi epidural venöz göllenmeler ve spongiyöz kemik kanamaları nedeniyle orta-yüksek düzey kanama; oksipitoservikal füzyon, revizyon veya A. vertebralis V3 segmenti laserasyonunda > 1000 mL masif kanama riski mevcuttur)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta-Yüksek Düzey Risk / Potansiyel Kritik Vasküler Kanama',
    crossMatchRequirement: 'En az 2 - 4 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır edilmeli, T&S ve yüksek kanama riskli olgularda Cell-Saver (Otolog Kan Kurtarma) hazır bulundurulmalıdır',
    transfusionProbability: '%20 - %40 (Revizyon cerrahilerinde, romatoid artritli anemi hastalarında veya tümör rezeksiyonlarında %50-60)',
    criticalBleedingSources: [
      'A. vertebralis (V3 segmenti): C1 posterior arkının üst yüzeyindeki sulcus arteriae vertebralis boyunca seyreder ve C1-C2 eklem aralığında kıvrım yapar; C1 kitle veya C2 pedikül vidası sapmalarında ölümcül arteriyel yaralanma riski taşır',
      'Suboksipital Venöz Pleksus ve Kondiler Emissary Venler (dura ve foramen magnum çevresinde yoğun venöz kanama ve Venöz Hava Embolisi [VAE] giriş odakları)',
      'C2 gangliyonu ve C1-C2 intervertebral aralıktaki zengin epidural venöz pleksus göllenmesi',
      'Oksipital kemik diploik venleri ve suboksipital kas tabakası kesi kenarları'
    ],
    hemostasisStrategies: [
      'Karın basısını tamamen serbestleştiren prone pozisyonlama (Jackson masası / toraks-pelvis ruloları): Batın basısını önleyerek CVP ve epidural venöz pleksus kanamasını belirgin azaltır',
      'Traneksamik Asit (TXA) Profilaksisi: Yüksek kanama riskli oksipitoservikal/revizyon füzyonlarda kontrendikasyon yoksa 10–15 mg/kg (veya 1 g) IV yükleme dozu + 1–2 mg/kg/saat idame infüzyonu (kan kaybını ve transfüzyon ihtiyacını belirgin azaltır)',
      'Bipolar mikronöroşirürjikal koagülasyon ve hemostatik jelatin matriks (FloSeal / Surgiflo), spongiyöz kemik kenarları için kemik mumu (Bone wax — ayrıca VAE önleme)',
      'Vertebral arter hasarında anında doğrudan bası, mikro-vasküler klip ve acil Girişimsel Nöroradyoloji koilleme/stentleme hazırlığı',
      'Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır; spinal kord ve optik sinir perfüzyonu korunur'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi — Saf TIVA (Propofol & Remifentanil Hedef Kontrollü İnfüzyon [TCI]): İONM (tcMEP/SSEP) için altın standart',
      'Uyanık Esnek Fiberoptik Bronkoskopik Entübasyon (AFOI) + TIVA İdamesi: İnstabil kraniyoservikal omurgayı korumak için nöroanestezi altın standardı'
    ],
    alternative: [
      'Zorunlu Kombinasyonda TIVA + Düşük Doz Sevofluran (≤ 0.5 MAC, tercihen < 0.3–0.5 MAC): İONM amplitüdlerini koruyacak şekilde titre edilerek (N₂O KESİNLİKLE KULLANILMAZ!)'
    ],
    clinicalRationale: 'İnstabil kraniyoservikal bileşkede boyun hareketinden kaçınmak için AFOI, prone pozisyonda ve çivili başlıkta tüp katlanmasını önlemek için zırhlı (spiral telli) ETT seçimi zorunludur. Vidalamada tcMEP/SSEP güvenilirliği için kas gevşeticisiz saf Propofol + Opioid TIVA (N₂O kesinlikle kontrendike) altın standarttır.',
    notes: 'POSTERİOR ÜST SERVİKAL FİKSASYONDA TEMEL ANESTEZİ İLKELERİ: (1) AFOI, SCI\'DE SÜKSİNİLKOLİN YASAĞI VE LOG-ROLL KORUMA; (2) PRE-/POST-POZİSYON İONM, SAF TIVA, N₂O YASAĞI VE BİLATERAL YUMUŞAK BITE BLOCK; (3) ASA POVL 2019 (CRAO vs PION — MAYFIELD\'DE BİLE PION RİSKİ!) VE VAE KORUMASI; (4) PERMİSİF HİPOTANSİYON YASAĞI VE AO SPINE 2024 MAP HEDEFLERİ.',
    rulesTitle: 'POSTERİOR ÜST SERVİKAL FİKSASYONDA TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'AFOI, SCI\'DE SÜKSİNİLKOLİN YASAĞI VE PRONE LOG-ROLL KORUMASI',
        content: 'Oksipitoservikal veya C1-C2 instabilitesinde AFOI uygulanır; AFOI zaten tamamlandığı için entübasyonda kas gevşetici GEREKMEZ (yalnızca uyutularak MILS+VL entübasyon yapılacaksa tek doz orta etkili Rokuronyum kullanılır). Akut/subakut SCI, üst motor nöron lezyonu (>24–48 saat) ve uzun immobilizasyonda Süksinilkolin ölümcül hiperkalemik kardiyak arrest nedeniyle KESİNLİKLE KONTRENDİKEDİR. Prone log-roll dönüşü cerrah liderliğinde en az 4–5 kişiyle nötral aks korunarak yapılır.'
      },
      {
        number: 2,
        title: 'İONM (PRE-/POST-POZİSYON BAZAL), SAF TIVA, N₂O YASAĞI VE BİLATERAL YUMUŞAK BITE BLOCK',
        content: 'Supin (pre-pozisyon) VE prone çevirme sonrası (post-pozisyon) bazal tcMEP/SSEP kayıtları zorunludur. Saf Propofol + Opioid TIVA altın standarttır (zorunlu volatil ≤ 0.5 MAC, tercihen < 0.3–0.5 MAC; N₂O hem İONM baskılaması hem VAE genişletme riski nedeniyle KESİNLİKLE KONTRENDİKEDİR). tcMEP sırasında dil/dudak laserasyonu ve diş kırığını önlemek için bilateral yumuşak gazlı bez rulo molar bite block zorunludur (sert plastik Guedel airway KULLANILMAZ).'
      },
      {
        number: 3,
        title: 'ASA POVL 2019 (CRAO vs PION PATOFİZYOLOJİSİ) VE VENÖZ HAVA EMBOLİSİ (VAE)',
        content: 'Doğrudan oküler bası Santral Retinal Arter Oklüzyonu (CRAO) yapar; buna karşın Posterior İskemik Optik Nöropati (PION) SIFIR oküler bası varken dahi (Mayfield çivili başlıkta bile!) gelişebilir! PION risk faktörleri: >6 saat prone, >1 L kan kaybı, başın kalp seviyesinin altında kalması, kolloid yerine aşırı saf kristalloid dengesizliği, erkek cinsiyet ve obezitedir. Baş nötral ve kalp seviyesinde veya hafif yukarıda (ters Trendelenburg) tutulmalı, kolloid+kristalloid dengesi sağlanmalıdır; baş-yukarı pozisyonda suboksipital diploik venlerden VAE gelişimine karşı uyanık olunmalıdır.'
      },
      {
        number: 4,
        title: 'SPİNAL KORD PERFÜZYONU (PERMİSİF HİPOTANSİYON YOK) VE AO SPINE 2024 HEDEFLERİ',
        content: 'Permisif/kontrollü hipotansiyondan KESİNLİKLE kaçınılır. Miyelopati/stenozda MAP ≥ 80–85 mmHg; akut travmatik SCI\'de (AO Spine/Praxis 2024) MAP alt sınır 75–80 mmHg, üst sınır 90–95 mmHg (3–7 gün) hedeflenir. Rutin yüksek doz NASCIS metilprednizolon güncel AANS/CNS ve AO Spine kılavuzlarınca önerilmez. Uzun prone sonrası ekstübasyon öncesi Cuff-Leak testi şarttır.'
      }
    ]
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
      'Nörolojik Muayene ve Otonomik Riskler: Dört ekstremite motor gücü, duyusal seviyeler, patolojik refleksler (Babinski, Hoffman, klonus) ve sfinkter fonksiyonları kaydedilmelidir. Akut üst servikal SCI\'de nörojenik şok (T1–T4 sempatik kayıp: hipotansiyon + paradoksal bradikardi), kronik ≥T6 SCI\'de otonomik disrefleksi riski sorgulanmalıdır.',
      'Boyun Muayenesi: HASTAYA KESİNLİKLE FLEKSİYON/EKSTANSİYON YAPTIRILMAZ! Servikal kord kompresyonu veya ani solunum arresti riski taşır. Hasta sert boyunluk (Philadelphia / Miami-J) içindedir.',
      'Göz Muayenesi ve POVL Risk Değerlendirmesi: Bazal görme keskinliği, glokom, obezite, erkek cinsiyet ve beklenen uzun cerrahi (>6 saat) / kan kaybı (>1 L) açısından PION riski preoperatif belgelenmelidir.',
      'Romatoid Artrit ve ERAS Preoperatif Optimizasyon (PBM): RA hastalarında TMJ ankilozu ve cricoarytenoid artrit taranır. Elektif olgularda Hasta Kan Yönetimi (PBM) ile anemi/demir eksikliği tedavisi, ≥ 4 hafta sigara bırakma ve kronik opioid taraması uygulanır.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 2 - 4 Ünite ES Cross-Match teyidi.',
      'Hemoglobin / Hematokrit, Trombosit Sayımı, PT/INR, aPTT, Fibrinojen; elektif olgularda anemi varsa ferritin/TSAT (PBM).',
      'Serum Elektrolitleri, Kan Şekeri (HbA1c diyabetiklerde), Böbrek ve Karaciğer Fonksiyon Testleri.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Servikal BT/MRG (kord içi T2 hiperintensitesi / miyelomalazi) — Akut travma veya instabilite şüphesinde dinamik fleksiyon-ekstansiyon grafileri KESİNLİKLE KONTRENDİKEDİR.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Hedefe Göre Doğru Sıfırlama: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle yerleştirilir. Spinal kord perfüzyon basıncı (SCPP) izlemi için flebostatik aks (kalp/sağ atriyum seviyesi) esas alınır; ters Trendelenburg (baş-yukarı) pozisyonda serebral perfüzyon basıncı (CPP) için dış kulak yolu (tragus) düzeyi referans alınır (aynı anda iki farklı seviyede sıfırlanmaz).',
      'İntraoperatif Nöromonitörizasyon (İONM): Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP) ve serbest çalışan EMG. Supin (pre-pozisyon) bazal VE prone çevirme sonrası (post-pozisyon) bazal kayıtlar mutlaka doğrulanır.',
      'Venöz Hava Embolisi (VAE) Monitörizasyonu: Baş-yukarı prone pozisyonda suboksipital diploik/kondiler venlerden hava girişi açısından sürekli EtCO2 (ani düşüş en erken klinik bulgulardan biridir), SpO2, arteriyel dalga formu ve yüksek riskte prekordiyal Doppler takibi.',
      'Train-of-Four (TOF) Nöromusküler İzlem: Uyutularak entübasyonda tek doz Rokuronyum kullanıldıysa İONM öncesi tam geri dönüş (TOF > %90, gerekirse Sugammadeks) ve idamede kazara blokaj olmadığını doğrulamak için şarttır.',
      'Sürekli EtCO2, Kan Glukozu (hedef 140–180 mg/dL), Isı Probu (normotermi 36.0–37.0°C) ve Foley İdrar Sondası.',
      'Göz Güvenliği Kontrolü: Mayfield çivili başlıkta oküler bası sıfırdır; ancak her 20–30 dakikada bir göz kapaklarının kapalı/nemli olduğu ve hortum/örtü teması olmadığı fiziksel olarak denetlenir (CRAO önleme).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik damar yolu (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Prone pozisyonda Noradrenalin infüzyonu, volüm izlemi ve olası VAE durumunda sağ atriyumdan hava aspirasyonu için (kavo-atriyal bileşkede konumlandırılır)'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon + Baş Mayfield 3-Noktalı Çivili Başlık ile Kalp Seviyesinde veya Hafif Üzerinde (Ters Trendelenburg), Nötral / Kontrollü Hafif Fleksiyonda İmmobilize',
    patientPositionDetails: [
      'MAYFIELD ÇİVİ FİKSASYONU VE HİPERTANSİF YANIT ÖNLEME: Supin pozisyonda Mayfield çivileri yerleştirilmeden önce çivi giriş yerlerine lokal anestezik (Bupivakain/Lidokain) infiltrasyonu ve eşzamanlı kısa etkili opioid (Remifentanil/Fentanil bolusu) veya derin anestezi/Esmolol ile ani hipertansif-taşikardik yanıt mutlaka baskılanmalıdır.',
      'PRONE ÇEVİRME MANEVRASI (LOG-ROLL) VE PRE-/POST-POZİSYON İONM: Supin pozisyonda pre-pozisyon bazal İONM alınır. Anestezi uzmanı hava yolunu korurken cerrah liderliğinde en az 4–5 kişilik ekip hastayı tek parça halinde (log-roll) prone masaya çevirir. Çevirme tamamlanır tamamlanmaz post-pozisyon bazal İONM (tcMEP/SSEP) derhal doğrulanır; sinyal düşüşünde boyun hizalaması anında düzeltilir!',
      'ASA POVL 2019 (CRAO vs PION KORUMASI): Göz kürelerine dış bası CRAO yapar (Mayfield başlıkta yüz/göz serbesttir, ProneView kullanılmaz); ancak PION (Posterior İskemik Optik Nöropati) SIFIR oküler basıda bile (Mayfield\'de dahi!) gelişebilir! PION riskini azaltmak için baş nötral ve kalp seviyesinde veya hafif üzerinde (ters Trendelenburg) konumlandırılır, uzun prone (>6 saat) / >1 L kan kaybında kolloid + kristalloid dengeli sıvı yönetimi uygulanır ve derin anemi/hipotansiyondan kaçınılır.',
      'Abdominal Basının Serbestleştirilmesi: Karın göğüs ve pelvis pedleri üzerinde serbestçe sarkmalı; inferior vena kava basısı önlenerek Batson epidural venöz pleksus kanaması azaltılmalıdır.',
      'Brakiyal Pleksus Koruması: Kollar gövde yanına anatomik nötral pozisyonda uzatılır, omuzlara aşırı traksiyon verilmez.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Nöromusküler Bloker Disiplini: AFOI tamamlanıp uyanık nörolojik kontrol ve ETT doğrulaması yapıldıktan sonra Propofol (1.5–2.5 mg/kg) + Remifentanil (0.1–0.25 mcg/kg/dk) veya Fentanil (2–3 mcg/kg) ile indüksiyon yapılır; AFOI zaten tamamlandığı için entübasyon amaçlı kas gevşetici KULLANILMAZ. Yalnızca uyutularak MILS + Videolaringoskopi yapılacaksa tek doz orta etkili Rokuronyum (0.6 mg/kg) verilir (İONM öncesi TOF > %90 veya Sugammadeks ile tam geri dönüş). AKUT/SUBAKUT SCI, ÜST MOTOR NÖRON LEZYONU (>24–48 SAAT) VE UZUN İMMOBİLİZASYONDA SÜKSİNİLKOLİN ÖLÜMCÜL HİPERKALEMİK KARDİYAK ARREST NEDENİYLE KESİNLİKLE KONTRENDİKEDİR! İdame kas gevşeticisiz sürdürülür.',
      'İdame (Altın Standart Saf TIVA): Propofol (80–130 mcg/kg/dk) + Remifentanil (0.1–0.3 mcg/kg/dk) TCI infüzyonu (BIS 40–60). Zorunlu volatil kombinasyonunda ≤ 0.5 MAC (tercihen < 0.3–0.5 MAC Sevofluran) aşılmaz. N₂O (Azot Protoksit) tcMEP/SSEP baskılaması ve Venöz Hava Embolisini (VAE) katastrofik şekilde genişletme riski nedeniyle KESİNLİKLE KULLANILMAZ.',
      'Kanama Koruma (TXA), Antibiyotik ve Adjuvan Analjezi: Yüksek kanamalı oksipitoservikal füzyonlarda TXA (10–15 mg/kg [veya 1 g] IV yükleme + 1–2 mg/kg/saat idame) değerlendirilir. İnsizyondan 30–60 dk önce IV Sefazolin (2 g; >120 kg ise 3 g) verilir; > 3–4 saat veya > 1.5 L kan kaybında tekrar dozu uygulanır. İntraoperatif düşük doz IV Ketamin (0.25–0.5 mg/kg yükleme + 0.1–0.2 mg/kg/saat) ve/veya IV Lidokain infüzyonu (1–1.5 mg/kg/saat) ya da majör füzyonda tek doz IV Metadon (0.1–0.2 mg/kg) düşünülebilir.',
      'Hemodinamik Hedefler ve AO Spine 2024: Permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır! Miyelopati/stenozda MAP ≥ 80–85 mmHg; akut travmatik SCI\'de (AO Spine/Praxis 2024) MAP alt sınır 75–80 mmHg, üst sınır 90–95 mmHg (3–7 gün) hedeflenir (erken Noradrenalin infüzyonu 0.02–0.1 mcg/kg/dk; nörojenik şokta bradikardiye dikkat). Rutin yüksek doz NASCIS metilprednizolon güncel AANS/CNS ve AO Spine kılavuzlarınca önerilmez.',
      'Standart İONM Sinyal Düşüşü (Drop) Kontrol Listesi (tcMEP/SSEP >%50 amplitüd düşüşü veya >%10 latans uzaması): (1) Cerrahı uyar ve son manevrayı/vidayı/redüksiyonu geri al, (2) MAP ≥ 85–90 mmHg yükselt, (3) SpO₂/PaO₂ ve normokapni (PaCO₂ 35–40 mmHg) doğrula, (4) Hb/Hct kontrolü yap ve anemiyi düzelt, (5) Normotermi (36.0–37.0°C) sağla, (6) Anestezi derinliğini (<0.5 MAC / saf TIVA) ve TOF/kazara NMB kontrolünü yap, (7) Elektrot bağlantısı ve boyun-omuz pozisyonunu gözden geçir.',
      'Venöz Hava Embolisi (VAE) Acil Yönetimi: Ani EtCO₂ düşüşü, hipotansiyon veya desatürasyonda cerrahı derhal uyar (sahayı salinle doldurma, açık diploik kemik kenarlarına kemik mumu), %100 O₂ ver (N₂O zaten kullanılmaz), başı kalp seviyesine indir (ters Trendelenburg\'u azalt), CVC\'den hava aspirasyonu dene ve vazopressörle hemodinamiyi destekle.',
      'Sıvı ve Glukoz Yönetimi (ASA POVL 2019 Uyumlu): Prone pozisyonda saf aşırı kristalloid verilmesi faringeal/optik sinir ödemini ve PION riskini artırdığından dengeli kristalloid + gerektiğinde kolloid (örn. %5 albümin) kombinasyonu uygulanır; kan şekeri 140–180 mg/dL tutulur.'
    ],
    airwayManagement: [
      'Altın Standart Hava Yolu: Uyanık Esnek Fiberoptik Bronkoskopik Entübasyon (AFOI). Hasta uyanıkken nörolojik fonksiyonlar korunarak tüp yerleştirilir; uyutularak entübasyon zorunluysa MILS + Videolaringoskopi + tek doz orta etkili Rokuronyum (SCI\'de Süksinilkolin KESİNLİKLE KONTRENDİKE).',
      'Tüp Tercihi ve Bilateral Yumuşak Bite Block: Spiral (Wire-reinforced / Zırhlı) Endotrakeal Tüp zorunludur (prone fleksiyonda tüp katlanmasını önler). tcMEP uyarısı sırasında dil/dudak laserasyonu ve diş kırığını önlemek için bilateral yumuşak gazlı bez rulo molar bite block yerleştirilir; sert plastik Guedel airway KESİNLİKLE KULLANILMAZ.',
      'Tüpün Tespiti: Prone pozisyonda tükürük/sekresyonlar flasterleri gevşetebileceğinden tüp su geçirmez bez flaster ve güvenli bağ ile sabitlenir.',
      'Acil Prone Hava Yolu Planı: İntraoperatif kazara ekstübasyon/kaf yırtılması ihtimaline karşı steril supraglottik kurtarma (LMA) ve supin sedye hazırda bekletilir.'
    ],
    criticalSurgicalStages: [
      '1. Mayfield Çivili Başlık (Lokal Anestezik + Opioid Blunting) ve Prone Log-Roll Çevirme: Supin pre-pozisyon ve prone post-pozisyon bazal İONM kontrolü.',
      '2. Suboksipital ve C1-C2 Diseksiyon: Foramen magnum alt kenarı, C1 arka arkı ve C2 laminası sıyrılırken epidural/suboksipital venöz pleksus kanamaları ve VAE riski.',
      '3. C1 Lateral Kitle (Lateral Mass) Diseksiyonu ve Giriş Deliği: C1 arkının altından geçilirken C2 sinir kökü ekarte edilir; lateralde A. vertebralis komşuluğuna dikkat edilir.',
      '4. C2 Pedikül / Pars Vidası Gönderilmesi (En Yüksek Riskli Aşama!): Vidanın medial/superior korteksi aşması spinal kord hasarına, lateral korteksi aşması vertebral arter laserasyonuna yol açar. İONM, floroskopi ve navigasyon eşliğinde uygulanır.',
      '5. Oksipital Plak Tespiti ve Rodların Sıkılması: Oksipitoservikal vakalarda foramen magnum dekompresyonu sonrası rodların sıkılarak açılanmanın sabitlenmesi.'
    ],
    emergenceNotes: [
      'PRONE POZİSYON YÜZ VE LARİNKS ÖDEMİ DEĞERLENDİRMESİ: Uzun süren prone cerrahilerde yerçekimi ve venöz göllenme nedeniyle dudaklar, dil, farenks ve konjonktiva belirgin ödemli olabilir.',
      'Zorunlu KAF KAÇAK TESTİ (Cuff Leak Test): Hasta supin sedyeye alındıktan sonra tüp kafı indirilerek kaçak sesi doğrulanmalıdır.',
      'Pürüzsüz Uyanma ve Ekstübasyon Kriterleri: Öksürme/ıkınmayı önlemek için IV Lidokain (1.5 mg/kg) veya düşük doz Remifentanil desteğiyle pürüzsüz uyanma sağlanır. Hasta tam uyanık, TOF %100, kaf kaçak testi pozitif olmalıdır.',
      'Dört Ekstremite Erken Nörolojik ve Görme Muayenesi: Ekstübasyon anında dört ekstremite motor gücü ve hastanın görme keskinliği/ışık algısı kontrol edilip kaydedilir; ani görme kaybında acil Göz Hastalıkları konsültasyonu istenir.',
      'Şüpheli Hava Yolu ve Zorlu Vakalar: Masif kanama/sıvı alan, cerrahi süresi > 5 saat süren veya belirgin dil/farenks ödemi olan hastalar ameliyathanede ekstübe EDİLMEMELİ; zırhlı tüple entübe şekilde Nöro-YBÜ\'ye nakledilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Opioid Koruyucu Analjezi (PROSPECT 2021): Derin paraspinal kas diseksiyonu nedeniyle şiddetli posterior boyun ağrısı oluşur. Cerrahi kesi/kas yatağına lokal anestezik infiltrasyonu (Bupivakain/Levobupivakain) + düzenli IV Parasetamol (1 g IV her 6 saatte bir).',
      'Hasta Kontrollü Analjezi (IV PCA): Yalnızca talep/bolus modunda (BAZAL İNFÜZYONSUZ!) düşük doz Fentanil veya Morfin PCA. Opioid PCA ile eşzamanlı Benzodiazepin (Diazepam vb.) KESİNLİKLE KULLANILMAZ (FDA Black Box solunum depresyonu, deliryum ve nörolojik muayene maskelemesi riski).',
      'Opioid Koruyucu Adjuvanlar: İntraoperatif/postoperatif düşük doz IV Ketamin infüzyonu (0.1–0.2 mg/kg/saat) ve/veya IV Lidokain infüzyonu (1–1.5 mg/kg/saat); majör oksipitoservikal füzyonda tek doz intraoperatif IV Metadon (0.1–0.2 mg/kg) seçeneği değerlendirilebilir.',
      'NSAİİ / COX-2 Nüansı: Cerrahi hemostaz sağlandıktan sonra kısa süreli (≤ 48–72 saat) standart doz NSAİİ veya selektif COX-2 inhibitörü kemik füzyonunu anlamlı bozmaz; yüksek doz Ketorolak (>120 mg/gün) veya >2 hafta uzun süreli kullanımdan kaçınılır.',
      'Kas Spazmı ve Gabapentinoid Uyarısı: Suboksipital kas spazmında benzodiazepin dışı ajanlar (örn. Tiyokolşikozit/Tizanidin) tercih edilir; rutin Gabapentinoid (Pregabalin/Gabapentin) kullanımından kaçınılır (PROSPECT 2021 / FDA sedasyon uyarısı).'
    ],
    prospectRecommendations: [
      'PROSPECT Kompleks Omurga Cerrahisi (Waelkens et al., 2021): Düzenli Parasetamol + kısa süreli NSAİİ/COX-2 inhibitörü, cerrahi alan lokal anestezik infiltrasyonu, intraoperatif IV Ketamin (veya majör füzyonda tek doz IV Metadon / IV Lidokain) ve bazal infüzyonsuz kurtarma opioidi önerilir.',
      'Rutin gabapentinoid ve opioid+benzodiazepin kombinasyonlarından kaçınılmalıdır.'
    ],
    erasRecommendations: [
      'ERAS Omurga Konsensüsü (Debono et al., 2021): Preoperatif anemi optimizasyonu (PBM), ≥ 4 hafta sigara bırakma, kronik opioid taraması ve ameliyattan 2 saat öncesine kadar berrak karbonhidratlı (CHO) sıvı alımı.',
      'Multimodal POBV (PONV) Profilaksisi: Çift/üçlü antiemetik profilaksi (Deksametazon 8 mg + Ondansetron 4 mg ± Droperidol/Aprepitant). Öğürme ve kusma boyun venöz basıncını artırarak cerrahi sahada hematom ve nörolojik bası riski doğurur.',
      'Glisemik Kontrol, Foley Çekimi ve Mobilizasyon: Kan glukozu 140–180 mg/dL aralığında tutulur; Foley idrar sondası mümkün olan en erken dönemde çekilir. Rijit servikal boyunluk desteği ile postop 1. günde mobilizasyon hedeflenir.',
      'Erken Görme ve Nörolojik Muayene: Postoperatif ilk saatte görme keskinliği ve dört ekstremite motor muayenesi belgelenir; görme kaybı şüphesinde acil Göz Hastalıkları konsültasyonu istenir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B, eds. Anesthesiologist\'s Manual of Surgical Procedures (6th ed., 2020). Section II: Neurosurgery — Posterior Upper Cervical Spine Procedures.',
    erasReference: 'Debono B, Wainwright TW, Wang MY, et al. Consensus statement for perioperative care in lumbar spinal fusion: ERAS Society recommendations. Spine J. 2021;21(5):729–752.',
    prospectReference: 'Waelkens P, et al.; PROSPECT Working Group. Pain management after complex spine surgery. Eur J Anaesthesiol. 2021;38(9):985–994.',
    otherReferences: [
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. Practice advisory for perioperative visual loss associated with spine surgery 2019. Anesthesiology. 2019;130(1):12–30.',
      'AO Spine / Praxis Spinal Cord Institute Clinical Practice Guideline (2024): Hemodynamic Management of Acute Spinal Cord Injury & Methylprednisolone Recommendations.',
      'Harms J, Melcher RP. Posterior C1-C2 fusion with polyaxial screw and rod fixation. Spine. 2001;26(22):2467–2471.',
      'SNACC Consensus Statement on Anesthetic Management of Patients with Cervical Spine Instability and Intraoperative Neuromonitoring.'
    ]
  }
};
