import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Info,
  ShieldAlert,
  Sliders,
  Waves,
  Wrench,
  Zap,
} from 'lucide-react';

interface SpirometryModuleProps {
  isDark: boolean;
}

type MechanicsPresetId = 'normal' | 'bronchospasm' | 'laparoscopy' | 'ards' | 'anaphylaxis';
type LoopPatternId =
  | 'normal'
  | 'low-compliance'
  | 'overdistension'
  | 'obstruction'
  | 'auto-peep'
  | 'leak'
  | 'secretions';

interface MechanicsPreset {
  id: MechanicsPresetId;
  label: string;
  shortTag: string;
  compliance: number; // mL/cmH2O
  resistance: number; // cmH2O/L/s
  note: string;
}

const MECHANICS_PRESETS: MechanicsPreset[] = [
  {
    id: 'normal',
    label: 'Normal Akciğer (Entübe Erişkin)',
    shortTag: 'Normal',
    compliance: 65,
    resistance: 7,
    note: 'Normal statik kompliyans (50–80 mL/cmH₂O) ve normal havayolu direnci (5–10 cmH₂O/L/sn). Ppeak − Pplato farkı ≤ 5 cmH₂O ve Driving Pressure < 15 cmH₂O’dur.',
  },
  {
    id: 'bronchospasm',
    label: 'Akut Bronkospazm / ETT Kıvrılması',
    shortTag: '↑ Direnç (Raw)',
    compliance: 60,
    resistance: 32,
    note: 'KLASİK REZİSTİF PATERN: Ppeak belirgin yükselir (>30 cmH₂O), ancak Pplato normal kalır! Ppeak − Pplato farkı > 15 cmH₂O’ya açılır → Sorun havayolundadır (bronkospazm, sekresyon, kıvrık ETT).',
  },
  {
    id: 'laparoscopy',
    label: 'Laparoskopi / Trendelenburg / Obezite',
    shortTag: '↓ Göğüs Duvarı C',
    compliance: 32,
    resistance: 9,
    note: 'Pnömoperitonyum ve baş-aşağı pozisyon göğüs duvarı kompliyansını düşürür. Hem Ppeak hem Pplato paralel yükselir, ancak Ppeak − Pplato farkı normal (~5 cmH₂O) kalır.',
  },
  {
    id: 'ards',
    label: 'ARDS / Pulmoner Ödem / Tek Akciğer',
    shortTag: '↓↓ Kompliyans (ARDS)',
    compliance: 24,
    resistance: 11,
    note: 'AĞIR ELASTİK YÜK! Pplato yüksek ve Driving Pressure (ΔP = Pplato − PEEP) > 15 cmH₂O kritik barotravma eşiğindedir. VT’yi 6 mL/kg PBW’ye düşür ve optimal PEEP titre et!',
  },
  {
    id: 'anaphylaxis',
    label: 'Anafilaksi / Ağır Astım + Ödem (Mikst)',
    shortTag: 'Mikst (↑R + ↓C)',
    compliance: 30,
    resistance: 28,
    note: 'Hem bronkospazma bağlı direnç artışı (geniş Ppeak − Pplato farkı) hem de hava hapsi/ödem kaynaklı kompliyans düşüşü (yüksek Pplato) bir aradadır.',
  },
];

interface LoopPattern {
  id: LoopPatternId;
  label: string;
  badge: string;
  pPeak: string;
  pPlat: string;
  cstat: string;
  vteRatio: string;
  status: 'normal' | 'warning' | 'critical';
  statusText: string;
  // P-V loop path (viewBox 0 0 250 185, origin approx x=38, y=155; P=0..40 -> x=38..230, V=0..600 -> y=155..22)
  pvPath: string;
  // F-V loop path (viewBox 0 0 250 185, baseline flow=0 at y=92; V=0..600 -> x=34..228; Insp up y<92, Exp down y>92)
  fvPath: string;
  morphology: string;
  causes: string[];
  action: string;
}

const NORMAL_PV_REF =
  'M 62 155 C 94 146, 130 108, 152 36 C 122 54, 88 94, 62 155 Z';
const NORMAL_FV_REF =
  'M 38 92 C 42 50, 54 44, 126 44 C 188 44, 212 52, 216 92 C 204 148, 186 154, 158 136 C 120 116, 76 104, 38 92 Z';

const LOOP_PATTERNS: LoopPattern[] = [
  {
    id: 'normal',
    label: 'Normal Kontrollü Ventilasyon',
    badge: 'Referans',
    pPeak: '17',
    pPlat: '13',
    cstat: '65',
    vteRatio: '500/500',
    status: 'normal',
    statusText: 'Normal P–V (Saat Yönü Tersi) & Kapalı F–V Döngüsü',
    pvPath: NORMAL_PV_REF,
    fvPath: NORMAL_FV_REF,
    morphology:
      'P–V döngüsü PEEP noktasından (5 cmH₂O) başlar, saat yönünün tersine (mekanik ventilasyon) ~45° eğimle yükselir ve başlangıç noktasına tam kapanır. F–V döngüsünde ekspiratuvar iniş düz çizgiseldir ve 0 L/dk akım çizgisine tam döner.',
    causes: ['Sağlıklı akciğer kompliyansı (50–80 mL/cmH₂O)', 'Açık havayolu ve normal direnç', 'Kaçaksız devre ve tam ekspiryum'],
    action: 'Referans bazal döngü olarak monitörde hafızaya (loop save) alınması vaka içi değişimleri erken yakalamayı sağlar.',
  },
  {
    id: 'low-compliance',
    label: 'Kompliyans Azalması (Sağa Yatma)',
    badge: 'Cstat ↓↓',
    pPeak: '29',
    pPlat: '25',
    cstat: '25',
    vteRatio: '500/500',
    status: 'warning',
    statusText: 'P–V Döngüsü Sağa/Aşağı Yatmış · Driving Pressure ↑',
    pvPath: 'M 62 155 C 118 148, 174 118, 212 52 C 166 78, 110 112, 62 155 Z',
    fvPath:
      'M 38 92 C 42 54, 54 48, 126 48 C 184 48, 204 56, 208 92 C 194 146, 174 148, 146 132 C 112 114, 72 103, 38 92 Z',
    morphology:
      'P–V döngüsünün eğimi belirgin şekilde düşer ve döngü basınç eksenine (sağa/aşağı) doğru yatar: aynı 500 mL tidal volümü vermek için çok daha yüksek hava yolu basıncı gerekir.',
    causes: [
      'Pnömoperitonyum (laparoskopi), dik Trendelenburg, morbid obezite',
      'Endobronşiyal (tek akciğer) entübasyon veya pnömotoraks!',
      'ARDS, pulmoner ödem, plevral efüzyon, atelektazi',
    ],
    action:
      'Önce acil nedenleri dışla: bilateral akciğer sesleri (tek akciğer entübasyon / pnömotoraks?). Laparoskopide intraabdominal basıncı gözden geçir, VT’yi 6–7 mL/kg PBW’ye düşür ve optimal PEEP uygula.',
  },
  {
    id: 'overdistension',
    label: 'Aşırı Gerilme (“Kuş Gagası — Beaking”)',
    badge: 'Barotravma!',
    pPeak: '36',
    pPlat: '32',
    cstat: '22',
    vteRatio: '560/560',
    status: 'critical',
    statusText: 'KUŞ GAGASI (BEAKING) · Üst İnflasyon Noktası Aşıldı!',
    pvPath:
      'M 62 155 C 94 144, 126 106, 152 44 C 176 34, 206 32, 228 31 C 194 42, 166 56, 146 72 C 114 98, 86 126, 62 155 Z',
    fvPath:
      'M 38 92 C 42 48, 56 42, 134 42 C 198 42, 220 50, 224 92 C 210 152, 190 154, 160 136 C 122 116, 76 104, 38 92 Z',
    morphology:
      'P–V döngüsünün sağ üst köşesinde (Üst İnflasyon Noktası — UIP üzerinde) basınç hızla artmasına karşın volümün neredeyse hiç artmadığı sivri “kuş gagası / ördek gagası (beaking)” oluşur.',
    causes: [
      'Aşırı yüksek tidal volüm (VT > 8–10 mL/kg PBW)',
      'Aşırı yüksek PEEP veya küçük kompliyanslı akciğerde (ARDS/tek akciğer) yüksek tepe basıncı',
    ],
    action:
      'ACİL BAROTRAVMA / VOLÜTRAVMA UYARISI! Kuş gagası kaybolana kadar tidal volümü (6 mL/kg PBW) ve/veya PEEP’i azalt; Pplato < 30 ve Driving Pressure < 15 cmH₂O hedefine çek.',
  },
  {
    id: 'obstruction',
    label: 'Bronkospazm / Obstrüksiyon (“Scooping”)',
    badge: 'Raw ↑↑',
    pPeak: '34',
    pPlat: '15',
    cstat: '54',
    vteRatio: '490/490',
    status: 'critical',
    statusText: 'F–V Ekspiryumda İçbükey Çökme (Scooping) · Geniş P–V',
    pvPath: 'M 62 155 C 126 144, 184 106, 204 38 C 142 54, 96 92, 62 155 Z',
    fvPath:
      'M 38 92 C 44 54, 62 48, 128 48 C 186 48, 208 56, 212 92 C 202 128, 188 124, 162 108 C 128 96, 84 94, 38 92 Z',
    morphology:
      'F–V döngüsünde ekspiratuvar akım tepesi (PEF) düşer ve ekspiratuvar kolda karakteristik içbükey çökme (“kepçelenme / scooping — kayak pisti”) oluşur. P–V döngüsünde inspiratuvar kol sağa şişerek histerezis alanı genişler.',
    causes: [
      'Akut bronkospazm, astım, KOAH alevlenmesi, anafilaksi',
      'Kısmi ETT kıvrılması, ısırma, mukus tıkacı veya dar ETT',
    ],
    action:
      'ETT açıklığını (aspirasyon / ısırma blokajı) hemen kontrol et; bronkospazmda anesteziyi derinleştir, salbutamol uygula ve ekspiratuvar boşalma için I:E oranını 1:3–1:4’e uzat.',
  },
  {
    id: 'auto-peep',
    label: 'Hava Hapsi / Auto-PEEP (Açık Akım Kuyruğu)',
    badge: 'Auto-PEEP',
    pPeak: '28',
    pPlat: '21',
    cstat: '42',
    vteRatio: '480/450',
    status: 'warning',
    statusText: 'Ekspiratuvar Akım Sıfıra Dönemeden Yeni İnspiryum!',
    pvPath: 'M 78 155 C 118 144, 160 108, 188 42 C 146 62, 108 100, 78 155 Z',
    fvPath:
      'M 38 92 C 44 54, 58 48, 126 48 C 184 48, 206 56, 210 92 C 198 134, 178 128, 146 116 C 106 108, 66 106, 38 112',
    morphology:
      'F–V döngüsünde ekspiratuvar akım çizgisi 0 L/dk bazal hattına ulaşamadan kesilir ve yeni inspiryum başlar (sol alt köşede açık kalan akım kuyruğu = dinamik hiperinflasyon / Auto-PEEP).',
    causes: [
      'Ağır KOAH / astımda yetersiz ekspiryum süresi (yüksek solunum hızı)',
      'Yüksek tidal volüm veya ters I:E oranı',
      'Küçük çaplı ETT veya kısmi ekspiratuvar valf direnci',
    ],
    action:
      'Ekspiryum süresini uzat: solunum hızını (RR) düşür, I:E oranını 1:3–1:4 yap, bronkodilatör uygula. Ekspiratuvar hold ile gerçek Auto-PEEP’i ölç; aşırı hiperinflasyon hipotansiyon/PEA yapabilir!',
  },
  {
    id: 'leak',
    label: 'Devre / ETT Kaf Kaçağı (Açık Döngü)',
    badge: 'Kaçak %28',
    pPeak: '14',
    pPlat: '11',
    cstat: '--',
    vteRatio: '500/360',
    status: 'critical',
    statusText: 'AÇIK DÖNGÜ (OPEN LOOP) · VTe < VTi',
    pvPath: 'M 62 155 C 94 146, 126 112, 148 44 C 122 66, 98 96, 86 122',
    fvPath:
      'M 38 92 C 42 52, 56 46, 126 46 C 186 46, 208 54, 212 92 C 200 140, 180 142, 152 128 C 122 114, 96 102, 82 92',
    morphology:
      'Hem P–V hem F–V döngüsünde ekspiratuvar kol başlangıç noktasına (0 mL) dönemez ve havada/sağda açık kalır. Verilen tidal volüm (VTi) ile dönen volüm (VTe) arasındaki fark kaçağın hacmini verir.',
    causes: [
      'İnmiş veya yırtılmış ETT kafı, uygunsuz LMA/SAD oturuşu',
      'Solunum devresi, HMEF veya kapnografi örnekleme hattında gevşek bağlantı',
      'Bronkoplevral fistül (toraks tüpünden masif hava kaçağı)',
    ],
    action:
      'Kaf basıncını (pilot balonu), LMA pozisyonunu, devre bağlantılarını ve soda lime kanister kapağını hemen kontrol et. Kaçak büyükse manuel balonla ventile et ve havayolunu güvenceye al.',
  },
  {
    id: 'secretions',
    label: 'Sekresyon / Devrede Su (“Testere Dişi”)',
    badge: 'Sawtooth',
    pPeak: '24',
    pPlat: '14',
    cstat: '58',
    vteRatio: '500/495',
    status: 'warning',
    statusText: 'Testere Dişi (Sawtooth) Osilasyonlar · Aspire Et!',
    pvPath:
      'M 62 155 L 80 144 L 88 147 L 104 128 L 112 132 L 128 104 L 136 107 L 154 58 L 166 40 L 146 58 L 140 55 L 122 82 L 115 79 L 96 112 L 88 110 L 62 155 Z',
    fvPath:
      'M 38 92 C 42 52, 54 46, 126 46 C 186 46, 208 54, 212 92 L 200 140 L 188 128 L 176 146 L 164 126 L 150 138 L 136 116 L 122 128 L 106 108 L 90 116 L 74 100 L 58 106 L 38 92 Z',
    morphology:
      'F–V (özellikle ekspiratuvar kolda belirgin) ve P–V döngüsünün kenarlarında düzenli, keskin “testere dişi (sawtooth)” çentiklenmeleri görülür.',
    causes: [
      'ETT içinde veya trakeobronşiyal ağaçta yoğun mukus/sekresyon birikimi',
      'Solunum devresi hortumlarında yoğunlaşmış su birikmesi',
      'Spontan solunumda üst havayolu vibrasyonu / horlama',
    ],
    action:
      'Solunum devresi hortumlarındaki suyu boşalt; devam ediyorsa steril kapalı/açık endotrakeal aspirasyon uygula ve sonrasında döngünün pürüzsüzleştiğini teyit et.',
  },
];

interface LimitationRow {
  factor: string;
  category: string;
  effect: 'low' | 'high' | 'distort';
  effectLabel: string;
  mechanism: string;
  remedy: string;
}

const LIMITATION_ROWS: LimitationRow[] = [
  {
    factor: 'Sensörde Yoğuşan Su / Sekresyon',
    category: 'Pnömotakograf / Hot-Wire',
    effect: 'distort',
    effectLabel: 'Testere Dişi / Yanlış ΔP',
    mechanism:
      'Orifis veya basınç ölçüm hatlarına giren su damlacığı direnci artırır, hatalı yüksek akım/volüm veya kaotik dalga üretir.',
    remedy: 'D-Lite/Pedi-Lite sensörü HMEF’nin temiz (makine) tarafına koy ve basınç portlarını 12 saat yönüne (yukarı) çevir.',
  },
  {
    factor: 'Kompanze Edilmemiş Devre Kompliyansı',
    category: 'Pediatri / Makine Sensörü',
    effect: 'high',
    effectLabel: 'Yalancı Yüksek VT ↑',
    mechanism:
      'Ekspiratuvar valf tarafındaki sensör, hasta akciğerine gitmeyip devre hortumlarını şişiren gaz hacmini de (~1.5–3 mL/cmH₂O) ölçer.',
    remedy: 'Vaka öncesi otomatik kaçak/kompliyans testini mutlaka yap; yenidoğanda Y-parçasında proksimal akım sensörü (Pedi-Lite) kullan.',
  },
  {
    factor: 'Gaz Yoğunluğu & Viskozite Değişimi (N₂O, He, O₂)',
    category: 'Akış Fiziği',
    effect: 'high',
    effectLabel: '±%5–15 Volüm Hatası',
    mechanism:
      'Orifis/Pitot sensörleri gaz yoğunluğundan (Bernoulli), Fleisch sensörleri viskoziteden (Poiseuille) etkilenir.',
    remedy: 'Modern anestezi cihazları entegre gaz analizöründen aldığı FiO₂/N₂O/ajan bilgisiyle akımı otomatik düzeltir; gaz modülü kapalıysa sapma artar.',
  },
  {
    factor: 'İnspiratuvar Hold Olmadan Ppeak’i Pplato Sanmak',
    category: 'Hesaplama Hatası',
    effect: 'low',
    effectLabel: 'Yalancı Düşük Cstat ↓',
    mechanism:
      'Akım sıfırlanmadan (Pplato ölçülmeden) Ppeak ile hesaplanan değer dinamik kompliyanstır ve dirençten etkilenir.',
    remedy: 'Gerçek statik kompliyans ve Driving Pressure için %10 inspiratuvar duraklama (0.5–1 sn hold) ile Pplato ölç.',
  },
  {
    factor: 'Cerrahi Ekartör / Asistanın Göğse Yaslanması',
    category: 'Dış Mekanik Artefakt',
    effect: 'distort',
    effectLabel: 'Ani Sağa Yatma / C ↓',
    mechanism:
      'Göğüs duvarına veya diyaframa dış bası aniden Ppeak ve Pplato’yu yükseltip kompliyansı düşürür.',
    remedy: 'Ani basınç artışında bronkospazm tedavisine başlamadan önce cerrahi sahaya bak ve ekibi uyar.',
  },
  {
    factor: 'Sidestream Kapnografi Çekim Akımı (Pediatri)',
    category: 'Küçük VT',
    effect: 'low',
    effectLabel: 'Yalancı Düşük VTe ↓',
    mechanism:
      'Örnekleme hattı spirometri sensörünün hasta tarafındaysa 150–200 mL/dk çekilen gaz, dönen ekspiratuvar volümü olduğundan az gösterir.',
    remedy: 'Pediatride düşük akımlı (50 mL/dk) Microstream veya entegre Pedi-Lite sensör dizilimi kullan.',
  },
  {
    factor: 'Spontan Solunumda Auto-PEEP & İnspiratuvar Efor',
    category: 'Hasta-Ventilatör',
    effect: 'distort',
    effectLabel: '“8 Şekli” / Negatif Kuyruk',
    mechanism:
      'Hasta tetikleme yaparken P–V döngüsünün sol altında negatif basınç kuyruğu (balık kuyruğu) oluşur; saf mekanik Cstat ölçülemez.',
    remedy: 'Doğru statik kompliyans ve direnç ölçümü için hastanın pasif (sedatize/paralize) olması gerekir.',
  },
  {
    factor: 'Hatalı Sensör Tipi Seçimi (D-Lite vs. Pedi-Lite)',
    category: 'Kurulum Hatası',
    effect: 'distort',
    effectLabel: 'Ağır Volüm Kalibrasyon Hatası',
    mechanism:
      'Monitörde “Erişkin” seçiliyken Pedi-Lite takılırsa (veya tersi) orifis katsayısı yanlış olduğundan volümler %50+ hatalı okunur.',
    remedy: 'Sensör değiştirildiğinde monitör menüsünden D-Lite / Pedi-Lite tipini mutlaka eşleştir.',
  },
];

const SECTION_LINKS = [
  { id: 'spiro-sec-1', num: '1', label: 'Fizik & Mekanizma' },
  { id: 'spiro-sec-2', num: '2', label: 'Endikasyonlar' },
  { id: 'spiro-sec-3', num: '3', label: 'Kurulum & Kalibrasyon' },
  { id: 'spiro-sec-4', num: '4', label: 'P–V & F–V Döngüleri' },
  { id: 'spiro-sec-5', num: '5', label: 'Limitasyonlar' },
  { id: 'spiro-sec-6', num: '6', label: 'Komplikasyonlar' },
];

export const SpirometryModule: React.FC<SpirometryModuleProps> = ({ isDark }) => {
  const [presetId, setPresetId] = useState<MechanicsPresetId>('normal');
  const [compliance, setCompliance] = useState<number>(65);
  const [resistance, setResistance] = useState<number>(7);
  const [activeLoopId, setActiveLoopId] = useState<LoopPatternId>('normal');

  const vtMl = 500;
  const peep = 5;
  const flowLps = 0.6; // 36 L/min constant inspiratory flow

  const drivingPressure = Number((vtMl / compliance).toFixed(1));
  const pPlato = Number((peep + drivingPressure).toFixed(1));
  const resistiveDrop = Number((resistance * flowLps).toFixed(1));
  const pPeak = Number((pPlato + resistiveDrop).toFixed(1));

  const activePreset =
    MECHANICS_PRESETS.find((p) => p.id === presetId) ?? MECHANICS_PRESETS[0];
  const activeLoop =
    LOOP_PATTERNS.find((l) => l.id === activeLoopId) ?? LOOP_PATTERNS[0];

  // Map pressure (0..45 cmH2O) to SVG y (142..22)
  const pToY = (p: number) => Math.max(18, Math.min(142, 142 - (p / 45) * 120));
  const yPeep = pToY(peep);
  const yPlat = pToY(pPlato);
  const yPeak = pToY(pPeak);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cardSurface = isDark
    ? 'bg-slate-900/80 border-slate-800'
    : 'bg-white border-slate-200 shadow-xs';
  const subSurface = isDark
    ? 'bg-slate-800/60 border-slate-700/80'
    : 'bg-slate-50 border-slate-200';
  const diagramBg = isDark
    ? 'bg-slate-950/80 border-slate-800'
    : 'bg-slate-50/90 border-slate-200';

  return (
    <div className="space-y-6">
      {/* Module Hero Banner */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 border-teal-500/30'
            : 'bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/40 border-teal-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span
                className={`px-2 py-0.5 rounded ${
                  isDark ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-800'
                }`}
              >
                Solunum Mekaniği · P–V &amp; F–V Döngüleri
              </span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                6 Bölümlü Görsel &amp; İnteraktif Monitörizasyon Rehberi
              </span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              İntraoperatif Spirometri (Akım–Volüm &amp; Basınç–Volüm)
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Hava yolu basıncı, akım ve entegre volümü nefes-nefes ölçerek{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>kompliyans (Cstat)</strong>,{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>havayolu direnci (Raw)</strong>,{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>aşırı gerilme (beaking)</strong>,{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>bronkospazm (scooping)</strong> ve{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>devre kaçaklarını</strong> anında görselleştiren akciğer koruyucu mekanik monitör.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">Normal Cstat</div>
              <div className="text-sm font-bold font-mono tabular-nums text-teal-600 dark:text-teal-400 mt-0.5">
                50 – 80
              </div>
              <div className="text-[10px] text-slate-500">mL/cmH₂O</div>
            </div>
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">Normal Raw</div>
              <div className="text-sm font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400 mt-0.5">
                5 – 10
              </div>
              <div className="text-[10px] text-slate-500">cmH₂O/L/sn</div>
            </div>
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">Hedef ΔP</div>
              <div className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                &lt; 15
              </div>
              <div className="text-[10px] text-slate-500">Pplato &lt; 30</div>
            </div>
          </div>
        </div>

        {/* 6-Section Jump Bar */}
        <div className={`mt-5 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-teal-200/70'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SECTION_LINKS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left text-xs font-semibold transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-700/80 text-slate-200 hover:border-teal-500/60 hover:text-teal-300'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-400 hover:text-teal-700'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                  {sec.num}
                </span>
                <span className="truncate">{sec.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BÖLÜM 1: FİZİKSEL PRENSİP VE ÇALIŞMA MEKANİZMASI                      */}
      {/* ===================================================================== */}
      <section id="spiro-sec-1" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-teal-500/15 border-teal-500/30 text-teal-400'
                : 'bg-teal-50 border-teal-200 text-teal-700'
            }`}
          >
            1
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Pnömotakograf (ΔP) &amp; Hot-Wire Anemometre · Akım İntegrasyonu · Solunum Hareket Denklemi
            </p>
          </div>
        </div>

        {/* Visual Diagram 1A: Pneumotachograph (Delta P) & Hot-Wire Sensor Physics */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Akım Sensörü Fiziği (Diferansiyel Basınç vs. Sıcak Tel) &amp; Hareket Denklemi
            </span>
            <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
              V(t) = ∫ Flow(t)·dt · Paw = (VT / Cstat) + (Flow × Raw) + PEEP
            </span>
          </div>

          <svg viewBox="0 0 760 190" className="w-full h-auto" role="img" aria-label="Pnömotakograf ve sıcak tel akım sensörü fizik şeması">
            {/* LEFT: Differential Pressure Pneumotachograph */}
            <rect x="8" y="8" width="366" height="174" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="22" y="27" fontSize="10.2" fontWeight="700" fill="#14b8a6">
              A) Diferansiyel Basınç Pnömotakografı (D-Lite / Pitot)
            </text>

            {/* Tube Walls */}
            <line x1="24" y1="68" x2="354" y2="68" stroke={isDark ? '#64748b' : '#94a3b8'} strokeWidth="2.5" />
            <line x1="24" y1="112" x2="354" y2="112" stroke={isDark ? '#64748b' : '#94a3b8'} strokeWidth="2.5" />

            {/* Restrictor / Orifice in Center */}
            <rect x="172" y="68" width="16" height="15" fill="#14b8a6" />
            <rect x="172" y="97" width="16" height="15" fill="#14b8a6" />
            <text x="180" y="128" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#14b8a6" fontFamily="monospace">
              Orifis / Direnç
            </text>

            {/* Airflow Arrows */}
            <line x1="36" y1="90" x2="156" y2="90" stroke="#0ea5e9" strokeWidth="2.4" strokeDasharray="5 3" />
            <polygon points="154,85 164,90 154,95" fill="#0ea5e9" />
            <line x1="196" y1="90" x2="332" y2="90" stroke="#0ea5e9" strokeWidth="2.4" strokeDasharray="5 3" />
            <polygon points="330,85 340,90 330,95" fill="#0ea5e9" />
            <text x="86" y="83" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">
              Gaz Akımı (V̇)
            </text>

            {/* P1 & P2 Pressure Taps */}
            <line x1="130" y1="68" x2="130" y2="48" stroke="#f59e0b" strokeWidth="2" />
            <line x1="230" y1="68" x2="230" y2="48" stroke="#f59e0b" strokeWidth="2" />
            <rect x="116" y="34" width="128" height="20" rx="5" fill="#f59e0b" fillOpacity="0.18" stroke="#f59e0b" />
            <text x="180" y="47" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#f59e0b" fontFamily="monospace">
              ΔP = P₁ − P₂ → Akım
            </text>

            <text x="188" y="150" textAnchor="middle" fontSize="8.3" fill={isDark ? '#cbd5e1' : '#334155'}>
              Laminer (Fleisch): Akım ∝ ΔP • Türbülan (Orifis/Pitot): Akım ∝ √ΔP
            </text>
            <text x="188" y="166" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#14b8a6">
              Hacim doğrudan ölçülmez: VT = Akımın zamana göre integrali (∫ V̇·dt)
            </text>

            {/* RIGHT: Hot-Wire Anemometer + Equation of Motion Summary */}
            <rect x="386" y="8" width="366" height="174" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="400" y="27" fontSize="10.2" fontWeight="700" fill="#0ea5e9">
              B) Sıcak Tel (Hot-Wire) &amp; Hareket Denklemi
            </text>

            {/* Hot wire mini diagram */}
            <rect x="404" y="40" width="330" height="54" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#cbd5e1'} />
            <line x1="422" y1="67" x2="496" y2="67" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 2" />
            <polygon points="494,62 504,67 494,72" fill="#0ea5e9" />
            <line x1="518" y1="48" x2="518" y2="86" stroke="#f43f5e" strokeWidth="3" />
            <circle cx="518" cy="67" r="7" fill="#f43f5e" fillOpacity="0.25" />
            <text x="536" y="61" fontSize="8.8" fontWeight="700" fill="#f43f5e">Isıtılmış Platin Tel (~400°C)</text>
            <text x="536" y="76" fontSize="8" fill={isDark ? '#cbd5e1' : '#475569'}>
              Akım teli soğutur → Sabit ısı için gereken akım = Gaz Akımı!
            </text>

            {/* Equation of Motion Boxes */}
            <rect x="404" y="104" width="104" height="64" rx="8" fill="#10b981" fillOpacity="0.13" stroke="#10b981" strokeOpacity="0.5" />
            <text x="456" y="122" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#10b981">Elastik Yük</text>
            <text x="456" y="138" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#a7f3d0' : '#047857'} fontFamily="monospace">
              VT / Cstat
            </text>
            <text x="456" y="156" textAnchor="middle" fontSize="7.8" fill={isDark ? '#94a3b8' : '#64748b'}>
              = Pplato − PEEP (ΔP)
            </text>

            <text x="515" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill={isDark ? '#94a3b8' : '#64748b'}>+</text>

            <rect x="522" y="104" width="104" height="64" rx="8" fill="#f59e0b" fillOpacity="0.13" stroke="#f59e0b" strokeOpacity="0.5" />
            <text x="574" y="122" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#f59e0b">Rezistif Yük</text>
            <text x="574" y="138" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#fde68a' : '#b45309'} fontFamily="monospace">
              Akım × Raw
            </text>
            <text x="574" y="156" textAnchor="middle" fontSize="7.8" fill={isDark ? '#94a3b8' : '#64748b'}>
              = Ppeak − Pplato
            </text>

            <text x="633" y="140" textAnchor="middle" fontSize="13" fontWeight="700" fill={isDark ? '#94a3b8' : '#64748b'}>+</text>

            <rect x="640" y="104" width="94" height="64" rx="8" fill="#0ea5e9" fillOpacity="0.13" stroke="#0ea5e9" strokeOpacity="0.5" />
            <text x="687" y="122" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#0ea5e9">Taban</text>
            <text x="687" y="138" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#7dd3fc' : '#0369a1'} fontFamily="monospace">
              PEEPtot
            </text>
            <text x="687" y="156" textAnchor="middle" fontSize="7.8" fill={isDark ? '#94a3b8' : '#64748b'}>
              Set + Auto-PEEP
            </text>
          </svg>
        </div>

        {/* Interactive Simulator 1B: Peak vs Plateau & Driving Pressure Live Simulator */}
        <div className={`rounded-xl border p-4 sm:p-5 space-y-4 ${diagramBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-500" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                İnteraktif Solunum Mekaniği Simülatörü (Ppeak vs. Pplato &amp; Driving Pressure)
              </h5>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MECHANICS_PRESETS.map((pr) => {
                const selected = presetId === pr.id && compliance === pr.compliance && resistance === pr.resistance;
                return (
                  <button
                    key={pr.id}
                    type="button"
                    onClick={() => {
                      setPresetId(pr.id);
                      setCompliance(pr.compliance);
                      setResistance(pr.resistance);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                      selected
                        ? 'bg-teal-600 text-white border-teal-500'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-teal-500/50'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-teal-400'
                    }`}
                  >
                    {pr.shortTag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Live Pressure-Time Curve SVG with Inspiratory Hold */}
            <div
              className={`lg:col-span-7 rounded-xl border p-4 flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Basınç–Zaman Trasesi (VCV · İnspiratuvar Duraklama / Hold)
                </span>
                <span className="font-mono text-[10px] text-slate-400">
                  VT: 500 mL · PEEP: 5 cmH₂O · Akım: 36 L/dk
                </span>
              </div>

              <svg viewBox="0 0 460 170" className="w-full h-auto" role="img" aria-label="Ppeak ve Pplato basınç zaman trasesi">
                {/* Pressure Gridlines */}
                {[
                  { p: 40, label: '40' },
                  { p: 30, label: '30 (Sınır)' },
                  { p: 20, label: '20' },
                  { p: 10, label: '10' },
                  { p: 0, label: '0' },
                ].map((g) => (
                  <g key={g.p}>
                    <line
                      x1="46"
                      y1={pToY(g.p)}
                      x2="444"
                      y2={pToY(g.p)}
                      stroke={g.p === 30 ? '#f43f5e' : isDark ? '#1e293b' : '#e2e8f0'}
                      strokeWidth={g.p === 30 ? '1.2' : '1'}
                      strokeDasharray={g.p === 30 ? '4 3' : undefined}
                    />
                    <text
                      x="42"
                      y={pToY(g.p) + 3}
                      textAnchor="end"
                      fontSize="8.5"
                      fill={g.p === 30 ? '#f43f5e' : isDark ? '#94a3b8' : '#64748b'}
                      fontFamily="monospace"
                    >
                      {g.p}
                    </text>
                  </g>
                ))}

                {/* Pressure Trace: PEEP -> linear rise to Ppeak -> sharp drop during zero-flow hold to Pplato -> fall back to PEEP */}
                <path
                  d={`M 48 ${yPeep} L 88 ${yPeep} L 188 ${yPeak} L 194 ${yPlat} L 274 ${yPlat} L 304 ${yPeep} L 440 ${yPeep}`}
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Resistive Pressure Bracket (Ppeak - Pplato) */}
                <line x1="188" y1={yPeak} x2="220" y2={yPeak} stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="214" y1={yPeak} x2="214" y2={yPlat} stroke="#f59e0b" strokeWidth="2.2" />
                <text x="222" y={(yPeak + yPlat) / 2 + 3} fontSize="8.8" fontWeight="700" fill="#f59e0b" fontFamily="monospace">
                  Raw farkı: {resistiveDrop}
                </text>

                {/* Elastic Driving Pressure Bracket (Pplato - PEEP) */}
                <line x1="274" y1={yPlat} x2="322" y2={yPlat} stroke="#0ea5e9" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="316" y1={yPlat} x2="316" y2={yPeep} stroke="#0ea5e9" strokeWidth="2.2" />
                <text x="324" y={(yPlat + yPeep) / 2 + 3} fontSize="8.8" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">
                  ΔP (Elastik): {drivingPressure}
                </text>

                {/* Dots & Labels */}
                <circle cx="188" cy={yPeak} r="4" fill="#f59e0b" />
                <text x="180" y={Math.max(14, yPeak - 7)} textAnchor="end" fontSize="9" fontWeight="700" fill="#f59e0b" fontFamily="monospace">
                  Ppeak {pPeak}
                </text>

                <circle cx="242" cy={yPlat} r="4" fill="#0ea5e9" />
                <text x="242" y={Math.max(14, yPlat - 7)} textAnchor="middle" fontSize="9" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">
                  Pplato {pPlato}
                </text>

                <text x="234" y="158" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#64748b'} fontFamily="monospace">
                  İnspiryum (Akım Var) → Hold (Akım = 0) → Ekspiryum
                </text>
              </svg>

              {/* Sliders */}
              <div className={`mt-3 pt-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="spiro-cstat" className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Kompliyans (Cstat)
                    </label>
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400 tabular-nums">
                      {compliance} mL/cmH₂O
                    </span>
                  </div>
                  <input
                    id="spiro-cstat"
                    type="range"
                    min={20}
                    max={85}
                    value={compliance}
                    onChange={(e) => setCompliance(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="spiro-raw" className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Havayolu Direnci (Raw)
                    </label>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                      {resistance} cmH₂O/L/sn
                    </span>
                  </div>
                  <input
                    id="spiro-raw"
                    type="range"
                    min={4}
                    max={36}
                    value={resistance}
                    onChange={(e) => setResistance(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right: Numeric Readouts & Clinical Verdict */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3 text-slate-100 font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5">
                    <div className="text-[10px] text-amber-400">Ppeak (Tepe)</div>
                    <div className={`text-2xl font-bold tabular-nums ${pPeak > 30 ? 'text-rose-400' : 'text-amber-300'}`}>
                      {pPeak} <span className="text-[10px] font-normal">cmH₂O</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5">
                    <div className="text-[10px] text-sky-400">Pplato (Alveoler)</div>
                    <div className={`text-2xl font-bold tabular-nums ${pPlato >= 30 ? 'text-rose-400' : 'text-sky-300'}`}>
                      {pPlato} <span className="text-[10px] font-normal">cmH₂O</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5">
                    <div className="text-[10px] text-teal-400">Ppeak − Pplato</div>
                    <div className={`text-xl font-bold tabular-nums ${resistiveDrop > 6 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {resistiveDrop} <span className="text-[10px] font-normal">cmH₂O</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-900 border border-slate-800 p-2.5">
                    <div className="text-[10px] text-violet-400">Driving Press (ΔP)</div>
                    <div className={`text-xl font-bold tabular-nums ${drivingPressure >= 15 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {drivingPressure} <span className="text-[10px] font-normal">cmH₂O</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`rounded-xl border p-3.5 text-xs leading-relaxed ${
                  pPlato >= 28 || drivingPressure >= 15 || resistiveDrop > 10
                    ? isDark
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                    : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-300'
                      : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Canlı Mekanik Yorum</span>
                </div>
                <p>
                  {resistiveDrop > 8 && drivingPressure >= 15
                    ? 'MİKST BOZUKLUK: Hem havayolu direnci (Ppeak−Pplato > 8) hem elastik yük (ΔP ≥ 15) yüksek. Bronkospazm + düşük kompliyansı (anafilaksi/ödem/hava hapsi) birlikte değerlendir!'
                    : resistiveDrop > 8
                      ? 'REZİSTİF YÜK ARTIŞI: Ppeak yükselmiş ancak Pplato düşük/normal! Sorun büyük/küçük havayolunda (bronkospazm, sekresyon, ETT kıvrılması/ısırma).'
                      : drivingPressure >= 15
                        ? 'ELASTİK YÜK / KOMPLİYANS AZALMASI: Driving Pressure ≥ 15 cmH₂O (barotravma riski)! Pnömotoraks, tek akciğer entübasyonu, pnömoperitonyum veya ARDS açısından değerlendir ve VT’yi azalt.'
                        : activePreset.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: ENDİKASYONLAR VE KLİNİK AMAÇ                                 */}
      {/* ===================================================================== */}
      <section id="spiro-sec-2" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            2
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Endikasyonlar ve Klinik Amaç
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Yüksek Tepe Basıncı (Ppeak ↑) Ayırıcı Tanı Algoritması &amp; Akciğer Koruyucu Hedefler
            </p>
          </div>
        </div>

        {/* Visual Diagram 2A: High Peak Pressure Decision Tree SVG */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              “Yüksek Tepe Basıncı (Ppeak ↑)” 10 Saniyelik Ayırıcı Tanı Algoritması
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Hedefler: Pplato &lt; 30 · ΔP &lt; 15 cmH₂O · VT 6–8 mL/kg PBW
            </span>
          </div>

          <svg viewBox="0 0 760 144" className="w-full h-auto" role="img" aria-label="Yüksek tepe basıncı ayırıcı tanı algoritması">
            {/* Root Node */}
            <rect x="260" y="6" width="240" height="32" rx="8" fill="#f43f5e" fillOpacity="0.18" stroke="#f43f5e" strokeWidth="1.4" />
            <text x="380" y="26" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f43f5e">
              Ppeak Yükseldi → İnspiratuvar Hold Yap (Pplato)
            </text>

            {/* Branches */}
            <path d="M 320 38 L 320 52 L 188 52 L 188 64" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
            <path d="M 440 38 L 440 52 L 572 52 L 572 64" fill="none" stroke="#0ea5e9" strokeWidth="1.8" />

            {/* Left Branch: High Resistance */}
            <rect x="14" y="64" width="348" height="72" rx="10" fill="#f59e0b" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#f59e0b" strokeOpacity="0.55" />
            <text x="188" y="83" textAnchor="middle" fontSize="9.8" fontWeight="700" fill="#f59e0b" fontFamily="monospace">
              Ppeak − Pplato &gt; 5 cmH₂O (Pplato Normal) → Raw ↑
            </text>
            <text x="28" y="102" fontSize="8.8" fill={isDark ? '#fde68a' : '#78350f'}>• Bronkospazm / Astım / Anafilaksi (F–V: Scooping)</text>
            <text x="28" y="117" fontSize="8.8" fill={isDark ? '#fde68a' : '#78350f'}>• ETT kıvrılması, ısırma, mukus tıkacı (Sawtooth), dar ETT</text>
            <text x="28" y="131" fontSize="8.4" fontWeight="700" fill="#f59e0b">→ Önce ETT’yi kontrol et / aspire et, sonra bronkodilatör!</text>

            {/* Right Branch: Low Compliance */}
            <rect x="398" y="64" width="348" height="72" rx="10" fill="#0ea5e9" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#0ea5e9" strokeOpacity="0.55" />
            <text x="572" y="83" textAnchor="middle" fontSize="9.8" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">
              Ppeak − Pplato ≤ 5 cmH₂O (Pplato Yüksek!) → Cstat ↓
            </text>
            <text x="412" y="102" fontSize="8.8" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Pnömotoraks, Endobronşiyal (Tek Akciğer) Entübasyon!</text>
            <text x="412" y="117" fontSize="8.8" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Pnömoperitonyum, Trendelenburg, ARDS, Akciğer Ödemi</text>
            <text x="412" y="131" fontSize="8.4" fontWeight="700" fill="#0ea5e9">→ Bilateral sesleri dinle; VT azalt, PEEP / pozisyonu düzenle!</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Başlıca Endikasyonlar
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Genel Anestezide Mekanik Ventilasyon:</strong> Tüm entübe veya LMA’lı hastalarda sürekli kaçak, basınç ve hacim güvenliği.</li>
              <li>• <strong>Yüksek Riskli Cerrahiler:</strong> Laparoskopik/robotik (Trendelenburg + pnömoperitonyum), torasik (tek akciğer ventilasyonu) ve bariatrik cerrahi.</li>
              <li>• <strong>Pulmoner Patoloji &amp; Pediatri:</strong> KOAH/astım, ARDS ve küçük tidal volümlü bebeklerde barotravma koruması.</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
              <Activity className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Doğrudan Ölçtüğü Parametreler
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Hava Yolu Basınçları:</strong> Ppeak, Pplato, Pmean ve PEEP (cmH₂O).</li>
              <li>• <strong>Gaz Akımı (Flow — L/dk):</strong> İnspiratuvar ve ekspiratuvar akım hızı (PEF dahil).</li>
              <li>• <strong>Volümler:</strong> İnspire (VTi) &amp; Ekspire (VTe) tidal volüm, Dakika Ventilasyonu (MV) ve Kaçak (VTi − VTe).</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Zap className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Dolaylı Fizyolojik Çıkarımlar
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Statik Kompliyans &amp; Driving Pressure:</strong> Optimal PEEP titrasyonu (en yüksek Cstat / en düşük ΔP).</li>
              <li>• <strong>Havayolu Direnci &amp; Auto-PEEP:</strong> Bronkodilatör yanıtının anlık görsel takibi.</li>
              <li>• <strong>Solunum İşi (WOB) &amp; Extübasyon Hazırlığı:</strong> Spontan modlarda (PSV) tidal volüm yeterliliği ve asenkroni tespiti.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: TEKNİK KURULUM VE KALİBRASYON                                */}
      {/* ===================================================================== */}
      <section id="spiro-sec-3" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-sky-500/15 border-sky-500/30 text-sky-400'
                : 'bg-sky-50 border-sky-200 text-sky-700'
            }`}
          >
            3
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Teknik Kurulum ve Kalibrasyon
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              D-Lite / Pedi-Lite Yerleşimi · Devre Kompliyansı Testi · İnspiratuvar &amp; Ekspiratuvar Hold
            </p>
          </div>
        </div>

        {/* Visual Diagram 3A: Sensor Placement & D-Lite vs Pedi-Lite */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Proksimal Sensör (Y-Parçası) Kurulum Sırası &amp; Boyut Seçimi
            </span>
            <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-semibold">
              HMEF’nin Makine Tarafında · Portlar 12:00 Yukarı · Doğru Sensör Modu!
            </span>
          </div>

          <svg viewBox="0 0 760 154" className="w-full h-auto" role="img" aria-label="Spirometri sensör kurulum sırası ve D-Lite Pedi-Lite karşılaştırması">
            {/* LEFT: Correct Circuit Sequence */}
            <rect x="8" y="8" width="466" height="138" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="20" y="26" fontSize="10" fontWeight="700" fill="#14b8a6">
              A) Proksimal Spirometri Dizilimi (Hasta → HMEF → Sensör → Y-Parçası)
            </text>

            {/* ETT */}
            <rect x="20" y="68" width="66" height="30" rx="6" fill="#0ea5e9" fillOpacity="0.18" stroke="#0ea5e9" />
            <text x="53" y="86" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#0ea5e9">ETT</text>
            <line x1="86" y1="83" x2="100" y2="83" stroke="#64748b" strokeWidth="3" />

            {/* HMEF */}
            <rect x="100" y="62" width="84" height="42" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.4" />
            <text x="142" y="80" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#10b981">HMEF Filtre</text>
            <text x="142" y="93" textAnchor="middle" fontSize="7.4" fill={isDark ? '#a7f3d0' : '#047857'}>Nem/Sekresyon Korur</text>
            <line x1="184" y1="83" x2="198" y2="83" stroke="#64748b" strokeWidth="3" />

            {/* D-Lite / Pedi-Lite Sensor */}
            <rect x="198" y="66" width="114" height="34" rx="6" fill="#14b8a6" fillOpacity="0.2" stroke="#14b8a6" strokeWidth="1.5" />
            <text x="255" y="81" textAnchor="middle" fontSize="8.6" fontWeight="700" fill="#14b8a6">D-Lite / Pedi-Lite</text>
            <text x="255" y="93" textAnchor="middle" fontSize="7.4" fill={isDark ? '#99f6e4' : '#0f766e'}>Akım + ΔP + CO₂</text>

            {/* Upward Dual Pressure Ports (12 o'clock) */}
            <line x1="234" y1="66" x2="234" y2="42" stroke="#f59e0b" strokeWidth="2.2" />
            <line x1="255" y1="66" x2="255" y2="42" stroke="#f59e0b" strokeWidth="2.2" />
            <line x1="276" y1="66" x2="276" y2="42" stroke="#a855f7" strokeWidth="2" />
            <text x="255" y="37" textAnchor="middle" fontSize="7.8" fontWeight="700" fill="#f59e0b">
              Portlar Yukarı (12:00) ↑
            </text>

            <line x1="312" y1="83" x2="328" y2="83" stroke="#64748b" strokeWidth="3" />

            {/* Y-piece */}
            <rect x="328" y="68" width="130" height="30" rx="6" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#64748b" />
            <text x="393" y="86" textAnchor="middle" fontSize="8.5" fontWeight="600" fill={isDark ? '#cbd5e1' : '#334155'}>
              Y-Parçası &amp; Devre
            </text>

            <text x="240" y="128" textAnchor="middle" fontSize="8.3" fill={isDark ? '#94a3b8' : '#64748b'}>
              Sensör hasta tarafına (HMEF önüne) konursa su/sekresyon dolarak ölçümü bozar!
            </text>

            {/* RIGHT: D-Lite vs Pedi-Lite Sizing Box */}
            <rect x="486" y="8" width="266" height="138" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="498" y="26" fontSize="10" fontWeight="700" fill="#0ea5e9">
              B) Sensör Boyutu &amp; Ölü Boşluk
            </text>

            <rect x="500" y="38" width="238" height="44" rx="7" fill="#0ea5e9" fillOpacity="0.12" stroke="#0ea5e9" strokeOpacity="0.45" />
            <text x="512" y="54" fontSize="9" fontWeight="700" fill="#0ea5e9">Erişkin (D-Lite · Mavi)</text>
            <text x="512" y="70" fontSize="8.3" fill={isDark ? '#bae6fd' : '#0c4a6e'}>VT: 150 – 2000 mL • Ölü Boşluk: ~9.5 mL</text>

            <rect x="500" y="90" width="238" height="44" rx="7" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeOpacity="0.45" />
            <text x="512" y="106" fontSize="9" fontWeight="700" fill="#10b981">Pediatrik (Pedi-Lite · Şeffaf/Sarı)</text>
            <text x="512" y="122" fontSize="8.3" fill={isDark ? '#a7f3d0' : '#064e3b'}>VT: 15 – 300 mL • Ölü Boşluk: ~2.5 mL</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-sky-500" />
              <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Kalibrasyon &amp; Vaka Öncesi Makine Testi
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Devre Kompliyans &amp; Kaçak Testi:</strong> Her sabah (ve devre değişiminde) yapılan otomatik test, hortum esnemesine giden volümü (~1.5–3 mL/cmH₂O) ölçüp otomatik kompanze eder.</li>
              <li>• <strong>Sıfır Akım (Zero-Flow) Kalibrasyonu:</strong> Açılışta basınç transdüserleri atmosfer basıncına sıfırlanır.</li>
              <li>• <strong>Sensör Tipi Eşleştirme:</strong> Monitörde D-Lite vs. Pedi-Lite ayarı fiziksel sensörle birebir aynı olmalıdır!</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-sky-500" />
              <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2 Kritik Dinamik Yatak Başı Manevrası
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>
                • <strong>İnspiratuvar Duraklama (Inspiratory Hold — 0.5–1 sn):</strong> Akımı sıfıra indirerek rezistif bileşeni devreden çıkarır → gerçek <strong>Pplato</strong>, <strong>Cstat</strong> ve <strong>Driving Pressure (ΔP)</strong> ölçülür.
              </li>
              <li>
                • <strong>Ekspiratuvar Duraklama (Expiratory Hold — 2–3 sn):</strong> Ekspiryum sonunda valfleri kapatarak alveoler basınçla devre basıncını eşitler → gizli <strong>Auto-PEEP (İntrensek PEEP)</strong> ölçülür.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: NORMAL VE PATOLOJİK DALGA FORMLARI (P-V & F-V LABORATUVARI)  */}
      {/* ===================================================================== */}
      <section id="spiro-sec-4" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
                isDark
                  ? 'bg-teal-500/15 border-teal-500/30 text-teal-400'
                  : 'bg-teal-50 border-teal-200 text-teal-700'
              }`}
            >
              4
            </div>
            <div>
              <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Normal ve Patolojik Dalga Formları (P–V &amp; F–V Döngü Laboratuvarı)
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Eşzamanlı Basınç–Volüm &amp; Akım–Volüm Döngüleri · Referans Hayalet Döngü Kıyaslaması
              </p>
            </div>
          </div>
          <span
            className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border self-start sm:self-auto ${
              isDark
                ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
                : 'bg-teal-50 border-teal-200 text-teal-800'
            }`}
          >
            7 Klasik Klinik Döngü
          </span>
        </div>

        {/* 7 Pattern Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {LOOP_PATTERNS.map((loop) => {
            const selected = loop.id === activeLoopId;
            return (
              <button
                key={loop.id}
                type="button"
                onClick={() => setActiveLoopId(loop.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selected
                    ? 'bg-teal-600 text-white border-teal-500 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/70 border-slate-700 text-slate-300 hover:border-teal-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-400'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <Waves className={`w-3.5 h-3.5 shrink-0 ${selected ? 'text-teal-100' : 'text-teal-500'}`} />
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      selected
                        ? 'bg-white/20 text-white'
                        : loop.status === 'critical'
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                          : loop.status === 'warning'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {loop.badge}
                  </span>
                </div>
                <div className="text-[11px] font-bold leading-snug">{loop.label}</div>
              </button>
            );
          })}
        </div>

        {/* Dual Loop Monitor Display + Clinical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-8 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-teal-400 font-bold">
                <span>SPIROMETRY LOOPS</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">Kesikli = Normal Referans</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeLoop.status === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : activeLoop.status === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {activeLoop.statusText}
              </span>
            </div>

            {/* Side-by-Side P-V and F-V SVGs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* LEFT: Pressure-Volume Loop */}
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="text-teal-400 font-bold">Basınç–Volüm (P–V)</span>
                  <span>Y: Volüm (mL) · X: Basınç (cmH₂O)</span>
                </div>
                <svg viewBox="0 0 250 185" className="w-full h-auto" role="img" aria-label={`Basınç-Volüm döngüsü: ${activeLoop.label}`}>
                  {/* Grid */}
                  {[35, 75, 115, 155].map((y) => (
                    <line key={y} x1="38" y1={y} x2="236" y2={y} stroke="#1e293b" strokeWidth="1" />
                  ))}
                  {[86, 134, 182, 230].map((x) => (
                    <line key={x} x1={x} y1="18" x2={x} y2="155" stroke="#1e293b" strokeWidth="1" />
                  ))}
                  {/* Axes */}
                  <line x1="38" y1="18" x2="38" y2="155" stroke="#475569" strokeWidth="1.3" />
                  <line x1="38" y1="155" x2="236" y2="155" stroke="#475569" strokeWidth="1.3" />

                  {/* Tick Labels */}
                  <text x="33" y="38" textAnchor="end" fontSize="8" fill="#64748b" fontFamily="monospace">600</text>
                  <text x="33" y="98" textAnchor="end" fontSize="8" fill="#64748b" fontFamily="monospace">300</text>
                  <text x="33" y="157" textAnchor="end" fontSize="8" fill="#64748b" fontFamily="monospace">0</text>
                  <text x="62" y="170" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">5</text>
                  <text x="134" y="170" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">20</text>
                  <text x="182" y="170" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">30</text>
                  <text x="230" y="170" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">40</text>

                  {/* Ghost Normal Reference Loop */}
                  {activeLoop.id !== 'normal' && (
                    <path d={NORMAL_PV_REF} fill="none" stroke="#475569" strokeWidth="1.4" strokeDasharray="4 3" />
                  )}

                  {/* Active P-V Loop */}
                  <path
                    d={activeLoop.pvPath}
                    fill={
                      activeLoop.status === 'critical'
                        ? '#f43f5e'
                        : activeLoop.status === 'warning'
                          ? '#f59e0b'
                          : '#14b8a6'
                    }
                    fillOpacity="0.14"
                    stroke={
                      activeLoop.status === 'critical'
                        ? '#fb7185'
                        : activeLoop.status === 'warning'
                          ? '#fbbf24'
                          : '#2dd4bf'
                    }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Pattern-specific callouts */}
                  {activeLoop.id === 'normal' && (
                    <g fontFamily="monospace" fontSize="8" fontWeight="700">
                      <text x="160" y="114" fill="#2dd4bf">İnspiryum ↗</text>
                      <text x="86" y="74" fill="#38bdf8">↙ Ekspiryum</text>
                      <line x1="62" y1="155" x2="152" y2="36" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
                      <text x="162" y="34" fill="#10b981">Cstat Eğimi</text>
                    </g>
                  )}
                  {activeLoop.id === 'overdistension' && (
                    <g fontFamily="monospace" fontSize="8" fontWeight="700">
                      <circle cx="222" cy="32" r="4" fill="#fb7185" />
                      <text x="195" y="23" textAnchor="middle" fill="#fb7185">KUŞ GAGASI!</text>
                    </g>
                  )}
                  {activeLoop.id === 'leak' && (
                    <g fontFamily="monospace" fontSize="8" fontWeight="700">
                      <circle cx="86" cy="122" r="4" fill="#fb7185" />
                      <text x="128" y="128" fill="#fb7185">Açık Döngü (Kaçak)</text>
                    </g>
                  )}
                </svg>
              </div>

              {/* RIGHT: Flow-Volume Loop */}
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="text-sky-400 font-bold">Akım–Volüm (F–V)</span>
                  <span>Üst: İnsp · Alt: Eksp</span>
                </div>
                <svg viewBox="0 0 250 185" className="w-full h-auto" role="img" aria-label={`Akım-Volüm döngüsü: ${activeLoop.label}`}>
                  {/* Grid */}
                  {[40, 92, 144].map((y) => (
                    <line
                      key={y}
                      x1="34"
                      y1={y}
                      x2="236"
                      y2={y}
                      stroke={y === 92 ? '#475569' : '#1e293b'}
                      strokeWidth={y === 92 ? '1.3' : '1'}
                    />
                  ))}
                  {[98, 158, 218].map((x) => (
                    <line key={x} x1={x} y1="18" x2={x} y2="165" stroke="#1e293b" strokeWidth="1" />
                  ))}
                  <line x1="38" y1="18" x2="38" y2="165" stroke="#475569" strokeWidth="1.3" />

                  {/* Axis Labels */}
                  <text x="33" y="43" textAnchor="end" fontSize="8" fill="#38bdf8" fontFamily="monospace">+İnsp</text>
                  <text x="33" y="95" textAnchor="end" fontSize="8" fill="#94a3b8" fontFamily="monospace">0</text>
                  <text x="33" y="148" textAnchor="end" fontSize="8" fill="#f59e0b" fontFamily="monospace">−Eksp</text>
                  <text x="158" y="177" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="monospace">Volüm (mL) →</text>

                  {/* Ghost Normal Reference Loop */}
                  {activeLoop.id !== 'normal' && (
                    <path d={NORMAL_FV_REF} fill="none" stroke="#475569" strokeWidth="1.4" strokeDasharray="4 3" />
                  )}

                  {/* Active F-V Loop */}
                  <path
                    d={activeLoop.fvPath}
                    fill={
                      activeLoop.status === 'critical'
                        ? '#f43f5e'
                        : activeLoop.status === 'warning'
                          ? '#f59e0b'
                          : '#38bdf8'
                    }
                    fillOpacity="0.14"
                    stroke={
                      activeLoop.status === 'critical'
                        ? '#fb7185'
                        : activeLoop.status === 'warning'
                          ? '#fbbf24'
                          : '#38bdf8'
                    }
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Pattern-specific callouts */}
                  {activeLoop.id === 'obstruction' && (
                    <g fontFamily="monospace" fontSize="8" fontWeight="700">
                      <text x="132" y="128" textAnchor="middle" fill="#fb7185">SCOOPING (İçbükey!)</text>
                    </g>
                  )}
                  {activeLoop.id === 'auto-peep' && (
                    <g fontFamily="monospace" fontSize="8" fontWeight="700">
                      <circle cx="38" cy="112" r="4" fill="#fbbf24" />
                      <text x="108" y="132" textAnchor="middle" fill="#fbbf24">0’a dönemedi (Auto-PEEP!)</text>
                    </g>
                  )}
                  {activeLoop.id === 'leak' && (
                    <g fontFamily="monospace" fontSize="8" fontWeight="700">
                      <circle cx="82" cy="92" r="4" fill="#fb7185" />
                      <text x="102" y="148" fill="#fb7185">VTe &lt; VTi Kaçak</text>
                    </g>
                  )}
                  {activeLoop.id === 'secretions' && (
                    <text x="136" y="160" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#fbbf24">
                      Testere Dişi (Sawtooth)
                    </text>
                  )}
                </svg>
              </div>
            </div>

            {/* Numeric Telemetry Bar */}
            <div className="grid grid-cols-4 gap-2 font-mono">
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-amber-400">Ppeak</div>
                <div className="text-lg font-bold tabular-nums text-amber-300">{activeLoop.pPeak}</div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-sky-400">Pplato</div>
                <div className="text-lg font-bold tabular-nums text-sky-300">{activeLoop.pPlat}</div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-teal-400">Cstat</div>
                <div className="text-lg font-bold tabular-nums text-teal-300">{activeLoop.cstat}</div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-emerald-400">VTi / VTe</div>
                <div className="text-base font-bold tabular-nums text-emerald-300">{activeLoop.vteRatio}</div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-4 rounded-2xl border p-4 flex flex-col justify-between space-y-3 ${subSurface}`}>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold">
                  Döngü Analizi
                </div>
                <h5 className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeLoop.label}
                </h5>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {activeLoop.morphology}
                </p>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                  Başlıca Klinik Nedenler
                </div>
                <ul className={`text-xs space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {activeLoop.causes.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal-500 font-bold">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className={`rounded-xl border p-3 text-xs leading-relaxed ${
                activeLoop.status === 'critical'
                  ? isDark
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                  : isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="font-bold text-[11px] uppercase tracking-wider mb-1 text-teal-600 dark:text-teal-400">
                Anestezist Aksiyonu
              </div>
              <p>{activeLoop.action}</p>
            </div>
          </div>
        </div>

        {/* Direction & Inflection Points Quick Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`rounded-xl border p-3 ${subSurface}`}>
            <div className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400">DÖNGÜ YÖNÜ</div>
            <div className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Saat Yönünün Tersi vs. Saat Yönü
            </div>
            <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <strong>Mekanik ventilasyon</strong> (pozitif basınç) P–V döngüsünü <strong>saat yönünün tersine</strong>,{' '}
              <strong>spontan solunum</strong> (negatif basınç) <strong>saat yönünde</strong> çizer.
            </p>
          </div>
          <div className={`rounded-xl border p-3 ${subSurface}`}>
            <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">ALT İNFLASYON NOKTASI (LIP)</div>
            <div className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Alveoler Açılma / PEEP Eşiği
            </div>
            <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              İnspiratuvar kolda eğimin dikleşmeye başladığı alt bükülme noktasıdır; PEEP’in LIP üzerinde tutulması atelektotravmayı azaltır.
            </p>
          </div>
          <div className={`rounded-xl border p-3 ${subSurface}`}>
            <div className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">ÜST İNFLASYON NOKTASI (UIP)</div>
            <div className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Aşırı Gerilme / Kuş Gagası Sınırı
            </div>
            <p className={`text-[11px] mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Eğimin yataylaştığı üst bükülme noktasıdır; aşılması alveoler aşırı gerilme (beaking) ve barotravmaya yol açar.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 5: LİMİTASYONLAR VE ARTEFAKTLAR                                 */}
      {/* ===================================================================== */}
      <section id="spiro-sec-5" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}
          >
            5
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Limitasyonlar ve Artefaktlar (Ölçüm Yanılgıları)
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Nem/Sekresyon · Devre Kompliyansı · Gaz Yoğunluğu · Dış Cerrahi Bası
            </p>
          </div>
        </div>

        {/* Visual Diagram 5A: 3-Zone Spirometry Error Map SVG */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <svg viewBox="0 0 760 132" className="w-full h-auto" role="img" aria-label="Spirometri ölçüm hatası ve artefakt yön haritası">
            <rect x="10" y="10" width="242" height="112" rx="10" fill="#0ea5e9" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#0ea5e9" strokeOpacity="0.45" />
            <text x="131" y="29" textAnchor="middle" fontSize="9.8" fontWeight="700" fill={isDark ? '#7dd3fc' : '#0369a1'} fontFamily="monospace">
              ← YALANCI DÜŞÜK VTe / AÇIK DÖNGÜ
            </text>
            <text x="22" y="49" fontSize="9" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• ETT kaf kaçağı / LMA uyumsuzluğu</text>
            <text x="22" y="66" fontSize="9" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Bronkoplevral fistül / devre kaçağı</text>
            <text x="22" y="83" fontSize="9" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Pediatride sidestream gaz çekimi</text>
            <text x="22" y="100" fontSize="9" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Hold yapmadan Cstat hesabı (↓)</text>

            <rect x="262" y="10" width="236" height="112" rx="10" fill="#f59e0b" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#f59e0b" strokeOpacity="0.5" />
            <text x="380" y="29" textAnchor="middle" fontSize="9.8" fontWeight="700" fill={isDark ? '#fbbf24' : '#b45309'} fontFamily="monospace">
              TRASE BOZULMASI / ARTEFAKT
            </text>
            <text x="274" y="49" fontSize="9" fill={isDark ? '#fde68a' : '#78350f'}>• Sensörde su / mukus (Sawtooth)</text>
            <text x="274" y="66" fontSize="9" fill={isDark ? '#fde68a' : '#78350f'}>• Cerrahın göğse/karna yaslanması</text>
            <text x="274" y="83" fontSize="9" fill={isDark ? '#fde68a' : '#78350f'}>• Yanlış D-Lite / Pedi-Lite seçimi</text>
            <text x="274" y="100" fontSize="9" fill={isDark ? '#fde68a' : '#78350f'}>• Spontan hasta eforu (asenkroni)</text>

            <rect x="508" y="10" width="242" height="112" rx="10" fill="#f43f5e" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#f43f5e" strokeOpacity="0.5" />
            <text x="629" y="29" textAnchor="middle" fontSize="9.8" fontWeight="700" fill={isDark ? '#fda4af' : '#be123c'} fontFamily="monospace">
              YALANCI YÜKSEK VT / SAPMA →
            </text>
            <text x="520" y="49" fontSize="9" fill={isDark ? '#fecdd3' : '#881337'}>• Kompanze edilmemiş devre kompliyansı</text>
            <text x="520" y="66" fontSize="9" fill={isDark ? '#fecdd3' : '#881337'}>• N₂O / He / O₂ yoğunluk uyumsuzluğu</text>
            <text x="520" y="83" fontSize="9" fill={isDark ? '#fecdd3' : '#881337'}>• Tıkalı basınç hattı (hatalı ΔP ↑)</text>
            <text x="520" y="100" fontSize="9" fill={isDark ? '#fecdd3' : '#881337'}>• Kalibrasyonsuz yeni devre değişimi</text>
          </svg>
        </div>

        <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className={isDark ? 'bg-slate-800/90 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                <tr>
                  <th className="px-3.5 py-2.5 font-semibold">Faktör / Durum</th>
                  <th className="px-3.5 py-2.5 font-semibold">Spirometri Etkisi</th>
                  <th className="px-3.5 py-2.5 font-semibold">Mekanizma</th>
                  <th className="px-3.5 py-2.5 font-semibold">Klinik Çözüm</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                {LIMITATION_ROWS.map((row, idx) => (
                  <tr key={idx} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'}>
                    <td className="px-3.5 py-3 align-top">
                      <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.factor}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{row.category}</div>
                    </td>
                    <td className="px-3.5 py-3 align-top whitespace-nowrap">
                      <span
                        className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                          row.effect === 'high'
                            ? 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30'
                            : row.effect === 'distort'
                              ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                              : 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30'
                        }`}
                      >
                        {row.effectLabel}
                      </span>
                    </td>
                    <td className="px-3.5 py-3 align-top leading-relaxed max-w-xs">{row.mechanism}</td>
                    <td className="px-3.5 py-3 align-top leading-relaxed max-w-xs">{row.remedy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 6: KOMPLİKASYONLAR VE GÜVENLİK                                  */}
      {/* ===================================================================== */}
      <section id="spiro-sec-6" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                : 'bg-rose-50 border-rose-200 text-rose-700'
            }`}
          >
            6
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Komplikasyonlar ve Güvenlik
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Barotravma / Volütravma Koruması · Pediatrik Ölü Boşluk · Bağlantı Ayrılması &amp; Alarm Limitleri
            </p>
          </div>
        </div>

        {/* Visual Diagram 6A: 3-Panel Safety Visual */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <svg viewBox="0 0 760 128" className="w-full h-auto" role="img" aria-label="Spirometri 3 temel güvenlik kuralı">
            {/* Panel 1: Lung Protective Guardrails */}
            <rect x="8" y="8" width="242" height="112" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#7f1d1d' : '#fecdd3'} />
            <text x="20" y="26" fontSize="9.8" fontWeight="700" fill="#f43f5e">1. Barotravma Güvenlik Eşikleri</text>
            <rect x="24" y="38" width="100" height="32" rx="6" fill="#f43f5e" fillOpacity="0.16" stroke="#f43f5e" />
            <text x="74" y="52" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#f43f5e" fontFamily="monospace">Pplato &lt; 30</text>
            <text x="74" y="64" textAnchor="middle" fontSize="7.5" fill={isDark ? '#fda4af' : '#881337'}>cmH₂O sınırı</text>
            <rect x="134" y="38" width="100" height="32" rx="6" fill="#f59e0b" fillOpacity="0.16" stroke="#f59e0b" />
            <text x="184" y="52" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#f59e0b" fontFamily="monospace">ΔP &lt; 15</text>
            <text x="184" y="64" textAnchor="middle" fontSize="7.5" fill={isDark ? '#fde68a' : '#78350f'}>Driving Press.</text>
            <text x="129" y="92" textAnchor="middle" fontSize="8.3" fontWeight="700" fill={isDark ? '#e2e8f0' : '#334155'}>
              Kuş gagası görülürse VT’yi 6 mL/kg’a çek!
            </text>
            <text x="129" y="107" textAnchor="middle" fontSize="8" fill={isDark ? '#94a3b8' : '#64748b'}>
              Yüksek tepe basıncı alarmını 35–40 cmH₂O’ya kur
            </text>

            {/* Panel 2: Pediatric Dead Space & Resistance */}
            <rect x="260" y="8" width="240" height="112" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="272" y="26" fontSize="9.8" fontWeight="700" fill="#f59e0b">2. Pediatrik Ölü Boşluk &amp; Direnç</text>
            <text x="274" y="48" fontSize="8.5" fontWeight="700" fill="#f43f5e">✗ Bebekte D-Lite (9.5 mL) = Hiperkapni!</text>
            <text x="274" y="66" fontSize="8.5" fontWeight="700" fill="#10b981">✓ Pedi-Lite (~2.5 mL) kullan</text>
            <text x="274" y="86" fontSize="8.2" fill={isDark ? '#cbd5e1' : '#334155'}>• Ekstra bağlantı = diskonneksiyon riski</text>
            <text x="274" y="102" fontSize="8.2" fill={isDark ? '#cbd5e1' : '#334155'}>• Tüm konnektörleri çevirerek kilitle</text>

            {/* Panel 3: Hot-Wire & Disconnection Alarms */}
            <rect x="510" y="8" width="242" height="112" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="522" y="26" fontSize="9.8" fontWeight="700" fill="#0ea5e9">3. Devre Ayrılması &amp; Sensör Bakımı</text>
            <text x="524" y="48" fontSize="8.4" fill={isDark ? '#e2e8f0' : '#334155'}>• Düşük MV &amp; Düşük Basınç alarmı AÇIK</text>
            <text x="524" y="66" fontSize="8.4" fill={isDark ? '#e2e8f0' : '#334155'}>• Hasarlı sıcak tel (Hot-Wire) = yangın riski</text>
            <text x="524" y="84" fontSize="8.4" fill={isDark ? '#e2e8f0' : '#334155'}>• Tek kullanımlık / HMEF ile çapraz enf. önle</text>
            <text x="524" y="102" fontSize="8.4" fontWeight="700" fill="#10b981">• Çıkmış ΔP hattı = devre kaçağı!</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Barotravma, Volütravma &amp; Hemodinamik Çöküş
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              P–V döngüsünde “kuş gagası” veya yüksek Pplato (&gt;30 cmH₂O) ihmal edilirse pnömotoraks ve VILI gelişir.
              Benzer şekilde F–V döngüsünde tanınmayan <strong>Auto-PEEP</strong> intratorasik basıncı artırarak venöz dönüşü
              düşürür ve açıklanamayan hipotansiyon / nabızsız elektriksel aktiviteye (PEA) yol açabilir.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Akciğer koruyucu hedefleri (VT 6–8 mL/kg PBW, Pplato &lt;30, ΔP &lt;15) koru; şüpheli Auto-PEEP hipotansiyonunda devreyi 5–10 sn ayırıp akciğeri boşalt.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Mekanik Ölü Boşluk, Direnç &amp; Bağlantı Ayrılması
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Y-parçasına eklenen her adaptör hem ek mekanik ölü boşluk hem de ekstra bağlantı noktası (ayrılma/kaçak riski)
              demektir. Özellikle yenidoğan/infantlarda yanlışlıkla erişkin D-Lite kullanmak belirgin CO₂ retansiyonuna ve
              solunum işi artışına neden olur.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: 15–300 mL VT aralığında Pedi-Lite kullan; tüm konik bağlantıları döndürerek kilitle.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Activity className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Sıcak Tel (Hot-Wire) &amp; Yanıcı Gaz Güvenliği
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Hot-wire anemometre telleri çalışma sırasında ~400°C’ye kadar ısınır; yüksek O₂ ortamında kırık/hasarlı tel
              veya alkol bazlı dezenfektan artığıyla temas teorik ateşleme/hasar riski taşır.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Alkolle temizlenen sıcak tel sensörleri tamamen kuruyup havalanmadan cihaza takma; hasarlı sensörü derhal değiştir.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Alarm Disiplini &amp; Enfeksiyon Kontrolü
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Düşük dakika ventilasyonu (MV), yüksek tepe basıncı (tipik 35–40 cmH₂O) ve devre ayrılması alarmları
              anestezi güvenliğinin temel direkleridir. Tek kullanımlık olmayan sensörler HMEF arkasına konmazsa çapraz
              kontaminasyon riski doğurur.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Sensörü daima bakteri/viral HMEF filtresinin makine tarafına yerleştir ve basınç/MV alarmlarını aktif tut.
            </div>
          </div>
        </div>
      </section>

      {/* References Footer */}
      <div
        className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-start gap-3 text-xs ${
          isDark ? 'bg-slate-900/50 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <BookOpen className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Klinik Referanslar
          </div>
          <p className="leading-relaxed">
            1. Miller’s Anesthesia (9th/10th Ed.) — Respiratory Monitoring &amp; Pulmonary Mechanics. • 2. Butterworth JF, Mackey DC, Wasnick JD.{' '}
            <em>Morgan &amp; Mikhail’s Clinical Anesthesiology</em> (7th Ed.). • 3. Dorsch JA, Dorsch SE.{' '}
            <em>Understanding Anesthesia Equipment</em> (5th Ed.). • 4. Hess DR. Respiratory mechanics in mechanically ventilated patients.{' '}
            <em>Respir Care</em>. 2014;59(11):1773–1794. • 5. Amato MBP et al. Driving pressure and survival in ARDS.{' '}
            <em>N Engl J Med</em>. 2015;372:747–755.
          </p>
        </div>
      </div>
    </div>
  );
};
