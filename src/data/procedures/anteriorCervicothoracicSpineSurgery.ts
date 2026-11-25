import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior Servikotorasik Omurga Cerrahisi: Transsternal / Manubriotomi Yaklaşımı İle C7-T3 Dekompresyon ve Rekonstrüksiyon
 * (Anterior Cervicothoracic Spine Surgery: Transsternal / Manubriotomy Approach for C7-T3 Decompression and Reconstruction)
 *
 * Jaffe (6th ed., 2020), AO Spine / Praxis (2024), PROSPECT Complex Spine (2021),
 * ERAS Society (2021), CSRS ve SNACC kılavuzları referans alınarak yapılandırılmıştır.
 */
export const anteriorCervicothoracicSpineSurgery: ProcedureDefinition = {
  id: 'anterior-cervicothoracic-spine-surgery',
  name: 'Anterior Servikotorasik Omurga Cerrahisi: Transsternal / Manubriotomi Yaklaşımı İle C7-T3 Dekompresyon ve Rekonstrüksiyon',
  shortCode: 'SERVİKOTORASİK-ANT',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Servikotorasik bileşkede (C7, T1, T2 ve T3 seviyelerinde) yer alan spinal patolojilere anterior yoldan ulaşmak amacıyla uygulanan yüksek riskli ve multidisipliner kompleks spinal cerrahidir. Manubrium sterni, klavikula, 1. kosta ve mediasten büyük damarlarının (brakisefalik arter/ven, sol ana karotid, aort arkı) arkasındaki T1-T3 korpuslarına ulaşmak için manubriotomi (parsiyel sternal ayrışma) veya median sternotomi uygulanır; mikrocerrahi korpektomi sonrası expandable cage, kemik grefti ve kilitli servikotorasik plak-vida ile rekonstrüksiyon yapılır.',
  indications: [
    'Servikotorasik Bileşke Tümörleri ve Metastazları: C7–T2 vertebra korpusunu destrükte eden primer veya metastatik tümörler (akciğer, meme, renal, prostat, plazmasitom)',
    'İnstabil Servikotorasik Travmatik Kırık-Çıkıklar: C7-T1 veya T1-T2 burst kırıkları ve kord basılı anterior instabilite',
    'Servikotorasik Spondilodiskit ve Tüberküloz (Pott Hastalığı): Korpus çökmesi ve epidural apse',
    'Şiddetli Servikotorasik Kifoz Deformitesi: Ankilozan spondilit ("bamboo spine") veya post-travmatik chin-on-chest deformitesi',
    'Posterior Cerrahi Sonrası Psödoartroz veya Komşu Segment Yıkımı'
  ],
  averageDuration: '4.0 - 7.0 saat (Pozisyonlama ve pre/post-pozisyon İONM: 60 dk; Manubriotomi ve büyük damar diseksiyonu: 60-90 dk; Korpektomi ve cage/plak rekonstrüksiyonu: 150-240 dk; Drenaj ve sternal kapanış: 60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '500 - 1500 mL (Geniş korpektomi, sternal kemik iliği ve mediasten venöz pleksus diseksiyonunda tümör olgularında 2000 mL\'yi aşabilir)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Mediasten Büyük Damarları ve Vertebral Arter Komşuluğu)',
    crossMatchRequirement: 'En az 3-4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite TDP ameliyathanede hazır bulundurulmalıdır; Cell Saver hazır edilmelidir',
    transfusionProbability: '%50 - %75',
    criticalBleedingSources: [
      'A. Brachiocephalica (Innominate Arter — T1-T2 omurga ön yüzünden geçer; ekartasyon yırtılması ölümcül kanamaya yol açar)',
      'V. Brachiocephalica Sinistra (Sol Innominate Ven — sternum arkasında diseksiyon sahasını çaprazlar; yaralanması Venöz Hava Embolisi [VAE] ve masif venöz kanama yaratır)',
      'A. Carotis Communis, A. Subclavia Dalları ve A. Vertebralis (C7 foramen transversarium)',
      'Sternum/Manubrium Süngeröz Kemik İliği ve Mediastinal Venöz Pleksuslar'
    ],
    hemostasisStrategies: [
      'Kanıta Dayalı Traneksamik Asit (TXA): 10–15 mg/kg (veya 1 g) IV yükleme + 1–2 mg/kg/saat idame infüzyonu (nöbet öyküsü, aktif VTE, renal yetmezlik doz ayarı ve insidental durotomi/BOS temasında nöbet riski dikkate alınır)',
      'Sternotomi kenarlarına kemik mumu, mediasten büyük damarların vasküler teyplerle dönülmesi',
      'FloSeal, Surgicel, Tisseel, bipolar koagülasyon ve malignite dışı olgularda Cell Saver',
      'Geniş mediastinal ve retrofaringeal negatif basınçlı drenaj; permisif hipotansiyon KESİNLİKLE UYGULANMAZ'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi — Saf TIVA (Propofol + Remifentanil): C7–T3 watershed kord bölgesinde tcMEP ve SSEP izlemi için ZORUNLU ALTIN STANDARTTIR (N₂O KESİNLİKLE YOK)'
    ],
    alternative: [
      'Zorunlu Kombinasyon: Düşük Doz Volatil Anestezik (≤ 0.5 MAC, tercihen < 0.3–0.5 MAC) + Sürekli Remifentanil İnfüzyonu (N₂O KESİNLİKLE KONTRENDİKE; idamede kas gevşetici yok)'
    ],
    clinicalRationale: 'C7-T3 watershed kord bölgesinde tcMEP/SSEP sinyallerini korumak için kürarsız saf Propofol + Opioid TIVA (N₂O yok) altın standarttır. Boyun-manubriyotomi ekartörleri altında lümen kollapsını önlemek için spiral telli ETT ile bilateral yumuşak molar bite block zorunludur.',
    notes: 'ANTERİOR SERVİKOTORASİK CERRAHİDE TEMEL İLKELER: (1) SOL RADİYAL A-LINE VE SAĞ IJ / FEMORAL CVC (SOL IJ YASAK!); (2) RLN, DUKTUS TORASİKUS (ŞİLOTORAKS), PLEVRAL KUPULA VE VAE; (3) WATERSHED MAP ≥ 80–85 mmHg, İONM ≥ 85–90 mmHg, AO SPINE 2024 SCI VE PERMİSİF HİPOTANSİYON YASAĞI; (4) İONM SAF TIVA, N₂O YASAĞI, BİLATERAL YUMUŞAK BITE BLOCK VE SCI SÜKSİNİLKOLİN YASAĞI; (5) GECİKMİŞ EKSTÜBASYON VE ACİL YATAKBAŞI STERNAL TEL AÇMA KİTİ.',
    rulesTitle: 'ANTERİOR SERVİKOTORASİK CERRAHİDE 5 VAZGEÇİLMEZ ANESTEZİ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'SOL RADİYAL ARTERİYEL HAT VE DOĞRU CVC SEÇİMİ (SOL IJ TERCİH EDİLMEZ!)',
        content: 'Innominate arter ekartasyon/klempajında sağ kol nabzı sıfırlanacağından invaziv A-Line KESİNLİKLE SOL RADİYAL veya FEMORAL arterden takılır. Manubriotomi sırasında sol innominate ven (V. brachiocephalica sinistra) doğrudan cerrahi sahada olduğundan ve sol IJ duktus torasikus yaralanma/mediastene ekstravazasyon riski taşıdığından CVC için SAĞ İNTERNAL JUGULER (cerrahi tarafa göre sağ subklaviyan veya ultrason eşliğinde femoral ven) tercih edilmelidir.'
      },
      {
        number: 2,
        title: 'WATERSHED KORD PERFÜZYONU (MAP ≥ 80–85 mmHg), AO SPINE 2024 SCI VE PERMİSİF HİPOTANSİYON YASAĞI',
        content: 'C7–T3 anterior spinal arter sınır bölgesinde permisif hipotansiyondan KESİNLİKLE kaçınılır: bazal MAP ≥ 80–85 mmHg, İONM sinyal düşüşünde ≥ 85–90 mmHg hedeflenir. Akut travmatik SCI\'de AO Spine 2024 hedefi MAP 75–80 ile 90–95 mmHg arasıdır (3–7 gün; rutin yüksek doz NASCIS metilprednizolon önerilmez). T1–T4 sempatik kayıpta Nörojenik Şok ve kronik/subakut ≥ T6 SCI\'de Otonom Disrefleksi izlenir.'
      },
      {
        number: 3,
        title: 'İONM İÇİN SAF TIVA, N₂O YASAĞI, BİLATERAL YUMUŞAK BITE BLOCK VE SCI SÜKSİNİLKOLİN YASAĞI',
        content: 'Saf TIVA (zorunlu volatil ≤ 0.5 MAC; N₂O KESİNLİKLE YOK; TOF ≥ 0.90) ve bilateral yumuşak gazlı bez rulo molar bite block zorunludur (sert plastik Guedel airway KULLANILMAZ). Akut/subakut SCI (>24–48 saat) ve üst motor nöron lezyonunda Süksinilkolin ölümcül hiperkalemik arrest nedeniyle KESİNLİKLE KONTRENDİKEDİR.'
      },
      {
        number: 4,
        title: 'RLN, DUKTUS TORASİKUS (ŞİLOTORAKS), PLEVRAL KUPULA VE SOL İNNOMİNATE VEN VAE RİSKİ',
        content: 'Ekartör yerleşimi sonrası ETT kafı söndürülüp 20–22 cmH2O\'ya yeniden ayarlanır (RLN koruması). Sol yaklaşımda duktus torasikus (şilotoraks), plevra kupulası (tansiyon pnömotoraks/hemotoraks) ve sol innominate ven açılmasına bağlı Venöz Hava Embolisi (VAE) açısından Ppeak ve EtCO2 kesintisiz izlenir.'
      },
      {
        number: 5,
        title: 'ANKİLOZAN SPONDİLİT POZİSYONLAMASI, GECİKMİŞ EKSTÜBASYON VE YATAKBAŞI TEL KESİCİ',
        content: 'Ankilozan spondilit ("bamboo spine") hastalarında mevcut kifotik deformite yastıklarla tam desteklenmeli, baş ASLA masaya zorla düzlenmemelidir (iyatrojenik kırık/epidural hematom!). Manubriotomi sonrası masif ödem nedeniyle genellikle entübe YBÜ transferi ve 12–24. saatte Cuff Leak Test sonrası ekstübasyon tercih edilir; yatakbaşında sternal tel kesici ve cerrahi havayolu seti bulundurulur.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göğüs Cerrahisi / KVC Konsültasyonu: Manubriotomi/median sternotomi ve innominate arter/ven diseksiyonu için multidisipliner eşgüdüm.',
      'Nöroloji / Nöroşirürji Konsültasyonu: Servikotorasik miyelopati derecesi, paraparezi, T1–T2 duyusal seviye ve sfinkter fonksiyonu.',
      'Kardiyoloji Konsültasyonu: Büyük damar manipülasyonu/kros-klempaj toleransı, bazal EKO ve koroner rezerv.',
      'Girişimsel Radyoloji Konsültasyonu: Hipervasküler tümörlerde (RCC, hemanjiyom) preoperatif transarteriyel embolizasyon.',
      'KBB Konsültasyonu: Preoperatif vokal kord muayenesi (özellikle önceki boyun/tiroid cerrahisinde mevcut tek taraflı RLN felcinin tespiti).'
    ],
    historyAndPhysical: [
      'Kord Kompresyonu ve Radikülopati: T1 el intrinsik kas atrofisi, C8 hipoestezisi, Horner sendromu (sempatik zincir basısı).',
      'Zor Hava Yolu & Ankilozan Spondilit ("Bamboo Spine"): Chin-on-chest deformitesi, sıfır boyun ekstansiyonu (AFOI planı), VCS sendromu bulguları.',
      'Pulmoner Rezerv, Sigara & Opioid Taraması: İnterkostal kas zayıflığı/AKG; ERAS 2021 gereği ≥ 4 hafta sigara bırakma ve kronik opioid toleransı sorgusu.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı ve Preop PBM / Anemi Optimizasyonu (4 hafta önce Hb/ferritin; PT, aPTT, INR, Fibrinojen tam normal).',
      'En az 3–4 Ünite ES ve 2 Ünite TDP Cross-Match hazırlığı.',
      'Biyokimya Paneli: Elektrolitler, BUN, Kreatinin, KCFT, Kalsiyum (kemik metastazında hiperkalsemi) ve Glukoz (hedef 140–180 mg/dL).',
      'Kontrastlı Servikotorasik BT Anjiyografi (BTA) ve MRG: Innominate arter/ven, arkus aorta dalları, vertebral arter ve kord basısı (akut travmada dinamik grafi ÇEKİLMEZ!).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 (normokapni 35–40 mmHg; ani EtCO2 düşüşü = VAE/kanama alarmı) ve Sıcaklık.',
      'SOL RADİYAL ARTERİYEL HAT (veya Femoral A-Line — Flebotatik Aks Sıfırlaması): Innominate arter ekartasyonunda sağ kol nabzı kaybolabileceğinden kesinlikle sol kol veya femoral arter tercih edilir.',
      'Santral Venöz Kateter (CVC): Sol innominate ven cerrahi sahada ve duktus torasikus solda olduğundan SAĞ İNTERNAL JUGULER (cerrahi tarafa göre sağ subklaviyan veya USG eşliğinde femoral ven) tercih edilir; sol IJ\'den kaçınılır.',
      'İntraoperatif Nöromonitörizasyon (İONM): Bilateral tcMEP ve SSEP; pozisyonlama öncesi ve sonrası bazal kayıtlar karşılaştırılır.',
      'Kantitatif Nöromusküler İleti İzlemi (TOF): TOF oranı ≥ 0.90 (4/4) korunur; idamede kas gevşetici verilmez.',
      'Endotrakeal Tüp Kaf Manometresi (20–22 cmH2O) ve Sıcaklık Sensörlü Mesane Sondası (> 0.5–1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (14–16G) periferik IV yol (diyafram üstü / erişilebilir ekstremite)',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger), ısıtıcılı kan hatları ve malignite dışı olgularda Cell Saver',
      'Antibiyotik Profilaksisi: Sefazolin kesiden 30–60 dk önce; > 3–4 saat veya > 1.5 L kanamada tekrar doz'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, İnterskapular Destek (Ankilozan Spondilitte Mevcut Kifozun Tam Yastık Desteği)',
    patientPositionDetails: [
      'İnterskapular rulo ile C7–T2 omurgası yaklaştırılır; ANCAK Ankilozan Spondilit ("bamboo spine") ve ağır instabilitede baş/boyun ASLA masaya zorla bastırılmaz, mevcut kifoz eğimi yastıklarla tam desteklenir!',
      'Kollar gövde yanında nötral sarılır; sol koldaki arteriyel ve IV hatlar erişilebilir tutulur.',
      'Çeneden ksifoide kadar geniş boyun-göğüs steril örtümü yapılır (acil tam sternotomi/torakotomi hazırlığı).'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2–2.5 mg/kg) + Fentanil (3–5 mcg/kg) veya Remifentanil (0.1–0.2 mcg/kg/dk).',
      '  - İnstabil C7–T2 veya chin-on-chest deformitesinde MILS + Videolaringoskop veya Uyanık Fiberoptik Entübasyon (AFOI).',
      '  - Orta etkili Rokuronyum (0.6 mg/kg; akut/subakut SCI >24–48 saatte Süksinilkolin KESİNLİKLE KONTRENDİKE!); İONM öncesi TOF ≥ 0.90 doğrulanır.',
      'İdame: Saf TIVA (Propofol 90–150 mcg/kg/dk + Remifentanil 0.1–0.3 mcg/kg/dk; zorunlu kombinasyonda volatil ≤ 0.5 MAC, tercihen < 0.3–0.5 MAC; N₂O KESİNLİKLE KULLANILMAZ!). Multimodal opioid-koruyucu olarak IV Ketamin (0.25–0.5 mg/kg + 0.1–0.2 mg/kg/saat) ve/veya IV Lidokain (1.5 mg/kg + 1–1.5 mg/kg/saat) infüzyonu eklenir.',
      'Multimodal POBV Profilaksisi: Deksametazon (4–8 mg IV) + Ondansetron (4 mg IV).',
      'Hemodinami, Watershed Koruması (Permisif Hipotansiyon YASAK!) & Kanama:',
      '  - Bazal MAP ≥ 80–85 mmHg, İONM sinyal düşüşünde ≥ 85–90 mmHg (Noradrenalin infüzyonu hazır). Akut travmatik SCI\'de AO Spine 2024 hedefi MAP 75–80 ile 90–95 mmHg (3–7 gün; rutin NASCIS steroid önerilmez).',
      '  - TXA (10–15 mg/kg yükleme + 1–2 mg/kg/saat); transfüzyon eşiği stabilde Hb 7–8 g/dL, aktif iskemi/masif hemoraji/İONM düşüşünde 8–9 g/dL.',
      '7 Adımlı İONM Sinyal Düşüşü Protokolü (> %50 amplitüd kaybı / > %10 latans uzaması):',
      '  - 1. Cerrahı derhal uyar ve son manevrayı/ekartasyonu geri al.',
      '  - 2. MAP ≥ 85–90 mmHg seviyesine yükselt.',
      '  - 3. SpO2/PaO2 ve normokapniyi (PaCO2 35–40 mmHg) doğrula.',
      '  - 4. Hb/Hct ve kan gazını kontrol et.',
      '  - 5. Normotermiyi (> 36.0–36.5°C) sağla.',
      '  - 6. Anestezi derinliğini (< 0.5 MAC / TIVA) ve TOF ≥ 0.90 (kazara NMB yok) doğrula.',
      '  - 7. Elektrot/teknik empedans ve pozisyonu kontrol et.',
      'Plevra Açılması & VAE Acil Müdahalesi: Plevra perfore olursa PEEP 5–8 cmH2O ve göğüs tüpü; sol innominate ven açılıp EtCO2 aniden düşerse (VAE) sahayı SF ile doldur, %100 O2, vazopressör ve CVC aspirasyonu.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; cerrahi sahanın karşı tarafındaki ağız köşesine tespit edilir.',
      'BİLATERAL YUMUŞAK MOLAR BITE BLOCK (TcMEP ZORUNLULUĞU): Dil/dudak laserasyonunu önlemek için bilateral yumuşak gazlı bez rulo ısırma bloğu yerleştirilir (sert plastik Guedel airway KULLANILMAZ!).',
      'Ekartör yerleşimi sonrası tüp kafı söndürülüp 20–22 cmH2O\'ya yeniden ayarlanır (RLN koruması).'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama (AS Kifoz Desteği), Bazal İONM Kaydı ve Geniş Boyun-Göğüs Örtümü.',
      '2. Düşük Anterior Servikal İnsizyonun Sternum Üzerine Uzatılması (T veya L insizyonu).',
      '3. Manubriotomi / Parsiyel Sternal Split ve İnternal Torasik Damarların Korunması.',
      '4. Retrosternal Mediastinal Diseksiyon: Sol innominate ven (VAE riski!), innominate arter ve ana karotisin ekartasyonu.',
      '5. Prevertebral Fasyanın Açılması ve C7–T3 Omurga Ön Yüzüne Ulaşılması.',
      '6. Mikrocerrahi Korpektomi ve Dural Dekompresyon (Watershed MAP ≥ 80–85 mmHg!).',
      '7. Expandable Kafes (Cage) / Greft ve Anterior Servikotorasik Kilitli Plak-Vida Fiksasyonu.',
      '8. Hemostaz, Valsalva (BOS & plevra testi), Duktus Torasikus Kontrolü, Drenler ve Sternal Tel Kapanışı.'
    ],
    emergenceNotes: [
      'GECİKMİŞ EKSTÜBASYON (YBÜ DEVİR): Manubriotomi ve mediastinal retraksiyon nedeniyle masif havayolu/retrosternal ödem sık olduğundan hasta çoğunlukla entübe, baş 30–45° eleve YBÜ\'ye devredilir.',
      'Kaf Kaçak Testi (Cuff Leak Test): Postop 12–24. saatte ödem gerileyip pozitif kaçak doğrulandıktan sonra kontrollü ekstübe edilir.',
      'Kanama / Tamponad Alarmı ve Yatakbaşı Sternal Tel Kesici: Mediastinal drenler saatlik izlenir; trakeal/VCS basısı gelişen tamponadda yatakbaşında hazır tel kesici ve cerrahi havayolu seti bulundurulur.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'PROSPECT (2021) & ERAS (2021) Uyumlu Multimodal Analjezi Protokolü:',
      '  - Cerrahi Kapanışta Sternal Periost ve Servikal Cilde Lokal Anestezik İnfiltrasyonu (Levobupivakain/Ropivakain %0.25 + Epinefrin) veya bilateral parasternal/ESPB bloğu.',
      '  - Düzenli IV Parasetamol (1000 mg q6h) + hemostaz kesinleştikten sonra kısa süreli (≤ 48–72 saat) standart doz NSAİİ / COX-2.',
      '  - İntraoperatif IV Ketamin (PROSPECT Grade A), IV Lidokain infüzyonu ve/veya tek doz IV Metadon (0.15–0.2 mg/kg) seçeneği.',
      '  - Hasta Kontrollü Analjezi (İV PCA): Yalnızca talep/bolus modunda (BAZAL İNFÜZYONSUZ!) Fentanil veya Morfin PCA.',
      '  - KISITLAMALAR: Rutin Pregabalin/Gabapentin başlanması sedasyon ve solunum depresyonu riski nedeniyle PROSPECT 2021 ve FDA uyarıları gereği ÖNERİLMEZ (yalnızca preop kronik nöropatik ağrı nedeniyle kullananlarda dikkatli devam); Opioid PCA ile eşzamanlı Benzodiazepin KULLANILMAZ.'
    ],
    prospectRecommendations: [
      'PROSPECT Complex Spine (Waelkens et al., EJA 2021): Parasetamol + kısa süreli NSAİİ/COX-2 + lokal anestezik infiltrasyonu/rejyonel blok + intraoperatif IV Ketamin (Grade A) ile opioid ihtiyacı ve solunum depresyonu azaltılır; rutin gabapentinoid başlanmaz.'
    ],
    erasRecommendations: [
      'ERAS Kompleks Omurga Cerrahisi İlkeleri (Debono et al., Spine J 2021):',
      '  - Preop Hazırlık: ≥ 4 hafta sigara bırakma, PBM anemi optimizasyonu, 2 saat önce berrak CHO ve multimodal POBV profilaksisi.',
      '  - YBÜ İzlemi: İlk 24–48 saat invaziv A-line, saatlik nörolojik muayene (T1–T2 ve alt ekstremite motor), glisemik hedef 140–180 mg/dL.',
      '  - Drenaj & Şilotoraks İzlemi: Mediastinal/prevertebral drenler izlenir; süt rengi lenfatik drenajda şilotoraks açısından plevral/dren sıvısı trigliserid (> 110 mg/dL) çalışılır.',
      '  - Göğüs Fizyoterapisi, Teşvik Edici Spirometre ve Foley Sondanın Stabilizasyonla Erken Çekilmesi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Neurosurgery — Spine Surgery: Anterior Cervicothoracic Spine Surgery. Philadelphia: Wolters Kluwer.',
    erasReference: 'Debono, B., Wainwright, T. W., Wang, M. Y., et al. (2021). Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations. The Spine Journal, 21(5), 729-752.',
    prospectReference: 'Waelkens, P., Alsabbagh, E., Sauter, A., Joshi, G. P., & Beloeil, H.; PROSPECT Working Group (2021). Pain management after complex spine surgery: A systematic review and procedure-specific postoperative pain management recommendations. European Journal of Anaesthesiology, 38(9), 985-994.',
    otherReferences: [
      'Fehlings, M. G., et al. (2024). AO Spine / Praxis Clinical Practice Guideline for the Management of Acute Spinal Cord Injury: Hemodynamic Management. Global Spine Journal, 14(3_suppl).',
      'Sundaresan, N., et al. (1993). The transsternal approach to the upper thoracic vertebrae. American Journal of Surgery, 166(4), 384-388.',
      'Kaya, R. A., et al. (2007). Modified transmanubrial approach for the cervicothoracic junction. Journal of Neurosurgery: Spine, 6(1), 89-94.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Clinical Guidelines for Hemodynamic and Neurophysiological Monitoring in High-Risk Cervicothoracic Spine Surgery.'
    ]
  }
};
