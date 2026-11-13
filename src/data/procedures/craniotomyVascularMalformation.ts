import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: İntrakraniyel Vasküler Malformasyon Cerrahisi (AVM ve Kavernom Rezeksiyonu)
 * (Craniotomy for Intracranial Vascular Malformations: AVM & Cavernoma Resection)
 * 
 * Jaffe (5th ed.), AHA/ASA Guidelines for the Management of Brain Arteriovenous Malformations,
 * Stroke Council Guidelines, SNACC (Society for Neuroscience in Anesthesiology and Critical Care)
 * ve ERAS Society Nöroşirürji konsensus raporları referans alınarak yapılandırılmıştır.
 */
export const craniotomyVascularMalformation: ProcedureDefinition = {
  id: 'craniotomy-vascular-malformation',
  name: 'Kraniyotomi: İntrakraniyel Vasküler Malformasyon Cerrahisi (AVM ve Kavernom Rezeksiyonu)',
  shortCode: 'AVM-KAVERNOM-CERRAHİSİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Serebrovasküler Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Serebral parankim veya dural yapraklar içerisinde yerleşen yüksek akımlı-düşük dirençli Arteriyovenöz Malformasyonlar (AVM), Dural AV Fistüller (dAVF) ve düşük akımlı Kavernöz Malformasyonların (Kavernom / Kavernöz Hemanjiom) mikrocerrahi yöntemle besleyici arterlerinin kliplenmesi, nidusun çevre parankimden diseke edilerek tam rezeksiyonu ve drenaj venlerinin en son basamakta kapatılması ameliyatıdır. En kritik fizyopatolojik özelliği, nidus çıkarıldıktan sonra komşu kronik iskemik dokuda gelişebilecek "Normal Perfüzyon Basıncı Çöküşü" (NPPB / Normal Perfusion Pressure Breakthrough) ve kanama riskidir.',
  indications: [
    'Rüptüre Olmuş Serebral AVM\'ler: İntraserebral (İHK) veya subaraknoid kanamaya yol açmış, tekrarlayan katastrofik kanama riski taşıyan malformasyonlar',
    'Spetzler-Martin Grade I, II ve III Serebral AVM\'ler: Cerrahi morbiditesi düşük-orta düzeyde olan, genç ve semptomatik (nöbet, ilerleyici nörolojik defisit, intraktabl baş ağrısı) olgular',
    'Preoperatif Endovasküler Embolizasyon (Onyx / Glubran) Sonrası AVM Rezeksiyonu: Çoklu seanslarla nidal debisi düşürülmüş geniş lezyonların küratif mikrocerrahi eksizyonu',
    'Semptomatik Kavernöz Malformasyonlar (Kavernomlar): Tekrarlayan mikrokanamalar, medikal tedaviye dirençli epilepsi veya kitle etkisi (özellikle beyin sapı, talamus, elokent motor/konuşma alanları) yaratan lezyonlar',
    'Dural Arteriyovenöz Fistüller (Borden Tip II-III / Cognard Tip III-IV-V): Retrograd kortikal venöz drenaj ve yüksek intrakraniyel kanama riski taşıyan dural lezyonlar'
  ],
  averageDuration: '4.5 - 8.0 saat (Anestezi indüksiyonu, çift lümenli A-line, CVC, İONM elektrotlarının kurulumu ve Mayfield baş tespiti: 60-75 dk; Kraniyotomi, dural açılış ve mikroskop altına geçiş: 60-90 dk; Besleyici arterlerin diseksiyonu, geçici klipleme ve nidusun sirkumferansiyel ayrılması: 120-240 dk; Drenaj veninin kapatılması, nidus eksizyonu ve ICG video-anjiyografi kontrolü: 45-90 dk; Titiz hemostaz, post-rezeksiyon kan basıncı titrasyonu ve kraniyoplasti/kapanış: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '400 - 1500 mL (Yüksek akımlı büyük AVM\'lerde derin besleyicilerin diseksiyonunda kan kaybı hızla 2000 - 3500+ mL masif kanamaya dönüşebilir; izole kavernom olgularında ise kanama genelde daha sınırlıdır: 100 - 300 mL)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Arteriyovenöz Kanama',
    crossMatchRequirement: 'En az 4 Ünite Eritrosit Süspansiyonu (ES), 2-4 Ünite Taze Donmuş Plazma (TDP) ve 1 Aferez Trombosit Cross-Match hazır bekletilmeli; Cell-Saver (Otolog Kan Kurtarma) ve Acil Masif Transfüzyon Protokolü (MTP) aktif hazır bulundurulmalıdır',
    transfusionProbability: '%40 - %70 (Spetzler-Martin Grade III-IV ve rüptüre AVM\'lerde %80-90; küçük periferik kavernomlarda %5-10)',
    criticalBleedingSources: [
      'Nidus İntraoperatif Rüptürü: Diseksiyon esnasında frajil nidal damarların yırtılması (yüksek debili arteriyovenöz jet kanama)',
      'Derin Lentikülostriat ve Talamoperforatör Besleyici Arterler (derin beyaz cevherde retraksiyonu zor arteriyel kanama)',
      'Drenaj Veninin Erken Kesilmesi veya Trombozu: Nidus içindeki venöz çıkış tıkanırsa nidus saniyeler içinde patlar ve masif intrakraniyal kanama (Oklüzif Hiperemi) gelişir!',
      'Dura Mater, Sinüs Sigmoideus / Sinüs Sagittalis Superior komşuluğundaki dural venöz göllenmeler',
      'Normal Perfüzyon Basıncı Çöküşü (NPPB): Nidus çıkarıldıktan sonra komşu vazoparalitik serebral yatakta gelişen kontrolsüz kapiller sızıntı ve parankim içi hematom'
    ],
    hemostasisStrategies: [
      'Drenaj Veninin En Son Kapatılması Kuralı: Cerrahi ekip tüm besleyici arterleri kapatıp nidusu tamamen serbestleştirene kadar ana drenaj venini kesinlikle kesmemelidir',
      'Yüksek Vakumlu Çift Frazier/Yankauer Aspiratör Düzeni hazır ve açık olmalıdır',
      'Hızlı Sıvı/Kan Isıtıcı ve Masif İnfüzyon Pompası (Belmont / Rapid Infuser) hatları prime edilmiş bekletilmelidir',
      'Cell-Saver (Otolog Kan Kurtarma): Enfeksiyon veya malignite bulunmadığı için cerrahi alandan aspire edilen kan yıkanarak hızla hastaya geri verilebilir',
      'Mikronöroşirürjikal hemostatik ajanlar: Bipolar hassas mikro-koagülasyon, FloSeal jelatin matriks, Oxycel/Surgicel ve pamuk kompresyonu',
      'Post-Rezeksiyon Hipotansiyonu: Nidus çıkarıldıktan hemen sonra NPPB\'yi önlemek için sistolik kan basıncı < 110-120 mmHg, MAP 65-75 mmHg aralığına düşürülür'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Sevofluran (<0.4 - 0.5 MAC): Serebral metabolik oksijen tüketimini (CMRO2) ve serebral kan akımını (CBF) azaltır, optimal beyin gevşemesi sağlar ve intraoperatif nöromonitörizasyonu (MEP/SSEP) baskılamaz'
    ],
    alternative: [
      'Opioid Tabanlı Yüksek Doz GETA (Fentanil/Süfentanil + TIVA): Ciddi kardiyovasküler instabilitesi olan olgularda'
    ],
    clinicalRationale: 'Yüksek akımlı AVM nidusunda serebral vazodilatasyonu ve hipertansif rüptürü önlemek, aynı zamanda elokent alan haritalaması ile İONM (MEP/SSEP) sinyallerini korumak için Propofol + Remifentanil TIVA (veya <0.5 MAC Sevofluran) altın standarttır. Uzun mikrocerrahi sırasında baş pozisyonuna bağlı lümen tıkanmasını önlemek için spiral telli ETT ile kontrollü ventilasyon (normokapni/hafif hipokapni) tercih edilir.',
    notes: 'AVM CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) REZEKSİYON ÖNCESİ HİPERTANSİYONDAN KAÇINMA; (2) İONM VE KORTİKAL HARİTALAMA İÇİN TIVA; (3) MİKROCERRAHİ İÇİN BEYİN GEVŞEMESİ (SLACK BRAIN); (4) NİDUS SONRASI NORMAL PERFÜZYON BASINCI ÇÖKÜŞÜNÜ (NPPB) ÖNLEME.',
    rulesTitle: 'AVM CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'REZEKSİYON ÖNCESİ ANİ HİPERTANSİYONU VE NİDAL RÜPTÜRÜ ÖNLEME',
        content: 'Yüksek akımlı arteriyovenöz malformasyon (AVM) yatakları ince duvarlıdır ve otoregülasyondan yoksundur. Laringoskopi, Mayfield çivisi veya dural açılış sırasındaki tansiyon pikleri intraoperatif nidal rüptüre neden olur; indüksiyon/entübasyonda derin analjezi ve Esmolol/Labetalol titrasyonu şarttır.'
      },
      {
        number: 2,
        title: 'ELOKENT KORTEKS HARİTALAMASI VE İONM İÇİN TIVA (KAS GEVŞETİCİSİZ)',
        content: 'Spetzler-Martin skorunda elokent alan komşuluğu varsa MEP, SSEP ve kortikal haritalama sinyallerini korumak için Propofol + Remifentanil TIVA uygulanmalı, entübasyon sonrasında nöromusküler bloker verilmemelidir.'
      },
      {
        number: 3,
        title: 'MİKROCERRAHİ İÇİN BEYİN GEVŞEMESİ (SLACK BRAIN) VE MASİF KANAMA HAZIRLIĞI',
        content: 'Derin besleyici arterlere ulaşırken beyin parankimini travmatize etmemek için Mannitol/Hipertonik Salin, baş elevasyonu ve PaCO2 32-35 mmHg düzeyinde hafif hiperventilasyon uygulanır; Rapid Infuser ve Cell-Saver hazır bulundurulmalıdır.'
      },
      {
        number: 4,
        title: 'NİDUS ÇIKARILINCA "NORMAL PERFÜZYON BASINCI ÇÖKÜŞÜNÜ" (NPPB) ÖNLEME',
        content: 'Kronik yüksek akımlı şant kapandığında çevre normal beyin damarları vazoparalizi halindedir ve ani artan kan akımına dayanamayarak masif beyin ödemine veya hiperemik kanamaya (NPPB) yol açar. Nidus çıktığı anda MAP 65-75 mmHg ve Sistolik KB < 110-120 mmHg tutulmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Girişimsel Nöroradyoloji Konsültasyonu: Spetzler-Martin Skoru (Boyut: <3 cm [1], 3-6 cm [2], >6 cm [3]; Elokent alan: [1]; Derin venöz drenaj: [1]), nidal anevrizma varlığı, besleyici arter sayısı ve preoperatif embolizasyon durumu.',
      'Girişimsel Nöroradyoloji Embolizasyon Ayrıntıları: Embolizasyonda kullanılan ajan (Onyx / Histoacryl), oklüde edilen damarlar ve işlem sonrası gelişen fokal nörolojik bulgular sorgulanmalıdır.',
      'Nöroloji / Epileptoloji Konsültasyonu: AVM hastalarının %40-60\'ında nöbet öyküsü vardır; preoperatif antiepileptik ilaç (özellikle Levetirasetam 1000-1500 mg IV) tedavisi doğrulanmalıdır.',
      'Yoğun Bakım Konsültasyonu: Postoperatif sıkı invaziv arter takibi ve kontrollü sedasyon/uyanma planı için Nöro-Yoğun Bakım yatağının ayrılması.'
    ],
    historyAndPhysical: [
      'Nörolojik Muayene: Dört ekstremite motor gücü, görme alanı (özellikle oksipital ve temporal AVM\'lerde homonim hemanopsi), kranyal sinirler ve konuşma (Broca / Wernicke disfazisi) kaydedilmelidir.',
      'KİBAS ve Kanama Bulguları: Akut rüptüre AVM olgularında baş ağrısı, bulantı-kusma, papilödem ve bilinç düzeyi (GKS) değerlendirilmelidir.',
      'Kardiyovasküler Aşırı Yüklenme Sorgusu: Çok geniş yüksek akımlı AVM\'lerde yüksek debili kalp yetmezliği (yüksek kardiyak indeks) ve kardiyomegali gelişebilir.',
      'Zor Hava Yolu Muayenesi: Mallampati skoru, tiromental mesafe ve servikal boyun hareketleri kaydedilmelidir.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 4 Ünite ES + 2-4 Ünite TDP Cross-Match teyidi.',
      'Hemoglobin / Hematokrit, Trombosit Sayımı, PT/INR, aPTT, Fibrinojen (tüketim koagülopatisi ekarte edilmelidir).',
      'Serum Elektrolitleri (Özellikle Sodyum - Na+; mannitol tedavisi ve SIADH/CSWS ayrımı için bazal sodyum şarttır).',
      'Dijital Subtraksiyon Anjiyografi (DSA), Beyin BT ve MRG / Traktografi tetkiklerinin ameliyathane ekranına aktarılması.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp ve Foramen Monro (Tragus) Seviyesinde Sıfırlanmış: Anestezi indüksiyonu ÖNCESİ lokal anesteziyle mutlaka yerleştirilmelidir. Rezeksiyon öncesi hipertansiyonu, diseksiyondaki ani kanamaları ve post-rezeksiyon hipotansiyonunu saniyelik takip etmek için zorunludur.',
      'Santral Venöz Basınç (CVP) / Santral Venöz Kateter: Yüksek doz vazoaktif infüzyonların (Noradrenalin, Labetalol, Esmolol, Nikardipin) güvenli titrasyonu ve volüm takibi için.',
      'İntraoperatif Nöromonitörizasyon (İONM): Motor Uyarılmış Potansiyeller (MEP), Somatosensoriyel Uyarılmış Potansiyeller (SSEP), EEG ve elokent korteks AVM\'lerinde Faz Ters Dönmesi (Phase Reversal / Somatosensory Evoked Cortical Potentials).',
      'İntraoperatif İndosiyanin Yeşili (ICG) Video-Anjiyografi: Cerrahi mikroskop altında nidal damarların perfüzyonunu, arter/ven ayrımını ve rezeksiyon sonrası rezidüel AVM kalmadığını kanıtlamak için cerrahla koordineli uygulanır.',
      'Mikro-Vasküler Doppler Ultrasonografi: Besleyici arterlerin ve ana drenaj veninin akım yönü ve hızının mikroskop altında doğrulanması.',
      'Sürekli End-Tidal CO2 (EtCO2), Isı Problu Foley İdrar Sondası (Mannitol diürezi takibi) ve Sürekli Isı Takibi (Normotermi 36.0 - 37.0°C).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz yol (14G veya 16G)',
      'Santral Venöz Kateter (Üç lümenli CVC)',
      'Hızlı Sıvı/Kan İnfüzyon Sistemi (Belmont / Level 1) için hazır geniş lümenli kan yolu'
    ],
    patientPosition: 'Lezyonun Anatomik Yerleşimine Göre Değişken: Supin + Baş Rotasyonu, Park-Bench veya Prone Pozisyon (Mayfield 3-Noktalı Çivili Başlık ile İmmobilize Edilmiş)',
    patientPositionDetails: [
      'Konveksite ve Frontal/Temporal AVM\'ler: Supin pozisyon, baş karşı tarafa hafif rotasyon ve 15-20° elevasyonda tutulur.',
      'Oksipital veya Posterior Fossa AVM\'leri: Park-Bench veya Prone pozisyon kullanılır; boyun venöz dönüşünün engellenmemesi için çene ile sternum arasında en az 2 parmak mesafe korunur.',
      'Mayfield çivisi takılmadan önce çivi yerlerine lokal anestezik (Bupivakain + Lidokain) infiltre edilir ve anestezi derinliği (Remifentanil bolusu) artırılarak hipertansif yanıt önlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (1.5 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 - 1.0 mg/kg). Entübasyon esnasında kan basıncının fırlaması rüptüre yol açabileceğinden İntravenöz Lidokain (1.0 - 1.5 mg/kg) ve Esmolol (0.5 mg/kg) ile hemodinami kesinlikle baskılanır.',
      'İdame: TIVA (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.3 mcg/kg/dk TCI infüzyonu). BIS 40 - 50 aralığında tutulur. Kas gevşetici sadece indüksiyonda verilir; İONM MEP kayıtları için idame kas gevşeticisiz sürdürülür.',
      'Beyin Gevşetme Protokolü: Dura açılmadan önce %20 Mannitol (0.5 - 1.0 g/kg IV yavaş infüzyon) veya %3 Hipertonik Salin (2 - 3 mL/kg IV). Hafif hiperventilasyon ile PaCO2 32 - 35 mmHg aralığında tutulur.',
      'Kan Basıncının Evreye Göre Titrasyonu:',
      '  - Nidus Diseksiyon Fazı: MAP 75 - 85 mmHg (besleyici arterlerde gerilmeyi ve kanamayı azaltmak için kontrollü normotansiyon).',
      '  - NİDUS REZEKSİYONU SONRASI KRİTİK FAZ: Nidus tamamen çıkarıldıktan sonra "Normal Perfüzyon Basıncı Çöküşü" (NPPB) gelişimini önlemek için MAP kesinlikle 65 - 75 mmHg aralığına, sistolik kan basıncı < 110-120 mmHg seviyesine çekilir. Hipertansiyon gelişirse Esmolol (25 - 50 mcg/kg/dk), Labetalol veya Nikardipin infüzyonu ile tansiyon anında kontrol altına alınır!'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; mikroskop ve cerrah manipülasyonunda tüpün katlanmasını önlemek için tercihen Spiral (Zırhlı / Wire-reinforced) ETT.',
      'Laringoskopi ve entübasyona bağlı sempatik yanıt (taşikardi ve ani hipertansiyon) nidal kubbe rüptürünü tetikleyebilir; derin anestezi altında, yumuşak ve atravmatik entübasyon şarttır.',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Mayfield Çivili Başlık Takılması ve Dura Açılışı: KİBAS ve hipertansif atak kontrolü.',
      '2. Pial Diseksiyon ve Yüzeyel Besleyicilerin Kliplenmesi: Cerrahi alan mikroskopla büyütülür; mikroklipsler ve bipolar koter kullanılır.',
      '3. Derin Besleyicilerin Ayrılması (En Zorlu Aşama): Derin lentikülostriat veya koroidal dallar ayrılırken nidal yırtılma ve masif kanama riski; anestezi ekibi kan ısıtıcılarını ve transfüzyonu hazır tutar.',
      '4. Ana Drenaj Veninin Kapatılması: Nidus tamamen izole edilmeden drenaj veni KESİNLİKLE kesilmemelidir. Nidus izole edildikten sonra ven kliplenir ve nidus tek parça (en-bloc) çıkarılır.',
      '5. ICG Video-Anjiyografi ile Doğrulama: Nidus yatağında rezidüel erken venöz doluş veya kaçak kalmadığı mikroskop altında belgelenir.',
      '6. Post-Rezeksiyon Hemostaz ve NPPB Kontrolü: Valsalva manevrası yapılarak cerrahi alanda kanama kontrolü yapılır; tansiyon kontrollü hipotansiyonda tutulur.'
    ],
    emergenceNotes: [
      'ÖKSÜRMESİZ VE HİPERTANSİYONSUZ UYANDIRMA (SMOOTH EMERGENCE) ZORUNLUDUR: Uyanma esnasında ıkınma, öksürme ve hipertansif pikler nidal yatakta ölümcül sekonder hematom ve NPPB kanamasına yol açar!',
      'Uyanma Sırasında Hemodinamik Blokaj: Ekstübasyondan 10-15 dakika önce IV Lidokain (1 mg/kg), Deksmedetomidin (0.2 - 0.5 mcg/kg/saat) veya Esmolol (0.5 mg/kg bolus) uygulanarak taşikardi ve hipertansiyon köreltilir.',
      'Nörolojik Değerlendirme: Hasta uyanır uyanmaz motor fonksiyonlar, pupiller, konuşma ve görme alanı ameliyathanede değerlendirilir ve kaydedilir.',
      'Şüpheli veya Zorlu Olgularda Yaklaşım: Spetzler-Martin Grade IV-V, masif kanama geçirmiş, rezeksiyon yatağında ödem gözlenen veya intraoperatif komplikasyon gelişen hastalar ameliyathanede ASLA uyandırılmaz; entübe, sedatize ve sıkı kontrollü hipotansiyon (MAP 65-75 mmHg) altında Nöro-Yoğun Bakım Ünitesine transfer edilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi: Cerrahi kesi hattına lokal anestezik infiltrasyonu (Bupivakain / Levobupivakain) + IV Parasetamol (1 g IV her 6 saatte bir).',
      'Sedasyondan Kaçınan Opioid Titrasyonu: Şiddetli ağrıda düşük doz Fentanil (25-50 mcg IV bolus); hastanın nörolojik uyanıklığını ve pupiller muayenesini bozacak aşırı sedatif analjeziklerden kaçınılır.',
      'Ağrı Kaynaklı Hipertansiyonun Önlenmesi: Yetersiz analjezi kan basıncını yükselterek rezeksiyon yatağında kanamaya zemin hazırlar; ağrı proaktif tedavi edilmelidir.'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi Önerileri: Skalp infiltrasyonu, planlı sistemik Parasetamol, cerrah onaylı selektif NSAİİ ve sedasyona yol açmayan titrasyonlu kısa etkili opioid kullanımı.',
      'Postoperatif bulantı-kusmanın (POBV) agrezif engellenmesi.'
    ],
    erasRecommendations: [
      'ERAS Nöroşirürji Rehberi: Postoperatif yoğun bakımda hedeflenen kan basıncı sınırlarının (Sistolik KB < 120 mmHg, MAP 65-75 mmHg) ilk 24-48 saat kesintisiz korunması.',
      'Bulantı-Kusma Profilaksisi: Çift antiemetik (Ondansetron 4 mg + Deksametazon 4-8 mg). Öğürme ve kusma intrakraniyel venöz basıncı fırlatarak intrakraniyal kanama riskini katlar!',
      'Nöbet Profilaksisi: İntraoperatif başlanan Levetirasetam (1000 mg IV her 12 saatte bir) tedavisine postoperatif dönemde düzenli devam edilmesi.',
      'Erken Kontrol Beyin BT: Rezeksiyon yatağında hematom, NPPB ödemi veya iskemi gelişimini dışlamak için postoperatif ilk saatlerde çekilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Lippincott Williams & Wilkins. Section II: Neurosurgery - Vascular Procedures: Resection of Arteriovenous Malformation, pp. 440-446.',
    erasReference: 'ERAS® Society Guidelines for Perioperative Care in Neurosurgical Oncology and Vascular Procedures (2020).',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in craniotomy. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Ogunnaike, B. O., et al. (2012). Anesthetic management of patients with intracranial arteriovenous malformations. Journal of Neurosurgical Anesthesiology, 24(4), 388-398.',
      'AHA/ASA Guidelines for the Management of Adults with Brain Arteriovenous Malformations: A Guideline for Healthcare Professionals From the American Heart Association/American Stroke Association (2017).',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement on the Perioperative Management of Patients with Intracranial Vascular Malformations.',
      'Spetzler, R. F., & Martin, N. A. (1986). A proposed grading system for arteriovenous malformations. Journal of Neurosurgery, 65(4), 476-483.'
    ]
  }
};
