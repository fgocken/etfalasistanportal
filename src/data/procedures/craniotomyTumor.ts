import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kraniyotomi: Supratentoryal Beyin Tümörü Rezeksiyonu (Gliom, Menenjiyom ve Metastaz Cerrahisi)
 * (Craniotomy for Supratentorial Neoplasm / Brain Tumor Resection)
 * 
 * Jaffe (6th ed., 2020), SNACC, ERAS Craniotomy (Hagan et al., J Clin Neurosci 2016),
 * PROSPECT Craniotomy 2023 (Mestdagh et al.), AAN/EANO/CNS Seizure Prophylaxis Guidelines
 * ve WHO 2021 SSS Tümörleri rehberleri referans alınarak yapılandırılmıştır.
 */
export const craniotomyTumor: ProcedureDefinition = {
  id: 'craniotomy-tumor',
  name: 'Kraniyotomi: Supratentoryal Beyin Tümörü Rezeksiyonu (Gliom, Menenjiyom ve Metastaz Cerrahisi)',
  shortCode: 'KRANİO-TÜMÖR',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Nöroonkolojik Cerrahi',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Supratentoryal kompartmanda (frontal, temporal, parietal, oksipital loblar veya kafa kaidesi konveksiteleri) yerleşimli primer parankimal (yüksek/düşük dereceli gliomlar, glioblastoma multiforme, oligodendrogliom), ekstra-aksiyel (menenjiyomlar) veya sekonder (beyin metastazları) tümöral kitlelerin; nöronavigasyon, cerrahi mikroskop, ultrasonik aspiratör (CUSA) ve intraoperatif nöromonitörizasyon (İONM) kılavuzluğunda kraniyotomi yapılarak çevre fonksiyonel nöronal doku korunup maksimum güvenli sınırda rezeke edilmesi (sitoredüksiyon / total eksizyon) ameliyatıdır.',
  indications: [
    'Yüksek Dereceli Malign Gliomlar (Glioblastoma Multiforme - GBM / Anaplastik Astrositom): Kitle etkisi, perifokal vazojenik ödem, orta hat şifti ve fokal nörolojik defisit yaratan primer parankimal malignitelerin dekompresyonu ve sitoredüksiyonu',
    'Düşük Dereceli Gliomlar (Evre II Astrositom / Oligodendrogliom): Genç hastalarda intraktabl epilepsi veya nörolojik kayba yol açan lezyonların fonksiyonel koruma ile cerrahi eksizyonu',
    'Semptomatik ve İntrakraniyel Menenjiyomlar: Konveksite, parasagittal, falks veya sfenoid kanat yerleşimli, dural invazyon ve venöz sinüs komşuluğu gösteren iyi huylu/atipik ekstra-aksiyel kitleler',
    'Soliter veya Oligometastatik Beyin Metastazları (Akciğer, Meme, Renal, Melanom): Sistemik hastalığı kontrol altında olan, kitle etkisi ve KİBAS yaratan sekonder serebral lezyonların küratif/palyatif rezeksiyonu',
    'Medikal Tedaviye Dirençli Tümöral Epilepsi ve Kafa İçi Basınç Artışı Sendromu (KİBAS): Fıtıklaşma (uncal/subfalcine herniasyon) tehdidi oluşturan intrakraniyel kitleler'
  ],
  averageDuration: '3.5 - 6.5 saat (Anestezi indüksiyonu, invaziv A-line, İONM elektrotlarının yerleşimi, nöronavigasyon eşleştirmesi ve Mayfield çivili başlık tespiti: 50-70 dk; Cilt flebi, kraniyotomi kemik penceresi açılışı ve dural açılış: 45-60 dk; Mikroskopik tümör debulking, CUSA ile kitle içi eksizyon ve sınır diseksiyonu: 90-180 dk; Rezeksiyon loju hemostazı, Valsalva manevrası, dural rekonstrüksiyon, kemik flebin mini-plaklarla fiksasyonu ve cilt kapanışı: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '200 - 800 mL (Standart intraparenkimal gliom ve metastaz rezeksiyonunda düşük-orta kanama; ancak zengin vaskülarize büyük menenjiyomlarda, dural venöz sinüs invazyonu olan kitlelerde veya glioblastomun derin besleyici damarlarında kan kaybı 1200 - 2500+ mL masif kanamaya dönüşebilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Menenjiyom ve Sinüs İnvazyonunda Potansiyel Masif Kanama & VAE',
    crossMatchRequirement: 'En az 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalı, T&S doğrulanmalıdır; dural sinüs komşuluğu olan veya preop embolize edilmemiş dev menenjiyomlarda 4 Ünite ES ve 2 Ünite TDP hazır tutulmalıdır',
    transfusionProbability: '%20 - %40 (Derin gliom ve vasküler menenjiyomlarda %40-60; küçük periferik metastazlarda %10-15)',
    criticalBleedingSources: [
      'Tümör Yatağı Neovaskülarizasyonu ve Kırılgan Tümöral Damarlar (özellikle Glioblastoma ve renal hücreli karsinom metastazlarında)',
      'Dural Venöz Sinüs Laserasyonu: Sinüs Sagittalis Superior (SSS) veya Sinüs Transversus komşuluğundaki parasagittal menenjiyomların diseksiyonunda yüksek debili venöz kanama ve FATAL VENÖZ HAVA EMBOLİSİ (VAE) riski',
      'Kemik Diploe Kanalları ve Skalp Flebi: Kraniyotomi kenarlarındaki emissary venler ve zengin skalp arterleri (A. temporalis superficialis dalları)',
      'A. Meningea Media Dalları: Dural flep kaldırılırken arteriyel yırtılmalar',
      'Derin Besleyici Lentikülostriat veya Koroidal Arter Dallarının Tümör Kapsülünden Ayrılması Esnasında Retraksiyon Kanamaları'
    ],
    hemostasisStrategies: [
      'Bipolar mikronöroşirürjikal hassas koagülasyon (çevre sağlıklı serebral dokuya termal hasar vermeden)',
      'Topikal hemostatik ajanlar: Surgicel (oksidize selüloz), Gelfoam (trombin emdirilmiş jelatin sünger) ve FloSeal hemostatik jelatin matriks',
      'Kemik diploik kanamalarında steril kemik mumu (Bone Wax) uygulaması (hem kanama hem VAE giriş kapısını kapatır)',
      'CUSA (Cavitron Ultrasonic Surgical Aspirator): Tümör parankimini selektif parçalayarak aspire ederken damarsal yapıları korur',
      'Rezeksiyon Lojunda Valsalva Manevrası: Kapanış öncesi cerrahın talebiyle hava yolu basıncını 25-30 cmH2O seviyesine 5-10 saniye yükselterek gizli venöz kaçakların açığa çıkarılması ve koterizasyonu',
      'Dural Sinüs Yırtığı ve VAE Önlemi: Cerrahi alana derhal bol serum fizyolojik irrigasyonu, ıslak gaz/Gelita kompresyonu ve acil VAE tedavi protokolünün uygulanması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA - Propofol ve Remifentanil Hedef Kontrollü İnfüzyon [TCI])',
      'TIVA + Düşük Doz Uçucu Anestezik (< 0.5 MAC Sevofluran): İONM (TcMEP/SSEP) sinyal kalitesini bozmadan serebral metabolizma (CMRO2) ve serebral kan akımını (CBF) azaltır, intrakraniyel kompliyansı artırır ve cerrah için ideal "rahat / gevşek beyin" (slack brain) sağlar'
    ],
    alternative: [
      'Dengeli İnhalasyon Anestezisi (Sevofluran < 0.7 MAC + Remifentanil İnfüzyonu): İONM motor uyarılmış potansiyel (TcMEP) monitörizasyonu kullanılmayan vakalarda'
    ],
    clinicalRationale: 'Propofol + Remifentanil TIVA (veya <0.5 MAC Sevofluran), intrakraniyal kompliyansı koruyup beyin ödemini azaltarak cerrah için gevşek beyin (slack brain) sağlar ve elokent tümörlerde TcMEP/SSEP monitörizasyonuna olanak tanır. Azot protoksit (N2O) KİBAS, pnömosefali ve VAE ekspansiyonu nedeniyle KESİNLİKLE KONTRENDİKEDİR. Baş pozisyonlamasında tüp kıvrılmasını önlemek, normokapniyi hassas titre etmek ve uyanmada hızlı nörolojik değerlendirme yapabilmek için spiral telli orotrakeal entübasyon tercih edilir.',
    notes: 'BEYİN TÜMÖRÜ CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) BAZAL NORMOKAPNİ (35-38 mmHg) VE BEYİN GEVŞEMESİ (kısa süreli 30-35 mmHg yalnızca tıkız beyin kurtarmasında); (2) İONM-TcMEP KORUMASI (TOF ≥0.90 + TIVA + Isırma Bloğu); (3) PARASAGİTTAL / SİNÜS TÜMÖRLERİNDE VENÖZ HAVA EMBOLİSİ (VAE) MONİTÖRİZASYONU VE ACİL TEDAVİSİ; (4) DEKSAMETAZON ALTINDA GLİSEMİK KONTROL (140-180 mg/dL) VE PÜRÜZSÜZ UYANMA.',
    rulesTitle: 'BEYİN TÜMÖRÜ CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'KİBAS KONTROLÜ, BAZAL NORMOKAPNİ VE BEYİN GEVŞEMESİ (SLACK BRAIN)',
        content: 'İntrakraniyal kitlelerde kompliyans tükenmiştir; hiperkapni, hipoksi ve jugüler venöz bası herniyasyona yol açar. Baş 15-30° eleve ve nötral tutulur; TIVA, Mannitol veya %3 Hipertonik Salin ve BAZAL NORMOKAPNİ (PaCO2 35-38 mmHg) uygulanır. Hafif hipokapni (PaCO2 30-35 mmHg) rutin değil, YALNIZCA tıkız beyinde kısa süreli kurtarma olarak kullanılır.'
      },
      {
        number: 2,
        title: 'İONM (TcMEP/SSEP) KORUMASI, DOĞRU TOF KAVRAMI VE ISIRMA BLOĞU',
        content: 'Elokent korteks/motor yolaklara komşu lezyonlarda TcMEP ve SSEP sinyallerini korumak için Propofol + Remifentanil TIVA (BIS 40-50) uygulanır, idamede kas gevşetici verilmez ve TOF ≥0.90 (4/4) ile nöromusküler blokajın OLMADIĞI doğrulanır (TOF anestezi derinliğini ÖLÇMEZ!). TcMEP sırasında dil/dudak hasarını önlemek için yumuşak ısırma bloğu yerleştirilir.'
      },
      {
        number: 3,
        title: 'PARASAGİTTAL / VENÖZ SİNÜS TÜMÖRLERİNDE VENÖZ HAVA EMBOLİSİ (VAE) PROTOKOLÜ',
        content: 'SSS veya transvers sinüs invazyonu olan menenjiyomlarda baş elevasyonu negatif venöz basınç oluşturur. Prekordiyal Doppler ve sürekli EtCO2 (ani düşüş!) izlenir; VAE gelişirse cerrahi alan SF/ıslak gazla kapatılır, %100 O2 verilir (N2O kesinlikle kapalı), baş kalp seviyesine indirilir, kısa juguler kompresyon uygulanır ve CVC\'den hava aspire edilir.'
      },
      {
        number: 4,
        title: 'GLİSEMİ (140-180 mg/dL), İZOTONİK SIVI, ÖKSÜRÜKSÜZ UYANMA VE GÜVENLİ ANALJEZİ',
        content: 'Deksametazon kullanan tümör hastalarında intraoperatif seri glukoz takibi (140-180 mg/dL) ve izotonik sıvılar (hipotonik/dekstrozlu sıvı ve N2O yasak) şarttır. Ekstübasyon sırasındaki öksürük ve hipertansiyon (SKB >140 mmHg) loj hematomuna yol açar; postop Tramadol (nöbet/POBV) ve taze tümör yatağında erken rutin NSAİİ KULLANILMAZ!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji Konsültasyonu: Kranial MRG ve BT bulguları; tümörün lob yerleşimi, kistik/nekrotik komponentler, peritümöral vazojenik ödem derecesi, orta hat şifti (>5 mm KİBAS göstergesidir), bazal sisternaların silinmesi, dural venöz sinüs (SSS/transvers sinüs) invazyonu (VAE ve masif kanama riski!) ve elokent korteks komşuluğu değerlendirilmelidir.',
      'Nöroloji / Epileptoloji Konsültasyonu ve AAN/EANO/CNS Kılavuzları: Preoperatif nöbet öyküsü olan olgularda mevcut antiepileptik ilaç (ör. Levetirasetam) tedavisi ameliyat sabahı dahil aksatılmadan sürdürülür. Buna karşın NÖBET ÖYKÜSÜ OLMAYAN (seizure-naive) beyin tümörü hastalarında AAN/EANO/CNS kılavuzları rutin uzun süreli veya 7 günlük profilaktik antiepileptik (Levetirasetam) kullanımını ÖNERMEMEKTEDİR.',
      'Endokrinoloji Konsültasyonu: Hipofiz/sellar uzanımı olan tümörlerde panhipopituitarizm ve adrenal yetmezlik taranmalı; uzun süredir yüksek doz Deksametazon kullanan olgularda HPA aksı baskılanması ve steroid kaynaklı hiperglisemi yönetilmelidir.',
      'Nöro-Yoğun Bakım Konsültasyonu: Postoperatif invaziv arteriyel kan basıncı takibi ve nörolojik gözlem için YBÜ yatağı teyit edilmelidir.'
    ],
    historyAndPhysical: [
      'Kafa İçi Basınç Artışı Sendromu (KİBAS) Bulguları: Sabah baş ağrısı, fışkırır tarzda bulantı-kusma, papilödem, diplopi (6. kranyal sinir felci), letarji ve Cushing Triadı (hipertansiyon, bradikardi, düzensiz solunum — fıtıklaşma acil alarmı!).',
      'Fokal Nörolojik Muayene: Dört ekstremite motor gücü (0-5 skala), duyusal kayıplar, konuşma disfazisi/afazisi, görme alanı defisiti (hemianopsi) ve refleksler preoperatif tam kaydedilmelidir.',
      'Steroid Tedavisi ve Hiperglisemi Öyküsü: Vazojenik peritümöral ödem için Deksametazon (4-8 mg IV/oral günde 2-4 kez) kullanımı insülin direnci ve belirgin hiperglisemi yapar; bazal kan şekeri ve perioperatif insülin/glisemi planı belirlenir.',
      'Hava Yolu ve Servikal Muayene: Mallampati, tiromental mesafe; Mayfield başlığı ile başa verilecek rotasyon ve fleksiyon açısından servikal vertebra hareketliliği değerlendirilmelidir.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve En az 2 Ünite ES Cross-Match doğrulaması (sinüs komşuluğu/büyük menenjiyomda 4 Ünite ES + 2 Ünite TDP).',
      'Tam Kan Sayımı (Hb, Hct, Trombosit), Koagülasyon Paneli (PT/INR, aPTT, Fibrinojen).',
      'Serum Elektrolitleri ve Kan Şekeri: Bazal Sodyum (Na+), Osmolarite ve özellikle Deksametazon kullananlarda açlık/bazal Kan Şekeri (hedef 140-180 mg/dL) mutlaka değerlendirilmelidir.',
      'Böbrek ve Karaciğer Fonksiyon Testleri: Ozmoterapi ve ilaç metabolizması açısından Serum Kreatinin ve GFR seviyesi.',
      'Ameliyathane Nöronavigasyon İstasyonuna Yüklenmiş Kontrastlı Volümetrik Kranial MRG ve BT verileri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Dış Kulak Yolu (Tragus / Willis Poligonu / Foramen Monro) Seviyesinde Sıfırlanmış: Baş elevasyonunda doğru Serebral Perfüzyon Basıncı (CPP = MAP - ICP) ölçümü için transdüser yalnızca Tragus seviyesinde sıfırlanır. Anestezi indüksiyonu ÖNCESİ lokal anesteziyle yerleştirilmelidir.',
      'Venöz Hava Embolisi (VAE) Monitörizasyonu (Parasagittal / Sinüs İnvazyonu Olan Menenjiyom ve Yüksek Baş Elevasyonunda Zorunlu): Prekordiyal Doppler USG (en hassas non-invaziv erken uyarı monitörü), sürekli EtCO2 (ani >3-5 mmHg düşüş alarm bulgusu), yüksek riskli sinüs invazyonunda sağ atriyum-SVC bileşkesi hizasında çok delikli CVC (hava aspirasyonu için) ve gerekirse TEE.',
      'İntraoperatif Nöromonitörizasyon (İONM): TcMEP, SSEP, EEG ve elokent motor alana komşu tümörlerde Faz Ters Dönmesi (Phase Reversal) ile merkezi sulkusun haritalanması.',
      'Nöromusküler İleti İzlemi (Train-of-Four - TOF): TcMEP izlenen olgularda TOF ≥ 0.90 (4/4 yanıt) ölçülerek nöromusküler blokajın tamamen sonlandığı ve motor uyarılmış potansiyellerin güvenilir olduğu doğrulanır (NOT: TOF anestezi derinliğini ÖLÇMEZ; anestezi derinliği ve hareketsizlik TIVA ve BIS [40-50] ile sağlanır!).',
      'Anestezi Derinliği İzlemi: Bispektral İndeks (BIS: 40 - 50 aralığında tutularak beyin metabolik oksijen tüketimi [CMRO2] baskılanır ve hareketsizlik güvenceye alınır).',
      'Sürekli End-Tidal CO2 (EtCO2), Seri ABG ve İntraoperatif Kan Şekeri: Bazal normokapni (PaCO2 35 - 38 mmHg; yalnızca tıkız beyinde geçici kurtarma amaçlı kısa süreli 30 - 35 mmHg) ve özellikle Deksametazon alan hastalarda saatlik/seri kan şekeri takibi (hedef 140 - 180 mg/dL!).',
      'Isı Problu Foley İdrar Sondası (ozmotik diürez takibi) ve Sürekli Vücut Sıcaklığı Monitörizasyonu (Normotermi 36.0 - 37.0°C).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz yol (14G veya 16G)',
      'Santral Venöz Kateter (CVC): Dural venöz sinüs invazyonu olan parasagittal/büyük menenjiyomlarda (VAE hava aspirasyonu + vazoaktif infüzyon + masif resüsitasyon için) veya periferik erişimi zayıf olgularda',
      'Kan ve Sıvı Isıtıcı Düzenekleri'
    ],
    patientPosition: 'Tümörün Anatomik Lokalizasyonuna Göre Supin + Baş Rotasyonu (Mayfield 3-Noktalı Çivili Başlık ile İmmobilize Edilmiş)',
    patientPositionDetails: [
      'Frontal, Temporal ve Ön Parietal Lezyonlar: Supin pozisyon, gövde ve baş 15 - 30° elevasyonda tutulur (A-line transdüseri mutlaka Tragus seviyesinde sıfırlanır).',
      'Serebral Venöz Dönüşün Korunması: Baş karşı tarafa 30-45° rotasyona getirilebilir; internal juguler ven basısını ve venöz konjesyonu önlemek için çene ile sternum arasında en az 2 parmak mesafe korunmalı, aşırı boyun torsiyonundan kaçınılmalıdır.',
      'Mayfield Çivili Başlık Uygulaması: Çiviler takılmadan önce giriş yerlerine lokal anestezik (kümülatif maks mg/kg dozu aşmadan, LAST önlemleriyle) infiltre edilir; masif sempatik deşarjı önlemek için Remifentanil bolusu, Propofol veya Esmolol ile hemodinami baskılanır.',
      'Bası Noktaları: Oksiput, skapula, sakrum ve topuklar jel pedlerle desteklenir; gözler koruyucu merhem ve bantla dış basıdan korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (1.5 - 2.5 mg/kg) + Fentanil (2 - 3 mcg/kg) veya Remifentanil (0.15 - 0.25 mcg/kg/dk) + Rokuronyum (0.6 - 1.0 mg/kg). Laringoskopi sırasındaki KİBAS artışını önlemek için IV Lidokain (1.5 mg/kg) uygulanır.',
      'İdame: TIVA (Propofol 80 - 130 mcg/kg/dk + Remifentanil 0.1 - 0.3 mcg/kg/dk TCI; BIS 40 - 50). TcMEP izleniyorsa indüksiyon sonrası kas gevşetici tekrarlanmaz (TOF ≥0.90 doğrulanır) ve yumuşak ısırma bloğu yerleştirilir.',
      'Beyin Gevşetme Protokolü ("Slack Brain"), Solunum, Gaz, Sıvı ve Glisemi Yönetimi:',
      '  1. Ozmotik Tedavi: Gerektiğinde cilt insizyonu / kemik flebi aşamasında %20 Mannitol (0.5 - 1.0 g/kg IV) veya %3 Hipertonik Salin (2 - 3 mL/kg IV).',
      '  2. Kontrollü Ventilasyon: Bazal hedef NORMOKAPNİDİR (PaCO2 35 - 38 mmHg). Rutin profilaktik hiperventilasyon YAPILMAZ; kısa süreli hafif hipokapni (PaCO2 30 - 35 mmHg) YALNIZCA tıkız beyin (tight brain) kurtarması için geçici olarak uygulanır.',
      '  3. Baş Pozisyonu: 15-30° venöz drenaj elevasyonu ve serbest boyun.',
      '  4. Gaz Kontrendikasyonu: Azot Protoksit (N2O) KESİNLİKLE KULLANILMAZ (KİBAS, pnömosefali ve VAE ekspansiyonu!). Uçucu gaz veriliyorsa < 0.5 MAC tutulur.',
      '  5. Sıvı ve Glisemi Yönetimi: Hipotonik/hipo-ozmolar (%5 Dekstroz, Ringer Laktat) sıvılardan kesinlikle kaçınılır; yalnızca izotonik kristaloidler (%0.9 NaCl veya dengeli izotonik Plasmalyte/İzolen) kullanılır. Özellikle Deksametazon alan hastalarda intraoperatif seri kan şekeri izlenir ve hedef 140 - 180 mg/dL aralığında (gerekirse IV regüler insülin protokolü ile) tutulur.',
      'VENÖZ HAVA EMBOLİSİ (VAE) ACİL TEDAVİ PROTOKOLÜ (Parasagittal / Sinüs İnvazyonlu Tümörlerde): Prekordiyal Dopplerde "değirmen çarkı / mill-wheel" sesi veya ani EtCO2 düşüşü (>3-5 mmHg) + hipotansiyon/desatürasyon gelişirse: (1) Cerraha acil bildir → cerrahi alan derhal bol izotonik SF ile doldurulur, açık sinüs ıslak gaz/kemik mumu ile kapatılır; (2) %100 O2\'ye geçilir (N2O kesinlikle kapalı); (3) Baş kalp seviyesine indirilir (elevasyon azaltılır) ve kısa süreli nazik bilateral juguler ven kompresyonu ile açık venöz giriş görülür/kapatılır; (4) Mevcut CVC\'den (sağ atriyumdan) hava aspire edilir; (5) Sıvı bolusu ve Noradrenalin/Adrenalin ile hemodinamik destek (gerekirse CPR) sağlanır.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; baş pozisyonlandırması ve cerrahi mikroskop manipülasyonunda lümen oklüzyonunu önlemek için tercihen Spiral (Zırhlı / Wire-reinforced) ETT ve TcMEP uygulanacaksa yumuşak ısırma bloğu (bite block).',
      'Laringoskopiye bağlı sempatik yanıt ve intrakraniyel basınç piki derin anestezi altında tamamen köreltilmelidir.',
      'Kaf basıncı manometre ile 20 - 25 cmH2O aralığında sabitlenir.'
    ],
    criticalSurgicalStages: [
      '1. Mayfield Çivili Başlık Takılması: Sempatik pik, hipertansiyon ve taşikardi kontrolü.',
      '2. Kraniyotomi Kemik Flebinin Kaldırılması: Diploe venlerinden kanama ve VAE giriş kapısı (kemik mumu uygulanır), dural sinüs yırtılma riski.',
      '3. Dura Açılışı ve Beyin Gevşekliğinin Değerlendirilmesi: Dura açıldığında beyin rahat (slack) olmalıdır; tıkız beyinde acil algoritma uygulanır: Boyun venöz basısı ve tüp kontrolü, anestezi derinleştirilmesi, ek Mannitol/%3 Hipertonik Salin, PEEP azaltılması ve geçici kurtarma amaçlı kısa süreli PaCO2 30-35 mmHg.',
      '4. Mikroskopik Tümör Rezeksiyonu, Sinüs Diseksiyonu ve CUSA Kullanımı: Parasagittal/falks menenjiyomlarında dural sinüs açılması anında ani masif kanama ve VAE açısından Prekordiyal Doppler ve EtCO2 saniyelik izlenir.',
      '5. Rezeksiyon Lojunda Valsalva Manevrası: Tümör çıkarıldıktan sonra (normotansif koşullarda) cerrahın talebiyle 25-30 cmH2O hava yolu basıncı 5-10 saniye tutularak gizli venöz kanamalar kontrol edilir.',
      '6. Dural Kapanış ve Mayfield Çivilerinin Çıkarılması: Çiviler çıkarılırken uyanma ajitasyonu ve hipertansif atak önlenmelidir.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE) ZORUNLUDUR: Uyanma sırasında öksürme, ıkınma, tüpü ısırma ve hipertansiyon; taze tümör rezeksiyon lojunda venöz basıncı fırlatarak intrakraniyel hematom gelişimine yol açar!',
      'Uyanma Sırasında Hemodinamik Baskılama: Ekstübasyon öncesi IV Lidokain (1.0 - 1.5 mg/kg), Esmolol (0.5 mg/kg) veya düşük doz Deksmedetomidin/Remifentanil ile öksürük refleksi ve taşikardi baskılanır. Sistolik kan basıncı kesinlikle < 140 mmHg tutulmalıdır.',
      'Nörolojik Değerlendirme: Hasta ameliyathanede ekstübe edilir edilmez bilinci, kooperasyonu, göz açması, dört ekstremite motor gücü ve pupilleri hızla değerlendirilerek kaydedilir.',
      'Gecikmiş Uyanma veya Yeni Fokal Defisit Durumu: Beklenenden geç uyanma veya yeni anizokori/hemiparezi geliştiyse derhal acil Kontrastsız Kranial BT çekilmeli; postoperatif hematom, akut serebral ödem veya tansiyon pnömosefalisi ekarte edilmelidir!'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - Skalp Blokajı / İnsizyonel İnfiltrasyon (LAST Güvenliği İle): N. supraorbitalis, N. supratrochlearis, N. zygomaticotemporalis, N. auriculotemporalis, N. occipitalis major ve minor sinirlerine Ropivakain (≤3 mg/kg) veya Levobupivakain/Bupivakain (≤2.5 mg/kg; epinefrinli ≤3 mg/kg) uygulanır (karışımlarda toksisite ADİTİFTİR; maksimum kümülatif mg/kg dozu kesinlikle aşılmaz, negatif aspirasyon yapılır ve %20 Lipid Emülsiyonu [Intralipid] hazır bulundurulur).',
      '  - Sistemik Non-Opioid: IV Parasetamol (1000 mg her 6 saatte bir düzenli infüzyon).',
      '  - NSAİİ Kısıtlaması (DEKSKETOPROFEN UYARISI!): Deksketoprofen "selektif" DEĞİLDİR, non-selektif COX-1/2 inhibitörüdür! Taze beyin tümörü rezeksiyon yatağında intrakraniyal hematom riski nedeniyle erken dönemde rutin NSAİİ KULLANILMAZ; ancak nöroşirürjik hemostaz ve postoperatif kontrol BT doğrulaması sonrası cerrah onayıyla değerlendirilebilir.',
      '  - Güvenli Kurtarma Opiyatı (TRAMADOL KULLANILMAZ!): Tramadol nöbet eşiğini düşürdüğü (tümörlü beyinde epilepsi riski!) ve şiddetli POBV/kusma tetiklediği için KESİNLİKLE KULLANILMAZ. Yalnızca şiddetli atılım ağrısında nörolojik izlemi maskelemeyecek düşük doz titre IV Fentanil (25-50 mcg), Oksikodon veya bazal infüzyonsuz Morfin PCA tercih edilir.'
    ],
    prospectRecommendations: [
      'PROSPECT Craniotomy 2023 (Mestdagh et al.): Preoperatif/postoperatif Skalp Bloğu veya insizyonel lokal anestezik infiltrasyonu (maks mg/kg ve LAST kurallarına uyarak) ile planlı sistemik Parasetamol (1 g IV q6h) en yüksek kanıt düzeyli temel analjeziyi oluşturur.',
      'Tramadol ve taze tümör yatağında erken rutin NSAİİ\'den kaçınılır; nörolojik değerlendirmeyi koruyan düşük doz kurtarıcı opioidler ve çift ajan POBV profilaksisi uygulanır.'
    ],
    erasRecommendations: [
      'ERAS Nöroonkolojik Kraniyotomi İlkeleri (Hagan et al., 2016):',
      '  - Postoperatif Bulantı ve Kusmanın (PONV) Çoklu Profilaksisi: Kusma ve öğürme KİBAS\'ı fırlatarak loj hematomuna yol açtığı için çift ajan profilaksisi (Deksametazon 4-8 mg intraoperatif + Ondansetron 4 mg kapanışta) şarttır.',
      '  - Normotansiyon ve Glisemik Kontrol: İlk 24 saatte SKB <140 mmHg ve özellikle Deksametazon altında kan şekeri 140-180 mg/dL aralığında sıkı takip edilir.',
      '  - Erken Mobilizasyon, Erken Oral Beslenme ve Üriner Kateterin Erken Çekilmesi: Bilinç açıksa postop 4-6. saatte oral su, postop 1. günde mobilizasyonla Foley sondanın sonlandırılması.',
      '  - Kanıta Dayalı Nöbet Yönetimi (AAN/EANO/CNS): Nöbet öyküsü olmayan (seizure-naive) hastalarda rutin 7 günlük profilaktik Levetirasetam ÖNERİLMEZ! Yalnızca preoperatif nöbet öyküsü olan olgularda mevcut antiepileptik tedaviye düzenli devam edilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (Eds.). (2020). Anesthesiologist's Manual of Surgical Procedures (6th ed.). Wolters Kluwer. Section: Neurosurgery — Craniotomy for Supratentorial Neoplasm.",
    erasReference: 'Hagan, K. B., Bhavsar, S., Raza, S. M., Arnold, B., Arunkumar, R., Dang, A., et al. (2016). Enhanced recovery after surgery for oncological craniotomies. Journal of Clinical Neuroscience, 24, 10–16.',
    prospectReference: "Mestdagh, F., Lavand'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group (ESRA). (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(5), 301–314.",
    otherReferences: [
      'Walbert, T., Harrison, R. A., Schiff, D., Avila, E. K., Chen, M., Kandula, P., et al.; SNO/EANO/AAN Joint Guideline. (2021). SNO and EANO practice guideline update: Anticonvulsant prophylaxis in patients with newly diagnosed brain tumors. Neuro-Oncology, 23(11), 1835–1844.',
      'Louis, D. N., Perry, A., Wesseling, P., Brat, D. J., Cree, I. A., Figarella-Branger, D., et al. (2021). The 2021 WHO Classification of Tumors of the Central Nervous System: a summary. Neuro-Oncology, 23(8), 1231–1251.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement for Anesthetic Management of Patients Undergoing Craniotomy for Brain Tumor.',
      'Mirski, M. A., Lele, A. V., Fitzsimmons, L., & Toung, T. J. (2007). Diagnosis and treatment of vascular air embolism. Anesthesiology, 106(1), 164–177.'
    ]
  }
};
