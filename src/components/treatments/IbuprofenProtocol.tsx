import React, { useId, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Baby,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  HeartPulse,
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

type CalcTab = 'adult_iv' | 'pediatric' | 'pda' | 'safety_audit';
type AdultIndication = 'periop_pain' | 'fever_iv' | 'antiinflammatory' | 'pericarditis';
type IvFormMode = 'ready_4mg' | 'concentrate_100mg';

interface SafetyFactor {
  id: string;
  label: string;
  sublabel: string;
  severity: 'contraindicated' | 'high' | 'moderate';
}

const SAFETY_FACTORS: SafetyFactor[] = [
  {
    id: 'cabg',
    label: 'KABG (Koroner Bypass) Perioperatif Dönemi',
    sublabel: 'FDA Kutu Uyarısı: MUTLAK KONTRENDİKE (MI / inme / greft trombozu!)',
    severity: 'contraindicated',
  },
  {
    id: 'preg_20',
    label: 'Gebelik ≥20. Hafta (Özellikle ≥30. Hf / 3. Trimester)',
    sublabel: 'Fetal duktus arteriozus erken kapanması & oligohidramnioz (FDA 2020)!',
    severity: 'contraindicated',
  },
  {
    id: 'egfr_30_aki',
    label: 'ABH (AKI) / Ağır KBY (eGFR <30) veya Hipovolemi / Şok',
    sublabel: 'Afferent arteriyol PG blokajı → kalıcı renal hasar & hiperkalemi!',
    severity: 'contraindicated',
  },
  {
    id: 'gi_bleed_ulcer',
    label: 'Aktif Peptik Ülser / GİS Kanaması veya Ağır Siroz (Child-Pugh B–C)',
    sublabel: 'Masif GİS/varis kanaması ve Hepatorenal Sendrom (HRS) riski!',
    severity: 'contraindicated',
  },
  {
    id: 'aerd',
    label: 'Aspirin / NSAİİ İle Tetiklenen Astım (AERD / Samter) veya Anafilaksi',
    sublabel: 'Şiddetli bronkospazm (lökotrien şantı) — MUTLAK KONTRENDİKE!',
    severity: 'contraindicated',
  },
  {
    id: 'ace_arb',
    label: 'ACE İnhibitörü (Ramipril vb.) veya ARB (Valsartan/Losartan vb.)',
    sublabel: 'Diüretik ile birleşirse "TRIPLE WHAMMY" akut böbrek hasarı!',
    severity: 'high',
  },
  {
    id: 'diuretic',
    label: 'Loop / Tiyazid Diüretik (Furosemid, Hidroklorotiyazid vb.)',
    sublabel: 'Diüretik etkinliğini azaltır + ACEİ/ARB ile "Triple Whammy" ABH!',
    severity: 'high',
  },
  {
    id: 'aspirin_low',
    label: 'Kardiyoprotektif Düşük Doz Aspirin (81–100 mg/gün)',
    sublabel: 'COX-1 yarışması → Aspirinin antiplatelet etkisini BLOKE EDER! (Zamanlama şart)',
    severity: 'high',
  },
  {
    id: 'anticoag_ssri_steroid',
    label: 'Antikoagülan (Varfarin/DOAC/LMWH), Antiplatelet, SSRI veya Sistemik Steroid',
    sublabel: 'Üst GİS kanama riski 3–6× artar → PPI gastroproteksiyonu ZORUNLU!',
    severity: 'moderate',
  },
  {
    id: 'age_65',
    label: 'Yaş >65 (AGS Beers 2023) veya KKY / İskemik Kalp Hastalığı',
    sublabel: 'Kronik NSAİİ’den kaçın; zorunluysa en kısa süre + PPI ekle!',
    severity: 'moderate',
  },
];

export const IbuprofenProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('adult_iv');

  // Tab 1: Erişkin Analjezi / Ateş / Perikardit & IV Dilüsyon
  const [adultInd, setAdultInd] = useState<AdultIndication>('periop_pain');
  const [adultSingleMg, setAdultSingleMg] = useState<number>(400);
  const [ivFormMode, setIvFormMode] = useState<IvFormMode>('ready_4mg');
  const [adultWeightKg, setAdultWeightKg] = useState<number>(75);

  // Tab 2: Pediatrik Analjezi & Ateş (≥6 Ay)
  const [pedAgeMonths, setPedAgeMonths] = useState<number>(48);
  const [pedWeightKg, setPedWeightKg] = useState<number>(16);
  const [pedDoseMgKg, setPedDoseMgKg] = useState<number>(10);

  // Tab 3: Prematüre Yenidoğan PDA Kapanması (Pedea® 5 mg/mL)
  const [pdaWeightKg, setPdaWeightKg] = useState<number>(1.2);

  // Tab 4: Aspirin Zamanlama & "Triple Whammy" Güvenlik Denetleyici
  const [selectedFactors, setSelectedFactors] = useState<string[]>(['aspirin_low']);

  // Akordiyon State (Varsayılan Kapalı)
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik ID'leri
  const pedAgeSliderId = useId();
  const pedWeightSliderId = useId();
  const pedWeightInputId = useId();
  const pedDoseSliderId = useId();
  const pdaWeightSliderId = useId();
  const pdaWeightInputId = useId();

  // --- HESAPLAMALAR ---
  // Tab 1: Erişkin
  const adultConfig = (() => {
    switch (adultInd) {
      case 'periop_pain':
        return {
          title: 'Perioperatif Multimodal Analjezi / Akut Ağrı',
          intervalHr: 6,
          dailyCapMg: 2400,
          absMaxMg: 3200,
          note: '400 mg üzeri tek dozlarda analjezik tavan düzleşirken GİS/renal risk artar; perioperatif pratikte 400–600 mg q6–8sa (maks 2400 mg/gün) + Parasetamol sinerjisi idealdir.',
        };
      case 'fever_iv':
        return {
          title: 'Erişkin Ateş Kontrolü (İV)',
          intervalHr: 6,
          dailyCapMg: 2400,
          absMaxMg: 3200,
          note: '400 mg IV (30 dk) → gerekirse 400 mg q4–6sa (veya 100–200 mg q4sa). Hipovolemik/septik/ABH riskli YBÜ hastasında 1. tercih Parasetamoldür!',
        };
      case 'antiinflammatory':
        return {
          title: 'Antiinflamatuvar (OA · RA · Akut Gut · Dismenore)',
          intervalHr: 8,
          dailyCapMg: 2400,
          absMaxMg: 3200,
          note: 'İnflamatuvar artrit/akut gutta 600–800 mg PO q8sa (maks 2400–3200 mg/gün; akut gutta kısa süre 3–5 gün + PPI gastroproteksiyonu!).',
        };
      default:
        return {
          title: 'Akut Perikardit (ESC 2015 Kılavuzu)',
          intervalHr: 8,
          dailyCapMg: 1800,
          absMaxMg: 2400,
          note: 'ESC 2015: 600 mg PO q8sa (1800 mg/gün) + Kolşisin (0,5 mg 1–2×1) + MUTLAKA PPI gastroproteksiyonu! CRP normale inince 1–2 haftada 200–400 mg’lık basamaklarla azaltılır.',
        };
    }
  })();

  const minDiluentMl = Math.ceil(adultSingleMg / 4); // ≤4 mg/mL KIRMIZI SINIRI! (400 mg -> 100 mL, 600 mg -> 150 mL, 800 mg -> 200 mL)
  const practicalBagMl = adultSingleMg <= 400 ? 100 : 200; // Standart 100 mL veya 200 mL torba (≤4 mg/mL garantili)
  const finalConcMgMl = Number((adultSingleMg / practicalBagMl).toFixed(1));
  const concentrateAmpMl = Number((adultSingleMg / 100).toFixed(1)); // 100 mg/mL konsantre ampul (400 mg = 4 mL, 800 mg = 8 mL)
  const adultPumpRateMlHr = practicalBagMl * 2; // 30 dakikada IV infüzyon = hacim × 2 mL/sa

  // Tab 2: Pediatrik (≥6 ay)
  const isUnder6Months = pedAgeMonths < 6;
  const pedRawMg = Math.round(pedWeightKg * pedDoseMgKg);
  const pedCappedMg = Math.min(400, pedRawMg); // Tek doz üst sınırı 400 mg
  const pedCapHit = pedRawMg > 400;
  const pedDailyMaxMg = Math.min(2400, Math.round(pedWeightKg * 40)); // Maks 40 mg/kg/gün (2400 mg tavan)
  const pedSyrup100Ml = Number(((pedCappedMg / 100) * 5).toFixed(1)); // TR standart 100 mg / 5 mL (20 mg/mL)
  const pedIvFinalVolMl = Math.max(25, Math.ceil(pedCappedMg / 4)); // ≤4 mg/mL konsantrasyon garantisi
  const pedIvPumpRateMlHr = pedIvFinalVolMl * 2; // 30 dk infüzyon

  // Tab 3: Prematüre PDA (Pedea® 5 mg/mL)
  const pdaDay1Mg = Number((pdaWeightKg * 10).toFixed(1));
  const pdaDay23Mg = Number((pdaWeightKg * 5).toFixed(1));
  const pdaDay1Ml = Number((pdaDay1Mg / 5).toFixed(2)); // 5 mg/mL Pedea®
  const pdaDay23Ml = Number((pdaDay23Mg / 5).toFixed(2));
  const pdaTotalMg = Number((pdaDay1Mg + pdaDay23Mg * 2).toFixed(1));

  // Tab 4: Güvenlik Denetleyici
  const toggleFactor = (id: string) => {
    setSelectedFactors((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const hasContraindication = SAFETY_FACTORS.some(
    (f) => f.severity === 'contraindicated' && selectedFactors.includes(f.id)
  );
  const hasTripleWhammy = selectedFactors.includes('ace_arb') && selectedFactors.includes('diuretic');
  const hasAspirinConflict = selectedFactors.includes('aspirin_low');
  const needsPpi =
    selectedFactors.includes('anticoag_ssri_steroid') ||
    selectedFactors.includes('age_65') ||
    selectedFactors.includes('aspirin_low');

  // Yapılandırılmış Türkçe Klinik Order Özeti
  const buildCopySummary = (): string => {
    const activeOrder = (() => {
      if (activeTab === 'adult_iv') {
        const prepText =
          adultInd === 'pericarditis' || adultInd === 'antiinflammatory'
            ? `Oral: ${adultSingleMg} mg PO q${adultConfig.intervalHr}sa (tok karnına + yüksek riskte PPI gastroproteksiyonu).`
            : ivFormMode === 'ready_4mg'
              ? `İV Hazır Şişe (4 mg/mL): ${adultSingleMg} mg / ${practicalBagMl} mL → ≥30 dk IV infüzyon (Pompa: ${adultPumpRateMlHr} mL/sa) · q${adultConfig.intervalHr}sa.`
              : `İV Konsantre (100 mg/mL — ASLA DİREKT PUŞELEME!): ${concentrateAmpMl
                  .toString()
                  .replace('.', ',')} mL (${adultSingleMg} mg) + ${practicalBagMl} mL SF/D5W (nihai ${finalConcMgMl
                  .toString()
                  .replace('.', ',')} mg/mL ≤4 mg/mL!) → ≥30 dk IV infüzyon (Pompa: ${adultPumpRateMlHr} mL/sa).`;
        return [
          `• Aktif Order (${adultConfig.title}):`,
          `  ${prepText}`,
          `  Günlük Tavan: Pratik maks ${adultConfig.dailyCapMg} mg/gün (mutlak üst sınır ${adultConfig.absMaxMg} mg/gün). Övolemi + normal böbrek fonksiyonu (eGFR ≥60) doğrula!`,
        ].join('\n');
      }

      if (activeTab === 'pediatric') {
        if (isUnder6Months) {
          return `• Aktif Klinik Karar (Pediatri · ${pedAgeMonths} aylık): <6 AY BEBEKLERDE ANALJEZİ/ATEŞ İÇİN İBUPROFEN KULLANILMAZ (renal/GİS toksisitesi) — 1. tercih PARASETAMOLDÜR!`;
        }
        return [
          `• Aktif Order (Pediatrik Analjezi/Ateş · ${pedAgeMonths} ay · ${pedWeightKg} kg · ${pedDoseMgKg} mg/kg):`,
          `  Tek Doz: ${pedCappedMg} mg q6–8sa (maks 400 mg/doz · günlük maks ${pedDailyMaxMg} mg/gün [40 mg/kg/gün]).`,
          `  Oral Süspansiyon (100 mg/5 mL): ${pedSyrup100Ml.toString().replace('.', ',')} mL PO.`,
          `  İV Uygulama (≤4 mg/mL): ${pedCappedMg} mg / ${pedIvFinalVolMl} mL SF/D5W → ≥30 dk IV infüzyon (${pedIvPumpRateMlHr} mL/sa).`,
        ].join('\n');
      }

      if (activeTab === 'pda') {
        return [
          `• Aktif Order (Prematüre Yenidoğan PDA Kapanması · Pedea® 5 mg/mL · ${pdaWeightKg
            .toString()
            .replace('.', ',')} kg):`,
          `  1. Gün (0. sa): ${pdaDay1Mg.toString().replace('.', ',')} mg (10 mg/kg = ${pdaDay1Ml
            .toString()
            .replace('.', ',')} mL Pedea®) 15 dk IV infüzyon.`,
          `  2. Gün (24. sa): ${pdaDay23Mg.toString().replace('.', ',')} mg (5 mg/kg = ${pdaDay23Ml
            .toString()
            .replace('.', ',')} mL Pedea®) 15 dk IV.`,
          `  3. Gün (48. sa): ${pdaDay23Mg.toString().replace('.', ',')} mg (5 mg/kg = ${pdaDay23Ml
            .toString()
            .replace('.', ',')} mL Pedea®) 15 dk IV. (3 gün toplam: ${pdaTotalMg.toString().replace('.', ',')} mg.)`,
          `  Kırmızı Çizgi: İdrar çıkışı <0,6 mL/kg/sa, NEC, aktif İVH, Plt <50.000 veya yüksek bilirubinde (kernikterus riski!) KONTRENDİKE.`,
        ].join('\n');
      }

      return `• Güvenlik Denetim Özeti (${selectedFactors.length} risk işaretli): ${
        hasContraindication
          ? 'MUTLAK KONTRENDİKASYON MEVCUT — İBUPROFEN KULLANMA (Parasetamol/opioid/rejyonal blok seç)!'
          : hasTripleWhammy
            ? 'TRIPLE WHAMMY (ACEİ/ARB + Diüretik + NSAİİ) = Yüksek ABH Riski → KAÇIN!'
            : `Dikkatli kullanım${needsPpi ? ' + PPI GASTROPROTEKSİYONU ZORUNLU' : ''}${
                hasAspirinConflict ? ' + ASPİRİN ZAMANLAMASI (İbuprofen Aspirinden ≥30–60 dk SONRA!)' : ''
              }.`
      }`;
    })();

    return [
      `İBUPROFEN (Intrafen® / Brufen® / Dolven® · Pedea® PDA) KLİNİK ORDER ÖZETİ`,
      `• ATC: M01AE01 (PDA: C01EB16) · Non-Selektif COX-1/COX-2 İnhibitörü (Propionik Asit NSAİİ)`,
      activeOrder,
      `• KRİTİK GÜVENLİK: (1) KABG perioperatif ağrısında & Gebelik ≥30. hf’da MUTLAK KONTRENDİKE! (2) Konsantre IV ampul (100 mg/mL) ASLA direkt puşelenmez → ≤4 mg/mL seyrelt + ≥30 dk infüzyon! (3) eGFR <30 / ABH / Child-Pugh B–C / Triple Whammy’de KAÇIN!`,
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
          { id: 'sec-ozet', label: 'Özet' },
          { id: 'sec-etki', label: 'Etki Mekanizması' },
          { id: 'sec-pkpd', label: 'Farmakokinetik' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-dozlar', label: 'Endikasyon & Dozaj' },
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı & PDA' },
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
        sectionId="sec-guvenlik"
        defaultOpen={false}
        tallManName="IBUPROFEN (IV ≤4 mg/mL · ≥30 dk)"
        confusionRiskWith="Konsantre 100 mg/mL IV Ampul vs Hazır 4 mg/mL Şişe · Pedea® 5 mg/mL (PDA)"
        criticalAlerts={[
          'KONSANTRE İV AMPUL (100 mg/mL) DİREKT PUŞE FELAKETİ: Türkiye’de bulunan 400 mg/4 mL veya 800 mg/8 mL konsantre İbuprofen ampulleri ASLA seyreltilmeden direkt IV puşelenmez — ağır hemoliz, şiddetli venöz ağrı ve tromboflebit yapar! Nihai konsantrasyon MUTLAKA ≤4 mg/mL (400 mg ≥100 mL; 800 mg ≥200 mL SF/D5W/RL) olmalı ve en az 30 dakikada infüze edilmelidir!',
          'FDA KUTU UYARISI — KABG (CABG) & KARDİYOVASKÜLER / GİS KANAMA: Koroner arter bypass greft (KABG) cerrahisinin perioperatif döneminde MUTLAK KONTRENDİKEDİR (MI, inme ve greft oklüzyonu riski)! Ayrıca yüksek doz/uzun süreli kullanımda fatal GİS kanama/perforasyon ve arteriyel trombotik olay riskini artırır.',
          'TRIPLE WHAMMY (ACEİ/ARB + DİÜRETİK + NSAİİ) & ABH: Hipovolemi, sepsis, KBY (eGFR <30), Child-Pugh B–C siroz veya ACEİ/ARB + diüretik kombinasyonunda renal afferent vazodilatasyonu bloke ederek akut böbrek hasarı (ABH) ve hiperkalemi patlatır!',
          'GEBELİK ≥20. HAFTA (ÖZELLİKLE ≥30. HF) & ASPİRİN YARIŞMASI: Gebelik ≥30. haftada fetal duktus arteriozus erken kapanması nedeniyle MUTLAK KONTRENDİKE (≥20. hf oligohidramnioz!). Düşük doz Aspirin kullananlarda İbuprofen COX-1 kanalını kapatarak Aspirinin antiplatelet etkisini bloke eder → Aspirinden ≥30–60 dk SONRA alınmalıdır!',
        ]}
        antidoteOrRescue="Spesifik kimyasal antidotu yoktur. Akut aşırı dozda (<100 mg/kg genelde hafif; >400 mg/kg ciddi toksisite: ağır metabolik asidoz, koma, nöbet, ABH, GİS kanaması, hipotansiyon): (1) İlk 1–2 saatte aktif kömür (1 g/kg PO); (2) Agresif izotonik sıvı resüsitasyonu, GİS koruması (IV PPI) ve ağır asidemide Sodyum Bikarbonat; (3) ~%99 albumin bağlanması nedeniyle HEMODİYALİZ İbuprofeni temizlemez — diyaliz yalnızca dirençli ağır asidemi/ABH/hiperkalemi destek tedavisi için uygulanır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KİMLİK, KLİNİK ÖZET (#sec-ozet) & ETKİ MEKANİZMASI (#sec-etki)   */}
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
              <span
                className={`font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-orange-500/15 text-orange-300 border-orange-500/30'
                    : 'bg-orange-50 text-orange-800 border-orange-200'
                }`}
              >
                Non-Selektif NSAİİ (Propionik Asit) · Analjezik · Antipiretik · Antiinflamatuvar
              </span>
              <span
                className={`font-mono px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                IV ≤4 mg/mL · ≥30 dk · CABG &amp; Gebelik ≥30 hf YASAK!
              </span>
              <span
                className={`font-mono px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}
              >
                Intrafen® · Brufen® · Dolven® · Pedea® (PDA)
              </span>
              <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ATC: M01AE01 · C01EB16</span>
            </div>

            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              İbuprofen (Intrafen® · Brufen® · Dolven® · Pedea®) Monografisi
            </h1>

            <p className={`text-sm leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Klinik Kimlik &amp; Rol:</strong>{' '}
              Siklooksijenaz-1 (<strong>COX-1</strong>) ve siklooksijenaz-2 (<strong>COX-2</strong>) enzimlerini geri
              dönüşlü inhibe ederek prostaglandin sentezini baskılayan, propionik asit türevi klasik{' '}
              <strong>non-steroid antiinflamatuvar ilaçtır (NSAİİ)</strong>. Parasetamolden farklı olarak güçlü{' '}
              <strong>periferik antiinflamatuvar</strong> etkinliğe sahiptir; bu nedenle kas-iskelet ağrıları,
              osteoartrit/romatoid artrit, akut gut, dismenore, <strong>akut perikardit</strong> (ESC 2015), pediatrik
              ağrı/ateş (≥6 ay), <strong>perioperatif multimodal analjezi (Parasetamol ile sinerjik opioid-sparing)</strong>{' '}
              ve <strong>prematüre yenidoğan PDA kapanmasında</strong> (<em>Pedea®</em>) yaygın kullanılır. Öte yandan
              NSAİİ sınıf etkileri (<strong>GİS ülser/kanama, renal afferent vazokonstriksiyon/ABH, sıvı retansiyonu,
              CABG&apos;de kontrendikasyon, gebelik ≥20–30. haftada fetal duktus kapanması ve Aspirin COX-1 yarışması</strong>)
              nedeniyle hasta seçimi hayati önem taşır.
            </p>
          </div>

          <div className="shrink-0">
            <MonographCopyButton
              isDark={isDark}
              label="Klinik Order Kopyala"
              getText={buildCopySummary}
            />
          </div>
        </div>
      </section>

      <MechanismOfActionBlock
        isDark={isDark}
        sectionId="sec-etki"
        sectionTitle="Etki Mekanizması & COX-1 / COX-2 Farmakodinamiği (Yatak Başı Özet)"
        summary="İbuprofen, araşidonik asidin prostaglandin H₂’ye (PGH₂) dönüşümünü katalizleyen COX-1 ve COX-2 enzimlerinin aktif hidrofobik kanalına yarışmalı ve geri dönüşlü olarak bağlanır; inflamasyon, ağrı nosiseptör duyarlılaşması ve hipotalamik ateş yanıtını hızla kırar."
        pillars={[
          {
            title: '1. Periferik COX-2 İnhibisyonu → Antiinflamatuvar & Analjezik Etki',
            detail:
              'Cerrahi doku travması veya inflamasyon alanında PGE₂ ve prostasiklin üretimini keserek periferik nosiseptörlerin bradikinin/histamine duyarlılaşmasını (periferik sensitizasyon) ve ödemi azaltır.',
          },
          {
            title: '2. Hipotalamik PGE₂ Blokajı → Güçlü Antipiretik Etki',
            detail:
              'Pirojenik sitokinlerin (IL-1β, IL-6, TNF-α) preoptik hipotalamusta indüklediği PGE₂ sentezini inhibe ederek ateş ayar noktasını düşürür (çoğu pediatrik çalışmada ateşi Parasetamolden biraz daha uzun süre düşürür).',
          },
          {
            title: '3. Geri Dönüşlü COX-1 İnhibisyonu → Trombosit, GİS & Renal Etki',
            detail:
              'Aspirinden farklı olarak trombosit COX-1’ini GERİ DÖNÜŞLÜ bloke eder (trombosit fonksiyonu ~24 saatte döner). Ancak gastrik mukozal PGE₂ ve renal afferent vazodilatatör PG’leri de azalttığı için GİS kanama ve ABH riski taşır!',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FARMAKOKİNETİK (ADME) AKORDİYONU (#sec-pkpd, VARSAYILAN KAPALI)  */}
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
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-orange-500/15 text-orange-400' : 'bg-orange-50 text-orange-600'
              }`}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-base sm:text-lg font-bold flex flex-wrap items-center gap-2 ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                <span>Farmakokinetik (ADME) &amp; Enantiyomer Biyotransformasyonu</span>
                <span
                  className={`text-xs font-normal px-2 py-0.5 rounded font-mono ${
                    isDark ? 'bg-orange-500/15 text-orange-300' : 'bg-orange-50 text-orange-700'
                  }`}
                >
                  IV Pik: 30 dk · PO Pik: 1–2 sa · Albumin ~%99 · CYP2C9 · t½: ~2 sa (YD PDA: 25–43 sa!)
                </span>
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Rasemik R(−) → aktif S(+) dönüşümü, ~%99 albumin bağlanması (diyalizlenmez!), CYP2C9 metabolizması ve yenidoğan t½ uzaması.
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
          <div
            className={`p-5 sm:p-6 pt-0 border-t space-y-4 ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Etki Başlangıcı &amp; Süre
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  15–30 dk (IV)
                </span>
                <span className="text-[10px] text-slate-400">PO 30–60 dk · Süre 4–8 sa</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Protein Bağlama &amp; Vd
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  ~%99 Albumin · 0,15 L/kg
                </span>
                <span className="text-[10px] text-slate-400">HD/CRRT ile DİYALİZLENMEZ!</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Metabolizma (S-Aktif)
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                  CYP2C9 &amp; UGT
                </span>
                <span className="text-[10px] text-slate-400">R(−) → S(+) %60 kiral inversiyon</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Plazma t½ &amp; Atılım
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                  ~2,0 sa (Prematüre: 25–43 sa)
                </span>
                <span className="text-[10px] text-slate-400">&gt;%90 idrar (inaktif); &lt;%1 değişmez</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• Rasemik Karışım &amp; Kiral İnversiyon:</strong>{' '}
                İbuprofen R(−) ve S(+) enantiyomerlerinin 50:50 rasemik karışımıdır. COX inhibisyonundan esas olarak{' '}
                <strong>S(+)-ibuprofen (deksibuprofen)</strong> sorumludur; vücutta inaktif R(−) formunun ~%60&apos;ı
                tek yönlü olarak aktif S(+) forma çevrilir.
              </div>
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• Hipoalbuminemi &amp; Yenidoğan Bilirubin Yarışması:</strong>{' '}
                Plazma albuminine <strong>~%99</strong> bağlandığı için kritik hastada hipoalbuminemi (&lt;2,5 g/dL)
                serbest aktif fraksiyonu artırır; prematüre yenidoğanda ise albuminden bilirubini yerinden oynatarak
                serbest bilirubin ve <strong>kernikterus riskini</strong> yükseltebilir (hiperbilirubinemide PDA için
                Pedea® kontrendike!).
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
          'Koroner Arter Bypass Greft (KABG / CABG) Cerrahisi Perioperatif Dönemi (FDA Kutu Uyarısı — artmış MI, inme ve greft trombozu riski!).',
          'Gebeliğin 3. Trimesteri (≥30. Hafta): Fetal duktus arteriozus erken kapanması ve yenidoğan pulmoner hipertansiyonu riski (≥20. haftada fetal renal disfonksiyon/oligohidramnioz nedeniyle de kaçınılır!).',
          'Aspirin veya Diğer NSAİİ’lerle Tetiklenen Astım (AERD / Samter Triadı), Ürtiker, Anjiyoödem veya Anafilaksi Öyküsü.',
          'Aktif Peptik Ülser, Aktif GİS Kanaması veya Geçirilmiş NSAİİ İlişkili GİS Perforasyon/Kanama Öyküsü.',
          'Ağır Böbrek Yetmezliği (eGFR <30 mL/dk), Akut Böbrek Hasarı (ABH), Dekompanse Kalp Yetmezliği (NYHA III–IV) ve Ağır Karaciğer Yetmezliği / Dekompanse Siroz (Child-Pugh C).',
          'Prematüre PDA (Pedea®) İçin Ek Kontrendikasyonlar: Hayatı tehdit eden enfeksiyon/sepsis, aktif İVH/GİS kanaması, Plt <50.000/µL, koagülopati, NEC şüphesi, oligüri/yüksek kreatinin ve duktal-bağımlı konjenital kalp hastalığı!',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Dikkat Edilecek Durumlar"
        relativeItems={[
          'Orta KBY (eGFR 30–59 mL/dk), Hipovolemi, Sepsis veya "Triple Whammy" (ACEİ/ARB + Diüretik + NSAİİ): Akut böbrek hasarı riski çok yüksek — önce Parasetamol seçin.',
          'Düşük Doz Aspirin (Kardiyoprotektif 81–100 mg) Kullanımı: COX-1 bağlanma yarışması nedeniyle Aspirinin antiplatelet korumasını iptal edebilir (zamanlama kuralı şart!).',
          'Antikoagülan (Varfarin/DOAC/Heparin), Antiplatelet (Klopidogrel), SSRI veya Sistemik Kortikosteroid Kullanımı: Üst GİS kanama riski 3–6 kat artar → mutlaka PPI ekleyin.',
          'Yaş >65 (AGS Beers 2023), Hipertansiyon & İskemik Kalp Hastalığı: Kan basıncını yükseltir, antihipertansifleri antagonize eder ve CV olay riskini artırır.',
          '<6 Ay Bebekler (Analjezi/Ateş): Prematüre PDA endikasyonu (Pedea®) dışında <6 ay süt çocuklarında analjezi/ateş için KULLANILMAZ.',
        ]}
        clinicalNote="ASRA 2018 Nöraksiyel Kılavuzu: Tek başına İbuprofen (ve diğer NSAİİ’ler) spinal/epidural ponksiyon veya kateter çekilmesi için ek risk oluşturmaz ve kesme süresi gerektirmez — ancak eş zamanlı antikoagülan/antiplatelet kullanımı varsa dikkatli değerlendirilmelidir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ (#sec-dozlar)               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozlar"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className={`w-5 h-5 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Klinik Endikasyonlar &amp; Doz Rejimleri (Genel Tıp · ERAS · ESC Perikardit · Pediatri · PDA)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">IV ≤4 mg/mL · ≥30 dk · PO 400–800 mg</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* A. Hafif-Orta Ağrı, Ateş & İnflamatuvar Hastalıklar */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                <span>A. Ağrı, Ateş, Artrit, Akut Gut &amp; Dismenore (Genel Tıp)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-800'
                }`}
              >
                400–800 mg q6–8sa
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>Hafif–orta ağrı, ateş, migren, dental ağrı &amp; primer dismenore:</strong>{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>400 mg PO q6–8sa</strong>{' '}
              (maks 2400 mg/gün; reçetesiz 1200 mg/gün).{' '}
              <strong>Osteoartrit, Romatoid Artrit &amp; Akut Gut Artriti:</strong> Antiinflamatuvar doz{' '}
              <strong>600–800 mg PO q8sa</strong> (maks 2400–3200 mg/gün, en kısa süre + GİS riskinde PPI!).
            </p>
          </div>

          {/* B. Perioperatif Multimodal Analjezi & Ateş (İV) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Syringe className="w-4 h-4 text-teal-500 shrink-0" />
                <span>B. Perioperatif Multimodal Analjezi &amp; Erişkin IV Ateş</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-800'
                }`}
              >
                400–800 mg IV (30 dk)
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>Perioperatif Ağrı (CABG dışı, normal böbrek &amp; övolemik!):</strong>{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>400–800 mg IV q6sa</strong>{' '}
              (pratikte çoğunlukla <strong>400–600 mg q6–8sa, maks 2400 mg/gün</strong>; mutlak tavan 3200 mg/gün;{' '}
              <strong>≤4 mg/mL</strong> konsantrasyon, <strong>≥30 dk</strong> infüzyon). Parasetamol ile kombine
              edildiğinde opioid tüketimini belirgin azaltır. <strong>Erişkin IV Ateş:</strong> 400 mg IV (30 dk) →
              gerekirse q4–6sa.
            </p>
          </div>

          {/* C. Akut Perikardit (ESC 2015) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <HeartPulse className="w-4 h-4 text-rose-500 shrink-0" />
                <span>C. Akut &amp; Tekrarlayan Perikardit (ESC 2015 — 1. Basamak)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-800'
                }`}
              >
                600 mg PO q8sa
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              İdiyopatik/viral akut perikarditte <strong>1. basamak</strong> antiinflamatuvar tedavidir:{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>600 mg PO q8sa</strong>{' '}
              (1800 mg/gün) + <strong>Kolşisin</strong> (3 ay) + <strong>PPI gastroproteksiyonu</strong>. Semptomlar ve
              CRP normale dönünce (1–2 hf) 1–2 haftalık aralıklarla 200–400 mg azaltılarak kesilir (not: post-MI
              perikarditte İbuprofen yerine Aspirin tercih edilir!).
            </p>
          </div>

          {/* D. Pediatrik (≥6 Ay) & Prematüre PDA Kapanması */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Baby className="w-4 h-4 text-amber-500 shrink-0" />
                <span>D. Pediatri (≥6 Ay) &amp; Prematüre Yenidoğan PDA (Pedea®)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-800'
                }`}
              >
                5–10 mg/kg · PDA 10-5-5
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>Pediatrik Ağrı &amp; Ateş (≥6 ay):</strong> <strong>5–10 mg/kg PO/IV q6–8sa</strong> (tek doz
              maks 400 mg; günlük maks <strong>40 mg/kg/gün</strong>, tavan 2400 mg; &lt;6 ay KULLANILMAZ!).{' '}
              <strong>Prematüre PDA (Pedea® 5 mg/mL):</strong> 1. gün <strong>10 mg/kg IV</strong> → 24. sa{' '}
              <strong>5 mg/kg</strong> → 48. sa <strong>5 mg/kg</strong> (15 dk infüzyon; EKO + idrar çıkışı/Cr
              takibi!).
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. İNTERAKTİF 4 SEKMELİ DOZ & GÜVENLİK HESAPLAYICI (#sec-hesaplayici)*/}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-5 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-orange-500/15 text-orange-400' : 'bg-orange-50 text-orange-600'
              }`}
            >
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                İnteraktif İbuprofen Doz, IV Dilüsyon (≤4 mg/mL), PDA &amp; Güvenlik Hesaplayıcısı
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Erişkin 30 dk IV seyreltme, pediatrik 100 mg/5 mL şurup &amp; IV, Pedea® 10-5-5 PDA ve Aspirin / Triple Whammy denetimi
              </p>
            </div>
          </div>

          <MonographCopyButton isDark={isDark} label="Hesaplanan Order’ı Kopyala" getText={buildCopySummary} />
        </div>

        {/* 4 Sekmeli Navigasyon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { id: 'adult_iv' as CalcTab, label: 'Erişkin IV / PO & Dilüsyon', sub: '≤4 mg/mL · 30 dk · Perikardit' },
            { id: 'pediatric' as CalcTab, label: 'Pediatri (≥6 Ay)', sub: '100 mg/5 mL Şurup & IV' },
            { id: 'pda' as CalcTab, label: 'Yenidoğan PDA (Pedea®)', sub: '10 → 5 → 5 mg/kg (5 mg/mL)' },
            { id: 'safety_audit' as CalcTab, label: 'Triple Whammy & Aspirin', sub: 'Kontrendikasyon / PPI Kontrol' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? isDark
                      ? 'bg-orange-500/15 border-orange-500/50 text-orange-200 shadow-xs'
                      : 'bg-orange-50 border-orange-400 text-orange-900 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold leading-snug">{tab.label}</div>
                <div className={`text-[10px] mt-0.5 ${active ? 'opacity-90' : 'text-slate-500'}`}>{tab.sub}</div>
              </button>
            );
          })}
        </div>

        {/* SEKME 1: ERİŞKİN IV / PO & DİLÜSYON */}
        {activeTab === 'adult_iv' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { id: 'periop_pain' as AdultIndication, label: 'Perioperatif / Akut Ağrı', defMg: 400 },
                { id: 'fever_iv' as AdultIndication, label: 'Ateş (İV)', defMg: 400 },
                { id: 'antiinflammatory' as AdultIndication, label: 'Artrit / Gut (PO)', defMg: 600 },
                { id: 'pericarditis' as AdultIndication, label: 'Akut Perikardit (ESC)', defMg: 600 },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setAdultInd(opt.id);
                    setAdultSingleMg(opt.defMg);
                  }}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    adultInd === opt.id
                      ? isDark
                        ? 'bg-orange-500/20 border-orange-500/50 text-orange-200'
                        : 'bg-orange-50 border-orange-400 text-orange-900'
                      : isDark
                        ? 'bg-slate-800/40 border-slate-700 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                    Tek Doz Seçimi (Erişkin):
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[400, 600, 800].map((mg) => (
                      <button
                        key={mg}
                        type="button"
                        onClick={() => setAdultSingleMg(mg)}
                        className={`p-2.5 rounded-lg border text-center font-mono font-bold text-sm cursor-pointer ${
                          adultSingleMg === mg
                            ? isDark
                              ? 'bg-orange-500/20 border-orange-500/50 text-orange-200'
                              : 'bg-orange-50 border-orange-400 text-orange-900'
                            : isDark
                              ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                              : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        {mg} mg
                      </button>
                    ))}
                  </div>
                </div>

                {(adultInd === 'periop_pain' || adultInd === 'fever_iv') && (
                  <div>
                    <span className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                      Türkiye İV Form Seçimi:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIvFormMode('ready_4mg')}
                        className={`p-2 rounded-lg border text-left text-xs cursor-pointer ${
                          ivFormMode === 'ready_4mg'
                            ? isDark
                              ? 'bg-teal-500/20 border-teal-500/50 text-teal-200'
                              : 'bg-teal-50 border-teal-400 text-teal-900'
                            : isDark
                              ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                              : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="font-bold">Hazır Şişe (4 mg/mL)</div>
                        <div className="text-[10px] opacity-80">400 mg/100 mL · 800 mg/200 mL</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIvFormMode('concentrate_100mg')}
                        className={`p-2 rounded-lg border text-left text-xs cursor-pointer ${
                          ivFormMode === 'concentrate_100mg'
                            ? isDark
                              ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                              : 'bg-rose-50 border-rose-400 text-rose-900'
                            : isDark
                              ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                              : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="font-bold">Konsantre (100 mg/mL)</div>
                        <div className="text-[10px] opacity-80">400 mg/4 mL → Seyreltme Şart!</div>
                      </button>
                    </div>
                  </div>
                )}

                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {adultConfig.note}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 content-start">
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-50/70 border-orange-200'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    Tek Doz (q{adultConfig.intervalHr}sa)
                  </span>
                  <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                    {adultSingleMg} mg
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    Pratik maks: {adultConfig.dailyCapMg} mg/gün
                  </span>
                  <span className="text-[10px] text-slate-500 block">Mutlak tavan: {adultConfig.absMaxMg} mg/gün</span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-teal-500/10 border-teal-500/30' : 'bg-teal-50/70 border-teal-200'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    {adultInd === 'periop_pain' || adultInd === 'fever_iv' ? 'İV Hacim & 30 dk Pompa' : 'Oral Uygulama'}
                  </span>
                  {adultInd === 'periop_pain' || adultInd === 'fever_iv' ? (
                    <>
                      <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
                        {adultPumpRateMlHr} mL/sa
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 block">
                        {practicalBagMl} mL ({finalConcMgMl.toString().replace('.', ',')} mg/mL ≤4!)
                      </span>
                      <span className="text-[10px] text-slate-500 block">Min seyreltme: ≥{minDiluentMl} mL</span>
                    </>
                  ) : (
                    <>
                      <div className={`text-xl font-black font-mono mt-1 ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
                        Tok + PPI
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        {adultSingleMg === 600 ? '1 × 600 mg veya 1,5 × 400 mg' : `${adultSingleMg / 400} × 400 mg tablet`}
                      </span>
                    </>
                  )}
                </div>

                <div
                  className={`p-3.5 rounded-xl border col-span-2 text-xs leading-relaxed ${
                    ivFormMode === 'concentrate_100mg' && (adultInd === 'periop_pain' || adultInd === 'fever_iv')
                      ? isDark
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-200'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                      : isDark
                        ? 'bg-slate-800/60 border-slate-700 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {adultInd === 'periop_pain' || adultInd === 'fever_iv' ? (
                    ivFormMode === 'concentrate_100mg' ? (
                      <>
                        <strong>KONSANTRE SEYRELTME ZORUNLU:</strong> 100 mg/mL ampulden{' '}
                        <strong>{concentrateAmpMl.toString().replace('.', ',')} mL ({adultSingleMg} mg)</strong> çekip{' '}
                        <strong>{practicalBagMl} mL SF, D5W veya RL</strong> içine ekleyin (nihai konsantrasyon{' '}
                        {finalConcMgMl.toString().replace('.', ',')} mg/mL ≤4 mg/mL) ve en az <strong>30 dakikada</strong>{' '}
                        ({adultPumpRateMlHr} mL/sa) infüze edin!
                      </>
                    ) : (
                      <>
                        <strong>HAZIR İV ŞİŞE:</strong> {adultSingleMg} mg / {practicalBagMl} mL çözeltiyi en az{' '}
                        <strong>30 dakikada</strong> ({adultPumpRateMlHr} mL/sa) IV infüze edin. Övolemiyi ve bazal
                        kreatinini doğrulayın!
                      </>
                    )
                  ) : (
                    <>
                      <strong>Gastroproteksiyon Notu:</strong> Yüksek doz (≥1800 mg/gün) antiinflamatuvar veya perikardit
                      rejimlerinde (veya yaş &gt;65 / antikoagülan / steroid eşliğinde) <strong>Pantoprazol 40 mg/gün</strong>{' '}
                      ekleyin!
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 2: PEDİATRİK ANALJEZİ & ATEŞ (≥6 AY) */}
        {activeTab === 'pediatric' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border space-y-4 ${
                isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={pedAgeSliderId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Çocuk Yaşı (Ay — &lt;6 Ay KULLANILMAZ!)
                  </label>
                  <span className={`text-xs font-mono font-bold ${isUnder6Months ? 'text-rose-500' : 'text-orange-500'}`}>
                    {pedAgeMonths} ay ({(pedAgeMonths / 12).toFixed(1).replace('.', ',')} yaş)
                  </span>
                </div>
                <input
                  id={pedAgeSliderId}
                  type="range"
                  min={1}
                  max={180}
                  step={1}
                  value={pedAgeMonths}
                  onChange={(e) => setPedAgeMonths(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={pedWeightInputId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Çocuk Kilosu
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={pedWeightInputId}
                      type="number"
                      min={4}
                      max={60}
                      value={pedWeightKg}
                      onChange={(e) => setPedWeightKg(Math.max(4, Math.min(60, Number(e.target.value) || 15)))}
                      className={`w-16 px-2 py-1 text-right font-mono text-xs font-bold rounded-lg border ${
                        isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">kg</span>
                  </div>
                </div>
                <input
                  id={pedWeightSliderId}
                  type="range"
                  min={4}
                  max={55}
                  value={pedWeightKg}
                  onChange={(e) => setPedWeightKg(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={pedDoseSliderId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Hedef Doz (5–10 mg/kg/doz)
                  </label>
                  <span className="text-xs font-mono font-bold text-orange-500">{pedDoseMgKg} mg/kg</span>
                </div>
                <input
                  id={pedDoseSliderId}
                  type="range"
                  min={5}
                  max={10}
                  step={1}
                  value={pedDoseMgKg}
                  onChange={(e) => setPedDoseMgKg(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 content-start">
              {isUnder6Months ? (
                <div
                  className={`p-4 rounded-xl border col-span-2 space-y-2 ${
                    isDark ? 'bg-rose-500/15 border-rose-500/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>&lt;6 AY BEBEKLERDE ANALJEZİ/ATEŞ İÇİN KULLANILMAZ!</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    6 aydan küçük süt çocuklarında renal prostaglandin bağımlılığı ve GİS/renal toksisite riski nedeniyle
                    İbuprofen önerilmez — 1. basamak ajan <strong>Parasetamoldür</strong>. (Prematüre PDA kapanması için
                    yan sekmedeki Pedea® protokolünü kullanın!)
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-50/70 border-orange-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-500">Tek Doz (q6–8sa)</span>
                    <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                      {pedCappedMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      Günlük tavan: {pedDailyMaxMg} mg
                    </span>
                    {pedCapHit && (
                      <span className="text-[10px] font-bold text-rose-500 block">Tek doz 400 mg tavanına sınırlandı!</span>
                    )}
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark ? 'bg-teal-500/10 border-teal-500/30' : 'bg-teal-50/70 border-teal-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-500">TR Şurup (100 mg/5 mL)</span>
                    <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
                      {pedSyrup100Ml.toString().replace('.', ',')} mL
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">Dolven® / Pedifen® / İbufen®</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border col-span-2 text-xs leading-relaxed ${
                      isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <strong>Pediatrik İV Uygulama (≤4 mg/mL):</strong> <strong>{pedCappedMg} mg</strong> İbuprofeni en az{' '}
                    <strong>{pedIvFinalVolMl} mL</strong> SF/D5W içinde (≤4 mg/mL) ≥30 dk infüze edin (Pompa:{' '}
                    <strong className="font-mono">{pedIvPumpRateMlHr} mL/sa</strong>). Dehidrate çocukta (gastroenterit /
                    kusma!) ABH riski çok yüksek olduğundan NSAİİ VERMEYİN!
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* SEKME 3: PREMATÜRE YENİDOĞAN PDA KAPANMASI (PEDEA® 5 mg/mL) */}
        {activeTab === 'pda' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border space-y-4 ${
                isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={pdaWeightInputId} className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Baby className="w-4 h-4 text-amber-500" />
                    <span>Prematüre Yenidoğan Kilosu</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={pdaWeightInputId}
                      type="number"
                      min={0.5}
                      max={3.5}
                      step={0.1}
                      value={pdaWeightKg}
                      onChange={(e) => setPdaWeightKg(Math.max(0.5, Math.min(3.5, Number(e.target.value) || 1.2)))}
                      className={`w-16 px-2 py-1 text-right font-mono text-xs font-bold rounded-lg border ${
                        isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">kg</span>
                  </div>
                </div>
                <input
                  id={pdaWeightSliderId}
                  type="range"
                  min={0.5}
                  max={3.0}
                  step={0.1}
                  value={pdaWeightKg}
                  onChange={(e) => setPdaWeightKg(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div
                className={`p-3 rounded-lg border text-xs leading-relaxed ${
                  isDark ? 'bg-rose-500/10 border-rose-500/30 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <strong>Pedea® 5 mg/mL (2 mL = 10 mg) Kesin Kontrol Listesi:</strong> Aktif İVH, NEC, trombositopeni
                (&lt;50.000), idrar çıkışı &lt;0,6 mL/kg/sa, serum Cr &gt;1,5–1,8 mg/dL, sepsis, duktal-bağımlı kalp
                hastalığı veya yüksek serbest bilirubinde <strong>KONTRENDİKEDİR</strong> (alternatif: IV Parasetamol)!
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 content-start">
              <div
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-slate-500">1. Gün (0. Saat · 10 mg/kg)</span>
                <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                  {pdaDay1Mg.toString().replace('.', ',')} mg
                </div>
                <span className="text-[11px] font-mono text-slate-500 block">
                  {pdaDay1Ml.toString().replace('.', ',')} mL Pedea® (5 mg/mL)
                </span>
                <span className="text-[10px] text-slate-500 block">15 dk yavaş IV infüzyon</span>
              </div>

              <div
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50/70 border-indigo-200'
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-slate-500">2. &amp; 3. Gün (24. &amp; 48. sa · 5 mg/kg)</span>
                <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                  {pdaDay23Mg.toString().replace('.', ',')} mg
                </div>
                <span className="text-[11px] font-mono text-slate-500 block">
                  {pdaDay23Ml.toString().replace('.', ',')} mL Pedea® (her doz)
                </span>
                <span className="text-[10px] text-slate-500 block">
                  3 gün toplam: {pdaTotalMg.toString().replace('.', ',')} mg
                </span>
              </div>

              <div
                className={`p-3.5 rounded-xl border col-span-2 text-xs leading-relaxed ${
                  isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <strong>İzlem:</strong> 2. ve 3. doz öncesi idrar çıkışı (&gt;0,6 mL/kg/sa), serum kreatinin ve karın
                muayenesi doğrulanır; 1. kür sonrası duktus açık kalırsa 48 saat sonra 2. kür değerlendirilir.
              </div>
            </div>
          </div>
        )}

        {/* SEKME 4: TRIPLE WHAMMY & ASPİRİN ZAMANLAMA DENETLEYİCİSİ */}
        {activeTab === 'safety_audit' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border space-y-1.5 max-h-96 overflow-y-auto ${
                isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
                Hastanın Eşlik Eden Risklerini / İlaçlarını Seçin:
              </span>
              {SAFETY_FACTORS.map((sf) => {
                const checked = selectedFactors.includes(sf.id);
                return (
                  <label
                    key={sf.id}
                    className={`flex items-start gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                      checked
                        ? sf.severity === 'contraindicated'
                          ? isDark
                            ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : isDark
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                            : 'bg-amber-50 border-amber-300 text-amber-900'
                        : isDark
                          ? 'bg-slate-900/50 border-slate-700 text-slate-300'
                          : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFactor(sf.id)}
                      className="mt-0.5 accent-orange-500"
                    />
                    <div>
                      <div className="font-semibold leading-tight">{sf.label}</div>
                      <div className="text-[10px] opacity-80">{sf.sublabel}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="space-y-3">
              {hasContraindication ? (
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isDark ? 'bg-rose-500/15 border-rose-500/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>MUTLAK KONTRENDİKASYON — İBUPROFEN KULLANMA!</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    İşaretlenen faktörler İbuprofen (ve diğer NSAİİ&apos;ler) için mutlak engel oluşturuyor. Multimodal
                    analjezi/ateş için <strong>Parasetamol</strong>, rejyonal sinir blokları veya titre kısa etkili
                    opioid seçin!
                  </p>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    hasTripleWhammy
                      ? isDark
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-200'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                      : isDark
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="font-bold text-sm">
                    {hasTripleWhammy
                      ? 'TRIPLE WHAMMY ALARMI (ACEİ/ARB + Diüretik + NSAİİ)!'
                      : selectedFactors.length === 0
                        ? 'Risk Faktörü Seçilmedi — Standart Kullanım Uygun'
                        : 'Yüksek Dikkat / Koşullu Kullanım Gerekir'}
                  </div>
                  <p className="text-xs leading-relaxed">
                    {hasTripleWhammy
                      ? 'ACEİ/ARB (efferent vazodilatasyon) + Diüretik (volüm kaybı) + İbuprofen (afferent vazokonstriksiyon) üçlüsü glomerüler filtrasyon basıncını çökertip ani ABH yapar — NSAİİ’den KAÇININ!'
                      : selectedFactors.length === 0
                        ? 'Normovolemik, normal böbrek fonksiyonlu hastada en düşük etkin dozda ve en kısa süre kullanılabilir.'
                        : 'En düşük etkin dozda (400 mg) ve en kısa sürede kullanın; 48–72 saatte Cr/K⁺ kontrolü yapın.'}
                  </p>
                </div>
              )}

              {hasAspirinConflict && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isDark ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-200' : 'bg-indigo-50 border-indigo-300 text-indigo-900'
                  }`}
                >
                  <strong>FDA Aspirin Zamanlama Kuralı:</strong> İbuprofen, COX-1 aktif kanalını bloke ederek düşük doz
                  Aspirinin (81–100 mg) geri dönüşümsüz antiplatelet asetilasyonunu engeller! Tek doz İbuprofen gerekiyorsa
                  hemen salınımlı Aspirinden <strong>en az 30–60 dk SONRA</strong> (veya Aspirinden ≥8 saat ÖNCE) verin;
                  enterik kaplı Aspirinle düzenli İbuprofen kullanmayın!
                </div>
              )}

              {needsPpi && !hasContraindication && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isDark ? 'bg-teal-500/15 border-teal-500/40 text-teal-200' : 'bg-teal-50 border-teal-300 text-teal-900'
                  }`}
                >
                  <strong>PPI Gastroproteksiyonu ZORUNLU:</strong> Seçili GİS kanama risk faktörleri nedeniyle İbuprofen
                  kullanılacaksa mutlaka <strong>Pantoprazol 40 mg/gün</strong> (klopidogrel/DAPT dostu!) eklenmelidir.
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (#sec-tr-preparat)      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Intrafen® / İbu-Active® IV Hazır Şişe (400 mg / 100 mL & 800 mg / 200 mL)',
            presentation: 'Kullanıma hazır 4 mg/mL IV infüzyon çözeltisi (ek seyreltme gerektirmez)',
            concentration: '4 mg/mL (400 mg/100 mL veya 800 mg/200 mL)',
            saltOrBaseNote:
              'Doğrudan en az 30 dakikada IV infüze edilir (400 mg/100 mL → 200 mL/sa; 800 mg/200 mL → 400 mL/sa).',
            alertLevel: 'standard',
          },
          {
            name: 'Konsantre İbuprofen IV Ampul / Flakon (400 mg / 4 mL · 800 mg / 8 mL — 100 mg/mL!)',
            presentation: 'Yüksek konsantrasyonlu IV ampul/flakon (SEYRELTMEDEN ASLA VERİLMEZ!)',
            concentration: '100 mg/mL (DİREKT PUŞE YASAK → ≤4 mg/mL’ye seyrelt!)',
            saltOrBaseNote:
              '400 mg (4 mL) mutlaka en az 100 mL, 800 mg (8 mL) en az 200 mL %0,9 NaCl / %5 Dekstroz / Ringer Laktat ile seyreltilip ≥30 dk infüze edilmelidir!',
            alertLevel: 'high',
          },
          {
            name: 'Pedea® 5 mg/mL IV Ampul (Prematüre Yenidoğan PDA Özel Formu)',
            presentation: '2 mL cam ampul = 10 mg İbuprofen (yalnızca NICU PDA kapanması için)',
            concentration: '5 mg/mL (10 mg / 2 mL)',
            saltOrBaseNote:
              'Erişkin 100 mg/mL konsantre ampulle ASLA karıştırılmamalıdır! 10 → 5 → 5 mg/kg (15 dk yavaş IV).',
            alertLevel: 'high',
          },
          {
            name: 'Brufen® / Arfen® / Dolven® / Nurofen® / Pedifen® Oral Formlar',
            presentation: '200 / 400 / 600 mg film tablet & 100 mg / 5 mL (20 mg/mL) pediatrik süspansiyon',
            concentration: '200–600 mg tablet · 100 mg/5 mL şurup',
            saltOrBaseNote:
              'GİS irritasyonunu azaltmak için tok karnına alınır; oral biyoyararlanımı >%80 olduğundan oral alabilen hastada IV forma gerek yoktur.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          '400 mg Konsantre IV Hazırlama: 4 mL (400 mg) konsantre ampul + 100 mL SF, D5W veya RL = 4 mg/mL → 30 dk IV (200 mL/sa).',
          '800 mg Konsantre IV Hazırlama: 8 mL (800 mg) konsantre ampul + 200 mL SF, D5W veya RL = 4 mg/mL → 30 dk IV (400 mL/sa).',
          'Pediatrik IV (≥6 ay): Hesaplanan 10 mg/kg (maks 400 mg) doz, nihai konsantrasyon ≤4 mg/mL olacak şekilde SF/D5W ile seyreltilip ≥30 dk infüze edilir.',
        ]}
        concentrationTrapWarning="100 mg/mL KONSANTRE AMPUL TUZAĞI: 400 mg/4 mL konsantre İbuprofen ampulünün seyreltilmeden direkt IV enjeksiyonu 25 kat yüksek konsantrasyonla ağır hemoliz, ciddi damar ağrısı ve kimyasal tromboflebite yol açar — her zaman ≤4 mg/mL ve ≥30 dk infüzyon kuralını teyit edin!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="peripheral-ok"
        accessSummary="Nihai konsantrasyon ≤4 mg/mL olacak şekilde seyreltildiğinde ve ≥30 dakikada infüze edildiğinde periferik venöz hattan güvenle uygulanır. Ancak birçok asidik YBÜ ilacı ve TPN/kalsiyum çözeltileriyle Y-site uyumsuzluğu gösterebildiğinden uygulama öncesi/sonrası SF ile yıkama önerilir."
        phRange="6,8 – 7,8 (Hafif Nötral–Alkali · Arjinin/Lizin Tamponlu)"
        osmolalityNote="4 mg/mL seyreltik çözelti yaklaşık izotoniktir (~300–350 mOsm/kg); ancak >4 mg/mL konsantrasyonlar belirgin venöz irritasyon ve hemoliz riski taşır."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF)',
          '%5 Dekstroz (D5W)',
          'Ringer Laktat (RL)',
        ]}
        stabilityNote="Seyreltilmiş ≤4 mg/mL çözeltiler oda sıcaklığında 24 saate kadar stabildir; ancak koruyucu içermediğinden hazırlanır hazırlanmaz kullanılmalıdır. Pedea® ampulü tek kullanımlıktır ve açıldıktan sonra artanı atılır."
        ySiteCompatible={[
          '%0,9 NaCl · %5 Dekstroz · Ringer Laktat',
          'Parasetamol IV · Fentanil · Morfin · Ondansetron · Deksametazon (ayrı flush önerilir)',
        ]}
        ySiteIncompatible={[
          'Dobutamin · Dopamin · Noradrenalin (alkali/çökelti riski — ayrı lümen!)',
          'Haloperidol · Midazolam · Amiodaron · Vankomisin (bulanıklık/çökelti!)',
          'Kalsiyum Klorür / Yüksek Konsantrasyonlu TPN (Pedea® özellikle TPN ile ASLA aynı hattan verilmez!)',
        ]}
        extravasationProtocol="≤4 mg/mL seyreltik çözelti ekstravazasyonunda genellikle hafif-orta lokal ağrı ve ödem görülür (konsantre 100 mg/mL kaçarsa ağır flebit!). İnfüzyonu durdurun, kateteri çıkarın, ekstremiteyi eleve edin ve soğuk kompres uygulayın."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="eGFR <30 mL/dk ve tüm ABH evrelerinde KONTRENDİKE / KAÇININ! eGFR 30–59’da mümkünse kaçının (önce Parasetamol); ~%99 protein bağlı olduğu için IHD/CRRT ile DİYALİZLENMEZ!"
        renalDetails={[
          'eGFR ≥60 (Övolemik): Standart doz güvenle kullanılır (Triple Whammy yoksa!).',
          'eGFR 30–59: Afferent arteriyol vazokonstriksiyonu, GFR düşüşü ve hiperkalemi riski → önce Parasetamol; zorunluysa ≤3–5 gün en düşük doz + Cr/K⁺ kontrolü.',
          'eGFR <30 · ABH · IHD · PD · CRRT: Kullanılmamalıdır — kalan nefronları / rezidüel renal fonksiyonu yok eder ve diyalizle temizlenmez.',
        ]}
        hepaticSummary="Child-Pugh B–C dekompanse sirozda MUTLAK KAÇININ! Renal prostaglandin bağımlılığı nedeniyle hızla Hepatorenal Sendrom (HRS), refrakter asit ve masif varis/GİS kanaması tetikler."
        hepaticDetails={[
          'Child-Pugh A: Mümkünse Parasetamol (≤2–3 g/gün) tercih edin; zorunluysa çok kısa süre en düşük doz.',
          'Child-Pugh B–C: EASL/AASLD kılavuzlarına göre tüm NSAİİ’ler kontrendikedir (HRS-AKI + diüretik direnci + varis kanaması + hipoalbuminemide serbest ilaç artışı!).',
        ]}
        {...STANDALONE_ORGAN_PART2['ibuprofen']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="AGS Beers 2023: >65 Yaş Kronik NSAİİ’den KAÇININ!"
        geriatricPoints={[
          'AGS Beers 2023 Güçlü Uyarı: >65 yaş erişkinlerde kronik oral NSAİİ kullanımı yüksek GİS kanama/peptik ülser, ABH, hipertansiyon alevlenmesi ve KKY dekompansasyonu nedeniyle KAÇINILMALIDIR (zorunluysa mutlaka PPI gastroproteksiyonu eklenir).',
          'Gizli Renal Kırılganlık: Yaşlılarda normal görünen serum kreatinin (sarkopeni!) sıklıkla eGFR 40–55 mL/dk’yı maskeler; perioperatif hipovolemiyle birleşince tek günlük İbuprofen dahi postop ABH tetikleyebilir.',
          'Pratik Yaklaşım: Yaşlıda 1. basamak Parasetamol ve rejyonal bloklardır; İbuprofen gerekiyorsa 400 mg q8sa × ≤48–72 sa + PPI + hidrasyon!',
        ]}
        obesityWeightScalarBadge="Erişkinde Sabit 400–600 mg · TBW Artışı YOK"
        obesityPoints={[
          'Sabit Erişkin Tavanı: Morbid obezitede (BMI ≥40 kg/m²) tek doz 800 mg ve günlük tavan 3200 mg (pratikte 2400 mg) üzerine ÇIKILMAZ; obezitede eşlik eden HT, diyabet ve KBY riski nedeniyle renal izlem önemlidir.',
          'Pediatrik Obezite: Çocukta 10 mg/kg hesabında IBW/AdjBW dikkate alınmalı ve tek doz 400 mg erişkin tavanını aşmamalıdır.',
        ]}
        clinicalNote="Pediatrik obezitede 10 mg/kg dozunun 400 mg erişkin tavanını aşmaması ve erişkin risk yönetiminde IBW/AdjBW değerlendirmesi için:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="İbuprofen"
        recommendedScalar="IBW"
        secondaryScalar={{ type: 'AdjBW', context: 'Pediatrik Obezite (Maks 400 mg/doz)' }}
        rationale="Erişkinlerde sabit 400–600 mg (maks 800 mg/doz) kullanılır ve obezitede TBW’ye göre artırılmaz; pediatrik obezitede IBW/AdjBW üzerinden 5–10 mg/kg (maks 400 mg) hedeflenir."
        currentWeightKg={activeTab === 'pediatric' ? pedWeightKg : adultWeightKg}
        onApplyWeight={(w) => {
          setAdultWeightKg(Math.max(40, Math.min(180, Math.round(w))));
          if (w <= 55) setPedWeightKg(Math.max(4, Math.round(w)));
        }}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK & LAKTASYON (#sec-gebelik)                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Gebeliğin ≥30. haftasında (3. trimester) fetal duktus arteriozus erken kapanması nedeniyle MUTLAK KONTRENDİKEDİR! FDA 2020 uyarısına göre ≥20. haftadan itibaren fetal renal disfonksiyon ve oligohidramnioz riski nedeniyle de kullanılmamalıdır."
        pregnancyDetails={[
          '20–30. Hafta (FDA 2020 Güncellemesi): 20. haftadan sonra 48 saatten uzun NSAİİ kullanımı fetal böbrek perfüzyonunu azaltarak oligohidramnioza yol açabilir — zorunlu hallerde en düşük doz ≤48 saat ve amniyotik sıvı USG takibi gerekir.',
          '≥30. Hafta (3. Trimester): Fetal duktus arteriozusun erken kapanması, fetal sağ kalp yetmezliği, yenidoğan persistan pulmoner hipertansiyonu ve doğum eylemi uzaması nedeniyle KESİNLİKLE KONTRENDİKEDİR.',
          '1. Trimester & Doğurganlık: Erken gebelikte düşük riski artışı tartışmalıdır; gebelikte ağrı/ateş için 1. tercih daima Parasetamoldür.',
        ]}
        lactationSummary="Anne sütüne çok düşük oranda geçer (Relatif İnfant Dozu <%0,6) ve yarı ömrü kısadır (~2 saat) — emzirme döneminde EN GÜVENLİ NSAİİ (postpartum / sezaryen sonrası analjezide 1. tercih NSAİİ) kabul edilir!"
        lactationDetails={[
          'Sezaryen / Postpartum Analjezi (ACOG): Emziren annede sezaryen sonrası Parasetamol + İbuprofen (400–600 mg q6–8sa) kombinasyonu emzirme açısından tamamen güvenlidir ve opioid ihtiyacını belirgin azaltır.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖNEMLİ OLUMSUZ ETKİLER (#sec-olumsuz)                           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="sec-olumsuz"
        items={[
          {
            title: 'Akut Böbrek Hasarı (ABH), Sıvı Retansiyonu & Hiperkalemi',
            incidenceOrSeverity: 'Hipovolemi / KBY / Triple Whammy · Kritik',
            detail:
              'Renal PGE₂/PGI₂ blokajıyla afferent arteriyol vazokonstriksiyonu, GFR düşüşü, hiporeninemik hipoaldosteronizm (↑K⁺), ödem ve antihipertansif/diüretik direnci gelişir.',
            tone: 'rose',
          },
          {
            title: 'Üst & Alt GİS Ülserasyonu, Kanama ve Perforasyon',
            incidenceOrSeverity: 'Doz & Süre Bağımlı · FDA Kutu Uyarısı',
            detail:
              'Gastrik COX-1 mukozal koruyucu PGE₂ baskılanmasıyla dispepsi, eroziv gastrit ve uyarı semptomu olmaksızın gelişebilen hayatı tehdit eden GİS kanaması/perforasyon (yaş >65, antikoagülan, steroid ve SSRI ile 3–6× artar!).',
            tone: 'rose',
          },
          {
            title: 'Kardiyovasküler Trombotik Olaylar (MI / İnme) & KKY Dekompansasyonu',
            incidenceOrSeverity: 'CABG’de Kontrendike · Yüksek Doz',
            detail:
              'Yüksek dozda (≥2400 mg/gün) ve uzun süreli kullanımda endotelyal PGI₂ azalması ve Na⁺/su retansiyonuyla kan basıncı artar, KKY alevlenir ve MI/inme riski yükselir (PRECISION 2016).',
            tone: 'rose',
          },
          {
            title: 'Aspirin / NSAİİ Alevlenmeli Solunum Yolu Hastalığı (AERD)',
            incidenceOrSeverity: 'Astım + Nazal Polip · Kritik',
            detail:
              'COX-1 blokajı araşidonik asidi 5-lipoksijenaz yolağına (sisteinil lökotrienler) şantlayarak dakikalar içinde şiddetli bronkospazm, rinit ve anafilaktoid reaksiyon tetikler.',
            tone: 'amber',
          },
          {
            title: 'Trombosit Disfonksiyonu & Perioperatif Kanama Riski',
            incidenceOrSeverity: 'Geri Dönüşlü (~24 sa)',
            detail:
              'Geri dönüşlü TXA₂ inhibisyonu kanama zamanını hafif uzatır; çoğu cerrahide güvenli olmakla birlikte aktif koagülopati, trombositopeni ve yüksek kanama riskli nöro/göz cerrahilerinde cerrahla mutabakat gerekir.',
            tone: 'amber',
          },
          {
            title: 'Ağır Kutanöz Reaksiyonlar (SJS · TEN · DRESS) & Aseptik Menenjit',
            incidenceOrSeverity: 'Çok Nadir · İdiyosenkratik',
            detail:
              'Çok nadiren SJS/TEN, DRESS veya özellikle SLE hastalarında ilaca bağlı aseptik menenjit gelişebilir.',
            tone: 'indigo',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. ÖZEL KLİNİK DURUMLAR (#sec-ozel-durumlar)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="sec-ozel-durumlar"
        items={[
          {
            title: 'Aspirin + İbuprofen COX-1 Yarışma Tuzağı (FDA Uyarısı!)',
            detail:
              'İbuprofen, trombosit COX-1 kanalındaki Ser529 bölgesine geçici oturarak düşük doz Aspirinin (81–100 mg) geri dönüşümsüz asetilasyon yapmasını fiziksel olarak ENGELLER! Koroner stent/KAH hastası İbuprofen alacaksa hemen salınımlı Aspirinden ≥30–60 dk SONRA (veya ≥8 saat ÖNCE) almalıdır; enterik kaplı Aspirinle düzenli İbuprofen kullanılmamalıdır.',
          },
          {
            title: 'Cerrahi Hemostaz & Kolorektal Anastomoz / Kemik İyileşmesi',
            detail:
              'Güncel büyük meta-analizler kısa süreli (≤48–72 sa) düşük-orta doz İbuprofen’in çoğu cerrahide klinik kanamayı anlamlı artırmadığını göstermiştir. Ancak yüksek riskli kolorektal anastomozlarda, spinal füzyon/kırık iyileşmesi riskli olgularda ve kraniyotomide kurum/cerrah protokolü ile ortak karar verilmelidir.',
          },
          {
            title: 'PRECISION Çalışması (NEJM 2016) & Kardiyovasküler Profil',
            detail:
              '24.081 artrit hastasını içeren PRECISION çalışmasında orta doz Selekoksib, İbuprofen (ortalama ~2045 mg/gün) ve Naproksene karşı CV olaylar açısından non-inferior bulunmuş; buna karşın İbuprofen grubunda GİS ve renal olaylar Selekoksibe göre daha sık görülmüştür.',
          },
          {
            title: 'Dehidrate Çocukta (Gastroenterit + Ateş) İbuprofen Tuzağı!',
            detail:
              'Kusma/ishal ile dehidrate olmuş ateşli bir çocuğa ateş düşürmek için İbuprofen verilmesi pediatrik serviste ilaca bağlı Akut Böbrek Hasarının en sık önlenebilir nedenlerinden biridir — oral sıvı alımı bozuk/dehidrate çocukta mutlaka PARASETAMOL seçin!',
          },
          {
            title: 'Lityum & Metotreksat Toksisitesi',
            detail:
              'İbuprofen, renal proksimal tübüler lityum geri emilimini artırarak serum Lityum düzeylerini %15–40 yükseltir (nörotoksisite!) ve yüksek doz Metotreksatın (MTX) renal atılımını engelleyerek ölümcül pansitopeni/ABH yapabilir.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. DERİN FARMAKODİNAMİK ANALİZ (#sec-derin-pd, 4 Kademeli)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'COX-1 / COX-2 Hidrofobik Kanal Blokajı, S(+) Enantiyomer Seçiciliği & Aspirin Yarışması',
          summary:
            'İbuprofen, prostaglandin H₂ sentazın (COX-1 ve COX-2) siklooksijenaz aktif kanalında yarışmalı ve geri dönüşlü blokaj yaparak hem periferik inflamasyonu hem santral ateş yanıtını durdurur:',
          points: [
            'S(+)-İbuprofen Aktivitesi: Rasemik karışımın yalnızca S(+) enantiyomeri COX aktif kanalındaki Arg120 ve Tyr355 kalıntılarıyla yüksek afiniteli hidrojen bağları kurar; R(−) izomeri karaciğerde açil-CoA sentetaz ve epimeraz üzerinden ~%60 oranında aktif S(+) forma dönüştürülür.',
            'Aspirin Ser529 Sterik Blokajı: İbuprofenin hidrofobik kanala geri dönüşlü yerleşmesi, düşük doz Aspirinin Ser529 kalıntısına ulaşıp kalıcı asetilasyon yapmasını sterik olarak engeller. İbuprofen saatler içinde kanaldan ayrıldığında Aspirin de kandan çoktan temizlenmiş olacağından trombositler korunmasız kalır!',
            'Analjezik Tavan (400 mg) vs Antiinflamatuvar Doz (600–800 mg): Akut somatik ağrıda 400 mg tek doz neredeyse maksimum analjezik platoya ulaşır; 600–800 mg dozlara çıkmak esasen inflamatuvar artrit, gut ve perikarditte antiinflamatuvar etkiyi artırırken GİS/renal yan etkileri belirgin yükseltir.',
          ],
        }}
        intracellularSignaling={{
          title: 'Araşidonik Asit Şantı, Renal Afferent Otoregülasyon & Gastrik Mukozal Bariyer',
          summary:
            'COX yolağının sistemik blokajı dört organ sisteminde farklı prostanoid dengelerini değiştirir:',
          points: [
            'Renal Afferent Vazodilatasyon Kaybı: Hipovolemi, sepsis, KKY, siroz veya ACEİ/ARB varlığında glomerüler perfüzyonu ayakta tutan temel mekanizma afferent arteriyolde PGE₂/PGI₂ aracılı vazodilatasyondur. İbuprofen bu kalkanı kapatınca (özellikle ACEİ/ARB efferent arteri açarken) glomerüler filtrasyon basıncı aniden çöker ("Triple Whammy" ABH!).',
            'Lökotrien Şantı (AERD): COX-1 inhibisyonu araşidonik asidin 5-lipoksijenaz (5-LOX) yolağına kaymasına ve mast hücre/eozinofillerden masif LTC₄/LTD₄/LTE₄ salınımına yol açarak duyarlı astımlılarda akut bronkospazm tetikler.',
            'Gastrik Mukozal Defans Çöküşü: COX-1 kaynaklı PGE₂ mide mukus, bikarbonat salgısını ve mukozal kan akımını korur; blokajı + ilacın zayıf asit (pKa ~4,5) yapısıyla epitel içinde iyon tuzağına girmesi mukozal erozyon ve ülser kanamasına zemin hazırlar.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Böbrek & Renin-Anjiyotensin Aksı → ABH & Hiperkalemi Fizyolojisi',
            tissueTarget: 'Afferent Arteriyol · Jukstaglomerüler Aparat · Medüller PGE₂',
            accent: 'rose',
            points: [
              'Renin salınımını baskılayarak hiporeninemik hipoaldosteronizm ve serum K⁺ artışı yapar; loop/tiyazid diüretiklerin natriüretik etkisini köreltir.',
              'Övolemik, genç ve sağlıklı böbrekte bazal PG bağımlılığı düşük olduğundan kısa süreli İbuprofen genellikle iyi tolere edilir.',
            ],
          },
          {
            systemTitle: 'Kardiyovasküler Sistem & Duktus Arteriozus',
            tissueTarget: 'Endotelyal PGI₂ / Trombosit TXA₂ Dengesi · Fetal Duktus',
            accent: 'amber',
            points: [
              'Prematüre yenidoğanda duktus arteriozusun açıklığını koruyan PGE₂’yi azaltarak indometasine kıyasla daha az mezenterik/renal vazokonstriksiyonla duktusun kapanmasını sağlar.',
              'Gebeliğin ≥30. haftasında aynı mekanizma intrauterin duktusun erken kapanmasına ve fetal sağ kalp yetmezliğine yol açar!',
            ],
          },
          {
            systemTitle: 'Periferik Nosiseptörler & Multimodal Sinerji',
            tissueTarget: 'Cerrahi İnsizyon · Sinovya · Perikard',
            accent: 'teal',
            points: [
              'Periferik inflamatuvar mediyatörleri azaltarak santral etkili Parasetamol ve opioidlerle tamamlayıcı (sinerjik) analjezi oluşturur.',
              'Akut perikarditte yüksek doz (600 mg q8sa) perikardiyal inflamasyonu ve ağrıyı hızla bastırır.',
            ],
          },
          {
            systemTitle: 'Gastrointestinal Mukoza & Trombosit Hemostazı',
            tissueTarget: 'Mide/Duodenum Mukozası · Trombosit COX-1 (Geri Dönüşlü)',
            accent: 'indigo',
            points: [
              'Kısa yarı ömrü (~2 saat) ve geri dönüşlü bağlanması sayesinde trombosit agregasyonu ilaç kesildikten ~24 saat içinde normale döner.',
              'Yüksek riskli hastalarda PPI (Pantoprazol 40 mg/gün) eklenmesi NSAİİ ilişkili üst GİS ülser kanamasını %70–80 azaltır.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Parasetamol + İbuprofen Kombinasyonu & Analjezik Tavan Prensibi',
          summary:
            'Klinik çalışmalarda İbuprofen 400 mg + Parasetamol 1000 mg sabit kombinasyonu, tek başına her iki ilaçtan ve birçok düşük doz oral opioid kombinasyonundan üstün analjezik etkinlik göstermiştir:',
          points: [
            'NNT Avantajı (Cochrane): Akut postoperatif ağrıda İbuprofen 400 mg’ın NNT’si ~2,5 iken Parasetamol 1000 mg + İbuprofen 400 mg kombinasyonunun NNT’si ~1,5’e kadar iner — en güçlü non-opioid kombinasyondur!',
            '400 mg Analjezik Platosu: Acil servis ve perioperatif çalışmalarda (Motov et al., Ann Emerg Med 2019) akut ağrıda 400 mg, 600 mg ve 800 mg oral İbuprofen arasında ağrı skoru açısından anlamlı fark bulunmamıştır — ağrıda gereksiz yere 800 mg’a çıkmak yerine 400 mg seçin!',
            'Kısa Süre Kuralı: Perioperatif multimodal analjezide 48–72 saatlik kısa kürler mükemmel fayda/risk oranı sunar; kronik kullanım mutlaka gözden geçirilmelidir.',
          ],
        }}
        clinicalPearls={[
          'Akut Ağrıda 400 mg = 800 mg (Motov 2019): Akut ağrı tedavisinde 400 mg İbuprofen zaten analjezik tavanındadır; 800 mg vermek ağrıyı daha fazla kesmezken GİS ve renal toksisiteyi artırır (600–800 mg yalnızca antiinflamatuvar/perikardit/gut endikasyonları içindir)!',
          'Emziren Annede (Sezaryen Sonrası) 1. Tercih NSAİİ: Gebeliğin 3. trimesterinde yasak olan İbuprofen, doğumdan hemen sonra emzirme döneminde anne sütüne geçişi <%0,6 olduğu için en güvenli NSAİİ haline gelir!',
          'Düşük Doz Aspirin + İbuprofen Zamanlaması: KAH hastasında İbuprofen, hemen salınımlı Aspirinden en az 30–60 dk SONRA alınmazsa Aspirinin koroner korumasını iptal eder!',
          'Konsantre IV Ampulü ASLA Puşeleme: 400 mg/4 mL (100 mg/mL) ampulü mutlaka en az 100 mL SF/D5W/RL ile seyreltip (≤4 mg/mL) 30 dakikada infüze edin!',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ ETKİLEŞİMLER & KAYNAKÇA (#sec-kaynaklar)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="İbuprofen"
        drugsComUrl="https://www.drugs.com/drug-interactions/ibuprofen.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Diğer Sistemik NSAİİ’ler (Ketorolak · Diklofenak · Deksketoprofen · Naproksen · Selekoksib)',
            mechanism: 'Aditif COX-1/COX-2 Blokajı (Ek Analjezik Fayda Yok, Katlanan Toksisite)',
            clinicalEffect:
              'Ağır GİS kanama/perforasyon, akut böbrek hasarı ve kardiyovasküler olay riskinde dramatik artış.',
            management:
              'İki sistemik NSAİİ’yi ASLA birlikte uygulamayın (multimodal sinerji için İbuprofen + Parasetamol kombine edilir!).',
          },
          {
            severity: 'D',
            agent: 'Düşük Doz Aspirin (81–100 mg/gün — Kardiyoprotektif)',
            mechanism: 'Trombosit COX-1 Aktif Bölgesinde (Ser529) Yarışmalı Sterik Blokaj + Aditif GİS Hasarı',
            clinicalEffect:
              'Aspirinin geri dönüşümsüz antiplatelet korumasının iptali (stent trombozu / MI riski!) ve artmış GİS kanama riski.',
            management:
              'Tek doz İbuprofen gerekiyorsa hemen salınımlı Aspirinden ≥30–60 dk SONRA (veya ≥8 sa ÖNCE) verin; enterik kaplı Aspirinle kronik İbuprofenden kaçının (alternatif: Parasetamol).',
          },
          {
            severity: 'D',
            agent: 'ACE İnhibitörleri / ARB’ler + Diüretikler ("Triple Whammy")',
            mechanism: 'Efferent Vazodilatasyon (ACEİ/ARB) + Volüm Kaybı (Diüretik) + Afferent Vazokonstriksiyon (NSAİİ)',
            clinicalEffect:
              'Glomerüler filtrasyon basıncında ani çöküş → Akut Böbrek Hasarı (ABH), hiperkalemi ve antihipertansif/diüretik etkide belirgin kayıp.',
            management:
              'Üçlü kombinasyondan KESİNLİKLE kaçının; ikili kombinasyonda dahi zorunluysa en kısa süre kullanıp 48–72 sa içinde Cr/K⁺ izleyin.',
          },
          {
            severity: 'D',
            agent: 'Antikoagülanlar (Varfarin · Apiksaban · Rivaroksaban · Dabigatran · Heparin/LMWH)',
            mechanism: 'Trombosit Fonksiyon İnhibisyonu + GİS Mukozal Hasar + Albumin Yer Değiştirmesi (Varfarin)',
            clinicalEffect:
              'Majör üst/alt GİS kanaması ve cerrahi kanama riskinde 3–6 kat artış.',
            management:
              'Mümkünse Parasetamol seçin; zorunlu kısa süreli kullanımda MUTLAKA PPI (Pantoprazol) ekleyin ve Hb/INR izleyin.',
          },
          {
            severity: 'D',
            agent: 'Lityum & Yüksek Doz Metotreksat (MTX)',
            mechanism: 'Renal Proksimal Tübüler Klirens İnhibisyonu',
            clinicalEffect:
              'Lityum düzeylerinde %15–40 artış (tremor, ataksi, konfüzyon, aritmi) ve yüksek doz MTX’te ağır pansitopeni/mukozit/ABH.',
            management:
              'Yüksek doz MTX ile birlikte kullanmayın; Lityum kullananlarda mümkünse Parasetamol seçin veya Lityum düzeyini yakın takip edin.',
          },
          {
            severity: 'C',
            agent: 'SSRI / SNRI Antidepresanlar & Sistemik Kortikosteroidler',
            mechanism: 'Sinerjistik GİS Mukozal İyileşme Bozukluğu & Trombosit Serotonin Azalması',
            clinicalEffect:
              'Üst GİS ülser kanaması riskinde belirgin artış.',
            management:
              'Eş zamanlı kullanımda mutlaka PPI gastroproteksiyonu (Pantoprazol 40 mg/gün) ekleyin ve süreyi en kısa tutun.',
          },
        ]}
        references={[
          {
            authors: 'Nissen SE, Yeomans ND, Solomon DH, et al. (PRECISION Trial Investigators)',
            title: 'Cardiovascular Safety of Celecoxib, Naproxen, or Ibuprofen for Arthritis',
            journal: 'New England Journal of Medicine',
            year: 2016,
            note: '24.081 hastada İbuprofen’in kardiyovasküler, GİS ve renal güvenlik profilini Naproksen ve Selekoksib ile karşılaştıran landmark RKÇ.',
          },
          {
            authors: 'Motov S, Masoudi A, Drapkin J, et al.',
            title: 'Comparison of Oral Ibuprofen at Three Single-Dose Regimens for Treating Acute Pain in the Emergency Department: A Randomized Controlled Trial',
            journal: 'Annals of Emergency Medicine',
            year: 2019,
            note: 'Akut ağrıda 400 mg, 600 mg ve 800 mg oral İbuprofen arasında analjezik etkinlik farkı olmadığını (400 mg analjezik tavanı) gösteren RKÇ.',
          },
          {
            authors: 'Adler Y, Charron P, Imazio M, et al. (ESC Task Force)',
            title: '2015 ESC Guidelines for the diagnosis and management of pericardial diseases',
            journal: 'European Heart Journal',
            year: 2015,
            note: 'Akut perikarditte 1. basamak tedavi olarak İbuprofen 600 mg q8sa + Kolşisin + PPI protokolünü belirleyen Avrupa Kardiyoloji Derneği kılavuzu.',
          },
          {
            authors: 'Ohlsson A, Walia R, Shah SS',
            title: 'Ibuprofen for the treatment of patent ductus arteriosus in preterm or low birth weight (or both) infants',
            journal: 'Cochrane Database of Systematic Reviews',
            year: 2020,
            note: 'Prematüre PDA kapanmasında İbuprofen’in (10-5-5 mg/kg) indometasinle eşit etkinlikte olup NEC ve geçici renal yetmezlik riskinin daha düşük olduğunu gösteren Cochrane derlemesi.',
          },
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Regional Anesthesia & Pain Medicine',
            year: 2018,
            note: 'İzole NSAİİ (İbuprofen dahil) kullanımının nöraksiyel blok yerleşimi veya kateter çekilmesi için ek kontrendikasyon oluşturmadığını belirten kılavuz.',
          },
          {
            authors: 'U.S. Food and Drug Administration (FDA) Drug Safety Communication',
            title: 'FDA recommends avoiding use of NSAIDs in pregnancy at 20 weeks or later because they can result in low amniotic fluid',
            journal: 'FDA Safety Communication',
            year: 2020,
            note: 'Gebeliğin ≥20. haftasından itibaren NSAİİ’lerin fetal renal disfonksiyon/oligohidramnioz ve ≥30. haftada duktus arteriozus kapanması riskini vurgulayan resmi uyarı.',
          },
          {
            authors: 'American Geriatrics Society 2023 Beers Criteria® Update Expert Panel',
            title: 'American Geriatrics Society 2023 updated AGS Beers Criteria® for potentially inappropriate medication use in older adults',
            journal: 'Journal of the American Geriatrics Society',
            year: 2023,
            note: 'Yaşlı (>65 yaş) hastalarda kronik oral NSAİİ kullanımından GİS kanama, ABH ve CV risk nedeniyle kaçınılmasını öneren kılavuz.',
          },
        ]}
      />
    </div>
  );
};
