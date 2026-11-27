import React, { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Droplets,
  Flame,
  Info,
  Layers,
  RotateCcw,
  Scale,
  ShieldCheck,
  Syringe,
  Zap,
} from 'lucide-react';
import {
  AdverseEffectsBlock,
  CompatibilityAndLineBlock,
  ContraindicationsGridBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MonographAccordionSection,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
  useMonographAccordion,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART1 } from '../../data/organImpairment/standaloneOrganPart1';

interface Props {
  isDark: boolean;
}

type CalcScenario = 'septic_shock' | 'adrenal_crisis' | 'pediatric_shock' | 'steroid_converter';
type SepticRegimen = 'continuous' | 'intermittent';
type PumpPrep = 'syringe_50' | 'bag_200';
type AdrenalContext = 'crisis' | 'major_surgery' | 'minor_mod_surgery';

export const HydrocortisoneProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [scenario, setScenario] = useState<CalcScenario>('septic_shock');

  // 1. Septik Şok State'leri
  const [septicRegimen, setSepticRegimen] = useState<SepticRegimen>('continuous');
  const [pumpPrep, setPumpPrep] = useState<PumpPrep>('syringe_50');

  // 2. Adrenal Kriz / Perioperatif Stres Dozu State'i
  const [adrenalContext, setAdrenalContext] = useState<AdrenalContext>('crisis');

  // 3. Pediatrik Ağırlık Bazlı Hesaplayıcı State'leri (3 - 80 kg)
  const [pedWeightKg, setPedWeightKg] = useState<number>(20);
  const [pedMaintenanceDoseMgKg, setPedMaintenanceDoseMgKg] = useState<number>(1.0); // 1–2 mg/kg q6h

  // 4. Kortikosteroid Eşdeğerlik Dönüştürücü State'i
  const [converterHydroMg, setConverterHydroMg] = useState<number>(100);

  // Akordiyon State'i
  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

  // Erişilebilirlik Kimlikleri
  const pedWeightSliderId = useId();
  const pedWeightInputId = useId();
  const converterInputId = useId();

  // --- HESAPLAMALAR ---
  // Septik Şok (200 mg/gün)
  const septicHourlyMg = 200 / 24; // 8.333 mg/saat
  const pumpConcMgMl = pumpPrep === 'syringe_50' ? 4.0 : 1.0; // 200 mg / 50 mL = 4 mg/mL | 200 mg / 200 mL = 1 mg/mL
  const pumpRateMlHr = septicHourlyMg / pumpConcMgMl; // 2.083 mL/saat veya 8.333 mL/saat

  // Pediatrik Hesaplamalar (50 mg/mL sulandırılmış flakon = 100 mg / 2 mL)
  const pedLoadMg = Math.min(pedWeightKg * 2, 100); // 2 mg/kg, maks 100 mg
  const pedLoadMl = pedLoadMg / 50; // 50 mg/mL stoktan çekilecek hacim
  const pedSingleMaintMg = Math.min(pedWeightKg * pedMaintenanceDoseMgKg, 50); // q6h doz (maks 50 mg)
  const pedSingleMaintMl = pedSingleMaintMg / 50;
  const pedDailyTotalMg = pedSingleMaintMg * 4;
  // Yaklaşık Pediatrik BSA (Mosteller yaklaşımı yerine kilo bazlı Costeff formülü: (4*W + 7) / (W + 90))
  const pedApproxBsa = (4 * pedWeightKg + 7) / (pedWeightKg + 90);
  const pedBsaLowMgDay = Math.min(pedApproxBsa * 50, 200);
  const pedBsaHighMgDay = Math.min(pedApproxBsa * 100, 200);

  // Steroid Eşdeğerlik Dönüştürücü (20 mg Hidrokortizon = 5 mg Prednizolon = 4 mg Metilprednizolon = 0,75 mg Deksametazon)
  const eqPrednisoloneMg = converterHydroMg * (5 / 20); // x 0.25
  const eqMethylpredMg = converterHydroMg * (4 / 20); // x 0.20
  const eqDexamethasoneMg = converterHydroMg * (0.75 / 20); // x 0.0375

  // Kopyalanacak Canlı Özet Metni
  const buildCopySummary = (): string => {
    const activeCalcLine = (() => {
      if (scenario === 'septic_shock') {
        return septicRegimen === 'continuous'
          ? `• Aktif Rejim (Refrakter Septik Şok — Sürekli İnfüzyon, ADRENAL): 200 mg/24 saat (8,33 mg/saat) | ${
              pumpPrep === 'syringe_50'
                ? '50 mL Enjektör (200 mg / 50 mL = 4 mg/mL) -> 2,1 mL/saat'
                : '200 mL Torba (200 mg / 200 mL = 1 mg/mL) -> 8,3 mL/saat'
            }`
          : `• Aktif Rejim (Refrakter Septik Şok — Aralıklı Bolus, APROCCHSS): 50 mg IV q6h (1 mL [50 mg/mL] yavaş IV, 1–3 dk'da) + opsiyonel Fludrokortizon 50 mcg PO/NG q24h`;
      }
      if (scenario === 'adrenal_crisis') {
        return adrenalContext === 'minor_mod_surgery'
          ? `• Aktif Rejim (Minör/Orta Cerrahi Stres Dozu, Woodcock 2020): İndüksiyonda 100 mg IV (veya 50 mg IV) yavaş bolus; postop 24–48 saat oral dozun 2 katı`
          : `• Aktif Rejim (${
              adrenalContext === 'crisis' ? 'Akut Adrenal Kriz' : 'Perioperatif Majör Cerrahi (Woodcock 2020)'
            }): Derhal 100 mg IV bolus (1–3 dk) + 200 mg/24 saat sürekli infüzyon (4 mg/mL enjektörde 2,1 mL/saat) veya 50 mg IV q6h`;
      }
      if (scenario === 'pediatric_shock') {
        return `• Aktif Hesaplama (Pediatrik, ${pedWeightKg} kg): Yükleme 2 mg/kg = ${pedLoadMg.toFixed(0)} mg IV (${pedLoadMl.toFixed(
          2
        )} mL [50 mg/mL]) | İdame (${pedMaintenanceDoseMgKg.toFixed(1)} mg/kg q6h): ${pedSingleMaintMg.toFixed(
          1
        )} mg (${pedSingleMaintMl.toFixed(2)} mL) q6h (Toplam ${pedDailyTotalMg.toFixed(0)} mg/gün)`;
      }
      return `• Steroid Eşdeğerliği (${converterHydroMg} mg Hidrokortizon): Prednizolon ${eqPrednisoloneMg.toFixed(
        1
      )} mg | Metilprednizolon ${eqMethylpredMg.toFixed(1)} mg | Deksametazon ${eqDexamethasoneMg.toFixed(2)} mg`;
    })();

    return [
      `HİDROKORTİZON SODYUM SÜKSİNAT (100 mg Liyofilize Flakon + 2 mL Çözücü = 50 mg/mL) KLİNİK ÖZETİ`,
      `• Farmakolojik Profil: Endojen Kortizol · Dengeli 1:1 Glukokortikoid + Mineralokortikoid (Biyolojik etki: 8–12 saat)`,
      activeCalcLine,
      `• Eşdeğerlik Kuralı: 20 mg Hidrokortizon = 5 mg Prednizolon = 4 mg Metilprednizolon = 0,75 mg Deksametazon (Deksametazonun mineralokortikoid etkisi 0'dır!)`,
      `• Kritik Güvenlik: 100 mg IV bolus 1–3 dakikada yavaş uygulanır (hızlı puşede şiddetli perineal yanma); 4–6 saatlik kan şekeri ve K⁺/Na⁺ takibi şarttır.`,
    ].join('\n');
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v5.0)                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Özet & Etki' },
          { id: 'sec-pkpd', label: 'Farmakokinetik' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-endikasyon', label: 'Endikasyonlar' },
          { id: 'sec-dozaj', label: 'Dozaj' },
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Damar Yolu & Y-Site' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
          { id: 'sec-derin-pd', label: 'Derin Farmakodinami' },
          { id: 'sec-kaynaklar', label: 'Etkileşim & Kaynakça' },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="sec-guvenlik"
        defaultOpen={false}
        tallManName="HYDROCORTISONE"
        confusionRiskWith="Metilprednizolon (5× daha potent glukokortikoid, minimal mineralokortikoid!) · Deksametazon (25–30× daha potent, 0 mineralokortikoid!) · Hidromorfon / Hidroksizin (LASA)"
        criticalAlerts={[
          'Eşdeğerlik Potens Tuzağı (1 : 5 : 25 Kuralı): 20 mg Hidrokortizon = 4 mg Metilprednizolon = 0,75 mg Deksametazon! Eşit mineralokortikoid/glukokortikoid (1:1) dengesi nedeniyle septik şok ve adrenal krizde Deksametazon yerine Hidrokortizon tercih edilir (Deksametazonun mineralokortikoid etkisi 0’dır).',
          'Septik Şokta Başlama Eşiği (SSC 2021): Yalnızca sıvı resüsitasyonuna rağmen devam eden vazopresör gereksinimi (özellikle Noradrenalin ≥ 0,25 mcg/kg/dk ≥ 4 saat) olan refrakter septik şokta 200 mg/gün IV başlanır; vazopresörsüz sepsiste rutin steroid ÖNERİLMEZ!',
          'Hiperglisemi, Hipernatremi & Hipokalemi: Mineralokortikoid aktivitesi yüksek olduğundan (1:1), 200 mg/gün stres dozunda belirgin sodyum/su retansiyonu, hipernatremi, hipokalemi ve insülin direncine bağlı hiperglisemi (APROCCHSS/ADRENAL) gelişir; 4–6 saatlik kan şekeri ve elektrolit takibi şarttır.',
          'Yüksek Doz Hızlı IV Bolus (Perineal Kaşıntı & Yanma): 100 mg IV bolus 30 saniyeden hızlı verilirse şiddetli geçici perineal/genital yanma ve karıncalanma yapar; daima 1–3 dakikada yavaş IV veya 10–30 dakikalık kısa infüzyon olarak verilir.',
        ]}
        antidoteOrRescue="Akut Hiperglisemi: IV insülin infüzyonu (hedef kan şekeri 140–180 mg/dL); Hipokalemi & Sıvı Retansiyonu: Potasyum replasmanı + diüretik titrasyonu; HPA Aksı Baskılanmasına Bağlı Kesilme Krizi: Uzun süreli (>14 gün) kullanımda asla ani kesilmez, kademeli azaltılır; akut adrenal kriz gelişirse derhal 100 mg IV bolus + 200 mg/24 sa sürekli infüzyon."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & YATAK BAŞI ETKİ MEKANİZMASI      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                Endojen Kortizol · Glukokortikoid (1) + Mineralokortikoid (1)
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                TR Flakon/Ampul: 100 mg Liyofilize + 2 mL Çözücü (50 mg/mL)
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Septik Şok: 200 mg/gün IV · Adrenal Kriz: 100 mg Bolus
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">ATC: H02AB09</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Hidrokortizon Sodyum Süksinat (Hydrocort-Liyo® / Hidrozon® / Solu-Cortef®) Monografisi
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong>{' '}
              İnsan adrenal korteksinden salgılanan endojen <strong>kortizolün</strong> parenteral formu olan,{' '}
              <strong>eşit (1:1) glukokortikoid ve mineralokortikoid</strong> aktiviteye sahip kısa-orta etkili
              kortikosteroiddir. Refrakter septik şokta katekolamin duyarlılığını restore etmek, akut adrenal krizde
              hayati kortizol/aldosteron eksikliğini karşılamak ve HPA aksı baskılı hastalarda perioperatif stres
              dozu steroid replasmanı sağlamak amacıyla kullanılan birincil YBÜ ve anestezi kortikosteroididir.
            </p>
          </div>

          <div className="shrink-0">
            <MonographCopyButton
              isDark={isDark}
              label="Monografi Özeti Kopyala"
              getText={buildCopySummary}
            />
          </div>
        </div>

        {/* Yatak Başı Klinik Etki Mekanizması (#sec-etki) — 3 Konsantre Kart */}
        <div id="sec-etki" className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-200' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-teal-600 dark:text-teal-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 shrink-0" />
                <span>Katekolamin Duyarlılığının Restorasyonu</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-teal-500/15 shrink-0">α₁ / β₁ Up-Regülasyon</span>
            </div>
            <p className="text-xs leading-relaxed">
              Septik şokta down-regüle olan vasküler <strong>α₁</strong> ve kardiyak <strong>β₁</strong> reseptör gen
              transkripsiyonunu artırır, iNOS/NO kaynaklı vazoplejiyi baskılar ve vazopresör ihtiyacını hızla azaltır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 shrink-0" />
                <span>Dengeli 1:1 Mineralokortikoid + Glukokortikoid</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15 shrink-0">İntravasküler Volüm &amp; Na⁺</span>
            </div>
            <p className="text-xs leading-relaxed">
              Fizyolojik kortizolün kendisidir; adrenal kriz ve septik şokta hem anti-inflamatuar (NF-κB inhibisyonu)
              hem de renal Na⁺/su tutulumu (ENaC) ile hemodinamik destek sağlar.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-indigo-950/20 border-indigo-900/50 text-indigo-200' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Kısa-Orta Biyolojik Etki (8–12 Saat)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/15 shrink-0">Stres Dozu &amp; Titrasyon</span>
            </div>
            <p className="text-xs leading-relaxed">
              Plazma t½ ≈ 1,5–2 saat, doku biyolojik etki süresi <strong>8–12 saat</strong>tir; perioperatif stres
              replasmanında ve YBÜ sürekli infüzyonunda (<strong>200 mg/24 sa</strong>) glisemik dalgalanmayı azaltarak
              stabil kortizol düzeyi sağlar.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FARMAKOKİNETİK (ADME) ÖZELLİKLERİ AKORDİYONU (#sec-pkpd)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-pkpd"
        className={`scroll-mt-20 rounded-2xl border transition-all overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen(!pkOpen)}
          aria-expanded={pkOpen}
          className={`w-full p-5 sm:p-6 flex items-center justify-between text-left transition-colors cursor-pointer ${
            isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                <span>Farmakokinetik (ADME) Özellikleri</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  Plazma t½: 1,5–2 sa · Biyolojik Etki: 8–12 sa · 11β-HSD &amp; CBG
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hızlı non-genomik vasküler etki (&lt;30 dk), genomik etki (2–6 sa), CBG (Transkortin) bağlanması ve hepatik 11β-HSD dönüşümü.
              </p>
            </div>
          </div>
          {pkOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {pkOpen && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Etki Başlangıcı (Onset)
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  ~1 Saat
                </span>
                <span className="text-[10px] text-slate-400">Non-genomik &lt;30 dk · Genomik 2–6 sa</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Plazma Yarı Ömrü (t½)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  1,5 – 2 Saat
                </span>
                <span className="text-[10px] text-slate-400">Kritik hastalıkta klirens azalıp uzar</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Biyolojik Etki Süresi
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  8 – 12 Saat
                </span>
                <span className="text-[10px] text-slate-400">Doku düzeyinde nükleer transkripsiyon</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Plazma Protein Bağlanması
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  %90 – 95
                </span>
                <span className="text-[10px] text-slate-400">CBG (Transkortin) + Albümin</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Protein Bağlanması &amp; Kritik Hastalıkta CBG (Transkortin) Düşüşü:
                </strong>{' '}
                Fizyolojik konsantrasyonlarda plazma kortizolünün ~%80–85&apos;i yüksek afiniteli{' '}
                <strong>Kortikosteroid Bağlayıcı Globulin (CBG / Transkortin)</strong>&apos;e, ~%10&apos;u albümine
                bağlanır ve yalnızca ~%5–10&apos;u biyolojik olarak aktif serbest fraksiyondur. Sepsis, majör travma
                ve hipoalbüminemide nötrofil elastazı CBG&apos;yi parçalar; bu nedenle{' '}
                <strong>total serum kortizolü düşük görünse bile serbest aktif kortizol fraksiyonu belirgin artar</strong>{' '}
                (total kortizol ölçümünün YBÜ&apos;de yanıltıcı olmasının temel nedeni).
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Metabolizma (11β-HSD Enzim Sistemi &amp; Hepatik Konjugasyon):
                </strong>{' '}
                Hidrokortizon sodyum süksinat esteri IV uygulama sonrası plazma esterazlarıyla dakikalar içinde aktif
                hidrokortizona (kortizol) hidrolize olur. Karaciğer ve dokularda{' '}
                <strong>11β-Hidroksisteroid Dehidrogenaz (11β-HSD)</strong> izoenzimleriyle aktif kortizol ↔ inaktif
                kortizon dönüşümüne uğrar (11β-HSD1 karaciğerde kortizonu kortizole aktive eder; 11β-HSD2 böbrek ve
                plasentada kortizolü kortizona inaktive eder). Ardından karaciğerde A-halkası redüksiyonu (5α/5β-redüktaz)
                ve <strong>glukuronidasyon/sülfatasyon</strong> ile suda çözünür inaktif tetrahidrokortizol metabolitlerine
                çevrilerek büyük oranda idrarla (%90+) atılır.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KONTRENDİKASYONLAR — ENDİKASYONLARDAN ÖNCE (#sec-kontrendikasyon) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="sec-kontrendikasyon"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Sistemik kontrolsüz fungal enfeksiyonlar (invaziv kandidiyazis, aspergilloz vb. — hayatı tehdit eden akut adrenal kriz veya refrakter septik şok hariç).',
          'Hidrokortizon sodyum süksinat veya flakon/çözücü bileşenlerine bilinen aşırı duyarlılık (nadir süksinat ester alerjisi dahil).',
          'Canlı veya canlı-atenüe aşı uygulaması (immünsüpresif sistemik steroid dozları sırasında disemine aşı enfeksiyonu riski).',
        ]}
        relativeTitle="Göreceli Kontrendikasyonlar & Dikkat Edilecek Durumlar"
        relativeItems={[
          'Aktif peptik ülser hastalığı veya yakın dönem üst GİS kanama: Stres ülser profilaksisi (IV/PO PPI) eşzamanlı mutlaka uygulanmalıdır.',
          'Kontrolsüz ağır hiperglisemi veya diyabetik ketoasidoz (DKA): İnsülin direncini ve hepatik glukoneogenezi artırır; yakın IV insülin protokolü gerektirir.',
          'Şiddetli konjestif kalp yetmezliği, kontrolsüz hipertansiyon veya ağır hipernatremi: Hidrokortizonun güçlü 1:1 mineralokortikoid etkisi sodyum/su retansiyonu ve pulmoner konjesyonu ağırlaştırır.',
          'Aktif tüberküloz, oküler herpes simpleks veya kontrolsüz viral/bakteriyel enfeksiyonlar: Uygun antimikrobiyal tedavi eşliğinde ve sıkı enfeksiyon kontrolü altında kullanılmalıdır.',
          'Yakın dönem bağırsak anastomozu, akut divertikülit veya yara iyileşme riski: Kolajen sentezini baskılayarak anastomoz kaçağı ve yara ayrışması riskini artırabilir.',
        ]}
        clinicalNote="Akut adrenal kriz (Addison krizi) ve refrakter septik şok gibi doğrudan yaşamı tehdit eden acil tablolarda mutlak kontrendikasyonların hiçbiri hayat kurtarıcı Hidrokortizon tedavisini geciktirmemelidir!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. ENDİKASYONLAR & KLİNİK KANIT (#sec-endikasyon)                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-endikasyon"
        title="Endikasyonlar & Klinik Kanıt (SSC 2021 · ADRENAL · APROCCHSS · Woodcock 2020)"
        icon={<BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        defaultOpen={false}
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. Refrakter Septik Şok */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500 shrink-0" />
                <span>1. Refrakter Septik Şok (Vazopresör Gereksinimi)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                SSC 2021 · 200 mg/gün IV
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yeterli sıvı resüsitasyonuna rağmen devam eden vazopresör gereksinimi (özellikle{' '}
              <strong className="font-mono">Noradrenalin ≥ 0,25 mcg/kg/dk ≥ 4 saat</strong>) bulunan refrakter septik
              şokta <strong className="font-mono text-slate-900 dark:text-white">50 mg IV q6h</strong> veya{' '}
              <strong className="font-mono text-slate-900 dark:text-white">200 mg/24 saat (8,3 mg/saat)</strong>{' '}
              sürekli IV infüzyon olarak başlanır (vazopresör kesilene kadar, genelde 5–7 gün; ACTH stimülasyon testi
              gerektirmez).
            </p>
          </div>

          {/* 2. Akut Adrenal Kriz */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>2. Akut Adrenal Kriz (Addison Krizi)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                ACİL · 100 mg IV Bolus
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Refrakter hipotansiyon, hiponatremi, hiperkalemi ve hipoglisemi ile seyreden akut adrenal krizde
              laboratuvar sonucu beklenmeden derhal{' '}
              <strong className="font-mono text-slate-900 dark:text-white">100 mg IV bolus</strong> (1–3 dk&apos;da),
              ardından <strong className="font-mono text-slate-900 dark:text-white">200 mg/24 saat</strong> sürekli
              IV infüzyon (veya 50 mg IV q6h) + agresif %0,9 NaCl ve dekstroz resüsitasyonu uygulanır.
            </p>
          </div>

          {/* 3. Perioperatif Stres Dozu */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                <span>3. Perioperatif Stres Dozu Steroid Replasmanı</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                AAGBI / Woodcock 2020
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Primer/sekonder adrenal yetmezlik veya HPA aksı baskılanması (
              <strong className="font-mono">≥ 5 mg/gün prednizolon ≥ 4 hafta</strong> / Cushingoid fenotip) olanlarda:{' '}
              <strong>Majör Cerrahi:</strong> İndüksiyonda{' '}
              <strong className="font-mono text-slate-900 dark:text-white">100 mg IV</strong> bolus + derhal{' '}
              <strong className="font-mono text-slate-900 dark:text-white">200 mg/24 sa</strong> sürekli infüzyon (veya
              50 mg IV q6h) oral alım başlayana kadar. <strong>Minör/Orta Cerrahi:</strong> İndüksiyonda{' '}
              <strong className="font-mono">100 mg IV</strong> (veya 50 mg IV) bolus; postop 24–48 sa oral doz × 2.
            </p>
          </div>

          {/* 4. Astım / Anafilaksi / Miksödem Koması */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>4. Ağır Astım, Anafilaksi Yardımcı &amp; Miksödem Koması</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shrink-0">
                100 – 200 mg IV
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Anafilakside 1. basamak daima <strong>Adrenalin</strong>dir; Hidrokortizon{' '}
              <strong className="font-mono text-slate-900 dark:text-white">100–200 mg IV</strong> geç faz/bifazik
              reaksiyonları önlemede yardımcıdır. <strong>Miksödem komasında</strong> eşlik edebilecek gizli adrenal
              yetmezliği krize sokmamak için IV Levotiroksin öncesi mutlaka{' '}
              <strong className="font-mono text-slate-900 dark:text-white">100 mg IV q8h</strong> ampirik başlanır.
            </p>
          </div>
        </div>

        {/* Klinik Kanıt Kutuları: ADRENAL & APROCCHSS */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-100' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0" />
                <span>ADRENAL Trial (Venkatesh et al., NEJM 2018, n=3800)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-800 dark:text-teal-200 shrink-0">
                PMID: 29347874
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Mekanik ventilasyondaki septik şok hastalarında sürekli{' '}
              <strong>200 mg/gün IV Hidrokortizon</strong> vs plasebo karşılaştırılmıştır: 90 günlük mortalite benzer
              (%27,9 vs %28,8; p=0,50), ancak <strong>şoktan çıkış süresi (3 vs 4 gün; p&lt;0,001)</strong>,{' '}
              <strong>mekanik ventilasyon süresi (6 vs 7 gün; p&lt;0,001)</strong> ve{' '}
              <strong>kan transfüzyonu ihtiyacı (%37 vs %41,7; p=0,004)</strong> anlamlı olarak azalmıştır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-100' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>APROCCHSS Trial (Annane et al., NEJM 2018, n=1241)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200 shrink-0">
                PMID: 29490185
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Ağır septik şokta <strong>Hidrokortizon 50 mg IV q6h + Fludrokortizon 50 mcg PO/NG</strong> vs plasebo
              değerlendirilmiştir: <strong>90 günlük mortalitede anlamlı azalma (%43,0 vs %49,1; p=0,03)</strong> ve
              vazopresörsüz gün sayısında belirgin artış (<strong>17 vs 15 gün; p&lt;0,001</strong>) göstermiştir;
              hiperglisemi daha sık görülmüş ancak ciddi enfeksiyon/kanama artmamıştır.
            </p>
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. DOZAJ KADEMELERİ & KLİNİK SENARYO REJİMLERİ (#sec-dozaj)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-dozaj"
        title="Dozaj Kademeleri & Klinik Senaryo Rejimleri"
        subtitle="Fizyolojik Kortizol Replasmanı & Eşdeğerlik"
        icon={<Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        defaultOpen={false}
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Kademe 1: Septik Şok */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'septic_shock'
                ? 'border-rose-500 bg-rose-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  Refrakter Septik Şok
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  SSC 2021
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                200 <span className="text-xs font-sans font-normal text-slate-500">mg/gün IV</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>50 mg IV q6h</strong> (APROCCHSS) veya <strong>200 mg/24 sa (8,3 mg/sa)</strong> sürekli
                infüzyon (ADRENAL — daha az glisemik dalgalanma). Vazopresör kesilinceye dek (5–7 gün).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-rose-600 dark:text-rose-400 font-medium">
              ✓ Noradrenalin ≥ 0,25 mcg/kg/dk ≥ 4 saat eşiği
            </div>
          </div>

          {/* Kademe 2: Akut Adrenal Kriz */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'adrenal_crisis' && adrenalContext === 'crisis'
                ? 'border-amber-500 bg-amber-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  Akut Adrenal Kriz
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Addison Krizi
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                100 <span className="text-xs font-sans font-normal text-slate-500">mg + 200 mg/gün</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Derhal <strong>100 mg IV bolus</strong> (1–3 dk&apos;da), ardından <strong>200 mg/24 saat</strong>{' '}
                sürekli infüzyon (veya 50 mg IV q6h). Eşzamanlı %0,9 NaCl + %5–10 Dekstroz resüsitasyonu.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              ✓ Pediatrik: 2 mg/kg bolus (maks 100 mg)
            </div>
          </div>

          {/* Kademe 3: Perioperatif Majör Stres Dozu */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'adrenal_crisis' && adrenalContext !== 'crisis'
                ? 'border-teal-500 bg-teal-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                  Perioperatif Majör Stres
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  Woodcock 2020
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                100 <span className="text-xs font-sans font-normal text-slate-500">mg İndüksiyon</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                İndüksiyonda <strong>100 mg IV</strong> bolus + hemen <strong>200 mg/24 sa</strong> sürekli infüzyon
                (veya 50 mg IV q6h). Oral alım açılınca 48 sa boyunca kronik oral dozun 2 katına geçilir.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-teal-600 dark:text-teal-400 font-medium">
              ✓ ≥5 mg/gün prednizolon ≥4 hafta alanlarda
            </div>
          </div>

          {/* Kademe 4: Kortikosteroid Eşdeğerlik Tablosu */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'steroid_converter'
                ? 'border-indigo-500 bg-indigo-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  Steroid Eşdeğerlik
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                  1 : 4 : 5 : 25
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                20 mg <span className="text-xs font-sans font-normal text-slate-500">Hidrokortizon =</span>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 mt-2 space-y-1 font-mono">
                <li>• 5 mg Prednizolon (MK: 0,8)</li>
                <li>• 4 mg Metilprednizolon (MK: 0,5)</li>
                <li>• 0,75 mg Deksametazon (MK: 0!)</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
              ✓ Hidrokortizon: En yüksek MK (1:1) denge
            </div>
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF DOZ, SÜREKLİ İNFÜZYON & STEROİD EŞDEĞERLİK HESAPLAYICI */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="İnteraktif Doz, Sürekli İnfüzyon & Steroid Eşdeğerlik Hesaplayıcısı"
        subtitle="Septik şok pompası, adrenal kriz / perioperatif stres dozu, pediatrik hacim ve kortikosteroid dönüşümü"
        icon={
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-500/15 text-teal-600 dark:text-teal-400">
            <Syringe className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
      >
        <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => {
              setScenario('septic_shock');
              setSepticRegimen('continuous');
              setPumpPrep('syringe_50');
              setAdrenalContext('crisis');
              setPedWeightKg(20);
              setPedMaintenanceDoseMgKg(1.0);
              setConverterHydroMg(100);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              isDark
                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Varsayılana Sıfırla</span>
          </button>
        </div>

        {/* 4 Klinik Senaryo Sekmesi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          {(
            [
              { id: 'septic_shock', label: '1. Refrakter Septik Şok', sub: 'SSC 2021 · 200 mg/gün' },
              { id: 'adrenal_crisis', label: '2. Adrenal Kriz / Perioperatif', sub: 'Woodcock 2020 · Stres Dozu' },
              { id: 'pediatric_shock', label: '3. Pediatrik Doz (kg)', sub: '2 mg/kg · 50 mg/mL Flakon' },
              { id: 'steroid_converter', label: '4. Steroid Eşdeğerlik', sub: 'Pred / Metilpred / Dekort' },
            ] as { id: CalcScenario; label: string; sub: string }[]
          ).map((tab) => {
            const active = scenario === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setScenario(tab.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? isDark
                      ? 'border-teal-500 bg-teal-950/40 text-white ring-1 ring-teal-500/40'
                      : 'border-teal-500 bg-teal-50 text-teal-950 ring-1 ring-teal-500/30'
                    : isDark
                    ? 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                    : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{tab.label}</div>
                <div className={`text-[11px] font-mono mt-0.5 ${active ? 'text-teal-600 dark:text-teal-300' : 'text-slate-500'}`}>
                  {tab.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* SENARYO 1: REFRAKTER SEPTİK ŞOK */}
        {scenario === 'septic_shock' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Uygulama Stratejisi (SSC 2021 · 200 mg/gün IV)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSepticRegimen('continuous')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      septicRegimen === 'continuous'
                        ? isDark
                          ? 'border-teal-500 bg-teal-950/35 text-white'
                          : 'border-teal-500 bg-teal-50 text-teal-950'
                        : isDark
                        ? 'border-slate-800 bg-slate-950/50 text-slate-300'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">Sürekli İnfüzyon (ADRENAL)</div>
                    <div className="text-[11px] font-mono text-teal-600 dark:text-teal-400 mt-0.5">
                      200 mg / 24 sa (8,33 mg/sa)
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Daha az kan şekeri ve Na⁺ dalgalanması (YBÜ tercihi)
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSepticRegimen('intermittent')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      septicRegimen === 'intermittent'
                        ? isDark
                          ? 'border-amber-500 bg-amber-950/35 text-white'
                          : 'border-amber-500 bg-amber-50 text-amber-950'
                        : isDark
                        ? 'border-slate-800 bg-slate-950/50 text-slate-300'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">Aralıklı IV Bolus (APROCCHSS)</div>
                    <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 mt-0.5">
                      50 mg IV q6h (4 × 50 mg)
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      + Opsiyonel Fludrokortizon 50 mcg PO/NG q24h
                    </p>
                  </button>
                </div>
              </div>

              {septicRegimen === 'continuous' && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    İnfüzyon Pompası Hazırlama Seçeneği (2 Flakon = 200 mg)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPumpPrep('syringe_50')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        pumpPrep === 'syringe_50'
                          ? isDark
                            ? 'border-indigo-500 bg-indigo-950/40 text-white'
                            : 'border-indigo-500 bg-indigo-50 text-indigo-950'
                          : isDark
                          ? 'border-slate-800 bg-slate-950/50 text-slate-300'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">50 mL Enjektör Pompası</div>
                      <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-300 mt-0.5">
                        200 mg (4 mL) + 46 mL SF = 4 mg/mL
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPumpPrep('bag_200')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        pumpPrep === 'bag_200'
                          ? isDark
                            ? 'border-indigo-500 bg-indigo-950/40 text-white'
                            : 'border-indigo-500 bg-indigo-50 text-indigo-950'
                          : isDark
                          ? 'border-slate-800 bg-slate-950/50 text-slate-300'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">200 mL İnfüzyon Torbası</div>
                      <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-300 mt-0.5">
                        200 mg / 200 mL SF = 1 mg/mL
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Çıktı Paneli */}
            <div
              className={`p-5 rounded-2xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {septicRegimen === 'continuous' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      Pompa Ayarı (Sürekli İnfüzyon)
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300">
                      {pumpConcMgMl.toFixed(0)} mg/mL
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <span className="text-[11px] text-slate-500 block">Pompa İnfüzyon Hızı</span>
                      <span className="text-2xl sm:text-3xl font-black font-mono text-teal-600 dark:text-teal-400 tabular-nums">
                        {pumpRateMlHr.toFixed(1)} <span className="text-sm font-semibold">mL/sa</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        Tam değer: {pumpRateMlHr.toFixed(2)} mL/saat
                      </span>
                    </div>
                    <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <span className="text-[11px] text-slate-500 block">Saatlik / Günlük Doz</span>
                      <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                        8,3 <span className="text-sm font-semibold">mg/sa</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        200 mg / 24 saat (2 Flakon/gün)
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Hazırlama:</strong> 2 adet 100 mg liyofilize flakon her biri kendi 2 mL çözücüsüyle
                    sulandırılır (toplam 4 mL = 200 mg).{' '}
                    {pumpPrep === 'syringe_50'
                      ? '46 mL SF veya %5 Dekstroz üzerine eklenerek 50 mL enjektör (4 mg/mL) hazırlanır ve 2,1 mL/saat hızında gönderilir.'
                      : '196 mL SF veya %5 Dekstroz ile 200 mL’ye tamamlanır (1 mg/mL) ve 8,3 mL/saat hızında gönderilir.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Aralıklı IV Bolus Şeması (APROCCHSS)
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">
                      50 mg/mL Stok
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <span className="text-[11px] text-slate-500 block">Her 6 Saatte Bir Doz</span>
                      <span className="text-2xl sm:text-3xl font-black font-mono text-amber-600 dark:text-amber-400 tabular-nums">
                        50 <span className="text-sm font-semibold">mg IV</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        = 1,0 mL (50 mg/mL flakondan)
                      </span>
                    </div>
                    <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <span className="text-[11px] text-slate-500 block">Günlük Toplam / Flakon</span>
                      <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                        200 <span className="text-sm font-semibold">mg/gün</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        4 × 50 mg (2 Flakon/gün)
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Uygulama:</strong> Her 6 saatte bir 50 mg (1 mL sulandırılmış çözelti) en az{' '}
                    <strong>1–3 dakikada yavaş IV</strong> (veya 10–20 mL SF içinde 10–15 dk) verilir. APROCCHSS
                    protokolünde enteral yol açıksa <strong>Fludrokortizon 50 mcg PO/NG q24h</strong> kombine edilir.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SENARYO 2: AKUT ADRENAL KRİZ / PERİOPERATİF MAJÖR CERRAHİ */}
        {scenario === 'adrenal_crisis' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(
                [
                  { id: 'crisis', title: 'Akut Adrenal Kriz', sub: 'Addison Krizi · Acil Resüsitasyon' },
                  { id: 'major_surgery', title: 'Majör Cerrahi (Woodcock 2020)', sub: 'Batın, Toraks, Kardiyak, Travma' },
                  { id: 'minor_mod_surgery', title: 'Minör / Orta Cerrahi', sub: 'Günübirlik / Orta Stres Girişim' },
                ] as { id: AdrenalContext; title: string; sub: string }[]
              ).map((ctx) => (
                <button
                  key={ctx.id}
                  type="button"
                  onClick={() => setAdrenalContext(ctx.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    adrenalContext === ctx.id
                      ? isDark
                        ? 'border-amber-500 bg-amber-950/35 text-white'
                        : 'border-amber-500 bg-amber-50 text-amber-950'
                      : isDark
                      ? 'border-slate-800 bg-slate-950/50 text-slate-300'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{ctx.title}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{ctx.sub}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  1. Başlangıç / İndüksiyon Bolusu
                </span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                  {adrenalContext === 'minor_mod_surgery' ? '50 – 100 mg IV' : '100 mg IV'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {adrenalContext === 'minor_mod_surgery'
                    ? 'Anestezi indüksiyonunda 100 mg IV (minör işlemde 50 mg IV) — 1–3 dakikada yavaş IV bolus (2 mL = 100 mg).'
                    : 'Derhal 100 mg IV (1 flakon / 2 mL) 1–3 dakikada yavaş IV uygulanır. Hızlı puşe şiddetli perineal yanma yapar!'}
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                  2. İdame / İnfüzyon Protokolü
                </span>
                <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1">
                  {adrenalContext === 'minor_mod_surgery' ? 'Oral Doz × 2' : '200 mg / 24 sa'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {adrenalContext === 'minor_mod_surgery'
                    ? 'Postop 24–48 saat boyunca hastanın olağan oral glukokortikoid dozu 2 katına çıkarılır; ardından bazal doza dönülür.'
                    : 'Bolusun hemen ardından 200 mg/24 saat sürekli infüzyon (50 mL enjektörde 4 mg/mL -> 2,1 mL/saat) veya alternatif olarak 50 mg IV q6h.'}
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-indigo-950/25 border-indigo-900/50' : 'bg-indigo-50/70 border-indigo-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  3. Pediatrik Adrenal Kriz / Stres Özeti
                </span>
                <div className="text-lg font-black font-mono text-slate-900 dark:text-white mt-1">
                  2 mg/kg Bolus <span className="text-xs font-normal">(maks 100 mg)</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Bolus sonrası <strong>2 mg/kg/gün</strong> (veya BSA bazlı <strong>50–100 mg/m²/gün</strong>) sürekli
                  infüzyon ya da 4 bölünmüş IV doz (q6h). Ağırlığa özel mL hesabı için 3. sekmeyi kullanın.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SENARYO 3: PEDİATRİK DOZ HESAPLAYICI (AĞIRLIK BAZLI) */}
        {scenario === 'pediatric_shock' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label htmlFor={pedWeightInputId} className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Pediatrik Hasta Ağırlığı (3 – 80 kg)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={pedWeightInputId}
                      type="number"
                      min={3}
                      max={80}
                      step={1}
                      value={pedWeightKg}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!Number.isNaN(val)) setPedWeightKg(Math.min(80, Math.max(3, val)));
                      }}
                      className={`w-20 px-2.5 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">kg</span>
                  </div>
                </div>
                <input
                  id={pedWeightSliderId}
                  aria-label="Pediatrik hasta ağırlığı kilogram"
                  type="range"
                  min={3}
                  max={80}
                  step={1}
                  value={pedWeightKg}
                  onChange={(e) => setPedWeightKg(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>3 kg (Yenidoğan)</span>
                  <span>20 kg</span>
                  <span>40 kg</span>
                  <span>80 kg (Adölesan)</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                  İdame Doz Yoğunluğu (q6h · 6 Saatte Bir)
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPedMaintenanceDoseMgKg(1.0)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      pedMaintenanceDoseMgKg === 1.0
                        ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                        : isDark
                        ? 'border-slate-800 bg-slate-900 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    1 mg/kg q6h (4 mg/kg/gün)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPedMaintenanceDoseMgKg(0.5)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      pedMaintenanceDoseMgKg === 0.5
                        ? 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                        : isDark
                        ? 'border-slate-800 bg-slate-900 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    0,5 mg/kg q6h (2 mg/kg/gün)
                  </button>
                </div>
              </div>
            </div>

            {/* Pediatrik Sonuç Kartı */}
            <div className={`p-5 rounded-2xl border space-y-3.5 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  50 mg/mL Sulandırılmış Flakondan Çekilecek Hacim
                </span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  100 mg / 2 mL
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[11px] text-slate-500 block">IV Yükleme (2 mg/kg · maks 100)</span>
                  <span className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 tabular-nums">
                    {pedLoadMg.toFixed(0)} mg
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 block mt-0.5">
                    → {pedLoadMl.toFixed(2)} mL çekiniz
                  </span>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[11px] text-slate-500 block">İdame Doz (q6h · maks 50 mg)</span>
                  <span className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 tabular-nums">
                    {pedSingleMaintMg.toFixed(1)} mg
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 block mt-0.5">
                    → {pedSingleMaintMl.toFixed(2)} mL q6h ({pedDailyTotalMg.toFixed(0)} mg/gün)
                  </span>
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-xs ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                <strong>BSA Bazlı Stres Referansı (Tahmini BSA ≈ {pedApproxBsa.toFixed(2)} m²):</strong>{' '}
                <span className="font-mono font-semibold">
                  {pedBsaLowMgDay.toFixed(0)} – {pedBsaHighMgDay.toFixed(0)} mg/gün
                </span>{' '}
                (50–100 mg/m²/gün, maks 200 mg/gün). Küçük hacimler (&lt;0,5 mL) için 1 mL tüberkülin enjektörü ile
                çekip SF ile sulandırarak 1–3 dakikada yavaş IV uygulayın.
              </div>
            </div>
          </div>
        )}

        {/* SENARYO 4: KORTİKOSTEROİD EŞDEĞERLİK DÖNÜŞTÜRÜCÜ */}
        {scenario === 'steroid_converter' && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div>
                <label htmlFor={converterInputId} className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <Scale className="w-4 h-4" />
                  <span>Referans Hidrokortizon Dozu (mg)</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Glukokortikoid anti-inflamatuar potens eşdeğerliği (20 mg Hidrokortizon baz alınır)
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[20, 50, 100, 200].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setConverterHydroMg(preset)}
                    className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-bold cursor-pointer transition-colors ${
                      converterHydroMg === preset
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'
                        : isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-300'
                        : 'border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    {preset} mg
                  </button>
                ))}
                <div className="flex items-center gap-1.5">
                  <input
                    id={converterInputId}
                    type="number"
                    min={1}
                    max={2000}
                    step={5}
                    value={converterHydroMg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val)) setConverterHydroMg(Math.max(0, Math.min(2000, val)));
                    }}
                    className={`w-24 px-2.5 py-1.5 rounded-lg border font-mono text-sm font-bold text-right ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-xs font-mono text-slate-500">mg</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-amber-950/25 border-amber-800/60' : 'bg-amber-50/70 border-amber-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  Hidrokortizon (Baz)
                </span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {converterHydroMg.toFixed(0)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 1×</div>
                  <div className="font-bold text-amber-700 dark:text-amber-300">MK Potens: 1,0 (En Yüksek)</div>
                  <div>Biyolojik t½: 8–12 saat</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Prednizolon / Prednizon
                </span>
                <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                  {eqPrednisoloneMg.toFixed(1)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 4×</div>
                  <div>MK Potens: 0,8</div>
                  <div>Biyolojik t½: 12–36 saat</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Metilprednizolon (Prednol®)
                </span>
                <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                  {eqMethylpredMg.toFixed(1)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 5×</div>
                  <div>MK Potens: 0,5 (Minimal)</div>
                  <div>Biyolojik t½: 12–36 saat</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-950/25 border-rose-800/60' : 'bg-rose-50/70 border-rose-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                  Deksametazon (Dekort®)
                </span>
                <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
                  {eqDexamethasoneMg.toFixed(2)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 25–30×</div>
                  <div className="font-bold text-rose-600 dark:text-rose-400">MK Potens: 0 (YOK!)</div>
                  <div>Biyolojik t½: 36–72 saat</div>
                </div>
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
              <strong>Mineralokortikoid Oran Karşılaştırması (1 : 0,8 : 0,5 : 0):</strong> Deksametazonun
              mineralokortikoid aktivitesi <strong>sıfır (0)</strong> olduğundan adrenal kriz veya septik şokta
              intravasküler Na⁺/volüm desteği sağlamaz; buna karşılık beyin ödemi veya PONV profilaksisinde sıvı
              tutulumu istenmediği için Deksametazon tercih edilir.
            </div>
          </div>
        )}
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. TÜRKİYE PREPARAT & SULANDIRMA REHBERİ (#sec-tr-preparat)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Hydrocort-Liyo® / Hidrozon® / Solu-Cortef® 100 mg IV/IM Liyofilize Flakon & Ampul',
            presentation: '100 mg liyofilize toz içeren cam flakon/ampul + 2 mL enjeksiyonluk su çözücü ampul',
            concentration: '50 mg/mL (Sulandırıldığında)',
            saltOrBaseNote:
              'Her flakon 100 mg hidrokortizon bazına eşdeğer 133,7 mg Hidrokortizon Sodyum Süksinat içerir. 2 mL çözücü ile sulandırıldığında 50 mg/mL (1 mL = 50 mg) berrak çözelti elde edilir. Hızlı IV puşede (<30 sn) şiddetli perineal yanma yapar; en az 1–3 dakikada uygulanmalıdır.',
            alertLevel: 'high',
          },
          {
            name: 'Sürekli YBÜ İnfüzyon Hazırlıkları (ADRENAL / Woodcock 2020 Protokolü)',
            presentation: '50 mL enjektör pompası veya 200 mL IV infüzyon torbası (%0,9 NaCl veya %5 Dekstroz)',
            concentration: '4 mg/mL (50 mL) · 1 mg/mL (200 mL)',
            saltOrBaseNote:
              '200 mg/24 saat sürekli infüzyon protokolü, aralıklı 50 mg q6h boluslara kıyasla pik/vadi kortizol dalgalanmasını azaltır ve YBÜ’de insülin gerektiren hiperglisemi dalgalanmalarını sınırlar.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'IV Bolus (50–100 mg): 1 flakon (100 mg) + 2 mL kendi çözücüsü = 50 mg/mL (1 mL = 50 mg, 2 mL = 100 mg). En az 1–3 dakikada yavaş IV (veya 10–30 dk kısa infüzyon) olarak uygulanır.',
          '50 mL YBÜ Enjektör Pompası (ADRENAL / Woodcock Sürekli İnfüzyon): 2 Flakon (200 mg / 4 mL) + 46 mL SF veya %5 Dekstroz = 50 mL (4 mg/mL) → 2,08 mL/saat (2,1 mL/saat = 200 mg/24 saat).',
          '200 mL Torba İnfüzyonu: 2 Flakon (200 mg) / 200 mL SF veya %5 Dekstroz = 1 mg/mL → 8,3 mL/saat (= 200 mg/24 saat).',
        ]}
        concentrationTrapWarning="Hidrokortizon 100 mg ile Metilprednizolon (Prednol-L® 20 / 40 / 250 mg) veya Deksametazon (Dekort® 8 mg / 2 mL) ampul/flakonları farklı kortikosteroid potenslerine sahiptir (20 mg Hidrokortizon = 4 mg Metilprednizolon = 0,75 mg Deksametazon). Yanlışlıkla 100 mg Deksametazon veya Metilprednizolon uygulanması 5–25 kat aşırı doz yaratır!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="peripheral-ok"
        accessSummary="Periferik venöz kateterden güvenle bolus (1–3 dk yavaş IV) veya sürekli infüzyon olarak uygulanabilir; tamponlu nötr-hafif alkali pH (7,0–8,0) nedeniyle damar irritasyonu minimaldir. Santral venöz kateter (SVK) varsa ayrı lümenden veya uyumlu Y-site hattından gönderilebilir."
        phRange="7,0 – 8,0 (Tamponlu Nötr-Hafif Alkali Çözelti)"
        osmolalityNote="50 mg/mL sulandırılmış çözelti izoozmolara yakındır; periferik venlerde tromboflebit veya doku nekrozu riski düşüktür. Ancak yüksek doz hızlı puşede (<30 sn) görülen geçici perineal/genital yanma-karıncalanma fosfat/süksinat esterine özgüdür."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF)',
          '%5 Dekstroz (D5W)',
          '%5 Dekstroz + %0,9 NaCl',
          'Ringer Laktat (RL)',
        ]}
        stabilityNote="Sulandırılmış flakon oda sıcaklığında (25°C altında) 24 saat (bazı müstahzarlarda buzdolabında 72 saate kadar) fizikokimyasal olarak stabildir; ancak mikrobiyolojik güvenlik açısından 24 saat içinde tüketilmelidir. Bulanıklık veya çökelti varsa kullanılmaz."
        ySiteCompatible={[
          'SF (%0,9 NaCl)',
          '%5 Dekstroz',
          'Ringer Laktat (RL)',
          'Noradrenalin',
          'Vazopressin',
          'Fentanil',
          'Propofol',
          'İnsülin (Regüler)',
          'Potasyum Klorür (KCl)',
        ]}
        ySiteIncompatible={[
          'Midazolam (bulanıklık ve çökelti!)',
          'Fenitoin (IV — şiddetli presipitasyon!)',
          'Siprofloksasin (kristalizasyon / çökelti!)',
          'Diazepam',
          'Fenobarbital',
          'Vankomisin (yüksek konsantrasyonlarda fiziksel uyumsuzluk)',
          'Heparin (bazı karışım ve konsantrasyonlarda uyumsuzluk — ayrı lümen tercih edin)',
        ]}
        extravasationProtocol="Ekstravazasyon Yönetimi: Hidrokortizon vezikan bir ajan değildir ve ekstravazasyonda doku nekrozu beklenmez. İnfüzyonu durdurup kanülü çıkarın, ekstremiteyi eleve edin ve lokal soğuk/ılık kompres ile gözlemleyin."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="Aktif ilaç karaciğerde metabolize olur; böbrek yetmezliğinde (ABH / KBH / CRRT) rutin doz azaltımı gerekmez, ancak mineralokortikoid sıvı/Na⁺ yükü yakından izlenmelidir."
        renalDetails={[
          'Hidrokortizonun %90’dan fazlası hepatik 11β-HSD ve A-halkası redüksiyonu/glukuronidasyonu ile inaktif metabolitlere dönüşür; böbrek yetmezliğinde aktif kortizol birikimi klinik olarak minimaldir.',
          'Hemodiyaliz ve CRRT ile aktif hidrokortizon klirensi düşüktür; ek diyaliz sonrası replasman dozu gerekmez.',
          'Dikkat: İleri evre KBH veya oligürik ABH hastalarında 1:1 mineralokortikoid aktiviteye bağlı sodyum-su retansiyonu, hipertansiyon ve pulmoner ödem hızla tetiklenebilir; sıvı dengesi ve serum K⁺/Na⁺ yakından takip edilmelidir.',
        ]}
        hepaticSummary="Karaciğer yetmezliğinde (Child-Pugh B/C) hepatik klirens ve CBG sentezi azalır; uzamış tedavide en düşük etkili doz seçilmeli, ancak akut şok/kriz başlangıç dozu azaltılmamalıdır."
        hepaticDetails={[
          'Siroz ve ağır karaciğer yetmezliğinde (Child-Pugh C) A-halkası redüksiyonu ve konjugasyon yavaşladığından plazma yarı ömrü uzar; ayrıca CBG (Transkortin) ve albümin düşüklüğü serbest aktif kortizol fraksiyonunu yükseltir.',
          'Refrakter septik şok veya akut adrenal krizde 200 mg/gün başlangıç dozu korunur; ancak kritik sirotik hastalarda hiperglisemi, enfeksiyon (SBP/fungal) ve varis/peptik ülser kanaması riski nedeniyle tedavi süresi mümkün olan en kısa sürede sonlandırılmalıdır.',
        ]}
        {...STANDALONE_ORGAN_PART1['hydrocortisone']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="Sabit Stres Dozu · Deliryum, KKY & Hiperglisemi İzlemi"
        geriatricPoints={[
          'Geriatrik hastalarda (>65 yaş) refrakter septik şok (200 mg/gün) ve akut adrenal kriz (100 mg bolus) başlangıç dozları azaltılmaz; ancak advers etki duyarlılığı gençlere göre belirgin yüksektir.',
          'Yaşlılarda mineralokortikoid sıvı retansiyonuna bağlı akut kalp yetmezliği dekompansasyonu, kontrolsüz hipertansiyon, hipernatremi, steroid ilişkili YBÜ deliryumu/ajitasyon ve GİS kanama riski çok daha sıktır.',
          'Uzun süreli kullanımda osteoporotik kırık, proksimal kas güçsüzlüğü (miyopati) ve cilt incelmesi nedeniyle vazopresör ihtiyacı bittiğinde hızla kesilmeli veya en düşük fizyolojik doza inilmelidir.',
        ]}
        obesityWeightScalarBadge="Sabit Erişkin Dozu (200 mg/gün) · Kilo İle Artırılmaz"
        obesityPoints={[
          'Erişkinlerde (BMI ≥ 30 kg/m² dahil) septik şok (200 mg/gün) ve akut adrenal kriz / perioperatif majör stres dozu (100 mg bolus + 200 mg/24 sa) sabit fizyolojik-maksimal stres dozudur; gerçek vücut ağırlığına (TBW) göre artırılmaz.',
          'Obez hastalarda bazal insülin direnci yüksek olduğundan, 200 mg/gün hidrokortizon altında ağır hiperglisemi gelişme olasılığı belirgin artar; sürekli infüzyon (bolus yerine) ve erken IV insülin protokolü tercih edilmelidir.',
        ]}
        clinicalNote="Hem geriatrik hem obez hastalarda 4–6 saatlik kan şekeri takibi (hedef 140–180 mg/dL), günlük serum Na⁺/K⁺ kontrolü ve stres ülseri PPI profilaksisi standart bakımın parçasıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GEBELİK & LAKTASYON (#sec-gebelik)                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Maternal adrenal yetmezlik, adrenal kriz ve maternal septik şokta İLK TERCİH steroiddir (Plasental 11β-HSD Tip 2 fetüsü korur!)."
        pregnancyDetails={[
          'Plasental 11β-Hidroksisteroid Dehidrogenaz Tip 2 (11β-HSD2) Bariyeri: Plasentada yoğun bulunan 11β-HSD2 enzimi, maternal hidrokortizonun (kortizol) %85–90’ını inaktif kortizona dönüştürerek fetal dolaşıma geçişini engeller.',
          'Kritik Klinik Ayrım: Fetal akciğer matürasyonu hedeflendiğinde 11β-HSD2’ye dirençli florlu steroidler (Betametazon veya Deksametazon) kullanılırken; amaç yalnızca anneyi tedavi etmek olduğunda (maternal adrenal kriz, maternal septik şok, gebelikte astım/anafilaksi) fetal HPA aksını baskılamayan Hidrokortizon ideal ajandır.',
          'Doğum / Sezaryen Stres Dozu (Woodcock 2020): Adrenal yetmezlikli gebede aktif travay başlangıcında veya sezaryen indüksiyonunda 100 mg IV bolus + 200 mg/24 saat sürekli infüzyon uygulanır.',
        ]}
        lactationSummary="Endojen kortizol ile özdeştir; anne sütüne geçişi minimaldir (<%1 maternal doz) ve emzirme ile tamamen uyumludur."
        lactationDetails={[
          'Fizyolojik ve kısa süreli stres dozlarında anne sütündeki kortizol düzeyi bebeğin adrenal aksını baskılayacak düzeye ulaşmaz; emzirmenin kesilmesine gerek yoktur.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. OLUMSUZ ETKİLER (#sec-olumsuz)                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="sec-olumsuz"
        items={[
          {
            title: 'Hiperglisemi & İnsülin Direnci',
            incidenceOrSeverity: 'Çok Sık · ADRENAL / APROCCHSS',
            detail:
              'Hepatik glukoneogenez artışı ve periferik GLUT4 inhibisyonu ile YBÜ hastalarının >%50’sinde insülin gerektiren hiperglisemi gelişir; sürekli infüzyon (200 mg/24 sa) glisemik dalgalanmayı boluslara göre azaltır.',
            tone: 'amber',
          },
          {
            title: 'Hipernatremi, Hipokalemi & Sıvı Retansiyonu',
            incidenceOrSeverity: '1:1 Mineralokortikoid Etki',
            detail:
              'Renal toplayıcı kanalda MR/ENaC uyarımıyla Na⁺/su tutulumu, hipernatremi (>145 mEq/L), hipokalemi, metabolik alkaloz ve kalp yetmezliği olanlarda pulmoner ödem gelişebilir.',
            tone: 'rose',
          },
          {
            title: 'YBÜ Kazanılmış Güçsüzlüğü (ICUAW / Steroid Miyopatisi)',
            incidenceOrSeverity: 'Uzamış Kullanım + NMB Sinerjisi',
            detail:
              'İskelet kasında ubikuitin-proteazom (MuRF1/Atrogin-1) katabolizmasını hızlandırır; özellikle non-depolarizan nöromüsküler blokerlerle (Roküronyum/Sisatraküryum) birlikte kullanıldığında ağır kuadriparezi ve ventilatörden ayrılma güçlüğü yapar.',
            tone: 'rose',
          },
          {
            title: 'GİS Kanama, Süperenfeksiyon & Nöropsikiyatrik Deliryum',
            incidenceOrSeverity: 'Doz & Süre Bağımlı',
            detail:
              'Gastrik mukozal prostasiklin azalmasıyla stres ülseri/GİS kanama (PPI profilaksisi şart), lökosit demarginasyonuna bağlı psödo-lökositoz (enfeksiyonu maskeleyebilir), fırsatçı fungal enfeksiyon ve YBÜ deliryumu/uykusuzluk.',
            tone: 'indigo',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖZEL KLİNİK DURUMLAR (#sec-ozel-durumlar)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="sec-ozel-durumlar"
        items={[
          {
            title: 'Etomidat İndüksiyonu & 11β-Hidroksilaz İnhibisyonu',
            detail:
              'Tek doz Etomidat indüksiyonu bile adrenal korteksteki mitokondriyal 11β-hidroksilaz (CYP11B1) enzimini 24–72 saat boyunca bloke ederek endojen kortizol sentezini baskılar. Etomidat verilen refrakter septik şok hastalarında rölatif adrenal yetmezlik riski belirgin artar; refrakter vazopresör ihtiyacı varsa Hidrokortizon 200 mg/gün eşiği düşük tutulmalıdır.',
          },
          {
            title: 'Sürekli İnfüzyon vs Aralıklı Bolus Glisemi & Hemodinami Farkı',
            detail:
              'ADRENAL (200 mg/24 sa sürekli infüzyon) ve APROCCHSS (50 mg IV q6h) her ikisi de şok süresini kısaltır; ancak sürekli infüzyon plazma piklerini engelleyerek daha stabil kan şekeri profili, daha az hiperglisemik atak ve daha düşük hemşirelik iş yükü sunar.',
          },
          {
            title: 'Weaning / Kademeli Azaltma Kuralı (>14 Gün vs Kısa Süreli Şok)',
            detail:
              'Septik şokta ≤5–7 gün kullanılan Hidrokortizon, vazopresör kesildikten sonra doğrudan kesilebilir veya rebound hipotansiyon/inflamasyon gelişirse 2–4 günde kademeli azaltılabilir. Buna karşılık >14 gün boyunca suprafizyolojik steroid kullanan hastalarda HPA aksı baskılandığından ASLA ani kesilmez; akut adrenal krizi önlemek için kademeli taper uygulanır.',
          },
          {
            title: 'Kortikosteroidler & NMB Birlikte Kullanımında Kritik Hastalık Miyopatisi',
            detail:
              'ARDS veya ağır septik şokta Hidrokortizon ile birlikte >24–48 saat sürekli nöromüsküler bloker (Roküronyum, Veküronyum, Sisatraküryum) infüzyonu, kritik hastalık miyopatisi (kalın miyozin filaman kaybı) riskini katlayarak artırır. NMB süresi mümkün olan en kısa tutulmalı, TOF monitörizasyonu yapılmalı ve erken mobilizasyon planlanmalıdır.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. DERİN FARMAKODİNAMİK ANALİZ (#sec-derin-pd, 4 Kademe)            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı Pasif Difüzyonu & Sitoplazmik Nükleer Reseptör Kompleksi (GR-α & MR)',
          summary:
            'Hidrokortizon (endojen kortizol), kolesterol türevi lipofilik steroid halkası sayesinde hücre zarındaki fosfolipid çift tabakadan pasif difüzyonla sitoplazmaya geçer ve iki farklı nükleer süper-aile reseptörünün yanı sıra hızlı membran reseptörlerini hedefler (Miller’s 10th Ed. / Stoelting’s 6th Ed.):',
          points: [
            'Sitoplazmik Glukokortikoid Reseptörü (GR-α / NR3C1) & Şaperon Kompleksi: İnaktif durumdaki GR-α, sitoplazmada ısı şok proteinleri (HSP90, HSP70), p23 ve immünofilin (FKBP51/FKBP52) şaperon kompleksiyle kenetli halde bulunur. Kortizol, GR-α’nın ligand bağlanma cebine (LBD) oturduğunda konformasyonel değişim tetiklenir ve şaperonlar ayrışır.',
            'Mineralokortikoid Reseptörü (MR / NR3C2) Eşit Afinite Paradoksu: Kortizol, MR’ye aldosteron ile neredeyse EŞİT yüksek afiniteyle bağlanır! Normalde renal tübül hücrelerindeki 11β-HSD2 enzimi kortizolü inaktif kortizona çevirerek MR’yi korur; ancak 100–200 mg/gün stres dozlarında 11β-HSD2 enzimi doygunluğa (satürasyona) ulaşır ve hidrokortizon MR’yi doğrudan aktive eder.',
            'Membran İlişkili Glukokortikoid Reseptörleri (mGR) — Hızlı Non-Genomik Etki (<30 dk): Klasik gen transkripsiyonu 2–6 saat gerektirirken, hücre zarındaki mGR ve ekstranöronal monoamin taşıyıcısı (OCT3 / Uptake-2) üzerinden dakikalar içinde gelişen non-genomik etki vasküler katekolamin yanıtını hızla artırır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Nükleer Translokasyon, Transaktivasyon (GRE), Transrepresyon (NF-κB / AP-1) & Non-Genomik Kaskad',
          summary:
            'Şaperonlardan (HSP90) ayrılan ligand-bağlı GR-α kompleksi homodimerize olur, importin-α/β aracılığıyla nükleer porlardan çekirdeğe geçer ve üç paralel genetik/iyonik programı yönetir:',
          points: [
            'Transaktivasyon (+GRE — Anti-İnflamatuar & Adrenoseptör Genleri): GR-α homodimeri DNA üzerindeki pozitif Glukokortikoid Yanıt Elementlerine (+GRE) bağlanarak Annexin-A1 (Lipokortin-1 → Fosfolipaz A₂ inhibisyonu → prostaglandin ve lökotrien sentez blokajı), IκBα (NF-κB inhibitörü), MKP-1/DUSP1 (MAPK fosfataz), IL-10 ve vasküler α₁ / kardiyak β₁-adrenoseptör genlerinin transkripsiyonunu artırır.',
            'Transrepresyon (Tethering — Sitokin Fırtınası & iNOS Susturulması): GR-α monomerleri DNA’ya doğrudan bağlanmadan pro-inflamatuar transkripsiyon faktörlerine (NF-κB p65 ve AP-1) kenetlenir (tethering) ve Histon Deasetilaz-2 (HDAC2) enzimini kromatine çağırarak TNF-α, IL-1β, IL-6, COX-2 ve indüklenebilir Nitrik Oksit Sentaz (iNOS) ekspresyonunu susturur.',
            'Renal Toplayıcı Kanal MR → SGK1 → ENaC Kaskadı: Stres dozlarında 11β-HSD2 doygunluğunu aşarak MR’yi aktive eden kortizol, çekirdekte Serum ve Glukokortikoid İndüklenebilir Kinaz-1 (SGK1) sentezini artırır. SGK1, Nedd4-2 ubikuitin ligazını fosforilleyip inaktive ederek apikal Epitelyal Sodyum Kanallarının (ENaC) yıkımını önler ve bazolateral Na⁺/K⁺-ATPaz pompasını artırır (Na⁺/su tutulumu, K⁺/H⁺ atılımı).',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Vasküler Endotel, Düz Kas & Miyokard Dokusu → Kardiyovasküler & Şok Fizyolojisi',
            tissueTarget: 'Arteriyoler Düz Kas · Endotel Glikokaliksi · Kardiyomiyosit',
            accent: 'rose',
            points: [
              'iNOS/NO Vazopleji Blokajı & Katekolamin Duyarlılığı: Septik şokta aşırı NO üretimini (iNOS) baskılayarak düz kas cGMP kaynaklı vazoplejiyi tersine çevirir; α₁ ve β₁ reseptör yoğunluğunu (up-regülasyon) ve G-protein eşleşmesini restore eder.',
              'Ekstranöronal Katekolamin Geri Alım (Uptake-2 / OCT3) İnhibisyonu: Vasküler düz kas hücresinde OCT3 taşıyıcısını non-genomik olarak bloke ederek sinaptik aralıktaki endojen ve ekzojen Noradrenalinin lokal konsantrasyonunu dakikalar içinde yükseltir.',
              'Endotelyal Glikokaliks & Kapiller Geçirgenlik: VE-kaderin ekspresyonunu koruyup endotelyal sıkı bağlantıları stabilize ederek septik şokta interstisyel sıvı kaçağını (kapiller kaçak sendromu) azaltır.',
            ],
          },
          {
            systemTitle: 'Renal Kortikal Toplayıcı Kanal & Ekstraselüler Kompartman → Böbrek, Volüm & Elektrolit Fizyolojisi',
            tissueTarget: 'Esas Hücreler (ENaC) · İnterkale Hücreler · İntravasküler Volüm',
            accent: 'amber',
            points: [
              'MR/ENaC Aracılı Volüm Korunması: Adrenal kriz ve septik şokta renal Na⁺ ve pasif su geri emilimini artırarak intravasküler volümü ve kan basıncını destekler.',
              'Elektrolit & Asit-Baz Yansıması: Artmış ENaC sodyum geri emilimi tübüler lümende negatif elektriksel potansiyel oluşturarak esas hücrelerden K⁺, α-interkale hücrelerden H⁺ sekresyonunu hızlandırır → hipernatremi, hipokalemi ve metabolik alkaloz eğilimi doğurur.',
            ],
          },
          {
            systemTitle: 'Hepatosit, İskelet Kası, Adipoz Doku & Pankreas → Metabolik & Kas Fizyolojisi',
            tissueTarget: 'Karaciğer (PEPCK/G6Paz) · İskelet Kası (GLUT4/FoxO) · Adiposit',
            accent: 'teal',
            points: [
              'Hepatik Glukoneogenez & İnsülin Direnci: Karaciğerde PEPCK ve Glukoz-6-Fosfataz (G6Paz) genlerini transaktive eder; iskelet kasında ve yağ dokusunda insülin aracılı GLUT4 translokasyonunu inhibe ederek stres hiperglisemisine yol açar.',
              'Kas Katabolizması & Steroid Miyopatisi: İskelet kasında FoxO transkripsiyon faktörleri üzerinden E3 ubikuitin ligazları (MuRF1 ve Atrogin-1) uyararak miyofibriler protein yıkımını (özellikle Tip II hızlı lifler) hızlandırır; NMB ile birleştiğinde ağır ICUAW geliştirir.',
            ],
          },
          {
            systemTitle: 'İmmün Sistem (Lökosit/Makrofaj), Hipotalamo-Hipofizer Aks & SSS → İmmünoloji & Nöroendokrin',
            tissueTarget: 'Nötrofil/Lenfosit · Hipotalamus (CRH) / Hipofiz (ACTH) · Hipokampus',
            accent: 'indigo',
            points: [
              'Lökosit Kinetiği (Psödo-Lökositoz) & İmmün Modülasyon: L-selektin ve integrin ekspresyonunu azaltarak nötrofillerin endotelden ayrılıp (demarginasyon) periferik kana geçmesine neden olur (enfeksiyon olmadan WBC artışı!); eşzamanlı olarak T-lenfosit ve eozinofillerde apoptoz/sekestrasyonla eozinopeni ve lenfopeni yapar.',
              'HPA Aksı Negatif Geri Bildirimi & SSS Etkisi: Hipotalamik CRH ve ön hipofizer POMC/ACTH sentezini baskılar (>14 gün suprafizyolojik kullanımda adrenal kortikal atrofi); hipokampus ve prefrontal korteksteki GR uyarımı ise YBÜ deliryumu, uykusuzluk ve afektif dalgalanmaları tetikler.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'CIRCI (Kritik Hastalık İlişkili Kortikosteroid Yetmezliği), GR-β Direnci & Çoklu Vazopresör Sinerjisi',
          summary:
            'Ağır sepsiste kortikosteroid yanıtı yalnızca plazma kortizol düzeyiyle değil, hücresel reseptör duyarlılığı ve eşzamanlı hemodinamik ajanlarla belirlenir:',
          points: [
            'CIRCI & GR-β Glukokortikoid Direnci: Kritik hastalıkta pro-inflamatuar sitokinler (TNF-α, IL-1β) dominant-negatif izoform olan GR-β ekspresyonunu artırır ve GR-α nükleer translokasyonunu bozar. Bu doku düzeyindeki glukokortikoid direnci, normal veya yüksek serum kortizolüne rağmen göreceli kortizol yetmezliği (CIRCI) yaratır; 200 mg/gün stres dozu bu direnci aşmak için tasarlanmıştır.',
            'Noradrenalin + Vazopressin + Hidrokortizon Üçlü Sinerjisi: Refrakter septik şokta Hidrokortizon, hem Noradrenalinin α₁ reseptör yanıtını hem de Vazopressinin V₁a reseptör duyarlılığını ve endojen vazopressin salınımını potansiyalize ederek (VASST alt grup analizi) vazopresör dozunun hızla düşürülmesini sağlar.',
            'Fludrokortizon Sinerjisi (APROCCHSS): Hidrokortizon 200 mg/gün düzeyinde güçlü mineralokortikoid etki gösterse de, APROCCHSS çalışmasında enteral 50 mcg/gün Fludrokortizon eklenmesinin 90 günlük mortaliteyi azaltması (p=0,03), ağır septik şokta ek mineralokortikoid reseptör aktivasyonunun immün/hemodinamik katkı sunabileceğini düşündürmektedir.',
          ],
        }}
        clinicalPearls={[
          'Neden Septik Şokta Deksametazon Değil Hidrokortizon Kullanılır? Deksametazonun mineralokortikoid etkisi 0’dır ve 36–72 saatlik uzun biyolojik ömrü nedeniyle HPA aksını ağır baskılar; Hidrokortizon ise fizyolojik 1:1 kortizol dengesiyle hem vazopresör duyarlılığını hem de intravasküler Na⁺/volüm desteğini eşzamanlı sağlar.',
          'ACTH Stimülasyon Testi veya Rastgele Kortizol Beklenmez! SSC 2021 kılavuzu, refrakter septik şokta Hidrokortizon başlamak için rastgele kortizol veya kosintropin (ACTH) stimülasyon testi yapılmasını ÖNERMEZ; kritik hastalıkta düşük CBG nedeniyle total kortizol ölçümü yanıltıcıdır ve karar klinik vazopresör direncine göre verilir.',
          'Etomidat + Septik Şok Tuzak Kombinasyonu: Entübasyonda tek doz Etomidat verilen septik şok hastasında 11β-hidroksilaz blokajı 24–72 saat sürer; vazopresör ihtiyacı tırmanan hastada erken Hidrokortizon 200 mg/gün başlanması hemodinamik stabilizasyonu hızlandırır.',
          'Hızlı IV Puşede Perineal Yanma: Uyanık hastaya 100 mg Hidrokortizon 30 saniyeden hızlı puşe edilirse aniden şiddetli perineal/genital yanma ve kaşıntı gelişir (zararsızdır ama hastayı panikletir); daima 1–3 dakikada yavaş IV uygulayın.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA (#sec-kaynaklar)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Hidrokortizon Sodyum Süksinat"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Canlı / Canlı-Atenüe Aşılar (MMR, Suçiçeği, BCG, Sarı Humma)',
            mechanism: 'Hücresel ve Humoral İmmün Yanıtın Baskılanması',
            clinicalEffect:
              'İmmünsüpresif sistemik steroid dozları sırasında canlı aşı uygulanması, aşının kontrolsüz replikasyonuna ve disemine enfeksiyona yol açabilir.',
            management:
              'Yüksek doz sistemik Hidrokortizon tedavisi sırasında canlı aşılardan kaçının; aşılamayı steroid kesildikten en az 4 hafta sonraya erteleyin.',
          },
          {
            severity: 'D',
            agent: 'NSAİİ’ler (İbuprofen, Diklofenak, Ketorolak) & Antikoagülanlar (Varfarin, Heparin, DOAK)',
            mechanism: 'Gastrik Mukozal Prostasiklin Azalması + Aditif Hemorajik Risk',
            clinicalEffect:
              'Peptik ülser, gastrik erozyon ve ciddi üst GİS kanama riski 4–12 kat artar; Varfarin kullananlarda INR dalgalanması görülebilir.',
            management:
              'Zorunlu eşzamanlı kullanımda mutlaka IV/PO Proton Pompa İnhibitörü (PPI) profilaksisi ekleyin ve Varfarin alanlarda INR’yi sık takip edin.',
          },
          {
            severity: 'D',
            agent: 'Non-Depolarizan Nöromüsküler Blokerler (Roküronyum, Veküronyum, Sisatraküryum)',
            mechanism: 'Kas Proteolizinde (MuRF1/Atrogin-1) Sinerjistik Artış & Miyozin Kaybı',
            clinicalEffect:
              'Özellikle >24–48 saat süren birlikte kullanımda ağır YBÜ kazanılmış güçsüzlüğü (ICUAW), akut steroid miyopatisi ve uzamış mekanik ventilasyon gelişir.',
            management:
              'NMB infüzyon süresini en kısa düzeyde tutun, TOF monitörizasyonu uygulayın ve nöromüsküler bloğu mümkün olan en erken aşamada sonlandırın.',
          },
          {
            severity: 'D',
            agent: 'Potasyum Kaybettiren Diüretikler (Furosemid, Torasemid, Tiyazidler) & Amfoterisin B',
            mechanism: 'Renal Distal Tübülde Aditif K⁺ Ekskresyonu (MR/ENaC + NKCC2 Blokajı)',
            clinicalEffect:
              'Ağır hipokalemi, metabolik alkaloz ve buna sekonder malign ventriküler aritmi (Torsades de Pointes) ve digoksin toksisitesi riski artar.',
            management:
              'Günlük veya 6–12 saatlik serum K⁺ ve Mg²⁺ takibi yapın; agresif potasyum replasmanı (hedef K⁺ > 4,0 mEq/L) uygulayın.',
          },
          {
            severity: 'C',
            agent: 'Güçlü CYP3A4 İndükleyicileri (Fenitoin, Rifampisin, Karbamazepin, Fenobarbital)',
            mechanism: 'Hepatik Mikrozomal Kortikosteroid Metabolizmasının Hızlanması',
            clinicalEffect:
              'Hidrokortizon klirensini artırarak plazma düzeyini ve terapötik etkinliğini %30–50 oranında azaltabilir (adrenal yetmezlikli hastada krizi tetikleyebilir!).',
            management:
              'Klinik yanıtı yakından izleyin; kronik adrenal replasman alan hastalarda CYP3A4 indükleyicisi başlandığında hidrokortizon doz artışı gerekebilir.',
          },
          {
            severity: 'C',
            agent: 'İnsülin & Oral Antidiyabetikler (Metformin, Sülfonilüreler, SGLT2i)',
            mechanism: 'Hepatik Glukoneogenez Artışı & Periferik İnsülin Direnci (GLUT4 İnhibisyonu)',
            clinicalEffect:
              'Antidiyabetik ajanların hipoglisemik etkisini antagonize ederek belirgin hiperglisemiye yol açar; steroid kesildiğinde ise ani hipoglisemi riski doğurur.',
            management:
              'YBÜ’de 4–6 saatlik kan şekeri izlemiyle IV insülin infüzyonunu (hedef 140–180 mg/dL) titre edin; steroid kesildiğinde insülin dozunu hızla azaltın.',
          },
        ]}
        references={[
          {
            authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP (Eds.)',
            title: "Miller's Anesthesia, 10th Edition — Chapter: Endocrine Physiology & Perioperative Corticosteroids.",
            journal: 'Elsevier',
            year: 2025,
            note: 'HPA aksı fizyolojisi, 11β-HSD enzim sistemi, kortikosteroid eşdeğerlikleri, etomidat etkileşimi ve perioperatif stres dozu yönetimi.',
          },
          {
            authors: 'Flood P, Rathmell JP, Urman RD (Eds.)',
            title: "Stoelting's Pharmacology & Physiology in Anesthetic Practice, 6th Edition — Chapter: Endocrine & Corticosteroid Pharmacology.",
            journal: 'Wolters Kluwer',
            year: 2022,
            note: 'Hidrokortizonun GR-α/MR farmakodinamisi, CBG bağlanması, glukokortikoid/mineralokortikoid oranları ve plasental 11β-HSD2 bariyeri.',
          },
          {
            authors: 'Venkatesh B, Finfer S, Cohen J, et al. (ADRENAL Trial Investigators)',
            title: 'Adjunctive Glucocorticoid Therapy in Patients with Septic Shock.',
            journal: 'N Engl J Med',
            year: 2018,
            pmid: '29347874',
            note: 'n=3800 RCT: Mekanik ventilasyondaki septik şokta sürekli 200 mg/gün Hidrokortizon 90 günlük mortaliteyi değiştirmemiş (%27,9 vs %28,8; p=0,50), ancak şoktan çıkış süresini (3 vs 4 gün), MV süresini (6 vs 7 gün) ve kan transfüzyonu ihtiyacını anlamlı azaltmıştır.',
          },
          {
            authors: 'Annane D, Renault A, Brun-Buisson C, et al. (APROCCHSS Investigators)',
            title: 'Hydrocortisone plus Fludrocortisone for Adults with Septic Shock.',
            journal: 'N Engl J Med',
            year: 2018,
            pmid: '29490185',
            doi: '10.1056/NEJMoa1705716',
            note: 'n=1241 RCT: Ağır septik şokta Hidrokortizon 50 mg IV q6h + Fludrokortizon 50 mcg PO/NG kombinasyonu 90 günlük mortaliteyi anlamlı azaltmış (%43,0 vs %49,1; p=0,03) ve vazopresörsüz günleri artırmıştır (17 vs 15 gün).',
          },
          {
            authors: 'Evans L, Rhodes A, Alhazzani W, et al.',
            title: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021.',
            journal: 'Intensive Care Med',
            year: 2021,
            pmid: '34599691',
            doi: '10.1007/s00134-021-06506-y',
            note: 'Devam eden vazopresör gereksinimi (Noradrenalin ≥ 0,25 mcg/kg/dk ≥ 4 saat) olan refrakter septik şokta 200 mg/gün IV Hidrokortizon önerisi.',
          },
          {
            authors: 'Woodcock T, Barker P, Daniel S, et al.',
            title: 'Guidelines for the management of glucocorticoids during the peri-operative period for patients with adrenal insufficiency.',
            journal: 'Anaesthesia',
            year: 2020,
            pmid: '32017012',
            note: 'AAGBI / Royal College of Physicians / Society for Endocrinology ortak kılavuzu: Majör cerrahide indüksiyonda 100 mg IV bolus + 200 mg/24 saat sürekli infüzyon stres dozu protokolü.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/hydrocortisone.html"
        medscapeUrl="https://reference.medscape.com/drug/cortef-solu-cortef-hydrocortisone-342744"
      />
    </div>
  );
};
