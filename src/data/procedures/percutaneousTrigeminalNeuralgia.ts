import { ProcedureDefinition } from '../../types/procedures';

/**
 * Trigeminal Nevraljide Perkütan Girişimler: Radyofrekans Rizotomi (RFT), Balon Mikrokompresyonu (PMC) ve Gliserol Rizolizisi
 * (Percutaneous Procedures for Trigeminal Neuralgia: Radiofrequency Rhizotomy, Balloon Microcompression, and Glycerol Rhizolysis)
 *
 * Jaffe (6th ed., 2020, Section II: Neurosurgery - Functional Neurosurgery: Percutaneous Procedures for Trigeminal Neuralgia),
 * European Academy of Neurology (EAN) Trigeminal Neuralgia Guideline (Bendtsen et al., Eur J Neurol 2019),
 * ve Society for Neuroscience in Anesthesiology and Critical Care (SNACC) referans alınarak yapılandırılmıştır.
 */
export const percutaneousTrigeminalNeuralgia: ProcedureDefinition = {
  id: 'percutaneous-trigeminal-neuralgia',
  name: 'Trigeminal Nevraljide Perkütan Girişimler: Radyofrekans Rizotomi (RFT), Balon Mikrokompresyonu ve Gliserol Rizolizisi',
  shortCode: 'TN-PERKÜTAN',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Girişimsel Ağrı Nöroşirürjisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal tedaviye (Karbamazepin, Okskarbazepin, Baklofen) dirençli/intoleran, açık mikrovasküler dekompresyona (MVD) yüksek riskli veya MVD sonrası nüks eden Trigeminal Nevralji (Tic Douloureux) olgularında uygulanan minimal invaziv perkütan kafa tabanı girişimleridir. Hartel tekniği ile yanak derisinden (ağız köşesinin 2.5 - 3.0 cm lateralinden — bukkal mukoza delinmeden!) girilen kanül, floroskopi rehberliğinde Foramen Ovaleden geçirilerek Meckel Mağarası ve Gasser Gangliyonuna ulaştırılır. Üç temel yöntem uygulanır: (1) Perkütan Radyofrekans Termokoagülasyon (RFT): Uyanık elektrik stimülasyonu ile V1/V2/V3 dalı doğrulanıp kısa süreli derinleştirilmiş sedasyon altında 65 - 75°C termal lezyon oluşturulması; (2) Perkütan Balon Mikrokompresyonu (PMC): Genel anestezi altında 4 Fr Fogarty balonunun Meckel mağarasında radyoopak kontrastla "armut" (pear) şeklinde şişirilerek gangliyonun 60 - 90 SANİYE mekanik kompresyonu; (3) Retrogasserian Gliserol Rizolizisi: Hiperbarik anhidr gliserolün trigeminal sistern içine OTURUR / YARI OTURUR VE BOYUN FLEKSİYONDA (çene göğse yakın!) pozisyonda enjekte edilerek kimyasal nörolizis yapılmasıdır.',
  indications: [
    'Medikal Tedaviye Dirençli veya İlaç Yan Etkileri Nedeniyle İntoleran Klasik (Tip 1) veya Sekonder Trigeminal Nevralji',
    'İleri Yaş veya Yüksek Kardiyopulmoner Risk (Açık posterior fossa kraniyotomisi / MVD için yüksek riskli ASA III - IV hastalar)',
    'Multipl Skleroz (MS) Zemininde Gelişen Trigeminal Nevralji (MS plaklarına bağlı santral kök giriş lezyonlarında perkütan yöntemler birinci basamak cerrahi seçenektir)',
    'Mikrovasküler Dekompresyon (MVD) Sonrası Ağrı Nüksü veya Başarısızlığı',
    'Açık Kraniyotomiyi Reddeden Kooperatif Hastalar (V1 oftalmik dal tutulumunda korneal anestezi riski nedeniyle balon kompresyonu veya dikkatli gliserol/RFT seçimi)'
  ],
  averageDuration: '45 - 90 dakika (Pozisyonlama ve submental-verteks/oblik floroskopik foramen ovale görüntülemesi: 15-20 dk; Hartel tekniğiyle kanülün Meckel mağarasına ilerletilmesi: 15-25 dk; RFT stimülasyon/termokoagülasyon veya 60 - 90 sn PMC balon kompresyonu veya oturur pozisyonda gliserol enjeksiyonu: 15-25 dk; Kanül çekimi, yanak kompresyonu ve derlenme: 10-15 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 20 - 50 mL (Standart perkütan girişimde ihmal edilebilir kan kaybı; ancak kafa tabanı majör damar yaralanması hayatidir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Beklenen Kan Kaybı (Ancak ICA / Kavernöz Sinüs / İntrakraniyel Kanama Riski Hayatidir)',
    crossMatchRequirement: 'Tip & Screen (T&S) doğrulaması yeterlidir; rutin eritrosit süspansiyonu hazırlığı gerekmez',
    transfusionProbability: '< %1 (Son derece nadir)',
    criticalBleedingSources: [
      'A. Carotis Interna (ICA — foramen ovalenin hemen medial ve derin komşuluğu; ponksiyonu masif hemoraji, psödoanevrizma veya Karotiko-Kavernöz Fistüle [CCF] yol açar)',
      'Kavernöz Sinüs, V. Jugularis Interna ve Emisser Venler',
      'Pterigoid Venöz Pleksus ve Fasiyal Damarlar (yanak/retrofarengeal hematom — hava yoluna bası yapabilir!)',
      'Subdural / Subaraknoid İntrakraniyel Hemoraji (kanülün aşırı derin ilerletilmesi veya koagülopati)'
    ],
    hemostasisStrategies: [
      'İşlem öncesi antikoagülan ve antiagreganların ajana özgü doğru sürelerde kesilmiş ve koagülasyonun tam normal olması',
      'Lateral floroskopide klivus çizgisi ve petröz apeks sınırlarının asla aşılmaması',
      'Karotid ponksiyon şüphesinde (kanülden pulsatil parlak kırmızı arteriyel kan gelişi): İğne derhal çekilir, yanak ve farenks bölgesine en az 10 - 15 dakika kesintisiz manuel kompresyon uygulanır, işlem iptal edilir ve nörovasküler görüntüleme/CCF takibi yapılır'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Perkütan Radyofrekans (RFT) ve Gliserol Rizolizisi İçin: Monitörize Anestezi Bakımı (MAC) + Titre Edilmiş Kısa Etkili Sedasyon (Yavaş titre düşük doz Propofol 0.3 - 0.5 mg/kg veya TCI [1.0 - 2.0 mcg/mL] ± ultra-düşük doz Remifentanil) + ZORUNLU yan akım (sidestream) EtCO2 kapnografi. (Korunmasız hava yolunda 1 - 1.5 mg/kg Propofol bolusu apne/obstrüksiyon yarattığından KULLANILMAZ!)',
      'Perkütan Balon Mikrokompresyonu (PMC) İçin: Genel Endotrakeal Anestezi (GETA) veya LMA — 60 - 90 saniyelik balon kompresyonu dayanılmaz ağrı, ani şiddetli hipertansif pik (> 200 mmHg) ve masif trigeminokardiyak bradikardi/asistoli yarattığından genel anestezi ZORUNLUDUR'
    ],
    alternative: [
      'Yüksek Riskli Yaşlı/Kooperatif Olgularda (RFT/Gliserol): Deksmedetomidin infüzyonu eşliğinde hafif MAC + lokal cilt infiltrasyonu'
    ],
    clinicalRationale: 'RFT\'de 50 Hz duyu haritalaması ve kornea refleksi kontrolü için hasta hızla uyanıp kooperasyon kurabilmeli; korunmasız hava yolunda solunum depresyonu ve apneyi önlemek için 1 - 1.5 mg/kg bolus yerine titre düşük doz Propofol (0.3 - 0.5 mg/kg veya TCI) + zorunlu sidestream EtCO2 kullanılmalıdır. PMC\'de ise şiddetli ağrı ve masif TCR/hipertansiyon nedeniyle kontralateral ağız köşesine tespitli ETT veya LMA ile genel anestezi esastır.',
    notes: 'TRİGEMİNAL PERKÜTAN GİRİŞİMLERDE 6 HAYATİ ANESTEZİ KURALI: (1) GLİSEROL RİZOLİZİSİNDE OTURUR POZİSYON + BOYUN FLEKSİYONU ŞARTI (SUPİN EKSTANSİYON BEYİN SAPINA AKAR!); (2) TRİGEMİNOKARDİYAK REFLEKS (TCR) VE ŞİDDETLİ HİPERTANSİF FIRTINA (> 200 mmHg) — YAŞLI/KAH\'DA PROFİLAKTİK ATROPİN YERİNE GLİKOPİROLAT + HAZIR ESMOLOL/NİKARDİPİN/LABETALOL; (3) RFT\'DE TİTRE DÜŞÜK DOZ PROPOFOL (0.3-0.5 MG/KG / TCI) + ZORUNLU SİDESTREAM EtCO2; (4) KARBAMAZEPİN CYP450 DİRENCİ + Na+ KANAL AV BLOK/BRADİKARDİ (TCR\'Yİ AĞIRLAŞTIRIR!) + ANTİKOAGÜLAN KESİMİ; (5) BUKKAL MUKOZA PERFORASYONU → BAKTERİYEL MENENJİT ÖNLEMİ; (6) UYANIK RFT\'DE GÖZÜ BANTLAMA (KORNEA REFLEKSİ KONTROLÜ!), 60-90 SN BALON SÜRESİ, CN IV/VI DİPLOPİ VE HSV REAKTİVASYONU.',
    rulesTitle: 'TRİGEMİNAL PERKÜTAN GİRİŞİMLERDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'GLİSEROL RİZOLİZİSİNDE OTURUR POZİSYON VE BOYUN FLEKSİYONU (ÇENE GÖĞSE YAKIN!)',
        content: 'Anhidr gliserol BOS\'tan daha yoğun (HİPERBARİK) bir sıvıdır! Gliserol enjeksiyonu sırasında ve işlem sonrası 1 - 2 saat boyunca hasta OTURUR / YARI OTURUR POZİSYONDA VE BOYUN FLEKSİYONDA (çene göğse yakın) tutulmalıdır. Supin + boyun ekstansiyonunda gliserol posterior fossaya ve beyin sapına akarak kranyal sinir felçlerine ve beyin sapı toksisitesine yol açar! Oturur pozisyonda ortostatik hipotansiyon, vazovagal senkop (TCR ile birleşince ağırlaşır!) ve hava yolu güvenliği yakından yönetilir.'
      },
      {
        number: 2,
        title: 'TRİGEMİNOKARDİYAK REFLEKS (TCR) VE AKUT HİPERTANSİF FIRTINA (> 200 mmHg) YÖNETİMİ',
        content: 'Foramen ovale geçişi, lezyonlama ve özellikle balon şişirilmesi (60 - 90 sn) sırasında ani bradikardi/asistoli (TCR) YANI SIRA şiddetli sempatik HİPERTANSİF FIRTINA (SKB > 200 mmHg → intrakraniyel kanama/miyokard iskemisi!) gelişebilir. Kısa etkili IV ESMOLOL, NİKARDİPİN veya LABETALOL enjektörde çekili hazır tutulmalıdır! Yaşlı ve KAH\'lı hastalarda profilaktik Atropin (0.5 mg) tehlikeli taşikardi/iskemi yapabileceğinden profilaksi gerekiyorsa GLİKOPİROLAT (0.2 mg IV) tercih edilir; Atropin (0.5 - 1.0 mg IV) şiddetli bradikardi/asistoli tedavisine saklanır ve yüksek riskte transkütan pacing pedleri hazır bulundurulur.'
      },
      {
        number: 3,
        title: 'KORUNMASIZ HAVA YOLUNDA (RFT) TİTRE DÜŞÜK DOZ PROPOFOL (0.3 - 0.5 MG/KG) + SİDESTREAM EtCO2',
        content: 'Uyanık-sedasyonlu RFT\'de 1 - 1.5 mg/kg Propofol bolusu ani apne, üst hava yolu obstrüksiyonu ve hipoksiye yol açar — KESİNLİKLE KAÇINILMALIDIR! Giriş ve termal lezyonlama fazlarında yavaş titre düşük doz Propofol (0.3 - 0.5 mg/kg IV veya TCI 1.0 - 2.0 mcg/mL) ± ultra-düşük doz Remifentanil kullanılır ve ZORUNLU yan akım (sidestream) EtCO2 kapnografi ile solunum kesintisiz izlenir.'
      },
      {
        number: 4,
        title: 'KARBAMAZEPİN FARMAKOLOJİSİ (CYP450 + AV BLOK/TCR RİSKİ) VE ANTİKOAGÜLAN KESİMİ',
        content: 'Karbamazepin (1) güçlü CYP450 indükleyicisi olup aminosteroid kas gevşeticilere (Rokuronyum) ve opioidlere direnç oluşturur (NMB gerekiyorsa Hofmann eliminasyonlu Sisatrakuryum); (2) Na+ kanal blokajıyla sinüs bradikardisi ve AV iletim bloğu yaparak TCR\'yi tehlikeli biçimde ağırlaştırır; (3) SIADH/hiponatremi ve lökopeni yapar. ICA ve kavernöz sinüs kanama riski nedeniyle tüm antikoagülan/antiagreganlar ajana özgü doğru sürelerde kesilmiş ve koagülasyon tam normal olmalıdır.'
      },
      {
        number: 5,
        title: 'BUKKAL MUKOZA PERFORASYONU → BAKTERİYEL MENENJİT ÖNLEMİ',
        content: 'Hartel tekniğinde kanülün ağız içi bukkal mukozayı delmesi oral flora bakterilerinin doğrudan Meckel mağarasına/BOS\'a taşınarak ölümcül bakteriyel menenjite yol açmasına neden olur! Cerrah bir parmağıyla ağız içinden mukozayı korur; mukoza delinirse kanül ve eldiven DERHAL yeni sterille değiştirilir ve uygun profilaktik antibiyotik uygulanır.'
      },
      {
        number: 6,
        title: 'UYANIK RFT\'DE KORNEA REFLEKSİ ERİŞİMİ, 60 - 90 SN BALON SÜRESİ, CN IV/VI VE HSV',
        content: 'Uyanık RFT\'de lezyon öncesi ve sonrası kornea refleksi pamukla kontrol edileceğinden göz sıkıca bantlanmaz (erişilebilir bırakılır); koruyucu göz bandı/pomad yalnızca genel anestezi altındaki PMC\'de uygulanır. Güncel standart PMC balon kompresyon süresi 60 - 90 saniyedir. Postoperatif dönemde kavernöz sinüs komşuluğuna bağlı geçici CN IV/VI paralizisi (diplopi) ve Gasser gangliyonu manipülasyonuna bağlı perioral HSV reaktivasyonu izlenir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji Konsültasyonu: Trigeminal nevralji alt tipi (klasik Tip 1, sekonder MS veya idiyopatik), etkilenen dallar (V1, V2, V3), tetik noktaları ve postoperatif Karbamazepin/Okskarbazepin kademeli azaltma planı.',
      'Kardiyoloji Konsültasyonu: İleri yaş ve KAH hastalarında TCR (asistoli/bradikardi) ve intraoperatif hipertansif fırtına (> 200 mmHg) toleransı, bazal EKG iletim blokları (Karbamazepin ilişkili AV blok!) ve antikoagülan/antiagregan kesim güvenliği.',
      'Göz Hastalıkları ve Ağız-Diş Değerlendirmesi: V1 tutulumunda bazal kornea duyusu; ağız içi aktif enfeksiyonun dışlanması (bukkal perforasyon/menenjit riski!).'
    ],
    historyAndPhysical: [
      'Karbamazepin / Okskarbazepin ve İlaç Etkileşimleri: Dozlar, SIADH/hiponatremi, ataksi, lökopeni, CYP450 indüksiyonu ve kardiyak AV iletim/bradikardi etkileri değerlendirilir (ameliyat öncesi aniden kesilmez!).',
      'Kardiyovasküler ve Ortostatik Tolerans: Gliserol rizolizisinde oturur pozisyonda ortostatik hipotansiyon ve vazovagal senkop yatkınlığı sorgulanır.',
      'Boyun Hareketliliği ve Hava Yolu: RFT/PMC için boyun ekstansiyon toleransı; yaşlı/dişsiz/servikal spondilozlu hastalarda genel anestezi (PMC) veya acil kurtarma entübasyonu hazırlığı.'
    ],
    laboratoryAndTests: [
      'ANTİKOAGÜLAN VE ANTİAGREGAN KESİLME PROTOKOLÜ (ICA / Kavernöz Sinüs / İntrakraniyel Kanama Riski):',
      '  - Varfarin: ~5 gün önce kesilir, işlem öncesi INR ≤ 1.2 - 1.3 doğrulanır (DMAH köprülemede profilaktik son doz ≥ 12 saat, terapötik son doz ≥ 24 saat önce kesilir).',
      '  - DOAC (Apiksaban, Rivaroksaban, Edoksaban): En az 48 - 72 saat; Dabigatran: En az 72 - 96 saat (CrCl < 50 mL/dk ise ≥ 96 - 120 saat) önce kesilir.',
      '  - Klopidogrel: 5 - 7 gün; Prasugrel: 7 - 10 gün; Tikagrelor: 5 gün; Aspirin: 5 - 7 gün önce kesilir (yüksek kardiyovasküler/stent riskinde kardiyoloji–nöroşirürji ortak değerlendirmesi).',
      'Tam Kan Sayımı (Karbamazepin kaynaklı lökopeni/nötropeni/trombositopeni) ve Koagülasyon Paneli (PT, aPTT, INR).',
      'Serum Elektrolitleri: Özellikle Serum Sodyum (Karbamazepin/Okskarbazepin SIADH hiponatremisi!).',
      '12 Derivasyonlu EKG (Karbamazepin kaynaklı bazal bradikardi, PR uzaması, AV blok veya dal bloku kontrolü!).',
      'Kranyal MRG / 3D-FIESTA (CISS) Sisternografi: Nörovasküler bası, kitle ve MS plaklarının dışlanması.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (TCR asistolisi için sesli QRS tonu açık!), sık NIBP (1 - 2 dk aralıkla — ani > 200 mmHg hipertansiyonu anında yakalamak için), SpO2, sıcaklık ve ZORUNLU sürekli EtCO2 kapnografi (RFT/Gliserol MAC olgularında sidestream nazal EtCO2).',
      'İnvaziv Arter Basıncı İzlemi (A-Line): PMC uygulanan, ciddi KAH/hipertansiyonu olan veya oturur pozisyonda gliserol yapılan yüksek riskli yaşlı hastalarda saniyelik KB kontrolü için tercih edilir.',
      'Transkütan Pacing Pedleri: Bazal AV bloku/bradikardisi (özellikle Karbamazepin altında) veya ciddi KAH\'ı olan yüksek riskli olgularda hazır bulundurulur.',
      'Floroskopi (C-Kollu Skopi) Rehberliği ve Radyasyon Güvenliği (kurşun önlük/tiroid koruyucu).',
      'Uyanık RFT\'de Kornea Refleksi (steril pamuk ucu) ve 2 Hz Masseter Motor Seğirme İzlemi.'
    ],
    vascularAccess: [
      'En az 1 - 2 adet geniş çaplı (16 - 18G) güvenli periferik intravenöz yol (acil IV Esmolol/Nikardipin/Labetalol, Glikopirolat/Atropin ve sıvı bolusları için kesintisiz açık)'
    ],
    patientPosition: 'RFT ve PMC İçin SUPİN (Boyun Hafif Ekstansiyonda); GLİSEROL RİZOLİZİSİ Enjeksiyonu ve Sonrası 1 - 2 Saat İçin OTURUR / YARI OTURUR + BOYUN FLEKSİYONDA (Çene Göğse Yakın!)',
    patientPositionDetails: [
      'RFT ve PMC Pozisyonu: Foramen ovalenin submental-verteks/oblik floroskopide görülmesi için hasta supin, boyun hafif ekstansiyondadır.',
      'GLİSEROL RİZOLİZİSİ POZİSYONU (HAYATİ!): Hiperbarik anhidr gliserol enjeksiyonu aşamasında masa/hasta OTURUR / YARI OTURUR pozisyona getirilir ve BOYUN FLEKSİYONA (çene göğse yakın) alınır; bu pozisyon işlem sonrası 1 - 2 saat korunur (supin ekstansiyon gliserolü beyin sapına akıtır!). Oturur pozisyonda ortostatik hipotansiyon, vazovagal senkop ve acil hava yolu erişimine karşı yakın izlem yapılır.',
      'GÖZ KORUMASI AYRIMI: Uyanık RFT\'de kornea refleksi lezyon öncesi/sonrası test edileceğinden göz BANTLANMAZ (erişilebilir bırakılır); koruyucu şeffaf göz bandı/pomad yalnızca genel anestezi altındaki PMC olgularında uygulanır!'
    ],
    anesthesiaManagement: [
      'Acil Hemodinamik İlaç Hazırlığı (İndüksiyon/Başlangıç Öncesi Enjektörde Çekili!):',
      '  - Kısa etkili antihipertansifler: IV Esmolol, Nikardipin veya Labetalol (ani > 200 mmHg hipertansif fırtına için!).',
      '  - Antikolinerjikler: Yaşlı/KAH hastalarında profilaksi gerekiyorsa GLİKOPİROLAT (0.2 mg IV — Atropine göre daha ılımlı taşikardi!); şiddetli bradikardi/asistoli kurtarma tedavisi için IV ATROPİN (0.5 - 1.0 mg) + vazopresör (Fenilefrin/Efedrin/Adrenalin).',
      'Radyofrekans Termokoagülasyon (RFT) Titre MAC Protokolü:',
      '  - Kanül Giriş Fazı: Korunmasız hava yolunda 1 - 1.5 mg/kg bolus YERİNE yavaş titre düşük doz Propofol (0.3 - 0.5 mg/kg IV veya TCI 1.0 - 2.0 mcg/mL) ± ultra-düşük doz Remifentanil + ZORUNLU sidestream EtCO2.',
      '  - Stimülasyon Fazı: Propofol durdurulur, hasta tam uyanır; 50 Hz (0.1 - 0.5 V) duyu uyarımıyla nevralji dalı (V2/V3) doğrulanır, 2 Hz motor uyarımda masseter seğirmesi izlenir, kornea refleksi (açık/erişilebilir gözde!) kontrol edilir.',
      '  - Termal Lezyonlama Fazı: Yeniden titre kısa süreli sedasyon (düşük doz Propofol 0.3 - 0.5 mg/kg veya TCI artışı — spontan solunum/EtCO2 izlemiyle!) altında 65 - 75°C\'de 60 - 90 sn lezyon oluşturulur; ardından tekrar kornea refleksi test edilir.',
      'Balon Mikrokompresyonu (PMC) Genel Anestezi Protokolü:',
      '  - GETA (veya LMA) ile genel anestezi: Propofol + Remifentanil (Karbamazepin kullananlarda NMB gerekiyorsa Hofmann eliminasyonlu Sisatrakuryum tercih edilir).',
      '  - 60 - 90 Saniye Balon Enflasyonu: Şiddetli TCR bradikardi/asistoli ve hemen ardından > 200 mmHg hipertansif pik gelişebilir; profilaktik Glikopirolat (yaşlı/KAH\'da Atropin yerine!) ve hazır Esmolol/Nikardipin ile yönetilir.',
      'Gliserol Rizolizisi Protokolü:',
      '  - Kanül yerleşimi supin/hafif sedasyonda yapıldıktan sonra hasta OTURUR + BOYUN FLEKSİYONDA (çene göğse yakın) pozisyona alınır; 0.15 - 0.35 mL hiperbarik anhidr gliserol yavaşça enjekte edilir. Ortostatik hipotansiyon ve vazovagal/TCR senkobuna karşı IV sıvı ve vazopresörler hazır tutulur.',
      'Trigeminokardiyak Refleks (TCR) Kriz Yönetimi:',
      '  - Ani kalp hızı düşüşü (< 40/dk) veya asistolide: (1) Cerraha sesli "ASİSTOLİ / BRADİKARDİ — DURDUR!" uyarısı → manipülasyon/balon derhal sonlandırılır; (2) Hızla düzelmezse IV Atropin (0.5 - 1.0 mg) ve gerekirse transkütan pacing / Adrenalin (10 - 20 mcg IV) uygulanır.',
      'Bukkal Mukoza Perforasyonu Önlemi:',
      '  - Kanül ağız içi mukozayı delerse derhal yeni steril kanül/eldivene geçilir ve bakteriyel menenjit profilaksisi için uygun IV antibiyotik başlanır.'
    ],
    airwayManagement: [
      'MAC / RFT ve Gliserol Olgularında: Nazal kanül ile O2 + ZORUNLU sürekli yan akım (sidestream) EtCO2 kapnografi; oturur pozisyonda (gliserol) acil sırtüstü yatırma ve maske/LMA kurtarma hazırlığı.',
      'Genel Anestezi (PMC) Olgularında: Kontralateral ağız köşesine tespitli oral ETT (veya LMA); ipsilateral yanak tamamen steril cerrahi sahadadır.'
    ],
    criticalSurgicalStages: [
      '1. Submental-Verteks ve Oblik Floroskopi ile Foramen Ovale Görüntülemesi.',
      '2. Hartel Noktasından Kanül Girişi (ağız içi parmak korumasıyla bukkal mukoza perforasyonu önlenir!).',
      '3. Foramen Ovale Geçişi ve Meckel Mağarasında BOS Doğrulaması (TCR bradikardi + ICA ponksiyon riski!).',
      '4. RFT: Uyanık 50 Hz/2 Hz Haritalama + Kornea Refleksi + Titre Sedasyonda 65 - 75°C Termal Lezyon.',
      '5. PMC: 4 Fr Fogarty Balonunun "Armut" Konfigürasyonunda 60 - 90 Saniye Kompresyonu (TCR + > 200 mmHg hipertansiyon!).',
      '6. Gliserol: Oturur + Boyun Fleksiyonda (Çene Göğse) 0.15 - 0.35 mL Hiperbarik Anhidr Gliserol Enjeksiyonu.',
      '7. Kanül Çekilmesi ve Yanak Ponksiyon Hattına 5 - 10 Dakika Manuel Kompresyon.'
    ],
    emergenceNotes: [
      'Reaktif Hipertansiyon Kontrolü: İşlem sonrası sempatik pikle SKB > 160 - 200 mmHg çıkabilir; IV Esmolol, Labetalol veya Nikardipin ile SKB < 140 mmHg tutulur.',
      'Kranyal Sinir ve Göz Muayenesi: Kornea refleksi (duyu kaybında yapay gözyaşı ve koruyucu nem odası), masseter kas kuvveti ve kavernöz sinüs basısına bağlı geçici CN IV / CN VI paralizisi (DİPLOPİ) kontrol edilir.',
      'Yanak/Retrofarengeal Hematom ve Menenjit Uyanıklığı: Ağız içi şişlik, hematom veya şiddetli baş ağrısı/ense sertliği izlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi ve İlaç Azaltma Protokolü:',
      '  - Trigeminal nevralji ağrısı genellikle işlemle anında kesilir; hafif yanak ponksiyon ağrısı için düzenli Oral/IV Parasetamol (1000 mg 6 saatte bir) yeterlidir.',
      '  - Yanak/kafa tabanı hemostazı kesin doğrulandıktan sonra gerekirse kısa süreli oral NSAİİ (İbuprofen 400 mg) eklenebilir (güçlü opioidlere gerek duyulmaz).',
      '  - Postoperatif Disestezi / "Anesthesia Dolorosa": Nadir yanıcı nöropatik ağrı gelişirse Gabapentin veya Pregabalin başlanır.',
      '  - KARBAMAZEPİN / OKSKARBAZEPİN KADEMELİ KESİMİ: Preoperatif yüksek doz kullanılan antiepileptikler ASLA aniden kesilmez; nöroloji kontrolünde 1 - 2 haftada kademeli azaltılır (ani kesilme yoksunluk nöbetine yol açar!).'
    ],
    prospectRecommendations: [
      'Perkütan trigeminal girişimler için özel bir PROSPECT kılavuzu bulunmamaktadır; sistemik Parasetamol bazlı non-opioid yaklaşım işlem sonrası hafif ponksiyon ağrısı için yeterlidir.'
    ],
    erasRecommendations: [
      'EAN 2019 Kılavuzu ve Postoperatif Güvenlik Takibi:',
      '  - Gliserol Rizolizisi Sonrası Pozisyon: Hasta işlem sonrası 1 - 2 SAAT BOYUNCA OTURUR VE BOYUN FLEKSİYONDA (çene göğse yakın) tutulmalıdır!',
      '  - Kornea Koruma Protokolü: Kornea refleksi zayıflayan olgularda prezervansız suni gözyaşı damlası (4 - 6 kez/gün), gece oftalmik pomad ve koruyucu gözlük reçete edilir.',
      '  - Spesifik Komplikasyon İzlemi: Geçici CN IV/VI diplopi, geçici masseter zayıflığı (sağlam tarafla yumuşak çiğneme eğitimi), Gasser gangliyonu manipülasyonuna bağlı sık görülen perioral HERPES SİMPLEKS VİRÜS (HSV) REAKTİVASYONU (gerekirse antiviral tedavi) ve bukkal perforasyon olduysa bakteriyel menenjit bulguları yakından izlenir.',
      '  - Komplikasyonsuz, hemodinamik olarak stabil olgular 4 - 6 saatlik gözlem sonrası aynı gün veya 1 gece yatışla taburcu edilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery - Functional Neurosurgery: Percutaneous Procedures for Trigeminal Neuralgia. Philadelphia: Wolters Kluwer.',
    otherReferences: [
      'Bendtsen, L., Zakrzewska, J. M., Abbott, J., Braschinsky, M., Di Stefano, G., Donnet, A., Eide, P. K., Leal, P. R. L., Maarbjerg, S., May, A., Nurmikko, T., Obermann, M., Jensen, T. S., & Cruccu, G. (2019). European Academy of Neurology guideline on trigeminal neuralgia. European Journal of Neurology, 26(6), 831-849.',
      'Sweet, W. H., & Wepsic, J. G. (1974). Controlled thermocoagulation of trigeminal ganglion and rootlets for differential destruction of pain fibers: 1. Trigeminal neuralgia. Journal of Neurosurgery, 40(2), 143-156.',
      'Mullan, S., & Lichtor, T. (1983). Percutaneous microcompression of the trigeminal ganglion for trigeminal neuralgia. Journal of Neurosurgery, 59(6), 1007-1012.',
      'Meuwly, C., Golanov, E., Chowdhury, T., Erne, P., & Schaller, B. (2015). Trigeminal cardiac reflex: new thinking model about the definition based on a literature review. Medicine, 94(5), e484.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Considerations for Percutaneous Trigeminal Rhizotomy, Glycerol Rhizolysis, and Balloon Compression.'
    ]
  }
};
