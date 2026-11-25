import { ProcedureDefinition } from '../../types/procedures';

/**
 * Vagal Sinir Stimülasyonu (VNS): Sol Vagus Siniri Stimülatörü İmplantasyonu (Dirençli Epilepsi Tedavisi)
 * (Vagal Nerve Stimulation - VNS: Left Vagus Nerve Stimulator Implantation)
 *
 * Jaffe (6th ed., 2020, Section II: Neurosurgery - Functional Procedures: Vagal Nerve Stimulation),
 * American Academy of Neurology (Morris et al., Neurology 2013),
 * International League Against Epilepsy (ILAE) ve SNACC Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const vagalNerveStimulation: ProcedureDefinition = {
  id: 'vagal-nerve-stimulation',
  name: 'Vagal Sinir Stimülasyonu (VNS): Sol Vagus Siniri Stimülatörü İmplantasyonu (Dirençli Epilepsi Tedavisi)',
  shortCode: 'VNS-EPİLEPSİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Epilepsi Nöroşirürjisi',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal tedaviye dirençli epilepsi ve tedaviye dirençli majör depresyon olgularında; sol servikal karotid kılıf içerisindeki N. vagus (CN X) ana gövdesine sarmal (helikal) elektrotların sarılması, elektrot kablosunun cilt altından tünellenerek sol subklaviküler/ön aksiller cebe yerleştirilen programlanabilir bir puls jeneratörüne (VNS pili / IPG) bağlanması ameliyatıdır. Elektriksel uyarılar vagus sinirinin afferent lifleri üzerinden nukleus traktus solitarius (NTS) ve talamokortikal ağlara iletilerek epileptik deşarjları desenkronize eder ve nöbet sıklığını azaltır.',
  indications: [
    'Medikal Tedaviye Dirençli Fokal veya Jeneralize Epilepsi: En az 2 - 3 uygun antiepileptik ilaca (AED) dirençli, rezektif cerrahiye uygun olmayan veya rezeksiyondan fayda görmemiş erişkin ve pediatrik (≥ 4 yaş) hastalar',
    'Lennox-Gastaut Sendromu ve Pediatrik Epileptik Ensefalopatiler: Düşme atakları (atonik nöbetler) ve çoklu nöbet tipleri gösteren dirençli pediatrik olgular (sıklıkla ketojenik diyet eşlik eder!)',
    'Tedaviye Dirençli Majör Depresyon (TRD): Çoklu antidepresan ve EKT tedavilerine dirençli depresyon',
    'Tuberoskleroz ve Diffüz Kortikal Displaziye Bağlı Dirençli Nöbetler',
    'VNS Jeneratör (Pil) Değişimi veya Donanım Revizyonu: Batarya ömrü tükenen (genellikle 5 - 10 yıl) jeneratörlerin değiştirilmesi veya elektrot revizyonu'
  ],
  averageDuration: '1.0 - 2.0 saat (Anestezi indüksiyonu, pozisyonlama ve boyun/göğüs cerrahi örtümü: 25-35 dk; Sol servikal insizyon, karotid kılıf diseksiyonu ve sol vagus sinirinin serbestleştirilmesi: 25-35 dk; Helikal elektrotların sarılması, subklaviküler cep açılışı ve subkütan tünelleme: 20-30 dk; Sistem test stimülasyonu [EKG/bradikardi ve empedans doğrulaması] ve çift tabakalı kapanış: 20-30 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 30 - 100 mL (Minimal cerrahi kanama; standart VNS implantasyonunda kan kaybı ihmal edilebilir düzeydedir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Cerrahi Kan Kaybı (Ancak Postoperatif Servikal Hematom Hava Yolunu Hızla Tıkayabilir)',
    crossMatchRequirement: 'Tip & Screen (T&S) doğrulaması yeterlidir; rutin eritrosit süspansiyonu hazırlığı gerekmez',
    transfusionProbability: '< %1 (Son derece nadir)',
    criticalBleedingSources: [
      'V. Jugularis Interna ve Yan Dalları (V. facialis, V. thyroidea superior — karotid kılıf diseksiyonunda yırtılma riski)',
      'A. Carotis Communis (Derin diseksiyonda vasküler adventisya yaralanması)',
      'Subklaviküler Cep Kanamaları (A. thoracica interna perforatör dalları ve V. cephalica)',
      'Servikal ve Pektoral Cilt Altı Mikrovasküler Yatak (postoperatif boyun hematomu trakeal bası riski taşır)'
    ],
    hemostasisStrategies: [
      'Yalnızca BİPOLAR mikronöroşirürjikal koagülasyon (vagus siniri yakınında monopolar koter termal sinir hasarı yaratır!)',
      'Boyun venöz yaralanmalarında pamuk/Surgicel kompresyonu ve vasküler sütür',
      'Subklaviküler cepte ve boyun sahasında tam hemostaz (öksürmesiz pürüzsüz ekstübasyon ile desteklenir)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA — Propofol + Remifentanil TIVA veya dengeli inhalasyonel anestezi [< 1.0 MAC Sevofluran; yüksek doz Sevofluran/hipokapniden kaçın!]): Karotid kılıf diseksiyonunda hareketsizlik ve laringeal spazma/bradikardiye karşı kesin hava yolu güvenliği sağlar',
      'Vokal Kord / NIM ETT Monitörizasyonu Kullanılacaksa: Kas gevşeticisiz TIVA (Propofol + Remifentanil) VEYA entübasyonda düşük doz Rokuronyum (0.3 - 0.45 mg/kg) + cerrahi test öncesi Sugammadeks ile tam antagonizasyon (TOF %100)'
    ],
    alternative: [
      'Yalnızca İzole Subklaviküler Pil Değişimi İçin (Seçilmiş Erişkinlerde): Lokal Anestezi + MAC veya LMA — ANCAK AKTİF VNS CİHAZI AÇIKKEN LMA/MAC ALTINDA EPİZODİK LARİNGOSPAZM VE VOKAL KORD ADDÜKSİYONU GELİŞEBİLİR! İşlem öncesi cihaz 0 mA\'ya kapatılmalı veya VNS mıknatısı IPG üzerine bantlanmalıdır'
    ],
    clinicalRationale: 'Karotid kılıf diseksiyonu, subkütan tünelleme ve sol vagus uyarımı sırasında tam hareketsizlik, nöbet eşiği stabilitesi ve ani laringeal spazma karşı kesin koruma için oral ETT (sağ ağız köşesine sabitlenmiş) ile genel anestezi altın standarttır. Aktif VNS cihazlı olgularda (revizyon veya diğer ameliyatlar) cihazın periyodik uyarıları LMA/MAC altında tekrarlayan laringospazma yol açabileceğinden cihaz kapatılmalı veya VNS mıknatısı hazır tutulmalıdır.',
    notes: 'VNS İMPLANTASYONUNDA 6 HAYATİ ANESTEZİ KURALI: (1) DAİMA SOL VAGUS — BRADİKARDİ/ASİSTOLİDE ATROPİN (PEDİATRİK 0.02 MG/KG) VE TRANSKÜTAN PACİNG PEDLERİ; (2) VNS MIKNATISI, KOTER/DİATERMİ VE MRG GÜVENLİĞİ (MIKNATIS BASILI TUTULURSA STİMÜLASYONU DURDURUR!); (3) AKTİF VNS\'TE LARİNGOSPAZM/VOKAL KORD ADDÜKSİYONU VE POSTOP SÜREKLİ SpO2/OSA İZLEMİ; (4) TRAMADOL VE KODEİN MUTLAK YASAK (EPİLEPSİ + FDA KARA KUTU PEDİATRİK/OSA!); (5) KETOJENİK DİYET (DEKSTROZ/RİNGER LAKTAT YASAK!) VE AED DEVAMLILIĞI; (6) SERVİKAL HEMATOM, SOL REKÜRREN/FRENİK SİNİR VE HORNER SENDROMU TAKİBİ.',
    rulesTitle: 'VNS İMPLANTASYONUNDA ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'DAİMA SOL VAGUS: BRADİKARDİ / ASİSTOLİ YÖNETİMİ VE TRANSKÜTAN PACİNG PEDLERİ',
        content: 'Sağ vagus siniri SA nodu yoğun inerve ettiğinden sağ uyarım katastrofik asistoli yapar — VNS DAİMA SOL VAGUSA takılır. Sol vagus diseksiyonu veya cihaz test stimülasyonunda şiddetli bradikardi/asistoli gelişirse cerrahi manipülasyon/uyarım derhal durdurulur, IV Atropin (erişkin 0.5 - 1.0 mg; pediatrik 0.02 mg/kg) uygulanır. Atropine dirençli refrakter asistoli için ameliyathanede TRANSKÜTAN PACİNG PEDLERİ hazır bulundurulmalıdır.'
      },
      {
        number: 2,
        title: 'VNS MIKNATISI, ELEKTROKOTER / DİATERMİ VE MRG GÜVENLİĞİ',
        content: 'VNS mıknatısının IPG (pil) üzerine SÜREKLİ BASILI TUTULMASI/BANTLANMASI stimülasyonu geçici olarak DURDURUR (akut bradikardi, asistoli, laringospazm veya vokal kord addüksiyonunda hayat kurtarıcıdır!); kısa süreli (1 - 2 sn) kaydırma (swipe) ise nöbeti durduran ekstra uyarı tetikler. BİPOLAR koter tercih edilir (monopolar koter sol vagusta termal hasar riski taşır); KISA DALGA / MİKRODALGA DİATERMİ MUTLAK KONTRENDİKEDİR. MRG öncesinde cihaz çıkış akımı 0 mA\'ya indirilmeli ve T/R kafa koili kullanılmalıdır.'
      },
      {
        number: 3,
        title: 'TRAMADOL VE KODEİN MUTLAK YASAKTIR (EPİLEPSİ + FDA KARA KUTU PEDİATRİK/OSA)',
        content: 'Epileptik ve sıklıkla pediatrik/OSA\'lı bu hasta grubunda TRAMADOL (nöbet eşiğini düşürür + CYP2D6 solunum depresyonu) ve KODEİN (FDA Kara Kutu uyarısı: < 12 yaş çocuklarda ve < 18 yaş OSA\'lı hastalarda ultra-hızlı metabolizasyonla ölümcül solunum depresyonu!) KESİNLİKLE KONTRENDİKEDİR! Multimodal analjezi insizyonel lokal anestezik + Parasetamol (erişkin 1000 mg, pediatrik 15 mg/kg) üzerine kurulur.'
      },
      {
        number: 4,
        title: 'AKTİF VNS\'TE EPİZODİK LARİNGOSPAZM VE POSTOPERATİF SÜREKLİ SpO2 / OSA İZLEMİ',
        content: 'Aktif çalışan VNS cihazı her 3 - 5 dakikada bir sol rekürren laringeal siniri uyararak LMA veya MAC altında tekrarlayan vokal kord addüksiyonu, stridor ve laringospazma yol açabilir! Pil değişimi veya başka cerrahilerde VNS 0 mA\'ya kapatılmalı ya da mıknatıs pil üzerinde hazır tutulmalıdır. VNS Obstrüktif Uyku Apnesini (OSA) belirgin ağırlaştırdığından postoperatif sürekli SpO2 ve apne izlemi şarttır.'
      },
      {
        number: 5,
        title: 'KETOJENİK DİYET (DEKSTROZ/RİNGER LAKTAT YASAK!), AED DEVAMI VE SEVOFLURAN UYARISI',
        content: 'Lennox-Gastaut ve pediatrik epilepsi olgularında ketojenik diyet mutlaka sorgulanır: Dekstroz içeren IV sıvılar, Ringer Laktat ve şekerli şuruplar KESİNLİKLE YASAKTIR (%0.9 NaCl + her 1 - 2 saatte glukoz/keton/HCO3- takibi!). Tüm AED\'ler ameliyat sabahı kesintisiz verilir. Yüksek doz Sevofluran (> 1.5 MAC) ve aşırı hipokapni pro-konvülzan olduğundan kaçınılır.'
      },
      {
        number: 6,
        title: 'SERVİKAL HEMATOM, SOL REKÜRREN/FRENİK SİNİR VE HORNER SENDROMU TAKİBİ',
        content: 'Öksürmesiz pürüzsüz ekstübasyon (smooth emergence) derin boyun hematomu ve trakeal basıyı önler. Uyanmada sol rekürren laringeal sinir irritasyonu (ses kısıklığı, stridor) ile nadir ancak kritik SOL FRENİK SİNİR YARALANMASI (diyafram paralizisi/dispne) ve sempatik zincir hasarına bağlı HORNER SENDROMU (pitozis, miyozis, anhidrozis) kontrol edilir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Epileptoloji / Pediatrik Nöroloji Konsültasyonu: Nöbet tipleri (fokal, atonik, Lennox-Gastaut), AED rejimi, son nöbet zamanı, ketojenik diyet durumu ve varsa mevcut VNS cihazının program/kapatma (0 mA) koordinasyonu.',
      'Kardiyoloji Konsültasyonu: Bazal 12 derivasyonlu EKG ve kardiyak iletim değerlendirmesi (preoperatif bradikardi, AV blok, uzun QT veya hasta sinüs sendromu dışlanmalıdır; belirgin iletim bloğunda transkütan pacing hazırlığı şarttır).',
      'KBB ve Uyku Tıbbı / Göğüs Hastalıkları Değerlendirmesi: Bazal ses kalitesi/vokal kord fonksiyonu ve Obstrüktif Uyku Apnesi (OSA) taraması (VNS, OSA ve uyku ilişkili hipopneleri belirgin ağırlaştırabilir!).'
    ],
    historyAndPhysical: [
      'Nöbet Öyküsü, AED Politerapisi ve Ketojenik Diyet Taraması: Enzim indükleyici AED\'ler (Fenitoin, Karbamazepin, Fenobarbital — aminosteroid NMB direnci), Valproat (trombosit disfonksiyonu) ve pediatrik ketojenik diyet mutlaka belgelenir.',
      'Kardiyak Otonomik Öykü: Senkop, bradikardi atakları veya karotid sinüs aşırı duyarlılığı.',
      'Sol Boyun, Klavikula ve Hava Yolu Muayenesi: Önceki boyun cerrahisi/trakeostomi skarı, Fenitoin ilişkili gingival hiperplazi, pediatrik sendromik hava yolu özellikleri ve OSA bulguları.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve Tip & Screen (T&S) doğrulaması.',
      'Tam Kan Sayımı (AED ilişkili nötropeni/trombositopeni) ve Koagülasyon Paneli (Valproat kullananlarda trombosit fonksiyon/fibrinojen kontrolü).',
      'Serum Elektrolitleri: Özellikle Serum Sodyum (Karbamazepin/Okskarbazepin hiponatremisi nöbet eşiğini düşürür); ketojenik diyetli hastalarda bazal kan glukozu, kan ketonu ve HCO3-.',
      'Karaciğer ve Böbrek Fonksiyon Testleri ile 12 Derivasyonlu EKG (PR mesafesi, bazal kalp hızı, QT).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: Kesintisiz 5 derivasyonlu EKG (elektrot yerleşimi ve test stimülasyonu sırasında sesli QRS puls tonu açık!), NIBP (3 - 5 dk), SpO2, EtCO2 ve vücut sıcaklığı.',
      'Transkütan Pacing / Defibrilatör Pedleri: Atropine dirençli refrakter vagal asistoli riskine karşı ameliyathanede (yüksek riskli/iletim defektli olgularda göğse yapıştırılmış) hazır bulundurulmalıdır.',
      'İntraoperatif Sistem Test Uyarımı (Diagnostic Lead Test) İzlemi: 1 mA test stimülasyonu sırasında ani bradikardi, AV blok, asistoli ve vokal kord yanıtının saniye saniye takibi.',
      'Vokal Kord / NIM ETT Monitörizasyonu (Kullanılıyorsa) ve TOF İzlemi: Laringeal motor yanıt izlenecekse test öncesi TOF oranı %100 (4/4) olmalıdır.',
      'Ketojenik Diyet Olgularında: Her 1 - 2 saatte bir kan glukozu, kan ketonu ve kan gazı (HCO3-).'
    ],
    vascularAccess: [
      'En az 1 - 2 adet güvenli periferik intravenöz yol (SAĞ kolda tercih edilir; sol boyun ve sol göğüs steril cerrahi sahadadır)',
      'Pediatrik olgularda mikro-infüzyon pompaları ve aktif ısıtma sistemleri (ketojenik diyette yalnızca %0.9 NaCl!)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Sağa 30 - 45° Döndürülmüş ve Sol Omuz Altına Hafif Destek Rulo Yerleştirilmiş',
    patientPositionDetails: [
      'Sol karotid üçgeni rahatça ortaya koymak için baş sağa çevrilir ve boyun hafif ekstansiyona alınır.',
      'Aşırı boyun rotasyonundan kaçınılır (ETT bükülmesi veya sol internal juguler ven gerilmesini önlemek için).',
      'Sol boyun, sol klavikula, sol pektoral ve ön aksiller alan tek steril sahada açık bırakılır.',
      'Gözler koruyucu pomad/bant ile kapatılır; tüm bası noktaları jel pedlerle desteklenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve NMB Stratejisi:',
      '  - Propofol (2 - 2.5 mg/kg) + Fentanil (2 mcg/kg) veya Remifentanil. Vokal kord (NIM ETT) monitörizasyonu kullanılacaksa kas gevşeticisiz TIVA VEYA düşük doz Rokuronyum (0.3 - 0.45 mg/kg) + test öncesi Sugammadeks ile tam antagonizasyon (TOF %100). CYP450 indükleyici AED kullananlarda Hofmann eliminasyonlu Sisatrakuryum düşünülebilir.',
      'İdame ve Nöbet Eşiği Koruması:',
      '  - TIVA (Propofol + Remifentanil) veya dengeli inhalasyonel anestezi (< 1.0 MAC Sevofluran). Yüksek doz Sevofluran (> 1.5 MAC) ve derin hipokapni pro-konvülzan olduğundan kaçınılır.',
      '  - Ketojenik Diyet Olgularında: Yalnızca %0.9 NaCl (Dekstrozlu sıvılar ve Ringer Laktat KESİNLİKLE YASAK!).',
      'Vagal Manipülasyon ve Sistem Testinde Bradikardi / Asistoli Yönetimi:',
      '  - Sol vagus diseksiyonunda veya 1 mA test stimülasyonunda ani bradikardi/asistoli gelişirse:',
      '    1. Cerraha derhal manipülasyonu/stimülasyonu durdurması bildirilir (aktif cihazda IPG üzerine VNS mıknatısı basılı tutulur!).',
      '    2. 5 - 10 saniyede düzelmezse IV Atropin (erişkin 0.5 - 1.0 mg; pediatrik 0.02 mg/kg) uygulanır; refrakter asistolide transkütan pacing ve Epinefrin başlatılır.',
      'Koter / Diatermi ve Tünelleme Analjezisi:',
      '  - Yalnızca BİPOLAR koter kullanılır (monopolar koter sol vagusta termal hasar riski taşır; kısa dalga/mikrodalga diatermi MUTLAK KONTRENDİKEDİR).',
      '  - Boyundan subklaviküler cebe trokar ile tünelleme sırasında analjezi derinleştirilir ve insizyon/tünel hattına lokal anestezik infiltre edilir.'
    ],
    airwayManagement: [
      'Standart Oral ETT (tercihen spiral telli), SAĞ ağız köşesine sağlam sabitlenir (sol boyun cerrahi sahasından uzak).',
      'Sol Rekürren Laringeal Sinir Koruması: ETT kaf basıncı 20 - 25 cmH2O sınırında izlenir.',
      'Aktif VNS Cihazı Bulunan Revizyon/Diğer Cerrahilerde: LMA/MAC altında epizodik laringospazm ve vokal kord addüksiyonu gelişebileceğinden cihaz 0 mA\'ya kapatılmalı veya VNS mıknatısı IPG üzerinde hazır tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Sol Servikal Karotid Kılıf Diseksiyonu: V. jugularis interna ve A. carotis communis arasından sol N. vagus izolasyonu (bradikardi/frenik sinir/sempatik zincir koruması).',
      '2. Helikal Elektrotların Sol Vagus Sinirine Sarılması: Sinir gerilimi ve monopolar koter hasarından kaçınılması.',
      '3. Sol Subklaviküler Cep Açılışı ve Subkütan Tünelleme: Şiddetli ağrılı uyaran kontrolü.',
      '4. Jeneratör Bağlantısı ve Sistem Test Uyarımı (1 mA): EKG bradikardi/asistoli ve empedans kontrolü (Atropin + pacing pedleri + VNS mıknatısı hazır!).',
      '5. Titiz Hemostaz ve Katmanlı Kapanış: Derin boyun hematomunu önleme.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE): Ekstübasyonda öksürme ve ıkınma derin servikal hematom ve akut trakeal basıya yol açar! IV Lidokain (1 - 1.5 mg/kg) veya düşük doz Remifentanil ile sakin ekstübasyon sağlanır.',
      'Sinir Fonksiyonları Kontrolü: Uyanmada ses kalitesi/stridor (sol rekürren laringeal sinir), tek taraflı dispne/paradoksal solunum (nadir sol frenik sinir yaralanması) ve pitozis/miyozis (nadir Horner sendromu) değerlendirilir.',
      'Nöbet ve Hava Yolu Takibi: Bilinç, SpO2 ve nöbet aktivitesi ameliyathanede belgelenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal ve Pediatrik/Epilepsi Güvenli Analjezi Protokolü:',
      '  - Boyun ve Subklaviküler İnsizyon Hatlarına Lokal Anestezik İnfiltrasyonu (%0.25 Bupivakain veya Ropivakain — pediatrik maksimum doz sınırına dikkat!).',
      '  - Düzenli IV/Oral Parasetamol (erişkin 1000 mg, pediatrik 15 mg/kg, 6 saatte bir).',
      '  - Cerrahi boyun hemostazı kesin olarak doğrulandıktan sonra oral/IV İbuprofen (pediatrik 10 mg/kg) veya seçilmiş erişkinlerde NSAİİ eklenebilir (servikal hematom riski nedeniyle erken dönemde cerrahi onay şarttır).',
      '  - Kurtarma Analjeziği (nadiren gerekir): Çok düşük titre doz IV Fentanil veya pediatrik/erişkin uygun kısa etkili opioid (OSA/solunum depresyonu izlemiyle).',
      '  - MUTLAK YASAKLAR: TRAMADOL (epileptik nöbet eşiği düşüşü + FDA Kara Kutu) ve KODEİN (FDA Kara Kutu uyarısı: < 12 yaş çocuklarda ve < 18 yaş OSA\'lı hastalarda ölümcül solunum depresyonu riski!) KESİNLİKLE KULLANILMAZ!'
    ],
    prospectRecommendations: [
      'VNS implantasyonuna özel yayımlanmış bir PROSPECT kılavuzu bulunmamaktadır; minör yüzeyel servikal/pektoral cerrahi multimodal ilkeleri uyarınca insizyonel lokal anestezik infiltrasyonu + düzenli Parasetamol (pediatrik 15 mg/kg) opioid gereksinimini ve sedasyon/OSA riskini minimize eder.'
    ],
    erasRecommendations: [
      'Postoperatif VNS Güvenlik ve Takip Protokolü:',
      '  - SÜREKLİ POSTOPERATİF SpO2 VE OSA İZLEMİ: Özellikle pediatrik, nörolojik engelli ve OSA öykülü hastalarda sürekli puls oksimetri ve apne takibi yapılır.',
      '  - VNS Mıknatısı ve Cihaz Durumu: Cihaz ameliyathanede genellikle kapalı (0 mA) bırakılır ve 2 - 4 hafta sonra poliklinikte aktive edilir. Hasta/aile ve hemşire ekibi VNS mıknatısının acil durdurma (basılı tutma) ve nöbet sonlandırma (kısa kaydırma) işlevleri ile MRG (0 mA + T/R koil) / diatermi yasağı konusunda bilgilendirilir.',
      '  - Antiepileptik İlaçlar ve Ketojenik Diyetin Kesintisiz Devamı: Tüm bazal AED\'ler oral veya IV eşdeğer dozlarda aksatılmadan sürdürülür.',
      '  - Boyun Hematomu ve Sinir Komplikasyonu Alarmı: Boyunda şişlik, stridor, solunum sıkıntısı (hematom veya sol frenik/rekürren sinir hasarı) veya Horner sendromu yakından izlenir.',
      '  - Erken Oral Alım ve Postoperatif 2 - 4. Saatte Mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery - Functional Procedures: Vagal Nerve Stimulation. Philadelphia: Wolters Kluwer.',
    otherReferences: [
      'Morris, G. L., Gloss, D., Buchhalter, J., Mack, K. J., Nickels, K., & Harden, C. (2013). Evidence-based guideline update: vagus nerve stimulation for the treatment of epilepsy: report of the Guideline Development Subcommittee of the American Academy of Neurology. Neurology, 81(16), 1453-1459.',
      'Englot, D. J., Rolston, J. D., Wright, C. W., Hassnain, K. H., & Chang, E. F. (2016). Rates and predictors of seizure freedom with vagus nerve stimulation for intractable epilepsy. Neurosurgery, 79(3), 345-353.',
      'Hatton, K. W., McLarney, J. T., Pittman, T., & Fahy, B. G. (2006). Vagal nerve stimulation: overview and implications for anesthesiologists. Anesthesia & Analgesia, 103(5), 1241-1249.',
      'U.S. Food and Drug Administration (FDA). (2017). FDA Drug Safety Communication: FDA restricts use of prescription codeine pain and cough medicines and tramadol pain medicines in children (<12 years) and adolescents with OSA (<18 years).',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Management of Patients Undergoing Vagus Nerve Stimulator Implantation.'
    ]
  }
};
