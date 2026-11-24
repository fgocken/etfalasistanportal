import React, { useState, useId } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  Layers,
  RotateCcw,
  ShieldAlert,
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
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
} from './shared/DrugMonographBlocks';

interface Props {
  isDark: boolean;
}

type CalcScenario = 'induction_rsi' | 'icp_coma' | 'status_epilepticus' | 'ia_emergency';

type InductionProfile =
  | 'adult_asa12'
  | 'geriatric_frail'
  | 'obstetric_rsi'
  | 'pediatric'
  | 'ect';

type InfusionConc = 'conc_25' | 'conc_10'; // %2,5 (25 mg/mL) vs %1 (10 mg/mL)

const INDUCTION_PROFILES: Record<
  InductionProfile,
  {
    label: string;
    shortLabel: string;
    defaultMgKg: number;
    minMgKg: number;
    maxMgKg: number;
    rangeText: string;
    note: string;
  }
> = {
  adult_asa12: {
    label: 'Erişkin ASA I–II (Standart İndüksiyon / RSI)',
    shortLabel: 'Erişkin ASA I–II',
    defaultMgKg: 4.0,
    minMgKg: 3.0,
    maxMgKg: 5.0,
    rangeText: '3 – 5 mg/kg IV',
    note: 'Sağlıklı erişkinde 1 kol-beyin dolaşım süresinde (15–30 sn) bilinç kaybı sağlar. RSI sonrası NMB öncesi araya mutlaka 10–20 mL SF flush yapın.',
  },
  geriatric_frail: {
    label: 'Geriatrik / Hipovolemik / ASA III–IV',
    shortLabel: 'Geriatrik / ASA III–IV',
    defaultMgKg: 2.0,
    minMgKg: 1.5,
    maxMgKg: 2.5,
    rangeText: '1,5 – 2,5 mg/kg IV',
    note: 'Santral dağılım hacmi (V1) azaldığı ve baroreseptör/miyokard rezervi kısıtlı olduğu için doz %30–50 azaltılır; yavaş ve fraksiyone titre edilir.',
  },
  obstetric_rsi: {
    label: 'Obstetrik Sezaryen RSI (Genel Anestezi)',
    shortLabel: 'Obstetrik RSI',
    defaultMgKg: 4.0,
    minMgKg: 3.5,
    maxMgKg: 4.5,
    rangeText: '4 mg/kg IV (≤ 7 mg/kg)',
    note: '4 mg/kg dozu maternal hızlı hipnoz sağlarken neonatal depresyonu minimal tutar (>7–8 mg/kg fetal depresyon riskini artırır).',
  },
  pediatric: {
    label: 'Pediatrik İndüksiyon (Çocuk / Süt Çocuğu)',
    shortLabel: 'Pediatrik',
    defaultMgKg: 5.5,
    minMgKg: 5.0,
    maxMgKg: 7.0,
    rangeText: '5 – 6 mg/kg (maks 7 mg/kg)',
    note: 'Çocuklarda daha geniş santral kompartman ve yüksek kardiyak debi nedeniyle kg başına erişkinden yüksek doz gerekir.',
  },
  ect: {
    label: 'Elektrokonvülsif Tedavi (EKT)',
    shortLabel: 'EKT',
    defaultMgKg: 2.0,
    minMgKg: 1.5,
    maxMgKg: 3.0,
    rangeText: '1,5 – 3 mg/kg IV',
    note: 'Yüksek doz barbitürat nöbet eşiğini yükselterek EKT nöbet süresini kısaltır; en düşük etkin hipnotik doz tercih edilir.',
  },
};

const IA_RESCUE_STEPS = [
  {
    id: 'step1',
    title: '1. İntra-Arteriyel Kateteri / İğneyi ASLA ÇEKME!',
    detail:
      'Enjeksiyonu derhal durdurun ancak kateteri/iğneyi arter lümeninde yerinde bırakın. İntra-arteriyel dilüsyon ve vazodilatör uygulaması için bu erişim hayati önem taşır.',
  },
  {
    id: 'step2',
    title: '2. 10–20 mL %0,9 NaCl (SF) ile Acil İntra-Arteriyel Dilüsyon',
    detail:
      'Arter kanında (pH 7,4) çöken alkali tiyopental kristallerini seyreltmek ve lokal pH hasarını azaltmak için kateterden yavaşça 10–20 mL izotonik SF verin.',
  },
  {
    id: 'step3',
    title: '3. İntra-Arteriyel Vazodilatör: Lidokain 40–80 mg veya Papaverin 40–80 mg',
    detail:
      'Şiddetli arteriyoler vazospazmı ve ağrıyı kırmak için aynı intra-arteriyel kateterden koruyucusuz Lidokain (40–80 mg = %2’likten 2–4 mL) veya Papaverin (40–80 mg, 10–20 mL SF içinde) yavaşça uygulayın.',
  },
  {
    id: 'step4',
    title: '4. Sistemik Antikoagülasyon: Heparin 5000 Ünite IV',
    detail:
      'Endotelyal nekroz sonrası gelişen distal mikrotrombozu ve parmak/ekstremite gangrenini önlemek için kontrendikasyon yoksa sistemik IV Heparin (5000 U bolus, ardından aPTT hedefli infüzyon) başlatın.',
  },
  {
    id: 'step5',
    title: '5. Sempatik Blokaj: Stellat Ganglion veya Brakiyal Pleksus Bloğu',
    detail:
      'Üst ekstremite distal dolaşımını maksimize etmek ve vazospazm refleksini uzun süreli kırmak için USG eşliğinde Stellat Ganglion Bloğu veya sürekli Brakiyal Pleksus Kateteri uygulayın.',
  },
  {
    id: 'step6',
    title: '6. Ekstremite Elevasyonu, Ilık Kompres & Damar / Plastik Cerrahi Konsültasyonu',
    detail:
      'Ekstremiteyi kalp seviyesinde/hafif eleve tutun, kapiller dolum ve Doppler akımını seri takip edin; acil Damar Cerrahisi / Plastik Cerrahi değerlendirmesi isteyin.',
  },
];

export const ThiopentalProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [scenario, setScenario] = useState<CalcScenario>('induction_rsi');

  // Tab 1: İndüksiyon & RSI
  const [weightKg, setWeightKg] = useState<number>(70);
  const [profile, setProfile] = useState<InductionProfile>('adult_asa12');
  const [inductionMgKg, setInductionMgKg] = useState<number>(4.0);

  // Tab 2: Refrakter İKB Barbitürat Koması (BTF 2017)
  const [icpWeightKg, setIcpWeightKg] = useState<number>(70);
  const [icpLoadMode, setIcpLoadMode] = useState<'standard_3_5' | 'high_5_10'>('standard_3_5');
  const [icpLoadMgKg, setIcpLoadMgKg] = useState<number>(5.0);
  const [icpMaintMgKgHr, setIcpMaintMgKgHr] = useState<number>(2.5);
  const [icpConc, setIcpConc] = useState<InfusionConc>('conc_25');

  // Tab 3: Süper-Refrakter Status Epileptikus (SRSE — NCS 2012)
  const [srseWeightKg, setSrseWeightKg] = useState<number>(70);
  const [srseBolusMode, setSrseBolusMode] = useState<'weight_based' | 'acute_fixed'>('weight_based');
  const [srseBolusMgKg, setSrseBolusMgKg] = useState<number>(4.0);
  const [srseMaintMgKgHr, setSrseMaintMgKgHr] = useState<number>(3.0);
  const [srseConc, setSrseConc] = useState<InfusionConc>('conc_25');

  // Tab 4: İntra-Arteriyel Acil Kurtarma Kontrol Listesi
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  // Akordiyon State'i
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik Kimlikleri
  const weightSliderId = useId();
  const weightInputId = useId();
  const indDoseSliderId = useId();
  const icpWeightSliderId = useId();
  const icpWeightInputId = useId();
  const icpLoadSliderId = useId();
  const icpMaintSliderId = useId();
  const srseWeightSliderId = useId();
  const srseWeightInputId = useId();
  const srseBolusSliderId = useId();
  const srseMaintSliderId = useId();

  // --- HESAPLAMALAR ---
  // Tab 1 (%2,5 standart çözelti = 25 mg/mL)
  const STD_CONC_MG_ML = 25;
  const activeProfileSpec = INDUCTION_PROFILES[profile];
  const inductionTotalMg = Math.round(weightKg * inductionMgKg);
  const inductionMl25 = inductionTotalMg / STD_CONC_MG_ML;
  const vials500Count = Math.ceil(inductionTotalMg / 500);
  const vials1000Count = Math.ceil(inductionTotalMg / 1000);

  // Tab 2 (Refrakter İKB Barbitürat Koması)
  const icpConcMgMl = icpConc === 'conc_25' ? 25 : 10;
  const icpLoadTotalMg = Math.round(icpWeightKg * icpLoadMgKg);
  const icpLoadMl25 = icpLoadTotalMg / 25;
  const icpMaintMgHr = icpWeightKg * icpMaintMgKgHr;
  const icpMaintMlHr = icpMaintMgHr / icpConcMgMl;
  const icpDailyGrams = (icpMaintMgHr * 24) / 1000;

  // Tab 3 (SRSE — NCS 2012)
  const srseConcMgMl = srseConc === 'conc_25' ? 25 : 10;
  const srseBolusMg = srseBolusMode === 'weight_based' ? Math.round(srseWeightKg * srseBolusMgKg) : 100;
  const srseBolusMl25 = srseBolusMg / 25;
  const srseRepeatLowMg = Math.round(srseWeightKg * 1);
  const srseRepeatHighMg = Math.round(srseWeightKg * 2);
  const srseMaintMgHr = srseWeightKg * srseMaintMgKgHr;
  const srseMaintMlHr = srseMaintMgHr / srseConcMgMl;

  // Tab 4 tamamlanma sayısı
  const completedRescueSteps = IA_RESCUE_STEPS.filter((s) => checkedSteps[s.id]).length;

  const handleProfileChange = (nextProfile: InductionProfile) => {
    setProfile(nextProfile);
    setInductionMgKg(INDUCTION_PROFILES[nextProfile].defaultMgKg);
  };

  const handleIcpLoadModeChange = (mode: 'standard_3_5' | 'high_5_10') => {
    setIcpLoadMode(mode);
    setIcpLoadMgKg(mode === 'standard_3_5' ? 4.0 : 7.5);
  };

  const toggleRescueStep = (id: string) => {
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Canlı Özet Kopyalama Metni
  const buildCopySummary = (): string => {
    const activeLine = (() => {
      if (scenario === 'induction_rsi') {
        return `• Aktif Hesaplama (${activeProfileSpec.shortLabel}, ${weightKg} kg, ${inductionMgKg.toFixed(
          1
        )} mg/kg): ${inductionTotalMg} mg IV = ${inductionMl25.toFixed(
          1
        )} mL (%2,5 = 25 mg/mL) — Pental® 0,5 g: ${vials500Count} flakon | 1 g: ${vials1000Count} flakon. NMB öncesi araya 10–20 mL SF flush!`;
      }
      if (scenario === 'icp_coma') {
        return `• Aktif Hesaplama (Refrakter İKB Barbitürat Koması, ${icpWeightKg} kg): Yükleme ${icpLoadMgKg.toFixed(
          1
        )} mg/kg = ${icpLoadTotalMg} mg (${icpLoadMl25.toFixed(
          1
        )} mL %2,5 yavaş IV) → İdame ${icpMaintMgKgHr.toFixed(1)} mg/kg/saat = ${icpMaintMgHr.toFixed(
          0
        )} mg/saat (${icpMaintMlHr.toFixed(1)} mL/saat [${icpConcMgMl} mg/mL]). Hedef: EEG burst-supresyon + CPP ≥ 60–70 mmHg.`;
      }
      if (scenario === 'status_epilepticus') {
        return `• Aktif Hesaplama (SRSE, ${srseWeightKg} kg): Bolus ${
          srseBolusMode === 'weight_based'
            ? `${srseBolusMgKg.toFixed(1)} mg/kg = ${srseBolusMg} mg`
            : '75–125 mg (ort. 100 mg)'
        } (${srseBolusMl25.toFixed(
          1
        )} mL %2,5) + gerekirse ${srseRepeatLowMg}–${srseRepeatHighMg} mg q3–5dk → İdame ${srseMaintMgKgHr.toFixed(
          1
        )} mg/kg/saat = ${srseMaintMgHr.toFixed(0)} mg/saat (${srseMaintMlHr.toFixed(
          1
        )} mL/saat [${srseConcMgMl} mg/mL]).`;
      }
      return `• Aktif Protokol (İntra-Arteriyel Enjeksiyon Acil Kurtarma): 1) Kateteri ÇEKME → 2) 10–20 mL SF dilüsyon → 3) IA Lidokain 40–80 mg veya Papaverin 40–80 mg → 4) Sistemik Heparin 5000 U → 5) Stellat/Brakiyal pleksus bloğu → 6) Elevasyon & Damar/Plastik Cerrahi.`;
    })();

    return [
      `TİYOPENTAL SODYUM (Pental Sodyum® / Tyosod® 0,5 g – 1 g Flakon · %2,5 = 25 mg/mL) KLİNİK ÖZETİ`,
      `• Farmakolojik Profil: Ultra-Kısa Etkili Tiyobarbitürat · GABA-A Cl⁻ Kanal Açık Kalma Süresi ↑ · pH ~10,5–11,0 · pKa 7,6`,
      activeLine,
      `• Kritik Güvenlik: Akut İntermitan Porfiride KESİN KONTRENDİKE! Asidik ilaçlar/NMB'ler ve Ringer Laktat ile anında çökelir (10–20 mL SF flush!). Uzun infüzyonda sıfır-derece kinetik (t½ > 11–36 sa) ve hipokalemi → kesilmede ölümcül rebound hiperkalemi!`,
    ].join('\n');
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
      {/* 2. ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (KAPALI AKORDİYON)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="sec-guvenlik"
        defaultOpen={false}
        tallManName="THIOPENTAL SODIUM"
        confusionRiskWith="Pental Sodyum 0,5 g vs 1 g Flakon · %2,5 (25 mg/mL) vs %5 (50 mg/mL — Nekroz Riski!) · Pentobarbital"
        criticalAlerts={[
          'Akut İntermitan Porfiri (KESİN KONTRENDİKASYON): Hepatik δ-ALA sentaz (ALAS1) enzimini güçlü biçimde indükleyerek toksik porfirin prekürsör birikimine ve ölümcül nörovisseral porfiri atağına (şiddetli karın ağrısı, assendan paralizi, solunum arresti) yol açar.',
          'Kazara İntra-Arteriyel Enjeksiyon Felaketi (pH ~10,5–11,0): Yüksek alkali tiyopental arter kanına (pH 7,4) karıştığında anında serbest asit kristalleri halinde çöker → şiddetli arteriyoler vazospazm, endotelyal nekroz ve ekstremite gangreni! Kateteri ASLA ÇEKME; yerinde bırakıp intra-arteriyel 10–20 mL SF dilüsyonu + Lidokain/Papaverin + sistemik Heparin + Stellat/brakiyal pleksus bloğu uygula.',
          'Asidik İlaçlarla & NMB’lerle Y-Site Çökelme: Rokuronyum, vekuronyum, süksinilkolin, opioidler veya Laktatlı Ringer ile aynı hatta yıkamadan verilirse anında beyaz çökelti oluşturup damar yolunu tıkar! RSI sırasında tiyopental ile kas gevşetici arasına mutlaka 10–20 mL %0,9 NaCl (SF) flush yapılmalıdır.',
          'Sıfır-Derece (Zero-Order) Kinetik & Uzamış Koma / Rebound Hiperkalemi: Tek bolusta hızlı uyanma (5–10 dk) redistribüsyonla olur; ancak yüksek doz veya sürekli infüzyonlarda hepatik metabolizma doygunluğa ulaşır → t½ > 11–36 saat, derin hipotansiyon, ciddi hipokalemi (intraselüler şift) ve infüzyon kesilince ölümcül rebound hiperkalemi!',
        ]}
        antidoteOrRescue="Spesifik Farmakolojik Antidot YOKTUR: Solunum/havayolu ve vazopresör destek esastır. Kazara İntra-Arteriyel Enjeksiyon Kurtarma: Kateteri ÇEKME → 10–20 mL SF dilüsyon → IA Lidokain 40–80 mg veya Papaverin 40–80 mg → Sistemik Heparin 5000 U → Stellat ganglion / brakiyal pleksus bloğu. Barbitürat Koması Hipokalemisi: Aşırı K⁺ replasmanından kaçının (hedef 3,0–3,5 mEq/L); infüzyon kesilirken seri K⁺ ve EKG izlemi yapın (rebound hiperkalemi/VF riski)."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. BAŞLIK, FARMAKOLOJİK KATEGORİ & YATAK BAŞI ETKİ MEKANİZMASI      */}
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
              <span className="font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Ultra-Kısa Etkili Tiyobarbitürat · GABA-A Agonisti
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Standart %2,5 (25 mg/mL) · pH ~10,5–11,0 · High-Alert
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Pental Sodyum® · Tyosod® (0,5 g / 1 g Flakon)
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">ATC: N01AF03</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Tiyopental Sodyum (Pental Sodyum® / Tyosod®) Monografisi
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong>{' '}
              Yüksek lipofilisitesi sayesinde tek kol-beyin dolaşım süresinde (<strong>15–30 saniye</strong>) derin
              hipnoz oluşturan ultra-kısa etkili intravenöz tiyobarbitürattır. Genel anestezi indüksiyonu (özellikle
              obstetrik sezaryen RSI ve EKT), maksimum tedaviye dirençli refrakter intrakraniyal hipertansiyonda{' '}
              <strong>barbitürat koması</strong> (BTF 2017 Level IIB) ve <strong>süper-refrakter status epileptikus</strong>{' '}
              (SRSE) kurtarma tedavisinde kritik rol oynar.
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

        {/* Yatak Başı Kısa Klinik Etki Mekanizması (#sec-etki) — 3 Konsantre Kart */}
        <div id="sec-etki" className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-200' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-teal-600 dark:text-teal-400">
              <span className="flex items-center gap-1.5">
                <Brain className="w-4 h-4 shrink-0" />
                <span>GABA-A Cl⁻ Kanal Süresi ↑</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-teal-500/15 shrink-0">Onset: 15–30 sn</span>
            </div>
            <p className="text-xs leading-relaxed">
              GABA-A reseptör β-altünitesine bağlanarak Cl⁻ kanalının <strong>açık kalma süresini uzatır</strong>;
              yüksek konsantrasyonda doğrudan GABA-mimetik etki gösterir ve AMPA/kainat glutamat iletimini baskılar.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-indigo-950/20 border-indigo-900/50 text-indigo-200' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 shrink-0" />
                <span>CMRO₂ &amp; CBF Paralel %50–55 ↓</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/15 shrink-0">İKB &amp; Burst-Supresyon</span>
            </div>
            <p className="text-xs leading-relaxed">
              Serebral metabolik oksijen tüketimini (<strong>CMRO₂</strong>) ve serebral kan akımını (<strong>CBF</strong>)
              izoelektrik EEG tavanına kadar paralel düşürerek <strong>refrakter İKB&apos;yi</strong> ve epileptiform
              aktiviteyi güçlü biçimde baskılar.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Analjezi YOK (Antianaljezik!)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15 shrink-0">pH ~10,5–11,0</span>
            </div>
            <p className="text-xs leading-relaxed">
              Analjezik etkisi yoktur; aksine subanestezik dozlarda ağrı eşiğini düşürür (<strong>hiperaljezi</strong>).
              Güçlü alkali yapısı nedeniyle <strong>intra-arteriyel enjeksiyonda kristalleşip nekroz</strong> yapar.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FARMAKOKİNETİK (ADME) ÖZELLİKLERİ AKORDİYONU (#sec-pkpd)         */}
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                <span>Farmakokinetik (ADME) Özellikleri</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  Onset: 15–30 sn · Redistribüsyon: 5–10 dk · t½: 11–12 sa (İnfüzyonda &gt;36 sa)
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                pKa 7,6 (%61 non-iyonize), %80–85 albümin bağlanması, redistribüsyonla uyanma, aktif pentobarbital metaboliti ve sıfır-derece kinetik.
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
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  15 – 30 saniye
                </span>
                <span className="text-[10px] text-slate-400">1 kol-beyin dolaşım süresi · pKa 7,6</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Tek Bolus Uyanma
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  5 – 10 dakika
                </span>
                <span className="text-[10px] text-slate-400">Redistribüsyon (metabolizma değil!)</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Albümin Bağlanma &amp; Vd
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  %80–85 · 2,0–2,5 L/kg
                </span>
                <span className="text-[10px] text-slate-400">Hipoalbüminemi/üremide serbest ↑</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Eliminasyon t½ (CSHT)
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  11 – 12 saat (24–36+ sa)
                </span>
                <span className="text-[10px] text-slate-400">Uzun infüzyonda sıfır-derece kinetik!</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Ultra-Hızlı Santral Geçiş (pKa 7,6 &amp; Lipofilite):
                </strong>{' '}
                C2 pozisyonundaki kükürt atomu (tiyobarbitürat yapısı) tiyopentale yüksek yağda çözünürlük kazandırır.
                <strong> pKa değeri 7,6</strong> olduğundan fizyolojik arter kanında (pH 7,4) ilacın yaklaşık{' '}
                <strong>%61&apos;i non-iyonize</strong> (serbest geçebilir) formdadır; bu sayede kan-beyin bariyerini{' '}
                <strong>15–30 saniyede</strong> (tek kol-beyin dolaşım süresi) aşarak pik hipnotik etkiye ulaşır.
                Asidozda non-iyonize fraksiyon daha da artarak santral etkiyi derinleştirir.
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Uyanma Mekanizması — Redistribüsyon (3 Kompartmanlı Model):
                </strong>{' '}
                Tek bir indüksiyon bolusu sonrası <strong>5–10 dakika</strong> içinde bilinç dönüşü hepatik
                eliminasyonla değil, ilacın yüksek perfüzyonlu beyin dokusundan (damardan zengin kompartman) önce{' '}
                <strong>iskelet kasına</strong> (15–30 dk içinde pik) ve ardından <strong>yağ dokusuna</strong>{' '}
                yeniden dağılmasıyla (<em>redistribüsyon</em>) gerçekleşir.
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Hepatik Metabolizma, Aktif Pentobarbital &amp; Sıfır-Derece (Zero-Order) Kinetik:
                </strong>{' '}
                Karaciğerde mikrozomal CYP enzimleriyle yavaş oksidasyona uğrar (saatte yalnızca{' '}
                <strong>%10–15</strong> metabolize edilir) ve yaklaşık %3–5 oranında desülfürasyonla farmakolojik olarak{' '}
                <strong>aktif pentobarbital</strong>&apos;e dönüşür. Standart eliminasyon yarı ömrü{' '}
                <strong>11–12 saat</strong>tir; ancak tekrarlayan boluslar veya sürekli infüzyonlarda (barbitürat
                koması / SRSE) periferik yağ/kas depoları doyduğunda <strong>bağlam duyarlı yarı ömür (CSHT)</strong>{' '}
                dik biçimde uzar, hepatik enzimler doygunluğa ulaşarak <strong>sıfır-derece (zero-order) kinetiğe</strong>{' '}
                geçer ve eliminasyon yarı ömrü <strong>24–36+ saate</strong> (obezlerde daha da uzun) çıkar!
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. KONTRENDİKASYONLAR — ENDİKASYONLARDAN ÖNCE (#sec-kontrendikasyon) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="sec-kontrendikasyon"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Akut İntermitan Porfiri (AIP), Variegata Porfiri ve Herediter Koproporfiri (KESİN KONTRENDİKASYON): Hepatik δ-ALA sentaz (ALAS1) indüksiyonu ile ölümcül nörovisseral porfiri krizi (karın ağrısı, otonomik fırtına, kuadriparezi, solunum arresti) tetikler.',
          'Barbitüratlara veya sodyum karbonat yardımcı maddesine karşı doğrulanmış aşırı duyarlılık / anafilaksi öyküsü.',
          'Kontrolsüz ciddi havayolu obstrüksiyonu veya akut status astmatikus: Histamin salınımı ve laringeal reflekslerin yetersiz baskılanması nedeniyle şiddetli laringospazm ve refrakter bronkospazm tetikleyebilir.',
          'Havayolu yönetim ekipmanı, oksijen ve resüsitasyon imkânının bulunmadığı koşullar.',
        ]}
        relativeTitle="Göreceli Kontrendikasyonlar & Yüksek Riskli Durumlar"
        relativeItems={[
          'Dekompanse şok, ağır hipovolemi, konstrüktif perikardit veya kardiyak tamponad: Venöz kapasitans artışı (venodilatasyon) ve direkt miyokardiyal depresyon nedeniyle ön yük bağımlı hastalarda ani kardiyovasküler kollaps oluşturur.',
          'Profilaktik TBH burst-supresyonu (BTF 4th Ed. 2017): Şiddetli travmatik beyin hasarında yüksek İKB gelişmeden profilaktik barbitürat koması ÖNERİLMEZ (hipotansiyon/enfeksiyon riski, sağkalım faydası yok).',
          'Ağır hipoalbüminemi, ileri karaciğer yetmezliği veya üremik KBY: Protein bağlanması (%80–85) düşerek serbest aktif ilaç fraksiyonu artar; ciddi doz azaltımı şarttır.',
          'Miyastenia gravis, distrofia miyotonika veya ağır kontrolsüz hipotansiyon/adrenal yetmezlik: Uzamış solunum depresyonu ve hemodinamik çökme riski yüksektir.',
        ]}
        clinicalNote="Akut porfiri öyküsü veya ailede açıklanamayan nörovisseral atak şüphesi olan hastalarda Tiyopental ASLA kullanılmamalı; güvenli alternatif olarak Propofol tercih edilmelidir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. ENDİKASYONLAR & KLİNİK KANIT (#sec-endikasyon)                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-endikasyon"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Endikasyonlar &amp; Klinik Kanıt (BTF 2017 · NCS 2012 · Pental KÜB)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. Genel Anestezi İndüksiyonu & RSI */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Syringe className="w-4 h-4 text-teal-500 shrink-0" />
                <span>1. Genel Anestezi İndüksiyonu, Obstetrik RSI &amp; EKT</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                3–5 mg/kg IV
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Sağlıklı erişkinde <strong className="font-mono text-slate-900 dark:text-white">3–5 mg/kg IV</strong>{' '}
              ile 15–30 sn içinde hızlı, öngörülebilir bilinç kaybı sağlar. Özellikle{' '}
              <strong>acil sezaryen (obstetrik RSI: 4 mg/kg)</strong> ve{' '}
              <strong>Elektrokonvülsif Tedavi (EKT: 1,5–3 mg/kg)</strong> protokollerinde yaygın olarak tercih edilir.
            </p>
          </div>

          {/* 2. Refrakter İntrakraniyal Hipertansiyon / Barbitürat Koması */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>2. Refrakter İKB / Barbitürat Koması (TBH)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shrink-0">
                BTF 2017 · Level IIB
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yalnızca maksimum standart medikal ve cerrahi tedaviye (ozmoterapi, sedasyon, BOS drenajı, dekompresif
              kraniyektomi) <strong>dirençli yüksek İKB</strong> kontrolünde uygulanır (profilaktik burst-supresyon
              önerilmez!). Sürekli EEG ve hemodinamik/vazopresör destek (CPP ≥ 60–70 mmHg) zorunludur.
            </p>
          </div>

          {/* 3. Süper-Refrakter Status Epileptikus (SRSE) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>3. Süper-Refrakter Status Epileptikus (SRSE)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                NCS 2012 · 3–5 mg/kg/sa
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Midazolam/Propofol infüzyonuna rağmen devam eden SRSE&apos;de{' '}
              <strong className="font-mono text-slate-900 dark:text-white">3–5 mg/kg IV bolus</strong> (gerekirse 1–2
              mg/kg q3–5dk ek bolus) ardından{' '}
              <strong className="font-mono text-slate-900 dark:text-white">3–5 mg/kg/saat</strong> sürekli infüzyonla
              24–48 saat EEG burst-supresyon hedeflenir.
            </p>
          </div>

          {/* 4. Akut Konvülsiyon / LAST Kurtarma */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>4. Akut Konvülsiyon / Lokal Anestezik Toksisitesi (LAST)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                75–125 mg (3–5 mL %2,5)
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Pental Sodyum KÜB kapsamında anestezi/lokal anestezik kaynaklı akut nöbetlerde{' '}
              <strong className="font-mono text-slate-900 dark:text-white">75–125 mg IV</strong> (%2,5 çözeltiden{' '}
              <strong>3–5 mL</strong>) hızlı nöbet sonlandırma sağlar. (Not: LAST&apos;ta 1. seçenek benzodiazepin +
              %20 Lipid Emülsiyonu olup tiyopental kardiyak depresyon riski nedeniyle dikkatle kullanılır.)
            </p>
          </div>
        </div>

        {/* Klinik Kanıt Kutuları */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-indigo-950/20 border-indigo-900/50 text-indigo-100' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0" />
                <span>Brain Trauma Foundation (BTF 4th Ed., Neurosurgery 2017)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 shrink-0">
                PMID: 27654000
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              <strong>Level IIB Önerisi:</strong> Yüksek doz barbitürat tedavisi yalnızca maksimum standart medikal ve
              cerrahi İKB düşürücü tedaviye dirençli yüksek İKB&apos;yi kontrol etmek için önerilir; öncesinde ve
              tedavi boyunca <strong>hemodinamik stabilite (CPP ≥ 60–70 mmHg)</strong> zorunludur. Profilaktik EEG
              burst-supresyonu önerilmez.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-100' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 shrink-0" />
                <span>Neurocritical Care Society (Brophy et al., Neurocrit Care 2012)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200 shrink-0">
                PMID: 22528274
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Refrakter / Süper-Refrakter Status Epileptikus yönetiminde Tiyopental (<strong>3–5 mg/kg</strong> bolus →{' '}
              <strong>3–5 mg/kg/saat</strong> cEEG burst-supresyon titrasyonu) güçlü antiepileptik etkinlik sağlar;
              ancak belirgin hipotansiyon, ileus, immünosupresyon ve uzun yarı ömür nedeniyle mekanik ventilasyon ve
              vazopresör eşliğinde uygulanır.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. DOZAJ KADEMELERİ & KLİNİK SENARYO REJİMLERİ (#sec-dozaj)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozaj"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Dozaj Kademeleri &amp; Klinik Senaryo Rejimleri
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Standart %2,5 Çözelti: 25 mg/mL (1 g / 40 mL)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Kademe 1: Erişkin / Geriatrik / Pediatrik İndüksiyon */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'induction_rsi' && (profile === 'adult_asa12' || profile === 'geriatric_frail' || profile === 'pediatric')
                ? 'border-teal-500 bg-teal-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                  Genel İndüksiyon
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  IV Bolus
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                3 – 5 <span className="text-xs font-sans font-normal text-slate-500">mg/kg IV</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>Erişkin ASA I–II:</strong> 3–5 mg/kg. <strong>Geriatrik / ASA III–IV:</strong> 1,5–2,5 mg/kg
                (yavaş titre). <strong>Pediatrik:</strong> 5–6 mg/kg (maks 7 mg/kg).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-teal-600 dark:text-teal-400 font-medium">
              ✓ Obezlerde LBW ile hesapla · NMB öncesi SF flush
            </div>
          </div>

          {/* Kademe 2: Obstetrik RSI & EKT */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'induction_rsi' && (profile === 'obstetric_rsi' || profile === 'ect')
                ? 'border-indigo-500 bg-indigo-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  Obstetrik RSI &amp; EKT
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                  Özel İndüksiyon
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                4 mg/kg <span className="text-xs font-sans font-normal text-slate-500">· EKT 1,5–3</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>Sezaryen RSI:</strong> 4 mg/kg IV (neonatal depresyon minimal; &gt;7–8 mg/kg aşma).{' '}
                <strong>EKT:</strong> 1,5–3 mg/kg (nöbet eşiğini aşırı yükseltmeden hipnoz).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
              ✓ Akut Konvülsiyon: 75–125 mg (3–5 mL %2,5)
            </div>
          </div>

          {/* Kademe 3: Refrakter İKB Barbitürat Koması */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'icp_coma'
                ? 'border-amber-500 bg-amber-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  Refrakter İKB Koması
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  BTF 2017
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                1 – 5 <span className="text-xs font-sans font-normal text-slate-500">mg/kg/saat</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>Yükleme:</strong> 3–5 mg/kg (veya 5–10 mg/kg, 30 dk yavaş IV). <strong>İdame:</strong> 1–5
                mg/kg/saat sürekli infüzyon (cEEG burst-supresyon &amp; İKB &lt; 20–22 mmHg hedefi).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              ⚠ CPP ≥ 60–70 mmHg · K⁺ şift &amp; rebound riski!
            </div>
          </div>

          {/* Kademe 4: SRSE İnfüzyon */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'status_epilepticus'
                ? 'border-rose-500 bg-rose-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  SRSE İnfüzyon
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  NCS 2012
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                3 – 5 <span className="text-xs font-sans font-normal text-slate-500">mg/kg/saat</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>Bolus:</strong> 3–5 mg/kg IV (+ gerekirse 1–2 mg/kg q3–5dk) → <strong>İdame:</strong> 3–5
                mg/kg/saat (24–48 saat burst-supresyon sonrası kademeli azaltma).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-rose-600 dark:text-rose-400 font-medium">
              ⚠ Sıfır-derece kinetik · Santral hat tercihli
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. 4 SEKMELİ İNTERAKTİF HESAPLAYICI (#sec-hesaplayici)              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif Klinik Doz, %2,5 / %1 İnfüzyon &amp; İntra-Arteriyel Kurtarma Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pental Sodyum® / Tyosod® 0,5 g &amp; 1 g Flakon · Standart %2,5 (25 mg/mL) ve %1 (10 mg/mL) Pompa Modları
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setScenario('induction_rsi');
              setWeightKg(70);
              setProfile('adult_asa12');
              setInductionMgKg(4.0);
              setIcpWeightKg(70);
              setIcpLoadMode('standard_3_5');
              setIcpLoadMgKg(5.0);
              setIcpMaintMgKgHr(2.5);
              setIcpConc('conc_25');
              setSrseWeightKg(70);
              setSrseBolusMode('weight_based');
              setSrseBolusMgKg(4.0);
              setSrseMaintMgKgHr(3.0);
              setSrseConc('conc_25');
              setCheckedSteps({});
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
              isDark
                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Varsayılana Sıfırla</span>
          </button>
        </div>

        {/* 4 Klinik Senaryo Sekmesi */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { id: 'induction_rsi', label: '1. İndüksiyon & RSI (%2,5)' },
            { id: 'icp_coma', label: '2. Refrakter İKB Koması (BTF)' },
            { id: 'status_epilepticus', label: '3. SRSE İnfüzyon (NCS)' },
            { id: 'ia_emergency', label: '4. İntra-Arteriyel Kurtarma' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setScenario(tab.id as CalcScenario)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                scenario === tab.id
                  ? tab.id === 'ia_emergency'
                    ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 shadow-xs'
                    : 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300 shadow-xs'
                  : isDark
                  ? 'border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: İNDÜKSİYON & RSI */}
        {scenario === 'induction_rsi' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Sol: Ağırlık & Profil Seçimi */}
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor={weightSliderId}
                      className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400"
                    >
                      Hasta Ağırlığı (Obezlerde LBW Girin!)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={weightInputId}
                        type="number"
                        min={5}
                        max={150}
                        value={weightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!Number.isNaN(val)) setWeightKg(Math.max(5, Math.min(150, val)));
                        }}
                        className={`w-16 px-2 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={weightSliderId}
                    type="range"
                    min={5}
                    max={150}
                    step={1}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>5 kg</span>
                    <span>40 kg</span>
                    <span>70 kg</span>
                    <span>110 kg</span>
                    <span>150 kg</span>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Hasta Profili Seçimi
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(Object.keys(INDUCTION_PROFILES) as InductionProfile[]).map((key) => {
                      const item = INDUCTION_PROFILES[key];
                      const active = profile === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleProfileChange(key)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'border-teal-500 bg-teal-500/15 text-teal-800 dark:text-teal-200'
                              : isDark
                              ? 'border-slate-700 bg-slate-900/70 text-slate-300 hover:bg-slate-800'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="text-xs font-bold">{item.shortLabel}</div>
                          <div className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                            {item.rangeText}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor={indDoseSliderId}
                      className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"
                    >
                      Hedef İndüksiyon Dozu (mg/kg)
                    </label>
                    <span className="font-mono text-sm font-black text-indigo-600 dark:text-indigo-400">
                      {inductionMgKg.toFixed(1)} mg/kg
                    </span>
                  </div>
                  <input
                    id={indDoseSliderId}
                    type="range"
                    min={activeProfileSpec.minMgKg}
                    max={activeProfileSpec.maxMgKg}
                    step={0.5}
                    value={inductionMgKg}
                    onChange={(e) => setInductionMgKg(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                    <span>{activeProfileSpec.minMgKg.toFixed(1)} mg/kg</span>
                    <span>{activeProfileSpec.maxMgKg.toFixed(1)} mg/kg</span>
                  </div>
                </div>
              </div>

              {/* Sağ: Hesaplama Çıktısı */}
              <div className="space-y-3">
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                    isDark ? 'bg-teal-950/20 border-teal-900/50' : 'bg-teal-50/70 border-teal-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Hesaplanan IV Doz</span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {inductionTotalMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {weightKg} kg × {inductionMgKg.toFixed(1)} mg/kg
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">%2,5 Çözelti Hacmi (25 mg/mL)</span>
                    <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
                      {inductionMl25.toFixed(1)} mL
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      1 mL = 25 mg · 4 mL = 100 mg
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border col-span-2 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        Pental Sodyum® / Tyosod® Flakon İhtiyacı:
                      </span>
                      <div className="flex flex-wrap gap-2 font-mono">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold">
                          0,5 g (+20 mL): {vials500Count} flakon
                        </span>
                        <span className="px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold">
                          1 g (+40 mL): {vials1000Count} flakon
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <strong className="text-slate-900 dark:text-white">Profil Notu ({activeProfileSpec.label}):</strong>{' '}
                  {activeProfileSpec.note}
                </div>

                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                    isDark ? 'bg-rose-950/25 border-rose-500/40 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <AlertOctagon className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                  <span>
                    <strong>RSI Çökelme Uyarısı (Araya SF Flush!):</strong> Tiyopental (pH ~10,5–11,0) ile Rokuronyum,
                    Vekuronyum veya Süksinilkolin arasına <strong>mutlaka 10–20 mL %0,9 NaCl (SF) flush</strong>{' '}
                    yapın; aksi halde damar yolu anında beyaz çökeltiyle tıkanır!
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REFRAKTER İKB BARBİTÜRAT KOMASI (BTF 2017) */}
        {scenario === 'icp_coma' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Sol Parametreler */}
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor={icpWeightSliderId}
                      className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"
                    >
                      Hasta Ağırlığı (kg)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={icpWeightInputId}
                        type="number"
                        min={10}
                        max={150}
                        value={icpWeightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!Number.isNaN(val)) setIcpWeightKg(Math.max(10, Math.min(150, val)));
                        }}
                        className={`w-16 px-2 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={icpWeightSliderId}
                    type="range"
                    min={10}
                    max={150}
                    step={1}
                    value={icpWeightKg}
                    onChange={(e) => setIcpWeightKg(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Yükleme Protokolü &amp; Pompa Konsantrasyonu
                  </span>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => handleIcpLoadModeChange('standard_3_5')}
                      className={`p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                        icpLoadMode === 'standard_3_5'
                          ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                          : isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      Standart: 3–5 mg/kg
                    </button>
                    <button
                      type="button"
                      onClick={() => handleIcpLoadModeChange('high_5_10')}
                      className={`p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                        icpLoadMode === 'high_5_10'
                          ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                          : isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      Yüksek (30 dk): 5–10 mg/kg
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIcpConc('conc_25')}
                      className={`p-2 rounded-xl border text-xs font-bold font-mono cursor-pointer ${
                        icpConc === 'conc_25'
                          ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                          : isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      %2,5 (25 mg/mL = 1 g/40 mL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIcpConc('conc_10')}
                      className={`p-2 rounded-xl border text-xs font-bold font-mono cursor-pointer ${
                        icpConc === 'conc_10'
                          ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                          : isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      %1 (10 mg/mL = 1 g/100 mL)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor={icpLoadSliderId} className="font-bold text-slate-600 dark:text-slate-300">
                        Yükleme Dozu
                      </label>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {icpLoadMgKg.toFixed(1)} mg/kg
                      </span>
                    </div>
                    <input
                      id={icpLoadSliderId}
                      type="range"
                      min={icpLoadMode === 'standard_3_5' ? 3 : 5}
                      max={icpLoadMode === 'standard_3_5' ? 5 : 10}
                      step={0.5}
                      value={icpLoadMgKg}
                      onChange={(e) => setIcpLoadMgKg(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor={icpMaintSliderId} className="font-bold text-slate-600 dark:text-slate-300">
                        İdame İnfüzyon
                      </label>
                      <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                        {icpMaintMgKgHr.toFixed(1)} mg/kg/sa
                      </span>
                    </div>
                    <input
                      id={icpMaintSliderId}
                      type="range"
                      min={1}
                      max={5}
                      step={0.5}
                      value={icpMaintMgKgHr}
                      onChange={(e) => setIcpMaintMgKgHr(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Sağ Çıktılar */}
              <div className="space-y-3">
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                    isDark ? 'bg-indigo-950/20 border-indigo-900/50' : 'bg-indigo-50/70 border-indigo-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-indigo-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Yükleme Dozu (Yavaş IV)</span>
                    <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                      {icpLoadTotalMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {icpLoadMl25.toFixed(1)} mL (%2,5) · {icpLoadMode === 'high_5_10' ? '30 dk infüzyon' : '10–15 dk yavaş'}
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-indigo-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">İdame Pompa Hızı</span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {icpMaintMlHr.toFixed(1)} mL/sa
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {icpMaintMgHr.toFixed(0)} mg/saat ({icpConcMgMl} mg/mL)
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border col-span-2 flex flex-wrap items-center justify-between gap-2 text-xs ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-indigo-100'}`}>
                    <span className="text-slate-600 dark:text-slate-300 font-semibold">
                      Tahmini 24 Saatlik Tüketim:
                    </span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      {icpDailyGrams.toFixed(1)} g / gün ({Math.ceil(icpDailyGrams)} adet 1 g flakon)
                    </span>
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                    isDark ? 'bg-amber-950/20 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <div>
                    <strong>Hemodinamik &amp; cEEG Hedefi (BTF 2017):</strong> İnfüzyon hızı sürekli EEG&apos;de{' '}
                    <strong>burst-supresyon</strong> (dakikada 3–5 burst) ve <strong>İKB &lt; 20–22 mmHg</strong>{' '}
                    hedeflenerek titre edilir. Hipotansiyon çok sıktır; <strong>CPP ≥ 60–70 mmHg</strong> için
                    Noradrenalin infüzyonu ve arteriyel hat zorunludur.
                  </div>
                  <div>
                    <strong>Potasyum (K⁺) Tuzağı:</strong> Tiyopental infüzyonu K⁺&apos;u hücre içine sokarak derin{' '}
                    <strong>hipokalemi</strong> yapar; aşırı K⁺ replasmanı infüzyon kesildiğinde ölümcül{' '}
                    <strong>rebound hiperkalemiye</strong> yol açar!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SÜPER-REFRAKTER STATUS EPİLEPTİKUS (SRSE — NCS 2012) */}
        {scenario === 'status_epilepticus' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Sol Parametreler */}
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor={srseWeightSliderId}
                      className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400"
                    >
                      Hasta Ağırlığı (kg)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={srseWeightInputId}
                        type="number"
                        min={10}
                        max={150}
                        value={srseWeightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!Number.isNaN(val)) setSrseWeightKg(Math.max(10, Math.min(150, val)));
                        }}
                        className={`w-16 px-2 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={srseWeightSliderId}
                    type="range"
                    min={10}
                    max={150}
                    step={1}
                    value={srseWeightKg}
                    onChange={(e) => setSrseWeightKg(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSrseBolusMode('weight_based')}
                    className={`p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                      srseBolusMode === 'weight_based'
                        ? 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                        : isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    SRSE Bolus (3–5 mg/kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSrseBolusMode('acute_fixed')}
                    className={`p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                      srseBolusMode === 'acute_fixed'
                        ? 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300'
                        : isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Akut Nöbet (75–125 mg)
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSrseConc('conc_25')}
                    className={`p-2 rounded-xl border text-xs font-bold font-mono cursor-pointer ${
                      srseConc === 'conc_25'
                        ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                        : isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    %2,5 (25 mg/mL)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSrseConc('conc_10')}
                    className={`p-2 rounded-xl border text-xs font-bold font-mono cursor-pointer ${
                      srseConc === 'conc_10'
                        ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                        : isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    %1 (10 mg/mL)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {srseBolusMode === 'weight_based' && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <label htmlFor={srseBolusSliderId} className="font-bold text-slate-600 dark:text-slate-300">
                          Başlangıç Bolus
                        </label>
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                          {srseBolusMgKg.toFixed(1)} mg/kg
                        </span>
                      </div>
                      <input
                        id={srseBolusSliderId}
                        type="range"
                        min={3}
                        max={5}
                        step={0.5}
                        value={srseBolusMgKg}
                        onChange={(e) => setSrseBolusMgKg(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  )}

                  <div className={srseBolusMode === 'acute_fixed' ? 'sm:col-span-2' : ''}>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor={srseMaintSliderId} className="font-bold text-slate-600 dark:text-slate-300">
                        SRSE İdame (NCS 2012)
                      </label>
                      <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                        {srseMaintMgKgHr.toFixed(1)} mg/kg/sa
                      </span>
                    </div>
                    <input
                      id={srseMaintSliderId}
                      type="range"
                      min={3}
                      max={5}
                      step={0.5}
                      value={srseMaintMgKgHr}
                      onChange={(e) => setSrseMaintMgKgHr(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Sağ Çıktılar */}
              <div className="space-y-3">
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                    isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      {srseBolusMode === 'weight_based' ? 'Başlangıç Bolus' : 'Akut Konvülsiyon Dozu'}
                    </span>
                    <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
                      {srseBolusMode === 'weight_based' ? `${srseBolusMg} mg` : '75–125 mg'}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {srseBolusMode === 'weight_based'
                        ? `${srseBolusMl25.toFixed(1)} mL (%2,5)`
                        : '3,0 – 5,0 mL (%2,5)'}
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">SRSE İdame Pompası</span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {srseMaintMlHr.toFixed(1)} mL/sa
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {srseMaintMgHr.toFixed(0)} mg/saat ({srseConcMgMl} mg/mL)
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border col-span-2 text-xs ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-amber-100 text-slate-700'}`}>
                    <strong>Ek Kurtarma Bolusu (q3–5 dk):</strong> Nöbet/EEG aktivitesi sürerse{' '}
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      1–2 mg/kg ({srseRepeatLowMg}–{srseRepeatHighMg} mg = {(srseRepeatLowMg / 25).toFixed(1)}–
                      {(srseRepeatHighMg / 25).toFixed(1)} mL %2,5)
                    </span>{' '}
                    tekrarlanarak burst-supresyon sağlanır.
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isDark ? 'bg-rose-950/20 border-rose-500/40 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <strong>24–48 Saat Weaning &amp; Rebound Hiperkalemi Uyarısı:</strong> SRSE&apos;de{' '}
                  <strong>24–48 saat</strong> elektrografik nöbetsizlik/burst-supresyon sağlandıktan sonra diğer
                  antiepileptikler terapötik düzeydeyken infüzyon kademeli azaltılır. Uzun yarı ömür (t½ &gt; 24–36 sa)
                  nedeniyle uyanma günler sürebilir; kesilme fazında <strong>rebound hiperkalemi</strong> açısından
                  4–6 saatlik serum K⁺ ve sürekli EKG izlemi şarttır!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: İNTRA-ARTERİYEL ENJEKSİYON / EKSTRAVAZASYON ACİL KURTARMA PROTOKOLÜ */}
        {scenario === 'ia_emergency' && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDark ? 'bg-rose-950/30 border-rose-500/40 text-rose-100' : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-rose-700 dark:text-rose-300">
                    Kazara İntra-Arteriyel Tiyopental Enjeksiyonu — Acil 6 Adımlı Kurtarma Kontrol Listesi
                  </h3>
                  <p className="text-xs mt-0.5 leading-relaxed">
                    Belirtiler: Distale yayılan çok şiddetli yanıcı ağrı, ciltte ani solukluk/beneklenme (blanching),
                    nabız zayıflaması. <strong>pH ~10,5–11,0</strong> çözelti arter kanında anında kristalleşir!
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-700 dark:text-rose-200 shrink-0 self-start sm:self-center">
                Tamamlanan: {completedRescueSteps} / {IA_RESCUE_STEPS.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {IA_RESCUE_STEPS.map((step) => {
                const checked = Boolean(checkedSteps[step.id]);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => toggleRescueStep(step.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      checked
                        ? isDark
                          ? 'border-emerald-500/50 bg-emerald-950/25'
                          : 'border-emerald-300 bg-emerald-50/70'
                        : isDark
                        ? 'border-slate-800 bg-slate-950/60 hover:border-rose-500/40'
                        : 'border-slate-200 bg-slate-50 hover:border-rose-300'
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        checked
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : isDark
                          ? 'border-slate-600 bg-slate-900'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div
                        className={`text-xs sm:text-sm font-bold ${
                          checked
                            ? 'text-emerald-700 dark:text-emerald-300 line-through'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {step.title}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (#sec-tr-preparat)      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Pental Sodyum® 0,5 g (500 mg) / 1 g (1000 mg) IV Flakon',
            presentation: 'Enjeksiyonluk çözelti için liyofilize açık sarı toz + sodyum karbonat tamponu',
            concentration: 'Standart %2,5 (25 mg/mL) — 0,5 g + 20 mL · 1 g + 40 mL',
            saltOrBaseNote:
              'Tiyopental sodyum higroskopik ve güçlü alkalidir (pH ~10,5–11,0). Sadece enjeksiyonluk su, %0,9 NaCl veya %5 Dekstroz ile sulandırılır; hazırlanan çözelti açık sarı-yeşilimsi berrak olmalıdır.',
            alertLevel: 'high',
          },
          {
            name: 'Tyosod® 0,5 g (500 mg) / 1 g (1000 mg) IV Flakon',
            presentation: 'Enjeksiyonluk çözelti için liyofilize toz içeren cam flakon',
            concentration: 'Standart %2,5 (25 mg/mL) · İnfüzyon %1 (10 mg/mL)',
            saltOrBaseNote:
              '0,5 g ve 1 g flakonlar dış görünüm olarak benzer olabilir; sulandırma hacmi (20 mL vs 40 mL) mutlaka çift kontrol edilmelidir.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Standart İndüksiyon & Bolus (%2,5 = 25 mg/mL): 0,5 g (500 mg) flakon + 20 mL SF/Enj. Su veya 1 g (1000 mg) flakon + 40 mL SF/Enj. Su → 1 mL = 25 mg, 4 mL = 100 mg.',
          'Sürekli İnfüzyon / Barbitürat Koması (%1 = 10 mg/mL veya %2,5 = 25 mg/mL): 1 g flakon + 100 mL SF = 10 mg/mL (%1) veya 1 g flakon + 40 mL SF = 25 mg/mL (%2,5 — sıvı kısıtlı nöro-YBÜ hastasında).',
          'Görsel Kontrol: Sulandırılmış çözelti berrak açık sarı olmalıdır; bulanıklık, renk koyulaşması veya partikül varsa KESİNLİKLE atılmalıdır.',
        ]}
        concentrationTrapWarning="%5 (50 mg/mL) ve üzerindeki konsantrasyonlar yüksek alkali pH (~11) nedeniyle ciddi venöz tromboflebit, ekstravazasyonda doku nekrozu ve kazara intra-arteriyel enjeksiyonda ekstremite gangreni riskini katlar! Erişkin ve çocuklarda daima ≤ %2,5 (25 mg/mL) kullanın."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="central-preferred"
        accessSummary="Tek bolus indüksiyon için geniş, güvenli periferik ven (tercihen antekübital) kullanılabilir; ancak sürekli infüzyonlarda (barbitürat koması / SRSE) yüksek alkali pH (~10,5–11,0) ve doku nekrozu riski nedeniyle DEDİKE SANTRAL VENÖZ LÜMEN şiddetle tercih edilir. İntra-arteriyel enjeksiyonu dışlamak için hat daima aspire edilip doğrulanmalıdır."
        phRange="10,5 – 11,0 (Çok Güçlü Alkali Sodyum Karbonat Tamponlu)"
        osmolalityNote="%2,5 çözelti enjeksiyonluk su ile hafif hipotonik, %0,9 NaCl ile hafif hipertoniktir. Yüksek pH nedeniyle asidik tüm ilaçlarla anında serbest tiyopental asidi olarak çökelir!"
        compatibleDiluents={[
          'Enjeksiyonluk Su (Steril Su)',
          '%0,9 Sodyum Klorür (SF)',
          '%5 Dekstroz (D5W)',
        ]}
        stabilityNote="Koruyucu içermez; taze hazırlanmalı ve 24 saat içinde (buzdolabında 2–8 °C'de 24–48 saat, oda sıcaklığında tercihen <24 saat) tüketilmelidir. Bulanıklaşan çözelti asla kullanılmaz."
        ySiteCompatible={[
          '%0,9 NaCl (SF)',
          '%5 Dekstroz',
          'Sodyum Bikarbonat (Alkali)',
          'Furosemid (ayrı flush önerilir)',
        ]}
        ySiteIncompatible={[
          'Ringer Laktat (asidik/Ca²⁺ — anında çökelti!)',
          'Rokuronyum (beyaz çökelti — RSI’da 10–20 mL SF flush!)',
          'Vekuronyum (anında çökelti!)',
          'Atrakuryum / Sisatrakuryum',
          'Süksinilkolin (hızlı hidroliz & çökelti!)',
          'Fentanil / Sufentanil / Morfin',
          'Midazolam',
          'Ketamin',
          'Epinefrin / Noradrenalin',
          'Dopamin / Dobutamin',
          'Lidokain',
          'Tüm asidik çözeltiler (pH < 7)',
        ]}
        extravasationProtocol="Ekstravazasyon / İntra-Arteriyel Güvenlik: Ekstravazasyonda infüzyonu durdurun, kanülden olabildiğince ilacı aspire edin, subkutan %1 Prokain/Lidokain veya SF dilüsyonu + ılık kompres ve elevasyon uygulayın. Kazara İntra-Arteriyel enjeksiyonda kateteri ASLA çekmeyin; yukarıdaki 6 adımlı IA Kurtarma Protokolünü (SF dilüsyon + IA Lidokain/Papaverin + Heparin + Stellat/Brakiyal blok) derhal başlatın!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="Ağır KBY'de (GFR < 10–15 mL/dk) Pental KÜB uyarınca dozun %75'i uygulanır; üremi ve hipoalbüminemi protein bağlanmasını azaltarak serbest aktif ilaç fraksiyonunu belirgin artırır!"
        renalDetails={[
          'Üremik Protein Bağlanma Azalması: Tiyopental %80–85 oranında albümine bağlanır. İleri böbrek yetmezliğinde biriken üremik toksinler ve eşlik eden hipoalbüminemi ilacı bağlanma bölgelerinden ayırarak serbest aktif fraksiyonu ve santral/kardiyak duyarlılığı artırır.',
          'Pental Sodyum KÜB Önerisi: Ağır böbrek yetmezliğinde (CrCl < 10 mL/dk) standart dozun %75’inin uygulanması ve yavaş titre edilmesi önerilir.',
          'Kardiyovasküler Not (Düşük EF / Şok / Tamponad): Venodilatasyon ve direkt miyokardiyal depresyon nedeniyle ön yük bağımlı kardiyak hastalarda (ciddi aort darlığı, tamponad, konstrüktif perikardit, düşük EF) doz %50 azaltılmalı veya etomidat/ketamin seçilmelidir.',
        ]}
        hepaticSummary="Karaciğerde yavaş CYP/oksidasyonla metabolize olur; siroz ve hipoalbüminemide serbest fraksiyon artar ve eliminasyon uzar — indüksiyon dozu %25–50 azaltılmalı, sürekli infüzyondan kaçınılmalıdır."
        hepaticDetails={[
          'İndüksiyon Dozu: Tek bolus sonrası uyanma redistribüsyonla olduğu için hafif hepatik yetmezlikte uyanma belirgin gecikmeyebilir; ancak hipoalbüminemi nedeniyle serbest ilaç arttığından indüksiyon dozu %25–50 azaltılarak yavaş titre edilmelidir.',
          'Uzun İnfüzyon / Tekrarlayan Dozlar: Child-Pugh B/C sirozda hepatik klirens belirgin düşer, aktif pentobarbital birikimi ve sıfır-derece kinetik nedeniyle çok uzun süreli koma ve hipotansiyon gelişir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="İndüksiyon Dozunu %30–50 Azalt (1,5–2,5 mg/kg)"
        geriatricPoints={[
          'Santral Kompartman (V1) Küçülmesi: Yaşlılarda (>65 yaş) santral dağılım hacmi belirgin azaldığı için standart erişkin dozu çok yüksek pik plazma konsantrasyonu, derin hipotansiyon ve uzamış apne oluşturur.',
          'Titrasyon Kuralı: İndüksiyon dozu 1,5–2,5 mg/kg (%30–50 azaltılmış) düzeyinde seçilmeli; yavaş kol-beyin dolaşım süresi nedeniyle ek bolus vermeden önce 45–60 saniye beklenmelidir.',
        ]}
        obesityWeightScalarBadge="İndüksiyon: LBW (Yağsız Ağırlık) · Yağ Dokusunda Birikim!"
        obesityPoints={[
          'İndüksiyon Doz Ölçekleme (LBW): Morbid obez hastalarda indüksiyon bolusu gerçek vücut ağırlığına (TBW) göre değil, Yağsız Vücut Ağırlığına (LBW) göre hesaplanmalıdır; TBW kullanımı aşırı kardiyovasküler depresyon yapar.',
          'Lipofilik Birikim & Uzamış Derlenme: Yüksek yağda çözünürlüğü nedeniyle yağ dokusu dev bir rezervuar gibi davranır; dağılım hacmi (Vd) ve eliminasyon t½ (24–36+ saat) belirgin uzayarak tekrarlayan dozlarda veya infüzyonda uyanmayı ciddi biçimde geciktirir.',
        ]}
        clinicalNote="Hem yaşlı hem morbid obez hastalarda hızlı uyanma ve öngörülebilir derlenme hedefleniyorsa Tiyopental yerine Propofol veya kısa etkili TCI rejimleri genellikle daha avantajlıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. GEBELİK & LAKTASYON (#sec-gebelik)                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Plasentayı hızla geçer; ancak sezaryen genel anestezi (RSI) indüksiyonunda 4 mg/kg dozuyla fetal depresyon minimaldir (>7–8 mg/kg yenidoğan depresyonuna yol açar)."
        pregnancyDetails={[
          'Uteroplasental Kinetik: Yüksek lipofilisitesi nedeniyle maternal enjeksiyondan 30–60 saniye sonra umblikal ven kanında saptanır; ancak fetal karaciğer ilk geçiş tutulumu ve hızlı maternal redistribüsyon sayesinde 4 mg/kg dozunda Apgar skorları üzerine olumsuz etkisi minimaldir.',
          'Doz Tavanı: Obstetrik indüksiyonda 4 mg/kg (maksimum 7 mg/kg) aşılmamalıdır; >7–8 mg/kg dozları belirgin yenidoğan SSS ve solunum depresyonu yapar.',
          'Uterus Tonusu: İndüksiyon dozlarında uterus tonusunu veya oksitosin yanıtını anlamlı biçimde bozmaz.',
        ]}
        lactationSummary="Anne sütüne düşük miktarda geçer; tek indüksiyon dozu sonrası yenidoğanda klinik sedasyon nadirdir ancak KÜB uyarınca kısa süreli ara veya işlem öncesi süt sağımı önerilir."
        lactationDetails={[
          'Pental Sodyum KÜB: Tiyopental anne sütüne geçtiğinden emziren annelerde indüksiyon öncesi süt sağımı yapılması ve uygulama sonrası (özellikle tekrarlayan dozlarda) 24 saat emzirmeye ara verilmesi veya yenidoğanın sedasyon açısından izlenmesi önerilir.',
          'Uzun süreli barbitürat koması/infüzyon sırasında emzirme kesinlikle durdurulmalıdır.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. OLUMSUZ ETKİLER (#sec-olumsuz)                                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="sec-olumsuz"
        items={[
          {
            title: 'Hipotansiyon & Refleks Taşikardi',
            incidenceOrSeverity: 'Çok Sık · Hipovolemide Kollaps!',
            detail:
              'Santral sempatik tonus azalması, periferik venodilatasyon (ön yük ↓) ve direkt miyokardiyal depresyonla kan basıncını düşürür. Baroreseptör refleksi kısmen korunduğundan refleks taşikardi görülür; hipovolemide kardiyak kollaps gelişir.',
            tone: 'rose',
          },
          {
            title: 'Apne, Solunum Depresyonu & Laringospazm/Bronkospazm',
            incidenceOrSeverity: 'Doz Bağımlı · Histamin Salınımı',
            detail:
              'Medüller solunum merkezinin CO₂ yanıtını baskılayarak 30–60 sn içinde apne yapar. Havayolu reflekslerini propofol kadar iyi baskılamaz ve histamin salınımı yapabilir; yüzeyel anestezide laringospazm/bronkospazm (LMA yerleşimi için propofolden kötüdür!).',
            tone: 'amber',
          },
          {
            title: 'Bifazik Potasyum Bozukluğu (Hipokalemi → Rebound Hiperkalemi)',
            incidenceOrSeverity: 'Barbitürat Komasında Ölümcül Tuzak!',
            detail:
              'Sürekli infüzyon sırasında K⁺ hücre içine kayarak derin hipokalemi (<2,5–3,0 mEq/L) oluşturur. Bu dönemde agresif K⁺ replasmanı yapılırsa, infüzyon kesildiğinde hücre dışına çıkan K⁺ ani ve ölümcül rebound hiperkalemi / VF tetikler!',
            tone: 'rose',
          },
          {
            title: 'İntra-Arteriyel Nekroz, Soğukluk/Titreme & İmmünosupresyon',
            incidenceOrSeverity: 'pH ~10,5–11,0 · Uzun İnfüzyonda Pnömoni',
            detail:
              'Ekstravazasyon ve intra-arteriyel enjeksiyon ciddi doku nekrozu/gangren yapar. Derlenmede belirgin üşüme/titreme görülür. Çok günlük barbitürat komasında lökosit kemotaksisi bozulur; ventilatör ilişkili pnömoni (VİP) ve ileus insidansı çok yüksektir.',
            tone: 'indigo',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. ÖZEL KLİNİK DURUMLAR (#sec-ozel-durumlar)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="sec-ozel-durumlar"
        items={[
          {
            title: 'İntra-Arteriyel Enjeksiyon & Ekstravazasyon Acil Yönetimi',
            detail:
              'pH ~10,5–11,0 olan tiyopental arter kanıyla (pH 7,4) temas ettiğinde anında tiyopental serbest asit kristalleri halinde çökerek endotelyal hasar, şiddetli vazospazm ve tromboz yapar. Kateteri ASLA çekmeden 10–20 mL SF dilüsyonu + IA Lidokain/Papaverin (40–80 mg) + sistemik Heparin (5000 U) + Stellat/Brakiyal pleksus bloğu uygulanmalıdır.',
          },
          {
            title: 'Barbitürat Komasında Hipokalemi → Rebound Hiperkalemi Tuzağı',
            detail:
              'Refrakter İKB veya SRSE için tiyopental infüzyonu alan hastalarda saatler içinde ciddi hipokalemi gelişir (total vücut K⁺ kaybı değil, intraselüler şift!). Bu hipokalemi agresif şekilde (yüksek mEq KCl ile) düzeltilirse, infüzyon durdurulduğunda hücre içindeki potasyum plazmaya geri boşalır ve refrakter hiperkalemik kardiyak arrest gelişir. K⁺ yalnızca <3,0 mEq/L veya aritmi varsa konservatif olarak yerine konmalıdır.',
          },
          {
            title: 'Akut Porfiri & Farmakogenetik',
            detail:
              'Tiyopental hepatik sitokrom P450 ve hem biyosentez yolağındaki hız kısıtlayıcı δ-ALA sentaz (ALAS1) enzimini güçlü biçimde indükler. Akut İntermitan Porfiri (AIP), Variegata Porfiri ve Herediter Koproporfiri taşıyıcılarında tek bir indüksiyon dozu bile ölümcül nörovisseral krizi tetikleyebilir — kesinlikle kontrendikedir.',
          },
          {
            title: 'Analjezik Etki YOKTUR (Antianaljezik / Hiperaljezik Etki!)',
            detail:
              'Tiyopentalin nosiseptif analjezik özelliği yoktur; dahası subanestezik (düşük) konsantrasyonlarda ağrı eşiğini düşürerek hiperaljezi (antianaljezik etki) ve ağrılı uyarana abartılı otonomik yanıt oluşturur. Cerrahi uyaran öncesi mutlaka opioid veya rejyonal analjezi ile desteklenmelidir.',
          },
          {
            title: 'Context-Sensitive Half-Time (CSHT) & Sıfır-Derece Kinetik',
            detail:
              'Propofolün aksine tiyopentalin bağlam duyarlı yarı ömrü infüzyon süresi uzadıkça dramatik biçimde dikleşir. Periferik yağ/kas depoları dolduğunda ve hepatik oksidasyon (%10–15/saat) doygunluğa ulaştığında sıfır-derece kinetiğe geçilir; birkaç günlük barbitürat koması sonrası ilacın tamamen temizlenmesi ve beyin ölümü değerlendirmesinin güvenle yapılabilmesi 3–7 günü bulabilir!',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. DERİN FARMAKODİNAMİK ANALİZ (#sec-derin-pd, 4 Kademe)           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'GABA-A β-Altünite Allosterik Modülasyonu, Cl⁻ Kanal Açık Kalma Süresi & Eksitatör Kanal Blokajı',
          summary:
            'Tiyopental, pentamerik GABA-A reseptör kompleksinin transmembran β-altünite arayüzüne bağlanarak benzersiz bir biyofiziksel profil sergiler (Miller’s 10th Ed. / Stoelting’s 6th Ed.):',
          points: [
            'Cl⁻ Kanal Açık Kalma Süresinin Uzatılması (Barbitürat vs Benzodiazepin Farkı): Benzodiazepinler (α/γ arayüzü) GABA varlığında Cl⁻ kanalının açılma FREKANSINI artırırken, Tiyopental (β-altünite bölgesi) kanalın AÇIK KALMA SÜRESİNİ (open duration) uzatarak çok daha güçlü nöronal hiperpolarizasyon sağlar.',
            'Yüksek Konsantrasyonda Doğrudan GABA-Mimetik Agonist Etki: Benzodiazepinlerin aksine (tavan etkisi vardır), Tiyopental yüksek terapötik/toksik konsantrasyonlarda endojen GABA olmadan bile Cl⁻ kanalını doğrudan açabilir — bu özellik derin anestezi, izoelektrik EEG ve yüksek dozda kardiyorespiratuar arrest potansiyelini açıklar.',
            'Eksitatör Reseptör İnhibisyonu (AMPA/Kainat & Nikotinik ACh): Postsinaptik AMPA/kainat glutamat reseptörlerini ve santral/otonomik nikotinik asetilkolin (nAChR) reseptörlerini bloke ederek eksitatör sinaptik iletimi ek olarak baskılar.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Cl⁻ Akışı, K⁺ İntraselüler Şift Dinamiği, ALAS1 Transkripsiyonu & pKa 7,6 / pH 10,5 Kristalleşme',
          summary:
            'Membran hiperpolarizasyonunun ötesinde Tiyopental üç kritik hücresel ve fizikokimyasal mekanizmayı tetikler:',
          points: [
            'K⁺ İntraselüler Şift Mekanizması (Hipokalemi → Rebound Hiperkalemi): Barbitürat koması konsantrasyonlarında tiyopental, voltaj-kapılı ve ATP-duyarlı gecikmiş K⁺ kanallarını inhibe ederek potasyumun hücre dışına çıkışını azaltır; eşzamanlı β-adrenerjik/insülin etkileşimi ve Na⁺/K⁺-ATPaz aktivitesiyle K⁺ hücre içinde birikir. İnfüzyon kesilip kanal blokajı kalktığında K⁺ hızla ekstraselüler alana dönerek ani rebound hiperkalemi oluşturur.',
            'Nöronal Metabolik Baskılanma & Mitokondriyal O₂ Tasarrufu: Sürekli Cl⁻ girişi ve aksiyon potansiyeli susturulmasıyla Na⁺/K⁺-ATPaz enerji tüketimi düşer; serebral metabolik hız (CMRO₂) bazal hücresel bütünlük düzeyine (%45–50) kadar iner (izoelektrik EEG sonrası ek doz CMRO₂’yi daha fazla düşürmez — metabolik tavan!).',
            'Hepatositlerde ALAS1 (δ-ALA Sentaz) İndüksiyonu: Nükleer reseptör (CAR/PXR) aktivasyonuyla CYP enzimleri ve hem sentezinin hız kısıtlayıcı enzimi ALAS1 transkripsiyonu artar; porfiri hastalarında toksik δ-ALA ve porfobilinojen birikerek akut nöropati yaratır.',
            'Fizikokimyasal pKa 7,6 / pH 10,5 Kristalleşme Kinetiği: Zayıf asit olan tiyopental (pKa 7,6) suda çözünebilmesi için pH 10,5–11,0 sodyum karbonat tamponu içinde hazırlanır. pH 7,4 arter kanına veya asidik ilaçlara karıştığında hızla çözünmeyen non-iyonize serbest asit kristallerine dönüşerek damar içi presipitasyon ve endotel lizisi yapar.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Serebral Korteks, Retiküler Aktive Edici Sistem & Serebral Vaskülatür → SSS & İKB Fizyolojisi',
            tissueTarget: 'Kortikal Piramidal Nöron · Serebral Arteriyol · CMRO₂ / CBF',
            accent: 'indigo',
            points: [
              'Paralel CMRO₂ ve CBF Azalması (%50–55): Serebral metabolik baskılanmaya sekonder serebral vazokonstriksiyon gelişir; serebral kan hacmi (CBV) ve intrakraniyal basınç (İKB) dramatik düşerken CO₂ reaktivitesi korunur.',
              'Ters Çalma (Inverse Steal / Robin Hood) Etkisi: Sağlam beyin bölgelerinde vazokonstriksiyon yaparak kan akımını fokal iskemik alanlara yönlendirir ve güçlü antikonvülsan/burst-supresyon etki sağlar.',
            ],
          },
          {
            systemTitle: 'Venöz Kapasitans Damarları, Miyokard & Baroreseptörler → Kardiyovasküler Fizyoloji',
            tissueTarget: 'Venöz Düz Kas · Kardiyomiyosit (Ca²⁺ Girişi ↓) · Medüller Vazomotor Merkez',
            accent: 'rose',
            points: [
              'Venodilatasyon & Ön Yük Azalması: Medüller vazomotor merkez inhibisyonuyla periferik venöz göllenme artar, venöz dönüş ve atım hacmi %15–25 düşer.',
              'Direkt Negatif İnotropi & Refleks Taşikardi: Kardiyomiyositlerde sarkoplazmik retikulum Ca²⁺ salınımını azaltarak kontraktiliteyi baskılar; sağlam baroreseptörler kalp hızını artırarak debiyi kısmen kompanse eder (hipovolemide ve β-bloker kullananlarda bu kompanzasyon çöker!).',
            ],
          },
          {
            systemTitle: 'Medüller Solunum Merkezi, Larinks & Bronş Düz Kası → Solunum & Havayolu Fizyolojisi',
            tissueTarget: 'Medüller Kemoreseptör · Laringeal Refleks Arkı · Mast Hücresi',
            accent: 'amber',
            points: [
              'Santral Apne & CO₂ Duyarsızlaşması: Doza bağımlı tidal volüm ve solunum sayısı düşüşü, ardından tipik 30–90 saniyelik indüksiyon apnesi oluşur.',
              'Yetersiz Havayolu Refleks Baskılanması: Propofolden farklı olarak faringeal ve laringeal refleksleri zayıf baskılar; ek olarak mast hücrelerinden histamin salınımı yapabileceğinden astımlı veya yüzeyel anestezili hastada laringospazm/bronkospazm riski yüksektir.',
            ],
          },
          {
            systemTitle: 'İskelet Kası K⁺ Havuzu, Hepatositler & Lökositler → Elektrolit, Metabolik & İmmün Fizyoloji',
            tissueTarget: 'İskelet Kası K⁺ Kanalları · Hepatosit CYP/ALAS1 · Nötrofil Kemotaksisi',
            accent: 'teal',
            points: [
              'Bifazik K⁺ Homeostazı: Yüksek doz infüzyonda intraselüler K⁺ şiftine bağlı derin hipokalemi, kesilme fazında ise ani hücre dışı çıkışa bağlı hayatı tehdit eden rebound hiperkalemi gelişir.',
              'İmmünosupresyon & GIS Motilite Kaybı: NF-κB inhibisyonu ve nötrofil kemotaksis/fagositoz baskılanması nedeniyle barbitürat komasındaki hastalarda VİP/sepsis ve paralitik ileus oranları belirgin yükselir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'İzoelektrik EEG Metabolik Tavanı, Sıfır-Derece Kinetik & Sinerji Profili',
          summary:
            'Tiyopentalin farmakodinamik tavanı ve diğer santral depresanlarla etkileşimi yatak başı doz titrasyonunu doğrudan belirler:',
          points: [
            'İzoelektrik EEG Tavan Etkisi (CMRO₂ %50–55 Azalma): EEG tamamen düzleştiğinde (izoelektrik hat) sinaptik elektriksel aktivite sıfırlanır ve CMRO₂ yaklaşık %50–55 düşer. Bu noktadan sonra tiyopental dozunu artırmak ek nöroproteksiyon veya ek CMRO₂ düşüşü SAĞLAMAZ; yalnızca miyokardiyal depresyonu, hipotansiyonu ve toksisiteyi artırır!',
            'Opioid / Benzodiazepin / Volatil Sinerjisi: Fentanil, remifentanil veya midazolam ile belirgin supra-aditif hipnotik ve solunum depresan sinerji gösterir; eşzamanlı kullanımda tiyopental indüksiyon dozu %20–30 azaltılmalıdır.',
            'Akut Tolerans vs Sıfır-Derece Birikim: Uzun infüzyonlarda GABA-A reseptör duyarsızlaşması gelişebilse de, asıl klinik sorun hepatik metabolizmanın doygunluğa ulaşmasıyla (sıfır-derece kinetik) plazma düzeyinin öngörülemez biçimde yükselmesi ve günler süren uzamış komadır.',
          ],
        }}
        clinicalPearls={[
          'Neden İntra-Arteriyel Enjeksiyonda Kateter Çekilmez? Arter lümeninde kristalleşmiş tiyopentalin yarattığı vazospazmı kırmak için doğrudan intra-arteriyel SF dilüsyonu ve Lidokain/Papaverin verilmesi şarttır; kateter çekilirse bu lokal kurtarma yolu kaybedilir!',
          'RSI’da Beyaz Çökelti Tuzağı: Tiyopental pH ~10,5–11,0, Rokuronyum ise pH ~4,0 civarındadır. Araya 10–20 mL SF flush yapılmadan arka arkaya puşe edilirse damar yolu saniyeler içinde kireç gibi beyaz çökeltiyle tıkanır ve kas gevşetici hastaya ulaşamaz!',
          'Barbitürat Komasında K⁺ 2,8 mEq/L Gördüğünüzde Panikle Yüksek Doz KCl Vermeyin: Bu durum total vücut eksikliği değil, geri dönüşümlü intraselüler şifttir. Aşırı replasman, infüzyon kesildiğinde ölümcül rebound hiperkalemiye (K⁺ > 7–8 mEq/L) ve VF’ye yol açar.',
          'LMA Yerleşimi İçin Propofol Tercih Edin: Tiyopental havayolu reflekslerini propofol kadar etkin baskılamadığından supraglottik havayolu (LMA) yerleşiminde öksürük, öğürme ve laringospazm insidansı belirgin olarak daha yüksektir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 17. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KAYNAKÇA (#sec-kaynaklar)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Tiyopental Sodyum"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Asidik IV İlaçlar, NMB’ler (Rokuronyum, Vekuronyum, Süksinilkolin) & Ringer Laktat',
            mechanism: 'Fizikokimyasal pH Uyumsuzluğu (pH ~10,5–11,0 vs Asidik Çözeltiler) & Serbest Asit Çökelmesi',
            clinicalEffect:
              'Aynı IV hatta veya Y-site bağlantısında anında beyaz presipitasyon, damar yolu tıkanması, NMB etkisizliği ve kristalin mikroembolizm oluşur.',
            management:
              'Asla aynı enjektörde karıştırmayın veya Ringer Laktat hattından vermeyin. RSI sırasında tiyopental ile kas gevşetici arasına mutlaka 10–20 mL %0,9 NaCl (SF) flush uygulayın.',
          },
          {
            severity: 'X',
            agent: 'Porfirojenik Ajanlar / Akut İntermitan Porfiri (AIP) Taşıyıcıları',
            mechanism: 'Hepatik δ-ALA Sentaz (ALAS1) Enziminin Güçlü İndüksiyonu',
            clinicalEffect:
              'Toksik porfirin prekürsör birikimiyle hayatı tehdit eden nörovisseral porfiri krizi, otonomik instabilite, assendan paralizi ve solunum arresti gelişir.',
            management:
              'Akut hepatik porfiri (AIP, variegata, herediter koproporfiri) tanısı veya şüphesi olan hastalarda Tiyopental kesinlikle kontrendikedir; Propofol kullanın.',
          },
          {
            severity: 'D',
            agent: 'Opioidler, Benzodiazepinler, Alkol & Diğer SSS Depresanları',
            mechanism: 'GABA-A & Opiyat Reseptörleri Üzerinden Supra-Aditif Farmakodinamik Sinerji',
            clinicalEffect:
              'Derin ve uzamış apne, şiddetli hipotansiyon, kardiyak debi düşüşü ve gecikmiş uyanma riski belirgin artar.',
            management:
              'Eşzamanlı premedikasyon veya opioid indüksiyonunda tiyopental dozunu %20–30 azaltın, yavaş titre edin ve havayolu/vazopresör desteğini hazır tutun.',
          },
          {
            severity: 'D',
            agent: 'Varfarin, Kortikosteroidler, Oral Kontraseptifler & CYP2C9 / CYP3A4 Substratları',
            mechanism: 'Uzun Süreli Barbitürat İnfüzyonunda Hepatik CYP2C9 / CYP3A4 Enzim İndüksiyonu',
            clinicalEffect:
              'Çok günlük barbitürat koması veya SRSE tedavisinde eşzamanlı kullanılan Varfarin, steroidler, fenitoin ve diğer CYP substratlarının metabolizması hızlanarak plazma düzeyleri düşer.',
            management:
              'Uzun infüzyon alan hastalarda antikoagülan (INR) ve antiepileptik ilaç düzeylerini yakından izleyin; tiyopental kesildikten sonra toksisite gelişmemesi için dozları yeniden ayarlayın.',
          },
          {
            severity: 'D',
            agent: 'Agresif IV Potasyum (KCl) Replasmanı (Barbitürat Koması Sırasında)',
            mechanism: 'Tiyopental Kaynaklı Geri Dönüşümlü İntraselüler K⁺ Şifti',
            clinicalEffect:
              'İnfüzyon sırasında hipokalemiye karşı yapılan aşırı K⁺ replasmanı, infüzyon sonlandırıldığında hücre içinden boşalan potasyumla birleşerek ölümcül rebound hiperkalemi ve ventriküler aritmiye yol açar.',
            management:
              'Hipokalemiyi yalnızca K⁺ < 3,0 mEq/L veya EKG değişikliği varsa konservatif replase edin; infüzyon kesilme fazında 4–6 saatlik seri K⁺ ve sürekli EKG takibi yapın.',
          },
          {
            severity: 'C',
            agent: 'Probenesid, Sülfonamidler & Yüksek Protein Bağlanan Asidik İlaçlar',
            mechanism: 'Plazma Albümin Bağlanma Bölgelerinden Yarışmalı Ayırma (Displacement)',
            clinicalEffect:
              'Tiyopentalin serbest (farmakolojik aktif) fraksiyonunu artırarak daha düşük dozlarda derin hipnoz ve hipotansiyon oluşturabilir.',
            management:
              'Bu ilaçları kullanan hastalarda indüksiyon dozunu düşük tutup klinik yanıta göre yavaş titre edin.',
          },
        ]}
        references={[
          {
            authors: 'Gropper MA, Eriksson LI, Fleisher LA, Wiener-Kronish JP, Cohen NH, Leslie K',
            title: "Miller's Anesthesia (10th Edition) — Intravenous Anesthetics: Barbiturates (Thiopental)",
            journal: 'Elsevier',
            year: 2025,
            note: 'İntravenöz barbitürat farmakokinetiği (redistribüsyon, CSHT, sıfır-derece kinetik), GABA-A biyofiziği ve klinik indüksiyon/nöroanestezi prensipleri.',
          },
          {
            authors: 'Flood P, Rathmell JP, Urman RD',
            title: "Stoelting's Pharmacology and Physiology in Anesthetic Practice (6th Edition) — Barbiturates (Thiopental)",
            journal: 'Wolters Kluwer',
            year: 2022,
            note: 'pKa 7,6 / pH 10,5 fizikokimyası, CMRO₂/CBF ilişkisi, intra-arteriyel enjeksiyon yönetimi ve porfiri kontrendikasyonu.',
          },
          {
            authors: 'Carney N, Totten AM, O’Reilly C, et al. (Brain Trauma Foundation)',
            title: 'Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition',
            journal: 'Neurosurgery. 2017;80(1):6–15',
            year: 2017,
            pmid: '27654000',
            doi: '10.1227/NEU.0000000000001432',
            note: 'Şiddetli TBH’de refrakter İKB için barbitürat koması (Level IIB) ve profilaktik burst-supresyonun önerilmemesi.',
          },
          {
            authors: 'Brophy GM, Bell R, Claassen J, et al. (Neurocritical Care Society)',
            title: 'Guidelines for the Evaluation and Management of Status Epilepticus',
            journal: 'Neurocrit Care. 2012;17(1):3–23',
            year: 2012,
            pmid: '22528274',
            doi: '10.1007/s12028-012-9695-z',
            note: 'Refrakter / Süper-Refrakter Status Epileptikusta tiyopental yükleme (3–5 mg/kg) ve burst-supresyon idame infüzyonu (3–5 mg/kg/saat).',
          },
          {
            authors: 'Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK)',
            title: 'Pental Sodyum® 0,5 g / 1 g Enjeksiyonluk Çözelti İçin Toz Kısa Ürün Bilgisi (KÜB)',
            journal: 'TİTCK',
            year: 2020,
            note: 'Türkiye flakon sunumu (%2,5 sulandırma), akut konvülsiyon dozu (75–125 mg = 3–5 mL), ağır KBY (%75 doz) ve laktasyon uyarıları.',
          },
        ]}
      />
    </div>
  );
};
