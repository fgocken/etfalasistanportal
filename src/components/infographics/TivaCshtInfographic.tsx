import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  Info,
  Layers,
  RotateCcw,
  Sliders,
  TrendingUp
} from 'lucide-react';

interface TivaCshtInfographicProps {
  isDark: boolean;
}

type CurveMetricMode = 'csht50' | 'decrement80';
type PatientModifierId = 'standard' | 'elderly' | 'obese' | 'low-co';
type CompartmentStageId = 'early' | 'mid' | 'saturated';

interface DrugPkProfile {
  id: string;
  name: string;
  drugClass: string;
  colorHex: string;
  strokeDash?: string;
  terminalHalfLife: string;
  clearance: string;
  metabolism: string;
  tciModel: string;
  /** Time knots in minutes: [0, 30, 60, 120, 180, 240, 360, 480] */
  csht50Points: number[];
  /** Approximate 80% decrement time in minutes at same knots (Miller's / Bailey JM) */
  decrement80Points: number[];
  clinicalSummary: string;
  awakeningRule: string;
  statusTag: string;
  tone: 'emerald' | 'cyan' | 'sky' | 'amber' | 'orange' | 'rose' | 'violet';
}

const TIME_KNOTS_MIN = [0, 30, 60, 120, 180, 240, 360, 480];

const DRUG_PK_PROFILES: DrugPkProfile[] = [
  {
    id: 'remifentanil',
    name: 'Remifentanil',
    drugClass: 'Ultra-Kısa Etkili Opioid',
    colorHex: '#10b981',
    terminalHalfLife: '10–20 dk',
    clearance: '~40–60 mL/kg/dk (Çok Yüksek)',
    metabolism: 'Non-spesifik plazma & doku esterazları',
    tciModel: 'Minto (LBM bazlı)',
    csht50Points: [2.5, 3.0, 3.2, 3.5, 3.7, 3.8, 4.0, 4.0],
    decrement80Points: [5, 6, 7, 8, 8.5, 9, 9.5, 10],
    clinicalSummary:
      'Bağlamdan tamamen bağımsızdır (context-insensitive). 8 saatlik TIVA sonrası bile organ fonksiyonlarından bağımsız olarak 3–4 dk içinde yarılanır.',
    awakeningRule: 'İnfüzyon kesilince hızlı uyanma sağlar; ancak analjezi de dakikalar içinde kaybolduğu için ekstubasyon öncesi köprü analjezi şarttır.',
    statusTag: 'Bağlamdan Bağımsız',
    tone: 'emerald'
  },
  {
    id: 'propofol',
    name: 'Propofol',
    drugClass: 'IV Hipnotik (TIVA Temeli)',
    colorHex: '#06b6d4',
    terminalHalfLife: '4–24+ saat',
    clearance: '~25–35 mL/kg/dk (Hepatik + Ekstrahepatik)',
    metabolism: 'Hepatik glukuronidasyon/CYP2B6 + renal/akciğer klirensi',
    tciModel: 'Schnider / Marsh / Eleveld',
    csht50Points: [3, 7, 11, 16, 20, 25, 33, 40],
    decrement80Points: [7, 15, 24, 38, 52, 65, 88, 110],
    clinicalSummary:
      'Uzun terminal yarı ömrüne (4–24 sa) rağmen yüksek metabolik klirensi ve büyük V3 kompartmanı sayesinde CSHT 8 saatte bile ~40 dk civarında kalır.',
    awakeningRule: 'Dikkat: Uzun vakalarda uyanma için %50 değil %70–80 azalma (Decrement Time ~65–110 dk) gerekir; vaka sonu doz azaltılmazsa uyanma uzar.',
    statusTag: 'TIVA Altın Standardı',
    tone: 'cyan'
  },
  {
    id: 'sufentanil',
    name: 'Sufentanil',
    drugClass: 'Potent Lipofilik Opioid',
    colorHex: '#38bdf8',
    terminalHalfLife: '2.5–4 saat',
    clearance: '~12–15 mL/kg/dk (Yüksek Ekstraksiyon)',
    metabolism: 'Hepatik N-dealkilasyon & O-demetilasyon',
    tciModel: 'Gepts / Bovill',
    csht50Points: [5, 11, 17, 24, 28, 32, 42, 54],
    decrement80Points: [12, 24, 38, 58, 76, 95, 130, 165],
    clinicalSummary:
      'Klasik farmakokinetik paradoksu (Hughes 1992): Terminal yarı ömrü Alfentanilden uzun olmasına rağmen, ilk 6–8 saatlik infüzyonlarda CSHT değeri Alfentanilden KISADIR.',
    awakeningRule: '4 saate kadar orta-uzun vakalarda Fentanile kıyasla çok daha öngörülebilir uyanma sunar; 8+ saat sonrasında CSHT yükselmeye başlar.',
    statusTag: 'Fentanilden Üstün Profil',
    tone: 'sky'
  },
  {
    id: 'alfentanil',
    name: 'Alfentanil',
    drugClass: 'Kısa / Orta Etkili Opioid',
    colorHex: '#eab308',
    strokeDash: '6 3',
    terminalHalfLife: '1.5–2 saat',
    clearance: '~4–6 mL/kg/dk (Düşük-Orta)',
    metabolism: 'Hepatik CYP3A4',
    tciModel: 'Maitre / Scott',
    csht50Points: [10, 26, 40, 52, 56, 58, 60, 62],
    decrement80Points: [22, 55, 85, 115, 128, 135, 145, 152],
    clinicalSummary:
      'Düşük dağılım hacmi nedeniyle tek bolusta hızlı biter; ancak sürekli infüzyonda kompartmanları çabuk doyduğu için ~90 dk sonra ~58–60 dk platoya oturur.',
    awakeningRule: 'Kısa terminal yarı ömrüne aldanılmamalıdır: 1–4 saatlik infüzyonda Propofol ve Sufentanilden daha uzun CSHT sergiler.',
    statusTag: '60 dk Plato Eğrisi',
    tone: 'amber'
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    drugClass: 'Benzodiazepin (Sedatif)',
    colorHex: '#f97316',
    terminalHalfLife: '2–4 saat',
    clearance: '~6–9 mL/kg/dk',
    metabolism: 'Hepatik CYP3A4 → aktif 1-OH-midazolam',
    tciModel: 'Sabit İnfüzyon / Bolus',
    csht50Points: [14, 28, 40, 56, 68, 76, 86, 94],
    decrement80Points: [30, 65, 95, 140, 175, 205, 245, 275],
    clinicalSummary:
      'İnfüzyon süresi uzadıkça CSHT belirgin yükselir; böbrek yetmezliğinde aktif metabolit (1-hidroksimidazolam glukuronid) birikimi uyanmayı daha da geciktirir.',
    awakeningRule: 'Uzun vakalarda sürekli infüzyon olarak kullanılmamalı; gerekirse cerrahi sonuna yakın düşük doz kesilmelidir.',
    statusTag: 'Uzamış Sedasyon Riski',
    tone: 'orange'
  },
  {
    id: 'thiopental',
    name: 'Tiyopental',
    drugClass: 'Barbitürat (Referans Karşılaştırma)',
    colorHex: '#a855f7',
    strokeDash: '3 3',
    terminalHalfLife: '10–12 saat',
    clearance: '~3 mL/kg/dk (Kısıtlı Hepatik)',
    metabolism: 'Yavaş hepatik oksidasyon (yüksek dozda sıfır-derece kinetik)',
    tciModel: 'Sadece İndüksiyon / Özel Nörokoruma',
    csht50Points: [12, 42, 76, 118, 145, 168, 194, 212],
    decrement80Points: [30, 95, 165, 250, 310, 360, 410, 450],
    clinicalSummary:
      'Tek indüksiyon dozunda beyinden kas/yağa hızlı redistribüsyonla 5–10 dk içinde uyanılır; fakat infüzyon halinde CSHT saatler içinde 3+ saate fırlar.',
    awakeningRule: 'Redistribüsyon vs Eliminasyon farkını gösteren klasik ders kitabı örneğidir; TIVA idamesinde kullanılmaz.',
    statusTag: 'Yüksek Birikim (Referans)',
    tone: 'violet'
  },
  {
    id: 'fentanyl',
    name: 'Fentanil',
    drugClass: 'Yüksek Lipofilik Opioid',
    colorHex: '#f43f5e',
    terminalHalfLife: '3–7 saat',
    clearance: '~10–14 mL/kg/dk',
    metabolism: 'Hepatik CYP3A4 (inaktif norfentanil)',
    tciModel: 'Shafer / Scott',
    csht50Points: [8, 15, 24, 54, 112, 178, 255, 295],
    decrement80Points: [18, 35, 58, 130, 245, 340, 440, 500],
    clinicalSummary:
      'Kısa vakalarda (≤ 60 dk) düşük CSHT (~24 dk) ile hızlı derlenir; ancak 2–3 saatten sonra yağ/kas depoları doyar ve CSHT 4–5 saate eksponansiyel sıçrar!',
    awakeningRule: 'Klasik TIVA tuzağı: Uzun ameliyatlarda sürekli fentanil infüzyonu/yüksek kümülatif bolus sonrası Nalokson (~45 dk) bittiğinde re-narkotizasyon gelişebilir.',
    statusTag: 'Eksponansiyel CSHT Sıçraması',
    tone: 'rose'
  }
];

const DURATION_PRESETS = [
  { label: 'Kısa İşlem (45 dk)', minutes: 45 },
  { label: 'Orta Cerrahi (2 sa)', minutes: 120 },
  { label: 'Majör Cerrahi (4 sa)', minutes: 240 },
  { label: 'Uzun TIVA (6 sa)', minutes: 360 },
  { label: 'Ekstrem (8 sa)', minutes: 480 }
];

const PATIENT_MODIFIERS: Record<
  PatientModifierId,
  {
    label: string;
    multiplierPropofol: number;
    multiplierOpioid: number;
    title: string;
    note: string;
  }
> = {
  standard: {
    label: 'Standart Erişkin (ASA I–II)',
    multiplierPropofol: 1,
    multiplierOpioid: 1,
    title: 'Referans Erişkin Farmakokinetiği',
    note: 'Sağlıklı 70 kg erişkinde Hughes et al. (1992) multikompartman model tahminleri.'
  },
  elderly: {
    label: 'İleri Yaş (> 70 yaş)',
    multiplierPropofol: 1.35,
    multiplierOpioid: 1.35,
    title: 'Azalmış Santral Kompartman (V1) & Hepatik Klirens',
    note: 'Yaşlılarda kardiyak debi ve hepatik kan akımı düşer; beyin duyarlılığı artar. Remifentanil hariç Propofol/Fentanil/Midazolam uyanma süreleri %30–40+ uzar; TIVA hedefi (Ce) %25–50 düşürülmelidir.'
  },
  obese: {
    label: 'Morbid Obezite (BMI > 35)',
    multiplierPropofol: 1.4,
    multiplierOpioid: 1.45,
    title: 'Genişlemiş Yağ Kompartmanı (V3) & Yavaş Geri-Akım',
    note: 'Lipofilik ajanlar (Propofol, Fentanil, Midazolam) total vücut ağırlığına (TBW) göre verilirse V3 deposunda dev birikim oluşur. Remifentanil LBW, Propofol indüksiyonu LBW/ABW ve idamesi BIS/ABW ile yönetilmelidir.'
  },
  'low-co': {
    label: 'Hipotermi / Düşük Kalp Debisi',
    multiplierPropofol: 1.5,
    multiplierOpioid: 1.45,
    title: 'Hepatik Hipoperfüzyon & Enzimatik Yavaşlama',
    note: 'Kor sıcaklığı < 35°C veya düşük kardiyak debide karaciğer klirensi ve doku perfüzyonu düşer; Propofol ve Fentanil CSHT değeri %40–50+ uzar (Remifentanil esterazları dahi hafif yavaşlayabilir).'
  }
};

const COMPARTMENT_STAGES: {
  id: CompartmentStageId;
  title: string;
  durationBadge: string;
  v1Level: number;
  v2Level: number;
  v3Level: number;
  flowLabel: string;
  explanation: string;
}[] = [
  {
    id: 'early',
    title: '1. Erken Dönem (Redistribüsyon Hâkim)',
    durationBadge: '0 – 45 dk',
    v1Level: 85,
    v2Level: 35,
    v3Level: 10,
    flowLabel: 'V1 → V2 & V3 Hızlı Emici Dağılım',
    explanation:
      'İlaç santral kompartmandan (kan/beyin, V1) hızla kas (V2) ve yağ dokusuna (V3) dağılır. İnfüzyon kesilince plazma düzeyi hemen düşer; Fentanil ve Tiyopental bile bu evrede hızlı biter.'
  },
  {
    id: 'mid',
    title: '2. Orta Dönem (V2 Doygunluğu Başlar)',
    durationBadge: '1 – 3 saat',
    v1Level: 85,
    v2Level: 82,
    v3Level: 45,
    flowLabel: 'V2 Doldu · V3 Hâlâ Aktif · Klirens Önem Kazanır',
    explanation:
      'İyi kanlanan kas kompartmanı (V2) plazmayla dengeye yaklaşır. Bu noktadan sonra uyanma hızını yağ dokusu kapasitesi (V3) ve karaciğer/plazma eliminasyon hızı belirler.'
  },
  {
    id: 'saturated',
    title: '3. Uzun İnfüzyon (V3 Doygunluğu & CSHT Sıçraması)',
    durationBadge: '4 – 8+ saat',
    v1Level: 85,
    v2Level: 85,
    v3Level: 82,
    flowLabel: 'V3 + V2 → V1 Geri Akım (Eliminasyona Bağımlı Offset)',
    explanation:
      'Derin doku (V3) doyduğunda infüzyon kapatılsa dahi V2 ve V3’ten kana sürekli ilaç geri sızar. Fentanil ve Tiyopentalde CSHT eksponansiyel uzar; sadece Remifentanil (esteraz) ve Propofol (yüksek klirens) kısa kalır.'
  }
];

function interpolateValue(points: number[], minutes: number): number {
  if (minutes <= TIME_KNOTS_MIN[0]) return points[0];
  if (minutes >= TIME_KNOTS_MIN[TIME_KNOTS_MIN.length - 1]) return points[points.length - 1];

  for (let i = 0; i < TIME_KNOTS_MIN.length - 1; i++) {
    const t0 = TIME_KNOTS_MIN[i];
    const t1 = TIME_KNOTS_MIN[i + 1];
    if (minutes >= t0 && minutes <= t1) {
      const ratio = (minutes - t0) / (t1 - t0);
      return points[i] + ratio * (points[i + 1] - points[i]);
    }
  }
  return points[points.length - 1];
}

function formatDurationLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} dk`;
  if (m === 0) return `${h} saat`;
  return `${h} sa ${m} dk`;
}

export const TivaCshtInfographic: React.FC<TivaCshtInfographicProps> = ({ isDark }) => {
  const [durationMinutes, setDurationMinutes] = useState<number>(240);
  const [metricMode, setMetricMode] = useState<CurveMetricMode>('csht50');
  const [patientModifier, setPatientModifier] = useState<PatientModifierId>('standard');
  const [selectedDrugId, setSelectedDrugId] = useState<string>('fentanyl');
  const [hiddenDrugIds, setHiddenDrugIds] = useState<string[]>([]);
  const [compartmentStage, setCompartmentStage] = useState<CompartmentStageId>('saturated');

  const modifier = PATIENT_MODIFIERS[patientModifier];
  const yMax = metricMode === 'csht50' ? 320 : 520;
  const yTicks = metricMode === 'csht50' ? [0, 60, 120, 180, 240, 300] : [0, 100, 200, 300, 400, 500];

  // SVG Coordinate System
  const padLeft = 54;
  const padRight = 20;
  const padTop = 18;
  const padBottom = 34;
  const svgWidth = 680;
  const svgHeight = 310;
  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const toX = (min: number) => padLeft + (min / 480) * plotW;
  const toY = (val: number) => padTop + plotH - Math.min(val / yMax, 1) * plotH;

  const toggleDrugVisibility = (id: string) => {
    setHiddenDrugIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= DRUG_PK_PROFILES.length - 1) return prev;
      return [...prev, id];
    });
  };

  const getAdjustedValue = (drug: DrugPkProfile, baseMinutes: number): number => {
    const rawPoints = metricMode === 'csht50' ? drug.csht50Points : drug.decrement80Points;
    const raw = interpolateValue(rawPoints, baseMinutes);
    if (drug.id === 'remifentanil') {
      return patientModifier === 'low-co' ? Number((raw * 1.15).toFixed(1)) : Number(raw.toFixed(1));
    }
    const mult = drug.id === 'propofol' || drug.id === 'thiopental' || drug.id === 'midazolam'
      ? modifier.multiplierPropofol
      : modifier.multiplierOpioid;
    return Math.round(raw * mult);
  };

  const rankedSnapshot = useMemo(() => {
    return DRUG_PK_PROFILES.filter((d) => !hiddenDrugIds.includes(d.id))
      .map((drug) => {
        const cshtVal = getAdjustedValue(drug, durationMinutes);
        const rawCsht50 = interpolateValue(drug.csht50Points, durationMinutes);
        const rawDec80 = interpolateValue(drug.decrement80Points, durationMinutes);
        const mult =
          drug.id === 'remifentanil'
            ? patientModifier === 'low-co'
              ? 1.15
              : 1
            : drug.id === 'propofol' || drug.id === 'thiopental' || drug.id === 'midazolam'
              ? modifier.multiplierPropofol
              : modifier.multiplierOpioid;

        return {
          drug,
          activeMetricValue: cshtVal,
          csht50: drug.id === 'remifentanil' ? Number((rawCsht50 * mult).toFixed(1)) : Math.round(rawCsht50 * mult),
          dec80: drug.id === 'remifentanil' ? Number((rawDec80 * mult).toFixed(1)) : Math.round(rawDec80 * mult)
        };
      })
      .sort((a, b) => a.activeMetricValue - b.activeMetricValue);
  }, [durationMinutes, metricMode, patientModifier, hiddenDrugIds]);

  const focusedDrug = DRUG_PK_PROFILES.find((d) => d.id === selectedDrugId) || DRUG_PK_PROFILES[0];
  const focusedSnapshot = rankedSnapshot.find((r) => r.drug.id === focusedDrug.id);
  const currentCompartment = COMPARTMENT_STAGES.find((s) => s.id === compartmentStage) || COMPARTMENT_STAGES[2];

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    const clampedX = Math.max(padLeft, Math.min(padLeft + plotW, relX));
    const minutes = Math.round((((clampedX - padLeft) / plotW) * 480) / 15) * 15;
    setDurationMinutes(Math.max(15, Math.min(480, minutes)));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Başlık Bandı */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/25 border-cyan-500/30'
            : 'bg-gradient-to-r from-cyan-50/70 via-white to-slate-50 border-cyan-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                TIVA Farmakokinetiği
              </span>
              <span aria-hidden="true">·</span>
              <span>Hughes, Glass &amp; Jacobs (1992)</span>
              <span aria-hidden="true">·</span>
              <span>Miller’s Anesthesia &amp; Morgan-Mikhail</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
              Bağlama Duyarlı Yarı Ömür (Context-Sensitive Half-Time · CSHT)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Sürekli TIVA infüzyonu kesildikten sonra plazma ilaç konsantrasyonunun <strong>%50</strong> azalması için gereken süredir. Buradaki <strong>"bağlam"</strong> toplam infüzyon süresidir; uyanma hızı terminal yarı ömürden (t₁/₂β) çok, infüzyon süresine bağlı kompartman doygunluğuna ve <strong>%80 azalma süresine (Decrement Time)</strong> bağlıdır.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div
              className={`inline-flex p-1 rounded-xl border ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
              role="group"
              aria-label="Farmakokinetik eşik seçimi"
            >
              <button
                type="button"
                onClick={() => setMetricMode('csht50')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  metricMode === 'csht50'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                CSHT (%50 Azalma)
              </button>
              <button
                type="button"
                onClick={() => setMetricMode('decrement80')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  metricMode === 'decrement80'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Uyanma Eşiği (%80 Azalma)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ana İnteraktif Simülatör Alanı (Sol: Büyük İnteraktif Grafik · Sağ: Canlı Çıktı & Kontroller) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* SOL ZON: Büyük İnteraktif Grafik & İnfüzyon Süresi Kaydırıcısı */}
        <div
          className={`xl:col-span-8 p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {/* Üst Kontrol Barı: Süre Slider & Presetler */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>
                    İnfüzyon Süresine (Bağlam) Göre {metricMode === 'csht50' ? 'CSHT (%50)' : '%80 Azalma Süresi'} Eğrisi (0 → 8 Saat)
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Grafik üzerine tıklayarak veya kaydırıcıyı sürükleyerek infüzyon süresini değiştirin; ajan seçerek odaklanın.
                </p>
              </div>
              <div className="font-mono tabular-nums text-sm font-bold px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 self-start sm:self-auto shrink-0">
                İnfüzyon: {formatDurationLabel(durationMinutes)}
              </div>
            </div>

            {/* Slider + Hızlı Senaryo Butonları */}
            <div
              className={`p-3.5 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono tabular-nums text-[11px] text-slate-500 w-10 shrink-0">15 dk</span>
                <input
                  type="range"
                  min={15}
                  max={480}
                  step={15}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  aria-label="TIVA infüzyon süresi dakika cinsinden"
                  className="w-full accent-cyan-600 cursor-pointer h-2 rounded-lg"
                />
                <span className="font-mono tabular-nums text-[11px] text-slate-500 w-11 text-right shrink-0">8 saat</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {DURATION_PRESETS.map((preset) => {
                  const active = durationMinutes === preset.minutes;
                  return (
                    <button
                      key={preset.minutes}
                      type="button"
                      onClick={() => setDurationMinutes(preset.minutes)}
                      className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-cyan-600 border-cyan-600 text-white'
                          : isDark
                            ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
                {hiddenDrugIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setHiddenDrugIds([])}
                    className={`ml-auto inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border cursor-pointer ${
                      isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-600'
                    }`}
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Tüm Ajanları Göster</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Büyük İnteraktif SVG Grafiği */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 sm:p-4 space-y-3">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              onClick={handleSvgClick}
              className="w-full h-64 sm:h-80 overflow-visible cursor-crosshair select-none"
              role="img"
              aria-label="TIVA ajanlarının infüzyon süresine göre Bağlama Duyarlı Yarı Ömür grafiği"
            >
              {/* Y ekseni yatay çizgileri */}
              {yTicks.map((tick) => {
                const y = toY(tick);
                return (
                  <g key={tick}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={padLeft + plotW}
                      y2={y}
                      stroke={tick === 0 ? '#475569' : '#1e293b'}
                      strokeWidth={tick === 0 ? 1.4 : 1}
                      strokeDasharray={tick === 0 ? undefined : '4 4'}
                    />
                    <text
                      x={padLeft - 8}
                      y={y + 3}
                      textAnchor="end"
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {tick} dk
                    </text>
                  </g>
                );
              })}

              {/* X ekseni dikey çizgileri (Saatler) */}
              {[0, 60, 120, 180, 240, 300, 360, 420, 480].map((min) => {
                const x = toX(min);
                return (
                  <g key={min}>
                    <line
                      x1={x}
                      y1={padTop}
                      x2={x}
                      y2={padTop + plotH}
                      stroke={min === 0 ? '#475569' : '#0f172a'}
                      strokeWidth={min === 0 ? 1.4 : 1}
                    />
                    <text
                      x={x}
                      y={padTop + plotH + 18}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {min === 0 ? '0' : `${min / 60} sa`}
                    </text>
                  </g>
                );
              })}

              {/* Eksen Başlıkları */}
              <text
                x={padLeft + plotW / 2}
                y={svgHeight - 2}
                textAnchor="middle"
                fill="#64748b"
                fontSize="10"
                fontWeight="bold"
              >
                Sürekli İnfüzyon Süresi (Bağlam / Saat)
              </text>

              {/* Ajan Eğrileri */}
              {DRUG_PK_PROFILES.filter((d) => !hiddenDrugIds.includes(d.id)).map((drug) => {
                const isFocused = drug.id === selectedDrugId;
                const pathPts = TIME_KNOTS_MIN.map((t) => {
                  const val = getAdjustedValue(drug, t);
                  return `${toX(t).toFixed(1)},${toY(val).toFixed(1)}`;
                });
                const dAttr = `M ${pathPts.join(' L ')}`;

                return (
                  <g
                    key={drug.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDrugId(drug.id);
                    }}
                    className="cursor-pointer"
                  >
                    <path
                      d={dAttr}
                      fill="none"
                      stroke={drug.colorHex}
                      strokeWidth={isFocused ? 3.8 : 2.3}
                      strokeOpacity={isFocused ? 1 : 0.72}
                      strokeDasharray={drug.strokeDash}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                );
              })}

              {/* Seçili İnfüzyon Süresi Dikey İmlec Çizgisi */}
              <line
                x1={toX(durationMinutes)}
                y1={padTop - 4}
                x2={toX(durationMinutes)}
                y2={padTop + plotH}
                stroke="#38bdf8"
                strokeWidth="1.6"
                strokeDasharray="4 3"
              />

              {/* Her Aktif Ajan İçin Seçili Süredeki Veri Noktası */}
              {rankedSnapshot.map(({ drug, activeMetricValue }) => {
                const cx = toX(durationMinutes);
                const cy = toY(activeMetricValue);
                const isFocused = drug.id === selectedDrugId;
                return (
                  <g
                    key={drug.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDrugId(drug.id);
                    }}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isFocused ? 6 : 4.2}
                      fill={drug.colorHex}
                      stroke="#020617"
                      strokeWidth="1.5"
                    />
                    {isFocused && (
                      <g>
                        <rect
                          x={cx + 8 > svgWidth - 95 ? cx - 96 : cx + 8}
                          y={Math.max(padTop, cy - 12)}
                          width="88"
                          height="20"
                          rx="4"
                          fill="#0f172a"
                          stroke={drug.colorHex}
                          strokeWidth="1"
                        />
                        <text
                          x={cx + 8 > svgWidth - 95 ? cx - 52 : cx + 52}
                          y={Math.max(padTop, cy - 12) + 13}
                          textAnchor="middle"
                          fill="#f8fafc"
                          fontSize="9.5"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {drug.name}: {activeMetricValue} dk
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* İnteraktif Ajan Görünürlük & Odaklanma Lejantı */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              {DRUG_PK_PROFILES.map((drug) => {
                const isHidden = hiddenDrugIds.includes(drug.id);
                const isFocused = selectedDrugId === drug.id;
                return (
                  <div
                    key={drug.id}
                    className={`inline-flex items-center rounded-lg border text-[11px] font-medium transition-colors ${
                      isHidden
                        ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50'
                        : isFocused
                          ? 'bg-slate-800 border-slate-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (isHidden) toggleDrugVisibility(drug.id);
                        setSelectedDrugId(drug.id);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 cursor-pointer"
                      title={`${drug.name} profilini incele`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{ backgroundColor: drug.colorHex }}
                      />
                      <span>{drug.name}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleDrugVisibility(drug.id)}
                      className="px-1.5 py-1 text-[10px] text-slate-400 hover:text-white border-l border-slate-800 cursor-pointer"
                      title={isHidden ? 'Eğriyi göster' : 'Eğriyi gizle'}
                      aria-label={`${drug.name} eğrisini ${isHidden ? 'göster' : 'gizle'}`}
                    >
                      {isHidden ? '+' : '×'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SAĞ ZON: Canlı Süre Çıktısı & Hasta Faktörü Seçici */}
        <div
          className={`xl:col-span-4 p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="space-y-4">
            {/* Hasta Modifikatörü */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Hasta &amp; Fizyolojik Durum</span>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(PATIENT_MODIFIERS) as PatientModifierId[]).map((modId) => {
                  const active = patientModifier === modId;
                  return (
                    <button
                      key={modId}
                      type="button"
                      onClick={() => setPatientModifier(modId)}
                      className={`px-2.5 py-2 text-[11px] font-semibold rounded-lg border text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-cyan-600 border-cyan-600 text-white'
                          : isDark
                            ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {PATIENT_MODIFIERS[modId].label}
                    </button>
                  );
                })}
              </div>
              <div
                className={`p-2.5 rounded-lg border text-[11px] leading-snug ${
                  patientModifier === 'standard'
                    ? isDark
                      ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                    : isDark
                      ? 'bg-amber-950/25 border-amber-500/35 text-amber-200'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="font-bold mb-0.5">{modifier.title}</div>
                <div>{modifier.note}</div>
              </div>
            </div>

            {/* Sıralı Anlık Süre Karşılaştırması */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">
                  {formatDurationLabel(durationMinutes)} İnfüzyon Sonrası
                </span>
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {metricMode === 'csht50' ? 'CSHT (%50)' : '%80 Azalma'}
                </span>
              </div>

              <div className="space-y-2">
                {rankedSnapshot.map(({ drug, activeMetricValue, csht50, dec80 }) => {
                  const pct = Math.min(100, Math.max(3, (activeMetricValue / yMax) * 100));
                  const isFocused = drug.id === selectedDrugId;
                  return (
                    <button
                      key={drug.id}
                      type="button"
                      onClick={() => setSelectedDrugId(drug.id)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1.5 ${
                        isFocused
                          ? isDark
                            ? 'bg-slate-800/80 border-cyan-500/50'
                            : 'bg-cyan-50/70 border-cyan-400'
                          : isDark
                            ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                            : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-xs shrink-0"
                            style={{ backgroundColor: drug.colorHex }}
                          />
                          <span className="font-bold text-slate-900 dark:text-white truncate">
                            {drug.name}
                          </span>
                        </div>
                        <div className="font-mono tabular-nums font-bold text-slate-900 dark:text-white shrink-0">
                          {activeMetricValue} dk
                        </div>
                      </div>

                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-150"
                          style={{ width: `${pct}%`, backgroundColor: drug.colorHex }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                        <span>CSHT: {csht50} dk</span>
                        <span>%80 Uyanma: ~{dec80} dk</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Seçili Ajan Klinik Özeti */}
          {focusedSnapshot && (
            <div
              className={`p-3.5 rounded-xl border space-y-1.5 ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Seçili Ajan: {focusedDrug.name}
                </span>
                <span className="text-[11px] font-medium text-cyan-600 dark:text-cyan-400">
                  {focusedDrug.statusTag}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                {focusedDrug.clinicalSummary}
              </p>
              <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 pt-1">
                Klinik Kural: {focusedDrug.awakeningRule}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BÖLÜM 2: 3-Kompartmanlı Fizyolojik Mekanizma & Neden CSHT Uzuyor? */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-500" />
              <span>3 Kompartmanlı Modelde İnfüzyon Süresi CSHT’yi Neden Değiştirir?</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              İnfüzyon süresine göre V1 (Santral/Beyin), V2 (Kas/Organ) ve V3 (Yağ/Derin Doku) doluluk durumunu seçin:
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {COMPARTMENT_STAGES.map((stage) => {
              const active = stage.id === compartmentStage;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setCompartmentStage(stage.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-cyan-600 border-cyan-600 text-white'
                      : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {stage.durationBadge}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-7 grid grid-cols-3 gap-3">
            {[
              { code: 'V1', label: 'Santral (Kan & Beyin)', fill: currentCompartment.v1Level, desc: 'Hızlı denge · Etki yeri' },
              { code: 'V2', label: 'Hızlı Periferik (Kas)', fill: currentCompartment.v2Level, desc: 'Orta kanlanma' },
              { code: 'V3', label: 'Derin Periferik (Yağ)', fill: currentCompartment.v3Level, desc: 'Büyük kapasite · Yavaş akım' }
            ].map((comp) => (
              <div
                key={comp.code}
                className={`p-3.5 rounded-xl border space-y-2 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">{comp.code}</span>
                  <span className="font-mono tabular-nums text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    %{comp.fill} Dolu
                  </span>
                </div>
                <div className="h-24 w-full rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-end">
                  <div
                    className={`w-full transition-all duration-300 ${
                      comp.fill >= 75 ? 'bg-rose-500/80' : comp.fill >= 40 ? 'bg-amber-500/80' : 'bg-cyan-500/80'
                    }`}
                    style={{ height: `${comp.fill}%` }}
                  />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">{comp.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{comp.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
              {currentCompartment.flowLabel}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {currentCompartment.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentCompartment.explanation}
            </p>
            <div
              className={`p-3 rounded-xl border text-[11px] leading-relaxed ${
                isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <strong>Neden Terminal Yarı Ömür (t₁/₂β) Yanıltıcıdır?</strong> Propofolün terminal t₁/₂β süresi 4–24+ saattir ancak derin yağ dokusundan kana dönüş hızı karaciğer+ekstrahepatik klirens hızına göre çok yavaştır; bu sayede 8 saat sonunda bile plazma düzeyi ~40 dk içinde %50 düşer. Buna karşılık Alfentanil’in t₁/₂β’sı sadece 1.5 saattir ancak düşük klirensi nedeniyle 1 saatte CSHT ~40 dk’ya çıkar.
            </div>
          </div>
        </div>
      </div>

      {/* BÖLÜM 3: Tüm Ajanlar Karşılaştırmalı Farmakokinetik Tablosu */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-500" />
              <span>İntravenöz Anestezik ve Opioidlerin CSHT Karşılaştırma Tablosu (Referans Erişkin)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tablo satırına tıklayarak yukarıdaki grafikte ilgili ajanı vurgulayabilirsiniz.
            </p>
          </div>
          <span className="font-mono text-[11px] text-slate-400">Birim: Dakika (dk)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}
              >
                <th className="py-2.5 pr-3 font-bold">Ajan</th>
                <th className="py-2.5 px-2 font-bold">Terminal t₁/₂β</th>
                <th className="py-2.5 px-2 font-bold text-right">1 Saat CSHT</th>
                <th className="py-2.5 px-2 font-bold text-right">2 Saat CSHT</th>
                <th className="py-2.5 px-2 font-bold text-right">4 Saat CSHT</th>
                <th className="py-2.5 px-2 font-bold text-right">8 Saat CSHT</th>
                <th className="py-2.5 px-2 font-bold text-right">4 Sa %80 Azalma</th>
                <th className="py-2.5 pl-3 font-bold">TCI Modeli / Metabolizma</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/80 font-mono tabular-nums">
              {DRUG_PK_PROFILES.map((drug) => {
                const isFocused = selectedDrugId === drug.id;
                return (
                  <tr
                    key={drug.id}
                    onClick={() => setSelectedDrugId(drug.id)}
                    className={`cursor-pointer transition-colors ${
                      isFocused
                        ? isDark
                          ? 'bg-cyan-950/30'
                          : 'bg-cyan-50/70'
                        : isDark
                          ? 'hover:bg-slate-800/40'
                          : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 pr-3 font-sans">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-xs shrink-0"
                          style={{ backgroundColor: drug.colorHex }}
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{drug.name}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{drug.drugClass}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300">{drug.terminalHalfLife}</td>
                    <td className="py-3 px-2 text-right font-semibold text-slate-800 dark:text-slate-200">
                      {drug.csht50Points[2]} dk
                    </td>
                    <td className="py-3 px-2 text-right font-semibold text-slate-800 dark:text-slate-200">
                      {drug.csht50Points[3]} dk
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-bold ${
                        drug.csht50Points[5] >= 120
                          ? 'text-rose-600 dark:text-rose-400'
                          : drug.csht50Points[5] <= 30
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {drug.csht50Points[5]} dk
                    </td>
                    <td
                      className={`py-3 px-2 text-right font-bold ${
                        drug.csht50Points[7] >= 150
                          ? 'text-rose-600 dark:text-rose-400'
                          : drug.csht50Points[7] <= 45
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {drug.csht50Points[7]} dk
                    </td>
                    <td className="py-3 px-2 text-right text-amber-700 dark:text-amber-300 font-semibold">
                      ~{drug.decrement80Points[5]} dk
                    </td>
                    <td className="py-3 pl-3 font-sans text-[11px] text-slate-600 dark:text-slate-300">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{drug.tciModel}</div>
                      <div className="text-slate-500 dark:text-slate-400">{drug.metabolism}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* BÖLÜM 4: TIVA Pratik Kuralları & Klinik Tuzaklar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          className={`p-5 rounded-2xl border space-y-2.5 ${
            isDark ? 'bg-emerald-950/15 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>TIVA / TCI Vakalarında Hızlı Uyanma İçin Altın Kurallar</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">1.</span>
              <span>
                <strong>Opioid Seçimi:</strong> 2 saati aşan TIVA olgularında sürekli Fentanil infüzyonu yerine bağlamdan bağımsız <strong>Remifentanil</strong> (CSHT ~3–4 dk) tercih edin; ancak kapatmadan 20–30 dk önce köprü analjezi (Parasetamol/NSAID/uzun etkili opioid mikro-titrasyonu/rejyonal blok) verin.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">2.</span>
              <span>
                <strong>TCI Ekranında "Decrement Time" Takibi:</strong> Sadece güncel Etki-Yeri Konsantrasyonuna (Ce) değil, pompanın hesapladığı uyanma konsantrasyonuna iniş süresine (Decrement Time) bakın; cerrahi kapanış sırasında BIS/Entropy 50–60 bandında Ce değerini kademeli azaltın.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">3.</span>
              <span>
                <strong>Model &amp; Ağırlık Seçimi:</strong> Obez hastalarda Marsh (TBW) yerine Schnider/Eleveld ve Minto (LBM) kullanmak aşırı kompartman yüklemesini ve postoperatif gecikmiş uyanmayı önler.
              </span>
            </li>
          </ul>
        </div>

        <div
          className={`p-5 rounded-2xl border space-y-2.5 ${
            isDark ? 'bg-rose-950/15 border-rose-500/30' : 'bg-rose-50/60 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Klinik Tuzaklar (Gecikmiş Uyanma Nedenleri)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">!</span>
              <span>
                <strong>%50 Düşüş Her Zaman Uyandırmaz:</strong> Yüksek doz Propofol TIVA’da hastanın göz açması için plazma konsantrasyonunun %50 değil %70–80 azalması gerekir; 6 saatlik vakada bu süre ~85–95 dakikayı bulabilir.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">!</span>
              <span>
                <strong>Nalokson Sonrası Re-Narkotizasyon:</strong> Uzun Fentanil infüzyonu (CSHT &gt; 200 dk) sonrası verilen tek doz Naloksonun yarı ömrü yalnızca 30–60 dakikadır; hasta PACU’da uyanıp 1 saat sonra yeniden solunum depresyonuna girebilir.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">!</span>
              <span>
                <strong>IV Hat Ölü Boşluğu &amp; Geri Akım:</strong> Çoklu infüzyon setinde reflü veya musluk ölü boşluğunda biriken Propofol/Remifentanilin vaka sonunda hızlı SF ile yıkanması ani bolus doz aşımına/apneye yol açabilir.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Kaynaklar */}
      <div
        className={`p-4 rounded-xl border text-xs space-y-1.5 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <BookOpen className="w-4 h-4 text-cyan-500" />
          <span>Kaynaklar (Textbook &amp; Temel Farmakokinetik Literatür)</span>
        </div>
        <ol className="list-decimal list-inside space-y-1 leading-relaxed">
          <li>
            Hughes MA, Glass PS, Jacobs JR. Context-sensitive half-time in multicompartment pharmacokinetic models for intravenous anesthetic drugs. <em>Anesthesiology</em>. 1992;76(3):334–341. (PMID: 1539843).
          </li>
          <li>
            Egan TD, Lemmens HJ, Fiset P, et al. The pharmacokinetics of the new short-acting opioid remifentanil (GI87084B) in healthy adult male volunteers. <em>Anesthesiology</em>. 1993;79(5):881–892. (PMID: 7902032).
          </li>
          <li>
            Bailey JM. Context-sensitive half-times and other decrement times of intravenous drugs. <em>Curr Opin Anaesthesiol</em>. 1997;10(4):259–264. / Bailey JM. Technique for quantifying the duration of intravenous anesthetic effect. <em>Anesthesiology</em>. 1995;83(5):1095–1103.
          </li>
          <li>
            Gropper MA, Eriksson LI, Fleisher LA, et al. (Eds.). <em>Miller’s Anesthesia</em>. 10th ed. Elsevier; 2024. (Intravenous Anesthetics, Opioids &amp; Multicompartment Pharmacokinetics).
          </li>
          <li>
            Butterworth JF, Mackey DC, Wasnick JD. <em>Morgan &amp; Mikhail’s Clinical Anesthesiology</em>. 7th ed. McGraw-Hill; 2022. (Chapters 9–10: Intravenous Anesthetics &amp; Opioid Analgesics).
          </li>
          <li>
            Al-Rifai Z, Mulvey D. Principles of total intravenous anaesthesia: basic pharmacokinetics and model descriptions. <em>BJA Educ</em>. 2016;16(3):92–97.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TivaCshtInfographic;
