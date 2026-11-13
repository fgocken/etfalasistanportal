import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Footprints,
  Info,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';

interface DasiCalculatorProps {
  isDark: boolean;
}

interface DasiItem {
  number: number;
  id: string;
  group: 'Günlük Özbakım ve Ev İçi' | 'Orta Düzey Aktivite ve Yürüme' | 'Yorucu Fiziksel ve Sportif Aktiviteler';
  question: string;
  examples: string;
  weight: number;
}

const DASI_ITEMS: DasiItem[] = [
  {
    number: 1,
    id: 'self_care',
    group: 'Günlük Özbakım ve Ev İçi',
    question: 'Kişisel bakımınızı yardımsız yapabilir misiniz?',
    examples: 'Yemek yeme, giyinme, yıkanma veya tuvaleti kullanma',
    weight: 2.75
  },
  {
    number: 2,
    id: 'walk_indoors',
    group: 'Günlük Özbakım ve Ev İçi',
    question: 'Ev veya apartman dairesi içinde yürüyebilir misiniz?',
    examples: 'Odalar arasında düz zeminde yürüme',
    weight: 1.75
  },
  {
    number: 3,
    id: 'walk_blocks',
    group: 'Günlük Özbakım ve Ev İçi',
    question: 'Düz zeminde 1 – 2 blok (yaklaşık 100 – 200 metre) yürüyebilir misiniz?',
    examples: 'Kısa mahalle yürüyüşü, duraksamadan düz yol',
    weight: 2.75
  },
  {
    number: 6,
    id: 'light_housework',
    group: 'Günlük Özbakım ve Ev İçi',
    question: 'Ev içinde hafif işler yapabilir misiniz?',
    examples: 'Toz alma, bulaşık yıkama',
    weight: 2.70
  },
  {
    number: 4,
    id: 'climb_stairs',
    group: 'Orta Düzey Aktivite ve Yürüme',
    question: 'Bir kat merdiven çıkabilir veya yokuş yukarı yürüyebilir misiniz?',
    examples: 'Dinlenmeden 1 kat merdiven veya eğimli yol çıkışı',
    weight: 5.50
  },
  {
    number: 7,
    id: 'moderate_housework',
    group: 'Orta Düzey Aktivite ve Yürüme',
    question: 'Ev içinde orta düzeyde işler yapabilir misiniz?',
    examples: 'Elektrik süpürgesi kullanma, yer süpürme veya market poşetleri taşıma',
    weight: 3.50
  },
  {
    number: 9,
    id: 'yard_work',
    group: 'Orta Düzey Aktivite ve Yürüme',
    question: 'Bahçe veya dış mekan işleri yapabilir misiniz?',
    examples: 'Yaprak tırmıklama, bahçe temizliği veya itmeli çim biçme',
    weight: 4.50
  },
  {
    number: 10,
    id: 'sexual_relations',
    group: 'Orta Düzey Aktivite ve Yürüme',
    question: 'Cinsel ilişkide bulunabilir misiniz?',
    examples: 'Orta düzey kardiyovasküler efor eşdeğeri',
    weight: 5.25
  },
  {
    number: 5,
    id: 'run_short',
    group: 'Yorucu Fiziksel ve Sportif Aktiviteler',
    question: 'Kısa bir mesafe koşabilir misiniz?',
    examples: 'Örneğin otobüse yetişmek için kısa süreli koşu',
    weight: 8.00
  },
  {
    number: 8,
    id: 'heavy_housework',
    group: 'Yorucu Fiziksel ve Sportif Aktiviteler',
    question: 'Ağır ev işleri yapabilir misiniz?',
    examples: 'Zemin ovma/silme veya ağır mobilya kaldırma / yerini değiştirme',
    weight: 8.00
  },
  {
    number: 11,
    id: 'moderate_recreation',
    group: 'Yorucu Fiziksel ve Sportif Aktiviteler',
    question: 'Orta düzeyde rekreasyonel veya sportif aktivitelere katılabilir misiniz?',
    examples: 'Golf, bowling, dans, çiftler tenisi veya top atıp tutma',
    weight: 6.00
  },
  {
    number: 12,
    id: 'strenuous_sports',
    group: 'Yorucu Fiziksel ve Sportif Aktiviteler',
    question: 'Yorucu veya ağır sporlara katılabilir misiniz?',
    examples: 'Yüzme, tekler tenisi, futbol, basketbol veya kayak',
    weight: 7.50
  }
];

const ORDERED_DASI_ITEMS = [...DASI_ITEMS].sort((a, b) => a.number - b.number);
const DASI_GROUPS: DasiItem['group'][] = [
  'Günlük Özbakım ve Ev İçi',
  'Orta Düzey Aktivite ve Yürüme',
  'Yorucu Fiziksel ve Sportif Aktiviteler'
];

const MAX_DASI_SCORE = 58.2;

export const DasiCalculator: React.FC<DasiCalculatorProps> = ({ isDark }) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const item of ORDERED_DASI_ITEMS) {
      initial[item.id] = false;
    }
    return initial;
  });
  const [copied, setCopied] = useState(false);
  const [showReferences, setShowReferences] = useState(false);

  const toggleAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const setAllAnswers = (value: boolean) => {
    const next: Record<string, boolean> = {};
    for (const item of ORDERED_DASI_ITEMS) {
      next[item.id] = value;
    }
    setAnswers(next);
  };

  const applyModerateBaseline = () => {
    // Tipik bağımsız, 1 kat merdiven çıkabilen ancak ağır spor yapmayan hasta profili (DASI = 28.20, ~6.2 METs)
    setAnswers({
      self_care: true,
      walk_indoors: true,
      walk_blocks: true,
      climb_stairs: true,
      run_short: false,
      light_housework: true,
      moderate_housework: true,
      heavy_housework: false,
      yard_work: true,
      sexual_relations: true,
      moderate_recreation: false,
      strenuous_sports: false
    });
  };

  const dasiScore = useMemo(() => {
    return ORDERED_DASI_ITEMS.reduce(
      (sum, item) => sum + (answers[item.id] ? item.weight : 0),
      0
    );
  }, [answers]);

  const yesCount = useMemo(
    () => ORDERED_DASI_ITEMS.filter((item) => answers[item.id]).length,
    [answers]
  );

  // Hlatky et al. 1989 validated linear formulas:
  // VO2peak (mL/kg/dk) = 0.43 * DASI + 9.6
  // METs = VO2peak / 3.5
  const vo2Peak = 0.43 * dasiScore + 9.6;
  const mets = vo2Peak / 3.5;

  // Risk stratification combining classic 4 MET threshold (DASI < 10.23) and Wijeysundera METS study (DASI <= 34)
  const riskTier = useMemo(() => {
    if (mets < 4.0) {
      return {
        id: 'poor' as const,
        label: 'Düşük Fonksiyonel Kapasite (< 4.0 METs)',
        shortStatus: 'Yüksek Risk / Kısıtlı Rezerv',
        summary:
          'Tahmini VO₂peak < 14 mL/kg/dk düzeyindedir. Hasta perioperatif kardiyopulmoner stres altında belirgin komplikasyon, miyokard hasarı (MINS) ve mortalite riski taşır.',
        actions: [
          'Acil olmayan yüksek/orta riskli cerrahilerde 2024 AHA/ACC ve 2022 ESC kılavuzlarına göre kardiyoloji/dahiliye optimizasyonu değerlendirin.',
          'Gerekli olgularda BNP/NT-proBNP, yüksek duyarlıklı troponin (hs-cTn), istirahat EKO veya farmakolojik stres testi / KPET planlayın.',
          'İntraoperatif invaziv arteriyel monitörizasyon, hedeflenmiş hemodinami (MAP ≥ 65 mmHg) ve postop yakın izlem (YBÜ/yüksek bakım) hazırlığı yapın.'
        ]
      };
    }
    if (dasiScore <= 34.0) {
      return {
        id: 'intermediate' as const,
        label: 'Sınırda / Orta Rezerv (DASI ≤ 34 · METS Eşiği)',
        shortStatus: 'METS Çalışması Artmış Risk Bandı',
        summary:
          'Klasik 4 METs barajı aşılmış görünse de prospektif METS çalışmasında (Lancet 2018) DASI ≤ 34 puanı, majör cerrahi sonrası 30 günlük ölüm/MI ve MINS riskinde anlamlı artışla ilişkili bulunmuştur.',
        actions: [
          'Tek başına subjektif "4 METs yapabiliyor" ifadesine güvenerek ileri kardiyak risk değerlendirmesini ekarte etmeyin.',
          'RCRI ≥ 1 veya yüksek riskli majör cerrahi varsa preoperatif BNP/NT-proBNP ve bazal/postop troponin takibini değerlendirin.',
          'Anemi, hipertansiyon, diyabet ve ilaç optimizasyonunu tamamlayarak hemodinamik dalgalanmalardan kaçının.'
        ]
      };
    }
    return {
      id: 'good' as const,
      label: 'İyi Fonksiyonel Kapasite (DASI > 34)',
      shortStatus: 'Yeterli Kardiyopulmoner Rezerv',
      summary:
        'DASI > 34 (tahmini ≥ 7.0 METs) düzeyi majör cerrahi öncesi güçlü aerobik kapasiteyi ve düşük fonksiyonel kaynaklı kardiyovasküler komplikasyon riskini gösterir.',
      actions: [
        'Aktif veya kararsız kardiyak semptom (anjina, dekompanse KY, ciddi kapak darlığı, kontrolsüz aritmi) yoksa ek fonksiyonel test olmaksızın cerrahiye ilerlenebilir.',
        'Rutin standart anestezi ve cerrahiye özgü risk profilaksisi uygulanır.'
      ]
    };
  }, [dasiScore, mets]);

  const progressPct = Math.min(100, (dasiScore / MAX_DASI_SCORE) * 100);
  const fourMetMarkerPct = (10.23 / MAX_DASI_SCORE) * 100; // ~17.6%
  const mets34MarkerPct = (34.0 / MAX_DASI_SCORE) * 100; // ~58.4%

  const handleCopySummary = () => {
    const positiveQuestions = ORDERED_DASI_ITEMS.filter((i) => answers[i.id])
      .map((i) => `${i.number}. ${i.question} (+${i.weight.toFixed(2)})`)
      .join('\n  - ');

    const text = `[DUKE ACTIVITY STATUS INDEX (DASI) FONKSİYONEL KAPASİTE RAPORU]
DASI Toplam Skoru: ${dasiScore.toFixed(2)} / 58.20 (${yesCount}/12 madde Evet)
Tahmini VO2peak: ${vo2Peak.toFixed(1)} mL/kg/dk (0.43 × DASI + 9.6)
Tahmini Fonksiyonel Kapasite: ${mets.toFixed(2)} METs (VO2peak / 3.5)
Klinik Değerlendirme: ${riskTier.label} — ${riskTier.shortStatus}
Özet: ${riskTier.summary}
Yapılabilen Aktiviteler:
${positiveQuestions ? `  - ${positiveQuestions}` : '  - Hiçbir aktivite işaretlenmedi (0 puan)'}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div
      className={`rounded-xl border transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}
    >
      {/* Top Header */}
      <div
        className={`p-5 sm:p-6 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
          isDark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50/70'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-lg border shrink-0 ${
              isDark
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                : 'bg-cyan-50 border-cyan-200 text-cyan-700'
            }`}
          >
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <div
              className={`text-[11px] font-mono flex flex-wrap items-center gap-x-2 gap-y-0.5 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-cyan-700 font-semibold'}>
                Preoperatif Fonksiyonel Kapasite
              </span>
              <span aria-hidden="true">·</span>
              <span>12 Maddeli DASI Ölçeği</span>
              <span aria-hidden="true">·</span>
              <span>Hlatky 1989 &amp; METS Study 2018</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-0.5">
              Duke Activity Status Index (DASI) Hesaplayıcı
            </h2>
            <p className={`text-xs mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Hastanın günlük fiziksel aktiviteleri üzerinden objektif puan, tahmini pik oksijen tüketimi (VO₂peak) ve METs değerini hesaplar; subjektif 4 METs sorgusunun aksine prospektif kanıtlı risk eşiklerini uygular.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={applyModerateBaseline}
            className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Örnek Profil (Orta)
          </button>
          <button
            type="button"
            onClick={() => setAllAnswers(true)}
            className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Tümü Evet
          </button>
          <button
            type="button"
            onClick={() => setAllAnswers(false)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Main Split Workspace */}
      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 12-Item Interactive Questionnaire (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {DASI_GROUPS.map((groupName) => {
            const groupItems = DASI_ITEMS.filter((item) => item.group === groupName);
            return (
              <div key={groupName} className="space-y-2.5">
                <div className="flex items-center justify-between border-b pb-1.5 border-slate-200 dark:border-slate-800">
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {groupName}
                  </h3>
                  <span className="text-[11px] font-mono tabular-nums text-slate-500">
                    {groupItems.filter((i) => answers[i.id]).length}/{groupItems.length} Evet
                  </span>
                </div>

                <div className="space-y-2">
                  {groupItems.map((item) => {
                    const isYes = Boolean(answers[item.id]);
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-lg border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isYes
                            ? isDark
                              ? 'bg-cyan-950/20 border-cyan-500/40'
                              : 'bg-cyan-50/60 border-cyan-300'
                            : isDark
                            ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                            : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`text-xs font-mono tabular-nums font-bold shrink-0 ${
                                isYes
                                  ? isDark
                                    ? 'text-cyan-400'
                                    : 'text-cyan-700'
                                  : isDark
                                  ? 'text-slate-500'
                                  : 'text-slate-400'
                              }`}
                            >
                              {String(item.number).padStart(2, '0')}.
                            </span>
                            <span className="text-xs sm:text-sm font-semibold leading-snug">
                              {item.question}
                            </span>
                          </div>
                          <p
                            className={`text-[11px] pl-6 leading-relaxed ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {item.examples}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 pl-6 sm:pl-0">
                          <button
                            type="button"
                            onClick={() => toggleAnswer(item.id, false)}
                            className={`px-3 py-2 rounded-md border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              !isYes
                                ? isDark
                                  ? 'bg-slate-800 border-slate-600 text-slate-100'
                                  : 'bg-slate-800 border-slate-800 text-white'
                                : isDark
                                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Hayır (0)
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleAnswer(item.id, true)}
                            className={`px-3 py-2 rounded-md border text-xs font-semibold font-mono tabular-nums transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isYes
                                ? isDark
                                  ? 'bg-cyan-600 border-cyan-500 text-white'
                                  : 'bg-cyan-700 border-cyan-700 text-white'
                                : isDark
                                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-400'
                            }`}
                          >
                            Evet (+{item.weight.toFixed(2)})
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Telemetry Readouts & Clinical Interpretation (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
          {/* Numeric Telemetry Panel */}
          <div
            className={`rounded-xl border p-5 space-y-4 ${
              riskTier.id === 'poor'
                ? isDark
                  ? 'bg-rose-950/20 border-rose-500/40'
                  : 'bg-rose-50/70 border-rose-300'
                : riskTier.id === 'intermediate'
                ? isDark
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-amber-50/70 border-amber-300'
                : isDark
                ? 'bg-emerald-950/20 border-emerald-500/40'
                : 'bg-emerald-50/70 border-emerald-300'
            }`}
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  HESAPLANAN FONKSİYONEL PROFİL
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {riskTier.id === 'poor' ? (
                    <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                  ) : riskTier.id === 'intermediate' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                  <span
                    className={`text-sm font-bold ${
                      riskTier.id === 'poor'
                        ? 'text-rose-700 dark:text-rose-300'
                        : riskTier.id === 'intermediate'
                        ? 'text-amber-800 dark:text-amber-300'
                        : 'text-emerald-800 dark:text-emerald-300'
                    }`}
                  >
                    {riskTier.label}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopySummary}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Özeti Kopyala'}</span>
              </button>
            </div>

            {/* 3 Primary Calibrated Readouts */}
            <div className="grid grid-cols-3 gap-2.5">
              <div
                className={`rounded-lg border p-3 ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  DASI Skoru
                </div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums">
                    {dasiScore.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 ml-1">/58.2</span>
                </div>
              </div>

              <div
                className={`rounded-lg border p-3 ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  VO₂peak
                </div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-cyan-600 dark:text-cyan-400">
                    {vo2Peak.toFixed(1)}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 ml-1">mL/kg/dk</span>
                </div>
              </div>

              <div
                className={`rounded-lg border p-3 ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Tahmini METs
                </div>
                <div className="mt-1 flex items-baseline">
                  <span
                    className={`text-xl sm:text-2xl font-bold font-mono tabular-nums ${
                      riskTier.id === 'poor'
                        ? 'text-rose-600 dark:text-rose-400'
                        : riskTier.id === 'intermediate'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {mets.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 ml-1">METs</span>
                </div>
              </div>
            </div>

            {/* Calibrated Linear Threshold Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                <span>0</span>
                <span>4 MET (10.2)</span>
                <span>METS Eşiği (34.0)</span>
                <span>58.2</span>
              </div>
              <div
                className={`relative h-2.5 rounded-full overflow-hidden ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`h-full transition-all duration-200 ${
                    riskTier.id === 'poor'
                      ? 'bg-rose-500'
                      : riskTier.id === 'intermediate'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
                {/* 4 MET Threshold Marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white/80"
                  style={{ left: `${fourMetMarkerPct}%` }}
                  title="4.0 MET Eşiği (DASI 10.23)"
                />
                {/* Wijeysundera DASI 34 Threshold Marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white/80"
                  style={{ left: `${mets34MarkerPct}%` }}
                  title="METS Çalışması Yüksek Risk Eşiği (DASI 34.0)"
                />
              </div>
            </div>

            {/* Clinical Guidance */}
            <div
              className={`rounded-lg border p-3.5 space-y-2 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white/90 border-slate-200'
              }`}
            >
              <div className="text-xs font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>{riskTier.shortStatus}</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {riskTier.summary}
              </p>
              <ul className="space-y-1.5 pt-1">
                {riskTier.actions.map((act, idx) => (
                  <li
                    key={idx}
                    className={`text-xs leading-relaxed flex items-start gap-2 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-bold text-cyan-500 mt-0.5">•</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Clinical Pearl: Why DASI > Subjective 4 METs */}
          <div
            className={`rounded-xl border p-4 space-y-2 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold">
              <Info className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>Neden Subjektif "4 MET" Yerine DASI Kullanılmalı?</span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Uluslararası prospektif <strong>METS Çalışması</strong> (<em>Lancet 2018</em>, 1.401 hasta), hekimin subjektif değerlendirmesinin kötü kondisyonu saptamada yalnızca <strong>%19.2 duyarlılığa</strong> sahip olduğunu ve postoperatif komplikasyonları öngöremediğini gösterdi. Yapılandırılmış <strong>DASI skoru</strong> ise özellikle <strong>≤ 34 eşiği</strong> altında 30 günlük mortalite/MI ve orta-ciddi komplikasyonları bağımsız olarak öngörür (2024 AHA/ACC Perioperatif Kılavuzu Sınıf 2a önerisi).
            </p>
          </div>

          {/* Formulas & Literature Accordion */}
          <div
            className={`rounded-xl border overflow-hidden ${
              isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setShowReferences((prev) => !prev)}
              className={`w-full px-4 py-3 flex items-center justify-between text-xs font-semibold cursor-pointer transition-colors ${
                isDark ? 'hover:bg-slate-800/60 text-slate-200' : 'hover:bg-slate-50 text-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-500" />
                <span>Formüller &amp; Bilimsel Kanıtlar (PubMed / DOI)</span>
              </span>
              {showReferences ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showReferences && (
              <div
                className={`px-4 pb-4 pt-2 border-t space-y-3 text-xs ${
                  isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
                }`}
              >
                <div
                  className={`p-3 rounded-lg font-mono text-[11px] space-y-1 ${
                    isDark ? 'bg-slate-900 text-cyan-300' : 'bg-slate-50 text-cyan-900'
                  }`}
                >
                  <div>DASI = Σ(Evet işaretlenen maddelerin puanı) [0 – 58.20]</div>
                  <div>VO₂peak (mL/kg/dk) = 0.43 × DASI + 9.6</div>
                  <div>METs = VO₂peak / 3.5</div>
                  <div>4.0 METs eşiği ≈ DASI 10.23 · METS risk eşiği = DASI ≤ 34</div>
                </div>

                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <div className="font-semibold">
                      1. Orijinal DASI Türetme ve Doğrulama Çalışması (Hlatky et al., 1989)
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Hlatky MA, Boineau RE, Higginbotham MB, et al. A brief self-administered questionnaire to determine functional capacity (the Duke Activity Status Index). <em>Am J Cardiol</em>. 1989;64(10):651–654.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      <a
                        href="https://pubmed.ncbi.nlm.nih.gov/2782256/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        <span>PubMed · 2782256</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://doi.org/10.1016/0002-9149(89)90496-7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        <span>DOI: 10.1016/0002-9149(89)90496-7</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="font-semibold">
                      2. Uluslararası Prospektif METS Çalışması (Wijeysundera et al., 2018)
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Wijeysundera DN, Pearse RM, Shulman MA, et al. Assessment of functional capacity before major non-cardiac surgery: an international, prospective cohort study. <em>Lancet</em>. 2018;391(10140):2631–2640.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      <a
                        href="https://pubmed.ncbi.nlm.nih.gov/30070222/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        <span>PubMed · 30070222</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href="https://doi.org/10.1016/S0140-6736(18)31131-0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        <span>DOI: 10.1016/S0140-6736(18)31131-0</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DasiCalculator;
