import { ProcedureDefinition } from '../../types/procedures';

/**
 * Karotis Endarterektomi (KEA): Açık Karotis Bifurkasyonu Plak Rezeksiyonu ve Yama (Patch) / Primer Anjiyoplasti
 * (Carotid Endarterectomy - CEA)
 * 
 * Jaffe (5th ed., Section III: Vascular Surgery - Carotid Endarterectomy, pp. 586-594),
 * European Society for Vascular Surgery (ESVS 2023 Kılavuzları),
 * Society for Vascular Surgery (SVS), Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve American Heart Association / American Stroke Association (AHA/ASA) Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const carotidEndarterectomy: ProcedureDefinition = {
  id: 'carotid-endarterectomy',
  name: 'Karotis Endarterektomi (KEA): Açık Karotis Bifurkasyonu Plak Rezeksiyonu ve Yama (Patch) / Primer Anjiyoplasti',
  shortCode: 'KVC-KEA-CAROTID',
  specialty: 'kvc',
  specialtyName: 'Kalp ve Damar Cerrahisi',
  categoryTag: 'Periferik & Nörovasküler Cerrahi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Ekstrakraniyal internal karotis arterin (ICA) bifurkasyon yerleşimli aterosklerotik plağının temizlenerek serebral kan akımının restore edilmesi ve iskemik inme (stroke) riskinin önlenmesi amacıyla uygulanan açık vasküler cerrahidir. Sternokleidomastoid (SCM) kasının ön kenarından yapılan oblik veya longitudinal boyun insizyonuyla karotis kılıfı açılır; Ana Karotis Arter (CCA), İnternal Karotis Arter (ICA) ve Eksternal Karotis Arter (ECA) dikkatle dönülerek teyp askıya alınır. İntravenöz heparinizasyon (50-100 IU/kg) sonrası arterler klemplenir. Klempleme esnasında serebral kollateral perfüzyon (rejyonel anestezide uyanık nörolojik takip, genel anestezide karotis güdük basıncı [stump pressure], EEG, SSEP veya NIRS-rSO2) değerlendirilir; serebral iskemi bulgusu saptanırsa derhal intraluminal geçici şant (Javid veya Pruitt-Inahara şantı) yerleştirilir. Longitudinal arteriyotomi ile aterom plağı intimadan dikkatle soyularak çıkarılır (endarterektomi); distal intimal flap kalmaması için kontrol edilir. Lümenin daralmasını engellemek ve restenoz riskini azaltmak amacıyla sentetik (Dacron, PTFE) veya otolog ven yaması (patch anjiyoplasti) kullanılarak arteriyotomi kapatılır. Klempler açılmadan önce distal mikroemboli ve hava embolisini engellemek için önce ECA\'ya doğru kanatılıp yıkanır (flushing), ardından ICA açılarak beyin akımı başlatılır. Heparin kontrollü protamin ile nötralize edilir.',
  indications: [
    'Semptomatik Şiddetli Karotis Stenozu: Son 6 ay içinde geçici iskemik atak (GİA / TIA) veya minör inme geçiren, NASCET kriterlerine göre %70-99 darlığı olan hastalar (ilk 14 gün içinde erken cerrahi önerilir)',
    'Semptomatik Orta Dereceli Karotis Stenozu: Nörolojik semptomları olan ve %50-69 lümen darlığı bulunan seçilmiş erkek ve yüksek riskli hastalar',
    'Asemptomatik Kritik Karotis Stenozu: ACAS / ACST kriterlerine göre sessiz infarkt, mikroemboli sinyalleri (TCD) veya kararsız plak özellikleri taşıyan %70-99 darlıklı hastalar',
    'Kararsız / Ülseratif Aterom Plağı: Ciddi darlık derecesinden bağımsız olarak yüzeyinde serbest hareketli trombüs veya intraplak kanama tespit edilen yüksek emboli riskli lezyonlar',
    'Karotis Stent Restenozu veya Trombozu: Karotis arter stentlemesi (CAS) sonrası gelişen intimal hiperplazi veya instabilite revizyonu'
  ],
  averageDuration: '1.5 - 2.5 saat (Pozisyonlama ve monitörizasyon: 20-30 dk; Cerrahi diseksiyon ve karotis bifurkasyonunun ortaya konması: 30-45 dk; Klempleme, şant [gerekirse], endarterektomi ve yama anjiyoplastisi: 25-45 dk; Deklempleme, hemostaz ve katmanlı boyun kapanışı: 20-30 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 300 mL (Sistemik heparinizasyona bağlı mikrosızıntılar; ancak boyunda kapalı derin fasyal aralıkta biriken 50-100 mL hematom bile trakeayı ezerek dakikalar içinde ölümcül hava yolu kaybına yol açabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Akut Kompresif Boyun Hematomu ve Hava Yolu Obstrüksiyonu Hayati Tehdidi',
    crossMatchRequirement: '1-2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır; Tip & Screen (T&S) doğrulanmış olmalıdır',
    transfusionProbability: '%5 - %15 (Nadir transfüzyon; ancak kontrolsüz hipertansiyon veya sütür hattı yırtığında acil revizyon gerekebilir)',
    criticalBleedingSources: [
      'Karotis Arteriyotomi ve Yama (Patch) Sütür Hatları (Özellikle aterosklerotik kırılgan damar duvarından sızıntı)',
      'Süperior Tiroid Arter Girişi ve Dal Kanamaları',
      'Ortak Fasiyal Ven (Common facial vein / V. facialis communis) Ligasyon Güdüğü',
      'SCM Kas Yatağı ve Derin Servikal Venöz Pleksus Sızıntıları'
    ],
    hemostasisStrategies: [
      'İntraoperatif Heparinizasyon ve Protamin Titrasyonu: Klempleme öncesi 50-100 IU/kg Heparin; deklempleme sonrası ACT kontrolü ile 1 mg Protamin / 100 IU Heparin şeklinde titre edilerek yavaş İV infüzyon',
      'Sütür hatlarında hemostatik matriksler (FloSeal, Surgicel, Tachosil) ve bipolar mikrokoter kullanımı',
      'Deklempleme sonrası kan basıncının sıkı kontrolü (SKB < 130-140 mmHg) — reaktif sütür kanamasını önler',
      'Boyun derin kompartmanına yerleştirilen negatif basınçlı kapalı emici dren (Jackson-Pratt veya hemovak)',
      'Aspirin/Klopidogrel yönetimi: Tekli antiagregan (çoğunlukla Aspirin 100 mg) kılavuzlara uygun olarak operasyon sabahına kadar sürdürülür'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Rejyonel Anestezi (Ultrason Eşliğinde Yüzeyel / İntermedier Servikal Pleksus Bloğu C2-C4 + Cerrahi Lokal Anestezik İnfiltrasyonu) — Uyanık nörolojik değerlendirme (hastanın karşı taraf elinde stres topu sıktırılması, konuşma ve bilinç takibi) için MUTLAK ALTIN STANDARTTIR'
    ],
    alternative: [
      'Genel Endotrakeal Anestezi (GETA) + İONM (EEG / SSEP / TCD / NIRS-rSO2 veya Güdük Basıncı [Stump Pressure]): Panik, kooperasyonu zayıf, boyun ekstansiyonunu tolere edemeyen veya yüksek servikal lezyonu olan hastalarda TIVA (Propofol + Remifentanil) ile'
    ],
    clinicalRationale: 'Ultrason eşliğinde servikal pleksus bloğu ve bilinçli uyanık takip; karotis klemplemesi sırasında serebral iskemiyi hiçbir monitöre ihtiyaç duymadan (konuşma, bilinç ve karşı el motor testiyle) gerçek zamanlı saptamayı, gereksiz şant yerleşimini önlemeyi ve perioperatif hemodinamik stabiliteyi korumayı sağladığı için altın standarttır. Hastanın spontan solunumu korunup yüzü açık bırakılarak (çadır drape + nazal O2/EtCO2) sözel iletişim sağlanır; genel anestezi gerektiğinde ise cerrahi boyun manipülasyonu ve pozisyon altında hava yolu güvenliği ile normokapni kontrolü için kaflı endotrakeal tüp zorunludur.',
    notes: 'KAROTİS ENDARTEREKTOMİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) KAROTİS KLEMPLEME İSKEMİSİ, GÜDÜK BASINCI (STUMP PRESSURE) VE ŞANT KARARI — Karotis klemplendiğinde beynin ipsilateral hemisferi Willis poligonu ve kontralateral karotis/vertebrobaziler kollaterallere bağımlı hale gelir. Klempleme öncesinde serebral kollateral perfüzyonu artırmak için MAP %10-20 yükseltilmelidir (hedef MAP 90-105 mmHg). Güdük basıncı (Stump Pressure) manometre ile ölçüldüğünde < 40-50 mmHg ise, veya uyanık hastada nörolojik defisit (karşı elde güç kaybı, dizartri, bilinç bulanıklığı), veya genel anestezide EEG\'de yavaşlama/SSEP amplitüd kaybı gelişirse beyni korumak için DERHAL İNTRALUMİNAL GEÇİCİ ŞANT (Javid veya Pruitt-Inahara) yerleştirilmelidir! (2) KAROTİS SİNÜS REFLEKSİ VE ŞİDDETLİ VAGAL BRADİKARDİ / HİPOTANSİYON KORUMASI — Karotis bifurkasyonu ve sinüsü diseke edilirken veya manipüle edilirken baroreseptörlerin gerilmesi ani ve şiddetli vagal deşarja, derin bradikardiye, asistoliye ve vazodilatatör hipotansiyona yol açar. Cerrah bifurkasyon diseksiyonuna başlamadan önce karotis adventisyasına 1-2 mL %1-2\'lik Lidokain infiltrasyonu yapmalıdır; anestezist masada atropin/glikopirolat ile efedrin/noradrenalini hazır tutmalıdır. (3) KAROTİS DEKLEMPLEME HİPOTANSİYONU VE SEREBRAL HİPERPERFÜZYON SENDROMU (CHS) — Kronik iskemik serebral damarlar otoregülasyon yeteneğini kaybetmiştir (kronik vazodilatasyon). Klempler açıldıktan sonra gelişebilecek kontrolsüz sistemik hipertansiyon (SKB > 140-160 mmHg), doğrudan kapiller yatağa yansıyarak vazojenik beyin ödemi, nöbetler ve ölümcül intraserebral hemorajiyle seyreden SEREBRAL HİPERPERFÜZYON SENDROMUNA (CHS) neden olur! Deklempleme anında kan basıncı derhal kontrol altına alınmalı (SKB < 130-140 mmHg, hastanın bazal tansiyonu sınırında); Labetalol, Esmolol, Nikardipin veya Nitrogliserin infüzyonu hazır olmalıdır. (4) AKUT KOMPRESİF BOYUN HEMATOMU VE ACİL YATAKBAŞI DİKİŞ AÇMA PROTOKOLÜ — Karotis sütür hattından veya boyun damarlarından sızan kan, derin servikal fasya altında hızla toplanarak trakeayı basıya uğratır ve masif larinks ödemi yaratır. Postoperatif ilk 6 saatte boyunda ani şişlik, solunum sıkıntısı veya stridor geliştiğinde hasta ameliyathaneye taşınacak zamana sahip değildir; YATAKBAŞINDA STERİL ŞARTLAR ARANMAKSIZIN TÜM CİLT VE FASYA DİKİŞLERİ DERHAL AÇILIP HEMATOM BOŞALTILMALI, trakea basısı kalktıktan sonra acil entübasyon yapılmalıdır! (5) KRANİYAL SİNİR YARALANMALARI (VII, IX, X, XI, XII) VE POSTOPERATİF SOLUNUM KORUMASI — Cerrahi sahada hipoglossal sinir (CN XII - dil deviasyonu ve hava yolu kollapsı), rekürren laringeal sinir / vagus (CN X - tek taraflı ses kısıklığı veya bilateral felçte akut stridor/afoni), fasiyal sinirin marjinal mandibuler dalı (CN VII - ağız köşesi sarkması) ve glossofaringeal sinir (CN IX - yutma güçlüğü) doğrudan hasar riski taşır. Ekstübasyonda vokal kord hareketi, dil protrüzyonu ve yutma refleksi mutlaka kontrol edilmeli, bilateral karotis cerrahisi öyküsü olanlarda bilateral glomus kaybına bağlı hipoksik solunum dürtüsü kaybı akılda tutulmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji Konsültasyonu: Son nörolojik atağın (TIA, inme) zamanı, modified Rankin Skoru (mRS) ve NIHSS skorlaması; kraniyal sinir taban fonksiyonları ve preoperatif kognitif durum belgelenmesi.',
      'Kardiyoloji Konsültasyonu: Karotis darlığı olan hastaların %40-60\'ında sessiz veya semptomatik Koroner Arter Hastalığı (KAH) eşlik eder; EKG (iskemi), Eko (EF, kapak) ve bazal hipertansiyon optimizasyonu.',
      'Girişimsel Nöroradyoloji / Radyoloji: Karotis Doppler USG, BT Anjiyografi veya MR Anjiyografi ile plak morfolojisi (kalsifikasyon, ülserasyon), lezyonun servikal seviyesi (C2-C3 yüksek bifürkasyon cerrahi zorluk yaratır) ve Willis poligonunun açıklığı (ön ve arka komünikan arterlerin varlığı).',
      'Anestezi Polikliniği: Boyun ekstansiyon ve rotasyon kısıtlılığı (servikal spondiloz), uyanık cerrahiye psikolojik uyum, zor hava yolu ve boyun hematomunda acil hava yolu planı.'
    ],
    historyAndPhysical: [
      'Nörolojik Taban Muayenesi: Karşı taraf ekstremitelerde motor kuvvet, konuşma (afazi/dizartri), yüzde asimetri.',
      'Serebrovasküler Rezerv: Karşı karotis arterin açıklık durumu (kontralateral oklüzyon varsa klempleme toleransı çok düşüktür; şant ihtiyacı %80\'e çıkar).',
      'Antiagregan ve Antikoagülan Tedavi: Aspirin (devam edilir), Klopidogrel (cerrah protokolüne göre devam veya 3-5 gün önce kesilme), DOAK/Varfarin (INR < 1.5 olacak şekilde kesilme/köprüleme).',
      'Bazal Kan Basıncı Profili: Hastanın evdeki ve hastanedeki bazal tansiyonu (ameliyat içi klempleme ve deklempleme hedefleri bu değere göre belirlenir).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR (Varfarin kullananlarda INR teyidi).',
      '1-2 Ünite Eritrosit Süspansiyonu Cross-Match ve Kan Grubu Doğrulaması.',
      'Biyokimya: Serum elektrolitleri, üre, kreatinin, glukoz.',
      '12 Derivasyonlu EKG (Aritmi ve sessiz iskemi değerlendirmesi).',
      'Beyin BT veya Diffüzyon MRG: Akut/subakut enfarkt alanı varlığı (yeni geniş enfarktlarda reperfüzyon kanaması riski nedeniyle cerrahi ertelenebilir).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (ST segment iskemi analizi — KVC hastalarında perioperatif MI riski yüksektir), SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Radyal Arter Basıncı İzlemi (A-Line): Klempleme ve deklempleme tansiyonunun anlık takibi için ZORUNLUDUR; tercihen karotis patolojisinin KARŞI TARAFINDAKİ radyal artere takılır (operasyon tarafında brakiyosefalik arter manipülasyonu durumunda yanlış ölçümü önlemek için).',
      'Nörolojik Monitörizasyon:',
      '  - Rejyonel Anestezi (Altın Standart): Uyanık hastada karşı elin stres topu sıkması (motor), basit sorulara yanıt (konuşma/afazi), bilinç durumu ve oryantasyon.',
      '  - Genel Anestezide: İşlenmiş EEG (Bispectral Index / raw EEG asimetrisi), Somatosensoriyel Uyarılmış Potansiyeller (SSEP), Transkraniyal Doppler (TCD - orta serebral arter MCA akım hızı) veya Serebral Oksimetri (NIRS / rSO2 — bazale göre > %20 düşüş iskemi alarmıdır).',
      'Karotis Güdük Basıncı (Carotid Stump Pressure): Klempleme sonrası ICA içine takılan iğneyle ölçülen retrograd kan basıncı (< 40-50 mmHg ise şant endikasyonu).',
      'Aktive Edilmiş Pıhtılaşma Zamanı (ACT): Heparin öncesi bazal ve heparinden 3-5 dk sonra (hedef ACT > 200-250 sn).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (16-18G) periferik intravenöz yol',
      'Hazır İnfüzyon Hatları: Vazopressör (Fenilefrin / Efedrin / Noradrenalin) ve Vazodilatatör (Nitrogliserin / Labetalol / Nikardipin)',
      'Santral Venöz Kateter (CVC): Rutin değildir; ciddi kardiyak yetmezliği veya zor periferik damar yolu olan seçilmiş hastalarda'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Karşı Tarafa 30-45° Çevrilmiş',
    patientPositionDetails: [
      'Omuz altına küçük silikon rulo yerleştirilerek boyun hafif ekstansiyona getirilir.',
      'Baş karşı tarafa 30-45° hafif rotasyona alınır; AŞIRI ROTASYONDAN KAÇINILMALIDIR (aşırı rotasyon kontralateral vertebral arteri komprese ederek vertebrobaziler iskemi yaratabilir).',
      'Rejyonel anestezide cerrahi örtüler hastanın yüzünü örtmeyecek şekilde bir kemer (L-bar) üzerine asılarak çadır oluşturulur; hastanın göz teması ve hava sirkülasyonu sağlanır.',
      'Karşı kola stres topu veya bip sesi veren oyuncak yerleştirilerek klempleme süresince ritmik sıkması istenir.'
    ],
    anesthesiaManagement: [
      'Rejyonel Anestezi Protokolü (Uyanık Takip):',
      '  - Ultrason Eşliğinde Yüzeyel / İntermedier Servikal Pleksus Bloğu (SCM arka kenarı, Erb noktası C2-C4 seviyesi, 10-15 mL Bupivakain %0.25 veya Ropivakain %0.375 + Lidokain %1).',
      '  - Derin servikal pleksus bloğundan kaçınılır (yüksek vasküler enjeksiyon, frenik sinir felci ve subaraknoid kaçak riski nedeniyle).',
      '  - Cerrah insizyon hattına ve karotis kılıfına ek lokal anestezik (Lidokain %1) infiltrasyonu uygular.',
      '  - Minimal sedasyon: Hasta ile sözel temasın kaybolmaması için aşırı sedasyondan (Midazolam/Opioid) kesinlikle kaçınılır; gerekirse çok düşük doz Deksmedetomidin (0.1-0.2 mcg/kg/saat) veya Remifentanil (0.02-0.05 mcg/kg/dk) titre edilebilir.',
      'Genel Anestezi Protokolü (Seçilmiş Olgularda):',
      '  - TIVA Protokolü (Propofol + Remifentanil): Nörofizyolojik monitörizasyonu (EEG/SSEP) bozmaz, serebral metabolizma hızını (CMRO2) düşürerek nöroproteksiyon sağlar.',
      '  - Pürüzsüz indüksiyon ve ekstübasyon; öksürme ve ıkınmayı önlemek için IV Lidokain (1.5 mg/kg).',
      'Klempleme Fazı Yönetimi:',
      '  - Klemplemeden önce İV Heparin (50-100 IU/kg) bolus; 3 dakika sonra ACT > 200-250 sn teyit edilir.',
      '  - Klempleme anında kollateral serebral perfüzyonu korumak için kan basıncı yükseltilir (hedef MAP 90-105 mmHg, Noradrenalin veya Efedrin ile).',
      '  - Klempleme süresi boyunca uyanık hastanın nörolojik fonksiyonları (el sıkma, konuşma, sayma) aralıksız test edilir.',
      '  - İntraluminal Şant Kararı: Nörolojik bozulma, Stump basıncı < 40-50 mmHg veya NIRS\'ta > %20 düşüş olursa cerrah derhal Javid veya Pruitt-Inahara şantı takar.',
      'Karotis Sinüs Refleksi Yönetimi:',
      '  - Bifurkasyon manipülasyonunda ani bradikardi gelişirse cerraha uyarı verilir; bifurkasyona 1-2 mL %1-2 Lidokain enjekte edilir; gerekirse İV Atropin (0.5 mg) uygulanır.',
      'Deklempleme Fazı Yönetimi:',
      '  - Klempler açılmadan önce distal trombüs veya hava embolisini önlemek için cerrah önce eksternal karotise doğru deşarj (flushing) yapar.',
      '  - Deklempleme sonrası kan basıncı HIZLA KONTROL ALTINA ALINIR (hedef SKB < 130-140 mmHg); Serebral Hiperperfüzyon Sendromu (CHS) ve boyun hematomunu önlemek için Labetalol, Esmolol veya Gliseril Trinitrat titre edilir.',
      '  - Protamin Sülfat: Cerrah onayı ile 1 mg Protamin / 100 IU Heparin yavaş infüzyonla verilir (ani hipotansiyon ve bronkospazmı önlemek için).'
    ],
    airwayManagement: [
      'Rejyonel anestezide hastanın hava yolu açıktır; burun kanülü ile 2-4 L/dk O2 verilir. Ancak ani bilinç kaybı, konvülsiyon veya masif cerrahi kanama durumunda acil havayolu yönetimi için videolaringoskop ve entübasyon tüpleri ameliyathanede hazır bulundurulmalıdır.',
      'Genel anestezide oral endotrakeal tüp cerrahi sahanın karşı ağız köşesinden bantlanır.',
      'Kaf basıncı sürekli manometre ile 20-25 cmH2O seviyesinde tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Boyun Pozisyonlama, Lokal/Rejyonel Blok Doğrulaması ve Steril Örtünme (Çadır sistemi).',
      '2. Anterior Servikal İnsizyon ve Platisma/Fasya Diseksiyonu.',
      '3. Karotis Kılıfının Açılması, Ortak Fasiyal Venin Ligasyonu ve Karotis Arterlerinin (CCA, ICA, ECA) Askıya Alınması.',
      '4. Karotis Sinüsünün Lidokain ile Bloke Edilmesi (Vagal refleks koruması).',
      '5. Sistemik İntravenöz Heparinizasyon ve ACT Kontrolü (ACT > 200-250 sn).',
      '6. Karotis Arterlerinin Klemplenmesi (İskemi takibi, güdük basıncı ölçümü ve gerekirse intraluminal şant yerleşimi).',
      '7. Longitudinal Arteriyotomi ve Aterom Plağının Endarterektomisi (İntimal flap kontrolü).',
      '8. Yama (Dacron/PTFE/Ven Patch) veya Primer Dikiş ile Arteriyotominin Kapatılması.',
      '9. Yıkama (Flushing) Manevrası ve Arter Klemplerinin Sırayla Açılması (Deklempleme).',
      '10. Protamin Nötralizasyonu, Titiz Hemostaz, Negatif Basınçlı Dren Yerleşimi ve Katmanlı Kapanış.'
    ],
    emergenceNotes: [
      'Uyanık Rejyonel Anestezi: Hasta zaten uyanıktır; ameliyat sonunda tam nörolojik muayene teyit edilir.',
      'Genel Anestezi Ekstübasyonu:',
      '  - Pürüzsüz ve Öksürmesiz Ekstübasyon: Boyunda venöz basınç artışını ve sütür hattından hematom sızıntısını önlemek için IV Lidokain (1.5 mg/kg) uygulanır.',
      '  - Normotansiyon Hedefi: Ekstübasyon esnasında kan basıncı SKB < 140 mmHg seviyesinde sıkı tutulur.',
      'AMELİYATHANEDE ANINDA KRANİYAL SİNİR VE MOTOR MUAYENE:',
      '  - Karşı taraf kol ve bacak motor kuvveti (Serebral iskemi/inme tespiti).',
      '  - Dilin Dışarı Çıkarılması: Orta hatta mı? (N. Hypoglossus - CN XII hasarında dil lezyon tarafına devie olur).',
      '  - Ses Kalitesi ve Konuşma: Ses kısıklığı, nefesli ses (N. Vagus / Rekürren Laringeal Sinir - CN X hasarı).',
      '  - Gülümseme ve Islık Çalma: Ağız köşesinde sarkma (N. Facialis marjinal mandibuler dalı - CN VII).',
      '  - Yutma ve Öğürme Refleksi: (N. Glossopharyngeus - CN IX).'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Non-Sedatif Analjezi Protokolü:',
      '  - Yüzeyel servikal pleksus bloğu sayesinde ilk 6-12 saat postoperatif ağrı oldukça düşüktür.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Gerektiğinde hafif opioid (Tramadol 50 mg İV) veya cerrahi onayıyla IV Deksketoprofen.',
      '  - AĞIR SEDATİF O PİOİDLERDEN (Morfin, Fentanil) KAÇINILMALIDIR (Erken postoperatif dönemde nörolojik muayene ve inme takibini gölgelememek için).'
    ],
    prospectRecommendations: [
      'PROSPECT Karotis Cerrahisi Önerileri: Servikal pleksus bloğu ve yara yeri lokal infiltrasyonu cerrahi sonrası opioid ihtiyacını %60 azaltır; erken postoperatif dönemde uyanıklığı, kognitif değerlendirmeyi ve hemodinamik stabiliteyi maksimize eder.'
    ],
    erasRecommendations: [
      'ERAS Karotis Endarterektomi Kılavuzları:',
      '  - Postoperatif Yakın İzlem: İlk 24 saat KVC Yoğun Bakım veya İleri İzlem Ünitesinde sürekli invaziv arter basıncı takibi.',
      '  - Sıkı Hemodinamik Hedefler: SKB 100-140 mmHg aralığında tutulur (Hipotansiyon karotis trombozunu, Hipertansiyon ise Serebral Hiperperfüzyon Sendromunu [CHS] ve boyun hematomunu tetikler).',
      '  - Akut Boyun Hematomu Nöbeti: Boyun çevresi, pansuman ve dren saat başı izlenir; yatakbaşında ACİL DİKİŞ AÇMA SETİ bulundurulur.',
      '  - Erken Oral Alım: Postoperatif 3-4. saatte yutma refleksi doğrulanarak berrak sıvılarla enteral beslenmeye başlanır.',
      '  - Erken Mobilizasyon: Hemodinamik olarak stabil hastalar ameliyat sonrası 4-6. saatte mobilize edilir.',
      '  - Antiagregan Tedavi: Cerrahi kanama riski ekarte edilir edilmez (postop 6-12. saatte) Aspirin tedavisi yeniden verilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section III: Vascular Surgery - Carotid Endarterectomy, pp. 586-594. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'European Society for Vascular Surgery (ESVS) 2023 Clinical Practice Guidelines on the Management of Atherosclerotic Carotid and Vertebral Artery Disease. Eur J Vasc Endovasc Surg, 65(1), 7-111.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Carotid Endarterectomy Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Society for Vascular Surgery (SVS). (2022). Clinical practice guidelines for the management of carotid artery stenosis. Journal of Vascular Surgery, 75(1S), 4S-47S.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement on Anesthetic Management for Carotid Endarterectomy: Awake vs. General Anesthesia and Neuromonitoring.',
      'American Heart Association / American Stroke Association (AHA/ASA). Guidelines for the Prevention of Stroke in Patients with Stroke and Transient Ischemic Attack.',
      'GALA Trial Collaborative Group. (2008). General anaesthesia versus local anaesthesia for carotid surgery (GALA): A multicentre, randomised controlled trial. The Lancet, 372(9656), 2132-2142.',
      'van Mook, W. N., et al. (2005). Cerebral hyperperfusion syndrome. The Lancet Neurology, 4(12), 877-888.'
    ]
  }
};
