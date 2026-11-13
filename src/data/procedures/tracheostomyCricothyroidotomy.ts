import { ProcedureDefinition } from '../../types/procedures';

/**
 * Trakeotomi / Trakeostomi ve Krikotiroidotomi: Cerrahi, Perkütan Dilatasyonel (PDT) ve Acil Krikotiroidotomi Girişimleri
 * (Tracheostomy and Cricothyroidotomy: Surgical Open Tracheostomy, Percutaneous Dilational Tracheostomy [PDT] and Emergency Cricothyrotomy)
 * 
 * Jaffe (5th ed., Section V: Otolaryngology - Larynx and Trachea: Tracheostomy and Cricothyrotomy, pp. 774-780),
 * Difficult Airway Society (DAS) 2015 Guidelines for Management of Unanticipated Difficult Intubation and CICO,
 * American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS) Clinical Consensus on Tracheostomy,
 * National Tracheostomy Safety Project (NTSP) UK,
 * Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) ve Türk Anesteziyoloji ve Reanimasyon Derneği (TARD) Protokolleri referans alınarak yapılandırılmıştır.
 */
export const tracheostomyCricothyroidotomy: ProcedureDefinition = {
  id: 'tracheostomy-and-cricothyroidotomy',
  name: 'Trakeostomi ve Krikotiroidotomi: Cerrahi, Perkütan (PDT) ve Acil Krikotiroidotomi Girişimleri',
  shortCode: 'KBB-TRAKEOSTOMI',
  specialty: 'kbb',
  specialtyName: 'Kulak Burun Boğaz',
  categoryTag: 'Hava Yolu Cerrahisi & Acil Girişimler',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Üst hava yolu obstrüksiyonunu aşmak, uzun süreli mekanik ventilasyon ihtiyacı olan yoğun bakım hastalarında laringeal hasarı ve ölü boşluğu azaltmak, bronşiyal sekresyon temizliğini sağlamak veya "Entübe Edilemeyen / Havalandırılamayan" (CICO - Cannot Intubate, Cannot Oxygenate) akut hava yolu krizinde hayat kurtarmak amacıyla trakeanın ya da krikotiroid membranın cerrahi veya perkütan dilatasyonel tekniklerle dış ortama ağızlaştırılması ameliyatıdır. Üç temel yaklaşım içerir: (1) Standart Cerrahi (Açık) Trakeostomi: Krikoid kıkırdak ile suprasternal çentik arasına yatay/dikey insizyon yapılır; pretrakal kaslar ekarte edilir; tiroid isthmusu klemplenip bağlanarak kesilir; 2. ve 3. trakeal halkalar arasından pencere (Björk flebi veya horizontal pencere) açılarak kaflı trakeostomi kanülü (Shiley, Portex) yerleştirilir; (2) Perkütan Dilatasyonel Trakeostomi (PDT): Yoğun bakım ünitelerinde bronkoskopi veya ultrasonografi kılavuzluğunda Seldinger tekniği ve tek aşamalı konik dilatatör (Ciaglia Blue Rhino) ile yatak başında uygulanır; (3) Acil Cerrahi Krikotiroidotomi (Koniyotomi): "CICO" tablosunda saniyeler içinde tiroid ve krikoid kıkırdaklar arasındaki krikotiroid membranın bistüri ile transvers kesilip baji (bougie) üzerinden 6.0 mm kaflı tüp yerleştirilerek hastanın oksijenlendirilmesi (Skalpel-Buji-Tüp tekniği).',
  indications: [
    'Uzamış Mekanik Ventilasyon ve Ventilatörden Ayırma (Weaning) Güçlüğü: Yoğun bakımda 10-14 günü aşan entübasyonlar',
    'Akut / Kronik Üst Hava Yolu Obstrüksiyonu: Larinks, dil kökü, hipofarinks tümörleri, bilateral vokal kord paralizisi, laringeal travma, Ludwig anjini, anjiyoödem',
    'Acil "Cannot Intubate, Cannot Oxygenate" (CICO) Felaketi: Maske ventilasyonu ve entübasyonun imkansız olduğu durumlarda acil krikotiroidotomi',
    'Kapsamlı Baş-Boyun ve Maksillofasiyal Kanser Cerrahileri: Komandolar, total larenjektomi, serbest flepli rekonstrüksiyonlar öncesi elektif trakeostomi',
    'Bronkopulmoner Hijyen ve Aspirasyon Koruması: Ağır nöromusküler hastalıklar (ALS, Guillain-Barré, kafa travması, inme) ve zayıf öksürük refleksi'
  ],
  averageDuration: '15 - 45 dakika (Acil Krikotiroidotomi: 1-3 dakika; Perkütan Trakeostomi [PDT]: 10-20 dakika; Açık Cerrahi Trakeostomi: 25-45 dakika)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 15 - 50 mL (Pretrakeal venöz pleksus ve tiroid isthmus kanamaları; isthmus sütüre edilip koterize edildiğinde sistemik kan kaybı düşüktür; ancak trakea içine sızan birkaç mililitre kan bile asfiksi yaratabilir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Risk / Ancak Trakeobronşiyal Ağaca Kan Aspirasyonu ve Boğulma (Asfiksi) Tehlikesi',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S opsiyonel; ancak dev guatr veya vasküler boyun tümörü olgularında kontrol edilir)',
    transfusionProbability: '< %0.01 (İzole trakeostomide transfüzyon endikasyonu yoktur)',
    criticalBleedingSources: [
      'Tiroid İsthmusu ve Tiroid İma Arteri: İsthmus diseksiyonunda arteriyel kanama',
      'İnferior Tiroid Venleri ve Anterior Juguler Venöz Pleksus: Trakea önündeki zengin venöz ağ',
      'Brakisoyefalik (İnnominat) Arter Anomalisi: Yüksek yerleşimli innominat arter (özellikle 4. halka altına inildiğinde veya kifotik olgularda ölümcül masif kanama riski)'
    ],
    hemostasisStrategies: [
      'Trakea lümeni açılmadan önce tiroid isthmusunun klemplenerek emilebilir sütürlerle (2-0 veya 3-0 vikril) çift taraflı bağlanması ve hemostazın tam teyidi',
      'Pretrakeal venlerin bipolar koter ile titizlikle koagüle edilmesi',
      'Trakea içine kan kaçışını önlemek için trakeal aspiratörün sürekli hazır tutulması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Entübe Hastada: Genel Endotrakeal Anestezi (GETA) + Tam Nöromusküler Blokaj + Trakea Açılırken FiO2 < %30 (Yangın Güvenliği) + Kanül Girişinde Koordineli Tüp Çekimi — DÜNYA GENELİNDE ALTIN STANDARTTIR',
      'Zor Hava Yolu / Laringeal Kitle Olgusunda: Lokal İnfiltrasyon Anestezisi (Lidokain %2 + 1:100.000 Epinefrin) + Bilinçli Uyanık Trakeostomi (Awake Tracheostomy): Hava yolu güvenliği sağlanana kadar hasta uyanık, spontan solunumda ve koopere tutulur'
    ],
    alternative: [
      'Acil CICO Durumunda: Spontan solunumu durmuş hastada derhal lokal anestezik beklemeksizin cerrahi krikotiroidotomi (Skalpel-Buji-Tüp tekniği) uygulanır',
      'Yoğun Bakımda PDT: Sedoanaljezi (Propofol + Fentanil/Remifentanil) + Kas gevşetici + Fleksibl Bronkoskopi kılavuzluğunda'
    ],
    clinicalRationale: 'Entübe olgularda genel anestezi ve tam kas gevşemesi trakeal pencere açılırken öksürük/hareketi ve kan aspirasyonunu engellerken, üst hava yolunu tıkayan kitlelerde indüksiyonla gelişebilecek tam obstrüksiyondan kaçınmak için spontan solunum altında lokal anesteziyle uyanık trakeostomi altın standarttır. Hava yolu geçişinde kaflı kanül trakeada EtCO2 ile doğrulanana kadar mevcut oral tüp tamamen çıkarılmaz, yalnızca subglottise çekilerek kurtarma yedeği olarak tutulur.',
    rulesTitle: 'TRAKEOSTOMİ VE KRİKOTİROİDOTOMİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'TRAKEOSTOMİ VE KRİKOTİROİDOTOMİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) ORAL TÜPÜN GERİ ÇEKİLMESİ VE KANÜL GEÇİŞİNDE (SWITCH FAZI) "TÜPÜ ASLA TAM ÇIKARMAMA" DİSİPLİNİ — Ameliyatın en ölümcül evresi trakea penceresi açıldığında oral endotrakeal tüpün geri çekilip trakeostomi kanülünün takıldığı andır. Oral tüp KESİNLİKLE TAMAMEN ÇIKARILMAZ! Cerrah trakea penceresini açtığında oral tüp kafı indirilir ve tüpün ucu trakeostomi deliğinin hemen üstüne (subglottise) gelecek şekilde birkaç santimetre geri çekilir. Trakeostomi kanülü takılıp kafı şişirilmeden, göğüs kafesinin simetrik kalktığı görülmeden ve monitörde EtCO2 dalgası doğrulanmadan oral tüp ağızdan ASLA atılmaz! Eğer kanül yalancı yola (pretrakeal) girer veya takılamazsa, subglottisteki oral tüp saniyeler içinde tekrar trakea içine itilerek hasta derhal havalandırılır. (2) TRAKEA AÇILIRKEN HAVA YOLU YANGINI (AIRWAY FIRE) ÖNLEMİ VE "FİO2 < %30" KURALI — Cerrahi koter kullanımı esnasında trakea lümeni açıldığı anda trakea içindeki yüksek konsantrasyonlu oksijen kıvılcımla temas ederse anında ölümcül Hava Yolu Yangını (Airway Fire) patlak verir! Cerrah trakeayı açmadan önce anesteziye "TRAKEA AÇILIYOR" uyarısı verir. Anestezi uzmanı derhal FiO2\'yi < %30 seviyesine (Hava/O2) düşürür ve varsa N2O\'yu tamamen kapatır. Trakea kıkırdağı ve lümeni elektrokoterle değil, KESİNLİKLE SOĞUK BİSTÜRİ ile açılmalıdır! (3) YALANCI GEÇİŞ (FALSE PASSAGE) VE MASİF SUBKUTAN AMFİZEM / PNÖMOTORAKS ALARMI — Trakeostomi kanülü özellikle obez, kısa boyunlu veya derin trakealı hastalarda kıkırdak pencereden içeri girmek yerine pretrakeal fasya aralığına veya anterior mediastene kayabilir (Yalancı Yol). Bu yalancı lümene pozitif basınçlı ventilasyon verilmesi saniyeler içinde masif subkutan amfizeme, pnömomediastene, tansiyon pnömotoraksa ve kardiyak arreste yol açar! Kanül yerleştirildiği an kapnografide EtCO2 dalgası görülmeli, iki taraflı solunum sesleri dinlenmeli ve gerekirse fleksibl bronkoskop ile kanül ucunun trakea içinde olduğu doğrudan teyit edilmelidir. (4) TİROİD İSTHMUS KANAMASI VE BRONŞİYAL AĞACA KAN BOŞALMASI (ASFİKSİ) ÖNLEMİ — Tiroid bezi isthmusu 2. ve 3. trakeal halkaların tam üzerinden geçer; inferior tiroid venleri ve tiroid ima arteri son derece geniştir. Trakea lümeni açılmadan önce isthmus titizlikle klemplenmeli, kesilmeli ve sütür ligasyonla hemostazı tam sağlanmalıdır! Aksi takdirde trakea açıldığı anda kan yerçekimiyle doğrudan distal bronşlara ve alveollere dökülerek hastanın kendi kanında boğulmasına (akut asfiksi ve hipoksi) yol açar. Trakea lümeni daima aspiratörle kuru tutulmalıdır. (5) ACİL KRİKOTİROİDOTOMİDE "CANNOT INTUBATE, CANNOT OXYGENATE" (CICO) ALGORİTMASI VE DİREKSİYONEL GÜVENLİK — Entübe edilemeyen ve ventile edilemeyen CICO krizinde Krikotiroidotomi hayat kurtaran son basamaktır. Tiroid ve krikoid kıkırdaklar arasındaki krikotiroid membran palpe edilir; skalpel ile transvers insizyon yapılır; baji (bougie) trakea içine yönlendirilir ve baji üzerinden 6.0 mm kaflı tüp kaydırılır (Skalpel-Buji-Tüp tekniği). İnsizyonun krikoid kıkırdağı parçalamaması ve posterior trakea duvarını / özofagusu delmemesi için bıçak 1-1.5 cm\'den derin sokulmamalıdır!',
    indispensableRules: [
      {
        number: 1,
        title: 'ORAL TÜPÜN GERİ ÇEKİLMESİ VE KANÜL GEÇİŞİNDE (SWITCH FAZI) "TÜPÜ ASLA TAM ÇIKARMAMA" DİSİPLİNİ',
        content: 'Ameliyatın en ölümcül evresi trakea penceresi açıldığında oral endotrakeal tüpün geri çekilip trakeostomi kanülünün takıldığı andır. Oral tüp KESİNLİKLE TAMAMEN ÇIKARILMAZ! Cerrah trakea penceresini açtığında oral tüp kafı indirilir ve tüpün ucu trakeostomi deliğinin hemen üstüne (subglottise) gelecek şekilde birkaç santimetre geri çekilir. Trakeostomi kanülü takılıp kafı şişirilmeden, göğüs kafesinin simetrik kalktığı görülmeden ve monitörde EtCO2 dalgası doğrulanmadan oral tüp ağızdan ASLA atılmaz! Eğer kanül yalancı yola (pretrakeal) girer veya takılamazsa, subglottisteki oral tüp saniyeler içinde tekrar trakea içine itilerek hasta derhal havalandırılır.'
      },
      {
        number: 2,
        title: 'TRAKEA AÇILIRKEN HAVA YOLU YANGINI (AIRWAY FIRE) ÖNLEMİ VE "FİO2 < %30" KURALI',
        content: 'Cerrahi koter kullanımı esnasında trakea lümeni açıldığı anda trakea içindeki yüksek konsantrasyonlu oksijen kıvılcımla temas ederse anında ölümcül Hava Yolu Yangını (Airway Fire) patlak verir! Cerrah trakeayı açmadan önce anesteziye "TRAKEA AÇILIYOR" uyarısı verir. Anestezi uzmanı derhal FiO2\'yi < %30 seviyesine (Hava/O2) düşürür ve varsa N2O\'yu tamamen kapatır. Trakea kıkırdağı ve lümeni elektrokoterle değil, KESİNLİKLE SOĞUK BİSTÜRİ ile açılmalıdır!'
      },
      {
        number: 3,
        title: 'YALANCI GEÇİŞ (FALSE PASSAGE) VE MASİF SUBKUTAN AMFİZEM / PNÖMOTORAKS ALARMI',
        content: 'Trakeostomi kanülü özellikle obez, kısa boyunlu veya derin trakealı hastalarda kıkırdak pencereden içeri girmek yerine pretrakeal fasya aralığına veya anterior mediastene kayabilir (Yalancı Yol). Bu yalancı lümene pozitif basınçlı ventilasyon verilmesi saniyeler içinde masif subkutan amfizeme, pnömomediastene, tansiyon pnömotoraksa ve kardiyak arreste yol açar! Kanül yerleştirildiği an kapnografide EtCO2 dalgası görülmeli, iki taraflı solunum sesleri dinlenmeli ve gerekirse fleksibl bronkoskop ile kanül ucunun trakea içinde olduğu doğrudan teyit edilmelidir.'
      },
      {
        number: 4,
        title: 'TİROİD İSTHMUS KANAMASI VE BRONŞİYAL AĞACA KAN BOŞALMASI (ASFİKSİ) ÖNLEMİ',
        content: 'Tiroid bezi isthmusu 2. ve 3. trakeal halkaların tam üzerinden geçer; inferior tiroid venleri ve tiroid ima arteri son derece geniştir. Trakea lümeni açılmadan önce isthmus titizlikle klemplenmeli, kesilmeli ve sütür ligasyonla hemostazı tam sağlanmalıdır! Aksi takdirde trakea açıldığı anda kan yerçekimiyle doğrudan distal bronşlara ve alveollere dökülerek hastanın kendi kanında boğulmasına (akut asfiksi ve hipoksi) yol açar. Trakea lümeni daima aspiratörle kuru tutulmalıdır.'
      },
      {
        number: 5,
        title: 'ACİL KRİKOTİROİDOTOMİDE "CANNOT INTUBATE, CANNOT OXYGENATE" (CICO) ALGORİTMASI VE DİREKSİYONEL GÜVENLİK',
        content: 'Entübe edilemeyen ve ventile edilemeyen CICO krizinde Krikotiroidotomi hayat kurtaran son basamaktır. Tiroid ve krikoid kıkırdaklar arasındaki krikotiroid membran palpe edilir; skalpel ile transvers insizyon yapılır; baji (bougie) trakea içine yönlendirilir ve baji üzerinden 6.0 mm kaflı tüp kaydırılır (Skalpel-Buji-Tüp tekniği). İnsizyonun krikoid kıkırdağı parçalamaması ve posterior trakea duvarını / özofagusu delmemesi için bıçak 1-1.5 cm\'den derin sokulmamalıdır!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'KBB / Baş-Boyun Cerrahisi Konsültasyonu: Trakeostomi endikasyonu, boyun anatomisi (kısa, kalın boyun, guatr varlığı, radyoterapi skarları), krikoid kıkırdak ve suprasternal çentik mesafesi.',
      'Boyun Ultrasonografisi / BT: Pretrakeal damarsal yapılar, vasküler anomaliler (yüksek innominat arter) ve tiroid isthmus kalınlığının değerlendirilmesi.',
      'Göğüs Hastalıkları / Yoğun Bakım: Ventilatör parametreleri, sekresyon yükü ve PEEP gereksinimi (yüksek PEEP kanül değişimi anında desatürasyon riskini artırır).',
      'Anestezi Acil Hazırlığı: Zor hava yolu kiti, videolaringoskop, baji ve trakeostomi kanül boyutu seçimi (kadınlarda No 7.0-7.5, erkeklerde No 8.0-8.5).'
    ],
    historyAndPhysical: [
      'Entübasyon Süresi: Uzun süreli entübe hastalarda subglottik granülasyon veya trakeal zedelenme öyküsü.',
      'Koagülasyon Durumu: Yoğun bakımda antikoagülan (heparin / DMAH / antiagregan) kullanan hastalarda kanama profili.',
      'Önceki Boyun Cerrahisi veya Radyoterapi: Skar dokusu, trakeanın deviasyonu ve anatomik işaret noktalarının silinmesi.',
      'Servikal Omurga İnstabilitesi: Travma hastalarında boyun hiperekstansiyon kısıtlılığı.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen.',
      'Arteriyel Kan Gazı (AKG): PaO2, PaCO2 ve asit-baz dengesi.',
      'Açlık Kan Şekeri, Serum Elektrolitleri ve Böbrek Fonksiyonları.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, NIBP, EtCO2 ve Sıcaklık.',
      'Sürekli Kapnografi (EtCO2): Kanül trakeaya girdikten sonra doğrulamada ve bronkospazm/hipoventilasyon tespitinde en kritik parametredir.',
      'Nöromusküler Monitörizasyon (TOF): Trakea diseksiyonu ve pencere açılması esnasında hastanın öksürmemesi için TOF 0/4 tam blokaj sürdürülür.',
      'Ventilasyon Tepe Basınçları ($P_{peak}$): Kanül yalancı yola girdiğinde veya kaf aşırı şiştiğinde ani basınç yükselmesi saptanır.'
    ],
    vascularAccess: [
      'En az 1-2 adet geniş lümenli periferik intravenöz damar yolu (16-18G)',
      'Yoğun bakım hastalarında mevcut santral venöz kateter (SVK) ve arter hattı',
      'Acil Bradikardi Kiti: İntravenöz Atropin (0.5 mg ampul)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Omuzların Altına Rulo Yastık Konularak Boyun Hiperekstansiyonda',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; omuzların ve skapulaların altına silikon rulo/yastık konularak boyun ekstansiyona getirilir ve trakea öne doğru belirginleştirilir (servikal omurga travması olmayan olgularda!).',
      'Baş simetrik ve nötral hatta tutulur; başın yana dönmesi trakeanın deviye olmasına yol açar.',
      'Cerrahi örtüler göğüs ve çene açıkta kalacak şekilde steril örtülür; anestezi ekibi endotrakeal tüpü ağızdan kolayca yönetebilmelidir.'
    ],
    anesthesiaManagement: [
      'Genel Anestezi İdamesi:',
      '  - TIVA (Propofol + Remifentanil) veya volatil anestezi + Tam nöromusküler blokaj (Rokuronyum).',
      '  - Cerrahi esnasında hastanın en ufak bir öksürmesi veya ıkınması trakea çevresi venleri patlatarak cerrahi sahayı kan gölüne çevirir!',
      'Yangın Güvenliği Fazı (Trakea Açılmadan Hemen Önce):',
      '  - Cerrah uyarısıyla FiO2 derhal < %30 seviyesine düşürülür.',
      '  - N2O tamamen kapatılır; hava/oksijen karışımı verilir.',
      '  - Trakea duvarı soğuk bistüri ile açılır; koter kapatılır.',
      'Tüp Değişimi (Switch) Fazı:',
      '  - Cerrah trakea penceresini açıp trakeostomi kanülünü yerleştirmeye hazır olduğunda anesteziye haber verir.',
      '  - Anestezi uzmanı oral tüpün kafını indirir ve tüpü nazikçe trakeostomi deliğinin hemen üzerine (subglottise) çeker (TÜP AĞIZDAN ASLA ÇIKARILMAZ!).',
      '  - Cerrah kanülü yerleştirir; anestezi devresi kanüle bağlanır, kanül kafı şişirilir.',
      '  - Kapnografide 3-5 adet düzenli EtCO2 dalgası görüldükten ve bilateral solunum sesleri dinlendikten sonra oral tüp ağızdan tamamen çıkarılır.'
    ],
    airwayManagement: [
      'Trakeostomi kanülü takıldıktan sonra manşon (kaf) basıncı 20-25 cmH2O seviyesinde ayarlanır.',
      'Kanülün boyun bağı (tracheostomy tape) boyuna çok sıkı veya çok gevşek olmayacak şekilde (boyun ile bağ arasına 1 parmak girecek sıklıkta) bağlanır.',
      'Kanülün yan kanatları (flanşları) cilde 2-0 veya 3-0 ipek dikişlerle dört köşeden tespit edilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma (Omuz altı rulo) ve Cerrahi Sahada Trakeanın Palpasyonu.',
      '2. Krikoid Kıkırdağın 1-2 cm Altından Yatay Collar Cilt İnsizyonu Yapılması.',
      '3. Platisma ve Strap Kasların (Sternohiyoid, Sternotiroid) Orta Hatta Diseksiyonu.',
      '4. Tiroid İsthmusunun Ortaya Konması, Çift Taraflı Klemplenerek Kesilmesi ve Sütür Ligasyonu.',
      '5. Trakea Ön Duvarının Temizlenmesi (2. ve 3. kıkırdak halkaların belirlenmesi).',
      '6. YANGIN GÜVENLİĞİ: FiO2 < %30\'a düşürülmesi ve cerraha onay verilmesi.',
      '7. Trakea Ön Duvarının Soğuk Bistüri ile İnsizyonu (Björk flebi veya pencere açılması).',
      '8. Oral Tüpün Kafının İndirilerek Subglottise Geri Çekilmesi.',
      '9. Kaflı Trakeostomi Kanülünün Trakea İçine İlerletilmesi (Obtüratörün çıkarılması).',
      '10. Kanül Kafının Şişirilmesi, Ventilatör Bağlantısı, EtCO2 Dalga Formu ve Akciğer Seslerinin Teyidi.',
      '11. Oral Tüpün Ağızdan Çıkarılması, Kanül Flanşlarının Cilde Dikilmesi ve Boyun Bağı ile Tespiti.'
    ],
    emergenceNotes: [
      'Hasta yoğun bakım hastası ise kanül güvenle tespit edildikten sonra entübe/kanüle olarak mekanik ventilatör eşliğinde yoğun bakıma transfer edilir.',
      'Elektif cerrahi hastası ise nöromusküler blokaj Sugammadeks ile geri döndürülür; hasta trakeostomi kanülünden spontan solurken uyanır.',
      'Kanül içinden trakeobronşiyal aspirasyon nazikçe yapılır; öksürük krizi ve kanama engellenir.',
      'Postoperatif akciğer grafisi çekilerek kanül ucu derinliği (karinadan 2-3 cm yukarıda) ve pnömotoraks yokluğu doğrulanır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Trakeostomi sonrası ağrı genellikle hafif-orta düzeydedir ve cerrahi insizyon sahasında sızlama şeklindedir.',
      'İntravenöz Parasetamol (1000 mg) her 6 saatte bir bazal analjezi için yeterlidir.',
      'Gereğinde hafif doz Tramadol (50 mg).',
      'Sekresyonların kurumasını ve kanülün tıkaçla (mukus tıkacı) tıkanmasını önlemek için nemlendirilmiş O2 (soğuk/sıcak buhar) verilmesi hayati önem taşır.'
    ],
    prospectRecommendations: [
      'PROSPECT Havayolu ve Baş-Boyun Rehberleri:',
      'Preoperatif ve intraoperatif multimodal analjezi;',
      'Postoperatif dönemde şiddetli öksürük ve ıkınmanın önlenmesi (kanama ve cilt altı amfizemi engellemek için);',
      'Kanül çevresine lokal anestezik infiltrasyonu ile postoperatif yutkunma ve boyun ağrısının baskılanması.'
    ],
    erasRecommendations: [
      'ERAS ve NTSP (National Tracheostomy Safety Project) Protokolleri:',
      'İLK KANÜL DEĞİŞİMİ YASAĞI: Cerrahi trakt oluşana kadar (ilk 5-7 gün) trakeostomi kanülü KESİNLİKLE DEĞİŞTİRİLMEZ (kanül çıkarsa trakt kollabe olur ve acil hava yolu kaybı gelişir!).',
      'Yatak Başında Acil Güvenlik Ekipmanı: Her trakeostomili hastanın yatak başında aynı boyda ve bir boy küçük yedek kanül, trakeal dilatatör (Laborde forsepsi) ve aspiratör hazır bulundurulmalıdır.',
      'Düzenli İç Kanül (Inner Cannula) Temizliği: Mukus tıkacına bağlı boğulmaları önlemek için iç kanül her 4-6 saatte bir çıkarılıp yıkanmalıdır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section V: Otolaryngology - Larynx and Trachea: Tracheostomy and Cricothyrotomy, pp. 774-780.',
    erasReference: 'Difficult Airway Society (DAS) 2015 Guidelines: Management of Severe Upper Airway Obstruction and Surgical Cricothyroidotomy.',
    prospectReference: 'PROSPECT Guidelines: Perioperative Management of Tracheostomy and Cricothyroidotomy in Head and Neck Surgery.',
    otherReferences: [
      'National Tracheostomy Safety Project (NTSP) UK: Comprehensive Tracheostomy Care and Emergency Airway Algorithms.',
      'American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS): Clinical Consensus Statement: Tracheostomy Care.',
      'Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC): Trakeostomi Açılması, Bakımı ve Komplikasyon Yönetimi Kılavuzu.'
    ]
  }
};
