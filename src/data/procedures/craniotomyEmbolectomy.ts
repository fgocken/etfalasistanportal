import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: Açık Mikrocerrahi Serebral Embolektomi (Kurtarma Revaskülarizasyonu)
 * 
 * Jaffe (6th ed., 2020), AHA/ASA Acute Ischemic Stroke Guidelines (Powers et al., 2018 / 2019 Update),
 * ENCHANTED2/MT (Lancet 2022), OPTIMAL-BP (JAMA 2023), PATCH (Lancet 2016), SNACC,
 * ERAS (Hagan et al., 2016) ve PROSPECT Craniotomy 2023 (Mestdagh et al.) referans alınarak yapılandırılmıştır.
 */
export const craniotomyEmbolectomy: ProcedureDefinition = {
  id: 'craniotomy-embolectomy',
  name: 'Kraniyotomi: Serebral Embolektomi (Açık Mikrocerrahi Kurtarma)',
  shortCode: 'SEREBRAL-EMBOLEKTOMİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Serebrovasküler Nöroşirürji / Akut İskemik İnme Cerrahisi',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'NOT: Akut büyük damar oklüzyonlarının (LVO) >%99\'unda standart birinci basamak tedavi Endovasküler Mekanik Trombektomidir (EVT — standart bakım için ayrı "Endovasküler Mekanik Trombektomi [EVT]" protokolüne başvurunuz). Bu protokol yalnızca EVT\'nin teknik olarak başarısız/imkansız olduğu veya intrakraniyel cerrahi/girişim sırasında iyatrojenik akut arter tıkanması gelişen ÇOK NADİR olgularda uygulanan açık mikronöroşirürjikal kraniyotomi ve mikro-arteriyotomi ile kurtarma embolektomisini kapsar.',
  indications: [
    'Başarısız veya Ulaşılamayan Endovasküler Trombektomi (EVT) Kurtarma Olguları: Aşırı vasküler kıvrımlılık (tortuosity), kalsifiye aortik ark veya erişim imkansızlığı nedeniyle EVT\'nin yapılamadığı ya da stent-retriever/aspirasyon denemelerinin başarısız kaldığı (mTICI 0-1) çok seçilmiş nadir vakalar',
    'İntraoperatif / İyatrojenik Tromboemboli: İntrakraniyel anevrizma kliplemesi, kafa tabanı cerrahisi veya tanısal/girişimsel kateterizasyon esnasında intrakraniyel artere (özellikle MCA M1/M2 bifurkasyonuna) akut trombüs atması ve ani damar tıkanması gelişmesi',
    'Büyük Damar Oklüzyonu (LVO) ve Kurtarılabilir İskemik Penumbra Varlığı: ASPECTS skoru ≥6 olan, BT/MR perfüzyonda geniş kurtarılabilir penumbra saptanan ve endovasküler çıkarım mümkün olmayan nadir olgular',
    'Sert / Organize Kardiyoembolik veya Kalsifiye Emboliler: Endovasküler cihazlarla yakalanamayan kalsifiye kapak veya kardiyak miksoma kaynaklı sert tıkayıcı emboli olguları'
  ],
  averageDuration: '3 - 5 saat (Zaman kritik ultra-acil indüksiyon — "Time is Brain": 10-15 dk, A-line/CVC cerrahi hazırlıkla eşzamanlı yerleştirilir; Acil frontotemporal/pteriyonal kraniyotomi ve dural açılış: 45-60 dk; Sylvian fissür diseksiyonu, MCA/ICA bifurkasyonuna ulaşım, geçici klempleme ve mikro-arteriyotomi ile embolektomi: 60-120 dk; Mikro-Doppler/ICG kontrolü, 10-0 arteriyotomi onarımı, hemostaz ve kapanış: 45-60 dk)',

  // 1.5) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 600 mL (Kontrollü mikrocerrahi koşullarında); ancak hastaların önemli bir bölümü öncesinde İV TROMBOLİTİK (Alteplase / Tenekteplase) veya anjiyo ünitesinde sistemik Heparin almış olabileceğinden skalp/dural sızıntı veya hemorajik transformasyon riski yüksektir.',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Trombolitik Kanama vs Akut Arteriyotomi Re-Trombozu Dengesi',
    crossMatchRequirement: 'En az 2 - 4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite Taze Donmuş Plazma (TDP) Cross-Match hazır bekletilmeli; önceden IV tPA/TNK alan olgularda YALNIZCA hayatı tehdit eden kontrolsüz kanama için Kriyopresipitat (10 Ünite) kan bankasında erişilebilir olmalıdır (RUTİN TXA VE RUTİN TROMBOSİT TRANSFÜZYONU ÖNERİLMEZ!)',
    transfusionProbability: '%25 - %45 (Preoperatif sistemik IV tPA/TNK almış olgularda kanama ve ürün ihtiyacı artabilir)',
    criticalBleedingSources: [
      'Mikro-Arteriyotomi Kesi Hattı ve Dikiş Sızıntısı: MCA veya ICA arter duvarı açılıp pıhtı çıkarıldıktan sonra 9-0 / 10-0 monofilament dikişlerle kapatılan arter lümeninden sızıntı veya arteriyel kanama',
      'Akut Reperfüzyon Kanaması ve Hemorajik Transformasyon: Tıkalı ana arter açıldığında iskemik endotel hasarına uğramış kan-beyin bariyerinde aşırı hipertansiyonla parankim içi hematom gelişimi',
      'Preoperatif Sistemik IV Trombolitik (tPA/TNK) Etkisi: Fibrinojen tüketimi ve sistemik litik durum nedeniyle skalp flebi, temporal kas ve dural yüzeylerde diffüz sızıntı (oozing)',
      'Sylvian Venöz Pleksus ve Derin Kortikal Venler: Acil diseksiyon sırasında venöz traksiyon hasarı',
      'Temporal/Frontal Kemik Diploik Venleri ve A. temporalis superficialis dalları'
    ],
    hemostasisStrategies: [
      'RUTİN TXA VE RUTİN TROMBOSİT TRANSFÜZYONU KONTRENDİKEDİR: Akut arteriyel revaskülarizasyon / mikro-arteriyotomi sırasında rutin Traneksamik Asit (TXA) veya rutin Trombosit transfüzyonu KATASTROFİK MCA RE-TROMBOZUNA yol açar! PATCH (Lancet 2016) çalışması doğrultusunda antiagregan kullanan hastalarda hayatı tehdit eden aktif kontrolsüz kanama olmadıkça trombosit transfüzyonu YAPILMAZ.',
      'Seçilmiş Trombolitik Kanama Yönetimi: Preoperatif IV tPA/TNK almış hastada YALNIZCA cerrahi kontrol sağlanamayan, hayatı tehdit eden aktif masif kanama ve düşük fibrinojen (<150-200 mg/dL) varlığında cerrahla ortak kararla hedefli Kriyopresipitat (veya fibrinojen konsantresi) değerlendirilir.',
      'Heparin Yönetimi: Anjiyo ünitesinde yüksek doz heparin uygulanmış ve aktif kontrolsüz cerrahi kanama varsa ACT/aPTT rehberliğinde dikkatli/kısmi Protamin titrasyonu cerrahla koordine edilir (taze arteriyotomide aşırı/rutin reversalden kaçınılır).',
      'Topikal Hemostatikler: Bipolar mikro-koagülasyon, nazik pamuk kompresyonu, jelatin matriks (FloSeal) ve arteriyotomi çevresinde lümeni daraltmadan ince fibril/doku yapıştırıcı desteği.'
    ]
  },

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Uçucu İnhalasyon Anesteziği (<0.5 MAC Sevofluran): Serebral otoregülasyonu ve iskemik penumbra perfüzyonunu koruyan, CMRO2 düşüren dengeli rejim'
    ],
    alternative: [
      'Etomidat İndüksiyonu + Titre Opioid Tabanlı Anestezi (Remifentanil/Fentanil + Düşük MAC Sevofluran): Ciddi hemodinamik instabilite veya düşük EF\'li akut inme hastalarında indüksiyon hipotansiyonunu önlemek için'
    ],
    clinicalRationale: 'Propofol + Remifentanil TIVA veya <0.5 MAC Sevofluran, iskemik penumbra perfüzyonunu koruyarak CMRO2 düşüşü sağlar. Azot protoksit (N2O) KESİNLİKLE KONTRENDİKEDİR. Kesin normokapni (PaCO2 35-38 mmHg) ve aspirasyon koruması (akut inmede mide dolu kabul edilir → RSI) için spiral telli (armored) orotrakeal entübasyon zorunludur.',
    notes: 'AÇIK MİKROCERRAHİ EMBOLEKTOMİDE TEMEL İLKELER (Standart >%99 LVO için EVT protokolüne bakınız): (1) "TIME IS BRAIN" — A-line, CVC veya İONM kurulumu için revaskülarizasyon ASLA geciktirilmez; periferik vazopressörle derhal başlanır; (2) KAN BASINCI (ENCHANTED2/MT & OPTIMAL-BP) — Rekanalizasyon sonrası agresif SKB 110-130 hedeflenmez (zararlıdır!); SKB <180 mmHg (tipik 140-160 mmHg; <120-130\'dan kaçınarak) korunur; (3) RUTİN TXA VE TROMBOSİT YASAĞI (PATCH — akut MCA re-trombozu riski); (4) NORMOKAPNİ, NORMOTERMİ (36.0-37.0°C) VE GLİSEMİ (140-180 mg/dL).',
    rulesTitle: 'AÇIK SEREBRAL EMBOLEKTOMİDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: '"TIME IS BRAIN": İNVAZİV HATLAR VE İONM İÇİN REVASKÜLARİZASYONU GECİKTİRME!',
        content: 'SNACC önerisi gereği indüksiyon öncesi zorlu A-line, CVC veya İONM kurulumu nedeniyle zaman kaybedilmez! Geniş periferik venöz hattan dilüe vazopressör (Fenilefrin / Noradrenalin) eşliğinde derhal RSI uygulanır; Tragus seviyesinde sıfırlanmış A-line ve gerekirse CVC cerrahi hazırlıkla EŞZAMANLI yerleştirilir.'
      },
      {
        number: 2,
        title: 'REKANALİZASYON ÖNCESİ VE SONRASI KAN BASINCI (ENCHANTED2/MT & OPTIMAL-BP)',
        content: 'Rekanalizasyon öncesi hipotansiyondan kesinlikle kaçınılır (SKB 140-180 mmHg; IV tPA/TNK verilmişse SKB <180/105 mmHg). Rekanalizasyon sonrasında ENCHANTED2/MT (Lancet 2022 — zarar nedeniyle erken durduruldu) ve OPTIMAL-BP (JAMA 2023) gereği agresif hipotansiyon (SKB 110-130) UYGULANMAZ; hedef SKB <180 mmHg (tipik 140-160 mmHg; <120-130 mmHg\'den kesinlikle kaçınılır)!'
      },
      {
        number: 3,
        title: 'RUTİN TXA VE RUTİN TROMBOSİT TRANSFÜZYONU YASAĞI (PATCH 2016)',
        content: 'Akut arteriyotomi ve revaskülarizasyon sırasında rutin TXA veya rutin trombosit transfüzyonu (PATCH Lancet 2016) KATASTROFİK MCA RE-TROMBOZUNA yol açar! Yalnızca tPA/TNK sonrası hayatı tehdit eden kontrolsüz masif kanama ve düşük fibrinojende hedefli Kriyopresipitat düşünülür.'
      },
      {
        number: 4,
        title: 'NORMOKAPNİ, HİPERTONİK SALİN TERCİHİ, SIKI NORMOTERMİ VE GLİSEMİ',
        content: 'PaCO2 35-38 mmHg normokapnik tutulur (profilaktik hiperventilasyon penumbrayı enfarkta çevirir!). Ozmoterapi gerekirse hipovolemi yaratmamak için Mannitol yerine %3 Hipertonik Salin tercih edilir. Vücut ısısı kesinlikle 36.0-37.0°C (tPA ile hipotermiden kaçınılır), glukoz 140-180 mg/dL, N2O ve hipotonik/dekstrozlu sıvılar YASAKTIR.'
      }
    ]
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    consultations: [
      'Nöroloji / Nörogirişimsel Radyoloji Konsültasyonu: Semptom başlangıç saati (Son normal görülme zamanı - LSN), NIHSS skoru, ASPECTS skoru, IV tPA/Tenekteplase saati, başarısız EVT ayrıntıları ve hedef damar oklüzyon düzeyinin anlık değerlendirilmesi.',
      'Girişimsel Anjiyografi Ekibi ile Koordinasyon: Kateter laboratuvarında verilen sistemik heparin dozu, intra-arteriyel ajanlar ve damar diseksiyonu/perforasyon varlığının teyidi.',
      'Nöro-Yoğun Bakım Konsültasyonu: Acil cerrahi sonrası mekanik ventilasyon ve saatlik nörolojik takip için acil YBÜ yatak rezervasyonu.'
    ],
    historyAndPhysical: [
      'Semptom Başlangıç Zamanı ("Time is Brain"): Kurtarılabilir penumbra dokusu dakika bağımlıdır; preoperatif hazırlık hiçbir şekilde cerrahiye başlangıcı geciktirmemelidir.',
      'Nörolojik Defisit Derecesi (NIHSS): Pupiller reaksiyon, anizokori ve bilateral ışık refleksi unkal herniasyon riski açısından saniyeler içinde kaydedilir.',
      'Aspirasyon Riski ve Mide Doluluğu: Akut inme hastalarında bulbar disfonksiyon ve aciliyet nedeniyle mide tam dolu kabul edilir; Hızlı Seri İndüksiyon (RSI) zorunludur.',
      'Kardiyovasküler Anamnez: Atriyal fibrilasyon (AF), mekanik kapak, sol ventrikül trombüsü, yakın zamanda geçirilmiş Mİ veya karotis stenozu sorgulanır.'
    ],
    laboratoryAndTests: [
      'Koagülasyon Profili (PT, aPTT, INR, Fibrinojen): Preoperatif IV tPA/TNK uygulanmışsa bazal fibrinojen düzeyi istenir (ancak sonuç beklenerek cerrahi GECİKTİRİLMEZ!).',
      'Acil Kan Grubu ve Cross-Match: En az 2 - 4 Ünite ES + 2 Ünite TDP (rutin trombosit transfüzyonu planlanmaz).',
      'Arteriyel Kan Gazı, Bazal Laktat ve Kan Şekeri: Hiperglisemi (>180 mg/dL) ve hipoglisemi (<70 mg/dL) iskemik infarkt alanını genişletir; hedef kesinlikle 140 - 180 mg/dL\'dir.',
      'Serum Elektrolitleri (Özellikle Na+ ve K+): Hiponatremi beyin ödemini ağırlaştırır; normonatremi (138-145 mEq/L) hedeflenir.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arteriyel Kan Basıncı (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu / Foramen Monro) Seviyesinde Sıfırlanmış: Baş elevasyonunda doğru CPP ölçümü için transdüser yalnızca Tragus seviyesinde sıfırlanır. "TIME IS BRAIN" KURALI: İndüksiyon öncesi ilk denemede hızlıca takılamıyorsa cerrahiyi ASLA geciktirme — NIBP (2-3 dk aralıkla) + periferik vazopressörle derhal indükle, A-line\'ı cerrahi hazırlıkla EŞZAMANLI yerleştir!',
      'Santral Venöz Kateter (CVC): İndüksiyonu geciktirmemek kaydıyla yalnızca gerekirse cerrahi hazırlık sırasında veya postop YBÜ\'de yerleştirilir; acil başlangıçta geniş periferik damaryolundan dilüe vazopressör (SNACC önerisi) güvenle başlanır.',
      'İntraoperatif Nöromonitörizasyon (İONM): Acil revaskülarizasyonu ASLA geciktirmeyecekse selektif EEG/SSEP düşünülebilir; İONM kurulumu için kesinlikle zaman kaybedilmez.',
      'Mikro-Vasküler Doppler USG ve İndosiyanin Yeşili (ICG) Video-Anjiyografi: Trombüs çıkarılıp arter kapatıldıktan sonra damar içi akımın (rekanalizasyon) ve perforatörlerin açık olduğunun intraoperatif teyidi.',
      'Sürekli End-Tidal CO2 (EtCO2) ve Seri Arteriyel Kan Gazı (ABG): Bazal hedef sıkı normokapnidir (PaCO2 35 - 38 mmHg). Rutin profilaktik hiperventilasyon KESİNLİKLE YAPILMAZ (penumbrayı vazokonstriksiyonla enfarkta çevirir!); yalnızca akut herniasyon/tıkız beyinde kısa süreli kurtarma (30-35 mmHg) düşünülür.',
      'Sürekli Isı Takibi ve Kan Şekeri: Sıkı NORMOTERMİ (36.0 - 37.0°C — özellikle tPA almış hastada hipotermiden kesinlikle kaçınılır!) ve kan şekeri 140 - 180 mg/dL takibi.',
      'Isı Problu Foley İdrar Sondası (cerrahi başlangıcı geciktirmeden).'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı periferik damar yolu (14G veya 16G) — biri üzerinden indüksiyonla eşzamanlı dilüe vazopressör (Fenilefrin/Noradrenalin) infüzyonu hemen başlatılır (SNACC).',
      'İnvaziv Radial Arter Kateteri (Tragus/Foramen Monro seviyesinde sıfırlanmış — zaman kaybettirmeden, gerekirse indüksiyon sonrası eşzamanlı).',
      'Santral Venöz Kateter (CVC): Gerekli ise yalnızca revaskülarizasyonu geciktirmeyecek aşamada.'
    ],
    patientPosition: 'Supine (Sırtüstü), baş Mayfield 3 çivili başlık veya nöroşirürji halkasında lezyon karşı tarafına 30-45 derece hafif rotasyonda; serebral venöz dönüşü rahatlatmak için 15 derece Reverse Trendelenburg.',
    patientPositionDetails: [
      'Boyun Rotasyonu ve Venöz Drenaj: Başın 45 dereceden fazla döndürülmesi ipsilateral juguler veni basıya uğratarak serebral perfüzyon basıncını düşürür ve beyin şişmesine yol açar; çene ile sternum arasında en az 2 parmak mesafe korunmalıdır.',
      'Mayfield Çivisi Uygulaması: Hipertansif atakları engellemek için çivi giriş yerlerine lokal anestezik (maksimum mg/kg ve LAST kurallarına uyarak) infiltrasyonu ve ek bolus analjezi uygulanır.',
      'Gözlerin Korunması: Bağımlı kalan göze bası olmaması için koruyucu göz merhemi ve bası önleyici pedler yerleştirilir.'
    ],
    anesthesiaManagement: [
      'Ultra-Acil Zaman Kritik RSI (Time-Critical RSI): Mide doluluğuna karşı hızlı seri indüksiyon; hipotansiyon yaratmayacak ajanlar (Etomidat 0.2-0.3 mg/kg veya titre Propofol + Fentanil 2-3 mcg/kg + Rokuronyum 1-1.2 mg/kg) ve geniş periferik hattan derhal hazır dilüe vazopressör (Noradrenalin/Fenilefrin) desteği.',
      'İdame, Gaz ve Sıvı Yönetimi: Propofol + Remifentanil TIVA (veya <0.5 MAC Sevofluran). Azot protoksit (N2O) KESİNLİKLE KONTRENDİKEDİR. Yalnızca izotonik kristaloidler (%0.9 NaCl veya dengeli izotonik Plasmalyte/İzolen) ile övolemi korunur; hipotonik (Ringer Laktat dahil) ve dekstroz içeren sıvılar KULLANILMAZ.',
      'İKİ AŞAMALI KAN BASINCI PROTOKOLÜ (AHA/ASA, ENCHANTED2/MT Lancet 2022 & OPTIMAL-BP JAMA 2023):',
      '  - (1) REKANALİZASYON ÖNCESİ: İskemik penumbra kollaterallerini yaşatmak için hipotansiyondan KESİNLİKLE kaçınılır (SKB 140 - 180 mmHg / bazal MAP korunur). Hasta IV tPA/Tenekteplase almışsa SKB < 180/105 mmHg üst sınırı aşılmaz!',
      '  - (2) REKANALİZASYON SONRASI: ENCHANTED2/MT (zarar nedeniyle erken durduruldu) ve OPTIMAL-BP çalışmaları gereği agresif kan basıncı düşürülmesi (SKB 110-130 mmHg / MAP <80) KESİNLİKLE YAPILMAZ! Hedef SKB < 180 mmHg olup pratikte tipik olarak SKB 140 - 160 mmHg aralığında pürüzsüz tutulur (SKB < 120-130 mmHg\'ye düşmekten kaçınılır).',
      'Beyin Gevşemesi (Hipertonik Salin Tercihi) ve Solunum: Ozmoterapi gerekirse Mannitol\'ün ozmotik diürezle yaratacağı hipovolemi ve penumbra kollapsından kaçınmak için %3 Hipertonik Salin (2-3 mL/kg IV) Mannitol\'e tercih edilir. PaCO2 sıkı normokapnik (35-38 mmHg) tutulur.',
      'Sıkı Normotermi ve Glisemi: Vücut ısısı kesinlikle 36.0 - 37.0°C korunur — hipotermiden (<36.0°C) KESİNLİKLE KAÇINILIR (IV tPA ile koagülopatiyi/kanamayı ağırlaştırır ve faydası yoktur). Kan şekeri 140 - 180 mg/dL aralığında tutulur.',
      'Kanama Yönetimi (TXA & Trombosit Uyarısı): Akut MCA re-trombozu riski nedeniyle rutin TXA ve rutin trombosit transfüzyonu (PATCH 2016) UYGULANMAZ; yalnızca tPA sonrası hayatı tehdit eden kontrolsüz kanama ve düşük fibrinojende (<150-200 mg/dL) cerrahla birlikte Kriyopresipitat değerlendirilir.'
    ],
    airwayManagement: [
      'Güvenli Orotrekeal Entübasyon: Fleksibl spiral telli (armored) endotrakeal tüp ile cerrahi sahayı ve mikroskop hareketlerini engellemeyecek şekilde karşı ağız köşesinden sağlam tespit.',
      'Venöz Dönüşün Korunması: Tüp tespit bantları ve flasterler juguler venöz dönüşü engelleyecek şekilde boyun venlerini sıkmamalıdır.',
      'Postoperatif Ekstübasyon Stratejisi: Büyük iskemik alan, rekanalizasyon sonrası beyin ödemi/dekompresyon riski ve yakın YBÜ izlemi gerektiğinden hastaların çoğunluğu ameliyat masasında ekstübe edilmez; sedatize ve entübe halde Nöro-YBÜ\'ye nakledilir.'
    ],
    criticalSurgicalStages: [
      'Acil Kraniyotomi ve Dural Açılış: Dura açıldığında iskemik parankim şişkin olabilir; masif ödem ve herniasyon bulguları varsa cerrah dekompresif hemikraniektomi kararını değerlendirir.',
      'Sylvian Fissür Diseksiyonu ve Tıkalı Arterin Belirlenmesi: MCA bifurkasyonu veya M1 gövdesine ulaşılırken derin perforatör lentikülostriat dalların korunması hayati önem taşır.',
      'Geçici Arteriyel Klempleme: Trombüsün proksimal ve distaline geçici mikroklipsler yerleştirilir; iskemi süresi anestezi ekibi tarafından sesli olarak sayılır.',
      'Mikro-Arteriyotomi ve Embolektomi: Arter açılarak pıhtı çıkarılır; taze embolus patolojik/mikrobiyolojik incelemeye gönderilir.',
      'Arteriyotomi Onarımı ve Rekanalizasyon Anı: 10-0 dikişlerle arter kapatılır, geçici klipsler açılır ve mikro-Doppler/ICG ile akım teyit edilir. Bu anda SKB <180 mmHg (tipik 140-160 mmHg; <120-130 mmHg hipotansiyondan kaçınarak) dengeli ve pürüzsüz yönetilir!',
      'Kemik Flebinin Durumu (Kraniyoplasti vs Dekompresif Kraniektomi): Malign ödem bulgusu varsa kemik flebi yerine konulmaz, kraniektomi olarak kapatılır.'
    ],
    emergenceNotes: [
      'Hastalar çoğunlukla yoğun bakım takibi için entübe tutulur; uyanık devredilecek seçilmiş sınırlı olgularda öksürük ve ıkınma (bucking) tamamen engellenmelidir.',
      'Hemodinamik Stabilite: Hem şiddetli hipertansiyon pikleri (SKB >180 mmHg — hemorajik transformasyon riski) hem de agresif hipotansiyon (<120-130 mmHg — ikincil penumbra iskemisi/re-tromboz) önlenir.',
      'Erken Nörolojik Muayene: Ekstübe edilen veya sedasyonu hafifletilen hastada pupiller refleks, motor defisit ve GKS hızla değerlendirilir.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    painManagement: [
      'Bölgesel Skalp Sinir Blokajı / İnsizyonel İnfiltrasyon: Cerrahi bitiminde uygulanan skalp bloğu veya insizyonel infiltrasyon (Ropivakain ≤3 mg/kg veya Levobupivakain/Bupivakain ≤2.5 mg/kg [epinefrinli ≤3 mg/kg]; maksimum mg/kg dozu aşılmamalı ve LAST [%20 Lipid Emülsiyonu] hazır olmalıdır) insizyon ağrısını ve opioid ihtiyacını azaltır.',
      'Sistemik Non-Opioid Analjezi: IV Parasetamol (1 g q6h) düzenli bazal analjezik olarak verilir.',
      'Güvenli Kurtarıcı Opioid Titrasyonu (TRAMADOL KULLANILMAZ!): Tramadol nöbet eşiğini düşürdüğü ve şiddetli POBV tetiklediği için kraniyal cerrahide KESİNLİKLE KULLANILMAZ. Yalnızca şiddetli atılım ağrısında nörolojik izlemi gölgelemeyecek düşük doz titre IV Fentanil (25 mcg), Oksikodon veya bazal infüzyonsuz Morfin PCA kullanılır.',
      'NSAİİ Kesin Kontrendikasyonu: Taze arteriyel revaskülarizasyon ve hemorajik transformasyon riski nedeniyle erken dönemde NSAİİ (Deksketoprofen dahil — non-selektif COX-1/2 inhibitörüdür!) KULLANILMAZ; yalnızca hemostaz ve kontrol BT sonrası cerrah onayıyla değerlendirilebilir.'
    ],
    prospectRecommendations: [
      'PROSPECT Craniotomy 2023 (Mestdagh et al.): Skalp sinir blokajı / insizyonel lokal anestezik infiltrasyonu (maks mg/kg ve LAST kurallarına uyarak) ile düzenli sistemik Parasetamol (1 g IV q6h) temel analjeziyi oluşturur.',
      'Tramadol ve erken NSAİİ\'den kaçınılır; nörolojik muayeneyi maskelemeyen mikro-doz kurtarıcı opioid ve çift ajan POBV profilaksisi uygulanır.'
    ],
    erasRecommendations: [
      'Güncel Post-Rekanalizasyon Kan Basıncı Hedefi (ENCHANTED2/MT & OPTIMAL-BP): SKB <180 mmHg (tipik 140-160 mmHg) korunur; agresif tansiyon düşüşünden (SKB <120-130 mmHg) kesinlikle kaçınılır.',
      'Erken Kontrol Beyin BT / BT Anjiyografi: Hemorajik transformasyon, malign ödem ve damar açıklığı için erken görüntüleme yapılır.',
      'Normoglisemi ve Normotermi: Kan şekeri 140 - 180 mg/dL aralığında, vücut ısısı 36.0 - 37.0°C (<37.5°C) idame ettirilir.',
      'Antikoagülan / Antiplatelet Zamanlaması: Trombüs nüksünü önleme ile hemorajik transformasyon riski arasında multidisipliner konsey kararıyla (genellikle postop 24 saat kontrol BT temizse) başlanır.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2020). Anesthesiologist's Manual of Surgical Procedures (6th ed.). Wolters Kluwer. Section: Neurosurgery — Craniotomy for Cerebral Revascularization and Embolectomy.",
    erasReference: 'Hagan, K. B., Bhavsar, S., Raza, S. M., Arnold, B., Arunkumar, R., Dang, A., et al. (2016). Enhanced recovery after surgery for oncological craniotomies. Journal of Clinical Neuroscience, 24, 10–16.',
    prospectReference: "Mestdagh, F., Lavand'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group (ESRA). (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(5), 301–314.",
    otherReferences: [
      'Powers, W. J., Rabinstein, A. A., Ackerson, T., Adeoye, O. M., Bambakidis, N. C., Becker, K., et al. (2019). Guidelines for the Early Management of Patients With Acute Ischemic Stroke: 2019 Update to the 2018 Guidelines for the Early Management of Acute Ischemic Stroke: A Guideline for Healthcare Professionals From the American Heart Association/American Stroke Association. Stroke, 50(12), e344–e418.',
      'Yang, P., Song, L., Zhang, Y., Zhang, X., Chen, X., Li, Y., et al.; ENCHANTED2/MT Investigators. (2022). Intensive blood pressure control after endovascular thrombectomy for acute ischaemic stroke (ENCHANTED2/MT): a multicentre, open-label, blinded-endpoint, randomised controlled trial. The Lancet, 400(10363), 1585–1596.',
      'Nam, H. S., Kim, Y. D., Heo, J., Lee, H., Jung, J. W., Choi, J. K., et al.; OPTIMAL-BP Trial Investigators. (2023). Intensive vs Conventional Blood Pressure Lowering After Endovascular Thrombectomy in Acute Ischemic Stroke: The OPTIMAL-BP Randomized Clinical Trial. JAMA, 330(9), 832–842.',
      'Baharoglu, M. I., Cordonnier, C., Al-Shahi Salman, R., de Gans, K., Koopman, M. M., Brand, A., et al.; PATCH Investigators. (2016). Platelet transfusion versus standard care after acute stroke due to spontaneous cerebral haemorrhage associated with antiplatelet therapy (PATCH): a randomised, open-label, phase 3 trial. The Lancet, 387(10038), 2605–2613.',
      'Talke, P. O., Sharma, D., Heyer, E. J., Bergese, S. D., Blackham, K. A., & Stevens, R. D.; Society for Neuroscience in Anesthesiology and Critical Care (SNACC). (2014). SNACC Expert Consensus Statement: Anesthetic Management of Endovascular Treatment for Acute Ischemic Stroke. Journal of Neurosurgical Anesthesiology, 26(2), 95–108.'
    ]
  }
};
