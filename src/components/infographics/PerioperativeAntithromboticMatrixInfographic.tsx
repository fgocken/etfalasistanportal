import React, { useMemo, useRef, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Droplets,
  Filter,
  FlaskConical,
  Info,
  Layers,
  RotateCcw,
  Scissors,
  Search,
  ShieldAlert,
  ShieldCheck,
  Syringe,
  X,
  XCircle
} from 'lucide-react';
import {
  ANTITHROMBOTIC_AGENTS,
  ANTITHROMBOTIC_CLASSES,
  ANTITHROMBOTIC_GUIDELINE_REFS,
  AgentRiskTag,
  AntithromboticAgent,
  AntithromboticClass,
  CatheterSafetyStatus,
  CrClProfile,
  REGIONAL_PROCEDURE_TIERS,
  RegionalProcedureTier,
  SurgicalBleedMode
} from '../../data/antithromboticMatrixData';
import { PortalLink } from '../common/PortalLink';

interface PerioperativeAntithromboticMatrixInfographicProps {
  isDark: boolean;
}

type PrimaryViewTab = 'regional' | 'surgical';

function normalizeTr(text: string): string {
  return (text || '').toLocaleLowerCase('tr-TR');
}

function getCatheterStatusStyles(status: CatheterSafetyStatus, isDark: boolean) {
  switch (status) {
    case 'allowed':
      return {
        badge: isDark
          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: CheckCircle2
      };
    case 'conditional':
      return {
        badge: isDark
          ? 'bg-amber-500/15 text-amber-300 border-amber-500/35'
          : 'bg-amber-50 text-amber-800 border-amber-200',
        icon: AlertTriangle
      };
    case 'contraindicated':
    default:
      return {
        badge: isDark
          ? 'bg-rose-500/15 text-rose-300 border-rose-500/35'
          : 'bg-rose-50 text-rose-700 border-rose-200',
        icon: XCircle
      };
  }
}

function getRiskTagStyles(tag: AgentRiskTag, isDark: boolean): string {
  switch (tag) {
    case 'Devam Edilebilir':
      return isDark
        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'CrCl Bağımlı':
      return isDark
        ? 'bg-amber-500/15 text-amber-300 border-amber-500/35'
        : 'bg-amber-50 text-amber-800 border-amber-200';
    case 'Yüksek Risk / Kontrendike':
      return isDark
        ? 'bg-rose-600/20 text-rose-200 border-rose-500/50'
        : 'bg-rose-100 text-rose-800 border-rose-300';
    case 'Kesme Zorunlu':
    default:
      return isDark
        ? 'bg-rose-500/15 text-rose-300 border-rose-500/35'
        : 'bg-rose-50 text-rose-700 border-rose-200';
  }
}

export const PerioperativeAntithromboticMatrixInfographic: React.FC<
  PerioperativeAntithromboticMatrixInfographicProps
> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<PrimaryViewTab>('regional');
  const [regionalTier, setRegionalTier] = useState<RegionalProcedureTier>('noraksiyel');
  const [surgicalMode, setSurgicalMode] = useState<SurgicalBleedMode>('cerrahi_yuksek');
  const [crcl, setCrcl] = useState<CrClProfile>('normal');
  const [drugClass, setDrugClass] = useState<AntithromboticClass | 'Tümü'>('Tümü');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>('dabigatran_high');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showRefs, setShowRefs] = useState(false);

  const detailRef = useRef<HTMLDivElement | null>(null);

  const classCounts = useMemo(() => {
    const map: Record<string, number> = { Tümü: ANTITHROMBOTIC_AGENTS.length };
    ANTITHROMBOTIC_CLASSES.forEach((cls) => {
      map[cls] = ANTITHROMBOTIC_AGENTS.filter((a) => a.drugClass === cls).length;
    });
    return map;
  }, []);

  const filteredAgents = useMemo(() => {
    const tokens = normalizeTr(query.trim()).split(/\s+/).filter(Boolean);
    return ANTITHROMBOTIC_AGENTS.filter((agent) => {
      if (drugClass !== 'Tümü' && agent.drugClass !== drugClass) return false;
      if (tokens.length === 0) return true;
      const hay = normalizeTr(
        [
          agent.name,
          agent.shortName,
          agent.drugClass,
          agent.target,
          agent.regional.preHoldNormal,
          agent.regional.preHoldLowCrCl,
          agent.regional.indwellingCatheter,
          agent.regional.postRestart,
          agent.surgical.highBleedHoldNormal,
          agent.surgical.lowModBleedHoldNormal,
          agent.rationale,
          agent.antidote,
          agent.guidelines,
          ...agent.keywords
        ].join(' ')
      );
      return tokens.every((t) => hay.includes(t));
    });
  }, [drugClass, query]);

  const selectedAgent: AntithromboticAgent = useMemo(() => {
    const inFiltered = filteredAgents.find((a) => a.id === selectedId);
    if (inFiltered) return inFiltered;
    return filteredAgents[0] || ANTITHROMBOTIC_AGENTS[0];
  }, [filteredAgents, selectedId]);

  const activeTierMeta =
    REGIONAL_PROCEDURE_TIERS.find((t) => t.id === regionalTier) || REGIONAL_PROCEDURE_TIERS[0];

  const handleSelectRow = (id: string) => {
    setSelectedId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyAgentSummary = async () => {
    const a = selectedAgent;
    const preHold = crcl === 'dusuk' ? a.regional.preHoldLowCrCl : a.regional.preHoldNormal;
    const surgHighHold =
      crcl === 'dusuk' ? a.surgical.highBleedHoldLowCrCl : a.surgical.highBleedHoldNormal;
    const surgLowHold =
      crcl === 'dusuk' ? a.surgical.lowModBleedHoldLowCrCl : a.surgical.lowModBleedHoldNormal;
    const crclLabel = crcl === 'dusuk' ? 'CrCl 30–49 mL/dk' : 'CrCl ≥ 50 mL/dk';

    const text = [
      `ANTİTROMBOTİK YÖNETİM ÖZETİ — ${a.name}`,
      `Aktif Böbrek Profili: ${crclLabel} | Hedef: ${a.target}`,
      '',
      '1) NÖRAKSİYEL & DERİN SİNİR BLOKLARI (ASRA 2025 / ESAIC-ESRA 2022):',
      `• Pre-Placement / Pre-Removal Hold: ${preHold}`,
      `• Indwelling Catheter Management [${a.regional.catheterStatusLabel}]: ${a.regional.indwellingCatheter}`,
      `• Post-Placement / Post-Removal Restart: ${a.regional.postRestart}`,
      `• Yüzeyel Komprese Edilebilir Blok Farkı: ${a.regional.superficialBlockNote}`,
      `• Lab Eşiği: ${a.regional.labThreshold}`,
      '',
      '2) CERRAHİ KANAMA RİSKİ (PAUSE / ACCP 2022):',
      `• Yüksek Kanama Riskli Cerrahi: Kesme ${surgHighHold} | Başlama ${a.surgical.highBleedRestart}`,
      `• Düşük–Orta Kanama Riskli Cerrahi: Kesme ${surgLowHold} | Başlama ${a.surgical.lowModBleedRestart}`,
      `• Köprüleme: ${a.surgical.bridgingNote}`,
      '',
      `Acil Antidot / Reversal: ${a.antidote}`,
      `Kılavuz: ${a.guidelines}`,
      'Kaynak: Şişli Hamidiye Etfal Anestezi Asistan Portalı'
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2200);
    } catch {
      // Clipboard izni yoksa sessiz kal
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. ÜST KLİNİK BAŞLIK */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 ${
          isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-slate-50/90 border-slate-200 shadow-xs'
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
                ASRA 5th Ed. (2025) · ESAIC/ESRA 2022 · PAUSE / ACCP 2022 · AHA/ACC 2024
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {ANTITHROMBOTIC_AGENTS.length} Antitrombotik Ajan · CrCl Uyarlamalı
              </span>
            </div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Perioperatif Antitrombotik, Nöraksiyel &amp; Sinir Blokları Yönetim Matrisi
            </h3>
            <p className={`text-xs sm:text-[13px] max-w-3xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Nöraksiyel anestezi, derin/komprese edilemeyen ve yüzeyel sinir blokları için{' '}
              <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                Pre-Placement / Pre-Removal Hold · Indwelling Catheter Management · Post-Placement / Post-Removal Restart
              </strong>{' '}
              matrisi ile yüksek/düşük kanama riskli cerrahi kesme-başlama protokolleri.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <PortalLink
              href="#arac=nerve-blocks"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <Syringe className="w-3.5 h-3.5 text-teal-500" />
              <span>Rejyonel &amp; Spinal</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </PortalLink>
            <PortalLink
              href="#arac=preop&sub=cancellation-matrix"
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              <span>Erteleme Matrisi</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </PortalLink>
          </div>
        </div>
      </div>

      {/* 2. ANA MOD SEÇİCİ (REJYONEL 3-SÜTUN MATRİS vs. CERRAHİ KANAMA RİSKİ MATRİSİ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="tablist" aria-label="Ana matris görünümü">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'regional'}
          onClick={() => setActiveTab('regional')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
            activeTab === 'regional'
              ? isDark
                ? 'bg-teal-500/15 border-teal-500/50 text-white shadow-xs'
                : 'bg-teal-600 border-teal-600 text-white shadow-xs'
              : isDark
                ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div
            className={`p-2 rounded-xl shrink-0 ${
              activeTab === 'regional'
                ? isDark
                  ? 'bg-teal-500/25 text-teal-200'
                  : 'bg-white/20 text-white'
                : isDark
                  ? 'bg-slate-800 text-teal-400'
                  : 'bg-teal-50 text-teal-700'
            }`}
          >
            <Syringe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold leading-snug">
              Nöraksiyel Anestezi &amp; Sinir Blokları Matrisi
            </div>
            <div
              className={`text-[11px] mt-0.5 leading-snug ${
                activeTab === 'regional'
                  ? isDark
                    ? 'text-teal-200/90'
                    : 'text-teal-50'
                  : isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
              }`}
            >
              Pre-Placement/Removal · Indwelling Catheter · Post-Placement/Removal (ASRA 2025 &amp; ESAIC/ESRA 2022)
            </div>
          </div>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'surgical'}
          onClick={() => setActiveTab('surgical')}
          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
            activeTab === 'surgical'
              ? isDark
                ? 'bg-sky-500/15 border-sky-500/50 text-white shadow-xs'
                : 'bg-sky-600 border-sky-600 text-white shadow-xs'
              : isDark
                ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div
            className={`p-2 rounded-xl shrink-0 ${
              activeTab === 'surgical'
                ? isDark
                  ? 'bg-sky-500/25 text-sky-200'
                  : 'bg-white/20 text-white'
                : isDark
                  ? 'bg-slate-800 text-sky-400'
                  : 'bg-sky-50 text-sky-700'
            }`}
          >
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold leading-snug">
              Cerrahi Kanama Riski Matrisi (Yüksek vs. Düşük–Orta)
            </div>
            <div
              className={`text-[11px] mt-0.5 leading-snug ${
                activeTab === 'surgical'
                  ? isDark
                    ? 'text-sky-200/90'
                    : 'text-sky-50'
                  : isDark
                    ? 'text-slate-400'
                    : 'text-slate-500'
              }`}
            >
              Cerrahi kesme/başlama süreleri, PAUSE &amp; BRIDGE köprüleme kuralları (ACCP 2022 · AHA/ACC 2024)
            </div>
          </div>
        </button>
      </div>

      {/* 3. KONTROL GÜVERTESİ */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 space-y-4 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Sol: Prosedür Düzeyi (Rejyonel) veya Cerrahi Risk Düzeyi */}
          <div className="lg:col-span-8 space-y-2">
            {activeTab === 'regional' ? (
              <>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-500" />
                  Rejyonel Prosedür &amp; Anatomik Risk Düzeyi (ESAIC/ESRA 2022 Tablo 2 &amp; ASRA 2025)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" role="radiogroup" aria-label="Rejyonel prosedür düzeyi">
                  {REGIONAL_PROCEDURE_TIERS.map((tier) => {
                    const active = regionalTier === tier.id;
                    const activeClass =
                      tier.tone === 'rose'
                        ? isDark
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-100'
                          : 'bg-rose-600 border-rose-600 text-white'
                        : tier.tone === 'amber'
                          ? isDark
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-100'
                            : 'bg-amber-600 border-amber-600 text-white'
                          : isDark
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-100'
                            : 'bg-emerald-600 border-emerald-600 text-white';

                    return (
                      <button
                        key={tier.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setRegionalTier(tier.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? activeClass
                            : isDark
                              ? 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{tier.shortLabel}</div>
                        <div className={`text-[10px] mt-0.5 font-medium ${active ? 'opacity-90' : 'text-slate-500 dark:text-slate-400'}`}>
                          {tier.ruleBadge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-sky-500" />
                  Cerrahi Kanama Riski Kategorisi (PAUSE / ACCP 2022 / ESC 2022)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Cerrahi kanama riski">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={surgicalMode === 'cerrahi_yuksek'}
                    onClick={() => setSurgicalMode('cerrahi_yuksek')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      surgicalMode === 'cerrahi_yuksek'
                        ? isDark
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-100'
                          : 'bg-rose-600 border-rose-600 text-white'
                        : isDark
                          ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold">Yüksek Kanama Riskli Cerrahi</div>
                    <div className={`text-[10px] mt-0.5 ${surgicalMode === 'cerrahi_yuksek' ? 'opacity-90' : 'text-slate-500 dark:text-slate-400'}`}>
                      Kraniyotomi, omurga, kardiyak, vasküler, majör batın/üroloji/ortopedi
                    </div>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={surgicalMode === 'cerrahi_dusuk'}
                    onClick={() => setSurgicalMode('cerrahi_dusuk')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      surgicalMode === 'cerrahi_dusuk'
                        ? isDark
                          ? 'bg-sky-500/20 border-sky-500/50 text-sky-100'
                          : 'bg-sky-600 border-sky-600 text-white'
                        : isDark
                          ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold">Düşük – Orta Kanama Riskli Cerrahi</div>
                    <div className={`text-[10px] mt-0.5 ${surgicalMode === 'cerrahi_dusuk' ? 'opacity-90' : 'text-slate-500 dark:text-slate-400'}`}>
                      Laparoskopik kolesistektomi, herni, artroskopi, endoskopi, minör girişim
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Sağ: Böbrek Fonksiyonu (CrCl) Seçici */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-amber-500" />
              Böbrek Fonksiyonu (CrCl)
            </span>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Böbrek fonksiyonu">
              <button
                type="button"
                role="radio"
                aria-checked={crcl === 'normal'}
                onClick={() => setCrcl('normal')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  crcl === 'normal'
                    ? isDark
                      ? 'bg-teal-500/20 border-teal-500/50 text-teal-200'
                      : 'bg-teal-600 border-teal-600 text-white'
                    : isDark
                      ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold font-mono">CrCl ≥ 50</div>
                <div className={`text-[10px] ${crcl === 'normal' ? 'opacity-90' : 'text-slate-500 dark:text-slate-400'}`}>
                  mL/dk (Normal)
                </div>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={crcl === 'dusuk'}
                onClick={() => setCrcl('dusuk')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  crcl === 'dusuk'
                    ? isDark
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                      : 'bg-amber-600 border-amber-600 text-white'
                    : isDark
                      ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold font-mono">CrCl 30–49</div>
                <div className={`text-[10px] ${crcl === 'dusuk' ? 'opacity-90' : 'text-slate-500 dark:text-slate-400'}`}>
                  mL/dk (Düşük)
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Seçili Rejyonel Prosedür Düzeyi Açıklama Şeridi */}
        {activeTab === 'regional' && (
          <div
            className={`rounded-xl border p-3.5 text-xs space-y-2 ${
              activeTierMeta.tone === 'rose'
                ? isDark
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-100'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
                : activeTierMeta.tone === 'amber'
                  ? isDark
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-100'
                    : 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : isDark
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <p className="leading-relaxed">
                  <strong>{activeTierMeta.label}:</strong> {activeTierMeta.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeTierMeta.examples.map((ex, i) => (
                    <span
                      key={i}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                        isDark
                          ? 'bg-slate-900/70 border-white/10 text-slate-200'
                          : 'bg-white/85 border-black/10 text-slate-800'
                      }`}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
                {activeTierMeta.cautionExamples?.map((c, idx) => (
                  <p key={idx} className="text-[11px] font-semibold opacity-95 flex items-start gap-1.5 pt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* İlaç Sınıfı Filtresi + Arama */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="İlaç sınıfı filtresi">
            <span className="text-[11px] font-bold text-slate-400 mr-1 inline-flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Sınıf:
            </span>
            {(['Tümü', ...ANTITHROMBOTIC_CLASSES] as const).map((cls) => {
              const active = drugClass === cls;
              return (
                <button
                  key={cls}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setDrugClass(cls)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? isDark
                        ? 'bg-teal-500/20 text-teal-200 border-teal-500/50'
                        : 'bg-slate-900 text-white border-slate-900'
                      : isDark
                        ? 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-800'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{cls}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 rounded ${
                      active
                        ? isDark
                          ? 'bg-teal-500/25 text-teal-100'
                          : 'bg-white/20 text-white'
                        : isDark
                          ? 'bg-slate-700 text-slate-400'
                          : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {classCounts[cls]}
                  </span>
                </button>
              );
            })}
            {(drugClass !== 'Tümü' || query.trim()) && (
              <button
                type="button"
                onClick={() => {
                  setDrugClass('Tümü');
                  setQuery('');
                }}
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
              placeholder="İlaç, etken madde veya antidot ara..."
              aria-label="Antitrombotik ajan ara"
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
      </div>

      {/* 4. ANA MATRİS TABLOSU */}
      <section
        aria-label="Antitrombotik yönetim matrisi tablosu"
        className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900/85 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div
          className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2 ${
            isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-slate-50/80'
          }`}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {activeTab === 'regional'
                ? `${activeTierMeta.label} — 3-Sütunlu Yönetim Matrisi`
                : surgicalMode === 'cerrahi_yuksek'
                  ? 'Yüksek Kanama Riskli Cerrahi Matrisi'
                  : 'Düşük–Orta Kanama Riskli Cerrahi Matrisi'}
            </span>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200/70 text-slate-700'
              }`}
            >
              {filteredAgents.length} ajan · Detay için satıra tıklayın
            </span>
          </div>

          {crcl === 'dusuk' && (
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                isDark
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/35'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>CrCl 30–49 mL/dk renal uyarlaması aktif</span>
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'regional' ? (
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead>
                <tr
                  className={`border-b text-[11px] uppercase tracking-wider font-bold ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <th scope="col" className="py-3 px-4 w-[24%]">
                    Ajan &amp; Sınıf
                  </th>
                  <th scope="col" className="py-3 px-4 w-[25%]">
                    Pre-Placement / Pre-Removal Hold
                    <span className="block text-[9px] font-normal normal-case tracking-normal opacity-80">
                      İşlem ve kateter çekim öncesi bekleme
                    </span>
                  </th>
                  <th scope="col" className="py-3 px-4 w-[27%]">
                    Indwelling Catheter Management
                    <span className="block text-[9px] font-normal normal-case tracking-normal opacity-80">
                      Kateter yerindeyken yönetim &amp; güvenlik
                    </span>
                  </th>
                  <th scope="col" className="py-3 px-4 w-[24%]">
                    Post-Placement / Post-Removal Restart
                    <span className="block text-[9px] font-normal normal-case tracking-normal opacity-80">
                      İşlem veya kateter çekim sonrası başlama
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-100'}`}>
                {filteredAgents.map((agent) => {
                  const isSel = selectedAgent.id === agent.id;
                  const catStyle = getCatheterStatusStyles(agent.regional.catheterStatus, isDark);
                  const CatIcon = catStyle.icon;
                  const preHold =
                    crcl === 'dusuk' ? agent.regional.preHoldLowCrCl : agent.regional.preHoldNormal;

                  return (
                    <tr
                      key={agent.id}
                      tabIndex={0}
                      aria-selected={isSel}
                      onClick={() => handleSelectRow(agent.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectRow(agent.id);
                        }
                      }}
                      className={`transition-colors cursor-pointer outline-none align-top ${
                        isSel
                          ? isDark
                            ? 'bg-teal-500/12'
                            : 'bg-teal-50/70'
                          : isDark
                            ? 'hover:bg-slate-800/50'
                            : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Sütun 1: Ajan */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div
                            className={`text-xs sm:text-[13px] font-bold leading-snug ${
                              isSel
                                ? isDark
                                  ? 'text-teal-200'
                                  : 'text-teal-950'
                                : isDark
                                  ? 'text-slate-100'
                                  : 'text-slate-900'
                            }`}
                          >
                            {agent.shortName}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                                isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {agent.drugClass}
                            </span>
                            {crcl === 'dusuk' && agent.isCrClSensitive && (
                              <span
                                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${
                                  isDark
                                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/35'
                                    : 'bg-amber-50 text-amber-800 border-amber-200'
                                }`}
                              >
                                Renal uyarlama
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Sütun 2: Pre-Placement / Pre-Removal Hold */}
                      <td className="py-3.5 px-4 text-xs leading-relaxed">
                        {regionalTier === 'yuzeyel_blok' ? (
                          <div className="space-y-1">
                            <span
                              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${
                                agent.drugClass === 'Trombolitik'
                                  ? isDark
                                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/35'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                  : isDark
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}
                            >
                              {agent.drugClass === 'Trombolitik'
                                ? 'Trombolizde kaçın'
                                : 'ESAIC: Kesme zorunlu değil'}
                            </span>
                            <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                              {agent.regional.superficialBlockNote}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">
                              Nöraksiyel/derin ref: {preHold}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className={`font-semibold block ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                              {preHold}
                            </span>
                            {regionalTier === 'derin_blok' && (
                              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium block">
                                Derin blok = Nöraksiyel kural (ASRA 1C)
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Sütun 3: Indwelling Catheter Management */}
                      <td className="py-3.5 px-4 text-xs leading-relaxed">
                        <div className="space-y-1.5">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${catStyle.badge}`}
                          >
                            <CatIcon className="w-3 h-3" />
                            <span>{agent.regional.catheterStatusLabel}</span>
                          </span>
                          <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                            {agent.regional.indwellingCatheter}
                          </p>
                        </div>
                      </td>

                      {/* Sütun 4: Post-Placement / Post-Removal Restart */}
                      <td className="py-3.5 px-4 text-xs leading-relaxed">
                        <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          {agent.regional.postRestart}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr
                  className={`border-b text-[11px] uppercase tracking-wider font-bold ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <th scope="col" className="py-3 px-4 w-[24%]">
                    Ajan &amp; Sınıf
                  </th>
                  <th scope="col" className="py-3 px-4 w-[26%]">
                    Cerrahi Öncesi Kesme
                  </th>
                  <th scope="col" className="py-3 px-4 w-[24%]">
                    Cerrahi Sonrası Başlama
                  </th>
                  <th scope="col" className="py-3 px-4 w-[26%]">
                    Köprüleme &amp; Durum
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-100'}`}>
                {filteredAgents.map((agent) => {
                  const isSel = selectedAgent.id === agent.id;
                  const holdText =
                    surgicalMode === 'cerrahi_yuksek'
                      ? crcl === 'dusuk'
                        ? agent.surgical.highBleedHoldLowCrCl
                        : agent.surgical.highBleedHoldNormal
                      : crcl === 'dusuk'
                        ? agent.surgical.lowModBleedHoldLowCrCl
                        : agent.surgical.lowModBleedHoldNormal;
                  const restartText =
                    surgicalMode === 'cerrahi_yuksek'
                      ? agent.surgical.highBleedRestart
                      : agent.surgical.lowModBleedRestart;

                  return (
                    <tr
                      key={agent.id}
                      tabIndex={0}
                      aria-selected={isSel}
                      onClick={() => handleSelectRow(agent.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectRow(agent.id);
                        }
                      }}
                      className={`transition-colors cursor-pointer outline-none align-top ${
                        isSel
                          ? isDark
                            ? 'bg-sky-500/12'
                            : 'bg-sky-50/70'
                          : isDark
                            ? 'hover:bg-slate-800/50'
                            : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className={`text-xs sm:text-[13px] font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                            {agent.shortName}
                          </div>
                          <span
                            className={`inline-block text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                              isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {agent.drugClass}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs leading-relaxed">
                        <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                          {holdText}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs leading-relaxed">
                        <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{restartText}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs leading-relaxed space-y-1.5">
                        <span
                          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${getRiskTagStyles(
                            agent.riskTag,
                            isDark
                          )}`}
                        >
                          {agent.riskTag}
                        </span>
                        <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {agent.surgical.bridgingNote}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* 5. SEÇİLİ AJAN KAPSAMLI KLİNİK DETAY PANELİ */}
      <section
        ref={detailRef}
        aria-live="polite"
        aria-label="Seçili antitrombotik ajan detayı"
        className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {selectedAgent.drugClass}
              </span>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${getRiskTagStyles(
                  selectedAgent.riskTag,
                  isDark
                )}`}
              >
                {selectedAgent.riskTag}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Aktif profil: {crcl === 'dusuk' ? 'CrCl 30–49 mL/dk' : 'CrCl ≥ 50 mL/dk'}
              </span>
            </div>
            <h4 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {selectedAgent.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{selectedAgent.target}</p>
          </div>

          <button
            type="button"
            onClick={handleCopyAgentSummary}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
              copiedSummary
                ? 'bg-emerald-600 text-white border-emerald-600'
                : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSummary ? 'Özet Kopyalandı' : 'Protokol Özetini Kopyala'}</span>
          </button>
        </div>

        {/* Farmakokinetik & Laboratuvar Şeridi */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            { label: 'Yarılanma Ömrü (t½)', value: selectedAgent.halfLife, icon: Clock },
            { label: 'Pik Etki (Tmax)', value: selectedAgent.timeToPeak, icon: Activity },
            { label: 'Renal Atılım', value: selectedAgent.renalExcretion, icon: Droplets },
            { label: 'Kabul Edilebilir Lab Eşiği', value: selectedAgent.regional.labThreshold, icon: FlaskConical }
          ].map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/90'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Icon className="w-3 h-3 text-teal-500" />
                  <span>{metric.label}</span>
                </div>
                <div className={`text-xs font-semibold mt-1 leading-snug ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {metric.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Yönlü Karşılaştırma: Nöraksiyel/Derin vs Yüzeyel vs Yüksek Cerrahi vs Düşük Cerrahi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              activeTab === 'regional' && regionalTier !== 'yuzeyel_blok'
                ? isDark
                  ? 'bg-teal-500/10 border-teal-500/40'
                  : 'bg-teal-50/70 border-teal-300'
                : isDark
                  ? 'bg-slate-950/50 border-slate-800'
                  : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Nöraksiyel &amp; Derin Sinir Blokları
            </div>
            <div className="space-y-1.5 text-xs leading-relaxed">
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Pre-Hold: </span>
                <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>
                  {crcl === 'dusuk' ? selectedAgent.regional.preHoldLowCrCl : selectedAgent.regional.preHoldNormal}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Kateter: </span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                  {selectedAgent.regional.indwellingCatheter}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Restart: </span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                  {selectedAgent.regional.postRestart}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border space-y-2 ${
              activeTab === 'regional' && regionalTier === 'yuzeyel_blok'
                ? isDark
                  ? 'bg-emerald-500/10 border-emerald-500/40'
                  : 'bg-emerald-50/70 border-emerald-300'
                : isDark
                  ? 'bg-slate-950/50 border-slate-800'
                  : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Yüzeyel / Komprese Edilebilir Bloklar &amp; Kanlı Ponksiyon
            </div>
            <div className="space-y-1.5 text-xs leading-relaxed">
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Yüzeyel Blok: </span>
                <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>
                  {selectedAgent.regional.superficialBlockNote}
                </span>
              </div>
              <div>
                <span className="font-bold text-rose-600 dark:text-rose-400">Kanlı Ponksiyon (Bloody Tap): </span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                  {selectedAgent.regional.bloodyTapNote}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border space-y-1.5 ${
              activeTab === 'surgical' && surgicalMode === 'cerrahi_yuksek'
                ? isDark
                  ? 'bg-rose-500/10 border-rose-500/40'
                  : 'bg-rose-50/70 border-rose-300'
                : isDark
                  ? 'bg-slate-950/50 border-slate-800'
                  : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Yüksek Kanama Riskli Cerrahi
            </div>
            <div className="text-xs space-y-1">
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Kesme: </span>
                <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {crcl === 'dusuk'
                    ? selectedAgent.surgical.highBleedHoldLowCrCl
                    : selectedAgent.surgical.highBleedHoldNormal}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Başlama: </span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                  {selectedAgent.surgical.highBleedRestart}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border space-y-1.5 ${
              activeTab === 'surgical' && surgicalMode === 'cerrahi_dusuk'
                ? isDark
                  ? 'bg-sky-500/10 border-sky-500/40'
                  : 'bg-sky-50/70 border-sky-300'
                : isDark
                  ? 'bg-slate-950/50 border-slate-800'
                  : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Düşük – Orta Kanama Riskli Cerrahi
            </div>
            <div className="text-xs space-y-1">
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Kesme: </span>
                <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {crcl === 'dusuk'
                    ? selectedAgent.surgical.lowModBleedHoldLowCrCl
                    : selectedAgent.surgical.lowModBleedHoldNormal}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Başlama: </span>
                <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                  {selectedAgent.surgical.lowModBleedRestart}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gerekçe + Acil Antidot & Köprüleme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div
            className={`p-4 rounded-xl border space-y-1.5 ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Kılavuz Gerekçesi (Rationale) &amp; Köprüleme
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              {selectedAgent.rationale}
            </p>
            <p className={`text-xs leading-relaxed pt-1 border-t ${isDark ? 'border-slate-800 text-slate-300' : 'border-slate-200/80 text-slate-600'}`}>
              <strong>Köprüleme:</strong> {selectedAgent.surgical.bridgingNote}
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border space-y-1.5 ${
              isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'
            }`}
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5" />
              Acil Geri Döndürme / Antidot
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-rose-100/90' : 'text-rose-950'}`}>
              {selectedAgent.antidote}
            </p>
            <div className="pt-1.5 flex items-center justify-between gap-2 flex-wrap border-t border-rose-500/20">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Kaynak: {selectedAgent.guidelines}
              </span>
              <div className="flex items-center gap-2">
                <PortalLink
                  href="#arac=vascular-access"
                  className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-0.5"
                >
                  <span>SVK Koagülasyon (2025)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </PortalLink>
                <PortalLink
                  href="#arac=emergencies&sub=mtp"
                  className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-0.5"
                >
                  <span>MTP Protokolü</span>
                  <ArrowUpRight className="w-3 h-3" />
                </PortalLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EVRENSEL REJYONEL GÜVENLİK KURALLARI & SPİNAL HEMATOM KIRMIZI BAYRAKLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`rounded-2xl border p-4 space-y-2 ${
            isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300">
            <ShieldCheck className="w-4 h-4" />
            <span>ASRA 2025 &amp; ESAIC/ESRA 2022 Altın Kuralları</span>
          </div>
          <ul className={`text-xs space-y-1.5 leading-relaxed list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <li><strong>USG ve skorlar süreyi kısaltmaz:</strong> Ultrason kılavuzluğu veya kanama risk skorları nöraksiyel/derin blok kesme sürelerini kısaltmak için KULLANILMAZ.</li>
            <li><strong>Kateter çekimi = yerleştirme riski:</strong> Epidural hematomların önemli bir kısmı kateter çekiminde gelişir; aynı bekleme süreleri çekim öncesinde de geçerlidir.</li>
            <li><strong>İkili kombinasyon kuralı:</strong> Birden fazla antitrombotik alan hastada daima daha uzun kesme penceresi uygulanır ve sinerjistik kanama riski gözetilir.</li>
            <li><strong>Rutin blok için antidot yasağı (ASRA 2025):</strong> Yalnızca elektif/rutin nöraksiyel blok yapabilmek için DOAC antidotu (İdarusizumab, Andeksanet, PCC) KULLANILMAZ.</li>
          </ul>
        </div>

        <div
          className={`rounded-2xl border p-4 space-y-2 ${
            isDark ? 'bg-rose-950/25 border-rose-500/35' : 'bg-rose-50/80 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300">
            <ShieldAlert className="w-4 h-4" />
            <span>Spinal / Epidural Hematom Acil Kırmızı Bayrakları</span>
          </div>
          <ul className={`text-xs space-y-1.5 leading-relaxed list-disc pl-4 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <li>Beklenenden uzun süren veya geriledikten sonra yeniden artan motor blok (<strong>Modifiye Bromage</strong> takibi).</li>
            <li>Yeni başlayan şiddetli bel/sırt ağrısı, ilerleyici alt ekstremite güçsüzlüğü, uyuşma veya idrar/gaita sfinkter kaybı.</li>
            <li><strong>Acil Eylem:</strong> Epidural infüzyonu derhal durdur, <strong>ACİL TORAKOLOMBER MRG</strong> çek ve Beyin Cerrahisi konsültasyonu iste!</li>
            <li><strong>Altın Pencere:</strong> Nörolojik iyileşme için cerrahi laminektomi/dekompresyon semptom başlangıcından itibaren <strong>ilk 8–12 saat içinde</strong> yapılmalıdır.</li>
          </ul>
        </div>
      </div>

      {/* 7. KAYNAK KILAVUZLAR AKORDEONU */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={() => setShowRefs((prev) => !prev)}
          className={`w-full px-4 py-3 flex items-center justify-between text-xs font-bold cursor-pointer transition-colors ${
            isDark ? 'text-slate-200 hover:bg-slate-800/70' : 'text-slate-800 hover:bg-slate-50'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-500" />
            <span>Güncel Kılavuz Kaynakları ({ANTITHROMBOTIC_GUIDELINE_REFS.length} Kılavuz — ASRA 2025 &amp; ESAIC/ESRA 2022)</span>
          </span>
          {showRefs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showRefs && (
          <div className={`px-4 pb-4 pt-2 border-t space-y-2.5 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            {ANTITHROMBOTIC_GUIDELINE_REFS.map((ref, idx) => (
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
                  <span className="font-semibold">{ref.authors}</span> · <em>{ref.journal}</em>
                </div>
                <div className={`text-[11px] mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {ref.highlight}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerioperativeAntithromboticMatrixInfographic;
