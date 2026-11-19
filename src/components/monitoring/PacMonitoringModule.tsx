import React, { useState } from 'react';
import {
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

interface PacMonitoringModuleProps {
  isDark: boolean;
}

type ShockPresetId =
  | 'normal'
  | 'hypovolemic'
  | 'cardiogenic'
  | 'septic'
  | 'obstructive-pe'
  | 'rv-infarct';

type InjectateErrorId = 'none' | 'low-volume' | 'warm-uncorrected' | 'tr-recirc';

type PacPatternId =
  | 'progression'
  | 'pa-to-paop'
  | 'giant-v'
  | 'overwedging'
  | 'rv-slipback'
  | 'pulmonary-htn'
  | 'tamponade';

interface PacPattern {
  id: PacPatternId;
  label: string;
  pressureVal: string;
  dominantFeature: string;
  rhythmLabel: string;
  status: 'normal' | 'warning' | 'critical';
  statusText: string;
  ecgPath: string;
  pacPath: string;
  refLineY: number;
  refLabel: string;
  waveTags: { x: number; y: number; text: string; color: string }[];
  morphology: string;
  causes: string[];
  action: string;
}

const PAC_PATTERNS: PacPattern[] = [
  {
    id: 'progression',
    label: 'İlerletme Sekansı (RA → RV → PA → PAOP)',
    pressureVal: 'RA 5 · RV 26/2 · PA 26/10 · PAOP 9',
    dominantFeature: 'RV’de Sistolik ↑ · PA’da Diyastolik ↑',
    rhythmLabel: 'Derinlik: 20 → 30 → 40 → 45 cm',
    status: 'normal',
    statusText: '4 Odacık Basınç Basamakları Doğrulandı',
    ecgPath:
      'M 10 42 L 32 42 Q 39 32, 46 42 L 56 42 L 60 47 L 65 15 L 70 52 L 74 42 L 90 42 Q 102 26, 114 42 L 154 42 ' +
      'Q 161 32, 168 42 L 178 42 L 182 47 L 187 15 L 192 52 L 196 42 L 212 42 Q 224 26, 236 42 L 276 42 ' +
      'Q 283 32, 290 42 L 300 42 L 304 47 L 309 15 L 314 52 L 318 42 L 334 42 Q 346 26, 358 42 L 398 42 ' +
      'Q 405 32, 412 42 L 422 42 L 426 47 L 431 15 L 436 52 L 440 42 L 456 42 Q 468 26, 480 42 L 528 42',
    pacPath:
      // RA (10..126): low 4-7 mmHg around y=156
      'M 10 158 Q 28 148, 44 156 Q 58 164, 72 152 Q 86 160, 102 150 Q 116 158, 128 158 ' +
      // RV (128..258): tall systolic up to y=78, diastolic drops to y=166 (0-3 mmHg!)
      'L 138 164 L 152 82 Q 164 74, 174 86 L 188 166 L 204 162 L 218 80 Q 230 72, 240 86 L 254 166 L 266 158 ' +
      // PA (266..396): systolic same y=80, diastolic step-up to y=132 + dicrotic notch!
      'L 280 132 L 296 80 Q 308 76, 318 96 Q 324 106, 330 100 Q 340 116, 352 132 L 366 82 Q 378 78, 388 96 Q 394 106, 400 100 L 414 134 ' +
      // PAOP (414..528): atrialized a/v waves around y=144
      'Q 426 132, 438 144 Q 452 152, 464 134 Q 478 148, 492 136 Q 508 150, 528 142',
    refLineY: 132,
    refLabel: '10 mmHg (PADP)',
    waveTags: [
      { x: 54, y: 142, text: 'RA (20 cm)', color: '#94a3b8' },
      { x: 162, y: 69, text: 'RV (30 cm)', color: '#fbbf24' },
      { x: 204, y: 174, text: 'Diyastol ~2', color: '#f87171' },
      { x: 306, y: 69, text: 'PA (40 cm)', color: '#facc15' },
      { x: 334, y: 94, text: 'Dikrotik', color: '#38bdf8' },
      { x: 468, y: 124, text: 'PAOP (45 cm)', color: '#e879f9' },
    ],
    morphology:
      'RA’dan RV’ye geçince sistolik basınç aniden ~25 mmHg’ye fırlar, diyastolik basınç 0–5 mmHg’de kalır. Pulmoner kapak geçilip PA’ya girilince diyastolik basınç belirgin yükselir (step-up) ve dikrotik çentik belirir. Balon kamaşınca (PAOP) atriyal a–v dalgası oluşur.',
    causes: ['Sağ internal juguler ven (RIJ) üzerinden balon 1.5 mL şişik standart ilerletme'],
    action: 'PAOP doğrulandıktan sonra balonu mutlaka SÖNDÜRÜN ve keskin PA trasesine döndüğünü teyit edin; kılıfı kilitleyin.',
  },
  {
    id: 'pa-to-paop',
    label: 'Normal PA → PAOP Geçişi (Balon Şişirme)',
    pressureVal: 'PA 24/10 (m15) → PAOP 9',
    dominantFeature: 'PAOP < mPAP · Net a ve v',
    rhythmLabel: 'Sinüs Ritmi · 72/dk',
    status: 'normal',
    statusText: 'West Zone III · Fizyolojik Kama (Wedge)',
    ecgPath:
      'M 10 42 L 32 42 Q 39 32, 46 42 L 56 42 L 60 47 L 65 15 L 70 52 L 74 42 L 90 42 Q 102 26, 114 42 L 154 42 ' +
      'Q 161 32, 168 42 L 178 42 L 182 47 L 187 15 L 192 52 L 196 42 L 212 42 Q 224 26, 236 42 L 276 42 ' +
      'Q 283 32, 290 42 L 300 42 L 304 47 L 309 15 L 314 52 L 318 42 L 334 42 Q 346 26, 358 42 L 398 42 ' +
      'Q 405 32, 412 42 L 422 42 L 426 47 L 431 15 L 436 52 L 440 42 L 456 42 Q 468 26, 480 42 L 528 42',
    pacPath:
      // 2 PA beats
      'M 10 132 L 56 132 L 72 80 Q 84 74, 96 98 Q 102 108, 110 100 Q 124 118, 146 132 L 178 132 L 194 80 Q 206 74, 218 98 Q 224 108, 232 100 Q 246 118, 268 136 ' +
      // Balloon inflated -> PAOP with delayed a (after QRS!) and v (after T!)
      'L 292 146 Q 312 126, 326 144 Q 340 156, 354 146 Q 372 130, 386 146 Q 398 156, 414 146 ' +
      'Q 434 126, 448 144 Q 462 156, 476 146 Q 494 130, 508 146 L 528 148',
    refLineY: 142,
    refLabel: 'PAOP ~9 mmHg',
    waveTags: [
      { x: 84, y: 69, text: 'PA Sistol', color: '#facc15' },
      { x: 112, y: 94, text: 'Çentik', color: '#38bdf8' },
      { x: 274, y: 120, text: 'Balon Şişir ↓', color: '#e879f9' },
      { x: 312, y: 121, text: 'a (gecikmeli)', color: '#e879f9' },
      { x: 374, y: 124, text: 'v', color: '#c084fc' },
    ],
    morphology:
      'PAOP dalgaları, retrograd pulmoner kapiller + 110 cm kateter iletim gecikmesi (~160–200 ms) nedeniyle CVP’ye göre sağa kayar: PAOP a dalgası QRS içine/hemen sonrasına, v dalgası ise T dalgasından sonraya düşer.',
    causes: ['Normal sol atriyum basıncı (LAP) ve pulmoner venöz yatak'],
    action: 'Ölçümü ekspiryum sonunda (a dalgası ortalamasında) alın; ölçüm biter bitmez balonu pasif olarak söndürün (< 15 sn).',
  },
  {
    id: 'giant-v',
    label: 'Dev v Dalgası (Akut Şiddetli Mitral Yetmezliği / VSD)',
    pressureVal: 'PAOP 22 (v Piki 44 mmHg!)',
    dominantFeature: 'PA Dalgasını Taklit Eden Dev v!',
    rhythmLabel: 'Sinüs Taşikardisi · 104/dk',
    status: 'critical',
    statusText: 'Sistolik Sol Atriyum Regürjitasyonu · PA ile Karışabilir',
    ecgPath:
      'M 10 42 L 28 42 Q 34 32, 40 42 L 48 42 L 51 47 L 56 15 L 61 52 L 65 42 L 78 42 Q 88 26, 98 42 L 130 42 ' +
      'Q 136 32, 142 42 L 150 42 L 153 47 L 158 15 L 163 52 L 167 42 L 180 42 Q 190 26, 200 42 L 232 42 ' +
      'Q 238 32, 244 42 L 252 42 L 255 47 L 260 15 L 265 52 L 269 42 L 282 42 Q 292 26, 302 42 L 334 42 ' +
      'Q 340 32, 346 42 L 354 42 L 357 47 L 362 15 L 367 52 L 371 42 L 384 42 Q 394 26, 404 42 L 436 42 ' +
      'Q 442 32, 448 42 L 456 42 L 459 47 L 464 15 L 469 52 L 473 42 L 486 42 Q 496 26, 506 42 L 528 42',
    pacPath:
      'M 10 132 Q 46 124, 58 134 Q 76 138, 92 104 Q 104 64, 114 76 Q 124 114, 136 134 ' +
      'Q 152 124, 164 134 Q 178 138, 194 104 Q 206 64, 216 76 Q 226 114, 238 134 ' +
      'Q 254 124, 266 134 Q 280 138, 296 104 Q 308 64, 318 76 Q 328 114, 340 134 ' +
      'Q 356 124, 368 134 Q 382 138, 398 104 Q 410 64, 420 76 Q 430 114, 442 134 ' +
      'Q 458 124, 470 134 Q 484 138, 500 104 Q 512 64, 522 76 L 528 110',
    refLineY: 132,
    refLabel: 'LVEDP ≈ a Tabanı (~15)',
    waveTags: [
      { x: 106, y: 60, text: 'DEV v (T sonrası!)', color: '#f43f5e' },
      { x: 208, y: 60, text: 'DEV v', color: '#f43f5e' },
      { x: 158, y: 120, text: 'a', color: '#e879f9' },
      { x: 310, y: 60, text: 'PA ile karıştırma!', color: '#fbbf24' },
    ],
    morphology:
      'Şiddetli akut mitral yetmezliğinde (veya akut VSD / kompliyansı düşük LA’da) PAOP trasesinde ortalama basıncın ≥ 2 katı dev v dalgaları çıkar. Tuzak: Dev v dalgası PA dalgası sanılıp kateter daha da ileri itilebilir (PA rüptürü riski)!',
    causes: ['Akut mitral yetmezliği (papiller kas rüptürü/iskemi)', 'Akut post-MI VSD', 'Sert sol atriyum + aşırı volüm yükü'],
    action: 'EKG ile zamanlayın: PA dalgası QRS–T arasında, dev v ise T dalgasından SONRA pik yapar! LVEDP tahmini için v tepesini değil a dalgası tabanını okuyun; TEE ile MY doğrulayın.',
  },
  {
    id: 'overwedging',
    label: 'Aşırı Şişirme ("Overwedging" — PA Rüptürü Uyarısı!)',
    pressureVal: '↑ 18 → 36 → 52 mmHg (Tırmanan)',
    dominantFeature: 'Sönümlenmiş & Yukarı Tırmanan Trase!',
    rhythmLabel: 'ACİL: Balonu Hemen Söndür!',
    status: 'critical',
    statusText: 'Kateter Ucu Damar Duvarına / Eksantrik Balona Yaslı',
    ecgPath:
      'M 10 42 L 32 42 Q 39 32, 46 42 L 56 42 L 60 47 L 65 15 L 70 52 L 74 42 L 90 42 Q 102 26, 114 42 L 154 42 ' +
      'Q 161 32, 168 42 L 178 42 L 182 47 L 187 15 L 192 52 L 196 42 L 212 42 Q 224 26, 236 42 L 276 42 ' +
      'Q 283 32, 290 42 L 300 42 L 304 47 L 309 15 L 314 52 L 318 42 L 334 42 Q 346 26, 358 42 L 398 42 ' +
      'Q 405 32, 412 42 L 422 42 L 426 47 L 431 15 L 436 52 L 440 42 L 456 42 Q 468 26, 480 42 L 528 42',
    pacPath:
      // Normal PA beat first
      'M 10 132 L 56 132 L 72 84 Q 84 78, 96 100 Q 104 108, 112 102 L 146 132 ' +
      // Balloon inflates in distal branch -> pressure creeps continuously upward without pulsatility!
      'L 178 134 C 210 124, 240 108, 280 94 C 330 78, 390 66, 460 58 L 528 56',
    refLineY: 84,
    refLabel: 'PA Sistolik Üstüne Tırmanış!',
    waveTags: [
      { x: 84, y: 72, text: 'PA', color: '#facc15' },
      { x: 248, y: 98, text: 'Overwedging ↑', color: '#f43f5e' },
      { x: 420, y: 50, text: 'Flush Basıncı Yansıması (Rüptür Riski!)', color: '#fb7185' },
    ],
    morphology:
      'Kateter distal küçük bir PA dalına fazla ilerlemişse balon şişirildiğinde uç damar duvarına gömülür veya balon distal portu kapatır; 300 mmHg yıkama torbası basıncı küçük kapalı kompartmanda yükselerek dalgasız tırmanan bir eğri çizer.',
    causes: ['Kateterin zamanla distale göç etmesi (< 1.5 mL hava ile hemen wedge olması)', 'Eksantrik balon herniasyonu'],
    action: 'DERHAL balonu söndürün, yıkama yapmayın! Kateteri balon sönükken 2–3 cm geri çekin ve tam 1.5 mL hava ile normal PAOP elde edilip edilmediğini kontrol edin.',
  },
  {
    id: 'rv-slipback',
    label: 'Kateterin RV’ye Geri Düşmesi ("RV Slip-Back")',
    pressureVal: 'PA 26/10 → RV 26/1 mmHg!',
    dominantFeature: 'Diyastol ~0 mmHg + Ventriküler Aritmi',
    rhythmLabel: 'PVC / NSVT Tetiklenmesi!',
    status: 'critical',
    statusText: 'Diyastolik Basınç Ani Düşüşü + Endokardiyal İrritasyon',
    ecgPath:
      'M 10 42 L 32 42 Q 39 32, 46 42 L 56 42 L 60 47 L 65 15 L 70 52 L 74 42 L 90 42 Q 102 26, 114 42 L 154 42 ' +
      'Q 161 32, 168 42 L 178 42 L 182 47 L 187 15 L 192 52 L 196 42 L 212 42 Q 224 26, 236 42 L 266 42 ' +
      // PVC 1
      'L 274 56 L 284 12 L 296 64 L 310 30 L 322 42 L 354 42 ' +
      // Normal + PVC 2
      'Q 361 32, 368 42 L 378 42 L 382 47 L 387 15 L 392 52 L 396 42 L 424 42 ' +
      'L 432 58 L 442 12 L 456 64 L 470 30 L 484 42 L 528 42',
    pacPath:
      // 2 PA beats
      'M 10 132 L 56 132 L 72 82 Q 84 76, 96 98 Q 104 108, 112 100 L 146 132 ' +
      'L 178 132 L 194 82 Q 206 76, 218 98 Q 226 108, 234 100 L 258 166 ' +
      // RV waveform: drops to 0-2 mmHg baseline (y=168), tall spike, no dicrotic notch
      'L 272 164 L 288 86 Q 298 78, 310 92 L 324 168 L 368 166 L 384 80 Q 396 74, 408 86 L 422 168 ' +
      'L 436 164 L 450 90 Q 460 82, 472 96 L 486 168 L 528 166',
    refLineY: 132,
    refLabel: 'Eski PADP (10 mmHg)',
    waveTags: [
      { x: 84, y: 70, text: 'PA', color: '#facc15' },
      { x: 288, y: 10, text: 'PVC!', color: '#f43f5e' },
      { x: 344, y: 175, text: 'RV Diyastol ~1 mmHg!', color: '#fb7185' },
      { x: 446, y: 10, text: 'PVC!', color: '#f43f5e' },
    ],
    morphology:
      'PA dalgasının dikrotik çentiği kaybolur ve diyastolik basınç aniden 0–4 mmHg tabanına çöker; sistolik basınç aynı kalır. Kateter ucu sağ ventrikül endokardına vurarak sık PVC veya VT tetikler.',
    causes: ['Kateterin sabitlenmemesi / hasta pozisyon değişikliği', 'Aşırı sığ yerleştirme'],
    action: 'Eğer steril kılıf sağlam ise balonu 1.5 mL şişirip PA’ya yeniden ilerletin; sterilite bozulmuşsa veya ilerlemiyorsa balonu SÖNDÜRÜP kateteri güvenli şekilde RA’ya (CVP) geri çekin.',
  },
  {
    id: 'pulmonary-htn',
    label: 'Pre-Kapiller Pulmoner Hipertansiyon (Yüksek PVR / Akut PE)',
    pressureVal: 'PA 68/32 (m44) · PAOP 9 mmHg',
    dominantFeature: 'PADP − PAOP > 5 mmHg (Geniş Gradient)',
    rhythmLabel: 'Sinüs Taşikardisi · PVR > 6 WU',
    status: 'warning',
    statusText: 'Yüksek mPAP (> 20) + Normal PAOP (≤ 15) · Yüksek TPG',
    ecgPath:
      'M 10 42 L 30 42 Q 37 32, 44 42 L 54 42 L 57 47 L 62 15 L 67 52 L 71 42 L 86 42 Q 97 26, 108 42 L 144 42 ' +
      'Q 151 32, 158 42 L 168 42 L 171 47 L 176 15 L 181 52 L 185 42 L 200 42 Q 211 26, 222 42 L 258 42 ' +
      'Q 265 32, 272 42 L 282 42 L 285 47 L 290 15 L 295 52 L 299 42 L 314 42 Q 325 26, 336 42 L 372 42 ' +
      'Q 379 32, 386 42 L 396 42 L 399 47 L 404 15 L 409 52 L 413 42 L 428 42 Q 439 26, 450 42 L 528 42',
    pacPath:
      // High PA systolic (y=58) and high PA diastolic (y=104)
      'M 10 104 L 54 104 L 68 58 Q 80 54, 92 74 Q 98 82, 106 76 Q 118 92, 138 104 ' +
      'L 168 104 L 182 58 Q 194 54, 206 74 Q 212 82, 220 76 Q 232 92, 252 104 ' +
      'L 282 104 L 296 58 Q 308 54, 320 74 Q 326 82, 334 76 Q 346 94, 366 138 ' +
      // Balloon inflated -> dramatic drop to normal PAOP (y=144)
      'Q 386 134, 404 146 Q 424 134, 444 146 Q 464 134, 484 146 Q 504 134, 528 144',
    refLineY: 144,
    refLabel: 'PAOP 9 (TPG = 35 mmHg!)',
    waveTags: [
      { x: 80, y: 50, text: 'PA 68/32', color: '#fbbf24' },
      { x: 244, y: 118, text: 'PADP 32', color: '#f59e0b' },
      { x: 438, y: 128, text: 'PAOP 9 (Normal!)', color: '#e879f9' },
    ],
    morphology:
      'Normalde PADP ≈ PAOP (± 1–4 mmHg) iken, pulmoner vasküler direnç (PVR) arttığında PADP ile PAOP arasında belirgin boşluk (PADP − PAOP > 5 mmHg; TPG > 12 mmHg) açılır. Bu durumda PADP artık sol kalp ön yükünü temsil etmez!',
    causes: ['Masif pulmoner emboli', 'PAH / Kronik tromboembolik PH', 'Hipoksik pulmoner vazokonstriksiyon (HPV) / ARDS / Protamin reaksiyonu'],
    action: 'Hipoksi, hiperkapni ve asidozu hemen düzeltin; iNO / inhale epoprostenol ve RV perfüzyonunu koruyacak (norepinefrin/vazopresin) strateji uygulayın; PA rüptürü riski yüksek olduğundan sık wedge yapmayın!',
  },
  {
    id: 'tamponade',
    label: 'Kardiyak Tamponad (Diyastolik Basınç Eşitlenmesi)',
    pressureVal: 'CVP 19 ≈ PADP 20 ≈ PAOP 19',
    dominantFeature: 'Eşitlenmiş Diyastolik Basınçlar · y İnişi Yok',
    rhythmLabel: 'Taşikardi · Pulsus Paradoksus',
    status: 'critical',
    statusText: 'CVP = RVEDP = PADP = PAOP (~20 mmHg ± 2)',
    ecgPath:
      'M 10 42 L 28 42 Q 34 33, 40 42 L 48 42 L 51 46 L 56 20 L 61 48 L 65 42 L 78 42 Q 88 28, 98 42 L 130 42 ' +
      'Q 136 33, 142 42 L 150 42 L 153 46 L 158 20 L 163 48 L 167 42 L 180 42 Q 190 28, 200 42 L 232 42 ' +
      'Q 238 33, 244 42 L 252 42 L 255 46 L 260 20 L 265 48 L 269 42 L 282 42 Q 292 28, 302 42 L 334 42 ' +
      'Q 340 33, 346 42 L 354 42 L 357 46 L 362 20 L 367 48 L 371 42 L 384 42 Q 394 28, 404 42 L 436 42 ' +
      'Q 442 33, 448 42 L 456 42 L 459 46 L 464 20 L 469 48 L 473 42 L 486 42 Q 496 28, 506 42 L 528 42',
    pacPath:
      // Elevated PAOP / RA equalization around y=110 with sharp x descent and blunted/absent y descent
      'M 10 108 Q 36 96, 52 108 Q 66 130, 82 110 Q 98 94, 114 108 L 136 108 ' +
      'Q 152 96, 168 108 Q 182 130, 198 110 Q 214 94, 230 108 L 252 108 ' +
      'Q 268 96, 284 108 Q 298 130, 314 110 Q 330 94, 346 108 L 368 108 ' +
      'Q 384 96, 400 108 Q 414 130, 430 110 Q 446 94, 462 108 L 484 108 ' +
      'Q 500 96, 516 108 L 528 112',
    refLineY: 108,
    refLabel: 'CVP ≈ PADP ≈ PAOP ≈ 19 mmHg',
    waveTags: [
      { x: 70, y: 140, text: 'Keskin x', color: '#34d399' },
      { x: 126, y: 120, text: 'y SİLİK', color: '#f43f5e' },
      { x: 292, y: 88, text: '4 Odacık Diyastol Eşit!', color: '#fbbf24' },
    ],
    morphology:
      'Perikard içi basınç tüm kalp boşluklarını dıştan eşit sıkıştırdığı için diyastol sonunda CVP ≈ RVEDP ≈ PADP ≈ PAOP eşitlenir. PAOP ve CVP’de sistolik x inişi korunur, ancak ventriküler doluş engellendiğinden y inişi silinir; CO ve SvO₂ hızla düşer.',
    causes: ['Post-kardiyak cerrahi hemoperikardiyum', 'Aort diseksiyonu / miyokard rüptürü', 'Malign/üremik perikardiyal efüzyon'],
    action: 'Acil perikardiyosentez / resternotomi hazırlığı! Drenaja kadar "Full, Fast, Tight" (ön yük + kalp hızı + SVR’yi koru; yüksek PEEP ve miyokard depresyonundan kaçın).',
  },
];

interface ShockPresetConfig {
  id: ShockPresetId;
  label: string;
  co: number;
  paop: number;
  cvp: number;
  map: number;
  mpap: number;
  note: string;
}

const SHOCK_PRESETS: ShockPresetConfig[] = [
  {
    id: 'normal',
    label: 'Normal',
    co: 5.2,
    paop: 9,
    cvp: 5,
    map: 82,
    mpap: 15,
    note: 'Dengeli ön yük, normal SVR/PVR ve optimal doku oksijenasyonu.',
  },
  {
    id: 'hypovolemic',
    label: 'Hipovolemik Şok',
    co: 2.8,
    paop: 3,
    cvp: 1,
    map: 58,
    mpap: 10,
    note: 'Düşük CVP/PAOP + düşük CO + kompansatuvar yüksek SVR + düşük SvO₂.',
  },
  {
    id: 'cardiogenic',
    label: 'Kardiyojenik Şok',
    co: 2.5,
    paop: 24,
    cvp: 15,
    map: 60,
    mpap: 36,
    note: 'Yüksek PAOP (sol kalp konjesyonu) + düşük CI (< 2.2) + yüksek SVR + düşük SvO₂.',
  },
  {
    id: 'septic',
    label: 'Septik (Distribütif)',
    co: 8.2,
    paop: 7,
    cvp: 4,
    map: 56,
    mpap: 16,
    note: 'Vazopleji (çok düşük SVR), hiperdinamik yüksek CO ve normal/yüksek SvO₂ (şantlanma).',
  },
  {
    id: 'obstructive-pe',
    label: 'Masif PE (Obstrüktif)',
    co: 2.9,
    paop: 8,
    cvp: 17,
    map: 62,
    mpap: 44,
    note: 'Çok yüksek mPAP & PVR + yüksek CVP ama normal/düşük PAOP (geniş TPG)!',
  },
  {
    id: 'rv-infarct',
    label: 'Akut RV İnfarktüsü',
    co: 2.7,
    paop: 8,
    cvp: 18,
    map: 58,
    mpap: 20,
    note: 'CVP > PAOP (CVP/PAOP > 0.86) ve düşük PAPi (< 0.9) — klasik izole RV yetersizliği!',
  },
];

export const PacMonitoringModule: React.FC<PacMonitoringModuleProps> = ({ isDark }) => {
  // Interactive Simulator State (Section 1)
  const [presetId, setPresetId] = useState<ShockPresetId>('normal');
  const [trueCo, setTrueCo] = useState<number>(5.2);
  const [paop, setPaop] = useState<number>(9);
  const [cvp, setCvp] = useState<number>(5);
  const [mapVal, setMapVal] = useState<number>(82);
  const [mpap, setMpap] = useState<number>(15);
  const [injectateError, setInjectateError] = useState<InjectateErrorId>('none');

  // Interactive Waveform State (Section 4)
  const [selectedPatternId, setSelectedPatternId] = useState<PacPatternId>('progression');

  const applyPreset = (preset: ShockPresetConfig) => {
    setPresetId(preset.id);
    setTrueCo(preset.co);
    setPaop(preset.paop);
    setCvp(preset.cvp);
    setMapVal(preset.map);
    setMpap(preset.mpap);
  };

  // Derived Hemodynamic Calculations (BSA = 1.85 m², Hb = 12 g/dL, SaO2 = 98%, VO2 = 230 mL/dk)
  const bsa = 1.85;
  const errorMultiplier =
    injectateError === 'low-volume'
      ? 1.55
      : injectateError === 'warm-uncorrected'
        ? 1.38
        : injectateError === 'tr-recirc'
          ? 0.72
          : 1.0;

  const displayedCo = Number((trueCo * errorMultiplier).toFixed(1));
  const ci = Number((displayedCo / bsa).toFixed(2));
  const svr = Math.max(150, Math.round((80 * (mapVal - cvp)) / Math.max(1.2, displayedCo)));
  const tpg = mpap - paop;
  const pvr = Math.max(20, Math.round((80 * Math.max(1, tpg)) / Math.max(1.2, displayedCo)));
  const pvrWu = Number((pvr / 80).toFixed(1));
  // Estimate sPAP & dPAP around mPAP for PAPi illustration
  const estPulsePa = Math.max(8, Math.round(mpap * 0.72));
  const estSpap = Math.round(mpap + (estPulsePa * 2) / 3);
  const estDpap = Math.max(4, estSpap - estPulsePa);
  const papi = Number(((estSpap - estDpap) / Math.max(1, cvp)).toFixed(2));

  // Estimate SvO2 from true CO (unless septic microvascular shunting raises it)
  const vo2 = presetId === 'septic' ? 195 : 235;
  const rawSvo2 = 98 - vo2 / (1.34 * 12 * Math.max(1.4, trueCo) * 10) * 100;
  const svo2 = Math.max(35, Math.min(86, Math.round(rawSvo2)));

  // Generate dynamic Stewart-Hamilton thermodilution SVG path (x: 40..330, baseline y=126)
  // Area under curve is inversely proportional to displayedCo!
  const buildThermodilutionPath = (coVal: number, isTrRecirc: boolean): string => {
    const pts: string[] = [];
    // Peak height & duration scale so AUC ∝ 1 / coVal
    const scale = 5.0 / Math.max(1.8, Math.min(10.5, coVal));
    const peakAmp = Math.min(84, 38 * Math.pow(scale, 0.42));
    const tau = Math.min(62, 24 * Math.pow(scale, 0.58));
    for (let i = 0; i <= 70; i++) {
      const t = i * 4; // 0..280 px
      const x = 42 + t;
      let deltaT = 0;
      if (t > 14) {
        const u = (t - 14) / tau;
        // Gamma-variate curve: u^2.2 * exp(-2.2*(u-1))
        deltaT = peakAmp * Math.pow(u, 2.2) * Math.exp(-2.2 * (u - 1)) * 0.92;
        if (isTrRecirc && u > 1.1) {
          // Prolonged tail / secondary recirculation hump in severe TR
          deltaT += peakAmp * 0.34 * Math.exp(-Math.pow((u - 2.3) / 0.95, 2));
        }
      }
      const y = Math.max(26, 126 - deltaT);
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const thermoCurvePath = buildThermodilutionPath(displayedCo, injectateError === 'tr-recirc');
  const thermoAreaPath = `${thermoCurvePath} L 322 126 L 42 126 Z`;
  const trueThermoRefPath =
    injectateError !== 'none' ? buildThermodilutionPath(trueCo, false) : null;

  // Dynamic phenotype diagnosis
  const phenotype =
    svr < 750 && ci >= 3.2
      ? {
          title: 'Distribütif / Vazoplejik Profil (Sepsis / Anafilaksi)',
          tone: 'amber' as const,
          detail: 'Düşük SVR + yüksek/normal CO. Öncelik vazopresör (norepinefrin/vazopresin) + odak kontrolü.',
        }
      : paop >= 18 && ci < 2.2
        ? {
            title: 'Sol Ventrikül Kardiyojenik Şok (Islak & Soğuk)',
            tone: 'rose' as const,
            detail: 'Yüksek PAOP + düşük CI + yüksek SVR. İnodilatör (milrinon/dobutamin), diürez ve gerekirse MCS (Impella/IABP).',
          }
        : cvp >= 14 && paop <= 12 && pvrWu >= 3.0
          ? {
              title: 'Obstrüktif / Pre-Kapiller Pulmoner HT Profili (Masif PE)',
              tone: 'rose' as const,
              detail: 'Yüksek mPAP & PVR + yüksek CVP + normal/düşük PAOP. RV ard yükünü düşür (O₂/iNO), tromboliz/trombektomi düşün.',
            }
          : cvp >= 14 && cvp > paop && papi < 1.0
            ? {
                title: 'İzole Sağ Ventrikül Yetersizliği (RV MI / Post-LVAD)',
                tone: 'rose' as const,
                detail: 'CVP > PAOP ve PAPi < 0.9–1.0. Aşırı sıvıdan kaçın (septal kayma!), inotrop + RV koroner perfüzyonunu koru.',
              }
            : paop <= 5 && cvp <= 3 && ci < 2.2
              ? {
                  title: 'Hipovolemik / Ön Yük Eksikliği Profili',
                  tone: 'amber' as const,
                  detail: 'Düşük CVP & PAOP + düşük CI + yüksek SVR. Dengeli sıvı/kan ürünü resüsitasyonu ve kanama kontrolü.',
                }
              : {
                  title: 'Kompanse / Normal Hemodinamik Profil',
                  tone: 'emerald' as const,
                  detail: 'CI 2.5–4.0 L/dk/m², SVR 800–1200, PVR < 2 WU ve SvO₂ %65–75 hedef aralığında.',
                };

  const selectedPattern =
    PAC_PATTERNS.find((p) => p.id === selectedPatternId) ?? PAC_PATTERNS[0];

  const sectionCardClass = isDark
    ? 'rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 space-y-4'
    : 'rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4 shadow-xs';

  const subCardClass = isDark
    ? 'rounded-xl border border-slate-800 bg-slate-950/60 p-3.5'
    : 'rounded-xl border border-slate-200 bg-slate-50/70 p-3.5';

  return (
    <div className="space-y-6">
      {/* Top Clinical Hero Strip */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 ${
          isDark
            ? 'bg-gradient-to-br from-fuchsia-950/40 via-slate-900 to-slate-900 border-fuchsia-500/30'
            : 'bg-gradient-to-br from-fuchsia-50/90 via-white to-slate-50 border-fuchsia-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  isDark
                    ? 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30'
                    : 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200'
                }`}
              >
                İleri İnvaziv Hemodinami · Swan-Ganz
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                6 Bölümlü Sistematik Çerçeve · 7 Trase + Canlı Termodilüsyon Simülatörü
              </span>
            </div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Pulmoner Arter Kateteri (PAC / Swan-Ganz Monitörizasyonu)
            </h3>
            <p className={`text-xs leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Sağ kalp doluş basınçları (CVP/PAP), sol atriyum yansıması (PAOP / West Zone III), Stewart-Hamilton
              termodilüsyon kardiyak debi (CO/CI) ve mikst venöz oksijen satürasyonunu (<span className="font-mono font-semibold">SvO₂</span>)
              tek kateterle izleyen ileri hemodinamik monitör.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
            {[
              { label: 'PAP (S/D)', value: '15–30 / 4–12', tone: 'text-amber-500' },
              { label: 'PAOP (Wedge)', value: '6–12 mmHg', tone: 'text-fuchsia-500' },
              { label: 'Kardiyak İnd.', value: '2.5–4.0', tone: 'text-emerald-500' },
              { label: 'SvO₂ Hedef', value: '%65–75', tone: 'text-sky-500' },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border px-3 py-2 text-center ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[10px] font-semibold text-slate-400">{item.label}</div>
                <div className={`text-xs font-mono font-bold mt-0.5 tabular-nums ${item.tone}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: FİZİKSEL PRENSİP VE ÇALIŞMA MEKANİZMASI */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            1
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              West Zone III Statik Sıvı Kolonu (PAOP ≈ LAP), Stewart-Hamilton Termodilüsyon Fiziği ve Fiberoptik SvO₂
            </p>
          </div>
        </div>

        {/* Visual 1A: Dual Physics Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left SVG: West Zone III & Static Fluid Column */}
          <div className={subCardClass}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                A. West Zone III & Statik Sıvı Kolonu (PAOP ≈ LAP)
              </span>
              <span className="text-[10px] font-mono text-fuchsia-500 font-bold">Pa &gt; Pv &gt; PA</span>
            </div>

            <svg viewBox="0 0 460 215" className="w-full h-auto rounded-lg">
              <rect x="0" y="0" width="460" height="215" rx="10" fill={isDark ? '#090d16' : '#f8fafc'} />

              {/* Zone I/II Failure Strip (Top) */}
              <rect x="12" y="10" width="436" height="58" rx="8" fill={isDark ? '#2a1215' : '#fff1f2'} stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 2" />
              <text x="22" y="26" fill="#f43f5e" fontSize="10" fontWeight="bold" fontFamily="monospace">
                WEST ZONE I / II (PEEP Yüksek · Hipovolemi): PA &gt; Pv → Kapiller Kollabe!
              </text>
              {/* Alveolus compressing capillary */}
              <circle cx="178" cy="44" r="14" fill="none" stroke="#f43f5e" strokeWidth="1.6" />
              <text x="178" y="47" fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">PA↑</text>
              <path d="M 48 44 L 154 44 C 164 44, 168 56, 178 56 C 188 56, 192 44, 202 44 L 280 44" fill="none" stroke="#fb7185" strokeWidth="2.5" strokeDasharray="4 2" />
              <text x="292" y="42" fill={isDark ? '#fda4af' : '#be123c'} fontSize="9.5" fontWeight="bold">
                Kırık Sütun → PAOP ≈ PEEP!
              </text>
              <text x="292" y="56" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.5">
                Sol atriyum yerine alveoler basınç ölçülür
              </text>

              {/* Zone III Valid Continuous Fluid Column (Bottom) */}
              <rect x="12" y="78" width="436" height="126" rx="8" fill={isDark ? '#0d1f1c' : '#ecfdf5'} stroke="#10b981" strokeWidth="1.2" />
              <text x="22" y="95" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">
                WEST ZONE III (LA Seviyesi / Altı): Pa &gt; Pv &gt; PA → Kesintisiz Sıvı Sütunu ✓
              </text>

              {/* PA vessel + Catheter + Inflated Balloon */}
              <path d="M 24 128 L 152 128 Q 190 128, 224 126 Q 270 124, 314 128 L 366 128" fill="none" stroke={isDark ? '#334155' : '#94a3b8'} strokeWidth="2" />
              <path d="M 24 162 L 152 162 Q 190 162, 224 164 Q 270 166, 314 162 L 366 162" fill="none" stroke={isDark ? '#334155' : '#94a3b8'} strokeWidth="2" />
              {/* Static continuous fluid fill */}
              <rect x="130" y="130" width="236" height="30" fill="#e879f9" fillOpacity="0.16" />

              {/* Swan-Ganz catheter shaft */}
              <line x1="24" y1="145" x2="132" y2="145" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
              {/* Inflated balloon */}
              <ellipse cx="116" cy="145" rx="15" ry="15" fill="#f43f5e" fillOpacity="0.35" stroke="#f43f5e" strokeWidth="2" />
              <text x="68" y="121" fill="#facc15" fontSize="9" fontWeight="bold" textAnchor="middle">PA Kateteri</text>
              <text x="116" y="182" fill="#f43f5e" fontSize="8.5" fontWeight="bold" textAnchor="middle">Balon (1.5 mL)</text>
              <text x="116" y="193" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8" textAnchor="middle">Akım = 0</text>

              {/* Open capillary bed under alveolus */}
              <circle cx="228" cy="112" r="10" fill="none" stroke="#38bdf8" strokeWidth="1.3" />
              <text x="228" y="115" fill="#38bdf8" fontSize="8" textAnchor="middle">PA</text>
              <text x="234" y="149" fill="#e879f9" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                STATİK KOLON (ΔP = 0)
              </text>
              <text x="234" y="182" fill="#10b981" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                Pulmoner Kapiller → Pulmoner Ven
              </text>

              {/* Left Atrium & LV Box */}
              <rect x="366" y="116" width="70" height="58" rx="10" fill="#e879f9" fillOpacity="0.22" stroke="#e879f9" strokeWidth="1.8" />
              <text x="401" y="138" fill={isDark ? '#f5d0fe' : '#86198f'} fontSize="11" fontWeight="bold" textAnchor="middle">LA</text>
              <text x="401" y="152" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.5" textAnchor="middle">Mitral Açık</text>
              <text x="401" y="165" fill="#10b981" fontSize="8.5" fontWeight="bold" textAnchor="middle">≈ LVEDP</text>
            </svg>
          </div>

          {/* Right SVG: Stewart-Hamilton Thermodilution & SvO2 Fick */}
          <div className={subCardClass}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                B. Stewart-Hamilton Termodilüsyon & Fiberoptik SvO₂
              </span>
              <span className="text-[10px] font-mono text-amber-500 font-bold">CO ∝ 1 / AUC</span>
            </div>

            <svg viewBox="0 0 460 215" className="w-full h-auto rounded-lg">
              <rect x="0" y="0" width="460" height="215" rx="10" fill={isDark ? '#090d16' : '#f8fafc'} />

              {/* Equation header */}
              <rect x="14" y="10" width="432" height="32" rx="6" fill={isDark ? '#1e293b' : '#eef2ff'} stroke={isDark ? '#334155' : '#c7d2fe'} />
              <text x="230" y="30" fill={isDark ? '#f8fafc' : '#1e293b'} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                CO = [ V_inj × (T_kan − T_inj) × K ] / ∫ ΔT(t) dt   (Ters Orantı!)
              </text>

              {/* Axes */}
              <line x1="42" y1="146" x2="292" y2="146" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.2" />
              <line x1="42" y1="54" x2="42" y2="146" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.2" />
              <text x="16" y="104" fill="#94a3b8" fontSize="9" fontFamily="monospace" transform="rotate(-90 16 104)">ΔT (°C)</text>
              <text x="276" y="159" fill="#94a3b8" fontSize="9" fontFamily="monospace">Zaman (s)</text>

              {/* High CO curve (sharp, small AUC) */}
              <path d="M 44 146 L 56 146 Q 74 62, 92 108 Q 110 144, 146 146" fill="#34d399" fillOpacity="0.18" stroke="#34d399" strokeWidth="2.2" />
              <text x="88" y="64" fill="#34d399" fontSize="9" fontWeight="bold">Yüksek CO (Küçük AUC)</text>

              {/* Normal CO curve */}
              <path d="M 44 146 L 62 146 Q 94 78, 128 118 Q 162 144, 212 146" fill="#facc15" fillOpacity="0.14" stroke="#facc15" strokeWidth="2" strokeDasharray="4 2" />
              <text x="150" y="96" fill="#facc15" fontSize="9" fontWeight="bold">Normal CO</text>

              {/* Low CO curve (wide, large AUC) */}
              <path d="M 44 146 L 68 146 Q 116 96, 176 116 Q 236 138, 286 146" fill="#f43f5e" fillOpacity="0.18" stroke="#f43f5e" strokeWidth="2.2" />
              <text x="214" y="114" fill="#f43f5e" fontSize="9" fontWeight="bold">Düşük CO (Geniş AUC)</text>

              {/* Right Callout Box: CCO & SvO2 */}
              <rect x="306" y="54" width="140" height="94" rx="8" fill={isDark ? '#111827' : '#ffffff'} stroke={isDark ? '#334155' : '#cbd5e1'} />
              <text x="316" y="72" fill="#38bdf8" fontSize="9.5" fontWeight="bold">Fiberoptik SvO₂ (%65–75)</text>
              <text x="316" y="88" fill={isDark ? '#cbd5e1' : '#334155'} fontSize="8.5" fontFamily="monospace">SvO₂ = SaO₂ − VO₂/(13.4·Hb·CO)</text>
              <text x="316" y="104" fill="#94a3b8" fontSize="8.5">• SvO₂ ↓: CO↓, Hb↓, SaO₂↓, VO₂↑</text>
              <text x="316" y="118" fill="#94a3b8" fontSize="8.5">• SvO₂ ↑: Sepsis, şant, wedge!</text>
              <text x="316" y="136" fill="#e879f9" fontSize="8.5" fontWeight="bold">CCO: Termal filaman (3–6 dk)</text>

              {/* Bottom clinical rule */}
              <rect x="14" y="168" width="432" height="36" rx="6" fill={isDark ? '#172554' : '#eff6ff'} stroke={isDark ? '#1d4ed8' : '#bfdbfe'} />
              <text x="24" y="183" fill={isDark ? '#93c5fd' : '#1d4ed8'} fontSize="9" fontWeight="bold">
                Enjeksiyon Kuralı:
              </text>
              <text x="116" y="183" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9">
                RA (mavi) porttan 10 mL salin ≤ 4 sn’de, aynı solunum fazında 3 kez ver; %10 içi 3 ölçümün ortalamasını al.
              </text>
              <text x="24" y="197" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">
                Eksik volüm (&lt;10 mL) veya ılık enjektat → AUC küçülür → YALANCI YÜKSEK CO!
              </text>
            </svg>
          </div>
        </div>

        {/* Interactive Simulator 1B */}
        <div
          className={`rounded-xl border p-4 space-y-4 ${
            isDark ? 'bg-slate-950/80 border-fuchsia-500/30' : 'bg-fuchsia-50/40 border-fuchsia-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-fuchsia-500" />
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Canlı Termodilüsyon (Stewart-Hamilton) & Hemodinamik Şok Profili Simülatörü
              </span>
            </div>
            <span className="text-[11px] font-mono text-fuchsia-500 font-semibold">
              BSA 1.85 m² · Hb 12 g/dL · SaO₂ %98
            </span>
          </div>

          {/* Clinical Shock Preset Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {SHOCK_PRESETS.map((preset) => {
              const active = presetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                    active
                      ? isDark
                        ? 'bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-200'
                        : 'bg-fuchsia-600 border-fuchsia-600 text-white'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-fuchsia-300'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-3">
              {[
                {
                  label: 'Gerçek Kardiyak Debi (CO)',
                  val: `${trueCo.toFixed(1)} L/dk`,
                  min: 2.0,
                  max: 9.0,
                  step: 0.1,
                  value: trueCo,
                  onChange: setTrueCo,
                  accent: 'accent-amber-500',
                },
                {
                  label: 'PAOP (Sol Atriyum / Wedge)',
                  val: `${paop} mmHg`,
                  min: 2,
                  max: 28,
                  step: 1,
                  value: paop,
                  onChange: setPaop,
                  accent: 'accent-fuchsia-500',
                },
                {
                  label: 'CVP (Sağ Atriyum)',
                  val: `${cvp} mmHg`,
                  min: 1,
                  max: 22,
                  step: 1,
                  value: cvp,
                  onChange: setCvp,
                  accent: 'accent-sky-500',
                },
                {
                  label: 'Ortalama PA Basıncı (mPAP)',
                  val: `${mpap} mmHg`,
                  min: 10,
                  max: 55,
                  step: 1,
                  value: mpap,
                  onChange: setMpap,
                  accent: 'accent-yellow-500',
                },
                {
                  label: 'Ortalama Arter Basıncı (MAP)',
                  val: `${mapVal} mmHg`,
                  min: 45,
                  max: 110,
                  step: 1,
                  value: mapVal,
                  onChange: setMapVal,
                  accent: 'accent-rose-500',
                },
              ].map((ctrl) => (
                <div key={ctrl.label} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{ctrl.label}</span>
                    <span className="font-mono font-bold tabular-nums text-fuchsia-500">{ctrl.val}</span>
                  </div>
                  <input
                    type="range"
                    min={ctrl.min}
                    max={ctrl.max}
                    step={ctrl.step}
                    value={ctrl.value}
                    onChange={(e) => ctrl.onChange(Number(e.target.value))}
                    className={`w-full h-1.5 rounded-lg cursor-pointer ${ctrl.accent}`}
                  />
                </div>
              ))}

              {/* Thermodilution Error Injector */}
              <div className={`pt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="text-[11px] font-bold mb-1.5 text-slate-400">
                  Termodilüsyon Ölçüm Hatası Ekle (Stewart-Hamilton Testi):
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'none' as const, label: 'Hatasız (10 mL)' },
                    { id: 'low-volume' as const, label: 'Eksik Hacim (6 mL)' },
                    { id: 'warm-uncorrected' as const, label: 'Ilık Salin (Yanlış T)' },
                    { id: 'tr-recirc' as const, label: 'Şiddetli TY (Resirk.)' },
                  ].map((err) => (
                    <button
                      key={err.id}
                      type="button"
                      onClick={() => setInjectateError(err.id)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold border text-left transition-colors cursor-pointer ${
                        injectateError === err.id
                          ? 'bg-rose-500/15 border-rose-500 text-rose-500'
                          : isDark
                            ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {err.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Live Readout + Thermodilution SVG */}
            <div className="lg:col-span-7 space-y-3">
              {/* Dark Monitor Box for Stewart-Hamilton Curve */}
              <div className="rounded-xl bg-[#070b14] border border-slate-800 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold text-amber-300">
                      TERMODİLÜSYON EĞRİSİ (ΔT vs ZAMAN)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs tabular-nums">
                    <span className="text-slate-400">
                      Gerçek CO: <strong className="text-emerald-400">{trueCo.toFixed(1)}</strong>
                    </span>
                    <span className={injectateError !== 'none' ? 'text-rose-400 font-bold' : 'text-amber-300 font-bold'}>
                      Ölçülen CO: {displayedCo.toFixed(1)} L/dk
                    </span>
                  </div>
                </div>

                <svg viewBox="0 0 360 150" className="w-full h-auto">
                  {/* Grid */}
                  {[35, 65, 95, 126].map((y) => (
                    <line key={y} x1="40" y1={y} x2="338" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  ))}
                  <line x1="42" y1="22" x2="42" y2="128" stroke="#475569" strokeWidth="1.2" />
                  <line x1="42" y1="126" x2="340" y2="126" stroke="#475569" strokeWidth="1.2" />
                  <text x="14" y="84" fill="#64748b" fontSize="9" fontFamily="monospace" transform="rotate(-90 14 84)">
                    −ΔT (°C)
                  </text>
                  <text x="310" y="141" fill="#64748b" fontSize="9" fontFamily="monospace">20 sn</text>
                  <text x="48" y="141" fill="#38bdf8" fontSize="8.5" fontFamily="monospace">Enjeksiyon (RA)</text>

                  {/* Reference true curve if error active */}
                  {trueThermoRefPath && (
                    <path
                      d={trueThermoRefPath}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                  )}

                  {/* Active displayed curve */}
                  <path
                    d={thermoAreaPath}
                    fill={injectateError !== 'none' ? '#f43f5e' : '#facc15'}
                    fillOpacity="0.16"
                  />
                  <path
                    d={thermoCurvePath}
                    fill="none"
                    stroke={injectateError !== 'none' ? '#fb7185' : '#facc15'}
                    strokeWidth="2.6"
                  />

                  <text x="210" y="34" fill={injectateError !== 'none' ? '#fda4af' : '#fde047'} fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                    {injectateError === 'low-volume'
                      ? 'Eksik salin → Küçük AUC → YALANCI YÜKSEK CO!'
                      : injectateError === 'warm-uncorrected'
                        ? 'Sıcak salin → Küçük ΔT → YALANCI YÜKSEK CO!'
                        : injectateError === 'tr-recirc'
                          ? 'TY resirkülasyonu → Geniş kuyruk → DÜŞÜK CO!'
                          : `AUC ∝ 1 / ${displayedCo.toFixed(1)} L/dk`}
                  </text>
                </svg>
              </div>

              {/* Derived Hemodynamic Indices Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  {
                    label: 'CI (L/dk/m²)',
                    val: ci.toFixed(2),
                    ref: '2.5–4.0',
                    alert: ci < 2.2,
                  },
                  {
                    label: 'SVR (dyn·s/cm⁵)',
                    val: `${svr}`,
                    ref: '800–1200',
                    alert: svr < 750 || svr > 1400,
                  },
                  {
                    label: 'PVR (dyn·s / WU)',
                    val: `${pvr} (${pvrWu})`,
                    ref: '< 160 (<2 WU)',
                    alert: pvrWu >= 3.0,
                  },
                  {
                    label: 'TPG (mPAP−PAOP)',
                    val: `${tpg} mmHg`,
                    ref: '≤ 12 mmHg',
                    alert: tpg > 12,
                  },
                  {
                    label: 'PAPi (RV İndeksi)',
                    val: papi.toFixed(2),
                    ref: '> 1.0 (RV!)',
                    alert: papi < 1.0,
                  },
                  {
                    label: 'Tahmini SvO₂',
                    val: `%${svo2}`,
                    ref: '%65–75',
                    alert: svo2 < 60,
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className={`rounded-xl border px-3 py-2 ${
                      m.alert
                        ? isDark
                          ? 'bg-rose-500/10 border-rose-500/40'
                          : 'bg-rose-50 border-rose-300'
                        : isDark
                          ? 'bg-slate-900 border-slate-800'
                          : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="text-[10px] font-semibold text-slate-400">{m.label}</div>
                    <div
                      className={`text-sm font-mono font-bold tabular-nums mt-0.5 ${
                        m.alert ? 'text-rose-500' : isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {m.val}
                    </div>
                    <div className="text-[9.5px] font-mono text-slate-400">Ref: {m.ref}</div>
                  </div>
                ))}
              </div>

              {/* Phenotype Banner */}
              <div
                className={`rounded-xl border px-3.5 py-2.5 text-xs ${
                  phenotype.tone === 'rose'
                    ? isDark
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                    : phenotype.tone === 'amber'
                      ? isDark
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                      : isDark
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}
              >
                <div className="font-bold">{phenotype.title}</div>
                <div className="mt-0.5 opacity-90">{phenotype.detail}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ENDİKASYONLAR VE KLİNİK AMAÇ */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            2
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Endikasyonlar ve Klinik Amaç
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Seçilmiş Kompleks Hemodinami (Kardiyojenik Şok, PH, MCS, Transplant) vs Rutin Kullanım Sınırı
            </p>
          </div>
        </div>

        {/* Visual 2A: 4-Panel Clinical Role SVG */}
        <svg viewBox="0 0 880 170" className="w-full h-auto rounded-xl">
          <rect x="0" y="0" width="880" height="170" rx="12" fill={isDark ? '#090d16' : '#f8fafc'} />

          {/* Panel 1 */}
          <rect x="14" y="14" width="204" height="142" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke="#d946ef" strokeWidth="1.2" />
          <text x="26" y="34" fill="#d946ef" fontSize="10.5" fontWeight="bold">1. KARDİYOJENİK ŞOK & MCS</text>
          <text x="26" y="54" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• SCAI Evre C–E şok fenotipleme</text>
          <text x="26" y="70" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• LVAD, Impella, VA-ECMO ayarı</text>
          <text x="26" y="86" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• RV yetersizliği (PAPi &lt; 0.9)</text>
          <text x="26" y="102" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• İnotrop / vazopresör titrasyonu</text>
          <rect x="26" y="118" width="180" height="26" rx="5" fill="#d946ef" fillOpacity="0.14" />
          <text x="116" y="135" fill="#e879f9" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Erken PAC → MCS Mortalite ↓
          </text>

          {/* Panel 2 */}
          <rect x="230" y="14" width="204" height="142" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke="#f59e0b" strokeWidth="1.2" />
          <text x="242" y="34" fill="#f59e0b" fontSize="10.5" fontWeight="bold">2. KOMPLEKS CERRAHİ</text>
          <text x="242" y="54" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• Düşük EF / kombine kapak KVC</text>
          <text x="242" y="70" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• Kalp, akciğer, karaciğer nakli</text>
          <text x="242" y="86" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• Pulmoner tromboendarterektomi</text>
          <text x="242" y="102" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• CPB çıkışında RV/LV ayrımı</text>
          <rect x="242" y="118" width="180" height="26" rx="5" fill="#f59e0b" fillOpacity="0.14" />
          <text x="332" y="135" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            TEE + PAC Birbirini Tamamlar
          </text>

          {/* Panel 3 */}
          <rect x="446" y="14" width="204" height="142" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke="#0ea5e9" strokeWidth="1.2" />
          <text x="458" y="34" fill="#0ea5e9" fontSize="10.5" fontWeight="bold">3. PULMONER HİPERTANSİYON</text>
          <text x="458" y="54" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• Pre-kapiller: mPAP&gt;20, PAOP≤15</text>
          <text x="458" y="70" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• Post-kapiller: PAOP &gt; 15 mmHg</text>
          <text x="458" y="86" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• iNO / epoprostenol yanıt testi</text>
          <text x="458" y="102" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.5">• İntrakardiyak şant (O₂ step-up)</text>
          <rect x="458" y="118" width="180" height="26" rx="5" fill="#0ea5e9" fillOpacity="0.14" />
          <text x="548" y="135" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            ESC/ERS: Altın Standart Tanı
          </text>

          {/* Panel 4 */}
          <rect x="662" y="14" width="204" height="142" rx="10" fill={isDark ? '#1f1215' : '#fff1f2'} stroke="#f43f5e" strokeWidth="1.2" />
          <text x="674" y="34" fill="#f43f5e" fontSize="10.5" fontWeight="bold">4. NE ZAMAN TAKILMAZ?</text>
          <text x="674" y="54" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9.5">• Rutin non-kardiyak cerrahi</text>
          <text x="674" y="70" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9.5">• Komplike olmayan sepsis/ARDS</text>
          <text x="674" y="86" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9.5">• Mekanik triküspit / pulmoner kapak</text>
          <text x="674" y="102" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9.5">• Sağ kalp tümörü / endokardit</text>
          <rect x="674" y="118" width="180" height="26" rx="5" fill="#f43f5e" fillOpacity="0.16" />
          <text x="764" y="135" fill="#fb7185" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            PAC-Man / ESCAPE: Rutin Yarar Yok
          </text>
        </svg>

        {/* Shock Differential Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                <th className="text-left p-2.5 font-bold rounded-tl-lg">Şok Fenotipi</th>
                <th className="text-center p-2.5 font-bold">CVP</th>
                <th className="text-center p-2.5 font-bold">PAOP</th>
                <th className="text-center p-2.5 font-bold">CO / CI</th>
                <th className="text-center p-2.5 font-bold">SVR</th>
                <th className="text-center p-2.5 font-bold rounded-tr-lg">SvO₂</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
              {[
                { type: 'Hipovolemik Şok', cvp: '↓↓', paop: '↓↓', co: '↓↓', svr: '↑↑', svo2: '↓↓' },
                { type: 'Kardiyojenik Şok (LV)', cvp: '↑ / ↑↑', paop: '↑↑↑', co: '↓↓', svr: '↑↑', svo2: '↓↓' },
                { type: 'Septik / Distribütif (Erken)', cvp: '↓ / N', paop: '↓ / N', co: '↑↑', svr: '↓↓↓', svo2: 'N / ↑' },
                { type: 'Kardiyak Tamponad', cvp: '↑↑ (Eşit)', paop: '↑↑ (Eşit)', co: '↓↓', svr: '↑↑', svo2: '↓↓' },
                { type: 'Masif PE / RV İnfarktüsü', cvp: '↑↑↑', paop: '↓ / N', co: '↓↓', svr: '↑↑', svo2: '↓↓' },
              ].map((row) => (
                <tr key={row.type} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                  <td className={`p-2.5 font-sans font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {row.type}
                  </td>
                  <td className="p-2.5 text-center text-sky-500 font-bold">{row.cvp}</td>
                  <td className="p-2.5 text-center text-fuchsia-500 font-bold">{row.paop}</td>
                  <td className="p-2.5 text-center text-amber-500 font-bold">{row.co}</td>
                  <td className="p-2.5 text-center text-rose-500 font-bold">{row.svr}</td>
                  <td className="p-2.5 text-center text-emerald-500 font-bold">{row.svo2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: TEKNİK KURULUM VE KALİBRASYON */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            3
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Teknik Kurulum ve Kalibrasyon
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              7–7.5 Fr (110 cm) Swan-Ganz Lümen Haritası, İlerletme Derinlikleri ve 4’lü Wedge Doğrulama Kuralı
            </p>
          </div>
        </div>

        {/* Visual 3A: Swan-Ganz Catheter Anatomy & Depth Ruler SVG */}
        <div className={subCardClass}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              <Wrench className="w-3.5 h-3.5 text-fuchsia-500" />
              Swan-Ganz 4-Lümen Kateter Anatomisi & Sağ IJ İlerletme Mesafeleri (10 cm / 50 cm İşaretler)
            </span>
            <span className="text-[10px] font-mono text-amber-500 font-bold">8.5 Fr Introducer · 1.5 mL Hava</span>
          </div>

          <svg viewBox="0 0 860 225" className="w-full h-auto rounded-lg">
            <rect x="0" y="0" width="860" height="225" rx="10" fill={isDark ? '#090d16' : '#f8fafc'} />

            {/* Proximal hub manifolds (left) */}
            {/* Blue RA/CVP port */}
            <rect x="18" y="22" width="136" height="26" rx="5" fill="#0ea5e9" fillOpacity="0.18" stroke="#0ea5e9" strokeWidth="1.2" />
            <text x="86" y="39" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle">MAVİ: RA / CVP (30 cm)</text>
            <path d="M 154 35 L 222 92" stroke="#0ea5e9" strokeWidth="2" />

            {/* Yellow Distal PA port */}
            <rect x="18" y="58" width="136" height="26" rx="5" fill="#eab308" fillOpacity="0.18" stroke="#eab308" strokeWidth="1.2" />
            <text x="86" y="75" fill="#facc15" fontSize="9.5" fontWeight="bold" textAnchor="middle">SARI: Distal PA / PAOP</text>
            <path d="M 154 71 L 222 96" stroke="#facc15" strokeWidth="2.2" />

            {/* Red Balloon port */}
            <rect x="18" y="94" width="136" height="26" rx="5" fill="#f43f5e" fillOpacity="0.18" stroke="#f43f5e" strokeWidth="1.2" />
            <text x="86" y="111" fill="#fb7185" fontSize="9.5" fontWeight="bold" textAnchor="middle">KIRMIZI: Balon (1.5 mL)</text>
            <path d="M 154 107 L 222 100" stroke="#f43f5e" strokeWidth="2" />

            {/* Thermistor / Optical connector */}
            <rect x="18" y="130" width="136" height="26" rx="5" fill="#d946ef" fillOpacity="0.18" stroke="#d946ef" strokeWidth="1.2" />
            <text x="86" y="147" fill="#e879f9" fontSize="9.5" fontWeight="bold" textAnchor="middle">TERMİSTÖR + SvO₂ / CCO</text>
            <path d="M 154 143 L 222 104" stroke="#d946ef" strokeWidth="2" />

            {/* Main catheter body (110 cm yellow shaft) */}
            <rect x="220" y="90" width="585" height="16" rx="8" fill="#eab308" fillOpacity="0.88" stroke="#ca8a04" strokeWidth="1.4" />

            {/* Depth ruler ticks on catheter (10 cm thin, 50 cm thick!) */}
            {[
              { x: 270, label: '50 cm', thick: true },
              { x: 380, label: '40 cm', thick: false },
              { x: 490, label: '30 cm', thick: false },
              { x: 600, label: '20 cm', thick: false },
              { x: 710, label: '10 cm', thick: false },
            ].map((tick) => (
              <g key={tick.label}>
                <rect
                  x={tick.x - (tick.thick ? 5 : 2)}
                  y="90"
                  width={tick.thick ? 10 : 4}
                  height="16"
                  fill="#0f172a"
                />
                <text x={tick.x} y="82" fill={tick.thick ? '#f43f5e' : '#94a3b8'} fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {tick.label}
                </text>
              </g>
            ))}

            {/* Proximal RA port opening at 30 cm from tip */}
            <circle cx="490" cy="98" r="4" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="490" y1="108" x2="490" y2="132" stroke="#0ea5e9" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="490" y="144" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">RA Portu (Uçtan 30 cm)</text>
            <text x="490" y="156" fill="#94a3b8" fontSize="8" textAnchor="middle">CVP & Soğuk Salin Bolusu</text>

            {/* Thermistor bead at 4 cm from tip */}
            <circle cx="764" cy="98" r="4" fill="#d946ef" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="764" y1="88" x2="764" y2="56" stroke="#d946ef" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="752" y="42" fill="#e879f9" fontSize="9" fontWeight="bold" textAnchor="middle">Termistör (4 cm)</text>
            <text x="752" y="53" fill="#94a3b8" fontSize="8" textAnchor="middle">Kor Isısı + ΔT</text>

            {/* Distal balloon & open tip */}
            <ellipse cx="792" cy="98" rx="16" ry="15" fill="#f43f5e" fillOpacity="0.32" stroke="#f43f5e" strokeWidth="2" />
            <circle cx="808" cy="98" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
            <text x="802" y="128" fill="#fb7185" fontSize="9" fontWeight="bold" textAnchor="middle">Balon (1.5 mL)</text>
            <text x="802" y="140" fill="#facc15" fontSize="8.5" fontWeight="bold" textAnchor="middle">Distal Uç (PA/PAOP)</text>

            {/* Bottom Depth Progression Strip (RIJ) */}
            <rect x="220" y="170" width="622" height="42" rx="8" fill={isDark ? '#111827' : '#ffffff'} stroke={isDark ? '#334155' : '#cbd5e1'} />
            <text x="234" y="187" fill="#94a3b8" fontSize="9" fontWeight="bold">SAĞ IJ DERİNLİK REHBERİ:</text>
            <text x="234" y="202" fill="#38bdf8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">15–20 cm: RA (Balon Şişir!)</text>
            <text x="404" y="202" fill="#fbbf24" fontSize="9.5" fontWeight="bold" fontFamily="monospace">→ 25–35 cm: RV</text>
            <text x="518" y="202" fill="#facc15" fontSize="9.5" fontWeight="bold" fontFamily="monospace">→ 35–45 cm: PA</text>
            <text x="632" y="202" fill="#e879f9" fontSize="9.5" fontWeight="bold" fontFamily="monospace">→ 40–50 cm: PAOP (Söndür!)</text>
          </svg>
        </div>

        {/* Setup & Verification Checklists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={subCardClass}>
            <div className="flex items-center gap-2 mb-2.5">
              <ClipboardList className="w-4 h-4 text-emerald-500" />
              <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Yerleştirme ve Kalibrasyon Altın Kuralları
              </span>
            </div>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Balon Testi:</strong> Takmadan önce 1.5 mL hava ile simetri kontrolü yapın; asla sıvı/salin ile şişirmeyin (boşalmaz!).</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Şişik İlerlet · Sönük Geri Çek:</strong> RA’ya (20 cm) gelince balonu 1.5 mL şişirip akımla ilerletin; geri çekerken mutlaka tamamen söndürün.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Flebostatik Eksen & Dinamik Test:</strong> 4. İKA / orta-aksiller hatta sıfırlayın; kare dalga (Fast-Flush) ile sönümlemeyi kontrol edin.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Düğüm Sınırı:</strong> 50–55 cm ilerleyip hâlâ RV/PA görülmediyse ilerlemeyi durdurun — RV içinde kıvrılma/düğümlenme riski!</span>
              </li>
            </ul>
          </div>

          <div className={subCardClass}>
            <div className="flex items-center gap-2 mb-2.5">
              <Gauge className="w-4 h-4 text-fuchsia-500" />
              <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Gerçek PAOP (Wedge) Doğrulama — 4 Kriter
              </span>
            </div>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li className="flex gap-2">
                <span className="font-mono font-bold text-fuchsia-500">1.</span>
                <span><strong>Basınç Kuralı:</strong> Ortalama PAOP, ortalama PA basıncından (mPAP) düşük ve genellikle PADP’ye eşit veya düşük olmalıdır.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono font-bold text-fuchsia-500">2.</span>
                <span><strong>Atriyal Morfoloji:</strong> PA dikrotik çentiği kaybolmalı, gecikmiş sol atriyal <strong>a</strong> ve <strong>v</strong> dalgaları seçilmelidir.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono font-bold text-fuchsia-500">3.</span>
                <span><strong>Hızlı Geri Dönüş:</strong> Balon pasif olarak söndüğünde trase anında keskin PA dalgasına dönmelidir (dönmüyorsa distal göç!).</span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono font-bold text-fuchsia-500">4.</span>
                <span><strong>Kapillerize Kan (Şüphede):</strong> Wedge pozisyonunda nazikçe aspire edilen kanın SO₂’si &gt; %95 (arteriyelize) olmalıdır.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: NORMAL VE PATOLOJİK DALGA FORMLARI */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            4
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Normal ve Patolojik Dalga Formları (Eşzamanlı EKG + PAC Monitörü)
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              7 Kritik Trase: 4 Odacık İlerletme, Normal PA→PAOP, Dev v (MY), Overwedging, RV Slip-Back, PH ve Tamponad
            </p>
          </div>
        </div>

        {/* Pattern Selector Pills */}
        <div className="flex flex-wrap gap-1.5">
          {PAC_PATTERNS.map((pat) => {
            const active = pat.id === selectedPatternId;
            return (
              <button
                key={pat.id}
                type="button"
                onClick={() => setSelectedPatternId(pat.id)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                  active
                    ? isDark
                      ? 'bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-200'
                      : 'bg-fuchsia-600 border-fuchsia-600 text-white'
                    : isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-fuchsia-300'
                }`}
              >
                {pat.label.split(' (')[0]}
              </button>
            );
          })}
        </div>

        {/* Dark Bedside Monitor Display */}
        <div className="rounded-2xl bg-[#060911] border border-slate-800 p-4 space-y-3">
          {/* Monitor Header Readout */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-amber-400" />
                <span className="text-xs sm:text-sm font-bold text-white">{selectedPattern.label}</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {selectedPattern.rhythmLabel} · {selectedPattern.statusText}
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono tabular-nums">
              <div className="text-right">
                <div className="text-[10px] text-amber-400/80 uppercase">PAP / PAOP</div>
                <div className="text-sm sm:text-base font-bold text-amber-300">{selectedPattern.pressureVal}</div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border ${
                  selectedPattern.status === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : selectedPattern.status === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {selectedPattern.dominantFeature}
              </span>
            </div>
          </div>

          {/* Synchronized ECG + PAC SVG Trace */}
          <svg viewBox="0 0 540 190" className="w-full h-auto">
            {/* Monitor grid */}
            {[20, 42, 68, 96, 124, 152, 176].map((y) => (
              <line key={y} x1="8" y1={y} x2="532" y2={y} stroke="#1e293b" strokeWidth="0.8" />
            ))}
            {[60, 120, 180, 240, 300, 360, 420, 480].map((x) => (
              <line key={x} x1={x} y1="8" x2={x} y2="182" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="2 4" />
            ))}

            {/* Channel Labels */}
            <text x="12" y="18" fill="#34d399" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              EKG II (Senkron)
            </text>
            <text x="12" y="76" fill="#facc15" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              PA / PAOP (mmHg)
            </text>

            {/* Reference Pressure Dashed Line */}
            <line
              x1="10"
              y1={selectedPattern.refLineY}
              x2="530"
              y2={selectedPattern.refLineY}
              stroke="#e879f9"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.6"
            />
            <text
              x="526"
              y={selectedPattern.refLineY - 4}
              fill="#e879f9"
              fontSize="8.5"
              fontFamily="monospace"
              textAnchor="end"
            >
              {selectedPattern.refLabel}
            </text>

            {/* ECG Trace */}
            <path d={selectedPattern.ecgPath} fill="none" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" />

            {/* PAC Pressure Trace */}
            <path d={selectedPattern.pacPath} fill="none" stroke="#facc15" strokeWidth="2.6" strokeLinejoin="round" />

            {/* Annotations */}
            {selectedPattern.waveTags.map((tag, i) => (
              <text
                key={i}
                x={tag.x}
                y={tag.y}
                fill={tag.color}
                fontSize="9.5"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {tag.text}
              </text>
            ))}
          </svg>

          {/* Waveform Clinical Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-xs">
            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3">
              <div className="text-[10px] font-mono font-bold uppercase text-sky-400 mb-1">Dalga Morfolojisi</div>
              <p className="text-slate-300 leading-relaxed">{selectedPattern.morphology}</p>
            </div>
            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3">
              <div className="text-[10px] font-mono font-bold uppercase text-amber-400 mb-1">Başlıca Nedenler</div>
              <ul className="space-y-1 text-slate-300">
                {selectedPattern.causes.map((c, idx) => (
                  <li key={idx} className="flex gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3">
              <div className="text-[10px] font-mono font-bold uppercase text-emerald-400 mb-1">Yatak Başı Aksiyon</div>
              <p className="text-slate-200 leading-relaxed font-medium">{selectedPattern.action}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LİMİTASYONLAR VE ARTEFAKTLAR */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            5
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Limitasyonlar ve Artefaktlar
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              PAOP ≠ LVEDV Tuzakları, Termodilüsyon Sapmaları, Yüksek PEEP ve Kateter Kamçılanması ("Whip")
            </p>
          </div>
        </div>

        {/* Visual 5A: 3-Zone Pitfall SVG */}
        <svg viewBox="0 0 860 158" className="w-full h-auto rounded-xl">
          <rect x="0" y="0" width="860" height="158" rx="12" fill={isDark ? '#090d16' : '#f8fafc'} />

          {/* Zone 1: PAOP != LVEDP/LVEDV */}
          <rect x="14" y="14" width="268" height="130" rx="10" fill={isDark ? '#1c1222' : '#fdf4ff'} stroke="#d946ef" strokeWidth="1.2" />
          <text x="26" y="34" fill="#d946ef" fontSize="10.5" fontWeight="bold">1. PAOP ≠ LVEDP / LVEDV</text>
          <text x="26" y="54" fill={isDark ? '#f5d0fe' : '#701a75'} fontSize="9.2">• PAOP &gt; LVEDP: Mitral stenoz, LA miksoma,</text>
          <text x="34" y="67" fill={isDark ? '#e2e8f0' : '#475569'} fontSize="8.8">West Zone I–II (yüksek PEEP &gt; 10), PVOK</text>
          <text x="26" y="85" fill={isDark ? '#f5d0fe' : '#701a75'} fontSize="9.2">• PAOP &lt; LVEDP: Şiddetli AY (erken mitral</text>
          <text x="34" y="98" fill={isDark ? '#e2e8f0' : '#475569'} fontSize="8.8">kapanma), çok sert LV (LVEDP &gt; 25)</text>
          <text x="26" y="118" fill="#fbbf24" fontSize="8.8" fontWeight="bold">★ Statik PAOP sıvı yanıtını tek başına</text>
          <text x="34" y="131" fill="#fbbf24" fontSize="8.8" fontWeight="bold">öngörmez (LV kompliyansı değişken)!</text>

          {/* Zone 2: Thermodilution Errors */}
          <rect x="296" y="14" width="268" height="130" rx="10" fill={isDark ? '#1c1910' : '#fffbeb'} stroke="#f59e0b" strokeWidth="1.2" />
          <text x="308" y="34" fill="#f59e0b" fontSize="10.5" fontWeight="bold">2. TERMODİLÜSYON HATALARI</text>
          <text x="308" y="54" fill="#34d399" fontSize="9.2" fontWeight="bold">Yalancı YÜKSEK CO (AUC Küçülür):</text>
          <text x="316" y="68" fill={isDark ? '#e2e8f0' : '#475569'} fontSize="8.8">• Eksik hacim (&lt; 10 mL), ılık enjektat, pıhtı</text>
          <text x="308" y="88" fill="#f43f5e" fontSize="9.2" fontWeight="bold">Yalancı DÜŞÜK CO (AUC Büyür):</text>
          <text x="316" y="102" fill={isDark ? '#e2e8f0' : '#475569'} fontSize="8.8">• Fazla hacim, eşzamanlı hızlı soğuk infüzyon</text>
          <text x="308" y="122" fill="#fbbf24" fontSize="8.8" fontWeight="bold">• Şiddetli TY & İntrakardiyak Şant:</text>
          <text x="316" y="135" fill={isDark ? '#cbd5e1' : '#64748b'} fontSize="8.5">Resirkülasyon eğriyi bozar → güvenilmez!</text>

          {/* Zone 3: Mechanical & Respiratory Artifacts */}
          <rect x="578" y="14" width="268" height="130" rx="10" fill={isDark ? '#0f172a' : '#f0f9ff'} stroke="#0ea5e9" strokeWidth="1.2" />
          <text x="590" y="34" fill="#0ea5e9" fontSize="10.5" fontWeight="bold">3. MEKANİK & SOLUNUMSAL</text>
          <text x="590" y="54" fill={isDark ? '#bae6fd' : '#0369a1'} fontSize="9.2">• "Catheter Whip" (Kamçılanma):</text>
          <text x="598" y="67" fill={isDark ? '#e2e8f0' : '#475569'} fontSize="8.8">110 cm esnek kateter kalp atımıyla sallanır</text>
          <text x="598" y="79" fill={isDark ? '#e2e8f0' : '#475569'} fontSize="8.8">→ ±10 mmHg sivri artefakt (mean korur)</text>
          <text x="590" y="99" fill={isDark ? '#bae6fd' : '#0369a1'} fontSize="9.2">• Solunum Fazı & Auto-PEEP:</text>
          <text x="598" y="112" fill={isDark ? '#e2e8f0' : '#475569'} fontSize="8.8">Dijital ortalama yerine ekspiryum sonu oku!</text>
          <text x="590" y="131" fill="#38bdf8" fontSize="8.8" fontWeight="bold">• İntratorasik basınç ↑ → Transmural PAOP↓</text>
        </svg>

        {/* Troubleshooting Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                <th className="text-left p-2.5 font-bold rounded-tl-lg">Sorun / Artefakt</th>
                <th className="text-left p-2.5 font-bold">Temel Mekanizma</th>
                <th className="text-left p-2.5 font-bold">Klinik Tuzak</th>
                <th className="text-left p-2.5 font-bold rounded-tr-lg">Düzeltici Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  issue: 'Yüksek PEEP (> 10 cmH₂O)',
                  mech: 'Uç West Zone I/II’de kalır; PEEP plevraya iletilir',
                  pitfall: 'PAOP yalancı yüksek ölçülür (gereksiz diüretik!)',
                  fix: 'PEEP’i KESMEYİN (hipoksi/derecruitment!); uç konumunu grafide doğrulayın, trend + TEE kullanın.',
                },
                {
                  issue: 'Dev v Dalgası (Akut MY)',
                  mech: 'Sistolde sol atriyuma yüksek basınçlı geri kaçış',
                  pitfall: 'PA dalgası sanılıp kateter ileri itilebilir (PA rüptürü!)',
                  fix: 'EKG T-dalgası sonrası pikle ayırın; ortalama yerine a dalgası tabanını LVEDP olarak okuyun.',
                },
                {
                  issue: 'Catheter Whip (Aşırı Titreşim)',
                  mech: 'Kateter ucunun hiperdinamik kalp duvarıyla kamçılanması',
                  pitfall: 'Yalancı yüksek sPAP ve yalancı düşük dPAP',
                  fix: 'Sistol/diyastol yerine ortalama mPAP’a güvenin; gerekirse kateteri 1–2 cm yeniden konumlandırın.',
                },
                {
                  issue: 'Sönümlenmiş (Damped) PA',
                  mech: 'Distal uçta pıhtı, hava kabarcığı, kıvrılma veya duvar teması',
                  pitfall: 'Spontan wedge ile karışır; PAOP güvenilmez',
                  fix: 'Önce ASPİRE et (pıhtıyı içeri itme!), hava kabarcığını temizle, kare dalga testi yap.',
                },
                {
                  issue: 'Şiddetli Triküspit Yetmezliği',
                  mech: 'Soğuk bolus RA↔RV arası geri dönüp resirküle olur',
                  pitfall: 'Termodilüsyon CO güvenilmez (genellikle düşük)',
                  fix: 'Fick yöntemi, TEE (LVOT VTI) veya arteriyel nabız kontur analiziyle çapraz doğrulama yapın.',
                },
                {
                  issue: 'Yüksek SvO₂ (> %80) Şaşırtmacası',
                  mech: 'Kateter spontan wedge olduysa kapillerize kan okunur!',
                  pitfall: 'Doku oksijenasyonu iyi sanılırken şok atlanır',
                  fix: 'PA dalgasının wedge olmadığını teyit edin; ardından sepsis şantı veya siyanür/sol-sağ şantı araştırın.',
                },
              ].map((r) => (
                <tr key={r.issue} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                  <td className={`p-2.5 font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{r.issue}</td>
                  <td className={`p-2.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{r.mech}</td>
                  <td className="p-2.5 text-rose-500 font-medium">{r.pitfall}</td>
                  <td className={`p-2.5 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{r.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6: KOMPLİKASYONLAR VE GÜVENLİK */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            6
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Komplikasyonlar ve Güvenlik
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Pulmoner Arter Rüptürü Acil Yönetimi, LBBB’de Tam AV Blok Riski, Düğümlenme ve Pulmoner İnfarkt
            </p>
          </div>
        </div>

        {/* Visual 6A: 3-Panel Safety SVG */}
        <svg viewBox="0 0 860 175" className="w-full h-auto rounded-xl">
          <rect x="0" y="0" width="860" height="175" rx="12" fill={isDark ? '#090d16' : '#f8fafc'} />

          {/* Panel 1: PA Rupture */}
          <rect x="14" y="14" width="268" height="147" rx="10" fill={isDark ? '#2a1215' : '#fff1f2'} stroke="#f43f5e" strokeWidth="1.4" />
          <text x="26" y="34" fill="#f43f5e" fontSize="10.5" fontWeight="bold">1. PA RÜPTÜRÜ (%0.03–0.2 · MORT. %50–70!)</text>
          <text x="26" y="54" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9">• Risk: Yaş &gt; 60, Pulmoner HT, antikoagülasyon,</text>
          <text x="34" y="67" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9">hipotermi (CPB), overwedging, distal göç</text>
          <text x="26" y="86" fill="#fbbf24" fontSize="9.2" fontWeight="bold">Alarm: Balon şişirince / sonrasında HEMOPTİZİ!</text>
          <text x="26" y="104" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.8">• Kanayan taraf ALTA (lateral dekübit)</text>
          <text x="26" y="118" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.8">• Çift lümenli ETT / bronşiyal bloker + PEEP</text>
          <text x="26" y="132" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.8">• Antikoagülasyonu çevir; koil embolizasyon /</text>
          <text x="34" y="145" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.8">acil torakotomi ekibini çağır!</text>

          {/* Panel 2: Arrhythmia & LBBB -> CHB */}
          <rect x="296" y="14" width="268" height="147" rx="10" fill={isDark ? '#1f1a0d' : '#fffbeb'} stroke="#f59e0b" strokeWidth="1.4" />
          <text x="308" y="34" fill="#f59e0b" fontSize="10.5" fontWeight="bold">2. ARİTMİ & LBBB → TAM AV BLOK!</text>
          <text x="308" y="54" fill={isDark ? '#fde68a' : '#92400e'} fontSize="9">• Geçici PVC / NSVT: %15–70 (RV geçişinde)</text>
          <text x="308" y="69" fill={isDark ? '#fde68a' : '#92400e'} fontSize="9">• Yeni Sağ Dal Bloğu (RBBB): %3–5</text>
          <rect x="308" y="80" width="244" height="44" rx="6" fill="#f43f5e" fillOpacity="0.16" stroke="#f43f5e" strokeWidth="1" />
          <text x="316" y="96" fill="#fb7185" fontSize="9.2" fontWeight="bold">KRİTİK: Önceden LBBB Olan Hastada:</text>
          <text x="316" y="110" fill={isDark ? '#fecdd3' : '#881337'} fontSize="8.8">RBBB + LBBB = TAM KALP BLOĞU / ASİSTOLİ!</text>
          <text x="308" y="142" fill="#34d399" fontSize="9" fontWeight="bold">✓ Takmadan önce Pacing Pad / Pace-PAC hazırla!</text>

          {/* Panel 3: Infarction, Knotting & Mechanical */}
          <rect x="578" y="14" width="268" height="147" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke="#0ea5e9" strokeWidth="1.2" />
          <text x="590" y="34" fill="#38bdf8" fontSize="10.5" fontWeight="bold">3. İNFARKT · DÜĞÜM · BALON RÜPTÜRÜ</text>
          <text x="590" y="54" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9">• Pulmoner İnfarkt: Spontan wedge’i önle;</text>
          <text x="598" y="67" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">devamlı PA dalgası izle, &gt;15 sn şişik tutma!</text>
          <text x="590" y="86" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9">• Düğümlenme (Knotting): Çekerken direnç</text>
          <text x="598" y="99" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">varsa ASLA ZORLAMA → floroskopi + girişimsel!</text>
          <text x="590" y="118" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9">• Balon Rüptürü: Dirençsiz enjeksiyon / kan</text>
          <text x="598" y="131" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">gelirse portu kilitle, bir daha şişirme (emboli!)</text>
          <text x="590" y="149" fill="#e879f9" fontSize="8.8" fontWeight="bold">• KVC’de dikişle tutturulma: CPB sonrası test et!</text>
        </svg>

        {/* Emergency Protocol Box */}
        <div
          className={`rounded-xl border p-4 space-y-2 ${
            isDark ? 'bg-rose-950/30 border-rose-500/40' : 'bg-rose-50/80 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Acil Güvenlik Protokolü: PAC İlişkili Hemoptizi / Şüpheli PA Rüptürü & Kardiyak Cerrahi Uyarısı</span>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <div className="space-y-1">
              <div className="font-bold text-rose-500">1. Akut Hemoptizi (PA Rüptürü Şüphesi):</div>
              <p className="leading-relaxed">
                Hava yolunu güvenceye alın (çift lümenli tüp veya bronşiyal bloker ile sağlam akciğeri koruyun),
                <strong> kanayan akciğer alta gelecek şekilde</strong> pozisyon verin, PEEP uygulayın, heparini protaminle geri çevirin.
                Kateteri körlemesine tamamen çekmeyin (gerekirse birkaç cm geri çekip proksimal balon tamponadı / girişimsel koil embolizasyon veya acil cerrahi).
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-amber-500">2. Açık Kalp Cerrahisi (KVC) Özel Kontrolü:</div>
              <p className="leading-relaxed">
                Kardiyopulmoner baypasta soğuma ve kalp manipülasyonu kateteri distale iter → CPB öncesi kateteri <strong>3–5 cm geri çekin</strong>.
                Venöz kanülasyon / atriyotomi dikişi kateteri yakalamış olabilir; kapatmadan hemen önce 1–2 cm serbest hareketi mutlaka doğrulayın!
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Pearl + References */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-1">
          <div
            className={`lg:col-span-7 rounded-xl border p-3 flex items-start gap-2.5 text-xs ${
              isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <Info className="w-4 h-4 text-fuchsia-500 shrink-0 mt-0.5" />
            <div>
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>Klinik Altın Özet:</strong>{' '}
              PAC bir “tedavi” değil, yalnızca doğru yorumlandığında hayat kurtaran bir tanı aracıdır. Balon sadece{' '}
              <strong>ilerletirken</strong> ve <strong>&lt;15 sn wedge ölçerken</strong> şişirilir; ölçüm bitiminde keskin PA dalgasına dönüldüğü mutlaka görülür.
            </div>
          </div>
          <div
            className={`lg:col-span-5 rounded-xl border p-3 flex items-start gap-2 text-[11px] ${
              isDark ? 'bg-slate-950/70 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-500 dark:text-slate-300">Kaynaklar:</span> Miller’s Anesthesia (9th Ed., Ch. 38),
              ASA Practice Guidelines for PAC, ESC/ERS 2022 PH Guidelines, PAC-Man & ESCAPE Trials.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
