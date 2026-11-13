import { ProcedureDefinition } from '../../types/procedures';

/**
 * Trigeminal Nevraljide Perkütan Girişimler: Radyofrekans Rizotomi (RFT), Balon Mikrokompresyonu ve Gliserol Rizolizisi
 * (Percutaneous Procedures for Trigeminal Neuralgia: Radiofrequency Rhizotomy, Balloon Microcompression, and Glycerol Rhizolysis)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: 
 * Percutaneous Procedures for Trigeminal Neuralgia, pp. 502-506), American Association of Neurological Surgeons (AANS),
 * Congress of Neurological Surgeons (CNS), Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve European Academy of Neurology (EAN) Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const percutaneousTrigeminalNeuralgia: ProcedureDefinition = {
  id: 'percutaneous-trigeminal-neuralgia',
  name: 'Trigeminal Nevraljide Perkütan Girişimler: Radyofrekans Rizotomi (RFT), Balon Mikrokompresyonu ve Gliserol Rizolizisi',
  shortCode: 'TN-PERKÜTAN',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Girişimsel Ağrı Nöroşirürjisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal tedaviye (Karbamazepin, Okskarbazepin, Baklofen) dirençli, tolere edilemeyen veya cerrahi mikrovasküler dekompresyona (MVD) yüksek risk taşıyan ya da MVD sonrası nüks eden Trigeminal Nevralji (Tic Douloureux) olgularında uygulanan minimal invaziv perkütan kafa tabanı girişimleridir. Hartel tekniği ile yanak derisinden (ağız köşesinin 2.5-3.0 cm lateralinden) girilen özel kanüller floroskopi (submental-verteks veya oblik foramen ovale görüntüsü) rehberliğinde Foramen Ovale içerisinden geçirilerek Meckel Mağarası ve Gasser Gangliyonuna ulaştırılır. Üç temel teknik uygulanır: (1) Perkütan Radyofrekans Termokoagülasyon (RFT / Rizotomi): Elektrik stimülasyonu ile trigeminal dal (V1, V2, V3) doğrulanıp hasta derin sedasyona alınarak 60-80°C\'de termal lezyon oluşturulmasıdır; (2) Perkütan Balon Mikrokompresyonu (PMC): 4 Numara Fogarty balonunun Meckel mağarasında radyoopak kontrastla "armut" konfigürasyonunda şişirilerek ganglion liflerinin petröz apeks ve duraya 1-3 dakika mekanik olarak ezilmesidir; (3) Retrogasserian Gliserol Rizolizisi: Trigeminal sistern içine sterilitesi teyit edilmiş anhidr gliserol enjekte edilerek miyelinsiz ve ince miyelinli nosiseptif C ve A-delta liflerinin kimyasal nörolizisidir.',
  indications: [
    'Medikal Tedaviye Dirençli Tip 1 veya Tip 2 Trigeminal Nevralji (Karbamazepin, Okskarbazepin, Gabapentin tedavisine yanıtsız veya şiddetli yan etkiler nedeniyle ilaç kesilmek zorunda kalınan olgular)',
    'İleri Yaş veya Yüksek Kardiyopulmoner Risk (Cerrahi posterior fossa kraniyotomisi / MVD tolere edemeyecek ASA III-IV hastalar)',
    'Multipl Skleroz (MS) Zemininde Gelişen Trigeminal Nevralji (MS plaklarına bağlı santral kök giriş lezyonlarında perkütan yöntemler birinci basamak cerrahi seçenektir)',
    'Mikrovasküler Dekompresyon (MVD) Cerrahisi Sonrası Ağrı Nüksü veya Başarısızlığı',
    'Açık Kraniyotomiyi Reddeden Kooperatif Hastalar',
    'V1 Oftalmik Dal Nevraljisinde Dikkatli RFT veya Gliserol (Korneal anestezi ve keratit riski nedeniyle özel değerlendirme gerektirir)'
  ],
  averageDuration: '45 - 90 dakika (Floroskopik açı ayarı ve pozisyonlama: 15-20 dk; Hartel tekniği ile kanülün foramen ovaleden Meckel mağarasına ilerletilmesi: 15-25 dk; Elektrofizyolojik stimülasyon haritalaması veya kontrastlı balon enflasyonu / gliserol uygulaması: 15-25 dk; İğnenin çekilmesi, yanak kompresyonu ve uyanma: 10-15 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 20 - 50 mL (Standart perkütan girişimde ihmal edilebilir cerrahi kan kaybı)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal / İhmal Edilebilir (Ancak Kafa Tabanı Majör Damar Yaralanması Riski Hayatidir)',
    crossMatchRequirement: 'Tip & Screen (T&S) kan grubu doğrulaması yeterlidir; rutin eritrosit süspansiyonu hazırlığı gerekmez',
    transfusionProbability: '< %1 (Son derece nadir)',
    criticalBleedingSources: [
      'A. Carotis Interna (Foramen ovalenin hemen medial ve derin komşuluğudur; iğnenin mediyale aşırı yönelmesi karotid ponksiyonu, psödoanevrizma veya Karotiko-Kavernöz Fistüle [CCF] yol açar)',
      'V. Jugularis Interna ve V. Emissaria (Foramen ovalenin posteriorunda ponksiyon riski)',
      'Pterigoid Venöz Pleksus ve Fasiyal Damarlar (Yanak yumuşak doku geçişinde hematom)',
      'Subdural / Subaraknoid İntrakraniyel Kanama (Kanülün kafa içine aşırı derin ilerletilmesi)'
    ],
    hemostasisStrategies: [
      'Floroskopi altında iğne derinliğinin milimetrik kontrolü (klivus çizgisi ve petröz apeks sınırları asla aşılmamalıdır)',
      'Karotid ponksiyon şüphesinde (kanülden pulsatil parlak kırmızı arteriyel kan gelişi) iğne derhal çekilmeli, yanak ve farenks arkasından en az 10-15 dakika kesintisiz dijital kompresyon uygulanmalıdır',
      'İşlem sonunda kanül çekildikten sonra yanak delinme noktasına 5 dakika manuel kompresyon'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Perkütan Radyofrekans (RFT) ve Gliserol İçin: Monitörize Anestezi Bakımı (MAC) + Hızlı Açılıp Kapanan Sedasyon (Ultra-kısa etkili Propofol + Remifentanil titrasyonu). Kanül geçişinde derin hipnoz -> Test uyarımında TAM UYANIK VE KOOPERE -> Termal lezyonlama anında DERİN HİPNOZ',
      'Perkütan Balon Mikrokompresyonu (PMC) İçin: Endotrakeal Genel Anestezi (GETA) veya Laringeal Maske (LMA) — Balon şişirilmesi son derece ağrılıdır ve masif trigeminokardiyak refleks yaratır; genel anestezi şarttır'
    ],
    alternative: [
      'Yüksek Riskli Yaşlı Olgularda: Deksmedetomidin infüzyonu eşliğinde MAC ve lokal mandibulomaksiller blok desteği'
    ],
    clinicalRationale: 'Perkütan RFT\'de 50 Hz duyusal test için hastanın hızla uyanıp kooperasyon kurabilmesi gerektiğinden spontan solunum altında (nazal O2 + EtCO2) ultra-kısa etkili Propofol + Remifentanil ile açılıp kapanan MAC tercih edilir. Balon mikrokompresyonu (PMC) ise dayanılmaz ağrı ve şiddetli trigeminokardiyak bradikardi/asistoli refleksi doğurduğundan LMA veya kontralateral ağız köşesine sabitlenen ETT ile genel anestezi zorunludur.',
    notes: 'TRİGEMİNAL PERKÜTAN GİRİŞİMLERDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) TRİGEMİNOKARDİYAK REFLEKS (TCR) ALARMI (MASİF BRADİKARDİ VE ASİSTOLİ!) — Foramen ovale kılıfı delinirken, Gasser ganglionu manipüle edilirken veya özellikle BALON ŞİŞİRİLİRKEN trigeminal afferentler (V1-V3) uyarılır ve beyin sapı vagal motor nükleus üzerinden ani, şiddetli bradikardi, hipotansiyon ve KARDİYAK ASİSTOLİ gelişir (vakaların %50-70\'inde görülür!). Eylem: Cerrah anında uyarılır, cerrahi manipülasyon / balon enflasyonu durdurulur; düzelmezse Atropin (0.5-1.0 mg IV) veya Glikopirolat uygulanır. Preoperatif masada atropin enjektöre çekili hazır olmalıdır! (2) RFT\'DE "UYUT-UYANDIR-UYUT" HASSAS SEDASYON YÖNETİMİ — Foramen ovale penetrasyonu ağrılıdır (hastaya propofol 0.5-1.0 mg/kg verilir). İğne yerine oturunca hasta tamamen uyandırılır; cerrah 50 Hz duyu uyarımı verdiğinde hastanın "karıncalanma tam ağrılı bölgede mi?" sorusuna net cevap vermesi, 2 Hz motor uyarımda ise masseter kas seğirmesi izlenmelidir. Tam hedef belirlenince 60-80 saniyelik 65-75°C termal lezyon oluşturulurken hasta TEKRAR DERİN UYUTULMALIDIR (lezyonlama uyanık hastada dayanılmaz ağrı yaratır!). (3) KORNEA REFLEKSİNİN KORUNMASI — V1 dalı lezyonlandığında korneal anestezi gelişir; kornea duyusu kaybolursa nörotrofik keratit, kornea ülseri ve körlük riski doğar. Termal lezyon öncesi ve sonrasında kornea refleksi steril pamukla kontrol edilmeli; V1 liflerinin aşırı koagülasyonundan kaçınılmalıdır. (4) İÇ KAROTİD ARTER (ICA) VE JUGULER BULB YARALANMASI — İğne kanülünden pulsatil arteriyel kan gelirse karotid arter delinmiştir. Kanül derhal aspire edilerek çekilmeli, yanak ve farenkse 15 dakika kompresyon yapılmalı, işlem ertelenmeli ve Karotiko-Kavernöz Fistül (CCF) takibi yapılmalıdır. (5) AMELİYAT SONRASI AKUT HİPERTANSİYON VE MASSETER GÜÇSÜZLÜĞÜ — Trigeminokardiyak refleks sonrasında reaktif sempatik deşarj ve ağrıya bağlı hipertansif kriz gelişebilir; postoperatif sistolik KB < 140 mmHg tutulmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji Konsültasyonu: Trigeminal nevraljinin etiyolojisi (Tip 1 klasik nörovasküler bası vs Tip 2 atipik nevralji vs Multipl Skleroza ikincil nevralji), tutulan trigeminal dallar (V1 oftalmik, V2 maksiller, V3 mandibular) ve tetik noktaları (trigger points) belgelenmelidir.',
      'Kardiyoloji Konsültasyonu: Trigeminokardiyak refleksin (asistoli, şiddetli bradikardi) yaratabileceği koroner iskemi ve hemodinamik riskler açısından değerlendirme; bazal EKG, ritim bozuklukları ve fonksiyonel kapasite analizi.',
      'Göz Hastalıkları Konsültasyonu: Özellikle V1 tutulumu olan veya V1 dalına yakın lezyonlama planlanan hastalarda bazal kornea duyusu ve görme keskinliği muayenesi.',
      'KBB / Ağız Diş Çene Cerrahisi: Ağız açıklığı kısıtlılığı, çene deformiteleri, temporomandibular eklem (TME) disfonksiyonu ve aktif intraoral/fasiyal enfeksiyon odağının dışlanması.'
    ],
    historyAndPhysical: [
      'Tetik Noktaları ve Ağrı Atağı Öyküsü: Dokunma, çiğneme, konuşma, traş olma veya rüzgarla tetiklenen şimşek çakar tarzda lancinating paroksizmal ağrı öyküsü.',
      'Kullanılan Antiepileptik ve Nöropatik Ağrı İlaçları: Karbamazepin, Okskarbazepin, Baklofen, Pregabalin, Gabapentin dozları ve yan etkileri (sedasyon, ataksi, hiponatremi, lökopeni).',
      'Kafa Tabanı Anatomisi ve Skolyoz/Boyun Sertliği: Floroskopide submental-verteks görüntüsü için boyun ekstansiyon toleransı incelenir.',
      'Zor Hava Yolu Taraması: Balon kompresyonu genel anestezi ile yapılacaksa yaşlı, dişsiz veya servikal spondilozlu hastalarda maske ventilasyonu ve laringoskopi zorluğu.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Karbamazepin kullanımına bağlı aplastik anemi, nötropeni ve lökopeni kontrolü).',
      'Serum Elektrolitleri: Özellikle Serum Sodyum düzeyi (Karbamazepin/Okskarbazepin SIADH benzeri hiponatremi yaratabilir).',
      'Koagülasyon Paneli: PT, aPTT, INR tam normal olmalıdır (kafa tabanı ve pterigoid pleksus hematomunu önlemek için).',
      '12 Derivasyonlu EKG (Bazal bradikardi, dal bloku veya AV iletim defekti varlığı).',
      'Kranyal MRG / Sisternografi (CISS / 3D-FIESTA sekansları): Foramen ovale çapı, trigeminal sinir kök girişi (REZ), kitle/tümör ve Multipl Skleroz demiyelinizan plaklarının incelenmesi.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (5 derivasyonlu — TCR asistolisini anında duymak için sesli QRS tonu açık olmalıdır), NIBP (1-2 dakikalık sık ölçüm modunda), SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Balon mikrokompresyonu uygulanan veya şiddetli kardiyovasküler hastalığı olan yaşlı olgularda ani bradikardi/hipotansiyon ve balon sonrasındaki hipertansif tepeyi saniye saniye izlemek için tercih edilir.',
      'Floroskopi (C-Kollu Skopi) Rehberliği: Foramen ovale ve kafa tabanı görüntüsü için submental-verteks ve lateral açılar; anestezi ekibi ve hasta tiroid koruyucu / kurşun önlükle korunur.',
      'Kornea Refleksi Takibi: V1 liflerinin korunmasını teyit etmek için lezyonlama öncesi ve sonrası steril spanç/pamuk ucu ile kornea refleksi kontrolü.',
      'Masseter Motor Seğirme Takibi: 2 Hz elektrik uyarımında mandibular motor dal uyarımı (çene seğirmesi) gözlenir.'
    ],
    vascularAccess: [
      'En az 1 adet geniş çaplı (16-18G) güvenli periferik intravenöz yol (üst ekstremitede, acil atropin ve efedrin puşeleri için kesintisiz açık tutulmalıdır)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Boyun Hafif Ekstansiyonda, Baş Floroskopi Altında Nötral',
    patientPositionDetails: [
      'Hartel tekniğinde foramen ovalenin submental-verteks floroskopik eksende görüntülenebilmesi için baş hafif ekstansiyona getirilir.',
      'Ağız köşesi, tragusun 3 cm anterioru ve pupilla hattı işaretlenir (Hartel üçgeni koordinatları).',
      'Gözler şeffaf koruyucu göz bandı (Tegaderm) ile kapatılır; kornea abrazyonu ve işlem esnasında gözün uyarılması engellenir.',
      'Hastanın omuz altına hafif destek konularak göğüs rahatlatılır.'
    ],
    anesthesiaManagement: [
      'Radyofrekans Termokoagülasyon (RFT) Sedasyon Protokolü:',
      '  - Giriş Fazı: Hartel iğnesi yanak derisinden foramen ovaleye doğru ilerletilirken ağrıyı kesmek için Propofol (0.5-1.0 mg/kg IV) + Fentanil/Remifentanil titre edilir.',
      '  - İğne foramen ovaleyi geçip Meckel mağarasına ulaştığında propofol kesilir, hasta tamamen uyandırılır.',
      '  - Stimülasyon Fazı: 50 Hz (0.1-0.5 V) duyu uyarımı verilir; hasta tam uyanıkken parestezinin nevralji ağrısının olduğu sahada (V2 üst çene/yanak, V3 alt çene) hissedildiğini cerraha bildirir. 2 Hz motor uyarımda çene seğirmesi kontrol edilir.',
      '  - Lezyonlama Fazı: Hedef elektrot pozisyonu teyit edildiğinde hasta TEKRAR DERİN SEDASYONA alınır (Propofol 1-1.5 mg/kg bolus). Cerrah 65-75°C\'de 60-90 saniye termal lezyon oluşturur.',
      'Balon Mikrokompresyonu (PMC) Genel Anestezi Protokolü:',
      '  - GETA veya LMA ile genel anestezi indüksiyonu: Propofol + Remifentanil + Rokuronyum/Kürarsız idame.',
      '  - Balon Enflasyonu Sırasında Akut Müdahale: Fogarty balonu şişirilirken şiddetli trigeminokardiyak refleks oluşur; balon şişirilmeden önce IV Atropin (0.5 mg) profilaktik uygulanabilir.',
      'Trigeminokardiyak Refleks (TCR) Kriz Yönetimi:',
      '  - Foramen ovale penetrasyonu veya balon şişirilmesiyle ani nabız düşüşü (< 40/dk) veya asistoli geliştiğinde:',
      '    1. Cerraha sesli "ASİSTOLİ / BRADİKARDİ — MANİPÜLASYONU DURDUR!" uyarısı verilir.',
      '    2. Cerrah balonu derhal indirir veya iğne traksiyonunu bırakır.',
      '    3. IV Atropin (0.5-1.0 mg bolus) uygulanır; gerekirse Efedrin (5-10 mg) veya Adrenalin (10-20 mcg) titre edilir.'
    ],
    airwayManagement: [
      'MAC / Sedasyon Olgularında: Nazal kanül veya nazal yüksek akımlı oksijen; spontan solunum korunur. Foramen ovale ponksiyonu esnasında hastanın ani baş hareketi yapmaması için anestezi derinliği ile solunum dengesi hassas yönetilir.',
      'Genel Anestezi (PMC) Olgularında: Standart endotrakeal tüp veya supraglottik hava yolu (LMA); tüp kontralateral ağız köşesine tespit edilir (ipsilateral yanak steril cerrahi sahadır).'
    ],
    criticalSurgicalStages: [
      '1. Submental-Verteks ve Oblik Floroskopi İle Foramen Ovalenin Netleştirilmesi.',
      '2. Hartel Noktasından (Ağız köşesinin 2.5-3 cm lateralinden) Kanülün Girilmesi.',
      '3. Kanülün Foramen Ovale Ağzına İlerletilmesi ve Kafa Tabanının Geçilmesi (TCR bradikardi riski!).',
      '4. Meckel Mağarasında BOS Akışının Doğrulanması (Retrogasserian trigeminal sistern penetrasyonu).',
      '5. RFT İçin Elektrofizyolojik Duyu/Motor Stimülasyonu ve Termal Koagülasyon (60-80 saniye).',
      '6. PMC İçin Fogarty Balonunun Kontrast Maddeyle Şişirilmesi ("Armut" Şeklinin Skopiyle Doğrulanması, 1-3 dakika kompresyon).',
      '7. Gliserol İçin Sisternografik Kontrast Teyidi ve 0.15-0.35 mL Anhidr Gliserolün Yavaşça Enjeksiyonu.',
      '8. Kanülün Çekilmesi ve Yanak Ponksiyon Hattına 5-10 Dakika Manuel Kompresyon.'
    ],
    emergenceNotes: [
      'Postoperatif Sempatik Deşarj ve Hipertansiyon: Trigeminal ganglion manipülasyonu sonrası hastada ani kan basıncı fırlaması (sistolik KB > 160-180 mmHg) görülebilir. Labetalol (5-10 mg IV) veya Esmolol ile regüle edilir.',
      'Korneal Refleks Kontrolü: Hasta uyanır uyanmaz ipsilateral kornea duyusu pamukla kontrol edilir; duyu kaybı varsa yapay gözyaşı damlası damlatılır ve göz şeffaf nem odası ile kapatılır.',
      'Çiğneme Fonksiyonu ve Yanak Hematomu: Masseter kas tonusu ve ağız içi/yanak hematomu değerlendirilir.',
      'Ağrının Durumu: Hasta ameliyat masasında iken paroksizmal elektrik çarpması ağrısının kaybolduğu doğrulanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - İşlem sonrası trigeminal nevraljinin şimşek çakar tarzı ağrısı anında kesilir; geriye kalan yanak ponksiyon yeri ağrısı ve künt disestezi hafiftir.',
      '  - Düzenli Oral / IV Parasetamol (1000 mg).',
      '  - Gerekirse oral NSAİİ (İbuprofen 400 mg veya Deksketoprofen 25-50 mg).',
      '  - Postoperatif Disestezi veya "Anesthesia Dolorosa" Yönetimi: Nadiren gelişebilecek kalıcı yanıcı disestezik ağrılar için düşük doz Gabapentin veya Pregabalin başlanabilir.',
      '  - Preoperatif kullanılan yüksek doz Karbamazepin/Okskarbazepin aniden KESİLMEMELİ; 1-2 hafta içinde kademeli olarak azaltılarak kesilmelidir (ani kesilme yoksunluk nöbetlerine yol açabilir!).'
    ],
    prospectRecommendations: [
      'Perkütan kafa tabanı girişimlerinde sistemik parasetamol ve selektif NSAİİ kullanımı cerrahi alan ağrısını kontrol etmede yeterlidir; güçlü opioid kullanımına ihtiyaç duyulmaz.'
    ],
    erasRecommendations: [
      'ERAS ve EAN Trigeminal Girişim Kılavuzları:',
      '  - Kornea Koruma Protokolü: Kornea refleksi zayıflamış veya kaybolmuş hastalarda günde 4-6 kez prezervansız suni gözyaşı damlası, gece koruyucu oftalmik pomad ve dış ortamda koruyucu rüzgar gözlüğü kullanımı reçete edilir.',
      '  - Çiğneme Eğitimi: V3 mandibular motor lif hasarına bağlı geçici masseter zayıflığında hastaya gıdaları kontralateral (sağlam) tarafla çiğnemesi ve sıcak/sert gıdalardan kaçınması tembihlenir.',
      '  - Günübirlik veya 1 Gece Yatış: Kanama, hematom ve hemodinamik instabilite görülmeyen olgular 4-6 saatlik derlenme takibi sonrası aynı gün taburcu edilebilir.',
      '  - Erken Oral Beslenme ve 2. Saatte Mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Percutaneous Procedures for Trigeminal Neuralgia, pp. 502-506. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Cruccu, G., et al. (2019). European Academy of Neurology (EAN) Guidelines on Trigeminal Neuralgia Management. European Journal of Neurology, 26(6), 831-845.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain and Anesthetic Management in Minor Craniofacial and Percutaneous Procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Sweet, W. H., & Wepsic, J. G. (1974). Controlled thermocoagulation of trigeminal ganglion and rootlets for differential destruction of pain fibers: 1. Trigeminal neuralgia. Journal of Neurosurgery, 40(2), 143-156.',
      'Mullan, S., & Lichtor, T. (1983). Percutaneous microcompression of the trigeminal ganglion for trigeminal neuralgia. Journal of Neurosurgery, 59(6), 1007-1012.',
      'Gharabaghi, A., et al. (2006). The trigeminocardiac reflex: a comprehensive review of literature and clinical implications. World Neurosurgery / Acta Neurochirurgica.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Considerations for Percutaneous Trigeminal Rhizotomy and Balloon Compression.'
    ]
  }
};
