import { ProcedureDefinition } from '../../types/procedures';

/**
 * Torasik ve Lomber Omurgada Kombine Anterior ve Posterior Enstrümantasyon: Aynı Gün / Aşamalı Çift Seviyeli Rekonstrüksiyon (360 Derece Füzyon)
 * (Combined Anterior and Posterior Instrumentation of the Thoracic and Lumbar Spine)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Spine Surgery: Combined Anterior and Posterior Instrumentation of the Thoracic and Lumbar Spine, pp. 554-560),
 * Scoliosis Research Society (SRS), North American Spine Society (NASS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Kompleks Deformite ve 360 Derece Spinal Rekonstrüksiyon Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const combinedAnteriorPosteriorThoracolumbarInstrumentation: ProcedureDefinition = {
  id: 'combined-anterior-posterior-thoracolumbar-instrumentation',
  name: 'Torasik ve Lomber Omurgada Kombine Anterior ve Posterior Enstrümantasyon: Aynı Gün / Aşamalı Çift Seviyeli Rekonstrüksiyon (360 Derece Füzyon)',
  shortCode: 'KOMBINE-ANT-POST-360',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji ve Deformite Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Torakolomber ve lumbosakral omurganın (T1-S1 ve Pelvis) hem anterior (ön) hem posterior (arka) kolonunu içeren en radikal, yüksek riskli ve invaziv omurga cerrahisidir. Genellikle "360 Derece Füzyon" olarak adlandırılır. Cerrahi aynı seansta (aynı gün ardışık iki ameliyat) veya 3-7 gün arayla aşamalı (staged) olarak icra edilir. İlk aşamada (Anterior/Anterolateral Yaklaşım): Hasta lateral dekübitüs veya supin pozisyonda torakotomi, torakoabdominal yaklaşım, retroperitoneal ALIF/OLIF veya diyafram insizyonu (torakofrenotomi) ile omurganın ön yüzüne ulaşılır; patolojik vertebra korpusu rezeke edilir (korpektomi), kalsifiye diskler boşaltılır, ön kolon yüksekliğini restore eden lordotik ekspandabl titanyum kafesler veya yapısal kemik greftleri yerleştirilir. İkinci aşamada (Posterior Yaklaşım): Hasta prone (yüzüstü) pozisyona çevrilir; posterior orta hat insizyonuyla çok seviyeli pedikül vidaları, pelvik vidalar (S2AI), dekompresyon, deformite redüksiyonu veya osteotomiler (PSO/SPO) uygulanarak rijit çift rod sistemiyle biyomekanik 360 derece ankoraj kilitlenir.',
  indications: [
    'Şiddetli Erişkin Omurga Deformitesi ve Rijit Kifoskolyoz: Anterior serbestleştirme (mobilizasyon) ve korpektomi yapılmadan tek başına posterior yolla düzeltilemeyen ileri derecede rijit deformiteler',
    'Yüksek Dereceli Lumbosakral Spondilolistezis ve Spondilopitozis (Grade IV ve V / Meyerdıng): L5 korpusunun sakrumun önüne düştüğü olgularda 360 derece redüksiyon ve füzyon',
    'Omurga Tümörleri ve Soliter Metastazlar (Total En-Bloc Spondilektomi): Omurilik basısı yaratan korpus ve arka eleman tümörlerinin tam onkolojik rezeksiyonu ve 3 kolon rekonstrüksiyonu',
    'Torakolomber İnstabil Patlama (Burst) Kırıkları ve Kırıklı Çıkıklar: Nörolojik bası yapan korpus fragmanlarının anterior dekompresyonu ve çok seviyeli posterior rijit stabilizasyonu',
    'Başarısız Bel Cerrahisi Sendromu (FBSS), Ağır Psödoartroz ve İmplant Yetmezliği: Önceki posterior enstrümantasyon kırılmış, anterior füzyon kaynamamış ve kifotik çökme gelişmiş kompleks revizyon vakaları',
    'Spinal Tüberküloz (Pott Hastalığı) ve Piyojenik Spondilodiskit: Korpus yıkımı ve apse boşaltılması sonrası anterior biyomekanik kafes ve posterior gergi bandı fiksasyonu'
  ],
  averageDuration: '6.0 - 12.0 saat (Aynı gün kombine prosedür: Anterior aşama [torakotomi/retroperitoneal]: 3.0 - 4.5 saat; Pozisyon değişimi, resüsitasyon ve örtünme: 1.0 - 1.5 saat; Posterior aşama [çok seviyeli pedikül vidalama/osteotomi]: 4.0 - 6.0 saat; Aşamalı cerrahi tercih edilirse her seans 3.5 - 5.5 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '1500 - 4500 mL (Hem anterior torakolomber/retroperitoneal diseksiyon hem posterior çok seviyeli kas sıyırma, osteotomi ve korpektomi yüzeyleri nedeniyle; tümör spondilektomisi veya revizyon deformitelerde 5000 mL üzeri masif hemoraji riski yüksektir)',
    riskLevel: 'high',
    riskLevelLabel: 'Aşırı Yüksek Risk / Katastrofik Masif Kanama ve Tüketim Koagülopatisi Potansiyeli',
    crossMatchRequirement: 'En az 6-8 Ünite Eritrosit Süspansiyonu (ES), 4-6 Ünite Taze Donmuş Plazma (TDP), 2 Aferez Trombosit ve 2 g Fibrinojen Konsantresi ameliyathane kan dolabında hazır bekletilmelidir; Çift aspiratörlü Cell Saver ve hızlı infüzyon pompası ZORUNLUDUR',
    transfusionProbability: '%85 - %98 (Aynı gün kombine cerrahilerde kan transfüzyonu kaçınılmazdır)',
    criticalBleedingSources: [
      'Torasik ve Abdominal Aort, Vena Cava Inferior, Ana İliak Damarlar (Anterior korpektomi ve ekartasyon sırasında doğrudan komşuluk)',
      'Segmental İnterkostal ve Lomber Arter ve Venler (Segmental ligasyon sırasında foramen girişinde yırtılma)',
      'Epidural Batson Venöz Pleksusu (Hem anterior hem posterior dekompresyon fazında durdurulması güç venöz göllenme)',
      'Geniş Spongiyöz Korpektomi ve Çok Seviyeli Pedikül/Pelvik Vida Kemik Girişleri',
      'Geniş Paraspinal Kas Yatağı ve Subperiosteal Diseksiyon Alanları',
      'S2AI ve İliak Vida Girişleri (Süperior gluteal arter ve pleksus yaralanması)'
    ],
    hemostasisStrategies: [
      'Yüksek Doz İntraoperatif Traneksamik Asit (TXA) Protokolü: İndüksiyonda 20-30 mg/kg yükleme, ardından operasyon sonuna kadar (tüm aşamalarda) 2-5 mg/kg/saat sürekli infüzyon',
      'Çift Aspiratörlü Cell Saver Sistemi: Hem anterior kavite hem posterior cerrahi loj kanamalarını eşzamanlı toplayıp yıkayarak ototransfüzyon sağlama',
      'Masif Transfüzyon Protokolü (MTP): 1:1:1 oranında ES, TDP ve Trombosit transfüzyonu; viskoelastik hemostatik analiz (TEG / ROTEM) ile hedefe yönelik replasman',
      'Fibrinojen Hedefi > 200 mg/dL, İyonize Kalsiyum > 1.15-1.25 mmol/L (Sitrat intoksikasyonuna karşı her 2 ünite kanda 1 g Kalsiyum Klorür/Glukonat İV)',
      'Topikal Biyolojik Hemostatikler: FloSeal matriks, Surgicel, Gelfoam + Trombin ve yoğun steril kemik mumu uygulaması',
      'Normotermi Yönetimi: Vücut sıcaklığı < 35.5°C altına düşerse koagülasyon kaskadı çöker; aktif ısıtıcı battaniyeler, sıvı ısıtıcıları ve ameliyathane oda sıcaklığının yükseltilmesi zorunludur'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (Çift Lümenli Tüp [DLT] / OLV) + TIVA (Propofol + Remifentanil) — Sürekli tcMEP, SSEP ve Pedikül Vida EMG takibi için MUTLAK STANDARTTIR'
    ],
    alternative: [
      'TIVA + Düşük Doz Ketamin İnfüzyonu (0.1-0.2 mg/kg/saat): Opioid toleransı ve hiperaljeziyi engellemek, hemodinamik stabiliteyi desteklemek amacıyla',
      'Seçilmiş olgularda anterior aşamada Tek Akciğer Ventilasyonu (OLV) için sol DLT kullanılıp, posterior prone aşamaya geçilirken DLT çıkarılarak spiral (zırhlı) tek lümenli tüple tüp değişimi (tube exchange) yapılması'
    ],
    clinicalRationale: 'Hem anterior torakolumboskopik/torakotomi aşamasında hem de posterior çok seviyeli enstrümantasyonda kesintisiz tcMEP, SSEP ve tetiklenmiş EMG takibini koruyabilmek için Propofol-Remifentanil TIVA mutlak standarttır. Hava yolunda ise anterior aşamada tek akciğer ventilasyonu (OLV) ve akciğer kollapsı sağlamak amacıyla çift lümenli tüp (DLT) tercih edilirken, 8-12 saatlik pozisyon değişimi ve prone aşamadaki yoğun baş-boyun ödemi/kinking riskine karşı posterior faza geçerken tüp değiştirici (tube exchanger) üzerinden spiralli tek lümenli endotrakeal tüpe geçilmesi ve postoperatif mekanik ventilasyon planlanması en güvenli stratejidir.',
    notes: 'KOMBİNE ANTERİOR-POSTERİOR CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) İKİ AŞAMALI / ÇİFT POZİSYON DEĞİŞİMİNDE HAVA YOLU, TÜP GÜVENLİĞİ VE RESÜSİTASYON MOLA PROTOKOLÜ — Anterior aşama (lateral dekübitüs veya supin) bitip göğüs tüpü/drenler bağlandıktan sonra hastanın posterior aşama için prone (yüzüstü) pozisyona çevrilmesi en kritik andır! Pozisyon verilirken endotrakeal tüpün yerinden çıkması (ekstübasyon) veya kinking yapması, damar yollarının kopması ve ani pozisyonel kardiyovasküler kollaps ölümcüldür. Pozisyon değişiminden önce cerrah ve anestezi ekibi arasında "Resüsitasyon Molası" (Resuscitation Time-Out) verilir; kan gazı, Hb, laktat, koagülasyon ve vücut sıcaklığı kontrol edilir. Eğer hasta hemodinamik olarak instabilse, asidoz veya hipotermi gelişmişse posterior aşama 2-5 gün sonraya ERTELENMELİDİR (Aşamalı / Staged Cerrahi kararı!). (2) KÜMÜLATİF MASİF KAN KAYBI, DİLÜSYONEL KOAGÜLOPATİ VE AGRESİF TXA + CELL SAVER PROTOKOLÜ — Hem ön hem arka kolonun açılması kümülatif kan kaybını 2000-5000 mL seviyesine taşır. Hipotermi ve masif kan transfüzyonu tüketim koagülopatisi ve dissemine intravasküler koagülasyona (DIC) yol açar. Yüksek doz TXA infüzyonu, çift hatlı Cell Saver, 1:1:1 dengeli masif transfüzyon, ROTEM/TEG takibi, iyonize kalsiyum ve fibrinojen konsantresi desteği hayat kurtarıcıdır. (3) ADAMKIEWICZ ARTERİ, ÇİFT SEVİYELİ İSKEMİ VE İONM MAP > 85-90 mmHg ZORUNLULUĞU — Anterior torakolomber aşamada segmental damarlar bağlanırken veya korpektomide alt torakal omuriliği besleyen Adamkiewicz arteri kritik risk altındadır; posterior aşamada ise traksiyon ve rotasyonla omurilik gerilir. İki aşamada da tcMEP ve SSEP kesintisiz izlenmeli; entübasyon sonrası KAS GEVŞETİCİ KESİNLİKLE VERİLMEMELİ (TOF 4/4), anestezi TIVA ile sürdürülmeli ve omurilik perfüzyonunu korumak için MAP KESİNLİKLE > 85-90 mmHg tutulmalıdır. (4) 8-12 SAATİ AŞAN CERRAHİDE YÜZ/LARİNKS ÖDEMİ, SIFIR OKÜLER BASI (POVL) VE ZORUNLU POSTOPERATİF MEKANİK VENTİLASYON — 8 ila 12 saat süren cerrahide masif sıvı resüsitasyonu ve uzun prone pozisyon baş, yüz, dil ve larinkste masif ödeme yol açar. İskemik Optik Nöropati (ION) ve Santral Retinal Arter Oklüzyonuna (CRAO) bağlı Postoperatif Görme Kaybı (POVL - kalıcı körlük) riski en üst düzeydedir; gözler ProneView aynasından sürekli kontrol edilir, hematokrit > %28 ve MAP > 75-80 mmHg tutulur. Hasta ameliyathanede KESİNLİKLE EKSTÜBE EDİLMEZ; entübe olarak Yoğun Bakım Ünitesine transfer edilir. (5) ÇİFT KAVİTE İNVAZYONU (TORAKS + RETROPERİTON + POSTERİOR OMURGA), PNÖMOTORAKS VE MULTİMODAL ANALJEZİ — Anterior torakofrenotomi diyafram insizyonu ve plevra açılması gerektirir; posterior proneda göğüs tüpü tıkanır veya bükülürse tansiyon pnömotoraks gelişebilir! Kapanışta göğüs tüpü fonksiyonu teyit edilmelidir. Nörolojik defisiti maskelememek ve hematom riskinden kaçınmak için nöroaksiyel bloklar yerine cerrahi infiltrasyon, ESP bloğu ve IV multimodal analjezi uygulanmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji / Nöroşirürji Taban Konsültasyonu: Ayrıntılı taban motor ve duyu haritalaması (L1-S1 dermatom ve miyotomları, refleksler, rektal tuşe ile sfinkter tonusu ve eyer tarzı duyu tespiti).',
      'Kardiyoloji Konsültasyonu: Eko (EF, kapak fonksiyonları, pulmoner hipertansiyon değerlendirmesi), koroner iskemi taraması ve 8-12 saatlik kombine çift cerrahi stresine kardiyovasküler tolerans.',
      'Göğüs Hastalıkları Konsültasyonu: Torakotomi ve diyafram insizyonu (torakofrenotomi) planlandığından spirometri (FVC, FEV1) ve arteriyel kan gazı; postoperatif solunum yetmezliği risk analizi.',
      'Girişimsel Radyoloji Konsültasyonu: Torakolomber spinal tümör veya metastaz olgularında cerrahi öncesi tümör besleyici damarların transarteriyel embolizasyonu (intraoperatif kanamayı %50 azaltır).',
      'Kan Bankası ve Transfüzyon Merkezi: En az 6-8 Ünite ES, 4-6 Ünite TDP ve 2 Aferez Trombosit rezervasyonu; kan bankası acil masif transfüzyon protokolü (MTP) aktivasyonuna hazır tutulmalıdır.'
    ],
    historyAndPhysical: [
      'Deformite Derecesi ve Solunum Kısıtlılığı: Kifoskolyoz Cobb açısı, toraks asimetrisi, akciğer kapasitesi ve efor dispnesi.',
      'Nörolojik Defisit: Preoperatif paraparezi, miyelopati veya kök zaafiyetinin yasal ve klinik belgelenmesi.',
      'Antikoagülan / Antiagregan Kullanımı: Klopidogrel, Tikagrelor, DOAK (Rivaroksaban/Apiksaban) ve LMWH kesilme zamanları.',
      'Zor Hava Yolu Taraması: Servikotorasik kısıtlılık, boyun hareketleri ve çift lümenli tüp (DLT) / fiberoptik entübasyon gereksinimi.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen düzeyi (bazal > 200 mg/dL).',
      'En az 6-8 Ünite ES, 4-6 Ünite TDP ve 2 Aferez Trombosit Cross-Match hazırlığı.',
      'Arteriyel Kan Gazı (Bazal PaO2, PaCO2 ve pH değerleri).',
      'Tüm Omurga Boy Grafileri (Spinosakral parametreler: SVA, Cobb açıları, pelvik insidans).',
      'Torakolomber İnce Kesit BT ve MRG: Korpus basısı, spinal kord bası derecesi, foramenler ve pedikül çapları.',
      'BT Anjiyografi (Torasik ve Abdominal Aort, Adamkiewicz arteri ve vena kava komşulukları).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (iskemi analizi), SpO2, EtCO2 ve Nazofaringeal/Özofageal Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Pozisyon değişikliklerinde hemodinamiği izlemek, MAP > 85-90 mmHg hedefini korumak, saatlik kan gazı, laktat, Hb/Hct, iyonize kalsiyum ve ROTEM takibi için ZORUNLUDUR.',
      'Santral Venöz Kateter (CVC): Üç lümenli santral kateter; vazopressör infüzyonları ve masif kanama santral erişimi için.',
      'İntraoperatif Nöromonitörizasyon (İONM) Sistemi:',
      '  - Bilateral Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP): Üst ve alt ekstremite kaslarından kesintisiz motor iletim takibi.',
      '  - Somatosensoriyel Uyarılmış Potansiyeller (SSEP): Posterior tibial ve median sinir uyarımı ile arka kord takibi.',
      '  - Serbest Çalışan (Free-run) ve Tetiklenmiş (Triggered) EMG: Posterior pedikül vidalarının ve köklerin mekanik uyarım takibi.',
      'Nöromusküler İleti Monitörizasyonu (TOF): Entübasyon sonrası KAS GEVŞETİCİ KESİNLİKLE VERİLMEZ; TOF 4/4 (%100) korunur.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı > 0.5-1.0 mL/kg/saat).',
      'Göğüs Tüpü Basınç ve Su Altı Drenaj Takibi: Prone aşamada toraks dreninin açıklığı sürekli izlenir.'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (14-16G) periferik intravenöz yol',
      'Santral Venöz Kateter (CVC) ve Santral Venöz Basınç (CVP)',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı İnfüzyon Hatları',
      'Çift Aspiratörlü Cell Saver (Kan Kurtarma Cihazı) steril hatta aktif'
    ],
    patientPosition: 'Çift Aşamalı Pozisyonlama: (1) Lateral Dekübitüs veya Supin (Anterior Faz), ardından (2) Prone (Posterior Faz)',
    patientPositionDetails: [
      'AŞAMA 1 (ANTERİOR FAZ): Lateral dekübitüs (torakotomi/torakoabdominal) veya supin (retroperitoneal ALIF/OLIF). Alttaki aksillaya aksiller rulo yerleştirilir; brakiyal pleksus basısı önlenir; bacaklar arasına yastık konur.',
      'POZİSYON DEĞİŞİMİ VE RESÜSİTASYON MOLASI: Anterior yara kapatılıp göğüs tüpü bağlandıktan sonra, hasta prone masaya (Jackson masası) çevrilmeden önce tüp tespiti kontrol edilir; kan gazı ve hemodinami dengelenir.',
      'AŞAMA 2 (POSTERİOR FAZ): Prone (Yüzüstü) Pozisyon Jackson omurga masasında. BATIN TAMAMEN BOŞLUKTA SARKITILIR (Batson epidural pleksus kanamasını önlemek için).',
      'SIFIR OKÜLER BASI: Baş ProneView aynalı kaskına yerleştirilir; her 15-30 dakikada bir gözlerin bası altında olmadığı kontrol edilir (POVL savunması).',
      'Kollar baş yanında "Superman" pozisyonunda (< 90° abdüksiyon); dizler ve peroneal sinir jel pedlerle desteklenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2-2.5 mg/kg) + Fentanil (3-4 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + kısa etkili kas gevşetici (Rokuronyum 0.6 mg/kg).',
      '  - Videolaringoskop veya Fiberoptik Bronkoskop ile atravmatik entübasyon.',
      '  - Anterior torasik yaklaşımda sol DLT veya bronşiyal bloker ile tek akciğer ventilasyonu sağlanır; prone dönüş öncesi spiral tüple tüp değişimi planlanabilir.',
      '  - Entübasyondan sonra KESİNLİKLE nöromusküler bloker tekrarlanmaz (kürarsız idame).',
      'İdame: TIVA Protokolü (Propofol 90-150 mcg/kg/dk + Remifentanil 0.1-0.3 mcg/kg/dk):',
      '  - İnhalasyon anesteziklerinden kaçınılır (< 0.3 MAC) veya hiç verilmez.',
      '  - Ketamin infüzyonu (0.1-0.2 mg/kg/saat) ile hemodinamik ve analjezik destek.',
      'Kan Koruma ve TXA Protokolü:',
      '  - İndüksiyonda Traneksamik Asit (20-30 mg/kg İV bolus), operasyon sonuna kadar 2-5 mg/kg/saat sürekli infüzyon.',
      '  - Cell Saver ile toplanan kanın yıkanarak geri verilmesi.',
      'Omurilik Perfüzyon Hedefleri:',
      '  - Adamkiewicz ve spinal kord beslenmesini korumak için operasyon boyunca MAP KESİNLİKLE > 85-90 mmHg tutulmalıdır (Noradrenalin desteği).',
      'İONM Alarm Protokolü:',
      '  - MEP/SSEP genliğinde > %50 düşüş olursa:',
      '    1. Cerraha derhal haber verilir; anterior kafes traksiyonu veya posterior redüksiyon gevşetilir.',
      '    2. MAP hızla > 90-95 mmHg seviyesine yükseltilir.',
      '    3. Hematokrit (> %28) ve vücut sıcaklığı kontrol edilir.',
      'Aşamalı Cerrahi Kararı:',
      '  - Anterior aşama bittiğinde şiddetli metabolik asidoz (pH < 7.25, baz açığı > -8), kontrolsüz koagülopati, kontrolsüz hipotermi (< 35.0°C) veya aşırı kan kaybı (> 3000 mL) varsa posterior aşama ertelenir; hasta entübe olarak Yoğun Bakıma alınır ve 3-5 gün sonra posterior seans yapılır.'
    ],
    airwayManagement: [
      'Anterior fazda göğüs boşluğuna giriliyorsa Tek Akciğer Ventilasyonu (OLV) için sol çift lümenli tüp (DLT) veya bronşiyal bloker kullanılır.',
      'DLT pozisyonu lateral pozisyon verildikten sonra fiberoptik bronkoskopi (FOB) ile doğrulanmalıdır.',
      'Prone pozisyona geçilirken tüp yer değiştirmesini engellemek için iki kişi başı nötral eksende sabit tutar.',
      'Kaf basıncı sürekli manometre ile 20-25 cmH2O seviyesinde izlenir.'
    ],
    criticalSurgicalStages: [
      '1. Anterior Faz Hazırlığı, Pozisyonlama ve Floroskopi ile Seviye Tespiti.',
      '2. Torakotomi, Torakoabdominal veya Retroperitoneal Yaklaşım ile Anterior Omurgaya Ulaşım.',
      '3. Segmental Damarların Kontrolü, Korpektomi ve Anterior Dekompresyon (Adamkiewicz ve büyük damar tehlikesi!).',
      '4. Anterior Kafes (Mesh / Expandable Cage) veya Yapısal Greft Yerleşimi ve Ön Kolon Restorasyonu.',
      '5. Anterior Hemostaz, Göğüs Tüpü / Retroperitoneal Drenaj ve Anterior Kapanış.',
      '6. RESÜSİTASYON MOLASI: Kan gazı, koagülasyon, sıcaklık ve hemodinami teyidi.',
      '7. Hastanın Prone Pozisyona Çevrilmesi (Jackson masası, batın boşta, sıfır oküler bası).',
      '8. Posterior Orta Hat Diseksiyonu, Çok Seviyeli Pedikül ve Pelvik (S2AI) Vidaların Gönderilmesi.',
      '9. Deformite Redüksiyonu, Osteotomiler (PSO/SPO), Rod Montajı ve Posterolateral Kemik Greftleme.',
      '10. Posterior Titiz Hemostaz, Valsalva (Kaçak testi), Çift Subfasial Dren ve Kapanış.'
    ],
    emergenceNotes: [
      'AMELİYATHANEDE KESİNLİKLE EKSTÜBE EDİLMEZ: 8-12 saat süren cerrahi, masif sıvı resüsitasyonu, diyafram insizyonu ve uzun süreli prone pozisyon nedeniyle belirgin baş, yüz ve havayolu ödemi gelişir.',
      'Hasta ameliyat bitiminde entübe, sedatize, ısıtılarak ve tam monitörizasyon altında Yoğun Bakım Ünitesine (YBÜ) transfer edilir.',
      'Ekstübasyon kararı YBÜ\'de ödemin gerilediği, pozitif kaf kaçak testi alındığı ve hemodinamik stabilite sağlandığı 24-48. saatlerde değerlendirilir.',
      'Acil Nörolojik Değerlendirme: YBÜ transferinde sedasyon hafifletilerek her iki bacakta ayak bileği ve başparmak motor hareketi (L4, L5, S1) teyit edilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Çift Kavite Multimodal Opioid Koruyucu Analjezi Protokolü:',
      '  - Hem torakotomi/laparotomi hem geniş posterior spinal kas diseksiyonu nedeniyle ameliyat sonrası ağrı en üst düzeydedir.',
      '  - Epidural Kateter KULLANILMAZ (Masif kanama sonrası epidural hematom riski ve saatlik nörolojik motor muayeneyi maskeleme tehlikesi nedeniyle kontrendikedir).',
      '  - Ultrason Eşliğinde İki Taraflı Erektör Spina Plan (ESP) Bloğu veya Cerrahi Alan Lokal Anestezik İnfiltrasyonu (Bupivakain %0.25).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - İV Hasta Kontrollü Analjezi (IV PCA): Fentanil veya Morfin bolus infüzyonu.',
      '  - Düşük doz IV Ketamin infüzyonu (0.05-0.1 mg/kg/saat) ile postoperatif opioid tüketiminin azaltılması.',
      '  - Kas Spazmları İçin: IV/Oral Tizanidin veya Baklofen.'
    ],
    prospectRecommendations: [
      'PROSPECT Kompleks Spinal Rekonstrüksiyon Kılavuzları: Epidural analjezinin nörolojik komplikasyon şüphesi yarattığı vakalarda cerrahi infiltrasyon, rejyonel fasyal plan blokları (ESP), sistemik parasetamol ve kontrollü IV PCA kombinasyonu altın standarttır; solunum fonksiyonlarını korur ve paralitik ileusu azaltır.'
    ],
    erasRecommendations: [
      'ERAS 360 Derece Omurga Rekonstrüksiyonu ve Deformite Kılavuzları:',
      '  - Cerrahi Yoğun Bakım İzlemi: İlk 48 saat YBÜ\'de invaziv arter, santral venöz basınç ve saatlik alt ekstremite nörolojik muayenesi (Akut Kord İskemisi ve Kauda Ekuina basısını erken yakalamak için).',
      '  - Göğüs Tüpü ve Dren Yönetimi: Göğüs tüpü saatlik kanama debisi ve hava kaçağı yönünden izlenir; subfasial posterior drenler 24 saatlik debi < 100 mL olana dek tutulur.',
      '  - Hedefe Yönelik Sıvı ve Kan Yönetimi: Aşırı kristaloid akciğer ödemi ve ARDS riskini artırır; hematokrit > %28 ve normotermi hedeflenir.',
      '  - Derin Ven Trombozu (DVT) Profilaksisi: Aralıklı Pnömotik Kompresyon (IPC) çorapları ameliyat başından itibaren sürdürülür; hemostaz ve dren çıkışı kontrol edilerek postoperatif 24-48. saatte profilaktik LMWH başlanır.',
      '  - Solunum Fizyoterapisi: Ekstübasyon sonrası agresif göğüs fizyoterapisi, teşvik edici spirometri (Triflo) ve erken oturma egzersizleri.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Spine Surgery: Combined Anterior and Posterior Instrumentation of the Thoracic and Lumbar Spine, pp. 554-560. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Debono, B., et al. (2021). Consensus statement for perioperative care in lumbar and cervical spine surgery: Enhanced Recovery After Surgery (ERAS®) Society recommendations. Spine, 46(11), 740-754.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Complex Combined Spine Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Scoliosis Research Society (SRS). Morbidity & Mortality Guidelines for Combined Anterior-Posterior Spinal Deformity Surgery.',
      'North American Spine Society (NASS). Evidence-Based Clinical Guidelines for Multidisciplinary Spine Care: High-Grade Spondylolisthesis and Adult Spinal Deformity.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement on Hemodynamic and Neuromonitoring Management in Complex 360-Degree Spine Reconstructions.',
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. Practice advisory for perioperative visual loss associated with spine surgery. Anesthesiology, 130(1), 12-30.',
      'Lenke, L. G., et al. (2010). Multicenter assessment of complications associated with adult spinal deformity surgery: Evaluation of 306 patients. Neurosurgery, 67(6), 1700-1707.'
    ]
  }
};
