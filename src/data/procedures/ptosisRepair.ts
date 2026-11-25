import { ProcedureDefinition } from '../../types/procedures';

/**
 * Pitozis Onarımı: Levator Aponörozu İlerletmesi / Rezeksiyonu, Müller Kası-Konjonktiva Rezeksiyonu (MMCR) ve Frontalis Askı Cerrahisi
 * (Ptosis Repair / Blepharoptosis Surgery: Levator Aponeurosis Advancement, Müller's Muscle Resection and Frontalis Sling)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth (2012),
 * Schein et al. (NEJM 2000), ASA OR Fire Advisory (2013), ASRA 5th Ed. (2025), Gan et al. 4th PONV Consensus (2020).
 */
export const ptosisRepair: ProcedureDefinition = {
  id: 'ptosis-repair',
  name: 'Pitozis Onarımı: Levator Aponörozu İlerletmesi ve Blefaropitozis Cerrahisi',
  shortCode: 'GOZ-PITOZIS',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Kapak Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Üst göz kapağının normal anatomik seviyesinden aşağı düşmesi (blefaropitozis) sonucu üst görme alanının daralması, baş pozisyonu ve görsel yorgunluk yaşayan hastalarda kapak yüksekliğinin, kıvrımının ve simetrisinin cerrahi olarak düzeltilmesi ameliyatıdır. Temel teknikler: (1) Anterior Yaklaşım — Levator Aponörozu İlerletmesi (LPS Advancement): İnvolüsyonel pitoziste altın standarttır; üst kapak kıvrımından girilerek aponöroz tarsusa asılır ve hasta masada oturtularak kapak seviyesi canlı ayarlanır; (2) Posterior Yaklaşım — Müller Kası-Konjonktiva Rezeksiyonu (MMCR): Fenilefrin testi pozitif hafif-orta pitoziste; (3) Frontalis Askı Cerrahisi (Frontalis Sling): Levator fonksiyonu <4 mm olan konjenital veya miyojenik pitoziste.',
  indications: [
    'Aponevrotik (İnvolüsyonel / Senil) Pitozis: İleri yaşta levator aponörozunun ayrılması/incelmesi (en sık endikasyon)',
    'Post-Cerrahi ve Kontakt Lens Pitozisi: Önceki göz ameliyatı veya sert kontakt lens kullanımı sonrası aponöroz ayrılması',
    'Miyojenik ve Konjenital Pitozis: Gelişimsel levator disfonksiyonu (çocuklarda ambliyopi riski), Miyastenia Gravis (medikal stabilize), CPEO / Mitokondriyal Miyopati veya Miyotonik Distrofi',
    'Nörojenik Pitozis: Parsiyel 3. kraniyal sinir felci sekeli veya Horner Sendromu',
    'Travmatik ve Mekanik Pitozis'
  ],
  averageDuration: '30 - 60 dakika (Tek taraflı levator ilerletmesi: 30-45 dk; Bilateral: 60-75 dk; Frontalis askı: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 20 mL (Zengin mikrovasküler ağa karşın düşük hacimli adrenalinli lokal infiltrasyon ve bipolar koter ile kan kaybı minimaldir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Derin Preaponevrotik Yağ Kanaması → Orbital Hematom Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Preaponevrotik Orbital Yağ Damarları: Orbital septum açıldığında orbitaya sızarak akut retrobulber hematom / Orbital Kompartman Sendromu (OCS) oluşturabilir',
      'Marginal ve Periferik Palpebral Arter Arkadları',
      'Medial ve Lateral Palpebral Arter Dalları'
    ],
    hemostasisStrategies: [
      'Lokal anesteziğe 1:100.000 veya 1:200.000 Adrenalin eklenmesi ve insizyondan 7-10 dk önce enjeksiyon',
      'Bipolar wet-field mikro-koter ile selektif hemostaz (koter öncesi O₂ kesimi zorunlu!)',
      'Akut orbital hematom / OCS şüphesinde <60-90 dk içinde acil lateral kantotomi + inferior kantolizis + 30° baş elevasyonu + IV Mannitol (1-2 g/kg) + IV Asetazolamid (500 mg)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Düşük Hacimli Lokal İnfiltrasyon (Lidokain %2 + Bupivakain %0.5 + 1:100.000 Adrenalin, Maks. 1.0 - 1.5 mL) + Minimal Bilinçli Sedasyon (MAC) — İntraoperatif göz aç-kapa kooperasyonu ve simetri ayarı için ALTIN STANDARTTIR'
    ],
    alternative: [
      'Genel Anestezi (LMA veya Spiralli ETT): Pediatrik konjenital pitozis (frontalis askı), ileri demans, kontrolsüz tremor veya klostrofobisi olan hastalarda (canlı kapak seviyesi testi yapılamaz; altta yatan Miyastenia Gravis vs. Mitokondriyal Miyopati / CPEO kas gevşetici kurallarına kesinlikle uyulur!)'
    ],
    clinicalRationale: 'Düşük hacimli (1-1.5 mL) lokal infiltrasyon + minimal MAC, cerrahın hastayı ameliyat masasında yarı-oturur konuma getirip gözlerini açıp kapamasını istemesine ve levator aponöroz gerginliğini gerçek zamanlı ayarlamasına imkan tanır. Yüzde bipolar koter/radyofrekans kullanıldığı için örtü altı medikal hava veya FiO₂ ≤%30 kuralıyla ASA OR yangın güvenliği sağlanmalıdır.',
    rulesTitle: 'PİTOZİS ONARIMINDA ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Pitozis onarımında hayati kurallar: (1) Canlı kapak seviyesi ayarı için sıfır derin sedasyon; (2) Düşük lokal hacim (1-1.5 mL) ve adrenalin-Müller kası yanılsaması; (3) Miyastenia Gravis vs. Mitokondriyal Miyopati (CPEO) / Miyotonik Distrofi nöromusküler farmakoloji ayrımı!; (4) ASA OR Yangın Üçgeni (yüz koteri + FiO₂ ≤%30); (5) Kornea kalkanı ve Bell fenomeni koruması; (6) Whitnall/levator traksiyonunda OCR ve retrobulber hematom alarmı.',
    indispensableRules: [
      {
        number: 1,
        title: 'CANLI KAPAK KONTÜRÜ AYARI İÇİN "SIFIR DERİN SEDASYON" DİSİPLİNİ',
        content: 'Levator aponörozu tarsusa dikilirken hasta masada yarı-oturur (Fowler) konuma getirilir ve gözlerini açıp kapaması istenir. Derin sedasyon veya Propofol infüzyonu/bolusları levator dinamiğini bozarak aşırı/yetersiz düzeltmeye (over/undercorrection) ve ani sıçramalı uyanmaya yol açar. Sedasyon yalnızca lokal enjeksiyon anında ultra-kısa ve minimal tutulmalı, diseksiyon ve ayar fazında hasta tam uyanık ve koopere olmalıdır.'
      },
      {
        number: 2,
        title: 'MİYASTENİA GRAVİS vs. MİTOKONDRİYAL MİYOPATİ (CPEO) / MİYOTONİK DİSTROFİ FARMAKOLOJİ AYRIMI!',
        content: 'Pitozis nöromusküler hastalığın ilk bulgusu olabilir ve iki tablonun kas gevşetici farmakolojisi TAMAMEN FARKLIDIR: (a) MİYASTENİA GRAVİS (MG): Süksinilkoline DİRENÇ (yüksek doz gereksinimi + Faz II blok riski) ve non-depolarizanlara (Rokuronyum) AŞIRI DUYARLILIK vardır → mümkünse kas gevşeticisiz/LMA veya Rokuronyum dozu %50-75 azaltılarak + kantitatif TOF + Sugammadeks kullanılır (sabah piridostigmin dozu sürdürülür). (b) CPEO / MİTOKONDRİYAL MİYOPATİ / MİYOTONİK DİSTROFİ: Süksinilkolin HİPERKALEMİ, RABDOMİYOLİZ ve MİYOTONİK SPAZM nedeniyle KESİN KONTRENDİKEDİR! Mitokondriyal hastalıkta uzun/yüksek doz Propofol infüzyonunda PRIS/laktik asidoz riski vardır, laktatlı sıvılardan (Ringer Laktat) kaçınılır, normoglisemi ve normotermi titizlikle korunur.'
      },
      {
        number: 3,
        title: 'ASA AMELİYATHANE YANGIN ÜÇGENİ (YÜZ KOTERİ + OKSİJEN GÜVENLİĞİ)',
        content: 'Üst kapakta bipolar koter veya radyofrekans mikro-iğne kullanılır. Örtü altında yüksek akımlı O₂ birikimi ciddi yüz yanıklarına yol açar! Örtü altına medikal hava veya FiO₂ ≤%30 verilmeli, koter öncesi O₂ ≥1 dk kesilip havalandırma yapılmalı ve sulu %5 Povidon-İyot (alkol bazlı prep YASAK!) kullanılmalıdır.'
      },
      {
        number: 4,
        title: 'LOKAL ANESTEZİKTE DÜŞÜK HACİM (≤1.5 ML) VE MÜLLER KASI / ADRENALİN YANILSAMASI',
        content: 'Üst kapağa verilecek lokal anestezik hacmi 1.0-1.5 mL\'yi geçmemelidir (yüksek volüm mekanik pitozis ve orbikülaris bloğu yapar). Adrenalin Müller kasını uyararak kapağı yapay olarak 1-2 mm yükseltir; enjeksiyon sırasında negatif aspirasyon ve EKG/KB takibi zorunludur.'
      },
      {
        number: 5,
        title: 'KORNEA KALKANI (CORNEAL SHIELD) VE BELL FENOMENİ GÜVENLİĞİ',
        content: 'İnsizyon öncesi antibiyotikli pomad ile kornea kalkanı yerleştirilir ve vaka sonunda çıkarıldığı teyit edilir. Zayıf Bell fenomeni olan hastalarda postop lagoftalmi ve kornea ülseri riski yüksek olduğundan aşırı düzeltmeden kaçınılır.'
      },
      {
        number: 6,
        title: 'LEVATOR / WHITNALL TRAKSİYONUNDA OCR VE RETROBULBER HEMATOM ALARMI',
        content: 'Orbital septum ve Whitnall ligamenti çekilirken OCR (bradikardi/asistoli) gelişebilir (1. adım cerrahı durdur → 2. adım oksijenasyon/ventilasyon → 3. adım İV Atropin 0.5 mg). Preaponevrotik yağ kanaması sonrası ani ağrı/proptozis gelişirse <60-90 dk içinde acil lateral kantotomi + inferior kantolizis + IV Mannitol + IV Asetazolamid uygulanır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Pitozis etiyolojisi, MRD1, levator fonksiyonu, fenilefrin testi, Bell fenomeni ve kuru göz değerlendirmesi.',
      'Nöroloji Konsültasyonu (Şüpheli Miyojenik/Nörojenik Olgularda): Miyastenia Gravis (AChR/MuSK antikoru, piridostigmin optimizasyonu), CPEO / Kearns-Sayre (kardiyak iletim bloğu / pacemaker taraması!) veya miyotonik distrofi değerlendirmesi.',
      'Kardiyoloji / Anestezi (Klinik Endikasyonda): Stabil lokal/MAC involüsyonel pitozis hastasında rutin kardiyoloji konsültasyonu gerekmez; Kearns-Sayre/CPEO ve miyotonik distrofi hastalarında 12 derivasyonlu EKG ve kardiyak iletim incelemesi ZORUNLUDUR.'
    ],
    historyAndPhysical: [
      'Nöromusküler Hastalık Sorgulaması: Gün içinde artan yorgunluk/diplopi (MG), progresif göz hareketi kısıtlılığı/sağırlık/iletim bloğu (CPEO/Kearns-Sayre), gevşeme güçlüğü (miyotonik distrofi) veya ailede Malign Hipertermi öyküsü.',
      'Antikoagülan / Antiagregan Yönetimi (ASRA 2025 & PAUSE): Yüzeyel kapak insizyonunda kanama riski ile preaponevrotik yağ hematomu riski cerrahla tartılır; DOAC kesilecekse 48 sa (5-7 gün değil!) ve rutin köprüleme YAPILMAZ (bkz. #infografik=antithrombotic-matrix).',
      'Kuru Göz / Bell Fenomeni ve Hipertansiyon Öyküsü.'
    ],
    laboratoryAndTests: [
      'DÜŞÜK RİSKLİ LOKAL / MAC İNVOLÜSYONEL PİTOZİSTE RUTİN PREOP LABORATUVAR VE EKG İSTENMEZ! (Schein NEJM 2000 & ASA Advisory).',
      'Klinik Endikasyon Bazlı Tetkikler: Warfarin kullananlarda güncel INR, diyabetiklerde vaka günü kan şekeri; CPEO / Kearns-Sayre / miyotonik distrofi / kardiyak semptomu olanlarda 12 derivasyonlu EKG (AV blok / uzamış PR-QRS taraması!) ve mitokondriyal hastalıkta bazal laktat/glukoz.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (OCR ve adrenalin taşiaritmi takibi), SpO₂, NIBP (masada oturtma sırasında ortostatik KB izlemi) ve sedasyon varsa nazal EtCO₂.',
      'Genel Anestezi / Nöromusküler Hastalıkta: Kantitatif TOF monitörizasyonu ve core sıcaklık takibi zorunludur.'
    ],
    vascularAccess: [
      '1 adet güvenli periferik intravenöz damar yolu (20-22G).',
      'Acil İlaçlar Hazır: İV Atropin (0.5 mg), Esmolol/Labetalol; genel anestezi + MG/miyopatide Sugammadeks ve Dantrolen erişimi.'
    ],
    patientPosition: 'Supin Başlangıç, İntraoperatif Ayarlanabilir Yarı-Oturur (45-60° Fowler) Pozisyon',
    patientPositionDetails: [
      'Motorlu ameliyat masası intraoperatif kapak seviyesi testi için kolayca 45-60° oturur konuma getirilebilmelidir.',
      'Örtü altı medikal hava veya FiO₂ ≤%30 sağlanır; hasta oturtulduğunda cerrahla yüz yüze bakış engellenmemelidir.'
    ],
    anesthesiaManagement: [
      'Lokal İnfiltrasyon Protokolü (Minimal Volüm):',
      '  - Lidokain %2 + Bupivakain %0.5 (1:1) + 1:100.000 veya 1:200.000 Adrenalin; üst kapak başına MAKSİMUM 1.0 - 1.5 mL (negatif aspirasyon sonrası).',
      '  - Vazokonstriksiyon için insizyondan 7-10 dakika önce enjeksiyon yapılır.',
      'Monitörize Anestezi Bakımı (MAC):',
      '  - Sadece enjeksiyon anı için ultra-hafif anksiyoliz: Gerekirse Midazolam 0.5-1.0 mg İV veya Fentanil 25 mcg İV.',
      '  - Diseksiyon ve oturur kapak ayarı sırasında hasta tamamen uyanık ve koopere olmalıdır.',
      'Genel Anestezi (Pediatrik Frontalis Askı / Uyumsuz Erişkin / Miyopati):',
      '  - LMA veya spiralli ETT; MG\'de NMB %50-75 azaltılır (veya NMB\'siz LMA) + TOF + Sugammadeks.',
      '  - CPEO/Mitokondriyal miyopatide: Süksinilkolin KESİN YASAK; laktatsız dengeli/izotonik sıvı + normoglisemi + normotermi; uzun/yüksek doz Propofol infüzyonundan kaçınılır.'
    ],
    airwayManagement: [
      'MAC\'te spontan solunum korunur; ASA OR Fire kuralı gereği örtü altı medikal hava (veya FiO₂ ≤%30), koter/radyofrekans öncesi O₂ ≥1 dk kesilir ve sulu %5 Povidon-İyot kullanılır.',
      'Genel anestezide LMA (öksürüksüz uyanma) veya spiralli ETT tercih edilir.'
    ],
    criticalSurgicalStages: [
      '1. Taraf Doğrulaması, Üst Kapak Kıvrımının (Crease) Oturur Pozisyonda İşaretlenmesi.',
      '2. Sulu %5 Povidon-İyot Antisepsisi ve Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '3. Düşük Hacimli (1-1.5 mL) Adrenalinli Lokal İnfiltrasyon (7-10 dk bekleme; EKG/KB izlemi).',
      '4. Cilt, Orbikülaris ve Orbital Septum İnsizyonu (Koter öncesi O₂ KAPALI teyidi!).',
      '5. Preaponevrotik Yağ Ekartasyonu ve Levator Aponörozu / Whitnall Ligamenti Disseksiyonu (OCR kontrolü!).',
      '6. Aponörozun Tarsusa Geçici Sütürlerle Tespiti.',
      '7. Masanın 45-60° Oturur Konuma Getirilmesi ve Canlı Göz Aç-Kapa Simetri Ayarı.',
      '8. Kalıcı Sütürasyon, Titiz Hemostaz, Kornea Kalkanının Çıkarılma Teyidi ve Cilt Kapanışı.'
    ],
    emergenceNotes: [
      'Lokal/MAC cerrahisinde hasta PADSS ≥9 kriteriyle kısa gözlem sonrası taburcu edilir.',
      'Genel anestezi uygulanan MG/miyopati olgularında TOF ≥0.9, tam solunum gücü ve normotermi doğrulanmadan ekstübasyon yapılmaz.',
      'Göze sıkı baskılı pansuman yapılmaz (görme ve retrobulber hematom takibini engeller!); ilk 24-48 saat aralıklı soğuk kompres uygulanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Pitozis onarımı sonrası ağrı hafiftir; lokal infiltrasyon ilk saatlerde etkin analjezi sağlar.',
      'Oral Parasetamol (500-1000 mg) yeterlidir; sistemik opioidlere (Tramadol/Kodein) gerek yoktur ve PONV/venöz basınç artışı nedeniyle kaçınılır.',
      'İlk 24-48 saat aralıklı soğuk jel kompres ödem ve kapak hematomunu azaltır; erken dönemde agresif antiplatelet NSAİİ\'lerden kaçınılır.'
    ],
    prospectRecommendations: [
      'Oküloplastik kapak cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; RCoA/RCOphth (2012) ve 4th PONV Consensus (2020) ilkeleri doğrultusunda:',
      '  - Uzun etkili lokal anestezik infiltrasyonu + Parasetamol ile opioid gerektirmeyen konforlu iyileşme sağlanır.'
    ],
    erasRecommendations: [
      'Günübirlik Oküloplastik Cerrahi İlkeleri:',
      '  - Hızlı Taburculuk: PADSS ≥9 ile aynı gün taburcu edilir (ağır MG/miyopati genel anestezi olguları solunum takibi için yatırılabilir).',
      '  - Baş 30-45° Elevasyonu: İlk 48 saat baş yüksek yatış ödem ve hematomu azaltır.',
      '  - Lagoftalmi & Kornea Koruması: Gündüz koruyucusuz suni gözyaşı, gece yoğun oftalmik jel/pomad; ani şiddetli göz ağrısı veya görme kaybında (retrobulber hematom) acil başvuru eğitimi verilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Ptosis Repair (Blepharoptosis). Wolters Kluwer / LWW.',
    erasReference: 'Kumar CM, Eke T, Dodds C, et al. Local anaesthesia for ophthalmic surgery — Joint guidelines from the Royal College of Anaesthetists (RCoA) and the Royal College of Ophthalmologists (RCOphth). 2012.',
    prospectReference: 'Oküloplastik cerrahi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve PONV yaklaşımı RCoA/RCOphth (2012) ve 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'Schein OD, Katz J, Bass EB, et al. The value of routine preoperative medical testing before cataract surgery. N Engl J Med. 2000;342(3):168-175.',
      'ASA Task Force on Operating Room Fires. Practice Advisory for the Prevention and Management of Operating Room Fires. Anesthesiology. 2013;118(2):271-290.',
      'Blichfeldt-Lauridsen L, Hansen BD. Anesthesia and myasthenia gravis. Acta Anaesthesiol Scand. 2012;56(1):17-22.',
      'Niezgoda J, Morgan PG. Anesthetic considerations in patients with mitochondrial defects. Paediatr Anaesth. 2013;23(9):785-793.',
      'Kopp SL, Vandermeulen E, et al. ASRA Pain Medicine Evidence-Based Guidelines (5th ed.). Reg Anesth Pain Med. 2025.'
    ]
  }
};
