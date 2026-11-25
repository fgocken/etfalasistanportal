import { ProcedureDefinition } from '../../types/procedures';

/**
 * Katarakt Cerrahisi ve Göz İçi Lens İmplantasyonu: Fakoemülsifikasyon (FAKO) Yöntemi ile İntraoküler Lens (İOL) Yerleşimi
 * (Cataract Extraction with Intraocular Lens Insertion / Phacoemulsification)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth Joint Guidelines (2012),
 * Schein et al. (NEJM 2000), ASA OR Fire Practice Advisory (2013), AAO PPP: Cataract in the Adult Eye, ESCRS.
 */
export const cataractExtractionIolInsertion: ProcedureDefinition = {
  id: 'cataract-extraction-iol-insertion',
  name: 'Katarakt Cerrahisi ve Göz İçi Lens İmplantasyonu: Fakoemülsifikasyon (FAKO) Yöntemi ile İntraoküler Lens (İOL) Yerleşimi',
  shortCode: 'GOZ-FAKO-IOL',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Ön Segment & Mikrocerrahi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Saydamlığını kaybederek görme keskinliğini bozan doğal göz merceğinin (lens), ultrasonik titreşimlerle çalışan fakoemülsifikasyon (FAKO) probu ile mikroskobik parçalara ayrılarak aspire edilmesi ve boşaltılan kapsül kesesi içerisine yapay katlanabilir intraoküler lensin (İOL: monofokal, multifokal veya torik lens) implante edilmesi ameliyatıdır. Temporal veya süperior saydam korneadan yapılan 2.2 - 2.8 mm\'lik mikro insizyonla ön kamaraya girilir. Ön kamara viskoelastik madde (sodyum hiyalüronat) ile doldurularak endotel korunur. Ön kapsülden dairesel bir pencere açılır (kapsüloreksis), hidrodisseksiyon ile lens çekirdeği kapsülden serbestleştirilir. FAKO probu ile nükleus parçalanıp temizlenir, epinükleus ve korteks kalıntıları aspire edilir. Kapsül kesesi içine enjektör kartuşuyla katlanabilir İOL yerleştirilir ve sentre edilir. Viskoelastik madde aspire edildikten sonra kornea kesi dudakları stromanın hidrasyonu (stromal hidrasyon) ile sütürsüz, kendiliğinden kapanır hale getirilir; intrakameral sefuroksim ile endoftalmi profilaksisi tamamlanır.',
  indications: [
    'Senil ve Nükleer / Kortikal Katarakt: Yaşa bağlı lens opasifikasyonu, görme keskinliğinde azalma, kontrast kaybı ve parlama şikayeti',
    'Matür ve Hipermatür (Beyaz) Katarakt: İleri derecede yoğunlaşmış, görmeyi el hareketleri düzeyine indiren sert lensler',
    'Sekonder ve Komplike Katarakt: Üveit, diyabet, travma veya uzun süreli sistemik/topikal kortikosteroid kullanımına bağlı lens opasiteleri',
    'Fakomorfik ve Fakolitik Glokom: Şişen lensin ön kamara açısını daraltarak akut göz içi basıncı (GİB) artışına yol açması',
    'Psödoeksfoliyasyon Sendromu (PEX) ile Birlikte Katarakt: Zayıf zonül yapısı ve dar pupilla ile seyreden yüksek riskli kataraktlar'
  ],
  averageDuration: '15 - 35 dakika (Standart komplikasyonsuz olgular: 15-20 dk; Psödoeksfoliyasyon, küçük pupilla, matür katarakt veya arka sineşi olguları: 30-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 10 mL (Saydam korneal kesiden yapıldığı için avaskülerdir ve rutin olgularda ihmal edilebilir düzeydedir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal / İhmal Edilebilir Düzey (Ancak Ekspulsif Koroidal Hemoraji Potansiyel Felaket Riski Taşır)',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S veya Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Ekspulsif Suprakoroidal / Koroidal Hemoraji: Göz küresi açıkken ani GİB düşüşü veya hastanın öksürmesi/ıkınması sonucu arka siliyer arterlerin yırtılmasıyla gelişen ve göz içi dokularının dışarı fırlamasına yol açan katastrofik arteriyel kanama',
      'İris Kökü Kanaması (Hifema): İris yırtılması veya pupiller sineşi açılması esnasında küçük damarların açılması',
      'Retrobulber / Peribulber İğne Hematomu: İğneli blok esnasında oftalmik ven veya arter dallarının delinmesiyle retrobulber alanda gelişen kompresif hematom (Orbital Kompartman Sendromu)'
    ],
    hemostasisStrategies: [
      'Göz içi viskoelastik tamponad (OVD) ve ön kamaranın hızla basınçlandırılması',
      'Ekspulsif kanama şüphesinde cerrahın korneal kesiyi derhal 10-0 naylon sütürle kapatması veya arka skleral dekompresyon insizyonu',
      'Kan basıncının bazal değere yakın normotansif tutulması ve ani hipertansif krizlerin (ağrı/anksiyete/dolu mesane/hiperkapni) önlenmesi',
      'Akut retrobulber hematom / Orbital Kompartman Sendromu gelişirse altın pencere (<60-90 dk) içinde acil lateral kantotomi + inferior kantolizis + 30° baş elevasyonu + IV Mannitol (1-2 g/kg) + IV Asetazolamid (500 mg)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Topikal Anestezi (Proparakain %0.5 / Oksibuprokain) + Koruyucusuz İntrakameral Lidokain %1 + Minimal Bilinçli Sedasyon (MAC) veya Sedasyonsuz Takip — Modern katarakt cerrahisinde DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Sub-Tenon Bloğu (Künt Kanül ile İğnesiz Fasyal Blok): Antikoagülan kullanan veya aksiyel uzunluğu >26 mm (yüksek miyopi / posterior stafilom) olan hastalarda mükemmel analjezi ve akinezi sağlayan en güvenli rejyonel tekniktir',
      'Peribulber Blok (Kısa İğne ile EKSTRAKONAL Enjeksiyon): Kooperasyonu zayıf veya akinezi gereken seçilmiş hastalarda (intrakonal olan Retrobulber bloktur; yüksek miyopide [>26 mm] iğneli bloklar glob perforasyonu riski nedeniyle KONTRENDİKEDİR!)',
      'Genel Anestezi (Laringeal Maske [LMA] veya ETT): İleri demans, kontrolsüz Parkinson/esansiyel baş tremoru, ağır ortopne/kifoz, mental retardasyon veya şiddetli klostrofobisi olan hastalarda'
    ],
    clinicalRationale: 'Topikal damla + koruyucusuz intrakameral lidokain ve minimal MAC, iğneli blok komplikasyonlarını (glob perforasyonu, retrobulber hemoraji, beyin sapı anestezisi) ve geriatrik popülasyonda genel anesteziye bağlı kardiyopulmoner stres ile ekstübasyon öksürüklerini önlediği için altın standarttır. Hava yolu doğal spontan solunumda korunur; örtü altına kurulan medikal hava veya düşük FiO₂ (≤%30) çadır sistemi klostrofobi, CO₂ birikimi ve ameliyathane yangın riskini aynı anda önler.',
    rulesTitle: 'KATARAKT CERRAHİSİNDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Topikal/MAC katarakt cerrahisinde temel güvenlik eksenleri: (1) Okülokardiyak refleks alarmı; (2) Açık korneal kesi sırasında öksürük/ıkınma ve ekspulsif hemoraji önlemi; (3) İğneli bloklarda beyin sapı anestezisi, yüksek miyopide (>26 mm) perforasyon yasağı ve retrobulber hematom acil kantotomi paketi; (4) Aşırı sedasyondan kaçınma ve ASA OR Yangın Üçgeni güvenliği (FiO₂ ≤%30); (5) Tamsulosin / IFIS hazırlığı ve oftalmik damla (Fenilefrin %2.5 vs %10) toksisite koruması.',
    indispensableRules: [
      {
        number: 1,
        title: 'OKÜLOKARDİYAK REFLEKS (ASCHNER–DAGNİNİ) VE ANİ VAGAL DURAKLAMA',
        content: 'Ekstraoküler kaslara bası, göze spekulum takılması veya glob traksiyonu trigemino-vagal refleksi (CN V oftalmik dal → CN X vagus) tetikleyerek ani bradikardi, nodal ritim, AV blok veya asistoli yaratabilir. 1. basamak derhal cerraha "TRAKSİYONU BIRAK" uyarısı vermektir; 2. basamak hiperkapni/hipoksi kontrolü; düzelmezse İV Atropin 0.5 mg (veya Glikopirolat 0.2 mg) uygulanır. Rutin profilaktik Atropin önerilmez; refleks tekrarlayan uyarılarda yorulma (fatigability) gösterir.'
      },
      {
        number: 2,
        title: 'GÖZ KÜRESİ AÇIKKEN ÖKSÜRÜK, IKINMA VE EKSPULSİF KOROİDAL HEMORAJİ',
        content: 'Kornea kesilip ön kamara açıldığında göz küresi açık hale gelir. Hastanın aniden öksürmesi, hapşırması, başını oynatması veya ıkınması oküler venöz basıncı fırlatarak arka siliyer arter yırtılmasına (ekspulsif koroidal kanama) ve kalıcı görme kaybına yol açabilir. Hasta öksürük hissettiğinde cerraha haber vermesi için önceden eğitilmeli; aşırı sedasyonla uykuya dalıp aniden sıçrayarak uyanması kesinlikle engellenmelidir.'
      },
      {
        number: 3,
        title: 'İĞNELİ BLOK RİSKLERİ: YÜKSEK MİYOPİ (>26 MM) YASAĞI, BEYİN SAPI ANESTEZİSİ VE RETROBULBER HEMATOM',
        content: 'Peribulber blok EKSTRAKONAL, retrobulber blok İNTRAKONAL enjeksiyondur. Aksiyel uzunluğu >26 mm (yüksek miyopi / posterior stafilom) olan gözlerde iğneli blok glob perforasyonu riskini ~30 kat artırdığı için KONTRENDİKEDİR (topikal veya künt Sub-Tenon seçilir). İğneli blok sonrası 2-10 dk içinde kontralateral körlük, afoni, apne ve kollaps gelişirse BEYİN SAPI ANESTEZİSİ tanısıyla anında hava yolu ve kardiyak destek sağlanır; akut retrobulber hematomda <60-90 dk içinde acil lateral kantotomi + inferior kantolizis + 30° baş elevasyonu + IV Mannitol + IV Asetazolamid uygulanır.'
      },
      {
        number: 4,
        title: 'ASA AMELİYATHANE YANGIN ÜÇGENİ VE AŞIRI SEDASYON TUZAĞI',
        content: 'Yüz ve göz çevresi MAC cerrahisinde örtü altında yüksek akımlı %100 O₂ birikimi + koter/lazer kullanımı ameliyathane yüz yanıklarının 1 numaralı nedenidir! Örtü altına medikal hava veya FiO₂ ≤%30 verilmeli, koter gerekirse O₂ ≥1 dk önceden kesilerek havalandırma yapılmalı ve alkol bazlı antiseptik yerine sulu %5 Povidon-İyot kullanılmalıdır. Derin sedasyon (kontrolsüz Propofol bolusları) hipoventilasyon, hiperkapni ve ani sıçrayarak uyanmaya yol açtığı için YASAKTIR.'
      },
      {
        number: 5,
        title: 'OFTALMİK DAMLA SİSTEMİK TOKSİSİTESİ VE HİPERTANSİYONDA NTG YASAĞI',
        content: 'Midriyazis için %10 yerine daima %2.5 Fenilefrin damla kullanılmalıdır (%10 Fenilefrin hipertansif kriz, koroner spazm ve akciğer ödemi yapabilir; tedavisinde non-selektif beta-bloker KULLANILMAZ!). Göz içi açık cerrahide hipertansiyon gelişirse önce ağrı, anksiyete, hiperkapni ve dolu mesane dışlanır; ilaç gerekirse kısa etkili İV Labetalol, Esmolol veya Nikardipin titre edilir — İV Nitrogliserin (NTG) koroidal vazodilatasyon ve GİB artışı riski nedeniyle tercih edilmez.'
      },
      {
        number: 6,
        title: 'İNTRAOPERATİF GEVŞEK İRİS SENDROMU (IFIS) — TAMSULOSİN ÖYKÜSÜ',
        content: 'Prostat hipertrofisi için Tamsulosin veya diğer alfa-1 antagonistlerini (geçmişte bile) kullanan hastalarda iris gevşekçe dalgalanır, pupilla hızla daralır ve iris fako ucuna aspire olabilir. İlacın kesilmesi IFIS\'i önlemez; preoperatif sorgulamada tespit edilip cerraha bildirilmeli, intrakameral fenilefrin/adrenalin ve Malyugin halkası / iris kancaları hazır bulundurulmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Ön Segment Muayenesi: Biyomikroskopi, kornea endotel durumu, zonül gevşekliği (PEX), aksiyel uzunluk (yüksek miyopi >26 mm kontrolü) ve İOL biyometrisi.',
      'Kardiyoloji / İç Hastalıkları (Yalnızca Klinik Endikasyonda): Dekompanse kalp yetmezliği, yeni/kararsız anjina, ağır semptomatik aritmi veya kontrolsüz malign hipertansiyon (KB ≥180/110 mmHg + hedef organ hasarı) varlığında istenir; stabil ASA II–III hastalarda katarakt cerrahisi için rutin kardiyoloji konsültasyonu GEREKMEZ.',
      'Anestezi Değerlendirmesi: Sırtüstü yatma toleransı (ortopne, ağır kifoz, kronik öksürük), kognitif kooperasyon, alfa-1 bloker (IFIS) ve oftalmik damla öyküsü.'
    ],
    historyAndPhysical: [
      'Alfa-1 Antagonisti İlaç Öyküsü: Tamsulosin, Silodosin, Alfuzosin, Doksazosin veya Terazosin kullanımı (IFIS riski — ilacı kesmek yarar sağlamaz, cerraha önceden bildirim zorunludur).',
      'Antikoagülan / Antiagregan Yönetimi (RCoA/RCOphth & ASRA 2025): Saydam korneal topikal FAKO ve künt Sub-Tenon blokta Aspirin, Klopidogrel, Warfarin (terapötik INR aralığında) ve DOAC\'ların KESİLMESİ GEREKMEZ; kesilmeleri tromboembolik inme/stent trombozu riskini artırır. İğneli blok planlanıyorsa ASRA/RCoA eşikleri kontrol edilir.',
      'Oftalmik Damla Öyküsü: Topikal Timolol (bradikardi/bronkospazm), Brimonidin (sedasyon/hipotansiyon) ve eski/nadir Ekotiyofat iyodür (psödokolinesteraz inhibisyonu → genel anestezide Süksinilkolin/Mivakuryum uzamış apnesi).',
      'Sırtüstü Yatamama, Kronik Öksürük ve Dolu Mesane: Operasyon öncesi mesane boşaltılmalı; ağır kifoz/ortopnede yastık ve rulo desteği planlanmalıdır.'
    ],
    laboratoryAndTests: [
      'RUTİN PREOPERATİF LABORATUVAR VE EKG İSTENMEZ! (Schein NEJM 2000 [19.557 hasta RCT], AAO Choosing Wisely ve ASA Advisory: Düşük riskli katarakt cerrahisinde rutin TKS, koagülasyon, biyokimya ve EKG perioperatif komplikasyonları azaltmaz.)',
      'Yalnızca Klinik Endikasyon Bazlı Tetkikler: Warfarin kullananlarda güncel INR (terapötik aralık teyidi), diyabetiklerde vaka günü parmak ucu kan şekeri (hedef <200-250 mg/dL; ketoasidoz/hiperosmolarite dışlaması), diüretik/Asetazolamid kullananlarda K⁺ ve yeni kardiyak semptom varlığında 12 derivasyonlu EKG.',
      'Oftalmolojik Ölçümler: Bazal GİB tonometrisi ve optik biyometri (aksiyel uzunluk >26 mm yüksek miyopi uyarısı).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (OCR bradikardi ve aritmi izlemi), SpO₂, NIBP (5 dakikada bir), sedasyon veriliyorsa nazal EtCO₂ (kapnografi).',
      'Solunum Eforu ve Göğüs Hareketlerinin Gözlenmesi: Örtü altı hipoventilasyon, apneik solunum duraklaması veya CO₂ birikiminin fiziksel ve kapnografik takibi.',
      'Sözel Temas ve Nörolojik Kooperasyon: Uyanık hastada ses tonu, ağrı, anksiyete ve mesane doluluğu belirtilerinin izlenmesi.'
    ],
    vascularAccess: [
      '1 adet güvenli periferik intravenöz yol (20-22G) — tercihen ameliyat edilecek gözün karşı tarafındaki koldan (RCoA/RCOphth: sedasyon veya iğneli blok yapılacaksa IV yol zorunludur).',
      'Acil İlaçlar Hazır: İV Atropin (0.5 mg), Efedrin, Labetalol/Esmolol ve blok yapılıyorsa %20 Lipid Emülsiyonu (LAST) ulaşılabilir.'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Destekli ve Nötral',
    patientPositionDetails: [
      'Baş "donut" silikon halka veya oyuk baş desteğine sabitlenir; başın sağa/sola rotasyonu engellenir.',
      'Ağır kifozu veya ortopnesi olan hastalarda sırt/diz altına kama yastıklar konularak yüz ameliyat mikroskobuna paralel hale getirilir.',
      'ÖRTÜ ALTI HAVA SİRKÜLASYONU VE YANGIN GÜVENLİĞİ: Cerrahi örtü L-bar / çadır ile kaldırılır; örtü altına 4-6 L/dk MEDİKAL HAVA (veya SpO₂ gerektiriyorsa FiO₂ ≤%30) verilerek hem CO₂ birikimi hem de O₂ zenginleşmesine bağlı yangın riski önlenir.',
      'Göz kapakları tel blefarosta ile nazikçe açılır; aşırı gerdirme okülokardiyak refleksi tetikleyebilir.'
    ],
    anesthesiaManagement: [
      'Topikal ve İntrakameral Anestezi Protokolü:',
      '  - Ameliyattan 15-20 dakika önce: Proparakain %0.5 veya Oksibuprokain damla.',
      '  - Pupil Dilatasyonu: Tropikamid %1 + Fenilefrin %2.5 damla (sistemik hipertansif kriz riski nedeniyle %10 Fenilefrin KULLANILMAZ; punktum basısı ile sistemik emilim azaltılır).',
      '  - Kesi Yapıldıktan Hemen Sonra: Ön kamaraya 0.2 - 0.5 mL KORUYUCUSUZ (Preservative-free) Lidokain %1 yavaşça enjekte edilir.',
      'Sedasyon ve Monitörize Anestezi Bakımı (MAC):',
      '  - Birçok hasta yalnızca sözlü güven telkini ("vocal local") ile sedasyonsuz güvenle opere edilebilir.',
      '  - Gerekirse ultra-hafif anksiyoliz: Midazolam 0.5 - 1.0 mg İV yavaş bolus (geriatrik hastalarda deliryum riski nedeniyle minimal doz) ve/veya Fentanil 25 mcg İV.',
      '  - DERİN SEDASYONDAN (kontrolsüz Propofol bolusları) KESİNLİKLE KAÇINILMALIDIR! Derin uyuyan hasta aniden sıçrayarak uyanırsa arka kapsül yırtılır ve nükleus vitreusa düşer.',
      'Okülokardiyak Refleks (OCR) Yönetimi:',
      '  - Bradikardi anında 1. adım cerrahı durdurmak, 2. adım normokapni/oksijenizasyon kontrolü, 3. adım düzelmezse İV Atropin 0.5 mg.',
      'İntraoperatif Hipertansiyon Yönetimi:',
      '  - İlk basamak: Ağrı (ek topikal/intrakameral lidokain), anksiyete, örtü altı hiperkapni ve dolu mesane dışlanır.',
      '  - Sistolik KB >180 mmHg veya bazalin >%25-30 üzerinde dirençli seyrederse kısa etkili İV Labetalol (5-10 mg), Esmolol (10-20 mg) veya Nikardipin titre edilir. İV Nitrogliserin (NTG) koroidal venöz vazodilatasyon ve GİB artışı riski nedeniyle göz içi açık cerrahide TERCİH EDİLMEZ.',
      'Öksürük Krizi Alarmı:',
      '  - Hasta öksürük hissettiğinde cerraha "DUR" demesi için önceden eğitilir; aletler gözden çekildikten sonra kontrollü öksürük izni verilir.'
    ],
    airwayManagement: [
      'Topikal/MAC anestezide hava yolu spontan solunumdadır; ASA OR Fire Advisory gereği rutin yüksek akımlı O₂ yerine örtü altına medikal hava (veya hipoksemi varsa FiO₂ ≤%30) verilir.',
      'Koter kullanımı gerekirse oksijen en az 1 dakika önceden kesilir ve örtü altı havalandırılır; antisepside sulu %5 Povidon-İyot kullanılır (alkol bazlı solüsyon YASAK).',
      'Genel anestezi gereken nadir olgularda Laringeal Maske (LMA) ve pürüzsüz uyanma (smooth emergence) tercih edilir.'
    ],
    criticalSurgicalStages: [
      '1. Taraf Doğrulaması (OD/OS), İOL Numarası Teyidi, Baş Pozisyonu ve Örtü Altı Medikal Hava Çadırının Kurulması.',
      '2. Topikal Anestezi Damlası ve Sulu %5 Povidon-İyot Antisepsisi.',
      '3. Blefarosta Takılması (Okülokardiyak refleks kontrolü!).',
      '4. Şeffaf Korneal Mikroinsizyon (2.2-2.8 mm) ve Parasentez Girişleri.',
      '5. Ön Kamaraya Viskoelastik Madde ve Koruyucusuz İntrakameral Lidokain %1 Verilmesi.',
      '6. Sürekli Dairesel Kapsüloreksis (CCC) ve Hidrodisseksiyon.',
      '7. Fakoemülsifikasyon Fazı: Nükleusun ultrasonik enerjiyle kırılıp emilmesi (Sıfır hareket ve öksürük yasağı!).',
      '8. Korteks Temizliği (İrrigasyon / Aspirasyon).',
      '9. Katlanabilir İOL\'nin Kapsül Kesesi İçine Enjeksiyonu ve Santralizasyonu.',
      '10. Viskoelastik Maddenin Boşaltılması, İntrakameral Sefuroksim (ESCRS endoftalmi profilaksisi) ve Stromal Hidrasyonla Kesi Kapanışı.'
    ],
    emergenceNotes: [
      'Topikal/MAC cerrahide uyanma süreci yoktur; PADSS kriterlerini karşılayan hasta kısa gözlem sonrası refakatçisiyle taburcu edilir.',
      'Ameliyat edilen göze basısız şeffaf plastik koruyucu kalkan (eye shield) takılır; gözün ovuşturulması kesinlikle engellenir.',
      'Genel anestezi uygulanan nadir olgularda öksürük/ıkınmayı sıfırlamak için İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil/Deksmedetomidin + çift PONV profilaksisi (Deksametazon + Ondansetron) uygulanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Hafif / Minimal Ağrı Yönetimi:',
      '  - Fakoemülsifikasyon sonrası ağrı minimaldir; hafif batma ve yabancı cisim hissi normaldir.',
      '  - Gerektiğinde Oral Parasetamol (500-1000 mg). Opioidlere (özellikle Tramadol/Kodein) ihtiyaç yoktur ve bulantı-kusma/deliryum riski nedeniyle kaçınılır.',
      '  - KIRMIZI BAYRAK: Şiddetli zonklayıcı baş-göz ağrısı + bulantı gelişirse analjezik verilmeden önce AKUT GİB ARTIŞI (viskoelastik kalıntısı/pupil bloğu) veya endoftalmi açısından acil oftalmolojik değerlendirme ve tonometri yapılmalıdır!'
    ],
    prospectRecommendations: [
      'Oftalmik cerrahi için yayımlanmış özel bir PROSPECT (ESRA) kılavuzu bulunmamaktadır; RCoA/RCOphth, AAO ve 4th PONV Consensus ilkeleri doğrultusunda:',
      '  - Topikal anestezi + koruyucusuz intrakameral lidokain kombinasyonu sistemik analjezik ve opioid gereksinimini ortadan kaldırır.',
      '  - Sedatif ve opioidlerin minimalize edilmesi geriatrik deliryumu, PONV\'yi ve taburculuk gecikmesini önler.'
    ],
    erasRecommendations: [
      'Günübirlik Oftalmik Cerrahi (Day-Surgery / RCoA-RCOphth & SAMBA) İlkeleri:',
      '  - Hızlı Taburculuk: PADSS ≥9 kriteriyle ameliyattan 30-60 dakika sonra oral sıvı alarak refakatçisiyle taburcu edilir.',
      '  - Pozisyon ve Basınç Kısıtlamaları: İlk 48 saat öne aşırı eğilmekten, ağır kaldırmaktan ve ıkınmaktan (Valsalva) kaçınılır.',
      '  - Enfeksiyon ve Travma Koruması: İlk 1 hafta uyurken koruyucu plastik kalkan takılır; göze su değdirilmez; topikal antibiyotik ve steroid damlalar düzenli kullanılır.',
      '  - Endoftalmi Alarmı: Ani görme azalması, artan kızarıklık, çapaklanma veya şiddetli ağrıda acil başvuru eğitimi verilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Cataract Extraction with Intraocular Lens Insertion. Wolters Kluwer / LWW.',
    erasReference: 'Kumar CM, Eke T, Dodds C, et al. Local anaesthesia for ophthalmic surgery — Joint guidelines from the Royal College of Anaesthetists (RCoA) and the Royal College of Ophthalmologists (RCOphth). 2012.',
    prospectReference: 'Oftalmik cerrahi için yayımlanmış özel bir PROSPECT kılavuzu yoktur; perioperatif analjezi ve PONV stratejisi RCoA/RCOphth (2012) ve 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'Schein OD, Katz J, Bass EB, et al. The value of routine preoperative medical testing before cataract surgery. N Engl J Med. 2000;342(3):168-175.',
      'American Society of Anesthesiologists (ASA) Task Force on Operating Room Fires. Practice Advisory for the Prevention and Management of Operating Room Fires. Anesthesiology. 2013;118(2):271-290.',
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Cataract in the Adult Eye.',
      'European Society of Cataract and Refractive Surgeons (ESCRS) Guidelines for Prevention and Treatment of Endophthalmitis Following Cataract Surgery.',
      'Chang DF, Campbell JR. Intraoperative floppy iris syndrome associated with tamsulosin. J Cataract Refract Surg. 2005;31(4):664-673.',
      'Kopp SL, Vandermeulen E, et al. ASRA Pain Medicine Evidence-Based Guidelines (5th ed.). Reg Anesth Pain Med. 2025.'
    ]
  }
};
