import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior Torasik Omurga Cerrahisi: Torakotomi / VATS Yaklaşımı İle Torakal Diskektomi, Korpektomi ve Enstrümentasyon (T3-T12)
 * (Anterior Thoracic Spine Surgery: Thoracotomy / VATS for Thoracic Discectomy, Corpectomy, and Instrumentation)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Spine Surgery: Anterior Thoracic Spine Surgery, pp. 524-530),
 * Scoliosis Research Society (SRS), North American Spine Society (NASS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC),
 * European Association of Cardiothoracic Anaesthesiology (EACTA)
 * ve ERAS Society Kompleks Omurga Cerrahisi Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const anteriorThoracicSpineSurgery: ProcedureDefinition = {
  id: 'anterior-thoracic-spine-surgery',
  name: 'Anterior Torasik Omurga Cerrahisi: Torakotomi / VATS Yaklaşımı İle Torakal Diskektomi, Korpektomi ve Enstrümentasyon (T3-T12)',
  shortCode: 'TORASİK-ANT',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orta ve alt torakal omurgada (T3-T12 seviyeleri) yer alan kalsifiye disk hernileri, travmatik patlama (burst) kırıkları, tümöral kemik destrüksiyonları veya tüberküloz spondilit (Pott hastalığı) olgularında transplevral/retroplevral açık torakotomi veya Video Yardımlı Torakoskopik Cerrahi (VATS) ile uygulanan anterior omurga ameliyatıdır. Torasik omurilik dar bir spinal kanalda yer aldığından ve kan akımı kritik su ayırıcı (watershed) özellik gösterdiğinden, özellikle santral kalsifiye diskler posterior yoldan manipüle edilemez (arka yoldan retraksiyon kalıcı parapleji yaratır). Anterior yoldan akciğer söndürülerek (tek akciğer ventilasyonu) parietal plevra açılır, segmental interkostal damarlar kontrol edilir ve anterior mikrodiskektomi veya korpektomi ile dural kese dekomprese edilir. Açılan boşluk genişleyebilir titanyum kafes (expandable cage), kemik grefti ve anterolateral kilitli rod-vida veya plak sistemleri ile rekonstrükte edilir.',
  indications: [
    'Kalsifiye Torakal Disk Hernileri (Torasik Miyelopati): İlerleyici paraparezi, bacaklarda spastisite, yürüyüş ataksisi ve sfinkter disfonksiyonu yaratan, posterior yoldan çıkarılması felç riski taşıyan santral/parasantral sert kalsifiye diskler',
    'Torakal Vertebra Travmatik Kırıkları: T4-T11 seviyelerinde nörolojik defisit yaratan, spinal kanalın %50\'den fazlasını işgal eden anterior retropulsiyonlu instabil burst kırıkları',
    'Torasik Omurga Primer veya Metastatik Tümörleri: Akciğer, meme, prostat, böbrek kanseri metastazları veya plazmasitom/miyelom kaynaklı korpus destrüksiyonu ve patolojik kırıklar',
    'Torasik Tüberküloz Spondiliti (Pott Hastalığı) ve Spondilodiskit: İlaç tedavisine dirençli, anterior korpus çökmesi, kifoz deformitesi ve soğuk apse ile omurilik basısı yaratan olgular',
    'Şiddetli Torasik Kifoz ve Skolyoz Deformiteleri: Scheuermann kifozunda veya rijit skolyozda posterior cerrahi öncesi anterior gevşetme (anterior release) ve füzyon'
  ],
  averageDuration: '3.5 - 6.5 saat (Çift lümenli tüp [DLT] entübasyonu, bronkoskopik doğrulama ve lateral dekübitüs pozisyonlama: 45-60 dk; Torakotomi veya VATS portlarının açılması, akciğerin kollabe edilmesi ve prevertebral plevral diseksiyon: 45-60 dk; Segmental damarların bağlanması, torasik diskektomi veya korpektomi: 90-150 dk; Expandable cage ve anterolateral fiksasyon: 60-90 dk; Akciğerin yeniden havalandırılması [re-ekspansiyon], göğüs tüpü yerleştirilmesi ve katmanlı torakotomi kapanışı: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '400 - 1200 mL (Standart tek seviye torasik diskektomide 300-600 mL; çok seviyeli korpektomi, hipervasküler tümör rezeksiyonu ve travmalarda 1000-2000 mL\'yi aşabilir)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Torasik Aort, Vena Cava, Azigos Venleri ve İnterkostal Damarlar Komşuluğu)',
    crossMatchRequirement: 'En az 3-4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite Taze Donmuş Plazma (TDP) hazır bulundurulmalıdır; Cell Saver (Kan Kurtarma Cihazı) ameliyathanede steril hatta bağlanmalıdır',
    transfusionProbability: '%40 - %65',
    criticalBleedingSources: [
      'Aorta Thoracica (Sol taraflı torakotomilerde omurga korpuslarının hemen sol anterolateralinde seyreder; traksiyon veya vidalama perforasyonu masif katastrofik arteriyel kanama yaratır)',
      'Vena Azygos ve Vena Hemiazygos (Sağ ve sol prevertebral venöz ana kanallar)',
      'Segmental İnterkostal Arter ve Venler (Aortadan çıkan çiftler; korpektomi esnasında foramen girişinden kopması durumunda kemik deliğine geri kaçarak durdurulması güç kanama yaratır)',
      'Vena Cava Inferior / Superior (Sağ taraflı üst/alt torakal girişimlerde)',
      'Vertebra Korpusu Kansellöz Kemik İliği Kanamaları'
    ],
    hemostasisStrategies: [
      'Segmental damarların omurga korpusunun tam orta hattında, nöral foramenden uzak bir noktada hemoklips, cerrahi ligatür veya bipolar ile titizlikle bağlanması',
      'Kemik kanamalarında steril kemik mumu ve hemostatik ajanlar (FloSeal, Surgicel, Gelfoam)',
      'Aort adventisyasının spatül ve pamuk pedlerle nazikçe korunması',
      'Malignite veya enfeksiyon dışı olgularda Cell Saver kullanımı',
      'Geniş toraks drenajı (en az 1 veya 2 adet 28-32F göğüs tüpü)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (Sol Çift Lümenli Tüp / OLV) + TIVA (Propofol + Remifentanil) — İONM ve torakotomide ALTIN STANDARTTIR'
    ],
    alternative: [
      'Zor Hava Yolu veya Küçük Havayolu Olan Olgularda: Tek lümenli tüp içerisinden yönlendirilen tel kılavuzlu Bronşiyal Bloker (Arndt / Cohen bloker)'
    ],
    clinicalRationale: 'Torakotomi/VATS ile anterior torakal omurgaya erişmek için cerrahi taraf akciğerin selektif olarak kollabe edilmesi gerektiğinden bronkoskopik doğrulamalı Sol Çift Lümenli Tüp (Left DLT) veya bronşiyal bloker ile Tek Akciğer Ventilasyonu (OLV) zorunludur. Adamkiewicz arteri ligasyonu öncesi tcMEP/SSEP sinyallerini korumak için kürarsız Propofol + Remifentanil TIVA altın standart anestezi yöntemidir.',
    notes: 'ANTERİOR TORASİK OMURGA CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) TEK AKCİĞER VENTİLASYONU (OLV) VE DLT BRONKOSKOPİK TEYİDİ — Cerrahi görüşün sağlanması ve akciğer parankiminin ekartör hasarından korunması için operasyon tarafındaki akciğerin kollabe edilmesi ZORUNLUDUR. Sol DLT (Double Lumen Tube) tercih edilir; tüp pozisyonu supin pozisyonda fiberoptik bronkoskopi (FOB) ile doğrulanmalı, hasta LATERAL DEKÜBİTÜS pozisyonuna çevrildikten sonra tüpün yerinden oynamadığını teyit etmek için bronkoskopi KESİNLİKLE TEKRARLANMALIDIR! (2) ADAMKIEWICZ ARTERİ VE PARAPLEJİ RİSKİ (İONM & MAP > 85 mmHg) — Medulla spinalisin alt 2/3\'ünü besleyen majör radikülomedüller arter (Arteria Radicularis Magna / Adamkiewicz Arteri) %75 sol tarafta ve T8-L1 seviyeleri arasında çıkar. Segmental damarlar bağlanırken veya korpektomide bu arterin feda edilmesi spinal kord anterior sendromuna ve KALICI PARAPLEJİYE yol açar! Segmental ligasyon öncesinde ve sonrasında Transkraniyal MEP ve SSEP kesintisiz izlenmeli; mikrovasküler kollateral perfüzyonu korumak için ortalama arter basıncı (MAP) KESİNLİKLE 85-90 mmHg\'NİN ALTINA DÜŞÜRÜLMEMELİDİR. (3) LATERAL DEKÜBİTÜS FİZYOLOJİSİ VE BRAKİYAL PLEKSUS KORUMASI — Hasta sağlam taraf altta kalacak şekilde lateral dekübitüs pozisyonuna alınır. Altta kalan aksillanın apeksine DEĞİL, 2-3 parmak altına AKSİLLER RULO yerleştirilmelidir (aksillar rulo apeksine konursa brakiyal pleksus basısı kalıcı kol felci yaratır!). Alttaki kulağın, gözün ve alttaki bacakta peroneal sinirin bası görmediği kontrol edilmelidir. (4) BÜYÜK DAMAR KANAMASI VE HIZLI TRANSFÜZYON PROTOKOLÜ — Aort, azigos venleri ve interkostal damarlar omurga korpusuna yapışıktır. Cerrahi sahada bir interkostal arter foramen içine retraksiyon yaparsa dakikalar içinde 1-2 litre kan kaybı gelişebilir. Sol radiyal arteriyel hat, en az 2 geniş damar yolu, hızlı infüzyon pompası ve Cell Saver masada hazır olmalıdır. (5) POST-TORAKOTOMİ ŞİDDETLİ AĞRI VE SOLUNUM KORUMASI — Torakotomi en ağrılı cerrahilerden biridir; yetersiz analjezi yüzeyel solunuma, atelektaziye ve akut solunum yetmezliğine yol açar. Torasik Epidural Kateter (ameliyat öncesi veya postop), Paravertebral Blok (PVB) veya Erektör Spina Blok (ESPB) multimodal ağrı yönetiminin merkezinde yer almalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göğüs Cerrahisi Konsültasyonu: Torakotomi hattı, tek akciğer ventilasyonu planlaması, plevral yapışıklık riski (önceden geçirilmiş tüberküloz/pnömoni) ve göğüs tüpü takibi için multidisipliner eşgüdüm.',
      'Göğüs Hastalıkları Konsültasyonu: Tek akciğer ventilasyonunun tolere edilebilirliği açısından Solunum Fonksiyon Testleri (SFT: FEV1, FVC, DLCO değerleri; FEV1 > 1.5 L veya beklenen postop FEV1 > %40 olmalıdır) ve arteriyel kan gazı analizi.',
      'Nöroloji / Nöroşirürji Konsültasyonu: Torasik miyelopati tablosunun ayrıntılı değerlendirilmesi (alt ekstremite spastisitesi, Babinski/Klonus, duyu dermatom seviyesi, ataksi ve mesane kontrolü).',
      'Kardiyoloji Konsültasyonu: İleri yaş olgularda torakotomi ve lateral pozisyonun kardiyak fonksiyonlara etkisi; EKO (özellikle sağ ventrikül sistolik basıncı ve pulmoner hipertansiyon ekarte edilmelidir; pulmoner hipertansiyonda OLV ölümcül hipoksemi yaratabilir).',
      'Girişimsel Radyoloji Konsültasyonu: Hipervasküler omurga tümörlerinde veya Adamkiewicz arterinin orijin seviyesini belirlemek amacıyla preoperatif spinal anjiyografi ve tümör embolizasyonu.'
    ],
    historyAndPhysical: [
      'Sigara Öyküsü ve Kronik Akciğer Hastalığı: KOAH, amfizem, bronşektazi veya geçirilmiş plevrit varlığı (bronşiyal sekresyonlar ve atelektazi riski).',
      'Kord Basısı ve Motor Güç: Bacakların motor kuvveti (0-5/5 skalası) ve göğüs-karın duvarındaki hipoestezi dermatom sınırı (T4 meme başı, T10 göbek hizası).',
      'Zor Hava Yolu Taraması: Çift lümenli tüp (DLT) standart tüplere göre çok daha kalın (35-41 Fr) ve rijit olduğundan laringoskopi zorluğu, diş yapısı ve trakeal anatomik çaplar dikkatle incelenir.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı ve Koagülasyon Paneli: Hb, Hct, Trombosit, PT, aPTT, INR, Fibrinojen tam normal olmalıdır.',
      'En az 3-4 Ünite Eritrosit Süspansiyonu ve 2 Ünite TDP Cross-Match hazırlığı.',
      'Arteriyel Kan Gazı (Bazal PaO2, PaCO2 ve pH değerleri).',
      'Akciğer Grafisi ve Toraks BT: Trakea çapı, sol ana bronş lümen genişliği (DLT boyut seçimi için: kadınlarda genellikle 35-37 Fr, erkeklerde 37-39 Fr), plevral kalsifikasyonlar ve mediasten anatomisi.',
      'Spinal Torakal MRG: Kalsifiye disk boyutu, spinal kord miyelomalazi sinyali, dural kese basısı ve epidural tümör yayılımı.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Sürekli kan basıncı takibi, MAP > 85 mmHg hedefi ve sık kan gazı (özellikle OLV sırasında PaO2/PaCO2 ve laktat takibi) için zorunludur.',
      'Santral Venöz Kateter (CVC): Sağ internal juguler ven veya ultrason eşliğinde femoral venöz erişim (vazopressör ve hızlı sıvı/kan resüsitasyonu için).',
      'İntraoperatif Nöromonitörizasyon (İONM): Bilateral Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP) ve Somatosensoriyel Uyarılmış Potansiyeller (SSEP); segmental damar klempajı esnasında spinal kord iskemisini saptamak için kesintisiz kayıt.',
      'Nöromusküler İleti İzlemi (TOF): MEP takibi için ameliyat boyunca TOF oranı 4/4 tutulur; entübasyon sonrası kas gevşetici kullanılmaz.',
      'Fiberoptik Bronkoskopi (FOB): DLT yerleşiminin hem supin hem de lateral dekübitüs pozisyonunda bronşiyal kaf seviyesinde milimetrik doğrulanması.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar çıkışı > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı (14-16G) periferik intravenöz yol',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı Kan Hatları',
      'Cell Saver (Kan Kurtarma Cihazı) ameliyathanede hazır ve steril hatta bağlı'
    ],
    patientPosition: 'Lateral Dekübitüs Pozisyonu (Sağ veya Sol Taraf Üstte, Cerrahi Patolojinin Tarafına Göre)',
    patientPositionDetails: [
      'Aksiller Rulo (Axillary Roll): Altta kalan göğüs duvarına, aksilla apeksinin 2-3 parmak altına silikon rulo yerleştirilir; brakiyal pleksus ve aksiller damarlar kompresyondan korunur.',
      'Alttaki kulak ve göz küresi özenle kontrol edilir; sıfır orbital bası teyit edilir.',
      'Alttaki bacak 90° fleksiyonda, üstteki bacak düz tutulur; bacaklar arasına geniş yastık konur ve fibula başındaki peroneal sinir silikon pedlerle korunur.',
      'Ameliyat masası hafif fleksiyona (kırma) getirilerek interkostal aralık genişletilir; ancak aşırı kırmanın inferior vena cava basısı ve hipotansiyon yapabileceği unutulmamalıdır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve DLT Entübasyonu:',
      '  - Propofol (2-2.5 mg/kg) + Fentanil (3-4 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + kısa etkili kas gevşetici.',
      '  - Sol Çift Lümenli Tüp (Left DLT) laringoskopiyle yerleştirilir; bronşiyal kaf trakeayı geçince tüp 90° sola döndürülerek sol ana bronşa ilerletilir.',
      '  - FOB ile karina, sol ana bronş girişi ve bronşiyal kafın pozisyonu doğrulanır.',
      '  - Hasta lateral pozisyona çevrildikten sonra FOB ile tüp pozisyonu KESİNLİKLE YENİDEN KONTROL EDİLİR.',
      'Tek Akciğer Ventilasyonu (OLV) Stratejisi:',
      '  - Tidal hacim: 4-6 mL/kg (bağımlı akciğer için koruyucu ventilasyon).',
      '  - PEEP: 5-8 cmH2O (atelektaziyi önlemek için).',
      '  - Hipoksemi gelişirse: Cerrahi sahadaki sönük akciğere 2-5 cmH2O CPAP uygulanması veya aralıklı iki akciğer ventilasyonuna dönülmesi.',
      'İdame: TIVA Protokolü (Propofol 80-140 mcg/kg/dk + Remifentanil 0.1-0.25 mcg/kg/dk). İONM sinyallerini korumak için volatil anesteziklerden kaçınılır.',
      'Adamkiewicz ve Spinal Kord Perfüzyonu:',
      '  - Segmental interkostal arterler klemplenirken tcMEP ve SSEP izlenir; sinyalde düşüş olursa klempler derhal açılır.',
      '  - Ameliyat boyunca MAP > 85-90 mmHg seviyesinde tutulur (Noradrenalin infüzyonu desteğiyle).'
    ],
    airwayManagement: [
      'Sol Çift Lümenli Endotrakeal Tüp (Left DLT: kadınlarda 35-37 Fr, erkeklerde 37-39 Fr).',
      'Bronkoskopi cihazı ameliyathane içinde hazır ve çalışır durumda tutulur.',
      'Ameliyat sonunda DLT genellikle tek lümenli standart endotrakeal tüp ile değiştirilir (ekstübe edilmeyecekse) veya hasta kriterleri karşılıyorsa pürüzsüz uyanma ile doğrudan ekstübe edilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama, DLT Bronkoskopik Doğrulaması ve Floroskopi ile Hedef Kosta Seviyesinin İşaretlenmesi.',
      '2. Posterolateral Torakotomi veya VATS Portlarının Açılması ve Tek Akciğer Ventilasyonunun (OLV) Başlatılması.',
      '3. Parietal Plevranın Açılması ve Omurga Ön-Yan Yüzündeki Segmental İnterkostal Damarların Diseksiyonu.',
      '4. Segmental Damarların Vertebra Ortasında Titizlikle Klipslenip Kesilmesi (Adamkiewicz arteri izlemi).',
      '5. Kalsifiye Torakal Diskin veya Tümörlü Korpusun Mikrocerrahi Eksizyonu (Dural kesenin ve omuriliğin dekompresyonu).',
      '6. Rekonstrüksiyon: Expandable Kafes (Cage) Yerleştirilmesi ve Anterolateral Titanyum Plak-Vida / Çift Rod Tespiti.',
      '7. Hemostaz Kontrolü, Valsalva Manevrası (Dural kaçak kontrolü), Göğüs Tüplerinin (28-32F) Yerleştirilmesi.',
      '8. Akciğerin Yeniden Havalandırılması (Recruitment Manevrası: 30-40 cmH2O ile atelektazilerin açılması) ve Torakotominin Katmanlı Kapatılması.'
    ],
    emergenceNotes: [
      'AKCİĞER RE-EKSPANSİYONU VE KONTROLLÜ EKSTÜBASYON: Ameliyat sonunda cerrah göğüs tüpünü bağlarken akciğere nazik recruitment manevrası yapılarak kollabe akciğer tamamen açılır ve hava kaçağı kontrol edilir.',
      'DLT Değişimi veya Doğrudan Ekstübasyon: Hasta normotermik, hemodinamik olarak stabil, kan gazı normal ve bilinci açıksa pürüzsüz ekstübe edilebilir. Uzun süren ve masif kanamalı vakalarda DLT tüp değiştirici (airway exchange catheter) üzerinden standart tek lümenli tüple değiştirilerek hasta entübe YBÜ\'ye devredilir.',
      'Öksürmesiz Uyanma: Torakotomi dikişlerini ve interkostal hemostazı korumak için IV Lidokain (1.5 mg/kg) uygulanır.',
      'Acil Nörolojik Muayene: Hasta uyanır uyanmaz her iki bacakta ayak bileği ve başparmak motor hareketi teyit edilmelidir (Adamkiewicz iskemisi ve parapleji ekarte edilmelidir!).'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Agresif Torakotomi Analjezi Protokolü:',
      '  - Torasik Epidural Analjezi (TEA: Bupivakain %0.1 + Fentanil 2 mcg/mL infüzyonu) veya Ultrason Eşliğinde Torasik Paravertebral Blok (PVB) / Erektör Spina Plan Bloğu (ESPB): Solunum fonksiyonlarını korumada en etkili yöntemdir.',
      '  - Cerrahi Kapanış Sırasında İnterkostal Sinir Blokajı (Cerrah tarafından 3 seviyeye Bupivakain %0.5 enjeksiyonu).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - IV / Oral NSAİİ (İbuprofen veya Deksketoprofen): Renal fonksiyon ve hemostaz teyidi sonrası.',
      '  - Kurtarma İntravenöz Hasta Kontrollü Analjezi (IV PCA): Morfin veya Fentanil.'
    ],
    prospectRecommendations: [
      'Torakotomi sonrası erken mobilizasyon ve atelektazinin önlenmesi için bölgesel anestezi teknikleri (torasik epidural veya paravertebral blok) birinci basamak analjezi standardıdır; sistemik opioid tüketimini azaltarak solunum depresyonunu engeller.'
    ],
    erasRecommendations: [
      'ERAS Torasik ve Kompleks Omurga Cerrahisi Kılavuzları:',
      '  - Yoğun Bakım Takibi: İlk 24 saat YBÜ\'de sürekli arter basıncı, göğüs tüpü drenajı (saatlik kanama takibi) ve saatlik alt ekstremite motor muayenesi.',
      '  - Göğüs Fizyoterapisi ve Triflo: Ameliyattan hemen sonra saat başı teşvik edici spirometre (triflo) kullanımı ve derin nefes egzersizleri.',
      '  - Göğüs Tüpü Takibi: Aktif hava kaçağı olmadığında ve 24 saatlik drenaj < 150-200 mL olduğunda göğüs tüpleri çekilir.',
      '  - Erken Mobilizasyon: Hemodinamisi stabil olan hastalar postop 1. günde yatak dışına çıkarılır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Spine Surgery: Anterior Thoracic Spine Surgery, pp. 524-530. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Debono, B., et al. (2021). Consensus statement for perioperative care in lumbar and cervical spine surgery: Enhanced Recovery After Surgery (ERAS®) Society recommendations. Spine, 46(11), 740-754.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management After Thoracotomy and Complex Thoracic Spine Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Bendo, A. A., et al. (2007). Anesthetic considerations for anterior thoracic and lumbar spinal surgery. Anesthesiology Clinics, 25(3), 519-534.',
      'Anand, N., & Regan, J. J. (2002). Video-assisted thoracoscopic surgery for thoracic disc disease: classification and outcome. Journal of Neurosurgery: Spine, 96(2), 167-172.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Guidelines on Perioperative Spinal Cord Ischemia Monitoring and Hemodynamic Management.',
      'European Association of Cardiothoracic Anaesthesiology (EACTA). Practical Guide for One-Lung Ventilation and Thoracotomy Pain Management.'
    ]
  }
};
