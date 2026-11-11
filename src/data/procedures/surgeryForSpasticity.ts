import { ProcedureDefinition } from '../../types/procedures';

/**
 * Spastisite Cerrahisi: Selektif Dorsal Rizotomi (SDR), DREZ Lezyonlama ve Periferik Nörotomi
 * (Surgery for Spasticity: Selective Dorsal Rhizotomy, DREZotomy, and Peripheral Neurotomy)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: 
 * Surgery for Spasticity, pp. 498-502), American Academy for Cerebral Palsy and Developmental Medicine (AACPDM),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC),
 * European Paediatric Neurology Society (EPNS) ve ERAS Society Nöroşirürji Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const surgeryForSpasticity: ProcedureDefinition = {
  id: 'surgery-for-spasticity',
  name: 'Spastisite Cerrahisi: Selektif Dorsal Rizotomi (SDR), DREZ Lezyonlama ve Periferik Nörotomi',
  shortCode: 'SPASTİSİTE-SDR',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Pediatrik Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal ve fizik tedavi yöntemlerine dirençli şiddetli spastisite olgularında anormal hiperaktif kas tonusunu ve refleks arkını kalıcı olarak hafifletmek amacıyla uygulanan cerrahi nöromodülasyon ve ablasyon prosedürleridir. En yaygın uygulanan yöntem Selektif Dorsal Rizotomi (SDR / Selective Dorsal Rhizotomy)\'dir: Lomber laminotomi/laminoplasti (L1-L2 seviyesinde konus medullaris veya L2-S1 seviyelerinde) sonrası kauda ekuina ve lumbosakral sinir kökleri (L2-S2) cerrahi sahaya taşınır. Ventral motor kökler dorsal duyu köklerinden mikronöroşirürjikal olarak ayrılır; ardından dorsal kökçükler (rootlets) tek tek elektrofizyolojik stimülasyonla (İONM / EMG) uyarılır. Anormal, yaygın veya klonik deşarj gösteren kökçükler selektif olarak kesilerek (genellikle her seviyedeki kökçüklerin %30-50\'si) kas iğciği kökenli kontrolsüz afferent refleks arkı kırılır. Diğer yöntemler arasında fokal kontraktür ve ağrılı spastisitede DREZ Lezyonlama (Dorsal Root Entry Zone) ve Seçici Periferik Parsiyel Nörotomiler (obturator, tibial, muskulokutanöz nörotomi) yer alır.',
  indications: [
    'Serebral Palsi (Spastik Dipleji ve Seçilmiş Spastik Kuadripleji): Ambulasyon potansiyeli olan (GMFCS Seviye II ve III) veya bakım konforunu artırmak hedeflenen (GMFCS IV-V), oral antispastiklere ve botulinum toksinine dirençli 3-18 yaş arası pediatrik ve genç erişkin hastalar (SDR en temel endikasyonudur)',
    'Spinal Kord Yaralanması veya Multipl Skleroz (MS) Sekeli Şiddetli Spastisite: Alt ekstremitelerde makaslama yürüyüşü, fleksör veya ekstansör spazmlar',
    'Ağrılı ve Spastik Üst/Alt Ekstremite Deformiteleri: Brakiyal pleksus avülsiyonu veya spinal travma zemininde gelişen kontrolsüz tonus artışı (DREZ Lezyonlama endikasyonu)',
    'İzole Kas Grubu Spastisitesi: Kalça adduktor spazmı (makaslama), ekinovarus ayak deformitesi veya dirsek fleksiyon kontraktürlerinde seçici parsiyel periferik nörotomi',
    'Ortopedik Cerrahi Öncesi veya Eşzamanlı Tonus Dengeleme: Tendon uzatma ve kemik osteotomileri öncesinde spastisitenin kalıcı olarak giderilmesi'
  ],
  averageDuration: '3.0 - 5.5 saat (Prone pozisyonlama, silikon rulo desteği ve floroskopik seviye belirleme: 45-60 dk; L1-L2 tek seviye laminoplasti veya çok seviyeli laminotomi: 45-60 dk; Dural açılış, mikronöroşirürjikal kök diseksiyonu ve çok kanallı İONM elektrofizyolojik kökçük stimülasyonu / selektif transeksiyon: 90-150 dk; Su geçirmez dural tamir, Valsalva testi ve tabakalı laminoplasti kapanışı: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 300 mL (Küçük pediatrik olgularda 80-150 mL [ancak vücut ağırlığına oranla dolaşan kan hacminin %10-20\'sini bulabilir]; erişkin SDR veya DREZ olgularında 150-350 mL)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk (Pediatrik Olgularda Dolaşan Kan Hacmi Düşüktür; Mililitrik Kan Kaybı Hızla Hipovolemi Yaratabilir)',
    crossMatchRequirement: '1-2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalıdır; küçük çocuklarda (< 20 kg) taze kan ve gereğinde Taze Donmuş Plazma (TDP) planlanmalıdır',
    transfusionProbability: '%15 - %35 (Pediatrik düşük kilolu olgularda %30-45)',
    criticalBleedingSources: [
      'Epidural Venöz Pleksus (Batson pleksusu — lamina açılırken ve dural marjinler serbestleştirilirken yırtılma riski)',
      'Spinal Kök Besleyici Radiküler Arterler (A. radicularis magna - Adamkiewicz arteri ve radikülomedüller vasküler dallar kök diseksiyonunda titizlikle korunmalıdır)',
      'Subaraknoid Kauda Ekuina Mikrovasküler Yatağı',
      'Laminoplasti Kemik Kenarları ve Paravertebral Kas Yatağı'
    ],
    hemostasisStrategies: [
      'Mikronöroşirürjikal bipolar koagülasyon (dorsal kökçükler üzerinde düşük akımlı mikro-bipolar forseps kullanılır)',
      'Lomber epidural sahada hemostatik matriks ajanları (FloSeal, Surgicel, pamuk basısı)',
      'Kemik kanamalarında steril kemik mumu uygulaması',
      'Prone pozisyonda batın basısının tamamen kaldırılarak inferior vena cava ve epidural venöz basıncın düşürülmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) — İntraoperatif nörofizyolojik kök stimülasyonu (EMG) için MUTLAK ALTIN STANDARTTIR',
      'Düşük Doz İnhalasyon Anestezisi (< 0.5 MAC Sevofluran/İzofluran) + Opioid İnfüzyonu: Kökçük uyarımı fazında MAC düzeyi < 0.3 seviyesine çekilerek TIVA ağırlıklı idameye dönülür'
    ],
    alternative: [
      'İzole Periferik Nörotomiler İçin: Genel Anestezi veya Seçilmiş Erişkinlerde Periferik Sinir Blokları + Sedasyon (ancak motor stimülasyon gerektiğinde kas gevşetici verilmez)'
    ],
    notes: 'SPASTİSİTE CERRAHİSİNDE (SDR) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) SIFIR NÖROMUSKÜLER BLOKAJ (KAS GEVŞETİCİ YASAKTIR!) — SDR\'nin başarısı, L2-S2 dorsal kökçüklerine tek tek 0.1-1.0 mA elektrik akımı verildiğinde alt ekstremite kaslarında (adduktor, kuadriseps, tibialis anterior, gastroknemius) ve anal sfinkterde ortaya çıkan EMG refleks yanıtlarının kaydedilmesine bağlıdır. Entübasyonda ultra-kısa etkili gevşetici kullanılsa dahi cerrahi diseksiyon başlamadan önce TOF oranı 4/4 (%100) olmalı ve operasyon boyunca KESİNLİKLE kas gevşetici eklenmemelidir! (2) PRONE POZİSYONDA KONTRAKTÜRLER VE BASI YARASI KORUMASI — Serebral palsili çocuklarda kalça/diz fleksiyon kontraktürleri, ekinovarus deformitesi ve skolyoz sıktır. Hastayı düz prone yatırmak eklemleri zorlar ve sinir basılarına yol açar. Kontraktürlü eklemler altına özel silikon yastıklar yerleştirilmeli, göğüs ve pelvis ruloları ile karın boşlukta asılı tutulmalı, gözler/burun sıfır basıda korunmalıdır. (3) PEDİATRİK HİPOTERMİ VE AÇIK BOS MARUZİYETİ — Saatler süren laminektomi ve geniş dural açılışta açık subaraknoid mesafeden sürekli soğuk irrigasyon yapılması hipotermiyi hızla tetikler. Vücut sıcaklığı < 35.5°C olduğunda EMG refleks eşikleri bozulur, pıhtılaşma çöker. Aktif hava ısıtıcı battaniye (Bair Hugger), sıvı ısıtıcıları ve oda sıcaklığının 24°C üzerinde tutulması zorunludur. (4) İNTRAOPERATİF SFİNKTER KORUMASI (S2-S4 KÖKLERİ) — S1 ve özellikle S2-S4 dorsal kökçükleri uyarılırken anal sfinkter EMG aktivitesi izlenir. Sfinkter liflerinin yanlışlıkla kesilmesi kalıcı üriner inkontinans ve fekal inkontinans ile sonuçlanır; anestezi uzmanı sfinkter EMG yanıtlarını cerrah ve nörofizyolog ile teyit etmelidir. (5) POSTOPERATİF ŞİDDETLİ SPAZM VE AĞRI YÖNETİMİ — Dorsal duyusal deafferentasyon ve laminoplasti ameliyat sonrasında şiddetli nosiseptif ağrıya ve paradoksal kas spazmlarına yol açar. Epidural kateter, kaudal blok veya multimodal analjezi (IV Parasetamol, düzenli Diazepam/Baklofen ve titre opioidler) uyanma odasından itibaren kesintisiz uygulanmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Pediatrik Nöroloji / Gelişimsel Pediyatri Konsültasyonu: Serebral palsi tipi (spastik dipleji vs kuadripleji), GMFCS (Kaba Motor Fonksiyon Sınıflama Sistemi) seviyesi, eşlik eden epilepsi nöbetleri ve kognitif durum değerlendirilir.',
      'Fizik Tedavi ve Rehabilitasyon (FTR) Konsültasyonu: Kas tonusunun dağılımı (Modifiye Ashworth Skalası), alt ekstremite eklem hareket açıklıkları (ROM), sabit kontraktürler ve cerrahi sonrası hedeflenen fonksiyonel motor kapasite.',
      'Ortopedi Konsültasyonu: Kalça eklemi çıkık/sublüksasyon riski (Reimers migrasyon indeksi — SDR öncesi kalça stabilitesi kontrol edilmelidir), skolyoz derecesi ve planlanan ortopedik prosedürler.',
      'Çocuk Cerrahisi / Üroloji Konsültasyonu: Bazal mesane ve bağırsak fonksiyonları (inkontinans, nörojenik mesane öyküsü); postoperatif sfinkter fonksiyonunun karşılaştırılması için esastır.',
      'Göğüs Hastalıkları Konsültasyonu: Şiddetli spastik kuadriplejide kronik mikrogizli aspirasyonlar, restriktif akciğer hastalığı, kifoskolyoz ve zayıf öksürük refleksi nedeniyle pulmoner rezerv tespiti.'
    ],
    historyAndPhysical: [
      'Ayrıntılı Motor ve Duyusal Taban Muayenesi: Kalça fleksörleri, adduktorlar, kuadriseps, hamstringler, tibialis anterior ve gastroknemius kas kuvvetleri ve bazal spastisite skorları ayrıntılı kaydedilir.',
      'Hava Yolu ve Servikal Anatomi: Spastik serebral palsili çocuklarda mikronati, psödobulber palsi, tükürük yutma güçlüğü (drooling), gastroözofageal reflü (GÖRH) ve zor laringoskopi olasılığı değerlendirilir.',
      'Kullanılan Antispastik ve Antiepileptik İlaçlar: Oral Baklofen, Tizanidin, Diazepam, Dantrolen ve antiepileptik ilaçlar; ameliyat sabahı ilaç dozlarının devamı.',
      'Vücut Ağırlığı ve Beslenme Durumu: Kronik malnütrisyon, düşük subkutan yağ dokusu ve bası yarası yatkınlığı.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı; pediatrik hematokrit sınırları ve bazal anemi durumu).',
      'Koagülasyon Paneli (PT, aPTT, INR, Fibrinojen).',
      'Serum Elektrolitleri, BUN, Kreatinin ve Kan Şekeri takibi.',
      'Kan Grubu, Antikor Tarama ve 1-2 Ünite Eritrosit Süspansiyonu Cross-Match hazırlığı.',
      'Lumbosakral ve Tüm Omurga MRG: Konus medullarisin seviyesi (L1-L2 hizasında mı, gergin omurilik [tethered cord] var mı?), spinal kanal çapı ve kemik anatomi doğrulanır.',
      'Kalça Grafileri (Pelvis AP grafisi — kalça subluksasyonu varlığı).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 ve Sıcaklık.',
      'Sürekli Çift Sıcaklık Probu (Özofagus ve Rektal/Mesane): Uzun prone pozisyonda açık BOS temasında derin hipotermiyi (> 36.0°C hedef) önlemek için kesintisiz takip.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Pediatrik olgularda sürekli hemodinamik stabilite, kan gazı, baz açığı ve hemoglobin takibi için zorunludur.',
      'Santral Venöz Erişim (CVC): Düşük kilolu (< 15 kg) çocuklarda, santral sıvı/inotrop yönetimi ve santral venöz basınç takibi.',
      'ÇOK KANALLI İNTRAOPERATİF ELEKTROMİYOGRAFİ (İONM / EMG):',
      '  - Bilateral Adduktor longus (L2-L3)',
      '  - Bilateral Quadriceps femoris (L3-L4)',
      '  - Bilateral Tibialis anterior (L4-L5)',
      '  - Bilateral Gastrocnemius / Soleus (L5-S1)',
      '  - Bilateral Hamstring kasları (L5-S2)',
      '  - Eksternal Anal Sfinkter EMG (S2-S4 pudendal kök koruması)',
      'Nöromusküler İleti Monitörizasyonu (TOF): Kök uyarım fazında TOF oranı %100 (4/4 seğirme) olmalıdır; kas gevşeticinin sıfırlandığı kanıtlanmalıdır.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı > 1.0 mL/kg/saat hedefi).'
    ],
    vascularAccess: [
      'En az 2 adet geniş güvenli periferik intravenöz yol (üst ekstremitelerde)',
      'İnvaziv radiyal arter kanülü (ultrason eşliğinde)',
      'Küçük çocuklarda santral venöz kateter (sağ internal juguler ven)'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon, Kontraktürlü Eklem Destekleri ve Karın Serbest Asılı',
    patientPositionDetails: [
      'GÖĞÜS VE PELVİS SİLİKON RULOLARI: Abdomen tamamen serbest bırakılır; intraabdominal basınç artışı Vena Cava Inferior\'a bası yaparak Batson epidural pleksus kanamasını tetiklememelidir.',
      'Kontraktürlü Eklem Adaptasyonu: Fleksiyon kontraktürü olan kalça ve dizlerin altına anatomik açıyı koruyan yumuşak jel destekler konur; eklemler zorla düzleştirilmez.',
      'Yüz, Gözler ve Kafa Koruması: Baş ProneView koruyucu kask veya at nalı jel desteğe alınır; göz kürelerine, buruna ve dudaklara sıfır bası teyit edilir.',
      'Kollar vücut yanında nötral pozisyonda desteklenir; dirseklerde ulnar sinir silikon pedlerle korunur.',
      'Ayaklar: Ekinovarus deformitesi olan ayak bilekleri desteklenir, ayak parmaklarının masaya basması önlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2.5-3.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk). Entübasyonda yalnızca gerekirse kısa etkili Rokuronyum (0.3 mg/kg) veya Süksinilkolin uygulanabilir; cerrahi başlamadan önce gevşeticinin etkisi tamamen kalkmış olmalıdır.',
      'İdame: TIVA Protokolü (Propofol 100-160 mcg/kg/dk + Remifentanil 0.1-0.3 mcg/kg/dk). Düşük konsantrasyonda Desfluran/Sevofluran (< 0.5 MAC) eklenebilir; ancak kökçük stimülasyonu esnasında MAC < 0.3\'e çekilir.',
      'Elektrofizyolojik Kökçük Uyarım Fazı (SDR Testing Protocol):',
      '  - Cerrahi ekip mikroskop altında L2-S2 köklerini ventral (motor) ve dorsal (duyu) olarak ayırır.',
      '  - Her dorsal kök 3-7 adet ince kökçüğe (rootlets) bölünür ve bipolar elektrotla 0.1-1.0 mA tekil/tetanik akımla uyarılır.',
      '  - Normal Cevap: Yalnızca ilgili myotomda kısa süreli tek bir seğirme.',
      '  - Anormal Spastik Cevap (Derece 1-4): Sürekli klonik/tonik deşarj, komşu myotomlara yayılım veya kontralateral bacak kaslarına yayılım.',
      '  - Karar: Anormal cevap veren kökçükler bipolar ile koagüle edilip kesilir (her seviyede ortalama %30-50 kökçük transeksiyonu).',
      'Anal Sfinkter (S2-S4) Koruması:',
      '  - S1 ve S2 köklerine gelindiğinde anal sfinkter EMG\'si sürekli dinlenir; sfinkter yanıtı veren kökçükler KESİNLİKLE KESİLMEZ (inkontinans önleme).',
      'Normotermi ve Sıvı Yönetimi:',
      '  - Sıvı ısıtıcıları, konvektif hava battaniyeleri ve 37°C ısıtılmış Ringer Laktat/Plazma-Lyte infüzyonu (4-6 mL/kg/saat). Açık subaraknoid irrigasyon sıvıları 37.5°C\'de ısıtılmalıdır.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp ile oral entübasyon.',
      'Pediatrik hastalarda tüp seviyesi oskültasyonla iki taraflı doğrulanır ve sağlam flasterlenir; prone pozisyonda baş hareketleriyle tüpün ana bronşa kayması (endobronşiyal entübasyon) EtCO2 ve SpO2 ile yakından izlenir.',
      'Kaf basıncı sürekli manometre ile 20 cmH2O düzeyinde kontrol edilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama ve Floroskopi Eşliğinde L1-L2 Seviyesinin Tespiti.',
      '2. Laminoplasti / Laminotomi: Kemik flebin korunarak kaldırılması ve epidural hemostaz.',
      '3. Dural Açılış ve Konus Medullaris / Kauda Ekuina İntradural Diseksiyonu.',
      '4. Ventral (Motor) ve Dorsal (Duyu) Köklerin Mikronöroşirürjikal Olarak Ayrılması.',
      '5. L2-S2 Dorsal Kökçüklerinin Çok Kanallı EMG Eşliğinde Elektrofizyolojik Testlemesi ve Selektif Transeksiyonu.',
      '6. Pudendal ve Anal Sfinkter (S2-S4) Liflerinin Doğrulanıp Korunması.',
      '7. Su Geçirmez Dural Kapama ve Valsalva Manevrası (25-30 cmH2O ile BOS kaçağı kontrolü).',
      '8. Laminoplasti Kemik Rekonstrüksiyonu ve Katmanlı Kapanış.'
    ],
    emergenceNotes: [
      'Öksürme ve Ikınmasız Pürüzsüz Uyanma: Ameliyat sonunda ıkınma dural tamir hattında dikiş açılmasına, BOS fistülüne ve psödomeningosele yol açar. IV Lidokain (1.5 mg/kg) ile hava yolu refleksleri sakinleştirilir.',
      'Akut Erken Nörolojik Muayene: Ekstremitelerde istemli ayak bileği ve parmak hareketleri doğrulanır; tam flask felç (over-resection) veya sfinkter tonus kaybı kontrol edilir.',
      'Hipotermi ve Titreme Kontrolü: Hasta derlenme odasına normotermik (> 36.5°C) teslim edilmelidir; titreme cerrahi yara gerilimini ve metabolik yükü artırır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - Cerrahi Kapanış Sırasında Epidural Kateter veya Kaudal Blok / İnfiltrasyon (%0.2-0.25 Ropivakain): Postoperatif ilk 24-48 saatlik şiddetli radiküler/kemik ağrısını keser.',
      '  - Düzenli IV Parasetamol (15 mg/kg, 6 saatte bir infüzyon).',
      '  - IV / Oral NSAİİ (İbuprofen 10 mg/kg veya Ketorolak): Cerrahi hemostaz sağlandıktan sonra.',
      '  - Postoperatif Kas Spazmları İçin: Oral/IV Diazepam (0.05-0.1 mg/kg) veya Baklofen (deafferentasyona bağlı rebound hiperrefleksik spazmları çözer).',
      '  - Şiddetli Ağrıda Hasta Kontrollü Analjezi (PCA) / Hemşire Kontrollü Analjezi: Düşük doz Morfin veya Fentanil infüzyonu.'
    ],
    prospectRecommendations: [
      'Pediatrik ve erişkin spinal nöroşirürjide preemptif lokal anestezik uygulaması, epidural analjezi ve parasetamol bazlı multimodal protokoller opioid tüketimini, sedasyonu ve solunum depresyonunu minimize eder.'
    ],
    erasRecommendations: [
      'ERAS Pediatrik ve Fonksiyonel Nöroşirürji Rehberi:',
      '  - Düz Sırtüstü (Supin) Yatak İstirahati: Dural dikiş hattını korumak ve BOS fistülünü engellemek için postoperatif ilk 24-48 saat hasta yatakta düz yatırılır (baş elevasyonu < 15-20°).',
      '  - Erken Sfinkter Takibi: İdrar retansiyonu veya inkontinans varlığı izlenir; gerekirse mesane sondası 48 saat tutulur.',
      '  - Yoğun Postoperatif Fizyoterapi Programı: 48-72. saatten itibaren agresif güçlendirme ve yeniden yürüyüş eğitimi başlatılır (spastisite azaldığında alttaki gizli kas güçsüzlüğü belirginleşir; antigravite kaslarının yeniden eğitilmesi şarttır).',
      '  - Enfeksiyon ve Yara Takibi: İnsizyon yerinde BOS sızıntısı, şişlik (psödomeningosel) veya kızarıklık takibi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Surgery for Spasticity, pp. 498-502. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Pediatric and Functional Neurosurgery: Consensus Guidelines. Journal of Neurosurgery: Pediatrics.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Pediatric Spine Surgery and Laminectomy. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Peacock, W. J., & Staudt, L. A. (1991). Selective posterior rhizotomy: indications, surgical technique, and results. Child\'s Nervous System, 7(4), 182-188.',
      'Farmer, J. P., et al. (2006). Selective dorsal rhizotomy in the treatment of spasticity in cerebral palsy. Pediatric Neurosurgery, 42(5), 325-334.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Intraoperative Neurophysiological Monitoring Considerations in Selective Dorsal Rhizotomy.',
      'Tedroff, K., et al. (2015). Long-term effects of selective dorsal rhizotomy on gross motor function in children with spastic diplegia. Developmental Medicine & Child Neurology, 57(8), 754-759.'
    ]
  }
};
