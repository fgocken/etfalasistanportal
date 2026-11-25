import { ProcedureDefinition } from '../../types/procedures';

/**
 * Trabekülektomi: Korunan Skleral Flep ve Antimetabolit (Mitomisin C / 5-FU) Eşliğinde Glokom Filtrasyon Cerrahisi
 * (Trabeculectomy / Guarded Filtration Surgery with MMC / 5-FU)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth (2012),
 * AAO PPP: Primary Open-Angle Glaucoma, EGS 5th Ed., ASA OR Fire Advisory (2013), Gan et al. 4th PONV Consensus (2020).
 */
export const trabeculectomy: ProcedureDefinition = {
  id: 'trabeculectomy',
  name: 'Trabekülektomi: Korunan Skleral Flep ve Antimetabolit (MMC / 5-FU) Eşliğinde Glokom Filtrasyon Cerrahisi',
  shortCode: 'GOZ-TRABEKULEKTOMI',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Glokom & Ön Segment Filtrasyon Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Maksimum tolere edilebilir medikal tedaviye ve/veya lazer trabeküloplastiye (SLT/ALT) rağmen göz içi basıncı (GİB) hedef düzeye düşürülemeyen veya görme alanı/optik sinir lifi kaybı ilerleyen glokom hastalarında, aköz hümörün ön kamaradan subkonjonktival/sub-Tenon mesafeye kontrollü drenajını sağlayarak yeni bir filtre edici yastıkçık (filtrasyon blebi) oluşturulması ameliyatıdır. Mikrocerrahi aşamaları: (1) Üst konjonktiva ve Tenon kapsülü forniks veya limbus tabanlı diseke edilir; (2) Episklera ve skleral flep yatağına fibrozisi engellemek için antimetabolit (Mitomisin C [MMC, 0.2-0.4 mg/mL] veya 5-Fluorourasil [5-FU]) emdirilmiş mikro-süngerler 1-3 dakika uygulanır ve bol BSS ile yıkanır; (3) Yarım kat (parsiyel kalınlıkta / guarded) skleral flep hazırlanır; (4) Yan parasentez ile kontrollü dekompresyon yapılır; (5) Kelly punch ile trabeküler ağ bloğu çıkarılır; (6) Periferik cerrahi iridektomi (PI) yapılır; (7) Skleral flep 10-0 naylon ayarlanabilir/gevşetilebilir sütürlerle, Tenon ve konjonktiva su geçirmez (watertight) biçimde kapatılır.',
  indications: [
    'Primer Açık Açılı Glokom (POAG): Maksimum medikal tedaviye rağmen ilerleyici optik nöropati ve kontrolsüz GİB',
    'Psödoeksfolyatif Glokom (PXG) ve Pigmenter Glokom: Dirençli yüksek GİB ve geniş basınç dalgalanmaları',
    'Kronik Açı Kapanması Glokomu: Periferik ön sineşiler (PAS) nedeniyle iridotomiye yanıt vermeyen olgular',
    'Normal Basınçlı Glokom (NTG): Çok düşük hedef GİB (<10-12 mmHg) gerektiren progresif görme alanı kayıpları',
    'Sekonder Glokomlar ve Jüvenil/Konjenital Glokom: Üveitik (inaktif), psödofakik veya post-travmatik glokomlar'
  ],
  averageDuration: '45 - 75 dakika (Katarakt cerrahisi ile kombine fako-trabekülektomide 75 - 100 dakika)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 15 mL (Konjonktival, episkleral ve periferik iridektomi kaynaklı mikro-sızıntılar)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Açık Kürede Katastrofik Ekspulsif Koroidal Hemoraji Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Ekspulsif Suprakoroidal Hemoraji: Yüksek GİB\'li gözde trabeküler blok çıkarılırken ani dekompresyon (GİB → 0 mmHg) + öksürük/ıkınma/hipertansiyon sonucu arka siliyer arter yırtılması',
      'Ön Kamara Hifeması: Periferik iridektomide iris kök damarları veya skleral venlerin kanaması (bleb başarısızlığına yol açabilir)',
      'Subkonjonktival / Retrobulber Hematom: İğneli blok yapılırsa oftalmik damar travması'
    ],
    hemostasisStrategies: [
      'Bipolar wet-field mikro-koter ile skleral flep yatağında noktasal hemostaz (koter öncesi O₂ kesimi zorunlu!)',
      'Trabekülektomi ostiyumu açılmadan önce yan parasentezden kademeli kontrollü GİB düşürülmesi',
      'Ekspulsif kanama şüphesinde skleral flebin derhal kapatılması ve arka sklerotomi',
      'Antikoagülan yönetiminin ASRA 2025 / RCoA-RCOphth ilkeleriyle cerrahla bireyselleştirilmesi (Sub-Tenon blokta antikoagülan kesimi genellikle gerekmez)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Rejyonel Anestezi (Genişletilmiş Künt Sub-Tenon Bloğu) + Minimal Bilinçli Sedasyon (MAC) — İleri glokomlu (optik sinir rezerv kaybı!) ve yüksek miyopik/antikoagülanlı erişkin hastalarda İLK TERCİHTİR'
    ],
    alternative: [
      'Topikal + Subkonjonktival Anestezi + Minimal MAC: Deneyimli cerrah ve tam koopere hastalarda ("wipe-out" sendromlu ileri tünel görmede orbital hacim artışı yaratmadığı için tercih edilebilir)',
      'Peribulber Blok (Ekstrakonal): Yalnızca aksiyel uzunluk ≤26 mm ve ileri optik sinir hasarı olmayan olgularda (yüksek volümlü blok ileri glokomda optik sinir perfüzyonunu tehlikeye atabilir!)',
      'Genel Anestezi (Propofol + Remifentanil TIVA + LMA veya Spiralli ETT): Aşırı anksiyete, ortopne/kifoz, tremor, demans, nistagmus veya pediatrik olgularda'
    ],
    clinicalRationale: 'Genişletilmiş Sub-Tenon bloğu + minimal MAC, iğnesiz güvenli akinezi/analjezi sağlarken genel anestezi ekstübasyonunda gelişebilecek öksürme/ıkınma ile taze 10-0 skleral flep dikişlerinin yırtılmasını (overfiltrasyon, düz ön kamara, suprakoroidal kanama) önler. İleri glokomda aşırı orbital enjeksiyon hacminden kaçınılmalı ve yüzde bipolar koter nedeniyle ASA OR yangın güvenliği (FiO₂ ≤%30) titizlikle uygulanmalıdır.',
    rulesTitle: 'TRABEKÜLEKTOMİDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Trabekülektomide hayati kurallar: (1) Ani dekompresyon fazında sıfır öksürük ve ekspulsif koroidal kanama önlemi; (2) MMC/5-FU kronometre ve BSS yıkama disiplini; (3) Üst rektus askı sütüründe OCR yönetimi; (4) Kronik glokom ilaçlarının sistemik toksisitesi (Timolol, Asetazolamid, Brimonidin, Ekotiyofat); (5) ASA OR Yangın Üçgeni (FiO₂ ≤%30) ve hipertansiyonda NTG yasağı; (6) Pürüzsüz uyanma, çift PONV profilaksisi ve Tramadol/Kodein yasağı.',
    indispensableRules: [
      {
        number: 1,
        title: 'ÖN KAMARA AÇILIRKEN ANİ DEKOMPRESYON VE EKSPULSİF KOROİDAL KANAMA ALARMI',
        content: 'Kelly punch ile trabeküler blok kesilip ön kamara açıldığında GİB saniyeler içinde yüksek değerlerden (30-50 mmHg) 0 mmHg\'ye düşer. Bu evrede en ufak öksürme, ıkınma, baş hareketi veya hipertansiyon arka siliyer arter yırtılmasına (ekspulsif suprakoroidal hemoraji) yol açar! Mutlak hareketsizlik, normokapni ve normotansiyon şarttır.'
      },
      {
        number: 2,
        title: 'ANTİMETABOLİT (MİTOMİSİN C / 5-FU) KRONOMETRE DİSİPLİNİ',
        content: 'Skleral flep yatağına fibrozisi önlemek için konulan MMC (0.2-0.4 mg/mL) veya 5-FU süngerlerinin kalış süresi (1-3 dakika) kronometre ile takip edilip sesli bildirim yapılmalı; süngerler çıkarıldıktan sonra sahanın ≥20-30 mL BSS ile bol yıkanması teyit edilmelidir.'
      },
      {
        number: 3,
        title: 'ÜST REKTUS ÇEKME SÜTÜRÜNDE (BRIDLE SUTURE) OKÜLOKARDİYAK REFLEKS (OCR)',
        content: 'Üst rektus kasının traksiyonu trigemino-vagal refleksi (CN V → CN X) tetikleyerek ani bradikardi, AV blok veya asistoli yapabilir. İlk adım cerrahı durdurmak, 2. adım normokapni/oksijenizasyon kontrolü, düzelmezse İV Atropin 0.5 mg uygulamaktır (rutin profilaktik Atropin önerilmez).'
      },
      {
        number: 4,
        title: 'KRONİK GLOKOM İLAÇLARININ SİSTEMİK ETKİLEŞİMLERİ (TİMOLOL, ASETAZOLAMİD, BRİMONİDİN, EKOTİYOFAT)',
        content: '(a) Topikal Timolol nazolakrimal emilimle bradikardi, AV blok ve KOAH/astımda şiddetli bronkospazm yapabilir; (b) Oral/IV Asetazolamid (Diamox) hipokalemi, hiperkloremik metabolik asidoz ve sülfonamid alerjisi riski taşır (preop K⁺ ve HCO₃⁻ kontrol!); (c) Topikal Brimonidin santral sedasyon, hipotansiyon ve çocukta (<2 yaş kesin yasak!) santral apne/koma yapar; (d) Nadir Ekotiyofat iyodür damlası psödokolinesterazı inhibe ederek Süksinilkolin/Mivakuryum uzamış apnesine yol açar.'
      },
      {
        number: 5,
        title: 'ASA OR YANGIN ÜÇGENİ (KOTER + O₂) VE HİPERTANSİYONDA NTG YASAĞI',
        content: 'Sklera yatağında bipolar koter kullanıldığı için MAC sırasında örtü altına medikal hava veya FiO₂ ≤%30 verilmeli, koter öncesi O₂ ≥1 dk kesilip havalandırılmalı ve sulu %5 Povidon-İyot kullanılmalıdır. İntraoperatif hipertansiyonda önce ağrı/anksiyete/hiperkapni/dolu mesane dışlanır; ilaç gerekirse İV Labetalol, Esmolol veya Nikardipin titre edilir — İV Nitrogliserin (NTG) koroidal vazodilatasyon ve GİB artışı riski nedeniyle göz içi açık cerrahide TERCİH EDİLMEZ.'
      },
      {
        number: 6,
        title: 'BLEB GÜVENLİĞİ: PÜRÜZSÜZ UYANMA, ÇİFT PONV VE TRAMADOL/KODEİN YASAĞI',
        content: 'Genel anestezi uyanmasında öksürme/ıkınma veya postop kusma 10-0 skleral dikişleri patlatarak aşırı filtrasyona, ön kamara çökmesine (athalamia) ve malign glokoma yol açar! İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil/Deksmedetomidin + Sugammadeks (TOF ≥0.9) + çift antiemetik (Deksametazon + Ondansetron) uygulanır. Postop Tramadol ve Kodein yüksek PONV riski nedeniyle KULLANILMAZ!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Glokom Konsültasyonu: Glokom tipi, bazal GİB, C/D oranı, ileri tünel görme ("wipe-out" riski — iğneli yüksek volümlü bloktan kaçınma), aksiyel uzunluk (>26 mm yüksek miyopi kontrolü) ve hedef GİB.',
      'Kardiyoloji / Göğüs Hastalıkları (Klinik Endikasyonda): Topikal Timolol kullananlarda bradikardi/AV blok veya astım/KOAH bronkospazmı, dekompanse kardiyopulmoner hastalık ve kronik öksürük optimizasyonu.',
      'Anestezi Değerlendirmesi: Sırtüstü yatma toleransı, klostrofobi, glokom damla/ilaç listesi ve rejyonel MAC vs. GA seçimi.'
    ],
    historyAndPhysical: [
      'Ayrıntılı Glokom İlaç Listesi: Topikal Timolol (beta-bloker), Brimonidin (alfa-2 agonist), Prostaglandin analogları, Pilokarpin, nadir Ekotiyofat iyodür ve oral Asetazolamid (Diamox — sülfa alerjisi, hipokalemi, metabolik asidoz).',
      'Antikoagülan / Antiagregan Yönetimi (ASRA 2025 & RCoA/RCOphth): Sub-Tenon blok + trabekülektomide antikoagülan kesimi tromboembolik risk ile hifema/suprakoroidal kanama riski tartılarak cerrahla bireyselleştirilir; rutin köprüleme yapılmaz (bkz. #infografik=antithrombotic-matrix).',
      'Önceki Oküler Cerrahi Öyküsü ve Sırtüstü Yatamama: Önceki başarısız bleb/vitrektomi, kifoz/ortopne ve mesane boşaltma planı.'
    ],
    laboratoryAndTests: [
      'Oral Asetazolamid (Diamox) veya Diüretik Kullananlarda: Serum Elektrolitleri (K⁺, Na⁺, Cl⁻, HCO₃⁻) ve Böbrek Fonksiyonları (Üre, Kreatinin) — hipokalemi ve hiperkloremik metabolik asidoz taraması zorunludur.',
      'Klinik Endikasyon Bazlı Tetkikler: Warfarin kullananlarda güncel INR; diyabetiklerde vaka günü kan şekeri; topikal Timolol veya kardiyak öyküsü olanlarda 12 derivasyonlu EKG (bradikardi / AV blok kontrolü). Stabil lokal/MAC hastada rutin geniş koagülasyon/TKS paneli gerekmez.',
      'Oftalmolojik Değerlendirme: Bazal GİB tonometrisi ve aksiyel uzunluk ölçümü.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (OCR bradikardi ve Timolol iletim bloğu analizi), SpO₂, NIBP ve EtCO₂ (genel anestezide ve sedasyonlu MAC\'te nazal kapnografi).',
      'Sürekli Ritim Takibi: Üst rektus çekme sütürü (bridle suture) ve skleral flep manipülasyonunda OCR alarmı.',
      'Kantitatif TOF Monitörü (Genel Anestezide): Kelly punch ve iridektomi fazında TOF 0/4; ekstübasyonda TOF ≥0.9.'
    ],
    vascularAccess: [
      '1 adet güvenli periferik intravenöz damar yolu (18-20G).',
      'Acil Bradikardi Kiti: İV Atropin (0.5 mg) ve Glikopirolat hazır.',
      'Hipertansiyon Yönetimi: İV Labetalol, Esmolol veya Nikardipin (İV Nitrogliserin koroidal vazodilatasyon riski nedeniyle TERCİH EDİLMEZ).'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, 10-15° Baş Elevasyonu ve Silikon Donut Sabitleme',
    patientPositionDetails: [
      'Baş silikon donut yastıkla mikroskop eksenine paralel sabitlenir; jugüler venöz bası önlenir.',
      '10-15° hafif baş elevasyonu episkleral venöz basıncı düşürerek GİB kontrolüne yardımcı olur.',
      'Cerrahi örtü L-bar çadır sistemi ile kaldırılır; örtü altına medikal hava (veya yalnızca gerekirse FiO₂ ≤%30) verilerek CO₂ göllenmesi ve koter yangın riski önlenir.'
    ],
    anesthesiaManagement: [
      'Rejyonel Anestezi & Monitörize Anestezi Bakımı (MAC):',
      '  - Genişletilmiş Künt Sub-Tenon Bloğu (3-4 mL Lidokain %2 + Bupivakain %0.5 veya Ropivakain; ileri glokomlu gözde optik sinir perfüzyonunu bozmamak için aşırı volümden kaçınılır).',
      '  - Minimal Bilinçli Sedasyon: Gerekirse Midazolam 0.5-1.0 mg İV ve/veya Fentanil 25 mcg İV. Kontrolsüz Propofol bolusları YASAKTIR (apne + hiperkapni + ani sıçramalı uyanma).',
      '  - İntraoperatif Hipertansiyonda: Önce ağrı, anksiyete, hiperkapni ve dolu mesane dışlanır; gerekirse İV Labetalol, Esmolol veya Nikardipin titre edilir (NTG kullanılmaz!).',
      'Genel Anestezi Uygulanıyorsa:',
      '  - Propofol + Remifentanil TIVA (düşük PONV ve pürüzsüz uyanma) + Rokuronyum (0.6 mg/kg).',
      '  - Sıkı Normokapni: EtCO₂/PaCO₂ 35-38 mmHg (hiperkapni koroid vazodilatasyonu ile GİB\'i fırlatır).',
      '  - N₂O KULLANILMAZ (PONV artışı ve olası intraoküler hava/gaz riski).'
    ],
    airwayManagement: [
      'Rejyonel MAC: Spontan solunumda örtü altına medikal hava (veya FiO₂ ≤%30); bipolar koter açılmadan önce O₂ ≥1 dk kesilir ve havalandırılır (ASA OR Fire Advisory). Antisepside sulu %5 Povidon-İyot kullanılır.',
      'Genel Anestezi: LMA (düşük öksürük avantajı) veya spiralli kaflı ETT.'
    ],
    criticalSurgicalStages: [
      '1. Taraf Doğrulaması, Baş Elevasyonu ve Künt Sub-Tenon Bloğu (Akinezi & GİB kontrolü).',
      '2. Sulu %5 Povidon-İyot Antisepsisi ve Üst Konjonktiva/Tenon Disseksiyonu.',
      '3. Üst Rektus Traksiyon Sütürü (Bridle Suture) — Okülokardiyak refleks kontrolü!',
      '4. Bipolar Wet-Field Koter Hemostazı (O₂ KAPALI teyidi!).',
      '5. Antimetabolit (MMC 0.2-0.4 mg/mL veya 5-FU) Sünger Uygulaması (Kronometre 1-3 dk + ≥20-30 mL BSS yıkama).',
      '6. Parsiyel Kalınlıkta Skleral Flep Hazırlanması ve Yan Parasentez ile Kademeli Dekompresyon.',
      '7. Kelly Punch ile Trabekülektomi Penceresi (Ani dekompresyon — sıfır hareket/öksürük!).',
      '8. Cerrahi Periferik İridektomi (PI) — İris kanaması kontrolü.',
      '9. Skleral Flebin 10-0 Naylon Ayarlanabilir Sütürlerle Kapatılması ve Filtrasyon Testi.',
      '10. Konjonktiva/Tenon Su Geçirmez Kapatma, Seidel Testi ve Basısız Şeffaf Koruyucu Kalkan.'
    ],
    emergenceNotes: [
      'Genel Anestezi Pürüzsüz Ekstübasyon: İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil (0.03-0.05 mcg/kg/dk) veya Deksmedetomidin + Sugammadeks (TOF ≥0.9) ile sıfır öksürük/ıkınma sağlanır.',
      'Çiftli PONV Profilaksisi: Deksametazon (4-8 mg) + Ondansetron (4 mg) zorunludur (kusma blebi patlatır!).',
      'Ameliyat edilen göze baskılı pansuman YAPILMAZ; şeffaf delikli plastik koruyucu kalkan (eye shield) gevşekçe bantlanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Trabekülektomi sonrası şiddetli somatik ağrı beklenmez; hafif batma ve yabancı cisim hissi sık görülür.',
      'Oral / İV Parasetamol (1000 mg) çoğu olguda yeterlidir; Sub-Tenon bloğu ilk saatlerde mükemmel analjezi sağlar.',
      'KAÇINILACAK AJANLAR: TRAMADOL ve KODEİN yüksek PONV riskiyle bleb ayrışmasına ve ön kamara çökmesine yol açabileceğinden KULLANILMAZ! Hifema riski nedeniyle agresif antiplatelet etkili NSAİİ\'lerden de kaçınılır; şiddetli dirençli ağrıda önce cerrahi komplikasyon (akut GİB artışı / malign glokom / suprakoroidal kanama) dışlanır, gerekirse mikro-doz İV Fentanil (25 mcg) + ek antiemetik verilir.'
    ],
    prospectRecommendations: [
      'Glokom filtrasyon cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; RCoA/RCOphth (2012) ve 4th PONV Consensus (2020) ilkeleri doğrultusunda:',
      '  - Künt Sub-Tenon rejyonel bloğu + Parasetamol + çiftli PONV profilaksisi ile opioid tüketimi ve kusma kaynaklı bleb rüptürü önlenir.'
    ],
    erasRecommendations: [
      'Günübirlik / Kısa Yatışlı Glokom Cerrahisi İlkeleri (RCoA-RCOphth & EGS):',
      '  - Minimal Açlık: Berrak sıvılar operasyondan 2 saat öncesine kadar serbesttir.',
      '  - Agresif PONV Profilaksisi: Çiftli antiemetik (Ondansetron + Deksametazon) standarttır.',
      '  - Baş 30° Elevasyonu: Episkleral venöz basıncı düşürerek bleb fonksiyonunu korur ve suprakoroidal kanama riskini azaltır.',
      '  - Kısıtlamalar: İlk haftalarda öne eğilme, ıkınma (laksatif gerekebilir), ağır kaldırma ve gözü ovuşturma yasaklanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Glaucoma Procedures (Trabeculectomy). Wolters Kluwer / LWW.',
    erasReference: 'Kumar CM, Eke T, Dodds C, et al. Local anaesthesia for ophthalmic surgery — Joint guidelines from the Royal College of Anaesthetists (RCoA) and the Royal College of Ophthalmologists (RCOphth). 2012.',
    prospectReference: 'Glokom cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve PONV yaklaşımı RCoA/RCOphth (2012) ve 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'European Glaucoma Society (EGS). Terminology and Guidelines for Glaucoma (5th ed.). Br J Ophthalmol. 2021.',
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Primary Open-Angle Glaucoma.',
      'ASA Task Force on Operating Room Fires. Practice Advisory for the Prevention and Management of Operating Room Fires. Anesthesiology. 2013;118(2):271-290.',
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.',
      'Kopp SL, Vandermeulen E, et al. ASRA Pain Medicine Evidence-Based Guidelines (5th ed.). Reg Anesth Pain Med. 2025.'
    ]
  }
};
