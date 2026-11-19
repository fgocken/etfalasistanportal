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

interface CvpMonitoringModuleProps {
  isDark: boolean;
}

type VentModeId = 'ppv' | 'spontaneous';
type CvpPatternId =
  | 'normal'
  | 'afib'
  | 'cannon-a'
  | 'tricuspid-regurg'
  | 'tamponade'
  | 'constrictive'
  | 'rv-failure';

interface CvpPattern {
  id: CvpPatternId;
  label: string;
  cvpVal: string;
  dominantFeature: string;
  rhythmLabel: string;
  status: 'normal' | 'warning' | 'critical';
  statusText: string;
  ecgPath: string;
  cvpPath: string;
  waveTags: { x: number; y: number; text: string; color: string }[];
  morphology: string;
  causes: string[];
  action: string;
}

const CVP_PATTERNS: CvpPattern[] = [
  {
    id: 'normal',
    label: 'Normal CVP Trasesi (a, c, x, v, y)',
    cvpVal: '6 mmHg',
    dominantFeature: 'a > v · Net x & y',
    rhythmLabel: 'Sinüs Ritmi · 72/dk',
    status: 'normal',
    statusText: '3 Pozitif Dalga (a, c, v) · 2 İniş (x, y)',
    ecgPath:
      'M 10 42 L 32 42 Q 40 31, 48 42 L 60 42 L 64 47 L 70 14 L 76 52 L 80 42 L 98 42 Q 112 24, 126 42 L 176 42 ' +
      'Q 184 31, 192 42 L 204 42 L 208 47 L 214 14 L 220 52 L 224 42 L 242 42 Q 256 24, 270 42 L 320 42 ' +
      'Q 328 31, 336 42 L 348 42 L 352 47 L 358 14 L 364 52 L 368 42 L 386 42 Q 400 24, 414 42 L 464 42 ' +
      'Q 472 31, 480 42 L 492 42 L 496 47 L 502 14 L 508 52 L 512 42 L 528 42',
    cvpPath:
      'M 10 132 L 36 132 Q 52 94, 66 122 Q 74 112, 82 126 Q 94 152, 108 134 Q 124 108, 138 128 Q 148 144, 162 132 L 180 132 ' +
      'Q 196 94, 210 122 Q 218 112, 226 126 Q 238 152, 252 134 Q 268 108, 282 128 Q 292 144, 306 132 L 324 132 ' +
      'Q 340 94, 354 122 Q 362 112, 370 126 Q 382 152, 396 134 Q 412 108, 426 128 Q 436 144, 450 132 L 468 132 ' +
      'Q 484 94, 498 122 Q 506 112, 514 126 L 528 144',
    waveTags: [
      { x: 52, y: 92, text: 'a', color: '#60a5fa' },
      { x: 75, y: 109, text: 'c', color: '#93c5fd' },
      { x: 96, y: 162, text: 'x', color: '#34d399' },
      { x: 126, y: 106, text: 'v', color: '#60a5fa' },
      { x: 150, y: 155, text: 'y', color: '#34d399' },
    ],
    morphology:
      'a dalgası (atriyal kontraksiyon, PR sonu) normalde v dalgasından (pasif doluş, T sonu) biraz daha yüksektir. c dalgası (triküspit bombeleşmesi) x inişini keser; y inişi erken diyastolik boşalmayı yansıtır.',
    causes: ['Normal sinüs ritmi, normal sağ ventrikül kompliyansı ve sağlam triküspit kapak'],
    action: 'Her zaman ekspiryum sonunda (a dalgası tabanı/ortalaması) okuyun ve trend olarak izleyin.',
  },
  {
    id: 'afib',
    label: 'Atriyal Fibrilasyon (a Dalgası Yok!)',
    cvpVal: '9 mmHg',
    dominantFeature: 'a Silinmiş · Belirgin c/v',
    rhythmLabel: 'Düzensiz AF · 108/dk',
    status: 'warning',
    statusText: 'Organize Atriyal Kasılma Yok → a Dalgası Kaybolur',
    ecgPath:
      'M 10 42 Q 16 39, 22 44 Q 28 38, 34 43 L 48 42 L 51 47 L 57 14 L 63 52 L 67 42 Q 78 39, 88 43 Q 98 28, 110 42 ' +
      'Q 120 39, 130 43 L 146 42 L 149 47 L 155 14 L 161 52 L 165 42 Q 178 39, 190 43 Q 202 28, 214 42 ' +
      'Q 230 39, 246 44 Q 260 39, 274 43 L 288 42 L 291 47 L 297 14 L 303 52 L 307 42 Q 320 39, 332 43 Q 344 28, 356 42 ' +
      'Q 368 39, 380 43 L 392 42 L 395 47 L 401 14 L 407 52 L 411 42 Q 424 39, 438 43 Q 450 28, 462 42 Q 486 40, 528 42',
    cvpPath:
      'M 10 134 L 54 134 Q 63 114, 72 130 Q 84 148, 96 130 Q 110 100, 124 128 Q 134 144, 152 134 ' +
      'Q 161 114, 170 130 Q 182 148, 194 130 Q 208 100, 222 128 Q 238 144, 294 134 ' +
      'Q 303 114, 312 130 Q 324 148, 336 130 Q 350 100, 364 128 Q 374 144, 398 134 ' +
      'Q 407 114, 416 130 Q 428 148, 440 130 Q 454 100, 468 128 Q 486 144, 528 134',
    waveTags: [
      { x: 40, y: 124, text: 'a YOK', color: '#fbbf24' },
      { x: 64, y: 109, text: 'c', color: '#93c5fd' },
      { x: 112, y: 97, text: 'v', color: '#60a5fa' },
      { x: 210, y: 97, text: 'v', color: '#60a5fa' },
    ],
    morphology:
      'EKG’de P dalgası olmadığı gibi CVP trasesinde de a dalgası tamamen kaybolur. Düzensiz aralıklarla yalnızca c ve daha belirgin hâle gelen v dalgaları görülür.',
    causes: ['Atriyal fibrilasyon (AF), atriyal flutter (testere dişi f dalgaları CVP’ye yansıyabilir)'],
    action: 'EKG ile eşzamanlı bakarak a dalgası kaybını doğrulayın; hız kontrolü veya yeni başlangıçlı unstabil AF’de kardiyoversiyon düşünün.',
  },
  {
    id: 'cannon-a',
    label: 'Kanon (Cannon) a Dalgası (AV Dissosiyasyon)',
    cvpVal: '14 (Pik 24)',
    dominantFeature: 'Dev Fırlayan a Dalgası!',
    rhythmLabel: 'Nodal Ritim / Tam AV Blok',
    status: 'critical',
    statusText: 'Kapalı Triküspit Kapağa Karşı Atriyal Kasılma',
    ecgPath:
      'M 10 42 L 50 42 L 54 47 L 60 14 L 66 52 L 70 42 Q 78 33, 86 42 L 106 42 Q 118 26, 130 42 L 190 42 ' +
      'L 194 47 L 200 14 L 206 52 L 210 42 Q 218 33, 226 42 L 246 42 Q 258 26, 270 42 L 330 42 ' +
      'L 334 47 L 340 14 L 346 52 L 350 42 Q 358 33, 366 42 L 386 42 Q 398 26, 410 42 L 470 42 ' +
      'L 474 47 L 480 14 L 486 52 L 490 42 L 528 42',
    cvpPath:
      'M 10 132 L 52 132 L 66 132 L 80 68 L 96 136 Q 114 146, 128 118 Q 144 142, 166 132 L 192 132 ' +
      'L 206 132 L 220 68 L 236 136 Q 254 146, 268 118 Q 284 142, 306 132 L 332 132 ' +
      'L 346 132 L 360 68 L 376 136 Q 394 146, 408 118 Q 424 142, 446 132 L 472 132 L 486 132 L 500 68 L 516 136 L 528 134',
    waveTags: [
      { x: 80, y: 63, text: 'KANON a!', color: '#fb7185' },
      { x: 220, y: 63, text: 'KANON a!', color: '#fb7185' },
      { x: 360, y: 63, text: 'KANON a!', color: '#fb7185' },
    ],
    morphology:
      'Atriyal kontraksiyon ventrikül sistolüyle (kapalı triküspit kapakla) çakıştığında kan ileri gidemez ve vena kavaya geri fırlar → dar, çok yüksek "Kanon a" dalgaları! (Triküspit darlığında ise düzenli dev a dalgaları görülür.)',
    causes: [
      'Junctional (nodal) ritim — düzenli kanon a dalgaları (anestezide çok sık!)',
      'Tam (3. derece) AV blok, ventriküler taşikardi (VT) veya VVI pacing — düzensiz kanon a',
    ],
    action:
      'Atriyal kick kaybıyla hipotansiyon gelişebilir: Nodal ritimde derin inhalasyon ajanını azaltın, atropin/efedrin veya A-V ardışık pacing değerlendirin.',
  },
  {
    id: 'tricuspid-regurg',
    label: 'Ciddi Triküspit Yetmezliği (Dev c-v Dalgası)',
    cvpVal: '16 mmHg',
    dominantFeature: 'x Silinmiş · Dev c-v',
    rhythmLabel: 'Sinüs / AF · Ventrikülarizasyon',
    status: 'critical',
    statusText: 'Sistolik Regürjitasyon → CVP Arteriyel Dalgaya Benzer!',
    ecgPath:
      'M 10 42 L 32 42 Q 40 31, 48 42 L 60 42 L 64 47 L 70 14 L 76 52 L 80 42 L 98 42 Q 112 24, 126 42 L 176 42 ' +
      'Q 184 31, 192 42 L 204 42 L 208 47 L 214 14 L 220 52 L 224 42 L 242 42 Q 256 24, 270 42 L 320 42 ' +
      'Q 328 31, 336 42 L 348 42 L 352 47 L 358 14 L 364 52 L 368 42 L 386 42 Q 400 24, 414 42 L 464 42 ' +
      'Q 472 31, 480 42 L 492 42 L 496 47 L 502 14 L 508 52 L 512 42 L 528 42',
    cvpPath:
      'M 10 138 L 42 138 Q 52 122, 62 134 L 76 74 Q 98 62, 122 80 L 146 146 L 186 138 ' +
      'Q 196 122, 206 134 L 220 74 Q 242 62, 266 80 L 290 146 L 330 138 ' +
      'Q 340 122, 350 134 L 364 74 Q 386 62, 410 80 L 434 146 L 474 138 ' +
      'Q 484 122, 494 134 L 508 74 L 528 76',
    waveTags: [
      { x: 100, y: 63, text: 'DEV c-v (x YOK)', color: '#fb7185' },
      { x: 150, y: 158, text: 'Derin y', color: '#34d399' },
      { x: 244, y: 63, text: 'DEV c-v', color: '#fb7185' },
      { x: 388, y: 63, text: 'DEV c-v', color: '#fb7185' },
    ],
    morphology:
      'RV sistolü sırasında kan hızla sağ atriyuma geri kaçar: x inişi tamamen kaybolur, c ve v dalgaları birleşerek geniş, yüksek "ventrikülarize" bir c-v dalgası oluşturur; ardından keskin y inişi gelir.',
    causes: [
      'Ağır pulmoner hipertansiyon / RV dilatasyonuna sekonder fonksiyonel TY',
      'Endokardit, pacemaker teli veya kardiyak cerrahi sonrası organik TY',
    ],
    action:
      'Klasik tuzak: Bu dalga arteriyel kanülasyon (yanlışlıkla karotis/arter!) ile karıştırılabilir — kan gazı ve senkronizasyonla ayırın; RV afterload’unu (hipoksi, hiperkapni, yüksek PEEP) azaltın.',
  },
  {
    id: 'tamponade',
    label: 'Kardiyak Tamponad (x Var, y İnişi Silinmiş!)',
    cvpVal: '20 mmHg',
    dominantFeature: 'CVP ↑↑ · y İnişi YOK',
    rhythmLabel: 'Sinüs Taşikardisi · 118/dk',
    status: 'critical',
    statusText: 'Eşitlenmiş Yüksek Diyastolik Basınç · Erken Doluş Engelli',
    ecgPath:
      'M 10 42 L 22 42 Q 28 34, 34 42 L 42 42 L 45 46 L 50 16 L 55 50 L 58 42 L 70 42 Q 80 28, 90 42 L 116 42 ' +
      'Q 122 34, 128 42 L 136 42 L 139 46 L 144 16 L 149 50 L 152 42 L 164 42 Q 174 28, 184 42 L 210 42 ' +
      'Q 216 34, 222 42 L 230 42 L 233 46 L 238 16 L 243 50 L 246 42 L 258 42 Q 268 28, 278 42 L 304 42 ' +
      'Q 310 34, 316 42 L 324 42 L 327 46 L 332 16 L 337 50 L 340 42 L 352 42 Q 362 28, 372 42 L 398 42 ' +
      'Q 404 34, 410 42 L 418 42 L 421 46 L 426 16 L 431 50 L 434 42 L 446 42 Q 456 28, 466 42 L 528 42',
    cvpPath:
      'M 10 92 L 26 92 Q 36 74, 46 88 L 62 124 L 84 88 L 122 92 ' +
      'Q 132 74, 142 88 L 158 124 L 180 88 L 216 92 ' +
      'Q 226 74, 236 88 L 252 124 L 274 88 L 310 92 ' +
      'Q 320 74, 330 88 L 346 124 L 368 88 L 404 92 ' +
      'Q 414 74, 424 88 L 440 124 L 462 88 L 528 92',
    waveTags: [
      { x: 62, y: 136, text: 'Keskin x', color: '#34d399' },
      { x: 102, y: 82, text: 'y SİLİNMİŞ!', color: '#fb7185' },
      { x: 252, y: 136, text: 'x', color: '#34d399' },
      { x: 292, y: 82, text: 'y YOK', color: '#fb7185' },
    ],
    morphology:
      'Basınçlı perikard sıvısı ventriküllerin diyastolde genişlemesini engeller: Bazal CVP çok yüksektir (18–24 mmHg), sistolik x inişi belirgin kalırken diyastolik y inişi tamamen silinir veya düzleşir!',
    causes: [
      'Post-kardiyak cerrahi kanama/pıhtı, travma, malign/üremik perikardiyal efüzyon',
      'İatrojenik SVK / pacemaker ucu miyokard perforasyonu!',
    ],
    action:
      'ACİL perikardiyosentez / cerrahi drenaj! Preload’ı yüksek tut (sıvı), kalp hızını ve SVR’yi koru; indüksiyonda ani pozitif basınçlı ventilasyon ve vazodilatasyondan kaçın (spontan solunum/ketamin!).',
  },
  {
    id: 'constrictive',
    label: 'Konstriktif Perikardit ("W/M" · Derin x & y)',
    cvpVal: '18 mmHg',
    dominantFeature: 'Keskin x & y · "W" Şekli',
    rhythmLabel: 'Sinüs · Kussmaul (+)',
    status: 'warning',
    statusText: 'Sert Kabuk → Hızlı Erken Doluş + Ani Durma (Dip-Plateau)',
    ecgPath:
      'M 10 42 L 32 42 Q 40 31, 48 42 L 60 42 L 64 47 L 70 14 L 76 52 L 80 42 L 98 42 Q 112 24, 126 42 L 176 42 ' +
      'Q 184 31, 192 42 L 204 42 L 208 47 L 214 14 L 220 52 L 224 42 L 242 42 Q 256 24, 270 42 L 320 42 ' +
      'Q 328 31, 336 42 L 348 42 L 352 47 L 358 14 L 364 52 L 368 42 L 386 42 Q 400 24, 414 42 L 464 42 ' +
      'Q 472 31, 480 42 L 492 42 L 496 47 L 502 14 L 508 52 L 512 42 L 528 42',
    cvpPath:
      'M 10 92 L 36 92 L 52 74 L 68 92 L 92 138 L 118 76 L 142 142 L 160 92 L 180 92 ' +
      'L 196 74 L 212 92 L 236 138 L 262 76 L 286 142 L 304 92 L 324 92 ' +
      'L 340 74 L 356 92 L 380 138 L 406 76 L 430 142 L 448 92 L 468 92 L 484 74 L 500 92 L 524 138',
    waveTags: [
      { x: 92, y: 152, text: 'Derin x', color: '#60a5fa' },
      { x: 142, y: 156, text: 'Derin y (W)', color: '#fbbf24' },
      { x: 236, y: 152, text: 'x', color: '#60a5fa' },
      { x: 286, y: 156, text: 'y', color: '#fbbf24' },
    ],
    morphology:
      'Tamponadın aksine hem x hem de y inişi çok derin ve keskindir → karakteristik "M" veya "W" görünümü (Friedreich bulgusu). İnspiryumda CVP düşmez, aksine yükselir (Kussmaul bulgusu).',
    causes: ['Kronik konstriktif perikardit, restriktif kardiyomiyopati, sağ ventrikül infarktüsü'],
    action:
      'Sabit atım hacmi nedeniyle kalp debisi kalp hızına bağımlıdır; bradikardiden kaçının ve yüksek dolum basıncını dikkatle koruyun.',
  },
  {
    id: 'rv-failure',
    label: 'Akut RV Yetmezliği / PE / Tansiyon Pnömotoraks',
    cvpVal: '22 mmHg',
    dominantFeature: 'Ani CVP ↑↑ + Hipotansiyon',
    rhythmLabel: 'Sinüs Taşikardisi · Şok',
    status: 'critical',
    statusText: 'Obstrüktif / Sağ Kalp Yetmezliği → Venöz Dönüş Tıkanması',
    ecgPath:
      'M 10 42 L 22 42 Q 28 34, 34 42 L 42 42 L 45 46 L 50 16 L 55 50 L 58 42 L 70 42 Q 80 28, 90 42 L 116 42 ' +
      'Q 122 34, 128 42 L 136 42 L 139 46 L 144 16 L 149 50 L 152 42 L 164 42 Q 174 28, 184 42 L 210 42 ' +
      'Q 216 34, 222 42 L 230 42 L 233 46 L 238 16 L 243 50 L 246 42 L 258 42 Q 268 28, 278 42 L 304 42 ' +
      'Q 310 34, 316 42 L 324 42 L 327 46 L 332 16 L 337 50 L 340 42 L 352 42 Q 362 28, 372 42 L 398 42 ' +
      'Q 404 34, 410 42 L 418 42 L 421 46 L 426 16 L 431 50 L 434 42 L 446 42 Q 456 28, 466 42 L 528 42',
    cvpPath:
      'M 10 88 Q 24 64, 38 82 Q 48 74, 56 88 Q 68 104, 80 82 Q 92 70, 104 88 L 116 88 ' +
      'Q 130 64, 144 82 Q 154 74, 162 88 Q 174 104, 186 82 Q 198 70, 210 88 L 222 88 ' +
      'Q 236 64, 250 82 Q 260 74, 268 88 Q 280 104, 292 82 Q 304 70, 316 88 L 328 88 ' +
      'Q 342 64, 356 82 Q 366 74, 374 88 Q 386 104, 398 82 Q 410 70, 422 88 L 528 88',
    waveTags: [
      { x: 165, y: 58, text: 'ANİ CVP TIRMANIŞI (22 mmHg) + MAP ↓', color: '#fb7185' },
    ],
    morphology:
      'İntraoperatif stabil seyrederken CVP’nin dakikalar içinde 15–22 mmHg üzerine sıçraması ve eşzamanlı arteriyel MAP/EtCO₂ çöküşü akut sağ ventrikül afterload artışının veya obstrüktif şokun alarm işaretidir.',
    causes: [
      'Masif pulmoner emboli / venöz hava embolisi (VAE) / kemik çimentosu implantasyon sendromu',
      'Tansiyon pnömotoraks (tek taraflı solunum sesi kaybı + Ppeak ↑↑) veya akut RV infarktüsü',
    ],
    action:
      'SIVI YÜKLEMEYİ DERHAL DURDUR! Tansiyon pnömotoraksı (akciğer USG/dinleme) ve hava embolisini dışla, %100 O₂ ver, PEEP’i azalt, RV perfüzyonu için noradrenalin + inodilatatör/iNO değerlendir.',
  },
];

interface CvcSiteRow {
  site: string;
  tipDepth: string;
  pros: string;
  risks: string;
}

const CVC_SITE_TABLE: CvcSiteRow[] = [
  {
    site: 'Sağ İnternal Jugüler (RIJ) ★',
    tipDepth: '~13–15 cm',
    pros: 'SVC–RA kavşağına en düz yol, USG ile kolay görüntüleme, basılabilir, düşük pnömotoraks.',
    risks: 'Karotis arter ponksiyonu, boyun cerrahisinde alan çakışması.',
  },
  {
    site: 'Sol İnternal Jugüler (LIJ)',
    tipDepth: '~16–18 cm',
    pros: 'RIJ tromboze/kontrendike ise alternatif.',
    risks: 'İki keskin açı (SVC duvar perforasyon riski!), duktus torasikus hasarı (şilotoraks!).',
  },
  {
    site: 'Subklavyen Ven (SCV)',
    tipDepth: '~14–16 cm',
    pros: 'En düşük enfeksiyon (CLABSI) ve tromboz oranı; uzun süreli YBÜ ve travmada konforlu.',
    risks: 'EN YÜKSEK pnömotoraks/hemotoraks riski; arter kanarsa KOMPRESYON YAPILAMAZ (koagülopatide kaçın!).',
  },
  {
    site: 'Femoral Ven',
    tipDepth: '20+ cm (IVC)',
    pros: 'Pnömotoraks riski sıfır; KPR ve ağır koagülopatide hızlı, basılabilir.',
    risks: 'En yüksek enfeksiyon/DVT riski; karın içi basınç artışı (IAH/laparoskopi) CVP’yi yalancı yükseltir.',
  },
];

export const CvpMonitoringModule: React.FC<CvpMonitoringModuleProps> = ({ isDark }) => {
  const [ventMode, setVentMode] = useState<VentModeId>('ppv');
  const [peepCmH2O, setPeepCmH2O] = useState<number>(5);
  const [transducerOffsetCm, setTransducerOffsetCm] = useState<number>(0); // + below heart -> FALSE HIGH
  const [activePatternId, setActivePatternId] = useState<CvpPatternId>('normal');

  const activePattern = CVP_PATTERNS.find((p) => p.id === activePatternId) ?? CVP_PATTERNS[0];

  // Physics calculations for Section 1 simulator
  // True transmural RAP = 6 mmHg
  const trueRap = 6;
  // Roughly ~45% of PEEP (converted cmH2O -> mmHg via /1.36) transmits to right atrium in normal lungs
  const peepTransmittedMmHg = ventMode === 'ppv' ? Number(((peepCmH2O / 1.36) * 0.45).toFixed(1)) : 0;
  // Hydrostatic shift: Transducer BELOW heart (+cm) adds +0.736 mmHg/cm
  const hydrostaticMmHg = Number((transducerOffsetCm * 0.736).toFixed(1));
  const endExpCvp = Number(Math.max(-2, trueRap + peepTransmittedMmHg + hydrostaticMmHg).toFixed(1));
  const totalError = Number((endExpCvp - trueRap).toFixed(1));
  const errorPct = Math.round((Math.abs(totalError) / trueRap) * 100);

  // Build simulated respiratory CVP trace (2 full respiratory cycles)
  const respWavePath =
    ventMode === 'ppv'
      ? // PPV: Inspiration pushes CVP UP, End-Expiration is the TROUGH (lowest point)
        'M 12 118 L 48 118 C 72 118, 86 68, 122 68 C 154 68, 168 118, 200 118 L 266 118 ' +
        'C 290 118, 304 68, 340 68 C 372 68, 386 118, 418 118 L 502 118'
      : // Spontaneous: Inspiration pulls CVP DOWN (negative intrathoracic pressure), End-Expiration is the PEAK (highest baseline)
        'M 12 84 L 48 84 C 72 84, 86 136, 122 136 C 154 136, 168 84, 200 84 L 266 84 ' +
        'C 290 84, 304 136, 340 136 C 372 136, 386 84, 418 84 L 502 84';

  const endExpY = ventMode === 'ppv' ? 118 : 84;

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
              <span className="font-semibold text-blue-600 dark:text-blue-400">İnvaziv Venöz Hemodinami</span>
              <span aria-hidden="true">·</span>
              <span>Sağ Atriyum Basıncı &amp; Venöz Dönüş</span>
              <span aria-hidden="true">·</span>
              <span>6 Bölümlü Sistematik İnceleme</span>
            </div>
            <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${headingColor}`}>
              CVP (Santral Venöz Basınç Monitörizasyonu)
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
              SVC–sağ atriyum kavşağından ölçülen santral venöz basınç, venöz dönüş ile sağ kalp fonksiyonu arasındaki etkileşimi
              yansıtır. Modern perioperatif pratikte CVP <strong>sıvı yanıtlılığı göstergesi değildir</strong>; bunun yerine{' '}
              <strong>sağ kalp/tamponad tanısı</strong>, <strong>sıvı yükleme üst güvenlik sınırı</strong> ve{' '}
              <strong>venöz konjesyon (MAP − CVP)</strong> monitörüdür.
            </p>
          </div>

          {/* 4-Metric Quick Reference Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 shrink-0">
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Normal CVP</div>
              <div className="text-sm font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400">
                2 – 8 mmHg
              </div>
              <div className={`text-[10px] ${subtleColor}`}>1 mmHg = 1.36 cmH₂O</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Ölçüm Anı</div>
              <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                Ekspiryum Sonu
              </div>
              <div className={`text-[10px] ${subtleColor}`}>PPV: Dip · Spont: Tepe</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Kateter Ucu</div>
              <div className="text-sm font-bold font-mono text-sky-600 dark:text-sky-400">
                SVC – RA
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Karina / Distal lümen</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Sıvı Yanıtı</div>
              <div className="text-sm font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400">
                AUC ≈ 0.56
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Statik CVP öngörmez!</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BÖLÜM 1: FİZİKSEL PRENSİP VE ÇALIŞMA MEKANİZMASI                      */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            1
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              CVP, tıpkı IBP gibi sıvı dolu bir hat ve <strong>Wheatstone köprüsü basınç transdüseriyle</strong> ölçülür; ancak
              düşük basınçlı (2–8 mmHg) bir sistem olduğu için <strong>hidrostatik seviye hatalarına ve intratorasik basınç (PEEP/solunum)
              değişimlerine çok daha hassastır</strong>. Fizyolojik olarak Guyton’un venöz dönüş modelindeki karşı basınçtır.
            </p>
          </div>
        </div>

        {/* Visual 1A: Guyton Venous Return + Synchronized ECG-CVP Phase Diagram SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-500" />
              <span className={`text-xs font-bold ${headingColor}`}>
                Biyofizik Şema: Guyton Venöz Dönüş Yasası &amp; EKG–CVP (a, c, x, v, y) Senkronizasyonu
              </span>
            </div>
            <span className={`text-[11px] font-mono ${subtleColor}`}>
              VR = (Pmsf − CVP) / Rvr · 1 mmHg = 1.36 cmH₂O
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 235"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Guyton venöz dönüş denklemi ve EKG ile senkronize CVP a c x v y dalgaları"
            >
              {/* Left: Guyton Venous Return Physics */}
              <rect x="8" y="8" width="320" height="218" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <text x="24" y="29" fontSize="11" fontWeight="700" fill="#3b82f6">
                Guyton Venöz Dönüş &amp; Sağ Kalp Dengesi
              </text>

              {/* Formula card */}
              <rect x="24" y="42" width="288" height="44" rx="8" fill="#1d4ed8" fillOpacity="0.14" stroke="#3b82f6" strokeWidth="1.2" />
              <text x="168" y="61" textAnchor="middle" fontSize="12" fontFamily="monospace" fontWeight="700" fill={isDark ? '#93c5fd' : '#1d4ed8'}>
                VR = (Pmsf − CVP) / Rvr
              </text>
              <text x="168" y="77" textAnchor="middle" fontSize="8.5" fill={isDark ? '#cbd5e1' : '#334155'}>
                Venöz dönüş gradyanı (Pmsf ≈ 8–12 mmHg)
              </text>

              {/* 3 determinants */}
              <g transform="translate(24, 98)">
                <text x="0" y="14" fontSize="9.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                  CVP’yi Belirleyen 4 Ana Faktör:
                </text>
                <text x="0" y="34" fontSize="9.2" fill={isDark ? '#cbd5e1' : '#334155'}>
                  1. İntravasküler hacim &amp; venöz tonus (Pmsf)
                </text>
                <text x="0" y="51" fontSize="9.2" fill={isDark ? '#cbd5e1' : '#334155'}>
                  2. Sağ ventrikül pompa gücü &amp; kompliyansı
                </text>
                <text x="0" y="68" fontSize="9.2" fill={isDark ? '#cbd5e1' : '#334155'}>
                  3. İntratorasik / perikardiyal basınç (PEEP!)
                </text>
                <text x="0" y="85" fontSize="9.2" fill={isDark ? '#cbd5e1' : '#334155'}>
                  4. Triküspit kapak &amp; ritim (AV senkronizasyon)
                </text>
                <text x="0" y="110" fontSize="8.8" fontFamily="monospace" fontWeight="700" fill="#ef4444">
                  Organ Perfüzyonu = MAP − CVP!
                </text>
              </g>

              {/* Right: Synchronized ECG + CVP Mechanical Events */}
              <rect x="344" y="8" width="528" height="218" rx="12" fill="#0b1120" stroke={isDark ? '#334155' : '#cbd5e1'} />
              <text x="362" y="29" fontSize="11" fontWeight="700" fill="#e2e8f0">
                EKG (Elektrik) ↔ CVP (Mekanik a, c, x, v, y) Faz Eşleştirmesi
              </text>

              {/* Vertical time alignment guides */}
              <line x1="438" y1="38" x2="438" y2="210" stroke="#334155" strokeDasharray="3 3" />
              <line x1="490" y1="38" x2="490" y2="210" stroke="#334155" strokeDasharray="3 3" />
              <line x1="556" y1="38" x2="556" y2="210" stroke="#334155" strokeDasharray="3 3" />
              <line x1="636" y1="38" x2="636" y2="210" stroke="#334155" strokeDasharray="3 3" />
              <line x1="712" y1="38" x2="712" y2="210" stroke="#334155" strokeDasharray="3 3" />

              {/* ECG trace (Green) */}
              <text x="362" y="64" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#34d399">EKG</text>
              <path
                d="M 390 74 L 414 74 Q 426 56, 438 74 L 468 74 L 474 82 L 484 40 L 494 88 L 502 74 L 580 74 Q 608 46, 636 74 L 848 74"
                fill="none"
                stroke="#34d399"
                strokeWidth="2.2"
              />
              <text x="426" y="54" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#6ee7b7">P</text>
              <text x="484" y="38" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#6ee7b7">QRS</text>
              <text x="608" y="47" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#6ee7b7">T</text>

              {/* CVP trace (Blue) */}
              <text x="362" y="142" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#60a5fa">CVP</text>
              <path
                d="M 390 156 L 418 156 Q 438 104, 464 148 Q 486 126, 504 148 Q 534 190, 566 164 Q 612 114, 650 148 Q 684 184, 728 156 L 848 156"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Labeled peaks & descents */}
              <circle cx="441" cy="121" r="4" fill="#60a5fa" />
              <text x="441" y="112" textAnchor="middle" fontSize="10" fontWeight="700" fill="#93c5fd">a</text>

              <circle cx="489" cy="134" r="4" fill="#38bdf8" />
              <text x="489" y="125" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7dd3fc">c</text>

              <circle cx="546" cy="175" r="4" fill="#34d399" />
              <text x="546" y="191" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6ee7b7">x inişi</text>

              <circle cx="626" cy="129" r="4" fill="#60a5fa" />
              <text x="626" y="119" textAnchor="middle" fontSize="10" fontWeight="700" fill="#93c5fd">v</text>

              <circle cx="696" cy="170" r="4" fill="#34d399" />
              <text x="696" y="186" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6ee7b7">y inişi</text>

              {/* Right Legend inside SVG */}
              <g transform="translate(734, 96)">
                <text x="0" y="10" fontSize="8.5" fill="#93c5fd">a: Atriyal sistol</text>
                <text x="0" y="25" fontSize="8.5" fill="#7dd3fc">c: Triküspit bombe</text>
                <text x="0" y="40" fontSize="8.5" fill="#6ee7b7">x: Atriyal gevşeme</text>
                <text x="0" y="55" fontSize="8.5" fill="#93c5fd">v: Pasif RA doluş</text>
                <text x="0" y="70" fontSize="8.5" fill="#6ee7b7">y: Hızlı RV doluş</text>
              </g>

              <text x="608" y="216" textAnchor="middle" fontSize="8.8" fontFamily="monospace" fill="#94a3b8">
                Mekanik olaylar elektriksel aktiviteyi (EKG) ~40–60 ms gecikmeyle izler
              </text>
            </svg>
          </div>
        </div>

        {/* Visual 1B: Interactive Respiratory Phase (PPV vs Spontaneous), PEEP & Transducer Level Simulator */}
        <div className={`rounded-xl border p-4 space-y-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span className={`text-xs sm:text-sm font-bold ${headingColor}`}>
                İnteraktif Simülatör: Solunum Fazı (Ekspiryum Sonu Kuralı), PEEP ve Seviye Hatası Büyüklüğü
              </span>
            </div>
            <span className={`text-[11px] font-mono tabular-nums ${subtleColor}`}>
              Gerçek Transmural Sağ Atriyum Basıncı: 6.0 mmHg
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <div className={`text-[11px] font-semibold mb-1.5 ${subtleColor}`}>
                  1. Solunum Modu (Ekspiryum Sonu Nerede Okunur?)
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setVentMode('ppv')}
                    className={`px-3 py-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                      ventMode === 'ppv'
                        ? 'bg-blue-600 text-white border-blue-500'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500/50'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-bold">Pozitif Basınç (PPV)</div>
                    <div className={`text-[10px] font-mono ${ventMode === 'ppv' ? 'text-blue-100' : subtleColor}`}>
                      Eksp. sonu = EN DÜŞÜK
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVentMode('spontaneous')}
                    className={`px-3 py-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                      ventMode === 'spontaneous'
                        ? 'bg-blue-600 text-white border-blue-500'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-blue-500/50'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-bold">Spontan Solunum</div>
                    <div className={`text-[10px] font-mono ${ventMode === 'spontaneous' ? 'text-blue-100' : subtleColor}`}>
                      Eksp. sonu = EN YÜKSEK
                    </div>
                  </button>
                </div>
              </div>

              {/* PEEP slider (active in PPV) */}
              <div className={`p-3 rounded-xl border ${cardSurface}`}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className={`font-semibold ${headingColor}`}>2. Uygulanan PEEP (PPV Modunda)</span>
                  <span className="font-mono tabular-nums font-bold text-blue-600 dark:text-blue-400">
                    {ventMode === 'ppv' ? `${peepCmH2O} cmH₂O (+${peepTransmittedMmHg} mmHg)` : 'Spontan (0)'}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={5}
                  disabled={ventMode !== 'ppv'}
                  value={ventMode === 'ppv' ? peepCmH2O : 0}
                  onChange={(e) => setPeepCmH2O(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer disabled:opacity-40"
                  aria-label="Uygulanan PEEP değeri"
                />
                <div className={`flex justify-between text-[10px] font-mono mt-1 ${subtleColor}`}>
                  <span>0 cmH₂O</span>
                  <span>5 cmH₂O</span>
                  <span>10 cmH₂O</span>
                  <span>15 cmH₂O</span>
                </div>
              </div>

              {/* Transducer Height Slider */}
              <div className={`p-3 rounded-xl border ${cardSurface}`}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className={`font-semibold ${headingColor}`}>3. Transdüser Seviye Kayması</span>
                  <span className="font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400">
                    {transducerOffsetCm === 0
                      ? '0 cm (Flebostatik)'
                      : transducerOffsetCm > 0
                        ? `${transducerOffsetCm} cm ALTTA (+${hydrostaticMmHg})`
                        : `${Math.abs(transducerOffsetCm)} cm ÜSTTE (${hydrostaticMmHg})`}
                  </span>
                </div>
                <input
                  type="range"
                  min={-15}
                  max={15}
                  step={5}
                  value={transducerOffsetCm}
                  onChange={(e) => setTransducerOffsetCm(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                  aria-label="CVP transdüser seviye kayması"
                />
                <div className={`flex justify-between text-[10px] font-mono mt-1 ${subtleColor}`}>
                  <span>-15 cm (Üstte)</span>
                  <span>0 cm (İdeal)</span>
                  <span>+15 cm (Altta)</span>
                </div>
              </div>
            </div>

            {/* Right Dark Respiratory & CVP Monitor */}
            <div className="lg:col-span-7 rounded-xl border bg-slate-950 border-slate-800 p-4 flex flex-col justify-between space-y-3 text-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div className="text-[11px] font-mono text-slate-400">
                  SOLUNUMSAL CVP SALINIMI &amp; EKSPİRYUM SONU OKUMASI
                </div>
                <div className="flex items-center gap-4 font-mono tabular-nums">
                  <div>
                    <span className="text-[10px] text-slate-400 mr-1">OKUNAN CVP:</span>
                    <span className="text-xl font-bold text-blue-400">{endExpCvp.toFixed(1)} mmHg</span>
                  </div>
                  <div
                    className={`text-xs font-bold ${
                      errorPct <= 25 ? 'text-emerald-400' : errorPct <= 60 ? 'text-amber-400' : 'text-rose-400'
                    }`}
                  >
                    {totalError === 0 ? 'DOĞRU' : `Sapma: ${totalError > 0 ? `+${totalError}` : totalError} (%${errorPct}!)`}
                  </div>
                </div>
              </div>

              <svg viewBox="0 0 515 162" className="w-full h-auto">
                {[36, 70, 104, 138].map((gy) => (
                  <line key={gy} x1="8" y1={gy} x2="508" y2={gy} stroke="#1e293b" strokeWidth="1" />
                ))}
                {/* End-expiration dashed horizontal guide */}
                <line x1="10" y1={endExpY} x2="506" y2={endExpY} stroke="#10b981" strokeWidth="1.4" strokeDasharray="5 3" />

                {/* Inspiration shaded zones */}
                <rect x="64" y="24" width="114" height="128" fill="#3b82f6" fillOpacity="0.08" />
                <rect x="282" y="24" width="114" height="128" fill="#3b82f6" fillOpacity="0.08" />
                <text x="121" y="38" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#93c5fd">
                  {ventMode === 'ppv' ? 'İNSPİRYUM (Ppl ↑ → CVP ↑)' : 'İNSPİRYUM (Ppl ↓ → CVP ↓)'}
                </text>
                <text x="339" y="38" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#93c5fd">
                  İNSPİRYUM
                </text>

                {/* Smooth respiratory envelope of CVP */}
                <path d={respWavePath} fill="none" stroke="#60a5fa" strokeWidth="2.8" />

                {/* End-expiration measurement dots */}
                <circle cx="234" cy={endExpY} r="5.5" fill="#10b981" stroke="#0b1120" strokeWidth="2" />
                <circle cx="460" cy={endExpY} r="5.5" fill="#10b981" stroke="#0b1120" strokeWidth="2" />
                <text x="234" y={ventMode === 'ppv' ? 140 : 72} textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#34d399">
                  EKSPİRYUM SONU ({endExpCvp} mmHg)
                </text>
              </svg>

              <div className="text-[11px] leading-relaxed text-slate-300 border-t border-slate-800 pt-2.5 space-y-1">
                <div>
                  <strong className="text-emerald-400">Neden Ekspiryum Sonu?</strong> Plevral basınç atmosfer basıncına en
                  yakın düzeydedir; hem spontan solunumda hem mekanik ventilasyonda <em>her zaman ekspiryum sonunda</em> okunur.
                </div>
                <div className="text-amber-300">
                  <strong>Düşük Basınç Uyarısı:</strong> CVP küçük bir sayıdır (2–8 mmHg); sadece 10 cm’lik transdüser hatası
                  bile (+7.4 mmHg) CVP’yi iki katından fazla saptırır!
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
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            2
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Endikasyonlar ve Klinik Amaç
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Günümüz kanıta dayalı pratiğinde CVP, "hastaya sıvı verelim mi?" sorusunu değil, <strong>"sağ kalp bu sıvıyı
              tolere ediyor mu / venöz konjesyon gelişiyor mu?"</strong> sorusunu yanıtlar.
            </p>
          </div>
        </div>

        {/* Visual 2: 4-Panel Modern Role of CVP SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 182"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="CVP modern klinik rolü: sıvı yanıtlılığı miti, venöz konjesyon ve sağ kalp izlemi"
            >
              {/* Panel 1 */}
              <g transform="translate(8, 8)">
                <rect width="206" height="166" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f43f5e" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f43f5e">1. Sıvı Yanıtlılığı Miti!</text>
                <text x="14" y="48" fontSize="9.5" fontWeight="700" fill={isDark ? '#fda4af' : '#9f1239'}>Marik Meta-Analizi: AUC 0.56</text>
                <text x="14" y="66" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Tek statik CVP değeri hastanın</text>
                <text x="14" y="81" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  sıvıya yanıt verip vermeyeceğini</text>
                <text x="14" y="96" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  yazı-tura kadar bile öngöremez!</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Dinamik test (PPV/SVV/PLR) kullan.</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#fb7185">CVP 5 ≠ kesin hipovolemi</text>
              </g>

              {/* Panel 2 */}
              <g transform="translate(226, 8)">
                <rect width="206" height="166" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#3b82f6" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#3b82f6">2. Durdurma &amp; Konjesyon</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sıvı bolusuna rağmen CO artmıyor</text>
                <text x="14" y="63" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  ve CVP &gt;+3–5 mmHg çıkıyorsa</text>
                <text x="14" y="78" fontSize="9.5" fontWeight="700" fill="#60a5fa">  → SIVIYI DURDUR (Stopping Rule)!</text>
                <text x="14" y="100" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Böbrek perfüzyonu = MAP − CVP.</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Yüksek CVP (&gt;12) → AKI &amp; ödem!</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#60a5fa">Düşük CVP = Karaciğer rezeksiyonu</text>
              </g>

              {/* Panel 3 */}
              <g transform="translate(444, 8)">
                <rect width="206" height="166" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f59e0b" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f59e0b">3. Sağ Kalp, Tamponad &amp; VAE</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Akut RV yetmezliği / masif PE</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kardiyak tamponad (y inişi yok)</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Triküspit yetmezliği (dev c-v)</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Oturur kraniyotomide Venöz Hava</text>
                <text x="14" y="114" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  Embolisi (VAE) aspirasyonu</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#fbbf24">Dalga formu tanı koydurur!</text>
              </g>

              {/* Panel 4 */}
              <g transform="translate(662, 8)">
                <rect width="210" height="166" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#10b981" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#10b981">4. Santral Kateter Erişimi</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Vazoaktif / inotrop infüzyonu</text>
                <text x="14" y="65" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Hipertonik sıvı, KCl, TPN</text>
                <text x="14" y="82" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Santral venöz O₂ satürasyonu (ScvO₂)</text>
                <text x="14" y="99" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Pulmoner arter kateteri / Pacemaker</text>
                <text x="14" y="116" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Yetersiz periferik damar erişimi</text>
                <text x="14" y="148" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#34d399">ScvO₂ normal: %65–75</text>
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
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            3
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Teknik Kurulum, Kateter Ucu Konumu ve Kalibrasyon
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              İdeal kateter ucu <strong>SVC–sağ atriyum kavşağında (alt 1/3 SVC · karina hizası)</strong>, damar duvarına paralel
              ve perikard yansımasının dışında konumlanmalıdır. Sağ internal jugüler (RIJ) USG kılavuzluğunda standart ilk tercihtir.
            </p>
          </div>
        </div>

        {/* Visual 3A: Ideal Tip Position (Carina / SVC-RA) & Intracavitary ECG Tip Guidance SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <Wrench className="w-4 h-4 text-blue-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              Anatomik Uç Konumu (Karina / SVC–RA Kavşağı) &amp; İntrakaviter EKG P-Dalgası Kılavuzluğu
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 205"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Santral venöz kateter ideal uç konumu ve intrakaviter EKG kılavuzluğu"
            >
              {/* Left: Mediastinal Anatomy & Carina Landmark */}
              <rect x="8" y="8" width="430" height="188" rx="12" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <text x="24" y="29" fontSize="11" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                İdeal Uç Konumu: Alt 1/3 SVC (Karina Hizası)
              </text>

              {/* Trachea & Carina */}
              <path d="M 122 44 L 122 104 L 84 134 M 122 104 L 160 134" fill="none" stroke="#64748b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
              {/* Carina dashed horizontal line */}
              <line x1="26" y1="106" x2="210" y2="106" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="28" y="101" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#10b981">Karina</text>

              {/* RIJ + SVC + RA */}
              <path d="M 92 44 L 92 128" fill="none" stroke="#3b82f6" strokeWidth="16" strokeOpacity="0.25" />
              <circle cx="96" cy="148" r="24" fill="#ef4444" fillOpacity="0.16" stroke="#ef4444" strokeWidth="1.5" />
              <text x="96" y="152" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#ef4444">RA</text>

              {/* Catheter line stopping just at SVC-RA junction */}
              <path d="M 92 40 L 92 114" fill="none" stroke="#3b82f6" strokeWidth="3" />
              <circle cx="92" cy="114" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />

              {/* Callout text right side of panel 1 */}
              <g transform="translate(216, 44)">
                <text x="0" y="14" fontSize="9.5" fontWeight="700" fill="#10b981">✓ Güvenli Hedef: SVC–RA</text>
                <text x="0" y="30" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>• Akciğer grafisinde karina hizası</text>
                <text x="0" y="45" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  (perikard yansıması üstünde!).</text>
                <text x="0" y="68" fontSize="9.5" fontWeight="700" fill="#ef4444">✖ Çok Derin (RA / RV İçi):</text>
                <text x="0" y="83" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>• Aritmi, triküspit hasarı ve</text>
                <text x="0" y="98" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  perforasyon / tamponad riski!</text>
                <text x="0" y="122" fontSize="9.5" fontWeight="700" fill="#f59e0b">● Distal Lümen (Kahverengi):</text>
                <text x="0" y="137" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  CVP daima en distal uçtan ölçülür.</text>
              </g>

              {/* Right: Intracavitary ECG P-Wave Guidance */}
              <rect x="454" y="8" width="418" height="188" rx="12" fill="#0b1120" stroke={isDark ? '#334155' : '#cbd5e1'} />
              <text x="470" y="29" fontSize="11" fontWeight="700" fill="#e2e8f0">
                İntrakaviter EKG (DII) ile Gerçek Zamanlı Uç Onayı
              </text>

              {[
                { x: 472, title: '1. Üst SVC', desc: 'Normal P dalgası', pPeakY: 82, col: '#94a3b8' },
                { x: 604, title: '2. SVC–RA Kavşağı ★', desc: 'Dev Sivri P (Max!)', pPeakY: 50, col: '#10b981' },
                { x: 736, title: '3. Sağ Atriyum İçi', desc: 'Bifazik P → Geri Çek!', pPeakY: 112, col: '#f43f5e' },
              ].map((st) => (
                <g key={st.title} transform={`translate(${st.x}, 44)`}>
                  <rect width="122" height="106" rx="8" fill="#0f172a" stroke={st.col} strokeOpacity="0.65" />
                  <text x="61" y="18" textAnchor="middle" fontSize="9" fontWeight="700" fill={st.col}>
                    {st.title}
                  </text>
                  {st.pPeakY === 112 ? (
                    <path d="M 12 66 L 26 66 Q 34 46, 42 66 Q 50 86, 58 66 L 68 66 L 74 36 L 80 78 L 86 66 L 110 66" fill="none" stroke={st.col} strokeWidth="2.2" />
                  ) : (
                    <path d={`M 12 66 L 26 66 Q 38 ${st.pPeakY - 12}, 50 66 L 68 66 L 74 36 L 80 78 L 86 66 L 110 66`} fill="none" stroke={st.col} strokeWidth="2.2" />
                  )}
                  <text x="61" y="96" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill="#cbd5e1">
                    {st.desc}
                  </text>
                </g>
              ))}

              <text x="663" y="175" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#93c5fd">
                P dalgası maksimuma ulaştığında (SA düğüm seviyesi) 2–3 cm geri çekip sabitle!
              </text>
            </svg>
          </div>
        </div>

        {/* Access Sites Table + Checklist */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-7 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-700'}>
                  <th className="py-2.5 px-3 font-bold">Venöz Giriş Yolu</th>
                  <th className="py-2.5 px-3 font-bold font-mono">Derinlik</th>
                  <th className="py-2.5 px-3 font-bold">Avantaj / Başlıca Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {CVC_SITE_TABLE.map((row) => (
                  <tr
                    key={row.site}
                    className={isDark ? 'hover:bg-slate-800/40 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                  >
                    <td className="py-2.5 px-3 font-semibold">{row.site}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums whitespace-nowrap text-blue-600 dark:text-blue-400">
                      {row.tipDepth}
                    </td>
                    <td className="py-2.5 px-3 space-y-0.5">
                      <div>{row.pros}</div>
                      <div className="text-[11px] text-rose-600 dark:text-rose-400">{row.risks}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`xl:col-span-5 p-4 rounded-xl border space-y-2.5 ${mutedSurface}`}>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-blue-500" />
              <span className={`text-xs font-bold ${headingColor}`}>
                Kurulum, Sıfırlama &amp; Doğrulama Kontrol Listesi
              </span>
            </div>
            <ul className={`space-y-2 text-xs leading-relaxed ${bodyColor}`}>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Gerçek Zamanlı USG + Venöz Doğrulama:</strong> Dilatörden önce mutlaka USG’de kılavuz telin ven içinde
                  olduğunu göster ve gerekirse basınç/kan gazı ile arteriyel ponksiyonu dışla!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Flebostatik Eksen (4. İKA / Mid-Ax):</strong> Her 1 cm hata 0.74 mmHg sapma demektir; CVP’de su
                  terazisi/lazer ile milimetrik hizalama ve atmosferik ZERO şarttır.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Distal Lümen &amp; İnfüzyon İzolasyonu:</strong> Ölçüm hattından vazoaktif/hızlı bolus verme; hızlı
                  infüzyon CVP’yi yapay yükseltir, ölçüm anında duraklatılan vazoaktif ise hemodinamik dalgalanma yapar.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: NORMAL VE PATOLOJİK DALGA FORMLARI (7 PATERN)                */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            4
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Normal ve Patolojik Dalga Formları (Eşzamanlı EKG + CVP Monitörü)
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              CVP dalga formunu <strong>daima EKG ile eşzamanlı</strong> okuyun: <span className="font-mono">a</span> dalgasının
              kaybı (AF), kanon <span className="font-mono">a</span> (nodal ritim/AV blok), dev <span className="font-mono">c-v</span>{' '}
              (triküspit yetmezliği) ve <span className="font-mono">y</span> inişinin silinmesi (tamponad) doğrudan tanı koydurur.
            </p>
          </div>
        </div>

        {/* Pattern Selector */}
        <div className="flex flex-wrap gap-1.5">
          {CVP_PATTERNS.map((pattern) => {
            const active = pattern.id === activePatternId;
            return (
              <button
                key={pattern.id}
                type="button"
                onClick={() => setActivePatternId(pattern.id)}
                className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-blue-600 text-white border-blue-500'
                    : isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-blue-500/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-400'
                }`}
              >
                {pattern.label}
              </button>
            );
          })}
        </div>

        {/* Dark Dual-Trace ECG + CVP Monitor Console */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5 text-slate-100 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <Waves className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">{activePattern.label}</div>
                <div className="text-[11px] font-mono text-slate-400">{activePattern.statusText}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono tabular-nums">
              <div>
                <div className="text-[10px] text-blue-300">CVP (Ort.)</div>
                <div
                  className={`text-xl font-bold ${
                    activePattern.status === 'normal'
                      ? 'text-blue-400'
                      : activePattern.status === 'warning'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                  }`}
                >
                  {activePattern.cvpVal}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Baskın Özellik</div>
                <div className="text-xs font-bold text-emerald-300">{activePattern.dominantFeature}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">EKG Referansı</div>
                <div className="text-xs font-bold text-slate-200">{activePattern.rhythmLabel}</div>
              </div>
            </div>
          </div>

          {/* Synchronized Dual SVG */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 540 175"
              className="w-full min-w-[460px] h-auto"
              role="img"
              aria-label={`${activePattern.label} eşzamanlı EKG ve CVP dalga formu`}
            >
              {/* Grid */}
              {[42, 74, 106, 138, 162].map((gy) => (
                <line key={gy} x1="8" y1={gy} x2="532" y2={gy} stroke="#1e293b" strokeWidth="1" />
              ))}
              <text x="12" y="18" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#34d399">
                EKG (DII)
              </text>
              <text x="12" y="84" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#60a5fa">
                CVP (mmHg)
              </text>

              {/* ECG path */}
              <path d={activePattern.ecgPath} fill="none" stroke="#34d399" strokeWidth="1.9" />
              {/* CVP path */}
              <path d={activePattern.cvpPath} fill="none" stroke="#60a5fa" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Peak/Descent Annotations */}
              {activePattern.waveTags.map((tag, idx) => (
                <text
                  key={idx}
                  x={tag.x}
                  y={tag.y}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="700"
                  fill={tag.color}
                >
                  {tag.text}
                </text>
              ))}
            </svg>
          </div>

          {/* Clinical Interpretation Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-slate-800 pt-3.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-bold text-blue-300">Dalga Morfolojisi</div>
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
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            5
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Limitasyonlar ve Artefaktlar
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              CVP düşük basınçlı bir parametre olduğu için teknik seviye hataları, intratorasik/intraabdominal basınç artışı ve
              sol–sağ kalp uyumsuzluğu sayısal değeri hızla anlamsızlaştırabilir.
            </p>
          </div>
        </div>

        {/* Visual 5: 3-Zone CVP Pitfall SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              3 Bölgeli CVP Hata Haritası (Yalancı Yüksek · Yalancı Düşük · Fizyolojik Sınırlar)
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 165"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="CVP yalancı yüksek, yalancı düşük ve fizyolojik sınırlama nedenleri"
            >
              {/* Zone 1 */}
              <g transform="translate(8, 8)">
                <rect width="280" height="148" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f43f5e" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f43f5e">▲ YALANCI YÜKSEK CVP</text>
                <text x="14" y="47" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Transdüser altta (+10 cm = +7.4 mmHg!)</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Yüksek PEEP, auto-PEEP, bronkospazm</text>
                <text x="14" y="81" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Laparoskopi pnömoperitonyumu / IAH</text>
                <text x="14" y="98" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Trendelenburg / prone pozisyon</text>
                <text x="14" y="115" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Ölçüm lümeninden hızlı IV infüzyon</text>
              </g>

              {/* Zone 2 */}
              <g transform="translate(300, 8)">
                <rect width="280" height="148" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#0ea5e9" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#0ea5e9">▼ YALANCI DÜŞÜK / BOZUK</text>
                <text x="14" y="47" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Transdüser kalp seviyesinin üstünde</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Spontan inspiryum anında okuma</text>
                <text x="14" y="81" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Kateter ucunda pıhtı / damar duvarı</text>
                <text x="14" y="98" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Hattaki hava kabarcığı (overdamping)</text>
                <text x="14" y="115" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Ters Trendelenburg / oturur pozisyon</text>
              </g>

              {/* Zone 3 */}
              <g transform="translate(592, 8)">
                <rect width="280" height="148" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f59e0b" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f59e0b">⊘ FİZYOLOJİK SINIRLAMALAR</text>
                <text x="14" y="47" fontSize="9.5" fontWeight="700" fill="#fbbf24">• Statik CVP sıvı yanıtını ÖNGÖRMEZ!</text>
                <text x="14" y="64" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sol ventrikül önyükünü (LVEDP)</text>
                <text x="14" y="79" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  LV yetmezliği / PHT’de yansıtmaz!</text>
                <text x="14" y="98" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• RV kompliyansı değişirse aynı hacim</text>
                <text x="14" y="113" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  farklı CVP verir (basınç ≠ hacim).</text>
              </g>
            </svg>
          </div>
        </div>

        {/* 6-Row Limitation Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-700'}>
                <th className="py-2.5 px-3 font-bold">Limitasyon / Artefakt</th>
                <th className="py-2.5 px-3 font-bold">Etki</th>
                <th className="py-2.5 px-3 font-bold">Klinik Çözüm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  cause: 'Basınç ≠ Hacim (Kompliyans Etkisi)',
                  effect: 'Yanlış Volüm Yorumu',
                  col: 'text-amber-600 dark:text-amber-400',
                  fix: 'Sert RV’de küçük hacim yüksek CVP yapar; sıvı kararında PPV/SVV, PLR veya TTE/TEE kullan.',
                },
                {
                  cause: 'Yüksek PEEP / Pnömoperitonyum',
                  effect: 'CVP Yapay ↑',
                  col: 'text-rose-600 dark:text-rose-400',
                  fix: 'İntratorasik basınç transmural basıncı maskeler; mutlak değer yerine PEEP sabitken trend izle.',
                },
                {
                  cause: 'Masa Yüksekliği Değişimi',
                  effect: '±7.4 mmHg / 10 cm',
                  col: 'text-rose-600 dark:text-rose-400',
                  fix: 'CVP düşük olduğu için birkaç cm bile %100 hata yapar; transdüseri masa ile sabitle ve sıfırla.',
                },
                {
                  cause: 'İzole Sol Kalp Yetmezliği',
                  effect: 'Normal CVP + Akciğer Ödemi',
                  col: 'text-amber-600 dark:text-amber-400',
                  fix: 'CVP yalnızca sağ kalbi görür; sol kalp/akciğer ödemi şüphesinde akciğer USG (B-çizgileri) veya EKO bak.',
                },
                {
                  cause: 'Ölçüm Lümeninde Pompa Akışı',
                  effect: 'Yalancı Yüksek / Gürültü',
                  col: 'text-sky-600 dark:text-sky-400',
                  fix: 'Ölçüm için distal lümeni ayır; vazoaktifleri ayrı proksimal/medial lümenden ver.',
                },
                {
                  cause: 'Kateterin Malpozisyonu (İnnominat / Azygos)',
                  effect: 'Sönümlü / Anlamsız Trase',
                  col: 'text-amber-600 dark:text-amber-400',
                  fix: 'Akciğer grafisi veya intrakaviter EKG ile ucu doğrula; geri akım yoksa zorla yıkama.',
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
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
            6
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Komplikasyonlar ve Güvenlik
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Santral venöz kateterizasyon yüksek riskli invaziv bir girişimdir; gerçek zamanlı USG kullanımı, dilatör öncesi
              venöz doğrulama, kılavuz tel kontrolü ve hava embolisi protokolü hayat kurtarır.
            </p>
          </div>
        </div>

        {/* Visual 6: 3-Panel CVC/CVP Safety SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span className={`text-xs font-bold ${headingColor}`}>
              Santral Venöz Kateter &amp; CVP Güvenlik Şeması (Mekanik · Hava Embolisi/Tamponad · CLABSI &amp; Mikroşok)
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 185"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="CVP santral kateter komplikasyonları ve güvenlik önlemleri"
            >
              {/* Panel 1: Mechanical */}
              <g transform="translate(8, 8)">
                <rect width="280" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#ef4444" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#ef4444">1. Mekanik &amp; Girişim Riskleri</text>
                <text x="14" y="48" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Pnömotoraks / Hemotoraks (öz. SCV)</text>
                <text x="14" y="65" fontSize="9.5" fontWeight="700" fill="#f87171">• Kazara Arteriyel Dilatasyon (Karotis!):</text>
                <text x="14" y="80" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Büyük kateter arterdeyse ÇEKME → Damar cerr.!</text>
                <text x="14" y="100" fontSize="9.5" fontWeight="700" fill="#fbbf24">• Kılavuz Telin Kaçırılması (Never Event):</text>
                <text x="14" y="115" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Teli bir elinle ASLA bırakma; işlem sonu say!</text>
                <text x="14" y="136" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Telin derine itilmesi → VES / VT / RBBB!</text>
                <text x="14" y="155" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">
                  ✓ Dinamik USG + Dilatör öncesi basınç/USG
                </text>
              </g>

              {/* Panel 2: Air Embolism & Tamponade */}
              <g transform="translate(300, 8)">
                <rect width="280" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#f59e0b" strokeOpacity="0.65" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#f59e0b">2. Hava Embolisi (VAE) &amp; Tamponad</text>
                <text x="14" y="48" fontSize="9.5" fontWeight="700" fill="#fbbf24">• Venöz Hava Embolisi (Takarken &amp; Çekerken!):</text>
                <text x="14" y="63" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  Açık lümen + dik pozisyon → negatif basınç</text>
                <text x="14" y="77" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  saniyeler içinde &gt;100 mL hava çeker!</text>
                <text x="14" y="98" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sol/RA içi kateter ucu → geç miyokard</text>
                <text x="14" y="113" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>  erozyonu ve akut kardiyak tamponad!</text>
                <text x="14" y="135" fontSize="9.5" fill={isDark ? '#cbd5e1' : '#334155'}>• Sol IJV/SCV: Duktus torasikus (şilotoraks).</text>
                <text x="14" y="155" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#fbbf24">
                  Trendelenburg + Valsalva/Ekspiryumda çek!
                </text>
              </g>

              {/* Panel 3: CLABSI & Microshock */}
              <g transform="translate(592, 8)">
                <rect width="280" height="168" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#3b82f6" strokeOpacity="0.6" />
                <text x="14" y="25" fontSize="11" fontWeight="700" fill="#3b82f6">3. CLABSI, Tromboz &amp; Mikroşok</text>
                <text x="14" y="48" fontSize="9.5" fontWeight="700" fill="#60a5fa">• CLABSI Önleme Demeti:</text>
                <text x="14" y="63" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  El hijyeni + tam steril örtü + %2 klorheksidin</text>
                <text x="14" y="77" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  + femoralden kaçınma + günlük çekim sorgusu.</text>
                <text x="14" y="99" fontSize="9.5" fontWeight="700" fill="#f87171">• Elektrik Mikroşoku (50–100 µA → VF!):</text>
                <text x="14" y="114" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  SF dolu kateter kalbe direkt iletkendir;</text>
                <text x="14" y="128" fontSize="9" fill={isDark ? '#cbd5e1' : '#334155'}>  yalnızca CF tipi izole monitör kullan!</text>
                <text x="14" y="155" fontSize="9" fontFamily="monospace" fontWeight="700" fill="#10b981">
                  Gereksiz SVK’yı en erken günde çek
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* 2 Clinical Safety Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold flex items-center gap-1.5 ${headingColor}`}>
              <Info className="w-3.5 h-3.5 text-rose-500" />
              <span>Kazara Karotis / Subklavyen Arter Dilatasyonu (ASA 2020)</span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              İnce giriş iğnesi (18G) artere girdiyse çekip 5–10 dk bası yeterlidir. Ancak <strong>≥7 Fr büyük kateter veya dilatör
              artere ilerletildiyse ASLA YATAK BAŞINDA ÇEKMEYİN!</strong> Çekme işlemi masif hemoraji, hava yolu basısı ve inme
              yapar → kateteri yerinde bırakıp acil damar cerrahisi / girişimsel radyoloji çağırın.
            </p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold flex items-center gap-1.5 ${headingColor}`}>
              <Activity className="w-3.5 h-3.5 text-blue-500" />
              <span>Güvenli SVK Çekim Protokolü (Hava Embolisi Kalkanı)</span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Çekim sırasında hasta mutlaka <strong>supin / hafif Trendelenburg</strong> pozisyonunda olmalıdır (asla otururken
              çekme!). Uyanık hastadan ekspiryum sonunda nefes tutması/Valsalva yapması (entübe hastada ekspiryum veya pozitif
              tutma) istenir, kateter çekilir çekilmez hava geçirmez vazelinli/oklüzif pansumanla ≥5 dk bası uygulanır.
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
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            Kaynaklar:
          </span>
          <span>Miller’s Anesthesia (Cardiovascular Monitoring)</span>
          <span aria-hidden="true">·</span>
          <span>ASA Practice Guidelines for Central Venous Access (2020)</span>
          <span aria-hidden="true">·</span>
          <span>Marik PE &amp; Cavallazzi R — Does CVP Predict Fluid Responsiveness? (Crit Care Med)</span>
          <span aria-hidden="true">·</span>
          <span>Magder S — Understanding Central Venous Pressure</span>
        </div>
      </section>
    </div>
  );
};
