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

type CalcTab = 'adult_dosing' | 'washout_pk' | 'safety_audit' | 'or_compare';
type TenoxicamIndication = 'periop_single' | 'postop_severe' | 'chronic_arthritis' | 'acute_gout' | 'dysmenorrhea';
type TenoxicamRoute = 'iv_bolus' | 'im_deep' | 'po_tablet';

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
    sublabel: 'FDA / EMA Kutu Uyarısı: MUTLAK KONTRENDİKE (MI, inme & greft trombozu)!',
    severity: 'contraindicated',
  },
  {
    id: 'preg_lact',
    label: 'Gebelik ≥20. Hafta (Özellikle 3. Trimester) veya Emzirme',
    sublabel: '3. trimesterde fetal duktus kapanması (MUTLAK YASAK) · ~72 sa t½ nedeniyle emzirmede KAÇIN!',
    severity: 'contraindicated',
  },
  {
    id: 'egfr_30_aki',
    label: 'ABH (AKI), Ağır KBY (eGFR <30), Hipovolemi veya Şok',
    sublabel: '~72 sa süren renal PG blokajı → geri dönüşsüz ABH, hiperkalemi (Diyalizlenmez)!',
    severity: 'contraindicated',
  },
  {
    id: 'gi_ulcer_cirrhosis',
    label: 'Aktif Peptik Ülser / GİS Kanama veya Child-Pugh B–C Siroz / NYHA III–IV KKY',
    sublabel: 'Oksikam sınıfı yüksek üst GİS kanama & Hepatorenal Sendrom (HRS) riski!',
    severity: 'contraindicated',
  },
  {
    id: 'aerd_scar',
    label: 'NSAİİ/Aspirin Astımı (AERD), Anafilaksi veya Geçmiş Oksikam SJS/TEN',
    sublabel: 'Şiddetli bronkospazm veya ölümcül kutanöz reaksiyon — MUTLAK KONTRENDİKE!',
    severity: 'contraindicated',
  },
  {
    id: 'dual_nsaid',
    label: 'Eşzamanlı Başka Bir Sistemik NSAİİ (İbuprofen, Diklofenak, Deksketoprofen vb.)',
    sublabel: 'ÇİFT NSAİİ YASAK — ek analjezi yok, GİS kanama & ABH riski katlanır!',
    severity: 'contraindicated',
  },
  {
    id: 'pediatric_under18',
    label: 'Pediatrik Hasta (<18 Yaş)',
    sublabel: 'Güvenlik verisi yetersiz & ultra-uzun t½ → <18 yaşta ÖNERİLMEZ (Parasetamol/İbuprofen seç)!',
    severity: 'contraindicated',
  },
  {
    id: 'age_65_beers',
    label: 'Yaş >65–75 (AGS Beers 2023 Uzun Yarı Ömürlü Oksikam Uyarısı)',
    sublabel: 'Uzun t½ (~72 sa) nedeniyle yaşlıda kronik kullanım YASAK; zorunluysa tek doz + PPI!',
    severity: 'high',
  },
  {
    id: 'ace_arb',
    label: 'ACE İnhibitörü (Ramipril vb.) veya ARB (Valsartan/Losartan vb.)',
    sublabel: 'Diüretik ile birleşirse günlerce süren "TRIPLE WHAMMY" akut böbrek hasarı!',
    severity: 'high',
  },
  {
    id: 'diuretic',
    label: 'Loop / Tiyazid Diüretik (Furosemid, Hidroklorotiyazid vb.)',
    sublabel: 'Diüretik direnci + ACEİ/ARB ile "Triple Whammy" ABH!',
    severity: 'high',
  },
  {
    id: 'anticoag_ssri_steroid',
    label: 'Antikoagülan (Varfarin/DOAC/LMWH), Antiplatelet, SSRI veya Sistemik Steroid',
    sublabel: 'CYP2C9 & >%99 albumin etkileşimi + 3–6× GİS kanama riski → PPI (Pantoprazol) ZORUNLU!',
    severity: 'high',
  },
  {
    id: 'lithium_mtx',
    label: 'Lityum veya Metotreksat (MTX) Kullanımı',
    sublabel: 'Renal klirens blokajı → Lityum nörotoksisitesi & MTX pansitopenisi!',
    severity: 'moderate',
  },
];

export const TenoxicamProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('adult_dosing');

  // Tab 1: Erişkin Doz & Sulandırma
  const [indication, setIndication] = useState<TenoxicamIndication>('periop_single');
  const [route, setRoute] = useState<TenoxicamRoute>('iv_bolus');
  const [adultWeightKg, setAdultWeightKg] = useState<number>(75);

  // Tab 2: 72 Saat Yarı Ömür & Washout Simülatörü
  const [consecutiveDays, setConsecutiveDays] = useState<number>(1);
  const [dailyDoseMg, setDailyDoseMg] = useState<number>(20);
  const [slowMetabolizer, setSlowMetabolizer] = useState<boolean>(false);

  // Tab 3: Güvenlik & PPI Denetleyici
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  // Akordeon
  const [showAdmeDetails, setShowAdmeDetails] = useState<boolean>(false);

  const uniqueId = useId();
  const basePanel = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  const quickNavItems = [
    { id: 'tnx-high-alert', label: 'Yüksek Uyarı' },
    { id: 'tnx-moa', label: 'Etki & 72sa PK' },
    { id: 'tnx-contra', label: 'Kontrendikasyonlar' },
    { id: 'tnx-indications', label: 'Endikasyonlar' },
    { id: 'tnx-calc', label: 'Hesaplayıcı & Washout' },
    { id: 'tnx-tr', label: 'TR Formlar' },
    { id: 'tnx-compat', label: 'Sulandırma & Uyum' },
    { id: 'tnx-organ', label: 'Organ Yetmezliği' },
    { id: 'tnx-special', label: 'Geriatri & Obezite' },
    { id: 'tnx-preg', label: 'Gebelik & Laktasyon' },
    { id: 'tnx-adr', label: 'Yan Etkiler' },
    { id: 'tnx-cautions', label: 'Klinik Dikkat' },
    { id: 'tnx-pd', label: 'Derin Farmakodinami' },
    { id: 'tnx-refs', label: 'Etkileşim & Kaynak' },
  ];

  // --- TAB 1 ENDİKASYON METADATASI ---
  const indicationMeta: Record<
    TenoxicamIndication,
    {
      label: string;
      doseLabel: string;
      singleMg: number;
      maxDaysNote: string;
      guidance: string;
      allowIv: boolean;
    }
  > = {
    periop_single: {
      label: 'Perioperatif Multimodal Analjezi (Ameliyathane)',
      doseLabel: '20 mg Tek Doz (q24sa)',
      singleMg: 20,
      maxDaysNote: 'IV/IM maks 1–2 gün; sonrasında PO 20 mg/gün veya kes',
      guidance:
        'Türkiye ameliyathanelerinde standart uygulama: İndüksiyon sonrası veya cerrahi kapanış öncesi 20 mg IV (2 mL enjeksiyonluk su ile sulandırılıp ≥15–30 sn yavaş IV bolus). ~72 saatlik yarı ömrü sayesinde 24 saat boyunca stabil bazal analjezi sağlar; Parasetamol ile sinerjik kombine edilebilir. ASLA günde 2–3 kez tekrarlama!',
      allowIv: true,
    },
    postop_severe: {
      label: 'Şiddetli Postoperatif Ağrı (SmPC Üst Sınır)',
      doseLabel: '20 mg q24sa (İstisnai Maks 40 mg × ≤5 gün)',
      singleMg: 40,
      maxDaysNote: '40 mg/gün yalnızca genç/sağlıklı olguda ≤5 gün! (Rutin 20 mg tercih)',
      guidance:
        'SmPC’de postoperatif şiddetli ağrıda en fazla 5 gün süreyle günde tek doz 40 mg’a izin verilse de, güncel ERAS/multimodal anestezi pratiğinde GİS/renal güvenliği korumak için 20 mg q24sa + Parasetamol + rejyonal blok tercih edilir.',
      allowIv: true,
    },
    chronic_arthritis: {
      label: 'Osteoartrit · RA · Ankilozan Spondilit · Tendinit',
      doseLabel: '20 mg Günde 1 Kez (q24sa)',
      singleMg: 20,
      maxDaysNote: 'En kısa süre; kararlı durum 10–15 günde oturur',
      guidance:
        'Günde tek doz 20 mg PO (her gün aynı saatte, tok karnına + riskli hastada PPI ile). Uzun yarı ömrü (~72 sa) nedeniyle tam antiinflamatuar kararlı durum 10–15 günde oluşur — ilk günlerde etkisiz sanıp dozu 40 mg’a ÇIKARMAYIN!',
      allowIv: false,
    },
    acute_gout: {
      label: 'Akut Gut Artriti Atağı',
      doseLabel: '40 mg q24sa × 2 gün → 20 mg q24sa × 5 gün',
      singleMg: 40,
      maxDaysNote: 'Toplam 7 günlük kür; KBY / ABH’de KULLANMA (Kolşisin/Steroid seç!)',
      guidance:
        'İlk 2 gün günde tek doz 40 mg PO, ardından 5 gün boyunca 20 mg PO. Gut hastalarında eşlik eden KBY, hipertansiyon ve diüretik kullanımı çok sıktır — eGFR <60 veya Triple Whammy varsa NSAİİ yerine kısa süreli kortikosteroid veya düşük doz kolşisin seçin!',
      allowIv: false,
    },
    dysmenorrhea: {
      label: 'Primer Dismenore',
      doseLabel: '20–40 mg Günde 1 Kez PO (≤2–3 gün)',
      singleMg: 20,
      maxDaysNote: 'Menstrüasyon başlangıcında en kısa süre',
      guidance:
        'Günde tek doz 20 mg (gerekirse ilk gün 40 mg) PO, tok karnına. Gebelik olasılığı mutlaka dışlanmalıdır!',
      allowIv: false,
    },
  };

  const activeInd = indicationMeta[indication];
  const effectiveRoute: TenoxicamRoute = !activeInd.allowIv && route !== 'po_tablet' ? 'po_tablet' : route;

  // --- TAB 2 WASHOUT / BİRİKİM HESAPLAMALARI ---
  // Effective half-life: ~72 h (3 days) standard, ~105 h (~4.4 days) in CYP2C9 PM / frail elderly
  const halfLifeHours = slowMetabolizer ? 105 : 72;
  const halfLifeDays = halfLifeHours / 24;
  // Geometric accumulation factor for q24h dosing after N consecutive days: (1 - r^N) / (1 - r) where r = 0.5^(24/tHalf)
  const decayPerDay = Math.pow(0.5, 24 / halfLifeHours);
  const accumulationFactor = Number(((1 - Math.pow(decayPerDay, consecutiveDays)) / (1 - decayPerDay)).toFixed(2));
  const steadyStateFactor = Number((1 / (1 - decayPerDay)).toFixed(2));
  const pctOfSteadyState = Math.min(100, Math.round((accumulationFactor / steadyStateFactor) * 100));
  const daysToBelow10Pct = Math.ceil(halfLifeDays * 3.32); // 0.5^3.32 ≈ 10%
  const daysToFullWashout = Math.ceil(halfLifeDays * 5); // 5 half-lives (~97% cleared)
  const peakEquivalentMg = Math.round(dailyDoseMg * accumulationFactor);

  // --- TAB 3 GÜVENLİK DENETİMİ ---
  const hasContraindicated = selectedRisks.some(
    (id) => SAFETY_FACTORS.find((f) => f.id === id)?.severity === 'contraindicated'
  );
  const hasHighRisk = selectedRisks.some(
    (id) => SAFETY_FACTORS.find((f) => f.id === id)?.severity === 'high'
  );
  const hasTripleWhammy = selectedRisks.includes('ace_arb') && selectedRisks.includes('diuretic');
  const needsPpi =
    selectedRisks.includes('age_65_beers') ||
    selectedRisks.includes('anticoag_ssri_steroid') ||
    selectedRisks.includes('gi_ulcer_cirrhosis');
  const hasLithiumMtx = selectedRisks.includes('lithium_mtx');

  const toggleRisk = (id: string) => {
    setSelectedRisks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- KOPYALANABİLİR ORDER METNİ ---
  const buildOrderText = () => {
    if (activeTab === 'adult_dosing') {
      if (effectiveRoute === 'iv_bolus') {
        return `TENOKSİKAM IV ORDER (${activeInd.label}): ${activeInd.singleMg} mg IV (Oksamen-L® / Tilcotil® 20 mg flakon + 2 mL steril enjeksiyonluk su = 10 mg/mL; sulandırıldıktan sonra HEMEN ≥15–30 sn yavaş IV bolus!). GÜNDE YALNIZCA 1 KEZ (q24sa)! Başka NSAİİ ile kombine ETME, sürekli infüzyon YAPMA!`;
      }
      if (effectiveRoute === 'im_deep') {
        return `TENOKSİKAM IM ORDER (${activeInd.label}): ${activeInd.singleMg} mg derin intragluteal IM (20 mg flakon + 2 mL WFI, sulandırıldıktan sonra hemen uygula; koagülopatide/antikoagülan alanda IM YAPMA!). Günde 1 kez (q24sa), maks 1–2 gün parenteral.`;
      }
      return `TENOKSİKAM PO ORDER (${activeInd.label}): ${activeInd.doseLabel} PO, tok karnına, her gün aynı saatte (${activeInd.maxDaysNote}). Riskli hastada Pantoprazol 40 mg/gün ekle!`;
    }
    if (activeTab === 'washout_pk') {
      return `TENOKSİKAM PK / WASHOUT DEĞERLENDİRMESİ (${consecutiveDays} gün × ${dailyDoseMg} mg/gün · tahmini t½ ~${halfLifeHours} sa): Birikim katsayısı ${accumulationFactor}× (kararlı durumun %${pctOfSteadyState}’i), plazmadan <%10 düzeyine iniş ~${daysToBelow10Pct} gün, tam eliminasyon (~5×t½) ~${daysToFullWashout} gün!`;
    }
    if (activeTab === 'safety_audit') {
      return hasContraindicated
        ? `TENOKSİKAM GÜVENLİK DENETİMİ: MUTLAK KONTRENDİKASYON MEVCUT — Tenoksikam KULLANMA! (Alternatif: Parasetamol / rejyonel blok / kısa etkili güvenli seçenek)`
        : `TENOKSİKAM GÜVENLİK DENETİMİ: ${hasTripleWhammy ? 'TRIPLE WHAMMY ALARMI — NSAİİ’den KAÇIN! ' : ''}${needsPpi ? 'PPI (Pantoprazol 40 mg/gün) ZORUNLU! ' : ''}${hasLithiumMtx ? 'Lityum/MTX düzey & hemogram izlemi şart! ' : ''}Tek doz 20 mg q24sa sınırına uy (~72 sa t½).`;
    }
    return `PERİOPERATİF NON-OPİOİD SEÇİMİ: Tenoksikam 20 mg q24sa IV (uzun t½ ~72 sa, tek doz bazal analjezi; yaşlı/KBY/GİS riskinde kaçın) | Parasetamol 1 g q6sa (böbrek/gebelik/GİS 1. tercih) | İbuprofen 400 mg q6sa (kısa t½ ~2 sa, emzirmede güvenli) | Metamizol 1 g yavaş IV (spazmolitik/kolik, düşük GİS).`;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 1. HIZLI GEZİNME ÇUBUĞU */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. YÜKSEK UYARI & GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="tnx-high-alert"
        defaultOpen={false}
        tallManName="TENOKSIKAM (Oksikam NSAİİ · ULTRA-UZUN t½ ~72 SAAT · q24sa!)"
        confusionRiskWith="Oksamen-L® / Tilcotil® 20 mg Flakon (ASLA q8/q12sa Verme!) · Diğer NSAİİ’lerle Çift Doz"
        criticalAlerts={[
          'ULTRA-UZUN YARI ÖMÜR (~72 SAAT = ~3 GÜN) & TEK DOZ (q24sa) KURALI: İbuprofenden (~2 sa) 35 kat daha uzun yarı ömürlüdür! Günde YALNIZCA 1 KEZ (20 mg q24sa) verilir; ASLA q8sa veya q12sa tekrarlanmaz! GİS kanaması, ABH veya alerji geliştiğinde ilaç kandan ~10–15 günde temizlenir ve >%99 albumin bağlı olduğu için HEMODİYALİZLE TEMİZLENMEZ!',
          'OKSİKAM SINIFI YÜKSEK ÜST GİS KANAMA & SJS/TEN (SCAR) RİSKİ: Oksikamlar (piroksikam/tenoksikam) uzun süreli kullanımda NSAİİ’ler arasında üst GİS ülser/perforasyon ve ağır deri reaksiyonu (SJS/TEN) riski en yüksek gruplardandır — yaş >65 (AGS Beers 2023) hastalarda kronik kullanımdan KESİNLİKLE KAÇININ; zorunluysa mutlaka Pantoprazol 40 mg/gün ekleyin!',
          'KABG (CABG) · GEBELİK ≥20/30 HF · EMZİRME & TRIPLE WHAMMY: Koroner bypass (KABG) perioperatif dönemde ve gebeliğin 3. trimesterinde MUTLAK KONTRENDİKEDİR! ~72 sa yarı ömrü nedeniyle emzirme döneminde (İbuprofen/Parasetamol varken) kullanılmaz! ACEİ/ARB + Diüretik ile günlerce süren "Triple Whammy" ABH tetikler!',
          'SULANDIRMA & SÜREKLİ İNFÜZYON YASAĞI (Oksamen-L® / Tilcotil® 20 mg): 20 mg sarı liyofilize toz yalnızca kutudaki 2 mL steril enjeksiyonluk su ile çözülür (10 mg/mL) ve HEMEN yavaş IV bolus (≥15–30 sn) veya derin IM uygulanır — sürekli IV infüzyon YAPILMAZ ve başka ilaçlarla aynı enjektörde KARIŞTIRILMAZ!',
        ]}
        antidoteOrRescue="Spesifik kimyasal antidotu yoktur. Akut aşırı dozda: (1) İlk 1–2 saatte aktif kömür; (2) >%99 albumin bağlı olduğu için HEMODİYALİZ Tenoksikamı TEMİZLEMEZ (sadece ağır ABH/asidemi/hiperkalemi desteği için uygulanır); (3) Çoklu doz aktif kömür veya Kolestiramin (4 g q8sa PO) enterohepatik dolaşımı kırarak ~72 sa yarı ömrü anlamlı kısaltabilir! (4) IV PPI (Pantoprazol) + agresif sıvı resüsitasyonu."
      />

      {/* 3. KİMLİK, ÖZET & ORDER KOPYALA KARTI */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Oksikam NSAİİ · Non-Selektif COX-1/COX-2 · Uzun Etkili (q24sa)
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Oksamen-L® · Tilcotil® · Tenoktil® 20 mg IV/IM/PO
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                t½ ~72 saat · CYP2C9 · &gt;%99 Albumin
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Tenoksikam{' '}
              <span className="text-base sm:text-lg font-semibold text-rose-600 dark:text-rose-400">
                (Oksamen-L® · Tilcotil® · Tenoktil® · Viena®)
              </span>
            </h1>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              Türkiye ameliyathanelerinde perioperatif tek doz (<strong>20 mg IV q24sa</strong>) multimodal analjezide
              ve romatolojik/kas-iskelet ağrılarında yaygın kullanılan <strong>oksikam sınıfı</strong> non-selektif
              NSAİİ’dir. En ayırt edici özelliği <strong>~72 saatlik (60–75 sa) ultra-uzun eliminasyon yarı ömrüdür</strong>:
              bu özellik günde tek dozla 24 saat boyunca kesintisiz bazal analjezi sağlarken, olası bir{' '}
              <strong>GİS kanaması, akut böbrek hasarı (ABH), hipertansiyon veya deri reaksiyonunda (SJS/TEN)</strong>{' '}
              ilacın vücuttan günlerce temizlenememesi (ve diyalizlenememesi) nedeniyle dikkatli hasta seçimi gerektirir.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
            <MonographCopyButton
              isDark={isDark}
              getText={buildOrderText}
              label="Aktif Hesap Order’ını Kopyala"
            />
            <span className={`text-[11px] ${mutedText}`}>
              ATC: M01AC02 · PO Biyoyararlanım ~%100 · &lt;18 Yaş Önerilmez
            </span>
          </div>
        </div>

        {/* Hızlı Özet Kutu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Standart Erişkin (IV / PO)
            </div>
            <div className="text-base font-black text-teal-800 dark:text-teal-200 mt-0.5">
              20 mg Günde 1 Kez
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              q24sa! IV/IM maks 1–2 gün (≥15–30 sn bolus)
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Ultra-Uzun Yarı Ömür
            </div>
            <div className="text-base font-black text-rose-800 dark:text-rose-200 mt-0.5">
              t½ ≈ 72 Saat (~3 Gün)
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Kararlı durum 10–15 gün · Diyalizlenmez!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Akut Gut / Postop İstisna
            </div>
            <div className="text-base font-black text-indigo-800 dark:text-indigo-200 mt-0.5">
              40 mg × 2g → 20 mg × 5g
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Rutin ağrıda 20 mg üzerine çıkma!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Kırmızı Çizgiler
            </div>
            <div className="text-base font-black text-amber-800 dark:text-amber-200 mt-0.5">
              &gt;65y · KBY · CABG · &lt;18y
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Emzirme & 3. Trimester & Çift NSAİİ YASAK
            </div>
          </div>
        </div>
      </div>

      {/* 4. ETKİ MEKANİZMASI & 72 SAAT ADME AKORDEONU */}
      <div className="space-y-4">
        <MechanismOfActionBlock
          isDark={isDark}
          sectionId="tnx-moa"
          sectionTitle="Etki Mekanizması: Non-Selektif COX-1/COX-2 Blokajı & Sinovyal/Doku Birikimi"
          summary="Tenoksikam, enolik asit (oksikam) yapılı güçlü bir non-selektif siklooksijenaz (COX-1 ve COX-2) inhibitörüdür. Araşidonik asitten proinflamatuar prostaglandinlerin (PGE₂, PGI₂) sentezini geri dönüşlü olarak baskılar, inflamasyon bölgesinde lökosit kemotaksisi ve proteoglikan/kolajen yıkımını azaltır."
          pillars={[
            {
              title: '1. Periferik COX-2 İnhibisyonu → 24 Saat Sürekli Analjezi & Antiinflamasyon',
              detail:
                'Cerrahi doku travması veya eklem sinovyasında PGE₂ sentezini düşürerek periferik nosiseptör duyarlılaşmasını (sensitizasyon) ve ödemi bastırır. ~72 saatlik yarı ömrü sayesinde tek bir 20 mg IV/PO doz 24 saat boyunca kesintisiz etki sağlar.',
            },
            {
              title: '2. İnflamasyon / Sinovyal Sıvı Penetrasyonu',
              detail:
                'Zayıf asit (pKa ~5,3) ve >%99 albumin bağlı yapısıyla asidik pH’lı cerrahi travma dokusunda ve inflamatuar eklem sinovyasında (plazma düzeyinin ~%50’sine ulaşarak) etkin konsantrasyon oluşturur.',
            },
            {
              title: '3. Uzamış Geri Dönüşlü COX-1 Blokajı → GİS, Renal & Trombosit Bedeli',
              detail:
                'Trombosit TXA₂, gastrik mukozal PGE₂ ve renal afferent arteriyol PG sentezini de inhibe eder. Yarı ömrü ~72 saat olduğundan bu sınıf etkileri İbuprofene (~2 sa) kıyasla günlerce daha uzun sürer!',
            },
          ]}
        />

        {/* Genişletilebilir ADME Detayları */}
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
                Detaylı Farmakokinetik (ADME): ~%100 Oral Biyoyararlanım, CYP2C9 Polimorfizmi & ~72 Saat Yarı Ömür
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
                  A — Absorpsiyon (~%100 Biyoyararlanım)
                </div>
                Oral emilimi tamdır (<strong>~%99–100</strong>; ilk geçiş etkisi neredeyse sıfırdır). Aç karnına pik
                plazma düzeyi <strong>1–2 saat</strong>, tok karnına 4–6 saatte ulaşır (toplam AUC değişmez). Bu nedenle
                oral alabilen hastada parenteral IV/IM forma geçişe veya uzatmaya gerek yoktur!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  D — Dağılım (&gt;%99 Albumin · Küçük Vd)
                </div>
                Plazma albuminine <strong>&gt;%99</strong> oranında bağlanır; dağılım hacmi küçüktür (<strong>~0,15 L/kg</strong>).
                Kritik hastada hipoalbuminemi (&lt;2,5 g/dL) serbest aktif fraksiyonu yükseltir ve <strong>hemodiyaliz/CRRT ile temizlenemez</strong>.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  M — Hepatik CYP2C9 Metabolizması (Yavaş Metabolizör Riski!)
                </div>
                Karaciğerde neredeyse tamamen <strong>CYP2C9</strong> ile inaktif <strong>5’-hidroksitenoksikam</strong>{' '}
                ve glukuronid konjugatlarına metabolize olur. <strong>CYP2C9*3/*3</strong> yavaş metabolizörlerde
                eliminasyon yarı ömrü &gt;100 saate çıkarak ciddi GİS kanama riski doğurur!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                  E — Eliminasyon (t½ ≈ 60–75 sa · Kararlı Durum 10–15 Gün!)
                </div>
                İnaktif metabolitlerin ~2/3’ü idrarla, ~1/3’ü safra/feçesle atılır (&lt;%1 değişmemiş ilaç). Çoklu
                günlük kullanımda kararlı durum konsantrasyonu tek dozun ~4–5 katına çıkar (~10–15 günde) ve ilaç
                kesildikten sonra tam temizlenmesi ~2 hafta sürer!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE!) */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="tnx-contra"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Koroner Arter Bypass Greft (KABG / CABG) Cerrahisinin Perioperatif Dönemi (MI, inme ve greft oklüzyonu riski!).',
          'Aktif peptik ülser, aktif GİS kanaması veya geçmişte NSAİİ ilişkili tekrarlayan GİS kanama/perforasyon öyküsü.',
          'Tenoksikam, diğer oksikamlar (piroksikam/meloksikam/lornoksikam), Aspirin veya NSAİİ’lerle tetiklenen astım (AERD), ürtiker, anjiyoödem veya SJS/TEN öyküsü.',
          'Gebeliğin 3. trimesteri (≥28–30. hafta — fetal duktus arteriozus kapanması & oligohidramnioz; ≥20. haftadan itibaren kaçınılır!).',
          'Ağır böbrek yetmezliği (eGFR <30 mL/dk), Akut Böbrek Hasarı (ABH), Dekompanse Kalp Yetmezliği (NYHA III–IV) ve Ağır Karaciğer Yetmezliği / Child-Pugh B–C Siroz.',
          'Eşzamanlı başka bir sistemik NSAİİ (İbuprofen, Diklofenak, Deksketoprofen, Ketorolak vb.) kullanımı — ÇİFT NSAİİ YASAK!',
          'Pediatrik popülasyon (<18 yaş): Güvenlik/etkinlik verisi yetersiz ve ~72 sa yarı ömrü nedeniyle rutin pediatrik kullanımda ÖNERİLMEZ / KONTRENDİKEDİR.',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Yüksek Dikkat Durumları"
        relativeItems={[
          'Yaş >65–75 (AGS Beers 2023): Uzun yarı ömürlü oksikamlar yaşlılarda yüksek GİS kanama ve ABH riski nedeniyle kronik kullanımda KAÇINILMALIDIR!',
          'Emzirme Dönemi: Küçük miktarlarda anne sütüne geçse de ~72 saatlik yarı ömrüyle yenidoğanda birikme riski nedeniyle kullanılmamalıdır (emzirende İbuprofen veya Parasetamol seçin!).',
          'Orta KBY (eGFR 30–59 mL/dk), Hipovolemi, Sepsis veya "Triple Whammy" (ACEİ/ARB + Diüretik + NSAİİ): Günlerce süren ABH riski — Parasetamol tercih edin.',
          'Antikoagülan (Varfarin/DOAC/LMWH), Antiplatelet (Aspirin/Klopidogrel), SSRI veya Sistemik Steroid kullananlar: GİS kanaması 3–6× artar → zorunluysa mutlaka PPI (Pantoprazol 40 mg/gün) ekleyin.',
          'Lityum, Metotreksat (MTX), Siklosporin/Takrolimus veya CYP2C9 inhibitörleri (Flukonazol, Amiodaron) kullanan hastalar.',
          'Yüksek kanama riskli cerrahiler (kraniyotomi, spinal, aktif koagülopati) veya koagülopatide IM enjeksiyon (hematom riski!).',
        ]}
        clinicalNote="ASRA 2018 Nöraksiyel Kılavuzu: Tek başına NSAİİ’ler (oksikamlar dahil) spinal/epidural blok için mutlak kesme süresi gerektirmez; ancak Tenoksikamın ~72 saatlik yarı ömrü nedeniyle trombosit COX-1 üzerindeki geri dönüşlü etkisi kısa etkili NSAİİ’lerden çok daha uzun sürer — eşzamanlı antikoagülan/antiplatelet varsa dikkatle değerlendirin!"
      />

      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ */}
      <div id="tnx-indications" className="scroll-mt-24">
        <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
          <div className="flex items-center gap-2.5 mb-4">
            <BookOpen className="w-5 h-5 text-teal-500 shrink-0" />
            <div>
              <h2 className="text-lg font-black tracking-tight">
                Klinik Endikasyonlar & Kanıta Dayalı Doz Rejimleri (q24sa Kuralı)
              </h2>
              <p className={`text-xs ${mutedText}`}>
                En düşük etkin doz, en kısa süre ve parenteral (IV/IM) uygulamanın ≤1–2 günle sınırlandırılması esastır
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs leading-relaxed">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-teal-700 dark:text-teal-300">
                  1. Perioperatif Multimodal Analjezi (Ameliyathane)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  20 mg IV Tek Doz
                </span>
              </div>
              <p className={mutedText}>
                Övolemik, normal böbrek fonksiyonlu (eGFR ≥60) ve GİS/CABG riski olmayan erişkin cerrahi hastasında{' '}
                <strong>20 mg IV yavaş bolus</strong> (indüksiyon sonrası veya kapanış öncesi) 24 saatlik güçlü bazal
                antiinflamatuar/analjezik koruma sağlar ve opioid gereksinimini azaltır. <strong>Parasetamol 1 g IV</strong>{' '}
                ile güvenle kombine edilir; ancak <strong>İbuprofen/Diklofenak/Deksketoprofen ile ASLA birleştirilmez</strong>!
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-indigo-700 dark:text-indigo-300">
                  2. Osteoartrit · Romatoid Artrit · Ankilozan Spondilit
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  20 mg q24sa PO
                </span>
              </div>
              <p className={mutedText}>
                Günde tek doz <strong>20 mg PO</strong> (tok karnına, her gün aynı saatte). Tam antiinflamatuar kararlı
                durumun ~10–15 günde oluştuğu bilinmeli, erken dönemde 40 mg’a çıkılmamalıdır. Uzun süreli idamede
                mümkünse <strong>10 mg/gün</strong>’e inilmesi veya daha kısa yarı ömürlü/GİS-güvenli alternatiflere
                geçilmesi değerlendirilir.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-rose-700 dark:text-rose-300">
                  3. Akut Gut Artriti & Yumuşak Doku İnflamasyonu
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  40 mg ×2g → 20 mg ×5g
                </span>
              </div>
              <p className={mutedText}>
                <strong>Akut Gut:</strong> İlk 2 gün <strong>40 mg q24sa PO</strong>, ardından 5 gün{' '}
                <strong>20 mg q24sa PO</strong> (toplam 7 gün; KBY/yaşlı gut hastasında NSAİİ yerine steroid/kolşisin!).{' '}
                <strong>Tendinit / Bursit / Periartrit / Burkulma:</strong> <strong>20 mg q24sa PO</strong> (en fazla
                7–14 gün).
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-amber-700 dark:text-amber-300">
                  4. Primer Dismenore & Parenteral (IV/IM) Süre Sınırı
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  IV/IM ≤1–2 Gün
                </span>
              </div>
              <p className={mutedText}>
                <strong>Dismenore:</strong> 20–40 mg q24sa PO (2–3 gün).{' '}
                <strong>Parenteral Kural:</strong> Oral biyoyararlanım ~%100 olduğundan IV/IM flakon yalnızca oral
                alımın mümkün olmadığı başlangıç döneminde (<strong>1–2 gün</strong>) kullanılır; hasta ağızdan
                alabilir hale gelir gelmez PO tablete geçilir veya tedavi sonlandırılır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI */}
      <div id="tnx-calc" className="scroll-mt-24">
        <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Syringe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight">
                  Tenoksikam Doz, 72sa Washout & Perioperatif Karar Hesaplayıcısı
                </h2>
                <p className={`text-xs ${mutedText}`}>
                  Oksamen-L® / Tilcotil® 20 mg sulandırma, ~72 sa yarı ömür birikim simülatörü, Triple Whammy & OR karşılaştırma
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
              { id: 'adult_dosing' as CalcTab, label: '1. Erişkin IV / PO', icon: Syringe },
              { id: 'washout_pk' as CalcTab, label: '2. 72sa Birikim & Washout', icon: Clock },
              { id: 'safety_audit' as CalcTab, label: '3. Güvenlik & PPI', icon: ShieldAlert },
              { id: 'or_compare' as CalcTab, label: '4. OR Analjezik Kıyas', icon: Scale },
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

          {/* TAB 1: ERİŞKİN DOZ & SULANDIRMA */}
          {activeTab === 'adult_dosing' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Klinik Endikasyon</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(Object.keys(indicationMeta) as TenoxicamIndication[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setIndication(key);
                          if (!indicationMeta[key].allowIv) setRoute('po_tablet');
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                          indication === key
                            ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {indicationMeta[key].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">Uygulama Yolu</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'iv_bolus' as TenoxicamRoute, label: 'IV Bolus (Flakon)', disabled: !activeInd.allowIv },
                      { id: 'im_deep' as TenoxicamRoute, label: 'Derin IM (Flakon)', disabled: !activeInd.allowIv },
                      { id: 'po_tablet' as TenoxicamRoute, label: 'PO Tablet (20 mg)', disabled: false },
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        disabled={r.disabled}
                        onClick={() => setRoute(r.id)}
                        className={`px-2.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                          r.disabled
                            ? 'opacity-40 cursor-not-allowed'
                            : effectiveRoute === r.id
                              ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200'
                              : isDark
                                ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                  {!activeInd.allowIv && (
                    <p className={`text-[11px] mt-1 ${mutedText}`}>
                      Bu endikasyonda oral biyoyararlanım ~%100 olduğu için PO tablet standarttır.
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs">
                  <div className="font-black text-amber-800 dark:text-amber-200 flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Pediatri (&lt;18 Yaş) &amp; Tekrar Doz Kilidi
                  </div>
                  <p>
                    Tenoksikam <strong>18 yaş altında önerilmez</strong> (Parasetamol veya ≥6 ay İbuprofen kullanın).
                    Erişkinde ise ~72 sa yarı ömrü nedeniyle <strong>ASLA q8sa / q12sa order edilmez</strong> — daima{' '}
                    <strong>q24sa (günde 1 kez)</strong>!
                  </p>
                </div>
              </div>

              {/* Sonuç Kartı */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Hesaplanan Erişkin Order
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                    q24sa (Günde 1 Kez)
                  </span>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-[10px] font-bold uppercase opacity-70">Doz &amp; Süre</div>
                  <div className="text-lg font-black text-rose-600 dark:text-rose-400 mt-0.5">
                    {activeInd.doseLabel}
                  </div>
                  <div className="text-[11px] opacity-80 mt-0.5">{activeInd.maxDaysNote}</div>
                </div>

                {effectiveRoute === 'iv_bolus' && (
                  <div className="p-3.5 rounded-xl border bg-indigo-500/10 border-indigo-500/30 text-xs space-y-1">
                    <div className="font-black text-indigo-800 dark:text-indigo-200">
                      TR Flakon Hazırlama (Oksamen-L® / Tilcotil® 20 mg):
                    </div>
                    <p>
                      {activeInd.singleMg === 40 ? '2 flakon (40 mg)' : '1 flakon (20 mg)'} sarı liyofilize toz +{' '}
                      {activeInd.singleMg === 40 ? '4 mL' : '2 mL'} kutu içi steril enjeksiyonluk su →{' '}
                      <strong>10 mg/mL berrak sarı çözelti</strong>. Hazırlanır hazırlanmaz{' '}
                      <strong>≥15–30 saniyede yavaş IV bolus</strong> yapın (sürekli infüzyon YAPMA, başka ilaçla
                      karıştırma!).
                    </p>
                  </div>
                )}

                {effectiveRoute === 'im_deep' && (
                  <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs space-y-1">
                    <div className="font-black text-amber-800 dark:text-amber-200">Derin İntragluteal IM Kuralı:</div>
                    <p>
                      20 mg flakon + 2 mL WFI ile sulandırıp <strong>derhal</strong> üst-dış kadran derin IM uygulayın.
                      Antikoagülan kullanan veya trombositopenik/koagülopatik hastada IM YAPMAYIN!
                    </p>
                  </div>
                )}

                {effectiveRoute === 'po_tablet' && (
                  <div className="p-3.5 rounded-xl border bg-teal-500/10 border-teal-500/30 text-xs space-y-1">
                    <div className="font-black text-teal-800 dark:text-teal-200">Oral Uygulama (Biyoyararlanım ~%100):</div>
                    <p>
                      20 mg tablet her gün aynı saatte, <strong>bol su ve yemekle/tok karnına</strong> alınır. Yüksek GİS
                      riskinde mutlaka <strong>Pantoprazol 40 mg/gün</strong> ekleyin.
                    </p>
                  </div>
                )}

                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="font-bold text-teal-600 dark:text-teal-400 mb-1">Klinik Rehber Notu:</div>
                  <p className={mutedText}>{activeInd.guidance}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 72 SAAT YARI ÖMÜR & WASHOUT SİMÜLATÖRÜ */}
          {activeTab === 'washout_pk' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor={`${uniqueId}-days`} className="block text-xs font-bold mb-1.5">
                    Ardışık Kullanım Süresi:{' '}
                    <span className="text-rose-600 dark:text-rose-400">{consecutiveDays} gün</span>
                  </label>
                  <input
                    id={`${uniqueId}-days`}
                    type="range"
                    min={1}
                    max={14}
                    step={1}
                    value={consecutiveDays}
                    onChange={(e) => setConsecutiveDays(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                  <div className="flex justify-between text-[10px] opacity-70">
                    <span>1 gün (Tek OR Doz)</span>
                    <span>5 gün</span>
                    <span>10–14 gün (Kararlı Durum)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">Günlük Doz (q24sa)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[20, 40].map((mg) => (
                      <button
                        key={mg}
                        type="button"
                        onClick={() => setDailyDoseMg(mg)}
                        className={`py-2 rounded-xl border text-xs font-black ${
                          dailyDoseMg === mg
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {mg} mg / gün {mg === 40 ? '(Sadece Kısa Gut/İstisna!)' : '(Standart)'}
                      </button>
                    ))}
                  </div>
                </div>

                <label
                  className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer text-xs ${
                    slowMetabolizer
                      ? 'bg-amber-500/15 border-amber-500'
                      : isDark
                        ? 'bg-slate-950/50 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={slowMetabolizer}
                    onChange={(e) => setSlowMetabolizer(e.target.checked)}
                    className="mt-0.5 accent-amber-600"
                  />
                  <div>
                    <div className="font-bold">CYP2C9 Yavaş Metabolizör / İleri Yaş / Hafif KC Bozukluğu</div>
                    <div className="text-[11px] opacity-80">
                      Eliminasyon yarı ömrü ~72 saatten ~100–110 saate uzar, birikim ve GİS/renal risk katlanır!
                    </div>
                  </div>
                </label>
              </div>

              {/* Simülasyon Çıktısı */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Birikim &amp; Plazma Temizlenme (Washout) Profili
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-bold uppercase opacity-70">Birikim Katsayısı</div>
                    <div className="text-lg font-black text-rose-600 dark:text-rose-400">
                      {accumulationFactor}× tek doz
                    </div>
                    <div className="text-[11px] opacity-75">
                      ~{peakEquivalentMg} mg eşdeğer yük (SS: %{pctOfSteadyState})
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-bold uppercase opacity-70">İlaç Kesilince Temizlenme</div>
                    <div className="text-lg font-black text-amber-600 dark:text-amber-400">
                      ~{daysToBelow10Pct}–{daysToFullWashout} gün
                    </div>
                    <div className="text-[11px] opacity-75">
                      &lt;%10: ~{daysToBelow10Pct}g · Tam (5×t½): ~{daysToFullWashout}g
                    </div>
                  </div>
                </div>

                {/* Kararlı Durum Doluluk Çubuğu */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>Kararlı Durum (Steady-State) Doluluğu</span>
                    <span>%{pctOfSteadyState}</span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 via-amber-500 to-rose-600 transition-all"
                      style={{ width: `${pctOfSteadyState}%` }}
                    />
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong>Klinik Anlamı:</strong> Tek bir 20 mg perioperatif doz (1. gün) birikim yapmadan 24 saatlik
                  analjezi sağlar. Ancak 5–14 gün üst üste alındığında plazma yükü <strong>3–5 katına</strong> çıkar —
                  olası bir GİS kanamasında veya ABH’de ilaç kesilse bile etkisi <strong>~{daysToBelow10Pct}–{daysToFullWashout} gün</strong>{' '}
                  daha sürer (diyaliz temizlemez; çoklu doz aktif kömür / kolestiramin enterohepatik döngüyü hızlandırabilir!).
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GÜVENLİK, TRIPLE WHAMMY & PPI DENETLEYİCİ */}
          {activeTab === 'safety_audit' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {SAFETY_FACTORS.map((factor) => {
                  const checked = selectedRisks.includes(factor.id);
                  const toneClass =
                    factor.severity === 'contraindicated'
                      ? 'bg-rose-500/15 border-rose-500'
                      : factor.severity === 'high'
                        ? 'bg-amber-500/15 border-amber-500'
                        : 'bg-indigo-500/15 border-indigo-500';
                  return (
                    <label
                      key={factor.id}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        checked
                          ? toneClass
                          : isDark
                            ? 'bg-slate-950/50 border-slate-800 hover:bg-slate-900'
                            : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleRisk(factor.id)}
                        className="mt-0.5 accent-rose-600"
                      />
                      <div>
                        <div className="font-bold">{factor.label}</div>
                        <div className="text-[11px] opacity-80">{factor.sublabel}</div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Karar Paneli */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                {hasContraindicated ? (
                  <div className="p-4 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100 space-y-1.5">
                    <div className="font-black text-sm flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 shrink-0" />
                      MUTLAK KONTRENDİKASYON — TENOKSİKAM KULLANMA!
                    </div>
                    <p className="text-xs leading-relaxed">
                      ~72 saatlik yarı ömrü nedeniyle yan etkiler günlerce geri çevrilemez. Alternatif olarak{' '}
                      <strong>Parasetamol</strong>, <strong>rejyonel sinir bloku</strong> veya uygun hastada kısa yarı
                      ömürlü seçenekleri değerlendirin.
                    </p>
                  </div>
                ) : hasTripleWhammy ? (
                  <div className="p-4 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100 space-y-1.5">
                    <div className="font-black text-sm flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      TRIPLE WHAMMY ALARMI (ACEİ/ARB + Diüretik + Tenoksikam)!
                    </div>
                    <p className="text-xs leading-relaxed">
                      Efferent vazodilatasyon + volüm kaybı + günlerce süren afferent vazokonstriksiyon glomerüler
                      filtrasyonu çökertir — Tenoksikamdan KESİNLİKLE KAÇININ!
                    </p>
                  </div>
                ) : hasHighRisk ? (
                  <div className="p-4 rounded-xl border-2 bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100 space-y-1.5">
                    <div className="font-black text-sm flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      YÜKSEK RİSK — KISA YARI ÖMÜRLÜ ALTERNATİF / PARASETAMOL TERCİH EDİN!
                    </div>
                    <p className="text-xs leading-relaxed">
                      Tenoksikamın ~72 saatlik yarı ömrü bu hastada yüksek risk taşır. Zorunluysa yalnızca tek doz 20 mg
                      + PPI gastroproteksiyonu + 48–72 sa Cr/K⁺ takibi yapın.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-xs space-y-1">
                    <div className="font-black text-sm text-emerald-700 dark:text-emerald-300">
                      Standart Kullanım Uygun (Normovolemik &amp; Düşük Risk)
                    </div>
                    <p>
                      20 mg günde 1 kez (q24sa) uygulanabilir; başka NSAİİ ile birleştirmeyin ve parenteral uygulamayı
                      1–2 günle sınırlayın.
                    </p>
                  </div>
                )}

                {needsPpi && !hasContraindicated && (
                  <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30 text-xs">
                    <strong>PPI Gastroproteksiyonu ZORUNLU:</strong> Oksikam sınıfı yüksek GİS kanama riski taşır —
                    mutlaka <strong>Pantoprazol 40 mg/gün</strong> ekleyin!
                  </div>
                )}

                {hasLithiumMtx && (
                  <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30 text-xs">
                    <strong>Lityum / Metotreksat Uyarısı:</strong> Renal klirensi azaltır ve ~72 sa boyunca etkilidir —
                    yüksek doz MTX ile birlikte kullanmayın; Lityum düzeyini yakın takip edin!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PERİOPERATİF ANALJEZİK KARŞILAŞTIRICI */}
          {activeTab === 'or_compare' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                    <th className="p-2.5 rounded-tl-xl font-black">Özellik</th>
                    <th className="p-2.5 font-black text-rose-600 dark:text-rose-400">Tenoksikam (20 mg)</th>
                    <th className="p-2.5 font-black">İbuprofen (400 mg)</th>
                    <th className="p-2.5 font-black">Metamizol (1 g)</th>
                    <th className="p-2.5 rounded-tr-xl font-black">Parasetamol (1 g)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-bold">Doz Aralığı &amp; t½</td>
                    <td className="p-2.5 font-bold text-rose-600 dark:text-rose-400">q24sa · t½ ~72 sa!</td>
                    <td className="p-2.5">q6–8sa · t½ ~2 sa</td>
                    <td className="p-2.5">q6–8sa · 4-MAA ~3 sa</td>
                    <td className="p-2.5">q6sa · t½ ~2–3 sa</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">IV Uygulama</td>
                    <td className="p-2.5">Yavaş IV bolus (≥15–30 sn)</td>
                    <td className="p-2.5">≤4 mg/mL · ≥30 dk inf.</td>
                    <td className="p-2.5">50–100 mL · 15–30 dk inf.</td>
                    <td className="p-2.5">100 mL hazır · ≥15 dk inf.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">GİS / Renal Risk</td>
                    <td className="p-2.5 text-rose-600 dark:text-rose-400 font-semibold">Yüksek (uzun t½!)</td>
                    <td className="p-2.5 text-amber-600 dark:text-amber-400">Orta–Yüksek (kısa t½)</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400">Düşük (Agranülositoz/KB!)</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">En Güvenli (KC tavan!)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Emzirme / Gebelik</td>
                    <td className="p-2.5 text-rose-600 dark:text-rose-400">Emzirmede &amp; 3.T YASAK</td>
                    <td className="p-2.5">Emzirmede 1. NSAİİ · 3.T YASAK</td>
                    <td className="p-2.5">Emzirmede 48sa ara · 3.T YASAK</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">Gebelik &amp; Emzirme 1. Tercih</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">En İyi OR Kullanımı</td>
                    <td className="p-2.5">Genç/sağlıklı olguda tek doz 24sa bazal antiinflamatuar</td>
                    <td className="p-2.5">Kısa kontrollü NSAİİ &amp; sezaryen postpartum</td>
                    <td className="p-2.5">Visseral ağrı, renal/biliyer kolik, GİS riski</td>
                    <td className="p-2.5">Her hastada temel multimodal omurga</td>
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
        sectionId="tnx-tr"
        preparations={[
          {
            name: 'Oksamen-L® / Tilcotil® / Tenoktil® / Viena® IV/IM Liyofilize Flakon',
            presentation: '20 mg sarı liyofilize toz flakon + 2 mL steril enjeksiyonluk su (WFI) çözücü ampul',
            concentration: 'Sulandırılınca 10 mg/mL (20 mg / 2 mL) berrak sarı çözelti',
            saltOrBaseNote:
              'Yalnızca kutudaki 2 mL WFI ile sulandırılır ve DERHAL yavaş IV bolus (≥15–30 sn) veya derin intragluteal IM uygulanır. Sürekli IV infüzyon YAPILMAZ; parenteral süre maks 1–2 günle sınırlandırılır!',
            alertLevel: 'high',
          },
          {
            name: 'Tilcotil® / Oksamen® / Tenoktil® / Tenox® Film Tablet',
            presentation: '20 mg film kaplı tablet',
            concentration: '20 mg / tablet (PO biyoyararlanım ~%100!)',
            saltOrBaseNote:
              'Günde tek doz (q24sa) tok karnına, bol su ile. Oral alabilen hastada IV/IM forma hiçbir biyoyararlanım üstünlüğü yoktur.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Standart IV Hazırlama: 20 mg sarı liyofilize flakon + kutudaki 2 mL steril enjeksiyonluk su → hafifçe çalkalayarak tamamen erit (10 mg/mL berrak sarı sıvı) → HEMEN ≥15–30 saniyede yavaş IV bolus (çalışan SF hattının portundan verip SF ile yıka).',
          'Derin IM Hazırlama: Aynı şekilde 2 mL WFI ile hazırlayıp üst-dış gluteal kadrana derin IM uygula (koagülopatide/antikoagülan alanda IM YASAK!).',
          'Sürekli İnfüzyon Yasağı: Tenoksikam sürekli IV infüzyon şeklinde uygulanmaz ve aynı enjektörde başka hiçbir ilaçla karıştırılmaz!',
        ]}
        concentrationTrapWarning={'q24sa DOZ ARALIĞI & ÇİFT NSAİİ TUZAĞI: Ameliyathanede 20 mg Tenoksikam IV yapıldığı anestezi formunda netçe işaretlenmezse, serviste aynı gün İbuprofen/Deksketoprofen/Diklofenak eklenmesi ("çift NSAİİ") veya Tenoksikamın q12sa yazılması ~72 saatlik yarı ömür nedeniyle ağır GİS kanama ve ABH’ye yol açar!'}
      />

      {/* 9. DAMAR YOLU & UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="tnx-compat"
        accessRequirement="peripheral-ok"
        accessSummary="2 mL steril enjeksiyonluk su ile sulandırıldıktan sonra periferik venöz hattan yavaş IV bolus (≥15–30 sn) olarak güvenle uygulanır; uygulama öncesi ve sonrası SF ile yıkama önerilir. Sürekli infüzyon olarak kullanılmaz."
        phRange="8,5 – 9,5 (Alkali Çözelti — Asidik İlaçlarla Çökelir!)"
        osmolalityNote="2 mL WFI ile sulandırılmış çözelti (10 mg/mL) alkali yapıdadır; çalışan bir periferik SF hattından yavaşça verilip yıkandığında lokal flebit riski minimaldir."
        compatibleDiluents={[
          'Steril Enjeksiyonluk Su (WFI — kutudaki 2 mL çözücü · ZORUNLU sulandırıcı!)',
          '%0,9 NaCl (yalnızca IV hat yıkama için)',
        ]}
        stabilityNote="Liyofilize toz sulandırıldıktan sonra koruyucu içermez ve stabilitesi sınırlıdır — hazırlandıktan sonra HEMEN tek seferde uygulanmalı, artanı atılmalıdır! Bulanık veya partiküllü çözelti kullanılmamalıdır."
        ySiteCompatible={[
          '%0,9 NaCl (hat yıkama)',
          'Alkali pH (~9) nedeniyle diğer IV ilaçlarla aynı anda Y-hat paylaşımından kaçının; SF ile yıkayıp ayrı bolus verin!',
        ]}
        ySiteIncompatible={[
          'Asidik veya katyonik enjeksiyonlar (Midazolam, Fentanil/Morfin, Ondansetron, Metoklopramid, Dobutamin, Dopamin, Noradrenalin — alkali pH ile anında çökelme/bulanıklık!)',
          'Aynı enjektörde başka herhangi bir analjezik/antipiretik/antibiyotik ile karıştırma!',
        ]}
        extravasationProtocol="Alkali pH (~9) nedeniyle paravenöz kaçışta lokal yanma, ağrı ve eritem gelişebilir. İnfüzyonu/enjeksiyonu durdurun, kateteri çıkarın, ekstremiteyi eleve edin ve soğuk kompres uygulayın."
      />

      {/* 10. ORGAN YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="tnx-organ"
        renalSummary="eGFR <30 mL/dk ve tüm ABH evrelerinde MUTLAK KONTRENDİKE! ~72 sa yarı ömrü nedeniyle eGFR 30–59’da dahi kaçının (önce Parasetamol); >%99 albumin bağlı olduğu için IHD/CRRT ile DİYALİZLENMEZ!"
        renalDetails={[
          'eGFR ≥60 (Övolemik): 20 mg q24sa güvenle kullanılır (Triple Whammy yoksa!).',
          'eGFR 30–59: Uzun yarı ömrü (~72 sa) renal PG blokajını günlerce sürdürdüğünden mümkünse kaçının; zorunluysa tek doz 20 mg + 48–72 sa Cr/K⁺ kontrolü.',
          'eGFR <30 · ABH · IHD · PD · CRRT: KESİNLİKLE KAÇININ — rezidüel renal fonksiyonu yok eder, diyalizle temizlenmez!',
        ]}
        hepaticSummary="Child-Pugh B–C dekompanse sirozda MUTLAK KONTRENDİKE! CYP2C9 klirensi çöker, hipoalbuminemide serbest ilaç fırlar ve ~72 saat boyunca Hepatorenal Sendrom (HRS) & varis kanaması tetikler."
        hepaticDetails={[
          'Child-Pugh A: Mümkünse Parasetamol (≤2–3 g/gün) seçin; Tenoksikamın ultra-uzun t½’si sirotik böbrek için gereksiz risk taşır.',
          'Child-Pugh B–C: EASL/AASLD kılavuzlarına göre tüm NSAİİ’ler kesinlikle yasaktır!',
        ]}
        {...STANDALONE_ORGAN_PART2['tenoxicam']}
      />

      {/* 11. GERİATRİ & OBEZİTE DOZ ÖLÇEKLEME */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="tnx-special"
        geriatricReductionBadge="AGS Beers 2023: >65 Yaşta Uzun t½ Oksikamdan KAÇIN!"
        geriatricPoints={[
          'AGS Beers 2023 Güçlü Uyarı: Oksikamlar (piroksikam/tenoksikam) ultra-uzun yarı ömürleri (~72 sa) nedeniyle >65 yaş erişkinlerde yüksek GİS kanama/perforasyon, ABH ve KKY alevlenmesi riski taşır — kronik kullanımdan KESİNLİKLE KAÇININ!',
          'Yaşlıda Gizli KBY & Hipoalbuminemi: Sarkopenik yaşlıda normal kreatinin eGFR 40–55’i maskeler; hipoalbuminemi ise >%99 bağlı olan Tenoksikamın serbest fraksiyonunu artırır.',
          'Pratik Alternatif: >65 yaş perioperatif analjezide 1. basamak Parasetamol + rejyonel bloktur; NSAİİ kesinlikle gerekiyorsa kısa yarı ömürlü İbuprofen (≤48 sa + PPI) Tenoksikamdan daha kontrollüdür.',
        ]}
        obesityWeightScalarBadge="Sabit Erişkin 20 mg q24sa · TBW Artışı YOK"
        obesityPoints={[
          'Küçük Dağılım Hacmi (~0,15 L/kg): Plazma albuminine >%99 bağlandığı için yağ dokusuna minimal dağılır. Morbid obez erişkinlerde doz 20 mg q24sa üzerine ÇIKARILMAZ!',
          'Obezite Eşlikçi Riskleri: Obezitede eşlik eden hipertansiyon, diyabetik nefropati ve ACEİ/ARB kullanımı nedeniyle renal fonksiyon mutlaka kontrol edilmelidir.',
        ]}
        clinicalNote="Morbid obezitede sabit 20 mg q24sa tavanı geçerlidir; kilo bazlı doz artırımı yapılmaz:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Tenoksikam"
        recommendedScalar="IBW"
        secondaryScalar={{ type: 'AdjBW', context: 'Erişkin Sabit 20 mg q24sa (TBW Artışı Yok)' }}
        rationale=">%99 albumin bağlanması ve küçük dağılım hacmi (Vd ~0,15 L/kg) nedeniyle obezitede doz kilo bazlı artırılmaz — erişkin standart 20 mg q24sa tavanı sabit kalır."
        currentWeightKg={adultWeightKg}
        onApplyWeight={(w) => setAdultWeightKg(Math.max(40, Math.min(180, Math.round(w))))}
      />

      {/* 12. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="tnx-preg"
        pregnancySummary="Gebeliğin 3. trimesterinde (≥28–30. hafta) fetal duktus arteriozus kapanması nedeniyle MUTLAK KONTRENDİKEDİR! ≥20. haftadan itibaren fetal oligohidramnioz (FDA 2020) ve ~72 saatlik uzun yarı ömür nedeniyle tüm gebelik boyunca KAÇINILMALIDIR!"
        pregnancyDetails={[
          '≥20–30. Hafta: Fetal renal disfonksiyon/oligohidramnioz, ≥30. haftada erken duktus kapanması, yenidoğan pulmoner hipertansiyonu ve doğum eylemi uzaması riski (ayrıca uzun t½ nedeniyle maruziyet günlerce sürer!).',
          'Fertilite / 1. Trimester: COX-2 inhibisyonu ovülasyonu geri dönüşlü engelleyebilir; gebelikte ağrı/ateş için 1. tercih daima Parasetamoldür.',
        ]}
        lactationSummary="Anne sütüne düşük oranda (~%0,2) geçse de ~72 SAATLİK ULTRA-UZUN YARI ÖMRÜ nedeniyle yenidoğanda birikme potansiyeli taşır — emzirme döneminde KAÇININ!"
        lactationDetails={[
          'Postpartum / Sezaryen Analjezisi: Emziren annede NSAİİ gerekiyorsa Tenoksikam yerine yarı ömrü ~2 saat olan ve emzirmede en güvenli NSAİİ kabul edilen İbuprofen (ve Parasetamol) seçilmelidir!',
        ]}
      />

      {/* 13. YAN ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="tnx-adr"
        items={[
          {
            title: 'Üst & Alt GİS Ülserasyonu, Kanama ve Perforasyon (Yüksek Oksikam Riski)',
            incidenceOrSeverity: 'Oksikam Sınıfı · Kritik · Uzun t½',
            detail:
              'Oksikamlar, uzun süreli kullanımda NSAİİ’ler arasında üst GİS kanama/perforasyon riski en yüksek sınıflardandır. Yaş >65, ülser öyküsü, antikoagülan, SSRI veya steroidle risk 3–6× artar — PPI ekleyin!',
            tone: 'rose',
          },
          {
            title: 'Ağır Kutanöz İlaç Reaksiyonları (SCAR: SJS · TEN · DRESS)',
            incidenceOrSeverity: 'Nadir · Oksikamlarda Relatif Yüksek · Ölümcül',
            detail:
              'Özellikle tedavinin ilk haftalarında gelişebilen Stevens-Johnson Sendromu (SJS) ve Toksik Epidermal Nekroliz (TEN) riski oksikam grubunda klasik propionik asitlere göre daha yüksek bildirilmiştir — ilk döküntü/mukozal lezyonda DERHAL kesin!',
            tone: 'rose',
          },
          {
            title: 'Uzamış Akut Böbrek Hasarı (ABH), Hiperkalemi & Sıvı Retansiyonu',
            incidenceOrSeverity: 'Hipovolemi / KBY / Triple Whammy · Kritik',
            detail:
              'Renal PG blokajıyla GFR düşüşü, K⁺ yükselmesi, ödem, hipertansiyon alevlenmesi ve KKY dekompansasyonu — ~72 sa yarı ömür nedeniyle diyalizle temizlenemez ve toparlanma gecikebilir.',
            tone: 'rose',
          },
          {
            title: 'Kardiyovasküler Trombotik Olaylar (MI / İnme) & CABG Kontrendikasyonu',
            incidenceOrSeverity: 'NSAİİ Sınıf Kutu Uyarısı',
            detail:
              'Uzun süreli kullanımda ve yüksek CV riskli/CABG hastalarında arteriyel trombotik olay (MI/inme) ve kan basıncı artışı riski yükselir.',
            tone: 'amber',
          },
          {
            title: 'Uzamış Trombosit Fonksiyon Bozukluğu & Cerrahi Kanama',
            incidenceOrSeverity: 'Geri Dönüşlü ama Uzun Süreli (t½ ~72 sa)',
            detail:
              'Trombosit COX-1 blokajı geri dönüşlü olsa da ilacın uzun yarı ömrü nedeniyle tam hemostatik toparlanma İbuprofenden (~24 sa) çok daha uzun sürer (kronik kullanımda elektif yüksek kanama riskli cerrahiden önce ~5–7 gün kesilmesi önerilir!).',
            tone: 'amber',
          },
          {
            title: 'Hepatotoksisite (Transaminaz Artışı) & AERD Bronkospazm',
            incidenceOrSeverity: 'Nadir · Astım/Nazal Polipte Kritik',
            detail:
              'Asemptomatik ALT/AST yükselmesi (nadiren hepatit) ve duyarlı astımlılarda akut lökotrien aracılı bronkospazm.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 14. ÖZEL KLİNİK DİKKAT NOKTALARI */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="tnx-cautions"
        items={[
          {
            title: 'Ameliyathanede Tek Doz (20 mg IV) vs Serviste Çift NSAİİ Tuzağı!',
            detail:
              'Ameliyathanede indüksiyon veya kapanışta 20 mg Tenoksikam IV verildiğinde bu dozun analjezik ve COX-1/COX-2 etkisi ≥24–72 saat sürer. Cerrahi servise devirde anestezi kağıdına "Tenoksikam 20 mg IV yapıldı — 24 saat ek NSAİİ (Deksketoprofen/Diklofenak/İbuprofen) VERME!" uyarısı netçe yazılmalıdır.',
          },
          {
            title: 'Kronik Tenoksikam Kullanan Hastada Elektif Cerrahi Öncesi Kesme Süresi',
            detail:
              'İbuprofen (t½ ~2 sa) elektif yüksek kanama riskli cerrahi öncesi 24–48 saatte temizlenirken, kronik Tenoksikam (t½ ~72 sa) kullanan hastada trombosit fonksiyonunun tamamen normale dönmesi için yüksek kanama riskli cerrahilerde (nöroşirürji, omurga, göz) 7–10 gün (en az 5–7 gün) önceden kesilmesi gerekir!',
          },
          {
            title: 'Akut Aşırı Dozda Kolestiramin / Çoklu Doz Aktif Kömür İnci Bilgisi',
            detail:
              'Tenoksikam >%99 albumin bağlı olduğundan hemodiyalizle temizlenemez; ancak enterohepatik döngüye girdiği için masif aşırı dozda çoklu doz aktif kömür veya oral Kolestiramin verilmesi ~72 saatlik yarı ömrü belirgin kısaltır.',
          },
          {
            title: 'İlaç Alerjisi Çapraz Reaktivitesi (Oksikamlar)',
            detail:
              'Piroksikam, Meloksikam veya Lornoksikam ile ciddi cilt reaksiyonu (SJS/TEN/DRESS) veya anafilaksi geçiren hastada Tenoksikam KESİNLİKLE kullanılmaz!',
          },
        ]}
      />

      {/* 15. DERİN FARMAKODİNAMİ & ORGAN SİSTEMİ ETKİLERİ */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="tnx-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Enolik Asit (Oksikam) COX-1/COX-2 Blokajı & ~72 Saatlik Farmakokinetik İmza',
          summary:
            'Tenoksikam, propionik asitlerden (İbuprofen) farklı olarak benzotiyazin-karboksamid (oksikam) çekirdeği taşır; bu yapı plazma albuminine >%99 afinite ve yavaş CYP2C9 hidroksilasyonuyla olağanüstü uzun bir eliminasyon yarı ömrü (~72 saat) doğurur:',
          points: [
            'Dengeli Non-Selektif COX Blokajı: Hem inflamatuar dokudaki COX-2’yi hem de trombosit, mide mukozası ve böbrekteki konstitütif COX-1’i güçlü biçimde inhibe eder.',
            'Lökosit & Kıkırdak Modülasyonu: PGE₂ inhibisyonuna ek olarak polimorfonükleer lökosit kemotaksisini, fagositozu ve sinovyal serbest radikal salınımını baskılayarak artrit/cerrahi ödemini azaltır.',
            'Yavaş CYP2C9 Klirensi: Hepatik 5’-hidroksilasyon hızının çok düşük olması, günde tek dozla (20 mg q24sa) sabit 24 saatlik koruma sağlarken, CYP2C9*3 yavaş metabolizörlerde aşırı birikim riski yaratır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Prostanoid Baskılanması, Enterohepatik Döngü & Gastrik/Renal Denge',
          summary:
            'Oksikam sınıfının klinik etkinliğini ve uzun süreli toksisite profilini belirleyen hücresel dinamikler:',
          points: [
            'Sürekli Gastrik PGE₂ Baskısı: Kısa yarı ömürlü NSAİİ’lerde doz aralarında mide mukozası kısmen toparlanma fırsatı bulurken, ~72 saatlik kesintisiz plazma düzeyleri gastrik mukus/bikarbonat bariyerini 24/7 baskılayarak üst GİS ülser/kanama riskini artırır.',
            'Renal Afferent Otoregülasyon Kaybı: Hipovolemi, siroz veya ACEİ/ARB + Diüretik ("Triple Whammy") varlığında afferent arteriyol PGE₂/PGI₂ kaybı günlerce süren glomerüler filtrasyon çöküşü doğurur.',
            'Albumin Yer Değiştirmesi: >%99 albumin bağlanması nedeniyle Varfarin, sülfonilüreler ve hipoalbuminemik kritik hastalarda serbest ilaç fraksiyonu etkileşimleri belirginleşir.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Periferik Nosiseptörler & Eklem Sinovyası',
            tissueTarget: 'Cerrahi İnsizyon · Sinovyal Sıvı · Tendon/Bursa',
            accent: 'teal',
            points: [
              'Asidik inflamasyon bölgesinde yoğunlaşarak 24 saat kesintisiz periferik antiinflamatuar analjezi sağlar.',
              'Perioperatif tek 20 mg IV doz, Parasetamol ile birleştiğinde postop opioid tüketimini anlamlı düşürür.',
            ],
          },
          {
            systemTitle: 'Gastrointestinal Mukoza & Karaciğer (CYP2C9)',
            tissueTarget: 'Mide/Duodenum Mukozası · Hepatik CYP2C9',
            accent: 'rose',
            points: [
              'Oksikam sınıfı uzun süreli kullanımda en yüksek üst GİS kanama riskli NSAİİ gruplarındandır — riskli her hastada PPI (Pantoprazol) zorunludur.',
              'CYP2C9 inhibitörleri (Flukonazol, Amiodaron) Tenoksikam klirensini daha da yavaşlatır.',
            ],
          },
          {
            systemTitle: 'Böbrek & Kardiyovasküler Sistem',
            tissueTarget: 'Afferent Arteriyol · JGA · Vasküler Endotel (PGI₂)',
            accent: 'amber',
            points: [
              'Hiporeninemik hipoaldosteronizm (↑K⁺), Na⁺/su tutulumu, KB artışı ve diüretik/ACEİ direnci oluşturur.',
              'CABG perioperatif dönemde ve NYHA III–IV KKY’de kesinlikle kontrendikedir.',
            ],
          },
          {
            systemTitle: 'Deri / İmmün Sistem (SCAR) & Trombosit Hemostazı',
            tissueTarget: 'Keratinositler · Trombosit COX-1 (Uzamış Geri Dönüşlü)',
            accent: 'indigo',
            points: [
              'İlk tedavi haftalarında SJS/TEN riski oksikamlarda yakından izlenmelidir; ilk mukozal/kutanöz bulguda derhal kesilir.',
              '~72 saatlik yarı ömür nedeniyle kronik kullanımda trombosit fonksiyonunun normale dönmesi 5–7+ gün alır.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Multimodal Analjezi Sinerjisi & 20 mg q24sa Tavanı',
          summary:
            'Tenoksikam perioperatif ağrı yönetiminde "tek doz uzun bazal antiinflamatuar kalkan" olarak konumlanır:',
          points: [
            'Tenoksikam 20 mg IV + Parasetamol 1 g IV: Tamamlayıcı periferik (COX) ve santral (POX/AM404) mekanizmalarla güvenli ve güçlü multimodal kombinasyondur.',
            'Çift NSAİİ Kesinlikle Yasak: Tenoksikam verilen gün İbuprofen, Diklofenak, Deksketoprofen, Ketorolak veya Naproksen EKLEMEYİN!',
            'Kısa vs Uzun t½ Seçimi: Genç, sağlıklı, övolemik cerrahi hastasında tek doz Tenoksikam çok pratiktir; ancak sınırda böbrek/yaşlı/emziren hastada kısa yarı ömürlü İbuprofen veya Parasetamol tercih edilmelidir.',
          ],
        }}
        clinicalPearls={[
          'q24sa Kuralını ASLA Bozma: ~72 saatlik yarı ömrüyle Tenoksikam günde 1 kez (20 mg) verilir; serviste yanlışlıkla 2×1 veya başka NSAİİ ile çiftlenmesini önle!',
          'Liyofilize Flakon = Yalnızca 2 mL WFI + Hemen Yavaş Bolus: Sürekli infüzyon yapma ve alkali pH (~9) nedeniyle başka ilaçlarla aynı enjektörde karıştırma!',
          'Emziren Annede & >65 Yaşta Kullanma: Emzirende İbuprofen/Parasetamol, >65 yaşta (AGS Beers 2023) kronik oksikam yerine Parasetamol seç!',
          'Aşırı Dozda Diyaliz İşe Yaramaz: >%99 albumin bağlı olduğundan hemodiyaliz temizlemez — enterohepatik döngüyü kesmek için çoklu doz aktif kömür / Kolestiramin hatırla!',
        ]}
      />

      {/* 16. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKLAR */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="tnx-refs"
        drugName="Tenoksikam"
        drugsComUrl="https://www.drugs.com/international/tenoxicam.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Diğer Sistemik NSAİİ’ler (İbuprofen · Diklofenak · Deksketoprofen · Ketorolak · Naproksen · Selekoksib)',
            mechanism: 'Aditif COX-1/COX-2 Blokajı + ~72 Saat Süren Kümülatif Toksisite',
            clinicalEffect:
              'Ek analjezik fayda olmadan masif üst GİS kanama/perforasyon ve akut böbrek hasarı riskinde katlanma.',
            management:
              'ASLA birlikte kullanmayın — ameliyathanede 20 mg Tenoksikam IV yapıldıysa 24 saat ek NSAİİ eklenmez (Parasetamol kombine edilebilir!).',
          },
          {
            severity: 'D',
            agent: 'Antikoagülanlar (Varfarin · Apiksaban · Rivaroksaban · Dabigatran · Heparin/LMWH)',
            mechanism: 'CYP2C9 & >%99 Albumin Yer Değiştirmesi (Varfarin INR ↑) + Uzamış Trombosit & GİS Etkisi',
            clinicalEffect:
              'Majör üst/alt GİS kanaması ve perioperatif kanama riskinde 3–6 kat artış.',
            management:
              'Mümkünse Parasetamol seçin; zorunluysa mutlaka Pantoprazol 40 mg/gün ekleyin ve INR/Hb’yi günlerce izleyin.',
          },
          {
            severity: 'D',
            agent: 'ACE İnhibitörleri / ARB’ler + Diüretikler ("Triple Whammy")',
            mechanism: 'Efferent Vazodilatasyon + Volüm Kaybı + ~72 sa Süren Afferent Vazokonstriksiyon',
            clinicalEffect:
              'Ani ve uzamış Akut Böbrek Hasarı (ABH), hiperkalemi ve antihipertansif/diüretik etkinlik kaybı.',
            management:
              'Üçlü kombinasyondan KESİNLİKLE kaçının; ikili kombinasyonda dahi zorunluysa tek dozla sınırlayıp Cr/K⁺ izleyin.',
          },
          {
            severity: 'D',
            agent: 'Lityum & Metotreksat (MTX)',
            mechanism: 'Renal Proksimal Tübüler Klirens İnhibisyonu',
            clinicalEffect:
              'Lityum nörotoksisitesi (%20–40 düzey artışı) ve yüksek/orta doz MTX’te ölümcül pansitopeni/ABH.',
            management:
              'Yüksek doz MTX ile kullanmayın; Lityum alanlarda Parasetamol seçin veya Lityum düzeyini yakından takip edin.',
          },
          {
            severity: 'D',
            agent: 'CYP2C9 İnhibitörleri (Flukonazol · Vorikonazol · Amiodaron · Mikonazol)',
            mechanism: 'Tenoksikamın Tek Metabolik Yolağı Olan CYP2C9’un İnhibisyonu',
            clinicalEffect:
              'Zaten ~72 saat olan yarı ömür >100 saate uzar → ciddi birikim ve GİS/renal toksisite!',
            management:
              'Eşzamanlı kullanımdan kaçının; kısa yarı ömürlü/CYP2C9 bağımsız analjezik (Parasetamol) seçin.',
          },
          {
            severity: 'C',
            agent: 'SSRI / SNRI Antidepresanlar, Sistemik Steroidler & Düşük Doz Aspirin',
            mechanism: 'Sinerjik GİS Mukozal Hasar & Antiplatelet/COX-1 Etkileşimi',
            clinicalEffect:
              'Üst GİS ülser kanaması riskinde belirgin artış; Aspirinle antiplatelet etkileşim potansiyeli.',
            management:
              'Eşzamanlı kullanımda mutlaka Pantoprazol 40 mg/gün ekleyin ve süreyi en kısa tutun.',
          },
        ]}
        references={[
          {
            authors: 'Todd PA, Clissold SP',
            title: 'Tenoxicam: An update of its pharmacology and therapeutic efficacy in rheumatic diseases',
            journal: 'Drugs',
            year: 1991,
            note: 'Tenoksikamın ~%100 oral biyoyararlanımı, >%99 albumin bağlanması, CYP2C9 metabolizması ve ~72 saatlik yarı ömrünü özetleyen kapsamlı farmakoloji derlemesi.',
          },
          {
            authors: 'Nilsen OG',
            title: 'Clinical pharmacokinetics of tenoxicam',
            journal: 'Clinical Pharmacokinetics',
            year: 1994,
            note: 'Kararlı durum süresi (10–15 gün), sinovyal sıvı penetrasyonu, yaşlılık, böbrek ve karaciğer yetmezliğindeki PK profili.',
          },
          {
            authors: 'Castellsague J, Riera-Guardia N, Calingaert B, et al. (SOS Project)',
            title: 'Individual NSAIDs and upper gastrointestinal complications: a systematic review and meta-analysis of observational studies',
            journal: 'Drug Safety',
            year: 2012,
            note: 'Uzun yarı ömürlü oksikamların (piroksikam/tenoksikam) diğer NSAİİ’lere göre daha yüksek üst GİS komplikasyon riski taşıdığını gösteren Avrupa SOS meta-analizi.',
          },
          {
            authors: 'Mockenhaupt M, Kelly JP, Kaufman D, Stern RS (SCAR Study Group)',
            title: 'The risk of Stevens-Johnson syndrome and toxic epidermal necrolysis associated with nonsteroidal antiinflammatory drugs: a multinational perspective',
            journal: 'Journal of Rheumatology',
            year: 2003,
            note: 'Oksikam NSAİİ’lerde özellikle ilk tedavi haftalarında artmış SJS/TEN riskini ortaya koyan çok uluslu vaka-kontrol çalışması.',
          },
          {
            authors: 'American Geriatrics Society 2023 Beers Criteria® Update Expert Panel',
            title: 'American Geriatrics Society 2023 updated AGS Beers Criteria® for potentially inappropriate medication use in older adults',
            journal: 'Journal of the American Geriatrics Society',
            year: 2023,
            note: '>65 yaş hastalarda uzun yarı ömürlü/non-COX-selektif oral NSAİİ’lerden GİS kanama, ABH ve KKY riski nedeniyle kaçınılması kılavuzu.',
          },
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Regional Anesthesia & Pain Medicine',
            year: 2018,
            note: 'İzole NSAİİ kullanımının nöraksiyel blok açısından değerlendirilmesi ve kombine antitrombotiklerde dikkat uyarısı.',
          },
          {
            authors: 'U.S. Food and Drug Administration (FDA) Drug Safety Communication',
            title: 'FDA recommends avoiding use of NSAIDs in pregnancy at 20 weeks or later because they can result in low amniotic fluid',
            journal: 'FDA Safety Communication',
            year: 2020,
            note: 'Gebeliğin ≥20. haftasından itibaren NSAİİ’lerin fetal oligohidramnioz ve ≥30. haftada erken duktus arteriozus kapanması uyarısı.',
          },
        ]}
      />

      {/* Alt Bilgi Şeridi */}
      <div className={`flex items-center justify-between text-[11px] px-2 ${mutedText}`}>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          SmPC · SOS Meta-Analizi · AGS Beers 2023 · FDA 2020 · ASRA 2018 ile Uyumlu
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          Oksikam NSAİİ · q24sa · t½ ~72 sa
        </span>
      </div>
    </div>
  );
};
