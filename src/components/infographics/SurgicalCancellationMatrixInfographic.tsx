import React, { useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Clock,
  Copy,
  Filter,
  Info,
  Lightbulb,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
  XCircle
} from 'lucide-react';
import {
  CANCELLATION_CRITERIA,
  CANCELLATION_GUIDELINE_REFS,
  CLINICAL_SCENARIO_PRESETS,
  CancellationCriterion,
  DECISION_TYPES,
  DecisionType,
  SYSTEM_CATEGORIES,
  SystemCategory,
  URGENCY_MODES,
  UrgencyMode
} from '../../data/cancellationCriteriaData';
import { PortalLink } from '../common/PortalLink';
import { copyToClipboard } from '../../utils/deepLink';

interface SurgicalCancellationMatrixInfographicProps {
  isDark: boolean;
}

const INITIAL_VISIBLE_LIMIT = 10;

function normalizeTr(text: string): string {
  return (text || '').toLocaleLowerCase('tr-TR');
}

function getDecisionStyles(decision: DecisionType, isDark: boolean) {
  switch (decision) {
    case 'Kesin Erteleme':
      return {
        badge: isDark
          ? 'bg-rose-500/15 text-rose-300 border-rose-500/35'
          : 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        shortLabel: 'Kesin Erteleme',
        icon: XCircle
      };
    case 'Optimizasyon Gerekli':
      return {
        badge: isDark
          ? 'bg-amber-500/15 text-amber-300 border-amber-500/35'
          : 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        shortLabel: 'Optimizasyon',
        icon: AlertTriangle
      };
    case 'İptal Nedeni Değil':
    default:
      return {
        badge: isDark
          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        shortLabel: 'İptal Nedeni Değil',
        icon: CheckCircle2
      };
  }
}

function getUrgencyTone(urgency: UrgencyMode, isDark: boolean) {
  switch (urgency) {
    case 'acil':
      return {
        activeBtn: isDark
          ? 'bg-rose-500/20 text-rose-200 border-rose-500/50 shadow-xs'
          : 'bg-rose-600 text-white border-rose-600 shadow-xs',
        cardBorder: isDark ? 'border-rose-500/50 bg-rose-500/10' : 'border-rose-300 bg-rose-50/70',
        tag: isDark ? 'bg-rose-500/25 text-rose-200' : 'bg-rose-600 text-white',
        noteBox: isDark
          ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          : 'bg-rose-50 border-rose-200 text-rose-900'
      };
    case 'ivedi':
      return {
        activeBtn: isDark
          ? 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-xs'
          : 'bg-amber-600 text-white border-amber-600 shadow-xs',
        cardBorder: isDark ? 'border-amber-500/50 bg-amber-500/10' : 'border-amber-300 bg-amber-50/70',
        tag: isDark ? 'bg-amber-500/25 text-amber-200' : 'bg-amber-600 text-white',
        noteBox: isDark
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
          : 'bg-amber-50 border-amber-200 text-amber-900'
      };
    case 'zamana':
      return {
        activeBtn: isDark
          ? 'bg-sky-500/20 text-sky-200 border-sky-500/50 shadow-xs'
          : 'bg-sky-600 text-white border-sky-600 shadow-xs',
        cardBorder: isDark ? 'border-sky-500/50 bg-sky-500/10' : 'border-sky-300 bg-sky-50/70',
        tag: isDark ? 'bg-sky-500/25 text-sky-200' : 'bg-sky-600 text-white',
        noteBox: isDark
          ? 'bg-sky-500/10 border-sky-500/30 text-sky-200'
          : 'bg-sky-50 border-sky-200 text-sky-900'
      };
    case 'elektif':
    default:
      return {
        activeBtn: isDark
          ? 'bg-teal-500/20 text-teal-200 border-teal-500/50 shadow-xs'
          : 'bg-teal-600 text-white border-teal-600 shadow-xs',
        cardBorder: isDark ? 'border-teal-500/50 bg-teal-500/10' : 'border-teal-300 bg-teal-50/70',
        tag: isDark ? 'bg-teal-500/25 text-teal-200' : 'bg-teal-600 text-white',
        noteBox: isDark
          ? 'bg-teal-500/10 border-teal-500/30 text-teal-200'
          : 'bg-teal-50 border-teal-200 text-teal-900'
      };
  }
}

export const SurgicalCancellationMatrixInfographic: React.FC<
  SurgicalCancellationMatrixInfographicProps
> = ({ isDark }) => {
  const [urgency, setUrgency] = useState<UrgencyMode>('elektif');
  const [category, setCategory] = useState<SystemCategory | 'Tümü'>('Tümü');
  const [decisionFilter, setDecisionFilter] = useState<DecisionType | 'Tümü'>('Tümü');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>('c8');
  const [showAll, setShowAll] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [copiedNote, setCopiedNote] = useState(false);
  const [showReferences, setShowReferences] = useState(false);

  const detailRef = useRef<HTMLDivElement | null>(null);

  const countsByDecision = useMemo(() => {
    const counts: Record<DecisionType, number> = {
      'Kesin Erteleme': 0,
      'Optimizasyon Gerekli': 0,
      'İptal Nedeni Değil': 0
    };
    CANCELLATION_CRITERIA.forEach((c) => {
      counts[c.decision] += 1;
    });
    return counts;
  }, []);

  const countsByCategory = useMemo(() => {
    const map: Record<string, number> = { Tümü: CANCELLATION_CRITERIA.length };
    SYSTEM_CATEGORIES.forEach((cat) => {
      map[cat] = CANCELLATION_CRITERIA.filter((c) => c.category === cat).length;
    });
    return map;
  }, []);

  const filteredCriteria = useMemo(() => {
    const tokens = normalizeTr(query.trim()).split(/\s+/).filter(Boolean);
    return CANCELLATION_CRITERIA.filter((item) => {
      if (category !== 'Tümü' && item.category !== category) return false;
      if (decisionFilter !== 'Tümü' && item.decision !== decisionFilter) return false;
      if (tokens.length === 0) return true;

      const haystack = normalizeTr(
        [
          item.title,
          item.category,
          item.threshold,
          item.shortThreshold,
          item.waitDuration,
          item.rationale,
          item.clinicalPearl,
          item.guideline,
          item.evidenceLevel,
          item.plans.elektif,
          item.plans.zamana,
          item.plans.ivedi,
          item.plans.acil,
          ...(item.keywords || [])
        ].join(' ')
      );
      return tokens.every((t) => haystack.includes(t));
    });
  }, [category, decisionFilter, query]);

  const hasActiveFilter =
    category !== 'Tümü' || decisionFilter !== 'Tümü' || query.trim().length > 0;

  const selectedCriterion: CancellationCriterion | undefined = useMemo(() => {
    if (filteredCriteria.length === 0) {
      return CANCELLATION_CRITERIA.find((c) => c.id === selectedId) || CANCELLATION_CRITERIA[0];
    }
    const foundInFiltered = filteredCriteria.find((c) => c.id === selectedId);
    return foundInFiltered || filteredCriteria[0];
  }, [filteredCriteria, selectedId]);

  const visibleCriteria = useMemo(() => {
    if (hasActiveFilter || showAll || filteredCriteria.length <= INITIAL_VISIBLE_LIMIT) {
      return filteredCriteria;
    }
    const sliced = filteredCriteria.slice(0, INITIAL_VISIBLE_LIMIT);
    if (selectedCriterion && !sliced.some((item) => item.id === selectedCriterion.id)) {
      return [...sliced.slice(0, INITIAL_VISIBLE_LIMIT - 1), selectedCriterion];
    }
    return sliced;
  }, [filteredCriteria, hasActiveFilter, showAll, selectedCriterion]);

  const pinnedCriteria = useMemo(
    () =>
      pinnedIds
        .map((id) => CANCELLATION_CRITERIA.find((c) => c.id === id))
        .filter((c): c is CancellationCriterion => Boolean(c)),
    [pinnedIds]
  );

  // Çoklu bulgu vaka sentezi (seçili aciliyet moduna duyarlı)
  const caseSynthesis = useMemo(() => {
    if (pinnedCriteria.length === 0) return null;

    const hasHardDefer = pinnedCriteria.some((c) => c.decision === 'Kesin Erteleme');
    const hasOptimization = pinnedCriteria.some((c) => c.decision === 'Optimizasyon Gerekli');

    if (urgency === 'acil') {
      return {
        tone: 'rose' as const,
        headline: 'ACİL CERRAHİ (<2 SAAT) — ERTELEME YOK · YÜKSEK RİSKLİ YÖNETİM',
        subtext:
          'Yaşam/uzuv kurtarıcı cerrahi geciktirilmez. Seçili bulgulara yönelik eşzamanlı intraoperatif resüsitasyon ve koruyucu protokoller derhal devreye alınmalıdır.'
      };
    }

    if (urgency === 'ivedi') {
      if (hasHardDefer || hasOptimization) {
        return {
          tone: 'amber' as const,
          headline: 'İVEDİ CERRAHİ (2–24 SAAT) — HIZLI HEDEFLİ OPTİMİZASYON SONRASI AL',
          subtext:
            '2–24 saatlik pencerede kritik metabolik, hemodinamik veya hemostatik riskleri hızla stabilize edip (ekstrem gecikme yaratmadan) işleme alın.'
        };
      }
      return {
        tone: 'emerald' as const,
        headline: 'İVEDİ CERRAHİ — İŞLEME ALINABİLİR (EK ENGEL YOK)',
        subtext: 'Seçili bulgular tek başına ameliyat erteleme veya iptal kriteri oluşturmamaktadır.'
      };
    }

    if (urgency === 'zamana') {
      if (hasHardDefer) {
        return {
          tone: 'rose' as const,
          headline: 'ZAMANA DUYARLI CERRAHİ — MULTİDİSİPLİNER KONSEY & KISA OPTİMİZASYON',
          subtext:
            'En az bir yüksek riskli kriter mevcut. Cerrahi–anestezi–ilgili branş ortak kararıyla hedeflenmiş stabilizasyon ve en güvenli zaman penceresi belirlenmelidir.'
        };
      }
      if (hasOptimization) {
        return {
          tone: 'amber' as const,
          headline: 'ZAMANA DUYARLI CERRAHİ — HEDEFLENMİŞ OPTİMİZASYON İLE İLERLE',
          subtext:
            'Onkolojik/zamana duyarlı süreci gereksiz geciktirmeden kısa süreli optimizasyon ve perioperatif önlemlerle cerrahi planlanabilir.'
        };
      }
      return {
        tone: 'emerald' as const,
        headline: 'ZAMANA DUYARLI CERRAHİ — İŞLEME ALINABİLİR',
        subtext: 'Seçili bulgular cerrahiyi erteleme veya iptal nedeni değildir.'
      };
    }

    // Elektif
    if (hasHardDefer) {
      return {
        tone: 'rose' as const,
        headline: 'ELEKTİF CERRAHİ — KESİN ERTELEME GEREKLİ',
        subtext:
          'Seçili bulgular arasında mutlak erteleme kriteri bulunmaktadır. İlgili bekleme/stabilizasyon süreci tamamlanmadan elektif anestezi indüksiyonu yapılmamalıdır.'
      };
    }
    if (hasOptimization) {
      return {
        tone: 'amber' as const,
        headline: 'ELEKTİF CERRAHİ — PREOPERATİF OPTİMİZASYON GEREKLİ',
        subtext:
          'Hasta elektif ameliyat öncesinde hedeflenmiş medikal/metabolik optimizasyon veya risk stratifikasyonundan (örn. POCUS, IV demir, glisemik/KB regülasyonu) fayda görecektir.'
      };
    }
    return {
      tone: 'emerald' as const,
      headline: 'ELEKTİF CERRAHİ — İPTAL NEDENİ YOK, İŞLEME ALINABİLİR',
      subtext:
        'Seçili bulgular güncel kılavuzlara göre tek başına ameliyat iptali gerektirmez; rutin perioperatif önlemlerle güvenle ilerlenebilir.'
    };
  }, [pinnedCriteria, urgency]);

  const activeUrgencyMeta = URGENCY_MODES.find((u) => u.id === urgency) || URGENCY_MODES[0];
  const activeUrgencyTone = getUrgencyTone(urgency, isDark);

  const togglePin = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPinnedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const applyPreset = (presetId: string) => {
    const preset = CLINICAL_SCENARIO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setUrgency(preset.urgency);
    setPinnedIds(preset.criterionIds);
    setSelectedId(preset.criterionIds[0]);
    setCategory('Tümü');
    setDecisionFilter('Tümü');
    setQuery('');
  };

  const resetFilters = () => {
    setCategory('Tümü');
    setDecisionFilter('Tümü');
    setQuery('');
  };

  const handleSelectItem = (id: string) => {
    setSelectedId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyCaseNote = async () => {
    if (!caseSynthesis || pinnedCriteria.length === 0) return;
    const lines: string[] = [
      'PREOPERATİF ERTELEME / İPTAL DEĞERLENDİRME ÖZETİ',
      `Cerrahi Aciliyet: ${activeUrgencyMeta.label} (${activeUrgencyMeta.timeWindow})`,
      `Baskın Karar: ${caseSynthesis.headline}`,
      '',
      'Değerlendirilen Bulgular:'
    ];
    pinnedCriteria.forEach((c, idx) => {
      lines.push(
        `${idx + 1}. ${c.title} [${c.decision}]`,
        `   • Eşik / Bekleme: ${c.shortThreshold} | ${c.waitDuration}`,
        `   • Eylem (${activeUrgencyMeta.shortLabel}): ${c.plans[urgency]}`,
        `   • Kılavuz: ${c.guideline}`
      );
    });
    lines.push('', 'Kaynak: Şişli Hamidiye Etfal Anestezi Asistan Portalı');

    const ok = await copyToClipboard(lines.join('\n'));
    if (ok) {
      setCopiedNote(true);
      setTimeout(() => setCopiedNote(false), 2200);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. Üst Klinik Özet Başlığı */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 ${
          isDark
            ? 'bg-slate-900/95 border-slate-800'
            : 'bg-slate-50/90 border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                  isDark
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                    : 'bg-teal-50 text-teal-700 border border-teal-200'
                }`}
              >
                AHA/ACC 2024 · ESC 2022 · ESAIC · ASA
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {CANCELLATION_CRITERIA.length} Klinik Kriter · 6 Organ Sistemi · 4 Aciliyet Düzeyi
              </span>
            </div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ameliyat Erteleme ve İptal Kriterleri Karar Matrisi
            </h3>
            <p className={`text-xs sm:text-[13px] max-w-3xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Preoperatif poliklinik ve ameliyathane sabahı kararları için sistem bazlı kılavuz eşikleri, fizyopatolojik gerekçeler, salon incileri ve 4 kademeli cerrahi aciliyete göre dinamik eylem planları.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div
              className={`px-2.5 py-1.5 rounded-xl border text-center min-w-[76px] ${
                isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'
              }`}
            >
              <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400">
                {countsByDecision['Kesin Erteleme']}
              </div>
              <div className="text-[10px] font-semibold text-rose-700 dark:text-rose-300">Erteleme</div>
            </div>
            <div
              className={`px-2.5 py-1.5 rounded-xl border text-center min-w-[76px] ${
                isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="text-sm font-bold font-mono text-amber-600 dark:text-amber-400">
                {countsByDecision['Optimizasyon Gerekli']}
              </div>
              <div className="text-[10px] font-semibold text-amber-800 dark:text-amber-300">Optimizasyon</div>
            </div>
            <div
              className={`px-2.5 py-1.5 rounded-xl border text-center min-w-[76px] ${
                isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {countsByDecision['İptal Nedeni Değil']}
              </div>
              <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">İptal Yok</div>
            </div>
            <PortalLink
              href="#infografik=surgical-urgency-2024"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-teal-500" />
              <span>Aciliyet Rehberi</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </PortalLink>
          </div>
        </div>
      </div>

      {/* 2. Kontrol Güvertesi (Aciliyet + Sistem + Karar + Arama + Örnek Vaka) */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 space-y-4 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        {/* 2A. 4 Kademeli AHA/ACC 2024 Cerrahi Aciliyet Seçici */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <CalendarClock className="w-3.5 h-3.5 text-teal-500" />
              Cerrahi Aciliyet Düzeyi (AHA/ACC 2024)
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Seçim tüm kartların eylem planını ve çoklu vaka kararını canlı günceller
            </span>
          </div>

          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-2"
            role="tablist"
            aria-label="Cerrahi aciliyet düzeyi"
          >
            {URGENCY_MODES.map((mode) => {
              const isActive = urgency === mode.id;
              const tone = getUrgencyTone(mode.id, isDark);
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setUrgency(mode.id)}
                  className={`px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? tone.activeBtn
                      : isDark
                        ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{mode.label}</div>
                  <div
                    className={`text-[10px] font-mono mt-0.5 ${
                      isActive
                        ? 'opacity-90'
                        : isDark
                          ? 'text-slate-400'
                          : 'text-slate-500'
                    }`}
                  >
                    {mode.timeWindow}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className={`rounded-xl border px-3.5 py-2 text-xs leading-relaxed flex items-start gap-2 ${activeUrgencyTone.noteBox}`}
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong className="font-semibold">{activeUrgencyMeta.label}:</strong>{' '}
              {activeUrgencyMeta.clinicalNote}
            </span>
          </div>
        </div>

        {/* 2B. Sistem / Kategori Filtresi */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Sistem / Kategori
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Sistem kategorisi">
            {(['Tümü', ...SYSTEM_CATEGORIES] as const).map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? isDark
                        ? 'bg-sky-500/20 text-sky-200 border-sky-500/50'
                        : 'bg-slate-900 text-white border-slate-900'
                      : isDark
                        ? 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-800'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      active
                        ? isDark
                          ? 'bg-sky-500/25 text-sky-100'
                          : 'bg-white/20 text-white'
                        : isDark
                          ? 'bg-slate-700 text-slate-400'
                          : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {countsByCategory[cat]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2C. Karar Türü + Arama + Örnek Senaryolar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Karar türü">
            {(['Tümü', ...DECISION_TYPES] as const).map((dec) => {
              const active = decisionFilter === dec;
              const decStyles = dec !== 'Tümü' ? getDecisionStyles(dec, isDark) : null;
              return (
                <button
                  key={dec}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setDecisionFilter(dec)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? dec === 'Tümü'
                        ? isDark
                          ? 'bg-slate-700 text-white border-slate-500'
                          : 'bg-slate-800 text-white border-slate-800'
                        : decStyles?.badge
                      : isDark
                        ? 'bg-slate-800/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {decStyles && <span className={`w-1.5 h-1.5 rounded-full ${decStyles.dot}`} />}
                  <span>{dec === 'Tümü' ? 'Tüm Kararlar' : decStyles?.shortLabel}</span>
                </button>
              );
            })}
            {hasActiveFilter && (
              <button
                type="button"
                onClick={resetFilters}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border inline-flex items-center gap-1 cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Sıfırla</span>
              </button>
            )}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Durum, eşik, ilaç veya kılavuz ara..."
              aria-label="Klinik kriter ara"
              className={`w-full pl-9 pr-8 py-2 rounded-xl border text-xs outline-none transition-colors ${
                isDark
                  ? 'bg-slate-950/70 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-teal-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-500'
              }`}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Aramayı temizle"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2D. Tek Tık Çoklu Vaka Test Senaryoları */}
        <div
          className={`pt-3 border-t flex flex-wrap items-center gap-2 ${
            isDark ? 'border-slate-800' : 'border-slate-100'
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Çoklu Vaka Örneği Dene:
          </span>
          {CLINICAL_SCENARIO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id)}
              title={preset.summary}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-200'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-400 hover:bg-teal-50/50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. CANLI ÇOKLU BULGU VAKA KARAR SENTEZİ (Kullanıcı ≥1 bulgu işaretlediğinde görünür) */}
      {caseSynthesis && pinnedCriteria.length > 0 && (
        <div
          className={`rounded-2xl border p-4 sm:p-5 space-y-3 transition-all ${
            caseSynthesis.tone === 'rose'
              ? isDark
                ? 'bg-rose-950/30 border-rose-500/40'
                : 'bg-rose-50/80 border-rose-300'
              : caseSynthesis.tone === 'amber'
                ? isDark
                  ? 'bg-amber-950/25 border-amber-500/40'
                  : 'bg-amber-50/80 border-amber-300'
                : isDark
                  ? 'bg-emerald-950/25 border-emerald-500/40'
                  : 'bg-emerald-50/80 border-emerald-300'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    caseSynthesis.tone === 'rose'
                      ? 'bg-rose-600 text-white'
                      : caseSynthesis.tone === 'amber'
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-600 text-white'
                  }`}
                >
                  Çoklu Bulgu Vaka Özeti ({pinnedCriteria.length} Bulgu)
                </span>
                <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                  Mod: {activeUrgencyMeta.label} ({activeUrgencyMeta.timeWindow})
                </span>
              </div>
              <h4
                className={`text-sm sm:text-base font-bold ${
                  caseSynthesis.tone === 'rose'
                    ? isDark
                      ? 'text-rose-200'
                      : 'text-rose-900'
                    : caseSynthesis.tone === 'amber'
                      ? isDark
                        ? 'text-amber-200'
                        : 'text-amber-950'
                      : isDark
                        ? 'text-emerald-200'
                        : 'text-emerald-900'
                }`}
              >
                {caseSynthesis.headline}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {caseSynthesis.subtext}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyCaseNote}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  copiedNote
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark
                      ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
                }`}
              >
                {copiedNote ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNote ? 'Not Kopyalandı' : 'Vaka Notunu Kopyala'}</span>
              </button>
              <button
                type="button"
                onClick={() => setPinnedIds([])}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 border-slate-700'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-300'
                }`}
              >
                <X className="w-3.5 h-3.5" />
                <span>Temizle</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {pinnedCriteria.map((item) => {
              const ds = getDecisionStyles(item.decision, isDark);
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    isDark
                      ? 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
                      : 'bg-white/90 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`font-bold leading-snug ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {item.title}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => togglePin(item.id, e)}
                      aria-label={`${item.title} bulgusunu çıkar`}
                      className="text-slate-400 hover:text-rose-500 cursor-pointer shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${ds.badge}`}>
                      {ds.shortLabel}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {item.waitDuration}
                    </span>
                  </div>
                  <p className={`text-[11px] mt-1.5 leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.plans[urgency]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. MASTER - DETAIL KARAR MATRİSİ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* SOL PANEL: Master Kriter Listesi (5 kolon) */}
        <section
          aria-label="Klinik kriter listesi"
          className={`lg:col-span-5 rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div
            className={`px-4 py-3 border-b flex items-center justify-between gap-2 ${
              isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50/70'
            }`}
          >
            <div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Klinik Kriterler
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                İncelemek için seçin · Çoklu vaka için <span className="font-semibold">+ Vaka</span> ekleyin
              </p>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200/70 text-slate-700'
              }`}
            >
              {filteredCriteria.length} kriter
            </span>
          </div>

          {filteredCriteria.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Seçili filtrelerle eşleşen kriter bulunamadı.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 text-teal-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100'
                }`}
              >
                Tüm Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-100'}`}>
              {visibleCriteria.map((item) => {
                const isSelected = selectedCriterion?.id === item.id;
                const isPinned = pinnedIds.includes(item.id);
                const ds = getDecisionStyles(item.decision, isDark);

                return (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    aria-current={isSelected ? 'true' : undefined}
                    onClick={() => handleSelectItem(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectItem(item.id);
                      }
                    }}
                    className={`p-3.5 transition-all cursor-pointer outline-none ${
                      isSelected
                        ? isDark
                          ? 'bg-teal-500/12 border-l-3 border-l-teal-400'
                          : 'bg-teal-50/70 border-l-3 border-l-teal-600'
                        : isDark
                          ? 'hover:bg-slate-800/60 border-l-3 border-l-transparent'
                          : 'hover:bg-slate-50 border-l-3 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-[13px] font-bold leading-snug ${
                          isSelected
                            ? isDark
                              ? 'text-teal-200'
                              : 'text-teal-950'
                            : isDark
                              ? 'text-slate-100'
                              : 'text-slate-900'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border shrink-0 ${ds.badge}`}
                      >
                        {ds.shortLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1.5">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        <span className="font-medium">{item.category}</span>
                        <span className="mx-1.5 opacity-60">•</span>
                        <span>{item.shortThreshold}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => togglePin(item.id, e)}
                        className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border transition-colors cursor-pointer ${
                          isPinned
                            ? isDark
                              ? 'bg-teal-500/20 text-teal-200 border-teal-500/40'
                              : 'bg-teal-600 text-white border-teal-600'
                            : isDark
                              ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400 hover:text-teal-700'
                        }`}
                        title={isPinned ? 'Çoklu vaka özetinden çıkar' : 'Çoklu vaka özetine ekle'}
                      >
                        {isPinned ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        <span>{isPinned ? 'Vakada' : 'Vaka'}</span>
                      </button>
                    </div>

                    <p
                      className={`text-[11px] mt-1.5 leading-relaxed line-clamp-2 ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      <span className="font-semibold opacity-80">{activeUrgencyMeta.shortLabel}:</span>{' '}
                      {item.plans[urgency]}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {!hasActiveFilter && filteredCriteria.length > INITIAL_VISIBLE_LIMIT && (
            <div
              className={`p-3 border-t flex justify-center ${
                isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50/70'
              }`}
            >
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                }`}
              >
                {showAll ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>Daha Az Göster</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span>Tümünü Göster ({filteredCriteria.length})</span>
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        {/* SAĞ PANEL: Detaylı Klinik Karar, Gerekçe & 4-Kademeli Eylem Planı (7 kolon) */}
        {selectedCriterion && (
          <aside
            ref={detailRef}
            aria-label="Seçili kriter klinik kararı ve gerekçesi"
            aria-live="polite"
            className={`lg:col-span-7 lg:sticky lg:top-4 rounded-2xl border p-5 sm:p-6 space-y-5 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {(() => {
              const ds = getDecisionStyles(selectedCriterion.decision, isDark);
              const DecisionIcon = ds.icon;
              const isPinned = pinnedIds.includes(selectedCriterion.id);

              return (
                <>
                  {/* Detay Başlığı */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${
                            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {selectedCriterion.category}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md border ${ds.badge}`}
                        >
                          <DecisionIcon className="w-3.5 h-3.5" />
                          <span>{selectedCriterion.decision}</span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => togglePin(selectedCriterion.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                          isPinned
                            ? isDark
                              ? 'bg-teal-500/20 text-teal-200 border-teal-500/40'
                              : 'bg-teal-600 text-white border-teal-600'
                            : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isPinned ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{isPinned ? 'Vaka Özetinde' : 'Çoklu Vakaya Ekle'}</span>
                      </button>
                    </div>

                    <h3 className={`text-lg sm:text-xl font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {selectedCriterion.title}
                    </h3>
                  </div>

                  {/* Metrik Kutuları: Eşik & Bekleme Süresi */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      className={`p-3.5 rounded-xl border ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/90'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Klinik Eşik / Tanım
                      </div>
                      <div className={`text-xs sm:text-[13px] font-semibold mt-1 leading-snug ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {selectedCriterion.threshold}
                      </div>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl border ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/90'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Önerilen Bekleme / Pencere
                      </div>
                      <div className={`text-xs sm:text-[13px] font-semibold mt-1 leading-snug ${isDark ? 'text-teal-300' : 'text-teal-800'}`}>
                        {selectedCriterion.waitDuration}
                      </div>
                    </div>
                  </div>

                  {/* Fizyopatolojik Gerekçe */}
                  <div
                    className={`p-4 rounded-xl border space-y-1.5 ${
                      isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/70 border-slate-200/80'
                    }`}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-sky-500" />
                      Fizyopatolojik Gerekçe (Rationale)
                    </div>
                    <p className={`text-xs sm:text-[13px] leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {selectedCriterion.rationale}
                    </p>
                  </div>

                  {/* Anestezi Salon İncisi */}
                  <div
                    className={`p-4 rounded-xl border space-y-1.5 ${
                      isDark
                        ? 'bg-amber-500/8 border-amber-500/25'
                        : 'bg-amber-50/70 border-amber-200/90'
                    }`}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Anestezi Salon İncisi &amp; Pratik Yönetim
                    </div>
                    <p className={`text-xs sm:text-[13px] leading-relaxed ${isDark ? 'text-amber-100/90' : 'text-amber-950'}`}>
                      {selectedCriterion.clinicalPearl}
                    </p>
                  </div>

                  {/* 4 Kademeli Aciliyet Eylem Planı */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Aciliyete Göre Eylem Planı (Mod değiştirmek için karta tıklayın)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {URGENCY_MODES.map((mode) => {
                        const isActive = urgency === mode.id;
                        const tone = getUrgencyTone(mode.id, isDark);
                        return (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setUrgency(mode.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isActive
                                ? tone.cardBorder
                                : isDark
                                  ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                                  : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span
                                className={`text-xs font-bold ${
                                  isDark ? 'text-slate-100' : 'text-slate-900'
                                }`}
                              >
                                {mode.label}{' '}
                                <span className="font-mono font-normal text-[10px] opacity-75">
                                  ({mode.timeWindow})
                                </span>
                              </span>
                              {isActive && (
                                <span
                                  className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${tone.tag}`}
                                >
                                  Seçili
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-xs leading-relaxed ${
                                isDark ? 'text-slate-300' : 'text-slate-700'
                              }`}
                            >
                              {selectedCriterion.plans[mode.id]}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Kılavuz & Kanıt Şeridi */}
                  <div
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-teal-500" />
                        Kılavuz Dayanağı
                      </div>
                      <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {selectedCriterion.guideline}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border self-start sm:self-center ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {selectedCriterion.evidenceLevel}
                    </span>
                  </div>

                  {/* Bağlamsal Portal Araç Bağlantıları */}
                  {selectedCriterion.relatedLinks && selectedCriterion.relatedLinks.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        İlgili Portal Araçları &amp; Protokoller
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCriterion.relatedLinks.map((link) => (
                          <PortalLink
                            key={link.href}
                            href={link.href}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                              isDark
                                ? 'bg-slate-800/80 hover:bg-slate-800 text-teal-300 border-slate-700 hover:border-teal-500/50'
                                : 'bg-teal-50/60 hover:bg-teal-50 text-teal-800 border-teal-200 hover:border-teal-400'
                            }`}
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
                          </PortalLink>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </aside>
        )}
      </div>

      {/* 5. Hızlı Klinik Özet: Gereksiz İptal Yapma vs. Asla Taviz Verme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`rounded-2xl border p-4 space-y-2 ${
            isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300">
            <ShieldAlert className="w-4 h-4" />
            <span>Elektif Cerrahide Asla Taviz Verilmeyen Kırmızı Çizgiler</span>
          </div>
          <ul className={`text-xs space-y-1.5 leading-relaxed list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <li>Aktif kardiyak durum (AKS, dekompanse KY, semptomatik ağır AS) ve son 60 gün içinde Akut MI.</li>
            <li>DES sonrası ilk 30 gün (Sınıf III Zarar); elektifte CCD &lt;6 ay / AKS &lt;12 ay; son 3 ay içinde SVO/GİA.</li>
            <li>DKA/HHD, akut EKG değişikliği yaratan K⁺/Na⁺ bozukluğu, kontrolsüz tirotoksikoz, Child-Pugh C siroz.</li>
            <li>Katı gıda açlık ihlali (&lt;6–8 sa), yüksek kanama riskli/nöraksiyel girişimde kesilmemiş antikoagülan, onam/kan/YBÜ yokluğu.</li>
          </ul>
        </div>

        <div
          className={`rounded-2xl border p-4 space-y-2 ${
            isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Tek Başına Gereksiz İptal Nedeni Olmayan Durumlar</span>
          </div>
          <ul className={`text-xs space-y-1.5 leading-relaxed list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <li>Hedef organ hasarı olmayan Evre 1–2 Hipertansiyon (&lt;180/110 mmHg — 2024 AHA/ACC Sınıf III).</li>
            <li>Yutulmamış şekersiz sakız çiğneme ve erişkinde ≥2 sa / çocukta ≥1 sa önce alınmış berrak sıvı.</li>
            <li>&gt;1 yaş, ateşsiz, akciğerleri temiz, havayolu dışı cerrahi geçirecek basit berrak rinoreli ÜSYE.</li>
            <li>Yapısal hastalık/iskemi/elektrolit bozukluğu olmayan izole VES/SVES, RBBB veya kronik stabil LBBB; hafif subklinik hipotiroidi; komorbiditesi stabil izole OSAS.</li>
          </ul>
        </div>
      </div>

      {/* 6. Kaynak Kılavuzlar Akordeonu */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={() => setShowReferences((prev) => !prev)}
          className={`w-full px-4 py-3 flex items-center justify-between text-xs font-bold cursor-pointer transition-colors ${
            isDark
              ? 'text-slate-200 hover:bg-slate-800/70'
              : 'text-slate-800 hover:bg-slate-50'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-teal-500" />
            <span>Klinik Kanıt ve Kılavuz Referansları ({CANCELLATION_GUIDELINE_REFS.length} Kılavuz)</span>
          </span>
          {showReferences ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showReferences && (
          <div
            className={`px-4 pb-4 pt-2 border-t space-y-2.5 ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}
          >
            {CANCELLATION_GUIDELINE_REFS.map((ref, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`font-bold leading-snug ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {ref.title}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-600 dark:text-teal-300 shrink-0">
                    {ref.year}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <span className="font-semibold">{ref.journal}</span> — {ref.scope}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurgicalCancellationMatrixInfographic;
