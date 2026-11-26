import React, { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  Brain,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldAlert,
  Syringe,
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

interface Props {
  isDark: boolean;
}

type CalcTab = 'procedural' | 'pediatric' | 'overdose' | 'infusion';
type InfusionConc = 'undiluted' | 'diluted';

/** TR ampul konsantrasyonu: 0,1 mg/mL (0,5 mg/5 mL · 1 mg/10 mL) */
const AMPULE_MG_PER_ML = 0.1;

/** Türkçe ondalık biçimlendirme (virgül) */
const fmt = (n: number, digits = 2): string => n.toFixed(digits).replace('.', ',');

interface DoseStep {
  step: number;
  timing: string;
  doseMg: number;
  cumulativeMg: number;
}

export const FlumazenilProtocol: React.FC<Props> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<CalcTab>('procedural');
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Ortak güvenlik bayrakları
  const [isChronicBzd, setIsChronicBzd] = useState<boolean>(false);
  const [hasEpilepsy, setHasEpilepsy] = useState<boolean>(false);
  const [isTcaMixed, setIsTcaMixed] = useState<boolean>(false);

  // 1. Prosedürel reversal (erişkin)
  const [procWeightKg, setProcWeightKg] = useState<number>(75);
  // 2. Pediatrik
  const [pedWeightKg, setPedWeightKg] = useState<number>(20);
  // 3. BZD zehirlenmesi
  const [odWeightKg, setOdWeightKg] = useState<number>(70);
  // 4. Resedasyon infüzyonu
  const [infRateMgHr, setInfRateMgHr] = useState<number>(0.2);
  const [infConc, setInfConc] = useState<InfusionConc>('undiluted');

  const procWtId = useId();
  const pedWtId = useId();
  const odWtId = useId();
  const infRateId = useId();

  const anyFlag = isChronicBzd || hasEpilepsy || isTcaMixed;
  const mlOf = (mg: number) => mg / AMPULE_MG_PER_ML;

  // --- 1. PROSEDÜREL REVERSAL (ERİŞKİN) ---
  // 0,2 mg / 15 sn → 45 sn bekle → 0,2 mg q60 sn × 4 ek doz → kümülatif maks 1 mg
  const procSteps: DoseStep[] = Array.from({ length: 5 }, (_, i) => ({
    step: i + 1,
    timing: i === 0 ? '0. sn (15 sn’de IV)' : `${45 + (i - 1) * 60 + 15}. sn civarı (önceki dozdan 45–60 sn sonra)`,
    doseMg: 0.2,
    cumulativeMg: Number((0.2 * (i + 1)).toFixed(2)),
  }));

  // --- 2. PEDİATRİK (>1 YAŞ) ---
  const pedDoseMg = Math.min(0.2, Number((pedWeightKg * 0.01).toFixed(3)));
  const pedCapMg = Math.min(1, Number((pedWeightKg * 0.05).toFixed(3)));
  const pedSteps: DoseStep[] = [];
  {
    let cum = 0;
    for (let i = 0; i < 5; i += 1) {
      const remaining = Number((pedCapMg - cum).toFixed(4));
      if (remaining <= 0.0001) break;
      const dose = Number(Math.min(pedDoseMg, remaining).toFixed(3));
      cum = Number((cum + dose).toFixed(3));
      pedSteps.push({
        step: i + 1,
        timing: i === 0 ? '0. sn (15 sn’de IV)' : `Önceki dozdan 60 sn sonra (${i}. tekrar)`,
        doseMg: dose,
        cumulativeMg: cum,
      });
    }
  }

  // --- 3. BZD ZEHİRLENMESİ ---
  // 0,2 mg/30 sn → 0,3 mg/30 sn → 0,5 mg/30 sn q1 dk → kümülatif 3 mg
  const odDoses = [0.2, 0.3, 0.5, 0.5, 0.5, 0.5, 0.5];
  const odSteps: DoseStep[] = [];
  {
    let cum = 0;
    odDoses.forEach((d, i) => {
      cum = Number((cum + d).toFixed(2));
      odSteps.push({
        step: i + 1,
        timing: i === 0 ? '0. dk (30 sn’de IV)' : `${i}. dk (30 sn’de IV)`,
        doseMg: d,
        cumulativeMg: cum,
      });
    });
  }
  const odStop = anyFlag;

  // --- 4. RESEDASYON / YBÜ İNFÜZYONU ---
  const infConcMgMl = infConc === 'undiluted' ? 0.1 : 0.04;
  const infMlHr = Number((infRateMgHr / infConcMgMl).toFixed(1));
  const infMcgHr = Math.round(infRateMgHr * 1000);
  const infDailyMg = Number((infRateMgHr * 24).toFixed(1));
  const infHighRate = infRateMgHr > 0.4;

  const flagLines = (): string[] => {
    const flags: string[] = [];
    if (isChronicBzd) {
      flags.push('KRONİK BZD KULLANIMI / BAĞIMLILIK: Akut yoksunluk ve NÖBET riski — mümkünse flumazenilden kaçının; zorunluysa 0,1 mg’lık mikro-titrasyon ve tam reversal hedeflemeyin.');
    }
    if (hasEpilepsy) {
      flags.push('EPİLEPSİ (BZD ile kontrol): Flumazenil BZD’nin antikonvülzan korumasını kaldırır → status epileptikus riski. Kontrendike kabul edin.');
    }
    if (isTcaMixed) {
      flags.push('TSA / KARIŞIK VEYA BİLİNMEYEN ZEHİRLENME (proconvulsant ko-ingestan): Flumazenil KULLANMAYIN — nöbet ve TSA kardiyotoksisitesinin maskesi kalkar (EKG: QRS genişliği?).');
    }
    return flags;
  };

  const getReportText = () => {
    const flags = flagLines();
    const flagText = flags.length
      ? `Güvenlik Uyarıları:\n- ${flags.join('\n- ')}`
      : 'Güvenlik Taraması: Kronik BZD / epilepsi / TSA-karışık zehirlenme bayrağı işaretlenmedi.';

    if (activeTab === 'procedural') {
      return [
        'FLUMAZENİL — PROSEDÜREL / ANESTEZİ BZD SEDASYON REVERSAL RAPORU (Erişkin)',
        `Hasta: Erişkin (${procWeightKg} kg — erişkinde doz kilo bazlı DEĞİLDİR, sabit titre edilir)`,
        'Rejim: 0,2 mg (2 mL, 0,1 mg/mL) IV 15 sn’de → 45 sn bekle → gerekirse 0,2 mg q60 sn, en fazla 4 ek doz.',
        `Adımlar: ${procSteps.map((s) => `${s.step}) ${fmt(s.doseMg)} mg (${fmt(mlOf(s.doseMg), 1)} mL) → kümülatif ${fmt(s.cumulativeMg)} mg`).join(' | ')}`,
        'Kümülatif Maks: 1 mg (10 mL). Resedasyonda 20 dk aralarla tekrar (her seferde ≤ 1 mg; saatte ≤ 3 mg).',
        'Gözlem: Son dozdan sonra ≥ 2 saat resedasyon / hipoventilasyon izlemi.',
        flagText,
      ].join('\n');
    }

    if (activeTab === 'pediatric') {
      return [
        'FLUMAZENİL — PEDİATRİK (>1 YAŞ) BZD SEDASYON REVERSAL RAPORU',
        `Hasta: ${pedWeightKg} kg | Tek doz: 0,01 mg/kg (maks 0,2 mg) = ${fmt(pedDoseMg, 3)} mg (${fmt(mlOf(pedDoseMg), 2)} mL) IV 15 sn’de`,
        `Kümülatif Tavan: 0,05 mg/kg veya 1 mg (hangisi düşükse) = ${fmt(pedCapMg, 3)} mg (${fmt(mlOf(pedCapMg), 1)} mL)`,
        `Adımlar (q60 sn, ≤ 4 tekrar): ${pedSteps.map((s) => `${s.step}) ${fmt(s.doseMg, 3)} mg → Σ ${fmt(s.cumulativeMg, 3)} mg`).join(' | ')}`,
        flagText,
      ].join('\n');
    }

    if (activeTab === 'overdose') {
      return [
        'FLUMAZENİL — ŞÜPHELİ BZD ZEHİRLENMESİ RAPORU (Yalnızca seçilmiş saf BZD · bağımlı olmayan · toksikoloji eşliğinde)',
        `Hasta: ${odWeightKg} kg`,
        odStop
          ? 'KARAR: FLUMAZENİL VERMEYİN — risk bayrağı mevcut. Hava yolu/ventilasyon desteği ve destek tedavisi esastır.'
          : `Rejim: 0,2 mg/30 sn → 0,3 mg/30 sn → 0,5 mg/30 sn q1 dk; kümülatif 3 mg. Adımlar: ${odSteps.map((s) => `${fmt(s.doseMg, 1)} mg (Σ ${fmt(s.cumulativeMg, 1)})`).join(' → ')}`,
        'Not: Nadiren 5 mg’a çıkılabilir; 5 mg’a yanıt yoksa sedasyonun nedeni BZD DEĞİLDİR. Rutin "koma kokteyli" olarak verilmez (ABD kutulu uyarı: nöbet).',
        flagText,
      ].join('\n');
    }

    return [
      'FLUMAZENİL — RESEDASYON / YBÜ SÜREKLİ İNFÜZYON RAPORU (Off-label · düşük kanıt · uzman gözetimi)',
      `Hız: ${fmt(infRateMgHr)} mg/saat (${infMcgHr} mcg/saat) | 24 saat: ${fmt(infDailyMg, 1)} mg`,
      infConc === 'undiluted'
        ? `Pompa (sulandırılmamış 0,1 mg/mL — örn. 1 mg/10 mL ampul): ${fmt(infMlHr, 1)} mL/saat`
        : `Pompa (2 mg [4 × 0,5 mg/5 mL] + SF/D5W ile 50 mL = 40 mcg/mL): ${fmt(infMlHr, 1)} mL/saat`,
      'Önerilen aralık: 0,1–0,4 mg/saat (pilot RKÇ 0,05–0,3 mg/saat). Uzun süreli midazolam sonrası yoksunluk nöbeti açısından izleyin.',
      flagText,
    ].join('\n');
  };

  const tabBtnCls = (active: boolean) =>
    `px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
      active
        ? isDark
          ? 'bg-violet-500/20 border-violet-400 text-violet-200'
          : 'bg-violet-50 border-violet-500 text-violet-900'
        : isDark
          ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
    }`;

  const inputCls = `w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
  }`;

  const panelCls = `rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`;
  const cardCls = `p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`;

  const renderStepTable = (steps: DoseStep[], digits: number) => (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-mono tabular-nums">
        <thead>
          <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
            <th className="py-2 pr-3 font-sans font-bold">#</th>
            <th className="py-2 pr-3 font-sans font-bold">Zamanlama</th>
            <th className="py-2 pr-3 font-sans font-bold">Doz</th>
            <th className="py-2 pr-3 font-sans font-bold">Hacim (0,1 mg/mL)</th>
            <th className="py-2 font-sans font-bold">Kümülatif</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isDark ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'}`}>
          {steps.map((s) => (
            <tr key={s.step}>
              <td className="py-1.5 pr-3">{s.step}</td>
              <td className="py-1.5 pr-3 font-sans">{s.timing}</td>
              <td className="py-1.5 pr-3 font-bold text-violet-600 dark:text-violet-400">{fmt(s.doseMg, digits)} mg</td>
              <td className="py-1.5 pr-3 font-bold text-amber-600 dark:text-amber-400">{fmt(mlOf(s.doseMg), 2)} mL</td>
              <td className="py-1.5 font-bold">{fmt(s.cumulativeMg, digits)} mg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFlagAlerts = (stopMode: boolean) => {
    const flags = flagLines();
    if (!flags.length) return null;
    return (
      <div
        className={`rounded-xl border p-3.5 text-xs flex items-start gap-2.5 ${
          stopMode
            ? isDark
              ? 'bg-rose-950/50 border-rose-500/50 text-rose-200'
              : 'bg-rose-50 border-rose-300 text-rose-950'
            : isDark
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
              : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}
      >
        {stopMode ? (
          <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        )}
        <div>
          <div className="font-bold text-sm">
            {stopMode ? 'DUR — FLUMAZENİL VERMEYİN!' : 'Yüksek Nöbet / Yoksunluk Riski — Dikkatli Mikro-Titrasyon'}
          </div>
          <ul className="mt-1 space-y-1 leading-relaxed list-disc pl-4">
            {flags.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const flagCheckboxes = (
    <div className="space-y-2 pt-1">
      <label className="flex items-center gap-2 text-xs cursor-pointer">
        <input
          type="checkbox"
          checked={isChronicBzd}
          onChange={(e) => setIsChronicBzd(e.target.checked)}
          className="rounded border-slate-400 text-rose-600"
        />
        <span className="text-rose-600 dark:text-rose-400 font-semibold">Kronik BZD kullanımı / bağımlılık</span>
      </label>
      <label className="flex items-center gap-2 text-xs cursor-pointer">
        <input
          type="checkbox"
          checked={hasEpilepsy}
          onChange={(e) => setHasEpilepsy(e.target.checked)}
          className="rounded border-slate-400 text-rose-600"
        />
        <span className="text-rose-600 dark:text-rose-400 font-semibold">Epilepsi / BZD ile kontrol edilen nöbet · ↑KİB</span>
      </label>
      <label className="flex items-center gap-2 text-xs cursor-pointer">
        <input
          type="checkbox"
          checked={isTcaMixed}
          onChange={(e) => setIsTcaMixed(e.target.checked)}
          className="rounded border-slate-400 text-rose-600"
        />
        <span className="text-rose-600 dark:text-rose-400 font-semibold">
          TSA / karışık-bilinmeyen zehirlenme (bupropion, tramadol, izoniazid, teofilin, kokain)
        </span>
      </label>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v4.0) */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Özet' },
          { id: 'sec-etki', label: 'Etki Mekanizması' },
          { id: 'sec-pkpd', label: 'PK / PD' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyonlar' },
          { id: 'sec-dozlar', label: 'Endikasyonlar & Dozaj' },
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Damar Yolu & Y-Site' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik & Laktasyon' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
          { id: 'sec-derin-pd', label: 'Derin Farmakodinami' },
          { id: 'sec-kaynaklar', label: 'Etkileşim & Kaynakça' },
        ]}
      />

      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON) */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="FLUMAZENIL (0,1 mg/mL → 0,2 mg IV / 15–30 sn titre)"
        confusionRiskWith="FLUKONAZOL · FLUMAZENİL vs NALOKSON karmaşası · FLUFENAZİN"
        criticalAlerts={[
          'Flumazenil RUTİN "koma kokteyli" değildir — bilinmeyen/karışık zehirlenmede (özellikle TSA) ve kronik BZD kullanıcısında nöbet, status epileptikus ve aritmi tetikleyebilir (ABD kutulu uyarı).',
          '5 mL’lik ampul yalnızca 0,5 mg içerir (0,1 mg/mL); tam ampul ilk 0,2 mg dozunun 2,5 katıdır. Daima 2 mL (0,2 mg) çekip 15–30 sn’de verin ve yanıtı bekleyin.',
          'Flumazenil YALNIZCA benzodiyazepin (ve Z-ilaçları/remimazolam) etkisini çevirir — opioid, propofol, barbitürat, volatil ajan, etanol ve rezidüel NMB üzerinde etkisi yoktur. Opioid ko-sedasyonunda önce nalokson.',
          'Etki süresi (t½ ~50 dk) midazolam ve özellikle diazepam/lorazepamdan kısadır → resedasyon! Son dozdan sonra en az 2 saat monitörlü gözlem.',
          'Hipoventilasyonda ilaçtan önce hava yolu: çene itme, %100 O₂, BVM — flumazenil BZD solunum depresyonunu sedasyon kadar güvenilir çevirmez.',
        ]}
        antidoteOrRescue="Flumazenile bağlı nöbette ilk basamak yeniden benzodiyazepin (midazolam 2–5 mg IV / lorazepam) titrasyonudur — reseptör kompetitif olduğundan yüksek BZD dozu gerekebilir; dirençli nöbette propofol veya fenobarbital (BZD bölgesinden bağımsız etkili). Akut ajitasyon/panik ve yoksunlukta düşük doz BZD; supraventriküler aritmide hemodinamiye göre standart ACLS yaklaşımı. TSA kardiyotoksisitesi ortaya çıkarsa (QRS > 100 ms) sodyum bikarbonat 1–2 mEq/kg IV."
      />

      {/* 1. KİMLİK & KLİNİK ÖZET HEADER */}
      <section
        id="sec-ozet"
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-violet-500/30 shadow-xl shadow-violet-950/20 text-slate-100'
            : 'bg-white border-violet-200 shadow-lg shadow-violet-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/30 flex items-center justify-center shrink-0">
              <Brain className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/40 font-mono">
                  İmidazobenzodiyazepin · Kompetitif BZD-Bölgesi Antagonisti
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: V03AB25
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  TR Ampul: 0,5 mg / 5 mL · 1 mg / 10 mL (0,1 mg/mL)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Flumazenil (Anexate®) Monografisi
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                GABA-A reseptörünün α/γ2 ara yüzündeki benzodiyazepin bağlanma bölgesinde kompetitif antagonist.{' '}
                <strong>İyatrojenik prosedürel/anestezi BZD sedasyonunun titre geri döndürülmesi</strong>,{' '}
                <strong>midazolam paradoks reaksiyonu</strong> ve <strong>seçilmiş saf BZD zehirlenmesi</strong> için kullanılır.
                Rutin koma kokteyli değildir; resedasyon ve nöbet riski klinik kullanımını belirler.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 shrink-0 font-mono tabular-nums">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">IV Etki / Pik</div>
              <div className="text-sm font-extrabold text-violet-600 dark:text-violet-400">1–2 dk / 6–10 dk</div>
              <div className="text-[10px] text-slate-500">t½ ~50 dk · RESEDASYON!</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">Erişkin Başlangıç</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">0,2 mg (2 mL)</div>
              <div className="text-[10px] text-slate-500">15 sn’de · q60 sn · maks 1 mg</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">Pediatrik</div>
              <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400">0,01 mg/kg</div>
              <div className="text-[10px] text-slate-500">maks 0,2 mg · Σ 0,05 mg/kg</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">Kutulu Uyarı</div>
              <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400">NÖBET</div>
              <div className="text-[10px] text-slate-500">Kronik BZD · TSA · karışık</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ETKİ MEKANİZMASI */}
      <MechanismOfActionBlock
        isDark={isDark}
        summary="Flumazenil, GABA-A reseptörünün α ve γ2 alt birimleri arasındaki benzodiyazepin bağlanma bölgesine yüksek afiniteyle bağlanan, kendi başına klinik olarak anlamlı intrinsik aktivitesi olmayan (nötr allosterik modülatör) bir imidazobenzodiyazepin türevidir. BZD agonistlerini bu bölgeden kompetitif olarak uzaklaştırır; barbitürat, propofol, nörosteroid ve etanol bağlanma bölgelerine etkisi yoktur."
        pillars={[
          {
            title: 'Kompetitif ve Aşılabilir (Surmountable) Antagonizma',
            detail:
              'Etki, ortamdaki BZD konsantrasyonuna bağlıdır: yüksek BZD yükünde daha fazla flumazenil gerekir; tersine flumazenil etkisi azaldıkça BZD reseptörü yeniden işgal eder. Bu nedenle doz "titre" edilir, sabit bir bolus yoktur.',
          },
          {
            title: 'Kısa Etki Süresi & Resedasyon',
            detail:
              'Hızlı hepatik ekstraksiyon (terminal t½ 40–80 dk) nedeniyle etki çoğu BZD’den kısadır. Midazolam (özellikle yüksek doz/uzamış infüzyon, aktif α-OH metaboliti), diazepam ve lorazepam sonrası 20–120 dk içinde resedasyon gelişebilir.',
          },
          {
            title: 'Bağımlılıkta Yoksunluk & Nöbet',
            detail:
              'Kronik BZD maruziyetinde reseptör adaptasyonu nedeniyle flumazenil ani GABAerjik ton kaybı (ve zayıf parsiyel ters agonist etki) yaratarak akut yoksunluk, ajitasyon ve nöbet tetikler. Proconvulsant ko-ingestanlar (TSA vb.) bu riski katlar.',
          },
        ]}
      />

      {/* 3. FARMAKOKİNETİK / FARMAKODİNAMİK (PK/PD) */}
      <section
        id="sec-pkpd"
        className={`rounded-2xl border p-5 sm:p-6 ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'}`}
      >
        <button
          type="button"
          onClick={() => setPkOpen((v) => !v)}
          aria-expanded={pkOpen}
          className="w-full flex items-center justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Clock className={`h-5 w-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Farmakokinetik &amp; Farmakodinamik (PK/PD) Profili
            </h3>
          </div>
          {pkOpen ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
        </button>

        {pkOpen && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono tabular-nums">
              <thead>
                <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                  <th className="py-2.5 pr-4 font-sans font-bold">Parametre</th>
                  <th className="py-2.5 pr-4 font-sans font-bold">Değer</th>
                  <th className="py-2.5 font-sans font-bold">Klinik Karşılığı</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'}`}>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Etki Başlangıcı / Pik (IV)</td>
                  <td className="py-2.5 pr-4 text-violet-600 dark:text-violet-400 font-bold">1–2 dk / 6–10 dk</td>
                  <td className="py-2.5 font-sans text-xs">
                    Her titrasyon dozundan sonra 45–60 sn beklenerek yanıt değerlendirilir; daha hızlı tekrar aşırı doz ve ani uyanmaya yol açar.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Dağılım Yarı Ömrü</td>
                  <td className="py-2.5 pr-4 font-bold">4 – 11 dk</td>
                  <td className="py-2.5 font-sans text-xs">Hızlı santral dağılım; tek dozun klinik etkisi kısa sürebilir.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Terminal Eliminasyon t½</td>
                  <td className="py-2.5 pr-4 text-amber-600 dark:text-amber-400 font-bold">40 – 80 dk (~50 dk)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Midazolam (1,5–3 sa, YBÜ’de daha uzun), lorazepam (10–20 sa) ve diazepamdan (20–50+ sa) KISA → resedasyon; ≥ 2 saat gözlem.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Dağılım Hacmi (Vd)</td>
                  <td className="py-2.5 pr-4 font-bold">~0,95 L/kg</td>
                  <td className="py-2.5 font-sans text-xs">Orta lipofilik; KBB’yi hızla geçer.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Plazma Protein Bağlanması</td>
                  <td className="py-2.5 pr-4 font-bold">~%50</td>
                  <td className="py-2.5 font-sans text-xs">Hipoalbüminemide klinik olarak anlamlı değişiklik beklenmez.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Metabolizma</td>
                  <td className="py-2.5 pr-4 font-bold">Hepatik · yüksek ekstraksiyon oranı</td>
                  <td className="py-2.5 font-sans text-xs">
                    İnaktif karboksilik asit metabolitine dönüşür ve idrarla atılır; klirens hepatik kan akımına bağımlıdır.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Karaciğer Yetmezliği</td>
                  <td className="py-2.5 pr-4 text-rose-600 dark:text-rose-400 font-bold">Klirens: orta %40–60 · ağır %25</td>
                  <td className="py-2.5 font-sans text-xs">
                    t½ orta yetmezlikte ~1,3 sa, ağır yetmezlikte ~2,4 sa’e uzar → tekrar dozlarını azaltın / aralığı uzatın.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Oral Biyoyararlanım</td>
                  <td className="py-2.5 pr-4 font-bold">~%16 (yüksek ilk geçiş)</td>
                  <td className="py-2.5 font-sans text-xs">Klinik kullanım yalnızca IV’dir.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 4. MUTLAK VE RELATİF KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE!) */}
      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Flumazenil veya benzodiyazepinlere karşı bilinen aşırı duyarlılık.',
          'Hayatı tehdit eden bir durumun kontrolü için BZD kullanılan hasta (status epileptikus, artmış kafa içi basıncı kontrolü vb.) — reversal kontrolü kaldırır.',
          'Ciddi siklik (trisiklik) antidepresan doz aşımı bulguları: geniş QRS, nöbet, antikolinerjik sendrom — flumazenil nöbet ve ölümcül aritmileri açığa çıkarır.',
        ]}
        relativeItems={[
          'Kronik BZD kullanımı / bağımlılık: akut yoksunluk ve nöbet riski.',
          'Kronik BZD tedavisi alan epilepsi hastası: antikonvülzan korumanın kaybı.',
          'Karışık veya bilinmeyen zehirlenme — proconvulsant ko-ingestanlar: TSA, bupropion, tramadol, izoniazid, teofilin, kokain.',
          'Artmış KİB ile kafa travması: KİB/serebral kan akımı artışı ve nöbet riski.',
          'Panik bozukluğu: panik atak tetiklenebilir.',
          'Rutin ampirik "koma kokteyli" kullanımı (ABD kutulu uyarı: nöbet).',
        ]}
        clinicalNote="Flumazenil opioid, propofol, barbitürat, volatil anestezik, etanol veya rezidüel nöromüsküler blok kaynaklı depresyonu ÇEVİRMEZ. Uyanmayan hastada önce hava yolu/ventilasyon, TOF ile rezidüel NMB, kan şekeri ve EtCO₂/kan gazı değerlendirilmelidir."
      />

      {/* 5. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ */}
      <section
        id="sec-dozlar"
        className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'}`}
      >
        <div className="flex items-center gap-2.5">
          <Syringe className={`h-5 w-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
          <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Klinik Endikasyonlar ve Kanıta Dayalı Doz Rejimleri
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                <th className="py-2.5 pr-4 font-bold">Klinik Endikasyon</th>
                <th className="py-2.5 pr-4 font-bold">Önerilen Doz &amp; Yol</th>
                <th className="py-2.5 font-bold">Klinik Uygulama İncileri</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'}`}>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-emerald-600 dark:text-emerald-400 min-w-[190px]">
                  İyatrojenik Prosedürel / Anestezi BZD Sedasyonu Reversalı (Erişkin)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums min-w-[210px]">
                  0,2 mg IV 15 sn’de
                  <br />
                  <span className="text-[11px] font-normal text-slate-500">
                    45 sn bekle → 0,2 mg q60 sn (≤ 4 ek doz) · Σ maks 1 mg
                  </span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Resedasyonda 20 dk aralarla tekrar edilebilir (her seferde ≤ 1 mg, saatte ≤ 3 mg). Çoğu hasta 0,6–1 mg’da yanıt verir.
                  Amaç tam uyanıklık değil, yeterli bilinç ve hava yolu korumasıdır.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-rose-600 dark:text-rose-400">
                  Şüpheli BZD Zehirlenmesi (yalnızca seçilmiş saf BZD · bağımlı değil · toksikolog eşliğinde)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,2 mg → 0,3 mg → 0,5 mg IV
                  <br />
                  <span className="text-[11px] font-normal text-slate-500">her biri 30 sn’de · q1 dk · Σ 3 mg (nadiren 5 mg)</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  <strong>Sivilotti 2016:</strong> Kümülatif 5 mg’a yanıt yoksa sedasyonun nedeni BZD değildir. Karışık/bilinmeyen zehirlenmede, TSA
                  bulgularında ve kronik kullanıcıda verilmez; çoğu saf BZD zehirlenmesi destek tedavisiyle iyi seyreder.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-sky-600 dark:text-sky-400">Pediatrik Sedasyon Reversalı (&gt; 1 yaş)</td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,01 mg/kg IV (maks 0,2 mg) 15 sn’de
                  <br />
                  <span className="text-[11px] font-normal text-slate-500">q60 sn ≤ 4 tekrar · Σ 0,05 mg/kg veya 1 mg (düşük olan)</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  &lt; 1 yaşta veri sınırlıdır. Resedasyon riski erişkinle benzerdir; taburculuk öncesi uzatılmış gözlem gerekir.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-amber-600 dark:text-amber-400">
                  Midazolam Paradoks Reaksiyonu (dezinhibisyon / ajitasyon)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,1 – 0,2 mg IV titre
                  <br />
                  <span className="text-[11px] font-normal text-slate-500">küçük alikuotlarla, yanıta göre tekrar</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Özellikle çocuk ve yaşlılarda görülen paradoks ajitasyonda düşük doz flumazenil hızlı yanıt verebilir; hava yolu ve
                  hemodinami izlenmelidir.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-indigo-600 dark:text-indigo-400">
                  YBÜ Sürekli İnfüzyon (off-label: resedasyon / persistan BZD ilişkili hipoaktif deliryum)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,1 – 0,4 mg/saat IV
                  <br />
                  <span className="text-[11px] font-normal text-slate-500">pilot RKÇ: 0,05 – 0,3 mg/saat</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  <strong>Düşük kanıt düzeyi · uzman gözetimi.</strong> Uzun süreli midazolam infüzyonu sonrası yoksunluk nöbeti riski vardır;
                  PADIS 2018 BZD yerine BZD-dışı sedasyonu önerir.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={`rounded-xl border p-3.5 text-xs leading-relaxed ${
            isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <strong>Kapsam Sınırı:</strong> Flumazenil opioid, propofol, barbitürat, volatil anestezik ve etanol etkisini çevirmez. BZD kaynaklı{' '}
          <strong>sedasyonu</strong>, solunum depresyonu ve amneziden daha güvenilir şekilde geri döndürür — uyanık görünen hastada
          hipoventilasyon ve anterograd amnezi sürebilir.
        </div>
      </section>

      {/* 6. ETKİLEŞİMLİ DOZ & İNFÜZYON HESAPLAYICISI */}
      <section
        id="sec-hesaplayici"
        className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${
          isDark ? 'border-violet-500/30 bg-slate-900/80' : 'border-violet-200 bg-white shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Activity className={`h-5 w-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
            <div>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Etkileşimli Flumazenil Titrasyon &amp; İnfüzyon Hesaplayıcısı
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                TR 0,1 mg/mL ampul üzerinden mg → mL, kümülatif tavan denetimi ve güvenlik bayrakları
              </p>
            </div>
          </div>
          <MonographCopyButton isDark={isDark} getText={getReportText} label="Yatak Başı Rapor Kopyala" />
        </div>

        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'procedural', label: 'Prosedürel Reversal (Erişkin)' },
              { id: 'pediatric', label: 'Pediatrik' },
              { id: 'overdose', label: 'BZD Zehirlenmesi' },
              { id: 'infusion', label: 'Resedasyon İnfüzyonu' },
            ] as const
          ).map((tab) => (
            <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={tabBtnCls(activeTab === tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PROSEDÜREL REVERSAL (ERİŞKİN) */}
        {activeTab === 'procedural' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label htmlFor={procWtId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  Hasta Kilosu (kg)
                </label>
                <input
                  id={procWtId}
                  type="number"
                  min={30}
                  max={250}
                  value={procWeightKg}
                  onChange={(e) => setProcWeightKg(Math.max(30, Math.min(250, Number(e.target.value) || 30)))}
                  className={inputCls}
                />
                <p className="mt-1 text-[11px] text-slate-500">Erişkinde doz kilo bazlı değildir; sabit 0,2 mg alikuotlarla titre edilir.</p>
              </div>
              {flagCheckboxes}
            </div>
            <div className="lg:col-span-7 space-y-3">
              {renderFlagAlerts(isTcaMixed || hasEpilepsy)}
              <div className={panelCls}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Titrasyon Şeması
                  </span>
                  <span className="font-mono text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">
                    0,2 mg (2 mL) / 15 sn
                  </span>
                </div>
                {renderStepTable(procSteps, 1)}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className={cardCls}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Kümülatif Tavan</div>
                    <div className="mt-1 font-mono font-bold text-rose-600 dark:text-rose-400">1 mg (10 mL) · ilk seri</div>
                  </div>
                  <div className={cardCls}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Resedasyon</div>
                    <div className="mt-1 font-mono font-bold text-amber-600 dark:text-amber-400">20 dk ara · ≤ 1 mg/doz · ≤ 3 mg/saat</div>
                  </div>
                </div>
                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-indigo-950/30 border-indigo-500/40 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'}`}>
                  <strong>Gözlem Kuralı:</strong> Yeterli bilinç sağlanınca titrasyonu durdurun. Son dozdan sonra en az{' '}
                  <strong>2 saat</strong> SpO₂/SS/sedasyon izlemi; yüksek doz/uzun etkili BZD’de daha uzun.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PEDİATRİK */}
        {activeTab === 'pediatric' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label htmlFor={pedWtId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  Çocuk Kilosu (kg) — &gt; 1 yaş
                </label>
                <input
                  id={pedWtId}
                  type="number"
                  min={5}
                  max={80}
                  value={pedWeightKg}
                  onChange={(e) => setPedWeightKg(Math.max(5, Math.min(80, Number(e.target.value) || 5)))}
                  className={inputCls}
                />
              </div>
              {flagCheckboxes}
            </div>
            <div className="lg:col-span-7 space-y-3">
              {renderFlagAlerts(isTcaMixed || hasEpilepsy)}
              <div className={panelCls}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className={cardCls}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Tek Doz (0,01 mg/kg · maks 0,2 mg)</div>
                    <div className="mt-1 text-lg font-mono font-extrabold text-violet-600 dark:text-violet-400">
                      {fmt(pedDoseMg, 3)} mg
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">= {fmt(mlOf(pedDoseMg), 2)} mL (0,1 mg/mL) · 15 sn’de</div>
                  </div>
                  <div className={cardCls}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Kümülatif Tavan</div>
                    <div className="mt-1 text-lg font-mono font-extrabold text-rose-600 dark:text-rose-400">{fmt(pedCapMg, 3)} mg</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      0,05 mg/kg veya 1 mg (düşük olan) · {fmt(mlOf(pedCapMg), 1)} mL
                    </div>
                  </div>
                </div>
                {renderStepTable(pedSteps, 3)}
                {pedDoseMg < 0.05 && (
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Küçük hacim: 1 mL’lik (veya insülin) enjektör kullanın ya da 0,1 mg/mL ampulden 1 mL + 9 mL SF ile 0,01 mg/mL (10 mcg/mL)
                    hazırlayın.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BZD ZEHİRLENMESİ */}
        {activeTab === 'overdose' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label htmlFor={odWtId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  Hasta Kilosu (kg)
                </label>
                <input
                  id={odWtId}
                  type="number"
                  min={30}
                  max={250}
                  value={odWeightKg}
                  onChange={(e) => setOdWeightKg(Math.max(30, Math.min(250, Number(e.target.value) || 30)))}
                  className={inputCls}
                />
              </div>
              {flagCheckboxes}
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Uygulamadan önce 12 derivasyonlu EKG (QRS, QTc) ve ko-ingestan öyküsü alınmalıdır. Toksikoloji danışmanlığı önerilir.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-3">
              {renderFlagAlerts(odStop)}
              {!odStop && (
                <div className={panelCls}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      Kademeli Titrasyon (q1 dk)
                    </span>
                    <span className="font-mono text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">Σ maks 3 mg</span>
                  </div>
                  {renderStepTable(odSteps, 1)}
                  <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                    Kısmi yanıtta nadiren 5 mg’a kadar çıkılabilir. <strong>5 mg’a yanıt yoksa neden BZD değildir</strong> — başka etiyoloji
                    araştırın. Resedasyon için en az 2 saat (uzun etkili BZD’de daha uzun) monitörlü gözlem.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: RESEDASYON / YBÜ İNFÜZYONU */}
        {activeTab === 'infusion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label htmlFor={infRateId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  İnfüzyon Hızı (mg/saat)
                </label>
                <input
                  id={infRateId}
                  type="number"
                  min={0.05}
                  max={1}
                  step={0.05}
                  value={infRateMgHr}
                  onChange={(e) => setInfRateMgHr(Math.max(0.05, Math.min(1, Number(e.target.value) || 0.05)))}
                  className={inputCls}
                />
                <p className="mt-1 text-[11px] text-slate-500">Önerilen 0,1–0,4 mg/saat (pilot RKÇ 0,05–0,3 mg/saat).</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {(
                  [
                    { id: 'undiluted', label: 'Sulandırılmamış 0,1 mg/mL (örn. 1 mg / 10 mL)' },
                    { id: 'diluted', label: '2 mg + SF/D5W → 50 mL (40 mcg/mL)' },
                  ] as const
                ).map((c) => (
                  <button key={c.id} type="button" onClick={() => setInfConc(c.id)} className={tabBtnCls(infConc === c.id)}>
                    {c.label}
                  </button>
                ))}
              </div>
              {flagCheckboxes}
            </div>
            <div className="lg:col-span-7 space-y-3">
              <div
                className={`rounded-xl border p-3 text-xs flex items-start gap-2 ${
                  isDark ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Off-label · düşük kanıt · uzman gözetimi.</strong> Uzun süreli midazolam alan YBÜ hastasında flumazenil yoksunluk nöbeti
                  tetikleyebilir; infüzyon en düşük etkili hızda tutulmalıdır.
                </span>
              </div>
              {renderFlagAlerts(isTcaMixed || hasEpilepsy)}
              {infHighRate && (
                <div className={`rounded-xl border p-3 text-xs ${isDark ? 'bg-rose-950/40 border-rose-500/40 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'}`}>
                  <strong>Hız 0,4 mg/saat üzerinde:</strong> Literatürde önerilen aralığın üstündesiniz — endikasyonu ve resedasyon nedenini yeniden
                  değerlendirin.
                </div>
              )}
              <div className={panelCls}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono tabular-nums">
                  <div className={cardCls}>
                    <div className="text-[10px] uppercase text-slate-400">Saatlik Doz</div>
                    <div className="text-lg font-extrabold text-violet-600 dark:text-violet-400 mt-1">{infMcgHr} mcg/sa</div>
                    <div className="text-[11px] text-slate-500">{fmt(infRateMgHr)} mg/saat</div>
                  </div>
                  <div className={cardCls}>
                    <div className="text-[10px] uppercase text-slate-400">Pompa Hızı</div>
                    <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{fmt(infMlHr, 1)} mL/sa</div>
                    <div className="text-[11px] text-slate-500">{infConc === 'undiluted' ? '0,1 mg/mL' : '0,04 mg/mL (40 mcg/mL)'}</div>
                  </div>
                  <div className={cardCls}>
                    <div className="text-[10px] uppercase text-slate-400">24 Saatlik Toplam</div>
                    <div className="text-lg font-extrabold text-amber-600 dark:text-amber-400 mt-1">{fmt(infDailyMg, 1)} mg</div>
                    <div className="text-[11px] text-slate-500">≈ {Math.ceil(infDailyMg / 0.5)} × 0,5 mg ampul</div>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Hazırlanan çözelti 24 saat içinde kullanılmalıdır. İnfüzyonu sonlandırırken resedasyon açısından en az 2 saat yakın izlem sürdürün.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 7. TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0) */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Anexate® 0,5 mg / 5 mL Ampul',
            presentation: '5 mL berrak, renksiz enjeksiyonluk çözelti içeren ampul (IV kullanım)',
            concentration: '0,1 mg/mL (100 mcg/mL)',
            saltOrBaseNote: '1 tam ampul = 0,5 mg; erişkin başlangıç dozu 0,2 mg = 2 mL. Tam ampulün tek seferde verilmesi aşırı hızlı reversal, ajitasyon ve nöbet riskidir.',
            alertLevel: 'high',
          },
          {
            name: 'Flumazenil (örn. Hameln / jenerik) 0,5 mg / 5 mL ve 1 mg / 10 mL Ampul',
            presentation: '5 mL veya 10 mL enjeksiyonluk çözelti içeren ampul',
            concentration: '0,1 mg/mL (her iki boyutta aynı konsantrasyon)',
            saltOrBaseNote: '10 mL ampul = 1 mg (erişkin prosedürel ilk seri kümülatif tavanının tamamı). Ampul boyutu değil mg miktarı esas alınmalıdır.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Standart bolus: Sulandırılmadan (0,1 mg/mL) kullanılır — 2 mL = 0,2 mg; 1 mL = 0,1 mg mikro-titrasyon.',
          'Pediatrik hassas titrasyon (10 mcg/mL): 1 mL (0,1 mg) + 9 mL %0,9 NaCl = 10 mL → 1 mL = 0,01 mg.',
          'YBÜ infüzyonu (sulandırılmamış): 1 mg/10 mL ampul doğrudan perfüzöre → 0,1 mg/mL.',
          'YBÜ infüzyonu (sulandırılmış): 2 mg (4 × 0,5 mg/5 mL = 20 mL) + 30 mL %0,9 NaCl, %5 Dekstroz veya Ringer Laktat = 50 mL → 40 mcg/mL.',
        ]}
        concentrationTrapWarning="5 mL’lik ampul yalnızca 0,5 mg içerir; tam ampul ilk 0,2 mg dozunun 2,5 katıdır. Daima 2 mL (0,2 mg) çekip 15 sn’de verin ve 45–60 sn bekleyin. Flumazenil ve nalokson enjektörlerini ayrı ve açıkça etiketleyin."
      />

      {/* 8. DAMAR YOLU, pH, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0) */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="peripheral-ok"
        accessSummary="Periferik veya santral IV hattan uygulanabilir. Enjeksiyon ağrısı ve tromboflebiti azaltmak için serbest akan IV infüzyon hattından, büyük bir vene verilmesi önerilir."
        phRange="~4 (asidik)"
        osmolalityNote="Asidik pH nedeniyle küçük venlerde ve ekstravazasyonda lokal ağrı/irritasyon yapabilir; doku vezikanı değildir."
        compatibleDiluents={['%0,9 Sodyum Klorür (SF)', '%5 Dekstroz (D5W)', 'Ringer Laktat (RL)']}
        stabilityNote="Enjektöre çekilen veya SF/D5W/RL ile sulandırılan çözelti 24 saat içinde kullanılmalı, sonrasında atılmalıdır."
        ySiteCompatible={['%0,9 NaCl', '%5 Dekstroz', 'Ringer Laktat (serbest akan taşıyıcı hat)']}
        ySiteIncompatible={['Aynı enjektörde başka ilaçlarla karıştırmayın (spesifik uyumluluk verisi sınırlı)']}
        extravasationProtocol="Ekstravazasyonda lokal ağrı ve irritasyon gelişebilir: enjeksiyonu durdurun, kateteri çıkarın, ekstremiteyi eleve edin ve lokal takip yapın. Dozu yeni ve sağlam bir IV yoldan sürdürün."
      />

      {/* 9. BÖBREK VE KARACİĞER YETMEZLİĞİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Böbrek yetmezliği ve diyalizde doz ayarlaması gerekmez."
        renalDetails={[
          'Flumazenil hepatik olarak inaktif metabolite çevrilir; böbrek fonksiyonu farmakokinetiği klinik olarak anlamlı etkilemez.',
          'Ancak böbrek yetmezliğinde midazolamın aktif α-OH-midazolam glukuronidi birikebildiğinden resedasyon riski ve gözlem süresi artar.',
        ]}
        hepaticSummary="Başlangıç titrasyon dozu değişmez; tekrar dozlarını azaltın ve aralığı uzatın."
        hepaticDetails={[
          'Orta karaciğer yetmezliğinde klirens %40–60’a, ağır yetmezlikte ~%25’e düşer; t½ ~1,3 sa / ~2,4 sa’e uzar.',
          'Karaciğer yetmezliğinde BZD klirensi de bozulduğundan resedasyon ve hepatik ensefalopati ayrımı açısından uzatılmış izlem gerekir.',
        ]}
        {...STANDALONE_ORGAN_PART1['flumazenil']}
      />

      {/* 10. GERİATRİ & OBEZİTE DOZ YÖNETİMİ (v4.0) */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="Düşük Uçtan Başla · Yavaş Titrasyon"
        geriatricPoints={[
          'Yaşlı ve kırılgan hastada titrasyona düşük uçtan (0,1–0,2 mg) başlayın ve her dozdan sonra yanıtı tam bekleyin.',
          'Yaşlılarda BZD eliminasyonu yavaştır (özellikle diazepam, midazolam) → resedasyon riski yüksektir; uzatılmış monitörlü gözlem gerekir.',
          'Ani reversal ile katekolamin deşarjı, aritmi ve ajitasyon/deliryum riski artar; tam uyanıklık değil yeterli bilinç hedeflenir.',
        ]}
        obesityWeightScalarBadge="Erişkinde Sabit Titre Doz (kilo bazlı değil)"
        obesityPoints={[
          'Erişkin obez hastada flumazenil kilo bazlı hesaplanmaz; sabit 0,2 mg alikuotlarla klinik yanıta göre titre edilir (Σ maks 1 mg ilk seri).',
          'Pediatrik dozlama kilo bazlıdır (0,01 mg/kg) ancak tek doz 0,2 mg ve kümülatif 0,05 mg/kg veya 1 mg tavanıyla sınırlıdır.',
          'Lipofilik BZD’ler yağ dokusunda birikir ve yavaş salınır → obez ve OSA’lı hastada resedasyon ve üst hava yolu obstrüksiyonu riski artar.',
        ]}
        clinicalNote="Obez/OSA hastada flumazenil sonrası baş elevasyonu, gerekirse CPAP ve uzatılmış SpO₂/kapnografi izlemi önerilir."
      />

      {/* 11. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="İnsan verisi sınırlıdır; yalnızca açık klinik fayda varsa (örn. iyatrojenik ağır BZD sedasyonu) kullanılmalıdır."
        pregnancyDetails={[
          'Maternal hipoksi fetüs için en büyük risktir — önce hava yolu ve ventilasyon desteği sağlanmalıdır.',
          'Kronik BZD kullanan gebede maternal yoksunluk/nöbet ve fetal stres riski nedeniyle kaçınılmalıdır.',
          'Doğum öncesi maternal BZD maruziyetine bağlı yenidoğan depresyonunda dikkatle ve düşük dozda kullanılabilir; öncelik solunum desteğidir.',
        ]}
        lactationSummary="Kısa yarı ömrü nedeniyle tek doz sonrası emzirme ile uyumlu kabul edilir."
        lactationDetails={[
          'Tek doz sonrası emzirmeye ara vermek genellikle gerekmez; tekrarlayan doz/infüzyon sonrası bebek sedasyon açısından izlenebilir.',
        ]}
      />

      {/* 12. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Nöbet / Konvülsiyon',
            incidenceOrSeverity: 'Ciddi · Kutulu Uyarı',
            tone: 'rose',
            detail:
              'Özellikle kronik BZD kullanıcısında ve proconvulsant ko-ingestanlarda (TSA vb.). Penninga 2016 meta-analizinde (BZD zehirlenmesi) flumazenil ile advers olay RR 2,85, ciddi advers olay RR 3,81 (plaseboya göre); en sık ciddi olaylar SVT ve konvülsiyon.',
          },
          {
            title: 'Supraventriküler Aritmiler',
            incidenceOrSeverity: 'Ciddi',
            tone: 'rose',
            detail: 'Ani reversale bağlı katekolamin artışı ile SVT ve diğer taşiaritmiler; TSA kardiyotoksisitesinin maskesinin kalkması.',
          },
          {
            title: 'BZD Yoksunluğu, Ajitasyon & Panik',
            incidenceOrSeverity: 'Kronik Kullanıcıda Sık',
            tone: 'amber',
            detail: 'Anksiyete, ajitasyon, panik atak, titreme, terleme; kronik kullanıcıda akut yoksunluk sendromu.',
          },
          {
            title: 'Resedasyon',
            incidenceOrSeverity: '20–120 dk Sonra',
            tone: 'amber',
            detail: 'Flumazenil etkisi BZD’den kısa sürdüğünde sedasyon ve hipoventilasyon geri döner — ≥ 2 saat gözlem.',
          },
          {
            title: 'Bulantı / Kusma',
            incidenceOrSeverity: 'Sık',
            tone: 'indigo',
            detail: 'Ani uyanma ile kusma ve aspirasyon riski; hava yolu refleksleri tam dönmemiş hastada dikkat.',
          },
          {
            title: 'Enjeksiyon Yeri Ağrısı & Flushing',
            incidenceOrSeverity: 'Sık · Hafif',
            tone: 'teal',
            detail: 'Asidik çözelti nedeniyle küçük vende ağrı/tromboflebit; yüz kızarması, baş dönmesi, baş ağrısı.',
          },
        ]}
      />

      {/* 13. ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Resedasyon: Erken Taburculuk Tuzağı',
            detail:
              'Flumazenil t½’si midazolam (ve aktif metaboliti), diazepam ve lorazepamdan kısadır. Uyanan hasta 20–120 dk sonra tekrar sedatize olabilir — son dozdan sonra en az 2 saat monitörlü gözlem.',
          },
          {
            title: 'Önce Hava Yolu & Ventilasyon',
            detail:
              'BZD hipoventilasyonunun ana mekanizması üst hava yolu obstrüksiyonudur; flumazenil solunum depresyonunu sedasyon kadar güvenilir çevirmez. Çene itme, %100 O₂, BVM/NIV ilk basamaktır.',
          },
          {
            title: 'Karışık BZD + Opioid Sedasyonu',
            detail:
              'Opioid solunum depresyonunu flumazenil düzeltmez. Önce nalokson titre edin; yanıt yetersizse ve kontrendikasyon yoksa flumazenil ekleyin.',
          },
          {
            title: 'Asla Ampirik "Koma Kokteyli" Değil',
            detail:
              'Bilinmeyen/karışık zehirlenmede (TSA, bupropion, tramadol vb.) flumazenil nöbet ve aritmiyi açığa çıkarır (Sivilotti 2016). EKG ve öykü olmadan verilmez.',
          },
          {
            title: 'Nöromüsküler Blok Altındaki Hasta',
            detail:
              'Kas gevşetici etkisi tamamen geri döndürülmeden (TOF oranı ≥ 0,9) BZD reversalı yapılmamalıdır; aksi halde paralize ancak uyanık hasta (farkındalık) riski oluşur.',
          },
          {
            title: 'YBÜ’de Uzun Süreli Midazolam',
            detail:
              'Günler süren BZD infüzyonu sonrası flumazenil akut yoksunluk ve nöbet tetikleyebilir; "uyandırma testi" için rutin kullanılmaz.',
          },
        ]}
      />

      {/* 14. DERİN FARMAKODİNAMİK (AKORDİYON · v4.0) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (Pentamerik GABA-A Reseptörü Ekstraselüler α₁,₂,₃,₅ / γ₂ Allosterik BZD Cebi & Alt-Birim Seçiciliği)',
          summary:
            'Flumazenil (etil 8-floro-5,6-dihidro-5-metil-6-okso-4H-imidazo[1,5-a][1,4]benzodiyazepin-3-karboksilat; Ro 15-1788), postsinaptik nöron membranındaki pentamerik ligand-kapılı klorür kanalı olan GABA-A reseptör kompleksinin (2α : 2β : 1γ₂ stokiyometrisi) ekstraselüler N-terminal alanında, α₁/α₂/α₃/α₅ alt birimi (+) yüzü ile γ₂ alt birimi (−) yüzü arasındaki yüksek afiniteli allosterik Benzodiyazepin (BZD) bağlanma cebine (α₁-His101 rezidüsü) Ki ≈ 0,8–1,2 nM afiniteyle bağlanan kompetitif antagonisttir (nötr allosterik modülatör) (Miller’s 10th Ed. / Stoelting’s 6th Ed. / Whitwam 1995).',
          points: [
            'α₁,₂,₃,₅ / γ₂ Allosterik BZD Cebi vs Ortosterik GABA Bağlanma Bölgesi Ayrımı: Klasik benzodiyazepinleri (midazolam, diazepam, lorazepam), ultra-kısa etkili remimazolamı ve non-BZD "Z-ilaçlarını" (zolpidem, zopiklon, zaleplon — α₁/γ₂ seçici) allosterik cepten kompetitif olarak uzaklaştırır; buna karşın β+/α− ara yüzündeki ortosterik endojen GABA bağlanma bölgesine DOKUNMAZ ve bazal fizyolojik GABAerjik Cl⁻ iletimini bloke etmez.',
            'α Alt-Birim Farmakodinamik Profili (α₁,₂,₃,₅ Duyarlı vs α₄/α₆ Duyarsız): α₁ (kortikal sedasyon, anterograd amnezi ve antikonvülzan etki) alt birimi üzerinde saf nötr antagonist iken; α₂/α₃ (anksiyoliz, miyorölaksasyon) ve α₅ (hipokampal bellek) alt birimlerinde ihmal edilebilir düzeyde zayıf parsiyel intrinsik aktivite gösterir. Histidin yerine Arjinin taşıyan ekstrasinaptik α₄ ve α₆ alt birimlerine ise ne BZD’ler ne de flumazenil bağlanır.',
            'Propofol, Barbitürat, Etomidat, Volatil Anestezik & Etanol Bölgelerinden Tam Bağımsızlık: GABA-A reseptörünün transmembran β₂/β₃ alt birim ceplerine bağlanan Propofol ve Etomidat’ı, kanal açılma süresini uzatan Barbitüratları, nörosteroidleri, inhalasyon anesteziklerini veya μ-opioid reseptörlerini (MOR) kesinlikle antagonize etmez.',
            'Hızlı KBB Geçişi & PET Reseptör Doluluk (Occupancy) Kinetiği: Orta lipofilisite ve düşük plazma protein bağlanması (~%50) sayesinde IV enjeksiyondan 1–2 dakika sonra serebral korteks GABA-A reseptörlerine ulaşır; 0,2 mg IV doz BZD reseptörlerinin ~%40–50’sini, 0,6–1,0 mg kümülatif doz ise >%75–85’ini işgal ederek klinik sedasyonu tersine çevirir.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'Flumazenilin ekstraselüler α/γ₂ cebinden BZD agonistini uzaklaştırması, postsinaptik nöronda Cl⁻ iyon akışını ve membran potansiyelini milisaniyeler içinde normalize ederken; kronik BZD toleransı veya TSA varlığında patolojik eksitatör Ca²⁺/Na⁺ deşarjını serbest bırakır:',
          points: [
            'GABA-Kapılı Cl⁻ Kanal Açılma Frekansının (f_open) Normalizasyonu: Benzodiyazepinler GABA’nın reseptöre afinitesini artırarak Cl⁻ kanalının açılma frekansını (sıklığını) yükseltir ve hücre içine aşırı Cl⁻ girişiyle membranı −75 / −80 mV’a hiperpolarize eder. Flumazenil BZD’yi cepten çıkararak Cl⁻ kanal açılma frekansını bazal endojen GABA düzeyine geri indirir → postsinaptik membran dinlenim potansiyeline (−65 mV) döner ve piramidal nöron ateşlemesi yeniden başlar.',
            'Bazal Endojen GABAerjik Tonusun Korunması (Pikrotoksin/Bikukullin’den Farkı): Ortosterik GABA antagonisti (bikukullin) veya Cl⁻ kanal por blokeri (pikrotoksin) olmadığı için, BZD bulunmayan sağlıklı bir nöronda bazal Cl⁻ iletkenliğini kapatmaz ve kendi başına konvülsiyon üretmez.',
            'Kronik BZD Toleransında Hücresel Adaptasyon & Akut Nöbet Kaskadı (Down-Regüle GABA-A + Up-Regüle NMDA/Cav): Uzun süreli BZD maruziyetinde nöronlar; (1) GABA-A α₁/γ₂ alt birimlerini fosforilleyip endositozla hücre içine çekerek (down-regülasyon) ve allosterik kenetlenmeyi bozarak ("uncoupling") inhibitör kapasiteyi azaltır, (2) Kompansatuar olarak eksitatör glutamaterjik NMDA/AMPA reseptörlerini ve L-tipi voltaj kapılı Ca²⁺ kanallarını yukarı regüle eder. Flumazenil verildiğinde kalan son Cl⁻ hiperpolarizasyon kalkanı da aniden çöker (+ adapte reseptörde zayıf ters agonizma) → hücre içine kontrolsüz Na⁺ ve Ca²⁺ akışı, CaMKII aktivasyonu ve durdurulamayan senkronize epileptiform deşarj (status epileptikus) başlar.',
            'Prokonvülzan Ko-İngestanlarda (Trisiklik Antidepresan / TSA) Maskenin Kalkması: TSA zehirlenmesinde presinaptik NE/5-HT geri alım blokajı, muskarinik M1 ve histaminerjik H1 blokajı ile GABA-A inhibisyonu kortikal nöbet eşiğini düşürürken; alınan eşzamanlı BZD yüksek Cl⁻ akımıyla bu nöbeti bastırmaktadır. Flumazenil bu Cl⁻ frenini kaldırdığı anda jeneralize nöbet patlak verir; nöbetin yarattığı laktik/respiratuar asidoz (pH↓) ise TSA’nın α₁-asit glikoproteinden ayrılmasına ve kardiyak Nav1.5 kanallarına bağlanmasına ("ion trapping") yol açarak geniş QRS’li ölümcül ventriküler taşikardi/fibrilasyon başlatır.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Talamokortikal Ağ, ARAS & Hipokampal CA1 Devresi → Santral Sinir Sistemi',
            tissueTarget: 'Serebral Korteks (α₁) · Hipokampus (α₅) · Amigdala (α₂/α₃)',
            accent: 'violet',
            points: [
              'Diferansiyel Geri Dönüş (Sedasyon / Hipnoz >> Anterograd Amnezi): Asendan retiküler aktive edici sistem (ARAS) ve talamokortikal α₁-GABA-A reseptörlerindeki BZD işgalini %50–70 düşürmek hastanın gözünü açıp sözlü komutlara uyması (sedasyon reversalı) için yeterlidir; ancak hipokampal CA1 piramidal nöronlarındaki (α₅/α₁) uzun süreli potansiyalizasyon (LTP) baskılanması ve psikomotor yavaşlık tam silinmediğinden, uyanık görünen hastada anterograd amnezi devam eder!',
              'Midazolam Paradoks Eksitasyonunun (Disinhibisyon) Çözülmesi: Çocuklarda ve yaşlılarda midazolamın kortikal/limbik inhibitör internöronları seçici baskılamasıyla gelişen paradoksal ajitasyon, ağlama ve saldırganlık tablosunu 0,1–0,2 mg düşük doz flumazenil 1–2 dakikada dramatik biçimde sakinleştirir.',
              'Serebral Hemodinami (CBF / CMRO₂) & Kafa İçi Basıncı (KİB): Sağlıklı bireyde CBF ve ICP üzerinde nötrdür; ancak ağır kafa travması veya intrakraniyal kitle nedeniyle BZD sedasyonu altında tutulan hastada flumazenil verilmesi, CMRO₂ ve sempatik kan basıncı sıçramasıyla KİB’i (ICP) tehlikeli biçimde yükseltir.',
            ],
          },
          {
            systemTitle: 'Faringeal Dilatatör Kaslar & Medüller Solunum Merkezi → Solunum & Hava Yolu',
            tissueTarget: 'Genioglossus / Üst Hava Yolu (α₂/α₃) · Medüller Merkez · Karotid Cisimcik',
            accent: 'teal',
            points: [
              'Üst Hava Yolu Obstrüksiyonunun Çözülmesi vs Santral CO₂ Yanıtı Tutarsızlığı: Benzodiyazepin hipoventilasyonunun birincil mekanizması genioglossus ve faringeal dilatatör kasların (α₂/α₃ miyorölaksasyon) gevşemesine bağlı üst hava yolu kollapsıdır. Flumazenil bilinci ve faringeal kas tonusunu hızla düzelterek obstrüktif apneyi açar; ancak medüller santral PaCO₂ yanıt eğrisi ve hipoksik ventilatuar dürtü üzerindeki geri dönüşü tam ve güvenilir değildir.',
              'Opioid + BZD Sinerjistik Solunum Depresyonunda Kısmi Etki: Midazolam + Fentanil uygulanan hastada flumazenil yalnızca BZD’nin supra-aditif çarpanını kaldırır; pre-Bötzinger kompleksi üzerindeki doğrudan MOR (μ₂) solunum depresyonu devam eder (bu nedenle kombine sedasyon apnesinde ÖNCE BVM ventilasyon + Nalokson uygulanır).',
              'Koruyucu Hava Yolu Refleksleri & Resedasyon Aspirasyonu: Yutkunma, öksürük ve laringeal adduktör refleksleri geri kazandırır; ancak 30–60 dakika sonra gelişen resedasyonda hava yolu tekrar kapanabileceği için erken oral besleme veya monitörsüz bırakma aspirasyon riski taşır.',
            ],
          },
          {
            systemTitle: 'Otonomik Sempatik Çekirdekler, Miyokard & İleti Sistemi → Kardiyovasküler Sistem',
            tissueTarget: 'RVLM Sempatik Tonus · SA/AV İleti Sistemi · Koroner Yatak',
            accent: 'rose',
            points: [
              'İntrinsik Kardiyovasküler Nötrlük vs Akut Sempatik Deşarj: Doğrudan miyokardiyal inotropi, kronotropi veya vasküler düz kas tonusu üzerinde farmakolojik etkisi yoktur. Ancak anestezi veya yoğun bakım sedasyonundan hızlı/yüksek doz (≥0,5–1 mg tek puşe) uyandırılan hastada ani anksiyete ve sempatoadrenal katekolamin deşarjıyla hipertansiyon, sinüs taşikardisi ve MVO₂ artışı tetikler.',
              'Supraventriküler Taşiaritmiler (SVT) & Penninga 2016 Bulgusu: Şüpheli BZD intoksikasyonu RCT meta-analizinde (Penninga 2016) flumazenil grubunda plaseboya kıyasla ciddi advers olay riski 3,81 kat yüksek bulunmuş olup, konvülsiyonla birlikte en sık ciddi kardiyak komplikasyon supraventriküler taşiaritmiler (SVT / AF) olmuştur.',
              'Siklo-Antidepresan (TSA) Kardiyotoksisitesinin Provokasyonu: Karışık zehirlenmede flumazenil sonrası gelişen nöbet, hipoksi ve asidoz; TSA’nın miyokardiyal Nav1.5 blokajını hızlandırarak QRS genişlemesi (>100 ms), sağ dal bloğu (aVR’de R dalgası), ventriküler taşikardi ve refrakter hipotansiyonu açığa çıkarır.',
            ],
          },
          {
            systemTitle: 'Hepatik Sinüzoid Karboksilesterazları & Periferik Dağılım → Karaciğer & Metabolizma',
            tissueTarget: 'Hepatik Karboksilesterazlar · Portal/Sistemik Dolaşım · Böbrek Atılımı',
            accent: 'amber',
            points: [
              'Akım-Bağımlı Yüksek Hepatik Ekstraksiyon (~0,60) & Kısa Terminal Yarı Ömür (t½ ≈ 40–80 dk): Karaciğerde yüksek kapasiteli hepatik karboksilesterazlar tarafından etil ester bağının hidroliziyle tamamen İNAKTİF flumazenil karboksilik aside (ve glukuronid konjugatına) yıkılır; toplam plazma klirensi (~500–1300 mL/dk) doğrudan hepatik kan akımına bağımlıdır.',
              'Sirozda Yarı Ömür Uzaması & Hepatik Ensefalopati Tartışması: Orta karaciğer yetmezliğinde (Child-Pugh B) klirens %50 düşer (t½ ~1,3 sa), ağır sirozda (Child-Pugh C) klirens %75 düşerek t½ ~2,4 saate uzar. Sirotik hepatik ensefalopatide artmış endojen "benzodiyazepin-benzeri" ligandları ve nörosteroid/GABA tonusunu geçici olarak (<1–2 saat) iyileştirebilse de sağkalım faydası olmadığından rutin önerilmez.',
              'Böbrek Yetmezliğinde Aktif Midazolam Metaboliti (α-OH-Midazolam Glukuronid) Tuzağı: Flumazenilin kendi kinetiği böbrek yetmezliğinden etkilenmez; ancak eGFR <30 mL/dk olan hastada midazolamın sedatif açıdan aktif glukuronid metaboliti vücutta günlerce biriktiğinden, tek doz flumazenil sonrası ağır ve tekrarlayan resedasyon gelişir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Aşılabilir (Surmountable) Antagonizma, Resedasyon Biyofiziği & 5 mg Tanısal Tavan Kuralı',
          summary:
            'Flumazenil ile benzodiyazepinler arasındaki ilişki "kütle etkisi yasasına" (Law of Mass Action) dayanan klasik, geri dönüşümlü ve aşılabilir (surmountable) bir kompetitif yarışmadır.',
          points: [
            'Sağa Kaymış Schild Eğrisi & Nöbet Kurtarmasında Yüksek BZD Gereksinimi: Flumazenil varlığında BZD doz-yanıt eğrisi maksimum etki (Emax) değişmeden paralel olarak sağa kayar. Bu biyofiziksel özelliğin hayati klinik sonucu şudur: Flumazenil verildikten sonra hastada yoksunluk nöbeti gelişirse, reseptördeki flumazenil blokajını aşabilmek (surmount) için standarttan daha yüksek doz IV Midazolam/Lorazepam veya BZD cebinden bağımsız çalışan Propofol / Fenobarbital uygulanması gerekir.',
            'Farmakokinetik Süre Uyumsuzluğu (t½ ~50 dk) → Resedasyon Mekaniği: Flumazenil beyinden hızla dağılır (t½α 4–11 dk) ve karaciğerde hızla yıkılır (t½β ~50 dk). Oysa Diazepam (t½ 20–50 sa + aktif desmetildiazepam 100 sa), Lorazepam (t½ 10–20 sa) ve yüksek doz/uzamış Midazolam (t½ 2–6 sa, obezde ve YBÜ’de çok daha uzun) plazmada ve beyinde kalmaya devam eder → flumazenil konsantrasyonu eşik altına indiği anda (20–120 dk sonra) BZD molekülleri α/γ₂ cebini yeniden işgal ederek hastayı tekrar komaya/hipoventilasyona sokar.',
            'Kümülatif Tavan Eşiği (Prosedürel 1 mg · Zehirlenme 3–5 mg) & Remimazolam Reversalı: Prosedürel sedasyonda 0,2 mg’lık (2 mL) adımlarla 1 mg’a (zehirlenmede 3 mg, nadiren 5 mg) ulaşıldığında serebral BZD reseptörlerinin >%80–90’ı doygunluğa ulaşır. Kümülatif 3–5 mg IV flumazenile rağmen bilinç açılmıyorsa, komanın nedeni GABA-A BZD cebi DEĞİLDİR (tavan etkisi). Öte yandan plazma doku esterazlarıyla yıkılan yeni ultra-kısa etkili BZD Remimazolam’ın sedasyonu 0,2–0,5 mg flumazenille hızla çevrilir; ancak yüksek doz remimazolam sonrası erken flumazenil verilirse yine resedasyon görülebilir.',
          ],
        }}
        clinicalPearls={[
          'Neden Flumazenil "Koma Kokteyli"nden Çıkarıldı? (Penninga 2016 & Sivilotti 2016): Acil servise bilinci kapalı gelen ve ne aldığı bilinmeyen hastada saf BZD zehirlenmesi nadiren ölümcüldür (destek tedavisiyle sağkalım >%99); buna karşın ampirik flumazenil verilmesi gizli TSA/bupropion/tramadol ko-ingestiyonunda veya kronik BZD bağımlısında durdurulamayan status epileptikus ve ventriküler aritmi tetikler (ciddi advers olay RR 3,81!). Uygulama öncesi 12-derivasyon EKG (QRS < 100 ms, normal QTc) ve kronik BZD/epilepsi dışlaması mutlak şarttır.',
          '"2 mL (0,2 mg) / 15 Saniye + 45 Saniye Bekle" Titrasyon Kuralı: Türkiye’deki 5 mL’lik Anexate® ampulü 0,5 mg (10 mL’lik ampul 1 mg) içerir. İlk doz tam ampul DEĞİL, yalnızca 2 mL’dir (0,2 mg). Beyin-plazma dengelenmesi ve pik etki 6–10 dakika sürdüğünden, her 2 mL’lik dozdan sonra en az 45–60 saniye beklenmeli; hasta tam uyanıklığa değil, hava yolunu koruyup sözlü uyarana yanıt verecek düzeye gelince titrasyon durdurulmalıdır.',
          '"Uyanık Hasta ≠ Taburcu Edilebilir Hasta" (Amnezi & 2 Saat Gözlem Kuralı): Flumazenil sonrası sedasyonu açılıp yatakta oturan hasta, α₅-hipokampal amnezi devam ettiği için taburcu edilirse verilen hiçbir tıbbi talimatı hatırlamaz ve 45 dakika sonra evde/araçta resedasyona girerek solunum obstrüksiyonu yaşar — son flumazenil dozundan sonra en az 2 saat PACU/acil servis gözlemi zorunludur.',
          'Paralize Hastada Farkındalık (Awareness) Felaketi: Genel anestezi bitiminde veya YBÜ’de hastaya roküronyum/vekuronyum verilmişse, kantitatif TOF monitörizasyonuyla (TOF oranı ≥ 0,9) nöromüsküler bloğun tam kalktığı doğrulanmadan (veya Sugammadeks/Neostigmin uygulanmadan) ASLA flumazenil verilmemelidir; aksi halde hasta kasları felçli olduğu halde bilinci tamamen açık kalarak korkunç bir psikolojik travma yaşar.',
        ]}
      />

      {/* 15. İLAÇ ETKİLEŞİMLERİ & KAYNAKÇA (v4.0) */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Flumazenil"
        drugsComUrl="https://www.drugs.com/drug-interactions/flumazenil.html"
        medscapeUrl="https://reference.medscape.com/drug/flumazenil-343736"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Trisiklik Antidepresanlar & Proconvulsant Ko-ingestanlar (Karışık Zehirlenme: TSA · Bupropion · Tramadol · İzoniazid · Teofilin · Kokain)',
            mechanism: 'BZD antikonvülzan korumasının kaldırılması + TSA Na⁺ kanal kardiyotoksisitesinin maskesinin kalkması',
            clinicalEffect: 'Nöbet, status epileptikus, ventriküler aritmi ve ölüm.',
            management: 'Flumazenil VERMEYİN. Destek tedavisi, hava yolu; TSA’da QRS genişliğine sodyum bikarbonat.',
          },
          {
            severity: 'X',
            agent: 'Kronik BZD Bağımlılığı & BZD ile Kontrol Edilen Epilepsi (X/D)',
            mechanism: 'Adapte reseptörlerde ani GABAerjik ton kaybı (zayıf parsiyel ters agonizma)',
            clinicalEffect: 'Akut BZD yoksunluğu, ajitasyon, nöbet / status epileptikus.',
            management: 'Kaçının; zorunluysa 0,1 mg mikro-titrasyon, tam reversal hedeflemeyin; nöbette BZD ± propofol/fenobarbital hazır.',
          },
          {
            severity: 'D',
            agent: 'Midazolam (yüksek doz/infüzyon) · Diazepam · Lorazepam (uzun etkili)',
            mechanism: 'Farmakokinetik süre uyumsuzluğu (flumazenil t½ ~50 dk)',
            clinicalEffect: 'Flumazenil etkisi bittikten sonra resedasyon ve hipoventilasyon.',
            management: '≥ 2 saat monitörlü gözlem; 20 dk aralarla tekrar doz (≤ 1 mg/doz, ≤ 3 mg/saat) veya düşük doz infüzyon.',
          },
          {
            severity: 'D',
            agent: 'Opioidler (BZD + opioid ko-sedasyonu)',
            mechanism: 'Flumazenil μ-opioid reseptörüne etki etmez',
            clinicalEffect: 'BZD sedasyonu kalkarken opioid solunum depresyonu devam eder; sinerjistik hipoventilasyon sürebilir.',
            management: 'Önce nalokson titre edin; ventilasyonu destekleyin; flumazenil yalnızca kalan BZD etkisi için.',
          },
          {
            severity: 'C',
            agent: 'Nöromüsküler Blokerler (Rezidüel Blok)',
            mechanism: 'Farklı reseptör sistemi — flumazenil NMB’yi çevirmez',
            clinicalEffect: 'Paralize fakat uyanık hasta (farkındalık) veya hipoventilasyonun yanlış BZD’ye atfedilmesi.',
            management: 'TOF oranı ≥ 0,9 doğrulanmadan BZD reversalı yapmayın; NMB’yi sugammadeks/neostigmin ile önce çevirin.',
          },
          {
            severity: 'C',
            agent: 'Remimazolam',
            mechanism: 'BZD bölgesinde kompetitif antagonizma',
            clinicalEffect: 'Remimazolam sedasyonu flumazenil ile çevrilir (ED90 ~77 mcg bildirilmiştir); kısa etkili olduğundan resedasyon riski düşüktür.',
            management: 'Gerekirse düşük doz titre edin; hava yolu ve sedasyon skorunu izleyin.',
          },
        ]}
        references={[
          {
            authors: 'Sivilotti MLA.',
            title: 'Flumazenil, naloxone and the “coma cocktail”',
            journal: 'British Journal of Clinical Pharmacology. 2016',
            year: 2016,
            pmid: '26469689',
            doi: '10.1111/bcp.12731',
            note: 'Flumazenilin zehirlenmede seçici kullanımı, ampirik koma kokteylinin reddi ve nöbet/aritmi riskleri.',
          },
          {
            authors: 'Penninga EI, Graudal N, Ladekarl MB, Jürgens G.',
            title:
              'Adverse Events Associated with Flumazenil Treatment for the Management of Suspected Benzodiazepine Intoxication – A Systematic Review with Meta-Analyses of Randomised Trials',
            journal: 'Basic & Clinical Pharmacology & Toxicology. 2016',
            year: 2016,
            pmid: '26096314',
            note: 'Plaseboya göre advers olay RR 2,85, ciddi advers olay RR 3,81; en sık ciddi olaylar SVT ve konvülsiyon.',
          },
          {
            authors: 'Whitwam JG, Amrein R.',
            title: 'Pharmacology of flumazenil',
            journal: 'Acta Anaesthesiologica Scandinavica Supplementum. 1995',
            year: 1995,
            pmid: '8693922',
            note: 'Reseptör farmakolojisi, PK parametreleri ve anestezide BZD reversal dozlaması.',
          },
          {
            authors: 'Devlin JW, Skrobik Y, Gélinas C, et al.',
            title:
              'Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU (PADIS)',
            journal: 'Critical Care Medicine. 2018',
            year: 2018,
            pmid: '30113379',
            doi: '10.1097/CCM.0000000000003299',
            note: 'YBÜ sedasyonunda BZD-dışı ajan tercihi ve BZD ilişkili deliryum bağlamı.',
          },
        ]}
      />
    </div>
  );
};
