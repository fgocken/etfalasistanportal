import React, { useId, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  HeartPulse,
  Scale,
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
import { STANDALONE_ORGAN_PART2 } from '../../data/organImpairment/standaloneOrganPart2';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

type CalcTab = 'dosing_calc' | 'asra_calc' | 'protamine_calc' | 'ufh_vs_lmwh';
type EnoxIndication = 'vte_proph' | 'vte_treat' | 'nste_acs' | 'stemi_fib' | 'preg_proph';
type AsraTier = 'proph_qd' | 'proph_bid' | 'therapeutic';

function roundToTrSyringeMg(mg: number): number {
  if (mg <= 25) return 20;
  if (mg <= 50) return 40;
  if (mg <= 70) return 60;
  if (mg <= 90) return 80;
  if (mg <= 110) return 100;
  return Math.round(mg / 20) * 20;
}

function formatSyringeText(mg: number): string {
  const iu = mg * 100;
  const ml = (mg / 100).toFixed(1).replace('.', ',');
  if (mg <= 100 && [20, 40, 60, 80, 100].includes(mg)) {
    return `${mg} mg (${ml} mL = ${iu.toLocaleString('tr-TR')} Anti-Xa IU hazır enjektör)`;
  }
  const combo =
    mg === 120
      ? '2× 60 mg (0,6 mL) veya 100 + 20 mg'
      : mg === 140
        ? '80 + 60 mg (0,8 + 0,6 mL)'
        : mg === 160
          ? '2× 80 mg (0,8 mL)'
          : `${ml} mL toplam`;
  return `${mg} mg (${iu.toLocaleString('tr-TR')} IU · ${combo})`;
}

export const EnoxaparinProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('dosing_calc');

  // Tab 1: Doz & TR Enjektör Hesaplayıcı
  const [weightKg, setWeightKg] = useState<number>(75);
  const [ageYears, setAgeYears] = useState<number>(58);
  const [crCl, setCrCl] = useState<number>(75);
  const [indication, setIndication] = useState<EnoxIndication>('vte_treat');

  // Tab 2: ASRA 2018 / ESAIC 2022 Nöraksiyel
  const [asraTier, setAsraTier] = useState<AsraTier>('proph_qd');
  const [asraLowCrCl, setAsraLowCrCl] = useState<boolean>(false);

  // Tab 3: Protamin Kısmi Reversal (~%60)
  const [lastEnoxMg, setLastEnoxMg] = useState<number>(80);
  const [hoursSinceEnox, setHoursSinceEnox] = useState<number>(5);

  // Akordeon
  const [showAdmeDetails, setShowAdmeDetails] = useState<boolean>(false);

  const uniqueId = useId();
  const basePanel = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  const quickNavItems = [
    { id: 'enx-high-alert', label: 'Yüksek Uyarı' },
    { id: 'enx-moa', label: 'Anti-Xa & ADME' },
    { id: 'enx-contra', label: 'Kontrendikasyonlar' },
    { id: 'enx-indications', label: 'Endikasyonlar' },
    { id: 'enx-calc', label: 'Hesaplayıcı · ASRA · Protamin' },
    { id: 'enx-tr', label: 'TR Enjektörler' },
    { id: 'enx-compat', label: 'SC Teknik & PCI' },
    { id: 'enx-organ', label: 'Böbrek (CrCl <30!)' },
    { id: 'enx-special', label: 'Geriatri & Obezite' },
    { id: 'enx-preg', label: 'Gebelik & Kapak' },
    { id: 'enx-adr', label: 'Yan Etkiler' },
    { id: 'enx-cautions', label: 'Klinik Dikkat' },
    { id: 'enx-pd', label: 'Derin Farmakodinami' },
    { id: 'enx-refs', label: 'Etkileşim & Kaynak' },
  ];

  // --- TAB 1 DOZ MOTORU ---
  const isEsrd = crCl < 15;
  const isSevereCkd = crCl >= 15 && crCl < 30;
  const isMorbidObese = weightKg >= 120;
  const isStemOver75 = ageYears >= 75;

  const getDosingOutput = () => {
    if (isEsrd) {
      return {
        tone: 'rose' as const,
        headline: 'CrCl <15 mL/dk (ESRD / DİYALİZ) — ENOKSAPARİN KULLANMA → STANDART HEPARİN (UFH) SEÇ!',
        primaryDose: 'UFH’ye Geç (Profilaksi 5.000 IU SC q8–12sa · Tedavi IV Nomogram)',
        note: 'Enoksaparin böbrekten elimine edilir, hemodiyalizle temizlenmez ve Protaminle yalnızca ~%60 geri çevrilebilir — CrCl <15 mL/dk’da fatal retroperitoneal/GİS kanamaya yol açar!',
      };
    }

    if (indication === 'vte_proph') {
      if (isSevereCkd) {
        return {
          tone: 'amber' as const,
          headline: 'CrCl 15–29 mL/dk — ZORUNLU RENAL AZALTIM (Veya UFH Tercih Et!)',
          primaryDose: '20 mg SC q24sa (TR/EMA: 0,2 mL = 2.000 IU · FDA: 30 mg q24sa)',
          note: 'Dalgalı akut böbrek hasarında (ABH) Enoksaparin yerine UFH 5.000 IU SC q8–12sa çok daha güvenlidir!',
        };
      }
      if (isMorbidObese) {
        return {
          tone: 'amber' as const,
          headline: 'Morbid Obezite (≥120 kg) — Standart 40 mg q24sa YETERSİZ!',
          primaryDose: '40 mg (0,4 mL) SC q12sa (Günde 2× · veya 60 mg q24sa)',
          note: 'Morbid obez cerrahi/YBÜ hastalarında tek 40 mg/gün profilaksi subterapötik kalır → 40 mg SC q12sa (veya 0,5 mg/kg q12sa) önerilir.',
        };
      }
      if (weightKg < 45) {
        return {
          tone: 'amber' as const,
          headline: 'Düşük Vücut Ağırlığı (<45 kg) — Kanama Riski Yüksek!',
          primaryDose: '20 mg (0,2 mL) veya 30 mg SC q24sa (40 mg’da kanama izle!)',
          note: '<45 kg kadın / <57 kg erkek hastalarda standart 40 mg q24sa profilakside maruziyet artar — yakın kanama takibi yapın.',
        };
      }
      return {
        tone: 'emerald' as const,
        headline: 'Standart VTE Profilaksisi (Yüksek Risk: Ortopedi · Onkoloji · YBÜ · Dahiliye)',
        primaryDose: '40 mg (0,4 mL = 4.000 IU) SC q24sa (Orta risk cerrahi: 20 mg q24sa)',
        note: 'Spinal/epidural blok planlanıyorsa ponksiyondan EN AZ 12 SAAT önce kesilmiş olmalıdır!',
      };
    }

    if (indication === 'vte_treat') {
      const exactMg = Math.round(weightKg * 1.0);
      const rounded = roundToTrSyringeMg(exactMg);
      if (isSevereCkd) {
        return {
          tone: 'amber' as const,
          headline: 'CrCl 15–29 mL/dk — TEDAVİ GÜNDE TEK DOZA (q24sa) DÜŞÜRÜLÜR! (Veya UFH Seç!)',
          primaryDose: `${formatSyringeText(rounded)} SC GÜNDE 1 KEZ (q24sa!)`,
          note: 'CrCl <30’da ASLA q12sa verme! 3. dozdan 4 saat sonra pik Anti-Xa (0,6–1,0 IU/mL) izle; dalgalı ABH/yüksek kanama riskinde doğrudan IV UFH’ye geç!',
        };
      }
      return {
        tone: isMorbidObese ? ('amber' as const) : ('emerald' as const),
        headline: isMorbidObese
          ? 'VTE Tedavisi (Morbid Obezite ≥120 kg · 4.sa Anti-Xa İzlemi Önerilir!)'
          : 'VTE Tedavisi (DVT / Pulmoner Emboli / Kanser Trombozu)',
        primaryDose: `${formatSyringeText(rounded)} SC q12sa (Hesap: ${exactMg} mg = 1 mg/kg q12sa)`,
        note: isMorbidObese
          ? 'Morbid obezitede (120–150 kg) gerçek ağırlıkla 1 mg/kg q12sa (>150 kg’da bazı rehberler 0,8 mg/kg q12sa) başlanıp 3.–4. dozdan 4 saat sonra pik Anti-Xa (0,6–1,0 IU/mL) ile doğrulanır — keyfi 100 mg tavan koymayın!'
          : 'Komplike olmayan ayaktan DVT’de alternatif 1,5 mg/kg q24sa (obezite, PE ve kanser trombozunda q12sa tercih edilir!).',
      };
    }

    if (indication === 'nste_acs') {
      const exactMg = Math.round(weightKg * 1.0);
      const rounded = roundToTrSyringeMg(exactMg);
      if (isSevereCkd) {
        return {
          tone: 'amber' as const,
          headline: 'NSTE-ACS + CrCl 15–29 mL/dk — q24sa AZALTIM (Veya UFH!)',
          primaryDose: `${formatSyringeText(rounded)} SC GÜNDE 1 KEZ (q24sa!)`,
          note: 'SYNERGY Kuralı: PCI sırasında Enoksaparin üzerine UFH EKLEME (çapraz geçiş kanamayı katlar)!',
        };
      }
      return {
        tone: 'emerald' as const,
        headline: 'NSTE-ACS (Kararsız Anjina / NSTEMI · ESC 2023)',
        primaryDose: `${formatSyringeText(rounded)} SC q12sa (1 mg/kg q12sa + ASA + P2Y₁₂)`,
        note: 'PCI’da son SC Enoksaparin <8 sa ise ek doz YOK; 8–12 sa ise 0,3 mg/kg IV Enoksaparin ver — ASLA UFH ile karıştırma!',
      };
    }

    if (indication === 'stemi_fib') {
      if (isSevereCkd) {
        return {
          tone: 'amber' as const,
          headline: 'STEMI Fibrinoliz + CrCl 15–29 mL/dk (ExTRACT-TIMI 25 Renal Uyarlama)',
          primaryDose: isStemOver75
            ? `≥75 Yaş: IV BOLUS YOK · ${Math.min(75, Math.round(weightKg * 0.75))} mg SC q24sa (veya UFH!)`
            : `<75 Yaş: 30 mg IV bolus + ${Math.min(100, Math.round(weightKg * 1.0))} mg SC q24sa!`,
          note: 'CrCl <30’da idame kesinlikle q24sa’dır; akut ABH’de UFH tercih edin!',
        };
      }
      if (isStemOver75) {
        const sc75 = Math.min(75, Math.round(weightKg * 0.75));
        return {
          tone: 'amber' as const,
          headline: 'STEMI Fibrinoliz YAŞ ≥75 (ExTRACT-TIMI 25 · İKK Koruması!)',
          primaryDose: `IV BOLUS YOK! → ${sc75} mg (0,75 mg/kg · ilk 2 doz maks 75 mg!) SC q12sa`,
          note: 'KRİTİK KURAL: ≥75 yaş STEMI trombolizinde 30 mg IV bolus YAPILMAZ ve SC doz 0,75 mg/kg’a (ilk 2 doz tavan 75 mg) düşürülür!',
        };
      }
      const sc100 = Math.min(100, Math.round(weightKg * 1.0));
      return {
        tone: 'emerald' as const,
        headline: 'STEMI Fibrinoliz YAŞ <75 (ExTRACT-TIMI 25)',
        primaryDose: `30 mg IV Bolus + 15 dk içinde ${sc100} mg SC (ilk 2 doz maks 100 mg) → 1 mg/kg SC q12sa`,
        note: 'ExTRACT-TIMI 25’te Enoksaparin, UFH’ye göre 30 günlük ölüm/re-MI’yı anlamlı azaltmıştır.',
      };
    }

    // preg_proph (RCOG / ACOG kilo basamaklı)
    const pregMg = weightKg < 50 ? 20 : weightKg <= 90 ? 40 : weightKg <= 130 ? 60 : 80;
    return {
      tone: 'emerald' as const,
      headline: 'Gebelik VTE Profilaksisi (RCOG / ACOG Kilo Basamaklı · Plasentayı Geçmez!)',
      primaryDose: `${formatSyringeText(pregMg)} SC q24sa (36–37. haftada doğum/epidural için UFH’ye geçiş planla!)`,
      note: 'Gebelikte 1. tercih antikoagülandır; doğum sancısı başladığında son dozdan 12 sa (terapötikte 24 sa) geçmeden epidural yapılamaz!',
    };
  };
  const dosingOut = getDosingOutput();

  // --- TAB 2 ASRA 2018 KARAR MOTORU ---
  const asraOutput =
    asraTier === 'proph_qd'
      ? {
          tone: asraLowCrCl ? ('amber' as const) : ('emerald' as const),
          title: 'Profilaktik Günde Tek Doz (40 mg / 0,4 mL q24sa)',
          prePuncture: asraLowCrCl
            ? 'CrCl <30: Standart 12 sa yerine UZAMIŞ BEKLEME (≥24 sa veya Anti-Xa <0,1 IU/mL) önerilir!'
            : 'Son SC dozdan EN AZ 12 SAAT sonra spinal/epidural ponksiyon yapılabilir!',
          catheterInPlace:
            'Epidural kateter yerindeyken YALNIZCA günde 1 kez (q24sa) profilaktik doz kullanılabilir (ASRA 2018 — postop ilk doz yerleştirmeden ≥12 sa sonra!).',
          catheterRemoval:
            'Kateter çekimi: Son profilaktik dozdan EN AZ 12 SAAT sonra! Çekimden sonra yeni doz için EN AZ 4 SAAT bekle!',
        }
      : asraTier === 'proph_bid'
        ? {
            tone: 'amber' as const,
            title: 'Profilaktik Günde 2 Kez (30 mg veya 40 mg q12sa — Ortopedi/Obez)',
            prePuncture: 'Son SC dozdan EN AZ 12 SAAT (CrCl <30’da ≥24 sa) bekle!',
            catheterInPlace:
              'ASRA 2018 UYARISI: EPİDURAL KATETER YERİNDEYKEN q12sa (Günde 2×) DMAH UYGULANMAZ! (Spinal epidural hematom riski!) Önce kateteri çek!',
            catheterRemoval:
              'Kateteri çek (son dozdan ≥12 sa sonra) → q12sa profilaksiye çekimden EN AZ 4 SAAT sonra (ve cerrahiden ≥24 sa sonra) başla!',
          }
        : {
            tone: 'rose' as const,
            title: 'Terapötik Doz (1 mg/kg q12sa veya 1,5 mg/kg q24sa)',
            prePuncture: asraLowCrCl
              ? 'CrCl <30 + Terapötik DMAH: ≥24–48 SAAT + Anti-Xa (<0,1 IU/mL) doğrulanmadan ponksiyon YAPMA!'
              : 'Son SC dozdan EN AZ 24 SAAT geçmeden spinal/epidural veya derin sinir bloku KESİNLİKLE YAPILMAZ!',
            catheterInPlace:
              'MUTLAK YASAK: Terapötik DMAH altında kalıcı epidural kateter TUTULMAZ! Kateter varken terapötik doz başlanmaz!',
            catheterRemoval:
              'Kateter çekimi son terapötik dozdan ≥24 SAAT sonra; çekimden sonra terapötik DMAH’a yeniden başlamak için ≥4 SAAT (ve majör cerrahide 24–72 sa) bekle!',
          };

  // --- TAB 3 PROTAMİN KISMİ REVERSAL (~%60) ---
  const protRatio = hoursSinceEnox <= 8 ? 1.0 : hoursSinceEnox <= 12 ? 0.5 : 0;
  const protRawMg = Math.round(lastEnoxMg * protRatio);
  const protCappedMg = Math.min(50, protRawMg);
  const protAmpouleMl = Number((protCappedMg / 10).toFixed(1));
  const protMinMin = Math.max(10, Math.ceil(protCappedMg / 5));

  // --- KOPYALANABİLİR ORDER METNİ ---
  const buildOrderText = () => {
    if (activeTab === 'dosing_calc') {
      return `ENOKSAPARİN (DMAH) ORDER (${weightKg} kg · ${ageYears} yaş · CrCl ${crCl} mL/dk): ${dosingOut.headline} | Doz: ${dosingOut.primaryDose}. HAVA KABARCIĞINI ÇIKARMADAN SC karın duvarına uygula, masaj YAPMA!`;
    }
    if (activeTab === 'asra_calc') {
      return `ASRA 2018 ENOKSAPARİN (${asraOutput.title}): Ponksiyon öncesi: ${asraOutput.prePuncture} | Kateter: ${asraOutput.catheterInPlace} | Çekim: ${asraOutput.catheterRemoval}`;
    }
    if (activeTab === 'protamine_calc') {
      return protRawMg === 0
        ? `ENOKSAPARİN REVERSAL (>12 sa): Normal böbrekte rutin Protamin gerekmez (CrCl <30 varsa 0,5 mg/mg değerlendir).`
        : `ENOKSAPARİN KISMİ REVERSAL (~%60 · Son doz ${lastEnoxMg} mg, ${hoursSinceEnox} sa önce): Protamin Sülfat ${protCappedMg} mg (${protAmpouleMl} mL [10 mg/mL]) YAVAŞ IV (≤5 mg/dk · ≥${protMinMin} dk!). Kanama sürerse 2–4 sa sonra 0,5 mg/mg tekrar doz; Protamin Anti-Xa’yı yalnızca ~%60 nötralize eder!`;
    }
    return `UFH vs ENOKSAPARİN: UFH (eGFR <30/ABH 1. tercih · %100 Protamin · ASRA 4–6 sa + aPTT · HIT %1–3) | Enoksaparin (CrCl <30 azalt / <15 YASAK · %60 Protamin · ASRA 12 sa prof / 24 sa tedavi · HIT ~%0,2 · Gebelik 1. tercih).`;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 1. HIZLI GEZİNME ÇUBUĞU */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. YÜKSEK UYARI & GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="enx-high-alert"
        defaultOpen={false}
        tallManName="ENOKSAPARIN SODYUM / DMAH (CrCl <30 AZALT · ASRA 12/24 SAAT · PROTAMİN %60!)"
        confusionRiskWith="0,4 mL (40 mg) vs 0,8 mL (80 mg) Hazır Enjektör · CrCl <30 q12sa Hatası · PCI’da UFH Ekleme (SYNERGY)"
        criticalAlerts={[
          'ASRA 2018 / ESAIC 2022 SPİNAL EPİDURAL HEMATOM KURALI (12 SAAT vs 24 SAAT!): Profilaktik (≤40 mg q24sa) Enoksaparin ponksiyon ve epidural kateter çekiminden EN AZ 12 SAAT önce; Terapötik (1 mg/kg q12sa veya 1,5 mg/kg q24sa) Enoksaparin EN AZ 24 SAAT önce kesilmelidir! Kateter çekiminden ≥4 SAAT geçmeden yeni doz YAPILMAZ ve kalıcı epidural kateter varken q12sa / terapötik DMAH YASAKTIR!',
          'BÖBREK YETMEZLİĞİ BİRİKİM TUZAĞI (CrCl <30 mL/dk)!: UFH’nin aksine böbrekten atılır ve HEMODİYALİZLE TEMİZLENMEZ! CrCl 15–29 mL/dk’da tedavi KESİNLİKLE 1 mg/kg q24sa’ya (profilaksi 20 mg q24sa’ya) indirilir; CrCl <15 / ESRD / ABH’de KAÇINILIP Standart Heparin (UFH) seçilir!',
          'PROTAMİN SÜLFAT YALNIZCA ~%60 KISMİ REVERSAL SAĞLAR!: Majör kanamada ≤8 saat içinde 1 mg Protamin / 1 mg Enoksaparin (8–12 sa: 0,5 mg/mg · maks 50 mg yavaş IV ≤5 mg/dk) Anti-Xa aktivitesinin yalnızca ~%60’ını nötralize eder — tam geri dönüş UFH’deki gibi değildir!',
          'STEMI FİBRİNOLİZİNDE ≥75 YAŞ (IV BOLUS YOK!) & PCI’DA UFH İLE KARIŞTIRMA YASAĞI (SYNERGY)!: ≥75 yaş STEMI trombolizinde 30 mg IV bolus YAPILMAZ (0,75 mg/kg SC, maks 75 mg)! Enoksaparin alan AKS hastasında PCI sırasında üzerine UFH eklemek (çapraz geçiş) majör kanamayı katlar — 8–12 sa ise yalnızca 0,3 mg/kg IV Enoksaparin ver!',
        ]}
        antidoteOrRescue="KISMİ ANTİDOT (~%60 Anti-Xa nötralizasyonu): Protamin Sülfat (TR 50 mg/5 mL = 10 mg/mL ampul) — (1) Son SC Enoksaparin ≤8 saat önceyse: 1 mg Protamin / 1 mg Enoksaparin (maks tek doz 50 mg); (2) 8–12 saat önceyse: 0,5 mg Protamin / 1 mg Enoksaparin; (3) >12 saatse (CrCl normal): genelde gerekmez; (4) Kanama sürerse 2–4 saat sonra 0,5 mg/mg tekrar doz verilebilir. DAİMA ≤5 mg/dk (≥10–15 dk) yavaş IV uygula + TXA / lokal hemostaz! Hemodiyaliz Enoksaparini TEMİZLEMEZ!"
      />

      {/* 3. KİMLİK, ÖZET & ORDER KOPYALA KARTI */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Antitrombotik · Düşük Molekül Ağırlıklı Heparin (DMAH / LMWH · Anti-Xa 4:1)
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Clexane® · Oksapar® · Enoksa® 0,2 / 0,4 / 0,6 / 0,8 / 1,0 mL
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                ASRA 12/24 sa · ExTRACT-TIMI 25 · Gebelik 1. Tercih
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Enoksaparin Sodyum (DMAH){' '}
              <span className="text-base sm:text-lg font-semibold text-rose-600 dark:text-rose-400">
                (Clexane® · Oksapar® · Enoksa® · Klexane® · Enox®)
              </span>
            </h1>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              Antitrombin-III üzerinden <strong>Faktör Xa’yı ağırlıklı inhibe eden (~4:1 Anti-Xa:Anti-IIa)</strong>,
              öngörülebilir subkütan biyoyararlanımı (%90–100), düşük HIT (~%0,2) ve osteoporoz riski sayesinde{' '}
              <strong>VTE profilaksisi/tedavisi, kanser trombozu, AKS ve gebelik antikoagülasyonunun</strong> temel
              parenteral ajanıdır. <strong>1 mg = 100 Anti-Xa IU = 0,01 mL</strong> (0,4 mL = 40 mg = 4.000 IU).{' '}
              <strong>aPTT ile izlenmez</strong> (gerekirse 4. saat pik Anti-Xa); <strong>CrCl &lt;30 mL/dk’da birikir</strong>{' '}
              ve <strong>ASRA 2018’e göre nöraksiyel blok öncesi 12 saat (profilaksi) / 24 saat (tedavi)</strong> bekleme
              gerektirir.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
            <MonographCopyButton
              isDark={isDark}
              getText={buildOrderText}
              label="Aktif Hesap Order’ını Kopyala"
            />
            <span className={`text-[11px] ${mutedText}`}>
              ATC: B01AB05 · 1 mg = 100 IU · SC Pik 3–5 sa · t½ 4,5–7 sa
            </span>
          </div>
        </div>

        {/* Hızlı Özet Kutu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Profilaksi &amp; Tedavi (CrCl ≥30)
            </div>
            <div className="text-base font-black text-teal-800 dark:text-teal-200 mt-0.5">
              40 mg q24sa · 1 mg/kg q12sa
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Obez ≥120 kg prof: 40 mg q12sa · 0,1 mL = 10 mg
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
              ASRA 2018 Nöraksiyel Kuralı
            </div>
            <div className="text-base font-black text-rose-800 dark:text-rose-200 mt-0.5">
              Prof: 12 sa · Tedavi: 24 sa
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Kateter çekimi +4 sa · Kateterde q12sa YASAK!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Böbrek (CrCl &lt;30) &amp; STEMI ≥75y
            </div>
            <div className="text-base font-black text-amber-800 dark:text-amber-200 mt-0.5">
              CrCl 15–29: q24sa · &lt;15: UFH
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              STEMI ≥75y: IV bolus YOK · 0,75 mg/kg!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              İzlem &amp; Kısmi Protamin
            </div>
            <div className="text-base font-black text-indigo-800 dark:text-indigo-200 mt-0.5">
              4.sa Anti-Xa · Protamin ~%60
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              aPTT güvenilmez · Plasenta &amp; süt ❌
            </div>
          </div>
        </div>
      </div>

      {/* 4. ETKİ MEKANİZMASI & ANTI-XA ADME AKORDEONU */}
      <div className="space-y-4">
        <MechanismOfActionBlock
          isDark={isDark}
          sectionId="enx-moa"
          sectionTitle="Etki Mekanizması: Kısa Zincirli AT-III Aktivasyonu (~4:1 Anti-Xa:IIa) & Öngörülebilir Biyoyararlanım"
          summary="Enoksaparin, standart heparinin benzil esterinin alkalin depolimerizasyonuyla elde edilen ortalama ~4.500 Da ağırlığında kısa polisakkarit zincirlerinden oluşur. Zincirlerin çoğu <18 sakkarit uzunluğunda olduğundan Antitrombin-III’ü aktive ederek ağırlıklı Faktör Xa’yı bloke eder (~4:1 Anti-Xa:Anti-IIa oranı)."
          pillars={[
            {
              title: '1. Seçici Anti-Xa Baskınlığı → aPTT Neden Uzamaz?',
              detail:
                'Trombin (FIIa) inhibisyonu için gereken ≥18 sakkaritlik köprü çoğu molekülde bulunmadığından aPTT’yi anlamlı uzatmaz! Gerçek antikoagülasyon düzeyini ölçmek için 3. dozdan 4 saat sonra pik Anti-Xa (terapötik q12sa: 0,6–1,0 IU/mL) bakılır.',
            },
            {
              title: '2. Düşük Non-Spesifik Protein/Endotel Bağlanması → Sabit SC Yanıt & Az HIT',
              detail:
                'UFH’nin aksine plazma proteinlerine, makrofajlara, osteoblastlara ve PF4’e çok daha az bağlanır → %90–100 SC biyoyararlanım, rutin laboratuvar gerektirmeyen öngörülebilir etki ve UFH’ye göre ~10 kat daha düşük HIT Tip II (~%0,2) riski!',
            },
            {
              title: '3. Kısa Zincirin Bedeli: Renal Atılım & Kısmi Protamin (~%60) Reversali',
              detail:
                'Makrofaj klirensi yerine böbrek atılımına bağımlı olduğundan CrCl <30’da hızla birikir; ayrıca negatif yük yoğunluğu UFH’den düşük olduğu için Protamin Sülfat Anti-Xa etkisinin yalnızca ~%60’ını nötralize edebilir!',
            },
          ]}
        />

        {/* Genişletilebilir ADME Akordeonu */}
        <div className={`rounded-2xl border overflow-hidden ${basePanel}`}>
          <button
            type="button"
            onClick={() => setShowAdmeDetails((v) => !v)}
            className={`w-full px-5 py-3.5 flex items-center justify-between text-left transition-colors ${
              isDark ? 'hover:bg-slate-800/70' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-teal-500 shrink-0" />
              <span className="text-sm font-bold">
                Detaylı Farmakokinetik (ADME): %90–100 SC Biyoyararlanım, 4. Saat Pik Anti-Xa &amp; Renal Klirens
              </span>
            </div>
            {showAdmeDetails ? (
              <ChevronUp className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0" />
            )}
          </button>

          {showAdmeDetails && (
            <div className="px-5 pb-5 pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-teal-600 dark:text-teal-400 mb-1">
                  A — Absorpsiyon (SC %90–100 · Pik 3–5 Saat)
                </div>
                SC enjeksiyon sonrası neredeyse tam emilir; pik Anti-Xa aktivitesi <strong>3–5 saatte</strong> (bu
                nedenle Anti-Xa ölçümü <strong>4. saatte</strong> alınır!) oluşur ve 20–40 mg dozda 12–24 saat sürer.
                Ödemli/vazopresör alan şoktaki YBÜ hastasında SC emilim bozulabileceğinden IV UFH tercih edilir!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  D — İntravasküler Dağılım · Plasenta &amp; Süt Geçişi YOK!
                </div>
                Vd ~4,3 L (intravasküler hacme yakın). <strong>Plasentayı ve anne sütünü GEÇMEZ</strong> — gebelikte
                VTE profilaksisi ve tedavisinin 1. basamak ajanıdır.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  M &amp; E — Renal Eliminasyon (t½ 4,5–7 sa · CrCl &lt;30’da Birikir!)
                </div>
                Karaciğerde kısmi desülfasyon/depolimerizasyon sonrası esas olarak <strong>böbreklerle</strong> atılır
                (%40’ı aktif/düşük aktif fragmanlar halinde idrarla). CrCl &lt;30 mL/dk’da klirens %65 azalır ve
                hemodiyalizle temizlenemez!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                  Anti-Xa İzlemi Ne Zaman Gerekir?
                </div>
                Rutin hastada gerekmez; ancak <strong>CrCl 15–49 mL/dk</strong>, <strong>BMI ≥40 (&gt;120–150 kg)</strong>,{' '}
                <strong>&lt;45 kg</strong>, <strong>gebelikte terapötik/mekanik kapak</strong> ve <strong>pediatrik</strong>{' '}
                hastalarda 3.–4. dozdan <strong>tam 4 saat sonra</strong> pik Anti-Xa (q12sa: 0,6–1,0; q24sa: 1,0–2,0
                IU/mL) ölçülmelidir!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. KONTRENDİKASYONLAR */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="enx-contra"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Aktif majör kanama (intrakraniyal kanama, aktif GİS/retroperitoneal kanama, hemorajik inme vb.).',
          'Geçmiş veya mevcut İmmün Aracılı Heparin İlişkili Trombositopeni (HIT Tip II) öyküsü (son 100 günde veya aktif antikor pozitifliğinde — UFH ile %80–90 çapraz reaksiyon!).',
          'Enoksaparin, heparin veya domuz ürünlerine aşırı duyarlılık öyküsü.',
          'Spinal / epidural ponksiyon veya kateter çekiminden <12 saat (profilaktik) veya <24 saat (terapötik) önce uygulanmış olması — ve kalıcı epidural kateter varken terapötik/q12sa DMAH!',
          'ESRD / CrCl <15 mL/dk ve Hemodiyaliz hastasında sistemik antikoagülasyon (fatal birikim — UFH kullanın!).',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Yüksek Dikkat Durumları"
        relativeItems={[
          'Ağır KBY (CrCl 15–29 mL/dk) veya dalgalı ABH: Zorunlu q24sa azaltımı gerekir; dalgalı kreatininde UFH çok daha güvenlidir.',
          'Gebelikte Mekanik Protez Kalp Kapağı (FDA Kutu Uyarısı): Yalnızca sıkı pik (0,8–1,2 IU/mL) VE çukur Anti-Xa izlemiyle — izlemsiz kullanımda fatal kapak trombozu!',
          'Vazopresör alan septik/ödemli YBÜ şok hastası: Periferik vazokonstriksiyon nedeniyle SC emilim güvenilmezdir → IV UFH tercih edin!',
          'Düşük ağırlık (<45 kg), morbid obezite (>120–150 kg), ileri yaş (>75 yaş), kontrolsüz HT (>180/110), aktif peptik ülser ve eşzamanlı DAPT/NSAİİ kullanımı.',
          'PCI sırasında UFH ile çapraz geçiş (SYNERGY: ek UFH kanamayı katlar!).',
        ]}
        clinicalNote="ASRA 2018 & ESAIC 2022 Mutlak Kuralı: Profilaktik Enoksaparin (≤40 mg q24sa) → 12 saat bekle; Terapötik Enoksaparin (1 mg/kg q12sa veya 1,5 mg/kg q24sa) → 24 saat bekle; epidural kateter çekiminden sonra yeni doz için en az 4 SAAT bekle!"
      />

      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ */}
      <div id="enx-indications" className="scroll-mt-24">
        <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
          <div className="flex items-center gap-2.5 mb-4">
            <BookOpen className="w-5 h-5 text-teal-500 shrink-0" />
            <div>
              <h2 className="text-lg font-black tracking-tight">
                Klinik Endikasyonlar &amp; Kanıta Dayalı Doz Protokolleri (CHEST · ESC 2023 · ExTRACT-TIMI 25 · RCOG)
              </h2>
              <p className={`text-xs ${mutedText}`}>
                Türkiye’deki hazır enjektörler: 0,2 mL (20 mg) · 0,4 mL (40 mg) · 0,6 mL (60 mg) · 0,8 mL (80 mg) · 1,0 mL (100 mg)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs leading-relaxed">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-teal-700 dark:text-teal-300">
                  1. Cerrahi, Ortopedik &amp; Dahili VTE Profilaksisi
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  40 mg (0,4 mL) q24sa
                </span>
              </div>
              <p className={mutedText}>
                <strong>Yüksek Risk (Ortopedi, Onkoloji, YBÜ, Akut Dahili):</strong> <strong>40 mg SC q24sa</strong>{' '}
                (morbid obezite ≥120 kg: <strong>40 mg SC q12sa</strong>; orta risk genel cerrahi: 20 mg q24sa; CrCl
                15–29: <strong>20 mg q24sa</strong>). Kalça/diz protezi sonrası 14–35 gün, majör kanser cerrahisi
                sonrası 4 hafta uzatılmış profilaksi!
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-indigo-700 dark:text-indigo-300">
                  2. Akut DVT / Pulmoner Emboli &amp; Kanser Trombozu
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  1 mg/kg q12sa
                </span>
              </div>
              <p className={mutedText}>
                <strong>Standart (CrCl ≥30):</strong> <strong>1 mg/kg SC q12sa</strong> (PE, obezite ve kanser
                trombozunda 1. seçim) veya komplike olmayan DVT’de 1,5 mg/kg SC q24sa.{' '}
                <strong>CrCl 15–29 mL/dk:</strong> Kesinlikle <strong>1 mg/kg SC q24sa</strong> (veya UFH)!
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-rose-700 dark:text-rose-300">
                  3. AKS (NSTE-ACS &amp; STEMI Fibrinolizi · ExTRACT-TIMI 25)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  ≥75y: IV Bolus YOK!
                </span>
              </div>
              <p className={mutedText}>
                <strong>NSTE-ACS:</strong> 1 mg/kg SC q12sa. <strong>STEMI Fibrinolizi:</strong> Yaş{' '}
                <strong>&lt;75</strong> ise <strong>30 mg IV bolus + 1 mg/kg SC</strong> (ilk 2 doz maks 100 mg) q12sa;
                yaş <strong>≥75</strong> ise <strong>IV BOLUS YOK, 0,75 mg/kg SC</strong> (ilk 2 doz maks 75 mg) q12sa!
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-amber-700 dark:text-amber-300">
                  4. Gebelik VTE Profilaksi/Tedavi &amp; Köprüleme (Bridging)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  Gebelik 1. Tercih
                </span>
              </div>
              <p className={mutedText}>
                Plasentayı geçmediği için gebelikte 1. tercihtir (profilaksi kilo basamaklı 20–80 mg q24sa; tedavi
                1 mg/kg q12sa → 36–37. hf’da UFH’ye geçiş!). Yüksek tromboz riskli mekanik kapak/Varfarin kesiminde
                perioperatif köprülemede son preop doz ameliyattan <strong>24 saat önce</strong> yarım/son doz olarak
                planlanır!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI */}
      <div id="enx-calc" className="scroll-mt-24">
        <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Syringe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight">
                  Enoksaparin Doz/Enjektör, ASRA 2018 (12/24 sa) &amp; Protamin (%60) Hesaplayıcısı
                </h2>
                <p className={`text-xs ${mutedText}`}>
                  CrCl &lt;30 otomatik azaltım, STEMI ≥75y kilidi, TR hazır enjektör eşleştirmesi &amp; UFH vs DMAH kıyaslama
                </p>
              </div>
            </div>
            <MonographCopyButton
              isDark={isDark}
              getText={buildOrderText}
              label="Order Kopyala"
            />
          </div>

          {/* Sekmeler */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
            {[
              { id: 'dosing_calc' as CalcTab, label: '1. Doz & Enjektör', icon: Syringe },
              { id: 'asra_calc' as CalcTab, label: '2. ASRA 12 / 24 sa', icon: Activity },
              { id: 'protamine_calc' as CalcTab, label: '3. Protamin (~%60)', icon: HeartPulse },
              { id: 'ufh_vs_lmwh' as CalcTab, label: '4. UFH vs DMAH', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    active
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: DOZ & TR ENJEKTÖR */}
          {activeTab === 'dosing_calc' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Klinik Endikasyon</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'vte_proph' as EnoxIndication, label: 'VTE Profilaksisi' },
                      { id: 'vte_treat' as EnoxIndication, label: 'VTE Tedavisi (DVT / PE)' },
                      { id: 'nste_acs' as EnoxIndication, label: 'NSTE-ACS (NSTEMI / UA)' },
                      { id: 'stemi_fib' as EnoxIndication, label: 'STEMI Fibrinoliz (ExTRACT)' },
                      { id: 'preg_proph' as EnoxIndication, label: 'Gebelik VTE Profilaksisi' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setIndication(opt.id)}
                        className={`p-2 rounded-xl border text-left text-xs font-bold ${
                          indication === opt.id
                            ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label htmlFor={`${uniqueId}-enxwt`} className="block text-xs font-bold mb-1">
                      Kilo: <span className="text-teal-500">{weightKg} kg</span>
                    </label>
                    <input
                      id={`${uniqueId}-enxwt`}
                      type="range"
                      min={40}
                      max={170}
                      step={1}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uniqueId}-enxage`} className="block text-xs font-bold mb-1">
                      Yaş: <span className={isStemOver75 ? 'text-rose-500' : 'text-indigo-500'}>{ageYears}</span>
                    </label>
                    <input
                      id={`${uniqueId}-enxage`}
                      type="range"
                      min={18}
                      max={95}
                      step={1}
                      value={ageYears}
                      onChange={(e) => setAgeYears(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uniqueId}-enxcrcl`} className="block text-xs font-bold mb-1">
                      CrCl:{' '}
                      <span className={crCl < 30 ? 'text-rose-500' : 'text-emerald-500'}>{crCl} mL/dk</span>
                    </label>
                    <input
                      id={`${uniqueId}-enxcrcl`}
                      type="range"
                      min={10}
                      max={120}
                      step={1}
                      value={crCl}
                      onChange={(e) => setCrCl(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div
                  className={`p-4 rounded-xl border-2 space-y-1.5 ${
                    dosingOut.tone === 'emerald'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                      : dosingOut.tone === 'amber'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100'
                        : 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100'
                  }`}
                >
                  <div className="text-xs font-black uppercase opacity-80">{dosingOut.headline}</div>
                  <div className="text-base font-black">{dosingOut.primaryDose}</div>
                  <p className="text-xs leading-relaxed">{dosingOut.note}</p>
                </div>

                <div className={`p-3 rounded-xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong>TR Enjektör Dönüşümü:</strong> <code>1 mg = 100 Anti-Xa IU = 0,01 mL</code> (0,4 mL = 40 mg =
                  4.000 IU). Hazır enjektördeki <strong>hava kabarcığını ÇIKARMA</strong>, göbeğe ≥5 cm mesafeden dik
                  SC uygula ve masaj YAPMA!
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ASRA 2018 NÖRAAKSİYEL */}
          {activeTab === 'asra_calc' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="text-xs font-bold">1. Hastanın Enoksaparin Rejimi:</div>
                {[
                  { id: 'proph_qd' as AsraTier, label: 'Profilaktik Günde 1× (20–40 mg q24sa)' },
                  { id: 'proph_bid' as AsraTier, label: 'Profilaktik Günde 2× (30–40 mg q12sa — Ortopedi/Obez)' },
                  { id: 'therapeutic' as AsraTier, label: 'Terapötik Doz (1 mg/kg q12sa veya 1,5 mg/kg q24sa)' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAsraTier(opt.id)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-bold ${
                      asraTier === opt.id
                        ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200'
                        : isDark
                          ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}

                <label className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs ${asraLowCrCl ? 'bg-rose-500/15 border-rose-500' : isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <input
                    type="checkbox"
                    checked={asraLowCrCl}
                    onChange={(e) => setAsraLowCrCl(e.target.checked)}
                    className="accent-rose-600"
                  />
                  <span className="font-bold">Böbrek Yetmezliği Mevcut (CrCl &lt;30 mL/dk · Eliminasyon Uzamıştır!)</span>
                </label>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2.5 text-xs ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-black text-sm text-rose-600 dark:text-rose-400">{asraOutput.title}</div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong>Ponksiyon Öncesi Bekleme:</strong> {asraOutput.prePuncture}
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong>Kalıcı Epidural Kateter:</strong> {asraOutput.catheterInPlace}
                </div>
                <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
                  <strong>Kateter Çekimi &amp; Yeniden Başlama:</strong> {asraOutput.catheterRemoval}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROTAMİN KISMİ REVERSAL (~%60) */}
          {activeTab === 'protamine_calc' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label htmlFor={`${uniqueId}-lastenx`} className="block text-xs font-bold mb-1">
                    Son SC Enoksaparin Dozu: <span className="text-rose-500">{lastEnoxMg} mg ({(lastEnoxMg / 100).toFixed(1)} mL)</span>
                  </label>
                  <input
                    id={`${uniqueId}-lastenx`}
                    type="range"
                    min={20}
                    max={140}
                    step={20}
                    value={lastEnoxMg}
                    onChange={(e) => setLastEnoxMg(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>
                <div>
                  <label htmlFor={`${uniqueId}-enxhrs`} className="block text-xs font-bold mb-1">
                    Son Dozdan Beri Geçen Süre:{' '}
                    <span className="text-teal-500">{hoursSinceEnox} saat</span>
                  </label>
                  <input
                    id={`${uniqueId}-enxhrs`}
                    type="range"
                    min={1}
                    max={18}
                    step={1}
                    value={hoursSinceEnox}
                    onChange={(e) => setHoursSinceEnox(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                  <div className="flex justify-between text-[10px] opacity-70">
                    <span>≤8 sa (1 mg/mg)</span>
                    <span>8–12 sa (0,5 mg/mg)</span>
                    <span>&gt;12 sa (Genelde yok)</span>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                {protRawMg === 0 ? (
                  <div className="p-3.5 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-xs">
                    <strong>&gt;12 Saat Geçmiş:</strong> Normal böbrek fonksiyonunda rutin Protamin genellikle gerekmez
                    (ancak CrCl &lt;30 veya devam eden ağır kanamada 0,5 mg/mg değerlendirilebilir!).
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="text-[10px] font-bold uppercase opacity-70">Protamin Dozu (Maks 50 mg)</div>
                      <div className="text-lg font-black text-rose-600 dark:text-rose-400">{protCappedMg} mg</div>
                      <div className="text-[11px] opacity-75">TR 10 mg/mL ampul: <strong>{protAmpouleMl} mL</strong></div>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="text-[10px] font-bold uppercase opacity-70">Yavaş IV Süresi</div>
                      <div className="text-lg font-black text-teal-600 dark:text-teal-400">≥{protMinMin} dk</div>
                      <div className="text-[11px] opacity-75">Hız ≤5 mg/dk (Hipoten./Tip III!)</div>
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs space-y-1">
                  <div className="font-black text-amber-800 dark:text-amber-200">
                    Kısmi Reversal (~%60) Uyarısı:
                  </div>
                  <p>
                    Protamin Sülfat, Enoksaparinin Anti-Xa aktivitesini <strong>yalnızca ~%60</strong> oranında
                    nötralize eder! Ağır kanama 2–4 saat sonra sürerse <strong>0,5 mg/mg</strong> ikinci doz
                    verilebilir; eşzamanlı TXA 1 g IV, lokal/cerrahi hemostaz ve kan ürünü desteği şarttır.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: UFH vs ENOKSAPARİN (DMAH) */}
          {activeTab === 'ufh_vs_lmwh' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                    <th className="p-2.5 rounded-tl-xl font-black">Özellik</th>
                    <th className="p-2.5 font-black text-rose-600 dark:text-rose-400">Enoksaparin (DMAH)</th>
                    <th className="p-2.5 rounded-tr-xl font-black text-teal-600 dark:text-teal-400">Standart Heparin (UFH)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-bold">Anti-Xa : Anti-IIa &amp; t½</td>
                    <td className="p-2.5">~4:1 (Anti-Xa baskın) · t½ 4,5–7 sa</td>
                    <td className="p-2.5">1:1 (FIIa + FXa) · t½ 60–90 dk</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Böbrek Yetmezliği (CrCl &lt;30)</td>
                    <td className="p-2.5 font-bold text-rose-600 dark:text-rose-400">BİRİKİR! (15–29: q24sa · &lt;15: YASAK!)</td>
                    <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">1. TERCİH (Birikmez · Doz ayarı yok!)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Protamin Reversali</td>
                    <td className="p-2.5 font-semibold text-amber-600 dark:text-amber-400">Kısmi (~%60 Anti-Xa!)</td>
                    <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">Tam (%100 anında nötralizasyon!)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">ASRA 2018 Nöraksiyel</td>
                    <td className="p-2.5 font-bold text-rose-600 dark:text-rose-400">Prof: 12 sa · Tedavi: 24 sa!</td>
                    <td className="p-2.5">SC/IV: 4–6 sa (+ normal aPTT)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Laboratuvar İzlemi</td>
                    <td className="p-2.5">Rutin yok (özelde 4.sa pik Anti-Xa · aPTT ❌)</td>
                    <td className="p-2.5">Zorunlu (aPTT 6 saatte bir / ACT / Anti-Xa)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">HIT Tip II &amp; Gebelik</td>
                    <td className="p-2.5">HIT ~%0,2 (10× az!) · Gebelik 1. tercih (≤36 hf)</td>
                    <td className="p-2.5">HIT ~%1–3 · 36. hf sonrası doğum/epidural geçişi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 8. TÜRKİYE PİYASA FORMLARI */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="enx-tr"
        preparations={[
          {
            name: 'Clexane® / Oksapar® / Enoksa® / Klexane® / Enox® 0,2 mL & 0,4 mL',
            presentation: 'Kullanıma hazır cam enjektör (20 mg / 0,2 mL · 40 mg / 0,4 mL)',
            concentration: '2.000 Anti-Xa IU (0,2 mL) · 4.000 Anti-Xa IU (0,4 mL)',
            saltOrBaseNote:
              '0,4 mL (40 mg) = standart erişkin VTE profilaksisi (q24sa); 0,2 mL (20 mg) = orta risk cerrahi veya CrCl 15–29 mL/dk renal profilaksi!',
            alertLevel: 'standard',
          },
          {
            name: 'Clexane® / Oksapar® / Enoksa® 0,6 mL · 0,8 mL · 1,0 mL (Terapötik Güçler)',
            presentation: 'Kullanıma hazır dereceli cam enjektör (60 / 80 / 100 mg)',
            concentration: '6.000 IU (0,6 mL) · 8.000 IU (0,8 mL) · 10.000 IU (1,0 mL)',
            saltOrBaseNote:
              'VTE tedavisi ve AKS (1 mg/kg q12sa) için kullanılır! Dereceli enjektörlerde ara dozlar ayarlanabilir; ancak uygulama öncesi HAVA KABARCIĞINI ÇIKARMAYIN!',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'SC Uygulama (Standart): Kullanıma hazır enjektör seyreltilmeden göbeğin sağ/sol ≥5 cm dışına 90° açıyla derin SC enjekte edilir — hava kabarcığı çıkarılmaz, enjeksiyon sonrası masaj yapılmaz!',
          'IV Bolus (Yalnızca <75 Yaş STEMI Fibrinolizi 30 mg veya PCI 0,3 mg/kg): Doğrudan çalışan %0,9 NaCl IV hattından bolus verilir (diğer ilaçlarla karıştırmayın; ASLA IM enjeksiyon yapmayın!).',
        ]}
        concentrationTrapWarning={'0,4 mL vs 0,8 mL & CrCl <30 TUZAĞI: (1) Terapötik 0,8 mL (80 mg) enjektörün yanlışlıkla profilaksi yerine uygulanması veya CrCl <30 hastada q12sa verilmesi ölümcül retroperitoneal kanama yapar! (2) Pre-filled enjektördeki hava kabarcığını çıkarmak doz kaybına ve cilt altı ekimoza yol açar!'}
      />

      {/* 9. UYGULAMA TEKNİĞİ & PCI UYUMLULUĞU */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="enx-compat"
        accessRequirement="peripheral-ok"
        accessSummary="Standart uygulama yolu derin SUBKÜTAN (SC — karın ön-yan duvarı, sağ-sol dönüşümlü) enjeksiyondur. Yalnızca <75 yaş STEMI fibrinolizi (30 mg) veya PCI (0,3 mg/kg) sırasında IV bolus verilebilir. İntramüsküler (IM) uygulama KESİNLİKLE YASAKTIR!"
        phRange="5,5 – 7,5 (Kullanıma Hazır İzotonik Çözelti · 100 mg/mL = 10.000 IU/mL)"
        osmolalityNote="Hazır enjektördeki 0,1 mL hava kabarcığı iğne ucundaki son damlayı cilt altına iterek hem tam dozu sağlar hem de enjeksiyon yeri hematomunu azaltır — KESİNLİKLE BOŞALTMAYIN!"
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF — yalnızca STEMI/PCI IV bolus sonrası hat yıkama)',
          '%5 Dekstroz (D5W)',
        ]}
        stabilityNote="Oda sıcaklığında (<25 °C) saklayın, dondurmayın. Tek kullanımlık hazır enjektördür."
        ySiteCompatible={[
          '%0,9 NaCl · %5 Dekstroz (IV bolus hattında ayrı yıkama ile)',
        ]}
        ySiteIncompatible={[
          'Aynı enjektörde veya aynı IV hatta başka ilaçlarla karıştırma!',
          'PCI sırasında UFH (Standart Heparin) ile çapraz geçiş / üst üste ekleme (SYNERGY: majör kanama ↑!)',
        ]}
        extravasationProtocol="SC enjeksiyon sonrası sert hematom/ekimoz gelişirse bölgeye masaj YAPMAYIN, sonraki enjeksiyonları karşı tarafa uygulayın; ağrılı büyüyen karın duvarı/rektus kılıfı hematomu veya hipotansiyonda acil BT + Hb kontrolü yapın!"
      />

      {/* 10. ORGAN YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="enx-organ"
        renalSummary="BÖBREK YETMEZLİĞİNDE EN KRİTİK UYARI: CrCl 15–29 mL/dk’da ZORUNLU q24sa azaltımı (profilaksi 20 mg q24sa · tedavi 1 mg/kg q24sa); CrCl <15 / ESRD / IHD / ABH’de KAÇINIP Standart Heparin (UFH) seçin! Diyalizle TEMİZLENMEZ!"
        renalDetails={[
          'CrCl ≥30 mL/dk: Standart doz (30–49 mL/dk’da çok günlük terapötik kullanımda 4. saat pik Anti-Xa izle!).',
          'CrCl 15–29 mL/dk: Profilaksi 20 mg (0,2 mL) q24sa · Tedavi 1 mg/kg q24sa (+ Anti-Xa) — veya UFH!',
          'CrCl <15 / IHD / CRRT: Sistemik kullanımda KAÇININ → Standart Heparin (UFH)!',
        ]}
        hepaticSummary="Kompanse sirozda (Child-Pugh A) böbrek normalse standart doz; Child-Pugh B–C’de portal hipertansiyon/varis kanaması ve yalnızca ~%60 Protamin reversali nedeniyle yüksek kanama riski taşır (UFH daha kontrollüdür)."
        hepaticDetails={[
          'Child-Pugh A: Standart doz (varis taraması önerilir).',
          'Child-Pugh B–C: Aktif kanamada kontrendike; kesin trombozda kısa etkili UFH tercih edilebilir.',
        ]}
        {...STANDALONE_ORGAN_PART2['enoxaparin']}
      />

      {/* 11. GERİATRİ & OBEZİTE DOZ ÖLÇEKLEME */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="enx-special"
        geriatricReductionBadge=">75 Yaş: STEMI Fibrinolizde IV Bolus YOK (0,75 mg/kg) · CrCl Mutlaka Hesapla!"
        geriatricPoints={[
          'Gizli KBY Tuzağı: Sarkopenik yaşlılarda normal serum kreatinin (<1,1 mg/dL) sıklıkla CrCl 20–30 mL/dk’yı maskeler — Cockcroft-Gault CrCl hesaplamadan yaşlıya 1 mg/kg q12sa Enoksaparin ASLA başlama!',
          'STEMI Fibrinoliz (≥75 Yaş): ExTRACT-TIMI 25 kuralına göre 30 mg IV bolus YAPILMAZ ve SC doz 0,75 mg/kg q12sa’ya (ilk 2 doz maks 75 mg) düşürülür!',
        ]}
        obesityWeightScalarBadge="≥120 kg: Prof. 40 mg q12sa · Tedavi 1 mg/kg q12sa (+ 4.sa Anti-Xa!)"
        obesityPoints={[
          'Morbid Obezite (BMI ≥40 / ≥120 kg) Profilaksi: Standart 40 mg q24sa yetersiz kalır → 40 mg (0,4 mL) SC q12sa uygulanır!',
          'Morbid Obezite Tedavisi: Gerçek ağırlıkla (TBW) 1 mg/kg q12sa (super-obez >150 kg’da bazı merkezler 0,8 mg/kg q12sa) başlanır ve 3.–4. dozdan 4 saat sonra pik Anti-Xa (0,6–1,0 IU/mL) ile doğrulanır — keyfi 100 mg tavan koyup hastayı yetersiz antikoagüle ETMEYİN!',
        ]}
        clinicalNote="Morbid obezitede TBW dozlaması ve 4. saat pik Anti-Xa izlemi için:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Enoksaparin Sodyum (DMAH)"
        recommendedScalar="TBW"
        secondaryScalar={{ type: 'AdjBW', context: 'Süper Obezite (>150 kg) + 4. Saat Pik Anti-Xa (0,6–1,0)' }}
        rationale="Terapötik Enoksaparinde gerçek vücut ağırlığı (1 mg/kg q12sa) esastır; morbid obezitede (≥120 kg) profilaksi 40 mg q12sa’ya çıkarılır ve terapötik doz 4. saat pik Anti-Xa ile doğrulanır."
        currentWeightKg={weightKg}
        onApplyWeight={(w) => setWeightKg(Math.max(40, Math.min(170, Math.round(w))))}
      />

      {/* 12. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="enx-preg"
        pregnancySummary="PLASENTAYI GEÇMEZ! Gebelikte VTE profilaksisi ve tedavisinin 1. TERCİH antikoagülanıdır (UFH’ye göre daha az osteoporoz ve HIT!). Ancak doğum ve epidural anestezi güvenliği için 36–37. haftada kısa etkili UFH’ye geçiş (veya 12/24 sa kesme planı) yapılır!"
        pregnancyDetails={[
          'Mekanik Protez Kalp Kapağı (FDA Kutu Uyarısı): Gebelikte mekanik kapaklı hastalarda izlemsiz Enoksaparin kullanımı ölümcül kapak trombozuna yol açmıştır — yalnızca yüksek riskli gebelik merkezinde sıkı pik (0,8–1,2 IU/mL) ve çukur Anti-Xa izlemiyle!',
          'Doğum / Epidural: Profilaktik Enoksaparinden 12 saat, terapötikten 24 saat geçmeden epidural analjezi yapılamaz!',
        ]}
        lactationSummary="Yüksek molekül ağırlığı nedeniyle anne sütüne ihmal edilebilir düzeyde geçer ve bebeğin GİS’inde inaktive olur — emzirme döneminde TAMAMEN GÜVENLİDİR!"
        lactationDetails={[
          'Postpartum VTE profilaksisi/tedavisinde (sezaryen sonrası dahil) emzirmeye ara vermeden güvenle kullanılır.',
        ]}
      />

      {/* 13. YAN ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="enx-adr"
        items={[
          {
            title: 'Majör Kanama & Retroperitoneal / Rektus Kılıfı Hematomu',
            incidenceOrSeverity: 'En Önemli Risk · CrCl <30 & Yaşlıda Yüksek!',
            detail:
              'Açıklanamayan karın/yan ağrısı, Hb düşüşü ve hipotansiyon gelişen Enoksaparin hastasında RETROPERİTONEAL veya REKTUS KILIFI HEMATOMU mutlaka BT ile dışlanmalıdır!',
            tone: 'rose',
          },
          {
            title: 'Spinal / Epidural Hematom (FDA Kutu Uyarısı!)',
            incidenceOrSeverity: 'ASRA 12/24 sa İhlali · Kalıcı Parapleji!',
            detail:
              'Nöraksiyel blok veya kateter çekimi zamanlamasına uyulmadığında gelişir; yeni bacak güçsüzlüğü, uyuşma veya idrar/gaita inkontinansında ACİL MRG ve <8 saatte cerrahi dekompresyon şarttır!',
            tone: 'rose',
          },
          {
            title: 'HIT Tip II (Heparin İlişkili Trombositopeni — Anti-PF4)',
            incidenceOrSeverity: 'Nadir (~%0,2 · UFH’den 10× Az) · Çapraz Reaktif!',
            detail:
              'UFH’den çok daha nadir olsa da gelişebilir ve UFH-HIT öykülü hastada %80–90 çapraz reaksiyon gösterdiğinden KESİNLİKLE alternatif olarak kullanılamaz!',
            tone: 'amber',
          },
          {
            title: 'Enjeksiyon Yeri Ekimozu/Hematomu, Hafif Transaminaz Artışı & Hiperkalemi',
            incidenceOrSeverity: 'Sık · Genellikle Benign',
            detail:
              'Asemptomatik geçici ALT/AST yükselmesi (ilaç kesilince düzelir) ve KBY/DM/ACEİ hastalarında aldosteron baskılanmasına bağlı hafif hiperkalemi görülebilir.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 14. ÖZEL KLİNİK DİKKAT NOKTALARI */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="enx-cautions"
        items={[
          {
            title: 'Vazopresör Alan Kritik YBÜ Hastasında SC Enoksaparin Emilim Sorunu!',
            detail:
              'Yüksek doz Noradrenalin/Adrenalin infüzyonu alan ve yaygın cilt altı ödemi olan septik şok hastalarında SC Enoksaparinin emilimi ciddi biçimde düşer (yetersiz Anti-Xa düzeyi!). Bu hastalarda hem öngörülebilir etki hem de olası kanamada anında geri dönüş için IV UFH tercih edilmelidir.',
          },
          {
            title: 'PCI’da Enoksaparin + UFH Çapraz Geçiş Yasağı (SYNERGY Çalışması)',
            detail:
              'NSTE-ACS nedeniyle SC Enoksaparin alan hasta kateter laboratuvarına indiğinde UFH eklenmesi (“stacking”) majör kanamayı anlamlı artırır! Son Enoksaparin <8 sa ise ek doz verilmez; 8–12 sa ise yalnızca 0,3 mg/kg IV Enoksaparin verilir.',
          },
          {
            title: 'Rektus Kılıfı Hematomu (Öksürük + Karın Duvarı Enjeksiyonu)',
            detail:
              'Yaşlı, KOAH/şiddetli öksürüğü olan veya yanlışlıkla kas içine/derin karın duvarına yapılan enjeksiyonlarda inferior epigastrik arter yaralanmasıyla dev rektus kılıfı hematomu ve hemorajik şok gelişebilir!',
          },
          {
            title: 'DOAC’a Geçiş Zamanlaması (Enoksaparin → Apiksaban / Rivaroksaban / Dabigatran)',
            detail:
              'Enoksaparinden DOAC’a geçerken bir sonraki planlanan Enoksaparin dozunun saatinden 0–2 saat önce ilk DOAC dozu verilir ve Enoksaparin durdurulur.',
          },
        ]}
      />

      {/* 15. DERİN FARMAKODİNAMİ & ORGAN SİSTEMİ ETKİLERİ */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="enx-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Depolimerize Kısa Zincirler (~4.500 Da), ~4:1 Anti-Xa:IIa & Endotelyal TFPI Salınımı',
          summary:
            'Standart heparinin kontrollü depolimerizasyonuyla elde edilen Enoksaparin, uzun zincirli UFH’nin dezavantajlarını (değişken yanıt, yüksek HIT, osteoporoz) azaltırken seçici Anti-Xa aktivitesi sunar:',
          points: [
            'Seçici FXa İnhibisyonu: Pentasakkarit dizisi AT-III’ün FXa’yı inhibe etmesini ~1.000 kat hızlandırır; ancak zincirlerin çoğunluğu <18 sakkarit olduğundan trombin (FIIa) inhibisyonu zayıftır (4:1 oran → aPTT uzamaz!).',
            'TFPI Salınımı: Vasküler endotelden Doku Faktörü Yolağı İnhibitörü (TFPI) salınımını artırarak ekstrensek koagülasyon başlangıcını da baskılar.',
            'Protamin İyonik Afinite Farkı: Kısa zincirler daha az sülfat/negatif yüke sahip olduğundan katyonik Protamin Sülfat yalnızca uzun fraksiyonları (Anti-IIa ve Anti-Xa’nın ~%60’ını) nötralize edebilir.',
          ],
        }}
        intracellularSignaling={{
          title: 'Renal Glomerüler/Tübüler Klirens & Pik/Çukur Anti-Xa Kinetiği',
          summary:
            'Klinik güvenliğin merkezindeki iki farmakokinetik prensip:',
          points: [
            'Birinci Derece Renal Eliminasyon: Makrofaj/endotel bağlanması düşük olduğundan eliminasyon büyük ölçüde GFR’ye bağlıdır — CrCl <30’da yarı ömür 2–3 kat uzayarak birikimli kanama yaratır.',
            '4. Saat Pik Anti-Xa Kuralı: SC emilimin pik noktası 3–5. saatte olduğundan Anti-Xa kan örneği mutlaka enjeksiyondan tam 4 saat sonra alınmalıdır; yanlış saatte alınan örnek yanlış doz değişikliğine yol açar!',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Venöz & Arteriyel Tromboz Koruması',
            tissueTarget: 'AT-III · Faktör Xa · Endotelyal TFPI',
            accent: 'teal',
            points: [
              'Cerrahi, ortopedik, onkolojik ve dahili VTE profilaksi/tedavisinde altın standarttır.',
              'ExTRACT-TIMI 25’te STEMI fibrinolizinde UFH’ye üstün bulunmuştur.',
            ],
          },
          {
            systemTitle: 'Böbrek (Eliminasyon Organı!)',
            tissueTarget: 'Glomerüler Filtrasyon (CrCl <30 Kritik Eşik)',
            accent: 'rose',
            points: [
              'CrCl 15–29 mL/dk’da q24sa azaltımı zorunludur; CrCl <15 / IHD / CRRT’de kullanılmaz (diyaliz temizlemez!).',
            ],
          },
          {
            systemTitle: 'Nöraksiyel Kanal (Spinal / Epidural)',
            tissueTarget: 'Epidural Venöz Pleksus (ASRA 12 / 24 sa)',
            accent: 'amber',
            points: [
              'Profilakside 12 saat, tedavide 24 saat beklemeden ponksiyon/kateter çekimi yapılmaz; kateter varken q12sa veya terapötik DMAH YASAKTIR!',
            ],
          },
          {
            systemTitle: 'Plasenta, Kemik & Trombositler (PF4)',
            tissueTarget: 'Maternal-Fetal Bariyer · PF4 · Osteoblast',
            accent: 'indigo',
            points: [
              'Plasentaya ve anne sütüne geçmez; UFH’ye kıyasla HIT (~%0,2) ve osteoporoz riski belirgin düşüktür.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Doğru Hasta — Doğru Heparin Seçimi (Enoksaparin vs UFH)',
          summary:
            'Klinik pratikte tek bir kural birçok ölümcül kanamayı önler:',
          points: [
            'CrCl ≥30 + Stabil Hasta / Gebelik ≤36 hf / Ayaktan veya Servis VTE → Enoksaparin (DMAH)!',
            'CrCl <30 / ABH / Diyaliz / Şok-Vazopresör / Yakın Cerrahi / Acil %100 Reversal İhtiyacı / 36. hf Sonrası Doğum → Standart Heparin (UFH)!',
          ],
        }}
        clinicalPearls={[
          'ASRA 12–24–4 Kuralını Ezberle: Profilaksi 12 saat · Tedavi 24 saat · Kateter çekimi sonrası yeni doz ≥4 saat!',
          'CrCl Hesaplamadan Yaşlıya 1 mg/kg q12sa Yazma: CrCl <30’da q12sa verilmesi retroperitoneal kanama nedenidir!',
          'Hava Kabarcığını Çıkarma · Masaj Yapma: Hazır enjektördeki hava kilidi tam doz ve daha az morarma sağlar!',
          'Protamin Yalnızca ~%60 Etkilidir: Acil tam geri dönüş gereken yüksek kanama riskli hastada en baştan UFH seç!',
        ]}
      />

      {/* 16. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKLAR */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="enx-refs"
        drugName="Enoksaparin Sodyum (DMAH)"
        drugsComUrl="https://www.drugs.com/drug-interactions/enoxaparin.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Diğer Sistemik Antikoagülanlar (UFH · DOAC · Varfarin [köprüleme bitince] · Fondaparinuks)',
            mechanism: 'Aditif / Sinerjik Anti-Xa ve Anti-IIa İnhibisyonu (SYNERGY PCI Çapraz Geçiş Riski!)',
            clinicalEffect:
              'Masif retroperitoneal, GİS, cerrahi ve intrakraniyal kanama riskinde katlanma.',
            management:
              'PCI’da Enoksaparin üzerine UFH eklemeyin; DOAC/Varfarin geçişinde kesin zamanlama kurallarına uyun.',
          },
          {
            severity: 'D',
            agent: 'Antiplateletler (Aspirin · Klopidogrel · Prasugrel · Tikagrelor), Trombolitikler & Sistemik NSAİİ’ler',
            mechanism: 'Sinerjik Trombosit + Pıhtılaşma İnhibisyonu & GİS Mukozal Hasar',
            clinicalEffect:
              'Majör GİS kanaması ve spinal epidural hematom riskinde belirgin artış.',
            management:
              'Gereksiz NSAİİ’leri kesin (Parasetamol seçin); AKS gibi zorunlu DAPT+Enoksaparin kombinasyonunda Pantoprazol 40 mg/gün ekleyin.',
          },
          {
            severity: 'C',
            agent: 'ACEİ / ARB · Spironolakton · Potasyum Takviyeleri · TMP-SMX',
            mechanism: 'Heparin Kaynaklı Hipoaldosteronizm ile Aditif Potasyum Tutulumu',
            clinicalEffect:
              'Özellikle KBY ve diyabetik hastalarda hiperkalemi.',
            management:
              'Uzun süreli kullanımda riskli hastalarda serum K⁺ izleyin.',
          },
        ]}
        references={[
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Regional Anesthesia & Pain Medicine',
            year: 2018,
            note: 'Profilaktik DMAH (12 sa), terapötik DMAH (24 sa), kateter çekimi sonrası 4 sa bekleme ve kalıcı kateterde q12sa/terapötik yasağı.',
          },
          {
            authors: 'Kietaibl S, Ferrandis R, Godier A, et al. (ESAIC / ESRA Guidelines)',
            title: 'Regional anaesthesia in patients on antithrombotic drugs: Joint ESAIC/ESRA guidelines',
            journal: 'European Journal of Anaesthesiology',
            year: 2022,
            note: 'Avrupa nöraksiyel ve periferik sinir bloku DMAH zamanlama ve CrCl <30 dikkat kuralları.',
          },
          {
            authors: 'Antman EM, Morrow DA, McCabe CH, et al. (ExTRACT-TIMI 25 Investigators)',
            title: 'Enoxaparin versus Unfractionated Heparin with Fibrinolysis for ST-Elevation Myocardial Infarction',
            journal: 'New England Journal of Medicine',
            year: 2006,
            note: 'STEMI fibrinolizinde <75 yaş (30 mg IV + 1 mg/kg SC) vs ≥75 yaş (IV bolus yok, 0,75 mg/kg SC) protokolünü kanıtlayan landmark RKÇ.',
          },
          {
            authors: 'Ferguson JJ, Califf RM, Antman EM, et al. (SYNERGY Trial Investigators)',
            title: 'Enoxaparin vs Unfractionated Heparin in High-Risk Patients With Non-ST-Segment Elevation Acute Coronary Syndromes Managed With an Intended Early Invasive Strategy',
            journal: 'JAMA',
            year: 2004,
            note: 'NSTE-ACS PCI’sında Enoksaparin ile UFH arasında çapraz geçişin (stacking) majör kanamayı artırdığını gösteren çalışma.',
          },
          {
            authors: 'Byrne RA, Rossello X, Coughlan JJ, et al. (ESC Task Force)',
            title: '2023 ESC Guidelines for the management of acute coronary syndromes',
            journal: 'European Heart Journal',
            year: 2023,
            note: 'AKS’de Enoksaparin dozları, PCI ek 0,3 mg/kg IV kuralı ve CrCl <30 uyarlamaları.',
          },
          {
            authors: 'Garcia DA, Baglin TP, Weitz JI, Samama MM (ACCP / CHEST)',
            title: 'Parenteral Anticoagulants: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed',
            journal: 'CHEST',
            year: 2012,
            note: 'DMAH renal klirensi, obezite 4. saat pik Anti-Xa izlemi, gebelik ve Protamin ~%60 kısmi nötralizasyon kılavuzu.',
          },
        ]}
      />

      {/* Alt Bilgi Şeridi */}
      <div className={`flex items-center justify-between text-[11px] px-2 ${mutedText}`}>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          ASRA 2018 · ESAIC 2022 · ExTRACT-TIMI 25 · SYNERGY · ESC 2023 · CHEST ile Uyumlu
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          Antitrombotik · DMAH (Enoksaparin)
        </span>
      </div>
    </div>
  );
};
