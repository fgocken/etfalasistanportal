import React, { useEffect, useId, useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Droplets,
  FlaskConical,
  HeartPulse,
  Info,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Timer,
} from 'lucide-react';
import type { AntimicrobialMonographData } from '../../data/antimicrobials/types';
import {
  AdverseEffectsBlock,
  CompatibilityAndLineBlock,
  ContraindicationsGridBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MechanismOfActionBlock,
  MonographAccordionSection,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
  useMonographAccordion,
} from './shared/DrugMonographBlocks';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  data: AntimicrobialMonographData;
  isDark: boolean;
}

type CalcTabId = 'periop' | 'icu' | 'renal';

interface ColistinEgfrPreset {
  id: string;
  label: string;
  egfr: string;
  dailyCbaMg: number;
  note: string;
}

const COLISTIN_EGFR_PRESETS: ColistinEgfrPreset[] = [
  {
    id: 'egfr_90',
    label: 'eGFR ≥ 90',
    egfr: '≥90 mL/dk',
    dailyCbaMg: 360,
    note: 'Normal/artmış böbrek fonksiyonu (ARC’de CSS,avg hedefi ≥2 mg/L için üst sınır 360 mg CBA/gün).',
  },
  {
    id: 'egfr_70_89',
    label: 'eGFR 70–89',
    egfr: '70–89 mL/dk',
    dailyCbaMg: 340,
    note: 'Hafif azalmış GFR; 2019 Uluslararası Polimiksin Konsensüs tablosu.',
  },
  {
    id: 'egfr_50_69',
    label: 'eGFR 50–69',
    egfr: '50–69 mL/dk',
    dailyCbaMg: 300,
    note: 'Orta GFR: 150 mg CBA (4,5 MIU) q12sa standart idame.',
  },
  {
    id: 'egfr_30_49',
    label: 'eGFR 30–49',
    egfr: '30–49 mL/dk',
    dailyCbaMg: 220,
    note: 'Evre 3b KBH/ABH: nefrotoksisiteyi azaltmak için 110 mg CBA (~3,3 MIU) q12sa.',
  },
  {
    id: 'egfr_10_29',
    label: 'eGFR 10–29',
    egfr: '10–29 mL/dk',
    dailyCbaMg: 160,
    note: 'Evre 4 KBH: 80 mg CBA (~2,4 MIU) q12sa; günlük kreatinin/idrar çıkışı izlemi.',
  },
  {
    id: 'egfr_lt10',
    label: 'eGFR < 10',
    egfr: '<10 mL/dk (Diyalizsiz)',
    dailyCbaMg: 130,
    note: 'Ağır böbrek yetmezliği (IHD yoksa): 65 mg CBA (~2,0 MIU) q12sa. IHD gününde ek destek gerekir.',
  },
  {
    id: 'crrt',
    label: 'CRRT',
    egfr: 'CVVH / CVVHDF',
    dailyCbaMg: 440,
    note: 'KRİTİK: CRRT hem CMS’yi hem aktif kolistini yoğun temizler! Yetersiz dozu önlemek için 220 mg CBA (~6,65 MIU) q12sa (toplam 440 mg CBA/gün) önerilir.',
  },
];

const formatMgOrG = (mg: number): string => {
  if (!Number.isFinite(mg) || mg <= 0) return '0 mg';
  if (mg >= 1000) {
    const g = mg / 1000;
    const formattedG = Number.isInteger(g)
      ? g.toString()
      : g.toFixed(g * 10 === Math.round(g * 10) ? 1 : 2).replace('.', ',');
    return `${formattedG} g (${Math.round(mg)} mg)`;
  }
  return `${Math.round(mg)} mg`;
};

const formatDec = (val: number, digits = 1): string => {
  if (!Number.isFinite(val)) return '0';
  return val.toFixed(digits).replace('.', ',');
};

const getAccentTokens = (accent: AntimicrobialMonographData['accentColor'], isDark: boolean) => {
  switch (accent) {
    case 'cyan':
      return {
        pill: isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-500/10 text-cyan-700',
        text: isDark ? 'text-cyan-400' : 'text-cyan-600',
        iconBg: isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-100 text-cyan-700',
        activeTab: 'bg-cyan-600 border-cyan-600 text-white shadow-xs',
        activePill: isDark
          ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200'
          : 'border-cyan-500 bg-cyan-50 text-cyan-900',
      };
    case 'purple':
      return {
        pill: isDark ? 'bg-purple-500/15 text-purple-300' : 'bg-purple-500/10 text-purple-700',
        text: isDark ? 'text-purple-400' : 'text-purple-600',
        iconBg: isDark ? 'bg-purple-500/15 text-purple-300' : 'bg-purple-100 text-purple-700',
        activeTab: 'bg-purple-600 border-purple-600 text-white shadow-xs',
        activePill: isDark
          ? 'border-purple-500 bg-purple-950/60 text-purple-200'
          : 'border-purple-500 bg-purple-50 text-purple-900',
      };
    case 'rose':
      return {
        pill: isDark ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-500/10 text-rose-700',
        text: isDark ? 'text-rose-400' : 'text-rose-600',
        iconBg: isDark ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-100 text-rose-700',
        activeTab: 'bg-rose-600 border-rose-600 text-white shadow-xs',
        activePill: isDark
          ? 'border-rose-500 bg-rose-950/60 text-rose-200'
          : 'border-rose-500 bg-rose-50 text-rose-900',
      };
    default:
      return {
        pill: isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-500/10 text-teal-700',
        text: isDark ? 'text-teal-400' : 'text-teal-600',
        iconBg: isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-100 text-teal-700',
        activeTab: 'bg-teal-600 border-teal-600 text-white shadow-xs',
        activePill: isDark
          ? 'border-teal-500 bg-teal-950/60 text-teal-200'
          : 'border-teal-500 bg-teal-50 text-teal-900',
      };
  }
};

export const AntimicrobialMonographView: React.FC<Props> = ({ data, isDark }) => {
  const accent = getAccentTokens(data.accentColor, isDark);
  const { calculator } = data;
  const { perioperative, icu, renalTiers } = calculator;

  // Collapsible ADME accordion (default closed & synchronized with MonographQuickNav)
  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

  // Interactive 3-Tab Calculator state
  const [activeTab, setActiveTab] = useState<CalcTabId>(perioperative.applicable ? 'periop' : 'icu');
  const [weightKg, setWeightKg] = useState<number>(calculator.defaultWeightKg);
  const [isPediatric, setIsPediatric] = useState<boolean>(false);
  const [surgeryHours, setSurgeryHours] = useState<number>(2);
  const [bloodLossMl, setBloodLossMl] = useState<number>(400);

  // ICU maintenance selections
  const [selectedFixedId, setSelectedFixedId] = useState<string>(icu.fixedOptions?.[0]?.id ?? '');
  const [selectedWeightId, setSelectedWeightId] = useState<string>(icu.weightOptions?.[0]?.id ?? '');

  // Specialized Polymyxin states
  const [colistinPresetId, setColistinPresetId] = useState<string>('egfr_50_69');
  const [colistinCustomMiu, setColistinCustomMiu] = useState<number>(4.5);
  const [polymyxinLoadMgKg, setPolymyxinLoadMgKg] = useState<number>(2.5);
  const [polymyxinMaintMgKg, setPolymyxinMaintMgKg] = useState<number>(1.5);

  // Renal tier selection
  const [selectedRenalTierId, setSelectedRenalTierId] = useState<string>(renalTiers[0]?.id ?? '');

  const weightInputId = useId();
  const surgerySliderId = useId();
  const bloodLossSliderId = useId();

  // Sync defaults when switching between antimicrobial monographs
  useEffect(() => {
    setPkOpen(false);
    setActiveTab(data.calculator.perioperative.applicable ? 'periop' : 'icu');
    setWeightKg(data.calculator.defaultWeightKg);
    setIsPediatric(false);
    setSurgeryHours(2);
    setBloodLossMl(400);
    setSelectedFixedId(data.calculator.icu.fixedOptions?.[0]?.id ?? '');
    setSelectedWeightId(data.calculator.icu.weightOptions?.[0]?.id ?? '');
    setColistinPresetId('egfr_50_69');
    setColistinCustomMiu(4.5);
    setPolymyxinLoadMgKg(2.5);
    setPolymyxinMaintMgKg(1.5);
    setSelectedRenalTierId(data.calculator.renalTiers[0]?.id ?? '');
  }, [data.id, data.calculator]);

  const handleTogglePediatric = (peds: boolean) => {
    setIsPediatric(peds);
    if (peds && weightKg > 45) {
      setWeightKg(20);
    } else if (!peds && weightKg < 35) {
      setWeightKg(calculator.defaultWeightKg);
    }
  };

  const handleReset = () => {
    setWeightKg(calculator.defaultWeightKg);
    setIsPediatric(false);
    setSurgeryHours(2);
    setBloodLossMl(400);
    setSelectedFixedId(icu.fixedOptions?.[0]?.id ?? '');
    setSelectedWeightId(icu.weightOptions?.[0]?.id ?? '');
    setColistinPresetId('egfr_50_69');
    setColistinCustomMiu(4.5);
    setPolymyxinLoadMgKg(2.5);
    setPolymyxinMaintMgKg(1.5);
    setSelectedRenalTierId(renalTiers[0]?.id ?? '');
  };

  // --- TAB 1 COMPUTATIONS (PERIOP) ---
  const periopCalc = useMemo(() => {
    if (!perioperative.applicable) {
      return null;
    }

    let doseMg = perioperative.adultStandardDoseMg;
    let isCapped = false;
    let highWeightTriggered = false;
    let doseBasisText = perioperative.standardDoseLabel;

    if (isPediatric && perioperative.pediatricMgKg) {
      const raw = weightKg * perioperative.pediatricMgKg;
      if (perioperative.pediatricMaxMg && raw > perioperative.pediatricMaxMg) {
        doseMg = perioperative.pediatricMaxMg;
        isCapped = true;
      } else {
        doseMg = raw;
      }
      doseBasisText = `Pediatrik ${perioperative.pediatricMgKg} mg/kg${
        perioperative.pediatricMaxMg ? ` (maks ${formatMgOrG(perioperative.pediatricMaxMg)})` : ''
      }`;
    } else if (perioperative.weightBasedMgKg) {
      const raw = weightKg * perioperative.weightBasedMgKg;
      if (perioperative.weightBasedMaxMg && raw > perioperative.weightBasedMaxMg) {
        doseMg = perioperative.weightBasedMaxMg;
        isCapped = true;
      } else {
        doseMg = raw;
      }
      doseBasisText = `Kilo bazlı ${perioperative.weightBasedMgKg} mg/kg${
        perioperative.weightBasedMaxMg ? ` (maks ${formatMgOrG(perioperative.weightBasedMaxMg)})` : ''
      }`;
    } else if (
      perioperative.highWeightThresholdKg &&
      perioperative.highWeightDoseMg &&
      weightKg >= perioperative.highWeightThresholdKg
    ) {
      doseMg = perioperative.highWeightDoseMg;
      highWeightTriggered = true;
      doseBasisText = `Yüksek ağırlık (≥${perioperative.highWeightThresholdKg} kg) profilaksi dozu`;
    }

    const timeRedoseNeeded = Boolean(perioperative.redoseHours && surgeryHours >= perioperative.redoseHours);
    const timeRedoseCount =
      perioperative.redoseHours && surgeryHours >= perioperative.redoseHours
        ? Math.floor(surgeryHours / perioperative.redoseHours)
        : 0;
    const bloodRedoseNeeded = Boolean(
      perioperative.bloodLossRedoseMl && bloodLossMl >= perioperative.bloodLossRedoseMl
    );
    const redoseNeeded = timeRedoseNeeded || bloodRedoseNeeded;

    return {
      doseMg,
      isCapped,
      highWeightTriggered,
      doseBasisText,
      timeRedoseNeeded,
      timeRedoseCount,
      bloodRedoseNeeded,
      redoseNeeded,
    };
  }, [perioperative, isPediatric, weightKg, surgeryHours, bloodLossMl]);

  // --- TAB 2 COMPUTATIONS (ICU / SEPSIS / MDR) ---
  const selectedFixedOpt = useMemo(
    () => icu.fixedOptions?.find((o) => o.id === selectedFixedId) ?? icu.fixedOptions?.[0],
    [icu.fixedOptions, selectedFixedId]
  );

  const selectedWeightOpt = useMemo(
    () => icu.weightOptions?.find((o) => o.id === selectedWeightId) ?? icu.weightOptions?.[0],
    [icu.weightOptions, selectedWeightId]
  );

  const selectedColistinPreset = useMemo(
    () => COLISTIN_EGFR_PRESETS.find((p) => p.id === colistinPresetId) ?? COLISTIN_EGFR_PRESETS[2],
    [colistinPresetId]
  );

  const icuCalc = useMemo(() => {
    // Loading dose computation
    let loadingDisplay = icu.loadingDoseLabel;
    let loadingNumeric = 0;

    if (icu.maintenanceMode === 'colistin_cba_miu') {
      loadingDisplay = '300 mg CBA (= 9,0 MIU ≈ 720 mg CMS)';
      loadingNumeric = 300;
    } else if (icu.maintenanceMode === 'polymyxin_b_iu') {
      const loadMg = Math.round(weightKg * polymyxinLoadMgKg);
      const loadIu = loadMg * 10000;
      loadingDisplay = `${loadMg} mg (${loadIu.toLocaleString('tr-TR')} IU) · ${formatDec(polymyxinLoadMgKg, 1)} mg/kg`;
      loadingNumeric = loadMg;
    } else if (icu.loadingWeightBasedMgKg) {
      const raw = weightKg * icu.loadingWeightBasedMgKg;
      const capped = icu.loadingMaxMg ? Math.min(raw, icu.loadingMaxMg) : raw;
      loadingNumeric = capped;
      loadingDisplay =
        icu.loadingUnit === 'IU'
          ? `${Math.round(capped).toLocaleString('tr-TR')} IU`
          : icu.loadingUnit === 'MIU'
            ? `${formatDec(capped, 1)} MIU`
            : formatMgOrG(capped);
    } else if (icu.loadingFixedMg) {
      loadingNumeric = icu.loadingFixedMg;
      loadingDisplay =
        icu.loadingUnit === 'MIU'
          ? `${formatDec(icu.loadingFixedMg, 1)} MIU`
          : icu.loadingUnit === 'IU'
            ? `${Math.round(icu.loadingFixedMg).toLocaleString('tr-TR')} IU`
            : formatMgOrG(icu.loadingFixedMg);
    }

    // Maintenance computation
    if (icu.maintenanceMode === 'fixed_regimen' && selectedFixedOpt) {
      const dosesPerDay = 24 / selectedFixedOpt.intervalHours;
      const dailyMg = selectedFixedOpt.singleDoseMg * dosesPerDay;
      const pumpMlHr = selectedFixedOpt.infusionHours > 0 ? selectedFixedOpt.diluentVolumeMl / selectedFixedOpt.infusionHours : 0;
      return {
        loadingDisplay,
        loadingNumeric,
        singleDoseText: formatMgOrG(selectedFixedOpt.singleDoseMg),
        dailyDoseText: formatMgOrG(dailyMg),
        intervalText: `Her ${selectedFixedOpt.intervalHours} saatte bir (q${selectedFixedOpt.intervalHours}sa)`,
        infusionText: `${formatDec(selectedFixedOpt.infusionHours, selectedFixedOpt.infusionHours % 1 === 0 ? 0 : 1)} saat · ${selectedFixedOpt.diluentVolumeMl} mL`,
        pumpRateText: `${formatDec(pumpMlHr, 1)} mL/saat`,
        regimenNote: selectedFixedOpt.note,
      };
    }

    if (icu.maintenanceMode === 'weight_based_qinterval' && selectedWeightOpt) {
      const rawSingle = weightKg * selectedWeightOpt.mgPerKg;
      const singleMg = selectedWeightOpt.maxSingleMg ? Math.min(rawSingle, selectedWeightOpt.maxSingleMg) : rawSingle;
      const dosesPerDay = 24 / selectedWeightOpt.intervalHours;
      const dailyMg = singleMg * dosesPerDay;
      const pumpMlHr =
        selectedWeightOpt.infusionHours > 0 ? selectedWeightOpt.diluentVolumeMl / selectedWeightOpt.infusionHours : 0;
      return {
        loadingDisplay,
        loadingNumeric,
        singleDoseText: `${formatMgOrG(singleMg)}${selectedWeightOpt.maxSingleMg && rawSingle > selectedWeightOpt.maxSingleMg ? ' (maks sınır)' : ''}`,
        dailyDoseText: formatMgOrG(dailyMg),
        intervalText: `Her ${selectedWeightOpt.intervalHours} saatte bir (q${selectedWeightOpt.intervalHours}sa)`,
        infusionText: `${formatDec(selectedWeightOpt.infusionHours, selectedWeightOpt.infusionHours % 1 === 0 ? 0 : 1)} saat · ${selectedWeightOpt.diluentVolumeMl} mL`,
        pumpRateText: `${formatDec(pumpMlHr, 1)} mL/saat`,
        regimenNote: selectedWeightOpt.note,
      };
    }

    if (icu.maintenanceMode === 'colistin_cba_miu') {
      const dailyCba = selectedColistinPreset.dailyCbaMg;
      const singleCba = dailyCba / 2;
      const dailyMiu = dailyCba / 33.33;
      const singleMiu = singleCba / 33.33;
      const dailyCms = dailyMiu * 80;
      const singleCms = singleMiu * 80;
      return {
        loadingDisplay,
        loadingNumeric,
        singleDoseText: `${Math.round(singleCba)} mg CBA (= ${formatDec(singleMiu, 2)} MIU ≈ ${Math.round(singleCms)} mg CMS)`,
        dailyDoseText: `${Math.round(dailyCba)} mg CBA (= ${formatDec(dailyMiu, 2)} MIU ≈ ${Math.round(dailyCms)} mg CMS)`,
        intervalText: 'Her 12 saatte bir (q12sa) — yüklemeden 12 saat sonra başla',
        infusionText: '0,5–1 saat · 100 mL %0,9 NaCl',
        pumpRateText: '100 – 200 mL/saat',
        regimenNote: selectedColistinPreset.note,
      };
    }

    // polymyxin_b_iu
    const singleMg = Math.round(weightKg * polymyxinMaintMgKg);
    const singleIu = singleMg * 10000;
    const dailyMg = singleMg * 2;
    const dailyIu = dailyMg * 10000;
    return {
      loadingDisplay,
      loadingNumeric,
      singleDoseText: `${singleMg} mg (${singleIu.toLocaleString('tr-TR')} IU)`,
      dailyDoseText: `${dailyMg} mg (${dailyIu.toLocaleString('tr-TR')} IU)`,
      intervalText: 'Her 12 saatte bir (q12sa) — böbrek fonksiyonundan bağımsız',
      infusionText: '1 saat · 250 mL D5W (veya 100 mL SVK)',
      pumpRateText: '100 – 250 mL/saat',
      regimenNote:
        '2019 Uluslararası Polimiksin Konsensüs Kılavuzu: Polimiksin B böbreklerden ağırlıklı non-renal yolla temizlendiği için eGFR düşüşünde ve CRRT’de doz azaltılmaz!',
    };
  }, [
    icu,
    weightKg,
    selectedFixedOpt,
    selectedWeightOpt,
    selectedColistinPreset,
    polymyxinLoadMgKg,
    polymyxinMaintMgKg,
  ]);

  const selectedRenalTier = useMemo(
    () => renalTiers.find((t) => t.id === selectedRenalTierId) ?? renalTiers[0],
    [renalTiers, selectedRenalTierId]
  );

  // Regimen cards grouped by setting
  const periopCards = useMemo(() => data.regimenCards.filter((c) => c.setting === 'perioperative'), [data.regimenCards]);
  const icuCards = useMemo(() => data.regimenCards.filter((c) => c.setting === 'icu'), [data.regimenCards]);
  const coreCards = useMemo(() => data.regimenCards.filter((c) => c.setting === 'core'), [data.regimenCards]);
  const specialCards = useMemo(() => data.regimenCards.filter((c) => c.setting === 'special'), [data.regimenCards]);

  // Clinical order copy generator
  const buildOrderText = () => {
    const header = `=== ${data.title.toUpperCase()} — KLİNİK ORDER ÖZETİ ===\nATC: ${data.atcCode} | TR Preparatlar: ${data.tradeNamesTr}\nHasta Ağırlığı: ${weightKg} kg (${isPediatric ? 'Pediatrik' : 'Erişkin'} · Önerilen Skaler: ${calculator.weightScalar})\n`;

    if (activeTab === 'periop') {
      if (!perioperative.applicable || !periopCalc) {
        return `${header}\n[PERİOPERATİF PROFİLAKSİ]\nBu ajan rutin cerrahi profilaksi ajanı DEĞİLDİR.\nGerekçe: ${perioperative.nonProphylaxisReason || perioperative.clinicalNote}`;
      }
      return `${header}\n[PERİOPERATİF CERRAHİ PROFİLAKSİ]\n• Doz: ${formatMgOrG(periopCalc.doseMg)} IV (${periopCalc.doseBasisText})\n• Zamanlama: ${perioperative.timingWindow}\n• İnfüzyon Süresi: ${perioperative.infusionTimeText}\n• İntraop Durum (Süre: ${surgeryHours} sa | Kan Kaybı: ${bloodLossMl} mL): ${
        periopCalc.redoseNeeded
          ? `REDOZAJ GEREKLİ (${formatMgOrG(periopCalc.doseMg)} IV ek doz)`
          : 'Mevcut parametrelerle ek redozaj gerekmiyor'
      }\n• Klinik Not: ${perioperative.clinicalNote}`;
    }

    if (activeTab === 'icu') {
      return `${header}\n[YBÜ SEPSİS / MDR TEDAVİ REJİMİ]\n• PK/PD Hedefi: ${icu.pkPdBadge} — ${icu.pkPdTarget}\n• Yükleme Dozu: ${icuCalc.loadingDisplay} (${icu.loadingInfusionText})\n• İdame Tek Doz: ${icuCalc.singleDoseText}\n• Doz Aralığı: ${icuCalc.intervalText}\n• Günlük Toplam: ${icuCalc.dailyDoseText}\n• İnfüzyon & Pompa Hızı: ${icuCalc.infusionText} → ${icuCalc.pumpRateText}\n• Klinik Not: ${icuCalc.regimenNote}${
        icu.tdmNote ? `\n• TDM İzlemi: ${icu.tdmNote}` : ''
      }`;
    }

    return `${header}\n[RENAL / CRRT / HEMODİYALİZ DOZ AYARLAMA]\n• Seçili Kademe: ${selectedRenalTier?.label ?? '-'} (${selectedRenalTier?.egfrRange ?? '-'})\n• Öneri: ${selectedRenalTier?.recommendation ?? '-'}\n• Doz: ${selectedRenalTier?.doseText ?? '-'}\n• CRRT: ${calculator.crrtSummary}\n• Hemodiyaliz: ${calculator.hdSummary}`;
  };

  const getToneBoxClasses = (tone: 'emerald' | 'amber' | 'rose' | 'sky') => {
    switch (tone) {
      case 'emerald':
        return {
          box: isDark ? 'border-emerald-500/35 bg-emerald-950/25' : 'border-emerald-200 bg-emerald-50/70',
          title: isDark ? 'text-emerald-300' : 'text-emerald-800',
          badge: isDark ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' : 'bg-white text-emerald-800 border-emerald-300',
        };
      case 'amber':
        return {
          box: isDark ? 'border-amber-500/35 bg-amber-950/25' : 'border-amber-200 bg-amber-50/70',
          title: isDark ? 'text-amber-300' : 'text-amber-800',
          badge: isDark ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' : 'bg-white text-amber-800 border-amber-300',
        };
      case 'rose':
        return {
          box: isDark ? 'border-rose-500/35 bg-rose-950/25' : 'border-rose-200 bg-rose-50/70',
          title: isDark ? 'text-rose-300' : 'text-rose-800',
          badge: isDark ? 'bg-rose-950/80 text-rose-300 border-rose-500/40' : 'bg-white text-rose-800 border-rose-300',
        };
      default:
        return {
          box: isDark ? 'border-sky-500/35 bg-sky-950/25' : 'border-sky-200 bg-sky-50/70',
          title: isDark ? 'text-sky-300' : 'text-sky-800',
          badge: isDark ? 'bg-sky-950/80 text-sky-300 border-sky-500/40' : 'bg-white text-sky-800 border-sky-300',
        };
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* 1. HIZLI BÖLÜM NAVİGASYON BARI (v5.0) */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Kimlik & Spektrum' },
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

      {/* 2. ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (VARSAYILAN KAPALI) */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName={data.highAlert.tallManName}
        confusionRiskWith={data.highAlert.confusionRiskWith}
        criticalAlerts={data.highAlert.criticalAlerts}
        antidoteOrRescue={data.highAlert.antidoteOrRescue}
      />

      {/* 3. KİMLİK, SPEKTRUM ÖZETİ & KISA ETKİ MEKANİZMASI */}
      <section
        id="sec-ozet"
        className={`rounded-2xl border p-5 sm:p-6 transition-all ${
          isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white shadow-xs'
        }`}
      >
        <div className="space-y-2">
          <div className={`flex flex-wrap items-center gap-2 text-xs font-semibold ${accent.text}`}>
            <span className={`rounded px-2 py-0.5 font-mono uppercase tracking-wider ${accent.pill}`}>
              {data.classLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{data.tradeNamesTr}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">ATC: {data.atcCode}</span>
          </div>
          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {data.title}
          </h1>
          <p className={`max-w-4xl text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {data.identitySummary}
          </p>
        </div>

        {/* Spektrum & Klinik Süper Güç Kartları */}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {data.spectrumHighlights.map((item, idx) => {
            const toneCls = getToneBoxClasses(item.tone);
            return (
              <div key={idx} className={`rounded-xl border p-4 ${toneCls.box}`}>
                <div className={`mb-1.5 flex items-center gap-2 text-sm font-bold ${toneCls.title}`}>
                  {item.tone === 'emerald' ? (
                    <ShieldCheck className="h-4 w-4 shrink-0" />
                  ) : item.tone === 'amber' ? (
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                  ) : (
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                  )}
                  <span>{item.title}</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <MechanismOfActionBlock
        isDark={isDark}
        sectionId="sec-etki"
        summary={data.mechanismSummary}
        pillars={data.mechanismPillars}
      />

      {/* 4. FARMAKOKİNETİK (ADME) AKORDİYONU (VARSAYILAN KAPALI) */}
      <section
        id="sec-pkpd"
        className={`overflow-hidden rounded-2xl border transition-all scroll-mt-20 ${
          isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen((prev) => !prev)}
          aria-expanded={pkOpen}
          className={`flex w-full cursor-pointer items-center justify-between p-4 sm:p-5 text-left transition-colors ${
            isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent.iconBg}`}>
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2
                className={`flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                <span>Farmakokinetik (ADME) &amp; PK/PD Hedefi</span>
                <span className={`rounded px-2 py-0.5 font-mono text-xs font-semibold ${accent.pill}`}>
                  {icu.pkPdBadge}
                </span>
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {pkOpen ? 'Gizle' : 'Aç'}
                </span>
              </h2>
              <p className={`mt-0.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {icu.pkPdTarget}
              </p>
            </div>
          </div>
          {pkOpen ? (
            <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
          )}
        </button>

        {pkOpen && (
          <div className={`border-t p-5 sm:p-6 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {data.pkCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border p-3.5 ${
                    isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/80'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {card.label}
                  </span>
                  <span className={`mt-1 block font-mono text-sm sm:text-base font-bold ${accent.text}`}>
                    {card.value}
                  </span>
                  <p className={`mt-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 5. MUTLAK VE RELATİF KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE!) */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="sec-kontrendikasyon"
        absoluteItems={data.contraindications.absoluteItems}
        relativeItems={data.contraindications.relativeItems}
        clinicalNote={data.contraindications.clinicalNote}
      />

      {/* 6. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ (PERİOPERATİF vs YBÜ vs ÖZEL) */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-dozlar"
        eyebrow="FDA / EMA / TİTCK / IDSA / ASHP · Temel, YBÜ & Perioperatif Doz Rejimleri"
        title="Klinik Endikasyonlar ve Doz Rejimleri"
        icon={<Syringe className={`h-5 w-5 ${accent.text}`} />}
        badge={
          <span className={`rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold ${accent.pill}`}>
            {data.regimenCards.length} Rejim
          </span>
        }
      >
        <div className="space-y-5">
          {[
            {
              key: 'core',
              heading: '1. Temel Klinik Endikasyonlar (FDA / EMA / TİTCK / IDSA Standart Tedavi)',
              badgeCls: isDark
                ? 'border-emerald-500/30 bg-emerald-950/50 text-emerald-300'
                : 'border-emerald-200 bg-emerald-50 text-emerald-800',
              cards: coreCards,
            },
            {
              key: 'icu',
              heading: '2. Yoğun Bakım (YBÜ) · Sepsis / Septik Şok & MDR Enfeksiyonlar',
              badgeCls: isDark
                ? 'border-sky-500/30 bg-sky-950/50 text-sky-300'
                : 'border-sky-200 bg-sky-50 text-sky-800',
              cards: icuCards,
            },
            {
              key: 'perioperative',
              heading: '3. Perioperatif Cerrahi Profilaksi & İntraoperatif Yönetim',
              badgeCls: isDark
                ? 'border-teal-500/30 bg-teal-950/50 text-teal-300'
                : 'border-teal-200 bg-teal-50 text-teal-800',
              cards: periopCards,
            },
            {
              key: 'special',
              heading: '4. Özel Klinik Senaryolar, Kurtarma & Kombinasyon Rejimleri',
              badgeCls: isDark
                ? 'border-purple-500/30 bg-purple-950/50 text-purple-300'
                : 'border-purple-200 bg-purple-50 text-purple-800',
              cards: specialCards,
            },
          ]
            .filter((grp) => grp.cards.length > 0)
            .map((grp) => (
              <div key={grp.key} className="space-y-2.5">
                <p
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {grp.heading}
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {grp.cards.map((card, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl border p-4 ${
                        isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {card.title}
                        </h4>
                        <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[10.5px] font-bold ${grp.badgeCls}`}>
                          {card.badge}
                        </span>
                      </div>

                      <div className="mt-2.5 grid grid-cols-3 gap-2 font-mono text-xs">
                        <div
                          className={`rounded-lg border p-2 ${
                            isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                          }`}
                        >
                          <span className="block text-[9.5px] font-sans uppercase text-slate-500 dark:text-slate-400">
                            Doz
                          </span>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.dose}</span>
                        </div>
                        <div
                          className={`rounded-lg border p-2 ${
                            isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                          }`}
                        >
                          <span className="block text-[9.5px] font-sans uppercase text-slate-500 dark:text-slate-400">
                            İnfüzyon
                          </span>
                          <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                            {card.infusionDuration}
                          </span>
                        </div>
                        <div
                          className={`rounded-lg border p-2 ${
                            isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                          }`}
                        >
                          <span className="block text-[9.5px] font-sans uppercase text-slate-500 dark:text-slate-400">
                            Aralık
                          </span>
                          <span className={`font-bold ${accent.text}`}>{card.interval}</span>
                        </div>
                      </div>

                      <p className={`mt-2.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {card.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </MonographAccordionSection>

      {/* 7. ETKİLEŞİMLİ 3 SEKMELİ ANTIMİKROBİYAL HESAPLAYICI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="Etkileşimli Antimikrobiyal Doz, Redozaj & İnfüzyon Hesaplayıcı"
        subtitle="Perioperatif profilaksi, YBÜ uzamış infüzyon pompa hızı ve renal/CRRT doz uyarlaması"
        icon={
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent.iconBg}`}>
            <Calculator className="h-5 w-5" />
          </div>
        }
      >
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleReset}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors ${
              isDark
                ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Sıfırla</span>
          </button>
          <MonographCopyButton isDark={isDark} getText={buildOrderText} label="Order Kopyala" />
        </div>

        {/* Hasta Ağırlığı + Obezite Skaler Yardımcısı */}
        <div className="mt-4 space-y-3">
          <div
            className={`rounded-xl border p-4 ${
              isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-0.5">
                <label
                  htmlFor={weightInputId}
                  className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                >
                  Hasta Dozaj Ağırlığı ({calculator.weightScalar})
                </label>
                <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isPediatric ? 'Pediatrik aralık: 3–60 kg' : 'Erişkin aralık: 35–200 kg (obezite için aşağıdan skaler hesaplayın)'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id={weightInputId}
                  type="number"
                  min={isPediatric ? 3 : 35}
                  max={isPediatric ? 60 : 200}
                  value={weightKg}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (Number.isFinite(val)) {
                      setWeightKg(Math.max(isPediatric ? 3 : 30, Math.min(220, val)));
                    }
                  }}
                  className={`w-24 rounded-lg border px-3 py-1.5 text-center font-mono text-sm font-black tabular-nums ${
                    isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                  }`}
                />
                <span className="font-mono text-xs font-bold text-slate-500">kg</span>
              </div>
            </div>
            <input
              type="range"
              min={isPediatric ? 3 : 35}
              max={isPediatric ? 60 : 180}
              step={1}
              value={Math.min(isPediatric ? 60 : 180, Math.max(isPediatric ? 3 : 35, weightKg))}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="mt-3 w-full accent-teal-600 cursor-pointer"
              aria-label="Hasta ağırlığı kaydırıcısı"
            />
          </div>

          <ObesityDosingScaler
            isDark={isDark}
            drugName={data.cardTitle}
            recommendedScalar={calculator.weightScalar}
            secondaryScalar={calculator.secondaryScalar}
            rationale={calculator.obesityRationale}
            currentWeightKg={weightKg}
            onApplyWeight={(w) => {
              setIsPediatric(false);
              setWeightKg(w);
            }}
          />
        </div>

        {/* 3 Sekme Başlığı */}
        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[
            {
              id: 'periop' as CalcTabId,
              label: '1. Perioperatif Profilaksi & Redozaj',
              sub: perioperative.applicable ? 'İnsizyon & İntraop Takip' : 'Rutin Profilaksi Dışı',
            },
            {
              id: 'icu' as CalcTabId,
              label: '2. YBÜ Sepsis / MDR & Uzamış İnfüzyon',
              sub: icu.pkPdBadge,
            },
            {
              id: 'renal' as CalcTabId,
              label: '3. Renal / eGFR / CRRT / HD',
              sub: `${renalTiers.length} Kademe + RRT`,
            },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                  active
                    ? accent.activeTab
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="text-xs font-bold leading-snug">{tab.label}</div>
                <div className={`mt-0.5 font-mono text-[10.5px] ${active ? 'text-white/85' : 'text-slate-500 dark:text-slate-400'}`}>
                  {tab.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── SEKME 1: PERİOPERATİF PROFİLAKSİ & İNTRAOP REDOZAJ ─── */}
        {activeTab === 'periop' && (
          <div className="mt-5 space-y-4">
            {!perioperative.applicable || !periopCalc ? (
              <div
                className={`rounded-2xl border p-5 ${
                  isDark ? 'border-rose-500/40 bg-rose-950/25' : 'border-rose-300 bg-rose-50/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertOctagon className={`mt-0.5 h-6 w-6 shrink-0 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider ${
                          isDark
                            ? 'border-rose-500/40 bg-rose-950/70 text-rose-300'
                            : 'border-rose-300 bg-white text-rose-800'
                        }`}
                      >
                        Rutin Cerrahi Profilaksi Ajanı Değildir
                      </span>
                    </div>
                    <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {perioperative.summaryTitle}
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-rose-100' : 'text-rose-950'}`}>
                      {perioperative.nonProphylaxisReason || perioperative.clinicalNote}
                    </p>
                    {perioperative.nonProphylaxisReason && perioperative.clinicalNote && (
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <strong>Perioperatif / Özel Durum Notu:</strong> {perioperative.clinicalNote}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {perioperative.summaryTitle}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Zamanlama: <strong>{perioperative.timingWindow}</strong> · İnfüzyon:{' '}
                      <strong>{perioperative.infusionTimeText}</strong>
                    </p>
                  </div>

                  {perioperative.pediatricMgKg && (
                    <div className="inline-flex rounded-xl border border-slate-200 p-0.5 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => handleTogglePediatric(false)}
                        className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                          !isPediatric
                            ? 'bg-teal-600 text-white'
                            : isDark
                              ? 'text-slate-300 hover:text-white'
                              : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Erişkin
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTogglePediatric(true)}
                        className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                          isPediatric
                            ? 'bg-teal-600 text-white'
                            : isDark
                              ? 'text-slate-300 hover:text-white'
                              : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Pediatrik ({perioperative.pediatricMgKg} mg/kg)
                      </button>
                    </div>
                  )}
                </div>

                {/* Canlı Profilaksi Doz Kartları */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div
                    className={`rounded-xl border p-4 ${
                      periopCalc.highWeightTriggered
                        ? isDark
                          ? 'border-amber-500/50 bg-amber-950/30'
                          : 'border-amber-400 bg-amber-50'
                        : isDark
                          ? 'border-teal-500/40 bg-teal-950/25'
                          : 'border-teal-300 bg-teal-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Pre-İnsizyon Başlangıç Dozu
                      </span>
                      {periopCalc.highWeightTriggered && (
                        <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">
                          ≥{perioperative.highWeightThresholdKg} kg Dozu!
                        </span>
                      )}
                      {periopCalc.isCapped && (
                        <span className="rounded bg-sky-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          Maks Sınır
                        </span>
                      )}
                    </div>
                    <div className={`mt-1.5 font-mono text-xl font-black tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {formatMgOrG(periopCalc.doseMg)}
                    </div>
                    <p className={`mt-1 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {periopCalc.doseBasisText}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl border p-4 ${
                      isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Zamanlama Penceresi
                    </span>
                    <div className={`mt-1.5 font-mono text-base font-bold ${accent.text}`}>
                      {perioperative.timingWindow}
                    </div>
                    <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Uygulama: {perioperative.infusionTimeText}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl border p-4 ${
                      isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      İntraop Redozaj Eşikleri
                    </span>
                    <div className={`mt-1.5 font-mono text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {perioperative.redoseHours ? `Her ${perioperative.redoseHours} saat` : 'Tek doz (uzun t½)'}
                    </div>
                    <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {perioperative.bloodLossRedoseMl
                        ? `veya kan kaybı >${perioperative.bloodLossRedoseMl} mL (erişkin)`
                        : 'Kan kaybına göre ek doz değerlendirilir'}
                    </p>
                  </div>
                </div>

                {/* İntraoperatif Süre & Kan Kaybı Redozaj Simülatörü */}
                <div
                  className={`rounded-xl border p-4 space-y-4 ${
                    isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50/70'
                  }`}
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <label htmlFor={surgerySliderId} className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                          <Timer className="mr-1.5 inline h-3.5 w-3.5 text-teal-500" />
                          İlk Dozdan İtibaren Geçen Ameliyat Süresi
                        </label>
                        <span className="font-mono text-sm font-black text-teal-600 dark:text-teal-400">
                          {formatDec(surgeryHours, 1)} saat
                        </span>
                      </div>
                      <input
                        id={surgerySliderId}
                        type="range"
                        min={0.5}
                        max={12}
                        step={0.5}
                        value={surgeryHours}
                        onChange={(e) => setSurgeryHours(Number(e.target.value))}
                        className="mt-2 w-full accent-teal-600 cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-500">
                        <span>0,5 sa</span>
                        <span>2 sa</span>
                        <span>4 sa</span>
                        <span>8 sa</span>
                        <span>12 sa</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <label htmlFor={bloodLossSliderId} className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                          <Droplets className="mr-1.5 inline h-3.5 w-3.5 text-rose-500" />
                          İntraoperatif Kan Kaybı
                        </label>
                        <span className="font-mono text-sm font-black text-rose-600 dark:text-rose-400">
                          {bloodLossMl} mL
                        </span>
                      </div>
                      <input
                        id={bloodLossSliderId}
                        type="range"
                        min={0}
                        max={4000}
                        step={100}
                        value={bloodLossMl}
                        onChange={(e) => setBloodLossMl(Number(e.target.value))}
                        className="mt-2 w-full accent-rose-600 cursor-pointer"
                      />
                      <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-500">
                        <span>0 mL</span>
                        <span>1000 mL</span>
                        <span>1500 mL</span>
                        <span>2500 mL</span>
                        <span>4000 mL</span>
                      </div>
                    </div>
                  </div>

                  {/* Canlı Redozaj Karar Kartı */}
                  <div
                    className={`flex items-start gap-3 rounded-xl border p-3.5 ${
                      periopCalc.redoseNeeded
                        ? isDark
                          ? 'border-rose-500/50 bg-rose-950/35 text-rose-100'
                          : 'border-rose-300 bg-rose-50 text-rose-950'
                        : isDark
                          ? 'border-emerald-500/40 bg-emerald-950/25 text-emerald-100'
                          : 'border-emerald-300 bg-emerald-50 text-emerald-950'
                    }`}
                  >
                    {periopCalc.redoseNeeded ? (
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    )}
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="font-bold">
                        {periopCalc.redoseNeeded
                          ? `İNTRAOPERATİF REDOZAJ GEREKLİ — Ek ${formatMgOrG(periopCalc.doseMg)} IV`
                          : 'Mevcut Süre ve Kan Kaybıyla Ek Redozaj Henüz Gerekmiyor'}
                      </div>
                      <p className="text-xs leading-relaxed opacity-90">
                        {periopCalc.redoseNeeded ? (
                          <>
                            Tetikleyici:{' '}
                            {[
                              periopCalc.timeRedoseNeeded && perioperative.redoseHours
                                ? `Süre ≥ ${perioperative.redoseHours} saat (${periopCalc.timeRedoseCount}× redozaj penceresi doldu)`
                                : null,
                              periopCalc.bloodRedoseNeeded && perioperative.bloodLossRedoseMl
                                ? `Masif kan kaybı ≥ ${perioperative.bloodLossRedoseMl} mL`
                                : null,
                            ]
                              .filter(Boolean)
                              .join(' + ')}
                            . Süre, pre-insizyon ilk antibiyotik başlangıç saatinden hesaplanır (insizyon saatinden değil!).
                          </>
                        ) : (
                          <>
                            {perioperative.redoseHours
                              ? `İlk antibiyotik başlangıcından ${perioperative.redoseHours} saat geçtiğinde`
                              : 'Uzun yarı ömür nedeniyle rutin zaman bazlı redozaj gerekmez'}
                            {perioperative.bloodLossRedoseMl
                              ? ` veya kan kaybı >${perioperative.bloodLossRedoseMl} mL olduğunda ek ${formatMgOrG(periopCalc.doseMg)} IV uygulayın.`
                              : '.'}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-start gap-2 rounded-xl border p-3.5 text-xs leading-relaxed ${
                    isDark ? 'border-slate-800 bg-slate-950/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                  <span>{perioperative.clinicalNote}</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* ─── SEKME 2: YBÜ SEPSİS / MDR / YÜKLEME & UZAMIŞ İNFÜZYON ─── */}
        {activeTab === 'icu' && (
          <div className="mt-5 space-y-4">
            {/* PK/PD Hedef Bandı */}
            <div
              className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 ${
                isDark ? 'border-sky-500/30 bg-sky-950/25' : 'border-sky-200 bg-sky-50/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className={`h-4 w-4 shrink-0 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
                <span className={`text-xs font-bold ${isDark ? 'text-sky-200' : 'text-sky-900'}`}>
                  PK/PD Hedefi: {icu.pkPdTarget}
                </span>
              </div>
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold ${
                  isDark ? 'border-sky-500/40 bg-sky-950/80 text-sky-300' : 'border-sky-300 bg-white text-sky-800'
                }`}
              >
                {icu.pkPdBadge}
              </span>
            </div>

            {/* ÖZEL MOD: KOLİSTİN CBA ↔ CMS ↔ MIU UYARI VE SEÇİCİ */}
            {icu.maintenanceMode === 'colistin_cba_miu' && (
              <div className="space-y-3">
                <div
                  className={`rounded-xl border-2 p-4 ${
                    isDark ? 'border-rose-500/70 bg-rose-950/40 text-rose-100' : 'border-rose-400 bg-rose-50 text-rose-950'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <AlertOctagon className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                    <div className="text-xs sm:text-sm leading-relaxed">
                      <strong>ÖLÜMCÜL BİRİM KARIŞIKLIĞI UYARISI (CBA mg ≠ CMS mg!):</strong>{' '}
                      <span className="font-mono font-bold">1 MIU ≈ 33,3 mg CBA ≈ 80 mg CMS</span> (2,4 kat fark!).
                      Türkiye’deki flakonlar (Colimycin® 150 mg <strong>CBA</strong> = 4,5 MIU ≈ 360 mg CMS) etiketinde
                      CBA veya MIU yazar. CMS mg cinsinden yazılmış dozu CBA mg olarak verirseniz{' '}
                      <strong>2,4 kat ölümcül aşırı doz (akut tübüler nekroz + nöromüsküler apne)</strong> oluşur!
                    </div>
                  </div>
                </div>

                <div>
                  <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    eGFR / CRRT’ye Göre Kolistin İdame Seçimi (2019 Uluslararası Konsensüs)
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {COLISTIN_EGFR_PRESETS.map((preset) => {
                      const active = selectedColistinPreset.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setColistinPresetId(preset.id)}
                          className={`cursor-pointer rounded-lg border px-2.5 py-1.5 font-mono text-xs font-bold transition-colors ${
                            active
                              ? accent.activePill
                              : isDark
                                ? 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hızlı MIU ↔ CBA ↔ CMS Çevirici */}
                <div
                  className={`rounded-xl border p-3.5 ${
                    isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      Hızlı Birim Çevirici (Flakon Doğrulama):
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0.5}
                        max={15}
                        step={0.5}
                        value={colistinCustomMiu}
                        onChange={(e) => setColistinCustomMiu(Math.max(0.5, Math.min(20, Number(e.target.value) || 1)))}
                        className={`w-20 rounded-lg border px-2 py-1 text-center font-mono text-xs font-bold ${
                          isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                      <span className="font-mono font-bold">MIU</span>
                      <span className="text-slate-400">=</span>
                      <span className="rounded bg-teal-500/15 px-2 py-0.5 font-mono font-bold text-teal-600 dark:text-teal-300">
                        {Math.round(colistinCustomMiu * 33.33)} mg CBA
                      </span>
                      <span className="text-slate-400">≈</span>
                      <span className="rounded bg-amber-500/15 px-2 py-0.5 font-mono font-bold text-amber-700 dark:text-amber-300">
                        {Math.round(colistinCustomMiu * 80)} mg CMS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ÖZEL MOD: POLİMİKSİN B mg/kg ↔ IU/kg */}
            {icu.maintenanceMode === 'polymyxin_b_iu' && (
              <div className="space-y-3">
                <div
                  className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-xs ${
                    isDark
                      ? 'border-emerald-500/40 bg-emerald-950/25 text-emerald-200'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  }`}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>
                    <strong>2019 Uluslararası Konsensüs:</strong> Polimiksin B için{' '}
                    <strong>1 mg = 10.000 IU</strong>’dur. Ağırlıklı non-renal klirens gösterdiği için{' '}
                    <strong>böbrek yetmezliğinde veya CRRT’de doz azaltılmaz!</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div
                    className={`rounded-xl border p-3.5 ${
                      isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Yükleme Dozu Seçimi</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {[2.0, 2.5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPolymyxinLoadMgKg(val)}
                          className={`cursor-pointer rounded-lg border py-1.5 font-mono text-xs font-bold ${
                            polymyxinLoadMgKg === val
                              ? accent.activePill
                              : isDark
                                ? 'border-slate-800 bg-slate-900 text-slate-300'
                                : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {formatDec(val, 1)} mg/kg ({(val * 10000).toLocaleString('tr-TR')} IU/kg)
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`rounded-xl border p-3.5 ${
                      isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300">İdame Dozu Seçimi (q12sa)</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {[1.25, 1.5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPolymyxinMaintMgKg(val)}
                          className={`cursor-pointer rounded-lg border py-1.5 font-mono text-xs font-bold ${
                            polymyxinMaintMgKg === val
                              ? accent.activePill
                              : isDark
                                ? 'border-slate-800 bg-slate-900 text-slate-300'
                                : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {formatDec(val, 2)} mg/kg ({(val * 10000).toLocaleString('tr-TR')} IU/kg)
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SABİT REJİM SEÇENEKLERİ */}
            {icu.maintenanceMode === 'fixed_regimen' && icu.fixedOptions && icu.fixedOptions.length > 0 && (
              <div>
                <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {icu.maintenanceLabel} — Rejim Seçimi
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {icu.fixedOptions.map((opt) => {
                    const active = selectedFixedOpt?.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedFixedId(opt.id)}
                        className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                          active
                            ? accent.activePill
                            : isDark
                              ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div className="mt-1 font-mono text-[11px] opacity-80">
                          {formatMgOrG(opt.singleDoseMg)} · q{opt.intervalHours}sa · {opt.infusionHours} sa ({opt.diluentVolumeMl} mL)
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* KİLO BAZLI REJİM SEÇENEKLERİ */}
            {icu.maintenanceMode === 'weight_based_qinterval' && icu.weightOptions && icu.weightOptions.length > 0 && (
              <div>
                <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {icu.maintenanceLabel} — Rejim Seçimi ({weightKg} kg)
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {icu.weightOptions.map((opt) => {
                    const active = selectedWeightOpt?.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedWeightId(opt.id)}
                        className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
                          active
                            ? accent.activePill
                            : isDark
                              ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div className="mt-1 font-mono text-[11px] opacity-80">
                          {opt.mgPerKg} mg/kg · q{opt.intervalHours}sa · {opt.infusionHours} sa ({opt.diluentVolumeMl} mL)
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CANLI YBÜ ÇIKTI KARTLARI */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-amber-500/35 bg-amber-950/20' : 'border-amber-200 bg-amber-50/70'
                }`}
              >
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  1. Yükleme Dozu (Loading)
                </span>
                <div className={`mt-1.5 font-mono text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {icuCalc.loadingDisplay}
                </div>
                <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">{icu.loadingInfusionText}</p>
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-teal-500/35 bg-teal-950/20' : 'border-teal-200 bg-teal-50/70'
                }`}
              >
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  2. İdame Tek Doz
                </span>
                <div className={`mt-1.5 font-mono text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {icuCalc.singleDoseText}
                </div>
                <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">{icuCalc.intervalText}</p>
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  3. Günlük Toplam Doz
                </span>
                <div className={`mt-1.5 font-mono text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {icuCalc.dailyDoseText}
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">24 saatlik kümülatif maruziyet</p>
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-indigo-500/35 bg-indigo-950/25' : 'border-indigo-200 bg-indigo-50/70'
                }`}
              >
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  4. Pompa Hızı (EI / IV)
                </span>
                <div className={`mt-1.5 font-mono text-lg font-black tabular-nums ${isDark ? 'text-indigo-200' : 'text-indigo-900'}`}>
                  {icuCalc.pumpRateText}
                </div>
                <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">{icuCalc.infusionText}</p>
              </div>
            </div>

            {/* Seçili Rejim Notu + TDM + Özel Dönüşüm Notu */}
            <div className="space-y-2.5">
              <div
                className={`rounded-xl border p-3.5 text-xs leading-relaxed ${
                  isDark ? 'border-slate-800 bg-slate-950/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <strong>Rejim Klinik Notu:</strong> {icuCalc.regimenNote}
              </div>

              {icu.tdmNote && (
                <div
                  className={`flex items-start gap-2 rounded-xl border p-3.5 text-xs leading-relaxed ${
                    isDark
                      ? 'border-sky-500/35 bg-sky-950/20 text-sky-200'
                      : 'border-sky-200 bg-sky-50/70 text-sky-900'
                  }`}
                >
                  <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                  <span>
                    <strong>Terapötik İlaç İzlemi (TDM):</strong> {icu.tdmNote}
                  </span>
                </div>
              )}

              {icu.specialConversionNote && (
                <div
                  className={`flex items-start gap-2 rounded-xl border p-3.5 text-xs leading-relaxed ${
                    isDark
                      ? 'border-amber-500/35 bg-amber-950/20 text-amber-200'
                      : 'border-amber-200 bg-amber-50/80 text-amber-950'
                  }`}
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <span>
                    <strong>Birim / Eşdeğerlik &amp; Formülasyon Notu:</strong> {icu.specialConversionNote}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── SEKME 3: RENAL / eGFR / CRRT / HEMODİYALİZ ─── */}
        {activeTab === 'renal' && (
          <div className="mt-5 space-y-4">
            <div>
              <p className={`mb-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Böbrek Fonksiyonu / eGFR Kademesini Seçin
              </p>
              <div className="flex flex-wrap gap-2">
                {renalTiers.map((tier) => {
                  const active = selectedRenalTier?.id === tier.id;
                  const toneStyle = getToneBoxClasses(tier.tone);
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedRenalTierId(tier.id)}
                      className={`cursor-pointer rounded-xl border px-3.5 py-2 text-left transition-all ${
                        active
                          ? `${toneStyle.box} ring-2 ring-offset-1 ${
                              isDark ? 'ring-teal-400 ring-offset-slate-900' : 'ring-teal-500 ring-offset-white'
                            }`
                          : isDark
                            ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className={`text-xs font-bold ${active ? toneStyle.title : ''}`}>{tier.label}</div>
                      <div className="font-mono text-[10.5px] opacity-80">{tier.egfrRange}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedRenalTier && (() => {
              const toneStyle = getToneBoxClasses(selectedRenalTier.tone);
              return (
                <div className={`rounded-xl border p-4 sm:p-5 ${toneStyle.box}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className={`text-base font-bold ${toneStyle.title}`}>
                      {selectedRenalTier.label} · {selectedRenalTier.egfrRange}
                    </h4>
                    <span className={`rounded-lg border px-2.5 py-0.5 font-mono text-xs font-bold ${toneStyle.badge}`}>
                      {selectedRenalTier.recommendation}
                    </span>
                  </div>
                  <div className={`mt-3 font-mono text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedRenalTier.doseText}
                  </div>
                  <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {selectedRenalTier.note}
                  </p>
                </div>
              );
            })()}

            {/* CRRT ve Hemodiyaliz Özet Kartları */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-sky-900/60 bg-sky-950/20' : 'border-sky-200 bg-sky-50/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <HeartPulse className={`h-4 w-4 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
                  <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                    CRRT (CVVH / CVVHD / CVVHDF)
                  </h5>
                </div>
                <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {calculator.crrtSummary}
                </p>
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-indigo-900/60 bg-indigo-950/20' : 'border-indigo-200 bg-indigo-50/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className={`h-4 w-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-indigo-300' : 'text-indigo-800'}`}>
                    Aralıklı Hemodiyaliz (IHD / SLED)
                  </h5>
                </div>
                <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {calculator.hdSummary}
                </p>
              </div>
            </div>
          </div>
        )}
      </MonographAccordionSection>

      {/* 8. TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={data.turkeyFormulations.preparations}
        standardDilutions={data.turkeyFormulations.standardDilutions}
        concentrationTrapWarning={data.turkeyFormulations.concentrationTrapWarning}
      />

      {/* 9. DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement={data.compatibility.accessRequirement}
        accessSummary={data.compatibility.accessSummary}
        phRange={data.compatibility.phRange}
        osmolalityNote={data.compatibility.osmolalityNote}
        compatibleDiluents={data.compatibility.compatibleDiluents}
        ySiteCompatible={data.compatibility.ySiteCompatible}
        ySiteIncompatible={data.compatibility.ySiteIncompatible}
        stabilityNote={data.compatibility.stabilityNote}
        extravasationProtocol={data.compatibility.extravasationProtocol}
      />

      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary={data.organImpairment.renalSummary}
        renalDetails={data.organImpairment.renalDetails}
        hepaticSummary={data.organImpairment.hepaticSummary}
        hepaticDetails={data.organImpairment.hepaticDetails}
        renalMatrix={data.organImpairment.renalMatrix}
        hepaticMatrix={data.organImpairment.hepaticMatrix}
        dualOrganNote={data.organImpairment.dualOrganNote}
      />

      {/* 11. GERİATRİ & OBEZİTE DOZ YÖNETİMİ */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge={data.geriatricObesity.geriatricReductionBadge}
        geriatricPoints={data.geriatricObesity.geriatricPoints}
        obesityWeightScalarBadge={data.geriatricObesity.obesityWeightScalarBadge}
        obesityPoints={data.geriatricObesity.obesityPoints}
        clinicalNote={data.geriatricObesity.clinicalNote}
      />

      {/* 12. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary={data.pregnancyLactation.pregnancySummary}
        pregnancyDetails={data.pregnancyLactation.pregnancyDetails}
        lactationSummary={data.pregnancyLactation.lactationSummary}
        lactationDetails={data.pregnancyLactation.lactationDetails}
      />

      {/* 13. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock isDark={isDark} sectionId="sec-olumsuz" items={data.adverseEffects} />

      {/* 14. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock isDark={isDark} sectionId="sec-ozel-durumlar" items={data.specialClinicalCautions} />

      {/* 15. 4 KADEMELİ DERİN FARMAKODİNAMİK ANALİZ (VARSAYILAN KAPALI) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        subtitle="1) Moleküler Hedef (PBP / Enzim / Membran) → 2) Hücre İçi / Bakteriyel-Fungal Kaskad → 3) Doku Penetrasyonu & Konak Organ Etkileri → 4) PK/PD Kinetiği, Direnç & Sinerji (Mandell’s / Sanford / IDSA)"
        defaultOpen={false}
        receptorMechanism={data.deepPharmacodynamics.receptorMechanism}
        intracellularSignaling={data.deepPharmacodynamics.intracellularSignaling}
        tissueOrganSystems={data.deepPharmacodynamics.tissueOrganSystems}
        synergyAndCeiling={data.deepPharmacodynamics.synergyAndCeiling}
        clinicalPearls={data.deepPharmacodynamics.clinicalPearls}
      />

      {/* 16. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName={data.referencesAndInteractions.drugName}
        structuredInteractions={data.referencesAndInteractions.structuredInteractions}
        references={data.referencesAndInteractions.references}
        drugsComUrl={data.referencesAndInteractions.drugsComUrl}
        medscapeUrl={data.referencesAndInteractions.medscapeUrl}
        medscapeLabel={data.referencesAndInteractions.medscapeLabel}
      />
    </div>
  );
};
