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

interface ApixabanProtocolProps {
  isDark: boolean;
}

type CalcTab = 'dosing' | 'periop' | 'reversal' | 'compare';
type IndicationKey = 'nvaf' | 'vte_acute' | 'vte_ext' | 'ortho_prophylaxis';
type RenalCategory = 'ge30' | '15_29' | 'hd_esrd';
type SurgeryBleedRisk = 'minimal' | 'low_mod' | 'high' | 'neuraxial';

export const ApixabanProtocol: React.FC<ApixabanProtocolProps> = ({ isDark }) => {
  const [admeOpen, setAdmeOpen] = useMonographAccordion('apx-pk', false);
  const [activeTab, setActiveTab] = useState<CalcTab>('dosing');

  // Tab 1: NVAF ABC (≥2/3) & Endikasyon Doz Hesaplayıcı
  const [indication, setIndication] = useState<IndicationKey>('nvaf');
  const [ageYears, setAgeYears] = useState<number>(72);
  const [weightKg, setWeightKg] = useState<number>(74);
  const [serumCr, setSerumCr] = useState<number>(1.1);
  const [renalCat, setRenalCat] = useState<RenalCategory>('ge30');
  const [strongDualInhibitor, setStrongDualInhibitor] = useState<boolean>(false);

  // Tab 2: PAUSE Perioperatif & ASRA/ESAIC Nöraksiyel
  const [surgeryRisk, setSurgeryRisk] = useState<SurgeryBleedRisk>('high');
  const [periopRenal, setPeriopRenal] = useState<'ge30' | '15_29'>('ge30');
  const [isProphylacticDose, setIsProphylacticDose] = useState<boolean>(false);

  // Tab 3: Majör Kanama Reversal Hesaplayıcı
  const [bleedWeightKg, setBleedWeightKg] = useState<number>(75);
  const [lastDoseMg, setLastDoseMg] = useState<number>(5);
  const [hoursSinceDose, setHoursSinceDose] = useState<number>(4);

  const quickNavItems = [
    { id: 'apx-high-alert', label: 'High-Alert' },
    { id: 'apx-summary', label: 'Özet' },
    { id: 'apx-moa', label: 'Etki Mekanizması' },
    { id: 'apx-pk', label: 'ADME' },
    { id: 'apx-contra', label: 'Kontrendikasyon' },
    { id: 'apx-indications', label: 'Endikasyon & ABC' },
    { id: 'apx-calc', label: 'Hesaplayıcı' },
    { id: 'apx-tr', label: 'TR Preparat' },
    { id: 'apx-line', label: 'Uygulama' },
    { id: 'apx-organ', label: 'Böbrek / KC' },
    { id: 'apx-geriatrics', label: 'Geriatri / Obezite' },
    { id: 'apx-preg', label: 'Gebelik' },
    { id: 'apx-adverse', label: 'Yan Etkiler' },
    { id: 'apx-cautions', label: 'Özel Durumlar' },
    { id: 'apx-deep-pd', label: 'Derin PD' },
    { id: 'apx-refs', label: 'Etkileşim & Kaynak' },
  ];

  // Tab 1 Hesaplaması
  const doseCalc = useMemo(() => {
    const critAge = ageYears >= 80;
    const critWeight = weightKg <= 60;
    const critCr = serumCr >= 1.5;
    const abcCount = [critAge, critWeight, critCr].filter(Boolean).length;

    if (indication === 'nvaf') {
      if (renalCat === 'hd_esrd') {
        const reduceFda = critAge || critWeight;
        const fdaDose = reduceFda ? '2,5 mg PO q12sa' : '5 mg PO q12sa';
        if (strongDualInhibitor && reduceFda) {
          return {
            abcCount,
            critAge,
            critWeight,
            critCr,
            tone: 'rose' as const,
            doseHeadline: 'KAÇININ / KONTRENDİKE (HD + 2,5 mg + Güçlü CYP3A4/P-gp İnhibitörü)',
            detail:
              'Zaten 2,5 mg q12sa dozuna inmiş hastada güçlü çift CYP3A4 + P-gp inhibitörü (Ketokonazol, İtrakonazol, Ritonavir/Paxlovid®) ile Apiksaban KULLANILMAZ!',
            warning: 'EMA/TİTCK KÜB CrCl <15 ve HD’de önermez; FDA ise yalnızca stabil HD’de özel doz verir.',
          };
        }
        return {
          abcCount,
          critAge,
          critWeight,
          critCr,
          tone: 'amber' as const,
          doseHeadline: `FDA (Stabil HD): ${strongDualInhibitor ? '2,5 mg PO q12sa (İnhibitör azaltımı)' : fdaDose} · EMA/TİTCK: ÖNERİLMEZ`,
          detail:
            'FDA etiketi stabil hemodiyalizde NVAF için 5 mg q12sa (Yaş ≥80 VEYA Kilo ≤60 kg ise 2,5 mg q12sa) seçeneği tanır; ancak EMA/TİTCK KÜB CrCl <15 mL/dk’da önermemektedir (RENAL-AF & AXADIA-AFNET 8: kanama riski yüksek!).',
          warning: 'Mekanik kalp kapağı veya orta-ağır mitral darlığı varsa Apiksaban KESİNLİKLE KONTRENDİKEDİR (Varfarin kullanın)!',
        };
      }

      const reduceByAbc = abcCount >= 2;
      const reduceByEmaCrCl = renalCat === '15_29';
      const needs25 = reduceByAbc || reduceByEmaCrCl;

      if (strongDualInhibitor) {
        if (needs25) {
          return {
            abcCount,
            critAge,
            critWeight,
            critCr,
            tone: 'rose' as const,
            doseHeadline: 'KULLANMAYIN / KONTRENDİKE (2,5 mg adayı + Güçlü Çift CYP3A4/P-gp İnhibitörü)',
            detail:
              'Halihazırda 2,5 mg q12sa doz azaltımı gereken hastada güçlü çift CYP3A4 + P-gp inhibitörü (Ketokonazol, İtrakonazol, Ritonavir/Paxlovid®) eklenirse Apiksaban kesilmeli/değiştirilmelidir!',
            warning: 'EMA KÜB güçlü çift CYP3A4 + P-gp inhibitörleriyle eşzamanlı kullanımı genel olarak önermez.',
          };
        }
        return {
          abcCount,
          critAge,
          critWeight,
          critCr,
          tone: 'amber' as const,
          doseHeadline: '2,5 mg PO q12sa (FDA: Güçlü Çift İnhibitör Nedeniyle %50 Azalt · EMA: Kaçın!)',
          detail:
            '5 mg q12sa alan hastada güçlü çift CYP3A4 + P-gp inhibitörü zorunluysa FDA dozu %50 azaltarak 2,5 mg q12sa önerir (EMA ise alternatif önerir).',
          warning: 'İnhibitör kesildikten 3–5 gün sonra standart 5 mg q12sa dozuna dönülür.',
        };
      }

      if (needs25) {
        return {
          abcCount,
          critAge,
          critWeight,
          critCr,
          tone: 'teal' as const,
          doseHeadline: '2,5 mg PO q12sa (İndirgenmiş NVAF Dozu)',
          detail: reduceByAbc
            ? `ABC Kuralı Karşılandı (${abcCount}/3 kriter mevcut: ${[
                critAge ? 'Yaş ≥80' : '',
                critWeight ? 'Kilo ≤60 kg' : '',
                critCr ? 'Cr ≥1,5' : '',
              ]
                .filter(Boolean)
                .join(' + ')}) → 2,5 mg günde 2 kez (q12sa)!`
            : 'EMA/ESC 2021: CrCl 15–29 mL/dk aralığında NVAF için doğrudan 2,5 mg PO q12sa önerilir (yakın kanama ve böbrek izlemiyle).',
          warning: 'Günde 2 kez 12 saat arayla, aç veya tok alınır.',
        };
      }

      return {
        abcCount,
        critAge,
        critWeight,
        critCr,
        tone: 'emerald' as const,
        doseHeadline: '5 mg PO q12sa (Standart NVAF Dozu — ARISTOTLE)',
        detail:
          abcCount === 1
            ? 'DİKKAT (Yetersiz Doz Tuzağı!): Yalnızca 1/3 ABC kriteri mevcut — 2/3 tamamlanmadıkça dozu 2,5 mg’a DÜŞÜRMEYİN! Off-label düşük doz inme riskini belirgin artırır.'
            : '0/3 ABC kriteri → Tam standart 5 mg PO günde 2 kez (q12sa) uygulanır.',
        warning: 'ARISTOTLE: Varfarine göre inme/emboliyi %21, majör kanamayı %31 ve tüm nedenli mortaliteyi %11 azalttı!',
      };
    }

    if (indication === 'vte_acute') {
      if (renalCat === 'hd_esrd') {
        return {
          abcCount,
          critAge,
          critWeight,
          critCr,
          tone: 'rose' as const,
          doseHeadline: 'KAÇININ / ÖNERİLMEZ (ESRD / HD Akut DVT-PE → UFH / Varfarin)',
          detail: 'AMPLIFY çalışması CrCl <25 mL/dk hastaları dışlamıştır; akut DVT/PE’de CrCl <15 / HD’de UFH ve ardından Varfarin tercih edilir.',
          warning: 'CrCl 15–29 mL/dk aralığında dahi akut 10 mg q12sa yüklemede yüksek kanama riski nedeniyle dikkatli olunmalıdır.',
        };
      }
      if (strongDualInhibitor) {
        return {
          abcCount,
          critAge,
          critWeight,
          critCr,
          tone: 'amber' as const,
          doseHeadline: 'FDA: %50 Azalt (5 mg q12sa × 7g → 2,5 mg q12sa) · EMA: KAÇIN!',
          detail: 'Güçlü çift CYP3A4 + P-gp inhibitörü altında Apiksaban düzeyi ~2 kat artar; mümkünse DMAH seçin.',
          warning: 'Akut DVT/PE’de NVAF’deki ABC (2/3) kuralı uygulanmaz!',
        };
      }
      return {
        abcCount,
        critAge,
        critWeight,
        critCr,
        tone: renalCat === '15_29' ? 'amber' : 'emerald',
        doseHeadline: 'İlk 7 Gün: 10 mg PO q12sa → 8. Günden İtibaren: 5 mg PO q12sa',
        detail:
          'AMPLIFY (NEJM 2013) & CARAVAGGIO (Kanser VTE, NEJM 2020): Parenteral heparin/DMAH ön tedavisi GEREKTİRMEZ! NVAF’deki ABC (2/3) doz azaltma kuralı Akut DVT/PE’de GEÇERLİ DEĞİLDİR!',
        warning:
          renalCat === '15_29'
            ? 'UYARI (CrCl 15–29 mL/dk): AMPLIFY’da CrCl <25 dışlanmıştır; kanama açısından çok yakın izlem veya DMAH/UFH değerlendirin.'
            : 'Hemodinamik instabil masif PE (tromboliz adayı) hastasında başlangıçta IV UFH kullanın!',
      };
    }

    if (indication === 'vte_ext') {
      return {
        abcCount,
        critAge,
        critWeight,
        critCr,
        tone: renalCat === 'hd_esrd' ? 'rose' : 'teal',
        doseHeadline: renalCat === 'hd_esrd' ? 'CrCl <15 / HD’de ÖNERİLMEZ' : '2,5 mg PO q12sa (AMPLIFY-EXT · ≥6 Ay Tedavi Sonrası)',
        detail:
          'AMPLIFY-EXT (NEJM 2013): İlk ≥6 aylık akut DVT/PE tedavisini tamamlayan ve nüks riski süren hastalarda 2,5 mg q12sa, tekrarlayan VTE’yi %80 azaltırken majör kanamayı plasebo düzeyinde (%0,2 vs %0,5) tuttu!',
        warning: strongDualInhibitor ? 'Güçlü çift CYP3A4+P-gp inhibitörü varken 2,5 mg q12sa KULLANILMAZ!' : 'Kanser aktifse tam 5 mg q12sa ile devam edilmesi tercih edilir.',
      };
    }

    // Ortopedik Profilaksi
    return {
      abcCount,
      critAge,
      critWeight,
      critCr,
      tone: renalCat === 'hd_esrd' ? 'rose' : 'emerald',
      doseHeadline: renalCat === 'hd_esrd' ? 'CrCl <15 / HD’de ÖNERİLMEZ' : '2,5 mg PO q12sa (Postop 12–24. Saatte Başla!)',
      detail:
        'ADVANCE-2 & ADVANCE-3: Elektif diz protezinde 10–14 gün, kalça protezinde 32–38 gün. İlk doz cerrahi hemostaz sağlandıktan 12–24 saat sonra verilir.',
      warning: strongDualInhibitor ? 'Güçlü çift CYP3A4+P-gp inhibitörü ile 2,5 mg q12sa KULLANILMAZ!' : 'Kalıcı epidural kateter varsa kateter çekiminden ≥6 saat sonra başlayın!',
    };
  }, [indication, ageYears, weightKg, serumCr, renalCat, strongDualInhibitor]);

  // Tab 2: PAUSE & ASRA/ESAIC Hesaplaması
  const periopCalc = useMemo(() => {
    if (surgeryRisk === 'minimal') {
      return {
        tone: 'emerald' as const,
        holdText: 'KESMEYİN veya yalnızca işlem sabahı 1 doz atlayın!',
        restartText: 'İşlem sonrası hemostaz sağlanınca aynı akşam / ertesi sabah devam.',
        detail:
          'CHEST 2022: Basit diş çekimi, katarakt, yüzeyel dermatolojik işlemde Apiksaban genellikle kesilmez (veya işlem sabahı tek doz atlanır). Köprüleme YAPILMAZ!',
      };
    }
    if (surgeryRisk === 'neuraxial') {
      const waitHours = isProphylacticDose ? 'ESAIC 2022: 36 saat · ASRA 2018: 72 saat (güvenli pratik: 48–72 sa)' : '72 saat (3 tam gün) — CrCl 15–29 ise Anti-Xa <30 ng/mL doğrula!';
      return {
        tone: 'rose' as const,
        holdText: `NÖRAKSİYEL BLOK ÖNCESİ: ${waitHours}`,
        restartText: 'Kateter çekiminden / bloktan EN AZ 6–8 saat sonra (ASRA: 6 sa · ESAIC: 6–8 sa) yeniden başla!',
        detail:
          'Apiksaban altında KALICI EPİDURAL KATETER önerilmez! Spontane/travmatik ponksiyonda ilk doz ≥24 sa ertelenmelidir. Rutin PT/aPTT Apiksaban etkisini DIŞLAMAZ!',
      };
    }
    if (surgeryRisk === 'high') {
      const days = periopRenal === '15_29' ? '3 tam gün (≥72 saat)' : '2 tam gün (≥48 saat — PAUSE Protokolü)';
      return {
        tone: 'amber' as const,
        holdText: `YÜKSEK KANAMA RİSKLİ CERRAHİ: Cerrahiden ${days} önce kes (KÖPRÜLEME YOK!)`,
        restartText: 'Postop tam hemostaz sağlandığında 48–72. saatte yeniden başla (arada gerekiyorsa profilaktik DMAH verilebilir).',
        detail:
          'PAUSE Trial (JAMA Intern Med 2019): 2 tam gün kesme (ameliyattan 3 gün önce son doz) ile hastaların >%98’inde rezidüel anti-Xa <50 ng/mL ve majör kanama/inme oranları çok düşük (<%1–2) bulunmuştur!',
      };
    }
    // low_mod
    const days = periopRenal === '15_29' ? '2 tam gün (≥48 saat)' : '1 tam gün (≥24–36 saat — PAUSE Protokolü)';
    return {
      tone: 'teal' as const,
      holdText: `DÜŞÜK-ORTA KANAMA RİSKLİ CERRAHİ: Cerrahiden ${days} önce kes (KÖPRÜLEME YOK!)`,
      restartText: 'Postop 24. saatte (hemostaz sağlanınca) olağan dozda yeniden başla.',
      detail: 'Kısa 12 saatlik yarı ömrü nedeniyle perioperatif DMAH/UFH köprülemesi KESİNLİKLE ÖNERİLMEZ!',
    };
  }, [surgeryRisk, periopRenal, isProphylacticDose]);

  // Tab 3: Reversal Hesaplaması
  const reversalCalc = useMemo(() => {
    const w = Math.max(35, Math.min(180, bleedWeightKg || 75));
    const pccIu = Math.min(5000, Math.round((Math.min(w, 100) * 50) / 50) * 50);
    const pccVials = Math.ceil(pccIu / 500);
    const charcoalEligible = hoursSinceDose <= 4;
    const highDoseAndexanet = lastDoseMg > 5 && hoursSinceDose < 8;

    return {
      pccIu,
      pccVials,
      charcoalEligible,
      andexanetRegimen: highDoseAndexanet
        ? 'Yüksek Doz Andeksanet Alfa: 800 mg IV bolus (30 mg/dk) → ardından 8 mg/dk × 120 dk (960 mg infüzyon)'
        : 'Düşük Doz Andeksanet Alfa: 400 mg IV bolus (30 mg/dk) → ardından 4 mg/dk × 120 dk (480 mg infüzyon)',
    };
  }, [bleedWeightKg, lastDoseMg, hoursSinceDose]);

  const buildOrderText = () => {
    return [
      `APİKSABAN (Eliquis®) KLİNİK ORDER ÖZETİ`,
      `Hasta: ${ageYears}y · ${weightKg} kg · Cr ${serumCr} mg/dL (ABC Kriteri: ${doseCalc.abcCount}/3)`,
      `Doz Önerisi: ${doseCalc.doseHeadline}`,
      `Perioperatif (PAUSE): ${periopCalc.holdText}`,
      `Acil Kanama (ACC 2020): Protamin & K1 Vit %0 ETKİSİZ! 4F-PCC ${reversalCalc.pccIu} IU (50 IU/kg · ~${reversalCalc.pccVials}×500 IU flakon) veya Andeksanet Alfa + TXA 1 g IV.`,
    ].join('\n');
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. HIZLI NAVİGASYON + TÜMÜNÜ AÇ / KAPAT */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. ISMP HIGH-ALERT GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="apx-high-alert"
        tallManName="APIXABAN (Eliquis®)"
        confusionRiskWith="Rivaroksaban (Xarelto®) · Edoksaban · Dabigatran"
        criticalAlerts={[
          'NVAF "ABC ≥2/3" KURALINI YANLIŞ UYGULAMAYIN (OFF-LABEL UNDERDOSING!): 5 mg q12sa standarttır; 2,5 mg q12sa YALNIZCA ≥2/3 kriter (Yaş ≥80 · Kilo ≤60 kg · Cr ≥1,5 mg/dL) veya CrCl 15–29 mL/dk varsa verilir! Tek kriterle 2,5 mg yazmak hastayı inmeden koruyamaz!',
          'MEKANİK KAPAK, MİTRAL DARLIK & ÜÇLÜ POZİTİF APS’DE MUTLAK KONTRENDİKE: Bu üç grupta tüm DOAC’lar kontrendikedir — Varfarin kullanılmalıdır!',
          'PROTAMİN SÜLFAT VE K1 VİTAMİNİ %0 ETKİSİZDİR! Yaşamı tehdit eden kanamada vakit kaybetmeden Andeksanet Alfa (varsa) veya TR pratiğinde 4-Faktör PCC (50 IU/kg IV, maks 5.000 IU veya sabit 2.000 IU) + TXA 1 g IV verin; son doz ≤2–4 sa ise 50 g Aktif Kömür ekleyin!',
          'RUTİN PT/INR VE aPTT GÜVENİLMEZDİR! Normal PT/aPTT sonucu terapötik Apiksaban düzeyini ASLA dışlamaz — acil ameliyat/nöraksiyel öncesi ancak Apiksaban-kalibreli Anti-Xa (<30 ng/mL) güvenle dışlama yapar!',
          'NÖRAKSİYEL BLOK ÖNCESİ 72 SAAT KURALI (ASRA 2018 / ESAIC 2022): Terapötik Apiksaban (5–10 mg q12sa) spinal/epidural bloktan EN AZ 72 SAAT (3 gün) önce kesilmeli ve kalıcı epidural kateter bırakılmamalıdır!',
        ]}
        antidoteOrRescue="YAŞAMI TEHDİT EDEN KANAMA (ACC 2020): (1) İlacı kes, mekanik/cerrahi hemostaz + TXA 1 g IV + son doz ≤2–4 saat ise 50 g Aktif Kömür PO/NG; (2) Spesifik Antidot: Andeksanet Alfa (düşük doz: 400 mg IV → 480 mg/2 sa; yüksek doz [>5 mg ve <8 sa]: 800 mg IV → 960 mg/2 sa — TR’de çoğu merkezde stokta yoktur); (3) 1. Basamak TR Kurtarma: 4-Faktör PCC (Cofact® / Octaplex® / Beriplex®) 50 IU/kg IV (maks 5.000 IU; alternatif sabit 2.000 IU). PROTAMİN & K1 VİTAMİNİ ETKİSİZDİR; Hemodiyaliz yalnızca ~%14 temizler!"
      />

      {/* 3. KİMLİK & HIZLI ÖZET KARTI (DAİMA AÇIK) */}
      <section
        id="apx-summary"
        className={`rounded-2xl border p-5 sm:p-6 scroll-mt-20 ${
          isDark
            ? 'border-sky-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/25'
            : 'border-sky-200 bg-gradient-to-br from-white via-white to-sky-50/50'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-lg border px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase ${
              isDark
                ? 'border-sky-500/40 bg-sky-950/60 text-sky-300'
                : 'border-sky-300 bg-sky-100 text-sky-900'
            }`}
          >
            Antitrombotik · Oral Direkt Faktör Xa İnhibitörü (DOAC / NOAC)
          </span>
          <span
            className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] font-semibold ${
              isDark ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
            }`}
          >
            ATC: B01AF02
          </span>
          <span
            className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] font-bold ${
              isDark
                ? 'border-emerald-500/40 bg-emerald-950/50 text-emerald-300'
                : 'border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}
          >
            En Düşük Renal Atılım (%27) · Yemek Şartı Yok
          </span>
        </div>

        <h2 className={`mt-2 text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Apiksaban{' '}
          <span className={`font-semibold text-base sm:text-lg ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
            (Eliquis® 2,5 mg · 5 mg)
          </span>
        </h2>

        <p className={`mt-1.5 max-w-4xl text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Hem serbest hem de pıhtıya bağlı <strong>Faktör Xa</strong>’yı Antitrombin-III’ten bağımsız olarak doğrudan ve
          tersinir inhibe eden oral <strong>DOAC</strong>’tır. <strong>ARISTOTLE</strong> çalışmasında Varfarine göre
          inme/sistemik emboliyi, majör kanamayı ve tüm nedenli mortaliteyi aynı anda azaltan; tüm DOAC’lar arasında{' '}
          <strong>en düşük renal atılıma (~%27)</strong> ve en düşük GİS kanama profiline (<strong>CARAVAGGIO</strong>)
          sahip ajandır. Aç veya tok alınabilir, rutin koagülasyon izlemi gerektirmez.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            {
              label: 'NVAF & ABC (≥2/3)',
              value: '5 mg q12sa · ≥2/3: 2,5 mg',
              sub: 'Yaş ≥80 · Kilo ≤60 · Cr ≥1,5',
              tone: isDark ? 'border-sky-500/30 bg-sky-950/30 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-900',
            },
            {
              label: 'Akut DVT / PE (AMPLIFY)',
              value: '10 mg q12sa × 7g → 5 mg',
              sub: 'Heparin ön tedavisi YOK · Uzatma 2,5 mg',
              tone: isDark ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-900',
            },
            {
              label: 'PAUSE & ASRA Nöraksiyel',
              value: 'Cerrahi 1–2g · Blok 72 sa',
              sub: 'Perioperatif köprüleme YOK!',
              tone: isDark ? 'border-amber-500/30 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-900',
            },
            {
              label: 'Acil Reversal (ACC 2020)',
              value: 'Andeksanet / 4F-PCC 50 IU/kg',
              sub: 'Protamin & K1 %0 · ≤4 sa: Aktif Kömür',
              tone: isDark ? 'border-rose-500/30 bg-rose-950/30 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-900',
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
        sectionId="apx-moa"
        summary="Apiksaban, koagülasyon kaskadının intrensek ve ekstrensek yollarının kesiştiği ortak basamaktaki Faktör Xa’nın (FXa) aktif katalitik cebine doğrudan, seçici ve tersinir bağlanır. Heparin/DMAH/Fondaparinukstan farklı olarak Antitrombin-III’e ihtiyaç duymaz; hem plazmada serbest dolaşan hem de pıhtı içinde protrombinaz kompleksine (FXa–FVa–Ca²⁺) yerleşmiş FXa’yı eşzamanlı inhibe ederek trombin üretimini hızla durdurur."
        pillars={[
          {
            title: '1. AT-III Bağımsız Direkt FXa Blokajı',
            detail:
              'Yüksek afinite (Ki = 0,08 nM) ile doğrudan FXa aktif merkezine bağlanır; trombin (FIIa) üzerinde doğrudan etkisi yoktur ve trombosit agregasyonunu direkt bozmaz.',
          },
          {
            title: '2. Pıhtıya Bağlı (Clot-Bound) FXa Etkinliği',
            detail:
              'Küçük moleküler yapısı (459 Da) sayesinde fibrin ağı içindeki protrombinaz kompleksine nüfuz ederek büyümekte olan trombüsün yüzeyindeki FXa’yı da baskılar.',
          },
          {
            title: '3. Hızlı Başlangıç & Öngörülebilir Etki',
            detail:
              'İlk oral dozdan 3–4 saat sonra pik antikoagülan etkiye ulaşır — bu sayede akut DVT/PE tedavisinde parenteral heparin köprülemesi olmadan doğrudan monoterapiyle başlanabilir.',
          },
        ]}
      />

      {/* 5. FARMAKOKİNETİK (ADME) AKORDİYONU */}
      <section
        id="apx-pk"
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
            <Clock className={`h-5 w-5 shrink-0 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
            <div>
              <h3 className={`text-sm sm:text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Farmakokinetik (ADME) &amp; Laboratuvar Özellikleri
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                PO %50 (aç/tok) · Tmax 3–4 sa · t½ ~12 sa · Yalnızca %27 Renal · CYP3A4 + P-gp / BCRP
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
                  value: 'PO ~%50 · Tmax 3–4 sa',
                  detail:
                    'Yemekten tamamen bağımsızdır (Rivaroksaban 15–20 mg’daki yemek zorunluluğu yoktur!). Ezilip su/elma püresiyle veya NG tüpten verilebilir; distal ince bağırsak/kolondan da emilir (bariatrik cerrahi sonrası dikkat!).',
                },
                {
                  title: 'Dağılım (Distribution)',
                  value: 'Vd ~21 L · Protein %87',
                  detail:
                    'Yüksek plazma protein bağlanması (%87) nedeniyle hemodiyalizle anlamlı ölçüde temizlenmez (~%14). Plasenta ve anne sütüne geçer.',
                },
                {
                  title: 'Metabolizma (Metabolism)',
                  value: 'CYP3A4 (~%25) + P-gp / BCRP',
                  detail:
                    'Ağırlıklı olarak CYP3A4 (O-demetilasyon ve hidroksilasyon) ile metabolize olur ve P-glikoprotein / BCRP efluks taşıyıcılarının substratıdır. Aktif metaboliti yoktur.',
                },
                {
                  title: 'Eliminasyon (Excretion)',
                  value: 't½ ~12 sa · %27 Renal / %73 Fekal-Biliyer',
                  detail:
                    'Dabigatran (%80), Edoksaban (%50) ve Rivaroksaban’a (%33–36 aktif) kıyasla EN DÜŞÜK renal atılımlı DOAC’tır! Yine de ağır KBY’de t½ 15–17 saate uzayabilir.',
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
                  <p className={`mt-1 font-mono text-sm font-bold ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
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
        sectionId="apx-contra"
        absoluteItems={[
          'Mekanik protez kalp kapağı ve orta-ağır romatizmal mitral darlığı — TÜM DOAC’LAR KONTRENDİKE (Varfarin kullanın)!',
          'Yüksek riskli / Üçlü pozitif Antifosfolipid Sendromu (APS) — arteriyel/venöz tromboz nüksü nedeniyle KONTRENDİKE (Varfarin altın standart)!',
          'Aktif patolojik majör kanama (intrakraniyal, GİS, retroperitoneal, cerrahi alan).',
          'Ağır karaciğer yetmezliği (Child-Pugh C) veya koagülopati/klinik anlamlı kanama riskiyle seyreden karaciğer hastalığı.',
          'Gebelik ve emzirme (plasenta ve anne sütüne geçer — DMAH / postpartum Varfarin tercih edin).',
          'Zaten 2,5 mg q12sa alan hastada güçlü çift CYP3A4 + P-gp inhibitörü (Ketokonazol, İtrakonazol, Ritonavir/Paxlovid®) eşzamanlı kullanımı.',
        ]}
        relativeItems={[
          'Ağır KBY (CrCl <15 mL/dk) ve Hemodiyaliz (EMA/TİTCK önermez; FDA yalnızca stabil HD + NVAF için özel izin tanır).',
          'Orta karaciğer yetmezliği (Child-Pugh B) — sınırlı veri ve artmış kanama riski nedeniyle dikkatle kullanım.',
          'Güçlü çift CYP3A4 + P-gp indükleyicileri (Rifampisin, Karbamazepin, Fenitoin, Sarı Kantaron) — plazma düzeyi >%50 düşer, tromboz riski!',
          'Aktif/reze edilmemiş üst GİS veya ürotelyal kanser lezyonları (CARAVAGGIO genel olarak güvenli olsa da kanayan lüminal tümörde DMAH daha güvenlidir).',
          'Ağır malabsorpsiyon / gastrik bypass (Roux-en-Y) sonrası proksimal emilim belirsizliği (peak/trough Anti-Xa veya Varfarin değerlendirilir).',
        ]}
        clinicalNote="Biyoprotez (doku) kalp kapağı (TAVI dahil, mitral darlığı yoksa) veya kapak tamiri olan AF hastalarında (implantasyondan >3 ay sonra) Apiksaban mekanik kapakların aksine güvenle kullanılabilir (ESC 2021 / AHA-ACC)!"
      />

      {/* 7. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ (AKORDİYON) */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="apx-indications"
        eyebrow="ARISTOTLE · AMPLIFY · AMPLIFY-EXT · CARAVAGGIO · ADVANCE"
        title="Klinik Endikasyonlar, ABC (≥2/3) Kuralı ve Doz Rejimleri"
        subtitle="NVAF 5 mg q12sa (≥2/3 ABC → 2,5 mg) · Akut DVT/PE 10 mg × 7g → 5 mg · Uzatma & Ortopedi 2,5 mg q12sa"
        icon={<Syringe className={`h-5 w-5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />}
        badge={
          <span
            className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
              isDark ? 'border-sky-500/30 bg-sky-950/40 text-sky-300' : 'border-sky-200 bg-sky-50 text-sky-700'
            }`}
          >
            5 Endikasyon
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {[
            {
              title: '1. Non-Valvüler Atriyal Fibrilasyon — NVAF (ARISTOTLE)',
              badge: '5 mg PO q12sa · ≥2/3 ABC: 2,5 mg',
              lines: [
                'Standart Doz: 5 mg PO günde 2 kez (q12sa).',
                'Doz Azaltımı → 2,5 mg PO q12sa YALNIZCA ≥2/3 ABC kriteri varsa: (A) Yaş ≥80 · (B) Ağırlık ≤60 kg · (C) Serum Kreatinin ≥1,5 mg/dL — VEYA (EMA/ESC) CrCl 15–29 mL/dk!',
                'YALNIZCA 1 KRİTER VARSA 5 mg q12sa İLE DEVAM EDİN! Hatalı 2,5 mg reçetelenmesi inme oranını belirgin artırır.',
              ],
            },
            {
              title: '2. Akut DVT ve Pulmoner Emboli Tedavisi (AMPLIFY)',
              badge: '10 mg q12sa × 7g → 5 mg q12sa',
              lines: [
                'Başlangıç (İlk 7 gün): 10 mg (2 × 5 mg) PO q12sa — parenteral UFH/DMAH ön tedavisi GEREKMEZ!',
                'İdame (8. günden itibaren en az 3–6 ay): 5 mg PO q12sa.',
                'KRİTİK: NVAF’deki ABC (≥2/3) doz azaltma kuralı Akut DVT/PE tedavisinde GEÇERLİ DEĞİLDİR!',
              ],
            },
            {
              title: '3. Uzatılmış VTE Sekonder Profilaksisi (AMPLIFY-EXT)',
              badge: '2,5 mg PO q12sa (≥6 Ay Sonrası)',
              lines: [
                'İlk 6 aylık akut DVT/PE tedavisini tamamlamış, provoke olmamış veya süregiden riskli hastalarda 2,5 mg PO q12sa.',
                'Tekrarlayan VTE/ölüm riskini %80 azaltırken majör kanamayı plasebo ile eşdeğer tutar (%0,2 vs %0,5).',
              ],
            },
            {
              title: '4. Kanser İlişkili Tromboz — CAT (CARAVAGGIO, NEJM 2020)',
              badge: '10 mg × 7g → 5 mg q12sa',
              lines: [
                'Aktif kanserli akut DVT/PE hastalarında Dalteparin (DMAH) ile eşdeğer etkinlik ve ARTMIŞ MAJÖR GİS KANAMASI OLMADAN (GİS kanaması %1,9 vs %1,7 — Rivaroksaban/Edoksabandan daha güvenli GİS profili!).',
                'Yine de aktif kanayan reze edilmemiş üst GİS tümörü veya ağır kemoterapi trombositopenisinde (<50.000/µL) DMAH değerlendirilir.',
              ],
            },
            {
              title: '5. Ortopedik Cerrahi VTE Profilaksisi (ADVANCE-2 / -3)',
              badge: '2,5 mg PO q12sa · Postop 12–24 sa',
              lines: [
                'Elektif total diz protezi (10–14 gün) ve total kalça protezi (32–38 gün): 2,5 mg PO q12sa.',
                'İlk doz cerrahi hemostaz sağlandıktan 12–24 saat sonra verilir (kalıcı epidural kateter varsa çekimden ≥6 sa sonra!).',
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
                    isDark ? 'border-sky-500/30 bg-sky-950/50 text-sky-300' : 'border-sky-200 bg-sky-50 text-sky-800'
                  }`}
                >
                  {card.badge}
                </span>
              </div>
              <ul className={`mt-2.5 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {card.lines.map((ln, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-sky-400' : 'bg-sky-600'}`} />
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
        sectionId="apx-calc"
        title="Etkileşimli Apiksaban Hesaplayıcı: ABC (≥2/3), PAUSE Perioperatif & Reversal"
        subtitle="NVAF ABC Doz Kontrolü · PAUSE & ASRA 72 sa Nöraksiyel · 4F-PCC / Andeksanet Reversal · Karşılaştırma"
        icon={
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-100 text-sky-700'
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
                { id: 'dosing', label: '1. ABC (≥2/3) & Doz', icon: Syringe },
                { id: 'periop', label: '2. PAUSE & Nöraksiyel', icon: Scissors },
                { id: 'reversal', label: '3. Kanama Reversal', icon: AlertOctagon },
                { id: 'compare', label: '4. Apiksaban vs Varfarin', icon: GitCompare },
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
                      ? 'border-sky-600 bg-sky-600 text-white shadow-xs'
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

        {/* TAB 1: ABC (≥2/3) & DOZ HESAPLAYICI */}
        {activeTab === 'dosing' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Endikasyon
                </label>
                <select
                  value={indication}
                  onChange={(e) => setIndication(e.target.value as IndicationKey)}
                  className={`mt-2 w-full rounded-lg border px-2 py-1.5 text-xs font-semibold ${
                    isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                  }`}
                >
                  <option value="nvaf">Non-Valvüler AF (ARISTOTLE)</option>
                  <option value="vte_acute">Akut DVT / PE (AMPLIFY / CAT)</option>
                  <option value="vte_ext">Uzatılmış VTE Profilaksi (≥6 ay)</option>
                  <option value="ortho_prophylaxis">Ortopedik Protez Profilaksisi</option>
                </select>
                <label className="mt-2.5 flex cursor-pointer items-center gap-2 text-[11px] font-semibold text-amber-600 dark:text-amber-300">
                  <input
                    type="checkbox"
                    checked={strongDualInhibitor}
                    onChange={(e) => setStrongDualInhibitor(e.target.checked)}
                    className="rounded border-slate-400"
                  />
                  <span>Güçlü Çift CYP3A4+P-gp İnhibitörü</span>
                </label>
              </div>

              <div
                className={`rounded-xl border p-3.5 ${
                  doseCalc.critAge
                    ? isDark
                      ? 'border-amber-500/50 bg-amber-950/20'
                      : 'border-amber-300 bg-amber-50/70'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60'
                      : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    A · Yaş (≥80)
                  </label>
                  {doseCalc.critAge && (
                    <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">+1 ABC</span>
                  )}
                </div>
                <input
                  type="number"
                  min={18}
                  max={110}
                  value={ageYears}
                  onChange={(e) => setAgeYears(Number(e.target.value) || 70)}
                  className={`mt-2 w-full rounded-lg border px-2.5 py-1.5 font-mono text-sm font-black ${
                    isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                  }`}
                />
              </div>

              <div
                className={`rounded-xl border p-3.5 ${
                  doseCalc.critWeight
                    ? isDark
                      ? 'border-amber-500/50 bg-amber-950/20'
                      : 'border-amber-300 bg-amber-50/70'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60'
                      : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    B · Kilo (≤60 kg)
                  </label>
                  {doseCalc.critWeight && (
                    <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">+1 ABC</span>
                  )}
                </div>
                <input
                  type="number"
                  min={30}
                  max={220}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value) || 75)}
                  className={`mt-2 w-full rounded-lg border px-2.5 py-1.5 font-mono text-sm font-black ${
                    isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                  }`}
                />
              </div>

              <div
                className={`rounded-xl border p-3.5 ${
                  doseCalc.critCr
                    ? isDark
                      ? 'border-amber-500/50 bg-amber-950/20'
                      : 'border-amber-300 bg-amber-50/70'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60'
                      : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    C · Kreatinin (≥1,5)
                  </label>
                  {doseCalc.critCr && (
                    <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-slate-950">+1 ABC</span>
                  )}
                </div>
                <input
                  type="number"
                  step={0.1}
                  min={0.4}
                  max={12.0}
                  value={serumCr}
                  onChange={(e) => setSerumCr(Number(e.target.value) || 1.0)}
                  className={`mt-2 w-full rounded-lg border px-2.5 py-1.5 font-mono text-sm font-black ${
                    isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Böbrek Grubu (CrCl):</span>
              {(
                [
                  { id: 'ge30', label: 'CrCl ≥30 mL/dk' },
                  { id: '15_29', label: 'CrCl 15–29 mL/dk (Ağır KBY)' },
                  { id: 'hd_esrd', label: 'CrCl <15 / Stabil Hemodiyaliz' },
                ] as const
              ).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRenalCat(r.id)}
                  className={`cursor-pointer rounded-lg border px-2.5 py-1 text-xs font-bold ${
                    renalCat === r.id
                      ? r.id === 'hd_esrd'
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
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                  Hesaplanan Rejim (ABC Skoru: {doseCalc.abcCount}/3)
                </span>
                <span className="font-mono text-sm font-black">{doseCalc.doseHeadline}</span>
              </div>
              <p className="text-xs leading-relaxed">{doseCalc.detail}</p>
              <p className="text-xs font-semibold opacity-90">{doseCalc.warning}</p>
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
                  İşlem / Kanama Riski Kategorisi
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
                            : 'border-sky-600 bg-sky-600 text-white'
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
                    Böbrek Fonksiyonu (CrCl)
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
                            ? 'border-sky-600 bg-sky-600 text-white'
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
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={isProphylacticDose}
                      onChange={(e) => setIsProphylacticDose(e.target.checked)}
                    />
                    <span>Profilaktik düşük doz (2,5 mg q12sa) alıyor</span>
                  </label>
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
                  Son Alınan Apiksaban Dozu
                </span>
                <div className="mt-2 grid grid-cols-3 gap-1">
                  {[2.5, 5, 10].map((mg) => (
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
                      {mg.toString().replace('.', ',')} mg
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
                  Alternatif sabit doz: <strong>2.000 IU IV</strong> (Cofact® / Octaplex® / Beriplex®) + <strong>TXA 1 g IV</strong>.
                  Protamin ve K1 Vitamini <strong>%0 ETKİSİZDİR</strong> — vermeyin!
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
                    ? '✅ Son doz ≤4 saat önce: 50 g ORAL/NG AKTİF KÖMÜR verin (emilimi %50’ye kadar azaltır)!'
                    : 'Son doz >4 saat önce alındığı için Aktif Kömür genellikle rutin fayda sağlamaz.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: APİKSABAN vs VARFARİN vs ENOKSAPARİN */}
        {activeTab === 'compare' && (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                  <th className="p-3 font-bold">Özellik</th>
                  <th className="p-3 font-bold text-sky-600 dark:text-sky-300">Apiksaban (Eliquis®)</th>
                  <th className="p-3 font-bold">Varfarin (Coumadin®)</th>
                  <th className="p-3 font-bold">Enoksaparin (DMAH)</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                {[
                  ['Hedef & Yol', 'Oral Direkt FXa (AT-III bağımsız)', 'Oral VKORC1 (FII, VII, IX, X)', 'SC İndirekt Anti-Xa (4:1)'],
                  ['Yarı Ömür & Doz', '~12 saat · q12sa (aç/tok)', '~40 saat (etki 2–5 gün) · q24sa', '4,5–7 saat · q12sa / q24sa'],
                  ['Renal Atılım', '~%27 (DOAC’lar içinde en düşük!)', '<%1 değişmeden (Hepatik CYP2C9)', 'Ağırlıklı Renal (CrCl <30 azalt!)'],
                  ['Rutin Lab İzlemi', 'Gerekmez (gerekirse kalibreli Anti-Xa)', 'Zorunlu INR (2–3 / 2,5–3,5)', 'Gerekmez (özelde 4.sa Anti-Xa)'],
                  ['Mekanik Kapak / APS', 'MUTLAK KONTRENDİKE!', 'ALTIN STANDART (Tek Oral!)', 'Köprülemede kullanılır'],
                  ['Perioperatif Köprüleme', 'YAPILMAZ (1–2 gün kes · PAUSE)', 'Yalnızca yüksek riskte (BRIDGE)', 'Son doz 24 sa önce (yarı doz)'],
                  ['Nöraksiyel Bekleme', '72 saat (terapötik · ASRA/ESAIC)', '4–5 gün kes + INR ≤1,4', 'Prof 12 sa · Tedavi 24 sa'],
                  ['Acil Kanama Antidotu', 'Andeksanet Alfa veya 4F-PCC 50 IU/kg', '4F-PCC 25–50 IU/kg + IV K1 Vit', 'Protamin (~%60 kısmi reversal)'],
                ].map(([feat, apx, wrf, lmwh]) => (
                  <tr key={feat} className={isDark ? 'odd:bg-slate-950/40' : 'odd:bg-slate-50/50'}>
                    <td className={`p-3 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{feat}</td>
                    <td className={`p-3 font-semibold ${isDark ? 'text-sky-200' : 'text-sky-900'}`}>{apx}</td>
                    <td className="p-3">{wrf}</td>
                    <td className="p-3">{lmwh}</td>
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
        sectionId="apx-tr"
        preparations={[
          {
            name: 'Eliquis® 5 mg Film Kaplı Tablet',
            presentation: '56 tabletlik blister ambalaj · Pembe, oval, bir yüzünde "894" diğer yüzünde "5" baskılı',
            concentration: '5 mg / tablet',
            saltOrBaseNote: 'Standart NVAF (5 mg q12sa) ve Akut DVT/PE (ilk 7 gün 2 × 5 mg q12sa, sonra 5 mg q12sa) ana formudur.',
            alertLevel: 'standard',
          },
          {
            name: 'Eliquis® 2,5 mg Film Kaplı Tablet',
            presentation: '56 veya 60 tabletlik blister ambalaj · Sarı, yuvarlak, bir yüzünde "893" diğer yüzünde "2½" baskılı',
            concentration: '2,5 mg / tablet',
            saltOrBaseNote: 'NVAF ABC ≥2/3 indirgenmiş dozu, CrCl 15–29 mL/dk, AMPLIFY-EXT uzatılmış VTE profilaksisi ve ortopedik protez profilaksisi için kullanılır.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Günde 2 kez, 12 saat arayla, AÇ veya TOK olarak alınır (Rivaroksaban gibi yemekle alma zorunluluğu yoktur!).',
          'Yutma güçlüğü veya NG/PEG tüpü olan hastada tablet ezilip 60 mL su, %5 dekstroz veya elma püresine karıştırılarak 4 saat içinde uygulanabilir (NG tüpten 60 mL su ile yıkanarak verilir).',
          'Unutulan doz hatırlandığı anda alınır ve sonraki doz normal 12 saatlik saatinde devam eder (ASLA çift doz alınmaz!).',
        ]}
        concentrationTrapWarning="2,5 mg (sarı/yuvarlak) ve 5 mg (pembe/oval) tabletlerin karıştırılması çok sıktır! Özellikle Akut DVT/PE’de 7 günlük 10 mg q12sa yükleme süresinin sonunda 5 mg q12sa’ya düşmeyi unutmak ciddi kanamaya, NVAF’de ise tek ABC kriteriyle 2,5 mg’a inmek inmeye yol açar!"
      />

      {/* 10. UYGULAMA YOLU & UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="apx-line"
        accessRequirement="peripheral-ok"
        accessSummary="Yalnızca ORAL (PO veya ezilerek NG/PEG tüpten) uygulanır — IV/SC formu yoktur! Enteral tüp uygulamasında ezilmiş tablet 60 mL su veya D5W içinde süspanse edilir ve tüp yıkaması yapılır; distal mide/ince bağırsak emilimi korunduğu için NG tüpten biyoyararlanımı yüksektir."
        phRange="Oral film kaplı tablet"
        osmolalityNote="Acil kanama tedavisinde verilen 4F-PCC ve Andeksanet Alfa ayrı IV hattan uygulanır."
        compatibleDiluents={['Su (60 mL — ezilmiş tablet için)', '%5 Dekstroz (D5W)', 'Elma suyu / elma püresi (yutma güçlüğü)']}
        ySiteCompatible={['Oral ajan (IV Y-site geçerli değildir)']}
        ySiteIncompatible={['Aktif Kömür ile eşzamanlı ağızdan alınırsa emilimi %50’ye kadar düşer (doz aşımında terapötik avantaj!).']}
        stabilityNote="Ezilmiş tablet su/D5W/elma püresinde oda sıcaklığında 4 saat stabildir."
      />

      {/* 11. BÖBREK & KARACİĞER YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="apx-organ"
        renalSummary="DOAC’lar içinde EN DÜŞÜK renal atılım (~%27) · CrCl 15–29’da 2,5 mg q12sa (EMA) · HD’de FDA vs EMA farkı!"
        renalDetails={[
          'CrCl ≥30 mL/dk: NVAF’de yalnızca ≥2/3 ABC kriteri (Yaş ≥80, Kilo ≤60, Cr ≥1,5) varsa 2,5 mg q12sa; aksi halde 5 mg q12sa!',
          'CrCl 15–29 mL/dk: EMA/ESC NVAF’de 2,5 mg q12sa önerir; akut DVT/PE’de dikkatli kullanım!',
          'ESRD / IHD: Hemodiyaliz yalnızca ~%14 temizler. EMA/TİTCK önermez; FDA stabil HD + NVAF için 5 mg q12sa (Yaş ≥80 veya Kilo ≤60 kg ise 2,5 mg q12sa) tanır.',
        ]}
        hepaticSummary="Child-Pugh A: %100 Standart · Child-Pugh B: Dikkat (sınırlı veri) · Child-Pugh C: KONTRENDİKE!"
        hepaticDetails={[
          '~%73 non-renal (hepatik CYP3A4 + biliyer/fekal) yolla elimine edildiğinden ağır karaciğer yetmezliğinde (Child-Pugh C) birikim ve ağır kanama nedeniyle kontrendikedir.',
        ]}
        renalMatrix={STANDALONE_ORGAN_PART2.apixaban.renalMatrix}
        hepaticMatrix={STANDALONE_ORGAN_PART2.apixaban.hepaticMatrix}
        dualOrganNote={STANDALONE_ORGAN_PART2.apixaban.dualOrganNote}
      />

      {/* 12. GERİATRİ & OBEZİTE */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="apx-geriatrics"
        geriatricReductionBadge="Yaş ≥80 Tek Başına YETMEZ (≥2/3 ABC!)"
        geriatricPoints={[
          'ARISTOTLE alt grup analizlerinde ≥75 ve ≥80 yaş hastalarda Apiksaban, Varfarine göre majör kanama ve intrakraniyal kanamayı anlamlı ölçüde daha fazla azaltmıştır!',
          'EN KRİTİK GERİATRİ KURALI: Yaş ≥80 olması tek başına 2,5 mg q12sa’ya düşmek için YETERLİ DEĞİLDİR — mutlaka Kilo ≤60 kg VEYA Cr ≥1,5 mg/dL (veya CrCl 15–29) eşlik etmelidir!',
          'Düşme riski yüksek yaşlılarda dahi Apiksaban’ın intrakraniyal kanama riski Varfarinin yarısından düşüktür.',
        ]}
        obesityWeightScalarBadge="ISTH 2021: BMI >40 / >120 kg’da UYGUN!"
        obesityPoints={[
          'ISTH 2021 Obezite DOAC Kılavuzu: BMI >40 kg/m² veya >120 kg morbid obez hastalarda Apiksaban ve Rivaroksaban standart dozlarda (5 mg q12sa / 10 mg → 5 mg) GÜVENLE KULLANILABİLİR (Dabigatran ve Edoksaban önerilmez)!',
          'Bariatrik cerrahi (özellikle Roux-en-Y gastrik bypass) sonrası erken dönemde (<4 hafta) emilim bozulabileceğinden parenteral DMAH tercih edilir; uzun dönemde Apiksaban kullanılacaksa pik Anti-Xa kontrolü önerilir.',
        ]}
      />

      {/* 13. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="apx-preg"
        pregnancySummary="GEBELİKTE KONTRENDİKE / ÖNERİLMEZ — Plasentayı geçer! (Gebelikte DMAH / Enoksaparin 1. Tercih)."
        pregnancyDetails={[
          'Küçük moleküler yapısı nedeniyle plasentayı geçer ve fetal kanama / teratojenite güvenliği insan çalışmalarında kanıtlanmamıştır.',
          'Apiksaban alırken gebelik saptanırsa derhal kesilip DMAH (Enoksaparin) rejimine geçilmelidir.',
        ]}
        lactationSummary="EMZİRMEDE ÖNERİLMEZ — Anne sütüne geçer (LactMed: DMAH veya Varfarin tercih edin!)."
        lactationDetails={[
          'Apiksaban anne sütüne anlamlı oranlarda (süt/plazma oranı yüksek) geçmektedir; emziren annelerde güvenli alternatif olan Enoksaparin veya Varfarin seçilmelidir.',
        ]}
      />

      {/* 14. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="apx-adverse"
        items={[
          {
            title: 'Majör & Minör Kanama (Varfarinden %31 Daha Az!)',
            incidenceOrSeverity: 'ARISTOTLE: %2,13/yıl vs %3,09/yıl',
            detail:
              'GİS kanaması, epistaksis, hematüri, ekimoz. Rivaroksaban ve Dabigatrana göre belirgin daha düşük majör GİS kanaması oranına sahiptir.',
            tone: 'rose',
          },
          {
            title: 'İntrakraniyal Kanama (İKK — %58 Azalma!)',
            incidenceOrSeverity: 'ARISTOTLE: %0,33/yıl vs %0,80/yıl',
            detail:
              'Varfarine kıyasla intrakraniyal hemorajiyi yarıdan fazla azaltması Apiksaban’ın en güçlü klinik avantajıdır; ancak gelişirse 4F-PCC / Andeksanet ile acil reversal gerekir.',
            tone: 'rose',
          },
          {
            title: 'Ani Kesmeye Bağlı Rebound Tromboz / İnme',
            incidenceOrSeverity: 'FDA Kara Kutu Uyarısı',
            detail:
              'Alternatif antikoagülan başlamadan Apiksaban’ın erken/gereksiz kesilmesi 12–48 saat içinde yüksek inme ve tromboemboli riski yaratır!',
            tone: 'amber',
          },
          {
            title: 'Spinal / Epidural Hematom',
            incidenceOrSeverity: 'FDA Kara Kutu Uyarısı',
            detail:
              'Yetersiz bekleme süresi (<72 sa terapötik) veya kalıcı epidural kateter varlığında kalıcı paralizi riski taşır.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 15. ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="apx-cautions"
        items={[
          {
            title: 'Akut İskemik İnmede IV Tromboliz (tPA / Tenekteplaz)',
            detail:
              'Son 48 saat içinde Apiksaban almış akut iskemik inme hastasında rutin IV tromboliz (Alteplaz/Tenekteplaz) genellikle KONTRENDİKEDİR — yalnızca hızlı Apiksaban-kalibreli Anti-Xa düzeyi <30 ng/mL (<0,5 IU/mL) doğrulanabilirse nöroloji konseyiyle değerlendirilir; mekanik trombektomi güvenle yapılabilir!',
          },
          {
            title: 'Laboratuvar İzlemi (PT/aPTT Yanıltıcıdır!)',
            detail:
              'Apiksaban PT/INR ve aPTT’yi zayıf ve değişken uzatır — normal PT/aPTT terapötik ilaç düzeyini KESİNLİKLE dışlamaz! Acil cerrahi/kanama/inmede gerçek ölçüm yalnızca Apiksaban-kalibreli kromojenik Anti-Xa testidir.',
          },
          {
            title: 'AKS / PKG Sonrası "Dual Antitrombotik" (AUGUSTUS, NEJM 2019)',
            detail:
              'AF + yeni AKS/PKG hastalarında Apiksaban + Klopidogrel (Aspirin erken kesilerek!) ikili rejimi, Varfarin veya üçlü tedaviye (DAPT + OAC) kıyasla majör kanamayı dramatik azalttı ve iskemik olayları artırmadı!',
          },
          {
            title: 'Kardiyoversiyon Öncesi Güvenlik (EMANATE)',
            detail:
              'AF kardiyoversiyonu öncesinde ≥3 hafta düzenli Apiksaban kullanımı (veya TEE rehberliğinde 10 mg yükleme sonrası) güvenli ve etkilidir; uyum şüphesi varsa mutlaka TEE yapılmalıdır.',
          },
          {
            title: 'HIT (Heparinle İndüklenen Trombositopeni — ASH 2018)',
            detail:
              'Sentetik FXa inhibitörü anti-PF4 antikorlarıyla çapraz reaksiyon VERMEZ — ASH 2018’e göre klinik olarak stabil, kanamasız HIT hastalarında (veya trombosit toparlandıktan sonra oral geçişte) etkili bir non-heparin alternatifidir!',
          },
          {
            title: 'Varfarin ↔ Apiksaban Geçişi',
            detail:
              'Varfarin → Apiksaban: Varfarini kes, INR <2,0 olunca Apiksaban başla! Apiksaban → Varfarin: En az 2 gün birlikte devam et (veya DMAH köprüsü), bir sonraki Apiksaban dozundan hemen önce (trough!) bakılan INR ≥2,0 olunca Apiksabanı kes.',
          },
        ]}
      />

      {/* 16. 4 KADEMELİ DERİN FARMAKODİNAMİK ANALİZ (AKORDİYON) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="apx-deep-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef: FXa Serin Proteaz Aktif Cebine Direkt Tersinir Kenetlenme',
          summary:
            'Apiksaban (MW 459 Da), koagülasyon Faktör Xa’nın S1 ve S4 katalitik ceplerine non-kovalent, yarışmalı ve son derece yüksek afiniteyle (Ki ≈ 0,08 nM; trombine göre >30.000 kat selektif!) doğrudan bağlanır.',
          points: [
            'Heparin, DMAH ve Fondaparinuksun aksine Antitrombin-III (AT-III) kofaktörüne hiç ihtiyaç duymaz — siroz, nefrotik sendrom veya sepsis kaynaklı AT-III eksikliğinde etkinliğini kaybetmez.',
            'Hem dolaşımdaki serbest FXa’yı hem de aktive trombosit membranındaki Protrombinaz Kompleksine (FXa + FVa + Ca²⁺) ve fibrin pıhtısına bağlı FXa’yı doğrudan susturur.',
            'Tersinir bağlanma kinetiği sayesinde plazma konsantrasyonu düştükçe (t½ ~12 sa) FXa aktivitesi paralel olarak hızla geri döner.',
          ],
        }}
        intracellularSignaling={{
          title: 'Trombin Üretim (Thrombin Burst) Kinetiği & Hemostatik Denge',
          summary:
            'Protrombinaz kompleksinde 1 molekül FXa’nın >1.000 molekül trombin (FIIa) üretme amplifikasyonunu keserken, doku faktörü–FVIIa başlangıç yolunu (initiation phase) açık bıraktığı için fizyolojik mikrovasküler hemostazı Varfarine göre çok daha iyi korur.',
          points: [
            'Serebral vasküler yatakta yüksek doku faktörü (TF) ekspresyonu bulunur; Varfarin FVII’yi de baskılayarak TF–FVIIa savunmasını çökerterek intrakraniyal kanama yaparken, Apiksaban FVII’ye dokunmadığı için İKK riskini %58 azaltır!',
            'Trombosit üzerindeki PAR-1/PAR-4 reseptörlerinin trombin-aracılı aktivasyonunu dolaylı olarak azaltır, ancak ADP/TXA₂ primer agregasyonunu korur.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Serebral Mikrovaskülatür (İKK Koruması)',
            tissueTarget: 'Korunmuş TF–FVIIa Ekseni',
            accent: 'sky',
            points: [
              'Beyin parankimindeki yüksek Doku Faktörü (TF) + korunmuş Faktör VII düzeyi sayesinde ARISTOTLE’da intrakraniyal kanama Varfarine kıyasla %58 daha düşüktür.',
              'Sol atriyal apendiks (NVAF) staz trombüsünü önlemede Varfarinden %21 daha etkilidir.',
            ],
          },
          {
            systemTitle: 'Gastrointestinal Mukoza & Kanser Yatağı',
            tissueTarget: 'Düşük Pik/Vadi Dalgalanması (q12sa)',
            accent: 'teal',
            points: [
              'Günde 2 kez (q12sa) uygulanması, günde tek doz Rivaroksaban’a kıyasla daha düşük pik konsantrasyon (Cmax) ve daha düşük lüminal lokal antikoagülan yük sağlar → en düşük GİS kanama profili!',
              'CARAVAGGIO’da kanser ilişkili VTE’de DMAH ile eşit majör GİS kanaması oranına ulaştı.',
            ],
          },
          {
            systemTitle: 'Hepatobiliyer & Renal Eliminasyon Ekseni',
            tissueTarget: 'CYP3A4 · P-gp/BCRP · %27 GFR',
            accent: 'amber',
            points: [
              'Çift eliminasyon yolu (%73 hepatik/fekal + %27 renal) sayesinde tek başına orta-ileri KBY’de (CrCl 15–50) diğer DOAC’lara göre çok daha az birikim yapar.',
              'Ancak hem CYP3A4 hem P-gp’yi aynı anda bloke eden güçlü inhibitörlerle (Ritonavir, Ketokonazol) hepatobiliyer çıkış kapanır ve plazma AUC’si ~2 kat fırlar!',
            ],
          },
          {
            systemTitle: 'Acil Hemostaz & Antidot Biyofiziği',
            tissueTarget: 'Andeksanet Tuzak vs 4F-PCC',
            accent: 'rose',
            points: [
              'Andeksanet Alfa, katalitik olarak inaktif rekombinant modifiye insan FXa “yem (decoy)” molekülüdür; dolaşımdaki Apiksabanı sünger gibi bağlayarak endojen FXa’yı serbest bırakır.',
              '4-Faktör PCC ise bol miktarda ekzojen FX ve protrombin (FII) sunarak Apiksaban blokajını substrat fazlasıyla bypass edip trombin üretimini hızla restore eder.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Doza Bağımlı Pik-Vadi Kinetiği & İlaç Sinerjisi',
          summary:
            'Apiksaban’ın antikoagülan etkisi plazma konsantrasyonuyla doğrusal (lineer) ilişkilidir; günde iki kez (q12sa) dozlam dar bir pik/vadi oranı sağlayarak etkinlik-güvenlik penceresini optimize eder.',
          points: [
            'AUGUSTUS Sinerjisi: AF + PKG hastasında Apiksaban + Klopidogrel ikilisi güvenlidir; Aspirin eklenmesi (üçlü tedavi) iskemik fayda eklemeden majör kanamayı neredeyse 2 katına çıkarır!',
            'Aktif Kömür Penceresi: Oral alımdan 2 saat sonra verilen 50 g aktif kömür Apiksaban AUC’sini ~%50, 6 saat sonra verildiğinde ~%27 azaltır (enterohepatik/enterik sekresyonu da bağlar).',
          ],
        }}
        clinicalPearls={[
          'NVAF hastasında ABC kriterlerinden (Yaş ≥80 · Kilo ≤60 kg · Cr ≥1,5) YALNIZCA BİRİ varken 2,5 mg q12sa yazmayın — en sık görülen ve önlenebilir inme nedenidir!',
          'PAUSE Protokolü: Düşük riskli cerrahide 1 tam gün, yüksek riskli cerrahide 2 tam gün kesin ve ASLA DMAH ile köprüleme yapmayın!',
          'Normal PT/INR veya aPTT sonucuna güvenerek spinal/epidural blok YAPMAYIN — terapötik Apiksaban bloktan en az 72 saat önce kesilmiş olmalıdır!',
          'Acil majör kanamada Andeksanet yoksa saniye kaybetmeden 4-Faktör PCC (50 IU/kg, maks 5.000 IU veya sabit 2.000 IU) + TXA 1 g IV uygulayın; Protamin ve K1 vitamini vermeyin!',
        ]}
      />

      {/* 17. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="apx-refs"
        drugName="Apiksaban (Eliquis®)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Güçlü Çift CYP3A4 + P-gp İnhibitörleri (Ketokonazol, İtrakonazol, Ritonavir / Paxlovid®)',
            mechanism: 'Hepatik CYP3A4 metabolizması + P-gp bağırsak/biliyer efluks eşzamanlı blokajı (AUC ~2 kat artar!)',
            clinicalEffect: 'Ağır plazma birikimi ve majör/intrakraniyal kanama riski.',
            management:
              '2,5 mg q12sa alıyorsa KESİNLİKLE KULLANMAYIN! 5/10 mg alıyorsa EMA kaçınmayı, FDA ise zorunluysa dozu %50 azaltmayı önerir (Paxlovid® kürü boyunca alternatif/ara değerlendirin).',
          },
          {
            severity: 'X',
            agent: 'Güçlü Çift CYP3A4 + P-gp İndükleyicileri (Rifampisin, Karbamazepin, Fenitoin, Sarı Kantaron)',
            mechanism: 'CYP3A4 ve P-gp güçlü indüksiyonu (Apiksaban AUC’si ~%54 çöker!)',
            clinicalEffect: 'Antikoagülan etki kaybı → akut inme, sistemik emboli veya DVT/PE nüksü!',
            management: 'Eşzamanlı kullanmayın (DVT/PE’de kontrendike; alternatif antiepileptik [Levetirasetam] veya Varfarin/DMAH seçin).',
          },
          {
            severity: 'X',
            agent: 'Diğer Sistemik Antikoagülanlar (UFH, DMAH, Fondaparinuks, Varfarin, Trombolitikler)',
            mechanism: 'Çift koagülasyon kaskadı blokajı',
            clinicalEffect: 'Katlanarak artan majör kanama riski.',
            management: 'İlaç geçiş dönemleri dışında kesinlikle kombine etmeyin.',
          },
          {
            severity: 'D',
            agent: 'Antiplatelet Ajanlar (Aspirin, Klopidogrel, Prasugrel, Tikagrelor) & Sistemik NSAİİ’ler',
            mechanism: 'Primer trombosit hemostazı + sekonder FXa blokajı + NSAİİ gastrik mukozal hasar',
            clinicalEffect: 'GİS ve majör kanama riskinde 2–3 kat artış.',
            management:
              'NSAİİ yerine Parasetamol seçin; AF + PKG’de AUGUSTUS protokolüne göre Aspirini erken kesip Apiksaban + Klopidogrel + PPI (Pantoprazol) kullanın.',
          },
          {
            severity: 'C',
            agent: 'Orta CYP3A4/P-gp İnhibitörleri (Diltiazem, Verapamil, Amiodaron, Klaritromisin, Flukonazol) & SSRI',
            mechanism: 'Hafif-orta AUC artışı (%20–40) veya trombosit serotonin azalması',
            clinicalEffect: 'Tek başına resmi doz azaltımı gerekmez; ancak ek kanama riski (KBY/ileri yaş) varsa kanama artabilir.',
            management: 'Yakın klinik kanama izlemi ve gerekirse PPI koruması önerilir.',
          },
        ]}
        references={[
          {
            authors: 'Granger CB, Alexander JH, McMurray JJV, et al. (ARISTOTLE Committees and Investigators)',
            title: 'Apixaban versus Warfarin in Patients with Atrial Fibrillation',
            journal: 'N Engl J Med',
            year: 2011,
            doi: '10.1056/NEJMoa1107039',
            note: '18.201 NVAF hastasında Apiksaban, Varfarine göre inme/emboliyi %21, majör kanamayı %31, İKK’yi %58 ve tüm nedenli mortaliteyi %11 azalttı.',
          },
          {
            authors: 'Agnelli G, Buller HR, Cohen A, et al. (AMPLIFY Investigators)',
            title: 'Oral Apixaban for the Treatment of Acute Venous Thromboembolism',
            journal: 'N Engl J Med',
            year: 2013,
            doi: '10.1056/NEJMoa1302507',
            note: '5.395 akut DVT/PE hastasında tek ajan 10 mg q12sa × 7g → 5 mg q12sa ile Enoksaparin+Varfarine eşdeğer etkinlik ve %69 daha az majör kanama.',
          },
          {
            authors: 'Agnelli G, Buller HR, Cohen A, et al. (AMPLIFY-EXT Investigators)',
            title: 'Apixaban for Extended Treatment of Venous Thromboembolism',
            journal: 'N Engl J Med',
            year: 2013,
            doi: '10.1056/NEJMoa1207541',
            note: 'Uzatılmış VTE sekonder profilaksisinde 2,5 mg q12sa ile plaseboya eşit majör kanama oranında %80 nüks koruması.',
          },
          {
            authors: 'Agnelli G, Becattini C, Meyer G, et al. (CARAVAGGIO Investigators)',
            title: 'Apixaban for the Treatment of Venous Thromboembolism Associated with Cancer',
            journal: 'N Engl J Med',
            year: 2020,
            doi: '10.1056/NEJMoa1915103',
            note: 'Kanser ilişkili VTE’de Dalteparine eşdeğer etkinlik ve artmış majör GİS kanaması olmaması.',
          },
          {
            authors: 'Douketis JD, Spyropoulos AC, Duncan J, et al. (PAUSE Study)',
            title: 'Perioperative Management of Patients With Atrial Fibrillation Receiving a Direct Oral Anticoagulant',
            journal: 'JAMA Intern Med',
            year: 2019,
            doi: '10.1001/jamainternmed.2019.2431',
            note: 'Köprülemesiz ve koagülasyon testsiz 1 gün (düşük risk) / 2 gün (yüksek risk) standart perioperatif Apiksaban kesme protokolü.',
          },
          {
            authors: 'Tomaselli GF, Mahaffey KW, Cuker A, et al.',
            title: '2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants',
            journal: 'J Am Coll Cardiol',
            year: 2020,
            doi: '10.1016/j.jacc.2020.04.053',
            note: 'FXa inhibitörü majör kanamasında Andeksanet Alfa veya 4F-PCC (50 IU/kg / sabit 2.000 IU) + aktif kömür algoritması.',
          },
          {
            authors: 'Connolly SJ, Crowther M, Eikelboom JW, et al. (ANNEXA-4 Investigators)',
            title: 'Full Study Report of Andexanet Alfa for Bleeding Associated with Factor Xa Inhibitors',
            journal: 'N Engl J Med',
            year: 2019,
            doi: '10.1056/NEJMoa1814051',
            note: 'Andeksanet Alfa’nın Apiksaban anti-Xa aktivitesini %92 oranında hızla düşürdüğünü gösteren faz IIIb/IV çalışma.',
          },
          {
            authors: 'Kietaibl S, Ferrandis R, Godier A, et al.',
            title: 'Regional anaesthesia in patients on antithrombotic drugs: Joint ESAIC/ESRA guidelines',
            journal: 'Eur J Anaesthesiol',
            year: 2022,
            doi: '10.1097/EJA.0000000000001600',
            note: 'Terapötik Apiksaban için nöraksiyel blok öncesi 72 saat (profilaktikte 36 saat) bekleme ve kateter sonrası ≥6–8 saat kuralı.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/apixaban.html"
        medscapeUrl="https://reference.medscape.com/drug/eliquis-apixaban-999805"
      />
    </div>
  );
};
