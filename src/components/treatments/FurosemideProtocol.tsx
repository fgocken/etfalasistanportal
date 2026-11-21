import React, { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Droplet,
  Ear,
  Gauge,
  HeartPulse,
  Pill,
  ShieldAlert,
  Stethoscope,
  Syringe,
  Zap,
} from 'lucide-react';
import {
  AdverseEffectsBlock,
  ContraindicationsGridBlock,
  DrugReferencesAndInteractionsBlock,
  HighAlertSafetyBlock,
  MechanismOfActionBlock,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
} from './shared/DrugMonographBlocks';

interface Props {
  isDark: boolean;
}

type CalcTab = 'bolus' | 'infusion' | 'fst';
type BolusScenario = 'adhf_edema' | 'taco_overload' | 'hyperkalemia' | 'pediatric_edema';
type InfusionPrep = 'pure_10' | 'conc_4' | 'conc_2';

export const FurosemideProtocol: React.FC<Props> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<CalcTab>('bolus');
  const [pkOpen, setPkOpen] = useState<boolean>(true);

  // 1. Bolus / ESC-DOSE State
  const [bolusScenario, setBolusScenario] = useState<BolusScenario>('adhf_edema');
  const [weightKg, setWeightKg] = useState<number>(75);
  const [isLoopNaive, setIsLoopNaive] = useState<boolean>(true);
  const [homeOralDailyMg, setHomeOralDailyMg] = useState<number>(40);
  const [eGfr, setEGfr] = useState<number>(65);
  const [serumK, setSerumK] = useState<number>(4.1);
  const [serumAlbumin, setSerumAlbumin] = useState<number>(3.4);
  const [mapMmHg, setMapMmHg] = useState<number>(78);

  // 2. Continuous Infusion State
  const [infusionIsPediatric, setInfusionIsPediatric] = useState<boolean>(false);
  const [infusionRateMgHr, setInfusionRateMgHr] = useState<number>(10);
  const [pedsInfusionMgKgHr, setPedsInfusionMgKgHr] = useState<number>(0.1);
  const [infusionPrep, setInfusionPrep] = useState<InfusionPrep>('pure_10');

  // 3. FST (Furosemide Stress Test) State
  const [fstWeightKg, setFstWeightKg] = useState<number>(75);
  const [fstPriorLoop, setFstPriorLoop] = useState<boolean>(false);
  const [fstUrine2hMl, setFstUrine2hMl] = useState<number>(240);

  const weightInputId = useId();
  const oralHomeId = useId();
  const egfrId = useId();
  const kId = useId();
  const albId = useId();
  const mapId = useId();
  const infRateId = useId();
  const fstWtId = useId();
  const fstUrineId = useId();

  // --- BOLUS HESAPLAMALARI ---
  const isHypotensive = mapMmHg < 65;
  const isSevereHypokalemic = serumK < 3.0;
  const isHypokalemic = serumK < 3.5;
  const isHypoalbuminemic = serumAlbumin < 2.5;
  const isCkdThreshold = eGfr < 30;

  const getBolusRecommendation = () => {
    if (bolusScenario === 'pediatric_edema') {
      const pedWt = Math.min(weightKg, 60);
      const doseMg = Math.min(80, Math.round(pedWt * 1.0));
      const ampCount = doseMg / 20;
      const volMl = doseMg / 10;
      return {
        title: 'Pediatrik Akut Ödem / Volüm Yükü',
        doseMg,
        rangeText: `${doseMg} mg IV (1 mg/kg; yanıt yetersizse 2 sa sonra +1 mg/kg, maks 6 mg/kg/gün)`,
        ampText: `${ampCount.toFixed(1)} ampul (20 mg/2 mL) = ${volMl.toFixed(1)} mL`,
        speedText: 'Yavaş IV puşe: maks 0,5 mg/kg/dk (veya ≤ 4 mg/dk; en az 2–5 dk)',
        monitor: '2 saat içinde idrar çıkışı (hedef > 1–2 mL/kg/sa), K⁺, Mg²⁺ ve kan basıncı takibi.',
      };
    }

    if (bolusScenario === 'taco_overload') {
      const baseMg = isLoopNaive ? (isCkdThreshold ? 40 : 20) : Math.min(160, Math.max(40, homeOralDailyMg));
      const ampCount = baseMg / 20;
      const volMl = baseMg / 10;
      const minMinutes = baseMg > 40 ? Math.ceil(baseMg / 4) : 2;
      return {
        title: 'TACO / Perioperatif Akut Volüm Yüklenmesi',
        doseMg: baseMg,
        rangeText: `${baseMg} mg IV (yanıta göre 20–40 mg ek doz veya infüzyona geç)`,
        ampText: `${ampCount.toFixed(1)} ampul (20 mg/2 mL) = ${volMl.toFixed(1)} mL`,
        speedText: baseMg > 40 ? `Ototoksisite koruması: en az ${minMinutes} dakikada (≤ 4 mg/dk)` : '1–2 dakikada yavaş IV puşe',
        monitor: 'Transfüzyonu/sıvıyı durdur, başı 30–45° yükselt, SpO₂/POCUS akciğer ve saatlik diürez izle.',
      };
    }

    if (bolusScenario === 'hyperkalemia') {
      const baseMg = isCkdThreshold ? 80 : 40;
      const ampCount = baseMg / 20;
      const volMl = baseMg / 10;
      const minMinutes = baseMg > 40 ? Math.ceil(baseMg / 4) : 2;
      return {
        title: 'Hiperkalemi — Renal K⁺ Ekskresyon Desteği',
        doseMg: baseMg,
        rangeText: `${baseMg} mg IV (övolemik / hipervolemik ve rezidüel idrar çıkışı olan hastada)`,
        ampText: `${ampCount.toFixed(1)} ampul (20 mg/2 mL) = ${volMl.toFixed(1)} mL`,
        speedText: baseMg > 40 ? `En az ${minMinutes} dakikada yavaş IV (≤ 4 mg/dk)` : '2 dakikada yavaş IV puşe',
        monitor: 'Unutma: Furosemid membran stabilizasyonu YAPMAZ; K⁺ > 6,0 veya EKG değişikliğinde önce Ca-glukonat + insülin/dekstroz ver! Hipovolemide eş zamanlı %0,9 NaCl ile övolemiyi koru.',
      };
    }

    // adhf_edema (ESC 2021 / DOSE NEJM 2011)
    let doseLow = 20;
    let doseHigh = 40;
    if (!isLoopNaive) {
      // ESC & DOSE: 1x - 2.5x chronic total daily oral furosemide dose as IV
      doseLow = Math.max(40, Math.round(homeOralDailyMg));
      doseHigh = Math.min(200, Math.round(homeOralDailyMg * 2));
    } else if (isCkdThreshold) {
      doseLow = 40;
      doseHigh = 80;
    }
    const suggestedMg = Math.min(200, isCkdThreshold ? doseHigh : doseLow);
    const ampCount = suggestedMg / 20;
    const volMl = suggestedMg / 10;
    const minMinutes = suggestedMg > 40 ? Math.ceil(suggestedMg / 4) : 2;

    return {
      title: 'Akut Pulmoner Ödem / Dekompanse Kalp Yetmezliği (ESC / DOSE)',
      doseMg: suggestedMg,
      rangeText: `${doseLow}–${doseHigh} mg IV başlangıç (Önerilen ilk doz: ${suggestedMg} mg IV)`,
      ampText: `${ampCount.toFixed(1)} ampul (20 mg/2 mL) = ${volMl.toFixed(1)} mL`,
      speedText:
        suggestedMg > 40
          ? `Ototoksisite koruması (≤ 4 mg/dk): en az ${minMinutes} dakikada IV infüzyon`
          : '1–2 dakikada yavaş IV puşe',
      monitor:
        'ESC 2021 Hedefi: 2. saatte spot idrar Na⁺ > 50–70 mEq/L veya 6 saatte idrar çıkışı > 100–150 mL/saat. Yanıt yetersizse dozu 2 katına çık (tavan 200 mg/doz) veya Tiyazid (CLOROTIC) / Asetazolamid (ADVOR) ekle!',
    };
  };

  const bolusRec = getBolusRecommendation();

  // --- SÜREKLİ İNFÜZYON HESAPLAMALARI ---
  const effectiveInfMgHr = infusionIsPediatric
    ? Number((Math.min(weightKg, 60) * pedsInfusionMgKgHr).toFixed(2))
    : infusionRateMgHr;
  const prepConcMgMl = infusionPrep === 'pure_10' ? 10 : infusionPrep === 'conc_4' ? 4 : 2;
  const pumpRateMlHr = effectiveInfMgHr / prepConcMgMl;
  const total24hMg = effectiveInfMgHr * 24;
  const infMgPerMin = effectiveInfMgHr / 60;
  const isOtotoxicRate = infMgPerMin > 4;

  // --- FST HESAPLAMALARI ---
  const fstMgPerKg = fstPriorLoop ? 1.5 : 1.0;
  const fstDoseMg = Math.round(fstWeightKg * fstMgPerKg);
  const fstVolMl = fstDoseMg / 10;
  const fstMinMinutes = fstDoseMg > 40 ? Math.ceil(fstDoseMg / 4) : 2;
  const isFstPassed = fstUrine2hMl >= 200;

  const getReportText = () => {
    if (activeTab === 'bolus') {
      const alerts: string[] = [];
      if (isSevereHypokalemic) alerts.push(`KRİTİK: K⁺ ${serumK} mEq/L (<3,0) — önce KCl replasmanı yap!`);
      else if (isHypokalemic) alerts.push(`UYARI: K⁺ ${serumK} mEq/L (<3,5) — eş zamanlı K⁺ desteği planla.`);
      if (isHypotensive) alerts.push(`UYARI: MAP ${mapMmHg} mmHg (<65) — hipovolemi dışlanmadan agresif diürez yapma!`);
      if (isHypoalbuminemic) alerts.push(`NOT: Albümin ${serumAlbumin} g/dL (<2,5) — tübüler iletim azalır, eşik doz yükselebilir.`);
      if (isCkdThreshold) alerts.push(`RENAL: eGFR ${eGfr} mL/dk (<30) — tavan doz yükselir; ototoksisite için ≤ 4 mg/dk uygula.`);

      return [
        'FUROSEMİD (furoSEMIDE) YATAK BAŞI BOLUS RAPORU',
        `Senaryo: ${bolusRec.title} | Kilo: ${weightKg} kg | eGFR: ${eGfr} mL/dk | K⁺: ${serumK} mEq/L | Alb: ${serumAlbumin} g/dL | MAP: ${mapMmHg} mmHg`,
        `Önerilen Doz: ${bolusRec.rangeText}`,
        `Hazırlama: ${bolusRec.ampText}`,
        `Uygulama Hızı: ${bolusRec.speedText}`,
        `İzlem: ${bolusRec.monitor}`,
        alerts.length ? `Güvenlik Uyarıları:\n- ${alerts.join('\n- ')}` : 'Güvenlik Taraması: Belirgin kontrendikasyon saptanmadı.',
      ].join('\n');
    }

    if (activeTab === 'infusion') {
      const prepLabel =
        infusionPrep === 'pure_10'
          ? 'Saf 10 mg/mL (500 mg / 50 mL enjektör — ışıktan koru!)'
          : infusionPrep === 'conc_4'
            ? '4 mg/mL (200 mg / 50 mL SF — 10 ampul)'
            : '2 mg/mL (100 mg / 50 mL SF — 5 ampul)';
      return [
        'FUROSEMİD SÜREKLİ IV İNFÜZYON POMPA RAPORU',
        `Hasta: ${infusionIsPediatric ? `Pediatrik (${weightKg} kg, ${pedsInfusionMgKgHr} mg/kg/sa)` : 'Erişkin'}`,
        `Zorunlu Başlangıç Yükleme Bolusu: ${infusionIsPediatric ? `${Math.round(Math.min(weightKg, 60) * 1)} mg IV` : '20–40 mg IV bolus'} (tübüler eşiğe ulaşmak için)`,
        `İnfüzyon Hızı: ${effectiveInfMgHr} mg/saat (${total24hMg.toFixed(0)} mg / 24 saat)`,
        `Çözelti: ${prepLabel}`,
        `Pompa Debisi: ${pumpRateMlHr.toFixed(1)} mL/saat`,
        'Güvenlik: Işıktan koruyun, asidik ilaçlarla (katekolaminler, midazolam, dopamin) AYNI LÜMENDEN VERMEYİN!',
      ].join('\n');
    }

    return [
      'FUROSEMİD STRES TESTİ (FST — Chawla Crit Care 2013) RAPORU',
      `Hasta Ağırlığı: ${fstWeightKg} kg | Son 7 Günde Loop Diüretik: ${fstPriorLoop ? 'Evet (1,5 mg/kg)' : 'Hayır / Naif (1,0 mg/kg)'}`,
      `FST Test Dozu: ${fstDoseMg} mg IV (${fstVolMl.toFixed(1)} mL saf ampul · ≥ ${fstMinMinutes} dakikada yavaş IV)`,
      `2 Saatlik İdrar Çıkışı: ${fstUrine2hMl} mL`,
      isFstPassed
        ? 'YORUM: YANITLI (NEGATİF) FST (≥ 200 mL / 2 sa) — Proksimal tübüler sekresyon ve Henle kulpu fonksiyonu korunmuş; KDIGO Evre 3 ABH’ye progresyon riski düşük.'
        : 'YORUM: BAŞARISIZ (POZİTİF) FST (< 200 mL / 2 sa) — KDIGO Evre 3 ABH’ye progresyon ve Renal Replasman Tedavisi (RRT) ihtiyacı açısından YÜKSEK RİSK (Duyarlılık %87, Özgüllük %84).',
    ].join('\n');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. KİMLİK & KLİNİK ÖZET HEADER */}
      <section
        id="sec-ozet"
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-cyan-500/30 shadow-xl shadow-cyan-950/20 text-slate-100'
            : 'bg-white border-cyan-200 shadow-lg shadow-cyan-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Droplet className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-mono">
                  Loop (Kıvrım) Diüretiği · NKCC2 İnhibitörü
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: C03CA01
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  LASİX · DESAL 20 mg / 2 mL AMPUL · 40 mg TB
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Furosemid (furoSEMIDE)
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Henle kulpunun çıkan kalın kolunda Na⁺–K⁺–2Cl⁻ (NKCC2) kotransporterını inhibe eden yüksek tavanlı (high-ceiling) loop diüretiği; akut kardiyojenik pulmoner ödem, TACO, yoğun bakım sıvı dengesi, sürekli IV infüzyon, Furosemid Stres Testi (FST) ve hiperkalemi ekskresyon desteği için kanıta dayalı altın standart klinik monografi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 shrink-0 lg:w-80">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                TR Standart Ampul
              </div>
              <div className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-0.5 tabular-nums">
                20 mg / 2 mL
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">10 mg/mL · IV:PO ≈ 1:2</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                IV İnfüzyon (YBÜ)
              </div>
              <div className="text-sm font-bold font-mono text-teal-600 dark:text-teal-400 mt-0.5 tabular-nums">
                5 – 40 mg / saat
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Önce 20–40 mg IV bolus!</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                FST Test Dozu
              </div>
              <div className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-0.5 tabular-nums">
                1,0 – 1,5 mg/kg IV
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">2 sa hedef ≥ 200 mL idrar</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Ototoksisite Sınırı
              </div>
              <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mt-0.5 tabular-nums">
                ≤ 4 mg / dk
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Yüksek dozda yavaş IV</div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <MonographQuickNav
            isDark={isDark}
            items={[
              { id: 'sec-etki', label: 'Etki Mekanizması' },
              { id: 'sec-pkpd', label: 'PK/PD Profili' },
              { id: 'sec-kontrendikasyon', label: 'Kontrendikasyonlar' },
              { id: 'sec-dozlar', label: 'Endikasyon & Dozaj' },
              { id: 'sec-hesaplayici', label: 'Bolus / İnfüzyon / FST' },
              { id: 'sec-uyumluluk', label: 'Hazırlama & Uyumluluk' },
              { id: 'sec-organ', label: 'Böbrek / Karaciğer' },
              { id: 'sec-gebelik', label: 'Gebelik / Laktasyon' },
              { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
              { id: 'sec-ozel-durumlar', label: 'Özel Klinik Durumlar' },
              { id: 'sec-guvenlik', label: 'ISMP & Antidot' },
              { id: 'sec-kaynaklar', label: 'Kaynakça' },
            ]}
          />
        </div>
      </section>

      {/* 2. ETKİ MEKANİZMASI */}
      <MechanismOfActionBlock
        isDark={isDark}
        summary="Furosemid, plazma albüminine >%95 bağlanarak taşınır ve proksimal tübüldeki organik anyon taşıyıcıları (OAT1/OAT3) üzerinden idrar lümenine sekrete edilir. Henle kulpunun çıkan kalın kolunda (TAL) NKCC2 kotransporterını bloke ederek filtre edilen sodyumun %20–25’inin geri emilimini durdurur ve medüller konsantrasyon gradyanını ortadan kaldırır."
        pillars={[
          {
            title: '1. NKCC2 Blokajı & Kalsiürez / Magnezüri',
            detail:
              'Çıkan kalın kolda Na⁺–K⁺–2Cl⁻ geri emiliminin durması lümen-pozitif elektriksel potansiyeli yok eder. Sonuçta güçlü natriürez ve klorüreze ek olarak paraselüler Ca²⁺ ve Mg²⁺ emilimi de düşer (hiperkalsemide faydalı, YBÜ’de hipomagnezemi nedeni!).',
          },
          {
            title: '2. Erken Prostaglandin Aracılı Venodilatasyon',
            detail:
              'IV uygulamadan 5–15 dakika sonra — henüz diürez pik yapmadan — renal PGE₂/PGI₂ salınımını artırarak sistemik venöz kapasitansı genişletir, sol ventrikül preload ve PAOP basıncını hızla indirir. NSAİİ’ler bu etkiyi ve diüretik yanıtı köreltir.',
          },
          {
            title: '3. Eşik (Threshold) Doz & Diüretik Direnci',
            detail:
              'Furosemid “ya hep ya hiç” eşik eğrisine sahiptir: tübüler konsantrasyon eşiği aşmazsa diürez başlamaz. KBH, üremi ve hipoalbüminemi eşik dozu yükseltir; kronik kullanımda distal nefron hipertrofisi (braking fenomeni) gelişir.',
          },
        ]}
      />

      {/* 3. FARMAKOKİNETİK & FARMAKODİNAMİK PROFİLİ */}
      <section
        id="sec-pkpd"
        className={`rounded-2xl border p-5 sm:p-6 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Clock className={`h-5 w-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <div>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Farmakokinetik ve Farmakodinamik (PK/PD) Profili
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                IV:PO = 1:2 dönüşüm · 5 dk venodilatasyon / 30 dk pik diürez · &gt;%95 albümine bağlı · OAT1/3 sekresyonu
              </p>
            </div>
          </div>
          {pkOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {pkOpen && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  <th className="py-2.5 pr-4 font-semibold">Parametre</th>
                  <th className="py-2.5 pr-4 font-semibold">Değer (Erişkin)</th>
                  <th className="py-2.5 font-semibold">Klinik Yorum</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-mono tabular-nums ${isDark ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'}`}>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Oral Biyoyararlanım</td>
                  <td className="py-2.5 pr-4 text-amber-600 dark:text-amber-400 font-bold">~%50 (%10 – %90!)</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">Çok değişkendir; bağırsak ödemi olan kalp yetmezliğinde emilim çöker. 20 mg IV ≈ 40 mg PO kabul edilir.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Etki Başlangıcı / Pik</td>
                  <td className="py-2.5 pr-4 text-cyan-600 dark:text-cyan-400 font-bold">IV: 5 dk / 30 dk · PO: 30–60 dk / 1–2 sa</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">Venodilatasyon 5–15 dk’da başlar; diüretik etki IV bolustan 20–30 dk sonra zirve yapar.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Etki Süresi</td>
                  <td className="py-2.5 pr-4">IV: 2 saat · PO: 6–8 saat</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">Kısa etki süresi nedeniyle aralıklı dozlarda ara dönemlerde “post-diüretik Na⁺ retansiyonu” yaşanabilir.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Protein Bağlanması &amp; Vd</td>
                  <td className="py-2.5 pr-4">%95–99 (Albümin) · Vd 0,1–0,2 L/kg</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">Hipoalbüminemide (&lt;2,5 g/dL) Vd genişler, proksimal tübüle ilaç iletimi düşer ve diüretik yanıt zayıflar.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Eliminasyon Yarı Ömrü (t½)</td>
                  <td className="py-2.5 pr-4">0,5–2 sa (KBH’da 9–24 sa!)</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">İleri KBH ve anüride yarı ömür 10 kat uzar; yüksek pik serum düzeyi koklear stria vascularis’te ototoksisite yapar.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Atılım Yolağı</td>
                  <td className="py-2.5 pr-4">%50–65 Renal (OAT1/3) · %35–50 Glukuronid</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">Glomerüler filtrasyon değil aktif proksimal tübüler sekresyon esastır; renal glukuronidasyon da böbrekte olur.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 4. MUTLAK VE RELATİF KONTRENDİKASYONLAR */}
      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Anüri veya yüksek doz loop diüretiğe kesin yanıtsız oligürik böbrek yetmezliği (gereksiz yüksek doz yalnızca ototoksisite riskini artırır).',
          'Hipovolemi, dehidratasyon, hemorajik/hipovolemik şok veya sıvı yanıtlı hipotansiyon (MAP < 65 mmHg — preload çöküşü ve prerenal ABH!).',
          'Düzeltilmemiş ağır hipokalemi (K⁺ < 3,0 mEq/L) veya ağır hiponatremi (Na⁺ < 125 mEq/L).',
          'Hepatik koma / pre-koma (hipokalemi ve metabolik alkaloz NH₃ üretimini ve beyne geçişini artırarak ensefalopatiyi derinleştirir).',
          'Furosemide veya formülasyon bileşenlerine kanıtlanmış şiddetli aşırı duyarlılık / anafilaksi.',
        ]}
        relativeItems={[
          'Ağır hipoalbüminemi (< 2,5 g/dL) ve nefrotik sendrom (tübüler iletim düşer; nefrotik sendromda seçilmiş vakalarda eş zamanlı %20 albümin + furosemid değerlendirilebilir).',
          'Eş zamanlı ototoksik / nefrotoksik ajanlar: Aminoglikozidler (gentamisin, amikasin), vankomisin, sisplatin — sinerjik işitme kaybı ve ATN riski!',
          'Akut üriner retansiyon / prostat hipertrofisi (mesane sondası olmadan yüksek doz bolus verilmemelidir).',
          'Lityum tedavisi (Na⁺ kaybı proksimal lityum geri emilimini artırarak ciddi lityum toksisitesine yol açar).',
          'NSAİİ kullanımı (prostaglandin blokajıyla hem venodilatasyonu hem diürezi azaltır, ABH’yi tetikler).',
          'Gut / hiperürisemi, kontrolsüz diyabet ve akut pankreatit öyküsü.',
        ]}
        clinicalNote="KDIGO ABH Kılavuzu & Ho–Sheridan Meta-Analizi (BMJ 2006): Furosemid akut böbrek hasarını ÖNLEMEZ ve oligürik ABH’yi non-oligürik forma çevirmek mortaliteyi veya diyaliz ihtiyacını azaltmaz! Yalnızca gerçek volüm yüklenmesi yönetiminde veya standardize Furosemid Stres Testi (FST) amacıyla kullanılmalıdır."
      />

      {/* 5. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ */}
      <section
        id="sec-dozlar"
        className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Stethoscope className={`h-5 w-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Klinik Endikasyonlar ve Kanıta Dayalı Doz Rejimleri
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              ESC 2021 / DOSE · Furosemid Stres Testi (FST) · TACO · Hiperkalemi · Nöroşirürji &amp; Pediatri
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-cyan-500/30' : 'bg-cyan-50/40 border-cyan-200'}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-cyan-700 dark:text-cyan-300">
                <HeartPulse className="w-4 h-4 shrink-0" />
                <span>1. Akut Pulmoner Ödem / ADHF (ESC &amp; DOSE)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold">
                NEJM 2011
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              Naif: 20–40 mg IV · Kronik kullanıcı: 1–2,5× günlük oral doz IV
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              DOSE çalışması yüksek dozun (2,5×) daha hızlı dekonjesyon sağladığını, bolus ile sürekli infüzyon arasında mortalite farkı olmadığını gösterdi. 2 saatte idrar Na⁺ &lt;50–70 mEq/L veya 6 sa idrar &lt;100 mL/sa ise doz 2 katına çıkarılır ya da Tiyazid (CLOROTIC) / Asetazolamid (ADVOR) eklenir.
            </p>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-teal-500/30' : 'bg-teal-50/40 border-teal-200'}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-teal-700 dark:text-teal-300">
                <Gauge className="w-4 h-4 shrink-0" />
                <span>2. YBÜ Sürekli IV İnfüzyon (Dirençli Volüm Yükü)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold">
                20–40 mg Bolus → İnfüzyon
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              20–40 mg IV yükleme + 5–40 mg/saat (Maks ~480–1000 mg/gün)
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              İnfüzyon öncesi yükleme bolusu şarttır. Sabit tübüler konsantrasyon sağlayarak ara dönem Na⁺ retansiyonunu ve hemodinamik dalgalanmayı azaltır; sıvı kısıtlı YBÜ hastasında saf 10 mg/mL (500 mg / 50 mL) enjektör tercih edilir.
            </p>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-indigo-500/30' : 'bg-indigo-50/40 border-indigo-200'}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-indigo-700 dark:text-indigo-300">
                <Activity className="w-4 h-4 shrink-0" />
                <span>3. Furosemid Stres Testi (FST — ABH Prognozu)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold">
                Chawla 2013
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              Naif: 1,0 mg/kg IV · Son 7 günde loop alan: 1,5 mg/kg IV
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Yalnızca övolemik KDIGO Evre 1–2 ABH hastasında uygulanır. 2 saatlik idrar çıkışı <strong>&lt; 200 mL</strong> ise Evre 3 ABH ve RRT progresyonu için yüksek öngörü gücü (AUC 0,87) taşır.
            </p>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-amber-500/30' : 'bg-amber-50/40 border-amber-200'}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-700 dark:text-amber-300">
                <Zap className="w-4 h-4 shrink-0" />
                <span>4. TACO, Hiperkalemi &amp; İntraoperatif Kullanım</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold">
                Perioperatif
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              TACO: 20–40 mg IV · Hiperkalemi: 40–80 mg IV · KİB adjuvan: 0,5–1 mg/kg
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Transfüzyon ilişkili dolaşım yüklenmesinde (TACO) 1. basamak tedavidir (TRALI’de kullanılmaz!). Nöroşirürjide mannitole ek 10–20 mg IV beyin gevşemesi sağlayabilir ancak hipovolemi/elektrolit takibi şarttır.
            </p>
          </div>
        </div>

        <div className={`rounded-xl border p-3.5 text-xs leading-relaxed ${isDark ? 'bg-slate-950/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
          <strong className={isDark ? 'text-white' : 'text-slate-900'}>Pediatrik Doz Özeti: </strong>
          IV/PO başlangıç <span className="font-mono font-semibold">1 mg/kg/doz</span> (yanıt yetersizse 2 sa sonra +1 mg/kg; tek doz tavanı genellikle 2 mg/kg, günlük maks 6 mg/kg/gün). Sürekli IV infüzyon: <span className="font-mono font-semibold">0,05 – 0,4 mg/kg/saat</span> (yenidoğanlarda ototoksisite ve nefrokalsinoz riski nedeniyle 12–24 sa arayla dikkatle uygulanır).
        </div>
      </section>

      {/* 6. ETKİLEŞİMLİ YATAK BAŞI HESAPLAYICI (BOLUS / SÜREKLİ İNFÜZYON / FST) */}
      <section
        id="sec-hesaplayici"
        className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${
          isDark ? 'border-cyan-500/35 bg-slate-900/90' : 'border-cyan-200 bg-white shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Activity className="h-5 w-5 text-cyan-500" />
            <div>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Yatak Başı Doz, İnfüzyon Pompası &amp; Furosemid Stres Testi (FST) Hesaplayıcısı
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                ESC/DOSE bolus hesabı, 20 mg/2 mL ampul dönüşümü, sürekli infüzyon mL/saat ve Chawla FST yorumlayıcısı
              </p>
            </div>
          </div>

          <MonographCopyButton isDark={isDark} getText={getReportText} label="Raporu Kopyala" />
        </div>

        {/* 3 Mode Tabs */}
        <div className={`inline-flex flex-wrap p-1 rounded-xl border gap-1 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          {[
            { id: 'bolus', label: '1. Akut IV Bolus & ESC/DOSE' },
            { id: 'infusion', label: '2. Sürekli IV İnfüzyon Pompası' },
            { id: 'fst', label: '3. Furosemid Stres Testi (FST)' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as CalcTab)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === t.id
                  ? isDark
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-white text-cyan-900 shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: BOLUS */}
        {activeTab === 'bolus' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'adhf_edema', label: 'Akut Pulmoner Ödem / ADHF' },
                { id: 'taco_overload', label: 'TACO / Perioperatif Yük' },
                { id: 'hyperkalemia', label: 'Hiperkalemi Ekskresyon' },
                { id: 'pediatric_edema', label: 'Pediatrik Ödem (mg/kg)' },
              ].map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => {
                    setBolusScenario(sc.id as BolusScenario);
                    if (sc.id === 'pediatric_edema' && weightKg > 45) setWeightKg(18);
                    if (sc.id !== 'pediatric_edema' && weightKg < 40) setWeightKg(75);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                    bolusScenario === sc.id
                      ? isDark
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-cyan-50 border-cyan-500 text-cyan-900'
                      : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-5 space-y-3">
                {(bolusScenario === 'adhf_edema' || bolusScenario === 'taco_overload') && (
                  <div className={`p-1 rounded-lg border flex ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                    <button
                      type="button"
                      onClick={() => setIsLoopNaive(true)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                        isLoopNaive
                          ? isDark ? 'bg-cyan-600 text-white' : 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-500'
                      }`}
                    >
                      Loop Diüretik Naif
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsLoopNaive(false)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                        !isLoopNaive
                          ? isDark ? 'bg-cyan-600 text-white' : 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-500'
                      }`}
                    >
                      Kronik Oral Kullanıcı
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {!isLoopNaive && (bolusScenario === 'adhf_edema' || bolusScenario === 'taco_overload') ? (
                    <div className="col-span-2">
                      <label htmlFor={oralHomeId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Evdeki Günlük Toplam Oral Furosemid Dozu (mg/gün)
                      </label>
                      <input
                        id={oralHomeId}
                        type="number"
                        min={20}
                        max={320}
                        step={20}
                        value={homeOralDailyMg}
                        onChange={(e) => setHomeOralDailyMg(Math.max(20, Number(e.target.value) || 0))}
                        className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                          isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  ) : null}

                  <div>
                    <label htmlFor={weightInputId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Ağırlık (kg)
                    </label>
                    <input
                      id={weightInputId}
                      type="number"
                      min={2}
                      max={200}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Math.max(2, Number(e.target.value) || 0))}
                      className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor={egfrId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      eGFR (mL/dk)
                    </label>
                    <input
                      id={egfrId}
                      type="number"
                      min={0}
                      max={150}
                      value={eGfr}
                      onChange={(e) => setEGfr(Math.max(0, Number(e.target.value) || 0))}
                      className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                        isCkdThreshold
                          ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                          : isDark
                            ? 'bg-slate-950 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor={kId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Serum K⁺ (mEq/L)
                    </label>
                    <input
                      id={kId}
                      type="number"
                      min={1.5}
                      max={8.5}
                      step={0.1}
                      value={serumK}
                      onChange={(e) => setSerumK(Math.max(1.5, Number(e.target.value) || 0))}
                      className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                        isSevereHypokalemic
                          ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-300'
                          : isHypokalemic
                            ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                            : isDark
                              ? 'bg-slate-950 border-slate-700 text-white'
                              : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor={albId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Albümin (g/dL)
                    </label>
                    <input
                      id={albId}
                      type="number"
                      min={1.0}
                      max={5.5}
                      step={0.1}
                      value={serumAlbumin}
                      onChange={(e) => setSerumAlbumin(Math.max(1.0, Number(e.target.value) || 0))}
                      className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                        isHypoalbuminemic
                          ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                          : isDark
                            ? 'bg-slate-950 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor={mapId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Ortalama Arter Basıncı — MAP (mmHg)
                    </label>
                    <input
                      id={mapId}
                      type="number"
                      min={35}
                      max={160}
                      value={mapMmHg}
                      onChange={(e) => setMapMmHg(Math.max(35, Number(e.target.value) || 0))}
                      className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                        isHypotensive
                          ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-300'
                          : isDark
                            ? 'bg-slate-950 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/75 border-cyan-500/35' : 'bg-cyan-50/50 border-cyan-200'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {bolusRec.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                      {bolusRec.doseMg} mg IV
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">Doz Rejimi</div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white mt-0.5 tabular-nums">
                        {bolusRec.rangeText}
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">TR Ampul &amp; Hacim</div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-cyan-700 dark:text-cyan-300 mt-0.5 tabular-nums">
                        {bolusRec.ampText}
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border text-xs space-y-1.5 leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                    <div>
                      <strong className={isDark ? 'text-white' : 'text-slate-900'}>Uygulama Hızı: </strong>
                      {bolusRec.speedText}
                    </div>
                    <div>
                      <strong className={isDark ? 'text-white' : 'text-slate-900'}>Yanıt &amp; İzlem: </strong>
                      {bolusRec.monitor}
                    </div>
                  </div>
                </div>

                {(isSevereHypokalemic || isHypokalemic || isHypotensive || isHypoalbuminemic || isCkdThreshold) && (
                  <div className={`rounded-xl border p-3.5 space-y-1.5 text-xs ${
                    isSevereHypokalemic || isHypotensive
                      ? isDark ? 'bg-rose-950/35 border-rose-500/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
                      : isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Aktif Hemodinamik / Elektrolit Uyarıları</span>
                    </div>
                    {isSevereHypokalemic && (
                      <p><strong>Ağır Hipokalemi (K⁺ {serumK} mEq/L &lt; 3,0):</strong> Furosemid malign ventriküler aritmiyi tetikler; önce IV KCl replase edilmelidir!</p>
                    )}
                    {!isSevereHypokalemic && isHypokalemic && (
                      <p><strong>Sınırda Hipokalemi (K⁺ {serumK} mEq/L):</strong> Kaliürez ve magnezüri beklenir; eş zamanlı K⁺/Mg²⁺ desteği planlayın.</p>
                    )}
                    {isHypotensive && (
                      <p><strong>Hipotansiyon (MAP {mapMmHg} mmHg &lt; 65):</strong> Hipovolemi veya düşük debi dışlanmadan diüretik verilmesi organ perfüzyonunu çökertir.</p>
                    )}
                    {isHypoalbuminemic && (
                      <p><strong>Hipoalbüminemi ({serumAlbumin} g/dL &lt; 2,5):</strong> Proksimal tübüle ilaç taşınımı azalır; dirençli nefrotik/sirotik ödemde eş zamanlı albümin düşünülebilir.</p>
                    )}
                    {isCkdThreshold && (
                      <p><strong>İleri KBH (eGFR {eGfr} mL/dk &lt; 30):</strong> Eşik doz yükselir ancak t½ uzadığı için yüksek dozlarda mutlaka ≤ 4 mg/dk hızında verin.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTINUOUS INFUSION */}
        {activeTab === 'infusion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 space-y-3.5">
              <div className={`p-1 rounded-lg border flex ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <button
                  type="button"
                  onClick={() => setInfusionIsPediatric(false)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                    !infusionIsPediatric
                      ? isDark ? 'bg-cyan-600 text-white' : 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  Erişkin (mg/saat)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInfusionIsPediatric(true);
                    if (weightKg > 45) setWeightKg(18);
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                    infusionIsPediatric
                      ? isDark ? 'bg-cyan-600 text-white' : 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  Pediatrik (mg/kg/sa)
                </button>
              </div>

              {infusionIsPediatric ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Çocuk Ağırlığı (kg)
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={60}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Math.max(2, Number(e.target.value) || 0))}
                      className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Doz (0,05–0,4 mg/kg/sa)
                    </label>
                    <input
                      type="number"
                      min={0.05}
                      max={0.4}
                      step={0.05}
                      value={pedsInfusionMgKgHr}
                      onChange={(e) => setPedsInfusionMgKgHr(Math.max(0.05, Number(e.target.value) || 0))}
                      className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor={infRateId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Hedef İnfüzyon Hızı (mg/saat)
                    </label>
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {infusionRateMgHr} mg/saat
                    </span>
                  </div>
                  <input
                    id={infRateId}
                    type="range"
                    min={2}
                    max={40}
                    step={1}
                    value={infusionRateMgHr}
                    onChange={(e) => setInfusionRateMgHr(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                    <span>2 mg/sa</span>
                    <span>10 mg/sa</span>
                    <span>20 mg/sa</span>
                    <span>40 mg/sa</span>
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Enjektör / Çözelti Konsantrasyonu (50 mL)
                </div>
                <div className="space-y-1.5">
                  {[
                    { id: 'pure_10', label: 'Saf 10 mg/mL (500 mg / 50 mL — Sıvı Kısıtlı YBÜ)' },
                    { id: 'conc_4', label: '4 mg/mL (200 mg [10 amp] / 50 mL SF)' },
                    { id: 'conc_2', label: '2 mg/mL (100 mg [5 amp] / 50 mL SF — Pediatri/Düşük Hız)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setInfusionPrep(opt.id as InfusionPrep)}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                        infusionPrep === opt.id
                          ? isDark
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold'
                            : 'bg-cyan-50 border-cyan-500 text-cyan-900 font-semibold'
                          : isDark
                            ? 'bg-slate-950 border-slate-800 text-slate-400'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/75 border-cyan-500/35' : 'bg-cyan-50/50 border-cyan-200'}`}>
                <div className="grid grid-cols-3 gap-2.5 font-mono tabular-nums">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10.5px] font-sans font-semibold text-slate-500 dark:text-slate-400">Pompa Debisi</div>
                    <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                      {pumpRateMlHr.toFixed(1)} mL/sa
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10.5px] font-sans font-semibold text-slate-500 dark:text-slate-400">Saatlik Doz</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {effectiveInfMgHr} mg/sa
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10.5px] font-sans font-semibold text-slate-500 dark:text-slate-400">24 Sa Toplam</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {total24hMg.toFixed(0)} mg
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs space-y-1.5 leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <div>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>1. Zorunlu Yükleme Bolusu: </strong>
                    Sürekli infüzyon tek başına başlanırsa tübüler eşiğe saatlerce ulaşılamaz. Önce{' '}
                    <span className="font-mono font-semibold">
                      {infusionIsPediatric ? `${Math.round(Math.min(weightKg, 60) * 1)} mg IV` : '20–40 mg IV'}
                    </span>{' '}
                    bolus uygulayın.
                  </div>
                  <div>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>2. Ototoksisite Hız Kontrolü: </strong>
                    Mevcut hız <span className="font-mono font-semibold">{infMgPerMin.toFixed(2)} mg/dk</span>{' '}
                    ({isOtotoxicRate ? 'UYARI: > 4 mg/dk!' : '≤ 4 mg/dk güvenli aralıkta'}).
                  </div>
                  <div>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>3. Işık &amp; Hat Güvenliği: </strong>
                    Enjektörü ışıktan koruyun (sararmış/çökeltili çözeltiyi atın); 24 saatte bir yenileyin ve ayrı lümenden verin.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FUROSEMIDE STRESS TEST (FST) */}
        {activeTab === 'fst' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={fstWtId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Hasta Ağırlığı (kg)
                  </label>
                  <input
                    id={fstWtId}
                    type="number"
                    min={30}
                    max={180}
                    value={fstWeightKg}
                    onChange={(e) => setFstWeightKg(Math.max(30, Number(e.target.value) || 0))}
                    className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor={fstUrineId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    2 Saatlik İdrar (mL)
                  </label>
                  <input
                    id={fstUrineId}
                    type="number"
                    min={0}
                    max={2000}
                    step={10}
                    value={fstUrine2hMl}
                    onChange={(e) => setFstUrine2hMl(Math.max(0, Number(e.target.value) || 0))}
                    className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                      !isFstPassed
                        ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-300'
                        : 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    }`}
                  />
                </div>
              </div>

              <label className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <span className="text-xs font-semibold">
                  Son 7 gün içinde loop diüretik aldı (1,5 mg/kg)
                </span>
                <input
                  type="checkbox"
                  checked={fstPriorLoop}
                  onChange={(e) => setFstPriorLoop(e.target.checked)}
                  className="w-4 h-4 accent-cyan-600 cursor-pointer"
                />
              </label>

              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <strong>Ön Koşul:</strong> FST yalnızca <strong>övolemik</strong>, erken evre (KDIGO Evre 1–2) ABH hastalarında uygulanır. Hipovolemik hastada yapılmamalıdır; yüksek diürez gelişirse 1:1 dengeli kristaloid ile övolemi korunur.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/75 border-indigo-500/35' : 'bg-indigo-50/40 border-indigo-200'}`}>
                <div className="grid grid-cols-2 gap-2.5 font-mono tabular-nums">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10.5px] font-sans font-semibold text-slate-500 dark:text-slate-400">Standart FST Dozu</div>
                    <div className="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {fstDoseMg} mg IV ({fstMgPerKg.toFixed(1)} mg/kg)
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10.5px] font-sans font-semibold text-slate-500 dark:text-slate-400">Hacim &amp; Min. Süre</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {fstVolMl.toFixed(1)} mL · ≥ {fstMinMinutes} dk
                    </div>
                  </div>
                </div>

                <div className={`rounded-xl border p-3.5 text-xs leading-relaxed ${
                  isFstPassed
                    ? isDark ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : isDark ? 'bg-rose-950/35 border-rose-500/40 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {isFstPassed ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
                    <span>
                      {isFstPassed
                        ? `FST YANITLI / NEGATİF (${fstUrine2hMl} mL ≥ 200 mL / 2 saat)`
                        : `FST BAŞARISIZ / POZİTİF (${fstUrine2hMl} mL < 200 mL / 2 saat)`}
                    </span>
                  </div>
                  <p>
                    {isFstPassed
                      ? 'Proksimal tübüler OAT sekresyonu ve Henle kulpu bütünlüğü korunmuş; KDIGO Evre 3 ABH ve acil diyaliz (RRT) progresyon riski düşüktür. Fazla diürez varsa 1:1 izotonik/dengeli kristaloid ile volümü koruyun.'
                      : 'Tübüler hasar ciddi düzeydedir. KDIGO Evre 3 ABH’ye ilerleme ve RRT ihtiyacı açısından yüksek risk (Chawla 2013: duyarlılık %87, özgüllük %84, AUC 0,87). Nefrotoksik ajanları kesin, diyaliz/CRRT hazırlığı planlayın.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 7. HAZIRLAMA, DİLÜSYON, STABİLİTE VE UYUMLULUK */}
      <section
        id="sec-uyumluluk"
        className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Syringe className={`h-5 w-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Türkiye Formülasyonları, Hazırlama, Işık Stabilitesi ve Y-Site Uyumsuzluğu
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
            <p className={`font-bold text-sm ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>
              Türkiye Formları &amp; Sulandırma
            </p>
            <p>
              Standart ampul <strong>20 mg / 2 mL (10 mg/mL)</strong> (Lasix, Desal, Furomid); yüksek doz <strong>250 mg / 25 mL</strong> flakon ve <strong>40 mg tablet</strong> mevcuttur. <strong>%0,9 NaCl (SF)</strong> veya Ringer Laktat ile uyumludur. Asidik pH’lı (%5 Dekstroz pH &lt; 5,5) çözeltilerde çökelme riski arttığından <strong>%0,9 NaCl tercih edilir</strong>; sıvı kısıtlı hastada saf (10 mg/mL) infüzyon idealdir.
            </p>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-amber-900/40 text-slate-300' : 'bg-amber-50/50 border-amber-200 text-slate-700'}`}>
            <p className={`font-bold text-sm ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
              Işıktan Koruma &amp; Hız Sınırı
            </p>
            <p>
              Furosemid ışığa duyarlıdır; sürekli infüzyon enjektörü ve hattı <strong>ışıktan korunmalı</strong>, sararmış veya bulanık çözelti kesinlikle kullanılmamalıdır. 20–40 mg bolus 1–2 dk’da verilebilir; <strong>&gt; 40–80 mg yüksek dozlarda hız ≤ 4 mg/dk</strong> (pediatride ≤ 0,5 mg/kg/dk) olmalıdır.
            </p>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-rose-900/40 text-slate-300' : 'bg-rose-50/50 border-rose-200 text-slate-700'}`}>
            <p className={`font-bold text-sm ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
              Kritik Y-Site Uyumsuzluğu (pH ~9,0)
            </p>
            <p>
              Alkali pH’sı (~8,0–9,3) nedeniyle <strong>noradrenalin, adrenalin, dopamin, dobutamin, midazolam, amiodaron, gentamisin, vankomisin, siprofloksasin, morfin ve diltiazem</strong> ile aynı lümenden verilmez — saniyeler içinde beyaz çökelti veya katekolamin inaktivasyonu oluşur!
            </p>
          </div>
        </div>
      </section>

      {/* 8. BÖBREK & KARACİĞER YETMEZLİĞİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="KBH’da tübüler sekresyon azalır → daha yüksek eşik (ceiling) doz gerekir, ancak t½ uzar!"
        renalDetails={[
          'eGFR 30–60 mL/dk: Orta düzeyde eşik yükselmesi (genellikle 40–80 mg IV ile yanıt alınır).',
          'eGFR < 30 mL/dk: Üremik organik asitler OAT1/3 taşıyıcıları için furosemid ile yarışır; tek doz tavanı 160–200 mg IV’ye kadar çıkabilir. Ancak t½ 9–24 saate uzadığından ototoksisite için hız ≤ 4 mg/dk tutulmalıdır.',
          'Anürik / diyaliz hastası: Rezidüel idrar çıkışı yoksa etkisizdir ve yalnızca ototoksisite yaratır; kesilmelidir.',
        ]}
        hepaticSummary="Sirotik asitte 1. basamak spironolakton ile 100:40 oranında kombine edilir; hepatik komada KONTRENDİKE!"
        hepaticDetails={[
          'Siroz + Asit: Standart başlangıç 40 mg/gün PO furosemid + 100 mg/gün spironolakton (maks 160 mg furosemid / 400 mg spironolakton). Aşırı diürez hepatorenal sendromu (HRS) tetikler; günde maks 0,5 kg (ödem yoksa) veya 1 kg (ödem varsa) kilo kaybı hedeflenir.',
          'Hepatik Ensefalopati / Pre-koma: Furosemidin yaptığı hipokalemi ve metabolik alkaloz renal amonyogenezi ve NH₃’ün beyne geçişini artırır → ensefalopati geliştiğinde derhal kesilmelidir.',
        ]}
      />

      {/* 9. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="Rutin gebelik ödeminde veya preeklampsi hipertansiyonunda KULLANILMAZ; yalnızca maternal akut pulmoner ödemde endikedir."
        pregnancyDetails={[
          'Plasentayı geçer ve fetal idrar üretimini (polihidramniyos / fetal elektrolit dengesizliği) artırabilir.',
          'Preeklampside zaten azalmış olan maternal intravasküler volümü ve uteroplasental perfüzyonu daha da düşürebilir; yalnızca eşlik eden akut kardiyojenik/pulmoner ödemde dikkatle verilir.',
        ]}
        lactationSummary="Anne sütüne çok az geçer, ancak yüksek dozlarda anne sütü üretimini (laktasyonu) baskılayabilir."
        lactationDetails={[
          'Bebek maruziyeti minimaldir; ancak yoğun diürez maternal süt hacmini azaltabileceğinden emziren annelerde en düşük etkin doz seçilir ve bebeğin kilo/hidrasyonu izlenir.',
        ]}
      />

      {/* 10. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Hipokalemi & Hipomagnezemi',
            incidenceOrSeverity: 'Çok Sık / Aritmojenik',
            detail: 'Distal Na⁺ yükü ve aldosteron aktivasyonu K⁺ kaybını, TAL potansiyel kaybı Mg²⁺ atılımını artırır; QT uzaması ve Torsades de Pointes riski doğar.',
            tone: 'rose',
          },
          {
            title: 'Hipokloremik Metabolik Alkaloz',
            incidenceOrSeverity: 'Çok Sık',
            detail: 'Kontraksiyon alkalozu + Cl⁻ ve H⁺ kaybı sonucu HCO₃⁻ yükselir; YBÜ’de solunum dürtüsünü baskılayıp weaning’i zorlaştırabilir.',
            tone: 'amber',
          },
          {
            title: 'Ototoksisite (Tinnitus / Sağırlık)',
            incidenceOrSeverity: 'Hız & Doz Bağımlı',
            detail: 'Stria vascularis’te NKCC1 inhibisyonu; > 4 mg/dk hızlı IV puşe, KBH veya aminoglikozid/vankomisin birlikteliğinde geçici ya da kalıcı işitme kaybı!',
            tone: 'rose',
          },
          {
            title: 'Hipovolemi & Prerenal ABH',
            incidenceOrSeverity: 'Sık',
            detail: 'Aşırı diürezle intravasküler volüm çöküşü, hipotansiyon, ortostaz, hemokonsantrasyon ve tromboemboli riski artışı.',
            tone: 'rose',
          },
          {
            title: 'Hiponatremi & Hipokalsemi',
            incidenceOrSeverity: 'Orta',
            detail: 'Medüller gradyan kaybı ve ADH uyarımıyla hiponatremi; paraselüler Ca²⁺ emiliminin azalmasıyla kalsiürez (yenidoğanda nefrokalsinoz).',
            tone: 'amber',
          },
          {
            title: 'Hiperürisemi / Gut & Hiperglisemi',
            incidenceOrSeverity: 'Metabolik',
            detail: 'OAT yarışmasıyla ürik asit sekresyonu azalır (akut gut atağı); hipokalemi insülin salınımını azaltarak glukozu yükseltebilir.',
            tone: 'indigo',
          },
          {
            title: 'İnterstisyel Nefrit (AIN)',
            incidenceOrSeverity: 'Nadir / İmmün',
            detail: 'Ateş, döküntü, eozinofili ve açıklanamayan kreatinin artışında ilaca bağlı akut interstisyel nefrit düşünülmelidir.',
            tone: 'amber',
          },
          {
            title: 'Ağır İlaç Etkileşimleri',
            incidenceOrSeverity: 'Yüksek Risk',
            detail: 'Hipokalemi digoksin toksisitesini tetikler; lityum düzeyi yükselir; NSAİİ’ler diüretik yanıtı engeller ve renal hasarı artırır.',
            tone: 'teal',
          },
        ]}
      />

      {/* 11. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Ototoksisiteyi Önlemenin Altın Kuralı (≤ 4 mg/dk)',
            detail:
              'Tek doz 80 mg ve üzeri IV furosemid ASLA hızlı puşe yapılmaz; koklear NKCC1 hasarını önlemek için ≤ 4 mg/dk hızında (örn. 100 mg ≥ 25 dk, 200 mg ≥ 50 dk) infüzyon pompasıyla uygulanır.',
          },
          {
            title: 'Diüretik Direnci & Sequential Nefron Blokajı',
            detail:
              'Yüksek doz IV furosemide rağmen 2 saatte spot idrar Na⁺ < 50–70 mEq/L veya saatlik diürez < 100 mL ise proksimal blokaj için Asetazolamid (ADVOR: 500 mg IV 1×1) veya distal blokaj için Tiyazid/Metolazon (CLOROTIC) eklenir.',
          },
          {
            title: 'TACO vs TRALI Ayırımı (Perioperatif Transfüzyon)',
            detail:
              'Transfüzyon sonrası akut hipoksemide hidrostatik yüklenme (TACO — hipertansiyon, JVD↑, BNP↑) furosemide dramatik yanıt verir; oysa geçirgenlik ödemi olan TRALI’de (normo/hipotansif) furosemid hipotansiyonu derinleştirir!',
          },
          {
            title: 'Post-Diüretik Alkalozda Asetazolamid / KCl Dengesi',
            detail:
              'Yoğun bakımda agresif furosemid sonrası gelişen hipokloremik/hipokalemik metabolik alkalozda önce KCl replase edilir; volüm yüklü hastada 1–3 günlük asetazolamid (250–500 mg) eklenebilir.',
          },
          {
            title: 'Furosemid + Albümin Kombine Kullanımı',
            detail:
              'Rutin YBÜ hastasında ek faydası sınırlıdır; ancak derin hipoalbüminemili (< 2,0–2,5 g/dL) nefrotik sendrom veya dekompanse sirotik hastalarda 100 mL %20 albümin ile eş zamanlı/ardışık verilmesi tübüler iletimi geçici olarak iyileştirebilir.',
          },
          {
            title: 'Anestezi İndüksiyonu & Kronik Loop Kullanıcıları',
            detail:
              'Preoperatif sabah furosemid alan veya kronik yüksek doz kullanan hastalarda indüksiyonda derin hipotansiyon ve hipokalemiye bağlı aritmi riski yüksektir; preop K⁺/Mg²⁺ kontrolü şarttır.',
          },
        ]}
      />

      {/* 12. ISMP GÜVENLİK, TALL-MAN LETTERING & DOZ AŞIMI */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionTitle="İlaç Güvenliği, Tall-Man Lettering & Doz Aşımı Yönetimi"
        tallManName="furoSEMIDE"
        confusionRiskWith="torSEMIDE / buMETAnide"
        criticalAlerts={[
          'Yüksek doz IV uygulamalarda (> 40–80 mg) infüzyon hızı mutlaka ≤ 4 mg/dk (pediatride ≤ 0,5 mg/kg/dk) sınırında tutulmalıdır — aksi halde ototoksisite gelişir.',
          'Alkali pH (~9,0) nedeniyle noradrenalin, adrenalin, dopamin, dobutamin, midazolam ve amiodaron ile aynı lümenden ASLA verilmez.',
          'Sürekli infüzyon enjektörü ve seti ışıktan korunmalı; sararmış veya çökeltili çözeltiler imha edilmelidir.',
          'Digoksin kullanan veya K⁺ < 3,5 mEq/L olan hastalarda K⁺/Mg²⁺ replasmanı yapılmadan yüksek doz furosemid uygulanmamalıdır.',
        ]}
        antidoteOrRescue="Spesifik antidot yoktur. Doz aşımında ağır hipovolemi, hipotansiyon, hemokonsantrasyon, hipokalemi, hipomagnezemi, hipokloremik metabolik alkaloz ve tinnitus/işitme kaybı görülür. Furosemid kesilir; izotonik/dengeli kristaloidlerle intravasküler volüm, IV KCl ve MgSO₄ ile elektrolitler yerine konur. Furosemid yüksek protein bağlanması nedeniyle hemodiyalizle anlamlı düzeyde uzaklaştırılamaz."
      />

      {/* 13. KANITA DAYALI KAYNAKÇA & ETKİLEŞİM ARAÇLARI */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Furosemid"
        references={[
          {
            authors: 'Felker GM, Lee KL, Bull DA, Redfield MM, Stevenson LW, Goldsmith SR, et al. (DOSE Trial)',
            title: 'Diuretic Strategies in Patients with Acute Decompensated Heart Failure',
            journal: 'New England Journal of Medicine',
            year: 2011,
            pmid: '21366472',
            doi: '10.1056/NEJMoa1005419',
            note: 'Akut dekompanse kalp yetmezliğinde bolus vs sürekli infüzyon ve düşük (1×) vs yüksek (2,5×) IV furosemid stratejilerini karşılaştıran temel RKÇ.',
          },
          {
            authors: 'Chawla LS, Davison DL, Brasha-Mitchell E, Koyner JL, Arthur JM, Shaw AD, et al.',
            title: 'Development and standardization of a furosemide stress test with the prediction of severe acute kidney injury',
            journal: 'Critical Care',
            year: 2013,
            pmid: '24053972',
            doi: '10.1186/cc13015',
            note: 'Erken ABH’de 1,0–1,5 mg/kg IV furosemid sonrası 2 saatte < 200 mL idrar çıkışının Evre 3 ABH progresyonunu yüksek doğrulukla öngördüğünü tanımlayan çalışma.',
          },
          {
            authors: 'Ho KM, Sheridan DJ',
            title: 'Meta-analysis of frusemide to prevent or treat acute renal failure',
            journal: 'BMJ',
            year: 2006,
            pmid: '16861256',
            doi: '10.1136/bmj.38902.605347.7C',
            note: 'Furosemidin ABH’yi önlemediğini veya mortalite/RRT ihtiyacını azaltmadığını, yüksek dozlarda ototoksisite riskini artırdığını gösteren sistematik derleme.',
          },
          {
            authors: 'Trullàs JC, Morales-Rull JL, Casado J, Carrera-Izquierdo M, Sánchez-Marteles M, Conde-Martel A, et al. (CLOROTIC Trial)',
            title: 'Combining loop with thiazide diuretics for decompensated heart failure: the CLOROTIC trial',
            journal: 'European Heart Journal',
            year: 2023,
            pmid: '36691461',
            doi: '10.1093/eurheartj/ehac689',
            note: 'IV furosemide hidroklorotiyazid eklenmesinin (sequential nefron blokajı) diüretik yanıtı ve kilo kaybını anlamlı artırdığını gösteren RKÇ.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/furosemide.html"
        medscapeUrl="https://reference.medscape.com/drug/lasix-furosemide-342423"
      />
    </div>
  );
};

export default FurosemideProtocol;
