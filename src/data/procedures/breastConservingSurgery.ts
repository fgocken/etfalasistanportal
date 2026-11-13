import { ProcedureDefinition } from '../../types/procedures';

/**
 * Meme Koruyucu Cerrahi (Lumpektomi / Parsiyel Mastektomi ± SLNB)
 * 
 * Jaffe (5th ed.), ERAS Society Breast Surgery Guidelines 
 * ve PROSPECT Recommendations referans alınarak yapılandırılmıştır.
 */
export const breastConservingSurgery: ProcedureDefinition = {
  id: 'breast-conserving-surgery',
  name: 'Meme Koruyucu Cerrahi (Lumpektomi / Parsiyel Mastektomi ± SLNB)',
  shortCode: 'MKC-SLNB',
  specialty: 'genel_cerrahi',
  specialtyName: 'Genel Cerrahi',
  categoryTag: 'Meme Cerrahisi & Onkolojik Cerrahi',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Erken evre meme karsinomunda veya şüpheli malign lezyonlarda, memenin anatomik ve kozmetik bütünlüğü korunarak tümörün etrafındaki negatif/temiz cerrahi sınırla birlikte total rezeksiyonu (geniş lokal eksizyon, lumpektomi, parsiyel mastektomi veya kuadrantektomi) ve evreleme amacıyla sıklıkla eşzamanlı aksiller sentinel lenf nodu biyopsisinin (SLNB) uygulanması ameliyatıdır.',
  indications: [
    'Erken evre meme karsinomu (Evre I ve II / T1-T2 tümörler, meme hacmi ile tümör boyutu oranı estetik korumaya elverişli olan hastalar)',
    'Neoadjuvan kemoterapi / sistemik tedavi sonrası regrese olmuş ve meme koruyucu cerrahiye uygun hale gelmiş soliter tümörler',
    'Duktal Karsinoma İn Situ (DCIS) lezyonlarının geniş negatif cerrahi sınırlarla çıkarılması',
    'Cerrahi sınır negatifliği elde edilebilecek fokal veya unisentrik malign meme kitleleri',
    'Aksiller klinik ve radyolojik lenf nodu tutulumu olmayan (cN0) erken evre meme kanserli olgularda evreleme amacıyla Sentinel Lenf Nodu Biyopsisi (SLNB) endikasyonu',
    'Geniş eksizyon sonrası onkoplastik doku kaydırma veya glandüler rotasyon flebi ile kombine parsiyel rezeksiyonlar'
  ],
  averageDuration: '60 - 120 dakika (Yalnızca lumpektomi/MKC: 45-60 dk; Eşzamanlı SLNB, intraoperatif frozen patoloji ve spesimen mamografisi bekleme aralığı dahil: 75-120 dk; Cerrahi sınır pozitifliği nedeniyle ek kavite eksizyonu veya aksiller lenf nodu diseksiyonuna konversiyon: 120-150 dk)',

  // Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '20 - 70 mL (Düşük / ihmal edilebilir; geniş kuadrantektomi, derin pektoral fasya eksizyonu veya onkoplastik flep mobilizasyonunda 100–150 mL\'ye çıkabilir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Düzey Risk (20 – 70 mL)',
    crossMatchRequirement: 'Rutin kan hazırlığı ve Cross-Match gerekmez. Tip & Screen (T&S) rutin vakalarda önerilmez; ileri derecede anemi (Hb < 8 g/dL) veya ciddi kanama diyatezi olan nadir olgular haricinde kan rezervasyonu yapılmaz',
    transfusionProbability: '< %0.5 (Çok Düşük)',
    criticalBleedingSources: [
      'İnternal torasik (mammar) arter ve venin anterior perforan dalları (özellikle iç/medial kadran rezeksiyonlarında)',
      'Lateral torasik arter dalları ve torakoakromiyal arterin pektoral dalları',
      'Pektoralis majör kas fasyasına inildiğinde parankim tabanındaki derin perforan venöz ve arteriyel odaklar',
      'Aksiller SLNB ve diseksiyon alanında aksiller venin küçük yan dalları ile interkostobrakial sinir komşuluğundaki vasküler pleksus',
      'Onkoplastik glandüler flep diseksiyonunda yaygın mikrovasküler doku sızıntıları'
    ],
    hemostasisStrategies: [
      'Titiz bipolar koagülasyon ve ince uçlu monopolar elektrokoter hemostazı',
      'İnsizyon hattına ve meme parankimine 1:200.000 Epinefrinli lokal anestezik infiltrasyonu ile vazokonstrüksiyon',
      'Aksiller diseksiyonda küçük vasküler ve lenfatik yapılara titanyum cerrahi klips uygulanması (kanama ve lenfatik seromayı önler)',
      'Tümör yatağına topikal hemostatik ajanların (oksitlenmiş rejenere selüloz, jelatin sünger veya trombin matriksi) yerleştirilmesi',
      'Postoperatif dönemde hematom ve ödemi engellemek için elastik kompresyon bandajı, göğüs korsesi veya medikal cerrahi sütyen kullanımı'
    ]
  },

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Anestezi (Laringeal Maske [LMA] veya Endotrakeal Entübasyon [ETT]) + Ultrason Eşliğinde Rejyonel Fasya Plan Blokları (PECS I/II Bloğu, Serratus Anterior Plan Bloğu [SAPB] veya Torasik Paravertebral Blok [TPVB]) ile Multimodal Analjezi'
    ],
    alternative: [
      'Monitörize Anestezi Bakımı (MAC / Bilinçli-Derin Sedoanaljezi) + USG Eşliğinde Pektoral Sinir Bloğu (PECS II) veya TPVB + Cerrah Tarafından Cömert Lokal Anestezik İnfiltrasyonu (Genel anestezinin yüksek mortalite riski taşıdığı ciddi kardiyopulmoner komorbiditeli yaşlı olgularda)',
      'Genel Anestezi + İntravenöz Multimodal Analjezikler (Rejyonel blok yapılamayan veya kontrendike olan hastalarda)'
    ],
    notes: 'Meme koruyucu cerrahide (özellikle eşzamanlı aksiller sentinel lenf nodu biyopsisi [SLNB] eklendiğinde) cerrahi alan pektoral fasyaya ve aksillaya kadar genişler. Genel anestezi altında ultrason rehberliğinde uygulanan PECS II veya Serratus Anterior (SAPB) blokları intraoperatif opioid tüketimini %60-70 azaltır, ameliyat sonrası uyanmayı pürüzsüzleştirir, PONV insidansını düşürür ve en önemlisi kronik post-mastektomi ağrı sendromu (PMPS) riskini anlamlı ölçüde engeller. Cerrahi koldan damar yolu açılması veya tansiyon ölçülmesi lenfödem riski nedeniyle kesinlikle yasaktır.',
    rulesTitle: 'MEME KORUYUCU CERRAHİDE TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'CERRAHİ TARAF KOLUN MUTLAK KORUNMASI (LENFÖDEM YASAĞI)',
        content: 'Aksiller sentinel lenf nodu biyopsisi (SLNB) veya aksiller diseksiyon planlanan cerrahi taraf koldan KESİNLİKLE IV damar yolu açılmaz, kan alınmaz ve non-invaziv tansiyon manşonu bağlanmaz! Damar yolu, pulse oksimetre ve NİKB manşonu mutlaka kontralateral (sağlam) kola veya bilateral cerrahide alt ekstremiteye yerleştirilmelidir.'
      },
      {
        number: 2,
        title: 'MAVİ BOYA (PATENT BLUE V / METİLEN MAVİSİ) ANAFİLAKSİSİ VE SAHTE DESATÜRASYON',
        content: 'SLNB haritalaması için periareolar enjekte edilen Patent Blue V veya İzosulfan Mavisi %0.5-2 oranında ciddi anafilaksiye (ciltte mavi ürtiker, bronkospazm, refrakter hipotansiyon) neden olabilir; ayrıca metilen/mavi boyalar pulse oksimetrede gerçek hipoksi olmaksızın %85-92 düzeyinde sahte SpO2 düşüşü ve yeşil-mavi idrar oluşturur.'
      },
      {
        number: 3,
        title: 'PECS II / SAPB İLE KRONİK AĞRI KORUMASI VE AKSİLLER SİNİR STİMÜLASYONU',
        content: 'Aksiller diseksiyonda uzun torasik ve torakodorsal sinirler cerrahi probla test edildiğinden derin kas gevşemesinden kaçınılmalıdır (TOF ≥ 2-3). USG rehberliğinde uygulanan PECS II veya Serratus Anterior (SAPB) bloğu ise hem akut opioid ihtiyacını hem de kronik post-mastektomi ağrı sendromu (PMPS) riskini belirgin azaltır.'
      },
      {
        number: 4,
        title: 'NEOADJUVAN KEMOTERAPİ KARDİYOTOKSİSİTESİ VE HEMATOLOJİK DEĞERLENDİRME',
        content: 'Neoadjuvan Antrasiklin (Doksorubisin) ve anti-HER2 (Trastuzumab) tedavisi alan hastalarda subklinik kardiyomiyopati/LVEF düşüşü ve kemik iliği baskılanması (nötropeni/trombositopeni) görülebilir. İndüksiyon öncesi güncel EKO ve kan tablosu teyit edilmelidir.'
      }
    ]
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Nükleer Tıp ve Meme Radyolojisi İletişimi: Sentinel Lenf Nodu Biyopsisi (SLNB) için preoperatif radyoizotop (Teknesyum-99m nanokolloid) enjeksiyon zamanı, lenfosintigrafi haritası ve gama prob hazırlığı; non-palpabl kitlelerde ise tel lokalizasyonu veya radyoaktif tohum (ROLL) kontrolü cerrahi ekiple teyit edilmelidir.',
      'Tıbbi Onkoloji Konsültasyonu: Hastanın daha önce aldığı neoadjuvan kemoterapi rejimleri ayrıntılı incelenmelidir; özellikle kardiyotoksik Antrasiklinler (Doksorubisin, Epirubisin) ve HER2 hedefli monoklonal antikorlar (Trastuzumab / Pertuzumab) alan hastalarda sol ventrikül sistolik fonksiyonu (LVEF) ve ekokardiyografi doğrulanmalıdır.',
      'Hematoloji Konsültasyonu: Kronik antikoagülan (Varfarin, DOAK) veya antiagregan (Klopidogrel, ASA) kullanan hastalarda cerrahi alanda hematom gelişimini önlemek amacıyla ASRA / ESAIC kılavuzlarına göre ilaç kesilme/köprüleme protokolü uygulanmalıdır.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Neoadjuvan Kemoterapinin Sistemik Toksisite Bulguları: Kemik iliği süpresyonu (lökopeni, nötropeni, anemi, trombositopeni), mukozit, periferik nöropati veya kardiyotoksisite bulguları taranmalıdır.',
      'Mavi Boya (Patent Blue V / Metilen Mavisi / İndosiyanin Yeşili - ICG) Alerji Öyküsü: Aksiller haritalamada periareolar alana enjekte edilecek boyalara karşı şiddetli anafilaktik/anafilaktoid reaksiyon ve cilt eritemi öyküsü mutlaka sorgulanmalıdır.',
      'İki Taraflı Kolların Lenfödem ve Damar Yolu Durumu: Cerrahi planlanan meme tarafındaki kol, lenfatik drenaj bozulması ve lenfödem gelişim riski nedeniyle işaretlenmeli; bu koldan kan basıncı ölçümü, damar yolu açılması ve kan alma işlemleri kesinlikle yasaklanmalıdır.',
      'Zor havayolu ve gastroözofageal reflü (aspirasyon riski) değerlendirmesi.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hemogram): Kemoterapi sonrası kemik iliği toparlanması, nötropeni ve trombosit sayısı kontrol edilmelidir.',
      'Koagülasyon Parametreleri (PT, aPTT, INR): Karaciğer fonksiyon bozukluğu veya hematom riski değerlendirmesi.',
      'Ekokardiyografi ve EKG: Antrasiklin veya Trastuzumab tedavisi görmüş tüm hastalarda preoperatif LVEF ≥ %50 olduğu teyit edilmelidir.',
      'Karaciğer ve Böbrek Fonksiyon Testleri: Metastatik tarama ve anestezik ilaç metabolizması açısından değerlendirilmelidir.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (DII ve V5 derivasyonları), SpO2, Non-invaziv Kan Basıncı (NIBP - *Kesinlikle cerrahi yapılmayan kontralateral kolda*), Kapnografi (EtCO2), Özofageal/Nazofaringeal Isı Probu.',
      'Nöromusküler Monitörizasyon (TOF): Aksiller diseksiyon evresinde cerrah sinir stimülatörü ile torakodorsal sinir (latissimus dorsi) ve uzun torasik siniri (serratus anterior) arayacağından derin nöromusküler blokajdan kaçınılmalı; TOF takibi ile seğirmeler korunmalıdır.',
      'Anestezi Derinliği Monitörizasyonu (BIS/Entropy): TIVA veya volatil anestezi titrasyonu sağlamak ve intraoperatif farkındalığı önlemek için önerilir.'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'Kontralateral Üst Ekstremiteden 1 Adet 18G veya 16G Geniş Lümenli Periferik Venöz Kateter (Cerrahi yapılan meme ve aksilla tarafındaki kolda lenfödem riski ve cerrahi manipülasyon nedeniyle kateterizasyon kesinlikle kontrendikedir).'
    ],
    // 4c) Hasta pozisyonu
    patientPosition: 'Supine (Sırtüstü) Pozisyon, Operasyon Tarafındaki Kol 80-90° Abdüksiyonda.',
    patientPositionDetails: [
      'İpsilateral kol armboard üzerine 80-90° açıyla ve yumuşak jel desteklerle yerleştirilir; brakial pleksus gerilme nöropatisini önlemek için kolun 90° üzerinde aşırı abdüksiyonundan ve hiperekstansiyonundan kesinlikle kaçınılmalıdır.',
      'Aksilla ve dış kadran kitlelerine cerrahi erişimi kolaylaştırmak amacıyla, operasyon tarafındaki toraks arkasına ince bir silikon rulo/yastık yerleştirilerek toraksa 15-20° hafif lateral eğim verilebilir.',
      'Baş hafifçe kontralateral yöne çevrilir; cerrahi örtü askısı (ether screen) ile baş/yüz alanı izole edilir, böylece anestezi ekibinin havayoluna kesintisiz erişimi güvenceye alınır.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'Ultrason Eşliğinde Modifiye Pektoral Blok (PECS I ve II): İndüksiyon sonrası veya cerrahi öncesi uygulanır. PECS I: Pektoralis majör ile minör kasları arasına 10 mL LA; PECS II: Pektoralis minör ile serratus anterior kasları arasına 20 mL LA (Bupivakain %0.25 veya Ropivakain %0.375). Bu blokaj meme koruyucu cerrahide ve aksiller SLNB alanında mükemmel nosiseptif blokaj sağlar.',
      'İndüksiyon ve İdame: Propofol (2–2.5 mg/kg) + Fentanil/Remifentanil + Rokuronyum (LMA planlanıyorsa düşük doz 0.3 mg/kg veya kas gevşeticisiz; ETT planlanıyorsa 0.6 mg/kg). İdame: Sevofluran/Desfluran veya TIVA (Propofol + Remifentanil infüzyonu) + IV Parasetamol (1 g) + Deksametazon (4-8 mg).',
      'Mavi Boya (Patent Blue / Metilen Mavisi) Enjeksiyonu ve Yalancı SpO2 Desatürasyonu: Cerrah SLNB amacıyla periareolar dokuya mavi boya enjekte ettiğinde, boyanın sistemik dolaşıma karışması nabız oksimetresinin 660 nm dalga boyunu absorbe ederek 15-45 dakika süren **yalancı bir SpO2 düşüşüne (%86-93)** neden olur. Anestezi uzmanı gerçek hipoksiyi (EtCO2, kan gazı analizi, PaO2 ve bilateral akciğer oskültasyonu ile) ayırt etmelidir. Ayrıca boyaya bağlı nadir tip I anafilaktik reaksiyonlara (ani bronkospazm, yüksek havayolu basıncı, hipotansiyon ve ürtiker) karşı uyanık olunmalı; anafilaksi şüphesinde derhal IV Adrenalin uygulanmalıdır.',
      'Aksiller Sinir Stimülasyonu ve Kas Gevşetici Kısıtlaması: Cerrah aksillada SLNB diseksiyonu yaparken nervus thoracicus longus ve nervus thoracodorsalis\'i elektriksel probla uyararak motor yanıtı test eder. Bu aşamada derin kürarizasyon cerrahi sinir stimülasyonunu felç eder; aksilla aşamasına geçilmeden önce nöromusküler blok çözülmeli (TOF ≥ 2-3) veya relaksansız idame edilmelidir.',
      'Spesimen Mamografisi / Frozen Patoloji Bekleme Süresi: Lumpektomi dokusu çıkarıldıktan sonra cerrahi sınırların temizliği ve mikrokalsifikasyon kontrolü için radyolojiye/patolojiye gönderilir. Bu 20-40 dakikalık cerrahi duraklama evresinde anestezik derinliği hafifletilmeli, hasta gereksiz yere derinleştirilmemeli ve aktif ısıtıcı battaniye ile normotermi titizlikle sürdürülmelidir.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      '2. veya 3. Nesil Laringeal Maske (LMA ProSeal / Supreme / i-gel): Cerrahi süre genellikle 60-90 dakika civarında olduğu ve aksiller sinir stimülasyonu için kas gevşetici kısıtlaması gerektiği için LMA birinci basamak mükemmel bir tercihtir; stabil hemodinami ve daha az boğaz ağrısı sağlar.',
      'Kaflı Endotrakeal Tüp (ETT): Morbid obezite (VKİ > 35 kg/m²), yüksek aspirasyon riski, eşzamanlı geniş onkoplastik flep rekonstrüksiyonu yapılacak uzun vakalar veya aksiller tam diseksiyona geçiş kararı verilen hastalarda tercih edilir.',
      'Akciğer koruyucu mekanik ventilasyon stratejisi (Tidal volüm 6–8 mL/kg PBW, PEEP 5–6 cmH2O, EtCO2 35–40 mmHg).'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Tümör Çevresi Lokal İnfiltrasyon ve İnsizyon: Epinefrin enjeksiyonu anında geçici sinüs taşikardisi ve hipertansiyon gelişimi takip edilmelidir.',
      'Aksiller Sentinel Lenf Nodu (SLNB) Diseksiyonu: Gama prob veya mavi boya takibi ile aksillaya girildiğinde aksiller ven ve vasküler dalların yaralanma riski; interkostobrakial sinir traksiyonuna bağlı geçici bradikardi veya ağrı yanıtı.',
      'Pektoral Fasyaya Kadar Derin Eksizyon: Arka cerrahi sınır negatifliği için pektoralis majör kas fasyasına inildiğinde koterizasyon dumanı, derin perforan hemostazı ve pektoral kas seyirmeleri.',
      'İntraoperatif Frozen ve Spesimen Mamografi Değerlendirmesi: Cerrahi sınır pozitifliği gelirse ek kavite tıraşlaması (re-eksizyon) veya frozen\'da makrometatastaz saptanırsa aksiller lenf nodu diseksiyonuna (ALND) konversiyon kararı.',
      'Hemostaz Kontrolü ve Doku Kapatılması: Aksillaya veya yatağa mini-vakum dren (Hemovac) yerleştirilmesi, cerrahi sahaya uzun etkili lokal anestezik infiltrasyonu.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Öksürüksüz ve Düzgün Uyanma (Smooth Emergence): Meme ve aksilla yatağında mikrovasküler kanama, dikiş açılması ve hematom gelişimini önlemek için hastanın ıkınmadan, öksürmeden ve tansiyon piki yaşamadan uyandırılması hayati önem taşır. Ekstübasyon/LMA çekimi öncesi IV Lidokain (1-1.5 mg/kg) uygulanabilir.',
      'Mavi Boya Renk Değişimi Hakkında Bilgilendirme: Metilen mavisi veya Patent Blue kullanılan hastalarda ciltte soluk mavi-yeşil renk ve idrarda koyu mavi-yeşil renk değişimi gelişir; derlenme (PACU) ekibi ve hasta bunun fizyolojik boya atılımı olduğu konusunda rahatlatılmalıdır.',
      'PONV Profilaksisi: Çiftli antiemetik stratejisi (indüksiyonda Deksametazon 4-8 mg + cerrahi bitiminden 30 dk önce Ondansetron 4 mg).',
      'Cerrahi Baskılı Pansuman Kontrolü: Cilt insizyonu ve bandaj altından aktif arteriyel sızıntı veya hızlı hematom şişliği olmadığı doğrulanmalıdır.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'Meme koruyucu cerrahi sonrası ağrı genellikle hafif-orta şiddettedir; intraoperatif uygulanan PECS II veya Serratus bloğu sayesinde ilk 24 saat opioid ihtiyacı dramatik düzeyde düşüktür.',
      'Cerrahi Yara Yerine Lokal Anestezik İnfiltrasyonu (Bupivakain %0.25 veya Levobupivakain): Postoperatif erken saatlerde nosiseptif fasyal uyarıyı bloke eder.',
      'Birinci Basamak Multimodal Analjezi: Düzenli IV/Oral Parasetamol (1 g q6h) + Oral/IV NSAİİ (İbuprofen 400-600 mg veya Deksaketoprofen 25-50 mg - cerrahi hemostaz sağlandıktan sonra düzenli uygulanır).',
      'Opioid-Sparing Yaklaşım: Rutin güçlü opioid reçetesinden kaçınılmalı; şiddetli kırılma ağrılarında yalnızca düşük doz oral Tramadol veya Kodein kurtarıcı olarak düşünülmelidir.',
      'Destekleyici Cerrahi Sütyen / Kompresyon Bandajı: Memenin yerçekimi hareketini ve doku içi gerilimi sınırlandırarak ağrıyı, seroma ve hematom gelişimini belirgin biçimde azaltır.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Ultrason eşliğinde Rejyonel Fasya Plan Blokları (PECS II veya Serratus Anterior Blok): Onkolojik meme cerrahisi ve aksiller girişimlerde postoperatif ağrıyı ve opioid tüketimini azaltmada en yüksek kanıt düzeyine sahiptir (Grade A).',
      'Sistemik Parasetamol ve NSAİİ / COX-2 İnhibitörü kombinasyonunun perioperatif rutin uygulanması.',
      'Cerrahi insizyon alanına ve aksiller kaviteye cerrah tarafından uzun etkili lokal anestezik (Bupivakain / Ropivakain) infiltrasyonu.',
      'Kronik Post-Mastektomi Ağrı Sendromu (PMPS) Profilaksisi: Agresif erken rejyonel analjezi, cerrahi sinir hasarlarının önlenmesi ve merkezi duyarlılaşmanın blokajı.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Günübirlik veya 23 Saatlik Kısa Yatışlı Cerrahi Protokolleri: MKC geçiren hastaların büyük çoğunluğu uygun analjezi ve antiemetik protokolü ile aynı gün veya ertesi sabah güvenle taburcu edilebilir.',
      'Opioid-Sparing Multimodal Analjezi ve Agresif PONV Profilaksisi: Erken taburculuğun en önemli iki engelini ortadan kaldırır.',
      'Erken Mobilizasyon ve Erken Oral Beslenme: Cerrahi bitiminden 1-2 saat sonra berrak sıvı alımı ve yatak dışı mobilizasyon.',
      'Postoperatif İpsilateral Kol Egzersizleri ve Lenfödem Eğitimi: Aksiller cerrahi geçiren hastaya kolda travma, tansiyon ölçümü ve aşırı yükten kaçınma eğitimi erken dönemde verilmelidir.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section I: General Surgery - Lumpectomy / Segmental Mastectomy & Sentinel Lymph Node Biopsy, pp. 273–278. Lippincott Williams & Wilkins.",
    erasReference: 'Temple-Oberle, C., et al. Clinical practice guidelines for Enhanced Recovery After Surgery (ERAS) in breast surgery. Enhanced Recovery After Surgery (ERAS®) Society Recommendations. Am J Surg / World J Surg.',
    prospectReference: 'PROSPECT Working Group. Evidence-based recommendations for postoperative pain management in oncological breast surgery and localized breast procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Blanco, R., et al. The pectoral nerves (PECS) block: a novel approach for breast surgery. Anaesthesia.',
      'ASA (American Society of Anesthesiologists). Practice Advisory for Preanesthesia Evaluation and Ambulatory Surgery Management. Anesthesiology.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 68: Ambulatory Anesthesia & Breast Surgery. Elsevier.',
      'Barash, P. G., et al. Clinical Anesthesia (8th ed.). Anesthesia for General and Oncologic Surgery. Lippincott Williams & Wilkins.'
    ]
  }
};
