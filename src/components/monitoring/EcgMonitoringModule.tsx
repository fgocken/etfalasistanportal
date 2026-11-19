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

interface EcgMonitoringModuleProps {
  isDark: boolean;
}

type LeadConfigId = '3-lead' | 'cs5' | '5-lead';
type ColorStandard = 'iec' | 'aha';
type EcgPatternId =
  | 'nsr'
  | 'ischemia'
  | 'stemi'
  | 'afib'
  | 'hyperkalemia'
  | 'vtach'
  | 'avblock'
  | 'artifact';

interface LeadConfig {
  id: LeadConfigId;
  label: string;
  shortTag: string;
  leadsShown: string;
  ischemiaSensitivity: number;
  arrhythmiaRating: string;
  note: string;
}

const LEAD_CONFIGS: LeadConfig[] = [
  {
    id: '3-lead',
    label: '3-Elektrot Standart (DII)',
    shortTag: '3-Elektrot (DII)',
    leadsShown: 'Tek seferde 1 derivasyon (I, II veya III)',
    ischemiaSensitivity: 33,
    arrhythmiaRating: 'Mükemmel (En büyük P dalgası)',
    note: 'Sağlıklı, düşük kardiyak riskli kısa vakalarda ritim takibi için uygundur. Ancak tek başına DII intraoperatif miyokard iskemisinin yalnızca ~%33’ünü yakalar.',
  },
  {
    id: 'cs5',
    label: '3-Elektrot Modifiye CS5 (V5 Taklidi)',
    shortTag: 'Modifiye CS5',
    leadsShown: 'Monitörde DI seçilir (RA: Sağ klavikula → LA: V5)',
    ischemiaSensitivity: 75,
    arrhythmiaRating: 'Orta (İskemi odaklı)',
    note: '5-elektrot kablo yoksa yüksek riskli hastada hayat kurtarır: RA sağ klavikula altına, LA sol 5. İKA ön aksiller hatta (V5), LL sol alt toraksa konur ve monitörden Derivasyon I seçilir (~%75 iskemi duyarlılığı!).',
  },
  {
    id: '5-lead',
    label: '5-Elektrot Standart (Eşzamanlı DII + V5)',
    shortTag: '5-Elektrot (DII + V5)',
    leadsShown: '7 derivasyon (I, II, III, aVR, aVL, aVF, V5)',
    ischemiaSensitivity: 82,
    arrhythmiaRating: 'Altın Standart (Ritim + İskemi)',
    note: 'Eşzamanlı DII (aritmi & inferior iskemi) + V5 (sol ventrikül lateral/anterior iskemi) ile intraoperatif iskeminin %80–85’i yakalanır (V4 eklenirse %96+). Kardiyak riskli tüm hastalarda standarttır.',
  },
];

interface EcgPattern {
  id: EcgPatternId;
  label: string;
  badge: string;
  hr: string;
  stVal: string;
  leadLabel: string;
  status: 'normal' | 'warning' | 'critical';
  statusText: string;
  path: string;
  morphology: string;
  causes: string[];
  action: string;
}

const ECG_PATTERNS: EcgPattern[] = [
  {
    id: 'nsr',
    label: 'Normal Sinüs Ritmi (NSR)',
    badge: 'Referans',
    hr: '72',
    stVal: '0.0 mm',
    leadLabel: 'DII · 25 mm/sn · Diag',
    status: 'normal',
    statusText: 'Düzenli Sinüs Ritmi · İzoelektrik ST',
    path:
      'M 8 102 L 32 102 Q 40 90, 48 102 L 60 102 L 64 108 L 71 34 L 78 118 L 83 102 L 100 102 Q 114 78, 128 102 L 164 102 ' +
      'Q 172 90, 180 102 L 192 102 L 196 108 L 203 34 L 210 118 L 215 102 L 232 102 Q 246 78, 260 102 L 296 102 ' +
      'Q 304 90, 312 102 L 324 102 L 328 108 L 335 34 L 342 118 L 347 102 L 364 102 Q 378 78, 392 102 L 428 102 ' +
      'Q 436 90, 444 102 L 456 102 L 460 108 L 467 34 L 474 118 L 479 102 L 496 102 Q 504 86, 512 96',
    morphology:
      'Her QRS öncesinde pozitif P dalgası (DII), PR aralığı 120–200 ms, dar QRS (<120 ms), izoelektrik ST segmenti ve konkordan T dalgası. R-R aralıkları tamamen düzenlidir.',
    causes: ['Normal sinoatriyal düğüm aktivitesi ve AV iletim', 'Normotermik, dengeli perioperatif hemodinami'],
    action: 'Bazal referans ritim olarak kaydedilir; vaka boyunca ST trendi bu bazale göre izlenir.',
  },
  {
    id: 'ischemia',
    label: 'Miyokard İskemisi (ST Depresyonu ≥2 mm)',
    badge: 'V5 ST ↓',
    hr: '108',
    stVal: '-2.4 mm',
    leadLabel: 'V5 · Diagnostik (0.05–150 Hz)',
    status: 'critical',
    statusText: 'Yatay / Aşağı Eğimli ST Depresyonu · Subendokardiyal İskemi',
    path:
      'M 8 98 L 24 98 Q 30 88, 36 98 L 46 98 L 49 103 L 55 34 L 61 118 L 65 116 L 86 122 Q 96 104, 108 98 L 128 98 ' +
      'Q 134 88, 140 98 L 150 98 L 153 103 L 159 34 L 165 118 L 169 116 L 190 122 Q 200 104, 212 98 L 232 98 ' +
      'Q 238 88, 244 98 L 254 98 L 257 103 L 263 34 L 269 118 L 273 116 L 294 122 Q 304 104, 316 98 L 336 98 ' +
      'Q 342 88, 348 98 L 358 98 L 361 103 L 367 34 L 373 118 L 377 116 L 398 122 Q 408 104, 420 98 L 440 98 ' +
      'Q 446 88, 452 98 L 462 98 L 465 103 L 471 34 L 477 118 L 481 116 L 502 122 L 512 108',
    morphology:
      'V5 derivasyonunda J+60 ms noktasında izoelektrik hatta göre ≥ 1–2 mm yatay veya aşağı eğimli (downsloping) ST depresyonu ve eşlik eden taşikardi.',
    causes: [
      'Miyokard O₂ sunum/talep dengesizliği (taşikardi, hipotansiyon, hipertansiyon)',
      'Akut anemi / kanama, hipoksi, hipotermi, derin olmayan anestezi (ağrı)',
      'Koroner arter darlığı (Tip 2 perioperatif MI mekanizması)',
    ],
    action:
      '1) Monitörü Diagnostik moda alıp doğrula! 2) %100 O₂ ver, anestezi/analjeziyi optimize et, 3) Tansiyonu koru (MAP ≥ 65) + taşikardiyi kır (Esmolol), 4) Hb/kan gazı bak; devam ederse Nitrogliserin ve 12-derivasyon EKG + Kardiyoloji!',
  },
  {
    id: 'stemi',
    label: 'Transmural İskemi / STEMI (ST Elevasyonu)',
    badge: 'ST ↑↑ ACİL',
    hr: '96',
    stVal: '+3.2 mm',
    leadLabel: 'DII / V5 · Diagnostik',
    status: 'critical',
    statusText: 'KONVEKS ST ELEVASİYONU · Akut Koroner Oklüzyon / Spazm!',
    path:
      'M 8 106 L 26 106 Q 33 96, 40 106 L 50 106 L 53 112 L 59 38 L 65 64 C 76 56, 94 56, 108 106 L 138 106 ' +
      'Q 145 96, 152 106 L 162 106 L 165 112 L 171 38 L 177 64 C 188 56, 206 56, 220 106 L 250 106 ' +
      'Q 257 96, 264 106 L 274 106 L 277 112 L 283 38 L 289 64 C 300 56, 318 56, 332 106 L 362 106 ' +
      'Q 369 96, 376 106 L 386 106 L 389 112 L 395 38 L 401 64 C 412 56, 430 56, 444 106 L 474 106 ' +
      'Q 481 96, 488 106 L 498 106 L 504 42 L 512 64',
    morphology:
      'J noktasında ≥ 1–2 mm kubbe/konveks ST segment yükselmesi (“tombstone / mezar taşı” görünümü) ve T dalgasıyla birleşme.',
    causes: [
      'Akut koroner plak rüptürü / tromboz (Tip 1 MI)',
      'Koroner arter spazmı (vazopresör, Kounis sendromu / alerjik koroner spazm)',
      'Koroner hava embolisi (kardiyak/torasik cerrahi — özellikle RCA / DII!)',
    ],
    action:
      'ACİL! Cerrahı uyar (mümkünse cerrahiyi hızla sonlandır), 12-derivasyon EKG + acil Kardiyoloji/anjiyografi aktivasyonu, %100 O₂, hemodinamiyi koru, spazm düşünülüyorsa IV Nitrogliserin!',
  },
  {
    id: 'afib',
    label: 'Atriyal Fibrilasyon (Hızlı Ventriküler Yanıt)',
    badge: 'Düzensiz R-R',
    hr: '136',
    stVal: '-0.4 mm',
    leadLabel: 'DII · Ritim Takibi',
    status: 'warning',
    statusText: 'P Dalgası Yok · Tamamen Düzensiz R-R · Hızlı Yanıt',
    path:
      'M 8 102 L 15 98 L 22 105 L 29 99 L 36 104 L 41 36 L 47 116 L 52 102 L 60 98 L 68 105 L 74 96 L 82 104 ' +
      'L 88 38 L 94 115 L 99 101 L 108 105 L 116 97 L 125 104 L 134 99 L 144 105 L 153 98 L 160 36 L 166 116 L 172 102 ' +
      'L 180 98 L 188 104 L 195 36 L 201 116 L 207 101 L 216 105 L 224 98 L 234 104 L 244 99 L 254 105 L 264 98 L 274 104 ' +
      'L 280 37 L 286 116 L 292 102 L 302 98 L 310 105 L 318 99 L 324 36 L 330 116 L 336 102 L 346 98 L 355 104 L 365 99 ' +
      'L 375 105 L 385 98 L 394 104 L 400 36 L 406 116 L 412 102 L 422 98 L 430 105 L 438 99 L 444 37 L 450 116 L 456 102 L 472 99 L 486 104 L 512 100',
    morphology:
      'Belirgin P dalgaları tamamen kaybolmuştur; bazal hatta düzensiz fibrilasyon (f) dalgaları ve tamamen düzensiz R-R aralıkları (irregularly irregular) görülür.',
    causes: [
      'Cerrahi stres, hipovolemi, hipoksi, hipokalemi / hipomagnezemi',
      'Torasik/kardiyak cerrahi, santral kateter kılavuz tel irritasyonu',
      'Hipertiroidi, sepsis, önceden mevcut yapısal kalp hastalığı',
    ],
    action:
      'Hemodinami anstabilse (hipotansiyon, iskemi, akciğer ödemi) → DERHAL senkronize kardiyoversiyon (120–200 J bifazik)! Stabilse tetikleyiciyi (sıvı, K⁺/Mg²⁺, ağrı) düzelt ve hız kontrolü (Esmolol, Metoprolol veya Amiodaron) uygula.',
  },
  {
    id: 'hyperkalemia',
    label: 'Hiperkalemi (Sivri “Çadır” T → Geniş QRS)',
    badge: 'K⁺ > 6.5!',
    hr: '64',
    stVal: '+0.8 mm',
    leadLabel: 'V5 / DII · Elektrolit',
    status: 'critical',
    statusText: 'Dar Tabanlı Sivri T Dalgası & Genişleyen QRS · Arrest Riski!',
    path:
      'M 8 106 L 30 106 Q 38 101, 46 106 L 62 106 L 70 118 L 82 44 L 94 124 L 104 106 L 116 106 L 128 24 L 140 106 L 182 106 ' +
      'Q 190 101, 198 106 L 214 106 L 222 118 L 234 44 L 246 124 L 256 106 L 268 106 L 280 24 L 292 106 L 334 106 ' +
      'Q 342 101, 350 106 L 366 106 L 374 118 L 386 44 L 398 124 L 408 106 L 420 106 L 432 24 L 444 106 L 486 106 L 512 106',
    morphology:
      'K⁺ 5.5–6.5: Dar tabanlı, simetrik, uzun sivri “çadır” T dalgaları. K⁺ 6.5–7.5: PR uzaması, P dalgasında düzleşme/kayıp ve QRS genişlemesi. K⁺ >8: Sinüs dalgası (sine wave) → VF/Asistoli!',
    causes: [
      'Böbrek yetmezliği, masif eritrosit transfüzyonu, turnike/reperfüzyon sendromu',
      'Süksinilkolin (yanık, denervasyon, immobilizasyon, ezilme/rabdomiyoliz!)',
      'Malign hipertermi, ciddi metabolik/respiratuvar asidoz',
    ],
    action:
      'ACİL MEMBRAN STABİLİZASYONU: 1) IV Kalsiyum Glukonat %10 (10–20 mL) veya Kalsiyum Klorür %10 (5–10 mL) — 1–3 dk’da EKG’yi düzeltir! 2) İnsülin (10 Ü) + Dekstroz + hiperventilasyon + Salbutamol + K⁺ içeren sıvıları kes.',
  },
  {
    id: 'vtach',
    label: 'Monomorfik Ventriküler Taşikardi (VT)',
    badge: 'ŞOKLANABİLİR',
    hr: '176',
    stVal: '--',
    leadLabel: 'DII · KRİTİK ARİTMİ',
    status: 'critical',
    statusText: 'GENİŞ KOMPLEKSLİ HIZLI RİTİM · NABIZ KONTROLÜ YAP!',
    path:
      'M 8 102 C 16 102, 22 28, 34 28 C 46 28, 52 138, 64 138 C 76 138, 82 28, 94 28 C 106 28, 112 138, 124 138 ' +
      'C 136 138, 142 28, 154 28 C 166 28, 172 138, 184 138 C 196 138, 202 28, 214 28 C 226 28, 232 138, 244 138 ' +
      'C 256 138, 262 28, 274 28 C 286 28, 292 138, 304 138 C 316 138, 322 28, 334 28 C 346 28, 352 138, 364 138 ' +
      'C 376 138, 382 28, 394 28 C 406 28, 412 138, 424 138 C 436 138, 442 28, 454 28 C 466 28, 472 138, 484 138 C 496 138, 502 48, 512 38',
    morphology:
      'Düzenli, çok hızlı (>150/dk) ve geniş (>120 ms) ventriküler kompleksler; P dalgaları gizli veya AV dissosiye.',
    causes: [
      'Akut miyokard iskemisi / enfarktüs, skar dokusu',
      'Hipokalemi, hipomagnezemi, lokal anestezik sistemik toksisitesi (LAST — bupivakain!)',
      'Santral venöz kateter kılavuz telinin sağ ventriküle teması',
    ],
    action:
      'DERHAL arteriyel/karotis nabzı kontrol et! Nabız YOKSA → Anında defibrilasyon (200 J bifazik) + KPR! Nabız var ama hipotansifse → Senkronize kardiyoversiyon (100 J)! Stabilse → Amiodaron 150 mg IV (10 dk’da) + elektrolit/iskemi düzelt.',
  },
  {
    id: 'avblock',
    label: 'Tam AV Blok (3. Derece · AV Dissosiyasyon)',
    badge: 'HR 34!',
    hr: '34',
    stVal: '0.0 mm',
    leadLabel: 'DII · İletim Bloğu',
    status: 'critical',
    statusText: 'P ve QRS Birbirinden Bağımsız · Kaçış Ritmi',
    path:
      'M 8 104 L 22 104 Q 29 92, 36 104 L 78 104 L 84 114 L 93 36 L 103 126 L 112 104 Q 124 88, 136 104 ' +
      'L 146 104 Q 153 92, 160 104 L 266 104 Q 273 92, 280 104 L 316 104 L 322 114 L 331 36 L 341 126 L 350 104 Q 362 88, 374 104 ' +
      'L 392 104 Q 399 92, 406 104 L 512 104',
    morphology:
      'Atriyal P dalgaları düzenli (~75/dk) ancak hiçbir P dalgası ventriküle iletilmiyor; altta bağımsız, yavaş (~30–40/dk) geniş ventriküler kaçış QRS’leri mevcut (tam AV dissosiyasyon).',
    causes: [
      'İnferior MI (RCA), dejeneratif iletim sistemi hastalığı, kapak cerrahisi',
      'Yüksek doz beta-bloker / kalsiyum kanal blokeri / digoksin / deksmedetomidin',
      'Şiddetli vagal refleks (laringoskopi, göz/mezenter traksiyonu, pnömoperitonyum)',
    ],
    action:
      'Cerrahi vagal uyaranı durdur! Atropin 0.5–1 mg IV dene (infranodal blokta etkisiz kalabilir!), yanıt yoksa derhal Transkütan Pacing pedlerini yapıştırıp pacing başlat ve İzoproterenol/Adrenalin infüzyonu hazırla.',
  },
  {
    id: 'artifact',
    label: 'Elektrokoter (EMI) / Titreme Artefaktı',
    badge: 'ARTEFAKT',
    hr: '214?',
    stVal: '--',
    leadLabel: 'DII · Parazit Uyarısı',
    status: 'warning',
    statusText: 'Koter / Titreme Gürültüsü · SpO₂ / Arter Trasesine Bak!',
    path:
      'M 8 100 L 14 78 L 20 124 L 26 62 L 32 134 L 38 72 L 44 128 L 50 48 L 56 140 L 62 76 L 68 122 L 74 54 L 80 138 ' +
      'L 86 68 L 92 126 L 98 58 L 104 134 L 110 74 L 116 118 L 122 44 L 128 142 L 134 70 L 140 124 L 146 60 L 152 136 ' +
      'L 158 78 L 164 120 L 170 50 L 176 138 L 182 66 L 188 128 L 194 56 L 200 132 L 206 72 L 212 122 L 218 46 L 224 140 ' +
      'L 230 68 L 236 126 L 242 54 L 248 134 L 254 74 L 260 118 L 266 52 L 272 138 L 278 64 L 284 128 L 290 58 L 296 134 ' +
      'L 302 70 L 308 122 L 314 48 L 320 140 L 326 66 L 332 126 L 338 56 L 344 136 L 350 74 L 356 120 L 362 50 L 368 138 ' +
      'L 374 68 L 380 128 L 386 60 L 392 132 L 398 76 L 404 120 L 410 52 L 416 138 L 422 66 L 428 126 L 434 58 L 440 134 ' +
      'L 446 72 L 452 122 L 458 48 L 464 140 L 470 68 L 476 128 L 482 56 L 488 134 L 494 74 L 502 118 L 512 96',
    morphology:
      'Yüksek frekanslı, düzensiz, kaotik elektrik paraziti — ilk bakışta ventriküler fibrilasyon (VF) veya polimorfik VT’yi taklit edebilir!',
    causes: [
      'Monopolar elektrokoter (yüksek frekanslı radyo-dalga girişimi)',
      'Postoperatif titreme (shivering), Parkinson tremoru, gevşek/kurumuş elektrot',
      'Kardiyopulmoner baypas pompa başlığı veya 50 Hz şebeke paraziti',
    ],
    action:
      'ASLA körlemesine şoklama! Önce SpO₂ pletismografi veya invaziv arter dalga formuna ve hastanın nabzına bak: nabız dalgası düzenliyse bu kesinlikle artefakttır! Elektrot jelini yenile, koter kablosunu EKG kablolarından uzaklaştır.',
  },
];

interface LimitationRow {
  factor: string;
  category: string;
  effect: 'false-st' | 'artifact' | 'blind';
  effectLabel: string;
  mechanism: string;
  remedy: string;
}

const LIMITATION_ROWS: LimitationRow[] = [
  {
    factor: 'Nabızsız Elektriksel Aktivite (PEA)',
    category: 'Fizyolojik Kör Nokta',
    effect: 'blind',
    effectLabel: 'Mekanik Pompayı Göstermez!',
    mechanism:
      'EKG yalnızca elektriksel depolarizasyonu ölçer; masif hemoraji, tamponad veya gerilim pnömotoraksında normal sinüs ritmi varken kardiyak debi 0 olabilir.',
    remedy: 'EKG’yi her zaman mekanik perfüzyon göstergesiyle (SpO₂ pleth, NIBP/arter hattı, EtCO₂) birlikte değerlendir.',
  },
  {
    factor: 'Monitör Filtre Modu (0.5 – 40 Hz)',
    category: 'Sinyal İşleme',
    effect: 'false-st',
    effectLabel: 'Yalancı ST Elev./Depresyon',
    mechanism:
      '0.5 Hz yüksek-geçişli (high-pass) filtre düşük frekanslı ST segmentini faz kaymasına uğratarak yapay ST sapması oluşturabilir.',
    remedy: 'ST değişikliği görüldüğünde mutlaka Diagnostik moda (0.05–150 Hz) geçerek doğrula.',
  },
  {
    factor: 'LBBB, Pacemaker Ritmi, LVH, Digoksin',
    category: 'Bazal Anormallik',
    effect: 'false-st',
    effectLabel: 'ST İskemi Analizi Bozulur',
    mechanism:
      'Sekonder repolarizasyon değişiklikleri klasik ST segmenti iskemi kriterlerini maskeler veya taklit eder.',
    remedy: 'Yeni LBBB’de Sgarbossa kriterlerini bil; yüksek riskli vakada TEE veya troponin/hemodinamiye ağırlık ver.',
  },
  {
    factor: 'Monopolar Elektrokoter (EMI)',
    category: 'Elektromanyetik',
    effect: 'artifact',
    effectLabel: 'VF / VT Taklidi Parazit',
    mechanism:
      'Yüksek frekanslı koter enerjisi EKG yükselticisini doyurarak kaotik parazit üretir ve kalp hızı sayacını bozar.',
    remedy: 'Koter sırasında nabız takibini SpO₂ pletismografi veya arteriyel dalga formundan yap; bipolar koter tercih et.',
  },
  {
    factor: 'Titreme (Shivering) / Parkinson Tremoru',
    category: 'Kas Artefaktı',
    effect: 'artifact',
    effectLabel: 'Yalancı AF / Flutter / VT',
    mechanism:
      'İskelet kası EMG potansiyelleri (4–8 Hz tremor) bazal hatta düzenli testere/fibrilasyon dalgaları bindirir.',
    remedy: 'Elektrotları ekstremite yerine gövdedeki kemik çıkıntılara yakın (klavikula/kosta altı) yerleştir ve hastayı ısıt.',
  },
  {
    factor: 'Yanlış Elektrot Yerleşimi (RA–LA Tersliği)',
    category: 'Kurulum Hatası',
    effect: 'false-st',
    effectLabel: 'Yalancı Aks / Negatif DI',
    mechanism:
      'Sağ–sol kol kablolarının yer değiştirmesi DI’de ters P/QRS/T ve yalancı sağ aks/dekstrokardi görünümü yaratır.',
    remedy: 'DI’de beklenmedik negatif P ve QRS görürsen önce elektrot renklerini (IEC vs. AHA) kontrol et!',
  },
  {
    factor: 'Kurumuş Jel / Gevşek Elektrot / 50 Hz',
    category: 'Cilt Empedansı',
    effect: 'artifact',
    effectLabel: 'Bazal Hat Salınımı / Kalın Hat',
    mechanism:
      'Yüksek cilt-elektrot empedansı CMRR’yi düşürerek 50 Hz şebeke gürültüsü ve solunumla bazal hat kaymasına yol açar.',
    remedy: 'Cildi alkolle silip kurula, taze Ag/AgCl jel elektrot yapıştır ve kabloları güç kablolarından uzak tut.',
  },
  {
    factor: 'Pacemaker Spike Çift Sayımı',
    category: 'Cihaz Algoritması',
    effect: 'artifact',
    effectLabel: 'Yalancı Yüksek HR (2×)',
    mechanism:
      'Pacer algılama kapalıysa monitör hem büyük unipolar pil uyarısını hem QRS’yi sayarak kalp hızını iki kat gösterebilir (veya asistoli anında yalnızca spike’ı nabız sanabilir!).',
    remedy: 'Kalıcı/geçici pili olan her hastada monitör menüsünden “Pacer Modu”nu AÇ ve nabzı pleth/arterden doğrula.',
  },
];

const SECTION_LINKS = [
  { id: 'ecg-sec-1', num: '1', label: 'Fizik & Mekanizma' },
  { id: 'ecg-sec-2', num: '2', label: 'Endikasyonlar' },
  { id: 'ecg-sec-3', num: '3', label: 'Kurulum & Renkler' },
  { id: 'ecg-sec-4', num: '4', label: '8 EKG Paterni' },
  { id: 'ecg-sec-5', num: '5', label: 'Limitasyonlar' },
  { id: 'ecg-sec-6', num: '6', label: 'Komplikasyonlar' },
];

export const EcgMonitoringModule: React.FC<EcgMonitoringModuleProps> = ({ isDark }) => {
  const [leadConfigId, setLeadConfigId] = useState<LeadConfigId>('5-lead');
  const [colorStandard, setColorStandard] = useState<ColorStandard>('iec');
  const [activePatternId, setActivePatternId] = useState<EcgPatternId>('nsr');

  const activeConfig =
    LEAD_CONFIGS.find((c) => c.id === leadConfigId) ?? LEAD_CONFIGS[2];
  const activePattern =
    ECG_PATTERNS.find((p) => p.id === activePatternId) ?? ECG_PATTERNS[0];

  // Electrode Colors according to IEC (Europe/Turkey) vs AHA (USA)
  const electrodeColors =
    colorStandard === 'iec'
      ? {
          ra: { fill: '#ef4444', text: '#ffffff', code: 'R (Kırmızı)' },
          la: { fill: '#eab308', text: '#0f172a', code: 'L (Sarı)' },
          ll: { fill: '#22c55e', text: '#ffffff', code: 'F (Yeşil)' },
          rl: { fill: '#1e293b', text: '#ffffff', code: 'N (Siyah)' },
          v5: { fill: '#f8fafc', text: '#0f172a', code: 'C (Beyaz)' },
        }
      : {
          ra: { fill: '#f8fafc', text: '#0f172a', code: 'RA (Beyaz)' },
          la: { fill: '#1e293b', text: '#ffffff', code: 'LA (Siyah)' },
          ll: { fill: '#ef4444', text: '#ffffff', code: 'LL (Kırmızı)' },
          rl: { fill: '#22c55e', text: '#ffffff', code: 'RL (Yeşil)' },
          v5: { fill: '#92400e', text: '#ffffff', code: 'V5 (Kahve)' },
        };

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
            ? 'bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border-emerald-500/30'
            : 'bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 border-emerald-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span
                className={`px-2 py-0.5 rounded ${
                  isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                ASA Standart II · Dolaşım (Continuous)
              </span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                6 Bölümlü Görsel &amp; İnteraktif Monitörizasyon Rehberi
              </span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              3 / 5 Derivasyon EKG (Perioperatif Ritim &amp; İskemi)
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Einthoven üçgeni ve Wilson prekordiyal referansıyla kardiyak elektriksel aktiviteyi kesintisiz kaydeden;{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>DII ile aritmi</strong>,{' '}
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>V5 ile miyokard iskemisi (%80–85 duyarlılık)</strong>,{' '}
              elektrolit dengesizlikleri ve pacemaker fonksiyonunu anlık izleyen temel dolaşım monitörü.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">DII + V5</div>
              <div className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                %80 – 85
              </div>
              <div className="text-[10px] text-slate-500">İskemi Yakalama</div>
            </div>
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">Diagnostik</div>
              <div className="text-sm font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400 mt-0.5">
                0.05–150 Hz
              </div>
              <div className="text-[10px] text-slate-500">ST Doğrulama</div>
            </div>
            <div className={`rounded-xl border px-3 py-2.5 text-center ${subSurface}`}>
              <div className="text-[10px] font-mono uppercase text-slate-400">Kalibrasyon</div>
              <div className="text-sm font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-0.5">
                25 mm/sn
              </div>
              <div className="text-[10px] text-slate-500">10 mm = 1 mV</div>
            </div>
          </div>
        </div>

        {/* 6-Section Jump Bar */}
        <div className={`mt-5 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-emerald-200/70'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SECTION_LINKS.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left text-xs font-semibold transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-700/80 text-slate-200 hover:border-emerald-500/60 hover:text-emerald-300'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
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
      <section id="ecg-sec-1" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            1
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Einthoven Üçgeni · Diferansiyel Amplifikasyon (CMRR) · Monitör (0.5–40 Hz) vs. Diagnostik (0.05–150 Hz) Filtre
            </p>
          </div>
        </div>

        {/* Visual Diagram 1A: Einthoven Triangle + Monitor vs Diagnostic Filter Bandwidth */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Einthoven Vektör Üçgeni &amp; Monitör vs. Diagnostik Filtre Bant Genişliği
            </span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Cilt Sinyali: 0.5–4 mV · Ag/AgCl Elektrot · Einthoven Yasası: DII = DI + DIII
            </span>
          </div>

          <svg viewBox="0 0 760 198" className="w-full h-auto" role="img" aria-label="Einthoven üçgeni ve EKG filtre modları şeması">
            {/* LEFT PANEL: Einthoven Triangle */}
            <rect x="8" y="8" width="356" height="182" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="22" y="27" fontSize="10.2" fontWeight="700" fill="#10b981">
              A) Einthoven Üçgeni &amp; Kalp Ekseni
            </text>

            {/* Triangle Lines */}
            <polygon
              points="96,58 276,58 186,158"
              fill="#10b981"
              fillOpacity={isDark ? '0.08' : '0.06'}
              stroke="#10b981"
              strokeWidth="2"
            />
            {/* Mean Cardiac Vector (Arrow along Lead II) */}
            <line x1="156" y1="84" x2="210" y2="128" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
            <polygon points="205,131 216,133 212,122" fill="#f43f5e" />
            <text x="186" y="76" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#f43f5e">
              Kalp Vektörü (+60° ≈ DII)
            </text>

            {/* Nodes: RA, LA, LL */}
            <circle cx="96" cy="58" r="11" fill="#ef4444" />
            <text x="96" y="61" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff" fontFamily="monospace">RA−</text>

            <circle cx="276" cy="58" r="11" fill="#eab308" />
            <text x="276" y="61" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#0f172a" fontFamily="monospace">LA</text>

            <circle cx="186" cy="158" r="11" fill="#22c55e" />
            <text x="186" y="161" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#ffffff" fontFamily="monospace">LL+</text>

            {/* Lead Labels */}
            <text x="186" y="51" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">Lead I (0°)</text>
            <text x="122" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#10b981" fontFamily="monospace">Lead II (+60°)</text>
            <text x="252" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f59e0b" fontFamily="monospace">Lead III (+120°)</text>

            <text x="186" y="182" textAnchor="middle" fontSize="8.3" fill={isDark ? '#94a3b8' : '#64748b'}>
              Wilson Merkezi (RA+LA+LL)/3 → Unipolar V5 (5. İKA Ön Aksiller)
            </text>

            {/* RIGHT PANEL: Filter Modes (Monitor vs Diagnostic) */}
            <rect x="376" y="8" width="376" height="182" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="390" y="27" fontSize="10.2" fontWeight="700" fill="#0ea5e9">
              B) Kritik Filtre Farkı: Monitör vs. Diagnostik Mod
            </text>

            {/* Diagnostic Bar */}
            <text x="394" y="52" fontSize="9.2" fontWeight="700" fill="#10b981">Diagnostik Mod (0.05 – 150 Hz) — Gerçek ST!</text>
            <rect x="394" y="60" width="340" height="24" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.4" />
            <text x="404" y="75" fontSize="8.5" fontWeight="700" fill="#10b981" fontFamily="monospace">0.05 Hz</text>
            <text x="564" y="75" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={isDark ? '#a7f3d0' : '#047857'}>
              ST Segmenti + Pacer Spike + Q Dalgası Doğru ✓
            </text>
            <text x="724" y="75" textAnchor="end" fontSize="8.5" fontWeight="700" fill="#10b981" fontFamily="monospace">150 Hz</text>

            {/* Monitor Bar */}
            <text x="394" y="106" fontSize="9.2" fontWeight="700" fill="#f59e0b">Monitör Modu (0.5 – 40 Hz) — Temiz Ritim</text>
            <rect x="394" y="114" width="340" height="24" rx="6" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke={isDark ? '#334155' : '#cbd5e1'} />
            <rect x="444" y="114" width="174" height="24" rx="5" fill="#f59e0b" fillOpacity="0.24" stroke="#f59e0b" strokeWidth="1.4" />
            <text x="452" y="129" fontSize="8.3" fontWeight="700" fill="#f59e0b" fontFamily="monospace">0.5 Hz</text>
            <text x="531" y="129" textAnchor="middle" fontSize="8.2" fontWeight="700" fill={isDark ? '#fde68a' : '#92400e'}>Dar Bant</text>
            <text x="610" y="129" textAnchor="end" fontSize="8.3" fontWeight="700" fill="#f59e0b" fontFamily="monospace">40 Hz</text>
            <text x="678" y="129" textAnchor="middle" fontSize="7.8" fill="#f43f5e" fontWeight="700">50 Hz/Koter Kesilir</text>

            {/* Bottom Warning */}
            <rect x="394" y="148" width="340" height="32" rx="7" fill="#f43f5e" fillOpacity="0.12" stroke="#f43f5e" strokeOpacity="0.45" />
            <text x="564" y="162" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f43f5e">
              ⚠ Monitör modu (0.5 Hz alt kesim) ST segmentini yapay olarak kaydırabilir!
            </text>
            <text x="564" y="174" textAnchor="middle" fontSize="8.2" fill={isDark ? '#fecdd3' : '#881337'}>
              Şüpheli ST sapmasını daima Diagnostik moda (0.05 Hz) alarak doğrula.
            </text>
          </svg>
        </div>

        {/* Interactive Simulator 1B: 3-Lead vs CS5 vs 5-Lead + IEC/AHA Toggle */}
        <div className={`rounded-xl border p-4 sm:p-5 space-y-4 ${diagramBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                İnteraktif 3 / 5 Elektrot Yerleşim &amp; İskemi Duyarlılık Simülatörü
              </h5>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className={`inline-flex rounded-lg border p-0.5 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                <button
                  type="button"
                  onClick={() => setColorStandard('iec')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                    colorStandard === 'iec'
                      ? 'bg-emerald-600 text-white'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  IEC (Avrupa / TR)
                </button>
                <button
                  type="button"
                  onClick={() => setColorStandard('aha')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                    colorStandard === 'aha'
                      ? 'bg-sky-600 text-white'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  AHA (ABD)
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {LEAD_CONFIGS.map((cfg) => {
              const selected = cfg.id === leadConfigId;
              return (
                <button
                  key={cfg.id}
                  type="button"
                  onClick={() => setLeadConfigId(cfg.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    selected
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400'
                  }`}
                >
                  {cfg.shortTag}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Interactive Torso Electrode Map SVG */}
            <div
              className={`lg:col-span-6 rounded-xl border p-4 flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Anatomik Elektrot Yerleşimi ({colorStandard === 'iec' ? 'IEC Avrupa/TR' : 'AHA ABD'})
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-500">{activeConfig.shortTag}</span>
              </div>

              <svg viewBox="0 0 360 220" className="w-full h-auto" role="img" aria-label="3 ve 5 derivasyon EKG elektrot anatomik yerleşim şeması">
                {/* Stylized Torso Silhouette */}
                <path
                  d="M 155 18 L 205 18 L 214 38 L 274 52 C 288 56, 294 72, 290 94 L 276 196 L 84 196 L 70 94 C 66 72, 72 56, 86 52 L 146 38 Z"
                  fill={isDark ? '#1e293b' : '#f1f5f9'}
                  stroke={isDark ? '#475569' : '#cbd5e1'}
                  strokeWidth="1.6"
                />
                {/* Clavicles & Sternum Subtle Anatomical Guides */}
                <path d="M 116 56 Q 150 64, 180 58 Q 210 64, 244 56" fill="none" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
                <line x1="180" y1="58" x2="180" y2="128" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="180" y="34" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#64748b'} fontFamily="monospace">
                  SAĞ (Hasta) ←  → SOL (Hasta)
                </text>

                {/* Active Lead Vector Line */}
                {leadConfigId === '3-lead' && (
                  <line x1="118" y1="74" x2="242" y2="174" stroke="#10b981" strokeWidth="2.2" strokeDasharray="5 3" />
                )}
                {leadConfigId === 'cs5' && (
                  <line x1="118" y1="74" x2="262" y2="136" stroke="#f59e0b" strokeWidth="2.4" strokeDasharray="5 3" />
                )}
                {leadConfigId === '5-lead' && (
                  <>
                    <line x1="118" y1="74" x2="242" y2="174" stroke="#10b981" strokeWidth="1.8" strokeDasharray="4 3" />
                    <line x1="180" y1="118" x2="262" y2="136" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 3" />
                  </>
                )}

                {/* RA Electrode (Always present) */}
                <circle cx="118" cy="74" r="12" fill={electrodeColors.ra.fill} stroke="#64748b" strokeWidth="1.5" />
                <text x="118" y="77" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={electrodeColors.ra.text} fontFamily="monospace">
                  {colorStandard === 'iec' ? 'R' : 'RA'}
                </text>
                <text x="48" y="77" textAnchor="middle" fontSize="8" fontWeight="700" fill={isDark ? '#e2e8f0' : '#334155'}>
                  {electrodeColors.ra.code}
                </text>

                {/* LA Electrode (Moves to V5 in CS5 mode!) */}
                <circle
                  cx={leadConfigId === 'cs5' ? 262 : 242}
                  cy={leadConfigId === 'cs5' ? 136 : 74}
                  r="12"
                  fill={electrodeColors.la.fill}
                  stroke="#64748b"
                  strokeWidth="1.5"
                />
                <text
                  x={leadConfigId === 'cs5' ? 262 : 242}
                  y={leadConfigId === 'cs5' ? 139 : 77}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="700"
                  fill={electrodeColors.la.text}
                  fontFamily="monospace"
                >
                  {colorStandard === 'iec' ? 'L' : 'LA'}
                </text>
                <text
                  x={leadConfigId === 'cs5' ? 314 : 312}
                  y={leadConfigId === 'cs5' ? 139 : 77}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="700"
                  fill={leadConfigId === 'cs5' ? '#f59e0b' : isDark ? '#e2e8f0' : '#334155'}
                >
                  {leadConfigId === 'cs5' ? 'LA → V5!' : electrodeColors.la.code}
                </text>

                {/* LL Electrode (Always present) */}
                <circle cx="242" cy="174" r="12" fill={electrodeColors.ll.fill} stroke="#64748b" strokeWidth="1.5" />
                <text x="242" y="177" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={electrodeColors.ll.text} fontFamily="monospace">
                  {colorStandard === 'iec' ? 'F' : 'LL'}
                </text>
                <text x="312" y="177" textAnchor="middle" fontSize="8" fontWeight="700" fill={isDark ? '#e2e8f0' : '#334155'}>
                  {electrodeColors.ll.code}
                </text>

                {/* RL & V5 Electrodes (Only in 5-lead) */}
                {leadConfigId === '5-lead' && (
                  <>
                    <circle cx="118" cy="174" r="12" fill={electrodeColors.rl.fill} stroke="#64748b" strokeWidth="1.5" />
                    <text x="118" y="177" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={electrodeColors.rl.text} fontFamily="monospace">
                      {colorStandard === 'iec' ? 'N' : 'RL'}
                    </text>
                    <text x="48" y="177" textAnchor="middle" fontSize="8" fontWeight="700" fill={isDark ? '#e2e8f0' : '#334155'}>
                      {electrodeColors.rl.code}
                    </text>

                    <circle cx="262" cy="136" r="12" fill={electrodeColors.v5.fill} stroke="#0ea5e9" strokeWidth="2" />
                    <text x="262" y="139" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={electrodeColors.v5.text} fontFamily="monospace">
                      V5
                    </text>
                    <text x="315" y="139" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0ea5e9">
                      {electrodeColors.v5.code}
                    </text>
                  </>
                )}

                <text x="180" y="212" textAnchor="middle" fontSize="8.2" fill={isDark ? '#94a3b8' : '#64748b'}>
                  V5: Sol 5. İnterkostal Aralık, Ön Aksiller Hat
                </text>
              </svg>
            </div>

            {/* Right: Ischemia Sensitivity Comparison Bars (London et al.) */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-3">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3 text-slate-100">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 font-bold">İntraoperatif İskemi Duyarlılığı</span>
                  <span className="text-slate-400">London et al. (Anesthesiology)</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { label: 'Tek Başına DII (3-Elektrot)', pct: 33, active: leadConfigId === '3-lead', bar: 'bg-amber-500' },
                    { label: 'Tek Başına V5 / Modifiye CS5', pct: 75, active: leadConfigId === 'cs5', bar: 'bg-sky-500' },
                    { label: 'DII + V5 (5-Elektrot Standart)', pct: 82, active: leadConfigId === '5-lead', bar: 'bg-emerald-500' },
                    { label: 'DII + V4 + V5 (Çoklu Prekordiyal)', pct: 96, active: false, bar: 'bg-teal-400' },
                  ].map((item) => (
                    <div key={item.label} className={item.active ? 'opacity-100' : 'opacity-65'}>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className={item.active ? 'font-bold text-white' : 'text-slate-300'}>{item.label}</span>
                        <span className="font-mono font-bold tabular-nums text-emerald-300">%{item.pct}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full rounded-full ${item.bar}`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono flex flex-wrap justify-between gap-2 text-slate-300">
                  <span>Görünen: <strong className="text-emerald-400">{activeConfig.leadsShown}</strong></span>
                </div>
              </div>

              <div className={`rounded-xl border p-3.5 text-xs leading-relaxed ${subSurface}`}>
                <div className={`font-bold mb-1 flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{activeConfig.label}</span>
                </div>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>{activeConfig.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: ENDİKASYONLAR VE KLİNİK AMAÇ                                 */}
      {/* ===================================================================== */}
      <section id="ecg-sec-2" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
              isDark
                ? 'bg-sky-500/15 border-sky-500/30 text-sky-400'
                : 'bg-sky-50 border-sky-200 text-sky-700'
            }`}
          >
            2
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Endikasyonlar ve Klinik Amaç
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              ASA Standart II Zorunluluğu · Ritim (DII) vs. İskemi (V5) · Sistemik / Elektrolit İpuçları
            </p>
          </div>
        </div>

        {/* Visual Diagram 2A: Lead-to-Territory & Clinical Purpose Map */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <svg viewBox="0 0 760 116" className="w-full h-auto" role="img" aria-label="EKG derivasyon seçim ve klinik amaç haritası">
            <rect x="8" y="8" width="180" height="100" rx="10" fill="#10b981" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#10b981" strokeOpacity="0.45" />
            <text x="98" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#10b981" fontFamily="monospace">DII (Standart Ritim)</text>
            <text x="20" y="47" fontSize="8.6" fill={isDark ? '#a7f3d0' : '#064e3b'}>• En belirgin P dalgası</text>
            <text x="20" y="63" fontSize="8.6" fill={isDark ? '#a7f3d0' : '#064e3b'}>• AF, AV blok, nodal ritim</text>
            <text x="20" y="79" fontSize="8.6" fill={isDark ? '#a7f3d0' : '#064e3b'}>• İnferior duvar (RCA)</text>
            <text x="20" y="95" fontSize="8.2" fontWeight="700" fill="#10b981">→ Tüm vakalarda 1. kanal</text>

            <rect x="196" y="8" width="180" height="100" rx="10" fill="#0ea5e9" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#0ea5e9" strokeOpacity="0.45" />
            <text x="286" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">V5 (İskemi Şampiyonu)</text>
            <text x="208" y="47" fontSize="8.6" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Sol ventrikül ön-yan duvar</text>
            <text x="208" y="63" fontSize="8.6" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Tek başına %75 iskemi</text>
            <text x="208" y="79" fontSize="8.6" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• DII + V5 = %80–85 yakalar</text>
            <text x="208" y="95" fontSize="8.2" fontWeight="700" fill="#0ea5e9">→ 5-elektrotta 2. kanal</text>

            <rect x="384" y="8" width="180" height="100" rx="10" fill="#f59e0b" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#f59e0b" strokeOpacity="0.45" />
            <text x="474" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#f59e0b" fontFamily="monospace">CS5 / CB5 (3-Kablo)</text>
            <text x="396" y="47" fontSize="8.6" fill={isDark ? '#fde68a' : '#78350f'}>• 5-kablo yoksa V5 taklidi</text>
            <text x="396" y="63" fontSize="8.6" fill={isDark ? '#fde68a' : '#78350f'}>• CS5: RA klavikula → LA V5</text>
            <text x="396" y="79" fontSize="8.6" fill={isDark ? '#fde68a' : '#78350f'}>• CB5: RA sağ skapula → V5</text>
            <text x="396" y="95" fontSize="8.2" fontWeight="700" fill="#f59e0b">→ Monitörden DI seç!</text>

            <rect x="572" y="8" width="180" height="100" rx="10" fill="#a855f7" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#a855f7" strokeOpacity="0.45" />
            <text x="662" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a855f7" fontFamily="monospace">Sistemik İpuçları</text>
            <text x="584" y="47" fontSize="8.6" fill={isDark ? '#e9d5ff' : '#581c87'}>• K⁺ ↑ (Sivri T) / K⁺ ↓ (U dalgası)</text>
            <text x="584" y="63" fontSize="8.6" fill={isDark ? '#e9d5ff' : '#581c87'}>• Ca²⁺ ↓ (Uzun QT) / ↑ (Kısa QT)</text>
            <text x="584" y="79" fontSize="8.6" fill={isDark ? '#e9d5ff' : '#581c87'}>• Hipotermi (Osborn J dalgası)</text>
            <text x="584" y="95" fontSize="8.2" fontWeight="700" fill="#a855f7">• LAST / Pacer yakalama</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3-Elektrot vs. 5-Elektrot Seçimi
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Tüm Anestezi Vakaları:</strong> ASA Standart II gereği sürekli EKG zorunludur.</li>
              <li>• <strong>3-Elektrot:</strong> Genç, ASA I–II, düşük kardiyak riskli kısa minör cerrahilerde ritim takibi.</li>
              <li>• <strong>5-Elektrot (DII + V5):</strong> KAH, HT, DM, ileri yaş, vasküler/torasik/majör cerrahi, aritmi veya elektrolit riski olan tüm hastalarda standarttır.</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Activity className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Doğrudan Ölçtüğü Parametreler
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Kalp Hızı (HR) &amp; Ritim:</strong> Sinüs, supraventriküler/ventriküler aritmiler ve AV iletim blokları.</li>
              <li>• <strong>İletim Aralıkları:</strong> PR, QRS genişliği ve QTc aralığı (antiemetik/antipsikotik QT uzaması!).</li>
              <li>• <strong>ST Segment Trendi (mm / mV):</strong> J+60 ms noktasında otomatik sürekli iskemi takibi.</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Zap className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Dolaylı Klinik Kullanımlar
              </h5>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Elektrolit &amp; Isı Bozuklukları:</strong> Hiperkalemi (sivri T), hipokalsemi (uzun QT), derin hipotermi (Osborn J dalgası).</li>
              <li>• <strong>Santral Venöz Kateter (CVP):</strong> İntrakaviter EKG kılavuzluğunda P dalgasının büyümesiyle kavo-atriyal bileşke teyidi.</li>
              <li>• <strong>Kardiyoversiyon &amp; IABP Senkronizasyonu:</strong> R-dalgası tetiklemesi.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: TEKNİK KURULUM VE KALİBRASYON                                */}
      {/* ===================================================================== */}
      <section id="ecg-sec-3" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
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
              IEC (Avrupa/TR) vs. AHA (ABD) Renk Tablosu · Cilt Hazırlığı · 1 mV Kalibrasyon &amp; ST J-Noktası
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* IEC vs AHA Color Table */}
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className={`px-4 py-2.5 border-b flex items-center gap-2 ${subSurface}`}>
              <Wrench className="w-4 h-4 text-teal-500" />
              <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                5-Elektrot Renk Kodları (IEC Türkiye/Avrupa vs. AHA ABD)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                  <tr>
                    <th className="px-3 py-2 font-semibold">Anatomik Bölge</th>
                    <th className="px-3 py-2 font-semibold">IEC (TR / Avrupa)</th>
                    <th className="px-3 py-2 font-semibold">AHA (ABD)</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Sağ Klavikula Altı</td>
                    <td className="px-3 py-2 font-mono font-bold text-rose-500">R · Kırmızı</td>
                    <td className="px-3 py-2 font-mono">RA · Beyaz</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Sol Klavikula Altı</td>
                    <td className="px-3 py-2 font-mono font-bold text-amber-500">L · Sarı</td>
                    <td className="px-3 py-2 font-mono">LA · Siyah</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Sol Alt Kosta Yay</td>
                    <td className="px-3 py-2 font-mono font-bold text-emerald-500">F · Yeşil</td>
                    <td className="px-3 py-2 font-mono text-rose-500">LL · Kırmızı</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">Sağ Alt Kosta (Toprak)</td>
                    <td className="px-3 py-2 font-mono font-bold">N · Siyah</td>
                    <td className="px-3 py-2 font-mono text-emerald-500">RL · Yeşil</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold">5. İKA Sol Ön Aksiller</td>
                    <td className="px-3 py-2 font-mono font-bold text-sky-500">C · Beyaz</td>
                    <td className="px-3 py-2 font-mono text-amber-700 dark:text-amber-400">V5 · Kahverengi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Calibration Box + SVG 1mV Square + Bedside Checklist */}
          <div className="space-y-3">
            <div className={`rounded-xl border p-4 space-y-2.5 ${subSurface}`}>
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Standart Kalibrasyon &amp; ST Ölçüm Noktası
                </h5>
                <span className="font-mono text-[10px] font-bold text-slate-400">25 mm/sn · 10 mm/mV</span>
              </div>

              <svg viewBox="0 0 380 68" className="w-full h-auto" role="img" aria-label="1 mV kalibrasyon karesi ve ST J+60ms ölçüm şeması">
                <rect x="2" y="2" width="376" height="64" rx="8" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                {/* 1mV Calibration Pulse */}
                <path d="M 18 48 L 30 48 L 30 14 L 54 14 L 54 48 L 68 48" fill="none" stroke="#10b981" strokeWidth="2.2" />
                <text x="42" y="60" textAnchor="middle" fontSize="8" fontWeight="700" fill="#10b981" fontFamily="monospace">1 mV (10 mm)</text>

                {/* PR Isoelectric & J+60ms ST measurement */}
                <line x1="94" y1="44" x2="270" y2="44" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
                <path d="M 96 44 L 112 44 Q 118 36, 124 44 L 136 44 L 140 48 L 146 12 L 152 54 L 158 52 L 178 52 Q 192 34, 208 44 L 240 44" fill="none" stroke="#0ea5e9" strokeWidth="2.2" />
                <circle cx="158" cy="52" r="3" fill="#f59e0b" />
                <circle cx="174" cy="52" r="3" fill="#f43f5e" />
                <text x="128" y="34" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontFamily="monospace">PR (Ref)</text>
                <text x="174" y="62" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#f43f5e" fontFamily="monospace">J+60ms (ST)</text>

                <text x="314" y="26" textAnchor="middle" fontSize="8.3" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>1 küçük kare = 0.04 sn</text>
                <text x="314" y="40" textAnchor="middle" fontSize="8.3" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>1 büyük kare = 0.20 sn</text>
                <text x="314" y="54" textAnchor="middle" fontSize="8.3" fontWeight="700" fill="#f43f5e">Anlamlı ST ≥ 1 mm</text>
              </svg>
            </div>

            <div className={`rounded-xl border p-4 space-y-1.5 ${subSurface}`}>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal-500" />
                <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Kurulum Altın Kuralları
                </h5>
              </div>
              <ul className={`text-xs space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>• <strong>Cilt Hazırlığı:</strong> Yağ/kremi alkolle temizle, gerekiyorsa tıraşla; elektrotu kas kitlesi yerine kemik çıkıntı üzerine yapıştır.</li>
                <li>• <strong>Eşzamanlı Kanal Ayarı:</strong> 5-elektrotta ekranda mutlaka <strong>DII + V5</strong> ve ST trend penceresini aç.</li>
                <li>• <strong>Pacer Algılama:</strong> Kalp pili olan hastada monitörde “Pacer Modu”nu aktif et!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: NORMAL VE PATOLOJİK DALGA FORMLARI (8 EKG PATERNİ)           */}
      {/* ===================================================================== */}
      <section id="ecg-sec-4" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0 ${
                isDark
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              4
            </div>
            <div>
              <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Normal ve Patolojik Dalga Formları (Perioperatif EKG Laboratuvarı)
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Önce Trase, Sonra Kalp Hızı! · 8 Kritik İntraoperatif Ritim, İskemi ve Elektrolit Paterni
              </p>
            </div>
          </div>
          <span
            className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border self-start sm:self-auto ${
              isDark
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            8 Kritik Klinik Trase
          </span>
        </div>

        {/* 8 Pattern Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ECG_PATTERNS.map((pattern) => {
            const selected = pattern.id === activePatternId;
            return (
              <button
                key={pattern.id}
                type="button"
                onClick={() => setActivePatternId(pattern.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selected
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/70 border-slate-700 text-slate-300 hover:border-emerald-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <Waves className={`w-3.5 h-3.5 shrink-0 ${selected ? 'text-emerald-100' : 'text-emerald-500'}`} />
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

        {/* Monitor Display + Pathophysiology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold">{activePattern.leadLabel}</span>
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

            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-2">
              <svg viewBox="0 0 520 165" className="w-full h-auto" role="img" aria-label={activePattern.label}>
                {/* ECG Paper Grid */}
                {[22, 42, 62, 82, 102, 122, 142].map((y) => (
                  <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="#14532d" strokeOpacity="0.45" strokeWidth="1" />
                ))}
                {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((x) => (
                  <line key={x} x1={x} y1="0" x2={x} y2="165" stroke="#14532d" strokeOpacity="0.45" strokeWidth="1" />
                ))}

                {/* Isoelectric reference line for ischemia/stemi */}
                {(activePattern.id === 'ischemia' || activePattern.id === 'stemi') && (
                  <line
                    x1="0"
                    y1={activePattern.id === 'ischemia' ? 98 : 106}
                    x2="520"
                    y2={activePattern.id === 'ischemia' ? 98 : 106}
                    stroke="#f43f5e"
                    strokeOpacity="0.45"
                    strokeDasharray="4 3"
                  />
                )}

                {/* Main ECG Trace */}
                <path
                  d={activePattern.path}
                  fill="none"
                  stroke={
                    activePattern.status === 'critical'
                      ? '#4ade80'
                      : activePattern.status === 'warning'
                        ? '#fbbf24'
                        : '#22c55e'
                  }
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Callouts */}
                {activePattern.id === 'nsr' && (
                  <g fontFamily="monospace" fontSize="8.8" fontWeight="700">
                    <text x="172" y="83" textAnchor="middle" fill="#38bdf8">P</text>
                    <text x="203" y="25" textAnchor="middle" fill="#4ade80">R</text>
                    <text x="246" y="70" textAnchor="middle" fill="#fbbf24">T</text>
                    <text x="335" y="154" textAnchor="middle" fill="#94a3b8">PR 0.16s · QRS 0.08s · ST İzoelektrik</text>
                  </g>
                )}
                {activePattern.id === 'ischemia' && (
                  <g fontFamily="monospace" fontSize="9" fontWeight="700">
                    <circle cx="180" cy="119" r="4" fill="#fb7185" />
                    <text x="180" y="148" textAnchor="middle" fill="#fb7185">ST Depresyonu (-2.4 mm)</text>
                  </g>
                )}
                {activePattern.id === 'stemi' && (
                  <g fontFamily="monospace" fontSize="9" fontWeight="700">
                    <circle cx="194" cy="58" r="4" fill="#fb7185" />
                    <text x="194" y="28" textAnchor="middle" fill="#fb7185">Konveks ST Elevasyonu (+3.2 mm)</text>
                  </g>
                )}
                {activePattern.id === 'hyperkalemia' && (
                  <g fontFamily="monospace" fontSize="9" fontWeight="700">
                    <circle cx="280" cy="24" r="4" fill="#fb7185" />
                    <text x="280" y="152" textAnchor="middle" fill="#fb7185">Sivri “Çadır” T Dalgası + Geniş QRS</text>
                  </g>
                )}
                {activePattern.id === 'avblock' && (
                  <g fontFamily="monospace" fontSize="8.8" fontWeight="700">
                    <text x="29" y="84" textAnchor="middle" fill="#38bdf8">P</text>
                    <text x="153" y="84" textAnchor="middle" fill="#38bdf8">P</text>
                    <text x="273" y="84" textAnchor="middle" fill="#38bdf8">P</text>
                    <text x="399" y="84" textAnchor="middle" fill="#38bdf8">P</text>
                    <text x="260" y="154" textAnchor="middle" fill="#fb7185">P ve QRS Tamamen Bağımsız (AV Dissosiyasyon)</text>
                  </g>
                )}
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono">
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-emerald-400">HR (atım/dk)</div>
                <div className={`text-xl font-bold tabular-nums ${activePattern.status === 'critical' ? 'text-rose-400' : 'text-emerald-300'}`}>
                  {activePattern.hr}
                </div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-sky-400">ST (J+60 ms)</div>
                <div className="text-xl font-bold tabular-nums text-sky-300">{activePattern.stVal}</div>
              </div>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2">
                <div className="text-[10px] text-amber-400">Tarama Hızı</div>
                <div className="text-lg font-bold tabular-nums text-amber-300">25 mm/sn</div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-5 rounded-2xl border p-4 flex flex-col justify-between space-y-3 ${subSurface}`}>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                  EKG Morfolojisi
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
                  Başlıca Perioperatif Nedenler
                </div>
                <ul className={`text-xs space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {activePattern.causes.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
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
              <div className="font-bold text-[11px] uppercase tracking-wider mb-1 text-emerald-600 dark:text-emerald-400">
                Anestezist Aksiyonu
              </div>
              <p>{activePattern.action}</p>
            </div>
          </div>
        </div>

        {/* Normal Intervals Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { tag: 'PR Aralığı', val: '120 – 200 ms', sub: '3–5 küçük kare (AV iletim)' },
            { tag: 'QRS Süresi', val: '< 120 ms', sub: '< 3 küçük kare (ventrikül)' },
            { tag: 'QTc (Bazett)', val: '< 450 / 470 ms', sub: '>500 ms = Torsades riski!' },
            { tag: 'ST Eşiği', val: '≥ 1.0 mm (0.1 mV)', sub: 'J+60 ms’de Diagnostik mod' },
          ].map((item) => (
            <div key={item.tag} className={`rounded-xl border p-3 ${subSurface}`}>
              <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">{item.tag}</div>
              <div className={`text-sm font-bold font-mono tabular-nums mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {item.val}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 5: LİMİTASYONLAR VE ARTEFAKTLAR                                 */}
      {/* ===================================================================== */}
      <section id="ecg-sec-5" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
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
              Limitasyonlar ve Artefaktlar (Yanılgı Matrisi)
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              PEA Kör Noktası · Filtre Yanılgısı · Elektrokoter / Titreme &amp; LBBB Sınırları
            </p>
          </div>
        </div>

        {/* Visual Diagram 5A: 3-Zone ECG Pitfalls Map */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <svg viewBox="0 0 760 128" className="w-full h-auto" role="img" aria-label="EKG artefakt ve limitasyon haritası">
            <rect x="10" y="10" width="240" height="108" rx="10" fill="#f43f5e" fillOpacity={isDark ? '0.13' : '0.08'} stroke="#f43f5e" strokeOpacity="0.5" />
            <text x="130" y="29" textAnchor="middle" fontSize="9.8" fontWeight="700" fill="#f43f5e" fontFamily="monospace">
              EN TEHLİKELİ KÖR NOKTA: PEA!
            </text>
            <text x="22" y="49" fontSize="8.9" fontWeight="700" fill={isDark ? '#fecdd3' : '#881337'}>• EKG mekanik pompa/debiyi GÖSTERMEZ</text>
            <text x="22" y="66" fontSize="8.8" fill={isDark ? '#fecdd3' : '#881337'}>• Normal NSR varken hasta arrest olabilir</text>
            <text x="22" y="83" fontSize="8.8" fill={isDark ? '#fecdd3' : '#881337'}>• Daima Pleth / Arter / EtCO₂ ile eşleştir</text>
            <text x="22" y="101" fontSize="8.5" fontWeight="700" fill="#f43f5e">→ “Elektrik var ≠ Dolaşım var”</text>

            <rect x="260" y="10" width="240" height="108" rx="10" fill="#f59e0b" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#f59e0b" strokeOpacity="0.5" />
            <text x="380" y="29" textAnchor="middle" fontSize="9.8" fontWeight="700" fill="#f59e0b" fontFamily="monospace">
              ST &amp; MORFOLOJİ YANILGILARI
            </text>
            <text x="272" y="49" fontSize="8.8" fill={isDark ? '#fde68a' : '#78350f'}>• Monitör modu (0.5 Hz) → yalancı ST!</text>
            <text x="272" y="66" fontSize="8.8" fill={isDark ? '#fde68a' : '#78350f'}>• LBBB / Pacer / LVH / Digoksin</text>
            <text x="272" y="83" fontSize="8.8" fill={isDark ? '#fde68a' : '#78350f'}>• RA–LA ters bağlama (Negatif DI)</text>
            <text x="272" y="101" fontSize="8.8" fill={isDark ? '#fde68a' : '#78350f'}>• 3-elektrotta V5 körlüğü (%67 kaçırır)</text>

            <rect x="510" y="10" width="240" height="108" rx="10" fill="#0ea5e9" fillOpacity={isDark ? '0.12' : '0.08'} stroke="#0ea5e9" strokeOpacity="0.5" />
            <text x="630" y="29" textAnchor="middle" fontSize="9.8" fontWeight="700" fill="#0ea5e9" fontFamily="monospace">
              ARTEFAKT &amp; PARAZİTLER
            </text>
            <text x="522" y="49" fontSize="8.8" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Monopolar koter (EMI → VF taklidi)</text>
            <text x="522" y="66" fontSize="8.8" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Titreme / Parkinson (AF / VT taklidi)</text>
            <text x="522" y="83" fontSize="8.8" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Kuru jel / 50 Hz şebeke gürültüsü</text>
            <text x="522" y="101" fontSize="8.8" fill={isDark ? '#bae6fd' : '#0c4a6e'}>• Pacer spike çift sayımı (2× HR)</text>
          </svg>
        </div>

        <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className={isDark ? 'bg-slate-800/90 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                <tr>
                  <th className="px-3.5 py-2.5 font-semibold">Faktör / Durum</th>
                  <th className="px-3.5 py-2.5 font-semibold">EKG Etkisi</th>
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
                          row.effect === 'blind'
                            ? 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30'
                            : row.effect === 'false-st'
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
      <section id="ecg-sec-6" className={`rounded-2xl border p-5 sm:p-6 space-y-5 scroll-mt-6 ${cardSurface}`}>
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
              Elektrokoter / MRG Yanıkları · Mikroşok (50–100 µA VF!) · Pacemaker / ICD &amp; Prone Bası Güvenliği
            </p>
          </div>
        </div>

        {/* Visual Diagram 6A: 3-Panel ECG Safety Infographic */}
        <div className={`rounded-xl border p-4 ${diagramBg}`}>
          <svg viewBox="0 0 760 126" className="w-full h-auto" role="img" aria-label="EKG 3 temel güvenlik protokolü şeması">
            <rect x="8" y="8" width="242" height="110" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#7f1d1d' : '#fecdd3'} />
            <text x="20" y="26" fontSize="9.8" fontWeight="700" fill="#f43f5e">1. Koter &amp; MRG Yanık Önleme</text>
            <text x="20" y="47" fontSize="8.4" fill={isDark ? '#e2e8f0' : '#334155'}>• Koter plağı gevşerse akım EKG’den döner!</text>
            <text x="20" y="64" fontSize="8.4" fontWeight="700" fill="#f43f5e">→ Küçük EKG elektrotunda 3° yanık!</text>
            <text x="20" y="82" fontSize="8.4" fill={isDark ? '#e2e8f0' : '#334155'}>• MRG’de karbon/MR-uyumlu elektrot kullan</text>
            <text x="20" y="99" fontSize="8.4" fontWeight="700" fill="#10b981">• Kablo ilmeği (loop) ve cilt teması YASAK</text>

            <rect x="260" y="8" width="240" height="110" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="272" y="26" fontSize="9.8" fontWeight="700" fill="#f59e0b">2. Mikroşok (Microshock) Eşiği</text>
            <rect x="276" y="38" width="208" height="32" rx="6" fill="#f59e0b" fillOpacity="0.16" stroke="#f59e0b" />
            <text x="380" y="52" textAnchor="middle" fontSize="8.8" fontWeight="700" fill="#f59e0b" fontFamily="monospace">
              50 – 100 µA (0.05–0.1 mA) = VF!
            </text>
            <text x="380" y="64" textAnchor="middle" fontSize="7.6" fill={isDark ? '#fde68a' : '#78350f'}>
              (Makroşok eşiği 100 mA iken 1000× daha düşük!)
            </text>
            <text x="380" y="89" textAnchor="middle" fontSize="8.2" fill={isDark ? '#cbd5e1' : '#334155'}>
              CVP / geçici pace telinde yalnızca
            </text>
            <text x="380" y="103" textAnchor="middle" fontSize="8.2" fontWeight="700" fill="#10b981">
              Tip CF izole girişli monitör &amp; eldiven!
            </text>

            <rect x="510" y="8" width="242" height="110" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <text x="522" y="26" fontSize="9.8" fontWeight="700" fill="#0ea5e9">3. Pacemaker / ICD &amp; Prone Bası</text>
            <text x="522" y="47" fontSize="8.4" fill={isDark ? '#e2e8f0' : '#334155'}>• Mıknatıs: Pace → Asenkron | ICD → Şok OFF</text>
            <text x="522" y="64" fontSize="8.4" fill={isDark ? '#e2e8f0' : '#334155'}>• Defib pedi jeneratörden ≥ 10 cm uzak</text>
            <text x="522" y="82" fontSize="8.4" fill={isDark ? '#e2e8f0' : '#334155'}>• Prone pozisyonda elektrotları SIRTA tak!</text>
            <text x="522" y="99" fontSize="8.4" fontWeight="700" fill="#10b981">• Göğüs altı düğme = bası nekrozu</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Elektrokoter &amp; MRG Elektrot Yanıkları
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Monopolar koterin dönüş plağı (grounding pad) yerinden oynarsa yüksek frekanslı akım alternatif yol olarak
              küçük yüzey alanlı EKG elektrotlarından dönüp yüksek akım yoğunluğuyla <strong>derin cilt yanığı</strong>{' '}
              yapar. MRG’de standart metal kablolu elektrotlar indüksiyon yanığına yol açar.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Koter plağını cerrahi sahaya yakın geniş kas kitlesine tam yapıştır, EKG elektrotlarını sahadan uzak tut; MRG’de yalnızca MR-uyumlu karbon elektrot kullan.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Mikroşok (Microshock) &amp; Elektriksel İzolasyon
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Sağlam cilt direnci baypas edildiğinde (santral venöz kateter, pulmoner arter kateteri veya epikardiyal/geçici
              pace teli) doğrudan miyokarda ulaşan yalnızca <strong>50–100 µA</strong>’lık hissedilemez kaçak akım bile
              ventriküler fibrilasyon (VF) tetikleyebilir.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Yalnızca periyodik kaçak testi yapılmış Tip CF izole monitör kullan; intrakardiyak kateterlere asla çıplak elle ve topraklı cihazla eşzamanlı dokunma.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Activity className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Prone Pozisyon Bası Yarası &amp; Cilt Alerjisi
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Yüzüstü (prone) cerrahilerde göğüs ön duvarında bırakılan sert elektrot düğmeleri ve kablolar uzun vakalarda
              ciddi <strong>bası nekrozuna</strong> yol açar. Yapışkan jel ayrıca kontakt dermatit veya prematüre/yaşlı
              cildinde epidermal sıyrılmaya (MARSI) neden olabilir.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Prone pozisyonda elektrotları sırt/skapula hattına taşı; frajil ciltte hidrojel hipoalerjenik elektrot tercih et.
            </div>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${subSurface}`}>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Alarm Yorgunluğu &amp; Çapraz Enfeksiyon
              </h5>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Tekrarlayan gevşek elektrot / yalancı VT alarmları alarm yorgunluğuna yol açar; yeniden kullanılabilir EKG
              kabloları ise ameliyathanede en sık kontamine olan yüzeyler arasındadır.
            </p>
            <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Önlem: Her vaka sonrası kabloları dezenfekte et (veya yüksek riskte tek kullanımlık lead set kullan); kritik VF/VT/Asistoli alarmlarını asla sessize alma.
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
        <BookOpen className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Klinik Referanslar
          </div>
          <p className="leading-relaxed">
            1. Miller’s Anesthesia (9th/10th Ed.) — Cardiovascular Monitoring &amp; Perioperative Electrocardiography. • 2. Butterworth JF, Mackey DC, Wasnick JD.{' '}
            <em>Morgan &amp; Mikhail’s Clinical Anesthesiology</em> (7th Ed.). • 3. London MJ et al. Intraoperative myocardial ischemia: localization by continuous 12-lead ECG.{' '}
            <em>Anesthesiology</em>. 1988;69(2):232–241. • 4. Sandau KE et al. Update to Practice Standards for ECG Monitoring in Hospital Settings (AHA).{' '}
            <em>Circulation</em>. 2017;136:e273–e344. • 5. ASA Standards for Basic Anesthetic Monitoring (2020) &amp; ASA CIED Practice Advisory (2020).
          </p>
        </div>
      </div>
    </div>
  );
};
