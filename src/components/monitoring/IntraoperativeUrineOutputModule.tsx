import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  CheckCircle2,
  Droplets,
  ExternalLink,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react';

interface IntraoperativeUrineOutputModuleProps {
  isDark: boolean;
}

type PatientGroup = 'adult' | 'pediatric' | 'neonate';

interface UrineColorRow {
  color: string;
  swatchClass: string;
  causes: string;
  bedsideAction: string;
}

const URINE_COLORS: UrineColorRow[] = [
  {
    color: 'Açık sarı / Berrak',
    swatchClass: 'bg-yellow-200 border-yellow-300',
    causes: 'Yeterli hidrasyon veya yoğun kristaloid / diüretik sonrası dilüe idrar',
    bedsideAction: 'Rutin takip; poliüri (> 3–4 mL/kg/sa) varsa diyabetes insipidus, mannitol veya hiperglisemiyi sorgula.',
  },
  {
    color: 'Koyu sarı / Amber',
    swatchClass: 'bg-amber-400 border-amber-500',
    causes: 'Yüksek ADH yanıtı, cerrahi stres, yetersiz sıvı alımı veya erken hipovolemi',
    bedsideAction: 'Tek başına sıvı bolusu verme; MAP, PPV/SVV, kanama ve laktatla birlikte değerlendir.',
  },
  {
    color: 'Parlak kırmızı / Pembe',
    swatchClass: 'bg-rose-500 border-rose-600',
    causes: 'Gross hematüri: üretral/mesane travması (balon şişirme), ürolojik/pelvik cerrahi, antikoagülasyon',
    bedsideAction: 'Kateter pozisyonunu ve pıhtı tıkanıklığını kontrol et; gerekirse 3-yollu Foley ile sürekli mesane irigasyonu.',
  },
  {
    color: 'Çay / Kola rengi',
    swatchClass: 'bg-amber-900 border-amber-950',
    causes: 'Myoglobinüri (rabdomiyoliz, uzun turnike, crush, MH) veya Hemoglobinüri (hemolitik transfüzyon reaksiyonu!)',
    bedsideAction: 'ACİL: Dipstick kan (+) ama mikroskopide eritrosit yok! Transfüzyonu derhal durdur, serum CK / K⁺ / serbest Hb / pembe plazma bak, agresif hidrasyon + alkalinize idrar planla.',
  },
  {
    color: 'Yeşil / Mavi-Yeşil',
    swatchClass: 'bg-emerald-500 border-emerald-600',
    causes: 'Propofol infüzyonu (zararsız fenolik kinol metabolitleri), Metilen Mavisi, İndigo Karmin, amitriptilin',
    bedsideAction: 'Propofole bağlıysa benigndir ve kesilince düzelir; metilen mavisi / üreter boyası verilip verilmediğini cerrahla doğrula.',
  },
  {
    color: 'Bulanık / Süt beyazı',
    swatchClass: 'bg-slate-200 border-slate-300',
    causes: 'Piyüri (İYE), fosfat kristalleri, nadiren şilüri veya ürolojik irigasyon artıkları',
    bedsideAction: 'Ateş/sepsis bulgusu yoksa rutin gözlem; şüpheli enfeksiyonda idrar kültürü ve antibiyogram gönder.',
  },
];

const OLIGURIA_STEPS = [
  {
    step: '01',
    title: 'Önce Foley’i (Mekanik / Post-Renal) Dışla',
    accent: 'sky' as const,
    items: [
      'Hortumda katlanma (kink), cerrahi masa altında sıkışma veya urometre hattında hava kilidi (air-lock) var mı kontrol et.',
      'Ürolojik, pelvik veya hematürili vakalarda pıhtı tıkanıklığı için 30–50 mL steril SF ile nazik irigasyon yap.',
      'Kateterin üretraya kaymadığını doğrula; şüphede yatak başı Mesane POCUS ile glob vezikale kontrolü yap.',
      'Pelvik/retroperitoneal cerrahide cerraha üreter veya mesane basısı/hasarı olasılığını sor.',
    ],
  },
  {
    step: '02',
    title: 'Renal Perfüzyon & Gerçek Volüm Durumunu Değerlendir',
    accent: 'emerald' as const,
    items: [
      'Renal perfüzyon basıncını hatırla: RPP = MAP − CVP (veya yüksek İAB’de MAP − İAB).',
      'MAP < 65 mmHg (kronik hipertansifte bazalin %80’i) ise önce vazopressörle perfüzyon basıncını düzelt.',
      'Gerçek hipovolemi kanıtı ara: PPV/SVV > %13, aktif kanama, yükselen laktat, artan baz açığı veya taşikardi.',
      'Hemodinami stabil ve volüm yanıtı yoksa yalnızca idrarı 0.5 mL/kg/sa üzerine çıkarmak için kör sıvı bolusu VERME!',
    ],
  },
  {
    step: '03',
    title: 'Cerrahi & Hormonal (ADH) Etkenleri Hesaba Kat',
    accent: 'amber' as const,
    items: [
      'Cerrahi stres, ağrı, pozitif basınçlı ventilasyon (PEEP) ve volatil ajanlar fizyolojik olarak ADH (AVP) ve RAAS’ı artırır.',
      'Laparoskopide 12–15 mmHg pnömoperitonyum renal venöz basıncı artırarak geçici oligüri yapar; desüflasyonla hızla düzelir.',
      'Aort kros-klemp, IVC retraksiyonu veya derin Trendelenburg renal kan akımını doğrudan azaltır.',
      'İzole 0.3–0.5 mL/kg/sa arası kısa süreli intraoperatif oligüri tek başına ABH öngördürücüsü değildir (Mizota 2017).',
    ],
  },
  {
    step: '04',
    title: 'Diüretik (Furosemid / Mannitol) Kuralına Uy',
    accent: 'rose' as const,
    items: [
      'KDIGO Grade 1B: Hipovolemik veya hemodinamik oligüride ABH’yi önlemek/tedavi etmek amacıyla rutin Furosemid YASAKTIR.',
      'Gereksiz furosemid böbrek medullasını hipoperfüze eder ve oligüri uyarısını yapay olarak maskeler.',
      'Geçerli intraoperatif endikasyonlar: Hipervolemi / akciğer ödemi, hiperkalemi, KİBAS (Mannitol) veya cerrahın üreter bütünlüğü testi.',
      'Rabdomiyoliz/hemoliz şüphesinde hedef idrar ≥ 1–2 mL/kg/sa olacak şekilde agresif dengeli kristaloid ile izle.',
    ],
  },
];

const REFERENCES = [
  {
    authors: 'Khwaja A (KDIGO AKI Work Group)',
    title: 'KDIGO Clinical Practice Guidelines for Acute Kidney Injury',
    journal: 'Nephron Clin Pract. 2012;120(4):c179–c184',
    pmid: '22890468',
  },
  {
    authors: 'Egal M, de Geus HRH, van Bommel J, Groeneveld ABJ',
    title: 'Targeting oliguria reversal in perioperative restrictive fluid management does not influence the occurrence of renal dysfunction: A systematic review and meta-analysis',
    journal: 'Eur J Anaesthesiol. 2016;33(6):425–435',
    pmid: '26840829',
  },
  {
    authors: 'Mizota T, Yamamoto Y, Hamada M, Matsukawa S, Shimizu S, Kai S',
    title: 'Intraoperative oliguria predicts acute kidney injury after major abdominal surgery',
    journal: 'Br J Anaesth. 2017;119(6):1127–1134',
    pmid: '29136086',
  },
  {
    authors: 'Myles PS, Bellomo R, Corcoran T, et al. (RELIEF Trial)',
    title: 'Restrictive versus Liberal Fluid Therapy for Major Abdominal Surgery',
    journal: 'N Engl J Med. 2018;378(24):2263–2274',
    pmid: '29742967',
  },
];

export const IntraoperativeUrineOutputModule: React.FC<IntraoperativeUrineOutputModuleProps> = ({ isDark }) => {
  const [group, setGroup] = useState<PatientGroup>('adult');
  const [weightKg, setWeightKg] = useState<number>(75);
  const [urineMl, setUrineMl] = useState<number>(25);
  const [durationHours, setDurationHours] = useState<number>(1);

  const handleGroupChange = (next: PatientGroup) => {
    setGroup(next);
    if (next === 'adult') {
      setWeightKg(75);
      setUrineMl(25);
      setDurationHours(1);
    } else if (next === 'pediatric') {
      setWeightKg(20);
      setUrineMl(18);
      setDurationHours(1);
    } else {
      setWeightKg(3.5);
      setUrineMl(6);
      setDurationHours(1);
    }
  };

  const calc = useMemo(() => {
    const safeWeight = Math.max(0.5, weightKg || 0.5);
    const safeHours = Math.max(0.25, durationHours || 0.25);
    const safeUrine = Math.max(0, urineMl || 0);
    const rate = safeUrine / safeWeight / safeHours;

    const targetRate = group === 'adult' ? 0.5 : group === 'pediatric' ? 1.0 : 2.0;
    const targetMlPerHour = targetRate * safeWeight;

    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let label = '';
    let note = '';

    if (rate < 0.1) {
      status = 'critical';
      label = 'Anüri (< 0.1 mL/kg/sa)';
      note =
        'İlk saniyede Foley tıkanıklığı, kink veya kateter yanlış yerleşimini dışlayın (gerekirse SF irigasyonu / Mesane POCUS). Mekanik engel yoksa acil renal perfüzyon, aort/üreter basısı veya şok araştırın.';
    } else if (group === 'adult' && rate < 0.3) {
      status = 'critical';
      label = 'Şiddetli İntraoperatif Oligüri (< 0.3 mL/kg/sa)';
      note =
        'Mizota (2017) kohortunda < 0.3 mL/kg/sa postoperatif ABH riskini anlamlı artırır (OR 2.65). Foley kontrolü sonrası MAP ≥ 65 mmHg, PPV/SVV, kanama, pnömoperitonyum ve böbrek perfüzyonunu derhal optimize edin.';
    } else if (rate < targetRate) {
      status = 'warning';
      label =
        group === 'adult'
          ? 'Hafif-Orta İntraoperatif Oligüri (0.3–0.5 mL/kg/sa)'
          : `Pediatrik/Yenidoğan Oligüri (< ${targetRate.toFixed(1)} mL/kg/sa)`;
      note =
        group === 'adult'
          ? 'Fizyolojik ADH/stres yanıtı veya pnömoperitonyum bölgesidir. Hemodinami stabil, laktat ve PPV/SVV normalse yalnızca bu değer için agresif sıvı bolusu veya furosemid VERMEYİN; trendi ve Foley açıklığını izleyin.'
          : 'Çocuk ve yenidoğanlarda idrar çıkışı perfüzyona erişkinden daha duyarlıdır. Foley açıklığını doğruladıktan sonra sıvı açığını, MAP’ı ve cerrahi kayıpları dikkatle değerlendirin.';
    } else if (rate > (group === 'neonate' ? 5.0 : 3.5)) {
      status = 'warning';
      label = 'Poliüri (Yüksek İdrar Çıkışı)';
      note =
        'Aşırı kristaloid yüklemesi, mannitol/furosemid etkisi, hiperglisemi (ozmotik diürez), soğuk diürez veya kraniyal cerrahide Santral Diyabetes İnsipidus olasılığını gözden geçirin (serum Na⁺ ve idrar dansitesi).';
    } else {
      status = 'optimal';
      label = 'Yeterli İdrar Çıkışı (Normoüri)';
      note =
        'Renal perfüzyon ve Foley drenajı bu zaman dilimi için yeterlidir. Saatlik trendi, idrar rengini ve toplam sıvı dengesini izlemeye devam edin.';
    }

    return {
      rate,
      targetRate,
      targetMlPerHour,
      status,
      label,
      note,
    };
  }, [group, weightKg, urineMl, durationHours]);

  return (
    <div className="space-y-6 pb-8">
      {/* ===================================================================== */}
      {/* HEADER                                                                */}
      {/* ===================================================================== */}
      <header className={`pb-5 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span className="text-amber-600 dark:text-amber-400 font-semibold">Renal Perfüzyon &amp; Sıvı Dengesi</span>
          <span aria-hidden="true">·</span>
          <span>Yatak Başı Klinik Rehber</span>
          <span aria-hidden="true">·</span>
          <span>KDIGO · Mizota 2017 · RELIEF 2018 · ERAS</span>
        </div>

        <h1
          className={`mt-2 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          İntraoperatif İdrar Çıkışı (Foley) Takibi
        </h1>

        <p className={`mt-2.5 text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Foley kateter ile saatlik idrar izlemi, oligüriye adım adım klinik yaklaşım, modern kanıtlar ışığında{' '}
          <strong>ADH kaynaklı fizyolojik oligüri vs. gerçek hipoperfüzyon</strong> ayrımı, güvenli kateterizasyon ve
          intraoperatif idrar rengi okuma rehberi.
        </p>
      </header>

      {/* ===================================================================== */}
      {/* 1. COMPACT BEDSIDE CALCULATOR + KEY THRESHOLDS                        */}
      {/* ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Calculator Card */}
        <div
          className={`lg:col-span-7 rounded-xl border p-4 sm:p-5 space-y-4 ${
            isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Calculator className="w-4 h-4" />
              <span>Hızlı İdrar Çıkışı Hesaplayıcısı (mL/kg/sa)</span>
            </div>

            <div className="flex items-center gap-1.5">
              {[
                { id: 'adult' as const, label: 'Erişkin' },
                { id: 'pediatric' as const, label: 'Pediatrik' },
                { id: 'neonate' as const, label: 'Yenidoğan' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleGroupChange(opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    group === opt.id
                      ? isDark
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-amber-50 border-amber-400 text-amber-900'
                      : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="space-y-1 block">
              <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Ağırlık (kg)
              </span>
              <input
                type="number"
                min={1}
                max={250}
                step={group === 'neonate' ? 0.1 : 1}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </label>

            <label className="space-y-1 block">
              <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Ölçülen İdrar (mL)
              </span>
              <input
                type="number"
                min={0}
                max={5000}
                step={5}
                value={urineMl}
                onChange={(e) => setUrineMl(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </label>

            <label className="space-y-1 block">
              <span className={`text-[11px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Süre (saat)
              </span>
              <input
                type="number"
                min={0.25}
                max={24}
                step={0.5}
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-sm font-mono font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </label>
          </div>

          {/* Result & Clinical Interpretation */}
          <div
            className={`rounded-xl border p-3.5 space-y-2 ${
              calc.status === 'optimal'
                ? isDark
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : calc.status === 'critical'
                  ? isDark
                    ? 'bg-rose-950/35 border-rose-500/40 text-rose-200'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                  : isDark
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-center gap-1.5 font-bold text-sm">
                {calc.status === 'optimal' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : calc.status === 'critical' ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>{calc.label}</span>
              </div>
              <div className="font-mono text-lg font-bold tabular-nums">
                {calc.rate.toFixed(2)} <span className="text-xs font-normal opacity-80">mL/kg/sa</span>
              </div>
            </div>
            <div className="text-[11px] font-mono opacity-85 tabular-nums">
              Hedef alt sınır: ≥ {calc.targetRate.toFixed(1)} mL/kg/sa (bu hasta için ≥ {Math.round(calc.targetMlPerHour)} mL/sa)
            </div>
            <p className="text-xs leading-relaxed">{calc.note}</p>
          </div>
        </div>

        {/* Modern Clinical Evidence Card (Why Oliguria ≠ Hypovolemia) */}
        <div
          className={`lg:col-span-5 rounded-xl border p-4 sm:p-5 space-y-3 ${
            isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Kritik Modern Klinik Gerçek</span>
          </div>
          <h2 className={`text-base font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
            İntraoperatif Oligüri Tek Başına Hipovolemi Demek Değildir
          </h2>
          <ul className={`text-xs leading-relaxed space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <li>
              <strong>Fizyolojik ADH Yanıtı:</strong> Cerrahi stres, ağrı, PEEP ve pnömoperitonyum ADH/RAAS’ı artırarak
              sağlıklı böbrekte bile idrarı &lt; 0.5 mL/kg/sa’ya düşürebilir.
            </li>
            <li>
              <strong>Mizota (2017, BJA):</strong> 3.560 majör abdominal vakada 0.3–0.5 mL/kg/sa aralığı ABH ile ilişkili
              bulunmazken, gerçek risk eşiği <strong>&lt; 0.3 mL/kg/sa</strong> (OR 2.65) olarak saptanmıştır.
            </li>
            <li>
              <strong>Egal (2016) &amp; RELIEF (2018):</strong> Yalnızca oligüriyi çevirmek için körlemesine sıvı yüklemek
              ABH’yi önlemez; ancak aşırı restriktif (dehidrate) strateji de ABH riskini artırır (%8.6 vs %5.0). Denge:
              <em> hedefe yönelik (MAP + dinamik parametreler) sıvı yönetimi</em>!
            </li>
          </ul>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. 4-STEP BEDSIDE OLIGURIA TROUBLESHOOTING                            */}
      {/* ===================================================================== */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-sky-500" />
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ameliyathanede İdrar Azaldığında 4 Basamaklı Pratik Yaklaşım
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {OLIGURIA_STEPS.map((block) => (
            <div
              key={block.step}
              className={`rounded-xl border p-4 space-y-2.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                    block.accent === 'sky'
                      ? isDark
                        ? 'bg-sky-500/15 text-sky-300'
                        : 'bg-sky-100 text-sky-800'
                      : block.accent === 'emerald'
                        ? isDark
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-emerald-100 text-emerald-800'
                        : block.accent === 'amber'
                          ? isDark
                            ? 'bg-amber-500/15 text-amber-300'
                            : 'bg-amber-100 text-amber-800'
                          : isDark
                            ? 'bg-rose-500/15 text-rose-300'
                            : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  ADIM {block.step}
                </span>
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{block.title}</h3>
              </div>
              <ul className={`text-xs leading-relaxed space-y-1.5 list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {block.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. FOLEY CATHETER PRACTICAL GUIDE & KDIGO STAGING                     */}
      {/* ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Foley Selection & Safety */}
        <div
          className={`lg:col-span-7 rounded-xl border p-4 sm:p-5 space-y-3 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-amber-500" />
            <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Foley Kateter Endikasyonları, Seçimi &amp; Güvenli Uygulama
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
            <div className={`rounded-lg border p-3 space-y-1.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Ne Zaman Takılır? (ERAS Uyumu)</div>
              <ul className={`space-y-1 list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>Cerrahi süre &gt; 2–3 saat veya majör sıvı/kan kaybı beklentisi</li>
                <li>Kardiyak, aortik, intrakraniyal, pelvik, ürolojik ve transplant cerrahisi</li>
                <li>Hemodinamik instabilite, şok veya böbrek fonksiyon takibi gereksinimi</li>
                <li><strong>ERAS Notu:</strong> Kısa elektif vakalarda gereksiz Foley takma; takıldıysa postop en erken saatte çek (CAUTI riskini azaltır).</li>
              </ul>
            </div>

            <div className={`rounded-lg border p-3 space-y-1.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Boyut, Balon &amp; Güvenlik Kuralları</div>
              <ul className={`space-y-1 list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li><strong>Erişkin standart:</strong> 14–16 Fr · <strong>Pediatrik:</strong> 6–10 Fr · <strong>Hematüri:</strong> 3-yollu 20–22 Fr · <strong>BPH:</strong> Coude (Tiemann) uç.</li>
                <li><strong>Balon:</strong> 10 mL <strong>steril su</strong> ile şişir (SF kullanma — kristalleşip sönmeyi engelleyebilir!).</li>
                <li><strong>Üretra güvenliği:</strong> Kateteri Y-ayrımına (hub) kadar ilerletip idrar akışını görmeden balonu ASLA şişirme. Dirençte zorlama → üroloji.</li>
                <li><strong>Isı problu Foley:</strong> Oligüride (&lt; 0.5 mL/kg/sa) mesane kor ısısı yanıtı gecikir.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* KDIGO Urine Output Criteria */}
        <div
          className={`lg:col-span-5 rounded-xl border p-4 sm:p-5 space-y-3 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            KDIGO Akut Böbrek Hasarı (ABH) İdrar Kriterleri
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  <th className="py-2 pr-3 font-bold">Evre</th>
                  <th className="py-2 font-bold">İdrar Çıkışı Kriteri</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                <tr>
                  <td className="py-2 pr-3 font-mono font-bold text-amber-500 whitespace-nowrap">Evre 1</td>
                  <td className="py-2 font-mono">&lt; 0.5 mL/kg/sa × 6–12 saat</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-mono font-bold text-orange-500 whitespace-nowrap">Evre 2</td>
                  <td className="py-2 font-mono">&lt; 0.5 mL/kg/sa × ≥ 12 saat</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-mono font-bold text-rose-500 whitespace-nowrap">Evre 3</td>
                  <td className="py-2 font-mono">&lt; 0.3 mL/kg/sa × ≥ 24 saat <em>veya</em> Anüri ≥ 12 saat</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <strong>İdeal Ağırlık Notu:</strong> Morbid obez hastalarda mL/kg/sa hesabı gerçek ağırlık yerine{' '}
            <strong>ideal/düzeltilmiş vücut ağırlığı</strong> üzerinden yorumlanmalıdır; aksi halde yapay oligüri görünür.
          </p>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. INTRAOPERATIVE URINE COLOR QUICK REFERENCE                         */}
      {/* ===================================================================== */}
      <section className="space-y-3">
        <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          İntraoperatif İdrar Rengi Hızlı Okuma Tablosu
        </h2>
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-2.5 px-4 font-bold">Renk</th>
                <th className="py-2.5 px-4 font-bold">Olası Nedenler</th>
                <th className="py-2.5 px-4 font-bold">Yatak Başı Aksiyon</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {URINE_COLORS.map((row) => (
                <tr key={row.color} className="align-top">
                  <td className={`py-2.5 px-4 font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span className="inline-flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-sm border shrink-0 ${row.swatchClass}`} aria-hidden="true" />
                      <span>{row.color}</span>
                    </span>
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[200px]">{row.causes}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[240px]">{row.bedsideAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. VERIFIED PUBMED REFERENCES                                         */}
      {/* ===================================================================== */}
      <section
        className={`rounded-xl border p-4 space-y-2.5 ${
          isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
          <span>Kanıta Dayalı Kaynaklar (PubMed Doğrulamalı)</span>
        </div>
        <ul className="space-y-2 text-xs">
          {REFERENCES.map((ref) => (
            <li
              key={ref.pmid}
              className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <div>
                <span className="font-semibold">{ref.authors}.</span> {ref.title}.{' '}
                <span className="italic text-slate-500">{ref.journal}.</span>
              </div>
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
              >
                <span>PMID: {ref.pmid}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
