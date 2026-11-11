import { ProcedureDefinition } from '../../types/procedures';

/**
 * Zenker Divertikülektomisi ve Krikofaringeal Miyotomi (Zenker's Diverticulectomy)
 * 
 * Jaffe (5th ed., Section V: Otolaryngology - Pharynx and Upper Esophagus: Zenker's Diverticulectomy & Endoscopic Diverticulotomy, pp. 793-798),
 * American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS),
 * Society for Head and Neck Anesthesia (SHNA) & Difficult Airway Society (DAS),
 * European Society of Gastrointestinal Endoscopy (ESGE) & British Association of Otorhinolaryngologists (ENT UK),
 * Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) referans alınarak hazırlanmıştır.
 */
export const zenkersDiverticulectomy: ProcedureDefinition = {
  id: 'zenkers-diverticulectomy',
  name: 'Zenker Divertikülektomisi ve Krikofaringeal Miyotomi: Açık Servikal ve Endoskopik Stapler Yöntemleri',
  shortCode: 'KBB-ZENKER',
  specialty: 'kbb',
  specialtyName: 'Kulak Burun Boğaz',
  categoryTag: 'Laringoloji & Faringoözofageal Cerrahi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Zenker divertikülü (faringoözofageal psödodivertikül), inferior faringeal konstriktör kasın tirofaringeus ve krikofaringeus lifleri arasındaki anatomik zayıf alandan (Killian üçgeni) hipofarenks mukoza ve submukozasının arkaya ve sola doğru fıtıklaşmasıdır. Krikofaringeal kasın hipertonisitesi ve relaksasyon kusuru patofizyolojinin temelidir. Cerrahi iki temel yöntemle uygulanır: (1) Endoskopik Transoral Yaklaşım (Dohlman / Weerda Divertiküloskopisi): Çift bıçaklı rijit divertiküloskop yerleştirilip divertikül ile özofagus arasındaki ortak septum endoskopik stapler (lineer zımba), CO2 lazer veya elektrokoter ile bölünür (krikofaringeal miyotomi sağlanır); (2) Açık Transservikal Yaklaşım: Sol boyun insizyonuyla karotis kılıfı laterale, tiroid/larinks mediyale ekarte edilir; divertikül kesesi disseke edilip stapler veya sütür ligasyonla rezeke edilir ve krikofaringeal kas lifleri cerrahi olarak kesilir (açık miyotomi). Anestezi açısından en büyük tehlike; kesede birikmiş bayat gıdaların indüksiyonda masif pulmoner aspirasyonu ve ince divertikül duvarının kör girişimlerle yırtılarak ölümcül akut mediastinite yol açmasıdır.',
  indications: [
    'Semptomatik Zenker Divertikülü Varlığı (Progresif orofaringeal disfaji, katı ve sıvı gıdaları yutamama)',
    'Regürjitasyon: Ağızda sindirilmemiş, kokuşmuş eski gıda artıklarının boğaza ve ağza geri gelmesi',
    'Kronik Noktürnal Aspirasyon, Gece Öksürük Nöbetleri ve Tekrarlayan Aspirasyon Pnömonisi Atakları',
    'Ağız Kokusu (Halitozis), Boyunda Guruldama Hissi (Borborygmi) ve Yutma Esnasında Boyunda Şişlik Oluşması',
    'Ciddi Kilo Kaybı, Malnütrisyon ve Divertiküle Bağlı Özofagus Lümen Basısı'
  ],
  averageDuration: '45 - 90 dakika (Endoskopik transoral stapler divertikülotomi: 30-50 dk; Açık transservikal divertikülektomi + miyotomi: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '20 - 80 mL (Endoskopik stapler girişiminde kanama ihmal edilebilir düzeydedir; açık transservikal disseksiyonda inferior tiroid damarları ve faringeal venöz pleksuslardan hafif-orta sızıntılar görülebilir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal - Düşük Risk / Ancak Derin Boyun ve Mediasten Komşuluğu Nedeniyle Titiz Hemostaz Şarttır',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S opsiyonel; ileri yaş ve anemik olgularda kan grubu bilinmelidir)',
    transfusionProbability: '< %1 (Eritrosit transfüzyonu gereksinimi son derece nadirdir)',
    criticalBleedingSources: [
      'İnferior Tiroid Arteri dalları ve Faringeal Venöz Pleksus (Açık servikal disseksiyonda)',
      'İnternal Juguler Ven ve Karotis Arter Kılıfı komşuluğu (Retraksiyon travması)',
      'Septum mukozasındaki submukozal mikrovasküler damarlar (Endoskopik zımbalama hattı kanamaları)'
    ],
    hemostasisStrategies: [
      'Bipolar koter, ultrasonik dissektör (Harmonic) veya ince damar mühürleyici kullanımı',
      'Endoskopik zımbalama hattına hemostatik klips (endoklips) veya topikal hemostatik ajan uygulanması',
      'Açık cerrahide tiroid pediküllerinin titiz ligasyonu ve cerrahi dren (hemovac / jackson-pratt) yerleştirilmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) + İndüksiyonda Baş-Yukarı (Reverse Trendelenburg) Pozisyon + Videolaringoskopi Eşliğinde Kaflı Entübasyon — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Uyanık Fleksibl Fiberoptik Entübasyon (AFOI): Masif kese varlığında, aspirasyon riski çok yüksek veya zor hava yolu anatomisi olan olgularda (aspirasyon ve kör ilerletme travması riskine karşı aşırı dikkatli olunmalıdır)',
      'Lokal / Rejyonel Anestezi (Yüzeyel Servikal Pleksus Bloğu + Sedasyon): Yalnızca genel anesteziyi kaldıramayacak çok düşkün, açık cerrahi planlanan hastalarda nadiren uygulanır'
    ],
    rulesTitle: 'ZENKER DİVERTİKÜLEKTOMİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'RETANSUYONDAKİ GIDA İÇERİĞİNE BAĞLI MASİF ASPİRASYON TEHLİKESİ VE "KLASİK KRİKOİD BASININ (SELLİCK) YASAKLANMASI" KURALI',
        content: 'Zenker divertikülü günlerce beklemiş bayat gıda ve yoğun pürülan sekresyonla doludur. Klasik hızlı seri indüksiyonda (RSI) krikoid kıkırdağa baskı yapılması (Sellick manevrası) KESİNLİKLE KONTRAENDİKEDİR! Krikoid kıkırdak arkasındaki ince duvarlı divertikül kesesini ezerek yırtabilir veya kese içeriğini doğrudan orofarenkse ve laringeal açıklığa boşaltarak katastrofik aspirasyona yol açar. Hasta ameliyat masasındayken öksürterek veya oturur pozisyonda başını öne eğerek keseyi kendi kendine boşaltması istenir; indüksiyon mutlaka baş-yukarı (30-45° Reverse Trendelenburg) pozisyonunda ve iki adet çalışan güçlü aspiratör hazır tutularak gerçekleştirilir.'
      },
      {
        number: 2,
        title: 'KÖRLEMESİNE ASPİRASYON KATETERİ, BUJİ VEYA TÜP İLERLETME YASAĞI — DİVERTİKÜL PERFORASYONU VE MEDİASTİNİT ALARMI',
        content: 'Divertikül duvarı fasyasız, yalnızca ince bir mukoza-submukoza tabakasından ibarettir. Ağızdan körlemesine sokulan aspiratör ucu, plastik buji (bougie), endotrakeal tüp, ısı probu veya nazogastrik tüp yerçekimi ve açılanma nedeniyle doğal olarak özofagus yerine divertikül kesesinin tabanına yönelir! En ufak körleme itiş divertikülü anında deler (iyatrojenik perforasyon) ve retrofaringeal/prevertebral alana girerek FATAL AKUT MEDİASTİNİTE ve sepsis şokuna yol açar. Tüm hava yolu girişimi, tüp yerleşimi ve nazik aspirasyon manevraları VİDEOLARİNGOSKOP VEYA FİBEROPTİK EŞLİĞİNDE DOĞRUDAN GÖRÜŞ ALTINDA yapılmalıdır.'
      },
      {
        number: 3,
        title: 'ENDOSKOPİK YAKLAŞIMDA (WEERDA SKOPU) TOF 0/4 DERİN NÖROMUSKÜLER BLOKAJ VE SIFIR HAREKET DİSİPLİNİ',
        content: 'Transoral endoskopik stapler divertikülotomide rijit, ağır ve çift lümenli Weerda divertiküloskopu posterior farenkse sokulur; bir bıçağı özofagusa, diğer bıçağı divertikül lümenine oturtularak krikofaringeal septum gerilir. Cerrahi kilitlenme esnasında hastanın aniden ıkınması, öksürmesi veya diyafram hareketi rijit metal skopun posterior özofagus veya divertikül tabanını yırtmasına neden olur! Endoskopik girişim boyunca TOF 0/4 tam nöromusküler blokaj sürdürülmeli; TIVA (Propofol + Remifentanil) ile derin anestezi sağlanmalıdır.'
      },
      {
        number: 4,
        title: 'AÇIK SERVİKAL YAKLAŞIMDA KAROTİS SİNÜS REFLEKSİ VE REKÜRREN LARİNGEAL SİNİR (RLN) GÜVENLİĞİ',
        content: 'Açık sol servikal insizyonda cerrah divertiküle ulaşmak için karotis kılıfını (karotis arteri ve internal juguler ven) laterale çeker. Bu retraksiyon karotis sinüsünü uyararak aniden şiddetli bradikardi, hipotansiyon ve asistoliye (karotis sinüs refleksi) yol açabilir; cerrah uyarılmalı, traksiyon gevşetilmeli veya karotis bifürkasyonuna lokal anestezik infiltre edilmelidir. Ayrıca krikofaringeal miyotomi ve divertikül boynunun disseksiyonunda trakeoözofageal oluktaki Rekürren Laringeal Sinir (RLN) zedelenme riski altındadır; cerrah RLN monitörizasyonu (NIM EMG tüpü) kullanacaksa indüksiyon sonrası kas gevşetici verilmemelidir.'
      },
      {
        number: 5,
        title: 'POSTOPERATİF CERRAHİ AMFİZEM, MEDİASTİNİT VE PNÖMOTORAKS ALARMI İLE UYANIK EKSTÜBASYON',
        content: 'Divertikül cerrahisinin en korkulan erken komplikasyonu stapler hattından veya miyotomi tabanından mikro-perforasyon ve hava/salya kaçağıdır. Ameliyat bitiminde ve derlenmede hastanın boynu, klavikula üstü ve göğüs duvarı palpasyonla cilt altı amfizem (krepitasyon) açısından kontrol edilmelidir; taşikardi, retrosternal ağrı, nefes darlığı veya boyun şişliği acil grafi ve cerrahi eksplorasyon gerektirir. Ekstübasyon hasta ameliyathanede tam uyanık, başı yüksekte, farenksteki kan ve sekresyonlar nazikçe temizlenmiş ve koruyucu hava yolu refleksleri (yutkunma/öğürme) tamamen geri dönmüş olarak yapılmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'KBB / Baş-Boyun Cerrahisi Konsültasyonu: Divertikülün boyutu (Barium özofagogram ölçümü), planlanan cerrahi yöntem (endoskopik stapler vs açık transservikal krikofaringeal miyotomi).',
      'Gastroenteroloji / Radyoloji: Baryumlu Özofagus Grafisi (Barium Swallow): Kesenin tam derinliği, servikal miyotomi seviyesi ve olası malignite (divertikül içi karsinom) taraması.',
      'Göğüs Hastalıkları Konsültasyonu: Tekrarlayan aspirasyon öyküsü olan ileri yaş hastalarda kronik akciğer hasarı, aspirasyon pnömonisi sekeli ve KOAH optimizasyonu.',
      'Kardiyoloji Konsültasyonu: İleri yaş popülasyonda koroner arter hastalığı, hipertansiyon ve aritmi değerlendirmesi.'
    ],
    historyAndPhysical: [
      'Disfaji ve Regürjitasyonun Şiddeti: Katı gıdalarda takılma, geceleri yastığa sindirilmemiş gıda gelmesi öyküsü.',
      'Son Gıda Alımı Zamanı: Divertikül kesesi nedeniyle hasta 8-12 saat aç olsa dahi kese içinde günler öncesine ait gıda bulunabileceği unutulmamalıdır!',
      'Boyun Muayenesi: Sol servikal bölgede kitle, kıkırdak hassasiyeti, palpasyonla krepitasyon veya guruldama (Boyce belirtisi).',
      'Ağız ve Diş Muayenesi: Rijit divertiküloskop uygulaması için kesici dişlerin durumu ve çene açılma mesafesi.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Lökosit) ve Trombosit Sayımı.',
      'Serum Elektrolitleri, BUN, Kreatinin ve Albumin (Kronik disfajiye bağlı dehidratasyon ve malnütrisyon değerlendirmesi).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi (Aspirasyon infiltrasyonu ve atelektazi kontrolü).',
      'Baryumlu Özofagogram (Preoperatif kesenin boyutunu ve Killian üçgeni açısını gösteren altın standart görüntüleme).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart Monitörizasyon: 5 derivasyonlu EKG (Karotis basısına bağlı aritmi ve ST değişiklikleri takibi), NIBP, SpO2, EtCO2 ve Vücut Sıcaklığı.',
      'Sürekli İnvaziv Arter Basıncı (Gereğinde): İleri kardiyovasküler komorbiditesi olan yaşlı olgularda veya açık cerrahide ani hemodinamik dalgalanmaları izlemek için.',
      'Nöromusküler İleti Monitörizasyonu (TOF): Endoskopik teknikte hasta hareketsizliği için TOF 0/4 derin blokaj takibi.',
      'NIM (Nerve Integrity Monitor) EMG Monitörizasyonu: Açık cerrahide RLN korunması için EMG elektrotlu endotrakeal tüp kullanılıyorsa sinir stimülatörü kurulumu.'
    ],
    vascularAccess: [
      'En az 1-2 adet güvenli periferik intravenöz damar yolu (18G veya 20G)',
      'Açık cerrahi sol boyundan yapılacağından damar yolları sağ koldan tercih edilir',
      'Acil Bradikardi Kiti: Karotis sinüs refleksi için masada hazır İV Atropin (0.5 mg ampul)',
      'Acil Vazoaktif Ajanlar: İV Efedrin ve Fenilefrin bolusları'
    ],
    patientPosition: 'İndüksiyonda Baş-Yukarı (Reverse Trendelenburg 30-45°), İntraoperatif Dönemde Supin Pozisyon, Boyun Hafif Ekstansiyonda',
    patientPositionDetails: [
      'İndüksiyon esnasında yerçekimiyle regürjitasyonu önlemek için ameliyat masasına 30-45° baş-yukarı eğim verilir.',
      'Entübasyon tamamlanıp tüp kafı şişirildikten sonra masa supin düzleme getirilir.',
      'Açık cerrahide omuzların altına silikon rulo konularak boyun hafif ekstansiyona ve baş hafif sağa çevrilir (sol servikal açılım için).',
      'Endoskopik yöntemde baş atlanto-oksipital eklemden hafif ekstansiyona getirilir; üst dişleri korumak için kalın diş koruyucu (dental guard) yerleştirilir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Aspirasyon Önlemi:',
      '  - Hasta ameliyathaneye alındığında keseyi öksürerek boşaltması istenir.',
      '  - 3-5 dakika %100 O2 ile preoksijenizasyon yapılırken masa 30-45° baş-yukarı eğimde tutulur.',
      '  - İndüksiyon: Propofol (1.5 - 2.0 mg/kg) + Fentanil (1.5 - 2 mcg/kg) veya Remifentanil infüzyonu.',
      '  - Nöromusküler Blokaj: Hızlı relaksasyon için Rokuronyum (0.6 - 1.0 mg/kg) veya Sugammadeks hazırlığı.',
      '  - KRİKOİD BASI UYGULANMAZ (keseyi delme ve lümene boşaltma riski!).',
      'Entübasyon:',
      '  - Videolaringoskop (GlideScope / C-MAC) eşliğinde doğrudan görüş altında kaflı endotrakeal tüp nazikçe trakeaya ilerletilir.',
      '  - Körleme buji veya kateter ilerletilmez; tüp kafı şişirilir ve EtCO2 dalgası doğrulanır.',
      'İdame:',
      '  - TIVA (Propofol + Remifentanil) veya Düşük Akımlı İnhalasyon Anestezisi (Sevofluran / Desfluran).',
      '  - Endoskopik Weerda skopu aşamasında TOF 0/4 tam kas gevşemesi sürdürülür.',
      '  - Açık cerrahide karotis kılıfı ekarte edilirken bradikardi gelişirse cerraha uyarı verilir ve gerekirse İV Atropin uygulanır.'
    ],
    airwayManagement: [
      'Tüp Ağız Köşesine Sağ Tarafa Tespit Edilir: Cerrah transoral endoskopu orta hattan veya sol taraftan sokacağı için hava yolu tüpü sağ komissüre sabitlenir.',
      'Körleme Nazogastrik Tüp (NGT) Takılması KESİNLİKLE YASAKTIR: Cerrahi sahada gerekirse cerrah NGT\'yi açık lümeni veya divertiküloskopu görerek bizzat yönlendirir.',
      'Ventilatör mekanik basınçları rijit skop yerleştirildiğinde tepe basınç artışı (Ppeak) açısından kontrol edilir.'
    ],
    criticalSurgicalStages: [
      '1. Baş-Yukarı Pozisyonda Aspirasyonsuz Nazik İndüksiyon ve Videolaringoskop ile Kaflı Entübasyon.',
      '2. Üst Diş Koruyucunun Yerleştirilmesi ve Weerda Divertiküloskopunun Transoral İlerletilmesi (Endoskopik Yöntem).',
      '3. Veya Sol Servikal İnsizyon, Platisma Kesisi ve Karotis Kılıfının Laterale Ekarte Edilmesi (Açık Yöntem).',
      '4. Krikofaringeal Kası İçeren Ortak Septumun Görülmesi ve Endoskopik Lineer Stapler ile Kesilerek Zımbalanması.',
      '5. Açık Yöntemde Divertikül Kesesinin Serbestleştirilmesi, Boynunun Klemplenmesi ve Kesilerek Çıkarılması.',
      '6. Krikofaringeal Kas Liflerinin Tam Miyotomisinin Gerçekleştirilmesi (Reflü ve darlık önlemi).',
      '7. Hemostaz Kontrolü ve Mukozal Bütünlük Testi (Metilen mavisi veya hava kaçağı testiyle perforasyon ekarte edilmesi).',
      '8. Açık Cerrahide Cerrahi Drenin (Hemovac) Yerleştirilmesi ve Anatomik Kapatma.',
      '9. Derin Nöromusküler Bloğun Sugammadeks ile Tam Geri Döndürülmesi ve Pürüzsüz Uyanma.'
    ],
    emergenceNotes: [
      'Sugammadeks (2 - 4 mg/kg) ile nöromusküler blokaj eksiksiz geri döndürülür (TOF oranı > %90 teyit edilir).',
      'Farenksteki sekresyonlar sadece DOĞRUDAN GÖRÜŞ ALTINDA nazikçe aspire edilir; ameliyat hattına körleme kateter sokulmaz.',
      'Öksürük ve Ikınmayı Önleme: Servikal sütür hattı ve stapler gerilimini engellemek için İV Lidokain (1.5 mg/kg) uygulanır.',
      'Ekstübasyon Öncesi Kontrol: Boyunda ve göğüs duvarında cilt altı amfizem (krepitasyon) olmadığı doğrulanır.',
      'Hasta ameliyathanede tam uyanık, başı 30-45° yüksekte, koruyucu hava yolu refleksleri tam olarak ekstübe edilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Endoskopik girişim sonrası boğazda batma, yabancı cisim hissi ve hafif odinofaji beklenir; açık cerrahide sol boyun ağrısı mevcuttur.',
      'İntravenöz Parasetamol (1000 mg her 6 saatte bir) bazal analjezik olarak uygulanır.',
      'Gereğinde İV Tramadol (50 mg) veya hafif doz NSAİİ (kanama riski kontrol edilerek).',
      'İlk 24-48 saat oral alım kısıtlanacağından tüm analjezikler parenteral yoldan verilmelidir.'
    ],
    prospectRecommendations: [
      'PROSPECT Faringeal ve Üst Özofagus Cerrahisi Önerileri:',
      'Cerrahi bölge enfeksiyonu ve mediastiniti önlemek için ameliyattan 30-60 dk önce başlanan profilaktik antibiyotik 24 saat sürdürülmelidir.',
      'Postoperatif bulantı ve kusmanın (PONV) agresif önlenmesi (Deksametazon + Ondansetron); kusma anında intralüminal basınç artışı stapler hattını açabilir!',
      'Yeterli sedoanaljezi ve yumuşak boyun immobilizasyonu sağlanmalıdır.'
    ],
    erasRecommendations: [
      'ERAS ve KBB / Baş-Boyun Protokolleri:',
      'Oral Alım Protokolü: Endoskopik stapler olgularında genellikle 24 saat sonra berrak sıvılar başlanır; açık divertikülektomide 48-72 saat sonra kontrastlı pasaj grafisi (Gastrografin Swallow) ile kaçak olmadığı kanıtlandıktan sonra oral beslenmeye geçilir.',
      'Erken Mobilizasyon: Ameliyat sonrası 4-6. saatte hastanın mobilize edilmesi pulmoner komplikasyonları önler.',
      'Cerrahi Kaçak ve Amfizem İzlemi: Ateş, lökositoz, taşikardi, boyunda krepitasyon veya göğüs ağrısı derhal hekime bildirilmelidir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section V: Otolaryngology - Pharynx and Upper Esophagus: Zenker\'s Diverticulectomy & Endoscopic Diverticulotomy, pp. 793-798.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society: Consensus Guidelines for Perioperative Care in Pharyngeal and Esophageal Surgery.',
    prospectReference: 'PROSPECT Guidelines: Pain and Airway Management after Transoral and Transcervical Pharyngeal Procedures.',
    otherReferences: [
      'American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS): Clinical Guidelines for the Diagnosis and Management of Zenker\'s Diverticulum.',
      'Society for Head and Neck Anesthesia (SHNA) & Difficult Airway Society (DAS): Consensus on Anesthetic Management and Aspiration Risks in Pharyngoesophageal Diverticula.',
      'European Society of Gastrointestinal Endoscopy (ESGE) & British Association of Otorhinolaryngologists (ENT UK): Endoscopic vs Open Diverticulotomy Guidelines.',
      'Miller\'s Anesthesia, 9th Edition. Chapter 66: Anesthesia for Head and Neck Surgery & Aspiration Prophylaxis.',
      'Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC): Faringoözofageal Hastalıklar ve Zenker Divertikülü Tedavi Rehberi.'
    ]
  }
};
