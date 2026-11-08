import { ProcedureDefinition } from '../../types/procedures';

/**
 * Vitreoretinal Cerrahi: Pars Plana Vitrektomi (PPV), Skleral Çökertme (Scleral Buckle), Endolazer ve Gaz/Silikon Tamponad
 * (Retinal Surgery / Vitreoretinal Procedures: Pars Plana Vitrectomy, Scleral Buckling, Endolaser and Intravitreal Gas/Silicone Oil)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Vitreoretinal Surgery: Retinal Detachment Repair - Scleral Buckling and Pars Plana Vitrectomy, pp. 864-868),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Retinal Detachment and Vitreoretinal Surgery,
 * American Society of Retina Specialists (ASRS) Clinical Practice Guidelines,
 * British Ophthalmic Anaesthesia Society (BOAS) & Royal College of Anaesthetists (RCoA),
 * Türk Oftalmoloji Derneği (TOD) Retina ve Vitreoretinal Cerrahi Birimi Protokolleri referans alınarak yapılandırılmıştır.
 */
export const retinalSurgery: ProcedureDefinition = {
  id: 'retinal-surgery-vitrectomy-scleral-buckle',
  name: 'Vitreoretinal Cerrahi: Pars Plana Vitrektomi (PPV), Skleral Çökertme ve Gaz/Silikon Tamponad',
  shortCode: 'GOZ-RETINA-PPV',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Vitreoretinal & Arka Segment Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Gözün arka segmentini dolduran jöle kıvamındaki vitreus cisminin ve görmeyi sağlayan nörosensoryal retina tabakasının yırtık, dekolman, kanama, traksiyon veya proliferatif membranlar sonucu gelişen patolojilerinin mikrocerrahi ve mikro-endoskopik yöntemlerle onarılması ameliyatıdır. Temel teknikler: (1) Pars Plana Vitrektomi (PPV - 23G, 25G, 27G Dikişsiz MIVS): Limbusun 3.5 - 4.0 mm gerisinden pars planaya 3 veya 4 adet mikro-trokar yerleştirilir; infüzyon kanülü, aydınlatma ışık probu ve yüksek hızlı mikro-vitrektör (dakikada 5000-10.000 kesi) ile kor ve periferik vitreus temizlenir; arka vitreus dekolmanı (PVD) indüklenir; makula üzerindeki epiretinal membranlar ve internal limitan membran (İLM) triamsinolon veya parlak mavi boya (Brilliant Blue) eşliğinde mikro-forsepslerle mikron hassasiyetinde soyulur; retina yırtıkları etrafına endolazer fotokoagülasyon uygulanır; sıvı-hava değişimi (FAX) yapılarak göz içine uzun etkili endotamponad gaz (SF6 veya C3F8) ya da silikon yağı (1000/5000 cSt) enjekte edilir; (2) Skleral Çökertme (Scleral Buckling / Serklaj): Dört rektus kası askıya alınır; retina yırtığı bölgesine transskleral kriyoterapi uygulanır; sklera üzerine 360 derece silikon bant/lastik (tire/sponge) dikilerek göz duvarı içeri doğru çökertilir; subretinal sıvı (SRF) drene edilerek retinanın pigment epiteline yapışması sağlanır; (3) Kombine Fako-Vitrektomi: İntraoperatif lens kesafetini gidermek ve arka segmente rahat ulaşmak için katarakt fakoemülsifikasyonu ile vitrektominin aynı seansta icra edilmesi.',
  indications: [
    'Regmatojen Retina Dekolmanı (RRD): Retina yırtığına bağlı subretinal sıvı toplanması ve makula dekolmanı (acil körlük tehdidi)',
    'Traksiyonel Retina Dekolmanı (TRD): Proliferatif diyabetik retinopatiye (PDR) bağlı fibrovasküler zarların retinayı çekip kaldırması',
    'Açılmayan / Rezorbe Olmayan Vitreus Kanaması: Diyabetik retinopati, retina ven dal tıkanıklığı (BRVO/CRVO) veya travma sekeli',
    'Makula Deliği (Macular Hole) ve Epiretinal Membran (ERM / Makuler Pucker): Santral görmeyi bozan vitreomakuler arayüz patolojileri',
    'Proliferatif Vitreoretinopati (PVR): Rekürren retina dekolmanları sekeli yaygın retina büzüşmesi ve fibrozisi',
    'Göz İçi Enfeksiyonu (Endoftalmi): Vitreus aspirasyonu, pars plana debulking ve intravitreal antibiyotik enjeksiyonu',
    'Arka Segmente Düşmüş Nükleus / Disloke Göz İçi Lensi (İOL)'
  ],
  averageDuration: '60 - 150 dakika (Standart 25G PPV makula deliği/ERM: 45-60 dk; Kompleks PDR/diyabetik traksiyonel dekolman: 90-120 dk; Kombine vitrektomi + skleral çökertme + silikon: 120-150 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 10 - 30 mL (Sklerotomi girişleri ve konjonktiva kesilerinden olan minimal kanamalar; diyabetik fibrovasküler zarlar kesilirken vitreus içi kanama görülebilir ancak sistemik dolaşım için kan kaybı ihmal edilebilir düzeydedir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Sistemik Kan Kaybı / Ancak Katastrofik İntraoperatif Ekspulsif Koroidal Hemoraji Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Ekspulsif Suprakoroidal Hemoraji: Sklerotomi açılırken, sıvı-gaz değişiminde ani oküler hipotoni veya hastanın öksürmesi/ıkınmasıyla arka siliyer arterlerin patlaması (gözün tamamen kaybına yol açan en korkulan felaket)',
      'Diyabetik Fibrovasküler Zarların Kanaması: Neovasküler damarların disseksiyonunda masif intraoküler kanama',
      'İntraretinal ve Subretinal Kanamalar: İLM soyulurken veya fovea komşuluğunda vasküler travma'
    ],
    hemostasisStrategies: [
      'İnfüzyon Basıncının Geçici Yükseltilmesi: Vitreus içi kanama başladığında cerrahın vitrektomi makinesinden şişe/infüzyon basıncını 40-60 mmHg seviyesine çıkararak tamponad sağlaması',
      'Endolazer veya Endodiatermi ile aktif kanayan retinovasküler odakların yakılması',
      'Anestezi tarafından arteriyel kan basıncının normotansif sınırda tutulması; tansiyon piklerinin ve öksürüğün mutlak engellenmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Dengeli Genel Endotrakeal Anestezi (GETA) + Spiral Telli Tüp + Tam Nöromusküler Blokaj (TOF 0/4) + AZOT PROTOKSİT (N2O) KESİNLİKLE YASAKTIR + Pürüzsüz Ekstübasyon Protokolü — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Derin Rejyonel Blok (Genişletilmiş Sub-Tenon Bloğu veya Peribulber Blok) + Monitörize Anestezi Bakımı (MAC: Bilinçli Minimal Sedasyon): Genel anestezi riski çok yüksek olan, sırtüstü 1.5 saat kımıldamadan yatabilen, koopere erişkin hastalarda; ancak tam oküler akinezi şarttır. DİKKAT: Hasta kesinlikle derin uyutulmamalıdır (aşırı sedasyon apneye ve panikle sıçrayarak uyanmaya yol açar; bu durum fovea perforasyonuna neden olabilir!)'
    ],
    rulesTitle: 'VİTREORETİNAL CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'VİTREORETİNAL CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) AZOT PROTOKSİT (N2O / GÜLDÜRÜCÜ GAZ) VE İNTRAOKÜLER GAZ (SF6 / C3F8) ÖLÜMCÜL ETKİLEŞİMİ — ANINDA VE KALICI KÖRLÜK ALARMI — Vitreoretinal cerrahide yırtığı tamponlamak için vitrektomi sonunda göz içine gaz (SF6 - Kükürt hekzaflorür veya C3F8 - Perfloropropan) veya hava verilir. Eğer anestezide Azot Protoksit (N2O) kullanılıyorsa, kanda çözünürlüğü yüksek olan N2O gaz kabarcığının içine hızla difüze olur; göz içi gaz kabarcığını dakikalar içinde 2-3 kat şişirir! Göz içi basıncı (GİB) 60-100 mmHg seviyesine fırlayarak santral retinal arteri tıkar ve ANINDA KALICI KÖRLÜK yaratır! Bu nedenle vitreoretinal cerrahide N2O gaz enjeksiyonundan EN AZ 20 DAKİKA ÖNCE KESİLMELİDİR (tercihen anestezide N2O KESİNLİKLE KULLANILMAMALIDIR!). Ayrıca gözünde gaz kabarcığı olan hastada postoperatif 4-8 hafta boyunca hiçbir ameliyatta N2O kullanılamaz! (2) MAKULA VE RETİNA ÜZERİNDE MİKRON DÜZEYİNDE MANİPÜLASYONDA "MUTLAK HAREKETSİZLİK" VE SIFIR SARSINTI DİSİPLİNİ — 23G, 25G veya 27G vitrektomi probları (dakikada 5000-10.000 kesi) ve mikro-forsepsler retinaya ve foveaya 50-100 mikron mesafede çalışır (İLM soyulması). Bu aşamada hastanın aniden başını çevirmesi, öksürmesi, solunum eforu yapması veya sarsılması mikro-aletlerin foveayı yırtmasına, dev retinal deliklere ve subretinal masif kanamaya yol açarak hastayı kör eder! Genel anestezide tam nöromusküler blok (TOF 0/4) sürdürülmeli; rejyonel anestezide (Retrobulber/Sub-Tenon) derin akinezi sağlanmalı, aşırı sedasyon kaynaklı apne ve sıçrayarak uyanmalar kesinlikle önlenmelidir. (3) SKLERAL ÇÖKERTME VE DÖRT REKTUS KAS TRAKSİYONUNDA OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE ASİSTOLİ — Skleral çökertme (scleral buckle) cerrahisinde dört rektus kası tek tek askıya alınır, sklera derin dikişlerle gerdirilir ve transskleral kriyoterapi uygulanır. Bu traksiyon ve bası en güçlü trigemino-vagal refleks arkını (CN V oftalmik dal -> CN X vagus) tetikler. EKG\'de ani derin sinüs bradikardisi, junctional ritim, dal blokları ve ventriküler asistoli gelişebilir! EKG ritmi anlık izlenmeli; bradikardide cerraha derhal "TRAKSİYONU BIRAK" ikazı verilmeli, düzelmezse İV Atropin (0.5 - 1.0 mg) uygulanmalıdır. (4) PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE), DİKİŞSİZ (23/25G) TROKAR GÜVENLİĞİ VE AGRESİF PONV ÖNLEMİ — Cerrahi bittiğinde 23G veya 25G dikişsiz sklerotomi trokarları çekilmiştir ve göz içinde gaz veya silikon tamponadı vardır. Ekstübasyonda tüpü ısırma, ıkınma veya ameliyat sonrası kusma baş-boyun venöz basıncını fırlatarak dikişsiz sklerotomilerden aköz/gaz kaçağına, subkonjonktival gaz birikimine, koroidal kanamaya ve göz içi basıncının çökmesine (akut hipotoni) yol açar! Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg) uygulanmalı, hasta öksürmeden uyandırılmalı; ikili kombine antiemetik profilaksisi (İV Ondansetron + Deksametazon) eksiksiz verilmelidir. (5) POSTOPERATİF YÜZÜSTÜ (PRONE / FACE-DOWN) POZİSYONLAMA DİSİPLİNİ VE AKUT AÇI KAPANMASI GLOKOMU UYARISI — Göz içine gaz veya silikon yağı verilen hastaların retinanın yapışmasını sağlamak için ameliyat sonrası günlerce sıkı yüzüstü (prone / face-down) veya oturur-baş önde yatması zorunludur. Eğer hasta sırtüstü (supin) yatarsa gaz kabarcığı öne doğru iris-lens diyaframını iter; ön kamarayı kapatarak akut açı kapanması glokomuna, kornea endotel hasarına ve şiddetli katarakta yol açar! Anestezi ekibi ve servis hemşireliği hastayı derlenme odasından itibaren sırtüstü yatırmamalı; hasta ve refakatçisine yüzüstü pozisyonun görme kurtarıcı önemi anlatılmalıdır.',
    indispensableRules: [
      {
        number: 1,
        title: 'AZOT PROTOKSİT (N2O / GÜLDÜRÜCÜ GAZ) VE İNTRAOKÜLER GAZ (SF6 / C3F8) ÖLÜMCÜL ETKİLEŞİMİ — ANINDA VE KALICI KÖRLÜK ALARMI',
        content: 'Vitreoretinal cerrahide yırtığı tamponlamak için vitrektomi sonunda göz içine gaz (SF6 - Kükürt hekzaflorür veya C3F8 - Perfloropropan) veya hava verilir. Eğer anestezide Azot Protoksit (N2O) kullanılıyorsa, kanda çözünürlüğü yüksek olan N2O gaz kabarcığının içine hızla difüze olur; göz içi gaz kabarcığını dakikalar içinde 2-3 kat şişirir! Göz içi basıncı (GİB) 60-100 mmHg seviyesine fırlayarak santral retinal arteri tıkar ve ANINDA KALICI KÖRLÜK yaratır! Bu nedenle vitreoretinal cerrahide N2O gaz enjeksiyonundan EN AZ 20 DAKİKA ÖNCE KESİLMELİDİR (tercihen anestezide N2O KESİNLİKLE KULLANILMAMALIDIR!). Ayrıca gözünde gaz kabarcığı olan hastada postoperatif 4-8 hafta boyunca hiçbir ameliyatta N2O kullanılamaz!'
      },
      {
        number: 2,
        title: 'MAKULA VE RETİNA ÜZERİNDE MİKRON DÜZEYİNDE MANİPÜLASYONDA "MUTLAK HAREKETSİZLİK" VE SIFIR SARSINTI DİSİPLİNİ',
        content: '23G, 25G veya 27G vitrektomi probları (dakikada 5000-10.000 kesi) ve mikro-forsepsler retinaya ve foveaya 50-100 mikron mesafede çalışır (İLM soyulması). Bu aşamada hastanın aniden başını çevirmesi, öksürmesi, solunum eforu yapması veya sarsılması mikro-aletlerin foveayı yırtmasına, dev retinal deliklere ve subretinal masif kanamaya yol açarak hastayı kör eder! Genel anestezide tam nöromusküler blok (TOF 0/4) sürdürülmeli; rejyonel anestezide (Retrobulber/Sub-Tenon) derin akinezi sağlanmalı, aşırı sedasyon kaynaklı apne ve sıçrayarak uyanmalar kesinlikle önlenmelidir.'
      },
      {
        number: 3,
        title: 'SKLERAL ÇÖKERTME VE DÖRT REKTUS KAS TRAKSİYONUNDA OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE ASİSTOLİ',
        content: 'Skleral çökertme (scleral buckle) cerrahisinde dört rektus kası tek tek askıya alınır, sklera derin dikişlerle gerdirilir ve transskleral kriyoterapi uygulanır. Bu traksiyon ve bası en güçlü trigemino-vagal refleks arkını (CN V oftalmik dal -> CN X vagus) tetikler. EKG\'de ani derin sinüs bradikardisi, junctional ritim, dal blokları ve ventriküler asistoli gelişebilir! EKG ritmi anlık izlenmeli; bradikardide cerraha derhal "TRAKSİYONU BIRAK" ikazı verilmeli, düzelmezse İV Atropin (0.5 - 1.0 mg) uygulanmalıdır.'
      },
      {
        number: 4,
        title: 'PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE), DİKİŞSİZ (23/25G) TROKAR GÜVENLİĞİ VE AGRESİF PONV ÖNLEMİ',
        content: 'Cerrahi bittiğinde 23G veya 25G dikişsiz sklerotomi trokarları çekilmiştir ve göz içinde gaz veya silikon tamponadı vardır. Ekstübasyonda tüpü ısırma, ıkınma veya ameliyat sonrası kusma baş-boyun venöz basıncını fırlatarak dikişsiz sklerotomilerden aköz/gaz kaçağına, subkonjonktival gaz birikimine, koroidal kanamaya ve göz içi basıncının çökmesine (akut hipotoni) yol açar! Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg) uygulanmalı, hasta öksürmeden uyandırılmalı; ikili kombine antiemetik profilaksisi (İV Ondansetron + Deksametazon) eksiksiz verilmelidir.'
      },
      {
        number: 5,
        title: 'POSTOPERATİF YÜZÜSTÜ (PRONE / FACE-DOWN) POZİSYONLAMA DİSİPLİNİ VE AKUT AÇI KAPANMASI GLOKOMU UYARISI',
        content: 'Göz içine gaz veya silikon yağı verilen hastaların retinanın yapışmasını sağlamak için ameliyat sonrası günlerce sıkı yüzüstü (prone / face-down) veya oturur-baş önde yatması zorunludur. Eğer hasta sırtüstü (supin) yatarsa gaz kabarcığı öne doğru iris-lens diyaframını iter; ön kamarayı kapatarak akut açı kapanması glokomuna, kornea endotel hasarına ve şiddetli katarakta yol açar! Anestezi ekibi ve servis hemşireliği hastayı derlenme odasından itibaren sırtüstü yatırmamalı; hasta ve refakatçisine yüzüstü pozisyonun görme kurtarıcı önemi anlatılmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Vitreoretinal Konsültasyonu: Biyomikroskopi ve indirekt oftalmoskopi ile retina dekolmanının yayılımı (makula açık/on vs kapalı/off), yırtıkların yeri ve saati, PVR evresi, vitreus kanamasının yoğunluğu ve gaz/silikon tamponad seçimi.',
      'Oküler B-Scan Ultrasonografi: Opak ortamlarda (yoğun vitreus kanaması, katarakt) retinanın yatışıklığı, koroid dekolmanı ve arka hyaloid durumu.',
      'Dahiliye ve Kardiyoloji Konsültasyonu: Diyabetik vitrektomi olgularında sistemik glisemik kontrol (HbA1c), nefropati, hipertansiyon ve koroner arter hastalığı değerlendirmesi.',
      'Anestezi Polikliniği: Genel anestezi hazırlığı, N2O kontrendikasyonunun kaydı ve postoperatif yüzüstü pozisyon toleransı (boyun omurga artriti/kifoz).'
    ],
    historyAndPhysical: [
      'Diyabet ve İnsülin Kullanımı: Diyabetik hastalarda ameliyat günü açlık kan şekeri izlemi (hedef 120-180 mg/dL); hipoglisemiden ve ketoasidozdan kaçınma.',
      'Antikoagülan / Antiagregan İlaç Kullanımı: Aspirin, Klopidogrel ve DOAK; mikroinsizyonel vitrektomide (23/25G) tromboemboli riskine karşı aspirin genellikle KESİLMEZ, ancak cerrahla hemostatik risk teyit edilir.',
      'Boyun ve Omurga Patolojileri: Postoperatif günlerce yüzüstü (prone) pozisyonda kalma zorunluluğu için boyun eklem hareket açıklığı sorgulanır.',
      'Daha Önce Geçirilmiş Göz Cerrahileri: Psödofaki, trabekülektomi veya penetran keratoplasti varlığı.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri, Serum Elektrolitleri ve Böbrek Fonksiyonları (Üre, Kreatinin).',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleksi ve ani bradikardi analizi), SpO2, EtCO2 ve Vücut Sıcaklığı.',
      'Sürekli Kan Basıncı Takibi: Normotansif sınır (SKB < 130-140 mmHg); intraoperatif diyabetik kanama ve koroid efüzyonunu önlemek için tansiyon piki engellenir.',
      'Nöromusküler İleti Monitörizasyonu (TOF): Makula ve retina membran soyulması aşamasında hastanın mutlak hareketsizliği için TOF 0/4 (tam paralizi) korunmalıdır.',
      'EtCO2 Takibi: Normokapni (EtCO2 35-38 mmHg); hiperkapni kaynaklı koroidal venöz basınç artışı önlenir.'
    ],
    vascularAccess: [
      '1-2 adet güvenli periferik intravenöz damar yolu (18-20G)',
      'Acil Bradikardi Kiti: İV Atropin (0.5 - 1.0 mg) masada hazır',
      'Gereğinde Hipertansiyon Yönetimi: İV Esmolol veya Labetalol'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Donüt ile Sabit ve Nötral',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; baş mikroskobun optik eksenine tam paralel hizalanır.',
      'Başın ani dönmesini veya istemsiz omuz/el hareketlerini engellemek için bilekler ve alın nazikçe sabitlenir.',
      'Ameliyat sahasına bası yapmayan ve mikroskop altında cerrahın eline engel olmayan L-bar köprüsü veya örtü askısı kurulur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - Propofol (2.0 mg/kg) + Fentanil (2 mcg/kg) veya Remifentanil + Rokuronyum (0.6 mg/kg).',
      '  - İV Lidokain (1.5 mg/kg) indüksiyondan 90 saniye önce verilir (öksürük ve laringoskopi refleksini baskılar).',
      'İdame ve N2O KONTRENDİKASYONU:',
      '  - TIVA (Propofol + Remifentanil) veya Sevofluran/Desfluran + O2/Hava.',
      '  - AZOT PROTOKSİT (N2O) KESİNLİKLE KULLANILMAZ (gaz tamponadı fırlatarak körlük yapar!).',
      '  - TOF 0/4 seviyesinde tam kas gevşemesi sürdürülür.',
      'Skleral Çökertme / Rektus Kas Çekimi:',
      '  - Dört rektus kası askıya alınırken kalp hızı anlık izlenir; ani bradikardide cerrah uyarılır.'
    ],
    airwayManagement: [
      'Spiral telli (reinforced) endotrakeal tüp baş hareketlerine ve cerrahın el basısına karşı güvenlidir.',
      'Tüp ağız köşesine sağlam flasterlenir; trakeal manşon basıncı 20-25 cmH2O seviyesinde kontrol edilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Monitörizasyon ve Başın Sabitlenmesi.',
      '2. Göz Çevresi ve Konjonktiva Kese Povidon İyot (%5) Antisepsisi.',
      '3. Blefaroste Takılması ve Pars Planaya 3 Adet 23G veya 25G Valfli Mikro-Trokar Yerleştirilmesi.',
      '4. İnfüzyon Hattının Açılması ve Göz İçi Basıncının Otomatik Dengelenmesi.',
      '5. Kor Vitrektomi Yapılması ve Arka Vitreus Dekolmanı (PVD) İndüksiyonu.',
      '6. Periferik Vitrektomi ve Skleral Çökertme / Kriyoterapi (Rektus kas çekimlerinde Aschner refleksi kontrolü!).',
      '7. Makula Cerrahisi: Triamsinolon veya Parlak Mavi boya eşliğinde Epiretinal Membran ve İLM Soyulması (Sıfır hareket aşaması!).',
      '8. Sıvı-Hava Değişimi (Fluid-Air Exchange - FAX) ve Subretinal Sıvının Yırtıktan Aspire Edilmesi.',
      '9. Yırtık Etrafına Endolazer Fotokoagülasyon Yapılması.',
      '10. Endotamponad Enjeksiyonu: İntraoküler Gaz (SF6 veya C3F8) ya da Silikon Yağı Verilmesi (N2O kesinlikle kapalı olmalıdır!).',
      '11. Trokarların Çekilmesi (Gereğinde sklerotomilere 8-0 vikril dikiş) ve Kaçak Kontrolü.',
      '12. Subkonjonktival Antibiyotik/Steroid Enjeksiyonu ve Koruyucu Şeffaf Kapak.'
    ],
    emergenceNotes: [
      'Pürüzsüz Ekstübasyon (Smooth Emergence) Hayati Önem Taşır: Öksürme ve ıkınma dikişsiz sklerotomilerden gaz/aköz kaçağına ve koroid kanamasına yol açar.',
      'Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg) uygulanır.',
      'İntraoperatif kombine İV Ondansetron (4-8 mg) + Deksametazon (4 mg) ile postoperatif kusma kesinlikle önlenir.',
      'Hasta ameliyathanede sırtüstü uyandırıldıktan hemen sonra başı yana veya hafif öne çevrilir; servis yatağına alınırken yüzüstü (prone) pozisyon verilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Vitrektomi sonrası ağrı genellikle hafif-orta düzeydedir; skleral çökertme yapılmışsa künt orbital gerginlik daha belirgin olabilir.',
      'Oral / İV Parasetamol (1000 mg) her 6-8 saatte bir temel analjeziktir.',
      'Gereğinde Tramadol (50 mg).',
      'Hifema ve koroid kanaması riskini artırabilecek aspirin ve agresif NSAİİ kullanımından kaçınılmalıdır.',
      'Şiddetli ani göz ağrısı gaz genleşmesine bağlı akut glokom krizini (GİB > 50 mmHg) işaret edebileceğinden derhal tonometri yapılmalıdır.'
    ],
    prospectRecommendations: [
      'PROSPECT Vitreoretinal Cerrahi Rehberleri:',
      'Preoperatif ve intraoperatif multimodal analjezi;',
      'Opioid kullanımının sınırlandırılarak PONV (bulantı/kusma) riskinin sıfırlanması önerilir.'
    ],
    erasRecommendations: [
      'ERAS ve ASRS Vitreoretinal Protokolleri:',
      'ZORUNLU YÜZÜSTÜ (FACE-DOWN / PRONE) POZİSYONLAMA: Gaz veya silikon yağı verilen hastalar günde en az 16-18 saat boyunca yüzüstü veya baş önde oturur pozisyonda kalmalıdır (retinanın yatışması için hayati önem taşır; sırtüstü yatmak açı kapanması glokomuna yol açar).',
      'UÇAK VE YÜKSEK İRTİFA YASAĞI: Gözünde gaz (SF6/C3F8) olan hastalar gaz tamamen emilene kadar (SF6 için 2-3 hafta, C3F8 için 6-8 hafta) UÇAĞA BİNEMEZ ve yüksek rakımlı dağlara çıkamaz (kabin basıncı düşüklüğü gazı fırlatarak gözü patlatır ve kör eder!). Hastaya "Gözümde Gaz Vardır" uyarı bilekliği takılır.',
      'GELECEKTEKİ ANESTEZİLERDE N2O YASAĞI: Gözünde gaz olan hastaya acil cerrahi gerekirse N2O KESİNLİKLE VERİLEMEZ.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Vitreoretinal Surgery - Retinal Detachment Repair: Scleral Buckling and Pars Plana Vitrectomy (PPV), pp. 864-868.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS): Consensus for Vitreoretinal Day-Case Surgery.',
    prospectReference: 'PROSPECT Guidelines: Postoperative Pain and PONV Management in Complex Vitreoretinal Procedures.',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Retinal Detachment and Vitreoretinal Disorders.',
      'American Society of Retina Specialists (ASRS): Vitreoretinal Surgical Guidelines and Gas Tamponade Safety.',
      'Royal College of Anaesthetists (RCoA): Nitrous Oxide Safety and Guidelines in Vitreoretinal Gas Surgeries.',
      'Türk Oftalmoloji Derneği (TOD) Retina ve Vitreoretinal Cerrahi Birimi: Retina Dekolmanı Tedavi ve Vitrektomi Rehberi.'
    ]
  }
};
