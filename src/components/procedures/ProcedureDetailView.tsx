import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Activity,
  Droplet,
  Maximize2,
  Minimize2,
  Search,
  X,
  Copy,
  Check,
  ListChecks,
  ExternalLink,
  Zap,
  Sparkles
} from 'lucide-react';
import { ProcedureDefinition } from '../../types/procedures';
import { getProcedureIndispensableRules } from '../../utils/procedureRulesParser';
import {
  extractNeuroCockpit,
  getContextualPortalLinks,
  buildProcedureQuickChecklist,
  buildProcedureDutySummaryText,
  getClinicalTags,
  getShortDuration,
  CockpitTone,
  ContextualPortalLink,
  ClinicalTagTone
} from '../../utils/neuroProcedureHelpers';
import {
  extractOphthalmologyCockpit,
  getOphthalmologyContextualLinks,
  buildOphthalmologyQuickChecklist,
  buildOphthalmologyDutySummaryText,
  getOphthalmologyClinicalTags
} from '../../utils/ophthalmologyProcedureHelpers';
import { copyToClipboard } from '../../utils/deepLink';
import { PortalLink } from '../common/PortalLink';

export interface ProcedureDetailViewProps {
  procedure: ProcedureDefinition;
  isDark: boolean;
  onBack: () => void;
  backLabel?: string;
  onSelectProcedure?: (id: string) => void;
  adjacentProcedures?: {
    prev?: ProcedureDefinition;
    next?: ProcedureDefinition;
  };
}

type DetailViewMode = 'all' | 'summary' | 'preop' | 'intraop' | 'postop';

const DEFAULT_SECTION_OPEN: Record<string, boolean> = {
  sec1: false,
  sec2: true,
  sec3: true,
  sec4: true,
  sec5: true,
  sec6: true,
  sec7: false
};

const DEFAULT_SUB_OPEN: Record<string, boolean> = {
  '4a': true,
  '4b': true,
  '4c': true,
  '5a': true,
  '5b': true,
  '5c': true,
  '5d': true,
  '5e': true,
  '5f': true,
  '5g': true,
  '6a': true,
  '6b': true,
  '6c': true
};

/* =========================================================================
   YARDIMCI RENK VE METİN VURGULAMA FONKSİYONLARI
   ========================================================================= */

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderHighlightedText(text: string, query: string): React.ReactNode {
  const q = query.trim();
  if (!q) return text;
  const regex = new RegExp(`(${escapeRegExp(q)})`, 'gi');
  const parts = text.split(regex);
  if (parts.length === 1) return text;
  return parts.map((part, idx) =>
    idx % 2 === 1 ? (
      <mark
        key={idx}
        className="px-0.5 rounded bg-amber-300/80 text-slate-950 dark:bg-amber-400/35 dark:text-amber-100"
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    )
  );
}

/**
 * İlk ":" işaretinden önceki kısa klinik kavramı kalınlaştırır (saat/oran/URL hariç)
 * ve varsa aktif arama kelimesini vurgular.
 */
function renderClinicalLine(text: string, query: string, isDark: boolean): React.ReactNode {
  const colonIdx = text.indexOf(': ');
  if (colonIdx > 1 && colonIdx <= 55) {
    const prefix = text.slice(0, colonIdx);
    const rest = text.slice(colonIdx + 2);
    const isUrlOrRatio = /https?$/i.test(prefix) || /\d$/.test(prefix) && /^\d/.test(rest);
    if (!isUrlOrRatio) {
      return (
        <>
          <strong className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {renderHighlightedText(prefix, query)}:
          </strong>{' '}
          <span>{renderHighlightedText(rest, query)}</span>
        </>
      );
    }
  }
  return renderHighlightedText(text, query);
}

function getCockpitToneStyles(tone: CockpitTone, isDark: boolean): { card: string; value: string } {
  const map: Record<CockpitTone, { darkCard: string; lightCard: string; darkVal: string; lightVal: string }> = {
    teal: {
      darkCard: 'bg-teal-950/25 border-teal-500/25',
      lightCard: 'bg-teal-50/70 border-teal-200/80',
      darkVal: 'text-teal-200',
      lightVal: 'text-teal-900'
    },
    sky: {
      darkCard: 'bg-sky-950/25 border-sky-500/25',
      lightCard: 'bg-sky-50/70 border-sky-200/80',
      darkVal: 'text-sky-200',
      lightVal: 'text-sky-900'
    },
    amber: {
      darkCard: 'bg-amber-950/25 border-amber-500/25',
      lightCard: 'bg-amber-50/70 border-amber-200/80',
      darkVal: 'text-amber-200',
      lightVal: 'text-amber-900'
    },
    rose: {
      darkCard: 'bg-rose-950/25 border-rose-500/30',
      lightCard: 'bg-rose-50/70 border-rose-200/80',
      darkVal: 'text-rose-200',
      lightVal: 'text-rose-900'
    },
    violet: {
      darkCard: 'bg-violet-950/25 border-violet-500/30',
      lightCard: 'bg-violet-50/70 border-violet-200/80',
      darkVal: 'text-violet-200',
      lightVal: 'text-violet-900'
    },
    emerald: {
      darkCard: 'bg-emerald-950/25 border-emerald-500/25',
      lightCard: 'bg-emerald-50/70 border-emerald-200/80',
      darkVal: 'text-emerald-200',
      lightVal: 'text-emerald-900'
    }
  };
  return {
    card: isDark ? map[tone].darkCard : map[tone].lightCard,
    value: isDark ? map[tone].darkVal : map[tone].lightVal
  };
}

function getPortalLinkToneClasses(tone: ContextualPortalLink['tone'], isDark: boolean): string {
  const map: Record<ContextualPortalLink['tone'], { dark: string; light: string }> = {
    rose: {
      dark: 'bg-rose-500/10 border-rose-500/30 text-rose-200 hover:bg-rose-500/20',
      light: 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100'
    },
    teal: {
      dark: 'bg-teal-500/10 border-teal-500/30 text-teal-200 hover:bg-teal-500/20',
      light: 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
    },
    sky: {
      dark: 'bg-sky-500/10 border-sky-500/30 text-sky-200 hover:bg-sky-500/20',
      light: 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
    },
    amber: {
      dark: 'bg-amber-500/10 border-amber-500/30 text-amber-200 hover:bg-amber-500/20',
      light: 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
    },
    violet: {
      dark: 'bg-violet-500/10 border-violet-500/30 text-violet-200 hover:bg-violet-500/20',
      light: 'bg-violet-50 border-violet-200 text-violet-800 hover:bg-violet-100'
    }
  };
  return isDark ? map[tone].dark : map[tone].light;
}

function getMicroTagClasses(tone: ClinicalTagTone, isDark: boolean): string {
  const map: Record<ClinicalTagTone, { dark: string; light: string }> = {
    violet: { dark: 'bg-violet-500/15 text-violet-300 border-violet-500/30', light: 'bg-violet-50 text-violet-800 border-violet-200' },
    amber: { dark: 'bg-amber-500/15 text-amber-300 border-amber-500/30', light: 'bg-amber-50 text-amber-900 border-amber-200' },
    sky: { dark: 'bg-sky-500/15 text-sky-300 border-sky-500/30', light: 'bg-sky-50 text-sky-800 border-sky-200' },
    orange: { dark: 'bg-orange-500/15 text-orange-300 border-orange-500/30', light: 'bg-orange-50 text-orange-800 border-orange-200' },
    cyan: { dark: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30', light: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
    rose: { dark: 'bg-rose-500/15 text-rose-300 border-rose-500/30', light: 'bg-rose-50 text-rose-800 border-rose-200' },
    blue: { dark: 'bg-blue-500/15 text-blue-300 border-blue-500/30', light: 'bg-blue-50 text-blue-800 border-blue-200' },
    teal: { dark: 'bg-teal-500/15 text-teal-300 border-teal-500/30', light: 'bg-teal-50 text-teal-800 border-teal-200' },
    fuchsia: { dark: 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30', light: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200' }
  };
  return isDark ? map[tone].dark : map[tone].light;
}

/* =========================================================================
   AKILLI KLİNİK LİSTE BİLEŞENİ (KART-İÇİNDE-KART YORGUNLUĞUNU BİTİRİR)
   ========================================================================= */

interface ClinicalListRendererProps {
  items: string[];
  isDark: boolean;
  accentDotClass?: string;
  subBorderClass?: string;
  headingTextClass?: string;
  searchQuery?: string;
  emptyText?: string;
}

const ClinicalListRenderer: React.FC<ClinicalListRendererProps> = ({
  items,
  isDark,
  accentDotClass = 'bg-teal-500',
  subBorderClass = 'border-teal-500/40',
  headingTextClass,
  searchQuery = '',
  emptyText
}) => {
  if (!items || items.length === 0) {
    return emptyText ? (
      <p className="text-[13px] text-slate-400 italic py-2">{emptyText}</p>
    ) : null;
  }

  return (
    <ul className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-200/80'}`}>
      {items.map((raw, idx) => {
        const trimmed = raw.trim();
        const isIndentedSubItem = /^\s+(?:[-•*]|[a-z]\))\s+/i.test(raw);
        const isSubHeading =
          !isIndentedSubItem &&
          trimmed.length > 0 &&
          trimmed.length <= 105 &&
          trimmed.endsWith(':');

        if (isSubHeading) {
          return (
            <li
              key={idx}
              className={`pt-3 pb-1.5 first:pt-1.5 text-[11px] font-extrabold uppercase tracking-wider ${
                headingTextClass || (isDark ? 'text-teal-300' : 'text-teal-800')
              }`}
            >
              {renderHighlightedText(trimmed, searchQuery)}
            </li>
          );
        }

        if (isIndentedSubItem) {
          const cleanSub = raw.replace(/^\s+(?:[-•*]|[a-z]\))\s+/i, '').trim();
          return (
            <li key={idx} className="py-2 border-t-0">
              <div
                className={`ml-4 pl-3 border-l-2 ${subBorderClass} text-[13px] sm:text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {renderClinicalLine(cleanSub, searchQuery, isDark)}
              </div>
            </li>
          );
        }

        return (
          <li
            key={idx}
            className={`py-2.5 flex items-start gap-2.5 text-[13px] sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${accentDotClass} shrink-0 mt-2`} />
            <div className="flex-1 min-w-0">
              {renderClinicalLine(trimmed, searchQuery, isDark)}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

/* =========================================================================
   ANA PROSEDÜR DETAY GÖRÜNÜMÜ
   ========================================================================= */

export const ProcedureDetailView: React.FC<ProcedureDetailViewProps> = ({
  procedure,
  isDark,
  onBack,
  backLabel,
  onSelectProcedure,
  adjacentProcedures
}) => {
  const isNeuro = procedure.specialty === 'norosirurji';
  const isEye = procedure.specialty === 'goz';

  const [viewMode, setViewMode] = useState<DetailViewMode>('all');
  const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>(DEFAULT_SECTION_OPEN);
  const [subOpen, setSubOpen] = useState<Record<string, boolean>>(DEFAULT_SUB_OPEN);
  const [inProtocolSearch, setInProtocolSearch] = useState('');
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Prosedür değiştiğinde tüm akordeon, arama ve checklist durumunu sıfırla
  useEffect(() => {
    setViewMode('all');
    setSectionOpen({ ...DEFAULT_SECTION_OPEN });
    setSubOpen({ ...DEFAULT_SUB_OPEN });
    setInProtocolSearch('');
    setChecklistOpen(false);
    setCheckedItems({});
    setCopiedSummary(false);
  }, [procedure.id]);

  // Akıllı ayrıştırılmış Hayati İlkeler (memoized)
  const parsedRules = useMemo(() => getProcedureIndispensableRules(procedure), [procedure]);
  const specialtyCockpit = useMemo(
    () =>
      isNeuro
        ? extractNeuroCockpit(procedure)
        : isEye
          ? extractOphthalmologyCockpit(procedure)
          : [],
    [isNeuro, isEye, procedure]
  );
  const contextualLinks = useMemo(
    () => (isEye ? getOphthalmologyContextualLinks(procedure) : getContextualPortalLinks(procedure)),
    [isEye, procedure]
  );
  const checklistItems = useMemo(
    () => (isEye ? buildOphthalmologyQuickChecklist(procedure) : buildProcedureQuickChecklist(procedure)),
    [isEye, procedure]
  );
  const clinicalTags = useMemo(
    () =>
      isNeuro
        ? getClinicalTags(procedure, 4)
        : isEye
          ? getOphthalmologyClinicalTags(procedure, 4)
          : [],
    [isNeuro, isEye, procedure]
  );

  // Protokol içi hızlı arama eşleşme sayacı ve otomatik bölüm açma
  const searchMatchCount = useMemo(() => {
    const q = inProtocolSearch.trim();
    if (!q) return 0;
    const regex = new RegExp(escapeRegExp(q), 'gi');
    const allStrings: string[] = [
      procedure.description,
      ...(procedure.indications || []),
      procedure.averageDuration,
      procedure.bleedingProfile?.estimatedBloodLoss || '',
      procedure.bleedingProfile?.crossMatchRequirement || '',
      ...(procedure.bleedingProfile?.criticalBleedingSources || []),
      ...(procedure.bleedingProfile?.hemostasisStrategies || []),
      ...(procedure.anesthesiaTechniques?.primary || []),
      ...(procedure.anesthesiaTechniques?.alternative || []),
      parsedRules.airwayRationale || '',
      ...parsedRules.rules.flatMap((r) => [r.title, r.content]),
      ...(procedure.preoperative.historyAndPhysical || []),
      ...(procedure.preoperative.laboratoryAndTests || []),
      ...(procedure.preoperative.consultations || []),
      ...(procedure.intraoperative.monitoring || []),
      ...(procedure.intraoperative.vascularAccess || []),
      ...(procedure.intraoperative.anesthesiaManagement || []),
      ...(procedure.intraoperative.airwayManagement || []),
      procedure.intraoperative.patientPosition,
      ...(procedure.intraoperative.patientPositionDetails || []),
      ...(procedure.intraoperative.criticalSurgicalStages || []),
      ...(procedure.intraoperative.emergenceNotes || []),
      ...(procedure.postoperative.painManagement || []),
      ...(procedure.postoperative.prospectRecommendations || []),
      ...(procedure.postoperative.erasRecommendations || []),
      procedure.references.jaffeReference || '',
      procedure.references.erasReference || '',
      procedure.references.prospectReference || '',
      ...(procedure.references.otherReferences || [])
    ];
    let count = 0;
    for (const s of allStrings) {
      const m = s.match(regex);
      if (m) count += m.length;
    }
    return count;
  }, [inProtocolSearch, procedure, parsedRules]);

  useEffect(() => {
    if (inProtocolSearch.trim().length >= 2) {
      setViewMode('all');
      setSectionOpen({
        sec1: true,
        sec2: true,
        sec3: true,
        sec4: true,
        sec5: true,
        sec6: true,
        sec7: true
      });
      setSubOpen({ ...DEFAULT_SUB_OPEN });
    }
  }, [inProtocolSearch]);

  const toggleSection = (key: string) => {
    setSectionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSub = (key: string) => {
    setSubOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setViewMode('all');
    setSectionOpen({
      sec1: true,
      sec2: true,
      sec3: true,
      sec4: true,
      sec5: true,
      sec6: true,
      sec7: true
    });
    setSubOpen({ ...DEFAULT_SUB_OPEN });
  };

  const collapseAll = () => {
    setViewMode('all');
    setSectionOpen({
      sec1: false,
      sec2: false,
      sec3: false,
      sec4: false,
      sec5: false,
      sec6: false,
      sec7: false
    });
    setSubOpen({
      '4a': false,
      '4b': false,
      '4c': false,
      '5a': false,
      '5b': false,
      '5c': false,
      '5d': false,
      '5e': false,
      '5f': false,
      '5g': false,
      '6a': false,
      '6b': false,
      '6c': false
    });
  };

  const scrollToTarget = (sectionId: string, subKey?: string) => {
    setViewMode('all');
    setSectionOpen((prev) => ({ ...prev, [sectionId]: true }));
    if (subKey) {
      setSubOpen((prev) => ({ ...prev, [subKey]: true }));
    }
    const targetDomId = subKey ? `sub${subKey}` : sectionId;
    setTimeout(() => {
      const el = document.getElementById(targetDomId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleCopySummary = async () => {
    const text = isEye
      ? buildOphthalmologyDutySummaryText(procedure)
      : buildProcedureDutySummaryText(procedure);
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2200);
    }
  };

  const handleViewModeChange = (mode: DetailViewMode) => {
    setViewMode(mode);
    if (mode === 'preop') {
      setSectionOpen((prev) => ({ ...prev, sec2: true, sec4: true }));
      setSubOpen((prev) => ({ ...prev, '4a': true, '4b': true, '4c': true }));
    } else if (mode === 'intraop') {
      setSectionOpen((prev) => ({ ...prev, sec3: true, sec5: true }));
      setSubOpen((prev) => ({
        ...prev,
        '5a': true,
        '5b': true,
        '5c': true,
        '5d': true,
        '5e': true,
        '5f': true,
        '5g': true
      }));
    } else if (mode === 'postop') {
      setSectionOpen((prev) => ({ ...prev, sec6: true, sec5: true }));
      setSubOpen((prev) => ({ ...prev, '6a': true, '6b': true, '6c': true, '5g': true }));
    }
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  // Görünüm moduna göre hangi bölümlerin gösterileceği
  const showSec1 = viewMode === 'all';
  const showSec2 = viewMode === 'all' || viewMode === 'preop' || viewMode === 'summary';
  const showSec3 = viewMode === 'all' || viewMode === 'intraop' || viewMode === 'summary';
  const showSec4 = viewMode === 'all' || viewMode === 'preop';
  const showSec5 = viewMode === 'all' || viewMode === 'intraop';
  const showSec6 = viewMode === 'all' || viewMode === 'postop';
  const showSec7 = viewMode === 'all';

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-12 select-text">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBack}
          type="button"
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer w-fit ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{backLabel || 'Tüm Prosedürler Kataloğuna Dön'}</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs px-2.5 py-1 rounded font-medium border ${
              isNeuro
                ? isDark
                  ? 'bg-purple-500/15 border-purple-500/35 text-purple-200'
                  : 'bg-purple-50 border-purple-200 text-purple-800'
                : isEye
                  ? isDark
                    ? 'bg-cyan-500/15 border-cyan-500/35 text-cyan-200'
                    : 'bg-cyan-50 border-cyan-200 text-cyan-800'
                  : isDark
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                    : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            {procedure.specialtyName}
          </span>
          {procedure.categoryTag && (
            <span
              className={`text-xs px-2 py-0.5 rounded font-medium ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {procedure.categoryTag}
            </span>
          )}
          <button
            type="button"
            onClick={handleCopySummary}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              copiedSummary
                ? isDark
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : isDark
                  ? 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-teal-500/50 hover:text-teal-300'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-teal-600 hover:text-teal-800'
            }`}
            title="Nöbet / salon özeti düz metin olarak panoya kopyalanır"
          >
            {copiedSummary ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Nöbet Özeti Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div
        className={`p-5 rounded-2xl border transition-colors ${
          isNeuro
            ? 'border-t-2 border-t-purple-500/70'
            : isEye
              ? 'border-t-2 border-t-cyan-500/70'
              : ''
        } ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 shadow-md'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDark
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                    : 'bg-teal-50 text-teal-800 border border-teal-200'
                }`}
              >
                {procedure.shortCode || 'PROSEDÜR'}
              </span>
              <span className="text-xs text-slate-400 font-medium inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{getShortDuration(procedure.averageDuration)}</span>
              </span>
            </div>

            {clinicalTags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {clinicalTags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getMicroTagClasses(
                      tag.tone,
                      isDark
                    )}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            {procedure.name}
          </h1>
        </div>

        {/* 6 HÜCRELİ BRANŞ HEDEF KOKPİTİ (5 Saniyelik Salon Özeti) */}
        {(isNeuro || isEye) && specialtyCockpit.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                  isEye
                    ? 'text-cyan-600 dark:text-cyan-300'
                    : 'text-purple-600 dark:text-purple-300'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${isEye ? 'text-cyan-500' : 'text-purple-500'}`} />
                <span>{isEye ? 'Oftalmo-Anestezi Hedef Kokpiti' : 'Nöroanestezi Hedef Kokpiti'}</span>
              </span>
              <span className="text-[10px] text-slate-400">Hızlı salon referansı</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {specialtyCockpit.map((cell) => {
                const tone = getCockpitToneStyles(cell.tone, isDark);
                return (
                  <div
                    key={cell.key}
                    className={`p-2.5 rounded-xl border flex flex-col justify-between gap-1 ${tone.card}`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {cell.label}
                    </span>
                    <div className={`text-xs font-extrabold leading-snug ${tone.value}`}>
                      {cell.value}
                    </div>
                    {cell.subValue && (
                      <div className="text-[10px] leading-tight text-slate-500 dark:text-slate-400">
                        {cell.subValue}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 1-TIK BAĞLAMSAL PORTAL ARAÇLARI ŞERİDİ */}
        {contextualLinks.length > 0 && (
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-1">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>İlgili Acil & Monitörizasyon Araçları:</span>
            </span>
            {contextualLinks.map((link) => (
              <PortalLink
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${getPortalLinkToneClasses(
                  link.tone,
                  isDark
                )}`}
              >
                <span>{link.label}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-70" />
              </PortalLink>
            ))}
          </div>
        )}

        {/* İNTERAKTİF AÇILIR/KAPANIR SALON HAZIRLIĞI MİNİ-CHECKLIST */}
        {checklistItems.length > 0 && (
          <div
            className={`mt-4 rounded-xl border overflow-hidden ${
              isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/90 border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setChecklistOpen((v) => !v)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Salon Hazırlığı Mini-Checklist
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                    checkedCount === checklistItems.length
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                      : isDark
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {checkedCount}/{checklistItems.length}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <span>{checklistOpen ? 'Gizle' : 'Vaka Öncesi Kontrol'}</span>
                {checklistOpen ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </span>
            </button>

            {checklistOpen && (
              <div className="px-3.5 pb-3 pt-1 border-t border-slate-200/70 dark:border-slate-800/80 divide-y divide-slate-200/60 dark:divide-slate-800/60">
                {checklistItems.map((item, idx) => {
                  const isDone = Boolean(checkedItems[idx]);
                  return (
                    <label
                      key={idx}
                      className="flex items-start gap-2.5 py-2 cursor-pointer text-xs sm:text-[13px] leading-relaxed"
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() =>
                          setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))
                        }
                        className="mt-1 rounded border-slate-400 text-teal-600 focus:ring-teal-500 cursor-pointer"
                      />
                      <span
                        className={
                          isDone
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : isDark
                              ? 'text-slate-300'
                              : 'text-slate-700'
                        }
                      >
                        {renderClinicalLine(item, inProtocolSearch, isDark)}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* GÖRÜNÜM MODU SEKMELERİ + PROTOKOL İÇİ HIZLI ARAMA */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
            {(
              [
                { id: 'summary', label: 'Hızlı Salon Özeti' },
                { id: 'preop', label: 'Pre-op (4)' },
                { id: 'intraop', label: 'İntra-op (5)' },
                { id: 'postop', label: 'Post-op (6)' },
                { id: 'all', label: 'Tümü (1–7)' }
              ] as { id: DetailViewMode; label: string }[]
            ).map((tab) => {
              const active = viewMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleViewModeChange(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    active
                      ? isDark
                        ? 'bg-teal-500/20 border-teal-500/50 text-teal-200'
                        : 'bg-teal-700 border-teal-700 text-white shadow-2xs'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-100'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={inProtocolSearch}
              onChange={(e) => setInProtocolSearch(e.target.value)}
              placeholder="Protokol içi ara (örn. MAP, TOF, mannitol)..."
              className={`w-full pl-8 pr-16 py-1.5 rounded-lg text-xs border outline-hidden transition-colors ${
                isDark
                  ? 'bg-slate-950/80 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-teal-500/60'
                  : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-teal-600'
              }`}
            />
            {inProtocolSearch.trim() && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  {searchMatchCount}
                </span>
                <button
                  type="button"
                  onClick={() => setInProtocolSearch('')}
                  className="p-0.5 text-slate-400 hover:text-slate-200 cursor-pointer"
                  aria-label="Protokol içi aramayı temizle"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* YAPIŞKAN HIZLI GEÇİŞ ALT ÇUBUĞU (sticky top-16 z-20) */}
      <div
        className={`sticky top-16 z-20 px-3 py-2 rounded-xl border backdrop-blur-md transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 shadow-md'
            : 'bg-white/95 border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 sm:pb-0 text-xs scrollbar-thin">
          <button
            type="button"
            onClick={() => scrollToTarget('sec1')}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            1. Tanım
          </button>
          {procedure.bleedingProfile && (
            <button
              type="button"
              onClick={() => scrollToTarget('sec2')}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1"
            >
              <Droplet className="w-3 h-3 text-rose-500" />
              <span>2. Kanama</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => scrollToTarget('sec3')}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            3. Teknikler
          </button>
          <button
            type="button"
            onClick={() => scrollToTarget('sec4')}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            4. Pre-op
          </button>
          <button
            type="button"
            onClick={() => scrollToTarget('sec5')}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            5. İntra-op
          </button>
          <button
            type="button"
            onClick={() => scrollToTarget('sec5', '5f')}
            className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold whitespace-nowrap cursor-pointer transition-colors border border-rose-300/70 dark:border-rose-700/60 flex items-center gap-1"
          >
            <ShieldAlert className="w-3 h-3 text-rose-500" />
            <span>Kritik Aşamalar (5f)</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToTarget('sec6')}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            6. Post-op
          </button>
          <button
            type="button"
            onClick={() => scrollToTarget('sec7')}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            7. Kaynaklar
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={expandAll}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 cursor-pointer transition-colors"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Genişlet</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            type="button"
            onClick={collapseAll}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer transition-colors"
          >
            <Minimize2 className="w-3 h-3" />
            <span>Daralt</span>
          </button>
        </div>
      </div>

      {/* HIZLI SALON ÖZETİ MODU ÖZEL KISAYOL: 5f KRİTİK AŞAMALAR & 5g UYANDIRMA */}
      {viewMode === 'summary' && (
        <div className="space-y-4">
          {/* Kritik Aşamalar Stepper (Hızlı Özet) */}
          <div
            className={`rounded-xl border overflow-hidden ${
              isDark ? 'bg-slate-900/80 border-rose-900/50' : 'bg-white border-rose-200 shadow-xs'
            }`}
          >
            <div className="p-4 flex items-center justify-between border-b border-rose-200/60 dark:border-rose-900/40">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  5f) Kritik Karar Noktaları ve Cerrahi Aşamalar (Kronolojik Akış)
                </h2>
              </div>
              <button
                type="button"
                onClick={() => scrollToTarget('sec5')}
                className="text-xs font-semibold text-teal-700 dark:text-teal-300 hover:underline cursor-pointer"
              >
                Tüm İntra-op Detayına Geç →
              </button>
            </div>
            <div className="p-4">
              <ol className="relative space-y-3 before:content-[''] before:absolute before:left-[13px] before:top-3 before:bottom-3 before:w-0.5 before:bg-rose-200 dark:before:bg-rose-900/70">
                {procedure.intraoperative.criticalSurgicalStages.map((cs, idx) => (
                  <li key={idx} className="relative pl-9">
                    <span className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-rose-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-2xs">
                      {idx + 1}
                    </span>
                    <div
                      className={`p-3 rounded-lg border text-[13px] sm:text-sm leading-relaxed ${
                        isDark
                          ? 'bg-rose-950/20 border-rose-900/40 text-rose-100'
                          : 'bg-rose-50/70 border-rose-200/80 text-rose-950'
                      }`}
                    >
                      {renderClinicalLine(cs, inProtocolSearch, isDark)}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Pozisyon & Uyanma Özeti */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              className={`rounded-xl border p-4 space-y-2.5 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-300">
                5e) Hasta Pozisyonu & Güvenlik
              </div>
              <div
                className={`p-3 rounded-lg text-[13px] sm:text-sm font-bold ${
                  isDark
                    ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                    : 'bg-amber-50 text-amber-950 border border-amber-200'
                }`}
              >
                {renderHighlightedText(procedure.intraoperative.patientPosition, inProtocolSearch)}
              </div>
              {procedure.intraoperative.patientPositionDetails && (
                <ClinicalListRenderer
                  items={procedure.intraoperative.patientPositionDetails}
                  isDark={isDark}
                  accentDotClass="bg-amber-500"
                  subBorderClass="border-amber-500/40"
                  searchQuery={inProtocolSearch}
                />
              )}
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2.5 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                5g) Uyandırma (Emergence) & Devir
              </div>
              <ClinicalListRenderer
                items={procedure.intraoperative.emergenceNotes}
                isDark={isDark}
                accentDotClass="bg-emerald-500"
                subBorderClass="border-emerald-500/40"
                searchQuery={inProtocolSearch}
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          BÖLÜM 1: PROSEDÜR İSMİ - TANIMI - ENDİKASYONLARI - TAHMİNİ SÜRE
         ========================================================================= */}
      {showSec1 && (
        <section id="sec1" className="scroll-mt-32">
          <div
            className={`rounded-xl border transition-colors overflow-hidden ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleSection('sec1')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  1
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Cerrahi operasyon özeti, temel endikasyonlar ve aşamalı süre kırılımı
                  </p>
                </div>
              </div>
              {sectionOpen.sec1 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>

            {sectionOpen.sec1 && (
              <div className="p-4 pt-3 space-y-4 border-t border-slate-100 dark:border-slate-800/70">
                <div
                  className={`p-4 rounded-lg text-[13px] sm:text-sm leading-relaxed ${
                    isDark
                      ? 'bg-slate-950/60 text-slate-300 border border-slate-800/80'
                      : 'bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  <strong className="text-teal-700 dark:text-teal-300 block mb-1 text-xs uppercase tracking-wider">
                    Cerrahi Prosedür Tanımı
                  </strong>
                  {renderHighlightedText(procedure.description, inProtocolSearch)}
                </div>

                <div
                  className={`p-4 rounded-lg border ${
                    isDark ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Temel Cerrahi Endikasyonlar:
                  </span>
                  <ClinicalListRenderer
                    items={procedure.indications}
                    isDark={isDark}
                    accentDotClass="bg-teal-500"
                    subBorderClass="border-teal-500/40"
                    searchQuery={inProtocolSearch}
                  />
                </div>

                <div
                  className={`p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 text-xs sm:text-[13px] ${
                    isDark
                      ? 'bg-amber-500/10 border-amber-500/25 text-amber-200'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <strong>Tahmini Ortalama Cerrahi Süresi:</strong>
                  </div>
                  <span className="font-mono font-semibold text-xs sm:text-[13px] leading-relaxed sm:text-right">
                    {renderHighlightedText(procedure.averageDuration, inProtocolSearch)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          BÖLÜM 2: BEKLENEN KANAMA VE TRANSFÜZYON PROFİLİ
         ========================================================================= */}
      {showSec2 && procedure.bleedingProfile && (
        <section id="sec2" className="scroll-mt-32">
          <div
            className={`rounded-xl border transition-colors overflow-hidden ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleSection('sec2')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  2
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <Droplet className="w-4 h-4 text-rose-500 inline-block" />
                      <span>Beklenen Kanama ve Transfüzyon Profili</span>
                    </h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        procedure.bleedingProfile.riskLevel === 'minimal'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                          : procedure.bleedingProfile.riskLevel === 'low'
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30'
                            : procedure.bleedingProfile.riskLevel === 'moderate'
                              ? 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {procedure.bleedingProfile.riskLevelLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tahmini kan kaybı, kan ürünü & Cross-Match hazırlığı ve hemostaz yönetimi
                  </p>
                </div>
              </div>
              {sectionOpen.sec2 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>

            {sectionOpen.sec2 && (
              <div className="p-4 pt-3 space-y-4 border-t border-slate-100 dark:border-slate-800/70">
                {/* 4 Temel Metrik Kartı */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div
                    className={`p-3 rounded-lg border flex flex-col justify-between ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-rose-50/50 border-rose-200/70'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                      Tahmini Ortalama Kan Kaybı
                    </span>
                    <span className="text-[13px] font-bold text-rose-700 dark:text-rose-300 mt-1.5 leading-snug">
                      {renderHighlightedText(procedure.bleedingProfile.estimatedBloodLoss, inProtocolSearch)}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-lg border flex flex-col ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                      Kanama Risk Derecesi
                    </span>
                    <div className="flex-1 flex items-center py-1.5">
                      <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-snug">
                        {procedure.bleedingProfile.riskLevelLabel}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg border flex flex-col justify-between ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                      Kan Ürünü & Cross-Match
                    </span>
                    <span className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 mt-1.5 leading-snug">
                      {renderHighlightedText(procedure.bleedingProfile.crossMatchRequirement, inProtocolSearch)}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-lg border flex flex-col ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                      Transfüzyon İhtimali
                    </span>
                    <div className="flex-1 flex items-center py-1.5">
                      <span className="text-[13px] font-bold text-amber-700 dark:text-amber-300 leading-snug">
                        {procedure.bleedingProfile.transfusionProbability}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Kanama Odakları ve Hemostaz — 2 Sütun Dengeli Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                  {procedure.bleedingProfile.criticalBleedingSources &&
                    procedure.bleedingProfile.criticalBleedingSources.length > 0 && (
                      <div
                        className={`p-3.5 rounded-lg border ${
                          isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>Potansiyel Majör Kanama Odakları</span>
                        </span>
                        <ClinicalListRenderer
                          items={procedure.bleedingProfile.criticalBleedingSources}
                          isDark={isDark}
                          accentDotClass="bg-rose-500"
                          subBorderClass="border-rose-500/40"
                          searchQuery={inProtocolSearch}
                        />
                      </div>
                    )}

                  {procedure.bleedingProfile.hemostasisStrategies &&
                    procedure.bleedingProfile.hemostasisStrategies.length > 0 && (
                      <div
                        className={`p-3.5 rounded-lg border ${
                          isDark ? 'bg-teal-950/15 border-teal-500/20' : 'bg-teal-50/40 border-teal-200/80'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                          <ShieldAlert className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                          <span>Hemostaz & Hasta Kan Yönetimi (PBM)</span>
                        </span>
                        <ClinicalListRenderer
                          items={procedure.bleedingProfile.hemostasisStrategies}
                          isDark={isDark}
                          accentDotClass="bg-teal-500"
                          subBorderClass="border-teal-500/40"
                          searchQuery={inProtocolSearch}
                        />
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          BÖLÜM 3: OLASI ANESTEZİ YÖNETİMİ TEKNİKLERİ & HAYATİ İLKELER
         ========================================================================= */}
      {showSec3 && (
        <section id="sec3" className="scroll-mt-32">
          <div
            className={`rounded-xl border transition-colors overflow-hidden ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleSection('sec3')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  3
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    Olası Anestezi Yönetimi Teknikleri & Hayati İlkeler
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Birincil altın standart, alternatif yaklaşımlar ve prosedüre özgü hayati klinik ilkeler
                  </p>
                </div>
              </div>
              {sectionOpen.sec3 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>

            {sectionOpen.sec3 && (
              <div className="p-4 pt-3 space-y-4 border-t border-slate-100 dark:border-slate-800/70">
                {/* Birincil + Alternatif Teknikler */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                  <div
                    className={`p-3.5 rounded-lg border ${
                      isDark ? 'bg-teal-500/5 border-teal-500/25' : 'bg-teal-50/60 border-teal-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Birincil / Altın Standart Teknikler</span>
                    </div>
                    <ClinicalListRenderer
                      items={procedure.anesthesiaTechniques.primary}
                      isDark={isDark}
                      accentDotClass="bg-teal-500"
                      subBorderClass="border-teal-500/40"
                      searchQuery={inProtocolSearch}
                    />
                  </div>

                  {procedure.anesthesiaTechniques.alternative &&
                    procedure.anesthesiaTechniques.alternative.length > 0 && (
                      <div
                        className={`p-3.5 rounded-lg border ${
                          isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                          <Activity className="w-3.5 h-3.5" />
                          <span>Seçilmiş / Alternatif Teknikler</span>
                        </div>
                        <ClinicalListRenderer
                          items={procedure.anesthesiaTechniques.alternative}
                          isDark={isDark}
                          accentDotClass="bg-slate-400"
                          subBorderClass="border-slate-400/50"
                          searchQuery={inProtocolSearch}
                        />
                      </div>
                    )}
                </div>

                {/* Klinik Tercih Gerekçesi */}
                {parsedRules.airwayRationale && (
                  <div
                    className={`p-3.5 sm:p-4 rounded-xl border text-[13px] sm:text-sm leading-relaxed flex items-start gap-2.5 ${
                      isDark
                        ? 'bg-blue-500/10 border-blue-500/25 text-blue-100'
                        : 'bg-blue-50/70 border-blue-200 text-slate-800'
                    }`}
                  >
                    <BookOpen
                      className={`w-4 h-4 shrink-0 mt-1 ${
                        isDark ? 'text-blue-300' : 'text-blue-700'
                      }`}
                    />
                    <div className="space-y-1">
                      <strong
                        className={`block font-bold text-xs uppercase tracking-wider ${
                          isDark ? 'text-blue-200' : 'text-blue-900'
                        }`}
                      >
                        Klinik Gerekçe:
                      </strong>
                      <p>{renderHighlightedText(parsedRules.airwayRationale, inProtocolSearch)}</p>
                    </div>
                  </div>
                )}

                {/* Hayati Klinik İlkeler — Numaralı 01, 02, 03 Monospace Amber Rozetler */}
                {parsedRules.hasRules && (
                  <div
                    className={`p-4 sm:p-5 rounded-xl border transition-colors space-y-3.5 ${
                      isDark
                        ? 'bg-amber-950/20 border-amber-500/30'
                        : 'bg-amber-50/70 border-amber-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                          isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 dark:text-amber-200">
                            Hayati Klinik İlkeler
                          </span>
                          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            {parsedRules.rules.length} Kritik Öncelik
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 uppercase tracking-tight">
                          {parsedRules.headerTitle}
                        </h4>
                      </div>
                    </div>

                    <div
                      className={`rounded-lg border divide-y overflow-hidden ${
                        isDark
                          ? 'bg-slate-900/90 border-amber-500/25 divide-slate-800'
                          : 'bg-white border-amber-200/80 divide-amber-100'
                      }`}
                    >
                      {parsedRules.rules.map((rule) => (
                        <div key={rule.number} className="p-3.5 flex items-start gap-3">
                          <span
                            className={`px-2 py-1 rounded-md font-mono text-xs font-extrabold shrink-0 mt-0.5 ${
                              isDark
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}
                          >
                            {String(rule.number).padStart(2, '0')}
                          </span>
                          <div className="flex-1 space-y-1 min-w-0">
                            <h5 className="text-[13px] sm:text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-snug">
                              {renderHighlightedText(rule.title, inProtocolSearch)}
                            </h5>
                            <p className="text-[13px] sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                              {renderHighlightedText(rule.content, inProtocolSearch)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          BÖLÜM 4: PRE-OPERATİF HAZIRLIK (4a, ve dengeli 2-sütun 4b + 4c)
         ========================================================================= */}
      {showSec4 && (
        <section id="sec4" className="scroll-mt-32">
          <div
            className={`rounded-xl border transition-colors overflow-hidden ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleSection('sec4')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  4
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    Pre-operatif Hazırlık
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    4a Anamnez/Fizik Muayene, 4b Kan ve Laboratuvar, 4c Konsültasyonlar
                  </p>
                </div>
              </div>
              {sectionOpen.sec4 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>

            {sectionOpen.sec4 && (
              <div className="p-4 pt-3 space-y-3 border-t border-slate-100 dark:border-slate-800/70">
                {/* 4a) Anamnez ve Fizik Muayene */}
                <div
                  className={`rounded-lg border overflow-hidden ${
                    isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSub('4a')}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-teal-700 dark:text-teal-400">
                        4a)
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                        Prosedür Spesifik Anamnez ve Fizik Muayenede Dikkat Edilecekler
                      </span>
                    </div>
                    {subOpen['4a'] ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {subOpen['4a'] && (
                    <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                      <ClinicalListRenderer
                        items={procedure.preoperative.historyAndPhysical || []}
                        isDark={isDark}
                        accentDotClass="bg-teal-500"
                        subBorderClass="border-teal-500/40"
                        searchQuery={inProtocolSearch}
                        emptyText="Genel anestezi preoperatif muayene ilkeleri geçerlidir."
                      />
                    </div>
                  )}
                </div>

                {/* 4b Laboratuvar + 4c Konsültasyonlar — Dengeli 2 Sütun Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {/* 4b) Kan ve Laboratuvar */}
                  <div
                    className={`rounded-lg border overflow-hidden ${
                      isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSub('4b')}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-rose-600 dark:text-rose-400">
                          4b)
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                          Kan ve Laboratuvar Tetkikleri
                        </span>
                      </div>
                      {subOpen['4b'] ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {subOpen['4b'] && (
                      <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                        <ClinicalListRenderer
                          items={procedure.preoperative.laboratoryAndTests || []}
                          isDark={isDark}
                          accentDotClass="bg-rose-500"
                          subBorderClass="border-rose-500/40"
                          searchQuery={inProtocolSearch}
                          emptyText="Standart preoperatif tetkik paneli yeterlidir."
                        />
                      </div>
                    )}
                  </div>

                  {/* 4c) Konsültasyonlar */}
                  <div
                    className={`rounded-lg border overflow-hidden ${
                      isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSub('4c')}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                          4c)
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                          Gerekli Konsültasyonlar
                        </span>
                      </div>
                      {subOpen['4c'] ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {subOpen['4c'] && (
                      <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                        <ClinicalListRenderer
                          items={procedure.preoperative.consultations || []}
                          isDark={isDark}
                          accentDotClass="bg-indigo-500"
                          subBorderClass="border-indigo-500/40"
                          searchQuery={inProtocolSearch}
                          emptyText="Prosedüre özgü ek konsültasyon tanımlanmamıştır."
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          BÖLÜM 5: İNTRA-OPERATİF YÖNETİM (5a+5b grid, 5c, 5d, 5e, 5f stepper, 5g)
         ========================================================================= */}
      {showSec5 && (
        <section id="sec5" className="scroll-mt-32">
          <div
            className={`rounded-xl border transition-colors overflow-hidden ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleSection('sec5')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  5
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    İntra-operatif Yönetim
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    5a Monitörizasyon, 5b Vasküler, 5c Anestezi, 5d Havayolu, 5e Pozisyon, 5f Kritik Anlar, 5g Uyandırma
                  </p>
                </div>
              </div>
              {sectionOpen.sec5 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>

            {sectionOpen.sec5 && (
              <div className="p-4 pt-3 space-y-3 border-t border-slate-100 dark:border-slate-800/70">
                {/* 5a Monitörizasyon + 5b Vasküler Erişim — Dengeli 2 Sütun Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div
                    className={`rounded-lg border overflow-hidden ${
                      isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSub('5a')}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-teal-700 dark:text-teal-400">
                          5a)
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                          Prosedür Spesifik Monitörizasyon
                        </span>
                      </div>
                      {subOpen['5a'] ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {subOpen['5a'] && (
                      <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                        <ClinicalListRenderer
                          items={procedure.intraoperative.monitoring}
                          isDark={isDark}
                          accentDotClass="bg-teal-500"
                          subBorderClass="border-teal-500/40"
                          searchQuery={inProtocolSearch}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className={`rounded-lg border overflow-hidden ${
                      isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSub('5b')}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-cyan-700 dark:text-cyan-400">
                          5b)
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                          Gerekli Vasküler Erişimler
                        </span>
                      </div>
                      {subOpen['5b'] ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {subOpen['5b'] && (
                      <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                        <ClinicalListRenderer
                          items={procedure.intraoperative.vascularAccess}
                          isDark={isDark}
                          accentDotClass="bg-cyan-500"
                          subBorderClass="border-cyan-500/40"
                          searchQuery={inProtocolSearch}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 5c) Prosedür Bazlı Anestezi Yönetimi */}
                <div
                  className={`rounded-lg border overflow-hidden ${
                    isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSub('5c')}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                        5c)
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                        Prosedür Bazlı Anestezi Yönetimi (İndüksiyon, İdame, Nöromusküler Strateji)
                      </span>
                    </div>
                    {subOpen['5c'] ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {subOpen['5c'] && (
                    <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                      <ClinicalListRenderer
                        items={procedure.intraoperative.anesthesiaManagement}
                        isDark={isDark}
                        accentDotClass="bg-blue-500"
                        subBorderClass="border-blue-500/40"
                        headingTextClass={isDark ? 'text-blue-300' : 'text-blue-800'}
                        searchQuery={inProtocolSearch}
                      />
                    </div>
                  )}
                </div>

                {/* 5d) Hava Yolu Yönetimi */}
                <div
                  className={`rounded-lg border overflow-hidden ${
                    isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSub('5d')}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-teal-700 dark:text-teal-400">
                        5d)
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                        Prosedür Bazlı Hava Yolu Yönetimi
                      </span>
                    </div>
                    {subOpen['5d'] ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {subOpen['5d'] && (
                    <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                      <ClinicalListRenderer
                        items={procedure.intraoperative.airwayManagement}
                        isDark={isDark}
                        accentDotClass="bg-teal-500"
                        subBorderClass="border-teal-500/40"
                        searchQuery={inProtocolSearch}
                      />
                    </div>
                  )}
                </div>

                {/* 5e) Hasta Pozisyonu */}
                <div
                  className={`rounded-lg border overflow-hidden ${
                    isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSub('5e')}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400">
                        5e)
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                        Hasta Pozisyonu & Fizyolojik Güvenlik Önlemleri
                      </span>
                    </div>
                    {subOpen['5e'] ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {subOpen['5e'] && (
                    <div className="px-4 pb-3 pt-3 space-y-2.5 border-t border-slate-200/70 dark:border-slate-800/70">
                      <div
                        className={`p-3 rounded-lg text-[13px] sm:text-sm font-bold leading-snug ${
                          isDark
                            ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30'
                            : 'bg-amber-100/80 text-amber-950 border border-amber-200'
                        }`}
                      >
                        {renderHighlightedText(
                          procedure.intraoperative.patientPosition,
                          inProtocolSearch
                        )}
                      </div>
                      {procedure.intraoperative.patientPositionDetails && (
                        <ClinicalListRenderer
                          items={procedure.intraoperative.patientPositionDetails}
                          isDark={isDark}
                          accentDotClass="bg-amber-500"
                          subBorderClass="border-amber-500/40"
                          searchQuery={inProtocolSearch}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* 5f) Kritik Karar Noktaları ve Cerrahi Aşamalar — Dikey Numaralı Kronolojik Stepper */}
                <div
                  id="sub5f"
                  className={`scroll-mt-32 rounded-lg border overflow-hidden ${
                    isDark
                      ? 'bg-rose-950/15 border-rose-900/50'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSub('5f')}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-rose-100/60 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-rose-600 dark:text-rose-400">
                        5f)
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-rose-900 dark:text-rose-200">
                        Prosedür Spesifik Kritik Karar Noktaları ve Cerrahi Aşamalar
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300">
                        {procedure.intraoperative.criticalSurgicalStages.length} Aşama
                      </span>
                    </div>
                    {subOpen['5f'] ? (
                      <ChevronUp className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                  {subOpen['5f'] && (
                    <div className="p-4 border-t border-rose-200/70 dark:border-rose-900/40">
                      <ol className="relative space-y-3 before:content-[''] before:absolute before:left-[13px] before:top-3 before:bottom-3 before:w-0.5 before:bg-rose-300/80 dark:before:bg-rose-800/70">
                        {procedure.intraoperative.criticalSurgicalStages.map((cs, idx) => (
                          <li key={idx} className="relative pl-10">
                            <span className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-rose-600 text-white font-mono text-xs font-extrabold flex items-center justify-center shadow-2xs ring-2 ring-rose-100 dark:ring-slate-900">
                              {idx + 1}
                            </span>
                            <div
                              className={`p-3 rounded-lg border text-[13px] sm:text-sm leading-relaxed ${
                                isDark
                                  ? 'bg-slate-900/90 border-rose-900/50 text-rose-100'
                                  : 'bg-white border-rose-200 text-slate-800'
                              }`}
                            >
                              {renderClinicalLine(cs, inProtocolSearch, isDark)}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                {/* 5g) Uyandırmada Dikkat Edilecekler */}
                <div
                  className={`rounded-lg border overflow-hidden ${
                    isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSub('5g')}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-emerald-700 dark:text-emerald-400">
                        5g)
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                        Uyandırmada (Emergence) Dikkat Edilmesi Gerekenler
                      </span>
                    </div>
                    {subOpen['5g'] ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {subOpen['5g'] && (
                    <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                      <ClinicalListRenderer
                        items={procedure.intraoperative.emergenceNotes}
                        isDark={isDark}
                        accentDotClass="bg-emerald-500"
                        subBorderClass="border-emerald-500/40"
                        searchQuery={inProtocolSearch}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          BÖLÜM 6: POST-OPERATİF YÖNETİM (6a, ve dengeli 2-sütun 6b + 6c)
         ========================================================================= */}
      {showSec6 && (
        <section id="sec6" className="scroll-mt-32">
          <div
            className={`rounded-xl border transition-colors overflow-hidden ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleSection('sec6')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  6
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    6a Ağrı Yönetimi, 6b PROSPECT Rehber Önerileri, 6c ERAS Rehberi Önerileri
                  </p>
                </div>
              </div>
              {sectionOpen.sec6 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>

            {sectionOpen.sec6 && (
              <div className="p-4 pt-3 space-y-3 border-t border-slate-100 dark:border-slate-800/70">
                {/* Post-op modunda 5g Uyandırma hızlı erişimi */}
                {viewMode === 'postop' && (
                  <div
                    className={`rounded-lg border overflow-hidden ${
                      isDark ? 'bg-emerald-950/15 border-emerald-800/50' : 'bg-emerald-50/50 border-emerald-200'
                    }`}
                  >
                    <div className="px-3.5 py-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 border-b border-emerald-200/60 dark:border-emerald-800/50">
                      5g) Uyandırma (Emergence) & Post-op Devir Notları
                    </div>
                    <div className="px-4 pb-3">
                      <ClinicalListRenderer
                        items={procedure.intraoperative.emergenceNotes}
                        isDark={isDark}
                        accentDotClass="bg-emerald-500"
                        subBorderClass="border-emerald-500/40"
                        searchQuery={inProtocolSearch}
                      />
                    </div>
                  </div>
                )}

                {/* 6a) Ağrı Yönetimi */}
                <div
                  className={`rounded-lg border overflow-hidden ${
                    isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSub('6a')}
                    className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                        6a)
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                        Ağrı Yönetimi & Multimodal Analjezi Stratejisi
                      </span>
                    </div>
                    {subOpen['6a'] ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {subOpen['6a'] && (
                    <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                      <ClinicalListRenderer
                        items={procedure.postoperative.painManagement}
                        isDark={isDark}
                        accentDotClass="bg-indigo-500"
                        subBorderClass="border-indigo-500/40"
                        headingTextClass={isDark ? 'text-indigo-300' : 'text-indigo-800'}
                        searchQuery={inProtocolSearch}
                      />
                    </div>
                  )}
                </div>

                {/* 6b PROSPECT + 6c ERAS — Dengeli 2 Sütun Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {/* 6b) PROSPECT */}
                  <div
                    className={`rounded-lg border overflow-hidden ${
                      isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSub('6b')}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-teal-700 dark:text-teal-400">
                          6b)
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                          PROSPECT Rehber Önerileri
                        </span>
                      </div>
                      {subOpen['6b'] ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {subOpen['6b'] && (
                      <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                        <ClinicalListRenderer
                          items={procedure.postoperative.prospectRecommendations || []}
                          isDark={isDark}
                          accentDotClass="bg-teal-500"
                          subBorderClass="border-teal-500/40"
                          headingTextClass={isDark ? 'text-teal-300' : 'text-teal-800'}
                          searchQuery={inProtocolSearch}
                          emptyText="Bu prosedür için yayınlanmış spesifik PROSPECT kılavuzu bulunmamaktadır."
                        />
                      </div>
                    )}
                  </div>

                  {/* 6c) ERAS */}
                  <div
                    className={`rounded-lg border overflow-hidden ${
                      isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSub('6c')}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                          6c)
                        </span>
                        <span className="text-xs sm:text-[13px] font-bold text-slate-800 dark:text-slate-200">
                          ERAS Rehberi Önerileri
                        </span>
                      </div>
                      {subOpen['6c'] ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {subOpen['6c'] && (
                      <div className="px-4 pb-3 border-t border-slate-200/70 dark:border-slate-800/70">
                        <ClinicalListRenderer
                          items={procedure.postoperative.erasRecommendations || []}
                          isDark={isDark}
                          accentDotClass="bg-blue-500"
                          subBorderClass="border-blue-500/40"
                          headingTextClass={isDark ? 'text-blue-300' : 'text-blue-800'}
                          searchQuery={inProtocolSearch}
                          emptyText="Bu prosedür için yayınlanmış spesifik ERAS protokolü bulunmamaktadır."
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          BÖLÜM 7: KULLANILAN KAYNAKLAR VE LİTERATÜR REFERANSLARI
         ========================================================================= */}
      {showSec7 && (
        <section id="sec7" className="scroll-mt-32">
          <div
            className={`rounded-xl border transition-colors overflow-hidden ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-2xs'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleSection('sec7')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  7
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    Kullanılan Kaynaklar ve Literatür Referansları
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Öncelikli rehberler (Jaffe 5th ed, ERAS, PROSPECT) ve ek kaynaklar
                  </p>
                </div>
              </div>
              {sectionOpen.sec7 ? (
                <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
              )}
            </button>

            {sectionOpen.sec7 && (
              <div className="p-4 pt-3 space-y-2.5 border-t border-slate-200 dark:border-slate-800/80 text-xs sm:text-[13px]">
                {procedure.references.jaffeReference && (
                  <div
                    className={`p-3 rounded-lg border leading-relaxed ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <strong className="text-teal-700 dark:text-teal-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      7a) Birincil Kaynak (Jaffe Manual):
                    </strong>
                    <span>{renderHighlightedText(procedure.references.jaffeReference, inProtocolSearch)}</span>
                  </div>
                )}

                {procedure.references.erasReference && (
                  <div
                    className={`p-3 rounded-lg border leading-relaxed ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <strong className="text-blue-700 dark:text-blue-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      7b) ERAS Protokol Referansı:
                    </strong>
                    <span>{renderHighlightedText(procedure.references.erasReference, inProtocolSearch)}</span>
                  </div>
                )}

                {procedure.references.prospectReference && (
                  <div
                    className={`p-3 rounded-lg border leading-relaxed ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <strong className="text-teal-700 dark:text-teal-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      7c) PROSPECT Rehber Referansı:
                    </strong>
                    <span>{renderHighlightedText(procedure.references.prospectReference, inProtocolSearch)}</span>
                  </div>
                )}

                {procedure.references.otherReferences &&
                  procedure.references.otherReferences.length > 0 && (
                    <div
                      className={`p-3 rounded-lg border leading-relaxed ${
                        isDark
                          ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <strong className="text-slate-600 dark:text-slate-400 block text-[11px] uppercase tracking-wider mb-1">
                        7d) Diğer Kullanılan Kaynaklar:
                      </strong>
                      <ul className="space-y-1 list-disc list-inside">
                        {procedure.references.otherReferences.map((ref, idx) => (
                          <li key={idx} className="text-xs leading-relaxed">
                            {renderHighlightedText(ref, inProtocolSearch)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ÖNCEKİ / SONRAKİ PROSEDÜR NAVİGASYONU */}
      {onSelectProcedure && adjacentProcedures && (adjacentProcedures.prev || adjacentProcedures.next) && (
        <div
          className={`pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-3 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          {adjacentProcedures.prev ? (
            <button
              type="button"
              onClick={() => onSelectProcedure(adjacentProcedures.prev!.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 group ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 hover:border-teal-500/50'
                  : 'bg-white border-slate-200 hover:border-teal-600 shadow-2xs'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Önceki Protokol
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate block">
                  {adjacentProcedures.prev.name}
                </span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {adjacentProcedures.next && (
            <button
              type="button"
              onClick={() => onSelectProcedure(adjacentProcedures.next!.id)}
              className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-end gap-3 group ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 hover:border-teal-500/50'
                  : 'bg-white border-slate-200 hover:border-teal-600 shadow-2xs'
              }`}
            >
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Sonraki Protokol
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate block">
                  {adjacentProcedures.next.name}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
