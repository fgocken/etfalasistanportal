import React, { useEffect, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Baby,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Droplets,
  ExternalLink,
  FlaskConical,
  HeartPulse,
  Layers,
  Pill,
  Scale,
  ShieldAlert,
  Stethoscope,
  Syringe,
  Users,
  Wind,
  Zap,
} from 'lucide-react';

/**
 * BİRLEŞİK ALTIN STANDART İLAÇ MONOGRAFİ ŞABLONU (v5.1 — Tam Akordiyon Mimarisi)
 * -------------------------------------------------------------------------
 * Tüm monografi alt başlıkları varsayılan olarak kapalı (`defaultOpen = false`)
 * akordiyon kartlar halinde sunulur; yalnızca en üstteki İlaç Kimlik & Hızlı Özet
 * kartı (`#sec-ozet`) açık kalır. `MonographQuickNav` bağlantıları tıklandığında
 * ilgili akordiyonu otomatik açar ve ekrana kaydırır; "Tümünü Aç / Kapat"
 * düğmeleri tüm başlıkları tek tıkla kontrol eder.
 */
export interface GoldStandardSectionSpec {
  id: string;
  order: number;
  title: string;
  requiredComponent?: string;
}

export const GOLD_STANDARD_SECTIONS: GoldStandardSectionSpec[] = [
  { id: 'sec-guvenlik', order: 1, title: 'ISMP High-Alert & Tall-Man Güvenliği (Akordiyon)', requiredComponent: 'HighAlertSafetyBlock' },
  { id: 'sec-ozet', order: 2, title: 'Klinik Kimlik, Özet & Kısa Etki Mekanizması (#sec-etki)', requiredComponent: 'MechanismOfActionBlock' },
  { id: 'sec-pkpd', order: 3, title: 'Farmakokinetik (ADME) Özellikleri (Akordiyon)' },
  { id: 'sec-kontrendikasyon', order: 4, title: 'Mutlak vs Relatif Kontrendikasyonlar', requiredComponent: 'ContraindicationsGridBlock' },
  { id: 'sec-dozlar', order: 5, title: 'Endikasyonlar & Dozaj' },
  { id: 'sec-hesaplayici', order: 6, title: 'Doz & İnfüzyon Hesaplayıcı', requiredComponent: 'MonographCopyButton' },
  { id: 'sec-tr-preparat', order: 7, title: 'Türkiye Preparat & Konsantrasyon Rehberi', requiredComponent: 'TurkeyFormulationBlock' },
  { id: 'sec-uyumluluk', order: 8, title: 'Damar Yolu, Y-Site Uyumluluk & Ekstravazasyon', requiredComponent: 'CompatibilityAndLineBlock' },
  { id: 'sec-organ', order: 9, title: 'Böbrek & Karaciğer Yetmezliği', requiredComponent: 'OrganImpairmentGridBlock' },
  { id: 'sec-geriatri-obezite', order: 10, title: 'Geriatri & Obezite Doz Yönetimi', requiredComponent: 'GeriatricAndObesityBlock' },
  { id: 'sec-gebelik', order: 11, title: 'Gebelik & Laktasyon', requiredComponent: 'PregnancyLactationBlock' },
  { id: 'sec-olumsuz', order: 12, title: 'Önemli Olumsuz Etkiler (Adverse Effects)', requiredComponent: 'AdverseEffectsBlock' },
  { id: 'sec-ozel-durumlar', order: 13, title: 'Klinisyenin Dikkat Etmesi Gereken Özel Klinik Durumlar', requiredComponent: 'SpecialClinicalCautionsBlock' },
  { id: 'sec-derin-pd', order: 14, title: 'Derin Farmakodinamik & Çok Ölçekli Fizyoloji Analizi (4 Kademeli Akordiyon)', requiredComponent: 'DeepPharmacodynamicsBlock' },
  { id: 'sec-kaynaklar', order: 15, title: 'İlaç Etkileşimleri & Kaynakça (PubMed/DOI)', requiredComponent: 'DrugReferencesAndInteractionsBlock' },
];

export interface MonographAccordionControlDetail {
  action: 'open' | 'open-all' | 'close-all';
  sectionId?: string;
}

export const MONOGRAPH_ACCORDION_EVENT = 'monograph-accordion-control';

export const dispatchMonographAccordionControl = (
  action: MonographAccordionControlDetail['action'],
  sectionId?: string,
) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<MonographAccordionControlDetail>(MONOGRAPH_ACCORDION_EVENT, {
      detail: { action, sectionId },
    }),
  );
};

export const useMonographAccordion = (sectionId?: string, defaultOpen = false) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleControl = (event: Event) => {
      const detail = (event as CustomEvent<MonographAccordionControlDetail>).detail;
      if (!detail) return;
      if (detail.action === 'open-all') {
        setOpen(true);
      } else if (detail.action === 'close-all') {
        setOpen(false);
      } else if (detail.action === 'open' && sectionId && detail.sectionId === sectionId) {
        setOpen(true);
      }
    };
    window.addEventListener(MONOGRAPH_ACCORDION_EVENT, handleControl);
    return () => window.removeEventListener(MONOGRAPH_ACCORDION_EVENT, handleControl);
  }, [sectionId]);

  return [open, setOpen] as const;
};

export interface MonographAccordionSectionProps {
  isDark: boolean;
  sectionId?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  containerClassName?: string;
  headerHoverClassName?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

export const MonographAccordionSection: React.FC<MonographAccordionSectionProps> = ({
  isDark,
  sectionId,
  title,
  subtitle,
  eyebrow,
  icon,
  badge,
  defaultOpen = false,
  containerClassName,
  headerHoverClassName,
  bodyClassName,
  children,
}) => {
  const [open, setOpen] = useMonographAccordion(sectionId, defaultOpen);

  return (
    <section
      id={sectionId}
      className={`overflow-hidden rounded-2xl border transition-all scroll-mt-20 ${
        containerClassName ||
        (isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white')
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left transition-colors ${
          headerHoverClassName ||
          (isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50/90')
        }`}
      >
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          {icon && <div className="shrink-0">{icon}</div>}
          <div className="min-w-0">
            {eyebrow && (
              <p className={`text-[10.5px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {eyebrow}
              </p>
            )}
            <h3 className={`text-sm sm:text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`mt-0.5 text-xs line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {badge}
          <span
            className={`hidden sm:inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {open ? 'Gizle' : 'Aç'}
          </span>
          <div className={isDark ? 'text-slate-400' : 'text-slate-500'}>
            {open ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
          </div>
        </div>
      </button>

      {open && (
        <div
          className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} ${
            bodyClassName || 'p-5 sm:p-6'
          }`}
        >
          {children}
        </div>
      )}
    </section>
  );
};

export interface MonographNavItem {
  id: string;
  label: string;
}

interface MonographQuickNavProps {
  isDark: boolean;
  items: MonographNavItem[];
}

export const MonographQuickNav: React.FC<MonographQuickNavProps> = ({ isDark, items }) => {
  if (!items.length) return null;

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    dispatchMonographAccordionControl('open', id);
    window.setTimeout(() => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 45);
  };

  return (
    <nav
      aria-label="Monografi Bölüm Gezgini"
      className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border p-2 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-slate-50/90'
      }`}
    >
      <div className="flex flex-wrap items-center gap-1">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              isDark
                ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'text-slate-700 hover:bg-white hover:text-slate-950 hover:shadow-xs'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-1.5 border-l pl-2 border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => dispatchMonographAccordionControl('open-all')}
          className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold transition-colors ${
            isDark
              ? 'border-teal-500/30 bg-teal-950/40 text-teal-300 hover:bg-teal-900/50'
              : 'border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100'
          }`}
        >
          <ChevronDown className="h-3 w-3" />
          <span>Tümünü Aç</span>
        </button>
        <button
          type="button"
          onClick={() => dispatchMonographAccordionControl('close-all')}
          className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-semibold transition-colors ${
            isDark
              ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ChevronUp className="h-3 w-3" />
          <span>Tümünü Kapat</span>
        </button>
      </div>
    </nav>
  );
};

interface MonographCopyButtonProps {
  isDark: boolean;
  getText: () => string;
  label?: string;
}

export const MonographCopyButton: React.FC<MonographCopyButtonProps> = ({
  isDark,
  getText,
  label = 'Rapor Kopyala',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = getText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
        copied
          ? isDark
            ? 'border-emerald-500/40 bg-emerald-950/50 text-emerald-300'
            : 'border-emerald-300 bg-emerald-50 text-emerald-700'
          : isDark
            ? 'border-slate-700 bg-slate-800/80 text-slate-200 hover:border-slate-600 hover:bg-slate-800'
            : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
      }`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? 'Kopyalandı' : label}</span>
    </button>
  );
};

interface HighAlertSafetyBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  tallManName: string;
  confusionRiskWith: string;
  criticalAlerts: string[];
  antidoteOrRescue: string;
  defaultOpen?: boolean;
}

export const HighAlertSafetyBlock: React.FC<HighAlertSafetyBlockProps> = ({
  isDark,
  sectionId = 'sec-guvenlik',
  sectionTitle = 'ISMP Yüksek Riskli İlaç Güvenliği & Tall-Man Lettering',
  tallManName,
  confusionRiskWith,
  criticalAlerts,
  antidoteOrRescue,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useMonographAccordion(sectionId, defaultOpen);

  return (
    <section
      id={sectionId}
      className={`overflow-hidden rounded-2xl border transition-all scroll-mt-20 ${
        isDark
          ? 'border-rose-900/60 bg-rose-950/20'
          : 'border-rose-200 bg-rose-50/70'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`flex w-full cursor-pointer flex-col gap-3 p-4 sm:p-5 text-left transition-colors sm:flex-row sm:items-center sm:justify-between ${
          isDark ? 'hover:bg-rose-950/35' : 'hover:bg-rose-100/60'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
              isDark
                ? 'border-rose-500/30 bg-rose-950/60 text-rose-300'
                : 'border-rose-200 bg-white text-rose-600'
            }`}
          >
            <AlertOctagon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                ISMP High-Alert Medication · Çift Kontrol Zorunlu
              </p>
              <span
                className={`rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
                  isDark ? 'bg-rose-950/80 text-rose-200' : 'bg-white text-rose-700 border border-rose-200'
                }`}
              >
                {open ? 'Gizle' : 'Aç'}
              </span>
            </div>
            <h3 className={`mt-0.5 text-sm sm:text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {sectionTitle}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <div
            className={`rounded-xl border px-3 py-1.5 font-mono text-xs ${
              isDark
                ? 'border-rose-500/30 bg-slate-950/70 text-rose-200'
                : 'border-rose-200 bg-white text-rose-900'
            }`}
          >
            <span className={`block text-[10px] uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              ISMP Tall-Man Etiketleme
            </span>
            <span className="font-bold tracking-wide">{tallManName}</span>
            <span className={`mx-1.5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>vs</span>
            <span className="font-semibold">{confusionRiskWith}</span>
          </div>
          <div className={`shrink-0 ${isDark ? 'text-rose-300' : 'text-rose-600'}`}>
            {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </div>
      </button>

      {open && (
        <div
          className={`grid grid-cols-1 gap-3 border-t p-4 sm:p-5 lg:grid-cols-3 ${
            isDark ? 'border-rose-900/40' : 'border-rose-200/80'
          }`}
        >
          <div
            className={`rounded-xl border p-4 lg:col-span-2 ${
              isDark ? 'border-slate-800 bg-slate-950/60' : 'border-rose-200/80 bg-white'
            }`}
          >
            <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Kritik Uygulama ve Karışma Riski Önlemleri
            </p>
            <ul className={`mt-2.5 space-y-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {criticalAlerts.map((alert, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-rose-400' : 'bg-rose-600'}`} />
                  <span>{alert}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`rounded-xl border p-4 ${
              isDark ? 'border-amber-500/30 bg-amber-950/20' : 'border-amber-200 bg-amber-50/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className={`h-4 w-4 ${isDark ? 'text-amber-300' : 'text-amber-700'}`} />
              <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                Doz Aşımı / Antidot &amp; Kurtarma
              </p>
            </div>
            <p className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {antidoteOrRescue}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

interface ContraindicationsGridBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  absoluteTitle?: string;
  absoluteItems: string[];
  relativeTitle?: string;
  relativeItems: string[];
  clinicalNote?: string;
  defaultOpen?: boolean;
}

export const ContraindicationsGridBlock: React.FC<ContraindicationsGridBlockProps> = ({
  isDark,
  sectionId = 'sec-kontrendikasyon',
  sectionTitle = 'Mutlak ve Relatif Kontrendikasyonlar',
  absoluteTitle = 'Mutlak Kontrendikasyonlar',
  absoluteItems,
  relativeTitle = 'Relatif Kontrendikasyonlar & Dikkat Edilecek Durumlar',
  relativeItems,
  clinicalNote,
  defaultOpen = false,
}) => {
  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      title={sectionTitle}
      defaultOpen={defaultOpen}
      icon={<AlertTriangle className={`h-5 w-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />}
      badge={
        <span
          className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
            isDark
              ? 'border-rose-500/30 bg-rose-950/50 text-rose-300'
              : 'border-rose-200 bg-rose-50 text-rose-700'
          }`}
        >
          {absoluteItems.length} Mutlak · {relativeItems.length} Relatif
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-rose-500/30 bg-rose-950/20' : 'border-rose-200 bg-rose-50/60'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
            {absoluteTitle}
          </p>
          <ul className={`mt-2.5 space-y-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {absoluteItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-rose-400' : 'bg-rose-600'}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-amber-500/30 bg-amber-950/20' : 'border-amber-200 bg-amber-50/60'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
            {relativeTitle}
          </p>
          <ul className={`mt-2.5 space-y-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {relativeItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-amber-400' : 'bg-amber-600'}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {clinicalNote && (
        <p
          className={`mt-3 rounded-xl border px-3.5 py-2.5 text-xs leading-relaxed ${
            isDark
              ? 'border-slate-800 bg-slate-950/60 text-slate-300'
              : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        >
          <span className="font-semibold">Klinik Not: </span>
          {clinicalNote}
        </p>
      )}
    </MonographAccordionSection>
  );
};

export interface OrganRenalMatrixRow {
  stage: string;
  doseBadge: string;
  severeDoseBadge?: string;
  note: string;
  tone?: 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo';
}

export interface OrganHepaticTierCard {
  childPugh: string;
  badge: string;
  detail: string;
  tone?: 'emerald' | 'amber' | 'rose';
}

export interface OrganImpairmentMatrixPayload {
  renalMatrix: OrganRenalMatrixRow[];
  hepaticMatrix: OrganHepaticTierCard[];
  dualOrganNote?: string;
}

interface OrganImpairmentGridBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  renalSummary: string;
  renalDetails: string[];
  hepaticSummary: string;
  hepaticDetails: string[];
  renalMatrix?: OrganRenalMatrixRow[];
  hepaticMatrix?: OrganHepaticTierCard[];
  dualOrganNote?: string;
  defaultOpen?: boolean;
}

export const OrganImpairmentGridBlock: React.FC<OrganImpairmentGridBlockProps> = ({
  isDark,
  sectionId = 'sec-organ',
  sectionTitle = 'Böbrek ve Karaciğer Yetmezliğinde Doz Yönetimi (eGFR · IHD · PD · CRRT · Child-Pugh)',
  renalSummary,
  renalDetails,
  hepaticSummary,
  hepaticDetails,
  renalMatrix,
  hepaticMatrix,
  dualOrganNote,
  defaultOpen = false,
}) => {
  const hasSevereCol = Boolean(renalMatrix?.some((row) => Boolean(row.severeDoseBadge)));

  const renalToneBadge = (tone: OrganRenalMatrixRow['tone'] = 'sky') => {
    switch (tone) {
      case 'emerald':
        return isDark
          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
          : 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'amber':
        return isDark
          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          : 'bg-amber-50 text-amber-800 border-amber-200';
      case 'rose':
        return isDark
          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
          : 'bg-rose-50 text-rose-800 border-rose-200';
      case 'indigo':
        return isDark
          ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
          : 'bg-indigo-50 text-indigo-800 border-indigo-200';
      default:
        return isDark
          ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
          : 'bg-sky-50 text-sky-800 border-sky-200';
    }
  };

  const hepaticToneStyles = (tone: OrganHepaticTierCard['tone'] = 'emerald') => {
    if (tone === 'rose') {
      return {
        card: isDark ? 'border-rose-900/50 bg-rose-950/20' : 'border-rose-200 bg-rose-50/40',
        title: isDark ? 'text-rose-100' : 'text-rose-950',
        badge: isDark ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-rose-100 text-rose-800 border-rose-200',
      };
    }
    if (tone === 'amber') {
      return {
        card: isDark ? 'border-amber-900/50 bg-amber-950/15' : 'border-amber-200 bg-amber-50/40',
        title: isDark ? 'text-amber-100' : 'text-amber-950',
        badge: isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-amber-100 text-amber-800 border-amber-200',
      };
    }
    return {
      card: isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70',
      title: isDark ? 'text-slate-100' : 'text-slate-900',
      badge: isDark ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };
  };

  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      title={sectionTitle}
      subtitle="eGFR kademeleri, IHD, Periton Diyalizi, CRRT, SLED ve Child-Pugh A / B / C doz matrisi"
      defaultOpen={defaultOpen}
      icon={<Stethoscope className={`h-5 w-5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />}
      bodyClassName="p-5 sm:p-6 space-y-5"
    >
      {/* Özet & Klinik Kurallar Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
            Böbrek Yetmezliği &amp; RRT Özeti (eGFR / IHD / CRRT)
          </p>
          <p className={`mt-1.5 text-xs sm:text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {renalSummary}
          </p>
          <ul className={`mt-2.5 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {renalDetails.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-sky-400' : 'bg-sky-600'}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
            Karaciğer Yetmezliği Özeti (Child-Pugh A / B / C)
          </p>
          <p className={`mt-1.5 text-xs sm:text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {hepaticSummary}
          </p>
          <ul className={`mt-2.5 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {hepaticDetails.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* TAM BÖBREK & RRT DOZ MATRİSİ TABLOSU */}
      {renalMatrix && renalMatrix.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
              Böbrek Fonksiyon Kademeleri &amp; Renal Replasman (IHD · PD · CRRT · SLED) Doz Matrisi
            </h4>
          </div>
          <div
            className={`overflow-x-auto rounded-xl border ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-700'}>
                  <th className="p-3 text-xs font-bold whitespace-nowrap">Böbrek Fonksiyonu / RRT</th>
                  <th className="p-3 text-xs font-bold whitespace-nowrap">
                    {hasSevereCol ? 'Standart Endikasyon Dozu' : 'Önerilen Doz / Revizyon'}
                  </th>
                  {hasSevereCol && (
                    <th className="p-3 text-xs font-bold whitespace-nowrap">Ağır / YBÜ / MDR / Menenjit Dozu</th>
                  )}
                  <th className="p-3 text-xs font-bold">Klinik Yönetim, Diyaliz Klirensi &amp; Zamanlama</th>
                </tr>
              </thead>
              <tbody className={`divide-y text-xs ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
                {renalMatrix.map((row, idx) => (
                  <tr
                    key={`${row.stage}-${idx}`}
                    className={
                      isDark
                        ? idx % 2 === 0
                          ? 'bg-slate-950/40'
                          : 'bg-slate-900/40'
                        : idx % 2 === 0
                          ? 'bg-white'
                          : 'bg-slate-50/60'
                    }
                  >
                    <td className={`p-3 font-bold align-top whitespace-nowrap ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {row.stage}
                    </td>
                    <td className="p-3 align-top">
                      <span
                        className={`inline-block rounded-lg border px-2 py-1 font-mono text-[11px] font-bold leading-snug ${renalToneBadge(
                          row.tone
                        )}`}
                      >
                        {row.doseBadge}
                      </span>
                    </td>
                    {hasSevereCol && (
                      <td className="p-3 align-top">
                        {row.severeDoseBadge ? (
                          <span
                            className={`inline-block rounded-lg border px-2 py-1 font-mono text-[11px] font-bold leading-snug ${
                              isDark
                                ? 'border-purple-500/30 bg-purple-950/40 text-purple-200'
                                : 'border-purple-200 bg-purple-50 text-purple-900'
                            }`}
                          >
                            {row.severeDoseBadge}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    )}
                    <td className={`p-3 align-top leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CHILD-PUGH A / B / C KARACİĞER YETMEZLİĞİ KARTLARI */}
      {hepaticMatrix && hepaticMatrix.length > 0 && (
        <div className="space-y-2.5">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
            Karaciğer Yetmezliği Sınıflaması (Child-Turcotte-Pugh A / B / C)
          </h4>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {hepaticMatrix.map((tier, idx) => {
              const st = hepaticToneStyles(tier.tone);
              return (
                <div key={`${tier.childPugh}-${idx}`} className={`rounded-xl border p-4 space-y-2 ${st.card}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-xs sm:text-sm font-bold ${st.title}`}>{tier.childPugh}</span>
                    <span className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold ${st.badge}`}>
                      {tier.badge}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {tier.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {dualOrganNote && (
        <div
          className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-xs leading-relaxed ${
            isDark
              ? 'border-amber-500/30 bg-amber-950/20 text-amber-200'
              : 'border-amber-200 bg-amber-50/70 text-amber-950'
          }`}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <div>
            <strong>Kombine Organ Yetmezliği / Hipoalbüminemi / Siroz Notu: </strong>
            <span>{dualOrganNote}</span>
          </div>
        </div>
      )}
    </MonographAccordionSection>
  );
};

interface PregnancyLactationBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  pregnancySummary: string;
  pregnancyDetails: string[];
  lactationSummary: string;
  lactationDetails: string[];
  defaultOpen?: boolean;
}

export const PregnancyLactationBlock: React.FC<PregnancyLactationBlockProps> = ({
  isDark,
  sectionId = 'sec-gebelik',
  sectionTitle = 'Gebelik, Obstetrik ve Laktasyon Güvenliği',
  pregnancySummary,
  pregnancyDetails,
  lactationSummary,
  lactationDetails,
  defaultOpen = false,
}) => {
  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      title={sectionTitle}
      subtitle={pregnancySummary}
      defaultOpen={defaultOpen}
      icon={<Baby className={`h-5 w-5 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-2">
            <HeartPulse className={`h-4 w-4 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
            <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>
              Gebelik &amp; Uteroplasental Etki
            </p>
          </div>
          <p className={`mt-1.5 text-xs sm:text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {pregnancySummary}
          </p>
          <ul className={`mt-2.5 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {pregnancyDetails.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-pink-400' : 'bg-pink-600'}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
            Laktasyon &amp; Emzirme
          </p>
          <p className={`mt-1.5 text-xs sm:text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lactationSummary}
          </p>
          <ul className={`mt-2.5 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {lactationDetails.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MonographAccordionSection>
  );
};

export interface MechanismPillar {
  title: string;
  detail: string;
}

interface MechanismOfActionBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  summary: string;
  pillars: MechanismPillar[];
  defaultOpen?: boolean;
}

export const MechanismOfActionBlock: React.FC<MechanismOfActionBlockProps> = ({
  isDark,
  sectionId = 'sec-etki',
  sectionTitle = 'Etki Mekanizması & Moleküler Farmakodinamik',
  summary,
  pillars,
  defaultOpen = false,
}) => {
  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      title={sectionTitle}
      subtitle={summary}
      defaultOpen={defaultOpen}
      icon={<Zap className={`h-5 w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />}
    >
      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        {summary}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className={`rounded-xl border p-3.5 ${
              isDark ? 'border-indigo-500/25 bg-indigo-950/20' : 'border-indigo-200 bg-indigo-50/50'
            }`}
          >
            <p className={`text-xs font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-800'}`}>
              {pillar.title}
            </p>
            <p className={`mt-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {pillar.detail}
            </p>
          </div>
        ))}
      </div>
    </MonographAccordionSection>
  );
};

export interface AdverseEffectItem {
  title: string;
  incidenceOrSeverity?: string;
  detail: string;
  tone?: 'rose' | 'amber' | 'indigo' | 'teal';
}

interface AdverseEffectsBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  items: AdverseEffectItem[];
  defaultOpen?: boolean;
}

export const AdverseEffectsBlock: React.FC<AdverseEffectsBlockProps> = ({
  isDark,
  sectionId = 'sec-olumsuz',
  sectionTitle = 'Önemli Olumsuz Etkiler (Adverse Effects)',
  items,
  defaultOpen = false,
}) => {
  const toneStyles = (tone: AdverseEffectItem['tone'] = 'rose') => {
    switch (tone) {
      case 'amber':
        return {
          box: isDark ? 'border-amber-500/30 bg-amber-950/20' : 'border-amber-200 bg-amber-50/60',
          title: isDark ? 'text-amber-300' : 'text-amber-800',
        };
      case 'indigo':
        return {
          box: isDark ? 'border-indigo-500/30 bg-indigo-950/20' : 'border-indigo-200 bg-indigo-50/60',
          title: isDark ? 'text-indigo-300' : 'text-indigo-800',
        };
      case 'teal':
        return {
          box: isDark ? 'border-teal-500/30 bg-teal-950/20' : 'border-teal-200 bg-teal-50/60',
          title: isDark ? 'text-teal-300' : 'text-teal-800',
        };
      default:
        return {
          box: isDark ? 'border-rose-500/30 bg-rose-950/20' : 'border-rose-200 bg-rose-50/60',
          title: isDark ? 'text-rose-300' : 'text-rose-800',
        };
    }
  };

  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      title={sectionTitle}
      defaultOpen={defaultOpen}
      icon={<HeartPulse className={`h-5 w-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />}
      badge={
        <span
          className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
            isDark
              ? 'border-rose-500/30 bg-rose-950/40 text-rose-300'
              : 'border-rose-200 bg-rose-50 text-rose-700'
          }`}
        >
          {items.length} Etki
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, idx) => {
          const styles = toneStyles(item.tone);
          return (
            <div key={idx} className={`rounded-xl border p-3.5 space-y-1.5 ${styles.box}`}>
              <div className="flex items-start justify-between gap-2">
                <p className={`text-xs font-bold leading-snug ${styles.title}`}>{item.title}</p>
                {item.incidenceOrSeverity && (
                  <span className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-black/10 dark:bg-white/10 text-slate-700 dark:text-slate-200">
                    {item.incidenceOrSeverity}
                  </span>
                )}
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {item.detail}
              </p>
            </div>
          );
        })}
      </div>
    </MonographAccordionSection>
  );
};

export interface ClinicalCautionItem {
  title: string;
  detail: string;
}

interface SpecialClinicalCautionsBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  items: ClinicalCautionItem[];
  defaultOpen?: boolean;
}

export const SpecialClinicalCautionsBlock: React.FC<SpecialClinicalCautionsBlockProps> = ({
  isDark,
  sectionId = 'sec-ozel-durumlar',
  sectionTitle = 'Klinisyenin Dikkat Etmesi Gereken Özel Klinik Durumlar',
  items,
  defaultOpen = false,
}) => {
  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      title={sectionTitle}
      defaultOpen={defaultOpen}
      icon={<Stethoscope className={`h-5 w-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />}
      badge={
        <span
          className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
            isDark
              ? 'border-teal-500/30 bg-teal-950/40 text-teal-300'
              : 'border-teal-200 bg-teal-50 text-teal-700'
          }`}
        >
          {items.length} Başlık
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-xs sm:text-sm leading-relaxed ${
              isDark ? 'border-slate-800 bg-slate-950/60 text-slate-300' : 'border-slate-200 bg-slate-50/70 text-slate-700'
            }`}
          >
            <span className={`font-bold shrink-0 ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>•</span>
            <div>
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>{item.title}: </strong>
              <span>{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </MonographAccordionSection>
  );
};

export interface VerifiedDrugReference {
  authors: string;
  title: string;
  journal: string;
  year: number;
  pmid?: string;
  doi?: string;
  url?: string;
  note?: string;
}

export interface StructuredDrugInteraction {
  severity: 'X' | 'D' | 'C';
  agent: string;
  mechanism: string;
  clinicalEffect: string;
  management: string;
}

interface DrugReferencesAndInteractionsBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  drugName: string;
  references: VerifiedDrugReference[];
  structuredInteractions?: StructuredDrugInteraction[];
  drugsComUrl?: string;
  medscapeUrl?: string;
  drugsComLabel?: string;
  medscapeLabel?: string;
  defaultOpen?: boolean;
}

export const DrugReferencesAndInteractionsBlock: React.FC<DrugReferencesAndInteractionsBlockProps> = ({
  isDark,
  sectionId = 'sec-kaynaklar',
  sectionTitle = 'Şiddet Dereceli İlaç Etkileşimleri & Kanıta Dayalı Kaynakça',
  drugName,
  references,
  structuredInteractions,
  drugsComUrl,
  medscapeUrl,
  drugsComLabel = 'Drugs.com Interaction Checker',
  medscapeLabel = 'Medscape Drug Reference & Interactions',
  defaultOpen = false,
}) => {
  const severityStyles = (severity: StructuredDrugInteraction['severity']) => {
    if (severity === 'X') {
      return {
        label: 'X · Kontrendike / Kaçın',
        badge: isDark
          ? 'border-rose-500/40 bg-rose-950/70 text-rose-300'
          : 'border-rose-300 bg-rose-100 text-rose-800',
        border: isDark ? 'border-rose-900/60 bg-rose-950/15' : 'border-rose-200 bg-rose-50/40',
      };
    }
    if (severity === 'D') {
      return {
        label: 'D · Majör / Doz Modifikasyonu',
        badge: isDark
          ? 'border-amber-500/40 bg-amber-950/70 text-amber-300'
          : 'border-amber-300 bg-amber-100 text-amber-800',
        border: isDark ? 'border-amber-900/50 bg-amber-950/15' : 'border-amber-200 bg-amber-50/40',
      };
    }
    return {
      label: 'C · Orta / Yakın İzlem',
      badge: isDark
        ? 'border-sky-500/40 bg-sky-950/70 text-sky-300'
        : 'border-sky-300 bg-sky-100 text-sky-800',
      border: isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50/60',
    };
  };

  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      title={sectionTitle}
      defaultOpen={defaultOpen}
      icon={<BookOpen className={`h-5 w-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />}
      badge={
        <span
          className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
            isDark
              ? 'border-teal-500/30 bg-teal-950/40 text-teal-300'
              : 'border-teal-200 bg-teal-50 text-teal-700'
          }`}
        >
          {structuredInteractions && structuredInteractions.length > 0
            ? `${structuredInteractions.length} Etkileşim · `
            : ''}
          {references.length} Kaynak
        </span>
      }
    >
      {structuredInteractions && structuredInteractions.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Kritik Klinik İlaç Etkileşimleri (Şiddet Dereceli)
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-semibold">
              <span className={`rounded-md border px-2 py-0.5 ${isDark ? 'border-rose-500/30 bg-rose-950/50 text-rose-300' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                X: Kontrendike
              </span>
              <span className={`rounded-md border px-2 py-0.5 ${isDark ? 'border-amber-500/30 bg-amber-950/50 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                D: Majör
              </span>
              <span className={`rounded-md border px-2 py-0.5 ${isDark ? 'border-sky-500/30 bg-sky-950/50 text-sky-300' : 'border-sky-200 bg-sky-50 text-sky-700'}`}>
                C: Orta
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
            {structuredInteractions.map((item, idx) => {
              const style = severityStyles(item.severity);
              return (
                <div key={`${item.agent}-${idx}`} className={`rounded-xl border p-3.5 ${style.border}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.agent}
                    </span>
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${style.badge}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className={`mt-1.5 text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Mekanizma: {item.mechanism}
                  </p>
                  <p className={`mt-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    <strong>Klinik Etki:</strong> {item.clinicalEffect}
                  </p>
                  <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-teal-300' : 'text-teal-800'}`}>
                    <strong>Yönetim:</strong> {item.management}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={structuredInteractions && structuredInteractions.length > 0 ? 'mt-5 space-y-2.5' : 'space-y-2.5'}>
        {structuredInteractions && structuredInteractions.length > 0 && (
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Kanıta Dayalı Birincil Kaynaklar (PubMed / DOI)
          </p>
        )}
        {references.map((ref, idx) => {
          const primaryHref = ref.pmid
            ? `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`
            : ref.doi
              ? `https://doi.org/${ref.doi}`
              : ref.url;

          return (
            <div
              key={`${ref.pmid || ref.doi || ref.title}-${idx}`}
              className={`rounded-xl border p-3.5 transition-colors ${
                isDark
                  ? 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className={`text-xs sm:text-sm font-semibold leading-snug ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {ref.title}
                  </p>
                  <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {ref.authors} · <span className="font-medium">{ref.journal}</span> ({ref.year})
                  </p>
                  {ref.note && (
                    <p className={`mt-1 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {ref.note}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-[11px] tabular-nums">
                  {ref.pmid && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 font-semibold transition-colors ${
                        isDark
                          ? 'border-sky-500/30 bg-sky-950/40 text-sky-300 hover:bg-sky-900/50'
                          : 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100'
                      }`}
                    >
                      <span>PMID: {ref.pmid}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {ref.doi && (
                    <a
                      href={`https://doi.org/${ref.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 font-medium transition-colors ${
                        isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 hover:text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950'
                      }`}
                    >
                      <span>DOI</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {!ref.pmid && !ref.doi && primaryHref && (
                    <a
                      href={primaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 font-medium transition-colors ${
                        isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600 hover:text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950'
                      }`}
                    >
                      <span>Kaynak</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {(drugsComUrl || medscapeUrl) && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {drugsComUrl && (
            <a
              href={drugsComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between rounded-xl border p-3.5 transition-colors ${
                isDark
                  ? 'border-slate-800 bg-slate-950/60 hover:border-teal-500/40 hover:bg-slate-900'
                  : 'border-slate-200 bg-slate-50/80 hover:border-teal-300 hover:bg-teal-50/40'
              }`}
            >
              <div>
                <p className={`text-xs font-bold ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
                  {drugsComLabel}
                </p>
                <p className={`mt-0.5 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {drugName} çoklu ilaç etkileşimi ve kontrendikasyon taraması
                </p>
              </div>
              <ExternalLink
                className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                  isDark ? 'text-teal-400' : 'text-teal-600'
                }`}
              />
            </a>
          )}

          {medscapeUrl && (
            <a
              href={medscapeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between rounded-xl border p-3.5 transition-colors ${
                isDark
                  ? 'border-slate-800 bg-slate-950/60 hover:border-sky-500/40 hover:bg-slate-900'
                  : 'border-slate-200 bg-slate-50/80 hover:border-sky-300 hover:bg-sky-50/40'
              }`}
            >
              <div>
                <p className={`text-xs font-bold ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                  {medscapeLabel}
                </p>
                <p className={`mt-0.5 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {drugName} farmakoloji, doz ve etkileşim monografisi
                </p>
              </div>
              <ExternalLink
                className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                  isDark ? 'text-sky-400' : 'text-sky-600'
                }`}
              />
            </a>
          )}
        </div>
      )}
    </MonographAccordionSection>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// v3.0 YAPISAL BLOKLAR: TR PREPARAT, DAMAR YOLU/Y-SITE, GERİATRİ-OBEZİTE,
// VE AÇILIR-KAPANIR 4 SÜTUNLU DERİN FARMAKODİNAMİK ANALİZ
// ─────────────────────────────────────────────────────────────────────────────

export interface TurkeyPreparationItem {
  name: string;
  presentation: string;
  concentration: string;
  saltOrBaseNote?: string;
  alertLevel?: 'high' | 'standard';
}

interface TurkeyFormulationBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  preparations: TurkeyPreparationItem[];
  standardDilutions?: string[];
  concentrationTrapWarning?: string;
  defaultOpen?: boolean;
}

export const TurkeyFormulationBlock: React.FC<TurkeyFormulationBlockProps> = ({
  isDark,
  sectionId = 'sec-tr-preparat',
  sectionTitle = 'Türkiye Preparatları & Konsantrasyon Güvenliği',
  preparations,
  standardDilutions,
  concentrationTrapWarning,
  defaultOpen = false,
}) => {
  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      eyebrow="TİTCK / Türkiye Klinik Pratiği · Formülasyon Doğrulama"
      title={sectionTitle}
      defaultOpen={defaultOpen}
      icon={<Pill className={`h-5 w-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />}
      badge={
        <span
          className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
            isDark
              ? 'border-rose-500/30 bg-rose-950/40 text-rose-300'
              : 'border-rose-200 bg-rose-50 text-rose-700'
          }`}
        >
          {preparations.length} Preparat
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {preparations.map((prep, idx) => {
          const isHigh = prep.alertLevel === 'high';
          return (
            <div
              key={`${prep.name}-${idx}`}
              className={`rounded-xl border p-4 ${
                isHigh
                  ? isDark
                    ? 'border-amber-500/40 bg-amber-950/20'
                    : 'border-amber-300 bg-amber-50/70'
                  : isDark
                    ? 'border-slate-800 bg-slate-950/60'
                    : 'border-slate-200 bg-slate-50/70'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {prep.name}
                </span>
                <span
                  className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums ${
                    isDark
                      ? 'border-slate-700 bg-slate-900 text-teal-300'
                      : 'border-slate-200 bg-white text-teal-800'
                  }`}
                >
                  {prep.concentration}
                </span>
              </div>
              <p className={`mt-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Form / Sunum:</strong> {prep.presentation}
              </p>
              {prep.saltOrBaseNote && (
                <p className={`mt-1.5 text-xs leading-relaxed ${isDark ? 'text-amber-200/90' : 'text-amber-900'}`}>
                  <strong>Tuz / Baz &amp; İçerik Notu:</strong> {prep.saltOrBaseNote}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {standardDilutions && standardDilutions.length > 0 && (
        <div
          className={`mt-4 rounded-xl border p-4 ${
            isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50/80'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Standart Sulandırma &amp; Hazırlama Şemaları
          </p>
          <ul className={`mt-2 space-y-1.5 text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {standardDilutions.map((dil, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-teal-400' : 'bg-teal-600'}`} />
                <span>{dil}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {concentrationTrapWarning && (
        <div
          className={`mt-4 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs sm:text-sm ${
            isDark
              ? 'border-rose-500/30 bg-rose-950/25 text-rose-200'
              : 'border-rose-200 bg-rose-50 text-rose-900'
          }`}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
          <p className="leading-relaxed">
            <strong>Konsantrasyon / Karışma Tuzağı:</strong> {concentrationTrapWarning}
          </p>
        </div>
      )}
    </MonographAccordionSection>
  );
};

interface CompatibilityAndLineBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  accessRequirement: 'central-mandatory' | 'central-preferred' | 'peripheral-ok';
  accessSummary: string;
  phRange?: string;
  osmolalityNote?: string;
  compatibleDiluents: string[];
  ySiteCompatible: string[];
  ySiteIncompatible: string[];
  stabilityNote?: string;
  extravasationProtocol?: string;
  defaultOpen?: boolean;
}

export const CompatibilityAndLineBlock: React.FC<CompatibilityAndLineBlockProps> = ({
  isDark,
  sectionId = 'sec-uyumluluk',
  sectionTitle = 'Damar Yolu, pH/Ozmolalite, Y-Site Uyumluluk & Ekstravazasyon',
  accessRequirement,
  accessSummary,
  phRange,
  osmolalityNote,
  compatibleDiluents,
  ySiteCompatible,
  ySiteIncompatible,
  stabilityNote,
  extravasationProtocol,
  defaultOpen = false,
}) => {
  const accessBadge = (() => {
    if (accessRequirement === 'central-mandatory') {
      return {
        label: 'Santral Venöz Kateter Zorunlu',
        cls: isDark ? 'border-rose-500/40 bg-rose-950/60 text-rose-300' : 'border-rose-300 bg-rose-100 text-rose-800',
      };
    }
    if (accessRequirement === 'central-preferred') {
      return {
        label: 'Ayrı Lümen / Santral Tercihli',
        cls: isDark ? 'border-amber-500/40 bg-amber-950/60 text-amber-300' : 'border-amber-300 bg-amber-100 text-amber-800',
      };
    }
    return {
      label: 'Periferik veya Santral IV Uygun',
      cls: isDark ? 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300' : 'border-emerald-300 bg-emerald-100 text-emerald-800',
    };
  })();

  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      title={sectionTitle}
      defaultOpen={defaultOpen}
      icon={<Syringe className={`h-5 w-5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />}
      badge={
        <span className={`hidden md:inline-flex rounded-lg border px-2 py-0.5 text-[11px] font-bold ${accessBadge.cls}`}>
          {accessBadge.label}
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div
          className={`rounded-xl border p-3.5 md:col-span-2 ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Damar Yolu &amp; Hat Yönetimi
          </p>
          <p className={`mt-1.5 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {accessSummary}
          </p>
        </div>

        <div
          className={`rounded-xl border p-3.5 ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Droplets className={`h-4 w-4 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
            <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              pH &amp; Fizikokimya
            </p>
          </div>
          {phRange && (
            <p className={`mt-1.5 font-mono text-xs font-semibold ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
              pH: {phRange}
            </p>
          )}
          {osmolalityNote && (
            <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {osmolalityNote}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div
          className={`rounded-xl border p-3.5 ${
            isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50/60'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
            Uyumlu Taşıyıcı Sıvılar
          </p>
          <ul className={`mt-2 space-y-1 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {compatibleDiluents.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
          {stabilityNote && (
            <p className={`mt-2 border-t pt-2 text-[11px] ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
              <strong>Stabilite:</strong> {stabilityNote}
            </p>
          )}
        </div>

        <div
          className={`rounded-xl border p-3.5 ${
            isDark ? 'border-emerald-900/50 bg-emerald-950/15' : 'border-emerald-200 bg-emerald-50/50'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-emerald-300' : 'text-emerald-800'}`}>
            Y-Site Uyumlu (Trissel&apos;s / Stabilis)
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {ySiteCompatible.map((drug, idx) => (
              <span
                key={idx}
                className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                  isDark
                    ? 'border-emerald-500/30 bg-emerald-950/60 text-emerald-200'
                    : 'border-emerald-200 bg-white text-emerald-900'
                }`}
              >
                {drug}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`rounded-xl border p-3.5 ${
            isDark ? 'border-rose-900/50 bg-rose-950/15' : 'border-rose-200 bg-rose-50/50'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
            Y-Site Uyumsuz / Aynı Hattan Verme
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {ySiteIncompatible.map((drug, idx) => (
              <span
                key={idx}
                className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
                  isDark
                    ? 'border-rose-500/30 bg-rose-950/60 text-rose-200'
                    : 'border-rose-200 bg-white text-rose-900'
                }`}
              >
                {drug}
              </span>
            ))}
          </div>
        </div>
      </div>

      {extravasationProtocol && (
        <div
          className={`mt-3 rounded-xl border p-3.5 text-xs sm:text-sm ${
            isDark
              ? 'border-amber-500/30 bg-amber-950/20 text-amber-200'
              : 'border-amber-200 bg-amber-50/70 text-amber-950'
          }`}
        >
          <strong>Ekstravazasyon / Ölü Boşluk Güvenliği:</strong> {extravasationProtocol}
        </div>
      )}
    </MonographAccordionSection>
  );
};

interface GeriatricAndObesityBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  geriatricTitle?: string;
  geriatricReductionBadge?: string;
  geriatricPoints: string[];
  obesityTitle?: string;
  obesityWeightScalarBadge?: string;
  obesityPoints: string[];
  clinicalNote?: string;
  defaultOpen?: boolean;
}

export const GeriatricAndObesityBlock: React.FC<GeriatricAndObesityBlockProps> = ({
  isDark,
  sectionId = 'sec-geriatri-obezite',
  sectionTitle = 'Geriatri (>65 Yaş / Kırılganlık) & Obezite Doz Yönetimi',
  geriatricTitle = 'Geriatrik & Kırılgan Hasta (>65 Yaş · Frailty)',
  geriatricReductionBadge,
  geriatricPoints,
  obesityTitle = 'Obezite Doz Ölçekleme (BMI ≥ 30–40 kg/m² · SOBA / Miller’s)',
  obesityWeightScalarBadge,
  obesityPoints,
  clinicalNote,
  defaultOpen = false,
}) => {
  const headerBadgeText = [geriatricReductionBadge, obesityWeightScalarBadge].filter(Boolean).join(' · ');

  return (
    <MonographAccordionSection
      isDark={isDark}
      sectionId={sectionId}
      title={sectionTitle}
      defaultOpen={defaultOpen}
      icon={<Users className={`h-5 w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />}
      badge={
        headerBadgeText ? (
          <span
            className={`hidden md:inline-flex rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
              isDark
                ? 'border-indigo-500/30 bg-indigo-950/40 text-indigo-300'
                : 'border-indigo-200 bg-indigo-50 text-indigo-700'
            }`}
          >
            {headerBadgeText}
          </span>
        ) : undefined
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-indigo-900/50 bg-indigo-950/15' : 'border-indigo-200 bg-indigo-50/50'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className={`text-sm font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
              {geriatricTitle}
            </h4>
            {geriatricReductionBadge && (
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold ${
                  isDark
                    ? 'border-indigo-500/40 bg-indigo-950/70 text-indigo-200'
                    : 'border-indigo-300 bg-white text-indigo-800'
                }`}
              >
                {geriatricReductionBadge}
              </span>
            )}
          </div>
          <ul className={`mt-2.5 space-y-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {geriatricPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-teal-900/50 bg-teal-950/15' : 'border-teal-200 bg-teal-50/50'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Scale className={`h-4 w-4 ${isDark ? 'text-teal-300' : 'text-teal-700'}`} />
              <h4 className={`text-sm font-bold ${isDark ? 'text-teal-300' : 'text-teal-900'}`}>
                {obesityTitle}
              </h4>
            </div>
            {obesityWeightScalarBadge && (
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold ${
                  isDark
                    ? 'border-teal-500/40 bg-teal-950/70 text-teal-200'
                    : 'border-teal-300 bg-white text-teal-800'
                }`}
              >
                {obesityWeightScalarBadge}
              </span>
            )}
          </div>
          <ul className={`mt-2.5 space-y-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {obesityPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-teal-400' : 'bg-teal-600'}`} />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {clinicalNote && (
        <p className={`mt-3 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <strong>Klinik Not:</strong> {clinicalNote}
        </p>
      )}
    </MonographAccordionSection>
  );
};

export interface TissueOrganSystemCard {
  systemTitle: string;
  tissueTarget?: string;
  accent?: 'rose' | 'teal' | 'indigo' | 'amber' | 'sky' | 'violet';
  points: string[];
}

export interface DeepPharmacodynamicsProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  subtitle?: string;
  defaultOpen?: boolean;
  receptorMechanism: {
    title?: string;
    summary: string;
    points: string[];
  };
  /**
   * 2. Kademe (Yeni 4 Kademeli Hiyerarşik Model): Hücre İçi Sinyal Kaskadı, İkincil Haberciler & İyon/Organel Dinamiği
   */
  intracellularSignaling?: {
    title?: string;
    summary: string;
    points: string[];
  };
  /**
   * 3. Kademe (Yeni 4 Kademeli Hiyerarşik Model): Doku & Organ Sistemleri Düzeyinde Fizyolojik Yansıma (2x2 Eşit Kartlar)
   */
  tissueOrganSystems?: TissueOrganSystemCard[];
  /**
   * Geriye dönük uyumluluk için eski organEffects yapısı
   */
  organEffects?: {
    cns: string[];
    cvs: string[];
    respiratory: string[];
    other?: string[];
  };
  synergyAndCeiling: {
    title?: string;
    summary?: string;
    points: string[];
  };
  clinicalPearls: string[];
  clinicalPearlsTitle?: string;
}

export const DeepPharmacodynamicsBlock: React.FC<DeepPharmacodynamicsProps> = ({
  isDark,
  sectionId = 'sec-derin-pd',
  sectionTitle = 'Derin Farmakodinamik & Çok Ölçekli Fizyoloji Analizi',
  subtitle = '1) Hücre Zarı & Moleküler Hedef → 2) Hücre İçi Sinyal & İyon Kaskadı → 3) Doku & Organ Fizyolojisi → 4) Reseptör Kinetiği & Sinerji (Miller’s / Stoelting’s / Goodman & Gilman)',
  defaultOpen = false,
  receptorMechanism,
  intracellularSignaling,
  tissueOrganSystems,
  organEffects,
  synergyAndCeiling,
  clinicalPearls,
  clinicalPearlsTitle,
}) => {
  const [open, setOpen] = useMonographAccordion(sectionId, defaultOpen);
  const isFourTier = Boolean(intracellularSignaling || (tissueOrganSystems && tissueOrganSystems.length > 0));

  const getCardAccentClasses = (accent: TissueOrganSystemCard['accent'] = 'sky') => {
    switch (accent) {
      case 'rose':
        return {
          border: isDark ? 'border-rose-900/50 bg-rose-950/15' : 'border-rose-200 bg-rose-50/40',
          title: isDark ? 'text-rose-300' : 'text-rose-900',
          badge: isDark ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-white text-rose-800 border-rose-300',
          dot: isDark ? 'bg-rose-400' : 'bg-rose-600',
        };
      case 'teal':
        return {
          border: isDark ? 'border-teal-900/50 bg-teal-950/15' : 'border-teal-200 bg-teal-50/40',
          title: isDark ? 'text-teal-300' : 'text-teal-900',
          badge: isDark ? 'bg-teal-500/15 text-teal-300 border-teal-500/30' : 'bg-white text-teal-800 border-teal-300',
          dot: isDark ? 'bg-teal-400' : 'bg-teal-600',
        };
      case 'indigo':
        return {
          border: isDark ? 'border-indigo-900/50 bg-indigo-950/15' : 'border-indigo-200 bg-indigo-50/40',
          title: isDark ? 'text-indigo-300' : 'text-indigo-900',
          badge: isDark ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' : 'bg-white text-indigo-800 border-indigo-300',
          dot: isDark ? 'bg-indigo-400' : 'bg-indigo-600',
        };
      case 'amber':
        return {
          border: isDark ? 'border-amber-900/50 bg-amber-950/15' : 'border-amber-200 bg-amber-50/40',
          title: isDark ? 'text-amber-300' : 'text-amber-900',
          badge: isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-white text-amber-800 border-amber-300',
          dot: isDark ? 'bg-amber-400' : 'bg-amber-600',
        };
      case 'violet':
        return {
          border: isDark ? 'border-violet-900/50 bg-violet-950/15' : 'border-violet-200 bg-violet-50/40',
          title: isDark ? 'text-violet-300' : 'text-violet-900',
          badge: isDark ? 'bg-violet-500/15 text-violet-300 border-violet-500/30' : 'bg-white text-violet-800 border-violet-300',
          dot: isDark ? 'bg-violet-400' : 'bg-violet-600',
        };
      default:
        return {
          border: isDark ? 'border-sky-900/50 bg-sky-950/15' : 'border-sky-200 bg-sky-50/40',
          title: isDark ? 'text-sky-300' : 'text-sky-900',
          badge: isDark ? 'bg-sky-500/15 text-sky-300 border-sky-500/30' : 'bg-white text-sky-800 border-sky-300',
          dot: isDark ? 'bg-sky-400' : 'bg-sky-600',
        };
    }
  };

  return (
    <section
      id={sectionId}
      className={`overflow-hidden rounded-2xl border transition-all scroll-mt-20 ${
        isDark ? 'border-violet-900/50 bg-slate-900/80' : 'border-violet-200 bg-white shadow-xs'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`flex w-full cursor-pointer items-center justify-between p-4 sm:p-5 text-left transition-colors ${
          isDark ? 'hover:bg-slate-800/60' : 'hover:bg-violet-50/40'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`rounded-xl p-2 ${
              isDark ? 'bg-violet-500/15 text-violet-300' : 'bg-violet-100 text-violet-700'
            }`}
          >
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-sm sm:text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {sectionTitle}
              </h3>
              <span
                className={`rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
                  isDark ? 'bg-slate-800 text-violet-300' : 'bg-violet-50 text-violet-700'
                }`}
              >
                {open ? 'Gizle' : 'Aç'}
              </span>
            </div>
            <p className={`mt-0.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {subtitle}
            </p>
          </div>
        </div>
        <div className={`shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </button>

      {open && (
        <div
          className={`space-y-4 border-t p-5 sm:p-6 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          {/* 1. Kademe: Hücre Zarı & Moleküler Hedef (Membran & Reseptör / Kanal / Taşıyıcı Biyofiziği) */}
          <div
            className={`rounded-xl border p-4 ${
              isDark ? 'border-violet-900/40 bg-violet-950/15' : 'border-violet-200 bg-violet-50/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className={`h-4 w-4 ${isDark ? 'text-violet-300' : 'text-violet-700'}`} />
              <h4 className={`text-sm font-bold ${isDark ? 'text-violet-200' : 'text-violet-950'}`}>
                1. {receptorMechanism.title || 'Hücre Zarı & Moleküler Hedef (Membran Reseptör / Kanal / Taşıyıcı Biyofiziği)'}
              </h4>
            </div>
            <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {receptorMechanism.summary}
            </p>
            <ul className={`mt-2.5 space-y-1.5 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {receptorMechanism.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-violet-400' : 'bg-violet-600'}`} />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Kademe (Yeni): Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Hücresel Düzey Etki */}
          {intracellularSignaling && (
            <div
              className={`rounded-xl border p-4 ${
                isDark ? 'border-cyan-900/40 bg-cyan-950/15' : 'border-cyan-200 bg-cyan-50/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className={`h-4 w-4 ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`} />
                <h4 className={`text-sm font-bold ${isDark ? 'text-cyan-200' : 'text-cyan-950'}`}>
                  2. {intracellularSignaling.title || 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Hücresel Düzey Etki'}
                </h4>
              </div>
              <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {intracellularSignaling.summary}
              </p>
              <ul className={`mt-2.5 space-y-1.5 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {intracellularSignaling.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 3. Kademe (Yeni 2x2 Doku -> Organ Fizyoloji Gridi) VEYA Eski organEffects */}
          {tissueOrganSystems && tissueOrganSystems.length > 0 ? (
            <div
              className={`rounded-xl border p-4 ${
                isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className={`h-4 w-4 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {intracellularSignaling ? '3.' : '2.'} Doku &amp; Organ Sistemleri Düzeyinde Fizyolojik Yansıma (Doku → Organ Eşleşmesi)
                </h4>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3.5 lg:grid-cols-2">
                {tissueOrganSystems.map((card, idx) => {
                  const style = getCardAccentClasses(card.accent);
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border p-4 ${style.border}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`text-xs sm:text-sm font-bold ${style.title}`}>
                          {card.systemTitle}
                        </span>
                        {card.tissueTarget && (
                          <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${style.badge}`}>
                            {card.tissueTarget}
                          </span>
                        )}
                      </div>
                      <ul className={`mt-2.5 space-y-1.5 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {card.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : organEffects ? (
            <div
              className={`rounded-xl border p-4 ${
                isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className={`h-4 w-4 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  2. Organ Sistemlerine Fizyolojik Etki (SSS · KVS · Solunum)
                </h4>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div
                  className={`rounded-lg border p-3.5 ${
                    isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Brain className={`h-4 w-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-indigo-300' : 'text-indigo-800'}`}>
                      SSS · Sedasyon / Hipnoz / EEG
                    </span>
                  </div>
                  <ul className={`mt-2 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {organEffects.cns.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`rounded-lg border p-3.5 ${
                    isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <HeartPulse className={`h-4 w-4 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                      Kardiyovasküler Sistem
                    </span>
                  </div>
                  <ul className={`mt-2 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {organEffects.cvs.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`rounded-lg border p-3.5 ${
                    isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Wind className={`h-4 w-4 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-teal-300' : 'text-teal-800'}`}>
                      Solunum &amp; Hava Yolu
                    </span>
                  </div>
                  <ul className={`mt-2 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {organEffects.respiratory.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {organEffects.other && organEffects.other.length > 0 && (
                <div
                  className={`mt-3 rounded-lg border p-3 text-xs leading-relaxed ${
                    isDark ? 'border-slate-800 bg-slate-900/50 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>Diğer Sistemik Etkiler (Nöromüsküler / GIS / Endokrin): </strong>
                  {organEffects.other.join(' · ')}
                </div>
              )}
            </div>
          ) : null}

          {/* 4. Kademe: Reseptör Kinetiği, Desensitizasyon / Taşiflaksi, Sinerji & Klinik-PD Tuzaklar */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div
              className={`rounded-xl border p-4 ${
                isDark ? 'border-teal-900/50 bg-teal-950/15' : 'border-teal-200 bg-teal-50/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className={`h-4 w-4 ${isDark ? 'text-teal-300' : 'text-teal-700'}`} />
                <h4 className={`text-sm font-bold ${isDark ? 'text-teal-200' : 'text-teal-950'}`}>
                  {isFourTier ? '4A.' : '3.'} {synergyAndCeiling.title || 'Reseptör Kinetiği, Desensitizasyon / Taşiflaksi & Tavan Etkisi'}
                </h4>
              </div>
              {synergyAndCeiling.summary && (
                <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {synergyAndCeiling.summary}
                </p>
              )}
              <ul className={`mt-2 space-y-1.5 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {synergyAndCeiling.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-teal-400' : 'bg-teal-600'}`} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`rounded-xl border p-4 ${
                isDark ? 'border-amber-900/50 bg-amber-950/15' : 'border-amber-200 bg-amber-50/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <Stethoscope className={`h-4 w-4 ${isDark ? 'text-amber-300' : 'text-amber-700'}`} />
                <h4 className={`text-sm font-bold ${isDark ? 'text-amber-200' : 'text-amber-950'}`}>
                  {isFourTier ? '4B.' : '4.'} {clinicalPearlsTitle || 'Klinik-Farmakodinamik İncelikler & Tuzaklar'}
                </h4>
              </div>
              <ul className={`mt-2.5 space-y-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {clinicalPearls.map((pearl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-amber-400' : 'bg-amber-600'}`} />
                    <span>{pearl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
