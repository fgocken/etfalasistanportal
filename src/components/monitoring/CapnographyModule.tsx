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

interface CapnographyModuleProps {
  isDark: boolean;
}

type GradientScenarioId = 'normal' | 'mh' | 'embolism' | 'copd' | 'pregnancy';
type CapnoPatternId =
  | 'normal'
  | 'sharkfin'
  | 'rebreathing'
  | 'curare'
  | 'cardiogenic'
  | 'disconnect'
  | 'embolism'
  | 'hypercapnia';

interface GradientScenario {
  id: GradientScenarioId;
  label: string;
  shortTag: string;
  paCO2: number;
  etCO2: number;
  deadSpacePct: number;
  perfusionPct: number;
  vco2Level: string;
  severity: 'ok' | 'warn' | 'danger';
  note: string;
}

const GRADIENT_SCENARIOS: GradientScenario[] = [
  {
    id: 'normal',
    label: 'Normal Fizyoloji',
    shortTag: 'Normal (Δ 4)',
    paCO2: 40,
    etCO2: 36,
    deadSpacePct: 25,
    perfusionPct: 95,
    vco2Level: 'Normal (200 mL/dk)',
    severity: 'ok',
    note: 'Sağlıklı akciğerde fizyolojik ölü boşluk (~%25–30) nedeniyle EtCO₂, PaCO₂’den 2–5 mmHg daha düşüktür. Normal P(a-Et)CO₂ gradiyenti ≤ 5 mmHg’dır.',
  },
  {
    id: 'mh',
    label: 'Malign Hipertermi / Sepsis (↑ VCO₂)',
    shortTag: 'MH / ↑VCO₂',
    paCO2: 68,
    etCO2: 62,
    deadSpacePct: 28,
    perfusionPct: 95,
    vco2Level: 'Çok Yüksek (3–4× ↑)',
    severity: 'danger',
    note: 'Metabolik CO₂ üretimi hızla artar; dakika ventilasyonu sabitken EtCO₂ dakikalar içinde tırmanır. Malign hiperterminin EN ERKEN ve en duyarlı klinik işaretidir!',
  },
  {
    id: 'embolism',
    label: 'Pulmoner / Hava Embolisi veya Şok',
    shortTag: 'Emboli (Δ 27!)',
    paCO2: 46,
    etCO2: 19,
    deadSpacePct: 68,
    perfusionPct: 35,
    vco2Level: 'Normal / Azalmış dönüş',
    severity: 'danger',
    note: 'KRİTİK GRADYENT AÇILMASI! Ventile olan ancak perfüze olmayan alveoler ölü boşluk aniden artar. EtCO₂ keskin biçimde düşerken PaCO₂ yükselir — P(a-Et)CO₂ gradiyenti >20 mmHg’ya açılır!',
  },
  {
    id: 'copd',
    label: 'KOAH / Amfizem (V/Q Heterojenitesi)',
    shortTag: 'KOAH (Δ 13)',
    paCO2: 54,
    etCO2: 41,
    deadSpacePct: 50,
    perfusionPct: 70,
    vco2Level: 'Normal / Hafif ↑',
    severity: 'warn',
    note: 'Yüksek V/Q bölgeleri (ölü boşluk) ve yavaş boşalan alveoller nedeniyle P(a-Et)CO₂ gradiyenti 10–15 mmHg’ya çıkar; kapnogramda köpekbalığı yüzgeci (eğimli Faz III) görülür.',
  },
  {
    id: 'pregnancy',
    label: 'Gebelik / Yüksek Kardiyak Debi',
    shortTag: 'Gebelik (Δ -1)',
    paCO2: 32,
    etCO2: 33,
    deadSpacePct: 15,
    perfusionPct: 100,
    vco2Level: 'Artmış (+%20)',
    severity: 'ok',
    note: 'Artmış kardiyak debi ve azalmış FRC nedeniyle tüm akciğer zonları (Zon 1 dahil) iyi perfüze olur; P(a-Et)CO₂ gradiyenti 0’a yaklaşır, hatta nadiren negatif (-1 ila -3 mmHg) olabilir.',
  },
];

interface CapnoPattern {
  id: CapnoPatternId;
  label: string;
  badge: string;
  etCO2: string;
  fiCO2: string;
  rr: string;
  status: 'normal' | 'warning' | 'critical';
  statusText: string;
  path: string;
  baselineY?: number;
  morphology: string;
  causes: string[];
  action: string;
}

const CAPNO_PATTERNS: CapnoPattern[] = [
  {
    id: 'normal',
    label: 'Normal Kapnogram (Faz I–IV)',
    badge: 'Referans',
    etCO2: '36',
    fiCO2: '0',
    rr: '12',
    status: 'normal',
    statusText: 'Normal Kare Dalga · α ≈ 105° · β ≈ 90°',
    path:
      'M 10 135 L 44 135 L 54 48 C 56 44, 62 43, 138 38 L 146 135 L 184 135 ' +
      'L 194 48 C 196 44, 202 43, 278 38 L 286 135 L 324 135 ' +
      'L 334 48 C 336 44, 342 43, 418 38 L 426 135 L 464 135 L 474 48 C 476 44, 482 43, 512 40',
    morphology:
      '0 mmHg bazal hat (Faz I: anatomik ölü boşluk), keskin dik yükseliş (Faz II), hafif yukarı eğimli düz alveoler plato (Faz III; son noktası EtCO₂) ve dik inspiratuvar iniş (Faz IV). α açısı ~100–110°, β açısı ~90°.',
    causes: ['Doğru endotrakeal entübasyon ve yeterli ventilasyon', 'Homojen V/Q dağılımı ve açık havayolu', 'Sağlam devre ve aktif CO₂ absorbanı'],
    action: 'ETT yerleşiminin ve etkin alveoler ventilasyonun altın standart kanıtıdır. Trend değişimleri takip edilir.',
  },
  {
    id: 'sharkfin',
    label: 'Bronkospazm / KOAH (Köpekbalığı Yüzgeci)',
    badge: 'α > 110°',
    etCO2: '44',
    fiCO2: '0',
    rr: '14',
    status: 'warning',
    statusText: 'Ekspiratuvar Akım Kısıtlılığı · Geniş α Açısı',
    path:
      'M 10 135 L 40 135 C 54 132, 74 96, 102 68 C 122 50, 136 38, 146 32 L 152 135 L 182 135 ' +
      'C 196 132, 216 96, 244 68 C 264 50, 278 38, 288 32 L 294 135 L 324 135 ' +
      'C 338 132, 358 96, 386 68 C 406 50, 420 38, 430 32 L 436 135 L 466 135 C 478 132, 496 98, 512 72',
    morphology:
      'Faz II eğimi yatıklaşır, Faz III dikleşerek “köpekbalığı yüzgeci (shark fin)” şeklini alır; α açısı >110° genişler. Gerçek alveoler plato tamamlanamadan bir sonraki inspiryum başlar (PaCO₂ > EtCO₂).',
    causes: [
      'Akut bronkospazm / astım / anafilaksi',
      'KOAH / amfizem (farklı zaman sabitli alveollerin asenkron boşalması)',
      'Kısmi ETT tıkanıklığı (sekresyon, kıvrılma, ısırma) veya yabancı cisim',
    ],
    action:
      'Önce mekanik obstrüksiyonu (ETT kıvrılma, aspirasyon, ısırma) dışla; oskültasyonda wheezing varsa anesteziyi derinleştir (sevofluran/propofol), inhale beta-2 agonist (salbutamol) ver ve ekspiryum süresini (I:E 1:3) uzat.',
  },
  {
    id: 'rebreathing',
    label: 'CO₂ Rebreathing (Tükenmiş Soda Lime / Valf)',
    badge: 'FiCO₂ > 0',
    etCO2: '48',
    fiCO2: '11',
    rr: '12',
    status: 'warning',
    statusText: 'Yükselmiş Bazal Hat · İnspirasyonda CO₂ Geri Soluma',
    path:
      'M 10 106 L 44 106 L 54 36 C 58 33, 68 32, 136 28 C 146 58, 156 96, 170 106 L 188 106 ' +
      'L 198 36 C 202 33, 212 32, 280 28 C 290 58, 300 96, 314 106 L 332 106 ' +
      'L 342 36 C 346 33, 356 32, 424 28 C 434 58, 444 96, 458 106 L 476 106 L 486 36 L 512 32',
    baselineY: 106,
    morphology:
      'Faz I bazal hattı 0 mmHg’ya inemez (FiCO₂ > 0, ör. 8–12 mmHg) ve tüm trase yukarı kayar. Ekspiratuvar valf arızasında inspiratuvar iniş (Faz IV) yatıklaşır ve β açısı >90° genişler.',
    causes: [
      'Tükenmiş CO₂ absorbanı (Soda Lime renk değişimi / ısınma kaybı)',
      'Açık takılı kalmış tek yönlü ekspiratuvar veya inspiratuvar valf',
      'Mapleson/Bain devresinde yetersiz taze gaz akımı (FGF)',
    ],
    action:
      'Hemen taze gaz akımını (FGF) yüksek akıma (≥ 8–10 L/dk) çıkar; soda lime kanisterini değiştir ve anestezi makinesi tek yönlü valf disklerinin hareketini kontrol et!',
  },
  {
    id: 'curare',
    label: 'Kürar Çentiği (Spontan Solunum Eforu)',
    badge: 'NMB ↓',
    etCO2: '42',
    fiCO2: '0',
    rr: '14',
    status: 'warning',
    statusText: 'Faz III Sonunda Diyafram İnspiratuvar Çentiği',
    path:
      'M 10 135 L 42 135 L 52 44 C 56 41, 66 40, 102 37 L 112 96 L 122 36 L 140 35 L 148 135 L 184 135 ' +
      'L 194 44 C 198 41, 208 40, 244 37 L 254 92 L 264 36 L 282 35 L 290 135 L 326 135 ' +
      'L 336 44 C 340 41, 350 40, 386 37 L 396 98 L 406 36 L 424 35 L 432 135 L 468 135 L 478 44 L 512 40',
    morphology:
      'Alveoler platonun (Faz III) son üçte birinde ani aşağı yönlü V-şeklinde çentik (cleft) oluşur; ardından plato kısa süre eski yüksekliğine döner.',
    causes: [
      'Nöromüsküler blokajın (kas gevşetici etkisinin) azalması — diyafram uyanıyor!',
      'Yetersiz anestezi derinliği veya artmış cerrahi ağrı uyarısı',
      'Hiperkapni veya hipokseminin solunum merkezini tetiklemesi',
    ],
    action:
      'TOF monitörünü, anestezi derinliğini (MAC/BIS) ve PaCO₂’yi kontrol et; cerrahi gerektiriyorsa ek kas gevşetici veya analjezik/hipnotik uygula, vaka bitiyorsa spontan ventilasyona geçişi planla.',
  },
  {
    id: 'cardiogenic',
    label: 'Kardiyojenik Osilasyonlar',
    badge: 'Benign',
    etCO2: '34',
    fiCO2: '0',
    rr: '8',
    status: 'normal',
    statusText: 'Kalp Atımıyla Senkron Ekspiratuvar Dalgalanma',
    path:
      'M 10 135 L 34 135 L 44 48 C 48 44, 58 43, 128 40 L 136 86 L 146 66 L 156 104 L 166 84 L 176 120 L 186 106 L 196 135 L 236 135 ' +
      'L 246 48 C 250 44, 260 43, 330 40 L 338 86 L 348 66 L 358 104 L 368 84 L 378 120 L 388 106 L 398 135 L 438 135 L 448 48 L 512 42',
    morphology:
      'Uzamış ekspiratuvar duraklama sonunda (Faz III–IV geçişinde) kalp hızıyla birebir senkron düzenli testere/dalga osilasyonları görülür.',
    causes: [
      'Düşük solunum hızı ve uzun ekspiryum süresi (pediatride ve ince yapılı erişkinlerde sık)',
      'Kalbin mekanik kasılmalarının komşu akciğer dokusundaki gazı ileri-geri çalkalaması',
    ],
    action:
      'Zararsız (benign) bir fizyolojik bulgudur; tedavi gerektirmez. Ancak monitör bazen bu osilasyonları yanlışlıkla yüksek solunum sayısı olarak sayabilir.',
  },
  {
    id: 'disconnect',
    label: 'Ani Sıfırlanma (Devre Kopması / Özofageal)',
    badge: 'ACİL!',
    etCO2: '0',
    fiCO2: '0',
    rr: '0',
    status: 'critical',
    statusText: 'NO TRACE = WRONG PLACE · ACİL HAVAYOLU / DEVRE KONTROLÜ',
    path:
      'M 10 135 L 34 135 L 44 48 C 48 44, 56 43, 118 39 L 126 135 L 158 135 ' +
      'L 168 48 C 172 44, 180 43, 240 39 L 248 135 L 512 135',
    morphology:
      'Normal kare dalgalar sonrası kapnogram aniden 0 mmHg düz çizgiye çöker (veya entübasyonda ilk 1–2 küçük mide dalgası sonrası tamamen sıfırlanır).',
    causes: [
      'Solunum devresi ayrılması (disconnection) veya ventilatör arızası',
      'Özofageal entübasyon veya kazara ekstübasyon',
      'Tam ETT tıkanıklığı (mukus tıkacı / kıvrılma) veya ani kardiyak arrest',
    ],
    action:
      'DERHAL: 1) Hasta göğüs hareketini ve devre bağlantılarını kontrol et, 2) Balonla elle %100 O₂ ventile et, 3) Nabız/EKG kontrol et, 4) Entübasyon yeniyse ve dalga yoksa tüpü çıkar (No Trace = Wrong Place)!',
  },
  {
    id: 'embolism',
    label: 'Ani Progresif Düşüş (Emboli / Şok / Arrest)',
    badge: 'Perfüzyon ↓',
    etCO2: '14↓',
    fiCO2: '0',
    rr: '12',
    status: 'critical',
    statusText: 'Ani Pulmoner Perfüzyon Kaybı · Ölü Boşluk Artışı',
    path:
      'M 10 135 L 34 135 L 44 46 C 48 42, 56 41, 116 38 L 124 135 L 154 135 ' +
      'L 164 72 C 168 69, 176 68, 236 66 L 244 135 L 274 135 ' +
      'L 284 102 C 288 100, 296 99, 356 97 L 364 135 L 394 135 ' +
      'L 404 116 C 408 115, 416 114, 476 113 L 484 135 L 512 135',
    morphology:
      'Ventilasyon parametreleri ve solunum sayısı sabitken kare dalganın yüksekliği birkaç nefes içinde keskin biçimde çöker (36 → 24 → 14 → 10 mmHg).',
    causes: [
      'Masif pulmoner tromboemboli, venöz hava embolisi (oturur kraniyotomi/laparoskopi) veya kemik çimentosu/yağ embolisi',
      'Akut derin hipotansiyon / masif kanama / düşük kardiyak debi',
      'Kardiyak arrest (KPR sırasında EtCO₂ <10 mmHg yetersiz bası, ani >35–40 sıçrama = ROSC)',
    ],
    action:
      'Nabız, kan basıncı ve ritmi anında kontrol et! Hava embolisinde cerrahı uyar (sahayı serumla doldur), %100 O₂’ye geç (N₂O kapat), vazopresör/sıvı başla ve gerekirse CPR protokolünü başlat.',
  },
  {
    id: 'hypercapnia',
    label: 'Progresif Yükseliş (MH / Hipoventilasyon / CO₂)',
    badge: 'EtCO₂ ↑↑',
    etCO2: '64↑',
    fiCO2: '0',
    rr: '12',
    status: 'critical',
    statusText: 'Artan CO₂ Üretimi (MH?) veya Yetersiz Ventilasyon',
    path:
      'M 10 135 L 34 135 L 44 74 C 48 71, 56 70, 116 68 L 124 135 L 154 135 ' +
      'L 164 56 C 168 53, 176 52, 236 50 L 244 135 L 274 135 ' +
      'L 284 38 C 288 35, 296 34, 356 32 L 364 135 L 394 135 ' +
      'L 404 22 C 408 20, 416 19, 476 17 L 484 135 L 512 135',
    morphology:
      'Bazal hat 0 mmHg’da kalırken (rebreathing yok!) her solukta alveoler plato giderek yükselir (36 → 45 → 55 → 64+ mmHg).',
    causes: [
      'Malign Hipertermi (en erken bulgu — taşikardi, rijidite, ateş eşlik edebilir!)',
      'Hipoventilasyon (opioid, düşük dakika ventilasyonu, ETT tek akciğer)',
      'Laparoskopi CO₂ insüflasyonu / subkutan amfizem, turnike/aort klemp açılması, sepsis/ateş, IV NaHCO₃',
    ],
    action:
      'Dakika ventilasyonunu artır; yüksek ventilasyona rağmen EtCO₂ hızla tırmanmaya devam ediyorsa Malign Hipertermi krizini düşün (volatili kapat, %100 O₂ 10 L/dk, Dantrolen 2.5 mg/kg IV)!',
  },
];

interface LimitationRow {
  factor: string;
  category: string;
  effect: 'low' | 'high' | 'rebreath' | 'false';
  effectLabel: string;
  mechanism: string;
  remedy: string;
}

const LIMITATION_ROWS: LimitationRow[] = [
  {
    factor: 'Özofageal Entübasyonda İlk 1–2 Nefes',
    category: 'Kritik Tuzak',
    effect: 'false',
    effectLabel: 'Geçici Küçük Dalga!',
    mechanism:
      'Maske ventilasyonla mideye dolan CO₂ veya gazlı içecek ilk 1–2 nefeste küçük, giderek sönen dalgalar oluşturabilir.',
    remedy: 'Tüp yerleşimini asla tek dalgayla onaylama — ardışık ≥ 6 tutarlı, yüksekliği korunan kare dalga şarttır!',
  },
  {
    factor: 'Alveoler Ölü Boşluk Artışı (Emboli, Şok, Yüksek PEEP)',
    category: 'V/Q & Perfüzyon',
    effect: 'low',
    effectLabel: 'Yalancı Düşük (Δ ↑↑)',
    mechanism:
      'Ventile ama perfüze olmayan alveoller CO₂’siz gaz ekshale ederek perfüze alveollerin CO₂’sini seyreltir (PaCO₂ yüksekken EtCO₂ düşük!).',
    remedy: 'Geniş P(a-Et)CO₂ gradiyentinde ventilasyonu yalnızca EtCO₂’ye göre azaltma; arteriyel kan gazı (PaCO₂) ile doğrula.',
  },
  {
    factor: 'Tükenmiş Soda Lime / Bozuk Tek Yönlü Valf',
    category: 'Anestezi Devresi',
    effect: 'rebreath',
    effectLabel: 'Bazal Hat > 0 (FiCO₂ ↑)',
    mechanism:
      'İnspirasyon gazında CO₂ temizlenemez; Faz I 0 mmHg’ya inmez ve hasta kendi CO₂’sini geri solur.',
    remedy: 'Taze gaz akımını hemen yükselt, soda lime kanisterini değiştir ve ekspiratuvar/inspiratuvar valfi kontrol et.',
  },
  {
    factor: 'Su Buharı Yoğuşması & Sekresyon Tıkanıklığı',
    category: 'Sidestream Hat',
    effect: 'low',
    effectLabel: 'Sönük / Gecikmeli Dalga',
    mechanism:
      'Örnekleme hattına kaçan nem/sekresyon akımı yavaşlatır, dalgayı yuvarlaklaştırır veya tamamen keser.',
    remedy: 'Portu 12 saat yönüne (yukarı) konumlandır, HMEF’nin temiz (makine) tarafına bağla ve water trap’ı düzenli kontrol et.',
  },
  {
    factor: 'Pediatride Yüksek Örnekleme Akımı Dilüsyonu',
    category: 'Pediatri / Küçük VT',
    effect: 'low',
    effectLabel: 'Yalancı Düşük ↓',
    mechanism:
      'Sidestream 150–200 mL/dk çekim hızı yenidoğanın küçük tidal volümünü aşarak taze gazı hatta çeker; plato silinir.',
    remedy: 'Düşük akımlı Microstream (50 mL/dk) veya pediatrik düşük ölü boşluklu adaptör kullan.',
  },
  {
    factor: 'N₂O & Yüksek O₂ (Çarpışma Genişlemesi)',
    category: 'Optik Fizik',
    effect: 'high',
    effectLabel: 'Yalancı Yüksek (+%5–10)',
    mechanism:
      'N₂O (4.5 µm piki) ve O₂, CO₂ molekülleriyle çarpışarak IR absorbsiyon bandını genişletir.',
    remedy: 'Modern gaz analizörleri otomatik N₂O/O₂ kompanzasyonu yapar; eski cihazlarda manuel gaz düzeltmesi kontrol edilmelidir.',
  },
  {
    factor: 'ETT Kaf Kaçağı veya Kısmi Devre Kaçağı',
    category: 'Havayolu / Devre',
    effect: 'low',
    effectLabel: 'Düşük & Kesik Plato',
    mechanism:
      'Ekspiratuvar gazın bir kısmı kaftan kaçtığı için alveoler faz tam örneklenemez; tepe düşer ve plato erken kırılır.',
    remedy: 'ETT kaf basıncını (20–30 cmH₂O) ve pozisyonunu kontrol et.',
  },
  {
    factor: 'Sedasyonda Ağızdan Solunum / Yüksek O₂ Akımı',
    category: 'MAC / Sedasyon',
    effect: 'low',
    effectLabel: 'Seyrelmiş / Zayıf Dalga',
    mechanism:
      'Nazal kanülden verilen yüksek O₂ akımı veya hastanın ağızdan nefes alması örneklenen CO₂’yi seyreltir.',
    remedy: 'Oral kepçeli (oral-scoop) kombine nazal/oral örnekleme kanülü kullan; sayısal değerden çok solunum hızı ve ritmini izle.',
  },
  {
    factor: 'Kısmi Endobronşiyal Entübasyon / Tek Akciğer',
    category: 'Fizyoloji',
    effect: 'false',
    effectLabel: 'Çift Zirveli / Bifazik Faz III',
    mechanism:
      'İki akciğerin farklı kompliyans ve boşalma hızları nedeniyle alveoler plato iki basamaklı (bifazik) görünür.',
    remedy: 'Bilateral solunum seslerini ve ETT derinliğini kontrol et (ayrıca tek akciğer transplantasyonunda da görülebilir).',
  },
];

const SECTION_LINKS = [
  { id: 'etco2-sec-1', num: '1', label: 'Fizik & Mekanizma' },
  { id: 'etco2-sec-2', num: '2', label: 'Endikasyonlar' },
  { id: 'etco2-sec-3', num: '3', label: 'Kurulum & Kalibrasyon' },
  { id: 'etco2-sec-4', num: '4', label: 'Dalga Formları' },
  { id: 'etco2-sec-5', num: '5', label: 'Limitasyonlar' },
  { id: 'etco2-sec-6', num: '6', label: 'Komplikasyonlar' },
];

export const CapnographyModule: React.FC<CapnographyModuleProps> = ({ isDark }) => {
  const [gradScenarioId, setGradScenarioId] = useState<GradientScenarioId>('normal');
  const [activePatternId, setActivePatternId] = useState<CapnoPatternId>('normal');

  const activeGrad =
    GRADIENT_SCENARIOS.find((s) => s.id === gradScenarioId) ?? GRADIENT_SCENARIOS[0];
  const activePattern =
    CAPNO_PATTERNS.find((p) => p.id === activePatternId) ?? CAPNO_PATTERNS[0];

  const gradientVal = activeGrad.paCO2 - activeGrad.etCO2;

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
            ? 'bg-gradient-to-br from-slate-900 via-amber-950/25 to-slate-900 border-amber-500/30'
            : 'bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 border-amber-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span
                className={`px-2 py-0.5 rounded ${
                  isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-800'
                }`}
              >
                ASA Standart II · Ventilasyon
              </span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                6 Bölümlü Görsel &amp; İnteraktif Monitörizasyon Rehberi
              </span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kapnografi (EtCO₂ &amp; Zaman Kapnogramı)
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              4.26 µm kızılötesi spektroskopi ile ekshale edilen karbondioksiti nefes-nefes ölçerek yalnızca{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>ventilasyonu</strong> değil, aynı anda{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>metabolizma (VCO₂)</strong>,{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>pulmoner perfüzyon / kardiyak debi</strong> ve{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>havayolu açıklığını</strong> gösteren vazgeçilmez güvenlik monitörü.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">IR Piki</div>
              <div className="text-sm font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-0.5">
                4.26 µm
              </div>
              <div className="text-[10px] text-slate-500">CO₂ Spektrumu</div>
            </div>
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">Normal EtCO₂</div>
              <div className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                35–45 mmHg
              </div>
              <div className="text-[10px] text-slate-500">4.7 – 6.0 kPa</div>
            </div>
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">P(a-Et)CO₂</div>
              <div className="text-sm font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400 mt-0.5">
                2–5 mmHg
              </div>
              <div className="text-[10px] text-slate-500">Normal Gradiyent</div>
            </div>
          </div>
        </div>

        {/* 6-Section Jump Bar */}
        <div className={`mt-5 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-amber-200/70'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SECTION_LINKS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left text-xs font-semibold transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-700/80 text-slate-200 hover:border-amber-500/60 hover:text-amber-300'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
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
      <section id="etco2-sec-1" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}
          >
            1
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              4.26 µm Kızılötesi Absorbsiyon Spektroskopisi (Beer-Lambert) + Metabolizma–Perfüzyon–Ventilasyon Üçgeni
            </p>
          </div>
        </div>

        {/* Visual Diagram 1A: 4.26 µm IR Bench + 3 Physiological Pillars */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Kızılötesi (IR) Optik Hücre &amp; EtCO₂’yi Belirleyen 3 Fizyolojik Sütun
            </span>
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
              CO₂ Piki: 4.26 µm · N₂O Çapraz Etkisi: ~4.5 µm (Collision Broadening)
            </span>
          </div>

          <svg viewBox="0 0 760 206" className="w-full h-auto" role="img" aria-label="4.26 mikrometre kızılötesi kapnografi optik hücresi ve 3 fizyolojik sütun">
            {/* LEFT PANEL: IR Spectroscopy Chamber */}
            <rect x="10" y="10" width="420" height="186" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="24" y="29" fontSize="10.5" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>
              A) Kızılötesi (IR) Absorbsiyon Odası (Beer-Lambert: I = I₀·e⁻ᵋᶜᴸ)
            </text>

            {/* IR Lamp */}
            <rect x="24" y="58" width="66" height="66" rx="8" fill="#f59e0b" fillOpacity="0.18" stroke="#f59e0b" strokeWidth="1.4" />
            <text x="57" y="88" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#f59e0b" fontFamily="monospace">IR Işık</text>
            <text x="57" y="101" textAnchor="middle" fontSize="8.5" fill={isDark ? '#fde68a' : '#b45309'}>Kaynağı</text>

            {/* Optical Filter 4.26 um */}
            <rect x="110" y="54" width="38" height="74" rx="5" fill="#0ea5e9" fillOpacity="0.18" stroke="#0ea5e9" strokeWidth="1.3" />
            <text x="129" y="84" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">4.26</text>
            <text x="129" y="96" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">µm</text>
            <text x="129" y="110" textAnchor="middle" fontSize="7.5" fill={isDark ? '#7dd3fc' : '#0369a1'}>Filtre</text>

            {/* Beam Lamp -> Filter */}
            <line x1="90" y1="80" x2="110" y2="80" stroke="#f59e0b" strokeWidth="2" />
            <line x1="90" y1="92" x2="110" y2="92" stroke="#f59e0b" strokeWidth="2" />
            <line x1="90" y1="104" x2="110" y2="104" stroke="#f59e0b" strokeWidth="2" />

            {/* Sample Cell with CO2 Molecules */}
            <rect x="168" y="50" width="142" height="82" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.3" />
            <text x="239" y="64" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={isDark ? '#cbd5e1' : '#334155'} fontFamily="monospace">
              Numune Hücresi (Ekshale Gaz)
            </text>

            {/* Rays passing through cell (attenuated) */}
            <line x1="148" y1="82" x2="332" y2="82" stroke="#f59e0b" strokeWidth="2.2" strokeOpacity="0.7" strokeDasharray="5 3" />
            <line x1="148" y1="98" x2="332" y2="98" stroke="#f59e0b" strokeWidth="1.4" strokeOpacity="0.5" strokeDasharray="4 4" />
            <line x1="148" y1="114" x2="332" y2="114" stroke="#f59e0b" strokeWidth="1.4" strokeOpacity="0.5" strokeDasharray="4 4" />

            {/* CO2 molecules absorbing IR */}
            {[
              { x: 196, y: 84 },
              { x: 242, y: 100 },
              { x: 278, y: 82 },
              { x: 218, y: 114 },
            ].map((m, idx) => (
              <g key={idx}>
                <circle cx={m.x} cy={m.y} r="9" fill="#f59e0b" fillOpacity="0.28" stroke="#f59e0b" />
                <text x={m.x} y={m.y + 3} textAnchor="middle" fontSize="7.5" fontWeight="700" fill={isDark ? '#fef3c7' : '#92400e'} fontFamily="monospace">
                  CO₂
                </text>
              </g>
            ))}

            {/* Photodetector */}
            <rect x="332" y="58" width="84" height="66" rx="8" fill="#10b981" fillOpacity="0.18" stroke="#10b981" strokeWidth="1.4" />
            <text x="374" y="84" textAnchor="middle" fontSize="9" fontWeight="700" fill="#10b981" fontFamily="monospace">IR Dedektör</text>
            <text x="374" y="98" textAnchor="middle" fontSize="8" fill={isDark ? '#a7f3d0' : '#047857'}>↑ CO₂ = ↓ Işık</text>
            <text x="374" y="111" textAnchor="middle" fontSize="8" fontFamily="monospace" fill={isDark ? '#6ee7b7' : '#065f46'}>→ mmHg / %</text>

            {/* Bottom note */}
            <text x="220" y="156" textAnchor="middle" fontSize="8.8" fill={isDark ? '#94a3b8' : '#475569'}>
              Asimetrik poliatomik gazlar (CO₂, N₂O, volatiller) IR emer; O₂ ve N₂ IR emmez.
            </text>
            <text x="220" y="174" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#f59e0b">
              Not: CO₂ + N₂O çarpışması (Collision Broadening) otomatik kompanze edilir.
            </text>

            {/* RIGHT PANEL: 3 Physiological Determinants of EtCO2 */}
            <rect x="444" y="10" width="306" height="186" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="458" y="29" fontSize="10.5" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>
              B) EtCO₂’yi Belirleyen 3 Fizyolojik Sütun
            </text>

            {/* Step 1: Metabolism */}
            <rect x="462" y="42" width="270" height="38" rx="8" fill="#f43f5e" fillOpacity="0.12" stroke="#f43f5e" strokeOpacity="0.45" />
            <text x="474" y="58" fontSize="9.5" fontWeight="700" fill="#f43f5e">1. Hücresel Metabolizma (VCO₂ Üretimi)</text>
            <text x="474" y="72" fontSize="8.3" fill={isDark ? '#fecdd3' : '#881337'}>MH, ateş, sepsis, titreme → EtCO₂ ↑ | Hipotermi → EtCO₂ ↓</text>

            {/* Down arrow */}
            <text x="597" y="92" textAnchor="middle" fontSize="10" fill={isDark ? '#64748b' : '#94a3b8'}>↓</text>

            {/* Step 2: Perfusion */}
            <rect x="462" y="96" width="270" height="38" rx="8" fill="#0ea5e9" fillOpacity="0.12" stroke="#0ea5e9" strokeOpacity="0.45" />
            <text x="474" y="112" fontSize="9.5" fontWeight="700" fill="#0ea5e9">2. Dolaşım &amp; Pulmoner Perfüzyon (CO)</text>
            <text x="474" y="126" fontSize="8.3" fill={isDark ? '#bae6fd' : '#0c4a6e'}>Şok, emboli, arrest → EtCO₂ ↓↓ | ROSC / klemp açımı → EtCO₂ ↑</text>

            {/* Down arrow */}
            <text x="597" y="146" textAnchor="middle" fontSize="10" fill={isDark ? '#64748b' : '#94a3b8'}>↓</text>

            {/* Step 3: Alveolar Ventilation */}
            <rect x="462" y="150" width="270" height="38" rx="8" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeOpacity="0.45" />
            <text x="474" y="166" fontSize="9.5" fontWeight="700" fill="#10b981">3. Alveoler Ventilasyon (VA = [VT − VD] × RR)</text>
            <text x="474" y="180" fontSize="8.3" fill={isDark ? '#a7f3d0' : '#064e3b'}>Hipoventilasyon → EtCO₂ ↑ | Hiperventilasyon → EtCO₂ ↓</text>
          </svg>
        </div>

        {/* Interactive Simulator 1B: P(a-Et)CO2 Gradient & Dead Space Simulator */}
        <div className={`rounded-xl border p-4 sm:p-5 space-y-4 ${diagramBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-500" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                İnteraktif P(a-Et)CO₂ Gradiyenti &amp; Alveoler Ölü Boşluk Simülatörü
              </h5>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {GRADIENT_SCENARIOS.map((sc) => {
                const selected = sc.id === gradScenarioId;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setGradScenarioId(sc.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                      selected
                        ? 'bg-amber-600 text-white border-amber-500'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500/50'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                    }`}
                  >
                    {sc.shortTag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Visual Alveolar Dead Space vs Perfused Alveoli Graphic */}
            <div
              className={`lg:col-span-6 rounded-xl border p-4 flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Alveoler Ölü Boşluk (V<sub>D</sub> / V<sub>T</sub>) Etkisi
                </span>
                <span className="font-mono text-[11px] font-bold text-amber-500 tabular-nums">
                  Ölü Boşluk: %{activeGrad.deadSpacePct}
                </span>
              </div>

              <svg viewBox="0 0 380 155" className="w-full h-auto" role="img" aria-label="Perfüze alveol ve ölü boşluk karışım diyagramı">
                {/* Trachea / Y-branch */}
                <path d="M 190 12 L 190 48 M 190 48 L 104 82 M 190 48 L 276 82" stroke={isDark ? '#64748b' : '#94a3b8'} strokeWidth="8" strokeLinecap="round" fill="none" />
                <text x="190" y="10" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#f59e0b" fontFamily="monospace">
                  Ekshale Karışım = EtCO₂ {activeGrad.etCO2} mmHg
                </text>

                {/* Left Alveolus: Perfused */}
                <circle cx="104" cy="108" r="32" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
                <text x="104" y="103" textAnchor="middle" fontSize="9" fontWeight="700" fill="#10b981">Perfüze Alveol</text>
                <text x="104" y="117" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#a7f3d0' : '#047857'} fontFamily="monospace">
                  PACO₂ ≈ {activeGrad.paCO2}
                </text>
                {/* Blood capillary wrapping left alveolus */}
                <path
                  d="M 60 128 Q 104 156, 148 128"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth={activeGrad.perfusionPct > 60 ? '5' : '2.5'}
                  strokeLinecap="round"
                />

                {/* Right Alveolus: Dead Space (Ventilated, No Perfusion) */}
                <circle
                  cx="276"
                  cy="108"
                  r={22 + (activeGrad.deadSpacePct / 100) * 18}
                  fill="#f59e0b"
                  fillOpacity={activeGrad.deadSpacePct > 40 ? '0.25' : '0.12'}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <text x="276" y="104" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f59e0b">Ölü Boşluk</text>
                <text x="276" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill={isDark ? '#fde68a' : '#b45309'} fontFamily="monospace">
                  CO₂ ≈ 0 mmHg
                </text>
                {/* Blocked capillary under dead space */}
                <path d="M 232 134 L 266 134" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="3 3" />
                {activeGrad.id === 'embolism' && (
                  <>
                    <circle cx="276" cy="134" r="6" fill="#f43f5e" />
                    <text x="276" y="151" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f43f5e">
                      Emboli / Akım Kesintisi!
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Right: Telemetry Comparison PaCO2 vs EtCO2 */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-3">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3 text-slate-100">
                <div className="grid grid-cols-3 gap-2 font-mono">
                  <div>
                    <div className="text-[10px] text-rose-400">ARTERİYEL PaCO₂</div>
                    <div className="text-2xl sm:text-3xl font-bold tabular-nums text-rose-400 mt-0.5">
                      {activeGrad.paCO2}
                      <span className="text-[11px] ml-0.5 font-normal">mmHg</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-amber-400">MONİTÖR EtCO₂</div>
                    <div className="text-2xl sm:text-3xl font-bold tabular-nums text-amber-400 mt-0.5">
                      {activeGrad.etCO2}
                      <span className="text-[11px] ml-0.5 font-normal">mmHg</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-sky-400">P(a-Et)CO₂ Δ</div>
                    <div
                      className={`text-2xl sm:text-3xl font-bold tabular-nums mt-0.5 ${
                        gradientVal > 10 ? 'text-rose-400' : gradientVal > 5 ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {gradientVal > 0 ? `+${gradientVal}` : gradientVal}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Metabolizma (VCO₂): <strong className="text-slate-200">{activeGrad.vco2Level}</strong></span>
                  <span>Perfüzyon: <strong className="text-emerald-400">%{activeGrad.perfusionPct}</strong></span>
                </div>
              </div>

              <div
                className={`rounded-xl border p-3.5 text-xs leading-relaxed ${
                  activeGrad.severity === 'danger'
                    ? isDark
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                    : activeGrad.severity === 'warn'
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
                  <span>{activeGrad.label}</span>
                </div>
                <p>{activeGrad.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: ENDİKASYONLAR VE KLİNİK AMAÇ                                 */}
      {/* ===================================================================== */}
      <section id="etco2-sec-2" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
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
              ASA Standart II Zorunluluğu · Entübasyon Altın Standardı · KPR (ROSC) &amp; Erken Kriz Tanısı
            </p>
          </div>
        </div>

        {/* Visual Diagram 2A: 4 High-Yield Clinical Trend Scenarios SVG */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Kapnografi Trendlerinin Hayat Kurtaran 4 Klinik Uygulaması
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              ASA Standart II · NAP4 / DAS · AHA ACLS
            </span>
          </div>

          <svg viewBox="0 0 760 132" className="w-full h-auto" role="img" aria-label="Kapnografinin 4 hayat kurtaran klinik trend grafiği">
            {/* Trend 1: ETT Confirmation vs Esophageal */}
            <rect x="8" y="8" width="178" height="116" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="18" y="25" fontSize="9.5" fontWeight="700" fill="#10b981">1. ETT Doğrulama (≥6 Dalga)</text>
            <path d="M 18 82 L 26 82 L 30 46 L 48 44 L 52 82 L 60 82 L 64 46 L 82 44 L 86 82 L 94 82 L 98 46 L 116 44 L 120 82" fill="none" stroke="#10b981" strokeWidth="2" />
            <path d="M 126 82 L 130 62 L 140 62 L 144 82 L 150 82 L 154 73 L 160 73 L 164 82 L 178 82" fill="none" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 2" />
            <text x="18" y="100" fontSize="8" fill="#10b981" fontWeight="700">Trakeal: Tutarlı kare dalga</text>
            <text x="18" y="113" fontSize="8" fill="#f43f5e">Özofageal: 1–2 nefes → 0!</text>

            {/* Trend 2: CPR & ROSC */}
            <rect x="196" y="8" width="178" height="116" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="206" y="25" fontSize="9.5" fontWeight="700" fill="#0ea5e9">2. KPR Kalitesi &amp; ROSC</text>
            <line x1="206" y1="74" x2="364" y2="74" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" />
            <text x="208" y="71" fontSize="7.5" fill="#f43f5e" fontFamily="monospace">10 mmHg eşiği</text>
            <path d="M 206 86 L 238 80 L 268 70 L 296 68 L 308 38 L 364 36" fill="none" stroke="#0ea5e9" strokeWidth="2.4" />
            <circle cx="308" cy="38" r="3.5" fill="#10b981" />
            <text x="335" y="51" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981" fontFamily="monospace">ROSC!</text>
            <text x="206" y="100" fontSize="8" fill={isDark ? '#cbd5e1' : '#334155'}>KPR &lt;10 = bası yetersiz</text>
            <text x="206" y="113" fontSize="8" fill="#10b981" fontWeight="700">Ani &gt;35–40 = İlk ROSC bulgusu</text>

            {/* Trend 3: Malignant Hyperthermia */}
            <rect x="384" y="8" width="178" height="116" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="394" y="25" fontSize="9.5" fontWeight="700" fill="#f43f5e">3. Malign Hipertermi (MH)</text>
            <path d="M 394 82 L 426 78 L 456 68 L 486 52 L 518 38 L 552 32" fill="none" stroke="#f43f5e" strokeWidth="2.4" />
            <text x="518" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f43f5e" fontFamily="monospace">↑↑ 65+</text>
            <text x="394" y="100" fontSize="8" fill={isDark ? '#cbd5e1' : '#334155'}>Sabit ventilasyonda tırmanış</text>
            <text x="394" y="113" fontSize="8" fill="#f43f5e" fontWeight="700">Ateşten ÖNCE en erken işaret</text>

            {/* Trend 4: Air / Pulmonary Embolism */}
            <rect x="572" y="8" width="180" height="116" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="582" y="25" fontSize="9.5" fontWeight="700" fill="#f59e0b">4. Hava / Pulmoner Emboli</text>
            <path d="M 582 42 L 640 42 L 664 78 L 740 82" fill="none" stroke="#f59e0b" strokeWidth="2.4" />
            <text x="702" y="68" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f59e0b" fontFamily="monospace">Ani ↓ (&lt;18)</text>
            <text x="582" y="100" fontSize="8" fill={isDark ? '#cbd5e1' : '#334155'}>Oturur kraniyotomi / ortopedi</text>
            <text x="582" y="113" fontSize="8" fill="#f59e0b" fontWeight="700">SpO₂ düşmeden önce uyarır</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Klinik Endikasyonlar
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Genel Anestezi (Tümü):</strong> ETT veya supraglottik havayolu (LMA/i-gel) kullanılan her vakada ASA Standart II zorunluluğu.</li>
              <li>• <strong>Orta &amp; Derin Sedasyon (MAC):</strong> Solunum depresyonu ve apneyi SpO₂ düşmeden <strong>1–3 dk önce</strong> yakalar!</li>
              <li>• <strong>KPR, YBÜ &amp; Acil Entübasyon:</strong> Tüp doğrulama, göğüs basısı etkinliği ve erken ROSC tespiti.</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Activity className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Doğrudan Ölçtüğü Parametreler
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>EtCO₂ (End-Tidal CO₂):</strong> Ekspiryum sonu alveoler CO₂ parsiyel basıncı (normal 35–45 mmHg).</li>
              <li>• <strong>FiCO₂ (İnspire Edilen CO₂):</strong> Normalde 0 mmHg olmalıdır (&gt;0 ise rebreathing uyarısı).</li>
              <li>• <strong>Solunum Hızı (RR) &amp; Apne Süresi:</strong> Ekspirasyon döngülerinden gerçek zamanlı solunum takibi.</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Zap className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Dolaylı Fizyolojik Göstergeler
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Kardiyak Debi &amp; Pulmoner Perfüzyon:</strong> Sabit ventilasyonda ani EtCO₂ düşüşü = debi kaybı veya emboli.</li>
              <li>• <strong>Metabolik Hız (VCO₂):</strong> Malign hipertermi, tiroid fırtınası, sepsis ve turnike açılış takibi.</li>
              <li>• <strong>Havayolu Direnci &amp; NMB Derinliği:</strong> Köpekbalığı yüzgeci (bronkospazm) ve kürar çentiği (spontan efor).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: TEKNİK KURULUM VE KALİBRASYON                                */}
      {/* ===================================================================== */}
      <section id="etco2-sec-3" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-teal-500/15 border-teal-500/30 text-teal-400'
                : 'bg-teal-50 border-teal-200 text-teal-700'
            }`}
          >
            3
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Teknik Kurulum ve Kalibrasyon
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Mainstream vs. Sidestream vs. Microstream · HMEF &amp; 12-Saat Port Yönü · Auto-Zero
            </p>
          </div>
        </div>

        {/* Visual Diagram 3A: Mainstream vs Sidestream (with HMEF & 12-o'clock port & Water Trap) */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Devre Kurulum Şeması: Mainstream vs. Sidestream (HMEF &amp; 12 Saat Kuralı)
            </span>
            <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
              Port Yukarı (12:00) · HMEF’nin Temiz Tarafı · AGSS Tahliye
            </span>
          </div>

          <svg viewBox="0 0 760 185" className="w-full h-auto" role="img" aria-label="Mainstream ve Sidestream kapnografi devre kurulum şeması">
            {/* LEFT: Sidestream Setup (Standard OR) */}
            <rect x="8" y="8" width="446" height="169" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="20" y="26" fontSize="10" fontWeight="700" fill="#10b981">
              A) Sidestream / Microstream (Ameliyathane Standardı)
            </text>

            {/* ETT */}
            <rect x="20" y="90" width="76" height="28" rx="6" fill="#0ea5e9" fillOpacity="0.18" stroke="#0ea5e9" />
            <text x="58" y="107" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#0ea5e9">Hasta / ETT</text>

            {/* HMEF Filter */}
            <rect x="108" y="84" width="76" height="40" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.4" />
            <text x="146" y="102" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#10b981">HMEF Filtre</text>
            <text x="146" y="114" textAnchor="middle" fontSize="7.5" fill={isDark ? '#a7f3d0' : '#047857'}>Nem &amp; Bakteri</text>
            <line x1="96" y1="104" x2="108" y2="104" stroke="#64748b" strokeWidth="3" />

            {/* Sampling Port facing UP (12 o'clock) on Machine Side of HMEF */}
            <rect x="194" y="90" width="54" height="28" rx="4" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#f59e0b" strokeWidth="1.3" />
            <text x="221" y="107" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f59e0b">Y-Parça</text>
            <line x1="184" y1="104" x2="194" y2="104" stroke="#64748b" strokeWidth="3" />

            {/* Upward Luer Port (12 o'clock!) */}
            <line x1="212" y1="90" x2="212" y2="54" stroke="#f59e0b" strokeWidth="2.4" />
            <line x1="212" y1="54" x2="294" y2="54" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="4 2" />
            <text x="172" y="66" textAnchor="middle" fontSize="8" fontWeight="700" fill="#f59e0b">Port 12:00 ↑</text>
            <text x="172" y="76" textAnchor="middle" fontSize="7.3" fill={isDark ? '#94a3b8' : '#64748b'}>(Su kaçmaz)</text>

            {/* Water Trap + Monitor */}
            <rect x="294" y="38" width="60" height="32" rx="5" fill="#0ea5e9" fillOpacity="0.16" stroke="#0ea5e9" />
            <text x="324" y="53" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0ea5e9">Su Tutucu</text>
            <text x="324" y="64" textAnchor="middle" fontSize="7" fill={isDark ? '#7dd3fc' : '#0369a1'}>Water Trap</text>

            <line x1="354" y1="54" x2="368" y2="54" stroke="#f59e0b" strokeWidth="2" />

            <rect x="368" y="36" width="74" height="36" rx="6" fill="#f59e0b" fillOpacity="0.18" stroke="#f59e0b" />
            <text x="405" y="52" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f59e0b">IR Analizör</text>
            <text x="405" y="64" textAnchor="middle" fontSize="7.2" fill={isDark ? '#fde68a' : '#b45309'}>50–200 mL/dk</text>

            {/* AGSS Exhaust */}
            <line x1="405" y1="72" x2="405" y2="108" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="3 2" />
            <rect x="356" y="108" width="88" height="24" rx="5" fill="#a855f7" fillOpacity="0.16" stroke="#a855f7" />
            <text x="400" y="123" textAnchor="middle" fontSize="8" fontWeight="700" fill="#a855f7">AGSS / Devreye Dönüş</text>

            {/* Breathing Circuit Lines */}
            <line x1="248" y1="98" x2="338" y2="98" stroke="#64748b" strokeWidth="2.5" />
            <line x1="248" y1="110" x2="338" y2="110" stroke="#64748b" strokeWidth="2.5" />
            <text x="293" y="124" textAnchor="middle" fontSize="7.8" fill={isDark ? '#94a3b8' : '#64748b'}>Anestezi Devresi</text>

            <text x="230" y="158" textAnchor="middle" fontSize="8.3" fill={isDark ? '#94a3b8' : '#64748b'}>
              Avantaj: Hafif, entübe olmayan (MAC) hastada da kullanılır • Dezavantaj: 1–3 sn gecikme, hat tıkanması
            </text>

            {/* RIGHT: Mainstream Setup */}
            <rect x="466" y="8" width="286" height="169" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="478" y="26" fontSize="10" fontWeight="700" fill="#0ea5e9">
              B) Mainstream (Ana Akım · YBÜ)
            </text>

            {/* ETT -> Direct IR Cuvette -> Circuit */}
            <rect x="478" y="74" width="60" height="26" rx="5" fill="#0ea5e9" fillOpacity="0.18" stroke="#0ea5e9" />
            <text x="508" y="90" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0ea5e9">ETT</text>

            <rect x="550" y="54" width="96" height="66" rx="8" fill="#f59e0b" fillOpacity="0.16" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="598" y="72" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f59e0b">IR Sensör Bloğu</text>
            <text x="598" y="86" textAnchor="middle" fontSize="7.8" fill={isDark ? '#fde68a' : '#b45309'}>Doğrudan Hat Üstü</text>
            <text x="598" y="100" textAnchor="middle" fontSize="7.5" fill="#f43f5e" fontWeight="700">Isıtmalı (~40°C)</text>

            <rect x="658" y="74" width="82" height="26" rx="5" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#64748b" />
            <text x="699" y="90" textAnchor="middle" fontSize="8.3" fill={isDark ? '#cbd5e1' : '#334155'}>Ventilatör</text>

            <line x1="538" y1="87" x2="550" y2="87" stroke="#64748b" strokeWidth="3" />
            <line x1="646" y1="87" x2="658" y2="87" stroke="#64748b" strokeWidth="3" />

            <text x="609" y="140" textAnchor="middle" fontSize="8.3" fill="#10b981" fontWeight="600">
              ✓ Gecikme yok (0 sn) · Gaz çekmez · Tıkanmaz
            </text>
            <text x="609" y="156" textAnchor="middle" fontSize="8.3" fill="#f43f5e">
              ⚠ Ağır (ETT kıvrılma/ekstübasyon), cilt yanığı riski
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Comparison Table */}
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className={`px-4 py-2.5 border-b flex items-center gap-2 ${subSurface}`}>
              <Wrench className="w-4 h-4 text-teal-500" />
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Mainstream vs. Sidestream vs. Microstream
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                  <tr>
                    <th className="px-3 py-2 font-semibold">Özellik</th>
                    <th className="px-3 py-2 font-semibold">Mainstream</th>
                    <th className="px-3 py-2 font-semibold">Sidestream</th>
                    <th className="px-3 py-2 font-semibold">Microstream</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Örnekleme Akımı</td>
                    <td className="px-3 py-2">Yok (0 mL/dk)</td>
                    <td className="px-3 py-2 font-mono">150–200 mL/dk</td>
                    <td className="px-3 py-2 font-mono text-emerald-600 dark:text-emerald-400 font-bold">50 mL/dk</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Yanıt Gecikmesi</td>
                    <td className="px-3 py-2 font-mono text-emerald-600 dark:text-emerald-400 font-bold">Anlık (&lt;0.1 sn)</td>
                    <td className="px-3 py-2 font-mono">1.5 – 3 sn</td>
                    <td className="px-3 py-2 font-mono">~1.5 – 2 sn</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Entübesiz (MAC)</td>
                    <td className="px-3 py-2 text-rose-500 font-semibold">Kullanılamaz</td>
                    <td className="px-3 py-2 text-emerald-500 font-semibold">Evet</td>
                    <td className="px-3 py-2 text-emerald-500 font-semibold">İdeal (Pediatri+)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Ana Dezavantaj</td>
                    <td className="px-3 py-2">Ağırlık, ısı, kırılgan</td>
                    <td className="px-3 py-2">Su/sekresyon, dilüsyon</td>
                    <td className="px-3 py-2">Özel tek kullanımlık hat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Calibration & Bedside Check */}
          <div className="space-y-3">
            <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
              <h5 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Kalibrasyon &amp; Sıfırlama (Auto-Zero)
              </h5>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Modern kapnograflar açılışta ve periyodik olarak <strong>oda havasıyla otomatik sıfırlama (Auto-Zero)</strong>{' '}
                yapar (oda havası CO₂ ≈ %0.04 ≈ 0.3 mmHg → 0 kabul edilir). Biyomedikal bakımda bilinen referans gaz
                (tipik <strong>%5 CO₂</strong>) ile span kalibrasyonu doğrulanır.
              </p>
            </div>

            <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal-500" />
                <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Vaka Öncesi 3 Adımlı Dinamik Kurulum Testi
                </h5>
              </div>
              <ol className={`text-xs space-y-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li><strong className="text-teal-500 font-mono">1.</strong> <strong>Bağlantı &amp; Yön:</strong> Örnekleme hattı HMEF’nin makine tarafında ve 12 saat yönünde (yukarı) mi?</li>
                <li><strong className="text-teal-500 font-mono">2.</strong> <strong>Su Tutucu &amp; Akım:</strong> Water trap boş ve sağlam mı; örnekleme hattı kıvrık veya tıkalı değil mi?</li>
                <li><strong className="text-teal-500 font-mono">3.</strong> <strong>Üfleme / Hızlı Cevap Testi:</strong> Hattın ucuna hafif nefes üflendiğinde 2–3 sn içinde keskin kare yükselme ve 0’a dönüş görülüyor mu?</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: NORMAL VE PATOLOJİK DALGA FORMLARI                           */}
      {/* ===================================================================== */}
      <section id="etco2-sec-4" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
                isDark
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'bg-amber-50 border-amber-200 text-amber-700'
              }`}
            >
              4
            </div>
            <div>
              <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Normal ve Patolojik Dalga Formları (Zaman Kapnogramı)
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Sayıdan Önce Faz I–IV ve α / β Açılarını Oku! · 8 İnteraktif Klinik Kapnogram
              </p>
            </div>
          </div>
          <span
            className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border self-start sm:self-auto ${
              isDark
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            8 Klasik Tanı Koyduran Patern
          </span>
        </div>

        {/* 8 Pattern Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CAPNO_PATTERNS.map((pattern) => {
            const selected = pattern.id === activePatternId;
            return (
              <button
                key={pattern.id}
                type="button"
                onClick={() => setActivePatternId(pattern.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selected
                    ? 'bg-amber-600 text-white border-amber-500 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/70 border-slate-700 text-slate-300 hover:border-amber-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <Waves className={`w-3.5 h-3.5 shrink-0 ${selected ? 'text-amber-100' : 'text-amber-500'}`} />
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      selected
                        ? 'bg-white/20 text-white'
                        : pattern.status === 'critical'
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                          : pattern.status === 'warning'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {pattern.badge}
                  </span>
                </div>
                <div className="text-[11px] font-bold leading-snug">{pattern.label}</div>
              </button>
            );
          })}
        </div>

        {/* Bedside Capnograph Monitor Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>CO₂ CAPNOGRAM (mmHg)</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">6.25 mm/sn</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activePattern.status === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : activePattern.status === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {activePattern.statusText}
              </span>
            </div>

            <div className="rounded-xl bg-slate-900/80 border border-slate-800/90 p-2">
              <svg viewBox="0 0 520 165" className="w-full h-auto" role="img" aria-label={activePattern.label}>
                {/* Gridlines (0, 20, 40, 60 mmHg) */}
                {[
                  { y: 20, label: '60' },
                  { y: 58, label: '40' },
                  { y: 97, label: '20' },
                  { y: 135, label: '0' },
                ].map((g) => (
                  <g key={g.label}>
                    <line
                      x1="28"
                      y1={g.y}
                      x2="516"
                      y2={g.y}
                      stroke={g.label === '0' ? '#475569' : '#1e293b'}
                      strokeWidth={g.label === '0' ? '1.3' : '1'}
                    />
                    <text x="22" y={g.y + 3} textAnchor="end" fontSize="8.5" fill="#64748b" fontFamily="monospace">
                      {g.label}
                    </text>
                  </g>
                ))}

                {/* Rebreathing baseline indicator */}
                {activePattern.baselineY && (
                  <>
                    <line x1="28" y1={activePattern.baselineY} x2="516" y2={activePattern.baselineY} stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="4 3" />
                    <text x="510" y={activePattern.baselineY - 5} textAnchor="end" fontSize="8.5" fontWeight="700" fill="#fb7185" fontFamily="monospace">
                      FiCO₂ &gt; 0 (Bazal Hat Yüksek!)
                    </text>
                  </>
                )}

                {/* Main Capnogram Trace */}
                <path
                  d={activePattern.path}
                  fill="none"
                  stroke={
                    activePattern.status === 'critical'
                      ? '#fb7185'
                      : '#fbbf24'
                  }
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Phase & Angle Callouts for Normal Capnogram */}
                {activePattern.id === 'normal' && (
                  <g fontFamily="monospace" fontSize="8.5" fontWeight="700">
                    <text x="165" y="152" textAnchor="middle" fill="#94a3b8">Faz I (Ölü Boşluk)</text>
                    <text x="190" y="95" textAnchor="end" fill="#38bdf8">Faz II</text>
                    <text x="240" y="30" textAnchor="middle" fill="#fbbf24">Faz III (Alveoler Plato)</text>
                    <circle cx="278" cy="38" r="3.5" fill="#10b981" />
                    <text x="305" y="29" textAnchor="start" fill="#34d399">EtCO₂</text>
                    <text x="292" y="95" textAnchor="start" fill="#c084fc">Faz IV</text>

                    {/* Alpha & Beta angle labels */}
                    <circle cx="56" cy="46" r="3.2" fill="#38bdf8" />
                    <text x="67" y="58" fill="#38bdf8">α ≈ 105°</text>
                    <circle cx="138" cy="38" r="3.2" fill="#f43f5e" />
                    <text x="131" y="58" textAnchor="end" fill="#fb7185">β ≈ 90°</text>
                  </g>
                )}

                {/* Curare cleft pointer */}
                {activePattern.id === 'curare' && (
                  <g fontFamily="monospace" fontSize="8.5" fontWeight="700">
                    <circle cx="254" cy="92" r="4" fill="#fb7185" />
                    <text x="254" y="114" textAnchor="middle" fill="#fb7185">Kürar Çentiği (Spontan Efor)</text>
                  </g>
                )}

                {/* Shark fin alpha angle callout */}
                {activePattern.id === 'sharkfin' && (
                  <text x="250" y="25" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#fbbf24">
                    Eğimli Faz III + Geniş α Açısı (&gt;110°) = Obstrüksiyon!
                  </text>
                )}
              </svg>
            </div>

            {/* Numeric Telemetry Bar */}
            <div className="grid grid-cols-3 gap-2 font-mono">
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-amber-400">EtCO₂ (mmHg)</div>
                <div
                  className={`text-xl font-bold tabular-nums ${
                    activePattern.status === 'critical' ? 'text-rose-400' : 'text-amber-300'
                  }`}
                >
                  {activePattern.etCO2}
                </div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-sky-400">FiCO₂ (mmHg)</div>
                <div
                  className={`text-xl font-bold tabular-nums ${
                    activePattern.fiCO2 !== '0' ? 'text-rose-400' : 'text-sky-300'
                  }`}
                >
                  {activePattern.fiCO2}
                </div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-emerald-400">RR (/dk)</div>
                <div className="text-xl font-bold tabular-nums text-emerald-300">{activePattern.rr}</div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-5 rounded-2xl border p-4 flex flex-col justify-between space-y-3 ${subSurface}`}>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  Kapnogram Morfolojisi
                </div>
                <h5 className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activePattern.label}
                </h5>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {activePattern.morphology}
                </p>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                  Başlıca Klinik Nedenler
                </div>
                <ul className={`text-xs space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {activePattern.causes.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className={`rounded-xl border p-3 text-xs leading-relaxed ${
                activePattern.status === 'critical'
                  ? isDark
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                  : isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="font-bold text-[11px] uppercase tracking-wider mb-1 text-amber-600 dark:text-amber-400">
                Anestezist Aksiyonu
              </div>
              <p>{activePattern.action}</p>
            </div>
          </div>
        </div>

        {/* 4 Phases + Alpha/Beta Reference Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2.5">
          {[
            { tag: 'Faz I', title: 'Bazal Hat (0)', desc: 'Anatomik ölü boşluk gazı (CO₂ = 0).' },
            { tag: 'Faz II', title: 'Ekspiryum Çıkışı', desc: 'Ölü boşluk + alveoler gaz hızlı geçişi.' },
            { tag: 'Faz III', title: 'Alveoler Plato', desc: 'Alveoler boşalma; tepe noktası = EtCO₂.' },
            { tag: 'Faz IV (0)', title: 'İnspiryum İnişi', desc: 'Taze gaz girişiyle hızla 0 mmHg’ya düşüş.' },
            { tag: 'α Açısı', title: 'Faz II–III (~105°)', desc: 'V/Q ve havayolu direnci (>110° = bronkospazm).' },
            { tag: 'β Açısı', title: 'Faz III–IV (~90°)', desc: 'Rebreathing (>90° = bozuk ekspiratuvar valf).' },
          ].map((item) => (
            <div key={item.tag} className={`rounded-xl border p-3 ${subSurface}`}>
              <div className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">{item.tag}</div>
              <div className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</div>
              <p className={`text-[11px] mt-1 leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 5: LİMİTASYONLAR VE ARTEFAKTLAR                                 */}
      {/* ===================================================================== */}
      <section id="etco2-sec-5" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-purple-500/15 border-purple-500/30 text-purple-400'
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}
          >
            5
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Limitasyonlar ve Artefaktlar (Yanılgı Matrisi)
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              EtCO₂ Sapma Haritası · Ölü Boşluk Maskelemesi · Örnekleme &amp; Optik Tuzaklar
            </p>
          </div>
        </div>

        {/* Visual Diagram 5A: EtCO2 Deviation Compass SVG */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <svg viewBox="0 0 760 144" className="w-full h-auto" role="img" aria-label="EtCO2 yanlış okuma ve sapma yön haritası">
            {/* Left: False Low / Wide Gradient */}
            <rect x="10" y="12" width="244" height="120" rx="10" fill="#0ea5e9" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#0ea5e9" strokeOpacity="0.45" />
            <text x="132" y="32" textAnchor="middle" fontSize="10" fontWeight="700" fill={isDark ? '#7dd3fc' : '#0369a1'} fontFamily="monospace">
              ← EtCO₂ DÜŞÜK / PaCO₂ ≫ EtCO₂
            </text>
            <text x="24" y="52" fontSize="9.3" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Pulmoner / Hava Embolisi (Ölü boşluk ↑)</text>
            <text x="24" y="69" fontSize="9.3" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Şok, Hipovolemi, Yüksek PEEP</text>
            <text x="24" y="86" fontSize="9.3" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Pediatride Sidestream Gaz Dilüsyonu</text>
            <text x="24" y="103" fontSize="9.3" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• ETT Kaf Kaçağı / Tıkalı Water Trap</text>
            <text x="24" y="120" fontSize="9.3" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Sedasyonda Ağız Solunumu / Yüksek O₂</text>

            {/* Center: Elevated Baseline (Rebreathing) */}
            <rect x="266" y="12" width="228" height="120" rx="10" fill="#a855f7" fillOpacity={isDark ? '0.13' : '0.08'} stroke="#a855f7" strokeOpacity="0.5" />
            <text x="380" y="32" textAnchor="middle" fontSize="10" fontWeight="700" fill={isDark ? '#d8b4fe' : '#7e22ce'} fontFamily="monospace">
              BAZAL HAT &gt; 0 (FiCO₂ ↑)
            </text>
            <text x="280" y="56" fontSize="9.3" fontWeight="700" fill={isDark ? '#e9d5ff' : '#581c87'}>• Tükenmiş Soda Lime Absorbanı</text>
            <text x="280" y="75" fontSize="9.3" fontWeight="700" fill={isDark ? '#e9d5ff' : '#581c87'}>• Bozuk Ekspiratuvar / İnsp. Valf</text>
            <text x="280" y="94" fontSize="9.3" fill={isDark ? '#d8b4fe' : '#6b21a8'}>• Mapleson’da Düşük Taze Gaz (FGF)</text>
            <text x="380" y="118" textAnchor="middle" fontSize="8.4" fontFamily="monospace" fill={isDark ? '#c084fc' : '#7e22ce'}>
              β açısı &gt; 90° → Ekspiratuvar valfi kontrol et!
            </text>

            {/* Right: Rising / High EtCO2 */}
            <rect x="506" y="12" width="244" height="120" rx="10" fill="#f43f5e" fillOpacity={isDark ? '0.13' : '0.08'} stroke="#f43f5e" strokeOpacity="0.5" />
            <text x="628" y="32" textAnchor="middle" fontSize="10" fontWeight="700" fill={isDark ? '#fda4af' : '#be123c'} fontFamily="monospace">
              EtCO₂ YÜKSEK / TIRMANAN (↑) →
            </text>
            <text x="520" y="52" fontSize="9.3" fontWeight="700" fill={isDark ? '#fecdd3' : '#881337'}>• Malign Hipertermi (EN ERKEN İŞARET)</text>
            <text x="520" y="69" fontSize="9.3" fill={isDark ? '#fecdd3' : '#881337'}>• Hipoventilasyon / Opioid Depresyonu</text>
            <text x="520" y="86" fontSize="9.3" fill={isDark ? '#fecdd3' : '#881337'}>• Laparoskopi CO₂ İnsüflasyonu</text>
            <text x="520" y="103" fontSize="9.3" fill={isDark ? '#fecdd3' : '#881337'}>• Turnike / Aort Klempi Açılması, NaHCO₃</text>
            <text x="520" y="120" fontSize="9.3" fill={isDark ? '#fecdd3' : '#881337'}>• N₂O Çarpışma Genişlemesi (kompanzasyonsuz)</text>
          </svg>
        </div>

        <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className={isDark ? 'bg-slate-800/90 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                <tr>
                  <th className="px-3.5 py-2.5 font-semibold">Faktör / Durum</th>
                  <th className="px-3.5 py-2.5 font-semibold">Kapnogram Etkisi</th>
                  <th className="px-3.5 py-2.5 font-semibold">Fizyolojik / Teknik Mekanizma</th>
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
                            : row.effect === 'rebreath'
                              ? 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30'
                              : row.effect === 'false'
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
      <section id="etco2-sec-6" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
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
              “No Trace = Wrong Place” Altın Kuralı · Mainstream Ağırlık/Yanık · Devre Kaçağı &amp; AGSS
            </p>
          </div>
        </div>

        {/* Visual Diagram 6A: 3-Panel Capnography Safety Infographic */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <svg viewBox="0 0 760 132" className="w-full h-auto" role="img" aria-label="Kapnografi 3 temel güvenlik kuralı şeması">
            {/* Panel 1: No Trace = Wrong Place */}
            <rect x="8" y="8" width="242" height="116" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#7f1d1d' : '#fecdd3'} />
            <text x="20" y="26" fontSize="9.8" fontWeight="700" fill="#f43f5e">1. “No Trace = Wrong Place” (NAP4)</text>
            <line x1="24" y1="64" x2="232" y2="64" stroke="#f43f5e" strokeWidth="2.8" />
            <text x="128" y="54" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f43f5e" fontFamily="monospace">
              DÜZ ÇİZGİ = TÜP YANLIŞ YERDE!
            </text>
            <text x="128" y="86" textAnchor="middle" fontSize="8.3" fill={isDark ? '#cbd5e1' : '#334155'}>
              KPR sırasında bile düşük dalga görülür.
            </text>
            <text x="128" y="102" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#f43f5e">
              Oskültasyona güvenip bekletme → ÇIKAR!
            </text>

            {/* Panel 2: Mainstream Weight & Heat */}
            <rect x="260" y="8" width="240" height="116" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="272" y="26" fontSize="9.8" fontWeight="700" fill="#f59e0b">2. Mainstream Ağırlık &amp; ~40°C Isı</text>
            <rect x="284" y="42" width="84" height="28" rx="6" fill="#f59e0b" fillOpacity="0.18" stroke="#f59e0b" />
            <text x="326" y="59" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#f59e0b">Ağır Sensör</text>
            <path d="M 326 70 L 326 94" stroke="#f43f5e" strokeWidth="2" />
            <polygon points="321,92 326,100 331,92" fill="#f43f5e" />
            <text x="434" y="54" textAnchor="middle" fontSize="8.3" fontWeight="600" fill={isDark ? '#e2e8f0' : '#334155'}>• ETT kıvrılması</text>
            <text x="434" y="70" textAnchor="middle" fontSize="8.3" fontWeight="600" fill={isDark ? '#e2e8f0' : '#334155'}>• Kazara ekstübasyon</text>
            <text x="434" y="86" textAnchor="middle" fontSize="8.3" fontWeight="600" fill={isDark ? '#e2e8f0' : '#334155'}>• Bebekte ölü boşluk</text>
            <text x="434" y="104" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#f43f5e">• Yüzde termal yanık</text>

            {/* Panel 3: Sidestream Leak & AGSS */}
            <rect x="510" y="8" width="242" height="116" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="522" y="26" fontSize="9.8" fontWeight="700" fill="#0ea5e9">3. Devre Kaçağı &amp; AGSS Tahliye</text>
            <rect x="526" y="42" width="90" height="30" rx="6" fill="#0ea5e9" fillOpacity="0.16" stroke="#0ea5e9" />
            <text x="571" y="60" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#0ea5e9">200 mL/dk Çekim</text>
            <line x1="616" y1="57" x2="644" y2="57" stroke="#10b981" strokeWidth="2" />
            <polygon points="643,52 652,57 643,62" fill="#10b981" />
            <rect x="652" y="42" width="84" height="30" rx="6" fill="#10b981" fillOpacity="0.18" stroke="#10b981" />
            <text x="694" y="60" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#10b981">AGSS / Devre</text>
            <text x="631" y="92" textAnchor="middle" fontSize="8.2" fill={isDark ? '#cbd5e1' : '#334155'}>Düşük akımda devre hacmini azaltır;</text>
            <text x="631" y="107" textAnchor="middle" fontSize="8.2" fontWeight="700" fill="#10b981">Egzozu mutlaka AGSS’ye bağla!</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tanınmamış Özofageal Entübasyon (“No Trace = Wrong Place”)
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              NAP4 ve DAS kılavuzlarına göre düz kapnogram varken “akciğer sesleri geliyor” veya “tüp buğulanıyor”
              gerekçesiyle tüpü yerinde bırakmak anesteziye bağlı hipoksik beyin hasarının en trajik önlenebilir nedenidir.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Sürekli kapnogram yoksa (kardiyak arrestte dahi KPR ile hafif dalga beklenir) tüpün trakeada olmadığını varsay ve derhal doğrula/çıkar.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Mekanik Traksiyon, Ölü Boşluk &amp; Cilt Yanığı (Mainstream)
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Mainstream sensörün ağırlığı ETT’de kıvrılmaya veya özellikle bebek/çocuklarda kazara ekstübasyona yol açabilir.
              Yoğuşmayı önlemek için ~40–42°C’ye ısıtılan optik pencere ciltle doğrudan temas ederse yüzeyel termal yanık oluşturabilir.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Sensörü devre destek koluyla sabitle, ciltle arasına koruyucu koy; yenidoğanda düşük ölü boşluklu pediatrik adaptör kullan.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Activity className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Devre Kaçağı, Düşük Akım Hacim Kaybı &amp; Atık Gaz (AGSS)
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Sidestream örnekleme hattının Y-parçasından çıkması devre kaçağına yol açar. Ayrıca 150–200 mL/dk çekilen
              örnek gaz volatil anestezik ve N₂O içerir; odaya verilirse ortam kirliliği yaratır, düşük akımlı anestezide
              devre gaz hacmini azaltır.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Luer-lock bağlantıyı kilitle; analizör egzozunu mutlaka atık gaz tahliye sistemine (AGSS) veya devreye geri yönlendir.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Alarm Disiplini &amp; Nazal Kanül Basısı
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Apne (tipik 15–20 sn), düşük EtCO₂, yüksek EtCO₂ ve yüksek FiCO₂ (&gt;3–5 mmHg) alarmları sedasyon ve genel
              anestezide mutlaka aktif olmalıdır. Uzun süreli sedasyon/YBÜ izleminde nazal örnekleme kanülü burun septumu
              ve kulak arkasında bası yarası oluşturabilir.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Apne ve FiCO₂ alarmlarını kapatma; uzun kullanımda kulak/burun temas noktalarını koruyucu pedle destekle.
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
        <BookOpen className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Klinik Referanslar
          </div>
          <p className="leading-relaxed">
            1. Miller’s Anesthesia (9th/10th Ed.) — Respiratory Monitoring &amp; Capnography. • 2. Butterworth JF, Mackey DC, Wasnick JD.{' '}
            <em>Morgan &amp; Mikhail’s Clinical Anesthesiology</em> (7th Ed.). • 3. Kodali BS. Capnography outside the operating rooms.{' '}
            <em>Anesthesiology</em>. 2013;118(1):192–201. • 4. ASA Standards for Basic Anesthetic Monitoring (Reaffirmed Dec 2020) &amp; AAGBI 2021. •
            5. Cook TM et al. <em>NAP4 &amp; DAS “No Trace = Wrong Place”</em> Campaign; AHA ACLS Guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
