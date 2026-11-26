import React, { useId, useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  HeartPulse,
  Layers,
  RotateCcw,
  ShieldAlert,
  Syringe,
  Timer,
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
  MechanismOfActionBlock,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART1 } from '../../data/organImpairment/standaloneOrganPart1';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  isDark: boolean;
}

type EsmololTabId = 'intraop' | 'svt' | 'aorta' | 'peds';
type EsmololPrepId = 'std_10' | 'central_20' | 'syringe_10';

interface TabConfig {
  id: EsmololTabId;
  shortLabel: string;
  title: string;
  target: string;
  defaultBolusMgKg: number;
  minBolusMgKg: number;
  maxBolusMgKg: number;
  defaultInfusionMcgKgMin: number;
  minInfusionMcgKgMin: number;
  maxInfusionMcgKgMin: number;
  bolusDurationLabel: string;
  protocolNote: string;
}

const TAB_CONFIGS: Record<EsmololTabId, TabConfig> = {
  intraop: {
    id: 'intraop',
    shortLabel: 'İntraop HT / Laringoskopi',
    title: 'İntraoperatif Taşikardi / Hipertansiyon & Laringoskopi Yanıtı',
    target: 'KH 60–80/dk · Bazal KB ±%20',
    defaultBolusMgKg: 0.5,
    minBolusMgKg: 0.25,
    maxBolusMgKg: 1.5,
    defaultInfusionMcgKgMin: 100,
    minInfusionMcgKgMin: 25,
    maxInfusionMcgKgMin: 300,
    bolusDurationLabel: '30–60 saniyede IV yavaş puşe',
    protocolNote:
      'Laringoskopi/entübasyon stres yanıtını köreltmek için indüksiyondan 90–120 sn önce 0,5–1 mg/kg (veya 80 mg sabit bolus) 30 sn’de verilir; idame 50–200 mcg/kg/dk (maks 300 mcg/kg/dk).',
  },
  svt: {
    id: 'svt',
    shortLabel: 'SVT / Hızlı AF',
    title: 'SVT / Hızlı Ventrikül Yanıtlı AF & Atriyal Flutter',
    target: 'Ventrikül hızı <100–110/dk (akut kontrol)',
    defaultBolusMgKg: 0.5,
    minBolusMgKg: 0.25,
    maxBolusMgKg: 0.5,
    defaultInfusionMcgKgMin: 50,
    minInfusionMcgKgMin: 25,
    maxInfusionMcgKgMin: 200,
    bolusDurationLabel: '1 dakikada IV yükleme (500 mcg/kg/dk)',
    protocolNote:
      'Standart 4 dakikalık basamaklı titrasyon: 500 mcg/kg 1 dk yükleme → 50 mcg/kg/dk idame. 4 dk sonunda yanıt yetersizse tekrar 500 mcg/kg yükleme yapılır ve idame 50 mcg/kg/dk artırılır (maks 200 mcg/kg/dk).',
  },
  aorta: {
    id: 'aorta',
    shortLabel: 'Akut Aort Diseksiyonu',
    title: 'Akut Aort Diseksiyonu — Anti-İmpuls (dP/dt) Tedavisi',
    target: 'KH <60/dk · SKB 100–120 mmHg (<20 dk içinde)',
    defaultBolusMgKg: 0.5,
    minBolusMgKg: 0.25,
    maxBolusMgKg: 0.5,
    defaultInfusionMcgKgMin: 100,
    minInfusionMcgKgMin: 50,
    maxInfusionMcgKgMin: 300,
    bolusDurationLabel: '1 dakikada IV yükleme (500 mcg/kg)',
    protocolNote:
      'KRİTİK KURAL: Vazodilatatörden (Nikardipin / Sodyum Nitroprussid) DAİMA ÖNCE başlanır! Önce KH <60/dk düzeyine indirilir; SKB hâlâ >120 mmHg ise ikinci basamak olarak IV Nikardipin veya Clevidipin eklenir.',
  },
  peds: {
    id: 'peds',
    shortLabel: 'Pediatrik SVT / Fallot',
    title: 'Pediatrik SVT, Postoperatif HT & Fallot Tetralojisi Hipersiyanotik Spell',
    target: 'Yaşa uygun KH · Dinamik RVOT obstrüksiyonunun çözülmesi',
    defaultBolusMgKg: 0.25,
    minBolusMgKg: 0.1,
    maxBolusMgKg: 0.5,
    defaultInfusionMcgKgMin: 100,
    minInfusionMcgKgMin: 25,
    maxInfusionMcgKgMin: 300,
    bolusDurationLabel: '1 dakikada IV yükleme (100–500 mcg/kg)',
    protocolNote:
      'Çocuklarda 100–500 mcg/kg (0,1–0,5 mg/kg) 1 dk yükleme → 50–300 mcg/kg/dk infüzyon. Aort koarktasyonu onarımı sonrası HT ve Fallot Tetralojisi hipersiyanotik spell’inde infundibüler spazmı çözerek pulmoner akımı artırır.',
  },
};

export const EsmololProtocol: React.FC<Props> = ({ isDark }) => {
  // --- AKORDİYON STATE ---
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // --- HESAPLAYICI STATE ---
  const [activeTab, setActiveTab] = useState<EsmololTabId>('intraop');
  const [weightKg, setWeightKg] = useState<number>(70);
  const [prepId, setPrepId] = useState<EsmololPrepId>('std_10');
  const [bolusMgKg, setBolusMgKg] = useState<number>(0.5);
  const [infusionMcgKgMin, setInfusionMcgKgMin] = useState<number>(100);

  const weightSliderId = useId();
  const prepSelectId = useId();
  const bolusSliderId = useId();
  const infusionSliderId = useId();

  const tabCfg = TAB_CONFIGS[activeTab];

  const handleSelectTab = (tab: EsmololTabId) => {
    setActiveTab(tab);
    const cfg = TAB_CONFIGS[tab];
    setBolusMgKg(cfg.defaultBolusMgKg);
    setInfusionMcgKgMin(cfg.defaultInfusionMcgKgMin);
    if (tab === 'peds' && weightKg > 45) {
      setWeightKg(18);
    } else if (tab !== 'peds' && weightKg < 30) {
      setWeightKg(70);
    }
  };

  const concMgMl = prepId === 'central_20' ? 20 : 10;
  const concLabel =
    prepId === 'central_20'
      ? '20 mg/mL (20.000 mcg/mL · YALNIZCA SVK)'
      : prepId === 'syringe_10'
        ? '10 mg/mL (500 mg / 50 mL Enjektör)'
        : '10 mg/mL (2500 mg / 250 mL Premiks / Standart)';

  const calc = useMemo(() => {
    const bolusTotalMg = weightKg * bolusMgKg;
    // Yükleme bolusu DAİMA 10 mg/mL kullanıma hazır flakondan (Brevibloc 100 mg/10 mL) verilir
    const bolusVolumeMlFrom10 = bolusTotalMg / 10;

    const doseMcgMin = infusionMcgKgMin * weightKg;
    const doseMgMin = doseMcgMin / 1000;
    const hourlyMg = doseMgMin * 60;
    const pumpRateMlHr = concMgMl > 0 ? hourlyMg / concMgMl : 0;

    const dailyMg = hourlyMg * 24;
    const dailyGrams = dailyMg / 1000;
    const dailyMl = pumpRateMlHr * 24;
    const dailyPremixBags = dailyMg / 2500; // 1 premiks torba = 2500 mg / 250 mL
    const dailyBolusVials = bolusTotalMg / 100; // 1 flakon = 100 mg / 10 mL

    return {
      bolusTotalMg,
      bolusVolumeMlFrom10,
      doseMcgMin,
      doseMgMin,
      hourlyMg,
      pumpRateMlHr,
      dailyMg,
      dailyGrams,
      dailyMl,
      dailyPremixBags,
      dailyBolusVials,
    };
  }, [weightKg, bolusMgKg, infusionMcgKgMin, concMgMl]);

  const handleReset = () => {
    setActiveTab('intraop');
    setWeightKg(70);
    setPrepId('std_10');
    setBolusMgKg(0.5);
    setInfusionMcgKgMin(100);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. HIZLI BÖLÜM NAVİGASYON BARI (v5.0)                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Kimlik & Özet' },
          { id: 'sec-etki', label: 'Etki Mekanizması' },
          { id: 'sec-pkpd', label: 'PK / ADME' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-dozlar', label: 'Endikasyon & Doz' },
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
      {/* 2. ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (VARSAYILAN KAPALI)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="ESmolol"
        confusionRiskWith="esOMEPRAZOLE · labetalol · metoprolol"
        criticalAlerts={[
          '250 mg/mL KONSANTRE AMPUL FELAKETİ (25× DOZ HATASI!): Türkiye/hastane eczanelerinde bulunan 2500 mg / 10 mL KONSANTRE esmolol ampulü (250 mg/mL) ASLA DİREKT PUŞELENMEZ — doğrudan enjeksiyon 25 kat doz aşımı ile ani kardiyak arrest ve ölüm oluşturur! Mutlaka 240 mL SF/D5W içine eklenerek 10 mg/mL’ye seyreltilmelidir. Bolus için yalnızca 100 mg / 10 mL (10 mg/mL) kullanıma hazır flakon kullanılır.',
          'Feokromositoma & Kokain Krizinde Tek Başına YASAK: α-adrenerjik blokaj (Fentolamin / Fenoksibenzamin) sağlanmadan esmolol uygulanması β₂-aracılı vazodilatasyonu kapatıp karşılanmamış (unopposed) α₁-vazokonstriksiyon krizi, malign hipertansiyon, koroner vazospazm ve akut pulmoner ödeme yol açar!',
          'Damar Yolu & Konsantrasyon Sınırı (>10 mg/mL): 10 mg/mL üzerindeki çözeltiler (ör. 20 mg/mL) ciddi periferik venöz irritasyon, tromboflebit ve ekstravazasyonda doku nekrozu yapar — 20 mg/mL yalnızca Santral Venöz Kateterden (SVK) verilebilir.',
          'Akut Aort Diseksiyonu Sıralama Kuralı: Vazodilatatörden (Nikardipin / Nitroprussid) DAİMA ÖNCE esmolol başlanmalıdır; aksi halde refleks taşikardi aort duvarındaki dP/dt makaslama stresini artırarak diseksiyonun rüptürüne yol açar.',
        ]}
        antidoteOrRescue="1) İnfüzyonu DERHAL DURDURUN — eritrosit esterazları t½ = 9 dakikada ilacı temizler; hemodinamik etkilerin çoğu 10–30 dk içinde kendiliğinden geriler. 2) Semptomatik bradikardide: Atropin 0,5–1 mg IV (maks 3 mg); yanıtsızsa İzoproterenol veya transkutanöz/transvenöz pacing. 3) Refrakter kardiyojenik şok / ağır hipotansiyonda: GLUKAGON 3–5 mg IV yavaş bolus → 1–5 mg/saat infüzyon (β₁ reseptörünü bypass ederek doğrudan adenilat siklazı uyarır!), Yüksek Doz İnsülin-Öglisemi Tedavisi (HIET: 1 U/kg regüler insülin IV bolus → 0,5–1 U/kg/sa + dekstroz + K⁺ takibi), IV Kalsiyum Klorür (%10, 1 g) ve Noradrenalin/Adrenalin vazopressör desteği."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KİMLİK, KLİNİK ÖZET HEADER & KISA ETKİ MEKANİZMASI               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span className="font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/15">
                Ultra-Kısa Etkili Kardiyoselektif β₁-Bloker
              </span>
              <span aria-hidden="true">·</span>
              <span>Brevibloc® · Esmolol HCl</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">ATC: C07AB09</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Esmolol Hidroklorür Monografisi
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> Sınıf II
              antiaritmik; intrinsik sempatomimetik aktivitesi (ISA) ve membran stabilize edici etkisi olmayan,{' '}
              <strong>ultra-kısa etkili (t½ = 9 dk)</strong> ve yüksek <strong>β₁-kardiyoselektif</strong> intravenöz
              adrenerjik reseptör antagonistidir. Eritrosit sitozolik esterazları tarafından organ fonksiyonlarından
              bağımsız olarak hızla hidrolize edildiği için perioperatif, kardiyak ve yoğun bakım acillerinde dakika
              bazında titre edilebilen altın standart IV beta-blokerdir.
            </p>
          </div>
        </div>

        {/* Hızlı Klinik Süper Güç Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? 'bg-indigo-950/25 border-indigo-900/50 text-indigo-200'
                : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Eritrosit Esteraz Hidrolizi (t½ = 9 dk)</span>
            </div>
            <p className="text-xs leading-relaxed">
              Plazma psödokolinesterazıyla <strong>DEĞİL</strong>, doğrudan eritrosit içi sitozolik esterazlarla
              parçalanır. Ağır karaciğer ve böbrek yetmezliğinde klirens değişmez; infüzyon kesildikten{' '}
              <strong>10–30 dk içinde</strong> hemodinamik etki tamamen sonlanır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-sky-950/25 border-sky-900/50 text-sky-200' : 'bg-sky-50/70 border-sky-200 text-sky-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-sky-600 dark:text-sky-400">
              <HeartPulse className="w-4 h-4 shrink-0" />
              <span>Kardiyoselektif β₁ (β₁:β₂ ≈ 33:1)</span>
            </div>
            <p className="text-xs leading-relaxed">
              Terapötik dozlarda (≤200 mcg/kg/dk) SA/AV düğüm iletisini ve miyokardiyal kontraktilite/dP/dt’yi seçici
              baskılar. <strong>&gt;300 mcg/kg/dk</strong> yüksek dozlarda β₁ selektivitesi kaybolur ve β₂-aracılı
              bronkospazm riski doğar.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? 'bg-rose-950/25 border-rose-900/50 text-rose-200'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>250 mg/mL Ampul &amp; 10 mg/mL Sınırı</span>
            </div>
            <p className="text-xs leading-relaxed">
              Bolus için yalnızca <strong>100 mg/10 mL (10 mg/mL)</strong> flakon kullanılır.{' '}
              <strong>2500 mg/10 mL (250 mg/mL)</strong> konsantre ampul asla direkt puşelenmez; 20 mg/mL infüzyon ise
              yalnızca santral kateterle verilir.
            </p>
          </div>
        </div>
      </section>

      <MechanismOfActionBlock
        isDark={isDark}
        sectionId="sec-etki"
        summary="Esmolol, miyokard ve kalp ileti sistemindeki (SA/AV düğüm) β₁-adrenerjik reseptörleri kompetitif ve geri dönüşümlü olarak bloke ederek endojen katekolaminlerin (adrenalin/noradrenalin) Gs proteini → adenilat siklaz → cAMP → PKA kaskadını keser. Sonuç olarak kalp hızı (negatif kronotropi), AV düğüm ileti hızı (negatif dromotropi), miyokardiyal kontraktilite (negatif inotropi) ve sol ventrikül basınç artış hızı (dP/dt) hızla düşer; miyokardiyal oksijen tüketimi (MVO₂) azalır ve diyastolik koroner dolum süresi uzar."
        pillars={[
          {
            title: 'Negatif Kronotropi & Dromotropi (SA / AV Düğüm)',
            detail:
              'SA düğümde cAMP bağımlı If (HCN4) akımını yavaşlatarak kalp hızını düşürür; AV düğümde L-tipi Ca²⁺ akımını (ICa,L) azaltarak refrakter periyodu uzatır ve SVT/AF’de ventriküler yanıt hızını kontrol eder.',
          },
          {
            title: 'Anti-İmpuls (dP/dt↓) & Miyokardiyal Koruma',
            detail:
              'Ventriküler miyokardda RyR2/Ca²⁺ geçişini azaltarak aort duvarına uygulanan ejeksiyon makaslama kuvvetini (dP/dt) düşürür; akut aort diseksiyonu ve perioperatif miyokard iskemisinde primer mekanizmadır.',
          },
          {
            title: 'Doz-Bağımlı β₁ Selektivite Penceresi',
            detail:
              'Klinik ≤200 mcg/kg/dk aralığında bronşiyal ve vasküler β₂ reseptörlerini büyük ölçüde korur; ancak >300 mcg/kg/dk dozlarda selektivite kaybolarak hava yolu direncini artırabilir.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FARMAKOKİNETİK (ADME) AKORDİYON (VARSAYILAN KAPALI)              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-pkpd"
        className={`rounded-2xl border transition-all overflow-hidden ${
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                <span>Farmakokinetik (ADME) Özellikleri</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  t½: 9 dk · Eritrosit Esterazı
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Eritrosit sitozolik esteraz hidrolizi (plazma psödokolinesterazı değil!), böbrek/KC yetmezliğinden bağımsız klirens.
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
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  1 – 2 Dakika
                </span>
                <span className="text-[10px] text-slate-400">IV bolus sonrası hızlı β₁ blokaj</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Pik Etki / Kararlı Durum
                </span>
                <span className="text-base font-bold font-mono text-sky-600 dark:text-sky-400 mt-1 block">
                  5 dk (Yüklemeyle)
                </span>
                <span className="text-[10px] text-slate-400">Yüklemesiz 20–30 dakikada</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Eliminasyon Yarı Ömrü (t½β)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  ~9 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Dağılım t½α: ~2 dk · Offset: 10–30 dk</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Protein Bağlanma / Vd
                </span>
                <span className="text-base font-bold font-mono text-purple-600 dark:text-purple-400 mt-1 block">
                  %55 · 3,4 L/kg
                </span>
                <span className="text-[10px] text-slate-400">Klirens: ~285 mL/kg/dk (CO’dan yüksek!)</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500" />
                <span>Eritrosit Sitozolik Esteraz Metabolizması (Sınav &amp; Klinik Kritik Ayrım):</span>
              </h4>
              <p>
                Esmolol, kimyasal yapısındaki <strong>metil ester bağı</strong> sayesinde dolaşımdaki{' '}
                <strong>eritrositlerin sitozolik esterazları</strong> (kan esterazları) tarafından hızla hidrolize
                edilir. Plazma <strong>psödokolinesterazı (bütirilkolinesteraz)</strong> veya hepatik CYP450 enzimleri
                bu yıkımdan sorumlu <strong>DEĞİLDİR</strong> — bu nedenle atipik psödokolinesteraz eksikliğinde veya
                süksinilkolin/mivakuryum kullanımında esmolol eliminasyonu uzamaz! Total vücut klirensi (~285 mL/kg/dk)
                kardiyak debiden bile yüksektir.
              </p>
              <p>
                Hidroliz sonucunda iki metabolit oluşur: (1) <strong>ASL-8123 (serbest karboksilik asit metaboliti)</strong>{' '}
                — ana ilaca göre yalnızca <strong>1/1500</strong> oranında β-bloker aktiviteye sahiptir (klinik olarak
                inaktif), t½ ~3,7 saat olup böbreklerle atılır; son dönem böbrek yetmezliğinde (SDBY) birikse dahi ana
                ilacın klinik etkisini uzatmaz; (2) Eser miktarda <strong>metanol</strong> (endüstriyel toksisite
                eşiğinin çok altında, klinik olarak ihmal edilebilir düzeyde).
              </p>
              <div className="p-3 rounded-lg border bg-indigo-500/10 border-indigo-500/30 text-indigo-900 dark:text-indigo-200 font-medium">
                <strong>Klinik Çıkarım:</strong> Yükleme dozu (500 mcg/kg) ile 5 dakikada kararlı terapötik etkiye
                ulaşılır; kesildikten 10–20 dakika sonra β₁ blokaj hızla çözülür (30 dk’da tam geri dönüş). Bu özellik,
                hemodinamik açıdan kırılgan veya sınırda sol ventrikül fonksiyonu olan hastalarda “güvenli test edilebilir
                beta-bloker” olarak kullanımını sağlar.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE!)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Ağır sinüs bradikardisi (<50/dk) veya hasta sinüs sendromu (kalıcı/geçici pacemaker yokluğunda).',
          '2. derece (Mobitz Tip I/II) veya 3. derece (tam) AV blok (pacemaker yokluğunda).',
          'Kardiyojenik şok veya akut dekompanse sistolik kalp yetmezliği (düşük kalp debisi / akut pulmoner ödem).',
          'Tedavi edilmemiş feokromositoma veya akut kokain/amfetamin zehirlenmesi (α-blokaj sağlanmadan tek başına β-bloker → karşılanmamış α₁ krizi!).',
          'Eşzamanlı veya hemen ardından IV verapamil/diltiazem gibi non-dihidropiridin Ca²⁺ kanal blokeri uygulaması (sinerjik derin bradikardi, AV blok ve asistoli).',
          'Aktif, şiddetli bronkospazm veya akut ağır astım atağı; pulmoner hipertansiyona bağlı akut sağ kalp yetmezliği.',
        ]}
        relativeItems={[
          'Hafif-orta KOAH veya stabil astım: Düşük/orta dozda (≤150–200 mcg/kg/dk) göreceli olarak tolere edilebilir; ancak >300 mcg/kg/dk’da β₁ selektivite kaybolur — bronkospazm açısından yakın izlem ve kısa etkili β₂-agonist (salbutamol) hazır bulundurulmalıdır.',
          'Diabetes mellitus: Esmolol, hipogliseminin taşikardi ve tremor gibi adrenerjik uyarı belirtilerini maskeleyebilir (terleme kolinerjik olduğundan korunur).',
          'Preeklampsi / hipovolemi / periferik arter hastalığı / Prinzmetal vazospastik anjina (karşılanmamış α-vazospazm riski).',
          'Ağır pre-eksitasyonlu (WPW) atriyal fibrilasyon: AV düğüm blokajı aksesuar yoldan hızlı iletime ve ventriküler fibrilasyona yol açabilir!',
        ]}
        clinicalNote="Esmolol’ün 9 dakikalık yarı ömrü, göreceli kontrendikasyonların (ör. stabil KOAH, sınırda EF) varlığında uzun etkili beta-blokerlere (metoprolol/propranolol) göre çok daha güvenli bir deneme penceresi sunar; ancak mutlak kontrendikasyonlarda (dekompanse KKY, 2.–3. derece AV blok, α-blokajsız feokromositoma) KESİNLİKLE uygulanmaz."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozlar"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Klinik Endikasyonlar &amp; Kanıta Dayalı Doz Rejimleri
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Maks Erişkin: 200 (SVT) – 300 (HT) mcg/kg/dk</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. İntraoperatif Taşikardi / HT & Laringoskopi */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500 shrink-0" />
                İntraoperatif Taşikardi / HT &amp; Laringoskopi
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shrink-0">
                Perioperatif 1. Tercih
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Hızlı Kontrol / Laringoskopi:</strong> İndüksiyon-entübasyon yanıtını önlemek için 30–60 sn’de{' '}
              <strong>0,5–1 mg/kg IV bolus</strong> (veya 80 mg sabit bolus) uygulanır; gerekirse{' '}
              <strong>50–200 mcg/kg/dk</strong> (maks <strong>300 mcg/kg/dk</strong>) infüzyona geçilir. Ekstübasyon ve
              uyanma dönemi hipertansiyon/taşikardisinde rezidüel bradikardi bırakmadan güvenle sonlanır.
            </p>
          </div>

          {/* 2. SVT / Hızlı AF */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-sky-500 shrink-0" />
                SVT &amp; Hızlı Ventrikül Yanıtlı AF / Flutter
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-500/20 text-sky-700 dark:text-sky-300 shrink-0">
                ESC / AHA Sınıf I
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>500 mcg/kg/dk 1 dk yükleme</strong> → <strong>50 mcg/kg/dk</strong> idame. 4 dk içinde yeterli
              hız kontrolü sağlanmazsa tekrar 500 mcg/kg 1 dk yükleme yapılarak idame 100 → 150 → maks{' '}
              <strong>200 mcg/kg/dk</strong>’ya kademeli çıkılır. 200 mcg/kg/dk üzerinde hız kontrolü kazanımı minimal,
              hipotansiyon riski yüksektir.
            </p>
          </div>

          {/* 3. Akut Aort Diseksiyonu */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                Akut Aort Diseksiyonu (Anti-İmpuls dP/dt)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-700 dark:text-rose-300 shrink-0">
                ACC/AHA 2022 Sınıf I
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>500 mcg/kg 1 dk yükleme</strong> → <strong>50–200 mcg/kg/dk</strong> (gereğinde 300 mcg/kg/dk).
              Amaç sol ventrikül dP/dt makaslama kuvvetini hızla düşürmektir: <strong>ÖNCE KH &lt;60/dk</strong>, sonra
              SKB <strong>100–120 mmHg</strong> hedeflenir. Vazodilatatör (Nikardipin/Clevidipin) yalnızca β-blokaj
              kurulduktan sonra eklenir.
            </p>
          </div>

          {/* 4. Pediatrik SVT / Postop HT / Fallot Spell & Tiroid Fırtınası */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-teal-500 shrink-0" />
                Pediatrik SVT · Fallot Spell · Tiroid Fırtınası
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                Pediatrik / YBÜ
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Pediatrik:</strong> 100–500 mcg/kg 1 dk yükleme → 50–300 mcg/kg/dk infüzyon (SVT, koarktasyon
              postop HT, Fallot Tetralojisi hipersiyanotik spell’inde infundibüler spazm çözülmesi).{' '}
              <strong>Tiroid Fırtınası / EKT:</strong> Tiroid fırtınasında 250–500 mcg/kg yükleme → 50–100 mcg/kg/dk;
              EKT öncesi hipertansif yanıtı baskılamada 0,5–1 mg/kg bolus.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. İNTERAKTİF ÇOK SEKMELİ DOZ & POMPA HIZI HESAPLAYICISI            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif Esmolol Bolus &amp; İnfüzyon Pompası Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                4 klinik endikasyon sekmesi, 10 mg/mL (periferik/premiks) vs 20 mg/mL (santral) pompa hızı ve bolus hacmi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <MonographCopyButton
              isDark={isDark}
              label="Klinik Order Kopyala"
              getText={() =>
                [
                  `ESMOLOL HCl (BREVİBLOC) KLİNİK ORDER ÖZETİ`,
                  `Endikasyon: ${tabCfg.title}`,
                  `Hasta Ağırlığı: ${weightKg} kg`,
                  `Hemodinamik Hedef: ${tabCfg.target}`,
                  `Yükleme Bolusu (10 mg/mL hazır flakondan): ${bolusMgKg.toFixed(2)} mg/kg = ${calc.bolusTotalMg.toFixed(1)} mg (${calc.bolusVolumeMlFrom10.toFixed(1)} mL) — ${tabCfg.bolusDurationLabel}`,
                  `İdame İnfüzyon Dozu: ${infusionMcgKgMin} mcg/kg/dk (${calc.doseMgMin.toFixed(2)} mg/dk · ${calc.hourlyMg.toFixed(0)} mg/saat)`,
                  `Seçili Konsantrasyon: ${concLabel}`,
                  `İnfüzyon Pompası Hızı: ${calc.pumpRateMlHr.toFixed(1)} mL/saat`,
                  `24 Saatlik Tüketim: ${calc.dailyGrams.toFixed(2)} g/gün (${calc.dailyMl.toFixed(0)} mL/gün · ~${Math.ceil(calc.dailyPremixBags)} adet 2500 mg premiks torba)`,
                  `GÜVENLİK: 250 mg/mL konsantre ampul ASLA direkt puşelenmez; >10 mg/mL konsantrasyon yalnızca SVK ile verilir.`,
                ].join('\n')
              }
            />
            <button
              type="button"
              onClick={handleReset}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Endikasyon Sekmeleri */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
          {(['intraop', 'svt', 'aorta', 'peds'] as EsmololTabId[]).map((tabId) => {
            const cfg = TAB_CONFIGS[tabId];
            const isActive = activeTab === tabId;
            return (
              <button
                key={tabId}
                type="button"
                onClick={() => handleSelectTab(tabId)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/40'
                      : 'bg-indigo-50 border-indigo-500 text-indigo-950 ring-1 ring-indigo-500/30'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="block text-xs font-bold leading-tight">{cfg.shortLabel}</span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  {cfg.defaultInfusionMcgKgMin} mcg/kg/dk · maks {cfg.maxInfusionMcgKgMin}
                </span>
              </button>
            );
          })}
        </div>

        {/* Aktif Sekme Protokol Notu */}
        <div
          className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed ${
            activeTab === 'aorta'
              ? isDark
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                : 'bg-rose-50 border-rose-200 text-rose-950'
              : isDark
                ? 'bg-indigo-950/20 border-indigo-900/50 text-indigo-200'
                : 'bg-indigo-50/60 border-indigo-200 text-indigo-950'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <strong className="text-xs sm:text-sm">{tabCfg.title}</strong>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
              Hedef: {tabCfg.target}
            </span>
          </div>
          <p>{tabCfg.protocolNote}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
          {/* Sol Kolon (7): Girdiler */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Ağırlık */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <label htmlFor={weightSliderId} className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Hasta Ağırlığı (Dozaj Ağırlığı):</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={3}
                    max={150}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.min(150, Math.max(3, Number(e.target.value) || 3)))}
                    aria-label="Hasta ağırlığı kg"
                    className={`w-16 px-2 py-0.5 rounded-lg border font-mono text-xs font-bold text-right ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-indigo-300'
                        : 'bg-white border-slate-300 text-indigo-700'
                    }`}
                  />
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    kg {weightKg < 35 ? '· Pediatrik' : ''}
                  </span>
                </div>
              </div>
              <input
                id={weightSliderId}
                type="range"
                min={3}
                max={150}
                step={1}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[5, 10, 20, 50, 70, 85, 100].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeightKg(w)}
                    className={`px-2 py-0.5 text-[11px] font-mono tabular-nums rounded border transition-colors cursor-pointer ${
                      weightKg === w
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                        : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {w} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Obezite Doz Skaler Yardımcısı */}
            <ObesityDosingScaler
              isDark={isDark}
              drugName="Esmolol"
              recommendedScalar="LBW"
              secondaryScalar={{ type: 'IBW', context: 'Konservatif Bolus' }}
              rationale="Esmolol hidrofilik özellikli olup dağılım hacmi ve eritrosit esteraz klirensi adipoz dokudan ziyade yağsız vücut kütlesi (LBW) ve kan hacmi ile koreledir. BMI ≥ 35 kg/m² hastalarda TBW ile yükleme bolusu aşırı bradikardi ve hipotansiyon yaratabilir; LBW veya IBW ile başlayıp yanıtla titre edilmelidir."
              currentWeightKg={weightKg}
              onApplyWeight={(w) => setWeightKg(Math.min(150, Math.max(3, w)))}
            />

            {/* 2. Seyreltme / Konsantrasyon Seçici */}
            <div>
              <label htmlFor={prepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                İnfüzyon Çözeltisi &amp; Konsantrasyonu:
              </label>
              <select
                id={prepSelectId}
                value={prepId}
                onChange={(e) => setPrepId(e.target.value as EsmololPrepId)}
                className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-indigo-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-600'
                }`}
              >
                <option value="std_10">
                  10 mg/mL Standart Premiks / Periferik — Brevibloc® 2500 mg / 250 mL (veya 2500 mg/10 mL + 240 mL SF/D5W)
                </option>
                <option value="syringe_10">
                  10 mg/mL Enjektör Pompası — 500 mg / 50 mL (5 adet 100 mg/10 mL hazır flakon, sulandırmasız)
                </option>
                <option value="central_20">
                  20 mg/mL Çift Konsantrasyon (Sıvı Kısıtlı · YALNIZCA SVK!) — 5000 mg / 250 mL veya 1000 mg / 50 mL
                </option>
              </select>
              <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                Not: Yükleme bolusu her zaman <strong>100 mg / 10 mL (10 mg/mL)</strong> kullanıma hazır flakondan
                çekilir; 250 mg/mL konsantre ampulden asla direkt bolus yapılmaz.
              </p>
            </div>

            {/* 3. Yükleme Bolus Dozu */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                <label htmlFor={bolusSliderId} className="font-bold text-slate-700 dark:text-slate-300">
                  Yükleme Bolus Dozu ({tabCfg.minBolusMgKg} – {tabCfg.maxBolusMgKg} mg/kg):
                </label>
                <span className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400">
                  {bolusMgKg.toFixed(2)} mg/kg ({Math.round(bolusMgKg * 1000)} mcg/kg)
                </span>
              </div>
              <input
                id={bolusSliderId}
                type="range"
                min={tabCfg.minBolusMgKg}
                max={tabCfg.maxBolusMgKg}
                step={0.05}
                value={bolusMgKg}
                onChange={(e) => setBolusMgKg(Number(e.target.value))}
                className="w-full accent-sky-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(activeTab === 'intraop'
                  ? [0.25, 0.5, 0.75, 1.0, 1.5]
                  : activeTab === 'peds'
                    ? [0.1, 0.25, 0.5]
                    : [0.25, 0.5]
                ).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBolusMgKg(b)}
                    className={`px-2 py-0.5 text-[10.5px] font-mono rounded border transition-colors cursor-pointer ${
                      Math.abs(bolusMgKg - b) < 0.01
                        ? 'bg-sky-600 text-white border-sky-600 font-bold'
                        : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {b} mg/kg
                  </button>
                ))}
              </div>
            </div>

            {/* 4. İdame İnfüzyon Dozu */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                <label htmlFor={infusionSliderId} className="font-bold text-slate-700 dark:text-slate-300">
                  İdame İnfüzyon Hızı ({tabCfg.minInfusionMcgKgMin} – {tabCfg.maxInfusionMcgKgMin} mcg/kg/dk):
                </label>
                <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {infusionMcgKgMin} mcg/kg/dk
                </span>
              </div>
              <input
                id={infusionSliderId}
                type="range"
                min={tabCfg.minInfusionMcgKgMin}
                max={tabCfg.maxInfusionMcgKgMin}
                step={25}
                value={infusionMcgKgMin}
                onChange={(e) => setInfusionMcgKgMin(Number(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[25, 50, 100, 150, 200, 250, 300]
                  .filter((d) => d >= tabCfg.minInfusionMcgKgMin && d <= tabCfg.maxInfusionMcgKgMin)
                  .map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setInfusionMcgKgMin(d)}
                      className={`px-2 py-0.5 text-[10.5px] font-mono rounded border transition-colors cursor-pointer ${
                        infusionMcgKgMin === d
                          ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {d} mcg/kg/dk
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Sağ Kolon (5): Canlı Çıktı Kartı & Dinamik Güvenlik Uyarıları */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  İdame İnfüzyon Pompası Hızı
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    concMgMl === 20
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                      : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                  }`}
                >
                  {concMgMl} mg/mL
                </span>
              </div>

              {/* Ana Pompa Hızı */}
              <div className="py-4 text-center">
                <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-indigo-600 dark:text-indigo-400 tracking-tight">
                  {calc.pumpRateMlHr.toFixed(1)}{' '}
                  <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                    mL / saat
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {infusionMcgKgMin} mcg/kg/dk · {weightKg} kg · {concMgMl} mg/mL çözelti
                </div>
              </div>

              {/* Yükleme Bolus Kutusu */}
              <div
                className={`mb-3 p-3 rounded-xl border ${
                  isDark ? 'bg-sky-950/30 border-sky-500/30' : 'bg-sky-50 border-sky-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    Yükleme Bolusu (10 mg/mL Hazır Flakon)
                  </span>
                  <span className="font-mono text-xs font-bold text-sky-700 dark:text-sky-300">
                    {calc.bolusTotalMg.toFixed(1)} mg
                  </span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xl font-black font-mono tabular-nums text-slate-900 dark:text-white">
                    {calc.bolusVolumeMlFrom10.toFixed(1)} mL IV
                  </span>
                  <span className="text-[10.5px] text-slate-500 dark:text-slate-400">
                    {tabCfg.bolusDurationLabel}
                  </span>
                </div>
              </div>

              {/* Tüketim Grid */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Dakikalık Doz</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {calc.doseMgMin.toFixed(2)} mg / dk
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({calc.doseMcgMin.toFixed(0)} mcg/dk)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Saatlik Tüketim</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {calc.hourlyMg.toFixed(0)} mg / saat
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({calc.pumpRateMlHr.toFixed(1)} mL/saat)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">24 Saatlik Sarfiyat</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {calc.dailyGrams.toFixed(2)} g / gün
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({calc.dailyMl.toFixed(0)} mL / 24 saat)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Premiks Torba (2,5 g)</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                    ~{Math.ceil(calc.dailyPremixBags)} Torba / gün
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    (Net: {calc.dailyPremixBags.toFixed(2)} · Bolus: {Math.ceil(calc.dailyBolusVials)} flakon)
                  </span>
                </div>
              </div>
            </div>

            {/* Dinamik Güvenlik Uyarıları */}
            <div className="space-y-2">
              {concMgMl > 10 && (
                <div className="p-3 rounded-xl border bg-rose-500/15 border-rose-500/40 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">20 mg/mL — SANTRAL VENÖZ KATETER (SVK) ZORUNLU!</span>
                    10 mg/mL üzerindeki esmolol çözeltileri periferik venden verildiğinde ağır venöz flebit ve
                    ekstravazasyon nekrozu oluşturur. Periferik erişimde mutlaka 10 mg/mL kullanın.
                  </div>
                </div>
              )}

              {infusionMcgKgMin > 200 && (
                <div className="p-3 rounded-xl border bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Yüksek Doz Uyarısı (&gt;200 mcg/kg/dk — β₁ Selektivite Kaybı!):</span>
                    200–300 mcg/kg/dk bandında β₂-adrenerjik blokaj ve bronkospazm riski artar; hipotansiyon insidansı
                    yükselir. SVT/AF’de &gt;200 mcg/kg/dk ek hız kontrolü kazancı minimaldir.
                  </div>
                </div>
              )}

              {calc.dailyMl > 1000 && concMgMl === 10 && (
                <div className="p-3 rounded-xl border bg-sky-500/10 border-sky-500/30 text-sky-900 dark:text-sky-200 text-xs flex items-start gap-2">
                  <Layers className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Yüksek Sıvı Hacmi ({calc.dailyMl.toFixed(0)} mL / 24 saat):</span>
                    Sıvı kısıtlı veya kalp/böbrek yetmezliği olan hastada 24 saati aşan infüzyon gerekiyorsa santral
                    kateterden <strong>20 mg/mL</strong> konsantrasyon veya oral/IV uzun etkili beta-blokere geçiş
                    değerlendirilmelidir.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Brevibloc® 100 mg / 10 mL Kullanıma Hazır IV Flakon (Bolus İçin)',
            presentation: '10 mL berrak steril izotonik IV çözelti içeren kullanıma hazır cam flakon',
            concentration: '10 mg/mL (10.000 mcg/mL)',
            saltOrBaseNote:
              'Seyreltme GEREKTİRMEZ — doğrudan yükleme bolusu (0,5–1 mg/kg) için çekilip uygulanabilir. Acil masası ve anestezi arabasında bolus için bulundurulması gereken TEK güvenli formdur.',
            alertLevel: 'standard',
          },
          {
            name: 'Brevibloc® 2500 mg / 250 mL Premiks İnfüzyon Torbası',
            presentation: '250 mL kullanıma hazır PVC/non-PVC izotonik infüzyon torbası',
            concentration: '10 mg/mL (10.000 mcg/mL)',
            saltOrBaseNote:
              'Sulandırma hatası riskini ortadan kaldıran ISMP önerisi hazır torbadır. Periferik geniş venden veya santral kateterden doğrudan infüzyon pompasına bağlanır.',
            alertLevel: 'standard',
          },
          {
            name: 'Brevibloc® 2500 mg / 10 mL KONSANTRE Ampul (YÜKSEK TEHLİKE!)',
            presentation: '10 mL konsantre IV çözelti içeren ampul — ASLA SULANDIRMADAN VERİLMEZ!',
            concentration: '250 mg/mL (25× KONSANTRE!)',
            saltOrBaseNote:
              'DOĞRUDAN PUŞE ÖLÜMCÜLDÜR! Mutlaka 250 mL’lik SF/D5W torbasından 10 mL çekilip atıldıktan sonra 10 mL konsantre ampul eklenerek 2500 mg / 250 mL (= 10 mg/mL) hazırlanır. Sıvı kısıtlı SVK için 2 ampul (5000 mg) / 250 mL = 20 mg/mL hazırlanabilir.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Standart Periferik / Premiks İnfüzyon (10 mg/mL): Hazır 2500 mg / 250 mL premiks torba VEYA 2500 mg/10 mL konsantre ampul + 240 mL SF/D5W (= 250 mL).',
          'Enjektör Pompası Hazırlama (10 mg/mL — 50 mL): 5 adet 100 mg/10 mL kullanıma hazır flakon (= 500 mg / 50 mL) doğrudan 50 mL enjektöre çekilir.',
          'Sıvı Kısıtlı Çift Konsantrasyon (20 mg/mL — YALNIZCA SVK!): 2 adet 2500 mg/10 mL konsantre ampul (20 mL) + 230 mL SF/D5W (= 250 mL) VEYA 4 mL konsantre (1000 mg) + 46 mL SF/D5W (= 50 mL enjektör).',
        ]}
        concentrationTrapWarning="100 mg/10 mL (10 mg/mL) kullanıma hazır flakon ile 2500 mg/10 mL (250 mg/mL) KONSANTRE ampul aynı 10 mL hacme sahiptir ancak konsantrasyonları arasında TAM 25 KAT fark vardır! 250 mg/mL ampulün yanlışlıkla 5–10 mL direkt puşelenmesi 1250–2500 mg ani bolus ile refrakter asistoliye yol açar. 250 mg/mL ampuller ameliyathane/acil ilaç tepsisinde değil, yalnızca merkezi eczane/kilitli hazırlık dolabında tutulmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, pH/OZMOLALİTE, Y-SITE & EKSTRAVAZASYON               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="central-preferred"
        accessSummary="10 mg/mL standart konsantrasyon geniş, proksimal periferik venden (≥18–20G antekübital/önkol; el sırtı ve küçük venlerden kaçının) kısa-orta süreli verilebilir; ancak >24 saatlik infüzyonlarda ve özellikle 20 mg/mL çift konsantrasyonda Santral Venöz Kateter (SVK) ZORUNLUDUR."
        phRange="4,5 – 5,5 (Premiks) · 3,5 – 5,5 (Konsantre)"
        osmolalityNote="Premiks 10 mg/mL izotoniktir (~312 mOsm/kg), ancak >10 mg/mL konsantrasyonlar belirgin venöz endotel irritasyonu, tromboflebit, cilt vezikasyonu ve ekstravazasyonda doku nekrozu yapar."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF) — Standart taşıyıcı',
          '%5 Dekstroz (D5W) — Standart taşıyıcı',
          '%5 Dekstroz + %0,9 NaCl (D5NS) veya %5 Dekstroz + %0,45 NaCl',
          'Ringer Laktat (LR) — Uyumlu (ancak Sodyum Bikarbonat ile KESİNLİKLE UYUMSUZ!)',
        ]}
        stabilityNote="Seyreltilmiş 10 mg/mL çözeltiler oda sıcaklığında (25 °C) ve buzdolabında 24 saat stabildir. Premiks torbalar dondurulmamalıdır."
        ySiteCompatible={[
          'Fentanil',
          'Remifentanil',
          'Midazolam',
          'Propofol',
          'Deksmedetomidin',
          'Heparin',
          'İnsülin',
          'Nikardipin',
          'Nitrogliserin',
          'Sodyum Nitroprussid',
          'Potasyum Klorür',
          'Magnezyum Sülfat',
        ]}
        ySiteIncompatible={[
          'Sodyum Bikarbonat (%8,4 NaHCO₃ — hızlı ester hidrolizi & inaktivasyon!)',
          'Furosemid (çökelti!)',
          'Diazepam',
          'Tiyopental',
          'Amfoterisin B',
          'Varfarin IV / Alkali çözeltiler',
        ]}
        extravasationProtocol="İnfüzyon bölgesinde ağrı, kızarıklık, şişlik veya beyazlaşma görülürse infüzyonu DERHAL durdurun; kanülü çekmeden aspire edin, ekstremiteyi eleve edin ve lokal inflamasyonu azaltmak için soğuk/ılık semptomatik bakım (vezikan irritasyon nedeniyle plastik cerrahi/yara takibi) uygulayın. 20 mg/mL asla periferik damara bağlanmaz."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Ana ilacın klirensi böbrekten BAĞIMSIZDIR; eGFR <30 mL/dk veya CRRT/HD’de doz azaltımı gerekmez."
        renalDetails={[
          'Esmolol eritrosit esterazları ile kanda hidrolize olduğu için akut böbrek hasarı (ABH) veya kronik böbrek hastalığında ana ilacın t½ değeri (~9 dk) değişmez.',
          'İnaktif asit metaboliti (ASL-8123; β-bloker gücü ana ilacın 1/1500’ü) böbreklerle atılır; SDBY’de yarı ömrü ~3,7 saatten 10 kat uzasa da klinik olarak anlamlı uzamış β-blokaj yapmaz.',
          'Hiperkalemi eğilimi olan son dönem böbrek yetmezliği hastalarında β-blokaj hücre içine K⁺ girişini hafifçe azaltabileceğinden serum K⁺ düzeyi rutin izlenmelidir.',
        ]}
        hepaticSummary="Child-Pugh A / B / C yetmezliğinde doz ayarlaması GEREKMEZ; hepatik CYP450 veya kan akımı klirensi etkilemez."
        hepaticDetails={[
          'Metabolizma tamamen eritrosit içi esterazlarla yürütüldüğünden ağır siroz, karaciğer transplantasyonu (anhepatik faz dahil!) ve akut karaciğer yetmezliğinde eliminasyon hızı tamamen korunur.',
          'Dekompanse sirozda mevcut yüksek bazal kardiyak debi ve splanknik vazodilatasyon nedeniyle sistemik hipotansiyona karşı standart yavaş titrasyonla başlanmalıdır.',
        ]}
        {...STANDALONE_ORGAN_PART1['esmolol']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE DOZ YÖNETİMİ                                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="Yükleme %50 Azalt · Yavaş Titre"
        geriatricPoints={[
          '>65 yaş ve kırılgan (frailty) hastalarda sinoatriyal düğüm intrensek hızı, baroreseptör rezervi ve diyastolik kompliyans azalmıştır; tam 500 mcg/kg yükleme bolusu derin hipotansiyon ve sinüs duraklaması yapabilir.',
          'Geriatrik perioperatif hastalarda yükleme bolusunu atlamak veya yarı doz (250 mcg/kg) uygulayıp 25–50 mcg/kg/dk infüzyonla başlamak güvenli hemodinamik kontrol sağlar.',
          'Eritrosit esteraz aktivitesi ileri yaşta korunduğu için kesilme sonrası toparlanma hızı genç erişkinlerle benzerdir.',
        ]}
        obesityWeightScalarBadge="LBW (Tercih) · Konservatif IBW"
        obesityPoints={[
          'Esmolol hidrofilik bir ajandır; dağılım hacmi ve kan hacmi obezitede toplam vücut ağırlığıyla (TBW) doğrusal artmaz.',
          'BMI ≥ 35–40 kg/m² morbid obez hastalarda TBW üzerinden hesaplanan 0,5–1 mg/kg bolus dozları (örn. 140 kg için 140 mg!) aşırı bradikardi ve kardiyak depresyona yol açabilir.',
          'SOBA ve anestezi farmakoloji prensipleri gereği yükleme ve başlangıç infüzyonunda Yağsız Vücut Ağırlığı (LBW) veya İdeal Vücut Ağırlığı (IBW) kullanılmalı, idame kalp hızı ve KB yanıtına göre titre edilmelidir.',
        ]}
        clinicalNote="İleri anemide (Hgb <6–7 g/dL) toplam eritrosit kütlesi azaldığı için teorik olarak esteraz kapasitesi bir miktar düşebilir; yine de klinik eliminasyon çok hızlıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK, OBSTETRİK & LAKTASYON                                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="FDA Gebelik Kategorisi C · Plasentayı hızla geçer; fetal bradikardi ve fetal asidoz riski nedeniyle obstetrikte 1. tercih değildir."
        pregnancyDetails={[
          'Esmolol plasentayı kolayca geçer; maternal infüzyon sırasında fetal kalp hızı (FKH) bazalinde düşüş, beat-to-beat variabilitede kayıp ve fetal hipotansiyon/hipoksemi bildirilmiştir.',
          'Şiddetli preeklampsi/eklampsi hipertansiyonunda 1. tercih ajanlar Labetalol, Nikardipin veya Hidralazindir; esmolol yalnızca hayatı tehdit eden maternal taşiaritmi, tiroid fırtınası veya akut aort diseksiyonu acillerinde sürekli FKH monitörizasyonu altında kullanılır.',
          'Doğum anında uygulanmışsa yenidoğanda ilk 24 saat geçici bradikardi, hipotansiyon ve hipoglisemi izlemi yapılmalıdır (yarı ömrü kısa olduğu için uzun etkili beta-blokerlere kıyasla risk daha kısa sürelidir).',
        ]}
        lactationSummary="Anne sütüne geçiş verisi sınırlıdır; ancak 9 dk yarı ömrü ve çok düşük oral biyoyararlanımı nedeniyle tek doz/kısa infüzyon sonrası emzirmeye uzun ara gerekmez."
        lactationDetails={[
          'Esmolol ester yapısı nedeniyle yenidoğanın GİS ve kan esterazlarıyla hızla yıkılır; kısa perioperatif uygulamadan 1–2 saat sonra maternal dolaşımda aktif ilaç kalmaz.',
          'Uzun süreli YBÜ infüzyonlarında anne klinik olarak stabilize olana kadar takip önerilir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖNEMLİ OLUMSUZ ETKİLER                                          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Hipotansiyon (En Sık)',
            incidenceOrSeverity: '%12 – %44',
            tone: 'rose',
            detail:
              'Doz-bağımlıdır; özellikle >200 mcg/kg/dk infüzyonda, hipovolemide ve genel anestezi altında sık görülür. İnfüzyonu azaltmak/kesmekle 10–30 dk içinde düzelir.',
          },
          {
            title: 'Bradikardi & AV İleti Bloğu',
            incidenceOrSeverity: '%1 – %5',
            tone: 'rose',
            detail:
              'Sinüs bradikardisi, sinüs duraklaması veya 1.–3. derece AV blok. Yaşlılarda ve eşzamanlı amiodaron/digoksin/Ca²⁺ kanal blokeri kullanımında risk katlanır.',
          },
          {
            title: 'İnfüzyon Yeri Flebiti & Nekroz',
            incidenceOrSeverity: '%2 – %8',
            tone: 'amber',
            detail:
              '>10 mg/mL konsantrasyonlarda periferik venöz inflamasyon, tromboflebit, bül ve ekstravazasyon nekrozu; 20 mg/mL yalnızca SVK ile uygulanır.',
          },
          {
            title: 'Bronkospazm (Yüksek Dozda)',
            incidenceOrSeverity: '>300 mcg/kg/dk',
            tone: 'amber',
            detail:
              'Terapötik dozlarda kardiyoselektiftir; ancak >300 mcg/kg/dk’da β₂ reseptör blokajıyla astım/KOAH hastalarında ani hışıltı ve hava yolu direnci artışı gelişebilir.',
          },
          {
            title: 'Akut Kalp Yetmezliği Dekompansasyonu',
            incidenceOrSeverity: 'Yüksek Riskli Grup',
            tone: 'rose',
            detail:
              'Sistolik disfonksiyonlu (düşük EF) sempatik sürücüye bağımlı kalpte ani negatif inotropi ile düşük debi sendromu ve pulmoner ödem.',
          },
          {
            title: 'Hiperkalemi & Hipoglisemi Maskelenmesi',
            incidenceOrSeverity: 'Metabolik',
            tone: 'indigo',
            detail:
              'β₂-aracılı hücre içi K⁺ alımını hafifçe azaltabilir (böbrek yetmezliğinde dikkat); diyabetiklerde hipogliseminin taşikardi uyarısını maskeler.',
          },
          {
            title: 'SSS & GİS Semptomları',
            incidenceOrSeverity: '%1 – %7',
            tone: 'teal',
            detail:
              'Uyanık hastada baş dönmesi, somnolans, konfüzyon, ajitasyon, bulantı ve diaforez (özellikle hızlı hipotansiyon ataklarına ikincil).',
          },
          {
            title: 'Periferik Vazospazm / Soğuk Ekstremite',
            incidenceOrSeverity: '%1 – %2',
            tone: 'indigo',
            detail:
              'Ağır periferik arter hastalığı veya Raynaud fenomeni olanlarda kardiyak debi düşüşü ve karşılanmamış α-tonus ile periferik perfüzyon azalması.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Akut Aort Diseksiyonu: ÖNCE Esmolol, SONRA Vazodilatatör!',
            detail:
              'Vazodilatatör (Nikardipin/Nitroprussid) tek başına başlanırsa baroreseptör refleks taşikardi sol ventrikül dP/dt makaslama stresini artırarak aort yırtığını genişletir. Önce esmolol ile KH <60/dk sağlanır, ardından SKB >120 mmHg ise Nikardipin eklenir.',
          },
          {
            title: 'Feokromositoma & Kokain Krizinde Karşılanmamış α₁ Tuzağı',
            detail:
              'Katekolamin fırtınasında esmolol tek başına verilirse periferik β₂ vazodilatasyon kapanır, α₁ vazokonstriksiyon rakipsiz kalır ve kan basıncı paradoksal olarak fırlar. Önce Fentolamin / Fenoksibenzamin / Nikardipin ile α-blokaj veya vazodilatasyon kurulmalıdır.',
          },
          {
            title: 'Sepsis / Septik Şokta Esmolol (Morelli Protokolü)',
            detail:
              'Yeterli sıvı resüsitasyonu tamamlanmış, noradrenalin altında persistan sinüs taşikardisi (>95–110/dk) ve hiperdinamik sol ventrikülü olan seçilmiş septik şok hastalarında düşük doz esmolol (25–100 mcg/kg/dk; yüklemesiz!) diyastolik dolum ve atım hacmini iyileştirebilir — ancak hipovolemik veya düşük debili şokta YASAKTIR!',
          },
          {
            title: 'Uzun Etkili Oral / IV Beta-Blokere Güvenli Geçiş (Köprü Protokolü)',
            detail:
              'Oral/IV metoprolol, propranolol veya diltiazem ilk dozu verildikten 30 dk sonra esmolol infüzyonu %50 azaltılır; ikinci dozdan sonra 1 saat boyunca KH/KB stabil kalırsa esmolol tamamen kesilir.',
          },
          {
            title: 'Opioid-Koruyucu & Anestezik Gereksinimini Azaltıcı Etkisi',
            detail:
              'İntraoperatif esmolol infüzyonu (50–150 mcg/kg/dk) MAC ve propofol/remifentanil gereksinimini %15–25 azaltır, postoperatif ağrı ve bulantı-kusma (PONV) skorlarını düşürür — bu nedenle BIS/anestezi derinliği monitörizasyonu altında hemodinamik yanıt yanıltıcı olmamalıdır.',
          },
          {
            title: 'Refrakter Ventriküler Fibrilasyon / Elektriksel Fırtına',
            detail:
              'Katekolamin bağımlı refrakter VF/polimorfik VT (elektriksel fırtına) olgularında amiodaron ve defibrilasyona yanıtsız vakalarda 500 mcg/kg IV esmolol bolusu → 50–100 mcg/kg/dk infüzyon kurtarma seçeneği olarak literatürde yer alır.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. DERİN FARMAKODİNAMİK ANALİZ (4 KADEMELİ AKORDİYON, KAPALI)      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (Kardiyak β₁-Adrenoseptör Kompetitif Antagonizması · β₁:β₂ ≈ 33:1)',
          summary:
            'Esmolol (metil 3-[4-[2-hidroksi-3-(izopropilamino)propoksi]fenil]propanoat), para-pozisyonunda hızla hidrolize olabilen metil-ester yan zinciri taşıyan bir ariloksipropanolamin türevidir. Kardiyomiyosit ve kalp ileti dokusundaki 7-transmembran (7-TM) G-proteini kenetli β₁-adrenoseptörün ortosterik katekolamin bağlanma cebine (TM3 Asp138, TM5 Ser228/232, TM7 Asn363) yüksek afiniteyle ve geri dönüşümlü olarak bağlanır; intrinsik sempatomimetik aktivitesi (ISA = 0) ve sınıf I benzeri membran stabilize edici lokal anestezik etkisi yoktur (Miller’s / Stoelting’s / Goodman & Gilman).',
          points: [
            'β₁-Adrenoseptör Seçiciliği & Doz-Bağımlı Selektivite Penceresi: İnsan miyokardında β₁ reseptörlerine afinitesi bronşiyal/vasküler β₂ reseptörlerine göre yaklaşık 33–40 kat yüksektir. Ancak kompetitif antagonizmada selektivite mutlak değildir; plazma konsantrasyonu yükseldiğinde (>200–300 mcg/kg/dk infüzyon) β₂ bağlanma cebini de işgal etmeye başlar.',
            'Hızlı Disosiyasyon Kinetiği (k_off) & Eritrosit Esteraz Erişimi: Düşük lipofilisitesi (logP ≈ 1,8) ve hızlı reseptör ayrışma kinetiği sayesinde, kanda serbest esmolol eritrosit içi arilesteraz/karboksilesterazlarla parçalandığı anda reseptör fraksiyonel işgali hızla düşer — aktif blokaj doğrudan dakika bazlı plazma konsantrasyonunu izler.',
            'Jukstaglomerüler Aparat (Renal β₁-Adrenoseptör): Böbrek afferent arteriyol duvarındaki jukstaglomerüler granüler hücre zarındaki β₁ reseptörlerini bloke ederek sempatik aracılı renin sekresyonunu baskılar.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & İyon Kanalı Dinamiği',
          summary:
            'Endojen adrenalin/noradrenalinin β₁ reseptörüne bağlanmasını engelleyen esmolol, heterotrimerik Gαs proteininde GDP→GTP değişimini durdurarak kardiyak hücre içi cAMP/PKA eksenini aşağı yönlü kilitler:',
          points: [
            'SA Düğüm Pacemaker Hücresi (cAMP↓ → HCN4 If & Cav1.2/1.3 Azalması): Adenilat siklaz Tip V/VI inhibisyonu hücre içi [cAMP] düzeyini düşürür. cAMP’nin doğrudan HCN4 (hiperpolarizasyonla aktive olan siklik nükleotid kapılı) kanallarına bağlanması azalır → Faz 4 diyastolik spontan depolarizasyon akımı (If) yavaşlar, eşik potansiyele ulaşma süresi uzar ve sinüs hızı düşer.',
            'AV Düğüm İleti Hücresi (PKA↓ → L-Tipi Ca²⁺ Kanalı Cav1.2 İnhibisyonu): PKA aktivitesi düştüğünde AV düğüm aksiyon potansiyeli Faz 0 yükselmesini sağlayan L-tipi Ca²⁺ akımı (ICa,L) baskılanır → ileti hızı yavaşlar, PR aralığı ve AV düğüm efektif refrakter periyodu (ERP) uzar; re-entrant SVT devreleri kırılır ve AF’de ventriküle geçen impuls sayısı azalır.',
            'Ventriküler Kardiyomiyosit (RyR2 / SERCA2a / Cav1.2 Modülasyonu): PKA-aracılı L-tipi Ca²⁺ kanalı ve sarkoplazmik retikulum (SR) Riyanodin Reseptörü-2 (RyR2) fosforilasyonu azalır → Ca²⁺-aracılı Ca²⁺ salınımı (CICR) ve pik sistolik [Ca²⁺]i düşer (negatif inotropi, dP/dt↓). Eşzamanlı olarak Fosfolamban (PLB) fosforilasyonu azaldığından SERCA2a Ca²⁺ geri alımı hafifçe yavaşlar; ancak kalp hızının belirgin düşmesi net diyastolik dolum süresini uzatır.',
            'Kardiyomiyosit Metabolik Koruma (MVO₂↓ & Serbest Yağ Asidi Oksidasyonu↓): Sempatik aşırılığın yol açtığı sarkolemmal Ca²⁺ aşırı yüklenmesini, gecikmiş art-depolarizasyonları (DAD) ve mitokondriyal oksidatif stresi azaltır.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Miyokard, İleti Sistemi & Koroner Dolaşım → Kardiyovasküler Fizyoloji',
            tissueTarget: 'SA/AV Düğüm · Ventrikül Miyokardı · Subendokardiyal Koroner Yatak',
            accent: 'indigo',
            points: [
              'Miyokardiyal Oksijen Arz/Talep Dengesi: Kalp hızı (KH↓) ve duvar gerilimi/kontraktilite (dP/dt↓) azaldığı için MVO₂ dramatik biçimde düşer; aynı anda diyastolik sürenin uzaması özellikle sol ventrikül subendokardiyal koroner perfüzyonunu belirgin artırır.',
              'Aort Duvarı Makaslama Stresi (Anti-İmpuls Etki): Akut aort diseksiyonunda intimal flebin ilerlemesinin birincil mekanik sürücüsü sistolik basınç yükselme hızıdır (dP/dt). Esmolol bu eğimi dakikalar içinde düzleştirerek rüptür ve malperfüzyon riskini azaltır.',
              'Periferik Vasküler Direnç (SVR): Doğrudan α-blokajı yoktur; akut kardiyak debi düşüşüne karşı baroreseptör refleksle SVR hafifçe artabilir (bu nedenle α-blokajsız feokromositomada tehlikelidir).',
            ],
          },
          {
            systemTitle: 'Bronşiyal Düz Kas & Pulmoner Vasküler Doku → Solunum Sistemi',
            tissueTarget: 'Bronşiyol β₂ Düz Kas · Pulmoner Kapiller Yatak',
            accent: 'sky',
            points: [
              'Düşük/Orta Dozlarda Hava Yolu Korunması: ≤200 mcg/kg/dk konsantrasyonlarda bronşiyal düz kas β₂ reseptörleri (Gs → cAMP↑ → MLCK inhibisyonu → bronkodilatasyon) büyük ölçüde etkilenmez; hafif-orta KOAH’ta non-selektif beta-blokerlere (propranolol) göre belirgin üstündür.',
              'Yüksek Doz Selektivite Kaybı (>300 mcg/kg/dk): Bronşiyal β₂ blokajı geliştiğinde vagal kolinerjik (M₃) tonus karşılanmasız kalır ve reaktif hava yolu hastalarında ani bronkokonstriksiyon/ekspiratuar wheezing ortaya çıkar.',
              'Hızlı Reversibilite Avantajı: Bronkospazm gelişirse infüzyonun kesilmesiyle 10–20 dk içinde blokaj hızla geriler ve inhale β₂-agonistlere (salbutamol) yanıt kısa sürede geri kazanılır.',
            ],
          },
          {
            systemTitle: 'Renal Jukstaglomerüler Aparat & Endokrin Doku → Böbrek & Metabolizma',
            tissueTarget: 'JG Hücre (β₁) · Pankreas Adacık · Hepatosit / İskelet Kası',
            accent: 'teal',
            points: [
              'RAAS Baskılanması (Renin↓): Jukstaglomerüler hücre β₁ blokajı plazma renin aktivitesini ve anjiyotensin II üretimini azaltarak antihipertansif etkiye ikincil katkı sağlar.',
              'Glukoz & Potasyum Homeostazı: Kardiyoselektif olduğu için hepatik/kas β₂ glikojenolizini propranolol kadar şiddetli baskılamaz; ancak hipogliseminin otonomik taşikardi belirtisini gizler ve böbrek yetmezliğinde serum K⁺ düzeyini hafifçe yükseltebilir.',
              'Tiroid Fırtınasında Periferik T₄→T₃ Farkı: Propranololün aksine esmolol periferik Tip-1 deiyodinaz (T₄→T₃ dönüşümü) inhibisyonunda güçlü değildir; ancak ultra-hızlı kardiyak hız kontrolü ve güvenliği nedeniyle dekompanse tiroid fırtınasında YBÜ köprüsü olarak paha biçilmezdir.',
            ],
          },
          {
            systemTitle: 'Santral Sinir Sistemi & Perioperatif Nosisepsiyon → Nöro-Anestezi Etkileşimi',
            tissueTarget: 'KBB · Sempatik Çıkış · İntraoperatif Stres Yanıtı',
            accent: 'violet',
            points: [
              'Düşük Lipofilisite & Sınırlı KBB Geçişi: Propranolole kıyasla kan-beyin bariyerini (KBB) az geçer; ancak perioperatif dönemde spinal/supraspinal sempatik stres deşarjını ve katekolamin kaynaklı uyanma reaksiyonlarını belirgin azaltır.',
              'Anestezik & Opioid Tasarrufu: İntraoperatif esmolol infüzyonunun volatil MAC ve propofol/opioid gereksinimini azalttığı, postoperatif ilk 24 saatlik opioid tüketimi ve PONV insidansını düşürdüğü çok sayıda randomize çalışmada gösterilmiştir.',
              'İntrakraniyal Basınç (ICP) Koruması: Laringoskopi ve kraniyotomi pin yerleştirilmesi sırasındaki ani MAP/KH sıçramalarını serebral vazodilatasyon (ICP artışı) yapmadan köreltir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Taşiflaksi Yokluğu, Sinerjik Kombinasyonlar & Tavan Etkisi',
          summary:
            'Esmolol hızlı metabolize edilen saf bir kompetitif antagonist olduğundan taşiflaksi geliştirmez; ancak doz-yanıt eğrisi ~200 mcg/kg/dk civarında plato çizmeye başlar ve üzerindeki artışlar terapötik faydadan çok hipotansiyon ve β₂ selektivite kaybı getirir.',
          points: [
            'SVT/AF Hız Kontrolünde 200 mcg/kg/dk Platosu: Plazma konsantrasyon-yanıt analizleri, atriyal fibrilasyon/SVT’de ventrikül hızı düşüşünün 50–200 mcg/kg/dk arasında doygunluğa ulaştığını; >200 mcg/kg/dk’nın ek hız düşüşü sağlamadan semptomatik hipotansiyon riskini artırdığını göstermiştir (HT için tavan 300 mcg/kg/dk).',
            'Vazodilatatör (Nikardipin / Clevidipin) Sinerjisi: Akut aort diseksiyonu ve şiddetli perioperatif hipertansiyonda esmolol (β₁: KH↓, dP/dt↓) + dihidropiridin Ca²⁺ blokeri (arteriyoler SVR↓) fizyolojik olarak mükemmel tamamlayıcıdır — esmolol dihidropiridinin refleks taşikardisini tamamen engeller.',
            'Tehlikeli Dromotropik Sinerji (Verapamil / Diltiazem / Amiodaron / Digoksin): AV düğümü iki farklı mekanizmayla (L-tipi Ca²⁺ direkt blokajı + cAMP/PKA baskılanması) aynı anda kilitlemek yüksek dereceli AV blok, derin bradikardi ve asistoliye yol açar.',
          ],
        }}
        clinicalPearls={[
          'Eritrosit Esterazı ≠ Plazma Psödokolinesterazı: Board sınavlarının klasik tuzağıdır! Esmolol süksinilkolin ile aynı enzimle yıkılmaz; atipik psödokolinesteraz eksikliğinde esmolol etkisi UZAMAZ.',
          'Yükleme Yapmadan Kararlı Durum 20–30 dk Sürer: Acil taşiaritmi veya aort diseksiyonunda 500 mcg/kg (1 dk) yükleme verilmeden sadece 50 mcg/kg/dk infüzyon açılırsa tam etki 20–30 dk gecikir; ancak kırılgan/yaşlı veya sınırda hipotansif hastada yüklemeyi atlamak daha güvenlidir.',
          'Glukagon Kurtarma Mekanizması: Ağır beta-bloker toksisitesinde adrenalin/dobutamin bloke β₁ reseptörünü aşmakta zorlanır; Glukagon (3–5 mg IV bolus → 1–5 mg/sa) kalpteki ayrı Gs-kenetli glukagon reseptörüne bağlanarak β₁’i bypass eder ve cAMP/kontraktiliteyi geri döndürür.',
          'Esmolol + Fallot Tetralojisi Hipersiyanotik Spell: Bebeklerde sağ ventrikül çıkış yolu (RVOT) infundibüler kas spazmı katekolaminle ağırlaşır; esmolol bu dinamik obstrüksiyonu çözerek pulmoner kan akımını ve SpO₂’yi hızla artırır.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Esmolol Hidroklorür"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'IV Verapamil · IV Diltiazem (Non-Dihidropiridin Ca²⁺ Kanal Blokerleri)',
            mechanism: 'Çift Yönlü AV Düğüm & Miyokardiyal Negatif İnotropi/Kronotropi Sinerjisi',
            clinicalEffect: 'Şiddetli bradikardi, 3. derece AV blok, derin hipotansiyon, kardiyojenik şok ve ölümcül asistoli riski.',
            management: 'Eşzamanlı veya birbirini izleyen kısa süre içinde IV uygulamadan KESİNLİKLE kaçının (yüksek riskli kontrendike kombinasyon).',
          },
          {
            severity: 'X',
            agent: 'Sodyum Bikarbonat (%8,4 NaHCO₃) — Aynı IV Lümen / Y-Site',
            mechanism: 'Alkali Ortamda Hızlı Ester Hidrolizi & Kimyasal İnaktivasyon',
            clinicalEffect: 'Esmolol infüzyon hattında hızla hidrolize olup etkisini kaybeder; ani taşikardi ve hipertansiyon reboundu gelişir.',
            management: 'Asla aynı lümenden vermeyin; esmololü mutlaka ayrı hattan veya SF/D5W taşıyıcı ile uygulayın.',
          },
          {
            severity: 'D',
            agent: 'Digoksin · Amiodaron · İvabradin · Deksmedetomidin · Klonidin',
            mechanism: 'Aditif SA/AV Düğüm Süpresyonu & Sempatoliz (Digoksin düzeyinde %10–20 artış)',
            clinicalEffect: 'Ağır sinüs bradikardisi, PR uzaması, AV blok ve derin hipotansiyon riski artar.',
            management: 'Sürekli EKG ve kan basıncı izlemi altında yükleme dozunu azaltın veya atlayın; düşük infüzyon hızıyla (25–50 mcg/kg/dk) başlayın.',
          },
          {
            severity: 'D',
            agent: 'Adrenalin · Noradrenalin · Fenilefrin · Kokain (Katekolaminler)',
            mechanism: 'β₂ Vazodilatasyonun Kapanması → Karşılanmamış α₁ Vazokonstriksiyon',
            clinicalEffect: 'Esmolol altında yüksek doz epinefrin veya kokain maruziyeti şiddetli hipertansiyon ve derin refleks bradikardiye yol açabilir; anafilakside epinefrin yanıtı körelebilir.',
            management: 'Feokromositoma/kokain krizinde önce α-blokaj/vazodilatasyon sağlayın; beta-bloker altındaki anafilakside refrakter şokta Glukagon ekleyin.',
          },
          {
            severity: 'C',
            agent: 'Morfin · Remifentanil · Propofol · Volatil Anestezikler',
            mechanism: 'Farmakodinamik Hemodinamik Sinerji & Anestezik Tasarrufu (Morfin esmolol düzeyini ~%46 artırabilir)',
            clinicalEffect: 'İndüksiyon ve idame sırasında daha belirgin kan basıncı düşüşü ve bradikardi; anestezik gereksiniminde azalma.',
            management: 'Hemodinamik ve anestezi derinliği monitörizasyonu altında kademeli titre edin; hipovolemiyi önceden düzeltin.',
          },
          {
            severity: 'C',
            agent: 'Süksinilkolin (Süksametonyum)',
            mechanism: 'Hafif Nöromüsküler Blok Uzaması (~3–5 dk; esteraz farkına rağmen klinik etkileşim)',
            clinicalEffect: 'Esmolol psödokolinesterazla yıkılmasa da süksinilkolin nöromüsküler bloğunun süresini hafifçe (yaklaşık 5–8 dk → 8–12 dk) uzatabilir.',
            management: 'Klinik pratikte genellikle anlamlı sorun yaratmaz; TOF nöromüsküler monitörizasyonu ile rutin takip yeterlidir.',
          },
        ]}
        references={[
          {
            authors: 'Isselbacher EM, Preventza O, Hamilton Black J 3rd, et al.',
            title: '2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease.',
            journal: 'Circulation',
            year: 2022,
            note: 'Akut aort diseksiyonunda anti-impuls tedavi olarak 1. basamak IV beta-bloker (Esmolol / Labetalol) ile önce KH <60/dk, sonra SKB 100–120 mmHg hedefi (Sınıf I).',
          },
          {
            authors: 'Morelli A, Ertmer C, Westphal M, et al.',
            title: 'Effect of Heart Rate Control With Esmolol on Hemodynamic and Clinical Outcomes in Patients With Septic Shock: A Randomized Clinical Trial.',
            journal: 'JAMA',
            year: 2013,
            note: 'Yeterli resüsitasyon sonrası persistan taşikardili septik şok hastalarında titre edilen esmololün kalp hızı (80–94/dk), atım hacmi ve hemodinami üzerindeki etkileri.',
          },
          {
            authors: 'Joglar JA, Chung MK, Armbruster AL, et al.',
            title: '2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation.',
            journal: 'Circulation',
            year: 2024,
            note: 'Akut hızlı ventrikül yanıtlı atriyal fibrilasyonda hızlı titre edilebilir IV beta-bloker (Esmolol) kullanım önerileri ve dekompanse KKY/WPW kontrendikasyonları.',
          },
          {
            authors: 'Wiener-Kronish JP, Gropper MA, Eriksson LI, Fleisher LA, Leslie K, Cohen NH (Eds.).',
            title: "Miller's Anesthesia (9th–10th Edition) — Perioperative Beta-Adrenergic Antagonists & Cardiovascular Pharmacology.",
            journal: 'Elsevier',
            year: 2024,
            note: 'Esmolol eritrosit sitozolik esteraz hidrolizi (t½ 9 dk), β₁ selektivite penceresi, perioperatif laringoskopi yanıtı ve opioid-koruyucu farmakodinamik verileri.',
          },
          {
            authors: 'Baxter Healthcare / TİTCK KÜB.',
            title: 'Brevibloc® (Esmolol Hydrochloride) Intravenous Solution — Official Prescribing Information & SmPC.',
            journal: 'FDA / TİTCK',
            year: 2023,
            note: '100 mg/10 mL hazır flakon, 2500 mg/250 mL premiks ve 2500 mg/10 mL konsantre ampul seyreltme kuralları, 10 mg/mL periferik sınırı ve 4 dakikalık SVT titrasyon şeması.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/esmolol.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};
