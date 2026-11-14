/**
 * Anestezi Acilleri — İntraoperatif Monitörizasyon & Ventilatör Kriz Protokolleri
 *
 * Şişli Hamidiye Etfal EAH Anesteziyoloji ve Reanimasyon Kliniği
 * Kaynaklar: Miller's Anesthesia (9–10th ed.), Morgan & Mikhail's Clinical Anesthesiology (7th ed.),
 * Dorsch Understanding Anesthesia Equipment (5th ed.), EMHG, NAP4, ESC PE & ACS ATLS 10th ed. Guidelines.
 */

export type TroubleshootingUrgency = 'critical' | 'urgent' | 'warning';

export interface TroubleshootingDifferentialItem {
  condition: string;
  mechanism?: string;
  frequency: 'Çok Yaygın' | 'Yaygın' | 'Nadir' | 'Acil';
  clues: string;
  confirmatoryTest: string;
  immediateAction: string;
}

export interface TroubleshootingAlgorithmicStep {
  stepNumber: number;
  phase: string;
  action: string;
  detail: string;
  checkTip?: string;
}

export interface CapnogramWaveformPattern {
  id: string;
  label: string;
  subtitle: string;
  meaning: string;
  action: string;
  tone: 'normal' | 'warning' | 'danger' | 'info';
  svgPath: string;
  baselineY: number;
}

export interface PressureWaveformPattern {
  id: string;
  label: string;
  subtitle: string;
  ppeakLabel: string;
  pplatLabel: string;
  gradientLabel: string;
  meaning: string;
  action: string;
  tone: 'normal' | 'warning' | 'danger' | 'info';
  svgPath: string;
}

export interface Spo2WaveformPattern {
  id: string;
  label: string;
  subtitle: string;
  spo2Badge: string;
  meaning: string;
  action: string;
  tone: 'normal' | 'warning' | 'danger' | 'info';
  svgPath: string;
}

export interface TroubleshootingReference {
  citation: string;
  pmid?: string;
}

export interface EmergencyTroubleshootingItem {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  urgency: TroubleshootingUrgency;
  primaryAlarm?: string;
  physiologyFormula?: string;
  summary: string;
  goldenSixtySeconds: string[];
  capnogramPatterns?: CapnogramWaveformPattern[];
  pressurePatterns?: PressureWaveformPattern[];
  spo2Patterns?: Spo2WaveformPattern[];
  differentialDiagnosis: TroubleshootingDifferentialItem[];
  algorithmicSteps: TroubleshootingAlgorithmicStep[];
  pearlsAndPitfalls: {
    pearls: string[];
    pitfalls: string[];
  };
  equipmentChecklist: string[];
  references?: TroubleshootingReference[];
  tags: string[];
}

export const EMERGENCY_TROUBLESHOOTING_ITEMS: EmergencyTroubleshootingItem[] = [
  {
    id: 'etco2-elevation',
    title: 'İntraoperatif End-Tidal Karbondioksit (EtCO₂) Yükselmesi',
    subtitle: 'Akut Hiperkapni, Yeniden Soluma (FiCO₂ > 0) ve Hipermetabolik Kriz Ayrımı',
    categoryLabel: 'Kapnografi & Metabolik Kriz',
    urgency: 'critical',
    primaryAlarm: 'EtCO₂ > 45 mmHg (Hiperkapni) · > 55 mmHg (Akut Kriz) · FiCO₂ > 0–2 mmHg (Rebreathing)',
    physiologyFormula: 'PaCO₂ ∝ V̇CO₂ (CO₂ Üretimi / Ekzojen Emilim) ÷ V̇A (Alveoler Ventilasyon)',
    summary:
      'İntraoperatif EtCO₂ yükselmesi; (1) Alveoler hipoventilasyon (↓V̇A), (2) Devre veya soda lime arızasına bağlı yeniden soluma (FiCO₂ > 0), (3) Artmış CO₂ üretimi veya laparoskopik CO₂ emilimi (↑V̇CO₂) ve (4) Ani perfüzyon/reperfüzyon artışından kaynaklanır. İlk bakışta kapnogram şekli ve bazal çizgi (FiCO₂) ile Malign Hipertermi bulguları ayırt edilmelidir.',
    goldenSixtySeconds: [
      'SpO₂, inspired CO₂ (FiCO₂) taban çizgisini ve kapnogram dalga formunu hemen kontrol et (taban çizgisi > 0 mmHg ise devre/soda lime sorunu!).',
      'Dakika ventilasyonunu (V̇E = VT × f) ve Ppeak / Pplat değerlerini kontrol et; gerekirse solunum sayısını ve tidal hacmi kademeli artır.',
      'FiCO₂ > 0 mmHg veya cihaz/devre şüphesi varsa taze gaz akımını (FGF) derhal dakika ventilasyonunun ≥2× üzerine çıkar (10–15 L/dk) ya da harici Ambu (%100 O₂) ile havalandır.',
      'Akciğerleri dinle, endotrakeal tüp tıkanıklığı / bronkospazm ("köpekbalığı yüzgeci") veya tek akciğer / kapnotoraks bulgusunu dışla.',
      'Açıklanamayan hızla tırmanan EtCO₂ + taşikardi + kas rijiditesi / ateş varsa MALİGN HİPERTERMİ ilan et: Volatil anesteziği kapat, %100 O₂ 10–15 L/dk aç ve Dantrolen (2.5 mg/kg) hazırla!'
    ],
    capnogramPatterns: [
      {
        id: 'normal',
        label: 'Normal Kare Kapnogram',
        subtitle: 'EtCO₂ 35–45 mmHg · FiCO₂ = 0',
        meaning: 'Bazal çizgi 0 mmHg’ye tam döner, plato düzdür. Yükselmişse saf hipoventilasyon veya V̇CO₂ artışı (laparoskopi/ateş) düşündürür.',
        action: 'Dakika ventilasyonunu artır ve laparoskopi / V̇CO₂ nedenlerini değerlendir.',
        tone: 'normal',
        baselineY: 50,
        svgPath: 'M 4 50 L 22 50 L 26 18 L 62 18 L 66 50 L 88 50 L 92 18 L 128 18 L 132 50 L 156 50'
      },
      {
        id: 'shark-fin',
        label: 'Köpekbalığı Yüzgeci (Shark-Fin)',
        subtitle: 'Eğimli Faz II–III · Obstrüktif Patern',
        meaning: 'Alveoler boşalmanın uzadığını gösterir: Bronkospazm, sekresyon/tüp kıvrılması, KOAH alevlenmesi veya hava yolu obstrüksiyonu.',
        action: 'Tüpü aspire et/kıvrılmayı aç, bronkodilatör (salbutamol) ver, I:E oranını uzat (1:3–1:4).',
        tone: 'warning',
        baselineY: 50,
        svgPath: 'M 4 50 L 20 50 Q 34 32 62 12 L 66 50 L 86 50 Q 100 32 128 12 L 132 50 L 156 50'
      },
      {
        id: 'rebreathing',
        label: 'Yükselmiş Taban Çizgisi (FiCO₂ > 0)',
        subtitle: 'İnspiratuvar Çizgi Sıfıra İnmiyor',
        meaning: 'Yeniden soluma (Rebreathing): Tükenmiş CO₂ absorbanı (soda lime), ekspiratuvar tek yönlü valf yetmezliği veya yetersiz taze gaz akımı.',
        action: 'FGF’yi ≥10 L/dk yap, soda lime kanisterini ve tek yönlü valfleri değiştir; düzelmezse Ambu’ya geç.',
        tone: 'danger',
        baselineY: 38,
        svgPath: 'M 4 38 L 22 38 L 26 12 L 62 12 L 66 38 L 88 38 L 92 12 L 128 12 L 132 38 L 156 38'
      },
      {
        id: 'curare-cleft',
        label: 'Kurar Çentiği (Curare Cleft)',
        subtitle: 'Faz III Platosunda Diyafram Çentiği',
        meaning: 'Nöromüsküler blokajın azaldığını ve hastanın ventilatöre karşı spontan solunum eforu yaptığını gösterir; solunum işi ve V̇CO₂ artar.',
        action: 'TOF ölçümü yap; cerrahi gereksinime göre ek kas gevşetici veya analjezi/sedasyon derinliğini artır.',
        tone: 'info',
        baselineY: 50,
        svgPath: 'M 4 50 L 22 50 L 26 18 L 44 18 L 48 31 L 52 18 L 62 18 L 66 50 L 88 50 L 92 18 L 110 18 L 114 31 L 118 18 L 128 18 L 132 50 L 156 50'
      }
    ],
    differentialDiagnosis: [
      {
        condition: 'Malign Hipertermi (MH) — Hipermetabolik Kriz',
        mechanism: 'Üretim / Emilim (↑V̇CO₂)',
        frequency: 'Acil',
        clues: 'Dakika ventilasyonu artırılmasına rağmen hızla ve inatla yükselen EtCO₂ (en erken ve duyarlı bulgu!), açıklanamayan sinüs taşikardisi, masseter spazmı (trismus), jeneralize rijidite; ateş yükselmesi geç ama hızlı olabilir.',
        confirmatoryTest: 'AKG’de mikst solunumsal + metabolik asidoz (↑PaCO₂, ↑Laktat, ↑K⁺), yükselmiş CK ve miyoglobinüri.',
        immediateAction: 'Tüm volatil ajanları ve süksinilkolini DERHAL kes, FGF %100 O₂ ≥10 L/dk ile hiperventile et, Dantrolen 2.5 mg/kg IV başla (Anestezi Acilleri → Malign Hipertermi Protokolü).'
      },
      {
        condition: 'Alveoler Hipoventilasyon (Ventilatör Ayar / Spontan Depresyon)',
        mechanism: 'Ventilasyon (↓V̇A)',
        frequency: 'Çok Yaygın',
        clues: 'Normal kare dalga kapnogram (yüksek plato), FiCO₂ = 0 mmHg. Opioid/anestezik duyarlılığı, spontan modda yetersiz destek, Trendelenburg/obezitede kompliyans düşüşüne bağlı VT kaybı veya ölü boşluk artışı.',
        confirmatoryTest: 'Ventilatör ekranında düşük ekspiratuvar dakika ventilasyonu (V̇E); AKG’de saf solunumsal asidoz.',
        immediateAction: 'Solunum sayısını (f) ve/veya tidal hacmi (6–8 mL/kg IBW) artır; basınç kontrollü modda pnömoperitoneum/Trendelenburg sonrası düşen VT’yi telafi et.'
      },
      {
        condition: 'Laparoskopik CO₂ İnsuflasyonu, Subkutan Amfizem veya Kapnotoraks',
        mechanism: 'Üretim / Emilim (↑V̇CO₂)',
        frequency: 'Çok Yaygın',
        clues: 'İnsuflasyon sonrası 5–15 dk içinde EtCO₂’de %15–30 yükselme olağandır. Ekstraperitoneal/pelvik/tiroid-endoskopik girişimde veya >15 mmHg basınçta ani aşırı yükseliş + boyun/göğüs cilt altı krepitasyonu + Ppeak artışı.',
        confirmatoryTest: 'Boyun ve toraksta cilt altı krepitasyon palpasyonu, akciğer sesleri/POCUS ile pnömotoraks-kapnotoraks dışlanması, AKG.',
        immediateAction: 'Dakika ventilasyonunu (RR) artır. Subkutan amfizem veya kapnotoraks varsa cerrahı uyar, insuflasyon basıncını düşürt/durdurt; CO₂ kapnotoraksta PEEP artırımı ve yakın izlem (tansiyon yoksa çoğunlukla hızlı emilir).'
      },
      {
        condition: 'Tükenmiş Soda Lime veya Tek Yönlü Valf Arızası (Yeniden Soluma)',
        mechanism: 'Devre / Absorban (FiCO₂>0)',
        frequency: 'Yaygın',
        clues: 'Kapnogram taban çizgisi sıfıra inmez (FiCO₂ > 0–2 mmHg). Soda lime mor/menekşe renk değişimi gösterir veya kanister soğuktur; ekspiratuvar/inspiratuvar valf diski açık takılı kalmıştır.',
        confirmatoryTest: 'FiCO₂ > 2 mmHg görülmesi, tek yönlü valflerin şeffaf kapaktan kontrolü, FGF’yi 10–15 L/dk yapınca FiCO₂’nin hızla düşmesi.',
        immediateAction: 'Taze gaz akımını hemen ≥2× dakika ventilasyonuna (10–15 L/dk) çıkar; soda lime kanisterini veya valfi değiştir, şüphede harici Ambu’ya geç.'
      },
      {
        condition: 'Bronkospazm, Sekresyon veya Kısmi Tüp Tıkanıklığı',
        mechanism: 'Ventilasyon (↓V̇A)',
        frequency: 'Yaygın',
        clues: 'Kapnogramda "köpekbalığı yüzgeci (shark-fin)" paterni, yükselmiş Ppeak (Ppeak–Pplat farkında artış), uzamış ekspirasyon (oto-PEEP) ve wheezing.',
        confirmatoryTest: 'Steteskop ile dinleme, aspirasyon sondasının tüpten rahat geçip geçmediğinin kontrolü, Ppeak–Pplat gradienti.',
        immediateAction: 'Tüp kıvrılmasını düzelt/aspire et, anestezi derinliğini artır, inhale β₂-agonist (salbutamol) uygula ve I:E oranını 1:3–1:4 yaparak ekspirasyon süresini uzat.'
      },
      {
        condition: 'Turnike Gevşetilmesi, Aort/IVC Klemp Açılması veya KPR Sonrası ROSC',
        mechanism: 'Perfüzyon / Dolaşım',
        frequency: 'Yaygın',
        clues: 'Ekstremite turnikesi açıldıktan veya büyük damar klempi kaldırıldıktan saniyeler sonra geçici +5 ila +15 mmHg EtCO₂ artışı; KPR sırasında ani sıçrama ROSC (spontan dolaşım dönüşü) göstergesidir.',
        confirmatoryTest: 'Cerrahi manevra zamanlaması ile birebir örtüşme; genellikle 2–5 dakika içinde bazal değere geriler.',
        immediateAction: 'Kısa süreli dakika ventilasyonunu artırarak akut CO₂ ve laktat yükünü temizle; geçici reperfüzyon hipotansiyonuna karşı hemodinamiyi destekle.'
      },
      {
        condition: 'İntravenöz Sodyum Bikarbonat (NaHCO₃) Uygulaması',
        mechanism: 'Üretim / Emilim (↑V̇CO₂)',
        frequency: 'Yaygın',
        clues: 'NaHCO₃ puşesi sonrası 30–60 saniye içinde keskin ama kısa ömürlü EtCO₂ yükselmesi (HCO₃⁻ + H⁺ → H₂O + CO₂).',
        confirmatoryTest: 'İlaç verilme zamanı ile zamansal ilişki; 2–3 dakikada kendiliğinden geriler.',
        immediateAction: 'Geçici ekspiratuvar CO₂ çıkışını kolaylaştırmak için ventilasyonu geçici artır; ek müdahale gerekmez.'
      },
      {
        condition: 'Ateş, Sepsis, Tiroid Fırtınası veya Feokromositoma / Hafif Anestezi',
        mechanism: 'Üretim / Emilim (↑V̇CO₂)',
        frequency: 'Yaygın',
        clues: 'FiCO₂ = 0 ve normal kapnogram şekli eşliğinde taşikardi, ısı artışı (özellikle aktif ısıtma blanketlerinin aşırı ısıtması veya bakteriyemi) ya da ağrıya bağlı sempatik deşarj ve titreme.',
        confirmatoryTest: 'Özofageal/mesane sıcaklık ölçümü, BIS/MAC kontrolü, kan kültürü/tiroid/laktat tetkiki.',
        immediateAction: 'Isıtıcıyı kapat/soğutma başlat, analjezi ve anestezi derinliğini optimize et, dakika ventilasyonunu artır; tiroid fırtınasında β-bloker/antitiroid planla.'
      },
      {
        condition: 'Bölgesel/Laparoskopik Ekipman Hatası — Yanlış Kalibrasyon veya İstenmeyen CO₂ Verilmesi',
        mechanism: 'Devre / Absorban (FiCO₂>0)',
        frequency: 'Nadir',
        clues: 'Anestezi cihazında yardımcı CO₂ gazı veya yanlış hat bağlantısı, end-tidal sensör su/sekresyon kontaminasyonu (genellikle düşük/hatalı eğri verse de yanlış yüksek okuma yapabilir).',
        confirmatoryTest: 'AKG PaCO₂ ile EtCO₂ karşılaştırması, numune hattı (sample line) ve su tutucunun değiştirilmesi.',
        immediateAction: 'Şüphede gaz kaynağını doğrula, örnekleme hattını/su tutucuyu değiştir ve AKG ile teyit et.'
      }
    ],
    algorithmicSteps: [
      {
        stepNumber: 1,
        phase: '0–15 sn · Kapnogram & FiCO₂ Okuma',
        action: 'Taban çizgisini (FiCO₂) ve dalga şeklini değerlendir',
        detail: 'Taban çizgisi 0 mmHg’de değilse yeniden soluma (rebreathing) vardır. Faz II–III eğimliyse (shark-fin) obstrüksiyon/bronkospazm, plato çentikliyse (curare cleft) spontan efor vardır.',
        checkTip: 'FiCO₂ > 0 mmHg → Devre veya Soda Lime sorunu!'
      },
      {
        stepNumber: 2,
        phase: '15–30 sn · Devre & Soda Lime İzolasyonu',
        action: 'FiCO₂ > 0 ise FGF’yi ≥10 L/dk yap, absorban ve valfleri kontrol et',
        detail: 'Taze gaz akımını dakika ventilasyonunun en az 2 katına çıkararak yeniden solumayı hemen azalt. Soda lime rengini, kanister ısısını ve tek yönlü valf disklerinin hareketini incele; düzelmezse Ambu’ya geç.',
        checkTip: 'Soda lime kanisterini değiştirirken devre kaçağına dikkat et.'
      },
      {
        stepNumber: 3,
        phase: '30–60 sn · Hasta & Ventilatör Kontrolü',
        action: 'V̇E, Ppeak ve akciğer seslerini kontrol ederek hipoventilasyonu/obstrüksiyonu çöz',
        detail: 'Solunum sayısı ve tidal hacmin hastaya ulaşıp ulaşmadığını doğrula. Tüp içi sekresyonu aspire et, bronkospazmda salbutamol ve anestezi derinliği uygula; pnömotoraks/kapnotoraks açısından iki hemitoraksı dinle.',
        checkTip: 'Bronkospazmda RR’yi aşırı artırmak oto-PEEP yapar; önce obstrüksiyonu çöz.'
      },
      {
        stepNumber: 4,
        phase: '1–2 dk · Cerrahi & İlaç Zamanlamasını Sorgula',
        action: 'Laparoskopi, turnike açılması ve NaHCO₃ bolusunu kontrol et',
        detail: 'İntraabdominal CO₂ insuflasyon basıncını (hedef ≤12–15 mmHg) sorgula ve boyun/göğüste cilt altı krepitasyonu palpe et. Turnike gevşetilmesi veya NaHCO₃ sonrası ise 3–5 dakikalık geçici pik beklenir.',
        checkTip: 'Subkutan amfizem varsa cerrahtan insuflasyonu azaltmasını/durdurmasını iste.'
      },
      {
        stepNumber: 5,
        phase: 'Kırmızı Alarm · Hipermetabolik Kriz Taraması',
        action: 'Taşikardi, ateş, masseter spazmı / rijidite varsa Malign Hipertermiyi dışla',
        detail: 'Ventilasyon artışına dirençli EtCO₂ tırmanışı MH’nin en erken belirtisidir. Volatili kapat, %100 O₂ yüksek akım aç, Dantrolen 2.5 mg/kg IV hazırlat, aktif karbon filtresi yerleştir ve MH kriz protokolüne geç.',
        checkTip: 'Ateş geç bulgudur; ateşin yükselmesini bekleme!'
      },
      {
        stepNumber: 6,
        phase: 'Doğrulama · AKG & Hedef PaCO₂ Ayarı',
        action: 'Dirençli hiperkapnide Arteriyel Kan Gazı (AKG) ile PaCO₂ ve pH doğrula',
        detail: 'KOAH, ileri yaş ve azalmış kalp debisinde PaCO₂–EtCO₂ farkı (>10 mmHg) açılabilir. KİBAS / nörocerrahide PaCO₂ 35–38 mmHg hedeflenirken, ağır KOAH’ta hastanın bazal PaCO₂ düzeyi göz önünde bulundurulmalıdır.',
        checkTip: 'Cerrahi sonrası pH < 7.20 veya ciddi aritmi varsa mekanik/metabolik neden düzeltilmeden ekstübe etme.'
      }
    ],
    pearlsAndPitfalls: {
      pearls: [
        'FiCO₂ > 0 mmHg olması patognomonik olarak hasta dışı bir sorun (tükenmiş soda lime, takılı kalmış valf veya düşük FGF ile Mapleson/yarı açık devre) gösterir.',
        'Malign Hipertermi vakalarının büyük çoğunluğunda ilk ve en duyarlı bulgu açıklanamayan EtCO₂ artışı ve sinüs taşikardisidir; vücut sıcaklığı artışı geç ortaya çıkabilir.',
        'Laparoskopide subkutan amfizem geliştiğinde CO₂ emilim yüzeyi çok genişlediği için dakika ventilasyonu %50–100 artırılsa dahi hiperkapni sürebilir — insuflasyon basıncı düşürülmelidir.',
        'Turnike açılması ve IV NaHCO₃ sonrası EtCO₂ sıçramaları 1–5 dakikada pik yapıp söner; KPR sırasında ise ani EtCO₂ artışı ROSC’un en erken habercisidir.'
      ],
      pitfalls: [
        'Sadece ventilatör frekansını artırıp FiCO₂ taban çizgisine bakmamak, tükenmiş soda lime veya ekspiratuvar valf arızasını maskeleyip ağır hiperkapniye yol açar.',
        'Bronkospazm veya KOAH’ta sadece solunum sayısını hızlandırmak ekspirasyon süresini kısaltarak hava hapsini (oto-PEEP) ve hipotansiyonu derinleştirir.',
        'Malign hipertermi başlangıcında "laparoskopiye veya hafif anesteziye bağlıdır" diyerek Dantrolen ve volatil kesilmesini geciktirmek mortaliteyi dramatik artırır.',
        'Ağır KOAH hastasında AKG görmeden EtCO₂’yi 35 mmHg’ye çekmeye çalışmak iyatrojenik alkaloz ve hipotansiyona neden olabilir.'
      ]
    },
    equipmentChecklist: [
      'Kendiliğinden şişen Ambu balonu + %100 O₂ bağlantı hortumu (devre dışı kurtarma için)',
      'Yedek taze CO₂ absorban (Soda Lime) kanisteri',
      'Endotrakeal aspirasyon sondası ve bronkodilatör (Salbutamol MDI / adaptör)',
      'Arteriyel Kan Gazı (AKG) heparinize enjektör (PaCO₂, pH, K⁺, Laktat)',
      'Dantrolen flakonları + aktif karbon filtreleri (Malign Hipertermi krizi ihtimaline karşı)'
    ],
    references: [
      {
        citation: "Gropper MA, Eriksson LI, Fleisher LA, et al. (Eds.). Miller's Anesthesia. 9th–10th ed. Elsevier. (Respiratory Monitoring: Capnography & Perioperative Hypercapnia)."
      },
      {
        citation: "Butterworth JF, Mackey DC, Wasnick JD. Morgan & Mikhail's Clinical Anesthesiology. 7th ed. McGraw-Hill. (Breathing Systems, CO₂ Absorbents & Capnography)."
      },
      {
        citation: 'Rüffert H, Bastian B, Bendixen D, et al. (EMHG). Consensus guidelines on perioperative management of malignant hyperthermia suspected or susceptible patients. British Journal of Anaesthesia. 2021;126(1):120–130.',
        pmid: '33269407'
      },
      {
        citation: 'Apfelbaum JL, Hagberg CA, Connis RT, et al. 2022 ASA Practice Guidelines for Management of the Difficult Airway & ASA Standards for Basic Anesthetic Monitoring. Anesthesiology. 2022;136(1):31–81.',
        pmid: '34762729'
      }
    ],
    tags: [
      'etco2 yükselmesi',
      'hiperkapni',
      'kapnografi',
      'fico2',
      'rebreathing',
      'soda lime',
      'malign hipertermi',
      'laparoskopi',
      'subkutan amfizem',
      'bronkospazm',
      'shark fin',
      'kurar çentiği',
      'bikarbonat',
      'turnike'
    ]
  },
  {
    id: 'etco2-decrease',
    title: 'İntraoperatif End-Tidal Karbondioksit (EtCO₂) Azalması',
    subtitle: 'Ani Düşüş, Sıfırlanma (Flatline), Özofageal Entübasyon, Emboli ve Düşük Kalp Debisi Ayrımı',
    categoryLabel: 'Kapnografi & Perfüzyon Krizi',
    urgency: 'critical',
    primaryAlarm: 'EtCO₂ = 0–5 mmHg (Ani Sıfırlanma / Kriz) · < 25–30 mmHg veya Bazalden >10–15 mmHg Düşüş (Hipoperfüzyon / Emboli) · < 35 mmHg (Hipokapni)',
    physiologyFormula: 'EtCO₂ ∝ (Q̇ [Pulmoner Perfüzyon] · V̇CO₂) ÷ V̇A · Ani Düşüş = Kalp Debisi / Devre / Emboli!',
    summary:
      'İntraoperatif EtCO₂ azalması veya ani sıfırlanması her zaman hastanın "hiperventile edildiği" anlamına gelmez. Ani ve keskin düşüşler öncelikle Kardiyak Arrest, Masif Pulmoner/Hava Embolisi, Ağır Hipotansiyon, Özofageal Entübasyon veya Solunum Devresi Ayrılması gibi ölümcül krizlerin habercisidir. Kademeli düşüşlerde ise aşırı hiperventilasyon ve hipotermi ön plandadır.',
    goldenSixtySeconds: [
      'DERHAL hastanın nabzını, kan basıncını (IBP/NIBP) ve EKG ritmini kontrol et: Ani EtCO₂ çöküşü + nabızsızlık veya derin hipotansiyon = Kardiyak Arrest / Masif Emboli / Ağır Şok (Cerrahiyi durdur, KPR veya vazopressör başlat!).',
      'Göğüs kafesi hareketlerini, endotrakeal tüp yerini ve solunum devresini gözden-bağlantıya kadar elle kontrol et (devre ayrılması, kazara ekstübasyon, sönmüş kaf, tüp tıkanması).',
      'Yeni entübasyondan hemen sonra EtCO₂ sıfırsa veya 3–5 solukta sönüyorsa: "No Trace = Wrong Place" (NAP4) → Aksi kanıtlanana kadar ÖZOFAGEAL ENTÜBASYON kabul et, hemen çıkar ve maskeyle havalandır!',
      'Ventilatör ekranında ekspiratuvar tidal hacim (VTe) ve Ppeak’i kontrol et: Ppeak ↓ + VTe ≈ 0 ise devre ayrılması/kaçak; Ppeak ↑↑ + hipotansiyon + EtCO₂ ↓ ise Tansiyon Pnömotoraks veya tam tüp tıkanıklığı!',
      'Örnekleme hattı (sample line) ve su tutucuyu kontrol et (tıkanma/kopma); hastanın klinik durumu stabilse ve Ppeak/VTe normalse aşırı dakika ventilasyonu (hiperventilasyon) veya hipotermiyi düzelt.'
    ],
    capnogramPatterns: [
      {
        id: 'flatline-zero',
        label: 'Ani Sıfır / Düz Çizgi (Flatline)',
        subtitle: 'EtCO₂ = 0 mmHg · Acil Kontrol!',
        meaning: 'Kardiyak arrest (nabızsız), solunum devresi ayrılması (disconnection), kazara ekstübasyon, tam tüp tıkanıklığı veya kapnograf örnekleme hattı kopması/su tıkanması.',
        action: 'Önce nabız + göğüs hareketi + devreyi kontrol et; klinik normalse sample line ve su tutucuyu değiştir.',
        tone: 'danger',
        baselineY: 50,
        svgPath: 'M 4 50 L 32 50 L 36 18 L 64 18 L 68 50 L 156 50'
      },
      {
        id: 'exponential-decay',
        label: 'Basamaklı / Üstel Düşüş (Washout)',
        subtitle: 'Her Solukta Kısalan Kare Dalgalar',
        meaning: 'Pulmoner kan akımının ani azalması: Masif Pulmoner Emboli (PE), Venöz Hava Embolisi (VAE), Tansiyon Pnömotoraks, Anafilaktik/Hemorajik Şok veya Kardiyak Arrest başlangıcı.',
        action: 'Hemodinamiyi ve cerrahi sahayı (hava/emboli) değerlendir; %100 O₂, sıvı/adrenalin-noradrenalin desteği ve emboli/arrest protokolünü başlat.',
        tone: 'danger',
        baselineY: 50,
        svgPath: 'M 4 50 L 14 50 L 18 14 L 40 14 L 44 50 L 54 50 L 58 26 L 80 26 L 84 50 L 94 50 L 98 37 L 120 37 L 124 50 L 134 50 L 138 45 L 154 45 L 156 50'
      },
      {
        id: 'esophageal-decay',
        label: 'Sönerek Kaybolan Kubbe (Özofageal)',
        subtitle: 'NAP4: "No Trace = Wrong Place"',
        meaning: 'Entübasyon sonrası midedeki artık CO₂ nedeniyle ilk 2–3 küçük, yuvarlak dalga sonrası plato oluşmadan hızla sıfırlanma: Özofageal entübasyon!',
        action: 'Oskültasyona aldanma; tüpü derhal çıkar, %100 O₂ yüz maskesi ile havalandır ve videolaringoskopla yeniden entübe et.',
        tone: 'warning',
        baselineY: 50,
        svgPath: 'M 4 50 Q 22 30 40 50 L 52 50 Q 66 39 80 50 L 92 50 Q 102 46 112 50 L 156 50'
      },
      {
        id: 'low-plateau',
        label: 'Düşük Kare Plato (< 30 mmHg)',
        subtitle: 'Düzenli Şekil · Azalmış Genlik',
        meaning: 'Aşırı hiperventilasyon (↑V̇E), derin hipotermi (↓V̇CO₂), ya da artmış alveoler ölü boşluk / orta düzey düşük kalp debisi (PaCO₂–EtCO₂ farkı açılmış).',
        action: 'AKG almadan ventilasyonu körlemesine kısma; PaCO₂ ile teyit edip hiperventilasyon varsa RR/VT düşür.',
        tone: 'info',
        baselineY: 50,
        svgPath: 'M 4 50 L 20 50 L 24 36 L 60 36 L 64 50 L 86 50 L 90 36 L 126 36 L 130 50 L 156 50'
      }
    ],
    differentialDiagnosis: [
      {
        condition: 'Kardiyak Arrest veya Ağır Kardiyovasküler Kollaps (↓Q̇)',
        mechanism: 'Perfüzyon / Kalp Debisi Düşüşü (↓Q̇)',
        frequency: 'Acil',
        clues: 'Normal VTe ve normal Ppeak eşliğinde EtCO₂’nin saniyeler içinde çökmesi veya sıfırlanması; nabızsızlık, IBP çizgisinin düzleşmesi, SpO₂ sinyal kaybı.',
        confirmatoryTest: 'Karotis/femoral nabız palpasyonu (≤10 sn), EKG ritmi (VF/pVT/PEA/Asistoli) ve invaziv arter trasesi.',
        immediateAction: 'Derhal KPR (göğüs kompresyonu) başlat, tetikleyici cerrahiyi durdur, %100 O₂ aç ve ACLS protokolünü (Adrenalin 1 mg / Defibrilasyon) uygula (KPR hedef EtCO₂ > 10–20 mmHg).'
      },
      {
        condition: 'Masif Pulmoner Emboli (PTE), Yağ veya Kemik Çimentosu Embolisi (BCIS)',
        mechanism: 'Perfüzyon / Kalp Debisi Düşüşü (↓Q̇)',
        frequency: 'Acil',
        clues: 'Yüksek riskli hasta, ortopedik çimentolama, uzun kemik/pelvik cerrahi veya turnike gevşetilmesi sonrası ani EtCO₂ düşüşü + ani hipotansiyon + hipoksemi + taşikardi + artmış CVP.',
        confirmatoryTest: 'AKG’de genişlemiş PaCO₂–EtCO₂ gradienti (>15–30 mmHg), yatak başı TTE/TEE’de sağ ventrikül dilatasyonu (McConnell bulgusu, D-shape septum).',
        immediateAction: '%100 O₂, aşırı sıvıdan kaçınarak Noradrenalin ile koroner/sistemik perfüzyonu koru ve Anestezi Acilleri → Akut PE Protokolünü başlat.'
      },
      {
        condition: 'Venöz Hava Embolisi (VAE) veya Laparoskopik CO₂ Gaz Embolisi',
        mechanism: 'Perfüzyon / Kalp Debisi Düşüşü (↓Q̇)',
        frequency: 'Acil',
        clues: 'Oturur kraniyotomi, kalp düzeyinden yukarı açık venöz saha, santral kateter manipulasyonu veya laparoskopik insuflasyon sırasında ani EtCO₂ düşüşü + hipotansiyon + hipoksemi (+ "değirmen çarkı" üfürümü).',
        confirmatoryTest: 'Prekordiyal Doppler değişikliği, TEE’de sağ kalpte hava ("snowstorm"), N₂O kullanılıyorsa keskin kötüleşme.',
        immediateAction: 'Cerrahi sahayı SF ile yıkattır/kapat, N₂O’yu hemen kes (%100 O₂), PEEP uygulama, Durant pozisyonu (sol lateral Trendelenburg) ve CVC’den hava aspire et (Anestezi Acilleri → Hava Embolisi Protokolü).'
      },
      {
        condition: 'Özofageal Entübasyon veya Kazara Ekstübasyon',
        mechanism: 'Hava Yolu / Devre Kaybı',
        frequency: 'Acil',
        clues: 'Entübasyon sonrası kapnogramın hiç çıkmaması veya 2–5 solukta küçülerek sıfırlanması; epigastrik şişme, SpO₂’de gecikmiş ama progresif düşüş. Ekstübasyonda VTe kaybı ve düşük basınç alarmı.',
        confirmatoryTest: 'NAP4 kuralı: Dalga formu kapnografi olmaması ("No Trace = Wrong Place") ve videolaringoskopi ile kord vokal doğrulaması.',
        immediateAction: 'Şüpheli tüpü derhal çıkar, %100 O₂ yüz maskesi ile havalandır ve görerek yeniden entübe et.'
      },
      {
        condition: 'Solunum Devresi Ayrılması, Tam Tüp Tıkanıklığı veya Majör Kaf Kaçağı',
        mechanism: 'Hava Yolu / Devre Kaybı',
        frequency: 'Çok Yaygın',
        clues: 'Devre ayrılması ve büyük kaf kaçağında VTe ≈ 0 ve Ppeak çok düşüktür; tam tüp tıkanması/ısırma/kıvrılmada ise Ppeak çok yüksek, VTe ≈ 0 ve EtCO₂ sıfırdır.',
        confirmatoryTest: 'Tüpten anestezi makinesine tüm bağlantıların el ile kontrolü, aspirasyon sondası geçişi, Ambu ile manuel ventilasyon hissi.',
        immediateAction: 'Ayrılan devreyi hemen birleştir, tüp kıvrılmasını/ısırmayı aç veya aspire et; çözülemiyorsa tüpü değiştir ve Ambu ile ventile et.'
      },
      {
        condition: 'Tansiyon Pnömotoraks veya Akut Kardiyak Tamponad',
        mechanism: 'Perfüzyon / Kalp Debisi Düşüşü (↓Q̇)',
        frequency: 'Acil',
        clues: 'SVK girişimi, laparoskopi, toraks travması veya yüksek PEEP sonrası Ppeak’te ani sıçrama + tek taraflı solunum ses kaybı + trakea deviasyonu + derin hipotansiyon + EtCO₂ çöküşü.',
        confirmatoryTest: 'Akciğer USG’de plevral kayma (lung sliding) kaybı ve barkod bulgusu; tamponadda TTE’de perikardiyal efüzyon ve sağ atriyal kollaps.',
        immediateAction: 'Tansiyon pnömotoraksta derhal 2. interkostal aralık midklaviküler veya 4–5. İKA ön/orta aksiller hattan iğne dekompresyonu (14G) → tüp torakostomi.'
      },
      {
        condition: 'Alveoler Hiperventilasyon (↑V̇A)',
        mechanism: 'Alveoler Hiperventilasyon (↑V̇A)',
        frequency: 'Çok Yaygın',
        clues: 'Hemodinami tamamen stabil, Ppeak/VTe ve kapnogram şekli normal kare dalga ancak genlik düşük (EtCO₂ < 30–35 mmHg); genellikle yüksek solunum sayısı/VT ayarı veya ağrıya bağlı spontan takipne.',
        confirmatoryTest: 'Dakika ventilasyonunun (V̇E) hastanın IBW’sine göre aşırı yüksek olması; AKG’de PaCO₂ < 35 mmHg ve respiratuvar alkaloz (pH > 7.45).',
        immediateAction: 'Hemodinami ve perfüzyon normalse solunum sayısını veya tidal hacmi kademeli düşürerek normokapni (EtCO₂ 35–42 mmHg) sağla; ağrı/hafif anestezide analjezi ekle.'
      },
      {
        condition: 'Kapnograf Örnekleme Hattı (Sample Line) Kopması veya Su Tutucu Tıkanıklığı',
        mechanism: 'Hava Yolu / Devre Kaybı',
        frequency: 'Çok Yaygın',
        clues: 'Hasta normotansif, SpO₂ %98–100, göğüs hareketleri ve VTe normal iken EtCO₂ sıfıra düşer veya yapay olarak çok düşük/düzensiz görünür; hattın kıvrılması, gevşemesi veya su dolması.',
        confirmatoryTest: 'HME filtre portundaki Luer-lock bağlantının ve su tutucunun (water trap) görsel kontrolü; aspirasyon sesi veya "occlusion" monitör uyarısı.',
        immediateAction: 'Sample line bağlantısını sıkılaştır, kıvrılmayı aç veya su tutucuyu/örnekleme hattını değiştir.'
      },
      {
        condition: 'Derin Hipotermi veya Derin Anestezi (↓V̇CO₂)',
        mechanism: 'Azalmış CO₂ Üretimi (↓V̇CO₂)',
        frequency: 'Yaygın',
        clues: 'Kardiyopulmoner bypass, uzun açık batın/travma cerrahisinde kor sıcaklığın <35°C’ye düşmesiyle metabolik hız ve CO₂ üretimi her 1°C düşüşte ~%6–7 azalır; kapnogram şekli normaldir.',
        confirmatoryTest: 'Özofageal/nazofaringeal/mesane sıcaklık probu (<35°C) ve stabil hemodinami.',
        immediateAction: 'Aktif ısıtma (forced-air warmer, ısıtılmış IV sıvılar) başlat ve gereksiz aşırı hiperventilasyonu azalt.'
      }
    ],
    algorithmicSteps: [
      {
        stepNumber: 1,
        phase: '0–10 sn · Hasta & Hemodinami İlk Kontrolü',
        action: 'Nabız, IBP/NIBP ve EKG’yi kontrol ederek Kardiyak Arresti dışla',
        detail: 'EtCO₂ monitörizasyonu yalnızca ventilasyonu değil pulmoner kan akımını (kalp debisini) da gösterir. Ani düşüşe hipotansiyon veya nabızsızlık eşlik ediyorsa ilk saniyede arrest/emboli/şok düşün.',
        checkTip: 'Düz EtCO₂ + nabızsızlık = Önce KPR başlat, sensörle vakit kaybetme!'
      },
      {
        stepNumber: 2,
        phase: '10–30 sn · Devre, ETT & Ventilatör Ekranı',
        action: 'Göğüs kalkışını gözle, bağlantıları kontrol et, Ppeak ve VTe’yi oku',
        detail: 'Ppeak çok düşük + VTe ≈ 0 ise devre ayrılması veya kaf kaçağı vardır. Ppeak çok yüksek + VTe ≈ 0 ise tam tüp tıkanması, kıvrılma veya tansiyon pnömotoraks ara. Gerekirse Ambu (%100 O₂) ile manuel havalandır.',
        checkTip: 'Yeni entübasyonsa ve iz yoksa NAP4: Özofageal entübasyon kabul et!'
      },
      {
        stepNumber: 3,
        phase: '30–60 sn · Kapnogram & Örnekleme Hattı Ayrımı',
        action: 'Göğüs hareketi ve SpO₂ normalse sample line ve su tutucuyu kontrol et',
        detail: 'Hastanın solunumu, VTe ve hemodinamisi tamamen normalken sadece EtCO₂ çizgisi sıfıra indiyse örnekleme hattı gevşemiş, bükülmüş veya su/sekresyonla tıkanmıştır.',
        checkTip: 'Sample line değiştirdikten sonra dalga formunun dönüşünü doğrula.'
      },
      {
        stepNumber: 4,
        phase: '1–2 dk · Emboli & Obstrüktif Şok Taraması',
        action: 'Basamaklı düşüş + hipotansiyonda PE, VAE veya Tansiyon Pnömotoraks ara',
        detail: 'Cerrahi sahayla zamanlamayı sorgula (kemik çimentosu, oturur pozisyon açık ven, laparoskopi insuflasyonu, SVK sonrası). Akciğer seslerini dinle, POCUS/TEE bak, N₂O kapat ve vazoaktif destek başla.',
        checkTip: 'Masif PE/VAE’de EtCO₂ düşük olsa bile PaCO₂ çok yüksektir (geniş ölü boşluk).'
      },
      {
        stepNumber: 5,
        phase: 'Fizyolojik Düzeltme · Hiperventilasyon & Hipotermi',
        action: 'Hemodinami ve devre stabilse V̇E ve vücut ısısını optimize et',
        detail: 'İstenmeyen hiperkapni dışı serebral vazokonstriksiyonu önlemek için aşırı RR/VT’yi azalt (normokapni 35–42 mmHg hedefle; beyin cerrahisi özel endikasyonları hariç) ve hastayı aktif ısıt.',
        checkTip: 'Serebral otoregülasyon: PaCO₂ < 28–30 mmHg serebral iskemiyi tetikleyebilir.'
      },
      {
        stepNumber: 6,
        phase: 'Doğrulama · AKG ile PaCO₂–EtCO₂ Gradienti',
        action: 'Nedeni netleşmeyen veya şok/emboli eşlik eden düşüşlerde AKG al',
        detail: 'Normal PaCO₂–EtCO₂ farkı 2–5 mmHg’dir. Düşük kalp debisi, şok, PE ve yaşlı/KOAH hastalarda bu fark >15–30 mmHg’ye çıkabileceğinden ventilasyon ayarı mutlaka AKG PaCO₂ değerine göre yapılmalıdır.',
        checkTip: 'AKG görmeden düşük kalp debili hastada dakika ventilasyonunu asla kısma!'
      }
    ],
    pearlsAndPitfalls: {
      pearls: [
        'Ani EtCO₂ düşüşü, SpO₂ düşüşünden DAKİKALAR ÖNCE ortaya çıkar; erken uyarı olarak hayati değer taşır.',
        'Yeni entübe edilen hastada kapnogram alınamıyorsa NAP4 altın kuralı geçerlidir: "No Trace = Wrong Place" — steteskopla "ses duydum" diyerek özofageal entübasyonda ısrar etme.',
        'Pulmoner emboli ve ağır hipotansiyonda alveoler ölü boşluk arttığı için EtCO₂ düşerken gerçek arteriyel PaCO₂ yükselir; AKG almadan gerçek PaCO₂ tahmin edilemez.',
        'KPR sırasında EtCO₂ < 10 mmHg olması yetersiz göğüs basısı veya çok kötü prognoz ile ilişkilidir; ani >35–40 mmHg sıçrama ise ROSC habercisidir.'
      ],
      pitfalls: [
        'Ani EtCO₂ düşüşü görünce reflekse kapılıp "hasta hiperventile oluyor" diyerek ventilatörü kısmak — neden düşük kalp debisi/emboli ise ağır hiperkapni ve arresti hızlandırır.',
        'Düz kapnogramı yalnızca monitör/kablo hatası sanıp hastanın nabzını, kan basıncını ve ETT bağlantısını kontrol etmemek.',
        'Aşırı hiperventilasyonla (EtCO₂ < 25–30 mmHg) serebral vazokonstriksiyona ve intratorasik basınç artışına bağlı venöz dönüş azalmasına yol açmak.',
        'Su tutucu veya örnekleme hattı tıkanıklığı sonrası alarmı kapatıp monitörsüz anestezi sürdürmek.'
      ]
    },
    equipmentChecklist: [
      'Kendiliğinden şişen Ambu balonu + %100 O₂ kaynağı (devre dışı manuel ventilasyon)',
      'Videolaringoskop + yedek endotrakeal tüp & aspirasyon sondası (özofageal/tıkanık tüp)',
      'Yedek kapnograf örnekleme hattı (sample line) ve su tutucu (water trap)',
      '14G uzun angiokat / toraks dekompresyon iğnesi (tansiyon pnömotoraks için)',
      'Yatak başı USG / TTE-TEE probu ve Arteriyel Kan Gazı (AKG) enjektörü',
      'Acil vazoaktif ilaçlar (Adrenalin, Noradrenalin, Efedrin/Fenilefrin)'
    ],
    references: [
      {
        citation: "Gropper MA, Eriksson LI, Fleisher LA, et al. (Eds.). Miller's Anesthesia. 9th–10th ed. Elsevier. (Respiratory Monitoring: Capnography & Causes of Decreased EtCO₂)."
      },
      {
        citation: "Butterworth JF, Mackey DC, Wasnick JD. Morgan & Mikhail's Clinical Anesthesiology. 7th ed. McGraw-Hill. (Clinical Monitoring: Capnography & Embolic Events)."
      },
      {
        citation: 'Cook TM, Woodall N, Frerk C. Major complications of airway management in the UK: results of the Fourth National Audit Project (NAP4). British Journal of Anaesthesia. 2011;106(5):617–642.',
        pmid: '21447488'
      },
      {
        citation: 'Konstantinides SV, Meyer G, Becattini C, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism. European Heart Journal. 2020;41(4):543–603.',
        pmid: '31697840'
      },
      {
        citation: 'Mirski MA, Lele AV, Fitzsimmons L, Toung TJ. Diagnosis and treatment of vascular air embolism. Anesthesiology. 2007;106(1):164–177.',
        pmid: '17197859'
      }
    ],
    tags: [
      'etco2 azalması',
      'etco2 düşüşü',
      'hipokapni',
      'kapnografi',
      'kardiyak arrest',
      'pulmoner emboli',
      'hava embolisi',
      'vae',
      'özofageal entübasyon',
      'nap4',
      'devre ayrılması',
      'tansiyon pnömotoraks',
      'hiperventilasyon',
      'hipotermi',
      'sample line'
    ]
  },
  {
    id: 'fico2-elevation',
    title: 'İntraoperatif Dönemde FiCO₂ Yükselmesi (Yeniden Soluma)',
    subtitle: 'İnspiratuvar CO₂ > 0 mmHg · Soda Lime Tükenmesi, Tek Yönlü Valf Arızası ve Devre Kaynaklı Rebreathing',
    categoryLabel: 'Solunum Devresi & Absorban Krizleri',
    urgency: 'critical',
    primaryAlarm: 'FiCO₂ > 2 mmHg (İnspiratuvar Taban Çizgisi Sıfıra İnmiyor) · Sekonder EtCO₂ Yükselmesi',
    physiologyFormula: 'FiCO₂ > 0 mmHg = Hasta Dışı Ekipman / Devre Sorunu (Absorban · Tek Yönlü Valf · Düşük FGF / Ölü Boşluk)',
    summary:
      'Normal anestezi devresinde inspiryum sırasındaki CO₂ konsantrasyonu (FiCO₂) 0 mmHg olmalıdır. Kapnogramın taban çizgisinin sıfıra dönmemesi (FiCO₂ > 0–2 mmHg), hastanın kendi ekshale ettiği CO₂’yi tekrar soluduğunu (rebreathing) gösterir. Neden neredeyse her zaman CO₂ absorbanı (soda lime) tükenmesi, tek yönlü valf diski arızası, kanister bypass/kanalizasyonu veya yetersiz taze gaz akımıdır.',
    goldenSixtySeconds: [
      'Taze Gaz Akımını (FGF) DERHAL dakika ventilasyonunun ≥2× üzerine çıkar (10–15 L/dk): FiCO₂ hızla düşüyorsa neden kesinlikle devredeki yeniden solumadır ve hastayı anında korursun.',
      'Soda Lime (CO₂ absorbanı) kanisterini görsel ve elle kontrol et: Mor/menekşe renk değişimi var mı? Kanister soğuk mu? (Kurumuş veya tükenmiş soda lime sıcak değil soğuktur; beyaz renk geri dönüşüne aldanma!).',
      'İnspiratuvar ve Ekspiratuvar tek yönlü valf kapaklarından valf disklerinin her nefeste tam kapanıp açıldığını gözle (nemle yapışmış, açık takılı kalmış veya kırık disk var mı?).',
      'Kanister kilidini, contalarını ve makine üzerindeki absorban bypass kolunun (varsa) kapalı olduğunu doğrula.',
      'Sorun 1–2 dakika içinde çözülemiyor veya FiCO₂ yükselmeye devam ediyorsa hastayı devreden ayırıp kendiliğinden şişen Ambu balonu (%100 O₂) ile ventile et!'
    ],
    capnogramPatterns: [
      {
        id: 'elevated-flat-baseline',
        label: 'Yükselmiş Taban Çizgisi (Soda Lime Tükenmiş)',
        subtitle: 'FiCO₂ > 2–10 mmHg · Progresif Tırmanış',
        meaning: 'Ekshale edilen CO₂ absorbanda tutulamaz; hem inspiryum taban çizgisi hem de EtCO₂ yükselir. Yüksek FGF (≥10 L/dk) açıldığında taban çizgisi hızla sıfıra yaklaşır.',
        action: 'FGF’yi ≥10 L/dk yap ve soda lime kanisterini değiştir (kanister değişiminde devre kaçağına dikkat).',
        tone: 'danger',
        baselineY: 36,
        svgPath: 'M 4 36 L 22 36 L 26 11 L 62 11 L 66 36 L 88 36 L 92 10 L 128 10 L 132 36 L 156 36'
      },
      {
        id: 'slurred-downstroke-valve',
        label: 'Eğimli Faz 0 İnişi + Yüksek Taban (Valf Arızası)',
        subtitle: 'İnspiratuvar İniş Yavaş & Sıfıra İnemiyor',
        meaning: 'Ekspiratuvar veya inspiratuvar tek yönlü valf açık takılı kalmıştır: İnspirasyonda ekspiryum kolundan CO₂ geri çekildiği için Faz 0 inişi dik düşemez (slurred downstroke).',
        action: 'Valf kubbelerini kontrol et; diski kurula/değiştir, çözülmüyorsa Ambu balonu + harici O₂ ile ventile et.',
        tone: 'danger',
        baselineY: 38,
        svgPath: 'M 4 38 L 16 38 L 20 12 L 54 12 L 74 38 L 86 38 L 90 12 L 124 12 L 144 38 L 156 38'
      },
      {
        id: 'mapleson-low-fgf',
        label: 'Düşük Akımlı Yarı Açık Devre (Bain/Mapleson)',
        subtitle: 'Yetersiz FGF → Sabit Yüksek FiCO₂',
        meaning: 'Absorbansız Mapleson/Bain devrelerinde taze gaz akımı dakika ventilasyonunun altında kalırsa ekshale gazlar temizlenemez.',
        action: 'Bain/Mapleson D’de FGF’yi V̇E’nin en az 1.5–2.5 katına (genellikle 70–100+ mL/kg/dk veya ≥10 L/dk) çıkar.',
        tone: 'warning',
        baselineY: 40,
        svgPath: 'M 4 40 L 20 40 L 24 15 L 60 15 L 64 40 L 84 40 L 88 15 L 124 15 L 128 40 L 156 40'
      },
      {
        id: 'sensor-zero-drift',
        label: 'Sabit Kaymış Taban (Sensör Sıfır Hatası)',
        subtitle: 'FGF 15 L/dk’ya Rağmen FiCO₂ Değişmiyor',
        meaning: 'Yüksek taze gaz akımı ve harici Ambu denemesinde dahi FiCO₂ sabit +2/+4 mmHg kalıyorsa kapnograf sıfır kalibrasyonu kaymıştır.',
        action: 'Örnekleme hattını oda havasına alıp sıfır kalibrasyonu (Zeroing) yap ve AKG PaCO₂ ile teyit et.',
        tone: 'info',
        baselineY: 43,
        svgPath: 'M 4 43 L 22 43 L 26 17 L 62 17 L 66 43 L 88 43 L 92 17 L 128 17 L 132 43 L 156 43'
      }
    ],
    differentialDiagnosis: [
      {
        condition: 'CO₂ Absorbanının (Soda Lime) Tükenmesi (Exhausted Absorbent)',
        mechanism: 'Absorban Yetmezliği',
        frequency: 'Çok Yaygın',
        clues: 'Özellikle düşük akımlı anestezide (0.5–1 L/dk) FiCO₂ kademeli olarak 0’dan 3–10+ mmHg’ye tırmanır; granüller mor/menekşe renk alır ve kimyasal ekzotermik reaksiyon bittiği için kanister soğur.',
        confirmatoryTest: 'FGF 10–15 L/dk’ya çıkarıldığında FiCO₂’nin 30–60 saniye içinde hızla düşmesi; kanister alt/üst bölümünün renk ve ısı muayenesi.',
        immediateAction: 'Derhal FGF’yi ≥10 L/dk’ya çıkar ve tükenmiş soda lime kanisterini yenisiyle değiştir.'
      },
      {
        condition: 'Tek Yönlü Ekspiratuvar Valf Arızası (Açık Takılı Kalma / Yapışma / Kırık)',
        mechanism: 'Tek Yönlü Valf Yetmezliği',
        frequency: 'Acil',
        clues: 'Ekspiryum kolundaki CO₂ yüklü gaz, inspirasyon fazında geri çekilir; kapnogramda Faz 0 (inspirasyon inişi) dik düşemez ve eğik/gecikmeli iner (slurred downstroke), FiCO₂ hızla yükselir.',
        confirmatoryTest: 'Şeffaf valf kubbesinden disk hareketinin izlenmesi (disk kalkık kalmış veya nemle yapışmış), valf kubbesi açıldığında sızdırmazlık hatası görülmesi.',
        immediateAction: 'FGF’yi artır, valf diski kurulanıp/onarılamıyorsa devreyi durdurup kendiliğinden şişen Ambu (+ %100 O₂) veya yedek anestezi cihazına geç.'
      },
      {
        condition: 'Tek Yönlü İnspiratuvar Valf Arızası (Açık Takılı Kalma)',
        mechanism: 'Tek Yönlü Valf Yetmezliği',
        frequency: 'Çok Yaygın',
        clues: 'Ekspiryum sırasında hastanın ekshale ettiği CO₂’li gaz inspiryum hortumuna geri itilir; bir sonraki inspirasyonda bu ölü boşluk gazı geri solunarak FiCO₂ yükselir ve Faz 0 inişi uzar.',
        confirmatoryTest: 'İnspiratuvar valf diskinde ekspiryum sırasında tam kapanmama / su damlacığıyla yapışma görülmesi.',
        immediateAction: 'FGF’yi ≥10 L/dk yap (inspiryum kolunu yıkar), mümkün olan ilk anda valf diskini kurula/değiştir veya Ambu’ya geç.'
      },
      {
        condition: 'Kanister Kanalizasyonu (Channeling), Conta Kaçağı veya Absorban Bypass Açık Kalması',
        mechanism: 'Absorban Bypass / Mekanik',
        frequency: 'Yaygın',
        clues: 'Kanisterdeki soda lime görünüşte beyaz/taze olmasına rağmen gaz granüllerin gevşek kenarından kanalize olur veya kanister kilidi tam oturmadığından absorbanı atlar; bazı cihazlarda kanister değişimi için olan bypass kolu açık unutulmuştur.',
        confirmatoryTest: 'Kanister yuvasının, O-ring contanın, gevşek granül paketlenmesinin ve bypass mekanizmasının fiziksel kontrolü.',
        immediateAction: 'Kanisteri çıkarıp tekrar sıkıca kilitle, contayı kontrol et ve bypass kolunun kapalı olduğundan emin ol.'
      },
      {
        condition: 'Yarı Açık / Mapleson (Bain, Jackson-Rees) Devrede Yetersiz Taze Gaz Akımı',
        mechanism: 'Devre Akım / Ölü Boşluk',
        frequency: 'Çok Yaygın',
        clues: 'Pediatride veya transferde kullanılan absorbansız devrelerde FGF, dakika ventilasyonunun altında kaldığında ekshale CO₂ yıkanamaz ve FiCO₂ yükselir.',
        confirmatoryTest: 'FGF’nin Mapleson devresinde artırılmasıyla FiCO₂’nin saniyeler içinde sıfırlanması.',
        immediateAction: 'Spontan solunumda FGF ≥ 2–3 × V̇E; kontrollü ventilasyonda Mapleson D/Bain için ≥ 1.5–2 × V̇E (en az 70–100 mL/kg/dk) akım sağla.'
      },
      {
        condition: 'Koaksiyel (Bain) Devre İç Tüp Kopması veya Aşırı Mekanik Ölü Boşluk',
        mechanism: 'Devre Akım / Ölü Boşluk',
        frequency: 'Yaygın',
        clues: 'Bain koaksiyel devresinde iç taze gaz tüpünün makine ucundan kopması tüm dış hortumu dev ölü boşluğa çevirir. Ayrıca fazla uzun uzatma hortumu (catheter mount) + büyük HME filtre özellikle küçük çocuklarda yeniden soluma yapar.',
        confirmatoryTest: 'Pethick testi (Bain devresi iç tüp kontrolü) veya ekstra uzatma parçaları çıkarılınca FiCO₂’nin düşmesi.',
        immediateAction: 'Arızalı koaksiyel devreyi değiştir; pediatrik/düşük VT hastalarda gereksiz mekanik ölü boşlukları (ekstra uzatma, büyük HME) kaldır.'
      },
      {
        condition: 'Kapnograf Sıfır Kalibrasyon Kayması (Zero Drift) veya Sensör Kontaminasyonu',
        mechanism: 'Monitör / Sensör Artefaktı',
        frequency: 'Yaygın',
        clues: 'FGF 15 L/dk yapıldığında ve hatta örnekleme hattı oda havasına çıkarıldığında dahi FiCO₂ sıfıra inmiyor (+2 ila +5 mmHg sabit gösteriyor); hasta normokapniktir.',
        confirmatoryTest: 'Örnekleme hattını devreden ayırıp oda havasında okunan değerin >0 mmHg kalması; AKG’de PaCO₂’nin normal çıkması.',
        immediateAction: 'Kapnograf modülünü sıfırla (zero calibration), su tutucu/örnekleme hattını değiştir.'
      },
      {
        condition: 'Ekstrem Kurumuş Soda Lime ile Volatil Etkileşimi (CO & Compound A Riski)',
        mechanism: 'Kimyasal Güvenlik Alarmı',
        frequency: 'Nadir',
        clues: 'Hafta sonu boyunca yüksek akım O₂ açık unutulmuş makinede tamamen kurumuş soda lime (özellikle NaOH/KOH içerenlerde) Desfluran/İzofluran ile Karbonmonoksit (CO) ve aşırı ısı üretir; Sevofluran ile Compound A artar.',
        confirmatoryTest: 'Kanisterde aşırı ısınma (>50–60°C), karboksihemoglobin (COHb) artışı (SpO₂ normal görünürken doku hipoksisi) veya yüksek FiCO₂.',
        immediateAction: 'Volatili kapat, FGF yüksek O₂ ile havalandır veya Ambu’ya geç, kurumuş kanisteri derhal değiştir ve CO-oksimetre/AKG ile COHb kontrol et.'
      }
    ],
    algorithmicSteps: [
      {
        stepNumber: 1,
        phase: '0–15 sn · Hızlı Tanısal & Kurtarıcı Test',
        action: 'Taze Gaz Akımını (FGF) derhal 10–15 L/dk’ya çıkar',
        detail: 'Halka devrede yüksek FGF, absorban tükenmesini ve valf yetmezliğini hızla seyreltir. FiCO₂ düşüyorsa neden kesinlikle yeniden solumadır; düşmüyorsa sensör sıfır hatasını düşün.',
        checkTip: 'Düşük akımlı (0.5–1 L/dk) anestezide FiCO₂ yükselirse ilk yapılacak iş FGF’yi açmaktır.'
      },
      {
        stepNumber: 2,
        phase: '15–30 sn · Tek Yönlü Valfleri Gözle',
        action: 'İnspiratuvar ve ekspiratuvar valf disklerinin hareketini incele',
        detail: 'Şeffaf kubbelerden her inspiryum ve ekspiryumda disklerin tam oturup açıldığını doğrula. Açık takılı kalmış veya su ile yapışmış valf varsa kapnogramın Faz 0 inişi eğikleşir.',
        checkTip: 'İnspiratuvar valf arızasında FGF artışı kolu yıkar; ekspiratuvar valf arızasında valf değişimi şarttır.'
      },
      {
        stepNumber: 3,
        phase: '30–60 sn · Soda Lime & Kanister Kontrolü',
        action: 'Absorban rengini, ısısını, kanister kilidini ve bypass kolunu kontrol et',
        detail: 'Mor/menekşe renk değişimi veya soğuk kanister tükenmiş soda lime göstergesidir. Kanister tam oturmamışsa veya granüller kanalize olmuşsa taze görünse bile CO₂ tutmaz.',
        checkTip: 'Kullanılmayıp bekleyen tükenmiş soda lime tekrar beyaza dönebilir; sadece renge güvenme!'
      },
      {
        stepNumber: 4,
        phase: '1–2 dk · Devre & Ölü Boşluk İncelemesi',
        action: 'Mapleson/Bain devre akımını, koaksiyel iç tüpü ve HME/uzatmaları kontrol et',
        detail: 'Pediatrik vakalarda gereksiz uzatma ve büyük HME filtreleri mekanik ölü boşluğu artırarak yeniden solumaya neden olur. Bain devresinde iç tüp ayrılmışsa devre tamamen yenilenmelidir.',
        checkTip: 'Ölü boşluk azaltıldığında EtCO₂ ve FiCO₂ belirgin iyileşir.'
      },
      {
        stepNumber: 5,
        phase: 'Kurtarma · Çözülemiyorsa Harici Havalandırma',
        action: 'Mekanik arıza giderilemiyorsa Ambu balonu (%100 O₂) ile ventile et',
        detail: 'Ekspiratuvar valf kırılması veya kanister değişiminde ciddi kaçak/hipoksi riski doğarsa hastayı anestezi cihazından ayırıp Ambu + TIVA (ör. Propofol) ile güvenli sürdür.',
        checkTip: 'Kanisteri açık hastada değiştirirken manuel ventilasyonu/TIVA derinliğini unutma!'
      },
      {
        stepNumber: 6,
        phase: 'Doğrulama · Sensör Sıfırlama & AKG',
        action: 'Örnekleme hattını oda havasında test et ve gerektiğinde AKG PaCO₂ al',
        detail: 'Oda havasında bile FiCO₂ > 0 kalıyorsa monitörü sıfırla (zeroing). Uzamış şiddetli rebreathing sonrası hastanın gerçek PaCO₂ ve pH değerini (veya kuru soda lime şüphesinde COHb’yi) doğrula.',
        checkTip: 'Her yeni vaka öncesi cihaz kontrolünde valfler, absorban ve sıfır kalibrasyonu doğrulanmalıdır.'
      }
    ],
    pearlsAndPitfalls: {
      pearls: [
        'FiCO₂ > 0 mmHg görülmesi neredeyse %100 oranında anestezi devresi/cihaz kaynaklıdır; hastanın metabolizması tek başına FiCO₂’yi sıfırın üzerine çıkaramaz.',
        'Tükenmiş soda lime kullanılmadan birkaç saat dinlendiğinde pH indikatörü beyaza geri dönebilir ("renk rejenerasyonu"); ancak CO₂ bağlama kapasitesi bitmiştir ve vaka başında dakikalar içinde FiCO₂ yükselir.',
        'FGF’yi 10–15 L/dk’ya çıkarmak halka devrede hem absorban tükenmesinin hem de inspiratuvar valf arızasının etkisini anında hafifleten en hızlı kurtarıcı hamledir.',
        'Kuru soda lime + Desfluran/İzofluran etkileşiminden doğan Karbonmonoksit (CO) oluşumunu önlemek için KOH/NaOH içermeyen absorbanlar tercih edilmeli ve cihaz akımları vaka bitiminde kapatılmalıdır.'
      ],
      pitfalls: [
        'FiCO₂ yükselmişken sadece ventilatör solunum sayısını artırıp taze gaz akımını düşük (0.5–1 L/dk) bırakmak — hasta CO₂’li gazı daha hızlı solumaya devam eder!',
        'Renk değişimi henüz alt tabakalara inmemiş veya beyaza dönmüş diye soğuk ve tükenmiş kanisteri değiştirmemek.',
        'Soda lime kanisterini değiştirirken devre kaçağı oluştuğunu ve hastanın ventile edilmediğini fark etmemek.',
        'Gerçek valf veya soda lime sorununu araştırmadan monitör alarmını "sensör hatası" sanıp kapatmak.'
      ]
    },
    equipmentChecklist: [
      'Yedek taze CO₂ absorban (Soda Lime / Amsorb) kanisteri',
      'Kendiliğinden şişen Ambu balonu + %100 O₂ hortumu (valf/devre arızasında kurtarma)',
      'Yedek tek yönlü valf diski ve solunum devresi',
      'Yedek kapnograf örnekleme hattı & su tutucu (zero drift / tıkanıklık kontrolü)',
      'TIVA yedek infüzyonu (Ambu ile ventilasyona geçilirse anestezi idamesi için)'
    ],
    references: [
      {
        citation: "Dorsch JA, Dorsch SE. Understanding Anesthesia Equipment. 5th ed. Lippincott Williams & Wilkins. (The Circle System, CO₂ Absorbents & Unidirectional Valves)."
      },
      {
        citation: "Butterworth JF, Mackey DC, Wasnick JD. Morgan & Mikhail's Clinical Anesthesiology. 7th ed. McGraw-Hill. (Breathing Systems, Soda Lime Exhaustion & Rebreathing)."
      },
      {
        citation: "Gropper MA, Eriksson LI, Fleisher LA, et al. (Eds.). Miller's Anesthesia. 9th–10th ed. Elsevier. (Inhaled Anesthetics, CO₂ Absorbents, Compound A & Carbon Monoxide Formation)."
      },
      {
        citation: 'Apfelbaum JL, Hagberg CA, Connis RT, et al. ASA Standards for Basic Anesthetic Monitoring & Pre-Anesthesia Checkout Recommendations. Anesthesiology. 2022;136(1):31–81.',
        pmid: '34762729'
      }
    ],
    tags: [
      'fico2 yükselmesi',
      'inspired co2',
      'yeniden soluma',
      'rebreathing',
      'soda lime',
      'co2 absorban',
      'tek yönlü valf',
      'ekspiratuvar valf',
      'inspiratuvar valf',
      'kanalizasyon',
      'channeling',
      'bain devresi',
      'ölü boşluk',
      'karbonmonoksit'
    ]
  },
  {
    id: 'ppeak-elevation',
    title: 'İntraoperatif Dönemde Tepe Hava Yolu Basıncı (Ppeak) Yükselmesi',
    subtitle: 'Yüksek İnspiratuvar Pik Basınç · Ppeak − Pplat Gradienti ile Rezistans ve Kompliyans Ayrımı',
    categoryLabel: 'Ventilatör & Hava Yolu Basınç Krizleri',
    urgency: 'critical',
    primaryAlarm: 'Ppeak > 35–40 cmH₂O (Yüksek Hava Yolu Basıncı Alarmı) · ± Pplat Yükselmesi / VTe Düşüşü',
    physiologyFormula: 'Ppeak = (Akım × Raw) + (VT / Crs) + PEEPtotal  |  ΔP = Ppeak − Pplat',
    summary:
      'Tepe inspiratuvar basınç (Ppeak); hava yolu direncini (rezistans) yansıtan akım bileşeni ile akciğer/göğüs duvarı esnekliğini (kompliyans) yansıtan elastik bileşenin toplamıdır. İnspiratuvar duraklama (inspiratory hold) ile ölçülen plato basıncı (Pplat), rezistif bileşeni devreden çıkarır. Ppeak − Pplat farkı > 5–10 cmH₂O ise sorun artmış hava yolu direncidir (kink ETT, sekresyon, bronkospazm, HME tıkanıklığı); fark normal kalıp ikisi birlikte yükseliyorsa sorun azalmış kompliyanstır (tansiyon pnömotoraks, endobronşiyal entübasyon, pnömoperitonyum, pulmoner ödem, oto-PEEP).',
    goldenSixtySeconds: [
      'Hastaya bak, SpO₂, EtCO₂ (kapnogram şekli) ve kan basıncını kontrol et: Yüksek Ppeak + ani hipotansiyon + EtCO₂ düşüşü varsa DERHAL Tansiyon Pnömotoraks veya Ağır Anaflaksi ekarte et!',
      'Hastayı ventilatörden ayırıp %100 O₂ ile manuel Ambu/balon ventilasyonuna geç: Manuel balon yumuşaksa sorun anestezi cihazı veya devrededir; balon çok sertse sorun ETT veya hastadadır.',
      'İnspiratuvar tutma (Inspiratory Hold) ile Pplat’ı ölç ve ΔP = Ppeak − Pplat farkına bak (Rezistans ↑ vs Kompliyans ↓ ayrımını saniyeler içinde yap).',
      'ETT içinden yumuşak bir aspirasyon kateteri ilerlet: Kateter ilerlemiyorsa tüp kıvrılmış (kink), hasta tüpü ısırıyor, mukus/kan tıkacı veya kaf herniasyonu mevcuttur.',
      'Her iki hemitoraksı dinle (tek taraflı ses kaybı: sağ ana bronş entübasyonu vs pnömotoraks; bilateral wheezing + shark-fin EtCO₂: bronkospazm) ve cerrahi alanı (pnömoperitonyum, Trendelenburg, ekartör baskısı) kontrol et.'
    ],
    pressurePatterns: [
      {
        id: 'normal-pressure-curve',
        label: 'Normal Basınç-Zaman Eğrisi',
        subtitle: 'Ppeak 15–20 · Pplat 12–17 cmH₂O',
        ppeakLabel: '18 cmH₂O',
        pplatLabel: '15 cmH₂O',
        gradientLabel: 'ΔP = 3 cmH₂O (Normal < 5)',
        meaning: 'Hava yolu direnci ve torakopulmoner kompliyans normal sınırlar içindedir; inspiratuvar duraklama sırasında basınç hızla hafif bir plato seviyesine iner.',
        action: 'Akciğer koruyucu hedefleri (VT 6–8 mL/kg PBW, Pplat ≤ 30 cmH₂O) koru.',
        tone: 'normal',
        svgPath: 'M 4 46 L 14 46 L 36 30 L 40 34 L 58 34 L 66 46 L 84 46 L 106 30 L 110 34 L 128 34 L 136 46 L 156 46'
      },
      {
        id: 'high-resistance-pattern',
        label: 'Artmış Hava Yolu Direnci (Rezistans ↑)',
        subtitle: 'Ppeak ↑↑ (Sivri Tepe) · Pplat Normal',
        ppeakLabel: '42 cmH₂O',
        pplatLabel: '16 cmH₂O',
        gradientLabel: 'ΔP = 26 cmH₂O (> 5–10)',
        meaning: 'Akım ile orantılı rezistif yük artmıştır; inspiratuvar tutmada akım sıfırlanınca basınç normal Pplat düzeyine düşer. Alveoller aşırı basınca maruz kalmaz.',
        action: 'HME/devreyi kontrol et, ETT’den aspirasyon kateteri geçir (kink/mukus/ısırma), bronkospazm varsa derinleştir + β₂-agonist ver.',
        tone: 'warning',
        svgPath: 'M 4 46 L 14 46 L 36 9 L 41 34 L 58 34 L 66 46 L 84 46 L 106 9 L 111 34 L 128 34 L 136 46 L 156 46'
      },
      {
        id: 'low-compliance-pattern',
        label: 'Azalmış Kompliyans (Kompliyans ↓)',
        subtitle: 'Hem Ppeak ↑ Hem Pplat ↑ (Paralel Artış)',
        ppeakLabel: '41 cmH₂O',
        pplatLabel: '37 cmH₂O',
        gradientLabel: 'ΔP = 4 cmH₂O (Normal < 5)',
        meaning: 'Hem tepe hem plato basıncı yüksek seyreder (alveoler distansiyon / barotravma riski). Sorun akciğer parankimi, plevra veya göğüs duvarı/diyafram kompliyansındadır.',
        action: 'Oskülte et: Tek taraflı ses yoksa Pnömotoraks vs Sağ Ana Bronş entübasyonu ayır; pnömoperitonyum/pozisyon/rijidite/ödemi düzelt.',
        tone: 'danger',
        svgPath: 'M 4 46 L 14 46 L 36 10 L 40 14 L 58 14 L 66 46 L 84 46 L 106 10 L 110 14 L 128 14 L 136 46 L 156 46'
      },
      {
        id: 'auto-peep-pattern',
        label: 'Oto-PEEP & Nefes Üst Üste Binmesi',
        subtitle: 'Taban Sıfıra/Ayarlı PEEP’e Dönemiyor',
        ppeakLabel: 'Kademeli ↑',
        pplatLabel: 'PEEPtot > PEEPset',
        gradientLabel: 'Dinamik Hiperinflasyon',
        meaning: 'Ekspirasyon süresi (Te) yetersiz kaldığı için bir sonraki inspiryum başlamadan akciğer boşalamaz; tuzaklanmış hava basıncı ve Ppeak/Pplat kademeli yükselir, venöz dönüş düşer.',
        action: 'Devreyi 5–10 sn ayırıp hava hapsini boşalt, solunum sayısını (f) azalt, I:E oranını uzat (1:3–1:4).',
        tone: 'info',
        svgPath: 'M 4 46 L 12 46 L 30 22 L 34 26 L 46 26 L 54 39 L 72 15 L 76 19 L 88 19 L 96 35 L 114 9 L 118 13 L 130 13 L 140 34 L 156 34'
      }
    ],
    differentialDiagnosis: [
      {
        condition: 'Tansiyon Pnömotoraks (Hayatı Tehdit Eden Akut Kriz)',
        mechanism: 'Kompliyans ↓ (Plevral)',
        frequency: 'Acil',
        clues: 'Ani veya hızlı Ppeak ve Pplat yükselmesi + açıklanamayan ani hipotansiyon (obstrüktif şok) + SpO₂ ve EtCO₂ düşüşü. Etkilenen hemitoraksta solunum sesi kaybı, perküsyonda hiperrezonans; SVK girişimi, laparoskopi, toraks/üst batın cerrahisi veya bül rüptürü sonrası gelişir.',
        confirmatoryTest: 'Klinik tanıdır (radyografi beklenmez!); yatak başı toraks USG’de "lung sliding" ve "seashore" işaretinin kaybı (barcode/stratosphere sign) veya iğne dekompresyonda hava çıkışı.',
        immediateAction: '%100 O₂ ver, PEEP’i sıfırla, derhal 4.–5. İKA ön/orta aksiller hattan (veya 2. İKA midklaviküler) acil iğne dekompresyonu (14G kanül) uygula ve tüp torakostomiye geç.'
      },
      {
        condition: 'Ağır Bronkospazm / Anaflaksi / Havayolu Reaktivitesi',
        mechanism: 'Hava Yolu Direnci ↑ (ΔP > 5–10)',
        frequency: 'Acil',
        clues: 'Ppeak belirgin yüksekken Pplat normal/hafif yüksek kalır. Kapnogramda "shark-fin" (köpekbalığı yüzgeci) görünümü ve uzamış ekspiryum; oskültasyonda bilateral wheezing (çok ağır spazmda "sessiz göğüs"). Anaflakside eşlik eden hipotansiyon, taşikardi ve ürtiker/eritem bulunur.',
        confirmatoryTest: 'Bilateral ekspiratuvar ronküs + shark-fin kapnogram + yüksek ΔP; anaflaksi şüphesinde cilt bulguları, şok ve serum triptaz.',
        immediateAction: '%100 O₂, volatil anesteziyi derinleştir (Sevofluran/İzofluran; Desfluran bronkoirritandır, kaçın!) veya Propofol/Ketamin ver, inhale Salbutamol (6–10 puf) + Ipratropium uygula. Yanıtsızsa/anaflakside IV Epinefrin (10–50 mcg bolus, anaflakside 50–100+ mcg) + IV Hidrokortizon + MgSO₄.'
      },
      {
        condition: 'Endotrakeal Tüp (ETT) Kink (Kıvrılma), Isırılma, Sekresyon Tıkacı veya Kaf Herniasyonu',
        mechanism: 'Hava Yolu Direnci ↑ (ΔP > 5–10)',
        frequency: 'Çok Yaygın',
        clues: 'Ppeak hızla yükselir, kapnogram düzleşir veya uzar. Manuel balon çok serttir ve ETT’den aspirasyon kateteri ilerlemez. Özellikle yüzüstü (prone), baş-boyun cerrahisinde tüp ısınması/bükülmesinde veya uyanma fazında hasta tüpü ısırdığında görülür.',
        confirmatoryTest: 'ETT içerisinden aspirasyon kateterinin geçmemesi; ağız içi ve boyun hizasının inspeksiyonu (bükülmüş tüp veya dişler arasında sıkışmış ETT).',
        immediateAction: 'Hasta ısırıyorsa anesteziyi derinleştir ve bite-block/oral airway yerleştir; bükülmeyi düzelt, kafı indirip tekrar şişir (herniasyon ekartasyonu), sekresyonu aspire et. Açılmıyorsa ETT’yi değiştir.'
      },
      {
        condition: 'Anestezi Devresi / Makinesi veya HME Filtre Tıkanıklığı',
        mechanism: 'Hava Yolu Direnci ↑ (Ekipman)',
        frequency: 'Çok Yaygın',
        clues: 'Hastadan bağımsızdır: HME (ısı-nem değiştirici) bakteri filtresi kan, sekresyon veya nebülizasyon ile tıkanmıştır ya da solunum hortumu masaya/raylara sıkışıp ezilmiştir; bazen ekspiratuvar valf veya PEEP valfi sıkışır.',
        confirmatoryTest: 'Hastayı devreden ayırıp Ambu ile ventile ettiğinde direncin anında kaybolması; HME çıkarıldığında basıncın düşmesi.',
        immediateAction: 'Tıkanmış HME/filtreyi veya kıvrılmış devre hortumunu derhal değiştir; sorun çözülene kadar Ambu (%100 O₂) ile ventile et.'
      },
      {
        condition: 'Endobronşiyal (Sağ Ana Bronş) Entübasyon',
        mechanism: 'Kompliyans ↓ (Ppeak ↑ ve Pplat ↑)',
        frequency: 'Çok Yaygın',
        clues: 'Tek akciğer ventilasyonu nedeniyle Ppeak ve Pplat paralel yükselir, SpO₂ zamanla düşebilir. Özellikle pnömoperitonyum ve Trendelenburg pozisyonunda diyaframın karinayı yukarı itmesiyle veya baş fleksiyonuyla başlangıçta normal olan tüp sağ ana bronşa kayabilir.',
        confirmatoryTest: 'Sol hemitoraksta solunum seslerinin ve göğüs duvarı hareketinin azalması/kaybolması; fiberoptik bronkoskopide karinanın görülmemesi veya ETT derinliğinin artmış olması.',
        immediateAction: 'ETT kafını indir, bilateral eşit solunum sesleri duyulana kadar tüpü 1–3 cm geri çek (erişkinde diş hizası genelde 20–22 cm), kafı tekrar şişir ve dinleyerek doğrula.'
      },
      {
        condition: 'Pnömoperitonyum (Laparoskopi), Derin Trendelenburg, Morbid Obezite veya Cerrahi Ekartör Baskısı',
        mechanism: 'Göğüs Duvarı / Diyafram Kompliyansı ↓',
        frequency: 'Çok Yaygın',
        clues: 'Karın içi CO₂ insüflasyonu (12–15 mmHg) ve baş aşağı pozisyon diyaframı yukarı iter, FRC düşer; Ppeak ve Pplat paralel artar. Cerrahın diyaframa/göğse yaslanması veya ağır alet koyması da aynı tabloyu yapar.',
        confirmatoryTest: 'Zamanlama uyumu (insüflasyon/pozisyon başlangıcı ile eşzamanlı artış) ve cerrahi alan gözlemi.',
        immediateAction: 'Cerrahla iletişim kur (ekartör/baskı kontrolü, insüflasyon basıncının ≤ 12 mmHg’ye düşürülmesi), I:E oranını ve PEEP’i optimize et, PBW’ye göre VT (6–8 mL/kg) ayarla; gerekiyorsa PCV-VG/PCV moduna geç.'
      },
      {
        condition: 'Hafif Anestezi (Öksürme / Ikınma), NMB Çözülmesi veya Opioid Göğüs Duvarı Rijiditesi',
        mechanism: 'Göğüs Duvarı Kompliyansı ↓ (Nöromüsküler)',
        frequency: 'Çok Yaygın',
        clues: 'Hasta ventilatörle savaşır (dissenkroni), karın kasları kasılır; kapnogramda "curare cleft" görülebilir. Alternatif olarak indüksiyonda yüksek doz hızlı Fentanil/Remifentanil sonrası "tahta göğüs" (wooden chest / glottik+torasik rijidite) gelişir.',
        confirmatoryTest: 'TOF (Train-of-Four) sinir stimülatörü yanıtının geri dönmesi, hasta hareketi/yutkunma/kaş çatma veya yüksek doz opioid zamanlaması.',
        immediateAction: 'Anestezi derinliğini artır (Propofol bolusu / volatil) ve cerrahi uygunsa nöromüsküler bloker (Roküronyum) uygula (opioid rijiditesi NMB veya Nalokson ile çözülür).'
      },
      {
        condition: 'Akut Pulmoner Ödem, Gastrik Aspirasyon veya Atelektazi / ARDS',
        mechanism: 'Parankim Kompliyansı ↓ (Ppeak ↑ ve Pplat ↑)',
        frequency: 'Yaygın',
        clues: 'Ppeak ve Pplat birlikte yükselirken SpO₂ düşer. Pulmoner ödemde ETT içinden pembe köpüklü sekresyon ve bilateral krepitan raller; aspirasyonda asidik/gıda içerikli sekresyon ve ardından bronkospazm + hipoksi görülür.',
        confirmatoryTest: 'Trakeal aspirat içeriği, bilateral raller, akciğer USG’de yaygın B-çizgileri, AKG’de PaO₂/FiO₂ düşüşü.',
        immediateAction: 'FiO₂’yi %100 yap, ETT’yi aspire et, akciğer koruyucu ventilasyon (VT 6 mL/kg PBW, uygun PEEP) uygula, pulmoner ödemde Furosemid/nitrat/afterload düşürülmesi planla.'
      },
      {
        condition: 'Dinamik Hiperinflasyon (Oto-PEEP / Breath Stacking)',
        mechanism: 'PEEPtotal ↑ (Kompliyans Görünümlü)',
        frequency: 'Yaygın',
        clues: 'KOAH/astım veya yüksek solunum hızı (kısa Te) nedeniyle ekspiryum tamamlanmadan yeni nefes başlar. Akım-zaman eğrisinde ekspiratuvar akım sıfıra dönemez; Ppeak ve Pplat giderek artar ve intratorasik basınç venöz dönüşü bozarak hipotansiyon yapabilir.',
        confirmatoryTest: 'Ventilatörde "Expiratory Hold" manevrası ile Total PEEP > Ayarlı PEEP gösterilmesi; devreyi 5–10 sn ayırınca basıncın ve tansiyonun düzelmesi.',
        immediateAction: 'Devreyi geçici olarak ayırıp hapsolmuş havayı boşalt; solunum sayısını düşür, ekspiryum süresini uzat (I:E 1:3–1:4), inspiratuvar akımı artır veya bronkodilatasyon sağla.'
      },
      {
        condition: 'Uygunsuz Yüksek Tidal Hacim (VT) veya Çok Yüksek İnspiratuvar Akım Hızı',
        mechanism: 'Ayar / Ventilatör Kaynaklı',
        frequency: 'Yaygın',
        clues: 'Özellikle küçük yapılı/kadın veya obez hastalarda gerçek kilo yerine PBW (ideal vücut ağırlığı) kullanılmaması nedeniyle verilen aşırı VT, hem Ppeak hem Pplat’ı yükseltir; VCV’de aşırı kısa Ti / kare dalga pik akımı ise yalnızca Ppeak’i artırır.',
        confirmatoryTest: 'PBW hesaplamasının kontrolü (> 8 mL/kg PBW olması) ve Ti / akım ayarlarının gözden geçirilmesi.',
        immediateAction: 'Tidal hacmi PBW’ye göre 6–8 mL/kg olarak ayarla, Ti/akım hızını optimize et ve Pplat < 30 cmH₂O hedefle.'
      }
    ],
    algorithmicSteps: [
      {
        stepNumber: 1,
        phase: '0–15 sn · Hasta Güvenliği & Vital Bulgular',
        action: 'SpO₂, kan basıncı, kalp hızı ve EtCO₂ eğrisini değerlendir',
        detail: 'Ppeak artışına ani hipotansiyon ve EtCO₂ düşüşü eşlik ediyorsa yüksek intratorasik basınç/obstrüktif şok (Tansiyon Pnömotoraks, Oto-PEEP) veya Ağır Anaflaksi acil önceliktir.',
        checkTip: 'FiO₂’yi derhal %100’e çıkar ve cerrahi ekibi durumdan haberdar et.'
      },
      {
        stepNumber: 2,
        phase: '15–30 sn · Ambu Testi & Ppeak – Pplat Ayrımı',
        action: 'Devreden ayırıp manuel balon ile dene VE inspiratuvar duraklama (Pplat) ölç',
        detail: 'Ambu/balon yumuşaksa sorun devre/HME/makinededir. Balon sertse Pplat’a bak: ΔP = Ppeak − Pplat > 5–10 cmH₂O ise Rezistans ↑; ikisi birden yüksek (ΔP < 5) ise Kompliyans ↓.',
        checkTip: 'Tek bir Pplat ölçümü tüm ayırıcı tanıyı saniyeler içinde ikiye böler!'
      },
      {
        stepNumber: 3,
        phase: '30–60 sn · Mekanik Patensi & ETT Kontrolü',
        action: 'HME/devreyi kontrol et ve ETT içinden aspirasyon kateteri geçir',
        detail: 'Kıvrılmış devre veya ıslanmış HME filtresini çıkar. Aspirasyon kateteri ilerlemiyorsa tüp kıvrılması, hasta ısırması, mukus/kan tıkacı veya kaf herniasyonunu gider.',
        checkTip: 'Kateter tıkanmış tüpten geçemiyorsa ve düzeltilemiyorsa erken ekstübasyon/re-entübasyon hayat kurtarır.'
      },
      {
        stepNumber: 4,
        phase: '1–2 dk · Oskültasyon & Anatomik Yerleştirme',
        action: 'Bilateral akciğerleri dinle ve ETT derinliğini kontrol et',
        detail: 'Tek taraflı ses kaybı + stabil tansiyon = Sağ Ana Bronş Entübasyonu (tüpü 1–3 cm çek). Tek taraflı ses kaybı + hipotansiyon/hipoksi = Tansiyon Pnömotoraks (acil iğne dekompresyonu). Bilateral wheezing + shark-fin EtCO₂ = Bronkospazm.',
        checkTip: 'Ses duyulmayan ("sessiz") ağır bronkospazmda tanı kapnogram ve yüksek ΔP ile konur.'
      },
      {
        stepNumber: 5,
        phase: '2–5 dk · Cerrahi, Nöromüsküler ve Farmakolojik Tedavi',
        action: 'Altta yatan nedene göre bronkodilatör, derinleştirme/NMB veya cerrahi düzeltme uygula',
        detail: 'Bronkospazmda derin anestezi + Salbutamol/Epinefrin; hafif anestezi/opioid rijiditesinde Propofol + Roküronyum; laparoskopide pnömoperitonyum basıncı/ekartör azaltılması ve pozisyon optimizasyonu yap.',
        checkTip: 'Oto-PEEP varsa devreyi 5–10 sn ayırarak hava hapsini boşalt ve solunum hızını düşür.'
      },
      {
        stepNumber: 6,
        phase: 'Doğrulama · Akciğer Koruyucu Ventilasyon',
        action: 'Hedef parametreleri (Pplat ≤ 30 cmH₂O, VT 6–8 mL/kg PBW) ve AKG’yi doğrula',
        detail: 'Neden çözüldükten sonra driving pressure (Pplat − PEEP < 15 cmH₂O) hedefini koru. Uzamış hipoksi veya şiddetli kriz sonrası AKG ve gerekirse akciğer grafisi/USG değerlendir.',
        checkTip: 'PCV moduna geçildiğinde basınç yerine ekspiratuvar tidal hacim (VTe) alarmını yakından izle.'
      }
    ],
    pearlsAndPitfalls: {
      pearls: [
        'İki saniyelik altın manevra: Hastayı ventilatörden ayırıp %100 O₂ ile Ambu/balona geçmek, cihaz/devre/HME tıkanıklığını hasta/ETT kaynaklı sorunlardan anında ayırır.',
        'ΔP = Ppeak − Pplat farkı akciğer barotravma riskini ayırt eder: Saf bronkospazm veya ETT kinkinde Ppeak 45 cmH₂O olsa bile alveole yansıyan Pplat düşük kalabilir; buna karşın Pplat > 30 cmH₂O gerçek alveoler aşırı gerilimi gösterir.',
        'HME/bakteri filtreleri sekresyon, kan veya bronkodilatör nebülizasyonu sonrası hızla şişerek tamamen tıkanabilir; ETT değişimi kararı vermeden önce mutlaka HME’yi devreden çıkar.',
        'Laparoskopi ve Trendelenburg pozisyonunda diyaframın yukarı itilmesi karinayı da sefalik kaydırır; indüksiyonda normal yerde olan ETT intraoperatif dönemde sağ ana bronşa ilerleyebilir.'
      ],
      pitfalls: [
        'Altta yatan nedeni (pnömotoraks, ETT kink, bronkospazm) araştırmadan sadece ventilatörün yüksek basınç alarm sınırını yukarı çekmek.',
        'Yüksek Ppeak alarmından kurtulmak için VCV’den PCV’ye geçip düşen tidal hacmi (VTe) ve gelişen sessiz hipoventilasyonu/hiperkapniyi fark etmemek.',
        'Tansiyon pnömotoraks şüphesinde hastada şok gelişirken kesin tanı için akciğer grafisi beklemek — klinik tanıdır, derhal dekompresyon gerektirir.',
        'Ağır bronkospazmda Desfluran ile inhalasyon konsantrasyonunu artırmaya çalışmak (Desfluran keskin kokulu bir hava yolu irritanıdır ve bronkospazmı/laringospazmı şiddetlendirebilir).'
      ]
    },
    equipmentChecklist: [
      'Kendiliğinden şişen Ambu balonu + %100 O₂ hattı (devre/cihaz ayrım testi ve kurtarma)',
      'Uygun çapta steril aspirasyon kateterleri (ETT patensi testi & mukus temizliği)',
      'Yedek HME/bakteri filtresi ve solunum devresi',
      'İnhale β₂-agonist (Salbutamol MDI) + devre adaptörü / nebülizatör & IV Epinefrin',
      '14G uzun acil dekompresyon iğnesi / toraks tüpü seti (tansiyon pnömotoraks için)',
      'Videolaringoskop + yedek ETT + oral airway / bite-block + fiberoptik bronkoskop'
    ],
    references: [
      {
        citation: "Gropper MA, Eriksson LI, Fleisher LA, et al. (Eds.). Miller's Anesthesia. 9th–10th ed. Elsevier. (Respiratory Physiology, Mechanical Ventilation & Airway Pressure Troubleshooting)."
      },
      {
        citation: "Butterworth JF, Mackey DC, Wasnick JD. Morgan & Mikhail's Clinical Anesthesiology. 7th ed. McGraw-Hill. (Breathing Systems, Bronchospasm & Peak Inspiratory Pressure)."
      },
      {
        citation: "Dorsch JA, Dorsch SE. Understanding Anesthesia Equipment. 5th ed. Lippincott Williams & Wilkins. (Airway Pressure Alarms, Obstruction & Breathing Circuit Filters)."
      },
      {
        citation: 'American College of Surgeons Committee on Trauma. Advanced Trauma Life Support (ATLS) Student Course Manual. 10th ed. 2018. (Thoracic Trauma & Needle Decompression of Tension Pneumothorax).'
      }
    ],
    tags: [
      'ppeak yükselmesi',
      'tepe hava yolu basıncı',
      'peak inspiratory pressure',
      'yüksek basınç alarmı',
      'pplat',
      'plato basıncı',
      'hava yolu direnci',
      'kompliyans',
      'bronkospazm',
      'tansiyon pnömotoraks',
      'endobronşiyal entübasyon',
      'ett kink',
      'hme tıkanıklığı',
      'oto peep',
      'pnömoperitonyum'
    ]
  },
  {
    id: 'hypoxemia',
    title: 'İntraoperatif Hipoksemi (Desatürasyon)',
    subtitle: 'Oksijen Sunumu (DO₂), İntrapulmoner Şant, Tek Akciğer Ventilasyonu (OLV) ve Hepatopulmoner Sendrom Yönetimi',
    categoryLabel: 'Oksijenasyon & Gaz Değişimi Sorun Giderme',
    urgency: 'critical',
    primaryAlarm: 'SpO₂ < %90 (Akut Hipoksemi · PaO₂ ≈ 60 mmHg) · < %94 (Erken Uyarı) · %100 O₂ ile Düzelmeyen Şant',
    physiologyFormula: 'PAO₂ = FiO₂·(PB − 47) − PaCO₂/R   |   DO₂ = CO × (1.34 × Hb × SaO₂ + 0.003 × PaO₂)',
    summary:
      'İntraoperatif hipoksemi; düşük FiO₂ veya gaz besleme hatası, alveoler hipoventilasyon, V/Q uyumsuzluğu, sağdan sola şant (atelektazi, endobronşiyal entübasyon, tek akciğer ventilasyonu [OLV], hepatopulmoner sendrom [HPS] veya intrakardiyak şant), difüzyon kısıtlanması ve düşük kardiyak debiye bağlı azalmış mikst venöz oksijen satürasyonundan (↓SvO₂) kaynaklanır. Öncelikle pletismografi dalgası ile gerçek hipoksemi vs artefakt ayrılmalı, eş zamanlı %100 O₂ verilerek makine-devre-hasta üçgeni sistematik taranmalıdır.',
    goldenSixtySeconds: [
      'Derhal FiO₂ %100’e çıkar, taze gaz akımını (FGF) artır; oksijen analizöründe gerçek FiO₂’nin yükseldiğini ve santral O₂ basıncını / yedek silindiri doğrula (vaporizatör/N₂O kapalı).',
      'SpO₂ probunu ve pletismografi (pleth) dalga formunu kontrol et: dalga silik/gürültülü ise aynı kolda NİBP manşonu, soğuk/vazokonstriksiyon, koter paraziti veya IV boya (metilen/patent mavisi) artefaktını ele — şüphede AKG/CO-oksimetri al.',
      'Devre bağlantısı, VTe, Ppeak ve EtCO₂’yi kontrol et; ventilatörü manuel/Ambu balonuna (%100 O₂) geçirerek cihaz-devre arızasını dışla ve akciğer kompliyansını elle hisset.',
      'Bilateral akciğer oskültasyonu yap, ETT derinliğini kontrol et ve aspirasyon kateteri geçir; Tek Akciğer Ventilasyonunda (OLV) derhal Fiberoptik Bronkoskop (FOB) ile DLT/bronşiyal bloker pozisyonunu doğrula.',
      'Kan basıncı, kalp hızı ve cerrahi alanı (pnömotoraks, kanama, hava/yağ embolisi, batın/toraks retraksiyonu) değerlendir; ciddi/refrakter desatürasyonda yardım çağır ve AKG (CO-oksimetri + laktat) gönder.'
    ],
    spo2Patterns: [
      {
        id: 'normal-pleth',
        label: 'Normal Pleth & SpO₂ ≥ %97',
        subtitle: 'Düzenli dikrotik çentik · Yüksek PI (> %1.5)',
        spo2Badge: 'SpO₂ %98 · Güvenilir Okuma',
        meaning: 'Yeterli periferik pulsatil akım ve normal arteriyel oksihemoglobin satürasyonu.',
        action: 'FiO₂’yi fizyolojik hedefe (genellikle %30–40) titre et; trendi izle.',
        tone: 'normal',
        svgPath:
          'M 4 46 L 14 46 Q 18 46 21 20 Q 23 14 26 24 L 29 29 Q 31 27 34 32 Q 39 42 46 46 L 56 46 Q 60 46 63 20 Q 65 14 68 24 L 71 29 Q 73 27 76 32 Q 81 42 88 46 L 98 46 Q 102 46 105 20 Q 107 14 110 24 L 113 29 Q 115 27 118 32 Q 123 42 130 46 L 154 46'
      },
      {
        id: 'true-shunt-hypoxemia',
        label: 'Gerçek Hipoksemi (Güçlü Pleth · SpO₂↓)',
        subtitle: 'İyi perfüzyon dalgası · Oksihemoglobin dissosiyasyon dik inişi',
        spo2Badge: 'SpO₂ < %90 · PaO₂ ≤ 60 mmHg',
        meaning: 'Nabız dalgası güçlü olmasına rağmen SpO₂ hızla düşüyor: gerçek hipoksemi (V/Q bozukluğu, şant, hipoventilasyon, OLV malpozisyonu).',
        action: '%100 O₂ + Ambu/ETT/FOB kontrolü + AKG doğrula; Ppeak ve EtCO₂ ile nedeni ayır.',
        tone: 'danger',
        svgPath:
          'M 4 46 L 12 46 Q 16 46 19 16 Q 21 10 24 22 L 27 28 Q 30 25 33 31 Q 38 42 44 46 L 54 46 Q 58 46 61 16 Q 63 10 66 22 L 69 28 Q 72 25 75 31 Q 80 42 86 46 L 96 46 Q 100 46 103 16 Q 105 10 108 22 L 111 28 Q 114 25 117 31 Q 122 42 128 46 L 154 46'
      },
      {
        id: 'low-perfusion-artefact',
        label: 'Düşük Perfüzyon / Hareket Artefaktı',
        subtitle: 'Silik/gürültülü amplitüd · PI < %0.3',
        spo2Badge: 'Yalancı SpO₂ ↓ · Dalga Bozuk',
        meaning: 'Hipotermi, vazokonstriksiyon, şok, aynı kolda şişmiş NİBP manşonu veya koter interferansı nedeniyle pulsatil sinyal kaybı.',
        action: 'Karotis/radyal nabzı palpe et; manşonu karşı kola al, probu kulak/alın/ısıtılmış parmağa taşı.',
        tone: 'warning',
        svgPath:
          'M 4 46 L 14 45 L 18 41 L 22 47 L 28 43 L 34 46 L 44 44 L 49 39 L 54 47 L 60 44 L 68 46 L 76 42 L 82 47 L 90 43 L 98 46 L 106 41 L 112 47 L 120 44 L 132 46 L 142 43 L 154 46'
      },
      {
        id: 'dyshemoglobin-plateau',
        label: 'Dishemoglobinemi / IV Boya Etkisi',
        subtitle: 'Düzenli pleth · SpO₂ ~%85 plato veya yalancı yüksek okuma',
        spo2Badge: 'MetHb ~%85 Plato · COHb Yalancı %98',
        meaning: 'Methemoglobinemide (prilokain, benzokain, nitratlar) SpO₂ %85’e kilitlenir; Patent/Metilen mavisi 5–15 dk geçici düşüş yapar; COHb SpO₂’yi yalancı yüksek gösterir.',
        action: 'Standart puls oksimetre yanılır! Derhal çok dalga boylu CO-oksimetreli AKG iste.',
        tone: 'info',
        svgPath:
          'M 4 46 L 14 46 Q 18 46 21 22 Q 23 16 26 25 L 29 30 Q 31 28 34 33 Q 39 42 46 46 L 56 46 Q 60 46 63 22 Q 65 16 68 25 L 71 30 Q 73 28 76 33 Q 81 42 88 46 L 98 46 Q 102 46 105 22 Q 107 16 110 25 L 113 30 Q 115 28 118 33 Q 123 42 130 46 L 154 46'
      }
    ],
    differentialDiagnosis: [
      {
        condition: 'Hipoksik Gaz Karışımı / O₂ Kaynağı Arızası / Devre Ayrılması',
        mechanism: 'Düşük FiO₂ (< 0.21) veya sıfır alveoler oksijen sunumu (gaz hattı çapraz bağlantısı, O₂ silindir boşalması, akımölçer arızası, devre diskoneksiyonu)',
        frequency: 'Acil',
        clues: 'FiO₂ analizörü < %21 alarmı verir; santral O₂ manometresi düşmüştür veya devre ayrılmasında VTe sıfır, EtCO₂ düz çizgidir.',
        confirmatoryTest: 'Anestezi cihazı inspiratuvar O₂ sensörü okuması + bağımsız yedek O₂ silindiri ve Ambu balonuna geçişte hızlı SpO₂ düzelmesi.',
        immediateAction: 'Cihazı hastadan ayırıp yedek O₂ tüpü veya oda havası Ambu balonuyla ventile et; gaz hatlarını ve oksijen analizörünü kontrol et.'
      },
      {
        condition: 'Özofageal Entübasyon veya Tam ETT Tıkanıklığı / Kink',
        mechanism: 'Ventilasyonun akciğerlere ulaşmaması → dakikalar içinde derin hipoksemi ve bradikardi/arrest',
        frequency: 'Acil',
        clues: 'Özofageal entübasyonda 6 ardışık normal kapnogram izlenmez (NAP4); ETT kink/mukus tıkacında Ppeak > 40 cmH₂O, VTe düşer ve aspirasyon kateteri ilerlemez.',
        confirmatoryTest: 'Sürekli kapnografi eğrisi kontrolü + direkt/videolaringoskopi veya Fiberoptik Bronkoskop (FOB) ile trakeal halka ve karinanın görülmesi.',
        immediateAction: 'Şüphede ETT’yi derhal çek, maske + %100 O₂ ile ventile et; tıkanıklık aspirasyonla açılmıyorsa yeni ETT ile re-entübe et.'
      },
      {
        condition: 'Tansiyon Pnömotoraks / Masif Pulmoner veya Venöz Hava Embolisi (VAE)',
        mechanism: 'İpsilateral akciğer kollapsı + mediyastinal şift / obstrüktif şok (↓CO ve masif ölü boşluk / şant)',
        frequency: 'Acil',
        clues: 'Ani SpO₂↓ ile birlikte hipotansiyon/taşikardi, Ppeak↑ ve tek taraflı solunum sesi kaybı (pnömotoraks); veya ani EtCO₂↓ + mill-wheel üfürümü (VAE).',
        confirmatoryTest: 'Klinik tanı (pnömotoraksta grafi beklenmez!) veya yatak başı akciğer USG (sliding/barcode sign yokluğu) / TEE/prekordiyal Doppler (VAE).',
        immediateAction: 'Pnömotoraksta derhal 4.–5. İKA ön/orta aksiller hattan 14G iğne veya parmak torakostomi dekompresyonu; VAE’de alanı ıslat, N₂O kapat, sol yan baş-aşağı (Durant).'
      },
      {
        condition: 'Şiddetli Bronkospazm / Laringospazm / Anafilaksi / Gastrik Aspirasyon',
        mechanism: 'Diffüz hava yolu obstrüksiyonu veya alveoler kapiller hasar → ağır V/Q bozukluğu ve şant',
        frequency: 'Acil',
        clues: 'Yüksek Ppeak, ekspiratuvar hışıltı ve shark-fin kapnogram (bronkospazm); anafilakside ek olarak hipotansiyon, flushing ve ürtiker; aspirasyonda ETT’de safra/gastrik içerik.',
        confirmatoryTest: 'Oskültasyon, basınç-akım halkası (ekspiratuvar kısıtlanma), ETT aspirat inspeksiyonu ve anafilakside seri serum triptazı.',
        immediateAction: '%100 O₂, anesteziyi derinleştir (IV propofol/ketamin/sevofluran — Desfluran verme), inhale Salbutamol 6–10 puf; refrakter/anafilakside IV Epinefrin 10–50 mcg titre et.'
      },
      {
        condition: 'Tek Akciğer Ventilasyonu (OLV) Sırasında İntraoperatif Hipoksemi (Rozé et al., 2011)',
        mechanism: 'Ventile edilmeyen üst akciğerden zorunlu sağdan sola şant + bağımlı (alt) akciğerde lateral dekübitus atelektazisi ve V/Q uyumsuzluğu',
        frequency: 'Çok Yaygın',
        clues: 'Torakotomi veya VATS’ta OLV başlatıldıktan sonraki dakikalar içinde SpO₂ < %90–92; sağ taraflı cerrahide (sağ akciğer %55 kan akımı alır) şant daha belirgindir.',
        confirmatoryTest: 'Derhal Fiberoptik Bronkoskop (FOB) ile DLT/bronşiyal bloker pozisyonunun (özellikle sağ üst lob orifisi tıkanıklığı veya kaf herniasyonu) doğrulanması.',
        immediateAction: '1) FiO₂ = 1.0 yap; 2) FOB ile DLT/bloker düzelt; 3) Bağımlı akciğere recruitment + titre PEEP (aşırı PEEP PVR’yi artırıp akımı üst akciğere iter!); 4) Cerrah onayıyla üst akciğere CPAP 5–10 cmH₂O (%100 O₂) veya aralıklı çift akciğer ventilasyonu / PA klempajı.'
      },
      {
        condition: 'Endobronşiyal (Sağ Ana Bronş) Entübasyon',
        mechanism: 'Sol akciğerin hiç ventile edilmemesi nedeniyle %45’e varan zorunlu intrapulmoner şant',
        frequency: 'Çok Yaygın',
        clues: 'Baş-boyun fleksiyonu, Trendelenburg veya pnömoperitonyum sonrası SpO₂ düşer, Ppeak↑ ve sol hemitoraksta solunum sesi/göğüs ekspansiyonu kaybolur.',
        confirmatoryTest: 'Bilateral oskültasyon, dudak hizası cm kontrolü (erkek ~22 cm, kadın ~20 cm) ve FOB ile karinanın görülmesi.',
        immediateAction: 'Kafı indir, ETT’yi 1–3 cm geri çekerek sol akciğer havalanmasını oskültasyonla doğrula ve tüpü sabitle.'
      },
      {
        condition: 'Atelektazi & Alveoler Hipoventilasyon (Obezite, Pnömoperitonyum, Absorpsiyon)',
        mechanism: 'FRC’nin kapanma kapasitesinin altına düşmesi (özellikle %100 O₂ indüksiyonu sonrası absorpsiyon atelektazisi ve yetersiz V̇A)',
        frequency: 'Çok Yaygın',
        clues: 'SpO₂ kademeli düşer, EtCO₂ yüksek veya normal olabilir; obez hasta, Trendelenburg veya yüksek İAB altında Pplat artmıştır.',
        confirmatoryTest: 'Alveoler Recruitment Manevrası (örn. 30–40 cmH₂O 15–30 sn, hemodinami uygunsa) ve PEEP artırımı (5→8–10 cmH₂O) sonrası SpO₂’nin hızlı düzelmesi.',
        immediateAction: 'Hemodinamik stabilite varsa vital kapasite/recruitment manevrası + kişiselleştirilmiş PEEP uygula; FiO₂’yi gereksiz %100’de bırakma (≤ %80).'
      },
      {
        condition: 'Akut Pulmoner Ödem / Negatif Basınçlı Pulmoner Ödem (NPPE) / TRALI',
        mechanism: 'Alveol içi sıvı birikimi → ağır şant ve azalmış difüzyon kapasitesi',
        frequency: 'Yaygın',
        clues: 'Bilateral bazal raller, ETT’den pembe köpüklü sekresyon, Ppeak↑/kompliyans↓; laringospazma karşı efor sonrası (NPPE) veya transfüzyon sonrası (TRALI).',
        confirmatoryTest: 'Akciğer USG (yaygın B-çizgileri), ekokardiyografi (kardiyojenik vs non-kardiyojenik) ve PaO₂/FiO₂ < 200.',
        immediateAction: 'PEEP 5–12 cmH₂O ile açık akciğer stratejisi, sıvıyı durdur; yüklenmede IV Furosemid/NTG (TRALI’de diüretik değil destekleyici PEEP).'
      },
      {
        condition: 'Düşük Kardiyak Debi / Şok / Ağır Anemi (↓SvO₂ Amplifikatör Etkisi — Pollard & Kitchen, 2018)',
        mechanism: 'Fick ilkesine göre ↓CO veya ↓Hb dokuda O₂ ekstraksiyonunu artırır → SvO₂ düşer (< %60) → fizyolojik veya patolojik şanttan geçen venöz kan arteriyel PaO₂’yi keskin biçimde düşürür',
        frequency: 'Yaygın',
        clues: 'Akciğer mekanikleri (Ppeak, oskültasyon) normal veya hafif bozukken hipotansiyon, düşük EtCO₂ ve kanama/sepsis zemininde refrakter desatürasyon.',
        confirmatoryTest: 'AKG’de laktat artışı + düşük hemoglobin/hematokrit, santral venöz SvO₂ < %60 ve ekokardiyografide düşük atım hacmi.',
        immediateAction: 'DO₂’yi optimize et: vazopressör/inotrop ile CO’yu düzelt, sıvı yanıtlılığını test et, hemorajide Hb < 7–8 g/dL (koroner riskte 8–9) ise eritrosit süspansiyonu ver.'
      },
      {
        condition: 'Hepatopulmoner Sendrom (HPS) & Platipne-Ortodeoksi (La Via et al., 2025)',
        mechanism: 'Karaciğer hastalığı + ET-1/NO aşırı üretimi ve anjiyogenez → İntrapulmoner Vasküler Dilatasyonlar (İPVD: 15–100 µm) → gerçek intrapulmoner şant + difüzyon-perfüzyon kısıtlanması + körelmiş HPV',
        frequency: 'Nadir',
        clues: 'Siroz/portal hipertansiyon hastasında oturur/dik pozisyonda kötüleşip sırtüstü (supin) yatınca düzelen dispne ve hipoksemi (platipne-ortodeoksi); %100 O₂’ye kısmi veya dirençli yanıt.',
        confirmatoryTest: 'Ajite salin kontrast EKO (sol atriyumda 3–6 kalp siklusu sonra geç kabarcık geçişi), Tc-99m MAA taraması (şant > %6) ve supin vs dik AKG’de PaO₂ farkı ≥ 4 mmHg (≥ %5).',
        immediateAction: 'Hastayı supin pozisyonda tut (ortodeoksiyi azaltır), AŞIRI PEEP’ten ve vazodilatörlerden kaçın (PEEP normal alveoler kapillerleri sıkıştırıp akımı düşük dirençli İPVD’lere yönlendirerek şantı artırabilir!); FiO₂ titre et, yüksek PVR/volatilleri minimize et.'
      },
      {
        condition: 'Difüzyon Hipoksisi (Fink Etkisi) & Rezidüel NMB / Opioid Hipoventilasyonu',
        mechanism: 'N₂O kesildiğinde kana çözünmüş yüksek hacimli N₂O hızla alveollere boşalır, alveoler O₂ ve CO₂’yi seyreltir; ek olarak yetersiz uyanmada V̇A düşer',
        frequency: 'Yaygın',
        clues: 'Ekstübasyon veya N₂O sonlandırılması sonrası ilk 5–10 dakikada oda havası solurken SpO₂ düşer; TOF oranı < 0.9 veya bradipne eşlik edebilir.',
        confirmatoryTest: 'Kantitatif TOF monitörizasyonu (adductor pollicis TOFR < 0.9), solunum sayısı ve EtCO₂/PaCO₂ artışı.',
        immediateAction: 'N₂O kesildikten sonra en az 5–10 dk yüksek akımlı %100 O₂ ile ventile et; TOF < 0.9 ise Sugammadeks/Neostigmin ile tam dekurarizasyon sağla.'
      },
      {
        condition: 'Puls Oksimetre Artefaktı & Dishemoglobinemiler (MetHb / COHb — Pollard & Kitchen, 2018)',
        mechanism: 'Pulsatil sinyal kaybı veya 660/940 nm absorbans oranını bozan anormal hemoglobinler / IV boyalar (Methemoglobinemi SpO₂’yi ~%85’e çeker; COHb SpO₂’yi yalancı normal gösterir)',
        frequency: 'Yaygın',
        clues: 'Zayıf/bozuk pleth dalgası (soğuk, şok, NİBP, koter), Metilen/Patent mavisi enjeksiyonu sonrası ani 5–15 dk’lık yalancı SpO₂ düşüşü veya prilokain/nitrat sonrası çikolata rengi kan + %85 sabit SpO₂.',
        confirmatoryTest: 'Çok dalga boylu CO-oksimetreli AKG (gerçek PaO₂, SaO₂, MetHb % ve COHb % ölçümü).',
        immediateAction: 'CO-oksimetri ile gerçek PaO₂’yi doğrula; MetHb > %20–30 semptomatikse IV Metilen Mavisi 1–2 mg/kg (5 dk’da infüzyon; G6PD eksikliğinde kontrendike — Askorbik asit kullan).'
      }
    ],
    algorithmicSteps: [
      {
        stepNumber: 1,
        phase: 'O₂ Kaynağı & Cihaz Güvencesi (0–30 sn)',
        action: 'FiO₂’yi 1.0 ( %100 O₂ ) yap, N₂O/havayı kapat, akımölçer ve inspiratuvar O₂ analizörünü kontrol et.',
        detail:
          'Pollard & Kitchen (2018) temel kuralı: Oksijenin hastaya gerçekten ulaştığından emin olun. Santral boru hattı basıncı düşmüşse veya analizör FiO₂ artmıyorsa anestezi cihazından ayırıp yedek O₂ silindiri/Ambu balonuna geçin.',
        checkTip: 'O₂ analizörü > %90 göstermiyorsa hastayı değil gaz kaynağını/makineyi suçlayın.'
      },
      {
        stepNumber: 2,
        phase: 'Pleth Dalgası & Hızlı Makine-Hasta Ayrımı',
        action: 'Pletismografi dalgasını değerlendir; eş zamanlı olarak hastayı manuel %100 O₂ balonla ventile et.',
        detail:
          'Silik/gürültülü dalga perfüzyon bozukluğu, NİBP manşonu veya koter artefaktı lehinedir; güçlü dalgada düşen SpO₂ gerçek hipoksemiyi (PaO₂ < 60 mmHg eşiği) gösterir. Balonla el hassasiyeti yüksek direnç/kötü kompliyans ile makine kaynaklı kaçak/valf sorununu hemen ayırır.',
        checkTip: 'İntravenöz Patent/Metilen mavisi sonrası oluşan ani SpO₂ düşüşü 5–15 dakikada kendiliğinden geriler.'
      },
      {
        stepNumber: 3,
        phase: 'Hava Yolu Patensi, Oskültasyon & Mekanik Kontrol',
        action: 'EtCO₂, VTe ve Ppeak’i oku; bilateral solunum seslerini dinle ve ETT/trakea içine aspirasyon kateteri geçir.',
        detail:
          'Ani EtCO₂ kaybında özofageal entübasyon veya devre ayrılması; tek taraflı ses kaybında sağ ana bronş entübasyonu veya pnömotoraks; yüksek Ppeak + wheezing’de bronkospazm veya ETT mukus/kink tıkanıklığı dışlanır.',
        checkTip: 'Ppeak yüksek ancak aspirasyon kateteri rahat geçiyorsa bronkospazm, pnömotoraks veya endobronşiyal kayma düşünün.'
      },
      {
        stepNumber: 4,
        phase: 'Tek Akciğer Ventilasyonu (OLV) Özel Algoritması (Rozé et al., 2011)',
        action: 'Derhal FOB ile DLT/bloker yerini doğrula → bağımlı akciğere recruitment + titre PEEP → üst akciğere CPAP 5–10 cmH₂O uygula.',
        detail:
          'OLV hipoksemisinde en sık geri döndürülebilir neden tüp/bloker malpozisyonudur (FOB şarttır). Bağımlı (alt) akciğerde atelektaziyi açmak için recruitment + 5–8 cmH₂O PEEP yararlıdır; ancak aşırı PEEP alt akciğer PVR’sini artırarak kan akımını ventile edilmeyen üst akciğere yönlendirip şantı kötüleştirir. Düzelmezse cerraha haber verip üst akciğere %100 O₂ ile 5–10 cmH₂O CPAP veya aralıklı çift akciğer ventilasyonu / PA klempajı uygulayın.',
        checkTip: 'Volatil ajan > 1 MAC Hipoksik Pulmoner Vazokonstriksiyonu (HPV) köreltir; gerekirse TIVA’ya geçin.'
      },
      {
        stepNumber: 5,
        phase: 'Hemodinami (DO₂ / ↓SvO₂), Şant & Özel Patofizyoloji (HPS)',
        action: 'Kardiyak debi, kanama/anemi ve sağ-sol şant nedenlerini (HPS, PFO, kardiyak arrest/PE) değerlendir.',
        detail:
          'Düşük kardiyak debi ve ağır anemi SvO₂’yi düşürerek mevcut şantların hipoksemik etkisini katlar (Pollard & Kitchen, 2018). Kronik karaciğer hastalığı ve Hepatopulmoner Sendromda (La Via et al., 2025) intrapulmoner vasküler dilatasyonlar (İPVD) nedeniyle supin pozisyon korunmalı, aşırı PEEP’in normal kapillerleri sıkıştırıp akımı İPVD’lere itmesinden kaçınılmalıdır.',
        checkTip: 'Şant fizyolojisinde SpO₂ %100 O₂ ile beklenen artışı göstermez.'
      },
      {
        stepNumber: 6,
        phase: 'CO-Oksimetreli AKG & Hedefe Yönelik Kesin Tedavi',
        action: 'Arteriyel kan gazı (PaO₂, PaCO₂, Hb, laktat, MetHb, COHb) gönder ve altta yatan nedeni düzelt.',
        detail:
          'Puls oksimetrenin ayırt edemediği MetHb (%85 plato), COHb (yalancı normal SpO₂) ve gerçek PaO₂/FiO₂ oranı CO-oksimetri ile kesinleşir. Tansiyon pnömotoraksta acil iğne/parmak dekompresyonu, anafilakside IV Epinefrin, pulmoner ödemde PEEP optimizasyonu uygulanır.',
        checkTip: 'PaO₂/FiO₂ < 200 kalıyorsa postoperatif yoğun bakım ve uzamış mekanik ventilasyon planlayın.'
      }
    ],
    pearlsAndPitfalls: {
      pearls: [
        'Oksihemoglobin dissosiyasyon eğrisinin dik bölümü nedeniyle SpO₂ %90 (PaO₂ ≈ 60 mmHg) altına indikten sonraki düşüşler çok hızlıdır — %94 eşiğinde önlem alın.',
        'Tek Akciğer Ventilasyonunda (OLV) desatürasyonda ilk enstrümental hamle Fiberoptik Bronkoskop (FOB) ile DLT/bronşiyal bloker yerini doğrulamaktır (Rozé et al., 2011).',
        'Non-dependent (ameliyat edilen) akciğere verilen %100 O₂ ile 5–10 cmH₂O CPAP, OLV hipoksemisini düzeltmede en etkili kurtarma yöntemlerinden biridir.',
        'Hepatopulmoner Sendromda (HPS) baziller İPVD’ler yerçekimine duyarlıdır (ortodeoksi): supin pozisyon oksijenasyonu düzeltir, aşırı PEEP ise şantı paradoksal olarak artırabilir (La Via et al., 2025).'
      ],
      pitfalls: [
        'Methemoglobinemi (%85 plato) veya Karbonmonoksit zehirlenmesinde (yalancı normal SpO₂) standart 2 dalga boylu puls oksimetreye güvenip CO-oksimetreli AKG almamak.',
        'Oksijen analizörüne ve gaz besleme hattına bakmadan sadece anestezi cihazı O₂ rotametre/elektronik kadranını %100’e çevirmek (boru hattında hipoksik gaz varsa hasta hipoksik kalır).',
        'OLV veya HPS’de yüksek PEEP uygulayıp iyi ventile olan akciğerdeki vasküler direnci artırarak kanı şantlı/ventile olmayan bölgeye itmek.',
        'Düşük kardiyak debi veya akut masif kanama sırasında sadece ventilatör ayarlarını değiştirip düşük SvO₂ ve DO₂ krizini gözden kaçırmak (Pollard & Kitchen, 2018).'
      ]
    },
    equipmentChecklist: [
      'Yüksek akımlı %100 O₂ ile çalışan kendiliğinden şişen Ambu balonu & yedek dolu O₂ silindiri',
      'İntraoperatif acil Fiberoptik Bronkoskop (FOB — DLT/bloker/ETT ve mukus tıkacı kontrolü)',
      'CPAP valfli non-dependent akciğer oksijenasyon adaptörü (OLV kurtarma için)',
      'Heparinize AKG enjektörü & çok dalga boylu CO-oksimetri analizörü (MetHb/COHb/Hb/Laktat)',
      'Yatak başı USG / TEE probu (pnömotoraks, PFO/şant, VAE ve kardiyak debi değerlendirmesi)',
      'Acil toraks dekompresyon iğnesi (14G) & inotrop/vazopressör (Epinefrin/Norepinefrin) + IV Metilen Mavisi'
    ],
    references: [
      {
        citation: "Pollard BJ, Kitchen G. Handbook of Clinical Anaesthesia. 4th ed. CRC Press. 2018. ISBN: 978-1-4987-6289-2. (Intraoperative Hypoxia, Oxygen Delivery & Pulse Oximetry Limitations)."
      },
      {
        citation: 'Rozé H, Lafargue M, Ouattara A. Case scenario: Management of intraoperative hypoxemia during one-lung ventilation. Anesthesiology. 2011;114(1):167–174.'
      },
      {
        citation: 'La Via L, et al. Hepatopulmonary syndrome: pathophysiological mechanisms and clinical implications. Curr Opin Anaesthesiol. 2025;38:485–491.'
      },
      {
        citation: "Gropper MA, Eriksson LI, Fleisher LA, et al. (Eds.). Miller's Anesthesia. 9th–10th ed. Elsevier. (Pulmonary Physiology, Hypoxic Pulmonary Vasoconstriction & Thoracic Anesthesia)."
      },
      {
        citation: "Butterworth JF, Mackey DC, Wasnick JD. Morgan & Mikhail's Clinical Anesthesiology. 7th ed. McGraw-Hill. (Respiratory Physiology, One-Lung Ventilation & Postanesthesia Hypoxemia)."
      }
    ],
    tags: [
      'hipoksemi',
      'desatürasyon',
      'spo2 düşüşü',
      'tek akciğer ventilasyonu',
      'olv',
      'hepatopulmoner sendrom',
      'hps',
      'platipne ortodeoksi',
      'ipvd',
      'şant',
      'methemoglobinemi',
      'co-oksimetri',
      'düşük svo2',
      'cpap',
      'fob'
    ]
  }
];
