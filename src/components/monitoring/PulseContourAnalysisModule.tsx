import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  ShieldAlert,
  Sliders,
  XCircle,
} from 'lucide-react';
import { MedicalText } from '../basics/respiratory/MedicalText';

interface PulseContourAnalysisModuleProps {
  isDark: boolean;
}

type PresetId = 'hypovolemic' | 'euvolemic' | 'ards_low_vt' | 'septic_vasoplegia';

interface PrerequisiteItem {
  id: string;
  label: string;
  requirement: string;
  failureType: 'invalid' | 'false_negative' | 'false_positive';
  failureLabel: string;
  mechanism: string;
  rescue: string;
}

const PREREQUISITES: PrerequisiteItem[] = [
  {
    id: 'sinus_rhythm',
    label: 'Sinüs ritmi',
    requirement: 'Düzenli R–R aralığı (AF veya sık VES/SVES yok)',
    failureType: 'invalid',
    failureLabel: 'Ölçüm Geçersiz',
    mechanism:
      'Atriyal fibrilasyon ve ektopik atımlarda diyastolik doluş süresi atımdan atıma rastgele değişir; solunumsal değişim ile aritmik değişim birbirinden ayrılamaz.',
    rescue: 'Pasif Bacak Kaldırma (PLR) + gerçek zamanlı SV/CO veya 15 sn Ekspiryum Sonu Oklüzyon Testi (EEOT) kullanın.',
  },
  {
    id: 'controlled_vent',
    label: 'Tam kontrollü mekanik ventilasyon',
    requirement: 'Spontan solunum çabası veya tetikleme yok',
    failureType: 'invalid',
    failureLabel: 'Ölçüm Geçersiz',
    mechanism:
      'Spontan inspirasyon negatif plevral basınç oluşturur ve solunum derinliği sabit kalmadığı için arteriyel nabız basıncı düzensiz dalgalanır.',
    rescue: 'PLR (≥ %10 SV/CO artışı) veya Mini Sıvı Yüklemesi (100 mL / 1 dk) tercih edin.',
  },
  {
    id: 'tidal_volume',
    label: 'Yeterli tidal volüm (Vt ≥ 8 mL/kg PBW)',
    requirement: 'Akciğer koruyucu 6 mL/kg yerine ≥ 8 mL/kg',
    failureType: 'false_negative',
    failureLabel: 'Yanlış Negatif Riski',
    mechanism:
      'Düşük Vt (< 7–8 mL/kg) plevral basınç salınımını (ΔPpl) küçültür; hasta sıvı yanıtlı olsa bile PPV ve SVV düşük (< %9) ölçülebilir.',
    rescue: 'Tidal Volüm Yüklemesi (TVC): Vt’yi 1 dk süreyle 6 → 8 mL/kg çıkarın; ΔPPV ≥ %3,5 veya ΔSVV ≥ %2,5 ise sıvı yanıtlıdır.',
  },
  {
    id: 'closed_chest',
    label: 'Kapalı göğüs kafesi (Toraks intakt)',
    requirement: 'Sternotomi, torakotomi veya açık plevra yok',
    failureType: 'false_negative',
    failureLabel: 'Yanlış Negatif Riski',
    mechanism:
      'Açık toraksta pozitif hava yolu basıncı atmosfere dağılır; intratorasik basınç değişimi venöz dönüşü yeterince baskılayamaz.',
    rescue: 'PLR, TEE/ekokardiyografik LVOT-VTI değişimi veya kontrollü mini sıvı yüklemesi (100 mL) uygulayın.',
  },
  {
    id: 'lung_compliance',
    label: 'Korunmuş akciğer kompliyansı (Crs ≥ 30 mL/cmH₂O)',
    requirement: 'Ağır ARDS veya sert akciğer tablosu yok',
    failureType: 'false_negative',
    failureLabel: 'Yanlış Negatif Riski',
    mechanism:
      'Düşük akciğer kompliyansında hava yolu basıncının yalnızca küçük bir fraksiyonu plevral boşluğa ve perikarda iletilir; PPV/SVV yapay olarak baskılanır.',
    rescue: 'TVC veya PLR ile dinamik yanıtı doğrulayın; tek başına düşük PPV ile hipovolemiyi dışlamayın.',
  },
  {
    id: 'hr_rr_ratio',
    label: 'Kalp hızı / Solunum hızı oranı > 3,6',
    requirement: 'Her solunum döngüsünde yeterli kalp atımı',
    failureType: 'false_negative',
    failureLabel: 'Yanlış Negatif Riski',
    mechanism:
      'Yüksek solunum frekansı (RR > 25–30/dk) veya belirgin bradikardide Nyquist örnekleme eşiği bozulur; tek solunum siklusunda maksimum ve minimum PP yakalanamaz.',
    rescue: 'Klinik uygunsa kısa süreli RR düzenlemesi yapın veya PLR/EEOT’a geçin.',
  },
  {
    id: 'rv_function',
    label: 'Sağ ventrikül (RV) yetmezliği yok',
    requirement: 'Akut kor pulmonale, masif PE veya aşırı PEEP yok',
    failureType: 'false_positive',
    failureLabel: 'Yanlış Pozitif (Tehlikeli!)',
    mechanism:
      'Pozitif basınçlı inspirasyon pulmoner vasküler direnci artırarak yetersiz RV’nin art yükünü (afterload) keskin yükseltir; RV atım hacmi düştüğü için PPV/SVV > %13 çıkar ancak hasta sıvı yanıtlı DEĞİLDİR.',
    rescue: 'Yüksek PPV’de hemen sıvı vermeden önce yatak başı EKO/TEE ile RV boyutunu ve septal düzleşmeyi kontrol edin; PLR negatifse sıvıdan kaçının.',
  },
  {
    id: 'normal_iap',
    label: 'Normal intra-abdominal basınç (İAB < 12 mmHg)',
    requirement: 'Pnömoperitonyum veya abdominal kompartman yok',
    failureType: 'false_positive',
    failureLabel: 'Yanlış Pozitif / Eşik Kayması',
    mechanism:
      'Yüksek İAB göğüs duvarı kompliyansını düşürür ve plevral basınç iletimini artırır; övolemik hastalarda bile PPV/SVV %15–20 bandına çıkabilir.',
    rescue: 'Laparoskopide standart %13 eşiğini tek başına kullanmayın; PLR (ancak ağır İAH’de güvenilirliği azalır) veya mini sıvı yüklemesiyle doğrulayın.',
  },
];

const PLATFORM_ROWS = [
  {
    className: 'Eksternal Kalibre (İnvaziv)',
    devices: 'PiCCO2 / PulsioFlex · VolumeView (EV1000) · LiDCOplus',
    principle: 'Transpulmoner termodilüsyon (soğuk salin) veya lityum dilüsyonu ile mutlak CO kalibrasyonu + nabız kontur / nabız gücü takibi.',
    strengths: 'Ağır şok ve vazoplejide en yüksek mutlak CO doğruluğu; PiCCO/VolumeView ek olarak GEDVI (ön yük) ve EVLWI (akciğer suyu) sunar.',
    limits: 'Santral ven + özel arter kateteri (çoğunlukla femoral) gerektirir; vasküler tonus belirgin değişince yeniden kalibre edilmelidir. LiDCO, kas gevşeticilerle (kuaterner amonyum) etkileşebilir.',
  },
  {
    className: 'Otokalibre / Kalibresiz (Minimal İnvaziv)',
    devices: 'FloTrac / HemoSphere · MostCare (PRAM) · ProAQT',
    principle: 'Mevcut radyal/femoral arter hattına bağlanır. Biyometrik veriler + dalga formu istatistiği (çarpıklık/basıklık) veya yüksek frekanslı (1000 Hz) empedans tahminiyle SV hesaplar.',
    strengths: 'Hızlı kurulum, ek santral hat veya dilüsyon gerektirmez; ameliyathanede GDT ve sürekli SVV/PPV trend takibi için pratik standarttır.',
    limits: 'Ağır septik vazopleji, yüksek doz vazopresör, siroz, ağır aort yetmezliği ve IABP varlığında mutlak CO sapar; trend ve dinamik değişim mutlak rakamdan daha güvenilirdir.',
  },
  {
    className: 'Non-İnvaziv Parmak Manşonu (Volume-Clamp)',
    devices: 'ClearSight (Nexfin) · CNAP',
    principle: 'Peňáz hacim-klemp yöntemiyle parmak arterini sabit hacimde tutarak sürekli non-invaziv arter dalga formu yeniden oluşturur ve SVV/PPV hesaplar.',
    strengths: 'Arteriyel kanülasyon endikasyonu olmayan orta-yüksek riskli cerrahilerde sürekli kan basıncı ve dinamik sıvı yanıtlılığı izlemi sağlar.',
    limits: 'Periferik vazokonstriksiyon, hipotermi, parmak ödemi ve şokta sinyal kalitesi hızla bozulur; yüksek riskli instabil vakalarda invaziv arter hattının yerini almaz.',
  },
];

const REFERENCES = [
  {
    authors: 'Michard F, Boussat S, Chemla D, et al.',
    title: 'Relation between respiratory changes in arterial pulse pressure and fluid responsiveness in septic patients with acute circulatory failure.',
    journal: 'Am J Respir Crit Care Med. 2000;162(1):134–138.',
    pmid: '10903232',
    doi: '10.1164/ajrccm.162.1.9903035',
  },
  {
    authors: 'Cannesson M, Le Manach Y, Hofer CK, et al.',
    title: 'Assessing the diagnostic accuracy of pulse pressure variations for the prediction of fluid responsiveness: a "gray zone" approach.',
    journal: 'Anesthesiology. 2011;115(2):231–241.',
    pmid: '21705869',
    doi: '10.1097/ALN.0b013e318225b80a',
  },
  {
    authors: 'Monnet X, Marik PE, Teboul JL.',
    title: 'Passive leg raising for predicting fluid responsiveness: a systematic review and meta-analysis.',
    journal: 'Intensive Care Med. 2016;42(12):1935–1947.',
    pmid: '26825952',
    doi: '10.1007/s00134-015-4134-1',
  },
  {
    authors: 'Myatra SN, Prabu NR, Divatia JV, Monnet X, Kulkarni AP, Teboul JL.',
    title: 'The changes in pulse pressure variation or stroke volume variation after a "tidal volume challenge" reliably predict fluid responsiveness during low tidal volume ventilation.',
    journal: 'Crit Care Med. 2017;45(3):415–421.',
    pmid: null,
    doi: null,
  },
  {
    authors: 'Saugel B, Kouz K, Scheeren TWL, et al.',
    title: 'Cardiac output estimation using pulse wave analysis—physiology, algorithms, and technologies: a narrative review.',
    journal: 'Br J Anaesth. 2021;126(1):67–76.',
    pmid: '33246581',
    doi: '10.1016/j.bja.2020.09.049',
  },
  {
    authors: 'Kouz K, Scheeren TWL, de Backer D, Saugel B.',
    title: 'Pulse wave analysis to estimate cardiac output.',
    journal: 'Anesthesiology. 2021;134(1):119–126.',
    pmid: '32914174',
    doi: '10.1097/ALN.0000000000003553',
  },
];

// Helper: Starling curve y (SV in mL, 0..105) from preload index (0..100)
function starlingSv(preload: number): number {
  const x = Math.max(0, Math.min(100, preload));
  // Smooth Michaelis-Menten / exponential saturation: steep until ~45, plateau > 70
  return 102 * (1 - Math.exp(-0.042 * x));
}

export const PulseContourAnalysisModule: React.FC<PulseContourAnalysisModuleProps> = ({ isDark }) => {
  // Interactive Laboratory State
  const [activePreset, setActivePreset] = useState<PresetId>('hypovolemic');
  const [preload, setPreload] = useState<number>(30); // 15..92 (%)
  const [tidalVolume, setTidalVolume] = useState<number>(8); // 5..10 mL/kg PBW
  const [vascularTone, setVascularTone] = useState<number>(1.0); // 0.65 (vasoplegia) .. 1.35 (vasoconstriction)

  // Bedside Prerequisite Checklist State (true = condition MET / safe)
  const [metPrereqs, setMetPrereqs] = useState<Record<string, boolean>>(() =>
    PREREQUISITES.reduce<Record<string, boolean>>((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {})
  );

  // Waveform anatomy highlight state
  const [anatomyFocus, setAnatomyFocus] = useState<'all' | 'asys' | 'notch' | 'diastole'>('all');

  const applyPreset = (id: PresetId) => {
    setActivePreset(id);
    if (id === 'hypovolemic') {
      setPreload(28);
      setTidalVolume(8);
      setVascularTone(1.05);
    } else if (id === 'euvolemic') {
      setPreload(76);
      setTidalVolume(8);
      setVascularTone(1.0);
    } else if (id === 'ards_low_vt') {
      setPreload(28);
      setTidalVolume(6);
      setVascularTone(1.0);
    } else if (id === 'septic_vasoplegia') {
      setPreload(32);
      setTidalVolume(8);
      setVascularTone(0.68);
    }
  };

  // Physiological model connecting Preload, Vt, and Vascular Tone -> SVV, PPV, Ea_dyn, and Waveform
  const phys = useMemo(() => {
    // Positive pressure delta preload scales with Vt (baseline 8 mL/kg => delta ~14%)
    const deltaPreload = Math.max(4, (tidalVolume / 8) * 14);
    const pLow = Math.max(5, preload - deltaPreload * 0.65);
    const pHigh = Math.min(98, preload + deltaPreload * 0.35);

    const svMean = starlingSv(preload);
    const svMin = starlingSv(pLow);
    const svMax = starlingSv(pHigh);

    const svv = ((svMax - svMin) / Math.max(1, (svMax + svMin) / 2)) * 100;
    // Ea_dyn (PPV / SVV) depends directly on arterial tone/elastance (normal ~0.95 - 1.15, vasoplegia < 0.8)
    const eaDyn = Math.max(0.55, Math.min(1.45, vascularTone * 1.02));
    const ppv = svv * eaDyn;

    const meanMap = Math.round(52 + (svMean / 95) * 28 * vascularTone);
    const meanPp = Math.round(Math.max(22, (svMean / 75) * 44 * vascularTone));
    const ppMax = Math.round(meanPp * (1 + ppv / 200));
    const ppMin = Math.round(Math.max(12, meanPp * (1 - ppv / 200)));

    // True biological preload responsiveness (slope of Starling curve independent of Vt)
    const trueSlopeGain = ((starlingSv(Math.min(100, preload + 12)) - svMean) / Math.max(1, svMean)) * 100;
    const isTrulyResponsive = trueSlopeGain >= 10;

    let zone: 'low' | 'gray' | 'high' = 'low';
    if (ppv > 13) zone = 'high';
    else if (ppv >= 9) zone = 'gray';

    const lowVtMasking = tidalVolume < 7.5 && isTrulyResponsive && ppv < 13;
    const lowEaDynWarning = eaDyn < 0.8;

    return {
      deltaPreload,
      pLow,
      pHigh,
      svMean,
      svMin,
      svMax,
      svv,
      ppv,
      eaDyn,
      meanMap,
      meanPp,
      ppMax,
      ppMin,
      trueSlopeGain,
      isTrulyResponsive,
      zone,
      lowVtMasking,
      lowEaDynWarning,
    };
  }, [preload, tidalVolume, vascularTone]);

  // Dynamically generate synchronized Ventilator Airway Pressure + Arterial Pressure Waveform SVG paths
  const waveformSvg = useMemo(() => {
    const W = 560;
    const startX = 28;
    const endX = 542;
    const span = endX - startX;

    // 2 respiratory cycles across the width: Insp (0..0.38), Exp (0.38..1.0)
    const pawPoints: string[] = [];
    const steps = 180;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = startX + t * span;
      const cycle = (t * 2) % 1;
      let pawNorm = 0; // 0 = PEEP, 1 = Ppeak
      if (cycle < 0.34) {
        // Inspiratory ramp
        pawNorm = Math.pow(cycle / 0.34, 0.85);
      } else if (cycle < 0.44) {
        // Brief inspiratory pause
        pawNorm = 0.86;
      } else {
        // Exponential passive expiration
        pawNorm = 0.86 * Math.exp(-7.5 * (cycle - 0.44));
      }
      const vtScale = 0.55 + ((tidalVolume - 5) / 5) * 0.45;
      const y = 78 - pawNorm * 42 * vtScale;
      pawPoints.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }

    // 10 cardiac beats across the 2 respiratory cycles (5 beats per breath -> HR/RR = 5 > 3.6)
    const beats = 10;
    const beatWidth = span / beats;
    const abpPoints: string[] = [];
    const baselineY = 208; // ~55 mmHg
    const meanAmp = Math.max(26, Math.min(62, phys.meanPp * 1.12));
    const modFraction = Math.min(0.42, phys.ppv / 200);

    // Track max and min beat peaks for visual callouts in Cycle 1
    let maxPeak = { x: 0, y: 999 };
    let minPeak = { x: 0, y: 0 };

    for (let b = 0; b < beats; b++) {
      const bStart = startX + b * beatWidth;
      const breathPhase = ((b + 0.35) / 5) % 1; // 5 beats per breath
      // Physiological phase lag: dUp right at inspiration (0.15..0.35), dDown during early expiration (0.55..0.78)
      const mod = Math.sin(2 * Math.PI * (breathPhase - 0.02));
      const amp = meanAmp * (1 + modFraction * mod);
      const diastolicShift = mod * meanAmp * modFraction * 0.25;
      const dbpY = baselineY - diastolicShift;
      const sbpY = Math.max(106, dbpY - amp);

      const peakX = bStart + beatWidth * 0.22;
      if (b < 5) {
        if (sbpY < maxPeak.y) maxPeak = { x: peakX, y: sbpY };
        if (sbpY > minPeak.y) minPeak = { x: peakX, y: sbpY };
      }

      const subSteps = 18;
      for (let s = 0; s <= subSteps; s++) {
        const u = s / subSteps;
        const x = bStart + u * beatWidth;
        let shape = 0;
        if (u < 0.22) {
          // Rapid systolic upstroke
          shape = Math.sin((u / 0.22) * (Math.PI / 2));
        } else if (u < 0.44) {
          // Systolic decline to dicrotic notch
          const v = (u - 0.22) / 0.22;
          shape = 1 - 0.56 * v;
        } else if (u < 0.54) {
          // Dicrotic wave bump
          const v = (u - 0.44) / 0.1;
          shape = 0.44 + 0.09 * Math.sin(v * Math.PI);
        } else {
          // Diastolic Windkessel runoff
          const v = (u - 0.54) / 0.46;
          shape = 0.44 * (1 - v);
        }
        const y = dbpY - shape * (dbpY - sbpY);
        abpPoints.push(`${b === 0 && s === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
    }

    return {
      pawPath: pawPoints.join(' '),
      abpPath: abpPoints.join(' '),
      maxPeak,
      minPeak,
      width: W,
    };
  }, [phys.meanPp, phys.ppv, tidalVolume]);

  // Starling Curve SVG coordinates
  const starlingSvg = useMemo(() => {
    const plotX = (p: number) => 56 + (p / 100) * 468;
    const plotY = (sv: number) => 176 - (sv / 110) * 144;

    const pts: string[] = [];
    for (let p = 0; p <= 100; p += 2) {
      pts.push(`${p === 0 ? 'M' : 'L'} ${plotX(p).toFixed(1)} ${plotY(starlingSv(p)).toFixed(1)}`);
    }
    return {
      curvePath: pts.join(' '),
      currX: plotX(preload),
      currY: plotY(phys.svMean),
      lowX: plotX(phys.pLow),
      lowY: plotY(phys.svMin),
      highX: plotX(phys.pHigh),
      highY: plotY(phys.svMax),
    };
  }, [preload, phys.pLow, phys.pHigh, phys.svMean, phys.svMin, phys.svMax]);

  // Prerequisite checker summary
  const failedPrereqs = useMemo(
    () => PREREQUISITES.filter((item) => !metPrereqs[item.id]),
    [metPrereqs]
  );

  const checkerSummary = useMemo(() => {
    if (failedPrereqs.length === 0) {
      return {
        status: 'valid' as const,
        title: '8 / 8 Ön Koşul Sağlandı — PPV & SVV Güvenilir',
        detail:
          'Dinamik ön yük göstergeleri doğrudan yorumlanabilir: < %9 sıvı yanıtsız, %9–%13 gri bölge (fonksiyonel test), > %13 sıvı yanıtlı.',
      };
    }
    const hasInvalid = failedPrereqs.some((f) => f.failureType === 'invalid');
    const hasFalsePos = failedPrereqs.some((f) => f.failureType === 'false_positive');
    if (hasInvalid) {
      return {
        status: 'invalid' as const,
        title: `PPV / SVV Kullanılamaz (${failedPrereqs.length} ihlal)`,
        detail:
          'Aritmi veya spontan solunum varken nabız kontur varyasyonu yanıltıcıdır. Kararı Pasif Bacak Kaldırma (PLR + SV/CO) veya Mini Sıvı Yüklemesine geçirin.',
      };
    }
    if (hasFalsePos) {
      return {
        status: 'false_positive' as const,
        title: `Yanlış Pozitif Tehlikesi (${failedPrereqs.length} ihlal)`,
        detail:
          'RV yetmezliği veya yüksek İAB, sıvı yanıtsız hastada bile PPV/SVV’yi > %13 gösterebilir. Körlemesine sıvı bolusu vermeden önce EKO/TEE ve PLR ile doğrulayın.',
      };
    }
    return {
      status: 'false_negative' as const,
      title: `Yanlış Negatif Riski (${failedPrereqs.length} ihlal)`,
      detail:
        'Düşük Vt, açık toraks, sert akciğer veya düşük HR/RR oranı PPV/SVV’yi yapay olarak düşürür. Düşük değerle hipovolemiyi dışlamayın; Tidal Volüm Yüklemesi (TVC) veya PLR uygulayın.',
    };
  }, [failedPrereqs]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetPrereqs = () => {
    setMetPrereqs(
      PREREQUISITES.reduce<Record<string, boolean>>((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {})
    );
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* EDITORIAL OPENING HEADER (Non-template, zero-pill metadata) */}
      <header
        className={`pb-6 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span className="text-teal-600 dark:text-teal-400 font-semibold">İleri Hemodinamik Monitörizasyon</span>
          <span aria-hidden="true">·</span>
          <span>Dinamik Ön Yük Yanıtlılığı</span>
          <span aria-hidden="true">·</span>
          <span>Sistematik İnceleme &amp; Canlı Fizyoloji Laboratuvarı</span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Nabız Kontur Analizi (SVV ve PPV)
        </h1>

        <p
          className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Statik doluş basınçlarının (CVP, PAOP) sıvı yanıtlılığını öngörmedeki başarısızlığını (AUC ≈ 0,56) aşan
          nabız kontur analizi, arteriyel basınç dalgasının biçimini ve mekanik ventilasyonun yarattığı atım-atım
          salınımları okuyarak hastanın <strong>Frank–Starling eğrisindeki gerçek yerini</strong> saptar.
        </p>

        {/* Functional Chapter Navigation Bar */}
        <nav
          aria-label="Bölüm geçişleri"
          className="mt-5 flex flex-wrap items-center gap-2"
        >
          {[
            { id: 'pca-01', label: '01. Fizik ve Formüller' },
            { id: 'pca-02', label: '02. Kalp–Akciğer Laboratuvarı' },
            { id: 'pca-03', label: '03. 8 Ön Koşul ve Tuzaklar' },
            { id: 'pca-04', label: '04. Gri Bölge ve Testler' },
            { id: 'pca-05', label: '05. Platformlar ve GDT' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-teal-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-teal-400'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. FİZİKSEL TEMELLER: WINDKESSEL, SİSTOLİK ALAN VE FORMÜLLER         */}
      {/* ===================================================================== */}
      <section id="pca-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. Arteriyel Dalga Fiziği: Basınçtan Atım Hacmine (SV)
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Otto Frank’ın <strong>Windkessel modeli</strong>, aortu elastik bir rezervuar (kompliyans <em>C</em>) ve
            periferik yatakları direnç (<em>SVR</em>) olarak tanımlar. Sistol sırasında aort kapağından pompalanan atım
            hacmi (<em>SV</em>), arteriyel basınç dalgasının dikrotik çentiğe kadar olan <strong>sistolik alt alanıyla</strong>{' '}
            doğru, aortik empedansla ters orantılıdır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Single-Beat Arterial Contour Anatomy SVG */}
          <div
            className={`lg:col-span-7 rounded-xl border p-4 sm:p-5 space-y-4 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Tek Kalp Atımında Arteriyel Dalga Anatomisi
              </div>
              <div
                className={`inline-flex p-0.5 rounded-lg border text-[11px] ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                {[
                  { id: 'all', label: 'Tümü' },
                  { id: 'asys', label: 'Sistolik Alan' },
                  { id: 'notch', label: 'Dikrotik Çentik' },
                  { id: 'diastole', label: 'Windkessel' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAnatomyFocus(opt.id as typeof anatomyFocus)}
                    className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      anatomyFocus === opt.id
                        ? isDark
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-900 text-white'
                        : isDark
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <svg
              viewBox="0 0 560 245"
              className="w-full h-auto"
              role="img"
              aria-label="Arteriyel nabız kontur anatomisi ve sistolik alt alan diyagramı"
            >
              {/* Grid lines */}
              {[50, 95, 140, 185].map((y, idx) => (
                <g key={y}>
                  <line
                    x1="54"
                    y1={y}
                    x2="530"
                    y2={y}
                    stroke={isDark ? '#1e293b' : '#e2e8f0'}
                    strokeDasharray="3 4"
                    strokeWidth="1"
                  />
                  <text
                    x="46"
                    y={y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fontFamily="ui-monospace, SFMono-Regular, monospace"
                    fill={isDark ? '#64748b' : '#64748b'}
                  >
                    {[120, 100, 80, 60][idx]}
                  </text>
                </g>
              ))}
              <text
                x="14"
                y="120"
                transform="rotate(-90 14 120)"
                textAnchor="middle"
                fontSize="10"
                fill={isDark ? '#94a3b8' : '#64748b'}
              >
                Basınç (mmHg)
              </text>

              {/* Systolic Area under curve (up to dicrotic notch at x=258) */}
              <path
                d="M 80 185 C 102 182, 120 62, 154 52 C 182 44, 218 86, 258 118 L 258 185 Z"
                fill={isDark ? '#14b8a6' : '#0d9488'}
                fillOpacity={anatomyFocus === 'all' || anatomyFocus === 'asys' ? 0.24 : 0.05}
              />

              {/* Diastolic runoff area (after dicrotic notch) */}
              <path
                d="M 258 118 C 272 104, 286 105, 304 116 C 355 148, 428 172, 505 185 L 258 185 Z"
                fill={isDark ? '#38bdf8' : '#0284c7'}
                fillOpacity={anatomyFocus === 'diastole' ? 0.22 : 0.06}
              />

              {/* Baseline (DBP) */}
              <line
                x1="54"
                y1="185"
                x2="530"
                y2="185"
                stroke={isDark ? '#475569' : '#94a3b8'}
                strokeWidth="1.2"
              />

              {/* Dicrotic notch vertical guide */}
              <line
                x1="258"
                y1="52"
                x2="258"
                y2="196"
                stroke={anatomyFocus === 'notch' ? '#f59e0b' : isDark ? '#475569' : '#94a3b8'}
                strokeDasharray="4 3"
                strokeWidth={anatomyFocus === 'notch' ? '1.8' : '1.1'}
              />

              {/* Main arterial pressure curve */}
              <path
                d="M 54 185 L 80 185 C 102 182, 120 62, 154 52 C 182 44, 218 86, 258 118 C 272 104, 286 105, 304 116 C 355 148, 428 172, 505 185 L 530 185"
                fill="none"
                stroke={isDark ? '#2dd4bf' : '#0f766e'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Pulse Pressure bracket */}
              <line x1="154" y1="52" x2="154" y2="185" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="3 3" />
              <circle cx="154" cy="52" r="4.5" fill="#f59e0b" />
              <text
                x="162"
                y="45"
                fontSize="11"
                fontWeight="700"
                fill={isDark ? '#fbbf24' : '#b45309'}
              >
                SBP (Pik) · PP = SBP − DBP
              </text>

              {/* dP/dt max slope callout */}
              <line x1="94" y1="155" x2="128" y2="75" stroke="#fb7185" strokeWidth="2" />
              <text
                x="62"
                y="112"
                fontSize="10"
                fontWeight="700"
                fill={isDark ? '#fda4af' : '#be123c'}
              >
                dP/dtmax
              </text>
              <text x="62" y="124" fontSize="9" fill={isDark ? '#94a3b8' : '#64748b'}>
                (Kontraktilite)
              </text>

              {/* Asys label */}
              <text
                x="196"
                y="148"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fontFamily="ui-monospace, SFMono-Regular, monospace"
                fill={isDark ? '#5eead4' : '#0f766e'}
              >
                Asys ∝ SV
              </text>

              {/* Dicrotic notch dot & label */}
              <circle cx="258" cy="118" r="4.5" fill="#f59e0b" />
              <text
                x="266"
                y="84"
                fontSize="11"
                fontWeight="700"
                fill={isDark ? '#fbbf24' : '#b45309'}
              >
                Dikrotik Çentik
              </text>
              <text x="266" y="97" fontSize="9.5" fill={isDark ? '#94a3b8' : '#64748b'}>
                Aort kapağı kapanışı (Sistol sonu)
              </text>

              {/* Diastolic Windkessel label */}
              <text
                x="390"
                y="138"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={isDark ? '#7dd3fc' : '#0369a1'}
              >
                Diyastolik Sönümleme
              </text>
              <text
                x="390"
                y="151"
                textAnchor="middle"
                fontSize="9.5"
                fill={isDark ? '#94a3b8' : '#64748b'}
              >
                Kompliyans (C) ve SVR belirler
              </text>

              {/* Phase axis markers */}
              <text x="169" y="216" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={isDark ? '#cbd5e1' : '#334155'}>
                ← Sistolik Ejeksiyon →
              </text>
              <text x="382" y="216" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={isDark ? '#cbd5e1' : '#334155'}>
                ← Diyastolik Akım (Windkessel) →
              </text>
            </svg>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {anatomyFocus === 'asys' &&
                'Sistolik alt alan (Asys), ejeksiyon başlangıcından dikrotik çentiğe kadar basınç integralidir. Aort empedansı (Zao) sabit kaldığı sürece SV ile doğrusal ilişkilidir.'}
              {anatomyFocus === 'notch' &&
                'Dikrotik çentik aort kapağının kapanma anını işaretler. Çentiğin keskin okunamaması (overdamped arter hattı veya ciddi aort yetmezliği) sistolik alan hesabını bozar.'}
              {anatomyFocus === 'diastole' &&
                'Diyastolik düşüş hızı (τ = R × C), arteriyel kompliyans ile sistemik vasküler direncin çarpımıdır. Septik vazoplejide hızla düşer ve kalibresiz algoritmaların kalibrasyon faktörünü (k) saptırır.'}
              {anatomyFocus === 'all' &&
                'Önemli fizik kuralı: Basınç sinyali ancak doğru sönümlenmiş bir arter hattında (fn > 15–20 Hz, ζ ≈ 0,64–0,70) güvenilir SV/PPV üretir. Aşırı sönümlü (overdamped) hat PPV’yi sahte düşük, az sönümlü (underdamped) hat sahte yüksek gösterebilir.'}
            </p>
          </div>

          {/* Right: Core Mathematical Equations & Ea_dyn */}
          <div className="lg:col-span-5 space-y-4">
            <div
              className={`rounded-xl border p-4 space-y-3 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Temel Hesaplama Denklemleri
              </div>

              <div className={`py-2.5 border-b font-mono tabular-nums text-xs sm:text-[13px] ${isDark ? 'border-slate-800 text-teal-300' : 'border-slate-100 text-teal-800'}`}>
                <div className="font-bold">SV = k · ( ∫ P(t) dt ) / Z₀</div>
                <div className={`mt-1 font-sans text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  k: hasta-özgü kalibrasyon/biyometri katsayısı · Z₀: karakteristik aort empedansı
                </div>
              </div>

              <div className={`py-2.5 border-b font-mono tabular-nums text-xs sm:text-[13px] ${isDark ? 'border-slate-800 text-amber-300' : 'border-slate-100 text-amber-800'}`}>
                <div className="font-bold">PPV (%) = [ (PPmax − PPmin) / PPmean ] × 100</div>
                <div className={`mt-1 font-sans text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Doğrudan arteriyel dalgadan okunur; ek algoritma veya kalibrasyon gerektirmez.
                </div>
              </div>

              <div className={`py-2.5 border-b font-mono tabular-nums text-xs sm:text-[13px] ${isDark ? 'border-slate-800 text-sky-300' : 'border-slate-100 text-sky-800'}`}>
                <div className="font-bold">SVV (%) = [ (SVmax − SVmin) / SVmean ] × 100</div>
                <div className={`mt-1 font-sans text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Nabız kontur algoritmasıyla hesaplanan atım hacimlerinin 20–30 sn penceredeki salınımıdır.
                </div>
              </div>

              <div className="pt-1 font-mono tabular-nums text-xs sm:text-[13px]">
                <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Ea<sub>dyn</sub> = PPV / SVV
                </div>
                <div className={`mt-1 font-sans text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  <strong>
                    Dinamik Arteriyel Elastans (Ea<sub>dyn</sub>)
                  </strong>
                  , sıvı yanıtlı bir hastada verdiğiniz sıvının{' '}
                  <strong>MAP’ı yükseltip yükseltmeyeceğini</strong> öngörür:
                </div>
                <ul className={`mt-2 space-y-1 font-sans text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <li>
                    <strong className="font-mono text-emerald-600 dark:text-emerald-400">
                      Ea<sub>dyn</sub> ≥ 0,8–1,0:
                    </strong>{' '}
                    Sıvı yüklemesi hem SV’yi hem de <strong>MAP’ı</strong> artırır.
                  </li>
                  <li>
                    <strong className="font-mono text-rose-600 dark:text-rose-400">
                      Ea<sub>dyn</sub> &lt; 0,8:
                    </strong>{' '}
                    Vazoplejik arteriyel yatak; sıvı SV’yi artırsa bile MAP düşük kalır — erken{' '}
                    <strong>vazopresör</strong> gerekir.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI KALP–AKCİĞER ETKİLEŞİMİ & FRANK–STARLİNG LABORATUVARI       */}
      {/* ===================================================================== */}
      <section id="pca-02" className="scroll-mt-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1.5">
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              02. Kalp–Akciğer Etkileşimi ve Frank–Starling Laboratuvarı
            </h2>
            <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Pozitif basınçlı her inspirasyon plevral basıncı artırarak sağ ventrikül (RV) venöz dönüşünü azaltır ve
              pulmoner transpulmoner basınçla RV art yükünü yükseltir. Bu düşüş <strong>2–3 kalp atımı</strong>{' '}
              (pulmoner transit süresi) sonra sol ventriküle ulaşarak ekspiryumda <strong>PPmin (dDown)</strong>{' '}
              oluşturur. Eğrinin dik kolundaysanız bu salınım büyür; platodaysanız sönümlenir.
            </p>
          </div>
        </div>

        {/* Clinical Scenario Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'hypovolemic', label: 'Hipovolemi (Dik Kol)' },
            { id: 'euvolemic', label: 'Övolemi (Plato)' },
            { id: 'ards_low_vt', label: 'ARDS (Düşük Vt = 6 mL/kg)' },
            { id: 'septic_vasoplegia', label: 'Septik Vazopleji (Düşük Ea_{dyn})' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as PresetId)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-teal-600 border-teal-500 text-white'
                    : 'bg-slate-900 border-slate-900 text-white'
                  : isDark
                    ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <MedicalText text={preset.label} />
            </button>
          ))}
        </div>

        {/* Two-Zone Sandbox Layout (65% Stage / 35% Control & Interpretation Deck) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT STAGE: Synchronized Paw + ABP Trace AND Starling Curve */}
          <div
            className={`lg:col-span-8 rounded-xl border p-4 sm:p-5 space-y-5 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            {/* Graph A: Ventilator Paw + Arterial Trace */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Senkron Hava Yolu Basıncı (Paw) ve Arteriyel Dalga (ABP)
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  PPmax {phys.ppMax} mmHg · PPmin {phys.ppMin} mmHg · MAP ~{phys.meanMap} mmHg
                </span>
              </div>

              <svg
                viewBox="0 0 560 232"
                className="w-full h-auto"
                role="img"
                aria-label="Pozitif basınçlı ventilasyon ve arteriyel nabız basıncı salınımı simülasyonu"
              >
                {/* Inspiration shading for cycle 1 & 2 */}
                <rect
                  x="28"
                  y="24"
                  width="102"
                  height="196"
                  fill={isDark ? '#0ea5e9' : '#0284c7'}
                  fillOpacity="0.08"
                />
                <rect
                  x="285"
                  y="24"
                  width="102"
                  height="196"
                  fill={isDark ? '#0ea5e9' : '#0284c7'}
                  fillOpacity="0.08"
                />
                <text x="79" y="18" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={isDark ? '#7dd3fc' : '#0369a1'}>
                  İnspirasyon (Ppl ↑)
                </text>
                <text x="206" y="18" textAnchor="middle" fontSize="9.5" fill={isDark ? '#64748b' : '#64748b'}>
                  Ekspirasyon
                </text>
                <text x="336" y="18" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={isDark ? '#7dd3fc' : '#0369a1'}>
                  İnspirasyon (Ppl ↑)
                </text>
                <text x="462" y="18" textAnchor="middle" fontSize="9.5" fill={isDark ? '#64748b' : '#64748b'}>
                  Ekspirasyon
                </text>

                {/* Divider between Paw and ABP */}
                <line
                  x1="28"
                  y1="92"
                  x2="542"
                  y2="92"
                  stroke={isDark ? '#1e293b' : '#e2e8f0'}
                  strokeWidth="1"
                />

                {/* Paw baseline & label */}
                <text x="24" y="54" textAnchor="end" fontSize="9.5" fontFamily="ui-monospace, monospace" fill={isDark ? '#7dd3fc' : '#0369a1'}>
                  Paw
                </text>
                <path
                  d={waveformSvg.pawPath}
                  fill="none"
                  stroke={isDark ? '#38bdf8' : '#0284c7'}
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />

                {/* ABP trace */}
                <text x="24" y="160" textAnchor="end" fontSize="9.5" fontFamily="ui-monospace, monospace" fill={isDark ? '#fda4af' : '#be123c'}>
                  ABP
                </text>
                <path
                  d={waveformSvg.abpPath}
                  fill="none"
                  stroke={isDark ? '#fb7185' : '#e11d48'}
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />

                {/* PPmax & PPmin markers on cycle 1 */}
                <circle cx={waveformSvg.maxPeak.x} cy={waveformSvg.maxPeak.y} r="4" fill="#10b981" />
                <text
                  x={waveformSvg.maxPeak.x}
                  y={Math.max(103, waveformSvg.maxPeak.y - 8)}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="ui-monospace, monospace"
                  fill={isDark ? '#34d399' : '#047857'}
                >
                  PPmax (dUp)
                </text>

                <circle cx={waveformSvg.minPeak.x} cy={waveformSvg.minPeak.y} r="4" fill="#f59e0b" />
                <text
                  x={waveformSvg.minPeak.x}
                  y={Math.max(112, waveformSvg.minPeak.y - 8)}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="ui-monospace, monospace"
                  fill={isDark ? '#fbbf24' : '#b45309'}
                >
                  PPmin (dDown)
                </text>
              </svg>
            </div>

            {/* Graph B: Live Frank-Starling Operating Point */}
            <div className={`pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Frank–Starling Eğrisi Üzerindeki Canlı Çalışma Noktası
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  SV {Math.round(phys.svMean)} mL ({Math.round(phys.svMin)}–{Math.round(phys.svMax)} mL) · Gerçek Eğim Kazancı: +{phys.trueSlopeGain.toFixed(0)}%
                </span>
              </div>

              <svg
                viewBox="0 0 560 205"
                className="w-full h-auto"
                role="img"
                aria-label="Frank-Starling eğrisi üzerinde ön yük ve atım hacmi salınımı"
              >
                {/* Steep vs Plateau region background hints */}
                <rect
                  x="56"
                  y="24"
                  width="210"
                  height="152"
                  fill={isDark ? '#10b981' : '#059669'}
                  fillOpacity="0.06"
                />
                <rect
                  x="266"
                  y="24"
                  width="258"
                  height="152"
                  fill={isDark ? '#64748b' : '#94a3b8'}
                  fillOpacity="0.06"
                />
                <text x="160" y="38" textAnchor="middle" fontSize="10" fontWeight="600" fill={isDark ? '#34d399' : '#047857'}>
                  Ön Yüke Bağımlı Dik Kol (Sıvı Yanıtlı)
                </text>
                <text x="395" y="38" textAnchor="middle" fontSize="10" fontWeight="600" fill={isDark ? '#94a3b8' : '#64748b'}>
                  Plato Fazı (Sıvı Yanıtsız · Ödem Riski)
                </text>

                {/* Axes */}
                <line x1="56" y1="24" x2="56" y2="176" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.4" />
                <line x1="56" y1="176" x2="528" y2="176" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.4" />
                <text
                  x="20"
                  y="102"
                  transform="rotate(-90 20 102)"
                  textAnchor="middle"
                  fontSize="10"
                  fill={isDark ? '#94a3b8' : '#64748b'}
                >
                  Atım Hacmi (SV, mL)
                </text>
                <text x="292" y="196" textAnchor="middle" fontSize="10" fill={isDark ? '#94a3b8' : '#64748b'}>
                  Ventriküler Ön Yük (LVEDV / Preload)
                </text>

                {/* Starling Curve */}
                <path
                  d={starlingSvg.curvePath}
                  fill="none"
                  stroke={isDark ? '#2dd4bf' : '#0f766e'}
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />

                {/* Respiratory Preload Swing projection box (ΔPreload -> ΔSV) */}
                <rect
                  x={starlingSvg.lowX}
                  y={starlingSvg.highY}
                  width={Math.max(4, starlingSvg.highX - starlingSvg.lowX)}
                  height={Math.max(4, starlingSvg.lowY - starlingSvg.highY)}
                  fill="#f59e0b"
                  fillOpacity="0.22"
                  stroke="#f59e0b"
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                />

                {/* Horizontal ΔSV projection to Y-axis */}
                <line x1="56" y1={starlingSvg.highY} x2={starlingSvg.highX} y2={starlingSvg.highY} stroke="#f59e0b" strokeDasharray="2 3" strokeWidth="1" />
                <line x1="56" y1={starlingSvg.lowY} x2={starlingSvg.lowX} y2={starlingSvg.lowY} stroke="#f59e0b" strokeDasharray="2 3" strokeWidth="1" />
                <line x1="52" y1={starlingSvg.highY} x2="52" y2={starlingSvg.lowY} stroke="#f59e0b" strokeWidth="3" />
                <text
                  x="48"
                  y={(starlingSvg.highY + starlingSvg.lowY) / 2 + 3}
                  textAnchor="end"
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="ui-monospace, monospace"
                  fill={isDark ? '#fbbf24' : '#b45309'}
                >
                  ΔSV
                </text>

                {/* Vertical ΔPreload projection to X-axis */}
                <line x1={starlingSvg.lowX} y1={starlingSvg.lowY} x2={starlingSvg.lowX} y2="176" stroke="#38bdf8" strokeDasharray="2 3" strokeWidth="1" />
                <line x1={starlingSvg.highX} y1={starlingSvg.highY} x2={starlingSvg.highX} y2="176" stroke="#38bdf8" strokeDasharray="2 3" strokeWidth="1" />
                <line x1={starlingSvg.lowX} y1="180" x2={starlingSvg.highX} y2="180" stroke="#38bdf8" strokeWidth="3" />

                {/* Live operating dot */}
                <circle
                  cx={starlingSvg.currX}
                  cy={starlingSvg.currY}
                  r="6"
                  fill={isDark ? '#0f172a' : '#ffffff'}
                  stroke="#f59e0b"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT DECK: Parameter Sliders + Live Quantitative Telemetry Readout */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className={`rounded-xl border p-4 space-y-4 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Sliders className="w-4 h-4 text-teal-500" />
                <span>Fizyolojik Parametre Kontrolü</span>
              </div>

              {/* Slider 1: Preload */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="pca-preload" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Ön Yük Konumu (Preload)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-teal-600 dark:text-teal-400">
                    %{preload}
                  </span>
                </div>
                <input
                  id="pca-preload"
                  type="range"
                  min={15}
                  max={92}
                  step={1}
                  value={preload}
                  onChange={(e) => {
                    setPreload(Number(e.target.value));
                  }}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Hipovolemi (Dik kol)</span>
                  <span>Hipervolemi (Plato)</span>
                </div>
              </div>

              {/* Slider 2: Tidal Volume */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="pca-vt" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Tidal Volüm (Vt)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-sky-600 dark:text-sky-400">
                    {tidalVolume.toFixed(1)} mL/kg PBW
                  </span>
                </div>
                <input
                  id="pca-vt"
                  type="range"
                  min={5}
                  max={10}
                  step={0.5}
                  value={tidalVolume}
                  onChange={(e) => setTidalVolume(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>5 mL/kg (Koruyucu)</span>
                  <span>8 mL/kg (Standart)</span>
                  <span>10 mL/kg</span>
                </div>
              </div>

              {/* Slider 3: Vascular Tone */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="pca-tone" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Arteriyel Tonus (SVR / Elastans)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400">
                    {vascularTone < 0.82 ? 'Vazoplejik' : vascularTone > 1.18 ? 'Vazokonst.' : 'Normal'} ({vascularTone.toFixed(2)}×)
                  </span>
                </div>
                <input
                  id="pca-tone"
                  type="range"
                  min={0.65}
                  max={1.35}
                  step={0.05}
                  value={vascularTone}
                  onChange={(e) => setVascularTone(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Septik Vazopleji</span>
                  <span>Normal</span>
                  <span>Yüksek SVR</span>
                </div>
              </div>
            </div>

            {/* Live Quantitative Output Panel */}
            <div
              className={`rounded-xl border p-4 space-y-3 ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">PPV</div>
                  <div
                    className={`mt-0.5 text-xl font-mono font-bold tabular-nums ${
                      phys.zone === 'high'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : phys.zone === 'gray'
                          ? 'text-amber-600 dark:text-amber-400'
                          : isDark
                            ? 'text-slate-200'
                            : 'text-slate-800'
                    }`}
                  >
                    %{phys.ppv.toFixed(1)}
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">SVV</div>
                  <div className={`mt-0.5 text-xl font-mono font-bold tabular-nums ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
                    %{phys.svv.toFixed(1)}
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    Ea<sub>dyn</sub>
                  </div>
                  <div
                    className={`mt-0.5 text-xl font-mono font-bold tabular-nums ${
                      phys.lowEaDynWarning ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'
                    }`}
                  >
                    {phys.eaDyn.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Explicit Dual-Coded Clinical Decision */}
              <div
                className={`p-3 rounded-lg border text-xs leading-relaxed space-y-1.5 ${
                  phys.lowVtMasking
                    ? isDark
                      ? 'bg-amber-950/35 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                    : phys.zone === 'high'
                      ? isDark
                        ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : phys.zone === 'gray'
                        ? isDark
                          ? 'bg-amber-950/30 border-amber-500/35 text-amber-200'
                          : 'bg-amber-50 border-amber-300 text-amber-900'
                        : isDark
                          ? 'bg-slate-950/70 border-slate-700 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {phys.lowVtMasking ? (
                    <>
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                      <span>Düşük Vt Maskelemesi (Yanlış Negatif Riski)</span>
                    </>
                  ) : phys.zone === 'high' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Sıvı Yanıtlı Bölge (PPV &gt; %13)</span>
                    </>
                  ) : phys.zone === 'gray' ? (
                    <>
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                      <span>Gri Bölge (%9–%13) — Tek Başına Karar Verme</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-4 h-4 shrink-0 text-slate-400" />
                      <span>Plato / Sıvı Yanıtsız Bölge (PPV &lt; %9)</span>
                    </>
                  )}
                </div>

                <p>
                  {phys.lowVtMasking
                    ? `Hasta aslında Frank–Starling dik kolunda (+%${phys.trueSlopeGain.toFixed(0)} SV potansiyeli), ancak Vt = ${tidalVolume.toFixed(1)} mL/kg plevral basınç dalgasını küçülttüğü için PPV %${phys.ppv.toFixed(1)} görünüyor. 1 dk Tidal Volüm Yüklemesi (6 → 8 mL/kg) uygulayın.`
                    : phys.zone === 'high'
                      ? 'Ön koşullar tam ve RV sağlamsa 250 mL dengeli kristaloid bolusu ile SV’de ≥ %10–15 artış beklenir.'
                      : phys.zone === 'gray'
                        ? 'Hastaların yaklaşık %25’i bu banttadır. Körlemesine sıvı yerine PLR, Tidal Volüm Yüklemesi veya 100 mL mini yükleme ile yanıtı doğrulayın.'
                        : 'Kalp platonun üzerinde çalışıyor. Ek sıvı bolusu debiyi artırmaz; pulmoner ve interstisyel ödem riskini yükseltir. Hipotansiyon sürüyorsa vazopresör veya inotrop değerlendirin.'}
                </p>

                {phys.lowEaDynWarning && (
                  <p className="pt-1.5 border-t border-current/15 font-medium">
                    <strong>
                      Vazopleji Uyarısı (Ea<sub>dyn</sub> = {phys.eaDyn.toFixed(2)} &lt; 0,80):
                    </strong>{' '}
                    Hasta ön yüke yanıtlı olsa bile arteriyel tonus düşük olduğu için tek başına sıvı MAP’ı hedefe çıkarmayabilir —{' '}
                    noradrenalin desteği planlayın.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 03. GEÇERLİLİK ÖN KOŞULLARI VE TUZAK ANALİZİ                          */}
      {/* ===================================================================== */}
      <section id="pca-03" className="scroll-mt-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1.5">
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              03. Yatak Başı Geçerlilik Denetleyicisi: 8 Temel Ön Koşul
            </h2>
            <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Ameliyathane ve yoğun bakım hastalarının önemli bir bölümünde PPV/SVV ön koşullarından en az biri
              eksiktir. Aşağıda hastanızda <strong>sağlanmayan</strong> koşulları kapatarak yanlış pozitif veya yanlış
              negatif mekanizmasını ve doğru kurtarma testini anında görün.
            </p>
          </div>
          {failedPrereqs.length > 0 && (
            <button
              type="button"
              onClick={resetPrereqs}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tümünü Sağlandı Yap</span>
            </button>
          )}
        </div>

        {/* Live Verdict Banner */}
        <div
          className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            checkerSummary.status === 'valid'
              ? isDark
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : checkerSummary.status === 'false_positive' || checkerSummary.status === 'invalid'
                ? isDark
                  ? 'bg-rose-950/35 border-rose-500/40 text-rose-200'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
                : isDark
                  ? 'bg-amber-950/35 border-amber-500/40 text-amber-200'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          <div className="space-y-1">
            <div className="text-sm font-bold flex items-center gap-2">
              {checkerSummary.status === 'valid' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : checkerSummary.status === 'false_negative' ? (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
              )}
              <span>{checkerSummary.title}</span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">{checkerSummary.detail}</p>
          </div>
          <div className="font-mono tabular-nums text-xs font-bold whitespace-nowrap shrink-0">
            {PREREQUISITES.length - failedPrereqs.length} / {PREREQUISITES.length} Uygun
          </div>
        </div>

        {/* 8 Interactive Condition Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PREREQUISITES.map((item) => {
            const isMet = metPrereqs[item.id];
            return (
              <div
                key={item.id}
                className={`rounded-xl border p-3.5 transition-colors ${
                  isMet
                    ? isDark
                      ? 'bg-slate-900/50 border-slate-800'
                      : 'bg-white border-slate-200'
                    : item.failureType === 'false_negative'
                      ? isDark
                        ? 'bg-amber-950/25 border-amber-500/40'
                        : 'bg-amber-50/70 border-amber-300'
                      : isDark
                        ? 'bg-rose-950/25 border-rose-500/40'
                        : 'bg-rose-50/70 border-rose-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.requirement}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setMetPrereqs((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                    }
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                      isMet
                        ? isDark
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                        : item.failureType === 'false_negative'
                          ? isDark
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                            : 'bg-amber-100 border-amber-400 text-amber-900'
                          : isDark
                            ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                            : 'bg-rose-100 border-rose-400 text-rose-900'
                    }`}
                  >
                    {isMet ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Sağlandı</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{item.failureLabel}</span>
                      </>
                    )}
                  </button>
                </div>

                {!isMet && (
                  <div
                    className={`mt-3 pt-2.5 border-t text-xs space-y-1.5 leading-relaxed ${
                      isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <p>
                      <strong>Mekanizma:</strong> {item.mechanism}
                    </p>
                    <p className="text-teal-700 dark:text-teal-300 font-medium">
                      <strong>Alternatif / Kurtarma:</strong> {item.rescue}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. GRİ BÖLGE (%9–%13) VE FONKSİYONEL HEMODİNAMİK TESTLER             */}
      {/* ===================================================================== */}
      <section id="pca-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. “Gri Bölge” (%9–%13) Yaklaşımı ve Fonksiyonel Kurtarma Testleri
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Cannesson ve ark. (<em>Anesthesiology</em> 2011) çok merkezli çalışmasında, tek bir keskin eşik (%12 veya
            %13) kullanmanın hastaların yaklaşık <strong>%25’inde</strong> belirsiz sonuç verdiğini göstermiştir.
            Karar ikili değil, üç bölgeli okunmalıdır:
          </p>
        </div>

        {/* Quantitative Gray Zone Scale Bar */}
        <div
          className={`rounded-xl border p-4 sm:p-5 space-y-3 ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={`p-3.5 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="font-mono tabular-nums text-lg font-bold text-slate-700 dark:text-slate-200">
                PPV &lt; %9
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Sıvı Yanıtsız (Düşük Olasılık)
              </div>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Ön koşullar tam ise sıvı yüklemesi yarar sağlamaz; hipotansiyonda vazopresör veya miyokardiyal değerlendirme önceliklidir.
              </p>
            </div>

            <div className={`p-3.5 rounded-lg border ${isDark ? 'bg-amber-950/30 border-amber-500/40' : 'bg-amber-50 border-amber-300'}`}>
              <div className="font-mono tabular-nums text-lg font-bold text-amber-700 dark:text-amber-300">
                %9 ≤ PPV ≤ %13
              </div>
              <div className="text-xs font-semibold text-amber-800 dark:text-amber-200 mt-0.5">
                Gri Bölge (~%25 Hasta · Belirsiz)
              </div>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-amber-100/80' : 'text-amber-950/80'}`}>
                Yalnızca PPV/SVV rakamına bakarak sıvı verilmez veya reddedilmez. Aşağıdaki 4 fonksiyonel testten klinik duruma uyan seçilir.
              </p>
            </div>

            <div className={`p-3.5 rounded-lg border ${isDark ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-emerald-50 border-emerald-300'}`}>
              <div className="font-mono tabular-nums text-lg font-bold text-emerald-700 dark:text-emerald-300">
                PPV &gt; %13
              </div>
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-200 mt-0.5">
                Sıvı Yanıtlı (Yüksek Olasılık)
              </div>
              <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-emerald-100/80' : 'text-emerald-950/80'}`}>
                RV yetmezliği ve yüksek İAB dışlandıktan sonra 250 mL bolus verilip SV yanıtı (≥ %10) teyit edilir.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Functional Hemodynamic Maneuvers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: 'A',
              name: 'Tidal Volüm Yüklemesi (TVC — Myatra 2017)',
              indication: 'Akciğer koruyucu ventilasyon (Vt = 6 mL/kg) altında düşük/gri PPV',
              protocol: 'Vt geçici olarak 1 dakika boyunca 6 → 8 mL/kg PBW düzeyine çıkarılır ve PPV/SVV değişimi ölçülür.',
              threshold: 'ΔPPV ≥ %3,5 (veya ΔSVV ≥ %2,5) mutlak artış → Sıvı yanıtlı',
              note: 'Sıvı vermeden yapılır; sinüs ritmi ve tam kontrollü ventilasyon gerektirir.',
            },
            {
              num: 'B',
              name: 'Pasif Bacak Kaldırma (PLR — Monnet 2016)',
              indication: 'AF, spontan solunum, düşük Vt veya açık toraks (en geniş endikasyon)',
              protocol: '45° yarı oturur pozisyondan gövde 0° düzeltilir, bacaklar 45° kaldırılır (~300 mL geri dönüşlü ototransfüzyon). 60–90 sn içinde pik yanıt okunur.',
              threshold: 'Gerçek zamanlı SV / CO artışı ≥ %10 → Sıvı yanıtlı',
              note: 'Sadece kan basıncıyla (MAP) değil mutlaka doğrudan SV/CO veya EtCO₂ (≥ %5) ile izlenmelidir; ağır İAH’de yanlış negatif olabilir.',
            },
            {
              num: 'C',
              name: 'Ekspiryum Sonu Oklüzyon Testi (EEOT)',
              indication: 'Mekanik ventilatörde AF’li veya ARDS’li hastalar (ameliyathanede bacak kaldırılamıyorsa)',
              protocol: '15 saniye süreyle ekspiryum sonu ventilatör duraklatması uygulanarak pozitif basınçlı venöz dönüş freni geçici kaldırılır.',
              threshold: 'Son 5 saniyede nabız kontur CO / SV artışı ≥ %5 → Sıvı yanıtlı',
              note: 'Spontan tetikleme yapan veya 15 sn apneyi tolere edemeyen derin hipoksemik hastalarda uygulanamaz.',
            },
            {
              num: 'D',
              name: 'Mini Sıvı Yüklemesi (Mini-Fluid Challenge)',
              indication: 'Diğer manevraların cerrahi pozisyon nedeniyle yapılamadığı durumlar',
              protocol: 'Yalnızca 100 mL dengeli kristaloid 1 dakikada hızlı IV verilir ve yüksek hassasiyetli SV / LVOT-VTI değişimi ölçülür.',
              threshold: 'SV veya VTI artışı ≥ %6–10 → Ek 250–400 mL bolusa devam',
              note: 'Küçük hacimle test ettiği için sıvı yüklenme zararını sınırlar; ancak ölçüm cihazının hassasiyeti yüksek olmalıdır.',
            },
          ].map((test) => (
            <div
              key={test.num}
              className={`rounded-xl border p-4 space-y-2.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {test.num}. {test.name}
                </h3>
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <strong>Ne zaman:</strong> {test.indication}
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {test.protocol}
              </p>
              <div
                className={`pt-2 border-t text-xs font-mono tabular-nums font-bold ${
                  isDark ? 'border-slate-800 text-teal-300' : 'border-slate-100 text-teal-800'
                }`}
              >
                Eşik: {test.threshold}
              </div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {test.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. TEKNOLOJİ PLATFORMLARI, GDT AKIŞI VE LİTERATÜR                    */}
      {/* ===================================================================== */}
      <section id="pca-05" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            05. Nabız Kontur Platformları ve Hedefe Yönelik Tedavi (GDT) Akışı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Klinikteki tüm nabız dalga analiz sistemleri aynı basıncı okur ancak aortik empedans ve kompliyans
            tahmininde üç farklı mühendislik yaklaşımına ayrılır (Saugel &amp; Kouz, 2021).
          </p>
        </div>

        {/* Comparison Table */}
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'border-slate-800 bg-slate-900/80 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-3 px-4 font-semibold">Sınıf ve Örnek Sistemler</th>
                <th className="py-3 px-4 font-semibold">Çalışma Prensibi</th>
                <th className="py-3 px-4 font-semibold">Güçlü Yönler</th>
                <th className="py-3 px-4 font-semibold">Kısıtlılıklar</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {PLATFORM_ROWS.map((row) => (
                <tr key={row.className} className="align-top">
                  <td className="py-3.5 px-4 min-w-[190px]">
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.className}</div>
                    <div className="mt-1 font-mono text-[11px] text-teal-600 dark:text-teal-400">{row.devices}</div>
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed min-w-[220px]">{row.principle}</td>
                  <td className="py-3.5 px-4 leading-relaxed min-w-[220px]">{row.strengths}</td>
                  <td className="py-3.5 px-4 leading-relaxed min-w-[220px]">{row.limits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4-Step GDT Bedside Sequence */}
        <div
          className={`rounded-xl border p-4 sm:p-5 space-y-4 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Yatak Başı 4 Adımlı GDT Karar Dizisi (Unutmayın: “Sıvı Yanıtlı Olmak ≠ Sıvı İhtiyacı Olmak”)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                step: 'Adım 1 · Klinik Endikasyon',
                body: 'Önce doku hipoperfüzyonu var mı sorusunu yanıtlayın (MAP düşüşü, laktat ↑, oligüri, kapiller dolum uzaması). Stabil sağlıklı hastada sırf PPV = %15 diye sıvı verilmez.',
              },
              {
                step: 'Adım 2 · Sinyal & Ön Koşul',
                body: 'Kare dalga (fast-flush) ile arter hattının aşırı/az sönümlü olmadığını ve 8 geçerlilik koşulunu (özellikle sinüs ritmi, Vt ≥ 8, sağlam RV) doğrulayın.',
              },
              {
                step: 'Adım 3 · Dinamik Test & Ea_{dyn}',
                body: 'PPV > %13 (veya gri bölgede pozitif TVC/PLR) ise 250 mL dengeli kristaloid bolusu verin. Ea_{dyn} < 0,80 ise eş zamanlı vazopresör titrasyonu ekleyin.',
              },
              {
                step: 'Adım 4 · Yanıtı Teyit Et & Dur',
                body: 'Bolus sonrası SV ≥ %10 artıyor ve PPV düşüyorsa yanıt pozitiftir. SV artışı < %10’a indiğinde (plato) sıvı yüklemeyi derhal durdurun.',
              },
            ].map((s, idx) => (
              <div
                key={s.step}
                className={`p-3.5 rounded-lg border flex flex-col justify-between gap-2 ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center justify-between gap-1">
                    <span>
                      <MedicalText text={s.step} />
                    </span>
                    {idx < 3 && <ArrowRight className="w-3.5 h-3.5 opacity-40 hidden lg:block" />}
                  </div>
                  <p className={`mt-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <MedicalText text={s.body} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Literature References */}
        <footer
          className={`pt-4 border-t space-y-3 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div className={`flex items-center gap-2 text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <BookOpen className="w-4 h-4 text-teal-500" />
            <span>Temel Literatür ve Referanslar</span>
          </div>
          <ol className="space-y-2 text-xs leading-relaxed">
            {REFERENCES.map((ref, idx) => (
              <li key={ref.title} className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                <span className="font-mono font-semibold text-slate-500 mr-1.5">{idx + 1}.</span>
                <span className={isDark ? 'text-slate-300' : 'text-slate-800'}>{ref.authors}</span>{' '}
                <em>{ref.title}</em> {ref.journal}{' '}
                {ref.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-mono font-semibold text-teal-600 dark:text-teal-400 hover:underline ml-1"
                  >
                    <span>PMID: {ref.pmid}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </footer>
      </section>
    </div>
  );
};
