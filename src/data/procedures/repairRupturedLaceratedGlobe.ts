import { ProcedureDefinition } from '../../types/procedures';

/**
 * Açık Küre Travması Onarımı: Glob Rüptürü ve Korneoskleral Laserasyon Primer Mikrocerrahi Onarımı
 * (Repair of Ruptured or Lacerated Globe / Open Globe Injury [OGI] Repair)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), BETTS,
 * Gan et al. 4th PONV Consensus (2020), DAS Difficult Airway & RSI Guidelines, RCoA / RCOphth.
 */
export const repairRupturedLaceratedGlobe: ProcedureDefinition = {
  id: 'repair-ruptured-lacerated-globe',
  name: 'Açık Küre Travması Onarımı: Glob Rüptürü ve Korneoskleral Laserasyon Primer Onarımı',
  shortCode: 'GOZ-GLOB-RUPTUR',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküler Travma & Açık Küre Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Göz küresi dış duvarının (kornea, sklera veya her ikisinin) künt travma sonucu patlaması (glob rüptürü) ya da kesici/delici alet, şarapnel veya yüksek hızlı cisimle tam kat delinmesi (korneoskleral laserasyon, penetran/perforan travma, göz içi yabancı cisim [İOFB]) sonucu gelişen ve acil mikrocerrahi onarım gerektiren en kritik oftalmik acil tablodur. BETTS sınıflamasına göre rüptürler içten dışa patlama, laserasyonlar dıştan içe keskin penetrasyondur. Cerrahi aşamalar: (1) Göze sıfır basıyla örtüleme; (2) 360° konjonktival peritomi ve dört rektus kasının askıya alınarak gizli arka skleral rüptür eksplorasyonu; (3) Kornea ve limbusun 10-0 naylon sütürlerle su geçirmez kapatılması; (4) Skleral yırtığın 8-0/9-0 naylon ile arkaya doğru kapatılması; (5) Viable iris repozisyonu ve nekrotik dokunun debridmanı; (6) Ön kamara rekonstrüksiyonu ve intrakameral/intravitreal antibiyotik profilaksisi.',
  indications: [
    'Tam Kat Korneal, Limbal veya Skleral Laserasyon (Penetran Açık Küre Travması)',
    'Künt Travmaya Bağlı Glob Rüptürü (Hifema, vitreus kanaması, hipotoni, prolabe üvea)',
    'Göz İçi Yabancı Cisim (İOFB) Eşlik Eden Perfore Açık Küre Yaralanması',
    'Perforan (Çift Delikli) Göz Yaralanması',
    'Eski Cerrahi Kesi Hattı Ayrılması (Post-PKP, post-katarakt veya trabekülektomi travmatik dehissensi)'
  ],
  averageDuration: '60 - 150 dakika (İzole kornea laserasyonu: 45-60 dk; Rektus altı kompleks korneoskleral rüptür: 90-150 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 20 - 50 mL (İzole göz travmasında sistemik kan kaybı düşüktür; ancak suprakoroidal kanama gözü kaybettirir; politravmada eşlik eden yaralanmalar ayrıca değerlendirilir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Sistemik Kan Kaybı / Ancak Katastrofik Ekspulsif Koroidal Hemoraji Riski',
    crossMatchRequirement: 'İzole açık kürede rutin kan hazırlığı gerekmez (politravma / kraniyofasiyal travmada T&S / Cross-Match alınır)',
    transfusionProbability: '< %0.01 (İzole oküler travmada)',
    criticalBleedingSources: [
      'Ekspulsif Suprakoroidal Hemoraji: Açık kürede öksürük, ıkınma, maske basısı veya hipertansif pikle arka siliyer arter yırtılması ve tüm göz içeriğinin ekstrüzyonu',
      'İridodiyaliz ve Masif Ön Kamara Hifeması',
      'Siliyer Cisim / Koroid Yırtıklarına Bağlı Vitreus Kanaması'
    ],
    hemostasisStrategies: [
      'İndüksiyon, entübasyon, idame ve uyanma boyunca GİB artışını (öksürük, kusma, hipertansiyon, maske basısı) sıfırlamak',
      'Yırtık korneoskleral kenarların hızla su geçirmez naylon sütürlerle kapatılması',
      'Baş 15° elevasyon ve normotansif/normokapnik hemodinami'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Modifiye Hızlı Ardışık İndüksiyon (Modified RSI) ile Endotrakeal Genel Anestezi (GETA — Propofol + Remifentanil TIVA veya N₂O\'suz Dengeli Anestezi) + Yüksek Doz Rokuronyum (1.2 mg/kg; Sugammadeks 16 mg/kg hazır) + Pürüzsüz Uyanık Ekstübasyon — Açık kürede ALTIN STANDARTTIR'
    ],
    alternative: [
      'MUTLAK KONTRENDİKASYON: Retrobulber, Peribulber veya Sub-Tenon rejyonel bloklar AÇIK KÜRE TRAVMASINDA KESİNLİKLE YASAKTIR! Orbita içine enjekte edilecek birkaç mL hacim intraorbital basıncı fırlatarak vitreus, lens ve retinayı açık yaradan dışarı fışkırtır (ekstrüzyon felaketi)!',
      'Zor Havayolu + Tok Mide Senaryosu: Hayat kurtarıcı hava yolu güvenliği daima gözün korunmasından önce gelir (uyanık nazik video/fiberoptik entübasyon, topikalize + Remifentanil/Deksmedetomidin ile öksürüksüz uygulanır)'
    ],
    clinicalRationale: 'Açık küre travmalarında rejyonel blok hacmi doku ekstrüzyonu yarattığı için mutlak kontrendikedir. Acil travma hastaları ağrı ve stres nedeniyle gecikmiş mide boşalması ("tok mide") kabul edildiğinden, aspirasyon koruması ve tam hareketsizlik için yüksek doz Rokuronyum (1.2 mg/kg + Sugammadeks 16 mg/kg hazır) ile modifiye RSI + kaflı spiralli ETT zorunlu standarttır; tok hastada derin ekstübasyon veya LMA-exchange aspirasyon tehlikesi nedeniyle YASAKTIR.',
    rulesTitle: 'AÇIK KÜRE YARALANMALARINDA ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Açık küre travmasında hayati kurallar: (1) Sıfır göz basısı + rejyonel blok mutlak yasağı; (2) Modifiye RSI: Rokuronyum 1.2 mg/kg 1. tercih + Süksinilkolin/Ketamin nüansı + hayat-göz önceliği; (3) Laringoskopi sempatik yanıtının ve öksürüğün sıfırlanması; (4) TOK HASTADA DERİN EKSTÜBASYON/LMA-EXCHANGE YASAĞI → Smooth Uyanık Ekstübasyon + Çift PONV + Tramadol/Kodein YASAK; (5) N₂O kesin yasağı (intraoküler hava/gaz & pnömosefali); (6) Dört rektus eksplorasyonunda OCR alarmı.',
    indispensableRules: [
      {
        number: 1,
        title: 'SIFIR GÖZ BASISI VE REJYONEL BLOK (RETROBULBER / PERİBULBER / SUB-TENON) MUTLAK YASAĞI',
        content: 'Glob duvarı tam kat açıktır. Preoksijenizasyon sırasında yüz maskesi ASLA göze bastırılmaz (koruyucu sert Fox göz kalkanı cerrahi başlangıca dek çıkarılmaz!). Retrobulber, peribulber ve Sub-Tenon blokları intraorbital hacmi artırarak göz içi dokularını dışarı fışkırtacağı için KESİNLİKLE KONTRENDİKEDİR.'
      },
      {
        number: 2,
        title: 'MODİFİYE RSI: ROKURONYUM 1.2 MG/KG + SUGAMMADEKS VE SÜKSİNİLKOLİN / KETAMİN NÜANSI',
        content: 'Güncel 1. tercih yüksek doz Rokuronyum (1.2 mg/kg; 45-60 sn tam blokaj) + masada hazır Sugammadeks (16 mg/kg) kombinasyonudur. Süksinilkolin ekstraoküler kas tonusuyla GİB\'i geçici 6-10 mmHg yükseltir; ancak açık kürede GİB\'i asıl tehlikeli biçimde fırlatan etken yüzeyel anestezi, öksürme/ıkınma ve laringoskopi yanıtıdır — öngörülen/acil zor havayolunda yaşam ve havayolu güvenliği daima gözün korunmasından önce gelir! Yüksek doz Ketamin nistagmus/GİB artışıyla riskli olduğundan standart indüksiyonda Propofol tercih edilir.'
      },
      {
        number: 3,
        title: 'LARİNGOSKOPİ YANITINI BASKILAMA VE TOF 0/4 TEYİDİ',
        content: 'İndüksiyonda İV Lidokain (1.5 mg/kg) + Remifentanil (1-2 mcg/kg veya infüzyon) / Fentanil (2-3 mcg/kg) + Propofol (2-2.5 mg/kg) ile derin anestezi ve sempatik blokaj sağlanır; video laringoskopi yalnızca tam gevşeme (TOF 0/4) sonrası yapılır. Öğürme tetikleyen sert krikoid basıdan kaçınılır.'
      },
      {
        number: 4,
        title: 'TOK HASTADA DERİN EKSTÜBASYON / LMA-EXCHANGE YASAK → SMOOTH UYANIK EKSTÜBASYON!',
        content: 'Tok mide kabul edilen açık küre travması hastasında derin plan ekstübasyon veya LMA değişimi MASİF PULMONER ASPİRASYON riski nedeniyle KESİNLİKLE UYGULANMAZ! Bunun yerine koruyucu hava yolu refleksleri geri dönmüş, tam uyanık ama öksürmeyen "Smooth Awake Extubation" uygulanır: Düşük doz Remifentanil (0.03-0.05 mcg/kg/dk) veya Deksmedetomidin + İV Lidokain (1.5 mg/kg) + Sugammadeks (TOF ≥0.9) + çiftli PONV profilaksisi (Deksametazon + Ondansetron).'
      },
      {
        number: 5,
        title: 'AZOT PROTOKSİT (N₂O) YASAĞI VE İOFB\'DE MRG KONTRENDİKASYONU',
        content: 'Ön/arka kamarada travmatik veya cerrahi hava/gaz kabarcığı ve yüksek enerjili kafa travmasında pnömosefali olabileceğinden N₂O KESİNLİKLE YASAKTIR. Metalik intraoküler yabancı cisim (İOFB) dışlanmadan MRG çekilmesi KESİNLİKLE KONTRENDİKEDİR (ince kesit kontrastsız orbita/kafa BT çekilir).'
      },
      {
        number: 6,
        title: 'REKTUS EKSPLORASYONUNDA OCR VE POSTOP TRAMADOL / KODEİN YASAĞI',
        content: 'Gizli arka skleral rüptür araması için dört rektus kası askıya alınırken derin OCR (bradikardi/asistoli) gelişebilir (1. adım cerrahı durdur → 2. adım normokapni → 3. adım İV Atropin 0.5 mg). Postoperatif kusma 10-0 kornea/sklera dikişlerini patlatır → TRAMADOL ve KODEİN KULLANILMAZ!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküler Travma Konsültasyonu: BETTS sınıflaması, ışık hissi (LP), RAPD, prolabe üvea, İOFB şüphesi ve eşlik eden travmalar.',
      'Radyoloji: İnce kesit kontrastsız Orbita ve Kafa BT (İOFB şüphesinde MRG KESİN KONTRENDİKEDİR!).',
      'Beyin Cerrahisi / KBB / Travma Ekibi: Eşlik eden kafa tabanı kırığı, intrakraniyal kanama, servikal omurga veya maksillofasiyal travma şüphesinde.',
      'Anestezi Acil Değerlendirmesi: Son yemek saati (gastrik USG gereğinde #infografik=gastric-usg-perlas), zor havayolu, politravma ve tetanoz/antibiyotik durumu.'
    ],
    historyAndPhysical: [
      'Travma Mekanizması: Künt darbe, kesici/delici alet, yüksek hızlı metal çapak (İOFB alarmı) veya ateşli silah/patlama.',
      'Tok Mide / Aspirasyon Riski: Travma anında mide boşalması durur — yemek saati ne olursa olsun tok kabul edilir (ancak elektif olmayan acil açık kürede açlık için saatlerce gecikme endoftalmi/ekstrüzyon riski nedeniyle genellikle yapılmaz; cerrahla aciliyet zamanlaması koordine edilir).',
      'Tetanoz ve Sistemik Antibiyotik Profilaksisi: Tetanoz aşısı/TIG ve İV geniş spektrumlu antibiyotik (endoftalmi profilaksisi) zamanlaması.',
      'Eşlik Eden Kafa/Servikal Travma ve Antikoagülan Öyküsü.'
    ],
    laboratoryAndTests: [
      'Klinik Endikasyona Göre: Tam Kan Sayımı, koagülasyon (antikoagülan veya politravmada), biyokimya/KŞ ve politravmada T&S / Cross-Match.',
      'Kontrastsız Orbita ve Kafa BT (metalik İOFB ve kemik kırığı tespiti).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (OCR bradikardi izlemi), SpO₂, EtCO₂, NIBP ve Sıcaklık.',
      'Kantitatif Nöromusküler Monitörizasyon (TOF): Entübasyondan glob tamamen kapanana dek TOF 0/4; ekstübasyon öncesi Sugammadeks ile TOF ≥0.9.',
      'EtCO₂ Kontrolü: Sıkı normokapni (EtCO₂ 35-38 mmHg — hiperkapni koroidal konjesyon ve GİB artışı yapar).',
      'Hemodinami: Laringoskopi ve eksplorasyonda hipertansif piklerin engellenmesi (bazal KB ±%15).'
    ],
    vascularAccess: [
      '1-2 adet geniş lümenli periferik IV damar yolu (18G; politravmada 16-18G x2).',
      'Acil İlaçlar Masada Hazır: Sugammadeks (16 mg/kg kurtarma dozu), İV Atropin (0.5 mg), İV Lidokain, Esmolol/Labetalol ve antiemetikler.'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, 15° Ters Trendelenburg ve Sıfır Göz Basısı',
    patientPositionDetails: [
      'Baş silikon donut yastıkla nötral sabitlenir; jugüler venöz bası sıfırdır.',
      '15° ters Trendelenburg (baş yukarı) eğimi oküler venöz basıncı ve pasif regürjitasyon riskini azaltır.',
      'Sert koruyucu göz kalkanı (Fox eye shield) indüksiyon ve entübasyon tamamlanıp cerrah başlayana kadar göz üzerinde kalır.'
    ],
    anesthesiaManagement: [
      'Preoksijenizasyon:',
      '  - %100 O₂ ile 3-5 dk spontan solunumla preoksijenizasyon; yüz maskesi ASLA göze temas ettirilmez (sadece nazal köprü/yanak/çene hattına hafif temas).',
      'Modifiye RSI İndüksiyon Protokolü:',
      '  - İV Lidokain (1.5 mg/kg) + Remifentanil (1-1.5 mcg/kg yavaş bolus veya infüzyon) / Fentanil (2-3 mcg/kg) — laringoskopik GİB pikini bloke eder.',
      '  - İV Propofol (2.0-2.5 mg/kg — GİB\'i düşürür; hemodinamik şoktaki politravmada Etomidat [miyoklonus önlenerek] değerlendirilir).',
      '  - İV Rokuronyum (1.2 mg/kg): 45-60 saniyede hızlı tam paralizi; acil "entübe edilemez/ventile edilemez" için Sugammadeks 16 mg/kg hazır.',
      '  - Video laringoskop ile TOF 0/4 teyidi sonrası atravmatik, tek geçişte entübasyon.',
      'İdame (N₂O KESİN YASAK!):',
      '  - Propofol + Remifentanil TIVA (en düşük PONV riski ve pürüzsüz uyanma!) veya Hava/O₂ içinde Sevofluran.',
      '  - AZOT PROTOKSİT (N₂O) KESİNLİKLE KULLANILMAZ.',
      '  - Glob kapanana kadar TOF 0/4 sürdürülür; 4 rektus eksplorasyonunda OCR alarmı.'
    ],
    airwayManagement: [
      'Spiralli (zırhlı) kaflı endotrakeal tüp cerrahi tarafın karşı ağız köşesinden sağlam flasterlenir.',
      'Kaf basıncı 20-25 cmH₂O kontrol edilir; orogastrik tüp gerekirse glob tamamen kapandıktan sonra ve derin anestezide (öğürmesiz!) nazikçe mide boşaltılabilir.'
    ],
    criticalSurgicalStages: [
      '1. Göz Kalkanının Korunmasıyla Modifiye RSI, Video Laringoskopi ve 15° Baş Elevasyonu.',
      '2. Göz Kalkanının Kaldırılması, Basısız Kapak Askı Sütürleri ve Nazik Sulu %5 Povidon-İyot.',
      '3. 360° Konjonktival Peritomi ve 4 Rektus Kasının Askıya Alınması (Gizli rüptür araması — YÜKSEK OCR RİSKİ!).',
      '4. Kornea ve Limbus İşaret Noktalarının 10-0 Naylon ile Kapatılması.',
      '5. Prolabe Üveal Dokunun Repozisyonu / Debridmanı ve Skleral Yırtığın 8-0/9-0 Naylon ile Kapatılması.',
      '6. Ön Kamara Rekonstrüksiyonu, Seidel Kaçak Testi ve İntrakameral/İntravitreal Antibiyotik.',
      '7. Konjonktiva Kapanışı ve Basısız Sert Plastik/Metal Koruyucu Kalkan (Fox Shield).'
    ],
    emergenceNotes: [
      'SMOOTH UYANIK EKSTÜBASYON ZORUNLUDUR: Tok travma hastasında derin plan ekstübasyon veya LMA-exchange MASİF ASPİRASYON riski nedeniyle KESİNLİKLE YAPILMAZ!',
      'Öksürüksüz uyanık ekstübasyon protokolü: Düşük doz Remifentanil infüzyonu (0.03-0.05 mcg/kg/dk) veya Deksmedetomidin + İV Lidokain (1.5 mg/kg) eşliğinde Sugammadeks ile TOF ≥0.9 doğrulandıktan sonra, hasta sözel komutlara yanıt verip hava yolu refleksleri tam döndüğünde nazikçe ekstübe edilir.',
      'Çiftli PONV Profilaksisi: İV Deksametazon (4-8 mg) + Ondansetron (4 mg) eksiksiz uygulanır.',
      'Ameliyat edilen göze baskılı pansuman YAPILMAZ; sert delikli koruyucu göz kalkanı (Fox eye shield) gevşekçe bantlanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Açık küre travması onarımı sonrası orta-şiddetli oküler ağrı gelişebilir ve ağrıya bağlı hipertansiyon/huzursuzluk GİB\'i yükseltir.',
      'Bazal Analjezi: Düzenli İV/Oral Parasetamol (1000 mg 6 saatte bir).',
      'KAÇINILACAK AJANLAR: TRAMADOL ve KODEİN şiddetli PONV tetikleyerek 10-0 korneoskleral dikişleri patlatabileceğinden KULLANILMAZ! Erken dönemde hifema/koroid kanama riski nedeniyle agresif antiplatelet etkili NSAİİ ve aspirinden kaçınılır.',
      'Şiddetli Kurtarma Ağrısı: Mikro-doz titre İV Fentanil (25 mcg) + kurtarma antiemetik (farklı sınıf, örn. düşük doz Droperidol/Haloperidol veya Metoklopramid).'
    ],
    prospectRecommendations: [
      'Acil oküler travma cerrahisi için yayımlanmış özel bir PROSPECT (ESRA) kılavuzu bulunmamaktadır; 4th PONV Consensus (2020) ve oftalmik travma anestezi standartları doğrultusunda:',
      '  - Propofol TIVA + ikili/üçlü antiemetik profilaksisi + Parasetamol bazlı opioid-sparing analjezi, öğürme/kusma kaynaklı dikiş dehissensini ve re-ekstrüzyonu önlemenin temelidir.'
    ],
    erasRecommendations: [
      'Postoperatif Açık Küre Koruma İlkeleri:',
      '  - Yatak İstirahati ve 30° Baş Elevasyonu: İntraoküler venöz basıncı düşürür ve hifemanın ön kamara tabanına çökmesini sağlar.',
      '  - Valsalva Önlemleri: Öksürük baskılanması, ıkınmayı önlemek için gaita yumuşatıcı (laksatif) ve sürekli koruyucu göz kalkanı kullanımı zorunludur.',
      '  - Enfeksiyon Profilaksisi: Sistemik geniş spektrumlu antibiyotik ve tetanoz bağışıklığı tamamlanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Repair of Ruptured or Lacerated Globe. Wolters Kluwer / LWW.',
    erasReference: 'Vachon CA, Warner DO, Bacon DR. Succinylcholine and the open globe: tracing the teaching. Anesthesiology. 2003;99(1):220-223 & RCoA / RCOphth Ophthalmic Anaesthesia Safety Standards.',
    prospectReference: 'Acil açık küre travması için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve PONV yönetimi 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'Kuhn F, Morris R, Witherspoon CD, Mester V. The Birmingham Eye Trauma Terminology system (BETT). J Fr Ophtalmol. 2004;27(2):206-210.',
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.',
      'Frerk C, Mitchell VS, McNarry AF, et al. Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults. Br J Anaesth. 2015;115(6):827-848.'
    ]
  }
};
