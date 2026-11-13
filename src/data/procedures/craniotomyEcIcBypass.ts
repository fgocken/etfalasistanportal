import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: Ekstrakraniyel-İntrakraniyel Revaskülarizasyon (EC-IC Bypass / STA-MCA)
 * (Craniotomy for Extracranial-to-Intracranial Revascularization: STA-MCA & High-Flow Bypass)
 * 
 * Jaffe (5th ed.), AHA/ASA Guidelines for the Management of Patients with Moyamoya Disease,
 * International Stroke Conference Guidelines, SNACC (Society for Neuroscience in Anesthesiology
 * and Critical Care) ve ERAS Society Nöroşirürji konsensus raporları referans alınarak yapılandırılmıştır.
 */
export const craniotomyEcIcBypass: ProcedureDefinition = {
  id: 'craniotomy-ec-ic-bypass',
  name: 'Kraniyotomi: Ekstrakraniyel-İntrakraniyel Revaskülarizasyon (EC-IC Bypass / STA-MCA)',
  shortCode: 'STA-MCA-BYPASS',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Serebrovasküler Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Hemodinamik yetmezlik veya vasküler oklüzyon nedeniyle kronik iskemik tehdit altındaki serebral parankimi revaskülarize etmek amacıyla; skalp donör arteri olan A. temporalis superficialis (STA)\'in, küçük bir kraniyotomi penceresinden kortikal M4 Middle Cerebral Artery (MCA) dalına mikrocerrahi uç-yan (end-to-side) mikrovasküler anastomoz ile bağlanması (klasik doğrudan STA-MCA bypass) ameliyatıdır. Seçilmiş olgularda radial arter veya safen ven greftiyle yüksek akımlı (high-flow) bypass veya temporal kas/dura serbestleştirilerek dolaylı (indirekt / EDAS-EMS) revaskülarizasyon teknikleri de uygulanır.',
  indications: [
    'Moyamoya Hastalığı ve Moyamoya Sendromu: Bilateral internal karotid arter (ICA) tepe darlık/tıkanıklığına bağlı tekrarlayan geçici iskemik ataklar (TİA), iskemik inmeler ve çocuklarda ağlama/hiperventilasyonla tetiklenen nörolojik defisitler',
    'Kompleks, Kliplenemeyen / Koillenemeyen İntrakraniyel Anevrizmalar: Dev veya fuziform ICA, MCA veya anterior sirkülasyon anevrizmalarında cerrahi tuzaklama (trapping) veya ana damar ligasyonu öncesi distal serebral kan akımını korumak amacıyla koruyucu bypass',
    'Medikal Tedaviye Dirençli Hemodinamik Serebral İskemi: Asetazolamid (Diamox) SPECT veya perfüzyon BT/MRG ile kanıtlanmış bozulmuş serebrovasküler rezervi (CVR) olan, maksimal antiagregan tedaviye rağmen TİA geçiren semptomatik tam ICA veya MCA oklüzyonları',
    'Kafa Tabanı Tümör Cerrahileri: İnternal karotid arteri çevreleyen ve rezeksiyon esnasında arterin feda edilmesini gerektiren agresif kafa tabanı lezyonları (menenjiyomlar, karsinomlar) öncesi revaskülarizasyon'
  ],
  averageDuration: '4.0 - 7.0 saat (Anestezi indüksiyonu, invaziv A-line, İONM kurulumu ve Mayfield baş tespiti: 60-75 dk; Doppler kılavuzluğunda STA donör dalının [frontal veya parietal] mikrocerrahi diseksiyonu: 60-90 dk; Minikraniyotomi, dural açılış ve alıcı M4 kortikal arterin hazırlanması: 45-60 dk; İndüklenmiş hipertansiyon ve geçici klipleme altında mikrovasküler 10-0/11-0 monofilaman anastomoz: 60-90 dk; İntraoperatif ICG video-anjiyografi, transit-time akım ölçümü [Charbel probu], hemostaz ve kraniyoplasti/kapanış: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '150 - 450 mL (Standart mikrovasküler STA-MCA bypass diseksiyonunda düşük-orta kanama; ancak yaygın Moyamoya transdural kollaterallerinin kanaması veya yüksek akımlı ven/arter greft cerrahilerinde kan kaybı 600 - 1000 mL seviyesine çıkabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Kritik Mikrovasküler Anastomoz Kanama Odağı',
    crossMatchRequirement: 'En az 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır edilmeli, T&S doğrulanmalı; anastomoz öncesi sistemik heparinizasyon (30-50 IU/kg) için antikoagülasyon takibi yapılmalıdır',
    transfusionProbability: '%15 - %35 (Pediatrik Moyamoya olgularında veya düşük vücut ağırlıklı hastalarda %30-45)',
    criticalBleedingSources: [
      'Alıcı M4 Kortikal Arter Duvarı: 10-0 monofilaman sütür hattından mikro-sızıntılar veya arteriyel yırtılma',
      'Skalp İnsizyon Kenarları ve Donör STA Yatağı: Skalp son derece zengin vaskülarize olduğundan donör arter çıkarılırken kas ve galea kanamaları',
      'Moyamoya Hastalarında Dural Spontan Transdural Kollateraller: Dura açılırken spontan gelişmiş narin neovasküler damarların yırtılması',
      'Geçici Mikroklips Yerleşim Yerleri: Alıcı artere konulan geçici klipslerin endotel hasarı yaratması ve revaskülarizasyon sonrası kanama'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal hassas koagülasyon (donör STA adventisyasına zarar vermeden sadece yan dalların yakılması)',
      'Anastomoz hattı hemostazı için hemostatik jelatin sünger (Gelfoam), Surgicel ve ıslak pamuk kompresyonu (aşırı sıkı bası anastomozu tıkayabileceğinden nazik hemostaz)',
      'Düşük Doz Sistemik Heparinizasyon (30 - 50 IU/kg IV bolus): Geçici klipleme öncesi anastomoz lümeninde mikrotrombozu önlemek için uygulanır; cerrahi tamamlanınca gerekirse Protamin ile kısmi nötralize edilir',
      'Cell-Saver (Otolog Kan Kurtarma) düzeneği hazır bulundurulmalıdır'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Uçucu Anestezik (<0.4 - 0.5 MAC Sevofluran): İONM (MEP/SSEP ve EEG) dalgalarını korurken serebral metabolik koruma (CMRO2 düşüşü) ve optimal anestezi derinliği sağlar'
    ],
    alternative: [
      'Opioid Tabanlı Yüksek Doz GETA (Fentanil/Süfentanil + TIVA): Ciddi kardiyak rezerv kısıtlılığı olan olgularda'
    ],
    clinicalRationale: 'Kronik hipoperfüzyon altındaki beyin dokusunda CMRO2 düşüşü sağlarken İONM (EEG, SSEP, MEP) sinyallerini bozmamak ve vazoparalitik damarlarda çalma fenomenini (steal) engellemek için Propofol + Remifentanil TIVA altın standarttır. PaCO2\'nin 38-42 mmHg dar aralığında kesin kontrolü ve baş rotasyonunda lümen güvenliği için spiral telli ETT ile kontrollü mekanik ventilasyon gereklidir.',
    notes: 'EC-IC BYPASS CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) GEÇİCİ KLİPTE İNDÜKLENMİŞ HİPERTANSİYON; (2) HİPERVENTİLASYON YASAĞI VE MUTLAK NORMOKAPNİ; (3) HEMATOKRİT (%30-33) VE NORMOVOLEMİ; (4) ANASTOMOZ SONRASI SEREBRAL HİPERPERFÜZYON SENDROMU (CHS) ÖNLEMİ.',
    rulesTitle: 'EC-IC BYPASS CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'HİPOTANSİYONDAN KAÇINMA VE GEÇİCİ KLİPTE İNDÜKLENMİŞ HİPERTANSİYON',
        content: 'Kronik hipoperfüzyondaki beyin dokusu basınç-bağımlıdır; indüksiyon sırasındaki kısa hipotansiyon bile kalıcı inme yaratır. Alıcı M4 dalı geçici kliplendiğinde kollateral akımı korumak için Noradrenalin/Fenilefrin ile MAP %10-20 artırılarak ≥ 90-100 mmHg tutulmalıdır.'
      },
      {
        number: 2,
        title: 'HİPERVENTİLASYON YASAĞI VE SIKI NORMOKAPNİ (PaCO2 38-42 mmHg)',
        content: 'Moyamoya ve tıkayıcı serebrovasküler hastalıklarda hipokapni sağlam damarları vazokonstrikte ederek ya da vazoparalitik alandan kanı çalarak (Steal Sendromu) masif enfarkta yol açar! PaCO2 mutlaka 38-42 mmHg aralığında normokapnik tutulmalı, hiperventilasyon kesinlikle yapılmamalıdır.'
      },
      {
        number: 3,
        title: 'OPTİMAL REOLOJİ: HEMATOKRİT (%30-33), NORMOVOLEMİ VE NORMOTERMİ',
        content: 'Mikrovasküler anastomoz açıklığı için hemokonsantrasyon önlenmelidir (ideal Hct %30-33); hipotermi vazospazmı ve viskoziteyi artırdığından normotermi korunur. Pediatrik Moyamoya hastalarında preoperatif ağlama ve dehidratasyonu önlemek için kesintisiz IV hidrasyon sağlanır ve Aspirin kesilmez.'
      },
      {
        number: 4,
        title: 'ANASTOMOZ SONRASI SEREBRAL HİPERPERFÜZYON SENDROMU (CHS) ÖNLEMİ',
        content: 'Donör STA ile alıcı kortikal arter anastomozu açıldığı an yüksek akımın otoregülasyonsuz yatağa girmesi beyin ödemi, fokal nöbet ve intraserebral kanamaya (CHS) neden olabilir. Klempler açıldığında hedeflenen tansiyon normotansif sınırlara (SKB < 130-140 mmHg) indirilmelidir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Girişimsel Nöroradyoloji Konsültasyonu: Dijital Subtraksiyon Anjiyografi (DSA) bulguları, Suzuki Evresi (Moyamoya Evre I-VI), donör STA\'nın lümen çapı (ideal olarak ≥ 1.0 mm), alıcı M4 dalının kalibresi ve leptomeningeal kollateral derecesinin incelenmesi.',
      'Serebrovasküler Rezerv (CVR) Değerlendirmesi: Diamox (Asetazolamid) provokasyonlu SPECT, Perfüzyon BT veya BOLD-fMRG ile serebral otoregülasyon kaybı ve iskemik penumbra alanlarının tespiti.',
      'Nöroloji / İONM Ekibi: Bazal nörolojik defisitler, TİA sıklığı, motor güç (0-5 skala), afazi varlığı ve ameliyat sırasındaki MEP/SSEP/EEG bazal planlaması.',
      'Pediatrik Nöroloji / Anestezi (Pediatrik Moyamoya için): Ağlama, dehidratasyon veya açlık ile tetiklenen TİA öyküsü; ameliyat sabahı açlık süresi minimumda tutulmalı ve hidrasyon damardan kesintisiz sürdürülmelidir!'
    ],
    historyAndPhysical: [
      'İskemik Tetikleyicilerin Sorgulanması: Moyamoya hastalarında hiperventilasyon (sıcak çorba/yemek üfleme, ağlama, egzersiz) serebral vazokonstriksiyona ve akut hemipareziye yol açar; bu öykü anestezi ekibine ameliyatta hiperventilasyon yapmama uyarısıdır.',
      'Nörolojik Muayene: Dört ekstremite motor gücü, duyusal seviye, konuşma ve kranyal sinir fonksiyonları ayrıntılı kaydedilmelidir.',
      'Skalp ve Temporal Bölge Muayenesi: Daha önce geçirilmiş kraniyotomi, skalp skarı veya travma varlığı (donör STA trasesini bozabilir). Doppler stetoskop ile donör arterin trasesi ameliyat öncesi ciltte işaretlenir.',
      'Antiagregan / Antikoagülan Tedavi: Hastalar sıklıkla Aspirin veya Klopidogrel kullanmaktadır; mikrovasküler greft patensisi için Aspirin (100 mg/gün) genellikle KESİLMEZ ve ameliyat sabahı dahil devam edilir.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 2 Ünite ES Cross-Match teyidi.',
      'Tam Kan Sayımı (Hb, Hct, Trombosit): İdeal Hct düzeyi %30 - 33 aralığıdır; aşırı yüksek Hct viskoziteyi artırarak anastomozu tıkar, aşırı düşük Hct O2 sunumunu bozar.',
      'Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen) ve Kan Gazı bazal değerleri.',
      'Serum Elektrolitleri, Böbrek ve Karaciğer Fonksiyon Testleri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp ve Dış Kulak Yolu (Tragus / Foramen Monro) Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle mutlaka yerleştirilmelidir. İskemik parankimde en ufak hipotansiyonu engellemek ve geçici klipleme sırasındaki indüklenmiş hipertansiyonu saniyelik titrasyonla yönetmek için zorunludur.',
      'İntraoperatif Nöromonitörizasyon (İONM): Motor Uyarılmış Potansiyeller (MEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP) ve kesintisiz EEG / Spektral Kenar Frekansı (SEF). Geçici klipleme esnasında kortikal iskemi gelişimini anında saptamak için.',
      'İntraoperatif İndosiyanin Yeşili (ICG) Video-Anjiyografi: Anastomoz tamamlandıktan sonra mikroskop altında donör STA\'dan alıcı MCA dalına kan geçişini ve distal dalların dolumunu doğrulamak için cerrahla koordineli uygulanır.',
      'Mikro-Vasküler Transit-Time Ultrasonik Akım Ölçümü (Charbel Flow Probe): Donör arter akım debisini (hedef: doğrudan bypass için 20 - 50 mL/dk) sayısal olarak ölçmek için.',
      'Sürekli End-Tidal CO2 (EtCO2) ve Sık Seri Arteriyel Kan Gazı (ABG): PaCO2 hedefi kesin olarak 38 - 42 mmHg tutulmalıdır!',
      'Train-of-Four (TOF) Nöromusküler İzlem, Isı Problu Foley İdrar Sondası ve Sürekli Normotermi (36.5 - 37.2°C).'
    ],
    vascularAccess: [
      'En az iki adet geniş lümenli periferik damar yolu (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Vazopressör (Noradrenalin / Fenilefrin) infüzyonunun güvenli titrasyonu ve intravasküler volüm optimizasyonu için'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon + Baş Mayfield 3-Noktalı Çivili Başlık ile Karşı Tarafa 45 - 60° Rotasyonda Sabitlenmiş',
    patientPositionDetails: [
      'Donör STA trasesine ve temporal bölgeye tam erişim sağlamak için baş lateral pozisyona getirilir.',
      'Çivili başlık yerleştirilirken donör STA dallarının (frontal ve parietal dallar) çivi delikleriyle yaralanmaması için arter trasesi işaretlenerek çiviler arterden uzağa takılır.',
      'Boyun venöz dönüşünün engellenmemesi için aşırı fleksiyon veya aşırı rotasyondan kesinlikle kaçınılmalıdır (juguler ven basısı CVP\'yi artırarak intrakraniyal venöz göllenmeye yol açar).',
      'İntraoperatif baş sarsıntısını ve mikroskopik anastomoz hassasiyetini korumak için Mayfield başlığı masaya rijit kilitlenmelidir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (1.5 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 - 1.0 mg/kg). En ufak hipotansiyon atağı iskemik penumbrayı enfarkta çevireceğinden indüksiyon son derece yavaş ve gerekirse profilaktik Efedrin/Fenilefrin desteğiyle yapılır.',
      'İdame (TIVA): Propofol (80 - 130 mcg/kg/dk) + Remifentanil (0.1 - 0.3 mcg/kg/dk TCI infüzyonu). BIS 40 - 50 aralığında tutulur. Kas gevşetici sadece indüksiyonda verilir; İONM MEP kayıtları için idame kas gevşeticisiz sürdürülür.',
      'SOLUNUM HEDEFİ — HİPERVENTİLASYON KESİNLİKLE KONTRENDİKEDİR: Rutin kraniyotomilerin aksine PaCO2 < 35 mmHg KESİNLİKLE YAPILMAZ! Hipokapni serebral arteriyolleri büzerek iskemik sahada "çalma sendromu" yaratır. Hedef PaCO2: 38 - 42 mmHg (normokapni / hafif hiperkapni).',
      'GEÇİCİ KLİPLEME VE İNDÜKLENMİŞ HİPERTANSİYON PROTOKOLÜ:',
      '  - Cerrah alıcı M4 kortikal artere geçici mikroklipsleri koyduğu anda (ortalama 25-45 dakika), kollateral leptomeningeal akımı korumak için Noradrenalin veya Fenilefrin infüzyonu ile Ortalama Arter Basıncı (MAP) bazalin %10 - 20 ÜZERİNE (MAP 90 - 105 mmHg, Sistolik KB 140 - 160 mmHg) çıkarılır.',
      '  - Anastomoz bittiği ve geçici klipsler kaldırıldığı anda MAP yeniden dikkatlice normotansif düzeye (MAP 75 - 85 mmHg) indirilir.',
      'Serebral Metabolik Koruma (Burst Süpresyon): Geçici klipleme öncesinde iskemik toleransı artırmak amacıyla cerrahın talebiyle ek Propofol bolusu ile EEG\'de burst süpresyon paterni oluşturulabilir.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; uzun süren mikrocerrahide ve baş rotasyonunda tüpün bükülmesini önlemek için tercihen Spiral (Zırhlı / Wire-reinforced) ETT.',
      'Entübasyon ve ekstübasyon esnasında hemodinamik stabilite (taşikardi ve hipotansiyondan kaçınma) mutlak korunmalıdır.',
      'Kaf basıncı monitörize edilmeli ve 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Donör STA Diseksiyonu: Cilt flebi kaldırılırken parietal/frontal dalın adventisyası korunarak ince yan dalları mikrokoterle bağlanır; donör arter kurutulmamalı, ılık papaverinli SF ile ıslatılmalıdır.',
      '2. Minikraniyotomi ve Dural Açılış: Sylvian fissür distalinde M4 kortikal dalı bulunur; Moyamoya hastalarında transdural spontan kollateraller korunarak dura dikkatle açılır.',
      '3. Geçici Klipleme ve Mikrovasküler Anastomoz (En Kritik Aşama!): Alıcı M4 dalına proksimal ve distal geçici mikroklips konulur; arteriyotomi yapılır ve 10-0/11-0 monofilaman naylon sütür ile uç-yan anastomoz dikilir (klipleme süresi sesli sayılır; hedef <30-40 dk). Anestezi ekibi indüklenmiş hipertansiyonu (MAP ≥ 90-100 mmHg) kesintisiz sürdürür.',
      '4. Geçici Klipslerin Kaldırılması ve Patensi Testi: Klipsler açılır; anastomozdan sızıntı kontrol edilir, ICG anjiyografi ve Doppler ile akım teyit edilir; anestezi ekibi tansiyonu normotansiyona çeker.',
      '5. Kraniyoplasti ve Kapanış: Kemik flebi yerine konulurken donör STA pedikülünün kemik kenarı tarafından ezilmemesi (kompresyona uğramaması) için kemikte geniş bir oluk (yiv / notch) açıldığı cerrahla birlikte kontrol edilir.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ VE HİPERTANSİYONSUZ UYANDIRMA: Uyanma sırasında öksürme, ıkınma ve şiddetli hipertansiyon taze anastomoz hattından kanamaya veya Serebral Hiperperfüzyon Sendromuna (CHS) yol açar.',
      'Uyanma Sırasında Hemodinamik Blokaj: Ekstübasyondan 10-15 dakika önce IV Lidokain (1 mg/kg) ve titre Esmolol veya Labetalol ile sempatik ataklar önlenir.',
      'SKALP BANDAJI UYARISI: Ameliyat sonunda başa sarılan elastik bandaj donör STA pedikülünün üzerinden geçer; BANDAJ KESİNLİKLE SIKI SARILMAMALIDIR! Aşırı sıkı pansiyon donör arteri dışarıdan sıkıştırarak greft trombozuna neden olur.',
      'Erken Nörolojik Değerlendirme: Hasta uyanır uyanmaz motor güç, konuşma ve fokal nörolojik bulgular değerlendirilmeli; defisit varsa greft oklüzyonunu ekarte etmek için acil yatak başı Doppler veya anjiyografi planlanmalıdır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi: Cerrahi kesi hattına lokal anestezik infiltrasyonu (donör arter trasesine doğrudan vazokonstriktör içermeyen Bupivakain/Levobupivakain) + IV Parasetamol (1 g IV her 6 saatte bir).',
      'Sedasyondan Kaçınan Opioid Titrasyonu: Şiddetli ağrıda düşük doz Fentanil (25-50 mcg IV bolus); hastanın nörolojik uyanıklığını ve konuşma muayenesini bozacak aşırı sedatif analjeziklerden kaçınılır.',
      'Ağrı Kaynaklı Hipertansiyonun Önlenmesi: Yetersiz analjezi kan basıncını kontrolsüz yükselterek anastomoz kaçağı ve hiperperfüzyon kanaması yaratabilir.'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi Önerileri: Skalp blokları / insizyonel infiltrasyon, planlı sistemik Parasetamol, cerrah onaylı multimodal ajanlar ve sedasyon yapmayan titrasyonlu kısa etkili opioidler.',
      'Postoperatif bulantı ve kusmanın (POBV) proaktif engellenmesi.'
    ],
    erasRecommendations: [
      'ERAS Nöroşirürji Rehberi: Postoperatif yoğun bakımda hedef kan basıncı sınırlarının (Sistolik KB 120-140 mmHg, normotansiyon) ilk 48-72 saat kesintisiz korunması.',
      'SEREBRAL HİPERPERFÜZYON SENDROMU (CHS) NÖBET VE KANAMA TAKİBİ: Postoperatif 2.-7. günlerde revaskülarize alanda gelişebilecek baş ağrısı, nöbet ve nörolojik bozulma CHS belirtisidir; acil antihipertansif tedavi ve Nöro-YBÜ izlemi gerektirir.',
      'Hidrasyon ve Antiagregan Protokolü: Greft açıklığını korumak için normovolemi sürdürülmeli ve Aspirin (100 mg/gün) postoperatif 1. günden itibaren devam edilmelidir.',
      'Bulantı-Kusma Profilaksisi: Çift antiemetik (Ondansetron 4 mg + Deksametazon 4-8 mg). Öğürme ve kusma intrakraniyel venöz basıncı fırlatarak greft basısı ve kanama riskini katlar!'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Lippincott Williams & Wilkins. Section II: Neurosurgery - Vascular Procedures: Extracranial-to-Intracranial Bypass (STA-MCA), pp. 446-450.',
    erasReference: 'ERAS® Society Guidelines for Perioperative Care in Neurosurgical Oncology and Vascular Procedures (2020).',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in craniotomy. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Research Committee on the Pathology and Treatment of Spontaneous Occlusion of the Circle of Willis; Health Labour Sciences Research Grant for Research on Measures for Intractable Diseases. (2012). Guidelines for diagnosis and treatment of Moyamoya disease (spontaneous occlusion of the circle of Willis). Neurologia Medico-Chirurgica, 52(5), 245-266.',
      'AHA/ASA Guidelines for the Prevention of Stroke in Patients with Stroke and Transient Ischemic Attack (2021).',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Perioperative Management of Pediatric and Adult Patients Undergoing Cerebral Revascularization.',
      'Smith, E. R., & Scott, R. M. (2012). Surgical management of Moyamoya disease. Neurosurgical Clinics of North America, 23(1), 101-110.'
    ]
  }
};
