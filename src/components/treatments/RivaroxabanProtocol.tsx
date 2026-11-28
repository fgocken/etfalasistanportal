import React, { useMemo, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  GitCompare,
  Scissors,
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
  MonographAccordionSection,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
  useMonographAccordion,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART2 } from '../../data/organImpairment/standaloneOrganPart2';

interface RivaroxabanProtocolProps {
  isDark: boolean;
}

type CalcTab = 'dosing' | 'periop' | 'reversal' | 'compare';
type IndicationKey = 'nvaf' | 'vte_acute' | 'vte_ext' | 'compass_cad_pad' | 'ortho_prophylaxis';
type RenalBand = 'ge50' | '30_49' | '15_29' | 'lt15_hd';
type SurgeryRisk = 'minimal' | 'low_mod' | 'high' | 'neuraxial';
type NeuraxialDoseMode = 'therapeutic' | 'prophylactic_10' | 'vascular_25';

export const RivaroxabanProtocol: React.FC<RivaroxabanProtocolProps> = ({ isDark }) => {
  const [admeOpen, setAdmeOpen] = useMonographAccordion('riv-pk', false);
  const [activeTab, setActiveTab] = useState<CalcTab>('dosing');

  // Tab 1: Endikasyon & CrCl Doz Hesaplayıcı
  const [indication, setIndication] = useState<IndicationKey>('nvaf');
  const [renalBand, setRenalBand] = useState<RenalBand>('ge50');
  const [strongDualInhibitor, setStrongDualInhibitor] = useState<boolean>(false);

  // Tab 2: PAUSE & ASRA/ESAIC Nöraksiyel
  const [surgeryRisk, setSurgeryRisk] = useState<SurgeryRisk>('high');
  const [periopRenal, setPeriopRenal] = useState<'ge30' | '15_29'>('ge30');
  const [neuraxialDoseMode, setNeuraxialDoseMode] = useState<NeuraxialDoseMode>('therapeutic');

  // Tab 3: Kanama Reversal
  const [bleedWeightKg, setBleedWeightKg] = useState<number>(75);
  const [lastDoseMg, setLastDoseMg] = useState<number>(20);
  const [hoursSinceDose, setHoursSinceDose] = useState<number>(4);

  const quickNavItems = [
    { id: 'riv-high-alert', label: 'High-Alert' },
    { id: 'riv-summary', label: 'Özet' },
    { id: 'riv-moa', label: 'Etki Mekanizması' },
    { id: 'riv-pk', label: 'ADME' },
    { id: 'riv-contra', label: 'Kontrendikasyon' },
    { id: 'riv-indications', label: '5 Doz Rejimi' },
    { id: 'riv-calc', label: 'Hesaplayıcı' },
    { id: 'riv-tr', label: 'TR Preparat' },
    { id: 'riv-line', label: 'Uygulama' },
    { id: 'riv-organ', label: 'Böbrek / KC' },
    { id: 'riv-geriatrics', label: 'Geriatri / Obezite' },
    { id: 'riv-preg', label: 'Gebelik' },
    { id: 'riv-adverse', label: 'Yan Etkiler' },
    { id: 'riv-cautions', label: 'Özel Durumlar' },
    { id: 'riv-deep-pd', label: 'Derin PD' },
    { id: 'riv-refs', label: 'Etkileşim & Kaynak' },
  ];

  // Tab 1 Hesaplaması
  const doseCalc = useMemo(() => {
    if (strongDualInhibitor) {
      return {
        tone: 'rose' as const,
        doseHeadline: 'KONTRENDİKE / KULLANMAYIN! (Güçlü Çift CYP3A4 + P-gp İnhibitörü)',
        foodRule: 'UYGULAMAYIN',
        detail:
          'Ketokonazol, İtrakonazol, Vorikonazol, Posakonazol ve Ritonavir/Nirmatrelvir (Paxlovid®) Rivaroksaban plazma düzeyini ~2,5 kat artırır → FDA & EMA tarafından eşzamanlı kullanım KESİNLİKLE ÖNERİLMEZ / KONTRENDİKE!',
        note: 'Alternatif: Kısa süreli kürde (ör. Paxlovid®) geçici DMAH köprüsü veya etkileşimsiz ajan seçin.',
      };
    }

    if (renalBand === 'lt15_hd') {
      return {
        tone: 'rose' as const,
        doseHeadline: 'KAÇININ / ÖNERİLMEZ (CrCl <15 mL/dk · Hemodiyaliz)',
        foodRule: 'UYGULAMAYIN → UFH / Varfarin (veya FDA NVAF’de Apiksaban)',
        detail:
          'EMA/TİTCK KÜB CrCl <15 mL/dk ve diyalizde Rivaroksabanı önermemektedir! Plazma protein bağlanması %92–95 olduğundan hemodiyalizle TEMİZLENMEZ ve birikerek majör kanamaya yol açar.',
        note: 'Mekanik kapak + diyalizde Varfarin; akut YBÜ/ESRD’de Standart Heparin (UFH) tercih edilir.',
      };
    }

    if (indication === 'nvaf') {
      const reduced = renalBand === '30_49' || renalBand === '15_29';
      return {
        tone: renalBand === '15_29' ? 'amber' : 'emerald',
        doseHeadline: reduced ? '15 mg PO q24sa (Renal İndirgenmiş NVAF Dozu)' : '20 mg PO q24sa (Standart NVAF Dozu — ROCKET-AF)',
        foodRule: '🍽️ ZORUNLU: AKŞAM YEMEĞİ İLE BİRLİKTE ALINIR! (Aç alınırsa emilim %66’ya düşer!)',
        detail: reduced
          ? `CrCl <50 mL/dk (${renalBand === '15_29' ? '15–29 mL/dk — çok dikkatli kullanım!' : '30–49 mL/dk'}) → doğrudan 15 mg PO q24sa! (Apiksaban’daki gibi yaş/kilo ABC kuralı yoktur; tek kriter CrCl <50’dir).`
          : 'CrCl ≥50 mL/dk → tam 20 mg PO günde TEK doz (akşam yemeğiyle).',
        note: 'Mekanik kalp kapağı, orta-ağır mitral darlığı veya üçlü pozitif APS’de KONTRENDİKEDİR!',
      };
    }

    if (indication === 'vte_acute') {
      return {
        tone: renalBand === '15_29' ? 'amber' : 'emerald',
        doseHeadline: 'İlk 21 Gün: 15 mg PO q12sa → 22. Günden İtibaren: 20 mg PO q24sa',
        foodRule: '🍽️ ZORUNLU: HER İKİ FAZDA DA (15 mg ve 20 mg) YEMEKLE BİRLİKTE ALINIR!',
        detail:
          renalBand === '15_29'
            ? 'EMA KÜB (CrCl 15–29 mL/dk): İlk 21 gün 15 mg q12sa; 22. günden itibaren kanama riski tromboz riskinden ağır basıyorsa 15 mg q24sa düşünülebilir (FDA ise CrCl <30’da akut VTE’de kaçınılmasını önerir — çok yakın izlem veya UFH/Apiksaban!).'
            : 'EINSTEIN-DVT & EINSTEIN-PE: Parenteral heparin/DMAH ön tedavisi GEREKMEZ! 21 günlük yükleme bittiğinde mutlaka 20 mg günde tek doza geçilmelidir.',
        note: 'Hemodinamik instabil masif PE (tromboliz adayı) veya aktif kanayan üst GİS tümöründe DMAH/UFH seçin!',
      };
    }

    if (indication === 'vte_ext') {
      return {
        tone: renalBand === '15_29' ? 'amber' : 'teal',
        doseHeadline: '10 mg PO q24sa (EINSTEIN-CHOICE · ≥6 Ay Tedavi Sonrası)',
        foodRule: 'Aç veya tok alınabilir (10 mg formda yemek zorunluluğu yoktur)',
        detail:
          'İlk ≥6 aylık akut DVT/PE tedavisini tamamlayan ve nüks riski devam eden hastalarda 10 mg q24sa, Aspirin 100 mg’a göre tekrarlayan VTE’yi %74 azaltır (majör kanama %0,4 vs %0,3).',
        note: 'Çok yüksek nüks riskli (ör. aktif kanser, tekrarlı VTE) hastalarda 20 mg q24sa ile devam edilebilir.',
      };
    }

    if (indication === 'compass_cad_pad') {
      return {
        tone: renalBand === '15_29' ? 'amber' : 'teal',
        doseHeadline: '2,5 mg PO q12sa + Aspirin 75–100 mg q24sa (COMPASS / VOYAGER-PAD)',
        foodRule: 'Aç veya tok alınabilir (2,5 mg formda yemek şartı yoktur)',
        detail:
          'Kronik KAH / PAH ve alt ekstremite revaskülarizasyonu sonrası "Dual Pathway Inhibition" rejimi: MACE’i %24, inmeyi %42, majör amputasyonu %70 azaltır (COMPASS, NEJM 2017)!',
        note: 'DİKKAT: Bu 2,5 mg q12sa vasküler doz Atriyal Fibrilasyon veya VTE koruması SAĞLAMAZ! Aktif yüksek kanama riski veya son 1 ayda hemorajik/laküner inmede verilmez.',
      };
    }

    // Ortopedik Profilaksi
    return {
      tone: renalBand === '15_29' ? 'amber' : 'emerald',
      doseHeadline: '10 mg PO q24sa (Postop 6–10. Saatte Başla — RECORD 1–4)',
      foodRule: 'Aç veya tok alınabilir (10 mg formda yemek şartı yoktur)',
      detail:
        'Elektif total diz protezinde 12–14 gün, total kalça protezinde 35 gün boyunca 10 mg PO q24sa. İlk doz cerrahi hemostaz sağlandıktan 6–10 saat sonra verilir.',
      note:
        renalBand === '15_29'
          ? 'FDA CrCl <30’da ortopedik profilakside kaçınmayı önerir; EMA çok dikkatli kullanım der.'
          : 'Epidural kateter varsa çekiminden en az 6 saat sonra başlanır.',
    };
  }, [indication, renalBand, strongDualInhibitor]);

  // Tab 2: PAUSE & Nöraksiyel Hesaplaması
  const periopCalc = useMemo(() => {
    if (surgeryRisk === 'minimal') {
      return {
        tone: 'emerald' as const,
        holdText: 'KESMEYİN veya işlem günü 1 doz atlayın!',
        restartText: 'Hemostaz sağlanınca aynı akşam / ertesi gün yemekle devam.',
        detail: 'CHEST 2022: Basit diş çekimi, katarakt, yüzeyel dermatolojide genellikle kesilmez. Köprüleme YAPILMAZ!',
      };
    }
    if (surgeryRisk === 'neuraxial') {
      if (neuraxialDoseMode === 'prophylactic_10') {
        return {
          tone: 'amber' as const,
          holdText:
            periopRenal === '15_29'
              ? 'PROFİLAKSİ (10 mg q24sa · CrCl 15–29): ESAIC 30–36 sa · ASRA 72 sa!'
              : 'PROFİLAKSİ (10 mg q24sa · CrCl ≥30): ESAIC 2022: 24 saat · ASRA 2018: 72 saat!',
          restartText: 'Blok veya kateter çekiminden EN AZ 6 saat (ESAIC: 6–8 sa) sonra yeniden başla.',
          detail:
            'ESAIC/ESRA 2022 düşük doz 10 mg q24sa profilaksi için 24 saat, ASRA 2018 ise daha muhafazakâr 72 saat önerir; klinik risk ve böbrek fonksiyonuna göre karar verin.',
        };
      }
      if (neuraxialDoseMode === 'vascular_25') {
        return {
          tone: 'amber' as const,
          holdText:
            periopRenal === '15_29'
              ? 'VASKÜLER DOZ (2,5 mg q12sa · CrCl 15–29): ESAIC 30 saat!'
              : 'VASKÜLER DOZ (2,5 mg q12sa · CrCl ≥30): ESAIC 2022: 24 saat!',
          restartText: 'Kateter çekiminden ≥6 saat sonra yeniden başla (eşzamanlı Aspirin kesilmez).',
          detail: 'COMPASS 2,5 mg q12sa düşük vasküler doz için ESAIC 2022 24 saatlik (CrCl <30’da 30 sa) bekleme tanımlar.',
        };
      }
      return {
        tone: 'rose' as const,
        holdText: 'TERAPÖTİK DOZ (15–20 mg): NÖRAKSİYEL BLOK ÖNCESİ EN AZ 72 SAAT (3 TAM GÜN) KES!',
        restartText: 'Blok / kateter çekiminden EN AZ 6–8 saat sonra başla · Kalıcı epidural kateter YASAK!',
        detail:
          'ASRA 2018 & ESAIC 2022 ortak kuralı: Terapötik Rivaroksabanda spinal/epidural öncesi ≥72 saat beklenir (CrCl <30’da daha uzun veya Rivaroksaban-kalibreli Anti-Xa <30 ng/mL doğrula!). Normal PT terapötik düzeyi DIŞLAMAZ!',
      };
    }

    if (surgeryRisk === 'high') {
      const days = periopRenal === '15_29' ? '3 tam gün (≥72 saat)' : '2 tam gün (≥48 saat — PAUSE Protokolü)';
      return {
        tone: 'amber' as const,
        holdText: `YÜKSEK KANAMA RİSKLİ CERRAHİ: Cerrahiden ${days} önce kes (KÖPRÜLEME YOK!)`,
        restartText: 'Postop tam cerrahi hemostaz sağlanınca 48–72. saatte yeniden başla.',
        detail:
          'PAUSE Trial (JAMA Intern Med 2019): 2 tam gün kesme (ameliyattan 3 gün önce son doz) ile perioperatif köprüleme olmadan <%1–2 majör kanama ve çok düşük tromboemboli!',
      };
    }

    const days = periopRenal === '15_29' ? '2 tam gün (≥48 saat)' : '1 tam gün (≥24–36 saat — PAUSE Protokolü)';
    return {
      tone: 'teal' as const,
      holdText: `DÜŞÜK-ORTA KANAMA RİSKLİ CERRAHİ: Cerrahiden ${days} önce kes (KÖPRÜLEME YOK!)`,
      restartText: 'Postop 24. saatte (hemostaz sağlanınca) olağan dozda yemekle yeniden başla.',
      detail: 'Kısa yarı ömür nedeniyle perioperatif DMAH/UFH köprülemesi KESİNLİKLE YAPILMAZ!',
    };
  }, [surgeryRisk, periopRenal, neuraxialDoseMode]);

  // Tab 3: Kanama Reversal
  const reversalCalc = useMemo(() => {
    const w = Math.max(35, Math.min(180, bleedWeightKg || 75));
    const pccIu = Math.min(5000, Math.round((Math.min(w, 100) * 50) / 50) * 50);
    const pccVials = Math.ceil(pccIu / 500);
    const highDoseAndexanet = lastDoseMg > 10 && hoursSinceDose < 8;
    const charcoalEligible = hoursSinceDose <= 4;

    return {
      pccIu,
      pccVials,
      charcoalEligible,
      andexanetRegimen: highDoseAndexanet
        ? 'Yüksek Doz Andeksanet Alfa: 800 mg IV bolus (30 mg/dk) → 8 mg/dk × 120 dk (960 mg infüzyon)'
        : 'Düşük Doz Andeksanet Alfa: 400 mg IV bolus (30 mg/dk) → 4 mg/dk × 120 dk (480 mg infüzyon)',
    };
  }, [bleedWeightKg, lastDoseMg, hoursSinceDose]);

  const buildOrderText = () => {
    return [
      `RİVAROKSABAN (Xarelto®) KLİNİK ORDER ÖZETİ`,
      `Endikasyon: ${indication} | Böbrek: ${renalBand}`,
      `Doz: ${doseCalc.doseHeadline}`,
      `Besin Kuralı: ${doseCalc.foodRule}`,
      `Perioperatif (PAUSE): ${periopCalc.holdText}`,
      `Acil Kanama (ACC 2020): Protamin & K1 %0 ETKİSİZ! 4F-PCC ${reversalCalc.pccIu} IU (50 IU/kg · ~${reversalCalc.pccVials}×500 IU flakon) veya Andeksanet + TXA 1 g IV.`,
    ].join('\n');
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. HIZLI NAVİGASYON + TÜMÜNÜ AÇ / KAPAT */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. ISMP HIGH-ALERT GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="riv-high-alert"
        tallManName="RIVAROXABAN (Xarelto®)"
        confusionRiskWith="Apiksaban (Eliquis®) · 2,5 / 10 / 15 / 20 mg 4 Farklı Güç!"
        criticalAlerts={[
          '15 mg VE 20 mg MUTLAKA YEMEKLE ALINMALIDIR! Aç alındığında biyoyararlanım %66’ya (AUC −%39) düşer ve önlenebilir iskemik inme / PE nüksüne yol açar! (2,5 mg ve 10 mg aç veya tok alınabilir).',
          '4 FARKLI DOZ GÜCÜ KARIŞMA TUZAĞI: 2,5 mg q12sa (COMPASS vasküler) · 10 mg q24sa (ortopedi / uzatılmış VTE) · 15 mg q12sa × 21 gün (akut DVT/PE yükleme) · 15–20 mg q24sa (NVAF/VTE idame)! 2,5 mg vasküler doz AF veya VTE koruması SAĞLAMAZ!',
          'Jejunostomi / Roux-en-Y Gastrik Bypass TUZAĞI: Rivaroksaban ağırlıklı olarak mide ve proksimal ince bağırsaktan emilir — distal beslenme tüpünden (jejunostomi) veya gastrik bypass sonrası emilimi ciddi oranda çöker (KULLANMAYIN!).',
          'MEKANİK KAPAK, MİTRAL DARLIK & ÜÇLÜ POZİTİF APS’DE MUTLAK KONTRENDİKE: Bu üç grupta kesinlikle Varfarin kullanılır!',
          'PROTAMİN & K1 VİTAMİNİ %0 ETKİSİZDİR! Majör kanamada Andeksanet Alfa (varsa) veya TR 1. basamak 4-Faktör PCC (50 IU/kg IV, maks 5.000 IU veya sabit 2.000 IU) + TXA 1 g IV verin; Hemodiyalizle TEMİZLENMEZ (%92–95 protein bağlı)!',
        ]}
        antidoteOrRescue="YAŞAMI TEHDİT EDEN KANAMA (ACC 2020): (1) İlacı kes, mekanik/cerrahi hemostaz + TXA 1 g IV + son doz ≤2–4 saat ise 50 g Aktif Kömür PO/NG; (2) Spesifik Antidot: Andeksanet Alfa (≤10 mg veya ≥8 sa: düşük doz 400 mg IV → 480 mg/2 sa; >10 mg ve <8 sa: yüksek doz 800 mg IV → 960 mg/2 sa); (3) TR 1. Basamak Kurtarma: 4-Faktör PCC (Cofact® / Octaplex® / Beriplex®) 50 IU/kg IV (maks 5.000 IU; alternatif sabit 2.000 IU). PROTAMİN, K1 VİTAMİNİ VE HEMODİYALİZ ETKİSİZDİR!"
      />

      {/* 3. KİMLİK & HIZLI ÖZET KARTI (DAİMA AÇIK) */}
      <section
        id="riv-summary"
        className={`rounded-2xl border p-5 sm:p-6 scroll-mt-20 ${
          isDark
            ? 'border-rose-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/25'
            : 'border-rose-200 bg-gradient-to-br from-white via-white to-rose-50/50'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-lg border px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase ${
              isDark
                ? 'border-rose-500/40 bg-rose-950/60 text-rose-300'
                : 'border-rose-300 bg-rose-100 text-rose-900'
            }`}
          >
            Antitrombotik · Oral Direkt Faktör Xa İnhibitörü (DOAC / NOAC)
          </span>
          <span
            className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] font-semibold ${
              isDark ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
            }`}
          >
            ATC: B01AF01
          </span>
          <span
            className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] font-bold ${
              isDark
                ? 'border-amber-500/40 bg-amber-950/50 text-amber-300'
                : 'border-amber-200 bg-amber-50 text-amber-900'
            }`}
          >
            15 &amp; 20 mg: YEMEKLE ZORUNLU!
          </span>
        </div>

        <h2 className={`mt-2 text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Rivaroksaban{' '}
          <span className={`font-semibold text-base sm:text-lg ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
            (Xarelto® 2,5 · 10 · 15 · 20 mg)
          </span>
        </h2>

        <p className={`mt-1.5 max-w-4xl text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Antitrombin-III’ten bağımsız olarak hem serbest hem pıhtıya bağlı <strong>Faktör Xa</strong>’yı doğrudan ve
          tersinir inhibe eden, idame tedavisinde <strong>günde tek doz (q24sa)</strong> alınabilen ilk oral direkt FXa
          inhibitörüdür. NVAF (<strong>ROCKET-AF</strong>), akut DVT/PE (<strong>EINSTEIN</strong>) ve ortopedik
          profilaksiye ek olarak <strong>COMPASS / VOYAGER-PAD</strong> ile düşük vasküler dozda (
          <code className="font-mono">2,5 mg q12sa + Aspirin</code>) kronik KAH ve PAH hastalarında ekstremite ve
          kardiyovasküler olayları azaltan tek DOAC’tır.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            {
              label: 'NVAF (ROCKET-AF)',
              value: '20 mg q24sa · CrCl <50: 15 mg',
              sub: '🍽️ YEMEKLE ZORUNLU (akşam)!',
              tone: isDark ? 'border-rose-500/30 bg-rose-950/30 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-900',
            },
            {
              label: 'Akut DVT/PE (EINSTEIN)',
              value: '15 mg q12sa × 21g → 20 mg',
              sub: '21 gün yükleme · Uzatma 10 mg q24sa',
              tone: isDark ? 'border-sky-500/30 bg-sky-950/30 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-900',
            },
            {
              label: 'KAH / PAH (COMPASS)',
              value: '2,5 mg q12sa + ASA 100',
              sub: 'Dual Pathway · AF/VTE korumaz!',
              tone: isDark ? 'border-teal-500/30 bg-teal-950/30 text-teal-200' : 'border-teal-200 bg-teal-50 text-teal-900',
            },
            {
              label: 'PAUSE · ASRA · Reversal',
              value: 'Cerrahi 1–2g · Blok 72 sa',
              sub: '4F-PCC 50 IU/kg / Andeksanet',
              tone: isDark ? 'border-amber-500/30 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-900',
            },
          ].map((kpi) => (
            <div key={kpi.label} className={`rounded-xl border p-3 ${kpi.tone}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{kpi.label}</p>
              <p className="mt-0.5 font-mono text-xs sm:text-sm font-black">{kpi.value}</p>
              <p className="mt-0.5 text-[11px] opacity-85">{kpi.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ETKİ MEKANİZMASI (AKORDİYON) */}
      <MechanismOfActionBlock
        isDark={isDark}
        sectionId="riv-moa"
        summary="Rivaroksaban, koagülasyon kaskadının ortak kavşağındaki Faktör Xa’nın (FXa) aktif serin proteaz merkezine Antitrombin-III’e ihtiyaç duymadan doğrudan, yarışmalı ve tersinir olarak bağlanır (Ki = 0,4 nM; trombine göre >10.000 kat selektif). Hem serbest FXa’yı hem de pıhtıya/protrombinaz kompleksine bağlı FXa’yı bloke ederek yeni trombin üretimini hızla susturur."
        pillars={[
          {
            title: '1. Direkt & AT-III Bağımsız FXa İnhibisyonu',
            detail:
              'Serbest FXa, protrombinaz kompleksi içindeki FXa ve fibrin pıhtısına bağlı FXa’yı doğrudan inhibe eder; trombin (FIIa) üzerinde direkt etkisi yoktur.',
          },
          {
            title: '2. Dual Pathway Inhibition (COMPASS · 2,5 mg q12sa)',
            detail:
              'Düşük doz Rivaroksaban (FXa → trombin PAR-1 aktivasyonunu baskılar) + Aspirin (COX-1/TXA₂ blokajı) birleşerek aterotrombotik plak rüptüründe hem trombosit hem koagülasyon yolunu sinerjistik susturur.',
          },
          {
            title: '3. Hızlı Pik & Günde Tek Doz Farmakodinamik Etki',
            detail:
              'Oral alımdan 2–4 saat sonra pik anti-Xa düzeyine ulaşır; kısa plazma yarı ömrüne (5–9 sa) rağmen protrombinaz baskılanması 24 saat sürdüğünden idamede q24sa verilebilir.',
          },
        ]}
      />

      {/* 5. FARMAKOKİNETİK (ADME) AKORDİYONU */}
      <section
        id="riv-pk"
        className={`overflow-hidden rounded-2xl border transition-all scroll-mt-20 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <button
          type="button"
          onClick={() => setAdmeOpen((prev) => !prev)}
          aria-expanded={admeOpen}
          className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left transition-colors ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50/90'
          }`}
        >
          <div className="flex items-center gap-3">
            <Clock className={`h-5 w-5 shrink-0 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
            <div>
              <h3 className={`text-sm sm:text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Farmakokinetik (ADME) &amp; Yemek Bağımlılığı Biyofiziği
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                15–20 mg tok %80–100 (aç %66!) · Tmax 2–4 sa · Protein %92–95 · %36 aktif renal · t½ 5–9 sa (yaşlı 11–13 sa)
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`hidden sm:inline-flex rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {admeOpen ? 'Gizle' : 'Aç'}
            </span>
            {admeOpen ? (
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            )}
          </div>
        </button>

        {admeOpen && (
          <div className={`border-t p-5 sm:p-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Emilim (Absorption)',
                  value: '15–20 mg: TOK %80–100 (AÇ %66!)',
                  detail:
                    'Zayıf suda çözünürlüğü nedeniyle 15 mg ve 20 mg tabletler yemekle (yağ/safra/mide kalış süresi) alındığında AUC %39 artar! 2,5 mg ve 10 mg aç/tok alınabilir. Proksimal GİS (mide/duodenum) emilimi şarttır!',
                },
                {
                  title: 'Dağılım (Distribution)',
                  value: 'Vd ~50 L · Protein %92–95',
                  detail:
                    'Albümine %92–95 oranında sıkı bağlandığı için HEMODİYALİZLE TEMİZLENMEZ! Plasentayı geçer ve anne sütüne geçer.',
                },
                {
                  title: 'Metabolizma (Metabolism)',
                  value: 'CYP3A4 / CYP2J2 + P-gp / BCRP',
                  detail:
                    'Alınan dozun ~2/3’ü CYP3A4, CYP2J2 ve CYP-bağımsız hidrolizle inaktif metabolitlere çevrilir (yarısı idrar, yarısı feçes). Aktif metaboliti yoktur.',
                },
                {
                  title: 'Eliminasyon (Excretion)',
                  value: '%36 Aktif Renal · t½ 5–9 sa (Yaşlı 11–13 sa)',
                  detail:
                    'Dozun ~%36’sı değişmeden aktif ilaç olarak P-gp/BCRP aracılı renal tübüler sekresyonla atılır! Bu nedenle CrCl <50 mL/dk’da NVAF dozu 20 mg’dan 15 mg’a düşürülür.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`rounded-xl border p-3.5 ${
                    isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                  }`}
                >
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {card.title}
                  </p>
                  <p className={`mt-1 font-mono text-sm font-bold ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                    {card.value}
                  </p>
                  <p className={`mt-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 6. MUTLAK VE RELATİF KONTRENDİKASYONLAR */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="riv-contra"
        absoluteItems={[
          'Mekanik protez kalp kapağı ve orta-ağır romatizmal mitral darlığı — TÜM DOAC’LAR KONTRENDİKE (Varfarin kullanın)!',
          'Yüksek riskli / Üçlü pozitif Antifosfolipid Sendromu (APS — TRAPS çalışması Rivaroksaban kolunda arteriyel tromboz nedeniyle erken durduruldu!) → Varfarin altın standart!',
          'Aktif patolojik majör kanama (intrakraniyal, GİS, retroperitoneal, cerrahi alan).',
          'Orta veya ağır karaciğer yetmezliği (Child-Pugh B ve C! — Apiksaban’dan daha katı: EMA & FDA Child-Pugh B’de de KAÇININ/KONTRENDİKE der!).',
          'Güçlü çift CYP3A4 + P-gp inhibitörleri (Ketokonazol, İtrakonazol, Vorikonazol, Ritonavir/Paxlovid®) ile eşzamanlı kullanım.',
          'Gebelik ve laktasyon (plasentayı ve anne sütünü geçer — DMAH / postpartum Varfarin seçin).',
        ]}
        relativeItems={[
          'Ağır KBY (CrCl <15 mL/dk) ve Hemodiyaliz (EMA/TİTCK önermez; hemodiyalizle temizlenmez!).',
          'Güçlü çift CYP3A4 + P-gp indükleyicileri (Rifampisin, Karbamazepin, Fenitoin, Sarı Kantaron) — AUC %50 çöker, tromboz riski!',
          'Üst GİS / özofagogastrik / ürotelyal aktif mukozal kanserler (SELECT-D: GİS kanaması Apiksaban/DMAH’tan yüksek!).',
          'Roux-en-Y gastrik bypass veya jejunostomi beslenmesi (proksimal mide emilimi bozulur → emilim yetersizliği!).',
          'TAVI sonrası sinüs ritminde rutin profilaksi (GALILEO çalışması artmış kanama/ölüm nedeniyle erken durduruldu — yalnızca ayrı OAC endikasyonu varsa!).',
        ]}
        clinicalNote="TRAPS çalışması (Blood 2018) üçlü pozitif APS’de Rivaroksabanın Varfarine kıyasla arteriyel tromboz (inme/MI) oranını belirgin artırdığını göstermiştir — APS’de kesinlikle Varfarin kullanılır!"
      />

      {/* 7. 5 KLİNİK ENDİKASYON VE DOZ REJİMİ (AKORDİYON) */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="riv-indications"
        eyebrow="ROCKET-AF · EINSTEIN · COMPASS · VOYAGER-PAD · RECORD"
        title="5 Klinik Endikasyon ve Doz Rejimi (Doz Karışıklığı Önleme Tablosu)"
        subtitle="NVAF 20/15 mg · Akut VTE 15 mg q12sa × 21g → 20 mg · Uzatma 10 mg · COMPASS 2,5 mg q12sa + ASA · Ortopedi 10 mg"
        icon={<Syringe className={`h-5 w-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />}
        badge={
          <span
            className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
              isDark ? 'border-rose-500/30 bg-rose-950/40 text-rose-300' : 'border-rose-200 bg-rose-50 text-rose-700'
            }`}
          >
            5 Endikasyon
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {[
            {
              title: '1. Non-Valvüler Atriyal Fibrilasyon — NVAF (ROCKET-AF)',
              badge: 'CrCl ≥50: 20 mg · 15–49: 15 mg q24sa (TOK!)',
              lines: [
                'CrCl ≥50 mL/dk: 20 mg PO günde 1 kez (akşam YEMEKLE!).',
                'CrCl 15–49 mL/dk: 15 mg PO günde 1 kez (akşam YEMEKLE!). (Yaş/kilo ABC kuralı yoktur; tek azaltım kriteri CrCl <50’dir!).',
                'ROCKET-AF: Varfarine eşdeğer inme koruması, %33 daha az intrakraniyal kanama; ancak GİS kanaması Varfarinden hafif yüksektir (%3,2 vs %2,2).',
              ],
            },
            {
              title: '2. Akut DVT ve Pulmoner Emboli Tedavisi (EINSTEIN-DVT / PE)',
              badge: '15 mg q12sa × 21g → 20 mg q24sa (TOK!)',
              lines: [
                'İlk 21 Gün (3 Hafta): 15 mg PO q12sa (YEMEKLE!) — parenteral heparin ön tedavisi YOK!',
                '22. Günden İtibaren: 20 mg PO q24sa (YEMEKLE!).',
                'EMA notu: CrCl 15–49 mL/dk ve kanama riski yüksek hastada 22. günden itibaren 15 mg q24sa değerlendirilebilir (FDA CrCl <30’da akut VTE’de kaçının der).',
              ],
            },
            {
              title: '3. Uzatılmış VTE Sekonder Profilaksisi (EINSTEIN-CHOICE)',
              badge: '10 mg PO q24sa (Aç/Tok · ≥6 Ay Sonrası)',
              lines: [
                'İlk ≥6 aylık tedaviyi tamamlayan hastalarda 10 mg PO q24sa (aç veya tok alınabilir).',
                'Aspirin 100 mg’a göre tekrarlayan VTE’yi %74 azaltırken majör kanamayı artırmadı (%0,4 vs %0,3).',
              ],
            },
            {
              title: '4. Kronik KAH / PAH & Revaskülarizasyon (COMPASS / VOYAGER-PAD)',
              badge: '2,5 mg PO q12sa + Aspirin 75–100 mg',
              lines: [
                'Stabil KAH veya semptomatik PAH (veya alt ekstremite revaskülarizasyonu sonrası): 2,5 mg PO q12sa (aç/tok) + Aspirin 75–100 mg/gün.',
                'COMPASS (NEJM 2017): MACE −%24, inme −%42, majör amputasyon −%70, KV mortalite −%22!',
                'UYARI: Bu 2,5 mg vasküler doz AF veya VTE için KESİNLİKLE YETERLİ DEĞİLDİR!',
              ],
            },
            {
              title: '5. Ortopedik & Medikal VTE Profilaksisi (RECORD 1–4 / MARINER)',
              badge: '10 mg PO q24sa (Postop 6–10 sa · Aç/Tok)',
              lines: [
                'Elektif diz protezi (12–14 gün) & kalça protezi (35 gün): 10 mg PO q24sa, ilk doz cerrahi hemostazdan 6–10 saat sonra.',
                'Yüksek VTE riskli / düşük kanama riskli akut dahili hastane hastalarında (FDA): 10 mg PO q24sa × 31–39 gün.',
              ],
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border p-4 ${
                isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.title}</h4>
                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-bold ${
                    isDark ? 'border-rose-500/30 bg-rose-950/50 text-rose-300' : 'border-rose-200 bg-rose-50 text-rose-800'
                  }`}
                >
                  {card.badge}
                </span>
              </div>
              <ul className={`mt-2.5 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {card.lines.map((ln, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-rose-400' : 'bg-rose-600'}`} />
                    <span>{ln}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MonographAccordionSection>

      {/* 8. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI (AKORDİYON) */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="riv-calc"
        title="Etkileşimli Rivaroksaban Hesaplayıcı: CrCl Doz, PAUSE & Kanama Reversal"
        subtitle="5 Endikasyon + Yemek Kuralı · PAUSE & ASRA/ESAIC Nöraksiyel · 4F-PCC / Andeksanet · Rivaroksaban vs Apiksaban"
        icon={
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              isDark ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-100 text-rose-700'
            }`}
          >
            <Calculator className="h-5 w-5" />
          </div>
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 'dosing', label: '1. Endikasyon & CrCl Doz', icon: Syringe },
                { id: 'periop', label: '2. PAUSE & Nöraksiyel', icon: Scissors },
                { id: 'reversal', label: '3. Kanama Reversal', icon: AlertOctagon },
                { id: 'compare', label: '4. Rivaroksaban vs Apiksaban', icon: GitCompare },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors ${
                    active
                      ? 'border-rose-600 bg-rose-600 text-white shadow-xs'
                      : isDark
                        ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <MonographCopyButton isDark={isDark} getText={buildOrderText} label="Order Kopyala" />
        </div>

        {/* TAB 1: ENDİKASYON & CrCl DOZ */}
        {activeTab === 'dosing' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Klinik Endikasyon
                </label>
                <select
                  value={indication}
                  onChange={(e) => setIndication(e.target.value as IndicationKey)}
                  className={`mt-2 w-full rounded-lg border px-2.5 py-2 text-xs font-semibold ${
                    isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                  }`}
                >
                  <option value="nvaf">Non-Valvüler Atriyal Fibrilasyon — NVAF (ROCKET-AF)</option>
                  <option value="vte_acute">Akut DVT / Pulmoner Emboli (EINSTEIN · 21g Yükleme)</option>
                  <option value="vte_ext">Uzatılmış VTE Sekonder Profilaksisi (EINSTEIN-CHOICE)</option>
                  <option value="compass_cad_pad">Kronik KAH / PAH Vasküler Koruma (COMPASS / VOYAGER)</option>
                  <option value="ortho_prophylaxis">Ortopedik Protez VTE Profilaksisi (RECORD)</option>
                </select>
                <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-300">
                  <input
                    type="checkbox"
                    checked={strongDualInhibitor}
                    onChange={(e) => setStrongDualInhibitor(e.target.checked)}
                    className="rounded border-slate-400"
                  />
                  <span>Güçlü Çift CYP3A4 + P-gp İnhibitörü (Ketokonazol / Ritonavir / Paxlovid®)</span>
                </label>
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Böbrek Fonksiyonu (Cockcroft-Gault CrCl)
                </span>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {(
                    [
                      { id: 'ge50', label: 'CrCl ≥50 mL/dk' },
                      { id: '30_49', label: 'CrCl 30–49 mL/dk' },
                      { id: '15_29', label: 'CrCl 15–29 mL/dk' },
                      { id: 'lt15_hd', label: 'CrCl <15 / Diyaliz' },
                    ] as const
                  ).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRenalBand(r.id)}
                      className={`cursor-pointer rounded-lg border py-2 text-xs font-bold ${
                        renalBand === r.id
                          ? r.id === 'lt15_hd'
                            ? 'border-rose-600 bg-rose-600 text-white'
                            : r.id === '15_29'
                              ? 'border-amber-500 bg-amber-500 text-slate-950'
                              : 'border-emerald-600 bg-emerald-600 text-white'
                          : isDark
                            ? 'border-slate-700 bg-slate-900 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2 ${
                doseCalc.tone === 'rose'
                  ? isDark
                    ? 'border-rose-500/50 bg-rose-950/30 text-rose-100'
                    : 'border-rose-300 bg-rose-50 text-rose-950'
                  : doseCalc.tone === 'amber'
                    ? isDark
                      ? 'border-amber-500/40 bg-amber-950/25 text-amber-100'
                      : 'border-amber-300 bg-amber-50 text-amber-950'
                    : doseCalc.tone === 'teal'
                      ? isDark
                        ? 'border-teal-500/40 bg-teal-950/25 text-teal-100'
                        : 'border-teal-300 bg-teal-50 text-teal-950'
                      : isDark
                        ? 'border-emerald-500/40 bg-emerald-950/25 text-emerald-100'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-950'
              }`}
            >
              <p className="font-mono text-sm font-black">{doseCalc.doseHeadline}</p>
              <p className="text-xs font-bold">{doseCalc.foodRule}</p>
              <p className="text-xs leading-relaxed">{doseCalc.detail}</p>
              <p className="text-xs opacity-90">
                <strong>Klinik Not:</strong> {doseCalc.note}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: PAUSE & NÖRAKSİYEL */}
        {activeTab === 'periop' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Cerrahi / Girişim Kategorisi
                </span>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {(
                    [
                      { id: 'minimal', label: 'Minimal (Diş/Katarakt)' },
                      { id: 'low_mod', label: 'Düşük-Orta Cerrahi' },
                      { id: 'high', label: 'Yüksek Risk Cerrahi' },
                      { id: 'neuraxial', label: 'Spinal / Epidural Blok' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSurgeryRisk(opt.id)}
                      className={`cursor-pointer rounded-lg border px-2.5 py-2 text-xs font-bold ${
                        surgeryRisk === opt.id
                          ? opt.id === 'neuraxial'
                            ? 'border-rose-600 bg-rose-600 text-white'
                            : 'border-rose-500 bg-rose-600 text-white'
                          : isDark
                            ? 'border-slate-700 bg-slate-900 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-xl border p-4 space-y-3 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Böbrek Fonksiyonu
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(
                      [
                        { id: 'ge30', label: 'CrCl ≥30 mL/dk' },
                        { id: '15_29', label: 'CrCl 15–29 mL/dk' },
                      ] as const
                    ).map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setPeriopRenal(r.id)}
                        className={`cursor-pointer rounded-lg border py-1.5 text-xs font-bold ${
                          periopRenal === r.id
                            ? 'border-rose-600 bg-rose-600 text-white'
                            : isDark
                              ? 'border-slate-700 bg-slate-900 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
                {surgeryRisk === 'neuraxial' && (
                  <div className="grid grid-cols-3 gap-1">
                    {(
                      [
                        { id: 'therapeutic', label: '15–20 mg' },
                        { id: 'prophylactic_10', label: '10 mg Prof.' },
                        { id: 'vascular_25', label: '2,5 mg q12sa' },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setNeuraxialDoseMode(m.id)}
                        className={`cursor-pointer rounded-lg border py-1 text-[11px] font-bold ${
                          neuraxialDoseMode === m.id
                            ? 'border-amber-500 bg-amber-500 text-slate-950'
                            : isDark
                              ? 'border-slate-700 bg-slate-900 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2 ${
                periopCalc.tone === 'rose'
                  ? isDark
                    ? 'border-rose-500/50 bg-rose-950/30 text-rose-100'
                    : 'border-rose-300 bg-rose-50 text-rose-950'
                  : periopCalc.tone === 'amber'
                    ? isDark
                      ? 'border-amber-500/40 bg-amber-950/25 text-amber-100'
                      : 'border-amber-300 bg-amber-50 text-amber-950'
                    : isDark
                      ? 'border-emerald-500/40 bg-emerald-950/25 text-emerald-100'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-black">
                {periopCalc.tone === 'rose' ? (
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                )}
                <span>{periopCalc.holdText}</span>
              </div>
              <p className="text-xs">
                <strong>Yeniden Başlama:</strong> {periopCalc.restartText}
              </p>
              <p className="text-xs leading-relaxed">{periopCalc.detail}</p>
            </div>
          </div>
        )}

        {/* TAB 3: MAJÖR KANAMA REVERSAL */}
        {activeTab === 'reversal' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hasta Ağırlığı (kg)
                </label>
                <input
                  type="number"
                  min={35}
                  max={180}
                  value={bleedWeightKg}
                  onChange={(e) => setBleedWeightKg(Number(e.target.value) || 75)}
                  className={`mt-2 w-full rounded-lg border px-2.5 py-1.5 font-mono text-sm font-black ${
                    isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                  }`}
                />
              </div>

              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Son Alınan Rivaroksaban Dozu
                </span>
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {[2.5, 10, 15, 20].map((mg) => (
                    <button
                      key={mg}
                      type="button"
                      onClick={() => setLastDoseMg(mg)}
                      className={`cursor-pointer rounded-lg border py-1.5 font-mono text-xs font-bold ${
                        lastDoseMg === mg
                          ? 'border-rose-600 bg-rose-600 text-white'
                          : isDark
                            ? 'border-slate-700 bg-slate-900 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {mg.toString().replace('.', ',')}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Son Dozdan Geçen Süre</span>
                  <span className="font-mono text-rose-500">{hoursSinceDose} sa</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={24}
                  step={1}
                  value={hoursSinceDose}
                  onChange={(e) => setHoursSinceDose(Number(e.target.value))}
                  className="mt-3 w-full accent-rose-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div
                className={`rounded-xl border p-4 space-y-2 ${
                  isDark ? 'border-rose-500/40 bg-rose-950/25' : 'border-rose-200 bg-rose-50'
                }`}
              >
                <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                  TR Pratiği 1. Basamak (Andeksanet Yoksa · ACC 2020)
                </p>
                <p className={`font-mono text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  4-Faktör PCC: {reversalCalc.pccIu.toLocaleString('tr-TR')} IU IV (50 IU/kg · ~{reversalCalc.pccVials} × 500 IU flakon)
                </p>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Alternatif sabit doz: <strong>2.000 IU IV</strong> + <strong>TXA 1 g IV</strong>. Protamin, K1 Vitamini ve
                  Hemodiyaliz <strong>%0 ETKİSİZDİR</strong>!
                </p>
              </div>

              <div
                className={`rounded-xl border p-4 space-y-2 ${
                  isDark ? 'border-sky-500/40 bg-sky-950/25' : 'border-sky-200 bg-sky-50'
                }`}
              >
                <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                  Spesifik Antidot &amp; Aktif Kömür
                </p>
                <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {reversalCalc.andexanetRegimen}
                </p>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {reversalCalc.charcoalEligible
                    ? '✅ Son doz ≤4 saat önce: 50 g ORAL/NG AKTİF KÖMÜR verin (emilimi belirgin azaltır)!'
                    : 'Son doz >4 saat önce alındığı için Aktif Kömür genellikle rutin fayda sağlamaz.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RİVAROKSABAN vs APİKSABAN vs VARFARİN */}
        {activeTab === 'compare' && (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                  <th className="p-3 font-bold">Özellik</th>
                  <th className="p-3 font-bold text-rose-600 dark:text-rose-300">Rivaroksaban (Xarelto®)</th>
                  <th className="p-3 font-bold text-sky-600 dark:text-sky-300">Apiksaban (Eliquis®)</th>
                  <th className="p-3 font-bold">Varfarin (Coumadin®)</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                {[
                  ['İdame Doz Sıklığı', 'Günde TEK DOZ (q24sa — yüksek uyum!)', 'Günde 2 kez (q12sa)', 'Günde 1 kez (INR titrasyonu)'],
                  ['Yemekle Alma Şartı', '15 & 20 mg: YEMEKLE ZORUNLU!', 'Yemek şartı YOK (aç/tok)', 'Sabit K vit diyeti'],
                  ['NVAF Doz Azaltımı', 'Tek Kriter: CrCl <50 → 15 mg q24sa', 'ABC ≥2/3 (≥80y, ≤60kg, Cr ≥1,5) → 2,5 mg', 'INR’ye göre titre'],
                  ['Akut DVT/PE Yükleme', '15 mg q12sa × 21 GÜN → 20 mg q24sa', '10 mg q12sa × 7 GÜN → 5 mg q12sa', '≥5 gün UFH/DMAH köprüsü'],
                  ['KAH / PAH (COMPASS)', '2,5 mg q12sa + ASA (TEK DOAC!)', 'Endikasyonu yok', 'Rutin kullanılmaz'],
                  ['Aktif Renal Atılım', '~%36 (CrCl <15 / HD’de önerilmez)', '~%27 (en düşük renal bağımlılık)', '<%1 (HD’de doz ayarı yok)'],
                  ['GİS Kanama Profili', 'Apiksabandan daha yüksek (pik/vadi!)', 'En düşük GİS kanama profili', 'Orta (İKK en yüksek!)'],
                  ['Karaciğer (Child-Pugh B)', 'KONTRENDİKE / KAÇININ!', 'Dikkatle kullanım (sınırlı)', 'Çok yüksek kanama riski'],
                ].map(([feat, riv, apx, wrf]) => (
                  <tr key={feat} className={isDark ? 'odd:bg-slate-950/40' : 'odd:bg-slate-50/50'}>
                    <td className={`p-3 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{feat}</td>
                    <td className={`p-3 font-semibold ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>{riv}</td>
                    <td className="p-3">{apx}</td>
                    <td className="p-3">{wrf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </MonographAccordionSection>

      {/* 9. TÜRKİYE PREPARATLARI */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="riv-tr"
        preparations={[
          {
            name: 'Xarelto® 20 mg Film Kaplı Tablet',
            presentation: '28 tabletlik blister ambalaj · Kahverengi-kırmızı, yuvarlak',
            concentration: '20 mg / tablet',
            saltOrBaseNote: 'NVAF (CrCl ≥50) ve Akut DVT/PE idame (22. günden itibaren) standardı. MUTLAKA YEMEKLE ALINIR!',
            alertLevel: 'high',
          },
          {
            name: 'Xarelto® 15 mg Film Kaplı Tablet',
            presentation: '28 veya 42 (DVT/PE 21 günlük başlangıç paketi) tablet · Kırmızı, yuvarlak',
            concentration: '15 mg / tablet',
            saltOrBaseNote: 'Akut DVT/PE ilk 21 gün (q12sa) ve NVAF renal indirgenmiş doz (CrCl 15–49 · q24sa). MUTLAKA YEMEKLE ALINIR!',
            alertLevel: 'high',
          },
          {
            name: 'Xarelto® 10 mg Film Kaplı Tablet',
            presentation: '10 veya 30 tabletlik blister · Açık kırmızı, yuvarlak',
            concentration: '10 mg / tablet',
            saltOrBaseNote: 'Ortopedik protez profilaksisi (postop 6–10 sa) ve uzatılmış VTE sekonder profilaksisi (EINSTEIN-CHOICE). Aç veya tok alınabilir.',
            alertLevel: 'standard',
          },
          {
            name: 'Xarelto® 2,5 mg Film Kaplı Tablet',
            presentation: '56 tabletlik blister · Açık sarı, yuvarlak',
            concentration: '2,5 mg / tablet',
            saltOrBaseNote: 'Kronik KAH / PAH (COMPASS / VOYAGER-PAD: + Aspirin 100 mg) vasküler dozudur — AF veya VTE koruması SAĞLAMAZ!',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          '15 mg ve 20 mg tabletler MUTLAKA ana öğünle (akşam yemeğiyle) birlikte alınır; aç alınırsa etki ~%34–39 düşer!',
          'Yutma güçlüğünde tablet ezilip elma püresiyle (15–20 mg için hemen ardından yemek!) veya mide içi NG/PEG tüpten 50 mL suyla verilip hemen ardından enteral beslenme uygulanır.',
          'ASLA pilor sonrası (jejunostomi / duodenostomi) tüpten verilmez — distal emilim bozulur!',
        ]}
        concentrationTrapWarning="4 farklı doz gücü (2,5 · 10 · 15 · 20 mg) ve DVT/PE’de 21 günlük 15 mg q12sa → 20 mg q24sa geçişi en sık reçete/eczane hatası kaynağıdır! Özellikle 21. gün sonunda hastanın 15 mg q12sa’ya devam etmesi ağır kanamaya yol açar."
      />

      {/* 10. UYGULAMA YOLU & UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="riv-line"
        accessRequirement="peripheral-ok"
        accessSummary="Yalnızca ORAL (PO) veya mide içi NG/PEG tüpten (ezilerek 50 mL suyla, 15–20 mg için hemen ardından enteral beslenme!) uygulanır. Distal ince bağırsak (jejunostomi) veya Roux-en-Y gastrik bypass hastasında emilimi belirgin azaldığından KULLANILMAMALIDIR!"
        phRange="Oral film kaplı tablet"
        osmolalityNote="Acil reversal için verilen 4F-PCC ve Andeksanet Alfa ayrı IV hattan uygulanır."
        compatibleDiluents={['Su (50 mL — mide içi NG/PEG tüp)', 'Elma püresi (ezilmiş tablet + hemen ardından yemek)']}
        ySiteCompatible={['Oral ajan (IV Y-site geçerli değildir)']}
        ySiteIncompatible={['Jejunostomi / pilor sonrası beslenme tüpünden UYGULANMAZ!', 'Aktif Kömür ile eşzamanlı alımda emilim çöker.']}
        stabilityNote="Ezilmiş tablet su veya elma püresinde oda sıcaklığında 4 saat stabildir."
      />

      {/* 11. BÖBREK & KARACİĞER YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="riv-organ"
        renalSummary="Aktif renal atılım ~%36 · NVAF CrCl <50’de 15 mg q24sa · CrCl <15 / Diyalizde ÖNERİLMEZ (Diyalizlenmez)!"
        renalDetails={[
          'CrCl ≥50 mL/dk: Tam standart doz (NVAF 20 mg q24sa · VTE 15 mg q12sa × 21g → 20 mg).',
          'CrCl 30–49 mL/dk: NVAF’de 15 mg q24sa (yemekle!); akut VTE standart.',
          'CrCl 15–29 mL/dk: NVAF’de 15 mg q24sa (çok dikkatli!); akut VTE ve ortopedide FDA kaçınmayı önerir.',
          'CrCl <15 mL/dk & Diyaliz: EMA/TİTCK önermez — %92–95 protein bağlı olduğundan HD ile TEMİZLENMEZ!',
        ]}
        hepaticSummary="Child-Pugh A: %100 Standart · Child-Pugh B ve C: KONTRENDİKE / KAÇININ! (Apiksabandan daha katı!)"
        hepaticDetails={[
          'Child-Pugh B (orta siroz) hastalarında Rivaroksaban AUC’si 2,27 kat yükseldiği için FDA ve EMA tarafından Child-Pugh B VE C’de kaçınılması/kontrendike olduğu belirtilir!',
        ]}
        renalMatrix={STANDALONE_ORGAN_PART2.rivaroxaban.renalMatrix}
        hepaticMatrix={STANDALONE_ORGAN_PART2.rivaroxaban.hepaticMatrix}
        dualOrganNote={STANDALONE_ORGAN_PART2.rivaroxaban.dualOrganNote}
      />

      {/* 12. GERİATRİ & OBEZİTE */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="riv-geriatrics"
        geriatricReductionBadge="Yaşlıda t½ 11–13 sa · GİS Kanama & CrCl İzle!"
        geriatricPoints={[
          'Yaşlı (>75 yaş) hastalarda renal klirens azaldığından t½ 5–9 saatten 11–13 saate uzar; yaş tek başına doz azaltımı gerektirmez ancak Cockcroft-Gault CrCl <50 ise NVAF’de 15 mg q24sa’ya düşülür.',
          'Günde tek doz (q24sa) oluşu ilaç uyumunu artırır; ancak GİS kanaması riski yüksek kırılgan yaşlılarda Apiksaban daha düşük GİS kanama profili sunar.',
        ]}
        obesityWeightScalarBadge="ISTH 2021: BMI >40 / >120 kg’da UYGUN!"
        obesityPoints={[
          'ISTH 2021 Kılavuzu: BMI >40 kg/m² veya >120 kg morbid obez hastalarda Rivaroksaban (ve Apiksaban) standart dozlarda (NVAF 20 mg · VTE 15 mg q12sa → 20 mg) güvenle kullanılabilir!',
          'Bariatrik cerrahi (özellikle Roux-en-Y gastrik bypass & sleeve gastrektomi) sonrası proksimal mide emilimi bozulduğundan Rivaroksaban ÖNERİLMEZ (Apiksaban veya Varfarin tercih edin)!',
        ]}
      />

      {/* 13. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="riv-preg"
        pregnancySummary="GEBELİKTE KONTRENDİKE / ÖNERİLMEZ — Plasentayı geçer! (Gebelikte DMAH / Enoksaparin 1. Tercih)."
        pregnancyDetails={[
          'Plasentayı geçer; hayvan ve sınırlı insan verilerinde hemorajik komplikasyon ve olası embriyotoksisite bildirilmiştir — gebelik saptanınca derhal DMAH’a geçilmelidir.',
        ]}
        lactationSummary="EMZİRMEDE ÖNERİLMEZ — Anne sütüne geçer (LactMed: DMAH veya Varfarin tercih edin!)."
        lactationDetails={[
          'Anne sütünde saptanabilir düzeylere ulaşır; emziren annelerde güvenli alternatif olan Enoksaparin veya Varfarin seçilmelidir.',
        ]}
      />

      {/* 14. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="riv-adverse"
        items={[
          {
            title: 'Gastrointestinal (GİS) Kanama',
            incidenceOrSeverity: 'ROCKET-AF: %3,2 vs Varfarin %2,2',
            detail:
              'Günde tek yüksek dozun oluşturduğu yüksek pik (Cmax) ve aktif lüminal konsantrasyon nedeniyle Apiksaban ve Varfarine göre GİS kanaması hafif daha sıktır → riskli hastada PPI ekleyin!',
            tone: 'rose',
          },
          {
            title: 'İntrakraniyal Kanama (Varfarinden %33 Az!)',
            incidenceOrSeverity: 'ROCKET-AF: %0,5/yıl vs %0,7/yıl',
            detail:
              'Varfarine kıyasla fatal kanama ve intrakraniyal hemorajiyi anlamlı azaltır; gelişirse Andeksanet veya 4F-PCC 50 IU/kg ile acil reversal gerekir.',
            tone: 'rose',
          },
          {
            title: 'Anormal Uterin Kanama (Menorajı)',
            incidenceOrSeverity: 'Doğurganlık Çağı Kadınlarda Sık',
            detail:
              'Genç kadın VTE hastalarında Rivaroksaban ile ağır menstrüel kanama Apiksaban ve Varfarine göre daha sık görülür.',
            tone: 'amber',
          },
          {
            title: 'Erken Kesmede Tromboz & Spinal Hematom',
            incidenceOrSeverity: 'FDA Kara Kutu Uyarısı',
            detail:
              'Alternatif antikoagülan olmadan ani kesme inme riskini artırır; nöraksiyel blokta 72 saat kuralına uyulmazsa epidural hematom gelişir.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 15. ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="riv-cautions"
        items={[
          {
            title: 'PT/INR Yalancı Güvenliği (Kritik Laboratuvar Tuzağı!)',
            detail:
              'Rivaroksaban pik saatte PT’yi doza bağımlı uzatabilir; ancak tromboplastin reaktifine göre duyarlılık çok değişkendir — NORMAL PT/INR TERAPÖTİK RİVAROKSABAN DÜZEYİNİ DIŞLAMAZ! Gerçek ölçüm yalnızca Rivaroksaban-kalibreli Anti-Xa testidir.',
          },
          {
            title: 'Akut İskemik İnmede IV Tromboliz (tPA / Tenekteplaz)',
            detail:
              'Son 48 saat içinde Rivaroksaban almış akut iskemik inmede IV tromboliz genellikle KONTRENDİKEDİR (yalnızca hızlı Rivaroksaban-kalibreli Anti-Xa <30 ng/mL doğrulanırsa istisna); mekanik trombektomi yapılabilir!',
          },
          {
            title: 'AF + Yeni PKG / AKS (PIONEER AF-PCI, NEJM 2016)',
            detail:
              'AF + stent takılan hastada Rivaroksaban 15 mg q24sa (CrCl 30–49’da 10 mg) + P2Y12 inhibitörü (Klopidogrel) ikili tedavisi, Varfarin + DAPT üçlü tedavisine göre klinik anlamlı kanamayı %41 azalttı!',
          },
          {
            title: 'Varfarin ↔ Rivaroksaban Geçişi',
            detail:
              'Varfarin → Rivaroksaban: Varfarini kes, INR <3,0 (EMA: NVAF ≤3,0 · VTE ≤2,5) olunca Rivaroksaban başla. Rivaroksaban → Varfarin: Rivaroksaban INR’yi yalancı yükseltir! Bir sonraki Rivaroksaban dozundan hemen önce (trough · 24. sa) bakılan INR ≥2,0 olunca Rivaroksabanı kes.',
          },
          {
            title: 'Bariatrik Cerrahi & Malabsorpsiyon',
            detail:
              'Mide rezeksiyonu / Roux-en-Y gastrik bypass sonrası Rivaroksabanın proksimal emilimi belirgin azaldığından kullanılması önerilmez!',
          },
          {
            title: 'HIT (Heparinle İndüklenen Trombositopeni — ASH 2018)',
            detail:
              'Anti-PF4 çapraz reaksiyonu yapmaz; ASH 2018’e göre stabil, kanamasız HIT’te (CrCl ≥30) en çok yayınlanmış klinik seriye sahip DOAC seçeneğidir (15 mg q12sa × 21g → 20 mg q24sa).',
          },
        ]}
      />

      {/* 16. 4 KADEMELİ DERİN FARMAKODİNAMİK ANALİZ (AKORDİYON) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="riv-deep-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef: FXa Katalitik Cebine Direkt Tersinir Kenetlenme',
          summary:
            'Rivaroksaban (MW 436 Da), okzazolidinon türevi küçük bir moleküldür; Faktör Xa’nın S1 (klorotiyofen halkası) ve S4 (morfolinon halkası) aktif ceplerine AT-III’ten bağımsız olarak yüksek afiniteyle (Ki = 0,4 nM) yerleşir.',
          points: [
            'Hem serbest FXa’yı hem de aktive trombosit membranındaki protrombinaz kompleksini (FXa–FVa–Ca²⁺) ve fibrin pıhtısına bağlı FXa’yı inhibe eder.',
            'Trombine (FIIa) karşı >10.000 kat selektiftir; trombinin doğrudan aktivitesini değiştirmez fakat yeni trombin üretimini (thrombin burst) dramatik olarak bastırır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Protrombinaz & PAR-1 Çift Yolaklı Trombosit-Koagülasyon Baskısı (COMPASS)',
          summary:
            'Faktör Xa’nın inhibisyonu yalnızca fibrin oluşumunu değil, aynı zamanda trombinin trombosit ve endotel üzerindeki PAR-1/PAR-4 reseptörlerini uyarmasını da baskılar.',
          points: [
            'Aterosklerotik plak rüptüründe hem trombosit TXA₂/ADP aktivasyonu hem de doku faktörü–FXa–trombin ekseni eşzamanlı devreye girer; düşük doz Rivaroksaban (2,5 mg q12sa) + Aspirin (COMPASS) bu iki aksı sinerjistik kapatır!',
            'Mekanik kalp kapaklarında ve üçlü pozitif APS’de (TRAPS!) ise yoğun kontakt aktivasyonu (FXIIa/FXIa) tek başına FXa blokajını aşarak tromboza yol açabildiği için Varfarin gereklidir.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Proksimal GİS & Biyoyararlanım Yatağı',
            tissueTarget: 'Mide / Duodenum + Safra',
            accent: 'amber',
            points: [
              '15 mg ve 20 mg tabletler BCS Sınıf II (düşük çözünürlük / yüksek geçirgenlik) profilindedir; yemek sonrası safra tuzu miselleri ve gecikmiş mide boşalması çözünmeyi artırarak biyoyararlanımı %66’dan >%80–100’e çıkarır.',
              'Günde tek doz yüksek 20 mg bolusu, kolon/mide mukozasında yüksek lokal aktif ilaç konsantrasyonu bırakarak GİS kanaması eğilimini q12sa Apiksabana göre biraz artırır.',
            ],
          },
          {
            systemTitle: 'Periferik & Koroner Arter Yatağı (COMPASS / VOYAGER)',
            tissueTarget: 'Aterotrombotik Plak & PAR-1',
            accent: 'teal',
            points: [
              '2,5 mg q12sa + Aspirin kombinasyonu, kronik KAH ve PAH hastalarında akut ekstremite iskemisi ve amputasyon riskini dramatik biçimde azaltır.',
            ],
          },
          {
            systemTitle: 'Karaciğer & Böbrek Çift Klirens Ekseni',
            tissueTarget: 'CYP3A4/2J2 + P-gp/BCRP (%36 Renal)',
            accent: 'rose',
            points: [
              'Hem hepatik CYP3A4/2J2 hem de renal P-gp/BCRP tübüler sekresyonuna belirgin bağımlıdır — bu nedenle Child-Pugh B’de dahi AUC 2,27 kat artar (kontrendike!) ve CrCl <50’de NVAF dozu 15 mg’a indirilir.',
            ],
          },
          {
            systemTitle: 'Serebral Vasküler Yatak',
            tissueTarget: 'Korunmuş TF–FVIIa Hemostazı',
            accent: 'sky',
            points: [
              'Varfarin gibi FVII’yi düşürmediği için ROCKET-AF’de intrakraniyal hemorajiyi %33 ve fatal kanamayı %50 azaltmıştır.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Pik-Vadi Dinamiği, Çift CYP3A4/P-gp Blokajı & Reversal',
          summary:
            '20 mg q24sa rejiminde pik-vadi plazma oranı (~10:1), Apiksaban 5 mg q12sa’ya (~3:1) göre daha geniştir; bu farmakokinetik fark günde tek doz kullanım kolaylığı sağlarken GİS kanama farkını da açıklar.',
          points: [
            'Güçlü çift CYP3A4 + P-gp inhibitörleri (Ritonavir, Ketokonazol) hem hepatik metabolizmayı hem de renal P-gp aktif sekresyonunu eşzamanlı kilitlediğinden Rivaroksaban düzeyini ~2,5 kat artırır → kontrendike!',
            'Majör kanamada Andeksanet Alfa dolaşımdaki Rivaroksabanı doğrudan bağlar; bulunmadığında 4F-PCC (50 IU/kg) ekzojen FX/FII yüklemesiyle trombin üretimini restore eder.',
          ],
        }}
        clinicalPearls={[
          'Her 15 mg ve 20 mg Rivaroksaban reçetesinde hastaya “BU İLACI MUTLAKA AKŞAM YEMEĞİYLE ALIN!” uyarısını yüksek sesle ve yazılı verin — aç alım sessiz tedavi başarısızlığıdır!',
          'Akut DVT/PE hastasında 21. gün sonunda 15 mg q12sa’dan 20 mg q24sa’ya geçiş takvimini reçeteye net tarihle yazın!',
          'Child-Pugh B orta sirozda Rivaroksaban KULLANMAYIN (AUC 2,27 kat artar) ve gastrik bypass / jejunostomi hastasında tercih etmeyin!',
          'Normal PT/INR sonucuna bakarak spinal/epidural blok yapmayın — terapötik dozda ASRA/ESAIC 72 saat kuralını uygulayın!',
        ]}
      />

      {/* 17. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="riv-refs"
        drugName="Rivaroksaban (Xarelto®)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Güçlü Çift CYP3A4 + P-gp İnhibitörleri (Ketokonazol, İtrakonazol, Vorikonazol, Ritonavir / Paxlovid®)',
            mechanism: 'CYP3A4 metabolizması + renal P-gp/BCRP aktif sekresyonunun eşzamanlı blokajı (AUC ~2,5 kat artar!)',
            clinicalEffect: 'Şiddetli ilaç birikimi ve hayatı tehdit eden majör/intrakraniyal kanama.',
            management: 'Eşzamanlı KESİNLİKLE KULLANMAYIN (FDA & EMA kontrendike/önerilmez)!',
          },
          {
            severity: 'X',
            agent: 'Güçlü Çift CYP3A4 + P-gp İndükleyicileri (Rifampisin, Karbamazepin, Fenitoin, Sarı Kantaron)',
            mechanism: 'CYP3A4 ve P-gp güçlü indüksiyonu (AUC ~%50 düşer!)',
            clinicalEffect: 'Antikoagülan koruma kaybı → akut inme, sistemik emboli veya PE/DVT nüksü.',
            management: 'Eşzamanlı kullanmayın; alternatif antiepileptik (Levetirasetam) veya Varfarin/DMAH seçin.',
          },
          {
            severity: 'X',
            agent: 'Diğer Sistemik Antikoagülanlar (UFH, DMAH, Fondaparinuks, Varfarin, Trombolitikler)',
            mechanism: 'Çift koagülasyon kaskadı blokajı',
            clinicalEffect: 'Katlanarak artan majör kanama riski.',
            management: 'İlaç geçiş dönemleri dışında kombine etmeyin.',
          },
          {
            severity: 'D',
            agent: 'Orta CYP3A4 + P-gp İnhibitörleri (Eritromisin, Klaritromisin, Flukonazol, Diltiazem, Verapamil, Amiodaron) + CrCl 15–50',
            mechanism: 'Azalmış renal klirens + orta CYP3A4/P-gp blokajının aditif birikimi',
            clinicalEffect: 'Özellikle KBY hastasında anlamlı AUC artışı ve GİS/majör kanama riski!',
            management: 'CrCl 15–50 mL/dk hastada orta çift inhibitörlerle kombinasyondan kaçının (mümkünse alternatif ajan seçin veya yakın kanama izlemi yapın).',
          },
          {
            severity: 'D',
            agent: 'Sistemik NSAİİ’ler (İbuprofen, Diklofenak, Tenoksikam) & Antiplateletler (COMPASS 2,5 mg + ASA hariç)',
            mechanism: 'Trombosit blokajı + gastrik mukozal erozyon + Rivaroksaban lokal GİS kanama eğilimi',
            clinicalEffect: 'Üst GİS kanaması riskinde 3 katın üzerinde artış!',
            management: 'NSAİİ yerine Parasetamol seçin; zorunlu antiplatelet birlikteliğinde (PIONEER AF-PCI / COMPASS) mutlaka PPI (Pantoprazol) ekleyin.',
          },
        ]}
        references={[
          {
            authors: 'Patel MR, Mahaffey KW, Garg J, et al. (ROCKET AF Investigators)',
            title: 'Rivaroxaban versus Warfarin in Nonvalvular Atrial Fibrillation',
            journal: 'N Engl J Med',
            year: 2011,
            doi: '10.1056/NEJMoa1009638',
            note: '14.264 yüksek riskli NVAF hastasında 20 mg (CrCl 30–49’da 15 mg) q24sa Rivaroksabanın Varfarine eşdeğer inme koruması ve %33 daha az İKK sağladığını gösteren temel çalışma.',
          },
          {
            authors: 'Bauersachs R, Berkowitz SD, Brenner B, et al. (EINSTEIN Investigators)',
            title: 'Oral Rivaroxaban for Symptomatic Venous Thromboembolism',
            journal: 'N Engl J Med',
            year: 2010,
            doi: '10.1056/NEJMoa1007903',
            note: 'Akut DVT’de tek ajan 15 mg q12sa × 21 gün → 20 mg q24sa rejimini standartlaştıran çalışma.',
          },
          {
            authors: 'Büller HR, Prins MH, Lensin AWA, et al. (EINSTEIN–PE Investigators)',
            title: 'Oral Rivaroxaban for the Treatment of Symptomatic Pulmonary Embolism',
            journal: 'N Engl J Med',
            year: 2012,
            doi: '10.1056/NEJMoa1113572',
            note: 'Akut semptomatik PE’de 15 mg q12sa × 21g → 20 mg q24sa ile standart tedaviye eşdeğer etkinlik ve %51 daha az majör kanama.',
          },
          {
            authors: 'Weitz JI, Lensing AWA, Prins MH, et al. (EINSTEIN CHOICE Investigators)',
            title: 'Rivaroxaban or Aspirin for Extended Treatment of Venous Thromboembolism',
            journal: 'N Engl J Med',
            year: 2017,
            doi: '10.1056/NEJMoa1700518',
            note: 'Uzatılmış VTE sekonder profilaksisinde 10 mg q24sa ile Aspirine göre %74 nüks azalması ve farksız majör kanama.',
          },
          {
            authors: 'Eikelboom JW, Connolly SJ, Bosch J, et al. (COMPASS Investigators)',
            title: 'Rivaroxaban with or without Aspirin in Stable Cardiovascular Disease',
            journal: 'N Engl J Med',
            year: 2017,
            doi: '10.1056/NEJMoa1709118',
            note: '27.395 stabil KAH/PAH hastasında 2,5 mg q12sa + Aspirin ile MACE’te %24, inmede %42 ve amputasyonda %70 azalma.',
          },
          {
            authors: 'Bonaca MP, Bauersachs RM, Anand SS, et al. (VOYAGER PAD Investigators)',
            title: 'Rivaroxaban in Peripheral Artery Disease after Revascularization',
            journal: 'N Engl J Med',
            year: 2020,
            doi: '10.1056/NEJMoa2000052',
            note: 'Alt ekstremite revaskülarizasyonu sonrası 2,5 mg q12sa + Aspirin ile akut ekstremite iskemisinde anlamlı azalma.',
          },
          {
            authors: 'Douketis JD, Spyropoulos AC, Duncan J, et al. (PAUSE Study)',
            title: 'Perioperative Management of Patients With Atrial Fibrillation Receiving a Direct Oral Anticoagulant',
            journal: 'JAMA Intern Med',
            year: 2019,
            doi: '10.1001/jamainternmed.2019.2431',
            note: 'Köprülemesiz 1 gün (düşük risk) / 2 gün (yüksek risk) perioperatif Rivaroksaban kesme protokolü.',
          },
          {
            authors: 'Kietaibl S, Ferrandis R, Godier A, et al.',
            title: 'Regional anaesthesia in patients on antithrombotic drugs: Joint ESAIC/ESRA guidelines',
            journal: 'Eur J Anaesthesiol',
            year: 2022,
            doi: '10.1097/EJA.0000000000001600',
            note: 'Terapötik Rivaroksaban için 72 saat, 10 mg profilaksi / 2,5 mg vasküler doz için 24 saat nöraksiyel bekleme kılavuzu.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/rivaroxaban.html"
        medscapeUrl="https://reference.medscape.com/drug/xarelto-rivaroxaban-999670"
      />
    </div>
  );
};
