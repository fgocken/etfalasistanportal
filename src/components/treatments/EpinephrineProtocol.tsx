import React, { useState, useId } from 'react';
import {
  Activity,
  HeartPulse,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  Syringe,
  Droplet,
  Clock,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Flame,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Timer,
  BookOpen,
  Wind,
  Copy,
  Check
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
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  isDark: boolean;
}

type EpinephrinePrepType =
  | 'vial_50_std'
  | 'vial_50_low'
  | 'vial_50_dec'
  | 'bag_250'
  | 'bag_100_peri'
  | 'custom_conc';

type EmergencyScenarioId = 'acls' | 'anaphylaxis' | 'last' | 'push_dose' | 'nebulized';

export const EpinephrineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  const [prepType, setPrepType] = useState<EpinephrinePrepType>('vial_50_std');
  const [customConcInput, setCustomConcInput] = useState<number>(80);

  // Doz Modu: mcg/kg/dk veya mcg/dk
  const [doseMode, setDoseMode] = useState<'weight_based' | 'absolute'>('weight_based');
  const [doseMcgKgMin, setDoseMcgKgMin] = useState<number>(0.05);
  const [doseMcgMin, setDoseMcgMin] = useState<number>(3.5);

  // Acil Senaryo / Bolus & İnhalasyon Modülü
  const [activeScenario, setActiveScenario] = useState<EmergencyScenarioId>('anaphylaxis');
  const [pushDoseBolusMcg, setPushDoseBolusMcg] = useState<number>(10);
  const [anaphylaxisRoute, setAnaphylaxisRoute] = useState<'im' | 'iv'>('iv');

  // Akordiyon State'leri
  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

  // Erişilebilirlik ID'leri
  const weightInputId = useId();
  const prepSelectId = useId();
  const doseSliderId = useId();
  const customConcInputId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) ---
  const concentrationMcgMl: number = (() => {
    switch (prepType) {
      case 'vial_50_std':
        return 80.0; // 4 mg / 50 mL
      case 'vial_50_low':
        return 40.0; // 2 mg / 50 mL
      case 'vial_50_dec':
        return 100.0; // 5 mg / 50 mL
      case 'bag_250':
        return 16.0; // 4 mg / 250 mL
      case 'bag_100_peri':
        return 10.0; // 1 mg / 100 mL
      case 'custom_conc':
        return customConcInput > 0 ? customConcInput : 80.0;
      default:
        return 80.0;
    }
  })();

  // Senkronize Doz Değerleri
  const activeDoseMcgKgMin =
    doseMode === 'weight_based'
      ? doseMcgKgMin
      : weightKg > 0
      ? doseMcgMin / weightKg
      : 0;

  const activeDoseMcgMin =
    doseMode === 'weight_based' ? doseMcgKgMin * weightKg : doseMcgMin;

  // İnfüzyon Çıktıları
  const hourlyDoseMcg = activeDoseMcgMin * 60;
  const infusionRateMlHr = concentrationMcgMl > 0 ? hourlyDoseMcg / concentrationMcgMl : 0;
  const dailyTotalMcg = hourlyDoseMcg * 24;
  const dailyTotalMg = dailyTotalMcg / 1000;
  const dailyTotalMl = infusionRateMlHr * 24;
  const dailyAmpoules1Mg = dailyTotalMg; // 1 ampul = 1 mg/mL

  // Reseptör Hakimiyeti & Doz Kademesi
  const receptorZone: 'beta_dominant' | 'mixed_inopressor' | 'alpha_vasopressor' = (() => {
    if (activeDoseMcgKgMin < 0.05) return 'beta_dominant';
    if (activeDoseMcgKgMin <= 0.15) return 'mixed_inopressor';
    return 'alpha_vasopressor';
  })();

  const receptorLabel =
    receptorZone === 'beta_dominant'
      ? '● Beta-2 / Beta-1 Baskın (İnotrop & Bronkodilatör)'
      : receptorZone === 'mixed_inopressor'
      ? '▲ Dengeli Beta-1 + Alfa-1 (İnopressör Bölge)'
      : '✖ Alfa-1 Baskın (Güçlü Vazokonstriksiyon & Aritmi Riski)';

  // Ağırlık Bazlı Acil Hesaplamalar (Erişkin & Pediatrik güvenli tavanlar)
  const isPediatricWeight = weightKg < 40;
  const aclsPedsDoseMg = Math.min(1.0, Number((weightKg * 0.01).toFixed(2)));
  const aclsPedsVol1to10k = Number((aclsPedsDoseMg * 10).toFixed(1)); // 0.1 mg/mL (1:10.000)

  const anaphImDoseMg = isPediatricWeight
    ? Math.min(0.5, Number((weightKg * 0.01).toFixed(2)))
    : 0.5;
  const anaphImVol1to1k = Number(anaphImDoseMg.toFixed(2)); // 1 mg/mL (1:1.000)

  const lastMaxBolusMcg = Math.min(100, Math.round(weightKg * 1.0)); // ≤ 1 mcg/kg
  const lastBolusVol10McgMl = Number((lastMaxBolusMcg / 10).toFixed(1));

  const pushDoseVol10McgMl = Number((pushDoseBolusMcg / 10).toFixed(1));
  const nebulizedLepiMl = Math.min(5.0, Number((weightKg * 0.5).toFixed(1))); // 0.5 mL/kg 1:1000 maks 5 mL

  // Pano Özeti Kopyalama (MonographCopyButton)
  const getSummaryText = () =>
    [
      `ADRENALİN (EPİNEFRİN) KLİNİK DOZ ÖZETİ`,
      `Hasta Ağırlığı: ${weightKg} kg`,
      `İnfüzyon Çözeltisi: ${concentrationMcgMl} mcg/mL`,
      `Hedef İnfüzyon Dozu: ${activeDoseMcgKgMin.toFixed(3)} mcg/kg/dk (${activeDoseMcgMin.toFixed(1)} mcg/dk)`,
      `Pompa Debisi: ${infusionRateMlHr.toFixed(1)} mL/saat`,
      `24 Saatlik Tüketim: ${dailyTotalMg.toFixed(1)} mg/gün (~${Math.ceil(dailyAmpoules1Mg)} adet 1 mg ampul)`,
      `Reseptör Profili: ${receptorLabel}`,
      `---`,
      `Acil Referanslar (${weightKg} kg):`,
      `- Anafilaksi IM (1:1.000): ${anaphImDoseMg.toFixed(2)} mg (${anaphImVol1to1k} mL IM)`,
      `- LAST Modifiye ACLS (≤1 mcg/kg): Maks ${lastMaxBolusMcg} mcg IV (${lastBolusVol10McgMl} mL [10 mcg/mL])`,
      `- Push-Dose Köprü (10 mcg/mL): ${pushDoseBolusMcg} mcg = ${pushDoseVol10McgMl} mL IV`,
    ].join('\n');

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v4.0)                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Özet & Etki' },
          { id: 'sec-pkpd', label: 'PK / PD' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-hesaplayici', label: 'İnfüzyon Pompası' },
          { id: 'sec-acildoz', label: 'Acil Dozlar' },
          { id: 'sec-rejyonel', label: 'LA Katkı & Test' },
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
        defaultOpen={false}
        tallManName="EPINEPHrine"
        confusionRiskWith="NORepinephrine · EPHEDRINE"
        criticalAlerts={[
          'Türkiye 1 mL Ampul Ayrımı (4 Kat Hata Riski): Türkiye piyasasında 0.25 mg/1 mL, 0.5 mg/1 mL ve 1 mg/1 mL (1:1.000) ampullerin TAMAMI 1 mL hacmindedir; çekmeden önce mg/mL değeri sesli okunmalıdır.',
          '1:1.000 vs 1:10.000 (10 Kat – 100 Kat Fatal Doz Hatası): 1:1.000 (1 mg/mL) konsantre ampulün anafilakside veya hipotansiyonda seyreltilmeden IV puşesi ventriküler fibrilasyon, akut pulmoner ödem ve intrakraniyal kanama yapar! IV anafilaksi/push-dose için 1:10.000 (100 mcg/mL) veya 1:100.000 (10 mcg/mL) seyreltme zorunludur.',
          'LAST Arrest Kuralı (ASRA 2020): Lokal anestezik sistemik toksisitesine bağlı arrestte standart 1 mg IV adrenalin VERİLMEZ; ≤ 1 mcg/kg (maks 100 mcg) modifiye doz kullanılır.',
          'Alkali İnaktivasyon & Oksidasyon: Sodyum Bikarbonat (%8.4 NaHCO₃) ile aynı lümenden asla verilmez; ışık/hava temasıyla pembe/kahverengi adrenokroma dönen çözeltiler derhal imha edilir.',
        ]}
        antidoteOrRescue="Ekstravazasyonda infüzyonu kapatın, kanülden aspire edin ve 12 saat içinde 5–10 mg Fentolamin (10–15 mL SF) SC çember şeklinde infiltre edin (Fentolamin yoksa Terbutalin 1 mg/10 mL SF lokal infiltrasyon veya topikal %2 Nitrogliserin + ılık kompres; BUZ/SOĞUK ASLA UYGULANMAZ!). İyatrojenik aşırı dozda hipertansif kriz/taşiaritmi için kısa etkili α-bloker (Fentolamin) veya Labetalol/Esmolol titre edilir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & BİFAZİK RESEPTÖR PROFİLİ         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="font-semibold text-amber-700 dark:text-amber-400">
                Endojen Katekolamin · İnopressör
              </span>
              <span aria-hidden="true">·</span>
              <span>Adrenalin Biofarma · Galen · Osel</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">ATC: C01CA24</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
              Adrenalin (Epinefrin) Klinik Monografisi &amp; Doz Hesaplayıcısı
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kimlik:</strong> Hem{' '}
              <strong>α (α₁, α₂)</strong> hem de <strong>β (β₁, β₂)</strong> adrenerjik reseptörleri doza bağımlı
              uyaran güçlü endojen katekolamin. Kardiyak arrest (ACLS/PALS) ve anafilaktik şokta{' '}
              <strong>birinci basamak yaşam kurtarıcı</strong>; post-KPB düşük debi, refrakter bradikardi ve septik
              şokta ise güçlü <strong>inopressör</strong> ajandır.
            </p>
          </div>
        </div>

        {/* Doz-Bağımlı Bifazik Reseptör Profili */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700/80 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-sm text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                <Wind className="w-4 h-4 shrink-0" />
                <span>Düşük Doz: β₂ &amp; β₁ Baskın</span>
              </span>
              <span className="font-mono tabular-nums text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                0.01–0.05 mcg/kg/dk
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              İskelet kası arteriyollerinde <strong>β₂ vazodilatasyon</strong> (SVR ve diyastolik basınç düşebilir),
              güçlü <strong>bronkodilatasyon</strong>, belirgin <strong>β₁ inotropi/kronotropi</strong> ve hepatik
              glikojenoliz/glikoliz artışı (Tip-B laktat artışı).
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700/80 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-sm text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 shrink-0" />
                <span>Orta Doz: Dengeli β₁ + α₁</span>
              </span>
              <span className="font-mono tabular-nums text-xs font-semibold text-amber-700 dark:text-amber-400">
                0.05–0.15 mcg/kg/dk
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>β₁ kontraktilite ve kalp hızı</strong> artışı ile birlikte belirginleşen{' '}
              <strong>α₁ vazokonstriksiyon</strong> dengelenir. Kardiyak debi (CO), sistolik basınç ve MAP yükselir;
              kardiyojenik şok ve KPB çıkışında klasik inopressör aralıktır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700/80 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-sm text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 shrink-0" />
                <span>Yüksek Doz &amp; Bolus: α₁ Baskın</span>
              </span>
              <span className="font-mono tabular-nums text-xs font-semibold text-rose-700 dark:text-rose-400">
                &gt; 0.15 mcg/kg/dk
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Yaygın <strong>α₁ arteriyoler ve venöz vazokonstriksiyon</strong> ile SVR keskin yükselir. KPR'de aort
              diyastolik basıncını artırarak <strong>koroner perfüzyon basıncını (CPP)</strong> sağlar; infüzyonda
              splanknik/renal iskemi ve taşiaritmi riskini artırır.
            </p>
          </div>
        </div>

        {/* Etki Mekanizması & Moleküler Sinyal Yolakları */}
        <div
          id="sec-etki"
          className={`mt-4 p-4 rounded-xl border leading-relaxed text-xs sm:text-sm ${
            isDark
              ? 'bg-amber-950/20 border-amber-900/50 text-amber-100'
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <Activity className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-sm block">Etki Mekanizması &amp; Moleküler Sinyal Yolakları:</span>
              <p>
                Böbreküstü bezi medullasından salınan endojen katekolamin olarak tüm <strong>α ve β adrenoseptörleri</strong>{' '}
                uyarır: <strong>β₁/β₂ reseptörleri (Gs proteini → adenilat siklaz → cAMP↑)</strong> üzerinden miyokard
                kontraktilitesini/otomatisitesini artırır, bronş düz kasını gevşetir ve mast hücre medyatör salınımını
                durdurur (anafilakside hayati mekanizma); <strong>α₁ reseptörleri (Gq → IP₃/DAG → Ca²⁺↑)</strong> üzerinden
                yüksek dozlarda ve KPR bolusunda güçlü periferik vazokonstriksiyonla koroner perfüzyon basıncını yükseltir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. FARMAKOKİNETİK & METABOLİZMA (AKORDİYON)                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-pkpd"
        className={`scroll-mt-20 rounded-2xl border transition-all overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
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
                <span className="text-xs font-mono tabular-nums text-amber-700 dark:text-amber-400">
                  t½: 1–2 dk · COMT / MAO
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                IV, IM ve endotrakeal emilim kinetiği; plazma yarı ömrü ve metabolik yan etkilerin fizyolojisi.
              </p>
            </div>
          </div>
          {pkOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {pkOpen && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-4">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  IV Etki Başlangıcı
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-1 block">
                  &lt; 1 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Zirve etki: 1–2 dk</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  IM Etki Başlangıcı
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400 mt-1 block">
                  3 – 5 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Uyluk IM zirve: ~8 dk</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Plazma Yarı Ömrü
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400 mt-1 block">
                  1 – 2 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Etki süresi: 5–10 dk</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Metabolizma
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  COMT + MAO
                </span>
                <span className="text-[10px] text-slate-400">Metanefrin · VMA (İdrar)</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
              isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <p>
                Oral yoldan gastrointestinal mukoza ve karaciğerdeki yoğun MAO/COMT enzimleri nedeniyle tamamen inaktive
                edilir; parenteral veya inhaler uygulanır. Karaciğer, böbrek ve dolaşımdaki dokularda COMT ve MAO ile
                inaktif <strong>metanefrin</strong> ve <strong>vanililmandelik asite (VMA)</strong> metabolize edilir.
                Endojen klirens organ yetmezliğinden bağımsızdır; yanıt hemodinamik hedeflere göre titre edilir.
              </p>
            </div>
          </div>
        )}
      </section>

      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Hayati tehlike oluşturan ANAFİLAKSİ ve KARDİYAK ARRESTTE hiçbir mutlak kontrendikasyon YOKTUR.',
          'Parmağa, buruna, kulak kepçesine veya penise yapılan lokal anestezik enjeksiyonlarında adrenalinli solüsyonlar doku nekrozu riski nedeniyle kullanılmamalıdır (elektif dijital blok).',
        ]}
        relativeItems={[
          'Ciddi koroner arter hastalığı, hipertrofik obstrüktif kardiyomiyopati (HOCM) ve feokromositoma krizi.',
          'Non-selektif beta-bloker (ör. Propranolol) veya kokain/MAOI entoksikasyonu: Karşılanmamış α₁ vazokonstriksiyon hipertansif krizi tetikleyebilir.',
          'Dar açılı glokom ve kontrolsüz tirotoksikoz (sempatomimetik aşırı duyarlılık).',
        ]}
        clinicalNote="Anafilakside beta-bloker kullanan hastada adrenalin yanıtı yetersiz kalırsa 1–5 mg IV Glukagon eklenmelidir. LAST arrestinde standart 1 mg IV yerine ≤ 1 mcg/kg modifiye doz uygulanır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. İNTERAKTİF İNFÜZYON POMPASI & DOZ HESAPLAYICISI                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="İnteraktif İnfüzyon Pompası & Doz Hesaplayıcısı"
        subtitle="Erişkin ve pediatrik ağırlık aralığı (5–150 kg), standart 50 mL enjektör ve torba seyreltme şemaları."
        icon={
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Syringe className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
        containerClassName={isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}
        bodyClassName="p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-end gap-2">
          <MonographCopyButton isDark={isDark} getText={getSummaryText} label="Rapor Kopyala" />
          <button
            type="button"
            onClick={() => {
              setWeightKg(70);
              setPrepType('vial_50_std');
              setDoseMode('weight_based');
              setDoseMcgKgMin(0.05);
              setDoseMcgMin(3.5);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Sol Kolon: Parametre Girdileri (7 Kolon) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Hasta Ağırlığı */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <label htmlFor={weightInputId} className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hasta Vücut Ağırlığı:</span>
                </label>
                <span className="font-mono tabular-nums text-sm text-amber-700 dark:text-amber-400 font-bold">
                  {weightKg} kg {isPediatricWeight ? '(Pediatrik)' : ''}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <input
                  id={weightInputId}
                  type="range"
                  min="5"
                  max="150"
                  step="1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex items-center gap-1.5 shrink-0">
                  {[15, 30, 50, 70, 90].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeightKg(w)}
                      className={`px-2.5 py-1.5 min-h-[36px] text-xs font-mono tabular-nums rounded-lg border transition-colors cursor-pointer ${
                        weightKg === w
                          ? 'bg-amber-600 text-white border-amber-600 font-bold'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ObesityDosingScaler
              isDark={isDark}
              drugName="Adrenalin (İnfüzyon)"
              recommendedScalar="AdjBW"
              secondaryScalar={{ type: 'IBW', context: 'Morbid Obez' }}
              rationale="Resüsitasyon (ACLS 1 mg IV / Anafilaksi 0.5 mg IM) sabit dozlu olsa da, sürekli infüzyonda morbid obezlerde AdjBW veya IBW kullanılması aşırı taşiaritmi ve laktat yükselmesini önler (SOBA / Miller's)."
              currentWeightKg={weightKg}
              onApplyWeight={(w) => setWeightKg(Math.min(150, Math.max(5, w)))}
            />

            {/* 2. Çözelti Hazırlama Şeması */}
            <div>
              <label htmlFor={prepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Seyreltme / Hazırlama Modu (1 mg/1 mL Standart Ampul Bazlı):
              </label>
              <select
                id={prepSelectId}
                value={prepType}
                onChange={(e) => setPrepType(e.target.value as EpinephrinePrepType)}
                className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600'
                }`}
              >
                <option value="vial_50_std">
                  Standart YBÜ Enjektörü: 4 mg / 50 mL [80 mcg/mL] (4 Ampul [4 mL] + 46 mL D5W / SF)
                </option>
                <option value="vial_50_low">
                  Düşük Doz Titrasyon: 2 mg / 50 mL [40 mcg/mL] (2 Ampul [2 mL] + 48 mL D5W / SF)
                </option>
                <option value="vial_50_dec">
                  Ondalık Enjektör: 5 mg / 50 mL [100 mcg/mL] (5 Ampul [5 mL] + 45 mL D5W / SF)
                </option>
                <option value="bag_250">
                  Anafilaksi / Torba İnfüzyonu: 4 mg / 250 mL [16 mcg/mL] (4 Ampul + 246 mL SF)
                </option>
                <option value="bag_100_peri">
                  Periferik Kısa Süreli / Düşük Doz: 1 mg / 100 mL [10 mcg/mL] (1 Ampul + 99 mL SF)
                </option>
                <option value="custom_conc">Özel Konsantrasyon (Kullanıcı Tanımlı mcg/mL)</option>
              </select>

              {prepType === 'custom_conc' && (
                <div className="mt-2 flex items-center gap-2">
                  <label htmlFor={customConcInputId} className="text-xs text-slate-500 shrink-0">
                    Konsantrasyon:
                  </label>
                  <input
                    id={customConcInputId}
                    type="number"
                    min="1"
                    max="1000"
                    step="1"
                    value={customConcInput}
                    onChange={(e) => setCustomConcInput(Math.max(1, Number(e.target.value)))}
                    className={`w-28 p-1.5 text-xs font-mono tabular-nums rounded-lg border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-xs text-slate-500 font-mono">mcg/mL</span>
                </div>
              )}

              <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>
                  Etkin Konsantrasyon:{' '}
                  <strong className="text-slate-900 dark:text-white font-mono tabular-nums">
                    {concentrationMcgMl} mcg/mL
                  </strong>
                </span>
                <span className="font-mono">1 mg = 1000 mcg · Işıktan koruyun</span>
              </div>
            </div>

            {/* 3. Hedef Doz & Birim Modu */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Hedef İnfüzyon Dozu:
                </span>
                <div
                  className={`inline-flex p-0.5 rounded-lg border text-xs font-semibold ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setDoseMode('weight_based')}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      doseMode === 'weight_based'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    mcg/kg/dk (Standart)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDoseMode('absolute');
                      setDoseMcgMin(Number(activeDoseMcgMin.toFixed(1)));
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      doseMode === 'absolute'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    mcg/dk (Sabit Skala)
                  </button>
                </div>
              </div>

              {doseMode === 'weight_based' ? (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Doz Aralığı (0.01 – 0.50 mcg/kg/dk):</span>
                    <span className="font-mono tabular-nums text-sm font-bold text-amber-700 dark:text-amber-400">
                      {doseMcgKgMin.toFixed(2)} mcg/kg/dk
                    </span>
                  </div>
                  <input
                    id={doseSliderId}
                    type="range"
                    min="0.01"
                    max="0.50"
                    step="0.01"
                    value={doseMcgKgMin}
                    onChange={(e) => setDoseMcgKgMin(Number(e.target.value))}
                    className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[0.01, 0.02, 0.03, 0.05, 0.08, 0.10, 0.15, 0.20, 0.30, 0.50].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDoseMcgKgMin(d)}
                        className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-lg border transition-colors cursor-pointer ${
                          Math.abs(doseMcgKgMin - d) < 0.004
                            ? 'bg-amber-600 text-white border-amber-600 font-bold'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {d.toFixed(2)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Doz Aralığı (0.5 – 30.0 mcg/dk):</span>
                    <span className="font-mono tabular-nums text-sm font-bold text-amber-700 dark:text-amber-400">
                      {doseMcgMin.toFixed(1)} mcg/dk
                    </span>
                  </div>
                  <input
                    id={doseSliderId}
                    type="range"
                    min="0.5"
                    max="30"
                    step="0.5"
                    value={doseMcgMin}
                    onChange={(e) => setDoseMcgMin(Number(e.target.value))}
                    className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[1, 2, 3.5, 5, 7, 10, 15, 20].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDoseMcgMin(val)}
                        className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-lg border transition-colors cursor-pointer ${
                          Math.abs(doseMcgMin - val) < 0.1
                            ? 'bg-amber-600 text-white border-amber-600 font-bold'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {val} mcg/dk
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sağ Kolon: Kalibre Pompa Çıktı Paneli (5 Kolon) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  İnfüzyon Pompası Debisi
                </span>
                <span className="text-xs font-mono tabular-nums font-bold text-amber-700 dark:text-amber-400">
                  {concentrationMcgMl} mcg/mL
                </span>
              </div>

              {/* BÜYÜK POMPA DEBİSİ */}
              <div className="py-4 text-center">
                <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-amber-600 dark:text-amber-400 tracking-tight">
                  {infusionRateMlHr.toFixed(1)}
                  <span className="text-sm uppercase font-mono text-slate-500 dark:text-slate-400 ml-2">
                    mL / saat
                  </span>
                </div>
                <div className={`text-xs font-medium mt-2 ${
                  receptorZone === 'beta_dominant'
                    ? 'text-cyan-700 dark:text-cyan-400'
                    : receptorZone === 'mixed_inopressor'
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-rose-700 dark:text-rose-400'
                }`}>
                  {receptorLabel}
                </div>
              </div>

              {/* DETAYLI PARAMETRE GRID'İ */}
              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Dakikalık Doz</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white text-sm">
                    {activeDoseMcgMin.toFixed(1)} mcg/dk
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono tabular-nums mt-0.5">
                    {activeDoseMcgKgMin.toFixed(3)} mcg/kg/dk
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Saatlik Tüketim</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white text-sm">
                    {hourlyDoseMcg.toFixed(0)} mcg/sa
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono tabular-nums mt-0.5">
                    {(hourlyDoseMcg / 1000).toFixed(2)} mg/saat
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">24 Saatlik Sarfiyat</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white text-sm">
                    {dailyTotalMg.toFixed(1)} mg/gün
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono tabular-nums mt-0.5">
                    {dailyTotalMl.toFixed(0)} mL / 24 saat
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Gereken 1 mg Ampul</span>
                  <span className="font-mono tabular-nums font-bold text-amber-700 dark:text-amber-400 text-sm">
                    ~{Math.ceil(dailyAmpoules1Mg)} Ampul/gün
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono tabular-nums mt-0.5">
                    Net: {dailyAmpoules1Mg.toFixed(2)} ampul
                  </span>
                </div>
              </div>
            </div>

            {activeDoseMcgKgMin > 0.15 && (
              <div className="mt-3 p-3 rounded-xl border bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Yüksek Doz Uyarısı (&gt; 0.15 mcg/kg/dk):</span>
                  Taşiaritmi, miyokard iskemisi ve Tip-B hiperlaktatemi hızlanır. Vazopleji baskınsa Noradrenalin veya
                  Vazopressin ile kombine edilmesi önerilir.
                </div>
              </div>
            )}
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. ACİL BOLUS, PUSH-DOSE, ANAFİLAKSİ, LAST & NEBÜLİZASYON MODÜLÜ    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-acildoz"
        title="Acil Endikasyonlara Göre Bolus, Push-Dose & İnhalasyon Hesaplayıcısı"
        subtitle={`Seçili hasta ağırlığına (${weightKg} kg) göre anında hesaplanan klinik dozlar.`}
        icon={
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Timer className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
        containerClassName={isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}
        bodyClassName="p-5 sm:p-6"
      >

        {/* Senaryo Sekmeleri */}
        <div
          className={`flex flex-wrap gap-1.5 p-1.5 rounded-xl border mt-4 ${
            isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {[
            { id: 'anaphylaxis', label: 'Anafilaksi (IM / IV)' },
            { id: 'acls', label: 'Kardiyak Arrest (ACLS / PALS)' },
            { id: 'last', label: 'LAST Kurtarma (Modifiye)' },
            { id: 'push_dose', label: 'Push-Dose Köprü (IV)' },
            { id: 'nebulized', label: 'Stridor / Krup (Nebül)' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveScenario(tab.id as EmergencyScenarioId)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeScenario === tab.id
                  ? isDark
                    ? 'bg-slate-900 text-amber-400 shadow-xs'
                    : 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Senaryo İçeriği */}
        <div className="mt-5">
          {activeScenario === 'anaphylaxis' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Kılavuzlar: <strong>NAP6 (BJA 2018)</strong> · <strong>Garvey et al. 2019</strong> ·{' '}
                  <strong>WAO 2020</strong>
                </div>
                <div
                  className={`inline-flex p-0.5 rounded-lg border text-xs font-semibold ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setAnaphylaxisRoute('iv')}
                    className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                      anaphylaxisRoute === 'iv'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Ameliyathane / Damar Yolu + Monitör (IV)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnaphylaxisRoute('im')}
                    className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                      anaphylaxisRoute === 'im'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Damar Yolu Yok / İlk Basamak (IM)
                  </button>
                </div>
              </div>

              {anaphylaxisRoute === 'iv' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block">
                      Evre II – III (Hipotansiyon / Bronkospazm)
                    </span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white block mt-1">
                      20 – 50 mcg IV
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      <strong>10 mcg/mL</strong> (1:100.000) çözeltisinden <strong>2 – 5 mL</strong> yavaş IV bolus
                      (veya 1:10.000'den 0.2–0.5 mL). Her 1–2 dakikada yanıta göre tekrarlanır.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 block">
                      Evre III – IV (Ağır Şok / Kollaps)
                    </span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400 block mt-1">
                      100 – 200 mcg IV
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      <strong>1:10.000 (100 mcg/mL)</strong> çözeltiden <strong>1 – 2 mL</strong> IV titrasyon. Nabız
                      alınamıyorsa (Evre IV) hemen KPR + <strong>1 mg IV</strong> ACLS protokolüne geçilir.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 block">
                      Refrakter Anafilakside İnfüzyon
                    </span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-teal-700 dark:text-teal-400 block mt-1">
                      0.05 – 0.1 mcg/kg/dk
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      2–3 IV bolusa rağmen hipotansiyon sürüyorsa hızlı sıvı (20–30 mL/kg SF) eşliğinde infüzyona geçin;
                      β-bloker alan hastada yanıtsızlıkta <strong>Glukagon 1–5 mg IV</strong> ekleyin.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 block">
                      {weightKg} kg İçin Hesaplanan İntramüsküler Doz
                    </span>
                    <div className="text-2xl font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400 mt-1">
                      {anaphImDoseMg.toFixed(2)} mg IM
                      <span className="text-xs font-mono text-slate-500 ml-2">
                        ({anaphImVol1to1k} mL [1:1.000])
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      <strong>Uygulama Yeri:</strong> Orta-dış uyluk (<strong>M. vastus lateralis</strong>) derin IM.
                      Subkutan veya deltoid enjeksiyona göre plazma pikine 4 kat daha hızlı ulaşır. Yanıt yetersizse
                      5–15 dakikada bir tekrarlanır.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                      Eş Zamanlı Kritik Ek Önlemler
                    </span>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside mt-1.5 leading-relaxed">
                      <li>Şüpheli tetikleyiciyi (antibiyotik, roküronyum, lateks, klorheksidin) derhal durdurun.</li>
                      <li><strong>Trendelenburg / sırtüstü bacak elevasyonu</strong> yapın (ani ayağa kaldırmayın).</li>
                      <li>Antihistaminikler ve kortikosteroidler <strong>ikincildir</strong>; asla adrenalini geciktirmeyin.</li>
                      <li>Seri <strong>Serum Triptaz</strong>: 1. saat, 2–4. saat ve &gt;24. saat bazal örnek alın.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeScenario === 'acls' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 block">
                  Erişkin Arrest (AHA ACLS / ERC ALS)
                </span>
                <span className="text-2xl font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400 block mt-1">
                  1 mg IV / IO
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  Her <strong>3 – 5 dakikada</strong> bir (1 mL 1:1.000 veya 10 mL 1:10.000) + 20 mL SF flush ve kol
                  elevasyonu. <strong>Şoklanamaz ritimde (PEA/Asistoli)</strong> en kısa sürede;{' '}
                  <strong>VF/pVT'de</strong> 2. defibrilasyon sonrası başlanır.
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-cyan-700 dark:text-cyan-400 block">
                  Pediatrik Arrest Hesabı ({weightKg} kg — PALS)
                </span>
                <span className="text-2xl font-bold font-mono tabular-nums text-cyan-700 dark:text-cyan-400 block mt-1">
                  {aclsPedsDoseMg.toFixed(2)} mg IV/IO
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 block">
                  = {aclsPedsVol1to10k} mL [1:10.000 çözeltiden]
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  <strong>0.01 mg/kg (10 mcg/kg)</strong> her 3–5 dakikada bir (tek doz tavanı 1 mg). Endotrakeal
                  (IV/IO yoksa): <strong>0.1 mg/kg</strong> (1:1.000'den 0.1 mL/kg).
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block">
                  Kanıt &amp; Perioperatif Not (PARAMEDIC2)
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  PARAMEDIC2 RKÇ (NEJM 2018) adrenalinin ROSC ve 30 günlük sağkalımı artırdığını göstermiştir.
                  Ameliyathanede <strong>invaziv arter diyastolik basıncını &gt; 25–30 mmHg</strong> ve{' '}
                  <strong>EtCO₂ &gt; 10–20 mmHg</strong> tutacak KPR kalitesi esastır; geri döndürülebilir 5H/5T
                  nedenlerini eş zamanlı düzeltin.
                </p>
              </div>
            </div>
          )}

          {activeScenario === 'last' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-950/25 border-rose-900/50' : 'bg-rose-50/70 border-rose-200'}`}>
                <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 block">
                  ASRA 2020 LAST Modifiye ACLS ({weightKg} kg İçin Tavan)
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-rose-700 dark:text-rose-300 mt-1">
                  ≤ {lastMaxBolusMcg} mcg IV
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 ml-2">
                    ({lastBolusVol10McgMl} mL [10 mcg/mL])
                  </span>
                </div>
                <p className="text-rose-900 dark:text-rose-200 mt-2 leading-relaxed">
                  <strong>HAYAT KURTARAN KURAL:</strong> Bupivakain/ropivakain/lidokain toksisitesine bağlı arrestte
                  standart <strong>1 mg Adrenalin VERİLMEZ!</strong> Yüksek doz adrenalin şiddetli pulmoner ödem,
                  refrakter VF tetikler ve <strong>%20 İntralipid</strong> resüsitasyonunun etkinliğini bozar.
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 block">
                  Eş Zamanlı %20 İntralipid Kurtarma Dozu ({weightKg} kg)
                </span>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside mt-2 leading-relaxed font-mono tabular-nums">
                  <li>
                    <strong>Bolus (1 dk IV):</strong> {Math.min(100, Math.round(weightKg * 1.5))} mL %20 İntralipid
                    <span className="font-sans"> (1.5 mL/kg; ≥70 kg için 100 mL)</span>
                  </li>
                  <li>
                    <strong>İnfüzyon:</strong> {Math.round(weightKg * 15)} mL/saat
                    <span className="font-sans"> (0.25 mL/kg/dk; ≥70 kg için 1000 mL/saat hızında)</span>
                  </li>
                </ul>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  Vazopressin, kalsiyum kanal blokerleri, β-blokerler ve lokal anesteziklerden (lidokain dahil) kaçının!
                </p>
              </div>
            </div>
          )}

          {activeScenario === 'push_dose' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-amber-700 dark:text-amber-400 block mb-2">
                    10 mcg/mL Push-Dose Hazırlama (Standart Ameliyathane Metodu)
                  </span>
                  <ol className="space-y-1.5 text-slate-600 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                    <li>
                      <strong>Yöntem 1 (100 mL Torba):</strong> 100 mL %0.9 SF torbasına <strong>1 mg (1 mL)</strong>{' '}
                      Adrenalin ekleyin → <strong>10 mcg/mL</strong>. Bu torbadan 10 mL enjektöre çekin ve etiketleyin.
                    </li>
                    <li>
                      <strong>Yöntem 2 (Çift Seyreltme):</strong> 1 mL Adrenalin (1 mg) + 9 mL SF = 100 mcg/mL (1:10.000);
                      bundan <strong>1 mL</strong> alıp <strong>9 mL SF</strong> içine çekin → <strong>10 mcg/mL</strong>.
                    </li>
                  </ol>
                </div>

                <div className={`p-4 rounded-xl border flex flex-col justify-between ${isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
                      Hedef Bolus Dozunu Seçin (10 mcg/mL Enjektörden):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[5, 10, 15, 20].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPushDoseBolusMcg(val)}
                          className={`px-3 py-1.5 text-xs font-mono tabular-nums rounded-lg border cursor-pointer transition-colors ${
                            pushDoseBolusMcg === val
                              ? 'bg-amber-600 text-white border-amber-600 font-bold'
                              : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300'
                              : 'bg-white border-slate-300 text-slate-700'
                          }`}
                        >
                          {val} mcg
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Enjektörden Verilecek Hacim:</span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                      {pushDoseVol10McgMl.toFixed(1)} mL IV
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Klinik İpucu:</strong> Push-dose Epinefrin özellikle <strong>hipotansiyon + bradikardi</strong>{' '}
                birlikteliğinde (ör. yüksek spinal blok, vagal refleks) hem kalp hızını hem basıncı aynı anda toplar; taşikardik
                hipotansiyonda ise Push-dose Noradrenalin veya Fenilefrin tercih edilir.
              </p>
            </div>
          )}

          {activeScenario === 'nebulized' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-cyan-700 dark:text-cyan-400 block">
                  Post-Ekstübasyon Stridor / Krup / Laringeal Ödem ({weightKg} kg)
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-cyan-700 dark:text-cyan-400 mt-1">
                  {nebulizedLepiMl.toFixed(1)} mg ({nebulizedLepiMl.toFixed(1)} mL)
                </div>
                <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Rasemik epinefrin yoksa standart <strong>L-Epinefrin (1:1.000 = 1 mg/mL)</strong>{' '}
                  <strong>0.5 mL/kg</strong> (maksimum <strong>5 mL = 5 mg</strong>) dozunda SF ile toplam 5 mL'ye
                  tamamlanarak 6–8 L/dk O₂ ile nebülize edilir.
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block">
                  Rebound Ödem &amp; Gözlem Kuralı
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Lokal α₁ vazokonstriksiyonu ile 10–30 dakikada mukozal ödemi azaltır; ancak etkisi 2 saat içinde geçip{' '}
                  <strong>rebound stridor</strong> gelişebilir. Mutlaka sistemik <strong>Deksametazon (0.15–0.6 mg/kg IV)</strong>{' '}
                  eklenmeli ve hasta en az <strong>2–4 saat</strong> derlenme/gözlemde tutulmalıdır.
                </p>
              </div>
            </div>
          )}
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. LOKAL ANESTEZİK KATKISI & TEST DOZU REHBERİ                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-rejyonel"
        title="Rejyonel Anestezi: Lokal Anestezik Katkısı & Epidural Test Dozu"
        icon={<BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        defaultOpen={false}
        containerClassName={isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}
        bodyClassName="p-5 sm:p-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-mono tabular-nums font-bold text-teal-700 dark:text-teal-400 text-sm block">
              1:200.000 = 5 mcg/mL
            </span>
            <span className="block font-semibold text-slate-900 dark:text-white mt-1">
              Sinir Blokları &amp; Epidural Test Dozu
            </span>
            <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              <strong>Hazırlama:</strong> 20 mL LA içine <strong>0.1 mL (100 mcg)</strong> 1:1.000 Adrenalin. Sistemik
              emilimi yavaşlatır, blok süresini uzatır ve maksimum güvenli LA dozunu artırır. Epidural test dozu (3 mL ={' '}
              <strong>15 mcg Adrenalin</strong>): İntravasküler yerleşimde 60 sn içinde KTA ≥ +10 atım/dk veya SKB ≥
              +15 mmHg artış yapar.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-mono tabular-nums font-bold text-amber-700 dark:text-amber-400 text-sm block">
              1:100.000 = 10 mcg/mL
            </span>
            <span className="block font-semibold text-slate-900 dark:text-white mt-1">
              Lokal İnfiltrasyon &amp; Hemostaz (Jetokain)
            </span>
            <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              KBB, plastik cerrahi ve dental infiltrasyonda cerrahi kanamayı azaltmak için kullanılır. Sağlıklı
              erişkinde maksimum total adrenalin sınırı <strong>200 mcg</strong> (20 mL 1:100.000); ciddi koroner
              arter hastalığı veya kontrolsüz hipertansiyonda <strong>≤ 40 mcg</strong> (≤ 4 mL) önerilir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/70 border-rose-200'}`}>
            <span className="font-mono tabular-nums font-bold text-rose-700 dark:text-rose-400 text-sm block">
              End-Arteriyel &amp; Beta-Bloker Uyarısı
            </span>
            <span className="block font-semibold text-rose-800 dark:text-rose-300 mt-1">
              Kullanılmaması Gereken Durumlar
            </span>
            <p className="text-rose-900 dark:text-rose-200 mt-1.5 leading-relaxed">
              Penis bloğu, periferik vasküler hastalıklı/Raynaud parmak-ayak ucu, kulak kepçesi ve burun ucu infiltrasyonlarında
              iskemik nekroz riski nedeniyle adrenalin katkısından kaçınılmalıdır. Ayrıca non-selektif β-bloker (ör.
              propranolol) alanlarda yüksek doz emilim hipertansif krize yol açabilir.
            </p>
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Adrenalin 0.25 mg / 1 mL Ampul (Biofarma / Galen / Osel)',
            presentation: '1 mL steril cam ampul (düşük konsantrasyon; sıklıkla pediatri/düşük doz stok)',
            concentration: '0.25 mg/mL (250 mcg/mL · 1:4.000)',
            saltOrBaseNote: 'DİKKAT: 1 mL hacmindedir — 1 mg/1 mL ampul ile dış görünüşü benzer olabilir; ACLS/anafilakside 4 kat eksik doz hatasına yol açar!',
            alertLevel: 'high',
          },
          {
            name: 'Adrenalin 0.5 mg / 1 mL Ampul (TR Ruhsatlı)',
            presentation: '1 mL steril cam ampul (erişkin IM anafilaksi tek dozuna eşdeğer)',
            concentration: '0.5 mg/mL (500 mcg/mL · 1:2.000)',
            saltOrBaseNote: '1 mL hacmindedir; 1 mg/mL ampul ile karıştırılırsa 2 kat eksik veya fazla doz hatası oluşur.',
            alertLevel: 'high',
          },
          {
            name: 'Adrenalin 1 mg / 1 mL Ampul (1:1.000 — Standart Konsantre)',
            presentation: '1 mL steril cam ampul (ACLS 1 mg IV, anafilaksi 0.5 mL IM, nebülizasyon ve infüzyon hazırlama)',
            concentration: '1 mg/mL (1.000 mcg/mL · 1:1.000)',
            saltOrBaseNote: 'Epinefrin baz (tartrat/HCl tuzu) 1 mg/mL eşdeğeridir. Anafilakside veya hipotansiyonda ASLA sulandırılmadan IV puşe edilmez!',
            alertLevel: 'high',
          },
          {
            name: 'Klinik Seyreltme Stokları: 1:10.000 & Push-Dose 1:100.000',
            presentation: '10 mL veya 100 mL enjektör/torba içinde yatak başı hazırlanır',
            concentration: '100 mcg/mL (1:10.000) · 10 mcg/mL (1:100.000)',
            saltOrBaseNote: '1:10.000 = 1 mg + 9 mL SF (PALS arrest & ağır IV anafilaksi); 1:100.000 = 1 mg / 100 mL SF (ameliyathane IV anafilaksi & push-dose köprü).',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          '1:10.000 (100 mcg/mL): 1 ampul (1 mg/1 mL) + 9 mL %0.9 SF = 10 mL (Pediatrik PALS arrest 0.1 mL/kg; ağır Evre III–IV IV anafilaksi 1–2 mL).',
          'Push-Dose / 1:100.000 (10 mcg/mL): 1 ampul (1 mg/1 mL) + 99 mL SF (= 100 mL torba) veya 1:10.000’den 1 mL + 9 mL SF (ameliyathane Evre II–III IV anafilaksi & LAST modifiye bolus).',
          'Standart YBÜ İnfüzyonu (80 mcg/mL): 4 ampul (4 mg / 4 mL) + 46 mL D5W veya SF = 50 mL enjektör.',
          'Düşük Doz Titrasyon (40 mcg/mL) / Ondalık (100 mcg/mL): 2 mg / 50 mL veya 5 mg / 50 mL enjektör.',
          'Torba / Geçici Periferik İnfüzyon: 4 mg / 250 mL (16 mcg/mL) veya 1 mg / 100 mL (10 mcg/mL).',
        ]}
        concentrationTrapWarning="Adrenalin kaynaklı iyatrojenik mortalitenin 1 numaralı nedeni, 1:1.000 (1 mg/mL) ampulün seyreltilmeden 1:10.000 veya Push-Dose yerine doğrudan IV puşe edilmesidir (10×–100× doz aşımı → VF, akut pulmoner ödem, intrakraniyal kanama). Ayrıca Türkiye'deki 0.25, 0.5 ve 1 mg ampullerin HEPSİ 1 mL'dir — kırmadan önce mutlaka mg değerini okuyun!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="central-preferred"
        accessSummary="Sürekli infüzyonlarda ayrı lümenden Santral Venöz Kateter (SVK) esastır. Acil durumlarda SVK beklenirken antekübital veya proksimal önkol geniş periferik venlerinden (≥20G; el sırtı/ayak yasak) düşük konsantrasyon (10–16 mcg/mL) geçici olarak başlanabilir. Kardiyak arrestte periferik IV/IO bolus sonrası mutlaka 20 mL SF flush ve kol elevasyonu uygulanır."
        phRange="2.2 – 5.0 (Asidik · Işık ve O₂ ile Hızla Oksitlenir)"
        osmolalityNote="Güçlü α₁ vazokonstriktör/vezikan: Periferik doku ekstravazasyonunda ciddi lokal iskemi ve cilt nekrozu gelişir."
        compatibleDiluents={[
          '%5 Dekstroz (D5W) — Tercih edilen taşıyıcı (oksidasyonu yavaşlatır)',
          '%5 Dekstroz + %0.9 NaCl (D5NS) — 24 saat stabil',
          '%0.9 Sodyum Klorür (SF) — Acil ve sürekli infüzyonda yaygın, ≤24 saat',
        ]}
        stabilityNote="Işık ve hava temasıyla hızla oksitlenip pembe veya kahverengi ADRENOKROMA dönüşür; renklenmiş veya partiküllü çözelti derhal imha edilir. İnfüzyon en geç 24 saatte bir yenilenmelidir."
        ySiteCompatible={[
          'Norepinefrin',
          'Dobutamin',
          'Vazopressin',
          'Milrinon',
          'Fentanil',
          'Remifentanil',
          'Midazolam',
          'Propofol',
          'Deksmedetomidin',
          'Heparin',
          'Potasyum Klorür',
          'Kalsiyum Klorür / Glukonat',
        ]}
        ySiteIncompatible={[
          'Sodyum Bikarbonat (%8.4 NaHCO₃ — saniyeler içinde alkali inaktivasyon!)',
          'Aminofilin',
          'Furosemid',
          'Tiyopental',
          'Amfoterisin B',
          'Pantoprazol / Alkali çözeltiler',
        ]}
        extravasationProtocol="Ekstravazasyon geliştiğinde 12 SAAT İÇİNDE müdahale edin: (1) İnfüzyonu hemen kapatın, kanülü çekmeden enjektörle dokudaki/kanüldeki ilacı aspire edin. (2) Antidot: 5–10 mg Fentolamin'i 10–15 mL SF içinde seyreltip 25–27G ince iğneyle soluk/soğuk alan çevresine çoklu noktadan SC infiltre edin (hiperemi sağlanana dek). (3) Fentolamin yoksa: Terbutalin 1 mg / 10 mL SF SC infiltrasyon veya topikal %2 Nitrogliserin pomad. (4) Ekstremiteyi eleve edin ve kuru ILIK kompres uygulayın — SOĞUK / BUZ ASLA KULLANMAYIN!"
      />

      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Organ-bağımsız klirens: Böbrek yetmezliğinde veya diyaliz hastalarında doz azaltımı gerekmez."
        renalDetails={[
          'Epinefrin COMT ve MAO enzimleriyle dokularda hızla inaktif metanefrin ve VMA metabolitlerine yıkılır.',
          'İnfüzyon sırasında hipokalemi (β₂ ile hücre içine K⁺ kayması) böbrek yetmezliği olan hastada aritmi eşiğini hızla değiştirebilir; kan gazında K⁺ izlenmelidir.',
        ]}
        hepaticSummary="Karaciğer yetmezliğinde (Child-Pugh A/B/C) başlangıç doz revizyonu gerekmez; metabolizma ekstrahepatik COMT/MAO ile sürer."
        hepaticDetails={[
          'Karaciğer hastalığında β₂ aracılı glikojenoliz ve laktat klirensi yavaşladığından Tip-B laktat artışı daha belirgin ve uzun sürebilir.',
          'Hedef MAP ve kardiyak debi yanıtına göre klinik titre edilir.',
        ]}
        {...STANDALONE_ORGAN_PART1['epinephrine']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="İnfüzyonda Düşük Başlangıç · Aritmi/İskemi Takibi"
        geriatricPoints={[
          'Kardiyak arrest (1 mg IV) ve anafilaksi (0.5 mg IM) acillerinde yaşa göre doz düşürülmez — hayat kurtarıcı standart doz uygulanır.',
          '>65 yaş hastalarda koroner arter hastalığı, sol ventrikül hipertrofisi ve atrial fibrilasyon yatkınlığı yüksektir; ameliyathanede IV anafilaksi titrasyonu ve sürekli infüzyonda en düşük etkin doz (ör. 10–20 mcg IV bolus veya 0.01–0.02 mcg/kg/dk başlangıç) ile yavaş titre edilmelidir.',
          'Lokal anestezik katkılı infiltrasyonlarda (KBB/dental) ciddi KAH/hipertansif yaşlılarda total epinefrin ≤ 40 mcg ile sınırlandırılmalıdır.',
        ]}
        obesityWeightScalarBadge="Resüsitasyon: Sabit Doz · İnfüzyon: AdjBW / IBW"
        obesityPoints={[
          'Kardiyak arrest (ACLS 1 mg IV/IO) ve erişkin anafilaksi (0.5 mg IM) dozları vücut ağırlığına göre artırılmaz — sabit doz uygulanır (AHA ACLS / WAO). Ancak obez uylukta IM enjeksiyon için daha uzun iğne (≥38 mm) gerekebilir.',
          'Sürekli IV infüzyonda (mcg/kg/dk) epinefrin hidrofilik olduğundan dağılım hacmi yağ dokusuna orantılı artmaz; BMI ≥ 30–40 kg/m² hastalarda TBW yerine AdjBW veya IBW (ya da mcg/dk sabit skala) kullanılması taşiaritmi, miyokard iskemisi ve şiddetli Tip-B laktik asidoz riskini azaltır (SOBA / Miller’s).',
          'LAST modifiye ACLS bolusunda ≤ 1 mcg/kg hesabı tavan 100 mcg ile sınırlıdır.',
        ]}
      />

      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="FDA Gebelik Kategorisi C · Gebelikte anafilaksi ve kardiyak arrestte İLK VE MUTLAK TERCİH adrenalin verilmesidir."
        pregnancyDetails={[
          'Maternal hipotansiyon ve hipoksi fetüste anında fatal bradikardi yapar; gebede anafilakside 0.5 mg IM adrenalin geciktirilmemelidir.',
          'Yüksek doz sürekli infüzyon uterin arter α₁ vazokonstriksiyonu ile plasental akımı azaltabileceğinden maternal stabilize olur olmaz en düşük etkin doza titre edilmelidir.',
        ]}
        lactationSummary="Plazma yarı ömrü 1–2 dakika, oral biyoyararlanımı ~0% olduğu için emzirmeye güvenle devam edilebilir."
        lactationDetails={[
          'Oral alımda GI mukozada hızla yıkıldığı için anne sütüyle infantta sistemik etki oluşturmaz.',
          'Anne acil müdahale sonrası stabil hale geldiğinde sütün dökülmesi ("pump & dump") gerekmez.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ÖNEMLİ OLUMSUZ ETKİLER (ADVERSE EFFECTS · v4.0)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Tip-B Laktat Artışı (Yalancı Hipoperfüzyon)',
            incidenceOrSeverity: 'Çok Sık · β₂ Aracılı',
            tone: 'amber',
            detail:
              'β₂ stimülasyonu ile kas/karaciğerde aerobik glikoliz hızlanır ve laktat 2–5 mmol/L yükselebilir. Her zaman doku hipoksisi değildir; ScvO₂, kapiller dolum ve idrar çıkışı ile birlikte yorumlanmalıdır.',
          },
          {
            title: 'Hipokalemi & Hiperglisemi',
            incidenceOrSeverity: 'Sık · Metabolik',
            tone: 'indigo',
            detail:
              'β₂ aracılı Na⁺/K⁺-ATPaz aktivasyonu potasyumu hızla hücre içine kaydırarak hipokalemi oluşturur ve aritmi eşiğini düşürür. Glikojenoliz + insülin baskılanmasıyla kan şekeri yükselir.',
          },
          {
            title: 'Taşiaritmi & Miyokard İskemisi',
            incidenceOrSeverity: 'Doz Bağımlı · Yüksek Risk',
            tone: 'rose',
            detail:
              'Sinüs taşikardisi, ventriküler ektopi, AF, VT/VF tetikleyebilir. Kalp hızı ve kontraktilite artışı MVO₂’yi belirgin yükselterek KAH hastalarında iskemiyi provoke edebilir.',
          },
          {
            title: 'Asidozda Direnç & Ekstravazasyon Nekrozu',
            incidenceOrSeverity: 'pH < 7.15 / Periferik',
            tone: 'rose',
            detail:
              'Şiddetli asidemide (pH < 7.15) adrenerjik reseptör afinitesi düşer; yüksek dozda splanknik/renal vazokonstriksiyon ve periferik sızıntıda lokal cilt nekrozu gelişebilir.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR (v4.0)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Septik Şokta Neden 1. Basamak Noradrenalin, 2. Basamak Adrenalin?',
            detail:
              'CATS RKÇ (Annane et al., Lancet 2007) mortalitede benzer sonuç verse de adrenalin kolunda geçici laktik asidoz, taşiaritmi ve insülin direnci belirgin yüksek bulunmuştur. SSC 2021 kılavuzu özellikle düşük kardiyak debinin eşlik ettiği septik şokta adrenalini 2. veya 3. basamak ek ajan olarak önerir.',
          },
          {
            title: 'Anafilakside Tek Mutlak Birinci Tercih: Adrenalin',
            detail:
              'Noradrenalin sadece α₁ ile vazokonstriksiyon yapar; oysa anafilakside mast hücre/bazofil medyatör salınımını (β₂ → cAMP↑) durduran, bronkospazmı ve laringeal ödemi çözen tek ajan Adrenalindir. Gecikmiş adrenalin anafilaksi ölümlerinin bir numaralı nedenidir.',
          },
          {
            title: 'Kardiyak Cerrahi & Post-KPB Düşük Debi Sendromu',
            detail:
              'Kardiyopulmoner baypas (KPB) çıkışında düşük doz adrenalin (0.02–0.08 mcg/kg/dk), hem sağ/sol ventrikül kontraktilitesini artırır hem de hafif vazotonus sağlar. Aşırı taşikardi gelişirse Milrinon + Noradrenalin kombinasyonuna geçilir.',
          },
          {
            title: 'İnfüzyon Sırasında Elektrolit (K⁺) & Asit-Baz Takibi',
            detail:
              'Sürekli infüzyon başlanan hastalarda kan gazında K⁺ düşüşü (hipokalemi) ve glukoz yüksekliği sık görülür; K⁺ takibi yapılmadan β-agonist yüklemesi malign ventriküler aritmi eşiğini tehlikeli biçimde düşürür.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (Pan-Adrenerjik GPCR Spektrumu: β₂ ≥ β₁ > α₁ / α₂)',
          summary:
            'Adrenalin (L-(−)-epinefrin), adrenal medulla kromaffin hücrelerinde feniletanolamin N-metiltransferaz (PNMT) enzimiyle noradrenaline bir N-metil grubu eklenmesiyle sentezlenen endojen nörohormondur. Bu N-metil grubu sayesinde hedef hücre zarlarındaki tüm 7-transmembran (7-TM) adrenerjik GPCR alt tiplerine konsantrasyon-bağımlı afinite hiyerarşisiyle (β₂ [Kd ~0,1–0,3 µM] ≥ β₁ [Kd ~0,3–0,8 µM] > α₁A/B/D & α₂A/B/C [Kd ~1–5 µM]) bağlanan en güçlü non-selektif pan-adrenerjik agonisttir (Miller’s 10th Ed. / Stoelting’s 6th Ed. / Goodman & Gilman).',
          points: [
            'Bronşiyal Düz Kas, Mast Hücresi, İskelet Kası & Hepatosit Zarı (β₂-Adrenoseptör — En Yüksek Afinite): Düşük plazma konsantrasyonlarında (0,01–0,05 mcg/kg/dk) trakeobronşiyal düz kas sarkolemması, doku mast hücreleri/bazofil plazma zarı, iskelet kası yatağı rezistans arteriyolleri, iskelet kası sarkolemması ve hepatosit membranındaki β₂ reseptörlerine yüksek afiniteyle bağlanarak stimülatör Gαs proteinini kenetler.',
            'Kardiyomiyosit, SA/AV Düğüm & Purkinje Lifleri Sarkolemması (β₁-Adrenoseptör): Sinoatriyal (SA) ve atriyoventriküler (AV) düğüm pacemaker hücreleri, His-Purkinje ileti sistemi ve ventriküler/atriyal kardiyomiyosit sarkolemmasındaki β₁ reseptörlerine (ve ikincil olarak kardiyak β₂ reseptörlerine) bağlanarak Gαs alt birimini aktive eder.',
            'Sistemik Arteriyoler, Venöz & Mukozal Düz Kas Sarkolemması (α₁A/B/D-Adrenoseptörler — Yüksek Kapasite): Orta (0,05–0,15 mcg/kg/dk) ve yüksek (>0,15 mcg/kg/dk veya 1 mg ACLS bolusu) konsantrasyonlarda kutanöz, mukozal, renal, splanknik arteriyoller ve sistemik kapasitans venlerinin sarkolemmasındaki yüksek kapasiteli α₁ reseptörlerini doyurarak Gαq/11 proteinini aktive eder ve periferik β₂ vazodilatasyonunu tamamen baskılar.',
            'Pankreas Adacık β-Hücresi, Trombosit & Presinaptik Nöron Zarı (α₂A/B/C-Adrenoseptörler): Pankreas Langerhans adacığı β-hücresi zarındaki α₂A reseptörlerine (Gαi/o) bağlanarak insülin sekresyonunu baskılar; postsinaptik vasküler α₂B reseptörleriyle vazokonstriksiyonu destekler ve trombosit zarındaki α₂A reseptörleriyle agregasyonu kolaylaştırır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'Adrenalinin hücre zarındaki β₁/β₂ (Gαs), α₁ (Gαq/11) ve α₂ (Gαi/o) reseptörlerini uyarması; kalp, damar düz kası, hava yolu, mast hücresi ve iskelet kası/karaciğerde dört temel hücre içi biyokimyasal kaskadı tetikler:',
          points: [
            'Kardiyomiyosit & SA Düğüm Hücresi İçi (β₁/β₂ → Gαs → AC V/VI → cAMP↑ → PKA → Cav1.2, RyR2, PLB & HCN4): Yükselen cAMP ve PKA; (1) T-tübül L-tipi Ca²⁺ kanallarını (Cav1.2) fosforilleyerek Faz 2 Ca²⁺ girişini (ICa,L) artırır, (2) SR üzerindeki Riyanodin Reseptörü-2’yi (RyR2) fosforilleyerek sistolik Ca²⁺ deşarjını (CICR) ve aktin-miyozin çapraz köprü gücünü (pozitif inotropi) büyütür, (3) Fosfolamban (PLB) fosforilasyonuyla SERCA2a üzerinden diyastolik SR Ca²⁺ geri alımını hızlandırır (pozitif lusitropi), (4) SA düğümde cAMP doğrudan HCN4 (If pacemaker) kanallarını açarak Faz 4 diyastolik depolarizasyon eğimini dikleştirir (pozitif kronotropi) ve AV düğümde ICa,L artışıyla iletimi hızlandırır (pozitif dromotropi).',
            'Bronşiyal/Vasküler Düz Kas & Mast Hücresi İçi (β₂ → Gαs → cAMP↑ → PKA/Epac → MLCK İnhibisyonu & Degranülasyon Arresti): Bronş ve iskelet kası arteriyol düz kasında PKA, Miyozin Hafif Zincir Kinazı (MLCK) fosforilleyerek Ca²⁺-Kalmodulin afinitesini düşürür, MLCP’yi aktive eder ve sarkolemmal BKCa (Ca²⁺-bağımlı K⁺) kanallarını açıp membranı hiperpolarize ederek hızlı gevşeme (bronkodilatasyon/vazodilatasyon) sağlar. Mast hücresi ve bazofil içinde ise cAMP/PKA artışı, IgE-FcεRI çapraz bağlanmasının tetiklediği PLCγ/Ca²⁺ akışını ve SNARE-bağımlı granül ekzositozunu bloke ederek histamin, triptaz, lökotrien-C₄ ve PGD₂ salınımını hücresel düzeyde durdurur.',
            'Vasküler Düz Kas Hücresi İçi Yüksek Doz Kaskadı (α₁ → Gαq/11 → PLC-β → IP₃/DAG → SR IP₃R Ca²⁺ & RhoA/ROCK): PLC-β membran PIP₂’sini IP₃ ve DAG’a ayırır. IP₃ sarkoplazmik retikulum IP₃R kanallarından sitozole Ca²⁺ boşaltır → Ca²⁺-Kalmodulin → MLCK aktivasyonu → MLC₂₀ fosforilasyonu (fazik vazokonstriksiyon); eşzamanlı DAG/PKC/CPI-17 ve RhoA/Rho-Kinaz (ROCK) yolağı Miyozin Fosfatazı (MLCP) inhibe ederek Ca²⁺ duyarlılaşması ve güçlü tonik kasılma üretir.',
            'İskelet Kası & Hepatosit İçi Metabolik Kaskad (β₂ → cAMP/PKA → Glikojen Fosforilaz Kinaz & Na⁺/K⁺-ATPaz → Tip-B Laktat & K⁺ Şifti): İskelet kası ve karaciğerde PKA, Glikojen Fosforilaz Kinazı fosforilleyerek Glikojen Fosforilaz-b’yi aktif "a" formuna çevirir (hızlı glikojenoliz). Eşzamanlı olarak sarkolemmal 3Na⁺/2K⁺-ATPaz pompasının PKA aracılı aşırı aktivasyonu, bir yandan ekstraselüler K⁺ iyonlarını hızla hücre içine çekerek hipokalemi yaparken, diğer yandan ürettiği ADP ile fosfofruktokinaz-1 (PFK-1) üzerinden aerobik glikolizi aşırı hızlandırır → mitokondriyal pirüvat dehidrogenaz (PDH) kapasitesini aşan pirüvat, Laktat Dehidrogenaz (LDH) ile doku hipoksisi olmaksızın L-laktata dönüşür (Tip-B hiperlaktatemi).',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Miyokard Dokusu, İleti Sistemi & Koroner Yatak → Kalp & Resüsitasyon Fizyolojisi',
            tissueTarget: 'Ventrikül Miyokardı · SA/AV/Purkinje · Aort Kökü & Koronerler',
            accent: 'rose',
            points: [
              'Güçlü İnotropi, Kronotropi & Kardiyak Debi (CO): Tüm doz aralıklarında atım hacmini (SV), dP/dt(max)’ı ve kalp hızını artırarak kardiyak indeks (CI) artışında en potent katekolamindir; ancak hücre içi Ca²⁺ yükü ve taşikardi nedeniyle miyokard oksijen tüketimini (MVO₂) dramatik artırır.',
              'Kardiyak Arrestte (ACLS) Koroner Perfüzyon Basıncı (CPP = AoDBP − RAP): Arrest sırasında kalp masajı yapılırken 1 mg IV adrenalin bolusu, periferik vasküler yatakta güçlü α₁ kasılmasıyla kanı santral kompartmana yönlendirir ve aort diyastolik basıncını (AoDBP > 25–30 mmHg) yükselterek ROSC (spontan dolaşımın geri dönüşü) için şart olan miyokardiyal koroner kan akımını sağlar (PARAMEDIC2).',
              'Batmotropi & Aritmojenite: Purkinje liflerinde Faz 4 spontan depolarizasyonu hızlandırır, aksiyon potansiyeli süresini kısaltır ve SR’den diastolik RyR2 Ca²⁺ sızıntısıyla gecikmiş ard-depolarizasyonlar (DAD) üreterek sinüs taşikardisi, AF, multifokal VEA, VT ve VF eşiğini düşürür.',
            ],
          },
          {
            systemTitle: 'Sistemik Arteriyoler, İskelet Kası & Splanknik Vasküler Doku → Bifazik Dolaşım',
            tissueTarget: 'İskelet Kası Arteriyolü (β₂) · Kutanöz/Mezenterik/Renal Yatak (α₁)',
            accent: 'amber',
            points: [
              'Doz-Bağımlı Bifazik SVR & Nabız Basıncı Yanıtı: Düşük dozda (0,01–0,05 mcg/kg/dk) iskelet kası arteriyollerindeki yüksek afiniteli β₂ vazodilatasyon baskın olduğundan diyastolik kan basıncı (DBP) ve SVR hafif düşer, sistolik basınç (β₁ SV↑) yükselir ve nabız basıncı genişler; >0,10–0,15 mcg/kg/dk üzerinde ise yaygın α₁ kasılmasıyla hem SBP hem DBP ve MAP keskin yükselir.',
              'Lokal Hemostaz & Lokal Anestezik (LA) Emilim Geciktirmesi (1:200.000 = 5 mcg/mL): Subkutan, mukozal ve epidural/perinöral dokudaki vaza nervorum ve kapiller yatakta α₁ vazokonstriksiyon yaparak cerrahi saha kanamasını azaltır, lokal anesteziklerin sistemik dolaşıma geçiş pikini (Cmax) düşürür ve nöronal blok süresini uzatır.',
              'Splanknik & Renal Mikrodolaşım Redistribüsyonu: Yüksek doz infüzyonda (>0,15–0,20 mcg/kg/dk) mezenterik ve renal arteriyoler α₁ vazokonstriksiyonu kan akımını kalp ve iskelet kasına yönlendirirken bağırsak mukozası perfüzyonunu ve GFR’yi geçici olarak azaltır.',
            ],
          },
          {
            systemTitle: 'Trakeobronşiyal Düz Kas, Laringeal Mukoza & Mast Hücre Dokusu → Solunum & İmmün',
            tissueTarget: 'Bronş Düz Kası (β₂) · Subglottik Mukoza (α₁) · Mast Hücresi',
            accent: 'teal',
            points: [
              'Anafilakside Fizyolojik Antidot Üçlüsü: (1) Mast hücresi ve bazofil β₂-cAMP uyarımıyla medyatör (histamin/triptaz/lökotrien) salınımını kaynağında durdurur, (2) Bronş düz kasında hızlı β₂ gevşemeyle akut bronkospazmı çözer, (3) α₁ vazokonstriksiyonla üst hava yolu mukozal ödemini ve vasküler permeabilite artışını (endotelyal VE-cadherin stabilizasyonu) tersine çevirir.',
              'Subglottik / Laringeal Mukoza & Nebülize Etki: İnhale/nebülize L-epinefrin (0,5 mL/kg 1:1.000, maks 5 mL) post-ekstübasyon stridor ve ağır krupta laringotrakeal mukoza venüllerinde lokal α₁ vazokonstriksiyon yaparak 10–30 dakikada ödemi indirir ve hava yolu çapını genişletir.',
              'Pulmoner Vasküler & Bronşiyal Sekresyon Etkisi: Bronşiyal bez sekresyonlarını azaltır, mukosiliyer klirensi hızlandırır; ancak çok yüksek IV boluslarda (ör. LAST arrestinde 1 mg bolus) sistemik kanın pulmoner yatağa ani şifti ve pulmoner venokonstrüksiyonla nörojenik/hidrostatik pulmoner ödem tetikleyebilir.',
            ],
          },
          {
            systemTitle: 'İskelet Kası, Karaciğer, Pankreas & Serebral Mikrodolaşım → Metabolizma & SSS',
            tissueTarget: 'İskelet Kası Sarkolemması · Hepatosit · Pankreas Adacığı · KBB',
            accent: 'indigo',
            points: [
              'Tip-B Hiperlaktatemi & Glisemik Fırtına (CATS Çalışması Bulgusu): İskelet kasında β₂-aracılı aerobik glikolizle doku hipoperfüzyonu olmadan plazma laktatı 2–6 mmol/L yükselir (4–6 saatte pik yapıp 12–24 saatte spontan geriler). Karaciğerde β₂/α₁ glikojenoliz + glukoneogenez, yağ dokusunda β₃ lipoliz ve pankreas β-hücresinde α₂A aracılı insülin baskılanmasıyla belirgin hiperglisemi gelişir.',
              'Transselüler Potasyum (K⁺) Şifti: İskelet kası sarkolemmasındaki Na⁺/K⁺-ATPaz pompasının β₂ uyarımıyla ekstraselüler K⁺ hızla hücre içine çekilir; serum K⁺ düzeyi 0,5–1,0 mEq/L düşerek ventriküler aritmi eşiğini tehlikeli biçimde azaltır.',
              'Kan-Beyin Bariyeri (KBB) & Serebral Mikrodolaşım: Polar yapısı nedeniyle sağlam KBB’yi geçmez (uyanık hastadaki tremor, çarpıntı ve ölüm korkusu/anksiyete periferik β₂ kas iğciği ve kardiyak aferent uyarım kaynaklıdır). KPR sırasında büyük serebral arter perfüzyon basıncını yükseltir, ancak tekrarlayan yüksek dozlar kortikal kapiller yatakta α₁ mikrovasküler daralma yapabilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, "Epinefrin Reversal", LAST Toksisite Etkileşimi & Asidoz Direnci',
          summary:
            'Adrenalinin pan-adrenerjik doğası; reseptör blokajı, lokal anestezik toksisitesi (LAST) ve ağır asidemi varlığında hemodinamik yanıtın yönünü tamamen değiştiren benzersiz farmakodinamik etkileşimler yaratır.',
          points: [
            'Non-Selektif β-Bloker Varlığında "Karşılanmamış (Unopposed) α₁ Krizi" & Glukagon Baypası: Propranolol/Karvedilol gibi non-selektif β-bloker alan hastada adrenalinin vazodilatör β₂ ve inotropik β₁ reseptörleri bloke olduğundan, tüm moleküller α₁ reseptörlerine yüklenir → şiddetli malign hipertansiyon, aşırı afterload nedeniyle akut sol kalp yetmezliği ve baroreseptör aracılı derin vagal bradikardi/AV blok gelişir. Anafilakside β-bloker direncinde, β₁ reseptörünü tamamen baypas edip kendi GPCR’si üzerinden kardiyak Gαs → AC → cAMP üreten Glukagon (1–5 mg IV) kullanılır.',
            'Fenotiyazin / α₁-Bloker Varlığında "Dale’in Epinefrin Reversal Fenomeni": Klorpromazin, ketiapin, risperidon veya fentolamin/doksazosin gibi güçlü α₁-antagonist etkisi olan ilaçlarla zehirlenmiş hastada adrenalinin α₁ vazokonstriksiyonu bloke olurken β₂ vazodilatasyonu serbest kalır → adrenalin verildiğinde kan basıncı yükselmek yerine paradoksal olarak DAHA DA DÜŞER (bu hastalarda saf α₁/β₁ etkili Noradrenalin veya Vazopressin tercih edilir!).',
            'LAST (Lokal Anestezik Sistemik Toksisitesi) & %20 İntralipid Antagonizması (ASRA 2020): Bupivakain ile bloke olmuş kardiyak Nav1.5 ve mitokondriyal karnitin-açilkarnitin translokaz varlığında standart 1 mg (10–15 mcg/kg) adrenalin; aşırı α₁ afterload artışı, şiddetli pulmoner ödem, refrakter ventriküler fibrilasyon yapar ve lipid emülsiyonunun ("lipid sink/shuttle") bupivakaini miyokarddan temizleme kinetiğini bozar → LAST arrestinde tek doz tavanı ≤ 1 mcg/kg (maks 100 mcg) ile sınırlandırılmıştır.',
            'Ağır Asidemi (pH < 7,15) & GRK/β-Arrestin Desensitizasyonu: Ekstraselüler [H⁺] artışı GPCR bağlanma afinitesini ve adenilat siklaz katalitik hızını %50’den fazla düşürür; uzamış yüksek doz infüzyonda ise GRK2 fosforilasyonu ile β₁/β₂ reseptörleri dakikalar-saatler içinde internalize olur.',
          ],
        }}
        clinicalPearls={[
          'Tip-B Laktat vs Gerçek Hipoperfüzyon (Tip-A) Ayrımı: Adrenalin infüzyonu başlandıktan sonra laktatın 2–5 mmol/L’ye çıkması β₂-Na⁺/K⁺-ATPaz glikolizinin beklenen fizyolojik sonucudur ("yalancı laktat"); eğer MAP ≥ 65 mmHg, ScvO₂ > %70, P(v-a)CO₂ < 6 mmHg, kapiller dolum < 3 sn ve idrar çıkışı iyiyse bu artış şokun kötüleştiğini göstermez.',
          'Anafilakside Neden Noradrenalin Değil, Mutlak Adrenalin? Noradrenalinin β₂ afinitesi ihmal edilebilir düzeydedir; bu yüzden mast hücresi degranülasyonunu (β₂→cAMP↑) durduramaz ve bronkospazmı çözemez. Anafilakside orta-dış uyluk (M. vastus lateralis) derin IM enjeksiyonu, deltoid veya subkutan dokuya göre ~4 kat yüksek ve hızlı (8 dk) pik plazma konsantrasyonu sağlar.',
          'Hipokalemi Aritmi Tuzağı: Sürekli adrenalin infüzyonu K⁺’u iskelet kası içine sürükler; seri kan gazında K⁺ ≥ 4,0 mEq/L ve Mg²⁺ ≥ 2,0 mg/dL tutulmadan doz tırmandırmak malign VT/VF riskini katlar.',
          'Epidural Test Dozu (3 mL 1:200.000 = 15 mcg Adrenalin): İntravasküler kaçışta 20–40 saniye içinde β₁ uyarımıyla KTA ≥ +10–15 atım/dk artış yapar; ancak β-bloker alan, ileri yaşlı veya genel anestezi/yüksek opioid altındaki hastalarda KTA yanıtı köreleceğinden SKB ≥ +15 mmHg artışı veya EKG’de T dalgası amplitüd değişimi izlenmelidir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA (v4.0)   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Adrenalin (Epinefrin)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Sodyum Bikarbonat (%8.4 NaHCO₃) & Alkali IV Çözeltiler (Aynı Lümen)',
            mechanism: 'Alkali pH Kaynaklı Hızlı Oksidatif İnaktivasyon',
            clinicalEffect: 'Adrenalin saniyeler içinde adrenokroma oksitlenip etkinliğini tamamen kaybeder (KPR sırasında kritik başarısızlık).',
            management: 'Asla aynı hattan/Y-porttan vermeyin; KPR’de NaHCO₃ öncesi ve sonrası hattı mutlaka 20 mL SF ile yıkayın.',
          },
          {
            severity: 'D',
            agent: 'Non-Selektif Beta-Blokerler (Propranolol · Karvedilol · Nadolol)',
            mechanism: 'β₁/β₂ Blokajı Altında Karşılanmamış α₁ Vazokonstriksiyon',
            clinicalEffect: 'Şiddetli hipertansif kriz, refleks bradikardi/AV blok; anafilakside standart adrenalin tedavisine direnç.',
            management: 'Lokal infiltrasyonda adrenalinden kaçının; anafilakside adrenalin yanıtı yetersizse Glukagon 1–5 mg IV ekleyin.',
          },
          {
            severity: 'D',
            agent: 'Halojenli İnhalasyon Anestezikleri (Halotan >> İzofluran > Sevofluran)',
            mechanism: 'Miyokardiyal Katekolamin Aritmi Duyarlılaşması',
            clinicalEffect: 'Ventriküler ektopi, bigemini, VT ve VF riski (özellikle KBB mukozal infiltrasyonlarında).',
            management: 'Sevofluran/desfluran altında dahi total infiltrasyon dozunu sınırlandırın (sağlıklı ≤200 mcg, KAH ≤40 mcg) ve normokapniyi koruyun.',
          },
          {
            severity: 'D',
            agent: 'MAOI (Linezolid · Metilen Mavisi) · TCA · Kokain',
            mechanism: 'Nöronal Geri Alım (NET) & MAO Yıkım Blokajı',
            clinicalEffect: 'Abartılı hipertansif yanıt, taşiaritmi ve miyokard iskemisi.',
            management: 'İnfüzyon veya bolus dozlarını en düşük düzeyden başlatıp yakın EKG ve arter basıncı monitörizasyonuyla titre edin.',
          },
          {
            severity: 'C',
            agent: 'K⁺ Düşüren Ajanlar (Loop Diüretikler · İnsülin · Yüksek Doz Salbutamol)',
            mechanism: 'Aditif Hipokalemi (β₂ Na⁺/K⁺-ATPaz Aktivasyonu)',
            clinicalEffect: 'Belirgin hipokalemi ve QT uzaması / ventriküler taşiaritmi riskinde artış.',
            management: 'Sürekli epinefrin infüzyonunda kan gazı ile K⁺ takibi yapın ve K⁺ ≥ 4.0 mEq/L hedefleyin.',
          },
        ]}
        references={[
          {
            authors: 'Panchal AR, Bartos JA, Cabañas JG, et al.',
            title: '2020 AHA Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care: Adult Basic and Advanced Life Support.',
            journal: 'Circulation',
            year: 2020,
            pmid: '33081529',
            doi: '10.1161/CIR.0000000000000916',
            note: 'ACLS arrestte 3–5 dakikada bir 1 mg IV/IO epinefrin protokolü.',
          },
          {
            authors: 'Perkins GD, Ji C, Deakin CD, et al. (PARAMEDIC2)',
            title: 'A Randomized Trial of Epinephrine in Out-of-Hospital Cardiac Arrest.',
            journal: 'N Engl J Med',
            year: 2018,
            pmid: '30021076',
            doi: '10.1056/NEJMoa1806842',
            note: '8.014 hastada ROSC ve 30 günlük sağkalım üzerine epinefrin RKÇ verileri.',
          },
          {
            authors: 'Harper NJN, Cook TM, Garcez T, et al. (NAP6)',
            title: 'Anaesthesia, surgery, and life-threatening allergic reactions: perioperative anaphylaxis in NAP6.',
            journal: 'Br J Anaesth',
            year: 2018,
            pmid: '29935569',
            doi: '10.1016/j.bja.2018.04.015',
            note: 'Perioperatif anafilakside erken IV/IM adrenalin ve sıvı resüsitasyonu standartları.',
          },
          {
            authors: 'Annane D, Vignon P, Renault A, et al. (CATS Study Group)',
            title: 'Norepinephrine plus dobutamine versus epinephrine alone for management of septic shock: a randomised trial.',
            journal: 'Lancet',
            year: 2007,
            pmid: '17720019',
            doi: '10.1016/S0140-6736(07)61344-0',
            note: 'Septik şokta adrenalin kolunda görülen geçici Tip-B laktat artışı ve mortalite karşılaştırması.',
          },
          {
            authors: 'Neal JM, Neal EJ, Weinberg GL (ASRA LAST 2020)',
            title: 'American Society of Regional Anesthesia and Pain Medicine Local Anesthetic Systemic Toxicity checklist: 2020 version.',
            journal: 'Reg Anesth Pain Med',
            year: 2021,
            pmid: '33148630',
            doi: '10.1136/rapm-2020-101986',
            note: 'LAST resüsitasyonunda modifiye düşük doz (≤ 1 mcg/kg) epinefrin kuralı.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/epinephrine.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};

export default EpinephrineProtocol;
