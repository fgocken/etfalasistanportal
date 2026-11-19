import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Droplets,
  Gauge,
  Info,
  ShieldAlert,
  Sliders,
  Waves,
  Wrench,
} from 'lucide-react';

interface IbpMonitoringModuleProps {
  isDark: boolean;
}

type DampingModeId = 'optimal' | 'underdamped' | 'overdamped';
type IbpPatternId =
  | 'normal'
  | 'underdamped'
  | 'overdamped'
  | 'high-ppv'
  | 'aortic-stenosis'
  | 'aortic-regurg'
  | 'vasoplegia'
  | 'iabp';

interface DampingConfig {
  id: DampingModeId;
  label: string;
  zeta: string;
  sbpOffset: number;
  dbpOffset: number;
  flushDescription: string;
  causes: string;
  flushPath: string;
  wavePath: string;
  status: 'normal' | 'warning';
}

const DAMPING_CONFIGS: DampingConfig[] = [
  {
    id: 'optimal',
    label: 'Optimal Sönümleme (İdeal)',
    zeta: 'ζ ≈ 0.65–0.70',
    sbpOffset: 0,
    dbpOffset: 0,
    flushDescription: 'Kare dalga bırakıldığında 1.5–2 hızlı salınım sonrası bazale oturur.',
    causes: 'Kısa (≤120 cm), sert non-kompliyan hat, sıfır hava kabarcığı, açık kateter ucu.',
    flushPath:
      'M 8 118 L 36 118 L 36 28 L 112 28 L 112 142 Q 124 102, 136 124 Q 146 114, 158 118 L 220 118',
    wavePath:
      'M 232 132 L 246 42 Q 254 34, 260 48 L 274 88 Q 282 78, 290 92 L 324 132 ' +
      'L 338 42 Q 346 34, 352 48 L 366 88 Q 374 78, 382 92 L 416 132 ' +
      'L 430 42 Q 438 34, 444 48 L 458 88 Q 466 78, 474 92 L 508 132',
    status: 'normal',
  },
  {
    id: 'underdamped',
    label: 'Eksik Sönümleme (Underdamped / Whip)',
    zeta: 'ζ < 0.30',
    sbpOffset: 24,
    dbpOffset: -10,
    flushDescription: 'Kare dalga sonrası ≥3–4 büyük ve uzamış çınlama (ringing) salınımı görülür!',
    causes: 'Çok uzun (>150 cm) veya fazla ekli sert hat, çok sayıda 3-yollu musluk, hiperdinamik dolaşım.',
    flushPath:
      'M 8 118 L 36 118 L 36 28 L 112 28 L 112 158 L 124 72 L 136 150 L 148 86 L 160 140 L 172 98 L 184 132 L 196 108 L 220 118',
    wavePath:
      'M 232 144 L 244 20 L 252 62 L 260 44 L 272 104 L 282 74 L 292 102 L 324 144 ' +
      'L 336 20 L 344 62 L 352 44 L 364 104 L 374 74 L 384 102 L 416 144 ' +
      'L 428 20 L 436 62 L 444 44 L 456 104 L 466 74 L 476 102 L 508 144',
    status: 'warning',
  },
  {
    id: 'overdamped',
    label: 'Aşırı Sönümleme (Overdamped)',
    zeta: 'ζ > 1.00',
    sbpOffset: -22,
    dbpOffset: 11,
    flushDescription: 'Kare dalga sonrası hiç alt salınım (undershoot) olmadan yavaşça sürünerek bazale iner.',
    causes: 'Hatta hava kabarcığı (en sık!), kateter ucunda pıhtı/kıvrılma, yumuşak/kompliyan uzatma, düşük torba basıncı.',
    flushPath:
      'M 8 118 L 36 118 L 36 28 L 112 28 C 118 76, 134 114, 186 118 L 220 118',
    wavePath:
      'M 232 118 Q 256 64, 278 72 Q 302 96, 324 118 ' +
      'Q 348 64, 370 72 Q 394 96, 416 118 ' +
      'Q 440 64, 462 72 Q 486 96, 508 118',
    status: 'warning',
  },
];

interface IbpPattern {
  id: IbpPatternId;
  label: string;
  sbp: string;
  dbp: string;
  map: string;
  ppText: string;
  status: 'normal' | 'warning' | 'critical';
  statusText: string;
  path: string;
  morphology: string;
  causes: string[];
  action: string;
}

const IBP_PATTERNS: IbpPattern[] = [
  {
    id: 'normal',
    label: 'Normal Radial Arter Trasesi',
    sbp: '122',
    dbp: '72',
    map: '89',
    ppText: 'PP 50 · PPV %6',
    status: 'normal',
    statusText: 'Keskin Sistolik Çıkış · Net Dikrotik Çentik',
    path:
      'M 12 128 L 30 128 L 46 42 Q 52 34, 58 46 L 74 88 Q 82 78, 90 92 L 132 128 ' +
      'L 148 42 Q 154 34, 160 46 L 176 88 Q 184 78, 192 92 L 234 128 ' +
      'L 250 42 Q 256 34, 262 46 L 278 88 Q 286 78, 294 92 L 336 128 ' +
      'L 352 42 Q 358 34, 364 46 L 380 88 Q 388 78, 396 92 L 438 128 ' +
      'L 454 42 Q 460 34, 466 46 L 482 88 Q 490 78, 498 92 L 522 118',
    morphology:
      'Hızlı sistolik yükseliş (kontraktilite / dP/dt), dar yuvarlak pik, aort kapak kapanışını gösteren belirgin dikrotik çentik ve pürüzsüz diyastolik azalma (SVR göstergesi).',
    causes: ['Optimal sönümlemeli (ζ ≈ 0.65) sistem ve stabil hemodinami'],
    action: 'Referans bazal trase; her pozisyon değişikliğinde transdüser seviyesini kontrol edin.',
  },
  {
    id: 'underdamped',
    label: 'Eksik Sönümleme (Underdamped / Whip)',
    sbp: '146*',
    dbp: '62*',
    map: '89',
    ppText: 'SBP ↑↑ · MAP Doğru!',
    status: 'warning',
    statusText: 'Sivri Overshoot Pik · MAP Korunur!',
    path:
      'M 12 138 L 30 138 L 42 20 L 50 64 L 58 44 L 72 104 L 82 76 L 94 102 L 132 138 ' +
      'L 144 20 L 152 64 L 160 44 L 174 104 L 184 76 L 196 102 L 234 138 ' +
      'L 246 20 L 254 64 L 262 44 L 276 104 L 286 76 L 298 102 L 336 138 ' +
      'L 348 20 L 356 64 L 364 44 L 378 104 L 388 76 L 400 102 L 438 138 ' +
      'L 450 20 L 458 64 L 466 44 L 480 104 L 490 76 L 502 102 L 522 128',
    morphology:
      'Yapay, keskin iğne gibi yükselen sistolik tepe ("systolic whip") ve ardından ek titreşimler. SBP +15–30 mmHg YALANCI YÜKSEK, DBP yalancı düşük okunur; ancak eğri altı ortalama (MAP) doğru kalır!',
    causes: [
      'Gereksiz uzun (>150 cm) basınç hattı veya fazla eklenmiş 3-yollu musluklar',
      'Genç/hiperdinamik hasta (yüksek dP/dt) veya distal arter rezonansı',
    ],
    action:
      'Gereksiz antihipertansif/vazodilatatör vermeden önce kare dalga testi yapın, hattı kısaltın, fazla muslukları çıkarın ve MAP değerini baz alın.',
  },
  {
    id: 'overdamped',
    label: 'Aşırı Sönümleme (Hava Kabarcığı / Pıhtı)',
    sbp: '98*',
    dbp: '83*',
    map: '89',
    ppText: 'Dar PP · MAP Doğru!',
    status: 'warning',
    statusText: 'Yuvarlak Tepe · Dikrotik Çentik Silinmiş',
    path:
      'M 12 114 L 30 114 Q 52 68, 72 74 Q 98 96, 132 114 ' +
      'Q 154 68, 174 74 Q 200 96, 234 114 ' +
      'Q 256 68, 276 74 Q 302 96, 336 114 ' +
      'Q 358 68, 378 74 Q 404 96, 438 114 ' +
      'Q 460 68, 480 74 Q 506 96, 522 110',
    morphology:
      'Yavaş yükselen, basık ve yuvarlaklaşmış dalga; dikrotik çentik tamamen silinmiştir. SBP YALANCI DÜŞÜK, DBP yalancı yüksek okunur (daralmış nabız basıncı); MAP genellikle korunur.',
    causes: [
      'Basınç hattında mikro/makro hava kabarcığı (en sık neden!)',
      'Kateter ucunda pıhtı, damar duvarına yaslanma, bilek fleksiyonu veya basınçlı torbanın inmesi (<300 mmHg)',
    ],
    action:
      'Önce bileği nötral ekstansiyona alın, hattaki havayı aspire/tahliye edin, basınç torbasını 300 mmHg’ye şişirin ve nazikçe aspire edip pıhtı kontrolü yapın (asla pıhtılı hattı zorla yıkamayın!).',
  },
  {
    id: 'high-ppv',
    label: 'Yüksek Nabız Basıncı Değişimi (PPV > %13)',
    sbp: '108–84',
    dbp: '60–54',
    map: '72',
    ppText: 'PPV %22 · Sıvı Yanıtlı!',
    status: 'critical',
    statusText: 'Solunumsal Salınım (Swing) · Hipovolemi',
    path:
      'M 12 132 L 26 52 Q 32 46, 38 56 L 52 94 L 84 132 ' +
      'L 98 62 Q 104 56, 110 66 L 124 100 L 156 136 ' +
      'L 170 86 Q 176 80, 182 88 L 196 114 L 228 140 ' +
      'L 242 92 Q 248 86, 254 94 L 268 118 L 300 136 ' +
      'L 314 66 Q 320 60, 326 68 L 340 102 L 372 132 ' +
      'L 386 50 Q 392 44, 398 54 L 412 92 L 444 134 ' +
      'L 458 74 Q 464 68, 470 78 L 484 108 L 520 138',
    morphology:
      'Pozitif basınçlı mekanik ventilasyon sikluslarıyla senkronize belirgin nabız basıncı dalgalanması (PPV = [PPmax − PPmin] / PPmean > %12–13). Hastanın Frank-Starling eğrisinin dik (ön-yük bağımlı) kolunda olduğunu gösterir.',
    causes: [
      'Gerçek hipovolemi / intraoperatif kanama',
      'Göreceli hipovolemi (anestezik vazodilatasyon, yüksek PEEP, pnömoperitonyum)',
    ],
    action:
      'PPV geçerlilik şartları (sinüs ritmi, mekanik ventilasyon Vt ≥7–8 mL/kg, kapalı toraks) sağlanıyorsa 250 mL kristalloid/kolloid yükleme bolusunu değerlendirin.',
  },
  {
    id: 'aortic-stenosis',
    label: 'Aort Darlığı (Pulsus Parvus et Tardus)',
    sbp: '96',
    dbp: '66',
    map: '76',
    ppText: 'Dar PP 30 · Gecikmiş Pik',
    status: 'warning',
    statusText: 'Yavaş Çıkış (dP/dt ↓) · Anakrotik Çentik',
    path:
      'M 12 128 L 28 128 C 46 110, 56 98, 66 96 C 78 82, 88 74, 98 78 L 122 104 L 146 128 ' +
      'C 164 110, 174 98, 184 96 C 196 82, 206 74, 216 78 L 240 104 L 264 128 ' +
      'C 282 110, 292 98, 302 96 C 314 82, 324 74, 334 78 L 358 104 L 382 128 ' +
      'C 400 110, 410 98, 420 96 C 432 82, 442 74, 452 78 L 476 104 L 500 128 L 522 128',
    morphology:
      'Düşük genlikli (parvus), yavaş yükselen ve geç tepe yapan (tardus) sistolik kol; çıkış kolunda anakrotik çentik ve dar nabız basıncı. Overdamped artefakttan kare dalga testiyle ayrılır!',
    causes: ['Ciddi kalsifik aort stenozu', 'İleri sol ventrikül sistolik yetmezliği (düşük dP/dt)'],
    action:
      'Kare dalga testi normalse gerçek aort darlığı/düşük debi kabul edin: SVR’yi koruyun (fenilefrin/noradrenalin), taşikardiden ve ani vazodilatasyondan kesinlikle kaçının!',
  },
  {
    id: 'aortic-regurg',
    label: 'Aort Yetmezliği (Geniş PP / Bisferiens)',
    sbp: '156',
    dbp: '42',
    map: '80',
    ppText: 'Geniş PP 114 · DBP ↓↓',
    status: 'warning',
    statusText: 'Çok Dik Çıkış · Çift Pik · Hızlı Diyastolik Çöküş',
    path:
      'M 12 152 L 24 152 L 38 28 Q 44 22, 49 40 Q 56 26, 63 42 L 88 128 Q 104 148, 132 152 ' +
      'L 146 28 Q 152 22, 157 40 Q 164 26, 171 42 L 196 128 Q 212 148, 240 152 ' +
      'L 254 28 Q 260 22, 265 40 Q 272 26, 279 42 L 304 128 Q 320 148, 348 152 ' +
      'L 362 28 Q 368 22, 373 40 Q 380 26, 387 42 L 412 128 Q 428 148, 456 152 ' +
      'L 470 28 Q 476 22, 481 40 Q 488 26, 495 42 L 518 124',
    morphology:
      'Çok yüksek atım hacmiyle dik çıkış, çift sistolik tepe (pulsus bisferiens), kaybolmuş dikrotik çentik ve diyastolik geri kaçışla hızla çöken çok düşük DBP (koroner perfüzyon riski!).',
    causes: ['Ciddi aort yetmezliği (AY)', 'Büyük AV fistül veya patent duktus arteriozus (PDA)'],
    action:
      'Bradikardi diyastol süresini ve regürjitan hacmi artırır! Kalp hızını nispeten yüksek (80–90/dk) ve SVR’yi hafif düşük tutun; koroner iskemiyi (V5 ST) yakından izleyin.',
  },
  {
    id: 'vasoplegia',
    label: 'Vazopleji / Septik Şok (Düşük SVR)',
    sbp: '88',
    dbp: '40',
    map: '56',
    ppText: 'Düşük Çentik · SVR ↓↓',
    status: 'critical',
    statusText: 'Alçak Dikrotik Çentik · Hızlı Diyastolik İniş',
    path:
      'M 12 150 L 28 150 L 42 74 Q 48 66, 54 78 L 76 134 Q 84 126, 92 138 L 128 150 ' +
      'L 142 74 Q 148 66, 154 78 L 176 134 Q 184 126, 192 138 L 228 150 ' +
      'L 242 74 Q 248 66, 254 78 L 276 134 Q 284 126, 292 138 L 328 150 ' +
      'L 342 74 Q 348 66, 354 78 L 376 134 Q 384 126, 392 138 L 428 150 ' +
      'L 442 74 Q 448 66, 454 78 L 476 134 Q 484 126, 492 138 L 522 148',
    morphology:
      'Düşük periferik direnç (SVR ↓↓) nedeniyle dikrotik çentik tabana çok yakın (aşağı kaymış) yerleşir; diyastolik kol hızla çöker, DBP ve MAP düşüktür.',
    causes: ['Septik şok, anafilaksi, post-KPB vazoplejik sendrom', 'Yüksek spinal/epidural blok veya derin volatil/propofol'],
    action:
      'Sıvı yüklemesi tek başına yetersizdir; hedef MAP ≥65 mmHg için erken vazopresör (noradrenalin ± vazopresin) başlatın ve altta yatan nedeni tedavi edin.',
  },
  {
    id: 'iabp',
    label: 'İntra-Aortik Balon Pompası (IABP · 1:2)',
    sbp: '94 / 138*',
    dbp: '48*',
    map: '86',
    ppText: 'Diyastolik Augmentasyon',
    status: 'normal',
    statusText: 'Dikrotik Çentikte Balon Şişmesi · Afterload ↓',
    path:
      // Unassisted beat 1
      'M 12 128 L 28 128 L 44 58 Q 50 52, 56 62 L 72 96 Q 80 88, 88 100 L 128 128 ' +
      // Assisted beat 1: Inflation at dicrotic notch -> tall diastolic peak, then deep dip (assisted end-diastolic)
      'L 144 62 Q 150 56, 156 66 L 170 96 L 188 26 Q 196 20, 204 34 L 228 148 ' +
      // Next assisted systole is LOWER (reduced afterload!)
      'L 244 74 Q 250 68, 256 78 L 272 104 Q 280 96, 288 108 L 328 128 ' +
      // Assisted beat 2
      'L 344 62 Q 350 56, 356 66 L 370 96 L 388 26 Q 396 20, 404 34 L 428 148 ' +
      'L 444 74 Q 450 68, 456 78 L 472 104 Q 480 96, 488 108 L 522 126',
    morphology:
      '1:2 modda her iki atımdan birinde dikrotik çentik anında keskin bir "V" açısıyla yükselen diyastolik augmentasyon piki (koroner perfüzyon ↑↑), ardından balonun sönmesiyle derinleşen son-diyastolik çukur ve bir sonraki asiste sistolik tepenin düşmesi (afterload ↓↓).',
    causes: ['Kardiyojenik şok, refrakter miyokard iskemisi, yüksek riskli kardiyak cerrahi'],
    action:
      'Zamanlamayı 1:2 modda doğrulayın: Erken şişme aort kapağını erken kapatır (atım hacmi ↓); geç sönme ise sol ventrikül afterload’unu artırır!',
  },
];

interface ArterialSiteRow {
  site: string;
  gauge: string;
  amplification: string;
  pros: string;
  risks: string;
}

const ARTERIAL_SITE_TABLE: ArterialSiteRow[] = [
  {
    site: 'Radial Arter (1. Tercih)',
    gauge: '20G (Erişkin) · 22–24G (Ped)',
    amplification: '+5–15 mmHg SBP',
    pros: 'Yüzeyel, kolay kompresyon, ulnar/palmar ark kollaterali, düşük enfeksiyon.',
    risks: 'KPB sonrası geçici radial–aortik gradyan (radial yalancı düşük kalabilir!).',
  },
  {
    site: 'Femoral Arter',
    gauge: '18–20G (Seldinger)',
    amplification: 'Santrale En Yakın',
    pros: 'Şok/vazokonstriksiyonda radial kaybolsa bile güvenilir santral basınç verir.',
    risks: 'Retroperitoneal hematom, daha yüksek enfeksiyon (CRBSI), mobilizasyon kısıtı.',
  },
  {
    site: 'Brakiyal Arter',
    gauge: '20G',
    amplification: 'Düşük',
    pros: 'Büyük lümen, radial yokluğunda alternatif.',
    risks: 'Uç arter (kollateral zayıf!) → trombozda tüm önkol iskemisi; median sinir hasarı.',
  },
  {
    site: 'Aksiller Arter',
    gauge: '18–20G (Uzun)',
    amplification: 'Aorta Çok Yakın',
    pros: 'Kollateral ağ zengin; şiddetli periferik vazokonstriksiyonda doğru santral ölçüm.',
    risks: 'Brakiyal pleksus hematom basısı; serebral hava embolisi riski (öz. sağ aksiller).',
  },
  {
    site: 'Dorsalis Pedis / Post. Tibial',
    gauge: '20–22G',
    amplification: '+10–25 mmHg SBP!',
    pros: 'Üst ekstremite cerrahisi / yanık / bilateral kısıtlamada alternatif.',
    risks: 'Belirgin distal amplifikasyon (SBP yüksek, DBP düşük — MAP’ı takip et!), PVH’de kaçın.',
  },
];

export const IbpMonitoringModule: React.FC<IbpMonitoringModuleProps> = ({ isDark }) => {
  const [dampingModeId, setDampingModeId] = useState<DampingModeId>('optimal');
  const [transducerOffsetCm, setTransducerOffsetCm] = useState<number>(0); // + below heart -> false HIGH, - above heart -> false LOW
  const [activePatternId, setActivePatternId] = useState<IbpPatternId>('normal');

  const damping = DAMPING_CONFIGS.find((d) => d.id === dampingModeId) ?? DAMPING_CONFIGS[0];
  const activePattern = IBP_PATTERNS.find((p) => p.id === activePatternId) ?? IBP_PATTERNS[0];

  // True arterial baseline = 120/70 (MAP 87)
  const trueSbp = 120;
  const trueDbp = 70;
  const trueMap = 87;

  // Hydrostatic rule for TRANSDUCER:
  // Transducer BELOW heart (+cm) -> column of fluid adds pressure -> FALSE HIGH (+0.736 mmHg/cm)
  // Transducer ABOVE heart (-cm) -> FALSE LOW (-0.736 mmHg/cm)
  const levelDelta = Math.round(transducerOffsetCm * 0.736);

  const displayedSbp = Math.max(30, trueSbp + damping.sbpOffset + levelDelta);
  const displayedDbp = Math.max(20, trueDbp + damping.dbpOffset + levelDelta);
  // Key physics pearl: Damping distorts SBP/DBP but leaves MAP essentially unchanged! Level error shifts MAP too!
  const displayedMap = Math.max(25, trueMap + levelDelta);

  const cardSurface = isDark
    ? 'bg-slate-900/90 border-slate-800'
    : 'bg-white border-slate-200';
  const mutedSurface = isDark
    ? 'bg-slate-800/60 border-slate-700/80'
    : 'bg-slate-50 border-slate-200/80';
  const headingColor = isDark ? 'text-white' : 'text-slate-900';
  const bodyColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const subtleColor = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="space-y-6">
      {/* Header Summary Banner */}
      <div className={`rounded-2xl border p-5 sm:p-6 ${cardSurface}`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className={`flex flex-wrap items-center gap-2 text-xs font-medium ${subtleColor}`}>
              <span className="font-semibold text-red-600 dark:text-red-400">İnvaziv Hemodinamik Monitörizasyon</span>
              <span aria-hidden="true">·</span>
              <span>Vuru-Vuru (Beat-to-Beat) Kan Basıncı</span>
              <span aria-hidden="true">·</span>
              <span>6 Bölümlü Sistematik İnceleme</span>
            </div>
            <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${headingColor}`}>
              İnvaziv Arter Basıncı (IBP — Arteriyel Kateter &amp; Dinamik Yanıt)
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
              Perioperatif kan basıncı ölçümünün altın standardı olan IBP, sıvı dolu non-kompliyan bir hat üzerinden arteriyel
              basınç dalgasını transdüser diyaframındaki <strong>Wheatstone direnç köprüsüne</strong> aktarır. Güvenilir ölçümün
              anahtarı doğru <strong>sıfırlama/seviyelendirme</strong> ve <strong>Fast-Flush (kare dalga)</strong> ile dinamik yanıtın doğrulanmasıdır.
            </p>
          </div>

          {/* 4-Metric Quick Reference Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 shrink-0">
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Doğal Frekans</div>
              <div className="text-sm font-bold font-mono tabular-nums text-red-600 dark:text-red-400">
                fn &gt; 15–20 Hz
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Rezonans önleme</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Optimal Sönüm</div>
              <div className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                ζ = 0.64–0.70
              </div>
              <div className={`text-[10px] ${subtleColor}`}>1.5–2 kare dalga</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Seviye Hatası</div>
              <div className="text-sm font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                7.4 / 10 cm
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Transdüser ↓ = BP ↑</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Yıkama Torbası</div>
              <div className="text-sm font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400">
                300 mmHg
              </div>
              <div className={`text-[10px] ${subtleColor}`}>2–4 mL/st SF akımı</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BÖLÜM 1: FİZİKSEL PRENSİP VE ÇALIŞMA MEKANİZMASI                      */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            1
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Arteriyel basınç dalgası, sıkıştırılamaz sıvı sütunu (SF) boyunca transdüser silikon diyaframına iletilir; oluşan
              mikro-deformasyon <strong>Wheatstone köprüsü</strong> (piezorezistif strain-gauge) direncini değiştirerek orantılı
              elektrik sinyaline çevirir. Sadık dalga üretimi <strong>Doğal Frekans (fn)</strong> ve{' '}
              <strong>Sönümleme Katsayısına (ζ)</strong> bağlıdır.
            </p>
          </div>
        </div>

        {/* Visual 1A: Fluid-Filled Transducer Chain & Wheatstone Bridge SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-red-500" />
              <span className={`text-xs font-bold ${headingColor}`}>
                Biyofizik Şema: Sıvı Dolu Sistem, Wheatstone Köprüsü &amp; Dinamik Yanıt Fiziği
              </span>
            </div>
            <span className={`text-[11px] font-mono ${subtleColor}`}>
              fn ∝ r / √(L · C · ρ) · Fourier 6–10 Harmonik
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 210"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="İnvaziv arter basıncı sıvı dolu sistem ve Wheatstone köprüsü diyagramı"
            >
              {/* Left & Center: Physical Measurement Chain */}
              <rect x="8" y="8" width="548" height="194" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <text x="24" y="29" fontSize="11" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                Mekanik Basınç → Elektriksel Sinyal Zinciri
              </text>

              {/* Step 1: Artery & Catheter */}
              <rect x="24" y="54" width="110" height="74" rx="8" fill="#dc2626" fillOpacity="0.14" stroke="#ef4444" strokeWidth="1.5" />
              <text x="79" y="75" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ef4444">1. Arter + 20G</text>
              <text x="79" y="92" textAnchor="middle" fontSize="8.5" fill={isDark ? '#cbd5e1' : '#334155'}>Arteriyel basınç</text>
              <text x="79" y="106" textAnchor="middle" fontSize="8.5" fill={isDark ? '#cbd5e1' : '#334155'}>dalgası (Fourier)</text>

              {/* Connecting stiff tube */}
              <line x1="134" y1="91" x2="188" y2="91" stroke="#38bdf8" strokeWidth="4" />
              <text x="161" y="81" textAnchor="middle" fontSize="8" fontFamily="monospace" fontWeight="700" fill="#38bdf8">≤120 cm</text>
              <text x="161" y="106" textAnchor="middle" fontSize="7.5" fill={isDark ? '#94a3b8' : '#64748b'}>Sert hat</text>

              {/* Step 2: 3-Way Stopcock & Transducer Diaphragm */}
              <rect x="188" y="54" width="144" height="74" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="260" y="74" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0ea5e9">2. Transdüser</text>
              <text x="260" y="90" textAnchor="middle" fontSize="8.5" fill={isDark ? '#cbd5e1' : '#334155'}>Sıfırlama musluğu +</text>
              <text x="260" y="104" textAnchor="middle" fontSize="8.5" fill={isDark ? '#cbd5e1' : '#334155'}>Silikon diyafram</text>
              <text x="260" y="118" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#10b981">Flebostatik Eksen</text>

              {/* Flush bag feeding from bottom */}
              <line x1="260" y1="128" x2="260" y2="152" stroke="#38bdf8" strokeWidth="2.5" />
              <rect x="188" y="152" width="144" height="36" rx="6" fill="#0284c7" fillOpacity="0.16" stroke="#38bdf8" strokeWidth="1.2" />
              <text x="260" y="168" textAnchor="middle" fontSize="9" fontWeight="700" fill="#38bdf8">300 mmHg SF Torbası</text>
              <text x="260" y="181" textAnchor="middle" fontSize="8" fontFamily="monospace" fill={isDark ? '#94a3b8' : '#475569'}>2–4 mL/st sürekli yıkama</text>

              {/* Arrow to Wheatstone */}
              <line x1="332" y1="91" x2="366" y2="91" stroke="#f59e0b" strokeWidth="2" />
              <polygon points="370,91 362,86 362,96" fill="#f59e0b" />

              {/* Step 3: Wheatstone Bridge */}
              <rect x="370" y="46" width="170" height="142" rx="8" fill="#0b1120" stroke="#334155" />
              <text x="455" y="65" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fbbf24">3. Wheatstone Köprüsü</text>
              {/* Diamond resistor bridge */}
              <polygon points="455,78 495,112 455,146 415,112" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
              <circle cx="455" cy="78" r="3" fill="#38bdf8" />
              <circle cx="455" cy="146" r="3" fill="#38bdf8" />
              <circle cx="415" cy="112" r="3" fill="#ef4444" />
              <circle cx="495" cy="112" r="3" fill="#ef4444" />
              <text x="455" y="115" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#e2e8f0">ΔR → ΔV</text>
              <text x="455" y="164" textAnchor="middle" fontSize="8" fill="#94a3b8">Piezorezistif gerinim ölçer</text>
              <text x="455" y="178" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#34d399">Dijital filtre → Monitör</text>

              {/* Right Panel: fn & Damping Physics Summary */}
              <rect x="572" y="8" width="300" height="194" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <text x="588" y="29" fontSize="11" fontWeight="700" fill="#ef4444">
                Dinamik Yanıtın 2 Temel Yasası
              </text>

              <g transform="translate(588, 42)">
                <rect width="268" height="68" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <text x="10" y="18" fontSize="10" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                  1. Doğal Frekans (fn &gt; 15–20 Hz)
                </text>
                <text x="10" y="34" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>
                  Hat kısaldıkça, sertleştikçe (C ↓) ve çapı arttıkça
                </text>
                <text x="10" y="48" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>
                  fn yükselir → kalp harmonikleriyle rezonansa girmez.
                </text>
                <text x="10" y="61" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#ef4444">
                  Düşük fn = Underdamped (SBP yapay ↑!)
                </text>
              </g>

              <g transform="translate(588, 120)">
                <rect width="268" height="68" rx="8" fill={isDark ? '#1e293b' : '#f8fafc'} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <text x="10" y="18" fontSize="10" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                  2. Sönümleme Katsayısı (ζ ≈ 0.64–0.70)
                </text>
                <text x="10" y="34" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>
                  Sistemin salınımı ne hızla söndürdüğünü belirler.
                </text>
                <text x="10" y="48" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>
                  Hava kabarcığı ve pıhtı enerjiyi emer → Overdamped.
                </text>
                <text x="10" y="61" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#10b981">
                  Altın Kural: Damping hatası MAP’ı BOZMAZ!
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Visual 1B: Interactive Dynamic Response (Fast-Flush) & Transducer Level Simulator */}
        <div className={`rounded-xl border p-4 space-y-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-red-500" />
              <span className={`text-xs sm:text-sm font-bold ${headingColor}`}>
                İnteraktif Simülatör: Fast-Flush (Kare Dalga) Sönümleme &amp; Transdüser Seviye Hatası
              </span>
            </div>
            <span className={`text-[11px] font-mono tabular-nums ${subtleColor}`}>
              Gerçek Aort/Radial: 120/70 (MAP 87 mmHg)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <div className={`text-[11px] font-semibold mb-1.5 ${subtleColor}`}>
                  1. Sistemin Dinamik Yanıt (Sönümleme) Durumu
                </div>
                <div className="space-y-1.5">
                  {DAMPING_CONFIGS.map((cfg) => {
                    const active = cfg.id === dampingModeId;
                    return (
                      <button
                        key={cfg.id}
                        type="button"
                        onClick={() => setDampingModeId(cfg.id)}
                        className={`w-full px-3 py-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                          active
                            ? 'bg-red-600 text-white border-red-500'
                            : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-red-500/50'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-red-400'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold">{cfg.label}</span>
                          <span className={`font-mono text-[10px] ${active ? 'text-red-100' : subtleColor}`}>
                            {cfg.zeta}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Transducer Height Slider */}
              <div className={`p-3 rounded-xl border ${cardSurface}`}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`font-semibold ${headingColor}`}>2. Transdüser Seviyesi (Flebostatik Fark)</span>
                  <span className="font-mono tabular-nums font-bold text-red-600 dark:text-red-400">
                    {transducerOffsetCm === 0
                      ? '0 cm (İdeal)'
                      : transducerOffsetCm > 0
                        ? `${transducerOffsetCm} cm ALTTA (+${levelDelta})`
                        : `${Math.abs(transducerOffsetCm)} cm ÜSTTE (${levelDelta})`}
                  </span>
                </div>
                <input
                  type="range"
                  min={-30}
                  max={30}
                  step={5}
                  value={transducerOffsetCm}
                  onChange={(e) => setTransducerOffsetCm(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                  aria-label="Transdüserin flebostatik eksene göre yüksekliği"
                />
                <div className={`flex justify-between text-[10px] font-mono mt-1 ${subtleColor}`}>
                  <span>-30 cm (Yukarıda → Y. Düşük)</span>
                  <span>0 cm</span>
                  <span>+30 cm (Aşağıda → Y. Yüksek)</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${cardSurface}`}>
                <div className={`font-bold ${headingColor}`}>Kare Dalga (Fast-Flush) Yorumu:</div>
                <p className={bodyColor}>{damping.flushDescription}</p>
                <p className={`text-[11px] ${subtleColor}`}>
                  <strong>Tipik neden:</strong> {damping.causes}
                </p>
              </div>
            </div>

            {/* Right Dark Live Monitor */}
            <div className="lg:col-span-7 rounded-xl border bg-slate-950 border-slate-800 p-4 flex flex-col justify-between space-y-3 text-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div className="text-[11px] font-mono text-slate-400">
                  FAST-FLUSH KARE DALGA TESTİ &amp; ARTERİYEL TRASE
                </div>
                <div className="flex items-center gap-4 font-mono tabular-nums">
                  <div>
                    <span className="text-[10px] text-slate-400 mr-1.5">OKUNAN IBP:</span>
                    <span className="text-lg font-bold text-red-400">
                      {displayedSbp}/{displayedDbp}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 mr-1">MAP:</span>
                    <span
                      className={`text-lg font-bold ${
                        levelDelta === 0 ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      ({displayedMap})
                    </span>
                  </div>
                </div>
              </div>

              <svg viewBox="0 0 520 175" className="w-full h-auto">
                {/* Grid */}
                {[30, 65, 100, 135, 160].map((gy) => (
                  <line key={gy} x1="6" y1={gy} x2="514" y2={gy} stroke="#1e293b" strokeWidth="1" />
                ))}
                {/* Divider between Square Wave Test and Arterial Wave */}
                <line x1="226" y1="12" x2="226" y2="165" stroke="#334155" strokeWidth="1.2" strokeDasharray="4 3" />
                <text x="115" y="18" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#38bdf8">
                  1. FAST-FLUSH (300 mmHg KARE DALGA)
                </text>
                <text x="370" y="18" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#f87171">
                  2. SONUÇ ARTERİYEL DALGA FORMU
                </text>

                {/* Square Wave Path */}
                <path d={damping.flushPath} fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeLinejoin="round" />
                {/* Arterial Waveform Path */}
                <path d={damping.wavePath} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinejoin="round" />

                {/* MAP Reference Horizontal Line */}
                <line x1="232" y1="92" x2="510" y2="92" stroke="#10b981" strokeWidth="1.2" strokeDasharray="4 4" />
                <text x="508" y="88" textAnchor="end" fontSize="8.5" fontFamily="monospace" fill="#34d399">
                  MAP ({displayedMap})
                </text>
              </svg>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] border-t border-slate-800 pt-2.5">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-emerald-400">Damping Hatası Kuralı:</span>{' '}
                  <span className="text-slate-300">
                    SBP ({damping.sbpOffset >= 0 ? `+${damping.sbpOffset}` : damping.sbpOffset}) ve DBP (
                    {damping.dbpOffset >= 0 ? `+${damping.dbpOffset}` : damping.dbpOffset}) bozulur, <strong>MAP değişmez</strong>!
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-400">Seviye Hatası Kuralı:</span>{' '}
                  <span className="text-slate-300">
                    Transdüser kayması ({levelDelta >= 0 ? `+${levelDelta}` : levelDelta} mmHg) SBP, DBP ve <strong>MAP’ı eşit kaydırır</strong>!
                  </span>
                </div>
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
          <div className="w-8 h-8 rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            2
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Endikasyonlar ve Klinik Amaç
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              IBP yalnızca sürekli kan basıncı ölçmekle kalmaz; arteriyel dalga şekli üzerinden <strong>sıvı yanıtlılığı (PPV/SVV)</strong>,{' '}
              <strong>kontraktilite (dP/dt)</strong>, <strong>damar direnci (SVR)</strong> ve <strong>seri kan gazı</strong> erişimi sağlar.
            </p>
          </div>
        </div>

        {/* Visual 2: 4-Panel Indications & Hidden Physiology SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 182"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="İnvaziv arter basıncı klinik endikasyonları ve dalga formundan okunan fizyolojik veriler"
            >
              {/* Panel 1 */}
              <g transform="translate(8, 8)">
                <rect width="206" height="166" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#ef4444" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#ef4444">1. Hemodinamik İnstabilite</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Şok (septik, hemorajik, kardiyojenik)</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Vazopresör / inotrop titrasyonu</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kontrollü hipotansiyon / kriz</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• İndüksiyonda ani çöküş riski</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  (ciddi AS, feokromositoma, tamponad)</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#f87171">Sıfır kör pencere (Beat-to-Beat)</text>
              </g>

              {/* Panel 2 */}
              <g transform="translate(226, 8)">
                <rect width="206" height="166" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#0ea5e9">2. Yüksek Riskli Cerrahiler</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kardiyak cerrahi &amp; KPB (non-pulsatil)</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Aort / karotis / majör vasküler</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kraniyal beyin cerrahisi (CPP = MAP−ICP)</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Tek akciğer ventilasyonu / torasik</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Karaciğer nakli &amp; majör travma</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#38bdf8">Yüksek riskte uyanıkken tak!</text>
              </g>

              {/* Panel 3 */}
              <g transform="translate(444, 8)">
                <rect width="206" height="166" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f59e0b">3. Seri AKG &amp; NIBP Yetersizliği</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sık arteriyel kan gazı (PaO₂/PaCO₂)</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Seri Hb, laktat, K⁺, glukoz, ACT</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Morbid obezite / yanık (manşonsuz)</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• LVAD / VA-ECMO (NIBP çalışmaz)</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Hızlı AF / sık ekstrasistol</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#fbbf24">Tek girişle sürekli laboratuvar</text>
              </g>

              {/* Panel 4 */}
              <g transform="translate(662, 8)">
                <rect width="210" height="166" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#10b981" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#10b981">4. Dalga Formu Fizyolojisi</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Çıkış eğimi (dP/dt) → Kontraktilite</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sistolik alan → Atım hacmi (SV)</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Dikrotik çentik → Aort kapak kapanışı</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Diyastolik eğim → Damar direnci (SVR)</text>
                <text x="14" y="116" fontSize="9.5" fontWeight="700" fill="#34d399">• PPV &gt; %12–13 → Sıvı yanıtlılığı!</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">GDFT &amp; Nabız Kontur CO</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: TEKNİK KURULUM VE KALİBRASYON                                */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            3
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Teknik Kurulum, Seviyelendirme ve Kalibrasyon
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Doğru IBP ölçümü üç ayrı işlemin eksiksiz yapılmasına dayanır: <strong>Sıfırlama (Zeroing)</strong>,{' '}
              <strong>Seviyelendirme (Leveling)</strong> ve <strong>Fast-Flush Dinamik Yanıt Testi</strong>.
            </p>
          </div>
        </div>

        {/* Visual 3A: Phlebostatic Axis vs Tragus (Beach-Chair) Leveling SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="w-4 h-4 text-red-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              Kritik Seviyelendirme Şeması: Supin (Flebostatik Eksen) vs Oturur / Beach-Chair (Tragus / Beyin Seviyesi)
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 185"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Supin flebostatik eksen ve oturur pozisyon tragus seviyelendirme karşılaştırması"
            >
              {/* Left: Supine Phlebostatic Axis */}
              <rect x="8" y="8" width="424" height="168" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <text x="24" y="29" fontSize="11" fontWeight="700" fill="#10b981">
                1. Supin Pozisyon: Flebostatik Eksen (Kalp Seviyesi)
              </text>
              {/* Supine patient outline */}
              <circle cx="80" cy="84" r="16" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#64748b" strokeWidth="1.5" />
              <rect x="100" y="68" width="160" height="38" rx="14" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#64748b" strokeWidth="1.5" />
              {/* Phlebostatic line */}
              <line x1="24" y1="87" x2="412" y2="87" stroke="#10b981" strokeWidth="1.8" strokeDasharray="5 3" />
              <circle cx="152" cy="87" r="6" fill="#ef4444" />
              {/* Transducer box on line */}
              <rect x="316" y="74" width="84" height="26" rx="5" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
              <text x="358" y="90" textAnchor="middle" fontSize="9" fontWeight="700" fill="#10b981">Transdüser</text>
              <text x="24" y="128" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>
                • 4. interkostal aralık + orta aksiller hat kesişimi (Sağ atriyum).
              </text>
              <text x="24" y="144" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>
                • Masa yükseltildiğinde veya alçaltıldığında transdüser de mutlaka
              </text>
              <text x="24" y="158" fontSize="9.5" fontWeight="700" fill="#f59e0b">
                {'  '}masa ile birlikte taşınmalıdır (her 10 cm = 7.4 mmHg hata!).
              </text>

              {/* Right: Sitting / Beach-Chair Position */}
              <rect x="448" y="8" width="424" height="168" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f59e0b" strokeOpacity="0.6" />
              <text x="464" y="29" fontSize="11" fontWeight="700" fill="#f59e0b">
                2. Oturur / Beach-Chair Pozisyon: Tragus (Beyin Seviyesi!)
              </text>
              {/* Sitting patient silhouette */}
              <circle cx="525" cy="58" r="15" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke="#64748b" strokeWidth="1.5" />
              <path d="M 520 74 L 510 128 L 574 134" fill="none" stroke="#64748b" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
              {/* Tragus line (top) */}
              <line x1="464" y1="58" x2="854" y2="58" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="5 3" />
              <circle cx="525" cy="58" r="4.5" fill="#f59e0b" />
              <rect x="752" y="45" width="94" height="24" rx="5" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="799" y="60" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fbbf24">Tragus (CPP!)</text>

              {/* Heart line (bottom) */}
              <line x1="464" y1="106" x2="730" y2="106" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
              <circle cx="516" cy="106" r="4.5" fill="#ef4444" />
              {/* Vertical height gap ~25 cm */}
              <line x1="654" y1="58" x2="654" y2="106" stroke="#ef4444" strokeWidth="2" />
              <text x="662" y="80" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#f87171">Δh ≈ 25 cm</text>
              <text x="662" y="94" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#f87171">≈ −18 mmHg!</text>

              <text x="464" y="144" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>
                • Kalp seviyesinde MAP 70 görünürken beyinde gerçek MAP <strong>52 mmHg</strong>’dir!
              </text>
              <text x="464" y="159" fontSize="9.5" fontWeight="700" fill="#fbbf24">
                • Omuz (beach-chair) &amp; oturur kraniyotomide tragus (EAM) hizasına sıfırla!
              </text>
            </svg>
          </div>
        </div>

        {/* Arterial Sites Table + 4-Step Setup Checklist */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-7 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-700'}>
                  <th className="py-2.5 px-3 font-bold">Arter Bölgesi</th>
                  <th className="py-2.5 px-3 font-bold font-mono">Kateter</th>
                  <th className="py-2.5 px-3 font-bold font-mono">Amplifikasyon</th>
                  <th className="py-2.5 px-3 font-bold">Önemli Risk / Not</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {ARTERIAL_SITE_TABLE.map((row) => (
                  <tr
                    key={row.site}
                    className={isDark ? 'hover:bg-slate-800/40 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                  >
                    <td className="py-2 px-3 font-semibold">{row.site}</td>
                    <td className="py-2 px-3 font-mono tabular-nums whitespace-nowrap">{row.gauge}</td>
                    <td className="py-2 px-3 font-mono text-red-600 dark:text-red-400 whitespace-nowrap">{row.amplification}</td>
                    <td className="py-2 px-3">{row.risks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`xl:col-span-5 p-4 rounded-xl border space-y-2.5 ${mutedSurface}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-red-500" />
              <span className={`text-xs font-bold ${headingColor}`}>
                4 Adımlı Kurulum, Sıfırlama &amp; Dinamik Yanıt Protokolü
              </span>
            </div>
            <ul className={`space-y-2 text-xs leading-relaxed ${bodyColor}`}>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>1. SF Torbası (Heparinsiz) &amp; 300 mmHg:</strong> Güncel kılavuzlar HIT riskinden kaçınmak için
                  rutin heparinsiz %0.9 SF önerir; 300 mmHg basınç 2–4 mL/st sürekli akım sağlar.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>2. Sıfır Hava Kabarcığı + USG Rehberliği:</strong> Tüm hat ve musluklar hava kalmadan yıkanır; USG
                  rehberliğinde ilk giriş başarısı artar ve hematom/vazospazm azalır.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>3. Sıfırlama (Zeroing):</strong> 3-yollu musluğu hastaya kapat, atmosfere aç, monitörde{' '}
                  <strong>ZERO</strong> tuşuna bas (atmosferik 0 mmHg referansı); ardından musluğu tekrar hastaya aç.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>4. Fast-Flush (Kare Dalga Testi):</strong> Yıkama mandalını 1 sn çekip aniden bırak →{' '}
                  <strong>1.5–2 salınım</strong> görülüyorsa dinamik yanıt optimaldir!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: NORMAL VE PATOLOJİK DALGA FORMLARI (8 PATERN)                */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            4
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Normal ve Patolojik Dalga Formları (İnteraktif Arteriyel Monitör)
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Sayısal değerden önce <strong>arteriyel dalga formunu okuyun</strong>: sönümleme artefaktları, hipovolemi (PPV),
              kapak patolojileri (AS/AY), vazopleji ve IABP zamanlama hataları ilk bakışta dalga şeklinden tanınır.
            </p>
          </div>
        </div>

        {/* Pattern Selector */}
        <div className="flex flex-wrap gap-1.5">
          {IBP_PATTERNS.map((pattern) => {
            const active = pattern.id === activePatternId;
            return (
              <button
                key={pattern.id}
                type="button"
                onClick={() => setActivePatternId(pattern.id)}
                className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-red-600 text-white border-red-500'
                    : isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-red-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-red-400'
                }`}
              >
                {pattern.label}
              </button>
            );
          })}
        </div>

        {/* Dark Arterial Monitor Console */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 text-slate-100 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Waves className="w-4 h-4 text-red-400" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">{activePattern.label}</div>
                <div className="text-[11px] font-mono text-slate-400">{activePattern.statusText}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono tabular-nums">
              <div>
                <div className="text-[10px] text-red-300">ART (mmHg)</div>
                <div className="text-xl font-bold text-red-400">
                  {activePattern.sbp}/{activePattern.dbp}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">MAP</div>
                <div
                  className={`text-xl font-bold ${
                    activePattern.status === 'normal'
                      ? 'text-emerald-400'
                      : activePattern.status === 'warning'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                  }`}
                >
                  ({activePattern.map})
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">İndeks</div>
                <div className="text-xs font-bold text-sky-300">{activePattern.ppText}</div>
              </div>
            </div>
          </div>

          {/* Arterial Waveform Canvas */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 540 175"
              className="w-full min-w-[460px] h-auto"
              role="img"
              aria-label={`${activePattern.label} invaziv arteriyel basınç dalga formu`}
            >
              {/* Scale Grid */}
              {[24, 58, 92, 126, 158].map((gy, idx) => {
                const labels = ['160', '120', '80', '40', '0'];
                return (
                  <g key={gy}>
                    <line x1="34" y1={gy} x2="528" y2={gy} stroke="#1e293b" strokeWidth="1" />
                    <text x="28" y={gy + 3} textAnchor="end" fontSize="8.5" fontFamily="monospace" fill="#64748b">
                      {labels[idx]}
                    </text>
                  </g>
                );
              })}

              {/* Waveform Trace */}
              <path
                d={activePattern.path}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Clinical Interpretation Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-800 pt-3.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-red-300">Dalga Morfolojisi</div>
              <p className="text-slate-300 leading-relaxed">{activePattern.morphology}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-amber-300">Sık Klinik Nedenler</div>
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
          <div className="w-8 h-8 rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            5
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Limitasyonlar ve Artefaktlar
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              IBP "altın standart" olsa da sıfırlama hatası, masa hareketi, hava kabarcığı veya <strong>KPB sonrası radial–aortik basınç gradyanı</strong>{' '}
              gibi tuzaklar ciddi tedavi hatalarına yol açabilir.
            </p>
          </div>
        </div>

        {/* Visual 5: 3-Zone IBP Pitfalls SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              3 Bölgeli IBP Hata Haritası (Sönümleme · Seviye / Amplifikasyon · PPV Kısıtları)
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 168"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="İnvaziv arter basıncı artefaktları ve sınırlamaları haritası"
            >
              {/* Zone 1 */}
              <g transform="translate(8, 8)">
                <rect width="280" height="152" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#ef4444" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#ef4444">1. Damping &amp; Mekanik Artefakt</text>
                <text x="14" y="47" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Hava kabarcığı / pıhtı → Overdamped</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Uzun hat / çok musluk → Underdamped</text>
                <text x="14" y="81" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Bilek fleksiyonu → Ani düzleşme</text>
                <text x="14" y="98" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Yıkama torbası &lt;300 mmHg → Geri kan</text>
                <text x="14" y="132" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">Kural: Dampingde MAP doğru kalır!</text>
              </g>

              {/* Zone 2 */}
              <g transform="translate(300, 8)">
                <rect width="280" height="152" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f59e0b" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f59e0b">2. Seviye &amp; Bölgesel Gradyan</text>
                <text x="14" y="47" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Masa yükseldi, transdüser kaldı → Y. Yüksek</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Distal amplifikasyon (Ayak SBP +20!)</text>
                <text x="14" y="81" fontSize="9.5" fontWeight="700" fill="#fbbf24">• KPB sonrası radial–aortik gradyan:</text>
                <text x="14" y="97" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Radial gerçek aorttan 15–30 mmHg DÜŞÜK!</text>
                <text x="14" y="132" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#fbbf24">Şüphede femoral / aort kökü doğrula</text>
              </g>

              {/* Zone 3 */}
              <g transform="translate(592, 8)">
                <rect width="280" height="152" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#0ea5e9" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#0ea5e9">3. PPV / SVV Geçersizlik Koşulları</text>
                <text x="14" y="47" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Atriyal fibrilasyon / sık ekstrasistol</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Spontan solunum / düşük Vt (&lt;7 mL/kg)</text>
                <text x="14" y="81" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Açık göğüs (torakotomi / sternotomi)</text>
                <text x="14" y="98" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sağ ventrikül yetmezliği (yalancı ↑ PPV!)</text>
                <text x="14" y="132" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#38bdf8">Şartlar yoksa PPV’ye göre sıvı verme!</text>
              </g>
            </svg>
          </div>
        </div>

        {/* 7-Row Limitation Matrix */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-700'}>
                <th className="py-2.5 px-3 font-bold">Hata / Limitasyon</th>
                <th className="py-2.5 px-3 font-bold">Ölçüm Etkisi</th>
                <th className="py-2.5 px-3 font-bold">Mekanizma &amp; Çözüm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  cause: 'Transdüser Kalp Altında / Üstünde',
                  effect: '±7.4 mmHg / 10 cm (MAP dahil)',
                  col: 'text-amber-600 dark:text-amber-400',
                  fix: 'Masa her hareket ettiğinde transdüseri flebostatik eksene (otururda tragusa) hizala.',
                },
                {
                  cause: 'Hatta Hava Kabarcığı / Pıhtı',
                  effect: 'Overdamped (SBP ↓, DBP ↑)',
                  col: 'text-sky-600 dark:text-sky-400',
                  fix: 'Sıkıştırılabilir hava enerjiyi emer; hattı tahliye et, pıhtılı kateteri asla zorla yıkama.',
                },
                {
                  cause: 'Çok Uzun / Ekli Basınç Hattı',
                  effect: 'Underdamped (SBP ↑, DBP ↓)',
                  col: 'text-rose-600 dark:text-rose-400',
                  fix: 'Doğal frekans (fn) düşer, rezonans oluşur; ≤120 cm tek parça sert hat kullan.',
                },
                {
                  cause: 'Distal Nabız Amplifikasyonu',
                  effect: 'Periferde SBP ↑, MAP sabit',
                  col: 'text-amber-600 dark:text-amber-400',
                  fix: 'Yansıyan dalgalar dorsalis pedis/radial SBP’yi artırır; klinik kararlarda MAP’ı esas al.',
                },
                {
                  cause: 'KPB Sonrası Radial–Aortik Gradyan',
                  effect: 'Radial SBP/MAP 15–30 ↓',
                  col: 'text-rose-600 dark:text-rose-400',
                  fix: 'Isınma/vazokonstrüksiyonda periferik şantlanma olur; cerrahtan aort kökü basıncı veya femoral ile doğrula.',
                },
                {
                  cause: 'Sıfırlama (Zero) Kayması / Drift',
                  effect: 'Kademeli taban sapması',
                  col: 'text-amber-600 dark:text-amber-400',
                  fix: 'Uzun vakalarda ve beklenmedik basınç değişimlerinde NIBP ile çapraz kontrol yap ve yeniden sıfırla.',
                },
                {
                  cause: 'Yüksek Doz Vazopresörde Radial Spazm',
                  effect: 'Sönümlü / Yalancı Düşük',
                  col: 'text-rose-600 dark:text-rose-400',
                  fix: 'Aşırı vazokonstriksiyon radial akımı keser; ağır şokta femoral arter kateterine geç.',
                },
              ].map((row) => (
                <tr
                  key={row.cause}
                  className={isDark ? 'hover:bg-slate-800/40 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                >
                  <td className="py-2.5 px-3 font-semibold">{row.cause}</td>
                  <td className={`py-2.5 px-3 font-mono font-bold whitespace-nowrap ${row.col}`}>{row.effect}</td>
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
          <div className="w-8 h-8 rounded-lg bg-red-500/15 text-red-600 dark:text-red-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            6
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Komplikasyonlar ve Güvenlik
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Arteriyel kanülasyon görece güvenli olsa da <strong>kazara intra-arteriyel ilaç enjeksiyonu</strong>,{' '}
              <strong>örtü altında fark edilmeyen hat ayrılması (eksangüinasyon)</strong> ve <strong>retrograd serebral hava embolisi</strong>{' '}
              katastrofik ancak tamamen önlenebilir komplikasyonlardır.
            </p>
          </div>
        </div>

        {/* Visual 6: 3-Panel IBP Safety SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              Perioperatif IBP Güvenlik Şeması (İskemi/Emboli · İntra-Arteriyel İlaç · Hat Ayrılması &amp; Hematom)
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 185"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="İnvaziv arter basıncı komplikasyonları ve güvenlik önlemleri"
            >
              {/* Panel 1: Thrombosis & Retrograde Cerebral Embolism */}
              <g transform="translate(8, 8)">
                <rect width="280" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#ef4444" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#ef4444">1. İskemi &amp; Retrograd Emboli</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Geçici tromboz (%15–25); kalıcı el</text>
                <text x="14" y="63" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  iskemisi/nekrozu çok nadir (&lt;%0.1).</text>
                <text x="14" y="84" fontSize="9.5" fontWeight="700" fill="#f87171">• Hızlı / Yüksek Hacimli Flaş YASAK!</text>
                <text x="14" y="99" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Radialden &gt;2–3 mL hızlı yıkama (öz. bebekte</text>
                <text x="14" y="113" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  &amp; sağ kolda) karotide ters hava/pıhtı atar!</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">
                  ✓ 20G kateter, parmak renk/SpO₂ takibi
                </text>
              </g>

              {/* Panel 2: Accidental Intra-Arterial Drug Injection */}
              <g transform="translate(300, 8)">
                <rect width="280" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f59e0b" strokeOpacity="0.7" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f59e0b">2. Kazara İntra-Arteriyel İlaç!</text>
                <rect x="14" y="36" width="252" height="24" rx="5" fill="#dc2626" fillOpacity="0.22" stroke="#ef4444" />
                <text x="140" y="52" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fca5a5">
                  KIRMIZI ETİKET · İLAÇ VERME!
                </text>
                <text x="14" y="78" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Tiyopental, fenitoin, vazopresör, K⁺ →</text>
                <text x="14" y="93" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  şiddetli vazospazm, kristal tromboz, gangren.</text>
                <text x="14" y="114" fontSize="9.5" fontWeight="700" fill="#fbbf24">✓ Önlem: Enjeksiyon portsuz hat,</text>
                <text x="14" y="129" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  kırmızı çizgili set + açık etiketleme.</text>
                <text x="14" y="152" fontSize="8.5" fontFamily="monospace" fill="#94a3b8">
                  Acil olursa: Kateteri çekme, SF+vazodilatatör!
                </text>
              </g>

              {/* Panel 3: Disconnection Hemorrhage & Infection */}
              <g transform="translate(592, 8)">
                <rect width="280" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#0ea5e9" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#0ea5e9">3. Hat Ayrılması, Hematom &amp; CRBSI</text>
                <text x="14" y="48" fontSize="9.5" fontWeight="700" fill="#f87171">• Sessiz Eksangüinasyon Riski:</text>
                <text x="14" y="63" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Örtü altında ayrılan Luer-lock dakikalar içinde</text>
                <text x="14" y="77" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  masif kanama yapar → alt alarm ASLA kapanmaz!</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Femoralde retroperitoneal hematom, radialde</text>
                <text x="14" y="114" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  median sinir basısı / pseudoanevrizma.</text>
                <text x="14" y="135" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Çekim sonrası ≥5–10 dk sıkı bası (femoral 15 dk).</text>
                <text x="14" y="153" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">
                  Steril bariyer + Klorheksidin
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* 2 Clinical Safety Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold flex items-center gap-1.5 ${headingColor}`}>
              <Droplets className="w-3.5 h-3.5 text-red-500" />
              <span>Kazara İntra-Arteriyel Enjeksiyon Olursa Ne Yapılır?</span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Enjeksiyonu derhal durdurun, ancak <strong>kateteri HEMEN ÇEKMEYİN</strong>! Aynı kateterden SF ile seyreltme yapın,
              vazospazm için intra-arteriyel lidokain/papaverin veya nikardipin değerlendirin, sistemik antikoagülasyon (heparin),
              ekstremite elevasyonu, sempatik blok (stellat/brakiyal pleksus) ve acil damar cerrahisi konsültasyonu sağlayın.
            </p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold flex items-center gap-1.5 ${headingColor}`}>
              <Info className="w-3.5 h-3.5 text-sky-500" />
              <span>Modifiye Allen Testi vs USG &amp; Parmak Perfüzyon Takibi</span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Klasik Modifiye Allen testinin iskemiyi öngörmedeki duyarlılığı düşüktür; günümüzde <strong>USG ile damar çapı/akımı</strong>{' '}
              değerlendirmek ve girişim sonrası parmak rengi, sıcaklık ile <strong>aynı elde kapiller dolum/SpO₂</strong> izlemek çok
              daha güvenilirdir. Soluk/soğuk elde kateter derhal çekilir.
            </p>
          </div>
        </div>

        {/* References */}
        <div
          className={`pt-3 border-t flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] ${
            isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
          }`}
        >
          <span className="inline-flex items-center gap-1 font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-red-500" />
            Kaynaklar:
          </span>
          <span>Miller’s Anesthesia (Cardiovascular Monitoring)</span>
          <span aria-hidden="true">·</span>
          <span>Gardner RM — Direct Blood Pressure Measurement: Dynamic Response (Anesthesiology)</span>
          <span aria-hidden="true">·</span>
          <span>Saugel B et al. — Arterial Line Management &amp; Waveform Analysis</span>
          <span aria-hidden="true">·</span>
          <span>ASA Basic Monitoring Standards</span>
        </div>
      </section>
    </div>
  );
};
