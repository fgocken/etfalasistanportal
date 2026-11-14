import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Baby,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  HeartPulse,
  ShieldAlert,
  Stethoscope,
  Zap,
} from 'lucide-react';

/**
 * BİRLEŞİK ALTIN STANDART İLAÇ MONOGRAFİ ŞABLONU (v2.1)
 * -------------------------------------------------------------------------
 * Tedaviler ve İlaçlar modülüne eklenecek her yeni ilaç monografisi ve
 * güncellenen mevcut monografiler aşağıdaki çekirdek klinik sütunları
 * ve sıralamayı (Kontrendikasyonlar DAİMA Endikasyonlardan önce) içermelidir:
 *
 * 1. Kimlik, Klinik Özet Header & Etki Mekanizması (`MechanismOfActionBlock`)
 * 2. Farmakokinetik / Farmakodinamik (PK/PD) Profili (`tabular-nums` tablo)
 * 3. Mutlak ve Relatif Kontrendikasyonlar (`ContraindicationsGridBlock`) — Endikasyonlardan ÖNCE
 * 4. Klinik Endikasyonlar ve Doz Rejimleri (Yetişkin, Pediatrik, Özel Senaryolar)
 * 5. Etkileşimli Doz & İnfüzyon Hesaplayıcı (Rapor Kopyala)
 * 6. Hazırlama, Dilüsyon, Stabilite ve Uyumluluk
 * 7. Böbrek ve Karaciğer Yetmezliğinde Doz Ayarlaması (`OrganImpairmentGridBlock`)
 * 8. Gebelik, Obstetrik ve Laktasyon (`PregnancyLactationBlock`)
 * 9. Önemli Olumsuz Etkiler (Adverse Effects) (`AdverseEffectsBlock`)
 * 10. Klinisyenin Dikkat Etmesi Gereken Özel Klinik Durumlar (`SpecialClinicalCautionsBlock`)
 * 11. ISMP Yüksek Riskli İlaç Güvenliği, Tall-Man Lettering & Antidot (`HighAlertSafetyBlock`)
 * 12. Kanıta Dayalı Kaynakça (PubMed/DOI tıklanabilir) & İlaç Etkileşimleri (`DrugReferencesAndInteractionsBlock`)
 */
export interface GoldStandardSectionSpec {
  id: string;
  order: number;
  title: string;
  requiredComponent?: string;
}

export const GOLD_STANDARD_SECTIONS: GoldStandardSectionSpec[] = [
  { id: 'sec-ozet', order: 1, title: 'Klinik Kimlik & Özet' },
  { id: 'sec-etki', order: 2, title: 'Etki Mekanizması', requiredComponent: 'MechanismOfActionBlock' },
  { id: 'sec-pkpd', order: 3, title: 'Farmakokinetik & Farmakodinamik' },
  { id: 'sec-kontrendikasyon', order: 4, title: 'Mutlak vs Relatif Kontrendikasyonlar', requiredComponent: 'ContraindicationsGridBlock' },
  { id: 'sec-dozlar', order: 5, title: 'Endikasyonlar & Dozaj' },
  { id: 'sec-hesaplayici', order: 6, title: 'Doz & İnfüzyon Hesaplayıcı', requiredComponent: 'MonographCopyButton' },
  { id: 'sec-uyumluluk', order: 7, title: 'Dilüsyon & Uyumluluk' },
  { id: 'sec-organ', order: 8, title: 'Böbrek & Karaciğer Yetmezliği', requiredComponent: 'OrganImpairmentGridBlock' },
  { id: 'sec-gebelik', order: 9, title: 'Gebelik & Laktasyon', requiredComponent: 'PregnancyLactationBlock' },
  { id: 'sec-olumsuz', order: 10, title: 'Önemli Olumsuz Etkiler (Adverse Effects)', requiredComponent: 'AdverseEffectsBlock' },
  { id: 'sec-ozel-durumlar', order: 11, title: 'Klinisyenin Dikkat Etmesi Gereken Özel Klinik Durumlar', requiredComponent: 'SpecialClinicalCautionsBlock' },
  { id: 'sec-guvenlik', order: 12, title: 'ISMP High-Alert & Tall-Man Güvenliği', requiredComponent: 'HighAlertSafetyBlock' },
  { id: 'sec-kaynaklar', order: 13, title: 'Kaynakça (PubMed/DOI) & Etkileşim', requiredComponent: 'DrugReferencesAndInteractionsBlock' },
];

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
  return (
    <nav
      aria-label="Monografi Bölüm Gezgini"
      className={`flex flex-wrap items-center gap-1.5 rounded-xl border p-2 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-slate-50/90'
      }`}
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
            isDark
              ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
              : 'text-slate-700 hover:bg-white hover:text-slate-950 hover:shadow-xs'
          }`}
        >
          {item.label}
        </a>
      ))}
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
}

export const HighAlertSafetyBlock: React.FC<HighAlertSafetyBlockProps> = ({
  isDark,
  sectionId = 'sec-guvenlik',
  sectionTitle = 'ISMP Yüksek Riskli İlaç Güvenliği & Tall-Man Lettering',
  tallManName,
  confusionRiskWith,
  criticalAlerts,
  antidoteOrRescue,
}) => {
  return (
    <section
      id={sectionId}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDark
          ? 'border-rose-900/60 bg-rose-950/20'
          : 'border-rose-200 bg-rose-50/70'
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
            <p className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
              ISMP High-Alert Medication · Çift Kontrol Zorunlu
            </p>
            <h3 className={`mt-0.5 text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {sectionTitle}
            </h3>
          </div>
        </div>

        <div
          className={`rounded-xl border px-3.5 py-2 font-mono text-xs ${
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
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
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
              Doz Aşımı / Antidot & Kurtarma
            </p>
          </div>
          <p className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {antidoteOrRescue}
          </p>
        </div>
      </div>
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
}) => {
  return (
    <section
      id={sectionId}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <AlertTriangle className={`h-5 w-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {sectionTitle}
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
    </section>
  );
};

interface OrganImpairmentGridBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  renalSummary: string;
  renalDetails: string[];
  hepaticSummary: string;
  hepaticDetails: string[];
}

export const OrganImpairmentGridBlock: React.FC<OrganImpairmentGridBlockProps> = ({
  isDark,
  sectionId = 'sec-organ',
  sectionTitle = 'Böbrek ve Karaciğer Yetmezliğinde Doz Yönetimi',
  renalSummary,
  renalDetails,
  hepaticSummary,
  hepaticDetails,
}) => {
  return (
    <section
      id={sectionId}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Stethoscope className={`h-5 w-5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {sectionTitle}
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
            Böbrek Yetmezliği & RRT (eGFR / CRRT)
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
            Karaciğer Yetmezliği (Child-Pugh A / B / C)
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
    </section>
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
}

export const PregnancyLactationBlock: React.FC<PregnancyLactationBlockProps> = ({
  isDark,
  sectionId = 'sec-gebelik',
  sectionTitle = 'Gebelik, Obstetrik ve Laktasyon Güvenliği',
  pregnancySummary,
  pregnancyDetails,
  lactationSummary,
  lactationDetails,
}) => {
  return (
    <section
      id={sectionId}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Baby className={`h-5 w-5 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {sectionTitle}
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className={`rounded-xl border p-4 ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-2">
            <HeartPulse className={`h-4 w-4 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
            <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>
              Gebelik & Uteroplasental Etki
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
            Laktasyon & Emzirme
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
    </section>
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
}

export const MechanismOfActionBlock: React.FC<MechanismOfActionBlockProps> = ({
  isDark,
  sectionId = 'sec-etki',
  sectionTitle = 'Etki Mekanizması & Moleküler Farmakodinamik',
  summary,
  pillars,
}) => {
  return (
    <section
      id={sectionId}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Zap className={`h-5 w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {sectionTitle}
        </h3>
      </div>

      <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
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
    </section>
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
}

export const AdverseEffectsBlock: React.FC<AdverseEffectsBlockProps> = ({
  isDark,
  sectionId = 'sec-olumsuz',
  sectionTitle = 'Önemli Olumsuz Etkiler (Adverse Effects)',
  items,
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
    <section
      id={sectionId}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
        <HeartPulse className={`h-5 w-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {sectionTitle}
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
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
    </section>
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
}

export const SpecialClinicalCautionsBlock: React.FC<SpecialClinicalCautionsBlockProps> = ({
  isDark,
  sectionId = 'sec-ozel-durumlar',
  sectionTitle = 'Klinisyenin Dikkat Etmesi Gereken Özel Klinik Durumlar',
  items,
}) => {
  return (
    <section
      id={sectionId}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
        <Stethoscope className={`h-5 w-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {sectionTitle}
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
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
    </section>
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

interface DrugReferencesAndInteractionsBlockProps {
  isDark: boolean;
  sectionId?: string;
  sectionTitle?: string;
  drugName: string;
  references: VerifiedDrugReference[];
  drugsComUrl?: string;
  medscapeUrl?: string;
  drugsComLabel?: string;
  medscapeLabel?: string;
}

export const DrugReferencesAndInteractionsBlock: React.FC<DrugReferencesAndInteractionsBlockProps> = ({
  isDark,
  sectionId = 'sec-kaynaklar',
  sectionTitle = 'Kanıta Dayalı Kaynakça & İlaç Etkileşim Araçları',
  drugName,
  references,
  drugsComUrl,
  medscapeUrl,
  drugsComLabel = 'Drugs.com Interaction Checker',
  medscapeLabel = 'Medscape Drug Reference & Interactions',
}) => {
  return (
    <section
      id={sectionId}
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <BookOpen className={`h-5 w-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {sectionTitle}
        </h3>
      </div>

      <div className="mt-4 space-y-2.5">
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
    </section>
  );
};
