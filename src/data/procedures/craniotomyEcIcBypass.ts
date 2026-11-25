import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: Ekstrakraniyel-İntrakraniyel Revaskülarizasyon (EC-IC Bypass / STA-MCA)
 * (Craniotomy for Extracranial-to-Intracranial Revascularization: STA-MCA & High-Flow Bypass)
 * 
 * Jaffe (6th ed., 2020), AHA/ASA 2023 Scientific Statement on Moyamoya Disease (Stroke 2023),
 * 2021 Japanese Moyamoya Guidelines, SNACC, ERAS (Hagan et al., 2016) ve
 * PROSPECT Craniotomy 2023 (Mestdagh et al.) referans alınarak yapılandırılmıştır.
 */
export const craniotomyEcIcBypass: ProcedureDefinition = {
  id: 'craniotomy-ec-ic-bypass',
  name: 'Kraniyotomi: Ekstrakraniyel-İntrakraniyel Revaskülarizasyon (EC-IC Bypass / STA-MCA)',
  shortCode: 'STA-MCA-BYPASS',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Serebrovasküler Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Hemodinamik yetmezlik veya vasküler oklüzyon nedeniyle kronik iskemik tehdit altındaki serebral parankimi revaskülarize etmek amacıyla; skalp donör arteri olan A. temporalis superficialis (STA)\'in, küçük bir kraniyotomi penceresinden kortikal M4 Middle Cerebral Artery (MCA) dalına mikrocerrahi uç-yan (end-to-side) mikrovasküler anastomoz ile bağlanması (klasik doğrudan STA-MCA bypass) ameliyatıdır. Seçilmiş olgularda radial arter veya safen ven greftiyle yüksek akımlı (high-flow) bypass veya özellikle pediatrik Moyamoya olgularında temporal kas/dura serbestleştirilerek dolaylı (indirekt / EDAS-EMS) revaskülarizasyon teknikleri uygulanır.',
  indications: [
    'Moyamoya Hastalığı ve Moyamoya Sendromu: Bilateral internal karotid arter (ICA) tepe darlık/tıkanıklığına bağlı tekrarlayan geçici iskemik ataklar (TİA), iskemik inmeler ve çocuklarda ağlama/hiperventilasyonla tetiklenen nörolojik defisitler',
    'Kompleks, Kliplenemeyen / Koillenemeyen İntrakraniyel Anevrizmalar: Dev veya fuziform ICA, MCA veya anterior sirkülasyon anevrizmalarında cerrahi tuzaklama (trapping) veya ana damar ligasyonu öncesi distal serebral kan akımını korumak amacıyla koruyucu bypass',
    'Medikal Tedaviye Dirençli Hemodinamik Serebral İskemi: Asetazolamid (Diamox) SPECT veya perfüzyon BT/MRG ile kanıtlanmış bozulmuş serebrovasküler rezervi (CVR) olan, maksimal antiagregan tedaviye rağmen TİA geçiren semptomatik tam ICA veya MCA oklüzyonları',
    'Kafa Tabanı Tümör Cerrahileri: İnternal karotid arteri çevreleyen ve rezeksiyon esnasında arterin feda edilmesini gerektiren agresif kafa tabanı lezyonları (menenjiyomlar, karsinomlar) öncesi revaskülarizasyon'
  ],
  averageDuration: '4.0 - 7.0 saat (Anestezi indüksiyonu, yaşa uygun A-line zamanlaması, İONM kurulumu ve Mayfield baş tespiti: 60-75 dk; Doppler kılavuzluğunda STA donör dalının [frontal veya parietal] mikrocerrahi diseksiyonu: 60-90 dk; Minikraniyotomi, dural açılış ve alıcı M4 kortikal arterin hazırlanması: 45-60 dk; İndüklenmiş hipertansiyon ve geçici klipleme altında mikrovasküler 10-0/11-0 monofilaman anastomoz: 60-90 dk; İntraoperatif ICG video-anjiyografi, transit-time akım ölçümü [Charbel probu], hemostaz ve kraniyoplasti/kapanış: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '150 - 450 mL (Standart mikrovasküler STA-MCA bypass diseksiyonunda düşük-orta kanama; ancak yaygın Moyamoya transdural kollaterallerinin kanaması veya yüksek akımlı ven/arter greft cerrahilerinde kan kaybı 600 - 1000 mL seviyesine çıkabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Kritik Mikrovasküler Anastomoz Kanama Odağı',
    crossMatchRequirement: 'En az 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır edilmeli, T&S doğrulanmalıdır',
    transfusionProbability: '%15 - %35 (Pediatrik Moyamoya olgularında veya düşük vücut ağırlıklı hastalarda %30-45)',
    criticalBleedingSources: [
      'Alıcı M4 Kortikal Arter Duvarı: 10-0 monofilaman sütür hattından mikro-sızıntılar veya arteriyel yırtılma',
      'Skalp İnsizyon Kenarları ve Donör STA Yatağı: Skalp son derece zengin vaskülarize olduğundan donör arter çıkarılırken kas ve galea kanamaları',
      'Moyamoya Hastalarında Dural Spontan Transdural Kollateraller: Dura açılırken spontan gelişmiş narin neovasküler damarların yırtılması',
      'Geçici Mikroklips Yerleşim Yerleri: Alıcı artere konulan geçici klipslerin endotel hasarı yaratması ve revaskülarizasyon sonrası kanama'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal hassas koagülasyon (donör STA adventisyasına zarar vermeden sadece yan dalların yakılması)',
      'Anastomoz hattı hemostazı için hemostatik jelatin sünger (Gelfoam), Surgicel ve ıslak pamuk kompresyonu (aşırı sıkı bası 1 mm anastomozu tıkayabileceğinden nazik hemostaz)',
      'ANTİKOAGÜLASYON VE PROTAMİN YASAĞI: Çoğu Moyamoya/STA-MCA merkezinde anastomoz sırasında sistemik heparinizasyon yerine yalnızca TOPİKAL HEPARİNİZE SALİN irrigasyonu tercih edilir. Düşük doz sistemik heparin uygulanmış olsa dahi, 1 mm M4 mikrovasküler anastomozda KATASTROFİK GREFT TROMBOZU riski nedeniyle kontrolsüz cerrahi kanama olmadıkça RUTİN PROTAMİN REVERSALİ KESİNLİKLE YAPILMAZ!',
      'Cell-Saver (Otolog Kan Kurtarma) düzeneği hazır bulundurulmalıdır'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Uçucu Anestezik (<0.4 - 0.5 MAC Sevofluran): İONM (TcMEP/SSEP ve EEG) dalgalarını korurken serebral metabolik koruma (CMRO2 düşüşü) ve optimal anestezi derinliği sağlar'
    ],
    alternative: [
      'Opioid Tabanlı Yüksek Doz GETA (Fentanil/Süfentanil + TIVA): Ciddi kardiyak rezerv kısıtlılığı olan erişkin olgularda'
    ],
    clinicalRationale: 'Kronik hipoperfüzyon altındaki beyin dokusunda CMRO2 düşüşü sağlarken İONM (EEG, SSEP, TcMEP) sinyallerini bozmamak ve vazoparalitik damarlarda intraserebral çalma fenomenini (steal) engellemek için Propofol + Remifentanil TIVA altın standarttır. Azot protoksit (N2O) KESİNLİKLE KONTRENDİKEDİR. PaCO2\'nin 35-40 mmHg (hastanın bazal normokapnisi) dar aralığında kesin kontrolü ve baş rotasyonunda lümen güvenliği için spiral telli ETT ile kontrollü mekanik ventilasyon gereklidir.',
    notes: 'EC-IC BYPASS CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) PEDİATRİK VE ERİŞKİN MOYAMOYA AYRIMI (Pediatrikte uyanık A-line YASAK, sabit erişkin MAP yerine yaşa/bazale göre MAP +%10-20); (2) SIKI NORMOKAPNİ (PaCO2 35-40 mmHg — Hiperkapni gerçek intraserebral steal, hipokapni doğrudan kollateral vazokonstriksiyonu yapar!); (3) RUTİN PROTAMİN REVERSALİ YASAĞI VE REOLOJİ; (4) ANASTOMOZ SONRASI SEREBRAL HİPERPERFÜZYON SENDROMU (CHS) ÖNLEMİ.',
    rulesTitle: 'EC-IC BYPASS CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'PEDİATRİK vs ERİŞKİN MOYAMOYA AYRIMI VE BAZAL MAP +%10-20 HEDEFİ',
        content: 'Pediatrik Moyamoya hastalarında ASLA indüksiyon öncesi uyanık A-line yapılmaz (ağlama → hiperventilasyon → akut katastrofik inme! Preop anksiyoliz + kesintisiz IV izotonik hidrasyon + sakin indüksiyon SONRASI A-line yerleştirilir). Geçici klipte sabit erişkin rakamları (MAP 90-105) çocuklara ASLA uygulanmaz; her hastada yaşa ve bazale göre MAP +%10-20 hedeflenir.'
      },
      {
        number: 2,
        title: 'SIKI NORMOKAPNİ (PaCO2 35-40 mmHg / BAZAL) — HEM HİPOKAPNİ HEM HİPERKAPNİ ZARARLIDIR!',
        content: 'Fizyopatoloji nettir: HİPERKAPNİ (>40-42 mmHg) sağlam damarları vazodilate ederek maksimal dilate iskemik yataktan kan çalar (gerçek İntraserebral Steal Fenomeni); HİPOKAPNİ (<35 mmHg) ise kritik kollateral damarlarda doğrudan vazokonstriksiyon yaparak enfarkta yol açar! Hedef kesinlikle SIKI NORMOKAPNİDİR (PaCO2 35-40 mmHg / hastanın bazali).'
      },
      {
        number: 3,
        title: 'RUTİN PROTAMİN YASAĞI, OPTİMAL REOLOJİ, N2O YASAĞI VE İZOTONİK SIVI',
        content: '1 mm M4 anastomozda katastrofik greft trombozu riski nedeniyle rutin Protamin reversali YAPILMAZ (çoğu merkez topikal heparinize salin kullanır). Rijit Hct %30-33 yerine hemokonsantrasyondan (Hct >%45) ve anemiden (Hb <8-9 g/dL) kaçınılır; Aspirin kesilmez, P2Y12 inhibitörleri 5-7 gün önce kesilir. N2O ve hipotonik/dekstrozlu sıvılar kullanılmaz; glisemi 140-180 mg/dL, normotermi korunur.'
      },
      {
        number: 4,
        title: 'ANASTOMOZ SONRASI SEREBRAL HİPERPERFÜZYON SENDROMU (CHS) ÖNLEMİ',
        content: 'Donör STA ile alıcı kortikal arter anastomozu açıldığı an yüksek akımın otoregülasyonsuz yatağa girmesi beyin ödemi, fokal nöbet ve intraserebral kanamaya (CHS) neden olabilir. Klempler açıldığında tansiyon hastanın yaşa/bazale uygun normotansif sınırlarına çekilir (erişkinde tipik SKB <130-140 mmHg).'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Girişimsel Nöroradyoloji Konsültasyonu: Dijital Subtraksiyon Anjiyografi (DSA) bulguları, Suzuki Evresi (Moyamoya Evre I-VI), donör STA\'nın lümen çapı (ideal olarak ≥ 1.0 mm), alıcı M4 dalının kalibresi ve leptomeningeal kollateral derecesinin incelenmesi.',
      'Serebrovasküler Rezerv (CVR) Değerlendirmesi: Diamox (Asetazolamid) provokasyonlu SPECT, Perfüzyon BT veya BOLD-fMRG ile serebral otoregülasyon kaybı ve iskemik penumbra alanlarının tespiti.',
      'Nöroloji / İONM Ekibi: Bazal nörolojik defisitler, TİA sıklığı, motor güç (0-5 skala), afazi varlığı ve ameliyat sırasındaki TcMEP/SSEP/EEG bazal planlaması.',
      'Pediatrik Nöroloji / Pediatrik Anestezi (Pediatrik Moyamoya): Ağlama, hiperventilasyon veya dehidratasyonla tetiklenen TİA öyküsü sorgulanır; ameliyat öncesi gece/sabah kesintisiz IV izotonik hidrasyon başlatılır, açlık süresi minimize edilir ve ağlamayı kesinlikle önlemek için preoperatif anksiyoliz (ör. oral/intranazal midazolam veya deksmedetomidin) planlanır.'
    ],
    historyAndPhysical: [
      'İskemik Tetikleyicilerin Sorgulanması: Moyamoya hastalarında hiperventilasyon (sıcak çorba/yemek üfleme, ağlama, egzersiz) hipokapni yoluyla kollateral vazokonstriksiyona ve akut hemipareziye yol açar; ameliyatta sıkı normokapni korunmalıdır.',
      'Yaşa Göre Bazal Kan Basıncı ve Nörolojik Muayene: Hastanın sakin/uyanık bazal SKB/MAP değeri kaydedilir (geçici klip hedefi buna göre bazal MAP +%10-20 olarak belirlenir); dört ekstremite motor gücü, duyusal seviye, konuşma ve kranyal sinir fonksiyonları belgelenir.',
      'Skalp ve Temporal Bölge Muayenesi: Daha önce geçirilmiş kraniyotomi, skalp skarı veya travma varlığı (donör STA trasesini bozabilir). Doppler stetoskop ile donör arterin trasesi ameliyat öncesi ciltte işaretlenir.',
      'Antiagregan / Antikoagülan Yönetimi: Mikrovasküler greft patensisi için Aspirin (81-100 mg/gün) ameliyat sabahı dahil DEVAM EDİLİR; buna karşın P2Y12 inhibitörleri (Klopidogrel, Prasugrel, Tikagrelor) perioperatif kanama riskini azaltmak için cerrahiden 5 - 7 gün önce kesilir.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 2 Ünite ES Cross-Match teyidi.',
      'Tam Kan Sayımı (Hb, Hct, Trombosit): Eski rijit Hct %30-33 yaklaşımı yerine hemokonsantrasyondan (Hct >%45 — hiperviskozite ve anastomoz trombozu riski) ve anemiden (Hb <8-9 g/dL — yetersiz O2 sunumu) kaçınılarak övolemik optimal reoloji hedeflenir.',
      'Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen), Kan Gazı bazal PaCO2 değeri ve bazal Kan Şekeri (hedef 140-180 mg/dL).',
      'Serum Elektrolitleri, Böbrek ve Karaciğer Fonksiyon Testleri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu / Foramen Monro) Seviyesinde Sıfırlanmış: Baş elevasyonunda doğru CPP ölçümü için transdüser yalnızca Tragus seviyesinde sıfırlanır. ZAMANLAMA AYRIMI: Koopere ERİŞKİN hastalarda indüksiyon öncesi lokal anesteziyle; PEDİATRİK Moyamoya hastalarında ise ağlama ve hiperventilasyon kaynaklı akut inmeyi önlemek için KESİNLİKLE İNDÜKSİYON SONRASINDA yerleştirilir!',
      'İntraoperatif Nöromonitörizasyon (İONM) ve TOF: TcMEP, SSEP ve kesintisiz EEG / SEF ile geçici klipleme esnasında kortikal iskemi gelişiminin anında saptanması. TcMEP için TOF ≥0.90 (4/4) doğrulanır ve yumuşak ısırma bloğu (bite block) yerleştirilir.',
      'İntraoperatif İndosiyanin Yeşili (ICG) Video-Anjiyografi & Transit-Time Ultrasonik Akım Ölçümü (Charbel Flow Probe): Anastomoz açıklığı ve donör STA akım debisinin (hedef: doğrudan bypass için 20-50 mL/dk) doğrulanması.',
      'Sürekli End-Tidal CO2 (EtCO2), Seri ABG ve Kan Şekeri: PaCO2 kesinlikle 35 - 40 mmHg (hastanın bazal normokapnisi) dar aralığında, kan şekeri 140 - 180 mg/dL aralığında tutulur.',
      'Isı Problu Foley İdrar Sondası ve Sürekli Normotermi (36.5 - 37.0°C — hipotermi vazospazm ve kan viskozitesini artırır).'
    ],
    vascularAccess: [
      'En az iki adet geniş lümenli periferik damar yolu (erişkinde 14G-16G; pediatrikte yaşa uygun çift güvenli IV hat)',
      'Santral Venöz Kateter (CVC): Vazopressör (Noradrenalin / Fenilefrin) infüzyonunun güvenli titrasyonu ve intravasküler volüm optimizasyonu için (pediatrik olgularda indüksiyon sonrası)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon + Baş Mayfield 3-Noktalı Çivili Başlık (pediatrik küçük yaşlarda uygun pediatrik çivi/at nalı başlık) ile Karşı Tarafa 45 - 60° Rotasyonda Sabitlenmiş',
    patientPositionDetails: [
      'Donör STA trasesine ve temporal bölgeye tam erişim sağlamak için baş lateral pozisyona getirilir.',
      'Çivili başlık yerleştirilirken donör STA dallarının (frontal ve parietal dallar) çivi delikleriyle yaralanmaması için arter trasesi işaretlenerek çiviler arterden uzağa takılır; skalp lokal anestezik infiltrasyonu donör STA gövdesinden UZAK tutulur ve STA komşuluğunda vazokonstriktör (epinefrin) KESİNLİKLE kullanılmaz!',
      'Boyun venöz dönüşünün engellenmemesi için aşırı fleksiyon veya aşırı rotasyondan kesinlikle kaçınılmalıdır (çene-sternum arası en az 2 parmak mesafe).',
      'İntraoperatif baş sarsıntısını ve mikroskopik anastomoz hassasiyetini korumak için başlık masaya rijit kilitlenmelidir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon (Erişkin vs Pediatrik): En ufak hipotansiyon atağı iskemik penumbrayı enfarkta çevireceğinden indüksiyon yavaş, izotonik sıvı yüklemesi ve gerekirse profilaktik Fenilefrin/Noradrenalin desteğiyle yapılır. Pediatrik Moyamoya\'da preop anksiyoliz sonrası sakin inhalasyon veya IV indüksiyon uygulanır, derinlik sağlandıktan sonra entübasyon ve A-line yerleştirilir (ağlama/hiperventilasyon ASLA tetiklenmez!).',
      'İdame, Gaz ve Sıvı Yönetimi: TIVA (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.3 mcg/kg/dk TCI; BIS 40-50). Kas gevşetici sadece indüksiyonda verilir (TcMEP için TOF ≥0.90). Azot protoksit (N2O) KESİNLİKLE KONTRENDİKEDİR. Yalnızca izotonik kristaloidler (%0.9 NaCl veya dengeli izotonik solüsyonlar) ile övolemi korunur; hipotonik (Ringer Laktat dahil) ve dekstrozlu sıvılar kullanılmaz. Glukoz 140-180 mg/dL, vücut ısısı 36.5-37.0°C korunur.',
      'SOLUNUM HEDEFİ — SIKI NORMOKAPNİ (PaCO2 35 - 40 mmHg / BAZAL): Hem hipokapniden (<35 mmHg: doğrudan kollateral vazokonstriksiyonu) HEM DE hiperkapniden (>40-42 mmHg: sağlam damarların dilatasyonu ile gerçek intraserebral çalma [steal] fenomeni) KESİNLİKLE kaçınılır! Profilaktik hiperventilasyon veya bilinçli hiperkapni YAPILMAZ.',
      'GEÇİCİ KLİPLEME VE İNDÜKLENMİŞ HİPERTANSİYON PROTOKOLÜ:',
      '  - Cerrah alıcı M4 kortikal artere geçici mikroklipsleri koyduğu anda (ortalama 25-45 dakika), kollateral leptomeningeal akımı korumak için Noradrenalin veya Fenilefrin infüzyonu ile Ortalama Arter Basıncı (MAP) hastanın YAŞA ÖZGÜ BAZAL DEĞERİNİN %10 - 20 ÜZERİNE çıkarılır (erişkinde tipik MAP 90-105 mmHg / SKB 140-160 mmHg; PEDİATRİK hastalarda sabit erişkin değerleri ASLA kullanılmaz, çocuğun kendi bazal MAP\'ı +%10-20 hedeflenir!).',
      '  - Anastomoz tamamlanıp geçici klipsler kaldırıldığı anda MAP yeniden hastanın bazal normotansif sınırlarına çekilir (CHS önlemi).',
      'Anastomoz Antikoagülasyonu ve Nöroproteksiyon: Çoğu merkez topikal heparinize salin kullanır; sistemik heparin uygulanmış olsa dahi kontrolsüz kanama olmadıkça rutin Protamin reversali YAPILMAZ. Geçici kliplemede öncelik kollateral perfüzyonun (MAP +%10-20) ve normokapninin korunmasıdır; burst süpresyon rutin değildir.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; uzun süren mikrocerrahide ve baş rotasyonunda tüpün bükülmesini önlemek için tercihen Spiral (Zırhlı / Wire-reinforced) ETT ve TcMEP için yumuşak ısırma bloğu (bite block).',
      'Entübasyon ve ekstübasyon esnasında hemodinamik stabilite (hipotansiyon, taşikardi ve hiperventilasyondan kaçınma) mutlak korunmalıdır.',
      'Kaf basıncı monitörize edilmeli ve 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Donör STA Diseksiyonu: Cilt flebi kaldırılırken parietal/frontal dalın adventisyası korunarak ince yan dalları mikrokoterle bağlanır; donör arter kurutulmamalı, ılık papaverinli SF ile ıslatılmalıdır.',
      '2. Minikraniyotomi ve Dural Açılış: Sylvian fissür distalinde M4 kortikal dalı bulunur; Moyamoya hastalarında transdural spontan kollateraller korunarak dura dikkatle açılır.',
      '3. Geçici Klipleme ve Mikrovasküler Anastomoz (En Kritik Aşama!): Alıcı M4 dalına proksimal ve distal geçici mikroklips konulur; 10-0/11-0 monofilaman naylon sütür ile uç-yan anastomoz dikilir (klipleme süresi sesli sayılır; hedef <30-40 dk). Anestezi ekibi yaşa/bazale uygun indüklenmiş hipertansiyonu (bazal MAP +%10-20) ve sıkı normokapniyi (PaCO2 35-40 mmHg) kesintisiz sürdürür.',
      '4. Geçici Klipslerin Kaldırılması ve Patensi Testi: Klipsler açılır; anastomozdan sızıntı kontrol edilir (rutin Protamin VERİLMEZ!), ICG anjiyografi ve Charbel Doppler ile akım teyit edilir; anestezi ekibi tansiyonu normotansiyona çeker.',
      '5. Kraniyoplasti ve Kapanış: Kemik flebi yerine konulurken donör STA pedikülünün kemik kenarı tarafından ezilmemesi için kemikte geniş bir oluk (notch) açıldığı cerrahla birlikte kontrol edilir.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ, AĞLAMASIZ VE HİPERTANSİYONSUZ UYANDIRMA: Uyanma sırasında öksürme, ıkınma, pediatrik olgularda şiddetli ağlama/hiperventilasyon ve hipertansiyon; taze anastomoz hattından kanamaya, greft vazospazmına veya Serebral Hiperperfüzyon Sendromuna (CHS) yol açar.',
      'Uyanma Sırasında Hemodinamik ve Ağrı Blokajı: Ekstübasyondan 10-15 dakika önce IV Lidokain (1 mg/kg), düşük doz Deksmedetomidin veya titre Esmolol/Labetalol ile sempatik ataklar ve uyanma ajitasyonu önlenir.',
      'SKALP BANDAJI UYARISI: Ameliyat sonunda başa sarılan elastik bandaj donör STA pedikülünün üzerinden geçer; BANDAJ KESİNLİKLE SIKI SARILMAMALIDIR! Aşırı sıkı pansuman donör arteri dışarıdan sıkıştırarak greft trombozuna neden olur.',
      'Erken Nörolojik Değerlendirme: Hasta uyanır uyanmaz motor güç, konuşma ve fokal nörolojik bulgular değerlendirilmeli; defisit varsa greft oklüzyonunu veya CHS\'yi ekarte etmek için acil yatak başı Doppler/görüntüleme planlanmalıdır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi ve STA Güvenliği: Cerrahi kesi hattına lokal anestezik infiltrasyonu yapılırken DONÖR STA GÖVDESİNDEN KESİNLİKLE UZAK DURULMALI ve epinefrinsiz (vazokonstriktörsüz) Ropivakain (≤3 mg/kg) veya Levobupivakain (≤2.5 mg/kg) kullanılmalıdır (kümülatif maksimum mg/kg dozu aşılmamalı, LAST [%20 Lipid Emülsiyonu] hazır olmalıdır) + düzenli IV Parasetamol (erişkinde 1 g q6h; pediatrikte 15 mg/kg q6h).',
      'Güvenli Kurtarıcı Opioid Titrasyonu (TRAMADOL KULLANILMAZ!): Tramadol nöbet eşiğini düşürdüğü ve POBV/kusma tetiklediği için kraniyal cerrahide KESİNLİKLE KULLANILMAZ. Ağrı kaynaklı hipertansiyonu ve çocuklarda ağlama/hiperventilasyonu önlemek için düşük doz titre IV Fentanil (25-50 mcg; pediatrikte 0.5-1 mcg/kg), Oksikodon veya bazal infüzyonsuz Morfin PCA kullanılır.',
      'NSAİİ Kısıtlaması: Taze mikrovasküler anastomoz ve devam eden Aspirin tedavisi nedeniyle erken dönemde rutin NSAİİ (Deksketoprofen dahil — non-selektif COX-1/2 inhibitörüdür!) KULLANILMAZ; yalnızca nöroşirürjik hemostaz ve postop BT doğrulaması sonrası cerrah onayıyla değerlendirilebilir.'
    ],
    prospectRecommendations: [
      'PROSPECT Craniotomy 2023 (Mestdagh et al.): Donör STA pedikülünü koruyan lokal anestezik infiltrasyonu (maks mg/kg ve LAST kurallarına uyarak) ile planlı sistemik Parasetamol temel multimodal analjeziyi oluşturur.',
      'Tramadol ve erken rutin NSAİİ\'den kaçınılır; agresif çift ajan POBV profilaksisi uygulanır.'
    ],
    erasRecommendations: [
      'Yaşa/Bazale Uygun Postoperatif KB Kontrolü: İlk 48-72 saatte erişkinlerde normotansiyon (tipik SKB 120-140 mmHg), pediatrik olgularda yaşa özgü normotansif sınırlar kesintisiz korunur; hem hipotansiyondan (greft trombozu) hem hipertansiyondan (CHS) kaçınılır.',
      'SEREBRAL HİPERPERFÜZYON SENDROMU (CHS) TAKİBİ: Postoperatif 2.-7. günlerde revaskülarize alanda gelişebilecek şiddetli baş ağrısı, fokal nöbet ve nörolojik bozulma CHS belirtisidir; acil KB kontrolü ve Nöro-YBÜ izlemi gerektirir.',
      'Hidrasyon, Glisemi ve Antiagregan Protokolü: Greft açıklığını korumak için izotonik övolemi (Hct >%45 ve Hb <8-9 g/dL önlenerek), glukoz 140-180 mg/dL, normotermi ve Aspirin (81-100 mg/gün) kesintisiz sürdürülür.',
      'Bulantı-Kusma Profilaksisi: Çift antiemetik (Ondansetron + Deksametazon). Öğürme ve kusma intrakraniyel venöz basıncı fırlatarak anastomoz basısı ve kanama riskini katlar!'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2020). Anesthesiologist's Manual of Surgical Procedures (6th ed.). Wolters Kluwer. Section: Neurosurgery — Extracranial-to-Intracranial Bypass (STA-MCA).",
    erasReference: 'Hagan, K. B., Bhavsar, S., Raza, S. M., Arnold, B., Arunkumar, R., Dang, A., et al. (2016). Enhanced recovery after surgery for oncological craniotomies. Journal of Clinical Neuroscience, 24, 10–16.',
    prospectReference: "Mestdagh, F., Lavand'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group (ESRA). (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(5), 301–314.",
    otherReferences: [
      'Gonzalez, N. R., Amin-Hanjani, S., Bang, O. Y., Coffey, C., Du, R., Fierstra, J., et al.; AHA/ASA Stroke Council. (2023). Adult Moyamoya Disease and Syndrome: Current Perspectives and Future Directions: A Scientific Statement From the American Heart Association/American Stroke Association. Stroke, 54(10), e465–e479.',
      'Fujimura, M., Tominaga, T., Kuroda, S., Takahashi, J. C., Endo, H., Ogasawara, K., & Miyamoto, S. (2022). 2021 Japanese Guidelines for the Management of Moyamoya Disease: Guidelines from the Research Committee on Moyamoya Disease and Japan Stroke Society. Neurologia Medico-Chirurgica, 62(4), 165–170.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Perioperative Management of Pediatric and Adult Patients Undergoing Cerebral Revascularization.',
      'Smith, E. R., & Scott, R. M. (2012). Surgical management of Moyamoya disease. Neurosurgical Clinics of North America, 23(1), 101–110.'
    ]
  }
};
