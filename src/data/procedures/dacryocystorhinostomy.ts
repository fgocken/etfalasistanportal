import { ProcedureDefinition } from '../../types/procedures';

/**
 * Dakriyosistorinostomi (DCR): Eksternal ve Endoskopik Endonazal Lakrimal Kese-Burun Anastomozu ve Silikon Tüp İmplantasyonu
 * (Dacryocystorhinostomy [DCR]: External and Endoscopic Endonasal Approach with Bicanalicular Silicone Intubation)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Lacrimal Surgery: Dacryocystorhinostomy [External and Endonasal], pp. 888-894),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Lacrimal System Disorders and DCR,
 * European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS),
 * British Ophthalmic Anaesthesia Society (BOAS) & British Rhinological Society (BRS),
 * Türk Oftalmoloji Derneği (TOD) Oküloplastik ve Lakrimal Cerrahi Birimi Protokolleri referans alınarak yapılandırılmıştır.
 */
export const dacryocystorhinostomy: ProcedureDefinition = {
  id: 'dacryocystorhinostomy-dcr',
  name: 'Dakriyosistorinostomi (DCR): Eksternal ve Endoskopik Endonazal Gözyaşı Kesesi Cerrahisi',
  shortCode: 'GOZ-DCR',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Lakrimal Cerrahi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Gözyaşı kesesi (saccus lacrimalis) ile nazolakrimal kanalın burun boşluğuna (meatus nasi inferior) açıldığı hat boyunca gelişen tıkanıklıkların, kronik dakriyosistit ataklarının, mukosellerin ve inatçı göz sulanmasının (epifora) tedavisinde; gözyaşı kesesi ile burun boşluğu (orta mea - meatus nasi medius) arasında kemik pencere (osteotomi) açılarak yeni ve doğrudan bir akış yolu (fistül/anastomoz) oluşturulması ameliyatıdır. İki ana cerrahi yaklaşımla icra edilir: (1) Eksternal DCR (Toti Prosedürü / Açık Yaklaşım): Medial kantal tendonun 8-10 mm medyalinden cilt insizyonu yapılır; angular damarlar ekarte edilir; periost sıyrılarak lakrimal kemik ve maksillanın frontal çıkıntısında 10-15 mm kemik pencere (osteotomi) açılır; nazolakrimal kese ve nazal mukoza anterior-posterior fleplerle karşı karşıya getirilip dikilir; (2) Endoskopik Endonazal DCR: Ciltte hiçbir kesi ve iz olmadan, burun içinden rijit 0 ve 30 derece endoskoplarla girilerek orta konka hizasındaki mukoza soyulur, mikrotur veya Kerrison punch ile kemik pencere açılır ve kese burun içine ağızlaştırılır; (3) Bikanaliküler Silikon Tüp İmplantasyonu (Crawford / O\'Donoghue Tüpü): Yeni açılan ostiyumun fibrozisle tıkanmasını engellemek için üst ve alt punktumdan geçirilen silikon tüpler burun içinde düğümlenir.',
  indications: [
    'Primer Edinsel Nazolakrimal Kanal Obstrüksiyonu (PANDO): İleri yaşta fibrozis ve lümen tıkanıklığına bağlı inatçı epifora',
    'Kronik ve Tekrarlayan Akut Dakriyosistit: Medial kantal alanda apse, kızarıklık, ağrı ve pürülan akıntı atakları',
    'Lakrimal Kese Mukoseli ve Dakriyosistolitiazis (Gözyaşı kesesi taşları)',
    'Post-Travmatik Nazolakrimal Kanal Tıkanıklıkları (Nazo-orbito-etmoidal [NOE] kırıkları sekeli)',
    'Önceki Başarısız Sondalama veya DCR Revizyonu (Rekürren lakrimal stenoz)'
  ],
  averageDuration: '45 - 90 dakika (Endoskopik DCR: 45-60 dk; Eksternal DCR: 60-75 dk; Revizyon veya septoplasti kombine olgularda: 75-100 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 30 - 100 mL (Nazal mukoza, lakrimal kese venöz pleksusu ve kemik osteotomi hattı zengin kan dolaşımına sahiptir; lokal vazokonstriktörler ve kontrollü hipotansiyon ile kanama kontrol altında tutulur)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Risk / Ancak Posterior Nazofarinkse Kan Kaçışı ve İntraoperatif Aspirasyon Tehlikesi',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S opsiyonel; majör epistaksis öyküsü veya koagülopati varsa kontrol edilir)',
    transfusionProbability: '< %0.05 (İzole DCR cerrahisinde transfüzyon endikasyonu pratik olarak yoktur)',
    criticalBleedingSources: [
      'Nazal Mukoza ve Sfenopalatin Arter Dalları: Osteotomi ve nazal flep hazırlanırken orta mea mukozal kanaması',
      'Angular Arter ve Ven: Eksternal DCR cilt insizyonunun hemen medialinde yer alan büyük fasiyal damarlar',
      'Anterior Etmoidal Arter: Kemik osteotomi sınırının aşırı superiora veya posteriora kayması durumunda zedelenme riski',
      'Lakrimal Kese Venöz Pleksusu: Kese diseksiyonunda kanama'
    ],
    hemostasisStrategies: [
      'Topikal Nazal Paketleme: Ameliyat başında burun içine 1:100.000 veya 1:10.000 Adrenalinli / %4 Kokainli / Ksilometazolinli spanç yerleştirilmesi',
      'Lokal İnfiltrasyon: İnsizyon ve osteotomi hattına 1:100.000 Epinefrinli Lidokain enjeksiyonu',
      'Kontrollü Hipotansiyon (MAP 60-70 mmHg): Mukozal mikrosızıntıları baskılayarak endoskopik görüşün korunması',
      'Bipolar wet-field koter ve kemik mumu (bone wax) kullanımı'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi (GETA) + Koruyucu Boğaz Tamponu (Throat Pack) + Kontrollü Hipotansiyon (MAP 60-70 mmHg) + Pürüzsüz Ekstübasyon Protokolü — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Lokal İnfiltrasyon + İnfratroklear/İnfraorbital Sinir Blokları + Nazal Mukozal Topikal Blokaj + Monitörize Anestezi Bakımı (MAC): Genel anestezi riski çok yüksek olan seçilmiş, aşırı koopere hastalarda eksternal DCR için uygulanabilir; ancak nazofarinkse kan akışı nedeniyle aspirasyon riski çok dikkatli yönetilmelidir',
      'Laringeal Maske (LMA): Burun içi kanama ve sekresyonların hava yoluna kaçma riski nedeniyle standart DCR cerrahisinde ÖNERİLMEZ; kaflı endotrakeal tüp ve boğaz tamponu altın standarttır'
    ],
    rulesTitle: 'DAKRİYOSİSTORİNOSTOMİDE (DCR) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'DAKRİYOSİSTORİNOSTOMİDE (DCR) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) BOĞAZ TAMPONU (THROAT PACK) ZORUNLULUĞU, HAVA YOLUNA KAN KAÇIŞI VE SIFIR ASPİRASYON DİSİPLİNİ — Osteotomi yapılıp nazolakrimal kese ve nazal mukoza açıldığı andan itibaren cerrahi alandan posterior nazofarinkse ve hipofarinkse sürekli kan ve kemik tozu sızar. Aspirasyonu, laringospazmı ve postoperatif masif mide kan göllenmesini önlemek için entübasyon sonrası orofarenkse mutlaka nemlendirilmiş gazlı bezle Boğaz Tamponu (Throat Pack) yerleştirilmeli; anestezi fişine saati ve varlığı kaydedilmelidir. Ekstübasyondan önce farenks ve mide nazikçe aspire edilmeli ve boğaz tamponunun çıkarıldığı cerrah ile karşılıklı sesli teyit edilmelidir! (2) NAZAL MUKOZA VAZOKONSTRİKSİYONU (TOPİKAL ADRENALİN / KOKAİN) VE KARDİYOVASKÜLER ALARMI — Nazal ve lakrimal mukoza aşırı vaskülerdir. Cerrahi alandaki sızıntıyı durdurmak için 1:100.000 Epinefrinli lokal infiltrasyonun yanı sıra burun içine 1:10.000 veya 1:1000 Adrenalinli ya da %4 Kokainli burun tamponları uygulanır. Sistemik dolaşıma hızla emilen katekolaminler ani masif hipertansiyon piki, ventriküler taşiaritmi, miyokardiyal iskemi ve akut akciğer ödemi yaratabilir! Tampon yerleştirilme anında kan basıncı ve EKG kesintisiz izlenmeli, ani taşikardi ve tansiyon fırlamasına karşı İV Esmolol veya Labetalol hazır bulundurulmalıdır. (3) KONTROLLÜ HİPOTANSİYON (DELİBERE HİPOTANSİYON, MAP 60-70 mmHg) İLE KANSIZ CERRAHİ SAHA DİSİPLİNİ — Özellikle endonazal endoskopik DCR\'de birkaç damla kan bile endoskop kamerasını kör eder ve osteotomi sahasını kapatır. Kanama miktarını azaltmak ve cerrahi görüşü korumak için cerrahın osteotomi ve flep aşamasında ortalama arter basıncı (MAP) 60-70 mmHg seviyesinde kontrollü hipotansiyonda tutulmalıdır (Remifentanil infüzyonu, derin volatil anestezi ve başın 15-20 derece Reverse Trendelenburg yükseltilmesi ile). (4) KORNEA GÜVENLİĞİ, MEDİAL KANTUS EKSPORASYONUNDA SIFIR KORNEAL BASI/EROZYON — Eksternal DCR\'de medial kantal insizyon ve periost ekartasyonu, endoskopik DCR\'de ise lakrimal punktumlardan sokulan metal Bowman probları ve silikon tüpler korneanın hemen kenarında manipüle edilir. Ekartörlerin veya probun göze basmasını, korneanın kurumasını veya iyatrojenik çizilmesini engellemek için göze antibiyotikli pomad sürülerek opak plastik Corneal Shield (Kornea Kalkanı) yerleştirilmeli; cerrahi boyunca küreye sıfır bası prensibine uyulmalıdır. (5) PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE), SIFIR ÖKSÜRÜK VE ŞİDDETLİ POSTOPERATİF EPİSTAKSİS / HEMATOM ÖNLEMİ — Cerrahi bittiğinde nazolakrimal ostiyum ve nazal mukoza açıkta bırakılır veya silikon entübasyon tüpü ile drene edilir. Uyanma evresinde hastanın tüpe karşı öksürmesi, ıkınması veya tansiyonunun fırlaması nazal venöz pleksusları patlatarak masif epistaksis (burun kanaması), medial kantal hematom veya retrobulber kanamaya yol açar! Ekstübasyondan önce İV Lidokain (1.5 mg/kg) verilmeli, öksürmeden pürüzsüz uyandırılmalı, agresif antiemetik profilaksisi (Ondansetron) uygulanmalı ve hastaya ameliyat sonrası burnunu ASLA sümkürmemesi tembihlenmelidir.',
    indispensableRules: [
      {
        number: 1,
        title: 'BOĞAZ TAMPONU (THROAT PACK) ZORUNLULUĞU, HAVA YOLUNA KAN KAÇIŞI VE SIFIR ASPİRASYON DİSİPLİNİ',
        content: 'Osteotomi yapılıp nazolakrimal kese ve nazal mukoza açıldığı andan itibaren cerrahi alandan posterior nazofarinkse ve hipofarinkse sürekli kan ve kemik tozu sızar. Aspirasyonu, laringospazmı ve postoperatif masif mide kan göllenmesini önlemek için entübasyon sonrası orofarenkse mutlaka nemlendirilmiş gazlı bezle Boğaz Tamponu (Throat Pack) yerleştirilmeli; anestezi fişine saati ve varlığı kaydedilmelidir. Ekstübasyondan önce farenks ve mide nazikçe aspire edilmeli ve boğaz tamponunun çıkarıldığı cerrah ile karşılıklı sesli teyit edilmelidir!'
      },
      {
        number: 2,
        title: 'NAZAL MUKOZA VAZOKONSTRİKSİYONU (TOPİKAL ADRENALİN / KOKAİN) VE KARDİYOVASKÜLER ALARMI',
        content: 'Nazal ve lakrimal mukoza aşırı vaskülerdir. Cerrahi alandaki sızıntıyı durdurmak için 1:100.000 Epinefrinli lokal infiltrasyonun yanı sıra burun içine 1:10.000 veya 1:1000 Adrenalinli ya da %4 Kokainli burun tamponları uygulanır. Sistemik dolaşıma hızla emilen katekolaminler ani masif hipertansiyon piki, ventriküler taşiaritmi, miyokardiyal iskemi ve akut akciğer ödemi yaratabilir! Tampon yerleştirilme anında kan basıncı ve EKG kesintisiz izlenmeli, ani taşikardi ve tansiyon fırlamasına karşı İV Esmolol veya Labetalol hazır bulundurulmalıdır.'
      },
      {
        number: 3,
        title: 'KONTROLLÜ HİPOTANSİYON (DELİBERE HİPOTANSİYON, MAP 60-70 mmHg) İLE KANSIZ CERRAHİ SAHA DİSİPLİNİ',
        content: 'Özellikle endonazal endoskopik DCR\'de birkaç damla kan bile endoskop kamerasını kör eder ve osteotomi sahasını kapatır. Kanama miktarını azaltmak ve cerrahi görüşü korumak için cerrahın osteotomi ve flep aşamasında ortalama arter basıncı (MAP) 60-70 mmHg seviyesinde kontrollü hipotansiyonda tutulmalıdır (Remifentanil infüzyonu, derin volatil anestezi ve başın 15-20 derece Reverse Trendelenburg yükseltilmesi ile).'
      },
      {
        number: 4,
        title: 'KORNEA GÜVENLİĞİ, MEDİAL KANTUS EKSPORASYONUNDA SIFIR KORNEAL BASI/EROZYON',
        content: 'Eksternal DCR\'de medial kantal insizyon ve periost ekartasyonu, endoskopik DCR\'de ise lakrimal punktumlardan sokulan metal Bowman probları ve silikon tüpler korneanın hemen kenarında manipüle edilir. Ekartörlerin veya probun göze basmasını, korneanın kurumasını veya iyatrojenik çizilmesini engellemek için göze antibiyotikli pomad sürülerek opak plastik Corneal Shield (Kornea Kalkanı) yerleştirilmeli; cerrahi boyunca küreye sıfır bası prensibine uyulmalıdır.'
      },
      {
        number: 5,
        title: 'PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE), SIFIR ÖKSÜRÜK VE ŞİDDETLİ POSTOPERATİF EPİSTAKSİS / HEMATOM ÖNLEMİ',
        content: 'Cerrahi bittiğinde nazolakrimal ostiyum ve nazal mukoza açıkta bırakılır veya silikon entübasyon tüpü ile drene edilir. Uyanma evresinde hastanın tüpe karşı öksürmesi, ıkınması veya tansiyonunun fırlaması nazal venöz pleksusları patlatarak masif epistaksis (burun kanaması), medial kantal hematom veya retrobulber kanamaya yol açar! Ekstübasyondan önce İV Lidokain (1.5 mg/kg) verilmeli, öksürmeden pürüzsüz uyandırılmalı, agresif antiemetik profilaksisi (Ondansetron) uygulanmalı ve hastaya ameliyat sonrası burnunu ASLA sümkürmemesi tembihlenmelidir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Lakrimal lavaj ve sondalama (flushing/probing), Jones boya testleri, dakriyosistografi veya BT-dakriyosistografi (kese boyutu ve kemik anatomisi) ve cerrahi yaklaşım seçimi (eksternal vs endonazal).',
      'KBB Konsültasyonu: Endonazal DCR planlanan hastalarda nazal septum deviasyonu, konka hipertrofisi, polip veya sinüzit varlığının değerlendirilmesi (gereğinde DCR ile eşzamanlı septoplasti planı).',
      'Kardiyoloji Konsültasyonu: İleri yaş grupta hipertansiyon, aritmiler ve koroner arter hastalığı kontrolü; yüksek doz nazal adrenalin/kokain absorbsiyonu ve kontrollü hipotansiyon toleransı.',
      'Anestezi Değerlendirmesi: Hava yolu muayenesi, entübasyon güvenliği ve boğaz tamponu planlaması.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan İlaç Kullanımı: Aspirin, Klopidogrel, Warfarin ve DOAK; DCR ameliyatında mukozal ve kemik kanaması cerrahi görüşü doğrudan engellediğinden ve postoperatif masif epistaksis riski taşıdığından hemostatik ilaç planı cerrah ile konsülte edilir.',
      'Sık Tekrarlayan Burun Kanaması (Epistaksis) veya Kanama Bozukluğu Öyküsü.',
      'Aktif Akut Dakriyosistit (Kese Apsesi): Akut selülit ve apse döneminde cerrahi yapılmaz; önce sistemik antibiyotik ile enfeksiyon yatıştırılır.',
      'Hipertansiyon Öyküsü: İntraoperatif kanama kontrolünü zorlaştıran kontrolsüz tansiyonun optimizasyonu.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri, Serum Elektrolitleri ve Böbrek Fonksiyonları.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Paranazal Sinüs ve Lakrimal Sistem İnce Kesit BT.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Adrenalin taşiaritmi ve iskemi analizi), SpO2, NIBP, EtCO2 ve Vücut Sıcaklığı.',
      'Sürekli Kan Basıncı Takibi (İnvaziv Arter Kanülasyonu veya 2-3 dakikada bir NIBP): Kontrollü hipotansiyon (hedef MAP 60-70 mmHg) ve adrenalin kaynaklı ani tansiyon piklerinin izlenmesi.',
      'Nöromusküler İleti Monitörizasyonu (TOF): Osteotomi ve mikrotur kullanımı esnasında hastanın hareket etmemesi için TOF %0-25 seviyesinde tutulur.'
    ],
    vascularAccess: [
      'En az 1-2 adet geniş lümenli periferik intravenöz damar yolu (18G)',
      'Acil Hipertansiyon & Taşikardi Kiti: İV Esmolol, Labetalol veya Gliseril Trinitrat (topikal adrenalin piki için masada hazır)',
      'Acil Bradikardi Kiti: İV Atropin (0.5 mg ampul)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Donüt ile Sabit ve 15-20 Derece Reverse Trendelenburg',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; baş mikroskobun veya endoskopi kulesinin açısına göre nötral konumda sabitlenir.',
      'Baş-boyun venöz göllenmesini azaltmak ve mukozal kanamayı minimize etmek için yatağın baş kısmı 15-20 derece yükseltilir (Reverse Trendelenburg).',
      'Endonazal DCR\'de cerrah hastanın sağ tarafında veya başucunda durur; anestezi hortumları karşı tarafa güvenle yönlendirilir.',
      'Eksternal DCR\'de kornea kalkanı (Corneal Shield) yerleştirilir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - Propofol (2.0 mg/kg) + Fentanil (2 mcg/kg) veya Remifentanil + Rokuronyum (0.6 mg/kg).',
      '  - Spiral telli (reinforced) veya güney-kutuplu (polar) endotrakeal tüp ile entübasyon sağlanır.',
      '  - ENTÜBASYON SONRASI HEMEN: Orofarenkse nemlendirilmiş gazlı bezle BOĞAZ TAMPONU (THROAT PACK) yerleştirilir ve anestezi formuna kaydedilir.',
      'İdame ve Kontrollü Hipotansiyon:',
      '  - TIVA (Propofol + Remifentanil infüzyonu 0.1 - 0.25 mcg/kg/dk) veya Sevofluran/İzofluran.',
      '  - Remifentanil titrasyonu ile hedef MAP 60-70 mmHg aralığında tutulur; bu sayede endoskopik cerrahi sahada kanama minimuma iner.',
      'Topikal Nazal Dekonjestan Uygulaması:',
      '  - Cerrah burun içine 1:10.000 veya 1:100.000 Adrenalin emdirilmiş pamuk tamponlar koyduğunda anestezi tansiyon ve EKG ritmini dikkatle izler; taşikardide cerraha bilgi verilir.'
    ],
    airwayManagement: [
      'Spiral telli endotrakeal tüp cerrahi saha basısına ve baş hareketlerine karşı kinking yapmaz.',
      'Boğaz tamponunun varlığı, posterior burun kanamasının trakeaya ve mideye sızmasını engeller.',
      'Ekstübasyondan önce nazogastrik/orogastrik sonda ile mideye sızmış olabilecek kan aspire edilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Monitörizasyon ve Başın Yükseltilmesi (15-20 derece).',
      '2. Burun İçine Adrenalinli/Dekonjestan Tamponların Yerleştirilmesi (Kardiyovasküler izlem!).',
      '3. Koruyucu Pomad Eşliğinde Kornea Kalkanının Takılması (Eksternal DCR) veya Gözün Korunması.',
      '4. Cilt İnsizyonu (Eksternal) veya Endoskopik Nazal Mukozal Flep Disseksiyonu (Endonazal).',
      '5. Periostun Sıyrılması ve Kemik Osteotomi Hattının Belirlenmesi.',
      '6. Kemik Pencerenin Açılması (Osteotomi: Mikrotur, rongeur veya Kerrison punch ile kemik eksizyonu — Kanama kontrolü!).',
      '7. Lakrimal Kesenin İnsizyonu, Açılması ve Mukozal Fleplerin Hazırlanması.',
      '8. Bowman Probu Eşliğinde Bikanaliküler Silikon Entübasyon Tüplerinin (Crawford) Geçirilmesi.',
      '9. Kese Flepleri ile Nazal Mukozanın Karşı Karşıya Getirilmesi ve Dikilmesi.',
      '10. Silikon Tüplerin Burun İçinde Düğümlenmesi, Nazal Tampon Yerleştirilmesi, Kornea Kalkanının Çıkarılması ve Cilt Sütürasyonu.'
    ],
    emergenceNotes: [
      'BOĞAZ TAMPONUNUN (THROAT PACK) ÇIKARILMASI: Ekstübasyondan hemen önce farenks direct laringoskopiyle kontrol edilir, aspire edilir ve tampon cerrah ile sesli teyit edilerek çıkarılır.',
      'Ekstübasyon Protokolü: Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg) uygulanır.',
      'Hasta öksürmeden, ıkınmadan ve tansiyon piki yapmadan pürüzsüz uyandırılmalıdır (öksürük akut nazal kanamayı ve hematomu tetikler).',
      'İntraoperatif kombine İV Ondansetron (4-8 mg) + Deksametazon (4 mg) ile postoperatif kusma kesinlikle önlenir.',
      'Ekstübasyon sonrası hastaya burnunu sümkürmemesi tembihlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'DCR sonrası ağrı genellikle orta düzeydedir ve burun kökü ile medial kantusta künt zonklama şeklindedir.',
      'İntravenöz / Oral Parasetamol (1000 mg) her 6 saatte bir bazal analjezik olarak uygulanır.',
      'Gereğinde İV Tramadol (50 mg).',
      'Kanama riskini artırabilecek aspirin ve agresif NSAİİ kullanımından erken postoperatif dönemde kaçınılmalıdır.',
      'Burun köküne aralıklı soğuk jel kompres uygulanması ödemi ve kanamayı belirgin şekilde azaltır.'
    ],
    prospectRecommendations: [
      'PROSPECT Oküloplastik ve Rinolojik Cerrahi Rehberleri:',
      'Preoperatif ve intraoperatif multimodal analjezi;',
      'Postoperatif dönemde şiddetli kusma ve ıkınmayı önleyecek agresif antiemetik protokolü;',
      'Lokal infiltrasyon ve sinir bloklarının postoperatif opioid ihtiyacını anlamlı derecede düşürdüğü bildirilmektedir.'
    ],
    erasRecommendations: [
      'ERAS Göz ve KBB Cerrahisi Protokolleri:',
      'Günübirlik cerrahi (Day-case) veya 1 gece gözlem.',
      'Başın 30-45 Derece Yükseltilmesi: İlk 48 saat venöz drenajı artırarak ödemi ve epistaksis riskini azaltır.',
      'Sümkürme Yasağı: En az 10-14 gün boyunca burun sümkürülmemeli; hapşırırken ağız açık tutulmalıdır (retrograd orbital amfizem ve hematom riski).',
      'Nazal Salin Lavajı: Burun içi krutları temizlemek ve ostiyum açıklığını korumak için izotonik deniz suyu spreyleri başlanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Lacrimal Surgery - Dacryocystorhinostomy (External and Endonasal), pp. 888-894.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS): Guidelines for Lacrimal and Day-Case Rhinologic Surgery.',
    prospectReference: 'PROSPECT Guidelines: Postoperative Pain and PONV Management in Oculoplastic and Lacrimal Procedures.',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Lacrimal System Disorders and Dacryocystorhinostomy.',
      'European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS): Consensus on External and Endoscopic DCR.',
      'British Rhinological Society (BRS) & BOAS: Safe Anesthesia Practice in Endoscopic Lacrimal and Sinonasal Surgery.',
      'Türk Oftalmoloji Derneği (TOD) Oküloplastik ve Lakrimal Cerrahi Birimi: Lakrimal Sistem Hastalıkları ve Tedavi Rehberi.'
    ]
  }
};
