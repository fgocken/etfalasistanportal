import { ProcedureDefinition } from '../../types/procedures';

/**
 * Orta ve Alt Servikal Omurga Anterior Füzyon ve Fiksasyonu: Anterior Servikal Diskektomi ve Füzyon (ACDF / ACCF)
 * (Anterior Fusion/Fixation of The Mid and Lower Cervical Spine: ACDF / ACCF)
 *
 * Jaffe (6th ed., 2020), AO Spine / Praxis (2024), CSRS, NASS, SNACC,
 * PROSPECT (2021) ve ERAS Society (2021) kılavuzları referans alınarak yapılandırılmıştır.
 */
export const anteriorMidLowerCervicalFusion: ProcedureDefinition = {
  id: 'anterior-mid-lower-cervical-fusion',
  name: 'Orta ve Alt Servikal Omurga Anterior Füzyon ve Fiksasyonu: Anterior Servikal Diskektomi ve Füzyon (ACDF / ACCF)',
  shortCode: 'ACDF-ACCF',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Spinal Nöroşirürji & Omurga Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orta ve alt servikal omurgada (C3-C7 ve C7-T1 bileşkesi) disk hernisi, spondilotik miyelopati, travmatik kırık-çıkık veya spinal instabilite olgularında; anterior Smith-Robinson yaklaşımı ile trakea ve özofagus mediale, karotid kılıf (A. carotis communis ve V. jugularis interna) laterale ekarte edilerek omurga ön yüzüne ulaşılması, bası yapan dejeneratif diskin (ACDF) veya korpusun (ACCF / korpektomi) ve osteofitlerin mikrocerrahi ile çıkarılarak omurilik ve sinir köklerinin dekomprese edilmesi, ardından boşalan mesafeye otolog/allogreft kemik veya PEEK/titanyum kafes (cage) yerleştirilip anterior titanyum plak ve vidalarla kalıcı biyomekanik fiksasyon sağlanması ameliyatıdır.',
  indications: [
    'Servikal Spondilotik Miyelopati (CSM): Omurilik basısına bağlı el beceriksizliği, ataksik yürüyüş, hiperrefleksi ve patolojik refleksler (Hoffmann, Babinski) gösteren C3-C7 arası tek veya çok seviyeli anterior spinal kord basıları',
    'Servikal Radikülopati: Medikal ve fizik tedaviye dirençli, dermatom boyunca yayılan şiddetli radiküler kol ağrısı, parestezi ve motor kayıp yaratan servikal disk hernileri',
    'Servikal Travma ve Kırık-Çıkıklar: C3-C7 instabil burst kırıkları, tear-drop kırıkları veya faset subluksasyonları',
    'Posterior Longitudinal Ligaman Ossifikasyonu (OPLL): Anterior bası yaratan servikal kalsifikasyonlar (ACCF gerektiren olgular)',
    'Servikal Kifoz ve Deformite Düzeltilmesi',
    'Servikal Vertebra Tümörleri veya Osteomiyelit / Diskit Sekeli: Korpektomi, dekompresyon ve kafes/plak rekonstrüksiyonu',
    'Psödoartroz veya Komşu Segment Hastalığı (ASD): Önceki füzyon cerrahisi sonrası gelişen instabilite veya komşu disk dejenerasyonu'
  ],
  averageDuration: '1.5 - 4.0 saat (Tek seviye ACDF: 1.5 - 2.0 saat; Çok seviyeli [2-3 seviye] ACDF veya korpektomi [ACCF]: 2.5 - 4.0 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '50 - 250 mL (Standart tek-çift seviye ACDF\'de 50-150 mL; korpektomi [ACCF], travma veya tümör rezeksiyonlarında 200-500 mL)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük - Orta Düzey Risk (Ancak Boyundaki Zengin Damar Yatağı ve Dar Servikal Alanda Küçük Bir Hematom Dahi Ölümcül Hava Yolu Tıkanıklığı Yaratır)',
    crossMatchRequirement: 'Tip & Screen (T&S) kan grubu doğrulaması zorunludur; çok seviyeli korpektomi veya travma olgularında 1-2 Ünite Eritrosit Süspansiyonu (ES) hazır bulundurulmalıdır',
    transfusionProbability: '< %3 (Standart ACDF); korpektomi ve travma olgularında %10 - %20',
    criticalBleedingSources: [
      'A. Carotis Communis ve V. Jugularis Interna (Karotid kılıfın lateral ekartasyonunda vasküler adventisya yırtılması veya traksiyon hasarı)',
      'A. Thyroidea Superior ve A. Thyroidea Inferior Dalları (Prevertebral diseksiyonda bağlanması gerekebilir)',
      'A. Vertebralis (Özellikle korpektomi sırasında unkovertebral eklem sınırları [Luschka eklemi] aşıldığında foramen transversariumdaki vertebral arterin yırtılması — masif fışkırıcı kanama ve beyin sapı iskemisi riski!)',
      'Prevertebral Venöz Pleksus ve Korpus Kemik Süngeröz Kanamaları'
    ],
    hemostasisStrategies: [
      'Mikronöroşirürjikal bipolar koagülasyon (monopolar koter trakea, özofagus ve karotid kılıf komşuluğunda KESİNLİKLE kullanılmaz)',
      'Vertebra korpus ve posterior longitudinal ligaman kanamalarında kemik mumu ve hemostatik ajanlar (FloSeal, Surgicel, pamuk basısı)',
      'Vertebral arter yaralanması şüphesinde anında FloSeal tamponadı, cerrahi klips veya mikro-dikiş; acil anjiyo-embolizasyon hazırlığı',
      'Operasyon sahasına subfasial negatif basınçlı mini-dren yerleştirilmesi; permisif / kontrollü hipotansiyondan KESİNLİKLE kaçınılır'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi — Saf TIVA (Propofol + Remifentanil): İntraoperatif tcMEP ve SSEP nöromonitörizasyonu yapılan miyelopati, OPLL, travma ve çok seviyeli ACDF/ACCF olgularında ALTIN STANDARTTIR',
      'İONM Yapılmayan Standart Tek Seviye Radikülopati ACDF İçin: Genel Anestezi + Standart Doz Volatil Anestezik (0.8–1.0 MAC Sevofluran/Desfluran) + Titre Edilmiş Opioid (N₂O KULLANILMAZ)'
    ],
    alternative: [
      'İONM Yapılan Olgularda Zorunlu Kombinasyon: Düşük Doz Volatil Anestezik (≤ 0.5 MAC, tercihen < 0.3–0.5 MAC) + Sürekli Remifentanil İnfüzyonu (N₂O KESİNLİKLE KONTRENDİKE!)'
    ],
    clinicalRationale: 'İntraoperatif tcMEP/SSEP monitörizasyonu gereken anterior servikal cerrahide sinyalleri baskılamamak için kürarsız saf Propofol + Opioid TIVA (N₂O kesinlikle yok) altın standarttır. Miyelopatik/instabil servikal kordda ekstansiyondan kaçınmak için MILS + videolaringoskop veya AFOI ile nötral entübasyon, Caspar ekartör basısı altında lümen kollapsını önlemek için karşı ağız köşesine sabitlenen spiral telli ETT seçimi zorunludur.',
    notes: 'ACDF/ACCF TEMEL ANESTEZİ İLKELERİ: (1) NÖTRAL HAVA YOLU VE SCI\'DE SÜKSİNİLKOLİN YASAĞI; (2) EKARTÖR SONRASI ETT KAF DEFLASYONU (RLN KORUMASI); (3) İONM İÇİN SAF TIVA, N₂O YASAĞI VE BİLATERAL YUMUŞAK BITE BLOCK; (4) PERMİSİF HİPOTANSİYON YASAĞI VE AO SPINE 2024 MAP; (5) GENİŞLEYEN BOYUN HEMATOMUNDA ACİL YATAKBAŞI DİKİŞ/FASYA AÇMA PROTOKOLÜ.',
    rulesTitle: 'ANTERİOR SERVİKAL FÜZYONDA (ACDF / ACCF) 5 VAZGEÇİLMEZ ANESTEZİ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'İNSTABİL/MİYELOPATİK BOYUNDA NÖTRAL ENTÜBASYON VE SCI\'DE SÜKSİNİLKOLİN YASAĞI',
        content: 'Şiddetli CSM, OPLL veya travmatik servikal kırıkta direkt laringoskopi ile boyun ekstansiyonu masif kord iskemisi ve kuadripleji yaratır; MILS eşliğinde Videolaringoskopi veya Uyanık Fiberoptik Entübasyon (AFOI) uygulanır. Akut/subakut SCI, üst motor nöron lezyonu (>24–48 saat) ve uzun immobilizasyonda Süksinilkolin ölümcül hiperkalemik kardiyak arrest nedeniyle KESİNLİKLE KONTRENDİKEDİR (yerine orta etkili Rokuronyum kullanılır).'
      },
      {
        number: 2,
        title: 'EKARTÖR SONRASI ETT KAF BASINCI DEFLASYONU (RLN KORUMASI)',
        content: 'Cerrah Caspar/Cloward ekartörlerini açıp trakea-özofagusu mediale çektiğinde ETT kaf basıncı hızla yükselir ve Rekürren Laringeal Siniri (RLN) sıkıştırır. Ekartör yerleşiminden hemen sonra ETT kafı indirilip (deflate) yalnızca kaçağı önleyecek minimum basınca (20–22 cmH2O) manometreyle yeniden ayarlanmalıdır.'
      },
      {
        number: 3,
        title: 'İONM (tcMEP/SSEP) İÇİN SAF TIVA, N₂O YASAĞI VE BİLATERAL YUMUŞAK BITE BLOCK',
        content: 'Miyelopati/OPLL/travma olgularında pozisyonlama öncesi ve sonrası bazal tcMEP/SSEP doğrulanmalıdır. Saf Propofol + Opioid TIVA altın standarttır (zorunlu volatil ≤ 0.5 MAC, tercihen < 0.3–0.5 MAC; N₂O KESİNLİKLE KULLANILMAZ; idamede kas gevşetici yok). tcMEP sırasında dil/dudak laserasyonu ve diş kırığını önlemek için bilateral yumuşak gazlı bez rulo molar bite block zorunludur (sert plastik Guedel airway KULLANILMAZ).'
      },
      {
        number: 4,
        title: 'SPİNAL KORD PERFÜZYONU (PERMİSİF HİPOTANSİYON YOK) VE AO SPINE 2024 HEDEFLERİ',
        content: 'Permisif/kontrollü hipotansiyondan KESİNLİKLE kaçınılır. Miyelopati/servikal stenozda MAP ≥ 80–85 mmHg; akut travmatik SCI\'de (AO Spine/Praxis 2024) MAP alt sınır 75–80 mmHg, üst sınır 90–95 mmHg (3–7 gün) hedeflenir. Rutin yüksek doz NASCIS metilprednizolon güncel AANS/CNS ve AO Spine kılavuzlarınca önerilmez.'
      },
      {
        number: 5,
        title: 'GENİŞLEYEN BOYUN HEMATOMUNDA ACİL YATAKBAŞI DİKİŞ/ZIMBA VE DERİN FASYA AÇMA PROTOKOLÜ',
        content: 'Anterior servikal cerrahinin en ölümcül erken komplikasyonu genişleyen prevertebral hematom ve retrofaringeal ödemdir. Stridor, dispne veya boyunda gergin şişlikte re-entübasyon için beklenmeden, re-entübasyondan ÖNCE veya EŞZAMANLI olarak yatakbaşında cilt dikiş/zımbaları ve derin platizma/fasya tabakaları DERHAL açılarak hematom boşaltılmalıdır. Yatakbaşında acil dikiş/zımba açma seti ve cerrahi hava yolu kiti hazır bulundurulur.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji / Nöroşirürji Konsültasyonu: Servikal miyelopati derecesi (Nurick skalası, mJOA skoru), etkilenen dermatom ve myotom seviyeleri, patolojik refleksler (Hoffmann, Babinski, klonus) ve bazal motor güç belgelenmelidir.',
      'Kardiyoloji Konsültasyonu: İleri yaş hastalarda eşlik eden koroner arter hastalığı, hipertansiyon ve serebrovasküler hastalık rezervi; karotid arter ekartasyonunun tolere edilebilirliği.',
      'KBB Konsültasyonu: Preoperatif ses kısıklığı öyküsü veya daha önce geçirilmiş anterior boyun cerrahisi (önceki cerrahi tarafında kompanse asemptomatik vokal kord paralizisi olabilir; ikinci girişimde karşı taraf RLN felci gelişirse iki taraflı kord felci ve tam hava yolu tıkanıklığı doğar; vokal kord muayenesi zorunludur!).',
      'Göğüs Hastalıkları Konsültasyonu: Miyelopatik hastalarda diyafram kas gücü, restriktif solunum disfonksiyonu ve uyku apnesi tespiti.'
    ],
    historyAndPhysical: [
      'Spinal Kord İskemisi ve İnstabilite Taraması: Boyun hareketleriyle kollarda elektriklenme hissi (Lhermitte belirtisi), yürüme ataksisi ve spastisite varlığı.',
      'Zor Hava Yolu Taraması: Servikal fleksiyon ve ekstansiyon kısıtlılığı, kısa ve kalın boyun, diş yapısı ve Mallampati skoru (boyna ekstansiyon verilmeden değerlendirilir).',
      'Karotid Arter Patolojisi: Boyun üfürümü sorgulaması ve karotid darlığı öyküsü (ameliyatta karotid kılıf daima LATERALE ekarte edilir; ciddi karotid stenozda kros-bası/iskemi riski değerlendirilir).',
      'Disfaji, Kronik Opioid & Sigara Taraması: Preoperatif bazal yutma fonksiyonu, kronik opioid toleransı ve füzyon kaynama oranı için ≥ 4 hafta önce sigara bırakma danışmanlığı (ERAS 2021).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı ve Preop PBM / Anemi Optimizasyonu: Hb, Hct, Trombosit ≥ 100.000/mm³; elektif çok seviyeli korpektomide 4 hafta önce ferritin/anemi taraması ve gerekirse IV demir.',
      'Koagülasyon Paneli: PT, aPTT, INR tam normal olmalıdır (servikal hematom gelişimini önlemek için antikoagülan ve antiagreganlar kılavuzlara uygun kesilmiş olmalıdır).',
      'Serum Elektrolitleri, BUN, Kreatinin ve Glukoz düzeyi (perioperatif glisemik hedef 140–180 mg/dL).',
      'Kan Grubu, Antikor Tarama ve T&S doğrulaması (korpektomi planlanan olgularda 1–2 Ünite ES Cross-Match).',
      'Servikal Görüntüleme (MRG / BT ve Dinamik Grafi Uyarısı): Kronik dejeneratif instabilitede dinamik fleksiyon-ekstansiyon grafileri incelenir; ANCAK AKUT SERVİKAL TRAVMA, KIRIK VEYA AĞIR İNSTABİLİTEDE DİNAMİK FLEKSİYON-EKSTANSİYON GRAFİSİ KESİNLİKLE KONTRENDİKEDİR!'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 (normokapni 35–40 mmHg) ve Sıcaklık.',
      'İnvaziv Arter Basıncı İzlemi (A-Line — Flebotatik Aks / Sağ Atriyum Sıfırlaması): Miyelopatisi olan, çok seviyeli korpektomi yapılan, akut SCI veya kardiyovasküler riskli hastalarda sürekli MAP takibi için önerilir.',
      'İntraoperatif Nöromonitörizasyon (İONM): Miyelopati/OPLL/travma ve çok seviyeli olgularda bilateral tcMEP ve SSEP kaydı; pozisyonlama öncesi (bazal) ve boyun/omuz pozisyonlaması sonrası kayıtlar karşılaştırılır.',
      'Kantitatif Nöromusküler İleti İzlemi (TOF): tcMEP izlemi için ameliyat boyunca TOF oranı ≥ 0.90 (4/4) tutulur; idamede kas gevşetici verilmez.',
      'Endotrakeal Tüp Kaf Manometresi: Ekartörler açıldıktan sonra tüp kaf basıncını 20–22 cmH2O seviyesinde tutmak için sürekli manometrik izlem.',
      'İdrar Çıkışı Takibi: Uzun/çok seviyeli olgularda mesane sondası (> 0.5 mL/kg/saat; ERAS gereği postop 1. günde erken çekim).'
    ],
    vascularAccess: [
      'En az 2 adet geniş çaplı (16–18G) güvenli periferik intravenöz yol (kollar gövde yanında sarılacağından uzatma hatları sağlam tespit edilmelidir)',
      'Gereğinde radiyal arter kanülasyonu; antibiyotik profilaksisi (Sefazolin kesiden 30–60 dk önce; > 3–4 saat veya > 1.5 L kanamada tekrar doz)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Boyun Nötral (Cerrahi/Nöro Onaylı Hafif Lordoz Desteği), Baş Silikon Halkada',
    patientPositionDetails: [
      'Kollar Vücut Yanına Nötral Pozisyonda Alınır ve Çarşafla Sarılır: Floroskopide omuzların C6-C7 seviyesini gölgelemesini engellemek için omuzlar nazikçe aşağıya flasterlenir.',
      'AŞIRI OMUZ TRAKSİYONUNDAN KAÇINILMALIDIR: Brakiyal pleksus gerilme hasarı (pleksopati) yaratır; pozisyonlama sonrası üst ekstremite SSEP/tcMEP teyit edilir.',
      'BOYUN EKSTANSİYON RULOSU GÜVENLİĞİ: Ağır CSM, OPLL veya travmatik servikal instabilitede nörolojik/İONM doğrulaması ve cerrah onayı olmadan boyun altına ekstansiyon rulosu KONULMAZ (kord basısı yaratır!).',
      'Gözler koruyucu pomadla kapatılır, bası noktaları jel pedlerle korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2–2.5 mg/kg) + Fentanil (2–3 mcg/kg) veya Remifentanil (0.1–0.2 mcg/kg/dk).',
      '  - İnstabil/miyelopatik boyunda MILS eşliğinde Videolaringoskop veya AFOI ile nötral entübasyon.',
      '  - Entübasyonda orta etkili Rokuronyum (0.6 mg/kg) kullanılabilir (akut/subakut SCI >24–48 saatte Süksinilkolin KESİNLİKLE KONTRENDİKE!); İONM başlamadan önce TOF ≥ 0.90 doğrulanır (gerekirse Sugammadeks).',
      'İdame: İONM yapılan olgularda saf TIVA (Propofol 80–140 mcg/kg/dk + Remifentanil 0.05–0.25 mcg/kg/dk) altın standarttır; zorunlu kombinasyonda volatil ≤ 0.5 MAC (tercihen < 0.3–0.5 MAC) ve N₂O KESİNLİKLE KULLANILMAZ. İntraoperatif multimodal adjuvan olarak düşük doz IV Ketamin (0.25–0.5 mg/kg bolus + 0.1–0.2 mg/kg/saat) ve/veya IV Lidokain (1.5 mg/kg bolus + 1–1.5 mg/kg/saat) eklenebilir.',
      'Multimodal POBV Profilaksisi: Kusma ve ıkınma ölümcül boyun hematomunu tetiklediği için çift ajan profilaksi (Deksametazon 4–8 mg IV + Ondansetron 4 mg IV) rutin uygulanır.',
      'Ekartör Yerleşimi ve Kaf Basıncı Yönetimi:',
      '  - Cerrahi ekartörler açıldığında tüp kafı tamamen indirilir ve yalnızca kaçağı önleyecek minimum basınca (20–22 cmH2O) manometreyle yeniden şişirilir (RLN koruması).',
      'Omurilik Perfüzyon Hedefleri (Permisif Hipotansiyon YASAK!):',
      '  - Miyelopati/stenozda MAP ≥ 80–85 mmHg; akut travmatik SCI\'de AO Spine 2024 hedefi MAP 75–80 ile 90–95 mmHg arası (3–7 gün). Rutin yüksek doz NASCIS metilprednizolon önerilmez.',
      '  - Nörojenik Şok (yüksek servikal/T1–T4 sempatik kayıp → hipotansiyon + bradikardi) ve subakut/kronik SCI\'de Otonom Disrefleksi (≥ T6) farkındalığı korunur.',
      '7 Adımlı İONM Sinyal Düşüşü Protokolü (> %50 amplitüd kaybı / > %10 latans uzaması):',
      '  - 1. Cerrahı anında uyar; son cerrahi manevrayı/ekartör gerginliğini/greft boyutunu geri al.',
      '  - 2. MAP\'ı hızla ≥ 85–90 mmHg seviyesine yükselt (Noradrenalin / Fenilefrin).',
      '  - 3. Oksijenasyon (SpO2 / PaO2) ve normokapniyi (PaCO2 35–40 mmHg) doğrula.',
      '  - 4. Hb / Hct ve kan gazını kontrol et (aktif kord iskemisinde Hb ≥ 8–9 g/dL).',
      '  - 5. Normotermiyi (> 36.0–36.5°C) sağla.',
      '  - 6. Anestezi derinliğini (< 0.5 MAC / TIVA) ve kantitatif TOF ile kazara NMB olmadığını doğrula.',
      '  - 7. Elektrot/teknik empedans ve boyun/omuz pozisyonunu kontrol et.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp tercih edilir; cerrahi sahanın karşı tarafındaki ağız köşesine sağlam tespit edilir.',
      'BİLATERAL YUMUŞAK MOLAR BITE BLOCK (TcMEP ZORUNLULUĞU): tcMEP sırasında şiddetli masseter kasılmasına bağlı dil/dudak laserasyonu ve ETT ısırmasını önlemek için bilateral yumuşak gazlı bez rulo ısırma bloğu yerleştirilir (sert plastik Guedel airway KULLANILMAZ!).',
      'Kaf basıncı ekartör yerleşimi sonrası söndürülüp 20–22 cmH2O\'ya manometre ile yeniden ayarlanır.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama, Bazal Pre/Post-Pozisyon İONM Kaydı ve Floroskopik Seviye Doğrulaması (C3-C7).',
      '2. Anterior Transvers veya Longitudinal Boyun İnsizyonu ve Platizma Kası Diseksiyonu.',
      '3. Smith-Robinson Planı: Karotid kılıf LATERALE, trakeoözofageal kompartman mediale ekarte edilerek prevertebral fasyaya ulaşılması.',
      '4. Cerrahi Ekartörlerin Yerleştirilmesi (ETT kafının söndürülüp 20–22 cmH2O\'ya yeniden ayarlanması!).',
      '5. Diskektomi / Korpektomi ve Posterior Osteofitlerin Eksizyonu (Vertebral arter, dura ve özofagus koruması).',
      '6. Posterior Longitudinal Ligamanın Açılması ve Omuriliğin / Sinir Köklerinin Tam Dekompresyonu.',
      '7. İntervertebral Kafes (Cage) / Greft Yerleştirilmesi ve Anterior Titanyum Plak-Vida Fiksasyonu.',
      '8. Hemostaz Kontrolü, Valsalva Manevrası (Dural yırtık kontrolü), Subfasial Dren ve Tabakalı Kapanış.'
    ],
    emergenceNotes: [
      'ÖKSÜRMESİZ VE IKINMASIZ PÜRÜZSÜZ UYANMA: Ekstübasyon esnasında öksürme ve venöz hipertansiyon anterior prevertebral alanda ölümcül servikal hematom tetikler; IV Lidokain (1.5 mg/kg) veya düşük doz Remifentanil altında pürüzsüz uyanma sağlanır.',
      'KAF KAÇAK TESTİ (CUFF LEAK TEST): Çok seviyeli ACDF, korpektomi (ACCF), > 3 saat ekartasyon veya > 300 mL kanamada retrofaringeal/laringeal ödem açısından pozitif kaf kaçağı doğrulanmadan ekstübe edilmez.',
      'ACİL YATAKBAŞI HEMATOM DEKOMPRESYONU: Postop stridor, dispne veya boyunda gergin şişlikte re-entübasyondan ÖNCE veya EŞZAMANLI olarak yatakbaşında cilt sütür/zımbaları VE derin platizma/fasya tabakaları DERHAL açılarak hematom boşaltılmalıdır (yatakbaşında dikiş/stapler sökme kiti ve cerrahi havayolu seti hazır tutulur).',
      'Erken Nörolojik ve Komplikasyon Taraması: Her iki üst/alt ekstremite motor gücü (özellikle C5 kök felci: deltoid/biseps), ses kısıklığı (RLN felci), Horner sendromu (servikal sempatik zincir) ve subkutan amfizem/şiddetli disfaji (özofagus perforasyonu) kontrol edilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'PROSPECT (2021) & ERAS (2021) Uyumlu Multimodal Analjezi Protokolü:',
      '  - Cerrahi Kapanışta Cilt/Fasya Lokal Anestezik İnfiltrasyonu (Bupivakain/Ropivakain %0.25 + Epinefrin).',
      '  - Düzenli IV/Oral Parasetamol (1000 mg q6h).',
      '  - Kısa Süreli Standart Doz NSAİİ / COX-2 (≤ 48–72 saat İbuprofen veya Selekoksib; cerrahi hemostaz kesinleştikten sonra; yüksek doz Ketorolak > 120 mg/gün veya > 2 haftalık kullanımdan kaçınılır).',
      '  - İntraoperatif IV Ketamin (PROSPECT Grade A) ve/veya IV Lidokain infüzyonu; şiddetli atılım ağrısında BAZAL İNFÜZYONSUZ (yalnızca talep/bolus) düşük doz Fentanil/Morfin IV PCA.',
      '  - KISITLAMALAR: Tramadol (PONV + nöbet riski) ve Opioid PCA ile eşzamanlı Benzodiazepin / Diazepam (FDA Black Box solunum depresyonu ve deliryum riski!) KULLANILMAZ. Rutin Gabapentinoid başlanmaz (PROSPECT 2021).',
      '  - Kas Spazmı İçin: Gerekirse kısa süreli Tizanidin veya Metokarbamol.'
    ],
    prospectRecommendations: [
      'PROSPECT Complex Spine (Waelkens et al., EJA 2021): Parasetamol + kısa süreli NSAİİ/COX-2 + cerrahi alan lokal anestezik infiltrasyonu + intraoperatif IV Ketamin (Grade A) temel multimodal omurgayı oluşturur; rutin gabapentinoidler sedasyon/solunum depresyonu nedeniyle önerilmez.'
    ],
    erasRecommendations: [
      'ERAS Omurga Cerrahisi İlkeleri (Debono et al., Spine J 2021):',
      '  - Preop Hazırlık: ≥ 4 hafta önce sigara bırakma, preop anemi/PBM taraması, ameliyattan 2 saat önce berrak karbonhidrat (CHO) yüklemesi ve multimodal POBV profilaksisi.',
      '  - Kırmızı Bayrak Alarmı (Genişleyen Servikal Hematom): İlk 24 saat boyun çevresi, solunum, stridor ve dren çıkışı saatlik izlenir; hematom şüphesinde yatakbaşında cilt + derin fasya DERHAL açılır.',
      '  - Disfaji, Özofagus & Komplikasyon İzlemi: Geçici disfajide sıvıdan yumuşak diyete geçilir; ateş/subkutan amfizemde özofagus perforasyonu, deltoid güçsüzlüğünde C5 kök felci, pitozis/miyoziste Horner sendromu araştırılır.',
      '  - Erken Mobilizasyon & Foley: Stabil olgularda 4–6. saatte boyunluk desteğiyle mobilizasyon; Foley sonda ve drenlerin postop 1. günde erken çekilmesi, glisemik hedef 140–180 mg/dL.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Neurosurgery — Spine Surgery: Anterior Cervical Spine Procedures. Philadelphia: Wolters Kluwer.',
    erasReference: 'Debono, B., Wainwright, T. W., Wang, M. Y., et al. (2021). Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations. The Spine Journal, 21(5), 729-752.',
    prospectReference: 'Waelkens, P., Alsabbagh, E., Sauter, A., Joshi, G. P., & Beloeil, H.; PROSPECT Working Group (2021). Pain management after complex spine surgery: A systematic review and procedure-specific postoperative pain management recommendations. European Journal of Anaesthesiology, 38(9), 985-994.',
    otherReferences: [
      'Fehlings, M. G., et al. (2024). AO Spine / Praxis Clinical Practice Guideline for the Management of Acute Spinal Cord Injury: Hemodynamic Management (MAP 75-80 to 90-95 mmHg). Global Spine Journal, 14(3_suppl).',
      'Fountas, K. N., et al. (2007). Anterior cervical discectomy and fusion associated complications: results of 1015 consecutive cases. Spine, 32(21), 2310-2317.',
      'Sagi, H. C., et al. (2002). Airway complications associated with surgery on the anterior cervical spine. Spine, 27(9), 949-953.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Clinical Consensus on Intraoperative Neuromonitoring and Airway Management in Cervical Spine Surgery.'
    ]
  }
};
