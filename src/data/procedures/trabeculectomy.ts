import { ProcedureDefinition } from '../../types/procedures';

/**
 * Trabekülektomi: Korunan Skleral Flep ve Antimetabolit (Mitomisin C / 5-FU) Eşliğinde Glokom Filtrasyon Cerrahisi
 * (Trabeculectomy / Guarded Filtration Surgery with MMC / 5-FU)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Glaucoma Procedures: Trabeculectomy, pp. 858-864),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP) Guidelines: Primary Open-Angle Glaucoma,
 * European Glaucoma Society (EGS) Terminology and Guidelines for Glaucoma,
 * Ophthalmic Anesthesia Society (OAS) ve Türk Oftalmoloji Derneği (TOD) Glokom Birimi Protokolleri referans alınarak hazırlanmıştır.
 */
export const trabeculectomy: ProcedureDefinition = {
  id: 'trabeculectomy',
  name: 'Trabekülektomi: Korunan Skleral Flep ve Antimetabolit (MMC / 5-FU) Eşliğinde Glokom Filtrasyon Cerrahisi',
  shortCode: 'GOZ-TRABEKULEKTOMI',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Glokom & Ön Segment Filtrasyon Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Maksimum tolere edilebilir medikal tedaviye ve/veya lazer trabeküloplastiye (SLT/ALT) rağmen göz içi basıncı (GİB) hedef düzeye düşürülemeyen veya görme alanı/optik sinir lifi kaybı ilerleyen glokom hastalarında, aköz hümörün ön kamaradan subkonjonktival/sub-Tenon mesafeye kontrollü drenajını sağlayarak yeni bir filtre edici yastıkçık (filtrasyon blebi) oluşturulması ameliyatıdır. Mikrocerrahi aşamaları: (1) Üst konjonktiva ve Tenon kapsülü forniks veya limbus tabanlı diseke edilir; (2) Episklera ve skleral flep yatağına skarlaşmayı/fibrozisi engellemek amacıyla antimetabolit (Mitomisin C [MMC, 0.2 - 0.4 mg/mL] veya 5-Fluorourasil [5-FU]) emdirilmiş mikro-süngerler 1-3 dakika uygulanır ve bol BSS ile yıkanır; (3) Yaklaşık 3x3 mm veya 4x4 mm ebatlarında yarım kat (parsiyel kalınlıkta / guarded) skleral flep disseksiyonu yapılır; (4) Yan parasentez açılarak ön kamara kontrolü sağlanır; (5) Kelly punch veya mikro-bıçak ile trabeküler ağ ve Schlemm kanalı bloğu çıkarılır (trabekülektomi penceresi); (6) İrisin iç ostiyumu tıkamasını önlemek için periferik cerrahi iridektomi (PI) yapılır; (7) Skleral flep aköz hümör akış direncini titre edecek şekilde 10-0 naylon gevşetilebilir (releasable/çekilebilir) veya ayarlanabilir sütürlerle kapatılır; (8) Tenon ve konjonktiva su geçirmez (watertight) biçimde dikilerek subkonjonktival filtrasyon blebi şekillendirilir.',
  indications: [
    'Primer Açık Açılı Glokom (POAG): Maksimum 3-4\'lü topikal/sistemik medikal tedaviye rağmen ilerleyici optik nöropati ve kontrolsüz GİB',
    'Psödoeksfolyatif Glokom (PXG) ve Pigmenter Glokom: Dirençli yüksek GİB ve geniş basınç dalgalanmaları gösteren sekonder açık açılı glokomlar',
    'Kronik Açı Kapanması Glokomu: Periferik ön sineşiler (PAS) nedeniyle trabeküler ağın tıkandığı ve iridotomiye yanıt vermeyen olgular',
    'Normal Basınçlı Glokom (NTG): Çok düşük hedef GİB (örn: < 10-12 mmHg) gerektiren ve dokümante edilmiş görme alanı daralması olan hastalar',
    'Sekonder Glokomlar ve Jüvenil/Konjenital Glokom: Üveitik (inaktif dönemde), psödofakik veya post-travmatik glokom olguları'
  ],
  averageDuration: '45 - 75 dakika (Katarakt cerrahisi ile kombine fako-trabekülektomide süre 75 - 100 dakikaya uzayabilir)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 15 mL (Yalnızca konjonktival damarlar, episklera ve periferik iridektomi esnasında iristen sızan mikro-damarsal kanamalar)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Açık Kürede Katastrofik Ekspulsif Koroidal Hemoraji Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Ekspulsif Suprakoroidal Hemoraji: Kelly punch ile trabeküler blok çıkarıldığında veya periferik iridektomide ani intraoküler dekompresyon (GİB\'in aniden 0 mmHg\'ye düşmesi) ve eşlik eden öksürük/ıkınma/hipertansiyon sonucu arka siliyer arterlerin yırtılması (gözün tamamen kaybına yol açabilecek en korkulan felaket)',
      'Ön Kamara Hifeması: Periferik iridektomide iris kök damarlarının veya skleral flep yatağındaki skleral venlerin kanaması',
      'Konjonktival ve Episkleral Hematom: Skleral diseksiyon ve antimetabolit uygulama sahasında kanama'
    ],
    hemostasisStrategies: [
      'Mikro-koter / Bipolar wet-field koagülasyon ile skleral flep yatağındaki episklera perforatör damarlarının nazikçe koterize edilmesi',
      'Trabekülektomi ostiyumu açılırken göz içi basıncının kademeli düşürülmesi (öncesinde parasentezden kontrollü dekompresyon)',
      'Ekspulsif kanama şüphesinde cerrahın derhal skleral flebi ve parasentezi parmak basısıyla veya sütürle kapatıp arka sklerotomi yapması',
      'Hastanın öksürme, ıkınma ve hipertansiyon krizlerinin anestezi tarafından mutlak engellenmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Rejyonel Anestezi (Genişletilmiş Sub-Tenon Bloğu veya Peribulber Blok) + Monitörize Anestezi Bakımı (MAC: Bilinçli Minimal Sedasyon) — Koopere, sırtüstü yatabilen erişkin glokom hastalarında DÜNYA GENELİNDE İLK TERCİHTİR'
    ],
    alternative: [
      'Endotrakeal Genel Anestezi (GETA) + Tam Nöromusküler Blokaj (TOF 0/4) + Pürüzsüz Ekstübasyon Protokolü: Aşırı anksiyeteli, panik, sırtüstü yatamayan (ortopne, ağır kifoz), kontrolsüz esansiyel veya Parkinson baş tremoru olan, klostrofobik, demanslı, nistagmuslu veya pediatrik hastalarda',
      'Laringeal Maske (LMA) ile Genel Anestezi: Aspirasyon riski düşük, öksürmesiz ve pürüzsüz uyanma hedeflenen genel anestezi adaylarında'
    ],
    clinicalRationale: 'Genişletilmiş Sub-Tenon veya peribulber blok + hafif MAC, tam oküler akinezi ve derin analjezi sağlarken genel anestezi ekstübasyonunda gelişebilecek öksürme/ıkınma ile taze 10-0 skleral flep dikişlerinin yırtılmasını (overfiltrasyon ve ön kamara çökmesi) önlediği için erişkin olgularda ilk tercihtir. Doğal spontan solunum örtü altı O2/medikal hava akışıyla desteklenerek hiperkapni ve koroidal venöz dolgunluk engellenir; genel anestezi gereken uyumsuz hastalarda ise PaCO2 kontrolü ve öksürüksüz uyanma için kaflı ETT veya LMA kullanılır.',
    rulesTitle: 'TRABEKÜLEKTOMİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'TRABEKÜLEKTOMİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) ÖN KAMARA AÇILIRKEN ANİ HİPOTONİ DEKOMPRESYONU, SIFIR ÖKSÜRÜK VE EKSPULSİF KOROİDAL KANAMA ALARMI — Kelly punch ile trabeküler doku bloğu kesilip ön kamara dış ortama açıldığı ve periferik iridektomi yapıldığı an göz içi basıncı saniyeler içinde patolojik yüksek seviyelerden (30-50 mmHg) aniden 0 mmHg seviyesine çakılır. Bu akut dekompresyon evresinde hastanın en ufak bir öksürmesi, ıkınması, başını oynatması veya kontrolsüz kan basıncı yükselmesi arka siliyer arterlerin aniden patlamasına (ekspulsif suprakoroidal hemoraji), göz içi dokularının yaradan dışarı fırlamasına ve kalıcı körlüğe yol açar! Bu kritik aşamada hasta mutlak hareketsiz, derin analjezi/sedasyonda veya tam nöromusküler blokajda, öksürüksüz ve normotansif tutulmalıdır. (2) ANTİMETABOLİT (MİTOMİSİN C - MMC / 5-FU) DİSİPLİNİ, SÜRE TAKİBİ VE KORNEA ENDOTELİ KORUMASI — Skleral flep ve sub-Tenon alanına konjonktival fibrozisi ve bleb tıkanmasını önlemek amacıyla MMC (0.2-0.4 mg/mL) veya 5-FU emdirilmiş mikro-süngerler yerleştirilir. Süngerlerin dokuda kalış süresi (genellikle 1 ila 3 dakika) cerrahi ekip ile anestezi ekibi tarafından kronometre ile titizlikle tutulmalı ve tam süre bitiminde cerraha sesli bildirim yapılmalıdır. MMC\'nin korneaya veya ön kamaraya temas etmesi kornea endotel nekrozuna ve katarakta yol açar; süngerler çıkarıldıktan sonra alanın en az 20-30 mL BSS (Balanced Salt Solution) ile yıkanması izlenmelidir. (3) ÜST REKTUS ÇEKME SÜTÜRÜNDE (BRIDLE SUTURE) OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE ASİSTOLİ TEHLİKESİ — Trabekülektomide cerrahi alan üst limbus ve superior sklera olduğundan cerrah göz küresini aşağı baktırmak için üst rektus kasına traksiyon sütürü (bridle suture) atar veya skleral askı dikişini gerdirir. Üst rektus kasının çekilmesi trigemino-vagal refleks arkını (CN V oftalmik dal -> CN X vagus) tetikleyerek anında şiddetli bradikardi, nodal ritim, hipotansiyon ve ventriküler asistoliye yol açabilir! EKG ritmi anlık takip edilmeli; bradikardi görüldüğünde derhal cerraha "ÇEKMEYİ BIRAKIN" denmeli, traksiyonun gevşemesiyle nabız düzelmezse İV Atropin (0.5 mg) uygulanmalıdır. (4) EKSTÜBASYONDA SIFIR IKINMA / SIFIR ÖKSÜRÜK, SU GEÇİRMEZ BLEB GÜVENLİĞİ VE MALİGN GLOKOM ÖNLEMİ — Genel anestezi ile yapılan trabekülektomide uyanma (emergence) cerrahinin en tehlikeli aşamasıdır. Ekstübasyonda tüpü ısırma, ıkınma, öğürme veya öksürme intratorasik basıncı artırarak baş-boyun venöz basıncını fırlatır; yeni atılan mikroskobik 10-0 naylon skleral ve konjonktival sütürleri patlatarak aşırı filtrasyona (overfiltration), ön kamaranın tamamen çökmesine (athalamia / flat anterior chamber), koroidal dekolmana ve malign glokoma yol açar! Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg), derin/öksürmesiz ekstübasyon tekniği ve profilaktik antiemetik (İV Ondansetron) uygulanmalı; hasta asla ıkındırılmamalıdır. (5) KRONİK GLOKOM İLAÇLARININ SİSTEMİK ANESTEZİK ETKİLEŞİMLERİ (TİMOLOL, ASETOMİD, BRİMONİDİN) — Glokom hastaları operasyona kadar çoklu topikal ve sistemik anti-glokomatöz ajanlar kullanır: (a) Topikal beta-blokerler (Timolol damla) nazolakrimal kanaldan emilerek bradikardi, hipotansiyon, AV blok ve astım/KOAH hastalarında şiddetli bronkospazm yapabilir; (b) Topikal alfa-2 agonistler (Brimonidin) santral sedasyon, hipotansiyon ve bradikardi yaratabilir; (c) Sistemik karbonik anhidraz inhibitörleri (oral Asetazolamid - Diamox) hipokalemi, metabolik asidoz ve dehidratasyona yol açar. Preoperatif kanda potasyum ve bikarbonat düzeyi mutlaka kontrol edilmeli; perioperatif bradikardi ve bronkospazma karşı hazırlıklı olunmalıdır.',
    indispensableRules: [
      {
        number: 1,
        title: 'ÖN KAMARA AÇILIRKEN ANİ HİPOTONİ DEKOMPRESYONU, SIFIR ÖKSÜRÜK VE EKSPULSİF KOROİDAL KANAMA ALARMI',
        content: 'Kelly punch ile trabeküler doku bloğu kesilip ön kamara dış ortama açıldığı ve periferik iridektomi yapıldığı an göz içi basıncı saniyeler içinde patolojik yüksek seviyelerden (30-50 mmHg) aniden 0 mmHg seviyesine çakılır. Bu akut dekompresyon evresinde hastanın en ufak bir öksürmesi, ıkınması, başını oynatması veya kontrolsüz kan basıncı yükselmesi arka siliyer arterlerin aniden patlamasına (ekspulsif suprakoroidal hemoraji), göz içi dokularının yaradan dışarı fırlamasına ve kalıcı körlüğe yol açar! Bu kritik aşamada hasta mutlak hareketsiz, derin analjezi/sedasyonda veya tam nöromusküler blokajda, öksürüksüz ve normotansif tutulmalıdır.'
      },
      {
        number: 2,
        title: 'ANTİMETABOLİT (MİTOMİSİN C - MMC / 5-FU) DİSİPLİNİ, SÜRE TAKİBİ VE KORNEA ENDOTELİ KORUMASI',
        content: 'Skleral flep ve sub-Tenon alanına konjonktival fibrozisi ve bleb tıkanmasını önlemek amacıyla MMC (0.2-0.4 mg/mL) veya 5-FU emdirilmiş mikro-süngerler yerleştirilir. Süngerlerin dokuda kalış süresi (genellikle 1 ila 3 dakika) cerrahi ekip ile anestezi ekibi tarafından kronometre ile titizlikle tutulmalı ve tam süre bitiminde cerraha sesli bildirim yapılmalıdır. MMC\'nin korneaya veya ön kamaraya temas etmesi kornea endotel nekrozuna ve katarakta yol açar; süngerler çıkarıldıktan sonra alanın en az 20-30 mL BSS (Balanced Salt Solution) ile yıkanması izlenmelidir.'
      },
      {
        number: 3,
        title: 'ÜST REKTUS ÇEKME SÜTÜRÜNDE (BRIDLE SUTURE) OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE ASİSTOLİ TEHLİKESİ',
        content: 'Trabekülektomide cerrahi alan üst limbus ve superior sklera olduğundan cerrah göz küresini aşağı baktırmak için üst rektus kasına traksiyon sütürü (bridle suture) atar veya skleral askı dikişini gerdirir. Üst rektus kasının çekilmesi trigemino-vagal refleks arkını (CN V oftalmik dal -> CN X vagus) tetikleyerek anında şiddetli bradikardi, nodal ritim, hipotansiyon ve ventriküler asistoliye yol açabilir! EKG ritmi anlık takip edilmeli; bradikardi görüldüğünde derhal cerraha "ÇEKMEYİ BIRAKIN" denmeli, traksiyonun gevşemesiyle nabız düzelmezse İV Atropin (0.5 mg) uygulanmalıdır.'
      },
      {
        number: 4,
        title: 'EKSTÜBASYONDA SIFIR IKINMA / SIFIR ÖKSÜRÜK, SU GEÇİRMEZ BLEB GÜVENLİĞİ VE MALİGN GLOKOM ÖNLEMİ',
        content: 'Genel anestezi ile yapılan trabekülektomide uyanma (emergence) cerrahinin en tehlikeli aşamasıdır. Ekstübasyonda tüpü ısırma, ıkınma, öğürme veya öksürme intratorasik basıncı artırarak baş-boyun venöz basıncını fırlatır; yeni atılan mikroskobik 10-0 naylon skleral ve konjonktival sütürleri patlatarak aşırı filtrasyona (overfiltration), ön kamaranın tamamen çökmesine (athalamia / flat anterior chamber), koroidal dekolmana ve malign glokoma yol açar! Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg), derin/öksürmesiz ekstübasyon tekniği ve profilaktik antiemetik (İV Ondansetron) uygulanmalı; hasta asla ıkındırılmamalıdır.'
      },
      {
        number: 5,
        title: 'KRONİK GLOKOM İLAÇLARININ SİSTEMİK ANESTEZİK ETKİLEŞİMLERİ (TİMOLOL, ASETOMİD, BRİMONİDİN)',
        content: 'Glokom hastaları operasyona kadar çoklu topikal ve sistemik anti-glokomatöz ajanlar kullanır: (a) Topikal beta-blokerler (Timolol damla) nazolakrimal kanaldan emilerek bradikardi, hipotansiyon, AV blok ve astım/KOAH hastalarında şiddetli bronkospazm yapabilir; (b) Topikal alfa-2 agonistler (Brimonidin) santral sedasyon, hipotansiyon ve bradikardi yaratabilir; (c) Sistemik karbonik anhidraz inhibitörleri (oral Asetazolamid - Diamox) hipokalemi, metabolik asidoz ve dehidratasyona yol açar. Preoperatif kanda potasyum ve bikarbonat düzeyi mutlaka kontrol edilmeli; perioperatif bradikardi ve bronkospazma karşı hazırlıklı olunmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Glokom Konsültasyonu: Glokom tipi (açık açılı, açı kapanması, psödoeksfoliyatif), bazal GİB değerleri (tonometri), optik disk çukurluk/disk oranı (C/D ratio), görme alanı defisitinin ağırlığı ve hedeflenen postoperatif GİB düzeyinin tespiti.',
      'Kardiyoloji Konsültasyonu: İleri yaş glokom popülasyonunda yaygın olan esansiyel hipertansiyon, koroner arter hastalığı ve aritmilerin tespiti; topikal beta-bloker (Timolol) kullanan hastalarda bazal bradikardi ve iletim bloklarının incelenmesi.',
      'Göğüs Hastalıkları Konsültasyonu: Topikal non-selektif beta-bloker kullanan astım/KOAH olgularında bronkospazm riskinin ve operasyon esnasında/sonrasında dikişleri patlatabilecek öksürük krizlerinin önceden inhalerlerle stabilize edilmesi.',
      'Anestezi Polikliniği: Sırtüstü yatma toleransı, boyun hareketleri (kifoz/artrit), klostrofobi sorgulaması ve anestezi tekniği seçimi (rejyonel MAC vs genel anestezi).'
    ],
    historyAndPhysical: [
      'Kullanılan Glokom İlaçlarının Ayrıntılı Listesi: Topikal Timolol (beta-bloker), Brimonidin (alfa-2 agonist), Latanoprost/Travoprost/Bimatoprost (prostaglandin analogları), Pilokarpin (parasempatomimetik) ve oral Asetazolamid (Diamox - karbonik anhidraz inhibitörü).',
      'Antikoagülan / Antiagregan İlaç Kullanımı: Aspirin, Klopidogrel ve oral antikoagülanlar (DOAK / Warfarin); trabekülektomi mikro-vasküler skleral ve iris disseksiyonu içerdiğinden hifema ve suprakoroidal hemoraji riskini azaltmak için hemostatik strateji cerrah ile konsülte edilir.',
      'Sırtüstü Yatamama / Ağır Kifoz / Ortopne: Cerrahi örtü altında başın sabit kalamama riski ve örtü altı oksijenizasyon planı.',
      'Önceki Cerrahi Öyküsü: Önceki başarısız trabekülektomi, katarakt, vitrektomi veya skleral çökertme cerrahisi (önceden cerrahi görmüş konjonktiva Tenon yapışıklığı ve fibrozis riski taşır).'
    ],
    laboratoryAndTests: [
      'Serum Elektrolitleri (Özellikle oral Asetazolamid / Diamox kullanan hastalarda K+, Na+, Cl- ve bikarbonat düzeyi — hipokalemi ve metabolik asidoz taraması).',
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri ve Böbrek Fonksiyon Testleri (Üre, Kreatinin).',
      '12 Derivasyonlu EKG (Bradikardi, sinüs duraklaması veya dal bloğu kontrolü).',
      'Göz İçi Basıncı (GİB) Ölçümü ve B-Scan Ultrasonografi (Gereğinde aksiyel uzunluk ve arka segment değerlendirmesi).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleksi ve ani bradikardi analizi), SpO2, NIBP, EtCO2 (genel anestezide) ve Vücut Sıcaklığı.',
      'Sürekli Ritim Takibi: Üst rektus çekme sütürü (bridle suture) atılırken veya skleral flep gerdirilirken ani bradikardi oluşumu açısından gözler monitörde olmalıdır.',
      'Solunum Dinamikleri ve Sedasyon Düzeyi (MAC uygulamasında): Nazal kanül veya cerrahi örtü altından sürekli CO2 örneklemesi ve O2 insüflasyonu (2-3 L/dk); hipoventilasyon ve hiperkapni kaynaklı GİB yükselişi önlenir.',
      'Nöromusküler Monitörizasyon (TOF): Genel anestezi uygulanıyorsa trabeküler punch ve iridektomi evresinde TOF 0/4 (tam paralizi) korunmalıdır.'
    ],
    vascularAccess: [
      'En az 1 adet güvenli periferik intravenöz damar yolu (18-20G)',
      'Acil Bradikardi Kiti: İntravenöz Atropin (0.5 mg ampul) ve Glikopirolat daima enjektörde hazır bulundurulur',
      'Gereğinde Hipertansif Kriz Ajanları: İV Esmolol, Labetalol veya Gliseril Trinitrat (Nitrogliserin)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Halka ile Nötral ve Hareketsiz',
    patientPositionDetails: [
      'Hasta ameliyat masasına sırtüstü yatırılır; baş silikon donüt yastıkla desteklenerek mikroskobun optik eksenine tam paralel konuma getirilir.',
      'Kifotik veya boyun artriti olan hastalarda baş ve göğüs altına silikon kama/yastıklar konularak boyun hiperekstansiyonu önlenir.',
      'Cerrahi örtülerin hastanın yüzüne bası yapmasını ve örtü altında CO2 birikmesini önlemek için esnek örtü köprüsü (L-bar) veya aktif emici aspirasyon borusu kurulur.',
      'Başın ani dönmesini veya istemsiz el hareketlerini engellemek için bilekler ve alın nazikçe sabitlenir.'
    ],
    anesthesiaManagement: [
      'Rejyonel Anestezi & Monitörize Anestezi Bakımı (MAC):',
      '  - Genişletilmiş Sub-Tenon Bloğu (Künt Kanül Tekniği) veya Peribulber Blok: 3-5 mL Lidokain %2 + Bupivakain %0.5 karışımı (isteğe bağlı Hyaluronidaz ilavesi ile). Mükemmel korneal/skleral analjezi ve tam akinezi sağlar.',
      '  - Hafif Bilinçli Sedasyon: Midazolam (0.5 - 1.0 mg İV bolus) + Fentanil (25 mcg İV bolus).',
      '  - DİKKAT: Derin sedasyondan (Propofol bolusları veya aşırı benzodiazepin) kesinlikle kaçınılmalıdır! Derin sedasyondaki hasta uyku apnesine girer, hiperkapniyle paniğe kapılarak aniden uyanır ve mikroskop altındaki gözü sarsarak skleral flep yırtığına veya ekspulsif hemorajiye yol açar.',
      'Genel Anestezi Uygulanıyorsa:',
      '  - İndüksiyon: Propofol (1.5 - 2.0 mg/kg) + Fentanil / Remifentanil + Rokuronyum (0.6 mg/kg). Maske ventilasyonu nazik yapılmalı, hava yolunda öksürük veya ıkınma olmamalıdır.',
      '  - İdame: Sevofluran/Desfluran veya TIVA (Propofol + Remifentanil infüzyonu).',
      '  - Normokapni Disiplini: PaCO2 35-38 mmHg seviyesinde tutulmalıdır; hiperkapni koroid damarlarını genişleterek GİB\'i artırır, hipokapni ise serebral/oküler iskemi yaratır.',
      '  - Azot Protoksit (N2O) Kontrolü: Trabekülektomide gaz kabarcığı kullanılmasa bile cerrahi sonrası hava/gaz tamponadı olasılığına karşı N2O kullanılmaması tercih edilir.'
    ],
    airwayManagement: [
      'Rejyonel anestezi (MAC): Burun kanülü ile 2-3 L/dk O2 verilir; örtü altı aktif havalandırma ile CO2 çadırı engellenir.',
      'Genel anestezi: Laringeal Maske (LMA) veya Endotrakeal Tüp (spiral telli tüp baş hareketlerine karşı güvenlidir). Ekstübasyon anında öksürmeyi engellemek için LMA mükemmel bir konfor sağlar.'
    ],
    criticalSurgicalStages: [
      '1. Hastanın Pozisyonlanması, Monitörizasyon ve Rejyonel Blok Uygulaması (Göz kapağı ve küre akinezisi kontrolü).',
      '2. Üst Konjonktiva ve Tenon Disseksiyonu (Forniks veya Limbus tabanlı flep hazırlanması).',
      '3. Üst Rektus Kası Traksiyon Sütürü (Bridle Suture) Atılması — (Okülokardiyak refleks kontrolü!).',
      '4. Antimetabolit Uygulaması: MMC (0.2-0.4 mg/mL) veya 5-FU emdirilmiş süngerlerin skleral yatağa yerleştirilmesi (Kronometre başlatılır: 1-3 dakika).',
      '5. Süngerlerin Çıkarılması ve Alanın En Az 20-30 mL BSS ile Bol Yıkanması (MMC\'nin kornea ve ön kamaraya kaçışının önlenmesi).',
      '6. Parsiyel Kalınlıkta Skleral Flebin Hazırlanması (Yaklaşık 3x3 veya 4x4 mm ebadında yarım kat sklera diseksiyonu).',
      '7. Ön Kamaraya Yan Giriş (Parasentez) Açılması ve BSS ile Ön Kamara Derinliğinin Kontrolü.',
      '8. Kelly Punch ile Trabekülektomi Penceresi (Sklerokorneal blok eksizyonu) — (Kritik dekompresyon ve sıfır hareket aşaması!).',
      '9. Cerrahi Periferik İridektomi (PI) Yapılması (İris damarı kanaması kontrolü).',
      '10. Skleral Flebin 10-0 Naylon Sütürlerle Kapatılması (Gevşetilebilir / releasable dikişler ve filtrasyon akım testi).',
      '11. Konjonktiva ve Tenon Kapsülünün Su Geçirmez (Watertight) Kapatılması ve Filtrasyon Blebinin Şişirilmesi.',
      '12. Seidel Testi (Kaçak kontrolü), Subkonjonktival Antibiyotik/Steroid Enjeksiyonu ve Koruyucu Şeffaf Kapak.'
    ],
    emergenceNotes: [
      'Genel Anestezi Ekstübasyon Protokolü: Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg) uygulanır.',
      'Hasta uyanırken tüpe karşı öksürmemesi, öğürmemesi ve ıkınmaması için derin plan ekstübasyon veya LMA değişimi uygulanabilir.',
      'Şiddetli kusma ve öğürmeyi engellemek için ameliyat bitiminden önce İV Ondansetron (4-8 mg) ve Deksametazon (4 mg) verilmiş olmalıdır.',
      'Ameliyat edilen göze baskı yapılmaz; steril gazlı bez ve şeffaf delikli plastik koruyucu kapak (eye shield) gevşekçe flasterlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Trabekülektomi genellikle şiddetli somatik ağrı yaratmaz; hastalar daha çok batma, yabancı cisim hissi ve hafif künt oküler sızı tarif eder.',
      'Oral / İV Parasetamol (1000 mg) çoğu olguda mükemmel ve yeterli analjezi sağlar.',
      'Gereğinde Hafif NSAİİ veya Tramadol (50 mg): Ancak trombosit fonksiyonlarını bozabilecek ve ön kamara hifema riskini artırabilecek agresif NSAİİ\'lerden kaçınılmalıdır.',
      'Gözü ovuşturma isteğini ve ağrıyı önlemek için koruyucu plastik göz kapağı postoperatif ilk günlerde mutlaka takılmalıdır.'
    ],
    prospectRecommendations: [
      'PROSPECT Oftalmik Cerrahi Rehberleri:',
      'Preoperatif ve intraoperatif multimodal analjezi yaklaşımı ile postoperatif opioid tüketiminin ve buna bağlı bulantı-kusmanın sıfırlanması.',
      'Lokal / Rejyonel anestezi tekniklerinin (Sub-Tenon veya Peribulber) postoperatif ilk saatlerdeki ağrıyı dramatik düzeyde baskıladığı ve genel anesteziye üstün olduğu vurgulanmaktadır.'
    ],
    erasRecommendations: [
      'ERAS Göz Cerrahisi Protokolleri:',
      'Minimal Preoperatif Açlık: Berrak sıvılar operasyondan 2 saat öncesine kadar serbest bırakılır.',
      'Agresif PONV Profilaksisi: Postoperatif kusma ve ıkınma filtrasyon blebini patlatıp ön kamarayı çökertebileceğinden (athalamia), çiftli kombine antiemetik profilaksisi (Ondansetron + Deksametazon) esastır.',
      'Erken Mobilizasyon: Rejyonel anestezi alan hasta ameliyattan 30-60 dakika sonra oral gıdaya başlayabilir ve taburcu edilebilir.',
      'Başın 30 Derece Yükseltilmesi: Postoperatif dönemde başın hafif yukarıda tutulması episklera ve göz içi venöz basıncını düşürerek bleb fonksiyonunu ve koroidal perfüzyonu destekler.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Glaucoma Procedures - Trabeculectomy (Guarded Filtration Procedure), pp. 858-864.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS) Perioperative Consensus Guidelines for Day-Case Ophthalmic Surgery.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Ophthalmic and Anterior Segment Surgery.',
    otherReferences: [
      'European Glaucoma Society (EGS): Terminology and Guidelines for Glaucoma, 5th Edition, Surgical Management and Guarded Filtration Surgery.',
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Primary Open-Angle Glaucoma Surgery.',
      'Ophthalmic Anesthesia Society (OAS): Clinical Practice Guidelines for Anesthesia in Glaucoma Filtration Surgery.',
      'Türk Oftalmoloji Derneği (TOD) Glokom Birimi: Glokom Tedavi Rehberi ve Cerrahi Komplikasyonların Yönetimi.'
    ]
  }
};
