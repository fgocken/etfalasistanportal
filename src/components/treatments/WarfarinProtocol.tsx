import React, { useMemo, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Scissors,
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

interface WarfarinProtocolProps {
  isDark: boolean;
}

type CalcTab = 'reversal' | 'bridging' | 'neuraxial' | 'interactions';
type ReversalScenario = 'no_bleed' | 'major_bleed' | 'urgent_surgery';
type BridgeProfile =
  | 'af_low_mod'
  | 'af_high_rheumatic'
  | 'mech_aortic_low'
  | 'mech_mitral_or_high_aortic'
  | 'recent_vte_3m'
  | 'remote_vte_gt12m'
  | 'aps_severe';
type SurgeryBleedRisk = 'minimal' | 'low_mod' | 'high';

export const WarfarinProtocol: React.FC<WarfarinProtocolProps> = ({ isDark }) => {
  const [admeOpen, setAdmeOpen] = useMonographAccordion('wrf-pk', false);
  const [activeTab, setActiveTab] = useState<CalcTab>('reversal');

  // Tab 1: 4F-PCC & K1 Vitamini Reversal Hesaplayıcı
  const [weightKg, setWeightKg] = useState<number>(75);
  const [currentInr, setCurrentInr] = useState<number>(5.2);
  const [reversalScenario, setReversalScenario] = useState<ReversalScenario>('major_bleed');

  // Tab 2: Perioperatif Kesme & Köprüleme (BRIDGE / CHEST 2022)
  const [bridgeProfile, setBridgeProfile] = useState<BridgeProfile>('af_low_mod');
  const [surgeryRisk, setSurgeryRisk] = useState<SurgeryBleedRisk>('high');

  // Tab 3: Nöraksiyel & Kateter Kontrolü
  const [neuraxialInr, setNeuraxialInr] = useState<number>(1.3);
  const [hasEpiduralCatheter, setHasEpiduralCatheter] = useState<boolean>(false);

  const quickNavItems = [
    { id: 'wrf-high-alert', label: 'High-Alert' },
    { id: 'wrf-summary', label: 'Özet' },
    { id: 'wrf-moa', label: 'Etki Mekanizması' },
    { id: 'wrf-pk', label: 'ADME' },
    { id: 'wrf-contra', label: 'Kontrendikasyon' },
    { id: 'wrf-indications', label: 'Hedef INR & Doz' },
    { id: 'wrf-calc', label: 'Hesaplayıcı · PCC' },
    { id: 'wrf-tr', label: 'TR Preparat' },
    { id: 'wrf-line', label: 'Uygulama' },
    { id: 'wrf-organ', label: 'Böbrek / KC' },
    { id: 'wrf-geriatrics', label: 'Geriatri / Obezite' },
    { id: 'wrf-preg', label: 'Gebelik' },
    { id: 'wrf-adverse', label: 'Yan Etkiler' },
    { id: 'wrf-cautions', label: 'Özel Durumlar' },
    { id: 'wrf-deep-pd', label: 'Derin PD' },
    { id: 'wrf-refs', label: 'Etkileşim & Kaynak' },
  ];

  // Tab 1: 4F-PCC & K1 Vitamini Reversal Hesaplaması (ACC 2020 / CHEST)
  const reversalCalc = useMemo(() => {
    const w = Math.max(35, Math.min(180, weightKg || 75));
    const cappedWeight = Math.min(w, 100); // FDA / 4F-PCC üretici üst kilo sınırı 100 kg
    const inr = Math.max(1.0, Math.min(20.0, currentInr || 1.0));

    if (reversalScenario === 'no_bleed') {
      if (inr < 3.0) {
        return {
          urgency: 'normal' as const,
          headline: 'Terapötik / Normal INR — Reversal Gerekmez',
          pccText: '4F-PCC GEREKMEZ',
          vitKText: 'K1 Vitamini GEREKMEZ',
          actionText: 'Mevcut endikasyonun hedef INR aralığına (2,0–3,0 veya 2,5–3,5) göre idame dozuna devam edin.',
          reboundNote: 'Rutin INR izlemi yeterlidir.',
        };
      }
      if (inr < 4.5) {
        return {
          urgency: 'caution' as const,
          headline: 'Hafif Supraterapötik INR (3,0–4,4 · Kanama Yok)',
          pccText: '4F-PCC GEREKMEZ',
          vitKText: 'K1 Vitamini RUTİN VERİLMEZ (ACCP)',
          actionText: '1 doz Varfarin atlayın veya haftalık toplam dozu %10–15 azaltın; 2–4 gün içinde INR kontrol edin.',
          reboundNote: 'Gereksiz K1 vitamini vermek 1–2 hafta süren Varfarin direnci ve mekanik kapakta tromboz riski yaratır!',
        };
      }
      if (inr <= 10.0) {
        return {
          urgency: 'warning' as const,
          headline: 'Orta-Yüksek Supraterapötik INR (4,5–10,0 · Kanama Yok)',
          pccText: '4F-PCC GEREKMEZ',
          vitKText: 'Rutin K1 Vitamini Önerilmez · Yüksek kanama riskinde opsiyonel 1–2,5 mg PO K1 Vitamini',
          actionText: 'Varfarini 1–2 doz kesin, 24–48 saat içinde INR tekrarlayın; INR terapötik aralığa inince %15–20 düşük idameyle yeniden başlayın.',
          reboundNote: 'SC/IM K1 vitamini ASLA vermeyin (düzensiz emilim + IM hematom). Konakion® MM ampul oral olarak meyve suyu/su ile içirilebilir.',
        };
      }
      return {
        urgency: 'danger' as const,
        headline: 'Ağır Supraterapötik INR (>10,0 · Aktif Kanama Yok)',
        pccText: '4F-PCC RUTİN GEREKMEZ (Aktif kanama yoksa)',
        vitKText: '2,5 – 5 mg ORAL (PO) K1 Vitamini (Fitomenadion · Konakion® MM)',
        actionText: 'Varfarini kesin, 2,5–5 mg PO K1 vitamini verin (24 saatte INR’yi hızla düşürür) ve 12–24 saatte INR kontrolü yapın.',
        reboundNote: 'Yüksek kanama riski veya yeni başlayan mukozal kanama varsa hastayı yatırarak izleyin.',
      };
    }

    // Majör Kanama veya Acil Cerrahi
    if (inr < 1.5) {
      return {
        urgency: 'normal' as const,
        headline: 'INR <1,5 — Koagülopati Minimal',
        pccText: '4F-PCC GEREKMEZ',
        vitKText: 'K1 Vitamini GEREKMEZ (diğer kanama nedenlerini araştırın)',
        actionText: 'INR cerrahi/hemostatik güvenli sınırdadır; trombosit, fibrinojen, antiplatelet veya cerrahi kaynak araştırın.',
        reboundNote: 'Gereksiz PCC tromboembolik risk (DVT, PE, inme, kapak trombozu) taşır.',
      };
    }

    let iuPerKg = 25;
    let maxIu = 2500;
    if (inr >= 6.0) {
      iuPerKg = 50;
      maxIu = 5000;
    } else if (inr >= 4.0) {
      iuPerKg = 35;
      maxIu = 3500;
    } else {
      iuPerKg = 25;
      maxIu = 2500;
    }

    const totalIu = Math.min(maxIu, Math.round((cappedWeight * iuPerKg) / 50) * 50);
    const vials500 = Math.ceil(totalIu / 500);
    const ffpMl = Math.round(w * 15);
    const ffpUnits = Math.max(2, Math.round(ffpMl / 250));

    return {
      urgency: 'danger' as const,
      headline:
        reversalScenario === 'major_bleed'
          ? 'YAŞAMI TEHDİT EDEN / MAJÖR KANAMA — ACİL 4F-PCC + IV K1 VİTAMİNİ!'
          : 'ACİL CERRAHİ (<6 SAAT) — HIZLI 4F-PCC + IV K1 VİTAMİNİ REVERSAL!',
      pccText: `4-Faktör PCC (Cofact® / Octaplex® / Beriplex®): ${totalIu.toLocaleString('tr-TR')} IU IV (${iuPerKg} IU/kg · maks ${maxIu.toLocaleString('tr-TR')} IU · ~${vials500} × 500 IU flakon)`,
      vitKText: '5 – 10 mg IV K1 Vitamini (Konakion® MM) — 50 mL %0,9 NaCl/D5W içinde EN AZ 30 dk yavaş infüzyon!',
      actionText: `4F-PCC 10–15 dk içinde INR’yi <1,5’e indirir (30 dk sonra kontrol INR bak!). 4F-PCC yoksa 2. seçenek TDP: ~${ffpMl} mL (~${ffpUnits} ünite, 15 mL/kg) — TACO/sıvı yüküne dikkat!`,
      reboundNote:
        'KRİTİK: 4F-PCC içindeki Faktör VII’nin yarı ömrü yalnızca 6 saattir! Eşzamanlı 5–10 mg IV K1 Vitamini verilmezse 6–12 saat sonra INR yeniden yükselir (REBOUND)! IV K1 hızlı puşe YAPILMAZ (anaflaktoid şok riski).',
    };
  }, [weightKg, currentInr, reversalScenario]);

  // Tab 2: BRIDGE / CHEST 2022 Perioperatif Köprüleme Kararı
  const bridgeCalc = useMemo(() => {
    if (surgeryRisk === 'minimal') {
      return {
        tone: 'emerald' as const,
        title: 'VARFARİNİ KESMEYİN! (Minimal Kanama Riskli İşlem)',
        holdDays: '0 gün (Kesilmez · İşlem öncesi INR terapötik aralıkta doğrulanır)',
        bridging: 'Köprüleme GEREKMEZ',
        detail:
          'CHEST 2022: Diş çekimi (1–2 diş), katarakt cerrahisi, yüzeyel dermatolojik eksizyon ve tanısal endoskopide Varfarin kesilmeden (INR ≤3,0–3,5) devam edilir; lokal hemostaz (traneksamik asit gargara vb.) uygulanır.',
      };
    }

    const highTeProfiles: BridgeProfile[] = ['mech_mitral_or_high_aortic', 'recent_vte_3m', 'af_high_rheumatic', 'aps_severe'];
    const needsBridge = highTeProfiles.includes(bridgeProfile);

    if (needsBridge) {
      return {
        tone: 'amber' as const,
        title: 'VARFARİNİ 5 GÜN ÖNCE KES + PERİOPERATİF KÖPRÜLEME (BRIDGING) ÖNERİLİR!',
        holdDays: 'Cerrahi −5. gün Varfarin kes · Cerrahi sabahı INR <1,5 (nöro/nöraksiyel ≤1,4) doğrula',
        bridging:
          'INR <2,0’a indiğinde (genellikle −3. gün) terapötik DMAH (Enoksaparin 1 mg/kg q12sa — son doz cerrahiden 24 saat önce, yarı doz!) veya CrCl <30’da IV UFH (cerrahiden 4–6 sa önce kes) ile köprüle!',
        detail:
          surgeryRisk === 'high'
            ? 'Yüksek kanama riskli cerrahide postop Varfarin hemostaz sağlanınca 12–24. saatte başlanır; ancak terapötik DMAH köprülemesine en erken 48–72. saatte (tam cerrahi hemostaz sonrası!) dönülür.'
            : 'Düşük-orta kanama riskli cerrahide postop 24. saatte hem Varfarin hem de terapötik DMAH köprülemesi yeniden başlanır; INR ≥2,0 olunca DMAH kesilir.',
      };
    }

    return {
      tone: 'teal' as const,
      title: 'VARFARİNİ 5 GÜN ÖNCE KES — KÖPRÜLEME YAPMA! (BRIDGE Trial / CHEST 2022)',
      holdDays: 'Cerrahi −5. gün Varfarin kes · Cerrahi sabahı INR <1,5 (nöro/nöraksiyel ≤1,4) doğrula',
      bridging: 'KÖPRÜLEME ÖNERİLMEZ (Majör kanamayı ~3 kat artırır, trombozu azaltmaz!)',
      detail:
        'BRIDGE (NEJM 2015) & CHEST 2022: Düşük-orta riskli AF (CHA₂DS₂-VASc ≤4–5, son 3 ayda inme yok), düşük riskli bileaflet mekanik aort kapağı veya >3–12 ay eski VTE’de perioperatif DMAH köprülemesi tromboemboliyi azaltmazken majör kanamayı 2,5–3 kat artırır! Cerrahi sonrası 12–24. saatte alışılmış idame Varfarin dozuna dönün (VTE profilaksisi endikeyse standart düşük doz DMAH verilebilir).',
    };
  }, [bridgeProfile, surgeryRisk]);

  // Tab 3: ASRA 2018 / ESAIC 2022 Nöraksiyel Kontrolü
  const neuraxialCalc = useMemo(() => {
    const inr = neuraxialInr;
    if (hasEpiduralCatheter) {
      if (inr < 1.5) {
        return {
          tone: 'emerald' as const,
          status: 'EPİDURAL KATETER ÇEKİMİ GÜVENLİ (INR <1,5 · ASRA 2018)',
          detail:
            'ASRA 2018 / ESAIC 2022: Kalıcı nöroaksiyel kateter INR <1,5 iken güvenle çekilebilir. Çekim sonrası 24 saat motor/duyu nörolojik izlem yapılmalıdır.',
        };
      }
      if (inr <= 3.0) {
        return {
          tone: 'amber' as const,
          status: 'KATETER ÇEKMEYİN! (INR 1,5–3,0 · Yüksek Hematom Riski)',
          detail:
            'INR 1,5–3,0 arasındayken epidural kateter rutin olarak ÇEKİLMEZ! Varfarin dozunu durdurun, INR <1,5’e düşene kadar sık nörolojik (motor/duyu) değerlendirme yapın; acil çekim şartsa düşük doz K1 vitamini/4F-PCC ile INR <1,5 sağlayın.',
        };
      }
      return {
        tone: 'rose' as const,
        status: 'ACİL UYARI: KATETER YERİNDE & INR >3,0 — DERHAL VARFARİN KES!',
        detail:
          'Spinal/epidural hematom riski kritik düzeydedir! Varfarini derhal kesin, saatlik motor/duyu nörolojik muayene yapın, INR <1,5 olana kadar kateteri çekmeyin (gerekirse K1 vitamini / 4F-PCC danışın).',
      };
    }

    if (inr <= 1.4) {
      return {
        tone: 'emerald' as const,
        status: 'NÖRAKSİYEL BLOK UYGUN (INR ≤1,4 · Varfarin ≥4–5 Gün Kesilmiş)',
        detail:
          'ASRA 2018 / ESAIC 2022: Varfarin 4–5 gün önce kesilmiş ve güncel INR normal (≤1,4) doğrulanmışsa spinal/epidural girişim güvenle yapılabilir.',
      };
    }
    return {
      tone: 'rose' as const,
      status: 'NÖRAKSİYEL BLOK KONTRENDİKE! (INR >1,4)',
      detail:
        'INR >1,4 iken spinal/epidural ponksiyon YAPILMAMALIDIR! Elektif olguda INR ≤1,4 olana kadar bekleyin (veya oral 1–2,5 mg K1 vitamini ile ertesi gün INR kontrolü); acil cerrahide genel anestezi tercih edin.',
    };
  }, [neuraxialInr, hasEpiduralCatheter]);

  const buildOrderText = () => {
    return [
      `VARFARİN SODYUM (Coumadin® / Orfarin®) KLİNİK ÖZET`,
      `Hasta: ${weightKg} kg | Güncel INR: ${currentInr.toFixed(1).replace('.', ',')}`,
      `Reversal Kararı (${reversalScenario}): ${reversalCalc.headline}`,
      `4F-PCC: ${reversalCalc.pccText}`,
      `K1 Vitamini: ${reversalCalc.vitKText}`,
      `Köprüleme (${bridgeProfile} / ${surgeryRisk}): ${bridgeCalc.title}`,
      `ASRA 2018 Nöraksiyel: Blok için INR ≤1,4 (4–5 gün kes) · Kateter çekimi için INR <1,5.`,
    ].join('\n');
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. HIZLI NAVİGASYON + TÜMÜNÜ AÇ / KAPAT */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. ISMP HIGH-ALERT GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="wrf-high-alert"
        tallManName="WARFARIN (Coumadin® / Orfarin®)"
        confusionRiskWith="DOAC’lar (Apiksaban/Rivaroksaban) · 5 mg vs 10 mg Tablet!"
        criticalAlerts={[
          'DAR TERAPÖTİK ARALIK & GECİKMİŞ ETKİ (4–5 GÜN): İlk 24–48 saatte kısa ömürlü FVII ve antikoagülan Protein C hızla düşerken FII (protrombin, t½ 60–72 sa) aktif kalır → Akut VTE’de ASLA tek başına başlanmaz (≥5 gün parenteral köprü + ardışık 2 gün INR ≥2,0 şart!).',
          '5 mg vs 10 mg TABLET KARIŞMA TUZAĞI: Türkiye’de Coumadin® 5 mg (pembe/şeftali) ve 10 mg (beyaz) formları bulunur — 2 kat doz hatası ölümcül intrakraniyal kanamaya yol açar; tablet gücünü ve haftalık şemayı çift kontrol edin!',
          'ACİL KANAMADA 4F-PCC + IV K1 VİTAMİNİ BİRLİKTELİĞİ: Yaşamı tehdit eden kanamada 4F-PCC (25–50 IU/kg) 15 dk’da INR’yi düzeltir ANCAK FVII ömrü 6 saat olduğundan eşzamanlı 5–10 mg IV K1 Vitamini (30 dk yavaş infüzyon!) verilmezse 6–12 saat sonra INR REBOUND yapar!',
          'ANTİBİYOTİK & AMİODARON INR PATLAMASI: TMP-SMX (Bactrim®), Metronidazol, Flukonazol, Amiodaron ve ardışık >2 g/gün Parasetamol INR’yi dramatik yükseltir → yeni ilaç başlanınca 3–5 gün içinde mutlaka INR bakın!',
          'GEBELİKTE TERATOJEN (6–12. HAFTA): Plasentadan geçerek Fetal Varfarin Sendromu ve fetal intrakraniyal kanama yapar — gebelikte (mekanik kapak özel istisnaları dışında) KONTRENDİKE; ancak LAKTASYONDA TAMAMEN GÜVENLİDİR!',
        ]}
        antidoteOrRescue="MAJÖR / İKK KANAMA (ACC 2020): (1) 4-Faktör PCC (Cofact® / Octaplex® / Beriplex®): INR 2–<4 → 25 IU/kg (maks 2.500 IU) · INR 4–6 → 35 IU/kg (maks 3.500 IU) · INR >6 → 50 IU/kg (maks 5.000 IU) IV; (2) + ZORUNLU 5–10 mg IV K1 Vitamini (Konakion® MM) 50 mL %0,9 NaCl/D5W içinde ≥30 dk yavaş infüzyon (hızlı IV puşe anaflaktoid şok yapar!); (3) 4F-PCC yoksa 2. seçenek TDP 15–20 mL/kg. Kanamasız INR >10: 2,5–5 mg ORAL K1 Vitamini (SC/IM VERMEYİN!)."
      />

      {/* 3. KİMLİK & HIZLI ÖZET KARTI (DAİMA AÇIK) */}
      <section
        id="wrf-summary"
        className={`rounded-2xl border p-5 sm:p-6 scroll-mt-20 ${
          isDark
            ? 'border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20'
            : 'border-amber-200 bg-gradient-to-br from-white via-white to-amber-50/50'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-lg border px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase ${
              isDark
                ? 'border-amber-500/40 bg-amber-950/60 text-amber-300'
                : 'border-amber-300 bg-amber-100 text-amber-900'
            }`}
          >
            Antitrombotik · Oral Vitamin K Antagonisti (VKA · VKORC1 İnhibitörü)
          </span>
          <span
            className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] font-semibold ${
              isDark ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
            }`}
          >
            ATC: B01AA03
          </span>
          <span
            className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] font-bold ${
              isDark
                ? 'border-rose-500/40 bg-rose-950/50 text-rose-300'
                : 'border-rose-200 bg-rose-50 text-rose-700'
            }`}
          >
            Mekanik Kapak &amp; APS Altın Standardı
          </span>
        </div>

        <h2 className={`mt-2 text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Varfarin Sodyum{' '}
          <span className={`font-semibold text-base sm:text-lg ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
            (Coumadin® · Orfarin®)
          </span>
        </h2>

        <p className={`mt-1.5 max-w-4xl text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Hepatik <strong>VKORC1</strong> enzimini inhibe ederek K vitaminine bağımlı pıhtılaşma faktörlerinin (
          <strong>II, VII, IX, X</strong>) ve doğal antikoagülanların (<strong>Protein C &amp; S</strong>) sentezini
          baskılayan oral kumarin antikoagülanıdır. <strong>Mekanik kalp kapakları</strong>, orta-ağır romatizmal mitral
          darlığı ve <strong>Antifosfolipid Sendromunda (APS)</strong> DOAC’ların yerini alamadığı tek oral altın
          standarttır. Acil kanamada <strong>4-Faktör PCC + IV K1 Vitamini</strong> ile 15 dakikada tam geri çevrilebilir.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            {
              label: 'Hedef INR Aralıkları',
              value: '2,0–3,0 · Mitral 2,5–3,5',
              sub: 'Tam etki 5–7 gün (FII t½ 60–72 sa)',
              tone: isDark ? 'border-amber-500/30 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-900',
            },
            {
              label: 'Acil Reversal (1. Tercih)',
              value: '4F-PCC 25–50 IU/kg',
              sub: '+ 5–10 mg IV K1 Vit (≥30 dk inf.)',
              tone: isDark ? 'border-rose-500/30 bg-rose-950/30 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-900',
            },
            {
              label: 'Perioperatif & Nöraksiyel',
              value: '5 Gün Kes · INR ≤1,4',
              sub: 'Düşük risk AF: Köprüleme YOK (BRIDGE)',
              tone: isDark ? 'border-teal-500/30 bg-teal-950/30 text-teal-200' : 'border-teal-200 bg-teal-50 text-teal-900',
            },
            {
              label: 'Renal & Laktasyon',
              value: 'IHD’de Doz Ayarı Yok',
              sub: 'Gebelikte TERATOJEN · Emzirme GÜVENLİ',
              tone: isDark ? 'border-indigo-500/30 bg-indigo-950/30 text-indigo-200' : 'border-indigo-200 bg-indigo-50 text-indigo-900',
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
        sectionId="wrf-moa"
        summary="Varfarin, karaciğerde Vitamin K Epoksit Redüktaz Kompleksi Alt Birim 1’i (VKORC1) inhibe ederek oksitlenmiş K vitamininin aktif indirgenmiş (hidrokinon) forma rejenerasyonunu engeller. Aktif K vitamini tükenince Faktör II (protrombin), VII, IX, X ile antikoagülan Protein C ve S’nin N-terminal glutamat kalıntıları γ-karboksillenemez; Ca²⁺ ve trombosit fosfolipid yüzeyine bağlanamayan işlevsiz faktörler üretilir."
        pillars={[
          {
            title: '1. Mevcut Faktörleri Değil, Yeni Sentezi Durdurur',
            detail:
              'Dolaşımdaki mevcut faktörlere etki etmez! Bu nedenle antikoagülan etki, her faktörün doğal yıkım yarı ömrüne bağlıdır: FVII (4–6 sa), Protein C (6–8 sa), FIX (24 sa), FX (36–40 sa), FII (60–72 sa).',
          },
          {
            title: '2. Erken Hiperkoagülabl Pencere Paradoksu',
            detail:
              'İlk 24–48 saatte FVII düştüğü için INR yükselir ama esas tromboz motoru olan FII hâlâ aktiftir; aynı anda doğal antikoagülan Protein C çöktüğünden geçici protrombotik dönem (ve cilt nekrozu riski) doğar!',
          },
          {
            title: '3. Enantiyomer Farkı (S vs R Varfarin)',
            detail:
              'Klinik preparat %50:%50 rasemik karışımdır. S-varfarin, R-varfarinden 3–5 kat daha potenttir ve neredeyse tamamen CYP2C9 ile metabolize olur — CYP2C9 inhibitörlerinin ve genetiğinin ölümcül olmasının sebebi budur.',
          },
        ]}
      />

      {/* 5. FARMAKOKİNETİK (ADME) AKORDİYONU */}
      <section
        id="wrf-pk"
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
            <Clock className={`h-5 w-5 shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            <div>
              <h3 className={`text-sm sm:text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Farmakokinetik (ADME) &amp; Genetik (CYP2C9 / VKORC1) Profili
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                PO ~%100 emilim · Albümin %99 · CYP2C9 (S) &amp; CYP1A2/3A4 (R) · t½ ~40 sa · Etki süresi 2–5 gün
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
                  value: 'PO %95–100 · Tmax 2–4 sa',
                  detail:
                    'Üst GİS’ten hızla ve neredeyse tam emilir; besinler pik hızını hafif yavaşlatsa da toplam emilimi bozmaz. Kolestiramin ve sükralfat GİS’te bağlayarak emilimi azaltır.',
                },
                {
                  title: 'Dağılım (Distribution)',
                  value: 'Vd 0,14 L/kg · %99 Albümin',
                  detail:
                    'Plazma albüminine ~%99 bağlanır; hipoalbüminemide (<2,5 g/dL) veya yüksek protein bağlı ilaçlarla serbest fraksiyon hızla artar. Plasentayı geçer, anne sütüne GEÇMEZ!',
                },
                {
                  title: 'Metabolizma (Metabolism)',
                  value: 'S: CYP2C9 · R: CYP1A2/3A4',
                  detail:
                    'Tamamen hepatik CYP450 ile inaktif hidroksillenmiş metabolitlere döner. CYP2C9*2/*3 ve VKORC1 (-1639G>A) varyantları hastalar arası >10 kat doz farkının ana sebebidir.',
                },
                {
                  title: 'Eliminasyon (Excretion)',
                  value: 't½ ~36–42 sa · Etki 2–5 gün',
                  detail:
                    'İnaktif metabolitlerin ~%92’si idrarla atılır (<%1 değişmeden). İlaç kesildikten sonra INR’nin <1,5’e inmesi genellikle 4–5 gün sürer; hemodiyalizle TEMİZLENMEZ.',
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
                  <p className={`mt-1 font-mono text-sm font-bold ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
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
        sectionId="wrf-contra"
        absoluteItems={[
          'Gebelik (özellikle 6–12. haftalar teratojenite ve termde fetal İKK riski — yalnızca mekanik kalp kapaklı seçilmiş hastalarda kardiyoloji konseyi istisnası).',
          'Aktif hemorajik eğilim, aktif majör GİS/intrakraniyal/retroperitoneal kanama veya hemorajik inme.',
          'Yakın tarihli veya planlanan SSS, spinal veya göz cerrahisi; aktif spinal ponksiyon / nöraksiyel blok (INR >1,4).',
          'Ağır kontrolsüz malign hipertansiyon (>180–200/110–120 mmHg), bakteriyel endokardit veya perikardiyal efüzyon/tamponad riski.',
          'Akut HIT’te trombosit sayısı düzelmeden (<150.000/µL) Varfarin başlanması (Protein C çöküşü → venöz ekstremite gangreni / cilt nekrozu!).',
          'Güvenilir INR izlemi veya ilaç uyumunun sağlanamadığı hastalar (ağır demans/alkolizm, gözetimsiz kullanım).',
        ]}
        relativeItems={[
          'Orta-ağır karaciğer yetmezliği (Child-Pugh B/C) ve bazal uzamış PT/INR — aşırı kanama riski ve labil INR.',
          'Ağır KBY / Hemodiyaliz (ESRD) — doz ayarı gerekmese de üremik kanama ve Kalsifilaksi riski yüksektir.',
          'Sık düşme öyküsü, yaş >75, malnütrisyon, dekompanse KKY (hepatik konjesyon → CYP2C9 yavaşlar!) veya hipertiroidi (faktör yıkımı hızlanır → INR yükselir!).',
          'Kalıtsal Protein C veya Protein S eksikliği (parenteral antikoagülan köprüsü olmadan başlanırsa cilt nekrozu!).',
          'Eşzamanlı DAPT (Aspirin + P2Y12), sistemik NSAİİ veya güçlü CYP2C9 inhibitörleri (Amiodaron, TMP-SMX, Metronidazol, Flukonazol).',
        ]}
        clinicalNote="Akut HIT (Heparinle İndüklenen Trombositopeni) tanısı konduğunda hasta zaten Varfarin alıyorsa, venöz ekstremite gangrenini önlemek için Varfarin derhal kesilmeli ve 5–10 mg PO/IV K1 Vitamini ile geri çevrilmelidir (ASH 2018)!"
      />

      {/* 7. HEDEF INR VE DOZ REJİMLERİ (AKORDİYON) */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="wrf-indications"
        eyebrow="ESC 2021 / AHA-ACC / CHEST · Hedef INR & Başlangıç Stratejisi"
        title="Klinik Endikasyonlar, Hedef INR Aralıkları ve Doz Titrasyonu"
        subtitle="Başlangıç 5 mg (kırılgan/yaşlı 2,5 mg) · Yükleme dozu YOK · Standart INR 2,0–3,0 · Mekanik Mitral 2,5–3,5"
        icon={<Syringe className={`h-5 w-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />}
        badge={
          <span
            className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
              isDark ? 'border-amber-500/30 bg-amber-950/40 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-800'
            }`}
          >
            Hedef INR Tablosu
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {[
            {
              title: '1. Standart Hedef: INR 2,0 – 3,0 (Hedef 2,5)',
              badge: 'INR 2,0 – 3,0',
              lines: [
                'Atriyal Fibrilasyon (non-valvüler veya orta-ağır romatizmal mitral darlığı — mitral darlığında DOAC yasak, Varfarin tek seçenek!).',
                'Akut DVT & Pulmoner Emboli (en az 5 gün UFH/DMAH/Fondaparinuks ile köprüleyip ardışık 2 gün INR ≥2,0 olunca parenteral ajanı kes).',
                'Düşük riskli Mekanik Aort Kapağı (modern bileaflet, sinüs ritmi, ek risk faktörü yok — ESC 2021 / AHA-ACC 2020).',
                'Antifosfolipid Sendromu (APS — özellikle üçlü pozitif / arteriyel trombozda DOAC kontrendike, Varfarin altın standart!) ve LV apikal trombüsü.',
              ],
            },
            {
              title: '2. Yüksek Risk Hedef: INR 2,5 – 3,5 (Hedef 3,0)',
              badge: 'INR 2,5 – 3,5',
              lines: [
                'Mekanik Mitral Kapak (tüm modeller) ve Mekanik Triküspit Kapak.',
                'Ek tromboembolik risk faktörlü Mekanik Aort Kapağı (AF, geçirilmiş emboli, LVEF <%35, hiperkoagülabilite).',
                'Eski jenerasyon mekanik kapaklar (tek disk / kafesli-top — Starr-Edwards, Björk-Shiley) veya mekanik kapak trombozu öyküsü.',
              ],
            },
            {
              title: '3. Başlangıç & İdame Titrasyon Kuralları',
              badge: '5 mg/gün · Yaşlı/Kırılgan 2,5 mg',
              lines: [
                'YÜKLEME DOZU (10 mg+) VERMEYİN! Yüksek başlangıç dozu Protein C’yi hızla çökertir ve INR’yi overshoot ettirir.',
                'Sağlıklı erişkin başlangıç: 5 mg PO günde 1 kez (tercihen akşam aynı saatte). >75 yaş, düşük kilo, malnütrisyon, KKY, KC hastalığı veya Amiodaron/CYP2C9 inhibitörü alanlarda 2,5 mg/gün başla!',
                'TTR (Time in Therapeutic Range) hedefi ≥%70’tir. Doz ayarlaması günlük değil, HAFTALIK TOPLAM DOZ üzerinden %10–20 değişiklikle yapılır.',
              ],
            },
            {
              title: '4. DOAC ↔ Varfarin Geçiş Kuralları',
              badge: 'Güvenli Geçiş Protokolü',
              lines: [
                'Varfarin → DOAC: Varfarini kes; INR <2,0 (Rivaroksaban <3,0 · Edoksaban ≤2,5 · Apiksaban/Dabigatran <2,0) olunca DOAC’a başla.',
                'DOAC → Varfarin: Varfarin + DOAC birlikte devam eder (veya DMAH köprüsü), DOAC’ın vadi (trough) saatinde ölçülen INR ≥2,0 olunca DOAC kesilir (FXa inhibitörleri pik saatte INR’yi yalancı yükseltir!).',
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
                    isDark ? 'border-amber-500/30 bg-amber-950/50 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-900'
                  }`}
                >
                  {card.badge}
                </span>
              </div>
              <ul className={`mt-2.5 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {card.lines.map((ln, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-amber-400' : 'bg-amber-600'}`} />
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
        sectionId="wrf-calc"
        title="Etkileşimli Varfarin Hesaplayıcı: 4F-PCC Reversal, BRIDGE Köprüleme & Nöraksiyel"
        subtitle="4F-PCC (IU & flakon) + IV K1 Vitamini · CHEST 2022 / BRIDGE Köprüleme · ASRA Nöraksiyel · Kritik Etkileşimler"
        icon={
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-700'
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
                { id: 'reversal', label: '1. 4F-PCC & K1 Reversal', icon: AlertOctagon },
                { id: 'bridging', label: '2. Perioperatif Köprüleme', icon: Scissors },
                { id: 'neuraxial', label: '3. ASRA Nöraksiyel (INR)', icon: ShieldAlert },
                { id: 'interactions', label: '4. Kritik INR Etkileşimleri', icon: FlaskConical },
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
                      ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
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

        {/* TAB 1: 4F-PCC & K1 VİTAMİNİ REVERSAL */}
        {activeTab === 'reversal' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hasta Ağırlığı (kg · 4F-PCC üst sınır 100 kg)
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={35}
                    max={180}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value) || 75)}
                    className={`w-24 rounded-lg border px-2.5 py-1.5 font-mono text-sm font-black ${
                      isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                    }`}
                  />
                  <div className="flex flex-wrap gap-1">
                    {[60, 75, 90, 110].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setWeightKg(p)}
                        className={`cursor-pointer rounded-md border px-2 py-1 font-mono text-[11px] font-bold ${
                          weightKg === p
                            ? 'border-amber-500 bg-amber-600 text-white'
                            : isDark
                              ? 'border-slate-700 bg-slate-900 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Güncel Ölçülen INR
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    step={0.1}
                    min={1.0}
                    max={20.0}
                    value={currentInr}
                    onChange={(e) => setCurrentInr(Number(e.target.value) || 1.0)}
                    className={`w-24 rounded-lg border px-2.5 py-1.5 font-mono text-sm font-black ${
                      isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                    }`}
                  />
                  <div className="flex flex-wrap gap-1">
                    {[2.8, 5.2, 8.5, 12.0].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setCurrentInr(val)}
                        className={`cursor-pointer rounded-md border px-2 py-1 font-mono text-[11px] font-bold ${
                          currentInr === val
                            ? 'border-rose-500 bg-rose-600 text-white'
                            : isDark
                              ? 'border-slate-700 bg-slate-900 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {val.toString().replace('.', ',')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Klinik Senaryo
                </span>
                <div className="mt-2 grid grid-cols-1 gap-1.5">
                  {(
                    [
                      { id: 'major_bleed', label: 'Majör / İntrakraniyal Kanama' },
                      { id: 'urgent_surgery', label: 'Acil Cerrahi (<6 saat)' },
                      { id: 'no_bleed', label: 'Aktif Kanama Yok (Yüksek INR)' },
                    ] as const
                  ).map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setReversalScenario(sc.id)}
                      className={`cursor-pointer rounded-lg border px-2.5 py-1 text-left text-xs font-bold ${
                        reversalScenario === sc.id
                          ? sc.id === 'no_bleed'
                            ? 'border-amber-500 bg-amber-600 text-white'
                            : 'border-rose-600 bg-rose-600 text-white'
                          : isDark
                            ? 'border-slate-700 bg-slate-900 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {sc.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2 ${
                reversalCalc.urgency === 'danger'
                  ? isDark
                    ? 'border-rose-500/50 bg-rose-950/30'
                    : 'border-rose-300 bg-rose-50'
                  : reversalCalc.urgency === 'warning' || reversalCalc.urgency === 'caution'
                    ? isDark
                      ? 'border-amber-500/40 bg-amber-950/25'
                      : 'border-amber-300 bg-amber-50'
                    : isDark
                      ? 'border-emerald-500/40 bg-emerald-950/20'
                      : 'border-emerald-300 bg-emerald-50'
              }`}
            >
              <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{reversalCalc.headline}</p>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div
                  className={`rounded-lg border p-3 text-xs ${
                    isDark ? 'border-slate-800 bg-slate-950/70 text-slate-200' : 'border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-rose-500">4-Faktör PCC Dozu</span>
                  <span className="mt-1 block font-mono font-bold">{reversalCalc.pccText}</span>
                </div>
                <div
                  className={`rounded-lg border p-3 text-xs ${
                    isDark ? 'border-slate-800 bg-slate-950/70 text-slate-200' : 'border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-500">K1 Vitamini (Fitomenadion)</span>
                  <span className="mt-1 block font-mono font-bold">{reversalCalc.vitKText}</span>
                </div>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                <strong>Uygulama:</strong> {reversalCalc.actionText}
              </p>
              <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                {reversalCalc.reboundNote}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: PERİOPERATİF KESME & KÖPRÜLEME (BRIDGE / CHEST 2022) */}
        {activeTab === 'bridging' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hastanın Tromboemboli Risk Profili
                </label>
                <select
                  value={bridgeProfile}
                  onChange={(e) => setBridgeProfile(e.target.value as BridgeProfile)}
                  className={`mt-2 w-full rounded-lg border px-2.5 py-2 text-xs font-semibold ${
                    isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                  }`}
                >
                  <option value="af_low_mod">Non-Valvüler AF · CHA₂DS₂-VASc ≤5, Son 3 Ay İnme Yok (Düşük/Orta Risk)</option>
                  <option value="af_high_rheumatic">AF · CHA₂DS₂-VASc ≥7 veya Son 3 Ay İnme/TİA veya Romatizmal Mitral Darlık (Yüksek Risk)</option>
                  <option value="mech_aortic_low">Mekanik Aort Kapağı (Bileaflet, Sinüs Ritmi, Ek Risk Yok)</option>
                  <option value="mech_mitral_or_high_aortic">Mekanik Mitral Kapak / Eski Aort Kapağı / İnme Öykülü Mekanik Kapak (Yüksek Risk)</option>
                  <option value="recent_vte_3m">Son 3 Ay İçinde Akut DVT / PE (Yüksek Risk)</option>
                  <option value="remote_vte_gt12m">&gt;3–12 Ay Önce Geçirilmiş VTE (Düşük/Orta Risk)</option>
                  <option value="aps_severe">Antifosfolipid Sendromu (APS) / Ağır Trombofili (Yüksek Risk)</option>
                </select>
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Cerrahi / Girişimsel Kanama Riski
                </span>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: 'minimal', label: 'Minimal (Diş/Katarakt)' },
                      { id: 'low_mod', label: 'Düşük-Orta Risk' },
                      { id: 'high', label: 'Yüksek (Nöro/Majör)' },
                    ] as const
                  ).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSurgeryRisk(r.id)}
                      className={`cursor-pointer rounded-lg border px-2 py-2 text-[11px] font-bold ${
                        surgeryRisk === r.id
                          ? 'border-amber-600 bg-amber-600 text-white'
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
                bridgeCalc.tone === 'amber'
                  ? isDark
                    ? 'border-amber-500/40 bg-amber-950/25 text-amber-100'
                    : 'border-amber-300 bg-amber-50 text-amber-950'
                  : bridgeCalc.tone === 'emerald'
                    ? isDark
                      ? 'border-emerald-500/40 bg-emerald-950/25 text-emerald-100'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-950'
                    : isDark
                      ? 'border-teal-500/40 bg-teal-950/25 text-teal-100'
                      : 'border-teal-300 bg-teal-50 text-teal-950'
              }`}
            >
              <p className="text-sm font-black">{bridgeCalc.title}</p>
              <p className="text-xs">
                <strong>Kesme Takvimi:</strong> {bridgeCalc.holdDays}
              </p>
              <p className="text-xs">
                <strong>Köprüleme (Bridging):</strong> {bridgeCalc.bridging}
              </p>
              <p className="text-xs leading-relaxed">{bridgeCalc.detail}</p>
            </div>
          </div>
        )}

        {/* TAB 3: ASRA 2018 / ESAIC 2022 NÖRAKSİYEL KONTROL */}
        {activeTab === 'neuraxial' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>İşlem / Çekim Öncesi Güncel INR</span>
                  <span className="font-mono text-amber-600 dark:text-amber-300">{neuraxialInr.toFixed(1).replace('.', ',')}</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={4.5}
                  step={0.1}
                  value={neuraxialInr}
                  onChange={(e) => setNeuraxialInr(Number(e.target.value))}
                  className="mt-3 w-full accent-amber-600"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-500">
                  <span>1,0</span>
                  <span>1,4 (Blok)</span>
                  <span>1,5 (Kateter)</span>
                  <span>3,0</span>
                  <span>4,5</span>
                </div>
              </div>

              <div
                className={`rounded-xl border p-4 flex flex-col justify-center ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Senaryo Seçimi
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHasEpiduralCatheter(false)}
                    className={`cursor-pointer rounded-lg border px-2.5 py-2 text-xs font-bold ${
                      !hasEpiduralCatheter
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Yeni Spinal / Epidural Blok
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasEpiduralCatheter(true)}
                    className={`cursor-pointer rounded-lg border px-2.5 py-2 text-xs font-bold ${
                      hasEpiduralCatheter
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Mevcut Epidural Kateter Çekimi
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border p-4 ${
                neuraxialCalc.tone === 'emerald'
                  ? isDark
                    ? 'border-emerald-500/40 bg-emerald-950/25 text-emerald-200'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : neuraxialCalc.tone === 'amber'
                    ? isDark
                      ? 'border-amber-500/40 bg-amber-950/25 text-amber-200'
                      : 'border-amber-300 bg-amber-50 text-amber-900'
                    : isDark
                      ? 'border-rose-500/50 bg-rose-950/30 text-rose-200'
                      : 'border-rose-300 bg-rose-50 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-black">
                {neuraxialCalc.tone === 'emerald' ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                )}
                <span>{neuraxialCalc.status}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed">{neuraxialCalc.detail}</p>
            </div>
          </div>
        )}

        {/* TAB 4: KRİTİK İLAÇ & ANTİBİYOTİK INR ETKİLEŞİMLERİ */}
        {activeTab === 'interactions' && (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                  <th className="p-3 font-bold">Eşzamanlı İlaç / Grup</th>
                  <th className="p-3 font-bold">INR Etkisi</th>
                  <th className="p-3 font-bold">Mekanizma &amp; Klinik Aksiyon</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                {[
                  [
                    'TMP-SMX (Bactrim®) · Metronidazol · Flukonazol / Vorikonazol',
                    '↑↑↑ ŞİDDETLİ ARTIŞ',
                    'Güçlü CYP2C9 inhibisyonu! Acil servisteki INR >8–10 vakalarının başlıca sebebi. Alternatif seçin veya Varfarini ampirik %25–50 azaltıp 3. günde INR bakın.',
                  ],
                  [
                    'Amiodaron',
                    '↑↑↑ UZAMIŞ ARTIŞ',
                    'Güçlü CYP2C9 inhibisyonu (Amiodaron t½ 40–60 gün!). Amiodaron başlanırken Varfarini %30–50 azaltın; Amiodaron kesildikten sonra etkisi haftalarca sürer!',
                  ],
                  [
                    'Siprofloksasin / Levofloksasin · Klaritromisin · Seftriakson',
                    '↑↑ BELİRGİN ARTIŞ',
                    'CYP1A2/3A4 inhibisyonu + bağırsak K vitamini florasının baskılanması. Başlandıktan 3–5 gün içinde mutlaka INR kontrolü yapın.',
                  ],
                  [
                    'Parasetamol >2 g/gün (ardışık ≥3–4 gün)',
                    '↑ ORTA-BELİRGİN ARTIŞ',
                    'NAPQI metaboliti VKORC1 enzimini inhibe eder! Tek/ara sıra 500–1000 mg güvenlidir; düzenli >2–3 g/gün kullanımında 3–5 günde INR bakın.',
                  ],
                  [
                    'NSAİİ’ler (İbuprofen, Diklofenak, Tenoksikam) & DAPT',
                    '↑↑ KANAMA PATLAMASI',
                    'INR normal kalsa bile gastrik mukoza hasarı + trombosit blokajı ile GİS kanama riskini 3–5 kat artırır → NSAİİ’den kaçının, gerekirse PPI ekleyin.',
                  ],
                  [
                    'Rifampisin · Karbamazepin · Fenitoin · Fenobarbital · Sarı Kantaron',
                    '↓↓↓ ŞİDDETLİ DÜŞÜŞ',
                    'Güçlü CYP2C9/3A4 indüksiyonu → mekanik kapak trombozu / inme riski! Rifampisin kesildikten 2 hafta sonra aşırı INR sıçraması (rebound kanama!) görülür.',
                  ],
                ].map(([agent, dir, detail]) => (
                  <tr key={agent} className={isDark ? 'odd:bg-slate-950/40' : 'odd:bg-slate-50/50'}>
                    <td className={`p-3 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{agent}</td>
                    <td
                      className={`p-3 font-mono font-bold whitespace-nowrap ${
                        dir.includes('↓')
                          ? isDark
                            ? 'text-sky-300'
                            : 'text-sky-700'
                          : isDark
                            ? 'text-rose-300'
                            : 'text-rose-700'
                      }`}
                    >
                      {dir}
                    </td>
                    <td className="p-3 leading-relaxed">{detail}</td>
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
        sectionId="wrf-tr"
        preparations={[
          {
            name: 'Coumadin® 5 mg Çentikli Tablet',
            presentation: '28 tabletlik blister ambalaj · Pembe / şeftali renkli, tek çentikli',
            concentration: '5 mg / tablet (yarım = 2,5 mg)',
            saltOrBaseNote: 'Türkiye’de en yaygın standart formdur. Çentikli olduğu için 2,5 mg (yarım) ve 1,25 mg (çeyrek) ayarlaması yapılabilir.',
            alertLevel: 'standard',
          },
          {
            name: 'Coumadin® 10 mg Çentikli Tablet',
            presentation: '28 tabletlik blister ambalaj · Beyaz renkli, çentikli',
            concentration: '10 mg / tablet (yarım = 5 mg)',
            saltOrBaseNote: 'DİKKAT: 5 mg tabletin 2 KATIDIR! Hastanın elindeki kutunun 5 mg mı 10 mg mı olduğu her poliklinik ve yatışta fiziken kontrol edilmelidir!',
            alertLevel: 'high',
          },
          {
            name: 'Orfarin® 5 mg Tablet',
            presentation: '28 tabletlik ambalaj · 5 mg Varfarin sodyum eşdeğeri',
            concentration: '5 mg / tablet',
            saltOrBaseNote: 'Jenerik/marka geçişlerinde (Coumadin® ↔ Orfarin®) dar terapötik aralık nedeniyle 5–7 gün içinde kontrol INR ölçümü önerilir.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Her gün AYNI SAATTE (tercihen akşam — gündüz bakılan INR sonucuna göre aynı akşam doz revizyonu yapılabilmesi için!) ağızdan alınır.',
          'Unutulan doz aynı gün içinde hatırlanırsa alınır; ertesi gün ASLA çift doz alınmaz!',
          'IV / IM Varfarin formu Türkiye’de rutin stokta yoktur; oral alamayan yüksek riskli hastada parenteral köprüleme (UFH / Enoksaparin) yapılır.',
        ]}
        concentrationTrapWarning="Coumadin® 5 mg (pembe) ile 10 mg (beyaz) tabletin karıştırılması ve hastaya 'yarım/tam tablet' yerine net mg yazılmaması en sık iatrojenik intrakraniyal kanama nedenidir — orderları DAİMA hem mg hem de tablet rengiyle doğrulayın!"
      />

      {/* 10. UYGULAMA YOLU & UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="wrf-line"
        accessRequirement="peripheral-ok"
        accessSummary="Yalnızca ORAL (PO veya NG/PEG tüpten ezilerek su ile) uygulanır. Enteral beslenme ürünlerinin bir kısmı K vitamini içerdiğinden ve tüp duvarına adsorpsiyon olabildiğinden, NG/PEG ile sürekli beslenen YBÜ hastasında beslenmeye 1 saat ara verilerek verilmesi ve tüpün 30 mL suyla yıkanması önerilir."
        phRange="Oral tablet (sistemik IV infüzyon formu TR’de rutin kullanılmaz)"
        osmolalityNote="Acil reversal için verilen 4F-PCC ve IV K1 vitamini ayrı periferik/santral IV hattan uygulanır."
        compatibleDiluents={['Su (PO / NG-PEG yıkama)', 'IV K1 Vitamini için: 50 mL %0,9 NaCl veya %5 Dekstroz (≥30 dk infüzyon)']}
        ySiteCompatible={['Oral ajan (IV Y-site geçerli değildir)']}
        ySiteIncompatible={['Kolestiramin & Sükralfat ile aynı anda ağızdan almayın (en az 2–4 saat ayırın!)']}
        stabilityNote="Işıktan ve nemden koruyarak oda sıcaklığında (<25 °C) saklanır."
        extravasationProtocol="IV K1 Vitamini (Konakion® MM) hızlı IV puşe veya sulandırmadan verildiğinde ciddi anaflaktoid reaksiyon (hipotansiyon, bronkospazm, kardiyak arrest) yapabilir — mutlaka 50 mL içinde ≥30 dakikada yavaş infüze edin!"
      />

      {/* 11. BÖBREK & KARACİĞER YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="wrf-organ"
        renalSummary="Renal Doz Azaltımı GEREKMEZ (Hepatik CYP2C9 atılımı) · Diyalizle Temizlenmez — Ancak KBY/IHD’de Kanama & Kalsifilaksi Riski!"
        renalDetails={[
          'CrCl <30 ve Hemodiyalizde (IHD): Resmi doz kısıtlaması yoktur; mekanik kapak + ESRD’de tek oral seçenektir.',
          'Ancak ileri KBY/IHD’de CYP2C9 aktivitesi azalır, üremik trombosit disfonksiyonu kanama riskini artırır ve nadir fakat ölümcül KALSİFİLAKSİ gelişebilir → düşük dozla (2,5 mg) başlayıp sık INR izleyin!',
        ]}
        hepaticSummary="Child-Pugh B–C’de AŞIRI DUYARLILIK & YÜKSEK KANAMA RİSKİ! (CYP2C9 çöküşü + bazal faktör II/VII/IX/X eksikliği)."
        hepaticDetails={[
          'Child-Pugh A: Düşük dozla (2,5 mg) başla ve sık INR izle.',
          'Child-Pugh B–C: Bazal INR zaten yüksek olduğundan doz titrasyonu tehlikeli ve güvenilmezdir; ağır koagülopati/varis kanamasında kontrendikedir.',
        ]}
        renalMatrix={STANDALONE_ORGAN_PART2.warfarin.renalMatrix}
        hepaticMatrix={STANDALONE_ORGAN_PART2.warfarin.hepaticMatrix}
        dualOrganNote={STANDALONE_ORGAN_PART2.warfarin.dualOrganNote}
      />

      {/* 12. GERİATRİ & OBEZİTE */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="wrf-geriatrics"
        geriatricReductionBadge=">75 Yaş · 2,5 mg/gün Başla!"
        geriatricPoints={[
          'Yaşlı (>75 yaş) hastalarda hepatik kitle ve CYP2C9 klirensi düşer, K vitamini depoları azalır ve duyarlılık artar — başlangıç dozu 5 mg yerine 2,5 mg/gün olmalıdır!',
          'Polifarmasi (antibiyotikler, amiodaron, NSAİİ, PPI, SSRI) ve düşme riski nedeniyle geriatrik hastalarda intrakraniyal kanama riski yüksektir.',
          'Yaş tek başına kontrendikasyon değildir (AF’de inme koruması yaşlıda en büyük mutlak faydayı sağlar), ancak TTR ≥%70 hedefiyle yakın INR takibi şarttır.',
        ]}
        obesityWeightScalarBadge="INR Titrasyonlu · 4F-PCC Maks 100 kg"
        obesityPoints={[
          'Morbid obezitede (BMI ≥40 kg/m² · >120 kg) DOAC’ların farmakokinetik belirsizliğine karşı Varfarin doğrudan INR ile titre edilebildiğinden güvenilir bir seçenektir.',
          'Obez hastalarda başlangıç ve idame haftalık doz gereksinimi biraz daha yüksek olabilir (ancak yine de 5 mg ile başlayıp INR ile titre edin).',
          'KRİTİK ACİL KURAL: Majör kanamada 4F-PCC (25–50 IU/kg) hesaplanırken 100 kg üst sınır (cap) uygulanır (maks 2.500 / 3.500 / 5.000 IU)!',
        ]}
      />

      {/* 13. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="wrf-preg"
        pregnancySummary="GEBELİKTE TERATOJENDİR (Kontrendike — Özellikle 6–12. Haftalar!) · Yalnızca Mekanik Kapak Özel İstisnası."
        pregnancyDetails={[
          'Plasentayı serbestçe geçer! 6–12. gebelik haftalarında Fetal Varfarin Sendromu (nazal hipoplazi, epifizyal stippling/kondrodisplazi punktata, optik atrofi, SSS anomalileri) yapar.',
          '2. ve 3. trimester ile doğumda fetal antikoagülasyon nedeniyle fetal intrakraniyal kanama ve ölü doğum riski taşır → VTE/AF için gebelikte DMAH (Enoksaparin) kullanılır.',
          'Tek İstisna (ESC 2018): Mekanik kalp kapağı olan ve günlük Varfarin ihtiyacı ≤5 mg/gün olan gebelerde 2.–3. trimesterde (36. haftaya kadar) multidisipliner konsey kararıyla kullanılabilir; 36. haftada doğum/epidural için UFH/DMAH’a geçilir!',
        ]}
        lactationSummary="LAKTASYONDA TAMAMEN GÜVENLİDİR! (Anne sütüne geçmez · Bebekte INR’yi etkilemez — LactMed / ACOG / ESC)."
        lactationDetails={[
          'Yüksek plazma protein bağlanması (%99) ve zayıf asit yapısı nedeniyle aktif Varfarin anne sütüne saptanabilir düzeyde GEÇMEZ.',
          'Postpartum dönemde Varfarin kullanan anneler güvenle emzirebilir (bebeğe standart yenidoğan K vitamini profilaksisi verilmiş olması yeterlidir).',
        ]}
      />

      {/* 14. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="wrf-adverse"
        items={[
          {
            title: 'Majör & İntrakraniyal Kanama (İKK)',
            incidenceOrSeverity: 'Yıllık %1–3 (İKK %0,3–0,6)',
            detail:
              'GİS, retroperitoneal, intrakraniyal ve cerrahi alan kanamaları. INR >4,5’in üzerine çıktıkça İKK riski üstel olarak katlanır.',
            tone: 'rose',
          },
          {
            title: 'Varfarin-İndüklü Cilt Nekrozu (WISN)',
            incidenceOrSeverity: 'Nadir (%0,01–0,1 · İlk 3–6. gün)',
            detail:
              'Protein C/S eksikliğinde veya yüksek başlangıç dozunda meme, kalça ve karın yağ dokusunda mikrovasküler tromboz → ağrılı hemorajik bül/nekroz! Derhal kes + IV K1 + UFH + Protein C/PCC!',
            tone: 'rose',
          },
          {
            title: 'Kalsifilaksi (Kalsifik Üremik Arteriyolopati)',
            incidenceOrSeverity: 'ESRD / HD Hastalarında Nadir-Fatal',
            detail:
              'K vitamini bağımlı Matrix Gla Proteinin (MGP) inhibisyonu sonucu damar duvarı kalsifikasyonu ve ağrılı nekrotik deri ülserleri! Gelişirse Varfarin kesilir.',
            tone: 'amber',
          },
          {
            title: 'Mor Ayak Parmağı Sendromu (Purple Toe)',
            incidenceOrSeverity: 'Nadir (3–8. haftada)',
            detail:
              'Ateromatöz plaklardan kolesterol mikroembolizasyonu sonucu ayak parmaklarında ağrılı mor/siyanotik renk değişikliği (nabızlar açıktır!) → Varfarin kesilir.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 15. ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="wrf-cautions"
        items={[
          {
            title: 'Diyet K Vitamini Efsanesi: Yasaklama, SABİT Tut!',
            detail:
              'Ispanak, brokoli, roka, karalahana gibi yeşil yapraklı sebzeleri tamamen yasaklamak hastanın K vitamini deposunu sıfırlayıp INR’yi aşırı oynak (labil) hale getirir! Önemli olan her hafta benzer miktarda tutarlı tüketimdir.',
          },
          {
            title: 'Tiroid Hastalıkları & Ateş / İshal Etkisi',
            detail:
              'Hipertiroidi (ve ateş/katabolizma) K vitamini bağımlı faktörlerin yıkımını hızlandırarak INR’yi YÜKSELTİR; hipotiroidi ise faktör yıkımını yavaşlatarak Varfarin direncine (düşük INR) yol açar! İshal/malabsorpsiyon da K vitamini emilimini bozarak INR’yi yükseltir.',
          },
          {
            title: 'Kalp Yetmezliği Dekompanzasyonu',
            detail:
              'Akut KKY atağında hepatik venöz konjesyon karaciğer metabolizmasını (CYP2C9) ve faktör sentezini bozarak stabil giden hastada ani INR yükselmesine (INR >5–8) neden olur!',
          },
          {
            title: 'Akut Alkol vs Kronik Alkolizm Paradoksu',
            detail:
              'Akut aşırı alkol (binge drinking) CYP2C9’u inhibe edip INR’yi YÜKSELTİR (kanama!); buna karşın kronik düzenli alkolizm (siroz yoksa) CYP indüksiyonuyla INR’yi DÜŞÜREBİLİR (siroz gelişince ise INR yükselir).',
          },
          {
            title: 'Trombofili Paneli Ne Zaman Çekilmez?',
            detail:
              'Varfarin alırken Protein C ve Protein S düzeyleri yalancı düşük çıkar (ve Lupus Antikoagülan testi bozulabilir); kalıtsal Protein C/S testi Varfarin kesildikten en az 2 hafta sonra bakılmalıdır.',
          },
          {
            title: 'Göz & Dental İşlemler',
            detail:
              'Katarakt (topikal anestezi) ve basit 1–2 diş çekiminde Varfarini kesmek tromboz (inme) riskini gereksiz artırır — INR ≤3,0–3,5 doğrulanarak lokal hemostazla devam edilir.',
          },
        ]}
      />

      {/* 16. 4 KADEMELİ DERİN FARMAKODİNAMİK ANALİZ (AKORDİYON) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="wrf-deep-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef: Endoplazmik Retikulum VKORC1 Enzim Blokajı',
          summary:
            'Varfarin, hepatosit endoplazmik retikulum (ER) membranına gömülü transmembran enzim olan Vitamin K Epoksit Redüktaz Alt Birim 1’e (VKORC1) yüksek afiniteyle (S-varfarin Ki ≈ 4 nM) bağlanarak K vitamini döngüsünü kilitler.',
          points: [
            'Fizyolojik K Vitamini Döngüsü: γ-glutamil karboksilaz (GGCX) enzimi, pıhtılaşma faktörlerini aktifleştirirken indirgenmiş K vitamini hidrokinonu (KH₂) oksitlenmiş Vitamin K 2,3-epoksite (KO) dönüştürür.',
            'VKORC1, KO’yu yeniden aktif KH₂’ye indirgeyen hız kısıtlayıcı enzimdir; Varfarin VKORC1’i bloke edince hepatosit içi KH₂ deposu hızla tükenir.',
            'Yüksek doz dışarıdan K1 Vitamini (Fitomenadion) verildiğinde, Varfarine dirençli alternatif bir enzim (NAD(P)H bağımlı kinon redüktaz / DT-diaforaz) devreye girerek VKORC1’i bypass eder ve yeni faktör sentezini 6–24 saatte başlatır!',
          ],
        }}
        intracellularSignaling={{
          title: 'Post-Translasyonel γ-Karboksilasyon & Gla-Domain Biyofiziği',
          summary:
            'KH₂ eksikliğinde Faktör II, VII, IX, X ile Protein C ve S’nin N-terminal Gla-domain bölgelerindeki 9–13 adet glutamat (Glu) kalıntısı γ-karboksiglutamata (Gla) çevrilemez — bu des-karboksi proteinlere PIVKA (Proteins Induced by Vitamin K Absence) denir.',
          points: [
            'Gla kalıntılarındaki çift negatif yüklü karboksil grupları, Ca²⁺ iyonlarını şelatlayarak faktörün aktive trombosit membranındaki negatif yüklü fosfatidilserin yüzeyine kenetlenmesini sağlar.',
            'PIVKA molekülleri dolaşıma salınsa bile Ca²⁺ bağlayamadıkları için tenaz (FIXa–FVIIIa) ve protrombinaz (FXa–FVa) komplekslerine katılamazlar → pıhtılaşma kaskadı hem ekstrensek hem intrensek hem ortak yolda baskılanır!',
            'Aynı mekanizma damar düz kasındaki Matrix Gla Protein’i (MGP) de inaktive ederek kronik diyaliz hastalarında vasküler kalsifikasyonu (Kalsifilaksi) hızlandırabilir.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Karaciğer & Koagülasyon Kinetiği',
            tissueTarget: 'FVII / PC → FIX / FX → FII',
            accent: 'amber',
            points: [
              'Faktör yarı ömürleri arasındaki uçurum (FVII 4–6 sa vs FII 60–72 sa), PT/INR’nin ilk 48 saatte FVII düşüşüyle erken yükselmesine ama gerçek antitrombotik korumanın ancak FII düşünce (5. günde) oluşmasına yol açar.',
              '4F-PCC doğrudan hazır ve γ-karboksillenmiş insan FII, FVII, FIX, FX + Protein C/S içerdiği için hepatik sentezi beklemeden dakikalar içinde hemostazı restore eder.',
            ],
          },
          {
            systemTitle: 'Mekanik Kapak & Yapay Yüzey',
            tissueTarget: 'Kontakt Yolak (FXIIa/FXIa/FIXa)',
            accent: 'rose',
            points: [
              'Mekanik kapak yüzeyinde yoğun kontakt aktivasyonu (FXIIa → FXIa → FIXa → FXa → FIIa) gelişir; tek faktörlü DOAC’lar (RE-ALIGN çalışması!) bu çok basamaklı patlamayı bastıramaz.',
              'Varfarin aynı anda FII, FVII, FIX ve FX’i birden düşürerek mekanik kapak üzerindeki trombin patlamasını üstün biçimde engeller!',
            ],
          },
          {
            systemTitle: 'Mikrovasküler Cilt & Protein C Ekseni',
            tissueTarget: 'Endotel Trombomodülin–PC',
            accent: 'violet',
            points: [
              'Protein C (t½ 6–8 sa) hızla çöktüğünde dermal subkütan venüllerde lokal fibrin trombüsleri oluşarak Varfarin-indüklü cilt nekrozu (WISN) gelişebilir.',
              'Yükleme dozundan kaçınmak ve akut trombozda ilk ≥5 gün parenteral antikoagülan köprüsü uygulamak bu komplikasyonu önler.',
            ],
          },
          {
            systemTitle: 'Plasenta, Kemik & Damar Duvarı',
            tissueTarget: 'Osteokalsin & MGP',
            accent: 'sky',
            points: [
              'Fetal embriyogenezde (6–12. haftalar) kemik/kıkırdaktaki K vitamini bağımlı Osteokalsin ve MGP proteinlerinin blokajı nazal hipoplazi ve epifizyal kalsifikasyona (Fetal Varfarin Sendromu) yol açar.',
              'Anne sütüne geçmediği için postpartum emziren bebekte kemik veya koagülasyon riski oluşturmaz.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Farmakogenetik (CYP2C9 / VKORC1), Rebound Fenomeni & Direnç',
          summary:
            'Aynı 5 mg doz bir hastada INR 1,3 bırakırken CYP2C9*3/*3 + VKORC1 AA genotipli hastada INR 9,0 yapabilir; bu nedenle Varfarin farmakogenetiğin klinik tıptaki klasik örneğidir.',
          points: [
            '4F-PCC Sonrası INR Rebound Biyofiziği: 4F-PCC içindeki ekzojen FVII 6 saatte yıkılırken dolaşımdaki Varfarin (t½ ~40 sa) hâlâ VKORC1’i bloke etmektedir → eşzamanlı IV K1 vitamini şarttır!',
            'Yüksek Doz K1 Vitamini Sonrası Varfarin Direnci: 10 mg IV K1 vitamini verildikten sonra yeniden Varfarine dönüldüğünde 1–2 hafta boyunca geçici direnç gelişebilir (bu sürede yüksek riskli hastada DMAH/UFH köprüsü gerekir).',
            'Kalıtsal VKORC1 Mutasyonları: Nadir bazı hastalarda VKORC1 bağlanma cebindeki mutasyonlar >15–20 mg/gün doz gerektiren gerçek Varfarin direncine neden olabilir.',
          ],
        }}
        clinicalPearls={[
          'Acil majör kanamada TDP çözülmesini BEKLEMEYİN — 4-Faktör PCC (25–50 IU/kg) + 5–10 mg IV K1 Vitamini (30 dk yavaş infüzyon!) 15 dakikada hayat kurtarır!',
          'Varfarin alan hastaya TMP-SMX (Bactrim®), Metronidazol, Flukonazol veya Amiodaron yazıyorsanız 3–5 gün içinde INR randevusu ve proaktif %25–50 doz azaltımı planlayın!',
          'Non-valvüler düşük-orta riskli AF hastasında (CHA₂DS₂-VASc ≤5, son 3 ayda inme yok) ameliyat öncesi rutin DMAH köprülemesi YAPMAYIN (BRIDGE Trial: kanamayı 3 kat artırır, inmeyi azaltmaz)!',
          'Akut HIT hastasında trombosit <150.000/µL iken Varfarin BAŞLAMAYIN; zaten alıyorsa kesip K1 vitamini ile geri çevirin!',
        ]}
      />

      {/* 17. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="wrf-refs"
        drugName="Varfarin Sodyum (Coumadin® / Orfarin®)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Mikonazol (Oral Jel / Vajinal Dahil!) & Sistemik Azoller (Flukonazol, Vorikonazol)',
            mechanism: 'Çok güçlü CYP2C9 inhibisyonu (topikal oral mikonazol jeli bile sistemik emilip INR >10 yapar!)',
            clinicalEffect: 'Ani, kontrolsüz INR patlaması ve fatal intrakraniyal/GİS kanama.',
            management: 'Mikonazol jel/fitilden KESİNLİKLE kaçının (Nistatin seçin); Flukonazol zorunluysa Varfarini %30–50 azaltıp 48–72 sa içinde INR bakın.',
          },
          {
            severity: 'D',
            agent: 'TMP-SMX (Bactrim®) & Metronidazol',
            mechanism: 'Güçlü S-varfarin CYP2C9 inhibisyonu',
            clinicalEffect: '3–5 gün içinde şiddetli supraterapötik INR (>6–10) ve majör kanama.',
            management: 'Mümkünse alternatif antibiyotik seçin; zorunluysa Varfarini %25–50 azaltın ve 3. günde INR kontrolü yapın.',
          },
          {
            severity: 'D',
            agent: 'Amiodaron',
            mechanism: 'Güçlü CYP2C9 ve CYP3A4 inhibisyonu (uzun t½ nedeniyle gecikmeli & kalıcı etki)',
            clinicalEffect: '1–4 hafta içinde belirgin INR yükselmesi ve uzamış kanama riski.',
            management: 'Amiodaron başlarken Varfarin dozunu ampirik %30–50 azaltın ve haftalık INR izleyin.',
          },
          {
            severity: 'D',
            agent: 'Rifampisin, Karbamazepin, Fenitoin, Fenobarbital, Sarı Kantaron',
            mechanism: 'Güçlü CYP2C9/3A4 enzim indüksiyonu',
            clinicalEffect: 'Subterapötik INR (<1,5), mekanik kapak trombozu, inme veya DVT/PE nüksü.',
            management: 'Alternatif seçin; zorunluysa sık INR ile doz artışı yapın ve indükleyici kesilince 2 hafta içinde rebound kanamaya karşı dozu hızla düşürün!',
          },
          {
            severity: 'D',
            agent: 'NSAİİ’ler (İbuprofen, Diklofenak, Ketorolak, Tenoksikam) & Antiplateletler',
            mechanism: 'Trombosit COX-1/P2Y12 blokajı + gastrik erozyon + CYP2C9/protein etkileşimi',
            clinicalEffect: 'GİS kanama riskinde 3–5 kat artış (INR terapötik olsa dahi!).',
            management: 'NSAİİ’den kaçının; zorunlu antiplatelet birlikteliğinde mutlaka PPI (Pantoprazol) ekleyin ve en kısa süre kullanın.',
          },
          {
            severity: 'C',
            agent: 'Parasetamol (Asetaminofen >2 g/gün ardışık ≥3–4 gün) & Florokinolon/Makrolidler',
            mechanism: 'NAPQI aracılı VKORC1 inhibisyonu / flora ve CYP1A2-3A4 inhibisyonu',
            clinicalEffect: 'INR’de 0,5–2,0 puanlık anlamlı artış.',
            management: 'Ara sıra 500–1000 mg Parasetamol güvenlidir; düzenli >2 g/gün veya antibiyotik kürlerinde 3–5 gün içinde INR bakın.',
          },
        ]}
        references={[
          {
            authors: 'Douketis JD, Spyropoulos AC, Kaatz S, et al. (BRIDGE Investigators)',
            title: 'Perioperative Bridging Anticoagulation in Patients with Atrial Fibrillation',
            journal: 'N Engl J Med',
            year: 2015,
            doi: '10.1056/NEJMoa1501035',
            note: '1.884 AF hastasında perioperatif DMAH köprülemesinin arteriyel tromboemboliyi azaltmadığını ve majör kanamayı ~2,5–3 kat artırdığını kanıtlayan dönüm noktası çalışması.',
          },
          {
            authors: 'Douketis JD, Spyropoulos AC, Murad MH, et al.',
            title: 'Perioperative Management of Antithrombotic Therapy: An American College of Chest Physicians Clinical Practice Guideline',
            journal: 'Chest',
            year: 2022,
            doi: '10.1016/j.chest.2022.07.025',
            note: 'Varfarinin 5 gün önceden kesilmesi, düşük-orta riskte köprüleme yapılmaması ve yüksek riskte (mekanik mitral, son 3 ay VTE/inme) köprüleme şemaları.',
          },
          {
            authors: 'Tomaselli GF, Mahaffey KW, Cuker A, et al.',
            title: '2020 ACC Expert Consensus Decision Pathway on Management of Bleeding in Patients on Oral Anticoagulants',
            journal: 'J Am Coll Cardiol',
            year: 2020,
            doi: '10.1016/j.jacc.2020.04.053',
            note: 'Majör Varfarin kanamasında 4-Faktör PCC (25 / 35 / 50 IU/kg) + 5–10 mg IV K1 Vitamini (≥30 dk yavaş infüzyon) birinci basamak algoritması.',
          },
          {
            authors: 'Sarode R, Milling TJ Jr, Refaai MA, et al.',
            title: 'Efficacy and Safety of a 4-Factor Prothrombin Complex Concentrate in Patients on Vitamin K Antagonists Presenting With Major Bleeding: A Randomized, Plasma-Controlled, Phase IIIb Study',
            journal: 'Circulation',
            year: 2013,
            doi: '10.1161/CIRCULATIONAHA.113.002283',
            note: '4F-PCC’nin TDP’ye kıyasla 30 dakikada çok daha hızlı INR düzeltmesi (%62 vs %10) ve daha az sıvı yükü sağladığını gösteren randomize faz IIIb çalışma.',
          },
          {
            authors: 'Vahanian A, Beyersdorf F, Praz F, et al. (ESC/EACTS Scientific Document Group)',
            title: '2021 ESC/EACTS Guidelines for the management of valvular heart disease',
            journal: 'Eur Heart J',
            year: 2022,
            doi: '10.1093/eurheartj/ehab395',
            note: 'Mekanik aort (2,0–3,0) ve mekanik mitral/yüksek riskli kapak (2,5–3,5) hedef INR standartları.',
          },
          {
            authors: 'Holbrook A, Schulman S, Witt DM, et al.',
            title: 'Evidence-Based Management of Anticoagulant Therapy: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed (ACCP)',
            journal: 'Chest',
            year: 2012,
            doi: '10.1378/chest.11-2295',
            note: 'Kanamasız supraterapötik INR (4,5–10 vs >10) yönetimi, oral K1 vitamini ve rutin başlangıç dozu kılavuzu.',
          },
          {
            authors: 'Kietaibl S, Ferrandis R, Godier A, et al.',
            title: 'Regional anaesthesia in patients on antithrombotic drugs: Joint ESAIC/ESRA guidelines',
            journal: 'Eur J Anaesthesiol',
            year: 2022,
            doi: '10.1097/EJA.0000000000001600',
            note: 'Varfarin için nöraksiyel blok öncesi 4–5 gün kesme, INR ≤1,4 doğrulaması ve kateter çekim kuralları.',
          },
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Reg Anesth Pain Med',
            year: 2018,
            doi: '10.1097/AAP.0000000000000763',
            note: 'Kalıcı epidural kateterin INR <1,5 iken çekilmesi ve INR 1,5–3,0 aralığında nörolojik izlem kılavuzu.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/warfarin.html"
        medscapeUrl="https://reference.medscape.com/drug/coumadin-jantoven-warfarin-342182"
      />
    </div>
  );
};
