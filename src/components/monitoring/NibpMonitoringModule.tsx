import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Gauge,
  Info,
  ShieldAlert,
  Sliders,
  Waves,
  Wrench,
} from 'lucide-react';

interface NibpMonitoringModuleProps {
  isDark: boolean;
}

type BpPresetId = 'normal' | 'hypotension' | 'hypertension' | 'wide-pp';
type CuffFitId = 'narrow' | 'ideal' | 'wide' | 'loose';
type NibpPatternId =
  | 'normal'
  | 'afib'
  | 'shock'
  | 'reinflation'
  | 'stiff'
  | 'artifact';

interface BpPreset {
  id: BpPresetId;
  label: string;
  trueSbp: number;
  trueDbp: number;
  note: string;
}

const BP_PRESETS: BpPreset[] = [
  {
    id: 'normal',
    label: 'Normotansif (120/80)',
    trueSbp: 120,
    trueDbp: 80,
    note: 'Osilometrik algoritmaların kalibre edildiği en yüksek doğruluk aralığıdır (ortalama hata ±5 mmHg).',
  },
  {
    id: 'hypotension',
    label: 'Şiddetli Hipotansiyon (72/44)',
    trueSbp: 72,
    trueDbp: 44,
    note: 'Kritik tuzak: Osilometrik NIBP düşük basınçlarda (MAP <60 mmHg) gerçek basıncı sistematik olarak +8 ila +15 mmHg YÜKSEK (overestimate) gösterme eğilimindedir!',
  },
  {
    id: 'hypertension',
    label: 'Hipertansif Kriz (195/112)',
    trueSbp: 195,
    trueDbp: 112,
    note: 'Aşırı yüksek basınçlarda osilometrik NIBP gerçek SBP’yi 10–15 mmHg DÜŞÜK (underestimate) gösterebilir ve sıklıkla yeniden şişirme (re-inflation) gerektirir.',
  },
  {
    id: 'wide-pp',
    label: 'Geniş Nabız Basıncı / AY (150/50)',
    trueSbp: 150,
    trueDbp: 50,
    note: 'Aort yetmezliği veya ileri arteriyel sertlikte genişleyen osilasyon zarfı nedeniyle DBP güvenilirliği düşer; MAP hâlâ en güvenilir parametredir.',
  },
];

interface CuffFitConfig {
  id: CuffFitId;
  label: string;
  ratioText: string;
  sbpDelta: number;
  dbpDelta: number;
  widthPx: number;
  status: 'normal' | 'high' | 'low';
  explanation: string;
}

const CUFF_FITS: CuffFitConfig[] = [
  {
    id: 'narrow',
    label: 'Çok Dar (Küçük Manşon)',
    ratioText: 'En < %30 kol çevresi',
    sbpDelta: 18,
    dbpDelta: 12,
    widthPx: 34,
    status: 'high',
    explanation:
      'Dar kese arteriyel basıncı yumuşak dokudan tam iletemez; arteri kapatmak için daha fazla manşon basıncı gerekir → YALANCI YÜKSEK (+10 ila +30 mmHg).',
  },
  {
    id: 'ideal',
    label: 'İdeal Boyut (%40 / %80)',
    ratioText: 'En %40 · Boy %80',
    sbpDelta: 0,
    dbpDelta: 0,
    widthPx: 62,
    status: 'normal',
    explanation:
      'Kese genişliği kol çevresinin %40’ı (çapın 1.2 katı), uzunluğu ise %80’idir. Manşon basıncı brakiyal artere kayıpsız ve homojen iletilir.',
  },
  {
    id: 'wide',
    label: 'Çok Geniş (Büyük Manşon)',
    ratioText: 'En > %50 kol çevresi',
    sbpDelta: -12,
    dbpDelta: -8,
    widthPx: 90,
    status: 'low',
    explanation:
      'Aşırı geniş kese daha düşük basınçta arteri erken kollabe eder → YALANCI DÜŞÜK (-5 ila -15 mmHg). Ancak hata büyüklüğü dar manşona kıyasla daha azdır.',
  },
  {
    id: 'loose',
    label: 'Gevşek / Balonlaşan Sarım',
    ratioText: 'Manşon-cilt boşluğu',
    sbpDelta: 14,
    dbpDelta: 10,
    widthPx: 54,
    status: 'high',
    explanation:
      'Gevşek sarılan kese şişerken merkezde balonlaşır (efektif temas genişliği daralır) → dar manşon etkisi yaratır ve YALANCI YÜKSEK okur.',
  },
];

interface NibpPattern {
  id: NibpPatternId;
  label: string;
  badge: string;
  sbp: string;
  dbp: string;
  map: string;
  cycleSec: string;
  status: 'normal' | 'warning' | 'critical';
  statusText: string;
  /** Heights of 14 discrete oscillation pulses across deflation steps (0..62 px) */
  pulses: number[];
  /** Staircase cuff pressure y-values (SVG y: 24 = 220 mmHg, 168 = 40 mmHg) */
  cuffSteps: number[];
  sbpIdx: number;
  mapIdx: number;
  dbpIdx: number;
  morphology: string;
  causes: string[];
  action: string;
}

const NIBP_PATTERNS: NibpPattern[] = [
  {
    id: 'normal',
    label: 'Normal Osilometrik Zarf (Sinüs)',
    badge: 'Referans',
    sbp: '122',
    dbp: '78',
    map: '93',
    cycleSec: '26 sn',
    status: 'normal',
    statusText: 'Simetrik Çan Zarfı · Net Amax (MAP)',
    pulses: [4, 7, 14, 24, 34, 46, 56, 60, 52, 42, 30, 19, 11, 6],
    cuffSteps: [48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152],
    sbpIdx: 4,
    mapIdx: 7,
    dbpIdx: 10,
    morphology:
      'Düzenli basamaklı deflasyonda osilasyonlar pürüzsüz artar, tek keskin bir tepe (Amax = MAP 93 mmHg) oluşturur ve düzenli azalır. SBP (~0.5×Amax) ve DBP (~0.75×Amax) net hesaplanır.',
    causes: [
      'Düzenli sinüs ritmi, hareketsiz ekstremite ve uygun manşon boyutu',
      'Sağlıklı arteriyel duvar kompliyansı ve normal kalp debisi',
    ],
    action:
      'Güvenilir bazal referans kabul edilir; rutin vakalarda 3–5 dk aralıklarla trend takibi sürdürülür.',
  },
  {
    id: 'afib',
    label: 'Atriyal Fibrilasyon / Düzensiz Vuru',
    badge: 'Aritmi',
    sbp: '114?',
    dbp: '74?',
    map: '89',
    cycleSec: '52 sn',
    status: 'warning',
    statusText: 'Çentikli / Değişken Zarf · Uzamış Ölçüm',
    pulses: [5, 11, 7, 29, 18, 48, 31, 56, 36, 49, 21, 32, 12, 7],
    cuffSteps: [46, 54, 62, 70, 78, 86, 94, 102, 110, 118, 126, 134, 142, 150],
    sbpIdx: 3,
    mapIdx: 7,
    dbpIdx: 10,
    morphology:
      'Vurudan vuruya değişen diyastolik doluş ve atım hacmi nedeniyle komşu basamaklarda tutarsız osilasyon yükseklikleri (çentikli, çok tepeli zarf) oluşur. Cihaz her basamakta beklediği için ölçüm süresi 2 katına çıkar.',
    causes: [
      'Hızlı ventrikül yanıtlı atriyal fibrilasyon (AF)',
      'Sık ventriküler ekstrasistol (VES / bigemini) veya ciddi sinüs aritmisi',
    ],
    action:
      'Tek ölçüm yerine ardışık 2–3 ölçümün ortalamasına ve özellikle MAP değerine güvenin; hemodinami unstabilse invaziv arteriyel kateterizasyona (IBP) geçin.',
  },
  {
    id: 'shock',
    label: 'Şiddetli Hipotansiyon / Şok',
    badge: 'Aşırı Tahmin!',
    sbp: '84*',
    dbp: '52*',
    map: '62*',
    cycleSec: '48 sn',
    status: 'critical',
    statusText: 'Düşük Genlikli Düz Zarf · Gerçek BP Daha Düşük!',
    pulses: [2, 3, 4, 5, 7, 9, 12, 16, 19, 21, 18, 14, 10, 7],
    cuffSteps: [64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 166],
    sbpIdx: 6,
    mapIdx: 9,
    dbpIdx: 12,
    morphology:
      'Düşük nabız basıncı ve yoğun vazokonstriksiyon nedeniyle arteriyel osilasyonlar çok zayıf ve basıktır (Amax silik). Algoritma gürültü tabanının üstünde tepe ararken MAP ve SBP’yi gerçek invaziv değerden +8 ila +15 mmHg YÜKSEK (ör. gerçek 70/42, MAP 51 iken) raporlayabilir.',
    causes: [
      'Masif kanama, septik/kardiyojenik/anafilaktik şok',
      'Yüksek doz vazopresör infüzyonu altında periferik vazokonstriksiyon',
    ],
    action:
      'NIBP "62 MAP" dese bile klinik perfüzyonu (SpO₂ pletismografi genliği, EtCO₂ düşüşü, kapiller dolum) kontrol edin; gecikmeden invaziv arter hattı (IBP) açın!',
  },
  {
    id: 'reinflation',
    label: 'Hipertansif Kriz & Yeniden Şişirme',
    badge: 'Re-Inflation',
    sbp: '204',
    dbp: '114',
    map: '144',
    cycleSec: '58 sn',
    status: 'warning',
    statusText: 'İlk Şişirme Yetersiz → 240 mmHg’ye Çıkış',
    pulses: [34, 42, 4, 7, 16, 28, 44, 56, 58, 48, 36, 24, 14, 8],
    cuffSteps: [62, 70, 26, 34, 42, 50, 58, 66, 74, 82, 90, 98, 106, 114],
    sbpIdx: 5,
    mapIdx: 8,
    dbpIdx: 11,
    morphology:
      'İlk şişirme basıncı (160–170 mmHg) hastanın gerçek SBP’sinin altında kalınca monitör hemen yüksek osilasyon algılar, deflasyonu kesip 230–250 mmHg’ye yeniden şişirir. Ölçüm uzar ve uyanık hastada ağrıya yol açar.',
    causes: [
      'Laringoskopi / entübasyon yanıtı, yetersiz analjezi-anestezi derinliği',
      'Kontrolsüz hipertansiyon, feokromositoma, turnike ağrısı veya hipertansif kriz',
    ],
    action:
      'Anestezi derinliği/analjeziyi hızla değerlendirin; tekrarlayan krizlerde NIBP gerçek SBP’yi 10–15 mmHg eksik okuyabileceği için titre edilebilir IV antihipertansif ve gerekirse IBP düşünün.',
  },
  {
    id: 'stiff',
    label: 'Arteriyel Sertlik / Geniş Nabız Basıncı',
    badge: 'Kalsifik Damar',
    sbp: '168',
    dbp: '64',
    map: '98',
    cycleSec: '34 sn',
    status: 'warning',
    statusText: 'Geniş Plato Zarfı · SBP/DBP Sapma Riski',
    pulses: [5, 10, 22, 36, 46, 52, 55, 56, 54, 50, 42, 32, 20, 11],
    cuffSteps: [34, 44, 54, 64, 74, 84, 94, 104, 114, 124, 134, 144, 154, 162],
    sbpIdx: 2,
    mapIdx: 7,
    dbpIdx: 11,
    morphology:
      'Kompliyansı azalmış kalsifik arter duvarı keskin bir transmural rezonans tepe noktası vermez; zarf geniş ve yayvan bir plato çizer. DBP ve SBP oran sabitleri kayabilir (pseudohipertansiyon / Osler fenomeni).',
    causes: [
      'İleri yaş, kronik böbrek yetmezliği (medial kalsifikasyon / Mönckeberg)',
      'Aort yetmezliği (geniş nabız basıncı), ciddi ateroskleroz',
    ],
    action:
      'SBP’den çok MAP trendini izleyin; olağandışı yüksek NIBP’ye rağmen organ hipoperfüzyonu varsa (ya da tam tersi) kontralateral ölçüm veya IBP ile doğrulayın.',
  },
  {
    id: 'artifact',
    label: 'Hareket / Titreme / Dış Bası Artefaktı',
    badge: 'Artefakt',
    sbp: '166?!',
    dbp: '98?!',
    map: '124?!',
    cycleSec: '64 sn (Hata)',
    status: 'critical',
    statusText: 'Dış Basınç Pikleri · Sahte Tepe (Yalancı Yüksek)',
    pulses: [6, 9, 54, 16, 61, 22, 34, 44, 59, 28, 48, 15, 38, 10],
    cuffSteps: [44, 52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140, 148],
    sbpIdx: 2,
    mapIdx: 4,
    dbpIdx: 8,
    morphology:
      'Cerrahi ekibin kola yaslanması, hastanın titremesi veya masa hareketi manşon içinde ani, düzensiz basınç sıçramaları yaratır. Monitör bu sahte pikleri erken Amax sanarak yalancı yüksek değer verir veya zaman aşımına düşer.',
    causes: [
      'Cerrah veya asistanın manşonlu kola yaslanması (en sık intraop neden!)',
      'Uyanma/rejyonel anestezide üşüme titremesi (shivering), Parkinson tremoru, helikopter/ambulans vibrasyonu',
    ],
    action:
      'Kolu koruyucu kol tahtası/siperlik ile izole edin; cerrahi ekibi uyarın; titremeyi aktif ısıtma ile tedavi edin ve ölçümü hareketsiz ortamda tekrarlayın.',
  },
];

interface CuffSizeRow {
  group: string;
  armCirc: string;
  bladderWidth: string;
  bladderLength: string;
  initialInflate: string;
}

const CUFF_SIZE_TABLE: CuffSizeRow[] = [
  { group: 'Yenidoğan (No. 1–4)', armCirc: '3–13 cm', bladderWidth: '2.5–5 cm', bladderLength: '5–10 cm', initialInflate: '100–110 mmHg' },
  { group: 'İnfant', armCirc: '10–19 cm', bladderWidth: '6–7 cm', bladderLength: '12–15 cm', initialInflate: '120 mmHg' },
  { group: 'Pediatrik (Çocuk)', armCirc: '18–26 cm', bladderWidth: '8–10 cm', bladderLength: '16–21 cm', initialInflate: '130–140 mmHg' },
  { group: 'Küçük Erişkin', armCirc: '22–26 cm', bladderWidth: '10 cm', bladderLength: '22–24 cm', initialInflate: '160 mmHg' },
  { group: 'Standart Erişkin', armCirc: '27–34 cm', bladderWidth: '12–13 cm', bladderLength: '27–30 cm', initialInflate: '160–180 mmHg' },
  { group: 'Büyük Erişkin (Obez)', armCirc: '35–44 cm', bladderWidth: '16 cm', bladderLength: '32–38 cm', initialInflate: '180 mmHg' },
  { group: 'Uyluk (Thigh)', armCirc: '45–52 cm', bladderWidth: '18–20 cm', bladderLength: '38–42 cm', initialInflate: '180–200 mmHg' },
];

export const NibpMonitoringModule: React.FC<NibpMonitoringModuleProps> = ({ isDark }) => {
  const [bpPresetId, setBpPresetId] = useState<BpPresetId>('normal');
  const [cuffFitId, setCuffFitId] = useState<CuffFitId>('ideal');
  const [heightOffsetCm, setHeightOffsetCm] = useState<number>(0); // negative = above heart, positive = below heart
  const [activePatternId, setActivePatternId] = useState<NibpPatternId>('normal');

  const bpPreset = BP_PRESETS.find((p) => p.id === bpPresetId) ?? BP_PRESETS[0];
  const cuffFit = CUFF_FITS.find((c) => c.id === cuffFitId) ?? CUFF_FITS[1];
  const activePattern = NIBP_PATTERNS.find((p) => p.id === activePatternId) ?? NIBP_PATTERNS[0];

  // Physics calculations for Section 1 simulator
  const trueMap = Math.round(bpPreset.trueDbp + (bpPreset.trueSbp - bpPreset.trueDbp) / 3);
  // Hydrostatic offset: +0.736 mmHg per cm BELOW heart, -0.736 mmHg per cm ABOVE heart
  const hydrostaticDelta = Math.round(heightOffsetCm * 0.736);
  // Extremes algorithm bias: hypotension slightly overestimates, severe hypertension slightly underestimates
  const algoSbpBias =
    bpPreset.id === 'hypotension' ? 11 : bpPreset.id === 'hypertension' ? -12 : bpPreset.id === 'wide-pp' ? -4 : 0;
  const algoDbpBias =
    bpPreset.id === 'hypotension' ? 8 : bpPreset.id === 'hypertension' ? -6 : bpPreset.id === 'wide-pp' ? 6 : 0;

  const measuredSbp = Math.max(35, bpPreset.trueSbp + cuffFit.sbpDelta + hydrostaticDelta + algoSbpBias);
  const measuredDbp = Math.max(20, bpPreset.trueDbp + cuffFit.dbpDelta + hydrostaticDelta + algoDbpBias);
  const measuredMap = Math.round(measuredDbp + (measuredSbp - measuredDbp) / 3);
  const mapError = measuredMap - trueMap;

  const cardSurface = isDark
    ? 'bg-slate-900/90 border-slate-800'
    : 'bg-white border-slate-200';
  const mutedSurface = isDark
    ? 'bg-slate-800/60 border-slate-700/80'
    : 'bg-slate-50 border-slate-200/80';
  const headingColor = isDark ? 'text-white' : 'text-slate-900';
  const bodyColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const subtleColor = isDark ? 'text-slate-400' : 'text-slate-500';

  // Helper to build SVG path for oscillation envelope in Section 4
  const envelopePoints = activePattern.pulses
    .map((h, i) => {
      const x = 44 + i * 34;
      const y = 178 - h * 1.15;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
    })
    .join(' ');

  const staircasePath = activePattern.cuffSteps
    .map((y, i) => {
      const x1 = 30 + i * 34;
      const x2 = x1 + 34;
      return `${i === 0 ? `M ${x1} ${y}` : `L ${x1} ${y}`} L ${x2} ${y}`;
    })
    .join(' ');

  return (
    <div className="space-y-6">
      {/* Header Summary Banner */}
      <div className={`rounded-2xl border p-5 sm:p-6 ${cardSurface}`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className={`flex flex-wrap items-center gap-2 text-xs font-medium ${subtleColor}`}>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">Hemodinamik Monitörizasyon</span>
              <span aria-hidden="true">·</span>
              <span>Osilometrik Yöntem</span>
              <span aria-hidden="true">·</span>
              <span>6 Bölümlü Sistematik İnceleme</span>
            </div>
            <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${headingColor}`}>
              NIBP (Osilometrik Non-İnvaziv Kan Basıncı Monitörizasyonu)
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
              Modern ameliyathanelerde standart dolaşım monitörü olan osilometrik NIBP, manşon deflasyonu sırasında arteriyel duvar
              salınımlarının tepe noktasından <strong>MAP’ı doğrudan ölçer</strong>; SBP ve DBP’yi ise üretici algoritmalarıyla hesaplar.
              Doğru manşon geometrisi, kalp seviyesi hizalaması ve şok/aritmi sınırlarını bilmek perioperatif organ perfüzyonu için kritiktir.
            </p>
          </div>

          {/* 4-Metric Quick Reference Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 shrink-0">
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Doğrudan Ölçüm</div>
              <div className="text-sm font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
                MAP (Amax)
              </div>
              <div className={`text-[10px] ${subtleColor}`}>SBP/DBP hesaplanır</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Manşon Kuralı</div>
              <div className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                %40 × %80
              </div>
              <div className={`text-[10px] ${subtleColor}`}>En / Boy · Kol çevresi</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>ASA Standart II</div>
              <div className="text-sm font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400">
                ≤ 5 dk
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Hedef MAP ≥65</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Hidrostatik Hata</div>
              <div className="text-sm font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                7.4 mmHg
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Her 10 cm yükseklik</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BÖLÜM 1: FİZİKSEL PRENSİP VE ÇALIŞMA MEKANİZMASI                      */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            1
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Osilometri, Korotkoff seslerini dinlemez; arter duvarının <strong>sıfır transmural basınçta</strong> (
              <span className="font-mono">Ptm = Parter − Pmanşon = 0</span>) ulaştığı maksimum duvar kompliyansını ve
              bunun manşon havasında oluşturduğu basınç salınımlarını (<strong>osilasyon zarfı / OMWE</strong>) piezoelektrik sensörle okur.
            </p>
          </div>
        </div>

        {/* Visual 1A: Transmural Pressure & Oscillometric Envelope SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-indigo-500" />
              <span className={`text-xs font-bold ${headingColor}`}>
                Biyofizik Şema: Transmural Basınç (Ptm) ve Osilometrik Zarf (OMWE)
              </span>
            </div>
            <span className={`text-[11px] font-mono ${subtleColor}`}>
              MAP = Maks. Osilasyon (Amax) · SBP ≈ %45–55 · DBP ≈ %70–85
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 275"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Osilometrik kan basıncı biyofiziği ve transmural basınç diyagramı"
            >
              {/* Left Panel: 3 Artery Cross-Section States */}
              <rect
                x="10"
                y="10"
                width="320"
                height="255"
                rx="12"
                fill={isDark ? '#0f172a' : '#ffffff'}
                stroke={isDark ? '#1e293b' : '#e2e8f0'}
              />
              <text x="26" y="32" fontSize="11" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>
                Arter Duvar Kompliyansı & Transmural Basınç
              </text>

              {/* State 1: Suprasytsolic */}
              <g transform="translate(24, 46)">
                <rect
                  x="0"
                  y="0"
                  width="292"
                  height="64"
                  rx="8"
                  fill={isDark ? '#1e293b' : '#f8fafc'}
                  stroke={isDark ? '#334155' : '#e2e8f0'}
                />
                {/* Collapsed artery */}
                <ellipse cx="44" cy="32" rx="22" ry="5" fill="#f43f5e" fillOpacity="0.25" stroke="#f43f5e" strokeWidth="2.2" />
                <path d="M 44 8 L 44 21 M 39 16 L 44 21 L 49 16" stroke="#6366f1" strokeWidth="1.8" fill="none" />
                <path d="M 44 56 L 44 43 M 39 48 L 44 43 L 49 48" stroke="#6366f1" strokeWidth="1.8" fill="none" />
                <text x="80" y="21" fontSize="11" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                  1. Suprasistolik (Pmanşon &gt; SBP)
                </text>
                <text x="80" y="37" fontSize="10" fill={isDark ? '#94a3b8' : '#475569'}>
                  Arter tam kollabe (Ptm &lt; 0). Akım yok;
                </text>
                <text x="80" y="51" fontSize="10" fill={isDark ? '#94a3b8' : '#475569'}>
                  yalnızca proksimal çarpma (küçük osilasyon).
                </text>
              </g>

              {/* State 2: MAP (Zero transmural pressure) */}
              <g transform="translate(24, 120)">
                <rect
                  x="0"
                  y="0"
                  width="292"
                  height="68"
                  rx="8"
                  fill={isDark ? '#312e81' : '#eef2ff'}
                  fillOpacity={isDark ? '0.35' : '1'}
                  stroke="#6366f1"
                  strokeWidth="1.5"
                />
                {/* Pulsing compliant artery */}
                <circle cx="44" cy="34" r="19" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="44" cy="34" r="13" fill="#6366f1" fillOpacity="0.25" stroke="#6366f1" strokeWidth="2.5" />
                <text x="44" y="38" textAnchor="middle" fontSize="9" fontWeight="700" fill={isDark ? '#e0e7ff' : '#312e81'}>
                  Ptm=0
                </text>
                <text x="80" y="21" fontSize="11" fontWeight="700" fill={isDark ? '#c7d2fe' : '#312e81'}>
                  2. MAP Noktası (Pmanşon = MAP) ★
                </text>
                <text x="80" y="37" fontSize="10" fill={isDark ? '#e2e8f0' : '#334155'}>
                  İç ve dış basınç eşit → duvar gerilimi SIFIR.
                </text>
                <text x="80" y="52" fontSize="10" fontWeight="700" fill={isDark ? '#818cf8' : '#4338ca'}>
                  Maksimum kompliyans = MAKSİMUM osilasyon!
                </text>
              </g>

              {/* State 3: Subdiastolic */}
              <g transform="translate(24, 198)">
                <rect
                  x="0"
                  y="0"
                  width="292"
                  height="56"
                  rx="8"
                  fill={isDark ? '#1e293b' : '#f8fafc'}
                  stroke={isDark ? '#334155' : '#e2e8f0'}
                />
                <circle cx="44" cy="28" r="15" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2.2" />
                <text x="80" y="21" fontSize="11" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                  3. Subdiyastolik (Pmanşon &lt; DBP)
                </text>
                <text x="80" y="37" fontSize="10" fill={isDark ? '#94a3b8' : '#475569'}>
                  Arter tüm siklusta açık ve gergin (Ptm &gt; 0).
                </text>
                <text x="80" y="50" fontSize="10" fill={isDark ? '#94a3b8' : '#475569'}>
                  Duvar hacim değişimi küçülür → osilasyon söner.
                </text>
              </g>

              {/* Right Panel: Synchronized Deflation Curve + Oscillation Envelope */}
              <rect
                x="346"
                y="10"
                width="524"
                height="255"
                rx="12"
                fill="#0b1120"
                stroke={isDark ? '#334155' : '#cbd5e1'}
              />
              <text x="364" y="32" fontSize="11" fontWeight="700" fill="#e2e8f0">
                Basamaklı Deflasyon Eğrisi & Osilasyon Zarfı (Algoritma Çözümlemesi)
              </text>
              <text x="854" y="32" textAnchor="end" fontSize="10" fontFamily="monospace" fill="#94a3b8">
                ΔP adım ≈ 6–8 mmHg
              </text>

              {/* Subtle grid */}
              {[56, 92, 128, 164, 200, 236].map((gy) => (
                <line key={gy} x1="378" y1={gy} x2="852" y2={gy} stroke="#1e293b" strokeWidth="1" />
              ))}

              {/* Y-axis labels */}
              <text x="372" y="59" textAnchor="end" fontSize="9" fontFamily="monospace" fill="#64748b">180</text>
              <text x="372" y="95" textAnchor="end" fontSize="9" fontFamily="monospace" fill="#64748b">120</text>
              <text x="372" y="131" textAnchor="end" fontSize="9" fontFamily="monospace" fill="#64748b">80</text>
              <text x="372" y="167" textAnchor="end" fontSize="9" fontFamily="monospace" fill="#64748b">40</text>

              {/* Vertical reference markers for SBP, MAP, DBP */}
              <line x1="518" y1="46" x2="518" y2="244" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4 3" />
              <line x1="628" y1="46" x2="628" y2="244" stroke="#818cf8" strokeWidth="1.8" strokeDasharray="4 3" />
              <line x1="734" y1="46" x2="734" y2="244" stroke="#34d399" strokeWidth="1.2" strokeDasharray="4 3" />

              {/* Cuff deflation staircase */}
              <path
                d="M 384 52 L 420 52 L 420 64 L 456 64 L 456 76 L 492 76 L 492 88 L 528 88 L 528 100 L 564 100 L 564 112 L 600 112 L 600 124 L 636 124 L 636 136 L 672 136 L 672 148 L 708 148 L 708 160 L 744 160 L 744 170 L 780 170 L 780 178 L 844 178"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
              />
              <text x="392" y="48" fontSize="9.5" fontFamily="monospace" fill="#94a3b8">
                Pmanşon (mmHg)
              </text>

              {/* Dots on staircase at SBP, MAP, DBP */}
              <circle cx="518" cy="88" r="4.5" fill="#38bdf8" />
              <circle cx="628" cy="124" r="5.5" fill="#818cf8" />
              <circle cx="734" cy="160" r="4.5" fill="#34d399" />

              {/* Isolated Oscillation Pulses (bottom band y=240 baseline) */}
              {[
                { x: 402, h: 4 },
                { x: 438, h: 7 },
                { x: 474, h: 15 },
                { x: 518, h: 28 }, // SBP ~50% Amax
                { x: 554, h: 41 },
                { x: 590, h: 52 },
                { x: 628, h: 58 }, // MAP = Amax
                { x: 664, h: 51 },
                { x: 700, h: 44 },
                { x: 734, h: 36 }, // DBP ~70-80% Amax
                { x: 770, h: 20 },
                { x: 806, h: 10 },
                { x: 836, h: 5 },
              ].map((bar, idx) => (
                <line
                  key={idx}
                  x1={bar.x}
                  y1={240}
                  x2={bar.x}
                  y2={240 - bar.h}
                  stroke={idx === 6 ? '#818cf8' : idx === 3 ? '#38bdf8' : idx === 9 ? '#34d399' : '#475569'}
                  strokeWidth={idx === 6 ? '4' : '3'}
                  strokeLinecap="round"
                />
              ))}

              {/* Smooth Envelope Curve */}
              <path
                d="M 402 236 Q 470 232, 518 212 Q 576 184, 628 182 Q 684 184, 734 204 Q 786 226, 836 235"
                fill="none"
                stroke="#a5b4fc"
                strokeWidth="2.2"
              />

              {/* Callout boxes */}
              <rect x="466" y="54" width="98" height="22" rx="4" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
              <text x="515" y="68" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#bae6fd">
                SBP (≈0.50 Amax)
              </text>

              <rect x="572" y="92" width="112" height="22" rx="4" fill="#312e81" stroke="#818cf8" strokeWidth="1.2" />
              <text x="628" y="106" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#e0e7ff">
                MAP = Amax (Ölçülen)
              </text>

              <rect x="686" y="128" width="98" height="22" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
              <text x="735" y="142" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#a7f3d0">
                DBP (≈0.75 Amax)
              </text>

              <text x="615" y="258" textAnchor="middle" fontSize="9.5" fontFamily="monospace" fill="#94a3b8">
                Zaman (Deflasyon Siklusu: ~20–40 sn) →
              </text>
            </svg>
          </div>
        </div>

        {/* Visual 1B: Interactive Cuff Size & Hydrostatic Level Error Simulator */}
        <div className={`rounded-xl border p-4 space-y-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-500" />
              <span className={`text-xs sm:text-sm font-bold ${headingColor}`}>
                İnteraktif Simülatör: Manşon Uyumu, Kol Seviyesi (Hidrostatik Hata) & Şok Sapması
              </span>
            </div>
            <span className={`text-[11px] font-mono tabular-nums ${subtleColor}`}>
              ΔP = Δh(cm) × 0.736 mmHg/cm
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-4">
              {/* True BP Preset */}
              <div>
                <div className={`text-[11px] font-semibold mb-1.5 ${subtleColor}`}>
                  1. Hastanın Gerçek İnvaziv Kan Basıncı Senaryosu
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {BP_PRESETS.map((preset) => {
                    const active = bpPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setBpPresetId(preset.id)}
                        className={`px-3 py-2 rounded-lg border text-left text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500/50'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-400'
                        }`}
                      >
                        <div className="font-mono tabular-nums font-bold">{preset.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cuff Fit Selector */}
              <div>
                <div className={`text-[11px] font-semibold mb-1.5 ${subtleColor}`}>
                  2. Manşon Boyutu & Sarım Kalitesi
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {CUFF_FITS.map((fit) => {
                    const active = cuffFitId === fit.id;
                    return (
                      <button
                        key={fit.id}
                        type="button"
                        onClick={() => setCuffFitId(fit.id)}
                        className={`px-3 py-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                          active
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500/50'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-400'
                        }`}
                      >
                        <div className="font-bold">{fit.label}</div>
                        <div className={`text-[10px] font-mono ${active ? 'text-indigo-100' : subtleColor}`}>
                          {fit.ratioText}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Arm Height Slider */}
              <div className={`p-3 rounded-xl border ${cardSurface}`}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`font-semibold ${headingColor}`}>
                    3. Manşonun Kalp (Flebostatik Eksen) Seviyesine Göre Konumu
                  </span>
                  <span className="font-mono tabular-nums font-bold text-indigo-600 dark:text-indigo-400">
                    {heightOffsetCm === 0
                      ? '0 cm (Kalp Seviyesi)'
                      : heightOffsetCm < 0
                        ? `${Math.abs(heightOffsetCm)} cm ÜSTÜNDE (${hydrostaticDelta} mmHg)`
                        : `${heightOffsetCm} cm ALTINDA (+${hydrostaticDelta} mmHg)`}
                  </span>
                </div>
                <input
                  type="range"
                  min={-30}
                  max={30}
                  step={5}
                  value={heightOffsetCm}
                  onChange={(e) => setHeightOffsetCm(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                  aria-label="Manşonun kalp seviyesine göre yüksekliği"
                />
                <div className={`flex justify-between text-[10px] font-mono mt-1 ${subtleColor}`}>
                  <span>-30 cm (Kalp Üstü / Y. Düşük)</span>
                  <span>0 cm (İdeal)</span>
                  <span>+30 cm (Sarkık Kol / Y. Yüksek)</span>
                </div>
              </div>
            </div>

            {/* Right Live Readout & Arm/Heart SVG */}
            <div className="lg:col-span-5 rounded-xl border bg-slate-950 border-slate-800 p-4 flex flex-col justify-between space-y-3 text-slate-100">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>GERÇEK IBP vs OKUNAN NIBP</span>
                <span
                  className={`font-bold ${
                    Math.abs(mapError) <= 5
                      ? 'text-emerald-400'
                      : mapError > 5
                        ? 'text-rose-400'
                        : 'text-amber-400'
                  }`}
                >
                  {Math.abs(mapError) <= 5
                    ? 'DOĞRU ARALIK'
                    : mapError > 5
                      ? `YALANCI YÜKSEK (+${mapError} MAP)`
                      : `YALANCI DÜŞÜK (${mapError} MAP)`}
                </span>
              </div>

              {/* Compact SVG showing Heart Level vs Cuff Level */}
              <svg viewBox="0 0 320 118" className="w-full h-auto rounded-lg bg-slate-900/90 border border-slate-800">
                {/* Phlebostatic reference line */}
                <line x1="16" y1="58" x2="304" y2="58" stroke="#334155" strokeDasharray="4 4" strokeWidth="1.2" />
                <text x="20" y="52" fontSize="9" fontFamily="monospace" fill="#94a3b8">
                  Flebostatik Eksen (Sağ Atriyum)
                </text>
                {/* Heart icon circle */}
                <circle cx="72" cy="58" r="14" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1.8" />
                <text x="72" y="61" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fda4af">
                  KALP
                </text>

                {/* Cuff & Arm shifted by heightOffsetCm */}
                <g transform={`translate(0, ${heightOffsetCm * 1.1})`}>
                  {/* Arm cylinder */}
                  <rect x="165" y="47" width="120" height="22" rx="11" fill="#334155" stroke="#64748b" strokeWidth="1.2" />
                  {/* Cuff wrap scaled by widthPx */}
                  <rect
                    x={225 - cuffFit.widthPx / 2}
                    y="42"
                    width={cuffFit.widthPx}
                    height="32"
                    rx="5"
                    fill="#4f46e5"
                    fillOpacity="0.75"
                    stroke="#a5b4fc"
                    strokeWidth="1.6"
                  />
                  <text x="225" y="61" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff">
                    MANŞON
                  </text>
                </g>

                {/* Vertical arrow if offset != 0 */}
                {heightOffsetCm !== 0 && (
                  <g>
                    <line
                      x1="145"
                      y1="58"
                      x2="145"
                      y2={58 + heightOffsetCm * 1.1}
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                    <text
                      x="139"
                      y={58 + heightOffsetCm * 0.55 + 3}
                      textAnchor="end"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="700"
                      fill="#fbbf24"
                    >
                      {heightOffsetCm > 0 ? `+${heightOffsetCm}` : heightOffsetCm} cm
                    </text>
                  </g>
                )}
              </svg>

              {/* Side-by-side numeric monitor */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">Gerçek Arter (IBP)</div>
                  <div className="text-xl font-bold font-mono tabular-nums text-emerald-400 mt-0.5">
                    {bpPreset.trueSbp}/{bpPreset.trueDbp}
                  </div>
                  <div className="text-xs font-mono tabular-nums text-slate-300">
                    MAP: <strong>{trueMap}</strong> mmHg
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-indigo-500/40">
                  <div className="text-[10px] font-mono text-indigo-300">Monitör NIBP</div>
                  <div
                    className={`text-xl font-bold font-mono tabular-nums mt-0.5 ${
                      Math.abs(mapError) <= 5
                        ? 'text-indigo-300'
                        : mapError > 5
                          ? 'text-rose-400'
                          : 'text-amber-400'
                    }`}
                  >
                    {measuredSbp}/{measuredDbp}
                  </div>
                  <div className="text-xs font-mono tabular-nums text-slate-300">
                    MAP: <strong>{measuredMap}</strong> mmHg
                  </div>
                </div>
              </div>

              <div className="text-[11px] leading-relaxed text-slate-300 border-t border-slate-800 pt-2.5 space-y-1">
                <div>{cuffFit.explanation}</div>
                <div className="text-indigo-300">{bpPreset.note}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: ENDİKASYONLAR VE KLİNİK AMAÇ                                 */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            2
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Endikasyonlar ve Klinik Amaç
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              ASA Standart II uyarınca genel, rejyonel ve monitörize anestezi bakımı (MAC) alan <strong>tüm hastalarda</strong> kan
              basıncı en az <strong>5 dakikada bir</strong> ölçülmelidir. Temel amaç, uç organ perfüzyonunu (beyin, böbrek, miyokard)
              korumak ve intraoperatif hipotansiyonu (IOH) erken yakalamaktır.
            </p>
          </div>
        </div>

        {/* Visual 2: 4-Panel Clinical Indications & IBP Escalation SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 185"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="NIBP klinik hedefleri ve invaziv arter geçiş eşikleri"
            >
              {/* Panel 1 */}
              <g transform="translate(8, 8)">
                <rect width="206" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="26" fontSize="11" fontWeight="700" fill="#6366f1">1. Organ Perfüzyon Penceresi</text>
                {/* Autoregulation bar */}
                <rect x="14" y="42" width="178" height="18" rx="4" fill={isDark ? '#1e293b' : '#f1f5f9'} />
                <rect x="14" y="42" width="52" height="18" rx="4" fill="#f43f5e" fillOpacity="0.4" />
                <rect x="66" y="42" width="84" height="18" fill="#10b981" fillOpacity="0.45" />
                <rect x="150" y="42" width="42" height="18" rx="4" fill="#f59e0b" fillOpacity="0.4" />
                <text x="40" y="54" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill={isDark ? '#fda4af' : '#9f1239'}>&lt;65</text>
                <text x="108" y="54" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill={isDark ? '#a7f3d0' : '#065f46'}>MAP 65–100</text>
                <text x="171" y="54" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill={isDark ? '#fde68a' : '#92400e'}>&gt;110</text>
                <text x="14" y="80" fontSize="10" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>IOH Eşiği: MAP &lt;65 mmHg</text>
                <text x="14" y="96" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>1–5 dk bile MAP &lt;65 kalması</text>
                <text x="14" y="110" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>postop AKI ve MINS riskini</text>
                <text x="14" y="124" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>anlamlı artırır (POQI).</text>
                <text x="14" y="152" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">Hedef: Bazal ±%20 / ≥65</text>
              </g>

              {/* Panel 2 */}
              <g transform="translate(226, 8)">
                <rect width="206" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="26" fontSize="11" fontWeight="700" fill="#0ea5e9">2. Parametre Klinik Anlamı</text>
                <text x="14" y="50" fontSize="10" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>MAP (En Doğru Değer)</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>Doku perfüzyon basıncı (CO×SVR).</text>
                <text x="14" y="88" fontSize="10" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>SBP & Nabız Basıncı (PP)</text>
                <text x="14" y="102" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>Dar PP: Hipovolemi / tamponad.</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>Geniş PP: Sepsis, AY, sert damar.</text>
                <text x="14" y="140" fontSize="10" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>DBP (Koroner Perfüzyon)</text>
                <text x="14" y="154" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>CPP = DBP − LVEDP (diyastolde).</text>
              </g>

              {/* Panel 3 */}
              <g transform="translate(444, 8)">
                <rect width="206" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="26" fontSize="11" fontWeight="700" fill="#f59e0b">3. Ölçüm Sıklığı Stratejisi</text>
                <text x="14" y="50" fontSize="10" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>İndüksiyon / Spinal Blok:</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>1–2 dk aralık (sempatektomi /</text>
                <text x="14" y="78" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>propofol hipotansiyon pik fazı).</text>
                <text x="14" y="102" fontSize="10" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>Stabil İdame Dönemi:</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>3–5 dk (ASA zorunlu üst sınır).</text>
                <text x="14" y="140" fontSize="10" fontWeight="700" fill="#f59e0b">STAT Mod (5 dk sürekli):</text>
                <text x="14" y="154" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>Sadece geçici krizlerde kullan!</text>
              </g>

              {/* Panel 4 */}
              <g transform="translate(662, 8)">
                <rect width="210" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f43f5e" strokeOpacity="0.6" />
                <text x="14" y="26" fontSize="11" fontWeight="700" fill="#f43f5e">4. Ne Zaman İnvaziv Arter (IBP)?</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sürekli vuru-vuru takip ihtiyacı</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Vazopresör / inotrop titrasyonu</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Majör kanama, kardiyak/kraniyal</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Şiddetli şok (NIBP aşırı okur)</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• KPB / LVAD (non-pulsatil akım)</text>
                <text x="14" y="133" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Seri AKG veya uygunsuz ekstremite</text>
                <text x="14" y="155" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#f43f5e">IBP takılsa da NIBP yedek kalır</text>
              </g>
            </svg>
          </div>
        </div>

        {/* 3 Structured Clinical Purpose Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold ${headingColor}`}>İndüksiyon & Rejyonel Blok Kör Penceresi</div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              NIBP aralıklı (intermittent) bir monitördür; 5 dakikalık aralıkta spinal anestezi veya propofol indüksiyonu sonrası
              gelişen ani hipotansiyon fark edilmeden derinleşebilir. Kritik geçişlerde aralığı <strong>1–2 dk</strong>’ya çekin.
            </p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold ${headingColor}`}>Obezite & Özel Hasta Grupları</div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Konik şekilli morbid obez üst kollarda standart manşon kayarak yanlış yüksek ölçer; uygun <strong>önkol (radial)</strong>{' '}
              manşonu veya bariatrik majör cerrahide <strong>invaziv arter</strong> tercih edilmelidir.
            </p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold ${headingColor}`}>Çift Yönlü Hemodinamik Yorum</div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Kan basıncı tek başına debi (CO) göstergesi değildir (<span className="font-mono">MAP ≈ CO × SVR</span>). Normal NIBP,
              yüksek SVR ile maskelenmiş ciddi hipovolemiyi gizleyebilir; mutlaka kalp hızı, EtCO₂ ve SpO₂ pletismografi ile birlikte yorumlayın.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: TEKNİK KURULUM VE KALİBRASYON                                */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            3
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Teknik Kurulum ve Kalibrasyon
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Osilometrik NIBP’de ölçüm hatasının <strong>%80’inden fazlası</strong> cihazdan değil yanlış manşon boyutundan, gevşek sarımdan veya
              kalp seviyesinden sapmadan kaynaklanır.
            </p>
          </div>
        </div>

        {/* Visual 3A: Cuff Geometry & Alternative Sites SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="w-4 h-4 text-indigo-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              Anatomik Yerleşim (%40 / %80 Kuralı) ve Alternatif Ölçüm Bölgelerinde Nabız Amplifikasyonu
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 235"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="NIBP manşon yerleşim kuralı ve alternatif anatomik bölgeler"
            >
              {/* Left: Upper Arm Cuff Placement */}
              <rect
                x="10"
                y="10"
                width="440"
                height="215"
                rx="12"
                fill={isDark ? '#0f172a' : '#ffffff'}
                stroke={isDark ? '#1e293b' : '#e2e8f0'}
              />
              <text x="26" y="32" fontSize="11" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                Brakiyal Yerleşim & Kese Geometrisi
              </text>

              {/* Arm silhouette */}
              <path
                d="M 65 56 L 145 56 L 145 200 L 75 200 L 65 130 Z"
                fill={isDark ? '#1e293b' : '#f1f5f9'}
                stroke={isDark ? '#475569' : '#94a3b8'}
                strokeWidth="1.5"
              />
              {/* Brachial artery running medially */}
              <path d="M 122 56 L 122 140 L 114 198" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5 2" />
              <text x="152" y="72" fontSize="9.5" fontWeight="700" fill="#f43f5e">Brakiyal Arter</text>

              {/* Cuff wrap */}
              <rect x="61" y="78" width="88" height="62" rx="6" fill="#4f46e5" fillOpacity="0.22" stroke="#6366f1" strokeWidth="2" />
              {/* Artery Index Marker on cuff */}
              <line x1="122" y1="86" x2="122" y2="132" stroke="#6366f1" strokeWidth="2.2" />
              <polygon points="122,136 117,128 127,128" fill="#6366f1" />
              <text x="92" y="106" textAnchor="middle" fontSize="9" fontWeight="700" fill={isDark ? '#c7d2fe' : '#312e81'}>
                ARTER
              </text>
              <text x="92" y="118" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill={isDark ? '#a5b4fc' : '#4338ca'}>
                İNDEX
              </text>

              {/* Width dimension arrow (40%) */}
              <line x1="46" y1="78" x2="46" y2="140" stroke="#10b981" strokeWidth="1.8" />
              <line x1="41" y1="78" x2="51" y2="78" stroke="#10b981" strokeWidth="1.8" />
              <line x1="41" y1="140" x2="51" y2="140" stroke="#10b981" strokeWidth="1.8" />
              <text x="38" y="113" textAnchor="end" fontSize="9.5" fontFamily="monospace" fontWeight="700" fill="#10b981">
                %40
              </text>

              {/* Antecubital crease distance (2-3 cm) */}
              <line x1="72" y1="164" x2="148" y2="164" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="154" y="167" fontSize="9.5" fontWeight="700" fill="#f59e0b">
                Antekübital fossa (2–3 cm üstü)
              </text>

              {/* Right bullets inside left panel */}
              <g transform="translate(212, 52)">
                <rect width="222" height="156" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <text x="12" y="22" fontSize="10" fontWeight="700" fill="#10b981">✓ Kese Genişliği = %40 Çevre</text>
                <text x="12" y="36" fontSize="9" fill={isDark ? '#94a3b8' : '#475569'}>(Üst kol çapının ≈1.2 katı)</text>

                <text x="12" y="58" fontSize="10" fontWeight="700" fill="#10b981">✓ Kese Uzunluğu = %80 Çevre</text>
                <text x="12" y="72" fontSize="9" fill={isDark ? '#94a3b8' : '#475569'}>İndeks çizgisi aralık içinde olmalı</text>

                <text x="12" y="94" fontSize="10" fontWeight="700" fill="#6366f1">✓ Sıkılık: 1–2 Parmak Boşluğu</text>
                <text x="12" y="108" fontSize="9" fill={isDark ? '#94a3b8' : '#475569'}>Kıyafet üstüne değil çıplak cilde sar</text>

                <text x="12" y="130" fontSize="10" fontWeight="700" fill="#f59e0b">✓ Kalp Seviyesi (4. İKA / Mid-Ax)</text>
                <text x="12" y="144" fontSize="9" fill={isDark ? '#94a3b8' : '#475569'}>Her 10 cm fark ≈ ±7.4 mmHg hata!</text>
              </g>

              {/* Right: Alternative Sites & Distal Amplification */}
              <rect
                x="466"
                y="10"
                width="404"
                height="215"
                rx="12"
                fill={isDark ? '#0f172a' : '#ffffff'}
                stroke={isDark ? '#1e293b' : '#e2e8f0'}
              />
              <text x="482" y="32" fontSize="11" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                Alternatif Bölgeler & Distal Nabız Amplifikasyonu
              </text>

              {[
                {
                  site: 'Üst Kol (Brakiyal)',
                  tag: 'ALTIN STANDART',
                  sbp: 'Ref (0)',
                  map: 'Ref (0)',
                  color: '#10b981',
                  note: 'Tüm algoritmaların referans noktası.',
                },
                {
                  site: 'Önkol (Radial)',
                  tag: 'OBEZ / KONİK KOL',
                  sbp: '+5 ila +10',
                  map: '±3 mmHg',
                  color: '#0ea5e9',
                  note: 'Üst kol uyumsuzsa iyi alternatif; bilekten 2 cm yukarı.',
                },
                {
                  site: 'Uyluk (Popliteal)',
                  tag: 'ÜST EKSTREMİTE YASAK',
                  sbp: '+10 ila +20',
                  map: '+3 ila +5',
                  color: '#f59e0b',
                  note: 'Özel geniş uyluk manşonu şarttır; hasta konforu düşük.',
                },
                {
                  site: 'Ayak Bileği (Post. Tibial)',
                  tag: 'SON SEÇENEK',
                  sbp: '+10 ila +25',
                  map: '±5 mmHg',
                  color: '#f43f5e',
                  note: 'Distal amplifikasyonla SBP ↑, DBP ↓; ancak MAP korunur!',
                },
              ].map((row, idx) => {
                const y = 46 + idx * 42;
                return (
                  <g key={row.site} transform={`translate(482, ${y})`}>
                    <rect
                      width="372"
                      height="36"
                      rx="7"
                      fill={isDark ? '#1e293b' : '#f8fafc'}
                      stroke={isDark ? '#334155' : '#e2e8f0'}
                    />
                    <text x="10" y="15" fontSize="10" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                      {row.site}
                    </text>
                    <text x="10" y="29" fontSize="8.5" fill={isDark ? '#94a3b8' : '#475569'}>
                      {row.note}
                    </text>
                    <text x="278" y="15" textAnchor="end" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill={row.color}>
                      SBP: {row.sbp}
                    </text>
                    <text x="362" y="15" textAnchor="end" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill={isDark ? '#c7d2fe' : '#4338ca'}>
                      MAP: {row.map}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Cuff Sizing Table + Verification Checklist */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-7 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-700'}>
                  <th className="py-2.5 px-3 font-bold">Manşon Grubu</th>
                  <th className="py-2.5 px-3 font-bold font-mono">Kol Çevresi</th>
                  <th className="py-2.5 px-3 font-bold font-mono">Kese Eni</th>
                  <th className="py-2.5 px-3 font-bold font-mono">Kese Boyu</th>
                  <th className="py-2.5 px-3 font-bold font-mono">İlk Şişirme</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {CUFF_SIZE_TABLE.map((row) => (
                  <tr
                    key={row.group}
                    className={isDark ? 'hover:bg-slate-800/40 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                  >
                    <td className="py-2 px-3 font-semibold">{row.group}</td>
                    <td className="py-2 px-3 font-mono tabular-nums">{row.armCirc}</td>
                    <td className="py-2 px-3 font-mono tabular-nums">{row.bladderWidth}</td>
                    <td className="py-2 px-3 font-mono tabular-nums">{row.bladderLength}</td>
                    <td className="py-2 px-3 font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
                      {row.initialInflate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`xl:col-span-5 p-4 rounded-xl border space-y-2.5 ${mutedSurface}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-indigo-500" />
              <span className={`text-xs font-bold ${headingColor}`}>
                Kalibrasyon, Pnömatik Test & Yatak Başı Kontrol Listesi
              </span>
            </div>
            <ul className={`space-y-2 text-xs leading-relaxed ${bodyColor}`}>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Otomatik Sıfırlama & Biyomedikal Kalibrasyon:</strong> Cihaz her açılışta atmosferik sıfırlama yapar;
                  yıllık biyomedikal bakımda statik basınç transdüseri (±3 mmHg) ve kaçak hızı (&lt;6 mmHg/dk) doğrulanır.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Hasta Modu (Erişkin / Pediatrik / Yenidoğan):</strong> Monitör profilini mutlaka doğru seçin!
                  Yenidoğanda erişkin profili aşırı başlangıç şişirme (180 mmHg) ile ekstremite travmasına yol açar.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Pre-indüksiyon Bazal Ölçüm:</strong> Anestezi öncesi uyanık bazal NIBP’yi alın; bilateral &gt;15–20 mmHg
                  fark şüphesi varsa (vasküler/aort cerrahisi) iki koldan ölçüp yüksek olan tarafı izleyin.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Kontralateral Yerleşim:</strong> SpO₂ probunu ve mümkünse aktif IV infüzyon/vazoaktif hattı manşonun{' '}
                  <strong>karşı koluna</strong> yerleştirin.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: NORMAL VE PATOLOJİK DALGA FORMLARI (OSİLOMETRİK ZARF)        */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            4
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Normal ve Patolojik Dalga Formları (Osilometrik Zarf Analizi)
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Ekrandaki sayısal değere körü körüne güvenmeden önce, cihazın arkasında oluşan <strong>basamaklı deflasyon eğrisi</strong>,{' '}
              <strong>osilasyon genlik zarfı</strong> ve <strong>ölçüm süresini</strong> yorumlayın. Uzayan ölçüm veya yeniden şişirme
              ilk klinik uyarı sinyalidir.
            </p>
          </div>
        </div>

        {/* Interactive Pattern Selector */}
        <div className="flex flex-wrap gap-1.5">
          {NIBP_PATTERNS.map((pattern) => {
            const active = pattern.id === activePatternId;
            return (
              <button
                key={pattern.id}
                type="button"
                onClick={() => setActivePatternId(pattern.id)}
                className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-indigo-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-400'
                }`}
              >
                {pattern.label}
              </button>
            );
          })}
        </div>

        {/* Dark Oscillometry Monitor Console */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 text-slate-100 space-y-4">
          {/* Top HUD */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Waves className="w-4 h-4 text-indigo-400" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">{activePattern.label}</div>
                <div className="text-[11px] font-mono text-slate-400">{activePattern.statusText}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono tabular-nums">
              <div>
                <div className="text-[10px] text-slate-400">NIBP (mmHg)</div>
                <div
                  className={`text-xl font-bold ${
                    activePattern.status === 'normal'
                      ? 'text-emerald-400'
                      : activePattern.status === 'warning'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                  }`}
                >
                  {activePattern.sbp}/{activePattern.dbp}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-indigo-300">MAP (Ölçülen)</div>
                <div className="text-xl font-bold text-indigo-300">({activePattern.map})</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Siklus Süresi</div>
                <div className="text-sm font-bold text-slate-200">{activePattern.cycleSec}</div>
              </div>
            </div>
          </div>

          {/* Dual-Channel SVG: Cuff Staircase + Oscillation Envelope */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 540 205"
              className="w-full min-w-[460px] h-auto"
              role="img"
              aria-label={`${activePattern.label} osilometrik dalga formu`}
            >
              {/* Grid */}
              {[28, 64, 100, 136, 178].map((gy) => (
                <line key={gy} x1="28" y1={gy} x2="520" y2={gy} stroke="#1e293b" strokeWidth="1" />
              ))}
              <text x="24" y="31" textAnchor="end" fontSize="8.5" fontFamily="monospace" fill="#64748b">220</text>
              <text x="24" y="67" textAnchor="end" fontSize="8.5" fontFamily="monospace" fill="#64748b">160</text>
              <text x="24" y="103" textAnchor="end" fontSize="8.5" fontFamily="monospace" fill="#64748b">110</text>
              <text x="24" y="139" textAnchor="end" fontSize="8.5" fontFamily="monospace" fill="#64748b">70</text>
              <text x="24" y="181" textAnchor="end" fontSize="8.5" fontFamily="monospace" fill="#64748b">0</text>

              {/* Vertical SBP / MAP / DBP guide lines */}
              <line
                x1={44 + activePattern.sbpIdx * 34}
                y1="20"
                x2={44 + activePattern.sbpIdx * 34}
                y2="184"
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <line
                x1={44 + activePattern.mapIdx * 34}
                y1="20"
                x2={44 + activePattern.mapIdx * 34}
                y2="184"
                stroke="#818cf8"
                strokeWidth="1.8"
                strokeDasharray="3 3"
              />
              <line
                x1={44 + activePattern.dbpIdx * 34}
                y1="20"
                x2={44 + activePattern.dbpIdx * 34}
                y2="184"
                stroke="#34d399"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />

              {/* Cuff pressure staircase */}
              <path d={staircasePath} fill="none" stroke="#64748b" strokeWidth="1.8" />

              {/* Oscillation bars */}
              {activePattern.pulses.map((h, i) => {
                const x = 44 + i * 34;
                const isMap = i === activePattern.mapIdx;
                const isSbp = i === activePattern.sbpIdx;
                const isDbp = i === activePattern.dbpIdx;
                const strokeCol =
                  activePattern.id === 'artifact' && h > 45
                    ? '#f43f5e'
                    : isMap
                      ? '#818cf8'
                      : isSbp
                        ? '#38bdf8'
                        : isDbp
                          ? '#34d399'
                          : '#475569';
                return (
                  <line
                    key={i}
                    x1={x}
                    y1={178}
                    x2={x}
                    y2={178 - h * 1.15}
                    stroke={strokeCol}
                    strokeWidth={isMap ? '5' : '3.5'}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Envelope polyline */}
              <path
                d={envelopePoints}
                fill="none"
                stroke={
                  activePattern.status === 'critical'
                    ? '#fb7185'
                    : activePattern.status === 'warning'
                      ? '#fbbf24'
                      : '#a5b4fc'
                }
                strokeWidth="2.2"
              />

              {/* Labels for SBP / MAP / DBP */}
              <text
                x={44 + activePattern.sbpIdx * 34}
                y="15"
                textAnchor="middle"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="700"
                fill="#38bdf8"
              >
                SBP
              </text>
              <text
                x={44 + activePattern.mapIdx * 34}
                y="15"
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="700"
                fill="#a5b4fc"
              >
                MAP (Amax)
              </text>
              <text
                x={44 + activePattern.dbpIdx * 34}
                y="15"
                textAnchor="middle"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="700"
                fill="#34d399"
              >
                DBP
              </text>

              <text x="275" y="198" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#94a3b8">
                Gri: Manşon Basıncı Basamakları · Renkli Çubuklar & Zarf: Arteriyel Osilasyon Genliği
              </text>
            </svg>
          </div>

          {/* Clinical Interpretation Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-800 pt-3.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-indigo-300">Dalga / Zarf Morfolojisi</div>
              <p className="text-slate-300 leading-relaxed">{activePattern.morphology}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-300">Sık Perioperatif Nedenler</div>
              <ul className="space-y-1 text-slate-300 list-disc pl-4">
                {activePattern.causes.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-300">Anestezist Klinik Eylemi</div>
              <p className="text-slate-200 leading-relaxed">{activePattern.action}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 5: LİMİTASYONLAR VE ARTEFAKTLAR                                 */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            5
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Limitasyonlar ve Artefaktlar
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              NIBP’nin hangi yönde (yalancı yüksek vs yalancı düşük) sapacağını veya tamamen kör kalacağını öngörmek,
              gereksiz vazopresör/antihipertansif uygulamalarını önler.
            </p>
          </div>
        </div>

        {/* Visual 5: 3-Zone Error Direction Compass SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              3 Bölgeli NIBP Sapma Pusulası (Yalancı Yüksek · Ölçüm Başarısızlığı · Yalancı Düşük)
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 175"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="NIBP yalancı yüksek, ölçüm başarısızlığı ve yalancı düşük nedenleri"
            >
              {/* Zone 1: Overestimation */}
              <g transform="translate(8, 8)">
                <rect width="280" height="158" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f43f5e" strokeOpacity="0.6" />
                <text x="14" y="26" fontSize="11" fontWeight="700" fill="#f43f5e">▲ YALANCI YÜKSEK (Overestimate)</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Çok dar / küçük manşon (+10–30 mmHg)</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Gevşek sarım veya kıyafet üstüne sarım</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kol kalp seviyesinin ALTINDA (+7.4/10cm)</text>
                <text x="14" y="99" fontSize="9.5" fontWeight="700" fill="#fb7185">• Şiddetli hipotansiyon / şok (MAP &lt;60!)</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Cerrah yaslanması / üşüme titremesi</text>
                <text x="14" y="133" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kalsifik sert arter (Osler fenomeni)</text>
              </g>

              {/* Zone 2: Failure / Non-pulsatile */}
              <g transform="translate(300, 8)">
                <rect width="280" height="158" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f59e0b" strokeOpacity="0.6" />
                <text x="14" y="26" fontSize="11" fontWeight="700" fill="#f59e0b">⊘ ÖLÇÜM BAŞARISIZLIĞI / GECİKME</text>
                <text x="14" y="48" fontSize="9.5" fontWeight="700" fill="#fbbf24">• Non-pulsatil akım (KPB, LVAD, VA-ECMO)</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Hızlı AF / sık ekstrasistol / düzensiz R-R</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Ciddi bradikardi (&lt;40/dk → uzun siklus)</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sürekli hareket / Parkinson tremoru</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Hortum bükülmesi veya pnömatik kaçak</text>
                <text x="14" y="133" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Aşırı morbid obezite (doku sönümlemesi)</text>
              </g>

              {/* Zone 3: Underestimation */}
              <g transform="translate(592, 8)">
                <rect width="280" height="158" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#0ea5e9" strokeOpacity="0.6" />
                <text x="14" y="26" fontSize="11" fontWeight="700" fill="#0ea5e9">▼ YALANCI DÜŞÜK (Underestimate)</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Çok geniş / büyük manşon (-5–15 mmHg)</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kol kalp seviyesinin ÜSTÜNDE (-7.4/10cm)</text>
                <text x="14" y="82" fontSize="9.5" fontWeight="700" fill="#38bdf8">• Aşırı hipertansiyon (&gt;180–200 mmHg)</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Subklavyen arter darlığı / aort koarkt.</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Çok hızlı deflasyon hızı (&gt;5 mmHg/sn)</text>
                <text x="14" y="133" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Turnike veya proksimal dış kompresyon</text>
              </g>
            </svg>
          </div>
        </div>

        {/* 8-Row Limitation Matrix */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-700'}>
                <th className="py-2.5 px-3 font-bold">Durum / Artefakt</th>
                <th className="py-2.5 px-3 font-bold">Sapma Yönü</th>
                <th className="py-2.5 px-3 font-bold">Mekanizma</th>
                <th className="py-2.5 px-3 font-bold">Klinik Çözüm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  cause: 'Küçük / Dar Manşon',
                  dir: 'Yalancı Yüksek (+10–30)',
                  dirCol: 'text-rose-600 dark:text-rose-400',
                  mech: 'Basınç derin artere verimsiz iletilir; aşırı şişirme gerekir.',
                  fix: 'Kol çevresini ölçüp %40 en / %80 boy manşona geçin.',
                },
                {
                  cause: 'Büyük / Geniş Manşon',
                  dir: 'Yalancı Düşük (-5–15)',
                  dirCol: 'text-sky-600 dark:text-sky-400',
                  mech: 'Geniş yüzey alanı arteri daha düşük basınçta erken kapatır.',
                  fix: 'Uygun küçük boy manşon kullanın; dar manşona göre hatası daha küçüktür.',
                },
                {
                  cause: 'Kalp Seviyesinden Sapma',
                  dir: '±7.4 mmHg / 10 cm',
                  dirCol: 'text-amber-600 dark:text-amber-400',
                  mech: 'Hidrostatik kan sütunu (1 cm H₂O = 0.736 mmHg).',
                  fix: 'Şezlong/oturur pozisyonda (omuz cerrahisi) manşon-beyin farkını hesaba katın!',
                },
                {
                  cause: 'Şiddetli Hipotansiyon (Şok)',
                  dir: 'Yalancı Yüksek (+8–15)',
                  dirCol: 'text-rose-600 dark:text-rose-400',
                  mech: 'Zayıf osilasyon zarfında algoritma tepeyi yukarı kaydırır.',
                  fix: 'Şokta NIBP’ye güvenmeyin; erken invaziv arter hattı (IBP) açın.',
                },
                {
                  cause: 'Atriyal Fibrilasyon / VES',
                  dir: 'Değişken / Uzamış',
                  dirCol: 'text-amber-600 dark:text-amber-400',
                  mech: 'Vurudan vuruya atım hacmi değişir, düzgün zarf oluşmaz.',
                  fix: 'Ardışık ölçümlerin ortalamasını ve MAP’ı baz alın; gerekirse IBP.',
                },
                {
                  cause: 'Cerrah Yaslanması / Titreme',
                  dir: 'Yalancı Yüksek / Hata',
                  dirCol: 'text-rose-600 dark:text-rose-400',
                  mech: 'Dış mekanik basınç darbeleri arteriyel osilasyonu taklit eder.',
                  fix: 'Kol koruyucu siperlik kullanın, ekibi uyarın, hastayı aktif ısıtın.',
                },
                {
                  cause: 'Non-Pulsatil Akım (KPB / LVAD)',
                  dir: 'Ölçüm Yapılamaz',
                  dirCol: 'text-amber-600 dark:text-amber-400',
                  mech: 'Sürekli akımda arter duvar osilasyonu yoktur.',
                  fix: 'İnvaziv arter (IBP) zorunludur; poliklinikte Doppler ile MAP bakılır.',
                },
                {
                  cause: 'Aralıklı Ölçüm Kör Penceresi',
                  dir: 'Gecikmiş Tanı',
                  dirCol: 'text-sky-600 dark:text-sky-400',
                  mech: 'İki ölçüm arasındaki 3–5 dk’da ani hemodinamik çöküş kaçabilir.',
                  fix: 'İndüksiyon/spinal sonrası 1–2 dk aralık; yüksek riskte sürekli IBP.',
                },
              ].map((row) => (
                <tr
                  key={row.cause}
                  className={isDark ? 'hover:bg-slate-800/40 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                >
                  <td className="py-2.5 px-3 font-semibold">{row.cause}</td>
                  <td className={`py-2.5 px-3 font-mono font-bold whitespace-nowrap ${row.dirCol}`}>{row.dir}</td>
                  <td className="py-2.5 px-3">{row.mech}</td>
                  <td className="py-2.5 px-3">{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 6: KOMPLİKASYONLAR VE GÜVENLİK                                  */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            6
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Komplikasyonlar ve Güvenlik
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Non-invaziv olmasına rağmen NIBP masum değildir: sık tekrarlı şişirmeler sinir basısı, venöz staz, cilt nekrozu
              ve kontrendike ekstremitede <strong>AV fistül trombozu</strong> gibi ciddi komplikasyonlara yol açabilir.
            </p>
          </div>
        </div>

        {/* Visual 6: 3-Panel NIBP Safety SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              Perioperatif NIBP Güvenlik Şeması (Sinir Basısı · Kontrendike Ekstremiteler · Pnömatik & Enfeksiyon Güvenliği)
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 190"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="NIBP komplikasyonları ve güvenlik önlemleri diyagramı"
            >
              {/* Panel 1: Nerve Compression & Venous Stasis */}
              <g transform="translate(8, 8)">
                <rect width="280" height="174" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f43f5e">1. Sinir Hasarı & Venöz Staz</text>
                {/* Arm with radial/ulnar nerve highlight */}
                <rect x="20" y="42" width="240" height="34" rx="12" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#64748b" strokeWidth="1.2" />
                <rect x="85" y="38" width="90" height="42" rx="6" fill="#4f46e5" fillOpacity="0.25" stroke="#6366f1" strokeWidth="1.6" />
                {/* Nerve line */}
                <path d="M 28 54 Q 130 68, 250 56" fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeDasharray="4 2" />
                <circle cx="130" cy="63" r="6" fill="#f43f5e" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="130" y="94" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f59e0b">
                  Ulnar (kubital tünel) & Radial sinir (spiral oluk)
                </text>
                <text x="14" y="114" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Uzun süreli 1–2 dk / STAT mod → peteşi,</text>
                <text x="14" y="129" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  ekimoz, cilt bülleri, kompartman sendromu.</text>
                <text x="14" y="146" fontSize="9.5" fontWeight="700" fill="#10b981">✓ Stabilleşince aralığı 3–5 dk’ya çıkar;</text>
                <text x="14" y="160" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>  uzun vakalarda cildi/ekstremiteyi kontrol et.</text>
              </g>

              {/* Panel 2: Restricted Extremities */}
              <g transform="translate(300, 8)">
                <rect width="280" height="174" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f43f5e" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f43f5e">2. "BU KOLA MANŞON TAKMA!"</text>
                {/* Red X badge */}
                <circle cx="32" cy="54" r="12" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1.8" />
                <path d="M 27 49 L 37 59 M 37 49 L 27 59" stroke="#f43f5e" strokeWidth="2.2" />
                <text x="52" y="51" fontSize="10" fontWeight="700" fill={isDark ? '#fda4af' : '#9f1239'}>AV Fistül / Hemodiyaliz Grefti</text>
                <text x="52" y="64" fontSize="9" fill={isDark ? '#94a3b8' : '#475569'}>Kesin kontrendike! Akım kesilir → tromboz.</text>

                <text x="14" y="88" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Aksiller lenf diseksiyonu / lenfödem tarafı</text>
                <text x="14" y="105" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kırık, yanık, derin yara, vasküler şant/greft</text>
                <text x="14" y="122" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Vazoaktif/propofol IV hattı (bolus geri kaçış!)</text>
                <text x="14" y="139" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Aynı kolda SpO₂ probu (sinyal kaybı/alarm)</text>
                <text x="14" y="160" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#f59e0b">
                  Bilateral kısıtlıysa → Alt ekstremite / IBP
                </text>
              </g>

              {/* Panel 3: Pneumatic Overpressure & Infection Control */}
              <g transform="translate(592, 8)">
                <rect width="280" height="174" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#0ea5e9">3. Pnömatik & Çapraz Bulaş Güvenliği</text>
                <rect x="14" y="38" width="252" height="46" rx="7" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <text x="24" y="55" fontSize="9.5" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>Üst Basınç Emniyet Limitleri:</text>
                <text x="24" y="72" fontSize="9.5" fontFamily="monospace" fill="#38bdf8">
                  Erişkin ≤300 · Ped ≤200 · YD ≤150 mmHg
                </text>
                <text x="14" y="105" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Hortum bükülmesi/valf kilidi → sönmeyen</text>
                <text x="14" y="120" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  manşon! Şişik kalırsa hortumu hemen ayır.</text>
                <text x="14" y="140" fontSize="9.5" fontWeight="700" fill="#f59e0b">• Nozokomiyal Rezervuar (MRSA / VRE):</text>
                <text x="14" y="156" fontSize="9.5" fill={isDark ? '#94a3b8' : '#475569'}>  Tek hastaya özel manşon veya vaka arası silme.</text>
              </g>
            </svg>
          </div>
        </div>

        {/* 4 Concise Safety Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold flex items-center gap-1.5 ${headingColor}`}>
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              <span>IV İnfüzyon + NIBP Çatışması</span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Aynı koldaki venöz yoldan remifentanil, propofol veya noradrenalin giderken manşon şişerse akım durur,
              hatta geriye kan dolup tıkanabilir; manşon söndüğünde biriken ilaç <strong>ani bolus</strong> olarak dolaşıma girer.
            </p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold flex items-center gap-1.5 ${headingColor}`}>
              <Activity className="w-3.5 h-3.5 text-amber-500" />
              <span>Alarm Yorgunluğu & Yanlış Bağlantı</span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              NIBP alarm eşiklerini (ör. MAP &lt;65 veya SBP &lt;90 / &gt;160) hastanın bazaline göre kişiselleştirin.
              Pnömatik Luer-uyumsuz konnektörleri (ISO 80369) kullanarak hava hattının IV yola kazara bağlanmasını (<strong>hava embolisi</strong>) kesin önleyin!
            </p>
          </div>
        </div>

        {/* References */}
        <div className={`pt-3 border-t flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
          <span className="inline-flex items-center gap-1 font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            Kaynaklar:
          </span>
          <span>Miller’s Anesthesia (Cardiovascular Monitoring)</span>
          <span aria-hidden="true">·</span>
          <span>ASA Standards for Basic Anesthetic Monitoring (2020)</span>
          <span aria-hidden="true">·</span>
          <span>AHA Scientific Statement on Measurement of Blood Pressure</span>
          <span aria-hidden="true">·</span>
          <span>POQI Consensus on Intraoperative Blood Pressure</span>
        </div>
      </section>
    </div>
  );
};
