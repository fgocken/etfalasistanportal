import { ProcedureDefinition } from '../../types/procedures';

/**
 * Epilepsi Cerrahisi: Rezektif Cerrahi, Amigdalohipokampektomi ve Elektrokortikografi (ECoG) Eşliğinde Odak Rezeksiyonu
 * (Epilepsy Surgery: Resective Surgery, Amygdalohippocampectomy, and Electrocorticography-Guided Resection)
 *
 * Jaffe (6th ed., 2020, Section II: Neurosurgery - Functional Neurosurgery: Epilepsy Surgery),
 * PROSPECT Craniotomy Guidelines (Mestdagh et al., EJA 2023),
 * American Academy of Neurology (Engel et al., Neurology 2003),
 * International League Against Epilepsy (ILAE) ve SNACC Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const epilepsySurgery: ProcedureDefinition = {
  id: 'epilepsy-surgery',
  name: 'Epilepsi Cerrahisi: Rezektif Cerrahi, Amigdalohipokampektomi ve Elektrokortikografi (ECoG) Eşliğinde Odak Rezeksiyonu',
  shortCode: 'EPİLEPSİ-CERRAHİSİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Epilepsi Nöroşirürjisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal tedaviye dirençli fokal epilepsi olgularında epileptojenik odağın cerrahi olarak çıkarılması (rezeksiyon) veya yayılım yollarının kesilmesi (diskoneksiyon) ameliyatıdır. En sık uygulanan prosedür Mezial Temporal Skleroz (MTS) tedavisinde Anterior Temporal Lobektomi (ATL) ve Selektif Amigdalohipokampektomi (AH)\'dir. İntraoperatif Elektrokortikografi (ECoG) ile dural açılış sonrası doğrudan korteks üzerine dizilen elektrotlarla interiktal epileptojenik diken dalga deşarjları haritalanır ve rezeksiyon sonrası marjinlerde rezidüel aktivite kontrol edilir. Dominant hemisfer dil (Broca/Wernicke) veya motor alanlara komşu rezeksiyonlarda uyanık kraniyotomi (Asleep-Awake-Asleep — AAA) veya genel anestezi altında subkortikal motor haritalama/İONM (SSEP, faz dönüşümü, tcMEP) uygulanır.',
  indications: [
    'Mezial Temporal Lob Epilepsisi (MTLE / Mezial Temporal Skleroz - MTS): Hipokampal skleroz zemininde çoklu antiepileptik ilaçlara dirençli fokal nöbetler (epilepsi cerrahisinin en sık ve başarı oranı en yüksek endikasyonu)',
    'Ekstratemporal Fokal Epilepsiler: Frontal, paryetal veya oksipital lob yerleşimli epileptojenik odak ve lezyonlar',
    'Fokal Kortikal Displazi (FCD) ve Nöronal Göç Anomalileri (Polimikrogiri, Schizensefali, Tuberoskleroz Tüberleri — pediatrik olgularda sıkça ketojenik diyet eşlik eder)',
    'Epileptojenik Düşük Evreli Tümörler ve Vasküler Malformasyonlar (DNET, Gangliyogliom, Kavernom, Düşük Evreli Gliomlar)',
    'Hemisferik Epilepsi Sendromları: Rasmussen Ensefaliti, Sturge-Weber Sendromu veya masif perinatal iskemik inme sekeli (Fonksiyonel Hemisferektomi / Hemisferotomi)',
    'Düşme Atakları (Atonik Nöbetler): Lennox-Gastaut Sendromu olgularında sekonder jeneralizasyonu önlemek için Korpus Kallozotomi (ketojenik diyet olasılığı yüksektir!)'
  ],
  averageDuration: '3.5 - 6.0 saat (Pozisyonlama, nöronavigasyon kaydı ve kraniyotomi: 45-60 dk; Dural açılış, elektrot grid yerleşimi ve bazal Elektrokortikografi [ECoG] kaydı: 30-45 dk; Anterior temporal lobektomi, amigdalohipokampektomi veya lezyonektomi: 90-150 dk; Post-rezeksiyon kontrol ECoG kaydı: 20-30 dk; Titiz hemostaz, dural su geçirmez kapama ve kranyoplasti: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '150 - 450 mL (Standart temporal lobektomi ve lezyonektomide 150-300 mL; geniş kortikal displazi, vasküler kavernom veya pediatrik hemisferektomide 400-800 mL ve üzeri)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Kanama Riski (Derin venöz yapılar ve koroidal arter komşuluğu; pediatrik hemisferektomide masif kanama potansiyeli)',
    crossMatchRequirement: '2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalıdır; hemisferektomi veya pediatrik olgularda 3-4 Ünite ES + Taze Donmuş Plazma (TDP) planlanmalıdır',
    transfusionProbability: '%10 - %25 (Pediatrik geniş rezeksiyonlarda ve hemisferektomilerde %40-60)',
    criticalBleedingSources: [
      'A. Choroidea Anterior (Hipokampus rezeksiyonunda hasarlanması internal kapsül posterior bacak enfarktı ve kalıcı kontralateral hemipleji yaratır)',
      'A. Cerebri Media (MCA) M2/M3 İnsular Dalları ve Sylvian Venler',
      'V. Basalis (Rosenthal veni) ve V. Cerebri Media Profunda (Mezial temporal venöz drenaj)',
      'V. Anastomotica Inferior (Labbé Veni — aşırı temporal lob retraksiyonunda yırtılma hemorajik venöz enfarkt ve masif beyin ödemine yol açar)',
      'Dural Marjinal Sinüsler, Orta Meningeal Arter (MMA) ve Diploe Kanamaları'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal koagülasyon ve emici pamuk (cottonoid) diseksiyonu',
      'Hemostatik matriks ajanları (FloSeal, Surgicel, Gelfoam, trombin solüsyonları)',
      'Labbé venini korumak için aşırı temporal lob retraksiyonundan kesinlikle kaçınılması',
      'Valproat kullanan olgularda preoperatif trombosit fonksiyon bozukluğu/hipofibrinojenemi düzeltilmesi',
      'Dural asıcı dikişler, kemik mumu ve kapanış öncesi kontrollü Valsalva hemostaz kontrolü'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi — ECoG Fazına Uyarlı Protokol: İndüksiyon/kraniyotomi sonrası ECoG KAYDINDAN 15 - 30 DAKİKA ÖNCE PROPOFOL VE BENZODİAZEPİNLER KESİLİR; ECoG kaydı ≤ 0.5 MAC İzofluran/Sevofluran + Opioid (Remifentanil/Fentanil/Alfentanil) VEYA Deksmedetomidin + Opioid (Remifentanil) ile idame ettirilir',
      'Uyanık Kraniyotomi (Asleep-Awake-Asleep — AAA Tekniği): Dominant hemisfer konuşma (Broca / Wernicke) ve elokent motor alan komşuluğunda bilateral/hedefli intraoperatif skalp bloğu + Deksmedetomidin (± ultra-düşük doz Remifentanil) ile uyanık dil/motor haritalama'
    ],
    alternative: [
      'ECoG Kullanılmayan Ancak tcMEP/SSEP İONM Gerektiren Olgularda: Propofol + Remifentanil TIVA (kas gevşeticisiz idame; ECoG açılacaksa kayıt öncesi 15 - 30 dk Propofol kesilip Deksmedetomidin/≤ 0.5 MAC volatil + opioid rejimine geçilir)'
    ],
    clinicalRationale: 'Propofol interiktal epileptik dikenleri güçlü biçimde baskılayıp beta/burst-suppression yarattığından ECoG kaydından 15 - 30 dakika önce mutlaka kesilmeli ve ECoG fazı ≤ 0.5 MAC İzofluran/Sevofluran + Opioid veya Deksmedetomidin + Opioid ile yürütülmelidir. Öte yandan > 1.5 MAC Sevofluran (özellikle hipokapniyle birlikte) paradoksal olarak pro-konvülzandır. Dominant dil/motor sahalarında ise skalp bloğu + Deksmedetomidin eşliğinde uyanık AAA tekniği fonksiyonel koruma için altın standarttır.',
    notes: 'EPİLEPSİ CERRAHİSİNDE 6 HAYATİ ANESTEZİ KURALI: (1) ECoG FARMAKOLOJİSİ — PROPOFOLÜ 15-30 DK ÖNCE KES, ≤ 0.5 MAC VOLATİL/DEKSMEDETOMİDİN + OPİOİD KULLAN, > 1.5 MAC SEVOFLURAN PRO-KONVÜLZANDIR; (2) KETOJENİK DİYET PROTOKOLÜ (DEKSTROZ VE RİNGER LAKTAT KESİNLİKLE YASAK!); (3) İNTRAOPERATİF AKUT NÖBETTE 4°C SOĞUK SF + DÜŞÜK DOZ PROPOFOL (UYANIK HARİTALAMADA MİDAZOLAMDAN KAÇIN); (4) AED FARMAKOLOJİSİ (SİSATRAKURYUM TERCİHİ, VALPROAT PFA-100/TEG VE HİPERAMONYEMİK ENSEFALOPATİ, TOPİRAMAT METABOLİK ASİDOZ); (5) DAMAR/MEYER LUPU KORUMASI VE UYANIK AAA HAVA YOLU PLANI; (6) PÜRÜZSÜZ EKSTÜBASYON, POST-REZEKSİYON IV LEVETİRASETAM VE TRAMADOL/ERKEN NSAİİ YASAĞI.',
    rulesTitle: 'EPİLEPSİ CERRAHİSİNDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'ECoG FARMAKOLOJİSİ: PROPOFOLÜ 15 - 30 DK ÖNCE KESİN VE > 1.5 MAC SEVOFLURANDAN KAÇININ',
        content: 'Propofol interiktal epileptik dikenleri GÜÇLÜ ŞEKİLDE BASKILAR ve beta aktivitesi / burst-suppression oluşturur! ECoG kaydından 15 - 30 dakika ÖNCE Propofol, benzodiazepinler ve yüksek doz volatiller KESİLMELİ; ECoG fazı ≤ 0.5 MAC İzofluran/Sevofluran + Opioid (Remifentanil/Fentanil/Alfentanil) veya Deksmedetomidin + Opioid ile sürdürülmelidir. Gereğinde farmakolojik diken aktivasyonu için Alfentanil (25 - 50 mcg/kg) veya Etomidat (0.1 - 0.2 mg/kg — sağlıklı kortekste yanlış pozitif diken yaratabileceği unutulmamalıdır!) kullanılabilir. > 1.5 MAC Sevofluran (özellikle hipokapniyle) paradoksal olarak PRO-KONVÜLZANDIR!'
      },
      {
        number: 2,
        title: 'ZORUNLU KETOJENİK DİYET PROTOKOLÜ (DEKSTROZ VE RİNGER LAKTAT YASAK!)',
        content: 'Lennox-Gastaut, FCD veya pediatrik dirençli epilepsili hastalarda ketojenik diyet mutlaka sorgulanmalıdır. Bu hastalarda dekstroz içeren IV sıvılar, RİNGER LAKTAT (laktat hepatik glukoneogenezle glukoza dönüşerek ketozu bozar!) ve şekerli oral şuruplar KESİNLİKLE YASAKTIR! İdamede yalnızca %0.9 NaCl kullanılır; her 1 - 2 saatte bir kan glukozu, kan ketonu ve HCO3-/metabolik asidoz izlenir. Ketozun bozulması saatler içinde STATUS EPİLEPTİKUSU tetikler!'
      },
      {
        number: 3,
        title: 'ANTİEPİLEPTİK İLAÇ (AED) FARMAKOLOJİSİ: HOFMANN NMB, VALPROAT VE TOPİRAMAT',
        content: 'CYP450 enzim indükleyicileri (Fenitoin, Karbamazepin, Fenobarbital) aminosteroid kas gevşeticilere (Rokuronyum/Vekuronyum) belirgin direnç oluşturur → öngörülebilir klirens için Hofmann eliminasyonlu SİSATRAKURYUM veya ATRAKURYUM tercih edilir. Valproat kullananlarda trombosit disfonksiyonu/vWF için preop PFA-100/TEG değerlendirilir ve gecikmiş uyanmada Valproat Hiperamonyemik Ensefalopatisi (serum amonyak!) dışlanır. Topiramat/Zonisamid non-anyon gap metabolik asidoz (↓ HCO3-) yapar. Preop AED ayarlaması epileptologla yazılı teyit edilmeli, rezeksiyon sonrası IV Levetirasetam yüklemesi planlanmalıdır.'
      },
      {
        number: 4,
        title: 'İNTRAOPERATİF AKUT NÖBET YÖNETİMİ (4°C BUZLU SF VE UYANIK HARİTALAMADA MİDAZOLAM KAÇINIMI)',
        content: 'Doğrudan kortikal elektrik stimülasyonu fokal veya jeneralize nöbet tetikleyebilir. İlk adım: Stimülasyonu derhal durdur ve korteks üzerine 4°C BUZLU SOĞUK SERUM FİZYOLOJİK (30 - 50 mL) dök! 15 - 20 saniyede durmazsa düşük doz IV Propofol (20 - 50 mg) uygulanır; uyanık AAA haritalamada uzun süreli sedasyonla konuşma/motor testini sonlandıracağı için Midazolam ilk seçenek olarak kullanılmaz.'
      },
      {
        number: 5,
        title: 'UYANIK AAA HARİTALAMA, ÇİVİLİ BAŞLIKTA ACİL HAVA YOLU VE DAMAR KORUMASI',
        content: 'Uyanık dil/motor haritalamasında bilateral skalp bloğu + Deksmedetomidin kullanılır; Mayfield çivili başlıkta acil hava yolu için LMA, hiperangüle videolaringoskop ve fiberoptik başucunda hazır bekletilir. Mezial temporal rezeksiyonda A. choroidea anterior hasarı kalıcı hemipleji, Labbé veni zedelenmesi hemorajik enfarkt, Meyer lupu hasarı üst kuadrantanopsi yapar — hipotansiyondan (MAP > 75 - 80 mmHg) kesinlikle kaçınılır.'
      },
      {
        number: 6,
        title: 'PÜRÜZSÜZ EKSTÜBASYON VE ANALJEZİDE TRAMADOL / ERKEN NSAİİ YASAĞI',
        content: 'Uyanmada öksürme ve hipertansiyon (SKB > 140 mmHg) temporal rezeksiyon kavitesinde ölümcül hematoma yol açar (IV Lidokain / düşük doz Remifentanil ile smooth emergence). Postoperatif analjezide nöbet eşiğini düşüren TRAMADOL kesinlikle yasaktır; taze kraniyotomi/lobektomi sonrası rutin erken NSAİİ verilmez (yalnızca nöroşirürji hemostazı ve kontrol BT onayı sonrası ≥ 24 saatte değerlendirilir).'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Kapsamlı Epileptoloji / Nöroloji Konsültasyonu: Video-EEG, fMRI, Wada testi, PET/SPECT ve cerrahi rezeksiyon sınırlarının örtüşmesi; ayrıca preoperatif AED dozlarının tam devamı mı yoksa ECoG için kısmi azaltılması mı gerektiği ve post-rezeksiyon IV Levetirasetam yükleme planı EPİLEPTOLOG İLE YAZILI TEYİT edilmelidir.',
      'Pediatrik Nöroloji / Klinik Beslenme Konsültasyonu (Ketojenik Diyet Olgularında): Ketojenik diyet oranı, bazal kan keton/glukoz hedefleri, karbonhidratsız/laktatsız IV sıvı ve ilaç hazırlama listesi teyit edilmelidir.',
      'Nöropsikoloji ve Göz Hastalıkları Konsültasyonu: Bazal sözel/görsel bellek, dil lateralizasyonu ve bazal görme alanı (Meyer lupu komşuluğu).',
      'Kardiyoloji / Enfeksiyon Hastalıkları Konsültasyonu: Sodyum kanal blokeri AED\'lere (Karbamazepin, Lakozamid, Fenitoin) bağlı AV iletim/QT anomalileri; Faz 1 subdural grid veya stereo-EEG sonrası ikinci seans olgularda intrakraniyel enfeksiyon/menenjit dışlanması.'
    ],
    historyAndPhysical: [
      'Nöbet Semiolojisi, Sıklığı ve Ketojenik Diyet Taraması: Son 24 - 48 saatteki nöbet sıklığı, status epileptikus öyküsü ve ketojenik diyet durumu (özellikle Lennox-Gastaut, FCD ve pediatrik olgularda mutlaka sorgulanır!).',
      'Ayrıntılı AED Rejimi: Enzim indükleyici (Fenitoin, Karbamazepin, Fenobarbital) vs enzim indüklemeyen ilaçlar, Valproat (koagülopati/hiperamonyemi), Topiramat/Zonisamid (metabolik asidoz) ve son doz saati.',
      'Zor Hava Yolu ve Sistemik Değerlendirme: Fenitoin ilişkili gingival hiperplazi, sendromik dismorfi (Tuberoskleroz, Sturge-Weber yüz hemanjiomu/glokom/hava yolu anjiomları) ve Mallampati skoru.',
      'Ayrıntılı Nörolojik Taban Muayenesi: Motor kuvvet, duyu, görme alanı ve dil (Broca/Wernicke) fonksiyonları.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (AED kaynaklı nötropeni, anemi, trombositopeni) ve Koagülasyon Paneli (PT, aPTT, INR, Fibrinojen).',
      'VALPROAT KULLANAN OLGULARDA ÖZEL TESTLER: Trombosit disfonksiyonu ve edinsel von Willebrand faktör eksikliğini saptamak için PFA-100 ve/veya Tromboelastografi (TEG/ROTEM) + bazal serum amonyak (postoperatif gecikmiş uyanmada hiperamonyemik ensefalopati ayrımı için!).',
      'Serum Elektrolitleri ve Bazal Kan Gazı (HCO3-): Karbamazepin/Okskarbazepin kaynaklı hiponatremi (nöbet eşiğini düşürür); Topiramat/Zonisamid veya ketojenik diyete bağlı non-anyon gap metabolik asidoz (↓ HCO3-); ketojenik diyette preop kan glukozu ve kan ketonu (beta-hidroksibütirat).',
      'Karaciğer ve Böbrek Fonksiyon Testleri (AST, ALT, Albumin, Kreatinin).',
      '2 Ünite Eritrosit Süspansiyonu Cross-Match hazırlığı (hemisferektomi/pediatrik olgularda 3 - 4 Ünite ES + TDP) ve 12 Derivasyonlu EKG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 ve sürekli vücut sıcaklığı.',
      'İnvaziv Arter Basıncı İzlemi (A-Line — Tragus Seviyesinde Sıfırlanmış): CPP kontrolü (MAP > 75 - 80 mmHg) ve seri kan gazı (PaCO2, Na+, HCO3-; ketojenik diyette her 1 - 2 saatte bir glukoz + keton + pH/HCO3-) için zorunludur.',
      'Santral Venöz Kateter (CVC): Pediatrik olgular, hemisferektomiler veya zor damar yolu olan hastalarda.',
      'İntraoperatif Elektrokortikografi (ECoG): Dural açılış sonrası silikon grid/strip elektrotlarla epileptolog eşliğinde pre-rezeksiyon ve post-rezeksiyon kortikal diken haritalaması.',
      'Elokent Alan Haritalaması ve İONM: Dominant temporal/ekstratemporal rezeksiyonlarda uyanık dil haritalaması (Broca/Wernicke) veya genel anestezi altında subkortikal motor haritalama (kapsüla interna/kortikospinal traktus), SSEP/Faz Dönüşümü (N20/P20) ve tcMEP (rutin CN III/IV/VI EMG temporal lobektomide standart değildir).',
      'Nöromusküler İleti Monitörizasyonu (TOF): CYP450 enzim indükleyicisi kullananlarda hızlı NMB klirensini izlemek ve motor haritalama/MEP fazında tam nöromusküler geri dönüşü (%100 TOF) kanıtlamak için.',
      'Sıcaklık Sensörlü Foley İdrar Sondası (hedef idrar çıkışı > 0.5 - 1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı (16 - 18G) periferik intravenöz yol',
      'İnvaziv radiyal arter kanülasyonu (indüksiyon öncesi veya hemen sonrası)',
      'Hemisferektomi veya pediatrik geniş rezeksiyonlarda santral venöz kateter (CVC)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş 30 - 45° Kontralateral Tarafa Çevrilmiş ve Mayfield Çivili Başlıkla Fikse Edilmiş',
    patientPositionDetails: [
      'Temporal lob ve Sylvian fissürü yatay düzleme paralel kılmak için baş çevrilir ve hafif ekstansiyona alınır.',
      'İpsilateral Omuz Altına Destek Rulo: İnternal juguler ven basısını ve venöz stazı önlemek için aşırı boyun rotasyonundan kaçınılır.',
      'Masa 15 - 20° Ters Trendelenburg (Baş Yukarı): İntrakraniyel venöz drenajı kolaylaştırır ve beyin gevşekliğini destekler.',
      'Uyanık AAA Olgularında: Şeffaf cerrahi örtü çadırı, nöropsikolog/epileptoloğun hastayla yüz yüze konuşabileceği görüş koridoru ve acil hava yolu erişimi sağlanır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Kas Gevşetici Seçimi:',
      '  - Propofol (2 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil + kas gevşetici. CYP450 enzim indükleyici AED (Fenitoin, Karbamazepin, Fenobarbital) kullanan hastalarda aminosteroid direnci nedeniyle Hofmann eliminasyonlu SİSATRAKURYUM (0.15 - 0.2 mg/kg) veya ATRAKURYUM tercih edilir; motor haritalama/MEP planlanıyorsa idamede kas gevşetici KESİLİR.',
      'ECoG Kaydı İçin Kritik Anestezi Farmakolojisi:',
      '  - ECoG başlamadan 15 - 30 DAKİKA ÖNCE PROPOFOL, benzodiazepinler ve yüksek doz volatiller KESİLİR (Propofol interiktal dikenleri güçlü şekilde baskılar!).',
      '  - ECoG İdame Seçenekleri: ≤ 0.5 MAC İzofluran veya Sevofluran + Opioid infüzyonu (Remifentanil/Fentanil/Alfentanil) VEYA Deksmedetomidin (0.3 - 0.7 mcg/kg/saat) + Opioid (Remifentanil).',
      '  - Farmakolojik Diken Aktivasyonu (Epileptolog Talebiyle): Alfentanil (25 - 50 mcg/kg IV) veya Etomidat (0.1 - 0.2 mg/kg IV — dikkat: Etomidat non-epileptojenik sağlıklı kortekste de yanlış pozitif diken üretebilir!).',
      '  - Pro-konvülzan Volatil Uyarısı: > 1.5 MAC Sevofluran (özellikle hipokapni eşliğinde) paradoksal olarak pro-konvülzandır; kesinlikle kaçınılır!',
      'Ketojenik Diyet İntraoperatif Yönetimi:',
      '  - Yalnızca %0.9 NaCl kullanılır (Dekstrozlu sıvılar ve Ringer Laktat KESİNLİKLE YASAK!).',
      '  - Her 1 - 2 saatte bir ABG\'de kan glukozu, kan ketonu ve HCO3- kontrol edilir; ciddi asidozda (HCO3- < 16 - 18 mEq/L) dikkatli bikarbonat değerlendirmesi yapılır, hipoglisemi (< 50 - 60 mg/dL) gelişmedikçe glukoz verilmez.',
      'Uyanık Kraniyotomi (AAA) Protokolü:',
      '  - İntraoperatif bilateral/hedefli skalp bloğu (%0.25 - 0.5 Ropivakain/Bupivakain — LAST sınırına dikkat) + Deksmedetomidin + ultra-düşük doz Remifentanil; dil/motor haritalamada hasta tam uyanık ve koopere tutulur.',
      'Akut İntraoperatif Nöbet Protokolü:',
      '  - 1. Kortikal stimülasyon derhal durdurulur.',
      '  - 2. Cerrahi sahaya 4°C BUZLU SOĞUK SERUM FİZYOLOJİK (30 - 50 mL) dökülür.',
      '  - 3. 15 - 20 saniyede durmazsa düşük doz IV Propofol (20 - 50 mg bolus) uygulanır (uyanık haritalamada uzun sedasyon yaratan Midazolamdan kaçınılır!).',
      'Rezeksiyon Sonrası Antiepileptik Yükleme ve Beyin Rahatlatma:',
      '  - Kontrol ECoG tamamlandıktan sonra epileptoloji protokolüne göre IV Levetirasetam yüklemesi (erişkin 1000 - 1500 mg, pediatrik 20 - 40 mg/kg IV) uygulanır.',
      '  - Brain Relaxation: Normovolemi korunarak Mannitol (%20, 0.5 - 1 g/kg) veya %3 Hipertonik Salin (2 - 3 mL/kg) + PaCO2 32 - 35 mmHg (aşırı hipokapni < 30 mmHg epileptojenik aktiviteyi ve iskemiyi artırır!).'
    ],
    airwayManagement: [
      'Genel Anestezide: Spiral telli (wire-reinforced) veya sağlam tespitli oral ETT; kaf basıncı 20 - 25 cmH2O; Mayfield başlık yerleşimi sonrası tüp pozisyonu ve solunum sesleri tekrar doğrulanır.',
      'Uyanık Kraniyotomi (AAA) Çivili Başlıkta Acil Hava Yolu Planı: Uyanık fazda nazal kanül + sürekli sidestream EtCO2; nöbet, apne veya aspirasyon gelişirse baş Mayfield başlığında sabitken acil LMA yerleştirilmesi, hiperangüle videolaringoskop veya fiberoptik bronkoskop ile hızlı kurtarma planı hazır tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Kraniyotomi ve Dural Açılış: Brain relaxation ve ECoG öncesi Propofol/benzodiazepin kesiminin tamamlanması (≥ 15 - 30 dk).',
      '2. Pre-rezeksiyon ECoG Kaydı: ≤ 0.5 MAC volatil/Deksmedetomidin + opioid altında epileptojenik odak sınırlarının haritalanması.',
      '3. Elokent Alan Haritalaması (Uyanık Dil veya Subkortikal Motor / SSEP Faz Dönüşümü): İntraoperatif nöbet alarmı (4°C soğuk SF hazır!).',
      '4. Anterior Temporal Lobektomi (ATL) ve Amigdalohipokampektomi (AH): Labbé veni, A. choroidea anterior, optik traktus/Meyer lupu ve beyin sapı koruması (MAP > 75 - 80 mmHg).',
      '5. Post-rezeksiyon Kontrol ECoG ve Sonrasında IV Levetirasetam Yüklemesi.',
      '6. Kontrollü Valsalva Hemostazı, Su Geçirmez Dural Kapama ve Kranyoplasti.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ EKSTÜBASYON (SMOOTH EMERGENCE): Öksürme ve hipertansiyon (SKB > 140 mmHg) temporal lob rezeksiyon kavitesinde ölümcül hematoma yol açar; IV Lidokain (1 - 1.5 mg/kg) veya düşük doz Remifentanil + Esmolol/Labetalol ile sakin uyanma sağlanır.',
      'GECİKMİŞ UYANMA AYIRICI TANISI: Postoperatif hasta uyanmıyorsa hematom/ödem (acil Kranial BT), non-konvülzif status epileptikus (acil EEG), hiponatremi ve Valproat kullanan olgularda VALPROAT HİPERAMONYEMİK ENSEFALOPATİSİ (acil serum amonyak düzeyi!) hızla araştırılır.',
      'Erken Nörolojik Değerlendirme: Bilinç (GKS), pupiller, 4 ekstremite motor kuvveti, görme alanı ve konuşma ameliyathanede belgelenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal ve Nöbet Eşiğini Korumaya Yönelik Analjezi Protokolü (PROSPECT Craniotomy 2023):',
      '  - Preemptif / İntraoperatif Skalp Bloğu ve İnsizyon Hattı Lokal İnfiltrasyonu (%0.25 - 0.5 Ropivakain veya %0.25 Bupivakain — kümülatif LAST sınırına dikkat).',
      '  - Düzenli IV Parasetamol (erişkin 1000 mg, pediatrik 15 mg/kg, 6 saatte bir düzenli infüzyon).',
      '  - Kurtarma Analjeziği: Yalnızca gerekirse küçük titre doz IV Fentanil (25 mcg) veya düşük doz Hidromorfon/Oksikodon (nörolojik muayeneyi maskelemeyecek düzeyde).',
      '  - KESİNLİKLE KAÇINILACAKLAR: TRAMADOL (epilepsi hastalarında nöbet eşiğini düşürür — MUTLAK YASAK!) ve taze temporal lobektomi/kraniyotomi sonrası erken dönemde rutin NSAİİ (rezeksiyon kavitesi hematom riski; yalnızca nöroşirürji hemostazı ve kontrol BT onayı sonrası ≥ 24 saatte düşünülebilir).'
    ],
    prospectRecommendations: [
      'PROSPECT Elektif Kraniyotomi Kılavuzu (Mestdagh et al., EJA 2023): Skalp bloğu veya insizyonel lokal anestezik infiltrasyonu + düzenli Parasetamol (ve cerrahi hemostaz güvenliğine bağlı non-opioid stratejiler) kraniyotomi sonrası ağrıyı, opioid tüketimini ve POBK\'yi anlamlı azaltır.'
    ],
    erasRecommendations: [
      'Postoperatif Epilepsi Cerrahisi Güvenlik ve İzlem Protokolü:',
      '  - Antiepileptik İlaçların ve Ketojenik Diyetin Kesintisiz Devamı: Tüm bazal AED\'ler oral veya IV eşdeğer dozlarda aksatılmadan sürdürülür; ketojenik diyetli hastalarda şekersiz formülasyonlar ve %0.9 NaCl devam ettirilip glukoz/keton/HCO3- yakından izlenir.',
      '  - Erken Postoperatif Kranial BT Kontrolü: İlk 4 - 6 saatte rezeksiyon kavitesi hematomu, ödem veya pnömosefali taraması.',
      '  - İlk 24 Saat Nöro-Yoğun Bakım Takibi: Saatlik GKS, pupilla, motor/dil muayenesi ve normotansiyon (SKB < 130 - 140 mmHg).',
      '  - Normotermi ve POBK Kontrolü: Hipertermi nöbet eşiğini düşürdüğünden normotermi (36.5 - 37.2°C) korunur; kusmayı önlemek için Ondansetron + (cerrahi onayla) Deksametazon uygulanır.',
      '  - Erken Oral Alım ve Postoperatif 1. Günde Kademeli Mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery - Functional Neurosurgery: Epilepsy Surgery. Philadelphia: Wolters Kluwer.',
    prospectReference: 'Mestdagh, F. P., Lavand\'homme, P. M., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group of ESRA. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Engel, J., Wiebe, S., French, J., et al. (2003). Practice parameter: temporal lobe and localized neocortical resections for epilepsy: report of the Quality Standards Subcommittee of the American Academy of Neurology, in association with the American Epilepsy Society and the American Association of Neurological Surgeons. Neurology, 60(4), 538-547.',
      'Chui, J., Manninen, P., Valiante, T., & Venkatraghavan, L. (2013). The anesthetic considerations of intraoperative electrocorticography during epilepsy surgery. Anesthesia & Analgesia, 117(2), 479-486.',
      'Valencia, I., Pfeifer, H., & Thiele, E. A. (2002). General anesthesia and the ketogenic diet: clinical experience in nine patients. Epilepsia, 43(5), 525-529.',
      'Wieser, H. G., Blume, W. T., Fish, D., et al. (2001). ILAE Commission Report: Proposal for a new classification of outcome with respect to epileptic seizures following epilepsy surgery. Epilepsia, 42(2), 282-286.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Management of Patients Undergoing Epilepsy Surgery and Electrocorticography.'
    ]
  }
};
